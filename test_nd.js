/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(666);


/***/ }),

/***/ 666:
/***/ (function(module) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(757);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
;// CONCATENATED MODULE: ./src/stringUtils.js
var replaceAll = function replaceAll(str, find) {
  var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  if (!str) return "";
  var index = str.indexOf(find);
  if (index < 0) return str;

  while (str.indexOf(find) >= 0) {
    var _index = str.indexOf(find);

    str = (_index > 0 ? str.substring(0, _index) : "") + replace + str.substring(_index + find.length);
  }

  return str;
};
var turkishToLower = function turkishToLower(str) {
  if (!str || typeof str !== "string") return str;
  var string = str;
  var letters = {
    "İ": "i",
    "I": "ı",
    "Ş": "ş",
    "Ğ": "ğ",
    "Ü": "ü",
    "Ö": "ö",
    "Ç": "ç"
  };
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
    return letters[letter];
  });
  return string.toLowerCase();
};
;// CONCATENATED MODULE: ./src/constants.js
/* eslint-disable max-len */

var isStaging = typeof window !== "undefined" ? window.location.href.includes("staging.vivense") : true;
var VERSION = "0.0.38";
var COOKIE_NAME = "_ga"; // TODO revert the following staging env check after moving to new branch structure

var TREATMENTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
var TREATMENT_WEIGHTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
var STYLESHEET_LOCATION = isStaging ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
var E_RULES_LOCATION = isStaging ? "https://ndvivense.glov.ai/eligibility_rules_staging.json" : "https://ndvivense.glov.ai/eligibility_rules.json";
var PRODUCT_INFO_LOCATION = "https://ndvivense.glov.ai/social-proof.txt";
var LOG_API_URL = "https://europe-west3-nextday-34eb3.cloudfunctions.net/api/log";
var LOOKUP_API_URL = "https://catalog-api.adoraai.com";
var MOBILE_MEDIA_QUERY = "(max-width: 440px)"; // Control group percentage

var SPLIT_RATIO = 50; // Skipped treatment percentage

var TREATMENT_RATIO = 50;
var TREATMENTS_DURATION = 1;
var MAX_TIMEOUT_PER_SESSION = 1;
var LIST_MODE_BEAGLE_KEYS = (/* unused pure expression or super */ null && (["pagetype", "category", "alltimePLPCategoryMode", "sessionPLPCategoryMode", "alltimePDPCategoryMode", "sessionPDPCategoryMode", "alltimeCartCategoryMode", "sessionCartCategoryMode"]));
var IDLE_TIMEOUT = 15000;
var SESSION_STORAGE_KEYS = {
  SESSION_TIMESTAMP: "BG_SessionTimestamp",
  SESSION_HISTORY: "BG_SessionHistory",
  TREATMENTS: "BG_Treatments",
  POPUP_DISPLAY_FLAG: "BG_PopupDisplayFlag",
  SKU_INFO_BASKET: "BG_ProductInfoBasket",
  TIMEOUT_COUNT: "BG_TimeoutCount",
  SESSION_REFERRER: "BG_SessionReferrer",
  WEIGHTS: "BG_Weights",
  ELIGIBILITY_RULES: "BG_E_Rules"
};
var LOCAL_STORAGE_KEYS = {
  DEBUG_MODE: "BG_Debug",
  OUT_OF_SCOPE: "BG_OutOfScope",
  IS_LABEL_SENT: "BG_LabelSent",
  USER_ID: "BG_UserId_00",
  DATA_COLLECTION_DATA_SIZE: "BG_CollectionDataSize"
};
var CUSTOM_STORAGE_PREFIX = "BG_Seg_";
;// CONCATENATED MODULE: ./src/logger.js





var Logger = /*#__PURE__*/function () {
  function Logger() {
    var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Beagle Client SDK";
    var testing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Logger);

    this.origin = origin;

    if (testing) {
      this.DEBUG = 1;
    } else {
      this.DEBUG = window.localStorage.getItem(LOCAL_STORAGE_KEYS.DEBUG_MODE);
    }
  }

  _createClass(Logger, [{
    key: "info",
    value: function info() {
      var _console;

      var origin = this.origin;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).info.apply(_console, ["[".concat(origin, "]")].concat(args));
    }
  }, {
    key: "log",
    value: function log() {
      var DEBUG = this.DEBUG,
          origin = this.origin;

      if (DEBUG) {
        var _console2;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        (_console2 = console).log.apply(_console2, ["[".concat(origin, "]")].concat(args));
      }
    }
  }, {
    key: "failed",
    value: function failed() {
      var _console3;

      var DEBUG = this.DEBUG,
          origin = this.origin;
      if (!DEBUG) return;
      var messageConfig = "%c%s   ";

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      args.forEach(function (argument) {
        var type = _typeof(argument);

        switch (type) {
          case "bigint":
          case "number":
          case "boolean":
            messageConfig += "%d   ";
            break;

          case "string":
            messageConfig += "%s   ";
            break;

          case "object":
          case "undefined":
          default:
            messageConfig += "%o   ";
        }
      });

      (_console3 = console).log.apply(_console3, [messageConfig, "color: red", "[".concat(origin, "]")].concat(args));
    }
  }, {
    key: "success",
    value: function success() {
      var _console4;

      var DEBUG = this.DEBUG,
          origin = this.origin;
      if (!DEBUG) return;
      var messageConfig = "%c%s   ";

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      args.forEach(function (argument) {
        var type = _typeof(argument);

        switch (type) {
          case "bigint":
          case "number":
          case "boolean":
            messageConfig += "%d   ";
            break;

          case "string":
            messageConfig += "%s   ";
            break;

          case "object":
          case "undefined":
          default:
            messageConfig += "%o   ";
        }
      });

      (_console4 = console).log.apply(_console4, [messageConfig, "color: green", "[".concat(origin, "]")].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _console5;

      var origin = this.origin;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      (_console5 = console).warn.apply(_console5, ["[".concat(origin, "]")].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _console6;

      var origin = this.origin;

      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      (_console6 = console).error.apply(_console6, ["[".concat(origin, "]")].concat(args));
    }
  }]);

  return Logger;
}();

/* harmony default export */ var src_logger = (Logger);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ./src/utils.js




function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/* eslint-disable max-len */



var logger = new src_logger("BeagleUtils");
var months = {
  "ocak": 0,
  "şubat": 1,
  "mart": 2,
  "nisan": 3,
  "mayıs": 4,
  "haziran": 5,
  "temmuz": 6,
  "ağustos": 7,
  "eylül": 8,
  "ekim": 9,
  "kasım": 10,
  "aralık": 11
};
var removeDocumentHide = function removeDocumentHide() {
  window.top.document.documentElement.classList.remove("glov-hide"); // TODO remove after tag is updated

  window.top.document.documentElement.classList.remove("nextDay-hide");
};
var fetchTreatments = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
    var treatments, jsonTreatment;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            logger.log("Fetching treatments");
            _context.next = 4;
            return fetchPlus(TREATMENTS_LOCATION);

          case 4:
            treatments = _context.sent;
            _context.next = 7;
            return treatments.json();

          case 7:
            jsonTreatment = _context.sent;
            return _context.abrupt("return", jsonTreatment);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            logger.failed("Could not fetch treatments", _context.t0.message);
            return _context.abrupt("return", null);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function fetchTreatments() {
    return _ref.apply(this, arguments);
  };
}();
var fetchTreatmentWeights = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
    var treatmentWeights, jsonTreatmentWeights;
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            logger.log("Fetching treatment weights");
            _context2.next = 4;
            return fetchPlus(TREATMENT_WEIGHTS_LOCATION);

          case 4:
            treatmentWeights = _context2.sent;
            _context2.next = 7;
            return treatmentWeights.json();

          case 7:
            jsonTreatmentWeights = _context2.sent;
            return _context2.abrupt("return", jsonTreatmentWeights);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            logger.failed("Could not fetch treatment weights", _context2.t0.message);
            return _context2.abrupt("return", null);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function fetchTreatmentWeights() {
    return _ref2.apply(this, arguments);
  };
}();
var fetchEligibilityRules = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
    var eligibilityRules, jsonEligibilityRules;
    return regenerator_default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            logger.log("Fetching eligibility rules");
            _context3.next = 4;
            return fetchPlus(E_RULES_LOCATION);

          case 4:
            eligibilityRules = _context3.sent;
            _context3.next = 7;
            return eligibilityRules.json();

          case 7:
            jsonEligibilityRules = _context3.sent;
            return _context3.abrupt("return", jsonEligibilityRules);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            logger.failed("Could not fetch eligibility rules", _context3.t0.message);
            return _context3.abrupt("return", null);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function fetchEligibilityRules() {
    return _ref3.apply(this, arguments);
  };
}();
var fetchProductInfo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
    var productInfo, productInfoCSV;
    return regenerator_default().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            logger.log("Fetching product info");
            _context4.next = 4;
            return fetchPlus(PRODUCT_INFO_LOCATION);

          case 4:
            productInfo = _context4.sent;
            _context4.next = 7;
            return productInfo.text();

          case 7:
            productInfoCSV = _context4.sent;
            return _context4.abrupt("return", csvToArray(productInfoCSV));

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            logger.failed("Could not fetch product info", _context4.t0.message);
            return _context4.abrupt("return", null);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function fetchProductInfo() {
    return _ref4.apply(this, arguments);
  };
}();
var utils_timeout = function timeout(time) {
  var controller = new AbortController();
  setTimeout(function () {
    return controller.abort();
  }, time * 1000);
  return controller;
};

var fetchPlus = function fetchPlus(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    signal: utils_timeout(500).signal
  };
  var retries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  return fetch(url, options).then(function (res) {
    if (res.ok) {
      return res;
    }

    if (retries > 0) {
      return fetchPlus(url, options, retries - 1);
    }

    throw new Error(res.status);
  }).catch(function (error) {
    return logger.failed("Fetch failed: ", error.message);
  });
};

var extractCookieIdentifier = function extractCookieIdentifier(cookieString, cookieName) {
  if (!cookieString) {
    return null;
  }

  var parsed = cookieString.split(";").map(function (v) {
    return v.split("=");
  }).reduce(function (acc, v) {
    if (v[0] && v[1]) {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    }

    return acc;
  }, {});
  var identifier = parsed[cookieName];

  if (!identifier) {
    return null;
  }

  if (cookieName === "_ga") {
    // extract unique identifier from GA cookie
    var identifierIndex = 2;
    identifier = identifier.split(".")[identifierIndex];
  }

  return identifier;
};
var determinePct = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(identifier) {
    var hash, pct;
    return regenerator_default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (identifier) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", null);

          case 3:
            hash = getUnsecureHash(identifier);

            if (!(hash === null)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", null);

          case 6:
            pct = hash % 100;

            if (!(pct >= 0 && pct < 100)) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", pct);

          case 9:
            return _context5.abrupt("return", null);

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            logger.error(_context5.t0);
            return _context5.abrupt("return", null);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));

  return function determinePct(_x) {
    return _ref5.apply(this, arguments);
  };
}();
var exitScrollListener = function exitScrollListener(callBack) {
  var loop = function loop() {
    var scrollTop = window.top.document.documentElement.scrollTop;

    if (lastScrollTop - 400 > scrollTop) {
      clearInterval(exitScrollInterval);
      callBack();
    } else {
      lastScrollTop = scrollTop;
    }
  };

  var lastScrollTop = window.top.document.documentElement.scrollTop;
  var exitScrollInterval = setInterval(loop, 500);
};
/**
 * @description This function is used to apply treatments to the page on specific media type.
 * @param {MediaQueryList} mediaQueryCondition window.matchMedia("(max-width: 500px)")
 * @param {DOMNodeList } elements document.querySelectorAll("div.product_info")
 * @param {Object} styleChangesMap { "margin-top" : "10rem"}
 * @returns
 */

var styleApplicator = function styleApplicator(elements, styleChangesMap) {
  logger.log("Applying style changes", styleChangesMap, "to elements", elements);

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var _i = 0, _Object$entries = Object.entries(styleChangesMap); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      element.style[key] = value;
    }
  }
};
var injectStyleSheet = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
    var styleSheet;
    return regenerator_default().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            styleSheet = window.top.document.createElement("link");
            styleSheet.rel = "stylesheet";
            styleSheet.type = "text/css";
            styleSheet.href = STYLESHEET_LOCATION;
            window.top.document.head.appendChild(styleSheet);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function injectStyleSheet() {
    return _ref6.apply(this, arguments);
  };
}();
var prepareActions = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7(identifier, actionsToPrepare, businessRuleId) {
    var actions, variant, _iterator, _step, action, businessRuleTransformations, variants, _iterator2, _step2, businessTransformation, key, _i2, _Object$keys, variantKey, randomPct, _iterator3, _step3, _businessTransformation, _i3, _Object$keys2, _key, _key2;

    return regenerator_default().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            actions = JSON.parse(JSON.stringify(actionsToPrepare));
            variant = null;
            _iterator = _createForOfIteratorHelper(actions);
            _context7.prev = 3;

            _iterator.s();

          case 5:
            if ((_step = _iterator.n()).done) {
              _context7.next = 55;
              break;
            }

            action = _step.value;
            businessRuleTransformations = action.businessRuleTransformations, variants = action.variants;

            if (!(!businessRuleTransformations && !variants)) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("continue", 53);

          case 10:
            if (businessRuleId !== null && businessRuleTransformations) {
              _iterator2 = _createForOfIteratorHelper(businessRuleTransformations);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  businessTransformation = _step2.value;

                  if (businessTransformation.id === businessRuleId) {
                    for (key in businessTransformation) {
                      if (key !== "id") {
                        action[key] = businessTransformation[key];
                      }
                    }
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            if (!variants) {
              _context7.next = 53;
              break;
            }

            _i2 = 0, _Object$keys = Object.keys(variants);

          case 13:
            if (!(_i2 < _Object$keys.length)) {
              _context7.next = 53;
              break;
            }

            variantKey = _Object$keys[_i2];
            _context7.next = 17;
            return determinePct(identifier + variantKey);

          case 17:
            randomPct = _context7.sent;

            if (!(randomPct < action.variants[variantKey].weight)) {
              _context7.next = 50;
              break;
            }

            variant = variantKey;

            if (!(businessRuleId !== null && variants[variantKey].businessRuleTransformations)) {
              _context7.next = 48;
              break;
            }

            _iterator3 = _createForOfIteratorHelper(variants[variantKey].businessRuleTransformations);
            _context7.prev = 22;

            _iterator3.s();

          case 24:
            if ((_step3 = _iterator3.n()).done) {
              _context7.next = 38;
              break;
            }

            _businessTransformation = _step3.value;

            if (!(_businessTransformation.id == businessRuleId)) {
              _context7.next = 36;
              break;
            }

            _i3 = 0, _Object$keys2 = Object.keys(_businessTransformation);

          case 28:
            if (!(_i3 < _Object$keys2.length)) {
              _context7.next = 36;
              break;
            }

            _key = _Object$keys2[_i3];

            if (!(_key === "id")) {
              _context7.next = 32;
              break;
            }

            return _context7.abrupt("continue", 33);

          case 32:
            action[_key] = _businessTransformation[_key];

          case 33:
            _i3++;
            _context7.next = 28;
            break;

          case 36:
            _context7.next = 24;
            break;

          case 38:
            _context7.next = 43;
            break;

          case 40:
            _context7.prev = 40;
            _context7.t0 = _context7["catch"](22);

            _iterator3.e(_context7.t0);

          case 43:
            _context7.prev = 43;

            _iterator3.f();

            return _context7.finish(43);

          case 46:
            _context7.next = 49;
            break;

          case 48:
            for (_key2 in variants[variantKey]) {
              if (_key2 !== "weight" && _key2 !== "businessRuleTransformations") {
                action[_key2] = variants[variantKey][_key2];
              }
            }

          case 49:
            return _context7.abrupt("break", 53);

          case 50:
            _i2++;
            _context7.next = 13;
            break;

          case 53:
            _context7.next = 5;
            break;

          case 55:
            _context7.next = 60;
            break;

          case 57:
            _context7.prev = 57;
            _context7.t1 = _context7["catch"](3);

            _iterator.e(_context7.t1);

          case 60:
            _context7.prev = 60;

            _iterator.f();

            return _context7.finish(60);

          case 63:
            return _context7.abrupt("return", [actions, variant]);

          case 64:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 57, 60, 63], [22, 40, 43, 46]]);
  }));

  return function prepareActions(_x2, _x3, _x4) {
    return _ref7.apply(this, arguments);
  };
}();
var initiateSessionStorages = function initiateSessionStorages() {
  var POPUP_DISPLAY_FLAG = SESSION_STORAGE_KEYS.POPUP_DISPLAY_FLAG,
      SESSION_TIMESTAMP = SESSION_STORAGE_KEYS.SESSION_TIMESTAMP,
      SESSION_HISTORY = SESSION_STORAGE_KEYS.SESSION_HISTORY;
  var popupDisplayFlag = sessionStorage.getItem(POPUP_DISPLAY_FLAG);
  var sessionTimestamp = sessionStorage.getItem(SESSION_TIMESTAMP);
  var sessionHistory = sessionStorage.getItem(SESSION_HISTORY);

  if (popupDisplayFlag === null) {
    sessionStorage.setItem(POPUP_DISPLAY_FLAG, 0);
  }

  if (!sessionTimestamp) {
    sessionStorage.setItem(SESSION_TIMESTAMP, Date.now());
  }

  if (!sessionHistory) {
    sessionStorage.setItem(SESSION_HISTORY, [window.location.pathname]);
  } else {
    sessionStorage.setItem(SESSION_HISTORY, [window.location.pathname, sessionHistory]);
  }
};
var conditionChecker = function conditionChecker(runTimeValue, condition, value) {
  if (condition === "notExist") {
    if (!runTimeValue) {
      logger.success("conditionChecker: -satisfied- target does not exist");
      return true;
    }

    logger.failed("conditionChecker: -not satisfied- target does exist");
    return false;
  }

  if (runTimeValue === null || runTimeValue === undefined || condition === null || condition === undefined) {
    logger.failed("conditionChecker: runTimeValue or condition is not defined");
    return false;
  }

  switch (condition) {
    case "exist":
      if (runTimeValue) {
        logger.success("conditionChecker: -satisfied- target does exist");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target does not exist");
      return false;

    case "includes":
    case "contains":
      if (runTimeValue.includes(value)) {
        logger.success("conditionChecker: -satisfied- target contains value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target does not contain value");
      return false;

    case "notIncludes":
    case "notContains":
      if (!runTimeValue.includes(value)) {
        logger.success("conditionChecker: -satisfied- target does not contain value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target contains value");
      return false;

    case "equal":
      if (runTimeValue === value) {
        logger.success("conditionChecker: -satisfied- target equals value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target does not equal value");
      return false;

    case "notEqual":
      if (runTimeValue !== value) {
        logger.success("conditionChecker: -satisfied- target does not equal value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target equals value");
      return false;

    case "greaterThan":
      if (runTimeValue > value) {
        logger.success("conditionChecker: -satisfied- target is greater than value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target is not greater than value");
      return false;

    case "lessThan":
      if (runTimeValue < value) {
        logger.success("conditionChecker: -satisfied- target is less than value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target is not less than value");
      return false;

    case "greaterEquals":
      if (runTimeValue >= value) {
        logger.success("conditionChecker: -satisfied- target is greater or equal than value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target is not greater or equal than value");
      return false;

    case "lessEquals":
      if (runTimeValue <= value) {
        logger.success("conditionChecker: -satisfied- target is less or equal than value");
        return true;
      }

      logger.failed("conditionChecker: -not satisfied- target is not less or equal than value");
      return false;

    case "between":
      {
        var _value$split = value.split(","),
            _value$split2 = _slicedToArray(_value$split, 2),
            min = _value$split2[0],
            max = _value$split2[1];

        min = parseInt(min);
        max = parseInt(max);

        if (runTimeValue >= min && runTimeValue <= max) {
          logger.success("conditionChecker: -satisfied- target is between min and max");
          return true;
        }

        logger.failed("conditionChecker: -not satisfied- target is not between min and max");
        return false;
      }

    case "regex":
      {
        var regex = new RegExp(value, "i");
        return regex.test(runTimeValue);
      }

    default:
      logger.failed("conditionChecker: condition is not defined ", condition);
      return false;
  }
};
var getDebugMode = function getDebugMode(oosReason) {
  var DEBUG_MODE = LOCAL_STORAGE_KEYS.DEBUG_MODE,
      OUT_OF_SCOPE = LOCAL_STORAGE_KEYS.OUT_OF_SCOPE;
  var queryString = window.location.search;

  if (queryString.includes("nd_debug=")) {
    window.localStorage.setItem(OUT_OF_SCOPE, oosReason);
  }

  if (queryString.includes("nd_debug=1")) {
    window.localStorage.setItem(DEBUG_MODE, 1);
    addToBeagleInfoLayer("dbm", "on");
    return 1;
  }

  if (queryString.includes("nd_debug=2")) {
    window.localStorage.setItem(DEBUG_MODE, 2);
    addToBeagleInfoLayer("dbm", "on");
    return 2;
  }

  if (queryString.includes("nd_debug=0")) {
    window.localStorage.removeItem(DEBUG_MODE);
    addToBeagleInfoLayer("dbm", "off");
    return 0;
  }

  var current = parseInt(window.localStorage.getItem(DEBUG_MODE));
  addToBeagleInfoLayer("dbm", current ? "on" : "off");
  return current || 0;
}; // get GA client id using ga.getAll()

var getGaClientId = function getGaClientId() {
  var ga = window.ga; // if ga and ga.getAll() is not defined, return null

  if (ga && ga.getAll) {
    var trackers = ga.getAll();

    if (trackers && trackers.length) {
      return trackers[0].get("clientId");
    }
  }

  return null;
}; // get deterministic numeric hash from string that conatins only numbers

var getUnsecureHash = function getUnsecureHash(str) {
  var hash = 0;

  if (str.length === 0) {
    return null;
  }

  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  } // return absolute value


  return Math.abs(hash);
}; // generate a 32-bit random integer

var getRandomInt = function getRandomInt() {
  return Math.floor(Math.random() * 0x100000000);
}; // get current unix epoch time in seconds

var getUnixTime = function getUnixTime() {
  return Math.floor(Date.now() / 1000);
};
var getIdentifier = function getIdentifier() {
  return new Promise(function (resolve) {
    try {
      var id = window.localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);

      if (id !== null && id !== undefined) {
        logger.log("getIdentifier: got identifier from local storage", id);
        resolve(id);
        return;
      }

      id = getGaClientId();

      if (id !== null && id !== undefined) {
        logger.log("getIdentifier: got identifier from ga in first attempt", id);
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, id);
        resolve(id);
        return;
      } else {
        var extractIdentifierInterval = setInterval(function () {
          id = getGaClientId();

          if (id !== null && id !== undefined) {
            logger.log("getIdentifier: got identifier from ga", id);
            clearInterval(extractIdentifierInterval);
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, id);
            resolve(id);
          }
        }, 25);
        setTimeout(function () {
          clearInterval(extractIdentifierInterval);

          if (id === null || id === undefined) {
            logger.failed("Could not read GA client id");
            resolve(null);
          }
        }, 5000);
      }
    } catch (e) {
      logger.failed("Error in getIdentifier", e);
      resolve(null);
    }
  });
};
var delay = function delay(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};
var formatDeliveryDate = function formatDeliveryDate(date) {
  if (!date || typeof date !== "string") return date;
  var result = {
    startMonthIndex: undefined,
    endMonthIndex: undefined,
    startDay: undefined,
    endDay: undefined
  };
  var match = date.match("([\\d]+)-([\\d]+)\\s?([\\wıüğşöçİÖÇĞÜŞ]+)");

  if (match && match.length === 4) {
    result.startDay = parseInt(match[1]);
    result.endDay = parseInt(match[2]);
    result.startMonthIndex = months[match[3].toLowerCase()];
    result.endMonthIndex = result.startMonthIndex;
  } else {
    match = date.match("([\\d]+)\\s+([\\wıüğşöçİÖÇĞÜŞ]+)-([\\d]+)\\s+([\\wıüğşöçİÖÇĞÜŞ]+)");
    if (!match || match.length !== 5) return date;
    result.startDay = parseInt(match[1]);
    result.startMonthIndex = months[match[2].toLowerCase()];
    result.endDay = parseInt(match[3]);
    result.endMonthIndex = months[match[4].toLowerCase()];
  }

  try {
    var today = new Date();
    if (!result.startMonthIndex || !result.endMonthIndex) return date;
    var startYear = result.startMonthIndex >= today.getMonth() ? today.getFullYear() : today.getFullYear() + 1;
    var endYear = result.endMonthIndex >= today.getMonth() ? today.getFullYear() : today.getFullYear() + 1;
    var estimatedStart = new Date(startYear, result.startMonthIndex, result.startDay);
    var estimatedEnd = new Date(endYear, result.endMonthIndex, result.endDay);
    var startDiffOverDays = Math.ceil(Math.abs(estimatedStart - today) / (1000 * 60 * 60 * 24));
    var endDiffOverDays = Math.ceil(Math.abs(estimatedEnd - today) / (1000 * 60 * 60 * 24));
    var startDiffOverWeeks = startDiffOverDays < 7 ? 0 : Math.ceil(startDiffOverDays / 7);
    var endDiffOverWeeks = endDiffOverDays < 7 ? 0 : Math.ceil(endDiffOverDays / 7);

    if (startDiffOverWeeks === 0 && endDiffOverWeeks === 0) {
      return "".concat(startDiffOverDays, " - ").concat(endDiffOverDays, " G\xFCn");
    }

    if (startDiffOverWeeks === 0 && endDiffOverWeeks >= 1) {
      return "".concat(startDiffOverDays, " G\xFCn - ").concat(endDiffOverWeeks, " Hafta");
    }

    if (startDiffOverWeeks === endDiffOverWeeks) {
      return "".concat(startDiffOverWeeks, " Hafta");
    }

    return "".concat(startDiffOverWeeks, " - ").concat(endDiffOverWeeks, " Hafta");
  } catch (err) {
    return date;
  }
};
var idleTimer = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8(timeOut, callBack) {
    var idleTimeout, resetTimer;
    return regenerator_default().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            resetTimer = function _resetTimer() {
              clearTimeout(idleTimeout);
              idleTimeout = setTimeout(callBack, timeOut);
            };

            idleTimeout = setTimeout(callBack, timeOut);
            window.top.document.ontouchstart = resetTimer;

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function idleTimer(_x5, _x6) {
    return _ref8.apply(this, arguments);
  };
}();
var getBrowserType = function getBrowserType() {
  var userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    return "chrome";
  }

  if (userAgent.match(/firefox|fxios/i)) {
    return "firefox";
  }

  if (userAgent.match(/safari/i)) {
    return "safari";
  }

  if (userAgent.match(/opr\//i)) {
    return "opera";
  }

  if (userAgent.match(/edg/i)) {
    return "edge";
  }

  return null;
};
var isOwnMutation = function isOwnMutation(mutationList) {
  var nodes = [].concat(_toConsumableArray(Array.from(mutationList[0].addedNodes)), _toConsumableArray(Array.from(mutationList[0].removedNodes)));
  return nodes.some(function (n) {
    return n.tagName && Array.from(n.classList).some(function (c) {
      return c.includes("bn-");
    });
  });
}; // ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.

function csvToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ","; // Create a regular expression to parse the CSV values.

  var objPattern = new RegExp( // Delimiters.
  "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + // Quoted fields.
  "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // Standard fields.
  "([^\"\\" + strDelimiter + "\\r\\n]*))", "gi"); // Create an array to hold our data. Give the array
  // a default empty first row.

  var arrData = [[]]; // Create an array to hold our individual pattern
  // matching groups.

  var arrMatches = null; // Keep looping over the regular expression matches
  // until we can no longer find a match.

  while (arrMatches = objPattern.exec(strData)) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1]; // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.

    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    var strMatchedValue = void 0; // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).

    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    } // Now that we have our value string, let's add
    // it to the data array.


    arrData[arrData.length - 1].push(strMatchedValue);
  } // Return the parsed data.


  return arrData;
}
;// CONCATENATED MODULE: ./src/BeagleDataCollection/store.config.js
var config = {
  dbName: "beagle",
  version: 1,
  maintenanceOperationCount: 1000,
  // affects version
  store: {
    name: "data",
    indexes: [{
      name: "ix_dataName",
      fields: ["data_name"]
    }, {
      name: "ix_dataName_session",
      fields: ["data_name", "session_id"]
    }, {
      name: "ix_dataName_dataValue",
      fields: ["data_name", "data_value"]
    }, {
      name: "ix_dataName_dataValue_session",
      fields: ["data_name", "data_value", "session_id"]
    }],
    options: {
      keyPath: "id",
      autoIncrement: true
    }
  }
};
/* harmony default export */ var store_config = (config);
;// CONCATENATED MODULE: ./src/BeagleDataCollection/api.js






function api_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = api_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function api_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return api_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return api_arrayLikeToArray(o, minLen); }

function api_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var api_logger = new src_logger("BeagleDataCollectionWrapper");
var _window = {
  alltime: "alltime",
  session: "session"
};

var BeagleDataCollectionWrapper = /*#__PURE__*/function () {
  function BeagleDataCollectionWrapper() {
    _classCallCheck(this, BeagleDataCollectionWrapper);

    this.indexedDB = null;

    try {
      this.init();
    } catch (err) {
      api_logger.failed("Failed to initialized db with: ", err.message);
    }
  }

  _createClass(BeagleDataCollectionWrapper, [{
    key: "init",
    value: function init() {
      var _window$top$indexedDB,
          _this = this;

      api_logger.log("Initializing indexedDB"); // TODO, uncomment next line once existing stale dbs are purged
      // const openRequest = window.top.indexedDB?.open(config.dbName, config.version);

      var openRequest = (_window$top$indexedDB = window.top.indexedDB) === null || _window$top$indexedDB === void 0 ? void 0 : _window$top$indexedDB.open(store_config.dbName);

      if (!openRequest) {
        throw new Error("indexeddb is not supported");
      }

      openRequest.onupgradeneeded = function (event) {
        switch (event.oldVersion) {
          case 0:
            break;

          default:
            // TODO upgrade existing db instead of delete and create from scratch
            try {
              openRequest.result.deleteObjectStore(store_config.store.name);
            } catch (err) {
              api_logger.failed("Could not delete outdated database", err.message);
            }

            break;
        }

        try {
          var _config$store$indexes;

          var store = openRequest.result.createObjectStore(store_config.store.name, store_config.store.options);

          if (((_config$store$indexes = store_config.store.indexes) === null || _config$store$indexes === void 0 ? void 0 : _config$store$indexes.length) > 0) {
            var _iterator = api_createForOfIteratorHelper(store_config.store.indexes),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var idx = _step.value;
                store.createIndex(idx.name, idx.fields);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        } catch (err) {
          api_logger.failed("Could not create object store on database", err.message);
        }
      };

      openRequest.onerror = function () {
        throw new Error("Error initializing indexed DB", openRequest.error);
      };

      openRequest.onsuccess = function () {
        var db = openRequest.result;

        if (db.version !== 1) {
          // TODO, remove delete request once existing stale dbs are purged
          var deleteRequest = window.indexedDB.deleteDatabase(store_config.dbName);

          deleteRequest.onsuccess = function () {
            _this.init();
          };
        } else _this.indexedDB = db;
      };
    }
  }, {
    key: "getConnection",
    value: function getConnection() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var interval = setInterval(function () {
          if (_this2.indexedDB) {
            clearInterval(interval);
            resolve();
          }
        }, 25);
        setTimeout(function () {
          if (!_this2.indexedDB) {
            clearInterval(interval);
            reject(new Error("IndexedDB not initialized within the allotted time"));
          }
        }, 5000);
      });
    }
  }, {
    key: "initTransaction",
    value: function () {
      var _initTransaction = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var readwrite,
            tx,
            store,
            _args = arguments;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                readwrite = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                _context.next = 3;
                return this.getConnection();

              case 3:
                tx = this.indexedDB.transaction(store_config.store.name, readwrite ? "readwrite" : "readonly");
                store = tx.objectStore(store_config.store.name);
                return _context.abrupt("return", store);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initTransaction() {
        return _initTransaction.apply(this, arguments);
      }

      return initTransaction;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(dataName, dataValue) {
        var store, sessionId, time, payload;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.initTransaction(true);

              case 2:
                store = _context2.sent;
                sessionId = this.getCurrentSessionId(); // date current -2 saat  yil-ay-gun

                time = Math.round(Date.now() / 1000);
                payload = {
                  "data_name": dataName,
                  "data_value": dataValue,
                  "session_id": sessionId,
                  time: time
                };
                store.put(payload);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save(_x, _x2) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "minmax",
    value: function minmax(dataName, op) {
      var _this3 = this;

      var window = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _window.alltime;
      return new Promise(function (resolve) {
        _this3.initTransaction().then(function (store) {
          var stored = undefined;

          _this3.getCursor(store, dataName, window).onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
              var value = cursor.value;

              if ("data_value" in value) {
                if (stored === undefined || op === "min" && value["data_value"] < stored || op === "max" && value["data_value"] > stored) {
                  stored = value["data_value"];
                }
              } else {
                console.warn("key not found in cursor values " + dataName);
              }

              cursor.continue();
            } else {
              resolve(stored);
            }
          };
        });
      });
    }
  }, {
    key: "min",
    value: function min(dataName) {
      var window = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _window.alltime;
      return this.minmax(dataName, "min", window);
    }
  }, {
    key: "max",
    value: function max(dataName) {
      var window = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _window.alltime;
      return this.minmax(dataName, "max", window);
    }
  }, {
    key: "groupBy",
    value: function groupBy(dataName) {
      var _this4 = this;

      var window = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _window.alltime;
      return new Promise(function (resolve) {
        _this4.initTransaction().then(function (store) {
          var map = new Map();

          _this4.getCursor(store, dataName, window).onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
              var value = cursor.value;

              if ("data_value" in value) {
                if (!map.has(value["data_value"])) map.set(value["data_value"], 0);
                map.set(value["data_value"], map.get(value["data_value"]) + 1);
              } else {
                console.warn("key not found in cursor values " + dataName);
              }

              cursor.continue();
            } else {
              resolve(map);
            }
          };
        });
      });
    }
  }, {
    key: "mode",
    value: function () {
      var _mode = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(dataName) {
        var window,
            data,
            max,
            _iterator2,
            _step2,
            _step2$value,
            key,
            value,
            _args3 = arguments;

        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                window = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _window.alltime;
                _context3.next = 3;
                return this.groupBy(dataName, window);

              case 3:
                data = _context3.sent;

                if (!(data.keys().length === 0)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", null);

              case 6:
                max = {
                  name: undefined,
                  value: -1
                };
                _iterator2 = api_createForOfIteratorHelper(data);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    _step2$value = _slicedToArray(_step2.value, 2), key = _step2$value[0], value = _step2$value[1];

                    if (max.value < value) {
                      max.name = key;
                      max.value = value;
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                return _context3.abrupt("return", max);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function mode(_x3) {
        return _mode.apply(this, arguments);
      }

      return mode;
    }()
  }, {
    key: "count",
    value: function count(dataName) {
      var _this5 = this;

      var window = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _window.alltime;
      return new Promise(function (resolve) {
        _this5.initTransaction().then(function (store) {
          var count = 0;

          _this5.getCursor(store, dataName, window).onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
              count++;
              cursor.continue();
            } else {
              resolve(count);
            }
          };
        });
      });
    }
  }, {
    key: "sum",
    value: function sum(dataName) {
      var _this6 = this;

      var window = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "alltime";
      return new Promise(function (resolve) {
        _this6.initTransaction().then(function (store) {
          var total = 0.00;

          _this6.getCursor(store, dataName, window).onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
              var value = cursor.value;

              if ("data_value" in value) {
                total += parseFloat(value["data_value"]);
              } else {
                console.warn("key not found in cursor values " + dataName);
              }

              cursor.continue();
            } else {
              resolve(total.toFixed(2));
            }
          };
        });
      });
    }
  }, {
    key: "getCursor",
    value: function getCursor(store, dataName) {
      var window = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _window.alltime;
      var dataValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      if (dataValue) {
        if (window === _window.session) {
          return store.index("ix_dataName_dataValue_session").openCursor(IDBKeyRange.only([dataName, dataValue, this.getCurrentSessionId().toString()]));
        }

        return store.index("ix_dataName_dataValue").openCursor(IDBKeyRange.only([dataName, dataValue]));
      }

      if (window === _window.session) {
        return store.index("ix_dataName_session").openCursor(IDBKeyRange.only([dataName, this.getCurrentSessionId().toString()]));
      }

      var indexValue = getBrowserType() === "safari" ? dataName : [dataName];
      return store.index("ix_dataName").openCursor(IDBKeyRange.only(indexValue));
    }
  }, {
    key: "avg",
    value: function () {
      var _avg = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(dataName) {
        var window,
            total,
            count,
            _args4 = arguments;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                window = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _window.alltime;
                _context4.next = 3;
                return this.sum(dataName, window);

              case 3:
                total = _context4.sent;
                _context4.next = 6;
                return this.count(dataName, window);

              case 6:
                count = _context4.sent;

                if (!(!total || !count)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", 0);

              case 9:
                return _context4.abrupt("return", (total / count).toFixed(2));

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function avg(_x4) {
        return _avg.apply(this, arguments);
      }

      return avg;
    }()
  }, {
    key: "last",
    value: function () {
      var _last = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(dataName) {
        var _this7 = this;

        var size,
            window,
            _args5 = arguments;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                size = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 1;
                window = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : _window.alltime;
                return _context5.abrupt("return", new Promise(function (resolve) {
                  _this7.initTransaction().then(function (store) {
                    var cursor = store.index("ix_dataName").openCursor([dataName], "prev");

                    if (window === _window.session) {
                      cursor = store.index("ix_dataName_session").openCursor([dataName, _this7.getCurrentSessionId()], "prev");
                    }

                    var index = 0;
                    var values = [];

                    cursor.onsuccess = function (event) {
                      var result = event.target.result;

                      if (result && index < size) {
                        index++;
                        values.push(result.value);
                        result.continue();
                      } else {
                        resolve(values);
                      }
                    };
                  });
                }));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function last(_x5) {
        return _last.apply(this, arguments);
      }

      return last;
    }()
  }, {
    key: "getCurrentSessionId",
    value: function getCurrentSessionId() {
      var d = new Date();
      d.setHours(d.getHours() - 2);
      return d.getFullYear() + "-" + (d.getMonth() + 1).toString().padStart(2, "0") + "-" + d.getDate().toString().padStart(2, "0");
    }
  }]);

  return BeagleDataCollectionWrapper;
}();


;// CONCATENATED MODULE: ./src/BeagleDataCollection/index.js




function BeagleDataCollection_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleDataCollection_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleDataCollection_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleDataCollection_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleDataCollection_arrayLikeToArray(o, minLen); }

function BeagleDataCollection_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable max-len */


var BeagleDataCollection_logger = new src_logger("BeagleDataCollection");
var collectorApi = new BeagleDataCollectionWrapper(); // keep a table in indexdb the format [session_id, data_name, data_value, stored_value]

var queryInCollector = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(baseFeatureName, queryMethod, window) {
    var queryPromise, _queryPromise, _queryPromise2, data, count, _iterator, _step, _step$value, value, _data, match, _queryPromise3, dataValues;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            BeagleDataCollection_logger.log("queryInCollector", baseFeatureName, queryMethod, window);

            if (collectorApi) {
              _context.next = 4;
              break;
            }

            BeagleDataCollection_logger.failed("IndexedDB no supported/Initialized");
            return _context.abrupt("return", null);

          case 4:
            if (!(queryMethod === "min")) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return collectorApi.min(baseFeatureName, window);

          case 7:
            queryPromise = _context.sent;
            return _context.abrupt("return", queryPromise);

          case 11:
            if (!(queryMethod === "max")) {
              _context.next = 18;
              break;
            }

            _context.next = 14;
            return collectorApi.max(baseFeatureName, window);

          case 14:
            _queryPromise = _context.sent;
            return _context.abrupt("return", _queryPromise);

          case 18:
            if (!(queryMethod === "avg")) {
              _context.next = 25;
              break;
            }

            _context.next = 21;
            return collectorApi.avg(baseFeatureName, window);

          case 21:
            _queryPromise2 = _context.sent;
            return _context.abrupt("return", _queryPromise2);

          case 25:
            if (!(queryMethod === "cd")) {
              _context.next = 31;
              break;
            }

            _context.next = 28;
            return collectorApi.groupBy(baseFeatureName, window);

          case 28:
            return _context.abrupt("return", _context.sent.size);

          case 31:
            if (!(queryMethod === "cv")) {
              _context.next = 39;
              break;
            }

            _context.next = 34;
            return collectorApi.groupBy(baseFeatureName, window);

          case 34:
            data = _context.sent;
            count = 0;
            _iterator = BeagleDataCollection_createForOfIteratorHelper(data);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _step$value = _slicedToArray(_step.value, 2), value = _step$value[1];
                count += value;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context.abrupt("return", count);

          case 39:
            if (!(queryMethod === "mode")) {
              _context.next = 46;
              break;
            }

            _context.next = 42;
            return collectorApi.mode(baseFeatureName, window);

          case 42:
            _data = _context.sent;

            if (_data) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", null);

          case 45:
            return _context.abrupt("return", _data.name);

          case 46:
            if (!(queryMethod.indexOf("last") >= 0)) {
              _context.next = 55;
              break;
            }

            match = queryMethod.match("last\\(([\\d]+)\\)");

            if (!(!match || !match.length === 2 || parseInt(match[1]) < 1)) {
              _context.next = 50;
              break;
            }

            return _context.abrupt("return", null);

          case 50:
            _context.next = 52;
            return collectorApi.last(baseFeatureName, match[1], window);

          case 52:
            _queryPromise3 = _context.sent;
            dataValues = _queryPromise3.map(function (obj) {
              return obj.data_value;
            });
            return _context.abrupt("return", dataValues);

          case 55:
            /**
              {"Listingpage" => 21}
              {"Homepage" => 12}
              -- example will have:
              mode: Listingpage
              cd: 2
              cv: 21+12
              last(3) (n, n-1, n-2)
            */
            // 1000lik temizlenecek (maintOpCount -> version)
            // queryMethod can be "mode", "cd" (count distint) for string/categorical data types
            // queryMethod can be "cv" (sum of count values), "current", or "prev" for any data type (stored via last)
            BeagleDataCollection_logger.failed("unknown queryMethod=".concat(queryMethod, " in BeagleDataCollection"));
            return _context.abrupt("return", null);

          case 57:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function queryInCollector(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var updateInCollector = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(baseFeatureName, baseFeatureValue, updateMethod) {
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            BeagleDataCollection_logger.log("updateInCollector", baseFeatureName, baseFeatureValue, updateMethod);

            if (collectorApi) {
              _context2.next = 4;
              break;
            }

            BeagleDataCollection_logger.failed("IndexedDB no supported/Initialized");
            return _context2.abrupt("return", null);

          case 4:
            _context2.next = 6;
            return collectorApi.save(baseFeatureName, baseFeatureValue);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateInCollector(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/BeagleInfoLayer/index.js





function BeagleInfoLayer_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleInfoLayer_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleInfoLayer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleInfoLayer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleInfoLayer_arrayLikeToArray(o, minLen); }

function BeagleInfoLayer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable max-len */




window.beagleInfoLayer = window.beagleInfoLayer || {
  a: {},
  e: {},
  f: {},
  __hwm: 0
};
var BeagleInfoLayer_logger = new src_logger("BeagleInfoLayer"); // TODO: convert to name --> array of selectors

var searchPaths = [// ----------------------------------------------------------------------------------------------------------------------------------------------
// GA Data Layer Queries
{
  PageTypeDepend: "*",
  method: "GADataLayer",
  selector: "PageType",
  name: "PageType"
}, {
  PageTypeDepend: "*",
  method: "GADataLayer",
  selector: "isAdmin",
  name: "vvsIsShowroom"
}, {
  PageTypeDepend: "*",
  method: "GADataLayer",
  selector: "userId",
  name: "vvsUserId"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "content_name",
  name: "pdp.name"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "productgroup",
  name: "pdp.group"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivense_category",
  name: "pdp.class"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "content_ids",
  name: "pdp.sku",
  formatter: "upperCaseTR"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "ProductID",
  name: "pdp.sku"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "content_category",
  name: "pdp.category"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "ecommerce.detail.actionField.list",
  name: "pdp.listalias"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivenseProducts.*.sku",
  name: "pdp.sku",
  formatter: "dearray"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivenseProducts.*.category",
  name: "pdp.category",
  formatter: "dearray"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivenseProducts.*.discountRate",
  name: "pdp.discountRate",
  formatter: "dearray"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivenseProducts.*.fastDelivery",
  name: "pdp.fastDelivery",
  formatter: "dearray"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivenseProducts.*.isInShowroom",
  name: "pdp.isInShowroom",
  formatter: "dearray"
}, {
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivenseProducts.*.price",
  name: "pdp.price",
  formatter: "dearray"
}, {
  PageTypeDepend: "Listingpage",
  method: "GADataLayer",
  selector: "search_success",
  name: "plp.searchSuccess",
  exclusive: ["plp.id", "plp.approximateCount", "plp.name", "plp.group", "plp.class"]
}, {
  PageTypeDepend: "Listingpage",
  method: "GADataLayer",
  selector: "content_ids",
  name: "plp.id",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "Listingpage",
  method: "GADataLayer",
  selector: "category_product_count",
  name: "plp.approximateCount",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "Listingpage",
  method: "GADataLayer",
  selector: "content_name",
  name: "plp.name",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "Listingpage",
  method: "GADataLayer",
  selector: "productgroup",
  name: "plp.group",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "Listingpage",
  method: "GADataLayer",
  selector: "vivense_category",
  name: "plp.class",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.id",
  name: "purchase.skus"
}, {
  PageTypeDepend: "purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.price",
  name: "purchase.prices"
}, {
  PageTypeDepend: "purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.quantity",
  name: "purchase.quantities"
}, {
  PageTypeDepend: "purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.category",
  name: "purchase.categories"
}, {
  PageTypeDepend: "purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.actionField.id",
  name: "purchase.orderId"
}, {
  PageTypeDepend: "purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.actionField.revenue",
  name: "purchase.revenue"
}, {
  PageTypeDepend: "purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.actionField.dimension15",
  name: "purchase.paymentType"
}, // ----------------------------------------------------------------------------------------------------------------------------------------------
// Document Queries
{
  PageTypeDepend: "*",
  method: "DocQuery",
  selector: "[class*=\"page_preview_wrapper_production\"]",
  name: "PageType",
  operand: "docQueryValueIfHasInnerText",
  value: "Homepage"
}, {
  PageTypeDepend: "*",
  method: "DocQuery",
  selector: "[class*=\"category_page_wrapper\"]",
  name: "PageType",
  operand: "docQueryValueIfHasInnerText",
  value: "Listingpage"
}, {
  PageTypeDepend: "*",
  method: "DocQuery",
  selector: "[class*=\"product-main-details\"]",
  name: "PageType",
  operand: "docQueryValueIfHasInnerText",
  value: "Productpage"
}, {
  PageTypeDepend: "*",
  method: "DocQuery",
  selector: "[class*=\"product\"]",
  name: "PageType",
  operand: "docQueryValueIfHasInnerText",
  value: "Productpage"
}, {
  PageTypeDepend: "Homepage|Productpage|Listingpage",
  method: "DocQuery",
  selector: "[class*=\"welcome_username\"]",
  name: "view.isLoggedIn",
  operand: "docQueryHasInnerText"
}, {
  PageTypeDepend: "Homepage|Productpage|Listingpage",
  method: "DocQuery",
  selector: "[class*=\"empty_basket_text\"]",
  name: "cart.isempty",
  operand: "docQueryHasInnerText",
  exclusive: ["cart.totalBasePrice", "cart.skucount", "cart.couponNotApplicable"]
}, {
  PageTypeDepend: "Homepage|Productpage|Listingpage",
  method: "DocQuery",
  selector: "body > .desktop_layout_wrapper .not-allowed-coupon",
  name: "cart.couponNotApplicable",
  operand: "docQuerySumNumInnerText",
  exclusive: ["cart.isempty"]
}, // Note that sequential search will mark copuonNotApplicable as found
{
  PageTypeDepend: "Homepage|Productpage|Listingpage",
  method: "DocQuery",
  selector: "[class*=\"basket_total_price\"]",
  name: "cart.totalBasePrice",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "Homepage|Productpage|Listingpage",
  method: "DocQuery",
  selector: "[id*=\"cart_quantity\"], [class*=\"basket_length\"]",
  name: "cart.skucount",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"]
}, {
  PageTypeDepend: "Productpage",
  method: "DocQuery",
  selector: "[class*=\"delivery-date\"]",
  name: "pdp.deliveryDate",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "Productpage",
  method: "DocQuery",
  selector: "[class*=\"delivery-date\"]",
  name: "pdp.deliveryDateFormatted",
  operand: "docQueryInnerText",
  formatter: "formatDeliveryDate"
}, {
  PageTypeDepend: "Productpage",
  method: "DocQuery",
  selector: "[class*=\"product-title\"], [class*=\"header-bottom\"]",
  name: "pdp.name",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "Productpage",
  method: "DocQuery",
  selector: "[class*=\"vivense-showrooms\"] > *",
  name: "pdp.showroomcount",
  operand: "docQueryCountElts",
  exclusive: ["pdp.hasNoShowrooms"]
}, {
  PageTypeDepend: "Productpage",
  method: "DocQuery",
  selector: "#vivense-showroom-tab p:not(.vivense-showrooms)",
  name: "pdp.hasNoShowrooms",
  operand: "docQueryHasInnerText",
  exclusive: ["pdp.showroomcount"]
}, {
  PageTypeDepend: "Listingpage",
  method: "DocQuery",
  selector: "[class*=\"count-of-product\"]",
  name: "plp.itemCount",
  operand: "docQueryInnerText",
  formatter: "numericOnly"
}, {
  PageTypeDepend: "Listingpage",
  method: "DocQuery",
  selector: "[class*=\"subcategories-title\"]",
  name: "plp.name",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "Listingpage",
  method: "DocQuery",
  selector: ".product-card[data-product-sku]",
  name: "__features.SKUsonPage",
  operand: "docQueryAttribValueList",
  value: "data-product-sku"
}, {
  PageTypeDepend: "Listingpage",
  method: "DocQuery",
  selector: ".product-list",
  observer: "listingItemBlock",
  name: "__listingItemBlockObserver",
  children: ["__features.SKUsonPage"],
  operand: "docQueryObserve"
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: ".empty-cart-container, .empty-cart",
  name: "cart.isempty",
  operand: "docQueryHasInnerText",
  exclusive: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "__checkoutFormObserver"]
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: ".bracket-text, .product-count",
  name: "cart.skucount",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: ".cartItemQuantity",
  name: "cart.quantities",
  operand: "docQueryAttribValueList",
  value: "data-previous",
  exclusive: ["cart.isempty"]
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: "#bill_total",
  name: "cart.totalPrice",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: "[class*=\"order-final-number\"]",
  name: "cart.totalPriceFinal",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: "[class*=\"cart-price\"] .not-allowed-coupon",
  name: "cart.couponNotApplicable",
  operand: "docQuerySumNumInnerText",
  exclusive: ["cart.isempty"]
}, // Note that sequential search will mark couponApplicable as found
{
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: ".cart-inside",
  name: "cart.skus",
  operand: "docQueryAttribValueList",
  value: "data-sku",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"]
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: ".cart-inside",
  name: "cart.categories",
  operand: "docQueryAttribValueList",
  value: "data-last-breadcrumb",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"]
}, {
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: ".cart-inside",
  name: "cart.prices",
  operand: "docQueryAttribValueList",
  value: "data-price",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"]
}, // Desktop observer for the right panel, as it is the one changing
{
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: ".cart-right-container",
  observer: "checkoutForm",
  name: "__checkoutFormObserver",
  children: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "cart.isempty", "cart.couponApplicableAmount"],
  operand: "docQueryObserve"
}, // Mobile observer for the full form block as it is completely replaced
{
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: "#checkoutForm",
  observer: "checkoutForm",
  name: "__checkoutFormObserver",
  children: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "cart.isempty", "cart.couponApplicableAmount"],
  operand: "docQueryObserve"
}, {
  PageTypeDepend: "purchase",
  method: "DocQuery",
  selector: "[class*=\"basket_summary_total\"], [class*=\"total_row\"]",
  name: "purchase.revenue",
  operand: "docQueryInnerText",
  formatter: "numericOnly"
}, {
  PageTypeDepend: "purchase",
  method: "DocQuery",
  selector: "[class*=\"order_follow_numb\"], [class*=\"cart-title-bottom\"]",
  name: "purchase.vvsTxnId",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "purchase",
  method: "DocQuery",
  selector: ".payment_type_title, .cart-title-info",
  name: "purchase.paymentType",
  operand: "docQueryInnerText",
  formatter: "lowerCaseTRFirstWord"
}, {
  PageTypeDepend: "purchase",
  method: "DocQuery",
  selector: "[class*=\"product_sku_code\"]",
  name: "purchase.skus",
  operand: "docQueryArrayInnerText"
}, {
  PageTypeDepend: "purchase",
  method: "DocQuery",
  selector: ".cart-inside",
  name: "purchase.skus",
  operand: "docQueryAttribValueList",
  value: "data-sku"
}, // ----------------------------------------------------------------------------------------------------------------------------------------------
// SORG Elements
{
  PageTypeDepend: "Productpage",
  method: "DocSorg",
  selector: "sku",
  name: "pdp.sku"
}, {
  PageTypeDepend: "Productpage",
  method: "DocSorg",
  selector: "mpn",
  name: "pdp.mpn"
}, {
  PageTypeDepend: "Productpage",
  method: "DocSorg",
  selector: "name",
  name: "pdp.name",
  operand: "JSONFilterOther",
  value: "@type=Product"
}, {
  PageTypeDepend: "Productpage",
  method: "DocSorg",
  selector: "offers.price",
  name: "pdp.price"
}, {
  PageTypeDepend: "Productpage",
  method: "DocSorg",
  selector: "offers.priceValidUntil",
  name: "pdp.priceValidUntil"
}, {
  PageTypeDepend: "Productpage",
  method: "DocSorg",
  selector: "itemListElement.*.name",
  name: "view.breadcrumb"
}, {
  PageTypeDepend: "Listingpage",
  method: "DocSorg",
  selector: "mainEntity.name",
  name: "plp.name"
}, {
  PageTypeDepend: "Listingpage",
  method: "DocSorg",
  selector: "mainEntity.numberOfItems",
  name: "plp.itemCount"
}, {
  PageTypeDepend: "Listingpage",
  method: "DocSorg",
  selector: "breadcrumb.itemListElement.*.item.name",
  name: "view.breadcrumb"
}, // ----------------------------------------------------------------------------------------------------------------------------------------------
// Window custom elements
{
  PageTypeDepend: "*",
  method: "SingleWT",
  selector: "favoriteProducts",
  name: "view.favoritedMPNs"
}, {
  PageTypeDepend: "*",
  method: "SingleWT",
  selector: "isAdmin",
  name: "vvsIsShowroom",
  formatter: "toString"
}, {
  PageTypeDepend: "*",
  method: "SingleWT",
  selector: "userId",
  name: "vvsUserId"
}];
var featureEngineeringOps = {
  "view_epoch": [{
    updateMethod: "min"
  }, {
    queryMethod: "min",
    window: "session",
    featureName: "history.view_epoch_min"
  }],
  "PageType": [{
    updateMethod: "count_values"
  }, {
    queryMethod: "cv",
    window: "session",
    featureName: "history.PageType_count_session"
  }, {
    queryMethod: "cv",
    window: "alltime",
    featureName: "history.PageType_count_alltime"
  }],
  "cart.couponApplicableAmount": [{
    updateMethod: "last"
  }, {
    queryMethod: "last(1)",
    window: "session",
    featureName: "__features.lastCartCouponApplicable"
  }],
  "pdp.category": [{
    updateMethod: "count_values"
  }, {
    updateMethod: "last"
  }, {
    queryMethod: "mode",
    window: "session",
    featureName: "history.pdp_category_mode_session"
  }, {
    queryMethod: "last(1)",
    window: "session",
    featureName: "history.pdp_category_last_session"
  }],
  "cart.skus": [{
    updateMethod: "last"
  }, {
    queryMethod: "last(1)",
    window: "session",
    featureName: "__features.SKUsonLastCartView"
  }]
};
var increaseBeagleInfoLayerHWM = function increaseBeagleInfoLayerHWM() {
  var infoLayer = window.top.beagleInfoLayer; // update hwm to indicate change

  infoLayer.__hwm += 1;
};
var addToBeagleInfoLayer = function addToBeagleInfoLayer(key, value) {
  var infoLayer = window.top.beagleInfoLayer;
  if (key === null || key === undefined) return; // if value is string, add as a clean string, if object add the same

  var typedValue = typeof value === "string" ? value.toString().trim() : value; // if key contains . create nested object

  if (key.indexOf(".") > -1) {
    var keys = key.split(".");
    var lastKey = keys.pop();
    var obj = infoLayer;
    keys.forEach(function (key) {
      if (!obj[key]) obj[key] = {};
      obj = obj[key];
    });
    obj[lastKey] = typedValue;
  } else {
    infoLayer[key] = typedValue;
  } // update hwm to indicate change


  increaseBeagleInfoLayerHWM(); // process dependent historical data for scan-found elements

  if (typedValue !== undefined && typedValue !== null) {
    updateDerivationsInCollector(key, typedValue);
    passValueToListeners(key, typedValue);
  }
};
var DATA_LISTENERS = {};
var addDataListener = function addDataListener(key, listener) {
  if (!DATA_LISTENERS[key]) {
    DATA_LISTENERS[key] = [];
  }

  DATA_LISTENERS[key].push(listener);
};

var passValueToListeners = function passValueToListeners(key, value) {
  var listeners = DATA_LISTENERS[key];

  if (listeners && Array.isArray(listeners) && listeners.length > 0) {
    for (var i = 0; i < listeners.length; i += 1) {
      var listener = listeners[i];

      if (typeof listener === "function") {
        BeagleInfoLayer_logger.log("passValueToListeners --> value ".concat(value, " to listener ").concat(i, " of key ").concat(key));
        listener(value);
      }
    }
  }
};

var getFromBeagleInfoLayer = function getFromBeagleInfoLayer(key) {
  var blocking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var pollInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
  // TODO: check featureEngineering and search list if all marked as found but value is missing
  var infoLayer = window.top.beagleInfoLayer; // return null if key is missing or not an array or has no elements

  if (!key) return null;
  var obtainData = jsonGet(infoLayer, key);

  if (obtainData !== null && obtainData !== undefined) {
    // found data for key
    return Promise.resolve(obtainData);
  }

  var _iterator = BeagleInfoLayer_createForOfIteratorHelper(searchPaths),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var searchElement = _step.value;

      if (key === searchElement.name && (searchElement.isFound || searchElement.isIgnore)) {
        // data is missing but element is marked as found or ignored
        return Promise.resolve(null);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (blocking) {
    return new Promise(function (resolve) {
      var interval = setInterval(function () {
        obtainData = jsonGet(infoLayer, key);

        if (obtainData !== null && obtainData !== undefined) {
          // found data for key, clear interval and resolve
          clearInterval(interval);
          resolve(obtainData);
        }

        var _iterator2 = BeagleInfoLayer_createForOfIteratorHelper(searchPaths),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var searchElement = _step2.value;

            if (key === searchElement.name && (searchElement.isFound || searchElement.isIgnore)) {
              // data is missing but element is marked as found or ignored
              clearInterval(interval);
              resolve(null);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }, pollInterval); // add timeout

      setTimeout(function () {
        clearInterval(interval);
        resolve(null);
      }, timeout); // wait blocking for "timeout" msecs
    });
  }

  return Promise.resolve(null);
};
var removeFromBeagleInfoLayer = function removeFromBeagleInfoLayer(key) {
  var infoLayer = window.top.beagleInfoLayer;
  if (key === null || key === undefined) return; // remove key from infoLayer

  if (key.indexOf(".") > -1) {
    var keys = key.split(".");
    var lastKey = keys.pop();
    var obj = infoLayer;
    keys.forEach(function (key) {
      if (!obj[key]) return;
      obj = obj[key];
    });
    BeagleInfoLayer_logger.log("removeFromBeagleInfoLayer", "Removing ".concat(lastKey, " from ").concat(JSON.stringify(obj)));
    delete obj[lastKey];
  } else {
    delete infoLayer[key];
  }

  increaseBeagleInfoLayerHWM(); // process dependent historical data for scan-found elements

  updateDerivationsInCollector(key, null);
  passValueToListeners(key, null);
};
var addTreatment = function addTreatment(id, businessRuleId, variant, status) {
  var dependant_on_treatment = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var value = {};
  var infoLayer = window.top.beagleInfoLayer;
  if (businessRuleId !== null && businessRuleId !== undefined) value.businessRuleId = businessRuleId;
  if (variant) value.variant = variant;

  switch (status) {
    case "applied":
      infoLayer.a[id] = value;
      break;

    case "skipped":
      value.dependant_on_treatment = dependant_on_treatment;
      infoLayer.e[id] = value;
      break;

    case "failed":
      infoLayer.f[id] = value;
      break;
  }

  increaseBeagleInfoLayerHWM();
};
var PARSESEARCHMAXRETRY = 10;
var PARSESEARCHSTARTDELAY = 10;
var parseSearchPathsDelay = PARSESEARCHSTARTDELAY;
var parseSearchPathsRetry = 0;
var initializeBeagleInfoLayer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Collect core data
            prepareCoreData(); // Trigger-start the parser loop

            parserCaller(); // Add metrics

            addMetrics();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initializeBeagleInfoLayer() {
    return _ref.apply(this, arguments);
  };
}();

var collectDerivationsFromCollector = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
    var baseFeatureNames, _i, _baseFeatureNames, baseFeatureName, FEData, _iterator3, _step3, FEOp, queryResponse;

    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseFeatureNames = Object.keys(featureEngineeringOps);
            _i = 0, _baseFeatureNames = baseFeatureNames;

          case 2:
            if (!(_i < _baseFeatureNames.length)) {
              _context2.next = 30;
              break;
            }

            baseFeatureName = _baseFeatureNames[_i];
            FEData = featureEngineeringOps[baseFeatureName];

            if (!(FEData && Array.isArray(FEData) && FEData.length > 0)) {
              _context2.next = 27;
              break;
            }

            _iterator3 = BeagleInfoLayer_createForOfIteratorHelper(FEData);
            _context2.prev = 7;

            _iterator3.s();

          case 9:
            if ((_step3 = _iterator3.n()).done) {
              _context2.next = 19;
              break;
            }

            FEOp = _step3.value;

            if (!(FEOp.queryMethod === null || FEOp.queryMethod === undefined)) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("continue", 17);

          case 13:
            _context2.next = 15;
            return queryInCollector(baseFeatureName, FEOp.queryMethod, FEOp.window);

          case 15:
            queryResponse = _context2.sent;
            addToBeagleInfoLayer(FEOp.featureName, queryResponse);

          case 17:
            _context2.next = 9;
            break;

          case 19:
            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](7);

            _iterator3.e(_context2.t0);

          case 24:
            _context2.prev = 24;

            _iterator3.f();

            return _context2.finish(24);

          case 27:
            _i++;
            _context2.next = 2;
            break;

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 21, 24, 27]]);
  }));

  return function collectDerivationsFromCollector() {
    return _ref2.apply(this, arguments);
  };
}();

var updateDerivationsInCollector = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(baseFeatureName, baseFeatureValue) {
    var FEData, _iterator4, _step4, FEOp;

    return regenerator_default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // process dependent historical data for scan-found elements
            FEData = featureEngineeringOps[baseFeatureName];

            if (!(FEData && Array.isArray(FEData) && FEData.length > 0)) {
              _context3.next = 21;
              break;
            }

            _iterator4 = BeagleInfoLayer_createForOfIteratorHelper(FEData);
            _context3.prev = 3;

            _iterator4.s();

          case 5:
            if ((_step4 = _iterator4.n()).done) {
              _context3.next = 13;
              break;
            }

            FEOp = _step4.value;

            if (!(FEOp.updateMethod === null || FEOp.updateMethod === undefined)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("continue", 11);

          case 9:
            _context3.next = 11;
            return updateInCollector(baseFeatureName, baseFeatureValue, FEOp.updateMethod);

          case 11:
            _context3.next = 5;
            break;

          case 13:
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](3);

            _iterator4.e(_context3.t0);

          case 18:
            _context3.prev = 18;

            _iterator4.f();

            return _context3.finish(18);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 15, 18, 21]]);
  }));

  return function updateDerivationsInCollector(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var processFormatter = function processFormatter(value, formatter) {
  if (value === null || value === undefined || !formatter) {
    return null;
  }

  switch (formatter) {
    case "upperCaseTR":
      return value.toString().toUpperCase("tr-TR");

    case "formatDeliveryDate":
      return formatDeliveryDate(value);

    case "numericOnly":
      return value.replace(/\D/g, "");

    case "lowerCaseTRFirstWord":
      return value.toString().toLowerCase("tr-TR").split(" ")[0];

    case "dearray":
      if (Array.isArray(value) && value.length > 0) {
        return value[0];
      }

      return value;

    case "toString":
      return value.toString().trim();

    default:
      return value;
  }
};

var searchObj = function searchObj(obj, searchElement) {
  var value;
  var layerValue;

  try {
    switch (searchElement.operand) {
      case "JSONFilterOther":
        {
          value = jsonGet(obj, searchElement.selector);

          if (value === null || value === undefined) {
            break;
          }

          var filterParams = searchElement.value.split("=");
          if (filterParams.length !== 2) break;
          var filterName = filterParams[0];
          var filterValue = filterParams[1];
          if (!filterName || !filterValue) break;
          var filterMatch = jsonGet(obj, filterName);
          if (!filterMatch || filterMatch !== filterValue) break;

          if (value && (Array.isArray(value) ? value.length > 0 : value.toString().trim().length > 0)) {
            layerValue = value;
          }
        }
        break;

      case "docQueryObserve":
        value = obj.querySelector(searchElement.selector);

        if (value !== null && value !== undefined) {
          searchElement.isFound = true; // update found status of the elements in the children list

          var toBeUpdated = [];
          searchElement.children.forEach(function (child) {
            var childElements = searchPaths.filter(function (element) {
              return element.name === child;
            }); // add childElements into toBeUpdated

            toBeUpdated.push.apply(toBeUpdated, _toConsumableArray(childElements));
          }); // run only if the element has added or removed children

          var observer = new MutationObserver( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(mutationList) {
              var triggerRestart;
              return regenerator_default().wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!isOwnMutation(mutationList)) {
                        _context4.next = 2;
                        break;
                      }

                      return _context4.abrupt("return");

                    case 2:
                      toBeUpdated.forEach(function (element) {
                        element.isFound = false;
                        removeFromBeagleInfoLayer(element.name);
                      });
                      triggerRestart = parseSearchPathsRetry >= PARSESEARCHMAXRETRY;
                      parseSearchPathsDelay = PARSESEARCHSTARTDELAY;
                      parseSearchPathsRetry = 0;

                      if (triggerRestart) {
                        BeagleInfoLayer_logger.log("searchObj: triggered a restart of searchpaths due: ", searchElement.name);
                        parserCaller();
                      }

                    case 7:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));

            return function (_x3) {
              return _ref4.apply(this, arguments);
            };
          }());
          observer.observe(value, {
            subtree: true,
            childList: true
          });
        }

        break;

      case "docQueryInnerText":
        value = obj.querySelector(searchElement.selector);

        if (value !== null && value !== undefined && value.innerText && value.innerText.trim().length > 0) {
          layerValue = value.innerText;
        }

        break;

      case "docQueryAttribValueList":
        {
          var attribValueList = [];
          value = obj.querySelectorAll(searchElement.selector);
          if (value === null || value === undefined || value.length === 0) break;

          var _iterator5 = BeagleInfoLayer_createForOfIteratorHelper(value),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var valuechild = _step5.value;
              var attribValue = valuechild.getAttribute(searchElement.value);

              if (attribValue) {
                attribValueList.push(attribValue);
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          if (attribValueList.length > 0) {
            layerValue = attribValueList;
          }
        }
        break;

      case "docQueryHasInnerText":
        value = obj.querySelector(searchElement.selector);

        if (value !== null && value !== undefined) {
          var setValue = value.innerText.trim().length > 0;
          layerValue = setValue.toString();
        }

        break;

      case "docQueryCountElts":
        value = obj.querySelectorAll(searchElement.selector);

        if (value !== null && value !== undefined) {
          layerValue = value.length;
        }

        break;

      case "docQueryValueIfHasInnerText":
        value = obj.querySelector(searchElement.selector);

        if (value && value.innerText && value.innerText.trim().length > 0) {
          layerValue = searchElement.value;
        }

        break;

      case "docQuerySumNumInnerText":
        {
          value = obj.querySelectorAll(searchElement.selector);
          if (value === null || value === undefined || value.length === 0) break;
          var sumPrice = 0;

          var _iterator6 = BeagleInfoLayer_createForOfIteratorHelper(value),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var child = _step6.value;
              var childText = child.innerText.trim().replace(/\D/g, "");

              if (childText.length > 0) {
                sumPrice += parseInt(childText);
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          if (sumPrice > 0) {
            layerValue = sumPrice;
          }
        }
        break;

      case "docQueryArrayInnerText":
        {
          value = obj.querySelectorAll(searchElement.selector);
          if (value === null || value === undefined || value.length === 0) break;
          var arrayInnerText = [];

          var _iterator7 = BeagleInfoLayer_createForOfIteratorHelper(value),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _child = _step7.value;

              var _childText = _child.innerText.trim();

              if (_childText.length > 0) {
                arrayInnerText.push(_childText);
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }

          if (arrayInnerText.length > 0) {
            layerValue = arrayInnerText;
          }
        }
        break;

      default:
        value = jsonGet(obj, searchElement.selector);

        if (value !== null && value !== undefined && (Array.isArray(value) ? value.length > 0 : value.toString().trim().length > 0)) {
          layerValue = value;
        }

        break;
    } // switch


    if (layerValue !== undefined && layerValue !== null) {
      if (searchElement.formatter) {
        layerValue = processFormatter(layerValue, searchElement.formatter);
      }

      addToBeagleInfoLayer(searchElement.name, layerValue);
      searchElement.isFound = true; // mark exclusive elements as found

      if (searchElement.exclusive && Array.isArray(searchElement.exclusive) && searchElement.exclusive.length > 0) {
        var _iterator8 = BeagleInfoLayer_createForOfIteratorHelper(searchPaths),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var exclusiveElement = _step8.value;

            if (searchElement.exclusive.includes(exclusiveElement.name)) {
              exclusiveElement.isFound = true;
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
    }

    if (searchElement.isFound) {
      return true;
    }
  } catch (e) {
    BeagleInfoLayer_logger.error("searchObj error: " + e);
  }

  return false;
};

var customDataDerivations = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
    var currentPageType, _yield$Promise$all, _yield$Promise$all2, isCartEmpty, totalBasePrice, couponNotApplicable, prices, quantities, totalPrice, i, couponApplicableAmount, sku, skuList;

    return regenerator_default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getFromBeagleInfoLayer("PageType", true, 50, 1000);

          case 2:
            currentPageType = _context5.sent;
            _context5.prev = 3;
            _context5.next = 6;
            return Promise.all([getFromBeagleInfoLayer("cart.isempty"), getFromBeagleInfoLayer("cart.totalBasePrice"), getFromBeagleInfoLayer("cart.couponNotApplicable"), getFromBeagleInfoLayer("cart.prices"), getFromBeagleInfoLayer("cart.quantities")]);

          case 6:
            _yield$Promise$all = _context5.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 5);
            isCartEmpty = _yield$Promise$all2[0];
            totalBasePrice = _yield$Promise$all2[1];
            couponNotApplicable = _yield$Promise$all2[2];
            prices = _yield$Promise$all2[3];
            quantities = _yield$Promise$all2[4];
            totalPrice = 0;

            if (!totalBasePrice && prices && Array.isArray(prices) && prices.length > 0 && quantities && Array.isArray(quantities) && quantities.length > 0 && prices.length === quantities.length) {
              for (i = 0; i < prices.length; i++) {
                totalPrice += parseInt(prices[i]) * parseInt(quantities[i]);
              }
            } else {
              totalPrice = parseInt(totalBasePrice);
            }

            couponApplicableAmount = 0;

            if (!isCartEmpty && totalPrice && couponNotApplicable) {
              couponApplicableAmount = totalPrice - parseInt(couponNotApplicable);
            } else if (!isCartEmpty && totalPrice) {
              couponApplicableAmount = parseInt(totalPrice);
            } else {
              couponApplicableAmount = 0;
            }

            addToBeagleInfoLayer("cart.couponApplicableAmount", couponApplicableAmount);

            if (isCartEmpty) {
              addToBeagleInfoLayer("cart.totalPrice", 0);
              addToBeagleInfoLayer("cart.couponNotApplicable", 0);
            }

            _context5.next = 24;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](3);
            BeagleInfoLayer_logger.error("customDataDerivations cannot compute couponApplicablePrice: " + _context5.t0);

          case 24:
            if (!(currentPageType === "Productpage")) {
              _context5.next = 33;
              break;
            }

            _context5.next = 27;
            return getFromBeagleInfoLayer("pdp.sku");

          case 27:
            sku = _context5.sent;

            if (!(sku !== null && sku !== undefined)) {
              _context5.next = 31;
              break;
            }

            _context5.next = 31;
            return addToBeagleInfoLayer("__features.SKUsonPage", [sku]);

          case 31:
            _context5.next = 40;
            break;

          case 33:
            if (!(currentPageType === "basket")) {
              _context5.next = 40;
              break;
            }

            _context5.next = 36;
            return getFromBeagleInfoLayer("cart.skus");

          case 36:
            skuList = _context5.sent;

            if (!(skuList !== null && Array.isArray(skuList) && skuList.length)) {
              _context5.next = 40;
              break;
            }

            _context5.next = 40;
            return addToBeagleInfoLayer("__features.SKUsonPage", skuList);

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 21]]);
  }));

  return function customDataDerivations() {
    return _ref5.apply(this, arguments);
  };
}();

var parseSearchPaths = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
    var domStatus, wintop, dataLayer, windoc, sorgArrayInner, foundNames, prevFoundNames, notFoundNames, currentPageType, _iterator9, _step9, searchElement, _iterator10, _step10, _searchElement, _iterator11, _step11, dataLayerItem, _iterator12, _step12, sorgItem;

    return regenerator_default().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            domStatus = document.readyState; // check if document and dom is loaded and ready for scrapping

            BeagleInfoLayer_logger.log("parseSearchPaths initialized with dom status:  " + domStatus);
            wintop = window.top;
            dataLayer = wintop.dataLayer;
            windoc = wintop.document;
            foundNames = new Set();
            prevFoundNames = new Set();
            notFoundNames = new Set(); // PageType can be inferred from URL, if found use it from there

            _context6.next = 10;
            return getFromBeagleInfoLayer("PageType");

          case 10:
            currentPageType = _context6.sent;

            if (currentPageType) {
              prevFoundNames.add("PageType");
            } // Loop through search lists and mark found names


            _iterator9 = BeagleInfoLayer_createForOfIteratorHelper(searchPaths);

            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                searchElement = _step9.value;

                if (searchElement.isFound) {
                  prevFoundNames.add(searchElement.name);
                }
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            _iterator10 = BeagleInfoLayer_createForOfIteratorHelper(searchPaths);
            _context6.prev = 15;

            _iterator10.s();

          case 17:
            if ((_step10 = _iterator10.n()).done) {
              _context6.next = 38;
              break;
            }

            _searchElement = _step10.value;

            if (!(_searchElement.isFound || _searchElement.isIgnore)) {
              _context6.next = 21;
              break;
            }

            return _context6.abrupt("continue", 36);

          case 21:
            if (!(foundNames.has(_searchElement.name) || prevFoundNames.has(_searchElement.name))) {
              _context6.next = 24;
              break;
            }

            // had already found this element on another parse item
            _searchElement.isFound = true;
            return _context6.abrupt("continue", 36);

          case 24:
            if (!(_searchElement.PageTypeDepend !== "*")) {
              _context6.next = 35;
              break;
            }

            if (currentPageType) {
              _context6.next = 32;
              break;
            }

            _context6.next = 28;
            return getFromBeagleInfoLayer("PageType");

          case 28:
            currentPageType = _context6.sent;

            if (currentPageType) {
              _context6.next = 32;
              break;
            }

            notFoundNames.add(_searchElement.name);
            return _context6.abrupt("continue", 36);

          case 32:
            if (!(_searchElement.PageTypeDepend.indexOf(currentPageType) < 0)) {
              _context6.next = 35;
              break;
            }

            // skip searchElement because of PageTypeDepend
            _searchElement.isIgnore = true;
            return _context6.abrupt("continue", 36);

          case 35:
            if (_searchElement.method === "SingleWT") {
              // SCAN Window for Single Elements
              searchAndSet(wintop, _searchElement, foundNames, notFoundNames);
            } else if (_searchElement.method === "GADataLayer") {
              // SCAN GA DATA LAYER
              _iterator11 = BeagleInfoLayer_createForOfIteratorHelper(dataLayer);

              try {
                for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                  dataLayerItem = _step11.value;
                  searchAndSet(dataLayerItem, _searchElement, foundNames, notFoundNames);
                }
              } catch (err) {
                _iterator11.e(err);
              } finally {
                _iterator11.f();
              }
            } else if (_searchElement.method === "DocSorg") {
              // SCAN SORG ARRAY
              if (!sorgArrayInner) {
                sorgArrayInner = getSORGArray();
              }

              _iterator12 = BeagleInfoLayer_createForOfIteratorHelper(sorgArrayInner);

              try {
                for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                  sorgItem = _step12.value;
                  searchAndSet(sorgItem, _searchElement, foundNames, notFoundNames);
                }
              } catch (err) {
                _iterator12.e(err);
              } finally {
                _iterator12.f();
              }
            } else if (_searchElement.method === "DocQuery") {
              // SCAN DOCUMENT
              searchAndSet(windoc, _searchElement, foundNames, notFoundNames);
            } // DOCQUERY parse


          case 36:
            _context6.next = 17;
            break;

          case 38:
            _context6.next = 43;
            break;

          case 40:
            _context6.prev = 40;
            _context6.t0 = _context6["catch"](15);

            _iterator10.e(_context6.t0);

          case 43:
            _context6.prev = 43;

            _iterator10.f();

            return _context6.finish(43);

          case 46:
            if (notFoundNames.size === 0) {
              parseSearchPathsRetry = PARSESEARCHMAXRETRY;
              BeagleInfoLayer_logger.log("parseSearchPaths found all elements - setting retry to max");
            } else if (foundNames.size === 0) {
              // update retry counter and delay only if dom is active
              if (domStatus === "complete" || domStatus === "interactive") {
                parseSearchPathsDelay *= 2;
                parseSearchPathsRetry += 1;
              }

              BeagleInfoLayer_logger.log("parseSearchPaths processed but not found any, setting delay and retry to " + parseSearchPathsDelay + " and " + parseSearchPathsRetry + " for notfound: [" + Array.from(notFoundNames).join(" | ") + "]");
            } else {
              BeagleInfoLayer_logger.log("parseSearchPaths processed: notfound: [" + Array.from(notFoundNames).join(" | ") + "] and found " + foundNames.size);
            }

          case 47:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[15, 40, 43, 46]]);
  }));

  return function parseSearchPaths() {
    return _ref6.apply(this, arguments);
  };
}();

var searchAndSet = function searchAndSet(obj, searchElement, foundNames, notFoundNames) {
  if (searchObj(obj, searchElement)) {
    foundNames.add(searchElement.name);
  } else {
    notFoundNames.add(searchElement.name);
  }
}; // parse source


var parserCaller = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8() {
    return regenerator_default().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return parseSearchPaths();

          case 2:
            if (!(parseSearchPathsRetry < PARSESEARCHMAXRETRY)) {
              _context8.next = 7;
              break;
            }

            BeagleInfoLayer_logger.log("parseSearchPaths: scheduled to be recalled in " + parseSearchPathsDelay + "ms");
            setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7() {
              return regenerator_default().wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return parserCaller();

                    case 2:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            })), parseSearchPathsDelay);
            _context8.next = 13;
            break;

          case 7:
            BeagleInfoLayer_logger.log("parseSearchPaths: reached max retry, calling remainder historical data");
            _context8.next = 10;
            return customDataDerivations();

          case 10:
            _context8.next = 12;
            return collectDerivationsFromCollector();

          case 12:
            addToBeagleInfoLayer("__CompletedScraping", true);

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function parserCaller() {
    return _ref7.apply(this, arguments);
  };
}(); // Extract value from json object using given path
// If an element is *, concatenate recursively all sub-path values as string


var jsonGet = function jsonGet(obj, path) {
  if (!obj) return null;
  if (!path) return null;

  try {
    var pathArray = path.split(".");
    var current = obj;

    for (var i = 0; i < pathArray.length; i++) {
      if (current === null) return null;

      if (pathArray[i] === "*") {
        var subPath = pathArray.slice(i + 1).join(".");
        var subArray = [];

        for (var subKey in current) {
          if (current[subKey] !== undefined && current[subKey] !== null) {
            var subValue = jsonGet(current[subKey], subPath);

            if (subValue !== null && subValue !== undefined) {
              subArray.push(subValue);
            }
          }
        }

        return subArray;
      }

      current = current[pathArray[i]];
    }

    return current;
  } catch (e) {
    return null;
  }
};

var prepareCoreData = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9() {
    var _windowPtr$navigator, _windowPtr$navigator$, _windowPtr$navigator2, _windowPtr$navigator3, _windowPtr$screen, _windowPtr$screen2, _windowPtr$screen3, _windowPtr$screen4, _windowPtr$visualView, _windowPtr$visualView2, _windowPtr$history, _windowPtr$navigator4, _windowPtr$navigator5;

    var windowPtr, navPtr, platform, availWindow, windowDepth, vportShape, width, height, iOS, _windowPtr$screen5, _windowPtr$screen5$or, orientationAngle, temp, _navPtr$userAgentData, _navPtr$userAgentData2, _navPtr$userAgentData3, navAgent, currentURL, firstSessionReferrer, pageType;

    return regenerator_default().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            windowPtr = window.top;
            navPtr = windowPtr.navigator;
            /* Beagle data */

            addToBeagleInfoLayer("v", VERSION);
            addToBeagleInfoLayer("sr", SPLIT_RATIO);
            platform = ((_windowPtr$navigator = windowPtr.navigator) === null || _windowPtr$navigator === void 0 ? void 0 : (_windowPtr$navigator$ = _windowPtr$navigator.userAgentData) === null || _windowPtr$navigator$ === void 0 ? void 0 : _windowPtr$navigator$.platform) || ((_windowPtr$navigator2 = windowPtr.navigator) === null || _windowPtr$navigator2 === void 0 ? void 0 : _windowPtr$navigator2.platform) || ((_windowPtr$navigator3 = windowPtr.navigator) === null || _windowPtr$navigator3 === void 0 ? void 0 : _windowPtr$navigator3.userAgent);
            addToBeagleInfoLayer("device.navPlatform", platform);
            /* window view area */

            addToBeagleInfoLayer("device.windowPRatio", windowPtr.devicePixelRatio);
            availWindow = ((_windowPtr$screen = windowPtr.screen) === null || _windowPtr$screen === void 0 ? void 0 : _windowPtr$screen.availWidth) + "x" + ((_windowPtr$screen2 = windowPtr.screen) === null || _windowPtr$screen2 === void 0 ? void 0 : _windowPtr$screen2.availHeight);
            addToBeagleInfoLayer("device.windowAvail", availWindow);
            windowDepth = ((_windowPtr$screen3 = windowPtr.screen) === null || _windowPtr$screen3 === void 0 ? void 0 : _windowPtr$screen3.colorDepth) + "-" + ((_windowPtr$screen4 = windowPtr.screen) === null || _windowPtr$screen4 === void 0 ? void 0 : _windowPtr$screen4.pixelDepth);
            addToBeagleInfoLayer("device.windowDepth", windowDepth);
            vportShape = ((_windowPtr$visualView = windowPtr.visualViewport) === null || _windowPtr$visualView === void 0 ? void 0 : _windowPtr$visualView.width) + "x" + ((_windowPtr$visualView2 = windowPtr.visualViewport) === null || _windowPtr$visualView2 === void 0 ? void 0 : _windowPtr$visualView2.height);
            addToBeagleInfoLayer("device.windowVport", vportShape);

            if (screen.width) {
              width = parseInt(screen.width);
              height = screen.height ? parseInt(screen.height) : 0;

              if (width !== 0 && height !== 0) {
                iOS = /iPad|iPhone|iPod/.test(platform);

                if (iOS && windowPtr.devicePixelRatio) {
                  // ios provides DPIs, need to multiply
                  width = Math.round(width * windowPtr.devicePixelRatio);
                  height = Math.round(height * windowPtr.devicePixelRatio);
                } else {
                  orientationAngle = (_windowPtr$screen5 = windowPtr.screen) === null || _windowPtr$screen5 === void 0 ? void 0 : (_windowPtr$screen5$or = _windowPtr$screen5.orientation) === null || _windowPtr$screen5$or === void 0 ? void 0 : _windowPtr$screen5$or.angle;

                  if (Math.abs(orientationAngle) === 90 || Math.abs(orientationAngle) === 270) {
                    // we have landscape orientation switch values for all except ios
                    temp = width;
                    width = height;
                    height = temp;
                  }
                }

                addToBeagleInfoLayer("device.window", width + "x" + height);
              }
            }
            /* navigator */


            addToBeagleInfoLayer("device.navHistSize", (_windowPtr$history = windowPtr.history) === null || _windowPtr$history === void 0 ? void 0 : _windowPtr$history.length); // check if userAgentData is supported and userAgent is not available, use it

            if (!navPtr.userAgent) {
              if (navPtr.userAgentData) {
                // turn brands array into string
                navAgent = navPtr === null || navPtr === void 0 ? void 0 : (_navPtr$userAgentData = navPtr.userAgentData) === null || _navPtr$userAgentData === void 0 ? void 0 : (_navPtr$userAgentData2 = _navPtr$userAgentData.brands) === null || _navPtr$userAgentData2 === void 0 ? void 0 : _navPtr$userAgentData2.map(function (e) {
                  return e.brand + ":" + e.version;
                }).join(); // add mobile info

                navAgent += navPtr !== null && navPtr !== void 0 && (_navPtr$userAgentData3 = navPtr.userAgentData) !== null && _navPtr$userAgentData3 !== void 0 && _navPtr$userAgentData3.mobile ? "mobi" : " "; // add platform info

                navAgent += platform;
                addToBeagleInfoLayer("device.navAgent", navAgent);
              }
            } else {
              addToBeagleInfoLayer("device.navAgent", navPtr.userAgent);
            }

            addToBeagleInfoLayer("device.navHWCores", navPtr.hardwareConcurrency);
            addToBeagleInfoLayer("device.navLanguage", navPtr.language || navPtr.browserLanguage || navPtr.systemLanguage || navPtr.userLanguage);
            addToBeagleInfoLayer("device.navTouch", navPtr.maxTouchPoints);
            addToBeagleInfoLayer("device.navVendor", navPtr.vendor);
            addToBeagleInfoLayer("device.internetSpeed", (_windowPtr$navigator4 = windowPtr.navigator) === null || _windowPtr$navigator4 === void 0 ? void 0 : (_windowPtr$navigator5 = _windowPtr$navigator4.connection) === null || _windowPtr$navigator5 === void 0 ? void 0 : _windowPtr$navigator5.downlink);
            /* miscellaneous */

            currentURL = new URL(window.top.location.href);
            addToBeagleInfoLayer("u", currentURL.href);
            addToBeagleInfoLayer("d", currentURL.hostname);
            addToBeagleInfoLayer("donttrack", navPtr.doNotTrack || windowPtr.doNotTrack || navPtr.msDoNotTrack);
            addToBeagleInfoLayer("r", windowPtr.document.referrer);
            firstSessionReferrer = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_REFERRER);

            if (!firstSessionReferrer) {
              sessionStorage.setItem(SESSION_STORAGE_KEYS.SESSION_REFERRER, windowPtr.document.referrer);
              addToBeagleInfoLayer("fr", windowPtr.document.referrer);
            } else {
              addToBeagleInfoLayer("fr", firstSessionReferrer);
            }
            /* Vivense specific */


            // if url like x then set PageType = y
            if (currentURL.pathname.indexOf("favorilerim.html") > -1) {
              pageType = "favorites";
            } else if (currentURL.pathname.indexOf("siparis-listesi.html") > -1) {
              pageType = "basket";
            } else if (currentURL.pathname.indexOf("siparis-ozeti.html") > -1) {
              pageType = "purchase";
            } else if (currentURL.pathname.indexOf("odeme.html") > -1) {
              pageType = "payment";
            } else if (currentURL.pathname.indexOf("adres-listesi.html") > -1) {
              pageType = "address";
            } else if (currentURL.pathname.indexOf("siparislerim.html") > -1) {
              pageType = "pastorders";
            } else if (currentURL.pathname.indexOf("uye-kayit.html") > -1) {
              pageType = "register";
            } else if (currentURL.pathname.indexOf("uye-girisi.html") > -1) {
              pageType = "signin";
            } else if (currentURL.pathname.indexOf("kuponlarim.html") > -1) {
              pageType = "profile_coupons";
            } else if (currentURL.pathname.indexOf("profil-guncelle.html") > -1) {
              pageType = "profile_info";
            } else if (currentURL.pathname.indexOf("adreslerim.html") > -1) {
              pageType = "profile_addresses";
            } else if (currentURL.pathname.indexOf("duyuru-tercihleri.html") > -1) {
              pageType = "profile_notifications";
            } else if (currentURL.pathname.indexOf("indirimli-mobilya-kampanyalari.html") > -1) {
              pageType = "special_campaigns";
            }

            if (pageType) {
              addToBeagleInfoLayer("PageType", pageType);
            }

          case 30:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function prepareCoreData() {
    return _ref9.apply(this, arguments);
  };
}();

var addMetrics = function addMetrics() {
  var windowPtr = window.top;
  var perfMetrics = {};
  var perfNavigationMetrics = windowPtr.performance.getEntriesByType("navigation")[0];

  if (windowPtr.performance && perfNavigationMetrics) {
    perfMetrics.connect = Math.round(perfNavigationMetrics.connectEnd - perfNavigationMetrics.connectStart);
    perfMetrics.request = Math.round(perfNavigationMetrics.responseEnd - perfNavigationMetrics.requestStart);
    perfMetrics.dom = Math.round(perfNavigationMetrics.domInteractive - perfNavigationMetrics.domComplete);
    perfMetrics.load = Math.round(perfNavigationMetrics.loadEventEnd - perfNavigationMetrics.loadEventStart);
    perfMetrics.duration = Math.round(perfNavigationMetrics.duration);
  }

  addToBeagleInfoLayer("metrics", perfMetrics);
}; // TODO: move this to an "element collector" module, then data is extracted from pre-collected elements


var getSORGArray = function getSORGArray() {
  var schemaOrgElts = window.top.document.querySelectorAll("[type=\"application/ld+json\"]");
  var sorgArray = [];

  var _iterator13 = BeagleInfoLayer_createForOfIteratorHelper(schemaOrgElts),
      _step13;

  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var sTag = _step13.value;

      try {
        var cntnt = sTag.textContent;
        var jsoncontent = JSON.parse(cntnt);
        sorgArray.push(jsoncontent);
      } catch (err) {// do nothing
      }
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }

  return sorgArray;
};
;// CONCATENATED MODULE: ./src/BeagleMonitor/index.js








var BeagleMonitor_logger = new src_logger("BeagleMonitor");
var HEADERS = {
  type: "text/plain"
};
var Monitor = /*#__PURE__*/function () {
  function Monitor() {
    _classCallCheck(this, Monitor);

    BeagleMonitor_logger.log("Initializing monitor");
    this.hasArrivalLogSent = false;
    this.hasMainLogSent = false;
    this.hasUpdatesSent = false;
    this.highWaterMark = null;
    this.initializeExitEventListeners();
  } // Attempts to send the initial log body (beagleInfoLayer's initial population) immediately


  _createClass(Monitor, [{
    key: "sendLogs",
    value: function () {
      var _sendLogs = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(immediate) {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!immediate) {
                  _context.next = 6;
                  break;
                }

                BeagleMonitor_logger.log("In immediate sending block");
                _context.next = 4;
                return this.packAndQueueMainLog();

              case 4:
                _context.next = 12;
                break;

              case 6:
                BeagleMonitor_logger.log("In non-critical send path - awaiting scraping");
                _context.next = 9;
                return getFromBeagleInfoLayer("__CompletedScraping", true, 50, 1000);

              case 9:
                BeagleMonitor_logger.log("In non-critical send path - sending logs");
                _context.next = 12;
                return this.packAndQueueMainLog();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sendLogs(_x) {
        return _sendLogs.apply(this, arguments);
      }

      return sendLogs;
    }() // Send initial log body and incremental update logs on close

  }, {
    key: "handleCloseEvent",
    value: function () {
      var _handleCloseEvent = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.packAndQueueMainLog();

              case 2:
                _context2.next = 4;
                return this.packAndQueueIncrementalLog();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleCloseEvent() {
        return _handleCloseEvent.apply(this, arguments);
      }

      return handleCloseEvent;
    }()
  }, {
    key: "packAndQueueMainLog",
    value: function () {
      var _packAndQueueMainLog = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var requestBlob;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.hasMainLogSent) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.next = 4;
                return this.packageMainLogData();

              case 4:
                requestBlob = _context3.sent;

                if (!requestBlob) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 8;
                return this.checkForLatestChanges();

              case 8:
                BeagleMonitor_logger.log("Request blob to send: ", requestBlob);
                this.hasMainLogSent = true;
                this.queueLogs(requestBlob);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function packAndQueueMainLog() {
        return _packAndQueueMainLog.apply(this, arguments);
      }

      return packAndQueueMainLog;
    }()
  }, {
    key: "packAndQueueIncrementalLog",
    value: function () {
      var _packAndQueueIncrementalLog = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var hasChanged, logData;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!this.hasMainLogSent || this.hasUpdatesSent)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.next = 4;
                return this.checkForLatestChanges();

              case 4:
                hasChanged = _context4.sent;
                BeagleMonitor_logger.log("Update logs change status: ", hasChanged);

                if (hasChanged) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return");

              case 8:
                _context4.next = 10;
                return this.packageIncrementalLogData();

              case 10:
                logData = _context4.sent;

                if (logData) {
                  BeagleMonitor_logger.log("Sending incremental logs", logData);
                  this.hasUpdatesSent = true;
                  this.queueLogs(logData);
                }

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function packAndQueueIncrementalLog() {
        return _packAndQueueIncrementalLog.apply(this, arguments);
      }

      return packAndQueueIncrementalLog;
    }()
  }, {
    key: "packAndQueueArrivalLog",
    value: function () {
      var _packAndQueueArrivalLog = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var requestBlob;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.hasMainLogSent || this.hasArrivalLogSent)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                _context5.next = 4;
                return this.packageArrivalLogData();

              case 4:
                requestBlob = _context5.sent;

                if (requestBlob) {
                  // prepare change detection hashes at the time of main log preparation
                  BeagleMonitor_logger.log("Arrival blob to send: ", requestBlob);
                  this.hasArrivalLogSent = true;
                  this.queueLogs(requestBlob);
                }

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function packAndQueueArrivalLog() {
        return _packAndQueueArrivalLog.apply(this, arguments);
      }

      return packAndQueueArrivalLog;
    }()
  }, {
    key: "checkForLatestChanges",
    value: function () {
      var _checkForLatestChanges = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        var hwm;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return getFromBeagleInfoLayer("__hwm");

              case 2:
                hwm = _context6.sent;

                if (!(this.highWaterMark !== hwm)) {
                  _context6.next = 6;
                  break;
                }

                this.highWaterMark = hwm;
                return _context6.abrupt("return", true);

              case 6:
                return _context6.abrupt("return", false);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkForLatestChanges() {
        return _checkForLatestChanges.apply(this, arguments);
      }

      return checkForLatestChanges;
    }()
  }, {
    key: "packageArrivalLogData",
    value: function () {
      var _packageArrivalLogData = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7() {
        var _yield$Promise$all, _yield$Promise$all2, url, hash, cookieGaId, view_epoch, body;

        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Promise.all([getFromBeagleInfoLayer("u"), getFromBeagleInfoLayer("onHashPct"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);

              case 2:
                _yield$Promise$all = _context7.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
                url = _yield$Promise$all2[0];
                hash = _yield$Promise$all2[1];
                cookieGaId = _yield$Promise$all2[2];
                view_epoch = _yield$Promise$all2[3];
                body = {
                  cookieGaId: cookieGaId,
                  lc: 0,
                  view_epoch: view_epoch,
                  u: url,
                  onHashPct: hash
                };
                BeagleMonitor_logger.log("Arrival log data: ", body);
                return _context7.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function packageArrivalLogData() {
        return _packageArrivalLogData.apply(this, arguments);
      }

      return packageArrivalLogData;
    }()
  }, {
    key: "packageMainLogData",
    value: function () {
      var _packageMainLogData = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8() {
        var body, _i, _Object$entries, _Object$entries$_i, key, value;

        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                body = {};

                if (window.beagleInfoLayer) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", null);

              case 3:
                for (_i = 0, _Object$entries = Object.entries(window.beagleInfoLayer); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                  if (!key.startsWith("_") && value !== null) body[key] = value;
                }

                body.lc = 1;
                return _context8.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function packageMainLogData() {
        return _packageMainLogData.apply(this, arguments);
      }

      return packageMainLogData;
    }()
  }, {
    key: "packageIncrementalLogData",
    value: function () {
      var _packageIncrementalLogData = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9() {
        var _yield$Promise$all3, _yield$Promise$all4, a, e, f, cookieGaId, view_epoch, body;

        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return Promise.all([getFromBeagleInfoLayer("a"), getFromBeagleInfoLayer("e"), getFromBeagleInfoLayer("f"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);

              case 2:
                _yield$Promise$all3 = _context9.sent;
                _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 5);
                a = _yield$Promise$all4[0];
                e = _yield$Promise$all4[1];
                f = _yield$Promise$all4[2];
                cookieGaId = _yield$Promise$all4[3];
                view_epoch = _yield$Promise$all4[4];
                body = {
                  cookieGaId: cookieGaId,
                  lc: 2,
                  view_epoch: view_epoch,
                  a: a,
                  e: e,
                  f: f
                };
                BeagleMonitor_logger.log("Update log data: ", body);
                return _context9.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function packageIncrementalLogData() {
        return _packageIncrementalLogData.apply(this, arguments);
      }

      return packageIncrementalLogData;
    }()
  }, {
    key: "initializeExitEventListeners",
    value: function initializeExitEventListeners() {
      var _this = this;

      BeagleMonitor_logger.log("Initializing exit event listener");
      window.addEventListener("beforeunload", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10() {
        return regenerator_default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                BeagleMonitor_logger.log("In beforeunload event");
                _context10.next = 3;
                return _this.handleCloseEvent();

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      })), {
        capture: true
      });
      window.addEventListener("pagehide", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee11() {
        return regenerator_default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                BeagleMonitor_logger.log("In pagehide event");
                _context11.next = 3;
                return _this.handleCloseEvent();

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      })), {
        capture: true
      });
    }
  }, {
    key: "queueLogs",
    value: function queueLogs(logData) {
      if (!navigator.sendBeacon || typeof navigator.sendBeacon !== "function") {
        fetch(LOG_API_URL, logData);
        return;
      }

      var queued = navigator.sendBeacon(LOG_API_URL, logData);
      var queueInterval = setInterval(function () {
        if (!queued) queued = navigator.sendBeacon(LOG_API_URL, logData);else {
          clearInterval(queueInterval);
          BeagleMonitor_logger.log("Logs queued successfully");
        }
      }, 10);
      setTimeout(function () {
        clearInterval(queueInterval);

        if (!queued) {
          BeagleMonitor_logger.log("Logs not queued");
        }
      }, 1000);
    }
  }]);

  return Monitor;
}();
/* harmony default export */ var BeagleMonitor = (Monitor);
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/dataLayerChecker.js





var dataLayerChecker_logger = new src_logger("BeagleInfoLayerChecker");
var checkDataLayerRule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(rule) {
    var operator, condition, value, runtimeValue;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataLayerChecker_logger.log("Checking rule", JSON.stringify(rule));
            operator = rule.operator, condition = rule.condition, value = rule.value;
            _context.next = 4;
            return dataLayerFinder(operator);

          case 4:
            runtimeValue = _context.sent;
            return _context.abrupt("return", conditionChecker(runtimeValue, condition, value));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkDataLayerRule(_x) {
    return _ref.apply(this, arguments);
  };
}();
var dataLayerFinder = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(key) {
    var res;
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dataLayerChecker_logger.log("Searching beagleInfoLayer for key ", key);
            _context2.next = 3;
            return getFromBeagleInfoLayer(key, true, 25, 1000);

          case 3:
            res = _context2.sent;

            if (!(res !== null && res !== undefined)) {
              _context2.next = 7;
              break;
            }

            dataLayerChecker_logger.success("Found key ".concat(key, " with value ").concat(res));
            return _context2.abrupt("return", res);

          case 7:
            dataLayerChecker_logger.failed("Key ".concat(key, " not found in beagleInfoLayer"));
            return _context2.abrupt("return", null);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function dataLayerFinder(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/elementChecker.js


var elementChecker_logger = new src_logger("BeagleElementChecker");
var checkElementRule = function checkElementRule(rule) {
  elementChecker_logger.log("Checking rule", JSON.stringify(rule));
  var operator = rule.operator,
      condition = rule.condition,
      value = rule.value,
      selector = rule.selector,
      selectorAll = rule.selectorAll,
      _rule$selectorFallbac = rule.selectorFallback,
      selectorFallback = _rule$selectorFallbac === void 0 ? null : _rule$selectorFallbac;
  var mainSelector = selector;

  if (mainSelector && !window.top.document.querySelector(mainSelector)) {
    mainSelector = selectorFallback ? selectorFallback : mainSelector;
  }

  if (operator === null) {
    return conditionChecker(window.top.document.querySelector(mainSelector), condition, value);
  }

  if (mainSelector && !window.top.document.querySelector(mainSelector)) {
    elementChecker_logger.failed("Selector not found on page");
    return false;
  }

  if (selectorAll && !window.top.document.querySelectorAll(selectorAll)) {
    elementChecker_logger.failed("Selector not found on page");
    return false;
  }

  var element;
  if (mainSelector) element = window.top.document.querySelector(mainSelector);else if (selectorAll) element = Array.from(window.top.document.querySelectorAll(selectorAll));

  switch (operator) {
    case "text-number":
      {
        var tempVal;

        if (Array.isArray(element)) {
          tempVal = element.reduce(function (returnVal, elem) {
            returnVal += parseInt(elem.textContent.replace("TL", "").replace(".", ""));
            return returnVal;
          }, 0);
        } else {
          tempVal = parseInt(window.top.document.querySelector(mainSelector).textContent.replace("TL", "").replace(".", ""));
        }

        var runTimeValue = parseInt(tempVal);
        return conditionChecker(runTimeValue, condition, value);
      }

    case "classList":
      return conditionChecker(Array.from(element.classList), condition, value);

    case "count":
      {
        if (Array.isArray(element) && element.length > 0) {
          return conditionChecker(element.length, condition, value);
        } else if (element) {
          return conditionChecker(1, condition, value);
        } else {
          return conditionChecker(0, condition, value);
        }
      }

    case "style":
      {
        var elementStyles = getComputedStyle(element);
        var styleKey = value.split(":")[0].trim();
        var styleValue = value.split(":")[1].trim();
        var _runTimeValue = elementStyles[styleKey];
        return conditionChecker(_runTimeValue, condition, styleValue);
      }

    default:
      elementChecker_logger.failed("Operator not defined");
      return false;
  }
};
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/functionChecker.js


var functionChecker_logger = new src_logger("BeagleFunctionChecker");
var checkFunctionRule = function checkFunctionRule(rule) {
  functionChecker_logger.log("Checking rule", JSON.stringify(rule));
  var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;

  if (!operator) {
    functionChecker_logger.failed("Rule function not defined");
    return false;
  }

  var ruleFunction = Function(operator);
  var runtimeValue = ruleFunction();
  return conditionChecker(runtimeValue, condition, value);
};
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/sessionChecker.js



var sessionChecker_logger = new src_logger("BeagleSessionChecker");
var checkSessionRule = function checkSessionRule(rule) {
  sessionChecker_logger.log("Checking rule", JSON.stringify(rule));
  var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;

  switch (operator) {
    case "duration":
      return durationHandler(condition, value);

    case "history":
      return historyHandler(condition, value);

    default:
      return null;
  }
};

var getSessionTimestamp = function getSessionTimestamp() {
  try {
    return new Date(parseInt(window.sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_TIMESTAMP)));
  } catch (err) {
    sessionChecker_logger.failed("Could not get session timestamp", err);
    return Date.now();
  }
};

var durationHandler = function durationHandler(condition, value) {
  var duration = (Date.now() - getSessionTimestamp()) / 1000;
  return conditionChecker(duration, condition, parseInt(value));
};

var historyHandler = function historyHandler(condition, value) {
  var _window$sessionStorag;

  var currentHistory = (_window$sessionStorag = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_HISTORY)) === null || _window$sessionStorag === void 0 ? void 0 : _window$sessionStorag.split(",");
  return conditionChecker(currentHistory, condition, value);
};
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/urlChecker.js


var urlChecker_logger = new src_logger("BeagleUrlChecker");
var checkUrlRule = function checkUrlRule(rule) {
  urlChecker_logger.log("Checking rule", JSON.stringify(rule));
  var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;

  switch (operator) {
    case "path":
      {
        var requestURL = window.top.location.href;
        var path = new URL(requestURL).pathname;
        urlChecker_logger.log("Checking path ".concat(path, " matches rule path ").concat(value));
        return conditionChecker(path, condition, value);
      }

    case "PLACEHOLDER":
      {
        return null;
      }

    default:
      return null;
  }
};
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/envChecker.js



var envChecker_logger = new src_logger("BeagleEnvChecker");
var checkEnvRule = function checkEnvRule(rule) {
  envChecker_logger.log("Checking rule", JSON.stringify(rule));
  var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;

  switch (operator) {
    case "device_type":
      {
        var isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches ? "mobile" : "desktop";
        return conditionChecker(isMobile, condition, value);
      }

    case "PLACEHOLDER":
      {
        return null;
      }

    default:
      return null;
  }
};
;// CONCATENATED MODULE: ./src/GlovProductInfoRepository/store.config.js
var store_config_config = {
  dbName: "beagle_cache",
  version: 1,
  store: {
    name: "infoCache",
    indexes: [{
      name: "ix_sku",
      fields: "sku"
    }],
    options: {
      keyPath: "sku"
    }
  }
};
/* harmony default export */ var GlovProductInfoRepository_store_config = (store_config_config);
;// CONCATENATED MODULE: ./src/GlovProductInfoRepository/index.js






function GlovProductInfoRepository_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = GlovProductInfoRepository_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function GlovProductInfoRepository_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return GlovProductInfoRepository_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GlovProductInfoRepository_arrayLikeToArray(o, minLen); }

function GlovProductInfoRepository_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var GlovProductInfoRepository_logger = new src_logger("GlovProductInfoRepository");

var GlovProductInfoRepository = /*#__PURE__*/function () {
  function GlovProductInfoRepository() {
    _classCallCheck(this, GlovProductInfoRepository);

    this.indexedDB = null;
    this.init();
  }

  _createClass(GlovProductInfoRepository, [{
    key: "init",
    value: function init() {
      var _window$top$indexedDB,
          _this = this;

      GlovProductInfoRepository_logger.log("Initializing indexedDB");
      var openRequest = (_window$top$indexedDB = window.top.indexedDB) === null || _window$top$indexedDB === void 0 ? void 0 : _window$top$indexedDB.open(GlovProductInfoRepository_store_config.dbName, GlovProductInfoRepository_store_config.version);

      if (!openRequest) {
        throw new Error("indexeddb is not supported");
      }

      openRequest.onupgradeneeded = function (event) {
        switch (event.oldVersion) {
          case 0:
            break;

          default:
            // TODO upgrade existing db instead of delete and create from scratch
            try {
              openRequest.result.deleteObjectStore(GlovProductInfoRepository_store_config.store.name);
            } catch (err) {
              GlovProductInfoRepository_logger.failed("Could not delete outdated database", err.message);
            }

            break;
        }

        try {
          var _config$store$indexes;

          var store = openRequest.result.createObjectStore(GlovProductInfoRepository_store_config.store.name, GlovProductInfoRepository_store_config.store.options);

          if (((_config$store$indexes = GlovProductInfoRepository_store_config.store.indexes) === null || _config$store$indexes === void 0 ? void 0 : _config$store$indexes.length) > 0) {
            var _iterator = GlovProductInfoRepository_createForOfIteratorHelper(GlovProductInfoRepository_store_config.store.indexes),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var idx = _step.value;
                store.createIndex(idx.name, idx.fields);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        } catch (err) {
          GlovProductInfoRepository_logger.failed("Could not create object store on database", err.message);
        }
      };

      openRequest.onerror = function () {
        throw new Error("Error initializing indexed DB", openRequest.error);
      };

      openRequest.onsuccess = function () {
        _this.indexedDB = openRequest.result;
      };
    }
  }, {
    key: "getConnection",
    value: function getConnection() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var interval = setInterval(function () {
          if (_this2.indexedDB) {
            clearInterval(interval);
            resolve();
          }
        }, 25);
        setTimeout(function () {
          if (!_this2.indexedDB) {
            clearInterval(interval);
            reject(new Error("IndexedDB not initialized within the allotted time"));
          }
        }, 5000);
      });
    }
  }, {
    key: "initTransaction",
    value: function () {
      var _initTransaction = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var readwrite,
            tx,
            _args = arguments;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                readwrite = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                _context.next = 3;
                return this.getConnection();

              case 3:
                tx = this.indexedDB.transaction(GlovProductInfoRepository_store_config.store.name, readwrite ? "readwrite" : "readonly");
                return _context.abrupt("return", tx.objectStore(GlovProductInfoRepository_store_config.store.name));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initTransaction() {
        return _initTransaction.apply(this, arguments);
      }

      return initTransaction;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(payload) {
        var store, timestamp, _iterator2, _step2, load;

        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.initTransaction(true);

              case 2:
                store = _context2.sent;
                timestamp = Math.round(Date.now() / 1000);

                if (Array.isArray(payload)) {
                  _iterator2 = GlovProductInfoRepository_createForOfIteratorHelper(payload);

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      load = _step2.value;
                      load.timestamp = timestamp;
                      store.put(load);
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                } else {
                  payload.timestamp = timestamp;
                  store.put(payload);
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save(_x) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "clear",
    value: function () {
      var _clear = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var _this3 = this;

        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve) {
                  _this3.initTransaction(true).then(function (store) {
                    var clearRequest = store.clear();

                    clearRequest.onsuccess = function () {
                      resolve();
                    };

                    clearRequest.onerror = function () {
                      GlovProductInfoRepository_logger.failed("Error clearing store: ".concat(store.name));
                      resolve(null);
                    };
                  });
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function clear() {
        return _clear.apply(this, arguments);
      }

      return clear;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(sku) {
        var _this4 = this;

        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve) {
                  _this4.initTransaction().then(function (store) {
                    var getRequest = store.get(sku);

                    getRequest.onsuccess = function () {
                      var result = getRequest.result;
                      GlovProductInfoRepository_logger.log("Found value ".concat(result, " for key ").concat(sku));
                      resolve(result);
                    };

                    getRequest.onerror = function () {
                      GlovProductInfoRepository_logger.failed("Error getting value for key: ".concat(sku), getRequest.onerror);
                      resolve(null);
                    };
                  });
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "count",
    value: function () {
      var _count = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var _this5 = this;

        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve) {
                  _this5.initTransaction().then(function (store) {
                    var countRequest = store.count();

                    countRequest.onsuccess = function () {
                      var result = countRequest.result;
                      GlovProductInfoRepository_logger.log("Counted ".concat(result, " entries"));
                      resolve(result);
                    };

                    countRequest.onerror = function () {
                      GlovProductInfoRepository_logger.failed("Error counting entries: ", countRequest.onerror);
                      resolve(null);
                    };
                  });
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function count() {
        return _count.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: "getCursor",
    value: function () {
      var _getCursor = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        var _this6 = this;

        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise(function (resolve) {
                  _this6.initTransaction().then(function (store) {
                    var cursorRequest = store.openCursor();

                    cursorRequest.onsuccess = function (event) {
                      resolve(event.target.result);
                    };

                    cursorRequest.onerror = function () {
                      GlovProductInfoRepository_logger.failed("Error getting cursor", cursorRequest.onerror);
                      resolve(null);
                    };
                  });
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getCursor() {
        return _getCursor.apply(this, arguments);
      }

      return getCursor;
    }()
  }, {
    key: "persistProductInfo",
    value: function () {
      var _persistProductInfo = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7() {
        var existingProdInfo, cursor, timestamp, elapsedSeconds, productInfoPromise, clearPromise, _yield$Promise$all, _yield$Promise$all2, productInfoArray;

        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.count();

              case 2:
                existingProdInfo = _context7.sent;

                if (!existingProdInfo) {
                  _context7.next = 13;
                  break;
                }

                GlovProductInfoRepository_logger.log("Existing product info found");
                _context7.next = 7;
                return this.getCursor();

              case 7:
                cursor = _context7.sent;
                timestamp = cursor.value.timestamp;
                elapsedSeconds = Date.now() / 1000 - timestamp;

                if (!(elapsedSeconds < 7200)) {
                  _context7.next = 12;
                  break;
                }

                return _context7.abrupt("return");

              case 12:
                GlovProductInfoRepository_logger.log("Existing product info is expired");

              case 13:
                productInfoPromise = fetchProductInfo();
                clearPromise = this.clear();
                _context7.next = 17;
                return Promise.all([productInfoPromise, clearPromise]);

              case 17:
                _yield$Promise$all = _context7.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 1);
                productInfoArray = _yield$Promise$all2[0];

                if (!(!productInfoArray || !productInfoArray.length)) {
                  _context7.next = 22;
                  break;
                }

                return _context7.abrupt("return");

              case 22:
                _context7.next = 24;
                return this.save(this.preparePayloads(productInfoArray));

              case 24:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function persistProductInfo() {
        return _persistProductInfo.apply(this, arguments);
      }

      return persistProductInfo;
    }()
  }, {
    key: "preparePayloads",
    value: function preparePayloads(productInfoArray) {
      var payloads = [];
      var fieldNames = productInfoArray.shift();
      fieldNames.shift();

      var _iterator3 = GlovProductInfoRepository_createForOfIteratorHelper(productInfoArray),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var info = _step3.value;
          var payload = {
            sku: info.shift()
          };

          for (var i = 0; i < fieldNames.length; i++) {
            payload[fieldNames[i]] = info[i] || 0;
          }

          payloads.push(payload);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return payloads;
    }
  }]);

  return GlovProductInfoRepository;
}();

/* harmony default export */ var src_GlovProductInfoRepository = (GlovProductInfoRepository);
;// CONCATENATED MODULE: ./src/GlovProductInfoRepository/store.js


var Store = function () {
  var instance = null;
  return {
    getInstance: function getInstance() {
      if (instance === null) {
        instance = new src_GlovProductInfoRepository(); // Hide the constructor so the returned object can't be new'd...

        instance.constructor = null;
      }

      return instance;
    }
  };
}();

/* harmony default export */ var store = (Store);
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/productInfoChecker.js







var productInfoChecker_logger = new src_logger("BeagleProductInfoChecker");
var checkProductInfoRule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(rule) {
    var _skuList$Object$keys$;

    var operator, condition, value, skuList, runtimeValue, sku;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            productInfoChecker_logger.log("Checking rule", JSON.stringify(rule));
            operator = rule.operator, condition = rule.condition, value = rule.value;
            _context.next = 4;
            return getFromBeagleInfoLayer("__features.SKUsonPage", true);

          case 4:
            skuList = _context.sent;

            if (!(!skuList || _typeof(skuList) === "object" && !Object.keys(skuList).length)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", false);

          case 7:
            runtimeValue = null;
            sku = (_skuList$Object$keys$ = skuList[Object.keys(skuList)[0]]) === null || _skuList$Object$keys$ === void 0 ? void 0 : _skuList$Object$keys$.id;
            _context.t0 = operator;
            _context.next = _context.t0 === "transactionIn2Weeks" ? 12 : _context.t0 === "addToCartIn2Weeks" ? 17 : _context.t0 === "productViewCount" ? 22 : 27;
            break;

          case 12:
            productInfoChecker_logger.log("Getting TransactionCount for sku ", sku);
            _context.next = 15;
            return getTransactionCount(sku);

          case 15:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 27);

          case 17:
            productInfoChecker_logger.log("Getting AddToCartCount for sku ", sku);
            _context.next = 20;
            return getAddToCartCount(sku);

          case 20:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 27);

          case 22:
            productInfoChecker_logger.log("Getting productViewCount for sku ", sku);
            _context.next = 25;
            return getPreviewCount(sku);

          case 25:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 27);

          case 27:
            return _context.abrupt("return", conditionChecker(runtimeValue, condition, value));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkProductInfoRule(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getTransactionCount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(sku) {
    var productInfo;
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return store.getInstance().get(sku);

          case 2:
            productInfo = _context2.sent;

            if (!(sku && productInfo)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", productInfo.saleCntVisitorsIn15);

          case 5:
            return _context2.abrupt("return", -1);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTransactionCount(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getAddToCartCount = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(sku) {
    var productInfo;
    return regenerator_default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return store.getInstance().get(sku);

          case 2:
            productInfo = _context3.sent;

            if (!(sku && productInfo)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", productInfo.cartCntVisitorsIn15);

          case 5:
            return _context3.abrupt("return", -1);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAddToCartCount(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getPreviewCount = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(sku) {
    var productInfo;
    return regenerator_default().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return store.getInstance().get(sku);

          case 2:
            productInfo = _context4.sent;

            if (!(sku && productInfo)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", productInfo.viewCntVisitorsIn1);

          case 5:
            return _context4.abrupt("return", -1);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getPreviewCount(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./node_modules/async-mutex/index.mjs
const E_TIMEOUT = new Error('timeout while waiting for mutex to become available');
const E_ALREADY_LOCKED = new Error('mutex already locked');
const E_CANCELED = new Error('request for lock canceled');

var __awaiter$2 = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Semaphore {
    constructor(_value, _cancelError = E_CANCELED) {
        this._value = _value;
        this._cancelError = _cancelError;
        this._weightedQueues = [];
        this._weightedWaiters = [];
    }
    acquire(weight = 1) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        return new Promise((resolve, reject) => {
            if (!this._weightedQueues[weight - 1])
                this._weightedQueues[weight - 1] = [];
            this._weightedQueues[weight - 1].push({ resolve, reject });
            this._dispatch();
        });
    }
    runExclusive(callback, weight = 1) {
        return __awaiter$2(this, void 0, void 0, function* () {
            const [value, release] = yield this.acquire(weight);
            try {
                return yield callback(value);
            }
            finally {
                release();
            }
        });
    }
    waitForUnlock(weight = 1) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        return new Promise((resolve) => {
            if (!this._weightedWaiters[weight - 1])
                this._weightedWaiters[weight - 1] = [];
            this._weightedWaiters[weight - 1].push(resolve);
            this._dispatch();
        });
    }
    isLocked() {
        return this._value <= 0;
    }
    getValue() {
        return this._value;
    }
    setValue(value) {
        this._value = value;
        this._dispatch();
    }
    release(weight = 1) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        this._value += weight;
        this._dispatch();
    }
    cancel() {
        this._weightedQueues.forEach((queue) => queue.forEach((entry) => entry.reject(this._cancelError)));
        this._weightedQueues = [];
    }
    _dispatch() {
        var _a;
        for (let weight = this._value; weight > 0; weight--) {
            const queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
            if (!queueEntry)
                continue;
            const previousValue = this._value;
            const previousWeight = weight;
            this._value -= weight;
            weight = this._value + 1;
            queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
        }
        this._drainUnlockWaiters();
    }
    _newReleaser(weight) {
        let called = false;
        return () => {
            if (called)
                return;
            called = true;
            this.release(weight);
        };
    }
    _drainUnlockWaiters() {
        for (let weight = this._value; weight > 0; weight--) {
            if (!this._weightedWaiters[weight - 1])
                continue;
            this._weightedWaiters[weight - 1].forEach((waiter) => waiter());
            this._weightedWaiters[weight - 1] = [];
        }
    }
}

var __awaiter$1 = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Mutex {
    constructor(cancelError) {
        this._semaphore = new Semaphore(1, cancelError);
    }
    acquire() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const [, releaser] = yield this._semaphore.acquire();
            return releaser;
        });
    }
    runExclusive(callback) {
        return this._semaphore.runExclusive(() => callback());
    }
    isLocked() {
        return this._semaphore.isLocked();
    }
    waitForUnlock() {
        return this._semaphore.waitForUnlock();
    }
    release() {
        if (this._semaphore.isLocked())
            this._semaphore.release();
    }
    cancel() {
        return this._semaphore.cancel();
    }
}

var __awaiter = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function withTimeout(sync, timeout, timeoutError = E_TIMEOUT) {
    return {
        acquire: (weight) => {
            if (weight !== undefined && weight <= 0) {
                throw new Error(`invalid weight ${weight}: must be positive`);
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let isTimeout = false;
                const handle = setTimeout(() => {
                    isTimeout = true;
                    reject(timeoutError);
                }, timeout);
                try {
                    const ticket = yield sync.acquire(weight);
                    if (isTimeout) {
                        const release = Array.isArray(ticket) ? ticket[1] : ticket;
                        release();
                    }
                    else {
                        clearTimeout(handle);
                        resolve(ticket);
                    }
                }
                catch (e) {
                    if (!isTimeout) {
                        clearTimeout(handle);
                        reject(e);
                    }
                }
            }));
        },
        runExclusive(callback, weight) {
            return __awaiter(this, void 0, void 0, function* () {
                let release = () => undefined;
                try {
                    const ticket = yield this.acquire(weight);
                    if (Array.isArray(ticket)) {
                        release = ticket[1];
                        return yield callback(ticket[0]);
                    }
                    else {
                        release = ticket;
                        return yield callback();
                    }
                }
                finally {
                    release();
                }
            });
        },
        release(weight) {
            sync.release(weight);
        },
        cancel() {
            return sync.cancel();
        },
        waitForUnlock: (weight) => {
            if (weight !== undefined && weight <= 0) {
                throw new Error(`invalid weight ${weight}: must be positive`);
            }
            return new Promise((resolve, reject) => {
                sync.waitForUnlock(weight).then(resolve);
                setTimeout(() => reject(timeoutError), timeout);
            });
        },
        isLocked: () => sync.isLocked(),
        getValue: () => sync.getValue(),
        setValue: (value) => sync.setValue(value),
    };
}

// eslint-disable-next-lisne @typescript-eslint/explicit-module-boundary-types
function tryAcquire(sync, alreadyAcquiredError = E_ALREADY_LOCKED) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return withTimeout(sync, 0, alreadyAcquiredError);
}



;// CONCATENATED MODULE: ./src/BeagleRuleEngine/index.js







function BeagleRuleEngine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleRuleEngine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleRuleEngine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleRuleEngine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleRuleEngine_arrayLikeToArray(o, minLen); }

function BeagleRuleEngine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }













var BeagleRuleEngine_logger = new src_logger("BeagleRuleEngine");

var RuleEngine = /*#__PURE__*/function () {
  function RuleEngine(body) {
    _classCallCheck(this, RuleEngine);

    var eligibilityRules = body.eligibilityRules,
        baseRuleSet = body.baseRuleSet;
    this.baseRuleSet = baseRuleSet;
    this.eligibilityRules = eligibilityRules;
    this.addedDataListeners = [];
    this.mutex = new Mutex();
  }

  _createClass(RuleEngine, [{
    key: "checkRules",
    value: function () {
      var _checkRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _iterator, _step, rule, ruleSatisfied;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = BeagleRuleEngine_createForOfIteratorHelper(this.baseRuleSet);
                _context.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 12;
                  break;
                }

                rule = _step.value;
                _context.next = 7;
                return this.checkRule(rule);

              case 7:
                ruleSatisfied = _context.sent;

                if (ruleSatisfied) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", false);

              case 10:
                _context.next = 3;
                break;

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);

                _iterator.e(_context.t0);

              case 17:
                _context.prev = 17;

                _iterator.f();

                return _context.finish(17);

              case 20:
                return _context.abrupt("return", true);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 14, 17, 20]]);
      }));

      function checkRules() {
        return _checkRules.apply(this, arguments);
      }

      return checkRules;
    }()
  }, {
    key: "checkRule",
    value: function () {
      var _checkRule = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(rule) {
        var chain, chain_condition, type, ruleSatisfied;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                chain = rule.chain, chain_condition = rule.chain_condition, type = rule.type;
                ruleSatisfied = null; // check rule

                _context2.t0 = type;
                _context2.next = _context2.t0 === "session" ? 5 : _context2.t0 === "element" ? 7 : _context2.t0 === "dataLayer" ? 9 : _context2.t0 === "url" ? 13 : _context2.t0 === "function" ? 15 : _context2.t0 === "environment" ? 17 : _context2.t0 === "productInfoLookup" ? 19 : 23;
                break;

              case 5:
                ruleSatisfied = checkSessionRule(rule);
                return _context2.abrupt("break", 25);

              case 7:
                ruleSatisfied = checkElementRule(rule);
                return _context2.abrupt("break", 25);

              case 9:
                _context2.next = 11;
                return checkDataLayerRule(rule);

              case 11:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 25);

              case 13:
                ruleSatisfied = checkUrlRule(rule);
                return _context2.abrupt("break", 25);

              case 15:
                ruleSatisfied = checkFunctionRule(rule);
                return _context2.abrupt("break", 25);

              case 17:
                ruleSatisfied = checkEnvRule(rule);
                return _context2.abrupt("break", 25);

              case 19:
                _context2.next = 21;
                return checkProductInfoRule(rule);

              case 21:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 25);

              case 23:
                BeagleRuleEngine_logger.failed("No such rule type: ".concat(type));
                return _context2.abrupt("return", null);

              case 25:
                if (!chain) {
                  _context2.next = 51;
                  break;
                }

                _context2.t1 = chain_condition;
                _context2.next = _context2.t1 === "and" ? 29 : _context2.t1 === "or" ? 36 : _context2.t1 === "xor" ? 43 : 49;
                break;

              case 29:
                _context2.t2 = ruleSatisfied;

                if (!_context2.t2) {
                  _context2.next = 34;
                  break;
                }

                _context2.next = 33;
                return this.checkRule(chain);

              case 33:
                _context2.t2 = _context2.sent;

              case 34:
                ruleSatisfied = _context2.t2;
                return _context2.abrupt("break", 51);

              case 36:
                _context2.t3 = ruleSatisfied;

                if (_context2.t3) {
                  _context2.next = 41;
                  break;
                }

                _context2.next = 40;
                return this.checkRule(chain);

              case 40:
                _context2.t3 = _context2.sent;

              case 41:
                ruleSatisfied = _context2.t3;
                return _context2.abrupt("break", 51);

              case 43:
                _context2.t4 = ruleSatisfied;
                _context2.next = 46;
                return this.checkRule(chain);

              case 46:
                _context2.t5 = _context2.sent;
                ruleSatisfied = _context2.t4 != _context2.t5;
                return _context2.abrupt("break", 51);

              case 49:
                BeagleRuleEngine_logger.failed("No such chain condition");
                return _context2.abrupt("break", 51);

              case 51:
                return _context2.abrupt("return", ruleSatisfied);

              case 52:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkRule(_x) {
        return _checkRule.apply(this, arguments);
      }

      return checkRule;
    }()
  }, {
    key: "assesEligibilityRules",
    value: function () {
      var _assesEligibilityRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var _i, _Object$entries, _Object$entries$_i, key, rules, satisfiedRuleIds, _iterator2, _step2, rule;

        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _i = 0, _Object$entries = Object.entries(this.eligibilityRules);

              case 1:
                if (!(_i < _Object$entries.length)) {
                  _context3.next = 30;
                  break;
                }

                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], rules = _Object$entries$_i[1];
                satisfiedRuleIds = [];
                this.setUpListeners(key, rules);
                _iterator2 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                _context3.prev = 6;

                _iterator2.s();

              case 8:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 18;
                  break;
                }

                rule = _step2.value;
                _context3.next = 12;
                return this.checkRule(rule);

              case 12:
                if (!_context3.sent) {
                  _context3.next = 16;
                  break;
                }

                satisfiedRuleIds.push(rule.name); // Page type rules are exclusive; if one is true all others are false by default, no need to assess the rest

                if (!(key === "PageType")) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("break", 18);

              case 16:
                _context3.next = 8;
                break;

              case 18:
                _context3.next = 23;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](6);

                _iterator2.e(_context3.t0);

              case 23:
                _context3.prev = 23;

                _iterator2.f();

                return _context3.finish(23);

              case 26:
                addToBeagleInfoLayer("__eRules.".concat(key), satisfiedRuleIds);

              case 27:
                _i++;
                _context3.next = 1;
                break;

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 20, 23, 26]]);
      }));

      function assesEligibilityRules() {
        return _assesEligibilityRules.apply(this, arguments);
      }

      return assesEligibilityRules;
    }()
  }, {
    key: "assesEligibilityRulesCallBack",
    value: function () {
      var _assesEligibilityRulesCallBack = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(key, rules) {
        var _this = this;

        var release, _iterator3, _step3, _loop, _ret;

        return regenerator_default().wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!key || !rules || !rules.length)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                _context5.next = 4;
                return this.mutex.acquire();

              case 4:
                release = _context5.sent;
                BeagleRuleEngine_logger.log("Lock acquired for key ".concat(key));
                _context5.prev = 6;
                _iterator3 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                _context5.prev = 8;
                _loop = /*#__PURE__*/regenerator_default().mark(function _loop() {
                  var rule, isEligible, current, filtered;
                  return regenerator_default().wrap(function _loop$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          rule = _step3.value;
                          _context4.next = 3;
                          return _this.checkRule(rule);

                        case 3:
                          isEligible = _context4.sent;
                          _context4.next = 6;
                          return getFromBeagleInfoLayer("__eRules.".concat(key));

                        case 6:
                          _context4.t0 = _context4.sent;

                          if (_context4.t0) {
                            _context4.next = 9;
                            break;
                          }

                          _context4.t0 = [];

                        case 9:
                          current = _context4.t0;

                          if (!isEligible) {
                            _context4.next = 19;
                            break;
                          }

                          if (!current.includes(rule.name)) {
                            _context4.next = 13;
                            break;
                          }

                          return _context4.abrupt("return", "continue");

                        case 13:
                          current.push(rule.name);
                          addToBeagleInfoLayer("__eRules.".concat(key), current);

                          if (!(key === "PageType")) {
                            _context4.next = 17;
                            break;
                          }

                          return _context4.abrupt("return", "break");

                        case 17:
                          _context4.next = 21;
                          break;

                        case 19:
                          // remove from eligible rules
                          filtered = current.filter(function (k) {
                            return k !== rule.name;
                          });
                          addToBeagleInfoLayer("__eRules.".concat(key), filtered);

                        case 21:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _loop);
                });

                _iterator3.s();

              case 11:
                if ((_step3 = _iterator3.n()).done) {
                  _context5.next = 20;
                  break;
                }

                return _context5.delegateYield(_loop(), "t0", 13);

              case 13:
                _ret = _context5.t0;

                if (!(_ret === "continue")) {
                  _context5.next = 16;
                  break;
                }

                return _context5.abrupt("continue", 18);

              case 16:
                if (!(_ret === "break")) {
                  _context5.next = 18;
                  break;
                }

                return _context5.abrupt("break", 20);

              case 18:
                _context5.next = 11;
                break;

              case 20:
                _context5.next = 25;
                break;

              case 22:
                _context5.prev = 22;
                _context5.t1 = _context5["catch"](8);

                _iterator3.e(_context5.t1);

              case 25:
                _context5.prev = 25;

                _iterator3.f();

                return _context5.finish(25);

              case 28:
                _context5.next = 33;
                break;

              case 30:
                _context5.prev = 30;
                _context5.t2 = _context5["catch"](6);
                BeagleRuleEngine_logger.failed("Error assessing rules for key: ".concat(key, " - ").concat(_context5.t2.message));

              case 33:
                _context5.prev = 33;
                BeagleRuleEngine_logger.log("Releasing lock for key: ".concat(key));
                release();
                return _context5.finish(33);

              case 37:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[6, 30, 33, 37], [8, 22, 25, 28]]);
      }));

      function assesEligibilityRulesCallBack(_x2, _x3) {
        return _assesEligibilityRulesCallBack.apply(this, arguments);
      }

      return assesEligibilityRulesCallBack;
    }()
  }, {
    key: "setUpListeners",
    value: function () {
      var _setUpListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(key, rules) {
        var _this2 = this;

        var dataLayerRules, elementRules, _iterator4, _step4, rule, _operator, selector, type, _i2, _Object$entries2, _Object$entries2$_i, operator, _rules, boundAssesEligibilityRulesCallBack, _loop2, _i3, _Object$entries3;

        return regenerator_default().wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // TODO recursively get all operators/selectors from chained rules
                dataLayerRules = {};
                elementRules = {};
                _iterator4 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                _context6.prev = 3;

                _iterator4.s();

              case 5:
                if ((_step4 = _iterator4.n()).done) {
                  _context6.next = 19;
                  break;
                }

                rule = _step4.value;
                _operator = rule.operator, selector = rule.selector, type = rule.type;
                _context6.t0 = type;
                _context6.next = _context6.t0 === "dataLayer" ? 11 : _context6.t0 === "element" ? 14 : 17;
                break;

              case 11:
                if (!dataLayerRules[_operator]) dataLayerRules[_operator] = [];

                dataLayerRules[_operator].push(rule);

                return _context6.abrupt("break", 17);

              case 14:
                if (!elementRules[selector]) elementRules[selector] = [];
                elementRules[selector].push(rule);
                return _context6.abrupt("break", 17);

              case 17:
                _context6.next = 5;
                break;

              case 19:
                _context6.next = 24;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t1 = _context6["catch"](3);

                _iterator4.e(_context6.t1);

              case 24:
                _context6.prev = 24;

                _iterator4.f();

                return _context6.finish(24);

              case 27:
                for (_i2 = 0, _Object$entries2 = Object.entries(dataLayerRules); _i2 < _Object$entries2.length; _i2++) {
                  _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), operator = _Object$entries2$_i[0], _rules = _Object$entries2$_i[1];
                  boundAssesEligibilityRulesCallBack = this.assesEligibilityRulesCallBack.bind(this, key, _rules);
                  addDataListener(operator, boundAssesEligibilityRulesCallBack);
                }

                _loop2 = function _loop2() {
                  var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                      selector = _Object$entries3$_i[0],
                      rules = _Object$entries3$_i[1];

                  var observer = new MutationObserver(function (mutationList) {
                    var nodes = [];

                    var _iterator5 = BeagleRuleEngine_createForOfIteratorHelper(mutationList),
                        _step5;

                    try {
                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        var mutationRecord = _step5.value;
                        nodes = [].concat(_toConsumableArray(nodes), _toConsumableArray(Array.from(mutationRecord.addedNodes)), _toConsumableArray(Array.from(mutationRecord.removedNodes)));
                      } // exclude mutations that only update text

                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }

                    if (nodes.every(function (n) {
                      return n.tagName === undefined;
                    })) return;

                    _this2.assesEligibilityRulesCallBack(key, rules);
                  });
                  var elementToObserve = document.querySelector(selector);
                  elementToObserve = elementToObserve ? elementToObserve.parentNode : document.body;
                  observer.observe(elementToObserve, {
                    subtree: true,
                    childList: true
                  });
                };

                for (_i3 = 0, _Object$entries3 = Object.entries(elementRules); _i3 < _Object$entries3.length; _i3++) {
                  _loop2();
                }

              case 30:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this, [[3, 21, 24, 27]]);
      }));

      function setUpListeners(_x4, _x5) {
        return _setUpListeners.apply(this, arguments);
      }

      return setUpListeners;
    }()
  }], [{
    key: "getEligibilityRules",
    value: function () {
      var _getEligibilityRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        var eligibilityRules;
        return regenerator_default().wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                eligibilityRules = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.ELIGIBILITY_RULES);

                if (!eligibilityRules) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt("return", JSON.parse(eligibilityRules));

              case 4:
                _context7.next = 6;
                return fetchEligibilityRules();

              case 6:
                eligibilityRules = _context7.sent;
                window.sessionStorage.setItem(SESSION_STORAGE_KEYS.ELIGIBILITY_RULES, JSON.stringify(eligibilityRules));
                return _context7.abrupt("return", eligibilityRules);

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](0);
                BeagleRuleEngine_logger.failed("Could not get eligibility rules: ", _context7.t0.message);
                return _context7.abrupt("return", null);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, null, [[0, 11]]);
      }));

      function getEligibilityRules() {
        return _getEligibilityRules.apply(this, arguments);
      }

      return getEligibilityRules;
    }()
  }]);

  return RuleEngine;
}();


;// CONCATENATED MODULE: ./src/BeagleInfoLayer/segment-computer.js





var segment_computer_logger = new src_logger("SegmentationComputer");
function computeSegment(_x) {
  return _computeSegment.apply(this, arguments);
}

function _computeSegment() {
  _computeSegment = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(treatmentWeights) {
    var _i, _Object$keys, _treatmentWeights$seg, segment, ruleSet, segmentRuleEngine;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            segment_computer_logger.log("Determining user segment");
            _i = 0, _Object$keys = Object.keys(treatmentWeights);

          case 2:
            if (!(_i < _Object$keys.length)) {
              _context.next = 17;
              break;
            }

            segment = _Object$keys[_i];
            ruleSet = (_treatmentWeights$seg = treatmentWeights[segment]) === null || _treatmentWeights$seg === void 0 ? void 0 : _treatmentWeights$seg.ruleSet;

            if (ruleSet) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("continue", 14);

          case 7:
            segmentRuleEngine = new RuleEngine({
              baseRuleSet: ruleSet,
              businessRuleSet: []
            });
            _context.next = 10;
            return segmentRuleEngine.checkRules();

          case 10:
            if (!_context.sent) {
              _context.next = 14;
              break;
            }

            segment_computer_logger.log("User segment matched: ".concat(segment));
            addToBeagleInfoLayer("s", segment);
            return _context.abrupt("return", segment);

          case 14:
            _i++;
            _context.next = 2;
            break;

          case 17:
            segment_computer_logger.log("User segment not matched, returning default");
            addToBeagleInfoLayer("s", "default");
            return _context.abrupt("return", "default");

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _computeSegment.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/BeagleTreatmentRepository/index.js





function BeagleTreatmentRepository_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleTreatmentRepository_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleTreatmentRepository_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleTreatmentRepository_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleTreatmentRepository_arrayLikeToArray(o, minLen); }

function BeagleTreatmentRepository_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var BeagleTreatmentRepository_logger = new src_logger("BeagleTreatmentRepository");

var TreatmentRepository = /*#__PURE__*/function () {
  function TreatmentRepository(body) {
    _classCallCheck(this, TreatmentRepository);

    var treatments = body.treatments,
        treatmentWeights = body.treatmentWeights;
    this.treatments = treatments;
    this.treatmentWeights = treatmentWeights;
  }

  _createClass(TreatmentRepository, [{
    key: "getMatchedTreatments",
    value: function () {
      var _getMatchedTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var treatmentWeights, userGroup, treatments, userGroupWeights, _iterator, _step, _userGroupWeights$tre, treatment, _iterator2, _step2, action, _i, _Object$keys, _userGroupWeights$tre2, _userGroupWeights$tre3, variantKey;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                treatmentWeights = this.treatmentWeights;
                _context.next = 3;
                return computeSegment(treatmentWeights);

              case 3:
                userGroup = _context.sent;
                treatments = this.treatments;

                if (!treatmentWeights) {
                  _context.next = 43;
                  break;
                }

                userGroupWeights = userGroup && treatmentWeights[userGroup] ? treatmentWeights[userGroup] : treatmentWeights["default"];
                _iterator = BeagleTreatmentRepository_createForOfIteratorHelper(treatments);
                _context.prev = 8;

                _iterator.s();

              case 10:
                if ((_step = _iterator.n()).done) {
                  _context.next = 35;
                  break;
                }

                treatment = _step.value;
                treatment.weight = ((_userGroupWeights$tre = userGroupWeights[treatment === null || treatment === void 0 ? void 0 : treatment.id]) === null || _userGroupWeights$tre === void 0 ? void 0 : _userGroupWeights$tre.weight) || 0;

                if (treatment.actions.some(function (a) {
                  return a.variants;
                })) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("continue", 33);

              case 15:
                _iterator2 = BeagleTreatmentRepository_createForOfIteratorHelper(treatment.actions);
                _context.prev = 16;

                _iterator2.s();

              case 18:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 25;
                  break;
                }

                action = _step2.value;

                if (action.variants) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("continue", 23);

              case 22:
                for (_i = 0, _Object$keys = Object.keys(action.variants); _i < _Object$keys.length; _i++) {
                  variantKey = _Object$keys[_i];

                  if ((_userGroupWeights$tre2 = userGroupWeights[treatment.id]) !== null && _userGroupWeights$tre2 !== void 0 && _userGroupWeights$tre2.variants && (_userGroupWeights$tre3 = userGroupWeights[treatment.id]) !== null && _userGroupWeights$tre3 !== void 0 && _userGroupWeights$tre3.variants[variantKey]) {
                    action.variants[variantKey].weight = userGroupWeights[treatment.id].variants[variantKey];
                  }
                }

              case 23:
                _context.next = 18;
                break;

              case 25:
                _context.next = 30;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](16);

                _iterator2.e(_context.t0);

              case 30:
                _context.prev = 30;

                _iterator2.f();

                return _context.finish(30);

              case 33:
                _context.next = 10;
                break;

              case 35:
                _context.next = 40;
                break;

              case 37:
                _context.prev = 37;
                _context.t1 = _context["catch"](8);

                _iterator.e(_context.t1);

              case 40:
                _context.prev = 40;

                _iterator.f();

                return _context.finish(40);

              case 43:
                BeagleTreatmentRepository_logger.log("".concat(treatments.length, " treatments user group matched"));

                if (treatments.length) {
                  _context.next = 46;
                  break;
                }

                return _context.abrupt("return", []);

              case 46:
                return _context.abrupt("return", treatments);

              case 47:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 37, 40, 43], [16, 27, 30, 33]]);
      }));

      function getMatchedTreatments() {
        return _getMatchedTreatments.apply(this, arguments);
      }

      return getMatchedTreatments;
    }()
  }], [{
    key: "getTreatments",
    value: function () {
      var _getTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var TREATMENTS, treatmentsObj, treatments, timestamp, treatmentWithTimestamp, elapsedDays, _treatmentWithTimestamp;

        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                BeagleTreatmentRepository_logger.log("Loading treatments");
                TREATMENTS = SESSION_STORAGE_KEYS.TREATMENTS;
                treatmentsObj = JSON.parse(window.sessionStorage.getItem(TREATMENTS));
                treatments = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.treatments;
                timestamp = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.timestamp;

                if (!(!treatments || !timestamp)) {
                  _context2.next = 13;
                  break;
                }

                BeagleTreatmentRepository_logger.failed("Treatments not found in local storage");
                _context2.next = 9;
                return fetchTreatments();

              case 9:
                treatments = _context2.sent;
                treatmentWithTimestamp = {
                  timestamp: Date.now(),
                  treatments: treatments
                };
                window.sessionStorage.setItem(TREATMENTS, JSON.stringify(treatmentWithTimestamp));
                return _context2.abrupt("return", treatments);

              case 13:
                if (!timestamp) {
                  _context2.next = 23;
                  break;
                }

                elapsedDays = (Date.now() - timestamp) / (1000 * 3600 * 24);

                if (!(elapsedDays > TREATMENTS_DURATION)) {
                  _context2.next = 23;
                  break;
                }

                BeagleTreatmentRepository_logger.failed("Treatments are expired");
                _context2.next = 19;
                return fetchTreatments();

              case 19:
                treatments = _context2.sent;
                _treatmentWithTimestamp = {
                  timestamp: Date.now(),
                  treatments: treatments
                };
                window.sessionStorage.setItem(TREATMENTS, JSON.stringify(_treatmentWithTimestamp));
                return _context2.abrupt("return", treatments);

              case 23:
                BeagleTreatmentRepository_logger.success("Treatments are loaded from local storage");
                return _context2.abrupt("return", treatments);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getTreatments() {
        return _getTreatments.apply(this, arguments);
      }

      return getTreatments;
    }()
  }, {
    key: "getTreatmentWeights",
    value: function () {
      var _getTreatmentWeights = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var weights;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                weights = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.WEIGHTS);

                if (!weights) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", JSON.parse(weights));

              case 4:
                _context3.next = 6;
                return fetchTreatmentWeights();

              case 6:
                weights = _context3.sent;
                window.sessionStorage.setItem(SESSION_STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
                return _context3.abrupt("return", weights);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                BeagleTreatmentRepository_logger.warn(_context3.t0.message);
                return _context3.abrupt("return", null);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function getTreatmentWeights() {
        return _getTreatmentWeights.apply(this, arguments);
      }

      return getTreatmentWeights;
    }()
  }]);

  return TreatmentRepository;
}();

/* harmony default export */ var BeagleTreatmentRepository = (TreatmentRepository);
;// CONCATENATED MODULE: ./src/BeagleApplyActions/replace-utils.js





function replace_utils_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = replace_utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function replace_utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return replace_utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return replace_utils_arrayLikeToArray(o, minLen); }

function replace_utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var replace_utils_logger = new src_logger("ReplaceUtils");

var replacer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(value, replaceFn) {
    var _iterator, _step, _step$value, i, val, currentReplaceFn, replaceVal, _iterator2, _step2, rFn, _replaceVal, _replaceVal2;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!Array.isArray(value)) {
              _context.next = 27;
              break;
            }

            _iterator = replace_utils_createForOfIteratorHelper(value.entries());
            _context.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context.next = 17;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2), i = _step$value[0], val = _step$value[1];
            currentReplaceFn = Array.isArray(replaceFn) ? replaceFn[i] : replaceFn || "";

            if (!(_typeof(currentReplaceFn) === "object")) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return replaceObjectExtractor(currentReplaceFn);

          case 10:
            replaceVal = _context.sent;
            value[i] = replaceAll(val, "{{REPLACE}}", replaceVal);
            _context.next = 15;
            break;

          case 14:
            value[i] = replaceFnExecutor(currentReplaceFn, val);

          case 15:
            _context.next = 4;
            break;

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](2);

            _iterator.e(_context.t0);

          case 22:
            _context.prev = 22;

            _iterator.f();

            return _context.finish(22);

          case 25:
            _context.next = 61;
            break;

          case 27:
            if (!Array.isArray(replaceFn)) {
              _context.next = 53;
              break;
            }

            _iterator2 = replace_utils_createForOfIteratorHelper(replaceFn);
            _context.prev = 29;

            _iterator2.s();

          case 31:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 43;
              break;
            }

            rFn = _step2.value;

            if (!(_typeof(rFn) === "object")) {
              _context.next = 40;
              break;
            }

            _context.next = 36;
            return replaceObjectExtractor(rFn);

          case 36:
            _replaceVal = _context.sent;
            value = value.replace("{{REPLACE}}", _replaceVal);
            _context.next = 41;
            break;

          case 40:
            value = replaceFnExecutor(rFn, value, true);

          case 41:
            _context.next = 31;
            break;

          case 43:
            _context.next = 48;
            break;

          case 45:
            _context.prev = 45;
            _context.t1 = _context["catch"](29);

            _iterator2.e(_context.t1);

          case 48:
            _context.prev = 48;

            _iterator2.f();

            return _context.finish(48);

          case 51:
            _context.next = 61;
            break;

          case 53:
            if (!(_typeof(replaceFn) === "object")) {
              _context.next = 60;
              break;
            }

            _context.next = 56;
            return replaceObjectExtractor(replaceFn);

          case 56:
            _replaceVal2 = _context.sent;
            value = replaceAll(value, "{{REPLACE}}", _replaceVal2);
            _context.next = 61;
            break;

          case 60:
            value = replaceFnExecutor(replaceFn, value);

          case 61:
            return _context.abrupt("return", value);

          case 62:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 19, 22, 25], [29, 45, 48, 51]]);
  }));

  return function replacer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function replaceFnExecutor(replaceFn, value) {
  var single = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (replaceFn && value.includes("{{REPLACE}}")) {
    replace_utils_logger.log("Executing replace function: ", replaceFn);
    var replaceFunction = Function(replaceFn);
    if (single) return value.replace("{{REPLACE}}", replaceFunction());
    return replaceAll(value, "{{REPLACE}}", replaceFunction());
  }

  return value;
}

function replaceObjectExtractor(_x3) {
  return _replaceObjectExtractor.apply(this, arguments);
}

function _replaceObjectExtractor() {
  _replaceObjectExtractor = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(replaceFn) {
    var storage, key, keyFallback, type, replaceVal, _replaceVal3;

    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            storage = replaceFn.storage, key = replaceFn.key, keyFallback = replaceFn.keyFallback, type = replaceFn.type;
            _context2.t0 = storage;
            _context2.next = _context2.t0 === "session" ? 4 : _context2.t0 === "info-layer" ? 18 : 26;
            break;

          case 4:
            replaceVal = null;
            replaceVal = window.sessionStorage.getItem(key);
            if (!replaceVal) replaceVal = window.sessionStorage.getItem(keyFallback);

            if (!type) {
              _context2.next = 17;
              break;
            }

            _context2.prev = 8;
            replaceVal = JSON.parse(replaceVal);
            replaceVal = replaceVal[replaceVal.length - 1][type];
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t1 = _context2["catch"](8);
            replace_utils_logger.failed("Could not parse ".concat(replaceVal));
            return _context2.abrupt("return", null);

          case 17:
            return _context2.abrupt("return", replaceVal);

          case 18:
            _context2.next = 20;
            return getFromBeagleInfoLayer(key);

          case 20:
            _replaceVal3 = _context2.sent;

            if (_replaceVal3) {
              _context2.next = 25;
              break;
            }

            _context2.next = 24;
            return getFromBeagleInfoLayer(keyFallback);

          case 24:
            _replaceVal3 = _context2.sent;

          case 25:
            return _context2.abrupt("return", _replaceVal3);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[8, 13]]);
  }));
  return _replaceObjectExtractor.apply(this, arguments);
}

/* harmony default export */ var replace_utils = (replacer);
;// CONCATENATED MODULE: ./src/BeagleApplyActions/action-condition-util.js





var action_condition_util_logger = new src_logger("ActionConditionUtils");

var checkActionCondition = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(condition) {
    var attribute, inner_condition, operator, selector, type, value, eligibleElements, conditionElements, _i, _conditionElements, element, elementSku, productInfo, runTimeValue;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            attribute = condition.attribute, inner_condition = condition.inner_condition, operator = condition.operator, selector = condition.selector, type = condition.type, value = condition.value;
            action_condition_util_logger.log("Action condition found: ", condition);
            eligibleElements = [];
            _context.t0 = type;
            _context.next = _context.t0 === "productInfoLookup" ? 6 : 24;
            break;

          case 6:
            conditionElements = Array.from(window.top.document.querySelectorAll(selector));
            _i = 0, _conditionElements = conditionElements;

          case 8:
            if (!(_i < _conditionElements.length)) {
              _context.next = 24;
              break;
            }

            element = _conditionElements[_i];
            elementSku = element.getAttribute(attribute);
            _context.next = 13;
            return store.getInstance().get(elementSku);

          case 13:
            productInfo = _context.sent;
            runTimeValue = productInfo === null || productInfo === void 0 ? void 0 : productInfo[operator]; // runTimeValue may be 0

            if (!(runTimeValue === null || runTimeValue === undefined)) {
              _context.next = 18;
              break;
            }

            action_condition_util_logger.failed("Product info is empty");
            return _context.abrupt("continue", 21);

          case 18:
            if (conditionChecker(runTimeValue, inner_condition, value)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("continue", 21);

          case 20:
            eligibleElements.push($(element));

          case 21:
            _i++;
            _context.next = 8;
            break;

          case 24:
            return _context.abrupt("return", eligibleElements);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkActionCondition(_x) {
    return _ref.apply(this, arguments);
  };
}();

/* harmony default export */ var action_condition_util = (checkActionCondition);
;// CONCATENATED MODULE: ./src/BeagleApplyActions/index.js




function BeagleApplyActions_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleApplyActions_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleApplyActions_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleApplyActions_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleApplyActions_arrayLikeToArray(o, minLen); }

function BeagleApplyActions_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }










function applyActions(_x) {
  return _applyActions.apply(this, arguments);
}

function _applyActions() {
  _applyActions = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(actions) {
    var logger, POPUP_DISPLAY_FLAG, transformer, replaceWithVal, getProductInfo, handleDocumentTitleTabChange, handlePopupClick, handleModalClick, displayPopup, displayModal, createPopup, swapNodes, waitForJQuery, actionApplicator, result;
    return regenerator_default().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            logger = new src_logger("BeagleApplyActions");
            POPUP_DISPLAY_FLAG = SESSION_STORAGE_KEYS.POPUP_DISPLAY_FLAG;

            transformer = /*#__PURE__*/function () {
              var _transformer = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(action) {
                var element,
                    operator,
                    type,
                    applyEvent,
                    contentSelector,
                    selector,
                    selectorFallback,
                    mdCondition,
                    move_selector_1,
                    move_selector_2,
                    replaceFn,
                    pType,
                    attribute,
                    productInfoStorage,
                    value,
                    mc,
                    elm,
                    mobile,
                    _iterator,
                    _step,
                    event,
                    _yield$Promise$all,
                    _yield$Promise$all2,
                    r,
                    d,
                    styleChangesMap,
                    _iterator2,
                    _step2,
                    _event,
                    property,
                    propertyValue,
                    n1,
                    n2,
                    source,
                    destination,
                    res,
                    _i,
                    _Array$from,
                    _e$innerText,
                    e,
                    _args = arguments;

                return regenerator_default().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        element = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                        logger.log("Applying action: ", JSON.stringify(action));
                        operator = action.operator, type = action.type, applyEvent = action.applyEvent, contentSelector = action.contentSelector, selector = action.selector, selectorFallback = action.selectorFallback, mdCondition = action.mdCondition, move_selector_1 = action.move_selector_1, move_selector_2 = action.move_selector_2, replaceFn = action.replaceFn, pType = action.pType, attribute = action.attribute, productInfoStorage = action.productInfoStorage;

                        if (!(operator === "noop")) {
                          _context.next = 6;
                          break;
                        }

                        logger.failed("Noop Operator: No operation is applied on target ");
                        return _context.abrupt("return", true);

                      case 6:
                        value = action.value; // If an element is passed to transformer, selector is relative to passed element

                        element = element ? element.find(selector) : $(selector);
                        mc = mdCondition ? window.matchMedia(mdCondition).matches : true;

                        if (mc) {
                          _context.next = 12;
                          break;
                        }

                        logger.failed("Media condition mismatch: ", mdCondition);
                        return _context.abrupt("return", false);

                      case 12:
                        if (!(move_selector_1 && !move_selector_2 || move_selector_2 && !move_selector_1)) {
                          _context.next = 15;
                          break;
                        }

                        logger.failed("Both move selectors are required");
                        return _context.abrupt("return", false);

                      case 15:
                        if (!(move_selector_1 && move_selector_2)) {
                          _context.next = 24;
                          break;
                        }

                        if ($(move_selector_1).length) {
                          _context.next = 19;
                          break;
                        }

                        logger.failed("Move selector 1 not found: ", move_selector_1);
                        return _context.abrupt("return", false);

                      case 19:
                        if ($(move_selector_2).length) {
                          _context.next = 22;
                          break;
                        }

                        logger.failed("Move selector 2 not found: ", move_selector_2);
                        return _context.abrupt("return", false);

                      case 22:
                        _context.next = 39;
                        break;

                      case 24:
                        if (selector) {
                          _context.next = 29;
                          break;
                        }

                        logger.failed("Selector not specified");
                        return _context.abrupt("return", false);

                      case 29:
                        if (element.length) {
                          _context.next = 39;
                          break;
                        }

                        if (!(!$(selectorFallback).length && operator === "remove")) {
                          _context.next = 32;
                          break;
                        }

                        return _context.abrupt("return", true);

                      case 32:
                        if (!(selector !== "no-selector")) {
                          _context.next = 39;
                          break;
                        }

                        logger.failed("Selector not found: ", selector);
                        logger.log("Trying fallback selector: ", selectorFallback);
                        if (selectorFallback) element = $(selectorFallback);

                        if (element.length) {
                          _context.next = 39;
                          break;
                        }

                        logger.failed("Fallback selector not found");
                        return _context.abrupt("return", false);

                      case 39:
                        if (!replaceFn) {
                          _context.next = 43;
                          break;
                        }

                        _context.next = 42;
                        return replace_utils(value, replaceFn);

                      case 42:
                        value = _context.sent;

                      case 43:
                        if (!(operator === "remove")) {
                          _context.next = 47;
                          break;
                        }

                        if (element.length) {
                          logger.log("Removing: ", selector);
                          element.remove();
                        } else logger.log("Cannot found element with selector: ", selector);

                        _context.next = 218;
                        break;

                      case 47:
                        if (!(operator === "insert")) {
                          _context.next = 121;
                          break;
                        }

                        _context.t0 = type;
                        _context.next = _context.t0 === "before" ? 51 : _context.t0 === "after" ? 55 : _context.t0 === "append" ? 58 : _context.t0 === "modal" ? 61 : _context.t0 === "popup" ? 66 : 117;
                        break;

                      case 51:
                        logger.log("Inserting before: ", value);

                        if (String(value).includes("nd-add-to-win")) {
                          $(".nd-add-to-win").remove();
                        }

                        element.before(value);
                        return _context.abrupt("break", 119);

                      case 55:
                        logger.log("Inserting after: ", value);
                        element.after(value);
                        return _context.abrupt("break", 119);

                      case 58:
                        logger.log("Appending value: ", value);
                        element.append(value);
                        return _context.abrupt("break", 119);

                      case 61:
                        element.off("click");
                        createPopup(value, contentSelector, true);
                        elm = document.querySelector(selector);
                        elm.addEventListener("click", function (e) {
                          if (elm == e.target) {
                            e.stopPropagation();
                          }

                          displayModal(value, contentSelector);
                        }, true);
                        return _context.abrupt("break", 119);

                      case 66:
                        if (!(parseInt(sessionStorage.getItem(POPUP_DISPLAY_FLAG)) !== 0)) {
                          _context.next = 69;
                          break;
                        }

                        logger.log("Popup already displayed in session");
                        return _context.abrupt("break", 119);

                      case 69:
                        logger.log("Creating Popup: ", value);

                        if (!pType) {
                          _context.next = 74;
                          break;
                        }

                        _context.next = 73;
                        return getProductInfo(pType, value, productInfoStorage);

                      case 73:
                        value = _context.sent;

                      case 74:
                        createPopup(value, contentSelector);

                        if (!applyEvent) {
                          _context.next = 115;
                          break;
                        }

                        mobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
                        _iterator = BeagleApplyActions_createForOfIteratorHelper(applyEvent);
                        _context.prev = 78;

                        _iterator.s();

                      case 80:
                        if ((_step = _iterator.n()).done) {
                          _context.next = 105;
                          break;
                        }

                        event = _step.value;
                        _context.t1 = event;
                        _context.next = _context.t1 === "exitIntent" ? 85 : _context.t1 === "copyIntent" ? 100 : 103;
                        break;

                      case 85:
                        logger.log("Adding exit intent listener");

                        if (!mobile) {
                          _context.next = 98;
                          break;
                        }

                        window.top.addEventListener("visibilitychange", displayPopup);
                        _context.next = 90;
                        return Promise.all([getFromBeagleInfoLayer("r", true), getFromBeagleInfoLayer("d", true)]);

                      case 90:
                        _yield$Promise$all = _context.sent;
                        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                        r = _yield$Promise$all2[0];
                        d = _yield$Promise$all2[1];

                        if (typeof r === "string" && typeof d === "string" && !r.includes(d)) {
                          if (window.history && typeof window.history.pushState === "function") {
                            if (window.top.document.readyState !== "complete") {
                              window.top.addEventListener("load", function () {
                                if (window.history.state !== "bg_limbo") window.history.pushState("bg_limbo", "");
                                window.top.addEventListener("popstate", displayPopup, {
                                  once: true
                                });
                              });
                            } else {
                              if (window.history.state !== "bg_limbo") window.history.pushState("bg_limbo", "");
                              window.top.addEventListener("popstate", displayPopup, {
                                once: true
                              });
                            }
                          }
                        }

                        idleTimer(IDLE_TIMEOUT, displayPopup);
                        _context.next = 99;
                        break;

                      case 98:
                        window.top.document.documentElement.addEventListener("mouseleave", displayPopup, {
                          once: true
                        });

                      case 99:
                        return _context.abrupt("break", 103);

                      case 100:
                        logger.log("Adding copy intent listener");
                        window.top.document.documentElement.addEventListener("copy", displayPopup, {
                          once: true
                        });
                        return _context.abrupt("break", 103);

                      case 103:
                        _context.next = 80;
                        break;

                      case 105:
                        _context.next = 110;
                        break;

                      case 107:
                        _context.prev = 107;
                        _context.t2 = _context["catch"](78);

                        _iterator.e(_context.t2);

                      case 110:
                        _context.prev = 110;

                        _iterator.f();

                        return _context.finish(110);

                      case 113:
                        _context.next = 116;
                        break;

                      case 115:
                        // append popup to body after timeout expires
                        setTimeout(function () {
                          displayPopup();
                        }, timeout);

                      case 116:
                        return _context.abrupt("break", 119);

                      case 117:
                        logger.failed("Type: ".concat(type, " not found for operator: ").concat(operator));
                        return _context.abrupt("break", 119);

                      case 119:
                        _context.next = 218;
                        break;

                      case 121:
                        if (!(operator === "edit")) {
                          _context.next = 149;
                          break;
                        }

                        _context.t3 = type;
                        _context.next = _context.t3 === "text" ? 125 : _context.t3 === "html" ? 128 : _context.t3 === "styleApplicator" ? 131 : _context.t3 === "addClass" ? 136 : _context.t3 === "removeClass" ? 139 : _context.t3 === "documentTitle" ? 142 : 145;
                        break;

                      case 125:
                        logger.log("Editing text: ", value);
                        element.text(value);
                        return _context.abrupt("break", 147);

                      case 128:
                        logger.log("Editing html: ", value);
                        element.html(value);
                        return _context.abrupt("break", 147);

                      case 131:
                        logger.log("Applying style: ", value);
                        styleChangesMap = JSON.parse(value);
                        logger.log("Style Changes Map: ", styleChangesMap);
                        styleApplicator(element, styleChangesMap);
                        return _context.abrupt("break", 147);

                      case 136:
                        logger.log("addding class to ".concat(element, " named ").concat(value));
                        element.addClass(value);
                        return _context.abrupt("break", 147);

                      case 139:
                        logger.log("remove class from ".concat(element, " named ").concat(value));
                        element.removeClass(value);
                        return _context.abrupt("break", 147);

                      case 142:
                        logger.log("changing document title from ".concat(element, " to ").concat(value));

                        if (applyEvent) {
                          _iterator2 = BeagleApplyActions_createForOfIteratorHelper(applyEvent);

                          try {
                            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                              _event = _step2.value;

                              if (_event == "tabChange") {
                                (function () {
                                  logger.log("catching event tabchange..");
                                  var originalTitle = window.top.document.title;
                                  window.top.document.addEventListener("visibilitychange", function (e) {
                                    setTimeout(function () {
                                      handleDocumentTitleTabChange(e, value, originalTitle);
                                    }, 15000);
                                  });
                                })();
                              }
                            }
                          } catch (err) {
                            _iterator2.e(err);
                          } finally {
                            _iterator2.f();
                          }
                        }

                        return _context.abrupt("break", 147);

                      case 145:
                        logger.log("Unknown edit type: ", type);
                        return _context.abrupt("break", 147);

                      case 147:
                        _context.next = 218;
                        break;

                      case 149:
                        if (!(operator === "setattribute")) {
                          _context.next = 166;
                          break;
                        }

                        logger.log("Setting attribute: ", attribute, value);
                        _context.t4 = attribute;
                        _context.next = _context.t4 === "src" ? 154 : _context.t4 === "style" ? 156 : 160;
                        break;

                      case 154:
                        element.css("content", "url(".concat(value.trim(), ")"));
                        return _context.abrupt("break", 164);

                      case 156:
                        // eslint-disable-next-line no-case-declarations
                        property = value.split(":")[0].trim(); // eslint-disable-next-line no-case-declarations

                        propertyValue = value.split(":")[1].trim();
                        element.css(property, propertyValue, "!important");
                        return _context.abrupt("break", 164);

                      case 160:
                        if (value.includes("function")) {
                          value = Function(value);
                        }

                        element.attr(attribute, value);
                        logger.log("Unhandled attribute: Setting attribute: ", attribute, value);
                        return _context.abrupt("break", 164);

                      case 164:
                        _context.next = 218;
                        break;

                      case 166:
                        if (!(operator === "replace")) {
                          _context.next = 171;
                          break;
                        }

                        logger.log("Replacing: ", value);
                        element.replaceAll(value);
                        _context.next = 218;
                        break;

                      case 171:
                        if (!(operator === "swap")) {
                          _context.next = 178;
                          break;
                        }

                        logger.log("Swapping: ", move_selector_1, move_selector_2);
                        n1 = window.top.document.querySelector(move_selector_1);
                        n2 = window.top.document.querySelector(move_selector_2);
                        swapNodes(n1, n2);
                        _context.next = 218;
                        break;

                      case 178:
                        if (!(operator === "injectscript")) {
                          _context.next = 183;
                          break;
                        }

                        logger.log("Injecting script: ", value);
                        element.append("<script>".concat(value, "</script>"));
                        _context.next = 218;
                        break;

                      case 183:
                        if (!(operator === "move")) {
                          _context.next = 191;
                          break;
                        }

                        logger.log("Moving ".concat(move_selector_1, " to ").concat(move_selector_2));
                        source = window.top.document.querySelector(move_selector_1);
                        destination = window.top.document.querySelector(move_selector_2);
                        source.remove();
                        destination.prepend(source);
                        _context.next = 218;
                        break;

                      case 191:
                        if (!(operator === "productInfoLookup")) {
                          _context.next = 198;
                          break;
                        }

                        _context.next = 194;
                        return getProductInfo(pType, value, productInfoStorage);

                      case 194:
                        res = _context.sent;
                        element.before(res);
                        _context.next = 218;
                        break;

                      case 198:
                        if (!(operator === "text-transform")) {
                          _context.next = 217;
                          break;
                        }

                        _context.t5 = type;
                        _context.next = _context.t5 === "capitalize" ? 202 : _context.t5 === "PLACEHOLDER" ? 213 : 214;
                        break;

                      case 202:
                        _i = 0, _Array$from = Array.from(element);

                      case 203:
                        if (!(_i < _Array$from.length)) {
                          _context.next = 212;
                          break;
                        }

                        e = _Array$from[_i];

                        if (!((_e$innerText = e.innerText) !== null && _e$innerText !== void 0 && _e$innerText.includes("\n"))) {
                          _context.next = 208;
                          break;
                        }

                        e.innerText = turkishToLower(e.innerText).split("\n").map(function (sentence) {
                          return sentence.split(" ").map(function (word) {
                            return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                          }).join(" ");
                        }).join("\n");
                        return _context.abrupt("continue", 209);

                      case 208:
                        e.innerText = turkishToLower(e.innerText).split(" ").map(function (word) {
                          return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                        }).join(" ");

                      case 209:
                        _i++;
                        _context.next = 203;
                        break;

                      case 212:
                        return _context.abrupt("break", 215);

                      case 213:
                        return _context.abrupt("break", 215);

                      case 214:
                        return _context.abrupt("break", 215);

                      case 215:
                        _context.next = 218;
                        break;

                      case 217:
                        logger.failed("No such operator exists yet", operator);

                      case 218:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[78, 107, 110, 113]]);
              }));

              function transformer(_x2) {
                return _transformer.apply(this, arguments);
              }

              return transformer;
            }();

            replaceWithVal = function replaceWithVal(value, htmlStr) {
              if (value && htmlStr.includes("{{REPLACE_PRODUCTINFO}}")) {
                htmlStr = replaceAll(htmlStr, "{{REPLACE_PRODUCTINFO}}", value);
              }

              return htmlStr;
            };

            getProductInfo = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(type, value, productInfoStorage) {
                var skuList, res, productInfo;
                return regenerator_default().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(productInfoStorage === "basket")) {
                          _context2.next = 6;
                          break;
                        }

                        _context2.next = 3;
                        return getFromBeagleInfoLayer("__features.SKUsonLastCartView", true);

                      case 3:
                        _context2.t0 = _context2.sent;
                        _context2.next = 9;
                        break;

                      case 6:
                        _context2.next = 8;
                        return getFromBeagleInfoLayer("__features.SKUsonPage", true);

                      case 8:
                        _context2.t0 = _context2.sent;

                      case 9:
                        skuList = _context2.t0;
                        res = null;

                        if (!(!skuList || skuList.length === 0)) {
                          _context2.next = 14;
                          break;
                        }

                        logger.log("No sku found");
                        return _context2.abrupt("return", null);

                      case 14:
                        _context2.next = 16;
                        return store.getInstance().get(skuList[0]);

                      case 16:
                        productInfo = _context2.sent;
                        _context2.t1 = type;
                        _context2.next = _context2.t1 === "transactionIn2Weeks" ? 20 : _context2.t1 === "addToCartIn2Weeks" ? 23 : _context2.t1 === "productViewCount" ? 26 : 29;
                        break;

                      case 20:
                        res = replaceWithVal(productInfo.saleCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing transcationIn2Weeks ", productInfo.saleCntVisitorsIn15);
                        return _context2.abrupt("break", 30);

                      case 23:
                        res = replaceWithVal(productInfo.cartCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing AddToCartCount ", productInfo.cartCntVisitorsIn15);
                        return _context2.abrupt("break", 30);

                      case 26:
                        res = replaceWithVal(productInfo.viewCntVisitorsIn1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing productViewCount for", productInfo.viewCntVisitorsIn1);
                        return _context2.abrupt("break", 30);

                      case 29:
                        logger.failed("no such type found for productInfoLookup operator: " + type);

                      case 30:
                        return _context2.abrupt("return", res);

                      case 31:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function getProductInfo(_x3, _x4, _x5) {
                return _ref.apply(this, arguments);
              };
            }();

            handleDocumentTitleTabChange = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(event, titles, originalTitle) {
                var parsedTitles, _iterator3, _step3, parsedTitle;

                return regenerator_default().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        parsedTitles = !Array.isArray(titles) ? [titles] : titles;
                        _iterator3 = BeagleApplyActions_createForOfIteratorHelper(parsedTitles);
                        _context3.prev = 2;

                        _iterator3.s();

                      case 4:
                        if ((_step3 = _iterator3.n()).done) {
                          _context3.next = 18;
                          break;
                        }

                        parsedTitle = _step3.value;

                        if (!window.top.document.hidden) {
                          _context3.next = 15;
                          break;
                        }

                        window.top.document.title = parsedTitle;
                        _context3.next = 10;
                        return delay(2000);

                      case 10:
                        window.top.document.title = originalTitle;
                        _context3.next = 13;
                        return delay(2000);

                      case 13:
                        _context3.next = 16;
                        break;

                      case 15:
                        window.top.document.title = originalTitle;

                      case 16:
                        _context3.next = 4;
                        break;

                      case 18:
                        _context3.next = 23;
                        break;

                      case 20:
                        _context3.prev = 20;
                        _context3.t0 = _context3["catch"](2);

                        _iterator3.e(_context3.t0);

                      case 23:
                        _context3.prev = 23;

                        _iterator3.f();

                        return _context3.finish(23);

                      case 26:
                        if (!window.top.document.hidden) {
                          window.top.document.title = originalTitle;
                        } else {
                          handleDocumentTitleTabChange(event, titles, originalTitle);
                        }

                      case 27:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[2, 20, 23, 26]]);
              }));

              return function handleDocumentTitleTabChange(_x6, _x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }();

            handlePopupClick = function handlePopupClick(event) {
              var id = event.target.id;

              if (id && id === "nd-popup__wrapper") {
                $("#nd-popup__wrapper").remove();
                window.removeEventListener("click", handlePopupClick, true);
                window.removeEventListener("touchend", handlePopupClick, true);
              }
            };

            handleModalClick = function handleModalClick(event) {
              var classList = event.target.classList;

              if (classList && classList.contains("nd-modal__wrapper")) {
                $(".nd-modal__wrapper").hide();
                window.removeEventListener("click", handleModalClick, true);
                window.removeEventListener("touchend", handleModalClick, true);
              }
            };

            displayPopup = function displayPopup() {
              if (window.top.document.hidden) return;
              if (parseInt(sessionStorage.getItem(POPUP_DISPLAY_FLAG)) > 0) return;
              sessionStorage.setItem(POPUP_DISPLAY_FLAG, 1);
              var qPopup = window.top.document.querySelector("#grt-shadow-host");
              if (qPopup) qPopup.style["display"] = "none";
              window.top.document.getElementById("nd-popup__wrapper").style["display"] = "block";
              window.addEventListener("click", handlePopupClick, true);
              window.addEventListener("touchend", handlePopupClick, true);
              window.top.document.documentElement.removeEventListener("mouseleave", displayPopup, {
                once: true
              });
              window.top.document.documentElement.removeEventListener("copy", displayPopup, {
                once: true
              });
              window.top.removeEventListener("visibilitychange", displayPopup);
              window.top.removeEventListener("popstate", displayPopup, {
                once: true
              });
              setTimeout(function () {
                $("#nd-popup__wrapper").remove();
                window.removeEventListener("click", handlePopupClick, true);
                window.removeEventListener("touchend", handlePopupClick, true);
              }, 15000);
            };

            displayModal = function displayModal(value, contentSelector) {
              if (window.top.document.hidden) return;
              var qPopup = window.top.document.querySelector("#grt-shadow-host");
              if (qPopup) qPopup.style["display"] = "none";
              if (!window.top.document.querySelector(".nd-modal__wrapper")) createPopup(value, contentSelector, true);
              window.top.document.querySelector(".nd-modal__wrapper").style["display"] = "block";
              window.addEventListener("click", handleModalClick, true);
            };

            createPopup = function createPopup(value, contentSelector) {
              var isModal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
              // Create popup wrapper
              var popupWrapper = window.top.document.createElement("div"); // eslint-disable-next-line max-len

              popupWrapper.classList.add("nd-popup__wrapper");
              if (isModal) popupWrapper.classList.add("nd-modal__wrapper");
              if (!isModal) popupWrapper.id = "nd-popup__wrapper"; // Create popup close button

              var popupCloseButton = window.top.document.createElement("button");
              var popupCloseButtonStyle = isModal ? "nd-popup__button-close__colored" : "nd-popup__button-close";
              popupCloseButton.classList.add(popupCloseButtonStyle);
              popupCloseButton.innerText = "X";

              if (isModal) {
                popupCloseButton.onclick = function () {
                  $(".nd-modal__wrapper").hide();
                  window.removeEventListener("click", handleModalClick, true);
                };
              } else {
                popupCloseButton.onclick = function () {
                  $("#nd-popup__wrapper").remove();
                  window.removeEventListener("click", handlePopupClick, true);
                };
              }

              if (contentSelector) {
                var contents = Array.from(window.top.document.querySelectorAll(contentSelector));

                while (value.includes("{{REPLACE}}") && contents.length > 0) {
                  value = value.replace("{{REPLACE}}", contents.shift().src);
                }
              } // Create popup from action and append close button


              var template = window.top.document.createElement("template");
              template.innerHTML = value.trim();
              var popup = template.content.firstChild;
              popup.appendChild(popupCloseButton);
              popupWrapper.appendChild(popup); // Remove old popup if exists before appending new one

              $("#nd-popup__wrapper").remove();
              window.top.document.body.appendChild(popupWrapper);
            };

            swapNodes = function swapNodes(n1, n2) {
              var p1 = n1.parentNode;
              var p2 = n2.parentNode;
              var i1;
              var i2;
              if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;

              for (var i = 0; i < p1.children.length; i++) {
                if (p1.children[i].isEqualNode(n1)) {
                  i1 = i;
                }
              }

              for (var _i2 = 0; _i2 < p2.children.length; _i2++) {
                if (p2.children[_i2].isEqualNode(n2)) {
                  i2 = _i2;
                }
              }

              if (p1.isEqualNode(p2) && i1 < i2) {
                i2++;
              }

              p1.insertBefore(n2, p1.children[i1]);
              p2.insertBefore(n1, p2.children[i2]);
            };

            waitForJQuery = function waitForJQuery() {
              return new Promise(function (resolve) {
                if (!window.jQuery) {
                  logger.log("jQuery not found, retrying");
                  var jQueryInterval = setInterval(function () {
                    if (window.jQuery) {
                      clearInterval(jQueryInterval);
                      resolve(true);
                    }
                  }, 25);
                  setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
                    return regenerator_default().wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            clearInterval(jQueryInterval);
                            resolve(false);

                          case 2:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  })), 2000);
                } else resolve(true);
              });
            };

            actionApplicator = /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(actions) {
                var _iterator4, _step4, action, _result, eligibleElements, _iterator5, _step5, element;

                return regenerator_default().wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return waitForJQuery();

                      case 2:
                        if (!_context5.sent) {
                          _context5.next = 59;
                          break;
                        }

                        _iterator4 = BeagleApplyActions_createForOfIteratorHelper(actions);
                        _context5.prev = 4;

                        _iterator4.s();

                      case 6:
                        if ((_step4 = _iterator4.n()).done) {
                          _context5.next = 49;
                          break;
                        }

                        action = _step4.value;
                        _context5.prev = 8;
                        _result = false;

                        if (!action.condition) {
                          _context5.next = 36;
                          break;
                        }

                        _context5.next = 13;
                        return action_condition_util(action.condition);

                      case 13:
                        eligibleElements = _context5.sent;
                        _iterator5 = BeagleApplyActions_createForOfIteratorHelper(eligibleElements);
                        _context5.prev = 15;

                        _iterator5.s();

                      case 17:
                        if ((_step5 = _iterator5.n()).done) {
                          _context5.next = 26;
                          break;
                        }

                        element = _step5.value;
                        _context5.next = 21;
                        return transformer(action, element);

                      case 21:
                        _result = _context5.sent;

                        if (!(_result === false)) {
                          _context5.next = 24;
                          break;
                        }

                        return _context5.abrupt("return", false);

                      case 24:
                        _context5.next = 17;
                        break;

                      case 26:
                        _context5.next = 31;
                        break;

                      case 28:
                        _context5.prev = 28;
                        _context5.t0 = _context5["catch"](15);

                        _iterator5.e(_context5.t0);

                      case 31:
                        _context5.prev = 31;

                        _iterator5.f();

                        return _context5.finish(31);

                      case 34:
                        _context5.next = 39;
                        break;

                      case 36:
                        _context5.next = 38;
                        return transformer(action);

                      case 38:
                        _result = _context5.sent;

                      case 39:
                        if (!(_result === false)) {
                          _context5.next = 41;
                          break;
                        }

                        return _context5.abrupt("return", false);

                      case 41:
                        _context5.next = 47;
                        break;

                      case 43:
                        _context5.prev = 43;
                        _context5.t1 = _context5["catch"](8);
                        logger.failed("Couldn't apply action ".concat(JSON.stringify(action), " with error ").concat(_context5.t1.message));
                        return _context5.abrupt("return", _context5.t1);

                      case 47:
                        _context5.next = 6;
                        break;

                      case 49:
                        _context5.next = 54;
                        break;

                      case 51:
                        _context5.prev = 51;
                        _context5.t2 = _context5["catch"](4);

                        _iterator4.e(_context5.t2);

                      case 54:
                        _context5.prev = 54;

                        _iterator4.f();

                        return _context5.finish(54);

                      case 57:
                        _context5.next = 61;
                        break;

                      case 59:
                        logger.failed("Jquery not found on window");
                        return _context5.abrupt("return", false);

                      case 61:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[4, 51, 54, 57], [8, 43], [15, 28, 31, 34]]);
              }));

              return function actionApplicator(_x9) {
                return _ref4.apply(this, arguments);
              };
            }(); // Apply actions


            _context6.next = 16;
            return actionApplicator(actions);

          case 16:
            result = _context6.sent;
            return _context6.abrupt("return", result);

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _applyActions.apply(this, arguments);
}

/* harmony default export */ var BeagleApplyActions = (applyActions);
;// CONCATENATED MODULE: ./src/BeagleOn/robotEngine.js








function robotEngine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = robotEngine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function robotEngine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return robotEngine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return robotEngine_arrayLikeToArray(o, minLen); }

function robotEngine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var robotEngine_logger = new src_logger("BeagleRobotEngine");
var OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  attributes: true
};

var RobotEngine = /*#__PURE__*/function () {
  function RobotEngine(body) {
    _classCallCheck(this, RobotEngine);

    var debugFilteredTreatments = body.debugFilteredTreatments,
        debugMode = body.debugMode,
        matchedTreatments = body.matchedTreatments,
        identifier = body.identifier,
        pageType = body.pageType;
    this.engagementLock = {};
    this.pageType = pageType;
    this.debugMode = debugMode;
    this.identifier = identifier;
    this.reApplyTreatmentsMap = {};
    this.addedDataListenerIds = [];
    this.matchedTreatments = matchedTreatments;
    this.debugFilteredTreatments = debugFilteredTreatments;
    this.isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  }

  _createClass(RobotEngine, [{
    key: "engageRobots",
    value: function () {
      var _engageRobots = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _iterator, _step, treatment;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = robotEngine_createForOfIteratorHelper(this.matchedTreatments);
                _context.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 15;
                  break;
                }

                treatment = _step.value;
                _context.prev = 5;
                _context.next = 8;
                return this.engageRobot(treatment);

              case 8:
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](5);
                robotEngine_logger.failed("Error engaging robot ".concat(treatment.id, ": ").concat(_context.t0.message || _context.t0));

              case 13:
                _context.next = 3;
                break;

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t1 = _context["catch"](1);

                _iterator.e(_context.t1);

              case 20:
                _context.prev = 20;

                _iterator.f();

                return _context.finish(20);

              case 23:
                this.initiateReapplyRobotMap();

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 17, 20, 23], [5, 10]]);
      }));

      function engageRobots() {
        return _engageRobots.apply(this, arguments);
      }

      return engageRobots;
    }()
  }, {
    key: "engageRobot",
    value: function () {
      var _engageRobot = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(treatment) {
        var _this = this;

        var id, actions, eligibilityRuleSet, device, dependant_on_treatment, reapply_event, reapply_event_page_type, businessRuleSet, weight, delay, debugMode, debugFilteredTreatments, engagementLock, identifier, isMobile, reApplyTreatmentsMap, matchedTreatments, pageType, prepareAndApply, reapply_event_array, _iterator2, _step2, reapplyEvent, previousValue, treatmentSkipRatio, _matchedTreatments$fi, dependantOnTreatmentWeight, determiningIdentifier, treatmentPct, businessRuleId;

        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = treatment.id, actions = treatment.actions, eligibilityRuleSet = treatment.eligibilityRuleSet, device = treatment.device, dependant_on_treatment = treatment.dependant_on_treatment, reapply_event = treatment.reapply_event, reapply_event_page_type = treatment.reapply_event_page_type, businessRuleSet = treatment.businessRuleSet, weight = treatment.weight, delay = treatment.delay;
                debugMode = this.debugMode, debugFilteredTreatments = this.debugFilteredTreatments, engagementLock = this.engagementLock, identifier = this.identifier, isMobile = this.isMobile, reApplyTreatmentsMap = this.reApplyTreatmentsMap, matchedTreatments = this.matchedTreatments, pageType = this.pageType, prepareAndApply = this.prepareAndApply; // one engagement at a time

                if (!engagementLock[id]) {
                  _context3.next = 5;
                  break;
                }

                robotEngine_logger.log("Treatment ".concat(id, " engagement in progress, skipping"));
                return _context3.abrupt("return");

              case 5:
                engagementLock[id] = true;

                if (!(debugMode !== 1 && !weight && !dependant_on_treatment)) {
                  _context3.next = 9;
                  break;
                }

                engagementLock[id] = false;
                return _context3.abrupt("return");

              case 9:
                if (!(debugMode && debugFilteredTreatments && !debugFilteredTreatments.includes(id))) {
                  _context3.next = 12;
                  break;
                }

                engagementLock[id] = false;
                return _context3.abrupt("return");

              case 12:
                if (!(device === "mobile" && !isMobile)) {
                  _context3.next = 16;
                  break;
                }

                robotEngine_logger.failed("Treatment device 'mobile' mismatch");
                engagementLock[id] = false;
                return _context3.abrupt("return");

              case 16:
                if (!(device === "desktop" && isMobile)) {
                  _context3.next = 20;
                  break;
                }

                robotEngine_logger.failed("Treatment device 'desktop' mismatch");
                engagementLock[id] = false;
                return _context3.abrupt("return");

              case 20:
                if (reapply_event) {
                  if (!reapply_event_page_type || reapply_event_page_type === pageType) {
                    reapply_event_array = reapply_event;
                    if (!Array.isArray(reapply_event)) reapply_event_array = [reapply_event];
                    robotEngine_logger.log("Reapply event '".concat(reapply_event, "' found for treatment: ").concat(id));
                    _iterator2 = robotEngine_createForOfIteratorHelper(reapply_event_array);

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        reapplyEvent = _step2.value;
                        previousValue = reApplyTreatmentsMap[reapplyEvent] ? reApplyTreatmentsMap[reapplyEvent] : [];

                        if (previousValue.includes(id)) {
                          robotEngine_logger.log("Treatment already added for reapply event");
                        } else reApplyTreatmentsMap[reapplyEvent] = [].concat(_toConsumableArray(previousValue), [id]);
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }
                }

                robotEngine_logger.log("Starting base rule set check for treatment: " + id);
                _context3.t0 = !eligibilityRuleSet;

                if (_context3.t0) {
                  _context3.next = 27;
                  break;
                }

                _context3.next = 26;
                return this.checkEligibilityRuleSet(eligibilityRuleSet);

              case 26:
                _context3.t0 = _context3.sent;

              case 27:
                if (!_context3.t0) {
                  _context3.next = 63;
                  break;
                }

                treatmentSkipRatio = weight === 100 ? 0 : 100 - weight || TREATMENT_RATIO;

                if (dependant_on_treatment) {
                  // If dependant on treatment is found and has weight; use its skip ratio
                  dependantOnTreatmentWeight = (_matchedTreatments$fi = matchedTreatments.find(function (t) {
                    return t.id === dependant_on_treatment;
                  })) === null || _matchedTreatments$fi === void 0 ? void 0 : _matchedTreatments$fi.weight;
                  treatmentSkipRatio = dependantOnTreatmentWeight === 100 ? 0 : 100 - dependantOnTreatmentWeight || TREATMENT_RATIO;
                }

                robotEngine_logger.log("Treatment skip ratio: " + treatmentSkipRatio); // Determining identifier for calculating treatment percentage (treatmentPct)

                determiningIdentifier = dependant_on_treatment || id; // treatmentPct is the percentage value for the treatment used to determine if it should be skipped or not
                // treatmentPct is 100 when debug mode is 1, ensuring no treatments are skipped

                if (!(debugMode === 1)) {
                  _context3.next = 36;
                  break;
                }

                _context3.t1 = 100;
                _context3.next = 39;
                break;

              case 36:
                _context3.next = 38;
                return determinePct(identifier + determiningIdentifier);

              case 38:
                _context3.t1 = _context3.sent;

              case 39:
                treatmentPct = _context3.t1;
                robotEngine_logger.log("TreatmentPct: " + treatmentPct + " with debug mode ".concat(debugMode ? "on" : "off"));
                businessRuleId = null;

                if (!businessRuleSet) {
                  _context3.next = 48;
                  break;
                }

                robotEngine_logger.log("Starting sub variant rule set check for treatment: " + id);
                _context3.next = 46;
                return this.checkBusinessRules(businessRuleSet);

              case 46:
                businessRuleId = _context3.sent;

                if (businessRuleId !== null) {
                  robotEngine_logger.log("Applying business rule transformation with id: ", businessRuleId);
                } else robotEngine_logger.log("Applying treatment with default values");

              case 48:
                if (!(treatmentPct < treatmentSkipRatio)) {
                  _context3.next = 53;
                  break;
                }

                robotEngine_logger.log("Treatment ".concat(id, " skipped due to treatment split ratio"));
                addTreatment(id, businessRuleId, null, "skipped", dependant_on_treatment);
                engagementLock[id] = false;
                return _context3.abrupt("return");

              case 53:
                if (delay) {
                  _context3.next = 60;
                  break;
                }

                _context3.next = 56;
                return prepareAndApply(id, identifier, actions, businessRuleId);

              case 56:
                engagementLock[id] = false;
                this.addRuleSetDataListeners(treatment);
                _context3.next = 61;
                break;

              case 60:
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                  return regenerator_default().wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return prepareAndApply(id, identifier, actions, businessRuleId);

                        case 2:
                          engagementLock[id] = false;

                          _this.addRuleSetDataListeners(treatment);

                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })), delay);

              case 61:
                _context3.next = 65;
                break;

              case 63:
                robotEngine_logger.failed("Rule check failed for treatment:", id);
                engagementLock[treatment.id] = false;

              case 65:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function engageRobot(_x) {
        return _engageRobot.apply(this, arguments);
      }

      return engageRobot;
    }()
  }, {
    key: "prepareAndApply",
    value: function () {
      var _prepareAndApply = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(id, identifier, actions, businessRuleId) {
        var _yield$prepareActions, _yield$prepareActions2, prepared, variant, res;

        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return prepareActions(identifier, actions, businessRuleId);

              case 2:
                _yield$prepareActions = _context4.sent;
                _yield$prepareActions2 = _slicedToArray(_yield$prepareActions, 2);
                prepared = _yield$prepareActions2[0];
                variant = _yield$prepareActions2[1];
                _context4.next = 8;
                return BeagleApplyActions(prepared);

              case 8:
                res = _context4.sent;

                if (res === false) {
                  addTreatment(id, businessRuleId, variant, "failed");
                } else {
                  addTreatment(id, businessRuleId, variant, "applied");
                }

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function prepareAndApply(_x2, _x3, _x4, _x5) {
        return _prepareAndApply.apply(this, arguments);
      }

      return prepareAndApply;
    }()
  }, {
    key: "initiateReapplyRobotMap",
    value: function initiateReapplyRobotMap() {
      var _this2 = this;

      var reApplyTreatmentsMap = this.reApplyTreatmentsMap,
          matchedTreatments = this.matchedTreatments;

      var _loop = function _loop() {
        var key = _Object$keys[_i];
        var treatmentIds = reApplyTreatmentsMap[key];
        var reApplyTreatments = matchedTreatments.filter(function (t) {
          return treatmentIds.includes(t.id);
        });

        switch (key) {
          case "infinite_scroll":
            {
              var observer = new ResizeObserver(function () {
                var _iterator3 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step3;

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var treatment = _step3.value;
                    robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from infinite_scroll"));

                    _this2.engageRobot(treatment);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              });
              observer.observe(window.top.document.documentElement);
            }
            break;

          case "timeout":
            {
              setTimeout(function () {
                var _iterator4 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step4;

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var treatment = _step4.value;
                    robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from timeout"));

                    _this2.engageRobot(treatment);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }, 500);
            }
            break;

          case "element_change":
            {
              var _iterator5 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step5;

              try {
                var _loop2 = function _loop2() {
                  var treatment = _step5.value;
                  var reapplySelectorList = Array.isArray(treatment.reapply_selector) ? treatment.reapply_selector : [treatment.reapply_selector];

                  var _iterator6 = robotEngine_createForOfIteratorHelper(reapplySelectorList),
                      _step6;

                  try {
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                      var selector = _step6.value;
                      var element = window.top.document.querySelector(selector);

                      if (element) {
                        var _observer = new MutationObserver(function () {
                          robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from element_change"));

                          _this2.engageRobot(treatment);
                        });

                        _observer.observe(element, OBSERVER_CONFIG);
                      }
                    }
                  } catch (err) {
                    _iterator6.e(err);
                  } finally {
                    _iterator6.f();
                  }
                };

                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  _loop2();
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }
            break;

          case "on_scroll":
            {
              // add window scroll listener, call engageRobot on scroll, do not trigger more than once per 250ms
              var lastScrollTop = 0;
              var lastScrollTime = 0;
              window.addEventListener("scroll", function () {
                var now = new Date().getTime();
                var st = window.pageYOffset || window.top.document.documentElement.scrollTop;

                if (now - lastScrollTime > 250 && Math.abs(lastScrollTop - st) > 5) {
                  lastScrollTop = st;
                  lastScrollTime = now;

                  var _iterator7 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                      _step7;

                  try {
                    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                      var treatment = _step7.value;
                      robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from on_scroll"));

                      _this2.engageRobot(treatment);
                    }
                  } catch (err) {
                    _iterator7.e(err);
                  } finally {
                    _iterator7.f();
                  }
                }
              }, false);
            }
            break;

          case "query_search_change":
            {
              var queryString = window.location.search;

              var _observer2 = new MutationObserver(function () {
                if (window.location.search !== queryString) {
                  queryString = window.location.search;

                  var _iterator8 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                      _step8;

                  try {
                    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                      var treatment = _step8.value;
                      robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from query_search_change"));

                      _this2.engageRobot(treatment);
                    }
                  } catch (err) {
                    _iterator8.e(err);
                  } finally {
                    _iterator8.f();
                  }
                }
              });

              _observer2.observe(document, OBSERVER_CONFIG);
            }
            break;

          case "interval":
            var _iterator9 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                _step9;

            try {
              var _loop3 = function _loop3() {
                var treatment = _step9.value;
                var reapplyInterval = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
                  var applied;
                  return regenerator_default().wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return getFromBeagleInfoLayer("a", true);

                        case 2:
                          applied = _context5.sent;

                          if (!(applied !== null && applied !== void 0 && applied[treatment.id])) {
                            _context5.next = 7;
                            break;
                          }

                          clearInterval(reapplyInterval);
                          _context5.next = 10;
                          break;

                        case 7:
                          robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from interval"));
                          _context5.next = 10;
                          return _this2.engageRobot(treatment);

                        case 10:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                })), 50);
                setTimeout(function () {
                  clearInterval(reapplyInterval);
                }, 2500);
              };

              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                _loop3();
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            break;

          case "info_layer_change":
            var _iterator10 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                _step10;

            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var treatment = _step10.value;

                var boundEngageTreatment = _this2.engageRobot.bind(_this2, treatment);

                addDataListener(treatment.reapply_selector, boundEngageTreatment);
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }

            break;

          default:
            robotEngine_logger.failed("Reapply event not found: ", key);
            break;
        }
      };

      for (var _i = 0, _Object$keys = Object.keys(reApplyTreatmentsMap); _i < _Object$keys.length; _i++) {
        _loop();
      }
    }
  }, {
    key: "addRuleSetDataListeners",
    value: function () {
      var _addRuleSetDataListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(treatment) {
        var _treatment$eligibilit, eligibilityRuleSet, _treatment$businessRu, businessRuleSet, id, selectors, boundEngageTreatment, _iterator11, _step11, selector;

        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _treatment$eligibilit = treatment.eligibilityRuleSet, eligibilityRuleSet = _treatment$eligibilit === void 0 ? [] : _treatment$eligibilit, _treatment$businessRu = treatment.businessRuleSet, businessRuleSet = _treatment$businessRu === void 0 ? [] : _treatment$businessRu, id = treatment.id;

                if (!this.addedDataListenerIds.includes(id)) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return");

              case 3:
                selectors = this.extractDataListenerSelectors([].concat(_toConsumableArray(eligibilityRuleSet), _toConsumableArray(businessRuleSet)));
                boundEngageTreatment = this.engageRobot.bind(this, treatment);
                _iterator11 = robotEngine_createForOfIteratorHelper(selectors);

                try {
                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    selector = _step11.value;
                    addDataListener("__eRules.".concat(selector), boundEngageTreatment);
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
                }

                this.addedDataListenerIds.push(id);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function addRuleSetDataListeners(_x6) {
        return _addRuleSetDataListeners.apply(this, arguments);
      }

      return addRuleSetDataListeners;
    }()
  }, {
    key: "extractDataListenerSelectors",
    value: function extractDataListenerSelectors(ruleSet) {
      var previousSelectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var selectors = previousSelectors || [];

      var _iterator12 = robotEngine_createForOfIteratorHelper(ruleSet),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var rule = _step12.value;

          if (typeof rule === "string") {
            if (rule.startsWith("!")) rule = rule.slice(1);
            selectors.push(rule.split(".")[0]);
            continue;
          }

          this.extractDataListenerSelectors(rule.set, selectors);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      return _toConsumableArray(new Set(selectors));
    }
  }, {
    key: "checkEligibility",
    value: function () {
      var _checkEligibility = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7(eligibilityRule) {
        var oppositeFlag, _eligibilityRule$spli, _eligibilityRule$spli2, eligibilityScope, eligibilityName, res;

        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                robotEngine_logger.log("Checking eligibility ".concat(eligibilityRule));
                oppositeFlag = false;
                _eligibilityRule$spli = eligibilityRule.split("."), _eligibilityRule$spli2 = _slicedToArray(_eligibilityRule$spli, 2), eligibilityScope = _eligibilityRule$spli2[0], eligibilityName = _eligibilityRule$spli2[1];

                if (eligibilityScope.startsWith("!")) {
                  oppositeFlag = true;
                  eligibilityScope = eligibilityScope.slice(1);
                }

                _context7.next = 6;
                return getFromBeagleInfoLayer("__eRules.".concat(eligibilityScope));

              case 6:
                res = _context7.sent;

                if (!(!res || !Array.isArray(res))) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt("return", false);

              case 9:
                if (!(oppositeFlag && res.includes(eligibilityName))) {
                  _context7.next = 11;
                  break;
                }

                return _context7.abrupt("return", false);

              case 11:
                if (!(!oppositeFlag && !res.includes(eligibilityName))) {
                  _context7.next = 13;
                  break;
                }

                return _context7.abrupt("return", false);

              case 13:
                robotEngine_logger.log("".concat(eligibilityRule, " is eligible"));
                return _context7.abrupt("return", true);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function checkEligibility(_x7) {
        return _checkEligibility.apply(this, arguments);
      }

      return checkEligibility;
    }()
  }, {
    key: "checkEligibilityRuleSet",
    value: function () {
      var _checkEligibilityRuleSet = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8(eligibilityRuleSet) {
        var eligibilitySetType,
            previousIsEligible,
            isEligible,
            _iterator13,
            _step13,
            eligibilityRule,
            _args8 = arguments;

        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                eligibilitySetType = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : null;
                previousIsEligible = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : null;
                robotEngine_logger.log("Checking robot eligibility");

                if (Array.isArray(eligibilityRuleSet)) {
                  _context8.next = 6;
                  break;
                }

                robotEngine_logger.failed("Eligibility Rule Set ".concat(eligibilityRuleSet, " is not an array"));
                return _context8.abrupt("return", false);

              case 6:
                isEligible = previousIsEligible;
                _iterator13 = robotEngine_createForOfIteratorHelper(eligibilityRuleSet);
                _context8.prev = 8;

                _iterator13.s();

              case 10:
                if ((_step13 = _iterator13.n()).done) {
                  _context8.next = 57;
                  break;
                }

                eligibilityRule = _step13.value;

                if (!(typeof eligibilityRule === "string")) {
                  _context8.next = 49;
                  break;
                }

                if (eligibilitySetType) {
                  _context8.next = 21;
                  break;
                }

                _context8.next = 16;
                return this.checkEligibility(eligibilityRule);

              case 16:
                isEligible = _context8.sent;

                if (isEligible) {
                  _context8.next = 19;
                  break;
                }

                return _context8.abrupt("return", false);

              case 19:
                _context8.next = 47;
                break;

              case 21:
                if (!eligibilitySetType) {
                  _context8.next = 47;
                  break;
                }

                if (!(isEligible === null)) {
                  _context8.next = 27;
                  break;
                }

                _context8.next = 25;
                return this.checkEligibility(eligibilityRule);

              case 25:
                isEligible = _context8.sent;
                return _context8.abrupt("continue", 55);

              case 27:
                _context8.t0 = eligibilitySetType;
                _context8.next = _context8.t0 === "or" ? 30 : _context8.t0 === "and" ? 37 : 44;
                break;

              case 30:
                _context8.t1 = isEligible;

                if (_context8.t1) {
                  _context8.next = 35;
                  break;
                }

                _context8.next = 34;
                return this.checkEligibility(eligibilityRule, eligibilitySetType);

              case 34:
                _context8.t1 = _context8.sent;

              case 35:
                isEligible = _context8.t1;
                return _context8.abrupt("break", 47);

              case 37:
                _context8.t2 = isEligible;

                if (!_context8.t2) {
                  _context8.next = 42;
                  break;
                }

                _context8.next = 41;
                return this.checkEligibility(eligibilityRule, eligibilitySetType);

              case 41:
                _context8.t2 = _context8.sent;

              case 42:
                isEligible = _context8.t2;
                return _context8.abrupt("break", 47);

              case 44:
                robotEngine_logger.failed("Unknown eligibilitySetType: ", eligibilitySetType);
                isEligible = false;
                return _context8.abrupt("break", 47);

              case 47:
                _context8.next = 55;
                break;

              case 49:
                if (!(_typeof(eligibilityRule) === "object")) {
                  _context8.next = 55;
                  break;
                }

                _context8.next = 52;
                return this.checkEligibilityRuleSet(eligibilityRule.set, eligibilityRule.type, isEligible);

              case 52:
                isEligible = _context8.sent;

                if (isEligible) {
                  _context8.next = 55;
                  break;
                }

                return _context8.abrupt("return", false);

              case 55:
                _context8.next = 10;
                break;

              case 57:
                _context8.next = 62;
                break;

              case 59:
                _context8.prev = 59;
                _context8.t3 = _context8["catch"](8);

                _iterator13.e(_context8.t3);

              case 62:
                _context8.prev = 62;

                _iterator13.f();

                return _context8.finish(62);

              case 65:
                return _context8.abrupt("return", isEligible);

              case 66:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[8, 59, 62, 65]]);
      }));

      function checkEligibilityRuleSet(_x8) {
        return _checkEligibilityRuleSet.apply(this, arguments);
      }

      return checkEligibilityRuleSet;
    }() // Return index of businessRule, this is the businessRuleId

  }, {
    key: "checkBusinessRules",
    value: function () {
      var _checkBusinessRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9(businessRuleSet) {
        var _iterator14, _step14, _step14$value, index, businessRule;

        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iterator14 = robotEngine_createForOfIteratorHelper(businessRuleSet.entries());
                _context9.prev = 1;

                _iterator14.s();

              case 3:
                if ((_step14 = _iterator14.n()).done) {
                  _context9.next = 11;
                  break;
                }

                _step14$value = _slicedToArray(_step14.value, 2), index = _step14$value[0], businessRule = _step14$value[1];
                _context9.next = 7;
                return this.checkEligibilityRuleSet([businessRule]);

              case 7:
                if (!_context9.sent) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt("return", index);

              case 9:
                _context9.next = 3;
                break;

              case 11:
                _context9.next = 16;
                break;

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](1);

                _iterator14.e(_context9.t0);

              case 16:
                _context9.prev = 16;

                _iterator14.f();

                return _context9.finish(16);

              case 19:
                return _context9.abrupt("return", null);

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 13, 16, 19]]);
      }));

      function checkBusinessRules(_x9) {
        return _checkBusinessRules.apply(this, arguments);
      }

      return checkBusinessRules;
    }()
  }]);

  return RobotEngine;
}();


;// CONCATENATED MODULE: ./src/BeagleOn/index.js










var BeagleOn_logger = new src_logger("BeagleOnComponent");

var beagleOn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(identifier, debugMode, pageType) {
    var persistProductInfoPromise, eligibilityRulesAssessPromise, treatmentsPromise, treatmentWeightsPromise, searchParams, debugFilteredTreatments, _yield$Promise$all, _yield$Promise$all2, treatments, treatmentWeights, m, treatmentRepository, matchedTreatments, robotEngine;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            persistProductInfoPromise = store.getInstance().persistProductInfo();
            eligibilityRulesAssessPromise = assesEligibilityRules();
            treatmentsPromise = BeagleTreatmentRepository.getTreatments();
            treatmentWeightsPromise = BeagleTreatmentRepository.getTreatmentWeights();
            injectStyleSheet();
            initiateSessionStorages();
            addToBeagleInfoLayer("m", "on-init");
            searchParams = window.location.search;
            debugFilteredTreatments = null;

            if (debugMode && searchParams.includes("filter=")) {
              debugFilteredTreatments = searchParams.slice(searchParams.indexOf("[") + 1, searchParams.lastIndexOf("]")).split(",").map(function (item) {
                return parseInt(item, 10);
              });
            }

            setTimeout(function () {
              removeDocumentHide();
            }, 3000);
            _context.next = 13;
            return Promise.all([treatmentsPromise, treatmentWeightsPromise]);

          case 13:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            treatments = _yield$Promise$all2[0];
            treatmentWeights = _yield$Promise$all2[1];

            if (!(!treatments || !treatmentWeights)) {
              _context.next = 23;
              break;
            }

            m = "Failed to fetch treatments/weights";
            if (!treatments) m = m + " no treatments";
            if (!treatmentWeights) m = m + " no treatment weights";
            addToBeagleInfoLayer("m", m);
            throw new Error("Failed to fetch treatments/weights");

          case 23:
            BeagleOn_logger.success("Found treatments: ", treatments);
            addToBeagleInfoLayer("m", "fetched-treatments");
            treatmentRepository = new BeagleTreatmentRepository({
              treatments: treatments,
              treatmentWeights: treatmentWeights
            });
            _context.next = 28;
            return treatmentRepository.getMatchedTreatments();

          case 28:
            matchedTreatments = _context.sent;

            if (matchedTreatments.length) {
              _context.next = 34;
              break;
            }

            BeagleOn_logger.log("No treatments matched, returning without further action");
            addToBeagleInfoLayer("m", "no-robot-matched");
            removeDocumentHide();
            return _context.abrupt("return");

          case 34:
            _context.next = 36;
            return Promise.all([eligibilityRulesAssessPromise, persistProductInfoPromise]);

          case 36:
            robotEngine = new RobotEngine({
              debugFilteredTreatments: debugFilteredTreatments,
              debugMode: debugMode,
              matchedTreatments: matchedTreatments,
              identifier: identifier,
              pageType: pageType
            });
            _context.next = 39;
            return robotEngine.engageRobots();

          case 39:
            removeDocumentHide();
            addToBeagleInfoLayer("m", "robots-engaged");
            _context.t0 = BeagleOn_logger;
            _context.next = 44;
            return getFromBeagleInfoLayer("a");

          case 44:
            _context.t1 = _context.sent;

            _context.t0.success.call(_context.t0, "Applied treatments: ", _context.t1);

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function beagleOn(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function assesEligibilityRules() {
  return _assesEligibilityRules.apply(this, arguments);
}

function _assesEligibilityRules() {
  _assesEligibilityRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
    var eligibilityRules, ruleEngine;
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return RuleEngine.getEligibilityRules();

          case 2:
            eligibilityRules = _context2.sent;

            if (eligibilityRules) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return");

          case 5:
            ruleEngine = new RuleEngine({
              eligibilityRules: eligibilityRules
            });
            _context2.next = 8;
            return ruleEngine.assesEligibilityRules();

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _assesEligibilityRules.apply(this, arguments);
}

/* harmony default export */ var BeagleOn = (beagleOn);
;// CONCATENATED MODULE: ./src/BeagleClientSDK/index.js



/* eslint-disable max-len */






var SHUTDOWN = false;
var FLIPFLAG = false;

_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
  var monitor, logger, earlyLogSent, hideRemoved, _String$prototype, identifier, cookiePct, oosReason, isLabelSent, timeoutCounter, debugMode, isShowroom, isOn, pageType;

  return regenerator_default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          monitor = null;
          logger = new src_logger();
          logger.info("Beagle initializing");
          window.dataLayer = window.dataLayer || [];
          earlyLogSent = false;
          hideRemoved = false;
          _context.prev = 6;
          addToBeagleInfoLayer("GLOV_ON", "not-sent | initializing");
          monitor = new BeagleMonitor();
          initializeBeagleInfoLayer();
          _context.next = 12;
          return getIdentifier();

        case 12:
          identifier = _context.sent;
          logger.log("Found identifier: ", identifier);
          addToBeagleInfoLayer("cookieGaId", identifier);
          _context.next = 17;
          return determinePct(identifier);

        case 17:
          cookiePct = _context.sent;
          addToBeagleInfoLayer("onHashPct", cookiePct); // add current epoch integer to beagleInfoLayer

          addToBeagleInfoLayer("view_epoch", Date.now() + Math.random()); // data-less log to detect bounces

          _context.next = 22;
          return monitor.packAndQueueArrivalLog();

        case 22:
          oosReason = window.localStorage.getItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE); // if cannot get critical info, make out of scope and unsupported

          if (!(cookiePct === null || !navigator.sendBeacon || typeof navigator.sendBeacon !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype = String.prototype) === null || _String$prototype === void 0 ? void 0 : _String$prototype.padStart) !== "function" || oosReason && oosReason === "unsupported")) {
            _context.next = 28;
            break;
          }

          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "unsupported");
          addToBeagleInfoLayer("GLOV_ON", "unsupported | device");
          throw new Error("Device does not have required capabilities");

        case 28:
          isLabelSent = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT);
          timeoutCounter = parseInt(sessionStorage.getItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT)) || 0; // check if debug mode is on, also adds dbm to beagleInfoLayer and sets oosReason

          debugMode = getDebugMode("employee"); // if timed-out too many times for very first interactsions, make out of scope for the session

          if (!(!debugMode && !oosReason && !isLabelSent && timeoutCounter > MAX_TIMEOUT_PER_SESSION)) {
            _context.next = 35;
            break;
          }

          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          addToBeagleInfoLayer("GLOV_ON", "unsupported | timeout");
          throw new Error("Beagle timeout threshold reached");

        case 35:
          _context.next = 37;
          return getFromBeagleInfoLayer("vvsIsShowroom", true);

        case 37:
          isShowroom = _context.sent;

          if (!(isShowroom && (isShowroom === "true" || isShowroom === true))) {
            _context.next = 45;
            break;
          }

          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "employee");
          addToBeagleInfoLayer("GLOV_ON", "employee | showroom");
          throw new Error("User is from VVS showroom/callcenter");

        case 45:
          if (!(isShowroom === null || isShowroom === undefined)) {
            _context.next = 49;
            break;
          }

          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("Could not determine if user is from VVS showroom/callcenter");

        case 49:
          if (!(!window.top.document.documentElement.classList.contains("glov-hide") && !window.top.document.documentElement.classList.contains("nextDay-hide"))) {
            _context.next = 53;
            break;
          }

          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("Beagle script timed out");

        case 53:
          // isOn can be true (ON), false (OFF)
          isOn = null; // FLIP the direction of the flag

          if (FLIPFLAG) {
            cookiePct = 99 - cookiePct;
          }

          if (!debugMode) {
            _context.next = 62;
            break;
          }

          logger.log("Debug mode on: all applicable treatments will be applied");
          isOn = true;
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          addToBeagleInfoLayer("GLOV_ON", "employee | tester");
          _context.next = 78;
          break;

        case 62:
          if (!(oosReason && oosReason === "employee")) {
            _context.next = 69;
            break;
          }

          logger.warn("User is out of scope"); // set isOn to true/false when not debugMode but out of scope i.e. nd_debug=0 for testability

          isOn = cookiePct >= SPLIT_RATIO;
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          addToBeagleInfoLayer("GLOV_ON", "employee | tester");
          _context.next = 78;
          break;

        case 69:
          if (!oosReason) {
            _context.next = 74;
            break;
          }

          addToBeagleInfoLayer("GLOV_ON", "not-sent | unknown");
          throw new Error("Unknown out of scope reason");

        case 74:
          // if greater than SPLIT_RATIO, then in ON mode
          if (cookiePct >= SPLIT_RATIO) {
            isOn = true;
            window.dataLayer.push({
              event: "GLOV",
              GLOV_ON: "true"
            });
          } else if (cookiePct >= SPLIT_RATIO / 2) {
            isOn = false;
            window.dataLayer.push({
              event: "GLOV",
              GLOV_ON: "false2"
            });
          } else {
            isOn = false;
            window.dataLayer.push({
              event: "GLOV",
              GLOV_ON: "false1"
            });
          }

          addToBeagleInfoLayer("isOn", isOn);
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT, true);
          addToBeagleInfoLayer("GLOV_ON", isOn.toString());

        case 78:
          logger.log("Found cookie percentage: ", cookiePct);
          logger.log("Split_ratio: ", SPLIT_RATIO);
          logger.log("cookiePct < SPLIT_RATIO", cookiePct < SPLIT_RATIO);
          logger.log("Set isOn: ", isOn); // await critical info before sending logs for proper analytics measurements

          _context.next = 84;
          return getFromBeagleInfoLayer("PageType", true);

        case 84:
          pageType = _context.sent;

          if (!(pageType === "purchase")) {
            _context.next = 95;
            break;
          }

          _context.next = 88;
          return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);

        case 88:
          _context.next = 90;
          return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);

        case 90:
          _context.next = 92;
          return monitor.sendLogs(true);

        case 92:
          // if purchase is complete, do not apply any treatments on the confirmation page
          SHUTDOWN = true;
          _context.next = 96;
          break;

        case 95:
          // send logs when ready, start scraping and sending asyncly
          monitor.sendLogs(false);

        case 96:
          earlyLogSent = true;

          if (!(isOn === true)) {
            _context.next = 101;
            break;
          }

          if (!SHUTDOWN) {
            logger.log("Beagle ON Group Path");
            BeagleOn(identifier, debugMode, pageType);
          } else {
            logger.info("Beagle ON Group SHUTDOWN Path");
            removeDocumentHide();
            hideRemoved = true;
          }

          _context.next = 108;
          break;

        case 101:
          if (!(isOn === false)) {
            _context.next = 107;
            break;
          }

          logger.info("Beagle OFF Group Path");
          removeDocumentHide();
          hideRemoved = true;
          _context.next = 108;
          break;

        case 107:
          throw new Error("isOn is undefined or null");

        case 108:
          _context.next = 116;
          break;

        case 110:
          _context.prev = 110;
          _context.t0 = _context["catch"](6);
          logger.warn("Beagle Early Scope-out or ERROR: ", _context.t0.message);
          addToBeagleInfoLayer("m", _context.t0.message);
          if (!earlyLogSent && monitor) monitor.sendLogs(false);
          if (!hideRemoved) removeDocumentHide();

        case 116:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[6, 110]]);
}))();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUErQzs7Ozs7Ozs7QUNBL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsTUFBTTtBQUNOLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QUFBQSxZQUFZLEdBQUcsSUFBZjs7QUF4SUgsZ0JBMElPUyxJQUFJLEtBQUssSUExSWhCO0FBQUE7QUFBQTtBQUFBOztBQTJJSyxjQUFJLENBQUNaLFFBQUwsRUFBZTtBQUNiL3ZCLFlBQUFBLE1BQU0sQ0FBQ1IsR0FBUCxDQUFXLHNCQUFYO0FBQ0FvdkIsWUFBQUEsUUFBUSxDQUFDdHJCLFVBQUQsRUFBYXVvQixTQUFiLEVBQXdCalEsUUFBeEIsQ0FBUjtBQUNELFdBSEQsTUFHTztBQUNMNWIsWUFBQUEsTUFBTSxDQUFDVCxJQUFQLENBQVksK0JBQVo7QUFDQVcsWUFBQUEsa0JBQWtCO0FBQ2xCaXdCLFlBQUFBLFdBQVcsR0FBRyxJQUFkO0FBQ0Q7O0FBbEpOO0FBQUE7O0FBQUE7QUFBQSxnQkFtSmNRLElBQUksS0FBSyxLQW5KdkI7QUFBQTtBQUFBO0FBQUE7O0FBb0pLM3dCLFVBQUFBLE1BQU0sQ0FBQ1QsSUFBUCxDQUFZLHVCQUFaO0FBQ0FXLFVBQUFBLGtCQUFrQjtBQUNsQml3QixVQUFBQSxXQUFXLEdBQUcsSUFBZDtBQXRKTDtBQUFBOztBQUFBO0FBQUEsZ0JBd0pXLElBQUkzdEIsS0FBSixDQUFVLDJCQUFWLENBeEpYOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUEySkd4QyxVQUFBQSxNQUFNLENBQUNILElBQVAsQ0FBWSxtQ0FBWixFQUFpRCxZQUFJaUIsT0FBckQ7QUFDQWYsVUFBQUEsb0JBQW9CLENBQUMsR0FBRCxFQUFNLFlBQUllLE9BQVYsQ0FBcEI7QUFDQSxjQUFJLENBQUNvdkIsWUFBRCxJQUFpQkQsT0FBckIsRUFBOEJBLE9BQU8sQ0FBQ1csUUFBUixDQUFpQixLQUFqQjtBQUM5QixjQUFJLENBQUNULFdBQUwsRUFBa0Jqd0Isa0JBQWtCOztBQTlKdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBRCxLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2RhdGFMYXllckNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VsZW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9mdW5jdGlvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Nlc3Npb25DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS91cmxDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbnZDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlT24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImV4cG9ydCBjb25zdCByZXBsYWNlQWxsID0gKHN0ciwgZmluZCwgcmVwbGFjZSA9IFwiXCIpID0+IHtcbiAgaWYgKCFzdHIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gIGlmIChpbmRleCA8IDApIHJldHVybiBzdHI7XG5cbiAgd2hpbGUgKHN0ci5pbmRleE9mKGZpbmQpID49IDApIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICAgIHN0ciA9IChpbmRleCA+IDAgPyBzdHIuc3Vic3RyaW5nKDAsIGluZGV4KSA6IFwiXCIpICsgcmVwbGFjZSArIHN0ci5zdWJzdHJpbmcoaW5kZXggKyBmaW5kLmxlbmd0aCk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuZXhwb3J0IGNvbnN0IHR1cmtpc2hUb0xvd2VyID0gKHN0cikgPT4ge1xuICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xuICBsZXQgc3RyaW5nID0gc3RyO1xuICBjb25zdCBsZXR0ZXJzID0ge1wixLBcIjogXCJpXCIsIFwiSVwiOiBcIsSxXCIsIFwixZ5cIjogXCLFn1wiLCBcIsSeXCI6IFwixJ9cIiwgXCLDnFwiOiBcIsO8XCIsIFwiw5ZcIjogXCLDtlwiLCBcIsOHXCI6IFwiw6dcIn07XG4gIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oKFvEsEnFnsSew5zDh8OWXSkpL2csIGZ1bmN0aW9uKGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXJzW2xldHRlcl07XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi9zdHJpbmdVdGlsc1wiO1xuY29uc3QgaXNTdGFnaW5nID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwic3RhZ2luZy52aXZlbnNlXCIpIDogdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjAuMC4zOFwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbi8vIFRPRE8gcmV2ZXJ0IHRoZSBmb2xsb3dpbmcgc3RhZ2luZyBlbnYgY2hlY2sgYWZ0ZXIgbW92aW5nIHRvIG5ldyBicmFuY2ggc3RydWN0dXJlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0cy5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0lORk9fTE9DQVRJT04gPSBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvc29jaWFsLXByb29mLnR4dFwiO1xuZXhwb3J0IGNvbnN0IExPR19BUElfVVJMID0gXCJodHRwczovL2V1cm9wZS13ZXN0My1uZXh0ZGF5LTM0ZWIzLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvbG9nXCI7XG5leHBvcnQgY29uc3QgTE9PS1VQX0FQSV9VUkwgPSBcImh0dHBzOi8vY2F0YWxvZy1hcGkuYWRvcmFhaS5jb21cIjtcbmV4cG9ydCBjb25zdCBNT0JJTEVfTUVESUFfUVVFUlkgPSBcIihtYXgtd2lkdGg6IDQ0MHB4KVwiO1xuLy8gQ29udHJvbCBncm91cCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgU1BMSVRfUkFUSU8gPSA1MDtcbi8vIFNraXBwZWQgdHJlYXRtZW50IHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0RVUkFUSU9OID0gMTtcbmV4cG9ydCBjb25zdCBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiA9IDE7XG5leHBvcnQgY29uc3QgTElTVF9NT0RFX0JFQUdMRV9LRVlTID0gW1wicGFnZXR5cGVcIiwgXCJjYXRlZ29yeVwiLCBcImFsbHRpbWVQTFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUExQQ2F0ZWdvcnlNb2RlXCIsXG4gIFwiYWxsdGltZVBEUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QRFBDYXRlZ29yeU1vZGVcIiwgXCJhbGx0aW1lQ2FydENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25DYXJ0Q2F0ZWdvcnlNb2RlXCJdO1xuZXhwb3J0IGNvbnN0IElETEVfVElNRU9VVCA9IDE1MDAwO1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTl9TVE9SQUdFX0tFWVMgPSB7XG4gIFNFU1NJT05fVElNRVNUQU1QOiBcIkJHX1Nlc3Npb25UaW1lc3RhbXBcIixcbiAgU0VTU0lPTl9ISVNUT1JZOiBcIkJHX1Nlc3Npb25IaXN0b3J5XCIsXG4gIFRSRUFUTUVOVFM6IFwiQkdfVHJlYXRtZW50c1wiLFxuICBQT1BVUF9ESVNQTEFZX0ZMQUc6IFwiQkdfUG9wdXBEaXNwbGF5RmxhZ1wiLFxuICBTS1VfSU5GT19CQVNLRVQ6IFwiQkdfUHJvZHVjdEluZm9CYXNrZXRcIixcbiAgVElNRU9VVF9DT1VOVDogXCJCR19UaW1lb3V0Q291bnRcIixcbiAgU0VTU0lPTl9SRUZFUlJFUjogXCJCR19TZXNzaW9uUmVmZXJyZXJcIixcbiAgV0VJR0hUUzogXCJCR19XZWlnaHRzXCIsXG4gIEVMSUdJQklMSVRZX1JVTEVTOiBcIkJHX0VfUnVsZXNcIixcbn07XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlTID0ge1xuICBERUJVR19NT0RFOiBcIkJHX0RlYnVnXCIsXG4gIE9VVF9PRl9TQ09QRTogXCJCR19PdXRPZlNjb3BlXCIsXG4gIElTX0xBQkVMX1NFTlQ6IFwiQkdfTGFiZWxTZW50XCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAwXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVdGlsc1wiKTtcbmNvbnN0IG1vbnRocyA9IHtcbiAgXCJvY2FrXCI6IDAsXG4gIFwixZ91YmF0XCI6IDEsXG4gIFwibWFydFwiOiAyLFxuICBcIm5pc2FuXCI6IDMsXG4gIFwibWF5xLFzXCI6IDQsXG4gIFwiaGF6aXJhblwiOiA1LFxuICBcInRlbW11elwiOiA2LFxuICBcImHEn3VzdG9zXCI6IDcsXG4gIFwiZXlsw7xsXCI6IDgsXG4gIFwiZWtpbVwiOiA5LFxuICBcImthc8SxbVwiOiAxMCxcbiAgXCJhcmFsxLFrXCI6IDExLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50SGlkZSA9ICgpID0+IHtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbiAgLy8gVE9ETyByZW1vdmUgYWZ0ZXIgdGFnIGlzIHVwZGF0ZWRcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm5leHREYXktaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3QgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoUGx1cyhUUkVBVE1FTlRTX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudCB3ZWlnaHRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoUGx1cyhFX1JVTEVTX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBqc29uRWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGVsaWdpYmlsaXR5UnVsZXMuanNvbigpO1xuICAgIHJldHVybiBqc29uRWxpZ2liaWxpdHlSdWxlcztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCBlbGlnaWJpbGl0eSBydWxlc1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFByb2R1Y3RJbmZvID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBwcm9kdWN0IGluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBmZXRjaFBsdXMoUFJPRFVDVF9JTkZPX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb0NTViA9IGF3YWl0IHByb2R1Y3RJbmZvLnRleHQoKTtcbiAgICByZXR1cm4gY3N2VG9BcnJheShwcm9kdWN0SW5mb0NTVik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggcHJvZHVjdCBpbmZvXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSAqIDEwMDApO1xuICByZXR1cm4gY29udHJvbGxlcjtcbn07XG5cbmNvbnN0IGZldGNoUGx1cyA9ICh1cmwsIG9wdGlvbnMgPSB7c2lnbmFsOiB0aW1lb3V0KDUwMCkuc2lnbmFsfSwgcmV0cmllcyA9IDUpID0+XG4gIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLnN0YXR1cyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpKTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDb29raWVJZGVudGlmaWVyID0gKGNvb2tpZVN0cmluZywgY29va2llTmFtZSkgPT4ge1xuICBpZiAoIWNvb2tpZVN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gY29va2llU3RyaW5nXG4gICAgICAuc3BsaXQoXCI7XCIpXG4gICAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiPVwiKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICBpZiAodlswXSAmJiB2WzFdKSB7XG4gICAgICAgICAgYWNjW2RlY29kZVVSSUNvbXBvbmVudCh2WzBdLnRyaW0oKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZbMV0udHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gIGxldCBpZGVudGlmaWVyID0gcGFyc2VkW2Nvb2tpZU5hbWVdO1xuICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29va2llTmFtZSA9PT0gXCJfZ2FcIikge1xuICAgIC8vIGV4dHJhY3QgdW5pcXVlIGlkZW50aWZpZXIgZnJvbSBHQSBjb29raWVcbiAgICBjb25zdCBpZGVudGlmaWVySW5kZXggPSAyO1xuICAgIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyLnNwbGl0KFwiLlwiKVtpZGVudGlmaWVySW5kZXhdO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZVBjdCA9IGFzeW5jIChpZGVudGlmaWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgaGFzaCA9IGdldFVuc2VjdXJlSGFzaChpZGVudGlmaWVyKTtcbiAgICBpZiAoaGFzaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHBjdCA9IGhhc2ggJSAxMDA7XG4gICAgaWYgKHBjdCA+PSAwICYmIHBjdCA8IDEwMCkge1xuICAgICAgcmV0dXJuIHBjdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleGl0U2Nyb2xsTGlzdGVuZXIgPSAoY2FsbEJhY2spID0+IHtcbiAgY29uc3QgbG9vcCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKGxhc3RTY3JvbGxUb3AgLSA0MDAgPiBzY3JvbGxUb3ApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZXhpdFNjcm9sbEludGVydmFsKTtcbiAgICAgIGNhbGxCYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgfVxuICB9O1xuXG4gIGxldCBsYXN0U2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICBjb25zdCBleGl0U2Nyb2xsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChsb29wLCA1MDApO1xufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGFwcGx5IHRyZWF0bWVudHMgdG8gdGhlIHBhZ2Ugb24gc3BlY2lmaWMgbWVkaWEgdHlwZS5cbiAqIEBwYXJhbSB7TWVkaWFRdWVyeUxpc3R9IG1lZGlhUXVlcnlDb25kaXRpb24gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1MDBweClcIilcbiAqIEBwYXJhbSB7RE9NTm9kZUxpc3QgfSBlbGVtZW50cyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2LnByb2R1Y3RfaW5mb1wiKVxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlQ2hhbmdlc01hcCB7IFwibWFyZ2luLXRvcFwiIDogXCIxMHJlbVwifVxuICogQHJldHVybnNcbiAqL1xuXG5leHBvcnQgY29uc3Qgc3R5bGVBcHBsaWNhdG9yID0gKGVsZW1lbnRzLCBzdHlsZUNoYW5nZXNNYXApID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlIGNoYW5nZXNcIiwgc3R5bGVDaGFuZ2VzTWFwLCBcInRvIGVsZW1lbnRzXCIsIGVsZW1lbnRzKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzdHlsZUNoYW5nZXNNYXApKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbmplY3RTdHlsZVNoZWV0ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdHlsZVNoZWV0ID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgc3R5bGVTaGVldC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgc3R5bGVTaGVldC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICBzdHlsZVNoZWV0LmhyZWYgPSBTVFlMRVNIRUVUX0xPQ0FUSU9OO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUFjdGlvbnMgPSBhc3luYyAoaWRlbnRpZmllciwgYWN0aW9uc1RvUHJlcGFyZSwgYnVzaW5lc3NSdWxlSWQpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWN0aW9uc1RvUHJlcGFyZSkpO1xuICBsZXQgdmFyaWFudCA9IG51bGw7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7YnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zLCB2YXJpYW50c30gPSBhY3Rpb247XG4gICAgaWYgKCFidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMgJiYgIXZhcmlhbnRzKSBjb250aW51ZTtcbiAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhcmlhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhcmlhbnRLZXkgb2YgT2JqZWN0LmtleXModmFyaWFudHMpKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgdmFyaWFudEtleSk7XG4gICAgICAgIGlmIChyYW5kb21QY3QgPCBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgdmFyaWFudCA9IHZhcmlhbnRLZXk7XG4gICAgICAgICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIHZhcmlhbnRzW3ZhcmlhbnRLZXldLmJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIHZhcmlhbnRzW3ZhcmlhbnRLZXldLmJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcImlkXCIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgIT09IFwid2VpZ2h0XCIgJiYga2V5ICE9PSBcImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9uc1wiKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSB2YXJpYW50c1t2YXJpYW50S2V5XVtrZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbYWN0aW9ucywgdmFyaWFudF07XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUcsIFNFU1NJT05fVElNRVNUQU1QLCBTRVNTSU9OX0hJU1RPUll9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgcG9wdXBEaXNwbGF5RmxhZyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKTtcbiAgY29uc3Qgc2Vzc2lvblRpbWVzdGFtcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVApO1xuICBjb25zdCBzZXNzaW9uSGlzdG9yeSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9ISVNUT1JZKTtcblxuICBpZiAocG9wdXBEaXNwbGF5RmxhZyA9PT0gbnVsbCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAwKTtcbiAgfVxuICBpZiAoIXNlc3Npb25UaW1lc3RhbXApIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QLCBEYXRlLm5vdygpKTtcbiAgfVxuICBpZiAoIXNlc3Npb25IaXN0b3J5KSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVdKTtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgc2Vzc2lvbkhpc3RvcnldKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmRpdGlvbkNoZWNrZXIgPSAocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGlmIChjb25kaXRpb24gPT09IFwibm90RXhpc3RcIikge1xuICAgIGlmICghcnVuVGltZVZhbHVlKSB7XG4gICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8XG4gICAgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICBjb25kaXRpb24gPT09IG51bGwgfHxcbiAgICBjb25kaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBydW5UaW1lVmFsdWUgb3IgY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKGNvbmRpdGlvbikge1xuICAgIGNhc2UgXCJleGlzdFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJpbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJjb250YWluc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90SW5jbHVkZXNcIjpcbiAgICBjYXNlIFwibm90Q29udGFpbnNcIjpcbiAgICAgIGlmICghcnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJlcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RFcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDw9IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJiZXR3ZWVuXCI6IHtcbiAgICAgIGxldCBbbWluLCBtYXhdID0gdmFsdWUuc3BsaXQoXCIsXCIpO1xuICAgICAgbWluID0gcGFyc2VJbnQobWluKTtcbiAgICAgIG1heCA9IHBhcnNlSW50KG1heCk7XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IG1pbiAmJiBydW5UaW1lVmFsdWUgPD0gbWF4KSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNhc2UgXCJyZWdleFwiOiB7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsdWUsIFwiaVwiKTtcbiAgICAgIHJldHVybiByZWdleC50ZXN0KHJ1blRpbWVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkIFwiLCBjb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGVidWdNb2RlID0gKG9vc1JlYXNvbikgPT4ge1xuICBjb25zdCB7REVCVUdfTU9ERSwgT1VUX09GX1NDT1BFfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz1cIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oT1VUX09GX1NDT1BFLCBvb3NSZWFzb24pO1xuICB9XG5cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAxKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAxO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTJcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMjtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0wXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKERFQlVHX01PREUpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IGN1cnJlbnQgPSBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oREVCVUdfTU9ERSkpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCAoY3VycmVudCA/IFwib25cIiA6IFwib2ZmXCIpKTtcbiAgcmV0dXJuIChjdXJyZW50IHx8IDApO1xufTtcblxuLy8gZ2V0IEdBIGNsaWVudCBpZCB1c2luZyBnYS5nZXRBbGwoKVxuZXhwb3J0IGNvbnN0IGdldEdhQ2xpZW50SWQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhID0gd2luZG93LmdhO1xuICAvLyBpZiBnYSBhbmQgZ2EuZ2V0QWxsKCkgaXMgbm90IGRlZmluZWQsIHJldHVybiBudWxsXG4gIGlmIChnYSAmJiBnYS5nZXRBbGwpIHtcbiAgICBjb25zdCB0cmFja2VycyA9IGdhLmdldEFsbCgpO1xuICAgIGlmICh0cmFja2VycyAmJiB0cmFja2Vycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cmFja2Vyc1swXS5nZXQoXCJjbGllbnRJZFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBnZXQgZGV0ZXJtaW5pc3RpYyBudW1lcmljIGhhc2ggZnJvbSBzdHJpbmcgdGhhdCBjb25hdGlucyBvbmx5IG51bWJlcnNcbmV4cG9ydCBjb25zdCBnZXRVbnNlY3VyZUhhc2ggPSAoc3RyKSA9PiB7XG4gIGxldCBoYXNoID0gMDtcbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgfVxuICAvLyByZXR1cm4gYWJzb2x1dGUgdmFsdWVcbiAgcmV0dXJuIE1hdGguYWJzKGhhc2gpO1xufTtcblxuLy8gZ2VuZXJhdGUgYSAzMi1iaXQgcmFuZG9tIGludGVnZXJcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCk7XG59O1xuXG4vLyBnZXQgY3VycmVudCB1bml4IGVwb2NoIHRpbWUgaW4gc2Vjb25kc1xuZXhwb3J0IGNvbnN0IGdldFVuaXhUaW1lID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZXRJZGVudGlmaWVyID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGlkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lEKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGxvY2FsIHN0b3JhZ2VcIiwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYSBpbiBmaXJzdCBhdHRlbXB0XCIsIGlkKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHRyYWN0SWRlbnRpZmllckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYVwiLCBpZCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCByZWFkIEdBIGNsaWVudCBpZFwiKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCA1MDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgaW4gZ2V0SWRlbnRpZmllclwiLCBlKTtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxheSA9IChtcykgPT4gbmV3IFByb21pc2UoKHJlcykgPT4gc2V0VGltZW91dChyZXMsIG1zKSk7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREZWxpdmVyeURhdGUgPSAoZGF0ZSkgPT4ge1xuICBpZiAoIWRhdGUgfHwgdHlwZW9mIGRhdGUgIT09IFwic3RyaW5nXCIpIHJldHVybiBkYXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBzdGFydE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBlbmRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgc3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICBlbmREYXk6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBsZXQgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKS0oW1xcXFxkXSspXFxcXHM/KFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA9PT0gNCkge1xuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbM10udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSByZXN1bHQuc3RhcnRNb250aEluZGV4O1xuICB9IGVsc2Uge1xuICAgIG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspLShbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gubGVuZ3RoICE9PSA1KSByZXR1cm4gZGF0ZTtcblxuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzJdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbNF0udG9Mb3dlckNhc2UoKV07XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIGlmICghcmVzdWx0LnN0YXJ0TW9udGhJbmRleCB8fCAhcmVzdWx0LmVuZE1vbnRoSW5kZXgpIHJldHVybiBkYXRlO1xuXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuICAgIGNvbnN0IGVuZFllYXIgPSByZXN1bHQuZW5kTW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuXG4gICAgY29uc3QgZXN0aW1hdGVkU3RhcnQgPSBuZXcgRGF0ZShzdGFydFllYXIsIHJlc3VsdC5zdGFydE1vbnRoSW5kZXgsIHJlc3VsdC5zdGFydERheSk7XG4gICAgY29uc3QgZXN0aW1hdGVkRW5kID0gbmV3IERhdGUoZW5kWWVhciwgcmVzdWx0LmVuZE1vbnRoSW5kZXgsIHJlc3VsdC5lbmREYXkpO1xuXG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRTdGFydCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZEVuZCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyV2Vla3MgPSBzdGFydERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKHN0YXJ0RGlmZk92ZXJEYXlzIC8gNyk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJXZWVrcyA9IGVuZERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKGVuZERpZmZPdmVyRGF5cyAvIDcpO1xuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID09PSAwKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IC0gJHtlbmREaWZmT3ZlckRheXN9IEfDvG5gO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA+PSAxKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IEfDvG4gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSBlbmREaWZmT3ZlcldlZWtzKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpZGxlVGltZXIgPSBhc3luYyAodGltZU91dCwgY2FsbEJhY2spID0+IHtcbiAgbGV0IGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG5cbiAgd2luZG93LnRvcC5kb2N1bWVudC5vbnRvdWNoc3RhcnQgPSByZXNldFRpbWVyO1xuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0KTtcbiAgICBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlclR5cGUgPSAoKSA9PiB7XG4gIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvY2hyb21lfGNocm9taXVtfGNyaW9zL2kpKSB7XG4gICAgcmV0dXJuIFwiY2hyb21lXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9maXJlZm94fGZ4aW9zL2kpKSB7XG4gICAgcmV0dXJuIFwiZmlyZWZveFwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvc2FmYXJpL2kpKSB7XG4gICAgcmV0dXJuIFwic2FmYXJpXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9vcHJcXC8vaSkpIHtcbiAgICByZXR1cm4gXCJvcGVyYVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvZWRnL2kpKSB7XG4gICAgcmV0dXJuIFwiZWRnZVwiO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgaXNPd25NdXRhdGlvbiA9IChtdXRhdGlvbkxpc3QpID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBbLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0uYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLnJlbW92ZWROb2RlcyldO1xuICByZXR1cm4gbm9kZXMuc29tZSgobikgPT4ge1xuICAgIHJldHVybiBuLnRhZ05hbWUgJiYgQXJyYXkuZnJvbShuLmNsYXNzTGlzdCkuc29tZSgoYykgPT4gYy5pbmNsdWRlcyhcImJuLVwiKSk7XG4gIH0pO1xufTtcblxuLy8gcmVmOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMjkzMTYzLzIzNDNcbi8vIFRoaXMgd2lsbCBwYXJzZSBhIGRlbGltaXRlZCBzdHJpbmcgaW50byBhbiBhcnJheSBvZlxuLy8gYXJyYXlzLiBUaGUgZGVmYXVsdCBkZWxpbWl0ZXIgaXMgdGhlIGNvbW1hLCBidXQgdGhpc1xuLy8gY2FuIGJlIG92ZXJyaWRlbiBpbiB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuZnVuY3Rpb24gY3N2VG9BcnJheSggc3RyRGF0YSwgc3RyRGVsaW1pdGVyICkge1xuICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGRlbGltaXRlciBpcyBkZWZpbmVkLiBJZiBub3QsXG4gIC8vIHRoZW4gZGVmYXVsdCB0byBjb21tYS5cbiAgc3RyRGVsaW1pdGVyID0gKHN0ckRlbGltaXRlciB8fCBcIixcIik7XG5cbiAgLy8gQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHBhcnNlIHRoZSBDU1YgdmFsdWVzLlxuICBjb25zdCBvYmpQYXR0ZXJuID0gbmV3IFJlZ0V4cChcbiAgICAgIChcbiAgICAgIC8vIERlbGltaXRlcnMuXG4gICAgICAgIFwiKFxcXFxcIiArIHN0ckRlbGltaXRlciArIFwifFxcXFxyP1xcXFxufFxcXFxyfF4pXCIgK1xuXG4gICAgICAgICAgICAgIC8vIFF1b3RlZCBmaWVsZHMuXG4gICAgICAgICAgICAgIFwiKD86XFxcIihbXlxcXCJdKig/OlxcXCJcXFwiW15cXFwiXSopKilcXFwifFwiICtcblxuICAgICAgICAgICAgICAvLyBTdGFuZGFyZCBmaWVsZHMuXG4gICAgICAgICAgICAgIFwiKFteXFxcIlxcXFxcIiArIHN0ckRlbGltaXRlciArIFwiXFxcXHJcXFxcbl0qKSlcIlxuICAgICAgKSxcbiAgICAgIFwiZ2lcIixcbiAgKTtcblxuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBkYXRhLiBHaXZlIHRoZSBhcnJheVxuICAvLyBhIGRlZmF1bHQgZW1wdHkgZmlyc3Qgcm93LlxuICBjb25zdCBhcnJEYXRhID0gW1tdXTtcblxuICAvLyBDcmVhdGUgYW4gYXJyYXkgdG8gaG9sZCBvdXIgaW5kaXZpZHVhbCBwYXR0ZXJuXG4gIC8vIG1hdGNoaW5nIGdyb3Vwcy5cbiAgbGV0IGFyck1hdGNoZXMgPSBudWxsO1xuXG5cbiAgLy8gS2VlcCBsb29waW5nIG92ZXIgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXRjaGVzXG4gIC8vIHVudGlsIHdlIGNhbiBubyBsb25nZXIgZmluZCBhIG1hdGNoLlxuICB3aGlsZSAoYXJyTWF0Y2hlcyA9IG9ialBhdHRlcm4uZXhlYyggc3RyRGF0YSApKSB7XG4gICAgLy8gR2V0IHRoZSBkZWxpbWl0ZXIgdGhhdCB3YXMgZm91bmQuXG4gICAgY29uc3Qgc3RyTWF0Y2hlZERlbGltaXRlciA9IGFyck1hdGNoZXNbMV07XG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGdpdmVuIGRlbGltaXRlciBoYXMgYSBsZW5ndGhcbiAgICAvLyAoaXMgbm90IHRoZSBzdGFydCBvZiBzdHJpbmcpIGFuZCBpZiBpdCBtYXRjaGVzXG4gICAgLy8gZmllbGQgZGVsaW1pdGVyLiBJZiBpZCBkb2VzIG5vdCwgdGhlbiB3ZSBrbm93XG4gICAgLy8gdGhhdCB0aGlzIGRlbGltaXRlciBpcyBhIHJvdyBkZWxpbWl0ZXIuXG4gICAgaWYgKFxuICAgICAgc3RyTWF0Y2hlZERlbGltaXRlci5sZW5ndGggJiZcbiAgICAgICAgICAgICAgc3RyTWF0Y2hlZERlbGltaXRlciAhPT0gc3RyRGVsaW1pdGVyXG4gICAgKSB7XG4gICAgICAvLyBTaW5jZSB3ZSBoYXZlIHJlYWNoZWQgYSBuZXcgcm93IG9mIGRhdGEsXG4gICAgICAvLyBhZGQgYW4gZW1wdHkgcm93IHRvIG91ciBkYXRhIGFycmF5LlxuICAgICAgYXJyRGF0YS5wdXNoKCBbXSApO1xuICAgIH1cblxuICAgIGxldCBzdHJNYXRjaGVkVmFsdWU7XG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIG91ciBkZWxpbWl0ZXIgb3V0IG9mIHRoZSB3YXksXG4gICAgLy8gbGV0J3MgY2hlY2sgdG8gc2VlIHdoaWNoIGtpbmQgb2YgdmFsdWUgd2VcbiAgICAvLyBjYXB0dXJlZCAocXVvdGVkIG9yIHVucXVvdGVkKS5cbiAgICBpZiAoYXJyTWF0Y2hlc1syXSkge1xuICAgICAgLy8gV2UgZm91bmQgYSBxdW90ZWQgdmFsdWUuIFdoZW4gd2UgY2FwdHVyZVxuICAgICAgLy8gdGhpcyB2YWx1ZSwgdW5lc2NhcGUgYW55IGRvdWJsZSBxdW90ZXMuXG4gICAgICBzdHJNYXRjaGVkVmFsdWUgPSBhcnJNYXRjaGVzWzJdLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cCggXCJcXFwiXFxcIlwiLCBcImdcIiApLFxuICAgICAgICAgIFwiXFxcIlwiLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgZm91bmQgYSBub24tcXVvdGVkIHZhbHVlLlxuICAgICAgc3RyTWF0Y2hlZFZhbHVlID0gYXJyTWF0Y2hlc1szXTtcbiAgICB9XG5cblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIHZhbHVlIHN0cmluZywgbGV0J3MgYWRkXG4gICAgLy8gaXQgdG8gdGhlIGRhdGEgYXJyYXkuXG4gICAgYXJyRGF0YVthcnJEYXRhLmxlbmd0aCAtIDFdLnB1c2goIHN0ck1hdGNoZWRWYWx1ZSApO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBwYXJzZWQgZGF0YS5cbiAgcmV0dXJuICggYXJyRGF0YSApO1xufVxuIiwiY29uc3QgY29uZmlnID0ge1xuICBkYk5hbWU6IFwiYmVhZ2xlXCIsXG4gIHZlcnNpb246IDEsXG4gIG1haW50ZW5hbmNlT3BlcmF0aW9uQ291bnQ6IDEwMDAsIC8vIGFmZmVjdHMgdmVyc2lvblxuICBzdG9yZToge1xuICAgIG5hbWU6IFwiZGF0YVwiLFxuICAgIGluZGV4ZXM6IFt7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX3Nlc3Npb25cIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwic2Vzc2lvbl9pZFwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZVwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJkYXRhX3ZhbHVlXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlX3Nlc3Npb25cIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwiZGF0YV92YWx1ZVwiLCBcInNlc3Npb25faWRcIl0sXG4gICAgfV0sXG4gICAgb3B0aW9uczoge2tleVBhdGg6IFwiaWRcIiwgYXV0b0luY3JlbWVudDogdHJ1ZX0sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHtnZXRCcm93c2VyVHlwZX0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZURhdGFDb2xsZWN0aW9uV3JhcHBlclwiKTtcbmNvbnN0IF93aW5kb3cgPSB7XG4gIGFsbHRpbWU6IFwiYWxsdGltZVwiLCBzZXNzaW9uOiBcInNlc3Npb25cIixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlYWdsZURhdGFDb2xsZWN0aW9uV3JhcHBlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kZXhlZERCID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGluaXRpYWxpemVkIGRiIHdpdGg6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICAvLyBUT0RPLCB1bmNvbW1lbnQgbmV4dCBsaW5lIG9uY2UgZXhpc3Rpbmcgc3RhbGUgZGJzIGFyZSBwdXJnZWRcbiAgICAvLyBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy50b3AuaW5kZXhlZERCPy5vcGVuKGNvbmZpZy5kYk5hbWUsIGNvbmZpZy52ZXJzaW9uKTtcbiAgICBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy50b3AuaW5kZXhlZERCPy5vcGVuKGNvbmZpZy5kYk5hbWUpO1xuICAgIGlmICghb3BlblJlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImluZGV4ZWRkYiBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3BlblJlcXVlc3QucmVzdWx0LmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdG9yZSA9IG9wZW5SZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgaW5kZXhlZCBEQlwiLCBvcGVuUmVxdWVzdC5lcnJvcik7XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRiID0gb3BlblJlcXVlc3QucmVzdWx0O1xuICAgICAgaWYgKGRiLnZlcnNpb24gIT09IDEpIHtcbiAgICAgICAgLy8gVE9ETywgcmVtb3ZlIGRlbGV0ZSByZXF1ZXN0IG9uY2UgZXhpc3Rpbmcgc3RhbGUgZGJzIGFyZSBwdXJnZWRcbiAgICAgICAgY29uc3QgZGVsZXRlUmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoY29uZmlnLmRiTmFtZSk7XG4gICAgICAgIGRlbGV0ZVJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHRoaXMuaW5kZXhlZERCID0gZGI7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShkYXRhTmFtZSwgZGF0YVZhbHVlKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmluaXRUcmFuc2FjdGlvbih0cnVlKTtcbiAgICBjb25zdCBzZXNzaW9uSWQgPSB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKTsgLy8gZGF0ZSBjdXJyZW50IC0yIHNhYXQgIHlpbC1heS1ndW5cbiAgICBjb25zdCB0aW1lID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG5cbiAgICBjb25zdCBwYXlsb2FkID0ge1wiZGF0YV9uYW1lXCI6IGRhdGFOYW1lLCBcImRhdGFfdmFsdWVcIjogZGF0YVZhbHVlLCBcInNlc3Npb25faWRcIjogc2Vzc2lvbklkLCB0aW1lfTtcbiAgICBzdG9yZS5wdXQocGF5bG9hZCk7XG4gIH1cblxuICBtaW5tYXgoZGF0YU5hbWUsIG9wLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHN0b3JlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RvcmVkID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAob3AgPT09IFwibWluXCIgJiYgdmFsdWVbXCJkYXRhX3ZhbHVlXCJdIDwgc3RvcmVkKSB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtYXhcIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPiBzdG9yZWQpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0b3JlZCA9IHZhbHVlW1wiZGF0YV92YWx1ZVwiXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShzdG9yZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbWluKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy5taW5tYXgoZGF0YU5hbWUsIFwibWluXCIsIHdpbmRvdyk7XG4gIH1cblxuICBtYXgoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtYXhcIiwgd2luZG93KTtcbiAgfVxuXG4gIGdyb3VwQnkoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKCFtYXAuaGFzKHZhbHVlW1wiZGF0YV92YWx1ZVwiXSkpIG1hcC5zZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdLCAwKTtcbiAgICAgICAgICAgICAgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIG1hcC5nZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShtYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbW9kZShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBpZiAoZGF0YS5rZXlzKCkubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IG1heCA9IHtuYW1lOiB1bmRlZmluZWQsIHZhbHVlOiAtMX07XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBpZiAobWF4LnZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbWF4Lm5hbWUgPSBrZXk7XG4gICAgICAgIG1heC52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXg7XG4gIH1cblxuICBjb3VudChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1bShkYXRhTmFtZSwgd2luZG93ID0gXCJhbGx0aW1lXCIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHRvdGFsID0gMC4wMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICB0b3RhbCArPSBwYXJzZUZsb2F0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHRvdGFsLnRvRml4ZWQoMikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lLCBkYXRhVmFsdWUgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZGF0YVZhbHVlKSB7XG4gICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlX3Nlc3Npb25cIilcbiAgICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZVwiKVxuICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWVdKSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXhWYWx1ZSA9IGdldEJyb3dzZXJUeXBlKCkgPT09IFwic2FmYXJpXCIgPyBkYXRhTmFtZSA6IFtkYXRhTmFtZV07XG5cbiAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZVwiKVxuICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KGluZGV4VmFsdWUpKTtcbiAgfVxuXG4gIGFzeW5jIGF2ZyhkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgdG90YWwgPSBhd2FpdCB0aGlzLnN1bShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMuY291bnQoZGF0YU5hbWUsIHdpbmRvdyk7XG5cbiAgICBpZiAoIXRvdGFsIHx8ICFjb3VudCkgcmV0dXJuIDA7XG5cbiAgICByZXR1cm4gKHRvdGFsIC8gY291bnQpLnRvRml4ZWQoMik7XG4gIH1cblxuICBhc3luYyBsYXN0KGRhdGFOYW1lLCBzaXplID0gMSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpLm9wZW5DdXJzb3IoW2RhdGFOYW1lXSwgXCJwcmV2XCIpO1xuICAgICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgICBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAgICAgLm9wZW5DdXJzb3IoW2RhdGFOYW1lLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKV0sIFwicHJldlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBjdXJzb3Iub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChyZXN1bHQgJiYgaW5kZXggPCBzaXplKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50U2Vzc2lvbklkKCkge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0SG91cnMoZC5nZXRIb3VycygpIC0gMik7XG5cbiAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpICsgXCItXCIgK1xuICAgICAgKGQuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCItXCIgK1xuICAgICAgZC5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBDb2xsZWN0b3JBcGkgZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uL2FwaVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvblwiKTtcbmNvbnN0IGNvbGxlY3RvckFwaSA9IG5ldyBDb2xsZWN0b3JBcGkoKTtcblxuLy8ga2VlcCBhIHRhYmxlIGluIGluZGV4ZGIgdGhlIGZvcm1hdCBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCBzdG9yZWRfdmFsdWVdXG5cbmV4cG9ydCBjb25zdCBxdWVyeUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdykgPT4ge1xuICBsb2dnZXIubG9nKFwicXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gd2luZG93IGNhbiBiZSBlaXRoZXIgc2FtZWRheSBvciBhbGx0aW1lXG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1pblwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1pbihiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtYXhcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5tYXgoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiYXZnXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkuYXZnKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImNkXCIpIHtcbiAgICByZXR1cm4gKGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KSkuc2l6ZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjdlwiKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcblxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBbLCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgY291bnQgKz0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtb2RlXCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLm1vZGUoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGRhdGEubmFtZTtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZC5pbmRleE9mKFwibGFzdFwiKSA+PSAwKSB7XG4gICAgY29uc3QgbWF0Y2ggPSBxdWVyeU1ldGhvZC5tYXRjaChcImxhc3RcXFxcKChbXFxcXGRdKylcXFxcKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaC5sZW5ndGggPT09IDIgfHwgcGFyc2VJbnQobWF0Y2hbMV0pIDwgMSApIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5sYXN0KGJhc2VGZWF0dXJlTmFtZSwgbWF0Y2hbMV0sIHdpbmRvdyk7XG4gICAgY29uc3QgZGF0YVZhbHVlcyA9IHF1ZXJ5UHJvbWlzZS5tYXAoKG9iaikgPT4gb2JqLmRhdGFfdmFsdWUpO1xuICAgIHJldHVybiBkYXRhVmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAge1wiTGlzdGluZ3BhZ2VcIiA9PiAyMX1cbiAgICB7XCJIb21lcGFnZVwiID0+IDEyfVxuICAgIC0tIGV4YW1wbGUgd2lsbCBoYXZlOlxuICAgIG1vZGU6IExpc3RpbmdwYWdlXG4gICAgY2Q6IDJcbiAgICBjdjogMjErMTJcbiAgICBsYXN0KDMpIChuLCBuLTEsIG4tMilcbiAgKi9cblxuICAvLyAxMDAwbGlrIHRlbWl6bGVuZWNlayAobWFpbnRPcENvdW50IC0+IHZlcnNpb24pXG5cbiAgLy8gcXVlcnlNZXRob2QgY2FuIGJlIFwibW9kZVwiLCBcImNkXCIgKGNvdW50IGRpc3RpbnQpIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlc1xuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJjdlwiIChzdW0gb2YgY291bnQgdmFsdWVzKSwgXCJjdXJyZW50XCIsIG9yIFwicHJldlwiIGZvciBhbnkgZGF0YSB0eXBlIChzdG9yZWQgdmlhIGxhc3QpXG4gIGxvZ2dlci5mYWlsZWQoYHVua25vd24gcXVlcnlNZXRob2Q9JHtxdWVyeU1ldGhvZH0gaW4gQmVhZ2xlRGF0YUNvbGxlY3Rpb25gKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpID0+IHtcbiAgbG9nZ2VyLmxvZyhcInVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKTtcbiAgaWYgKCFjb2xsZWN0b3JBcGkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiSW5kZXhlZERCIG5vIHN1cHBvcnRlZC9Jbml0aWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGF3YWl0IGNvbGxlY3RvckFwaS5zYXZlKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG5cblxuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwibWluXCIsIFwibWF4XCIsIFwiY250XCIsIFwic3VtXCIgZm9yIG51bWVyaWMgZGF0YSB0eXBlcywgbWluLW1heCBjb21wYXJlcyB3aXRoIG9ubHkgZXhpc3RpbmcsIGF2ZyB1cGRhdGVzIGNudCBhbmQgc3VtXG4gIC8vIC0tPiBtaW46IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwibWluXCIsIChsZWFzdCBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IG1heDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtYXhcIiwgKGdyZWF0ZXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gc3VtOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInN1bVwiLCAoc3VtIG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gY250OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImNudFwiLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImNvdW50X3ZhbHVlc1wiIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlcywga2VlcCBhIGNvdW50ZXIgZm9yIGVhY2ggdmFsdWVcbiAgLy8gLS0+IGNvdW50X3ZhbHVlczogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgZGF0YV92YWx1ZSwgKGV4aXN0aW5nICsgMSldXG4gIC8vXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJsYXN0XCIgZm9yIGFueSBkYXRhIHR5cGUgLS0+IGtlZXBzIDIgdmFsdWVzIGZvciBjdXJyZW50IGFuZCB0aGUgcHJldmlvdXNcbiAgLy8gZGVsZXRlOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gbW92ZTogZXhpc3RpbmcgW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjdXJyZW50XCIsIChleGlzdGluZyB2YWx1ZSldIC0tPiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gcHV0OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGluY29taW5nIHN0b3JlZF92YWx1ZSldXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtmb3JtYXREZWxpdmVyeURhdGUsIGlzT3duTXV0YXRpb259IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZUywgU1BMSVRfUkFUSU8sIFZFUlNJT059IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7cXVlcnlJbkNvbGxlY3RvciwgdXBkYXRlSW5Db2xsZWN0b3J9IGZyb20gXCIuLi9CZWFnbGVEYXRhQ29sbGVjdGlvblwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbndpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgPSB3aW5kb3cuYmVhZ2xlSW5mb0xheWVyIHx8IHtcbiAgYToge30sIGU6IHt9LCBmOiB7fSwgX19od206IDAsXG59O1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyXCIpO1xuXG4vLyBUT0RPOiBjb252ZXJ0IHRvIG5hbWUgLS0+IGFycmF5IG9mIHNlbGVjdG9yc1xuY29uc3Qgc2VhcmNoUGF0aHMgPSBbXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR0EgRGF0YSBMYXllciBRdWVyaWVzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQYWdlVHlwZVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwZHAuZ3JvdXBcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jbGFzc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBkcC5za3VcIiwgZm9ybWF0dGVyOiBcInVwcGVyQ2FzZVRSXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlByb2R1Y3RJRFwiLCBuYW1lOiBcInBkcC5za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UuZGV0YWlsLmFjdGlvbkZpZWxkLmxpc3RcIiwgbmFtZTogXCJwZHAubGlzdGFsaWFzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLnNrdVwiLCBuYW1lOiBcInBkcC5za3VcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZGlzY291bnRSYXRlXCIsIG5hbWU6IFwicGRwLmRpc2NvdW50UmF0ZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5mYXN0RGVsaXZlcnlcIiwgbmFtZTogXCJwZHAuZmFzdERlbGl2ZXJ5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmlzSW5TaG93cm9vbVwiLCBuYW1lOiBcInBkcC5pc0luU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJzZWFyY2hfc3VjY2Vzc1wiLCBuYW1lOiBcInBscC5zZWFyY2hTdWNjZXNzXCIsIGV4Y2x1c2l2ZTogW1wicGxwLmlkXCIsIFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgXCJwbHAubmFtZVwiLCBcInBscC5ncm91cFwiLCBcInBscC5jbGFzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwbHAuaWRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY2F0ZWdvcnlfcHJvZHVjdF9jb3VudFwiLCBuYW1lOiBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBscC5ncm91cFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGxwLmNsYXNzXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLnByaWNlXCIsIG5hbWU6IFwicHVyY2hhc2UucHJpY2VzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLnF1YW50aXR5XCIsIG5hbWU6IFwicHVyY2hhc2UucXVhbnRpdGllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInB1cmNoYXNlLmNhdGVnb3JpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uub3JkZXJJZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQucmV2ZW51ZVwiLCBuYW1lOiBcInB1cmNoYXNlLnJldmVudWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLmRpbWVuc2lvbjE1XCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBEb2N1bWVudCBRdWVyaWVzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwYWdlX3ByZXZpZXdfd3JhcHBlcl9wcm9kdWN0aW9uXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJIb21lcGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhdGVnb3J5X3BhZ2Vfd3JhcHBlclxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiTGlzdGluZ3BhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LW1haW4tZGV0YWlsc1xcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIndlbGNvbWVfdXNlcm5hbWVcXFwiXVwiLCBuYW1lOiBcInZpZXcuaXNMb2dnZWRJblwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImVtcHR5X2Jhc2tldF90ZXh0XFxcIl1cIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJib2R5ID4gLmRlc2t0b3BfbGF5b3V0X3dyYXBwZXIgLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3B1b25Ob3RBcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3RvdGFsX3ByaWNlXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbaWQqPVxcXCJjYXJ0X3F1YW50aXR5XFxcIl0sIFtjbGFzcyo9XFxcImJhc2tldF9sZW5ndGhcXFwiXVwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZUZvcm1hdHRlZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJmb3JtYXREZWxpdmVyeURhdGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC10aXRsZVxcXCJdLCBbY2xhc3MqPVxcXCJoZWFkZXItYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInZpdmVuc2Utc2hvd3Jvb21zXFxcIl0gPiAqXCIsIG5hbWU6IFwicGRwLnNob3dyb29tY291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUNvdW50RWx0c1wiLCBleGNsdXNpdmU6IFtcInBkcC5oYXNOb1Nob3dyb29tc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI3ZpdmVuc2Utc2hvd3Jvb20tdGFiIHA6bm90KC52aXZlbnNlLXNob3dyb29tcylcIiwgbmFtZTogXCJwZHAuaGFzTm9TaG93cm9vbXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcInBkcC5zaG93cm9vbWNvdW50XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNvdW50LW9mLXByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwic3ViY2F0ZWdvcmllcy10aXRsZVxcXCJdXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1jYXJkW2RhdGEtcHJvZHVjdC1za3VdXCIsIG5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcm9kdWN0LXNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1saXN0XCIsIG9ic2VydmVyOiBcImxpc3RpbmdJdGVtQmxvY2tcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuZW1wdHktY2FydC1jb250YWluZXIsIC5lbXB0eS1jYXJ0XCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuYnJhY2tldC10ZXh0LCAucHJvZHVjdC1jb3VudFwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydEl0ZW1RdWFudGl0eVwiLCBuYW1lOiBcImNhcnQucXVhbnRpdGllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJldmlvdXNcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjYmlsbF90b3RhbFwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyLWZpbmFsLW51bWJlclxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXJ0LXByaWNlXFxcIl0gLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3Vwb25BcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5jYXRlZ29yaWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1sYXN0LWJyZWFkY3J1bWJcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnByaWNlc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJpY2VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICAvLyBEZXNrdG9wIG9ic2VydmVyIGZvciB0aGUgcmlnaHQgcGFuZWwsIGFzIGl0IGlzIHRoZSBvbmUgY2hhbmdpbmdcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtcmlnaHQtY29udGFpbmVyXCIsIG9ic2VydmVyOiBcImNoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAgLy8gTW9iaWxlIG9ic2VydmVyIGZvciB0aGUgZnVsbCBmb3JtIGJsb2NrIGFzIGl0IGlzIGNvbXBsZXRlbHkgcmVwbGFjZWRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI2NoZWNrb3V0Rm9ybVwiLCBvYnNlcnZlcjogXCJjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfc3VtbWFyeV90b3RhbFxcXCJdLCBbY2xhc3MqPVxcXCJ0b3RhbF9yb3dcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnJldmVudWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXJfZm9sbG93X251bWJcXFwiXSwgW2NsYXNzKj1cXFwiY2FydC10aXRsZS1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnZ2c1R4bklkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnBheW1lbnRfdHlwZV90aXRsZSwgLmNhcnQtdGl0bGUtaW5mb1wiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3Rfc2t1X2NvZGVcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXNrdVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFNPUkcgRWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcInNrdVwiLCBuYW1lOiBcInBkcC5za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtcG5cIiwgbmFtZTogXCJwZHAubXBuXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiSlNPTkZpbHRlck90aGVyXCIsIHZhbHVlOiBcIkB0eXBlPVByb2R1Y3RcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJvZmZlcnMucHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJvZmZlcnMucHJpY2VWYWxpZFVudGlsXCIsIG5hbWU6IFwicGRwLnByaWNlVmFsaWRVbnRpbFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIml0ZW1MaXN0RWxlbWVudC4qLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5udW1iZXJPZkl0ZW1zXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcImJyZWFkY3J1bWIuaXRlbUxpc3RFbGVtZW50LiouaXRlbS5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gV2luZG93IGN1c3RvbSBlbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiZmF2b3JpdGVQcm9kdWN0c1wiLCBuYW1lOiBcInZpZXcuZmF2b3JpdGVkTVBOc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCIsIGZvcm1hdHRlcjogXCJ0b1N0cmluZ1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcbl07XG5cbmNvbnN0IGZlYXR1cmVFbmdpbmVlcmluZ09wcyA9IHtcbiAgXCJ2aWV3X2Vwb2NoXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcIm1pblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibWluXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3Rvcnkudmlld19lcG9jaF9taW5cIn0sXG4gIF0sXG4gIFwiUGFnZVR5cGVcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwiY291bnRfdmFsdWVzXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJjdlwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X3Nlc3Npb25cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImN2XCIsIHdpbmRvdzogXCJhbGx0aW1lXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfYWxsdGltZVwifSxcbiAgXSxcbiAgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLmxhc3RDYXJ0Q291cG9uQXBwbGljYWJsZVwifSxcbiAgXSxcbiAgXCJwZHAuY2F0ZWdvcnlcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwiY291bnRfdmFsdWVzXCJ9LFxuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibW9kZVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9tb2RlX3Nlc3Npb25cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbGFzdF9zZXNzaW9uXCJ9LFxuICBdLFxuICBcImNhcnQuc2t1c1wiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCJ9LFxuICBdLFxufTtcblxuZXhwb3J0IGNvbnN0IGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNID0gKCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5mb0xheWVyLl9faHdtICs9IDE7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVG9CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIGlmIHZhbHVlIGlzIHN0cmluZywgYWRkIGFzIGEgY2xlYW4gc3RyaW5nLCBpZiBvYmplY3QgYWRkIHRoZSBzYW1lXG4gIGNvbnN0IHR5cGVkVmFsdWUgPSB0eXBlb2YgKHZhbHVlKSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpIDogdmFsdWU7XG4gIC8vIGlmIGtleSBjb250YWlucyAuIGNyZWF0ZSBuZXN0ZWQgb2JqZWN0XG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIG9ialtrZXldID0ge307XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBvYmpbbGFzdEtleV0gPSB0eXBlZFZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGluZm9MYXllcltrZXldID0gdHlwZWRWYWx1ZTtcbiAgfVxuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgaWYgKHR5cGVkVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlZFZhbHVlICE9PSBudWxsKSB7XG4gICAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIHR5cGVkVmFsdWUpO1xuICAgIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgdHlwZWRWYWx1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IERBVEFfTElTVEVORVJTID0ge307XG5cbmV4cG9ydCBjb25zdCBhZGREYXRhTGlzdGVuZXIgPSAoa2V5LCBsaXN0ZW5lcikgPT4ge1xuICBpZiAoIURBVEFfTElTVEVORVJTW2tleV0pIHtcbiAgICBEQVRBX0xJU1RFTkVSU1trZXldID0gW107XG4gIH1cbiAgREFUQV9MSVNURU5FUlNba2V5XS5wdXNoKGxpc3RlbmVyKTtcbn07XG5cbmNvbnN0IHBhc3NWYWx1ZVRvTGlzdGVuZXJzID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgbGlzdGVuZXJzID0gREFUQV9MSVNURU5FUlNba2V5XTtcbiAgaWYgKGxpc3RlbmVycyAmJiBBcnJheS5pc0FycmF5KGxpc3RlbmVycykgJiYgbGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgLS0+IHZhbHVlICR7dmFsdWV9IHRvIGxpc3RlbmVyICR7aX0gb2Yga2V5ICR7a2V5fWApO1xuICAgICAgICBsaXN0ZW5lcih2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RnJvbUJlYWdsZUluZm9MYXllciA9IChrZXksIGJsb2NraW5nID0gZmFsc2UsIHBvbGxJbnRlcnZhbCA9IDUwLCB0aW1lb3V0ID0gMTAwMDApID0+IHtcbiAgLy8gVE9ETzogY2hlY2sgZmVhdHVyZUVuZ2luZWVyaW5nIGFuZCBzZWFyY2ggbGlzdCBpZiBhbGwgbWFya2VkIGFzIGZvdW5kIGJ1dCB2YWx1ZSBpcyBtaXNzaW5nXG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyByZXR1cm4gbnVsbCBpZiBrZXkgaXMgbWlzc2luZyBvciBub3QgYW4gYXJyYXkgb3IgaGFzIG5vIGVsZW1lbnRzXG4gIGlmICgha2V5KSByZXR1cm4gbnVsbDtcbiAgbGV0IG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGJsb2NraW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICAgICAgICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXksIGNsZWFyIGludGVydmFsIGFuZCByZXNvbHZlXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBwb2xsSW50ZXJ2YWwpO1xuICAgICAgLy8gYWRkIHRpbWVvdXRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0sIHRpbWVvdXQpOyAvLyB3YWl0IGJsb2NraW5nIGZvciBcInRpbWVvdXRcIiBtc2Vjc1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciA9IChrZXkpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gcmVtb3ZlIGtleSBmcm9tIGluZm9MYXllclxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSByZXR1cm47XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBsb2dnZXIubG9nKFwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllclwiLCBgUmVtb3ZpbmcgJHtsYXN0S2V5fSBmcm9tICR7SlNPTi5zdHJpbmdpZnkob2JqKX1gKTtcbiAgICBkZWxldGUgb2JqW2xhc3RLZXldO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBpbmZvTGF5ZXJba2V5XTtcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIG51bGwpO1xuICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRyZWF0bWVudCA9IChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIHN0YXR1cywgZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IG51bGwpID0+IHtcbiAgY29uc3QgdmFsdWUgPSB7fTtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZUlkICE9PSB1bmRlZmluZWQpIHZhbHVlLmJ1c2luZXNzUnVsZUlkID0gYnVzaW5lc3NSdWxlSWQ7XG4gIGlmICh2YXJpYW50KSB2YWx1ZS52YXJpYW50ID0gdmFyaWFudDtcblxuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJhcHBsaWVkXCI6XG4gICAgICBpbmZvTGF5ZXIuYVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJza2lwcGVkXCI6XG4gICAgICB2YWx1ZS5kZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gZGVwZW5kYW50X29uX3RyZWF0bWVudDtcbiAgICAgIGluZm9MYXllci5lW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImZhaWxlZFwiOlxuICAgICAgaW5mb0xheWVyLmZbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xufTtcblxuY29uc3QgUEFSU0VTRUFSQ0hNQVhSRVRSWSA9IDEwO1xuY29uc3QgUEFSU0VTRUFSQ0hTVEFSVERFTEFZID0gMTA7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyID0gYXN5bmMgKCkgPT4ge1xuICAvLyBDb2xsZWN0IGNvcmUgZGF0YVxuICBwcmVwYXJlQ29yZURhdGEoKTtcblxuICAvLyBUcmlnZ2VyLXN0YXJ0IHRoZSBwYXJzZXIgbG9vcFxuICBwYXJzZXJDYWxsZXIoKTtcblxuICAvLyBBZGQgbWV0cmljc1xuICBhZGRNZXRyaWNzKCk7XG59O1xuXG5jb25zdCBjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBiYXNlRmVhdHVyZU5hbWVzID0gT2JqZWN0LmtleXMoZmVhdHVyZUVuZ2luZWVyaW5nT3BzKTtcbiAgZm9yIChjb25zdCBiYXNlRmVhdHVyZU5hbWUgb2YgYmFzZUZlYXR1cmVOYW1lcykge1xuICAgIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICAgIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICAgIGlmIChGRU9wLnF1ZXJ5TWV0aG9kID09PSBudWxsIHx8IEZFT3AucXVlcnlNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UmVzcG9uc2UgPSBhd2FpdCBxdWVyeUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgRkVPcC5xdWVyeU1ldGhvZCwgRkVPcC53aW5kb3cpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihGRU9wLmZlYXR1cmVOYW1lLCBxdWVyeVJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKSA9PiB7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICBpZiAoRkVPcC51cGRhdGVNZXRob2QgPT09IG51bGwgfHwgRkVPcC51cGRhdGVNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICBhd2FpdCB1cGRhdGVJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIEZFT3AudXBkYXRlTWV0aG9kKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHByb2Nlc3NGb3JtYXR0ZXIgPSAodmFsdWUsIGZvcm1hdHRlcikgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCAhZm9ybWF0dGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3dpdGNoIChmb3JtYXR0ZXIpIHtcbiAgICBjYXNlIFwidXBwZXJDYXNlVFJcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKFwidHItVFJcIik7XG4gICAgY2FzZSBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwiOlxuICAgICAgcmV0dXJuIGZvcm1hdERlbGl2ZXJ5RGF0ZSh2YWx1ZSk7XG4gICAgY2FzZSBcIm51bWVyaWNPbmx5XCI6XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgIGNhc2UgXCJsb3dlckNhc2VUUkZpcnN0V29yZFwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoXCJ0ci1UUlwiKS5zcGxpdChcIiBcIilbMF07XG4gICAgY2FzZSBcImRlYXJyYXlcIjpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBjYXNlIFwidG9TdHJpbmdcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hPYmogPSAob2JqLCBzZWFyY2hFbGVtZW50KSA9PiB7XG4gIGxldCB2YWx1ZTtcbiAgbGV0IGxheWVyVmFsdWU7XG5cbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHNlYXJjaEVsZW1lbnQub3BlcmFuZCkge1xuICAgICAgY2FzZSBcIkpTT05GaWx0ZXJPdGhlclwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlsdGVyUGFyYW1zID0gc2VhcmNoRWxlbWVudC52YWx1ZS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgaWYgKGZpbHRlclBhcmFtcy5sZW5ndGggIT09IDIpIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGZpbHRlck5hbWUgPSBmaWx0ZXJQYXJhbXNbMF07XG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBmaWx0ZXJQYXJhbXNbMV07XG4gICAgICAgICAgaWYgKCFmaWx0ZXJOYW1lIHx8ICFmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaCA9IGpzb25HZXQob2JqLCBmaWx0ZXJOYW1lKTtcblxuICAgICAgICAgIGlmICghZmlsdGVyTWF0Y2ggfHwgZmlsdGVyTWF0Y2ggIT09IGZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGlmICh2YWx1ZSAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlPYnNlcnZlXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgY29uc3QgdG9CZVVwZGF0ZWQgPSBbXTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gc2VhcmNoUGF0aHMuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT09IGNoaWxkKTtcbiAgICAgICAgICAgIC8vIGFkZCBjaGlsZEVsZW1lbnRzIGludG8gdG9CZVVwZGF0ZWRcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLnB1c2goLi4uY2hpbGRFbGVtZW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gcnVuIG9ubHkgaWYgdGhlIGVsZW1lbnQgaGFzIGFkZGVkIG9yIHJlbW92ZWQgY2hpbGRyZW5cbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGFzeW5jIGZ1bmN0aW9uKG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICAgIGlmIChpc093bk11dGF0aW9uKG11dGF0aW9uTGlzdCkpIHJldHVybjtcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgZWxlbWVudC5pc0ZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIoZWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdHJpZ2dlclJlc3RhcnQgPSBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPj0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG4gICAgICAgICAgICBpZiAodHJpZ2dlclJlc3RhcnQpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcInNlYXJjaE9iajogdHJpZ2dlcmVkIGEgcmVzdGFydCBvZiBzZWFyY2hwYXRocyBkdWU6IFwiLCBzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgICBwYXJzZXJDYWxsZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHZhbHVlLCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIjpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlTGlzdCA9IFtdO1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlID0gdmFsdWVjaGlsZC5nZXRBdHRyaWJ1dGUoc2VhcmNoRWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoYXR0cmliVmFsdWUpIHtcbiAgICAgICAgICAgICAgYXR0cmliVmFsdWVMaXN0LnB1c2goYXR0cmliVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGF0dHJpYlZhbHVlTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBzZXRWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMDtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2V0VmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUNvdW50RWx0c1wiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNlYXJjaEVsZW1lbnQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBsZXQgc3VtUHJpY2UgPSAwO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHN1bVByaWNlKz1wYXJzZUludChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3VtUHJpY2UgPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gc3VtUHJpY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBjb25zdCBhcnJheUlubmVyVGV4dCA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgYXJyYXlJbm5lclRleHQucHVzaChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJyYXlJbm5lclRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGFycmF5SW5uZXJUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfSAvLyBzd2l0Y2hcblxuICAgIGlmIChsYXllclZhbHVlICE9PSB1bmRlZmluZWQgJiYgbGF5ZXJWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKSB7XG4gICAgICAgIGxheWVyVmFsdWUgPSBwcm9jZXNzRm9ybWF0dGVyKGxheWVyVmFsdWUsIHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKTtcbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKHNlYXJjaEVsZW1lbnQubmFtZSwgbGF5ZXJWYWx1ZSk7XG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuXG4gICAgICAvLyBtYXJrIGV4Y2x1c2l2ZSBlbGVtZW50cyBhcyBmb3VuZFxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUpICYmIHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBleGNsdXNpdmVFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmluY2x1ZGVzKGV4Y2x1c2l2ZUVsZW1lbnQubmFtZSkpIHtcbiAgICAgICAgICAgIGV4Y2x1c2l2ZUVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcInNlYXJjaE9iaiBlcnJvcjogXCIgKyBlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlLCA1MCwgMTAwMCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBjYXJ0IHRvdGFsIHByb2R1Y3QgcHJpY2UgaXMgbm90IGF2YWlsYWJsZSBhbnl3aGVyZSwgc3BlY2lhbCBkaXNjb3VudHMgZXRjIGFyZSBoYXJkIHRvIHNjcmFwZSwgc28gcmVjYWxjdWxhdGUgaXRcbiAgICBjb25zdCBbaXNDYXJ0RW1wdHksIHRvdGFsQmFzZVByaWNlLCBjb3Vwb25Ob3RBcHBsaWNhYmxlLCBwcmljZXMsIHF1YW50aXRpZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuaXNlbXB0eVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnByaWNlc1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnF1YW50aXRpZXNcIiksXG4gICAgXSk7XG5cbiAgICBsZXQgdG90YWxQcmljZSA9IDA7XG5cbiAgICBpZiAoIXRvdGFsQmFzZVByaWNlICYmIHByaWNlcyAmJiBBcnJheS5pc0FycmF5KHByaWNlcykgJiYgcHJpY2VzLmxlbmd0aCA+IDAgJiYgcXVhbnRpdGllcyAmJiBBcnJheS5pc0FycmF5KHF1YW50aXRpZXMpICYmIHF1YW50aXRpZXMubGVuZ3RoID4gMCAmJiBwcmljZXMubGVuZ3RoID09PSBxdWFudGl0aWVzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG90YWxQcmljZSArPSBwYXJzZUludChwcmljZXNbaV0pICogcGFyc2VJbnQocXVhbnRpdGllc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvdGFsUHJpY2UgPSBwYXJzZUludCh0b3RhbEJhc2VQcmljZSk7XG4gICAgfVxuXG4gICAgbGV0IGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSAmJiBjb3Vwb25Ob3RBcHBsaWNhYmxlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gdG90YWxQcmljZSAtIHBhcnNlSW50KGNvdXBvbk5vdEFwcGxpY2FibGUpO1xuICAgIH0gZWxzZSBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSBwYXJzZUludCh0b3RhbFByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCIsIGNvdXBvbkFwcGxpY2FibGVBbW91bnQpO1xuXG4gICAgaWYgKGlzQ2FydEVtcHR5KSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxQcmljZVwiLCAwKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIDApO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcImN1c3RvbURhdGFEZXJpdmF0aW9ucyBjYW5ub3QgY29tcHV0ZSBjb3Vwb25BcHBsaWNhYmxlUHJpY2U6IFwiICsgZSk7XG4gIH1cblxuICAvLyBQcm9kdWN0IHBhZ2UgLS0+IHRyYW5zZmVyIHNrdXMgdG8gc2luZ2xlIGxvY2F0aW9uXG4gIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiUHJvZHVjdHBhZ2VcIikge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIpO1xuICAgIGlmIChza3UhPT1udWxsICYmIHNrdSE9PXVuZGVmaW5lZCkge1xuICAgICAgYXdhaXQgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgW3NrdV0pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiYmFza2V0XCIpIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuc2t1c1wiKTtcbiAgICBpZiAoc2t1TGlzdCE9PW51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgYXdhaXQgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgc2t1TGlzdCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwYXJzZVNlYXJjaFBhdGhzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkb21TdGF0dXMgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICAvLyBjaGVjayBpZiBkb2N1bWVudCBhbmQgZG9tIGlzIGxvYWRlZCBhbmQgcmVhZHkgZm9yIHNjcmFwcGluZ1xuICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBpbml0aWFsaXplZCB3aXRoIGRvbSBzdGF0dXM6ICBcIiArIGRvbVN0YXR1cyk7XG5cbiAgY29uc3Qgd2ludG9wID0gd2luZG93LnRvcDtcbiAgY29uc3QgZGF0YUxheWVyID0gd2ludG9wLmRhdGFMYXllcjtcbiAgY29uc3Qgd2luZG9jID0gd2ludG9wLmRvY3VtZW50O1xuICBsZXQgc29yZ0FycmF5SW5uZXI7XG5cbiAgY29uc3QgZm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3QgcHJldkZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG5vdEZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG5cbiAgLy8gUGFnZVR5cGUgY2FuIGJlIGluZmVycmVkIGZyb20gVVJMLCBpZiBmb3VuZCB1c2UgaXQgZnJvbSB0aGVyZVxuICBsZXQgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuXG4gIGlmIChjdXJyZW50UGFnZVR5cGUpIHtcbiAgICBwcmV2Rm91bmROYW1lcy5hZGQoXCJQYWdlVHlwZVwiKTtcbiAgfVxuXG4gIC8vIExvb3AgdGhyb3VnaCBzZWFyY2ggbGlzdHMgYW5kIG1hcmsgZm91bmQgbmFtZXNcbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcHJldkZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoZm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSB8fCBwcmV2Rm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSkge1xuICAgICAgLy8gaGFkIGFscmVhZHkgZm91bmQgdGhpcyBlbGVtZW50IG9uIGFub3RoZXIgcGFyc2UgaXRlbVxuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kICE9PSBcIipcIikge1xuICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuICAgICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQuaW5kZXhPZihjdXJyZW50UGFnZVR5cGUpIDwgMCkge1xuICAgICAgICAvLyBza2lwIHNlYXJjaEVsZW1lbnQgYmVjYXVzZSBvZiBQYWdlVHlwZURlcGVuZFxuICAgICAgICBzZWFyY2hFbGVtZW50LmlzSWdub3JlID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIlNpbmdsZVdUXCIpIHsgLy8gU0NBTiBXaW5kb3cgZm9yIFNpbmdsZSBFbGVtZW50c1xuICAgICAgc2VhcmNoQW5kU2V0KHdpbnRvcCwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJHQURhdGFMYXllclwiKSB7IC8vIFNDQU4gR0EgREFUQSBMQVlFUlxuICAgICAgZm9yIChjb25zdCBkYXRhTGF5ZXJJdGVtIG9mIGRhdGFMYXllcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoZGF0YUxheWVySXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NTb3JnXCIpIHsgLy8gU0NBTiBTT1JHIEFSUkFZXG4gICAgICBpZiAoIXNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNvcmdBcnJheUlubmVyID0gZ2V0U09SR0FycmF5KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHNvcmdJdGVtIG9mIHNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChzb3JnSXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NRdWVyeVwiKSB7IC8vIFNDQU4gRE9DVU1FTlRcbiAgICAgIHNlYXJjaEFuZFNldCh3aW5kb2MsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gLy8gRE9DUVVFUlkgcGFyc2VcbiAgfVxuXG4gIGlmIChub3RGb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGZvdW5kIGFsbCBlbGVtZW50cyAtIHNldHRpbmcgcmV0cnkgdG8gbWF4XCIpO1xuICB9IGVsc2UgaWYgKGZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIC8vIHVwZGF0ZSByZXRyeSBjb3VudGVyIGFuZCBkZWxheSBvbmx5IGlmIGRvbSBpcyBhY3RpdmVcbiAgICBpZiAoZG9tU3RhdHVzID09PSBcImNvbXBsZXRlXCIgfHwgZG9tU3RhdHVzID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSAqPSAyO1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICs9IDE7XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkIGJ1dCBub3QgZm91bmQgYW55LCBzZXR0aW5nIGRlbGF5IGFuZCByZXRyeSB0byBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIiBhbmQgXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICsgXCIgZm9yIG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdXCIsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQ6IG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdIGFuZCBmb3VuZCBcIiArXG4gICAgICBmb3VuZE5hbWVzLnNpemUsXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoQW5kU2V0ID0gKG9iaiwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcykgPT4ge1xuICBpZiAoc2VhcmNoT2JqKG9iaiwgc2VhcmNoRWxlbWVudCkpIHtcbiAgICBmb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH1cbn07XG5cbi8vIHBhcnNlIHNvdXJjZVxuY29uc3QgcGFyc2VyQ2FsbGVyID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGF3YWl0IHBhcnNlU2VhcmNoUGF0aHMoKTtcbiAgaWYgKHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA8IFBBUlNFU0VBUkNITUFYUkVUUlkpIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogc2NoZWR1bGVkIHRvIGJlIHJlY2FsbGVkIGluIFwiICsgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCJtc1wiKTtcbiAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgcGFyc2VyQ2FsbGVyKCk7XG4gICAgfSwgcGFyc2VTZWFyY2hQYXRoc0RlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogcmVhY2hlZCBtYXggcmV0cnksIGNhbGxpbmcgcmVtYWluZGVyIGhpc3RvcmljYWwgZGF0YVwiKTtcbiAgICBhd2FpdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMoKTtcbiAgICBhd2FpdCBjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUpO1xuICB9XG59O1xuXG4vLyBFeHRyYWN0IHZhbHVlIGZyb20ganNvbiBvYmplY3QgdXNpbmcgZ2l2ZW4gcGF0aFxuLy8gSWYgYW4gZWxlbWVudCBpcyAqLCBjb25jYXRlbmF0ZSByZWN1cnNpdmVseSBhbGwgc3ViLXBhdGggdmFsdWVzIGFzIHN0cmluZ1xuY29uc3QganNvbkdldCA9IChvYmosIHBhdGgpID0+IHtcbiAgaWYgKCFvYmopIHJldHVybiBudWxsO1xuICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aEFycmF5ID0gcGF0aC5zcGxpdChcIi5cIik7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChwYXRoQXJyYXlbaV0gPT09IFwiKlwiKSB7XG4gICAgICAgIGNvbnN0IHN1YlBhdGggPSBwYXRoQXJyYXkuc2xpY2UoaSArIDEpLmpvaW4oXCIuXCIpO1xuICAgICAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBpbiBjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRbc3ViS2V5XSAhPT0gdW5kZWZpbmVkICYmIGN1cnJlbnRbc3ViS2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgc3ViVmFsdWUgPSBqc29uR2V0KGN1cnJlbnRbc3ViS2V5XSwgc3ViUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3ViVmFsdWUgIT09IG51bGwgJiYgc3ViVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBzdWJBcnJheS5wdXNoKHN1YlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YkFycmF5O1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnRbcGF0aEFycmF5W2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgcHJlcGFyZUNvcmVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB3aW5kb3dQdHIgPSB3aW5kb3cudG9wO1xuICBjb25zdCBuYXZQdHIgPSB3aW5kb3dQdHIubmF2aWdhdG9yO1xuXG4gIC8qIEJlYWdsZSBkYXRhICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidlwiLCBWRVJTSU9OKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzclwiLCBTUExJVF9SQVRJTyk7XG5cbiAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnREYXRhPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50O1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlBsYXRmb3JtXCIsIHBsYXRmb3JtKTtcblxuICAvKiB3aW5kb3cgdmlldyBhcmVhICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1BSYXRpb1wiLCB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG5cbiAgY29uc3QgYXZhaWxXaW5kb3cgPSB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbFdpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbEhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93QXZhaWxcIiwgYXZhaWxXaW5kb3cpO1xuXG4gIGNvbnN0IHdpbmRvd0RlcHRoID0gd2luZG93UHRyLnNjcmVlbj8uY29sb3JEZXB0aCArIFwiLVwiICsgd2luZG93UHRyLnNjcmVlbj8ucGl4ZWxEZXB0aDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93RGVwdGhcIiwgd2luZG93RGVwdGgpO1xuXG4gIGNvbnN0IHZwb3J0U2hhcGUgPSB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LndpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LmhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93VnBvcnRcIiwgdnBvcnRTaGFwZSk7XG5cbiAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgIGxldCB3aWR0aCA9IHBhcnNlSW50KHNjcmVlbi53aWR0aCk7XG4gICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHBhcnNlSW50KHNjcmVlbi5oZWlnaHQpIDogMDtcbiAgICBpZiAod2lkdGggIT09IDAgJiYgaGVpZ2h0ICE9PSAwKSB7XG4gICAgICBjb25zdCBpT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChwbGF0Zm9ybSk7XG4gICAgICBpZiAoaU9TICYmIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgIC8vIGlvcyBwcm92aWRlcyBEUElzLCBuZWVkIHRvIG11bHRpcGx5XG4gICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQgKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvcmllbnRhdGlvbkFuZ2xlID0gd2luZG93UHRyLnNjcmVlbj8ub3JpZW50YXRpb24/LmFuZ2xlO1xuICAgICAgICBpZiAoTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDkwIHx8IE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSAyNzApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGxhbmRzY2FwZSBvcmllbnRhdGlvbiBzd2l0Y2ggdmFsdWVzIGZvciBhbGwgZXhjZXB0IGlvc1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSB3aWR0aDtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodDtcbiAgICAgICAgICBoZWlnaHQgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dcIiwgd2lkdGggKyBcInhcIiArIGhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyogbmF2aWdhdG9yICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhpc3RTaXplXCIsIHdpbmRvd1B0ci5oaXN0b3J5Py5sZW5ndGgpO1xuXG4gIC8vIGNoZWNrIGlmIHVzZXJBZ2VudERhdGEgaXMgc3VwcG9ydGVkIGFuZCB1c2VyQWdlbnQgaXMgbm90IGF2YWlsYWJsZSwgdXNlIGl0XG4gIGlmICghbmF2UHRyLnVzZXJBZ2VudCkge1xuICAgIGlmIChuYXZQdHIudXNlckFnZW50RGF0YSkge1xuICAgICAgLy8gdHVybiBicmFuZHMgYXJyYXkgaW50byBzdHJpbmdcbiAgICAgIGxldCBuYXZBZ2VudCA9IG5hdlB0cj8udXNlckFnZW50RGF0YT8uYnJhbmRzPy5tYXAoZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS5icmFuZCArIFwiOlwiICsgZS52ZXJzaW9uO1xuICAgICAgfSkuam9pbigpO1xuICAgICAgLy8gYWRkIG1vYmlsZSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSAobmF2UHRyPy51c2VyQWdlbnREYXRhPy5tb2JpbGUgPyBcIm1vYmlcIiA6IFwiIFwiKTtcbiAgICAgIC8vIGFkZCBwbGF0Zm9ybSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSBwbGF0Zm9ybTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdkFnZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2UHRyLnVzZXJBZ2VudCk7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIV0NvcmVzXCIsIG5hdlB0ci5oYXJkd2FyZUNvbmN1cnJlbmN5KTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2TGFuZ3VhZ2VcIiwgbmF2UHRyLmxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIuYnJvd3Nlckxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIuc3lzdGVtTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci51c2VyTGFuZ3VhZ2UsXG4gICk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlRvdWNoXCIsIG5hdlB0ci5tYXhUb3VjaFBvaW50cyk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlZlbmRvclwiLCBuYXZQdHIudmVuZG9yKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaW50ZXJuZXRTcGVlZFwiLCB3aW5kb3dQdHIubmF2aWdhdG9yPy5jb25uZWN0aW9uPy5kb3dubGluayk7XG5cbiAgLyogbWlzY2VsbGFuZW91cyAqL1xuICBjb25zdCBjdXJyZW50VVJMID0gbmV3IFVSTCh3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInVcIiwgY3VycmVudFVSTC5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIGN1cnJlbnRVUkwuaG9zdG5hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRvbnR0cmFja1wiLCBuYXZQdHIuZG9Ob3RUcmFjayB8fCB3aW5kb3dQdHIuZG9Ob3RUcmFjayB8fCBuYXZQdHIubXNEb05vdFRyYWNrKTtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgY29uc3QgZmlyc3RTZXNzaW9uUmVmZXJyZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIpO1xuICBpZiAoIWZpcnN0U2Vzc2lvblJlZmVycmVyKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIGZpcnN0U2Vzc2lvblJlZmVycmVyKTtcbiAgfVxuXG4gIC8qIFZpdmVuc2Ugc3BlY2lmaWMgKi9cbiAgbGV0IHBhZ2VUeXBlO1xuICAvLyBpZiB1cmwgbGlrZSB4IHRoZW4gc2V0IFBhZ2VUeXBlID0geVxuICBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZmF2b3JpbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImZhdm9yaXRlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYmFza2V0XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1vemV0aS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHVyY2hhc2VcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJvZGVtZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGF5bWVudFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImFkZHJlc3NcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBhc3RvcmRlcnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUta2F5aXQuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInJlZ2lzdGVyXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWdpcmlzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic2lnbmluXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwia3Vwb25sYXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9jb3Vwb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwicHJvZmlsLWd1bmNlbGxlLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2luZm9cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2FkZHJlc3Nlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImR1eXVydS10ZXJjaWhsZXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX25vdGlmaWNhdGlvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJpbmRpcmltbGktbW9iaWx5YS1rYW1wYW55YWxhcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNwZWNpYWxfY2FtcGFpZ25zXCI7XG4gIH1cblxuICBpZiAocGFnZVR5cGUpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHBhZ2VUeXBlKTtcbiAgfVxufTtcblxuY29uc3QgYWRkTWV0cmljcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB3aW5kb3dQdHIgPSB3aW5kb3cudG9wO1xuICBjb25zdCBwZXJmTWV0cmljcyA9IHt9O1xuICBjb25zdCBwZXJmTmF2aWdhdGlvbk1ldHJpY3MgPSB3aW5kb3dQdHIucGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIilbMF07XG4gIGlmICh3aW5kb3dQdHIucGVyZm9ybWFuY2UgJiYgcGVyZk5hdmlnYXRpb25NZXRyaWNzKSB7XG4gICAgcGVyZk1ldHJpY3MuY29ubmVjdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5yZXF1ZXN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MucmVzcG9uc2VFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MucmVxdWVzdFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kb20gPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kb21JbnRlcmFjdGl2ZSAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kb21Db21wbGV0ZSk7XG4gICAgcGVyZk1ldHJpY3MubG9hZCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZHVyYXRpb24gPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kdXJhdGlvbik7XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtZXRyaWNzXCIsIHBlcmZNZXRyaWNzKTtcbn07XG5cbi8vIFRPRE86IG1vdmUgdGhpcyB0byBhbiBcImVsZW1lbnQgY29sbGVjdG9yXCIgbW9kdWxlLCB0aGVuIGRhdGEgaXMgZXh0cmFjdGVkIGZyb20gcHJlLWNvbGxlY3RlZCBlbGVtZW50c1xuY29uc3QgZ2V0U09SR0FycmF5ID0gKCkgPT4ge1xuICBjb25zdCBzY2hlbWFPcmdFbHRzID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW3R5cGU9XFxcImFwcGxpY2F0aW9uL2xkK2pzb25cXFwiXVwiKTtcbiAgY29uc3Qgc29yZ0FycmF5ID0gW107XG5cbiAgZm9yIChjb25zdCBzVGFnIG9mIHNjaGVtYU9yZ0VsdHMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY250bnQgPSBzVGFnLnRleHRDb250ZW50O1xuICAgICAgY29uc3QganNvbmNvbnRlbnQgPSBKU09OLnBhcnNlKGNudG50KTtcbiAgICAgIHNvcmdBcnJheS5wdXNoKGpzb25jb250ZW50KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNvcmdBcnJheTtcbn07XG4iLCJpbXBvcnQge0xPR19BUElfVVJMfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlTW9uaXRvclwiKTtcbmNvbnN0IEhFQURFUlMgPSB7XG4gIHR5cGU6IFwidGV4dC9wbGFpblwiLFxufTtcblxuZXhwb3J0IGNsYXNzIE1vbml0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIG1vbml0b3JcIik7XG5cbiAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IG51bGw7XG5cbiAgICB0aGlzLmluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIEF0dGVtcHRzIHRvIHNlbmQgdGhlIGluaXRpYWwgbG9nIGJvZHkgKGJlYWdsZUluZm9MYXllcidzIGluaXRpYWwgcG9wdWxhdGlvbikgaW1tZWRpYXRlbHlcbiAgYXN5bmMgc2VuZExvZ3MoaW1tZWRpYXRlKSB7XG4gICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIGltbWVkaWF0ZSBzZW5kaW5nIGJsb2NrXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gYXdhaXRpbmcgc2NyYXBpbmdcIik7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlLCA1MCwgMTAwMCk7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIHNlbmRpbmcgbG9nc1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNlbmQgaW5pdGlhbCBsb2cgYm9keSBhbmQgaW5jcmVtZW50YWwgdXBkYXRlIGxvZ3Mgb24gY2xvc2VcbiAgYXN5bmMgaGFuZGxlQ2xvc2VFdmVudCgpIHtcbiAgICAvLyBpZiBpbml0aWFsIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHNlbmQgdXBkYXRlcyBhbmQgaW5mb2xheWVyIGluIG9uZSBiYXRjaFxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIC8vIGlmIG1haW4gbG9nIGhhcyBiZWVuIHNlbnQsIHNlbmQgaW5jcmVtZW50YWwgdXBkYXRlcyBvbmx5XG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpO1xuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlTWFpbkxvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlTWFpbkxvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXF1ZXN0IGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCkge1xuICAgIGlmICghdGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc1VwZGF0ZXNTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHRoZXJlIGlzIG5vIGluY3JlbWVudGFsIHlldFxuICAgICAgLy8gb3IgaWYgdGhlIHVwZGF0ZXMgaGF2ZSBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNDaGFuZ2VkID0gYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZ3MgY2hhbmdlIHN0YXR1czogXCIsIGhhc0NoYW5nZWQpO1xuICAgIGlmICghaGFzQ2hhbmdlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nRGF0YSA9IGF3YWl0IHRoaXMucGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpO1xuICAgIGlmIChsb2dEYXRhKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2VuZGluZyBpbmNyZW1lbnRhbCBsb2dzXCIsIGxvZ0RhdGEpO1xuICAgICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhsb2dEYXRhKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVBcnJpdmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIG9yIGFycml2YWwgbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZUFycml2YWxMb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpIHtcbiAgICBjb25zdCBod20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19od21cIik7XG4gICAgaWYgKHRoaXMuaGlnaFdhdGVyTWFyayAhPT0gaHdtKSB7XG4gICAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod207XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUFycml2YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFt1cmwsIGhhc2gsIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDAsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgdTogdXJsLFxuICAgICAgb25IYXNoUGN0OiBoYXNoLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZU1haW5Mb2dEYXRhKCkge1xuICAgIGNvbnN0IGJvZHkgPSB7fTtcbiAgICBpZiAoIXdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSkge1xuICAgICAgaWYgKCFrZXkuc3RhcnRzV2l0aChcIl9cIikgJiYgdmFsdWUgIT09IG51bGwpIGJvZHlba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBib2R5LmxjID0gMTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW2EsIGUsIGYsIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJmXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDIsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgYSwgZSwgZixcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGV4aXQgZXZlbnQgbGlzdGVuZXJcIik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIGJlZm9yZXVubG9hZCBldmVudFwiKTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gcGFnZWhpZGUgZXZlbnRcIik7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICB9XG5cbiAgcXVldWVMb2dzKGxvZ0RhdGEpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5zZW5kQmVhY29uIHx8IHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmZXRjaChMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICBjb25zdCBxdWV1ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCFxdWV1ZWQpIHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBxdWV1ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICBpZiAoIXF1ZXVlZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBub3QgcXVldWVkXCIpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vbml0b3I7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tEYXRhTGF5ZXJSdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBhd2FpdCBkYXRhTGF5ZXJGaW5kZXIob3BlcmF0b3IpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRhdGFMYXllckZpbmRlciA9IGFzeW5jIChrZXkpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIlNlYXJjaGluZyBiZWFnbGVJbmZvTGF5ZXIgZm9yIGtleSBcIiwga2V5KTtcbiAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXksIHRydWUsIDI1LCAxMDAwKTtcbiAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5zdWNjZXNzKGBGb3VuZCBrZXkgJHtrZXl9IHdpdGggdmFsdWUgJHtyZXN9YCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBsb2dnZXIuZmFpbGVkKGBLZXkgJHtrZXl9IG5vdCBmb3VuZCBpbiBiZWFnbGVJbmZvTGF5ZXJgKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVsZW1lbnRDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbGVtZW50UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIHNlbGVjdG9yLCBzZWxlY3RvckFsbCwgc2VsZWN0b3JGYWxsYmFjayA9IG51bGx9ID0gcnVsZTtcbiAgbGV0IG1haW5TZWxlY3RvciA9IHNlbGVjdG9yO1xuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIG1haW5TZWxlY3RvciA9IHNlbGVjdG9yRmFsbGJhY2sgPyBzZWxlY3RvckZhbGxiYWNrIDogbWFpblNlbGVjdG9yO1xuICB9XG5cbiAgaWYgKG9wZXJhdG9yID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvciksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoc2VsZWN0b3JBbGwgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChtYWluU2VsZWN0b3IpIGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKTtcbiAgZWxzZSBpZiAoc2VsZWN0b3JBbGwpIGVsZW1lbnQgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidGV4dC1udW1iZXJcIjoge1xuICAgICAgbGV0IHRlbXBWYWw7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgICB0ZW1wVmFsID0gZWxlbWVudC5yZWR1Y2UoKHJldHVyblZhbCwgZWxlbSkgPT4ge1xuICAgICAgICAgIHJldHVyblZhbCArPSBwYXJzZUludChlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVmFsID0gcGFyc2VJbnQod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikudGV4dENvbnRlbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgfVxuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcGFyc2VJbnQodGVtcFZhbCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiY2xhc3NMaXN0XCI6XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImNvdW50XCI6IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihlbGVtZW50Lmxlbmd0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigwLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSBcInN0eWxlXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgY29uc3Qgc3R5bGVLZXkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50U3R5bGVzW3N0eWxlS2V5XTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCBzdHlsZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJPcGVyYXRvciBub3QgZGVmaW5lZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVGdW5jdGlvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0Z1bmN0aW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgaWYgKCFvcGVyYXRvcikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJSdWxlIGZ1bmN0aW9uIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBydWxlRnVuY3Rpb24gPSBGdW5jdGlvbihvcGVyYXRvcik7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IHJ1bGVGdW5jdGlvbigpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVTZXNzaW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrU2Vzc2lvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZHVyYXRpb25cIjpcbiAgICAgIHJldHVybiBkdXJhdGlvbkhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImhpc3RvcnlcIjpcbiAgICAgIHJldHVybiBoaXN0b3J5SGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlc3Npb25UaW1lc3RhbXAgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fVElNRVNUQU1QKSkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBzZXNzaW9uIHRpbWVzdGFtcFwiLCBlcnIpO1xuICAgIHJldHVybiBEYXRlLm5vdygpO1xuICB9XG59O1xuXG5jb25zdCBkdXJhdGlvbkhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBkdXJhdGlvbiA9IChEYXRlLm5vdygpIC0gZ2V0U2Vzc2lvblRpbWVzdGFtcCgpKSAvIDEwMDA7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGR1cmF0aW9uLCBjb25kaXRpb24sIHBhcnNlSW50KHZhbHVlKSk7XG59O1xuXG5jb25zdCBoaXN0b3J5SGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRIaXN0b3J5ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9ISVNUT1JZKT8uc3BsaXQoXCIsXCIpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihjdXJyZW50SGlzdG9yeSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVVybENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1VybFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJwYXRoXCI6IHtcbiAgICAgIGNvbnN0IHJlcXVlc3RVUkw9IHdpbmRvdy50b3AubG9jYXRpb24uaHJlZjtcbiAgICAgIGNvbnN0IHBhdGggPSBuZXcgVVJMKHJlcXVlc3RVUkwpLnBhdGhuYW1lO1xuICAgICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgcGF0aCAke3BhdGh9IG1hdGNoZXMgcnVsZSBwYXRoICR7dmFsdWV9YCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihwYXRoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUll9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVudkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VudlJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkZXZpY2VfdHlwZVwiOiB7XG4gICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcyA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGlzTW9iaWxlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVfY2FjaGVcIixcbiAgdmVyc2lvbjogMSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImluZm9DYWNoZVwiLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJpeF9za3VcIixcbiAgICAgICAgZmllbGRzOiBcInNrdVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcInNrdVwifSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQge2ZldGNoUHJvZHVjdEluZm99IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeVwiKTtcbmNsYXNzIEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGlmICghb3BlblJlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImluZGV4ZWRkYiBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3BlblJlcXVlc3QucmVzdWx0LmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdG9yZSA9IG9wZW5SZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgaW5kZXhlZCBEQlwiLCBvcGVuUmVxdWVzdC5lcnJvcik7XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMuaW5kZXhlZERCID0gb3BlblJlcXVlc3QucmVzdWx0O1xuICAgIH07XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAyNSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJJbmRleGVkREIgbm90IGluaXRpYWxpemVkIHdpdGhpbiB0aGUgYWxsb3R0ZWQgdGltZVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaW5pdFRyYW5zYWN0aW9uKHJlYWR3cml0ZSA9IGZhbHNlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgdHggPSB0aGlzLmluZGV4ZWREQi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSwgKHJlYWR3cml0ZSA/IFwicmVhZHdyaXRlXCIgOiBcInJlYWRvbmx5XCIpKTtcbiAgICByZXR1cm4gdHgub2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShwYXlsb2FkKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmluaXRUcmFuc2FjdGlvbih0cnVlKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgZm9yIChjb25zdCBsb2FkIG9mIHBheWxvYWQpIHtcbiAgICAgICAgbG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHN0b3JlLnB1dChsb2FkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGF5bG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICBzdG9yZS5wdXQocGF5bG9hZCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xlYXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbih0cnVlKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBjbGVhclJlcXVlc3QgPSBzdG9yZS5jbGVhcigpO1xuICAgICAgICBjbGVhclJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2xlYXJSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgY2xlYXJpbmcgc3RvcmU6ICR7c3RvcmUubmFtZX1gKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXQoc2t1KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGdldFJlcXVlc3QgPSBzdG9yZS5nZXQoc2t1KTtcbiAgICAgICAgZ2V0UmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0UmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgRm91bmQgdmFsdWUgJHtyZXN1bHR9IGZvciBrZXkgJHtza3V9YCk7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBnZXRSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZ2V0dGluZyB2YWx1ZSBmb3Iga2V5OiAke3NrdX1gLCBnZXRSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNvdW50KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3VudFJlcXVlc3QgPSBzdG9yZS5jb3VudCgpO1xuICAgICAgICBjb3VudFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50UmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgQ291bnRlZCAke3Jlc3VsdH0gZW50cmllc2ApO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgY291bnRSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGNvdW50aW5nIGVudHJpZXM6IFwiLCBjb3VudFJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q3Vyc29yKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBjdXJzb3JSZXF1ZXN0ID0gc3RvcmUub3BlbkN1cnNvcigpO1xuICAgICAgICBjdXJzb3JSZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGN1cnNvclJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgZ2V0dGluZyBjdXJzb3JcIiwgY3Vyc29yUmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBwZXJzaXN0UHJvZHVjdEluZm8oKSB7XG4gICAgY29uc3QgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IHRoaXMuZ2V0Q3Vyc29yKCk7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBjdXJzb3IudmFsdWUudGltZXN0YW1wO1xuICAgICAgY29uc3QgZWxhcHNlZFNlY29uZHMgPSAoRGF0ZS5ub3coKSAvIDEwMDApIC0gdGltZXN0YW1wO1xuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgNzIwMCkgcmV0dXJuO1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBpcyBleHBpcmVkXCIpO1xuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0SW5mb1Byb21pc2UgPSBmZXRjaFByb2R1Y3RJbmZvKCk7XG4gICAgY29uc3QgY2xlYXJQcm9taXNlID0gdGhpcy5jbGVhcigpO1xuICAgIGNvbnN0IFtwcm9kdWN0SW5mb0FycmF5XSA9IGF3YWl0IFByb21pc2UuYWxsKFtwcm9kdWN0SW5mb1Byb21pc2UsIGNsZWFyUHJvbWlzZV0pO1xuICAgIGlmICghcHJvZHVjdEluZm9BcnJheSB8fCAhcHJvZHVjdEluZm9BcnJheS5sZW5ndGgpIHJldHVybjtcbiAgICBhd2FpdCB0aGlzLnNhdmUodGhpcy5wcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkpO1xuICB9XG5cbiAgcHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICBjb25zdCBwYXlsb2FkcyA9IFtdO1xuICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBwcm9kdWN0SW5mb0FycmF5LnNoaWZ0KCk7XG4gICAgZmllbGROYW1lcy5zaGlmdCgpO1xuICAgIGZvciAoY29uc3QgaW5mbyBvZiBwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge3NrdTogaW5mby5zaGlmdCgpfTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXlsb2FkW2ZpZWxkTmFtZXNbaV1dID0gaW5mb1tpXSB8fCAwO1xuICAgICAgfVxuICAgICAgcGF5bG9hZHMucHVzaChwYXlsb2FkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBheWxvYWRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnk7XG4iLCJpbXBvcnQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSBmcm9tIFwiLi9pbmRleFwiO1xuXG5jb25zdCBTdG9yZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSgpO1xuICAgICAgICAvLyBIaWRlIHRoZSBjb25zdHJ1Y3RvciBzbyB0aGUgcmV0dXJuZWQgb2JqZWN0IGNhbid0IGJlIG5ldydkLi4uXG4gICAgICAgIGluc3RhbmNlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuICB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgaWYgKCFza3VMaXN0IHx8ICh0eXBlb2Ygc2t1TGlzdCA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMoc2t1TGlzdCkubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgY29uc3Qgc2t1ID0gc2t1TGlzdFtPYmplY3Qua2V5cyhza3VMaXN0KVswXV0/LmlkO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0QWRkVG9DYXJ0Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBwcm9kdWN0Vmlld0NvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRQcmV2aWV3Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXS5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0ID0gMSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHJlbGVhc2VdID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPD0gMDtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgcmVsZWFzZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcy5mb3JFYWNoKChxdWV1ZSkgPT4gcXVldWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LnJlamVjdCh0aGlzLl9jYW5jZWxFcnJvcikpKTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICB9XG4gICAgX2Rpc3BhdGNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWVFbnRyeSA9IChfYSA9IHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghcXVldWVFbnRyeSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgLT0gd2VpZ2h0O1xuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy5fdmFsdWUgKyAxO1xuICAgICAgICAgICAgcXVldWVFbnRyeS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihwcmV2aW91c1dlaWdodCldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5mb3JFYWNoKCh3YWl0ZXIpID0+IHdhaXRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIE11dGV4IHtcbiAgICBjb25zdHJ1Y3RvcihjYW5jZWxFcnJvcikge1xuICAgICAgICB0aGlzLl9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEsIGNhbmNlbEVycm9yKTtcbiAgICB9XG4gICAgYWNxdWlyZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQxKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgWywgcmVsZWFzZXJdID0geWllbGQgdGhpcy5fc2VtYXBob3JlLmFjcXVpcmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLnJ1bkV4Y2x1c2l2ZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKCk7XG4gICAgfVxuICAgIHJlbGVhc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKSlcbiAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5jYW5jZWwoKTtcbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHdpdGhUaW1lb3V0KHN5bmMsIHRpbWVvdXQsIHRpbWVvdXRFcnJvciA9IEVfVElNRU9VVCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjcXVpcmU6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgc3luYy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCByZWxlYXNlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHRpY2tldFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZSh3ZWlnaHQpIHtcbiAgICAgICAgICAgIHN5bmMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3luYy5jYW5jZWwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FpdEZvclVubG9jazogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3luYy53YWl0Rm9yVW5sb2NrKHdlaWdodCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCh0aW1lb3V0RXJyb3IpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogKCkgPT4gc3luYy5pc0xvY2tlZCgpLFxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4gc3luYy5nZXRWYWx1ZSgpLFxuICAgICAgICBzZXRWYWx1ZTogKHZhbHVlKSA9PiBzeW5jLnNldFZhbHVlKHZhbHVlKSxcbiAgICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpc25lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIHRyeUFjcXVpcmUoc3luYywgYWxyZWFkeUFjcXVpcmVkRXJyb3IgPSBFX0FMUkVBRFlfTE9DS0VEKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gd2l0aFRpbWVvdXQoc3luYywgMCwgYWxyZWFkeUFjcXVpcmVkRXJyb3IpO1xufVxuXG5leHBvcnQgeyBFX0FMUkVBRFlfTE9DS0VELCBFX0NBTkNFTEVELCBFX1RJTUVPVVQsIE11dGV4LCBTZW1hcGhvcmUsIHRyeUFjcXVpcmUsIHdpdGhUaW1lb3V0IH07XG4iLCJpbXBvcnQge2NoZWNrRGF0YUxheWVyUnVsZX0gZnJvbSBcIi4vZGF0YUxheWVyQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VsZW1lbnRSdWxlfSBmcm9tIFwiLi9lbGVtZW50Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0Z1bmN0aW9uUnVsZX0gZnJvbSBcIi4vZnVuY3Rpb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrU2Vzc2lvblJ1bGV9IGZyb20gXCIuL3Nlc3Npb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrVXJsUnVsZX0gZnJvbSBcIi4vdXJsQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VudlJ1bGV9IGZyb20gXCIuL2VudkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tQcm9kdWN0SW5mb1J1bGV9IGZyb20gXCIuL3Byb2R1Y3RJbmZvQ2hlY2tlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2FkZERhdGFMaXN0ZW5lciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuaW1wb3J0IHtmZXRjaEVsaWdpYmlsaXR5UnVsZXN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLm11dGV4ID0gbmV3IE11dGV4KCk7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZDtcbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmVsaWdpYmlsaXR5UnVsZXMpKSB7XG4gICAgICBjb25zdCBzYXRpc2ZpZWRSdWxlSWRzID0gW107XG4gICAgICB0aGlzLnNldFVwTGlzdGVuZXJzKGtleSwgcnVsZXMpO1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKSkge1xuICAgICAgICAgIHNhdGlzZmllZFJ1bGVJZHMucHVzaChydWxlLm5hbWUpO1xuICAgICAgICAgIC8vIFBhZ2UgdHlwZSBydWxlcyBhcmUgZXhjbHVzaXZlOyBpZiBvbmUgaXMgdHJ1ZSBhbGwgb3RoZXJzIGFyZSBmYWxzZSBieSBkZWZhdWx0LCBubyBuZWVkIHRvIGFzc2VzcyB0aGUgcmVzdFxuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBzYXRpc2ZpZWRSdWxlSWRzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKSB7XG4gICAgaWYgKCFrZXkgfHwgIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgdGhpcy5tdXRleC5hY3F1aXJlKCk7XG4gICAgbG9nZ2VyLmxvZyhgTG9jayBhY3F1aXJlZCBmb3Iga2V5ICR7a2V5fWApO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgY29uc3QgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCkgfHwgW107XG4gICAgICAgIGlmIChpc0VsaWdpYmxlKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgY3VycmVudC5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGN1cnJlbnQpO1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZyb20gZWxpZ2libGUgcnVsZXNcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGN1cnJlbnQuZmlsdGVyKChrKSA9PiBrICE9PSBydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgLy8gVE9ETyByZWN1cnNpdmVseSBnZXQgYWxsIG9wZXJhdG9ycy9zZWxlY3RvcnMgZnJvbSBjaGFpbmVkIHJ1bGVzXG4gICAgY29uc3QgZGF0YUxheWVyUnVsZXMgPSB7fTtcbiAgICBjb25zdCBlbGVtZW50UnVsZXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgIGNvbnN0IHtvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGV9ID0gcnVsZTtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgICAgaWYgKCFkYXRhTGF5ZXJSdWxlc1tvcGVyYXRvcl0pIGRhdGFMYXllclJ1bGVzW29wZXJhdG9yXSA9IFtdO1xuICAgICAgICAgIGRhdGFMYXllclJ1bGVzW29wZXJhdG9yXS5wdXNoKHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICAgIGlmICghZWxlbWVudFJ1bGVzW3NlbGVjdG9yXSkgZWxlbWVudFJ1bGVzW3NlbGVjdG9yXSA9IFtdO1xuICAgICAgICAgIGVsZW1lbnRSdWxlc1tzZWxlY3Rvcl0ucHVzaChydWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBbb3BlcmF0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhkYXRhTGF5ZXJSdWxlcykpIHtcbiAgICAgIGNvbnN0IGJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2sgPSB0aGlzLmFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrLmJpbmQodGhpcywga2V5LCBydWxlcyk7XG4gICAgICBhZGREYXRhTGlzdGVuZXIob3BlcmF0b3IsIGJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2spO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGVsZW1lbnRSdWxlcykpIHtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uTGlzdCkgPT4ge1xuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvblJlY29yZCBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICBub2RlcyA9IFsuLi5ub2RlcywgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5yZW1vdmVkTm9kZXMpXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBleGNsdWRlIG11dGF0aW9ucyB0aGF0IG9ubHkgdXBkYXRlIHRleHRcbiAgICAgICAgaWYgKG5vZGVzLmV2ZXJ5KChuKSA9PiBuLnRhZ05hbWUgPT09IHVuZGVmaW5lZCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGVsZW1lbnRUb09ic2VydmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIGVsZW1lbnRUb09ic2VydmUgPSBlbGVtZW50VG9PYnNlcnZlID8gZWxlbWVudFRvT2JzZXJ2ZS5wYXJlbnROb2RlIDogZG9jdW1lbnQuYm9keTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudFRvT2JzZXJ2ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZWxpZ2liaWxpdHlSdWxlcyA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTKTtcbiAgICAgIGlmIChlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm4gSlNPTi5wYXJzZShlbGlnaWJpbGl0eVJ1bGVzKTtcbiAgICAgIGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTLCBKU09OLnN0cmluZ2lmeShlbGlnaWJpbGl0eVJ1bGVzKSk7XG4gICAgICByZXR1cm4gZWxpZ2liaWxpdHlSdWxlcztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IGVsaWdpYmlsaXR5IHJ1bGVzOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJTZWdtZW50YXRpb25Db21wdXRlclwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpIHtcbiAgbG9nZ2VyLmxvZyhcIkRldGVybWluaW5nIHVzZXIgc2VnbWVudFwiKTtcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgaWYgKCFydWxlU2V0KSBjb250aW51ZTtcbiAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXX0pO1xuICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgIGxvZ2dlci5sb2coYFVzZXIgc2VnbWVudCBtYXRjaGVkOiAke3NlZ21lbnR9YCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgc2VnbWVudCk7XG4gICAgICByZXR1cm4gc2VnbWVudDtcbiAgICB9XG4gIH1cblxuICBsb2dnZXIubG9nKFwiVXNlciBzZWdtZW50IG5vdCBtYXRjaGVkLCByZXR1cm5pbmcgZGVmYXVsdFwiKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIFwiZGVmYXVsdFwiKTtcbiAgcmV0dXJuIFwiZGVmYXVsdFwiO1xufVxuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZUywgVFJFQVRNRU5UU19EVVJBVElPTn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtmZXRjaFRyZWF0bWVudHMsIGZldGNoVHJlYXRtZW50V2VpZ2h0c30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2NvbXB1dGVTZWdtZW50fSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIik7XG5cbmNsYXNzIFRyZWF0bWVudFJlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gYm9keTtcbiAgICB0aGlzLnRyZWF0bWVudHMgPSB0cmVhdG1lbnRzO1xuXG4gICAgdGhpcy50cmVhdG1lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRzKCkge1xuICAgIGxvZ2dlci5sb2coXCJMb2FkaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3Qge1RSRUFUTUVOVFN9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG4gICAgY29uc3QgdHJlYXRtZW50c09iaiA9IEpTT04ucGFyc2Uod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oVFJFQVRNRU5UUykpO1xuICAgIGxldCB0cmVhdG1lbnRzID0gdHJlYXRtZW50c09iaj8udHJlYXRtZW50cztcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0cmVhdG1lbnRzT2JqPy50aW1lc3RhbXA7XG4gICAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0aW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIG5vdCBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlXCIpO1xuICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkRGF5cyA9IChEYXRlLm5vdygpIC0gdGltZXN0YW1wKSAvICgxMDAwICogMzYwMCAqIDI0KTtcbiAgICAgIGlmIChlbGFwc2VkRGF5cyA+IFRSRUFUTUVOVFNfRFVSQVRJT04pIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgYXJlIGV4cGlyZWRcIik7XG4gICAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJUcmVhdG1lbnRzIGFyZSBsb2FkZWQgZnJvbSBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudFdlaWdodHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWlnaHRzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuV0VJR0hUUyk7XG4gICAgICBpZiAod2VpZ2h0cykgcmV0dXJuIEpTT04ucGFyc2Uod2VpZ2h0cyk7XG4gICAgICB3ZWlnaHRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzKCk7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5XRUlHSFRTLCBKU09OLnN0cmluZ2lmeSh3ZWlnaHRzKSk7XG4gICAgICByZXR1cm4gd2VpZ2h0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKCkge1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSB0aGlzLnRyZWF0bWVudFdlaWdodHM7XG4gICAgY29uc3QgdXNlckdyb3VwID0gYXdhaXQgY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cyk7XG4gICAgY29uc3QgdHJlYXRtZW50cyA9IHRoaXMudHJlYXRtZW50cztcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlckdyb3VwV2VpZ2h0cyA9ICh1c2VyR3JvdXAgJiYgdHJlYXRtZW50V2VpZ2h0c1t1c2VyR3JvdXBdKSA/XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzW3VzZXJHcm91cF0gOiB0cmVhdG1lbnRXZWlnaHRzW1wiZGVmYXVsdFwiXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRyZWF0bWVudHMpIHtcbiAgICAgICAgdHJlYXRtZW50LndlaWdodCA9IHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50Py5pZF0/LndlaWdodCB8fCAwO1xuICAgICAgICBpZiAoIXRyZWF0bWVudC5hY3Rpb25zLnNvbWUoKGEpID0+IGEudmFyaWFudHMpKSBjb250aW51ZTtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlYXRtZW50LmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGlmICh1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzICYmIHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50LmlkXS52YXJpYW50c1t2YXJpYW50S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKGAke3RyZWF0bWVudHMubGVuZ3RofSB0cmVhdG1lbnRzIHVzZXIgZ3JvdXAgbWF0Y2hlZGApO1xuICAgIGlmICghdHJlYXRtZW50cy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJSZXBsYWNlVXRpbHNcIik7XG5cbmNvbnN0IHJlcGxhY2VyID0gYXN5bmMgKHZhbHVlLCByZXBsYWNlRm4pID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBbaSwgdmFsXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBsYWNlRm4gPSBBcnJheS5pc0FycmF5KHJlcGxhY2VGbikgPyByZXBsYWNlRm5baV0gOiByZXBsYWNlRm4gfHwgXCJcIjtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihjdXJyZW50UmVwbGFjZUZuKTtcbiAgICAgICAgdmFsdWVbaV0gPSByZXBsYWNlQWxsKHZhbCwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZVtpXSA9IHJlcGxhY2VGbkV4ZWN1dG9yKGN1cnJlbnRSZXBsYWNlRm4sIHZhbCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSkge1xuICAgIGZvciAoY29uc3QgckZuIG9mIHJlcGxhY2VGbikge1xuICAgICAgaWYgKHR5cGVvZiByRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IockZuKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyRm4sIHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbik7XG4gICAgICB2YWx1ZSA9IHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSwgc2luZ2xlID0gZmFsc2UpIHtcbiAgaWYgKHJlcGxhY2VGbiAmJiB2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkV4ZWN1dGluZyByZXBsYWNlIGZ1bmN0aW9uOiBcIiwgcmVwbGFjZUZuKTtcbiAgICBjb25zdCByZXBsYWNlRnVuY3Rpb24gPSBGdW5jdGlvbihyZXBsYWNlRm4pO1xuICAgIGlmIChzaW5nbGUpIHJldHVybiB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICAgIHJldHVybiByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKSB7XG4gIGNvbnN0IHtzdG9yYWdlLCBrZXksIGtleUZhbGxiYWNrLCB0eXBlfSA9IHJlcGxhY2VGbjtcbiAgc3dpdGNoIChzdG9yYWdlKSB7XG4gICAgY2FzZSBcInNlc3Npb25cIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBudWxsO1xuICAgICAgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlGYWxsYmFjayk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSBKU09OLnBhcnNlKHJlcGxhY2VWYWwpO1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSByZXBsYWNlVmFsW3JlcGxhY2VWYWwubGVuZ3RoIC0gMV1bdHlwZV07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkIG5vdCBwYXJzZSAke3JlcGxhY2VWYWx9YCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgICBjYXNlIFwiaW5mby1sYXllclwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5RmFsbGJhY2spO1xuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VyO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBjb25zdCB7YXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIG9wZXJhdG9yLCBzZWxlY3RvciwgdHlwZSwgdmFsdWV9ID0gY29uZGl0aW9uO1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6IHtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBjb25kaXRpb25FbGVtZW50cykge1xuICAgICAgICBjb25zdCBlbGVtZW50U2t1ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChlbGVtZW50U2t1KTtcbiAgICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAgIC8vIHJ1blRpbWVWYWx1ZSBtYXkgYmUgMFxuICAgICAgICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8IHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgY29udGludWU7XG4gICAgICAgIGVsaWdpYmxlRWxlbWVudHMucHVzaCgkKGVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxpZ2libGVFbGVtZW50cztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi9hY3Rpb24tY29uZGl0aW9uLXV0aWxcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMpIHtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUFwcGx5QWN0aW9uc1wiKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYWN0aW9uOiBcIiwgSlNPTi5zdHJpbmdpZnkoYWN0aW9uKSk7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBhdHRyaWJ1dGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVtb3Zpbmc6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkNhbm5vdCBmb3VuZCBlbGVtZW50IHdpdGggc2VsZWN0b3I6IFwiLCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBpZiAoU3RyaW5nKHZhbHVlKS5pbmNsdWRlcyhcIm5kLWFkZC10by13aW5cIikpIHtcbiAgICAgICAgICAgICQoXCIubmQtYWRkLXRvLXdpblwiKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGFmdGVyOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGVuZGluZyB2YWx1ZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb2RhbFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIGlmIChlbG0gPT0gZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3BsYXlNb2RhbCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBvcHVwXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlBvcHVwIGFscmVhZHkgZGlzcGxheWVkIGluIHNlc3Npb25cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIFBvcHVwOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHBUeXBlKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzZXRhdHRyaWJ1dGVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgICBjYXNlIFwic3JjXCI6XG4gICAgICAgICAgZWxlbWVudC5jc3MoXCJjb250ZW50XCIsIGB1cmwoJHt2YWx1ZS50cmltKCl9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG5cbiAgICAgICAgICBlbGVtZW50LmNzcyhwcm9wZXJ0eSwgcHJvcGVydHlWYWx1ZSwgXCIhaW1wb3J0YW50XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmhhbmRsZWQgYXR0cmlidXRlOiBTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzb3VyY2UucmVtb3ZlKCk7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZX0gPSBib2R5O1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcyA9IFtdO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIHJlYXBwbHlfZXZlbnQsXG4gICAgICByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBwYWdlVHlwZSxcbiAgICAgIHByZXBhcmVBbmRBcHBseSxcbiAgICB9ID0gdGhpcztcblxuICAgIC8vIG9uZSBlbmdhZ2VtZW50IGF0IGEgdGltZVxuICAgIGlmIChlbmdhZ2VtZW50TG9ja1tpZF0pIHtcbiAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBlbmdhZ2VtZW50IGluIHByb2dyZXNzLCBza2lwcGluZ2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSB0cnVlO1xuXG4gICAgaWYgKGRlYnVnTW9kZSAhPT0gMSAmJiAhd2VpZ2h0ICYmICFkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyAmJiAhZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdtb2JpbGUnIG1pc21hdGNoXCIpO1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnZGVza3RvcCcgbWlzbWF0Y2hcIik7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBiYXNlIHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbGV0IHRyZWF0bWVudFNraXBSYXRpbyA9IHdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSB3ZWlnaHQgfHwgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIGlmIChkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICAgIC8vIElmIGRlcGVuZGFudCBvbiB0cmVhdG1lbnQgaXMgZm91bmQgYW5kIGhhcyB3ZWlnaHQ7IHVzZSBpdHMgc2tpcCByYXRpb1xuICAgICAgICBjb25zdCBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbmQoKHQpID0+IHQuaWQgPT09IGRlcGVuZGFudF9vbl90cmVhdG1lbnQpPy53ZWlnaHQ7XG4gICAgICAgIHRyZWF0bWVudFNraXBSYXRpbyA9IGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0ID09PSAxMDAgPyAwIDogKDEwMCAtIGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0IHx8XG4gICAgICAgICAgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgLy8gRGV0ZXJtaW5pbmcgaWRlbnRpZmllciBmb3IgY2FsY3VsYXRpbmcgdHJlYXRtZW50IHBlcmNlbnRhZ2UgKHRyZWF0bWVudFBjdClcbiAgICAgIGNvbnN0IGRldGVybWluaW5nSWRlbnRpZmllciA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQgfHwgaWQ7XG5cbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyAxMDAgd2hlbiBkZWJ1ZyBtb2RlIGlzIDEsIGVuc3VyaW5nIG5vIHRyZWF0bWVudHMgYXJlIHNraXBwZWRcbiAgICAgIGNvbnN0IHRyZWF0bWVudFBjdCA9IGRlYnVnTW9kZSA9PT0gMSA/IDEwMCA6IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgZGV0ZXJtaW5pbmdJZGVudGlmaWVyKTtcbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgbGV0IGJ1c2luZXNzUnVsZUlkID0gbnVsbDtcbiAgICAgIGlmIChidXNpbmVzc1J1bGVTZXQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICBidXNpbmVzc1J1bGVJZCA9IGF3YWl0IHRoaXMuY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCk7XG4gICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgIH0gZWxzZSBsb2dnZXIubG9nKFwiQXBwbHlpbmcgdHJlYXRtZW50IHdpdGggZGVmYXVsdCB2YWx1ZXNcIik7XG4gICAgICB9XG4gICAgICBpZiAodHJlYXRtZW50UGN0IDwgdHJlYXRtZW50U2tpcFJhdGlvKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBza2lwcGVkIGR1ZSB0byB0cmVhdG1lbnQgc3BsaXQgcmF0aW9gKTtcbiAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgbnVsbCwgXCJza2lwcGVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQpO1xuICAgICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDpcIiwgaWQpO1xuICAgICAgZW5nYWdlbWVudExvY2tbdHJlYXRtZW50LmlkXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQpIHtcbiAgICBjb25zdCBbcHJlcGFyZWQsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwcGx5QWN0aW9ucyhwcmVwYXJlZCk7XG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiZmFpbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImFwcGxpZWRcIik7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKSB7XG4gICAgY29uc3Qge3JlQXBwbHlUcmVhdG1lbnRzTWFwLCBtYXRjaGVkVHJlYXRtZW50c30gPSB0aGlzO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJlQXBwbHlUcmVhdG1lbnRzTWFwKSkge1xuICAgICAgY29uc3QgdHJlYXRtZW50SWRzID0gcmVBcHBseVRyZWF0bWVudHNNYXBba2V5XTtcbiAgICAgIGNvbnN0IHJlQXBwbHlUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHMuZmlsdGVyKCh0KSA9PiB0cmVhdG1lbnRJZHMuaW5jbHVkZXModC5pZCkpO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcImluZmluaXRlX3Njcm9sbFwiOiB7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGluZmluaXRlX3Njcm9sbGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRpbWVvdXRcIjoge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHRpbWVvdXRgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRfY2hhbmdlXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseVNlbGVjdG9yTGlzdCA9IEFycmF5LmlzQXJyYXkodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IpID9cbiAgICAgICAgICAgICAgICB0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciA6IFt0cmVhdG1lbnQucmVhcHBseV9zZWxlY3Rvcl07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHJlYXBwbHlTZWxlY3Rvckxpc3QpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gZWxlbWVudF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9uX3Njcm9sbFwiOiB7XG4gICAgICAgICAgLy8gYWRkIHdpbmRvdyBzY3JvbGwgbGlzdGVuZXIsIGNhbGwgZW5nYWdlUm9ib3Qgb24gc2Nyb2xsLCBkbyBub3QgdHJpZ2dlciBtb3JlIHRoYW4gb25jZSBwZXIgMjUwbXNcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUaW1lID0gMDtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IHN0ID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGlmIChub3cgLSBsYXN0U2Nyb2xsVGltZSA+IDI1MCAmJiBNYXRoLmFicyhsYXN0U2Nyb2xsVG9wIC0gc3QpID4gNSkge1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUaW1lID0gbm93O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBvbl9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInF1ZXJ5X3NlYXJjaF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGxldCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCAhPT0gcXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBxdWVyeV9zZWFyY2hfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW50ZXJ2YWxcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseUludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBhcHBsaWVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGlmIChhcHBsaWVkPy5bdHJlYXRtZW50LmlkXSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW50ZXJ2YWxgKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICB9LCAyNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbmZvX2xheWVyX2NoYW5nZVwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgICAgICAgICAgYWRkRGF0YUxpc3RlbmVyKHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSZWFwcGx5IGV2ZW50IG5vdCBmb3VuZDogXCIsIGtleSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZVNldCA9IFtdLCBidXNpbmVzc1J1bGVTZXQgPSBbXSwgaWR9ID0gdHJlYXRtZW50O1xuICAgIGlmICh0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLmluY2x1ZGVzKGlkKSkgcmV0dXJuO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhbLi4uZWxpZ2liaWxpdHlSdWxlU2V0LCAuLi5idXNpbmVzc1J1bGVTZXRdKTtcbiAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBhZGREYXRhTGlzdGVuZXIoYF9fZVJ1bGVzLiR7c2VsZWN0b3J9YCwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgIH1cbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLnB1c2goaWQpO1xuICB9XG5cbiAgZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlU2V0LCBwcmV2aW91c1NlbGVjdG9ycyA9IG51bGwpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBwcmV2aW91c1NlbGVjdG9ycyB8fCBbXTtcbiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAocnVsZS5zdGFydHNXaXRoKFwiIVwiKSkgcnVsZSA9IHJ1bGUuc2xpY2UoMSk7XG4gICAgICAgIHNlbGVjdG9ycy5wdXNoKHJ1bGUuc3BsaXQoXCIuXCIpWzBdKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZS5zZXQsIHNlbGVjdG9ycyk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uKG5ldyBTZXQoc2VsZWN0b3JzKSldO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpIHtcbiAgICBsb2dnZXIubG9nKGBDaGVja2luZyBlbGlnaWJpbGl0eSAke2VsaWdpYmlsaXR5UnVsZX1gKTtcbiAgICBsZXQgb3Bwb3NpdGVGbGFnID0gZmFsc2U7XG4gICAgbGV0IFtlbGlnaWJpbGl0eVNjb3BlLCBlbGlnaWJpbGl0eU5hbWVdID0gZWxpZ2liaWxpdHlSdWxlLnNwbGl0KFwiLlwiKTtcbiAgICBpZiAoZWxpZ2liaWxpdHlTY29wZS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgb3Bwb3NpdGVGbGFnID0gdHJ1ZTtcbiAgICAgIGVsaWdpYmlsaXR5U2NvcGUgPSBlbGlnaWJpbGl0eVNjb3BlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2VsaWdpYmlsaXR5U2NvcGV9YCk7XG4gICAgaWYgKCFyZXMgfHwgIUFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvcHBvc2l0ZUZsYWcgJiYgcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW9wcG9zaXRlRmxhZyAmJiAhcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBsb2dnZXIubG9nKGAke2VsaWdpYmlsaXR5UnVsZX0gaXMgZWxpZ2libGVgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCwgZWxpZ2liaWxpdHlTZXRUeXBlID0gbnVsbCwgcHJldmlvdXNJc0VsaWdpYmxlID0gbnVsbCkge1xuICAgIGxvZ2dlci5sb2coXCJDaGVja2luZyByb2JvdCBlbGlnaWJpbGl0eVwiKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRWxpZ2liaWxpdHkgUnVsZSBTZXQgJHtlbGlnaWJpbGl0eVJ1bGVTZXR9IGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNFbGlnaWJsZSA9IHByZXZpb3VzSXNFbGlnaWJsZTtcbiAgICBmb3IgKGNvbnN0IGVsaWdpYmlsaXR5UnVsZSBvZiBlbGlnaWJpbGl0eVJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgJiYgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVW5rbm93biBlbGlnaWJpbGl0eVNldFR5cGU6IFwiLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZS5zZXQsIGVsaWdpYmlsaXR5UnVsZS50eXBlLCBpc0VsaWdpYmxlKTtcbiAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGluZGV4IG9mIGJ1c2luZXNzUnVsZSwgdGhpcyBpcyB0aGUgYnVzaW5lc3NSdWxlSWRcbiAgYXN5bmMgY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBidXNpbmVzc1J1bGVdIG9mIGJ1c2luZXNzUnVsZVNldC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KFtidXNpbmVzc1J1bGVdKSkgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleFwiO1xuaW1wb3J0IHtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzLFxuICBpbmplY3RTdHlsZVNoZWV0LFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFJvYm90RW5naW5lIGZyb20gXCIuL3JvYm90RW5naW5lXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVPbkNvbXBvbmVudFwiKTtcblxuY29uc3QgYmVhZ2xlT24gPSBhc3luYyAoaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSkgPT4ge1xuICBjb25zdCBwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlID0gU3RvcmUuZ2V0SW5zdGFuY2UoKS5wZXJzaXN0UHJvZHVjdEluZm8oKTtcblxuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSA9IGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBjb25zdCB0cmVhdG1lbnRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50cygpO1xuICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuXG4gIGluamVjdFN0eWxlU2hlZXQoKTtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24taW5pdFwiKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBsZXQgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBudWxsO1xuICBpZiAoZGVidWdNb2RlICYmIHNlYXJjaFBhcmFtcy5pbmNsdWRlcyhcImZpbHRlcj1cIikpIHtcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IHNlYXJjaFBhcmFtcy5zbGljZShcbiAgICAgICAgc2VhcmNoUGFyYW1zLmluZGV4T2YoXCJbXCIpICsgMSxcbiAgICAgICAgc2VhcmNoUGFyYW1zLmxhc3RJbmRleE9mKFwiXVwiKSxcbiAgICApLnNwbGl0KFwiLFwiKS5tYXAoKGl0ZW0pID0+IHBhcnNlSW50KGl0ZW0sIDEwKSk7XG4gIH1cblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgfSwgMzAwMCk7XG5cbiAgY29uc3QgW3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIHRyZWF0bWVudHNQcm9taXNlLCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSxcbiAgXSk7XG5cbiAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgbGV0IG0gPSBcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzL3dlaWdodHNcIjtcbiAgICBpZiAoIXRyZWF0bWVudHMpIG0gPSBtICsgXCIgbm8gdHJlYXRtZW50c1wiO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgbSA9IG0gKyBcIiBubyB0cmVhdG1lbnQgd2VpZ2h0c1wiO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBtKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50cy93ZWlnaHRzXCIpO1xuICB9XG4gIGxvZ2dlci5zdWNjZXNzKFwiRm91bmQgdHJlYXRtZW50czogXCIsIHRyZWF0bWVudHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXRyZWF0bWVudHNcIik7XG5cbiAgY29uc3QgdHJlYXRtZW50UmVwb3NpdG9yeSA9IG5ldyBUcmVhdG1lbnRSZXBvc2l0b3J5KHtcbiAgICB0cmVhdG1lbnRzLFxuICAgIHRyZWF0bWVudFdlaWdodHMsXG4gIH0pO1xuXG4gIGNvbnN0IG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50UmVwb3NpdG9yeS5nZXRNYXRjaGVkVHJlYXRtZW50cygpO1xuICBpZiAoIW1hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aCkge1xuICAgIGxvZ2dlci5sb2coXCJObyB0cmVhdG1lbnRzIG1hdGNoZWQsIHJldHVybmluZyB3aXRob3V0IGZ1cnRoZXIgYWN0aW9uXCIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXJvYm90LW1hdGNoZWRcIik7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlLCBwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlLFxuICBdKTtcblxuICBjb25zdCByb2JvdEVuZ2luZSA9IG5ldyBSb2JvdEVuZ2luZSh7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgZGVidWdNb2RlLFxuICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgIGlkZW50aWZpZXIsXG4gICAgcGFnZVR5cGUsXG4gIH0pO1xuICBhd2FpdCByb2JvdEVuZ2luZS5lbmdhZ2VSb2JvdHMoKTtcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInJvYm90cy1lbmdhZ2VkXCIpO1xuICBsb2dnZXIuc3VjY2VzcyhcIkFwcGxpZWQgdHJlYXRtZW50czogXCIsIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpKTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IFJ1bGVFbmdpbmUuZ2V0RWxpZ2liaWxpdHlSdWxlcygpO1xuICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHJldHVybjtcbiAgY29uc3QgcnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtlbGlnaWJpbGl0eVJ1bGVzfSk7XG4gIGF3YWl0IHJ1bGVFbmdpbmUuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG59XG5leHBvcnQgZGVmYXVsdCBiZWFnbGVPbjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IE1vbml0b3IgZnJvbSBcIi4uL0JlYWdsZU1vbml0b3IvaW5kZXhcIjtcbmltcG9ydCBiZWFnbGVPbiBmcm9tIFwiLi4vQmVhZ2xlT25cIjtcbmltcG9ydCB7XG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBTUExJVF9SQVRJTyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04sXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGdldElkZW50aWZpZXIsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbiAgZGV0ZXJtaW5lUGN0LFxuICBnZXREZWJ1Z01vZGUsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5sZXQgU0hVVERPV04gPSBmYWxzZTtcbmNvbnN0IEZMSVBGTEFHID0gZmFsc2U7XG5cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgbGV0IG1vbml0b3IgPSBudWxsO1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIGluaXRpYWxpemluZ1wiKTtcbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cbiAgbGV0IGVhcmx5TG9nU2VudCA9IGZhbHNlO1xuICBsZXQgaGlkZVJlbW92ZWQgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgaW5pdGlhbGl6aW5nXCIpO1xuICAgIG1vbml0b3IgPSBuZXcgTW9uaXRvcigpO1xuICAgIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIoKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGxldCBjb29raWVQY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiwgY29va2llUGN0KTtcbiAgICAvLyBhZGQgY3VycmVudCBlcG9jaCBpbnRlZ2VyIHRvIGJlYWdsZUluZm9MYXllclxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiLCBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSk7XG5cbiAgICAvLyBkYXRhLWxlc3MgbG9nIHRvIGRldGVjdCBib3VuY2VzXG4gICAgYXdhaXQgbW9uaXRvci5wYWNrQW5kUXVldWVBcnJpdmFsTG9nKCk7XG5cbiAgICBjb25zdCBvb3NSZWFzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSk7XG5cbiAgICAvLyBpZiBjYW5ub3QgZ2V0IGNyaXRpY2FsIGluZm8sIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCB1bnN1cHBvcnRlZFxuICAgIGlmIChcbiAgICAgIGNvb2tpZVBjdCA9PT0gbnVsbCB8fFxuICAgICAgIW5hdmlnYXRvci5zZW5kQmVhY29uIHx8XG4gICAgICB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5wYWRTdGFydCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJ1bnN1cHBvcnRlZFwiKVxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IGRldmljZVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkRldmljZSBkb2VzIG5vdCBoYXZlIHJlcXVpcmVkIGNhcGFiaWxpdGllc1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0xhYmVsU2VudCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCk7XG4gICAgY29uc3QgdGltZW91dENvdW50ZXIgPSBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQpKSB8fCAwO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWcgbW9kZSBpcyBvbiwgYWxzbyBhZGRzIGRibSB0byBiZWFnbGVJbmZvTGF5ZXIgYW5kIHNldHMgb29zUmVhc29uXG4gICAgY29uc3QgZGVidWdNb2RlID0gZ2V0RGVidWdNb2RlKFwiZW1wbG95ZWVcIik7XG5cbiAgICAvLyBpZiB0aW1lZC1vdXQgdG9vIG1hbnkgdGltZXMgZm9yIHZlcnkgZmlyc3QgaW50ZXJhY3RzaW9ucywgbWFrZSBvdXQgb2Ygc2NvcGUgZm9yIHRoZSBzZXNzaW9uXG4gICAgaWYgKCFkZWJ1Z01vZGUgJiYgIW9vc1JlYXNvbiAmJiAhaXNMYWJlbFNlbnQgJiYgdGltZW91dENvdW50ZXIgPiBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTlxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmVhZ2xlIHRpbWVvdXQgdGhyZXNob2xkIHJlYWNoZWRcIik7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cbiAgICAvLyBJRiBubyBhZG1pbiBwYXJhbSBpcyBjb25maWd1cmVzLCB0aGVuIHNraXAgdGhpcyBhZG1pbiBsb2dpYyBjb21wbGV0ZWx5XG5cbiAgICAvLyBWaXZlbnNlIHNwZWNpZmljOiBDaGVjayBpZiB1c2VyIGlzIGFkbWluLCBtYWtpbmcgdGhlbSBvdXQgb2Ygc2NvcGVcbiAgICAvLyBUaGlzIG5lZWRzIHRvIHdhaXQgZm9yIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgdG8gc2V0IHRoZSB2dnNJc1Nob3dyb29tIHZhbHVlXG4gICAgY29uc3QgaXNTaG93cm9vbSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgIGlmIChpc1Nob3dyb29tICYmIChpc1Nob3dyb29tID09PSBcInRydWVcIiB8fCBpc1Nob3dyb29tID09PSB0cnVlKSkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwiZW1wbG95ZWVcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHNob3dyb29tXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBpcyBmcm9tIFZWUyBzaG93cm9vbS9jYWxsY2VudGVyXCIpO1xuICAgIH0gZWxzZSBpZiAoaXNTaG93cm9vbSA9PT0gbnVsbCB8fCBpc1Nob3dyb29tID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBkZXRlcm1pbmUgaWYgdXNlciBpcyBmcm9tIFZWUyBzaG93cm9vbS9jYWxsY2VudGVyXCIpO1xuICAgIH1cblxuICAgIC8vIFRPRE8gcmVmYWN0b3IgYWZ0ZXIgdGFnIGNoYW5nZXMgZ28gbGl2ZVxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1oaWRlXCIpICYmICF3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXh0RGF5LWhpZGVcIikpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJlYWdsZSBzY3JpcHQgdGltZWQgb3V0XCIpO1xuICAgIH1cblxuICAgIC8vIGlzT24gY2FuIGJlIHRydWUgKE9OKSwgZmFsc2UgKE9GRilcbiAgICBsZXQgaXNPbiA9IG51bGw7XG5cbiAgICAvLyBGTElQIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGZsYWdcbiAgICBpZiAoRkxJUEZMQUcpIHtcbiAgICAgIGNvb2tpZVBjdCA9IDk5IC0gY29va2llUGN0O1xuICAgIH1cblxuICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcImVtcGxveWVlXCIpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbikge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB1bmtub3duXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBvdXQgb2Ygc2NvcGUgcmVhc29uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBncmVhdGVyIHRoYW4gU1BMSVRfUkFUSU8sIHRoZW4gaW4gT04gbW9kZVxuICAgICAgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTykge1xuICAgICAgICBpc09uID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidHJ1ZVwifSk7XG4gICAgICB9IGVsc2UgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTy8yKSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UyXCJ9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UxXCJ9KTtcbiAgICAgIH1cblxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJpc09uXCIsIGlzT24pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19MQUJFTF9TRU5ULCB0cnVlKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBpc09uLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBjb29raWUgcGVyY2VudGFnZTogXCIsIGNvb2tpZVBjdCk7XG4gICAgbG9nZ2VyLmxvZyhcIlNwbGl0X3JhdGlvOiBcIiwgU1BMSVRfUkFUSU8pO1xuICAgIGxvZ2dlci5sb2coXCJjb29raWVQY3QgPCBTUExJVF9SQVRJT1wiLCBjb29raWVQY3QgPCBTUExJVF9SQVRJTyk7XG4gICAgbG9nZ2VyLmxvZyhcIlNldCBpc09uOiBcIiwgaXNPbik7XG5cbiAgICAvLyBhd2FpdCBjcml0aWNhbCBpbmZvIGJlZm9yZSBzZW5kaW5nIGxvZ3MgZm9yIHByb3BlciBhbmFseXRpY3MgbWVhc3VyZW1lbnRzXG4gICAgY29uc3QgcGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgaWYgKHBhZ2VUeXBlID09PSBcInB1cmNoYXNlXCIpIHtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBzZW5kIGxvZ3MgaW1tZWRpYXRlbHkgb24gcHVyY2hhc2UgcGFnZSwgYW5kIGZvcmNlIHdhaXRcbiAgICAgIGF3YWl0IG1vbml0b3Iuc2VuZExvZ3ModHJ1ZSk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgU0hVVERPV04gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZW5kIGxvZ3Mgd2hlbiByZWFkeSwgc3RhcnQgc2NyYXBpbmcgYW5kIHNlbmRpbmcgYXN5bmNseVxuICAgICAgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgfVxuICAgIGVhcmx5TG9nU2VudCA9IHRydWU7XG5cbiAgICBpZiAoaXNPbiA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKCFTSFVURE9XTikge1xuICAgICAgICBsb2dnZXIubG9nKFwiQmVhZ2xlIE9OIEdyb3VwIFBhdGhcIik7XG4gICAgICAgIGJlYWdsZU9uKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT04gR3JvdXAgU0hVVERPV04gUGF0aFwiKTtcbiAgICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzT24gPT09IGZhbHNlKSB7XG4gICAgICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBPRkYgR3JvdXAgUGF0aFwiKTtcbiAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgaGlkZVJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpc09uIGlzIHVuZGVmaW5lZCBvciBudWxsXCIpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLndhcm4oXCJCZWFnbGUgRWFybHkgU2NvcGUtb3V0IG9yIEVSUk9SOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBlcnIubWVzc2FnZSk7XG4gICAgaWYgKCFlYXJseUxvZ1NlbnQgJiYgbW9uaXRvcikgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgaWYgKCFoaWRlUmVtb3ZlZCkgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIH1cbn0pKCk7XG4iXSwibmFtZXMiOlsicmVwbGFjZUFsbCIsInN0ciIsImZpbmQiLCJyZXBsYWNlIiwiaW5kZXgiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwidHVya2lzaFRvTG93ZXIiLCJzdHJpbmciLCJsZXR0ZXJzIiwibGV0dGVyIiwidG9Mb3dlckNhc2UiLCJpc1N0YWdpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpbmNsdWRlcyIsIlZFUlNJT04iLCJDT09LSUVfTkFNRSIsIlRSRUFUTUVOVFNfTE9DQVRJT04iLCJUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiIsIlNUWUxFU0hFRVRfTE9DQVRJT04iLCJEYXRlIiwidG9JU09TdHJpbmciLCJFX1JVTEVTX0xPQ0FUSU9OIiwiUFJPRFVDVF9JTkZPX0xPQ0FUSU9OIiwiTE9HX0FQSV9VUkwiLCJMT09LVVBfQVBJX1VSTCIsIk1PQklMRV9NRURJQV9RVUVSWSIsIlNQTElUX1JBVElPIiwiVFJFQVRNRU5UX1JBVElPIiwiVFJFQVRNRU5UU19EVVJBVElPTiIsIk1BWF9USU1FT1VUX1BFUl9TRVNTSU9OIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlRSRUFUTUVOVFMiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJUSU1FT1VUX0NPVU5UIiwiU0VTU0lPTl9SRUZFUlJFUiIsIldFSUdIVFMiLCJFTElHSUJJTElUWV9SVUxFUyIsIkxPQ0FMX1NUT1JBR0VfS0VZUyIsIkRFQlVHX01PREUiLCJPVVRfT0ZfU0NPUEUiLCJJU19MQUJFTF9TRU5UIiwiVVNFUl9JRCIsIkRBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkUiLCJDVVNUT01fU1RPUkFHRV9QUkVGSVgiLCJMb2dnZXIiLCJvcmlnaW4iLCJ0ZXN0aW5nIiwiREVCVUciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXJncyIsImNvbnNvbGUiLCJpbmZvIiwibG9nIiwibWVzc2FnZUNvbmZpZyIsImZvckVhY2giLCJhcmd1bWVudCIsInR5cGUiLCJ3YXJuIiwiZXJyb3IiLCJhZGRUb0JlYWdsZUluZm9MYXllciIsImxvZ2dlciIsIm1vbnRocyIsInJlbW92ZURvY3VtZW50SGlkZSIsInRvcCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZmV0Y2hUcmVhdG1lbnRzIiwiZmV0Y2hQbHVzIiwidHJlYXRtZW50cyIsImpzb24iLCJqc29uVHJlYXRtZW50IiwiZmFpbGVkIiwibWVzc2FnZSIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsImZldGNoUHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mbyIsInRleHQiLCJwcm9kdWN0SW5mb0NTViIsImNzdlRvQXJyYXkiLCJ0aW1lb3V0IiwidGltZSIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJzZXRUaW1lb3V0IiwiYWJvcnQiLCJ1cmwiLCJvcHRpb25zIiwic2lnbmFsIiwicmV0cmllcyIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwiRXJyb3IiLCJzdGF0dXMiLCJjYXRjaCIsImV4dHJhY3RDb29raWVJZGVudGlmaWVyIiwiY29va2llU3RyaW5nIiwiY29va2llTmFtZSIsInBhcnNlZCIsInNwbGl0IiwibWFwIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsInRyaW0iLCJpZGVudGlmaWVyIiwiaWRlbnRpZmllckluZGV4IiwiZGV0ZXJtaW5lUGN0IiwiaGFzaCIsImdldFVuc2VjdXJlSGFzaCIsInBjdCIsImV4aXRTY3JvbGxMaXN0ZW5lciIsImNhbGxCYWNrIiwibG9vcCIsInNjcm9sbFRvcCIsImxhc3RTY3JvbGxUb3AiLCJjbGVhckludGVydmFsIiwiZXhpdFNjcm9sbEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJzdHlsZUFwcGxpY2F0b3IiLCJlbGVtZW50cyIsInN0eWxlQ2hhbmdlc01hcCIsImkiLCJlbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbHVlIiwic3R5bGUiLCJpbmplY3RTdHlsZVNoZWV0Iiwic3R5bGVTaGVldCIsImNyZWF0ZUVsZW1lbnQiLCJyZWwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwcmVwYXJlQWN0aW9ucyIsImFjdGlvbnNUb1ByZXBhcmUiLCJidXNpbmVzc1J1bGVJZCIsImFjdGlvbnMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ2YXJpYW50IiwiYWN0aW9uIiwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zIiwidmFyaWFudHMiLCJidXNpbmVzc1RyYW5zZm9ybWF0aW9uIiwiaWQiLCJrZXlzIiwidmFyaWFudEtleSIsInJhbmRvbVBjdCIsIndlaWdodCIsImluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzIiwicG9wdXBEaXNwbGF5RmxhZyIsInNlc3Npb25TdG9yYWdlIiwic2Vzc2lvblRpbWVzdGFtcCIsInNlc3Npb25IaXN0b3J5Iiwic2V0SXRlbSIsIm5vdyIsInBhdGhuYW1lIiwiY29uZGl0aW9uQ2hlY2tlciIsInJ1blRpbWVWYWx1ZSIsImNvbmRpdGlvbiIsInN1Y2Nlc3MiLCJ1bmRlZmluZWQiLCJtaW4iLCJtYXgiLCJwYXJzZUludCIsInJlZ2V4IiwiUmVnRXhwIiwidGVzdCIsImdldERlYnVnTW9kZSIsIm9vc1JlYXNvbiIsInF1ZXJ5U3RyaW5nIiwic2VhcmNoIiwicmVtb3ZlSXRlbSIsImN1cnJlbnQiLCJnZXRHYUNsaWVudElkIiwiZ2EiLCJnZXRBbGwiLCJ0cmFja2VycyIsImdldCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiTWF0aCIsImFicyIsImdldFJhbmRvbUludCIsImZsb29yIiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJleHRyYWN0SWRlbnRpZmllckludGVydmFsIiwiZSIsImRlbGF5IiwibXMiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJkYXRlIiwicmVzdWx0Iiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwibWF0Y2giLCJ0b2RheSIsInN0YXJ0WWVhciIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJlbmRZZWFyIiwiZXN0aW1hdGVkU3RhcnQiLCJlc3RpbWF0ZWRFbmQiLCJzdGFydERpZmZPdmVyRGF5cyIsImNlaWwiLCJlbmREaWZmT3ZlckRheXMiLCJzdGFydERpZmZPdmVyV2Vla3MiLCJlbmREaWZmT3ZlcldlZWtzIiwiZXJyIiwiaWRsZVRpbWVyIiwidGltZU91dCIsInJlc2V0VGltZXIiLCJjbGVhclRpbWVvdXQiLCJpZGxlVGltZW91dCIsIm9udG91Y2hzdGFydCIsImdldEJyb3dzZXJUeXBlIiwidXNlckFnZW50IiwibmF2aWdhdG9yIiwiaXNPd25NdXRhdGlvbiIsIm11dGF0aW9uTGlzdCIsIm5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsInNvbWUiLCJuIiwidGFnTmFtZSIsImMiLCJzdHJEYXRhIiwic3RyRGVsaW1pdGVyIiwib2JqUGF0dGVybiIsImFyckRhdGEiLCJhcnJNYXRjaGVzIiwiZXhlYyIsInN0ck1hdGNoZWREZWxpbWl0ZXIiLCJwdXNoIiwic3RyTWF0Y2hlZFZhbHVlIiwiY29uZmlnIiwiZGJOYW1lIiwidmVyc2lvbiIsIm1haW50ZW5hbmNlT3BlcmF0aW9uQ291bnQiLCJzdG9yZSIsIm5hbWUiLCJpbmRleGVzIiwiZmllbGRzIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCJfd2luZG93IiwiYWxsdGltZSIsInNlc3Npb24iLCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXIiLCJpbmRleGVkREIiLCJpbml0Iiwib3BlblJlcXVlc3QiLCJvcGVuIiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJvbGRWZXJzaW9uIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImlkeCIsImNyZWF0ZUluZGV4Iiwib25lcnJvciIsIm9uc3VjY2VzcyIsImRiIiwiZGVsZXRlUmVxdWVzdCIsImRlbGV0ZURhdGFiYXNlIiwicmVqZWN0IiwiaW50ZXJ2YWwiLCJyZWFkd3JpdGUiLCJnZXRDb25uZWN0aW9uIiwidHgiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiZGF0YU5hbWUiLCJkYXRhVmFsdWUiLCJpbml0VHJhbnNhY3Rpb24iLCJzZXNzaW9uSWQiLCJnZXRDdXJyZW50U2Vzc2lvbklkIiwicm91bmQiLCJwYXlsb2FkIiwicHV0Iiwib3AiLCJzdG9yZWQiLCJnZXRDdXJzb3IiLCJjdXJzb3IiLCJ0YXJnZXQiLCJjb250aW51ZSIsIm1pbm1heCIsIk1hcCIsImhhcyIsInNldCIsImdyb3VwQnkiLCJkYXRhIiwiY291bnQiLCJ0b3RhbCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwib3BlbkN1cnNvciIsIklEQktleVJhbmdlIiwib25seSIsInRvU3RyaW5nIiwiaW5kZXhWYWx1ZSIsInN1bSIsInNpemUiLCJ2YWx1ZXMiLCJkIiwic2V0SG91cnMiLCJnZXRIb3VycyIsInBhZFN0YXJ0IiwiZ2V0RGF0ZSIsIkNvbGxlY3RvckFwaSIsImNvbGxlY3RvckFwaSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWUiLCJxdWVyeU1ldGhvZCIsInF1ZXJ5UHJvbWlzZSIsImF2ZyIsIm1vZGUiLCJsYXN0IiwiZGF0YVZhbHVlcyIsIm9iaiIsImRhdGFfdmFsdWUiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJzYXZlIiwiYmVhZ2xlSW5mb0xheWVyIiwiYSIsImYiLCJfX2h3bSIsInNlYXJjaFBhdGhzIiwiUGFnZVR5cGVEZXBlbmQiLCJtZXRob2QiLCJzZWxlY3RvciIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJvYnNlcnZlciIsImNoaWxkcmVuIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSIsImluZm9MYXllciIsInR5cGVkVmFsdWUiLCJsYXN0S2V5IiwicG9wIiwidXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciIsInBhc3NWYWx1ZVRvTGlzdGVuZXJzIiwiREFUQV9MSVNURU5FUlMiLCJhZGREYXRhTGlzdGVuZXIiLCJsaXN0ZW5lciIsImxpc3RlbmVycyIsImlzQXJyYXkiLCJnZXRGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYmxvY2tpbmciLCJwb2xsSW50ZXJ2YWwiLCJvYnRhaW5EYXRhIiwianNvbkdldCIsInNlYXJjaEVsZW1lbnQiLCJpc0ZvdW5kIiwiaXNJZ25vcmUiLCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYWRkVHJlYXRtZW50IiwiZGVwZW5kYW50X29uX3RyZWF0bWVudCIsIlBBUlNFU0VBUkNITUFYUkVUUlkiLCJQQVJTRVNFQVJDSFNUQVJUREVMQVkiLCJwYXJzZVNlYXJjaFBhdGhzRGVsYXkiLCJwYXJzZVNlYXJjaFBhdGhzUmV0cnkiLCJpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIiwicHJlcGFyZUNvcmVEYXRhIiwicGFyc2VyQ2FsbGVyIiwiYWRkTWV0cmljcyIsImNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWVzIiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJwcm9jZXNzRm9ybWF0dGVyIiwidG9VcHBlckNhc2UiLCJzZWFyY2hPYmoiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJxdWVyeVNlbGVjdG9yIiwidG9CZVVwZGF0ZWQiLCJjaGlsZCIsImNoaWxkRWxlbWVudHMiLCJmaWx0ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwidHJpZ2dlclJlc3RhcnQiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImlubmVyVGV4dCIsImF0dHJpYlZhbHVlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZWNoaWxkIiwiYXR0cmliVmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRWYWx1ZSIsInN1bVByaWNlIiwiY2hpbGRUZXh0IiwiYXJyYXlJbm5lclRleHQiLCJleGNsdXNpdmVFbGVtZW50IiwiY3VzdG9tRGF0YURlcml2YXRpb25zIiwiY3VycmVudFBhZ2VUeXBlIiwiYWxsIiwiaXNDYXJ0RW1wdHkiLCJ0b3RhbEJhc2VQcmljZSIsImNvdXBvbk5vdEFwcGxpY2FibGUiLCJwcmljZXMiLCJxdWFudGl0aWVzIiwidG90YWxQcmljZSIsImNvdXBvbkFwcGxpY2FibGVBbW91bnQiLCJza3UiLCJza3VMaXN0IiwicGFyc2VTZWFyY2hQYXRocyIsImRvbVN0YXR1cyIsInJlYWR5U3RhdGUiLCJ3aW50b3AiLCJkYXRhTGF5ZXIiLCJ3aW5kb2MiLCJmb3VuZE5hbWVzIiwiU2V0IiwicHJldkZvdW5kTmFtZXMiLCJub3RGb3VuZE5hbWVzIiwiYWRkIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJqb2luIiwicGF0aCIsInBhdGhBcnJheSIsInN1YlBhdGgiLCJzbGljZSIsInN1YkFycmF5Iiwic3ViS2V5Iiwic3ViVmFsdWUiLCJ3aW5kb3dQdHIiLCJuYXZQdHIiLCJwbGF0Zm9ybSIsInVzZXJBZ2VudERhdGEiLCJkZXZpY2VQaXhlbFJhdGlvIiwiYXZhaWxXaW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJ3aW5kb3dEZXB0aCIsImNvbG9yRGVwdGgiLCJwaXhlbERlcHRoIiwidnBvcnRTaGFwZSIsInZpc3VhbFZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJpT1MiLCJvcmllbnRhdGlvbkFuZ2xlIiwib3JpZW50YXRpb24iLCJhbmdsZSIsInRlbXAiLCJoaXN0b3J5IiwibmF2QWdlbnQiLCJicmFuZHMiLCJicmFuZCIsIm1vYmlsZSIsImhhcmR3YXJlQ29uY3VycmVuY3kiLCJsYW5ndWFnZSIsImJyb3dzZXJMYW5ndWFnZSIsInN5c3RlbUxhbmd1YWdlIiwidXNlckxhbmd1YWdlIiwibWF4VG91Y2hQb2ludHMiLCJ2ZW5kb3IiLCJjb25uZWN0aW9uIiwiZG93bmxpbmsiLCJjdXJyZW50VVJMIiwiVVJMIiwiaG9zdG5hbWUiLCJkb05vdFRyYWNrIiwibXNEb05vdFRyYWNrIiwicmVmZXJyZXIiLCJmaXJzdFNlc3Npb25SZWZlcnJlciIsInBhZ2VUeXBlIiwicGVyZk1ldHJpY3MiLCJwZXJmTmF2aWdhdGlvbk1ldHJpY3MiLCJwZXJmb3JtYW5jZSIsImdldEVudHJpZXNCeVR5cGUiLCJjb25uZWN0IiwiY29ubmVjdEVuZCIsImNvbm5lY3RTdGFydCIsInJlcXVlc3QiLCJyZXNwb25zZUVuZCIsInJlcXVlc3RTdGFydCIsImRvbSIsImRvbUludGVyYWN0aXZlIiwiZG9tQ29tcGxldGUiLCJsb2FkIiwibG9hZEV2ZW50RW5kIiwibG9hZEV2ZW50U3RhcnQiLCJkdXJhdGlvbiIsInNjaGVtYU9yZ0VsdHMiLCJzb3JnQXJyYXkiLCJzVGFnIiwiY250bnQiLCJ0ZXh0Q29udGVudCIsImpzb25jb250ZW50IiwiSEVBREVSUyIsIk1vbml0b3IiLCJoYXNBcnJpdmFsTG9nU2VudCIsImhhc01haW5Mb2dTZW50IiwiaGFzVXBkYXRlc1NlbnQiLCJoaWdoV2F0ZXJNYXJrIiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsImltbWVkaWF0ZSIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwiaHdtIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJib2R5IiwibGMiLCJ1Iiwib25IYXNoUGN0IiwiQmxvYiIsInN0YXJ0c1dpdGgiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xvc2VFdmVudCIsImNhcHR1cmUiLCJzZW5kQmVhY29uIiwicXVldWVkIiwicXVldWVJbnRlcnZhbCIsImNoZWNrRGF0YUxheWVyUnVsZSIsInJ1bGUiLCJvcGVyYXRvciIsImRhdGFMYXllckZpbmRlciIsInJ1bnRpbWVWYWx1ZSIsImNoZWNrRWxlbWVudFJ1bGUiLCJzZWxlY3RvckFsbCIsInNlbGVjdG9yRmFsbGJhY2siLCJtYWluU2VsZWN0b3IiLCJ0ZW1wVmFsIiwicmV0dXJuVmFsIiwiZWxlbSIsImVsZW1lbnRTdHlsZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwiY2hlY2tGdW5jdGlvblJ1bGUiLCJydWxlRnVuY3Rpb24iLCJGdW5jdGlvbiIsImNoZWNrU2Vzc2lvblJ1bGUiLCJkdXJhdGlvbkhhbmRsZXIiLCJoaXN0b3J5SGFuZGxlciIsImdldFNlc3Npb25UaW1lc3RhbXAiLCJjdXJyZW50SGlzdG9yeSIsImNoZWNrVXJsUnVsZSIsInJlcXVlc3RVUkwiLCJjaGVja0VudlJ1bGUiLCJpc01vYmlsZSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSIsInRpbWVzdGFtcCIsImNsZWFyUmVxdWVzdCIsImNsZWFyIiwiZ2V0UmVxdWVzdCIsImNvdW50UmVxdWVzdCIsImN1cnNvclJlcXVlc3QiLCJleGlzdGluZ1Byb2RJbmZvIiwiZWxhcHNlZFNlY29uZHMiLCJwcm9kdWN0SW5mb1Byb21pc2UiLCJjbGVhclByb21pc2UiLCJwcm9kdWN0SW5mb0FycmF5IiwicHJlcGFyZVBheWxvYWRzIiwicGF5bG9hZHMiLCJmaWVsZE5hbWVzIiwic2hpZnQiLCJTdG9yZSIsImluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsImNoZWNrUHJvZHVjdEluZm9SdWxlIiwiZ2V0VHJhbnNhY3Rpb25Db3VudCIsImdldEFkZFRvQ2FydENvdW50IiwiZ2V0UHJldmlld0NvdW50Iiwic2FsZUNudFZpc2l0b3JzSW4xNSIsImNhcnRDbnRWaXNpdG9yc0luMTUiLCJ2aWV3Q250VmlzaXRvcnNJbjEiLCJNdXRleCIsIlJ1bGVFbmdpbmUiLCJiYXNlUnVsZVNldCIsImFkZGVkRGF0YUxpc3RlbmVycyIsIm11dGV4IiwiY2hlY2tSdWxlIiwicnVsZVNhdGlzZmllZCIsImNoYWluIiwiY2hhaW5fY29uZGl0aW9uIiwicnVsZXMiLCJzYXRpc2ZpZWRSdWxlSWRzIiwic2V0VXBMaXN0ZW5lcnMiLCJhY3F1aXJlIiwicmVsZWFzZSIsImlzRWxpZ2libGUiLCJmaWx0ZXJlZCIsImsiLCJkYXRhTGF5ZXJSdWxlcyIsImVsZW1lbnRSdWxlcyIsImJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsImJpbmQiLCJtdXRhdGlvblJlY29yZCIsImV2ZXJ5IiwiZWxlbWVudFRvT2JzZXJ2ZSIsInBhcmVudE5vZGUiLCJjb21wdXRlU2VnbWVudCIsInNlZ21lbnQiLCJydWxlU2V0Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJidXNpbmVzc1J1bGVTZXQiLCJjaGVja1J1bGVzIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsInVzZXJHcm91cCIsInVzZXJHcm91cFdlaWdodHMiLCJ0cmVhdG1lbnQiLCJ0cmVhdG1lbnRzT2JqIiwidHJlYXRtZW50V2l0aFRpbWVzdGFtcCIsImVsYXBzZWREYXlzIiwid2VpZ2h0cyIsInJlcGxhY2VyIiwicmVwbGFjZUZuIiwidmFsIiwiY3VycmVudFJlcGxhY2VGbiIsInJlcGxhY2VPYmplY3RFeHRyYWN0b3IiLCJyZXBsYWNlVmFsIiwicmVwbGFjZUZuRXhlY3V0b3IiLCJyRm4iLCJzaW5nbGUiLCJyZXBsYWNlRnVuY3Rpb24iLCJzdG9yYWdlIiwia2V5RmFsbGJhY2siLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImF0dHJpYnV0ZSIsImlubmVyX2NvbmRpdGlvbiIsImVsaWdpYmxlRWxlbWVudHMiLCJjb25kaXRpb25FbGVtZW50cyIsImVsZW1lbnRTa3UiLCIkIiwiYXBwbHlBY3Rpb25zIiwidHJhbnNmb3JtZXIiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwibWRDb25kaXRpb24iLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJwVHlwZSIsInByb2R1Y3RJbmZvU3RvcmFnZSIsIm1jIiwiU3RyaW5nIiwiYmVmb3JlIiwiYWZ0ZXIiLCJhcHBlbmQiLCJvZmYiLCJjcmVhdGVQb3B1cCIsImVsbSIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3BsYXlNb2RhbCIsImdldFByb2R1Y3RJbmZvIiwiZGlzcGxheVBvcHVwIiwiciIsInB1c2hTdGF0ZSIsInN0YXRlIiwib25jZSIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsImNzcyIsInByb3BlcnR5IiwicHJvcGVydHlWYWx1ZSIsImF0dHIiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJwcmVwZW5kIiwic2VudGVuY2UiLCJ3b3JkIiwiY2hhckF0IiwidG9Mb2NhbGVVcHBlckNhc2UiLCJyZXBsYWNlV2l0aFZhbCIsImh0bWxTdHIiLCJ0aXRsZXMiLCJwYXJzZWRUaXRsZXMiLCJwYXJzZWRUaXRsZSIsImhpZGRlbiIsImhhbmRsZVBvcHVwQ2xpY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlTW9kYWxDbGljayIsImNvbnRhaW5zIiwiaGlkZSIsInFQb3B1cCIsImdldEVsZW1lbnRCeUlkIiwiaXNNb2RhbCIsInBvcHVwV3JhcHBlciIsInBvcHVwQ2xvc2VCdXR0b24iLCJwb3B1cENsb3NlQnV0dG9uU3R5bGUiLCJvbmNsaWNrIiwiY29udGVudHMiLCJzcmMiLCJ0ZW1wbGF0ZSIsImlubmVySFRNTCIsInBvcHVwIiwiY29udGVudCIsImZpcnN0Q2hpbGQiLCJwMSIsInAyIiwiaTEiLCJpMiIsImlzRXF1YWxOb2RlIiwiaW5zZXJ0QmVmb3JlIiwid2FpdEZvckpRdWVyeSIsImpRdWVyeSIsImpRdWVyeUludGVydmFsIiwiYWN0aW9uQXBwbGljYXRvciIsIk9CU0VSVkVSX0NPTkZJRyIsImF0dHJpYnV0ZXMiLCJSb2JvdEVuZ2luZSIsImRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzIiwiZGVidWdNb2RlIiwibWF0Y2hlZFRyZWF0bWVudHMiLCJlbmdhZ2VtZW50TG9jayIsInJlQXBwbHlUcmVhdG1lbnRzTWFwIiwiYWRkZWREYXRhTGlzdGVuZXJJZHMiLCJlbmdhZ2VSb2JvdCIsImluaXRpYXRlUmVhcHBseVJvYm90TWFwIiwiZWxpZ2liaWxpdHlSdWxlU2V0IiwiZGV2aWNlIiwicmVhcHBseV9ldmVudCIsInJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIiwicHJlcGFyZUFuZEFwcGx5IiwicmVhcHBseV9ldmVudF9hcnJheSIsInJlYXBwbHlFdmVudCIsInByZXZpb3VzVmFsdWUiLCJjaGVja0VsaWdpYmlsaXR5UnVsZVNldCIsInRyZWF0bWVudFNraXBSYXRpbyIsImRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0IiwidCIsImRldGVybWluaW5nSWRlbnRpZmllciIsInRyZWF0bWVudFBjdCIsImNoZWNrQnVzaW5lc3NSdWxlcyIsImFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzIiwicHJlcGFyZWQiLCJ0cmVhdG1lbnRJZHMiLCJyZUFwcGx5VHJlYXRtZW50cyIsIlJlc2l6ZU9ic2VydmVyIiwicmVhcHBseVNlbGVjdG9yTGlzdCIsInJlYXBwbHlfc2VsZWN0b3IiLCJsYXN0U2Nyb2xsVGltZSIsImdldFRpbWUiLCJzdCIsInBhZ2VZT2Zmc2V0IiwicmVhcHBseUludGVydmFsIiwiYXBwbGllZCIsImJvdW5kRW5nYWdlVHJlYXRtZW50Iiwic2VsZWN0b3JzIiwiZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyIsInByZXZpb3VzU2VsZWN0b3JzIiwiZWxpZ2liaWxpdHlSdWxlIiwib3Bwb3NpdGVGbGFnIiwiZWxpZ2liaWxpdHlTY29wZSIsImVsaWdpYmlsaXR5TmFtZSIsImVsaWdpYmlsaXR5U2V0VHlwZSIsInByZXZpb3VzSXNFbGlnaWJsZSIsImNoZWNrRWxpZ2liaWxpdHkiLCJidXNpbmVzc1J1bGUiLCJiZWFnbGVPbiIsInBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UiLCJwZXJzaXN0UHJvZHVjdEluZm8iLCJlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSIsImFzc2VzRWxpZ2liaWxpdHlSdWxlcyIsInRyZWF0bWVudHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50cyIsInRyZWF0bWVudFdlaWdodHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50V2VpZ2h0cyIsInNlYXJjaFBhcmFtcyIsImxhc3RJbmRleE9mIiwiaXRlbSIsIm0iLCJ0cmVhdG1lbnRSZXBvc2l0b3J5IiwiZ2V0TWF0Y2hlZFRyZWF0bWVudHMiLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsImdldEVsaWdpYmlsaXR5UnVsZXMiLCJydWxlRW5naW5lIiwiU0hVVERPV04iLCJGTElQRkxBRyIsIm1vbml0b3IiLCJlYXJseUxvZ1NlbnQiLCJoaWRlUmVtb3ZlZCIsImNvb2tpZVBjdCIsInBhY2tBbmRRdWV1ZUFycml2YWxMb2ciLCJwcm90b3R5cGUiLCJHTE9WX09OIiwiaXNMYWJlbFNlbnQiLCJ0aW1lb3V0Q291bnRlciIsImlzU2hvd3Jvb20iLCJpc09uIiwic2VuZExvZ3MiXSwic291cmNlUm9vdCI6IiJ9
