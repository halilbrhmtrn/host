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
var LIST_MODE_BEAGLE_KEYS = (/* unused pure expression or super */ null && (["pagetype", "category", "alltimePLPCategoryMode", "sessionPLPCategoryMode", "alltimePDPCategoryMode", "sessionPDPCategoryMode", "alltimeCartCategoryMode", "sessionCartCategoryMode"])); // TODO set to 120000(ms) before go live

var IDLE_TIMEOUT = 15000;
var SESSION_STORAGE_KEYS = {
  SESSION_TIMESTAMP: "BG_SessionTimestamp",
  SESSION_HISTORY: "BG_SessionHistory",
  TREATMENTS: "BG_Treatments",
  POPUP_DISPLAY_FLAG: "BG_PopupDisplayFlag",
  SKU_INFO_BASKET: "BG_ProductInfoBasket",
  TIMEOUT_COUNT: "BG_TimeoutCount",
  SESSION_REFERRER: "BG_SessionReferrer"
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
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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






function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = api_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function api_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return api_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return api_arrayLikeToArray(o, minLen); }

function api_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var logger = new src_logger("BeagleDataCollectionWrapper");
var _window = {
  alltime: "alltime",
  session: "session"
};

var BeagleDataCollectionWrapper = /*#__PURE__*/function () {
  function BeagleDataCollectionWrapper() {
    _classCallCheck(this, BeagleDataCollectionWrapper);

    this.indexedDB = null;
    this.init();
  }

  _createClass(BeagleDataCollectionWrapper, [{
    key: "init",
    value: function init() {
      var _window$top$indexedDB,
          _this = this;

      logger.log("Initializing indexedDB");
      var openRequest = (_window$top$indexedDB = window.top.indexedDB) === null || _window$top$indexedDB === void 0 ? void 0 : _window$top$indexedDB.open(store_config.dbName, store_config.version);

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
              logger.failed("Could not delete outdated database", err.message);
            }

            break;
        }

        try {
          var _config$store$indexes;

          var store = openRequest.result.createObjectStore(store_config.store.name, store_config.store.options);

          if (((_config$store$indexes = store_config.store.indexes) === null || _config$store$indexes === void 0 ? void 0 : _config$store$indexes.length) > 0) {
            var _iterator = _createForOfIteratorHelper(store_config.store.indexes),
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
          logger.failed("Could not create object store on database", err.message);
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
                _iterator2 = _createForOfIteratorHelper(data);

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
    key: "find",
    value: function () {
      var _find = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(keyName) {
        var _this8 = this;

        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise(function (resolve, reject) {
                  try {
                    _this8.initTransaction().then(function (store) {
                      _this8.getCursor(store, keyName).onsuccess = function (event) {
                        var cursor = event.target.result;
                        console.log(cursor.request.result.value.data_value);
                        resolve(cursor.request.result.value.data_value);
                      };
                    });
                  } catch (error) {
                    logger.failed("cannot find ".concat(keyName, " on the indexdb store"));
                    resolve(null);
                  }
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function find(_x6) {
        return _find.apply(this, arguments);
      }

      return find;
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





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



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
var BeagleInfoLayer_logger = new src_logger("BeagleInfoLayer");
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

  if (Array.isArray(listeners) && listeners.length > 0) {
    listeners.forEach(function (listener) {
      if (typeof listener === "function") {
        BeagleInfoLayer_logger.log("Passing value ".concat(value, " to listeners of key ").concat(key));
        listener(value);
      }
    });
  }
};

var getFromBeagleInfoLayer = function getFromBeagleInfoLayer(key) {
  var blocking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var pollInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
  return getAnyFromBeagleInfoLayer([key], blocking, pollInterval, timeout);
};

var getAnyFromBeagleInfoLayer = function getAnyFromBeagleInfoLayer(keys) {
  var blocking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var pollInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
  // TODO: check featureEngineering and search list if all marked as found but value is missing
  var infoLayer = window.top.beagleInfoLayer; // return null if keys is missing or not an array or has no elements

  if (!keys || !Array.isArray(keys) || !keys.length) return null;
  var obtainData;

  var _iterator = BeagleInfoLayer_createForOfIteratorHelper(keys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      obtainData = jsonGet(infoLayer, key);

      if (obtainData !== null && obtainData !== undefined) {
        // found data for key
        return Promise.resolve(obtainData);
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
        var _iterator2 = BeagleInfoLayer_createForOfIteratorHelper(keys),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var key = _step2.value;
            obtainData = jsonGet(infoLayer, key);

            if (obtainData !== null && obtainData !== undefined) {
              // found data for key, clear interval and resolve
              clearInterval(interval);
              resolve(obtainData);
              break;
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
  if (businessRuleId !== null || businessRuleId !== undefined) value.businessRuleId = businessRuleId;
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
  "__features.SKUsonBasketLookup": [{
    updateMethod: "last"
  }, {
    queryMethod: "last(1)",
    window: "session",
    featureName: "__features.SKUsonLastBasketLookup"
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
  }]
};

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
}(); // TODO: convert to name --> array of selectors


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
  name: "__features.SKUsonPLP",
  operand: "docQueryAttribValueList",
  value: "data-product-sku"
}, {
  PageTypeDepend: "Listingpage",
  method: "DocQuery",
  selector: ".product-list",
  observer: "listingItemBlock",
  name: "__listingItemBlockObserver",
  children: ["__features.SKUsonPLP"],
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

          var observer = new MutationObserver( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
            var triggerRestart;
            return regenerator_default().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    // update found status of the elements in the children list
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

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          })));
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
    var currentPageType, _yield$Promise$all, _yield$Promise$all2, isCartEmpty, totalBasePrice, couponNotApplicable, prices, quantities, totalPrice, i, couponApplicableAmount, newSKUList, sku, skuList, _skuList, prevSKUList, diffSKUList, diffProductInfo, oldProductInfo, newProductInfo, updatedSKUs;

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
            // update active SKU list
            newSKUList = []; // Product page

            if (!(currentPageType === "Productpage")) {
              _context5.next = 32;
              break;
            }

            _context5.next = 28;
            return getFromBeagleInfoLayer("pdp.sku");

          case 28:
            sku = _context5.sent;

            if (sku !== null && sku !== undefined) {
              newSKUList = [sku];
            }

            _context5.next = 44;
            break;

          case 32:
            if (!(currentPageType === "basket")) {
              _context5.next = 39;
              break;
            }

            _context5.next = 35;
            return getFromBeagleInfoLayer("cart.skus");

          case 35:
            skuList = _context5.sent;

            if (skuList !== null && Array.isArray(skuList) && skuList.length) {
              newSKUList = skuList;
            }

            _context5.next = 44;
            break;

          case 39:
            if (!(currentPageType === "Listingpage")) {
              _context5.next = 44;
              break;
            }

            _context5.next = 42;
            return getFromBeagleInfoLayer("__features.SKUsonPLP");

          case 42:
            _skuList = _context5.sent;

            if (_skuList !== null && Array.isArray(_skuList) && _skuList.length) {
              newSKUList = _skuList;
            }

          case 44:
            _context5.next = 46;
            return getFromBeagleInfoLayer("__features.SKUsAlreadyLookedUp");

          case 46:
            _context5.t1 = _context5.sent;

            if (_context5.t1) {
              _context5.next = 49;
              break;
            }

            _context5.t1 = [];

          case 49:
            prevSKUList = _context5.t1;
            // get difference between new and old SKU list
            diffSKUList = newSKUList.filter(function (x) {
              return !prevSKUList.includes(x);
            });

            if (!(diffSKUList && diffSKUList.length > 0)) {
              _context5.next = 69;
              break;
            }

            _context5.next = 54;
            return productInfoLookup(diffSKUList);

          case 54:
            _context5.t2 = _context5.sent;

            if (_context5.t2) {
              _context5.next = 57;
              break;
            }

            _context5.t2 = {};

          case 57:
            diffProductInfo = _context5.t2;
            _context5.next = 60;
            return getFromBeagleInfoLayer("__features.SKUsonPageLookup");

          case 60:
            _context5.t3 = _context5.sent;

            if (_context5.t3) {
              _context5.next = 63;
              break;
            }

            _context5.t3 = {};

          case 63:
            oldProductInfo = _context5.t3;
            // add diff product info to old product info
            newProductInfo = _objectSpread(_objectSpread({}, oldProductInfo), diffProductInfo);
            addToBeagleInfoLayer("__features.SKUsonPageLookup", newProductInfo);

            if (currentPageType === "basket") {
              addToBeagleInfoLayer("__features.SKUsonBasketLookup", newProductInfo);
            }

            updatedSKUs = prevSKUList.concat(diffSKUList);
            addToBeagleInfoLayer("__features.SKUsAlreadyLookedUp", updatedSKUs);

          case 69:
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

            addToBeagleInfoLayer("v", "0.0.37");
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

var productInfoLookupInProgress = false;
var productInfoLookup = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10(skulist) {
    var headers, productInfo;
    return regenerator_default().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!(!skulist || skulist.length === 0)) {
              _context10.next = 3;
              break;
            }

            BeagleInfoLayer_logger.failed("productInfoLookup: No sku found");
            return _context10.abrupt("return", null);

          case 3:
            if (!productInfoLookupInProgress) {
              _context10.next = 6;
              break;
            }

            BeagleInfoLayer_logger.failed("productInfoLookup: Already in progress");
            return _context10.abrupt("return", null);

          case 6:
            BeagleInfoLayer_logger.log("productInfoLookup: Starting product info lookup: " + skulist);
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            productInfoLookupInProgress = true;
            productInfo = null;
            _context10.prev = 11;
            _context10.next = 14;
            return fetch(LOOKUP_API_URL, {
              method: "POST",
              body: JSON.stringify(skulist),
              headers: headers,
              mode: "cors"
            });

          case 14:
            productInfo = _context10.sent;

            if (!productInfo.ok) {
              _context10.next = 19;
              break;
            }

            _context10.next = 18;
            return productInfo.json();

          case 18:
            productInfo = _context10.sent;

          case 19:
            _context10.next = 24;
            break;

          case 21:
            _context10.prev = 21;
            _context10.t0 = _context10["catch"](11);
            BeagleInfoLayer_logger.warn("productInfoLookup: fetch & parse failed");

          case 24:
            productInfoLookupInProgress = false;
            return _context10.abrupt("return", productInfo);

          case 26:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[11, 21]]);
  }));

  return function productInfoLookup(_x3) {
    return _ref10.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/utils.js



function utils_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/* eslint-disable max-len */



var utils_logger = new src_logger("BeagleUtils");
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
  window.top.document.documentElement.classList.remove("nextDay-hide");
};
var fetchTreatments = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
    var treatments, jsonTreatment;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            utils_logger.log("Fetching treatments");
            _context.next = 3;
            return fetch(TREATMENTS_LOCATION);

          case 3:
            treatments = _context.sent;
            _context.next = 6;
            return treatments.json();

          case 6:
            jsonTreatment = _context.sent;
            return _context.abrupt("return", jsonTreatment);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
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
            utils_logger.log("Fetching treatment weights");
            _context2.next = 3;
            return fetch(TREATMENT_WEIGHTS_LOCATION);

          case 3:
            treatmentWeights = _context2.sent;
            _context2.next = 6;
            return treatmentWeights.json();

          case 6:
            jsonTreatmentWeights = _context2.sent;
            return _context2.abrupt("return", jsonTreatmentWeights);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
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
            utils_logger.log("Fetching eligibility rules");
            _context3.next = 4;
            return fetch(E_RULES_LOCATION);

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
            utils_logger.failed("Could not fetch eligibility rules", _context3.t0.message);
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
            utils_logger.log("Fetching product info");
            _context4.prev = 1;
            _context4.next = 4;
            return fetch(PRODUCT_INFO_LOCATION);

          case 4:
            productInfo = _context4.sent;
            _context4.next = 7;
            return productInfo.text();

          case 7:
            productInfoCSV = _context4.sent;
            return _context4.abrupt("return", csvToArray(productInfoCSV));

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](1);
            utils_logger.failed("Could not fetch product info", _context4.t0.message);
            return _context4.abrupt("return", null);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 11]]);
  }));

  return function fetchProductInfo() {
    return _ref4.apply(this, arguments);
  };
}();
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
            utils_logger.error(_context5.t0);
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
  utils_logger.log("Applying style changes", styleChangesMap, "to elements", elements);

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
            _iterator = utils_createForOfIteratorHelper(actions);
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
              _iterator2 = utils_createForOfIteratorHelper(businessRuleTransformations);

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

            _iterator3 = utils_createForOfIteratorHelper(variants[variantKey].businessRuleTransformations);
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
      utils_logger.success("conditionChecker: -satisfied- target does not exist");
      return true;
    }

    utils_logger.failed("conditionChecker: -not satisfied- target does exist");
    return false;
  }

  if (runTimeValue === null || runTimeValue === undefined || condition === null || condition === undefined) {
    utils_logger.failed("conditionChecker: runTimeValue or condition is not defined");
    return false;
  }

  switch (condition) {
    case "exist":
      if (runTimeValue) {
        utils_logger.success("conditionChecker: -satisfied- target does exist");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target does not exist");
      return false;

    case "includes":
    case "contains":
      if (runTimeValue.includes(value)) {
        utils_logger.success("conditionChecker: -satisfied- target contains value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target does not contain value");
      return false;

    case "notIncludes":
    case "notContains":
      if (!runTimeValue.includes(value)) {
        utils_logger.success("conditionChecker: -satisfied- target does not contain value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target contains value");
      return false;

    case "equal":
      if (runTimeValue === value) {
        utils_logger.success("conditionChecker: -satisfied- target equals value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target does not equal value");
      return false;

    case "notEqual":
      if (runTimeValue !== value) {
        utils_logger.success("conditionChecker: -satisfied- target does not equal value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target equals value");
      return false;

    case "greaterThan":
      if (runTimeValue > value) {
        utils_logger.success("conditionChecker: -satisfied- target is greater than value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target is not greater than value");
      return false;

    case "lessThan":
      if (runTimeValue < value) {
        utils_logger.success("conditionChecker: -satisfied- target is less than value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target is not less than value");
      return false;

    case "greaterEquals":
      if (runTimeValue >= value) {
        utils_logger.success("conditionChecker: -satisfied- target is greater or equal than value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target is not greater or equal than value");
      return false;

    case "lessEquals":
      if (runTimeValue <= value) {
        utils_logger.success("conditionChecker: -satisfied- target is less or equal than value");
        return true;
      }

      utils_logger.failed("conditionChecker: -not satisfied- target is not less or equal than value");
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
          utils_logger.success("conditionChecker: -satisfied- target is between min and max");
          return true;
        }

        utils_logger.failed("conditionChecker: -not satisfied- target is not between min and max");
        return false;
      }

    case "regex":
      {
        var regex = new RegExp(value, "i");
        return regex.test(runTimeValue);
      }

    default:
      utils_logger.failed("conditionChecker: condition is not defined ", condition);
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
        utils_logger.log("getIdentifier: got identifier from local storage", id);
        resolve(id);
        return;
      }

      id = getGaClientId();

      if (id !== null && id !== undefined) {
        utils_logger.log("getIdentifier: got identifier from ga in first attempt", id);
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, id);
        resolve(id);
        return;
      } else {
        var extractIdentifierInterval = setInterval(function () {
          id = getGaClientId();

          if (id !== null && id !== undefined) {
            utils_logger.log("getIdentifier: got identifier from ga", id);
            clearInterval(extractIdentifierInterval);
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, id);
            resolve(id);
          }
        }, 25);
        setTimeout(function () {
          clearInterval(extractIdentifierInterval);

          if (id === null || id === undefined) {
            utils_logger.failed("Could not read GA client id");
            resolve(null);
          }
        }, 5000);
      }
    } catch (e) {
      utils_logger.failed("Error in getIdentifier", e);
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
;// CONCATENATED MODULE: ./src/BeagleMonitor/index.js









var BeagleMonitor_logger = new src_logger("BeagleMonitor");
var HEADERS = {
  type: "text/plain"
};
var Monitor = /*#__PURE__*/function () {
  function Monitor() {
    _classCallCheck(this, Monitor);

    BeagleMonitor_logger.log("Initializing monitor");
    this.aHash = null;
    this.eHash = null;
    this.fHash = null;
    this.hasArrivalLogSent = false;
    this.hasMainLogSent = false;
    this.hasUpdatesSent = false;
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
                // TODO: make beagleinfolayer access to track changes and keep a high water mark to understand changes
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
    }() // keep previous hashes and compute current for a, e, f and return true if any of them have changed

  }, {
    key: "checkForLatestChanges",
    value: function () {
      var _checkForLatestChanges = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        var _yield$Promise$all, _yield$Promise$all2, a, e, f, _yield$Promise$all3, _yield$Promise$all4, aHash, eHash, fHash, hasChanged;

        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Promise.all([getFromBeagleInfoLayer("a"), getFromBeagleInfoLayer("e"), getFromBeagleInfoLayer("f")]);

              case 2:
                _yield$Promise$all = _context6.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
                a = _yield$Promise$all2[0];
                e = _yield$Promise$all2[1];
                f = _yield$Promise$all2[2];
                _context6.next = 9;
                return Promise.all([getUnsecureHash(JSON.stringify(a)), getUnsecureHash(JSON.stringify(e)), getUnsecureHash(JSON.stringify(f))]);

              case 9:
                _yield$Promise$all3 = _context6.sent;
                _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
                aHash = _yield$Promise$all4[0];
                eHash = _yield$Promise$all4[1];
                fHash = _yield$Promise$all4[2];
                hasChanged = false;

                if (aHash !== this.aHash || eHash !== this.eHash || fHash !== this.fHash) {
                  hasChanged = true;
                }

                this.aHash = aHash;
                this.eHash = eHash;
                this.fHash = fHash;
                return _context6.abrupt("return", hasChanged);

              case 20:
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
        var _yield$Promise$all5, _yield$Promise$all6, url, hash, cookieGaId, view_epoch, body;

        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Promise.all([getFromBeagleInfoLayer("u"), getFromBeagleInfoLayer("onHashPct"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);

              case 2:
                _yield$Promise$all5 = _context7.sent;
                _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 4);
                url = _yield$Promise$all6[0];
                hash = _yield$Promise$all6[1];
                cookieGaId = _yield$Promise$all6[2];
                view_epoch = _yield$Promise$all6[3];
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
        var _yield$Promise$all7, _yield$Promise$all8, a, e, f, cookieGaId, view_epoch, body;

        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return Promise.all([getFromBeagleInfoLayer("a"), getFromBeagleInfoLayer("e"), getFromBeagleInfoLayer("f"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);

              case 2:
                _yield$Promise$all7 = _context9.sent;
                _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 5);
                a = _yield$Promise$all8[0];
                e = _yield$Promise$all8[1];
                f = _yield$Promise$all8[2];
                cookieGaId = _yield$Promise$all8[3];
                view_epoch = _yield$Promise$all8[4];
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
        var store, timeStamp, _iterator2, _step2, load;

        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.initTransaction(true);

              case 2:
                store = _context2.sent;
                timeStamp = Math.round(Date.now() / 1000);

                if (Array.isArray(payload)) {
                  _iterator2 = GlovProductInfoRepository_createForOfIteratorHelper(payload);

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      load = _step2.value;
                      load.timeStamp = timeStamp;
                      store.put(load);
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                } else {
                  payload.timeStamp = timeStamp;
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
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(sku) {
        var _this3 = this;

        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve) {
                  _this3.initTransaction().then(function (store) {
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
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "count",
    value: function () {
      var _count = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var _this4 = this;

        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve) {
                  _this4.initTransaction().then(function (store) {
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
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function count() {
        return _count.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: "getCursor",
    value: function () {
      var _getCursor = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var _this5 = this;

        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve) {
                  _this5.initTransaction().then(function (store) {
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
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getCursor() {
        return _getCursor.apply(this, arguments);
      }

      return getCursor;
    }()
  }, {
    key: "persistProductInfo",
    value: function () {
      var _persistProductInfo = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        var existingProdInfo, cursor, timeStamp, elapsedSeconds, productInfoArray;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.count();

              case 2:
                existingProdInfo = _context6.sent;

                if (!existingProdInfo) {
                  _context6.next = 13;
                  break;
                }

                GlovProductInfoRepository_logger.log("Existing product info found");
                _context6.next = 7;
                return this.getCursor();

              case 7:
                cursor = _context6.sent;
                timeStamp = cursor.value.timeStamp;
                elapsedSeconds = Date.now() / 1000 - timeStamp;

                if (!(elapsedSeconds < 3600)) {
                  _context6.next = 12;
                  break;
                }

                return _context6.abrupt("return");

              case 12:
                GlovProductInfoRepository_logger.log("Existing product info is expired");

              case 13:
                _context6.next = 15;
                return fetchProductInfo();

              case 15:
                productInfoArray = _context6.sent;

                if (!(!productInfoArray || !productInfoArray.length)) {
                  _context6.next = 18;
                  break;
                }

                return _context6.abrupt("return");

              case 18:
                _context6.next = 20;
                return this.save(this.preparePayloads(productInfoArray));

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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


var store_Store = function () {
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

/* harmony default export */ var store = (store_Store);
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
            return getFromBeagleInfoLayer("__features.SKUsonPageLookup");

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
                  _context3.next = 29;
                  break;
                }

                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], rules = _Object$entries$_i[1];
                satisfiedRuleIds = [];
                _iterator2 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                _context3.prev = 5;

                _iterator2.s();

              case 7:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 17;
                  break;
                }

                rule = _step2.value;
                _context3.next = 11;
                return this.checkRule(rule);

              case 11:
                if (!_context3.sent) {
                  _context3.next = 15;
                  break;
                }

                satisfiedRuleIds.push(rule.name); // Page type rules are exclusive; if one is true all others are false by default, no need to assess others

                if (!(key === "PageType")) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("break", 17);

              case 15:
                _context3.next = 7;
                break;

              case 17:
                _context3.next = 22;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](5);

                _iterator2.e(_context3.t0);

              case 22:
                _context3.prev = 22;

                _iterator2.f();

                return _context3.finish(22);

              case 25:
                addToBeagleInfoLayer("eRules.".concat(key), satisfiedRuleIds);

              case 26:
                _i++;
                _context3.next = 1;
                break;

              case 29:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 19, 22, 25]]);
      }));

      function assesEligibilityRules() {
        return _assesEligibilityRules.apply(this, arguments);
      }

      return assesEligibilityRules;
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
            return _context.abrupt("return", "default");

          case 19:
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
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return fetchTreatmentWeights();

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                BeagleTreatmentRepository_logger.warn(_context3.t0.message);
                return _context3.abrupt("return", null);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 6]]);
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
            runTimeValue = productInfo === null || productInfo === void 0 ? void 0 : productInfo[operator];

            if (runTimeValue) {
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
                        operator = action.operator, type = action.type, applyEvent = action.applyEvent, contentSelector = action.contentSelector, selector = action.selector, selectorFallback = action.selectorFallback, mdCondition = action.mdCondition, move_selector_1 = action.move_selector_1, move_selector_2 = action.move_selector_2, replaceFn = action.replaceFn, pType = action.pType, attribute = action.attribute;

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
                        return getProductInfo(pType, value);

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
                        return getProductInfo(pType, value);

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
              var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(type, value) {
                var skuList, res, productInfo;
                return regenerator_default().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return getFromBeagleInfoLayer("__features.SKUsonPageLookup");

                      case 2:
                        skuList = _context2.sent;
                        res = null;

                        if (!(!skuList || skuList.length === 0)) {
                          _context2.next = 7;
                          break;
                        }

                        logger.log("No sku found");
                        return _context2.abrupt("return", null);

                      case 7:
                        _context2.next = 9;
                        return Store.getInstance().get(skuList[0]);

                      case 9:
                        productInfo = _context2.sent;
                        _context2.t0 = type;
                        _context2.next = _context2.t0 === "transactionIn2Weeks" ? 13 : _context2.t0 === "addToCartIn2Weeks" ? 16 : _context2.t0 === "productViewCount" ? 19 : 22;
                        break;

                      case 13:
                        res = replaceWithVal(productInfo.saleCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing transcationIn2Weeks ", productInfo.saleCntVisitorsIn15);
                        return _context2.abrupt("break", 23);

                      case 16:
                        res = replaceWithVal(productInfo.cartCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing AddToCartCount ", productInfo.cartCntVisitorsIn15);
                        return _context2.abrupt("break", 23);

                      case 19:
                        res = replaceWithVal(productInfo.viewCntVisitorsIn1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing productViewCount for", productInfo.viewCntVisitorsIn1);
                        return _context2.abrupt("break", 23);

                      case 22:
                        logger.failed("no such type found for productInfoLookup operator: " + type);

                      case 23:
                        return _context2.abrupt("return", res);

                      case 24:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function getProductInfo(_x3, _x4) {
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

              return function handleDocumentTitleTabChange(_x5, _x6, _x7) {
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

              return function actionApplicator(_x8) {
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
                } // TODO get sku list based on productInfo Storage (i.e sku list of last basket vs current page)


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
                  _context3.next = 62;
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
                  _context3.next = 59;
                  break;
                }

                _context3.next = 56;
                return prepareAndApply(id, identifier, actions, businessRuleId);

              case 56:
                engagementLock[id] = false;
                _context3.next = 60;
                break;

              case 59:
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                  return regenerator_default().wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return prepareAndApply(id, identifier, actions, businessRuleId);

                        case 2:
                          engagementLock[id] = false;

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })), delay);

              case 60:
                _context3.next = 64;
                break;

              case 62:
                robotEngine_logger.failed("Rule check failed for treatment: ", id);
                engagementLock[treatment.id] = false;

              case 64:
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
      var _this = this;

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

                    _this.engageRobot(treatment);
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

                    _this.engageRobot(treatment);
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

                          _this.engageRobot(treatment);
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

                      _this.engageRobot(treatment);
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

                      _this.engageRobot(treatment);
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
                          return _this.engageRobot(treatment);

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

                var boundEngageTreatment = _this.engageRobot.bind(_this, treatment);

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
    key: "checkEligibility",
    value: function () {
      var _checkEligibility = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(eligibilityRule) {
        var oppositeFlag, _eligibilityRule$spli, _eligibilityRule$spli2, eligibilityScope, eligibilityName, res;

        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                oppositeFlag = false;
                _eligibilityRule$spli = eligibilityRule.split("."), _eligibilityRule$spli2 = _slicedToArray(_eligibilityRule$spli, 2), eligibilityScope = _eligibilityRule$spli2[0], eligibilityName = _eligibilityRule$spli2[1];

                if (eligibilityScope.startsWith("!")) {
                  oppositeFlag = true;
                  eligibilityScope = eligibilityScope.slice(1);
                }

                _context6.next = 5;
                return getFromBeagleInfoLayer("eRules.".concat(eligibilityScope));

              case 5:
                res = _context6.sent;

                if (!(!res || !Array.isArray(res))) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", false);

              case 8:
                if (!(oppositeFlag && res.includes(eligibilityName))) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", false);

              case 10:
                if (!(!oppositeFlag && !res.includes(eligibilityName))) {
                  _context6.next = 12;
                  break;
                }

                return _context6.abrupt("return", false);

              case 12:
                return _context6.abrupt("return", true);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function checkEligibility(_x6) {
        return _checkEligibility.apply(this, arguments);
      }

      return checkEligibility;
    }()
  }, {
    key: "checkEligibilityRuleSet",
    value: function () {
      var _checkEligibilityRuleSet = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7(eligibilityRuleSet) {
        var eligibilitySetType,
            previousIsEligible,
            isEligible,
            _iterator11,
            _step11,
            eligibilityRule,
            _args7 = arguments;

        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                eligibilitySetType = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : null;
                previousIsEligible = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : null;
                robotEngine_logger.log("Checking robot eligibility");

                if (Array.isArray(eligibilityRuleSet)) {
                  _context7.next = 6;
                  break;
                }

                robotEngine_logger.failed("Eligibility Rule Set ".concat(eligibilityRuleSet, " is not an array"));
                return _context7.abrupt("return", false);

              case 6:
                isEligible = previousIsEligible;
                _iterator11 = robotEngine_createForOfIteratorHelper(eligibilityRuleSet);
                _context7.prev = 8;

                _iterator11.s();

              case 10:
                if ((_step11 = _iterator11.n()).done) {
                  _context7.next = 55;
                  break;
                }

                eligibilityRule = _step11.value;

                if (!(typeof eligibilityRule === "string")) {
                  _context7.next = 49;
                  break;
                }

                if (eligibilitySetType) {
                  _context7.next = 21;
                  break;
                }

                _context7.next = 16;
                return this.checkEligibility(eligibilityRule);

              case 16:
                isEligible = _context7.sent;

                if (isEligible) {
                  _context7.next = 19;
                  break;
                }

                return _context7.abrupt("return", false);

              case 19:
                _context7.next = 47;
                break;

              case 21:
                if (!eligibilitySetType) {
                  _context7.next = 47;
                  break;
                }

                if (!(isEligible === null)) {
                  _context7.next = 27;
                  break;
                }

                _context7.next = 25;
                return this.checkEligibility(eligibilityRule);

              case 25:
                isEligible = _context7.sent;
                return _context7.abrupt("continue", 53);

              case 27:
                _context7.t0 = eligibilitySetType;
                _context7.next = _context7.t0 === "or" ? 30 : _context7.t0 === "and" ? 37 : 44;
                break;

              case 30:
                _context7.t1 = isEligible;

                if (_context7.t1) {
                  _context7.next = 35;
                  break;
                }

                _context7.next = 34;
                return this.checkEligibility(eligibilityRule, eligibilitySetType);

              case 34:
                _context7.t1 = _context7.sent;

              case 35:
                isEligible = _context7.t1;
                return _context7.abrupt("break", 47);

              case 37:
                _context7.t2 = isEligible;

                if (!_context7.t2) {
                  _context7.next = 42;
                  break;
                }

                _context7.next = 41;
                return this.checkEligibility(eligibilityRule, eligibilitySetType);

              case 41:
                _context7.t2 = _context7.sent;

              case 42:
                isEligible = _context7.t2;
                return _context7.abrupt("break", 47);

              case 44:
                robotEngine_logger.failed("Unknown eligibilitySetType: ", eligibilitySetType);
                isEligible = false;
                return _context7.abrupt("break", 47);

              case 47:
                _context7.next = 53;
                break;

              case 49:
                if (!(_typeof(eligibilityRule) === "object")) {
                  _context7.next = 53;
                  break;
                }

                _context7.next = 52;
                return this.checkEligibilityRuleSet(eligibilityRule.set, eligibilityRule.type, isEligible);

              case 52:
                isEligible = _context7.sent;

              case 53:
                _context7.next = 10;
                break;

              case 55:
                _context7.next = 60;
                break;

              case 57:
                _context7.prev = 57;
                _context7.t3 = _context7["catch"](8);

                _iterator11.e(_context7.t3);

              case 60:
                _context7.prev = 60;

                _iterator11.f();

                return _context7.finish(60);

              case 63:
                return _context7.abrupt("return", isEligible);

              case 64:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[8, 57, 60, 63]]);
      }));

      function checkEligibilityRuleSet(_x7) {
        return _checkEligibilityRuleSet.apply(this, arguments);
      }

      return checkEligibilityRuleSet;
    }() // Return index of businessRule, this is the businessRuleId

  }, {
    key: "checkBusinessRules",
    value: function () {
      var _checkBusinessRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8(businessRuleSet) {
        var _iterator12, _step12, _step12$value, index, businessRule;

        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _iterator12 = robotEngine_createForOfIteratorHelper(businessRuleSet.entries());
                _context8.prev = 1;

                _iterator12.s();

              case 3:
                if ((_step12 = _iterator12.n()).done) {
                  _context8.next = 11;
                  break;
                }

                _step12$value = _slicedToArray(_step12.value, 2), index = _step12$value[0], businessRule = _step12$value[1];
                _context8.next = 7;
                return this.checkEligibilityRuleSet([businessRule]);

              case 7:
                if (!_context8.sent) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", index);

              case 9:
                _context8.next = 3;
                break;

              case 11:
                _context8.next = 16;
                break;

              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8["catch"](1);

                _iterator12.e(_context8.t0);

              case 16:
                _context8.prev = 16;

                _iterator12.f();

                return _context8.finish(16);

              case 19:
                return _context8.abrupt("return", null);

              case 20:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 13, 16, 19]]);
      }));

      function checkBusinessRules(_x8) {
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
    var persistProductInfoPromise, eligibilityRulesAssessPromise, treatmentsPromise, treatmentWeightsPromise, searchParams, debugFilteredTreatments, _yield$Promise$all, _yield$Promise$all2, treatments, treatmentWeights, treatmentRepository, matchedTreatments, robotEngine;

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
            searchParams = window.location.search;
            debugFilteredTreatments = null;

            if (debugMode && searchParams.includes("filter=")) {
              debugFilteredTreatments = searchParams.slice(searchParams.indexOf("[") + 1, searchParams.lastIndexOf("]")).split(",").map(function (item) {
                return parseInt(item, 10);
              });
            }

            setTimeout(function () {
              removeDocumentHide();
            }, 2000);
            _context.next = 12;
            return Promise.all([treatmentsPromise, treatmentWeightsPromise]);

          case 12:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            treatments = _yield$Promise$all2[0];
            treatmentWeights = _yield$Promise$all2[1];
            BeagleOn_logger.success("Found treatments: ", treatments);
            treatmentRepository = new BeagleTreatmentRepository({
              treatments: treatments,
              treatmentWeights: treatmentWeights
            });
            _context.next = 20;
            return treatmentRepository.getMatchedTreatments();

          case 20:
            matchedTreatments = _context.sent;

            if (matchedTreatments.length) {
              _context.next = 25;
              break;
            }

            BeagleOn_logger.log("No treatments matched, returning without further action");
            removeDocumentHide();
            return _context.abrupt("return");

          case 25:
            _context.next = 27;
            return Promise.all([eligibilityRulesAssessPromise, persistProductInfoPromise]);

          case 27:
            robotEngine = new RobotEngine({
              debugFilteredTreatments: debugFilteredTreatments,
              debugMode: debugMode,
              matchedTreatments: matchedTreatments,
              identifier: identifier,
              pageType: pageType
            });
            _context.next = 30;
            return robotEngine.engageRobots();

          case 30:
            removeDocumentHide();
            _context.t0 = BeagleOn_logger;
            _context.next = 34;
            return getFromBeagleInfoLayer("a");

          case 34:
            _context.t1 = _context.sent;

            _context.t0.success.call(_context.t0, "Applied treatments: ", _context.t1);

          case 36:
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
            eligibilityRules = null;
            _context2.next = 3;
            return fetchEligibilityRules();

          case 3:
            eligibilityRules = _context2.sent;

            if (eligibilityRules) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            ruleEngine = new RuleEngine({
              eligibilityRules: eligibilityRules
            });
            _context2.next = 9;
            return ruleEngine.assesEligibilityRules();

          case 9:
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
          if (window.top.document.documentElement.classList.contains("nextDay-hide")) {
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
          _context.next = 79;
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
          _context.next = 79;
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
          isOn = cookiePct >= SPLIT_RATIO;
          addToBeagleInfoLayer("isOn", isOn);
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT, true);
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: isOn.toString()
          });
          addToBeagleInfoLayer("GLOV_ON", isOn.toString());

        case 79:
          logger.log("Found cookie percentage: ", cookiePct);
          logger.log("Split_ratio: ", SPLIT_RATIO);
          logger.log("cookiePct < SPLIT_RATIO", cookiePct < SPLIT_RATIO);
          logger.log("Set isOn: ", isOn); // await critical info before sending logs for proper analytics measurements

          _context.next = 85;
          return getFromBeagleInfoLayer("PageType", true);

        case 85:
          pageType = _context.sent;

          if (!(pageType === "purchase")) {
            _context.next = 96;
            break;
          }

          _context.next = 89;
          return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);

        case 89:
          _context.next = 91;
          return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);

        case 91:
          _context.next = 93;
          return monitor.sendLogs(true);

        case 93:
          // if purchase is complete, do not apply any treatments on the confirmation page
          SHUTDOWN = true;
          _context.next = 97;
          break;

        case 96:
          // send logs when ready, start scraping and sending asyncly
          monitor.sendLogs(false);

        case 97:
          earlyLogSent = true;

          if (!(isOn === true)) {
            _context.next = 102;
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

          _context.next = 109;
          break;

        case 102:
          if (!(isOn === false)) {
            _context.next = 108;
            break;
          }

          logger.info("Beagle OFF Group Path");
          removeDocumentHide();
          hideRemoved = true;
          _context.next = 109;
          break;

        case 108:
          throw new Error("isOn is undefined or null");

        case 109:
          _context.next = 117;
          break;

        case 111:
          _context.prev = 111;
          _context.t0 = _context["catch"](6);
          logger.warn("Beagle Early Scope-out or ERROR: ", _context.t0.message);
          addToBeagleInfoLayer("m", _context.t0.message);
          if (!earlyLogSent && monitor) monitor.sendLogs(false);
          if (!hideRemoved) removeDocumentHide();

        case 117:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[6, 111]]);
}))();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUErQzs7Ozs7Ozs7QUNBL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsTUFBTTtBQUNOLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBRCxLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlTW9uaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZGF0YUxheWVyQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZWxlbWVudENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2Z1bmN0aW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvc2Vzc2lvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3VybENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VudkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9wcm9kdWN0SW5mb0NoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL3JlcGxhY2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlT24vcm9ib3RFbmdpbmUuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVPbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUNsaWVudFNESy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGNvbnN0IHJlcGxhY2VBbGwgPSAoc3RyLCBmaW5kLCByZXBsYWNlID0gXCJcIikgPT4ge1xuICBpZiAoIXN0cikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIHN0cjtcblxuICB3aGlsZSAoc3RyLmluZGV4T2YoZmluZCkgPj0gMCkge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gICAgc3RyID0gKGluZGV4ID4gMCA/IHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpIDogXCJcIikgKyByZXBsYWNlICsgc3RyLnN1YnN0cmluZyhpbmRleCArIGZpbmQubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5leHBvcnQgY29uc3QgdHVya2lzaFRvTG93ZXIgPSAoc3RyKSA9PiB7XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XG4gIGxldCBzdHJpbmcgPSBzdHI7XG4gIGNvbnN0IGxldHRlcnMgPSB7XCLEsFwiOiBcImlcIiwgXCJJXCI6IFwixLFcIiwgXCLFnlwiOiBcIsWfXCIsIFwixJ5cIjogXCLEn1wiLCBcIsOcXCI6IFwiw7xcIiwgXCLDllwiOiBcIsO2XCIsIFwiw4dcIjogXCLDp1wifTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygoW8SwScWexJ7DnMOHw5ZdKSkvZywgZnVuY3Rpb24obGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlcnNbbGV0dGVyXTtcbiAgfSk7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuL3N0cmluZ1V0aWxzXCI7XG5jb25zdCBpc1N0YWdpbmcgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJzdGFnaW5nLnZpdmVuc2VcIikgOiB0cnVlO1xuXG5leHBvcnQgY29uc3QgQ09PS0lFX05BTUUgPSBcIl9nYVwiO1xuLy8gVE9ETyByZXZlcnQgdGhlIGZvbGxvd2luZyBzdGFnaW5nIGVudiBjaGVjayBhZnRlciBtb3ZpbmcgdG8gbmV3IGJyYW5jaCBzdHJ1Y3R1cmVcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50cy5qc29uXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTVFlMRVNIRUVUX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlc19zdGFnaW5nLmNzc1wiIDogYGh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzLmNzcz9pZD0ke3JlcGxhY2VBbGwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMykucmVwbGFjZShcIlRcIiwgXCJcIiksIFwiLVwiLCBcIlwiKX1gO1xuZXhwb3J0IGNvbnN0IEVfUlVMRVNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFBST0RVQ1RfSU5GT19MT0NBVElPTiA9IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9zb2NpYWwtcHJvb2YudHh0XCI7XG5leHBvcnQgY29uc3QgTE9HX0FQSV9VUkwgPSBcImh0dHBzOi8vZXVyb3BlLXdlc3QzLW5leHRkYXktMzRlYjMuY2xvdWRmdW5jdGlvbnMubmV0L2FwaS9sb2dcIjtcbmV4cG9ydCBjb25zdCBMT09LVVBfQVBJX1VSTCA9IFwiaHR0cHM6Ly9jYXRhbG9nLWFwaS5hZG9yYWFpLmNvbVwiO1xuZXhwb3J0IGNvbnN0IE1PQklMRV9NRURJQV9RVUVSWSA9IFwiKG1heC13aWR0aDogNDQwcHgpXCI7XG4vLyBDb250cm9sIGdyb3VwIHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBTUExJVF9SQVRJTyA9IDUwO1xuLy8gU2tpcHBlZCB0cmVhdG1lbnQgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9SQVRJTyA9IDUwO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVFNfRFVSQVRJT04gPSAxO1xuZXhwb3J0IGNvbnN0IE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OID0gMTtcbmV4cG9ydCBjb25zdCBMSVNUX01PREVfQkVBR0xFX0tFWVMgPSBbXCJwYWdldHlwZVwiLCBcImNhdGVnb3J5XCIsIFwiYWxsdGltZVBMUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QTFBDYXRlZ29yeU1vZGVcIixcbiAgXCJhbGx0aW1lUERQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBEUENhdGVnb3J5TW9kZVwiLCBcImFsbHRpbWVDYXJ0Q2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvbkNhcnRDYXRlZ29yeU1vZGVcIl07XG4gIC8vIFRPRE8gc2V0IHRvIDEyMDAwMChtcykgYmVmb3JlIGdvIGxpdmVcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFRJTUVPVVRfQ09VTlQ6IFwiQkdfVGltZW91dENvdW50XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBPVVRfT0ZfU0NPUEU6IFwiQkdfT3V0T2ZTY29wZVwiLFxuICBJU19MQUJFTF9TRU5UOiBcIkJHX0xhYmVsU2VudFwiLFxuICBVU0VSX0lEOiBcIkJHX1VzZXJJZF8wMFwiLFxuICBEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFOiBcIkJHX0NvbGxlY3Rpb25EYXRhU2l6ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9TVE9SQUdFX1BSRUZJWCA9IFwiQkdfU2VnX1wiO1xuIiwiaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVN9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3Iob3JpZ2luID0gXCJCZWFnbGUgQ2xpZW50IFNES1wiLCB0ZXN0aW5nID0gZmFsc2UpIHtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICBpZiAodGVzdGluZykge1xuICAgICAgdGhpcy5ERUJVRyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuREVCVUcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkRFQlVHX01PREUpO1xuICAgIH1cbiAgfVxuXG4gIGluZm8oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmluZm8oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBsb2coLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKERFQlVHKSB7XG4gICAgICBjb25zb2xlLmxvZyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBmYWlsZWQoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiByZWRcIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBzdWNjZXNzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogZ3JlZW5cIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICB3YXJuKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS53YXJuKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgZXJyb3IoLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmVycm9yKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50OiAxMDAwLCAvLyBhZmZlY3RzIHZlcnNpb25cbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImRhdGFcIixcbiAgICBpbmRleGVzOiBbe1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZVwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcInNlc3Npb25faWRcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwiZGF0YV92YWx1ZVwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcImlkXCIsIGF1dG9JbmNyZW1lbnQ6IHRydWV9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7Z2V0QnJvd3NlclR5cGV9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXJcIik7XG5jb25zdCBfd2luZG93ID0ge1xuICBhbGx0aW1lOiBcImFsbHRpbWVcIiwgc2Vzc2lvbjogXCJzZXNzaW9uXCIsXG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy50b3AuaW5kZXhlZERCPy5vcGVuKGNvbmZpZy5kYk5hbWUsIGNvbmZpZy52ZXJzaW9uKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGluZGV4ZWQgREJcIiwgb3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4ZWREQiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKGRhdGFOYW1lLCBkYXRhVmFsdWUpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHNlc3Npb25JZCA9IHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpOyAvLyBkYXRlIGN1cnJlbnQgLTIgc2FhdCAgeWlsLWF5LWd1blxuICAgIGNvbnN0IHRpbWUgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XCJkYXRhX25hbWVcIjogZGF0YU5hbWUsIFwiZGF0YV92YWx1ZVwiOiBkYXRhVmFsdWUsIFwic2Vzc2lvbl9pZFwiOiBzZXNzaW9uSWQsIHRpbWV9O1xuICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgfVxuXG4gIG1pbm1heChkYXRhTmFtZSwgb3AsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgc3RvcmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdG9yZWQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtaW5cIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPCBzdG9yZWQpIHx8XG4gICAgICAgICAgICAgICAgKG9wID09PSBcIm1heFwiICYmIHZhbHVlW1wiZGF0YV92YWx1ZVwiXSA+IHN0b3JlZClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVkID0gdmFsdWVbXCJkYXRhX3ZhbHVlXCJdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3JlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtaW4oZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtaW5cIiwgd2luZG93KTtcbiAgfVxuXG4gIG1heChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWlubWF4KGRhdGFOYW1lLCBcIm1heFwiLCB3aW5kb3cpO1xuICB9XG5cbiAgZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoIW1hcC5oYXModmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSkgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIDApO1xuICAgICAgICAgICAgICBtYXAuc2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSwgbWFwLmdldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKG1hcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBtb2RlKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncm91cEJ5KGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGlmIChkYXRhLmtleXMoKS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWF4ID0ge25hbWU6IHVuZGVmaW5lZCwgdmFsdWU6IC0xfTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGlmIChtYXgudmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBtYXgubmFtZSA9IGtleTtcbiAgICAgICAgbWF4LnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heDtcbiAgfVxuXG4gIGNvdW50KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3VtKGRhdGFOYW1lLCB3aW5kb3cgPSBcImFsbHRpbWVcIikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSAwLjAwO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRvdGFsICs9IHBhcnNlRmxvYXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodG90YWwudG9GaXhlZCgyKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUsIGRhdGFWYWx1ZSA9IHVuZGVmaW5lZCkge1xuICAgIGlmIChkYXRhVmFsdWUpIHtcbiAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZV0pKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleFZhbHVlID0gZ2V0QnJvd3NlclR5cGUoKSA9PT0gXCJzYWZhcmlcIiA/IGRhdGFOYW1lIDogW2RhdGFOYW1lXTtcblxuICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpXG4gICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoaW5kZXhWYWx1ZSkpO1xuICB9XG5cbiAgYXN5bmMgYXZnKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCB0b3RhbCA9IGF3YWl0IHRoaXMuc3VtKGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5jb3VudChkYXRhTmFtZSwgd2luZG93KTtcblxuICAgIGlmICghdG90YWwgfHwgIWNvdW50KSByZXR1cm4gMDtcblxuICAgIHJldHVybiAodG90YWwgLyBjb3VudCkudG9GaXhlZCgyKTtcbiAgfVxuXG4gIGFzeW5jIGxhc3QoZGF0YU5hbWUsIHNpemUgPSAxLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVcIikub3BlbkN1cnNvcihbZGF0YU5hbWVdLCBcInByZXZcIik7XG4gICAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICAgIGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgICAub3BlbkN1cnNvcihbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpXSwgXCJwcmV2XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGN1cnNvci5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IHNpemUpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhc3luYyBmaW5kKGtleU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBrZXlOYW1lKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnNvci5yZXF1ZXN0LnJlc3VsdC52YWx1ZS5kYXRhX3ZhbHVlKTtcbiAgICAgICAgICAgIHJlc29sdmUoY3Vyc29yLnJlcXVlc3QucmVzdWx0LnZhbHVlLmRhdGFfdmFsdWUpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgY2Fubm90IGZpbmQgJHtrZXlOYW1lfSBvbiB0aGUgaW5kZXhkYiBzdG9yZWApO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNlc3Npb25JZCgpIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICBkLnNldEhvdXJzKGQuZ2V0SG91cnMoKSAtIDIpO1xuXG4gICAgcmV0dXJuIGQuZ2V0RnVsbFllYXIoKSArIFwiLVwiICtcbiAgICAgIChkLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKSArIFwiLVwiICtcbiAgICAgIGQuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgQ29sbGVjdG9yQXBpIGZyb20gXCIuLi9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGlcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25cIik7XG5jb25zdCBjb2xsZWN0b3JBcGkgPSBuZXcgQ29sbGVjdG9yQXBpKCk7XG5cbi8vIGtlZXAgYSB0YWJsZSBpbiBpbmRleGRiIHRoZSBmb3JtYXQgW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgZGF0YV92YWx1ZSwgc3RvcmVkX3ZhbHVlXVxuXG5leHBvcnQgY29uc3QgcXVlcnlJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpID0+IHtcbiAgbG9nZ2VyLmxvZyhcInF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KTtcbiAgaWYgKCFjb2xsZWN0b3JBcGkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiSW5kZXhlZERCIG5vIHN1cHBvcnRlZC9Jbml0aWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHdpbmRvdyBjYW4gYmUgZWl0aGVyIHNhbWVkYXkgb3IgYWxsdGltZVxuXG4gIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtaW5cIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5taW4oYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwibWF4XCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubWF4KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImF2Z1wiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLmF2ZyhiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjZFwiKSB7XG4gICAgcmV0dXJuIChhd2FpdCBjb2xsZWN0b3JBcGkuZ3JvdXBCeShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdykpLnNpemU7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiY3ZcIikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb2xsZWN0b3JBcGkuZ3JvdXBCeShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGNvdW50ICs9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBpZiAocXVlcnlNZXRob2QgPT09IFwibW9kZVwiKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNvbGxlY3RvckFwaS5tb2RlKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBkYXRhLm5hbWU7XG4gIH1cblxuICBpZiAocXVlcnlNZXRob2QuaW5kZXhPZihcImxhc3RcIikgPj0gMCkge1xuICAgIGNvbnN0IG1hdGNoID0gcXVlcnlNZXRob2QubWF0Y2goXCJsYXN0XFxcXCgoW1xcXFxkXSspXFxcXClcIik7XG4gICAgaWYgKCFtYXRjaCB8fCAhbWF0Y2gubGVuZ3RoID09PSAyIHx8IHBhcnNlSW50KG1hdGNoWzFdKSA8IDEgKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubGFzdChiYXNlRmVhdHVyZU5hbWUsIG1hdGNoWzFdLCB3aW5kb3cpO1xuICAgIGNvbnN0IGRhdGFWYWx1ZXMgPSBxdWVyeVByb21pc2UubWFwKChvYmopID0+IG9iai5kYXRhX3ZhbHVlKTtcbiAgICByZXR1cm4gZGF0YVZhbHVlcztcbiAgfVxuXG4gIC8qKlxuICAgIHtcIkxpc3RpbmdwYWdlXCIgPT4gMjF9XG4gICAge1wiSG9tZXBhZ2VcIiA9PiAxMn1cbiAgICAtLSBleGFtcGxlIHdpbGwgaGF2ZTpcbiAgICBtb2RlOiBMaXN0aW5ncGFnZVxuICAgIGNkOiAyXG4gICAgY3Y6IDIxKzEyXG4gICAgbGFzdCgzKSAobiwgbi0xLCBuLTIpXG4gICovXG5cbiAgLy8gMTAwMGxpayB0ZW1pemxlbmVjZWsgKG1haW50T3BDb3VudCAtPiB2ZXJzaW9uKVxuXG4gIC8vIHF1ZXJ5TWV0aG9kIGNhbiBiZSBcIm1vZGVcIiwgXCJjZFwiIChjb3VudCBkaXN0aW50KSBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXNcbiAgLy8gcXVlcnlNZXRob2QgY2FuIGJlIFwiY3ZcIiAoc3VtIG9mIGNvdW50IHZhbHVlcyksIFwiY3VycmVudFwiLCBvciBcInByZXZcIiBmb3IgYW55IGRhdGEgdHlwZSAoc3RvcmVkIHZpYSBsYXN0KVxuICBsb2dnZXIuZmFpbGVkKGB1bmtub3duIHF1ZXJ5TWV0aG9kPSR7cXVlcnlNZXRob2R9IGluIEJlYWdsZURhdGFDb2xsZWN0aW9uYCk7XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJ1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCk7XG4gIGlmICghY29sbGVjdG9yQXBpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkluZGV4ZWREQiBubyBzdXBwb3J0ZWQvSW5pdGlhbGl6ZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhd2FpdCBjb2xsZWN0b3JBcGkuc2F2ZShiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpO1xuXG5cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcIm1pblwiLCBcIm1heFwiLCBcImNudFwiLCBcInN1bVwiIGZvciBudW1lcmljIGRhdGEgdHlwZXMsIG1pbi1tYXggY29tcGFyZXMgd2l0aCBvbmx5IGV4aXN0aW5nLCBhdmcgdXBkYXRlcyBjbnQgYW5kIHN1bVxuICAvLyAtLT4gbWluOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcIm1pblwiLCAobGVhc3Qgb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBtYXg6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwibWF4XCIsIChncmVhdGVzdCBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IHN1bTogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJzdW1cIiwgKHN1bSBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IGNudDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjbnRcIiwgKGV4aXN0aW5nICsgMSldXG4gIC8vXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJjb3VudF92YWx1ZXNcIiBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXMsIGtlZXAgYSBjb3VudGVyIGZvciBlYWNoIHZhbHVlXG4gIC8vIC0tPiBjb3VudF92YWx1ZXM6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIGRhdGFfdmFsdWUsIChleGlzdGluZyArIDEpXVxuICAvL1xuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwibGFzdFwiIGZvciBhbnkgZGF0YSB0eXBlIC0tPiBrZWVwcyAyIHZhbHVlcyBmb3IgY3VycmVudCBhbmQgdGhlIHByZXZpb3VzXG4gIC8vIGRlbGV0ZTogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJwcmV2XCIsIChleGlzdGluZyB2YWx1ZSldXG4gIC8vIG1vdmU6IGV4aXN0aW5nIFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY3VycmVudFwiLCAoZXhpc3RpbmcgdmFsdWUpXSAtLT4gW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJwcmV2XCIsIChleGlzdGluZyB2YWx1ZSldXG4gIC8vIHB1dDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjdXJyZW50XCIsIChpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7Zm9ybWF0RGVsaXZlcnlEYXRlfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TE9PS1VQX0FQSV9VUkwsIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBTUExJVF9SQVRJT30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBfX2h3bTogMCxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJcIik7XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChBcnJheS5pc0FycmF5KGxpc3RlbmVycykgJiYgbGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsb2dnZXIubG9nKGBQYXNzaW5nIHZhbHVlICR7dmFsdWV9IHRvIGxpc3RlbmVycyBvZiBrZXkgJHtrZXl9YCk7XG4gICAgICAgIGxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIHJldHVybiBnZXRBbnlGcm9tQmVhZ2xlSW5mb0xheWVyKFtrZXldLCBibG9ja2luZywgcG9sbEludGVydmFsLCB0aW1lb3V0KTtcbn07XG5cbmNvbnN0IGdldEFueUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5cywgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICAvLyBUT0RPOiBjaGVjayBmZWF0dXJlRW5naW5lZXJpbmcgYW5kIHNlYXJjaCBsaXN0IGlmIGFsbCBtYXJrZWQgYXMgZm91bmQgYnV0IHZhbHVlIGlzIG1pc3NpbmdcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHJldHVybiBudWxsIGlmIGtleXMgaXMgbWlzc2luZyBvciBub3QgYW4gYXJyYXkgb3IgaGFzIG5vIGVsZW1lbnRzXG4gIGlmICgha2V5cyB8fCAhQXJyYXkuaXNBcnJheShrZXlzKSB8fCAha2V5cy5sZW5ndGgpIHJldHVybiBudWxsO1xuICBsZXQgb2J0YWluRGF0YTtcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICAgICAgICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBwb2xsSW50ZXJ2YWwpO1xuICAgICAgLy8gYWRkIHRpbWVvdXRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0sIHRpbWVvdXQpOyAvLyB3YWl0IGJsb2NraW5nIGZvciBcInRpbWVvdXRcIiBtc2Vjc1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciA9IChrZXkpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gcmVtb3ZlIGtleSBmcm9tIGluZm9MYXllclxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSByZXR1cm47XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBsb2dnZXIubG9nKFwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllclwiLCBgUmVtb3ZpbmcgJHtsYXN0S2V5fSBmcm9tICR7SlNPTi5zdHJpbmdpZnkob2JqKX1gKTtcbiAgICBkZWxldGUgb2JqW2xhc3RLZXldO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBpbmZvTGF5ZXJba2V5XTtcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIG51bGwpO1xuICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRyZWF0bWVudCA9IChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIHN0YXR1cywgZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IG51bGwpID0+IHtcbiAgY29uc3QgdmFsdWUgPSB7fTtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsIHx8IGJ1c2luZXNzUnVsZUlkICE9PSB1bmRlZmluZWQpIHZhbHVlLmJ1c2luZXNzUnVsZUlkID0gYnVzaW5lc3NSdWxlSWQ7XG4gIGlmICh2YXJpYW50KSB2YWx1ZS52YXJpYW50ID0gdmFyaWFudDtcblxuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJhcHBsaWVkXCI6XG4gICAgICBpbmZvTGF5ZXIuYVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJza2lwcGVkXCI6XG4gICAgICB2YWx1ZS5kZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gZGVwZW5kYW50X29uX3RyZWF0bWVudDtcbiAgICAgIGluZm9MYXllci5lW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImZhaWxlZFwiOlxuICAgICAgaW5mb0xheWVyLmZbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xufTtcblxuY29uc3QgUEFSU0VTRUFSQ0hNQVhSRVRSWSA9IDEwO1xuY29uc3QgUEFSU0VTRUFSQ0hTVEFSVERFTEFZID0gMTA7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyID0gYXN5bmMgKCkgPT4ge1xuICAvLyBDb2xsZWN0IGNvcmUgZGF0YVxuICBwcmVwYXJlQ29yZURhdGEoKTtcblxuICAvLyBUcmlnZ2VyLXN0YXJ0IHRoZSBwYXJzZXIgbG9vcFxuICBwYXJzZXJDYWxsZXIoKTtcblxuICAvLyBBZGQgbWV0cmljc1xuICBhZGRNZXRyaWNzKCk7XG59O1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJjdlwiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwiX19mZWF0dXJlcy5TS1Vzb25CYXNrZXRMb29rdXBcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RCYXNrZXRMb29rdXBcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbn07XG5cbmNvbnN0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJhc2VGZWF0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlRW5naW5lZXJpbmdPcHMpO1xuICBmb3IgKGNvbnN0IGJhc2VGZWF0dXJlTmFtZSBvZiBiYXNlRmVhdHVyZU5hbWVzKSB7XG4gICAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gICAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gVE9ETzogY29udmVydCB0byBuYW1lIC0tPiBhcnJheSBvZiBzZWxlY3RvcnNcbmNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2xhc3NcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5pc0luU2hvd3Jvb21cIiwgbmFtZTogXCJwZHAuaXNJblNob3dyb29tXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNhdGVnb3J5X3Byb2R1Y3RfY291bnRcIiwgbmFtZTogXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBscC5jbGFzc1wiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInB1cmNoYXNlLnByaWNlc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5xdWFudGl0eVwiLCBuYW1lOiBcInB1cmNoYXNlLnF1YW50aXRpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwdXJjaGFzZS5jYXRlZ29yaWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLm9yZGVySWRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLnJldmVudWVcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5kaW1lbnNpb24xNVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRG9jdW1lbnQgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicGFnZV9wcmV2aWV3X3dyYXBwZXJfcHJvZHVjdGlvblxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiSG9tZXBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXRlZ29yeV9wYWdlX3dyYXBwZXJcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkxpc3RpbmdwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiYm9keSA+IC5kZXNrdG9wX2xheW91dF93cmFwcGVyIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY29wdW9uTm90QXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVGb3JtYXR0ZWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwiZm9ybWF0RGVsaXZlcnlEYXRlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiN2aXZlbnNlLXNob3dyb29tLXRhYiBwOm5vdCgudml2ZW5zZS1zaG93cm9vbXMpXCIsIG5hbWU6IFwicGRwLmhhc05vU2hvd3Jvb21zXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJwZHAuc2hvd3Jvb21jb3VudFwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInN1YmNhdGVnb3JpZXMtdGl0bGVcXFwiXVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtY2FyZFtkYXRhLXByb2R1Y3Qtc2t1XVwiLCBuYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uUExQXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcm9kdWN0LXNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1saXN0XCIsIG9ic2VydmVyOiBcImxpc3RpbmdJdGVtQmxvY2tcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QTFBcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgb2JzZXJ2ZXI6IFwiY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG9ic2VydmVyOiBcImNoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF9zdW1tYXJ5X3RvdGFsXFxcIl0sIFtjbGFzcyo9XFxcInRvdGFsX3Jvd1xcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlcl9mb2xsb3dfbnVtYlxcXCJdLCBbY2xhc3MqPVxcXCJjYXJ0LXRpdGxlLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucGF5bWVudF90eXBlX3RpdGxlLCAuY2FydC10aXRsZS1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdF9za3VfY29kZVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU09SRyBFbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1wblwiLCBuYW1lOiBcInBkcC5tcG5cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJuYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJKU09ORmlsdGVyT3RoZXJcIiwgdmFsdWU6IFwiQHR5cGU9UHJvZHVjdFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiaXRlbUxpc3RFbGVtZW50LioubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiYnJlYWRjcnVtYi5pdGVtTGlzdEVsZW1lbnQuKi5pdGVtLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBXaW5kb3cgY3VzdG9tIGVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJmYXZvcml0ZVByb2R1Y3RzXCIsIG5hbWU6IFwidmlldy5mYXZvcml0ZWRNUE5zXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcInRvU3RyaW5nXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXTtcblxuY29uc3QgcHJvY2Vzc0Zvcm1hdHRlciA9ICh2YWx1ZSwgZm9ybWF0dGVyKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFmb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKGZvcm1hdHRlcikge1xuICAgIGNhc2UgXCJ1cHBlckNhc2VUUlwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoXCJ0ci1UUlwiKTtcbiAgICBjYXNlIFwiZm9ybWF0RGVsaXZlcnlEYXRlXCI6XG4gICAgICByZXR1cm4gZm9ybWF0RGVsaXZlcnlEYXRlKHZhbHVlKTtcbiAgICBjYXNlIFwibnVtZXJpY09ubHlcIjpcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgY2FzZSBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZShcInRyLVRSXCIpLnNwbGl0KFwiIFwiKVswXTtcbiAgICBjYXNlIFwiZGVhcnJheVwiOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJ0b1N0cmluZ1wiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaE9iaiA9IChvYmosIHNlYXJjaEVsZW1lbnQpID0+IHtcbiAgbGV0IHZhbHVlO1xuICBsZXQgbGF5ZXJWYWx1ZTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoc2VhcmNoRWxlbWVudC5vcGVyYW5kKSB7XG4gICAgICBjYXNlIFwiSlNPTkZpbHRlck90aGVyXCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJQYXJhbXMgPSBzZWFyY2hFbGVtZW50LnZhbHVlLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBpZiAoZmlsdGVyUGFyYW1zLmxlbmd0aCAhPT0gMikgYnJlYWs7XG4gICAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IGZpbHRlclBhcmFtc1swXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlclBhcmFtc1sxXTtcbiAgICAgICAgICBpZiAoIWZpbHRlck5hbWUgfHwgIWZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoID0ganNvbkdldChvYmosIGZpbHRlck5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXRjaCB8fCBmaWx0ZXJNYXRjaCAhPT0gZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgaWYgKHZhbHVlICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeU9ic2VydmVcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICBjb25zdCB0b0JlVXBkYXRlZCA9IFtdO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzZWFyY2hQYXRocy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgLy8gYWRkIGNoaWxkRWxlbWVudHMgaW50byB0b0JlVXBkYXRlZFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQucHVzaCguLi5jaGlsZEVsZW1lbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBydW4gb25seSBpZiB0aGUgZWxlbWVudCBoYXMgYWRkZWQgb3IgcmVtb3ZlZCBjaGlsZHJlblxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50LmlzRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllcihlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyUmVzdGFydCA9IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA+PSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyUmVzdGFydCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwic2VhcmNoT2JqOiB0cmlnZ2VyZWQgYSByZXN0YXJ0IG9mIHNlYXJjaHBhdGhzIGR1ZTogXCIsIHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIHBhcnNlckNhbGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodmFsdWUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUlubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgYXR0cmliVmFsdWVMaXN0ID0gW107XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSB2YWx1ZWNoaWxkLmdldEF0dHJpYnV0ZShzZWFyY2hFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZSkge1xuICAgICAgICAgICAgICBhdHRyaWJWYWx1ZUxpc3QucHVzaChhdHRyaWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYlZhbHVlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXR0cmliVmFsdWVMaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHNldFZhbHVlID0gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZXRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5Q291bnRFbHRzXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2VhcmNoRWxlbWVudC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGxldCBzdW1QcmljZSA9IDA7XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgc3VtUHJpY2UrPXBhcnNlSW50KGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdW1QcmljZSA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBzdW1QcmljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGFycmF5SW5uZXJUZXh0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhcnJheUlubmVyVGV4dC5wdXNoKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUlubmVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXJyYXlJbm5lclRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9IC8vIHN3aXRjaFxuXG4gICAgaWYgKGxheWVyVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBsYXllclZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpIHtcbiAgICAgICAgbGF5ZXJWYWx1ZSA9IHByb2Nlc3NGb3JtYXR0ZXIobGF5ZXJWYWx1ZSwgc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpO1xuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoc2VhcmNoRWxlbWVudC5uYW1lLCBsYXllclZhbHVlKTtcbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG5cbiAgICAgIC8vIG1hcmsgZXhjbHVzaXZlIGVsZW1lbnRzIGFzIGZvdW5kXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSkgJiYgc2VhcmNoRWxlbWVudC5leGNsdXNpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZUVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUuaW5jbHVkZXMoZXhjbHVzaXZlRWxlbWVudC5uYW1lKSkge1xuICAgICAgICAgICAgZXhjbHVzaXZlRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwic2VhcmNoT2JqIGVycm9yOiBcIiArIGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGN1c3RvbURhdGFEZXJpdmF0aW9ucyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUsIDUwLCAxMDAwKTtcblxuICB0cnkge1xuICAgIC8vIGNhcnQgdG90YWwgcHJvZHVjdCBwcmljZSBpcyBub3QgYXZhaWxhYmxlIGFueXdoZXJlLCBzcGVjaWFsIGRpc2NvdW50cyBldGMgYXJlIGhhcmQgdG8gc2NyYXBlLCBzbyByZWNhbGN1bGF0ZSBpdFxuICAgIGNvbnN0IFtpc0NhcnRFbXB0eSwgdG90YWxCYXNlUHJpY2UsIGNvdXBvbk5vdEFwcGxpY2FibGUsIHByaWNlcywgcXVhbnRpdGllc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5pc2VtcHR5XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxCYXNlUHJpY2VcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucHJpY2VzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucXVhbnRpdGllc1wiKSxcbiAgICBdKTtcblxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcblxuICAgIGlmICghdG90YWxCYXNlUHJpY2UgJiYgcHJpY2VzICYmIEFycmF5LmlzQXJyYXkocHJpY2VzKSAmJiBwcmljZXMubGVuZ3RoID4gMCAmJiBxdWFudGl0aWVzICYmIEFycmF5LmlzQXJyYXkocXVhbnRpdGllcykgJiYgcXVhbnRpdGllcy5sZW5ndGggPiAwICYmIHByaWNlcy5sZW5ndGggPT09IHF1YW50aXRpZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbFByaWNlICs9IHBhcnNlSW50KHByaWNlc1tpXSkgKiBwYXJzZUludChxdWFudGl0aWVzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxQcmljZSA9IHBhcnNlSW50KHRvdGFsQmFzZVByaWNlKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlICYmIGNvdXBvbk5vdEFwcGxpY2FibGUpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSB0b3RhbFByaWNlIC0gcGFyc2VJbnQoY291cG9uTm90QXBwbGljYWJsZSk7XG4gICAgfSBlbHNlIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHBhcnNlSW50KHRvdGFsUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIiwgY291cG9uQXBwbGljYWJsZUFtb3VudCk7XG5cbiAgICBpZiAoaXNDYXJ0RW1wdHkpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbFByaWNlXCIsIDApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiY3VzdG9tRGF0YURlcml2YXRpb25zIGNhbm5vdCBjb21wdXRlIGNvdXBvbkFwcGxpY2FibGVQcmljZTogXCIgKyBlKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBhY3RpdmUgU0tVIGxpc3RcbiAgbGV0IG5ld1NLVUxpc3QgPSBbXTtcbiAgLy8gUHJvZHVjdCBwYWdlXG4gIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiUHJvZHVjdHBhZ2VcIikge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIpO1xuICAgIGlmIChza3UhPT1udWxsICYmIHNrdSE9PXVuZGVmaW5lZCkge1xuICAgICAgbmV3U0tVTGlzdCA9IFtza3VdO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiYmFza2V0XCIpIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuc2t1c1wiKTtcbiAgICBpZiAoc2t1TGlzdCE9PW51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgbmV3U0tVTGlzdCA9IHNrdUxpc3Q7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJMaXN0aW5ncGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBMUFwiKTtcbiAgICBpZiAoc2t1TGlzdCE9PW51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgbmV3U0tVTGlzdCA9IHNrdUxpc3Q7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogZXh0cmFjdCBTS1VzQWxyZWFkeUxvb2tlZFVwIGZyb20gZGlmZlByb2R1Y3RJbmZvIGFuZCBrZWVwIGFzIGEgU2V0XG4gIGNvbnN0IHByZXZTS1VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc0FscmVhZHlMb29rZWRVcFwiKSB8fCBbXTtcbiAgLy8gZ2V0IGRpZmZlcmVuY2UgYmV0d2VlbiBuZXcgYW5kIG9sZCBTS1UgbGlzdFxuICBjb25zdCBkaWZmU0tVTGlzdCA9IG5ld1NLVUxpc3QuZmlsdGVyKCh4KSA9PiAhcHJldlNLVUxpc3QuaW5jbHVkZXMoeCkpO1xuICBpZiAoZGlmZlNLVUxpc3QgJiYgZGlmZlNLVUxpc3QubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGRpZmZQcm9kdWN0SW5mbyA9IGF3YWl0IHByb2R1Y3RJbmZvTG9va3VwKGRpZmZTS1VMaXN0KSB8fCB7fTtcbiAgICBjb25zdCBvbGRQcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VMb29rdXBcIikgfHwge307XG4gICAgLy8gYWRkIGRpZmYgcHJvZHVjdCBpbmZvIHRvIG9sZCBwcm9kdWN0IGluZm9cbiAgICBjb25zdCBuZXdQcm9kdWN0SW5mbyA9IHsuLi5vbGRQcm9kdWN0SW5mbywgLi4uZGlmZlByb2R1Y3RJbmZvfTtcblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlTG9va3VwXCIsIG5ld1Byb2R1Y3RJbmZvKTtcbiAgICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uQmFza2V0TG9va3VwXCIsIG5ld1Byb2R1Y3RJbmZvKTtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlZFNLVXMgPSBwcmV2U0tVTGlzdC5jb25jYXQoZGlmZlNLVUxpc3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1VzQWxyZWFkeUxvb2tlZFVwXCIsIHVwZGF0ZWRTS1VzKTtcbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHByZXBhcmVDb3JlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICAvKiBCZWFnbGUgZGF0YSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZcIiwgXCIwLjAuMzdcIik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50RGF0YT8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudDtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZQbGF0Zm9ybVwiLCBwbGF0Zm9ybSk7XG5cbiAgLyogd2luZG93IHZpZXcgYXJlYSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dQUmF0aW9cIiwgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIGNvbnN0IGF2YWlsV2luZG93ID0gd2luZG93UHRyLnNjcmVlbj8uYXZhaWxXaWR0aCArIFwieFwiICsgd2luZG93UHRyLnNjcmVlbj8uYXZhaWxIZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0F2YWlsXCIsIGF2YWlsV2luZG93KTtcblxuICBjb25zdCB3aW5kb3dEZXB0aCA9IHdpbmRvd1B0ci5zY3JlZW4/LmNvbG9yRGVwdGggKyBcIi1cIiArIHdpbmRvd1B0ci5zY3JlZW4/LnBpeGVsRGVwdGg7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0RlcHRoXCIsIHdpbmRvd0RlcHRoKTtcblxuICBjb25zdCB2cG9ydFNoYXBlID0gd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py53aWR0aCArIFwieFwiICsgd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py5oZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1Zwb3J0XCIsIHZwb3J0U2hhcGUpO1xuXG4gIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICBsZXQgd2lkdGggPSBwYXJzZUludChzY3JlZW4ud2lkdGgpO1xuICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBwYXJzZUludChzY3JlZW4uaGVpZ2h0KSA6IDA7XG4gICAgaWYgKHdpZHRoICE9PSAwICYmIGhlaWdodCAhPT0gMCkge1xuICAgICAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QocGxhdGZvcm0pO1xuICAgICAgaWYgKGlPUyAmJiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbykge1xuICAgICAgICAvLyBpb3MgcHJvdmlkZXMgRFBJcywgbmVlZCB0byBtdWx0aXBseVxuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGggKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25BbmdsZSA9IHdpbmRvd1B0ci5zY3JlZW4/Lm9yaWVudGF0aW9uPy5hbmdsZTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSA5MCB8fCBNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gMjcwKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBsYW5kc2NhcGUgb3JpZW50YXRpb24gc3dpdGNoIHZhbHVlcyBmb3IgYWxsIGV4Y2VwdCBpb3NcbiAgICAgICAgICBjb25zdCB0ZW1wID0gd2lkdGg7XG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQ7XG4gICAgICAgICAgaGVpZ2h0ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93XCIsIHdpZHRoICsgXCJ4XCIgKyBoZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIG5hdmlnYXRvciAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIaXN0U2l6ZVwiLCB3aW5kb3dQdHIuaGlzdG9yeT8ubGVuZ3RoKTtcblxuICAvLyBjaGVjayBpZiB1c2VyQWdlbnREYXRhIGlzIHN1cHBvcnRlZCBhbmQgdXNlckFnZW50IGlzIG5vdCBhdmFpbGFibGUsIHVzZSBpdFxuICBpZiAoIW5hdlB0ci51c2VyQWdlbnQpIHtcbiAgICBpZiAobmF2UHRyLnVzZXJBZ2VudERhdGEpIHtcbiAgICAgIC8vIHR1cm4gYnJhbmRzIGFycmF5IGludG8gc3RyaW5nXG4gICAgICBsZXQgbmF2QWdlbnQgPSBuYXZQdHI/LnVzZXJBZ2VudERhdGE/LmJyYW5kcz8ubWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuYnJhbmQgKyBcIjpcIiArIGUudmVyc2lvbjtcbiAgICAgIH0pLmpvaW4oKTtcbiAgICAgIC8vIGFkZCBtb2JpbGUgaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gKG5hdlB0cj8udXNlckFnZW50RGF0YT8ubW9iaWxlID8gXCJtb2JpXCIgOiBcIiBcIik7XG4gICAgICAvLyBhZGQgcGxhdGZvcm0gaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gcGxhdGZvcm07XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZBZ2VudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdlB0ci51c2VyQWdlbnQpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SFdDb3Jlc1wiLCBuYXZQdHIuaGFyZHdhcmVDb25jdXJyZW5jeSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkxhbmd1YWdlXCIsIG5hdlB0ci5sYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLmJyb3dzZXJMYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnN5c3RlbUxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIudXNlckxhbmd1YWdlLFxuICApO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZUb3VjaFwiLCBuYXZQdHIubWF4VG91Y2hQb2ludHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZWZW5kb3JcIiwgbmF2UHRyLnZlbmRvcik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmludGVybmV0U3BlZWRcIiwgd2luZG93UHRyLm5hdmlnYXRvcj8uY29ubmVjdGlvbj8uZG93bmxpbmspO1xuXG4gIC8qIG1pc2NlbGxhbmVvdXMgKi9cbiAgY29uc3QgY3VycmVudFVSTCA9IG5ldyBVUkwod2luZG93LnRvcC5sb2NhdGlvbi5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIsIGN1cnJlbnRVUkwuaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCBjdXJyZW50VVJMLmhvc3RuYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkb250dHJhY2tcIiwgbmF2UHRyLmRvTm90VHJhY2sgfHwgd2luZG93UHRyLmRvTm90VHJhY2sgfHwgbmF2UHRyLm1zRG9Ob3RUcmFjayk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIGNvbnN0IGZpcnN0U2Vzc2lvblJlZmVycmVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSKTtcbiAgaWYgKCFmaXJzdFNlc3Npb25SZWZlcnJlcikge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCBmaXJzdFNlc3Npb25SZWZlcnJlcik7XG4gIH1cblxuICAvKiBWaXZlbnNlIHNwZWNpZmljICovXG4gIGxldCBwYWdlVHlwZTtcbiAgLy8gaWYgdXJsIGxpa2UgeCB0aGVuIHNldCBQYWdlVHlwZSA9IHlcbiAgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImZhdm9yaWxlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJmYXZvcml0ZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImJhc2tldFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtb3pldGkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInB1cmNoYXNlXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwib2RlbWUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBheW1lbnRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJhZGRyZXNzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXN0b3JkZXJzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWtheWl0Lmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJyZWdpc3RlclwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1naXJpc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNpZ25pblwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImt1cG9ubGFyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfY291cG9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInByb2ZpbC1ndW5jZWxsZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9pbmZvXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9hZGRyZXNzZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJkdXl1cnUtdGVyY2lobGVyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9ub3RpZmljYXRpb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiaW5kaXJpbWxpLW1vYmlseWEta2FtcGFueWFsYXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzcGVjaWFsX2NhbXBhaWduc1wiO1xuICB9XG5cbiAgaWYgKHBhZ2VUeXBlKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCBwYWdlVHlwZSk7XG4gIH1cbn07XG5cbmNvbnN0IGFkZE1ldHJpY3MgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgcGVyZk1ldHJpY3MgPSB7fTtcbiAgY29uc3QgcGVyZk5hdmlnYXRpb25NZXRyaWNzID0gd2luZG93UHRyLnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdO1xuICBpZiAod2luZG93UHRyLnBlcmZvcm1hbmNlICYmIHBlcmZOYXZpZ2F0aW9uTWV0cmljcykge1xuICAgIHBlcmZNZXRyaWNzLmNvbm5lY3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MucmVxdWVzdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlc3BvbnNlRW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlcXVlc3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZG9tID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tSW50ZXJhY3RpdmUgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tQ29tcGxldGUpO1xuICAgIHBlcmZNZXRyaWNzLmxvYWQgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZHVyYXRpb24pO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibWV0cmljc1wiLCBwZXJmTWV0cmljcyk7XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuXG5sZXQgcHJvZHVjdEluZm9Mb29rdXBJblByb2dyZXNzID0gZmFsc2U7XG5cbmV4cG9ydCBjb25zdCBwcm9kdWN0SW5mb0xvb2t1cCA9IGFzeW5jIChza3VsaXN0KSA9PiB7XG4gIGlmICghc2t1bGlzdCB8fCBza3VsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJwcm9kdWN0SW5mb0xvb2t1cDogTm8gc2t1IGZvdW5kXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHByb2R1Y3RJbmZvTG9va3VwSW5Qcm9ncmVzcykge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJwcm9kdWN0SW5mb0xvb2t1cDogQWxyZWFkeSBpbiBwcm9ncmVzc1wiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxvZ2dlci5sb2coXCJwcm9kdWN0SW5mb0xvb2t1cDogU3RhcnRpbmcgcHJvZHVjdCBpbmZvIGxvb2t1cDogXCIrc2t1bGlzdCk7XG5cbiAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICBwcm9kdWN0SW5mb0xvb2t1cEluUHJvZ3Jlc3MgPSB0cnVlO1xuICBsZXQgcHJvZHVjdEluZm8gPSBudWxsO1xuICB0cnkge1xuICAgIHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2goTE9PS1VQX0FQSV9VUkwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShza3VsaXN0KSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICB9KTtcbiAgICBpZiAocHJvZHVjdEluZm8ub2spIHtcbiAgICAgIHByb2R1Y3RJbmZvID0gYXdhaXQgcHJvZHVjdEluZm8uanNvbigpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci53YXJuKFwicHJvZHVjdEluZm9Mb29rdXA6IGZldGNoICYgcGFyc2UgZmFpbGVkXCIpO1xuICB9XG5cbiAgcHJvZHVjdEluZm9Mb29rdXBJblByb2dyZXNzID0gZmFsc2U7XG4gIHJldHVybiBwcm9kdWN0SW5mbztcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIFNUWUxFU0hFRVRfTE9DQVRJT04sXG4gIFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRTX0xPQ0FUSU9OLFxuICBFX1JVTEVTX0xPQ0FUSU9OLFxuICBQUk9EVUNUX0lORk9fTE9DQVRJT04sXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcblxuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJuZXh0RGF5LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50c1wiKTtcbiAgY29uc3QgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoKFRSRUFUTUVOVFNfTE9DQVRJT04pO1xuICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gIHJldHVybiBqc29uVHJlYXRtZW50O1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50V2VpZ2h0cyA9IGFzeW5jICgpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2goVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICBjb25zdCBqc29uVHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IHRyZWF0bWVudFdlaWdodHMuanNvbigpO1xuICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2goRV9SVUxFU19MT0NBVElPTik7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHByb2R1Y3QgaW5mb1wiKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9DU1YgPSBhd2FpdCBwcm9kdWN0SW5mby50ZXh0KCk7XG4gICAgcmV0dXJuIGNzdlRvQXJyYXkocHJvZHVjdEluZm9DU1YpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcik7XG4gICAgaWYgKGhhc2ggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzID0gKCkgPT4ge1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHLCBTRVNTSU9OX1RJTUVTVEFNUCwgU0VTU0lPTl9ISVNUT1JZfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHBvcHVwRGlzcGxheUZsYWcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRyk7XG4gIGNvbnN0IHNlc3Npb25UaW1lc3RhbXAgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QKTtcbiAgY29uc3Qgc2Vzc2lvbkhpc3RvcnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fSElTVE9SWSk7XG5cbiAgaWYgKHBvcHVwRGlzcGxheUZsYWcgPT09IG51bGwpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMCk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uVGltZXN0YW1wKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCwgRGF0ZS5ub3coKSk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uSGlzdG9yeSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXSk7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHNlc3Npb25IaXN0b3J5XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb25kaXRpb25DaGVja2VyID0gKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSBcIm5vdEV4aXN0XCIpIHtcbiAgICBpZiAoIXJ1blRpbWVWYWx1ZSkge1xuICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fFxuICAgIHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZGl0aW9uID09PSBudWxsIHx8XG4gICAgY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogcnVuVGltZVZhbHVlIG9yIGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICBjYXNlIFwiZXhpc3RcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiaW5jbHVkZXNcIjpcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEluY2x1ZGVzXCI6XG4gICAgY2FzZSBcIm5vdENvbnRhaW5zXCI6XG4gICAgICBpZiAoIXJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90RXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlclRoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPiB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc1RoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlckVxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc0VxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiYmV0d2VlblwiOiB7XG4gICAgICBsZXQgW21pbiwgbWF4XSA9IHZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSBtaW4gJiYgcnVuVGltZVZhbHVlIDw9IG1heCkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYXNlIFwicmVnZXhcIjoge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIik7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChydW5UaW1lVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZCBcIiwgY29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERlYnVnTW9kZSA9IChvb3NSZWFzb24pID0+IHtcbiAgY29uc3Qge0RFQlVHX01PREUsIE9VVF9PRl9TQ09QRX0gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9XCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKE9VVF9PRl9TQ09QRSwgb29zUmVhc29uKTtcbiAgfVxuXG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTFcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0yXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDI7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MFwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBjdXJyZW50ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKERFQlVHX01PREUpKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgKGN1cnJlbnQgPyBcIm9uXCIgOiBcIm9mZlwiKSk7XG4gIHJldHVybiAoY3VycmVudCB8fCAwKTtcbn07XG5cbi8vIGdldCBHQSBjbGllbnQgaWQgdXNpbmcgZ2EuZ2V0QWxsKClcbmV4cG9ydCBjb25zdCBnZXRHYUNsaWVudElkID0gKCkgPT4ge1xuICBjb25zdCBnYSA9IHdpbmRvdy5nYTtcbiAgLy8gaWYgZ2EgYW5kIGdhLmdldEFsbCgpIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gbnVsbFxuICBpZiAoZ2EgJiYgZ2EuZ2V0QWxsKSB7XG4gICAgY29uc3QgdHJhY2tlcnMgPSBnYS5nZXRBbGwoKTtcbiAgICBpZiAodHJhY2tlcnMgJiYgdHJhY2tlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJhY2tlcnNbMF0uZ2V0KFwiY2xpZW50SWRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gZ2V0IGRldGVybWluaXN0aWMgbnVtZXJpYyBoYXNoIGZyb20gc3RyaW5nIHRoYXQgY29uYXRpbnMgb25seSBudW1iZXJzXG5leHBvcnQgY29uc3QgZ2V0VW5zZWN1cmVIYXNoID0gKHN0cikgPT4ge1xuICBsZXQgaGFzaCA9IDA7XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gIH1cbiAgLy8gcmV0dXJuIGFic29sdXRlIHZhbHVlXG4gIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbn07XG5cbi8vIGdlbmVyYXRlIGEgMzItYml0IHJhbmRvbSBpbnRlZ2VyXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApO1xufTtcblxuLy8gZ2V0IGN1cnJlbnQgdW5peCBlcG9jaCB0aW1lIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBnZXRVbml4VGltZSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0SWRlbnRpZmllciA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBsb2NhbCBzdG9yYWdlXCIsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2EgaW4gZmlyc3QgYXR0ZW1wdFwiLCBpZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2FcIiwgaWQpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgcmVhZCBHQSBjbGllbnQgaWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGluIGdldElkZW50aWZpZXJcIiwgZSk7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGVsaXZlcnlEYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZGF0ZTtcblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgc3RhcnRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgZW5kTW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIHN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgZW5kRGF5OiB1bmRlZmluZWQsXG4gIH07XG5cbiAgbGV0IG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKyktKFtcXFxcZF0rKVxcXFxzPyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzNdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKS0oW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCAhPT0gNSkgcmV0dXJuIGRhdGU7XG5cbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFsyXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzRdLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5zdGFydE1vbnRoSW5kZXggfHwgIXJlc3VsdC5lbmRNb250aEluZGV4KSByZXR1cm4gZGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0WWVhciA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBjb25zdCBlbmRZZWFyID0gcmVzdWx0LmVuZE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcblxuICAgIGNvbnN0IGVzdGltYXRlZFN0YXJ0ID0gbmV3IERhdGUoc3RhcnRZZWFyLCByZXN1bHQuc3RhcnRNb250aEluZGV4LCByZXN1bHQuc3RhcnREYXkpO1xuICAgIGNvbnN0IGVzdGltYXRlZEVuZCA9IG5ldyBEYXRlKGVuZFllYXIsIHJlc3VsdC5lbmRNb250aEluZGV4LCByZXN1bHQuZW5kRGF5KTtcblxuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkU3RhcnQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRFbmQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlcldlZWtzID0gc3RhcnREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChzdGFydERpZmZPdmVyRGF5cyAvIDcpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyV2Vla3MgPSBlbmREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChlbmREaWZmT3ZlckRheXMgLyA3KTtcblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSAtICR7ZW5kRGlmZk92ZXJEYXlzfSBHw7xuYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPj0gMSkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSBHw7xuIC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gZW5kRGlmZk92ZXJXZWVrcykge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaWRsZVRpbWVyID0gYXN5bmMgKHRpbWVPdXQsIGNhbGxCYWNrKSA9PiB7XG4gIGxldCBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQub250b3VjaHN0YXJ0ID0gcmVzZXRUaW1lcjtcblxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xuICAgIGNsZWFyVGltZW91dChpZGxlVGltZW91dCk7XG4gICAgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJUeXBlID0gKCkgPT4ge1xuICBjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2Nocm9tZXxjaHJvbWl1bXxjcmlvcy9pKSkge1xuICAgIHJldHVybiBcImNocm9tZVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveHxmeGlvcy9pKSkge1xuICAgIHJldHVybiBcImZpcmVmb3hcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL3NhZmFyaS9pKSkge1xuICAgIHJldHVybiBcInNhZmFyaVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvb3ByXFwvL2kpKSB7XG4gICAgcmV0dXJuIFwib3BlcmFcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2VkZy9pKSkge1xuICAgIHJldHVybiBcImVkZ2VcIjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gcmVmOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMjkzMTYzLzIzNDNcbi8vIFRoaXMgd2lsbCBwYXJzZSBhIGRlbGltaXRlZCBzdHJpbmcgaW50byBhbiBhcnJheSBvZlxuLy8gYXJyYXlzLiBUaGUgZGVmYXVsdCBkZWxpbWl0ZXIgaXMgdGhlIGNvbW1hLCBidXQgdGhpc1xuLy8gY2FuIGJlIG92ZXJyaWRlbiBpbiB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuZnVuY3Rpb24gY3N2VG9BcnJheSggc3RyRGF0YSwgc3RyRGVsaW1pdGVyICkge1xuICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGRlbGltaXRlciBpcyBkZWZpbmVkLiBJZiBub3QsXG4gIC8vIHRoZW4gZGVmYXVsdCB0byBjb21tYS5cbiAgc3RyRGVsaW1pdGVyID0gKHN0ckRlbGltaXRlciB8fCBcIixcIik7XG5cbiAgLy8gQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHBhcnNlIHRoZSBDU1YgdmFsdWVzLlxuICBjb25zdCBvYmpQYXR0ZXJuID0gbmV3IFJlZ0V4cChcbiAgICAgIChcbiAgICAgIC8vIERlbGltaXRlcnMuXG4gICAgICAgIFwiKFxcXFxcIiArIHN0ckRlbGltaXRlciArIFwifFxcXFxyP1xcXFxufFxcXFxyfF4pXCIgK1xuXG4gICAgICAgICAgICAgIC8vIFF1b3RlZCBmaWVsZHMuXG4gICAgICAgICAgICAgIFwiKD86XFxcIihbXlxcXCJdKig/OlxcXCJcXFwiW15cXFwiXSopKilcXFwifFwiICtcblxuICAgICAgICAgICAgICAvLyBTdGFuZGFyZCBmaWVsZHMuXG4gICAgICAgICAgICAgIFwiKFteXFxcIlxcXFxcIiArIHN0ckRlbGltaXRlciArIFwiXFxcXHJcXFxcbl0qKSlcIlxuICAgICAgKSxcbiAgICAgIFwiZ2lcIixcbiAgKTtcblxuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBkYXRhLiBHaXZlIHRoZSBhcnJheVxuICAvLyBhIGRlZmF1bHQgZW1wdHkgZmlyc3Qgcm93LlxuICBjb25zdCBhcnJEYXRhID0gW1tdXTtcblxuICAvLyBDcmVhdGUgYW4gYXJyYXkgdG8gaG9sZCBvdXIgaW5kaXZpZHVhbCBwYXR0ZXJuXG4gIC8vIG1hdGNoaW5nIGdyb3Vwcy5cbiAgbGV0IGFyck1hdGNoZXMgPSBudWxsO1xuXG5cbiAgLy8gS2VlcCBsb29waW5nIG92ZXIgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXRjaGVzXG4gIC8vIHVudGlsIHdlIGNhbiBubyBsb25nZXIgZmluZCBhIG1hdGNoLlxuICB3aGlsZSAoYXJyTWF0Y2hlcyA9IG9ialBhdHRlcm4uZXhlYyggc3RyRGF0YSApKSB7XG4gICAgLy8gR2V0IHRoZSBkZWxpbWl0ZXIgdGhhdCB3YXMgZm91bmQuXG4gICAgY29uc3Qgc3RyTWF0Y2hlZERlbGltaXRlciA9IGFyck1hdGNoZXNbMV07XG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGdpdmVuIGRlbGltaXRlciBoYXMgYSBsZW5ndGhcbiAgICAvLyAoaXMgbm90IHRoZSBzdGFydCBvZiBzdHJpbmcpIGFuZCBpZiBpdCBtYXRjaGVzXG4gICAgLy8gZmllbGQgZGVsaW1pdGVyLiBJZiBpZCBkb2VzIG5vdCwgdGhlbiB3ZSBrbm93XG4gICAgLy8gdGhhdCB0aGlzIGRlbGltaXRlciBpcyBhIHJvdyBkZWxpbWl0ZXIuXG4gICAgaWYgKFxuICAgICAgc3RyTWF0Y2hlZERlbGltaXRlci5sZW5ndGggJiZcbiAgICAgICAgICAgICAgc3RyTWF0Y2hlZERlbGltaXRlciAhPT0gc3RyRGVsaW1pdGVyXG4gICAgKSB7XG4gICAgICAvLyBTaW5jZSB3ZSBoYXZlIHJlYWNoZWQgYSBuZXcgcm93IG9mIGRhdGEsXG4gICAgICAvLyBhZGQgYW4gZW1wdHkgcm93IHRvIG91ciBkYXRhIGFycmF5LlxuICAgICAgYXJyRGF0YS5wdXNoKCBbXSApO1xuICAgIH1cblxuICAgIGxldCBzdHJNYXRjaGVkVmFsdWU7XG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIG91ciBkZWxpbWl0ZXIgb3V0IG9mIHRoZSB3YXksXG4gICAgLy8gbGV0J3MgY2hlY2sgdG8gc2VlIHdoaWNoIGtpbmQgb2YgdmFsdWUgd2VcbiAgICAvLyBjYXB0dXJlZCAocXVvdGVkIG9yIHVucXVvdGVkKS5cbiAgICBpZiAoYXJyTWF0Y2hlc1syXSkge1xuICAgICAgLy8gV2UgZm91bmQgYSBxdW90ZWQgdmFsdWUuIFdoZW4gd2UgY2FwdHVyZVxuICAgICAgLy8gdGhpcyB2YWx1ZSwgdW5lc2NhcGUgYW55IGRvdWJsZSBxdW90ZXMuXG4gICAgICBzdHJNYXRjaGVkVmFsdWUgPSBhcnJNYXRjaGVzWzJdLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cCggXCJcXFwiXFxcIlwiLCBcImdcIiApLFxuICAgICAgICAgIFwiXFxcIlwiLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgZm91bmQgYSBub24tcXVvdGVkIHZhbHVlLlxuICAgICAgc3RyTWF0Y2hlZFZhbHVlID0gYXJyTWF0Y2hlc1szXTtcbiAgICB9XG5cblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIHZhbHVlIHN0cmluZywgbGV0J3MgYWRkXG4gICAgLy8gaXQgdG8gdGhlIGRhdGEgYXJyYXkuXG4gICAgYXJyRGF0YVthcnJEYXRhLmxlbmd0aCAtIDFdLnB1c2goIHN0ck1hdGNoZWRWYWx1ZSApO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBwYXJzZWQgZGF0YS5cbiAgcmV0dXJuICggYXJyRGF0YSApO1xufVxuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtnZXRVbnNlY3VyZUhhc2h9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU1vbml0b3JcIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBtb25pdG9yXCIpO1xuXG4gICAgdGhpcy5hSGFzaCA9IG51bGw7XG4gICAgdGhpcy5lSGFzaCA9IG51bGw7XG4gICAgdGhpcy5mSGFzaCA9IG51bGw7XG5cbiAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETzogbWFrZSBiZWFnbGVpbmZvbGF5ZXIgYWNjZXNzIHRvIHRyYWNrIGNoYW5nZXMgYW5kIGtlZXAgYSBoaWdoIHdhdGVyIG1hcmsgdG8gdW5kZXJzdGFuZCBjaGFuZ2VzXG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIGF3YWl0aW5nIHNjcmFwaW5nXCIpO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBzZW5kaW5nIGxvZ3NcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIGluaXRpYWwgbG9nIGJvZHkgYW5kIGluY3JlbWVudGFsIHVwZGF0ZSBsb2dzIG9uIGNsb3NlXG4gIGFzeW5jIGhhbmRsZUNsb3NlRXZlbnQoKSB7XG4gICAgLy8gaWYgaW5pdGlhbCBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCBzZW5kIHVwZGF0ZXMgYW5kIGluZm9sYXllciBpbiBvbmUgYmF0Y2hcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICAvLyBpZiBtYWluIGxvZyBoYXMgYmVlbiBzZW50LCBzZW5kIGluY3JlbWVudGFsIHVwZGF0ZXMgb25seVxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZU1haW5Mb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZU1haW5Mb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgICBsb2dnZXIubG9nKFwiUmVxdWVzdCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpIHtcbiAgICBpZiAoIXRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNVcGRhdGVzU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCB0aGVyZSBpcyBubyBpbmNyZW1lbnRhbCB5ZXRcbiAgICAgIC8vIG9yIGlmIHRoZSB1cGRhdGVzIGhhdmUgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ2hhbmdlZCA9IGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2dzIGNoYW5nZSBzdGF0dXM6IFwiLCBoYXNDaGFuZ2VkKTtcbiAgICBpZiAoIWhhc0NoYW5nZWQpIHJldHVybjtcblxuICAgIGNvbnN0IGxvZ0RhdGEgPSBhd2FpdCB0aGlzLnBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKTtcbiAgICBpZiAobG9nRGF0YSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNlbmRpbmcgaW5jcmVtZW50YWwgbG9nc1wiLCBsb2dEYXRhKTtcbiAgICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MobG9nRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlQXJyaXZhbExvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc0Fycml2YWxMb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBvciBhcnJpdmFsIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICAvLyBrZWVwIHByZXZpb3VzIGhhc2hlcyBhbmQgY29tcHV0ZSBjdXJyZW50IGZvciBhLCBlLCBmIGFuZCByZXR1cm4gdHJ1ZSBpZiBhbnkgb2YgdGhlbSBoYXZlIGNoYW5nZWRcbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IFthLCBlLCBmXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZlwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IFthSGFzaCwgZUhhc2gsIGZIYXNoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldFVuc2VjdXJlSGFzaChKU09OLnN0cmluZ2lmeShhKSksXG4gICAgICBnZXRVbnNlY3VyZUhhc2goSlNPTi5zdHJpbmdpZnkoZSkpLFxuICAgICAgZ2V0VW5zZWN1cmVIYXNoKEpTT04uc3RyaW5naWZ5KGYpKSxcbiAgICBdKTtcblxuICAgIGxldCBoYXNDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBpZiAoYUhhc2ggIT09IHRoaXMuYUhhc2ggfHxcbiAgICAgICAgZUhhc2ggIT09IHRoaXMuZUhhc2ggfHxcbiAgICAgICAgZkhhc2ggIT09IHRoaXMuZkhhc2gpIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYUhhc2ggPSBhSGFzaDtcbiAgICB0aGlzLmVIYXNoID0gZUhhc2g7XG4gICAgdGhpcy5mSGFzaCA9IGZIYXNoO1xuXG4gICAgcmV0dXJuIGhhc0NoYW5nZWQ7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMixcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICBhLCBlLCBmLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBwYWdlaGlkZSBldmVudFwiKTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uaXRvcjtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllckNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0RhdGFMYXllclJ1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSwgdHJ1ZSwgMjUsIDEwMDApO1xuICBpZiAocmVzICE9PSBudWxsICYmIHJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoYEZvdW5kIGtleSAke2tleX0gd2l0aCB2YWx1ZSAke3Jlc31gKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGxvZ2dlci5mYWlsZWQoYEtleSAke2tleX0gbm90IGZvdW5kIGluIGJlYWdsZUluZm9MYXllcmApO1xuICByZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRWxlbWVudENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VsZW1lbnRSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZSwgc2VsZWN0b3IsIHNlbGVjdG9yQWxsLCBzZWxlY3RvckZhbGxiYWNrID0gbnVsbH0gPSBydWxlO1xuICBsZXQgbWFpblNlbGVjdG9yID0gc2VsZWN0b3I7XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbWFpblNlbGVjdG9yID0gc2VsZWN0b3JGYWxsYmFjayA/IHNlbGVjdG9yRmFsbGJhY2sgOiBtYWluU2VsZWN0b3I7XG4gIH1cblxuICBpZiAob3BlcmF0b3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcih3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gIH1cbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChzZWxlY3RvckFsbCAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgZWxlbWVudDtcbiAgaWYgKG1haW5TZWxlY3RvcikgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpO1xuICBlbHNlIGlmIChzZWxlY3RvckFsbCkgZWxlbWVudCA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSk7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJ0ZXh0LW51bWJlclwiOiB7XG4gICAgICBsZXQgdGVtcFZhbDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIHRlbXBWYWwgPSBlbGVtZW50LnJlZHVjZSgocmV0dXJuVmFsLCBlbGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuVmFsICs9IHBhcnNlSW50KGVsZW0udGV4dENvbnRlbnQucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBWYWwgPSBwYXJzZUludCh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgLnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwYXJzZUludCh0ZW1wVmFsKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJjbGFzc0xpc3RcIjpcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiY291bnRcIjoge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgJiYgZWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGVsZW1lbnQubGVuZ3RoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigxLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDAsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjYXNlIFwic3R5bGVcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdHlsZUtleSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICBjb25zdCBzdHlsZVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnRTdHlsZXNbc3R5bGVLZXldO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHN0eWxlVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcIk9wZXJhdG9yIG5vdCBkZWZpbmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUZ1bmN0aW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRnVuY3Rpb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgZnVuY3Rpb24gbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHJ1bGVGdW5jdGlvbiA9IEZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gcnVsZUZ1bmN0aW9uKCk7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVNlc3Npb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tTZXNzaW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkdXJhdGlvblwiOlxuICAgICAgcmV0dXJuIGR1cmF0aW9uSGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiaGlzdG9yeVwiOlxuICAgICAgcmV0dXJuIGhpc3RvcnlIYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZ2V0U2Vzc2lvblRpbWVzdGFtcCA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IERhdGUocGFyc2VJbnQod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9USU1FU1RBTVApKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IHNlc3Npb24gdGltZXN0YW1wXCIsIGVycik7XG4gICAgcmV0dXJuIERhdGUubm93KCk7XG4gIH1cbn07XG5cbmNvbnN0IGR1cmF0aW9uSGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gKERhdGUubm93KCkgLSBnZXRTZXNzaW9uVGltZXN0YW1wKCkpIC8gMTAwMDtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZHVyYXRpb24sIGNvbmRpdGlvbiwgcGFyc2VJbnQodmFsdWUpKTtcbn07XG5cbmNvbnN0IGhpc3RvcnlIYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgY3VycmVudEhpc3RvcnkgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX0hJU1RPUlkpPy5zcGxpdChcIixcIik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGN1cnJlbnRIaXN0b3J5LCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXJsQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrVXJsUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInBhdGhcIjoge1xuICAgICAgY29uc3QgcmVxdWVzdFVSTD0gd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmO1xuICAgICAgY29uc3QgcGF0aCA9IG5ldyBVUkwocmVxdWVzdFVSTCkucGF0aG5hbWU7XG4gICAgICBsb2dnZXIubG9nKGBDaGVja2luZyBwYXRoICR7cGF0aH0gbWF0Y2hlcyBydWxlIHBhdGggJHt2YWx1ZX1gKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHBhdGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWX0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRW52Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRW52UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImRldmljZV90eXBlXCI6IHtcbiAgICAgIGNvbnN0IGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzID8gXCJtb2JpbGVcIiA6IFwiZGVza3RvcFwiO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoaXNNb2JpbGUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZV9jYWNoZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBzdG9yZToge1xuICAgIG5hbWU6IFwiaW5mb0NhY2hlXCIsXG4gICAgaW5kZXhlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIml4X3NrdVwiLFxuICAgICAgICBmaWVsZHM6IFwic2t1XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgb3B0aW9uczoge2tleVBhdGg6IFwic2t1XCJ9LFxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCB7ZmV0Y2hQcm9kdWN0SW5mb30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5XCIpO1xuY2xhc3MgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kZXhlZERCID0gbnVsbDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lLCBjb25maWcudmVyc2lvbik7XG4gICAgaWYgKCFvcGVuUmVxdWVzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW5kZXhlZGRiIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgb3BlblJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcGVuUmVxdWVzdC5yZXN1bHQuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gb3BlblJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBpbmRleGVkIERCXCIsIG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbmRleGVkREIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIHJldHVybiB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gIH1cblxuICBhc3luYyBzYXZlKHBheWxvYWQpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHRpbWVTdGFtcCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICBmb3IgKGNvbnN0IGxvYWQgb2YgcGF5bG9hZCkge1xuICAgICAgICBsb2FkLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcbiAgICAgICAgc3RvcmUucHV0KGxvYWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcbiAgICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXQoc2t1KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGdldFJlcXVlc3QgPSBzdG9yZS5nZXQoc2t1KTtcbiAgICAgICAgZ2V0UmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0UmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgRm91bmQgdmFsdWUgJHtyZXN1bHR9IGZvciBrZXkgJHtza3V9YCk7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBnZXRSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZ2V0dGluZyB2YWx1ZSBmb3Iga2V5OiAke3NrdX1gLCBnZXRSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNvdW50KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3VudFJlcXVlc3QgPSBzdG9yZS5jb3VudCgpO1xuICAgICAgICBjb3VudFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50UmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgQ291bnRlZCAke3Jlc3VsdH0gZW50cmllc2ApO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgY291bnRSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGNvdW50aW5nIGVudHJpZXM6IFwiLCBjb3VudFJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q3Vyc29yKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBjdXJzb3JSZXF1ZXN0ID0gc3RvcmUub3BlbkN1cnNvcigpO1xuICAgICAgICBjdXJzb3JSZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGN1cnNvclJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgZ2V0dGluZyBjdXJzb3JcIiwgY3Vyc29yUmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBwZXJzaXN0UHJvZHVjdEluZm8oKSB7XG4gICAgY29uc3QgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IHRoaXMuZ2V0Q3Vyc29yKCk7XG4gICAgICBjb25zdCB0aW1lU3RhbXAgPSBjdXJzb3IudmFsdWUudGltZVN0YW1wO1xuICAgICAgY29uc3QgZWxhcHNlZFNlY29uZHMgPSAoRGF0ZS5ub3coKSAvIDEwMDApIC0gdGltZVN0YW1wO1xuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgMzYwMCkgcmV0dXJuO1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBpcyBleHBpcmVkXCIpO1xuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0SW5mb0FycmF5ID0gYXdhaXQgZmV0Y2hQcm9kdWN0SW5mbygpO1xuICAgIGlmICghcHJvZHVjdEluZm9BcnJheSB8fCAhcHJvZHVjdEluZm9BcnJheS5sZW5ndGgpIHJldHVybjtcbiAgICBhd2FpdCB0aGlzLnNhdmUodGhpcy5wcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkpO1xuICB9XG5cbiAgcHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICBjb25zdCBwYXlsb2FkcyA9IFtdO1xuICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBwcm9kdWN0SW5mb0FycmF5LnNoaWZ0KCk7XG4gICAgZmllbGROYW1lcy5zaGlmdCgpO1xuICAgIGZvciAoY29uc3QgaW5mbyBvZiBwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge3NrdTogaW5mby5zaGlmdCgpfTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXlsb2FkW2ZpZWxkTmFtZXNbaV1dID0gaW5mb1tpXSB8fCAwO1xuICAgICAgfVxuICAgICAgcGF5bG9hZHMucHVzaChwYXlsb2FkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBheWxvYWRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnk7XG4iLCJpbXBvcnQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSBmcm9tIFwiLi9pbmRleFwiO1xuXG5jb25zdCBTdG9yZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSgpO1xuICAgICAgICAvLyBIaWRlIHRoZSBjb25zdHJ1Y3RvciBzbyB0aGUgcmV0dXJuZWQgb2JqZWN0IGNhbid0IGJlIG5ldydkLi4uXG4gICAgICAgIGluc3RhbmNlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuICB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZUxvb2t1cFwiKTtcbiAgaWYgKCFza3VMaXN0IHx8ICh0eXBlb2Ygc2t1TGlzdCA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMoc2t1TGlzdCkubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgY29uc3Qgc2t1ID0gc2t1TGlzdFtPYmplY3Qua2V5cyhza3VMaXN0KVswXV0/LmlkO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0QWRkVG9DYXJ0Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBwcm9kdWN0Vmlld0NvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRQcmV2aWV3Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiaW1wb3J0IHtjaGVja0RhdGFMYXllclJ1bGV9IGZyb20gXCIuL2RhdGFMYXllckNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbGVtZW50UnVsZX0gZnJvbSBcIi4vZWxlbWVudENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tGdW5jdGlvblJ1bGV9IGZyb20gXCIuL2Z1bmN0aW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Nlc3Npb25SdWxlfSBmcm9tIFwiLi9zZXNzaW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1VybFJ1bGV9IGZyb20gXCIuL3VybENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbnZSdWxlfSBmcm9tIFwiLi9lbnZDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrUHJvZHVjdEluZm9SdWxlfSBmcm9tIFwiLi9wcm9kdWN0SW5mb0NoZWNrZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZDtcbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmVsaWdpYmlsaXR5UnVsZXMpKSB7XG4gICAgICBjb25zdCBzYXRpc2ZpZWRSdWxlSWRzID0gW107XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpKSB7XG4gICAgICAgICAgc2F0aXNmaWVkUnVsZUlkcy5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgLy8gUGFnZSB0eXBlIHJ1bGVzIGFyZSBleGNsdXNpdmU7IGlmIG9uZSBpcyB0cnVlIGFsbCBvdGhlcnMgYXJlIGZhbHNlIGJ5IGRlZmF1bHQsIG5vIG5lZWQgdG8gYXNzZXNzIG90aGVyc1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBlUnVsZXMuJHtrZXl9YCwgc2F0aXNmaWVkUnVsZUlkcyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJTZWdtZW50YXRpb25Db21wdXRlclwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpIHtcbiAgbG9nZ2VyLmxvZyhcIkRldGVybWluaW5nIHVzZXIgc2VnbWVudFwiKTtcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgaWYgKCFydWxlU2V0KSBjb250aW51ZTtcbiAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXX0pO1xuICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgIGxvZ2dlci5sb2coYFVzZXIgc2VnbWVudCBtYXRjaGVkOiAke3NlZ21lbnR9YCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgc2VnbWVudCk7XG4gICAgICByZXR1cm4gc2VnbWVudDtcbiAgICB9XG4gIH1cblxuICBsb2dnZXIubG9nKFwiVXNlciBzZWdtZW50IG5vdCBtYXRjaGVkLCByZXR1cm5pbmcgZGVmYXVsdFwiKTtcbiAgcmV0dXJuIFwiZGVmYXVsdFwiO1xufVxuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZUywgVFJFQVRNRU5UU19EVVJBVElPTn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtmZXRjaFRyZWF0bWVudHMsIGZldGNoVHJlYXRtZW50V2VpZ2h0c30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2NvbXB1dGVTZWdtZW50fSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIik7XG5cbmNsYXNzIFRyZWF0bWVudFJlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gYm9keTtcbiAgICB0aGlzLnRyZWF0bWVudHMgPSB0cmVhdG1lbnRzO1xuXG4gICAgdGhpcy50cmVhdG1lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRzKCkge1xuICAgIGxvZ2dlci5sb2coXCJMb2FkaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3Qge1RSRUFUTUVOVFN9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG4gICAgY29uc3QgdHJlYXRtZW50c09iaiA9IEpTT04ucGFyc2Uod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oVFJFQVRNRU5UUykpO1xuICAgIGxldCB0cmVhdG1lbnRzID0gdHJlYXRtZW50c09iaj8udHJlYXRtZW50cztcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0cmVhdG1lbnRzT2JqPy50aW1lc3RhbXA7XG4gICAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0aW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIG5vdCBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlXCIpO1xuICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkRGF5cyA9IChEYXRlLm5vdygpIC0gdGltZXN0YW1wKSAvICgxMDAwICogMzYwMCAqIDI0KTtcbiAgICAgIGlmIChlbGFwc2VkRGF5cyA+IFRSRUFUTUVOVFNfRFVSQVRJT04pIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgYXJlIGV4cGlyZWRcIik7XG4gICAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJUcmVhdG1lbnRzIGFyZSBsb2FkZWQgZnJvbSBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudFdlaWdodHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBmZXRjaFRyZWF0bWVudFdlaWdodHMoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKCkge1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSB0aGlzLnRyZWF0bWVudFdlaWdodHM7XG4gICAgY29uc3QgdXNlckdyb3VwID0gYXdhaXQgY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cyk7XG4gICAgY29uc3QgdHJlYXRtZW50cyA9IHRoaXMudHJlYXRtZW50cztcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlckdyb3VwV2VpZ2h0cyA9ICh1c2VyR3JvdXAgJiYgdHJlYXRtZW50V2VpZ2h0c1t1c2VyR3JvdXBdKSA/XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzW3VzZXJHcm91cF0gOiB0cmVhdG1lbnRXZWlnaHRzW1wiZGVmYXVsdFwiXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRyZWF0bWVudHMpIHtcbiAgICAgICAgdHJlYXRtZW50LndlaWdodCA9IHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50Py5pZF0/LndlaWdodCB8fCAwO1xuICAgICAgICBpZiAoIXRyZWF0bWVudC5hY3Rpb25zLnNvbWUoKGEpID0+IGEudmFyaWFudHMpKSBjb250aW51ZTtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlYXRtZW50LmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGlmICh1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzICYmIHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50LmlkXS52YXJpYW50c1t2YXJpYW50S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKGAke3RyZWF0bWVudHMubGVuZ3RofSB0cmVhdG1lbnRzIHVzZXIgZ3JvdXAgbWF0Y2hlZGApO1xuICAgIGlmICghdHJlYXRtZW50cy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJSZXBsYWNlVXRpbHNcIik7XG5cbmNvbnN0IHJlcGxhY2VyID0gYXN5bmMgKHZhbHVlLCByZXBsYWNlRm4pID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBbaSwgdmFsXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBsYWNlRm4gPSBBcnJheS5pc0FycmF5KHJlcGxhY2VGbikgPyByZXBsYWNlRm5baV0gOiByZXBsYWNlRm4gfHwgXCJcIjtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihjdXJyZW50UmVwbGFjZUZuKTtcbiAgICAgICAgdmFsdWVbaV0gPSByZXBsYWNlQWxsKHZhbCwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZVtpXSA9IHJlcGxhY2VGbkV4ZWN1dG9yKGN1cnJlbnRSZXBsYWNlRm4sIHZhbCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSkge1xuICAgIGZvciAoY29uc3QgckZuIG9mIHJlcGxhY2VGbikge1xuICAgICAgaWYgKHR5cGVvZiByRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IockZuKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyRm4sIHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbik7XG4gICAgICB2YWx1ZSA9IHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSwgc2luZ2xlID0gZmFsc2UpIHtcbiAgaWYgKHJlcGxhY2VGbiAmJiB2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkV4ZWN1dGluZyByZXBsYWNlIGZ1bmN0aW9uOiBcIiwgcmVwbGFjZUZuKTtcbiAgICBjb25zdCByZXBsYWNlRnVuY3Rpb24gPSBGdW5jdGlvbihyZXBsYWNlRm4pO1xuICAgIGlmIChzaW5nbGUpIHJldHVybiB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICAgIHJldHVybiByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKSB7XG4gIGNvbnN0IHtzdG9yYWdlLCBrZXksIGtleUZhbGxiYWNrLCB0eXBlfSA9IHJlcGxhY2VGbjtcbiAgc3dpdGNoIChzdG9yYWdlKSB7XG4gICAgY2FzZSBcInNlc3Npb25cIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBudWxsO1xuICAgICAgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlGYWxsYmFjayk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSBKU09OLnBhcnNlKHJlcGxhY2VWYWwpO1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSByZXBsYWNlVmFsW3JlcGxhY2VWYWwubGVuZ3RoIC0gMV1bdHlwZV07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkIG5vdCBwYXJzZSAke3JlcGxhY2VWYWx9YCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgICBjYXNlIFwiaW5mby1sYXllclwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5RmFsbGJhY2spO1xuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VyO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBjb25zdCB7YXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIG9wZXJhdG9yLCBzZWxlY3RvciwgdHlwZSwgdmFsdWV9ID0gY29uZGl0aW9uO1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6IHtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBjb25kaXRpb25FbGVtZW50cykge1xuICAgICAgICBjb25zdCBlbGVtZW50U2t1ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChlbGVtZW50U2t1KTtcbiAgICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAgIGlmICghcnVuVGltZVZhbHVlKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgY29udGludWU7XG4gICAgICAgIGVsaWdpYmxlRWxlbWVudHMucHVzaCgkKGVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxpZ2libGVFbGVtZW50cztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi9hY3Rpb24tY29uZGl0aW9uLXV0aWxcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5QWN0aW9ucyhhY3Rpb25zKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVBcHBseUFjdGlvbnNcIik7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUd9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGFjdGlvbjogXCIsIEpTT04uc3RyaW5naWZ5KGFjdGlvbikpO1xuICAgIGNvbnN0IHtcbiAgICAgIG9wZXJhdG9yLFxuICAgICAgdHlwZSxcbiAgICAgIGFwcGx5RXZlbnQsXG4gICAgICBjb250ZW50U2VsZWN0b3IsXG4gICAgICBzZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yRmFsbGJhY2ssXG4gICAgICBtZENvbmRpdGlvbixcbiAgICAgIG1vdmVfc2VsZWN0b3JfMSxcbiAgICAgIG1vdmVfc2VsZWN0b3JfMixcbiAgICAgIHJlcGxhY2VGbixcbiAgICAgIHBUeXBlLFxuICAgICAgYXR0cmlidXRlLFxuICAgIH0gPSBhY3Rpb247XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIm5vb3BcIikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vb3AgT3BlcmF0b3I6IE5vIG9wZXJhdGlvbiBpcyBhcHBsaWVkIG9uIHRhcmdldCBcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHt2YWx1ZX0gPSBhY3Rpb247XG4gICAgLy8gSWYgYW4gZWxlbWVudCBpcyBwYXNzZWQgdG8gdHJhbnNmb3JtZXIsIHNlbGVjdG9yIGlzIHJlbGF0aXZlIHRvIHBhc3NlZCBlbGVtZW50XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmZpbmQoc2VsZWN0b3IpIDogJChzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBtYyA9IG1kQ29uZGl0aW9uID8gd2luZG93Lm1hdGNoTWVkaWEobWRDb25kaXRpb24pLm1hdGNoZXMgOiB0cnVlO1xuICAgIGlmICghbWMpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJNZWRpYSBjb25kaXRpb24gbWlzbWF0Y2g6IFwiLCBtZENvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzEgJiYgIW1vdmVfc2VsZWN0b3JfMikgfHxcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzIgJiYgIW1vdmVfc2VsZWN0b3JfMSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJCb3RoIG1vdmUgc2VsZWN0b3JzIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG1vdmVfc2VsZWN0b3JfMSAmJiBtb3ZlX3NlbGVjdG9yXzIpIHtcbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzEpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAxIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzIpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAyIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBzcGVjaWZpZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCEkKHNlbGVjdG9yRmFsbGJhY2spLmxlbmd0aCAmJiBvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gXCJuby1zZWxlY3RvclwiKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZDogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVHJ5aW5nIGZhbGxiYWNrIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yRmFsbGJhY2spIGVsZW1lbnQgPSAkKHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWxsYmFjayBzZWxlY3RvciBub3QgZm91bmRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VGbikge1xuICAgICAgdmFsdWUgPSBhd2FpdCByZXBsYWNlcih2YWx1ZSwgcmVwbGFjZUZuKTtcbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlbW92aW5nOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJDYW5ub3QgZm91bmQgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5zZXJ0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmVmb3JlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBiZWZvcmU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgaWYgKFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoXCJuZC1hZGQtdG8td2luXCIpKSB7XG4gICAgICAgICAgICAkKFwiLm5kLWFkZC10by13aW5cIikucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFmdGVyXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBhZnRlcjogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFmdGVyKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBlbmRpbmcgdmFsdWU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW9kYWxcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50Lm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAoZWxtID09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNwbGF5TW9kYWwodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwb3B1cFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJQb3B1cCBhbHJlYWR5IGRpc3BsYXllZCBpbiBzZXNzaW9uXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBQb3B1cDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwVHlwZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZXhpdEludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGV4aXQgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtyLCBkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImRcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBkID09PSBcInN0cmluZ1wiICYmICFyLmluY2x1ZGVzKGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWRsZVRpbWVyKElETEVfVElNRU9VVCwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiY29weUludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGNvcHkgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXBwZW5kIHBvcHVwIHRvIGJvZHkgYWZ0ZXIgdGltZW91dCBleHBpcmVzXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlQb3B1cCgpO1xuICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgVHlwZTogJHt0eXBlfSBub3QgZm91bmQgZm9yIG9wZXJhdG9yOiAke29wZXJhdG9yfWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiZWRpdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyB0ZXh0OiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQudGV4dCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgaHRtbDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lmh0bWwodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVBcHBsaWNhdG9yXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVDaGFuZ2VzTWFwID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiU3R5bGUgQ2hhbmdlcyBNYXA6IFwiLCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgICAgc3R5bGVBcHBsaWNhdG9yKGVsZW1lbnQsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWRkQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBhZGRkaW5nIGNsYXNzIHRvICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlbW92ZUNsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgcmVtb3ZlIGNsYXNzIGZyb20gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG9jdW1lbnRUaXRsZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGNoYW5naW5nIGRvY3VtZW50IHRpdGxlIGZyb20gJHtlbGVtZW50fSB0byAke3ZhbHVlfWApO1xuICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09IFwidGFiQ2hhbmdlXCIpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiY2F0Y2hpbmcgZXZlbnQgdGFiY2hhbmdlLi5cIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZSwgdmFsdWUsIG9yaWdpbmFsVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgfSwgMTUwMDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5rbm93biBlZGl0IHR5cGU6IFwiLCB0eXBlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInNldGF0dHJpYnV0ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2V0dGluZyBhdHRyaWJ1dGU6IFwiLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgIHN3aXRjaCAoYXR0cmlidXRlKSB7XG4gICAgICAgIGNhc2UgXCJzcmNcIjpcbiAgICAgICAgICBlbGVtZW50LmNzcyhcImNvbnRlbnRcIiwgYHVybCgke3ZhbHVlLnRyaW0oKX0pYCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jYXNlLWRlY2xhcmF0aW9uc1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcblxuICAgICAgICAgIGVsZW1lbnQuY3NzKHByb3BlcnR5LCBwcm9wZXJ0eVZhbHVlLCBcIiFpbXBvcnRhbnRcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKFwiZnVuY3Rpb25cIikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gRnVuY3Rpb24odmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmF0dHIoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVuaGFuZGxlZCBhdHRyaWJ1dGU6IFNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJyZXBsYWNlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmc6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LnJlcGxhY2VBbGwodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic3dhcFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU3dhcHBpbmc6IFwiLCBtb3ZlX3NlbGVjdG9yXzEsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBjb25zdCBuMSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgbjIgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIHN3YXBOb2RlcyhuMSwgbjIpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5qZWN0c2NyaXB0XCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbmplY3Rpbmcgc2NyaXB0OiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5hcHBlbmQoYDxzY3JpcHQ+JHt2YWx1ZX08L3NjcmlwdD5gKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcIm1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhgTW92aW5nICR7bW92ZV9zZWxlY3Rvcl8xfSB0byAke21vdmVfc2VsZWN0b3JfMn1gKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIHNvdXJjZS5yZW1vdmUoKTtcbiAgICAgIGRlc3RpbmF0aW9uLnByZXBlbmQoc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInByb2R1Y3RJbmZvTG9va3VwXCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlKSA9PiB7XG4gICAgLy8gZ2V0IGtleXMgb2YgcHJvZHVjdEluZm9cbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZUxvb2t1cFwiKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZX0gPSBib2R5O1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5tYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cztcbiAgICB0aGlzLmlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3RzKCkge1xuICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBlbmdhZ2luZyByb2JvdCAke3RyZWF0bWVudC5pZH06ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmluaXRpYXRlUmVhcHBseVJvYm90TWFwKCk7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGFjdGlvbnMsXG4gICAgICBlbGlnaWJpbGl0eVJ1bGVTZXQsXG4gICAgICBkZXZpY2UsXG4gICAgICBkZXBlbmRhbnRfb25fdHJlYXRtZW50LFxuICAgICAgcmVhcHBseV9ldmVudCxcbiAgICAgIHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlLFxuICAgICAgYnVzaW5lc3NSdWxlU2V0LFxuICAgICAgd2VpZ2h0LFxuICAgICAgZGVsYXksXG4gICAgfSA9IHRyZWF0bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBkZWJ1Z01vZGUsXG4gICAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICAgIGVuZ2FnZW1lbnRMb2NrLFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIGlzTW9iaWxlLFxuICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXAsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIHBhZ2VUeXBlLFxuICAgICAgcHJlcGFyZUFuZEFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgaWYgKGVuZ2FnZW1lbnRMb2NrW2lkXSkge1xuICAgICAgbG9nZ2VyLmxvZyhgVHJlYXRtZW50ICR7aWR9IGVuZ2FnZW1lbnQgaW4gcHJvZ3Jlc3MsIHNraXBwaW5nYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IHRydWU7XG5cbiAgICBpZiAoZGVidWdNb2RlICE9PSAxICYmICF3ZWlnaHQgJiYgIWRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGV2aWNlID09PSBcIm1vYmlsZVwiICYmICFpc01vYmlsZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldmljZSA9PT0gXCJkZXNrdG9wXCIgJiYgaXNNb2JpbGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVhcHBseV9ldmVudCkge1xuICAgICAgaWYgKCFyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSB8fCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSA9PT0gcGFnZVR5cGUpIHtcbiAgICAgICAgbGV0IHJlYXBwbHlfZXZlbnRfYXJyYXkgPSByZWFwcGx5X2V2ZW50O1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVhcHBseV9ldmVudCkpIHJlYXBwbHlfZXZlbnRfYXJyYXkgPSBbcmVhcHBseV9ldmVudF07XG4gICAgICAgIGxvZ2dlci5sb2coYFJlYXBwbHkgZXZlbnQgJyR7cmVhcHBseV9ldmVudH0nIGZvdW5kIGZvciB0cmVhdG1lbnQ6ICR7aWR9YCk7XG4gICAgICAgIGZvciAoY29uc3QgcmVhcHBseUV2ZW50IG9mIHJlYXBwbHlfZXZlbnRfYXJyYXkpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA/XG4gICAgICAgICAgICByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdIDogW107XG4gICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IGFscmVhZHkgYWRkZWQgZm9yIHJlYXBwbHkgZXZlbnRcIik7XG4gICAgICAgICAgfSBlbHNlIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gPSBbLi4ucHJldmlvdXNWYWx1ZSwgaWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRPRE8gZ2V0IHNrdSBsaXN0IGJhc2VkIG9uIHByb2R1Y3RJbmZvIFN0b3JhZ2UgKGkuZSBza3UgbGlzdCBvZiBsYXN0IGJhc2tldCB2cyBjdXJyZW50IHBhZ2UpXG5cbiAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZVNldCB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxldCB0cmVhdG1lbnRTa2lwUmF0aW8gPSB3ZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gd2VpZ2h0IHx8IFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICBpZiAoZGVwZW5kYW50X29uX3RyZWF0bWVudCkge1xuICAgICAgICAvLyBJZiBkZXBlbmRhbnQgb24gdHJlYXRtZW50IGlzIGZvdW5kIGFuZCBoYXMgd2VpZ2h0OyB1c2UgaXRzIHNraXAgcmF0aW9cbiAgICAgICAgY29uc3QgZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQgPSBtYXRjaGVkVHJlYXRtZW50cy5maW5kKCh0KSA9PiB0LmlkID09PSBkZXBlbmRhbnRfb25fdHJlYXRtZW50KT8ud2VpZ2h0O1xuICAgICAgICB0cmVhdG1lbnRTa2lwUmF0aW8gPSBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCB8fFxuICAgICAgICAgIFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICB9XG4gICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IHNraXAgcmF0aW86IFwiICsgdHJlYXRtZW50U2tpcFJhdGlvKTtcbiAgICAgIC8vIERldGVybWluaW5nIGlkZW50aWZpZXIgZm9yIGNhbGN1bGF0aW5nIHRyZWF0bWVudCBwZXJjZW50YWdlICh0cmVhdG1lbnRQY3QpXG4gICAgICBjb25zdCBkZXRlcm1pbmluZ0lkZW50aWZpZXIgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50IHx8IGlkO1xuXG4gICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgdGhlIHBlcmNlbnRhZ2UgdmFsdWUgZm9yIHRoZSB0cmVhdG1lbnQgdXNlZCB0byBkZXRlcm1pbmUgaWYgaXQgc2hvdWxkIGJlIHNraXBwZWQgb3Igbm90XG4gICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgMTAwIHdoZW4gZGVidWcgbW9kZSBpcyAxLCBlbnN1cmluZyBubyB0cmVhdG1lbnRzIGFyZSBza2lwcGVkXG4gICAgICBjb25zdCB0cmVhdG1lbnRQY3QgPSBkZWJ1Z01vZGUgPT09IDEgPyAxMDAgOiBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIGRldGVybWluaW5nSWRlbnRpZmllcik7XG4gICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50UGN0OiBcIiArIHRyZWF0bWVudFBjdCArIGAgd2l0aCBkZWJ1ZyBtb2RlICR7ZGVidWdNb2RlID8gXCJvblwiIDogXCJvZmZcIn1gKTtcbiAgICAgIGxldCBidXNpbmVzc1J1bGVJZCA9IG51bGw7XG4gICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBzdWIgdmFyaWFudCBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgICAgYnVzaW5lc3NSdWxlSWQgPSBhd2FpdCB0aGlzLmNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYnVzaW5lc3MgcnVsZSB0cmFuc2Zvcm1hdGlvbiB3aXRoIGlkOiBcIiwgYnVzaW5lc3NSdWxlSWQpO1xuICAgICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHRyZWF0bWVudCB3aXRoIGRlZmF1bHQgdmFsdWVzXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRyZWF0bWVudFBjdCA8IHRyZWF0bWVudFNraXBSYXRpbykge1xuICAgICAgICBsb2dnZXIubG9nKGBUcmVhdG1lbnQgJHtpZH0gc2tpcHBlZCBkdWUgdG8gdHJlYXRtZW50IHNwbGl0IHJhdGlvYCk7XG4gICAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIG51bGwsIFwic2tpcHBlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6IFwiLCBpZCk7XG4gICAgICBlbmdhZ2VtZW50TG9ja1t0cmVhdG1lbnQuaWRdID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCkge1xuICAgIGNvbnN0IFtwcmVwYXJlZCwgdmFyaWFudF0gPSBhd2FpdCBwcmVwYXJlQWN0aW9ucyhpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkKTtcbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiYXBwbGllZFwiKTtcbiAgICB9XG4gIH1cblxuICBpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpIHtcbiAgICBjb25zdCB7cmVBcHBseVRyZWF0bWVudHNNYXAsIG1hdGNoZWRUcmVhdG1lbnRzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVBcHBseVRyZWF0bWVudHNNYXApKSB7XG4gICAgICBjb25zdCB0cmVhdG1lbnRJZHMgPSByZUFwcGx5VHJlYXRtZW50c01hcFtrZXldO1xuICAgICAgY29uc3QgcmVBcHBseVRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKHQpID0+IHRyZWF0bWVudElkcy5pbmNsdWRlcyh0LmlkKSk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiaW5maW5pdGVfc2Nyb2xsXCI6IHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW5maW5pdGVfc2Nyb2xsYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGltZW91dFwiOiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGltZW91dGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5U2VsZWN0b3JMaXN0ID0gQXJyYXkuaXNBcnJheSh0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvcikgP1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yIDogW3RyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcmVhcHBseVNlbGVjdG9yTGlzdCkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBlbGVtZW50X2NoYW5nZWApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25fc2Nyb2xsXCI6IHtcbiAgICAgICAgICAvLyBhZGQgd2luZG93IHNjcm9sbCBsaXN0ZW5lciwgY2FsbCBlbmdhZ2VSb2JvdCBvbiBzY3JvbGwsIGRvIG5vdCB0cmlnZ2VyIG1vcmUgdGhhbiBvbmNlIHBlciAyNTBtc1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRpbWUgPSAwO1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RTY3JvbGxUaW1lID4gMjUwICYmIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBzdCkgPiA1KSB7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIG9uX3Njcm9sbGApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicXVlcnlfc2VhcmNoX2NoYW5nZVwiOiB7XG4gICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICE9PSBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHF1ZXJ5X3NlYXJjaF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlcnZhbFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgaWYgKGFwcGxpZWQ/Llt0cmVhdG1lbnQuaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbnRlcnZhbGApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9fbGF5ZXJfY2hhbmdlXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgICAgICAgICBhZGREYXRhTGlzdGVuZXIodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJlYXBwbHkgZXZlbnQgbm90IGZvdW5kOiBcIiwga2V5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSkge1xuICAgIGxldCBvcHBvc2l0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgW2VsaWdpYmlsaXR5U2NvcGUsIGVsaWdpYmlsaXR5TmFtZV0gPSBlbGlnaWJpbGl0eVJ1bGUuc3BsaXQoXCIuXCIpO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBvcHBvc2l0ZUZsYWcgPSB0cnVlO1xuICAgICAgZWxpZ2liaWxpdHlTY29wZSA9IGVsaWdpYmlsaXR5U2NvcGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYGVSdWxlcy4ke2VsaWdpYmlsaXR5U2NvcGV9YCk7XG4gICAgaWYgKCFyZXMgfHwgIUFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvcHBvc2l0ZUZsYWcgJiYgcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW9wcG9zaXRlRmxhZyAmJiAhcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCwgZWxpZ2liaWxpdHlTZXRUeXBlID0gbnVsbCwgcHJldmlvdXNJc0VsaWdpYmxlID0gbnVsbCkge1xuICAgIGxvZ2dlci5sb2coXCJDaGVja2luZyByb2JvdCBlbGlnaWJpbGl0eVwiKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRWxpZ2liaWxpdHkgUnVsZSBTZXQgJHtlbGlnaWJpbGl0eVJ1bGVTZXR9IGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNFbGlnaWJsZSA9IHByZXZpb3VzSXNFbGlnaWJsZTtcbiAgICBmb3IgKGNvbnN0IGVsaWdpYmlsaXR5UnVsZSBvZiBlbGlnaWJpbGl0eVJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgJiYgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVW5rbm93biBlbGlnaWJpbGl0eVNldFR5cGU6IFwiLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZS5zZXQsIGVsaWdpYmlsaXR5UnVsZS50eXBlLCBpc0VsaWdpYmxlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRWxpZ2libGU7XG4gIH1cblxuICAvLyBSZXR1cm4gaW5kZXggb2YgYnVzaW5lc3NSdWxlLCB0aGlzIGlzIHRoZSBidXNpbmVzc1J1bGVJZFxuICBhc3luYyBjaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGJ1c2luZXNzUnVsZV0gb2YgYnVzaW5lc3NSdWxlU2V0LmVudHJpZXMoKSkge1xuICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoW2J1c2luZXNzUnVsZV0pKSByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4XCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBmZXRjaEVsaWdpYmlsaXR5UnVsZXMsXG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzLFxuICBpbmplY3RTdHlsZVNoZWV0LFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFJvYm90RW5naW5lIGZyb20gXCIuL3JvYm90RW5naW5lXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVPbkNvbXBvbmVudFwiKTtcblxuY29uc3QgYmVhZ2xlT24gPSBhc3luYyAoaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSkgPT4ge1xuICBjb25zdCBwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlID0gU3RvcmUuZ2V0SW5zdGFuY2UoKS5wZXJzaXN0UHJvZHVjdEluZm8oKTtcblxuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSA9IGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBjb25zdCB0cmVhdG1lbnRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50cygpO1xuICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuXG4gIGluamVjdFN0eWxlU2hlZXQoKTtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMoKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBsZXQgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBudWxsO1xuICBpZiAoZGVidWdNb2RlICYmIHNlYXJjaFBhcmFtcy5pbmNsdWRlcyhcImZpbHRlcj1cIikpIHtcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IHNlYXJjaFBhcmFtcy5zbGljZShcbiAgICAgICAgc2VhcmNoUGFyYW1zLmluZGV4T2YoXCJbXCIpICsgMSxcbiAgICAgICAgc2VhcmNoUGFyYW1zLmxhc3RJbmRleE9mKFwiXVwiKSxcbiAgICApLnNwbGl0KFwiLFwiKS5tYXAoKGl0ZW0pID0+IHBhcnNlSW50KGl0ZW0sIDEwKSk7XG4gIH1cblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgfSwgMjAwMCk7XG5cbiAgY29uc3QgW3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIHRyZWF0bWVudHNQcm9taXNlLCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSxcbiAgXSk7XG5cbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJGb3VuZCB0cmVhdG1lbnRzOiBcIiwgdHJlYXRtZW50cyk7XG5cbiAgY29uc3QgdHJlYXRtZW50UmVwb3NpdG9yeSA9IG5ldyBUcmVhdG1lbnRSZXBvc2l0b3J5KHtcbiAgICB0cmVhdG1lbnRzLFxuICAgIHRyZWF0bWVudFdlaWdodHMsXG4gIH0pO1xuXG4gIGNvbnN0IG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50UmVwb3NpdG9yeS5nZXRNYXRjaGVkVHJlYXRtZW50cygpO1xuICBpZiAoIW1hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aCkge1xuICAgIGxvZ2dlci5sb2coXCJObyB0cmVhdG1lbnRzIG1hdGNoZWQsIHJldHVybmluZyB3aXRob3V0IGZ1cnRoZXIgYWN0aW9uXCIpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSwgcGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSxcbiAgXSk7XG5cbiAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgIGRlYnVnTW9kZSxcbiAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICBpZGVudGlmaWVyLFxuICAgIHBhZ2VUeXBlLFxuICB9KTtcbiAgYXdhaXQgcm9ib3RFbmdpbmUuZW5nYWdlUm9ib3RzKCk7XG4gIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuXG4gIGxvZ2dlci5zdWNjZXNzKFwiQXBwbGllZCB0cmVhdG1lbnRzOiBcIiwgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIikpO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICBsZXQgZWxpZ2liaWxpdHlSdWxlcyA9IG51bGw7XG4gIGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm47XG4gIGNvbnN0IHJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7ZWxpZ2liaWxpdHlSdWxlc30pO1xuICBhd2FpdCBydWxlRW5naW5lLmFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xufVxuZXhwb3J0IGRlZmF1bHQgYmVhZ2xlT247XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBNb25pdG9yIGZyb20gXCIuLi9CZWFnbGVNb25pdG9yL2luZGV4XCI7XG5pbXBvcnQgYmVhZ2xlT24gZnJvbSBcIi4uL0JlYWdsZU9uXCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcblxubGV0IFNIVVRET1dOID0gZmFsc2U7XG5jb25zdCBGTElQRkxBRyA9IGZhbHNlO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGxldCBtb25pdG9yID0gbnVsbDtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBpbml0aWFsaXppbmdcIik7XG4gIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG4gIGxldCBlYXJseUxvZ1NlbnQgPSBmYWxzZTtcbiAgbGV0IGhpZGVSZW1vdmVkID0gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBtb25pdG9yID0gbmV3IE1vbml0b3IoKTtcbiAgICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyKCk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IGF3YWl0IGdldElkZW50aWZpZXIoKTtcbiAgICBsb2dnZXIubG9nKFwiRm91bmQgaWRlbnRpZmllcjogXCIsIGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiLCBpZGVudGlmaWVyKTtcbiAgICBsZXQgY29va2llUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIsIGNvb2tpZVBjdCk7XG4gICAgLy8gYWRkIGN1cnJlbnQgZXBvY2ggaW50ZWdlciB0byBiZWFnbGVJbmZvTGF5ZXJcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiwgRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuXG4gICAgY29uc3Qgb29zUmVhc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUpO1xuXG4gICAgLy8gaWYgY2Fubm90IGdldCBjcml0aWNhbCBpbmZvLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgdW5zdXBwb3J0ZWRcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwidW5zdXBwb3J0ZWRcIilcbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCBkZXZpY2VcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEZXZpY2UgZG9lcyBub3QgaGF2ZSByZXF1aXJlZCBjYXBhYmlsaXRpZXNcIik7XG4gICAgfVxuXG4gICAgY29uc3QgaXNMYWJlbFNlbnQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQpO1xuICAgIGNvbnN0IHRpbWVvdXRDb3VudGVyID0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5UKSkgfHwgMDtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuXG4gICAgLy8gaWYgdGltZWQtb3V0IHRvbyBtYW55IHRpbWVzIGZvciB2ZXJ5IGZpcnN0IGludGVyYWN0c2lvbnMsIG1ha2Ugb3V0IG9mIHNjb3BlIGZvciB0aGUgc2Vzc2lvblxuICAgIGlmICghZGVidWdNb2RlICYmICFvb3NSZWFzb24gJiYgIWlzTGFiZWxTZW50ICYmIHRpbWVvdXRDb3VudGVyID4gTUFYX1RJTUVPVVRfUEVSX1NFU1NJT05cbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJlYWdsZSB0aW1lb3V0IHRocmVzaG9sZCByZWFjaGVkXCIpO1xuICAgIH1cblxuICAgIC8vIFZpdmVuc2Ugc3BlY2lmaWM6IENoZWNrIGlmIHVzZXIgaXMgYWRtaW4sIG1ha2luZyB0aGVtIG91dCBvZiBzY29wZVxuICAgIC8vIFRoaXMgbmVlZHMgdG8gd2FpdCBmb3IgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciB0byBzZXQgdGhlIHZ2c0lzU2hvd3Jvb20gdmFsdWVcbiAgICBjb25zdCBpc1Nob3dyb29tID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSk7XG4gICAgaWYgKGlzU2hvd3Jvb20gJiYgKGlzU2hvd3Jvb20gPT09IFwidHJ1ZVwiIHx8IGlzU2hvd3Jvb20gPT09IHRydWUpKSB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSwgXCJlbXBsb3llZVwiKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgc2hvd3Jvb21cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIGZyb20gVlZTIHNob3dyb29tL2NhbGxjZW50ZXJcIik7XG4gICAgfSBlbHNlIGlmIChpc1Nob3dyb29tID09PSBudWxsIHx8IGlzU2hvd3Jvb20gPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5ULCB0aW1lb3V0Q291bnRlciArIDEpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGRldGVybWluZSBpZiB1c2VyIGlzIGZyb20gVlZTIHNob3dyb29tL2NhbGxjZW50ZXJcIik7XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXh0RGF5LWhpZGVcIikpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJlYWdsZSBzY3JpcHQgdGltZWQgb3V0XCIpO1xuICAgIH1cblxuICAgIC8vIGlzT24gY2FuIGJlIHRydWUgKE9OKSwgZmFsc2UgKE9GRilcbiAgICBsZXQgaXNPbiA9IG51bGw7XG5cbiAgICAvLyBGTElQIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGZsYWdcbiAgICBpZiAoRkxJUEZMQUcpIHtcbiAgICAgIGNvb2tpZVBjdCA9IDk5IC0gY29va2llUGN0O1xuICAgIH1cblxuICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcImVtcGxveWVlXCIpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbikge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB1bmtub3duXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBvdXQgb2Ygc2NvcGUgcmVhc29uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBncmVhdGVyIHRoYW4gU1BMSVRfUkFUSU8sIHRoZW4gaW4gT04gbW9kZVxuICAgICAgaXNPbiA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTztcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNPblwiLCBpc09uKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCwgdHJ1ZSk7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogaXNPbi50b1N0cmluZygpfSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgaXNPbi50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwiRm91bmQgY29va2llIHBlcmNlbnRhZ2U6IFwiLCBjb29raWVQY3QpO1xuICAgIGxvZ2dlci5sb2coXCJTcGxpdF9yYXRpbzogXCIsIFNQTElUX1JBVElPKTtcbiAgICBsb2dnZXIubG9nKFwiY29va2llUGN0IDwgU1BMSVRfUkFUSU9cIiwgY29va2llUGN0IDwgU1BMSVRfUkFUSU8pO1xuICAgIGxvZ2dlci5sb2coXCJTZXQgaXNPbjogXCIsIGlzT24pO1xuXG4gICAgLy8gYXdhaXQgY3JpdGljYWwgaW5mbyBiZWZvcmUgc2VuZGluZyBsb2dzIGZvciBwcm9wZXIgYW5hbHl0aWNzIG1lYXN1cmVtZW50c1xuICAgIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIGlmIChwYWdlVHlwZSA9PT0gXCJwdXJjaGFzZVwiKSB7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucmV2ZW51ZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgLy8gc2VuZCBsb2dzIGltbWVkaWF0ZWx5IG9uIHB1cmNoYXNlIHBhZ2UsIGFuZCBmb3JjZSB3YWl0XG4gICAgICBhd2FpdCBtb25pdG9yLnNlbmRMb2dzKHRydWUpO1xuICAgICAgLy8gaWYgcHVyY2hhc2UgaXMgY29tcGxldGUsIGRvIG5vdCBhcHBseSBhbnkgdHJlYXRtZW50cyBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIFNIVVRET1dOID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2VuZCBsb2dzIHdoZW4gcmVhZHksIHN0YXJ0IHNjcmFwaW5nIGFuZCBzZW5kaW5nIGFzeW5jbHlcbiAgICAgIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIH1cbiAgICBlYXJseUxvZ1NlbnQgPSB0cnVlO1xuXG4gICAgaWYgKGlzT24gPT09IHRydWUpIHtcbiAgICAgIGlmICghU0hVVERPV04pIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkJlYWdsZSBPTiBHcm91cCBQYXRoXCIpO1xuICAgICAgICBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9OIEdyb3VwIFNIVVRET1dOIFBhdGhcIik7XG4gICAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09uID09PSBmYWxzZSkge1xuICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT0ZGIEdyb3VwIFBhdGhcIik7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaXNPbiBpcyB1bmRlZmluZWQgb3IgbnVsbFwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiQmVhZ2xlIEVhcmx5IFNjb3BlLW91dCBvciBFUlJPUjogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIGlmICghaGlkZVJlbW92ZWQpIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJDT09LSUVfTkFNRSIsIlRSRUFUTUVOVFNfTE9DQVRJT04iLCJUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiIsIlNUWUxFU0hFRVRfTE9DQVRJT04iLCJEYXRlIiwidG9JU09TdHJpbmciLCJFX1JVTEVTX0xPQ0FUSU9OIiwiUFJPRFVDVF9JTkZPX0xPQ0FUSU9OIiwiTE9HX0FQSV9VUkwiLCJMT09LVVBfQVBJX1VSTCIsIk1PQklMRV9NRURJQV9RVUVSWSIsIlNQTElUX1JBVElPIiwiVFJFQVRNRU5UX1JBVElPIiwiVFJFQVRNRU5UU19EVVJBVElPTiIsIk1BWF9USU1FT1VUX1BFUl9TRVNTSU9OIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlRSRUFUTUVOVFMiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJUSU1FT1VUX0NPVU5UIiwiU0VTU0lPTl9SRUZFUlJFUiIsIkxPQ0FMX1NUT1JBR0VfS0VZUyIsIkRFQlVHX01PREUiLCJPVVRfT0ZfU0NPUEUiLCJJU19MQUJFTF9TRU5UIiwiVVNFUl9JRCIsIkRBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkUiLCJDVVNUT01fU1RPUkFHRV9QUkVGSVgiLCJMb2dnZXIiLCJvcmlnaW4iLCJ0ZXN0aW5nIiwiREVCVUciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXJncyIsImNvbnNvbGUiLCJpbmZvIiwibG9nIiwibWVzc2FnZUNvbmZpZyIsImZvckVhY2giLCJhcmd1bWVudCIsInR5cGUiLCJ3YXJuIiwiZXJyb3IiLCJjb25maWciLCJkYk5hbWUiLCJ2ZXJzaW9uIiwibWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudCIsInN0b3JlIiwibmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJvcHRpb25zIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCJnZXRCcm93c2VyVHlwZSIsImxvZ2dlciIsIl93aW5kb3ciLCJhbGx0aW1lIiwic2Vzc2lvbiIsIkJlYWdsZURhdGFDb2xsZWN0aW9uV3JhcHBlciIsImluZGV4ZWREQiIsImluaXQiLCJvcGVuUmVxdWVzdCIsInRvcCIsIm9wZW4iLCJFcnJvciIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib2xkVmVyc2lvbiIsInJlc3VsdCIsImRlbGV0ZU9iamVjdFN0b3JlIiwiZXJyIiwiZmFpbGVkIiwibWVzc2FnZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiaWR4IiwiY3JlYXRlSW5kZXgiLCJvbmVycm9yIiwib25zdWNjZXNzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInNldFRpbWVvdXQiLCJyZWFkd3JpdGUiLCJnZXRDb25uZWN0aW9uIiwidHgiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiZGF0YU5hbWUiLCJkYXRhVmFsdWUiLCJpbml0VHJhbnNhY3Rpb24iLCJzZXNzaW9uSWQiLCJnZXRDdXJyZW50U2Vzc2lvbklkIiwidGltZSIsIk1hdGgiLCJyb3VuZCIsIm5vdyIsInBheWxvYWQiLCJwdXQiLCJvcCIsInRoZW4iLCJzdG9yZWQiLCJ1bmRlZmluZWQiLCJnZXRDdXJzb3IiLCJjdXJzb3IiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbnRpbnVlIiwibWlubWF4IiwibWFwIiwiTWFwIiwiaGFzIiwic2V0IiwiZ2V0IiwiZ3JvdXBCeSIsImRhdGEiLCJrZXlzIiwibWF4Iiwia2V5IiwiY291bnQiLCJ0b3RhbCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwib3BlbkN1cnNvciIsIklEQktleVJhbmdlIiwib25seSIsInRvU3RyaW5nIiwiaW5kZXhWYWx1ZSIsInN1bSIsInNpemUiLCJ2YWx1ZXMiLCJwdXNoIiwia2V5TmFtZSIsInJlcXVlc3QiLCJkYXRhX3ZhbHVlIiwiZCIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwicGFkU3RhcnQiLCJnZXREYXRlIiwiQ29sbGVjdG9yQXBpIiwiY29sbGVjdG9yQXBpIiwicXVlcnlJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsInF1ZXJ5TWV0aG9kIiwibWluIiwicXVlcnlQcm9taXNlIiwiYXZnIiwibW9kZSIsIm1hdGNoIiwicGFyc2VJbnQiLCJsYXN0IiwiZGF0YVZhbHVlcyIsIm9iaiIsInVwZGF0ZUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVWYWx1ZSIsInVwZGF0ZU1ldGhvZCIsInNhdmUiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZSIsImYiLCJfX2h3bSIsImluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNIiwiaW5mb0xheWVyIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwidHJpbSIsInNwbGl0IiwibGFzdEtleSIsInBvcCIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJBcnJheSIsImlzQXJyYXkiLCJnZXRGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYmxvY2tpbmciLCJwb2xsSW50ZXJ2YWwiLCJ0aW1lb3V0IiwiZ2V0QW55RnJvbUJlYWdsZUluZm9MYXllciIsIm9idGFpbkRhdGEiLCJqc29uR2V0IiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsIkpTT04iLCJzdHJpbmdpZnkiLCJhZGRUcmVhdG1lbnQiLCJpZCIsImJ1c2luZXNzUnVsZUlkIiwidmFyaWFudCIsInN0YXR1cyIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJmZWF0dXJlRW5naW5lZXJpbmdPcHMiLCJmZWF0dXJlTmFtZSIsImNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWVzIiwiT2JqZWN0IiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwic2VsZWN0b3IiLCJmb3JtYXR0ZXIiLCJleGNsdXNpdmUiLCJvcGVyYW5kIiwib2JzZXJ2ZXIiLCJjaGlsZHJlbiIsInByb2Nlc3NGb3JtYXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsInNlYXJjaE9iaiIsInNlYXJjaEVsZW1lbnQiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJxdWVyeVNlbGVjdG9yIiwiaXNGb3VuZCIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwiZmlsdGVyIiwiZWxlbWVudCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJ0cmlnZ2VyUmVzdGFydCIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaW5uZXJUZXh0IiwiYXR0cmliVmFsdWVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInZhbHVlY2hpbGQiLCJhdHRyaWJWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInNldFZhbHVlIiwic3VtUHJpY2UiLCJjaGlsZFRleHQiLCJhcnJheUlubmVyVGV4dCIsImV4Y2x1c2l2ZUVsZW1lbnQiLCJjdXN0b21EYXRhRGVyaXZhdGlvbnMiLCJjdXJyZW50UGFnZVR5cGUiLCJhbGwiLCJpc0NhcnRFbXB0eSIsInRvdGFsQmFzZVByaWNlIiwiY291cG9uTm90QXBwbGljYWJsZSIsInByaWNlcyIsInF1YW50aXRpZXMiLCJ0b3RhbFByaWNlIiwiaSIsImNvdXBvbkFwcGxpY2FibGVBbW91bnQiLCJuZXdTS1VMaXN0Iiwic2t1Iiwic2t1TGlzdCIsInByZXZTS1VMaXN0IiwiZGlmZlNLVUxpc3QiLCJ4IiwicHJvZHVjdEluZm9Mb29rdXAiLCJkaWZmUHJvZHVjdEluZm8iLCJvbGRQcm9kdWN0SW5mbyIsIm5ld1Byb2R1Y3RJbmZvIiwidXBkYXRlZFNLVXMiLCJjb25jYXQiLCJwYXJzZVNlYXJjaFBhdGhzIiwiZG9tU3RhdHVzIiwiZG9jdW1lbnQiLCJyZWFkeVN0YXRlIiwid2ludG9wIiwiZGF0YUxheWVyIiwid2luZG9jIiwiZm91bmROYW1lcyIsIlNldCIsInByZXZGb3VuZE5hbWVzIiwibm90Rm91bmROYW1lcyIsImFkZCIsImlzSWdub3JlIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJmcm9tIiwiam9pbiIsInBhdGgiLCJwYXRoQXJyYXkiLCJjdXJyZW50Iiwic3ViUGF0aCIsInNsaWNlIiwic3ViQXJyYXkiLCJzdWJLZXkiLCJzdWJWYWx1ZSIsIndpbmRvd1B0ciIsIm5hdlB0ciIsIm5hdmlnYXRvciIsInBsYXRmb3JtIiwidXNlckFnZW50RGF0YSIsInVzZXJBZ2VudCIsImRldmljZVBpeGVsUmF0aW8iLCJhdmFpbFdpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIndpbmRvd0RlcHRoIiwiY29sb3JEZXB0aCIsInBpeGVsRGVwdGgiLCJ2cG9ydFNoYXBlIiwidmlzdWFsVmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsImlPUyIsInRlc3QiLCJvcmllbnRhdGlvbkFuZ2xlIiwib3JpZW50YXRpb24iLCJhbmdsZSIsImFicyIsInRlbXAiLCJoaXN0b3J5IiwibmF2QWdlbnQiLCJicmFuZHMiLCJicmFuZCIsIm1vYmlsZSIsImhhcmR3YXJlQ29uY3VycmVuY3kiLCJsYW5ndWFnZSIsImJyb3dzZXJMYW5ndWFnZSIsInN5c3RlbUxhbmd1YWdlIiwidXNlckxhbmd1YWdlIiwibWF4VG91Y2hQb2ludHMiLCJ2ZW5kb3IiLCJjb25uZWN0aW9uIiwiZG93bmxpbmsiLCJjdXJyZW50VVJMIiwiVVJMIiwiaG9zdG5hbWUiLCJkb05vdFRyYWNrIiwibXNEb05vdFRyYWNrIiwicmVmZXJyZXIiLCJmaXJzdFNlc3Npb25SZWZlcnJlciIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsInBhdGhuYW1lIiwicGFnZVR5cGUiLCJwZXJmTWV0cmljcyIsInBlcmZOYXZpZ2F0aW9uTWV0cmljcyIsInBlcmZvcm1hbmNlIiwiZ2V0RW50cmllc0J5VHlwZSIsImNvbm5lY3QiLCJjb25uZWN0RW5kIiwiY29ubmVjdFN0YXJ0IiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJkb20iLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwibG9hZCIsImxvYWRFdmVudEVuZCIsImxvYWRFdmVudFN0YXJ0IiwiZHVyYXRpb24iLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwidGV4dENvbnRlbnQiLCJqc29uY29udGVudCIsInBhcnNlIiwicHJvZHVjdEluZm9Mb29rdXBJblByb2dyZXNzIiwic2t1bGlzdCIsImhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwicHJvZHVjdEluZm8iLCJmZXRjaCIsImJvZHkiLCJvayIsImpzb24iLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJmZXRjaFRyZWF0bWVudHMiLCJ0cmVhdG1lbnRzIiwianNvblRyZWF0bWVudCIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsImZldGNoUHJvZHVjdEluZm8iLCJ0ZXh0IiwicHJvZHVjdEluZm9DU1YiLCJjc3ZUb0FycmF5IiwiZXh0cmFjdENvb2tpZUlkZW50aWZpZXIiLCJjb29raWVTdHJpbmciLCJjb29raWVOYW1lIiwicGFyc2VkIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsImlkZW50aWZpZXIiLCJpZGVudGlmaWVySW5kZXgiLCJkZXRlcm1pbmVQY3QiLCJoYXNoIiwiZ2V0VW5zZWN1cmVIYXNoIiwicGN0IiwiZXhpdFNjcm9sbExpc3RlbmVyIiwiY2FsbEJhY2siLCJsb29wIiwic2Nyb2xsVG9wIiwibGFzdFNjcm9sbFRvcCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInN0eWxlQXBwbGljYXRvciIsImVsZW1lbnRzIiwic3R5bGVDaGFuZ2VzTWFwIiwiZW50cmllcyIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYWN0aW9ucyIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uVGltZXN0YW1wIiwic2Vzc2lvbkhpc3RvcnkiLCJjb25kaXRpb25DaGVja2VyIiwicnVuVGltZVZhbHVlIiwiY29uZGl0aW9uIiwic3VjY2VzcyIsInJlZ2V4IiwiUmVnRXhwIiwiZ2V0RGVidWdNb2RlIiwib29zUmVhc29uIiwicXVlcnlTdHJpbmciLCJzZWFyY2giLCJyZW1vdmVJdGVtIiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJjaGFyIiwiY2hhckNvZGVBdCIsImdldFJhbmRvbUludCIsImZsb29yIiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImRlbGF5IiwibXMiLCJyZXMiLCJkYXRlIiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwidG9kYXkiLCJzdGFydFllYXIiLCJlbmRZZWFyIiwiZXN0aW1hdGVkU3RhcnQiLCJlc3RpbWF0ZWRFbmQiLCJzdGFydERpZmZPdmVyRGF5cyIsImNlaWwiLCJlbmREaWZmT3ZlckRheXMiLCJzdGFydERpZmZPdmVyV2Vla3MiLCJlbmREaWZmT3ZlcldlZWtzIiwiaWRsZVRpbWVyIiwidGltZU91dCIsInJlc2V0VGltZXIiLCJjbGVhclRpbWVvdXQiLCJpZGxlVGltZW91dCIsIm9udG91Y2hzdGFydCIsInN0ckRhdGEiLCJzdHJEZWxpbWl0ZXIiLCJvYmpQYXR0ZXJuIiwiYXJyRGF0YSIsImFyck1hdGNoZXMiLCJleGVjIiwic3RyTWF0Y2hlZERlbGltaXRlciIsInN0ck1hdGNoZWRWYWx1ZSIsIkhFQURFUlMiLCJNb25pdG9yIiwiYUhhc2giLCJlSGFzaCIsImZIYXNoIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsImltbWVkaWF0ZSIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwidXJsIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJsYyIsInUiLCJvbkhhc2hQY3QiLCJCbG9iIiwic3RhcnRzV2l0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbG9zZUV2ZW50IiwiY2FwdHVyZSIsInNlbmRCZWFjb24iLCJxdWV1ZWQiLCJxdWV1ZUludGVydmFsIiwiY2hlY2tEYXRhTGF5ZXJSdWxlIiwicnVsZSIsIm9wZXJhdG9yIiwiZGF0YUxheWVyRmluZGVyIiwicnVudGltZVZhbHVlIiwiY2hlY2tFbGVtZW50UnVsZSIsInNlbGVjdG9yQWxsIiwic2VsZWN0b3JGYWxsYmFjayIsIm1haW5TZWxlY3RvciIsInRlbXBWYWwiLCJyZXR1cm5WYWwiLCJlbGVtIiwiZWxlbWVudFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJzdHlsZUtleSIsInN0eWxlVmFsdWUiLCJjaGVja0Z1bmN0aW9uUnVsZSIsInJ1bGVGdW5jdGlvbiIsIkZ1bmN0aW9uIiwiY2hlY2tTZXNzaW9uUnVsZSIsImR1cmF0aW9uSGFuZGxlciIsImhpc3RvcnlIYW5kbGVyIiwiZ2V0U2Vzc2lvblRpbWVzdGFtcCIsImN1cnJlbnRIaXN0b3J5IiwiY2hlY2tVcmxSdWxlIiwicmVxdWVzdFVSTCIsImNoZWNrRW52UnVsZSIsImlzTW9iaWxlIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IiwidGltZVN0YW1wIiwiZ2V0UmVxdWVzdCIsImNvdW50UmVxdWVzdCIsImN1cnNvclJlcXVlc3QiLCJleGlzdGluZ1Byb2RJbmZvIiwiZWxhcHNlZFNlY29uZHMiLCJwcm9kdWN0SW5mb0FycmF5IiwicHJlcGFyZVBheWxvYWRzIiwicGF5bG9hZHMiLCJmaWVsZE5hbWVzIiwic2hpZnQiLCJTdG9yZSIsImluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsImNoZWNrUHJvZHVjdEluZm9SdWxlIiwiZ2V0VHJhbnNhY3Rpb25Db3VudCIsImdldEFkZFRvQ2FydENvdW50IiwiZ2V0UHJldmlld0NvdW50Iiwic2FsZUNudFZpc2l0b3JzSW4xNSIsImNhcnRDbnRWaXNpdG9yc0luMTUiLCJ2aWV3Q250VmlzaXRvcnNJbjEiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJjaGVja1J1bGUiLCJydWxlU2F0aXNmaWVkIiwiY2hhaW4iLCJjaGFpbl9jb25kaXRpb24iLCJydWxlcyIsInNhdGlzZmllZFJ1bGVJZHMiLCJjb21wdXRlU2VnbWVudCIsInNlZ21lbnQiLCJydWxlU2V0Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJidXNpbmVzc1J1bGVTZXQiLCJjaGVja1J1bGVzIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsInVzZXJHcm91cCIsInVzZXJHcm91cFdlaWdodHMiLCJ0cmVhdG1lbnQiLCJzb21lIiwidHJlYXRtZW50c09iaiIsInRpbWVzdGFtcCIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkRGF5cyIsInJlcGxhY2VyIiwicmVwbGFjZUZuIiwidmFsIiwiY3VycmVudFJlcGxhY2VGbiIsInJlcGxhY2VPYmplY3RFeHRyYWN0b3IiLCJyZXBsYWNlVmFsIiwicmVwbGFjZUZuRXhlY3V0b3IiLCJyRm4iLCJzaW5nbGUiLCJyZXBsYWNlRnVuY3Rpb24iLCJzdG9yYWdlIiwia2V5RmFsbGJhY2siLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImF0dHJpYnV0ZSIsImlubmVyX2NvbmRpdGlvbiIsImVsaWdpYmxlRWxlbWVudHMiLCJjb25kaXRpb25FbGVtZW50cyIsImVsZW1lbnRTa3UiLCIkIiwiYXBwbHlBY3Rpb25zIiwidHJhbnNmb3JtZXIiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwibWRDb25kaXRpb24iLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJwVHlwZSIsIm1jIiwiU3RyaW5nIiwiYmVmb3JlIiwiYWZ0ZXIiLCJvZmYiLCJjcmVhdGVQb3B1cCIsImVsbSIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3BsYXlNb2RhbCIsImdldFByb2R1Y3RJbmZvIiwiZGlzcGxheVBvcHVwIiwiciIsInB1c2hTdGF0ZSIsInN0YXRlIiwib25jZSIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsImNzcyIsInByb3BlcnR5IiwicHJvcGVydHlWYWx1ZSIsImF0dHIiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJwcmVwZW5kIiwic2VudGVuY2UiLCJ3b3JkIiwiY2hhckF0IiwidG9Mb2NhbGVVcHBlckNhc2UiLCJyZXBsYWNlV2l0aFZhbCIsImh0bWxTdHIiLCJ0aXRsZXMiLCJwYXJzZWRUaXRsZXMiLCJwYXJzZWRUaXRsZSIsImhpZGRlbiIsImhhbmRsZVBvcHVwQ2xpY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlTW9kYWxDbGljayIsImNvbnRhaW5zIiwiaGlkZSIsInFQb3B1cCIsImdldEVsZW1lbnRCeUlkIiwiaXNNb2RhbCIsInBvcHVwV3JhcHBlciIsInBvcHVwQ2xvc2VCdXR0b24iLCJwb3B1cENsb3NlQnV0dG9uU3R5bGUiLCJvbmNsaWNrIiwiY29udGVudHMiLCJzcmMiLCJ0ZW1wbGF0ZSIsImlubmVySFRNTCIsInBvcHVwIiwiY29udGVudCIsImZpcnN0Q2hpbGQiLCJwMSIsInBhcmVudE5vZGUiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJPQlNFUlZFUl9DT05GSUciLCJhdHRyaWJ1dGVzIiwiUm9ib3RFbmdpbmUiLCJkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyIsImRlYnVnTW9kZSIsIm1hdGNoZWRUcmVhdG1lbnRzIiwiZW5nYWdlbWVudExvY2siLCJyZUFwcGx5VHJlYXRtZW50c01hcCIsImVuZ2FnZVJvYm90IiwiaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAiLCJlbGlnaWJpbGl0eVJ1bGVTZXQiLCJkZXZpY2UiLCJyZWFwcGx5X2V2ZW50IiwicmVhcHBseV9ldmVudF9wYWdlX3R5cGUiLCJwcmVwYXJlQW5kQXBwbHkiLCJyZWFwcGx5X2V2ZW50X2FycmF5IiwicmVhcHBseUV2ZW50IiwicHJldmlvdXNWYWx1ZSIsImNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0IiwidHJlYXRtZW50U2tpcFJhdGlvIiwiZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQiLCJ0IiwiZGV0ZXJtaW5pbmdJZGVudGlmaWVyIiwidHJlYXRtZW50UGN0IiwiY2hlY2tCdXNpbmVzc1J1bGVzIiwicHJlcGFyZWQiLCJ0cmVhdG1lbnRJZHMiLCJyZUFwcGx5VHJlYXRtZW50cyIsIlJlc2l6ZU9ic2VydmVyIiwicmVhcHBseVNlbGVjdG9yTGlzdCIsInJlYXBwbHlfc2VsZWN0b3IiLCJsYXN0U2Nyb2xsVGltZSIsImdldFRpbWUiLCJzdCIsInBhZ2VZT2Zmc2V0IiwicmVhcHBseUludGVydmFsIiwiYXBwbGllZCIsImJvdW5kRW5nYWdlVHJlYXRtZW50IiwiYmluZCIsImVsaWdpYmlsaXR5UnVsZSIsIm9wcG9zaXRlRmxhZyIsImVsaWdpYmlsaXR5U2NvcGUiLCJlbGlnaWJpbGl0eU5hbWUiLCJlbGlnaWJpbGl0eVNldFR5cGUiLCJwcmV2aW91c0lzRWxpZ2libGUiLCJpc0VsaWdpYmxlIiwiY2hlY2tFbGlnaWJpbGl0eSIsImJ1c2luZXNzUnVsZSIsImJlYWdsZU9uIiwicGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSIsInBlcnNpc3RQcm9kdWN0SW5mbyIsImVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwidHJlYXRtZW50V2VpZ2h0c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRXZWlnaHRzIiwic2VhcmNoUGFyYW1zIiwibGFzdEluZGV4T2YiLCJpdGVtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsImdldE1hdGNoZWRUcmVhdG1lbnRzIiwicm9ib3RFbmdpbmUiLCJlbmdhZ2VSb2JvdHMiLCJydWxlRW5naW5lIiwiU0hVVERPV04iLCJGTElQRkxBRyIsIm1vbml0b3IiLCJlYXJseUxvZ1NlbnQiLCJoaWRlUmVtb3ZlZCIsImNvb2tpZVBjdCIsInBhY2tBbmRRdWV1ZUFycml2YWxMb2ciLCJwcm90b3R5cGUiLCJHTE9WX09OIiwiaXNMYWJlbFNlbnQiLCJ0aW1lb3V0Q291bnRlciIsImlzU2hvd3Jvb20iLCJpc09uIiwic2VuZExvZ3MiXSwic291cmNlUm9vdCI6IiJ9
