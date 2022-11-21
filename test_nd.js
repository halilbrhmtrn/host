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

var isStaging =  true || 0;
var COOKIE_NAME = "_ga"; // TODO revert the following staging env check after moving to new branch structure

var TREATMENTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
var TREATMENT_WEIGHTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
var STYLESHEET_LOCATION = isStaging ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
var E_RULES_LOCATION = isStaging ? "https://ndvivense.glov.ai/eligibility_rules_staging.json" : "https://ndvivense.glov.ai/eligibility_rules.json";
var PRODUCT_INFO_LOCATION = "https://ndvivense.glov.ai/social-proof.csv";
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

    _classCallCheck(this, Logger);

    this.origin = origin;
    this.DEBUG = window.localStorage.getItem(LOCAL_STORAGE_KEYS.DEBUG_MODE);
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
;// CONCATENATED MODULE: ./src/BeagleDataCollection/index.js




function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleDataCollection_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleDataCollection_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleDataCollection_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleDataCollection_arrayLikeToArray(o, minLen); }

function BeagleDataCollection_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable max-len */

var logger = new src_logger("BeagleDataCollection");
var collectorApi;
var setCollectorApi = function setCollectorApi(cA) {
  collectorApi = cA;
}; // keep a table in indexdb the format [session_id, data_name, data_value, stored_value]

