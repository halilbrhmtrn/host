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
                      _this8.getCursor(store, keyName).onsuccess = function (event) {
                        var cursor = event.target.result;
                        console.log(cursor);
                        resolve(cursor);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUErQzs7Ozs7Ozs7QUNBL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsTUFBTTtBQUNOLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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LENBQUM2YixZQUFELElBQWlCRCxPQUFyQixFQUE4QkEsT0FBTyxDQUFDVyxRQUFSLENBQWlCLEtBQWpCO0FBQzlCLGNBQUksQ0FBQ1QsV0FBTCxFQUFrQjNjLGtCQUFrQjs7QUFsSnZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQsSyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvc3RyaW5nVXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlRGF0YUNvbGxlY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2RhdGFMYXllckNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VsZW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9mdW5jdGlvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Nlc3Npb25DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS91cmxDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbnZDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9wcm9kdWN0SW5mb0NoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL3JlcGxhY2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlT24vcm9ib3RFbmdpbmUuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVPbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZURhdGFDb2xsZWN0aW9uL3N0b3JlLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZURhdGFDb2xsZWN0aW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUNsaWVudFNESy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGNvbnN0IHJlcGxhY2VBbGwgPSAoc3RyLCBmaW5kLCByZXBsYWNlID0gXCJcIikgPT4ge1xuICBpZiAoIXN0cikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIHN0cjtcblxuICB3aGlsZSAoc3RyLmluZGV4T2YoZmluZCkgPj0gMCkge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gICAgc3RyID0gKGluZGV4ID4gMCA/IHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpIDogXCJcIikgKyByZXBsYWNlICsgc3RyLnN1YnN0cmluZyhpbmRleCArIGZpbmQubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5leHBvcnQgY29uc3QgdHVya2lzaFRvTG93ZXIgPSAoc3RyKSA9PiB7XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XG4gIGxldCBzdHJpbmcgPSBzdHI7XG4gIGNvbnN0IGxldHRlcnMgPSB7XCLEsFwiOiBcImlcIiwgXCJJXCI6IFwixLFcIiwgXCLFnlwiOiBcIsWfXCIsIFwixJ5cIjogXCLEn1wiLCBcIsOcXCI6IFwiw7xcIiwgXCLDllwiOiBcIsO2XCIsIFwiw4dcIjogXCLDp1wifTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygoW8SwScWexJ7DnMOHw5ZdKSkvZywgZnVuY3Rpb24obGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlcnNbbGV0dGVyXTtcbiAgfSk7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuL3N0cmluZ1V0aWxzXCI7XG5jb25zdCBpc1N0YWdpbmcgPSB0cnVlIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwic3RhZ2luZy52aXZlbnNlXCIpO1xuXG5leHBvcnQgY29uc3QgQ09PS0lFX05BTUUgPSBcIl9nYVwiO1xuLy8gVE9ETyByZXZlcnQgdGhlIGZvbGxvd2luZyBzdGFnaW5nIGVudiBjaGVjayBhZnRlciBtb3ZpbmcgdG8gbmV3IGJyYW5jaCBzdHJ1Y3R1cmVcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50cy5qc29uXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTVFlMRVNIRUVUX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlc19zdGFnaW5nLmNzc1wiIDogYGh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzLmNzcz9pZD0ke3JlcGxhY2VBbGwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMykucmVwbGFjZShcIlRcIiwgXCJcIiksIFwiLVwiLCBcIlwiKX1gO1xuZXhwb3J0IGNvbnN0IEVfUlVMRVNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFBST0RVQ1RfSU5GT19MT0NBVElPTiA9IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9zb2NpYWwtcHJvb2YuY3N2XCI7XG5leHBvcnQgY29uc3QgTE9HX0FQSV9VUkwgPSBcImh0dHBzOi8vZXVyb3BlLXdlc3QzLW5leHRkYXktMzRlYjMuY2xvdWRmdW5jdGlvbnMubmV0L2FwaS9sb2dcIjtcbmV4cG9ydCBjb25zdCBMT09LVVBfQVBJX1VSTCA9IFwiaHR0cHM6Ly9jYXRhbG9nLWFwaS5hZG9yYWFpLmNvbVwiO1xuZXhwb3J0IGNvbnN0IE1PQklMRV9NRURJQV9RVUVSWSA9IFwiKG1heC13aWR0aDogNDQwcHgpXCI7XG4vLyBDb250cm9sIGdyb3VwIHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBTUExJVF9SQVRJTyA9IDUwO1xuLy8gU2tpcHBlZCB0cmVhdG1lbnQgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9SQVRJTyA9IDUwO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVFNfRFVSQVRJT04gPSAxO1xuZXhwb3J0IGNvbnN0IE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OID0gMTtcbmV4cG9ydCBjb25zdCBMSVNUX01PREVfQkVBR0xFX0tFWVMgPSBbXCJwYWdldHlwZVwiLCBcImNhdGVnb3J5XCIsIFwiYWxsdGltZVBMUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QTFBDYXRlZ29yeU1vZGVcIixcbiAgXCJhbGx0aW1lUERQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBEUENhdGVnb3J5TW9kZVwiLCBcImFsbHRpbWVDYXJ0Q2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvbkNhcnRDYXRlZ29yeU1vZGVcIl07XG4gIC8vIFRPRE8gc2V0IHRvIDEyMDAwMChtcykgYmVmb3JlIGdvIGxpdmVcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFRJTUVPVVRfQ09VTlQ6IFwiQkdfVGltZW91dENvdW50XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBPVVRfT0ZfU0NPUEU6IFwiQkdfT3V0T2ZTY29wZVwiLFxuICBJU19MQUJFTF9TRU5UOiBcIkJHX0xhYmVsU2VudFwiLFxuICBVU0VSX0lEOiBcIkJHX1VzZXJJZF8wMFwiLFxuICBEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFOiBcIkJHX0NvbGxlY3Rpb25EYXRhU2l6ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9TVE9SQUdFX1BSRUZJWCA9IFwiQkdfU2VnX1wiO1xuIiwiaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVN9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3Iob3JpZ2luID0gXCJCZWFnbGUgQ2xpZW50IFNES1wiKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gIH1cblxuICBpbmZvKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5pbmZvKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmIChERUJVRykge1xuICAgICAgY29uc29sZS5sb2coYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgZmFpbGVkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogcmVkXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgc3VjY2VzcyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IGdyZWVuXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUud2FybihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5lcnJvcihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG5cbiAgaWYgKF9pID09IG51bGwpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG5cbiAgdmFyIF9zLCBfZTtcblxuICB0cnkge1xuICAgIGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZURhdGFDb2xsZWN0aW9uXCIpO1xubGV0IGNvbGxlY3RvckFwaTtcblxuZXhwb3J0IGNvbnN0IHNldENvbGxlY3RvckFwaSA9IChjQSkgPT4ge1xuICBjb2xsZWN0b3JBcGkgPSBjQTtcbn07XG5cbi8vIGtlZXAgYSB0YWJsZSBpbiBpbmRleGRiIHRoZSBmb3JtYXQgW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgZGF0YV92YWx1ZSwgc3RvcmVkX3ZhbHVlXVxuXG5leHBvcnQgY29uc3QgcXVlcnlJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpID0+IHtcbiAgbG9nZ2VyLmxvZyhcInF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KTtcbiAgaWYgKCFjb2xsZWN0b3JBcGkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiSW5kZXhlZERCIG5vIHN1cHBvcnRlZC9Jbml0aWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHdpbmRvdyBjYW4gYmUgZWl0aGVyIHNhbWVkYXkgb3IgYWxsdGltZVxuXG4gIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtaW5cIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5taW4oYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwibWF4XCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubWF4KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImF2Z1wiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLmF2ZyhiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjZFwiKSB7XG4gICAgcmV0dXJuIChhd2FpdCBjb2xsZWN0b3JBcGkuZ3JvdXBCeShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdykpLnNpemU7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiY3ZcIikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb2xsZWN0b3JBcGkuZ3JvdXBCeShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGNvdW50ICs9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBpZiAocXVlcnlNZXRob2QgPT09IFwibW9kZVwiKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNvbGxlY3RvckFwaS5tb2RlKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBkYXRhLm5hbWU7XG4gIH1cblxuICBpZiAocXVlcnlNZXRob2QuaW5kZXhPZihcImxhc3RcIikgPj0gMCkge1xuICAgIGNvbnN0IG1hdGNoID0gcXVlcnlNZXRob2QubWF0Y2goXCJsYXN0XFxcXCgoW1xcXFxkXSspXFxcXClcIik7XG4gICAgaWYgKCFtYXRjaCB8fCAhbWF0Y2gubGVuZ3RoID09PSAyIHx8IHBhcnNlSW50KG1hdGNoWzFdKSA8IDEgKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubGFzdChiYXNlRmVhdHVyZU5hbWUsIG1hdGNoWzFdLCB3aW5kb3cpO1xuICAgIGNvbnN0IGRhdGFWYWx1ZXMgPSBxdWVyeVByb21pc2UubWFwKChvYmopID0+IG9iai5kYXRhX3ZhbHVlKTtcbiAgICByZXR1cm4gZGF0YVZhbHVlcztcbiAgfVxuXG4gIC8qKlxuICAgIHtcIkxpc3RpbmdwYWdlXCIgPT4gMjF9XG4gICAge1wiSG9tZXBhZ2VcIiA9PiAxMn1cbiAgICAtLSBleGFtcGxlIHdpbGwgaGF2ZTpcbiAgICBtb2RlOiBMaXN0aW5ncGFnZVxuICAgIGNkOiAyXG4gICAgY3Y6IDIxKzEyXG4gICAgbGFzdCgzKSAobiwgbi0xLCBuLTIpXG4gICovXG5cbiAgLy8gMTAwMGxpayB0ZW1pemxlbmVjZWsgKG1haW50T3BDb3VudCAtPiB2ZXJzaW9uKVxuXG4gIC8vIHF1ZXJ5TWV0aG9kIGNhbiBiZSBcIm1vZGVcIiwgXCJjZFwiIChjb3VudCBkaXN0aW50KSBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXNcbiAgLy8gcXVlcnlNZXRob2QgY2FuIGJlIFwiY3ZcIiAoc3VtIG9mIGNvdW50IHZhbHVlcyksIFwiY3VycmVudFwiLCBvciBcInByZXZcIiBmb3IgYW55IGRhdGEgdHlwZSAoc3RvcmVkIHZpYSBsYXN0KVxuICBsb2dnZXIuZmFpbGVkKGB1bmtub3duIHF1ZXJ5TWV0aG9kPSR7cXVlcnlNZXRob2R9IGluIEJlYWdsZURhdGFDb2xsZWN0aW9uYCk7XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJ1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCk7XG4gIGlmICghY29sbGVjdG9yQXBpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkluZGV4ZWREQiBubyBzdXBwb3J0ZWQvSW5pdGlhbGl6ZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhd2FpdCBjb2xsZWN0b3JBcGkuc2F2ZShiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpO1xuXG5cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcIm1pblwiLCBcIm1heFwiLCBcImNudFwiLCBcInN1bVwiIGZvciBudW1lcmljIGRhdGEgdHlwZXMsIG1pbi1tYXggY29tcGFyZXMgd2l0aCBvbmx5IGV4aXN0aW5nLCBhdmcgdXBkYXRlcyBjbnQgYW5kIHN1bVxuICAvLyAtLT4gbWluOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcIm1pblwiLCAobGVhc3Qgb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBtYXg6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwibWF4XCIsIChncmVhdGVzdCBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IHN1bTogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJzdW1cIiwgKHN1bSBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IGNudDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjbnRcIiwgKGV4aXN0aW5nICsgMSldXG4gIC8vXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJjb3VudF92YWx1ZXNcIiBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXMsIGtlZXAgYSBjb3VudGVyIGZvciBlYWNoIHZhbHVlXG4gIC8vIC0tPiBjb3VudF92YWx1ZXM6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIGRhdGFfdmFsdWUsIChleGlzdGluZyArIDEpXVxuICAvL1xuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwibGFzdFwiIGZvciBhbnkgZGF0YSB0eXBlIC0tPiBrZWVwcyAyIHZhbHVlcyBmb3IgY3VycmVudCBhbmQgdGhlIHByZXZpb3VzXG4gIC8vIGRlbGV0ZTogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJwcmV2XCIsIChleGlzdGluZyB2YWx1ZSldXG4gIC8vIG1vdmU6IGV4aXN0aW5nIFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY3VycmVudFwiLCAoZXhpc3RpbmcgdmFsdWUpXSAtLT4gW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJwcmV2XCIsIChleGlzdGluZyB2YWx1ZSldXG4gIC8vIHB1dDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjdXJyZW50XCIsIChpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7Zm9ybWF0RGVsaXZlcnlEYXRlfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TE9PS1VQX0FQSV9VUkwsIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBTUExJVF9SQVRJT30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtzZXRDb2xsZWN0b3JBcGksIHF1ZXJ5SW5Db2xsZWN0b3IsIHVwZGF0ZUluQ29sbGVjdG9yfSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb25cIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG53aW5kb3cuYmVhZ2xlSW5mb0xheWVyID0gd2luZG93LmJlYWdsZUluZm9MYXllciB8fCB7XG4gIGE6IHt9LCBlOiB7fSwgZjoge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllclwiKTtcblxuZXhwb3J0IGNvbnN0IGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNID0gKCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5mb0xheWVyLl9faHdtICs9IDE7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVG9CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIGlmIHZhbHVlIGlzIHN0cmluZywgYWRkIGFzIGEgY2xlYW4gc3RyaW5nLCBpZiBvYmplY3QgYWRkIHRoZSBzYW1lXG4gIGNvbnN0IHR5cGVkVmFsdWUgPSB0eXBlb2YgKHZhbHVlKSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpIDogdmFsdWU7XG4gIC8vIGlmIGtleSBjb250YWlucyAuIGNyZWF0ZSBuZXN0ZWQgb2JqZWN0XG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIG9ialtrZXldID0ge307XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBvYmpbbGFzdEtleV0gPSB0eXBlZFZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGluZm9MYXllcltrZXldID0gdHlwZWRWYWx1ZTtcbiAgfVxuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgaWYgKHR5cGVkVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlZFZhbHVlICE9PSBudWxsKSB7XG4gICAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIHR5cGVkVmFsdWUpO1xuICAgIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgdHlwZWRWYWx1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IERBVEFfTElTVEVORVJTID0ge307XG5cbmV4cG9ydCBjb25zdCBhZGREYXRhTGlzdGVuZXIgPSAoa2V5LCBsaXN0ZW5lcikgPT4ge1xuICBpZiAoIURBVEFfTElTVEVORVJTW2tleV0pIHtcbiAgICBEQVRBX0xJU1RFTkVSU1trZXldID0gW107XG4gIH1cbiAgREFUQV9MSVNURU5FUlNba2V5XS5wdXNoKGxpc3RlbmVyKTtcbn07XG5cbmNvbnN0IHBhc3NWYWx1ZVRvTGlzdGVuZXJzID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgbGlzdGVuZXJzID0gREFUQV9MSVNURU5FUlNba2V5XTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobGlzdGVuZXJzKSAmJiBsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYFBhc3NpbmcgdmFsdWUgJHt2YWx1ZX0gdG8gbGlzdGVuZXJzIG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RnJvbUJlYWdsZUluZm9MYXllciA9IChrZXksIGJsb2NraW5nID0gZmFsc2UsIHBvbGxJbnRlcnZhbCA9IDUwLCB0aW1lb3V0ID0gMTAwMDApID0+IHtcbiAgcmV0dXJuIGdldEFueUZyb21CZWFnbGVJbmZvTGF5ZXIoW2tleV0sIGJsb2NraW5nLCBwb2xsSW50ZXJ2YWwsIHRpbWVvdXQpO1xufTtcblxuY29uc3QgZ2V0QW55RnJvbUJlYWdsZUluZm9MYXllciA9IChrZXlzLCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIC8vIFRPRE86IGNoZWNrIGZlYXR1cmVFbmdpbmVlcmluZyBhbmQgc2VhcmNoIGxpc3QgaWYgYWxsIG1hcmtlZCBhcyBmb3VuZCBidXQgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5cyBpcyBtaXNzaW5nIG9yIG5vdCBhbiBhcnJheSBvciBoYXMgbm8gZWxlbWVudHNcbiAgaWYgKCFrZXlzIHx8ICFBcnJheS5pc0FycmF5KGtleXMpIHx8ICFrZXlzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhO1xuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gICAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXksIGNsZWFyIGludGVydmFsIGFuZCByZXNvbHZlXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHBvbGxJbnRlcnZhbCk7XG4gICAgICAvLyBhZGQgdGltZW91dFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfSwgdGltZW91dCk7IC8vIHdhaXQgYmxvY2tpbmcgZm9yIFwidGltZW91dFwiIG1zZWNzXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyByZW1vdmUga2V5IGZyb20gaW5mb0xheWVyXG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIHJldHVybjtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIGxvZ2dlci5sb2coXCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyXCIsIGBSZW1vdmluZyAke2xhc3RLZXl9IGZyb20gJHtKU09OLnN0cmluZ2lmeShvYmopfWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgbnVsbCk7XG4gIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgbnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVHJlYXRtZW50ID0gKGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgc3RhdHVzLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gbnVsbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgfHwgYnVzaW5lc3NSdWxlSWQgIT09IHVuZGVmaW5lZCkgdmFsdWUuYnVzaW5lc3NSdWxlSWQgPSBidXNpbmVzc1J1bGVJZDtcbiAgaWYgKHZhcmlhbnQpIHZhbHVlLnZhcmlhbnQgPSB2YXJpYW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNraXBwZWRcIjpcbiAgICAgIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuICAgICAgaW5mb0xheWVyLmVbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICBpbmZvTGF5ZXIuZltpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG59O1xuXG5jb25zdCBQQVJTRVNFQVJDSE1BWFJFVFJZID0gMTA7XG5jb25zdCBQQVJTRVNFQVJDSFNUQVJUREVMQVkgPSAxMDtcbmxldCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgPSBhc3luYyAoY29sbGVjdG9yQXBpKSA9PiB7XG4gIHNldENvbGxlY3RvckFwaShjb2xsZWN0b3JBcGkpO1xuICAvLyBDb2xsZWN0IGNvcmUgZGF0YVxuICBwcmVwYXJlQ29yZURhdGEoKTtcblxuICAvLyBUcmlnZ2VyLXN0YXJ0IHRoZSBwYXJzZXIgbG9vcFxuICBwYXJzZXJDYWxsZXIoKTtcblxuICAvLyBBZGQgbWV0cmljc1xuICBhZGRNZXRyaWNzKCk7XG59O1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJjdlwiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwiX19mZWF0dXJlcy5TS1Vzb25CYXNrZXRMb29rdXBcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RCYXNrZXRMb29rdXBcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbn07XG5cbmNvbnN0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJhc2VGZWF0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlRW5naW5lZXJpbmdPcHMpO1xuICBmb3IgKGNvbnN0IGJhc2VGZWF0dXJlTmFtZSBvZiBiYXNlRmVhdHVyZU5hbWVzKSB7XG4gICAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gICAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gVE9ETzogY29udmVydCB0byBuYW1lIC0tPiBhcnJheSBvZiBzZWxlY3RvcnNcbmNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2xhc3NcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5pc0luU2hvd3Jvb21cIiwgbmFtZTogXCJwZHAuaXNJblNob3dyb29tXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNhdGVnb3J5X3Byb2R1Y3RfY291bnRcIiwgbmFtZTogXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBscC5jbGFzc1wiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInB1cmNoYXNlLnByaWNlc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5xdWFudGl0eVwiLCBuYW1lOiBcInB1cmNoYXNlLnF1YW50aXRpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwdXJjaGFzZS5jYXRlZ29yaWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLm9yZGVySWRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLnJldmVudWVcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5kaW1lbnNpb24xNVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRG9jdW1lbnQgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicGFnZV9wcmV2aWV3X3dyYXBwZXJfcHJvZHVjdGlvblxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiSG9tZXBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXRlZ29yeV9wYWdlX3dyYXBwZXJcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkxpc3RpbmdwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiYm9keSA+IC5kZXNrdG9wX2xheW91dF93cmFwcGVyIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY29wdW9uTm90QXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVGb3JtYXR0ZWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwiZm9ybWF0RGVsaXZlcnlEYXRlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiN2aXZlbnNlLXNob3dyb29tLXRhYiBwOm5vdCgudml2ZW5zZS1zaG93cm9vbXMpXCIsIG5hbWU6IFwicGRwLmhhc05vU2hvd3Jvb21zXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJwZHAuc2hvd3Jvb21jb3VudFwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInN1YmNhdGVnb3JpZXMtdGl0bGVcXFwiXVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtY2FyZFtkYXRhLXByb2R1Y3Qtc2t1XVwiLCBuYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uUExQXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcm9kdWN0LXNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1saXN0XCIsIG9ic2VydmVyOiBcImxpc3RpbmdJdGVtQmxvY2tcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QTFBcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgb2JzZXJ2ZXI6IFwiY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG9ic2VydmVyOiBcImNoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF9zdW1tYXJ5X3RvdGFsXFxcIl0sIFtjbGFzcyo9XFxcInRvdGFsX3Jvd1xcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlcl9mb2xsb3dfbnVtYlxcXCJdLCBbY2xhc3MqPVxcXCJjYXJ0LXRpdGxlLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucGF5bWVudF90eXBlX3RpdGxlLCAuY2FydC10aXRsZS1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdF9za3VfY29kZVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU09SRyBFbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1wblwiLCBuYW1lOiBcInBkcC5tcG5cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJuYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJKU09ORmlsdGVyT3RoZXJcIiwgdmFsdWU6IFwiQHR5cGU9UHJvZHVjdFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiaXRlbUxpc3RFbGVtZW50LioubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiYnJlYWRjcnVtYi5pdGVtTGlzdEVsZW1lbnQuKi5pdGVtLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBXaW5kb3cgY3VzdG9tIGVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJmYXZvcml0ZVByb2R1Y3RzXCIsIG5hbWU6IFwidmlldy5mYXZvcml0ZWRNUE5zXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcInRvU3RyaW5nXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXTtcblxuY29uc3QgcHJvY2Vzc0Zvcm1hdHRlciA9ICh2YWx1ZSwgZm9ybWF0dGVyKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFmb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKGZvcm1hdHRlcikge1xuICAgIGNhc2UgXCJ1cHBlckNhc2VUUlwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoXCJ0ci1UUlwiKTtcbiAgICBjYXNlIFwiZm9ybWF0RGVsaXZlcnlEYXRlXCI6XG4gICAgICByZXR1cm4gZm9ybWF0RGVsaXZlcnlEYXRlKHZhbHVlKTtcbiAgICBjYXNlIFwibnVtZXJpY09ubHlcIjpcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgY2FzZSBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZShcInRyLVRSXCIpLnNwbGl0KFwiIFwiKVswXTtcbiAgICBjYXNlIFwiZGVhcnJheVwiOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJ0b1N0cmluZ1wiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaE9iaiA9IChvYmosIHNlYXJjaEVsZW1lbnQpID0+IHtcbiAgbGV0IHZhbHVlO1xuICBsZXQgbGF5ZXJWYWx1ZTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoc2VhcmNoRWxlbWVudC5vcGVyYW5kKSB7XG4gICAgICBjYXNlIFwiSlNPTkZpbHRlck90aGVyXCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJQYXJhbXMgPSBzZWFyY2hFbGVtZW50LnZhbHVlLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBpZiAoZmlsdGVyUGFyYW1zLmxlbmd0aCAhPT0gMikgYnJlYWs7XG4gICAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IGZpbHRlclBhcmFtc1swXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlclBhcmFtc1sxXTtcbiAgICAgICAgICBpZiAoIWZpbHRlck5hbWUgfHwgIWZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoID0ganNvbkdldChvYmosIGZpbHRlck5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXRjaCB8fCBmaWx0ZXJNYXRjaCAhPT0gZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgaWYgKHZhbHVlICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeU9ic2VydmVcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICBjb25zdCB0b0JlVXBkYXRlZCA9IFtdO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzZWFyY2hQYXRocy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgLy8gYWRkIGNoaWxkRWxlbWVudHMgaW50byB0b0JlVXBkYXRlZFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQucHVzaCguLi5jaGlsZEVsZW1lbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBydW4gb25seSBpZiB0aGUgZWxlbWVudCBoYXMgYWRkZWQgb3IgcmVtb3ZlZCBjaGlsZHJlblxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50LmlzRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllcihlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyUmVzdGFydCA9IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA+PSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyUmVzdGFydCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwic2VhcmNoT2JqOiB0cmlnZ2VyZWQgYSByZXN0YXJ0IG9mIHNlYXJjaHBhdGhzIGR1ZTogXCIsIHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIHBhcnNlckNhbGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodmFsdWUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUlubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgYXR0cmliVmFsdWVMaXN0ID0gW107XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSB2YWx1ZWNoaWxkLmdldEF0dHJpYnV0ZShzZWFyY2hFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZSkge1xuICAgICAgICAgICAgICBhdHRyaWJWYWx1ZUxpc3QucHVzaChhdHRyaWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYlZhbHVlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXR0cmliVmFsdWVMaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHNldFZhbHVlID0gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZXRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5Q291bnRFbHRzXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2VhcmNoRWxlbWVudC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGxldCBzdW1QcmljZSA9IDA7XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgc3VtUHJpY2UrPXBhcnNlSW50KGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdW1QcmljZSA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBzdW1QcmljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGFycmF5SW5uZXJUZXh0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhcnJheUlubmVyVGV4dC5wdXNoKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUlubmVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXJyYXlJbm5lclRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9IC8vIHN3aXRjaFxuXG4gICAgaWYgKGxheWVyVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBsYXllclZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpIHtcbiAgICAgICAgbGF5ZXJWYWx1ZSA9IHByb2Nlc3NGb3JtYXR0ZXIobGF5ZXJWYWx1ZSwgc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpO1xuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoc2VhcmNoRWxlbWVudC5uYW1lLCBsYXllclZhbHVlKTtcbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG5cbiAgICAgIC8vIG1hcmsgZXhjbHVzaXZlIGVsZW1lbnRzIGFzIGZvdW5kXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSkgJiYgc2VhcmNoRWxlbWVudC5leGNsdXNpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZUVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUuaW5jbHVkZXMoZXhjbHVzaXZlRWxlbWVudC5uYW1lKSkge1xuICAgICAgICAgICAgZXhjbHVzaXZlRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwic2VhcmNoT2JqIGVycm9yOiBcIiArIGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGN1c3RvbURhdGFEZXJpdmF0aW9ucyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUsIDUwLCAxMDAwKTtcblxuICB0cnkge1xuICAgIC8vIGNhcnQgdG90YWwgcHJvZHVjdCBwcmljZSBpcyBub3QgYXZhaWxhYmxlIGFueXdoZXJlLCBzcGVjaWFsIGRpc2NvdW50cyBldGMgYXJlIGhhcmQgdG8gc2NyYXBlLCBzbyByZWNhbGN1bGF0ZSBpdFxuICAgIGNvbnN0IFtpc0NhcnRFbXB0eSwgdG90YWxCYXNlUHJpY2UsIGNvdXBvbk5vdEFwcGxpY2FibGUsIHByaWNlcywgcXVhbnRpdGllc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5pc2VtcHR5XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxCYXNlUHJpY2VcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucHJpY2VzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucXVhbnRpdGllc1wiKSxcbiAgICBdKTtcblxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcblxuICAgIGlmICghdG90YWxCYXNlUHJpY2UgJiYgcHJpY2VzICYmIEFycmF5LmlzQXJyYXkocHJpY2VzKSAmJiBwcmljZXMubGVuZ3RoID4gMCAmJiBxdWFudGl0aWVzICYmIEFycmF5LmlzQXJyYXkocXVhbnRpdGllcykgJiYgcXVhbnRpdGllcy5sZW5ndGggPiAwICYmIHByaWNlcy5sZW5ndGggPT09IHF1YW50aXRpZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbFByaWNlICs9IHBhcnNlSW50KHByaWNlc1tpXSkgKiBwYXJzZUludChxdWFudGl0aWVzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxQcmljZSA9IHBhcnNlSW50KHRvdGFsQmFzZVByaWNlKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlICYmIGNvdXBvbk5vdEFwcGxpY2FibGUpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSB0b3RhbFByaWNlIC0gcGFyc2VJbnQoY291cG9uTm90QXBwbGljYWJsZSk7XG4gICAgfSBlbHNlIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHBhcnNlSW50KHRvdGFsUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIiwgY291cG9uQXBwbGljYWJsZUFtb3VudCk7XG5cbiAgICBpZiAoaXNDYXJ0RW1wdHkpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbFByaWNlXCIsIDApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiY3VzdG9tRGF0YURlcml2YXRpb25zIGNhbm5vdCBjb21wdXRlIGNvdXBvbkFwcGxpY2FibGVQcmljZTogXCIgKyBlKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBhY3RpdmUgU0tVIGxpc3RcbiAgbGV0IG5ld1NLVUxpc3QgPSBbXTtcbiAgLy8gUHJvZHVjdCBwYWdlXG4gIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiUHJvZHVjdHBhZ2VcIikge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIpO1xuICAgIGlmIChza3UhPT1udWxsICYmIHNrdSE9PXVuZGVmaW5lZCkge1xuICAgICAgbmV3U0tVTGlzdCA9IFtza3VdO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiYmFza2V0XCIpIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuc2t1c1wiKTtcbiAgICBpZiAoc2t1TGlzdCE9PW51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgbmV3U0tVTGlzdCA9IHNrdUxpc3Q7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJMaXN0aW5ncGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBMUFwiKTtcbiAgICBpZiAoc2t1TGlzdCE9PW51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgbmV3U0tVTGlzdCA9IHNrdUxpc3Q7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogZXh0cmFjdCBTS1VzQWxyZWFkeUxvb2tlZFVwIGZyb20gZGlmZlByb2R1Y3RJbmZvIGFuZCBrZWVwIGFzIGEgU2V0XG4gIGNvbnN0IHByZXZTS1VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc0FscmVhZHlMb29rZWRVcFwiKSB8fCBbXTtcbiAgLy8gZ2V0IGRpZmZlcmVuY2UgYmV0d2VlbiBuZXcgYW5kIG9sZCBTS1UgbGlzdFxuICBjb25zdCBkaWZmU0tVTGlzdCA9IG5ld1NLVUxpc3QuZmlsdGVyKCh4KSA9PiAhcHJldlNLVUxpc3QuaW5jbHVkZXMoeCkpO1xuICBpZiAoZGlmZlNLVUxpc3QgJiYgZGlmZlNLVUxpc3QubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGRpZmZQcm9kdWN0SW5mbyA9IGF3YWl0IHByb2R1Y3RJbmZvTG9va3VwKGRpZmZTS1VMaXN0KSB8fCB7fTtcbiAgICBjb25zdCBvbGRQcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VMb29rdXBcIikgfHwge307XG4gICAgLy8gYWRkIGRpZmYgcHJvZHVjdCBpbmZvIHRvIG9sZCBwcm9kdWN0IGluZm9cbiAgICBjb25zdCBuZXdQcm9kdWN0SW5mbyA9IHsuLi5vbGRQcm9kdWN0SW5mbywgLi4uZGlmZlByb2R1Y3RJbmZvfTtcblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlTG9va3VwXCIsIG5ld1Byb2R1Y3RJbmZvKTtcbiAgICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uQmFza2V0TG9va3VwXCIsIG5ld1Byb2R1Y3RJbmZvKTtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlZFNLVXMgPSBwcmV2U0tVTGlzdC5jb25jYXQoZGlmZlNLVUxpc3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1VzQWxyZWFkeUxvb2tlZFVwXCIsIHVwZGF0ZWRTS1VzKTtcbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHByZXBhcmVDb3JlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICAvKiBCZWFnbGUgZGF0YSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZcIiwgXCIwLjAuMzdcIik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50RGF0YT8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudDtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZQbGF0Zm9ybVwiLCBwbGF0Zm9ybSk7XG5cbiAgLyogd2luZG93IHZpZXcgYXJlYSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dQUmF0aW9cIiwgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIGNvbnN0IGF2YWlsV2luZG93ID0gd2luZG93UHRyLnNjcmVlbj8uYXZhaWxXaWR0aCArIFwieFwiICsgd2luZG93UHRyLnNjcmVlbj8uYXZhaWxIZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0F2YWlsXCIsIGF2YWlsV2luZG93KTtcblxuICBjb25zdCB3aW5kb3dEZXB0aCA9IHdpbmRvd1B0ci5zY3JlZW4/LmNvbG9yRGVwdGggKyBcIi1cIiArIHdpbmRvd1B0ci5zY3JlZW4/LnBpeGVsRGVwdGg7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0RlcHRoXCIsIHdpbmRvd0RlcHRoKTtcblxuICBjb25zdCB2cG9ydFNoYXBlID0gd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py53aWR0aCArIFwieFwiICsgd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py5oZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1Zwb3J0XCIsIHZwb3J0U2hhcGUpO1xuXG4gIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICBsZXQgd2lkdGggPSBwYXJzZUludChzY3JlZW4ud2lkdGgpO1xuICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBwYXJzZUludChzY3JlZW4uaGVpZ2h0KSA6IDA7XG4gICAgaWYgKHdpZHRoICE9PSAwICYmIGhlaWdodCAhPT0gMCkge1xuICAgICAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QocGxhdGZvcm0pO1xuICAgICAgaWYgKGlPUyAmJiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbykge1xuICAgICAgICAvLyBpb3MgcHJvdmlkZXMgRFBJcywgbmVlZCB0byBtdWx0aXBseVxuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGggKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25BbmdsZSA9IHdpbmRvd1B0ci5zY3JlZW4/Lm9yaWVudGF0aW9uPy5hbmdsZTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSA5MCB8fCBNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gMjcwKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBsYW5kc2NhcGUgb3JpZW50YXRpb24gc3dpdGNoIHZhbHVlcyBmb3IgYWxsIGV4Y2VwdCBpb3NcbiAgICAgICAgICBjb25zdCB0ZW1wID0gd2lkdGg7XG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQ7XG4gICAgICAgICAgaGVpZ2h0ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93XCIsIHdpZHRoICsgXCJ4XCIgKyBoZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIG5hdmlnYXRvciAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIaXN0U2l6ZVwiLCB3aW5kb3dQdHIuaGlzdG9yeT8ubGVuZ3RoKTtcblxuICAvLyBjaGVjayBpZiB1c2VyQWdlbnREYXRhIGlzIHN1cHBvcnRlZCBhbmQgdXNlckFnZW50IGlzIG5vdCBhdmFpbGFibGUsIHVzZSBpdFxuICBpZiAoIW5hdlB0ci51c2VyQWdlbnQpIHtcbiAgICBpZiAobmF2UHRyLnVzZXJBZ2VudERhdGEpIHtcbiAgICAgIC8vIHR1cm4gYnJhbmRzIGFycmF5IGludG8gc3RyaW5nXG4gICAgICBsZXQgbmF2QWdlbnQgPSBuYXZQdHI/LnVzZXJBZ2VudERhdGE/LmJyYW5kcz8ubWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuYnJhbmQgKyBcIjpcIiArIGUudmVyc2lvbjtcbiAgICAgIH0pLmpvaW4oKTtcbiAgICAgIC8vIGFkZCBtb2JpbGUgaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gKG5hdlB0cj8udXNlckFnZW50RGF0YT8ubW9iaWxlID8gXCJtb2JpXCIgOiBcIiBcIik7XG4gICAgICAvLyBhZGQgcGxhdGZvcm0gaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gcGxhdGZvcm07XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZBZ2VudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdlB0ci51c2VyQWdlbnQpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SFdDb3Jlc1wiLCBuYXZQdHIuaGFyZHdhcmVDb25jdXJyZW5jeSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkxhbmd1YWdlXCIsIG5hdlB0ci5sYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLmJyb3dzZXJMYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnN5c3RlbUxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIudXNlckxhbmd1YWdlLFxuICApO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZUb3VjaFwiLCBuYXZQdHIubWF4VG91Y2hQb2ludHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZWZW5kb3JcIiwgbmF2UHRyLnZlbmRvcik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmludGVybmV0U3BlZWRcIiwgd2luZG93UHRyLm5hdmlnYXRvcj8uY29ubmVjdGlvbj8uZG93bmxpbmspO1xuXG4gIC8qIG1pc2NlbGxhbmVvdXMgKi9cbiAgY29uc3QgY3VycmVudFVSTCA9IG5ldyBVUkwod2luZG93LnRvcC5sb2NhdGlvbi5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIsIGN1cnJlbnRVUkwuaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCBjdXJyZW50VVJMLmhvc3RuYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkb250dHJhY2tcIiwgbmF2UHRyLmRvTm90VHJhY2sgfHwgd2luZG93UHRyLmRvTm90VHJhY2sgfHwgbmF2UHRyLm1zRG9Ob3RUcmFjayk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIGNvbnN0IGZpcnN0U2Vzc2lvblJlZmVycmVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSKTtcbiAgaWYgKCFmaXJzdFNlc3Npb25SZWZlcnJlcikge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCBmaXJzdFNlc3Npb25SZWZlcnJlcik7XG4gIH1cblxuICAvKiBWaXZlbnNlIHNwZWNpZmljICovXG4gIGxldCBwYWdlVHlwZTtcbiAgLy8gaWYgdXJsIGxpa2UgeCB0aGVuIHNldCBQYWdlVHlwZSA9IHlcbiAgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImZhdm9yaWxlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJmYXZvcml0ZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImJhc2tldFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtb3pldGkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInB1cmNoYXNlXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwib2RlbWUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBheW1lbnRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJhZGRyZXNzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXN0b3JkZXJzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWtheWl0Lmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJyZWdpc3RlclwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1naXJpc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNpZ25pblwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImt1cG9ubGFyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfY291cG9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInByb2ZpbC1ndW5jZWxsZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9pbmZvXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9hZGRyZXNzZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJkdXl1cnUtdGVyY2lobGVyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9ub3RpZmljYXRpb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiaW5kaXJpbWxpLW1vYmlseWEta2FtcGFueWFsYXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzcGVjaWFsX2NhbXBhaWduc1wiO1xuICB9XG5cbiAgaWYgKHBhZ2VUeXBlKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCBwYWdlVHlwZSk7XG4gIH1cbn07XG5cbmNvbnN0IGFkZE1ldHJpY3MgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgcGVyZk1ldHJpY3MgPSB7fTtcbiAgY29uc3QgcGVyZk5hdmlnYXRpb25NZXRyaWNzID0gd2luZG93UHRyLnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdO1xuICBpZiAod2luZG93UHRyLnBlcmZvcm1hbmNlICYmIHBlcmZOYXZpZ2F0aW9uTWV0cmljcykge1xuICAgIHBlcmZNZXRyaWNzLmNvbm5lY3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MucmVxdWVzdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlc3BvbnNlRW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlcXVlc3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZG9tID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tSW50ZXJhY3RpdmUgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tQ29tcGxldGUpO1xuICAgIHBlcmZNZXRyaWNzLmxvYWQgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZHVyYXRpb24pO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibWV0cmljc1wiLCBwZXJmTWV0cmljcyk7XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuXG5sZXQgcHJvZHVjdEluZm9Mb29rdXBJblByb2dyZXNzID0gZmFsc2U7XG5cbmV4cG9ydCBjb25zdCBwcm9kdWN0SW5mb0xvb2t1cCA9IGFzeW5jIChza3VsaXN0KSA9PiB7XG4gIGlmICghc2t1bGlzdCB8fCBza3VsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJwcm9kdWN0SW5mb0xvb2t1cDogTm8gc2t1IGZvdW5kXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHByb2R1Y3RJbmZvTG9va3VwSW5Qcm9ncmVzcykge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJwcm9kdWN0SW5mb0xvb2t1cDogQWxyZWFkeSBpbiBwcm9ncmVzc1wiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxvZ2dlci5sb2coXCJwcm9kdWN0SW5mb0xvb2t1cDogU3RhcnRpbmcgcHJvZHVjdCBpbmZvIGxvb2t1cDogXCIrc2t1bGlzdCk7XG5cbiAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICBwcm9kdWN0SW5mb0xvb2t1cEluUHJvZ3Jlc3MgPSB0cnVlO1xuICBsZXQgcHJvZHVjdEluZm8gPSBudWxsO1xuICB0cnkge1xuICAgIHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2goTE9PS1VQX0FQSV9VUkwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShza3VsaXN0KSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICB9KTtcbiAgICBpZiAocHJvZHVjdEluZm8ub2spIHtcbiAgICAgIHByb2R1Y3RJbmZvID0gYXdhaXQgcHJvZHVjdEluZm8uanNvbigpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci53YXJuKFwicHJvZHVjdEluZm9Mb29rdXA6IGZldGNoICYgcGFyc2UgZmFpbGVkXCIpO1xuICB9XG5cbiAgcHJvZHVjdEluZm9Mb29rdXBJblByb2dyZXNzID0gZmFsc2U7XG4gIHJldHVybiBwcm9kdWN0SW5mbztcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIFNUWUxFU0hFRVRfTE9DQVRJT04sXG4gIFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRTX0xPQ0FUSU9OLFxuICBFX1JVTEVTX0xPQ0FUSU9OLFxuICBQUk9EVUNUX0lORk9fTE9DQVRJT04sXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcblxuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJuZXh0RGF5LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50c1wiKTtcbiAgY29uc3QgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoKFRSRUFUTUVOVFNfTE9DQVRJT04pO1xuICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gIHJldHVybiBqc29uVHJlYXRtZW50O1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50V2VpZ2h0cyA9IGFzeW5jICgpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2goVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICBjb25zdCBqc29uVHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IHRyZWF0bWVudFdlaWdodHMuanNvbigpO1xuICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2goRV9SVUxFU19MT0NBVElPTik7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbmRQZXJzaXN0UHJvZHVjdEluZm8gPSBhc3luYyAoY29sbGVjdG9yQXBpKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJGZXRjaGluZyBwcm9kdWN0SW5mb0xvb2t1cCBcIik7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgY29sbGVjdG9yQXBpLmZpbmQoXCJwcm9kdWN0SW5mb0NTVlwiKTtcbiAgICBjb25zb2xlLmxvZyhleGlzdGluZ1Byb2RJbmZvKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2goUFJPRFVDVF9JTkZPX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb0NTViA9IGF3YWl0IHByb2R1Y3RJbmZvLnRleHQoKTtcbiAgICBhd2FpdCBjb2xsZWN0b3JBcGkuc2F2ZShcInByb2R1Y3RJbmZvQ1NWXCIsIGNzdlRvQXJyYXkocHJvZHVjdEluZm9DU1YpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCB3cml0ZSBwcm9kdWN0SW5mbyB0byBJbmRleERCXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDb29raWVJZGVudGlmaWVyID0gKGNvb2tpZVN0cmluZywgY29va2llTmFtZSkgPT4ge1xuICBpZiAoIWNvb2tpZVN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gY29va2llU3RyaW5nXG4gICAgICAuc3BsaXQoXCI7XCIpXG4gICAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiPVwiKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICBpZiAodlswXSAmJiB2WzFdKSB7XG4gICAgICAgICAgYWNjW2RlY29kZVVSSUNvbXBvbmVudCh2WzBdLnRyaW0oKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZbMV0udHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gIGxldCBpZGVudGlmaWVyID0gcGFyc2VkW2Nvb2tpZU5hbWVdO1xuICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29va2llTmFtZSA9PT0gXCJfZ2FcIikge1xuICAgIC8vIGV4dHJhY3QgdW5pcXVlIGlkZW50aWZpZXIgZnJvbSBHQSBjb29raWVcbiAgICBjb25zdCBpZGVudGlmaWVySW5kZXggPSAyO1xuICAgIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyLnNwbGl0KFwiLlwiKVtpZGVudGlmaWVySW5kZXhdO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZVBjdCA9IGFzeW5jIChpZGVudGlmaWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgaGFzaCA9IGdldFVuc2VjdXJlSGFzaChpZGVudGlmaWVyKTtcbiAgICBpZiAoaGFzaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHBjdCA9IGhhc2ggJSAxMDA7XG4gICAgaWYgKHBjdCA+PSAwICYmIHBjdCA8IDEwMCkge1xuICAgICAgcmV0dXJuIHBjdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleGl0U2Nyb2xsTGlzdGVuZXIgPSAoY2FsbEJhY2spID0+IHtcbiAgY29uc3QgbG9vcCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKGxhc3RTY3JvbGxUb3AgLSA0MDAgPiBzY3JvbGxUb3ApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZXhpdFNjcm9sbEludGVydmFsKTtcbiAgICAgIGNhbGxCYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgfVxuICB9O1xuXG4gIGxldCBsYXN0U2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICBjb25zdCBleGl0U2Nyb2xsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChsb29wLCA1MDApO1xufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGFwcGx5IHRyZWF0bWVudHMgdG8gdGhlIHBhZ2Ugb24gc3BlY2lmaWMgbWVkaWEgdHlwZS5cbiAqIEBwYXJhbSB7TWVkaWFRdWVyeUxpc3R9IG1lZGlhUXVlcnlDb25kaXRpb24gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1MDBweClcIilcbiAqIEBwYXJhbSB7RE9NTm9kZUxpc3QgfSBlbGVtZW50cyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2LnByb2R1Y3RfaW5mb1wiKVxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlQ2hhbmdlc01hcCB7IFwibWFyZ2luLXRvcFwiIDogXCIxMHJlbVwifVxuICogQHJldHVybnNcbiAqL1xuXG5leHBvcnQgY29uc3Qgc3R5bGVBcHBsaWNhdG9yID0gKGVsZW1lbnRzLCBzdHlsZUNoYW5nZXNNYXApID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlIGNoYW5nZXNcIiwgc3R5bGVDaGFuZ2VzTWFwLCBcInRvIGVsZW1lbnRzXCIsIGVsZW1lbnRzKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzdHlsZUNoYW5nZXNNYXApKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbmplY3RTdHlsZVNoZWV0ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdHlsZVNoZWV0ID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgc3R5bGVTaGVldC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgc3R5bGVTaGVldC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICBzdHlsZVNoZWV0LmhyZWYgPSBTVFlMRVNIRUVUX0xPQ0FUSU9OO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUFjdGlvbnMgPSBhc3luYyAoaWRlbnRpZmllciwgYWN0aW9uc1RvUHJlcGFyZSwgYnVzaW5lc3NSdWxlSWQpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWN0aW9uc1RvUHJlcGFyZSkpO1xuICBsZXQgdmFyaWFudCA9IG51bGw7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7YnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zLCB2YXJpYW50c30gPSBhY3Rpb247XG4gICAgaWYgKCFidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMgJiYgIXZhcmlhbnRzKSBjb250aW51ZTtcbiAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhcmlhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhcmlhbnRLZXkgb2YgT2JqZWN0LmtleXModmFyaWFudHMpKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgdmFyaWFudEtleSk7XG4gICAgICAgIGlmIChyYW5kb21QY3QgPCBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgdmFyaWFudCA9IHZhcmlhbnRLZXk7XG4gICAgICAgICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIHZhcmlhbnRzW3ZhcmlhbnRLZXldLmJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIHZhcmlhbnRzW3ZhcmlhbnRLZXldLmJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcImlkXCIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgIT09IFwid2VpZ2h0XCIgJiYga2V5ICE9PSBcImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9uc1wiKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSB2YXJpYW50c1t2YXJpYW50S2V5XVtrZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbYWN0aW9ucywgdmFyaWFudF07XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUcsIFNFU1NJT05fVElNRVNUQU1QLCBTRVNTSU9OX0hJU1RPUll9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgcG9wdXBEaXNwbGF5RmxhZyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKTtcbiAgY29uc3Qgc2Vzc2lvblRpbWVzdGFtcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVApO1xuICBjb25zdCBzZXNzaW9uSGlzdG9yeSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9ISVNUT1JZKTtcblxuICBpZiAocG9wdXBEaXNwbGF5RmxhZyA9PT0gbnVsbCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAwKTtcbiAgfVxuICBpZiAoIXNlc3Npb25UaW1lc3RhbXApIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QLCBEYXRlLm5vdygpKTtcbiAgfVxuICBpZiAoIXNlc3Npb25IaXN0b3J5KSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVdKTtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgc2Vzc2lvbkhpc3RvcnldKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmRpdGlvbkNoZWNrZXIgPSAocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGlmIChjb25kaXRpb24gPT09IFwibm90RXhpc3RcIikge1xuICAgIGlmICghcnVuVGltZVZhbHVlKSB7XG4gICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8XG4gICAgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICBjb25kaXRpb24gPT09IG51bGwgfHxcbiAgICBjb25kaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBydW5UaW1lVmFsdWUgb3IgY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKGNvbmRpdGlvbikge1xuICAgIGNhc2UgXCJleGlzdFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJpbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJjb250YWluc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90SW5jbHVkZXNcIjpcbiAgICBjYXNlIFwibm90Q29udGFpbnNcIjpcbiAgICAgIGlmICghcnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJlcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RFcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDw9IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJiZXR3ZWVuXCI6IHtcbiAgICAgIGxldCBbbWluLCBtYXhdID0gdmFsdWUuc3BsaXQoXCIsXCIpO1xuICAgICAgbWluID0gcGFyc2VJbnQobWluKTtcbiAgICAgIG1heCA9IHBhcnNlSW50KG1heCk7XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IG1pbiAmJiBydW5UaW1lVmFsdWUgPD0gbWF4KSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNhc2UgXCJyZWdleFwiOiB7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsdWUsIFwiaVwiKTtcbiAgICAgIHJldHVybiByZWdleC50ZXN0KHJ1blRpbWVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkIFwiLCBjb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGVidWdNb2RlID0gKG9vc1JlYXNvbikgPT4ge1xuICBjb25zdCB7REVCVUdfTU9ERSwgT1VUX09GX1NDT1BFfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz1cIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oT1VUX09GX1NDT1BFLCBvb3NSZWFzb24pO1xuICB9XG5cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAxKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAxO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTJcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMjtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0wXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKERFQlVHX01PREUpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IGN1cnJlbnQgPSBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oREVCVUdfTU9ERSkpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCAoY3VycmVudCA/IFwib25cIiA6IFwib2ZmXCIpKTtcbiAgcmV0dXJuIChjdXJyZW50IHx8IDApO1xufTtcblxuLy8gZ2V0IEdBIGNsaWVudCBpZCB1c2luZyBnYS5nZXRBbGwoKVxuZXhwb3J0IGNvbnN0IGdldEdhQ2xpZW50SWQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhID0gd2luZG93LmdhO1xuICAvLyBpZiBnYSBhbmQgZ2EuZ2V0QWxsKCkgaXMgbm90IGRlZmluZWQsIHJldHVybiBudWxsXG4gIGlmIChnYSAmJiBnYS5nZXRBbGwpIHtcbiAgICBjb25zdCB0cmFja2VycyA9IGdhLmdldEFsbCgpO1xuICAgIGlmICh0cmFja2VycyAmJiB0cmFja2Vycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cmFja2Vyc1swXS5nZXQoXCJjbGllbnRJZFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBnZXQgZGV0ZXJtaW5pc3RpYyBudW1lcmljIGhhc2ggZnJvbSBzdHJpbmcgdGhhdCBjb25hdGlucyBvbmx5IG51bWJlcnNcbmV4cG9ydCBjb25zdCBnZXRVbnNlY3VyZUhhc2ggPSAoc3RyKSA9PiB7XG4gIGxldCBoYXNoID0gMDtcbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgfVxuICAvLyByZXR1cm4gYWJzb2x1dGUgdmFsdWVcbiAgcmV0dXJuIE1hdGguYWJzKGhhc2gpO1xufTtcblxuLy8gZ2VuZXJhdGUgYSAzMi1iaXQgcmFuZG9tIGludGVnZXJcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCk7XG59O1xuXG4vLyBnZXQgY3VycmVudCB1bml4IGVwb2NoIHRpbWUgaW4gc2Vjb25kc1xuZXhwb3J0IGNvbnN0IGdldFVuaXhUaW1lID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZXRJZGVudGlmaWVyID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGlkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lEKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGxvY2FsIHN0b3JhZ2VcIiwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYSBpbiBmaXJzdCBhdHRlbXB0XCIsIGlkKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHRyYWN0SWRlbnRpZmllckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYVwiLCBpZCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCByZWFkIEdBIGNsaWVudCBpZFwiKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCA1MDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgaW4gZ2V0SWRlbnRpZmllclwiLCBlKTtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxheSA9IChtcykgPT4gbmV3IFByb21pc2UoKHJlcykgPT4gc2V0VGltZW91dChyZXMsIG1zKSk7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREZWxpdmVyeURhdGUgPSAoZGF0ZSkgPT4ge1xuICBpZiAoIWRhdGUgfHwgdHlwZW9mIGRhdGUgIT09IFwic3RyaW5nXCIpIHJldHVybiBkYXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBzdGFydE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBlbmRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgc3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICBlbmREYXk6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBsZXQgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKS0oW1xcXFxkXSspXFxcXHM/KFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA9PT0gNCkge1xuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbM10udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSByZXN1bHQuc3RhcnRNb250aEluZGV4O1xuICB9IGVsc2Uge1xuICAgIG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspLShbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gubGVuZ3RoICE9PSA1KSByZXR1cm4gZGF0ZTtcblxuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzJdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbNF0udG9Mb3dlckNhc2UoKV07XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIGlmICghcmVzdWx0LnN0YXJ0TW9udGhJbmRleCB8fCAhcmVzdWx0LmVuZE1vbnRoSW5kZXgpIHJldHVybiBkYXRlO1xuXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuICAgIGNvbnN0IGVuZFllYXIgPSByZXN1bHQuZW5kTW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuXG4gICAgY29uc3QgZXN0aW1hdGVkU3RhcnQgPSBuZXcgRGF0ZShzdGFydFllYXIsIHJlc3VsdC5zdGFydE1vbnRoSW5kZXgsIHJlc3VsdC5zdGFydERheSk7XG4gICAgY29uc3QgZXN0aW1hdGVkRW5kID0gbmV3IERhdGUoZW5kWWVhciwgcmVzdWx0LmVuZE1vbnRoSW5kZXgsIHJlc3VsdC5lbmREYXkpO1xuXG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRTdGFydCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZEVuZCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyV2Vla3MgPSBzdGFydERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKHN0YXJ0RGlmZk92ZXJEYXlzIC8gNyk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJXZWVrcyA9IGVuZERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKGVuZERpZmZPdmVyRGF5cyAvIDcpO1xuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID09PSAwKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IC0gJHtlbmREaWZmT3ZlckRheXN9IEfDvG5gO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA+PSAxKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IEfDvG4gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSBlbmREaWZmT3ZlcldlZWtzKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpZGxlVGltZXIgPSBhc3luYyAodGltZU91dCwgY2FsbEJhY2spID0+IHtcbiAgbGV0IGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG5cbiAgd2luZG93LnRvcC5kb2N1bWVudC5vbnRvdWNoc3RhcnQgPSByZXNldFRpbWVyO1xuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0KTtcbiAgICBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlclR5cGUgPSAoKSA9PiB7XG4gIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvY2hyb21lfGNocm9taXVtfGNyaW9zL2kpKSB7XG4gICAgcmV0dXJuIFwiY2hyb21lXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9maXJlZm94fGZ4aW9zL2kpKSB7XG4gICAgcmV0dXJuIFwiZmlyZWZveFwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvc2FmYXJpL2kpKSB7XG4gICAgcmV0dXJuIFwic2FmYXJpXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9vcHJcXC8vaSkpIHtcbiAgICByZXR1cm4gXCJvcGVyYVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvZWRnL2kpKSB7XG4gICAgcmV0dXJuIFwiZWRnZVwiO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyByZWY6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEyOTMxNjMvMjM0M1xuLy8gVGhpcyB3aWxsIHBhcnNlIGEgZGVsaW1pdGVkIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mXG4vLyBhcnJheXMuIFRoZSBkZWZhdWx0IGRlbGltaXRlciBpcyB0aGUgY29tbWEsIGJ1dCB0aGlzXG4vLyBjYW4gYmUgb3ZlcnJpZGVuIGluIHRoZSBzZWNvbmQgYXJndW1lbnQuXG5mdW5jdGlvbiBjc3ZUb0FycmF5KCBzdHJEYXRhLCBzdHJEZWxpbWl0ZXIgKSB7XG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZGVsaW1pdGVyIGlzIGRlZmluZWQuIElmIG5vdCxcbiAgLy8gdGhlbiBkZWZhdWx0IHRvIGNvbW1hLlxuICBzdHJEZWxpbWl0ZXIgPSAoc3RyRGVsaW1pdGVyIHx8IFwiLFwiKTtcblxuICAvLyBDcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcGFyc2UgdGhlIENTViB2YWx1ZXMuXG4gIGNvbnN0IG9ialBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICAgKFxuICAgICAgLy8gRGVsaW1pdGVycy5cbiAgICAgICAgXCIoXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJ8XFxcXHI/XFxcXG58XFxcXHJ8XilcIiArXG5cbiAgICAgICAgICAgICAgLy8gUXVvdGVkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoPzpcXFwiKFteXFxcIl0qKD86XFxcIlxcXCJbXlxcXCJdKikqKVxcXCJ8XCIgK1xuXG4gICAgICAgICAgICAgIC8vIFN0YW5kYXJkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoW15cXFwiXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJcXFxcclxcXFxuXSopKVwiXG4gICAgICApLFxuICAgICAgXCJnaVwiLFxuICApO1xuXG5cbiAgLy8gQ3JlYXRlIGFuIGFycmF5IHRvIGhvbGQgb3VyIGRhdGEuIEdpdmUgdGhlIGFycmF5XG4gIC8vIGEgZGVmYXVsdCBlbXB0eSBmaXJzdCByb3cuXG4gIGNvbnN0IGFyckRhdGEgPSBbW11dO1xuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBpbmRpdmlkdWFsIHBhdHRlcm5cbiAgLy8gbWF0Y2hpbmcgZ3JvdXBzLlxuICBsZXQgYXJyTWF0Y2hlcyA9IG51bGw7XG5cblxuICAvLyBLZWVwIGxvb3Bpbmcgb3ZlciB0aGUgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXNcbiAgLy8gdW50aWwgd2UgY2FuIG5vIGxvbmdlciBmaW5kIGEgbWF0Y2guXG4gIHdoaWxlIChhcnJNYXRjaGVzID0gb2JqUGF0dGVybi5leGVjKCBzdHJEYXRhICkpIHtcbiAgICAvLyBHZXQgdGhlIGRlbGltaXRlciB0aGF0IHdhcyBmb3VuZC5cbiAgICBjb25zdCBzdHJNYXRjaGVkRGVsaW1pdGVyID0gYXJyTWF0Y2hlc1sxXTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZ2l2ZW4gZGVsaW1pdGVyIGhhcyBhIGxlbmd0aFxuICAgIC8vIChpcyBub3QgdGhlIHN0YXJ0IG9mIHN0cmluZykgYW5kIGlmIGl0IG1hdGNoZXNcbiAgICAvLyBmaWVsZCBkZWxpbWl0ZXIuIElmIGlkIGRvZXMgbm90LCB0aGVuIHdlIGtub3dcbiAgICAvLyB0aGF0IHRoaXMgZGVsaW1pdGVyIGlzIGEgcm93IGRlbGltaXRlci5cbiAgICBpZiAoXG4gICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyLmxlbmd0aCAmJlxuICAgICAgICAgICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyICE9PSBzdHJEZWxpbWl0ZXJcbiAgICApIHtcbiAgICAgIC8vIFNpbmNlIHdlIGhhdmUgcmVhY2hlZCBhIG5ldyByb3cgb2YgZGF0YSxcbiAgICAgIC8vIGFkZCBhbiBlbXB0eSByb3cgdG8gb3VyIGRhdGEgYXJyYXkuXG4gICAgICBhcnJEYXRhLnB1c2goIFtdICk7XG4gICAgfVxuXG4gICAgbGV0IHN0ck1hdGNoZWRWYWx1ZTtcblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIGRlbGltaXRlciBvdXQgb2YgdGhlIHdheSxcbiAgICAvLyBsZXQncyBjaGVjayB0byBzZWUgd2hpY2gga2luZCBvZiB2YWx1ZSB3ZVxuICAgIC8vIGNhcHR1cmVkIChxdW90ZWQgb3IgdW5xdW90ZWQpLlxuICAgIGlmIChhcnJNYXRjaGVzWzJdKSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIHF1b3RlZCB2YWx1ZS4gV2hlbiB3ZSBjYXB0dXJlXG4gICAgICAvLyB0aGlzIHZhbHVlLCB1bmVzY2FwZSBhbnkgZG91YmxlIHF1b3Rlcy5cbiAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbMl0ucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKCBcIlxcXCJcXFwiXCIsIFwiZ1wiICksXG4gICAgICAgICAgXCJcXFwiXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIG5vbi1xdW90ZWQgdmFsdWUuXG4gICAgICBzdHJNYXRjaGVkVmFsdWUgPSBhcnJNYXRjaGVzWzNdO1xuICAgIH1cblxuXG4gICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBvdXIgdmFsdWUgc3RyaW5nLCBsZXQncyBhZGRcbiAgICAvLyBpdCB0byB0aGUgZGF0YSBhcnJheS5cbiAgICBhcnJEYXRhW2FyckRhdGEubGVuZ3RoIC0gMV0ucHVzaCggc3RyTWF0Y2hlZFZhbHVlICk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBhcnNlZCBkYXRhLlxuICByZXR1cm4gKCBhcnJEYXRhICk7XG59XG4iLCJpbXBvcnQge0xPR19BUElfVVJMfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2dldFVuc2VjdXJlSGFzaH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlTW9uaXRvclwiKTtcbmNvbnN0IEhFQURFUlMgPSB7XG4gIHR5cGU6IFwidGV4dC9wbGFpblwiLFxufTtcblxuZXhwb3J0IGNsYXNzIE1vbml0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIG1vbml0b3JcIik7XG5cbiAgICB0aGlzLmFIYXNoID0gbnVsbDtcbiAgICB0aGlzLmVIYXNoID0gbnVsbDtcbiAgICB0aGlzLmZIYXNoID0gbnVsbDtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBBdHRlbXB0cyB0byBzZW5kIHRoZSBpbml0aWFsIGxvZyBib2R5IChiZWFnbGVJbmZvTGF5ZXIncyBpbml0aWFsIHBvcHVsYXRpb24pIGltbWVkaWF0ZWx5XG4gIGFzeW5jIHNlbmRMb2dzKGltbWVkaWF0ZSkge1xuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBpbW1lZGlhdGUgc2VuZGluZyBibG9ja1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBtYWtlIGJlYWdsZWluZm9sYXllciBhY2Nlc3MgdG8gdHJhY2sgY2hhbmdlcyBhbmQga2VlcCBhIGhpZ2ggd2F0ZXIgbWFyayB0byB1bmRlcnN0YW5kIGNoYW5nZXNcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gYXdhaXRpbmcgc2NyYXBpbmdcIik7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlLCA1MCwgMTAwMCk7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIHNlbmRpbmcgbG9nc1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNlbmQgaW5pdGlhbCBsb2cgYm9keSBhbmQgaW5jcmVtZW50YWwgdXBkYXRlIGxvZ3Mgb24gY2xvc2VcbiAgYXN5bmMgaGFuZGxlQ2xvc2VFdmVudCgpIHtcbiAgICAvLyBpZiBpbml0aWFsIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHNlbmQgdXBkYXRlcyBhbmQgaW5mb2xheWVyIGluIG9uZSBiYXRjaFxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIC8vIGlmIG1haW4gbG9nIGhhcyBiZWVuIHNlbnQsIHNlbmQgaW5jcmVtZW50YWwgdXBkYXRlcyBvbmx5XG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpO1xuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlTWFpbkxvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlTWFpbkxvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXF1ZXN0IGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCkge1xuICAgIGlmICghdGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc1VwZGF0ZXNTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHRoZXJlIGlzIG5vIGluY3JlbWVudGFsIHlldFxuICAgICAgLy8gb3IgaWYgdGhlIHVwZGF0ZXMgaGF2ZSBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNDaGFuZ2VkID0gYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZ3MgY2hhbmdlIHN0YXR1czogXCIsIGhhc0NoYW5nZWQpO1xuICAgIGlmICghaGFzQ2hhbmdlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nRGF0YSA9IGF3YWl0IHRoaXMucGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpO1xuICAgIGlmIChsb2dEYXRhKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2VuZGluZyBpbmNyZW1lbnRhbCBsb2dzXCIsIGxvZ0RhdGEpO1xuICAgICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhsb2dEYXRhKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVBcnJpdmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIG9yIGFycml2YWwgbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZUFycml2YWxMb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGtlZXAgcHJldmlvdXMgaGFzaGVzIGFuZCBjb21wdXRlIGN1cnJlbnQgZm9yIGEsIGUsIGYgYW5kIHJldHVybiB0cnVlIGlmIGFueSBvZiB0aGVtIGhhdmUgY2hhbmdlZFxuICBhc3luYyBjaGVja0ZvckxhdGVzdENoYW5nZXMoKSB7XG4gICAgY29uc3QgW2EsIGUsIGZdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJmXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgW2FIYXNoLCBlSGFzaCwgZkhhc2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0VW5zZWN1cmVIYXNoKEpTT04uc3RyaW5naWZ5KGEpKSxcbiAgICAgIGdldFVuc2VjdXJlSGFzaChKU09OLnN0cmluZ2lmeShlKSksXG4gICAgICBnZXRVbnNlY3VyZUhhc2goSlNPTi5zdHJpbmdpZnkoZikpLFxuICAgIF0pO1xuXG4gICAgbGV0IGhhc0NoYW5nZWQgPSBmYWxzZTtcblxuICAgIGlmIChhSGFzaCAhPT0gdGhpcy5hSGFzaCB8fFxuICAgICAgICBlSGFzaCAhPT0gdGhpcy5lSGFzaCB8fFxuICAgICAgICBmSGFzaCAhPT0gdGhpcy5mSGFzaCkge1xuICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hSGFzaCA9IGFIYXNoO1xuICAgIHRoaXMuZUhhc2ggPSBlSGFzaDtcbiAgICB0aGlzLmZIYXNoID0gZkhhc2g7XG5cbiAgICByZXR1cm4gaGFzQ2hhbmdlZDtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbdXJsLCBoYXNoLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAwLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIHU6IHVybCxcbiAgICAgIG9uSGFzaFBjdDogaGFzaCxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VNYWluTG9nRGF0YSgpIHtcbiAgICBjb25zdCBib2R5ID0ge307XG4gICAgaWYgKCF3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMod2luZG93LmJlYWdsZUluZm9MYXllcikpIHtcbiAgICAgIGlmICgha2V5LnN0YXJ0c1dpdGgoXCJfXCIpICYmIHZhbHVlICE9PSBudWxsKSBib2R5W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgYm9keS5sYyA9IDE7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFthLCBlLCBmLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZlwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAyLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIGEsIGUsIGYsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBleGl0IGV2ZW50IGxpc3RlbmVyXCIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBiZWZvcmV1bmxvYWQgZXZlbnRcIik7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIHBhZ2VoaWRlIGV2ZW50XCIpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgfVxuXG4gIHF1ZXVlTG9ncyhsb2dEYXRhKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fCB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZmV0Y2goTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgY29uc3QgcXVldWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghcXVldWVkKSBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3MgcXVldWVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgaWYgKCFxdWV1ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3Mgbm90IHF1ZXVlZFwiKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb25pdG9yO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRGF0YUxheWVyUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gYXdhaXQgZGF0YUxheWVyRmluZGVyKG9wZXJhdG9yKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRhTGF5ZXJGaW5kZXIgPSBhc3luYyAoa2V5KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJTZWFyY2hpbmcgYmVhZ2xlSW5mb0xheWVyIGZvciBrZXkgXCIsIGtleSk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5LCB0cnVlLCAyNSwgMTAwMCk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlLCBzZWxlY3Rvciwgc2VsZWN0b3JBbGwsIHNlbGVjdG9yRmFsbGJhY2sgPSBudWxsfSA9IHJ1bGU7XG4gIGxldCBtYWluU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBtYWluU2VsZWN0b3IgPSBzZWxlY3RvckZhbGxiYWNrID8gc2VsZWN0b3JGYWxsYmFjayA6IG1haW5TZWxlY3RvcjtcbiAgfVxuXG4gIGlmIChvcGVyYXRvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgfVxuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHNlbGVjdG9yQWxsICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCBlbGVtZW50O1xuICBpZiAobWFpblNlbGVjdG9yKSBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3Rvcik7XG4gIGVsc2UgaWYgKHNlbGVjdG9yQWxsKSBlbGVtZW50ID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRleHQtbnVtYmVyXCI6IHtcbiAgICAgIGxldCB0ZW1wVmFsO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgdGVtcFZhbCA9IGVsZW1lbnQucmVkdWNlKChyZXR1cm5WYWwsIGVsZW0pID0+IHtcbiAgICAgICAgICByZXR1cm5WYWwgKz0gcGFyc2VJbnQoZWxlbS50ZXh0Q29udGVudC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFZhbCA9IHBhcnNlSW50KHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLnRleHRDb250ZW50XG4gICAgICAgICAgICAucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHBhcnNlSW50KHRlbXBWYWwpO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcImNsYXNzTGlzdFwiOlxuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJjb3VudFwiOiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiBlbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudC5sZW5ndGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDEsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgXCJzdHlsZVwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN0eWxlS2V5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN0eWxlVmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudFN0eWxlc1tzdHlsZUtleV07XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgc3R5bGVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiT3BlcmF0b3Igbm90IGRlZmluZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRnVuY3Rpb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tGdW5jdGlvblJ1bGUgPSAocnVsZSwgb3B0cykgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge3Byb2R1Y3RJbmZvfSA9IG9wdHMgfHwge307XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZSwgYmluZGluZ3N9ID0gcnVsZTtcbiAgaWYgKCFvcGVyYXRvcikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJSdWxlIGZ1bmN0aW9uIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBsZXQgY29udGV4dCA9IHt9O1xuICBpZiAoYmluZGluZ3MgPT0gXCJwcm9kdWN0SW5mb1wiKSB7XG4gICAgY29udGV4dCA9IHtcbiAgICAgIHByb2R1Y3RJbmZvLFxuICAgIH07XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpLmJpbmQoY29udGV4dCk7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IHJ1bGVGdW5jdGlvbigpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVTZXNzaW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrU2Vzc2lvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZHVyYXRpb25cIjpcbiAgICAgIHJldHVybiBkdXJhdGlvbkhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImhpc3RvcnlcIjpcbiAgICAgIHJldHVybiBoaXN0b3J5SGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlc3Npb25UaW1lc3RhbXAgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fVElNRVNUQU1QKSkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBzZXNzaW9uIHRpbWVzdGFtcFwiLCBlcnIpO1xuICAgIHJldHVybiBEYXRlLm5vdygpO1xuICB9XG59O1xuXG5jb25zdCBkdXJhdGlvbkhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBkdXJhdGlvbiA9IChEYXRlLm5vdygpIC0gZ2V0U2Vzc2lvblRpbWVzdGFtcCgpKSAvIDEwMDA7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGR1cmF0aW9uLCBjb25kaXRpb24sIHBhcnNlSW50KHZhbHVlKSk7XG59O1xuXG5jb25zdCBoaXN0b3J5SGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRIaXN0b3J5ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9ISVNUT1JZKT8uc3BsaXQoXCIsXCIpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihjdXJyZW50SGlzdG9yeSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVVybENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1VybFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJwYXRoXCI6IHtcbiAgICAgIGNvbnN0IHJlcXVlc3RVUkw9IHdpbmRvdy50b3AubG9jYXRpb24uaHJlZjtcbiAgICAgIGNvbnN0IHBhdGggPSBuZXcgVVJMKHJlcXVlc3RVUkwpLnBhdGhuYW1lO1xuICAgICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgcGF0aCAke3BhdGh9IG1hdGNoZXMgcnVsZSBwYXRoICR7dmFsdWV9YCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihwYXRoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUll9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVudkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VudlJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkZXZpY2VfdHlwZVwiOiB7XG4gICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcyA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGlzTW9iaWxlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVQcm9kdWN0SW5mb0NoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Byb2R1Y3RJbmZvUnVsZSA9IChydWxlLCBiaW5kaW5ncykgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHtwcm9kdWN0SW5mb30gPSBiaW5kaW5ncztcbiAgaWYgKCFwcm9kdWN0SW5mbyB8fCAodHlwZW9mIHByb2R1Y3RJbmZvID09PSBcIm9iamVjdFwiICYmICFPYmplY3Qua2V5cyhwcm9kdWN0SW5mbykubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgY29uc3Qgc2t1ID0gcHJvZHVjdEluZm9bT2JqZWN0LmtleXMocHJvZHVjdEluZm8pWzBdXT8uaWQ7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBUcmFuc2FjdGlvbkNvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBnZXRUcmFuc2FjdGlvbkNvdW50KHNrdSwgcHJvZHVjdEluZm8pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gZ2V0QWRkVG9DYXJ0Q291bnQoc2t1LCBwcm9kdWN0SW5mbyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInByb2R1Y3RWaWV3Q291bnRcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gZ2V0UHJldmlld0NvdW50KHNrdSwgcHJvZHVjdEluZm8pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbkNvdW50ID0gKHNrdSwgcHJvZHVjdEluZm8pID0+IHtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbyAmJiBwcm9kdWN0SW5mb1tza3VdKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvW3NrdV0/LmNhdGFsb2c/LnRyYW5zYWN0aW9uSW4yV2Vla3M7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSAoc2t1LCBwcm9kdWN0SW5mbykgPT4ge1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvICYmIHByb2R1Y3RJbmZvW3NrdV0pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm9bc2t1XT8uY2F0YWxvZz8uYWRkVG9DYXJ0SW4yV2Vla3M7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0UHJldmlld0NvdW50ID0gKHNrdSwgcHJvZHVjdEluZm8pID0+IHtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbyAmJiBwcm9kdWN0SW5mb1tza3VdKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvW3NrdV0/LmNhdGFsb2c/LnByb2R1Y3RWaWV3Q291bnQ7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcbiIsImltcG9ydCB7Y2hlY2tEYXRhTGF5ZXJSdWxlfSBmcm9tIFwiLi9kYXRhTGF5ZXJDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRWxlbWVudFJ1bGV9IGZyb20gXCIuL2VsZW1lbnRDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRnVuY3Rpb25SdWxlfSBmcm9tIFwiLi9mdW5jdGlvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tTZXNzaW9uUnVsZX0gZnJvbSBcIi4vc2Vzc2lvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tVcmxSdWxlfSBmcm9tIFwiLi91cmxDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRW52UnVsZX0gZnJvbSBcIi4vZW52Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Byb2R1Y3RJbmZvUnVsZX0gZnJvbSBcIi4vcHJvZHVjdEluZm9DaGVja2VyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSdWxlRW5naW5lXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlRW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVzLCBiYXNlUnVsZVNldCwgYmluZGluZ3N9ID0gYm9keTtcbiAgICB0aGlzLmJhc2VSdWxlU2V0ID0gYmFzZVJ1bGVTZXQ7XG4gICAgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzID0gZWxpZ2liaWxpdHlSdWxlcztcbiAgICB0aGlzLmJpbmRpbmdzID0gYmluZGluZ3M7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUsIHRoaXMuYmluZGluZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSwgdGhpcy5iaW5kaW5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZDtcbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmVsaWdpYmlsaXR5UnVsZXMpKSB7XG4gICAgICBjb25zdCBzYXRpc2ZpZWRSdWxlSWRzID0gW107XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpKSB7XG4gICAgICAgICAgc2F0aXNmaWVkUnVsZUlkcy5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgLy8gUGFnZSB0eXBlIHJ1bGVzIGFyZSBleGNsdXNpdmU7IGlmIG9uZSBpcyB0cnVlIGFsbCBvdGhlcnMgYXJlIGZhbHNlIGJ5IGRlZmF1bHQsIG5vIG5lZWQgdG8gYXNzZXNzIG90aGVyc1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBlUnVsZXMuJHtrZXl9YCwgc2F0aXNmaWVkUnVsZUlkcyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJTZWdtZW50YXRpb25Db21wdXRlclwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpIHtcbiAgbG9nZ2VyLmxvZyhcIkRldGVybWluaW5nIHVzZXIgc2VnbWVudFwiKTtcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgaWYgKCFydWxlU2V0KSBjb250aW51ZTtcbiAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXSwgYmluZGluZ3M6IG51bGx9KTtcbiAgICBpZiAoYXdhaXQgc2VnbWVudFJ1bGVFbmdpbmUuY2hlY2tSdWxlcygpKSB7XG4gICAgICBsb2dnZXIubG9nKGBVc2VyIHNlZ21lbnQgbWF0Y2hlZDogJHtzZWdtZW50fWApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgcmV0dXJuIHNlZ21lbnQ7XG4gICAgfVxuICB9XG5cbiAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZCwgcmV0dXJuaW5nIGRlZmF1bHRcIik7XG4gIHJldHVybiBcImRlZmF1bHRcIjtcbn1cbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVMsIFRSRUFUTUVOVFNfRFVSQVRJT059IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7ZmV0Y2hUcmVhdG1lbnRzLCBmZXRjaFRyZWF0bWVudFdlaWdodHN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5XCIpO1xuXG5jbGFzcyBUcmVhdG1lbnRSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IGJvZHk7XG4gICAgdGhpcy50cmVhdG1lbnRzID0gdHJlYXRtZW50cztcblxuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFRSRUFUTUVOVFMpKTtcbiAgICBsZXQgdHJlYXRtZW50cyA9IHRyZWF0bWVudHNPYmo/LnRyZWF0bWVudHM7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdHJlYXRtZW50c09iaj8udGltZXN0YW1wO1xuICAgIGlmICghdHJlYXRtZW50cyB8fCAhdGltZXN0YW1wKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBub3QgZm91bmQgaW4gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgIH07XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICB9XG4gICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgZWxhcHNlZERheXMgPSAoRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDAgKiAyNCk7XG4gICAgICBpZiAoZWxhcHNlZERheXMgPiBUUkVBVE1FTlRTX0RVUkFUSU9OKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIGFyZSBleHBpcmVkXCIpO1xuICAgICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgIHRyZWF0bWVudHMsXG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXRjaGVkVHJlYXRtZW50cygpIHtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gdGhpcy50cmVhdG1lbnRXZWlnaHRzO1xuICAgIGNvbnN0IHVzZXJHcm91cCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSB0aGlzLnRyZWF0bWVudHM7XG4gICAgaWYgKHRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgIGNvbnN0IHVzZXJHcm91cFdlaWdodHMgPSAodXNlckdyb3VwICYmIHRyZWF0bWVudFdlaWdodHNbdXNlckdyb3VwXSkgP1xuICAgICAgdHJlYXRtZW50V2VpZ2h0c1t1c2VyR3JvdXBdIDogdHJlYXRtZW50V2VpZ2h0c1tcImRlZmF1bHRcIl07XG4gICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0cmVhdG1lbnRzKSB7XG4gICAgICAgIHRyZWF0bWVudC53ZWlnaHQgPSB1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudD8uaWRdPy53ZWlnaHQgfHwgMDtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnQuYWN0aW9ucy5zb21lKChhKSA9PiBhLnZhcmlhbnRzKSkgY29udGludWU7XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIHRyZWF0bWVudC5hY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24udmFyaWFudHMpIGNvbnRpbnVlO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudEtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb24udmFyaWFudHMpKSB7XG4gICAgICAgICAgICBpZiAodXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50cyAmJiB1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSB1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudC5pZF0udmFyaWFudHNbdmFyaWFudEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhgJHt0cmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIGdyb3VwIG1hdGNoZWRgKTtcbiAgICBpZiAoIXRyZWF0bWVudHMubGVuZ3RoKSByZXR1cm4gW107XG4gICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJlYXRtZW50UmVwb3NpdG9yeTtcbiIsImltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiUmVwbGFjZVV0aWxzXCIpO1xuXG5jb25zdCByZXBsYWNlciA9IGFzeW5jICh2YWx1ZSwgcmVwbGFjZUZuKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgW2ksIHZhbF0gb2YgdmFsdWUuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjdXJyZW50UmVwbGFjZUZuID0gQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pID8gcmVwbGFjZUZuW2ldIDogcmVwbGFjZUZuIHx8IFwiXCI7XG4gICAgICBpZiAodHlwZW9mIGN1cnJlbnRSZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IoY3VycmVudFJlcGxhY2VGbik7XG4gICAgICAgIHZhbHVlW2ldID0gcmVwbGFjZUFsbCh2YWwsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWVbaV0gPSByZXBsYWNlRm5FeGVjdXRvcihjdXJyZW50UmVwbGFjZUZuLCB2YWwpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlcGxhY2VGbikpIHtcbiAgICBmb3IgKGNvbnN0IHJGbiBvZiByZXBsYWNlRm4pIHtcbiAgICAgIGlmICh0eXBlb2YgckZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJGbik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IockZuLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgcmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pO1xuICAgICAgdmFsdWUgPSByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUsIHNpbmdsZSA9IGZhbHNlKSB7XG4gIGlmIChyZXBsYWNlRm4gJiYgdmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSkge1xuICAgIGxvZ2dlci5sb2coXCJFeGVjdXRpbmcgcmVwbGFjZSBmdW5jdGlvbjogXCIsIHJlcGxhY2VGbik7XG4gICAgY29uc3QgcmVwbGFjZUZ1bmN0aW9uID0gRnVuY3Rpb24ocmVwbGFjZUZuKTtcbiAgICBpZiAoc2luZ2xlKSByZXR1cm4gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgICByZXR1cm4gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbikge1xuICBjb25zdCB7c3RvcmFnZSwga2V5LCBrZXlGYWxsYmFjaywgdHlwZX0gPSByZXBsYWNlRm47XG4gIHN3aXRjaCAoc3RvcmFnZSkge1xuICAgIGNhc2UgXCJzZXNzaW9uXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gbnVsbDtcbiAgICAgIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5RmFsbGJhY2spO1xuICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXBsYWNlVmFsID0gSlNPTi5wYXJzZShyZXBsYWNlVmFsKTtcbiAgICAgICAgICByZXBsYWNlVmFsID0gcmVwbGFjZVZhbFtyZXBsYWNlVmFsLmxlbmd0aCAtIDFdW3R5cGVdO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZCBub3QgcGFyc2UgJHtyZXBsYWNlVmFsfWApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gICAgY2FzZSBcImluZm8tbGF5ZXJcIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleUZhbGxiYWNrKTtcbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlcjtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJBY3Rpb25Db25kaXRpb25VdGlsc1wiKTtcblxuY29uc3QgY2hlY2tBY3Rpb25Db25kaXRpb24gPSAoY29uZGl0aW9uLCBwcm9kdWN0SW5mbykgPT4ge1xuICBjb25zdCB7YXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIG9wZXJhdG9yLCBzZWxlY3RvciwgdHlwZSwgdmFsdWV9ID0gY29uZGl0aW9uO1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6IHtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBjb25kaXRpb25FbGVtZW50cykge1xuICAgICAgICBjb25zdCBlbGVtZW50U2t1ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltlbGVtZW50U2t1XT8uY2F0YWxvZz8uW29wZXJhdG9yXTtcbiAgICAgICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUHJvZHVjdCBpbmZvIGlzIGVtcHR5XCIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSBjb250aW51ZTtcbiAgICAgICAgZWxpZ2libGVFbGVtZW50cy5wdXNoKCQoZWxlbWVudCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tBY3Rpb25Db25kaXRpb247XG4iLCJpbXBvcnQge3N0eWxlQXBwbGljYXRvciwgZGVsYXksIGlkbGVUaW1lcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge3JlcGxhY2VBbGwsIHR1cmtpc2hUb0xvd2VyfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgSURMRV9USU1FT1VUfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgcmVwbGFjZXIgZnJvbSBcIi4vcmVwbGFjZS11dGlsc1wiO1xuaW1wb3J0IGNoZWNrQWN0aW9uQ29uZGl0aW9uIGZyb20gXCIuL2FjdGlvbi1jb25kaXRpb24tdXRpbFwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMsIGJpbmRpbmdzKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVBcHBseUFjdGlvbnNcIik7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUd9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHtwcm9kdWN0SW5mb30gPSBiaW5kaW5ncztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYWN0aW9uOiBcIiwgSlNPTi5zdHJpbmdpZnkoYWN0aW9uKSk7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBhdHRyaWJ1dGUsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4sIHByb2R1Y3RJbmZvKTtcbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlbW92aW5nOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJDYW5ub3QgZm91bmQgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5zZXJ0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmVmb3JlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBiZWZvcmU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgaWYgKFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoXCJuZC1hZGQtdG8td2luXCIpKSB7XG4gICAgICAgICAgICAkKFwiLm5kLWFkZC10by13aW5cIikucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFmdGVyXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBhZnRlcjogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFmdGVyKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBlbmRpbmcgdmFsdWU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW9kYWxcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50Lm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAoZWxtID09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNwbGF5TW9kYWwodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwb3B1cFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJQb3B1cCBhbHJlYWR5IGRpc3BsYXllZCBpbiBzZXNzaW9uXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBQb3B1cDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwVHlwZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGdldFByb2R1Y3RJbmZvKHByb2R1Y3RJbmZvLCBwVHlwZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzZXRhdHRyaWJ1dGVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgICBjYXNlIFwic3JjXCI6XG4gICAgICAgICAgZWxlbWVudC5jc3MoXCJjb250ZW50XCIsIGB1cmwoJHt2YWx1ZS50cmltKCl9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG5cbiAgICAgICAgICBlbGVtZW50LmNzcyhwcm9wZXJ0eSwgcHJvcGVydHlWYWx1ZSwgXCIhaW1wb3J0YW50XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmhhbmRsZWQgYXR0cmlidXRlOiBTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzb3VyY2UucmVtb3ZlKCk7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBnZXRQcm9kdWN0SW5mbyhwcm9kdWN0SW5mbywgcFR5cGUsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYmVmb3JlKHJlcyk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJ0ZXh0LXRyYW5zZm9ybVwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNhcGl0YWxpemVcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBBcnJheS5mcm9tKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoZS5pbm5lclRleHQ/LmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpLnNwbGl0KFwiXFxuXCIpLm1hcCgoc2VudGVuY2UpID0+XG4gICAgICAgICAgICAgICAgc2VudGVuY2Uuc3BsaXQoXCIgXCIpLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICApLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dClcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIG9wZXJhdG9yIGV4aXN0cyB5ZXRcIiwgb3BlcmF0b3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXBsYWNlV2l0aFZhbCA9ICh2YWx1ZSwgaHRtbFN0cikgPT4ge1xuICAgIGlmICh2YWx1ZSAmJiBodG1sU3RyLmluY2x1ZGVzKFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIikpIHtcbiAgICAgIGh0bWxTdHIgPSByZXBsYWNlQWxsKGh0bWxTdHIsIFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIiwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbFN0cjtcbiAgfTtcbiAgY29uc3QgZ2V0UHJvZHVjdEluZm8gPSAocHJvZHVjdEluZm8sIHR5cGUsIHZhbHVlKSA9PiB7XG4gICAgLy8gZ2V0IGtleXMgb2YgcHJvZHVjdEluZm9cbiAgICBjb25zdCBza3VMaXN0ID0gT2JqZWN0LmtleXMocHJvZHVjdEluZm8pO1xuICAgIGxldCByZXMgPSBudWxsO1xuICAgIGlmICghc2t1TGlzdCB8fCBza3VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nZ2VyLmxvZyhcIk5vIHNrdSBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50U2t1ID0gc2t1TGlzdFswXTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm9bZWxlbWVudFNrdV0uY2F0YWxvZy50cmFuc2FjdGlvbkluMldlZWtzPy50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm9bZWxlbWVudFNrdV0uY2F0YWxvZy50cmFuc2FjdGlvbkluMldlZWtzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mb1tlbGVtZW50U2t1XS5jYXRhbG9nLmFkZFRvQ2FydEluMldlZWtzPy50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvW2VsZW1lbnRTa3VdLmNhdGFsb2cuYWRkVG9DYXJ0SW4yV2Vla3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm9bZWxlbWVudFNrdV0uY2F0YWxvZy5wcm9kdWN0Vmlld0NvdW50Py50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3JcIiwgcHJvZHVjdEluZm9bZWxlbWVudFNrdV0uY2F0YWxvZy5wcm9kdWN0Vmlld0NvdW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwibm8gc3VjaCB0eXBlIGZvdW5kIGZvciBwcm9kdWN0SW5mb0xvb2t1cCBvcGVyYXRvcjogXCIrIHR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICBjb25zdCBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlID0gYXN5bmMgKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRUaXRsZXMgPSAhQXJyYXkuaXNBcnJheSh0aXRsZXMpID8gW3RpdGxlc10gOiB0aXRsZXM7XG4gICAgZm9yIChjb25zdCBwYXJzZWRUaXRsZSBvZiBwYXJzZWRUaXRsZXMpIHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gcGFyc2VkVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICBpZiAoaWQgJiYgaWQgPT09IFwibmQtcG9wdXBfX3dyYXBwZXJcIikge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5jb250YWlucyhcIm5kLW1vZGFsX193cmFwcGVyXCIpKSB7XG4gICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UG9wdXAgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgPiAwKSByZXR1cm47XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDEpO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuXG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfSwgMTUwMDApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNb2RhbCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikpIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBvcHVwID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIGlzTW9kYWw9ZmFsc2UpID0+IHtcbiAgICAvLyBDcmVhdGUgcG9wdXAgd3JhcHBlclxuICAgIGNvbnN0IHBvcHVwV3JhcHBlciA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtcG9wdXBfX3dyYXBwZXJcIik7XG4gICAgaWYgKGlzTW9kYWwpIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtbW9kYWxfX3dyYXBwZXJcIik7XG4gICAgaWYgKCFpc01vZGFsKSBwb3B1cFdyYXBwZXIuaWQgPSBcIm5kLXBvcHVwX193cmFwcGVyXCI7XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uU3R5bGUgPSBpc01vZGFsID8gXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlX19jb2xvcmVkXCIgOiBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VcIjtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQocG9wdXBDbG9zZUJ1dHRvblN0eWxlKTtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGlmIChpc01vZGFsKSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudFNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRlbnRTZWxlY3RvcikpO1xuICAgICAgd2hpbGUgKHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikgJiYgY29udGVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCBjb250ZW50cy5zaGlmdCgpLnNyYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGZyb20gYWN0aW9uIGFuZCBhcHBlbmQgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgdGVtcGxhdGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB2YWx1ZS50cmltKCk7XG4gICAgY29uc3QgcG9wdXAgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZUJ1dHRvbik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgIC8vIFJlbW92ZSBvbGQgcG9wdXAgaWYgZXhpc3RzIGJlZm9yZSBhcHBlbmRpbmcgbmV3IG9uZVxuICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dhcE5vZGVzID0gZnVuY3Rpb24gc3dhcE5vZGVzKG4xLCBuMikge1xuICAgIGNvbnN0IHAxID0gbjEucGFyZW50Tm9kZTtcbiAgICBjb25zdCBwMiA9IG4yLnBhcmVudE5vZGU7XG4gICAgbGV0IGkxO1xuICAgIGxldCBpMjtcblxuICAgIGlmICghcDEgfHwgIXAyIHx8IHAxLmlzRXF1YWxOb2RlKG4yKSB8fCBwMi5pc0VxdWFsTm9kZShuMSkpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMS5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMSkpIHtcbiAgICAgICAgaTEgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDIuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjIpKSB7XG4gICAgICAgIGkyID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcbiAgICAgIGkyKys7XG4gICAgfVxuICAgIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcbiAgICBwMi5pbnNlcnRCZWZvcmUobjEsIHAyLmNoaWxkcmVuW2kyXSk7XG4gIH07XG5cbiAgY29uc3Qgd2FpdEZvckpRdWVyeSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghd2luZG93LmpRdWVyeSkge1xuICAgICAgICBsb2dnZXIubG9nKFwialF1ZXJ5IG5vdCBmb3VuZCwgcmV0cnlpbmdcIik7XG4gICAgICAgIGNvbnN0IGpRdWVyeUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWN0aW9uQXBwbGljYXRvciA9IGFzeW5jIChhY3Rpb25zKSA9PiB7XG4gICAgaWYgKGF3YWl0IHdhaXRGb3JKUXVlcnkoKSkge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoYWN0aW9uLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IGNoZWNrQWN0aW9uQ29uZGl0aW9uKGFjdGlvbi5jb25kaXRpb24sIHByb2R1Y3RJbmZvKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGlnaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCk7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbik7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkbid0IGFwcGx5IGFjdGlvbiAke0pTT04uc3RyaW5naWZ5KGFjdGlvbil9IHdpdGggZXJyb3IgJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJKcXVlcnkgbm90IGZvdW5kIG9uIHdpbmRvd1wiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQXBwbHkgYWN0aW9uc1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBhY3Rpb25BcHBsaWNhdG9yKGFjdGlvbnMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGRlZmF1bHQgYXBwbHlBY3Rpb25zO1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgYXBwbHlBY3Rpb25zIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRyZWF0bWVudCxcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkRGF0YUxpc3RlbmVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBUUkVBVE1FTlRfUkFUSU8sXG4gIE1PQklMRV9NRURJQV9RVUVSWSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZGV0ZXJtaW5lUGN0LFxuICBwcmVwYXJlQWN0aW9ucyxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSb2JvdEVuZ2luZVwiKTtcbmNvbnN0IE9CU0VSVkVSX0NPTkZJRyA9IHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2JvdEVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7bWFpblByb2R1Y3RJbmZvLCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cywgZGVidWdNb2RlLCBtYXRjaGVkVHJlYXRtZW50cywgaWRlbnRpZmllciwgcGFnZVR5cGV9ID0gYm9keTtcbiAgICB0aGlzLmVuZ2FnZW1lbnRMb2NrID0ge307XG4gICAgdGhpcy5wYWdlVHlwZSA9IHBhZ2VUeXBlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gZGVidWdNb2RlO1xuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgdGhpcy5yZUFwcGx5VHJlYXRtZW50c01hcCA9IHt9O1xuICAgIHRoaXMubWFpblByb2R1Y3RJbmZvID0gbWFpblByb2R1Y3RJbmZvO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIHJlYXBwbHlfZXZlbnQsXG4gICAgICByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgICAgcHJvZHVjdEluZm9TdG9yYWdlLFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwLFxuICAgICAgbWFpblByb2R1Y3RJbmZvLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBwYWdlVHlwZSxcbiAgICAgIHByZXBhcmVBbmRBcHBseSxcbiAgICB9ID0gdGhpcztcblxuICAgIC8vIG9uZSBlbmdhZ2VtZW50IGF0IGEgdGltZVxuICAgIGlmIChlbmdhZ2VtZW50TG9ja1tpZF0pIHtcbiAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBlbmdhZ2VtZW50IGluIHByb2dyZXNzLCBza2lwcGluZ2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSB0cnVlO1xuXG4gICAgaWYgKGRlYnVnTW9kZSAhPT0gMSAmJiAhd2VpZ2h0ICYmICFkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyAmJiAhZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdtb2JpbGUnIG1pc21hdGNoXCIpO1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnZGVza3RvcCcgbWlzbWF0Y2hcIik7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwcm9kdWN0SW5mbyA9IG1haW5Qcm9kdWN0SW5mbztcbiAgICBpZiAocGFnZVR5cGUgIT09IFwiYmFza2V0XCIgJiYgcHJvZHVjdEluZm9TdG9yYWdlID09PSBcImJhc2tldFwiKSB7XG4gICAgICBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RCYXNrZXRMb29rdXBcIiwgdHJ1ZSwgNTAsIDUwMCk7XG4gICAgfVxuICAgIGlmICgoIXByb2R1Y3RJbmZvIHx8ICFPYmplY3Qua2V5cyhwcm9kdWN0SW5mbykubGVuZ3RoKSAmJlxuICAgIFtcIlByb2R1Y3RwYWdlXCIsIFwiYmFza2V0XCIsIFwiTGlzdGluZ3BhZ2VcIl0uaW5jbHVkZXMocGFnZVR5cGUpKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmV0cnkgZ2V0IHByb2R1Y3QgaW5mbyBmcm9tIGluZm9MYXllclwiKTtcbiAgICAgIGlmIChwYWdlVHlwZSAhPT0gXCJiYXNrZXRcIiAmJiBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIpIHtcbiAgICAgICAgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0QmFza2V0TG9va3VwXCIsIHRydWUsIDUwLCA1MDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlTG9va3VwXCIsIHRydWUsIDUwLCA1MDApO1xuICAgICAgICB0aGlzLm1haW5Qcm9kdWN0SW5mbyA9IHByb2R1Y3RJbmZvO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJpbmRpbmdzID0ge3Byb2R1Y3RJbmZvfTtcbiAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZVNldCB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxldCB0cmVhdG1lbnRTa2lwUmF0aW8gPSB3ZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gd2VpZ2h0IHx8IFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICBpZiAoZGVwZW5kYW50X29uX3RyZWF0bWVudCkge1xuICAgICAgICAvLyBJZiBkZXBlbmRhbnQgb24gdHJlYXRtZW50IGlzIGZvdW5kIGFuZCBoYXMgd2VpZ2h0OyB1c2UgaXRzIHNraXAgcmF0aW9cbiAgICAgICAgY29uc3QgZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQgPSBtYXRjaGVkVHJlYXRtZW50cy5maW5kKCh0KSA9PiB0LmlkID09PSBkZXBlbmRhbnRfb25fdHJlYXRtZW50KT8ud2VpZ2h0O1xuICAgICAgICB0cmVhdG1lbnRTa2lwUmF0aW8gPSBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCB8fFxuICAgICAgICAgIFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICB9XG4gICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IHNraXAgcmF0aW86IFwiICsgdHJlYXRtZW50U2tpcFJhdGlvKTtcbiAgICAgIC8vIERldGVybWluaW5nIGlkZW50aWZpZXIgZm9yIGNhbGN1bGF0aW5nIHRyZWF0bWVudCBwZXJjZW50YWdlICh0cmVhdG1lbnRQY3QpXG4gICAgICBjb25zdCBkZXRlcm1pbmluZ0lkZW50aWZpZXIgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50IHx8IGlkO1xuXG4gICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgdGhlIHBlcmNlbnRhZ2UgdmFsdWUgZm9yIHRoZSB0cmVhdG1lbnQgdXNlZCB0byBkZXRlcm1pbmUgaWYgaXQgc2hvdWxkIGJlIHNraXBwZWQgb3Igbm90XG4gICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgMTAwIHdoZW4gZGVidWcgbW9kZSBpcyAxLCBlbnN1cmluZyBubyB0cmVhdG1lbnRzIGFyZSBza2lwcGVkXG4gICAgICBjb25zdCB0cmVhdG1lbnRQY3QgPSBkZWJ1Z01vZGUgPT09IDEgPyAxMDAgOiBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIGRldGVybWluaW5nSWRlbnRpZmllcik7XG4gICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50UGN0OiBcIiArIHRyZWF0bWVudFBjdCArIGAgd2l0aCBkZWJ1ZyBtb2RlICR7ZGVidWdNb2RlID8gXCJvblwiIDogXCJvZmZcIn1gKTtcbiAgICAgIGxldCBidXNpbmVzc1J1bGVJZCA9IG51bGw7XG4gICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBzdWIgdmFyaWFudCBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgICAgYnVzaW5lc3NSdWxlSWQgPSBhd2FpdCB0aGlzLmNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYnVzaW5lc3MgcnVsZSB0cmFuc2Zvcm1hdGlvbiB3aXRoIGlkOiBcIiwgYnVzaW5lc3NSdWxlSWQpO1xuICAgICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHRyZWF0bWVudCB3aXRoIGRlZmF1bHQgdmFsdWVzXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRyZWF0bWVudFBjdCA8IHRyZWF0bWVudFNraXBSYXRpbykge1xuICAgICAgICBsb2dnZXIubG9nKGBUcmVhdG1lbnQgJHtpZH0gc2tpcHBlZCBkdWUgdG8gdHJlYXRtZW50IHNwbGl0IHJhdGlvYCk7XG4gICAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIG51bGwsIFwic2tpcHBlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgYmluZGluZ3MpO1xuICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGJpbmRpbmdzKTtcbiAgICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDogXCIsIGlkKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW3RyZWF0bWVudC5pZF0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBiaW5kaW5ncykge1xuICAgIGNvbnN0IFtwcmVwYXJlZCwgdmFyaWFudF0gPSBhd2FpdCBwcmVwYXJlQWN0aW9ucyhpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkLCBiaW5kaW5ncyk7XG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiZmFpbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImFwcGxpZWRcIik7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKSB7XG4gICAgY29uc3Qge3JlQXBwbHlUcmVhdG1lbnRzTWFwLCBtYXRjaGVkVHJlYXRtZW50c30gPSB0aGlzO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJlQXBwbHlUcmVhdG1lbnRzTWFwKSkge1xuICAgICAgY29uc3QgdHJlYXRtZW50SWRzID0gcmVBcHBseVRyZWF0bWVudHNNYXBba2V5XTtcbiAgICAgIGNvbnN0IHJlQXBwbHlUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHMuZmlsdGVyKCh0KSA9PiB0cmVhdG1lbnRJZHMuaW5jbHVkZXModC5pZCkpO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcImluZmluaXRlX3Njcm9sbFwiOiB7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGluZmluaXRlX3Njcm9sbGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRpbWVvdXRcIjoge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHRpbWVvdXRgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRfY2hhbmdlXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseVNlbGVjdG9yTGlzdCA9IEFycmF5LmlzQXJyYXkodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IpID9cbiAgICAgICAgICAgICAgICB0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciA6IFt0cmVhdG1lbnQucmVhcHBseV9zZWxlY3Rvcl07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHJlYXBwbHlTZWxlY3Rvckxpc3QpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gZWxlbWVudF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9uX3Njcm9sbFwiOiB7XG4gICAgICAgICAgLy8gYWRkIHdpbmRvdyBzY3JvbGwgbGlzdGVuZXIsIGNhbGwgZW5nYWdlUm9ib3Qgb24gc2Nyb2xsLCBkbyBub3QgdHJpZ2dlciBtb3JlIHRoYW4gb25jZSBwZXIgMjUwbXNcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUaW1lID0gMDtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IHN0ID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGlmIChub3cgLSBsYXN0U2Nyb2xsVGltZSA+IDI1MCAmJiBNYXRoLmFicyhsYXN0U2Nyb2xsVG9wIC0gc3QpID4gNSkge1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUaW1lID0gbm93O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBvbl9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInF1ZXJ5X3NlYXJjaF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGxldCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCAhPT0gcXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBxdWVyeV9zZWFyY2hfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW50ZXJ2YWxcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseUludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBhcHBsaWVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGlmIChhcHBsaWVkPy5bdHJlYXRtZW50LmlkXSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW50ZXJ2YWxgKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICB9LCAyNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbmZvX2xheWVyX2NoYW5nZVwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgICAgICAgICAgYWRkRGF0YUxpc3RlbmVyKHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSZWFwcGx5IGV2ZW50IG5vdCBmb3VuZDogXCIsIGtleSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpIHtcbiAgICBsZXQgb3Bwb3NpdGVGbGFnID0gZmFsc2U7XG4gICAgbGV0IFtlbGlnaWJpbGl0eVNjb3BlLCBlbGlnaWJpbGl0eU5hbWVdID0gZWxpZ2liaWxpdHlSdWxlLnNwbGl0KFwiLlwiKTtcbiAgICBpZiAoZWxpZ2liaWxpdHlTY29wZS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgb3Bwb3NpdGVGbGFnID0gdHJ1ZTtcbiAgICAgIGVsaWdpYmlsaXR5U2NvcGUgPSBlbGlnaWJpbGl0eVNjb3BlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBlUnVsZXMuJHtlbGlnaWJpbGl0eVNjb3BlfWApO1xuICAgIGlmICghcmVzIHx8ICFBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob3Bwb3NpdGVGbGFnICYmIHJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFvcHBvc2l0ZUZsYWcgJiYgIXJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQsIGVsaWdpYmlsaXR5U2V0VHlwZSA9IG51bGwsIHByZXZpb3VzSXNFbGlnaWJsZSA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcm9ib3QgZWxpZ2liaWxpdHlcIik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVsaWdpYmlsaXR5IFJ1bGUgU2V0ICR7ZWxpZ2liaWxpdHlSdWxlU2V0fSBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGlzRWxpZ2libGUgPSBwcmV2aW91c0lzRWxpZ2libGU7XG4gICAgZm9yIChjb25zdCBlbGlnaWJpbGl0eVJ1bGUgb2YgZWxpZ2liaWxpdHlSdWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlICYmIGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gZWxpZ2liaWxpdHlTZXRUeXBlOiBcIiwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGUuc2V0LCBlbGlnaWJpbGl0eVJ1bGUudHlwZSwgaXNFbGlnaWJsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGluZGV4IG9mIGJ1c2luZXNzUnVsZSwgdGhpcyBpcyB0aGUgYnVzaW5lc3NSdWxlSWRcbiAgYXN5bmMgY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBidXNpbmVzc1J1bGVdIG9mIGJ1c2luZXNzUnVsZVNldC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KFtidXNpbmVzc1J1bGVdKSkgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleFwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgZmV0Y2hBbmRQZXJzaXN0UHJvZHVjdEluZm8sXG4gIGZldGNoRWxpZ2liaWxpdHlSdWxlcyxcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVPbkNvbXBvbmVudFwiKTtcblxuY29uc3QgYmVhZ2xlT24gPSBhc3luYyAoaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSwgY29sbGVjdG9yQXBpKSA9PiB7XG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlID0gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG4gIGNvbnN0IHRyZWF0bWVudFdlaWdodHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRXZWlnaHRzKCk7XG4gIGNvbnN0IGZldGNoUHJvZHVjdEluZm9Qcm9taXNlID0gZmV0Y2hBbmRQZXJzaXN0UHJvZHVjdEluZm8oY29sbGVjdG9yQXBpKTtcblxuICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzKCk7XG5cbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgbGV0IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gbnVsbDtcbiAgaWYgKGRlYnVnTW9kZSAmJiBzZWFyY2hQYXJhbXMuaW5jbHVkZXMoXCJmaWx0ZXI9XCIpKSB7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBzZWFyY2hQYXJhbXMuc2xpY2UoXG4gICAgICAgIHNlYXJjaFBhcmFtcy5pbmRleE9mKFwiW1wiKSArIDEsXG4gICAgICAgIHNlYXJjaFBhcmFtcy5sYXN0SW5kZXhPZihcIl1cIiksXG4gICAgKS5zcGxpdChcIixcIikubWFwKChpdGVtKSA9PiBwYXJzZUludChpdGVtLCAxMCkpO1xuICB9XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIH0sIDIwMDApO1xuXG4gIGNvbnN0IFt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICB0cmVhdG1lbnRzUHJvbWlzZSwgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UsXG4gIF0pO1xuXG4gIGxvZ2dlci5zdWNjZXNzKFwiRm91bmQgdHJlYXRtZW50czogXCIsIHRyZWF0bWVudHMpO1xuXG4gIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7XG4gICAgdHJlYXRtZW50cyxcbiAgICB0cmVhdG1lbnRXZWlnaHRzLFxuICB9KTtcblxuICBjb25zdCBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoKTtcbiAgaWYgKCFtYXRjaGVkVHJlYXRtZW50cy5sZW5ndGgpIHtcbiAgICBsb2dnZXIubG9nKFwiTm8gdHJlYXRtZW50cyBtYXRjaGVkLCByZXR1cm5pbmcgd2l0aG91dCBmdXJ0aGVyIGFjdGlvblwiKTtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UsIGZldGNoUHJvZHVjdEluZm9Qcm9taXNlLFxuICBdKTtcblxuICBjb25zdCBtYWluUHJvZHVjdEluZm8gPSB7fTtcbiAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgIG1haW5Qcm9kdWN0SW5mbyxcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICBkZWJ1Z01vZGUsXG4gICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgaWRlbnRpZmllcixcbiAgICBwYWdlVHlwZSxcbiAgfSk7XG4gIGF3YWl0IHJvYm90RW5naW5lLmVuZ2FnZVJvYm90cygpO1xuICByZW1vdmVEb2N1bWVudEhpZGUoKTtcblxuICBsb2dnZXIuc3VjY2VzcyhcIkFwcGxpZWQgdHJlYXRtZW50czogXCIsIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpKTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgbGV0IGVsaWdpYmlsaXR5UnVsZXMgPSBudWxsO1xuICBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGlmICghZWxpZ2liaWxpdHlSdWxlcykgcmV0dXJuO1xuICBjb25zdCBydWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2VsaWdpYmlsaXR5UnVsZXN9KTtcbiAgYXdhaXQgcnVsZUVuZ2luZS5hc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGJlYWdsZU9uO1xuIiwiY29uc3QgY29uZmlnID0ge1xuICBkYk5hbWU6IFwiYmVhZ2xlXCIsXG4gIHZlcnNpb246IDEsXG4gIG1haW50ZW5hbmNlT3BlcmF0aW9uQ291bnQ6IDEwMDAsIC8vIGFmZmVjdHMgdmVyc2lvblxuICBzdG9yZToge1xuICAgIG5hbWU6IFwiZGF0YVwiLFxuICAgIGluZGV4ZXM6IFt7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX3Nlc3Npb25cIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwic2Vzc2lvbl9pZFwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZVwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJkYXRhX3ZhbHVlXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlX3Nlc3Npb25cIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwiZGF0YV92YWx1ZVwiLCBcInNlc3Npb25faWRcIl0sXG4gICAgfV0sXG4gICAgb3B0aW9uczoge2tleVBhdGg6IFwiaWRcIiwgYXV0b0luY3JlbWVudDogdHJ1ZX0sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHtnZXRCcm93c2VyVHlwZX0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZURhdGFDb2xsZWN0aW9uV3JhcHBlclwiKTtcbmNvbnN0IF93aW5kb3cgPSB7XG4gIGFsbHRpbWU6IFwiYWxsdGltZVwiLCBzZXNzaW9uOiBcInNlc3Npb25cIixcbn07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGlmICghb3BlblJlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImluZGV4ZWRkYiBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3BlblJlcXVlc3QucmVzdWx0LmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdG9yZSA9IG9wZW5SZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgaW5kZXhlZCBEQlwiLCBvcGVuUmVxdWVzdC5lcnJvcik7XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMuaW5kZXhlZERCID0gb3BlblJlcXVlc3QucmVzdWx0O1xuICAgIH07XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAyNSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJJbmRleGVkREIgbm90IGluaXRpYWxpemVkIHdpdGhpbiB0aGUgYWxsb3R0ZWQgdGltZVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaW5pdFRyYW5zYWN0aW9uKHJlYWR3cml0ZSA9IGZhbHNlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgdHggPSB0aGlzLmluZGV4ZWREQi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSwgKHJlYWR3cml0ZSA/IFwicmVhZHdyaXRlXCIgOiBcInJlYWRvbmx5XCIpKTtcbiAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcblxuICAgIHJldHVybiBzdG9yZTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUoZGF0YU5hbWUsIGRhdGFWYWx1ZSkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgY29uc3Qgc2Vzc2lvbklkID0gdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCk7IC8vIGRhdGUgY3VycmVudCAtMiBzYWF0ICB5aWwtYXktZ3VuXG4gICAgY29uc3QgdGltZSA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcImRhdGFfbmFtZVwiOiBkYXRhTmFtZSwgXCJkYXRhX3ZhbHVlXCI6IGRhdGFWYWx1ZSwgXCJzZXNzaW9uX2lkXCI6IHNlc3Npb25JZCwgdGltZX07XG4gICAgc3RvcmUucHV0KHBheWxvYWQpO1xuICB9XG5cbiAgbWlubWF4KGRhdGFOYW1lLCBvcCwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBzdG9yZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHN0b3JlZCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgKG9wID09PSBcIm1pblwiICYmIHZhbHVlW1wiZGF0YV92YWx1ZVwiXSA8IHN0b3JlZCkgfHxcbiAgICAgICAgICAgICAgICAob3AgPT09IFwibWF4XCIgJiYgdmFsdWVbXCJkYXRhX3ZhbHVlXCJdID4gc3RvcmVkKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdG9yZWQgPSB2YWx1ZVtcImRhdGFfdmFsdWVcIl07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoc3RvcmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG1pbihkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWlubWF4KGRhdGFOYW1lLCBcIm1pblwiLCB3aW5kb3cpO1xuICB9XG5cbiAgbWF4KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy5taW5tYXgoZGF0YU5hbWUsIFwibWF4XCIsIHdpbmRvdyk7XG4gIH1cblxuICBncm91cEJ5KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmICghbWFwLmhhcyh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pKSBtYXAuc2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSwgMCk7XG4gICAgICAgICAgICAgIG1hcC5zZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdLCBtYXAuZ2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSkgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUobWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIG1vZGUoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmdyb3VwQnkoZGF0YU5hbWUsIHdpbmRvdyk7XG4gICAgaWYgKGRhdGEua2V5cygpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBtYXggPSB7bmFtZTogdW5kZWZpbmVkLCB2YWx1ZTogLTF9O1xuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgaWYgKG1heC52YWx1ZSA8IHZhbHVlKSB7XG4gICAgICAgIG1heC5uYW1lID0ga2V5O1xuICAgICAgICBtYXgudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF4O1xuICB9XG5cbiAgY291bnQoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShjb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdW0oZGF0YU5hbWUsIHdpbmRvdyA9IFwiYWxsdGltZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCB0b3RhbCA9IDAuMDA7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdG90YWwgKz0gcGFyc2VGbG9hdCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSh0b3RhbC50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSwgZGF0YVZhbHVlID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGRhdGFWYWx1ZSkge1xuICAgICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZV9zZXNzaW9uXCIpXG4gICAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgZGF0YVZhbHVlLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKS50b1N0cmluZygpXSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVcIilcbiAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgZGF0YVZhbHVlXSkpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiKVxuICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKS50b1N0cmluZygpXSkpO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4VmFsdWUgPSBnZXRCcm93c2VyVHlwZSgpID09PSBcInNhZmFyaVwiID8gZGF0YU5hbWUgOiBbZGF0YU5hbWVdO1xuXG4gICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVcIilcbiAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShpbmRleFZhbHVlKSk7XG4gIH1cblxuICBhc3luYyBhdmcoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIGNvbnN0IHRvdGFsID0gYXdhaXQgdGhpcy5zdW0oZGF0YU5hbWUsIHdpbmRvdyk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCB0aGlzLmNvdW50KGRhdGFOYW1lLCB3aW5kb3cpO1xuXG4gICAgaWYgKCF0b3RhbCB8fCAhY291bnQpIHJldHVybiAwO1xuXG4gICAgcmV0dXJuICh0b3RhbCAvIGNvdW50KS50b0ZpeGVkKDIpO1xuICB9XG5cbiAgYXN5bmMgbGFzdChkYXRhTmFtZSwgc2l6ZSA9IDEsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgY3Vyc29yID0gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZVwiKS5vcGVuQ3Vyc29yKFtkYXRhTmFtZV0sIFwicHJldlwiKTtcbiAgICAgICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICAgICAgY3Vyc29yID0gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIpXG4gICAgICAgICAgICAgIC5vcGVuQ3Vyc29yKFtkYXRhTmFtZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCldLCBcInByZXZcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgY3Vyc29yLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAocmVzdWx0ICYmIGluZGV4IDwgc2l6ZSkge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIGZpbmQoa2V5TmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGtleU5hbWUpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3Vyc29yKTtcbiAgICAgICAgICAgIHJlc29sdmUoY3Vyc29yKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYGNhbm5vdCBmaW5kICR7a2V5TmFtZX0gb24gdGhlIGluZGV4ZGIgc3RvcmVgKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTZXNzaW9uSWQoKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgZC5zZXRIb3VycyhkLmdldEhvdXJzKCkgLSAyKTtcblxuICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArXG4gICAgICAoZC5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIikgKyBcIi1cIiArXG4gICAgICBkLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgTW9uaXRvciBmcm9tIFwiLi4vQmVhZ2xlTW9uaXRvci9pbmRleFwiO1xuaW1wb3J0IGJlYWdsZU9uIGZyb20gXCIuLi9CZWFnbGVPblwiO1xuaW1wb3J0IENvbGxlY3RvckFwaSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb24vYXBpXCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcblxubGV0IFNIVVRET1dOID0gZmFsc2U7XG5jb25zdCBGTElQRkxBRyA9IGZhbHNlO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGxldCBtb25pdG9yID0gbnVsbDtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBpbml0aWFsaXppbmdcIik7XG4gIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG4gIGxldCBlYXJseUxvZ1NlbnQgPSBmYWxzZTtcbiAgbGV0IGhpZGVSZW1vdmVkID0gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBtb25pdG9yID0gbmV3IE1vbml0b3IoKTtcbiAgICBjb25zdCBjb2xsZWN0b3JBcGkgPSBuZXcgQ29sbGVjdG9yQXBpKCk7XG4gICAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcihjb2xsZWN0b3JBcGkpO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBhd2FpdCBnZXRJZGVudGlmaWVyKCk7XG4gICAgbG9nZ2VyLmxvZyhcIkZvdW5kIGlkZW50aWZpZXI6IFwiLCBpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiwgaWRlbnRpZmllcik7XG4gICAgbGV0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIC8vIGFkZCBjdXJyZW50IGVwb2NoIGludGVnZXIgdG8gYmVhZ2xlSW5mb0xheWVyXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIsIERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKTtcblxuICAgIC8vIGRhdGEtbGVzcyBsb2cgdG8gZGV0ZWN0IGJvdW5jZXNcbiAgICBhd2FpdCBtb25pdG9yLnBhY2tBbmRRdWV1ZUFycml2YWxMb2coKTtcblxuICAgIGNvbnN0IG9vc1JlYXNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFKTtcblxuICAgIC8vIGlmIGNhbm5vdCBnZXQgY3JpdGljYWwgaW5mbywgbWFrZSBvdXQgb2Ygc2NvcGUgYW5kIHVuc3VwcG9ydGVkXG4gICAgaWYgKFxuICAgICAgY29va2llUGN0ID09PSBudWxsIHx8XG4gICAgICAhbmF2aWdhdG9yLnNlbmRCZWFjb24gfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICB0eXBlb2YgU3RyaW5nPy5wcm90b3R5cGU/LnBhZFN0YXJ0ICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcInVuc3VwcG9ydGVkXCIpXG4gICAgKSB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ1bnN1cHBvcnRlZFwifSk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSwgXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgZGV2aWNlXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGV2aWNlIGRvZXMgbm90IGhhdmUgcmVxdWlyZWQgY2FwYWJpbGl0aWVzXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTGFiZWxTZW50ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19MQUJFTF9TRU5UKTtcbiAgICBjb25zdCB0aW1lb3V0Q291bnRlciA9IHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCkpIHx8IDA7XG5cbiAgICAvLyBjaGVjayBpZiBkZWJ1ZyBtb2RlIGlzIG9uLCBhbHNvIGFkZHMgZGJtIHRvIGJlYWdsZUluZm9MYXllciBhbmQgc2V0cyBvb3NSZWFzb25cbiAgICBjb25zdCBkZWJ1Z01vZGUgPSBnZXREZWJ1Z01vZGUoXCJlbXBsb3llZVwiKTtcblxuICAgIC8vIGlmIHRpbWVkLW91dCB0b28gbWFueSB0aW1lcyBmb3IgdmVyeSBmaXJzdCBpbnRlcmFjdHNpb25zLCBtYWtlIG91dCBvZiBzY29wZSBmb3IgdGhlIHNlc3Npb25cbiAgICBpZiAoIWRlYnVnTW9kZSAmJiAhb29zUmVhc29uICYmICFpc0xhYmVsU2VudCAmJiB0aW1lb3V0Q291bnRlciA+IE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OXG4gICAgKSB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ1bnN1cHBvcnRlZFwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCZWFnbGUgdGltZW91dCB0aHJlc2hvbGQgcmVhY2hlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBWaXZlbnNlIHNwZWNpZmljOiBDaGVjayBpZiB1c2VyIGlzIGFkbWluLCBtYWtpbmcgdGhlbSBvdXQgb2Ygc2NvcGVcbiAgICAvLyBUaGlzIG5lZWRzIHRvIHdhaXQgZm9yIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgdG8gc2V0IHRoZSB2dnNJc1Nob3dyb29tIHZhbHVlXG4gICAgY29uc3QgaXNTaG93cm9vbSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgIGlmIChpc1Nob3dyb29tICYmIChpc1Nob3dyb29tID09PSBcInRydWVcIiB8fCBpc1Nob3dyb29tID09PSB0cnVlKSkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwiZW1wbG95ZWVcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHNob3dyb29tXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBpcyBmcm9tIFZWUyBzaG93cm9vbS9jYWxsY2VudGVyXCIpO1xuICAgIH0gZWxzZSBpZiAoaXNTaG93cm9vbSA9PT0gbnVsbCB8fCBpc1Nob3dyb29tID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBkZXRlcm1pbmUgaWYgdXNlciBpcyBmcm9tIFZWUyBzaG93cm9vbS9jYWxsY2VudGVyXCIpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV4dERheS1oaWRlXCIpKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCZWFnbGUgc2NyaXB0IHRpbWVkIG91dFwiKTtcbiAgICB9XG5cbiAgICAvLyBpc09uIGNhbiBiZSB0cnVlIChPTiksIGZhbHNlIChPRkYpXG4gICAgbGV0IGlzT24gPSBudWxsO1xuXG4gICAgLy8gRkxJUCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBmbGFnXG4gICAgaWYgKEZMSVBGTEFHKSB7XG4gICAgICBjb29raWVQY3QgPSA5OSAtIGNvb2tpZVBjdDtcbiAgICB9XG5cbiAgICBpZiAoZGVidWdNb2RlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRGVidWcgbW9kZSBvbjogYWxsIGFwcGxpY2FibGUgdHJlYXRtZW50cyB3aWxsIGJlIGFwcGxpZWRcIik7XG4gICAgICBpc09uID0gdHJ1ZTtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJlbXBsb3llZVwiKSB7XG4gICAgICBsb2dnZXIud2FybihcIlVzZXIgaXMgb3V0IG9mIHNjb3BlXCIpO1xuICAgICAgLy8gc2V0IGlzT24gdG8gdHJ1ZS9mYWxzZSB3aGVuIG5vdCBkZWJ1Z01vZGUgYnV0IG91dCBvZiBzY29wZSBpLmUuIG5kX2RlYnVnPTAgZm9yIHRlc3RhYmlsaXR5XG4gICAgICBpc09uID0gY29va2llUGN0ID49IFNQTElUX1JBVElPO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24pIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdW5rbm93blwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3V0IG9mIHNjb3BlIHJlYXNvblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIFNQTElUX1JBVElPLCB0aGVuIGluIE9OIG1vZGVcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzT25cIiwgaXNPbik7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQsIHRydWUpO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IGlzT24udG9TdHJpbmcoKX0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGlzT24udG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhcIkZvdW5kIGNvb2tpZSBwZXJjZW50YWdlOiBcIiwgY29va2llUGN0KTtcbiAgICBsb2dnZXIubG9nKFwiU3BsaXRfcmF0aW86IFwiLCBTUExJVF9SQVRJTyk7XG4gICAgbG9nZ2VyLmxvZyhcImNvb2tpZVBjdCA8IFNQTElUX1JBVElPXCIsIGNvb2tpZVBjdCA8IFNQTElUX1JBVElPKTtcbiAgICBsb2dnZXIubG9nKFwiU2V0IGlzT246IFwiLCBpc09uKTtcblxuICAgIC8vIGF3YWl0IGNyaXRpY2FsIGluZm8gYmVmb3JlIHNlbmRpbmcgbG9ncyBmb3IgcHJvcGVyIGFuYWx5dGljcyBtZWFzdXJlbWVudHNcbiAgICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgICBpZiAocGFnZVR5cGUgPT09IFwicHVyY2hhc2VcIikge1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnJldmVudWVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIC8vIHNlbmQgbG9ncyBpbW1lZGlhdGVseSBvbiBwdXJjaGFzZSBwYWdlLCBhbmQgZm9yY2Ugd2FpdFxuICAgICAgYXdhaXQgbW9uaXRvci5zZW5kTG9ncyh0cnVlKTtcbiAgICAgIC8vIGlmIHB1cmNoYXNlIGlzIGNvbXBsZXRlLCBkbyBub3QgYXBwbHkgYW55IHRyZWF0bWVudHMgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICBTSFVURE9XTiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNlbmQgbG9ncyB3aGVuIHJlYWR5LCBzdGFydCBzY3JhcGluZyBhbmQgc2VuZGluZyBhc3luY2x5XG4gICAgICBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICB9XG4gICAgZWFybHlMb2dTZW50ID0gdHJ1ZTtcblxuICAgIGlmIChpc09uID09PSB0cnVlKSB7XG4gICAgICBpZiAoIVNIVVRET1dOKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJCZWFnbGUgT04gR3JvdXAgUGF0aFwiKTtcbiAgICAgICAgYmVhZ2xlT24oaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSwgY29sbGVjdG9yQXBpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9OIEdyb3VwIFNIVVRET1dOIFBhdGhcIik7XG4gICAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09uID09PSBmYWxzZSkge1xuICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT0ZGIEdyb3VwIFBhdGhcIik7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaXNPbiBpcyB1bmRlZmluZWQgb3IgbnVsbFwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiQmVhZ2xlIEVhcmx5IFNjb3BlLW91dCBvciBFUlJPUjogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIGlmICghaGlkZVJlbW92ZWQpIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJDT09LSUVfTkFNRSIsIlRSRUFUTUVOVFNfTE9DQVRJT04iLCJUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiIsIlNUWUxFU0hFRVRfTE9DQVRJT04iLCJEYXRlIiwidG9JU09TdHJpbmciLCJFX1JVTEVTX0xPQ0FUSU9OIiwiUFJPRFVDVF9JTkZPX0xPQ0FUSU9OIiwiTE9HX0FQSV9VUkwiLCJMT09LVVBfQVBJX1VSTCIsIk1PQklMRV9NRURJQV9RVUVSWSIsIlNQTElUX1JBVElPIiwiVFJFQVRNRU5UX1JBVElPIiwiVFJFQVRNRU5UU19EVVJBVElPTiIsIk1BWF9USU1FT1VUX1BFUl9TRVNTSU9OIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlRSRUFUTUVOVFMiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJUSU1FT1VUX0NPVU5UIiwiU0VTU0lPTl9SRUZFUlJFUiIsIkxPQ0FMX1NUT1JBR0VfS0VZUyIsIkRFQlVHX01PREUiLCJPVVRfT0ZfU0NPUEUiLCJJU19MQUJFTF9TRU5UIiwiVVNFUl9JRCIsIkRBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkUiLCJDVVNUT01fU1RPUkFHRV9QUkVGSVgiLCJMb2dnZXIiLCJvcmlnaW4iLCJERUJVRyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcmdzIiwiY29uc29sZSIsImluZm8iLCJsb2ciLCJtZXNzYWdlQ29uZmlnIiwiZm9yRWFjaCIsImFyZ3VtZW50IiwidHlwZSIsIndhcm4iLCJlcnJvciIsImxvZ2dlciIsImNvbGxlY3RvckFwaSIsInNldENvbGxlY3RvckFwaSIsImNBIiwicXVlcnlJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsInF1ZXJ5TWV0aG9kIiwiZmFpbGVkIiwibWluIiwicXVlcnlQcm9taXNlIiwibWF4IiwiYXZnIiwiZ3JvdXBCeSIsInNpemUiLCJkYXRhIiwiY291bnQiLCJ2YWx1ZSIsIm1vZGUiLCJuYW1lIiwibWF0Y2giLCJwYXJzZUludCIsImxhc3QiLCJkYXRhVmFsdWVzIiwibWFwIiwib2JqIiwiZGF0YV92YWx1ZSIsInVwZGF0ZUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVWYWx1ZSIsInVwZGF0ZU1ldGhvZCIsInNhdmUiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZSIsImYiLCJfX2h3bSIsImluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNIiwiaW5mb0xheWVyIiwidG9wIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJrZXkiLCJ1bmRlZmluZWQiLCJ0eXBlZFZhbHVlIiwidG9TdHJpbmciLCJ0cmltIiwia2V5cyIsInNwbGl0IiwibGFzdEtleSIsInBvcCIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJwdXNoIiwibGlzdGVuZXJzIiwiQXJyYXkiLCJpc0FycmF5IiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImJsb2NraW5nIiwicG9sbEludGVydmFsIiwidGltZW91dCIsImdldEFueUZyb21CZWFnbGVJbmZvTGF5ZXIiLCJvYnRhaW5EYXRhIiwianNvbkdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRUaW1lb3V0IiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsIkpTT04iLCJzdHJpbmdpZnkiLCJhZGRUcmVhdG1lbnQiLCJpZCIsImJ1c2luZXNzUnVsZUlkIiwidmFyaWFudCIsInN0YXR1cyIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJmZWF0dXJlRW5naW5lZXJpbmdPcHMiLCJmZWF0dXJlTmFtZSIsImNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWVzIiwiT2JqZWN0IiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwic2VsZWN0b3IiLCJmb3JtYXR0ZXIiLCJleGNsdXNpdmUiLCJvcGVyYW5kIiwib2JzZXJ2ZXIiLCJjaGlsZHJlbiIsInByb2Nlc3NGb3JtYXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsInNlYXJjaE9iaiIsInNlYXJjaEVsZW1lbnQiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJxdWVyeVNlbGVjdG9yIiwiaXNGb3VuZCIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwiZmlsdGVyIiwiZWxlbWVudCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJ0cmlnZ2VyUmVzdGFydCIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaW5uZXJUZXh0IiwiYXR0cmliVmFsdWVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInZhbHVlY2hpbGQiLCJhdHRyaWJWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInNldFZhbHVlIiwic3VtUHJpY2UiLCJjaGlsZFRleHQiLCJhcnJheUlubmVyVGV4dCIsImV4Y2x1c2l2ZUVsZW1lbnQiLCJjdXN0b21EYXRhRGVyaXZhdGlvbnMiLCJjdXJyZW50UGFnZVR5cGUiLCJhbGwiLCJpc0NhcnRFbXB0eSIsInRvdGFsQmFzZVByaWNlIiwiY291cG9uTm90QXBwbGljYWJsZSIsInByaWNlcyIsInF1YW50aXRpZXMiLCJ0b3RhbFByaWNlIiwiaSIsImNvdXBvbkFwcGxpY2FibGVBbW91bnQiLCJuZXdTS1VMaXN0Iiwic2t1Iiwic2t1TGlzdCIsInByZXZTS1VMaXN0IiwiZGlmZlNLVUxpc3QiLCJ4IiwicHJvZHVjdEluZm9Mb29rdXAiLCJkaWZmUHJvZHVjdEluZm8iLCJvbGRQcm9kdWN0SW5mbyIsIm5ld1Byb2R1Y3RJbmZvIiwidXBkYXRlZFNLVXMiLCJjb25jYXQiLCJwYXJzZVNlYXJjaFBhdGhzIiwiZG9tU3RhdHVzIiwiZG9jdW1lbnQiLCJyZWFkeVN0YXRlIiwid2ludG9wIiwiZGF0YUxheWVyIiwid2luZG9jIiwiZm91bmROYW1lcyIsIlNldCIsInByZXZGb3VuZE5hbWVzIiwibm90Rm91bmROYW1lcyIsImFkZCIsImlzSWdub3JlIiwiaGFzIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJmcm9tIiwiam9pbiIsInBhdGgiLCJwYXRoQXJyYXkiLCJjdXJyZW50Iiwic3ViUGF0aCIsInNsaWNlIiwic3ViQXJyYXkiLCJzdWJLZXkiLCJzdWJWYWx1ZSIsIndpbmRvd1B0ciIsIm5hdlB0ciIsIm5hdmlnYXRvciIsInBsYXRmb3JtIiwidXNlckFnZW50RGF0YSIsInVzZXJBZ2VudCIsImRldmljZVBpeGVsUmF0aW8iLCJhdmFpbFdpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIndpbmRvd0RlcHRoIiwiY29sb3JEZXB0aCIsInBpeGVsRGVwdGgiLCJ2cG9ydFNoYXBlIiwidmlzdWFsVmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsImlPUyIsInRlc3QiLCJNYXRoIiwicm91bmQiLCJvcmllbnRhdGlvbkFuZ2xlIiwib3JpZW50YXRpb24iLCJhbmdsZSIsImFicyIsInRlbXAiLCJoaXN0b3J5IiwibmF2QWdlbnQiLCJicmFuZHMiLCJicmFuZCIsInZlcnNpb24iLCJtb2JpbGUiLCJoYXJkd2FyZUNvbmN1cnJlbmN5IiwibGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsInVzZXJMYW5ndWFnZSIsIm1heFRvdWNoUG9pbnRzIiwidmVuZG9yIiwiY29ubmVjdGlvbiIsImRvd25saW5rIiwiY3VycmVudFVSTCIsIlVSTCIsImhvc3RuYW1lIiwiZG9Ob3RUcmFjayIsIm1zRG9Ob3RUcmFjayIsInJlZmVycmVyIiwiZmlyc3RTZXNzaW9uUmVmZXJyZXIiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJwYXRobmFtZSIsInBhZ2VUeXBlIiwicGVyZk1ldHJpY3MiLCJwZXJmTmF2aWdhdGlvbk1ldHJpY3MiLCJwZXJmb3JtYW5jZSIsImdldEVudHJpZXNCeVR5cGUiLCJjb25uZWN0IiwiY29ubmVjdEVuZCIsImNvbm5lY3RTdGFydCIsInJlcXVlc3QiLCJyZXNwb25zZUVuZCIsInJlcXVlc3RTdGFydCIsImRvbSIsImRvbUludGVyYWN0aXZlIiwiZG9tQ29tcGxldGUiLCJsb2FkIiwibG9hZEV2ZW50RW5kIiwibG9hZEV2ZW50U3RhcnQiLCJkdXJhdGlvbiIsInNjaGVtYU9yZ0VsdHMiLCJzb3JnQXJyYXkiLCJzVGFnIiwiY250bnQiLCJ0ZXh0Q29udGVudCIsImpzb25jb250ZW50IiwicGFyc2UiLCJlcnIiLCJwcm9kdWN0SW5mb0xvb2t1cEluUHJvZ3Jlc3MiLCJza3VsaXN0IiwiaGVhZGVycyIsIkhlYWRlcnMiLCJhcHBlbmQiLCJwcm9kdWN0SW5mbyIsImZldGNoIiwiYm9keSIsIm9rIiwianNvbiIsIm1vbnRocyIsInJlbW92ZURvY3VtZW50SGlkZSIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZldGNoVHJlYXRtZW50cyIsInRyZWF0bWVudHMiLCJqc29uVHJlYXRtZW50IiwiZmV0Y2hUcmVhdG1lbnRXZWlnaHRzIiwidHJlYXRtZW50V2VpZ2h0cyIsImpzb25UcmVhdG1lbnRXZWlnaHRzIiwiZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzIiwiZWxpZ2liaWxpdHlSdWxlcyIsImpzb25FbGlnaWJpbGl0eVJ1bGVzIiwibWVzc2FnZSIsImZldGNoQW5kUGVyc2lzdFByb2R1Y3RJbmZvIiwiZXhpc3RpbmdQcm9kSW5mbyIsInRleHQiLCJwcm9kdWN0SW5mb0NTViIsImNzdlRvQXJyYXkiLCJleHRyYWN0Q29va2llSWRlbnRpZmllciIsImNvb2tpZVN0cmluZyIsImNvb2tpZU5hbWUiLCJwYXJzZWQiLCJ2IiwicmVkdWNlIiwiYWNjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiaWRlbnRpZmllciIsImlkZW50aWZpZXJJbmRleCIsImRldGVybWluZVBjdCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJwY3QiLCJleGl0U2Nyb2xsTGlzdGVuZXIiLCJjYWxsQmFjayIsImxvb3AiLCJzY3JvbGxUb3AiLCJsYXN0U2Nyb2xsVG9wIiwiZXhpdFNjcm9sbEludGVydmFsIiwic3R5bGVBcHBsaWNhdG9yIiwiZWxlbWVudHMiLCJzdHlsZUNoYW5nZXNNYXAiLCJlbnRyaWVzIiwic3R5bGUiLCJpbmplY3RTdHlsZVNoZWV0Iiwic3R5bGVTaGVldCIsImNyZWF0ZUVsZW1lbnQiLCJyZWwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwcmVwYXJlQWN0aW9ucyIsImFjdGlvbnNUb1ByZXBhcmUiLCJhY3Rpb25zIiwiYWN0aW9uIiwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zIiwidmFyaWFudHMiLCJidXNpbmVzc1RyYW5zZm9ybWF0aW9uIiwidmFyaWFudEtleSIsInJhbmRvbVBjdCIsIndlaWdodCIsImluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzIiwicG9wdXBEaXNwbGF5RmxhZyIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsIm5vdyIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwicmVnZXgiLCJSZWdFeHAiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJnZXRHYUNsaWVudElkIiwiZ2EiLCJnZXRBbGwiLCJ0cmFja2VycyIsImdldCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiZ2V0UmFuZG9tSW50IiwiZmxvb3IiLCJyYW5kb20iLCJnZXRVbml4VGltZSIsImdldElkZW50aWZpZXIiLCJleHRyYWN0SWRlbnRpZmllckludGVydmFsIiwiZGVsYXkiLCJtcyIsInJlcyIsImRhdGUiLCJyZXN1bHQiLCJzdGFydE1vbnRoSW5kZXgiLCJlbmRNb250aEluZGV4Iiwic3RhcnREYXkiLCJlbmREYXkiLCJ0b2RheSIsInN0YXJ0WWVhciIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJlbmRZZWFyIiwiZXN0aW1hdGVkU3RhcnQiLCJlc3RpbWF0ZWRFbmQiLCJzdGFydERpZmZPdmVyRGF5cyIsImNlaWwiLCJlbmREaWZmT3ZlckRheXMiLCJzdGFydERpZmZPdmVyV2Vla3MiLCJlbmREaWZmT3ZlcldlZWtzIiwiaWRsZVRpbWVyIiwidGltZU91dCIsInJlc2V0VGltZXIiLCJjbGVhclRpbWVvdXQiLCJpZGxlVGltZW91dCIsIm9udG91Y2hzdGFydCIsImdldEJyb3dzZXJUeXBlIiwic3RyRGF0YSIsInN0ckRlbGltaXRlciIsIm9ialBhdHRlcm4iLCJhcnJEYXRhIiwiYXJyTWF0Y2hlcyIsImV4ZWMiLCJzdHJNYXRjaGVkRGVsaW1pdGVyIiwic3RyTWF0Y2hlZFZhbHVlIiwiSEVBREVSUyIsIk1vbml0b3IiLCJhSGFzaCIsImVIYXNoIiwiZkhhc2giLCJoYXNBcnJpdmFsTG9nU2VudCIsImhhc01haW5Mb2dTZW50IiwiaGFzVXBkYXRlc1NlbnQiLCJpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzIiwiaW1tZWRpYXRlIiwicGFja0FuZFF1ZXVlTWFpbkxvZyIsInBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nIiwicGFja2FnZU1haW5Mb2dEYXRhIiwicmVxdWVzdEJsb2IiLCJjaGVja0ZvckxhdGVzdENoYW5nZXMiLCJxdWV1ZUxvZ3MiLCJoYXNDaGFuZ2VkIiwicGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSIsImxvZ0RhdGEiLCJwYWNrYWdlQXJyaXZhbExvZ0RhdGEiLCJ1cmwiLCJjb29raWVHYUlkIiwidmlld19lcG9jaCIsImxjIiwidSIsIm9uSGFzaFBjdCIsIkJsb2IiLCJzdGFydHNXaXRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJydWxlIiwib3BlcmF0b3IiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJzZWxlY3RvckZhbGxiYWNrIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwib3B0cyIsImJpbmRpbmdzIiwiY29udGV4dCIsInJ1bGVGdW5jdGlvbiIsIkZ1bmN0aW9uIiwiYmluZCIsImNoZWNrU2Vzc2lvblJ1bGUiLCJkdXJhdGlvbkhhbmRsZXIiLCJoaXN0b3J5SGFuZGxlciIsImdldFNlc3Npb25UaW1lc3RhbXAiLCJjdXJyZW50SGlzdG9yeSIsImNoZWNrVXJsUnVsZSIsInJlcXVlc3RVUkwiLCJjaGVja0VudlJ1bGUiLCJpc01vYmlsZSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiY2hlY2tQcm9kdWN0SW5mb1J1bGUiLCJnZXRUcmFuc2FjdGlvbkNvdW50IiwiZ2V0QWRkVG9DYXJ0Q291bnQiLCJnZXRQcmV2aWV3Q291bnQiLCJjYXRhbG9nIiwidHJhbnNhY3Rpb25JbjJXZWVrcyIsImFkZFRvQ2FydEluMldlZWtzIiwicHJvZHVjdFZpZXdDb3VudCIsIlJ1bGVFbmdpbmUiLCJiYXNlUnVsZVNldCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbiIsImNoYWluX2NvbmRpdGlvbiIsInJ1bGVzIiwic2F0aXNmaWVkUnVsZUlkcyIsImNvbXB1dGVTZWdtZW50Iiwic2VnbWVudCIsInJ1bGVTZXQiLCJzZWdtZW50UnVsZUVuZ2luZSIsImJ1c2luZXNzUnVsZVNldCIsImNoZWNrUnVsZXMiLCJUcmVhdG1lbnRSZXBvc2l0b3J5IiwidXNlckdyb3VwIiwidXNlckdyb3VwV2VpZ2h0cyIsInRyZWF0bWVudCIsInNvbWUiLCJ0cmVhdG1lbnRzT2JqIiwidGltZXN0YW1wIiwidHJlYXRtZW50V2l0aFRpbWVzdGFtcCIsImVsYXBzZWREYXlzIiwicmVwbGFjZXIiLCJyZXBsYWNlRm4iLCJ2YWwiLCJjdXJyZW50UmVwbGFjZUZuIiwicmVwbGFjZU9iamVjdEV4dHJhY3RvciIsInJlcGxhY2VWYWwiLCJyZXBsYWNlRm5FeGVjdXRvciIsInJGbiIsInNpbmdsZSIsInJlcGxhY2VGdW5jdGlvbiIsInN0b3JhZ2UiLCJrZXlGYWxsYmFjayIsImNoZWNrQWN0aW9uQ29uZGl0aW9uIiwiYXR0cmlidXRlIiwiaW5uZXJfY29uZGl0aW9uIiwiZWxpZ2libGVFbGVtZW50cyIsImNvbmRpdGlvbkVsZW1lbnRzIiwiZWxlbWVudFNrdSIsIiQiLCJhcHBseUFjdGlvbnMiLCJ0cmFuc2Zvcm1lciIsImFwcGx5RXZlbnQiLCJjb250ZW50U2VsZWN0b3IiLCJtZENvbmRpdGlvbiIsIm1vdmVfc2VsZWN0b3JfMSIsIm1vdmVfc2VsZWN0b3JfMiIsInBUeXBlIiwibWMiLCJTdHJpbmciLCJiZWZvcmUiLCJhZnRlciIsIm9mZiIsImNyZWF0ZVBvcHVwIiwiZWxtIiwidGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGlzcGxheU1vZGFsIiwiZ2V0UHJvZHVjdEluZm8iLCJldmVudCIsImRpc3BsYXlQb3B1cCIsInIiLCJkIiwicHVzaFN0YXRlIiwic3RhdGUiLCJvbmNlIiwiaHRtbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlIiwiY3NzIiwicHJvcGVydHkiLCJwcm9wZXJ0eVZhbHVlIiwiYXR0ciIsIm4xIiwibjIiLCJzd2FwTm9kZXMiLCJzb3VyY2UiLCJkZXN0aW5hdGlvbiIsInByZXBlbmQiLCJzZW50ZW5jZSIsIndvcmQiLCJjaGFyQXQiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInJlcGxhY2VXaXRoVmFsIiwiaHRtbFN0ciIsInRpdGxlcyIsInBhcnNlZFRpdGxlcyIsInBhcnNlZFRpdGxlIiwiaGlkZGVuIiwiaGFuZGxlUG9wdXBDbGljayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb2RhbENsaWNrIiwiY29udGFpbnMiLCJoaWRlIiwicVBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJjb250ZW50cyIsInNoaWZ0Iiwic3JjIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJwb3B1cCIsImNvbnRlbnQiLCJmaXJzdENoaWxkIiwicDEiLCJwYXJlbnROb2RlIiwicDIiLCJpMSIsImkyIiwiaXNFcXVhbE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJ3YWl0Rm9ySlF1ZXJ5IiwialF1ZXJ5IiwialF1ZXJ5SW50ZXJ2YWwiLCJhY3Rpb25BcHBsaWNhdG9yIiwiT0JTRVJWRVJfQ09ORklHIiwiYXR0cmlidXRlcyIsIlJvYm90RW5naW5lIiwibWFpblByb2R1Y3RJbmZvIiwiZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMiLCJkZWJ1Z01vZGUiLCJtYXRjaGVkVHJlYXRtZW50cyIsImVuZ2FnZW1lbnRMb2NrIiwicmVBcHBseVRyZWF0bWVudHNNYXAiLCJlbmdhZ2VSb2JvdCIsImluaXRpYXRlUmVhcHBseVJvYm90TWFwIiwiZWxpZ2liaWxpdHlSdWxlU2V0IiwiZGV2aWNlIiwicmVhcHBseV9ldmVudCIsInJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIiwicHJvZHVjdEluZm9TdG9yYWdlIiwicHJlcGFyZUFuZEFwcGx5IiwicmVhcHBseV9ldmVudF9hcnJheSIsInJlYXBwbHlFdmVudCIsInByZXZpb3VzVmFsdWUiLCJjaGVja0VsaWdpYmlsaXR5UnVsZVNldCIsInRyZWF0bWVudFNraXBSYXRpbyIsImRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0IiwidCIsImRldGVybWluaW5nSWRlbnRpZmllciIsInRyZWF0bWVudFBjdCIsImNoZWNrQnVzaW5lc3NSdWxlcyIsInByZXBhcmVkIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJSZXNpemVPYnNlcnZlciIsInJlYXBwbHlTZWxlY3Rvckxpc3QiLCJyZWFwcGx5X3NlbGVjdG9yIiwibGFzdFNjcm9sbFRpbWUiLCJnZXRUaW1lIiwic3QiLCJwYWdlWU9mZnNldCIsInJlYXBwbHlJbnRlcnZhbCIsImFwcGxpZWQiLCJib3VuZEVuZ2FnZVRyZWF0bWVudCIsImVsaWdpYmlsaXR5UnVsZSIsIm9wcG9zaXRlRmxhZyIsImVsaWdpYmlsaXR5U2NvcGUiLCJlbGlnaWJpbGl0eU5hbWUiLCJlbGlnaWJpbGl0eVNldFR5cGUiLCJwcmV2aW91c0lzRWxpZ2libGUiLCJpc0VsaWdpYmxlIiwiY2hlY2tFbGlnaWJpbGl0eSIsInNldCIsImJ1c2luZXNzUnVsZSIsImJlYWdsZU9uIiwiZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UiLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXMiLCJ0cmVhdG1lbnRzUHJvbWlzZSIsImdldFRyZWF0bWVudHMiLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJmZXRjaFByb2R1Y3RJbmZvUHJvbWlzZSIsInNlYXJjaFBhcmFtcyIsImxhc3RJbmRleE9mIiwiaXRlbSIsInRyZWF0bWVudFJlcG9zaXRvcnkiLCJnZXRNYXRjaGVkVHJlYXRtZW50cyIsInJvYm90RW5naW5lIiwiZW5nYWdlUm9ib3RzIiwicnVsZUVuZ2luZSIsImNvbmZpZyIsImRiTmFtZSIsIm1haW50ZW5hbmNlT3BlcmF0aW9uQ291bnQiLCJzdG9yZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJvcHRpb25zIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCJfd2luZG93IiwiYWxsdGltZSIsInNlc3Npb24iLCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXIiLCJpbmRleGVkREIiLCJpbml0Iiwib3BlblJlcXVlc3QiLCJvcGVuIiwiRXJyb3IiLCJvbnVwZ3JhZGVuZWVkZWQiLCJvbGRWZXJzaW9uIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImlkeCIsImNyZWF0ZUluZGV4Iiwib25lcnJvciIsIm9uc3VjY2VzcyIsInJlamVjdCIsInJlYWR3cml0ZSIsImdldENvbm5lY3Rpb24iLCJ0eCIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJkYXRhTmFtZSIsImRhdGFWYWx1ZSIsImluaXRUcmFuc2FjdGlvbiIsInNlc3Npb25JZCIsImdldEN1cnJlbnRTZXNzaW9uSWQiLCJ0aW1lIiwicGF5bG9hZCIsInB1dCIsIm9wIiwidGhlbiIsInN0b3JlZCIsImdldEN1cnNvciIsImN1cnNvciIsImNvbnRpbnVlIiwibWlubWF4IiwiTWFwIiwidG90YWwiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsIm9wZW5DdXJzb3IiLCJJREJLZXlSYW5nZSIsIm9ubHkiLCJpbmRleFZhbHVlIiwic3VtIiwidmFsdWVzIiwia2V5TmFtZSIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJwYWRTdGFydCIsImdldERhdGUiLCJDb2xsZWN0b3JBcGkiLCJTSFVURE9XTiIsIkZMSVBGTEFHIiwibW9uaXRvciIsImVhcmx5TG9nU2VudCIsImhpZGVSZW1vdmVkIiwiY29va2llUGN0IiwicGFja0FuZFF1ZXVlQXJyaXZhbExvZyIsInByb3RvdHlwZSIsIkdMT1ZfT04iLCJpc0xhYmVsU2VudCIsInRpbWVvdXRDb3VudGVyIiwiaXNTaG93cm9vbSIsImlzT24iLCJzZW5kTG9ncyJdLCJzb3VyY2VSb290IjoiIn0=
