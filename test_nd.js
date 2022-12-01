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

var fetchPlus = function fetchPlus(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
                        return Store.getInstance().get(skuList[0]);

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
                robotEngine_logger.failed("Rule check failed for treatment: ", id);
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
                  _context8.next = 55;
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
                return _context8.abrupt("continue", 53);

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
                _context8.next = 53;
                break;

              case 49:
                if (!(_typeof(eligibilityRule) === "object")) {
                  _context8.next = 53;
                  break;
                }

                _context8.next = 52;
                return this.checkEligibilityRuleSet(eligibilityRule.set, eligibilityRule.type, isEligible);

              case 52:
                isEligible = _context8.sent;

              case 53:
                _context8.next = 10;
                break;

              case 55:
                _context8.next = 60;
                break;

              case 57:
                _context8.prev = 57;
                _context8.t3 = _context8["catch"](8);

                _iterator13.e(_context8.t3);

              case 60:
                _context8.prev = 60;

                _iterator13.f();

                return _context8.finish(60);

              case 63:
                return _context8.abrupt("return", isEligible);

              case 64:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[8, 57, 60, 63]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUErQzs7Ozs7Ozs7QUNBL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsTUFBTTtBQUNOLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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c291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2RhdGFMYXllckNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VsZW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9mdW5jdGlvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Nlc3Npb25DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS91cmxDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbnZDaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtc2lkZS1pbnRlZ3JhdGlvbi1zY3JpcHRzLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NsaWVudC1zaWRlLWludGVncmF0aW9uLXNjcmlwdHMvLi9zcmMvQmVhZ2xlT24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXNpZGUtaW50ZWdyYXRpb24tc2NyaXB0cy8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImV4cG9ydCBjb25zdCByZXBsYWNlQWxsID0gKHN0ciwgZmluZCwgcmVwbGFjZSA9IFwiXCIpID0+IHtcbiAgaWYgKCFzdHIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gIGlmIChpbmRleCA8IDApIHJldHVybiBzdHI7XG5cbiAgd2hpbGUgKHN0ci5pbmRleE9mKGZpbmQpID49IDApIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICAgIHN0ciA9IChpbmRleCA+IDAgPyBzdHIuc3Vic3RyaW5nKDAsIGluZGV4KSA6IFwiXCIpICsgcmVwbGFjZSArIHN0ci5zdWJzdHJpbmcoaW5kZXggKyBmaW5kLmxlbmd0aCk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuZXhwb3J0IGNvbnN0IHR1cmtpc2hUb0xvd2VyID0gKHN0cikgPT4ge1xuICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xuICBsZXQgc3RyaW5nID0gc3RyO1xuICBjb25zdCBsZXR0ZXJzID0ge1wixLBcIjogXCJpXCIsIFwiSVwiOiBcIsSxXCIsIFwixZ5cIjogXCLFn1wiLCBcIsSeXCI6IFwixJ9cIiwgXCLDnFwiOiBcIsO8XCIsIFwiw5ZcIjogXCLDtlwiLCBcIsOHXCI6IFwiw6dcIn07XG4gIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oKFvEsEnFnsSew5zDh8OWXSkpL2csIGZ1bmN0aW9uKGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXJzW2xldHRlcl07XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi9zdHJpbmdVdGlsc1wiO1xuY29uc3QgaXNTdGFnaW5nID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwic3RhZ2luZy52aXZlbnNlXCIpIDogdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjAuMC4zOFwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbi8vIFRPRE8gcmV2ZXJ0IHRoZSBmb2xsb3dpbmcgc3RhZ2luZyBlbnYgY2hlY2sgYWZ0ZXIgbW92aW5nIHRvIG5ldyBicmFuY2ggc3RydWN0dXJlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0cy5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0lORk9fTE9DQVRJT04gPSBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvc29jaWFsLXByb29mLnR4dFwiO1xuZXhwb3J0IGNvbnN0IExPR19BUElfVVJMID0gXCJodHRwczovL2V1cm9wZS13ZXN0My1uZXh0ZGF5LTM0ZWIzLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvbG9nXCI7XG5leHBvcnQgY29uc3QgTE9PS1VQX0FQSV9VUkwgPSBcImh0dHBzOi8vY2F0YWxvZy1hcGkuYWRvcmFhaS5jb21cIjtcbmV4cG9ydCBjb25zdCBNT0JJTEVfTUVESUFfUVVFUlkgPSBcIihtYXgtd2lkdGg6IDQ0MHB4KVwiO1xuLy8gQ29udHJvbCBncm91cCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgU1BMSVRfUkFUSU8gPSA1MDtcbi8vIFNraXBwZWQgdHJlYXRtZW50IHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0RVUkFUSU9OID0gMTtcbmV4cG9ydCBjb25zdCBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiA9IDE7XG5leHBvcnQgY29uc3QgTElTVF9NT0RFX0JFQUdMRV9LRVlTID0gW1wicGFnZXR5cGVcIiwgXCJjYXRlZ29yeVwiLCBcImFsbHRpbWVQTFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUExQQ2F0ZWdvcnlNb2RlXCIsXG4gIFwiYWxsdGltZVBEUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QRFBDYXRlZ29yeU1vZGVcIiwgXCJhbGx0aW1lQ2FydENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25DYXJ0Q2F0ZWdvcnlNb2RlXCJdO1xuZXhwb3J0IGNvbnN0IElETEVfVElNRU9VVCA9IDE1MDAwO1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTl9TVE9SQUdFX0tFWVMgPSB7XG4gIFNFU1NJT05fVElNRVNUQU1QOiBcIkJHX1Nlc3Npb25UaW1lc3RhbXBcIixcbiAgU0VTU0lPTl9ISVNUT1JZOiBcIkJHX1Nlc3Npb25IaXN0b3J5XCIsXG4gIFRSRUFUTUVOVFM6IFwiQkdfVHJlYXRtZW50c1wiLFxuICBQT1BVUF9ESVNQTEFZX0ZMQUc6IFwiQkdfUG9wdXBEaXNwbGF5RmxhZ1wiLFxuICBTS1VfSU5GT19CQVNLRVQ6IFwiQkdfUHJvZHVjdEluZm9CYXNrZXRcIixcbiAgVElNRU9VVF9DT1VOVDogXCJCR19UaW1lb3V0Q291bnRcIixcbiAgU0VTU0lPTl9SRUZFUlJFUjogXCJCR19TZXNzaW9uUmVmZXJyZXJcIixcbiAgV0VJR0hUUzogXCJCR19XZWlnaHRzXCIsXG4gIEVMSUdJQklMSVRZX1JVTEVTOiBcIkJHX0VfUnVsZXNcIixcbn07XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlTID0ge1xuICBERUJVR19NT0RFOiBcIkJHX0RlYnVnXCIsXG4gIE9VVF9PRl9TQ09QRTogXCJCR19PdXRPZlNjb3BlXCIsXG4gIElTX0xBQkVMX1NFTlQ6IFwiQkdfTGFiZWxTZW50XCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAwXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVdGlsc1wiKTtcbmNvbnN0IG1vbnRocyA9IHtcbiAgXCJvY2FrXCI6IDAsXG4gIFwixZ91YmF0XCI6IDEsXG4gIFwibWFydFwiOiAyLFxuICBcIm5pc2FuXCI6IDMsXG4gIFwibWF5xLFzXCI6IDQsXG4gIFwiaGF6aXJhblwiOiA1LFxuICBcInRlbW11elwiOiA2LFxuICBcImHEn3VzdG9zXCI6IDcsXG4gIFwiZXlsw7xsXCI6IDgsXG4gIFwiZWtpbVwiOiA5LFxuICBcImthc8SxbVwiOiAxMCxcbiAgXCJhcmFsxLFrXCI6IDExLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50SGlkZSA9ICgpID0+IHtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbiAgLy8gVE9ETyByZW1vdmUgYWZ0ZXIgdGFnIGlzIHVwZGF0ZWRcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm5leHREYXktaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3QgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoUGx1cyhUUkVBVE1FTlRTX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudCB3ZWlnaHRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoUGx1cyhFX1JVTEVTX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBqc29uRWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGVsaWdpYmlsaXR5UnVsZXMuanNvbigpO1xuICAgIHJldHVybiBqc29uRWxpZ2liaWxpdHlSdWxlcztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCBlbGlnaWJpbGl0eSBydWxlc1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFByb2R1Y3RJbmZvID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBwcm9kdWN0IGluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBmZXRjaFBsdXMoUFJPRFVDVF9JTkZPX0xPQ0FUSU9OKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb0NTViA9IGF3YWl0IHByb2R1Y3RJbmZvLnRleHQoKTtcbiAgICByZXR1cm4gY3N2VG9BcnJheShwcm9kdWN0SW5mb0NTVik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggcHJvZHVjdCBpbmZvXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT5cbiAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0cmllcyA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZmV0Y2hQbHVzKHVybCwgb3B0aW9ucywgcmV0cmllcyAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXMuc3RhdHVzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggZmFpbGVkOiBcIiwgZXJyb3IubWVzc2FnZSkpO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdENvb2tpZUlkZW50aWZpZXIgPSAoY29va2llU3RyaW5nLCBjb29raWVOYW1lKSA9PiB7XG4gIGlmICghY29va2llU3RyaW5nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBjb29raWVTdHJpbmdcbiAgICAgIC5zcGxpdChcIjtcIilcbiAgICAgIC5tYXAoKHYpID0+IHYuc3BsaXQoXCI9XCIpKVxuICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgIGlmICh2WzBdICYmIHZbMV0pIHtcbiAgICAgICAgICBhY2NbZGVjb2RlVVJJQ29tcG9uZW50KHZbMF0udHJpbSgpKV0gPSBkZWNvZGVVUklDb21wb25lbnQodlsxXS50cmltKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG5cbiAgbGV0IGlkZW50aWZpZXIgPSBwYXJzZWRbY29va2llTmFtZV07XG4gIGlmICghaWRlbnRpZmllcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChjb29raWVOYW1lID09PSBcIl9nYVwiKSB7XG4gICAgLy8gZXh0cmFjdCB1bmlxdWUgaWRlbnRpZmllciBmcm9tIEdBIGNvb2tpZVxuICAgIGNvbnN0IGlkZW50aWZpZXJJbmRleCA9IDI7XG4gICAgaWRlbnRpZmllciA9IGlkZW50aWZpZXIuc3BsaXQoXCIuXCIpW2lkZW50aWZpZXJJbmRleF07XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXI7XG59O1xuXG5leHBvcnQgY29uc3QgZGV0ZXJtaW5lUGN0ID0gYXN5bmMgKGlkZW50aWZpZXIpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIpO1xuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCkgPT4ge1xuICBjb25zdCBhY3Rpb25zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhY3Rpb25zVG9QcmVwYXJlKSk7XG4gIGxldCB2YXJpYW50ID0gbnVsbDtcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgIGNvbnN0IHtidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMsIHZhcmlhbnRzfSA9IGFjdGlvbjtcbiAgICBpZiAoIWJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyAmJiAhdmFyaWFudHMpIGNvbnRpbnVlO1xuICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiBidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJpZFwiKSB7XG4gICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFyaWFudHMpIHtcbiAgICAgIGZvciAoY29uc3QgdmFyaWFudEtleSBvZiBPYmplY3Qua2V5cyh2YXJpYW50cykpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyA9ICgpID0+IHtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBRywgU0VTU0lPTl9USU1FU1RBTVAsIFNFU1NJT05fSElTVE9SWX0gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCBwb3B1cERpc3BsYXlGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpO1xuICBjb25zdCBzZXNzaW9uVGltZXN0YW1wID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCk7XG4gIGNvbnN0IHNlc3Npb25IaXN0b3J5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX0hJU1RPUlkpO1xuXG4gIGlmIChwb3B1cERpc3BsYXlGbGFnID09PSBudWxsKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDApO1xuICB9XG4gIGlmICghc2Vzc2lvblRpbWVzdGFtcCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVAsIERhdGUubm93KCkpO1xuICB9XG4gIGlmICghc2Vzc2lvbkhpc3RvcnkpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZV0pO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBzZXNzaW9uSGlzdG9yeV0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29uZGl0aW9uQ2hlY2tlciA9IChydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJub3RFeGlzdFwiKSB7XG4gICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHxcbiAgICBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gbnVsbCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IHJ1blRpbWVWYWx1ZSBvciBjb25kaXRpb24gaXMgbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgY2FzZSBcImV4aXN0XCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImluY2x1ZGVzXCI6XG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RJbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJub3RDb250YWluc1wiOlxuICAgICAgaWYgKCFydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPD0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImJldHdlZW5cIjoge1xuICAgICAgbGV0IFttaW4sIG1heF0gPSB2YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gbWluICYmIHJ1blRpbWVWYWx1ZSA8PSBtYXgpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FzZSBcInJlZ2V4XCI6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgXCJpXCIpO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QocnVuVGltZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBjb25kaXRpb24gaXMgbm90IGRlZmluZWQgXCIsIGNvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREZWJ1Z01vZGUgPSAob29zUmVhc29uKSA9PiB7XG4gIGNvbnN0IHtERUJVR19NT0RFLCBPVVRfT0ZfU0NPUEV9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShPVVRfT0ZfU0NPUEUsIG9vc1JlYXNvbik7XG4gIH1cblxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0xXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDEpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MlwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAyO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTBcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgY3VycmVudCA9IHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShERUJVR19NT0RFKSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIChjdXJyZW50ID8gXCJvblwiIDogXCJvZmZcIikpO1xuICByZXR1cm4gKGN1cnJlbnQgfHwgMCk7XG59O1xuXG4vLyBnZXQgR0EgY2xpZW50IGlkIHVzaW5nIGdhLmdldEFsbCgpXG5leHBvcnQgY29uc3QgZ2V0R2FDbGllbnRJZCA9ICgpID0+IHtcbiAgY29uc3QgZ2EgPSB3aW5kb3cuZ2E7XG4gIC8vIGlmIGdhIGFuZCBnYS5nZXRBbGwoKSBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIG51bGxcbiAgaWYgKGdhICYmIGdhLmdldEFsbCkge1xuICAgIGNvbnN0IHRyYWNrZXJzID0gZ2EuZ2V0QWxsKCk7XG4gICAgaWYgKHRyYWNrZXJzICYmIHRyYWNrZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRyYWNrZXJzWzBdLmdldChcImNsaWVudElkXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIGdldCBkZXRlcm1pbmlzdGljIG51bWVyaWMgaGFzaCBmcm9tIHN0cmluZyB0aGF0IGNvbmF0aW5zIG9ubHkgbnVtYmVyc1xuZXhwb3J0IGNvbnN0IGdldFVuc2VjdXJlSGFzaCA9IChzdHIpID0+IHtcbiAgbGV0IGhhc2ggPSAwO1xuICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICB9XG4gIC8vIHJldHVybiBhYnNvbHV0ZSB2YWx1ZVxuICByZXR1cm4gTWF0aC5hYnMoaGFzaCk7XG59O1xuXG4vLyBnZW5lcmF0ZSBhIDMyLWJpdCByYW5kb20gaW50ZWdlclxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKTtcbn07XG5cbi8vIGdldCBjdXJyZW50IHVuaXggZXBvY2ggdGltZSBpbiBzZWNvbmRzXG5leHBvcnQgY29uc3QgZ2V0VW5peFRpbWUgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldElkZW50aWZpZXIgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gbG9jYWwgc3RvcmFnZVwiLCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhIGluIGZpcnN0IGF0dGVtcHRcIiwgaWQpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhXCIsIGlkKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IHJlYWQgR0EgY2xpZW50IGlkXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBpbiBnZXRJZGVudGlmaWVyXCIsIGUpO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzKSA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERlbGl2ZXJ5RGF0ZSA9IChkYXRlKSA9PiB7XG4gIGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGRhdGU7XG5cbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHN0YXJ0TW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIGVuZE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBzdGFydERheTogdW5kZWZpbmVkLFxuICAgIGVuZERheTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGxldCBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspLShbXFxcXGRdKylcXFxccz8oW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSA0KSB7XG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFszXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKyktKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5sZW5ndGggIT09IDUpIHJldHVybiBkYXRlO1xuXG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbMl0udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFs0XS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCFyZXN1bHQuc3RhcnRNb250aEluZGV4IHx8ICFyZXN1bHQuZW5kTW9udGhJbmRleCkgcmV0dXJuIGRhdGU7XG5cbiAgICBjb25zdCBzdGFydFllYXIgPSByZXN1bHQuc3RhcnRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG4gICAgY29uc3QgZW5kWWVhciA9IHJlc3VsdC5lbmRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG5cbiAgICBjb25zdCBlc3RpbWF0ZWRTdGFydCA9IG5ldyBEYXRlKHN0YXJ0WWVhciwgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCwgcmVzdWx0LnN0YXJ0RGF5KTtcbiAgICBjb25zdCBlc3RpbWF0ZWRFbmQgPSBuZXcgRGF0ZShlbmRZZWFyLCByZXN1bHQuZW5kTW9udGhJbmRleCwgcmVzdWx0LmVuZERheSk7XG5cblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZFN0YXJ0IC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICBjb25zdCBlbmREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkRW5kIC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJXZWVrcyA9IHN0YXJ0RGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoc3RhcnREaWZmT3ZlckRheXMgLyA3KTtcbiAgICBjb25zdCBlbmREaWZmT3ZlcldlZWtzID0gZW5kRGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoZW5kRGlmZk92ZXJEYXlzIC8gNyk7XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPT09IDApIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gLSAke2VuZERpZmZPdmVyRGF5c30gR8O8bmA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID49IDEpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gR8O8biAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IGVuZERpZmZPdmVyV2Vla3MpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlkbGVUaW1lciA9IGFzeW5jICh0aW1lT3V0LCBjYWxsQmFjaykgPT4ge1xuICBsZXQgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcblxuICB3aW5kb3cudG9wLmRvY3VtZW50Lm9udG91Y2hzdGFydCA9IHJlc2V0VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcbiAgICBjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXQpO1xuICAgIGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyVHlwZSA9ICgpID0+IHtcbiAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9jaHJvbWV8Y2hyb21pdW18Y3Jpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJjaHJvbWVcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3h8Znhpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJmaXJlZm94XCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkpIHtcbiAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL29wclxcLy9pKSkge1xuICAgIHJldHVybiBcIm9wZXJhXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9lZGcvaSkpIHtcbiAgICByZXR1cm4gXCJlZGdlXCI7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc093bk11dGF0aW9uID0gKG11dGF0aW9uTGlzdCkgPT4ge1xuICBjb25zdCBub2RlcyA9IFsuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0ucmVtb3ZlZE5vZGVzKV07XG4gIHJldHVybiBub2Rlcy5zb21lKChuKSA9PiB7XG4gICAgcmV0dXJuIG4udGFnTmFtZSAmJiBBcnJheS5mcm9tKG4uY2xhc3NMaXN0KS5zb21lKChjKSA9PiBjLmluY2x1ZGVzKFwiYm4tXCIpKTtcbiAgfSk7XG59O1xuXG4vLyByZWY6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEyOTMxNjMvMjM0M1xuLy8gVGhpcyB3aWxsIHBhcnNlIGEgZGVsaW1pdGVkIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mXG4vLyBhcnJheXMuIFRoZSBkZWZhdWx0IGRlbGltaXRlciBpcyB0aGUgY29tbWEsIGJ1dCB0aGlzXG4vLyBjYW4gYmUgb3ZlcnJpZGVuIGluIHRoZSBzZWNvbmQgYXJndW1lbnQuXG5mdW5jdGlvbiBjc3ZUb0FycmF5KCBzdHJEYXRhLCBzdHJEZWxpbWl0ZXIgKSB7XG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZGVsaW1pdGVyIGlzIGRlZmluZWQuIElmIG5vdCxcbiAgLy8gdGhlbiBkZWZhdWx0IHRvIGNvbW1hLlxuICBzdHJEZWxpbWl0ZXIgPSAoc3RyRGVsaW1pdGVyIHx8IFwiLFwiKTtcblxuICAvLyBDcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcGFyc2UgdGhlIENTViB2YWx1ZXMuXG4gIGNvbnN0IG9ialBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICAgKFxuICAgICAgLy8gRGVsaW1pdGVycy5cbiAgICAgICAgXCIoXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJ8XFxcXHI/XFxcXG58XFxcXHJ8XilcIiArXG5cbiAgICAgICAgICAgICAgLy8gUXVvdGVkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoPzpcXFwiKFteXFxcIl0qKD86XFxcIlxcXCJbXlxcXCJdKikqKVxcXCJ8XCIgK1xuXG4gICAgICAgICAgICAgIC8vIFN0YW5kYXJkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoW15cXFwiXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJcXFxcclxcXFxuXSopKVwiXG4gICAgICApLFxuICAgICAgXCJnaVwiLFxuICApO1xuXG5cbiAgLy8gQ3JlYXRlIGFuIGFycmF5IHRvIGhvbGQgb3VyIGRhdGEuIEdpdmUgdGhlIGFycmF5XG4gIC8vIGEgZGVmYXVsdCBlbXB0eSBmaXJzdCByb3cuXG4gIGNvbnN0IGFyckRhdGEgPSBbW11dO1xuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBpbmRpdmlkdWFsIHBhdHRlcm5cbiAgLy8gbWF0Y2hpbmcgZ3JvdXBzLlxuICBsZXQgYXJyTWF0Y2hlcyA9IG51bGw7XG5cblxuICAvLyBLZWVwIGxvb3Bpbmcgb3ZlciB0aGUgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXNcbiAgLy8gdW50aWwgd2UgY2FuIG5vIGxvbmdlciBmaW5kIGEgbWF0Y2guXG4gIHdoaWxlIChhcnJNYXRjaGVzID0gb2JqUGF0dGVybi5leGVjKCBzdHJEYXRhICkpIHtcbiAgICAvLyBHZXQgdGhlIGRlbGltaXRlciB0aGF0IHdhcyBmb3VuZC5cbiAgICBjb25zdCBzdHJNYXRjaGVkRGVsaW1pdGVyID0gYXJyTWF0Y2hlc1sxXTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZ2l2ZW4gZGVsaW1pdGVyIGhhcyBhIGxlbmd0aFxuICAgIC8vIChpcyBub3QgdGhlIHN0YXJ0IG9mIHN0cmluZykgYW5kIGlmIGl0IG1hdGNoZXNcbiAgICAvLyBmaWVsZCBkZWxpbWl0ZXIuIElmIGlkIGRvZXMgbm90LCB0aGVuIHdlIGtub3dcbiAgICAvLyB0aGF0IHRoaXMgZGVsaW1pdGVyIGlzIGEgcm93IGRlbGltaXRlci5cbiAgICBpZiAoXG4gICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyLmxlbmd0aCAmJlxuICAgICAgICAgICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyICE9PSBzdHJEZWxpbWl0ZXJcbiAgICApIHtcbiAgICAgIC8vIFNpbmNlIHdlIGhhdmUgcmVhY2hlZCBhIG5ldyByb3cgb2YgZGF0YSxcbiAgICAgIC8vIGFkZCBhbiBlbXB0eSByb3cgdG8gb3VyIGRhdGEgYXJyYXkuXG4gICAgICBhcnJEYXRhLnB1c2goIFtdICk7XG4gICAgfVxuXG4gICAgbGV0IHN0ck1hdGNoZWRWYWx1ZTtcblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIGRlbGltaXRlciBvdXQgb2YgdGhlIHdheSxcbiAgICAvLyBsZXQncyBjaGVjayB0byBzZWUgd2hpY2gga2luZCBvZiB2YWx1ZSB3ZVxuICAgIC8vIGNhcHR1cmVkIChxdW90ZWQgb3IgdW5xdW90ZWQpLlxuICAgIGlmIChhcnJNYXRjaGVzWzJdKSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIHF1b3RlZCB2YWx1ZS4gV2hlbiB3ZSBjYXB0dXJlXG4gICAgICAvLyB0aGlzIHZhbHVlLCB1bmVzY2FwZSBhbnkgZG91YmxlIHF1b3Rlcy5cbiAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbMl0ucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKCBcIlxcXCJcXFwiXCIsIFwiZ1wiICksXG4gICAgICAgICAgXCJcXFwiXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIG5vbi1xdW90ZWQgdmFsdWUuXG4gICAgICBzdHJNYXRjaGVkVmFsdWUgPSBhcnJNYXRjaGVzWzNdO1xuICAgIH1cblxuXG4gICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBvdXIgdmFsdWUgc3RyaW5nLCBsZXQncyBhZGRcbiAgICAvLyBpdCB0byB0aGUgZGF0YSBhcnJheS5cbiAgICBhcnJEYXRhW2FyckRhdGEubGVuZ3RoIC0gMV0ucHVzaCggc3RyTWF0Y2hlZFZhbHVlICk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBhcnNlZCBkYXRhLlxuICByZXR1cm4gKCBhcnJEYXRhICk7XG59XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVcIixcbiAgdmVyc2lvbjogMSxcbiAgbWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudDogMTAwMCwgLy8gYWZmZWN0cyB2ZXJzaW9uXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJkYXRhXCIsXG4gICAgaW5kZXhlczogW3tcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJkYXRhX3ZhbHVlXCIsIFwic2Vzc2lvbl9pZFwiXSxcbiAgICB9XSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJpZFwiLCBhdXRvSW5jcmVtZW50OiB0cnVlfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5pbXBvcnQge2dldEJyb3dzZXJUeXBlfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyXCIpO1xuY29uc3QgX3dpbmRvdyA9IHtcbiAgYWxsdGltZTogXCJhbGx0aW1lXCIsIHNlc3Npb246IFwic2Vzc2lvblwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gaW5pdGlhbGl6ZWQgZGIgd2l0aDogXCIsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIC8vIFRPRE8sIHVuY29tbWVudCBuZXh0IGxpbmUgb25jZSBleGlzdGluZyBzdGFsZSBkYnMgYXJlIHB1cmdlZFxuICAgIC8vIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSk7XG4gICAgaWYgKCFvcGVuUmVxdWVzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW5kZXhlZGRiIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgb3BlblJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcGVuUmVxdWVzdC5yZXN1bHQuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gb3BlblJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBpbmRleGVkIERCXCIsIG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gICAgICBpZiAoZGIudmVyc2lvbiAhPT0gMSkge1xuICAgICAgICAvLyBUT0RPLCByZW1vdmUgZGVsZXRlIHJlcXVlc3Qgb25jZSBleGlzdGluZyBzdGFsZSBkYnMgYXJlIHB1cmdlZFxuICAgICAgICBjb25zdCBkZWxldGVSZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShjb25maWcuZGJOYW1lKTtcbiAgICAgICAgZGVsZXRlUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgdGhpcy5pbmRleGVkREIgPSBkYjtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKGRhdGFOYW1lLCBkYXRhVmFsdWUpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHNlc3Npb25JZCA9IHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpOyAvLyBkYXRlIGN1cnJlbnQgLTIgc2FhdCAgeWlsLWF5LWd1blxuICAgIGNvbnN0IHRpbWUgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XCJkYXRhX25hbWVcIjogZGF0YU5hbWUsIFwiZGF0YV92YWx1ZVwiOiBkYXRhVmFsdWUsIFwic2Vzc2lvbl9pZFwiOiBzZXNzaW9uSWQsIHRpbWV9O1xuICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgfVxuXG4gIG1pbm1heChkYXRhTmFtZSwgb3AsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgc3RvcmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdG9yZWQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtaW5cIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPCBzdG9yZWQpIHx8XG4gICAgICAgICAgICAgICAgKG9wID09PSBcIm1heFwiICYmIHZhbHVlW1wiZGF0YV92YWx1ZVwiXSA+IHN0b3JlZClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVkID0gdmFsdWVbXCJkYXRhX3ZhbHVlXCJdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3JlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtaW4oZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtaW5cIiwgd2luZG93KTtcbiAgfVxuXG4gIG1heChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWlubWF4KGRhdGFOYW1lLCBcIm1heFwiLCB3aW5kb3cpO1xuICB9XG5cbiAgZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoIW1hcC5oYXModmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSkgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIDApO1xuICAgICAgICAgICAgICBtYXAuc2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSwgbWFwLmdldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKG1hcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBtb2RlKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncm91cEJ5KGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGlmIChkYXRhLmtleXMoKS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWF4ID0ge25hbWU6IHVuZGVmaW5lZCwgdmFsdWU6IC0xfTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGlmIChtYXgudmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBtYXgubmFtZSA9IGtleTtcbiAgICAgICAgbWF4LnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heDtcbiAgfVxuXG4gIGNvdW50KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3VtKGRhdGFOYW1lLCB3aW5kb3cgPSBcImFsbHRpbWVcIikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSAwLjAwO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRvdGFsICs9IHBhcnNlRmxvYXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodG90YWwudG9GaXhlZCgyKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUsIGRhdGFWYWx1ZSA9IHVuZGVmaW5lZCkge1xuICAgIGlmIChkYXRhVmFsdWUpIHtcbiAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZV0pKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleFZhbHVlID0gZ2V0QnJvd3NlclR5cGUoKSA9PT0gXCJzYWZhcmlcIiA/IGRhdGFOYW1lIDogW2RhdGFOYW1lXTtcblxuICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpXG4gICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoaW5kZXhWYWx1ZSkpO1xuICB9XG5cbiAgYXN5bmMgYXZnKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCB0b3RhbCA9IGF3YWl0IHRoaXMuc3VtKGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5jb3VudChkYXRhTmFtZSwgd2luZG93KTtcblxuICAgIGlmICghdG90YWwgfHwgIWNvdW50KSByZXR1cm4gMDtcblxuICAgIHJldHVybiAodG90YWwgLyBjb3VudCkudG9GaXhlZCgyKTtcbiAgfVxuXG4gIGFzeW5jIGxhc3QoZGF0YU5hbWUsIHNpemUgPSAxLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVcIikub3BlbkN1cnNvcihbZGF0YU5hbWVdLCBcInByZXZcIik7XG4gICAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICAgIGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgICAub3BlbkN1cnNvcihbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpXSwgXCJwcmV2XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGN1cnNvci5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IHNpemUpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTZXNzaW9uSWQoKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgZC5zZXRIb3VycyhkLmdldEhvdXJzKCkgLSAyKTtcblxuICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArXG4gICAgICAoZC5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIikgKyBcIi1cIiArXG4gICAgICBkLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IENvbGxlY3RvckFwaSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb24vYXBpXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZURhdGFDb2xsZWN0aW9uXCIpO1xuY29uc3QgY29sbGVjdG9yQXBpID0gbmV3IENvbGxlY3RvckFwaSgpO1xuXG4vLyBrZWVwIGEgdGFibGUgaW4gaW5kZXhkYiB0aGUgZm9ybWF0IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIGRhdGFfdmFsdWUsIHN0b3JlZF92YWx1ZV1cblxuZXhwb3J0IGNvbnN0IHF1ZXJ5SW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdyk7XG4gIGlmICghY29sbGVjdG9yQXBpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkluZGV4ZWREQiBubyBzdXBwb3J0ZWQvSW5pdGlhbGl6ZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB3aW5kb3cgY2FuIGJlIGVpdGhlciBzYW1lZGF5IG9yIGFsbHRpbWVcblxuICBpZiAocXVlcnlNZXRob2QgPT09IFwibWluXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubWluKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1heFwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1heChiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJhdmdcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5hdmcoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiY2RcIikge1xuICAgIHJldHVybiAoYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpKS5zaXplO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImN2XCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuXG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBjb3VudCArPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1vZGVcIikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb2xsZWN0b3JBcGkubW9kZShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gZGF0YS5uYW1lO1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kLmluZGV4T2YoXCJsYXN0XCIpID49IDApIHtcbiAgICBjb25zdCBtYXRjaCA9IHF1ZXJ5TWV0aG9kLm1hdGNoKFwibGFzdFxcXFwoKFtcXFxcZF0rKVxcXFwpXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgIW1hdGNoLmxlbmd0aCA9PT0gMiB8fCBwYXJzZUludChtYXRjaFsxXSkgPCAxICkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLmxhc3QoYmFzZUZlYXR1cmVOYW1lLCBtYXRjaFsxXSwgd2luZG93KTtcbiAgICBjb25zdCBkYXRhVmFsdWVzID0gcXVlcnlQcm9taXNlLm1hcCgob2JqKSA9PiBvYmouZGF0YV92YWx1ZSk7XG4gICAgcmV0dXJuIGRhdGFWYWx1ZXM7XG4gIH1cblxuICAvKipcbiAgICB7XCJMaXN0aW5ncGFnZVwiID0+IDIxfVxuICAgIHtcIkhvbWVwYWdlXCIgPT4gMTJ9XG4gICAgLS0gZXhhbXBsZSB3aWxsIGhhdmU6XG4gICAgbW9kZTogTGlzdGluZ3BhZ2VcbiAgICBjZDogMlxuICAgIGN2OiAyMSsxMlxuICAgIGxhc3QoMykgKG4sIG4tMSwgbi0yKVxuICAqL1xuXG4gIC8vIDEwMDBsaWsgdGVtaXpsZW5lY2VrIChtYWludE9wQ291bnQgLT4gdmVyc2lvbilcblxuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJtb2RlXCIsIFwiY2RcIiAoY291bnQgZGlzdGludCkgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzXG4gIC8vIHF1ZXJ5TWV0aG9kIGNhbiBiZSBcImN2XCIgKHN1bSBvZiBjb3VudCB2YWx1ZXMpLCBcImN1cnJlbnRcIiwgb3IgXCJwcmV2XCIgZm9yIGFueSBkYXRhIHR5cGUgKHN0b3JlZCB2aWEgbGFzdClcbiAgbG9nZ2VyLmZhaWxlZChgdW5rbm93biBxdWVyeU1ldGhvZD0ke3F1ZXJ5TWV0aG9kfSBpbiBCZWFnbGVEYXRhQ29sbGVjdGlvbmApO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCkgPT4ge1xuICBsb2dnZXIubG9nKFwidXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXdhaXQgY29sbGVjdG9yQXBpLnNhdmUoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKTtcblxuXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJtaW5cIiwgXCJtYXhcIiwgXCJjbnRcIiwgXCJzdW1cIiBmb3IgbnVtZXJpYyBkYXRhIHR5cGVzLCBtaW4tbWF4IGNvbXBhcmVzIHdpdGggb25seSBleGlzdGluZywgYXZnIHVwZGF0ZXMgY250IGFuZCBzdW1cbiAgLy8gLS0+IG1pbjogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtaW5cIiwgKGxlYXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gbWF4OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcIm1heFwiLCAoZ3JlYXRlc3Qgb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBzdW06IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwic3VtXCIsIChzdW0gb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBjbnQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY250XCIsIChleGlzdGluZyArIDEpXVxuICAvL1xuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwiY291bnRfdmFsdWVzXCIgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzLCBrZWVwIGEgY291bnRlciBmb3IgZWFjaCB2YWx1ZVxuICAvLyAtLT4gY291bnRfdmFsdWVzOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImxhc3RcIiBmb3IgYW55IGRhdGEgdHlwZSAtLT4ga2VlcHMgMiB2YWx1ZXMgZm9yIGN1cnJlbnQgYW5kIHRoZSBwcmV2aW91c1xuICAvLyBkZWxldGU6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBtb3ZlOiBleGlzdGluZyBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGV4aXN0aW5nIHZhbHVlKV0gLS0+IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBwdXQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY3VycmVudFwiLCAoaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2Zvcm1hdERlbGl2ZXJ5RGF0ZSwgaXNPd25NdXRhdGlvbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTLCBTUExJVF9SQVRJTywgVkVSU0lPTn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBfX2h3bTogMCxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJcIik7XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5jb25zdCBzZWFyY2hQYXRocyA9IFtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHQSBEYXRhIExheWVyIFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlBhZ2VUeXBlXCIsIG5hbWU6IFwiUGFnZVR5cGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwidXBwZXJDYXNlVFJcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5kZXRhaWwuYWN0aW9uRmllbGQubGlzdFwiLCBuYW1lOiBcInBkcC5saXN0YWxpYXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5kaXNjb3VudFJhdGVcIiwgbmFtZTogXCJwZHAuZGlzY291bnRSYXRlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInNlYXJjaF9zdWNjZXNzXCIsIG5hbWU6IFwicGxwLnNlYXJjaFN1Y2Nlc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuaWRcIiwgXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBcInBscC5uYW1lXCIsIFwicGxwLmdyb3VwXCIsIFwicGxwLmNsYXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJMaXN0aW5ncGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtbWFpbi1kZXRhaWxzXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZW1wdHlfYmFza2V0X3RleHRcXFwiXVwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC50b3RhbEJhc2VQcmljZVwiLCBcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltpZCo9XFxcImNhcnRfcXVhbnRpdHlcXFwiXSwgW2NsYXNzKj1cXFwiYmFza2V0X2xlbmd0aFxcXCJdXCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LXRpdGxlXFxcIl0sIFtjbGFzcyo9XFxcImhlYWRlci1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByb2R1Y3Qtc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgb2JzZXJ2ZXI6IFwibGlzdGluZ0l0ZW1CbG9ja1wiLCBuYW1lOiBcIl9fbGlzdGluZ0l0ZW1CbG9ja09ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgb2JzZXJ2ZXI6IFwiY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG9ic2VydmVyOiBcImNoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF9zdW1tYXJ5X3RvdGFsXFxcIl0sIFtjbGFzcyo9XFxcInRvdGFsX3Jvd1xcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlcl9mb2xsb3dfbnVtYlxcXCJdLCBbY2xhc3MqPVxcXCJjYXJ0LXRpdGxlLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucGF5bWVudF90eXBlX3RpdGxlLCAuY2FydC10aXRsZS1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdF9za3VfY29kZVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU09SRyBFbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1wblwiLCBuYW1lOiBcInBkcC5tcG5cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJuYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJKU09ORmlsdGVyT3RoZXJcIiwgdmFsdWU6IFwiQHR5cGU9UHJvZHVjdFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiaXRlbUxpc3RFbGVtZW50LioubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiYnJlYWRjcnVtYi5pdGVtTGlzdEVsZW1lbnQuKi5pdGVtLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBXaW5kb3cgY3VzdG9tIGVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJmYXZvcml0ZVByb2R1Y3RzXCIsIG5hbWU6IFwidmlldy5mYXZvcml0ZWRNUE5zXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcInRvU3RyaW5nXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXTtcblxuY29uc3QgZmVhdHVyZUVuZ2luZWVyaW5nT3BzID0ge1xuICBcInZpZXdfZXBvY2hcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibWluXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtaW5cIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS52aWV3X2Vwb2NoX21pblwifSxcbiAgXSxcbiAgXCJQYWdlVHlwZVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImN2XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcImFsbHRpbWVcIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9hbGx0aW1lXCJ9LFxuICBdLFxuICBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMubGFzdENhcnRDb3Vwb25BcHBsaWNhYmxlXCJ9LFxuICBdLFxuICBcInBkcC5jYXRlZ29yeVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtb2RlXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X21vZGVfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9sYXN0X3Nlc3Npb25cIn0sXG4gIF0sXG4gIFwiY2FydC5za3VzXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIn0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00gPSAoKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmZvTGF5ZXIuX19od20gKz0gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUb0JlYWdsZUluZm9MYXllciA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gaWYgdmFsdWUgaXMgc3RyaW5nLCBhZGQgYXMgYSBjbGVhbiBzdHJpbmcsIGlmIG9iamVjdCBhZGQgdGhlIHNhbWVcbiAgY29uc3QgdHlwZWRWYWx1ZSA9IHR5cGVvZiAodmFsdWUpID09PSBcInN0cmluZ1wiID8gdmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiB2YWx1ZTtcbiAgLy8gaWYga2V5IGNvbnRhaW5zIC4gY3JlYXRlIG5lc3RlZCBvYmplY3RcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgb2JqW2tleV0gPSB7fTtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIG9ialtsYXN0S2V5XSA9IHR5cGVkVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaW5mb0xheWVyW2tleV0gPSB0eXBlZFZhbHVlO1xuICB9XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBpZiAodHlwZWRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVkVmFsdWUgIT09IG51bGwpIHtcbiAgICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgdHlwZWRWYWx1ZSk7XG4gICAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCB0eXBlZFZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgREFUQV9MSVNURU5FUlMgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGFkZERhdGFMaXN0ZW5lciA9IChrZXksIGxpc3RlbmVyKSA9PiB7XG4gIGlmICghREFUQV9MSVNURU5FUlNba2V5XSkge1xuICAgIERBVEFfTElTVEVORVJTW2tleV0gPSBbXTtcbiAgfVxuICBEQVRBX0xJU1RFTkVSU1trZXldLnB1c2gobGlzdGVuZXIpO1xufTtcblxuY29uc3QgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBEQVRBX0xJU1RFTkVSU1trZXldO1xuICBpZiAobGlzdGVuZXJzICYmIEFycmF5LmlzQXJyYXkobGlzdGVuZXJzKSAmJiBsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsb2dnZXIubG9nKGBwYXNzVmFsdWVUb0xpc3RlbmVycyAtLT4gdmFsdWUgJHt2YWx1ZX0gdG8gbGlzdGVuZXIgJHtpfSBvZiBrZXkgJHtrZXl9YCk7XG4gICAgICAgIGxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICAvLyBUT0RPOiBjaGVjayBmZWF0dXJlRW5naW5lZXJpbmcgYW5kIHNlYXJjaCBsaXN0IGlmIGFsbCBtYXJrZWQgYXMgZm91bmQgYnV0IHZhbHVlIGlzIG1pc3NpbmdcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHJldHVybiBudWxsIGlmIGtleSBpcyBtaXNzaW5nIG9yIG5vdCBhbiBhcnJheSBvciBoYXMgbm8gZWxlbWVudHNcbiAgaWYgKCFrZXkpIHJldHVybiBudWxsO1xuICBsZXQgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXlcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9idGFpbkRhdGEpO1xuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gICAgICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleSwgY2xlYXIgaW50ZXJ2YWwgYW5kIHJlc29sdmVcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAgICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHBvbGxJbnRlcnZhbCk7XG4gICAgICAvLyBhZGQgdGltZW91dFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfSwgdGltZW91dCk7IC8vIHdhaXQgYmxvY2tpbmcgZm9yIFwidGltZW91dFwiIG1zZWNzXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyByZW1vdmUga2V5IGZyb20gaW5mb0xheWVyXG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIHJldHVybjtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIGxvZ2dlci5sb2coXCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyXCIsIGBSZW1vdmluZyAke2xhc3RLZXl9IGZyb20gJHtKU09OLnN0cmluZ2lmeShvYmopfWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgbnVsbCk7XG4gIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgbnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVHJlYXRtZW50ID0gKGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgc3RhdHVzLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gbnVsbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlSWQgIT09IHVuZGVmaW5lZCkgdmFsdWUuYnVzaW5lc3NSdWxlSWQgPSBidXNpbmVzc1J1bGVJZDtcbiAgaWYgKHZhcmlhbnQpIHZhbHVlLnZhcmlhbnQgPSB2YXJpYW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNraXBwZWRcIjpcbiAgICAgIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuICAgICAgaW5mb0xheWVyLmVbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICBpbmZvTGF5ZXIuZltpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG59O1xuXG5jb25zdCBQQVJTRVNFQVJDSE1BWFJFVFJZID0gMTA7XG5jb25zdCBQQVJTRVNFQVJDSFNUQVJUREVMQVkgPSAxMDtcbmxldCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgPSBhc3luYyAoKSA9PiB7XG4gIC8vIENvbGxlY3QgY29yZSBkYXRhXG4gIHByZXBhcmVDb3JlRGF0YSgpO1xuXG4gIC8vIFRyaWdnZXItc3RhcnQgdGhlIHBhcnNlciBsb29wXG4gIHBhcnNlckNhbGxlcigpO1xuXG4gIC8vIEFkZCBtZXRyaWNzXG4gIGFkZE1ldHJpY3MoKTtcbn07XG5cbmNvbnN0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJhc2VGZWF0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlRW5naW5lZXJpbmdPcHMpO1xuICBmb3IgKGNvbnN0IGJhc2VGZWF0dXJlTmFtZSBvZiBiYXNlRmVhdHVyZU5hbWVzKSB7XG4gICAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gICAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcHJvY2Vzc0Zvcm1hdHRlciA9ICh2YWx1ZSwgZm9ybWF0dGVyKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFmb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKGZvcm1hdHRlcikge1xuICAgIGNhc2UgXCJ1cHBlckNhc2VUUlwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoXCJ0ci1UUlwiKTtcbiAgICBjYXNlIFwiZm9ybWF0RGVsaXZlcnlEYXRlXCI6XG4gICAgICByZXR1cm4gZm9ybWF0RGVsaXZlcnlEYXRlKHZhbHVlKTtcbiAgICBjYXNlIFwibnVtZXJpY09ubHlcIjpcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgY2FzZSBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZShcInRyLVRSXCIpLnNwbGl0KFwiIFwiKVswXTtcbiAgICBjYXNlIFwiZGVhcnJheVwiOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJ0b1N0cmluZ1wiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaE9iaiA9IChvYmosIHNlYXJjaEVsZW1lbnQpID0+IHtcbiAgbGV0IHZhbHVlO1xuICBsZXQgbGF5ZXJWYWx1ZTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoc2VhcmNoRWxlbWVudC5vcGVyYW5kKSB7XG4gICAgICBjYXNlIFwiSlNPTkZpbHRlck90aGVyXCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJQYXJhbXMgPSBzZWFyY2hFbGVtZW50LnZhbHVlLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBpZiAoZmlsdGVyUGFyYW1zLmxlbmd0aCAhPT0gMikgYnJlYWs7XG4gICAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IGZpbHRlclBhcmFtc1swXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlclBhcmFtc1sxXTtcbiAgICAgICAgICBpZiAoIWZpbHRlck5hbWUgfHwgIWZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoID0ganNvbkdldChvYmosIGZpbHRlck5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXRjaCB8fCBmaWx0ZXJNYXRjaCAhPT0gZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgaWYgKHZhbHVlICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeU9ic2VydmVcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICBjb25zdCB0b0JlVXBkYXRlZCA9IFtdO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzZWFyY2hQYXRocy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgLy8gYWRkIGNoaWxkRWxlbWVudHMgaW50byB0b0JlVXBkYXRlZFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQucHVzaCguLi5jaGlsZEVsZW1lbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBydW4gb25seSBpZiB0aGUgZWxlbWVudCBoYXMgYWRkZWQgb3IgcmVtb3ZlZCBjaGlsZHJlblxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgZnVuY3Rpb24obXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgICAgaWYgKGlzT3duTXV0YXRpb24obXV0YXRpb25MaXN0KSkgcmV0dXJuO1xuICAgICAgICAgICAgdG9CZVVwZGF0ZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50LmlzRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllcihlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyUmVzdGFydCA9IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA+PSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyUmVzdGFydCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwic2VhcmNoT2JqOiB0cmlnZ2VyZWQgYSByZXN0YXJ0IG9mIHNlYXJjaHBhdGhzIGR1ZTogXCIsIHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIHBhcnNlckNhbGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodmFsdWUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUlubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgYXR0cmliVmFsdWVMaXN0ID0gW107XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSB2YWx1ZWNoaWxkLmdldEF0dHJpYnV0ZShzZWFyY2hFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZSkge1xuICAgICAgICAgICAgICBhdHRyaWJWYWx1ZUxpc3QucHVzaChhdHRyaWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYlZhbHVlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXR0cmliVmFsdWVMaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHNldFZhbHVlID0gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZXRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5Q291bnRFbHRzXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2VhcmNoRWxlbWVudC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGxldCBzdW1QcmljZSA9IDA7XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgc3VtUHJpY2UrPXBhcnNlSW50KGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdW1QcmljZSA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBzdW1QcmljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGFycmF5SW5uZXJUZXh0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhcnJheUlubmVyVGV4dC5wdXNoKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUlubmVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXJyYXlJbm5lclRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9IC8vIHN3aXRjaFxuXG4gICAgaWYgKGxheWVyVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBsYXllclZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpIHtcbiAgICAgICAgbGF5ZXJWYWx1ZSA9IHByb2Nlc3NGb3JtYXR0ZXIobGF5ZXJWYWx1ZSwgc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpO1xuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoc2VhcmNoRWxlbWVudC5uYW1lLCBsYXllclZhbHVlKTtcbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG5cbiAgICAgIC8vIG1hcmsgZXhjbHVzaXZlIGVsZW1lbnRzIGFzIGZvdW5kXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSkgJiYgc2VhcmNoRWxlbWVudC5leGNsdXNpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZUVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUuaW5jbHVkZXMoZXhjbHVzaXZlRWxlbWVudC5uYW1lKSkge1xuICAgICAgICAgICAgZXhjbHVzaXZlRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwic2VhcmNoT2JqIGVycm9yOiBcIiArIGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGN1c3RvbURhdGFEZXJpdmF0aW9ucyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUsIDUwLCAxMDAwKTtcblxuICB0cnkge1xuICAgIC8vIGNhcnQgdG90YWwgcHJvZHVjdCBwcmljZSBpcyBub3QgYXZhaWxhYmxlIGFueXdoZXJlLCBzcGVjaWFsIGRpc2NvdW50cyBldGMgYXJlIGhhcmQgdG8gc2NyYXBlLCBzbyByZWNhbGN1bGF0ZSBpdFxuICAgIGNvbnN0IFtpc0NhcnRFbXB0eSwgdG90YWxCYXNlUHJpY2UsIGNvdXBvbk5vdEFwcGxpY2FibGUsIHByaWNlcywgcXVhbnRpdGllc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5pc2VtcHR5XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxCYXNlUHJpY2VcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucHJpY2VzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucXVhbnRpdGllc1wiKSxcbiAgICBdKTtcblxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcblxuICAgIGlmICghdG90YWxCYXNlUHJpY2UgJiYgcHJpY2VzICYmIEFycmF5LmlzQXJyYXkocHJpY2VzKSAmJiBwcmljZXMubGVuZ3RoID4gMCAmJiBxdWFudGl0aWVzICYmIEFycmF5LmlzQXJyYXkocXVhbnRpdGllcykgJiYgcXVhbnRpdGllcy5sZW5ndGggPiAwICYmIHByaWNlcy5sZW5ndGggPT09IHF1YW50aXRpZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbFByaWNlICs9IHBhcnNlSW50KHByaWNlc1tpXSkgKiBwYXJzZUludChxdWFudGl0aWVzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxQcmljZSA9IHBhcnNlSW50KHRvdGFsQmFzZVByaWNlKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlICYmIGNvdXBvbk5vdEFwcGxpY2FibGUpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSB0b3RhbFByaWNlIC0gcGFyc2VJbnQoY291cG9uTm90QXBwbGljYWJsZSk7XG4gICAgfSBlbHNlIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHBhcnNlSW50KHRvdGFsUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIiwgY291cG9uQXBwbGljYWJsZUFtb3VudCk7XG5cbiAgICBpZiAoaXNDYXJ0RW1wdHkpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbFByaWNlXCIsIDApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiY3VzdG9tRGF0YURlcml2YXRpb25zIGNhbm5vdCBjb21wdXRlIGNvdXBvbkFwcGxpY2FibGVQcmljZTogXCIgKyBlKTtcbiAgfVxuXG4gIC8vIFByb2R1Y3QgcGFnZSAtLT4gdHJhbnNmZXIgc2t1cyB0byBzaW5nbGUgbG9jYXRpb25cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJQcm9kdWN0cGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIik7XG4gICAgaWYgKHNrdSE9PW51bGwgJiYgc2t1IT09dW5kZWZpbmVkKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBbc2t1XSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJiYXNrZXRcIikge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5za3VzXCIpO1xuICAgIGlmIChza3VMaXN0IT09bnVsbCAmJiBBcnJheS5pc0FycmF5KHNrdUxpc3QpICYmIHNrdUxpc3QubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBza3VMaXN0KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHBhcnNlU2VhcmNoUGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRvbVN0YXR1cyA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIC8vIGNoZWNrIGlmIGRvY3VtZW50IGFuZCBkb20gaXMgbG9hZGVkIGFuZCByZWFkeSBmb3Igc2NyYXBwaW5nXG4gIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGluaXRpYWxpemVkIHdpdGggZG9tIHN0YXR1czogIFwiICsgZG9tU3RhdHVzKTtcblxuICBjb25zdCB3aW50b3AgPSB3aW5kb3cudG9wO1xuICBjb25zdCBkYXRhTGF5ZXIgPSB3aW50b3AuZGF0YUxheWVyO1xuICBjb25zdCB3aW5kb2MgPSB3aW50b3AuZG9jdW1lbnQ7XG4gIGxldCBzb3JnQXJyYXlJbm5lcjtcblxuICBjb25zdCBmb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBwcmV2Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgbm90Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcblxuICAvLyBQYWdlVHlwZSBjYW4gYmUgaW5mZXJyZWQgZnJvbSBVUkwsIGlmIGZvdW5kIHVzZSBpdCBmcm9tIHRoZXJlXG4gIGxldCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG5cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSkge1xuICAgIHByZXZGb3VuZE5hbWVzLmFkZChcIlBhZ2VUeXBlXCIpO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHNlYXJjaCBsaXN0cyBhbmQgbWFyayBmb3VuZCBuYW1lc1xuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICBwcmV2Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChmb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpIHx8IHByZXZGb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAvLyBoYWQgYWxyZWFkeSBmb3VuZCB0aGlzIGVsZW1lbnQgb24gYW5vdGhlciBwYXJzZSBpdGVtXG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQgIT09IFwiKlwiKSB7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG4gICAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZC5pbmRleE9mKGN1cnJlbnRQYWdlVHlwZSkgPCAwKSB7XG4gICAgICAgIC8vIHNraXAgc2VhcmNoRWxlbWVudCBiZWNhdXNlIG9mIFBhZ2VUeXBlRGVwZW5kXG4gICAgICAgIHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiU2luZ2xlV1RcIikgeyAvLyBTQ0FOIFdpbmRvdyBmb3IgU2luZ2xlIEVsZW1lbnRzXG4gICAgICBzZWFyY2hBbmRTZXQod2ludG9wLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkdBRGF0YUxheWVyXCIpIHsgLy8gU0NBTiBHQSBEQVRBIExBWUVSXG4gICAgICBmb3IgKGNvbnN0IGRhdGFMYXllckl0ZW0gb2YgZGF0YUxheWVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChkYXRhTGF5ZXJJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1NvcmdcIikgeyAvLyBTQ0FOIFNPUkcgQVJSQVlcbiAgICAgIGlmICghc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc29yZ0FycmF5SW5uZXIgPSBnZXRTT1JHQXJyYXkoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgc29yZ0l0ZW0gb2Ygc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KHNvcmdJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1F1ZXJ5XCIpIHsgLy8gU0NBTiBET0NVTUVOVFxuICAgICAgc2VhcmNoQW5kU2V0KHdpbmRvYywgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSAvLyBET0NRVUVSWSBwYXJzZVxuICB9XG5cbiAgaWYgKG5vdEZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgZm91bmQgYWxsIGVsZW1lbnRzIC0gc2V0dGluZyByZXRyeSB0byBtYXhcIik7XG4gIH0gZWxzZSBpZiAoZm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgLy8gdXBkYXRlIHJldHJ5IGNvdW50ZXIgYW5kIGRlbGF5IG9ubHkgaWYgZG9tIGlzIGFjdGl2ZVxuICAgIGlmIChkb21TdGF0dXMgPT09IFwiY29tcGxldGVcIiB8fCBkb21TdGF0dXMgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICo9IDI7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKz0gMTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQgYnV0IG5vdCBmb3VuZCBhbnksIHNldHRpbmcgZGVsYXkgYW5kIHJldHJ5IHRvIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwiIGFuZCBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKyBcIiBmb3Igbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl1cIixcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZDogbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl0gYW5kIGZvdW5kIFwiICtcbiAgICAgIGZvdW5kTmFtZXMuc2l6ZSxcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hBbmRTZXQgPSAob2JqLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKSA9PiB7XG4gIGlmIChzZWFyY2hPYmoob2JqLCBzZWFyY2hFbGVtZW50KSkge1xuICAgIGZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfVxufTtcblxuLy8gcGFyc2Ugc291cmNlXG5jb25zdCBwYXJzZXJDYWxsZXIgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgYXdhaXQgcGFyc2VTZWFyY2hQYXRocygpO1xuICBpZiAocGFyc2VTZWFyY2hQYXRoc1JldHJ5IDwgUEFSU0VTRUFSQ0hNQVhSRVRSWSkge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiBzY2hlZHVsZWQgdG8gYmUgcmVjYWxsZWQgaW4gXCIgKyBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIm1zXCIpO1xuICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCBwYXJzZXJDYWxsZXIoKTtcbiAgICB9LCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkpO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiByZWFjaGVkIG1heCByZXRyeSwgY2FsbGluZyByZW1haW5kZXIgaGlzdG9yaWNhbCBkYXRhXCIpO1xuICAgIGF3YWl0IGN1c3RvbURhdGFEZXJpdmF0aW9ucygpO1xuICAgIGF3YWl0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IoKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSk7XG4gIH1cbn07XG5cbi8vIEV4dHJhY3QgdmFsdWUgZnJvbSBqc29uIG9iamVjdCB1c2luZyBnaXZlbiBwYXRoXG4vLyBJZiBhbiBlbGVtZW50IGlzICosIGNvbmNhdGVuYXRlIHJlY3Vyc2l2ZWx5IGFsbCBzdWItcGF0aCB2YWx1ZXMgYXMgc3RyaW5nXG5jb25zdCBqc29uR2V0ID0gKG9iaiwgcGF0aCkgPT4ge1xuICBpZiAoIW9iaikgcmV0dXJuIG51bGw7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHBhdGhBcnJheVtpXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aCA9IHBhdGhBcnJheS5zbGljZShpICsgMSkuam9pbihcIi5cIik7XG4gICAgICAgIGNvbnN0IHN1YkFycmF5ID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFtzdWJLZXldICE9PSB1bmRlZmluZWQgJiYgY3VycmVudFtzdWJLZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWYWx1ZSA9IGpzb25HZXQoY3VycmVudFtzdWJLZXldLCBzdWJQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdWJWYWx1ZSAhPT0gbnVsbCAmJiBzdWJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN1YkFycmF5LnB1c2goc3ViVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViQXJyYXk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoQXJyYXlbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBwcmVwYXJlQ29yZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IG5hdlB0ciA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I7XG5cbiAgLyogQmVhZ2xlIGRhdGEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2XCIsIFZFUlNJT04pO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNyXCIsIFNQTElUX1JBVElPKTtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5zeXN0ZW1MYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VmVuZG9yXCIsIG5hdlB0ci52ZW5kb3IpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiZmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJiYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGFzdG9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzaWduaW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2NvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfaW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfYWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfbm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic3BlY2lhbF9jYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG59O1xuXG5jb25zdCBhZGRNZXRyaWNzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IHBlcmZNZXRyaWNzID0ge307XG4gIGNvbnN0IHBlcmZOYXZpZ2F0aW9uTWV0cmljcyA9IHdpbmRvd1B0ci5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXTtcbiAgaWYgKHdpbmRvd1B0ci5wZXJmb3JtYW5jZSAmJiBwZXJmTmF2aWdhdGlvbk1ldHJpY3MpIHtcbiAgICBwZXJmTWV0cmljcy5jb25uZWN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLnJlcXVlc3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXNwb25zZUVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXF1ZXN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmRvbSA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUludGVyYWN0aXZlIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUNvbXBsZXRlKTtcbiAgICBwZXJmTWV0cmljcy5sb2FkID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmR1cmF0aW9uKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1ldHJpY3NcIiwgcGVyZk1ldHJpY3MpO1xufTtcblxuLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIFwiZWxlbWVudCBjb2xsZWN0b3JcIiBtb2R1bGUsIHRoZW4gZGF0YSBpcyBleHRyYWN0ZWQgZnJvbSBwcmUtY29sbGVjdGVkIGVsZW1lbnRzXG5jb25zdCBnZXRTT1JHQXJyYXkgPSAoKSA9PiB7XG4gIGNvbnN0IHNjaGVtYU9yZ0VsdHMgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT1cXFwiYXBwbGljYXRpb24vbGQranNvblxcXCJdXCIpO1xuICBjb25zdCBzb3JnQXJyYXkgPSBbXTtcblxuICBmb3IgKGNvbnN0IHNUYWcgb2Ygc2NoZW1hT3JnRWx0cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbnRudCA9IHNUYWcudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBqc29uY29udGVudCA9IEpTT04ucGFyc2UoY250bnQpO1xuICAgICAgc29yZ0FycmF5LnB1c2goanNvbmNvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gc29yZ0FycmF5O1xufTtcbiIsImltcG9ydCB7TE9HX0FQSV9VUkx9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVNb25pdG9yXCIpO1xuY29uc3QgSEVBREVSUyA9IHtcbiAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG59O1xuXG5leHBvcnQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgbW9uaXRvclwiKTtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBhd2FpdGluZyBzY3JhcGluZ1wiKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUsIDUwLCAxMDAwKTtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gc2VuZGluZyBsb2dzXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2VuZCBpbml0aWFsIGxvZyBib2R5IGFuZCBpbmNyZW1lbnRhbCB1cGRhdGUgbG9ncyBvbiBjbG9zZVxuICBhc3luYyBoYW5kbGVDbG9zZUV2ZW50KCkge1xuICAgIC8vIGlmIGluaXRpYWwgbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgc2VuZCB1cGRhdGVzIGFuZCBpbmZvbGF5ZXIgaW4gb25lIGJhdGNoXG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgLy8gaWYgbWFpbiBsb2cgaGFzIGJlZW4gc2VudCwgc2VuZCBpbmNyZW1lbnRhbCB1cGRhdGVzIG9ubHlcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCk7XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVNYWluTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VNYWluTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcXVlc3QgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKSB7XG4gICAgaWYgKCF0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzVXBkYXRlc1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgdGhlcmUgaXMgbm8gaW5jcmVtZW50YWwgeWV0XG4gICAgICAvLyBvciBpZiB0aGUgdXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPSBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9ncyBjaGFuZ2Ugc3RhdHVzOiBcIiwgaGFzQ2hhbmdlZCk7XG4gICAgaWYgKCFoYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICBjb25zdCBsb2dEYXRhID0gYXdhaXQgdGhpcy5wYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCk7XG4gICAgaWYgKGxvZ0RhdGEpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZW5kaW5nIGluY3JlbWVudGFsIGxvZ3NcIiwgbG9nRGF0YSk7XG4gICAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKGxvZ0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUFycml2YWxMb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgb3IgYXJyaXZhbCBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlQXJyaXZhbExvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh3bSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2h3bVwiKTtcbiAgICBpZiAodGhpcy5oaWdoV2F0ZXJNYXJrICE9PSBod20pIHtcbiAgICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMixcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICBhLCBlLCBmLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBwYWdlaGlkZSBldmVudFwiKTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uaXRvcjtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllckNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0RhdGFMYXllclJ1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSwgdHJ1ZSwgMjUsIDEwMDApO1xuICBpZiAocmVzICE9PSBudWxsICYmIHJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoYEZvdW5kIGtleSAke2tleX0gd2l0aCB2YWx1ZSAke3Jlc31gKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGxvZ2dlci5mYWlsZWQoYEtleSAke2tleX0gbm90IGZvdW5kIGluIGJlYWdsZUluZm9MYXllcmApO1xuICByZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRWxlbWVudENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VsZW1lbnRSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZSwgc2VsZWN0b3IsIHNlbGVjdG9yQWxsLCBzZWxlY3RvckZhbGxiYWNrID0gbnVsbH0gPSBydWxlO1xuICBsZXQgbWFpblNlbGVjdG9yID0gc2VsZWN0b3I7XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbWFpblNlbGVjdG9yID0gc2VsZWN0b3JGYWxsYmFjayA/IHNlbGVjdG9yRmFsbGJhY2sgOiBtYWluU2VsZWN0b3I7XG4gIH1cblxuICBpZiAob3BlcmF0b3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcih3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gIH1cbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChzZWxlY3RvckFsbCAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgZWxlbWVudDtcbiAgaWYgKG1haW5TZWxlY3RvcikgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpO1xuICBlbHNlIGlmIChzZWxlY3RvckFsbCkgZWxlbWVudCA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSk7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJ0ZXh0LW51bWJlclwiOiB7XG4gICAgICBsZXQgdGVtcFZhbDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIHRlbXBWYWwgPSBlbGVtZW50LnJlZHVjZSgocmV0dXJuVmFsLCBlbGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuVmFsICs9IHBhcnNlSW50KGVsZW0udGV4dENvbnRlbnQucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBWYWwgPSBwYXJzZUludCh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgLnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwYXJzZUludCh0ZW1wVmFsKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJjbGFzc0xpc3RcIjpcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiY291bnRcIjoge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgJiYgZWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGVsZW1lbnQubGVuZ3RoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigxLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDAsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjYXNlIFwic3R5bGVcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdHlsZUtleSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICBjb25zdCBzdHlsZVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnRTdHlsZXNbc3R5bGVLZXldO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHN0eWxlVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcIk9wZXJhdG9yIG5vdCBkZWZpbmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUZ1bmN0aW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRnVuY3Rpb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgZnVuY3Rpb24gbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHJ1bGVGdW5jdGlvbiA9IEZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gcnVsZUZ1bmN0aW9uKCk7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVNlc3Npb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tTZXNzaW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkdXJhdGlvblwiOlxuICAgICAgcmV0dXJuIGR1cmF0aW9uSGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiaGlzdG9yeVwiOlxuICAgICAgcmV0dXJuIGhpc3RvcnlIYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZ2V0U2Vzc2lvblRpbWVzdGFtcCA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IERhdGUocGFyc2VJbnQod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9USU1FU1RBTVApKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IHNlc3Npb24gdGltZXN0YW1wXCIsIGVycik7XG4gICAgcmV0dXJuIERhdGUubm93KCk7XG4gIH1cbn07XG5cbmNvbnN0IGR1cmF0aW9uSGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gKERhdGUubm93KCkgLSBnZXRTZXNzaW9uVGltZXN0YW1wKCkpIC8gMTAwMDtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZHVyYXRpb24sIGNvbmRpdGlvbiwgcGFyc2VJbnQodmFsdWUpKTtcbn07XG5cbmNvbnN0IGhpc3RvcnlIYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgY3VycmVudEhpc3RvcnkgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX0hJU1RPUlkpPy5zcGxpdChcIixcIik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGN1cnJlbnRIaXN0b3J5LCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXJsQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrVXJsUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInBhdGhcIjoge1xuICAgICAgY29uc3QgcmVxdWVzdFVSTD0gd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmO1xuICAgICAgY29uc3QgcGF0aCA9IG5ldyBVUkwocmVxdWVzdFVSTCkucGF0aG5hbWU7XG4gICAgICBsb2dnZXIubG9nKGBDaGVja2luZyBwYXRoICR7cGF0aH0gbWF0Y2hlcyBydWxlIHBhdGggJHt2YWx1ZX1gKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHBhdGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWX0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRW52Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRW52UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImRldmljZV90eXBlXCI6IHtcbiAgICAgIGNvbnN0IGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzID8gXCJtb2JpbGVcIiA6IFwiZGVza3RvcFwiO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoaXNNb2JpbGUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZV9jYWNoZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBzdG9yZToge1xuICAgIG5hbWU6IFwiaW5mb0NhY2hlXCIsXG4gICAgaW5kZXhlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIml4X3NrdVwiLFxuICAgICAgICBmaWVsZHM6IFwic2t1XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgb3B0aW9uczoge2tleVBhdGg6IFwic2t1XCJ9LFxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCB7ZmV0Y2hQcm9kdWN0SW5mb30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5XCIpO1xuY2xhc3MgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kZXhlZERCID0gbnVsbDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lLCBjb25maWcudmVyc2lvbik7XG4gICAgaWYgKCFvcGVuUmVxdWVzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW5kZXhlZGRiIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgb3BlblJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcGVuUmVxdWVzdC5yZXN1bHQuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gb3BlblJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBpbmRleGVkIERCXCIsIG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbmRleGVkREIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIHJldHVybiB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gIH1cblxuICBhc3luYyBzYXZlKHBheWxvYWQpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICBmb3IgKGNvbnN0IGxvYWQgb2YgcGF5bG9hZCkge1xuICAgICAgICBsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgc3RvcmUucHV0KGxvYWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjbGVhcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsZWFyUmVxdWVzdCA9IHN0b3JlLmNsZWFyKCk7XG4gICAgICAgIGNsZWFyUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjbGVhclJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBjbGVhcmluZyBzdG9yZTogJHtzdG9yZS5uYW1lfWApO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldChza3UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgZ2V0UmVxdWVzdCA9IHN0b3JlLmdldChza3UpO1xuICAgICAgICBnZXRSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBnZXRSZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICBsb2dnZXIubG9nKGBGb3VuZCB2YWx1ZSAke3Jlc3VsdH0gZm9yIGtleSAke3NrdX1gKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGdldFJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBnZXR0aW5nIHZhbHVlIGZvciBrZXk6ICR7c2t1fWAsIGdldFJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY291bnQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50UmVxdWVzdCA9IHN0b3JlLmNvdW50KCk7XG4gICAgICAgIGNvdW50UmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRSZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICBsb2dnZXIubG9nKGBDb3VudGVkICR7cmVzdWx0fSBlbnRyaWVzYCk7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBjb3VudFJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgY291bnRpbmcgZW50cmllczogXCIsIGNvdW50UmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRDdXJzb3IoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnNvclJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XG4gICAgICAgIGN1cnNvclJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgY3Vyc29yUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBnZXR0aW5nIGN1cnNvclwiLCBjdXJzb3JSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHBlcnNpc3RQcm9kdWN0SW5mbygpIHtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5nZXRDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGN1cnNvci52YWx1ZS50aW1lc3RhbXA7XG4gICAgICBjb25zdCBlbGFwc2VkU2Vjb25kcyA9IChEYXRlLm5vdygpIC8gMTAwMCkgLSB0aW1lc3RhbXA7XG4gICAgICBpZiAoZWxhcHNlZFNlY29uZHMgPCA3MjAwKSByZXR1cm47XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGlzIGV4cGlyZWRcIik7XG4gICAgfVxuICAgIGNvbnN0IHByb2R1Y3RJbmZvUHJvbWlzZSA9IGZldGNoUHJvZHVjdEluZm8oKTtcbiAgICBjb25zdCBjbGVhclByb21pc2UgPSB0aGlzLmNsZWFyKCk7XG4gICAgY29uc3QgW3Byb2R1Y3RJbmZvQXJyYXldID0gYXdhaXQgUHJvbWlzZS5hbGwoW3Byb2R1Y3RJbmZvUHJvbWlzZSwgY2xlYXJQcm9taXNlXSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mb0FycmF5IHx8ICFwcm9kdWN0SW5mb0FycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSh0aGlzLnByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSk7XG4gIH1cblxuICBwcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkge1xuICAgIGNvbnN0IHBheWxvYWRzID0gW107XG4gICAgY29uc3QgZmllbGROYW1lcyA9IHByb2R1Y3RJbmZvQXJyYXkuc2hpZnQoKTtcbiAgICBmaWVsZE5hbWVzLnNoaWZ0KCk7XG4gICAgZm9yIChjb25zdCBpbmZvIG9mIHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7c2t1OiBpbmZvLnNoaWZ0KCl9O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBheWxvYWRbZmllbGROYW1lc1tpXV0gPSBpbmZvW2ldIHx8IDA7XG4gICAgICB9XG4gICAgICBwYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeTtcbiIsImltcG9ydCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IGZyb20gXCIuL2luZGV4XCI7XG5cbmNvbnN0IFN0b3JlID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgaW5zdGFuY2UgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5KCk7XG4gICAgICAgIC8vIEhpZGUgdGhlIGNvbnN0cnVjdG9yIHNvIHRoZSByZXR1cm5lZCBvYmplY3QgY2FuJ3QgYmUgbmV3J2QuLi5cbiAgICAgICAgaW5zdGFuY2UuY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG4gIH07XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUHJvZHVjdEluZm9DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tQcm9kdWN0SW5mb1J1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICBpZiAoIXNrdUxpc3QgfHwgKHR5cGVvZiBza3VMaXN0ID09PSBcIm9iamVjdFwiICYmICFPYmplY3Qua2V5cyhza3VMaXN0KS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG4gIGxldCBydW50aW1lVmFsdWUgPSBudWxsO1xuICBjb25zdCBza3UgPSBza3VMaXN0W09iamVjdC5rZXlzKHNrdUxpc3QpWzBdXT8uaWQ7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBUcmFuc2FjdGlvbkNvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUcmFuc2FjdGlvbkNvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIEFkZFRvQ2FydENvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRBZGRUb0NhcnRDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFByZXZpZXdDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbkNvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRBZGRUb0NhcnRDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0UHJldmlld0NvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCJjb25zdCBFX1RJTUVPVVQgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgd2hpbGUgd2FpdGluZyBmb3IgbXV0ZXggdG8gYmVjb21lIGF2YWlsYWJsZScpO1xuY29uc3QgRV9BTFJFQURZX0xPQ0tFRCA9IG5ldyBFcnJvcignbXV0ZXggYWxyZWFkeSBsb2NrZWQnKTtcbmNvbnN0IEVfQ0FOQ0VMRUQgPSBuZXcgRXJyb3IoJ3JlcXVlc3QgZm9yIGxvY2sgY2FuY2VsZWQnKTtcblxudmFyIF9fYXdhaXRlciQyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBTZW1hcGhvcmUge1xuICAgIGNvbnN0cnVjdG9yKF92YWx1ZSwgX2NhbmNlbEVycm9yID0gRV9DQU5DRUxFRCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IF92YWx1ZTtcbiAgICAgICAgdGhpcy5fY2FuY2VsRXJyb3IgPSBfY2FuY2VsRXJyb3I7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVycyA9IFtdO1xuICAgIH1cbiAgICBhY3F1aXJlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdLnB1c2goeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQgPSAxKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgcmVsZWFzZV0gPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2sod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLnB1c2gocmVzb2x2ZSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSA8PSAwO1xuICAgIH1cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICByZWxlYXNlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gd2VpZ2h0O1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzLmZvckVhY2goKHF1ZXVlKSA9PiBxdWV1ZS5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkucmVqZWN0KHRoaXMuX2NhbmNlbEVycm9yKSkpO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgIH1cbiAgICBfZGlzcGF0Y2goKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBjb25zdCBxdWV1ZUVudHJ5ID0gKF9hID0gdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFxdWV1ZUVudHJ5KVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNXZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSAtPSB3ZWlnaHQ7XG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLl92YWx1ZSArIDE7XG4gICAgICAgICAgICBxdWV1ZUVudHJ5LnJlc29sdmUoW3ByZXZpb3VzVmFsdWUsIHRoaXMuX25ld1JlbGVhc2VyKHByZXZpb3VzV2VpZ2h0KV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RyYWluVW5sb2NrV2FpdGVycygpO1xuICAgIH1cbiAgICBfbmV3UmVsZWFzZXIod2VpZ2h0KSB7XG4gICAgICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBfZHJhaW5VbmxvY2tXYWl0ZXJzKCkge1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLmZvckVhY2goKHdhaXRlcikgPT4gd2FpdGVyKCkpO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIkMSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgTXV0ZXgge1xuICAgIGNvbnN0cnVjdG9yKGNhbmNlbEVycm9yKSB7XG4gICAgICAgIHRoaXMuX3NlbWFwaG9yZSA9IG5ldyBTZW1hcGhvcmUoMSwgY2FuY2VsRXJyb3IpO1xuICAgIH1cbiAgICBhY3F1aXJlKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDEodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbLCByZWxlYXNlcl0gPSB5aWVsZCB0aGlzLl9zZW1hcGhvcmUuYWNxdWlyZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlbGVhc2VyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUucnVuRXhjbHVzaXZlKCgpID0+IGNhbGxiYWNrKCkpO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLndhaXRGb3JVbmxvY2soKTtcbiAgICB9XG4gICAgcmVsZWFzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpKVxuICAgICAgICAgICAgdGhpcy5fc2VtYXBob3JlLnJlbGVhc2UoKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmNhbmNlbCgpO1xuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gd2l0aFRpbWVvdXQoc3luYywgdGltZW91dCwgdGltZW91dEVycm9yID0gRV9USU1FT1VUKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWNxdWlyZTogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodGltZW91dEVycm9yKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCBzeW5jLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsZWFzZSA9IEFycmF5LmlzQXJyYXkodGlja2V0KSA/IHRpY2tldFsxXSA6IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aWNrZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbGVhc2UgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRpY2tldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXRbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodGlja2V0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxlYXNlKHdlaWdodCkge1xuICAgICAgICAgICAgc3luYy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzeW5jLmNhbmNlbCgpO1xuICAgICAgICB9LFxuICAgICAgICB3YWl0Rm9yVW5sb2NrOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBzeW5jLndhaXRGb3JVbmxvY2sod2VpZ2h0KS50aGVuKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KHRpbWVvdXRFcnJvciksIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTG9ja2VkOiAoKSA9PiBzeW5jLmlzTG9ja2VkKCksXG4gICAgICAgIGdldFZhbHVlOiAoKSA9PiBzeW5jLmdldFZhbHVlKCksXG4gICAgICAgIHNldFZhbHVlOiAodmFsdWUpID0+IHN5bmMuc2V0VmFsdWUodmFsdWUpLFxuICAgIH07XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGlzbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gdHJ5QWNxdWlyZShzeW5jLCBhbHJlYWR5QWNxdWlyZWRFcnJvciA9IEVfQUxSRUFEWV9MT0NLRUQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHJldHVybiB3aXRoVGltZW91dChzeW5jLCAwLCBhbHJlYWR5QWNxdWlyZWRFcnJvcik7XG59XG5cbmV4cG9ydCB7IEVfQUxSRUFEWV9MT0NLRUQsIEVfQ0FOQ0VMRUQsIEVfVElNRU9VVCwgTXV0ZXgsIFNlbWFwaG9yZSwgdHJ5QWNxdWlyZSwgd2l0aFRpbWVvdXQgfTtcbiIsImltcG9ydCB7Y2hlY2tEYXRhTGF5ZXJSdWxlfSBmcm9tIFwiLi9kYXRhTGF5ZXJDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRWxlbWVudFJ1bGV9IGZyb20gXCIuL2VsZW1lbnRDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRnVuY3Rpb25SdWxlfSBmcm9tIFwiLi9mdW5jdGlvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tTZXNzaW9uUnVsZX0gZnJvbSBcIi4vc2Vzc2lvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tVcmxSdWxlfSBmcm9tIFwiLi91cmxDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRW52UnVsZX0gZnJvbSBcIi4vZW52Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Byb2R1Y3RJbmZvUnVsZX0gZnJvbSBcIi4vcHJvZHVjdEluZm9DaGVja2VyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7YWRkRGF0YUxpc3RlbmVyLCBhZGRUb0JlYWdsZUluZm9MYXllciwgZ2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtNdXRleH0gZnJvbSBcImFzeW5jLW11dGV4XCI7XG5pbXBvcnQge2ZldGNoRWxpZ2liaWxpdHlSdWxlc30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUnVsZUVuZ2luZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlcywgYmFzZVJ1bGVTZXR9ID0gYm9keTtcbiAgICB0aGlzLmJhc2VSdWxlU2V0ID0gYmFzZVJ1bGVTZXQ7XG4gICAgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzID0gZWxpZ2liaWxpdHlSdWxlcztcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMubXV0ZXggPSBuZXcgTXV0ZXgoKTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZXMoKSB7XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHRoaXMuYmFzZVJ1bGVTZXQpIHtcbiAgICAgIGNvbnN0IHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKTtcbiAgICAgIGlmICghcnVsZVNhdGlzZmllZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlKHJ1bGUpIHtcbiAgICBjb25zdCB7Y2hhaW4sIGNoYWluX2NvbmRpdGlvbiwgdHlwZX0gPSBydWxlO1xuICAgIGxldCBydWxlU2F0aXNmaWVkID0gbnVsbDtcbiAgICAvLyBjaGVjayBydWxlXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwic2Vzc2lvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tTZXNzaW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbGVtZW50UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja0RhdGFMYXllclJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInVybFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tVcmxSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tGdW5jdGlvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVudmlyb25tZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VudlJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja1Byb2R1Y3RJbmZvUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKGBObyBzdWNoIHJ1bGUgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY2hhaW4pIHtcbiAgICAgIHN3aXRjaCAoY2hhaW5fY29uZGl0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAmJiBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkIHx8IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICE9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBjaGFpbiBjb25kaXRpb25cIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydWxlU2F0aXNmaWVkO1xuICB9XG5cbiAgYXN5bmMgYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZWxpZ2liaWxpdHlSdWxlcykpIHtcbiAgICAgIGNvbnN0IHNhdGlzZmllZFJ1bGVJZHMgPSBbXTtcbiAgICAgIHRoaXMuc2V0VXBMaXN0ZW5lcnMoa2V5LCBydWxlcyk7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpKSB7XG4gICAgICAgICAgc2F0aXNmaWVkUnVsZUlkcy5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgLy8gUGFnZSB0eXBlIHJ1bGVzIGFyZSBleGNsdXNpdmU7IGlmIG9uZSBpcyB0cnVlIGFsbCBvdGhlcnMgYXJlIGZhbHNlIGJ5IGRlZmF1bHQsIG5vIG5lZWQgdG8gYXNzZXNzIHRoZSByZXN0XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIHNhdGlzZmllZFJ1bGVJZHMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpIHtcbiAgICBpZiAoIWtleSB8fCAhcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCB0aGlzLm11dGV4LmFjcXVpcmUoKTtcbiAgICBsb2dnZXIubG9nKGBMb2NrIGFjcXVpcmVkIGZvciBrZXkgJHtrZXl9YCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBjb25zdCBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gKSB8fCBbXTtcbiAgICAgICAgaWYgKGlzRWxpZ2libGUpIHtcbiAgICAgICAgICBpZiAoY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjdXJyZW50LnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgY3VycmVudCk7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZW1vdmUgZnJvbSBlbGlnaWJsZSBydWxlc1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gY3VycmVudC5maWx0ZXIoKGspID0+IGsgIT09IHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGZpbHRlcmVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgYXNzZXNzaW5nIHJ1bGVzIGZvciBrZXk6ICR7a2V5fSAtICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGxvZ2dlci5sb2coYFJlbGVhc2luZyBsb2NrIGZvciBrZXk6ICR7a2V5fWApO1xuICAgICAgcmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldFVwTGlzdGVuZXJzKGtleSwgcnVsZXMpIHtcbiAgICAvLyBUT0RPIHJlY3Vyc2l2ZWx5IGdldCBhbGwgb3BlcmF0b3JzL3NlbGVjdG9ycyBmcm9tIGNoYWluZWQgcnVsZXNcbiAgICBjb25zdCBkYXRhTGF5ZXJSdWxlcyA9IHt9O1xuICAgIGNvbnN0IGVsZW1lbnRSdWxlcyA9IHt9O1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgY29uc3Qge29wZXJhdG9yLCBzZWxlY3RvciwgdHlwZX0gPSBydWxlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgICBpZiAoIWRhdGFMYXllclJ1bGVzW29wZXJhdG9yXSkgZGF0YUxheWVyUnVsZXNbb3BlcmF0b3JdID0gW107XG4gICAgICAgICAgZGF0YUxheWVyUnVsZXNbb3BlcmF0b3JdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgICAgaWYgKCFlbGVtZW50UnVsZXNbc2VsZWN0b3JdKSBlbGVtZW50UnVsZXNbc2VsZWN0b3JdID0gW107XG4gICAgICAgICAgZWxlbWVudFJ1bGVzW3NlbGVjdG9yXS5wdXNoKHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtvcGVyYXRvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGFMYXllclJ1bGVzKSkge1xuICAgICAgY29uc3QgYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayA9IHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2suYmluZCh0aGlzLCBrZXksIHJ1bGVzKTtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihvcGVyYXRvciwgYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW3NlbGVjdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZWxlbWVudFJ1bGVzKSkge1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25MaXN0KSA9PiB7XG4gICAgICAgIGxldCBub2RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uUmVjb3JkIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgIG5vZGVzID0gWy4uLm5vZGVzLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLnJlbW92ZWROb2RlcyldO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV4Y2x1ZGUgbXV0YXRpb25zIHRoYXQgb25seSB1cGRhdGUgdGV4dFxuICAgICAgICBpZiAobm9kZXMuZXZlcnkoKG4pID0+IG4udGFnTmFtZSA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpO1xuICAgICAgfSk7XG4gICAgICBsZXQgZWxlbWVudFRvT2JzZXJ2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgZWxlbWVudFRvT2JzZXJ2ZSA9IGVsZW1lbnRUb09ic2VydmUgPyBlbGVtZW50VG9PYnNlcnZlLnBhcmVudE5vZGUgOiBkb2N1bWVudC5ib2R5O1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50VG9PYnNlcnZlLCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEVsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbGlnaWJpbGl0eVJ1bGVzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMpO1xuICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXMpIHJldHVybiBKU09OLnBhcnNlKGVsaWdpYmlsaXR5UnVsZXMpO1xuICAgICAgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMsIEpTT04uc3RyaW5naWZ5KGVsaWdpYmlsaXR5UnVsZXMpKTtcbiAgICAgIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZWxpZ2liaWxpdHkgcnVsZXM6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlNlZ21lbnRhdGlvbkNvbXB1dGVyXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cykge1xuICBsb2dnZXIubG9nKFwiRGV0ZXJtaW5pbmcgdXNlciBzZWdtZW50XCIpO1xuICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgT2JqZWN0LmtleXModHJlYXRtZW50V2VpZ2h0cykpIHtcbiAgICBjb25zdCBydWxlU2V0ID0gdHJlYXRtZW50V2VpZ2h0c1tzZWdtZW50XT8ucnVsZVNldDtcbiAgICBpZiAoIXJ1bGVTZXQpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHNlZ21lbnRSdWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2Jhc2VSdWxlU2V0OiBydWxlU2V0LCBidXNpbmVzc1J1bGVTZXQ6IFtdfSk7XG4gICAgaWYgKGF3YWl0IHNlZ21lbnRSdWxlRW5naW5lLmNoZWNrUnVsZXMoKSkge1xuICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic1wiLCBzZWdtZW50KTtcbiAgICAgIHJldHVybiBzZWdtZW50O1xuICAgIH1cbiAgfVxuXG4gIGxvZ2dlci5sb2coXCJVc2VyIHNlZ21lbnQgbm90IG1hdGNoZWQsIHJldHVybmluZyBkZWZhdWx0XCIpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgXCJkZWZhdWx0XCIpO1xuICByZXR1cm4gXCJkZWZhdWx0XCI7XG59XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTLCBUUkVBVE1FTlRTX0RVUkFUSU9OfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2ZldGNoVHJlYXRtZW50cywgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Y29tcHV0ZVNlZ21lbnR9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXIvc2VnbWVudC1jb21wdXRlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiKTtcblxuY2xhc3MgVHJlYXRtZW50UmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSBib2R5O1xuICAgIHRoaXMudHJlYXRtZW50cyA9IHRyZWF0bWVudHM7XG5cbiAgICB0aGlzLnRyZWF0bWVudFdlaWdodHMgPSB0cmVhdG1lbnRXZWlnaHRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudHMoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkxvYWRpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB7VFJFQVRNRU5UU30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcbiAgICBjb25zdCB0cmVhdG1lbnRzT2JqID0gSlNPTi5wYXJzZSh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShUUkVBVE1FTlRTKSk7XG4gICAgbGV0IHRyZWF0bWVudHMgPSB0cmVhdG1lbnRzT2JqPy50cmVhdG1lbnRzO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyZWF0bWVudHNPYmo/LnRpbWVzdGFtcDtcbiAgICBpZiAoIXRyZWF0bWVudHMgfHwgIXRpbWVzdGFtcCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHRyZWF0bWVudHMsXG4gICAgICB9O1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgfVxuICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IGVsYXBzZWREYXlzID0gKERhdGUubm93KCkgLSB0aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwICogMjQpO1xuICAgICAgaWYgKGVsYXBzZWREYXlzID4gVFJFQVRNRU5UU19EVVJBVElPTikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBhcmUgZXhwaXJlZFwiKTtcbiAgICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIuc3VjY2VzcyhcIlRyZWF0bWVudHMgYXJlIGxvYWRlZCBmcm9tIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50V2VpZ2h0cygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHdlaWdodHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5XRUlHSFRTKTtcbiAgICAgIGlmICh3ZWlnaHRzKSByZXR1cm4gSlNPTi5wYXJzZSh3ZWlnaHRzKTtcbiAgICAgIHdlaWdodHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudFdlaWdodHMoKTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLldFSUdIVFMsIEpTT04uc3RyaW5naWZ5KHdlaWdodHMpKTtcbiAgICAgIHJldHVybiB3ZWlnaHRzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0TWF0Y2hlZFRyZWF0bWVudHMoKSB7XG4gICAgY29uc3QgdHJlYXRtZW50V2VpZ2h0cyA9IHRoaXMudHJlYXRtZW50V2VpZ2h0cztcbiAgICBjb25zdCB1c2VyR3JvdXAgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzID0gdGhpcy50cmVhdG1lbnRzO1xuICAgIGlmICh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgICBjb25zdCB1c2VyR3JvdXBXZWlnaHRzID0gKHVzZXJHcm91cCAmJiB0cmVhdG1lbnRXZWlnaHRzW3VzZXJHcm91cF0pID9cbiAgICAgIHRyZWF0bWVudFdlaWdodHNbdXNlckdyb3VwXSA6IHRyZWF0bWVudFdlaWdodHNbXCJkZWZhdWx0XCJdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICB0cmVhdG1lbnQud2VpZ2h0ID0gdXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQ/LmlkXT8ud2VpZ2h0IHx8IDA7XG4gICAgICAgIGlmICghdHJlYXRtZW50LmFjdGlvbnMuc29tZSgoYSkgPT4gYS52YXJpYW50cykpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiB0cmVhdG1lbnQuYWN0aW9ucykge1xuICAgICAgICAgIGlmICghYWN0aW9uLnZhcmlhbnRzKSBjb250aW51ZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhbnRLZXkgb2YgT2JqZWN0LmtleXMoYWN0aW9uLnZhcmlhbnRzKSkge1xuICAgICAgICAgICAgaWYgKHVzZXJHcm91cFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHMgJiYgdXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0ID0gdXNlckdyb3VwV2VpZ2h0c1t0cmVhdG1lbnQuaWRdLnZhcmlhbnRzW3ZhcmlhbnRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci5sb2coYCR7dHJlYXRtZW50cy5sZW5ndGh9IHRyZWF0bWVudHMgdXNlciBncm91cCBtYXRjaGVkYCk7XG4gICAgaWYgKCF0cmVhdG1lbnRzLmxlbmd0aCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWF0bWVudFJlcG9zaXRvcnk7XG4iLCJpbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlJlcGxhY2VVdGlsc1wiKTtcblxuY29uc3QgcmVwbGFjZXIgPSBhc3luYyAodmFsdWUsIHJlcGxhY2VGbikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IFtpLCB2YWxdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY3VycmVudFJlcGxhY2VGbiA9IEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSA/IHJlcGxhY2VGbltpXSA6IHJlcGxhY2VGbiB8fCBcIlwiO1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKGN1cnJlbnRSZXBsYWNlRm4pO1xuICAgICAgICB2YWx1ZVtpXSA9IHJlcGxhY2VBbGwodmFsLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlW2ldID0gcmVwbGFjZUZuRXhlY3V0b3IoY3VycmVudFJlcGxhY2VGbiwgdmFsKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pKSB7XG4gICAgZm9yIChjb25zdCByRm4gb2YgcmVwbGFjZUZuKSB7XG4gICAgICBpZiAodHlwZW9mIHJGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyRm4pO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJGbiwgdmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKTtcbiAgICAgIHZhbHVlID0gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlLCBzaW5nbGUgPSBmYWxzZSkge1xuICBpZiAocmVwbGFjZUZuICYmIHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikpIHtcbiAgICBsb2dnZXIubG9nKFwiRXhlY3V0aW5nIHJlcGxhY2UgZnVuY3Rpb246IFwiLCByZXBsYWNlRm4pO1xuICAgIGNvbnN0IHJlcGxhY2VGdW5jdGlvbiA9IEZ1bmN0aW9uKHJlcGxhY2VGbik7XG4gICAgaWYgKHNpbmdsZSkgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gICAgcmV0dXJuIHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pIHtcbiAgY29uc3Qge3N0b3JhZ2UsIGtleSwga2V5RmFsbGJhY2ssIHR5cGV9ID0gcmVwbGFjZUZuO1xuICBzd2l0Y2ggKHN0b3JhZ2UpIHtcbiAgICBjYXNlIFwic2Vzc2lvblwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IG51bGw7XG4gICAgICByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleUZhbGxiYWNrKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IEpTT04ucGFyc2UocmVwbGFjZVZhbCk7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IHJlcGxhY2VWYWxbcmVwbGFjZVZhbC5sZW5ndGggLSAxXVt0eXBlXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGQgbm90IHBhcnNlICR7cmVwbGFjZVZhbH1gKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICAgIGNhc2UgXCJpbmZvLWxheWVyXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXlGYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZXI7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJBY3Rpb25Db25kaXRpb25VdGlsc1wiKTtcblxuY29uc3QgY2hlY2tBY3Rpb25Db25kaXRpb24gPSBhc3luYyAoY29uZGl0aW9uKSA9PiB7XG4gIGNvbnN0IHthdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgb3BlcmF0b3IsIHNlbGVjdG9yLCB0eXBlLCB2YWx1ZX0gPSBjb25kaXRpb247XG4gIGxvZ2dlci5sb2coXCJBY3Rpb24gY29uZGl0aW9uIGZvdW5kOiBcIiwgY29uZGl0aW9uKTtcbiAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IFtdO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjoge1xuICAgICAgY29uc3QgY29uZGl0aW9uRWxlbWVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbmRpdGlvbkVsZW1lbnRzKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRTa3UgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KGVsZW1lbnRTa3UpO1xuICAgICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwcm9kdWN0SW5mbz8uW29wZXJhdG9yXTtcbiAgICAgICAgLy8gcnVuVGltZVZhbHVlIG1heSBiZSAwXG4gICAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHwgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUHJvZHVjdCBpbmZvIGlzIGVtcHR5XCIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSBjb250aW51ZTtcbiAgICAgICAgZWxpZ2libGVFbGVtZW50cy5wdXNoKCQoZWxlbWVudCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tBY3Rpb25Db25kaXRpb247XG4iLCJpbXBvcnQge3N0eWxlQXBwbGljYXRvciwgZGVsYXksIGlkbGVUaW1lcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge3JlcGxhY2VBbGwsIHR1cmtpc2hUb0xvd2VyfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgSURMRV9USU1FT1VUfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgcmVwbGFjZXIgZnJvbSBcIi4vcmVwbGFjZS11dGlsc1wiO1xuaW1wb3J0IGNoZWNrQWN0aW9uQ29uZGl0aW9uIGZyb20gXCIuL2FjdGlvbi1jb25kaXRpb24tdXRpbFwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMpIHtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUFwcGx5QWN0aW9uc1wiKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYWN0aW9uOiBcIiwgSlNPTi5zdHJpbmdpZnkoYWN0aW9uKSk7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBhdHRyaWJ1dGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVtb3Zpbmc6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkNhbm5vdCBmb3VuZCBlbGVtZW50IHdpdGggc2VsZWN0b3I6IFwiLCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBpZiAoU3RyaW5nKHZhbHVlKS5pbmNsdWRlcyhcIm5kLWFkZC10by13aW5cIikpIHtcbiAgICAgICAgICAgICQoXCIubmQtYWRkLXRvLXdpblwiKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGFmdGVyOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGVuZGluZyB2YWx1ZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb2RhbFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIGlmIChlbG0gPT0gZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3BsYXlNb2RhbCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBvcHVwXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlBvcHVwIGFscmVhZHkgZGlzcGxheWVkIGluIHNlc3Npb25cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIFBvcHVwOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHBUeXBlKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzZXRhdHRyaWJ1dGVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgICBjYXNlIFwic3JjXCI6XG4gICAgICAgICAgZWxlbWVudC5jc3MoXCJjb250ZW50XCIsIGB1cmwoJHt2YWx1ZS50cmltKCl9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG5cbiAgICAgICAgICBlbGVtZW50LmNzcyhwcm9wZXJ0eSwgcHJvcGVydHlWYWx1ZSwgXCIhaW1wb3J0YW50XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmhhbmRsZWQgYXR0cmlidXRlOiBTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzb3VyY2UucmVtb3ZlKCk7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZX0gPSBib2R5O1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcyA9IFtdO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIHJlYXBwbHlfZXZlbnQsXG4gICAgICByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBwYWdlVHlwZSxcbiAgICAgIHByZXBhcmVBbmRBcHBseSxcbiAgICB9ID0gdGhpcztcblxuICAgIC8vIG9uZSBlbmdhZ2VtZW50IGF0IGEgdGltZVxuICAgIGlmIChlbmdhZ2VtZW50TG9ja1tpZF0pIHtcbiAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBlbmdhZ2VtZW50IGluIHByb2dyZXNzLCBza2lwcGluZ2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSB0cnVlO1xuXG4gICAgaWYgKGRlYnVnTW9kZSAhPT0gMSAmJiAhd2VpZ2h0ICYmICFkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyAmJiAhZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdtb2JpbGUnIG1pc21hdGNoXCIpO1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnZGVza3RvcCcgbWlzbWF0Y2hcIik7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBiYXNlIHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbGV0IHRyZWF0bWVudFNraXBSYXRpbyA9IHdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSB3ZWlnaHQgfHwgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIGlmIChkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICAgIC8vIElmIGRlcGVuZGFudCBvbiB0cmVhdG1lbnQgaXMgZm91bmQgYW5kIGhhcyB3ZWlnaHQ7IHVzZSBpdHMgc2tpcCByYXRpb1xuICAgICAgICBjb25zdCBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbmQoKHQpID0+IHQuaWQgPT09IGRlcGVuZGFudF9vbl90cmVhdG1lbnQpPy53ZWlnaHQ7XG4gICAgICAgIHRyZWF0bWVudFNraXBSYXRpbyA9IGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0ID09PSAxMDAgPyAwIDogKDEwMCAtIGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0IHx8XG4gICAgICAgICAgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgLy8gRGV0ZXJtaW5pbmcgaWRlbnRpZmllciBmb3IgY2FsY3VsYXRpbmcgdHJlYXRtZW50IHBlcmNlbnRhZ2UgKHRyZWF0bWVudFBjdClcbiAgICAgIGNvbnN0IGRldGVybWluaW5nSWRlbnRpZmllciA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQgfHwgaWQ7XG5cbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyAxMDAgd2hlbiBkZWJ1ZyBtb2RlIGlzIDEsIGVuc3VyaW5nIG5vIHRyZWF0bWVudHMgYXJlIHNraXBwZWRcbiAgICAgIGNvbnN0IHRyZWF0bWVudFBjdCA9IGRlYnVnTW9kZSA9PT0gMSA/IDEwMCA6IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgZGV0ZXJtaW5pbmdJZGVudGlmaWVyKTtcbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgbGV0IGJ1c2luZXNzUnVsZUlkID0gbnVsbDtcbiAgICAgIGlmIChidXNpbmVzc1J1bGVTZXQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICBidXNpbmVzc1J1bGVJZCA9IGF3YWl0IHRoaXMuY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCk7XG4gICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgIH0gZWxzZSBsb2dnZXIubG9nKFwiQXBwbHlpbmcgdHJlYXRtZW50IHdpdGggZGVmYXVsdCB2YWx1ZXNcIik7XG4gICAgICB9XG4gICAgICBpZiAodHJlYXRtZW50UGN0IDwgdHJlYXRtZW50U2tpcFJhdGlvKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBza2lwcGVkIGR1ZSB0byB0cmVhdG1lbnQgc3BsaXQgcmF0aW9gKTtcbiAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgbnVsbCwgXCJza2lwcGVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQpO1xuICAgICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDogXCIsIGlkKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW3RyZWF0bWVudC5pZF0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgY29uc3QgW3ByZXBhcmVkLCB2YXJpYW50XSA9IGF3YWl0IHByZXBhcmVBY3Rpb25zKGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcHBseUFjdGlvbnMocHJlcGFyZWQpO1xuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYXRlUmVhcHBseVJvYm90TWFwKCkge1xuICAgIGNvbnN0IHtyZUFwcGx5VHJlYXRtZW50c01hcCwgbWF0Y2hlZFRyZWF0bWVudHN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZUFwcGx5VHJlYXRtZW50c01hcCkpIHtcbiAgICAgIGNvbnN0IHRyZWF0bWVudElkcyA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW2tleV07XG4gICAgICBjb25zdCByZUFwcGx5VHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigodCkgPT4gdHJlYXRtZW50SWRzLmluY2x1ZGVzKHQuaWQpKTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJpbmZpbml0ZV9zY3JvbGxcIjoge1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbmZpbml0ZV9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0aW1lb3V0XCI6IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSB0aW1lb3V0YCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50X2NoYW5nZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlTZWxlY3Rvckxpc3QgPSBBcnJheS5pc0FycmF5KHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yKSA/XG4gICAgICAgICAgICAgICAgdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IgOiBbdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3JdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiByZWFwcGx5U2VsZWN0b3JMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGVsZW1lbnRfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbl9zY3JvbGxcIjoge1xuICAgICAgICAgIC8vIGFkZCB3aW5kb3cgc2Nyb2xsIGxpc3RlbmVyLCBjYWxsIGVuZ2FnZVJvYm90IG9uIHNjcm9sbCwgZG8gbm90IHRyaWdnZXIgbW9yZSB0aGFuIG9uY2UgcGVyIDI1MG1zXG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IDA7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAobm93IC0gbGFzdFNjcm9sbFRpbWUgPiAyNTAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA+IDUpIHtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gb25fc2Nyb2xsYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJxdWVyeV9zZWFyY2hfY2hhbmdlXCI6IHtcbiAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggIT09IHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gcXVlcnlfc2VhcmNoX2NoYW5nZWApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVydmFsXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoYXBwbGllZD8uW3RyZWF0bWVudC5pZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGludGVydmFsYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb19sYXllcl9jaGFuZ2VcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICAgICAgICAgIGFkZERhdGFMaXN0ZW5lcih0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUmVhcHBseSBldmVudCBub3QgZm91bmQ6IFwiLCBrZXkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVTZXQgPSBbXSwgYnVzaW5lc3NSdWxlU2V0ID0gW10sIGlkfSA9IHRyZWF0bWVudDtcbiAgICBpZiAodGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5pbmNsdWRlcyhpZCkpIHJldHVybjtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMoWy4uLmVsaWdpYmlsaXR5UnVsZVNldCwgLi4uYnVzaW5lc3NSdWxlU2V0XSk7XG4gICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKGBfX2VSdWxlcy4ke3NlbGVjdG9yfWAsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICB9XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5wdXNoKGlkKTtcbiAgfVxuXG4gIGV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZVNldCwgcHJldmlvdXNTZWxlY3RvcnMgPSBudWxsKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gcHJldmlvdXNTZWxlY3RvcnMgfHwgW107XG4gICAgZm9yIChsZXQgcnVsZSBvZiBydWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKHJ1bGUuc3RhcnRzV2l0aChcIiFcIikpIHJ1bGUgPSBydWxlLnNsaWNlKDEpO1xuICAgICAgICBzZWxlY3RvcnMucHVzaChydWxlLnNwbGl0KFwiLlwiKVswXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGUuc2V0LCBzZWxlY3RvcnMpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLihuZXcgU2V0KHNlbGVjdG9ycykpXTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKSB7XG4gICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgZWxpZ2liaWxpdHkgJHtlbGlnaWJpbGl0eVJ1bGV9YCk7XG4gICAgbGV0IG9wcG9zaXRlRmxhZyA9IGZhbHNlO1xuICAgIGxldCBbZWxpZ2liaWxpdHlTY29wZSwgZWxpZ2liaWxpdHlOYW1lXSA9IGVsaWdpYmlsaXR5UnVsZS5zcGxpdChcIi5cIik7XG4gICAgaWYgKGVsaWdpYmlsaXR5U2NvcGUuc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIG9wcG9zaXRlRmxhZyA9IHRydWU7XG4gICAgICBlbGlnaWJpbGl0eVNjb3BlID0gZWxpZ2liaWxpdHlTY29wZS5zbGljZSgxKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtlbGlnaWJpbGl0eVNjb3BlfWApO1xuICAgIGlmICghcmVzIHx8ICFBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob3Bwb3NpdGVGbGFnICYmIHJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFvcHBvc2l0ZUZsYWcgJiYgIXJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgbG9nZ2VyLmxvZyhgJHtlbGlnaWJpbGl0eVJ1bGV9IGlzIGVsaWdpYmxlYCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQsIGVsaWdpYmlsaXR5U2V0VHlwZSA9IG51bGwsIHByZXZpb3VzSXNFbGlnaWJsZSA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcm9ib3QgZWxpZ2liaWxpdHlcIik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVsaWdpYmlsaXR5IFJ1bGUgU2V0ICR7ZWxpZ2liaWxpdHlSdWxlU2V0fSBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGlzRWxpZ2libGUgPSBwcmV2aW91c0lzRWxpZ2libGU7XG4gICAgZm9yIChjb25zdCBlbGlnaWJpbGl0eVJ1bGUgb2YgZWxpZ2liaWxpdHlSdWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlICYmIGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gZWxpZ2liaWxpdHlTZXRUeXBlOiBcIiwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGUuc2V0LCBlbGlnaWJpbGl0eVJ1bGUudHlwZSwgaXNFbGlnaWJsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGluZGV4IG9mIGJ1c2luZXNzUnVsZSwgdGhpcyBpcyB0aGUgYnVzaW5lc3NSdWxlSWRcbiAgYXN5bmMgY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBidXNpbmVzc1J1bGVdIG9mIGJ1c2luZXNzUnVsZVNldC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KFtidXNpbmVzc1J1bGVdKSkgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleFwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU9uQ29tcG9uZW50XCIpO1xuXG5jb25zdCBiZWFnbGVPbiA9IGFzeW5jIChpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKSA9PiB7XG4gIGNvbnN0IHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UgPSBTdG9yZS5nZXRJbnN0YW5jZSgpLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xuXG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlID0gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG4gIGNvbnN0IHRyZWF0bWVudFdlaWdodHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRXZWlnaHRzKCk7XG5cbiAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcygpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9LCAyMDAwKTtcblxuICBjb25zdCBbdHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgdHJlYXRtZW50c1Byb21pc2UsIHRyZWF0bWVudFdlaWdodHNQcm9taXNlLFxuICBdKTtcblxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcblxuICBjb25zdCB0cmVhdG1lbnRSZXBvc2l0b3J5ID0gbmV3IFRyZWF0bWVudFJlcG9zaXRvcnkoe1xuICAgIHRyZWF0bWVudHMsXG4gICAgdHJlYXRtZW50V2VpZ2h0cyxcbiAgfSk7XG5cbiAgY29uc3QgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRSZXBvc2l0b3J5LmdldE1hdGNoZWRUcmVhdG1lbnRzKCk7XG4gIGlmICghbWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIk5vIHRyZWF0bWVudHMgbWF0Y2hlZCwgcmV0dXJuaW5nIHdpdGhvdXQgZnVydGhlciBhY3Rpb25cIik7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlLCBwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlLFxuICBdKTtcblxuICBjb25zdCByb2JvdEVuZ2luZSA9IG5ldyBSb2JvdEVuZ2luZSh7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgZGVidWdNb2RlLFxuICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgIGlkZW50aWZpZXIsXG4gICAgcGFnZVR5cGUsXG4gIH0pO1xuICBhd2FpdCByb2JvdEVuZ2luZS5lbmdhZ2VSb2JvdHMoKTtcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG5cbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJBcHBsaWVkIHRyZWF0bWVudHM6IFwiLCBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBSdWxlRW5naW5lLmdldEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm47XG4gIGNvbnN0IHJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7ZWxpZ2liaWxpdHlSdWxlc30pO1xuICBhd2FpdCBydWxlRW5naW5lLmFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xufVxuZXhwb3J0IGRlZmF1bHQgYmVhZ2xlT247XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBNb25pdG9yIGZyb20gXCIuLi9CZWFnbGVNb25pdG9yL2luZGV4XCI7XG5pbXBvcnQgYmVhZ2xlT24gZnJvbSBcIi4uL0JlYWdsZU9uXCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcblxubGV0IFNIVVRET1dOID0gZmFsc2U7XG5jb25zdCBGTElQRkxBRyA9IGZhbHNlO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGxldCBtb25pdG9yID0gbnVsbDtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBpbml0aWFsaXppbmdcIik7XG4gIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG4gIGxldCBlYXJseUxvZ1NlbnQgPSBmYWxzZTtcbiAgbGV0IGhpZGVSZW1vdmVkID0gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBtb25pdG9yID0gbmV3IE1vbml0b3IoKTtcbiAgICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyKCk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IGF3YWl0IGdldElkZW50aWZpZXIoKTtcbiAgICBsb2dnZXIubG9nKFwiRm91bmQgaWRlbnRpZmllcjogXCIsIGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiLCBpZGVudGlmaWVyKTtcbiAgICBsZXQgY29va2llUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIsIGNvb2tpZVBjdCk7XG4gICAgLy8gYWRkIGN1cnJlbnQgZXBvY2ggaW50ZWdlciB0byBiZWFnbGVJbmZvTGF5ZXJcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiwgRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuXG4gICAgY29uc3Qgb29zUmVhc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUpO1xuXG4gICAgLy8gaWYgY2Fubm90IGdldCBjcml0aWNhbCBpbmZvLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgdW5zdXBwb3J0ZWRcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwidW5zdXBwb3J0ZWRcIilcbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCBkZXZpY2VcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEZXZpY2UgZG9lcyBub3QgaGF2ZSByZXF1aXJlZCBjYXBhYmlsaXRpZXNcIik7XG4gICAgfVxuXG4gICAgY29uc3QgaXNMYWJlbFNlbnQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQpO1xuICAgIGNvbnN0IHRpbWVvdXRDb3VudGVyID0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5UKSkgfHwgMDtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuXG4gICAgLy8gaWYgdGltZWQtb3V0IHRvbyBtYW55IHRpbWVzIGZvciB2ZXJ5IGZpcnN0IGludGVyYWN0c2lvbnMsIG1ha2Ugb3V0IG9mIHNjb3BlIGZvciB0aGUgc2Vzc2lvblxuICAgIGlmICghZGVidWdNb2RlICYmICFvb3NSZWFzb24gJiYgIWlzTGFiZWxTZW50ICYmIHRpbWVvdXRDb3VudGVyID4gTUFYX1RJTUVPVVRfUEVSX1NFU1NJT05cbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJlYWdsZSB0aW1lb3V0IHRocmVzaG9sZCByZWFjaGVkXCIpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHJlbmFtZSBzaG93cm9vbSBsb2dpYyB0byBhZG1pbiwgYW5kIG1hcCB2dnNJc1Nob3dyb29tIHRvIGEgY29uZmlndXJhYmxlIGFkbWluIHBhcmFtXG4gICAgLy8gSUYgbm8gYWRtaW4gcGFyYW0gaXMgY29uZmlndXJlcywgdGhlbiBza2lwIHRoaXMgYWRtaW4gbG9naWMgY29tcGxldGVseVxuXG4gICAgLy8gVml2ZW5zZSBzcGVjaWZpYzogQ2hlY2sgaWYgdXNlciBpcyBhZG1pbiwgbWFraW5nIHRoZW0gb3V0IG9mIHNjb3BlXG4gICAgLy8gVGhpcyBuZWVkcyB0byB3YWl0IGZvciBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIHRvIHNldCB0aGUgdnZzSXNTaG93cm9vbSB2YWx1ZVxuICAgIGNvbnN0IGlzU2hvd3Jvb20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKTtcbiAgICBpZiAoaXNTaG93cm9vbSAmJiAoaXNTaG93cm9vbSA9PT0gXCJ0cnVlXCIgfHwgaXNTaG93cm9vbSA9PT0gdHJ1ZSkpIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCBzaG93cm9vbVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgZnJvbSBWVlMgc2hvd3Jvb20vY2FsbGNlbnRlclwiKTtcbiAgICB9IGVsc2UgaWYgKGlzU2hvd3Jvb20gPT09IG51bGwgfHwgaXNTaG93cm9vbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZGV0ZXJtaW5lIGlmIHVzZXIgaXMgZnJvbSBWVlMgc2hvd3Jvb20vY2FsbGNlbnRlclwiKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIHJlZmFjdG9yIGFmdGVyIHRhZyBjaGFuZ2VzIGdvIGxpdmVcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtaGlkZVwiKSAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV4dERheS1oaWRlXCIpKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCZWFnbGUgc2NyaXB0IHRpbWVkIG91dFwiKTtcbiAgICB9XG5cbiAgICAvLyBpc09uIGNhbiBiZSB0cnVlIChPTiksIGZhbHNlIChPRkYpXG4gICAgbGV0IGlzT24gPSBudWxsO1xuXG4gICAgLy8gRkxJUCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBmbGFnXG4gICAgaWYgKEZMSVBGTEFHKSB7XG4gICAgICBjb29raWVQY3QgPSA5OSAtIGNvb2tpZVBjdDtcbiAgICB9XG5cbiAgICBpZiAoZGVidWdNb2RlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRGVidWcgbW9kZSBvbjogYWxsIGFwcGxpY2FibGUgdHJlYXRtZW50cyB3aWxsIGJlIGFwcGxpZWRcIik7XG4gICAgICBpc09uID0gdHJ1ZTtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJlbXBsb3llZVwiKSB7XG4gICAgICBsb2dnZXIud2FybihcIlVzZXIgaXMgb3V0IG9mIHNjb3BlXCIpO1xuICAgICAgLy8gc2V0IGlzT24gdG8gdHJ1ZS9mYWxzZSB3aGVuIG5vdCBkZWJ1Z01vZGUgYnV0IG91dCBvZiBzY29wZSBpLmUuIG5kX2RlYnVnPTAgZm9yIHRlc3RhYmlsaXR5XG4gICAgICBpc09uID0gY29va2llUGN0ID49IFNQTElUX1JBVElPO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24pIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdW5rbm93blwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3V0IG9mIHNjb3BlIHJlYXNvblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIFNQTElUX1JBVElPLCB0aGVuIGluIE9OIG1vZGVcbiAgICAgIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8pIHtcbiAgICAgICAgaXNPbiA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInRydWVcIn0pO1xuICAgICAgfSBlbHNlIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8vMikge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMlwifSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMVwifSk7XG4gICAgICB9XG5cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNPblwiLCBpc09uKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgaXNPbi50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwiRm91bmQgY29va2llIHBlcmNlbnRhZ2U6IFwiLCBjb29raWVQY3QpO1xuICAgIGxvZ2dlci5sb2coXCJTcGxpdF9yYXRpbzogXCIsIFNQTElUX1JBVElPKTtcbiAgICBsb2dnZXIubG9nKFwiY29va2llUGN0IDwgU1BMSVRfUkFUSU9cIiwgY29va2llUGN0IDwgU1BMSVRfUkFUSU8pO1xuICAgIGxvZ2dlci5sb2coXCJTZXQgaXNPbjogXCIsIGlzT24pO1xuXG4gICAgLy8gYXdhaXQgY3JpdGljYWwgaW5mbyBiZWZvcmUgc2VuZGluZyBsb2dzIGZvciBwcm9wZXIgYW5hbHl0aWNzIG1lYXN1cmVtZW50c1xuICAgIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIGlmIChwYWdlVHlwZSA9PT0gXCJwdXJjaGFzZVwiKSB7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucmV2ZW51ZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgLy8gc2VuZCBsb2dzIGltbWVkaWF0ZWx5IG9uIHB1cmNoYXNlIHBhZ2UsIGFuZCBmb3JjZSB3YWl0XG4gICAgICBhd2FpdCBtb25pdG9yLnNlbmRMb2dzKHRydWUpO1xuICAgICAgLy8gaWYgcHVyY2hhc2UgaXMgY29tcGxldGUsIGRvIG5vdCBhcHBseSBhbnkgdHJlYXRtZW50cyBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIFNIVVRET1dOID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2VuZCBsb2dzIHdoZW4gcmVhZHksIHN0YXJ0IHNjcmFwaW5nIGFuZCBzZW5kaW5nIGFzeW5jbHlcbiAgICAgIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIH1cbiAgICBlYXJseUxvZ1NlbnQgPSB0cnVlO1xuXG4gICAgaWYgKGlzT24gPT09IHRydWUpIHtcbiAgICAgIGlmICghU0hVVERPV04pIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkJlYWdsZSBPTiBHcm91cCBQYXRoXCIpO1xuICAgICAgICBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9OIEdyb3VwIFNIVVRET1dOIFBhdGhcIik7XG4gICAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09uID09PSBmYWxzZSkge1xuICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT0ZGIEdyb3VwIFBhdGhcIik7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaXNPbiBpcyB1bmRlZmluZWQgb3IgbnVsbFwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiQmVhZ2xlIEVhcmx5IFNjb3BlLW91dCBvciBFUlJPUjogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIGlmICghaGlkZVJlbW92ZWQpIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJWRVJTSU9OIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIlRSRUFUTUVOVF9SQVRJTyIsIlRSRUFUTUVOVFNfRFVSQVRJT04iLCJNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJUUkVBVE1FTlRTIiwiUE9QVVBfRElTUExBWV9GTEFHIiwiU0tVX0lORk9fQkFTS0VUIiwiVElNRU9VVF9DT1VOVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJXRUlHSFRTIiwiRUxJR0lCSUxJVFlfUlVMRVMiLCJMT0NBTF9TVE9SQUdFX0tFWVMiLCJERUJVR19NT0RFIiwiT1VUX09GX1NDT1BFIiwiSVNfTEFCRUxfU0VOVCIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwidGVzdGluZyIsIkRFQlVHIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFyZ3MiLCJjb25zb2xlIiwiaW5mbyIsImxvZyIsIm1lc3NhZ2VDb25maWciLCJmb3JFYWNoIiwiYXJndW1lbnQiLCJ0eXBlIiwid2FybiIsImVycm9yIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJsb2dnZXIiLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJ0b3AiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZldGNoVHJlYXRtZW50cyIsImZldGNoUGx1cyIsInRyZWF0bWVudHMiLCJqc29uIiwianNvblRyZWF0bWVudCIsImZhaWxlZCIsIm1lc3NhZ2UiLCJmZXRjaFRyZWF0bWVudFdlaWdodHMiLCJ0cmVhdG1lbnRXZWlnaHRzIiwianNvblRyZWF0bWVudFdlaWdodHMiLCJmZXRjaEVsaWdpYmlsaXR5UnVsZXMiLCJlbGlnaWJpbGl0eVJ1bGVzIiwianNvbkVsaWdpYmlsaXR5UnVsZXMiLCJmZXRjaFByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm8iLCJ0ZXh0IiwicHJvZHVjdEluZm9DU1YiLCJjc3ZUb0FycmF5IiwidXJsIiwib3B0aW9ucyIsInJldHJpZXMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwic3RhdHVzIiwiY2F0Y2giLCJleHRyYWN0Q29va2llSWRlbnRpZmllciIsImNvb2tpZVN0cmluZyIsImNvb2tpZU5hbWUiLCJwYXJzZWQiLCJzcGxpdCIsIm1hcCIsInYiLCJyZWR1Y2UiLCJhY2MiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0cmltIiwiaWRlbnRpZmllciIsImlkZW50aWZpZXJJbmRleCIsImRldGVybWluZVBjdCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJwY3QiLCJleGl0U2Nyb2xsTGlzdGVuZXIiLCJjYWxsQmFjayIsImxvb3AiLCJzY3JvbGxUb3AiLCJsYXN0U2Nyb2xsVG9wIiwiY2xlYXJJbnRlcnZhbCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInNldEludGVydmFsIiwic3R5bGVBcHBsaWNhdG9yIiwiZWxlbWVudHMiLCJzdHlsZUNoYW5nZXNNYXAiLCJpIiwiZWxlbWVudCIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYnVzaW5lc3NSdWxlSWQiLCJhY3Rpb25zIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidmFyaWFudCIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsImlkIiwia2V5cyIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uU3RvcmFnZSIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsInNldEl0ZW0iLCJub3ciLCJwYXRobmFtZSIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJjdXJyZW50IiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsIk1hdGgiLCJhYnMiLCJnZXRSYW5kb21JbnQiLCJmbG9vciIsInJhbmRvbSIsImdldFVuaXhUaW1lIiwiZ2V0SWRlbnRpZmllciIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsInNldFRpbWVvdXQiLCJlIiwiZGVsYXkiLCJtcyIsImZvcm1hdERlbGl2ZXJ5RGF0ZSIsImRhdGUiLCJyZXN1bHQiLCJzdGFydE1vbnRoSW5kZXgiLCJlbmRNb250aEluZGV4Iiwic3RhcnREYXkiLCJlbmREYXkiLCJtYXRjaCIsInRvZGF5Iiwic3RhcnRZZWFyIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImVuZFllYXIiLCJlc3RpbWF0ZWRTdGFydCIsImVzdGltYXRlZEVuZCIsInN0YXJ0RGlmZk92ZXJEYXlzIiwiY2VpbCIsImVuZERpZmZPdmVyRGF5cyIsInN0YXJ0RGlmZk92ZXJXZWVrcyIsImVuZERpZmZPdmVyV2Vla3MiLCJlcnIiLCJpZGxlVGltZXIiLCJ0aW1lT3V0IiwicmVzZXRUaW1lciIsImNsZWFyVGltZW91dCIsImlkbGVUaW1lb3V0Iiwib250b3VjaHN0YXJ0IiwiZ2V0QnJvd3NlclR5cGUiLCJ1c2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJpc093bk11dGF0aW9uIiwibXV0YXRpb25MaXN0Iiwibm9kZXMiLCJBcnJheSIsImZyb20iLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm4iLCJ0YWdOYW1lIiwiYyIsInN0ckRhdGEiLCJzdHJEZWxpbWl0ZXIiLCJvYmpQYXR0ZXJuIiwiYXJyRGF0YSIsImFyck1hdGNoZXMiLCJleGVjIiwic3RyTWF0Y2hlZERlbGltaXRlciIsInB1c2giLCJzdHJNYXRjaGVkVmFsdWUiLCJjb25maWciLCJkYk5hbWUiLCJ2ZXJzaW9uIiwibWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudCIsInN0b3JlIiwibmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIl93aW5kb3ciLCJhbGx0aW1lIiwic2Vzc2lvbiIsIkJlYWdsZURhdGFDb2xsZWN0aW9uV3JhcHBlciIsImluZGV4ZWREQiIsImluaXQiLCJvcGVuUmVxdWVzdCIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9sZFZlcnNpb24iLCJkZWxldGVPYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiaWR4IiwiY3JlYXRlSW5kZXgiLCJvbmVycm9yIiwib25zdWNjZXNzIiwiZGIiLCJkZWxldGVSZXF1ZXN0IiwiZGVsZXRlRGF0YWJhc2UiLCJyZWplY3QiLCJpbnRlcnZhbCIsInJlYWR3cml0ZSIsImdldENvbm5lY3Rpb24iLCJ0eCIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJkYXRhTmFtZSIsImRhdGFWYWx1ZSIsImluaXRUcmFuc2FjdGlvbiIsInNlc3Npb25JZCIsImdldEN1cnJlbnRTZXNzaW9uSWQiLCJ0aW1lIiwicm91bmQiLCJwYXlsb2FkIiwicHV0Iiwib3AiLCJzdG9yZWQiLCJnZXRDdXJzb3IiLCJjdXJzb3IiLCJ0YXJnZXQiLCJjb250aW51ZSIsIm1pbm1heCIsIk1hcCIsImhhcyIsInNldCIsImdyb3VwQnkiLCJkYXRhIiwiY291bnQiLCJ0b3RhbCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwib3BlbkN1cnNvciIsIklEQktleVJhbmdlIiwib25seSIsInRvU3RyaW5nIiwiaW5kZXhWYWx1ZSIsInN1bSIsInNpemUiLCJ2YWx1ZXMiLCJkIiwic2V0SG91cnMiLCJnZXRIb3VycyIsInBhZFN0YXJ0IiwiZ2V0RGF0ZSIsIkNvbGxlY3RvckFwaSIsImNvbGxlY3RvckFwaSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWUiLCJxdWVyeU1ldGhvZCIsInF1ZXJ5UHJvbWlzZSIsImF2ZyIsIm1vZGUiLCJsYXN0IiwiZGF0YVZhbHVlcyIsIm9iaiIsImRhdGFfdmFsdWUiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJzYXZlIiwiYmVhZ2xlSW5mb0xheWVyIiwiYSIsImYiLCJfX2h3bSIsInNlYXJjaFBhdGhzIiwiUGFnZVR5cGVEZXBlbmQiLCJtZXRob2QiLCJzZWxlY3RvciIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJvYnNlcnZlciIsImNoaWxkcmVuIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSIsImluZm9MYXllciIsInR5cGVkVmFsdWUiLCJsYXN0S2V5IiwicG9wIiwidXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciIsInBhc3NWYWx1ZVRvTGlzdGVuZXJzIiwiREFUQV9MSVNURU5FUlMiLCJhZGREYXRhTGlzdGVuZXIiLCJsaXN0ZW5lciIsImxpc3RlbmVycyIsImlzQXJyYXkiLCJnZXRGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYmxvY2tpbmciLCJwb2xsSW50ZXJ2YWwiLCJ0aW1lb3V0Iiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJzZWFyY2hFbGVtZW50IiwiaXNGb3VuZCIsImlzSWdub3JlIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwicXVlcnlTZWxlY3RvciIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwiZmlsdGVyIiwiTXV0YXRpb25PYnNlcnZlciIsInRyaWdnZXJSZXN0YXJ0Iiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJpbm5lclRleHQiLCJhdHRyaWJWYWx1ZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwidmFsdWVjaGlsZCIsImF0dHJpYlZhbHVlIiwiZ2V0QXR0cmlidXRlIiwic2V0VmFsdWUiLCJzdW1QcmljZSIsImNoaWxkVGV4dCIsImFycmF5SW5uZXJUZXh0IiwiZXhjbHVzaXZlRWxlbWVudCIsImN1c3RvbURhdGFEZXJpdmF0aW9ucyIsImN1cnJlbnRQYWdlVHlwZSIsImFsbCIsImlzQ2FydEVtcHR5IiwidG90YWxCYXNlUHJpY2UiLCJjb3Vwb25Ob3RBcHBsaWNhYmxlIiwicHJpY2VzIiwicXVhbnRpdGllcyIsInRvdGFsUHJpY2UiLCJjb3Vwb25BcHBsaWNhYmxlQW1vdW50Iiwic2t1Iiwic2t1TGlzdCIsInBhcnNlU2VhcmNoUGF0aHMiLCJkb21TdGF0dXMiLCJyZWFkeVN0YXRlIiwid2ludG9wIiwiZGF0YUxheWVyIiwid2luZG9jIiwiZm91bmROYW1lcyIsIlNldCIsInByZXZGb3VuZE5hbWVzIiwibm90Rm91bmROYW1lcyIsImFkZCIsInNlYXJjaEFuZFNldCIsImRhdGFMYXllckl0ZW0iLCJzb3JnQXJyYXlJbm5lciIsImdldFNPUkdBcnJheSIsInNvcmdJdGVtIiwiam9pbiIsInBhdGgiLCJwYXRoQXJyYXkiLCJzdWJQYXRoIiwic2xpY2UiLCJzdWJBcnJheSIsInN1YktleSIsInN1YlZhbHVlIiwid2luZG93UHRyIiwibmF2UHRyIiwicGxhdGZvcm0iLCJ1c2VyQWdlbnREYXRhIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImF2YWlsV2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwid2luZG93RGVwdGgiLCJjb2xvckRlcHRoIiwicGl4ZWxEZXB0aCIsInZwb3J0U2hhcGUiLCJ2aXN1YWxWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0IiwiaU9TIiwib3JpZW50YXRpb25BbmdsZSIsIm9yaWVudGF0aW9uIiwiYW5nbGUiLCJ0ZW1wIiwiaGlzdG9yeSIsIm5hdkFnZW50IiwiYnJhbmRzIiwiYnJhbmQiLCJtb2JpbGUiLCJoYXJkd2FyZUNvbmN1cnJlbmN5IiwibGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsInVzZXJMYW5ndWFnZSIsIm1heFRvdWNoUG9pbnRzIiwidmVuZG9yIiwiY29ubmVjdGlvbiIsImRvd25saW5rIiwiY3VycmVudFVSTCIsIlVSTCIsImhvc3RuYW1lIiwiZG9Ob3RUcmFjayIsIm1zRG9Ob3RUcmFjayIsInJlZmVycmVyIiwiZmlyc3RTZXNzaW9uUmVmZXJyZXIiLCJwYWdlVHlwZSIsInBlcmZNZXRyaWNzIiwicGVyZk5hdmlnYXRpb25NZXRyaWNzIiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlUeXBlIiwiY29ubmVjdCIsImNvbm5lY3RFbmQiLCJjb25uZWN0U3RhcnQiLCJyZXF1ZXN0IiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJkb20iLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwibG9hZCIsImxvYWRFdmVudEVuZCIsImxvYWRFdmVudFN0YXJ0IiwiZHVyYXRpb24iLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwidGV4dENvbnRlbnQiLCJqc29uY29udGVudCIsIkhFQURFUlMiLCJNb25pdG9yIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaGlnaFdhdGVyTWFyayIsImluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMiLCJpbW1lZGlhdGUiLCJwYWNrQW5kUXVldWVNYWluTG9nIiwicGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2ciLCJwYWNrYWdlTWFpbkxvZ0RhdGEiLCJyZXF1ZXN0QmxvYiIsImNoZWNrRm9yTGF0ZXN0Q2hhbmdlcyIsInF1ZXVlTG9ncyIsImhhc0NoYW5nZWQiLCJwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhIiwibG9nRGF0YSIsInBhY2thZ2VBcnJpdmFsTG9nRGF0YSIsImh3bSIsImNvb2tpZUdhSWQiLCJ2aWV3X2Vwb2NoIiwiYm9keSIsImxjIiwidSIsIm9uSGFzaFBjdCIsIkJsb2IiLCJzdGFydHNXaXRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJydWxlIiwib3BlcmF0b3IiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJzZWxlY3RvckZhbGxiYWNrIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiRnVuY3Rpb24iLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiaXNNb2JpbGUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJ0aW1lc3RhbXAiLCJjbGVhclJlcXVlc3QiLCJjbGVhciIsImdldFJlcXVlc3QiLCJjb3VudFJlcXVlc3QiLCJjdXJzb3JSZXF1ZXN0IiwiZXhpc3RpbmdQcm9kSW5mbyIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwiY2xlYXJQcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwiTXV0ZXgiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbiIsImNoYWluX2NvbmRpdGlvbiIsInJ1bGVzIiwic2F0aXNmaWVkUnVsZUlkcyIsInNldFVwTGlzdGVuZXJzIiwiYWNxdWlyZSIsInJlbGVhc2UiLCJpc0VsaWdpYmxlIiwiZmlsdGVyZWQiLCJrIiwiZGF0YUxheWVyUnVsZXMiLCJlbGVtZW50UnVsZXMiLCJib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJiaW5kIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImVsZW1lbnRUb09ic2VydmUiLCJwYXJlbnROb2RlIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50IiwicnVsZVNldCIsInNlZ21lbnRSdWxlRW5naW5lIiwiYnVzaW5lc3NSdWxlU2V0IiwiY2hlY2tSdWxlcyIsIlRyZWF0bWVudFJlcG9zaXRvcnkiLCJ1c2VyR3JvdXAiLCJ1c2VyR3JvdXBXZWlnaHRzIiwidHJlYXRtZW50IiwidHJlYXRtZW50c09iaiIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkRGF5cyIsIndlaWdodHMiLCJyZXBsYWNlciIsInJlcGxhY2VGbiIsInZhbCIsImN1cnJlbnRSZXBsYWNlRm4iLCJyZXBsYWNlT2JqZWN0RXh0cmFjdG9yIiwicmVwbGFjZVZhbCIsInJlcGxhY2VGbkV4ZWN1dG9yIiwickZuIiwic2luZ2xlIiwicmVwbGFjZUZ1bmN0aW9uIiwic3RvcmFnZSIsImtleUZhbGxiYWNrIiwiY2hlY2tBY3Rpb25Db25kaXRpb24iLCJhdHRyaWJ1dGUiLCJpbm5lcl9jb25kaXRpb24iLCJlbGlnaWJsZUVsZW1lbnRzIiwiY29uZGl0aW9uRWxlbWVudHMiLCJlbGVtZW50U2t1IiwiJCIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwiYXBwbHlFdmVudCIsImNvbnRlbnRTZWxlY3RvciIsIm1kQ29uZGl0aW9uIiwibW92ZV9zZWxlY3Rvcl8xIiwibW92ZV9zZWxlY3Rvcl8yIiwicFR5cGUiLCJwcm9kdWN0SW5mb1N0b3JhZ2UiLCJtYyIsIlN0cmluZyIsImJlZm9yZSIsImFmdGVyIiwiYXBwZW5kIiwib2ZmIiwiY3JlYXRlUG9wdXAiLCJlbG0iLCJzdG9wUHJvcGFnYXRpb24iLCJkaXNwbGF5TW9kYWwiLCJnZXRQcm9kdWN0SW5mbyIsImRpc3BsYXlQb3B1cCIsInIiLCJwdXNoU3RhdGUiLCJzdGF0ZSIsIm9uY2UiLCJodG1sIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm9yaWdpbmFsVGl0bGUiLCJ0aXRsZSIsImhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UiLCJjc3MiLCJwcm9wZXJ0eSIsInByb3BlcnR5VmFsdWUiLCJhdHRyIiwibjEiLCJuMiIsInN3YXBOb2RlcyIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwicHJlcGVuZCIsInNlbnRlbmNlIiwid29yZCIsImNoYXJBdCIsInRvTG9jYWxlVXBwZXJDYXNlIiwicmVwbGFjZVdpdGhWYWwiLCJodG1sU3RyIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJjb250YWlucyIsImhpZGUiLCJxUG9wdXAiLCJnZXRFbGVtZW50QnlJZCIsImlzTW9kYWwiLCJwb3B1cFdyYXBwZXIiLCJwb3B1cENsb3NlQnV0dG9uIiwicG9wdXBDbG9zZUJ1dHRvblN0eWxlIiwib25jbGljayIsImNvbnRlbnRzIiwic3JjIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJwb3B1cCIsImNvbnRlbnQiLCJmaXJzdENoaWxkIiwicDEiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJPQlNFUlZFUl9DT05GSUciLCJhdHRyaWJ1dGVzIiwiUm9ib3RFbmdpbmUiLCJkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyIsImRlYnVnTW9kZSIsIm1hdGNoZWRUcmVhdG1lbnRzIiwiZW5nYWdlbWVudExvY2siLCJyZUFwcGx5VHJlYXRtZW50c01hcCIsImFkZGVkRGF0YUxpc3RlbmVySWRzIiwiZW5nYWdlUm9ib3QiLCJpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCIsImVsaWdpYmlsaXR5UnVsZVNldCIsImRldmljZSIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInByZXBhcmVBbmRBcHBseSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCIsInQiLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyIsInByZXBhcmVkIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJSZXNpemVPYnNlcnZlciIsInJlYXBwbHlTZWxlY3Rvckxpc3QiLCJyZWFwcGx5X3NlbGVjdG9yIiwibGFzdFNjcm9sbFRpbWUiLCJnZXRUaW1lIiwic3QiLCJwYWdlWU9mZnNldCIsInJlYXBwbHlJbnRlcnZhbCIsImFwcGxpZWQiLCJib3VuZEVuZ2FnZVRyZWF0bWVudCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJwcmV2aW91c1NlbGVjdG9ycyIsImVsaWdpYmlsaXR5UnVsZSIsIm9wcG9zaXRlRmxhZyIsImVsaWdpYmlsaXR5U2NvcGUiLCJlbGlnaWJpbGl0eU5hbWUiLCJlbGlnaWJpbGl0eVNldFR5cGUiLCJwcmV2aW91c0lzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiYmVhZ2xlT24iLCJwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlIiwicGVyc2lzdFByb2R1Y3RJbmZvIiwiZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UiLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXMiLCJ0cmVhdG1lbnRzUHJvbWlzZSIsImdldFRyZWF0bWVudHMiLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJzZWFyY2hQYXJhbXMiLCJsYXN0SW5kZXhPZiIsIml0ZW0iLCJ0cmVhdG1lbnRSZXBvc2l0b3J5IiwiZ2V0TWF0Y2hlZFRyZWF0bWVudHMiLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsImdldEVsaWdpYmlsaXR5UnVsZXMiLCJydWxlRW5naW5lIiwiU0hVVERPV04iLCJGTElQRkxBRyIsIm1vbml0b3IiLCJlYXJseUxvZ1NlbnQiLCJoaWRlUmVtb3ZlZCIsImNvb2tpZVBjdCIsInBhY2tBbmRRdWV1ZUFycml2YWxMb2ciLCJwcm90b3R5cGUiLCJHTE9WX09OIiwiaXNMYWJlbFNlbnQiLCJ0aW1lb3V0Q291bnRlciIsImlzU2hvd3Jvb20iLCJpc09uIiwic2VuZExvZ3MiXSwic291cmNlUm9vdCI6IiJ9