var queryInCollector = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(baseFeatureName, queryMethod, window) {
    var queryPromise, _queryPromise, _queryPromise2, data, count, _iterator, _step, _step$value, value, _data, match, _queryPromise3, dataValues;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.log("queryInCollector", baseFeatureName, queryMethod, window);

            if (collectorApi) {
              _context.next = 4;
              break;
            }

            logger.failed("IndexedDB no supported/Initialized");
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
            _iterator = _createForOfIteratorHelper(data);

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
            logger.failed("unknown queryMethod=".concat(queryMethod, " in BeagleDataCollection"));
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
            logger.log("updateInCollector", baseFeatureName, baseFeatureValue, updateMethod);

            if (collectorApi) {
              _context2.next = 4;
              break;
            }

            logger.failed("IndexedDB no supported/Initialized");
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
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(collectorApi) {
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setCollectorApi(collectorApi); // Collect core data

            prepareCoreData(); // Trigger-start the parser loop

            parserCaller(); // Add metrics

            addMetrics();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initializeBeagleInfoLayer(_x) {
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

  return function updateDerivationsInCollector(_x2, _x3) {
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

  return function productInfoLookup(_x4) {
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
var fetchAndPersistProductInfo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(collectorApi) {
    var existingProdInfo, productInfo, productInfoCSV;
    return regenerator_default().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            utils_logger.log("Fetching productInfoLookup ");
            _context4.prev = 1;
            _context4.next = 4;
            return collectorApi.find("productInfoCSV");

          case 4:
            existingProdInfo = _context4.sent;
            console.log(existingProdInfo);

            if (!existingProdInfo) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return");

          case 8:
            utils_logger.log("Fetching product info");
            _context4.next = 11;
            return fetch(PRODUCT_INFO_LOCATION);

          case 11:
            productInfo = _context4.sent;
            _context4.next = 14;
            return productInfo.text();

          case 14:
            productInfoCSV = _context4.sent;
            _context4.next = 17;
            return collectorApi.save("productInfoCSV", csvToArray(productInfoCSV));

          case 17:
            _context4.next = 23;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](1);
            utils_logger.failed("Could not write productInfo to IndexDB", _context4.t0.message);
            return _context4.abrupt("return", null);

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 19]]);
  }));

  return function fetchAndPersistProductInfo(_x) {
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

  return function determinePct(_x2) {
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

  return function prepareActions(_x3, _x4, _x5) {
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

  return function idleTimer(_x6, _x7) {
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
var checkFunctionRule = function checkFunctionRule(rule, opts) {
  functionChecker_logger.log("Checking rule", JSON.stringify(rule));

  var _ref = opts || {},
      productInfo = _ref.productInfo;

  var operator = rule.operator,
      condition = rule.condition,
      value = rule.value,
      bindings = rule.bindings;

  if (!operator) {
    functionChecker_logger.failed("Rule function not defined");
    return false;
  }

  var context = {};

  if (bindings == "productInfo") {
    context = {
      productInfo: productInfo
    };
  }

  var ruleFunction = Function(operator).bind(context);
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
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/productInfoChecker.js



var productInfoChecker_logger = new src_logger("BeagleProductInfoChecker");
var checkProductInfoRule = function checkProductInfoRule(rule, bindings) {
  var _productInfo$Object$k;

  productInfoChecker_logger.log("Checking rule", JSON.stringify(rule));
  var operator = rule.operator,
      condition = rule.condition,
      value = rule.value;
  var productInfo = bindings.productInfo;
  if (!productInfo || _typeof(productInfo) === "object" && !Object.keys(productInfo).length) return false;
  var runtimeValue = null;
  var sku = (_productInfo$Object$k = productInfo[Object.keys(productInfo)[0]]) === null || _productInfo$Object$k === void 0 ? void 0 : _productInfo$Object$k.id;

  switch (operator) {
    case "transactionIn2Weeks":
      {
        productInfoChecker_logger.log("Getting TransactionCount for sku ", sku);
        runtimeValue = getTransactionCount(sku, productInfo);
        break;
      }

    case "addToCartIn2Weeks":
      {
        productInfoChecker_logger.log("Getting AddToCartCount for sku ", sku);
        runtimeValue = getAddToCartCount(sku, productInfo);
        break;
      }

    case "productViewCount":
      {
        productInfoChecker_logger.log("Getting productViewCount for sku ", sku);
        runtimeValue = getPreviewCount(sku, productInfo);
        break;
      }
  }

  return conditionChecker(runtimeValue, condition, value);
};

var getTransactionCount = function getTransactionCount(sku, productInfo) {
  if (sku && productInfo && productInfo[sku]) {
    var _productInfo$sku, _productInfo$sku$cata;

    return (_productInfo$sku = productInfo[sku]) === null || _productInfo$sku === void 0 ? void 0 : (_productInfo$sku$cata = _productInfo$sku.catalog) === null || _productInfo$sku$cata === void 0 ? void 0 : _productInfo$sku$cata.transactionIn2Weeks;
  }

  return -1;
};

var getAddToCartCount = function getAddToCartCount(sku, productInfo) {
  if (sku && productInfo && productInfo[sku]) {
    var _productInfo$sku2, _productInfo$sku2$cat;

    return (_productInfo$sku2 = productInfo[sku]) === null || _productInfo$sku2 === void 0 ? void 0 : (_productInfo$sku2$cat = _productInfo$sku2.catalog) === null || _productInfo$sku2$cat === void 0 ? void 0 : _productInfo$sku2$cat.addToCartIn2Weeks;
  }

  return -1;
};

var getPreviewCount = function getPreviewCount(sku, productInfo) {
  if (sku && productInfo && productInfo[sku]) {
    var _productInfo$sku3, _productInfo$sku3$cat;

    return (_productInfo$sku3 = productInfo[sku]) === null || _productInfo$sku3 === void 0 ? void 0 : (_productInfo$sku3$cat = _productInfo$sku3.catalog) === null || _productInfo$sku3$cat === void 0 ? void 0 : _productInfo$sku3$cat.productViewCount;
  }

  return -1;
};
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/index.js






function BeagleRuleEngine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleRuleEngine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleRuleEngine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleRuleEngine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleRuleEngine_arrayLikeToArray(o, minLen); }

function BeagleRuleEngine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }










var BeagleRuleEngine_logger = new src_logger("BeagleRuleEngine");

var RuleEngine = /*#__PURE__*/function () {
  function RuleEngine(body) {
    _classCallCheck(this, RuleEngine);

    var eligibilityRules = body.eligibilityRules,
        baseRuleSet = body.baseRuleSet,
        bindings = body.bindings;
    this.baseRuleSet = baseRuleSet;
    this.eligibilityRules = eligibilityRules;
    this.bindings = bindings;
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
                _context2.next = _context2.t0 === "session" ? 5 : _context2.t0 === "element" ? 7 : _context2.t0 === "dataLayer" ? 9 : _context2.t0 === "url" ? 13 : _context2.t0 === "function" ? 15 : _context2.t0 === "environment" ? 17 : _context2.t0 === "productInfoLookup" ? 19 : 21;
                break;

              case 5:
                ruleSatisfied = checkSessionRule(rule);
                return _context2.abrupt("break", 23);

              case 7:
                ruleSatisfied = checkElementRule(rule);
                return _context2.abrupt("break", 23);

              case 9:
                _context2.next = 11;
                return checkDataLayerRule(rule);

              case 11:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 23);

              case 13:
                ruleSatisfied = checkUrlRule(rule);
                return _context2.abrupt("break", 23);

              case 15:
                ruleSatisfied = checkFunctionRule(rule, this.bindings);
                return _context2.abrupt("break", 23);

              case 17:
                ruleSatisfied = checkEnvRule(rule);
                return _context2.abrupt("break", 23);

              case 19:
                ruleSatisfied = checkProductInfoRule(rule, this.bindings);
                return _context2.abrupt("break", 23);

              case 21:
                BeagleRuleEngine_logger.failed("No such rule type: ".concat(type));
                return _context2.abrupt("return", null);

              case 23:
                if (!chain) {
                  _context2.next = 49;
                  break;
                }

                _context2.t1 = chain_condition;
                _context2.next = _context2.t1 === "and" ? 27 : _context2.t1 === "or" ? 34 : _context2.t1 === "xor" ? 41 : 47;
                break;

              case 27:
                _context2.t2 = ruleSatisfied;

                if (!_context2.t2) {
                  _context2.next = 32;
                  break;
                }

                _context2.next = 31;
                return this.checkRule(chain);

              case 31:
                _context2.t2 = _context2.sent;

              case 32:
                ruleSatisfied = _context2.t2;
                return _context2.abrupt("break", 49);

              case 34:
                _context2.t3 = ruleSatisfied;

                if (_context2.t3) {
                  _context2.next = 39;
                  break;
                }

                _context2.next = 38;
                return this.checkRule(chain);

              case 38:
                _context2.t3 = _context2.sent;

              case 39:
                ruleSatisfied = _context2.t3;
                return _context2.abrupt("break", 49);

              case 41:
                _context2.t4 = ruleSatisfied;
                _context2.next = 44;
                return this.checkRule(chain);

              case 44:
                _context2.t5 = _context2.sent;
                ruleSatisfied = _context2.t4 != _context2.t5;
                return _context2.abrupt("break", 49);

              case 47:
                BeagleRuleEngine_logger.failed("No such chain condition");
                return _context2.abrupt("break", 49);

              case 49:
                return _context2.abrupt("return", ruleSatisfied);

              case 50:
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
              businessRuleSet: [],
              bindings: null
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

var checkActionCondition = function checkActionCondition(condition, productInfo) {
  var attribute = condition.attribute,
      inner_condition = condition.inner_condition,
      operator = condition.operator,
      selector = condition.selector,
      type = condition.type,
      value = condition.value;
  action_condition_util_logger.log("Action condition found: ", condition);
  var eligibleElements = [];

  switch (type) {
    case "productInfoLookup":
      {
        var conditionElements = Array.from(window.top.document.querySelectorAll(selector));

        for (var _i = 0, _conditionElements = conditionElements; _i < _conditionElements.length; _i++) {
          var _productInfo$elementS, _productInfo$elementS2;

          var element = _conditionElements[_i];
          var elementSku = element.getAttribute(attribute);
          var runTimeValue = productInfo === null || productInfo === void 0 ? void 0 : (_productInfo$elementS = productInfo[elementSku]) === null || _productInfo$elementS === void 0 ? void 0 : (_productInfo$elementS2 = _productInfo$elementS.catalog) === null || _productInfo$elementS2 === void 0 ? void 0 : _productInfo$elementS2[operator];

          if (!runTimeValue) {
            action_condition_util_logger.failed("Product info is empty");
            continue;
          }

          if (!conditionChecker(runTimeValue, inner_condition, value)) continue;
          eligibleElements.push($(element));
        }
      }
  }

  return eligibleElements;
};

/* harmony default export */ var action_condition_util = (checkActionCondition);
;// CONCATENATED MODULE: ./src/BeagleApplyActions/index.js




function BeagleApplyActions_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleApplyActions_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function BeagleApplyActions_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleApplyActions_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleApplyActions_arrayLikeToArray(o, minLen); }

function BeagleApplyActions_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









function applyActions(_x, _x2) {
  return _applyActions.apply(this, arguments);
}

function _applyActions() {
  _applyActions = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(actions, bindings) {
    var logger, POPUP_DISPLAY_FLAG, productInfo, transformer, replaceWithVal, getProductInfo, handleDocumentTitleTabChange, handlePopupClick, handleModalClick, displayPopup, displayModal, createPopup, swapNodes, waitForJQuery, actionApplicator, result;
    return regenerator_default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            logger = new src_logger("BeagleApplyActions");
            POPUP_DISPLAY_FLAG = SESSION_STORAGE_KEYS.POPUP_DISPLAY_FLAG;
            productInfo = bindings.productInfo;

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
                        return replace_utils(value, replaceFn, productInfo);

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

                        _context.next = 213;
                        break;

                      case 47:
                        if (!(operator === "insert")) {
                          _context.next = 118;
                          break;
                        }

                        _context.t0 = type;
                        _context.next = _context.t0 === "before" ? 51 : _context.t0 === "after" ? 55 : _context.t0 === "append" ? 58 : _context.t0 === "modal" ? 61 : _context.t0 === "popup" ? 66 : 114;
                        break;

                      case 51:
                        logger.log("Inserting before: ", value);

                        if (String(value).includes("nd-add-to-win")) {
                          $(".nd-add-to-win").remove();
                        }

                        element.before(value);
                        return _context.abrupt("break", 116);

                      case 55:
                        logger.log("Inserting after: ", value);
                        element.after(value);
                        return _context.abrupt("break", 116);

                      case 58:
                        logger.log("Appending value: ", value);
                        element.append(value);
                        return _context.abrupt("break", 116);

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
                        return _context.abrupt("break", 116);

                      case 66:
                        if (!(parseInt(sessionStorage.getItem(POPUP_DISPLAY_FLAG)) !== 0)) {
                          _context.next = 69;
                          break;
                        }

                        logger.log("Popup already displayed in session");
                        return _context.abrupt("break", 116);

                      case 69:
                        logger.log("Creating Popup: ", value);

                        if (pType) {
                          value = getProductInfo(productInfo, pType, value);
                        }

                        createPopup(value, contentSelector);

                        if (!applyEvent) {
                          _context.next = 112;
                          break;
                        }

                        mobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
                        _iterator = BeagleApplyActions_createForOfIteratorHelper(applyEvent);
                        _context.prev = 75;

                        _iterator.s();

                      case 77:
                        if ((_step = _iterator.n()).done) {
                          _context.next = 102;
                          break;
                        }

                        event = _step.value;
                        _context.t1 = event;
                        _context.next = _context.t1 === "exitIntent" ? 82 : _context.t1 === "copyIntent" ? 97 : 100;
                        break;

                      case 82:
                        logger.log("Adding exit intent listener");

                        if (!mobile) {
                          _context.next = 95;
                          break;
                        }

                        window.top.addEventListener("visibilitychange", displayPopup);
                        _context.next = 87;
                        return Promise.all([getFromBeagleInfoLayer("r", true), getFromBeagleInfoLayer("d", true)]);

                      case 87:
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
                        _context.next = 96;
                        break;

                      case 95:
                        window.top.document.documentElement.addEventListener("mouseleave", displayPopup, {
                          once: true
                        });

                      case 96:
                        return _context.abrupt("break", 100);

                      case 97:
                        logger.log("Adding copy intent listener");
                        window.top.document.documentElement.addEventListener("copy", displayPopup, {
                          once: true
                        });
                        return _context.abrupt("break", 100);

                      case 100:
                        _context.next = 77;
                        break;

                      case 102:
                        _context.next = 107;
                        break;

                      case 104:
                        _context.prev = 104;
                        _context.t2 = _context["catch"](75);

                        _iterator.e(_context.t2);

                      case 107:
                        _context.prev = 107;

                        _iterator.f();

                        return _context.finish(107);

                      case 110:
                        _context.next = 113;
                        break;

                      case 112:
                        // append popup to body after timeout expires
                        setTimeout(function () {
                          displayPopup();
                        }, timeout);

                      case 113:
                        return _context.abrupt("break", 116);

                      case 114:
                        logger.failed("Type: ".concat(type, " not found for operator: ").concat(operator));
                        return _context.abrupt("break", 116);

                      case 116:
                        _context.next = 213;
                        break;

                      case 118:
                        if (!(operator === "edit")) {
                          _context.next = 146;
                          break;
                        }

                        _context.t3 = type;
                        _context.next = _context.t3 === "text" ? 122 : _context.t3 === "html" ? 125 : _context.t3 === "styleApplicator" ? 128 : _context.t3 === "addClass" ? 133 : _context.t3 === "removeClass" ? 136 : _context.t3 === "documentTitle" ? 139 : 142;
                        break;

                      case 122:
                        logger.log("Editing text: ", value);
                        element.text(value);
                        return _context.abrupt("break", 144);

                      case 125:
                        logger.log("Editing html: ", value);
                        element.html(value);
                        return _context.abrupt("break", 144);

                      case 128:
                        logger.log("Applying style: ", value);
                        styleChangesMap = JSON.parse(value);
                        logger.log("Style Changes Map: ", styleChangesMap);
                        styleApplicator(element, styleChangesMap);
                        return _context.abrupt("break", 144);

                      case 133:
                        logger.log("addding class to ".concat(element, " named ").concat(value));
                        element.addClass(value);
                        return _context.abrupt("break", 144);

                      case 136:
                        logger.log("remove class from ".concat(element, " named ").concat(value));
                        element.removeClass(value);
                        return _context.abrupt("break", 144);

                      case 139:
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

                        return _context.abrupt("break", 144);

                      case 142:
                        logger.log("Unknown edit type: ", type);
                        return _context.abrupt("break", 144);

                      case 144:
                        _context.next = 213;
                        break;

                      case 146:
                        if (!(operator === "setattribute")) {
                          _context.next = 163;
                          break;
                        }

                        logger.log("Setting attribute: ", attribute, value);
                        _context.t4 = attribute;
                        _context.next = _context.t4 === "src" ? 151 : _context.t4 === "style" ? 153 : 157;
                        break;

                      case 151:
                        element.css("content", "url(".concat(value.trim(), ")"));
                        return _context.abrupt("break", 161);

                      case 153:
                        // eslint-disable-next-line no-case-declarations
                        property = value.split(":")[0].trim(); // eslint-disable-next-line no-case-declarations

                        propertyValue = value.split(":")[1].trim();
                        element.css(property, propertyValue, "!important");
                        return _context.abrupt("break", 161);

                      case 157:
                        if (value.includes("function")) {
                          value = Function(value);
                        }

                        element.attr(attribute, value);
                        logger.log("Unhandled attribute: Setting attribute: ", attribute, value);
                        return _context.abrupt("break", 161);

                      case 161:
                        _context.next = 213;
                        break;

                      case 163:
                        if (!(operator === "replace")) {
                          _context.next = 168;
                          break;
                        }

                        logger.log("Replacing: ", value);
                        element.replaceAll(value);
                        _context.next = 213;
                        break;

                      case 168:
                        if (!(operator === "swap")) {
                          _context.next = 175;
                          break;
                        }

                        logger.log("Swapping: ", move_selector_1, move_selector_2);
                        n1 = window.top.document.querySelector(move_selector_1);
                        n2 = window.top.document.querySelector(move_selector_2);
                        swapNodes(n1, n2);
                        _context.next = 213;
                        break;

                      case 175:
                        if (!(operator === "injectscript")) {
                          _context.next = 180;
                          break;
                        }

                        logger.log("Injecting script: ", value);
                        element.append("<script>".concat(value, "</script>"));
                        _context.next = 213;
                        break;

                      case 180:
                        if (!(operator === "move")) {
                          _context.next = 188;
                          break;
                        }

                        logger.log("Moving ".concat(move_selector_1, " to ").concat(move_selector_2));
                        source = window.top.document.querySelector(move_selector_1);
                        destination = window.top.document.querySelector(move_selector_2);
                        source.remove();
                        destination.prepend(source);
                        _context.next = 213;
                        break;

                      case 188:
                        if (!(operator === "productInfoLookup")) {
                          _context.next = 193;
                          break;
                        }

                        res = getProductInfo(productInfo, pType, value);
                        element.before(res);
                        _context.next = 213;
                        break;

                      case 193:
                        if (!(operator === "text-transform")) {
                          _context.next = 212;
                          break;
                        }

                        _context.t5 = type;
                        _context.next = _context.t5 === "capitalize" ? 197 : _context.t5 === "PLACEHOLDER" ? 208 : 209;
                        break;

                      case 197:
                        _i = 0, _Array$from = Array.from(element);

                      case 198:
                        if (!(_i < _Array$from.length)) {
                          _context.next = 207;
                          break;
                        }

                        e = _Array$from[_i];

                        if (!((_e$innerText = e.innerText) !== null && _e$innerText !== void 0 && _e$innerText.includes("\n"))) {
                          _context.next = 203;
                          break;
                        }

                        e.innerText = turkishToLower(e.innerText).split("\n").map(function (sentence) {
                          return sentence.split(" ").map(function (word) {
                            return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                          }).join(" ");
                        }).join("\n");
                        return _context.abrupt("continue", 204);

                      case 203:
                        e.innerText = turkishToLower(e.innerText).split(" ").map(function (word) {
                          return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                        }).join(" ");

                      case 204:
                        _i++;
                        _context.next = 198;
                        break;

                      case 207:
                        return _context.abrupt("break", 210);

                      case 208:
                        return _context.abrupt("break", 210);

                      case 209:
                        return _context.abrupt("break", 210);

                      case 210:
                        _context.next = 213;
                        break;

                      case 212:
                        logger.failed("No such operator exists yet", operator);

                      case 213:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[75, 104, 107, 110]]);
              }));

              function transformer(_x3) {
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

            getProductInfo = function getProductInfo(productInfo, type, value) {
              // get keys of productInfo
              var skuList = Object.keys(productInfo);
              var res = null;

              if (!skuList || skuList.length === 0) {
                logger.log("No sku found");
                return null;
              }

              var elementSku = skuList[0];

              switch (type) {
                case "transactionIn2Weeks":
                  {
                    var _productInfo$elementS;

                    res = replaceWithVal((_productInfo$elementS = productInfo[elementSku].catalog.transactionIn2Weeks) === null || _productInfo$elementS === void 0 ? void 0 : _productInfo$elementS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                    logger.log("Replacing transcationIn2Weeks ", productInfo[elementSku].catalog.transactionIn2Weeks);
                    break;
                  }

                case "addToCartIn2Weeks":
                  {
                    var _productInfo$elementS2;

                    res = replaceWithVal((_productInfo$elementS2 = productInfo[elementSku].catalog.addToCartIn2Weeks) === null || _productInfo$elementS2 === void 0 ? void 0 : _productInfo$elementS2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                    logger.log("Replacing AddToCartCount ", productInfo[elementSku].catalog.addToCartIn2Weeks);
                    break;
                  }

                case "productViewCount":
                  {
                    var _productInfo$elementS3;

                    res = replaceWithVal((_productInfo$elementS3 = productInfo[elementSku].catalog.productViewCount) === null || _productInfo$elementS3 === void 0 ? void 0 : _productInfo$elementS3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                    logger.log("Replacing productViewCount for", productInfo[elementSku].catalog.productViewCount);
                    break;
                  }

                default:
                  logger.failed("no such type found for productInfoLookup operator: " + type);
              }

              return res;
            };

            handleDocumentTitleTabChange = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(event, titles, originalTitle) {
                var parsedTitles, _iterator3, _step3, parsedTitle;

                return regenerator_default().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        parsedTitles = !Array.isArray(titles) ? [titles] : titles;
                        _iterator3 = BeagleApplyActions_createForOfIteratorHelper(parsedTitles);
                        _context2.prev = 2;

                        _iterator3.s();

                      case 4:
                        if ((_step3 = _iterator3.n()).done) {
                          _context2.next = 18;
                          break;
                        }

                        parsedTitle = _step3.value;

                        if (!window.top.document.hidden) {
                          _context2.next = 15;
                          break;
                        }

                        window.top.document.title = parsedTitle;
                        _context2.next = 10;
                        return delay(2000);

                      case 10:
                        window.top.document.title = originalTitle;
                        _context2.next = 13;
                        return delay(2000);

                      case 13:
                        _context2.next = 16;
                        break;

                      case 15:
                        window.top.document.title = originalTitle;

                      case 16:
                        _context2.next = 4;
                        break;

                      case 18:
                        _context2.next = 23;
                        break;

                      case 20:
                        _context2.prev = 20;
                        _context2.t0 = _context2["catch"](2);

                        _iterator3.e(_context2.t0);

                      case 23:
                        _context2.prev = 23;

                        _iterator3.f();

                        return _context2.finish(23);

                      case 26:
                        if (!window.top.document.hidden) {
                          window.top.document.title = originalTitle;
                        } else {
                          handleDocumentTitleTabChange(event, titles, originalTitle);
                        }

                      case 27:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[2, 20, 23, 26]]);
              }));

              return function handleDocumentTitleTabChange(_x4, _x5, _x6) {
                return _ref.apply(this, arguments);
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
                  setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
                    return regenerator_default().wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            clearInterval(jQueryInterval);
                            resolve(false);

                          case 2:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })), 2000);
                } else resolve(true);
              });
            };

            actionApplicator = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(actions) {
                var _iterator4, _step4, action, _result, eligibleElements, _iterator5, _step5, element;

                return regenerator_default().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return waitForJQuery();

                      case 2:
                        if (!_context4.sent) {
                          _context4.next = 57;
                          break;
                        }

                        _iterator4 = BeagleApplyActions_createForOfIteratorHelper(actions);
                        _context4.prev = 4;

                        _iterator4.s();

                      case 6:
                        if ((_step4 = _iterator4.n()).done) {
                          _context4.next = 47;
                          break;
                        }

                        action = _step4.value;
                        _context4.prev = 8;
                        _result = false;

                        if (!action.condition) {
                          _context4.next = 34;
                          break;
                        }

                        eligibleElements = action_condition_util(action.condition, productInfo);
                        _iterator5 = BeagleApplyActions_createForOfIteratorHelper(eligibleElements);
                        _context4.prev = 13;

                        _iterator5.s();

                      case 15:
                        if ((_step5 = _iterator5.n()).done) {
                          _context4.next = 24;
                          break;
                        }

                        element = _step5.value;
                        _context4.next = 19;
                        return transformer(action, element);

                      case 19:
                        _result = _context4.sent;

                        if (!(_result === false)) {
                          _context4.next = 22;
                          break;
                        }

                        return _context4.abrupt("return", false);

                      case 22:
                        _context4.next = 15;
                        break;

                      case 24:
                        _context4.next = 29;
                        break;

                      case 26:
                        _context4.prev = 26;
                        _context4.t0 = _context4["catch"](13);

                        _iterator5.e(_context4.t0);

                      case 29:
                        _context4.prev = 29;

                        _iterator5.f();

                        return _context4.finish(29);

                      case 32:
                        _context4.next = 37;
                        break;

                      case 34:
                        _context4.next = 36;
                        return transformer(action);

                      case 36:
                        _result = _context4.sent;

                      case 37:
                        if (!(_result === false)) {
                          _context4.next = 39;
                          break;
                        }

                        return _context4.abrupt("return", false);

                      case 39:
                        _context4.next = 45;
                        break;

                      case 41:
                        _context4.prev = 41;
                        _context4.t1 = _context4["catch"](8);
                        logger.failed("Couldn't apply action ".concat(JSON.stringify(action), " with error ").concat(_context4.t1.message));
                        return _context4.abrupt("return", _context4.t1);

                      case 45:
                        _context4.next = 6;
                        break;

                      case 47:
                        _context4.next = 52;
                        break;

                      case 49:
                        _context4.prev = 49;
                        _context4.t2 = _context4["catch"](4);

                        _iterator4.e(_context4.t2);

                      case 52:
                        _context4.prev = 52;

                        _iterator4.f();

                        return _context4.finish(52);

                      case 55:
                        _context4.next = 59;
                        break;

                      case 57:
                        logger.failed("Jquery not found on window");
                        return _context4.abrupt("return", false);

                      case 59:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, null, [[4, 49, 52, 55], [8, 41], [13, 26, 29, 32]]);
              }));

              return function actionApplicator(_x7) {
                return _ref3.apply(this, arguments);
              };
            }(); // Apply actions


            _context5.next = 17;
            return actionApplicator(actions);

          case 17:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
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

    var mainProductInfo = body.mainProductInfo,
        debugFilteredTreatments = body.debugFilteredTreatments,
        debugMode = body.debugMode,
        matchedTreatments = body.matchedTreatments,
        identifier = body.identifier,
        pageType = body.pageType;
    this.engagementLock = {};
    this.pageType = pageType;
    this.debugMode = debugMode;
    this.identifier = identifier;
    this.reApplyTreatmentsMap = {};
    this.mainProductInfo = mainProductInfo;
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
        var id, actions, eligibilityRuleSet, device, dependant_on_treatment, reapply_event, reapply_event_page_type, businessRuleSet, weight, delay, productInfoStorage, debugMode, debugFilteredTreatments, engagementLock, identifier, isMobile, reApplyTreatmentsMap, mainProductInfo, matchedTreatments, pageType, prepareAndApply, reapply_event_array, _iterator2, _step2, reapplyEvent, previousValue, productInfo, bindings, treatmentSkipRatio, _matchedTreatments$fi, dependantOnTreatmentWeight, determiningIdentifier, treatmentPct, businessRuleId;

        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = treatment.id, actions = treatment.actions, eligibilityRuleSet = treatment.eligibilityRuleSet, device = treatment.device, dependant_on_treatment = treatment.dependant_on_treatment, reapply_event = treatment.reapply_event, reapply_event_page_type = treatment.reapply_event_page_type, businessRuleSet = treatment.businessRuleSet, weight = treatment.weight, delay = treatment.delay, productInfoStorage = treatment.productInfoStorage;
                debugMode = this.debugMode, debugFilteredTreatments = this.debugFilteredTreatments, engagementLock = this.engagementLock, identifier = this.identifier, isMobile = this.isMobile, reApplyTreatmentsMap = this.reApplyTreatmentsMap, mainProductInfo = this.mainProductInfo, matchedTreatments = this.matchedTreatments, pageType = this.pageType, prepareAndApply = this.prepareAndApply; // one engagement at a time

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

                productInfo = mainProductInfo;

                if (!(pageType !== "basket" && productInfoStorage === "basket")) {
                  _context3.next = 26;
                  break;
                }

                _context3.next = 25;
                return getFromBeagleInfoLayer("__features.SKUsonLastBasketLookup", true, 50, 500);

              case 25:
                productInfo = _context3.sent;

              case 26:
                if (!((!productInfo || !Object.keys(productInfo).length) && ["Productpage", "basket", "Listingpage"].includes(pageType))) {
                  _context3.next = 38;
                  break;
                }

                robotEngine_logger.log("Retry get product info from infoLayer");

                if (!(pageType !== "basket" && productInfoStorage === "basket")) {
                  _context3.next = 34;
                  break;
                }

                _context3.next = 31;
                return getFromBeagleInfoLayer("__features.SKUsonLastBasketLookup", true, 50, 500);

              case 31:
                productInfo = _context3.sent;
                _context3.next = 38;
                break;

              case 34:
                _context3.next = 36;
                return getFromBeagleInfoLayer("__features.SKUsonPageLookup", true, 50, 500);

              case 36:
                productInfo = _context3.sent;
                this.mainProductInfo = productInfo;

              case 38:
                bindings = {
                  productInfo: productInfo
                };
                robotEngine_logger.log("Starting base rule set check for treatment: " + id);
                _context3.t0 = !eligibilityRuleSet;

                if (_context3.t0) {
                  _context3.next = 45;
                  break;
                }

                _context3.next = 44;
                return this.checkEligibilityRuleSet(eligibilityRuleSet);

              case 44:
                _context3.t0 = _context3.sent;

              case 45:
                if (!_context3.t0) {
                  _context3.next = 80;
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
                  _context3.next = 54;
                  break;
                }

                _context3.t1 = 100;
                _context3.next = 57;
                break;

              case 54:
                _context3.next = 56;
                return determinePct(identifier + determiningIdentifier);

              case 56:
                _context3.t1 = _context3.sent;

              case 57:
                treatmentPct = _context3.t1;
                robotEngine_logger.log("TreatmentPct: " + treatmentPct + " with debug mode ".concat(debugMode ? "on" : "off"));
                businessRuleId = null;

                if (!businessRuleSet) {
                  _context3.next = 66;
                  break;
                }

                robotEngine_logger.log("Starting sub variant rule set check for treatment: " + id);
                _context3.next = 64;
                return this.checkBusinessRules(businessRuleSet);

              case 64:
                businessRuleId = _context3.sent;

                if (businessRuleId !== null) {
                  robotEngine_logger.log("Applying business rule transformation with id: ", businessRuleId);
                } else robotEngine_logger.log("Applying treatment with default values");

              case 66:
                if (!(treatmentPct < treatmentSkipRatio)) {
                  _context3.next = 71;
                  break;
                }

                robotEngine_logger.log("Treatment ".concat(id, " skipped due to treatment split ratio"));
                addTreatment(id, businessRuleId, null, "skipped", dependant_on_treatment);
                engagementLock[id] = false;
                return _context3.abrupt("return");

              case 71:
                if (delay) {
                  _context3.next = 77;
                  break;
                }

                _context3.next = 74;
                return prepareAndApply(id, identifier, actions, businessRuleId, bindings);

              case 74:
                engagementLock[id] = false;
                _context3.next = 78;
                break;

              case 77:
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                  return regenerator_default().wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return prepareAndApply(id, identifier, actions, businessRuleId, bindings);

                        case 2:
                          engagementLock[id] = false;

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })), delay);

              case 78:
                _context3.next = 82;
                break;

              case 80:
                robotEngine_logger.failed("Rule check failed for treatment: ", id);
                engagementLock[treatment.id] = false;

              case 82:
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
      var _prepareAndApply = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(id, identifier, actions, businessRuleId, bindings) {
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
                return BeagleApplyActions(prepared, bindings);

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

      function prepareAndApply(_x2, _x3, _x4, _x5, _x6) {
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

      function checkEligibility(_x7) {
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

      function checkEligibilityRuleSet(_x8) {
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
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(identifier, debugMode, pageType, collectorApi) {
    var eligibilityRulesAssessPromise, treatmentsPromise, treatmentWeightsPromise, fetchProductInfoPromise, searchParams, debugFilteredTreatments, _yield$Promise$all, _yield$Promise$all2, treatments, treatmentWeights, treatmentRepository, matchedTreatments, mainProductInfo, robotEngine;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            eligibilityRulesAssessPromise = assesEligibilityRules();
            treatmentsPromise = BeagleTreatmentRepository.getTreatments();
            treatmentWeightsPromise = BeagleTreatmentRepository.getTreatmentWeights();
            fetchProductInfoPromise = fetchAndPersistProductInfo(collectorApi);
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
            return Promise.all([eligibilityRulesAssessPromise, fetchProductInfoPromise]);

          case 27:
            mainProductInfo = {};
            robotEngine = new RobotEngine({
              mainProductInfo: mainProductInfo,
              debugFilteredTreatments: debugFilteredTreatments,
              debugMode: debugMode,
              matchedTreatments: matchedTreatments,
              identifier: identifier,
              pageType: pageType
            });
            _context.next = 31;
            return robotEngine.engageRobots();

          case 31:
            removeDocumentHide();
            _context.t0 = BeagleOn_logger;
            _context.next = 35;
            return getFromBeagleInfoLayer("a");

          case 35:
            _context.t1 = _context.sent;

            _context.t0.success.call(_context.t0, "Applied treatments: ", _context.t1);

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function beagleOn(_x, _x2, _x3, _x4) {
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
    this.init();
  }

  _createClass(BeagleDataCollectionWrapper, [{
    key: "init",
    value: function init() {
      var _window$top$indexedDB,
          _this = this;

      api_logger.log("Initializing indexedDB");
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
                      var getRequest = store.get(keyName);

                      getRequest.onsuccess = function (e) {
                        resolve(getRequest.result);
                      };
                    });
                  } catch (error) {
                    api_logger.failed("cannot find ".concat(keyName, " on the indexdb store"));
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


;// CONCATENATED MODULE: ./src/BeagleClientSDK/index.js



/* eslint-disable max-len */







var SHUTDOWN = false;
var FLIPFLAG = false;

_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
  var monitor, logger, earlyLogSent, hideRemoved, _String$prototype, collectorApi, identifier, cookiePct, oosReason, isLabelSent, timeoutCounter, debugMode, isShowroom, isOn, pageType;

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
          collectorApi = new BeagleDataCollectionWrapper();
          initializeBeagleInfoLayer(collectorApi);
          _context.next = 13;
          return getIdentifier();

        case 13:
          identifier = _context.sent;
          logger.log("Found identifier: ", identifier);
          addToBeagleInfoLayer("cookieGaId", identifier);
          _context.next = 18;
          return determinePct(identifier);

        case 18:
          cookiePct = _context.sent;
          addToBeagleInfoLayer("onHashPct", cookiePct); // add current epoch integer to beagleInfoLayer

          addToBeagleInfoLayer("view_epoch", Date.now() + Math.random()); // data-less log to detect bounces

          _context.next = 23;
          return monitor.packAndQueueArrivalLog();

        case 23:
          oosReason = window.localStorage.getItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE); // if cannot get critical info, make out of scope and unsupported

          if (!(cookiePct === null || !navigator.sendBeacon || typeof navigator.sendBeacon !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype = String.prototype) === null || _String$prototype === void 0 ? void 0 : _String$prototype.padStart) !== "function" || oosReason && oosReason === "unsupported")) {
            _context.next = 29;
            break;
          }

          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "unsupported");
          addToBeagleInfoLayer("GLOV_ON", "unsupported | device");
          throw new Error("Device does not have required capabilities");

        case 29:
          isLabelSent = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT);
          timeoutCounter = parseInt(sessionStorage.getItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT)) || 0; // check if debug mode is on, also adds dbm to beagleInfoLayer and sets oosReason

          debugMode = getDebugMode("employee"); // if timed-out too many times for very first interactsions, make out of scope for the session

          if (!(!debugMode && !oosReason && !isLabelSent && timeoutCounter > MAX_TIMEOUT_PER_SESSION)) {
            _context.next = 36;
            break;
          }

          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          addToBeagleInfoLayer("GLOV_ON", "unsupported | timeout");
          throw new Error("Beagle timeout threshold reached");

        case 36:
          _context.next = 38;
          return getFromBeagleInfoLayer("vvsIsShowroom", true);

        case 38:
          isShowroom = _context.sent;

          if (!(isShowroom && (isShowroom === "true" || isShowroom === true))) {
            _context.next = 46;
            break;
          }

          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "employee");
          addToBeagleInfoLayer("GLOV_ON", "employee | showroom");
          throw new Error("User is from VVS showroom/callcenter");

        case 46:
          if (!(isShowroom === null || isShowroom === undefined)) {
            _context.next = 50;
            break;
          }

          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("Could not determine if user is from VVS showroom/callcenter");

        case 50:
          if (window.top.document.documentElement.classList.contains("nextDay-hide")) {
            _context.next = 54;
            break;
          }

          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("Beagle script timed out");

        case 54:
          // isOn can be true (ON), false (OFF)
          isOn = null; // FLIP the direction of the flag

          if (FLIPFLAG) {
            cookiePct = 99 - cookiePct;
          }

          if (!debugMode) {
            _context.next = 63;
            break;
          }

          logger.log("Debug mode on: all applicable treatments will be applied");
          isOn = true;
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          addToBeagleInfoLayer("GLOV_ON", "employee | tester");
          _context.next = 80;
          break;

        case 63:
          if (!(oosReason && oosReason === "employee")) {
            _context.next = 70;
            break;
          }

          logger.warn("User is out of scope"); // set isOn to true/false when not debugMode but out of scope i.e. nd_debug=0 for testability

          isOn = cookiePct >= SPLIT_RATIO;
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          addToBeagleInfoLayer("GLOV_ON", "employee | tester");
          _context.next = 80;
          break;

        case 70:
          if (!oosReason) {
            _context.next = 75;
            break;
          }

          addToBeagleInfoLayer("GLOV_ON", "not-sent | unknown");
          throw new Error("Unknown out of scope reason");

        case 75:
          // if greater than SPLIT_RATIO, then in ON mode
          isOn = cookiePct >= SPLIT_RATIO;
          addToBeagleInfoLayer("isOn", isOn);
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT, true);
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: isOn.toString()
          });
          addToBeagleInfoLayer("GLOV_ON", isOn.toString());

        case 80:
          logger.log("Found cookie percentage: ", cookiePct);
          logger.log("Split_ratio: ", SPLIT_RATIO);
          logger.log("cookiePct < SPLIT_RATIO", cookiePct < SPLIT_RATIO);
          logger.log("Set isOn: ", isOn); // await critical info before sending logs for proper analytics measurements

          _context.next = 86;
          return getFromBeagleInfoLayer("PageType", true);

        case 86:
          pageType = _context.sent;

          if (!(pageType === "purchase")) {
            _context.next = 97;
            break;
          }

          _context.next = 90;
          return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);

        case 90:
          _context.next = 92;
          return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);

        case 92:
          _context.next = 94;
          return monitor.sendLogs(true);

        case 94:
          // if purchase is complete, do not apply any treatments on the confirmation page
          SHUTDOWN = true;
          _context.next = 98;
          break;

        case 97:
          // send logs when ready, start scraping and sending asyncly
          monitor.sendLogs(false);

        case 98:
          earlyLogSent = true;

          if (!(isOn === true)) {
            _context.next = 103;
            break;
          }

          if (!SHUTDOWN) {
            logger.log("Beagle ON Group Path");
            BeagleOn(identifier, debugMode, pageType, collectorApi);
          } else {
            logger.info("Beagle ON Group SHUTDOWN Path");
            removeDocumentHide();
            hideRemoved = true;
          }

          _context.next = 110;
          break;

        case 103:
          if (!(isOn === false)) {
            _context.next = 109;
            break;
          }

          logger.info("Beagle OFF Group Path");
          removeDocumentHide();
          hideRemoved = true;
          _context.next = 110;
          break;

        case 109:
          throw new Error("isOn is undefined or null");

        case 110:
          _context.next = 118;
          break;

        case 112:
          _context.prev = 112;
          _context.t0 = _context["catch"](6);
          logger.warn("Beagle Early Scope-out or ERROR: ", _context.t0.message);
          addToBeagleInfoLayer("m", _context.t0.message);
          if (!earlyLogSent && monitor) monitor.sendLogs(false);
          if (!hideRemoved) removeDocumentHide();

        case 118:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[6, 112]]);
}))();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUErQzs7Ozs7Ozs7QUNBL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsTUFBTTtBQUNOLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QjtBQUM5QixjQUFJLENBQUNULFdBQUwsRUFBa0I1YyxrQkFBa0I7O0FBbEp2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFELEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL3N0cmluZ1V0aWxzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvbG9nZ2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZURhdGFDb2xsZWN0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVNb25pdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9kYXRhTGF5ZXJDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbGVtZW50Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZnVuY3Rpb25DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9zZXNzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvdXJsQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZW52Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlT24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImV4cG9ydCBjb25zdCByZXBsYWNlQWxsID0gKHN0ciwgZmluZCwgcmVwbGFjZSA9IFwiXCIpID0+IHtcbiAgaWYgKCFzdHIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gIGlmIChpbmRleCA8IDApIHJldHVybiBzdHI7XG5cbiAgd2hpbGUgKHN0ci5pbmRleE9mKGZpbmQpID49IDApIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICAgIHN0ciA9IChpbmRleCA+IDAgPyBzdHIuc3Vic3RyaW5nKDAsIGluZGV4KSA6IFwiXCIpICsgcmVwbGFjZSArIHN0ci5zdWJzdHJpbmcoaW5kZXggKyBmaW5kLmxlbmd0aCk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuZXhwb3J0IGNvbnN0IHR1cmtpc2hUb0xvd2VyID0gKHN0cikgPT4ge1xuICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xuICBsZXQgc3RyaW5nID0gc3RyO1xuICBjb25zdCBsZXR0ZXJzID0ge1wixLBcIjogXCJpXCIsIFwiSVwiOiBcIsSxXCIsIFwixZ5cIjogXCLFn1wiLCBcIsSeXCI6IFwixJ9cIiwgXCLDnFwiOiBcIsO8XCIsIFwiw5ZcIjogXCLDtlwiLCBcIsOHXCI6IFwiw6dcIn07XG4gIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oKFvEsEnFnsSew5zDh8OWXSkpL2csIGZ1bmN0aW9uKGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXJzW2xldHRlcl07XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi9zdHJpbmdVdGlsc1wiO1xuY29uc3QgaXNTdGFnaW5nID0gdHJ1ZSB8fCB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcInN0YWdpbmcudml2ZW5zZVwiKTtcblxuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbi8vIFRPRE8gcmV2ZXJ0IHRoZSBmb2xsb3dpbmcgc3RhZ2luZyBlbnYgY2hlY2sgYWZ0ZXIgbW92aW5nIHRvIG5ldyBicmFuY2ggc3RydWN0dXJlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0cy5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0lORk9fTE9DQVRJT04gPSBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvc29jaWFsLXByb29mLmNzdlwiO1xuZXhwb3J0IGNvbnN0IExPR19BUElfVVJMID0gXCJodHRwczovL2V1cm9wZS13ZXN0My1uZXh0ZGF5LTM0ZWIzLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvbG9nXCI7XG5leHBvcnQgY29uc3QgTE9PS1VQX0FQSV9VUkwgPSBcImh0dHBzOi8vY2F0YWxvZy1hcGkuYWRvcmFhaS5jb21cIjtcbmV4cG9ydCBjb25zdCBNT0JJTEVfTUVESUFfUVVFUlkgPSBcIihtYXgtd2lkdGg6IDQ0MHB4KVwiO1xuLy8gQ29udHJvbCBncm91cCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgU1BMSVRfUkFUSU8gPSA1MDtcbi8vIFNraXBwZWQgdHJlYXRtZW50IHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0RVUkFUSU9OID0gMTtcbmV4cG9ydCBjb25zdCBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiA9IDE7XG5leHBvcnQgY29uc3QgTElTVF9NT0RFX0JFQUdMRV9LRVlTID0gW1wicGFnZXR5cGVcIiwgXCJjYXRlZ29yeVwiLCBcImFsbHRpbWVQTFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUExQQ2F0ZWdvcnlNb2RlXCIsXG4gIFwiYWxsdGltZVBEUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QRFBDYXRlZ29yeU1vZGVcIiwgXCJhbGx0aW1lQ2FydENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25DYXJ0Q2F0ZWdvcnlNb2RlXCJdO1xuICAvLyBUT0RPIHNldCB0byAxMjAwMDAobXMpIGJlZm9yZSBnbyBsaXZlXG5leHBvcnQgY29uc3QgSURMRV9USU1FT1VUID0gMTUwMDA7XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OX1NUT1JBR0VfS0VZUyA9IHtcbiAgU0VTU0lPTl9USU1FU1RBTVA6IFwiQkdfU2Vzc2lvblRpbWVzdGFtcFwiLFxuICBTRVNTSU9OX0hJU1RPUlk6IFwiQkdfU2Vzc2lvbkhpc3RvcnlcIixcbiAgVFJFQVRNRU5UUzogXCJCR19UcmVhdG1lbnRzXCIsXG4gIFBPUFVQX0RJU1BMQVlfRkxBRzogXCJCR19Qb3B1cERpc3BsYXlGbGFnXCIsXG4gIFNLVV9JTkZPX0JBU0tFVDogXCJCR19Qcm9kdWN0SW5mb0Jhc2tldFwiLFxuICBUSU1FT1VUX0NPVU5UOiBcIkJHX1RpbWVvdXRDb3VudFwiLFxuICBTRVNTSU9OX1JFRkVSUkVSOiBcIkJHX1Nlc3Npb25SZWZlcnJlclwiLFxufTtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0tFWVMgPSB7XG4gIERFQlVHX01PREU6IFwiQkdfRGVidWdcIixcbiAgT1VUX09GX1NDT1BFOiBcIkJHX091dE9mU2NvcGVcIixcbiAgSVNfTEFCRUxfU0VOVDogXCJCR19MYWJlbFNlbnRcIixcbiAgVVNFUl9JRDogXCJCR19Vc2VySWRfMDBcIixcbiAgREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRTogXCJCR19Db2xsZWN0aW9uRGF0YVNpemVcIixcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fU1RPUkFHRV9QUkVGSVggPSBcIkJHX1NlZ19cIjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpbiA9IFwiQmVhZ2xlIENsaWVudCBTREtcIikge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIHRoaXMuREVCVUcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkRFQlVHX01PREUpO1xuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvblwiKTtcbmxldCBjb2xsZWN0b3JBcGk7XG5cbmV4cG9ydCBjb25zdCBzZXRDb2xsZWN0b3JBcGkgPSAoY0EpID0+IHtcbiAgY29sbGVjdG9yQXBpID0gY0E7XG59O1xuXG4vLyBrZWVwIGEgdGFibGUgaW4gaW5kZXhkYiB0aGUgZm9ybWF0IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIGRhdGFfdmFsdWUsIHN0b3JlZF92YWx1ZV1cblxuZXhwb3J0IGNvbnN0IHF1ZXJ5SW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdyk7XG4gIGlmICghY29sbGVjdG9yQXBpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkluZGV4ZWREQiBubyBzdXBwb3J0ZWQvSW5pdGlhbGl6ZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB3aW5kb3cgY2FuIGJlIGVpdGhlciBzYW1lZGF5IG9yIGFsbHRpbWVcblxuICBpZiAocXVlcnlNZXRob2QgPT09IFwibWluXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubWluKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1heFwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1heChiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJhdmdcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5hdmcoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiY2RcIikge1xuICAgIHJldHVybiAoYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpKS5zaXplO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImN2XCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuXG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBjb3VudCArPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1vZGVcIikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb2xsZWN0b3JBcGkubW9kZShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gZGF0YS5uYW1lO1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kLmluZGV4T2YoXCJsYXN0XCIpID49IDApIHtcbiAgICBjb25zdCBtYXRjaCA9IHF1ZXJ5TWV0aG9kLm1hdGNoKFwibGFzdFxcXFwoKFtcXFxcZF0rKVxcXFwpXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgIW1hdGNoLmxlbmd0aCA9PT0gMiB8fCBwYXJzZUludChtYXRjaFsxXSkgPCAxICkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLmxhc3QoYmFzZUZlYXR1cmVOYW1lLCBtYXRjaFsxXSwgd2luZG93KTtcbiAgICBjb25zdCBkYXRhVmFsdWVzID0gcXVlcnlQcm9taXNlLm1hcCgob2JqKSA9PiBvYmouZGF0YV92YWx1ZSk7XG4gICAgcmV0dXJuIGRhdGFWYWx1ZXM7XG4gIH1cblxuICAvKipcbiAgICB7XCJMaXN0aW5ncGFnZVwiID0+IDIxfVxuICAgIHtcIkhvbWVwYWdlXCIgPT4gMTJ9XG4gICAgLS0gZXhhbXBsZSB3aWxsIGhhdmU6XG4gICAgbW9kZTogTGlzdGluZ3BhZ2VcbiAgICBjZDogMlxuICAgIGN2OiAyMSsxMlxuICAgIGxhc3QoMykgKG4sIG4tMSwgbi0yKVxuICAqL1xuXG4gIC8vIDEwMDBsaWsgdGVtaXpsZW5lY2VrIChtYWludE9wQ291bnQgLT4gdmVyc2lvbilcblxuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJtb2RlXCIsIFwiY2RcIiAoY291bnQgZGlzdGludCkgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzXG4gIC8vIHF1ZXJ5TWV0aG9kIGNhbiBiZSBcImN2XCIgKHN1bSBvZiBjb3VudCB2YWx1ZXMpLCBcImN1cnJlbnRcIiwgb3IgXCJwcmV2XCIgZm9yIGFueSBkYXRhIHR5cGUgKHN0b3JlZCB2aWEgbGFzdClcbiAgbG9nZ2VyLmZhaWxlZChgdW5rbm93biBxdWVyeU1ldGhvZD0ke3F1ZXJ5TWV0aG9kfSBpbiBCZWFnbGVEYXRhQ29sbGVjdGlvbmApO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCkgPT4ge1xuICBsb2dnZXIubG9nKFwidXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXdhaXQgY29sbGVjdG9yQXBpLnNhdmUoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKTtcblxuXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJtaW5cIiwgXCJtYXhcIiwgXCJjbnRcIiwgXCJzdW1cIiBmb3IgbnVtZXJpYyBkYXRhIHR5cGVzLCBtaW4tbWF4IGNvbXBhcmVzIHdpdGggb25seSBleGlzdGluZywgYXZnIHVwZGF0ZXMgY250IGFuZCBzdW1cbiAgLy8gLS0+IG1pbjogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtaW5cIiwgKGxlYXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gbWF4OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcIm1heFwiLCAoZ3JlYXRlc3Qgb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBzdW06IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwic3VtXCIsIChzdW0gb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBjbnQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY250XCIsIChleGlzdGluZyArIDEpXVxuICAvL1xuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwiY291bnRfdmFsdWVzXCIgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzLCBrZWVwIGEgY291bnRlciBmb3IgZWFjaCB2YWx1ZVxuICAvLyAtLT4gY291bnRfdmFsdWVzOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImxhc3RcIiBmb3IgYW55IGRhdGEgdHlwZSAtLT4ga2VlcHMgMiB2YWx1ZXMgZm9yIGN1cnJlbnQgYW5kIHRoZSBwcmV2aW91c1xuICAvLyBkZWxldGU6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBtb3ZlOiBleGlzdGluZyBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGV4aXN0aW5nIHZhbHVlKV0gLS0+IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBwdXQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY3VycmVudFwiLCAoaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2Zvcm1hdERlbGl2ZXJ5RGF0ZX0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge0xPT0tVUF9BUElfVVJMLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgU1BMSVRfUkFUSU99IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7c2V0Q29sbGVjdG9yQXBpLCBxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBfX2h3bTogMCxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJcIik7XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChBcnJheS5pc0FycmF5KGxpc3RlbmVycykgJiYgbGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsb2dnZXIubG9nKGBQYXNzaW5nIHZhbHVlICR7dmFsdWV9IHRvIGxpc3RlbmVycyBvZiBrZXkgJHtrZXl9YCk7XG4gICAgICAgIGxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIHJldHVybiBnZXRBbnlGcm9tQmVhZ2xlSW5mb0xheWVyKFtrZXldLCBibG9ja2luZywgcG9sbEludGVydmFsLCB0aW1lb3V0KTtcbn07XG5cbmNvbnN0IGdldEFueUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5cywgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICAvLyBUT0RPOiBjaGVjayBmZWF0dXJlRW5naW5lZXJpbmcgYW5kIHNlYXJjaCBsaXN0IGlmIGFsbCBtYXJrZWQgYXMgZm91bmQgYnV0IHZhbHVlIGlzIG1pc3NpbmdcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHJldHVybiBudWxsIGlmIGtleXMgaXMgbWlzc2luZyBvciBub3QgYW4gYXJyYXkgb3IgaGFzIG5vIGVsZW1lbnRzXG4gIGlmICgha2V5cyB8fCAhQXJyYXkuaXNBcnJheShrZXlzKSB8fCAha2V5cy5sZW5ndGgpIHJldHVybiBudWxsO1xuICBsZXQgb2J0YWluRGF0YTtcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICAgICAgICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBwb2xsSW50ZXJ2YWwpO1xuICAgICAgLy8gYWRkIHRpbWVvdXRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0sIHRpbWVvdXQpOyAvLyB3YWl0IGJsb2NraW5nIGZvciBcInRpbWVvdXRcIiBtc2Vjc1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciA9IChrZXkpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gcmVtb3ZlIGtleSBmcm9tIGluZm9MYXllclxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSByZXR1cm47XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBsb2dnZXIubG9nKFwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllclwiLCBgUmVtb3ZpbmcgJHtsYXN0S2V5fSBmcm9tICR7SlNPTi5zdHJpbmdpZnkob2JqKX1gKTtcbiAgICBkZWxldGUgb2JqW2xhc3RLZXldO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBpbmZvTGF5ZXJba2V5XTtcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIG51bGwpO1xuICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRyZWF0bWVudCA9IChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIHN0YXR1cywgZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IG51bGwpID0+IHtcbiAgY29uc3QgdmFsdWUgPSB7fTtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsIHx8IGJ1c2luZXNzUnVsZUlkICE9PSB1bmRlZmluZWQpIHZhbHVlLmJ1c2luZXNzUnVsZUlkID0gYnVzaW5lc3NSdWxlSWQ7XG4gIGlmICh2YXJpYW50KSB2YWx1ZS52YXJpYW50ID0gdmFyaWFudDtcblxuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJhcHBsaWVkXCI6XG4gICAgICBpbmZvTGF5ZXIuYVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJza2lwcGVkXCI6XG4gICAgICB2YWx1ZS5kZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gZGVwZW5kYW50X29uX3RyZWF0bWVudDtcbiAgICAgIGluZm9MYXllci5lW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImZhaWxlZFwiOlxuICAgICAgaW5mb0xheWVyLmZbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xufTtcblxuY29uc3QgUEFSU0VTRUFSQ0hNQVhSRVRSWSA9IDEwO1xuY29uc3QgUEFSU0VTRUFSQ0hTVEFSVERFTEFZID0gMTA7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyID0gYXN5bmMgKGNvbGxlY3RvckFwaSkgPT4ge1xuICBzZXRDb2xsZWN0b3JBcGkoY29sbGVjdG9yQXBpKTtcbiAgLy8gQ29sbGVjdCBjb3JlIGRhdGFcbiAgcHJlcGFyZUNvcmVEYXRhKCk7XG5cbiAgLy8gVHJpZ2dlci1zdGFydCB0aGUgcGFyc2VyIGxvb3BcbiAgcGFyc2VyQ2FsbGVyKCk7XG5cbiAgLy8gQWRkIG1ldHJpY3NcbiAgYWRkTWV0cmljcygpO1xufTtcblxuY29uc3QgZmVhdHVyZUVuZ2luZWVyaW5nT3BzID0ge1xuICBcInZpZXdfZXBvY2hcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibWluXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtaW5cIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS52aWV3X2Vwb2NoX21pblwifSxcbiAgXSxcbiAgXCJQYWdlVHlwZVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImN2XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcImFsbHRpbWVcIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9hbGx0aW1lXCJ9LFxuICBdLFxuICBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMubGFzdENhcnRDb3Vwb25BcHBsaWNhYmxlXCJ9LFxuICBdLFxuICBcIl9fZmVhdHVyZXMuU0tVc29uQmFza2V0TG9va3VwXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0QmFza2V0TG9va3VwXCJ9LFxuICBdLFxuICBcInBkcC5jYXRlZ29yeVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtb2RlXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X21vZGVfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9sYXN0X3Nlc3Npb25cIn0sXG4gIF0sXG59O1xuXG5jb25zdCBjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBiYXNlRmVhdHVyZU5hbWVzID0gT2JqZWN0LmtleXMoZmVhdHVyZUVuZ2luZWVyaW5nT3BzKTtcbiAgZm9yIChjb25zdCBiYXNlRmVhdHVyZU5hbWUgb2YgYmFzZUZlYXR1cmVOYW1lcykge1xuICAgIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICAgIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICAgIGlmIChGRU9wLnF1ZXJ5TWV0aG9kID09PSBudWxsIHx8IEZFT3AucXVlcnlNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UmVzcG9uc2UgPSBhd2FpdCBxdWVyeUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgRkVPcC5xdWVyeU1ldGhvZCwgRkVPcC53aW5kb3cpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihGRU9wLmZlYXR1cmVOYW1lLCBxdWVyeVJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKSA9PiB7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICBpZiAoRkVPcC51cGRhdGVNZXRob2QgPT09IG51bGwgfHwgRkVPcC51cGRhdGVNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICBhd2FpdCB1cGRhdGVJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIEZFT3AudXBkYXRlTWV0aG9kKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5jb25zdCBzZWFyY2hQYXRocyA9IFtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHQSBEYXRhIExheWVyIFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlBhZ2VUeXBlXCIsIG5hbWU6IFwiUGFnZVR5cGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwidXBwZXJDYXNlVFJcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5kZXRhaWwuYWN0aW9uRmllbGQubGlzdFwiLCBuYW1lOiBcInBkcC5saXN0YWxpYXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5kaXNjb3VudFJhdGVcIiwgbmFtZTogXCJwZHAuZGlzY291bnRSYXRlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInNlYXJjaF9zdWNjZXNzXCIsIG5hbWU6IFwicGxwLnNlYXJjaFN1Y2Nlc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuaWRcIiwgXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBcInBscC5uYW1lXCIsIFwicGxwLmdyb3VwXCIsIFwicGxwLmNsYXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJMaXN0aW5ncGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtbWFpbi1kZXRhaWxzXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZW1wdHlfYmFza2V0X3RleHRcXFwiXVwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC50b3RhbEJhc2VQcmljZVwiLCBcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltpZCo9XFxcImNhcnRfcXVhbnRpdHlcXFwiXSwgW2NsYXNzKj1cXFwiYmFza2V0X2xlbmd0aFxcXCJdXCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LXRpdGxlXFxcIl0sIFtjbGFzcyo9XFxcImhlYWRlci1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBMUFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJvZHVjdC1za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtbGlzdFwiLCBvYnNlcnZlcjogXCJsaXN0aW5nSXRlbUJsb2NrXCIsIG5hbWU6IFwiX19saXN0aW5nSXRlbUJsb2NrT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcIl9fZmVhdHVyZXMuU0tVc29uUExQXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuZW1wdHktY2FydC1jb250YWluZXIsIC5lbXB0eS1jYXJ0XCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuYnJhY2tldC10ZXh0LCAucHJvZHVjdC1jb3VudFwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydEl0ZW1RdWFudGl0eVwiLCBuYW1lOiBcImNhcnQucXVhbnRpdGllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJldmlvdXNcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjYmlsbF90b3RhbFwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyLWZpbmFsLW51bWJlclxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXJ0LXByaWNlXFxcIl0gLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3Vwb25BcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5jYXRlZ29yaWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1sYXN0LWJyZWFkY3J1bWJcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnByaWNlc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJpY2VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICAvLyBEZXNrdG9wIG9ic2VydmVyIGZvciB0aGUgcmlnaHQgcGFuZWwsIGFzIGl0IGlzIHRoZSBvbmUgY2hhbmdpbmdcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtcmlnaHQtY29udGFpbmVyXCIsIG9ic2VydmVyOiBcImNoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAgLy8gTW9iaWxlIG9ic2VydmVyIGZvciB0aGUgZnVsbCBmb3JtIGJsb2NrIGFzIGl0IGlzIGNvbXBsZXRlbHkgcmVwbGFjZWRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI2NoZWNrb3V0Rm9ybVwiLCBvYnNlcnZlcjogXCJjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfc3VtbWFyeV90b3RhbFxcXCJdLCBbY2xhc3MqPVxcXCJ0b3RhbF9yb3dcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnJldmVudWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXJfZm9sbG93X251bWJcXFwiXSwgW2NsYXNzKj1cXFwiY2FydC10aXRsZS1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnZ2c1R4bklkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnBheW1lbnRfdHlwZV90aXRsZSwgLmNhcnQtdGl0bGUtaW5mb1wiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3Rfc2t1X2NvZGVcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXNrdVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFNPUkcgRWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcInNrdVwiLCBuYW1lOiBcInBkcC5za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtcG5cIiwgbmFtZTogXCJwZHAubXBuXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiSlNPTkZpbHRlck90aGVyXCIsIHZhbHVlOiBcIkB0eXBlPVByb2R1Y3RcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJvZmZlcnMucHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJvZmZlcnMucHJpY2VWYWxpZFVudGlsXCIsIG5hbWU6IFwicGRwLnByaWNlVmFsaWRVbnRpbFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIml0ZW1MaXN0RWxlbWVudC4qLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5udW1iZXJPZkl0ZW1zXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcImJyZWFkY3J1bWIuaXRlbUxpc3RFbGVtZW50LiouaXRlbS5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gV2luZG93IGN1c3RvbSBlbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiZmF2b3JpdGVQcm9kdWN0c1wiLCBuYW1lOiBcInZpZXcuZmF2b3JpdGVkTVBOc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCIsIGZvcm1hdHRlcjogXCJ0b1N0cmluZ1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcbl07XG5cbmNvbnN0IHByb2Nlc3NGb3JtYXR0ZXIgPSAodmFsdWUsIGZvcm1hdHRlcikgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCAhZm9ybWF0dGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3dpdGNoIChmb3JtYXR0ZXIpIHtcbiAgICBjYXNlIFwidXBwZXJDYXNlVFJcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKFwidHItVFJcIik7XG4gICAgY2FzZSBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwiOlxuICAgICAgcmV0dXJuIGZvcm1hdERlbGl2ZXJ5RGF0ZSh2YWx1ZSk7XG4gICAgY2FzZSBcIm51bWVyaWNPbmx5XCI6XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgIGNhc2UgXCJsb3dlckNhc2VUUkZpcnN0V29yZFwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoXCJ0ci1UUlwiKS5zcGxpdChcIiBcIilbMF07XG4gICAgY2FzZSBcImRlYXJyYXlcIjpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBjYXNlIFwidG9TdHJpbmdcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hPYmogPSAob2JqLCBzZWFyY2hFbGVtZW50KSA9PiB7XG4gIGxldCB2YWx1ZTtcbiAgbGV0IGxheWVyVmFsdWU7XG5cbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHNlYXJjaEVsZW1lbnQub3BlcmFuZCkge1xuICAgICAgY2FzZSBcIkpTT05GaWx0ZXJPdGhlclwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlsdGVyUGFyYW1zID0gc2VhcmNoRWxlbWVudC52YWx1ZS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgaWYgKGZpbHRlclBhcmFtcy5sZW5ndGggIT09IDIpIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGZpbHRlck5hbWUgPSBmaWx0ZXJQYXJhbXNbMF07XG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBmaWx0ZXJQYXJhbXNbMV07XG4gICAgICAgICAgaWYgKCFmaWx0ZXJOYW1lIHx8ICFmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaCA9IGpzb25HZXQob2JqLCBmaWx0ZXJOYW1lKTtcblxuICAgICAgICAgIGlmICghZmlsdGVyTWF0Y2ggfHwgZmlsdGVyTWF0Y2ggIT09IGZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGlmICh2YWx1ZSAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlPYnNlcnZlXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgY29uc3QgdG9CZVVwZGF0ZWQgPSBbXTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gc2VhcmNoUGF0aHMuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT09IGNoaWxkKTtcbiAgICAgICAgICAgIC8vIGFkZCBjaGlsZEVsZW1lbnRzIGludG8gdG9CZVVwZGF0ZWRcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLnB1c2goLi4uY2hpbGRFbGVtZW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gcnVuIG9ubHkgaWYgdGhlIGVsZW1lbnQgaGFzIGFkZGVkIG9yIHJlbW92ZWQgY2hpbGRyZW5cbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgZWxlbWVudC5pc0ZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIoZWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdHJpZ2dlclJlc3RhcnQgPSBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPj0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG4gICAgICAgICAgICBpZiAodHJpZ2dlclJlc3RhcnQpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcInNlYXJjaE9iajogdHJpZ2dlcmVkIGEgcmVzdGFydCBvZiBzZWFyY2hwYXRocyBkdWU6IFwiLCBzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgICBwYXJzZXJDYWxsZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHZhbHVlLCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIjpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlTGlzdCA9IFtdO1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlID0gdmFsdWVjaGlsZC5nZXRBdHRyaWJ1dGUoc2VhcmNoRWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoYXR0cmliVmFsdWUpIHtcbiAgICAgICAgICAgICAgYXR0cmliVmFsdWVMaXN0LnB1c2goYXR0cmliVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGF0dHJpYlZhbHVlTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBzZXRWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMDtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2V0VmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUNvdW50RWx0c1wiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNlYXJjaEVsZW1lbnQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBsZXQgc3VtUHJpY2UgPSAwO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHN1bVByaWNlKz1wYXJzZUludChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3VtUHJpY2UgPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gc3VtUHJpY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBjb25zdCBhcnJheUlubmVyVGV4dCA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgYXJyYXlJbm5lclRleHQucHVzaChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJyYXlJbm5lclRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGFycmF5SW5uZXJUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfSAvLyBzd2l0Y2hcblxuICAgIGlmIChsYXllclZhbHVlICE9PSB1bmRlZmluZWQgJiYgbGF5ZXJWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKSB7XG4gICAgICAgIGxheWVyVmFsdWUgPSBwcm9jZXNzRm9ybWF0dGVyKGxheWVyVmFsdWUsIHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKTtcbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKHNlYXJjaEVsZW1lbnQubmFtZSwgbGF5ZXJWYWx1ZSk7XG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuXG4gICAgICAvLyBtYXJrIGV4Y2x1c2l2ZSBlbGVtZW50cyBhcyBmb3VuZFxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUpICYmIHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBleGNsdXNpdmVFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmluY2x1ZGVzKGV4Y2x1c2l2ZUVsZW1lbnQubmFtZSkpIHtcbiAgICAgICAgICAgIGV4Y2x1c2l2ZUVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcInNlYXJjaE9iaiBlcnJvcjogXCIgKyBlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlLCA1MCwgMTAwMCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBjYXJ0IHRvdGFsIHByb2R1Y3QgcHJpY2UgaXMgbm90IGF2YWlsYWJsZSBhbnl3aGVyZSwgc3BlY2lhbCBkaXNjb3VudHMgZXRjIGFyZSBoYXJkIHRvIHNjcmFwZSwgc28gcmVjYWxjdWxhdGUgaXRcbiAgICBjb25zdCBbaXNDYXJ0RW1wdHksIHRvdGFsQmFzZVByaWNlLCBjb3Vwb25Ob3RBcHBsaWNhYmxlLCBwcmljZXMsIHF1YW50aXRpZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuaXNlbXB0eVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnByaWNlc1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnF1YW50aXRpZXNcIiksXG4gICAgXSk7XG5cbiAgICBsZXQgdG90YWxQcmljZSA9IDA7XG5cbiAgICBpZiAoIXRvdGFsQmFzZVByaWNlICYmIHByaWNlcyAmJiBBcnJheS5pc0FycmF5KHByaWNlcykgJiYgcHJpY2VzLmxlbmd0aCA+IDAgJiYgcXVhbnRpdGllcyAmJiBBcnJheS5pc0FycmF5KHF1YW50aXRpZXMpICYmIHF1YW50aXRpZXMubGVuZ3RoID4gMCAmJiBwcmljZXMubGVuZ3RoID09PSBxdWFudGl0aWVzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG90YWxQcmljZSArPSBwYXJzZUludChwcmljZXNbaV0pICogcGFyc2VJbnQocXVhbnRpdGllc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvdGFsUHJpY2UgPSBwYXJzZUludCh0b3RhbEJhc2VQcmljZSk7XG4gICAgfVxuXG4gICAgbGV0IGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSAmJiBjb3Vwb25Ob3RBcHBsaWNhYmxlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gdG90YWxQcmljZSAtIHBhcnNlSW50KGNvdXBvbk5vdEFwcGxpY2FibGUpO1xuICAgIH0gZWxzZSBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSBwYXJzZUludCh0b3RhbFByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCIsIGNvdXBvbkFwcGxpY2FibGVBbW91bnQpO1xuXG4gICAgaWYgKGlzQ2FydEVtcHR5KSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxQcmljZVwiLCAwKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIDApO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcImN1c3RvbURhdGFEZXJpdmF0aW9ucyBjYW5ub3QgY29tcHV0ZSBjb3Vwb25BcHBsaWNhYmxlUHJpY2U6IFwiICsgZSk7XG4gIH1cblxuICAvLyB1cGRhdGUgYWN0aXZlIFNLVSBsaXN0XG4gIGxldCBuZXdTS1VMaXN0ID0gW107XG4gIC8vIFByb2R1Y3QgcGFnZVxuICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiKTtcbiAgICBpZiAoc2t1IT09bnVsbCAmJiBza3UhPT11bmRlZmluZWQpIHtcbiAgICAgIG5ld1NLVUxpc3QgPSBbc2t1XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QhPT1udWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIG5ld1NLVUxpc3QgPSBza3VMaXN0O1xuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiTGlzdGluZ3BhZ2VcIikge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QTFBcIik7XG4gICAgaWYgKHNrdUxpc3QhPT1udWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIG5ld1NLVUxpc3QgPSBza3VMaXN0O1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IGV4dHJhY3QgU0tVc0FscmVhZHlMb29rZWRVcCBmcm9tIGRpZmZQcm9kdWN0SW5mbyBhbmQga2VlcCBhcyBhIFNldFxuICBjb25zdCBwcmV2U0tVTGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNBbHJlYWR5TG9va2VkVXBcIikgfHwgW107XG4gIC8vIGdldCBkaWZmZXJlbmNlIGJldHdlZW4gbmV3IGFuZCBvbGQgU0tVIGxpc3RcbiAgY29uc3QgZGlmZlNLVUxpc3QgPSBuZXdTS1VMaXN0LmZpbHRlcigoeCkgPT4gIXByZXZTS1VMaXN0LmluY2x1ZGVzKHgpKTtcbiAgaWYgKGRpZmZTS1VMaXN0ICYmIGRpZmZTS1VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBkaWZmUHJvZHVjdEluZm8gPSBhd2FpdCBwcm9kdWN0SW5mb0xvb2t1cChkaWZmU0tVTGlzdCkgfHwge307XG4gICAgY29uc3Qgb2xkUHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlTG9va3VwXCIpIHx8IHt9O1xuICAgIC8vIGFkZCBkaWZmIHByb2R1Y3QgaW5mbyB0byBvbGQgcHJvZHVjdCBpbmZvXG4gICAgY29uc3QgbmV3UHJvZHVjdEluZm8gPSB7Li4ub2xkUHJvZHVjdEluZm8sIC4uLmRpZmZQcm9kdWN0SW5mb307XG5cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZUxvb2t1cFwiLCBuZXdQcm9kdWN0SW5mbyk7XG4gICAgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJiYXNrZXRcIikge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkJhc2tldExvb2t1cFwiLCBuZXdQcm9kdWN0SW5mbyk7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWRTS1VzID0gcHJldlNLVUxpc3QuY29uY2F0KGRpZmZTS1VMaXN0KTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc0FscmVhZHlMb29rZWRVcFwiLCB1cGRhdGVkU0tVcyk7XG4gIH1cbn07XG5cbmNvbnN0IHBhcnNlU2VhcmNoUGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRvbVN0YXR1cyA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIC8vIGNoZWNrIGlmIGRvY3VtZW50IGFuZCBkb20gaXMgbG9hZGVkIGFuZCByZWFkeSBmb3Igc2NyYXBwaW5nXG4gIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGluaXRpYWxpemVkIHdpdGggZG9tIHN0YXR1czogIFwiICsgZG9tU3RhdHVzKTtcblxuICBjb25zdCB3aW50b3AgPSB3aW5kb3cudG9wO1xuICBjb25zdCBkYXRhTGF5ZXIgPSB3aW50b3AuZGF0YUxheWVyO1xuICBjb25zdCB3aW5kb2MgPSB3aW50b3AuZG9jdW1lbnQ7XG4gIGxldCBzb3JnQXJyYXlJbm5lcjtcblxuICBjb25zdCBmb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBwcmV2Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgbm90Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcblxuICAvLyBQYWdlVHlwZSBjYW4gYmUgaW5mZXJyZWQgZnJvbSBVUkwsIGlmIGZvdW5kIHVzZSBpdCBmcm9tIHRoZXJlXG4gIGxldCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG5cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSkge1xuICAgIHByZXZGb3VuZE5hbWVzLmFkZChcIlBhZ2VUeXBlXCIpO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHNlYXJjaCBsaXN0cyBhbmQgbWFyayBmb3VuZCBuYW1lc1xuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICBwcmV2Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChmb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpIHx8IHByZXZGb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAvLyBoYWQgYWxyZWFkeSBmb3VuZCB0aGlzIGVsZW1lbnQgb24gYW5vdGhlciBwYXJzZSBpdGVtXG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQgIT09IFwiKlwiKSB7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG4gICAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZC5pbmRleE9mKGN1cnJlbnRQYWdlVHlwZSkgPCAwKSB7XG4gICAgICAgIC8vIHNraXAgc2VhcmNoRWxlbWVudCBiZWNhdXNlIG9mIFBhZ2VUeXBlRGVwZW5kXG4gICAgICAgIHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiU2luZ2xlV1RcIikgeyAvLyBTQ0FOIFdpbmRvdyBmb3IgU2luZ2xlIEVsZW1lbnRzXG4gICAgICBzZWFyY2hBbmRTZXQod2ludG9wLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkdBRGF0YUxheWVyXCIpIHsgLy8gU0NBTiBHQSBEQVRBIExBWUVSXG4gICAgICBmb3IgKGNvbnN0IGRhdGFMYXllckl0ZW0gb2YgZGF0YUxheWVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChkYXRhTGF5ZXJJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1NvcmdcIikgeyAvLyBTQ0FOIFNPUkcgQVJSQVlcbiAgICAgIGlmICghc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc29yZ0FycmF5SW5uZXIgPSBnZXRTT1JHQXJyYXkoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgc29yZ0l0ZW0gb2Ygc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KHNvcmdJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1F1ZXJ5XCIpIHsgLy8gU0NBTiBET0NVTUVOVFxuICAgICAgc2VhcmNoQW5kU2V0KHdpbmRvYywgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSAvLyBET0NRVUVSWSBwYXJzZVxuICB9XG5cbiAgaWYgKG5vdEZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgZm91bmQgYWxsIGVsZW1lbnRzIC0gc2V0dGluZyByZXRyeSB0byBtYXhcIik7XG4gIH0gZWxzZSBpZiAoZm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgLy8gdXBkYXRlIHJldHJ5IGNvdW50ZXIgYW5kIGRlbGF5IG9ubHkgaWYgZG9tIGlzIGFjdGl2ZVxuICAgIGlmIChkb21TdGF0dXMgPT09IFwiY29tcGxldGVcIiB8fCBkb21TdGF0dXMgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICo9IDI7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKz0gMTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQgYnV0IG5vdCBmb3VuZCBhbnksIHNldHRpbmcgZGVsYXkgYW5kIHJldHJ5IHRvIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwiIGFuZCBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKyBcIiBmb3Igbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl1cIixcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZDogbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl0gYW5kIGZvdW5kIFwiICtcbiAgICAgIGZvdW5kTmFtZXMuc2l6ZSxcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hBbmRTZXQgPSAob2JqLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKSA9PiB7XG4gIGlmIChzZWFyY2hPYmoob2JqLCBzZWFyY2hFbGVtZW50KSkge1xuICAgIGZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfVxufTtcblxuLy8gcGFyc2Ugc291cmNlXG5jb25zdCBwYXJzZXJDYWxsZXIgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgYXdhaXQgcGFyc2VTZWFyY2hQYXRocygpO1xuICBpZiAocGFyc2VTZWFyY2hQYXRoc1JldHJ5IDwgUEFSU0VTRUFSQ0hNQVhSRVRSWSkge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiBzY2hlZHVsZWQgdG8gYmUgcmVjYWxsZWQgaW4gXCIgKyBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIm1zXCIpO1xuICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCBwYXJzZXJDYWxsZXIoKTtcbiAgICB9LCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkpO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiByZWFjaGVkIG1heCByZXRyeSwgY2FsbGluZyByZW1haW5kZXIgaGlzdG9yaWNhbCBkYXRhXCIpO1xuICAgIGF3YWl0IGN1c3RvbURhdGFEZXJpdmF0aW9ucygpO1xuICAgIGF3YWl0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IoKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSk7XG4gIH1cbn07XG5cbi8vIEV4dHJhY3QgdmFsdWUgZnJvbSBqc29uIG9iamVjdCB1c2luZyBnaXZlbiBwYXRoXG4vLyBJZiBhbiBlbGVtZW50IGlzICosIGNvbmNhdGVuYXRlIHJlY3Vyc2l2ZWx5IGFsbCBzdWItcGF0aCB2YWx1ZXMgYXMgc3RyaW5nXG5jb25zdCBqc29uR2V0ID0gKG9iaiwgcGF0aCkgPT4ge1xuICBpZiAoIW9iaikgcmV0dXJuIG51bGw7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHBhdGhBcnJheVtpXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aCA9IHBhdGhBcnJheS5zbGljZShpICsgMSkuam9pbihcIi5cIik7XG4gICAgICAgIGNvbnN0IHN1YkFycmF5ID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFtzdWJLZXldICE9PSB1bmRlZmluZWQgJiYgY3VycmVudFtzdWJLZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWYWx1ZSA9IGpzb25HZXQoY3VycmVudFtzdWJLZXldLCBzdWJQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdWJWYWx1ZSAhPT0gbnVsbCAmJiBzdWJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN1YkFycmF5LnB1c2goc3ViVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViQXJyYXk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoQXJyYXlbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBwcmVwYXJlQ29yZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IG5hdlB0ciA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I7XG5cbiAgLyogQmVhZ2xlIGRhdGEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2XCIsIFwiMC4wLjM3XCIpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNyXCIsIFNQTElUX1JBVElPKTtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5zeXN0ZW1MYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VmVuZG9yXCIsIG5hdlB0ci52ZW5kb3IpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiZmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJiYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGFzdG9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzaWduaW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2NvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfaW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfYWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfbm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic3BlY2lhbF9jYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG59O1xuXG5jb25zdCBhZGRNZXRyaWNzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IHBlcmZNZXRyaWNzID0ge307XG4gIGNvbnN0IHBlcmZOYXZpZ2F0aW9uTWV0cmljcyA9IHdpbmRvd1B0ci5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXTtcbiAgaWYgKHdpbmRvd1B0ci5wZXJmb3JtYW5jZSAmJiBwZXJmTmF2aWdhdGlvbk1ldHJpY3MpIHtcbiAgICBwZXJmTWV0cmljcy5jb25uZWN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLnJlcXVlc3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXNwb25zZUVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXF1ZXN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmRvbSA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUludGVyYWN0aXZlIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUNvbXBsZXRlKTtcbiAgICBwZXJmTWV0cmljcy5sb2FkID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmR1cmF0aW9uKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1ldHJpY3NcIiwgcGVyZk1ldHJpY3MpO1xufTtcblxuLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIFwiZWxlbWVudCBjb2xsZWN0b3JcIiBtb2R1bGUsIHRoZW4gZGF0YSBpcyBleHRyYWN0ZWQgZnJvbSBwcmUtY29sbGVjdGVkIGVsZW1lbnRzXG5jb25zdCBnZXRTT1JHQXJyYXkgPSAoKSA9PiB7XG4gIGNvbnN0IHNjaGVtYU9yZ0VsdHMgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT1cXFwiYXBwbGljYXRpb24vbGQranNvblxcXCJdXCIpO1xuICBjb25zdCBzb3JnQXJyYXkgPSBbXTtcblxuICBmb3IgKGNvbnN0IHNUYWcgb2Ygc2NoZW1hT3JnRWx0cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbnRudCA9IHNUYWcudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBqc29uY29udGVudCA9IEpTT04ucGFyc2UoY250bnQpO1xuICAgICAgc29yZ0FycmF5LnB1c2goanNvbmNvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gc29yZ0FycmF5O1xufTtcblxubGV0IHByb2R1Y3RJbmZvTG9va3VwSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG5leHBvcnQgY29uc3QgcHJvZHVjdEluZm9Mb29rdXAgPSBhc3luYyAoc2t1bGlzdCkgPT4ge1xuICBpZiAoIXNrdWxpc3QgfHwgc2t1bGlzdC5sZW5ndGggPT09IDApIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwicHJvZHVjdEluZm9Mb29rdXA6IE5vIHNrdSBmb3VuZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChwcm9kdWN0SW5mb0xvb2t1cEluUHJvZ3Jlc3MpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwicHJvZHVjdEluZm9Mb29rdXA6IEFscmVhZHkgaW4gcHJvZ3Jlc3NcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsb2dnZXIubG9nKFwicHJvZHVjdEluZm9Mb29rdXA6IFN0YXJ0aW5nIHByb2R1Y3QgaW5mbyBsb29rdXA6IFwiK3NrdWxpc3QpO1xuXG4gIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cbiAgcHJvZHVjdEluZm9Mb29rdXBJblByb2dyZXNzID0gdHJ1ZTtcbiAgbGV0IHByb2R1Y3RJbmZvID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoKExPT0tVUF9BUElfVVJMLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2t1bGlzdCksXG4gICAgICBoZWFkZXJzLFxuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfSk7XG4gICAgaWYgKHByb2R1Y3RJbmZvLm9rKSB7XG4gICAgICBwcm9kdWN0SW5mbyA9IGF3YWl0IHByb2R1Y3RJbmZvLmpzb24oKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIud2FybihcInByb2R1Y3RJbmZvTG9va3VwOiBmZXRjaCAmIHBhcnNlIGZhaWxlZFwiKTtcbiAgfVxuXG4gIHByb2R1Y3RJbmZvTG9va3VwSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICByZXR1cm4gcHJvZHVjdEluZm87XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVV0aWxzXCIpO1xuY29uc3QgbW9udGhzID0ge1xuICBcIm9jYWtcIjogMCxcbiAgXCLFn3ViYXRcIjogMSxcbiAgXCJtYXJ0XCI6IDIsXG4gIFwibmlzYW5cIjogMyxcbiAgXCJtYXnEsXNcIjogNCxcbiAgXCJoYXppcmFuXCI6IDUsXG4gIFwidGVtbXV6XCI6IDYsXG4gIFwiYcSfdXN0b3NcIjogNyxcbiAgXCJleWzDvGxcIjogOCxcbiAgXCJla2ltXCI6IDksXG4gIFwia2FzxLFtXCI6IDEwLFxuICBcImFyYWzEsWtcIjogMTEsXG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRG9jdW1lbnRIaWRlID0gKCkgPT4ge1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibmV4dERheS1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudHNcIik7XG4gIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaChUUkVBVE1FTlRTX0xPQ0FUSU9OKTtcbiAgY29uc3QganNvblRyZWF0bWVudCA9IGF3YWl0IHRyZWF0bWVudHMuanNvbigpO1xuICByZXR1cm4ganNvblRyZWF0bWVudDtcbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnQgd2VpZ2h0c1wiKTtcbiAgY29uc3QgdHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IGZldGNoKFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OKTtcbiAgY29uc3QganNvblRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzLmpzb24oKTtcbiAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoKEVfUlVMRVNfTE9DQVRJT04pO1xuICAgIGNvbnN0IGpzb25FbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZWxpZ2liaWxpdHlSdWxlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25FbGlnaWJpbGl0eVJ1bGVzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoQW5kUGVyc2lzdFByb2R1Y3RJbmZvID0gYXN5bmMgKGNvbGxlY3RvckFwaSkgPT4ge1xuICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdEluZm9Mb29rdXAgXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IGNvbGxlY3RvckFwaS5maW5kKFwicHJvZHVjdEluZm9DU1ZcIik7XG4gICAgY29uc29sZS5sb2coZXhpc3RpbmdQcm9kSW5mbyk7XG4gICAgaWYgKGV4aXN0aW5nUHJvZEluZm8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHByb2R1Y3QgaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9DU1YgPSBhd2FpdCBwcm9kdWN0SW5mby50ZXh0KCk7XG4gICAgYXdhaXQgY29sbGVjdG9yQXBpLnNhdmUoXCJwcm9kdWN0SW5mb0NTVlwiLCBjc3ZUb0FycmF5KHByb2R1Y3RJbmZvQ1NWKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3Qgd3JpdGUgcHJvZHVjdEluZm8gdG8gSW5kZXhEQlwiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcik7XG4gICAgaWYgKGhhc2ggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzID0gKCkgPT4ge1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHLCBTRVNTSU9OX1RJTUVTVEFNUCwgU0VTU0lPTl9ISVNUT1JZfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHBvcHVwRGlzcGxheUZsYWcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRyk7XG4gIGNvbnN0IHNlc3Npb25UaW1lc3RhbXAgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QKTtcbiAgY29uc3Qgc2Vzc2lvbkhpc3RvcnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fSElTVE9SWSk7XG5cbiAgaWYgKHBvcHVwRGlzcGxheUZsYWcgPT09IG51bGwpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMCk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uVGltZXN0YW1wKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCwgRGF0ZS5ub3coKSk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uSGlzdG9yeSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXSk7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHNlc3Npb25IaXN0b3J5XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb25kaXRpb25DaGVja2VyID0gKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSBcIm5vdEV4aXN0XCIpIHtcbiAgICBpZiAoIXJ1blRpbWVWYWx1ZSkge1xuICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fFxuICAgIHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZGl0aW9uID09PSBudWxsIHx8XG4gICAgY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogcnVuVGltZVZhbHVlIG9yIGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICBjYXNlIFwiZXhpc3RcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiaW5jbHVkZXNcIjpcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEluY2x1ZGVzXCI6XG4gICAgY2FzZSBcIm5vdENvbnRhaW5zXCI6XG4gICAgICBpZiAoIXJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90RXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlclRoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPiB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc1RoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlckVxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc0VxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiYmV0d2VlblwiOiB7XG4gICAgICBsZXQgW21pbiwgbWF4XSA9IHZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSBtaW4gJiYgcnVuVGltZVZhbHVlIDw9IG1heCkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYXNlIFwicmVnZXhcIjoge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIik7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChydW5UaW1lVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZCBcIiwgY29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERlYnVnTW9kZSA9IChvb3NSZWFzb24pID0+IHtcbiAgY29uc3Qge0RFQlVHX01PREUsIE9VVF9PRl9TQ09QRX0gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9XCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKE9VVF9PRl9TQ09QRSwgb29zUmVhc29uKTtcbiAgfVxuXG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTFcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0yXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDI7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MFwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBjdXJyZW50ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKERFQlVHX01PREUpKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgKGN1cnJlbnQgPyBcIm9uXCIgOiBcIm9mZlwiKSk7XG4gIHJldHVybiAoY3VycmVudCB8fCAwKTtcbn07XG5cbi8vIGdldCBHQSBjbGllbnQgaWQgdXNpbmcgZ2EuZ2V0QWxsKClcbmV4cG9ydCBjb25zdCBnZXRHYUNsaWVudElkID0gKCkgPT4ge1xuICBjb25zdCBnYSA9IHdpbmRvdy5nYTtcbiAgLy8gaWYgZ2EgYW5kIGdhLmdldEFsbCgpIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gbnVsbFxuICBpZiAoZ2EgJiYgZ2EuZ2V0QWxsKSB7XG4gICAgY29uc3QgdHJhY2tlcnMgPSBnYS5nZXRBbGwoKTtcbiAgICBpZiAodHJhY2tlcnMgJiYgdHJhY2tlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJhY2tlcnNbMF0uZ2V0KFwiY2xpZW50SWRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gZ2V0IGRldGVybWluaXN0aWMgbnVtZXJpYyBoYXNoIGZyb20gc3RyaW5nIHRoYXQgY29uYXRpbnMgb25seSBudW1iZXJzXG5leHBvcnQgY29uc3QgZ2V0VW5zZWN1cmVIYXNoID0gKHN0cikgPT4ge1xuICBsZXQgaGFzaCA9IDA7XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gIH1cbiAgLy8gcmV0dXJuIGFic29sdXRlIHZhbHVlXG4gIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbn07XG5cbi8vIGdlbmVyYXRlIGEgMzItYml0IHJhbmRvbSBpbnRlZ2VyXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApO1xufTtcblxuLy8gZ2V0IGN1cnJlbnQgdW5peCBlcG9jaCB0aW1lIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBnZXRVbml4VGltZSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0SWRlbnRpZmllciA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBsb2NhbCBzdG9yYWdlXCIsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2EgaW4gZmlyc3QgYXR0ZW1wdFwiLCBpZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2FcIiwgaWQpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgcmVhZCBHQSBjbGllbnQgaWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGluIGdldElkZW50aWZpZXJcIiwgZSk7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGVsaXZlcnlEYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZGF0ZTtcblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgc3RhcnRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgZW5kTW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIHN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgZW5kRGF5OiB1bmRlZmluZWQsXG4gIH07XG5cbiAgbGV0IG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKyktKFtcXFxcZF0rKVxcXFxzPyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzNdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKS0oW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCAhPT0gNSkgcmV0dXJuIGRhdGU7XG5cbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFsyXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzRdLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5zdGFydE1vbnRoSW5kZXggfHwgIXJlc3VsdC5lbmRNb250aEluZGV4KSByZXR1cm4gZGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0WWVhciA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBjb25zdCBlbmRZZWFyID0gcmVzdWx0LmVuZE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcblxuICAgIGNvbnN0IGVzdGltYXRlZFN0YXJ0ID0gbmV3IERhdGUoc3RhcnRZZWFyLCByZXN1bHQuc3RhcnRNb250aEluZGV4LCByZXN1bHQuc3RhcnREYXkpO1xuICAgIGNvbnN0IGVzdGltYXRlZEVuZCA9IG5ldyBEYXRlKGVuZFllYXIsIHJlc3VsdC5lbmRNb250aEluZGV4LCByZXN1bHQuZW5kRGF5KTtcblxuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkU3RhcnQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRFbmQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlcldlZWtzID0gc3RhcnREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChzdGFydERpZmZPdmVyRGF5cyAvIDcpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyV2Vla3MgPSBlbmREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChlbmREaWZmT3ZlckRheXMgLyA3KTtcblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSAtICR7ZW5kRGlmZk92ZXJEYXlzfSBHw7xuYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPj0gMSkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSBHw7xuIC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gZW5kRGlmZk92ZXJXZWVrcykge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaWRsZVRpbWVyID0gYXN5bmMgKHRpbWVPdXQsIGNhbGxCYWNrKSA9PiB7XG4gIGxldCBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQub250b3VjaHN0YXJ0ID0gcmVzZXRUaW1lcjtcblxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xuICAgIGNsZWFyVGltZW91dChpZGxlVGltZW91dCk7XG4gICAgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJUeXBlID0gKCkgPT4ge1xuICBjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2Nocm9tZXxjaHJvbWl1bXxjcmlvcy9pKSkge1xuICAgIHJldHVybiBcImNocm9tZVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveHxmeGlvcy9pKSkge1xuICAgIHJldHVybiBcImZpcmVmb3hcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL3NhZmFyaS9pKSkge1xuICAgIHJldHVybiBcInNhZmFyaVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvb3ByXFwvL2kpKSB7XG4gICAgcmV0dXJuIFwib3BlcmFcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2VkZy9pKSkge1xuICAgIHJldHVybiBcImVkZ2VcIjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gcmVmOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMjkzMTYzLzIzNDNcbi8vIFRoaXMgd2lsbCBwYXJzZSBhIGRlbGltaXRlZCBzdHJpbmcgaW50byBhbiBhcnJheSBvZlxuLy8gYXJyYXlzLiBUaGUgZGVmYXVsdCBkZWxpbWl0ZXIgaXMgdGhlIGNvbW1hLCBidXQgdGhpc1xuLy8gY2FuIGJlIG92ZXJyaWRlbiBpbiB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuZnVuY3Rpb24gY3N2VG9BcnJheSggc3RyRGF0YSwgc3RyRGVsaW1pdGVyICkge1xuICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGRlbGltaXRlciBpcyBkZWZpbmVkLiBJZiBub3QsXG4gIC8vIHRoZW4gZGVmYXVsdCB0byBjb21tYS5cbiAgc3RyRGVsaW1pdGVyID0gKHN0ckRlbGltaXRlciB8fCBcIixcIik7XG5cbiAgLy8gQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHBhcnNlIHRoZSBDU1YgdmFsdWVzLlxuICBjb25zdCBvYmpQYXR0ZXJuID0gbmV3IFJlZ0V4cChcbiAgICAgIChcbiAgICAgIC8vIERlbGltaXRlcnMuXG4gICAgICAgIFwiKFxcXFxcIiArIHN0ckRlbGltaXRlciArIFwifFxcXFxyP1xcXFxufFxcXFxyfF4pXCIgK1xuXG4gICAgICAgICAgICAgIC8vIFF1b3RlZCBmaWVsZHMuXG4gICAgICAgICAgICAgIFwiKD86XFxcIihbXlxcXCJdKig/OlxcXCJcXFwiW15cXFwiXSopKilcXFwifFwiICtcblxuICAgICAgICAgICAgICAvLyBTdGFuZGFyZCBmaWVsZHMuXG4gICAgICAgICAgICAgIFwiKFteXFxcIlxcXFxcIiArIHN0ckRlbGltaXRlciArIFwiXFxcXHJcXFxcbl0qKSlcIlxuICAgICAgKSxcbiAgICAgIFwiZ2lcIixcbiAgKTtcblxuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBkYXRhLiBHaXZlIHRoZSBhcnJheVxuICAvLyBhIGRlZmF1bHQgZW1wdHkgZmlyc3Qgcm93LlxuICBjb25zdCBhcnJEYXRhID0gW1tdXTtcblxuICAvLyBDcmVhdGUgYW4gYXJyYXkgdG8gaG9sZCBvdXIgaW5kaXZpZHVhbCBwYXR0ZXJuXG4gIC8vIG1hdGNoaW5nIGdyb3Vwcy5cbiAgbGV0IGFyck1hdGNoZXMgPSBudWxsO1xuXG5cbiAgLy8gS2VlcCBsb29waW5nIG92ZXIgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXRjaGVzXG4gIC8vIHVudGlsIHdlIGNhbiBubyBsb25nZXIgZmluZCBhIG1hdGNoLlxuICB3aGlsZSAoYXJyTWF0Y2hlcyA9IG9ialBhdHRlcm4uZXhlYyggc3RyRGF0YSApKSB7XG4gICAgLy8gR2V0IHRoZSBkZWxpbWl0ZXIgdGhhdCB3YXMgZm91bmQuXG4gICAgY29uc3Qgc3RyTWF0Y2hlZERlbGltaXRlciA9IGFyck1hdGNoZXNbMV07XG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGdpdmVuIGRlbGltaXRlciBoYXMgYSBsZW5ndGhcbiAgICAvLyAoaXMgbm90IHRoZSBzdGFydCBvZiBzdHJpbmcpIGFuZCBpZiBpdCBtYXRjaGVzXG4gICAgLy8gZmllbGQgZGVsaW1pdGVyLiBJZiBpZCBkb2VzIG5vdCwgdGhlbiB3ZSBrbm93XG4gICAgLy8gdGhhdCB0aGlzIGRlbGltaXRlciBpcyBhIHJvdyBkZWxpbWl0ZXIuXG4gICAgaWYgKFxuICAgICAgc3RyTWF0Y2hlZERlbGltaXRlci5sZW5ndGggJiZcbiAgICAgICAgICAgICAgc3RyTWF0Y2hlZERlbGltaXRlciAhPT0gc3RyRGVsaW1pdGVyXG4gICAgKSB7XG4gICAgICAvLyBTaW5jZSB3ZSBoYXZlIHJlYWNoZWQgYSBuZXcgcm93IG9mIGRhdGEsXG4gICAgICAvLyBhZGQgYW4gZW1wdHkgcm93IHRvIG91ciBkYXRhIGFycmF5LlxuICAgICAgYXJyRGF0YS5wdXNoKCBbXSApO1xuICAgIH1cblxuICAgIGxldCBzdHJNYXRjaGVkVmFsdWU7XG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIG91ciBkZWxpbWl0ZXIgb3V0IG9mIHRoZSB3YXksXG4gICAgLy8gbGV0J3MgY2hlY2sgdG8gc2VlIHdoaWNoIGtpbmQgb2YgdmFsdWUgd2VcbiAgICAvLyBjYXB0dXJlZCAocXVvdGVkIG9yIHVucXVvdGVkKS5cbiAgICBpZiAoYXJyTWF0Y2hlc1syXSkge1xuICAgICAgLy8gV2UgZm91bmQgYSBxdW90ZWQgdmFsdWUuIFdoZW4gd2UgY2FwdHVyZVxuICAgICAgLy8gdGhpcyB2YWx1ZSwgdW5lc2NhcGUgYW55IGRvdWJsZSBxdW90ZXMuXG4gICAgICBzdHJNYXRjaGVkVmFsdWUgPSBhcnJNYXRjaGVzWzJdLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cCggXCJcXFwiXFxcIlwiLCBcImdcIiApLFxuICAgICAgICAgIFwiXFxcIlwiLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgZm91bmQgYSBub24tcXVvdGVkIHZhbHVlLlxuICAgICAgc3RyTWF0Y2hlZFZhbHVlID0gYXJyTWF0Y2hlc1szXTtcbiAgICB9XG5cblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIHZhbHVlIHN0cmluZywgbGV0J3MgYWRkXG4gICAgLy8gaXQgdG8gdGhlIGRhdGEgYXJyYXkuXG4gICAgYXJyRGF0YVthcnJEYXRhLmxlbmd0aCAtIDFdLnB1c2goIHN0ck1hdGNoZWRWYWx1ZSApO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBwYXJzZWQgZGF0YS5cbiAgcmV0dXJuICggYXJyRGF0YSApO1xufVxuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtnZXRVbnNlY3VyZUhhc2h9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU1vbml0b3JcIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBtb25pdG9yXCIpO1xuXG4gICAgdGhpcy5hSGFzaCA9IG51bGw7XG4gICAgdGhpcy5lSGFzaCA9IG51bGw7XG4gICAgdGhpcy5mSGFzaCA9IG51bGw7XG5cbiAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETzogbWFrZSBiZWFnbGVpbmZvbGF5ZXIgYWNjZXNzIHRvIHRyYWNrIGNoYW5nZXMgYW5kIGtlZXAgYSBoaWdoIHdhdGVyIG1hcmsgdG8gdW5kZXJzdGFuZCBjaGFuZ2VzXG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIGF3YWl0aW5nIHNjcmFwaW5nXCIpO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBzZW5kaW5nIGxvZ3NcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIGluaXRpYWwgbG9nIGJvZHkgYW5kIGluY3JlbWVudGFsIHVwZGF0ZSBsb2dzIG9uIGNsb3NlXG4gIGFzeW5jIGhhbmRsZUNsb3NlRXZlbnQoKSB7XG4gICAgLy8gaWYgaW5pdGlhbCBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCBzZW5kIHVwZGF0ZXMgYW5kIGluZm9sYXllciBpbiBvbmUgYmF0Y2hcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICAvLyBpZiBtYWluIGxvZyBoYXMgYmVlbiBzZW50LCBzZW5kIGluY3JlbWVudGFsIHVwZGF0ZXMgb25seVxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZU1haW5Mb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZU1haW5Mb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgICBsb2dnZXIubG9nKFwiUmVxdWVzdCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpIHtcbiAgICBpZiAoIXRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNVcGRhdGVzU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCB0aGVyZSBpcyBubyBpbmNyZW1lbnRhbCB5ZXRcbiAgICAgIC8vIG9yIGlmIHRoZSB1cGRhdGVzIGhhdmUgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ2hhbmdlZCA9IGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2dzIGNoYW5nZSBzdGF0dXM6IFwiLCBoYXNDaGFuZ2VkKTtcbiAgICBpZiAoIWhhc0NoYW5nZWQpIHJldHVybjtcblxuICAgIGNvbnN0IGxvZ0RhdGEgPSBhd2FpdCB0aGlzLnBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKTtcbiAgICBpZiAobG9nRGF0YSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNlbmRpbmcgaW5jcmVtZW50YWwgbG9nc1wiLCBsb2dEYXRhKTtcbiAgICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MobG9nRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlQXJyaXZhbExvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc0Fycml2YWxMb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBvciBhcnJpdmFsIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICAvLyBrZWVwIHByZXZpb3VzIGhhc2hlcyBhbmQgY29tcHV0ZSBjdXJyZW50IGZvciBhLCBlLCBmIGFuZCByZXR1cm4gdHJ1ZSBpZiBhbnkgb2YgdGhlbSBoYXZlIGNoYW5nZWRcbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IFthLCBlLCBmXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZlwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IFthSGFzaCwgZUhhc2gsIGZIYXNoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldFVuc2VjdXJlSGFzaChKU09OLnN0cmluZ2lmeShhKSksXG4gICAgICBnZXRVbnNlY3VyZUhhc2goSlNPTi5zdHJpbmdpZnkoZSkpLFxuICAgICAgZ2V0VW5zZWN1cmVIYXNoKEpTT04uc3RyaW5naWZ5KGYpKSxcbiAgICBdKTtcblxuICAgIGxldCBoYXNDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBpZiAoYUhhc2ggIT09IHRoaXMuYUhhc2ggfHxcbiAgICAgICAgZUhhc2ggIT09IHRoaXMuZUhhc2ggfHxcbiAgICAgICAgZkhhc2ggIT09IHRoaXMuZkhhc2gpIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYUhhc2ggPSBhSGFzaDtcbiAgICB0aGlzLmVIYXNoID0gZUhhc2g7XG4gICAgdGhpcy5mSGFzaCA9IGZIYXNoO1xuXG4gICAgcmV0dXJuIGhhc0NoYW5nZWQ7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMixcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICBhLCBlLCBmLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBwYWdlaGlkZSBldmVudFwiKTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uaXRvcjtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllckNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0RhdGFMYXllclJ1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSwgdHJ1ZSwgMjUsIDEwMDApO1xuICBpZiAocmVzICE9PSBudWxsICYmIHJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoYEZvdW5kIGtleSAke2tleX0gd2l0aCB2YWx1ZSAke3Jlc31gKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGxvZ2dlci5mYWlsZWQoYEtleSAke2tleX0gbm90IGZvdW5kIGluIGJlYWdsZUluZm9MYXllcmApO1xuICByZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRWxlbWVudENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VsZW1lbnRSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZSwgc2VsZWN0b3IsIHNlbGVjdG9yQWxsLCBzZWxlY3RvckZhbGxiYWNrID0gbnVsbH0gPSBydWxlO1xuICBsZXQgbWFpblNlbGVjdG9yID0gc2VsZWN0b3I7XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbWFpblNlbGVjdG9yID0gc2VsZWN0b3JGYWxsYmFjayA/IHNlbGVjdG9yRmFsbGJhY2sgOiBtYWluU2VsZWN0b3I7XG4gIH1cblxuICBpZiAob3BlcmF0b3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcih3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gIH1cbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChzZWxlY3RvckFsbCAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgZWxlbWVudDtcbiAgaWYgKG1haW5TZWxlY3RvcikgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpO1xuICBlbHNlIGlmIChzZWxlY3RvckFsbCkgZWxlbWVudCA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSk7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJ0ZXh0LW51bWJlclwiOiB7XG4gICAgICBsZXQgdGVtcFZhbDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIHRlbXBWYWwgPSBlbGVtZW50LnJlZHVjZSgocmV0dXJuVmFsLCBlbGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuVmFsICs9IHBhcnNlSW50KGVsZW0udGV4dENvbnRlbnQucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBWYWwgPSBwYXJzZUludCh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgLnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwYXJzZUludCh0ZW1wVmFsKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJjbGFzc0xpc3RcIjpcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiY291bnRcIjoge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgJiYgZWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGVsZW1lbnQubGVuZ3RoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigxLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDAsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjYXNlIFwic3R5bGVcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdHlsZUtleSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICBjb25zdCBzdHlsZVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnRTdHlsZXNbc3R5bGVLZXldO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHN0eWxlVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcIk9wZXJhdG9yIG5vdCBkZWZpbmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUZ1bmN0aW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRnVuY3Rpb25SdWxlID0gKHJ1bGUsIG9wdHMpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtwcm9kdWN0SW5mb30gPSBvcHRzIHx8IHt9O1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIGJpbmRpbmdzfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGNvbnRleHQgPSB7fTtcbiAgaWYgKGJpbmRpbmdzID09IFwicHJvZHVjdEluZm9cIikge1xuICAgIGNvbnRleHQgPSB7XG4gICAgICBwcm9kdWN0SW5mbyxcbiAgICB9O1xuICB9XG4gIGNvbnN0IHJ1bGVGdW5jdGlvbiA9IEZ1bmN0aW9uKG9wZXJhdG9yKS5iaW5kKGNvbnRleHQpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUHJvZHVjdEluZm9DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tQcm9kdWN0SW5mb1J1bGUgPSAocnVsZSwgYmluZGluZ3MpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCB7cHJvZHVjdEluZm99ID0gYmluZGluZ3M7XG4gIGlmICghcHJvZHVjdEluZm8gfHwgKHR5cGVvZiBwcm9kdWN0SW5mbyA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMocHJvZHVjdEluZm8pLmxlbmd0aCkpIHJldHVybiBmYWxzZTtcbiAgbGV0IHJ1bnRpbWVWYWx1ZSA9IG51bGw7XG4gIGNvbnN0IHNrdSA9IHByb2R1Y3RJbmZvW09iamVjdC5rZXlzKHByb2R1Y3RJbmZvKVswXV0/LmlkO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gZ2V0VHJhbnNhY3Rpb25Db3VudChza3UsIHByb2R1Y3RJbmZvKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgQWRkVG9DYXJ0Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGdldEFkZFRvQ2FydENvdW50KHNrdSwgcHJvZHVjdEluZm8pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGdldFByZXZpZXdDb3VudChza3UsIHByb2R1Y3RJbmZvKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IChza3UsIHByb2R1Y3RJbmZvKSA9PiB7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8gJiYgcHJvZHVjdEluZm9bc2t1XSkge1xuICAgIHJldHVybiBwcm9kdWN0SW5mb1tza3VdPy5jYXRhbG9nPy50cmFuc2FjdGlvbkluMldlZWtzO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEFkZFRvQ2FydENvdW50ID0gKHNrdSwgcHJvZHVjdEluZm8pID0+IHtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbyAmJiBwcm9kdWN0SW5mb1tza3VdKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvW3NrdV0/LmNhdGFsb2c/LmFkZFRvQ2FydEluMldlZWtzO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IChza3UsIHByb2R1Y3RJbmZvKSA9PiB7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8gJiYgcHJvZHVjdEluZm9bc2t1XSkge1xuICAgIHJldHVybiBwcm9kdWN0SW5mb1tza3VdPy5jYXRhbG9nPy5wcm9kdWN0Vmlld0NvdW50O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCJpbXBvcnQge2NoZWNrRGF0YUxheWVyUnVsZX0gZnJvbSBcIi4vZGF0YUxheWVyQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VsZW1lbnRSdWxlfSBmcm9tIFwiLi9lbGVtZW50Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0Z1bmN0aW9uUnVsZX0gZnJvbSBcIi4vZnVuY3Rpb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrU2Vzc2lvblJ1bGV9IGZyb20gXCIuL3Nlc3Npb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrVXJsUnVsZX0gZnJvbSBcIi4vdXJsQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VudlJ1bGV9IGZyb20gXCIuL2VudkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tQcm9kdWN0SW5mb1J1bGV9IGZyb20gXCIuL3Byb2R1Y3RJbmZvQ2hlY2tlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUnVsZUVuZ2luZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlcywgYmFzZVJ1bGVTZXQsIGJpbmRpbmdzfSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5iaW5kaW5ncyA9IGJpbmRpbmdzO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgdGhpcy5iYXNlUnVsZVNldCkge1xuICAgICAgY29uc3QgcnVsZVNhdGlzZmllZCA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgaWYgKCFydWxlU2F0aXNmaWVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGUocnVsZSkge1xuICAgIGNvbnN0IHtjaGFpbiwgY2hhaW5fY29uZGl0aW9uLCB0eXBlfSA9IHJ1bGU7XG4gICAgbGV0IHJ1bGVTYXRpc2ZpZWQgPSBudWxsO1xuICAgIC8vIGNoZWNrIHJ1bGVcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJzZXNzaW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1Nlc3Npb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VsZW1lbnRSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrRGF0YUxheWVyUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXJsXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1VybFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0Z1bmN0aW9uUnVsZShydWxlLCB0aGlzLmJpbmRpbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZW52aXJvbm1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRW52UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrUHJvZHVjdEluZm9SdWxlKHJ1bGUsIHRoaXMuYmluZGluZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIHN1Y2ggcnVsZSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjaGFpbikge1xuICAgICAgc3dpdGNoIChjaGFpbl9jb25kaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICYmIGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgfHwgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgIT0gYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIGNoYWluIGNvbmRpdGlvblwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVTYXRpc2ZpZWQ7XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5lbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAgY29uc3Qgc2F0aXNmaWVkUnVsZUlkcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKSkge1xuICAgICAgICAgIHNhdGlzZmllZFJ1bGVJZHMucHVzaChydWxlLm5hbWUpO1xuICAgICAgICAgIC8vIFBhZ2UgdHlwZSBydWxlcyBhcmUgZXhjbHVzaXZlOyBpZiBvbmUgaXMgdHJ1ZSBhbGwgb3RoZXJzIGFyZSBmYWxzZSBieSBkZWZhdWx0LCBubyBuZWVkIHRvIGFzc2VzcyBvdGhlcnNcbiAgICAgICAgICBpZiAoa2V5ID09PSBcIlBhZ2VUeXBlXCIpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgZVJ1bGVzLiR7a2V5fWAsIHNhdGlzZmllZFJ1bGVJZHMpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiU2VnbWVudGF0aW9uQ29tcHV0ZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gIGxvZ2dlci5sb2coXCJEZXRlcm1pbmluZyB1c2VyIHNlZ21lbnRcIik7XG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgIGNvbnN0IHJ1bGVTZXQgPSB0cmVhdG1lbnRXZWlnaHRzW3NlZ21lbnRdPy5ydWxlU2V0O1xuICAgIGlmICghcnVsZVNldCkgY29udGludWU7XG4gICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW10sIGJpbmRpbmdzOiBudWxsfSk7XG4gICAgaWYgKGF3YWl0IHNlZ21lbnRSdWxlRW5naW5lLmNoZWNrUnVsZXMoKSkge1xuICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic1wiLCBzZWdtZW50KTtcbiAgICAgIHJldHVybiBzZWdtZW50O1xuICAgIH1cbiAgfVxuXG4gIGxvZ2dlci5sb2coXCJVc2VyIHNlZ21lbnQgbm90IG1hdGNoZWQsIHJldHVybmluZyBkZWZhdWx0XCIpO1xuICByZXR1cm4gXCJkZWZhdWx0XCI7XG59XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTLCBUUkVBVE1FTlRTX0RVUkFUSU9OfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2ZldGNoVHJlYXRtZW50cywgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Y29tcHV0ZVNlZ21lbnR9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXIvc2VnbWVudC1jb21wdXRlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiKTtcblxuY2xhc3MgVHJlYXRtZW50UmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSBib2R5O1xuICAgIHRoaXMudHJlYXRtZW50cyA9IHRyZWF0bWVudHM7XG5cbiAgICB0aGlzLnRyZWF0bWVudFdlaWdodHMgPSB0cmVhdG1lbnRXZWlnaHRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudHMoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkxvYWRpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB7VFJFQVRNRU5UU30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcbiAgICBjb25zdCB0cmVhdG1lbnRzT2JqID0gSlNPTi5wYXJzZSh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShUUkVBVE1FTlRTKSk7XG4gICAgbGV0IHRyZWF0bWVudHMgPSB0cmVhdG1lbnRzT2JqPy50cmVhdG1lbnRzO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyZWF0bWVudHNPYmo/LnRpbWVzdGFtcDtcbiAgICBpZiAoIXRyZWF0bWVudHMgfHwgIXRpbWVzdGFtcCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHRyZWF0bWVudHMsXG4gICAgICB9O1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgfVxuICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IGVsYXBzZWREYXlzID0gKERhdGUubm93KCkgLSB0aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwICogMjQpO1xuICAgICAgaWYgKGVsYXBzZWREYXlzID4gVFJFQVRNRU5UU19EVVJBVElPTikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBhcmUgZXhwaXJlZFwiKTtcbiAgICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIuc3VjY2VzcyhcIlRyZWF0bWVudHMgYXJlIGxvYWRlZCBmcm9tIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50V2VpZ2h0cygpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0TWF0Y2hlZFRyZWF0bWVudHMoKSB7XG4gICAgY29uc3QgdHJlYXRtZW50V2VpZ2h0cyA9IHRoaXMudHJlYXRtZW50V2VpZ2h0cztcbiAgICBjb25zdCB1c2VyR3JvdXAgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzID0gdGhpcy50cmVhdG1lbnRzO1xuICAgIGlmICh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgICBjb25zdCB1c2VyR3JvdXBXZWlnaHRzID0gKHVzZXJHcm91cCAmJiB0cmVhdG1lbnRXZWlnaHRzW3VzZXJHcm91cF0pID9cbiAgICAgIHRyZWF0bWVudFdlaWdodHNbdXNlckdyb3VwXSA6IHRyZWF0bWVudFdlaWdodHNbXCJkZWZhdWx0XCJdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICB0cmVhdG1lbnQud2VpZ2h0ID0gdXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQ/LmlkXT8ud2VpZ2h0IHx8IDA7XG4gICAgICAgIGlmICghdHJlYXRtZW50LmFjdGlvbnMuc29tZSgoYSkgPT4gYS52YXJpYW50cykpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiB0cmVhdG1lbnQuYWN0aW9ucykge1xuICAgICAgICAgIGlmICghYWN0aW9uLnZhcmlhbnRzKSBjb250aW51ZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhbnRLZXkgb2YgT2JqZWN0LmtleXMoYWN0aW9uLnZhcmlhbnRzKSkge1xuICAgICAgICAgICAgaWYgKHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHMgJiYgdXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0ID0gdXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQuaWRdLnZhcmlhbnRzW3ZhcmlhbnRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci5sb2coYCR7dHJlYXRtZW50cy5sZW5ndGh9IHRyZWF0bWVudHMgdXNlciBncm91cCBtYXRjaGVkYCk7XG4gICAgaWYgKCF0cmVhdG1lbnRzLmxlbmd0aCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWF0bWVudFJlcG9zaXRvcnk7XG4iLCJpbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlJlcGxhY2VVdGlsc1wiKTtcblxuY29uc3QgcmVwbGFjZXIgPSBhc3luYyAodmFsdWUsIHJlcGxhY2VGbikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IFtpLCB2YWxdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY3VycmVudFJlcGxhY2VGbiA9IEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSA/IHJlcGxhY2VGbltpXSA6IHJlcGxhY2VGbiB8fCBcIlwiO1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKGN1cnJlbnRSZXBsYWNlRm4pO1xuICAgICAgICB2YWx1ZVtpXSA9IHJlcGxhY2VBbGwodmFsLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlW2ldID0gcmVwbGFjZUZuRXhlY3V0b3IoY3VycmVudFJlcGxhY2VGbiwgdmFsKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pKSB7XG4gICAgZm9yIChjb25zdCByRm4gb2YgcmVwbGFjZUZuKSB7XG4gICAgICBpZiAodHlwZW9mIHJGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyRm4pO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJGbiwgdmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKTtcbiAgICAgIHZhbHVlID0gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlLCBzaW5nbGUgPSBmYWxzZSkge1xuICBpZiAocmVwbGFjZUZuICYmIHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikpIHtcbiAgICBsb2dnZXIubG9nKFwiRXhlY3V0aW5nIHJlcGxhY2UgZnVuY3Rpb246IFwiLCByZXBsYWNlRm4pO1xuICAgIGNvbnN0IHJlcGxhY2VGdW5jdGlvbiA9IEZ1bmN0aW9uKHJlcGxhY2VGbik7XG4gICAgaWYgKHNpbmdsZSkgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gICAgcmV0dXJuIHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pIHtcbiAgY29uc3Qge3N0b3JhZ2UsIGtleSwga2V5RmFsbGJhY2ssIHR5cGV9ID0gcmVwbGFjZUZuO1xuICBzd2l0Y2ggKHN0b3JhZ2UpIHtcbiAgICBjYXNlIFwic2Vzc2lvblwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IG51bGw7XG4gICAgICByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleUZhbGxiYWNrKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IEpTT04ucGFyc2UocmVwbGFjZVZhbCk7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IHJlcGxhY2VWYWxbcmVwbGFjZVZhbC5sZW5ndGggLSAxXVt0eXBlXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGQgbm90IHBhcnNlICR7cmVwbGFjZVZhbH1gKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICAgIGNhc2UgXCJpbmZvLWxheWVyXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXlGYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZXI7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gKGNvbmRpdGlvbiwgcHJvZHVjdEluZm8pID0+IHtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlfSA9IGNvbmRpdGlvbjtcbiAgbG9nZ2VyLmxvZyhcIkFjdGlvbiBjb25kaXRpb24gZm91bmQ6IFwiLCBjb25kaXRpb24pO1xuICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gW107XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOiB7XG4gICAgICBjb25zdCBjb25kaXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29uZGl0aW9uRWxlbWVudHMpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHByb2R1Y3RJbmZvPy5bZWxlbWVudFNrdV0/LmNhdGFsb2c/LltvcGVyYXRvcl07XG4gICAgICAgIGlmICghcnVuVGltZVZhbHVlKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgY29udGludWU7XG4gICAgICAgIGVsaWdpYmxlRWxlbWVudHMucHVzaCgkKGVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxpZ2libGVFbGVtZW50cztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi9hY3Rpb24tY29uZGl0aW9uLXV0aWxcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5QWN0aW9ucyhhY3Rpb25zLCBiaW5kaW5ncykge1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlQXBwbHlBY3Rpb25zXCIpO1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuICBjb25zdCB7cHJvZHVjdEluZm99ID0gYmluZGluZ3M7XG5cbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGFjdGlvbjogXCIsIEpTT04uc3RyaW5naWZ5KGFjdGlvbikpO1xuICAgIGNvbnN0IHtcbiAgICAgIG9wZXJhdG9yLFxuICAgICAgdHlwZSxcbiAgICAgIGFwcGx5RXZlbnQsXG4gICAgICBjb250ZW50U2VsZWN0b3IsXG4gICAgICBzZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yRmFsbGJhY2ssXG4gICAgICBtZENvbmRpdGlvbixcbiAgICAgIG1vdmVfc2VsZWN0b3JfMSxcbiAgICAgIG1vdmVfc2VsZWN0b3JfMixcbiAgICAgIHJlcGxhY2VGbixcbiAgICAgIHBUeXBlLFxuICAgICAgYXR0cmlidXRlLFxuICAgIH0gPSBhY3Rpb247XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIm5vb3BcIikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vb3AgT3BlcmF0b3I6IE5vIG9wZXJhdGlvbiBpcyBhcHBsaWVkIG9uIHRhcmdldCBcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHt2YWx1ZX0gPSBhY3Rpb247XG4gICAgLy8gSWYgYW4gZWxlbWVudCBpcyBwYXNzZWQgdG8gdHJhbnNmb3JtZXIsIHNlbGVjdG9yIGlzIHJlbGF0aXZlIHRvIHBhc3NlZCBlbGVtZW50XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmZpbmQoc2VsZWN0b3IpIDogJChzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBtYyA9IG1kQ29uZGl0aW9uID8gd2luZG93Lm1hdGNoTWVkaWEobWRDb25kaXRpb24pLm1hdGNoZXMgOiB0cnVlO1xuICAgIGlmICghbWMpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJNZWRpYSBjb25kaXRpb24gbWlzbWF0Y2g6IFwiLCBtZENvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzEgJiYgIW1vdmVfc2VsZWN0b3JfMikgfHxcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzIgJiYgIW1vdmVfc2VsZWN0b3JfMSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJCb3RoIG1vdmUgc2VsZWN0b3JzIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG1vdmVfc2VsZWN0b3JfMSAmJiBtb3ZlX3NlbGVjdG9yXzIpIHtcbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzEpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAxIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzIpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAyIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBzcGVjaWZpZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCEkKHNlbGVjdG9yRmFsbGJhY2spLmxlbmd0aCAmJiBvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gXCJuby1zZWxlY3RvclwiKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZDogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVHJ5aW5nIGZhbGxiYWNrIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yRmFsbGJhY2spIGVsZW1lbnQgPSAkKHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWxsYmFjayBzZWxlY3RvciBub3QgZm91bmRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VGbikge1xuICAgICAgdmFsdWUgPSBhd2FpdCByZXBsYWNlcih2YWx1ZSwgcmVwbGFjZUZuLCBwcm9kdWN0SW5mbyk7XG4gICAgfVxuICAgIGlmIChvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZW1vdmluZzogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBsb2dnZXIubG9nKFwiQ2Fubm90IGZvdW5kIGVsZW1lbnQgd2l0aCBzZWxlY3RvcjogXCIsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluc2VydFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJlZm9yZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYmVmb3JlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGlmIChTdHJpbmcodmFsdWUpLmluY2x1ZGVzKFwibmQtYWRkLXRvLXdpblwiKSkge1xuICAgICAgICAgICAgJChcIi5uZC1hZGQtdG8td2luXCIpLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmJlZm9yZSh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZnRlclwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYWZ0ZXI6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hZnRlcih2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhcHBlbmRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwZW5kaW5nIHZhbHVlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vZGFsXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudC5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGVsbSA9PSBlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzcGxheU1vZGFsKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicG9wdXBcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSAhPT0gMCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiUG9wdXAgYWxyZWFkeSBkaXNwbGF5ZWQgaW4gc2Vzc2lvblwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgUG9wdXA6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAocFR5cGUpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBnZXRQcm9kdWN0SW5mbyhwcm9kdWN0SW5mbywgcFR5cGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBjb25zdCBtb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJleGl0SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgZXhpdCBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3IsIGRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInJcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIgJiYgIXIuaW5jbHVkZXMoZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZGxlVGltZXIoSURMRV9USU1FT1VULCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3B5SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgY29weSBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhcHBlbmQgcG9wdXAgdG8gYm9keSBhZnRlciB0aW1lb3V0IGV4cGlyZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVBvcHVwKCk7XG4gICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBUeXBlOiAke3R5cGV9IG5vdCBmb3VuZCBmb3Igb3BlcmF0b3I6ICR7b3BlcmF0b3J9YCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJlZGl0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIHRleHQ6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC50ZXh0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyBodG1sOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuaHRtbCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHlsZUFwcGxpY2F0b3JcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZUNoYW5nZXNNYXAgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTdHlsZSBDaGFuZ2VzIE1hcDogXCIsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgICBzdHlsZUFwcGxpY2F0b3IoZWxlbWVudCwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZGRDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGFkZGRpbmcgY2xhc3MgdG8gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVtb3ZlQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGByZW1vdmUgY2xhc3MgZnJvbSAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb2N1bWVudFRpdGxlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgY2hhbmdpbmcgZG9jdW1lbnQgdGl0bGUgZnJvbSAke2VsZW1lbnR9IHRvICR7dmFsdWV9YCk7XG4gICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgPT0gXCJ0YWJDaGFuZ2VcIikge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJjYXRjaGluZyBldmVudCB0YWJjaGFuZ2UuLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gd2luZG93LnRvcC5kb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShlLCB2YWx1ZSwgb3JpZ2luYWxUaXRsZSk7XG4gICAgICAgICAgICAgICAgICB9LCAxNTAwMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmtub3duIGVkaXQgdHlwZTogXCIsIHR5cGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic2V0YXR0cmlidXRlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgc3dpdGNoIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgY2FzZSBcInNyY1wiOlxuICAgICAgICAgIGVsZW1lbnQuY3NzKFwiY29udGVudFwiLCBgdXJsKCR7dmFsdWUudHJpbSgpfSlgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jYXNlLWRlY2xhcmF0aW9uc1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5VmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuXG4gICAgICAgICAgZWxlbWVudC5jc3MocHJvcGVydHksIHByb3BlcnR5VmFsdWUsIFwiIWltcG9ydGFudFwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoXCJmdW5jdGlvblwiKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBGdW5jdGlvbih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5oYW5kbGVkIGF0dHJpYnV0ZTogU2V0dGluZyBhdHRyaWJ1dGU6IFwiLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInJlcGxhY2VcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZzogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQucmVwbGFjZUFsbCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzd2FwXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTd2FwcGluZzogXCIsIG1vdmVfc2VsZWN0b3JfMSwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGNvbnN0IG4xID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBuMiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgc3dhcE5vZGVzKG4xLCBuMik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbmplY3RzY3JpcHRcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluamVjdGluZyBzY3JpcHQ6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LmFwcGVuZChgPHNjcmlwdD4ke3ZhbHVlfTwvc2NyaXB0PmApO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwibW92ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKGBNb3ZpbmcgJHttb3ZlX3NlbGVjdG9yXzF9IHRvICR7bW92ZV9zZWxlY3Rvcl8yfWApO1xuICAgICAgY29uc3Qgc291cmNlID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgc291cmNlLnJlbW92ZSgpO1xuICAgICAgZGVzdGluYXRpb24ucHJlcGVuZChzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicHJvZHVjdEluZm9Mb29rdXBcIikge1xuICAgICAgY29uc3QgcmVzID0gZ2V0UHJvZHVjdEluZm8ocHJvZHVjdEluZm8sIHBUeXBlLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gKHByb2R1Y3RJbmZvLCB0eXBlLCB2YWx1ZSkgPT4ge1xuICAgIC8vIGdldCBrZXlzIG9mIHByb2R1Y3RJbmZvXG4gICAgY29uc3Qgc2t1TGlzdCA9IE9iamVjdC5rZXlzKHByb2R1Y3RJbmZvKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudFNrdSA9IHNrdUxpc3RbMF07XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvW2VsZW1lbnRTa3VdLmNhdGFsb2cudHJhbnNhY3Rpb25JbjJXZWVrcz8udG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHRyYW5zY2F0aW9uSW4yV2Vla3MgXCIsIHByb2R1Y3RJbmZvW2VsZW1lbnRTa3VdLmNhdGFsb2cudHJhbnNhY3Rpb25JbjJXZWVrcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm9bZWxlbWVudFNrdV0uY2F0YWxvZy5hZGRUb0NhcnRJbjJXZWVrcz8udG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIEFkZFRvQ2FydENvdW50IFwiLCBwcm9kdWN0SW5mb1tlbGVtZW50U2t1XS5jYXRhbG9nLmFkZFRvQ2FydEluMldlZWtzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvW2VsZW1lbnRTa3VdLmNhdGFsb2cucHJvZHVjdFZpZXdDb3VudD8udG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yXCIsIHByb2R1Y3RJbmZvW2VsZW1lbnRTa3VdLmNhdGFsb2cucHJvZHVjdFZpZXdDb3VudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIm5vIHN1Y2ggdHlwZSBmb3VuZCBmb3IgcHJvZHVjdEluZm9Mb29rdXAgb3BlcmF0b3I6IFwiKyB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgY29uc3QgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSA9IGFzeW5jIChldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkVGl0bGVzID0gIUFycmF5LmlzQXJyYXkodGl0bGVzKSA/IFt0aXRsZXNdIDogdGl0bGVzO1xuICAgIGZvciAoY29uc3QgcGFyc2VkVGl0bGUgb2YgcGFyc2VkVGl0bGVzKSB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IHBhcnNlZFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQb3B1cENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQ7XG4gICAgaWYgKGlkICYmIGlkID09PSBcIm5kLXBvcHVwX193cmFwcGVyXCIpIHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuY29udGFpbnMoXCJuZC1tb2RhbF9fd3JhcHBlclwiKSkge1xuICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBvcHVwID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpID4gMCkgcmV0dXJuO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAxKTtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmQtcG9wdXBfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcblxuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH0sIDE1MDAwKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5TW9kYWwgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvcikgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpKSBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQb3B1cCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCBpc01vZGFsPWZhbHNlKSA9PiB7XG4gICAgLy8gQ3JlYXRlIHBvcHVwIHdyYXBwZXJcbiAgICBjb25zdCBwb3B1cFdyYXBwZXIgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLXBvcHVwX193cmFwcGVyXCIpO1xuICAgIGlmIChpc01vZGFsKSBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLW1vZGFsX193cmFwcGVyXCIpO1xuICAgIGlmICghaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmlkID0gXCJuZC1wb3B1cF9fd3JhcHBlclwiO1xuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b24gPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvblN0eWxlID0gaXNNb2RhbCA/IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZV9fY29sb3JlZFwiIDogXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlXCI7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xvc2VCdXR0b25TdHlsZSk7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBpZiAoaXNNb2RhbCkge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnRTZWxlY3Rvcikge1xuICAgICAgY29uc3QgY29udGVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZW50U2VsZWN0b3IpKTtcbiAgICAgIHdoaWxlICh2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpICYmIGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgY29udGVudHMuc2hpZnQoKS5zcmMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBwb3B1cCBmcm9tIGFjdGlvbiBhbmQgYXBwZW5kIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHRlbXBsYXRlID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IHBvcHVwID0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwQ2xvc2VCdXR0b24pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChwb3B1cCk7XG5cbiAgICAvLyBSZW1vdmUgb2xkIHBvcHVwIGlmIGV4aXN0cyBiZWZvcmUgYXBwZW5kaW5nIG5ldyBvbmVcbiAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IHN3YXBOb2RlcyA9IGZ1bmN0aW9uIHN3YXBOb2RlcyhuMSwgbjIpIHtcbiAgICBjb25zdCBwMSA9IG4xLnBhcmVudE5vZGU7XG4gICAgY29uc3QgcDIgPSBuMi5wYXJlbnROb2RlO1xuICAgIGxldCBpMTtcbiAgICBsZXQgaTI7XG5cbiAgICBpZiAoIXAxIHx8ICFwMiB8fCBwMS5pc0VxdWFsTm9kZShuMikgfHwgcDIuaXNFcXVhbE5vZGUobjEpKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDEuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjEpKSB7XG4gICAgICAgIGkxID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAyLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4yKSkge1xuICAgICAgICBpMiA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHAxLmlzRXF1YWxOb2RlKHAyKSAmJiBpMSA8IGkyKSB7XG4gICAgICBpMisrO1xuICAgIH1cbiAgICBwMS5pbnNlcnRCZWZvcmUobjIsIHAxLmNoaWxkcmVuW2kxXSk7XG4gICAgcDIuaW5zZXJ0QmVmb3JlKG4xLCBwMi5jaGlsZHJlbltpMl0pO1xuICB9O1xuXG4gIGNvbnN0IHdhaXRGb3JKUXVlcnkgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImpRdWVyeSBub3QgZm91bmQsIHJldHJ5aW5nXCIpO1xuICAgICAgICBjb25zdCBqUXVlcnlJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0gZWxzZSByZXNvbHZlKHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFjdGlvbkFwcGxpY2F0b3IgPSBhc3luYyAoYWN0aW9ucykgPT4ge1xuICAgIGlmIChhd2FpdCB3YWl0Rm9ySlF1ZXJ5KCkpIHtcbiAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGFjdGlvbi5jb25kaXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBjaGVja0FjdGlvbkNvbmRpdGlvbihhY3Rpb24uY29uZGl0aW9uLCBwcm9kdWN0SW5mbyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge21haW5Qcm9kdWN0SW5mbywgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsIGRlYnVnTW9kZSwgbWF0Y2hlZFRyZWF0bWVudHMsIGlkZW50aWZpZXIsIHBhZ2VUeXBlfSA9IGJvZHk7XG4gICAgdGhpcy5lbmdhZ2VtZW50TG9jayA9IHt9O1xuICAgIHRoaXMucGFnZVR5cGUgPSBwYWdlVHlwZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZTtcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICAgIHRoaXMucmVBcHBseVRyZWF0bWVudHNNYXAgPSB7fTtcbiAgICB0aGlzLm1haW5Qcm9kdWN0SW5mbyA9IG1haW5Qcm9kdWN0SW5mbztcbiAgICB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5kZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdHMoKSB7XG4gICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdGhpcy5tYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGVuZ2FnaW5nIHJvYm90ICR7dHJlYXRtZW50LmlkfTogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKTtcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgYWN0aW9ucyxcbiAgICAgIGVsaWdpYmlsaXR5UnVsZVNldCxcbiAgICAgIGRldmljZSxcbiAgICAgIGRlcGVuZGFudF9vbl90cmVhdG1lbnQsXG4gICAgICByZWFwcGx5X2V2ZW50LFxuICAgICAgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUsXG4gICAgICBidXNpbmVzc1J1bGVTZXQsXG4gICAgICB3ZWlnaHQsXG4gICAgICBkZWxheSxcbiAgICAgIHByb2R1Y3RJbmZvU3RvcmFnZSxcbiAgICB9ID0gdHJlYXRtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGRlYnVnTW9kZSxcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZW5nYWdlbWVudExvY2ssXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNNb2JpbGUsXG4gICAgICByZUFwcGx5VHJlYXRtZW50c01hcCxcbiAgICAgIG1haW5Qcm9kdWN0SW5mbyxcbiAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgICAgcGFnZVR5cGUsXG4gICAgICBwcmVwYXJlQW5kQXBwbHksXG4gICAgfSA9IHRoaXM7XG5cbiAgICAvLyBvbmUgZW5nYWdlbWVudCBhdCBhIHRpbWVcbiAgICBpZiAoZW5nYWdlbWVudExvY2tbaWRdKSB7XG4gICAgICBsb2dnZXIubG9nKGBUcmVhdG1lbnQgJHtpZH0gZW5nYWdlbWVudCBpbiBwcm9ncmVzcywgc2tpcHBpbmdgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gdHJ1ZTtcblxuICAgIGlmIChkZWJ1Z01vZGUgIT09IDEgJiYgIXdlaWdodCAmJiAhZGVwZW5kYW50X29uX3RyZWF0bWVudCkge1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZWJ1Z01vZGUgJiYgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgJiYgIWRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZXZpY2UgPT09IFwibW9iaWxlXCIgJiYgIWlzTW9iaWxlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnbW9iaWxlJyBtaXNtYXRjaFwiKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGV2aWNlID09PSBcImRlc2t0b3BcIiAmJiBpc01vYmlsZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ2Rlc2t0b3AnIG1pc21hdGNoXCIpO1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyZWFwcGx5X2V2ZW50KSB7XG4gICAgICBpZiAoIXJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIHx8IHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlID09PSBwYWdlVHlwZSkge1xuICAgICAgICBsZXQgcmVhcHBseV9ldmVudF9hcnJheSA9IHJlYXBwbHlfZXZlbnQ7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWFwcGx5X2V2ZW50KSkgcmVhcHBseV9ldmVudF9hcnJheSA9IFtyZWFwcGx5X2V2ZW50XTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgUmVhcHBseSBldmVudCAnJHtyZWFwcGx5X2V2ZW50fScgZm91bmQgZm9yIHRyZWF0bWVudDogJHtpZH1gKTtcbiAgICAgICAgZm9yIChjb25zdCByZWFwcGx5RXZlbnQgb2YgcmVhcHBseV9ldmVudF9hcnJheSkge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID9cbiAgICAgICAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gOiBbXTtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgYWxyZWFkeSBhZGRlZCBmb3IgcmVhcHBseSBldmVudFwiKTtcbiAgICAgICAgICB9IGVsc2UgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA9IFsuLi5wcmV2aW91c1ZhbHVlLCBpZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcHJvZHVjdEluZm8gPSBtYWluUHJvZHVjdEluZm87XG4gICAgaWYgKHBhZ2VUeXBlICE9PSBcImJhc2tldFwiICYmIHByb2R1Y3RJbmZvU3RvcmFnZSA9PT0gXCJiYXNrZXRcIikge1xuICAgICAgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0QmFza2V0TG9va3VwXCIsIHRydWUsIDUwLCA1MDApO1xuICAgIH1cbiAgICBpZiAoKCFwcm9kdWN0SW5mbyB8fCAhT2JqZWN0LmtleXMocHJvZHVjdEluZm8pLmxlbmd0aCkgJiZcbiAgICBbXCJQcm9kdWN0cGFnZVwiLCBcImJhc2tldFwiLCBcIkxpc3RpbmdwYWdlXCJdLmluY2x1ZGVzKHBhZ2VUeXBlKSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJldHJ5IGdldCBwcm9kdWN0IGluZm8gZnJvbSBpbmZvTGF5ZXJcIik7XG4gICAgICBpZiAocGFnZVR5cGUgIT09IFwiYmFza2V0XCIgJiYgcHJvZHVjdEluZm9TdG9yYWdlID09PSBcImJhc2tldFwiKSB7XG4gICAgICAgIHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uTGFzdEJhc2tldExvb2t1cFwiLCB0cnVlLCA1MCwgNTAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZUxvb2t1cFwiLCB0cnVlLCA1MCwgNTAwKTtcbiAgICAgICAgdGhpcy5tYWluUHJvZHVjdEluZm8gPSBwcm9kdWN0SW5mbztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBiaW5kaW5ncyA9IHtwcm9kdWN0SW5mb307XG4gICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIGJhc2UgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVTZXQgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsZXQgdHJlYXRtZW50U2tpcFJhdGlvID0gd2VpZ2h0ID09PSAxMDAgPyAwIDogKDEwMCAtIHdlaWdodCB8fCBUUkVBVE1FTlRfUkFUSU8pO1xuICAgICAgaWYgKGRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHtcbiAgICAgICAgLy8gSWYgZGVwZW5kYW50IG9uIHRyZWF0bWVudCBpcyBmb3VuZCBhbmQgaGFzIHdlaWdodDsgdXNlIGl0cyBza2lwIHJhdGlvXG4gICAgICAgIGNvbnN0IGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0ID0gbWF0Y2hlZFRyZWF0bWVudHMuZmluZCgodCkgPT4gdC5pZCA9PT0gZGVwZW5kYW50X29uX3RyZWF0bWVudCk/LndlaWdodDtcbiAgICAgICAgdHJlYXRtZW50U2tpcFJhdGlvID0gZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQgfHxcbiAgICAgICAgICBUUkVBVE1FTlRfUkFUSU8pO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBza2lwIHJhdGlvOiBcIiArIHRyZWF0bWVudFNraXBSYXRpbyk7XG4gICAgICAvLyBEZXRlcm1pbmluZyBpZGVudGlmaWVyIGZvciBjYWxjdWxhdGluZyB0cmVhdG1lbnQgcGVyY2VudGFnZSAodHJlYXRtZW50UGN0KVxuICAgICAgY29uc3QgZGV0ZXJtaW5pbmdJZGVudGlmaWVyID0gZGVwZW5kYW50X29uX3RyZWF0bWVudCB8fCBpZDtcblxuICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIHRoZSBwZXJjZW50YWdlIHZhbHVlIGZvciB0aGUgdHJlYXRtZW50IHVzZWQgdG8gZGV0ZXJtaW5lIGlmIGl0IHNob3VsZCBiZSBza2lwcGVkIG9yIG5vdFxuICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIDEwMCB3aGVuIGRlYnVnIG1vZGUgaXMgMSwgZW5zdXJpbmcgbm8gdHJlYXRtZW50cyBhcmUgc2tpcHBlZFxuICAgICAgY29uc3QgdHJlYXRtZW50UGN0ID0gZGVidWdNb2RlID09PSAxID8gMTAwIDogYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyBkZXRlcm1pbmluZ0lkZW50aWZpZXIpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudFBjdDogXCIgKyB0cmVhdG1lbnRQY3QgKyBgIHdpdGggZGVidWcgbW9kZSAke2RlYnVnTW9kZSA/IFwib25cIiA6IFwib2ZmXCJ9YCk7XG4gICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgaWYgKGJ1c2luZXNzUnVsZVNldCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgc3ViIHZhcmlhbnQgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGJ1c2luZXNzIHJ1bGUgdHJhbnNmb3JtYXRpb24gd2l0aCBpZDogXCIsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmVhdG1lbnRQY3QgPCB0cmVhdG1lbnRTa2lwUmF0aW8pIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVHJlYXRtZW50ICR7aWR9IHNraXBwZWQgZHVlIHRvIHRyZWF0bWVudCBzcGxpdCByYXRpb2ApO1xuICAgICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCBudWxsLCBcInNraXBwZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGJpbmRpbmdzKTtcbiAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBiaW5kaW5ncyk7XG4gICAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6IFwiLCBpZCk7XG4gICAgICBlbmdhZ2VtZW50TG9ja1t0cmVhdG1lbnQuaWRdID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgYmluZGluZ3MpIHtcbiAgICBjb25zdCBbcHJlcGFyZWQsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwcGx5QWN0aW9ucyhwcmVwYXJlZCwgYmluZGluZ3MpO1xuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYXRlUmVhcHBseVJvYm90TWFwKCkge1xuICAgIGNvbnN0IHtyZUFwcGx5VHJlYXRtZW50c01hcCwgbWF0Y2hlZFRyZWF0bWVudHN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZUFwcGx5VHJlYXRtZW50c01hcCkpIHtcbiAgICAgIGNvbnN0IHRyZWF0bWVudElkcyA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW2tleV07XG4gICAgICBjb25zdCByZUFwcGx5VHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigodCkgPT4gdHJlYXRtZW50SWRzLmluY2x1ZGVzKHQuaWQpKTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJpbmZpbml0ZV9zY3JvbGxcIjoge1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbmZpbml0ZV9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0aW1lb3V0XCI6IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSB0aW1lb3V0YCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50X2NoYW5nZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlTZWxlY3Rvckxpc3QgPSBBcnJheS5pc0FycmF5KHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yKSA/XG4gICAgICAgICAgICAgICAgdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IgOiBbdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3JdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiByZWFwcGx5U2VsZWN0b3JMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGVsZW1lbnRfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbl9zY3JvbGxcIjoge1xuICAgICAgICAgIC8vIGFkZCB3aW5kb3cgc2Nyb2xsIGxpc3RlbmVyLCBjYWxsIGVuZ2FnZVJvYm90IG9uIHNjcm9sbCwgZG8gbm90IHRyaWdnZXIgbW9yZSB0aGFuIG9uY2UgcGVyIDI1MG1zXG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IDA7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAobm93IC0gbGFzdFNjcm9sbFRpbWUgPiAyNTAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA+IDUpIHtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gb25fc2Nyb2xsYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJxdWVyeV9zZWFyY2hfY2hhbmdlXCI6IHtcbiAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggIT09IHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gcXVlcnlfc2VhcmNoX2NoYW5nZWApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVydmFsXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoYXBwbGllZD8uW3RyZWF0bWVudC5pZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGludGVydmFsYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb19sYXllcl9jaGFuZ2VcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICAgICAgICAgIGFkZERhdGFMaXN0ZW5lcih0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUmVhcHBseSBldmVudCBub3QgZm91bmQ6IFwiLCBrZXkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKSB7XG4gICAgbGV0IG9wcG9zaXRlRmxhZyA9IGZhbHNlO1xuICAgIGxldCBbZWxpZ2liaWxpdHlTY29wZSwgZWxpZ2liaWxpdHlOYW1lXSA9IGVsaWdpYmlsaXR5UnVsZS5zcGxpdChcIi5cIik7XG4gICAgaWYgKGVsaWdpYmlsaXR5U2NvcGUuc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIG9wcG9zaXRlRmxhZyA9IHRydWU7XG4gICAgICBlbGlnaWJpbGl0eVNjb3BlID0gZWxpZ2liaWxpdHlTY29wZS5zbGljZSgxKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgZVJ1bGVzLiR7ZWxpZ2liaWxpdHlTY29wZX1gKTtcbiAgICBpZiAoIXJlcyB8fCAhQXJyYXkuaXNBcnJheShyZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9wcG9zaXRlRmxhZyAmJiByZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb3Bwb3NpdGVGbGFnICYmICFyZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0LCBlbGlnaWJpbGl0eVNldFR5cGUgPSBudWxsLCBwcmV2aW91c0lzRWxpZ2libGUgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJvYm90IGVsaWdpYmlsaXR5XCIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFbGlnaWJpbGl0eSBSdWxlIFNldCAke2VsaWdpYmlsaXR5UnVsZVNldH0gaXMgbm90IGFuIGFycmF5YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc0VsaWdpYmxlID0gcHJldmlvdXNJc0VsaWdpYmxlO1xuICAgIGZvciAoY29uc3QgZWxpZ2liaWxpdHlSdWxlIG9mIGVsaWdpYmlsaXR5UnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaWYgKGlzRWxpZ2libGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2ggKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSAmJiBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIGVsaWdpYmlsaXR5U2V0VHlwZTogXCIsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlLnNldCwgZWxpZ2liaWxpdHlSdWxlLnR5cGUsIGlzRWxpZ2libGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNFbGlnaWJsZTtcbiAgfVxuXG4gIC8vIFJldHVybiBpbmRleCBvZiBidXNpbmVzc1J1bGUsIHRoaXMgaXMgdGhlIGJ1c2luZXNzUnVsZUlkXG4gIGFzeW5jIGNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgYnVzaW5lc3NSdWxlXSBvZiBidXNpbmVzc1J1bGVTZXQuZW50cmllcygpKSB7XG4gICAgICBpZiAoYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChbYnVzaW5lc3NSdWxlXSkpIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnkvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIGZldGNoQW5kUGVyc2lzdFByb2R1Y3RJbmZvLFxuICBmZXRjaEVsaWdpYmlsaXR5UnVsZXMsXG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzLFxuICBpbmplY3RTdHlsZVNoZWV0LFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFJvYm90RW5naW5lIGZyb20gXCIuL3JvYm90RW5naW5lXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlT25Db21wb25lbnRcIik7XG5cbmNvbnN0IGJlYWdsZU9uID0gYXN5bmMgKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUsIGNvbGxlY3RvckFwaSkgPT4ge1xuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSA9IGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBjb25zdCB0cmVhdG1lbnRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50cygpO1xuICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuICBjb25zdCBmZXRjaFByb2R1Y3RJbmZvUHJvbWlzZSA9IGZldGNoQW5kUGVyc2lzdFByb2R1Y3RJbmZvKGNvbGxlY3RvckFwaSk7XG5cbiAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcygpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9LCAyMDAwKTtcblxuICBjb25zdCBbdHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgdHJlYXRtZW50c1Byb21pc2UsIHRyZWF0bWVudFdlaWdodHNQcm9taXNlLFxuICBdKTtcblxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcblxuICBjb25zdCB0cmVhdG1lbnRSZXBvc2l0b3J5ID0gbmV3IFRyZWF0bWVudFJlcG9zaXRvcnkoe1xuICAgIHRyZWF0bWVudHMsXG4gICAgdHJlYXRtZW50V2VpZ2h0cyxcbiAgfSk7XG5cbiAgY29uc3QgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRSZXBvc2l0b3J5LmdldE1hdGNoZWRUcmVhdG1lbnRzKCk7XG4gIGlmICghbWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIk5vIHRyZWF0bWVudHMgbWF0Y2hlZCwgcmV0dXJuaW5nIHdpdGhvdXQgZnVydGhlciBhY3Rpb25cIik7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlLCBmZXRjaFByb2R1Y3RJbmZvUHJvbWlzZSxcbiAgXSk7XG5cbiAgY29uc3QgbWFpblByb2R1Y3RJbmZvID0ge307XG4gIGNvbnN0IHJvYm90RW5naW5lID0gbmV3IFJvYm90RW5naW5lKHtcbiAgICBtYWluUHJvZHVjdEluZm8sXG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgZGVidWdNb2RlLFxuICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgIGlkZW50aWZpZXIsXG4gICAgcGFnZVR5cGUsXG4gIH0pO1xuICBhd2FpdCByb2JvdEVuZ2luZS5lbmdhZ2VSb2JvdHMoKTtcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG5cbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJBcHBsaWVkIHRyZWF0bWVudHM6IFwiLCBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gIGxldCBlbGlnaWJpbGl0eVJ1bGVzID0gbnVsbDtcbiAgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHJldHVybjtcbiAgY29uc3QgcnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtlbGlnaWJpbGl0eVJ1bGVzfSk7XG4gIGF3YWl0IHJ1bGVFbmdpbmUuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG59XG5leHBvcnQgZGVmYXVsdCBiZWFnbGVPbjtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50OiAxMDAwLCAvLyBhZmZlY3RzIHZlcnNpb25cbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImRhdGFcIixcbiAgICBpbmRleGVzOiBbe1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZVwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcInNlc3Npb25faWRcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwiZGF0YV92YWx1ZVwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcImlkXCIsIGF1dG9JbmNyZW1lbnQ6IHRydWV9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7Z2V0QnJvd3NlclR5cGV9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXJcIik7XG5jb25zdCBfd2luZG93ID0ge1xuICBhbGx0aW1lOiBcImFsbHRpbWVcIiwgc2Vzc2lvbjogXCJzZXNzaW9uXCIsXG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy50b3AuaW5kZXhlZERCPy5vcGVuKGNvbmZpZy5kYk5hbWUsIGNvbmZpZy52ZXJzaW9uKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGluZGV4ZWQgREJcIiwgb3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4ZWREQiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKGRhdGFOYW1lLCBkYXRhVmFsdWUpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHNlc3Npb25JZCA9IHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpOyAvLyBkYXRlIGN1cnJlbnQgLTIgc2FhdCAgeWlsLWF5LWd1blxuICAgIGNvbnN0IHRpbWUgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XCJkYXRhX25hbWVcIjogZGF0YU5hbWUsIFwiZGF0YV92YWx1ZVwiOiBkYXRhVmFsdWUsIFwic2Vzc2lvbl9pZFwiOiBzZXNzaW9uSWQsIHRpbWV9O1xuICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgfVxuXG4gIG1pbm1heChkYXRhTmFtZSwgb3AsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgc3RvcmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdG9yZWQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtaW5cIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPCBzdG9yZWQpIHx8XG4gICAgICAgICAgICAgICAgKG9wID09PSBcIm1heFwiICYmIHZhbHVlW1wiZGF0YV92YWx1ZVwiXSA+IHN0b3JlZClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVkID0gdmFsdWVbXCJkYXRhX3ZhbHVlXCJdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3JlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtaW4oZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtaW5cIiwgd2luZG93KTtcbiAgfVxuXG4gIG1heChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWlubWF4KGRhdGFOYW1lLCBcIm1heFwiLCB3aW5kb3cpO1xuICB9XG5cbiAgZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoIW1hcC5oYXModmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSkgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIDApO1xuICAgICAgICAgICAgICBtYXAuc2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSwgbWFwLmdldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKG1hcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBtb2RlKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncm91cEJ5KGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGlmIChkYXRhLmtleXMoKS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWF4ID0ge25hbWU6IHVuZGVmaW5lZCwgdmFsdWU6IC0xfTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGlmIChtYXgudmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBtYXgubmFtZSA9IGtleTtcbiAgICAgICAgbWF4LnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heDtcbiAgfVxuXG4gIGNvdW50KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3VtKGRhdGFOYW1lLCB3aW5kb3cgPSBcImFsbHRpbWVcIikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSAwLjAwO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRvdGFsICs9IHBhcnNlRmxvYXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodG90YWwudG9GaXhlZCgyKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUsIGRhdGFWYWx1ZSA9IHVuZGVmaW5lZCkge1xuICAgIGlmIChkYXRhVmFsdWUpIHtcbiAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZV0pKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleFZhbHVlID0gZ2V0QnJvd3NlclR5cGUoKSA9PT0gXCJzYWZhcmlcIiA/IGRhdGFOYW1lIDogW2RhdGFOYW1lXTtcblxuICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpXG4gICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoaW5kZXhWYWx1ZSkpO1xuICB9XG5cbiAgYXN5bmMgYXZnKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCB0b3RhbCA9IGF3YWl0IHRoaXMuc3VtKGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5jb3VudChkYXRhTmFtZSwgd2luZG93KTtcblxuICAgIGlmICghdG90YWwgfHwgIWNvdW50KSByZXR1cm4gMDtcblxuICAgIHJldHVybiAodG90YWwgLyBjb3VudCkudG9GaXhlZCgyKTtcbiAgfVxuXG4gIGFzeW5jIGxhc3QoZGF0YU5hbWUsIHNpemUgPSAxLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVcIikub3BlbkN1cnNvcihbZGF0YU5hbWVdLCBcInByZXZcIik7XG4gICAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICAgIGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgICAub3BlbkN1cnNvcihbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpXSwgXCJwcmV2XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGN1cnNvci5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IHNpemUpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhc3luYyBmaW5kKGtleU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdldFJlcXVlc3QgPSBzdG9yZS5nZXQoa2V5TmFtZSk7XG4gICAgICAgICAgZ2V0UmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShnZXRSZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKGBjYW5ub3QgZmluZCAke2tleU5hbWV9IG9uIHRoZSBpbmRleGRiIHN0b3JlYCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50U2Vzc2lvbklkKCkge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0SG91cnMoZC5nZXRIb3VycygpIC0gMik7XG5cbiAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpICsgXCItXCIgK1xuICAgICAgKGQuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCItXCIgK1xuICAgICAgZC5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IE1vbml0b3IgZnJvbSBcIi4uL0JlYWdsZU1vbml0b3IvaW5kZXhcIjtcbmltcG9ydCBiZWFnbGVPbiBmcm9tIFwiLi4vQmVhZ2xlT25cIjtcbmltcG9ydCBDb2xsZWN0b3JBcGkgZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uL2FwaVwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFNQTElUX1JBVElPLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTixcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0SWRlbnRpZmllcixcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxuICBkZXRlcm1pbmVQY3QsXG4gIGdldERlYnVnTW9kZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmxldCBTSFVURE9XTiA9IGZhbHNlO1xuY29uc3QgRkxJUEZMQUcgPSBmYWxzZTtcblxuKGFzeW5jIGZ1bmN0aW9uKCkge1xuICBsZXQgbW9uaXRvciA9IG51bGw7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgaW5pdGlhbGl6aW5nXCIpO1xuICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcblxuICBsZXQgZWFybHlMb2dTZW50ID0gZmFsc2U7XG4gIGxldCBoaWRlUmVtb3ZlZCA9IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCBpbml0aWFsaXppbmdcIik7XG4gICAgbW9uaXRvciA9IG5ldyBNb25pdG9yKCk7XG4gICAgY29uc3QgY29sbGVjdG9yQXBpID0gbmV3IENvbGxlY3RvckFwaSgpO1xuICAgIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIoY29sbGVjdG9yQXBpKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGxldCBjb29raWVQY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiwgY29va2llUGN0KTtcbiAgICAvLyBhZGQgY3VycmVudCBlcG9jaCBpbnRlZ2VyIHRvIGJlYWdsZUluZm9MYXllclxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiLCBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSk7XG5cbiAgICAvLyBkYXRhLWxlc3MgbG9nIHRvIGRldGVjdCBib3VuY2VzXG4gICAgYXdhaXQgbW9uaXRvci5wYWNrQW5kUXVldWVBcnJpdmFsTG9nKCk7XG5cbiAgICBjb25zdCBvb3NSZWFzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSk7XG5cbiAgICAvLyBpZiBjYW5ub3QgZ2V0IGNyaXRpY2FsIGluZm8sIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCB1bnN1cHBvcnRlZFxuICAgIGlmIChcbiAgICAgIGNvb2tpZVBjdCA9PT0gbnVsbCB8fFxuICAgICAgIW5hdmlnYXRvci5zZW5kQmVhY29uIHx8XG4gICAgICB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5wYWRTdGFydCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJ1bnN1cHBvcnRlZFwiKVxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IGRldmljZVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkRldmljZSBkb2VzIG5vdCBoYXZlIHJlcXVpcmVkIGNhcGFiaWxpdGllc1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0xhYmVsU2VudCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCk7XG4gICAgY29uc3QgdGltZW91dENvdW50ZXIgPSBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQpKSB8fCAwO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWcgbW9kZSBpcyBvbiwgYWxzbyBhZGRzIGRibSB0byBiZWFnbGVJbmZvTGF5ZXIgYW5kIHNldHMgb29zUmVhc29uXG4gICAgY29uc3QgZGVidWdNb2RlID0gZ2V0RGVidWdNb2RlKFwiZW1wbG95ZWVcIik7XG5cbiAgICAvLyBpZiB0aW1lZC1vdXQgdG9vIG1hbnkgdGltZXMgZm9yIHZlcnkgZmlyc3QgaW50ZXJhY3RzaW9ucywgbWFrZSBvdXQgb2Ygc2NvcGUgZm9yIHRoZSBzZXNzaW9uXG4gICAgaWYgKCFkZWJ1Z01vZGUgJiYgIW9vc1JlYXNvbiAmJiAhaXNMYWJlbFNlbnQgJiYgdGltZW91dENvdW50ZXIgPiBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTlxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmVhZ2xlIHRpbWVvdXQgdGhyZXNob2xkIHJlYWNoZWRcIik7XG4gICAgfVxuXG4gICAgLy8gVml2ZW5zZSBzcGVjaWZpYzogQ2hlY2sgaWYgdXNlciBpcyBhZG1pbiwgbWFraW5nIHRoZW0gb3V0IG9mIHNjb3BlXG4gICAgLy8gVGhpcyBuZWVkcyB0byB3YWl0IGZvciBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIHRvIHNldCB0aGUgdnZzSXNTaG93cm9vbSB2YWx1ZVxuICAgIGNvbnN0IGlzU2hvd3Jvb20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKTtcbiAgICBpZiAoaXNTaG93cm9vbSAmJiAoaXNTaG93cm9vbSA9PT0gXCJ0cnVlXCIgfHwgaXNTaG93cm9vbSA9PT0gdHJ1ZSkpIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCBzaG93cm9vbVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgZnJvbSBWVlMgc2hvd3Jvb20vY2FsbGNlbnRlclwiKTtcbiAgICB9IGVsc2UgaWYgKGlzU2hvd3Jvb20gPT09IG51bGwgfHwgaXNTaG93cm9vbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZGV0ZXJtaW5lIGlmIHVzZXIgaXMgZnJvbSBWVlMgc2hvd3Jvb20vY2FsbGNlbnRlclwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm5leHREYXktaGlkZVwiKSkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5ULCB0aW1lb3V0Q291bnRlciArIDEpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmVhZ2xlIHNjcmlwdCB0aW1lZCBvdXRcIik7XG4gICAgfVxuXG4gICAgLy8gaXNPbiBjYW4gYmUgdHJ1ZSAoT04pLCBmYWxzZSAoT0ZGKVxuICAgIGxldCBpc09uID0gbnVsbDtcblxuICAgIC8vIEZMSVAgdGhlIGRpcmVjdGlvbiBvZiB0aGUgZmxhZ1xuICAgIGlmIChGTElQRkxBRykge1xuICAgICAgY29va2llUGN0ID0gOTkgLSBjb29raWVQY3Q7XG4gICAgfVxuXG4gICAgaWYgKGRlYnVnTW9kZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkRlYnVnIG1vZGUgb246IGFsbCBhcHBsaWNhYmxlIHRyZWF0bWVudHMgd2lsbCBiZSBhcHBsaWVkXCIpO1xuICAgICAgaXNPbiA9IHRydWU7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwiZW1wbG95ZWVcIikge1xuICAgICAgbG9nZ2VyLndhcm4oXCJVc2VyIGlzIG91dCBvZiBzY29wZVwiKTtcbiAgICAgIC8vIHNldCBpc09uIHRvIHRydWUvZmFsc2Ugd2hlbiBub3QgZGVidWdNb2RlIGJ1dCBvdXQgb2Ygc2NvcGUgaS5lLiBuZF9kZWJ1Zz0wIGZvciB0ZXN0YWJpbGl0eVxuICAgICAgaXNPbiA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTztcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHVua25vd25cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG91dCBvZiBzY29wZSByZWFzb25cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGdyZWF0ZXIgdGhhbiBTUExJVF9SQVRJTywgdGhlbiBpbiBPTiBtb2RlXG4gICAgICBpc09uID0gY29va2llUGN0ID49IFNQTElUX1JBVElPO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJpc09uXCIsIGlzT24pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19MQUJFTF9TRU5ULCB0cnVlKTtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBpc09uLnRvU3RyaW5nKCl9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBpc09uLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBjb29raWUgcGVyY2VudGFnZTogXCIsIGNvb2tpZVBjdCk7XG4gICAgbG9nZ2VyLmxvZyhcIlNwbGl0X3JhdGlvOiBcIiwgU1BMSVRfUkFUSU8pO1xuICAgIGxvZ2dlci5sb2coXCJjb29raWVQY3QgPCBTUExJVF9SQVRJT1wiLCBjb29raWVQY3QgPCBTUExJVF9SQVRJTyk7XG4gICAgbG9nZ2VyLmxvZyhcIlNldCBpc09uOiBcIiwgaXNPbik7XG5cbiAgICAvLyBhd2FpdCBjcml0aWNhbCBpbmZvIGJlZm9yZSBzZW5kaW5nIGxvZ3MgZm9yIHByb3BlciBhbmFseXRpY3MgbWVhc3VyZW1lbnRzXG4gICAgY29uc3QgcGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgaWYgKHBhZ2VUeXBlID09PSBcInB1cmNoYXNlXCIpIHtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBzZW5kIGxvZ3MgaW1tZWRpYXRlbHkgb24gcHVyY2hhc2UgcGFnZSwgYW5kIGZvcmNlIHdhaXRcbiAgICAgIGF3YWl0IG1vbml0b3Iuc2VuZExvZ3ModHJ1ZSk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgU0hVVERPV04gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZW5kIGxvZ3Mgd2hlbiByZWFkeSwgc3RhcnQgc2NyYXBpbmcgYW5kIHNlbmRpbmcgYXN5bmNseVxuICAgICAgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgfVxuICAgIGVhcmx5TG9nU2VudCA9IHRydWU7XG5cbiAgICBpZiAoaXNPbiA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKCFTSFVURE9XTikge1xuICAgICAgICBsb2dnZXIubG9nKFwiQmVhZ2xlIE9OIEdyb3VwIFBhdGhcIik7XG4gICAgICAgIGJlYWdsZU9uKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUsIGNvbGxlY3RvckFwaSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBPTiBHcm91cCBTSFVURE9XTiBQYXRoXCIpO1xuICAgICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgICAgaGlkZVJlbW92ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPbiA9PT0gZmFsc2UpIHtcbiAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9GRiBHcm91cCBQYXRoXCIpO1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlzT24gaXMgdW5kZWZpbmVkIG9yIG51bGxcIik7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcIkJlYWdsZSBFYXJseSBTY29wZS1vdXQgb3IgRVJST1I6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIGVyci5tZXNzYWdlKTtcbiAgICBpZiAoIWVhcmx5TG9nU2VudCAmJiBtb25pdG9yKSBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICBpZiAoIWhpZGVSZW1vdmVkKSByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgfVxufSkoKTtcbiJdLCJuYW1lcyI6WyJyZXBsYWNlQWxsIiwic3RyIiwiZmluZCIsInJlcGxhY2UiLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJ0dXJraXNoVG9Mb3dlciIsInN0cmluZyIsImxldHRlcnMiLCJsZXR0ZXIiLCJ0b0xvd2VyQ2FzZSIsImlzU3RhZ2luZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluY2x1ZGVzIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIlRSRUFUTUVOVF9SQVRJTyIsIlRSRUFUTUVOVFNfRFVSQVRJT04iLCJNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJUUkVBVE1FTlRTIiwiUE9QVVBfRElTUExBWV9GTEFHIiwiU0tVX0lORk9fQkFTS0VUIiwiVElNRU9VVF9DT1VOVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJMT0NBTF9TVE9SQUdFX0tFWVMiLCJERUJVR19NT0RFIiwiT1VUX09GX1NDT1BFIiwiSVNfTEFCRUxfU0VOVCIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwiREVCVUciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXJncyIsImNvbnNvbGUiLCJpbmZvIiwibG9nIiwibWVzc2FnZUNvbmZpZyIsImZvckVhY2giLCJhcmd1bWVudCIsInR5cGUiLCJ3YXJuIiwiZXJyb3IiLCJsb2dnZXIiLCJjb2xsZWN0b3JBcGkiLCJzZXRDb2xsZWN0b3JBcGkiLCJjQSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWUiLCJxdWVyeU1ldGhvZCIsImZhaWxlZCIsIm1pbiIsInF1ZXJ5UHJvbWlzZSIsIm1heCIsImF2ZyIsImdyb3VwQnkiLCJzaXplIiwiZGF0YSIsImNvdW50IiwidmFsdWUiLCJtb2RlIiwibmFtZSIsIm1hdGNoIiwicGFyc2VJbnQiLCJsYXN0IiwiZGF0YVZhbHVlcyIsIm1hcCIsIm9iaiIsImRhdGFfdmFsdWUiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJzYXZlIiwiZm9ybWF0RGVsaXZlcnlEYXRlIiwiYmVhZ2xlSW5mb0xheWVyIiwiYSIsImUiLCJmIiwiX19od20iLCJpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSIsImluZm9MYXllciIsInRvcCIsImFkZFRvQmVhZ2xlSW5mb0xheWVyIiwia2V5IiwidW5kZWZpbmVkIiwidHlwZWRWYWx1ZSIsInRvU3RyaW5nIiwidHJpbSIsImtleXMiLCJzcGxpdCIsImxhc3RLZXkiLCJwb3AiLCJ1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yIiwicGFzc1ZhbHVlVG9MaXN0ZW5lcnMiLCJEQVRBX0xJU1RFTkVSUyIsImFkZERhdGFMaXN0ZW5lciIsImxpc3RlbmVyIiwicHVzaCIsImxpc3RlbmVycyIsIkFycmF5IiwiaXNBcnJheSIsImdldEZyb21CZWFnbGVJbmZvTGF5ZXIiLCJibG9ja2luZyIsInBvbGxJbnRlcnZhbCIsInRpbWVvdXQiLCJnZXRBbnlGcm9tQmVhZ2xlSW5mb0xheWVyIiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwic2V0VGltZW91dCIsInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkVHJlYXRtZW50IiwiaWQiLCJidXNpbmVzc1J1bGVJZCIsInZhcmlhbnQiLCJzdGF0dXMiLCJkZXBlbmRhbnRfb25fdHJlYXRtZW50IiwiUEFSU0VTRUFSQ0hNQVhSRVRSWSIsIlBBUlNFU0VBUkNIU1RBUlRERUxBWSIsInBhcnNlU2VhcmNoUGF0aHNEZWxheSIsInBhcnNlU2VhcmNoUGF0aHNSZXRyeSIsImluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIiLCJwcmVwYXJlQ29yZURhdGEiLCJwYXJzZXJDYWxsZXIiLCJhZGRNZXRyaWNzIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIk9iamVjdCIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwic2VhcmNoUGF0aHMiLCJQYWdlVHlwZURlcGVuZCIsIm1ldGhvZCIsInNlbGVjdG9yIiwiZm9ybWF0dGVyIiwiZXhjbHVzaXZlIiwib3BlcmFuZCIsIm9ic2VydmVyIiwiY2hpbGRyZW4iLCJwcm9jZXNzRm9ybWF0dGVyIiwidG9VcHBlckNhc2UiLCJzZWFyY2hPYmoiLCJzZWFyY2hFbGVtZW50IiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwicXVlcnlTZWxlY3RvciIsImlzRm91bmQiLCJ0b0JlVXBkYXRlZCIsImNoaWxkIiwiY2hpbGRFbGVtZW50cyIsImZpbHRlciIsImVsZW1lbnQiLCJNdXRhdGlvbk9ic2VydmVyIiwidHJpZ2dlclJlc3RhcnQiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImlubmVyVGV4dCIsImF0dHJpYlZhbHVlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZWNoaWxkIiwiYXR0cmliVmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRWYWx1ZSIsInN1bVByaWNlIiwiY2hpbGRUZXh0IiwiYXJyYXlJbm5lclRleHQiLCJleGNsdXNpdmVFbGVtZW50IiwiY3VzdG9tRGF0YURlcml2YXRpb25zIiwiY3VycmVudFBhZ2VUeXBlIiwiYWxsIiwiaXNDYXJ0RW1wdHkiLCJ0b3RhbEJhc2VQcmljZSIsImNvdXBvbk5vdEFwcGxpY2FibGUiLCJwcmljZXMiLCJxdWFudGl0aWVzIiwidG90YWxQcmljZSIsImkiLCJjb3Vwb25BcHBsaWNhYmxlQW1vdW50IiwibmV3U0tVTGlzdCIsInNrdSIsInNrdUxpc3QiLCJwcmV2U0tVTGlzdCIsImRpZmZTS1VMaXN0IiwieCIsInByb2R1Y3RJbmZvTG9va3VwIiwiZGlmZlByb2R1Y3RJbmZvIiwib2xkUHJvZHVjdEluZm8iLCJuZXdQcm9kdWN0SW5mbyIsInVwZGF0ZWRTS1VzIiwiY29uY2F0IiwicGFyc2VTZWFyY2hQYXRocyIsImRvbVN0YXR1cyIsImRvY3VtZW50IiwicmVhZHlTdGF0ZSIsIndpbnRvcCIsImRhdGFMYXllciIsIndpbmRvYyIsImZvdW5kTmFtZXMiLCJTZXQiLCJwcmV2Rm91bmROYW1lcyIsIm5vdEZvdW5kTmFtZXMiLCJhZGQiLCJpc0lnbm9yZSIsImhhcyIsInNlYXJjaEFuZFNldCIsImRhdGFMYXllckl0ZW0iLCJzb3JnQXJyYXlJbm5lciIsImdldFNPUkdBcnJheSIsInNvcmdJdGVtIiwiZnJvbSIsImpvaW4iLCJwYXRoIiwicGF0aEFycmF5IiwiY3VycmVudCIsInN1YlBhdGgiLCJzbGljZSIsInN1YkFycmF5Iiwic3ViS2V5Iiwic3ViVmFsdWUiLCJ3aW5kb3dQdHIiLCJuYXZQdHIiLCJuYXZpZ2F0b3IiLCJwbGF0Zm9ybSIsInVzZXJBZ2VudERhdGEiLCJ1c2VyQWdlbnQiLCJkZXZpY2VQaXhlbFJhdGlvIiwiYXZhaWxXaW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJ3aW5kb3dEZXB0aCIsImNvbG9yRGVwdGgiLCJwaXhlbERlcHRoIiwidnBvcnRTaGFwZSIsInZpc3VhbFZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJpT1MiLCJ0ZXN0IiwiTWF0aCIsInJvdW5kIiwib3JpZW50YXRpb25BbmdsZSIsIm9yaWVudGF0aW9uIiwiYW5nbGUiLCJhYnMiLCJ0ZW1wIiwiaGlzdG9yeSIsIm5hdkFnZW50IiwiYnJhbmRzIiwiYnJhbmQiLCJ2ZXJzaW9uIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsInZlbmRvciIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwicGF0aG5hbWUiLCJwYWdlVHlwZSIsInBlcmZNZXRyaWNzIiwicGVyZk5hdmlnYXRpb25NZXRyaWNzIiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlUeXBlIiwiY29ubmVjdCIsImNvbm5lY3RFbmQiLCJjb25uZWN0U3RhcnQiLCJyZXF1ZXN0IiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJkb20iLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwibG9hZCIsImxvYWRFdmVudEVuZCIsImxvYWRFdmVudFN0YXJ0IiwiZHVyYXRpb24iLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwidGV4dENvbnRlbnQiLCJqc29uY29udGVudCIsInBhcnNlIiwiZXJyIiwicHJvZHVjdEluZm9Mb29rdXBJblByb2dyZXNzIiwic2t1bGlzdCIsImhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwicHJvZHVjdEluZm8iLCJmZXRjaCIsImJvZHkiLCJvayIsImpzb24iLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJmZXRjaFRyZWF0bWVudHMiLCJ0cmVhdG1lbnRzIiwianNvblRyZWF0bWVudCIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsIm1lc3NhZ2UiLCJmZXRjaEFuZFBlcnNpc3RQcm9kdWN0SW5mbyIsImV4aXN0aW5nUHJvZEluZm8iLCJ0ZXh0IiwicHJvZHVjdEluZm9DU1YiLCJjc3ZUb0FycmF5IiwiZXh0cmFjdENvb2tpZUlkZW50aWZpZXIiLCJjb29raWVTdHJpbmciLCJjb29raWVOYW1lIiwicGFyc2VkIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsImlkZW50aWZpZXIiLCJpZGVudGlmaWVySW5kZXgiLCJkZXRlcm1pbmVQY3QiLCJoYXNoIiwiZ2V0VW5zZWN1cmVIYXNoIiwicGN0IiwiZXhpdFNjcm9sbExpc3RlbmVyIiwiY2FsbEJhY2siLCJsb29wIiwic2Nyb2xsVG9wIiwibGFzdFNjcm9sbFRvcCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInN0eWxlQXBwbGljYXRvciIsImVsZW1lbnRzIiwic3R5bGVDaGFuZ2VzTWFwIiwiZW50cmllcyIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYWN0aW9ucyIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uVGltZXN0YW1wIiwic2Vzc2lvbkhpc3RvcnkiLCJub3ciLCJjb25kaXRpb25DaGVja2VyIiwicnVuVGltZVZhbHVlIiwiY29uZGl0aW9uIiwic3VjY2VzcyIsInJlZ2V4IiwiUmVnRXhwIiwiZ2V0RGVidWdNb2RlIiwib29zUmVhc29uIiwicXVlcnlTdHJpbmciLCJzZWFyY2giLCJyZW1vdmVJdGVtIiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsImdldFJhbmRvbUludCIsImZsb29yIiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImRlbGF5IiwibXMiLCJyZXMiLCJkYXRlIiwicmVzdWx0Iiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwidG9kYXkiLCJzdGFydFllYXIiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZW5kWWVhciIsImVzdGltYXRlZFN0YXJ0IiwiZXN0aW1hdGVkRW5kIiwic3RhcnREaWZmT3ZlckRheXMiLCJjZWlsIiwiZW5kRGlmZk92ZXJEYXlzIiwic3RhcnREaWZmT3ZlcldlZWtzIiwiZW5kRGlmZk92ZXJXZWVrcyIsImlkbGVUaW1lciIsInRpbWVPdXQiLCJyZXNldFRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiaWRsZVRpbWVvdXQiLCJvbnRvdWNoc3RhcnQiLCJnZXRCcm93c2VyVHlwZSIsInN0ckRhdGEiLCJzdHJEZWxpbWl0ZXIiLCJvYmpQYXR0ZXJuIiwiYXJyRGF0YSIsImFyck1hdGNoZXMiLCJleGVjIiwic3RyTWF0Y2hlZERlbGltaXRlciIsInN0ck1hdGNoZWRWYWx1ZSIsIkhFQURFUlMiLCJNb25pdG9yIiwiYUhhc2giLCJlSGFzaCIsImZIYXNoIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsImltbWVkaWF0ZSIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwidXJsIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJsYyIsInUiLCJvbkhhc2hQY3QiLCJCbG9iIiwic3RhcnRzV2l0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbG9zZUV2ZW50IiwiY2FwdHVyZSIsInNlbmRCZWFjb24iLCJxdWV1ZWQiLCJxdWV1ZUludGVydmFsIiwiY2hlY2tEYXRhTGF5ZXJSdWxlIiwicnVsZSIsIm9wZXJhdG9yIiwiZGF0YUxheWVyRmluZGVyIiwicnVudGltZVZhbHVlIiwiY2hlY2tFbGVtZW50UnVsZSIsInNlbGVjdG9yQWxsIiwic2VsZWN0b3JGYWxsYmFjayIsIm1haW5TZWxlY3RvciIsInRlbXBWYWwiLCJyZXR1cm5WYWwiLCJlbGVtIiwiZWxlbWVudFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJzdHlsZUtleSIsInN0eWxlVmFsdWUiLCJjaGVja0Z1bmN0aW9uUnVsZSIsIm9wdHMiLCJiaW5kaW5ncyIsImNvbnRleHQiLCJydWxlRnVuY3Rpb24iLCJGdW5jdGlvbiIsImJpbmQiLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiaXNNb2JpbGUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImNoZWNrUHJvZHVjdEluZm9SdWxlIiwiZ2V0VHJhbnNhY3Rpb25Db3VudCIsImdldEFkZFRvQ2FydENvdW50IiwiZ2V0UHJldmlld0NvdW50IiwiY2F0YWxvZyIsInRyYW5zYWN0aW9uSW4yV2Vla3MiLCJhZGRUb0NhcnRJbjJXZWVrcyIsInByb2R1Y3RWaWV3Q291bnQiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJjaGVja1J1bGUiLCJydWxlU2F0aXNmaWVkIiwiY2hhaW4iLCJjaGFpbl9jb25kaXRpb24iLCJydWxlcyIsInNhdGlzZmllZFJ1bGVJZHMiLCJjb21wdXRlU2VnbWVudCIsInNlZ21lbnQiLCJydWxlU2V0Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJidXNpbmVzc1J1bGVTZXQiLCJjaGVja1J1bGVzIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsInVzZXJHcm91cCIsInVzZXJHcm91cFdlaWdodHMiLCJ0cmVhdG1lbnQiLCJzb21lIiwidHJlYXRtZW50c09iaiIsInRpbWVzdGFtcCIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkRGF5cyIsInJlcGxhY2VyIiwicmVwbGFjZUZuIiwidmFsIiwiY3VycmVudFJlcGxhY2VGbiIsInJlcGxhY2VPYmplY3RFeHRyYWN0b3IiLCJyZXBsYWNlVmFsIiwicmVwbGFjZUZuRXhlY3V0b3IiLCJyRm4iLCJzaW5nbGUiLCJyZXBsYWNlRnVuY3Rpb24iLCJzdG9yYWdlIiwia2V5RmFsbGJhY2siLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImF0dHJpYnV0ZSIsImlubmVyX2NvbmRpdGlvbiIsImVsaWdpYmxlRWxlbWVudHMiLCJjb25kaXRpb25FbGVtZW50cyIsImVsZW1lbnRTa3UiLCIkIiwiYXBwbHlBY3Rpb25zIiwidHJhbnNmb3JtZXIiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwibWRDb25kaXRpb24iLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJwVHlwZSIsIm1jIiwiU3RyaW5nIiwiYmVmb3JlIiwiYWZ0ZXIiLCJvZmYiLCJjcmVhdGVQb3B1cCIsImVsbSIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3BsYXlNb2RhbCIsImdldFByb2R1Y3RJbmZvIiwiZXZlbnQiLCJkaXNwbGF5UG9wdXAiLCJyIiwiZCIsInB1c2hTdGF0ZSIsInN0YXRlIiwib25jZSIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsImNzcyIsInByb3BlcnR5IiwicHJvcGVydHlWYWx1ZSIsImF0dHIiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJwcmVwZW5kIiwic2VudGVuY2UiLCJ3b3JkIiwiY2hhckF0IiwidG9Mb2NhbGVVcHBlckNhc2UiLCJyZXBsYWNlV2l0aFZhbCIsImh0bWxTdHIiLCJ0aXRsZXMiLCJwYXJzZWRUaXRsZXMiLCJwYXJzZWRUaXRsZSIsImhpZGRlbiIsImhhbmRsZVBvcHVwQ2xpY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlTW9kYWxDbGljayIsImNvbnRhaW5zIiwiaGlkZSIsInFQb3B1cCIsImdldEVsZW1lbnRCeUlkIiwiaXNNb2RhbCIsInBvcHVwV3JhcHBlciIsInBvcHVwQ2xvc2VCdXR0b24iLCJwb3B1cENsb3NlQnV0dG9uU3R5bGUiLCJvbmNsaWNrIiwiY29udGVudHMiLCJzaGlmdCIsInNyYyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwicG9wdXAiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsInAxIiwicGFyZW50Tm9kZSIsInAyIiwiaTEiLCJpMiIsImlzRXF1YWxOb2RlIiwiaW5zZXJ0QmVmb3JlIiwid2FpdEZvckpRdWVyeSIsImpRdWVyeSIsImpRdWVyeUludGVydmFsIiwiYWN0aW9uQXBwbGljYXRvciIsIk9CU0VSVkVSX0NPTkZJRyIsImF0dHJpYnV0ZXMiLCJSb2JvdEVuZ2luZSIsIm1haW5Qcm9kdWN0SW5mbyIsImRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzIiwiZGVidWdNb2RlIiwibWF0Y2hlZFRyZWF0bWVudHMiLCJlbmdhZ2VtZW50TG9jayIsInJlQXBwbHlUcmVhdG1lbnRzTWFwIiwiZW5nYWdlUm9ib3QiLCJpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCIsImVsaWdpYmlsaXR5UnVsZVNldCIsImRldmljZSIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInByb2R1Y3RJbmZvU3RvcmFnZSIsInByZXBhcmVBbmRBcHBseSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCIsInQiLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJwcmVwYXJlZCIsInRyZWF0bWVudElkcyIsInJlQXBwbHlUcmVhdG1lbnRzIiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJhcHBsaWVkIiwiYm91bmRFbmdhZ2VUcmVhdG1lbnQiLCJlbGlnaWJpbGl0eVJ1bGUiLCJvcHBvc2l0ZUZsYWciLCJlbGlnaWJpbGl0eVNjb3BlIiwiZWxpZ2liaWxpdHlOYW1lIiwiZWxpZ2liaWxpdHlTZXRUeXBlIiwicHJldmlvdXNJc0VsaWdpYmxlIiwiaXNFbGlnaWJsZSIsImNoZWNrRWxpZ2liaWxpdHkiLCJzZXQiLCJidXNpbmVzc1J1bGUiLCJiZWFnbGVPbiIsImVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwidHJlYXRtZW50V2VpZ2h0c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRXZWlnaHRzIiwiZmV0Y2hQcm9kdWN0SW5mb1Byb21pc2UiLCJzZWFyY2hQYXJhbXMiLCJsYXN0SW5kZXhPZiIsIml0ZW0iLCJ0cmVhdG1lbnRSZXBvc2l0b3J5IiwiZ2V0TWF0Y2hlZFRyZWF0bWVudHMiLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsInJ1bGVFbmdpbmUiLCJjb25maWciLCJkYk5hbWUiLCJtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50Iiwic3RvcmUiLCJpbmRleGVzIiwiZmllbGRzIiwib3B0aW9ucyIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiX3dpbmRvdyIsImFsbHRpbWUiLCJzZXNzaW9uIiwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIiwiaW5kZXhlZERCIiwiaW5pdCIsIm9wZW5SZXF1ZXN0Iiwib3BlbiIsIkVycm9yIiwib251cGdyYWRlbmVlZGVkIiwib2xkVmVyc2lvbiIsImRlbGV0ZU9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJpZHgiLCJjcmVhdGVJbmRleCIsIm9uZXJyb3IiLCJvbnN1Y2Nlc3MiLCJyZWplY3QiLCJyZWFkd3JpdGUiLCJnZXRDb25uZWN0aW9uIiwidHgiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiZGF0YU5hbWUiLCJkYXRhVmFsdWUiLCJpbml0VHJhbnNhY3Rpb24iLCJzZXNzaW9uSWQiLCJnZXRDdXJyZW50U2Vzc2lvbklkIiwidGltZSIsInBheWxvYWQiLCJwdXQiLCJvcCIsInRoZW4iLCJzdG9yZWQiLCJnZXRDdXJzb3IiLCJjdXJzb3IiLCJjb250aW51ZSIsIm1pbm1heCIsIk1hcCIsInRvdGFsIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJvcGVuQ3Vyc29yIiwiSURCS2V5UmFuZ2UiLCJvbmx5IiwiaW5kZXhWYWx1ZSIsInN1bSIsInZhbHVlcyIsImtleU5hbWUiLCJnZXRSZXF1ZXN0Iiwic2V0SG91cnMiLCJnZXRIb3VycyIsInBhZFN0YXJ0IiwiZ2V0RGF0ZSIsIkNvbGxlY3RvckFwaSIsIlNIVVRET1dOIiwiRkxJUEZMQUciLCJtb25pdG9yIiwiZWFybHlMb2dTZW50IiwiaGlkZVJlbW92ZWQiLCJjb29raWVQY3QiLCJwYWNrQW5kUXVldWVBcnJpdmFsTG9nIiwicHJvdG90eXBlIiwiR0xPVl9PTiIsImlzTGFiZWxTZW50IiwidGltZW91dENvdW50ZXIiLCJpc1Nob3dyb29tIiwiaXNPbiIsInNlbmRMb2dzIl0sInNvdXJjZVJvb3QiOiIifQ==
