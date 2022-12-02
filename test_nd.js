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
;// CONCATENATED MODULE: ./src/utils.js





function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



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
  }, time);
  return controller;
};

var fetchPlus = function fetchPlus(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var retries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
    signal: utils_timeout(500).signal
  })).then(function (res) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUErQzs7Ozs7Ozs7QUNBL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsTUFBTTtBQUNOLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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Y2VzIjpbIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL3N0cmluZ1V0aWxzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvbG9nZ2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlRGF0YUNvbGxlY3Rpb24vc3RvcmUuY29uZmlnLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlRGF0YUNvbGxlY3Rpb24vYXBpLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlRGF0YUNvbGxlY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVNb25pdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9kYXRhTGF5ZXJDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbGVtZW50Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZnVuY3Rpb25DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9zZXNzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvdXJsQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZW52Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuY29uZmlnLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Byb2R1Y3RJbmZvQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2FzeW5jLW11dGV4L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvc2VnbWVudC1jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvcmVwbGFjZS11dGlscy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9hY3Rpb24tY29uZGl0aW9uLXV0aWwuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVPbi9yb2JvdEVuZ2luZS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZU9uL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQ2xpZW50U0RLL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIGRlZmluZShHcCwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gIGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvbik7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIGluIG1vZGVybiBlbmdpbmVzXG4gIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgY29uc3QgcmVwbGFjZUFsbCA9IChzdHIsIGZpbmQsIHJlcGxhY2UgPSBcIlwiKSA9PiB7XG4gIGlmICghc3RyKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICBpZiAoaW5kZXggPCAwKSByZXR1cm4gc3RyO1xuXG4gIHdoaWxlIChzdHIuaW5kZXhPZihmaW5kKSA+PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgICBzdHIgPSAoaW5kZXggPiAwID8gc3RyLnN1YnN0cmluZygwLCBpbmRleCkgOiBcIlwiKSArIHJlcGxhY2UgKyBzdHIuc3Vic3RyaW5nKGluZGV4ICsgZmluZC5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJraXNoVG9Mb3dlciA9IChzdHIpID0+IHtcbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcbiAgbGV0IHN0cmluZyA9IHN0cjtcbiAgY29uc3QgbGV0dGVycyA9IHtcIsSwXCI6IFwiaVwiLCBcIklcIjogXCLEsVwiLCBcIsWeXCI6IFwixZ9cIiwgXCLEnlwiOiBcIsSfXCIsIFwiw5xcIjogXCLDvFwiLCBcIsOWXCI6IFwiw7ZcIiwgXCLDh1wiOiBcIsOnXCJ9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKChbxLBJxZ7EnsOcw4fDll0pKS9nLCBmdW5jdGlvbihsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyc1tsZXR0ZXJdO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4vc3RyaW5nVXRpbHNcIjtcbmNvbnN0IGlzU3RhZ2luZyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcInN0YWdpbmcudml2ZW5zZVwiKSA6IHRydWU7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIwLjAuMzhcIjtcbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA9IFwiX2dhXCI7XG4vLyBUT0RPIHJldmVydCB0aGUgZm9sbG93aW5nIHN0YWdpbmcgZW52IGNoZWNrIGFmdGVyIG1vdmluZyB0byBuZXcgYnJhbmNoIHN0cnVjdHVyZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNUWUxFU0hFRVRfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzX3N0YWdpbmcuY3NzXCIgOiBgaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXMuY3NzP2lkPSR7cmVwbGFjZUFsbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEzKS5yZXBsYWNlKFwiVFwiLCBcIlwiKSwgXCItXCIsIFwiXCIpfWA7XG5leHBvcnQgY29uc3QgRV9SVUxFU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlc19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlcy5qc29uXCI7XG5leHBvcnQgY29uc3QgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OID0gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3NvY2lhbC1wcm9vZi50eHRcIjtcbmV4cG9ydCBjb25zdCBMT0dfQVBJX1VSTCA9IFwiaHR0cHM6Ly9ldXJvcGUtd2VzdDMtbmV4dGRheS0zNGViMy5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2xvZ1wiO1xuZXhwb3J0IGNvbnN0IExPT0tVUF9BUElfVVJMID0gXCJodHRwczovL2NhdGFsb2ctYXBpLmFkb3JhYWkuY29tXCI7XG5leHBvcnQgY29uc3QgTU9CSUxFX01FRElBX1FVRVJZID0gXCIobWF4LXdpZHRoOiA0NDBweClcIjtcbi8vIENvbnRyb2wgZ3JvdXAgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFNQTElUX1JBVElPID0gNTA7XG4vLyBTa2lwcGVkIHRyZWF0bWVudCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19EVVJBVElPTiA9IDE7XG5leHBvcnQgY29uc3QgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04gPSAxO1xuZXhwb3J0IGNvbnN0IExJU1RfTU9ERV9CRUFHTEVfS0VZUyA9IFtcInBhZ2V0eXBlXCIsIFwiY2F0ZWdvcnlcIiwgXCJhbGx0aW1lUExQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBMUENhdGVnb3J5TW9kZVwiLFxuICBcImFsbHRpbWVQRFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUERQQ2F0ZWdvcnlNb2RlXCIsIFwiYWxsdGltZUNhcnRDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uQ2FydENhdGVnb3J5TW9kZVwiXTtcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFRJTUVPVVRfQ09VTlQ6IFwiQkdfVGltZW91dENvdW50XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG4gIFdFSUdIVFM6IFwiQkdfV2VpZ2h0c1wiLFxuICBFTElHSUJJTElUWV9SVUxFUzogXCJCR19FX1J1bGVzXCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBPVVRfT0ZfU0NPUEU6IFwiQkdfT3V0T2ZTY29wZVwiLFxuICBJU19MQUJFTF9TRU5UOiBcIkJHX0xhYmVsU2VudFwiLFxuICBVU0VSX0lEOiBcIkJHX1VzZXJJZF8wMFwiLFxuICBEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFOiBcIkJHX0NvbGxlY3Rpb25EYXRhU2l6ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9TVE9SQUdFX1BSRUZJWCA9IFwiQkdfU2VnX1wiO1xuIiwiaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVN9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3Iob3JpZ2luID0gXCJCZWFnbGUgQ2xpZW50IFNES1wiLCB0ZXN0aW5nID0gZmFsc2UpIHtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICBpZiAodGVzdGluZykge1xuICAgICAgdGhpcy5ERUJVRyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuREVCVUcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkRFQlVHX01PREUpO1xuICAgIH1cbiAgfVxuXG4gIGluZm8oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmluZm8oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBsb2coLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKERFQlVHKSB7XG4gICAgICBjb25zb2xlLmxvZyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBmYWlsZWQoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiByZWRcIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBzdWNjZXNzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogZ3JlZW5cIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICB3YXJuKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS53YXJuKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgZXJyb3IoLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmVycm9yKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgU1RZTEVTSEVFVF9MT0NBVElPTixcbiAgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04sXG4gIFRSRUFUTUVOVFNfTE9DQVRJT04sXG4gIEVfUlVMRVNfTE9DQVRJT04sXG4gIFBST0RVQ1RfSU5GT19MT0NBVElPTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG4gIC8vIFRPRE8gcmVtb3ZlIGFmdGVyIHRhZyBpcyB1cGRhdGVkXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJuZXh0RGF5LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UU19MT0NBVElPTik7XG4gICAgY29uc3QganNvblRyZWF0bWVudCA9IGF3YWl0IHRyZWF0bWVudHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnQgd2VpZ2h0c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IHRyZWF0bWVudFdlaWdodHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50V2VpZ2h0cztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCB0cmVhdG1lbnQgd2VpZ2h0c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIGVsaWdpYmlsaXR5IHJ1bGVzXCIpO1xuICAgIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBmZXRjaFBsdXMoRV9SVUxFU19MT0NBVElPTik7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2hQbHVzKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9DU1YgPSBhd2FpdCBwcm9kdWN0SW5mby50ZXh0KCk7XG4gICAgcmV0dXJuIGNzdlRvQXJyYXkocHJvZHVjdEluZm9DU1YpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0aW1lb3V0ID0gKHRpbWUpID0+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIHRpbWUpO1xuICByZXR1cm4gY29udHJvbGxlcjtcbn07XG5cbmNvbnN0IGZldGNoUGx1cyA9ICh1cmwsIG9wdGlvbnMgPSB7fSwgcmV0cmllcyA9IDUpID0+XG4gIGZldGNoKHVybCwgey4uLm9wdGlvbnMsIHNpZ25hbDogdGltZW91dCg1MDApLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGxvZ2dlci5mYWlsZWQoXCJGZXRjaCBmYWlsZWQ6IFwiLCBlcnJvci5tZXNzYWdlKSk7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcik7XG4gICAgaWYgKGhhc2ggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzID0gKCkgPT4ge1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHLCBTRVNTSU9OX1RJTUVTVEFNUCwgU0VTU0lPTl9ISVNUT1JZfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHBvcHVwRGlzcGxheUZsYWcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRyk7XG4gIGNvbnN0IHNlc3Npb25UaW1lc3RhbXAgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QKTtcbiAgY29uc3Qgc2Vzc2lvbkhpc3RvcnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fSElTVE9SWSk7XG5cbiAgaWYgKHBvcHVwRGlzcGxheUZsYWcgPT09IG51bGwpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMCk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uVGltZXN0YW1wKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCwgRGF0ZS5ub3coKSk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uSGlzdG9yeSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXSk7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHNlc3Npb25IaXN0b3J5XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb25kaXRpb25DaGVja2VyID0gKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSBcIm5vdEV4aXN0XCIpIHtcbiAgICBpZiAoIXJ1blRpbWVWYWx1ZSkge1xuICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fFxuICAgIHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZGl0aW9uID09PSBudWxsIHx8XG4gICAgY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogcnVuVGltZVZhbHVlIG9yIGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICBjYXNlIFwiZXhpc3RcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiaW5jbHVkZXNcIjpcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEluY2x1ZGVzXCI6XG4gICAgY2FzZSBcIm5vdENvbnRhaW5zXCI6XG4gICAgICBpZiAoIXJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90RXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlclRoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPiB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc1RoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlckVxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc0VxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiYmV0d2VlblwiOiB7XG4gICAgICBsZXQgW21pbiwgbWF4XSA9IHZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSBtaW4gJiYgcnVuVGltZVZhbHVlIDw9IG1heCkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYXNlIFwicmVnZXhcIjoge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIik7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChydW5UaW1lVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZCBcIiwgY29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERlYnVnTW9kZSA9IChvb3NSZWFzb24pID0+IHtcbiAgY29uc3Qge0RFQlVHX01PREUsIE9VVF9PRl9TQ09QRX0gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9XCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKE9VVF9PRl9TQ09QRSwgb29zUmVhc29uKTtcbiAgfVxuXG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTFcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0yXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDI7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MFwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBjdXJyZW50ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKERFQlVHX01PREUpKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgKGN1cnJlbnQgPyBcIm9uXCIgOiBcIm9mZlwiKSk7XG4gIHJldHVybiAoY3VycmVudCB8fCAwKTtcbn07XG5cbi8vIGdldCBHQSBjbGllbnQgaWQgdXNpbmcgZ2EuZ2V0QWxsKClcbmV4cG9ydCBjb25zdCBnZXRHYUNsaWVudElkID0gKCkgPT4ge1xuICBjb25zdCBnYSA9IHdpbmRvdy5nYTtcbiAgLy8gaWYgZ2EgYW5kIGdhLmdldEFsbCgpIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gbnVsbFxuICBpZiAoZ2EgJiYgZ2EuZ2V0QWxsKSB7XG4gICAgY29uc3QgdHJhY2tlcnMgPSBnYS5nZXRBbGwoKTtcbiAgICBpZiAodHJhY2tlcnMgJiYgdHJhY2tlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJhY2tlcnNbMF0uZ2V0KFwiY2xpZW50SWRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gZ2V0IGRldGVybWluaXN0aWMgbnVtZXJpYyBoYXNoIGZyb20gc3RyaW5nIHRoYXQgY29uYXRpbnMgb25seSBudW1iZXJzXG5leHBvcnQgY29uc3QgZ2V0VW5zZWN1cmVIYXNoID0gKHN0cikgPT4ge1xuICBsZXQgaGFzaCA9IDA7XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gIH1cbiAgLy8gcmV0dXJuIGFic29sdXRlIHZhbHVlXG4gIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbn07XG5cbi8vIGdlbmVyYXRlIGEgMzItYml0IHJhbmRvbSBpbnRlZ2VyXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApO1xufTtcblxuLy8gZ2V0IGN1cnJlbnQgdW5peCBlcG9jaCB0aW1lIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBnZXRVbml4VGltZSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0SWRlbnRpZmllciA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBsb2NhbCBzdG9yYWdlXCIsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2EgaW4gZmlyc3QgYXR0ZW1wdFwiLCBpZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2FcIiwgaWQpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgcmVhZCBHQSBjbGllbnQgaWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGluIGdldElkZW50aWZpZXJcIiwgZSk7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGVsaXZlcnlEYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZGF0ZTtcblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgc3RhcnRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgZW5kTW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIHN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgZW5kRGF5OiB1bmRlZmluZWQsXG4gIH07XG5cbiAgbGV0IG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKyktKFtcXFxcZF0rKVxcXFxzPyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzNdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKS0oW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCAhPT0gNSkgcmV0dXJuIGRhdGU7XG5cbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFsyXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzRdLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5zdGFydE1vbnRoSW5kZXggfHwgIXJlc3VsdC5lbmRNb250aEluZGV4KSByZXR1cm4gZGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0WWVhciA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBjb25zdCBlbmRZZWFyID0gcmVzdWx0LmVuZE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcblxuICAgIGNvbnN0IGVzdGltYXRlZFN0YXJ0ID0gbmV3IERhdGUoc3RhcnRZZWFyLCByZXN1bHQuc3RhcnRNb250aEluZGV4LCByZXN1bHQuc3RhcnREYXkpO1xuICAgIGNvbnN0IGVzdGltYXRlZEVuZCA9IG5ldyBEYXRlKGVuZFllYXIsIHJlc3VsdC5lbmRNb250aEluZGV4LCByZXN1bHQuZW5kRGF5KTtcblxuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkU3RhcnQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRFbmQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlcldlZWtzID0gc3RhcnREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChzdGFydERpZmZPdmVyRGF5cyAvIDcpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyV2Vla3MgPSBlbmREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChlbmREaWZmT3ZlckRheXMgLyA3KTtcblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSAtICR7ZW5kRGlmZk92ZXJEYXlzfSBHw7xuYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPj0gMSkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSBHw7xuIC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gZW5kRGlmZk92ZXJXZWVrcykge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaWRsZVRpbWVyID0gYXN5bmMgKHRpbWVPdXQsIGNhbGxCYWNrKSA9PiB7XG4gIGxldCBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQub250b3VjaHN0YXJ0ID0gcmVzZXRUaW1lcjtcblxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xuICAgIGNsZWFyVGltZW91dChpZGxlVGltZW91dCk7XG4gICAgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJUeXBlID0gKCkgPT4ge1xuICBjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2Nocm9tZXxjaHJvbWl1bXxjcmlvcy9pKSkge1xuICAgIHJldHVybiBcImNocm9tZVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveHxmeGlvcy9pKSkge1xuICAgIHJldHVybiBcImZpcmVmb3hcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL3NhZmFyaS9pKSkge1xuICAgIHJldHVybiBcInNhZmFyaVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvb3ByXFwvL2kpKSB7XG4gICAgcmV0dXJuIFwib3BlcmFcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2VkZy9pKSkge1xuICAgIHJldHVybiBcImVkZ2VcIjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3duTXV0YXRpb24gPSAobXV0YXRpb25MaXN0KSA9PiB7XG4gIGNvbnN0IG5vZGVzID0gWy4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5yZW1vdmVkTm9kZXMpXTtcbiAgcmV0dXJuIG5vZGVzLnNvbWUoKG4pID0+IHtcbiAgICByZXR1cm4gbi50YWdOYW1lICYmIEFycmF5LmZyb20obi5jbGFzc0xpc3QpLnNvbWUoKGMpID0+IGMuaW5jbHVkZXMoXCJibi1cIikpO1xuICB9KTtcbn07XG5cbi8vIHJlZjogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTI5MzE2My8yMzQzXG4vLyBUaGlzIHdpbGwgcGFyc2UgYSBkZWxpbWl0ZWQgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Zcbi8vIGFycmF5cy4gVGhlIGRlZmF1bHQgZGVsaW1pdGVyIGlzIHRoZSBjb21tYSwgYnV0IHRoaXNcbi8vIGNhbiBiZSBvdmVycmlkZW4gaW4gdGhlIHNlY29uZCBhcmd1bWVudC5cbmZ1bmN0aW9uIGNzdlRvQXJyYXkoIHN0ckRhdGEsIHN0ckRlbGltaXRlciApIHtcbiAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBkZWxpbWl0ZXIgaXMgZGVmaW5lZC4gSWYgbm90LFxuICAvLyB0aGVuIGRlZmF1bHQgdG8gY29tbWEuXG4gIHN0ckRlbGltaXRlciA9IChzdHJEZWxpbWl0ZXIgfHwgXCIsXCIpO1xuXG4gIC8vIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBwYXJzZSB0aGUgQ1NWIHZhbHVlcy5cbiAgY29uc3Qgb2JqUGF0dGVybiA9IG5ldyBSZWdFeHAoXG4gICAgICAoXG4gICAgICAvLyBEZWxpbWl0ZXJzLlxuICAgICAgICBcIihcXFxcXCIgKyBzdHJEZWxpbWl0ZXIgKyBcInxcXFxccj9cXFxcbnxcXFxccnxeKVwiICtcblxuICAgICAgICAgICAgICAvLyBRdW90ZWQgZmllbGRzLlxuICAgICAgICAgICAgICBcIig/OlxcXCIoW15cXFwiXSooPzpcXFwiXFxcIlteXFxcIl0qKSopXFxcInxcIiArXG5cbiAgICAgICAgICAgICAgLy8gU3RhbmRhcmQgZmllbGRzLlxuICAgICAgICAgICAgICBcIihbXlxcXCJcXFxcXCIgKyBzdHJEZWxpbWl0ZXIgKyBcIlxcXFxyXFxcXG5dKikpXCJcbiAgICAgICksXG4gICAgICBcImdpXCIsXG4gICk7XG5cblxuICAvLyBDcmVhdGUgYW4gYXJyYXkgdG8gaG9sZCBvdXIgZGF0YS4gR2l2ZSB0aGUgYXJyYXlcbiAgLy8gYSBkZWZhdWx0IGVtcHR5IGZpcnN0IHJvdy5cbiAgY29uc3QgYXJyRGF0YSA9IFtbXV07XG5cbiAgLy8gQ3JlYXRlIGFuIGFycmF5IHRvIGhvbGQgb3VyIGluZGl2aWR1YWwgcGF0dGVyblxuICAvLyBtYXRjaGluZyBncm91cHMuXG4gIGxldCBhcnJNYXRjaGVzID0gbnVsbDtcblxuXG4gIC8vIEtlZXAgbG9vcGluZyBvdmVyIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gbWF0Y2hlc1xuICAvLyB1bnRpbCB3ZSBjYW4gbm8gbG9uZ2VyIGZpbmQgYSBtYXRjaC5cbiAgd2hpbGUgKGFyck1hdGNoZXMgPSBvYmpQYXR0ZXJuLmV4ZWMoIHN0ckRhdGEgKSkge1xuICAgIC8vIEdldCB0aGUgZGVsaW1pdGVyIHRoYXQgd2FzIGZvdW5kLlxuICAgIGNvbnN0IHN0ck1hdGNoZWREZWxpbWl0ZXIgPSBhcnJNYXRjaGVzWzFdO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBnaXZlbiBkZWxpbWl0ZXIgaGFzIGEgbGVuZ3RoXG4gICAgLy8gKGlzIG5vdCB0aGUgc3RhcnQgb2Ygc3RyaW5nKSBhbmQgaWYgaXQgbWF0Y2hlc1xuICAgIC8vIGZpZWxkIGRlbGltaXRlci4gSWYgaWQgZG9lcyBub3QsIHRoZW4gd2Uga25vd1xuICAgIC8vIHRoYXQgdGhpcyBkZWxpbWl0ZXIgaXMgYSByb3cgZGVsaW1pdGVyLlxuICAgIGlmIChcbiAgICAgIHN0ck1hdGNoZWREZWxpbWl0ZXIubGVuZ3RoICYmXG4gICAgICAgICAgICAgIHN0ck1hdGNoZWREZWxpbWl0ZXIgIT09IHN0ckRlbGltaXRlclxuICAgICkge1xuICAgICAgLy8gU2luY2Ugd2UgaGF2ZSByZWFjaGVkIGEgbmV3IHJvdyBvZiBkYXRhLFxuICAgICAgLy8gYWRkIGFuIGVtcHR5IHJvdyB0byBvdXIgZGF0YSBhcnJheS5cbiAgICAgIGFyckRhdGEucHVzaCggW10gKTtcbiAgICB9XG5cbiAgICBsZXQgc3RyTWF0Y2hlZFZhbHVlO1xuXG4gICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBvdXIgZGVsaW1pdGVyIG91dCBvZiB0aGUgd2F5LFxuICAgIC8vIGxldCdzIGNoZWNrIHRvIHNlZSB3aGljaCBraW5kIG9mIHZhbHVlIHdlXG4gICAgLy8gY2FwdHVyZWQgKHF1b3RlZCBvciB1bnF1b3RlZCkuXG4gICAgaWYgKGFyck1hdGNoZXNbMl0pIHtcbiAgICAgIC8vIFdlIGZvdW5kIGEgcXVvdGVkIHZhbHVlLiBXaGVuIHdlIGNhcHR1cmVcbiAgICAgIC8vIHRoaXMgdmFsdWUsIHVuZXNjYXBlIGFueSBkb3VibGUgcXVvdGVzLlxuICAgICAgc3RyTWF0Y2hlZFZhbHVlID0gYXJyTWF0Y2hlc1syXS5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoIFwiXFxcIlxcXCJcIiwgXCJnXCIgKSxcbiAgICAgICAgICBcIlxcXCJcIixcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIGZvdW5kIGEgbm9uLXF1b3RlZCB2YWx1ZS5cbiAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbM107XG4gICAgfVxuXG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIG91ciB2YWx1ZSBzdHJpbmcsIGxldCdzIGFkZFxuICAgIC8vIGl0IHRvIHRoZSBkYXRhIGFycmF5LlxuICAgIGFyckRhdGFbYXJyRGF0YS5sZW5ndGggLSAxXS5wdXNoKCBzdHJNYXRjaGVkVmFsdWUgKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgcGFyc2VkIGRhdGEuXG4gIHJldHVybiAoIGFyckRhdGEgKTtcbn1cbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50OiAxMDAwLCAvLyBhZmZlY3RzIHZlcnNpb25cbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImRhdGFcIixcbiAgICBpbmRleGVzOiBbe1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZVwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcInNlc3Npb25faWRcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwiZGF0YV92YWx1ZVwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcImlkXCIsIGF1dG9JbmNyZW1lbnQ6IHRydWV9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7Z2V0QnJvd3NlclR5cGV9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXJcIik7XG5jb25zdCBfd2luZG93ID0ge1xuICBhbGx0aW1lOiBcImFsbHRpbWVcIiwgc2Vzc2lvbjogXCJzZXNzaW9uXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBpbml0aWFsaXplZCBkYiB3aXRoOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgLy8gVE9ETywgdW5jb21tZW50IG5leHQgbGluZSBvbmNlIGV4aXN0aW5nIHN0YWxlIGRicyBhcmUgcHVyZ2VkXG4gICAgLy8gY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lLCBjb25maWcudmVyc2lvbik7XG4gICAgY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGluZGV4ZWQgREJcIiwgb3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkYiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICAgIGlmIChkYi52ZXJzaW9uICE9PSAxKSB7XG4gICAgICAgIC8vIFRPRE8sIHJlbW92ZSBkZWxldGUgcmVxdWVzdCBvbmNlIGV4aXN0aW5nIHN0YWxlIGRicyBhcmUgcHVyZ2VkXG4gICAgICAgIGNvbnN0IGRlbGV0ZVJlcXVlc3QgPSB3aW5kb3cuaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKGNvbmZpZy5kYk5hbWUpO1xuICAgICAgICBkZWxldGVSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB0aGlzLmluZGV4ZWREQiA9IGRiO1xuICAgIH07XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAyNSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJJbmRleGVkREIgbm90IGluaXRpYWxpemVkIHdpdGhpbiB0aGUgYWxsb3R0ZWQgdGltZVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaW5pdFRyYW5zYWN0aW9uKHJlYWR3cml0ZSA9IGZhbHNlKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgdHggPSB0aGlzLmluZGV4ZWREQi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSwgKHJlYWR3cml0ZSA/IFwicmVhZHdyaXRlXCIgOiBcInJlYWRvbmx5XCIpKTtcbiAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcblxuICAgIHJldHVybiBzdG9yZTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUoZGF0YU5hbWUsIGRhdGFWYWx1ZSkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgY29uc3Qgc2Vzc2lvbklkID0gdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCk7IC8vIGRhdGUgY3VycmVudCAtMiBzYWF0ICB5aWwtYXktZ3VuXG4gICAgY29uc3QgdGltZSA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcImRhdGFfbmFtZVwiOiBkYXRhTmFtZSwgXCJkYXRhX3ZhbHVlXCI6IGRhdGFWYWx1ZSwgXCJzZXNzaW9uX2lkXCI6IHNlc3Npb25JZCwgdGltZX07XG4gICAgc3RvcmUucHV0KHBheWxvYWQpO1xuICB9XG5cbiAgbWlubWF4KGRhdGFOYW1lLCBvcCwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBzdG9yZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHN0b3JlZCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgKG9wID09PSBcIm1pblwiICYmIHZhbHVlW1wiZGF0YV92YWx1ZVwiXSA8IHN0b3JlZCkgfHxcbiAgICAgICAgICAgICAgICAob3AgPT09IFwibWF4XCIgJiYgdmFsdWVbXCJkYXRhX3ZhbHVlXCJdID4gc3RvcmVkKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdG9yZWQgPSB2YWx1ZVtcImRhdGFfdmFsdWVcIl07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoc3RvcmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG1pbihkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWlubWF4KGRhdGFOYW1lLCBcIm1pblwiLCB3aW5kb3cpO1xuICB9XG5cbiAgbWF4KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy5taW5tYXgoZGF0YU5hbWUsIFwibWF4XCIsIHdpbmRvdyk7XG4gIH1cblxuICBncm91cEJ5KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmICghbWFwLmhhcyh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pKSBtYXAuc2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSwgMCk7XG4gICAgICAgICAgICAgIG1hcC5zZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdLCBtYXAuZ2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSkgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUobWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIG1vZGUoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmdyb3VwQnkoZGF0YU5hbWUsIHdpbmRvdyk7XG4gICAgaWYgKGRhdGEua2V5cygpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBtYXggPSB7bmFtZTogdW5kZWZpbmVkLCB2YWx1ZTogLTF9O1xuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgaWYgKG1heC52YWx1ZSA8IHZhbHVlKSB7XG4gICAgICAgIG1heC5uYW1lID0ga2V5O1xuICAgICAgICBtYXgudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF4O1xuICB9XG5cbiAgY291bnQoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShjb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdW0oZGF0YU5hbWUsIHdpbmRvdyA9IFwiYWxsdGltZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCB0b3RhbCA9IDAuMDA7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdG90YWwgKz0gcGFyc2VGbG9hdCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSh0b3RhbC50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSwgZGF0YVZhbHVlID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGRhdGFWYWx1ZSkge1xuICAgICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZV9zZXNzaW9uXCIpXG4gICAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgZGF0YVZhbHVlLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKS50b1N0cmluZygpXSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVcIilcbiAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgZGF0YVZhbHVlXSkpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiKVxuICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKS50b1N0cmluZygpXSkpO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4VmFsdWUgPSBnZXRCcm93c2VyVHlwZSgpID09PSBcInNhZmFyaVwiID8gZGF0YU5hbWUgOiBbZGF0YU5hbWVdO1xuXG4gICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVcIilcbiAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShpbmRleFZhbHVlKSk7XG4gIH1cblxuICBhc3luYyBhdmcoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIGNvbnN0IHRvdGFsID0gYXdhaXQgdGhpcy5zdW0oZGF0YU5hbWUsIHdpbmRvdyk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCB0aGlzLmNvdW50KGRhdGFOYW1lLCB3aW5kb3cpO1xuXG4gICAgaWYgKCF0b3RhbCB8fCAhY291bnQpIHJldHVybiAwO1xuXG4gICAgcmV0dXJuICh0b3RhbCAvIGNvdW50KS50b0ZpeGVkKDIpO1xuICB9XG5cbiAgYXN5bmMgbGFzdChkYXRhTmFtZSwgc2l6ZSA9IDEsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgY3Vyc29yID0gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZVwiKS5vcGVuQ3Vyc29yKFtkYXRhTmFtZV0sIFwicHJldlwiKTtcbiAgICAgICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICAgICAgY3Vyc29yID0gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIpXG4gICAgICAgICAgICAgIC5vcGVuQ3Vyc29yKFtkYXRhTmFtZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCldLCBcInByZXZcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgY3Vyc29yLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAocmVzdWx0ICYmIGluZGV4IDwgc2l6ZSkge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNlc3Npb25JZCgpIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICBkLnNldEhvdXJzKGQuZ2V0SG91cnMoKSAtIDIpO1xuXG4gICAgcmV0dXJuIGQuZ2V0RnVsbFllYXIoKSArIFwiLVwiICtcbiAgICAgIChkLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKSArIFwiLVwiICtcbiAgICAgIGQuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgQ29sbGVjdG9yQXBpIGZyb20gXCIuLi9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGlcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25cIik7XG5jb25zdCBjb2xsZWN0b3JBcGkgPSBuZXcgQ29sbGVjdG9yQXBpKCk7XG5cbi8vIGtlZXAgYSB0YWJsZSBpbiBpbmRleGRiIHRoZSBmb3JtYXQgW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgZGF0YV92YWx1ZSwgc3RvcmVkX3ZhbHVlXVxuXG5leHBvcnQgY29uc3QgcXVlcnlJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpID0+IHtcbiAgbG9nZ2VyLmxvZyhcInF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KTtcbiAgaWYgKCFjb2xsZWN0b3JBcGkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiSW5kZXhlZERCIG5vIHN1cHBvcnRlZC9Jbml0aWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHdpbmRvdyBjYW4gYmUgZWl0aGVyIHNhbWVkYXkgb3IgYWxsdGltZVxuXG4gIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtaW5cIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5taW4oYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwibWF4XCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubWF4KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImF2Z1wiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLmF2ZyhiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjZFwiKSB7XG4gICAgcmV0dXJuIChhd2FpdCBjb2xsZWN0b3JBcGkuZ3JvdXBCeShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdykpLnNpemU7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiY3ZcIikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb2xsZWN0b3JBcGkuZ3JvdXBCeShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGNvdW50ICs9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBpZiAocXVlcnlNZXRob2QgPT09IFwibW9kZVwiKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNvbGxlY3RvckFwaS5tb2RlKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBkYXRhLm5hbWU7XG4gIH1cblxuICBpZiAocXVlcnlNZXRob2QuaW5kZXhPZihcImxhc3RcIikgPj0gMCkge1xuICAgIGNvbnN0IG1hdGNoID0gcXVlcnlNZXRob2QubWF0Y2goXCJsYXN0XFxcXCgoW1xcXFxkXSspXFxcXClcIik7XG4gICAgaWYgKCFtYXRjaCB8fCAhbWF0Y2gubGVuZ3RoID09PSAyIHx8IHBhcnNlSW50KG1hdGNoWzFdKSA8IDEgKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubGFzdChiYXNlRmVhdHVyZU5hbWUsIG1hdGNoWzFdLCB3aW5kb3cpO1xuICAgIGNvbnN0IGRhdGFWYWx1ZXMgPSBxdWVyeVByb21pc2UubWFwKChvYmopID0+IG9iai5kYXRhX3ZhbHVlKTtcbiAgICByZXR1cm4gZGF0YVZhbHVlcztcbiAgfVxuXG4gIC8qKlxuICAgIHtcIkxpc3RpbmdwYWdlXCIgPT4gMjF9XG4gICAge1wiSG9tZXBhZ2VcIiA9PiAxMn1cbiAgICAtLSBleGFtcGxlIHdpbGwgaGF2ZTpcbiAgICBtb2RlOiBMaXN0aW5ncGFnZVxuICAgIGNkOiAyXG4gICAgY3Y6IDIxKzEyXG4gICAgbGFzdCgzKSAobiwgbi0xLCBuLTIpXG4gICovXG5cbiAgLy8gMTAwMGxpayB0ZW1pemxlbmVjZWsgKG1haW50T3BDb3VudCAtPiB2ZXJzaW9uKVxuXG4gIC8vIHF1ZXJ5TWV0aG9kIGNhbiBiZSBcIm1vZGVcIiwgXCJjZFwiIChjb3VudCBkaXN0aW50KSBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXNcbiAgLy8gcXVlcnlNZXRob2QgY2FuIGJlIFwiY3ZcIiAoc3VtIG9mIGNvdW50IHZhbHVlcyksIFwiY3VycmVudFwiLCBvciBcInByZXZcIiBmb3IgYW55IGRhdGEgdHlwZSAoc3RvcmVkIHZpYSBsYXN0KVxuICBsb2dnZXIuZmFpbGVkKGB1bmtub3duIHF1ZXJ5TWV0aG9kPSR7cXVlcnlNZXRob2R9IGluIEJlYWdsZURhdGFDb2xsZWN0aW9uYCk7XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJ1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCk7XG4gIGlmICghY29sbGVjdG9yQXBpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkluZGV4ZWREQiBubyBzdXBwb3J0ZWQvSW5pdGlhbGl6ZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhd2FpdCBjb2xsZWN0b3JBcGkuc2F2ZShiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpO1xuXG5cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcIm1pblwiLCBcIm1heFwiLCBcImNudFwiLCBcInN1bVwiIGZvciBudW1lcmljIGRhdGEgdHlwZXMsIG1pbi1tYXggY29tcGFyZXMgd2l0aCBvbmx5IGV4aXN0aW5nLCBhdmcgdXBkYXRlcyBjbnQgYW5kIHN1bVxuICAvLyAtLT4gbWluOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcIm1pblwiLCAobGVhc3Qgb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBtYXg6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwibWF4XCIsIChncmVhdGVzdCBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IHN1bTogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJzdW1cIiwgKHN1bSBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IGNudDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjbnRcIiwgKGV4aXN0aW5nICsgMSldXG4gIC8vXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJjb3VudF92YWx1ZXNcIiBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXMsIGtlZXAgYSBjb3VudGVyIGZvciBlYWNoIHZhbHVlXG4gIC8vIC0tPiBjb3VudF92YWx1ZXM6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIGRhdGFfdmFsdWUsIChleGlzdGluZyArIDEpXVxuICAvL1xuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwibGFzdFwiIGZvciBhbnkgZGF0YSB0eXBlIC0tPiBrZWVwcyAyIHZhbHVlcyBmb3IgY3VycmVudCBhbmQgdGhlIHByZXZpb3VzXG4gIC8vIGRlbGV0ZTogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJwcmV2XCIsIChleGlzdGluZyB2YWx1ZSldXG4gIC8vIG1vdmU6IGV4aXN0aW5nIFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY3VycmVudFwiLCAoZXhpc3RpbmcgdmFsdWUpXSAtLT4gW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJwcmV2XCIsIChleGlzdGluZyB2YWx1ZSldXG4gIC8vIHB1dDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjdXJyZW50XCIsIChpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7Zm9ybWF0RGVsaXZlcnlEYXRlLCBpc093bk11dGF0aW9ufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVMsIFNQTElUX1JBVElPLCBWRVJTSU9OfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge3F1ZXJ5SW5Db2xsZWN0b3IsIHVwZGF0ZUluQ29sbGVjdG9yfSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb25cIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG53aW5kb3cuYmVhZ2xlSW5mb0xheWVyID0gd2luZG93LmJlYWdsZUluZm9MYXllciB8fCB7XG4gIGE6IHt9LCBlOiB7fSwgZjoge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllclwiKTtcblxuLy8gVE9ETzogY29udmVydCB0byBuYW1lIC0tPiBhcnJheSBvZiBzZWxlY3RvcnNcbmNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2xhc3NcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5pc0luU2hvd3Jvb21cIiwgbmFtZTogXCJwZHAuaXNJblNob3dyb29tXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNhdGVnb3J5X3Byb2R1Y3RfY291bnRcIiwgbmFtZTogXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBscC5jbGFzc1wiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInB1cmNoYXNlLnByaWNlc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5xdWFudGl0eVwiLCBuYW1lOiBcInB1cmNoYXNlLnF1YW50aXRpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwdXJjaGFzZS5jYXRlZ29yaWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLm9yZGVySWRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLnJldmVudWVcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5kaW1lbnNpb24xNVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRG9jdW1lbnQgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicGFnZV9wcmV2aWV3X3dyYXBwZXJfcHJvZHVjdGlvblxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiSG9tZXBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXRlZ29yeV9wYWdlX3dyYXBwZXJcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkxpc3RpbmdwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiYm9keSA+IC5kZXNrdG9wX2xheW91dF93cmFwcGVyIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY29wdW9uTm90QXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVGb3JtYXR0ZWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwiZm9ybWF0RGVsaXZlcnlEYXRlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiN2aXZlbnNlLXNob3dyb29tLXRhYiBwOm5vdCgudml2ZW5zZS1zaG93cm9vbXMpXCIsIG5hbWU6IFwicGRwLmhhc05vU2hvd3Jvb21zXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJwZHAuc2hvd3Jvb21jb3VudFwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInN1YmNhdGVnb3JpZXMtdGl0bGVcXFwiXVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtY2FyZFtkYXRhLXByb2R1Y3Qtc2t1XVwiLCBuYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJvZHVjdC1za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtbGlzdFwiLCBvYnNlcnZlcjogXCJsaXN0aW5nSXRlbUJsb2NrXCIsIG5hbWU6IFwiX19saXN0aW5nSXRlbUJsb2NrT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmVtcHR5LWNhcnQtY29udGFpbmVyLCAuZW1wdHktY2FydFwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmJyYWNrZXQtdGV4dCwgLnByb2R1Y3QtY291bnRcIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnRJdGVtUXVhbnRpdHlcIiwgbmFtZTogXCJjYXJ0LnF1YW50aXRpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByZXZpb3VzXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI2JpbGxfdG90YWxcIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlci1maW5hbC1udW1iZXJcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2FydC1wcmljZVxcXCJdIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY291cG9uQXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXNrdVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuY2F0ZWdvcmllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtbGFzdC1icmVhZGNydW1iXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5wcmljZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByaWNlXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAgLy8gRGVza3RvcCBvYnNlcnZlciBmb3IgdGhlIHJpZ2h0IHBhbmVsLCBhcyBpdCBpcyB0aGUgb25lIGNoYW5naW5nXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LXJpZ2h0LWNvbnRhaW5lclwiLCBvYnNlcnZlcjogXCJjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIC8vIE1vYmlsZSBvYnNlcnZlciBmb3IgdGhlIGZ1bGwgZm9ybSBibG9jayBhcyBpdCBpcyBjb21wbGV0ZWx5IHJlcGxhY2VkXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNjaGVja291dEZvcm1cIiwgb2JzZXJ2ZXI6IFwiY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3N1bW1hcnlfdG90YWxcXFwiXSwgW2NsYXNzKj1cXFwidG90YWxfcm93XFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyX2ZvbGxvd19udW1iXFxcIl0sIFtjbGFzcyo9XFxcImNhcnQtdGl0bGUtYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS52dnNUeG5JZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wYXltZW50X3R5cGVfdGl0bGUsIC5jYXJ0LXRpdGxlLWluZm9cIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0X3NrdV9jb2RlXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJza3VcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibXBuXCIsIG5hbWU6IFwicGRwLm1wblwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlVmFsaWRVbnRpbFwiLCBuYW1lOiBcInBkcC5wcmljZVZhbGlkVW50aWxcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJpdGVtTGlzdEVsZW1lbnQuKi5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubnVtYmVyT2ZJdGVtc1wiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJicmVhZGNydW1iLml0ZW1MaXN0RWxlbWVudC4qLml0ZW0ubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFdpbmRvdyBjdXN0b20gZWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImZhdm9yaXRlUHJvZHVjdHNcIiwgbmFtZTogXCJ2aWV3LmZhdm9yaXRlZE1QTnNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwidG9TdHJpbmdcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5dO1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJjdlwiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgXSxcbn07XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIC8vIFRPRE86IGNoZWNrIGZlYXR1cmVFbmdpbmVlcmluZyBhbmQgc2VhcmNoIGxpc3QgaWYgYWxsIG1hcmtlZCBhcyBmb3VuZCBidXQgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nICR7bGFzdEtleX0gZnJvbSAke0pTT04uc3RyaW5naWZ5KG9iail9YCk7XG4gICAgZGVsZXRlIG9ialtsYXN0S2V5XTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgaW5mb0xheWVyW2tleV07XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCBudWxsKTtcbiAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCBudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUcmVhdG1lbnQgPSAoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBzdGF0dXMsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0ge307XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVJZCAhPT0gdW5kZWZpbmVkKSB2YWx1ZS5idXNpbmVzc1J1bGVJZCA9IGJ1c2luZXNzUnVsZUlkO1xuICBpZiAodmFyaWFudCkgdmFsdWUudmFyaWFudCA9IHZhcmlhbnQ7XG5cbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiYXBwbGllZFwiOlxuICAgICAgaW5mb0xheWVyLmFbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2tpcHBlZFwiOlxuICAgICAgdmFsdWUuZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQ7XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciA9IGFzeW5jICgpID0+IHtcbiAgLy8gQ29sbGVjdCBjb3JlIGRhdGFcbiAgcHJlcGFyZUNvcmVEYXRhKCk7XG5cbiAgLy8gVHJpZ2dlci1zdGFydCB0aGUgcGFyc2VyIGxvb3BcbiAgcGFyc2VyQ2FsbGVyKCk7XG5cbiAgLy8gQWRkIG1ldHJpY3NcbiAgYWRkTWV0cmljcygpO1xufTtcblxuY29uc3QgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvciA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYmFzZUZlYXR1cmVOYW1lcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVFbmdpbmVlcmluZ09wcyk7XG4gIGZvciAoY29uc3QgYmFzZUZlYXR1cmVOYW1lIG9mIGJhc2VGZWF0dXJlTmFtZXMpIHtcbiAgICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgICBpZiAoRkVPcC5xdWVyeU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnF1ZXJ5TWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgcXVlcnlJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIEZFT3AucXVlcnlNZXRob2QsIEZFT3Aud2luZG93KTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoRkVPcC5mZWF0dXJlTmFtZSwgcXVlcnlSZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSkgPT4ge1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AudXBkYXRlTWV0aG9kID09PSBudWxsIHx8IEZFT3AudXBkYXRlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgYXdhaXQgdXBkYXRlSW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCBGRU9wLnVwZGF0ZU1ldGhvZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgcGFyc2VyQ2FsbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSs9cGFyc2VJbnQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1bVByaWNlID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHN1bVByaWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgY29uc3QgYXJyYXlJbm5lclRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGFycmF5SW5uZXJUZXh0LnB1c2goY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SW5uZXJUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhcnJheUlubmVyVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH0gLy8gc3dpdGNoXG5cbiAgICBpZiAobGF5ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGxheWVyVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmZvcm1hdHRlcikge1xuICAgICAgICBsYXllclZhbHVlID0gcHJvY2Vzc0Zvcm1hdHRlcihsYXllclZhbHVlLCBzZWFyY2hFbGVtZW50LmZvcm1hdHRlcik7XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihzZWFyY2hFbGVtZW50Lm5hbWUsIGxheWVyVmFsdWUpO1xuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcblxuICAgICAgLy8gbWFyayBleGNsdXNpdmUgZWxlbWVudHMgYXMgZm91bmRcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlKSAmJiBzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgZXhjbHVzaXZlRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5pbmNsdWRlcyhleGNsdXNpdmVFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAgICAgICBleGNsdXNpdmVFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJzZWFyY2hPYmogZXJyb3I6IFwiICsgZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgY3VzdG9tRGF0YURlcml2YXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCAwKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJjdXN0b21EYXRhRGVyaXZhdGlvbnMgY2Fubm90IGNvbXB1dGUgY291cG9uQXBwbGljYWJsZVByaWNlOiBcIiArIGUpO1xuICB9XG5cbiAgLy8gUHJvZHVjdCBwYWdlIC0tPiB0cmFuc2ZlciBza3VzIHRvIHNpbmdsZSBsb2NhdGlvblxuICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiKTtcbiAgICBpZiAoc2t1IT09bnVsbCAmJiBza3UhPT11bmRlZmluZWQpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIFtza3VdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QhPT1udWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHNrdUxpc3QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHByZXBhcmVDb3JlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICAvKiBCZWFnbGUgZGF0YSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZcIiwgVkVSU0lPTik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50RGF0YT8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudDtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZQbGF0Zm9ybVwiLCBwbGF0Zm9ybSk7XG5cbiAgLyogd2luZG93IHZpZXcgYXJlYSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dQUmF0aW9cIiwgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIGNvbnN0IGF2YWlsV2luZG93ID0gd2luZG93UHRyLnNjcmVlbj8uYXZhaWxXaWR0aCArIFwieFwiICsgd2luZG93UHRyLnNjcmVlbj8uYXZhaWxIZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0F2YWlsXCIsIGF2YWlsV2luZG93KTtcblxuICBjb25zdCB3aW5kb3dEZXB0aCA9IHdpbmRvd1B0ci5zY3JlZW4/LmNvbG9yRGVwdGggKyBcIi1cIiArIHdpbmRvd1B0ci5zY3JlZW4/LnBpeGVsRGVwdGg7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0RlcHRoXCIsIHdpbmRvd0RlcHRoKTtcblxuICBjb25zdCB2cG9ydFNoYXBlID0gd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py53aWR0aCArIFwieFwiICsgd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py5oZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1Zwb3J0XCIsIHZwb3J0U2hhcGUpO1xuXG4gIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICBsZXQgd2lkdGggPSBwYXJzZUludChzY3JlZW4ud2lkdGgpO1xuICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBwYXJzZUludChzY3JlZW4uaGVpZ2h0KSA6IDA7XG4gICAgaWYgKHdpZHRoICE9PSAwICYmIGhlaWdodCAhPT0gMCkge1xuICAgICAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QocGxhdGZvcm0pO1xuICAgICAgaWYgKGlPUyAmJiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbykge1xuICAgICAgICAvLyBpb3MgcHJvdmlkZXMgRFBJcywgbmVlZCB0byBtdWx0aXBseVxuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGggKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25BbmdsZSA9IHdpbmRvd1B0ci5zY3JlZW4/Lm9yaWVudGF0aW9uPy5hbmdsZTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSA5MCB8fCBNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gMjcwKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBsYW5kc2NhcGUgb3JpZW50YXRpb24gc3dpdGNoIHZhbHVlcyBmb3IgYWxsIGV4Y2VwdCBpb3NcbiAgICAgICAgICBjb25zdCB0ZW1wID0gd2lkdGg7XG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQ7XG4gICAgICAgICAgaGVpZ2h0ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93XCIsIHdpZHRoICsgXCJ4XCIgKyBoZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIG5hdmlnYXRvciAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIaXN0U2l6ZVwiLCB3aW5kb3dQdHIuaGlzdG9yeT8ubGVuZ3RoKTtcblxuICAvLyBjaGVjayBpZiB1c2VyQWdlbnREYXRhIGlzIHN1cHBvcnRlZCBhbmQgdXNlckFnZW50IGlzIG5vdCBhdmFpbGFibGUsIHVzZSBpdFxuICBpZiAoIW5hdlB0ci51c2VyQWdlbnQpIHtcbiAgICBpZiAobmF2UHRyLnVzZXJBZ2VudERhdGEpIHtcbiAgICAgIC8vIHR1cm4gYnJhbmRzIGFycmF5IGludG8gc3RyaW5nXG4gICAgICBsZXQgbmF2QWdlbnQgPSBuYXZQdHI/LnVzZXJBZ2VudERhdGE/LmJyYW5kcz8ubWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuYnJhbmQgKyBcIjpcIiArIGUudmVyc2lvbjtcbiAgICAgIH0pLmpvaW4oKTtcbiAgICAgIC8vIGFkZCBtb2JpbGUgaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gKG5hdlB0cj8udXNlckFnZW50RGF0YT8ubW9iaWxlID8gXCJtb2JpXCIgOiBcIiBcIik7XG4gICAgICAvLyBhZGQgcGxhdGZvcm0gaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gcGxhdGZvcm07XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZBZ2VudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdlB0ci51c2VyQWdlbnQpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SFdDb3Jlc1wiLCBuYXZQdHIuaGFyZHdhcmVDb25jdXJyZW5jeSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkxhbmd1YWdlXCIsIG5hdlB0ci5sYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLmJyb3dzZXJMYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnN5c3RlbUxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIudXNlckxhbmd1YWdlLFxuICApO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZUb3VjaFwiLCBuYXZQdHIubWF4VG91Y2hQb2ludHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZWZW5kb3JcIiwgbmF2UHRyLnZlbmRvcik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmludGVybmV0U3BlZWRcIiwgd2luZG93UHRyLm5hdmlnYXRvcj8uY29ubmVjdGlvbj8uZG93bmxpbmspO1xuXG4gIC8qIG1pc2NlbGxhbmVvdXMgKi9cbiAgY29uc3QgY3VycmVudFVSTCA9IG5ldyBVUkwod2luZG93LnRvcC5sb2NhdGlvbi5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIsIGN1cnJlbnRVUkwuaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCBjdXJyZW50VVJMLmhvc3RuYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkb250dHJhY2tcIiwgbmF2UHRyLmRvTm90VHJhY2sgfHwgd2luZG93UHRyLmRvTm90VHJhY2sgfHwgbmF2UHRyLm1zRG9Ob3RUcmFjayk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIGNvbnN0IGZpcnN0U2Vzc2lvblJlZmVycmVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSKTtcbiAgaWYgKCFmaXJzdFNlc3Npb25SZWZlcnJlcikge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCBmaXJzdFNlc3Npb25SZWZlcnJlcik7XG4gIH1cblxuICAvKiBWaXZlbnNlIHNwZWNpZmljICovXG4gIGxldCBwYWdlVHlwZTtcbiAgLy8gaWYgdXJsIGxpa2UgeCB0aGVuIHNldCBQYWdlVHlwZSA9IHlcbiAgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImZhdm9yaWxlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJmYXZvcml0ZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImJhc2tldFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtb3pldGkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInB1cmNoYXNlXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwib2RlbWUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBheW1lbnRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJhZGRyZXNzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXN0b3JkZXJzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWtheWl0Lmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJyZWdpc3RlclwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1naXJpc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNpZ25pblwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImt1cG9ubGFyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfY291cG9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInByb2ZpbC1ndW5jZWxsZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9pbmZvXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9hZGRyZXNzZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJkdXl1cnUtdGVyY2lobGVyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9ub3RpZmljYXRpb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiaW5kaXJpbWxpLW1vYmlseWEta2FtcGFueWFsYXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzcGVjaWFsX2NhbXBhaWduc1wiO1xuICB9XG5cbiAgaWYgKHBhZ2VUeXBlKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCBwYWdlVHlwZSk7XG4gIH1cbn07XG5cbmNvbnN0IGFkZE1ldHJpY3MgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgcGVyZk1ldHJpY3MgPSB7fTtcbiAgY29uc3QgcGVyZk5hdmlnYXRpb25NZXRyaWNzID0gd2luZG93UHRyLnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdO1xuICBpZiAod2luZG93UHRyLnBlcmZvcm1hbmNlICYmIHBlcmZOYXZpZ2F0aW9uTWV0cmljcykge1xuICAgIHBlcmZNZXRyaWNzLmNvbm5lY3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MucmVxdWVzdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlc3BvbnNlRW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlcXVlc3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZG9tID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tSW50ZXJhY3RpdmUgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tQ29tcGxldGUpO1xuICAgIHBlcmZNZXRyaWNzLmxvYWQgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZHVyYXRpb24pO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibWV0cmljc1wiLCBwZXJmTWV0cmljcyk7XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU1vbml0b3JcIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBtb25pdG9yXCIpO1xuXG4gICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gZmFsc2U7XG5cbiAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBBdHRlbXB0cyB0byBzZW5kIHRoZSBpbml0aWFsIGxvZyBib2R5IChiZWFnbGVJbmZvTGF5ZXIncyBpbml0aWFsIHBvcHVsYXRpb24pIGltbWVkaWF0ZWx5XG4gIGFzeW5jIHNlbmRMb2dzKGltbWVkaWF0ZSkge1xuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBpbW1lZGlhdGUgc2VuZGluZyBibG9ja1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIGF3YWl0aW5nIHNjcmFwaW5nXCIpO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBzZW5kaW5nIGxvZ3NcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIGluaXRpYWwgbG9nIGJvZHkgYW5kIGluY3JlbWVudGFsIHVwZGF0ZSBsb2dzIG9uIGNsb3NlXG4gIGFzeW5jIGhhbmRsZUNsb3NlRXZlbnQoKSB7XG4gICAgLy8gaWYgaW5pdGlhbCBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCBzZW5kIHVwZGF0ZXMgYW5kIGluZm9sYXllciBpbiBvbmUgYmF0Y2hcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICAvLyBpZiBtYWluIGxvZyBoYXMgYmVlbiBzZW50LCBzZW5kIGluY3JlbWVudGFsIHVwZGF0ZXMgb25seVxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZU1haW5Mb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZU1haW5Mb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgICBsb2dnZXIubG9nKFwiUmVxdWVzdCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpIHtcbiAgICBpZiAoIXRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNVcGRhdGVzU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCB0aGVyZSBpcyBubyBpbmNyZW1lbnRhbCB5ZXRcbiAgICAgIC8vIG9yIGlmIHRoZSB1cGRhdGVzIGhhdmUgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ2hhbmdlZCA9IGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2dzIGNoYW5nZSBzdGF0dXM6IFwiLCBoYXNDaGFuZ2VkKTtcbiAgICBpZiAoIWhhc0NoYW5nZWQpIHJldHVybjtcblxuICAgIGNvbnN0IGxvZ0RhdGEgPSBhd2FpdCB0aGlzLnBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKTtcbiAgICBpZiAobG9nRGF0YSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNlbmRpbmcgaW5jcmVtZW50YWwgbG9nc1wiLCBsb2dEYXRhKTtcbiAgICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MobG9nRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlQXJyaXZhbExvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc0Fycml2YWxMb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBvciBhcnJpdmFsIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja0ZvckxhdGVzdENoYW5nZXMoKSB7XG4gICAgY29uc3QgaHdtID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9faHdtXCIpO1xuICAgIGlmICh0aGlzLmhpZ2hXYXRlck1hcmsgIT09IGh3bSkge1xuICAgICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbdXJsLCBoYXNoLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAwLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIHU6IHVybCxcbiAgICAgIG9uSGFzaFBjdDogaGFzaCxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VNYWluTG9nRGF0YSgpIHtcbiAgICBjb25zdCBib2R5ID0ge307XG4gICAgaWYgKCF3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMod2luZG93LmJlYWdsZUluZm9MYXllcikpIHtcbiAgICAgIGlmICgha2V5LnN0YXJ0c1dpdGgoXCJfXCIpICYmIHZhbHVlICE9PSBudWxsKSBib2R5W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgYm9keS5sYyA9IDE7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFthLCBlLCBmLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZlwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAyLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIGEsIGUsIGYsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBleGl0IGV2ZW50IGxpc3RlbmVyXCIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBiZWZvcmV1bmxvYWQgZXZlbnRcIik7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIHBhZ2VoaWRlIGV2ZW50XCIpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgfVxuXG4gIHF1ZXVlTG9ncyhsb2dEYXRhKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fCB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZmV0Y2goTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgY29uc3QgcXVldWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghcXVldWVkKSBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3MgcXVldWVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgaWYgKCFxdWV1ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3Mgbm90IHF1ZXVlZFwiKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb25pdG9yO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRGF0YUxheWVyUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gYXdhaXQgZGF0YUxheWVyRmluZGVyKG9wZXJhdG9yKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRhTGF5ZXJGaW5kZXIgPSBhc3luYyAoa2V5KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJTZWFyY2hpbmcgYmVhZ2xlSW5mb0xheWVyIGZvciBrZXkgXCIsIGtleSk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5LCB0cnVlLCAyNSwgMTAwMCk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlLCBzZWxlY3Rvciwgc2VsZWN0b3JBbGwsIHNlbGVjdG9yRmFsbGJhY2sgPSBudWxsfSA9IHJ1bGU7XG4gIGxldCBtYWluU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBtYWluU2VsZWN0b3IgPSBzZWxlY3RvckZhbGxiYWNrID8gc2VsZWN0b3JGYWxsYmFjayA6IG1haW5TZWxlY3RvcjtcbiAgfVxuXG4gIGlmIChvcGVyYXRvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgfVxuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHNlbGVjdG9yQWxsICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCBlbGVtZW50O1xuICBpZiAobWFpblNlbGVjdG9yKSBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3Rvcik7XG4gIGVsc2UgaWYgKHNlbGVjdG9yQWxsKSBlbGVtZW50ID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRleHQtbnVtYmVyXCI6IHtcbiAgICAgIGxldCB0ZW1wVmFsO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgdGVtcFZhbCA9IGVsZW1lbnQucmVkdWNlKChyZXR1cm5WYWwsIGVsZW0pID0+IHtcbiAgICAgICAgICByZXR1cm5WYWwgKz0gcGFyc2VJbnQoZWxlbS50ZXh0Q29udGVudC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFZhbCA9IHBhcnNlSW50KHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLnRleHRDb250ZW50XG4gICAgICAgICAgICAucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHBhcnNlSW50KHRlbXBWYWwpO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcImNsYXNzTGlzdFwiOlxuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJjb3VudFwiOiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiBlbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudC5sZW5ndGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDEsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgXCJzdHlsZVwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN0eWxlS2V5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN0eWxlVmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudFN0eWxlc1tzdHlsZUtleV07XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgc3R5bGVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiT3BlcmF0b3Igbm90IGRlZmluZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRnVuY3Rpb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tGdW5jdGlvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiY29uc3QgY29uZmlnID0ge1xuICBkYk5hbWU6IFwiYmVhZ2xlX2NhY2hlXCIsXG4gIHZlcnNpb246IDEsXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJpbmZvQ2FjaGVcIixcbiAgICBpbmRleGVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiaXhfc2t1XCIsXG4gICAgICAgIGZpZWxkczogXCJza3VcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJza3VcIn0sXG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IHtmZXRjaFByb2R1Y3RJbmZvfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnlcIik7XG5jbGFzcyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy50b3AuaW5kZXhlZERCPy5vcGVuKGNvbmZpZy5kYk5hbWUsIGNvbmZpZy52ZXJzaW9uKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGluZGV4ZWQgREJcIiwgb3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4ZWREQiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgcmV0dXJuIHR4Lm9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUocGF5bG9hZCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIGZvciAoY29uc3QgbG9hZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgIGxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICBzdG9yZS5wdXQobG9hZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBheWxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgc3RvcmUucHV0KHBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY2xlYXJSZXF1ZXN0ID0gc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgY2xlYXJSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGNsZWFyaW5nIHN0b3JlOiAke3N0b3JlLm5hbWV9YCk7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHNrdSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBnZXRSZXF1ZXN0ID0gc3RvcmUuZ2V0KHNrdSk7XG4gICAgICAgIGdldFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdldFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYEZvdW5kIHZhbHVlICR7cmVzdWx0fSBmb3Iga2V5ICR7c2t1fWApO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGdldHRpbmcgdmFsdWUgZm9yIGtleTogJHtza3V9YCwgZ2V0UmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjb3VudCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY291bnRSZXF1ZXN0ID0gc3RvcmUuY291bnQoKTtcbiAgICAgICAgY291bnRSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYENvdW50ZWQgJHtyZXN1bHR9IGVudHJpZXNgKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvdW50UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBjb3VudGluZyBlbnRyaWVzOiBcIiwgY291bnRSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldEN1cnNvcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY3Vyc29yUmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgICAgY3Vyc29yUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBjdXJzb3JSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgY3Vyc29yXCIsIGN1cnNvclJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICAgIGNvbnN0IGV4aXN0aW5nUHJvZEluZm8gPSBhd2FpdCB0aGlzLmNvdW50KCk7XG4gICAgaWYgKGV4aXN0aW5nUHJvZEluZm8pIHtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gZm91bmRcIik7XG4gICAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCB0aGlzLmdldEN1cnNvcigpO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gY3Vyc29yLnZhbHVlLnRpbWVzdGFtcDtcbiAgICAgIGNvbnN0IGVsYXBzZWRTZWNvbmRzID0gKERhdGUubm93KCkgLyAxMDAwKSAtIHRpbWVzdGFtcDtcbiAgICAgIGlmIChlbGFwc2VkU2Vjb25kcyA8IDcyMDApIHJldHVybjtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gaXMgZXhwaXJlZFwiKTtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gZmV0Y2hQcm9kdWN0SW5mbygpO1xuICAgIGNvbnN0IGNsZWFyUHJvbWlzZSA9IHRoaXMuY2xlYXIoKTtcbiAgICBjb25zdCBbcHJvZHVjdEluZm9BcnJheV0gPSBhd2FpdCBQcm9taXNlLmFsbChbcHJvZHVjdEluZm9Qcm9taXNlLCBjbGVhclByb21pc2VdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvQXJyYXkgfHwgIXByb2R1Y3RJbmZvQXJyYXkubGVuZ3RoKSByZXR1cm47XG4gICAgYXdhaXQgdGhpcy5zYXZlKHRoaXMucHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpKTtcbiAgfVxuXG4gIHByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgY29uc3QgcGF5bG9hZHMgPSBbXTtcbiAgICBjb25zdCBmaWVsZE5hbWVzID0gcHJvZHVjdEluZm9BcnJheS5zaGlmdCgpO1xuICAgIGZpZWxkTmFtZXMuc2hpZnQoKTtcbiAgICBmb3IgKGNvbnN0IGluZm8gb2YgcHJvZHVjdEluZm9BcnJheSkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHtza3U6IGluZm8uc2hpZnQoKX07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF5bG9hZFtmaWVsZE5hbWVzW2ldXSA9IGluZm9baV0gfHwgMDtcbiAgICAgIH1cbiAgICAgIHBheWxvYWRzLnB1c2gocGF5bG9hZCk7XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5O1xuIiwiaW1wb3J0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkgZnJvbSBcIi4vaW5kZXhcIjtcblxuY29uc3QgU3RvcmUgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCBpbnN0YW5jZSA9IG51bGw7XG4gIHJldHVybiB7XG4gICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGluc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgIGluc3RhbmNlID0gbmV3IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkoKTtcbiAgICAgICAgLy8gSGlkZSB0aGUgY29uc3RydWN0b3Igc28gdGhlIHJldHVybmVkIG9iamVjdCBjYW4ndCBiZSBuZXcnZC4uLlxuICAgICAgICBpbnN0YW5jZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfSxcbiAgfTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVQcm9kdWN0SW5mb0NoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Byb2R1Y3RJbmZvUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gIGlmICghc2t1TGlzdCB8fCAodHlwZW9mIHNrdUxpc3QgPT09IFwib2JqZWN0XCIgJiYgIU9iamVjdC5rZXlzKHNrdUxpc3QpLmxlbmd0aCkpIHJldHVybiBmYWxzZTtcbiAgbGV0IHJ1bnRpbWVWYWx1ZSA9IG51bGw7XG4gIGNvbnN0IHNrdSA9IHNrdUxpc3RbT2JqZWN0LmtleXMoc2t1TGlzdClbMF1dPy5pZDtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIFRyYW5zYWN0aW9uQ291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFRyYW5zYWN0aW9uQ291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgQWRkVG9DYXJ0Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldEFkZFRvQ2FydENvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInByb2R1Y3RWaWV3Q291bnRcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0UHJldmlld0NvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmNvbnN0IGdldFRyYW5zYWN0aW9uQ291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEFkZFRvQ2FydENvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRQcmV2aWV3Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcbiIsImNvbnN0IEVfVElNRU9VVCA9IG5ldyBFcnJvcigndGltZW91dCB3aGlsZSB3YWl0aW5nIGZvciBtdXRleCB0byBiZWNvbWUgYXZhaWxhYmxlJyk7XG5jb25zdCBFX0FMUkVBRFlfTE9DS0VEID0gbmV3IEVycm9yKCdtdXRleCBhbHJlYWR5IGxvY2tlZCcpO1xuY29uc3QgRV9DQU5DRUxFRCA9IG5ldyBFcnJvcigncmVxdWVzdCBmb3IgbG9jayBjYW5jZWxlZCcpO1xuXG52YXIgX19hd2FpdGVyJDIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIFNlbWFwaG9yZSB7XG4gICAgY29uc3RydWN0b3IoX3ZhbHVlLCBfY2FuY2VsRXJyb3IgPSBFX0NBTkNFTEVEKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gX3ZhbHVlO1xuICAgICAgICB0aGlzLl9jYW5jZWxFcnJvciA9IF9jYW5jZWxFcnJvcjtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzID0gW107XG4gICAgfVxuICAgIGFjcXVpcmUod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0ucHVzaCh7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCA9IDEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgW3ZhbHVlLCByZWxlYXNlXSA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jayh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0ucHVzaChyZXNvbHZlKTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlIDw9IDA7XG4gICAgfVxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIHJlbGVhc2Uod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMuZm9yRWFjaCgocXVldWUpID0+IHF1ZXVlLmZvckVhY2goKGVudHJ5KSA9PiBlbnRyeS5yZWplY3QodGhpcy5fY2FuY2VsRXJyb3IpKSk7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgfVxuICAgIF9kaXNwYXRjaCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlRW50cnkgPSAoX2EgPSB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlRW50cnkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlIC09IHdlaWdodDtcbiAgICAgICAgICAgIHdlaWdodCA9IHRoaXMuX3ZhbHVlICsgMTtcbiAgICAgICAgICAgIHF1ZXVlRW50cnkucmVzb2x2ZShbcHJldmlvdXNWYWx1ZSwgdGhpcy5fbmV3UmVsZWFzZXIocHJldmlvdXNXZWlnaHQpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZHJhaW5VbmxvY2tXYWl0ZXJzKCk7XG4gICAgfVxuICAgIF9uZXdSZWxlYXNlcih3ZWlnaHQpIHtcbiAgICAgICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIF9kcmFpblVubG9ja1dhaXRlcnMoKSB7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0uZm9yRWFjaCgod2FpdGVyKSA9PiB3YWl0ZXIoKSk7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciQxID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBNdXRleCB7XG4gICAgY29uc3RydWN0b3IoY2FuY2VsRXJyb3IpIHtcbiAgICAgICAgdGhpcy5fc2VtYXBob3JlID0gbmV3IFNlbWFwaG9yZSgxLCBjYW5jZWxFcnJvcik7XG4gICAgfVxuICAgIGFjcXVpcmUoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMSh0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFssIHJlbGVhc2VyXSA9IHlpZWxkIHRoaXMuX3NlbWFwaG9yZS5hY3F1aXJlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVsZWFzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5ydW5FeGNsdXNpdmUoKCkgPT4gY2FsbGJhY2soKSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUud2FpdEZvclVubG9jaygpO1xuICAgIH1cbiAgICByZWxlYXNlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCkpXG4gICAgICAgICAgICB0aGlzLl9zZW1hcGhvcmUucmVsZWFzZSgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuY2FuY2VsKCk7XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiB3aXRoVGltZW91dChzeW5jLCB0aW1lb3V0LCB0aW1lb3V0RXJyb3IgPSBFX1RJTUVPVVQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3F1aXJlOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHN5bmMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxlYXNlID0gQXJyYXkuaXNBcnJheSh0aWNrZXQpID8gdGlja2V0WzFdIDogdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRpY2tldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVsZWFzZSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGlja2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh0aWNrZXRbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGVhc2Uod2VpZ2h0KSB7XG4gICAgICAgICAgICBzeW5jLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN5bmMuY2FuY2VsKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhaXRGb3JVbmxvY2s6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHN5bmMud2FpdEZvclVubG9jayh3ZWlnaHQpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWplY3QodGltZW91dEVycm9yKSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMb2NrZWQ6ICgpID0+IHN5bmMuaXNMb2NrZWQoKSxcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHN5bmMuZ2V0VmFsdWUoKSxcbiAgICAgICAgc2V0VmFsdWU6ICh2YWx1ZSkgPT4gc3luYy5zZXRWYWx1ZSh2YWx1ZSksXG4gICAgfTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saXNuZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB0cnlBY3F1aXJlKHN5bmMsIGFscmVhZHlBY3F1aXJlZEVycm9yID0gRV9BTFJFQURZX0xPQ0tFRCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcmV0dXJuIHdpdGhUaW1lb3V0KHN5bmMsIDAsIGFscmVhZHlBY3F1aXJlZEVycm9yKTtcbn1cblxuZXhwb3J0IHsgRV9BTFJFQURZX0xPQ0tFRCwgRV9DQU5DRUxFRCwgRV9USU1FT1VULCBNdXRleCwgU2VtYXBob3JlLCB0cnlBY3F1aXJlLCB3aXRoVGltZW91dCB9O1xuIiwiaW1wb3J0IHtjaGVja0RhdGFMYXllclJ1bGV9IGZyb20gXCIuL2RhdGFMYXllckNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbGVtZW50UnVsZX0gZnJvbSBcIi4vZWxlbWVudENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tGdW5jdGlvblJ1bGV9IGZyb20gXCIuL2Z1bmN0aW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Nlc3Npb25SdWxlfSBmcm9tIFwiLi9zZXNzaW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1VybFJ1bGV9IGZyb20gXCIuL3VybENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbnZSdWxlfSBmcm9tIFwiLi9lbnZDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrUHJvZHVjdEluZm9SdWxlfSBmcm9tIFwiLi9wcm9kdWN0SW5mb0NoZWNrZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHthZGREYXRhTGlzdGVuZXIsIGFkZFRvQmVhZ2xlSW5mb0xheWVyLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcbmltcG9ydCB7ZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSdWxlRW5naW5lXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlRW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVzLCBiYXNlUnVsZVNldH0gPSBib2R5O1xuICAgIHRoaXMuYmFzZVJ1bGVTZXQgPSBiYXNlUnVsZVNldDtcbiAgICB0aGlzLmVsaWdpYmlsaXR5UnVsZXMgPSBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5tdXRleCA9IG5ldyBNdXRleCgpO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgdGhpcy5iYXNlUnVsZVNldCkge1xuICAgICAgY29uc3QgcnVsZVNhdGlzZmllZCA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgaWYgKCFydWxlU2F0aXNmaWVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGUocnVsZSkge1xuICAgIGNvbnN0IHtjaGFpbiwgY2hhaW5fY29uZGl0aW9uLCB0eXBlfSA9IHJ1bGU7XG4gICAgbGV0IHJ1bGVTYXRpc2ZpZWQgPSBudWxsO1xuICAgIC8vIGNoZWNrIHJ1bGVcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJzZXNzaW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1Nlc3Npb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VsZW1lbnRSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrRGF0YUxheWVyUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXJsXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1VybFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0Z1bmN0aW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZW52aXJvbm1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRW52UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrUHJvZHVjdEluZm9SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIHN1Y2ggcnVsZSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjaGFpbikge1xuICAgICAgc3dpdGNoIChjaGFpbl9jb25kaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICYmIGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgfHwgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgIT0gYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIGNoYWluIGNvbmRpdGlvblwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVTYXRpc2ZpZWQ7XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5lbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAgY29uc3Qgc2F0aXNmaWVkUnVsZUlkcyA9IFtdO1xuICAgICAgdGhpcy5zZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKTtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSkpIHtcbiAgICAgICAgICBzYXRpc2ZpZWRSdWxlSWRzLnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICAvLyBQYWdlIHR5cGUgcnVsZXMgYXJlIGV4Y2x1c2l2ZTsgaWYgb25lIGlzIHRydWUgYWxsIG90aGVycyBhcmUgZmFsc2UgYnkgZGVmYXVsdCwgbm8gbmVlZCB0byBhc3Nlc3MgdGhlIHJlc3RcbiAgICAgICAgICBpZiAoa2V5ID09PSBcIlBhZ2VUeXBlXCIpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgc2F0aXNmaWVkUnVsZUlkcyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcykge1xuICAgIGlmICgha2V5IHx8ICFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcmVsZWFzZSA9IGF3YWl0IHRoaXMubXV0ZXguYWNxdWlyZSgpO1xuICAgIGxvZ2dlci5sb2coYExvY2sgYWNxdWlyZWQgZm9yIGtleSAke2tleX1gKTtcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGNvbnN0IGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWApIHx8IFtdO1xuICAgICAgICBpZiAoaXNFbGlnaWJsZSkge1xuICAgICAgICAgIGlmIChjdXJyZW50LmluY2x1ZGVzKHJ1bGUubmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGN1cnJlbnQucHVzaChydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBjdXJyZW50KTtcbiAgICAgICAgICBpZiAoa2V5ID09PSBcIlBhZ2VUeXBlXCIpIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIGVsaWdpYmxlIHJ1bGVzXG4gICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBjdXJyZW50LmZpbHRlcigoaykgPT4gayAhPT0gcnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgZmlsdGVyZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBhc3Nlc3NpbmcgcnVsZXMgZm9yIGtleTogJHtrZXl9IC0gJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgbG9nZ2VyLmxvZyhgUmVsZWFzaW5nIGxvY2sgZm9yIGtleTogJHtrZXl9YCk7XG4gICAgICByZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0VXBMaXN0ZW5lcnMoa2V5LCBydWxlcykge1xuICAgIC8vIFRPRE8gcmVjdXJzaXZlbHkgZ2V0IGFsbCBvcGVyYXRvcnMvc2VsZWN0b3JzIGZyb20gY2hhaW5lZCBydWxlc1xuICAgIGNvbnN0IGRhdGFMYXllclJ1bGVzID0ge307XG4gICAgY29uc3QgZWxlbWVudFJ1bGVzID0ge307XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICBjb25zdCB7b3BlcmF0b3IsIHNlbGVjdG9yLCB0eXBlfSA9IHJ1bGU7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICAgIGlmICghZGF0YUxheWVyUnVsZXNbb3BlcmF0b3JdKSBkYXRhTGF5ZXJSdWxlc1tvcGVyYXRvcl0gPSBbXTtcbiAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tvcGVyYXRvcl0ucHVzaChydWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgICBpZiAoIWVsZW1lbnRSdWxlc1tzZWxlY3Rvcl0pIGVsZW1lbnRSdWxlc1tzZWxlY3Rvcl0gPSBbXTtcbiAgICAgICAgICBlbGVtZW50UnVsZXNbc2VsZWN0b3JdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb25SZWNvcmQgb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgbm9kZXMgPSBbLi4ubm9kZXMsIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQuYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQucmVtb3ZlZE5vZGVzKV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXhjbHVkZSBtdXRhdGlvbnMgdGhhdCBvbmx5IHVwZGF0ZSB0ZXh0XG4gICAgICAgIGlmIChub2Rlcy5ldmVyeSgobikgPT4gbi50YWdOYW1lID09PSB1bmRlZmluZWQpKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBlbGVtZW50VG9PYnNlcnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICBlbGVtZW50VG9PYnNlcnZlID0gZWxlbWVudFRvT2JzZXJ2ZSA/IGVsZW1lbnRUb09ic2VydmUucGFyZW50Tm9kZSA6IGRvY3VtZW50LmJvZHk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnRUb09ic2VydmUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0RWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGVsaWdpYmlsaXR5UnVsZXMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUyk7XG4gICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlcykgcmV0dXJuIEpTT04ucGFyc2UoZWxpZ2liaWxpdHlSdWxlcyk7XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUywgSlNPTi5zdHJpbmdpZnkoZWxpZ2liaWxpdHlSdWxlcykpO1xuICAgICAgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBlbGlnaWJpbGl0eSBydWxlczogXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiU2VnbWVudGF0aW9uQ29tcHV0ZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gIGxvZ2dlci5sb2coXCJEZXRlcm1pbmluZyB1c2VyIHNlZ21lbnRcIik7XG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgIGNvbnN0IHJ1bGVTZXQgPSB0cmVhdG1lbnRXZWlnaHRzW3NlZ21lbnRdPy5ydWxlU2V0O1xuICAgIGlmICghcnVsZVNldCkgY29udGludWU7XG4gICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW119KTtcbiAgICBpZiAoYXdhaXQgc2VnbWVudFJ1bGVFbmdpbmUuY2hlY2tSdWxlcygpKSB7XG4gICAgICBsb2dnZXIubG9nKGBVc2VyIHNlZ21lbnQgbWF0Y2hlZDogJHtzZWdtZW50fWApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgcmV0dXJuIHNlZ21lbnQ7XG4gICAgfVxuICB9XG5cbiAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZCwgcmV0dXJuaW5nIGRlZmF1bHRcIik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic1wiLCBcImRlZmF1bHRcIik7XG4gIHJldHVybiBcImRlZmF1bHRcIjtcbn1cbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVMsIFRSRUFUTUVOVFNfRFVSQVRJT059IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7ZmV0Y2hUcmVhdG1lbnRzLCBmZXRjaFRyZWF0bWVudFdlaWdodHN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5XCIpO1xuXG5jbGFzcyBUcmVhdG1lbnRSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IGJvZHk7XG4gICAgdGhpcy50cmVhdG1lbnRzID0gdHJlYXRtZW50cztcblxuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFRSRUFUTUVOVFMpKTtcbiAgICBsZXQgdHJlYXRtZW50cyA9IHRyZWF0bWVudHNPYmo/LnRyZWF0bWVudHM7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdHJlYXRtZW50c09iaj8udGltZXN0YW1wO1xuICAgIGlmICghdHJlYXRtZW50cyB8fCAhdGltZXN0YW1wKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBub3QgZm91bmQgaW4gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgIH07XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICB9XG4gICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgZWxhcHNlZERheXMgPSAoRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDAgKiAyNCk7XG4gICAgICBpZiAoZWxhcHNlZERheXMgPiBUUkVBVE1FTlRTX0RVUkFUSU9OKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIGFyZSBleHBpcmVkXCIpO1xuICAgICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgIHRyZWF0bWVudHMsXG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VpZ2h0cyA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLldFSUdIVFMpO1xuICAgICAgaWYgKHdlaWdodHMpIHJldHVybiBKU09OLnBhcnNlKHdlaWdodHMpO1xuICAgICAgd2VpZ2h0cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuV0VJR0hUUywgSlNPTi5zdHJpbmdpZnkod2VpZ2h0cykpO1xuICAgICAgcmV0dXJuIHdlaWdodHM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXRjaGVkVHJlYXRtZW50cygpIHtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gdGhpcy50cmVhdG1lbnRXZWlnaHRzO1xuICAgIGNvbnN0IHVzZXJHcm91cCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSB0aGlzLnRyZWF0bWVudHM7XG4gICAgaWYgKHRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgIGNvbnN0IHVzZXJHcm91cFdlaWdodHMgPSAodXNlckdyb3VwICYmIHRyZWF0bWVudFdlaWdodHNbdXNlckdyb3VwXSkgP1xuICAgICAgdHJlYXRtZW50V2VpZ2h0c1t1c2VyR3JvdXBdIDogdHJlYXRtZW50V2VpZ2h0c1tcImRlZmF1bHRcIl07XG4gICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0cmVhdG1lbnRzKSB7XG4gICAgICAgIHRyZWF0bWVudC53ZWlnaHQgPSB1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudD8uaWRdPy53ZWlnaHQgfHwgMDtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnQuYWN0aW9ucy5zb21lKChhKSA9PiBhLnZhcmlhbnRzKSkgY29udGludWU7XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIHRyZWF0bWVudC5hY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24udmFyaWFudHMpIGNvbnRpbnVlO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudEtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb24udmFyaWFudHMpKSB7XG4gICAgICAgICAgICBpZiAodXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50cyAmJiB1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSB1c2VyR3JvdXBXZWlnaHRzW3RyZWF0bWVudC5pZF0udmFyaWFudHNbdmFyaWFudEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhgJHt0cmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIGdyb3VwIG1hdGNoZWRgKTtcbiAgICBpZiAoIXRyZWF0bWVudHMubGVuZ3RoKSByZXR1cm4gW107XG4gICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJlYXRtZW50UmVwb3NpdG9yeTtcbiIsImltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiUmVwbGFjZVV0aWxzXCIpO1xuXG5jb25zdCByZXBsYWNlciA9IGFzeW5jICh2YWx1ZSwgcmVwbGFjZUZuKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgW2ksIHZhbF0gb2YgdmFsdWUuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjdXJyZW50UmVwbGFjZUZuID0gQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pID8gcmVwbGFjZUZuW2ldIDogcmVwbGFjZUZuIHx8IFwiXCI7XG4gICAgICBpZiAodHlwZW9mIGN1cnJlbnRSZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IoY3VycmVudFJlcGxhY2VGbik7XG4gICAgICAgIHZhbHVlW2ldID0gcmVwbGFjZUFsbCh2YWwsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWVbaV0gPSByZXBsYWNlRm5FeGVjdXRvcihjdXJyZW50UmVwbGFjZUZuLCB2YWwpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlcGxhY2VGbikpIHtcbiAgICBmb3IgKGNvbnN0IHJGbiBvZiByZXBsYWNlRm4pIHtcbiAgICAgIGlmICh0eXBlb2YgckZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJGbik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IockZuLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgcmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pO1xuICAgICAgdmFsdWUgPSByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUsIHNpbmdsZSA9IGZhbHNlKSB7XG4gIGlmIChyZXBsYWNlRm4gJiYgdmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSkge1xuICAgIGxvZ2dlci5sb2coXCJFeGVjdXRpbmcgcmVwbGFjZSBmdW5jdGlvbjogXCIsIHJlcGxhY2VGbik7XG4gICAgY29uc3QgcmVwbGFjZUZ1bmN0aW9uID0gRnVuY3Rpb24ocmVwbGFjZUZuKTtcbiAgICBpZiAoc2luZ2xlKSByZXR1cm4gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgICByZXR1cm4gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbikge1xuICBjb25zdCB7c3RvcmFnZSwga2V5LCBrZXlGYWxsYmFjaywgdHlwZX0gPSByZXBsYWNlRm47XG4gIHN3aXRjaCAoc3RvcmFnZSkge1xuICAgIGNhc2UgXCJzZXNzaW9uXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gbnVsbDtcbiAgICAgIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5RmFsbGJhY2spO1xuICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXBsYWNlVmFsID0gSlNPTi5wYXJzZShyZXBsYWNlVmFsKTtcbiAgICAgICAgICByZXBsYWNlVmFsID0gcmVwbGFjZVZhbFtyZXBsYWNlVmFsLmxlbmd0aCAtIDFdW3R5cGVdO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZCBub3QgcGFyc2UgJHtyZXBsYWNlVmFsfWApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gICAgY2FzZSBcImluZm8tbGF5ZXJcIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleUZhbGxiYWNrKTtcbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlcjtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkFjdGlvbkNvbmRpdGlvblV0aWxzXCIpO1xuXG5jb25zdCBjaGVja0FjdGlvbkNvbmRpdGlvbiA9IGFzeW5jIChjb25kaXRpb24pID0+IHtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlfSA9IGNvbmRpdGlvbjtcbiAgbG9nZ2VyLmxvZyhcIkFjdGlvbiBjb25kaXRpb24gZm91bmQ6IFwiLCBjb25kaXRpb24pO1xuICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gW107XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOiB7XG4gICAgICBjb25zdCBjb25kaXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29uZGl0aW9uRWxlbWVudHMpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoZWxlbWVudFNrdSk7XG4gICAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHByb2R1Y3RJbmZvPy5bb3BlcmF0b3JdO1xuICAgICAgICAvLyBydW5UaW1lVmFsdWUgbWF5IGJlIDBcbiAgICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fCBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJQcm9kdWN0IGluZm8gaXMgZW1wdHlcIik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIGNvbnRpbnVlO1xuICAgICAgICBlbGlnaWJsZUVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsaWdpYmxlRWxlbWVudHM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGVja0FjdGlvbkNvbmRpdGlvbjtcbiIsImltcG9ydCB7c3R5bGVBcHBsaWNhdG9yLCBkZWxheSwgaWRsZVRpbWVyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7cmVwbGFjZUFsbCwgdHVya2lzaFRvTG93ZXJ9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUlksIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBJRExFX1RJTUVPVVR9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCByZXBsYWNlciBmcm9tIFwiLi9yZXBsYWNlLXV0aWxzXCI7XG5pbXBvcnQgY2hlY2tBY3Rpb25Db25kaXRpb24gZnJvbSBcIi4vYWN0aW9uLWNvbmRpdGlvbi11dGlsXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5QWN0aW9ucyhhY3Rpb25zKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVBcHBseUFjdGlvbnNcIik7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUd9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGFjdGlvbjogXCIsIEpTT04uc3RyaW5naWZ5KGFjdGlvbikpO1xuICAgIGNvbnN0IHtcbiAgICAgIG9wZXJhdG9yLFxuICAgICAgdHlwZSxcbiAgICAgIGFwcGx5RXZlbnQsXG4gICAgICBjb250ZW50U2VsZWN0b3IsXG4gICAgICBzZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yRmFsbGJhY2ssXG4gICAgICBtZENvbmRpdGlvbixcbiAgICAgIG1vdmVfc2VsZWN0b3JfMSxcbiAgICAgIG1vdmVfc2VsZWN0b3JfMixcbiAgICAgIHJlcGxhY2VGbixcbiAgICAgIHBUeXBlLFxuICAgICAgYXR0cmlidXRlLFxuICAgICAgcHJvZHVjdEluZm9TdG9yYWdlLFxuICAgIH0gPSBhY3Rpb247XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIm5vb3BcIikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vb3AgT3BlcmF0b3I6IE5vIG9wZXJhdGlvbiBpcyBhcHBsaWVkIG9uIHRhcmdldCBcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHt2YWx1ZX0gPSBhY3Rpb247XG4gICAgLy8gSWYgYW4gZWxlbWVudCBpcyBwYXNzZWQgdG8gdHJhbnNmb3JtZXIsIHNlbGVjdG9yIGlzIHJlbGF0aXZlIHRvIHBhc3NlZCBlbGVtZW50XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmZpbmQoc2VsZWN0b3IpIDogJChzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBtYyA9IG1kQ29uZGl0aW9uID8gd2luZG93Lm1hdGNoTWVkaWEobWRDb25kaXRpb24pLm1hdGNoZXMgOiB0cnVlO1xuICAgIGlmICghbWMpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJNZWRpYSBjb25kaXRpb24gbWlzbWF0Y2g6IFwiLCBtZENvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzEgJiYgIW1vdmVfc2VsZWN0b3JfMikgfHxcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzIgJiYgIW1vdmVfc2VsZWN0b3JfMSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJCb3RoIG1vdmUgc2VsZWN0b3JzIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG1vdmVfc2VsZWN0b3JfMSAmJiBtb3ZlX3NlbGVjdG9yXzIpIHtcbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzEpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAxIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzIpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAyIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBzcGVjaWZpZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCEkKHNlbGVjdG9yRmFsbGJhY2spLmxlbmd0aCAmJiBvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gXCJuby1zZWxlY3RvclwiKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZDogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVHJ5aW5nIGZhbGxiYWNrIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yRmFsbGJhY2spIGVsZW1lbnQgPSAkKHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWxsYmFjayBzZWxlY3RvciBub3QgZm91bmRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VGbikge1xuICAgICAgdmFsdWUgPSBhd2FpdCByZXBsYWNlcih2YWx1ZSwgcmVwbGFjZUZuKTtcbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlbW92aW5nOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJDYW5ub3QgZm91bmQgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5zZXJ0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmVmb3JlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBiZWZvcmU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgaWYgKFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoXCJuZC1hZGQtdG8td2luXCIpKSB7XG4gICAgICAgICAgICAkKFwiLm5kLWFkZC10by13aW5cIikucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFmdGVyXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBhZnRlcjogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFmdGVyKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBlbmRpbmcgdmFsdWU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW9kYWxcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50Lm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAoZWxtID09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNwbGF5TW9kYWwodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwb3B1cFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJQb3B1cCBhbHJlYWR5IGRpc3BsYXllZCBpbiBzZXNzaW9uXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBQb3B1cDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwVHlwZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBjb25zdCBtb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJleGl0SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgZXhpdCBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3IsIGRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInJcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIgJiYgIXIuaW5jbHVkZXMoZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZGxlVGltZXIoSURMRV9USU1FT1VULCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3B5SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgY29weSBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhcHBlbmQgcG9wdXAgdG8gYm9keSBhZnRlciB0aW1lb3V0IGV4cGlyZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVBvcHVwKCk7XG4gICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBUeXBlOiAke3R5cGV9IG5vdCBmb3VuZCBmb3Igb3BlcmF0b3I6ICR7b3BlcmF0b3J9YCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJlZGl0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIHRleHQ6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC50ZXh0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyBodG1sOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuaHRtbCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHlsZUFwcGxpY2F0b3JcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZUNoYW5nZXNNYXAgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTdHlsZSBDaGFuZ2VzIE1hcDogXCIsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgICBzdHlsZUFwcGxpY2F0b3IoZWxlbWVudCwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZGRDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGFkZGRpbmcgY2xhc3MgdG8gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVtb3ZlQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGByZW1vdmUgY2xhc3MgZnJvbSAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb2N1bWVudFRpdGxlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgY2hhbmdpbmcgZG9jdW1lbnQgdGl0bGUgZnJvbSAke2VsZW1lbnR9IHRvICR7dmFsdWV9YCk7XG4gICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgPT0gXCJ0YWJDaGFuZ2VcIikge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJjYXRjaGluZyBldmVudCB0YWJjaGFuZ2UuLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gd2luZG93LnRvcC5kb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShlLCB2YWx1ZSwgb3JpZ2luYWxUaXRsZSk7XG4gICAgICAgICAgICAgICAgICB9LCAxNTAwMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmtub3duIGVkaXQgdHlwZTogXCIsIHR5cGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic2V0YXR0cmlidXRlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgc3dpdGNoIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgY2FzZSBcInNyY1wiOlxuICAgICAgICAgIGVsZW1lbnQuY3NzKFwiY29udGVudFwiLCBgdXJsKCR7dmFsdWUudHJpbSgpfSlgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jYXNlLWRlY2xhcmF0aW9uc1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5VmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuXG4gICAgICAgICAgZWxlbWVudC5jc3MocHJvcGVydHksIHByb3BlcnR5VmFsdWUsIFwiIWltcG9ydGFudFwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoXCJmdW5jdGlvblwiKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBGdW5jdGlvbih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5oYW5kbGVkIGF0dHJpYnV0ZTogU2V0dGluZyBhdHRyaWJ1dGU6IFwiLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInJlcGxhY2VcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZzogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQucmVwbGFjZUFsbCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzd2FwXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTd2FwcGluZzogXCIsIG1vdmVfc2VsZWN0b3JfMSwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGNvbnN0IG4xID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBuMiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgc3dhcE5vZGVzKG4xLCBuMik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbmplY3RzY3JpcHRcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluamVjdGluZyBzY3JpcHQ6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LmFwcGVuZChgPHNjcmlwdD4ke3ZhbHVlfTwvc2NyaXB0PmApO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwibW92ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKGBNb3ZpbmcgJHttb3ZlX3NlbGVjdG9yXzF9IHRvICR7bW92ZV9zZWxlY3Rvcl8yfWApO1xuICAgICAgY29uc3Qgc291cmNlID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgc291cmNlLnJlbW92ZSgpO1xuICAgICAgZGVzdGluYXRpb24ucHJlcGVuZChzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicHJvZHVjdEluZm9Mb29rdXBcIikge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgZWxlbWVudC5iZWZvcmUocmVzKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInRleHQtdHJhbnNmb3JtXCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiY2FwaXRhbGl6ZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCBlIG9mIEFycmF5LmZyb20oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmIChlLmlubmVyVGV4dD8uaW5jbHVkZXMoXCJcXG5cIikpIHtcbiAgICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dCkuc3BsaXQoXCJcXG5cIikubWFwKChzZW50ZW5jZSkgPT5cbiAgICAgICAgICAgICAgICBzZW50ZW5jZS5zcGxpdChcIiBcIikubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSkuam9pbihcIiBcIiksXG4gICAgICAgICAgICAgICkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgICAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggb3BlcmF0b3IgZXhpc3RzIHlldFwiLCBvcGVyYXRvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlcGxhY2VXaXRoVmFsID0gKHZhbHVlLCBodG1sU3RyKSA9PiB7XG4gICAgaWYgKHZhbHVlICYmIGh0bWxTdHIuaW5jbHVkZXMoXCJ7e1JFUExBQ0VfUFJPRFVDVElORk99fVwiKSkge1xuICAgICAgaHRtbFN0ciA9IHJlcGxhY2VBbGwoaHRtbFN0ciwgXCJ7e1JFUExBQ0VfUFJPRFVDVElORk99fVwiLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBodG1sU3RyO1xuICB9O1xuICBjb25zdCBnZXRQcm9kdWN0SW5mbyA9IGFzeW5jICh0eXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKSA9PiB7XG4gICAgLy8gZ2V0IGtleXMgb2YgcHJvZHVjdEluZm9cbiAgICBjb25zdCBza3VMaXN0ID0gcHJvZHVjdEluZm9TdG9yYWdlID09PSBcImJhc2tldFwiID9cbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIiwgdHJ1ZSkgOlxuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gICAgbGV0IHJlcyA9IG51bGw7XG4gICAgaWYgKCFza3VMaXN0IHx8IHNrdUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBsb2dnZXIubG9nKFwiTm8gc2t1IGZvdW5kXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1TGlzdFswXSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTUudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHRyYW5zY2F0aW9uSW4yV2Vla3MgXCIsIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIEFkZFRvQ2FydENvdW50IFwiLCBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3JcIiwgcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwibm8gc3VjaCB0eXBlIGZvdW5kIGZvciBwcm9kdWN0SW5mb0xvb2t1cCBvcGVyYXRvcjogXCIrIHR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICBjb25zdCBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlID0gYXN5bmMgKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRUaXRsZXMgPSAhQXJyYXkuaXNBcnJheSh0aXRsZXMpID8gW3RpdGxlc10gOiB0aXRsZXM7XG4gICAgZm9yIChjb25zdCBwYXJzZWRUaXRsZSBvZiBwYXJzZWRUaXRsZXMpIHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gcGFyc2VkVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICBpZiAoaWQgJiYgaWQgPT09IFwibmQtcG9wdXBfX3dyYXBwZXJcIikge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5jb250YWlucyhcIm5kLW1vZGFsX193cmFwcGVyXCIpKSB7XG4gICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UG9wdXAgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgPiAwKSByZXR1cm47XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDEpO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuXG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfSwgMTUwMDApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNb2RhbCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikpIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBvcHVwID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIGlzTW9kYWw9ZmFsc2UpID0+IHtcbiAgICAvLyBDcmVhdGUgcG9wdXAgd3JhcHBlclxuICAgIGNvbnN0IHBvcHVwV3JhcHBlciA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtcG9wdXBfX3dyYXBwZXJcIik7XG4gICAgaWYgKGlzTW9kYWwpIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtbW9kYWxfX3dyYXBwZXJcIik7XG4gICAgaWYgKCFpc01vZGFsKSBwb3B1cFdyYXBwZXIuaWQgPSBcIm5kLXBvcHVwX193cmFwcGVyXCI7XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uU3R5bGUgPSBpc01vZGFsID8gXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlX19jb2xvcmVkXCIgOiBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VcIjtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQocG9wdXBDbG9zZUJ1dHRvblN0eWxlKTtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGlmIChpc01vZGFsKSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudFNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRlbnRTZWxlY3RvcikpO1xuICAgICAgd2hpbGUgKHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikgJiYgY29udGVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCBjb250ZW50cy5zaGlmdCgpLnNyYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGZyb20gYWN0aW9uIGFuZCBhcHBlbmQgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgdGVtcGxhdGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB2YWx1ZS50cmltKCk7XG4gICAgY29uc3QgcG9wdXAgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZUJ1dHRvbik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgIC8vIFJlbW92ZSBvbGQgcG9wdXAgaWYgZXhpc3RzIGJlZm9yZSBhcHBlbmRpbmcgbmV3IG9uZVxuICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dhcE5vZGVzID0gZnVuY3Rpb24gc3dhcE5vZGVzKG4xLCBuMikge1xuICAgIGNvbnN0IHAxID0gbjEucGFyZW50Tm9kZTtcbiAgICBjb25zdCBwMiA9IG4yLnBhcmVudE5vZGU7XG4gICAgbGV0IGkxO1xuICAgIGxldCBpMjtcblxuICAgIGlmICghcDEgfHwgIXAyIHx8IHAxLmlzRXF1YWxOb2RlKG4yKSB8fCBwMi5pc0VxdWFsTm9kZShuMSkpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMS5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMSkpIHtcbiAgICAgICAgaTEgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDIuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjIpKSB7XG4gICAgICAgIGkyID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcbiAgICAgIGkyKys7XG4gICAgfVxuICAgIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcbiAgICBwMi5pbnNlcnRCZWZvcmUobjEsIHAyLmNoaWxkcmVuW2kyXSk7XG4gIH07XG5cbiAgY29uc3Qgd2FpdEZvckpRdWVyeSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghd2luZG93LmpRdWVyeSkge1xuICAgICAgICBsb2dnZXIubG9nKFwialF1ZXJ5IG5vdCBmb3VuZCwgcmV0cnlpbmdcIik7XG4gICAgICAgIGNvbnN0IGpRdWVyeUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWN0aW9uQXBwbGljYXRvciA9IGFzeW5jIChhY3Rpb25zKSA9PiB7XG4gICAgaWYgKGF3YWl0IHdhaXRGb3JKUXVlcnkoKSkge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoYWN0aW9uLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IGF3YWl0IGNoZWNrQWN0aW9uQ29uZGl0aW9uKGFjdGlvbi5jb25kaXRpb24pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsaWdpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdHJhbnNmb3JtZXIoYWN0aW9uLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgcmVzdWx0ID0gYXdhaXQgdHJhbnNmb3JtZXIoYWN0aW9uKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGRuJ3QgYXBwbHkgYWN0aW9uICR7SlNPTi5zdHJpbmdpZnkoYWN0aW9uKX0gd2l0aCBlcnJvciAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkpxdWVyeSBub3QgZm91bmQgb24gd2luZG93XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvLyBBcHBseSBhY3Rpb25zXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFjdGlvbkFwcGxpY2F0b3IoYWN0aW9ucyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZGVmYXVsdCBhcHBseUFjdGlvbnM7XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBhcHBseUFjdGlvbnMgZnJvbSBcIi4uL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleFwiO1xuaW1wb3J0IHtcbiAgYWRkVHJlYXRtZW50LFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGREYXRhTGlzdGVuZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFRSRUFUTUVOVF9SQVRJTyxcbiAgTU9CSUxFX01FRElBX1FVRVJZLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBkZXRlcm1pbmVQY3QsXG4gIHByZXBhcmVBY3Rpb25zLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJvYm90RW5naW5lXCIpO1xuY29uc3QgT0JTRVJWRVJfQ09ORklHID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90RW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cywgZGVidWdNb2RlLCBtYXRjaGVkVHJlYXRtZW50cywgaWRlbnRpZmllciwgcGFnZVR5cGV9ID0gYm9keTtcbiAgICB0aGlzLmVuZ2FnZW1lbnRMb2NrID0ge307XG4gICAgdGhpcy5wYWdlVHlwZSA9IHBhZ2VUeXBlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gZGVidWdNb2RlO1xuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgdGhpcy5yZUFwcGx5VHJlYXRtZW50c01hcCA9IHt9O1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMgPSBbXTtcbiAgICB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5kZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdHMoKSB7XG4gICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdGhpcy5tYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGVuZ2FnaW5nIHJvYm90ICR7dHJlYXRtZW50LmlkfTogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKTtcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgYWN0aW9ucyxcbiAgICAgIGVsaWdpYmlsaXR5UnVsZVNldCxcbiAgICAgIGRldmljZSxcbiAgICAgIGRlcGVuZGFudF9vbl90cmVhdG1lbnQsXG4gICAgICByZWFwcGx5X2V2ZW50LFxuICAgICAgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUsXG4gICAgICBidXNpbmVzc1J1bGVTZXQsXG4gICAgICB3ZWlnaHQsXG4gICAgICBkZWxheSxcbiAgICB9ID0gdHJlYXRtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGRlYnVnTW9kZSxcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZW5nYWdlbWVudExvY2ssXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNNb2JpbGUsXG4gICAgICByZUFwcGx5VHJlYXRtZW50c01hcCxcbiAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgICAgcGFnZVR5cGUsXG4gICAgICBwcmVwYXJlQW5kQXBwbHksXG4gICAgfSA9IHRoaXM7XG5cbiAgICAvLyBvbmUgZW5nYWdlbWVudCBhdCBhIHRpbWVcbiAgICBpZiAoZW5nYWdlbWVudExvY2tbaWRdKSB7XG4gICAgICBsb2dnZXIubG9nKGBUcmVhdG1lbnQgJHtpZH0gZW5nYWdlbWVudCBpbiBwcm9ncmVzcywgc2tpcHBpbmdgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gdHJ1ZTtcblxuICAgIGlmIChkZWJ1Z01vZGUgIT09IDEgJiYgIXdlaWdodCAmJiAhZGVwZW5kYW50X29uX3RyZWF0bWVudCkge1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZWJ1Z01vZGUgJiYgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgJiYgIWRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZXZpY2UgPT09IFwibW9iaWxlXCIgJiYgIWlzTW9iaWxlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnbW9iaWxlJyBtaXNtYXRjaFwiKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGV2aWNlID09PSBcImRlc2t0b3BcIiAmJiBpc01vYmlsZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ2Rlc2t0b3AnIG1pc21hdGNoXCIpO1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyZWFwcGx5X2V2ZW50KSB7XG4gICAgICBpZiAoIXJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIHx8IHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlID09PSBwYWdlVHlwZSkge1xuICAgICAgICBsZXQgcmVhcHBseV9ldmVudF9hcnJheSA9IHJlYXBwbHlfZXZlbnQ7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWFwcGx5X2V2ZW50KSkgcmVhcHBseV9ldmVudF9hcnJheSA9IFtyZWFwcGx5X2V2ZW50XTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgUmVhcHBseSBldmVudCAnJHtyZWFwcGx5X2V2ZW50fScgZm91bmQgZm9yIHRyZWF0bWVudDogJHtpZH1gKTtcbiAgICAgICAgZm9yIChjb25zdCByZWFwcGx5RXZlbnQgb2YgcmVhcHBseV9ldmVudF9hcnJheSkge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID9cbiAgICAgICAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gOiBbXTtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgYWxyZWFkeSBhZGRlZCBmb3IgcmVhcHBseSBldmVudFwiKTtcbiAgICAgICAgICB9IGVsc2UgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA9IFsuLi5wcmV2aW91c1ZhbHVlLCBpZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZVNldCB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxldCB0cmVhdG1lbnRTa2lwUmF0aW8gPSB3ZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gd2VpZ2h0IHx8IFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICBpZiAoZGVwZW5kYW50X29uX3RyZWF0bWVudCkge1xuICAgICAgICAvLyBJZiBkZXBlbmRhbnQgb24gdHJlYXRtZW50IGlzIGZvdW5kIGFuZCBoYXMgd2VpZ2h0OyB1c2UgaXRzIHNraXAgcmF0aW9cbiAgICAgICAgY29uc3QgZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQgPSBtYXRjaGVkVHJlYXRtZW50cy5maW5kKCh0KSA9PiB0LmlkID09PSBkZXBlbmRhbnRfb25fdHJlYXRtZW50KT8ud2VpZ2h0O1xuICAgICAgICB0cmVhdG1lbnRTa2lwUmF0aW8gPSBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCB8fFxuICAgICAgICAgIFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICB9XG4gICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IHNraXAgcmF0aW86IFwiICsgdHJlYXRtZW50U2tpcFJhdGlvKTtcbiAgICAgIC8vIERldGVybWluaW5nIGlkZW50aWZpZXIgZm9yIGNhbGN1bGF0aW5nIHRyZWF0bWVudCBwZXJjZW50YWdlICh0cmVhdG1lbnRQY3QpXG4gICAgICBjb25zdCBkZXRlcm1pbmluZ0lkZW50aWZpZXIgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50IHx8IGlkO1xuXG4gICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgdGhlIHBlcmNlbnRhZ2UgdmFsdWUgZm9yIHRoZSB0cmVhdG1lbnQgdXNlZCB0byBkZXRlcm1pbmUgaWYgaXQgc2hvdWxkIGJlIHNraXBwZWQgb3Igbm90XG4gICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgMTAwIHdoZW4gZGVidWcgbW9kZSBpcyAxLCBlbnN1cmluZyBubyB0cmVhdG1lbnRzIGFyZSBza2lwcGVkXG4gICAgICBjb25zdCB0cmVhdG1lbnRQY3QgPSBkZWJ1Z01vZGUgPT09IDEgPyAxMDAgOiBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIGRldGVybWluaW5nSWRlbnRpZmllcik7XG4gICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50UGN0OiBcIiArIHRyZWF0bWVudFBjdCArIGAgd2l0aCBkZWJ1ZyBtb2RlICR7ZGVidWdNb2RlID8gXCJvblwiIDogXCJvZmZcIn1gKTtcbiAgICAgIGxldCBidXNpbmVzc1J1bGVJZCA9IG51bGw7XG4gICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBzdWIgdmFyaWFudCBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgICAgYnVzaW5lc3NSdWxlSWQgPSBhd2FpdCB0aGlzLmNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYnVzaW5lc3MgcnVsZSB0cmFuc2Zvcm1hdGlvbiB3aXRoIGlkOiBcIiwgYnVzaW5lc3NSdWxlSWQpO1xuICAgICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHRyZWF0bWVudCB3aXRoIGRlZmF1bHQgdmFsdWVzXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRyZWF0bWVudFBjdCA8IHRyZWF0bWVudFNraXBSYXRpbykge1xuICAgICAgICBsb2dnZXIubG9nKGBUcmVhdG1lbnQgJHtpZH0gc2tpcHBlZCBkdWUgdG8gdHJlYXRtZW50IHNwbGl0IHJhdGlvYCk7XG4gICAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIG51bGwsIFwic2tpcHBlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6XCIsIGlkKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW3RyZWF0bWVudC5pZF0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgY29uc3QgW3ByZXBhcmVkLCB2YXJpYW50XSA9IGF3YWl0IHByZXBhcmVBY3Rpb25zKGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcHBseUFjdGlvbnMocHJlcGFyZWQpO1xuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYXRlUmVhcHBseVJvYm90TWFwKCkge1xuICAgIGNvbnN0IHtyZUFwcGx5VHJlYXRtZW50c01hcCwgbWF0Y2hlZFRyZWF0bWVudHN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZUFwcGx5VHJlYXRtZW50c01hcCkpIHtcbiAgICAgIGNvbnN0IHRyZWF0bWVudElkcyA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW2tleV07XG4gICAgICBjb25zdCByZUFwcGx5VHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigodCkgPT4gdHJlYXRtZW50SWRzLmluY2x1ZGVzKHQuaWQpKTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJpbmZpbml0ZV9zY3JvbGxcIjoge1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbmZpbml0ZV9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0aW1lb3V0XCI6IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSB0aW1lb3V0YCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50X2NoYW5nZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlTZWxlY3Rvckxpc3QgPSBBcnJheS5pc0FycmF5KHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yKSA/XG4gICAgICAgICAgICAgICAgdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IgOiBbdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3JdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiByZWFwcGx5U2VsZWN0b3JMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGVsZW1lbnRfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbl9zY3JvbGxcIjoge1xuICAgICAgICAgIC8vIGFkZCB3aW5kb3cgc2Nyb2xsIGxpc3RlbmVyLCBjYWxsIGVuZ2FnZVJvYm90IG9uIHNjcm9sbCwgZG8gbm90IHRyaWdnZXIgbW9yZSB0aGFuIG9uY2UgcGVyIDI1MG1zXG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IDA7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAobm93IC0gbGFzdFNjcm9sbFRpbWUgPiAyNTAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA+IDUpIHtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gb25fc2Nyb2xsYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJxdWVyeV9zZWFyY2hfY2hhbmdlXCI6IHtcbiAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggIT09IHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gcXVlcnlfc2VhcmNoX2NoYW5nZWApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVydmFsXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoYXBwbGllZD8uW3RyZWF0bWVudC5pZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGludGVydmFsYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb19sYXllcl9jaGFuZ2VcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICAgICAgICAgIGFkZERhdGFMaXN0ZW5lcih0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUmVhcHBseSBldmVudCBub3QgZm91bmQ6IFwiLCBrZXkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVTZXQgPSBbXSwgYnVzaW5lc3NSdWxlU2V0ID0gW10sIGlkfSA9IHRyZWF0bWVudDtcbiAgICBpZiAodGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5pbmNsdWRlcyhpZCkpIHJldHVybjtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMoWy4uLmVsaWdpYmlsaXR5UnVsZVNldCwgLi4uYnVzaW5lc3NSdWxlU2V0XSk7XG4gICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKGBfX2VSdWxlcy4ke3NlbGVjdG9yfWAsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICB9XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5wdXNoKGlkKTtcbiAgfVxuXG4gIGV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZVNldCwgcHJldmlvdXNTZWxlY3RvcnMgPSBudWxsKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gcHJldmlvdXNTZWxlY3RvcnMgfHwgW107XG4gICAgZm9yIChsZXQgcnVsZSBvZiBydWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKHJ1bGUuc3RhcnRzV2l0aChcIiFcIikpIHJ1bGUgPSBydWxlLnNsaWNlKDEpO1xuICAgICAgICBzZWxlY3RvcnMucHVzaChydWxlLnNwbGl0KFwiLlwiKVswXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGUuc2V0LCBzZWxlY3RvcnMpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLihuZXcgU2V0KHNlbGVjdG9ycykpXTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKSB7XG4gICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgZWxpZ2liaWxpdHkgJHtlbGlnaWJpbGl0eVJ1bGV9YCk7XG4gICAgbGV0IG9wcG9zaXRlRmxhZyA9IGZhbHNlO1xuICAgIGxldCBbZWxpZ2liaWxpdHlTY29wZSwgZWxpZ2liaWxpdHlOYW1lXSA9IGVsaWdpYmlsaXR5UnVsZS5zcGxpdChcIi5cIik7XG4gICAgaWYgKGVsaWdpYmlsaXR5U2NvcGUuc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIG9wcG9zaXRlRmxhZyA9IHRydWU7XG4gICAgICBlbGlnaWJpbGl0eVNjb3BlID0gZWxpZ2liaWxpdHlTY29wZS5zbGljZSgxKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtlbGlnaWJpbGl0eVNjb3BlfWApO1xuICAgIGlmICghcmVzIHx8ICFBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob3Bwb3NpdGVGbGFnICYmIHJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFvcHBvc2l0ZUZsYWcgJiYgIXJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgbG9nZ2VyLmxvZyhgJHtlbGlnaWJpbGl0eVJ1bGV9IGlzIGVsaWdpYmxlYCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQsIGVsaWdpYmlsaXR5U2V0VHlwZSA9IG51bGwsIHByZXZpb3VzSXNFbGlnaWJsZSA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcm9ib3QgZWxpZ2liaWxpdHlcIik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVsaWdpYmlsaXR5IFJ1bGUgU2V0ICR7ZWxpZ2liaWxpdHlSdWxlU2V0fSBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGlzRWxpZ2libGUgPSBwcmV2aW91c0lzRWxpZ2libGU7XG4gICAgZm9yIChjb25zdCBlbGlnaWJpbGl0eVJ1bGUgb2YgZWxpZ2liaWxpdHlSdWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlICYmIGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gZWxpZ2liaWxpdHlTZXRUeXBlOiBcIiwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGUuc2V0LCBlbGlnaWJpbGl0eVJ1bGUudHlwZSwgaXNFbGlnaWJsZSk7XG4gICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNFbGlnaWJsZTtcbiAgfVxuXG4gIC8vIFJldHVybiBpbmRleCBvZiBidXNpbmVzc1J1bGUsIHRoaXMgaXMgdGhlIGJ1c2luZXNzUnVsZUlkXG4gIGFzeW5jIGNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgYnVzaW5lc3NSdWxlXSBvZiBidXNpbmVzc1J1bGVTZXQuZW50cmllcygpKSB7XG4gICAgICBpZiAoYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChbYnVzaW5lc3NSdWxlXSkpIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnkvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyxcbiAgaW5qZWN0U3R5bGVTaGVldCxcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBSb2JvdEVuZ2luZSBmcm9tIFwiLi9yb2JvdEVuZ2luZVwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlT25Db21wb25lbnRcIik7XG5cbmNvbnN0IGJlYWdsZU9uID0gYXN5bmMgKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUpID0+IHtcbiAgY29uc3QgcGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSA9IFN0b3JlLmdldEluc3RhbmNlKCkucGVyc2lzdFByb2R1Y3RJbmZvKCk7XG5cbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UgPSBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgY29uc3QgdHJlYXRtZW50c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudHMoKTtcbiAgY29uc3QgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudFdlaWdodHMoKTtcblxuICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWluaXRcIik7XG5cbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgbGV0IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gbnVsbDtcbiAgaWYgKGRlYnVnTW9kZSAmJiBzZWFyY2hQYXJhbXMuaW5jbHVkZXMoXCJmaWx0ZXI9XCIpKSB7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBzZWFyY2hQYXJhbXMuc2xpY2UoXG4gICAgICAgIHNlYXJjaFBhcmFtcy5pbmRleE9mKFwiW1wiKSArIDEsXG4gICAgICAgIHNlYXJjaFBhcmFtcy5sYXN0SW5kZXhPZihcIl1cIiksXG4gICAgKS5zcGxpdChcIixcIikubWFwKChpdGVtKSA9PiBwYXJzZUludChpdGVtLCAxMCkpO1xuICB9XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIH0sIDMwMDApO1xuXG4gIGNvbnN0IFt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICB0cmVhdG1lbnRzUHJvbWlzZSwgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UsXG4gIF0pO1xuXG4gIGlmICghdHJlYXRtZW50cyB8fCAhdHJlYXRtZW50V2VpZ2h0cykge1xuICAgIGxldCBtID0gXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50cy93ZWlnaHRzXCI7XG4gICAgaWYgKCF0cmVhdG1lbnRzKSBtID0gbSArIFwiIG5vIHRyZWF0bWVudHNcIjtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIG0gPSBtICsgXCIgbm8gdHJlYXRtZW50IHdlaWdodHNcIjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgbSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHMvd2VpZ2h0c1wiKTtcbiAgfVxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7XG4gICAgdHJlYXRtZW50cyxcbiAgICB0cmVhdG1lbnRXZWlnaHRzLFxuICB9KTtcblxuICBjb25zdCBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoKTtcbiAgaWYgKCFtYXRjaGVkVHJlYXRtZW50cy5sZW5ndGgpIHtcbiAgICBsb2dnZXIubG9nKFwiTm8gdHJlYXRtZW50cyBtYXRjaGVkLCByZXR1cm5pbmcgd2l0aG91dCBmdXJ0aGVyIGFjdGlvblwiKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJuby1yb2JvdC1tYXRjaGVkXCIpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSwgcGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSxcbiAgXSk7XG5cbiAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgIGRlYnVnTW9kZSxcbiAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICBpZGVudGlmaWVyLFxuICAgIHBhZ2VUeXBlLFxuICB9KTtcbiAgYXdhaXQgcm9ib3RFbmdpbmUuZW5nYWdlUm9ib3RzKCk7XG4gIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJyb2JvdHMtZW5nYWdlZFwiKTtcbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJBcHBsaWVkIHRyZWF0bWVudHM6IFwiLCBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBSdWxlRW5naW5lLmdldEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm47XG4gIGNvbnN0IHJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7ZWxpZ2liaWxpdHlSdWxlc30pO1xuICBhd2FpdCBydWxlRW5naW5lLmFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xufVxuZXhwb3J0IGRlZmF1bHQgYmVhZ2xlT247XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBNb25pdG9yIGZyb20gXCIuLi9CZWFnbGVNb25pdG9yL2luZGV4XCI7XG5pbXBvcnQgYmVhZ2xlT24gZnJvbSBcIi4uL0JlYWdsZU9uXCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcblxubGV0IFNIVVRET1dOID0gZmFsc2U7XG5jb25zdCBGTElQRkxBRyA9IGZhbHNlO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGxldCBtb25pdG9yID0gbnVsbDtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBpbml0aWFsaXppbmdcIik7XG4gIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG4gIGxldCBlYXJseUxvZ1NlbnQgPSBmYWxzZTtcbiAgbGV0IGhpZGVSZW1vdmVkID0gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBtb25pdG9yID0gbmV3IE1vbml0b3IoKTtcbiAgICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyKCk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IGF3YWl0IGdldElkZW50aWZpZXIoKTtcbiAgICBsb2dnZXIubG9nKFwiRm91bmQgaWRlbnRpZmllcjogXCIsIGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiLCBpZGVudGlmaWVyKTtcbiAgICBsZXQgY29va2llUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIsIGNvb2tpZVBjdCk7XG4gICAgLy8gYWRkIGN1cnJlbnQgZXBvY2ggaW50ZWdlciB0byBiZWFnbGVJbmZvTGF5ZXJcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiwgRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuXG4gICAgY29uc3Qgb29zUmVhc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUpO1xuXG4gICAgLy8gaWYgY2Fubm90IGdldCBjcml0aWNhbCBpbmZvLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgdW5zdXBwb3J0ZWRcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwidW5zdXBwb3J0ZWRcIilcbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCBkZXZpY2VcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEZXZpY2UgZG9lcyBub3QgaGF2ZSByZXF1aXJlZCBjYXBhYmlsaXRpZXNcIik7XG4gICAgfVxuXG4gICAgY29uc3QgaXNMYWJlbFNlbnQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQpO1xuICAgIGNvbnN0IHRpbWVvdXRDb3VudGVyID0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5UKSkgfHwgMDtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuXG4gICAgLy8gaWYgdGltZWQtb3V0IHRvbyBtYW55IHRpbWVzIGZvciB2ZXJ5IGZpcnN0IGludGVyYWN0c2lvbnMsIG1ha2Ugb3V0IG9mIHNjb3BlIGZvciB0aGUgc2Vzc2lvblxuICAgIGlmICghZGVidWdNb2RlICYmICFvb3NSZWFzb24gJiYgIWlzTGFiZWxTZW50ICYmIHRpbWVvdXRDb3VudGVyID4gTUFYX1RJTUVPVVRfUEVSX1NFU1NJT05cbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJlYWdsZSB0aW1lb3V0IHRocmVzaG9sZCByZWFjaGVkXCIpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHJlbmFtZSBzaG93cm9vbSBsb2dpYyB0byBhZG1pbiwgYW5kIG1hcCB2dnNJc1Nob3dyb29tIHRvIGEgY29uZmlndXJhYmxlIGFkbWluIHBhcmFtXG4gICAgLy8gSUYgbm8gYWRtaW4gcGFyYW0gaXMgY29uZmlndXJlcywgdGhlbiBza2lwIHRoaXMgYWRtaW4gbG9naWMgY29tcGxldGVseVxuXG4gICAgLy8gVml2ZW5zZSBzcGVjaWZpYzogQ2hlY2sgaWYgdXNlciBpcyBhZG1pbiwgbWFraW5nIHRoZW0gb3V0IG9mIHNjb3BlXG4gICAgLy8gVGhpcyBuZWVkcyB0byB3YWl0IGZvciBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIHRvIHNldCB0aGUgdnZzSXNTaG93cm9vbSB2YWx1ZVxuICAgIGNvbnN0IGlzU2hvd3Jvb20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKTtcbiAgICBpZiAoaXNTaG93cm9vbSAmJiAoaXNTaG93cm9vbSA9PT0gXCJ0cnVlXCIgfHwgaXNTaG93cm9vbSA9PT0gdHJ1ZSkpIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCBzaG93cm9vbVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgZnJvbSBWVlMgc2hvd3Jvb20vY2FsbGNlbnRlclwiKTtcbiAgICB9IGVsc2UgaWYgKGlzU2hvd3Jvb20gPT09IG51bGwgfHwgaXNTaG93cm9vbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZGV0ZXJtaW5lIGlmIHVzZXIgaXMgZnJvbSBWVlMgc2hvd3Jvb20vY2FsbGNlbnRlclwiKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIHJlZmFjdG9yIGFmdGVyIHRhZyBjaGFuZ2VzIGdvIGxpdmVcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtaGlkZVwiKSAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV4dERheS1oaWRlXCIpKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCZWFnbGUgc2NyaXB0IHRpbWVkIG91dFwiKTtcbiAgICB9XG5cbiAgICAvLyBpc09uIGNhbiBiZSB0cnVlIChPTiksIGZhbHNlIChPRkYpXG4gICAgbGV0IGlzT24gPSBudWxsO1xuXG4gICAgLy8gRkxJUCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBmbGFnXG4gICAgaWYgKEZMSVBGTEFHKSB7XG4gICAgICBjb29raWVQY3QgPSA5OSAtIGNvb2tpZVBjdDtcbiAgICB9XG5cbiAgICBpZiAoZGVidWdNb2RlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRGVidWcgbW9kZSBvbjogYWxsIGFwcGxpY2FibGUgdHJlYXRtZW50cyB3aWxsIGJlIGFwcGxpZWRcIik7XG4gICAgICBpc09uID0gdHJ1ZTtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJlbXBsb3llZVwiKSB7XG4gICAgICBsb2dnZXIud2FybihcIlVzZXIgaXMgb3V0IG9mIHNjb3BlXCIpO1xuICAgICAgLy8gc2V0IGlzT24gdG8gdHJ1ZS9mYWxzZSB3aGVuIG5vdCBkZWJ1Z01vZGUgYnV0IG91dCBvZiBzY29wZSBpLmUuIG5kX2RlYnVnPTAgZm9yIHRlc3RhYmlsaXR5XG4gICAgICBpc09uID0gY29va2llUGN0ID49IFNQTElUX1JBVElPO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24pIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdW5rbm93blwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3V0IG9mIHNjb3BlIHJlYXNvblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIFNQTElUX1JBVElPLCB0aGVuIGluIE9OIG1vZGVcbiAgICAgIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8pIHtcbiAgICAgICAgaXNPbiA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInRydWVcIn0pO1xuICAgICAgfSBlbHNlIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8vMikge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMlwifSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMVwifSk7XG4gICAgICB9XG5cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNPblwiLCBpc09uKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgaXNPbi50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwiRm91bmQgY29va2llIHBlcmNlbnRhZ2U6IFwiLCBjb29raWVQY3QpO1xuICAgIGxvZ2dlci5sb2coXCJTcGxpdF9yYXRpbzogXCIsIFNQTElUX1JBVElPKTtcbiAgICBsb2dnZXIubG9nKFwiY29va2llUGN0IDwgU1BMSVRfUkFUSU9cIiwgY29va2llUGN0IDwgU1BMSVRfUkFUSU8pO1xuICAgIGxvZ2dlci5sb2coXCJTZXQgaXNPbjogXCIsIGlzT24pO1xuXG4gICAgLy8gYXdhaXQgY3JpdGljYWwgaW5mbyBiZWZvcmUgc2VuZGluZyBsb2dzIGZvciBwcm9wZXIgYW5hbHl0aWNzIG1lYXN1cmVtZW50c1xuICAgIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIGlmIChwYWdlVHlwZSA9PT0gXCJwdXJjaGFzZVwiKSB7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucmV2ZW51ZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgLy8gc2VuZCBsb2dzIGltbWVkaWF0ZWx5IG9uIHB1cmNoYXNlIHBhZ2UsIGFuZCBmb3JjZSB3YWl0XG4gICAgICBhd2FpdCBtb25pdG9yLnNlbmRMb2dzKHRydWUpO1xuICAgICAgLy8gaWYgcHVyY2hhc2UgaXMgY29tcGxldGUsIGRvIG5vdCBhcHBseSBhbnkgdHJlYXRtZW50cyBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIFNIVVRET1dOID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2VuZCBsb2dzIHdoZW4gcmVhZHksIHN0YXJ0IHNjcmFwaW5nIGFuZCBzZW5kaW5nIGFzeW5jbHlcbiAgICAgIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIH1cbiAgICBlYXJseUxvZ1NlbnQgPSB0cnVlO1xuXG4gICAgaWYgKGlzT24gPT09IHRydWUpIHtcbiAgICAgIGlmICghU0hVVERPV04pIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkJlYWdsZSBPTiBHcm91cCBQYXRoXCIpO1xuICAgICAgICBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9OIEdyb3VwIFNIVVRET1dOIFBhdGhcIik7XG4gICAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09uID09PSBmYWxzZSkge1xuICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT0ZGIEdyb3VwIFBhdGhcIik7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaXNPbiBpcyB1bmRlZmluZWQgb3IgbnVsbFwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiQmVhZ2xlIEVhcmx5IFNjb3BlLW91dCBvciBFUlJPUjogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIGlmICghaGlkZVJlbW92ZWQpIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJWRVJTSU9OIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIlRSRUFUTUVOVF9SQVRJTyIsIlRSRUFUTUVOVFNfRFVSQVRJT04iLCJNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJUUkVBVE1FTlRTIiwiUE9QVVBfRElTUExBWV9GTEFHIiwiU0tVX0lORk9fQkFTS0VUIiwiVElNRU9VVF9DT1VOVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJXRUlHSFRTIiwiRUxJR0lCSUxJVFlfUlVMRVMiLCJMT0NBTF9TVE9SQUdFX0tFWVMiLCJERUJVR19NT0RFIiwiT1VUX09GX1NDT1BFIiwiSVNfTEFCRUxfU0VOVCIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwidGVzdGluZyIsIkRFQlVHIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFyZ3MiLCJjb25zb2xlIiwiaW5mbyIsImxvZyIsIm1lc3NhZ2VDb25maWciLCJmb3JFYWNoIiwiYXJndW1lbnQiLCJ0eXBlIiwid2FybiIsImVycm9yIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJsb2dnZXIiLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJ0b3AiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZldGNoVHJlYXRtZW50cyIsImZldGNoUGx1cyIsInRyZWF0bWVudHMiLCJqc29uIiwianNvblRyZWF0bWVudCIsImZhaWxlZCIsIm1lc3NhZ2UiLCJmZXRjaFRyZWF0bWVudFdlaWdodHMiLCJ0cmVhdG1lbnRXZWlnaHRzIiwianNvblRyZWF0bWVudFdlaWdodHMiLCJmZXRjaEVsaWdpYmlsaXR5UnVsZXMiLCJlbGlnaWJpbGl0eVJ1bGVzIiwianNvbkVsaWdpYmlsaXR5UnVsZXMiLCJmZXRjaFByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm8iLCJ0ZXh0IiwicHJvZHVjdEluZm9DU1YiLCJjc3ZUb0FycmF5IiwidGltZW91dCIsInRpbWUiLCJjb250cm9sbGVyIiwiQWJvcnRDb250cm9sbGVyIiwic2V0VGltZW91dCIsImFib3J0IiwidXJsIiwib3B0aW9ucyIsInJldHJpZXMiLCJmZXRjaCIsInNpZ25hbCIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwic3RhdHVzIiwiY2F0Y2giLCJleHRyYWN0Q29va2llSWRlbnRpZmllciIsImNvb2tpZVN0cmluZyIsImNvb2tpZU5hbWUiLCJwYXJzZWQiLCJzcGxpdCIsIm1hcCIsInYiLCJyZWR1Y2UiLCJhY2MiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0cmltIiwiaWRlbnRpZmllciIsImlkZW50aWZpZXJJbmRleCIsImRldGVybWluZVBjdCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJwY3QiLCJleGl0U2Nyb2xsTGlzdGVuZXIiLCJjYWxsQmFjayIsImxvb3AiLCJzY3JvbGxUb3AiLCJsYXN0U2Nyb2xsVG9wIiwiY2xlYXJJbnRlcnZhbCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInNldEludGVydmFsIiwic3R5bGVBcHBsaWNhdG9yIiwiZWxlbWVudHMiLCJzdHlsZUNoYW5nZXNNYXAiLCJpIiwiZWxlbWVudCIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYnVzaW5lc3NSdWxlSWQiLCJhY3Rpb25zIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidmFyaWFudCIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsImlkIiwia2V5cyIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uU3RvcmFnZSIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsInNldEl0ZW0iLCJub3ciLCJwYXRobmFtZSIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJjdXJyZW50IiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsIk1hdGgiLCJhYnMiLCJnZXRSYW5kb21JbnQiLCJmbG9vciIsInJhbmRvbSIsImdldFVuaXhUaW1lIiwiZ2V0SWRlbnRpZmllciIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImUiLCJkZWxheSIsIm1zIiwiZm9ybWF0RGVsaXZlcnlEYXRlIiwiZGF0ZSIsInJlc3VsdCIsInN0YXJ0TW9udGhJbmRleCIsImVuZE1vbnRoSW5kZXgiLCJzdGFydERheSIsImVuZERheSIsIm1hdGNoIiwidG9kYXkiLCJzdGFydFllYXIiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZW5kWWVhciIsImVzdGltYXRlZFN0YXJ0IiwiZXN0aW1hdGVkRW5kIiwic3RhcnREaWZmT3ZlckRheXMiLCJjZWlsIiwiZW5kRGlmZk92ZXJEYXlzIiwic3RhcnREaWZmT3ZlcldlZWtzIiwiZW5kRGlmZk92ZXJXZWVrcyIsImVyciIsImlkbGVUaW1lciIsInRpbWVPdXQiLCJyZXNldFRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiaWRsZVRpbWVvdXQiLCJvbnRvdWNoc3RhcnQiLCJnZXRCcm93c2VyVHlwZSIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsImlzT3duTXV0YXRpb24iLCJtdXRhdGlvbkxpc3QiLCJub2RlcyIsIkFycmF5IiwiZnJvbSIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJzb21lIiwibiIsInRhZ05hbWUiLCJjIiwic3RyRGF0YSIsInN0ckRlbGltaXRlciIsIm9ialBhdHRlcm4iLCJhcnJEYXRhIiwiYXJyTWF0Y2hlcyIsImV4ZWMiLCJzdHJNYXRjaGVkRGVsaW1pdGVyIiwicHVzaCIsInN0ck1hdGNoZWRWYWx1ZSIsImNvbmZpZyIsImRiTmFtZSIsInZlcnNpb24iLCJtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50Iiwic3RvcmUiLCJuYW1lIiwiaW5kZXhlcyIsImZpZWxkcyIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiX3dpbmRvdyIsImFsbHRpbWUiLCJzZXNzaW9uIiwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIiwiaW5kZXhlZERCIiwiaW5pdCIsIm9wZW5SZXF1ZXN0Iiwib3BlbiIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib2xkVmVyc2lvbiIsImRlbGV0ZU9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJpZHgiLCJjcmVhdGVJbmRleCIsIm9uZXJyb3IiLCJvbnN1Y2Nlc3MiLCJkYiIsImRlbGV0ZVJlcXVlc3QiLCJkZWxldGVEYXRhYmFzZSIsInJlamVjdCIsImludGVydmFsIiwicmVhZHdyaXRlIiwiZ2V0Q29ubmVjdGlvbiIsInR4IiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsImRhdGFOYW1lIiwiZGF0YVZhbHVlIiwiaW5pdFRyYW5zYWN0aW9uIiwic2Vzc2lvbklkIiwiZ2V0Q3VycmVudFNlc3Npb25JZCIsInJvdW5kIiwicGF5bG9hZCIsInB1dCIsIm9wIiwic3RvcmVkIiwiZ2V0Q3Vyc29yIiwiY3Vyc29yIiwidGFyZ2V0IiwiY29udGludWUiLCJtaW5tYXgiLCJNYXAiLCJoYXMiLCJzZXQiLCJncm91cEJ5IiwiZGF0YSIsImNvdW50IiwidG90YWwiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsIm9wZW5DdXJzb3IiLCJJREJLZXlSYW5nZSIsIm9ubHkiLCJ0b1N0cmluZyIsImluZGV4VmFsdWUiLCJzdW0iLCJzaXplIiwidmFsdWVzIiwiZCIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJwYWRTdGFydCIsImdldERhdGUiLCJDb2xsZWN0b3JBcGkiLCJjb2xsZWN0b3JBcGkiLCJxdWVyeUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lIiwicXVlcnlNZXRob2QiLCJxdWVyeVByb21pc2UiLCJhdmciLCJtb2RlIiwibGFzdCIsImRhdGFWYWx1ZXMiLCJvYmoiLCJkYXRhX3ZhbHVlIiwidXBkYXRlSW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZVZhbHVlIiwidXBkYXRlTWV0aG9kIiwic2F2ZSIsImJlYWdsZUluZm9MYXllciIsImEiLCJmIiwiX19od20iLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwic2VsZWN0b3IiLCJmb3JtYXR0ZXIiLCJleGNsdXNpdmUiLCJvcGVyYW5kIiwib2JzZXJ2ZXIiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJpc0FycmF5IiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImJsb2NraW5nIiwicG9sbEludGVydmFsIiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJzZWFyY2hFbGVtZW50IiwiaXNGb3VuZCIsImlzSWdub3JlIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwicXVlcnlTZWxlY3RvciIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwiZmlsdGVyIiwiTXV0YXRpb25PYnNlcnZlciIsInRyaWdnZXJSZXN0YXJ0Iiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJpbm5lclRleHQiLCJhdHRyaWJWYWx1ZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwidmFsdWVjaGlsZCIsImF0dHJpYlZhbHVlIiwiZ2V0QXR0cmlidXRlIiwic2V0VmFsdWUiLCJzdW1QcmljZSIsImNoaWxkVGV4dCIsImFycmF5SW5uZXJUZXh0IiwiZXhjbHVzaXZlRWxlbWVudCIsImN1c3RvbURhdGFEZXJpdmF0aW9ucyIsImN1cnJlbnRQYWdlVHlwZSIsImFsbCIsImlzQ2FydEVtcHR5IiwidG90YWxCYXNlUHJpY2UiLCJjb3Vwb25Ob3RBcHBsaWNhYmxlIiwicHJpY2VzIiwicXVhbnRpdGllcyIsInRvdGFsUHJpY2UiLCJjb3Vwb25BcHBsaWNhYmxlQW1vdW50Iiwic2t1Iiwic2t1TGlzdCIsInBhcnNlU2VhcmNoUGF0aHMiLCJkb21TdGF0dXMiLCJyZWFkeVN0YXRlIiwid2ludG9wIiwiZGF0YUxheWVyIiwid2luZG9jIiwiZm91bmROYW1lcyIsIlNldCIsInByZXZGb3VuZE5hbWVzIiwibm90Rm91bmROYW1lcyIsImFkZCIsInNlYXJjaEFuZFNldCIsImRhdGFMYXllckl0ZW0iLCJzb3JnQXJyYXlJbm5lciIsImdldFNPUkdBcnJheSIsInNvcmdJdGVtIiwiam9pbiIsInBhdGgiLCJwYXRoQXJyYXkiLCJzdWJQYXRoIiwic2xpY2UiLCJzdWJBcnJheSIsInN1YktleSIsInN1YlZhbHVlIiwid2luZG93UHRyIiwibmF2UHRyIiwicGxhdGZvcm0iLCJ1c2VyQWdlbnREYXRhIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImF2YWlsV2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwid2luZG93RGVwdGgiLCJjb2xvckRlcHRoIiwicGl4ZWxEZXB0aCIsInZwb3J0U2hhcGUiLCJ2aXN1YWxWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0IiwiaU9TIiwib3JpZW50YXRpb25BbmdsZSIsIm9yaWVudGF0aW9uIiwiYW5nbGUiLCJ0ZW1wIiwiaGlzdG9yeSIsIm5hdkFnZW50IiwiYnJhbmRzIiwiYnJhbmQiLCJtb2JpbGUiLCJoYXJkd2FyZUNvbmN1cnJlbmN5IiwibGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsInVzZXJMYW5ndWFnZSIsIm1heFRvdWNoUG9pbnRzIiwidmVuZG9yIiwiY29ubmVjdGlvbiIsImRvd25saW5rIiwiY3VycmVudFVSTCIsIlVSTCIsImhvc3RuYW1lIiwiZG9Ob3RUcmFjayIsIm1zRG9Ob3RUcmFjayIsInJlZmVycmVyIiwiZmlyc3RTZXNzaW9uUmVmZXJyZXIiLCJwYWdlVHlwZSIsInBlcmZNZXRyaWNzIiwicGVyZk5hdmlnYXRpb25NZXRyaWNzIiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlUeXBlIiwiY29ubmVjdCIsImNvbm5lY3RFbmQiLCJjb25uZWN0U3RhcnQiLCJyZXF1ZXN0IiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJkb20iLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwibG9hZCIsImxvYWRFdmVudEVuZCIsImxvYWRFdmVudFN0YXJ0IiwiZHVyYXRpb24iLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwidGV4dENvbnRlbnQiLCJqc29uY29udGVudCIsIkhFQURFUlMiLCJNb25pdG9yIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaGlnaFdhdGVyTWFyayIsImluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMiLCJpbW1lZGlhdGUiLCJwYWNrQW5kUXVldWVNYWluTG9nIiwicGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2ciLCJwYWNrYWdlTWFpbkxvZ0RhdGEiLCJyZXF1ZXN0QmxvYiIsImNoZWNrRm9yTGF0ZXN0Q2hhbmdlcyIsInF1ZXVlTG9ncyIsImhhc0NoYW5nZWQiLCJwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhIiwibG9nRGF0YSIsInBhY2thZ2VBcnJpdmFsTG9nRGF0YSIsImh3bSIsImNvb2tpZUdhSWQiLCJ2aWV3X2Vwb2NoIiwiYm9keSIsImxjIiwidSIsIm9uSGFzaFBjdCIsIkJsb2IiLCJzdGFydHNXaXRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJydWxlIiwib3BlcmF0b3IiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJzZWxlY3RvckZhbGxiYWNrIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiRnVuY3Rpb24iLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiaXNNb2JpbGUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJ0aW1lc3RhbXAiLCJjbGVhclJlcXVlc3QiLCJjbGVhciIsImdldFJlcXVlc3QiLCJjb3VudFJlcXVlc3QiLCJjdXJzb3JSZXF1ZXN0IiwiZXhpc3RpbmdQcm9kSW5mbyIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwiY2xlYXJQcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwiTXV0ZXgiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbiIsImNoYWluX2NvbmRpdGlvbiIsInJ1bGVzIiwic2F0aXNmaWVkUnVsZUlkcyIsInNldFVwTGlzdGVuZXJzIiwiYWNxdWlyZSIsInJlbGVhc2UiLCJpc0VsaWdpYmxlIiwiZmlsdGVyZWQiLCJrIiwiZGF0YUxheWVyUnVsZXMiLCJlbGVtZW50UnVsZXMiLCJib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJiaW5kIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImVsZW1lbnRUb09ic2VydmUiLCJwYXJlbnROb2RlIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50IiwicnVsZVNldCIsInNlZ21lbnRSdWxlRW5naW5lIiwiYnVzaW5lc3NSdWxlU2V0IiwiY2hlY2tSdWxlcyIsIlRyZWF0bWVudFJlcG9zaXRvcnkiLCJ1c2VyR3JvdXAiLCJ1c2VyR3JvdXBXZWlnaHRzIiwidHJlYXRtZW50IiwidHJlYXRtZW50c09iaiIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkRGF5cyIsIndlaWdodHMiLCJyZXBsYWNlciIsInJlcGxhY2VGbiIsInZhbCIsImN1cnJlbnRSZXBsYWNlRm4iLCJyZXBsYWNlT2JqZWN0RXh0cmFjdG9yIiwicmVwbGFjZVZhbCIsInJlcGxhY2VGbkV4ZWN1dG9yIiwickZuIiwic2luZ2xlIiwicmVwbGFjZUZ1bmN0aW9uIiwic3RvcmFnZSIsImtleUZhbGxiYWNrIiwiY2hlY2tBY3Rpb25Db25kaXRpb24iLCJhdHRyaWJ1dGUiLCJpbm5lcl9jb25kaXRpb24iLCJlbGlnaWJsZUVsZW1lbnRzIiwiY29uZGl0aW9uRWxlbWVudHMiLCJlbGVtZW50U2t1IiwiJCIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwiYXBwbHlFdmVudCIsImNvbnRlbnRTZWxlY3RvciIsIm1kQ29uZGl0aW9uIiwibW92ZV9zZWxlY3Rvcl8xIiwibW92ZV9zZWxlY3Rvcl8yIiwicFR5cGUiLCJwcm9kdWN0SW5mb1N0b3JhZ2UiLCJtYyIsIlN0cmluZyIsImJlZm9yZSIsImFmdGVyIiwiYXBwZW5kIiwib2ZmIiwiY3JlYXRlUG9wdXAiLCJlbG0iLCJzdG9wUHJvcGFnYXRpb24iLCJkaXNwbGF5TW9kYWwiLCJnZXRQcm9kdWN0SW5mbyIsImRpc3BsYXlQb3B1cCIsInIiLCJwdXNoU3RhdGUiLCJzdGF0ZSIsIm9uY2UiLCJodG1sIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm9yaWdpbmFsVGl0bGUiLCJ0aXRsZSIsImhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UiLCJjc3MiLCJwcm9wZXJ0eSIsInByb3BlcnR5VmFsdWUiLCJhdHRyIiwibjEiLCJuMiIsInN3YXBOb2RlcyIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwicHJlcGVuZCIsInNlbnRlbmNlIiwid29yZCIsImNoYXJBdCIsInRvTG9jYWxlVXBwZXJDYXNlIiwicmVwbGFjZVdpdGhWYWwiLCJodG1sU3RyIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJjb250YWlucyIsImhpZGUiLCJxUG9wdXAiLCJnZXRFbGVtZW50QnlJZCIsImlzTW9kYWwiLCJwb3B1cFdyYXBwZXIiLCJwb3B1cENsb3NlQnV0dG9uIiwicG9wdXBDbG9zZUJ1dHRvblN0eWxlIiwib25jbGljayIsImNvbnRlbnRzIiwic3JjIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJwb3B1cCIsImNvbnRlbnQiLCJmaXJzdENoaWxkIiwicDEiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJPQlNFUlZFUl9DT05GSUciLCJhdHRyaWJ1dGVzIiwiUm9ib3RFbmdpbmUiLCJkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyIsImRlYnVnTW9kZSIsIm1hdGNoZWRUcmVhdG1lbnRzIiwiZW5nYWdlbWVudExvY2siLCJyZUFwcGx5VHJlYXRtZW50c01hcCIsImFkZGVkRGF0YUxpc3RlbmVySWRzIiwiZW5nYWdlUm9ib3QiLCJpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCIsImVsaWdpYmlsaXR5UnVsZVNldCIsImRldmljZSIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInByZXBhcmVBbmRBcHBseSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCIsInQiLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyIsInByZXBhcmVkIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJSZXNpemVPYnNlcnZlciIsInJlYXBwbHlTZWxlY3Rvckxpc3QiLCJyZWFwcGx5X3NlbGVjdG9yIiwibGFzdFNjcm9sbFRpbWUiLCJnZXRUaW1lIiwic3QiLCJwYWdlWU9mZnNldCIsInJlYXBwbHlJbnRlcnZhbCIsImFwcGxpZWQiLCJib3VuZEVuZ2FnZVRyZWF0bWVudCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJwcmV2aW91c1NlbGVjdG9ycyIsImVsaWdpYmlsaXR5UnVsZSIsIm9wcG9zaXRlRmxhZyIsImVsaWdpYmlsaXR5U2NvcGUiLCJlbGlnaWJpbGl0eU5hbWUiLCJlbGlnaWJpbGl0eVNldFR5cGUiLCJwcmV2aW91c0lzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiYmVhZ2xlT24iLCJwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlIiwicGVyc2lzdFByb2R1Y3RJbmZvIiwiZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UiLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXMiLCJ0cmVhdG1lbnRzUHJvbWlzZSIsImdldFRyZWF0bWVudHMiLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJzZWFyY2hQYXJhbXMiLCJsYXN0SW5kZXhPZiIsIml0ZW0iLCJtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsImdldE1hdGNoZWRUcmVhdG1lbnRzIiwicm9ib3RFbmdpbmUiLCJlbmdhZ2VSb2JvdHMiLCJnZXRFbGlnaWJpbGl0eVJ1bGVzIiwicnVsZUVuZ2luZSIsIlNIVVRET1dOIiwiRkxJUEZMQUciLCJtb25pdG9yIiwiZWFybHlMb2dTZW50IiwiaGlkZVJlbW92ZWQiLCJjb29raWVQY3QiLCJwYWNrQW5kUXVldWVBcnJpdmFsTG9nIiwicHJvdG90eXBlIiwiR0xPVl9PTiIsImlzTGFiZWxTZW50IiwidGltZW91dENvdW50ZXIiLCJpc1Nob3dyb29tIiwiaXNPbiIsInNlbmRMb2dzIl0sInNvdXJjZVJvb3QiOiIifQ==
