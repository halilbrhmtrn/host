/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 61:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

    var _typeof = (__webpack_require__(698)["default"]);
    function _regeneratorRuntime() {
      "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
      module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
      var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        defineProperty = Object.defineProperty || function (obj, key, desc) {
          obj[key] = desc.value;
        },
        $Symbol = "function" == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
          value: value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function define(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
          generator = Object.create(protoGenerator.prototype),
          context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
          value: makeInvokeMethod(innerFn, self, context)
        }), generator;
      }
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      exports.wrap = wrap;
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });
      var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if ("throw" !== record.type) {
            var result = record.arg,
              value = result.value;
            return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            }) : PromiseImpl.resolve(value).then(function (unwrapped) {
              result.value = unwrapped, resolve(result);
            }, function (error) {
              return invoke("throw", error, resolve, reject);
            });
          }
          reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
          value: function value(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }
            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method,
          method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
      }
      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [{
          tryLoc: "root"
        }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) return iteratorMethod.call(iterable);
          if ("function" == typeof iterable.next) return iterable;
          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                for (; ++i < iterable.length;) {
                  if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                }
                return next.value = undefined, next.done = !0, next;
              };
            return next.next = next;
          }
        }
        return {
          next: doneResult
        };
      }
      function doneResult() {
        return {
          value: undefined,
          done: !0
        };
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
      }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
      }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
      }, exports.mark = function (genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
      }, exports.awrap = function (arg) {
        return {
          __await: arg
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
        return this;
      }), define(Gp, "toString", function () {
        return "[object Generator]";
      }), exports.keys = function (val) {
        var object = Object(val),
          keys = [];
        for (var key in object) {
          keys.push(key);
        }
        return keys.reverse(), function next() {
          for (; keys.length;) {
            var key = keys.pop();
            if (key in object) return next.value = key, next.done = !1, next;
          }
          return next.done = !0, next;
        };
      }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
            "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
          }
        },
        stop: function stop() {
          this.done = !0;
          var rootRecord = this.tryEntries[0].completion;
          if ("throw" === rootRecord.type) throw rootRecord.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) throw exception;
          var context = this;
          function handle(loc, caught) {
            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i],
              record = entry.completion;
            if ("root" === entry.tryLoc) return handle("end");
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc"),
                hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              } else {
                if (!hasFinally) throw new Error("try statement without catch or finally");
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
          var record = finallyEntry ? finallyEntry.completion : {};
          return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if ("throw" === record.type) throw record.arg;
          return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if ("throw" === record.type) {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          return this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
      }, exports;
    }
    module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
    
    /***/ }),
    
    /***/ 698:
    /***/ (function(module) {
    
    function _typeof(obj) {
      "@babel/helpers - typeof";
    
      return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
    }
    module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
    
    /***/ }),
    
    /***/ 687:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    // TODO(Babel 8): Remove this file.
    
    var runtime = __webpack_require__(61)();
    module.exports = runtime;
    
    // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
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
    var regenerator = __webpack_require__(687);
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
    ;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js
    
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    ;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
    
    
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }
    ;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
    
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
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
    var VERSION = "0.0.40.6";
    var COOKIE_NAME = "_ga";
    var TREATMENTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
    var TREATMENT_WEIGHTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
    var STYLESHEET_LOCATION = isStaging ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
    var E_RULES_LOCATION = isStaging ? "https://ndvivense.glov.ai/eligibility_rules_staging.json" : "https://ndvivense.glov.ai/eligibility_rules.json";
    var PRODUCT_INFO_LOCATION = "https://ndvivense.glov.ai/social-proof-v2.json";
    var LOG_API_URL = "https://europe-west3-nextday-34eb3.cloudfunctions.net/api/log";
    var LOOKUP_API_URL = "https://catalog-api.adoraai.com";
    var MOBILE_MEDIA_QUERY = "(max-width: 440px)";
    // Control group percentage
    var SPLIT_RATIO = 50;
    // Skipped treatment percentage
    var TREATMENT_RATIO = 50;
    var LOCAL_STORAGE_TTL_HOURS = 2;
    var MAX_TIMEOUT_PER_SESSION = 1;
    var LIST_MODE_BEAGLE_KEYS = (/* unused pure expression or super */ null && (["pagetype", "category", "alltimePLPCategoryMode", "sessionPLPCategoryMode", "alltimePDPCategoryMode", "sessionPDPCategoryMode", "alltimeCartCategoryMode", "sessionCartCategoryMode"]));
    var IDLE_TIMEOUT = 15000;
    var SESSION_STORAGE_KEYS = {
      SESSION_TIMESTAMP: "BG_SessionTimestamp",
      SESSION_HISTORY: "BG_SessionHistory",
      POPUP_DISPLAY_FLAG: "BG_PopupDisplayFlag",
      SKU_INFO_BASKET: "BG_ProductInfoBasket",
      TIMEOUT_COUNT: "BG_TimeoutCount",
      SESSION_REFERRER: "BG_SessionReferrer",
      MATCHED_TREATMENTS: "GLV_Matched",
      IS_LABEL_SENT: "BG_LabelSent"
    };
    var LOCAL_STORAGE_KEYS = {
      TREATMENTS: "BG_Treatments",
      WEIGHTS: "BG_Weights",
      ELIGIBILITY_RULES: "BG_E_Rules",
      DEBUG_MODE: "BG_Debug",
      OUT_OF_SCOPE: "GLV_OutOfScope_00",
      USER_ID: "BG_UserId_01",
      DATA_COLLECTION_DATA_SIZE: "BG_CollectionDataSize",
      IS_ADMIN: "GLV_IsAdmin"
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
      var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
      if (null != _i) {
        var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;
        try {
          if (_x = (_i = _i.call(arr)).next, 0 === i) {
            if (Object(_i) !== _i) return;
            _n = !1;
          } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
            ;
          }
        } catch (err) {
          _d = !0, _e = err;
        } finally {
          try {
            if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
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
      key = _toPropertyKey(key);
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
      window.top.document.documentElement.classList.remove("glov-ease");
      window.top.document.documentElement.classList.remove("glov-hide");
    };
    var switchToEaseOut = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var el;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (window.top.document.documentElement.classList.contains("glov-hide")) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                el = document.createElement("style");
                el.textContent = ".glov-ease {\n    -webkit-animation: smooth 2s ease-in;\n    -moz-animation: smooth 2s ease-in;\n    -o-animation: smooth 2s ease-in;\n    -ms-animation: smooth 2s ease-in;\n    animation: smooth 2s ease-in;\n  }\n  \n  @keyframes smooth {\n    0% { opacity: 0; filter: grayscale(100%)}\n    25% { opacity: 0.10; filter: grayscale(100%)}\n    50% { opacity: 0.25; filter: grayscale(100%)}\n    75% { opacity: 0.50; filter: grayscale(100%)}\n    90% { opacity: 0.75; filter: grayscale(100%)}\n    100% { opacity: 1; filter: grayscale(0%);}\n  }\n  @-webkit-keyframes smooth {\n    0% { opacity: 0; -webkit-filter: grayscale(100%);}\n    25% { opacity: 0.10; -webkit-filter: grayscale(100%);}\n    50% { opacity: 0.25; -webkit-filter: grayscale(100%);}\n    75% { opacity: 0.50; -webkit-filter: grayscale(100%);}\n    90% { opacity: 0.75; -webkit-filter: grayscale(100%);}\n    100% { opacity: 1; -webkit-filter: grayscale(0%);}\n  }";
                window.top.document.documentElement.prepend(el);
                window.top.document.documentElement.classList.add("glov-ease");
                window.top.document.documentElement.classList.remove("glov-hide");
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function switchToEaseOut() {
        return _ref.apply(this, arguments);
      };
    }();
    var fetchTreatments = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var treatments, jsonTreatment;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                logger.log("Fetching treatments");
                _context2.next = 4;
                return fetchPlus(TREATMENTS_LOCATION);
              case 4:
                treatments = _context2.sent;
                if (treatments) {
                  _context2.next = 7;
                  break;
                }
                throw new Error();
              case 7:
                _context2.next = 9;
                return treatments.json();
              case 9:
                jsonTreatment = _context2.sent;
                return _context2.abrupt("return", jsonTreatment);
              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                logger.failed("Could not fetch treatments", _context2.t0.message);
                return _context2.abrupt("return", null);
              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));
      return function fetchTreatments() {
        return _ref2.apply(this, arguments);
      };
    }();
    var fetchTreatmentWeights = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var treatmentWeights, jsonTreatmentWeights;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                logger.log("Fetching treatment weights");
                _context3.next = 4;
                return fetchPlus(TREATMENT_WEIGHTS_LOCATION);
              case 4:
                treatmentWeights = _context3.sent;
                if (treatmentWeights) {
                  _context3.next = 7;
                  break;
                }
                throw new Error();
              case 7:
                _context3.next = 9;
                return treatmentWeights.json();
              case 9:
                jsonTreatmentWeights = _context3.sent;
                return _context3.abrupt("return", jsonTreatmentWeights);
              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                logger.failed("Could not fetch treatment weights", _context3.t0.message);
                return _context3.abrupt("return", null);
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }));
      return function fetchTreatmentWeights() {
        return _ref3.apply(this, arguments);
      };
    }();
    var fetchEligibilityRules = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var eligibilityRules, jsonEligibilityRules;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                logger.log("Fetching eligibility rules");
                _context4.next = 4;
                return fetchPlus(E_RULES_LOCATION);
              case 4:
                eligibilityRules = _context4.sent;
                if (eligibilityRules) {
                  _context4.next = 7;
                  break;
                }
                throw new Error();
              case 7:
                _context4.next = 9;
                return eligibilityRules.json();
              case 9:
                jsonEligibilityRules = _context4.sent;
                return _context4.abrupt("return", jsonEligibilityRules);
              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](0);
                logger.failed("Could not fetch eligibility rules", _context4.t0.message);
                return _context4.abrupt("return", null);
              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 13]]);
      }));
      return function fetchEligibilityRules() {
        return _ref4.apply(this, arguments);
      };
    }();
    var fetchProductInfo = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var productInfo, productInfoJson;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                logger.log("Fetching product info");
                _context5.next = 4;
                return fetchPlus(PRODUCT_INFO_LOCATION);
              case 4:
                productInfo = _context5.sent;
                if (productInfo) {
                  _context5.next = 7;
                  break;
                }
                throw new Error();
              case 7:
                _context5.next = 9;
                return productInfo.json();
              case 9:
                productInfoJson = _context5.sent;
                return _context5.abrupt("return", productInfoJson);
              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](0);
                logger.failed("Could not fetch product info", _context5.t0.message);
                return _context5.abrupt("return", null);
              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 13]]);
      }));
      return function fetchProductInfo() {
        return _ref5.apply(this, arguments);
      };
    }();
    var utils_timeout = function timeout(time) {
      var controller = new AbortController();
      var timeoutID = setTimeout(function () {
        return controller.abort();
      }, time);
      return {
        controller: controller,
        timeoutID: timeoutID
      };
    };
    var fetchPlus = function fetchPlus(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var retries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
      var _timeout = utils_timeout(5000),
        controller = _timeout.controller,
        timeoutID = _timeout.timeoutID;
      return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        signal: controller.signal
      })).then(function (res) {
        if (res.ok) {
          clearTimeout(timeoutID);
          return res;
        }
        if (retries > 0) {
          clearTimeout(timeoutID);
          return fetchPlus(url, options, retries - 1);
        }
        throw new Error(res.status);
      }).catch(function (error) {
        if (retries > 0) {
          logger.failed("Fetch timed out Retrying...: ", error.message);
          clearTimeout(timeoutID);
          return fetchPlus(url, options, retries - 1);
        }
        logger.failed("Fetch failed: ", error.message);
        clearTimeout(timeoutID);
        return null;
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
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(identifier) {
        var now, month, hash, pct;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                if (identifier) {
                  _context6.next = 3;
                  break;
                }
                return _context6.abrupt("return", null);
              case 3:
                // TODO: add month of year to hash to reset it every month
                now = new Date();
                month = now.getMonth();
                hash = getUnsecureHash(identifier + month.toString());
                if (!(hash === null)) {
                  _context6.next = 8;
                  break;
                }
                return _context6.abrupt("return", null);
              case 8:
                pct = hash % 100;
                if (!(pct >= 0 && pct < 100)) {
                  _context6.next = 11;
                  break;
                }
                return _context6.abrupt("return", pct);
              case 11:
                return _context6.abrupt("return", null);
              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](0);
                logger.error(_context6.t0);
                return _context6.abrupt("return", null);
              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 14]]);
      }));
      return function determinePct(_x) {
        return _ref6.apply(this, arguments);
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
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7() {
        var styleSheet;
        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                styleSheet = window.top.document.createElement("link");
                styleSheet.rel = "stylesheet";
                styleSheet.type = "text/css";
                styleSheet.href = STYLESHEET_LOCATION;
                window.top.document.head.appendChild(styleSheet);
              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      return function injectStyleSheet() {
        return _ref7.apply(this, arguments);
      };
    }();
    var prepareActions = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8(identifier, actionsToPrepare, businessRuleId, debugMode) {
        var actions, variant, _iterator, _step, action, businessRuleTransformations, variants, _iterator2, _step2, businessTransformation, key, _iterator3, _step3, _step3$value, index, variantKey, randomPct, _iterator4, _step4, _businessTransformation, _i2, _Object$keys, _key, _key2;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                actions = JSON.parse(JSON.stringify(actionsToPrepare));
                variant = null;
                _iterator = _createForOfIteratorHelper(actions);
                _context8.prev = 3;
                _iterator.s();
              case 5:
                if ((_step = _iterator.n()).done) {
                  _context8.next = 65;
                  break;
                }
                action = _step.value;
                businessRuleTransformations = action.businessRuleTransformations, variants = action.variants;
                if (!(!businessRuleTransformations && !variants)) {
                  _context8.next = 10;
                  break;
                }
                return _context8.abrupt("continue", 63);
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
                  _context8.next = 63;
                  break;
                }
                _iterator3 = _createForOfIteratorHelper(Object.keys(variants).entries());
                _context8.prev = 13;
                _iterator3.s();
              case 15:
                if ((_step3 = _iterator3.n()).done) {
                  _context8.next = 55;
                  break;
                }
                _step3$value = _slicedToArray(_step3.value, 2), index = _step3$value[0], variantKey = _step3$value[1];
                _context8.next = 19;
                return determinePct(identifier + variantKey);
              case 19:
                randomPct = _context8.sent;
                if (debugMode && !action.variants[variantKey].weight) {
                  action.variants[variantKey].weight = Math.floor(100 / Object.keys(variants).length) * (index + 1);
                }
                if (!(randomPct < action.variants[variantKey].weight)) {
                  _context8.next = 53;
                  break;
                }
                variant = variantKey;
                if (!(businessRuleId !== null && variants[variantKey].businessRuleTransformations)) {
                  _context8.next = 51;
                  break;
                }
                _iterator4 = _createForOfIteratorHelper(variants[variantKey].businessRuleTransformations);
                _context8.prev = 25;
                _iterator4.s();
              case 27:
                if ((_step4 = _iterator4.n()).done) {
                  _context8.next = 41;
                  break;
                }
                _businessTransformation = _step4.value;
                if (!(_businessTransformation.id == businessRuleId)) {
                  _context8.next = 39;
                  break;
                }
                _i2 = 0, _Object$keys = Object.keys(_businessTransformation);
              case 31:
                if (!(_i2 < _Object$keys.length)) {
                  _context8.next = 39;
                  break;
                }
                _key = _Object$keys[_i2];
                if (!(_key === "id")) {
                  _context8.next = 35;
                  break;
                }
                return _context8.abrupt("continue", 36);
              case 35:
                action[_key] = _businessTransformation[_key];
              case 36:
                _i2++;
                _context8.next = 31;
                break;
              case 39:
                _context8.next = 27;
                break;
              case 41:
                _context8.next = 46;
                break;
              case 43:
                _context8.prev = 43;
                _context8.t0 = _context8["catch"](25);
                _iterator4.e(_context8.t0);
              case 46:
                _context8.prev = 46;
                _iterator4.f();
                return _context8.finish(46);
              case 49:
                _context8.next = 52;
                break;
              case 51:
                for (_key2 in variants[variantKey]) {
                  if (_key2 !== "weight" && _key2 !== "businessRuleTransformations") {
                    action[_key2] = variants[variantKey][_key2];
                  }
                }
              case 52:
                return _context8.abrupt("break", 55);
              case 53:
                _context8.next = 15;
                break;
              case 55:
                _context8.next = 60;
                break;
              case 57:
                _context8.prev = 57;
                _context8.t1 = _context8["catch"](13);
                _iterator3.e(_context8.t1);
              case 60:
                _context8.prev = 60;
                _iterator3.f();
                return _context8.finish(60);
              case 63:
                _context8.next = 5;
                break;
              case 65:
                _context8.next = 70;
                break;
              case 67:
                _context8.prev = 67;
                _context8.t2 = _context8["catch"](3);
                _iterator.e(_context8.t2);
              case 70:
                _context8.prev = 70;
                _iterator.f();
                return _context8.finish(70);
              case 73:
                return _context8.abrupt("return", [actions, variant]);
              case 74:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[3, 67, 70, 73], [13, 57, 60, 63], [25, 43, 46, 49]]);
      }));
      return function prepareActions(_x2, _x3, _x4, _x5) {
        return _ref8.apply(this, arguments);
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
    };
    
    // get GA client id using ga.getAll()
    var getGaClientId = function getGaClientId() {
      var ga = window.ga;
      // if ga and ga.getAll() is not defined, return null
      if (ga && ga.getAll) {
        var trackers = ga.getAll();
        if (trackers && trackers.length) {
          return trackers[0].get("clientId");
        }
      }
      return null;
    };
    
    // get deterministic numeric hash from string that contains only numbers
    var getUnsecureHash = function getUnsecureHash(str) {
      // start with a magic number, use pi digits
      var hash = 314159265;
      if (typeof str !== "string") {
        // make it string
        str = str.toString();
      }
      if (str.length === 0) {
        return null;
      }
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      // return absolute value
      return Math.abs(hash);
    };
    
    // generate a 32-bit random integer
    var getRandomInt = function getRandomInt() {
      return Math.floor(Math.random() * 0x100000000);
    };
    
    // get current unix epoch time in seconds
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
            }, 10);
            setTimeout(function () {
              clearInterval(extractIdentifierInterval);
              if (id === null || id === undefined) {
                logger.failed("Could not read GA client id");
                resolve(null);
              }
            }, 2000);
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
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9(timeOut, callBack) {
        var idleTimeout, resetTimer;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                resetTimer = function _resetTimer() {
                  clearTimeout(idleTimeout);
                  idleTimeout = setTimeout(callBack, timeOut);
                };
                idleTimeout = setTimeout(callBack, timeOut);
                window.top.document.ontouchstart = resetTimer;
              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
      return function idleTimer(_x6, _x7) {
        return _ref9.apply(this, arguments);
      };
    }();
    var isOwnMutation = function isOwnMutation(mutationList) {
      var nodes = [].concat(_toConsumableArray(Array.from(mutationList[0].addedNodes)), _toConsumableArray(Array.from(mutationList[0].removedNodes)));
      return nodes.some(function (n) {
        var _n$id;
        return n.tagName && (((_n$id = n.id) === null || _n$id === void 0 ? void 0 : _n$id.includes("bn-")) || Array.from(n.classList).some(function (c) {
          return c.includes("bn-") || c.includes("nd-");
        }));
      });
    };
    var setAgentDetails = function setAgentDetails() {
      var ua = navigator.userAgent;
    
      // extract browser and version
      var br = ua.match(/(opera|edg|trident|firefox|msie(?=\/))\/?\s*(\d+)/i) || ua.match(/(safari|chrome(?=\/))\/?\s*(\d+)/i) || ua.match(/(webkit(?=\/))\/?\s*(\d+)/i) || [];
      if (!br || br.length < 3) return false;
      var bName = br[1];
      var bVersion = br[2];
      var os = {
        Windows: /Win/i.test(ua),
        Mac: /Mac/i.test(ua),
        Linux: /Linux/i.test(ua),
        Android: /Android/i.test(ua),
        iOS: /iPhone|iPad|iPod/i.test(ua)
      };
    
      // extract OS and version
      var osVersion = "";
      var osName = "";
      if (os.Windows) {
        osName = "Windows";
        osVersion = ua.match(/Windows NT ([0-9.]+)/);
        osVersion = osVersion ? osVersion[1] : "unknown";
      } else if (os.iOS) {
        osName = "iOS";
        osVersion = ua.match(/OS ([0-9_]+)/);
        osVersion = osVersion ? osVersion[1].replace(/_/g, ".") : "unknown";
      } else if (os.Mac) {
        osName = "Mac";
        osVersion = ua.match(/Mac OS X ([0-9_]+)/);
        osVersion = osVersion ? osVersion[1].replace(/_/g, ".") : "unknown";
      } else if (os.Android) {
        osName = "Android";
        osVersion = ua.match(/Android ([0-9.]+)/);
        osVersion = osVersion ? osVersion[1] : "unknown";
      } else if (os.Linux) {
        osName = "Linux";
        osVersion = ua.match(/Linux ([i\d]+)/);
        osVersion = osVersion ? osVersion[1] : "unknown";
      }
    
      // extract mobile or desktop
      var isMobile = /Mobi/i.test(ua);
      addToBeagleInfoLayer("device.browserName", bName);
      addToBeagleInfoLayer("device.browserVersion", bVersion);
      addToBeagleInfoLayer("device.osName", osName);
      addToBeagleInfoLayer("device.osVersion", osVersion);
      addToBeagleInfoLayer("device.isMobile", isMobile);
      var isSupportedBrowser = bName === "Chrome" || bName === "Safari";
      var isSupportedOS = osName === "Mac" || osName === "Windows" || osName === "Android" || osName === "iOS";
      return isSupportedBrowser && isSupportedOS;
    };
    var setURLData = function setURLData() {
      var currentURL = new URL(window.top.location.href);
      addToBeagleInfoLayer("u", currentURL.href);
      addToBeagleInfoLayer("d", currentURL.hostname);
    
      /* Vivense specific */
      var pageType;
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
    };
    
    /**
     * Work around Safari 14 IndexedDB open bug.
     *
     * Safari has a horrible bug where IDB requests can hang while the browser is starting up. https://bugs.webkit.org/show_bug.cgi?id=226547
     * The only solution is to keep nudging it until it's awake.
     */
    var idbReady = function idbReady() {
      var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
    
      // No point putting other browsers or older versions of Safari through this mess.
      if (!isSafari || !indexedDB.databases) return Promise.resolve();
      var intervalId;
      return new Promise(function (resolve) {
        var tryIdb = function tryIdb() {
          return indexedDB.databases().finally(resolve());
        };
        intervalId = setInterval(tryIdb, 50);
        tryIdb();
      }).finally(function () {
        return clearInterval(intervalId);
      });
    };
    ;// CONCATENATED MODULE: ./src/BeagleInfoLayer/collector.js
    
    
    /* eslint-disable max-len */
    
    
    var collector_logger = new src_logger("GlovInfoLayer");
    var LS_Prefix = "GLDC_";
    var updateInCollector = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(baseFeatureName, baseFeatureValue, updateMethod) {
        var featureKey, opKey, _i, _arr, storage, value, _i2, _arr2, _storage, _value, _i3, _arr3, _storage2, _value2, _i4, _arr4, _storage3, valHash, opKeyVal, opKeyValName, _i5, _arr5, _storage4, _value3;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                collector_logger.log("updateInCollector", baseFeatureName, baseFeatureValue, updateMethod);
    
                // remove dots in baseFeatureName and add prefix
                featureKey = LS_Prefix + baseFeatureName.replace(/\./g, "_");
                opKey = featureKey + "_" + updateMethod;
                _context.t0 = updateMethod;
                _context.next = _context.t0 === "min" ? 7 : _context.t0 === "max" ? 7 : _context.t0 === "sum" ? 9 : _context.t0 === "cnt" ? 11 : _context.t0 === "last" ? 13 : _context.t0 === "valcnts" ? 15 : 21;
                break;
              case 7:
                // compute min and max for local and session storages
    
                for (_i = 0, _arr = [localStorage, sessionStorage]; _i < _arr.length; _i++) {
                  storage = _arr[_i];
                  value = storage.getItem(opKey);
                  if (value) {
                    storage.setItem(opKey, Math[updateMethod](value, baseFeatureValue));
                  } else {
                    storage.setItem(opKey, baseFeatureValue);
                  }
                }
                return _context.abrupt("break", 22);
              case 9:
                // compute sum and count for local and session storages
                for (_i2 = 0, _arr2 = [localStorage, sessionStorage]; _i2 < _arr2.length; _i2++) {
                  _storage = _arr2[_i2];
                  _value = _storage.getItem(opKey);
                  if (_value) {
                    _storage.setItem(opKey, parseFloat(_value) + parseFloat(baseFeatureValue));
                  } else {
                    _storage.setItem(opKey, baseFeatureValue);
                  }
                }
                return _context.abrupt("break", 22);
              case 11:
                // compute count for local and session storages
                for (_i3 = 0, _arr3 = [localStorage, sessionStorage]; _i3 < _arr3.length; _i3++) {
                  _storage2 = _arr3[_i3];
                  _value2 = _storage2.getItem(opKey);
                  if (_value2) {
                    _storage2.setItem(opKey, parseInt(_value2) + 1);
                  } else {
                    _storage2.setItem(opKey, 1);
                  }
                }
                return _context.abrupt("break", 22);
              case 13:
                // compute last obtained value in local and session storages
                for (_i4 = 0, _arr4 = [localStorage, sessionStorage]; _i4 < _arr4.length; _i4++) {
                  _storage3 = _arr4[_i4];
                  _storage3.setItem(opKey, baseFeatureValue);
                }
                return _context.abrupt("break", 22);
              case 15:
                // compute count of each value for local and session storages
                // create a 8 bytes hex hash for baseFeatureValue, only positive numbers
                valHash = getUnsecureHash(baseFeatureValue);
                opKeyVal = opKey + "_" + valHash;
                opKeyValName = opKey + "_" + valHash + "_name";
                localStorage.setItem(opKeyValName, baseFeatureValue);
                for (_i5 = 0, _arr5 = [localStorage, sessionStorage]; _i5 < _arr5.length; _i5++) {
                  _storage4 = _arr5[_i5];
                  _value3 = _storage4.getItem(opKeyVal);
                  if (_value3) {
                    _storage4.setItem(opKeyVal, parseInt(_value3) + 1);
                  } else {
                    _storage4.setItem(opKeyVal, 1);
                  }
                }
                return _context.abrupt("break", 22);
              case 21:
                return _context.abrupt("break", 22);
              case 22:
                _context.next = 27;
                break;
              case 24:
                _context.prev = 24;
                _context.t1 = _context["catch"](0);
                collector_logger.error("Error in updateInCollector", baseFeatureName, baseFeatureValue, updateMethod, _context.t1);
              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 24]]);
      }));
      return function updateInCollector(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();
    var queryInCollector = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(baseFeatureName, queryMethod, window) {
        var featureKey, opKey, storage, localKeys, localKeysFiltered, sum, maxCount, maxVal;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                collector_logger.log("queryInCollector", baseFeatureName, queryMethod, window);
                featureKey = LS_Prefix + baseFeatureName.replace(/\./g, "_");
                storage = null;
                if (!(window === "alltime")) {
                  _context2.next = 8;
                  break;
                }
                storage = localStorage;
                _context2.next = 14;
                break;
              case 8:
                if (!(window === "session")) {
                  _context2.next = 12;
                  break;
                }
                storage = sessionStorage;
                _context2.next = 14;
                break;
              case 12:
                collector_logger.error("Invalid window type", window);
                return _context2.abrupt("return", null);
              case 14:
                _context2.t0 = queryMethod;
                _context2.next = _context2.t0 === "min" ? 17 : _context2.t0 === "max" ? 17 : _context2.t0 === "sum" ? 17 : _context2.t0 === "last" ? 17 : _context2.t0 === "cntvals" ? 19 : _context2.t0 === "sumvals" ? 19 : _context2.t0 === "mode" ? 19 : 34;
                break;
              case 17:
                opKey = featureKey + "_" + queryMethod;
                return _context2.abrupt("return", storage.getItem(opKey));
              case 19:
                opKey = featureKey + "_valcnts";
                localKeys = Object.keys(storage);
                localKeysFiltered = localKeys.filter(function (key) {
                  return key.indexOf(opKey) === 0 && key.indexOf("_name") === -1;
                });
                if (!(queryMethod === "cntvals")) {
                  _context2.next = 26;
                  break;
                }
                return _context2.abrupt("return", localKeysFiltered.length);
              case 26:
                if (!(queryMethod === "sumvals")) {
                  _context2.next = 30;
                  break;
                }
                sum = 0;
                localKeysFiltered.forEach(function (key) {
                  sum += parseInt(storage.getItem(key));
                });
                return _context2.abrupt("return", sum);
              case 30:
                maxCount = null;
                maxVal = null;
                localKeysFiltered.forEach(function (key) {
                  var val = parseInt(storage.getItem(key));
                  if (maxVal === null || maxCount === null || maxCount < val) {
                    maxCount = val;
                    // names are only in local storage
                    maxVal = localStorage.getItem(key + "_name");
                  }
                });
                return _context2.abrupt("return", maxVal);
              case 34:
                return _context2.abrupt("return", null);
              case 35:
                _context2.next = 41;
                break;
              case 37:
                _context2.prev = 37;
                _context2.t1 = _context2["catch"](0);
                collector_logger.error("Error in queryInCollector", baseFeatureName, queryMethod, window, _context2.t1);
                return _context2.abrupt("return", null);
              case 41:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 37]]);
      }));
      return function queryInCollector(_x4, _x5, _x6) {
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
    var BeagleInfoLayer_logger = new src_logger("GlovInfoLayer");
    
    // TODO: convert to name --> array of selectors
    var searchPaths = [
    // ----------------------------------------------------------------------------------------------------------------------------------------------
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
    },
    // ----------------------------------------------------------------------------------------------------------------------------------------------
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
    },
    // Note that sequential search will mark copuonNotApplicable as found
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
      PageTypeDepend: "Productpage",
      method: "DocQuery",
      selector: "span.price",
      name: "pdp.price",
      operand: "docQueryInnerText",
      formatter: "numericOnly"
    }, {
      PageTypeDepend: "Productpage",
      method: "DocQuery",
      selector: "#sales-price",
      name: "pdp.price",
      operand: "docQueryInnerText",
      formatter: "numericOnly"
    }, {
      PageTypeDepend: "Productpage",
      method: "DocQuery",
      selector: "div.product-price-box",
      name: "__priceObserver",
      children: ["pdp.price"],
      operand: "docQueryObserve"
    }, {
      PageTypeDepend: "Productpage",
      method: "DocQuery",
      selector: "#mobile-product-sticky",
      name: "__priceObserver",
      children: ["pdp.price"],
      operand: "docQueryObserve"
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
    },
    // Note that sequential search will mark couponApplicable as found
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
    },
    // Desktop observer for the right panel, as it is the one changing
    {
      PageTypeDepend: "basket",
      method: "DocQuery",
      selector: ".cart-right-container",
      name: "__checkoutFormObserver",
      children: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "cart.isempty", "cart.couponApplicableAmount"],
      operand: "docQueryObserve"
    },
    // Mobile observer for the full form block as it is completely replaced
    {
      PageTypeDepend: "basket",
      method: "DocQuery",
      selector: "#checkoutForm",
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
    },
    // ----------------------------------------------------------------------------------------------------------------------------------------------
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
    },
    // ----------------------------------------------------------------------------------------------------------------------------------------------
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
        updateMethod: "valcnts"
      }, {
        queryMethod: "sumvals",
        window: "session",
        featureName: "history.PageType_count_session"
      }, {
        queryMethod: "sumvals",
        window: "alltime",
        featureName: "history.PageType_count_alltime"
      }],
      "cart.couponApplicableAmount": [{
        updateMethod: "last"
      }, {
        queryMethod: "last",
        window: "session",
        featureName: "__features.lastCartCouponApplicable"
      }],
      "pdp.category": [{
        updateMethod: "valcnts"
      }, {
        updateMethod: "last"
      }, {
        queryMethod: "mode",
        window: "session",
        featureName: "history.pdp_category_mode_session"
      }, {
        queryMethod: "last",
        window: "session",
        featureName: "history.pdp_category_last_session"
      }],
      "cart.skus": [{
        updateMethod: "last"
      }, {
        queryMethod: "last",
        window: "session",
        featureName: "__features.SKUsonLastCartView"
      }]
    };
    var increaseBeagleInfoLayerHWM = function increaseBeagleInfoLayerHWM() {
      var infoLayer = window.top.beagleInfoLayer;
      // update hwm to indicate change
      infoLayer.__hwm += 1;
    };
    var addToBeagleInfoLayer = function addToBeagleInfoLayer(key, value) {
      var infoLayer = window.top.beagleInfoLayer;
      if (key === null || key === undefined) return;
      // if value is string, add as a clean string, if object add the same
      var typedValue = typeof value === "string" ? value.toString().trim() : value;
      // if key contains . create nested object
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
      }
      // update hwm to indicate change
      increaseBeagleInfoLayerHWM();
      // process dependent historical data for scan-found elements
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
      var infoLayer = window.top.beagleInfoLayer;
      // return null if key is missing or not an array or has no elements
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
          }, pollInterval);
          // add timeout
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
      if (key === null || key === undefined) return;
      // remove key from infoLayer
      if (key.indexOf(".") > -1) {
        var keys = key.split(".");
        var lastKey = keys.pop();
        var obj = infoLayer;
        keys.forEach(function (key) {
          if (!obj[key]) return;
          obj = obj[key];
        });
        BeagleInfoLayer_logger.log("removeFromBeagleInfoLayer", "Removing key: ".concat(lastKey));
        delete obj[lastKey];
      } else {
        delete infoLayer[key];
      }
      increaseBeagleInfoLayerHWM();
      // process dependent historical data for scan-found elements
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
                prepareCoreData();
    
                // Trigger-start the parser loop
                parserCaller();
    
                // Add metrics
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
              searchElement.isFound = true;
              // update found status of the elements in the children list
              var toBeUpdated = [];
              searchElement.children.forEach(function (child) {
                var childElements = searchPaths.filter(function (element) {
                  return element.name === child;
                });
                // add childElements into toBeUpdated
                toBeUpdated.push.apply(toBeUpdated, _toConsumableArray(childElements));
              });
              // run only if the element has added or removed children
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
          searchElement.isFound = true;
    
          // mark exclusive elements as found
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
                }
    
                // Loop through search lists and mark found names
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
    };
    
    // parse source
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
    }();
    
    // Extract value from json object using given path
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
        var windowPtr, navPtr, platform, availWindow, windowDepth, vportShape, width, height, iOS, _windowPtr$screen5, _windowPtr$screen5$or, orientationAngle, temp, _navPtr$userAgentData, _navPtr$userAgentData2, _navPtr$userAgentData3, navAgent, firstSessionReferrer;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                windowPtr = window.top;
                navPtr = windowPtr.navigator;
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
                addToBeagleInfoLayer("device.navHistSize", (_windowPtr$history = windowPtr.history) === null || _windowPtr$history === void 0 ? void 0 : _windowPtr$history.length);
    
                // check if userAgentData is supported and userAgent is not available, use it
                if (!navPtr.userAgent) {
                  if (navPtr.userAgentData) {
                    // turn brands array into string
                    navAgent = navPtr === null || navPtr === void 0 ? void 0 : (_navPtr$userAgentData = navPtr.userAgentData) === null || _navPtr$userAgentData === void 0 ? void 0 : (_navPtr$userAgentData2 = _navPtr$userAgentData.brands) === null || _navPtr$userAgentData2 === void 0 ? void 0 : _navPtr$userAgentData2.map(function (e) {
                      return e.brand + ":" + e.version;
                    }).join(); // add mobile info
                    navAgent += navPtr !== null && navPtr !== void 0 && (_navPtr$userAgentData3 = navPtr.userAgentData) !== null && _navPtr$userAgentData3 !== void 0 && _navPtr$userAgentData3.mobile ? "mobi" : " ";
                    // add platform info
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
                addToBeagleInfoLayer("donttrack", navPtr.doNotTrack || windowPtr.doNotTrack || navPtr.msDoNotTrack);
                addToBeagleInfoLayer("r", windowPtr.document.referrer);
                firstSessionReferrer = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_REFERRER);
                if (!firstSessionReferrer) {
                  sessionStorage.setItem(SESSION_STORAGE_KEYS.SESSION_REFERRER, windowPtr.document.referrer);
                  addToBeagleInfoLayer("fr", windowPtr.document.referrer);
                } else {
                  addToBeagleInfoLayer("fr", firstSessionReferrer);
                }
              case 23:
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
    };
    
    // TODO: move this to an "element collector" module, then data is extracted from pre-collected elements
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
          } catch (err) {
            // do nothing
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
      }
    
      // Attempts to send the initial log body (beagleInfoLayer's initial population) immediately
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
            var _yield$Promise$all3, _yield$Promise$all4, a, e, f, s, m, cookieGaId, view_epoch, body;
            return regenerator_default().wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return Promise.all([getFromBeagleInfoLayer("a"), getFromBeagleInfoLayer("e"), getFromBeagleInfoLayer("f"), getFromBeagleInfoLayer("s"), getFromBeagleInfoLayer("m"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);
                  case 2:
                    _yield$Promise$all3 = _context9.sent;
                    _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 7);
                    a = _yield$Promise$all4[0];
                    e = _yield$Promise$all4[1];
                    f = _yield$Promise$all4[2];
                    s = _yield$Promise$all4[3];
                    m = _yield$Promise$all4[4];
                    cookieGaId = _yield$Promise$all4[5];
                    view_epoch = _yield$Promise$all4[6];
                    body = {
                      cookieGaId: cookieGaId,
                      lc: 2,
                      view_epoch: view_epoch,
                      a: a,
                      e: e,
                      f: f,
                      s: s,
                      m: m
                    };
                    BeagleMonitor_logger.log("Update log data: ", body);
                    return _context9.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));
                  case 14:
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
          var visibilityChangeTimeout = null;
          BeagleMonitor_logger.log("Initializing exit event listener");
          window.addEventListener("beforeunload", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10() {
            return regenerator_default().wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    BeagleMonitor_logger.log("In beforeunload event");
                    clearTimeout(visibilityChangeTimeout);
                    _context10.next = 4;
                    return _this.handleCloseEvent();
                  case 4:
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
                    clearTimeout(visibilityChangeTimeout);
                    _context11.next = 4;
                    return _this.handleCloseEvent();
                  case 4:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11);
          })), {
            capture: true
          });
          window.addEventListener("visibilitychange", function () {
            if (window.top.document.visibilityState === "hidden") {
              // If page is not visible and doesn't become visible within 30 seconds, send logs
              visibilityChangeTimeout = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee12() {
                return regenerator_default().wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        BeagleMonitor_logger.log("In timeout");
                        _context12.next = 3;
                        return _this.handleCloseEvent();
                      case 3:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              })), 30000);
              return;
            }
            // Clear timeout when page is visible to make sure we send the latest logs possible
            clearTimeout(visibilityChangeTimeout);
            visibilityChangeTimeout = null;
          }, {
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
          if (queued) return;
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
        this.currentPageType = null;
      }
      _createClass(TreatmentRepository, [{
        key: "getMatchedTreatments",
        value: function () {
          var _getMatchedTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(debugMode) {
            var _CPT,
              _this = this;
            var CPT, matchedTreatments, treatments, treatmentWeights, userSegment, userSegmentWeights, _iterator, _step, _userSegmentWeights$t, treatment, segmentedWeight, _userSegmentWeights$t2, _iterator2, _step2, action, _i, _Object$keys, _userSegmentWeights$t3, _userSegmentWeights$t4, variantKey;
            return regenerator_default().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return getFromBeagleInfoLayer("__eRules.PageType", true);
                  case 2:
                    CPT = _context.sent;
                    CPT = ((_CPT = CPT) === null || _CPT === void 0 ? void 0 : _CPT[0]) || null;
                    if (CPT) {
                      _context.next = 6;
                      break;
                    }
                    return _context.abrupt("return", []);
                  case 6:
                    this.currentPageType = CPT;
                    matchedTreatments = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS);
                    if (!matchedTreatments) {
                      _context.next = 22;
                      break;
                    }
                    _context.prev = 9;
                    _context.next = 12;
                    return JSON.parse(matchedTreatments);
                  case 12:
                    matchedTreatments = _context.sent;
                    matchedTreatments = matchedTreatments.filter(function (mt) {
                      return _this.checkPageType(mt.pageTypes);
                    });
                    BeagleTreatmentRepository_logger.log("".concat(matchedTreatments.length, " treatments user segment matched"));
                    return _context.abrupt("return", matchedTreatments);
                  case 18:
                    _context.prev = 18;
                    _context.t0 = _context["catch"](9);
                    BeagleTreatmentRepository_logger.failed("Error getting matched robots:", _context.t0.message);
                    return _context.abrupt("return", []);
                  case 22:
                    matchedTreatments = [];
                    treatments = this.treatments, treatmentWeights = this.treatmentWeights;
                    _context.next = 26;
                    return getFromBeagleInfoLayer("s");
                  case 26:
                    userSegment = _context.sent;
                    if (userSegment) {
                      _context.next = 29;
                      break;
                    }
                    return _context.abrupt("return", null);
                  case 29:
                    if (!treatmentWeights) {
                      _context.next = 76;
                      break;
                    }
                    userSegmentWeights = treatmentWeights[userSegment];
                    if (userSegmentWeights) {
                      _context.next = 33;
                      break;
                    }
                    return _context.abrupt("return", []);
                  case 33:
                    _iterator = BeagleTreatmentRepository_createForOfIteratorHelper(treatments);
                    _context.prev = 34;
                    _iterator.s();
                  case 36:
                    if ((_step = _iterator.n()).done) {
                      _context.next = 68;
                      break;
                    }
                    treatment = _step.value;
                    segmentedWeight = (_userSegmentWeights$t = userSegmentWeights[treatment.id]) === null || _userSegmentWeights$t === void 0 ? void 0 : _userSegmentWeights$t.weight;
                    if (segmentedWeight) {
                      _context.next = 43;
                      break;
                    }
                    if (treatment.dependant_on_treatment) {
                      segmentedWeight = (_userSegmentWeights$t2 = userSegmentWeights[treatment.dependant_on_treatment]) === null || _userSegmentWeights$t2 === void 0 ? void 0 : _userSegmentWeights$t2.weight;
                    } else if (debugMode && debugMode === 1) segmentedWeight = 100;
                    if (segmentedWeight) {
                      _context.next = 43;
                      break;
                    }
                    return _context.abrupt("continue", 66);
                  case 43:
                    treatment.weight = segmentedWeight;
                    if (treatment.actions.some(function (a) {
                      return a.variants;
                    })) {
                      _context.next = 47;
                      break;
                    }
                    matchedTreatments.push(treatment);
                    return _context.abrupt("continue", 66);
                  case 47:
                    _iterator2 = BeagleTreatmentRepository_createForOfIteratorHelper(treatment.actions);
                    _context.prev = 48;
                    _iterator2.s();
                  case 50:
                    if ((_step2 = _iterator2.n()).done) {
                      _context.next = 57;
                      break;
                    }
                    action = _step2.value;
                    if (action.variants) {
                      _context.next = 54;
                      break;
                    }
                    return _context.abrupt("continue", 55);
                  case 54:
                    for (_i = 0, _Object$keys = Object.keys(action.variants); _i < _Object$keys.length; _i++) {
                      variantKey = _Object$keys[_i];
                      if ((_userSegmentWeights$t3 = userSegmentWeights[treatment.id]) !== null && _userSegmentWeights$t3 !== void 0 && _userSegmentWeights$t3.variants && (_userSegmentWeights$t4 = userSegmentWeights[treatment.id]) !== null && _userSegmentWeights$t4 !== void 0 && _userSegmentWeights$t4.variants[variantKey]) {
                        action.variants[variantKey].weight = userSegmentWeights[treatment.id].variants[variantKey];
                      }
                    }
                  case 55:
                    _context.next = 50;
                    break;
                  case 57:
                    _context.next = 62;
                    break;
                  case 59:
                    _context.prev = 59;
                    _context.t1 = _context["catch"](48);
                    _iterator2.e(_context.t1);
                  case 62:
                    _context.prev = 62;
                    _iterator2.f();
                    return _context.finish(62);
                  case 65:
                    matchedTreatments.push(treatment);
                  case 66:
                    _context.next = 36;
                    break;
                  case 68:
                    _context.next = 73;
                    break;
                  case 70:
                    _context.prev = 70;
                    _context.t2 = _context["catch"](34);
                    _iterator.e(_context.t2);
                  case 73:
                    _context.prev = 73;
                    _iterator.f();
                    return _context.finish(73);
                  case 76:
                    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS, JSON.stringify(matchedTreatments));
                    _context.next = 79;
                    return this.getMatchedTreatments(debugMode);
                  case 79:
                    return _context.abrupt("return", _context.sent);
                  case 80:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[9, 18], [34, 70, 73, 76], [48, 59, 62, 65]]);
          }));
          function getMatchedTreatments(_x) {
            return _getMatchedTreatments.apply(this, arguments);
          }
          return getMatchedTreatments;
        }()
      }, {
        key: "checkPageType",
        value: function checkPageType(pageTypes) {
          var currentPageType = this.currentPageType;
          if (pageTypes === null || pageTypes === undefined) return true;
          if (!Array.isArray(pageTypes)) {
            BeagleTreatmentRepository_logger.failed("Page Types should be an array");
            return false;
          }
          if (pageTypes[0].startsWith("!")) {
            pageTypes = pageTypes.map(function (pt) {
              return pt.substr(1);
            });
            return !pageTypes.includes(currentPageType);
          }
          return pageTypes.includes(currentPageType);
        }
      }], [{
        key: "getTreatments",
        value: function () {
          var _getTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
            var TREATMENTS, treatmentsObj, treatments, timestamp, treatmentWithTimestamp, elapsedHours, _treatmentWithTimestamp;
            return regenerator_default().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    BeagleTreatmentRepository_logger.log("Loading treatments");
                    TREATMENTS = LOCAL_STORAGE_KEYS.TREATMENTS;
                    treatmentsObj = JSON.parse(window.localStorage.getItem(TREATMENTS));
                    treatments = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.treatments;
                    timestamp = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.timestamp;
                    if (!(!treatments || !timestamp)) {
                      _context2.next = 17;
                      break;
                    }
                    BeagleTreatmentRepository_logger.failed("Treatments not found in local storage");
                    _context2.next = 9;
                    return fetchTreatments();
                  case 9:
                    treatments = _context2.sent;
                    if (treatments) {
                      _context2.next = 13;
                      break;
                    }
                    BeagleTreatmentRepository_logger.failed("Failed to fetch treatments");
                    return _context2.abrupt("return", null);
                  case 13:
                    treatmentWithTimestamp = {
                      timestamp: Date.now(),
                      treatments: treatments
                    };
                    window.localStorage.setItem(TREATMENTS, JSON.stringify(treatmentWithTimestamp));
                    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS);
                    return _context2.abrupt("return", treatments);
                  case 17:
                    if (!timestamp) {
                      _context2.next = 31;
                      break;
                    }
                    elapsedHours = (Date.now() - timestamp) / (1000 * 3600);
                    if (!(elapsedHours > LOCAL_STORAGE_TTL_HOURS)) {
                      _context2.next = 31;
                      break;
                    }
                    BeagleTreatmentRepository_logger.failed("Treatments are expired");
                    _context2.next = 23;
                    return fetchTreatments();
                  case 23:
                    treatments = _context2.sent;
                    if (treatments) {
                      _context2.next = 27;
                      break;
                    }
                    BeagleTreatmentRepository_logger.failed("Failed to fetch treatments");
                    return _context2.abrupt("return", null);
                  case 27:
                    _treatmentWithTimestamp = {
                      timestamp: Date.now(),
                      treatments: treatments
                    };
                    window.localStorage.setItem(TREATMENTS, JSON.stringify(_treatmentWithTimestamp));
                    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS);
                    return _context2.abrupt("return", treatments);
                  case 31:
                    BeagleTreatmentRepository_logger.success("Treatments are loaded from local storage");
                    return _context2.abrupt("return", treatments);
                  case 33:
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
            var weightsObj, elapsedHours;
            return regenerator_default().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    weightsObj = window.localStorage.getItem(LOCAL_STORAGE_KEYS.WEIGHTS);
                    if (!weightsObj) {
                      _context3.next = 8;
                      break;
                    }
                    weightsObj = JSON.parse(weightsObj);
                    if (!weightsObj.timestamp) {
                      _context3.next = 8;
                      break;
                    }
                    elapsedHours = (Date.now() - weightsObj.timestamp) / (1000 * 3600);
                    if (!(elapsedHours < LOCAL_STORAGE_TTL_HOURS)) {
                      _context3.next = 8;
                      break;
                    }
                    return _context3.abrupt("return", weightsObj.weights);
                  case 8:
                    _context3.next = 10;
                    return fetchTreatmentWeights();
                  case 10:
                    weightsObj = _context3.sent;
                    if (weightsObj) {
                      _context3.next = 14;
                      break;
                    }
                    BeagleTreatmentRepository_logger.failed("Failed to fetch weights");
                    return _context3.abrupt("return", null);
                  case 14:
                    weightsObj = {
                      weights: weightsObj,
                      timestamp: Date.now()
                    };
                    window.localStorage.setItem(LOCAL_STORAGE_KEYS.WEIGHTS, JSON.stringify(weightsObj));
                    return _context3.abrupt("return", weightsObj.weights);
                  case 19:
                    _context3.prev = 19;
                    _context3.t0 = _context3["catch"](0);
                    BeagleTreatmentRepository_logger.warn(_context3.t0.message);
                    return _context3.abrupt("return", null);
                  case 23:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, null, [[0, 19]]);
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
    ;// CONCATENATED MODULE: ./node_modules/idb/build/wrap-idb-value.js
    const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
    
    let idbProxyableTypes;
    let cursorAdvanceMethods;
    // This is a function to prevent it throwing up in node environments.
    function getIdbProxyableTypes() {
        return (idbProxyableTypes ||
            (idbProxyableTypes = [
                IDBDatabase,
                IDBObjectStore,
                IDBIndex,
                IDBCursor,
                IDBTransaction,
            ]));
    }
    // This is a function to prevent it throwing up in node environments.
    function getCursorAdvanceMethods() {
        return (cursorAdvanceMethods ||
            (cursorAdvanceMethods = [
                IDBCursor.prototype.advance,
                IDBCursor.prototype.continue,
                IDBCursor.prototype.continuePrimaryKey,
            ]));
    }
    const cursorRequestMap = new WeakMap();
    const transactionDoneMap = new WeakMap();
    const transactionStoreNamesMap = new WeakMap();
    const transformCache = new WeakMap();
    const reverseTransformCache = new WeakMap();
    function promisifyRequest(request) {
        const promise = new Promise((resolve, reject) => {
            const unlisten = () => {
                request.removeEventListener('success', success);
                request.removeEventListener('error', error);
            };
            const success = () => {
                resolve(wrap_idb_value_wrap(request.result));
                unlisten();
            };
            const error = () => {
                reject(request.error);
                unlisten();
            };
            request.addEventListener('success', success);
            request.addEventListener('error', error);
        });
        promise
            .then((value) => {
            // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
            // (see wrapFunction).
            if (value instanceof IDBCursor) {
                cursorRequestMap.set(value, request);
            }
            // Catching to avoid "Uncaught Promise exceptions"
        })
            .catch(() => { });
        // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
        // is because we create many promises from a single IDBRequest.
        reverseTransformCache.set(promise, request);
        return promise;
    }
    function cacheDonePromiseForTransaction(tx) {
        // Early bail if we've already created a done promise for this transaction.
        if (transactionDoneMap.has(tx))
            return;
        const done = new Promise((resolve, reject) => {
            const unlisten = () => {
                tx.removeEventListener('complete', complete);
                tx.removeEventListener('error', error);
                tx.removeEventListener('abort', error);
            };
            const complete = () => {
                resolve();
                unlisten();
            };
            const error = () => {
                reject(tx.error || new DOMException('AbortError', 'AbortError'));
                unlisten();
            };
            tx.addEventListener('complete', complete);
            tx.addEventListener('error', error);
            tx.addEventListener('abort', error);
        });
        // Cache it for later retrieval.
        transactionDoneMap.set(tx, done);
    }
    let idbProxyTraps = {
        get(target, prop, receiver) {
            if (target instanceof IDBTransaction) {
                // Special handling for transaction.done.
                if (prop === 'done')
                    return transactionDoneMap.get(target);
                // Polyfill for objectStoreNames because of Edge.
                if (prop === 'objectStoreNames') {
                    return target.objectStoreNames || transactionStoreNamesMap.get(target);
                }
                // Make tx.store return the only store in the transaction, or undefined if there are many.
                if (prop === 'store') {
                    return receiver.objectStoreNames[1]
                        ? undefined
                        : receiver.objectStore(receiver.objectStoreNames[0]);
                }
            }
            // Else transform whatever we get back.
            return wrap_idb_value_wrap(target[prop]);
        },
        set(target, prop, value) {
            target[prop] = value;
            return true;
        },
        has(target, prop) {
            if (target instanceof IDBTransaction &&
                (prop === 'done' || prop === 'store')) {
                return true;
            }
            return prop in target;
        },
    };
    function replaceTraps(callback) {
        idbProxyTraps = callback(idbProxyTraps);
    }
    function wrapFunction(func) {
        // Due to expected object equality (which is enforced by the caching in `wrap`), we
        // only create one new func per func.
        // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
        if (func === IDBDatabase.prototype.transaction &&
            !('objectStoreNames' in IDBTransaction.prototype)) {
            return function (storeNames, ...args) {
                const tx = func.call(unwrap(this), storeNames, ...args);
                transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
                return wrap_idb_value_wrap(tx);
            };
        }
        // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
        // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
        // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
        // with real promises, so each advance methods returns a new promise for the cursor object, or
        // undefined if the end of the cursor has been reached.
        if (getCursorAdvanceMethods().includes(func)) {
            return function (...args) {
                // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
                // the original object.
                func.apply(unwrap(this), args);
                return wrap_idb_value_wrap(cursorRequestMap.get(this));
            };
        }
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            return wrap_idb_value_wrap(func.apply(unwrap(this), args));
        };
    }
    function transformCachableValue(value) {
        if (typeof value === 'function')
            return wrapFunction(value);
        // This doesn't return, it just creates a 'done' promise for the transaction,
        // which is later returned for transaction.done (see idbObjectHandler).
        if (value instanceof IDBTransaction)
            cacheDonePromiseForTransaction(value);
        if (instanceOfAny(value, getIdbProxyableTypes()))
            return new Proxy(value, idbProxyTraps);
        // Return the same value back if we're not going to transform it.
        return value;
    }
    function wrap_idb_value_wrap(value) {
        // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
        // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
        if (value instanceof IDBRequest)
            return promisifyRequest(value);
        // If we've already transformed this value before, reuse the transformed value.
        // This is faster, but it also provides object equality.
        if (transformCache.has(value))
            return transformCache.get(value);
        const newValue = transformCachableValue(value);
        // Not all types are transformed.
        // These may be primitive types, so they can't be WeakMap keys.
        if (newValue !== value) {
            transformCache.set(value, newValue);
            reverseTransformCache.set(newValue, value);
        }
        return newValue;
    }
    const unwrap = (value) => reverseTransformCache.get(value);
    
    
    
    ;// CONCATENATED MODULE: ./node_modules/idb/build/index.js
    
    
    
    /**
     * Open a database.
     *
     * @param name Name of the database.
     * @param version Schema version.
     * @param callbacks Additional callbacks.
     */
    function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
        const request = indexedDB.open(name, version);
        const openPromise = wrap_idb_value_wrap(request);
        if (upgrade) {
            request.addEventListener('upgradeneeded', (event) => {
                upgrade(wrap_idb_value_wrap(request.result), event.oldVersion, event.newVersion, wrap_idb_value_wrap(request.transaction), event);
            });
        }
        if (blocked) {
            request.addEventListener('blocked', (event) => blocked(
            // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
            event.oldVersion, event.newVersion, event));
        }
        openPromise
            .then((db) => {
            if (terminated)
                db.addEventListener('close', () => terminated());
            if (blocking) {
                db.addEventListener('versionchange', (event) => blocking(event.oldVersion, event.newVersion, event));
            }
        })
            .catch(() => { });
        return openPromise;
    }
    /**
     * Delete a database.
     *
     * @param name Name of the database.
     */
    function deleteDB(name, { blocked } = {}) {
        const request = indexedDB.deleteDatabase(name);
        if (blocked) {
            request.addEventListener('blocked', (event) => blocked(
            // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
            event.oldVersion, event));
        }
        return wrap(request).then(() => undefined);
    }
    
    const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
    const writeMethods = ['put', 'add', 'delete', 'clear'];
    const cachedMethods = new Map();
    function getMethod(target, prop) {
        if (!(target instanceof IDBDatabase &&
            !(prop in target) &&
            typeof prop === 'string')) {
            return;
        }
        if (cachedMethods.get(prop))
            return cachedMethods.get(prop);
        const targetFuncName = prop.replace(/FromIndex$/, '');
        const useIndex = prop !== targetFuncName;
        const isWrite = writeMethods.includes(targetFuncName);
        if (
        // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
        !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
            !(isWrite || readMethods.includes(targetFuncName))) {
            return;
        }
        const method = async function (storeName, ...args) {
            // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
            const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
            let target = tx.store;
            if (useIndex)
                target = target.index(args.shift());
            // Must reject if op rejects.
            // If it's a write operation, must reject if tx.done rejects.
            // Must reject with op rejection first.
            // Must resolve with op value.
            // Must handle both promises (no unhandled rejections)
            return (await Promise.all([
                target[targetFuncName](...args),
                isWrite && tx.done,
            ]))[0];
        };
        cachedMethods.set(prop, method);
        return method;
    }
    replaceTraps((oldTraps) => ({
        ...oldTraps,
        get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
        has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
    }));
    
    
    
    ;// CONCATENATED MODULE: ./src/GlovProductInfoRepository/store.config.js
    var config = {
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
    /* harmony default export */ var store_config = (config);
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
        value: function () {
          var _init = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
            var dbName, version, db;
            return regenerator_default().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    GlovProductInfoRepository_logger.log("Initializing indexedDB");
                    dbName = store_config.dbName, version = store_config.version;
                    _context.next = 4;
                    return openDB(dbName, version, {
                      upgrade: function upgrade(db, oldVersion) {
                        switch (oldVersion) {
                          case 0:
                            break;
                          default:
                            // TODO upgrade existing db instead of delete and create from scratch
                            try {
                              db.deleteObjectStore(store_config.store.name);
                            } catch (err) {
                              GlovProductInfoRepository_logger.failed("Could not delete outdated database", err.message);
                            }
                            break;
                        }
                        try {
                          var _config$store$indexes;
                          var store = db.createObjectStore(store_config.store.name, store_config.store.options);
                          if (((_config$store$indexes = store_config.store.indexes) === null || _config$store$indexes === void 0 ? void 0 : _config$store$indexes.length) > 0) {
                            var _iterator = GlovProductInfoRepository_createForOfIteratorHelper(store_config.store.indexes),
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
                      }
                    });
                  case 4:
                    db = _context.sent;
                    this.indexedDB = db;
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function init() {
            return _init.apply(this, arguments);
          }
          return init;
        }()
      }, {
        key: "getDB",
        value: function () {
          var _getDB = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
            var _this = this;
            return regenerator_default().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", new Promise(function (resolve, reject) {
                      var interval = setInterval(function () {
                        if (_this.indexedDB) {
                          clearInterval(interval);
                          resolve(_this.indexedDB);
                        }
                      }, 25);
                      setTimeout(function () {
                        if (!_this.indexedDB) {
                          clearInterval(interval);
                          reject(new Error("Product info db not initialized within the allotted time"));
                        }
                      }, 3000);
                    }));
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function getDB() {
            return _getDB.apply(this, arguments);
          }
          return getDB;
        }()
      }, {
        key: "getStore",
        value: function () {
          var _getStore = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
            var readwrite,
              db,
              _args3 = arguments;
            return regenerator_default().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    readwrite = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
                    _context3.next = 3;
                    return this.getDB();
                  case 3:
                    db = _context3.sent;
                    return _context3.abrupt("return", db.transaction(store_config.store.name, readwrite ? "readwrite" : "readonly").store);
                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
          function getStore() {
            return _getStore.apply(this, arguments);
          }
          return getStore;
        }()
      }, {
        key: "save",
        value: function () {
          var _save = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(payload) {
            var store, timestamp, savePromises, _iterator2, _step2, load;
            return regenerator_default().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return this.getStore(true);
                  case 2:
                    store = _context4.sent;
                    timestamp = Math.round(Date.now() / 1000);
                    if (!Array.isArray(payload)) {
                      _context4.next = 12;
                      break;
                    }
                    savePromises = [];
                    _iterator2 = GlovProductInfoRepository_createForOfIteratorHelper(payload);
                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        load = _step2.value;
                        load.timestamp = timestamp;
                        savePromises.push(store.put(load));
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                    _context4.next = 10;
                    return Promise.all(savePromises);
                  case 10:
                    _context4.next = 15;
                    break;
                  case 12:
                    payload.timestamp = timestamp;
                    _context4.next = 15;
                    return store.put(payload);
                  case 15:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
          function save(_x) {
            return _save.apply(this, arguments);
          }
          return save;
        }()
      }, {
        key: "clear",
        value: function () {
          var _clear = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
            var store;
            return regenerator_default().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return this.getStore(true);
                  case 2:
                    store = _context5.sent;
                    _context5.next = 5;
                    return store.clear();
                  case 5:
                    return _context5.abrupt("return");
                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));
          function clear() {
            return _clear.apply(this, arguments);
          }
          return clear;
        }()
      }, {
        key: "get",
        value: function () {
          var _get = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(sku) {
            var db, res;
            return regenerator_default().wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return this.getDB();
                  case 2:
                    db = _context6.sent;
                    _context6.next = 5;
                    return db.get(store_config.store.name, sku);
                  case 5:
                    res = _context6.sent;
                    return _context6.abrupt("return", res);
                  case 7:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));
          function get(_x2) {
            return _get.apply(this, arguments);
          }
          return get;
        }()
      }, {
        key: "count",
        value: function () {
          var _count = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7() {
            var db, res;
            return regenerator_default().wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return this.getDB();
                  case 2:
                    db = _context7.sent;
                    _context7.next = 5;
                    return db.count(store_config.store.name);
                  case 5:
                    res = _context7.sent;
                    return _context7.abrupt("return", res);
                  case 7:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));
          function count() {
            return _count.apply(this, arguments);
          }
          return count;
        }()
      }, {
        key: "getCursor",
        value: function () {
          var _getCursor = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8() {
            var db, cursor;
            return regenerator_default().wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return this.getDB();
                  case 2:
                    db = _context8.sent;
                    _context8.next = 5;
                    return db.transaction(store_config.store.name).store.openCursor();
                  case 5:
                    cursor = _context8.sent;
                    return _context8.abrupt("return", cursor);
                  case 7:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));
          function getCursor() {
            return _getCursor.apply(this, arguments);
          }
          return getCursor;
        }()
      }, {
        key: "persistProductInfo",
        value: function () {
          var _persistProductInfo = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9() {
            var existingProdInfo, cursor, timestamp, elapsedSeconds, productInfoPromise, clearPromise, _yield$Promise$all, _yield$Promise$all2, productInfoArray;
            return regenerator_default().wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    addToBeagleInfoLayer("m", "check-existing-prod-info");
                    _context9.next = 3;
                    return this.count();
                  case 3:
                    existingProdInfo = _context9.sent;
                    if (!existingProdInfo) {
                      _context9.next = 14;
                      break;
                    }
                    GlovProductInfoRepository_logger.log("Existing product info found");
                    _context9.next = 8;
                    return this.getCursor();
                  case 8:
                    cursor = _context9.sent;
                    timestamp = cursor.value.timestamp;
                    elapsedSeconds = Date.now() / 1000 - timestamp; // Re-fetch product info once a day
                    if (!(elapsedSeconds < 86400)) {
                      _context9.next = 13;
                      break;
                    }
                    return _context9.abrupt("return");
                  case 13:
                    GlovProductInfoRepository_logger.log("Existing product info is expired");
                  case 14:
                    addToBeagleInfoLayer("m", "fetching-prod-info");
                    productInfoPromise = fetchProductInfo();
                    clearPromise = null;
                    if (existingProdInfo) clearPromise = this.clear();
                    _context9.next = 20;
                    return Promise.all([productInfoPromise, clearPromise]);
                  case 20:
                    _yield$Promise$all = _context9.sent;
                    _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 1);
                    productInfoArray = _yield$Promise$all2[0];
                    if (!(!productInfoArray || !productInfoArray.length)) {
                      _context9.next = 25;
                      break;
                    }
                    return _context9.abrupt("return");
                  case 25:
                    addToBeagleInfoLayer("m", "fetched-prod-info");
                    _context9.next = 28;
                    return this.save(this.preparePayloads(productInfoArray));
                  case 28:
                    addToBeagleInfoLayer("m", "persisted-prod-info");
                  case 29:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
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
                payload[fieldNames[i]] = info[i] || null;
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
        getInstance: function () {
          var _getInstance = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
            return regenerator_default().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(instance === null)) {
                      _context.next = 5;
                      break;
                    }
                    _context.next = 3;
                    return idbReady();
                  case 3:
                    instance = new src_GlovProductInfoRepository();
                    // Hide the constructor so the returned object can't be new'd...
                    instance.constructor = null;
                  case 5:
                    return _context.abrupt("return", instance);
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          function getInstance() {
            return _getInstance.apply(this, arguments);
          }
          return getInstance;
        }()
      };
    }();
    /* harmony default export */ var store = (Store);
    ;// CONCATENATED MODULE: ./src/BeagleApplyActions/action-condition-util.js
    
    
    
    
    
    var action_condition_util_logger = new src_logger("ActionConditionUtils");
    var checkActionCondition = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(condition) {
        var eligibleElements, attribute, inner_condition, operator, selector, type, value, chain, conditionElements, _i, _conditionElements, element;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                action_condition_util_logger.log("Action condition found: ", condition);
                eligibleElements = [];
                attribute = condition.attribute, inner_condition = condition.inner_condition, operator = condition.operator, selector = condition.selector, type = condition.type, value = condition.value, chain = condition.chain;
                conditionElements = Array.from(window.top.document.querySelectorAll(selector));
                _i = 0, _conditionElements = conditionElements;
              case 5:
                if (!(_i < _conditionElements.length)) {
                  _context.next = 14;
                  break;
                }
                element = _conditionElements[_i];
                _context.next = 9;
                return actionConditionChecker(element, type, operator, attribute, inner_condition, value, chain);
              case 9:
                if (!_context.sent) {
                  _context.next = 11;
                  break;
                }
                eligibleElements.push($(element));
              case 11:
                _i++;
                _context.next = 5;
                break;
              case 14:
                return _context.abrupt("return", eligibleElements);
              case 15:
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
    var actionConditionChecker = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(element, type, operator, attribute, inner_condition, value, chain) {
        var elementSku, db, productInfo, runTimeValue, res, fn, _runTimeValue, _res;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = type;
                _context2.next = _context2.t0 === "productInfoLookup" ? 3 : _context2.t0 === "function" ? 23 : 32;
                break;
              case 3:
                elementSku = element.getAttribute(attribute);
                _context2.next = 6;
                return store.getInstance();
              case 6:
                db = _context2.sent;
                _context2.next = 9;
                return db.get(elementSku);
              case 9:
                productInfo = _context2.sent;
                runTimeValue = productInfo === null || productInfo === void 0 ? void 0 : productInfo[operator]; // runTimeValue may be 0
                if (!(runTimeValue === null || runTimeValue === undefined)) {
                  _context2.next = 14;
                  break;
                }
                action_condition_util_logger.failed("Product info is empty");
                return _context2.abrupt("return", false);
              case 14:
                if (conditionChecker(runTimeValue, inner_condition, value)) {
                  _context2.next = 16;
                  break;
                }
                return _context2.abrupt("return", false);
              case 16:
                if (!chain) {
                  _context2.next = 22;
                  break;
                }
                _context2.next = 19;
                return actionConditionChecker(element, chain.type, chain.operator, chain.attribute, chain.inner_condition, chain.value, chain.chain);
              case 19:
                res = _context2.sent;
                if (res) {
                  _context2.next = 22;
                  break;
                }
                return _context2.abrupt("return", false);
              case 22:
                return _context2.abrupt("return", true);
              case 23:
                _context2.prev = 23;
                fn = Function("el", operator);
                return _context2.abrupt("return", fn(element));
              case 28:
                _context2.prev = 28;
                _context2.t1 = _context2["catch"](23);
                action_condition_util_logger.failed("Error executing function action condition");
                return _context2.abrupt("return", false);
              case 32:
                _runTimeValue = element.getAttribute(attribute);
                if (conditionChecker(_runTimeValue, inner_condition, value)) {
                  _context2.next = 35;
                  break;
                }
                return _context2.abrupt("return", false);
              case 35:
                if (!chain) {
                  _context2.next = 41;
                  break;
                }
                _context2.next = 38;
                return actionConditionChecker(element, chain.type, chain.operator, chain.attribute, chain.inner_condition, chain.value, chain.chain);
              case 38:
                _res = _context2.sent;
                if (_res) {
                  _context2.next = 41;
                  break;
                }
                return _context2.abrupt("return", false);
              case 41:
                return _context2.abrupt("return", true);
              case 42:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[23, 28]]);
      }));
      return function actionConditionChecker(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
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
      _applyActions = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8(actions) {
        var logger, db, POPUP_DISPLAY_FLAG, transformer, prepareDescElm, prepareFinalTitle, replaceWithVal, getProductInfo, handleDocumentTitleTabChange, handlePopupClick, handleModalClick, displayPopup, displayModal, createPopup, swapNodes, waitForJQuery, actionApplicator, result;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                logger = new src_logger("BeagleApplyActions");
                _context8.next = 3;
                return store.getInstance();
              case 3:
                db = _context8.sent;
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
                      n1,
                      n2,
                      source,
                      destination,
                      res,
                      _i,
                      _Array$from,
                      _e$innerText,
                      e,
                      finalTitle,
                      descriptionElm,
                      _args = arguments;
                    return regenerator_default().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            element = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                            operator = action.operator, type = action.type, applyEvent = action.applyEvent, contentSelector = action.contentSelector, selector = action.selector, selectorFallback = action.selectorFallback, mdCondition = action.mdCondition, move_selector_1 = action.move_selector_1, move_selector_2 = action.move_selector_2, replaceFn = action.replaceFn, pType = action.pType, productInfoStorage = action.productInfoStorage;
                            if (!(operator === "noop")) {
                              _context.next = 5;
                              break;
                            }
                            logger.failed("Noop Operator: No operation is applied on target ");
                            return _context.abrupt("return", true);
                          case 5:
                            value = action.value; // If an element is passed to transformer, selector is relative to passed element
                            element = element ? element.find(selector) : $(selector);
                            mc = mdCondition ? window.matchMedia(mdCondition).matches : true;
                            if (mc) {
                              _context.next = 11;
                              break;
                            }
                            logger.failed("Media condition mismatch: ", mdCondition);
                            return _context.abrupt("return", false);
                          case 11:
                            if (!(move_selector_1 && !move_selector_2 || move_selector_2 && !move_selector_1)) {
                              _context.next = 14;
                              break;
                            }
                            logger.failed("Both move selectors are required");
                            return _context.abrupt("return", false);
                          case 14:
                            if (!(move_selector_1 && move_selector_2)) {
                              _context.next = 23;
                              break;
                            }
                            if ($(move_selector_1).length) {
                              _context.next = 18;
                              break;
                            }
                            logger.failed("Move selector 1 not found: ", move_selector_1);
                            return _context.abrupt("return", false);
                          case 18:
                            if ($(move_selector_2).length) {
                              _context.next = 21;
                              break;
                            }
                            logger.failed("Move selector 2 not found: ", move_selector_2);
                            return _context.abrupt("return", false);
                          case 21:
                            _context.next = 38;
                            break;
                          case 23:
                            if (selector) {
                              _context.next = 28;
                              break;
                            }
                            logger.failed("Selector not specified");
                            return _context.abrupt("return", false);
                          case 28:
                            if (element.length) {
                              _context.next = 38;
                              break;
                            }
                            if (!(!$(selectorFallback).length && operator === "remove")) {
                              _context.next = 31;
                              break;
                            }
                            return _context.abrupt("return", true);
                          case 31:
                            if (!(selector !== "no-selector")) {
                              _context.next = 38;
                              break;
                            }
                            logger.failed("Selector not found: ", selector);
                            logger.log("Trying fallback selector: ", selectorFallback);
                            if (selectorFallback) element = $(selectorFallback);
                            if (element.length) {
                              _context.next = 38;
                              break;
                            }
                            logger.failed("Fallback selector not found");
                            return _context.abrupt("return", false);
                          case 38:
                            if (!replaceFn) {
                              _context.next = 42;
                              break;
                            }
                            _context.next = 41;
                            return replace_utils(value, replaceFn);
                          case 41:
                            value = _context.sent;
                          case 42:
                            if (!(operator === "remove")) {
                              _context.next = 47;
                              break;
                            }
                            logger.log("Removing: ", selector);
                            element.remove();
                            _context.next = 225;
                            break;
                          case 47:
                            if (!(operator === "insert")) {
                              _context.next = 120;
                              break;
                            }
                            _context.t0 = type;
                            _context.next = _context.t0 === "before" ? 51 : _context.t0 === "after" ? 54 : _context.t0 === "append" ? 57 : _context.t0 === "modal" ? 60 : _context.t0 === "popup" ? 65 : 116;
                            break;
                          case 51:
                            logger.log("Inserting before: ", value);
                            element.before(value);
                            return _context.abrupt("break", 118);
                          case 54:
                            logger.log("Inserting after: ", value);
                            element.after(value);
                            return _context.abrupt("break", 118);
                          case 57:
                            logger.log("Appending value: ", value);
                            element.append(value);
                            return _context.abrupt("break", 118);
                          case 60:
                            element.off("click");
                            createPopup(value, contentSelector, true);
                            elm = document.querySelector(selector);
                            elm.addEventListener("click", function (e) {
                              if (elm == e.target) {
                                e.stopPropagation();
                              }
                              displayModal(value, contentSelector);
                            }, true);
                            return _context.abrupt("break", 118);
                          case 65:
                            if (!(parseInt(sessionStorage.getItem(POPUP_DISPLAY_FLAG)) !== 0)) {
                              _context.next = 68;
                              break;
                            }
                            logger.log("Popup already displayed in session");
                            return _context.abrupt("break", 118);
                          case 68:
                            logger.log("Creating Popup: ", value);
                            if (!pType) {
                              _context.next = 73;
                              break;
                            }
                            _context.next = 72;
                            return getProductInfo(pType, value, productInfoStorage);
                          case 72:
                            value = _context.sent;
                          case 73:
                            createPopup(value, contentSelector);
                            if (!applyEvent) {
                              _context.next = 114;
                              break;
                            }
                            mobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
                            _iterator = BeagleApplyActions_createForOfIteratorHelper(applyEvent);
                            _context.prev = 77;
                            _iterator.s();
                          case 79:
                            if ((_step = _iterator.n()).done) {
                              _context.next = 104;
                              break;
                            }
                            event = _step.value;
                            _context.t1 = event;
                            _context.next = _context.t1 === "exitIntent" ? 84 : _context.t1 === "copyIntent" ? 99 : 102;
                            break;
                          case 84:
                            logger.log("Adding exit intent listener");
                            if (!mobile) {
                              _context.next = 97;
                              break;
                            }
                            window.top.addEventListener("visibilitychange", displayPopup);
                            _context.next = 89;
                            return Promise.all([getFromBeagleInfoLayer("r", true), getFromBeagleInfoLayer("d", true)]);
                          case 89:
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
                            _context.next = 98;
                            break;
                          case 97:
                            window.top.document.documentElement.addEventListener("mouseleave", displayPopup, {
                              once: true
                            });
                          case 98:
                            return _context.abrupt("break", 102);
                          case 99:
                            logger.log("Adding copy intent listener");
                            window.top.document.documentElement.addEventListener("copy", displayPopup, {
                              once: true
                            });
                            return _context.abrupt("break", 102);
                          case 102:
                            _context.next = 79;
                            break;
                          case 104:
                            _context.next = 109;
                            break;
                          case 106:
                            _context.prev = 106;
                            _context.t2 = _context["catch"](77);
                            _iterator.e(_context.t2);
                          case 109:
                            _context.prev = 109;
                            _iterator.f();
                            return _context.finish(109);
                          case 112:
                            _context.next = 115;
                            break;
                          case 114:
                            // append popup to body after timeout expires
                            setTimeout(function () {
                              displayPopup();
                            }, timeout);
                          case 115:
                            return _context.abrupt("break", 118);
                          case 116:
                            logger.failed("Type: ".concat(type, " not found for operator: ").concat(operator));
                            return _context.abrupt("return", false);
                          case 118:
                            _context.next = 225;
                            break;
                          case 120:
                            if (!(operator === "edit")) {
                              _context.next = 148;
                              break;
                            }
                            _context.t3 = type;
                            _context.next = _context.t3 === "text" ? 124 : _context.t3 === "html" ? 127 : _context.t3 === "styleApplicator" ? 130 : _context.t3 === "addClass" ? 135 : _context.t3 === "removeClass" ? 138 : _context.t3 === "documentTitle" ? 141 : 144;
                            break;
                          case 124:
                            logger.log("Editing text: ", value);
                            element.text(value);
                            return _context.abrupt("break", 146);
                          case 127:
                            logger.log("Editing html: ", value);
                            element.html(value);
                            return _context.abrupt("break", 146);
                          case 130:
                            logger.log("Applying style: ", value);
                            styleChangesMap = JSON.parse(value);
                            logger.log("Style Changes Map: ", styleChangesMap);
                            styleApplicator(element, styleChangesMap);
                            return _context.abrupt("break", 146);
                          case 135:
                            logger.log("addding class to ".concat(element, " named ").concat(value));
                            element.addClass(value);
                            return _context.abrupt("break", 146);
                          case 138:
                            logger.log("remove class from ".concat(element, " named ").concat(value));
                            element.removeClass(value);
                            return _context.abrupt("break", 146);
                          case 141:
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
                            return _context.abrupt("break", 146);
                          case 144:
                            logger.log("Unknown edit type: ", type);
                            return _context.abrupt("return", false);
                          case 146:
                            _context.next = 225;
                            break;
                          case 148:
                            if (!(operator === "replace")) {
                              _context.next = 153;
                              break;
                            }
                            logger.log("Replacing: ", value);
                            element.replaceAll(value);
                            _context.next = 225;
                            break;
                          case 153:
                            if (!(operator === "swap")) {
                              _context.next = 160;
                              break;
                            }
                            logger.log("Swapping: ", move_selector_1, move_selector_2);
                            n1 = window.top.document.querySelector(move_selector_1);
                            n2 = window.top.document.querySelector(move_selector_2);
                            swapNodes(n1, n2);
                            _context.next = 225;
                            break;
                          case 160:
                            if (!(operator === "injectscript")) {
                              _context.next = 165;
                              break;
                            }
                            logger.log("Injecting script: ", value);
                            element.append("<script>".concat(value, "</script>"));
                            _context.next = 225;
                            break;
                          case 165:
                            if (!(operator === "move")) {
                              _context.next = 172;
                              break;
                            }
                            logger.log("Moving ".concat(move_selector_1, " to ").concat(move_selector_2));
                            source = window.top.document.querySelector(move_selector_1);
                            destination = window.top.document.querySelector(move_selector_2);
                            destination.prepend(source);
                            _context.next = 225;
                            break;
                          case 172:
                            if (!(operator === "productInfoLookup")) {
                              _context.next = 179;
                              break;
                            }
                            _context.next = 175;
                            return getProductInfo(pType, value, productInfoStorage);
                          case 175:
                            res = _context.sent;
                            element.before(res);
                            _context.next = 225;
                            break;
                          case 179:
                            if (!(operator === "text-transform")) {
                              _context.next = 199;
                              break;
                            }
                            _context.t4 = type;
                            _context.next = _context.t4 === "capitalize" ? 183 : _context.t4 === "PLACEHOLDER" ? 194 : 195;
                            break;
                          case 183:
                            _i = 0, _Array$from = Array.from(element);
                          case 184:
                            if (!(_i < _Array$from.length)) {
                              _context.next = 193;
                              break;
                            }
                            e = _Array$from[_i];
                            if (!((_e$innerText = e.innerText) !== null && _e$innerText !== void 0 && _e$innerText.includes("\n"))) {
                              _context.next = 189;
                              break;
                            }
                            e.innerText = turkishToLower(e.innerText).split("\n").map(function (sentence) {
                              return sentence.split(" ").map(function (word) {
                                return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                              }).join(" ");
                            }).join("\n");
                            return _context.abrupt("continue", 190);
                          case 189:
                            e.innerText = turkishToLower(e.innerText).split(" ").map(function (word) {
                              return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                            }).join(" ");
                          case 190:
                            _i++;
                            _context.next = 184;
                            break;
                          case 193:
                            return _context.abrupt("break", 197);
                          case 194:
                            return _context.abrupt("break", 197);
                          case 195:
                            logger.failed("Unknown text-transform type");
                            return _context.abrupt("return", false);
                          case 197:
                            _context.next = 225;
                            break;
                          case 199:
                            if (!(operator === "ai-suggest")) {
                              _context.next = 223;
                              break;
                            }
                            _context.t5 = type;
                            _context.next = _context.t5 === "title-change" ? 203 : _context.t5 === "add-description" ? 212 : 221;
                            break;
                          case 203:
                            logger.log("getting title suggestions");
                            _context.next = 206;
                            return prepareFinalTitle();
                          case 206:
                            finalTitle = _context.sent;
                            if (finalTitle) {
                              _context.next = 210;
                              break;
                            }
                            logger.failed("Cannot apply title-change there is no suggestion!");
                            return _context.abrupt("return", false);
                          case 210:
                            element.contents().filter(function () {
                              // eslint-disable-next-line no-invalid-this
                              return this.nodeType == 3;
                            })[0].nodeValue = finalTitle;
                            return _context.abrupt("break", 221);
                          case 212:
                            logger.log("getting description suggestions");
                            _context.next = 215;
                            return prepareDescElm(value);
                          case 215:
                            descriptionElm = _context.sent;
                            if (descriptionElm) {
                              _context.next = 219;
                              break;
                            }
                            logger.failed("Cannot apply add-description there is no suggestion!");
                            return _context.abrupt("return", false);
                          case 219:
                            element.before(descriptionElm);
                            return _context.abrupt("break", 221);
                          case 221:
                            _context.next = 225;
                            break;
                          case 223:
                            logger.failed("No such operator exists yet", operator);
                            return _context.abrupt("return", false);
                          case 225:
                            return _context.abrupt("return", true);
                          case 226:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[77, 106, 109, 112]]);
                  }));
                  function transformer(_x2) {
                    return _transformer.apply(this, arguments);
                  }
                  return transformer;
                }();
                prepareDescElm = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(value) {
                    var sku, productInfo, updatedHtmlString;
                    return regenerator_default().wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return getFromBeagleInfoLayer("pdp.sku", true);
                          case 2:
                            sku = _context2.sent;
                            _context2.next = 5;
                            return db.get(sku);
                          case 5:
                            productInfo = _context2.sent;
                            if (productInfo.marketingCopy) {
                              _context2.next = 9;
                              break;
                            }
                            logger.failed("No description found for sku ".concat(sku));
                            return _context2.abrupt("return", null);
                          case 9:
                            updatedHtmlString = replaceWithVal(productInfo.marketingCopy, value);
                            return _context2.abrupt("return", updatedHtmlString);
                          case 11:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return function prepareDescElm(_x3) {
                    return _ref.apply(this, arguments);
                  };
                }();
                prepareFinalTitle = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
                    var _yield$getFromBeagleI, name, sku, productInfo, res;
                    return regenerator_default().wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return getFromBeagleInfoLayer("pdp", true);
                          case 2:
                            _yield$getFromBeagleI = _context3.sent;
                            name = _yield$getFromBeagleI.name;
                            sku = _yield$getFromBeagleI.sku;
                            _context3.next = 7;
                            return db.get(sku);
                          case 7:
                            productInfo = _context3.sent;
                            if (productInfo.titleAugment) {
                              _context3.next = 11;
                              break;
                            }
                            logger.failed("No title suggestion found for sku ".concat(sku));
                            return _context3.abrupt("return", null);
                          case 11:
                            if (name.includes("(")) {
                              name = name.split("(")[0];
                            }
                            res = productInfo.titleAugment.toLocaleUpperCase("tr-TR") + " (".concat(sku, ")");
                            return _context3.abrupt("return", res);
                          case 14:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));
                  return function prepareFinalTitle() {
                    return _ref2.apply(this, arguments);
                  };
                }();
                replaceWithVal = function replaceWithVal(value, htmlStr) {
                  if (value && htmlStr.includes("{{REPLACE_PRODUCTINFO}}")) {
                    htmlStr = replaceAll(htmlStr, "{{REPLACE_PRODUCTINFO}}", value);
                  }
                  return htmlStr;
                };
                getProductInfo = /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(type, value, productInfoStorage) {
                    var skuList, res, productInfo;
                    return regenerator_default().wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(productInfoStorage === "basket")) {
                              _context4.next = 6;
                              break;
                            }
                            _context4.next = 3;
                            return getFromBeagleInfoLayer("__features.SKUsonLastCartView", true);
                          case 3:
                            _context4.t0 = _context4.sent;
                            _context4.next = 9;
                            break;
                          case 6:
                            _context4.next = 8;
                            return getFromBeagleInfoLayer("__features.SKUsonPage", true);
                          case 8:
                            _context4.t0 = _context4.sent;
                          case 9:
                            skuList = _context4.t0;
                            res = null;
                            if (!(!skuList || skuList.length === 0)) {
                              _context4.next = 14;
                              break;
                            }
                            logger.failed("No sku found");
                            return _context4.abrupt("return", null);
                          case 14:
                            _context4.next = 16;
                            return db.get(skuList[0]);
                          case 16:
                            productInfo = _context4.sent;
                            _context4.t1 = type;
                            _context4.next = _context4.t1 === "transactionIn2Weeks" ? 20 : _context4.t1 === "addToCartIn2Weeks" ? 23 : _context4.t1 === "productViewCount" ? 26 : 29;
                            break;
                          case 20:
                            res = replaceWithVal(productInfo.saleCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                            logger.log("Replacing transcationIn2Weeks ", productInfo.saleCntVisitorsIn15);
                            return _context4.abrupt("break", 30);
                          case 23:
                            res = replaceWithVal(productInfo.cartCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                            logger.log("Replacing AddToCartCount ", productInfo.cartCntVisitorsIn15);
                            return _context4.abrupt("break", 30);
                          case 26:
                            res = replaceWithVal(productInfo.viewCntVisitorsIn1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                            logger.log("Replacing productViewCount for", productInfo.viewCntVisitorsIn1);
                            return _context4.abrupt("break", 30);
                          case 29:
                            logger.failed("no such type found for productInfoLookup operator: " + type);
                          case 30:
                            return _context4.abrupt("return", res);
                          case 31:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return function getProductInfo(_x4, _x5, _x6) {
                    return _ref3.apply(this, arguments);
                  };
                }();
                handleDocumentTitleTabChange = /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(event, titles, originalTitle) {
                    var parsedTitles, _iterator3, _step3, parsedTitle;
                    return regenerator_default().wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            parsedTitles = !Array.isArray(titles) ? [titles] : titles;
                            _iterator3 = BeagleApplyActions_createForOfIteratorHelper(parsedTitles);
                            _context5.prev = 2;
                            _iterator3.s();
                          case 4:
                            if ((_step3 = _iterator3.n()).done) {
                              _context5.next = 18;
                              break;
                            }
                            parsedTitle = _step3.value;
                            if (!window.top.document.hidden) {
                              _context5.next = 15;
                              break;
                            }
                            window.top.document.title = parsedTitle;
                            _context5.next = 10;
                            return delay(2000);
                          case 10:
                            window.top.document.title = originalTitle;
                            _context5.next = 13;
                            return delay(2000);
                          case 13:
                            _context5.next = 16;
                            break;
                          case 15:
                            window.top.document.title = originalTitle;
                          case 16:
                            _context5.next = 4;
                            break;
                          case 18:
                            _context5.next = 23;
                            break;
                          case 20:
                            _context5.prev = 20;
                            _context5.t0 = _context5["catch"](2);
                            _iterator3.e(_context5.t0);
                          case 23:
                            _context5.prev = 23;
                            _iterator3.f();
                            return _context5.finish(23);
                          case 26:
                            if (!window.top.document.hidden) {
                              window.top.document.title = originalTitle;
                            } else {
                              handleDocumentTitleTabChange(event, titles, originalTitle);
                            }
                          case 27:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5, null, [[2, 20, 23, 26]]);
                  }));
                  return function handleDocumentTitleTabChange(_x7, _x8, _x9) {
                    return _ref4.apply(this, arguments);
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
                  var popupWrapper = window.top.document.createElement("div");
                  // eslint-disable-next-line max-len
                  popupWrapper.classList.add("nd-popup__wrapper");
                  if (isModal) popupWrapper.classList.add("nd-modal__wrapper");
                  if (!isModal) popupWrapper.id = "nd-popup__wrapper";
    
                  // Create popup close button
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
                  }
    
                  // Create popup from action and append close button
                  var template = window.top.document.createElement("template");
                  template.innerHTML = value.trim();
                  var popup = template.content.firstChild;
                  popup.appendChild(popupCloseButton);
                  popupWrapper.appendChild(popup);
    
                  // Remove old popup if exists before appending new one
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
                      setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
                        return regenerator_default().wrap(function _callee6$(_context6) {
                          while (1) {
                            switch (_context6.prev = _context6.next) {
                              case 0:
                                clearInterval(jQueryInterval);
                                resolve(false);
                              case 2:
                              case "end":
                                return _context6.stop();
                            }
                          }
                        }, _callee6);
                      })), 2000);
                    } else resolve(true);
                  });
                };
                actionApplicator = /*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7(actions) {
                    var _iterator4, _step4, action, eligibleElements, _iterator5, _step5, element, _result, _result2;
                    return regenerator_default().wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return waitForJQuery();
                          case 2:
                            if (!_context7.sent) {
                              _context7.next = 61;
                              break;
                            }
                            _iterator4 = BeagleApplyActions_createForOfIteratorHelper(actions);
                            _context7.prev = 4;
                            _iterator4.s();
                          case 6:
                            if ((_step4 = _iterator4.n()).done) {
                              _context7.next = 50;
                              break;
                            }
                            action = _step4.value;
                            _context7.prev = 8;
                            if (!action.condition) {
                              _context7.next = 37;
                              break;
                            }
                            _context7.next = 12;
                            return action_condition_util(action.condition);
                          case 12:
                            eligibleElements = _context7.sent;
                            if (eligibleElements.length) {
                              _context7.next = 15;
                              break;
                            }
                            return _context7.abrupt("return");
                          case 15:
                            _iterator5 = BeagleApplyActions_createForOfIteratorHelper(eligibleElements);
                            _context7.prev = 16;
                            _iterator5.s();
                          case 18:
                            if ((_step5 = _iterator5.n()).done) {
                              _context7.next = 27;
                              break;
                            }
                            element = _step5.value;
                            _context7.next = 22;
                            return transformer(action, element);
                          case 22:
                            _result = _context7.sent;
                            if (!(_result === false)) {
                              _context7.next = 25;
                              break;
                            }
                            return _context7.abrupt("return", false);
                          case 25:
                            _context7.next = 18;
                            break;
                          case 27:
                            _context7.next = 32;
                            break;
                          case 29:
                            _context7.prev = 29;
                            _context7.t0 = _context7["catch"](16);
                            _iterator5.e(_context7.t0);
                          case 32:
                            _context7.prev = 32;
                            _iterator5.f();
                            return _context7.finish(32);
                          case 35:
                            _context7.next = 42;
                            break;
                          case 37:
                            _context7.next = 39;
                            return transformer(action);
                          case 39:
                            _result2 = _context7.sent;
                            if (!(_result2 === false)) {
                              _context7.next = 42;
                              break;
                            }
                            return _context7.abrupt("return", false);
                          case 42:
                            _context7.next = 48;
                            break;
                          case 44:
                            _context7.prev = 44;
                            _context7.t1 = _context7["catch"](8);
                            logger.failed("Couldn't apply action ".concat(JSON.stringify(action), " with error ").concat(_context7.t1.message));
                            throw new Error("error-applying-action");
                          case 48:
                            _context7.next = 6;
                            break;
                          case 50:
                            _context7.next = 55;
                            break;
                          case 52:
                            _context7.prev = 52;
                            _context7.t2 = _context7["catch"](4);
                            _iterator4.e(_context7.t2);
                          case 55:
                            _context7.prev = 55;
                            _iterator4.f();
                            return _context7.finish(55);
                          case 58:
                            return _context7.abrupt("return", true);
                          case 61:
                            logger.failed("Jquery not found on window");
                            return _context7.abrupt("return", false);
                          case 63:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7, null, [[4, 52, 55, 58], [8, 44], [16, 29, 32, 35]]);
                  }));
                  return function actionApplicator(_x10) {
                    return _ref6.apply(this, arguments);
                  };
                }(); // Apply actions
                _context8.next = 21;
                return actionApplicator(actions);
              case 21:
                result = _context8.sent;
                return _context8.abrupt("return", result);
              case 23:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));
      return _applyActions.apply(this, arguments);
    }
    /* harmony default export */ var BeagleApplyActions = (applyActions);
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
          pageType = body.pageType,
          isOn = body.isOn;
        this.isOn = isOn;
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
            var robotPromises, _iterator, _step, treatment;
            return regenerator_default().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    robotPromises = [];
                    _iterator = robotEngine_createForOfIteratorHelper(this.matchedTreatments);
                    _context.prev = 2;
                    _iterator.s();
                  case 4:
                    if ((_step = _iterator.n()).done) {
                      _context.next = 17;
                      break;
                    }
                    treatment = _step.value;
                    _context.prev = 6;
                    if (!treatment.dependant_on_treatment) {
                      _context.next = 9;
                      break;
                    }
                    return _context.abrupt("continue", 15);
                  case 9:
                    robotPromises.push(this.engageRobot(treatment));
                    _context.next = 15;
                    break;
                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context["catch"](6);
                    robotEngine_logger.failed("Error engaging robot ".concat(treatment.id, ": ").concat(_context.t0.message || _context.t0));
                  case 15:
                    _context.next = 4;
                    break;
                  case 17:
                    _context.next = 22;
                    break;
                  case 19:
                    _context.prev = 19;
                    _context.t1 = _context["catch"](2);
                    _iterator.e(_context.t1);
                  case 22:
                    _context.prev = 22;
                    _iterator.f();
                    return _context.finish(22);
                  case 25:
                    _context.next = 27;
                    return Promise.all(robotPromises);
                  case 27:
                    this.initiateReapplyRobotMap();
                  case 28:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[2, 19, 22, 25], [6, 12]]);
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
            var id, actions, eligibilityRuleSet, device, dependant_on_treatment, businessRuleSet, weight, delay, helpers, debugMode, debugFilteredTreatments, engagementLock, identifier, isMobile, matchedTreatments, prepareAndApply, release, treatmentSkipRatio, determiningIdentifier, treatmentPct, businessRuleId;
            return regenerator_default().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    id = treatment.id, actions = treatment.actions, eligibilityRuleSet = treatment.eligibilityRuleSet, device = treatment.device, dependant_on_treatment = treatment.dependant_on_treatment, businessRuleSet = treatment.businessRuleSet, weight = treatment.weight, delay = treatment.delay, helpers = treatment.helpers;
                    debugMode = this.debugMode, debugFilteredTreatments = this.debugFilteredTreatments, engagementLock = this.engagementLock, identifier = this.identifier, isMobile = this.isMobile, matchedTreatments = this.matchedTreatments, prepareAndApply = this.prepareAndApply; // one engagement at a time
                    engagementLock[id] = engagementLock[id] || new Mutex();
                    _context3.next = 5;
                    return engagementLock[id].acquire();
                  case 5:
                    release = _context3.sent;
                    _context3.prev = 6;
                    if (!(debugMode && debugFilteredTreatments && !debugFilteredTreatments.includes(id))) {
                      _context3.next = 9;
                      break;
                    }
                    return _context3.abrupt("return");
                  case 9:
                    if (!(device === "mobile" && !isMobile)) {
                      _context3.next = 12;
                      break;
                    }
                    robotEngine_logger.failed("Treatment device 'mobile' mismatch");
                    return _context3.abrupt("return");
                  case 12:
                    if (!(device === "desktop" && isMobile)) {
                      _context3.next = 15;
                      break;
                    }
                    robotEngine_logger.failed("Treatment device 'desktop' mismatch");
                    return _context3.abrupt("return");
                  case 15:
                    robotEngine_logger.log("Starting base rule set check for treatment: " + id);
                    _context3.t0 = !eligibilityRuleSet;
                    if (_context3.t0) {
                      _context3.next = 21;
                      break;
                    }
                    _context3.next = 20;
                    return this.checkEligibilityRuleSet(eligibilityRuleSet);
                  case 20:
                    _context3.t0 = _context3.sent;
                  case 21:
                    if (!_context3.t0) {
                      _context3.next = 58;
                      break;
                    }
                    if (this.isOn) {
                      _context3.next = 25;
                      break;
                    }
                    addTreatment(id, null, null, "skipped");
                    return _context3.abrupt("return");
                  case 25:
                    treatmentSkipRatio = weight === 100 ? 0 : 100 - weight || TREATMENT_RATIO;
                    robotEngine_logger.log("Treatment skip ratio: " + treatmentSkipRatio);
                    // Determining identifier for calculating treatment percentage (treatmentPct)
                    determiningIdentifier = dependant_on_treatment || id; // treatmentPct is the percentage value for the treatment used to determine if it should be skipped or not
                    // treatmentPct is 100 when debug mode is 1, ensuring no treatments are skipped
                    if (!(debugMode === 1)) {
                      _context3.next = 32;
                      break;
                    }
                    _context3.t1 = 100;
                    _context3.next = 35;
                    break;
                  case 32:
                    _context3.next = 34;
                    return determinePct(identifier + determiningIdentifier);
                  case 34:
                    _context3.t1 = _context3.sent;
                  case 35:
                    treatmentPct = _context3.t1;
                    robotEngine_logger.log("TreatmentPct: " + treatmentPct + " with debug mode ".concat(debugMode ? "on" : "off"));
                    businessRuleId = null;
                    if (!businessRuleSet) {
                      _context3.next = 44;
                      break;
                    }
                    robotEngine_logger.log("Starting sub variant rule set check for treatment: " + id);
                    _context3.next = 42;
                    return this.checkBusinessRules(businessRuleSet);
                  case 42:
                    businessRuleId = _context3.sent;
                    if (businessRuleId !== null) {
                      robotEngine_logger.log("Applying business rule transformation with id: ", businessRuleId);
                    } else robotEngine_logger.log("Applying treatment with default values");
                  case 44:
                    if (!(treatmentPct < treatmentSkipRatio)) {
                      _context3.next = 48;
                      break;
                    }
                    robotEngine_logger.log("Treatment ".concat(id, " skipped due to treatment split ratio"));
                    addTreatment(id, businessRuleId, null, "skipped", dependant_on_treatment);
                    return _context3.abrupt("return");
                  case 48:
                    if (delay) {
                      _context3.next = 55;
                      break;
                    }
                    _context3.next = 51;
                    return prepareAndApply(id, identifier, actions, businessRuleId, debugMode);
                  case 51:
                    _context3.next = 53;
                    return this.engageHelpers(helpers, matchedTreatments);
                  case 53:
                    _context3.next = 56;
                    break;
                  case 55:
                    setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                      return regenerator_default().wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return prepareAndApply(id, identifier, actions, businessRuleId, debugMode);
                            case 2:
                              _context2.next = 4;
                              return _this.engageHelpers(helpers, matchedTreatments);
                            case 4:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    })), delay);
                  case 56:
                    _context3.next = 59;
                    break;
                  case 58:
                    robotEngine_logger.failed("Rule check failed for treatment:", id);
                  case 59:
                    _context3.prev = 59;
                    release();
                    this.addReapplyEvent(treatment);
                    this.addRuleSetDataListeners(treatment);
                    return _context3.finish(59);
                  case 64:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[6,, 59, 64]]);
          }));
          function engageRobot(_x) {
            return _engageRobot.apply(this, arguments);
          }
          return engageRobot;
        }()
      }, {
        key: "engageHelpers",
        value: function () {
          var _engageHelpers = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(helpers, matchedTreatments) {
            var helperRobotPromises, _iterator2, _step2, treatment;
            return regenerator_default().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(Array.isArray(helpers) && helpers.length)) {
                      _context4.next = 22;
                      break;
                    }
                    helperRobotPromises = [];
                    _iterator2 = robotEngine_createForOfIteratorHelper(matchedTreatments);
                    _context4.prev = 3;
                    _iterator2.s();
                  case 5:
                    if ((_step2 = _iterator2.n()).done) {
                      _context4.next = 12;
                      break;
                    }
                    treatment = _step2.value;
                    if (helpers.includes(treatment.id)) {
                      _context4.next = 9;
                      break;
                    }
                    return _context4.abrupt("continue", 10);
                  case 9:
                    helperRobotPromises.push(this.engageRobot(treatment));
                  case 10:
                    _context4.next = 5;
                    break;
                  case 12:
                    _context4.next = 17;
                    break;
                  case 14:
                    _context4.prev = 14;
                    _context4.t0 = _context4["catch"](3);
                    _iterator2.e(_context4.t0);
                  case 17:
                    _context4.prev = 17;
                    _iterator2.f();
                    return _context4.finish(17);
                  case 20:
                    _context4.next = 22;
                    return Promise.all(helperRobotPromises);
                  case 22:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this, [[3, 14, 17, 20]]);
          }));
          function engageHelpers(_x2, _x3) {
            return _engageHelpers.apply(this, arguments);
          }
          return engageHelpers;
        }()
      }, {
        key: "prepareAndApply",
        value: function () {
          var _prepareAndApply = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(id, identifier, actions, businessRuleId, debugMode) {
            var _yield$prepareActions, _yield$prepareActions2, prepared, variant, res;
            return regenerator_default().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return prepareActions(identifier, actions, businessRuleId, debugMode);
                  case 2:
                    _yield$prepareActions = _context5.sent;
                    _yield$prepareActions2 = _slicedToArray(_yield$prepareActions, 2);
                    prepared = _yield$prepareActions2[0];
                    variant = _yield$prepareActions2[1];
                    _context5.next = 8;
                    return BeagleApplyActions(prepared);
                  case 8:
                    res = _context5.sent;
                    if (res === true) {
                      addTreatment(id, businessRuleId, variant, "applied");
                    } else if (res === false) {
                      addTreatment(id, businessRuleId, variant, "failed");
                    }
                  case 10:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));
          function prepareAndApply(_x4, _x5, _x6, _x7, _x8) {
            return _prepareAndApply.apply(this, arguments);
          }
          return prepareAndApply;
        }()
      }, {
        key: "addReapplyEvent",
        value: function addReapplyEvent(treatment) {
          var pageType = this.pageType,
            reApplyTreatmentsMap = this.reApplyTreatmentsMap;
          var id = treatment.id,
            reapply_event = treatment.reapply_event,
            reapply_event_page_type = treatment.reapply_event_page_type;
          if (reapply_event) {
            if (!reapply_event_page_type || reapply_event_page_type === pageType) {
              var reapply_event_array = reapply_event;
              if (!Array.isArray(reapply_event)) reapply_event_array = [reapply_event];
              robotEngine_logger.log("Reapply event '".concat(reapply_event, "' found for treatment: ").concat(id));
              var _iterator3 = robotEngine_createForOfIteratorHelper(reapply_event_array),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var reapplyEvent = _step3.value;
                  var previousValue = reApplyTreatmentsMap[reapplyEvent] ? reApplyTreatmentsMap[reapplyEvent] : [];
                  if (previousValue.includes(id)) {
                    robotEngine_logger.log("Treatment already added for reapply event");
                  } else reApplyTreatmentsMap[reapplyEvent] = [].concat(_toConsumableArray(previousValue), [id]);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }
        }
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
                    var _iterator4 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                      _step4;
                    try {
                      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                        var treatment = _step4.value;
                        robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from infinite_scroll"));
                        _this2.engageRobot(treatment);
                      }
                    } catch (err) {
                      _iterator4.e(err);
                    } finally {
                      _iterator4.f();
                    }
                  });
                  observer.observe(window.top.document.documentElement);
                }
                break;
              case "timeout":
                {
                  setTimeout(function () {
                    var _iterator5 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                      _step5;
                    try {
                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        var treatment = _step5.value;
                        robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from timeout"));
                        _this2.engageRobot(treatment);
                      }
                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }
                  }, 500);
                }
                break;
              case "element_change":
                {
                  var _iterator6 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step6;
                  try {
                    var _loop2 = function _loop2() {
                      var treatment = _step6.value;
                      var reapplySelectorList = Array.isArray(treatment.reapply_selector) ? treatment.reapply_selector : [treatment.reapply_selector];
                      var _iterator7 = robotEngine_createForOfIteratorHelper(reapplySelectorList),
                        _step7;
                      try {
                        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                          var selector = _step7.value;
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
                        _iterator7.e(err);
                      } finally {
                        _iterator7.f();
                      }
                    };
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                      _loop2();
                    }
                  } catch (err) {
                    _iterator6.e(err);
                  } finally {
                    _iterator6.f();
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
                      var _iterator8 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                        _step8;
                      try {
                        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                          var treatment = _step8.value;
                          robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from on_scroll"));
                          _this2.engageRobot(treatment);
                        }
                      } catch (err) {
                        _iterator8.e(err);
                      } finally {
                        _iterator8.f();
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
                      var _iterator9 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                        _step9;
                      try {
                        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                          var treatment = _step9.value;
                          robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from query_search_change"));
                          _this2.engageRobot(treatment);
                        }
                      } catch (err) {
                        _iterator9.e(err);
                      } finally {
                        _iterator9.f();
                      }
                    }
                  });
                  _observer2.observe(document, OBSERVER_CONFIG);
                }
                break;
              case "interval":
                var _iterator10 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step10;
                try {
                  var _loop3 = function _loop3() {
                    var treatment = _step10.value;
                    var reapplyInterval = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
                      var applied;
                      return regenerator_default().wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              _context6.next = 2;
                              return getFromBeagleInfoLayer("a", true);
                            case 2:
                              applied = _context6.sent;
                              if (!(applied !== null && applied !== void 0 && applied[treatment.id])) {
                                _context6.next = 7;
                                break;
                              }
                              clearInterval(reapplyInterval);
                              _context6.next = 10;
                              break;
                            case 7:
                              robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from interval"));
                              _context6.next = 10;
                              return _this2.engageRobot(treatment);
                            case 10:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6);
                    })), 50);
                    setTimeout(function () {
                      clearInterval(reapplyInterval);
                    }, 2500);
                  };
                  for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                    _loop3();
                  }
                } catch (err) {
                  _iterator10.e(err);
                } finally {
                  _iterator10.f();
                }
                break;
              case "info_layer_change":
                var _iterator11 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step11;
                try {
                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    var treatment = _step11.value;
                    var boundEngageTreatment = _this2.engageRobot.bind(_this2, treatment);
                    addDataListener(treatment.reapply_selector, boundEngageTreatment);
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
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
          var _addRuleSetDataListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7(treatment) {
            var _treatment$eligibilit, eligibilityRuleSet, _treatment$businessRu, businessRuleSet, id, selectors, boundEngageTreatment, _iterator12, _step12, selector;
            return regenerator_default().wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _treatment$eligibilit = treatment.eligibilityRuleSet, eligibilityRuleSet = _treatment$eligibilit === void 0 ? [] : _treatment$eligibilit, _treatment$businessRu = treatment.businessRuleSet, businessRuleSet = _treatment$businessRu === void 0 ? [] : _treatment$businessRu, id = treatment.id;
                    if (!this.addedDataListenerIds.includes(id)) {
                      _context7.next = 3;
                      break;
                    }
                    return _context7.abrupt("return");
                  case 3:
                    selectors = this.extractDataListenerSelectors([].concat(_toConsumableArray(eligibilityRuleSet), _toConsumableArray(businessRuleSet)));
                    boundEngageTreatment = this.engageRobot.bind(this, treatment);
                    _iterator12 = robotEngine_createForOfIteratorHelper(selectors);
                    try {
                      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                        selector = _step12.value;
                        addDataListener("__eRules.".concat(selector), boundEngageTreatment);
                      }
                    } catch (err) {
                      _iterator12.e(err);
                    } finally {
                      _iterator12.f();
                    }
                    this.addedDataListenerIds.push(id);
                  case 8:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));
          function addRuleSetDataListeners(_x9) {
            return _addRuleSetDataListeners.apply(this, arguments);
          }
          return addRuleSetDataListeners;
        }()
      }, {
        key: "extractDataListenerSelectors",
        value: function extractDataListenerSelectors(ruleSet) {
          var previousSelectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var selectors = previousSelectors || [];
          var _iterator13 = robotEngine_createForOfIteratorHelper(ruleSet),
            _step13;
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var rule = _step13.value;
              if (typeof rule === "string") {
                if (rule.startsWith("!")) rule = rule.slice(1);
                selectors.push(rule.split(".")[0]);
                continue;
              }
              this.extractDataListenerSelectors(rule.set, selectors);
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
          return _toConsumableArray(new Set(selectors));
        }
      }, {
        key: "checkEligibility",
        value: function () {
          var _checkEligibility = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8(eligibilityRule) {
            var oppositeFlag, _eligibilityRule$spli, _eligibilityRule$spli2, eligibilityScope, eligibilityName, res;
            return regenerator_default().wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    robotEngine_logger.log("Checking eligibility ".concat(eligibilityRule));
                    oppositeFlag = false;
                    _eligibilityRule$spli = eligibilityRule.split("."), _eligibilityRule$spli2 = _slicedToArray(_eligibilityRule$spli, 2), eligibilityScope = _eligibilityRule$spli2[0], eligibilityName = _eligibilityRule$spli2[1];
                    if (eligibilityScope.startsWith("!")) {
                      oppositeFlag = true;
                      eligibilityScope = eligibilityScope.slice(1);
                    }
                    _context8.next = 6;
                    return getFromBeagleInfoLayer("__eRules.".concat(eligibilityScope));
                  case 6:
                    res = _context8.sent;
                    if (!(!res || !Array.isArray(res))) {
                      _context8.next = 9;
                      break;
                    }
                    return _context8.abrupt("return", false);
                  case 9:
                    if (!(oppositeFlag && res.includes(eligibilityName))) {
                      _context8.next = 11;
                      break;
                    }
                    return _context8.abrupt("return", false);
                  case 11:
                    if (!(!oppositeFlag && !res.includes(eligibilityName))) {
                      _context8.next = 13;
                      break;
                    }
                    return _context8.abrupt("return", false);
                  case 13:
                    robotEngine_logger.log("".concat(eligibilityRule, " is eligible"));
                    return _context8.abrupt("return", true);
                  case 15:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }));
          function checkEligibility(_x10) {
            return _checkEligibility.apply(this, arguments);
          }
          return checkEligibility;
        }()
      }, {
        key: "checkEligibilityRuleSet",
        value: function () {
          var _checkEligibilityRuleSet = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9(eligibilityRuleSet) {
            var eligibilitySetType,
              previousIsEligible,
              isEligible,
              _iterator14,
              _step14,
              eligibilityRule,
              _args9 = arguments;
            return regenerator_default().wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    eligibilitySetType = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
                    previousIsEligible = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : null;
                    robotEngine_logger.log("Checking robot eligibility");
                    if (Array.isArray(eligibilityRuleSet)) {
                      _context9.next = 6;
                      break;
                    }
                    robotEngine_logger.failed("Eligibility Rule Set ".concat(eligibilityRuleSet, " is not an array"));
                    return _context9.abrupt("return", false);
                  case 6:
                    isEligible = previousIsEligible;
                    _iterator14 = robotEngine_createForOfIteratorHelper(eligibilityRuleSet);
                    _context9.prev = 8;
                    _iterator14.s();
                  case 10:
                    if ((_step14 = _iterator14.n()).done) {
                      _context9.next = 57;
                      break;
                    }
                    eligibilityRule = _step14.value;
                    if (!(typeof eligibilityRule === "string")) {
                      _context9.next = 49;
                      break;
                    }
                    if (eligibilitySetType) {
                      _context9.next = 21;
                      break;
                    }
                    _context9.next = 16;
                    return this.checkEligibility(eligibilityRule);
                  case 16:
                    isEligible = _context9.sent;
                    if (isEligible) {
                      _context9.next = 19;
                      break;
                    }
                    return _context9.abrupt("return", false);
                  case 19:
                    _context9.next = 47;
                    break;
                  case 21:
                    if (!eligibilitySetType) {
                      _context9.next = 47;
                      break;
                    }
                    if (!(isEligible === null)) {
                      _context9.next = 27;
                      break;
                    }
                    _context9.next = 25;
                    return this.checkEligibility(eligibilityRule);
                  case 25:
                    isEligible = _context9.sent;
                    return _context9.abrupt("continue", 55);
                  case 27:
                    _context9.t0 = eligibilitySetType;
                    _context9.next = _context9.t0 === "or" ? 30 : _context9.t0 === "and" ? 37 : 44;
                    break;
                  case 30:
                    _context9.t1 = isEligible;
                    if (_context9.t1) {
                      _context9.next = 35;
                      break;
                    }
                    _context9.next = 34;
                    return this.checkEligibility(eligibilityRule, eligibilitySetType);
                  case 34:
                    _context9.t1 = _context9.sent;
                  case 35:
                    isEligible = _context9.t1;
                    return _context9.abrupt("break", 47);
                  case 37:
                    _context9.t2 = isEligible;
                    if (!_context9.t2) {
                      _context9.next = 42;
                      break;
                    }
                    _context9.next = 41;
                    return this.checkEligibility(eligibilityRule, eligibilitySetType);
                  case 41:
                    _context9.t2 = _context9.sent;
                  case 42:
                    isEligible = _context9.t2;
                    return _context9.abrupt("break", 47);
                  case 44:
                    robotEngine_logger.failed("Unknown eligibilitySetType: ", eligibilitySetType);
                    isEligible = false;
                    return _context9.abrupt("break", 47);
                  case 47:
                    _context9.next = 55;
                    break;
                  case 49:
                    if (!(_typeof(eligibilityRule) === "object")) {
                      _context9.next = 55;
                      break;
                    }
                    _context9.next = 52;
                    return this.checkEligibilityRuleSet(eligibilityRule.set, eligibilityRule.type, isEligible);
                  case 52:
                    isEligible = _context9.sent;
                    if (isEligible) {
                      _context9.next = 55;
                      break;
                    }
                    return _context9.abrupt("return", false);
                  case 55:
                    _context9.next = 10;
                    break;
                  case 57:
                    _context9.next = 62;
                    break;
                  case 59:
                    _context9.prev = 59;
                    _context9.t3 = _context9["catch"](8);
                    _iterator14.e(_context9.t3);
                  case 62:
                    _context9.prev = 62;
                    _iterator14.f();
                    return _context9.finish(62);
                  case 65:
                    return _context9.abrupt("return", isEligible);
                  case 66:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this, [[8, 59, 62, 65]]);
          }));
          function checkEligibilityRuleSet(_x11) {
            return _checkEligibilityRuleSet.apply(this, arguments);
          }
          return checkEligibilityRuleSet;
        }() // Return index of businessRule, this is the businessRuleId
      }, {
        key: "checkBusinessRules",
        value: function () {
          var _checkBusinessRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10(businessRuleSet) {
            var _iterator15, _step15, _step15$value, index, businessRule;
            return regenerator_default().wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _iterator15 = robotEngine_createForOfIteratorHelper(businessRuleSet.entries());
                    _context10.prev = 1;
                    _iterator15.s();
                  case 3:
                    if ((_step15 = _iterator15.n()).done) {
                      _context10.next = 11;
                      break;
                    }
                    _step15$value = _slicedToArray(_step15.value, 2), index = _step15$value[0], businessRule = _step15$value[1];
                    _context10.next = 7;
                    return this.checkEligibilityRuleSet([businessRule]);
                  case 7:
                    if (!_context10.sent) {
                      _context10.next = 9;
                      break;
                    }
                    return _context10.abrupt("return", index);
                  case 9:
                    _context10.next = 3;
                    break;
                  case 11:
                    _context10.next = 16;
                    break;
                  case 13:
                    _context10.prev = 13;
                    _context10.t0 = _context10["catch"](1);
                    _iterator15.e(_context10.t0);
                  case 16:
                    _context10.prev = 16;
                    _iterator15.f();
                    return _context10.finish(16);
                  case 19:
                    return _context10.abrupt("return", null);
                  case 20:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this, [[1, 13, 16, 19]]);
          }));
          function checkBusinessRules(_x12) {
            return _checkBusinessRules.apply(this, arguments);
          }
          return checkBusinessRules;
        }()
      }]);
      return RobotEngine;
    }();
    
    ;// CONCATENATED MODULE: ./src/BeagleRuleEngine/dataLayerChecker.js
    
    
    
    
    
    var dataLayerChecker_logger = new src_logger("BeagleInfoLayerChecker");
    var checkDataLayerRule = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(rule) {
        var operator, condition, value, runtimeValue;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dataLayerChecker_logger.log("Checking rule with operator", rule.operator);
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
                return getFromBeagleInfoLayer(key);
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
      elementChecker_logger.log("Checking rule for selector", rule.selector || rule.selectorAll);
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
      functionChecker_logger.log("Checking function rule");
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
      sessionChecker_logger.log("Checking rule for operator", rule.operator);
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
      urlChecker_logger.log("Checking rule for operator", rule.operator);
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
      envChecker_logger.log("Checking rule for operator: ", rule.operator);
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
    var checkProductInfoRule = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(rule) {
        var _skuList$Object$keys$;
        var operator, condition, value, skuList, runtimeValue, sku;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                productInfoChecker_logger.log("Checking rule for operator: ", rule.operator);
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
                return getFromDB(sku);
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
                return getFromDB(sku);
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
                return getFromDB(sku);
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
    var getFromDB = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(sku) {
        var db;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return store.getInstance();
              case 2:
                db = _context5.sent;
                _context5.next = 5;
                return db.get(sku);
              case 5:
                return _context5.abrupt("return", _context5.sent);
              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      return function getFromDB(_x5) {
        return _ref5.apply(this, arguments);
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
                    return _context2.abrupt("return", ruleSatisfied ? rule.name || true : false);
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
            var keyPromisesMap, _i, _Object$entries, _Object$entries$_i, key, rules, _iterator2, _step2, rule, _i2, _Object$entries2, _Object$entries2$_i, _key, rulePromises, satisfiedRuleIds;
            return regenerator_default().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    addToBeagleInfoLayer("m", "assessing-eligibility-rules");
                    keyPromisesMap = {};
                    for (_i = 0, _Object$entries = Object.entries(this.eligibilityRules); _i < _Object$entries.length; _i++) {
                      _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], rules = _Object$entries$_i[1];
                      keyPromisesMap[key] = [];
                      _iterator2 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                      try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                          rule = _step2.value;
                          keyPromisesMap[key].push(this.checkRule(rule));
                        }
                      } catch (err) {
                        _iterator2.e(err);
                      } finally {
                        _iterator2.f();
                      }
                    }
                    _i2 = 0, _Object$entries2 = Object.entries(keyPromisesMap);
                  case 4:
                    if (!(_i2 < _Object$entries2.length)) {
                      _context3.next = 14;
                      break;
                    }
                    _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), _key = _Object$entries2$_i[0], rulePromises = _Object$entries2$_i[1];
                    _context3.next = 8;
                    return Promise.all(rulePromises);
                  case 8:
                    satisfiedRuleIds = _context3.sent;
                    addToBeagleInfoLayer("__eRules.".concat(_key), satisfiedRuleIds.filter(function (id) {
                      return id !== false;
                    }));
                    this.setUpListeners(_key, this.eligibilityRules[_key]);
                  case 11:
                    _i2++;
                    _context3.next = 4;
                    break;
                  case 14:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
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
                              _context4.next = 23;
                              break;
                            case 19:
                              if (current.includes(rule.name)) {
                                _context4.next = 21;
                                break;
                              }
                              return _context4.abrupt("return", "continue");
                            case 21:
                              filtered = current.filter(function (k) {
                                return k !== rule.name;
                              });
                              addToBeagleInfoLayer("__eRules.".concat(key), filtered);
                            case 23:
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
            var _this$extractRuleAttr, dataLayerRules, elementRules, _i3, _Object$entries3, _Object$entries3$_i, operator, _rules, boundAssesEligibilityRulesCallBack, _loop2, _i4, _Object$entries4;
            return regenerator_default().wrap(function _callee5$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _this$extractRuleAttr = this.extractRuleAttributes(rules), dataLayerRules = _this$extractRuleAttr.dataLayerRules, elementRules = _this$extractRuleAttr.elementRules;
                    for (_i3 = 0, _Object$entries3 = Object.entries(dataLayerRules); _i3 < _Object$entries3.length; _i3++) {
                      _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), operator = _Object$entries3$_i[0], _rules = _Object$entries3$_i[1];
                      boundAssesEligibilityRulesCallBack = this.assesEligibilityRulesCallBack.bind(this, key, _rules);
                      addDataListener(operator, boundAssesEligibilityRulesCallBack);
                    }
                    _loop2 = function _loop2() {
                      var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
                        selector = _Object$entries4$_i[0],
                        rules = _Object$entries4$_i[1];
                      var observer = new MutationObserver(function (mutationList) {
                        if (window.top.document.readyState !== "complete") return;
                        var nodes = [];
                        var _iterator4 = BeagleRuleEngine_createForOfIteratorHelper(mutationList),
                          _step4;
                        try {
                          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                            var mutationRecord = _step4.value;
                            nodes = [].concat(_toConsumableArray(nodes), _toConsumableArray(Array.from(mutationRecord.addedNodes)), _toConsumableArray(Array.from(mutationRecord.removedNodes)));
                          }
                          // exclude mutations that only update text
                        } catch (err) {
                          _iterator4.e(err);
                        } finally {
                          _iterator4.f();
                        }
                        if (nodes.every(function (n) {
                          return n.tagName === undefined;
                        })) return;
                        _this2.assesEligibilityRulesCallBack(key, rules);
                      });
                      if (selector === "body") {
                        observer.observe(window.top.document.body, {
                          subtree: true,
                          childList: true
                        });
                      } else {
                        observer.observe(window.top.document.querySelector(selector).parentNode, {
                          subtree: true,
                          childList: true
                        });
                      }
                    };
                    for (_i4 = 0, _Object$entries4 = Object.entries(elementRules); _i4 < _Object$entries4.length; _i4++) {
                      _loop2();
                    }
                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee5, this);
          }));
          function setUpListeners(_x4, _x5) {
            return _setUpListeners.apply(this, arguments);
          }
          return setUpListeners;
        }()
      }, {
        key: "extractRuleAttributes",
        value: function extractRuleAttributes(rules) {
          var dataLayerRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var elementRules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (!rules || !rules.length) return;
          var _iterator5 = BeagleRuleEngine_createForOfIteratorHelper(rules),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var rule = _step5.value;
              var type = rule.type;
              switch (type) {
                case "dataLayer":
                  if (!dataLayerRules[rule.operator]) {
                    dataLayerRules[rule.operator] = [];
                  }
                  dataLayerRules[rule.operator].push(rule);
                  break;
                case "element":
                  if (document.querySelector(rule.selector)) {
                    elementRules[rule.selector] = elementRules[rule.selector] ? [].concat(_toConsumableArray(elementRules[rule.selector]), [rule]) : [rule];
                    break;
                  }
                  if (document.querySelectorAll(rule.selectorAll).length) {
                    elementRules[rule.selectorAll] = elementRules[rule.selectorAll] ? [].concat(_toConsumableArray(elementRules[rule.selectorAll]), [rule]) : [rule];
                    break;
                  }
                  elementRules["body"] = elementRules["body"] ? [].concat(_toConsumableArray(elementRules["body"]), [rule]) : [rule];
                  break;
              }
              if (rule.chain) {
                this.extractRuleAttributes([rule.chain], dataLayerRules, elementRules);
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          return {
            dataLayerRules: dataLayerRules,
            elementRules: elementRules
          };
        }
      }], [{
        key: "getEligibilityRules",
        value: function () {
          var _getEligibilityRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
            var eligibilityRulesObj, elapsedHours;
            return regenerator_default().wrap(function _callee6$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    eligibilityRulesObj = window.localStorage.getItem(LOCAL_STORAGE_KEYS.ELIGIBILITY_RULES);
                    if (!eligibilityRulesObj) {
                      _context7.next = 8;
                      break;
                    }
                    eligibilityRulesObj = JSON.parse(eligibilityRulesObj);
                    if (!eligibilityRulesObj.timestamp) {
                      _context7.next = 8;
                      break;
                    }
                    elapsedHours = (Date.now() - eligibilityRulesObj.timestamp) / (1000 * 3600);
                    if (!(elapsedHours < LOCAL_STORAGE_TTL_HOURS)) {
                      _context7.next = 8;
                      break;
                    }
                    return _context7.abrupt("return", eligibilityRulesObj.rules);
                  case 8:
                    _context7.next = 10;
                    return fetchEligibilityRules();
                  case 10:
                    eligibilityRulesObj = _context7.sent;
                    if (eligibilityRulesObj) {
                      _context7.next = 14;
                      break;
                    }
                    BeagleRuleEngine_logger.failed("Failed to fetch eligibility rules");
                    return _context7.abrupt("return", null);
                  case 14:
                    eligibilityRulesObj = {
                      rules: eligibilityRulesObj,
                      timestamp: Date.now()
                    };
                    window.localStorage.setItem(LOCAL_STORAGE_KEYS.ELIGIBILITY_RULES, JSON.stringify(eligibilityRulesObj));
                    return _context7.abrupt("return", eligibilityRulesObj.rules);
                  case 19:
                    _context7.prev = 19;
                    _context7.t0 = _context7["catch"](0);
                    BeagleRuleEngine_logger.failed("Could not get eligibility rules: ", _context7.t0.message);
                    return _context7.abrupt("return", null);
                  case 23:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee6, null, [[0, 19]]);
          }));
          function getEligibilityRules() {
            return _getEligibilityRules.apply(this, arguments);
          }
          return getEligibilityRules;
        }()
      }]);
      return RuleEngine;
    }();
    
    ;// CONCATENATED MODULE: ./src/BeagleOn/index.js
    
    
    
    
    
    
    
    
    
    var BeagleOn_logger = new src_logger("BeagleOnComponent");
    var beagleOn = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(identifier, debugMode, pageType, treatmentWeights, isOn) {
        var eligibilityRulesAssessPromise, treatmentsPromise, searchParams, debugFilteredTreatments, treatments, treatmentRepository, matchedTreatments, productInfoDB, robotEngine;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                addToBeagleInfoLayer("m", "on-init");
                eligibilityRulesAssessPromise = assesEligibilityRules();
                treatmentsPromise = BeagleTreatmentRepository.getTreatments();
                injectStyleSheet();
                initiateSessionStorages();
                addToBeagleInfoLayer("m", "on-config-fetch");
                searchParams = window.location.search;
                debugFilteredTreatments = null;
                if (debugMode && searchParams.includes("filter=")) {
                  debugFilteredTreatments = searchParams.slice(searchParams.indexOf("[") + 1, searchParams.lastIndexOf("]")).split(",").map(function (item) {
                    return parseInt(item, 10);
                  });
                }
                _context.next = 11;
                return treatmentsPromise;
              case 11:
                treatments = _context.sent;
                if (treatments) {
                  _context.next = 14;
                  break;
                }
                throw new Error("no-robot-weights");
              case 14:
                BeagleOn_logger.success("Found treatments: ", treatments);
                addToBeagleInfoLayer("m", "fetched-treatments");
                treatmentRepository = new BeagleTreatmentRepository({
                  treatments: treatments,
                  treatmentWeights: treatmentWeights
                });
                _context.next = 19;
                return treatmentRepository.getMatchedTreatments(debugMode);
              case 19:
                matchedTreatments = _context.sent;
                if (!(matchedTreatments === null)) {
                  _context.next = 22;
                  break;
                }
                throw new Error("no-user-segment");
              case 22:
                if (matchedTreatments.length) {
                  _context.next = 24;
                  break;
                }
                throw new Error("no-robot-matched");
              case 24:
                addToBeagleInfoLayer("m", "found-matched-robots");
                _context.prev = 25;
                _context.next = 28;
                return eligibilityRulesAssessPromise;
              case 28:
                _context.next = 33;
                break;
              case 30:
                _context.prev = 30;
                _context.t0 = _context["catch"](25);
                throw new Error("no-rules-assessed");
              case 33:
                addToBeagleInfoLayer("m", "rules-assessed");
                if (!(isOn || debugMode)) {
                  _context.next = 46;
                  break;
                }
                _context.prev = 35;
                _context.next = 38;
                return store.getInstance();
              case 38:
                productInfoDB = _context.sent;
                _context.next = 41;
                return productInfoDB.persistProductInfo();
              case 41:
                _context.next = 46;
                break;
              case 43:
                _context.prev = 43;
                _context.t1 = _context["catch"](35);
                throw new Error("product-info-no-persist");
              case 46:
                addToBeagleInfoLayer("m", "engaging-robots");
                robotEngine = new RobotEngine({
                  debugFilteredTreatments: debugFilteredTreatments,
                  debugMode: debugMode,
                  matchedTreatments: matchedTreatments,
                  identifier: identifier,
                  pageType: pageType,
                  isOn: isOn
                });
                _context.next = 50;
                return robotEngine.engageRobots();
              case 50:
                removeDocumentHide();
                addToBeagleInfoLayer("m", "robots-engaged");
                _context.t2 = BeagleOn_logger;
                _context.next = 55;
                return getFromBeagleInfoLayer("a");
              case 55:
                _context.t3 = _context.sent;
                _context.t2.success.call(_context.t2, "Applied treatments: ", _context.t3);
              case 57:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[25, 30], [35, 43]]);
      }));
      return function beagleOn(_x, _x2, _x3, _x4, _x5) {
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
                addToBeagleInfoLayer("m", "fetching-eligibility-rules");
                _context2.next = 3;
                return RuleEngine.getEligibilityRules();
              case 3:
                eligibilityRules = _context2.sent;
                if (eligibilityRules) {
                  _context2.next = 6;
                  break;
                }
                return _context2.abrupt("return");
              case 6:
                addToBeagleInfoLayer("m", "fetched-eligibility-rules");
                ruleEngine = new RuleEngine({
                  eligibilityRules: eligibilityRules
                });
                _context2.next = 10;
                return ruleEngine.assesEligibilityRules();
              case 10:
                addToBeagleInfoLayer("m", "assessed-eligibility-rules");
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _assesEligibilityRules.apply(this, arguments);
    }
    /* harmony default export */ var BeagleOn = (beagleOn);
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
                _context.prev = 1;
                _i = 0, _Object$keys = Object.keys(treatmentWeights);
              case 3:
                if (!(_i < _Object$keys.length)) {
                  _context.next = 18;
                  break;
                }
                segment = _Object$keys[_i];
                ruleSet = (_treatmentWeights$seg = treatmentWeights[segment]) === null || _treatmentWeights$seg === void 0 ? void 0 : _treatmentWeights$seg.ruleSet;
                if (ruleSet) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("continue", 15);
              case 8:
                segmentRuleEngine = new RuleEngine({
                  baseRuleSet: ruleSet,
                  businessRuleSet: []
                });
                _context.next = 11;
                return segmentRuleEngine.checkRules();
              case 11:
                if (!_context.sent) {
                  _context.next = 15;
                  break;
                }
                segment_computer_logger.log("User segment matched: ".concat(segment));
                addToBeagleInfoLayer("s", segment);
                return _context.abrupt("return", segment);
              case 15:
                _i++;
                _context.next = 3;
                break;
              case 18:
                segment_computer_logger.log("User segment not matched");
                return _context.abrupt("return", null);
              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](1);
                segment_computer_logger.failed("Could not compute user segment");
                return _context.abrupt("return", null);
              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 22]]);
      }));
      return _computeSegment.apply(this, arguments);
    }
    ;// CONCATENATED MODULE: ./src/BeagleClientSDK/index.js
    
    
    
    
    
    
    
    
    
    
    var SHUTDOWN = false;
    _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
      var monitor, logger, earlyLogSent, _String$prototype, _String$prototype2, identifier, cookiePct, treatmentWeightsPromise, oosBreak, oosReason, isLabelSent, timeoutCounter, debugMode, status, userSegment, treatmentWeights, processAdminUser, isAdmin, isOn, pageType;
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              switchToEaseOut();
              monitor = null;
              logger = new src_logger();
              logger.info("Beagle initializing");
              window.dataLayer = window.dataLayer || [];
              earlyLogSent = false;
              _context.prev = 6;
              /* ==================================== CRITICAL INIT TASKS ================================ */
    
              addToBeagleInfoLayer("GLOV_ON", "not-sent | initializing");
              setURLData();
              addToBeagleInfoLayer("view_epoch", Date.now() + Math.random());
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
              addToBeagleInfoLayer("onHashPct", cookiePct);
              addToBeagleInfoLayer("v", VERSION);
              addToBeagleInfoLayer("sr", SPLIT_RATIO);
              monitor = new BeagleMonitor();
              // data-less log to detect bounces
              _context.next = 24;
              return monitor.packAndQueueArrivalLog();
            case 24:
              /* ==================================== ASYNC INIT TASKS =================================== */
    
              initializeBeagleInfoLayer();
              treatmentWeightsPromise = BeagleTreatmentRepository.getTreatmentWeights(); // SLA: 2 seconds to flicker
              setTimeout(function () {
                removeDocumentHide();
              }, 2000);
    
              /* ================================= TIME-OUT SESSION BREAKER ============================== */
              oosBreak = false;
              oosReason = window.localStorage.getItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE);
              isLabelSent = sessionStorage.getItem(SESSION_STORAGE_KEYS.IS_LABEL_SENT);
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
              throw new Error("max-timeout");
            case 36:
              /* ================================= EARLY PRUNE OUT-OF-SCOPE ============================== */
    
              // test cookie, beacon, and string utils support
              if (cookiePct === null || !navigator.sendBeacon || typeof navigator.sendBeacon !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype = String.prototype) === null || _String$prototype === void 0 ? void 0 : _String$prototype.padStart) !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype2 = String.prototype) === null || _String$prototype2 === void 0 ? void 0 : _String$prototype2.match) !== "function" || oosReason && oosReason === "unsupported") {
                oosBreak = true;
              }
    
              // check if userAgent can be properly parsed
              if (!oosBreak) {
                status = setAgentDetails(); // if agent cannot be parsed, do early break
                if (!status) {
                  oosBreak = true;
                }
              }
    
              // attempt to compute user segment
              userSegment = null;
              treatmentWeights = null;
              if (oosBreak) {
                _context.next = 54;
                break;
              }
              _context.next = 43;
              return treatmentWeightsPromise;
            case 43:
              treatmentWeights = _context.sent;
              if (treatmentWeights) {
                _context.next = 50;
                break;
              }
              sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
              addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
              throw new Error("no-robot-weights");
            case 50:
              _context.next = 52;
              return computeSegment(treatmentWeights);
            case 52:
              userSegment = _context.sent;
            case 53:
              if (!userSegment) {
                oosBreak = true;
              }
            case 54:
              if (!oosBreak) {
                _context.next = 59;
                break;
              }
              window.dataLayer.push({
                event: "GLOV",
                GLOV_ON: "unsupported"
              });
              window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "unsupported");
              addToBeagleInfoLayer("GLOV_ON", "unsupported | device");
              throw new Error("unsupported-device");
            case 59:
              /* =================================== ADMIN USER CHECK ==================================== */
              // TODO: rename showroom logic to admin, and map vvsIsShowroom to a configurable admin param
              // if admin user, make out of scope and mark as employee
              processAdminUser = function processAdminUser() {
                window.dataLayer.push({
                  event: "GLOV",
                  GLOV_ON: "employee"
                });
                window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "employee");
                window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, true);
                addToBeagleInfoLayer("GLOV_ON", "employee | admin");
                throw new Error("admin-employee");
              };
              isAdmin = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_ADMIN); // if not found in localStorage, check beagleInfoLayer with blocking mdoe
              if (!(isAdmin === null || isAdmin === undefined)) {
                _context.next = 67;
                break;
              }
              _context.next = 64;
              return getFromBeagleInfoLayer("vvsIsShowroom", true);
            case 64:
              isAdmin = _context.sent;
              _context.next = 68;
              break;
            case 67:
              if (isAdmin === "false" || isAdmin === false) {
                // async call to getFromBeagleInfoLayer, then set localStorage
                getFromBeagleInfoLayer("vvsIsShowroom", true).then(function (isAdmin) {
                  if (isAdmin && (isAdmin === "true" || isAdmin === true)) {
                    processAdminUser();
                  }
                });
              }
            case 68:
              if (!(isAdmin && (isAdmin === "true" || isAdmin === true))) {
                _context.next = 72;
                break;
              }
              processAdminUser();
              _context.next = 79;
              break;
            case 72:
              if (!(isAdmin === null || isAdmin === undefined)) {
                _context.next = 78;
                break;
              }
              sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
              addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
              throw new Error("no-admin-status");
            case 78:
              window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, false);
            case 79:
              if (window.top.document.documentElement.classList.contains("glov-ease")) {
                _context.next = 83;
                break;
              }
              sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
              addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
              throw new Error("anti-flicker-timeout");
            case 83:
              /* ===================================== ON/OFF CHECK ====================================== */
              // isOn can be true (ON), false (OFF)
              isOn = null;
              if (!debugMode) {
                _context.next = 91;
                break;
              }
              logger.log("Debug mode on: all applicable treatments will be applied");
              isOn = true;
              window.dataLayer.push({
                event: "GLOV",
                GLOV_ON: "employee"
              });
              addToBeagleInfoLayer("GLOV_ON", "employee | tester");
              _context.next = 107;
              break;
            case 91:
              if (!(oosReason && oosReason === "employee")) {
                _context.next = 98;
                break;
              }
              logger.warn("User is out of scope");
              // set isOn to true/false when not debugMode but out of scope i.e. nd_debug=0 for testability
              isOn = cookiePct >= SPLIT_RATIO;
              window.dataLayer.push({
                event: "GLOV",
                GLOV_ON: "employee"
              });
              addToBeagleInfoLayer("GLOV_ON", "employee | tester");
              _context.next = 107;
              break;
            case 98:
              if (!oosReason) {
                _context.next = 103;
                break;
              }
              addToBeagleInfoLayer("GLOV_ON", "not-sent | unknown");
              throw new Error("Unknown out of scope reason");
            case 103:
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
              sessionStorage.setItem(SESSION_STORAGE_KEYS.IS_LABEL_SENT, true);
              addToBeagleInfoLayer("GLOV_ON", isOn.toString());
            case 107:
              _context.next = 109;
              return getFromBeagleInfoLayer("PageType", true);
            case 109:
              pageType = _context.sent;
              if (!(pageType === "purchase")) {
                _context.next = 120;
                break;
              }
              _context.next = 113;
              return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);
            case 113:
              _context.next = 115;
              return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);
            case 115:
              _context.next = 117;
              return monitor.sendLogs(true);
            case 117:
              // if purchase is complete, do not apply any treatments on the confirmation page
              SHUTDOWN = true;
              _context.next = 121;
              break;
            case 120:
              // send logs when ready, start scraping and sending asyncly
              monitor.sendLogs(false);
            case 121:
              earlyLogSent = true;
    
              /* ======================================= ROBOT PATHs ===================================== */
              addToBeagleInfoLayer("m", "entering-robot-path");
              if (!(isOn === null || isOn === undefined)) {
                _context.next = 127;
                break;
              }
              throw new Error("no-isOn");
            case 127:
              if (!SHUTDOWN) {
                _context.next = 131;
                break;
              }
              throw new Error("shutdown-path");
            case 131:
              _context.next = 133;
              return BeagleOn(identifier, debugMode, pageType, treatmentWeights, isOn);
            case 133:
              _context.next = 141;
              break;
            case 135:
              _context.prev = 135;
              _context.t0 = _context["catch"](6);
              logger.warn("Entrypoint catch: ", _context.t0.message);
              addToBeagleInfoLayer("m", _context.t0.message);
              if (!earlyLogSent && monitor) monitor.sendLogs(false);
              removeDocumentHide();
            case 141:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 135]]);
    }))();
    }();
    /******/ })()
    ;
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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O01BQUE7SUFBQTtFQUFBO0FBQUEsQ0FFeEIsSUFBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvc3RyaW5nVXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvY29sbGVjdG9yLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlTW9uaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvcmVwbGFjZS11dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC93cmFwLWlkYi12YWx1ZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuY29uZmlnLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlT24vcm9ib3RFbmdpbmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2RhdGFMYXllckNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VsZW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9mdW5jdGlvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Nlc3Npb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS91cmxDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbnZDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9wcm9kdWN0SW5mb0NoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlT24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvc2VnbWVudC1jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUNsaWVudFNESy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuL3R5cGVvZi5qc1wiKVtcImRlZmF1bHRcIl07XG5mdW5jdGlvbiBfcmVnZW5lcmF0b3JSdW50aW1lKCkge1xuICBcInVzZSBzdHJpY3RcIjsgLyohIHJlZ2VuZXJhdG9yLXJ1bnRpbWUgLS0gQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuIC0tIGxpY2Vuc2UgKE1JVCk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vTElDRU5TRSAqL1xuICBtb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUgPSBmdW5jdGlvbiBfcmVnZW5lcmF0b3JSdW50aW1lKCkge1xuICAgIHJldHVybiBleHBvcnRzO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7XG4gIHZhciBleHBvcnRzID0ge30sXG4gICAgT3AgPSBPYmplY3QucHJvdG90eXBlLFxuICAgIGhhc093biA9IE9wLmhhc093blByb3BlcnR5LFxuICAgIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGZ1bmN0aW9uIChvYmosIGtleSwgZGVzYykge1xuICAgICAgb2JqW2tleV0gPSBkZXNjLnZhbHVlO1xuICAgIH0sXG4gICAgJFN5bWJvbCA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sXG4gICAgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiLFxuICAgIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIixcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICB3cml0YWJsZTogITBcbiAgICB9KSwgb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcixcbiAgICAgIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKSxcbiAgICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGdlbmVyYXRvciwgXCJfaW52b2tlXCIsIHtcbiAgICAgIHZhbHVlOiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpXG4gICAgfSksIGdlbmVyYXRvcjtcbiAgfVxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJiBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSAmJiAoSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSk7XG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChcInRocm93XCIgIT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnLFxuICAgICAgICAgIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgXCJvYmplY3RcIiA9PSBfdHlwZW9mKHZhbHVlKSAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpID8gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pIDogUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkLCByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgfVxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJfaW52b2tlXCIsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShtZXRob2QsIGFyZykge1xuICAgICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID0gcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICAgIHJldHVybiBmdW5jdGlvbiAobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChcImV4ZWN1dGluZ1wiID09PSBzdGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIGlmIChcImNvbXBsZXRlZFwiID09PSBzdGF0ZSkge1xuICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSBtZXRob2QpIHRocm93IGFyZztcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29udGV4dC5tZXRob2QgPSBtZXRob2QsIGNvbnRleHQuYXJnID0gYXJnOzspIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJuZXh0XCIgPT09IGNvbnRleHQubWV0aG9kKSBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7ZWxzZSBpZiAoXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkge1xuICAgICAgICAgIGlmIChcInN1c3BlbmRlZFN0YXJ0XCIgPT09IHN0YXRlKSB0aHJvdyBzdGF0ZSA9IFwiY29tcGxldGVkXCIsIGNvbnRleHQuYXJnO1xuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuICAgICAgICB9IGVsc2UgXCJyZXR1cm5cIiA9PT0gY29udGV4dC5tZXRob2QgJiYgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICBzdGF0ZSA9IFwiZXhlY3V0aW5nXCI7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID0gY29udGV4dC5kb25lID8gXCJjb21wbGV0ZWRcIiA6IFwic3VzcGVuZGVkWWllbGRcIiwgcmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBcInRocm93XCIgPT09IHJlY29yZC50eXBlICYmIChzdGF0ZSA9IFwiY29tcGxldGVkXCIsIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2ROYW1lID0gY29udGV4dC5tZXRob2QsXG4gICAgICBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2ROYW1lXTtcbiAgICBpZiAodW5kZWZpbmVkID09PSBtZXRob2QpIHJldHVybiBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgXCJ0aHJvd1wiID09PSBtZXRob2ROYW1lICYmIGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdICYmIChjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkLCBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSwgXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkgfHwgXCJyZXR1cm5cIiAhPT0gbWV0aG9kTmFtZSAmJiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIikpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG4gICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHJldHVybiBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgcmV0dXJuIGluZm8gPyBpbmZvLmRvbmUgPyAoY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWUsIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2MsIFwicmV0dXJuXCIgIT09IGNvbnRleHQubWV0aG9kICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKSA6IGluZm8gOiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCk7XG4gIH1cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIDEgaW4gbG9jcyAmJiAoZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdKSwgMiBpbiBsb2NzICYmIChlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXSwgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdKSwgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCIsIGRlbGV0ZSByZWNvcmQuYXJnLCBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dLCB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyksIHRoaXMucmVzZXQoITApO1xuICB9XG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBpdGVyYWJsZS5uZXh0KSByZXR1cm4gaXRlcmFibGU7XG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIGZvciAoOyArK2kgPCBpdGVyYWJsZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHJldHVybiBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV0sIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHQudmFsdWUgPSB1bmRlZmluZWQsIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6ICEwXG4gICAgfTtcbiAgfVxuICByZXR1cm4gR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZVByb3BlcnR5KEdwLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbixcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIiksIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZ2VuRnVuICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gISFjdG9yICYmIChjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgPT09IChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkpO1xuICB9LCBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSA6IChnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpKSwgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApLCBnZW5GdW47XG4gIH0sIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fYXdhaXQ6IGFyZ1xuICAgIH07XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSksIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvciwgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICB2b2lkIDAgPT09IFByb21pc2VJbXBsICYmIChQcm9taXNlSW1wbCA9IFByb21pc2UpO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCksIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpLCBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KSwgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIHZhciBvYmplY3QgPSBPYmplY3QodmFsKSxcbiAgICAgIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXMucmV2ZXJzZSgpLCBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgZm9yICg7IGtleXMubGVuZ3RoOykge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHJldHVybiBuZXh0LnZhbHVlID0ga2V5LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICB9O1xuICB9LCBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcywgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIGlmICh0aGlzLnByZXYgPSAwLCB0aGlzLm5leHQgPSAwLCB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkLCB0aGlzLmRvbmUgPSAhMSwgdGhpcy5kZWxlZ2F0ZSA9IG51bGwsIHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMuYXJnID0gdW5kZWZpbmVkLCB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KSwgIXNraXBUZW1wUmVzZXQpIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICBcInRcIiA9PT0gbmFtZS5jaGFyQXQoMCkgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSAmJiAodGhpc1tuYW1lXSA9IHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgdGhpcy5kb25lID0gITA7XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHRoaXMudHJ5RW50cmllc1swXS5jb21wbGV0aW9uO1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcm9vdFJlY29yZC50eXBlKSB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gZGlzcGF0Y2hFeGNlcHRpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB0aHJvdyBleGNlcHRpb247XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiLCByZWNvcmQuYXJnID0gZXhjZXB0aW9uLCBjb250ZXh0Lm5leHQgPSBsb2MsIGNhdWdodCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCAhIWNhdWdodDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldLFxuICAgICAgICAgIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgIGlmIChcInJvb3RcIiA9PT0gZW50cnkudHJ5TG9jKSByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpLFxuICAgICAgICAgICAgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzRmluYWxseSkgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFicnVwdDogZnVuY3Rpb24gYWJydXB0KHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiYgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmluYWxseUVudHJ5ICYmIChcImJyZWFrXCIgPT09IHR5cGUgfHwgXCJjb250aW51ZVwiID09PSB0eXBlKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MgJiYgKGZpbmFsbHlFbnRyeSA9IG51bGwpO1xuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSB0eXBlLCByZWNvcmQuYXJnID0gYXJnLCBmaW5hbGx5RW50cnkgPyAodGhpcy5tZXRob2QgPSBcIm5leHRcIiwgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MsIENvbnRpbnVlU2VudGluZWwpIDogdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIFwiYnJlYWtcIiA9PT0gcmVjb3JkLnR5cGUgfHwgXCJjb250aW51ZVwiID09PSByZWNvcmQudHlwZSA/IHRoaXMubmV4dCA9IHJlY29yZC5hcmcgOiBcInJldHVyblwiID09PSByZWNvcmQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmcsIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIiwgdGhpcy5uZXh0ID0gXCJlbmRcIikgOiBcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSAmJiBhZnRlckxvYyAmJiAodGhpcy5uZXh0ID0gYWZ0ZXJMb2MpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiBmaW5pc2goZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSByZXR1cm4gdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkoZW50cnkpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbiBfY2F0Y2godHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIGRlbGVnYXRlWWllbGQoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfSwgXCJuZXh0XCIgPT09IHRoaXMubWV0aG9kICYmICh0aGlzLmFyZyA9IHVuZGVmaW5lZCksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9LCBleHBvcnRzO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiAobW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cyksIF90eXBlb2Yob2JqKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIi8vIFRPRE8oQmFiZWwgOCk6IFJlbW92ZSB0aGlzIGZpbGUuXG5cbnZhciBydW50aW1lID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lXCIpKCk7XG5tb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG5cbi8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vcGFja2FnZXMvcnVudGltZS9ydW50aW1lLmpzI0w3MzY9XG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmIChfdHlwZW9mKGlucHV0KSAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0O1xuICB2YXIgcHJpbSA9IGlucHV0W1N5bWJvbC50b1ByaW1pdGl2ZV07XG4gIGlmIChwcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTtcbiAgICBpZiAoX3R5cGVvZihyZXMpICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmltcG9ydCB0b1ByaW1pdGl2ZSBmcm9tIFwiLi90b1ByaW1pdGl2ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImV4cG9ydCBjb25zdCByZXBsYWNlQWxsID0gKHN0ciwgZmluZCwgcmVwbGFjZSA9IFwiXCIpID0+IHtcbiAgaWYgKCFzdHIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gIGlmIChpbmRleCA8IDApIHJldHVybiBzdHI7XG5cbiAgd2hpbGUgKHN0ci5pbmRleE9mKGZpbmQpID49IDApIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICAgIHN0ciA9IChpbmRleCA+IDAgPyBzdHIuc3Vic3RyaW5nKDAsIGluZGV4KSA6IFwiXCIpICsgcmVwbGFjZSArIHN0ci5zdWJzdHJpbmcoaW5kZXggKyBmaW5kLmxlbmd0aCk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuZXhwb3J0IGNvbnN0IHR1cmtpc2hUb0xvd2VyID0gKHN0cikgPT4ge1xuICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xuICBsZXQgc3RyaW5nID0gc3RyO1xuICBjb25zdCBsZXR0ZXJzID0ge1wixLBcIjogXCJpXCIsIFwiSVwiOiBcIsSxXCIsIFwixZ5cIjogXCLFn1wiLCBcIsSeXCI6IFwixJ9cIiwgXCLDnFwiOiBcIsO8XCIsIFwiw5ZcIjogXCLDtlwiLCBcIsOHXCI6IFwiw6dcIn07XG4gIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oKFvEsEnFnsSew5zDh8OWXSkpL2csIGZ1bmN0aW9uKGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXJzW2xldHRlcl07XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi9zdHJpbmdVdGlsc1wiO1xuY29uc3QgaXNTdGFnaW5nID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwic3RhZ2luZy52aXZlbnNlXCIpIDogdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjAuMC40MC42XCI7XG5leHBvcnQgY29uc3QgQ09PS0lFX05BTUUgPSBcIl9nYVwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNUWUxFU0hFRVRfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzX3N0YWdpbmcuY3NzXCIgOiBgaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXMuY3NzP2lkPSR7cmVwbGFjZUFsbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEzKS5yZXBsYWNlKFwiVFwiLCBcIlwiKSwgXCItXCIsIFwiXCIpfWA7XG5leHBvcnQgY29uc3QgRV9SVUxFU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlc19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlcy5qc29uXCI7XG5leHBvcnQgY29uc3QgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OID0gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3NvY2lhbC1wcm9vZi12Mi5qc29uXCI7XG5leHBvcnQgY29uc3QgTE9HX0FQSV9VUkwgPSBcImh0dHBzOi8vZXVyb3BlLXdlc3QzLW5leHRkYXktMzRlYjMuY2xvdWRmdW5jdGlvbnMubmV0L2FwaS9sb2dcIjtcbmV4cG9ydCBjb25zdCBMT09LVVBfQVBJX1VSTCA9IFwiaHR0cHM6Ly9jYXRhbG9nLWFwaS5hZG9yYWFpLmNvbVwiO1xuZXhwb3J0IGNvbnN0IE1PQklMRV9NRURJQV9RVUVSWSA9IFwiKG1heC13aWR0aDogNDQwcHgpXCI7XG4vLyBDb250cm9sIGdyb3VwIHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBTUExJVF9SQVRJTyA9IDUwO1xuLy8gU2tpcHBlZCB0cmVhdG1lbnQgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9SQVRJTyA9IDUwO1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTID0gMjtcbmV4cG9ydCBjb25zdCBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiA9IDE7XG5leHBvcnQgY29uc3QgTElTVF9NT0RFX0JFQUdMRV9LRVlTID0gW1wicGFnZXR5cGVcIiwgXCJjYXRlZ29yeVwiLCBcImFsbHRpbWVQTFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUExQQ2F0ZWdvcnlNb2RlXCIsXG4gIFwiYWxsdGltZVBEUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QRFBDYXRlZ29yeU1vZGVcIiwgXCJhbGx0aW1lQ2FydENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25DYXJ0Q2F0ZWdvcnlNb2RlXCJdO1xuZXhwb3J0IGNvbnN0IElETEVfVElNRU9VVCA9IDE1MDAwO1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTl9TVE9SQUdFX0tFWVMgPSB7XG4gIFNFU1NJT05fVElNRVNUQU1QOiBcIkJHX1Nlc3Npb25UaW1lc3RhbXBcIixcbiAgU0VTU0lPTl9ISVNUT1JZOiBcIkJHX1Nlc3Npb25IaXN0b3J5XCIsXG4gIFBPUFVQX0RJU1BMQVlfRkxBRzogXCJCR19Qb3B1cERpc3BsYXlGbGFnXCIsXG4gIFNLVV9JTkZPX0JBU0tFVDogXCJCR19Qcm9kdWN0SW5mb0Jhc2tldFwiLFxuICBUSU1FT1VUX0NPVU5UOiBcIkJHX1RpbWVvdXRDb3VudFwiLFxuICBTRVNTSU9OX1JFRkVSUkVSOiBcIkJHX1Nlc3Npb25SZWZlcnJlclwiLFxuICBNQVRDSEVEX1RSRUFUTUVOVFM6IFwiR0xWX01hdGNoZWRcIixcbiAgSVNfTEFCRUxfU0VOVDogXCJCR19MYWJlbFNlbnRcIixcbn07XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlTID0ge1xuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgV0VJR0hUUzogXCJCR19XZWlnaHRzXCIsXG4gIEVMSUdJQklMSVRZX1JVTEVTOiBcIkJHX0VfUnVsZXNcIixcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBPVVRfT0ZfU0NPUEU6IFwiR0xWX091dE9mU2NvcGVfMDBcIixcbiAgVVNFUl9JRDogXCJCR19Vc2VySWRfMDFcIixcbiAgREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRTogXCJCR19Db2xsZWN0aW9uRGF0YVNpemVcIixcbiAgSVNfQURNSU46IFwiR0xWX0lzQWRtaW5cIixcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fU1RPUkFHRV9QUkVGSVggPSBcIkJHX1NlZ19cIjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpbiA9IFwiQmVhZ2xlIENsaWVudCBTREtcIiwgdGVzdGluZyA9IGZhbHNlKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgIHRoaXMuREVCVUcgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkRFQlVHID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5ERUJVR19NT0RFKTtcbiAgICB9XG4gIH1cblxuICBpbmZvKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5pbmZvKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmIChERUJVRykge1xuICAgICAgY29uc29sZS5sb2coYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgZmFpbGVkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogcmVkXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgc3VjY2VzcyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IGdyZWVuXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUud2FybihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5lcnJvcihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBudWxsID09IGFyciA/IG51bGwgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBTeW1ib2wgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKG51bGwgIT0gX2kpIHtcbiAgICB2YXIgX3MsXG4gICAgICBfZSxcbiAgICAgIF94LFxuICAgICAgX3IsXG4gICAgICBfYXJyID0gW10sXG4gICAgICBfbiA9ICEwLFxuICAgICAgX2QgPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKF94ID0gKF9pID0gX2kuY2FsbChhcnIpKS5uZXh0LCAwID09PSBpKSB7XG4gICAgICAgIGlmIChPYmplY3QoX2kpICE9PSBfaSkgcmV0dXJuO1xuICAgICAgICBfbiA9ICExO1xuICAgICAgfSBlbHNlIGZvciAoOyAhKF9uID0gKF9zID0gX3guY2FsbChfaSkpLmRvbmUpICYmIChfYXJyLnB1c2goX3MudmFsdWUpLCBfYXJyLmxlbmd0aCAhPT0gaSk7IF9uID0gITApIHtcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSAhMCwgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgbnVsbCAhPSBfaVtcInJldHVyblwiXSAmJiAoX3IgPSBfaVtcInJldHVyblwiXSgpLCBPYmplY3QoX3IpICE9PSBfcikpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYXJyO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVdGlsc1wiKTtcbmNvbnN0IG1vbnRocyA9IHtcbiAgXCJvY2FrXCI6IDAsXG4gIFwixZ91YmF0XCI6IDEsXG4gIFwibWFydFwiOiAyLFxuICBcIm5pc2FuXCI6IDMsXG4gIFwibWF5xLFzXCI6IDQsXG4gIFwiaGF6aXJhblwiOiA1LFxuICBcInRlbW11elwiOiA2LFxuICBcImHEn3VzdG9zXCI6IDcsXG4gIFwiZXlsw7xsXCI6IDgsXG4gIFwiZWtpbVwiOiA5LFxuICBcImthc8SxbVwiOiAxMCxcbiAgXCJhcmFsxLFrXCI6IDExLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50SGlkZSA9ICgpID0+IHtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtZWFzZVwiKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUb0Vhc2VPdXQgPSBhc3luYyAoKSA9PiB7XG4gIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1oaWRlXCIpKSByZXR1cm47XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBlbC50ZXh0Q29udGVudCA9IGAuZ2xvdi1lYXNlIHtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1vLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1zLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgfVxuICBcbiAgQGtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IGZpbHRlcjogZ3JheXNjYWxlKDAlKTt9XG4gIH1cbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNtb290aCB7XG4gICAgMCUgeyBvcGFjaXR5OiAwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAyNSUgeyBvcGFjaXR5OiAwLjEwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA1MCUgeyBvcGFjaXR5OiAwLjI1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA3NSUgeyBvcGFjaXR5OiAwLjUwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA5MCUgeyBvcGFjaXR5OiAwLjc1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAxMDAlIHsgb3BhY2l0eTogMTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9YDtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucHJlcGVuZChlbCk7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50IHdlaWdodHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hQbHVzKEVfUlVMRVNfTE9DQVRJT04pO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlcykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2hQbHVzKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Kc29uID0gYXdhaXQgcHJvZHVjdEluZm8uanNvbigpO1xuICAgIHJldHVybiBwcm9kdWN0SW5mb0pzb247XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggcHJvZHVjdCBpbmZvXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgdGltZW91dCA9ICh0aW1lKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lKTtcbiAgcmV0dXJuIHtjb250cm9sbGVyLCB0aW1lb3V0SUR9O1xufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT4ge1xuICBjb25zdCB7Y29udHJvbGxlciwgdGltZW91dElEfSA9IHRpbWVvdXQoNTAwMCk7XG4gIHJldHVybiBmZXRjaCh1cmwsIHsuLi5vcHRpb25zLCBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLnN0YXR1cyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAocmV0cmllcyA+IDApIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggdGltZWQgb3V0IFJldHJ5aW5nLi4uOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggZmFpbGVkOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDb29raWVJZGVudGlmaWVyID0gKGNvb2tpZVN0cmluZywgY29va2llTmFtZSkgPT4ge1xuICBpZiAoIWNvb2tpZVN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gY29va2llU3RyaW5nXG4gICAgICAuc3BsaXQoXCI7XCIpXG4gICAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiPVwiKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICBpZiAodlswXSAmJiB2WzFdKSB7XG4gICAgICAgICAgYWNjW2RlY29kZVVSSUNvbXBvbmVudCh2WzBdLnRyaW0oKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZbMV0udHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gIGxldCBpZGVudGlmaWVyID0gcGFyc2VkW2Nvb2tpZU5hbWVdO1xuICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29va2llTmFtZSA9PT0gXCJfZ2FcIikge1xuICAgIC8vIGV4dHJhY3QgdW5pcXVlIGlkZW50aWZpZXIgZnJvbSBHQSBjb29raWVcbiAgICBjb25zdCBpZGVudGlmaWVySW5kZXggPSAyO1xuICAgIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyLnNwbGl0KFwiLlwiKVtpZGVudGlmaWVySW5kZXhdO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZVBjdCA9IGFzeW5jIChpZGVudGlmaWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggb2YgeWVhciB0byBoYXNoIHRvIHJlc2V0IGl0IGV2ZXJ5IG1vbnRoXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG5vdy5nZXRNb250aCgpO1xuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcittb250aC50b1N0cmluZygpKTtcblxuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWN0aW9uc1RvUHJlcGFyZSkpO1xuICBsZXQgdmFyaWFudCA9IG51bGw7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7YnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zLCB2YXJpYW50c30gPSBhY3Rpb247XG4gICAgaWYgKCFidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMgJiYgIXZhcmlhbnRzKSBjb250aW51ZTtcbiAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhcmlhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpbmRleCwgdmFyaWFudEtleV0gb2YgT2JqZWN0LmtleXModmFyaWFudHMpLmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAoZGVidWdNb2RlICYmICFhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IE1hdGguZmxvb3IoMTAwIC8gT2JqZWN0LmtleXModmFyaWFudHMpLmxlbmd0aCkgKiAoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzID0gKCkgPT4ge1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHLCBTRVNTSU9OX1RJTUVTVEFNUCwgU0VTU0lPTl9ISVNUT1JZfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHBvcHVwRGlzcGxheUZsYWcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRyk7XG4gIGNvbnN0IHNlc3Npb25UaW1lc3RhbXAgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QKTtcbiAgY29uc3Qgc2Vzc2lvbkhpc3RvcnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fSElTVE9SWSk7XG5cbiAgaWYgKHBvcHVwRGlzcGxheUZsYWcgPT09IG51bGwpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMCk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uVGltZXN0YW1wKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCwgRGF0ZS5ub3coKSk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uSGlzdG9yeSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXSk7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHNlc3Npb25IaXN0b3J5XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb25kaXRpb25DaGVja2VyID0gKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSBcIm5vdEV4aXN0XCIpIHtcbiAgICBpZiAoIXJ1blRpbWVWYWx1ZSkge1xuICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fFxuICAgIHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZGl0aW9uID09PSBudWxsIHx8XG4gICAgY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogcnVuVGltZVZhbHVlIG9yIGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICBjYXNlIFwiZXhpc3RcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiaW5jbHVkZXNcIjpcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEluY2x1ZGVzXCI6XG4gICAgY2FzZSBcIm5vdENvbnRhaW5zXCI6XG4gICAgICBpZiAoIXJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90RXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlclRoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPiB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc1RoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlckVxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc0VxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiYmV0d2VlblwiOiB7XG4gICAgICBsZXQgW21pbiwgbWF4XSA9IHZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSBtaW4gJiYgcnVuVGltZVZhbHVlIDw9IG1heCkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYXNlIFwicmVnZXhcIjoge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIik7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChydW5UaW1lVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZCBcIiwgY29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERlYnVnTW9kZSA9IChvb3NSZWFzb24pID0+IHtcbiAgY29uc3Qge0RFQlVHX01PREUsIE9VVF9PRl9TQ09QRX0gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9XCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKE9VVF9PRl9TQ09QRSwgb29zUmVhc29uKTtcbiAgfVxuXG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTFcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0yXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDI7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MFwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBjdXJyZW50ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKERFQlVHX01PREUpKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgKGN1cnJlbnQgPyBcIm9uXCIgOiBcIm9mZlwiKSk7XG4gIHJldHVybiAoY3VycmVudCB8fCAwKTtcbn07XG5cbi8vIGdldCBHQSBjbGllbnQgaWQgdXNpbmcgZ2EuZ2V0QWxsKClcbmV4cG9ydCBjb25zdCBnZXRHYUNsaWVudElkID0gKCkgPT4ge1xuICBjb25zdCBnYSA9IHdpbmRvdy5nYTtcbiAgLy8gaWYgZ2EgYW5kIGdhLmdldEFsbCgpIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gbnVsbFxuICBpZiAoZ2EgJiYgZ2EuZ2V0QWxsKSB7XG4gICAgY29uc3QgdHJhY2tlcnMgPSBnYS5nZXRBbGwoKTtcbiAgICBpZiAodHJhY2tlcnMgJiYgdHJhY2tlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJhY2tlcnNbMF0uZ2V0KFwiY2xpZW50SWRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gZ2V0IGRldGVybWluaXN0aWMgbnVtZXJpYyBoYXNoIGZyb20gc3RyaW5nIHRoYXQgY29udGFpbnMgb25seSBudW1iZXJzXG5leHBvcnQgY29uc3QgZ2V0VW5zZWN1cmVIYXNoID0gKHN0cikgPT4ge1xuICAvLyBzdGFydCB3aXRoIGEgbWFnaWMgbnVtYmVyLCB1c2UgcGkgZGlnaXRzXG4gIGxldCBoYXNoID0gMzE0MTU5MjY1O1xuICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikge1xuICAgIC8vIG1ha2UgaXQgc3RyaW5nXG4gICAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XG4gIH1cbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgfVxuICAvLyByZXR1cm4gYWJzb2x1dGUgdmFsdWVcbiAgcmV0dXJuIE1hdGguYWJzKGhhc2gpO1xufTtcblxuLy8gZ2VuZXJhdGUgYSAzMi1iaXQgcmFuZG9tIGludGVnZXJcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCk7XG59O1xuXG4vLyBnZXQgY3VycmVudCB1bml4IGVwb2NoIHRpbWUgaW4gc2Vjb25kc1xuZXhwb3J0IGNvbnN0IGdldFVuaXhUaW1lID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZXRJZGVudGlmaWVyID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGlkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lEKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGxvY2FsIHN0b3JhZ2VcIiwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYSBpbiBmaXJzdCBhdHRlbXB0XCIsIGlkKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHRyYWN0SWRlbnRpZmllckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYVwiLCBpZCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCByZWFkIEdBIGNsaWVudCBpZFwiKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgaW4gZ2V0SWRlbnRpZmllclwiLCBlKTtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxheSA9IChtcykgPT4gbmV3IFByb21pc2UoKHJlcykgPT4gc2V0VGltZW91dChyZXMsIG1zKSk7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREZWxpdmVyeURhdGUgPSAoZGF0ZSkgPT4ge1xuICBpZiAoIWRhdGUgfHwgdHlwZW9mIGRhdGUgIT09IFwic3RyaW5nXCIpIHJldHVybiBkYXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBzdGFydE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBlbmRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgc3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICBlbmREYXk6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBsZXQgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKS0oW1xcXFxkXSspXFxcXHM/KFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA9PT0gNCkge1xuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbM10udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSByZXN1bHQuc3RhcnRNb250aEluZGV4O1xuICB9IGVsc2Uge1xuICAgIG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspLShbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gubGVuZ3RoICE9PSA1KSByZXR1cm4gZGF0ZTtcblxuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzJdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbNF0udG9Mb3dlckNhc2UoKV07XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIGlmICghcmVzdWx0LnN0YXJ0TW9udGhJbmRleCB8fCAhcmVzdWx0LmVuZE1vbnRoSW5kZXgpIHJldHVybiBkYXRlO1xuXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuICAgIGNvbnN0IGVuZFllYXIgPSByZXN1bHQuZW5kTW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuXG4gICAgY29uc3QgZXN0aW1hdGVkU3RhcnQgPSBuZXcgRGF0ZShzdGFydFllYXIsIHJlc3VsdC5zdGFydE1vbnRoSW5kZXgsIHJlc3VsdC5zdGFydERheSk7XG4gICAgY29uc3QgZXN0aW1hdGVkRW5kID0gbmV3IERhdGUoZW5kWWVhciwgcmVzdWx0LmVuZE1vbnRoSW5kZXgsIHJlc3VsdC5lbmREYXkpO1xuXG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRTdGFydCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZEVuZCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyV2Vla3MgPSBzdGFydERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKHN0YXJ0RGlmZk92ZXJEYXlzIC8gNyk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJXZWVrcyA9IGVuZERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKGVuZERpZmZPdmVyRGF5cyAvIDcpO1xuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID09PSAwKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IC0gJHtlbmREaWZmT3ZlckRheXN9IEfDvG5gO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA+PSAxKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IEfDvG4gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSBlbmREaWZmT3ZlcldlZWtzKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpZGxlVGltZXIgPSBhc3luYyAodGltZU91dCwgY2FsbEJhY2spID0+IHtcbiAgbGV0IGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG5cbiAgd2luZG93LnRvcC5kb2N1bWVudC5vbnRvdWNoc3RhcnQgPSByZXNldFRpbWVyO1xuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0KTtcbiAgICBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaXNPd25NdXRhdGlvbiA9IChtdXRhdGlvbkxpc3QpID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBbLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0uYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLnJlbW92ZWROb2RlcyldO1xuICByZXR1cm4gbm9kZXMuc29tZSgobikgPT4ge1xuICAgIHJldHVybiBuLnRhZ05hbWUgJiYgKG4uaWQ/LmluY2x1ZGVzKFwiYm4tXCIpIHx8IEFycmF5LmZyb20obi5jbGFzc0xpc3QpLnNvbWUoKGMpID0+IGMuaW5jbHVkZXMoXCJibi1cIikgfHwgYy5pbmNsdWRlcyhcIm5kLVwiKSkpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRBZ2VudERldGFpbHMgPSAoKSA9PiB7XG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAvLyBleHRyYWN0IGJyb3dzZXIgYW5kIHZlcnNpb25cbiAgY29uc3QgYnIgPSB1YS5tYXRjaCgvKG9wZXJhfGVkZ3x0cmlkZW50fGZpcmVmb3h8bXNpZSg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHxcbiAgICB1YS5tYXRjaCgvKHNhZmFyaXxjaHJvbWUoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8XG4gICAgdWEubWF0Y2goLyh3ZWJraXQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8IFtdO1xuXG4gIGlmICghYnIgfHwgYnIubGVuZ3RoIDwgMykgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGJOYW1lID0gYnJbMV07XG4gIGNvbnN0IGJWZXJzaW9uID0gYnJbMl07XG5cbiAgY29uc3Qgb3MgPSB7XG4gICAgV2luZG93czogL1dpbi9pLnRlc3QodWEpLFxuICAgIE1hYzogL01hYy9pLnRlc3QodWEpLFxuICAgIExpbnV4OiAvTGludXgvaS50ZXN0KHVhKSxcbiAgICBBbmRyb2lkOiAvQW5kcm9pZC9pLnRlc3QodWEpLFxuICAgIGlPUzogL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KHVhKSxcbiAgfTtcblxuICAvLyBleHRyYWN0IE9TIGFuZCB2ZXJzaW9uXG4gIGxldCBvc1ZlcnNpb24gPSBcIlwiO1xuICBsZXQgb3NOYW1lID0gXCJcIjtcbiAgaWYgKG9zLldpbmRvd3MpIHtcbiAgICBvc05hbWUgPSBcIldpbmRvd3NcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvV2luZG93cyBOVCAoWzAtOS5dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcInVua25vd25cIjtcbiAgfSBlbHNlIGlmIChvcy5pT1MpIHtcbiAgICBvc05hbWUgPSBcImlPU1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9PUyAoWzAtOV9dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0ucmVwbGFjZSgvXy9nLCBcIi5cIikgOiBcInVua25vd25cIjtcbiAgfSBlbHNlIGlmIChvcy5NYWMpIHtcbiAgICBvc05hbWUgPSBcIk1hY1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9NYWMgT1MgWCAoWzAtOV9dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0ucmVwbGFjZSgvXy9nLCBcIi5cIikgOiBcInVua25vd25cIjtcbiAgfSBlbHNlIGlmIChvcy5BbmRyb2lkKSB7XG4gICAgb3NOYW1lID0gXCJBbmRyb2lkXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL0FuZHJvaWQgKFswLTkuXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuTGludXgpIHtcbiAgICBvc05hbWUgPSBcIkxpbnV4XCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL0xpbnV4IChbaVxcZF0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwidW5rbm93blwiO1xuICB9XG5cbiAgLy8gZXh0cmFjdCBtb2JpbGUgb3IgZGVza3RvcFxuICBjb25zdCBpc01vYmlsZSA9IC9Nb2JpL2kudGVzdCh1YSk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuYnJvd3Nlck5hbWVcIiwgYk5hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5icm93c2VyVmVyc2lvblwiLCBiVmVyc2lvbik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm9zTmFtZVwiLCBvc05hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5vc1ZlcnNpb25cIiwgb3NWZXJzaW9uKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaXNNb2JpbGVcIiwgaXNNb2JpbGUpO1xuXG4gIGNvbnN0IGlzU3VwcG9ydGVkQnJvd3NlciA9IGJOYW1lID09PSBcIkNocm9tZVwiIHx8IGJOYW1lID09PSBcIlNhZmFyaVwiO1xuICBjb25zdCBpc1N1cHBvcnRlZE9TID0gb3NOYW1lID09PSBcIk1hY1wiIHx8IG9zTmFtZSA9PT0gXCJXaW5kb3dzXCIgfHwgb3NOYW1lID09PSBcIkFuZHJvaWRcIiB8fCBvc05hbWUgPT09IFwiaU9TXCI7XG5cbiAgcmV0dXJuIGlzU3VwcG9ydGVkQnJvd3NlciAmJiBpc1N1cHBvcnRlZE9TO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFVSTERhdGEgPSAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiZmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJiYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGFzdG9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzaWduaW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2NvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfaW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfYWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfbm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic3BlY2lhbF9jYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG59O1xuXG4vKipcbiAqIFdvcmsgYXJvdW5kIFNhZmFyaSAxNCBJbmRleGVkREIgb3BlbiBidWcuXG4gKlxuICogU2FmYXJpIGhhcyBhIGhvcnJpYmxlIGJ1ZyB3aGVyZSBJREIgcmVxdWVzdHMgY2FuIGhhbmcgd2hpbGUgdGhlIGJyb3dzZXIgaXMgc3RhcnRpbmcgdXAuIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yMjY1NDdcbiAqIFRoZSBvbmx5IHNvbHV0aW9uIGlzIHRvIGtlZXAgbnVkZ2luZyBpdCB1bnRpbCBpdCdzIGF3YWtlLlxuICovXG5leHBvcnQgY29uc3QgaWRiUmVhZHkgPSAoKSA9PiB7XG4gIGNvbnN0IGlzU2FmYXJpID1cbiAgICAhbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEgJiZcbiAgICAvU2FmYXJpXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgIS9DaHJvbShlfGl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgLy8gTm8gcG9pbnQgcHV0dGluZyBvdGhlciBicm93c2VycyBvciBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgdGhyb3VnaCB0aGlzIG1lc3MuXG4gIGlmICghaXNTYWZhcmkgfHwgIWluZGV4ZWREQi5kYXRhYmFzZXMpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICBsZXQgaW50ZXJ2YWxJZDtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCB0cnlJZGIgPSAoKSA9PiBpbmRleGVkREIuZGF0YWJhc2VzKCkuZmluYWxseShyZXNvbHZlKCkpO1xuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0cnlJZGIsIDUwKTtcbiAgICB0cnlJZGIoKTtcbiAgfSkuZmluYWxseSgoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0VW5zZWN1cmVIYXNofSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZJbmZvTGF5ZXJcIik7XG5jb25zdCBMU19QcmVmaXggPSBcIkdMRENfXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJ1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCk7XG5cbiAgICAvLyByZW1vdmUgZG90cyBpbiBiYXNlRmVhdHVyZU5hbWUgYW5kIGFkZCBwcmVmaXhcbiAgICBjb25zdCBmZWF0dXJlS2V5ID0gTFNfUHJlZml4ICsgYmFzZUZlYXR1cmVOYW1lLnJlcGxhY2UoL1xcLi9nLCBcIl9cIik7XG4gICAgY29uc3Qgb3BLZXkgPSBmZWF0dXJlS2V5ICsgXCJfXCIgKyB1cGRhdGVNZXRob2Q7XG5cbiAgICBzd2l0Y2ggKHVwZGF0ZU1ldGhvZCkge1xuICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgY2FzZSBcIm1heFwiOlxuICAgICAgICAvLyBjb21wdXRlIG1pbiBhbmQgbWF4IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIE1hdGhbdXBkYXRlTWV0aG9kXSh2YWx1ZSwgYmFzZUZlYXR1cmVWYWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzdW1cIjpcbiAgICAgICAgLy8gY29tcHV0ZSBzdW0gYW5kIGNvdW50IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBwYXJzZUZsb2F0KHZhbHVlKSArIHBhcnNlRmxvYXQoYmFzZUZlYXR1cmVWYWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImNudFwiOlxuICAgICAgICAvLyBjb21wdXRlIGNvdW50IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBwYXJzZUludCh2YWx1ZSkgKyAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgIC8vIGNvbXB1dGUgbGFzdCBvYnRhaW5lZCB2YWx1ZSBpbiBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwiY291bnRfdmFsdWVzXCIgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzLCBrZWVwIGEgY291bnRlciBmb3IgZWFjaCB2YWx1ZVxuICAgICAgY2FzZSBcInZhbGNudHNcIjpcbiAgICAgICAge1xuICAgICAgICAgIC8vIGNvbXB1dGUgY291bnQgb2YgZWFjaCB2YWx1ZSBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgICAvLyBjcmVhdGUgYSA4IGJ5dGVzIGhleCBoYXNoIGZvciBiYXNlRmVhdHVyZVZhbHVlLCBvbmx5IHBvc2l0aXZlIG51bWJlcnNcbiAgICAgICAgICBjb25zdCB2YWxIYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGJhc2VGZWF0dXJlVmFsdWUpO1xuXG4gICAgICAgICAgY29uc3Qgb3BLZXlWYWwgPSBvcEtleSArIFwiX1wiICsgdmFsSGFzaDtcbiAgICAgICAgICBjb25zdCBvcEtleVZhbE5hbWUgPSBvcEtleSArIFwiX1wiICsgdmFsSGFzaCArIFwiX25hbWVcIjtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbE5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXlWYWwpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbCwgcGFyc2VJbnQodmFsdWUpICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWwsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiRXJyb3IgaW4gdXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QsIGUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcXVlcnlJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwicXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpO1xuXG4gICAgY29uc3QgZmVhdHVyZUtleSA9IExTX1ByZWZpeCArIGJhc2VGZWF0dXJlTmFtZS5yZXBsYWNlKC9cXC4vZywgXCJfXCIpO1xuICAgIGxldCBvcEtleTtcblxuICAgIGxldCBzdG9yYWdlID0gbnVsbDtcbiAgICBpZiAod2luZG93ID09PSBcImFsbHRpbWVcIikge1xuICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdyA9PT0gXCJzZXNzaW9uXCIpIHtcbiAgICAgIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmVycm9yKFwiSW52YWxpZCB3aW5kb3cgdHlwZVwiLCB3aW5kb3cpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc3dpdGNoIChxdWVyeU1ldGhvZCkge1xuICAgICAgLy8gZm9yIGxhc3QsIG1pbiwgbWF4LCBzdW0gZXRjLiBicmluZyB0aGUgdmFsdWUgZnJvbSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2UgZ2l2ZW4gdGhlIHdpbmRvdyBpcyBzZXNzaW9uIG9yIGFsbHRpbWVcbiAgICAgIGNhc2UgXCJtaW5cIjpcbiAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgIGNhc2UgXCJzdW1cIjpcbiAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgIG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX1wiICsgcXVlcnlNZXRob2Q7XG4gICAgICAgIHJldHVybiBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuXG4gICAgICAgIC8vIGZvciBjdiwgcmV0dXJuIHRoZSBudW1iZXIgb2YgZHNpaXRuY3QgdmFsdWVzLCBvYnRhaW4gYnkgc2Nhbm5pbmcgdGhlIHByZWZpeCBvZiB0aGUga2V5IGluIHRoZSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2VcbiAgICAgICAgLy8gZm9yIG1vZGUsIHNjYW4gdGhlIGxvY2FsL3Nlc3Npb24gc3RvcmFnZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSB3aXRoIHRoZSBoaWdoZXN0IGNvdW50XG4gICAgICBjYXNlIFwiY250dmFsc1wiOlxuICAgICAgY2FzZSBcInN1bXZhbHNcIjpcbiAgICAgIGNhc2UgXCJtb2RlXCI6XG4gICAgICB7XG4gICAgICAgIG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX3ZhbGNudHNcIjtcbiAgICAgICAgY29uc3QgbG9jYWxLZXlzID0gT2JqZWN0LmtleXMoc3RvcmFnZSk7XG4gICAgICAgIGNvbnN0IGxvY2FsS2V5c0ZpbHRlcmVkID0gbG9jYWxLZXlzLmZpbHRlcigoa2V5KSA9PiBrZXkuaW5kZXhPZihvcEtleSkgPT09IDAgJiYga2V5LmluZGV4T2YoXCJfbmFtZVwiKSA9PT0gLTEpO1xuICAgICAgICBpZiAocXVlcnlNZXRob2QgPT09IFwiY250dmFsc1wiKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsS2V5c0ZpbHRlcmVkLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJzdW12YWxzXCIpIHtcbiAgICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgICBsb2NhbEtleXNGaWx0ZXJlZC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIHN1bSArPSBwYXJzZUludChzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXhDb3VudCA9IG51bGw7XG4gICAgICAgIGxldCBtYXhWYWwgPSBudWxsO1xuICAgICAgICBsb2NhbEtleXNGaWx0ZXJlZC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWwgPSBwYXJzZUludChzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgaWYgKG1heFZhbCA9PT0gbnVsbCB8fCBtYXhDb3VudCA9PT0gbnVsbCB8fCBtYXhDb3VudCA8IHZhbCkge1xuICAgICAgICAgICAgbWF4Q291bnQgPSB2YWw7XG4gICAgICAgICAgICAvLyBuYW1lcyBhcmUgb25seSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICBtYXhWYWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkgKyBcIl9uYW1lXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXhWYWw7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIGluIHF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93LCBlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7Zm9ybWF0RGVsaXZlcnlEYXRlLCBpc093bk11dGF0aW9ufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7cXVlcnlJbkNvbGxlY3RvciwgdXBkYXRlSW5Db2xsZWN0b3J9IGZyb20gXCIuL2NvbGxlY3RvclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbndpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgPSB3aW5kb3cuYmVhZ2xlSW5mb0xheWVyIHx8IHtcbiAgYToge30sIGU6IHt9LCBmOiB7fSwgX19od206IDAsXG59O1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdkluZm9MYXllclwiKTtcblxuLy8gVE9ETzogY29udmVydCB0byBuYW1lIC0tPiBhcnJheSBvZiBzZWxlY3RvcnNcbmNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2xhc3NcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5pc0luU2hvd3Jvb21cIiwgbmFtZTogXCJwZHAuaXNJblNob3dyb29tXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNhdGVnb3J5X3Byb2R1Y3RfY291bnRcIiwgbmFtZTogXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBscC5jbGFzc1wiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInB1cmNoYXNlLnByaWNlc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5xdWFudGl0eVwiLCBuYW1lOiBcInB1cmNoYXNlLnF1YW50aXRpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwdXJjaGFzZS5jYXRlZ29yaWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLm9yZGVySWRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLnJldmVudWVcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5kaW1lbnNpb24xNVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRG9jdW1lbnQgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicGFnZV9wcmV2aWV3X3dyYXBwZXJfcHJvZHVjdGlvblxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiSG9tZXBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXRlZ29yeV9wYWdlX3dyYXBwZXJcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkxpc3RpbmdwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiYm9keSA+IC5kZXNrdG9wX2xheW91dF93cmFwcGVyIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY29wdW9uTm90QXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVGb3JtYXR0ZWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwiZm9ybWF0RGVsaXZlcnlEYXRlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiN2aXZlbnNlLXNob3dyb29tLXRhYiBwOm5vdCgudml2ZW5zZS1zaG93cm9vbXMpXCIsIG5hbWU6IFwicGRwLmhhc05vU2hvd3Jvb21zXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJwZHAuc2hvd3Jvb21jb3VudFwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwic3Bhbi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjc2FsZXMtcHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiZGl2LnByb2R1Y3QtcHJpY2UtYm94XCIsIG5hbWU6IFwiX19wcmljZU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJwZHAucHJpY2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNtb2JpbGUtcHJvZHVjdC1zdGlja3lcIiwgbmFtZTogXCJfX3ByaWNlT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcInBkcC5wcmljZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInN1YmNhdGVnb3JpZXMtdGl0bGVcXFwiXVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtY2FyZFtkYXRhLXByb2R1Y3Qtc2t1XVwiLCBuYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJvZHVjdC1za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtbGlzdFwiLCBuYW1lOiBcIl9fbGlzdGluZ0l0ZW1CbG9ja09ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIC8vIE1vYmlsZSBvYnNlcnZlciBmb3IgdGhlIGZ1bGwgZm9ybSBibG9jayBhcyBpdCBpcyBjb21wbGV0ZWx5IHJlcGxhY2VkXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfc3VtbWFyeV90b3RhbFxcXCJdLCBbY2xhc3MqPVxcXCJ0b3RhbF9yb3dcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnJldmVudWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXJfZm9sbG93X251bWJcXFwiXSwgW2NsYXNzKj1cXFwiY2FydC10aXRsZS1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnZ2c1R4bklkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnBheW1lbnRfdHlwZV90aXRsZSwgLmNhcnQtdGl0bGUtaW5mb1wiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3Rfc2t1X2NvZGVcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXNrdVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFNPUkcgRWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcInNrdVwiLCBuYW1lOiBcInBkcC5za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtcG5cIiwgbmFtZTogXCJwZHAubXBuXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiSlNPTkZpbHRlck90aGVyXCIsIHZhbHVlOiBcIkB0eXBlPVByb2R1Y3RcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJvZmZlcnMucHJpY2VWYWxpZFVudGlsXCIsIG5hbWU6IFwicGRwLnByaWNlVmFsaWRVbnRpbFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIml0ZW1MaXN0RWxlbWVudC4qLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5udW1iZXJPZkl0ZW1zXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcImJyZWFkY3J1bWIuaXRlbUxpc3RFbGVtZW50LiouaXRlbS5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gV2luZG93IGN1c3RvbSBlbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiZmF2b3JpdGVQcm9kdWN0c1wiLCBuYW1lOiBcInZpZXcuZmF2b3JpdGVkTVBOc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCIsIGZvcm1hdHRlcjogXCJ0b1N0cmluZ1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcbl07XG5cbmNvbnN0IGZlYXR1cmVFbmdpbmVlcmluZ09wcyA9IHtcbiAgXCJ2aWV3X2Vwb2NoXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcIm1pblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibWluXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3Rvcnkudmlld19lcG9jaF9taW5cIn0sXG4gIF0sXG4gIFwiUGFnZVR5cGVcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwidmFsY250c1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwic3VtdmFsc1wiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X3Nlc3Npb25cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcInN1bXZhbHNcIiwgd2luZG93OiBcImFsbHRpbWVcIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9hbGx0aW1lXCJ9LFxuICBdLFxuICBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMubGFzdENhcnRDb3Vwb25BcHBsaWNhYmxlXCJ9LFxuICBdLFxuICBcInBkcC5jYXRlZ29yeVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJ2YWxjbnRzXCJ9LFxuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibW9kZVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9tb2RlX3Nlc3Npb25cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3RcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbGFzdF9zZXNzaW9uXCJ9LFxuICBdLFxuICBcImNhcnQuc2t1c1wiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCJ9LFxuICBdLFxufTtcblxuZXhwb3J0IGNvbnN0IGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNID0gKCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5mb0xheWVyLl9faHdtICs9IDE7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVG9CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIGlmIHZhbHVlIGlzIHN0cmluZywgYWRkIGFzIGEgY2xlYW4gc3RyaW5nLCBpZiBvYmplY3QgYWRkIHRoZSBzYW1lXG4gIGNvbnN0IHR5cGVkVmFsdWUgPSB0eXBlb2YgKHZhbHVlKSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpIDogdmFsdWU7XG4gIC8vIGlmIGtleSBjb250YWlucyAuIGNyZWF0ZSBuZXN0ZWQgb2JqZWN0XG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIG9ialtrZXldID0ge307XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBvYmpbbGFzdEtleV0gPSB0eXBlZFZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGluZm9MYXllcltrZXldID0gdHlwZWRWYWx1ZTtcbiAgfVxuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgaWYgKHR5cGVkVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlZFZhbHVlICE9PSBudWxsKSB7XG4gICAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIHR5cGVkVmFsdWUpO1xuICAgIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgdHlwZWRWYWx1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IERBVEFfTElTVEVORVJTID0ge307XG5cbmV4cG9ydCBjb25zdCBhZGREYXRhTGlzdGVuZXIgPSAoa2V5LCBsaXN0ZW5lcikgPT4ge1xuICBpZiAoIURBVEFfTElTVEVORVJTW2tleV0pIHtcbiAgICBEQVRBX0xJU1RFTkVSU1trZXldID0gW107XG4gIH1cbiAgREFUQV9MSVNURU5FUlNba2V5XS5wdXNoKGxpc3RlbmVyKTtcbn07XG5cbmNvbnN0IHBhc3NWYWx1ZVRvTGlzdGVuZXJzID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgbGlzdGVuZXJzID0gREFUQV9MSVNURU5FUlNba2V5XTtcbiAgaWYgKGxpc3RlbmVycyAmJiBBcnJheS5pc0FycmF5KGxpc3RlbmVycykgJiYgbGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgLS0+IHZhbHVlICR7dmFsdWV9IHRvIGxpc3RlbmVyICR7aX0gb2Yga2V5ICR7a2V5fWApO1xuICAgICAgICBsaXN0ZW5lcih2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RnJvbUJlYWdsZUluZm9MYXllciA9IChrZXksIGJsb2NraW5nID0gZmFsc2UsIHBvbGxJbnRlcnZhbCA9IDUwLCB0aW1lb3V0ID0gMTAwMDApID0+IHtcbiAgLy8gVE9ETzogY2hlY2sgZmVhdHVyZUVuZ2luZWVyaW5nIGFuZCBzZWFyY2ggbGlzdCBpZiBhbGwgbWFya2VkIGFzIGZvdW5kIGJ1dCB2YWx1ZSBpcyBtaXNzaW5nXG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyByZXR1cm4gbnVsbCBpZiBrZXkgaXMgbWlzc2luZyBvciBub3QgYW4gYXJyYXkgb3IgaGFzIG5vIGVsZW1lbnRzXG4gIGlmICgha2V5KSByZXR1cm4gbnVsbDtcbiAgbGV0IG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGJsb2NraW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICAgICAgICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXksIGNsZWFyIGludGVydmFsIGFuZCByZXNvbHZlXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBwb2xsSW50ZXJ2YWwpO1xuICAgICAgLy8gYWRkIHRpbWVvdXRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0sIHRpbWVvdXQpOyAvLyB3YWl0IGJsb2NraW5nIGZvciBcInRpbWVvdXRcIiBtc2Vjc1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciA9IChrZXkpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gcmVtb3ZlIGtleSBmcm9tIGluZm9MYXllclxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSByZXR1cm47XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBsb2dnZXIubG9nKFwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllclwiLCBgUmVtb3Zpbmcga2V5OiAke2xhc3RLZXl9YCk7XG4gICAgZGVsZXRlIG9ialtsYXN0S2V5XTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgaW5mb0xheWVyW2tleV07XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCBudWxsKTtcbiAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCBudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUcmVhdG1lbnQgPSAoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBzdGF0dXMsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0ge307XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVJZCAhPT0gdW5kZWZpbmVkKSB2YWx1ZS5idXNpbmVzc1J1bGVJZCA9IGJ1c2luZXNzUnVsZUlkO1xuICBpZiAodmFyaWFudCkgdmFsdWUudmFyaWFudCA9IHZhcmlhbnQ7XG5cbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiYXBwbGllZFwiOlxuICAgICAgaW5mb0xheWVyLmFbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2tpcHBlZFwiOlxuICAgICAgdmFsdWUuZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQ7XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciA9IGFzeW5jICgpID0+IHtcbiAgLy8gQ29sbGVjdCBjb3JlIGRhdGFcbiAgcHJlcGFyZUNvcmVEYXRhKCk7XG5cbiAgLy8gVHJpZ2dlci1zdGFydCB0aGUgcGFyc2VyIGxvb3BcbiAgcGFyc2VyQ2FsbGVyKCk7XG5cbiAgLy8gQWRkIG1ldHJpY3NcbiAgYWRkTWV0cmljcygpO1xufTtcblxuY29uc3QgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvciA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYmFzZUZlYXR1cmVOYW1lcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVFbmdpbmVlcmluZ09wcyk7XG4gIGZvciAoY29uc3QgYmFzZUZlYXR1cmVOYW1lIG9mIGJhc2VGZWF0dXJlTmFtZXMpIHtcbiAgICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgICBpZiAoRkVPcC5xdWVyeU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnF1ZXJ5TWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgcXVlcnlJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIEZFT3AucXVlcnlNZXRob2QsIEZFT3Aud2luZG93KTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoRkVPcC5mZWF0dXJlTmFtZSwgcXVlcnlSZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSkgPT4ge1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AudXBkYXRlTWV0aG9kID09PSBudWxsIHx8IEZFT3AudXBkYXRlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgYXdhaXQgdXBkYXRlSW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCBGRU9wLnVwZGF0ZU1ldGhvZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgcGFyc2VyQ2FsbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSArPSBwYXJzZUludChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3VtUHJpY2UgPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gc3VtUHJpY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBjb25zdCBhcnJheUlubmVyVGV4dCA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgYXJyYXlJbm5lclRleHQucHVzaChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJyYXlJbm5lclRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGFycmF5SW5uZXJUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfSAvLyBzd2l0Y2hcblxuICAgIGlmIChsYXllclZhbHVlICE9PSB1bmRlZmluZWQgJiYgbGF5ZXJWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKSB7XG4gICAgICAgIGxheWVyVmFsdWUgPSBwcm9jZXNzRm9ybWF0dGVyKGxheWVyVmFsdWUsIHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKTtcbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKHNlYXJjaEVsZW1lbnQubmFtZSwgbGF5ZXJWYWx1ZSk7XG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuXG4gICAgICAvLyBtYXJrIGV4Y2x1c2l2ZSBlbGVtZW50cyBhcyBmb3VuZFxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUpICYmIHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBleGNsdXNpdmVFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmluY2x1ZGVzKGV4Y2x1c2l2ZUVsZW1lbnQubmFtZSkpIHtcbiAgICAgICAgICAgIGV4Y2x1c2l2ZUVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcInNlYXJjaE9iaiBlcnJvcjogXCIgKyBlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlLCA1MCwgMTAwMCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBjYXJ0IHRvdGFsIHByb2R1Y3QgcHJpY2UgaXMgbm90IGF2YWlsYWJsZSBhbnl3aGVyZSwgc3BlY2lhbCBkaXNjb3VudHMgZXRjIGFyZSBoYXJkIHRvIHNjcmFwZSwgc28gcmVjYWxjdWxhdGUgaXRcbiAgICBjb25zdCBbaXNDYXJ0RW1wdHksIHRvdGFsQmFzZVByaWNlLCBjb3Vwb25Ob3RBcHBsaWNhYmxlLCBwcmljZXMsIHF1YW50aXRpZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuaXNlbXB0eVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnByaWNlc1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnF1YW50aXRpZXNcIiksXG4gICAgXSk7XG5cbiAgICBsZXQgdG90YWxQcmljZSA9IDA7XG5cbiAgICBpZiAoIXRvdGFsQmFzZVByaWNlICYmIHByaWNlcyAmJiBBcnJheS5pc0FycmF5KHByaWNlcykgJiYgcHJpY2VzLmxlbmd0aCA+IDAgJiYgcXVhbnRpdGllcyAmJiBBcnJheS5pc0FycmF5KHF1YW50aXRpZXMpICYmIHF1YW50aXRpZXMubGVuZ3RoID4gMCAmJiBwcmljZXMubGVuZ3RoID09PSBxdWFudGl0aWVzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG90YWxQcmljZSArPSBwYXJzZUludChwcmljZXNbaV0pICogcGFyc2VJbnQocXVhbnRpdGllc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvdGFsUHJpY2UgPSBwYXJzZUludCh0b3RhbEJhc2VQcmljZSk7XG4gICAgfVxuXG4gICAgbGV0IGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSAmJiBjb3Vwb25Ob3RBcHBsaWNhYmxlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gdG90YWxQcmljZSAtIHBhcnNlSW50KGNvdXBvbk5vdEFwcGxpY2FibGUpO1xuICAgIH0gZWxzZSBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSBwYXJzZUludCh0b3RhbFByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCIsIGNvdXBvbkFwcGxpY2FibGVBbW91bnQpO1xuXG4gICAgaWYgKGlzQ2FydEVtcHR5KSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxQcmljZVwiLCAwKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIDApO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcImN1c3RvbURhdGFEZXJpdmF0aW9ucyBjYW5ub3QgY29tcHV0ZSBjb3Vwb25BcHBsaWNhYmxlUHJpY2U6IFwiICsgZSk7XG4gIH1cblxuICAvLyBQcm9kdWN0IHBhZ2UgLS0+IHRyYW5zZmVyIHNrdXMgdG8gc2luZ2xlIGxvY2F0aW9uXG4gIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiUHJvZHVjdHBhZ2VcIikge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIpO1xuICAgIGlmIChza3UgIT09IG51bGwgJiYgc2t1ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIFtza3VdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QgIT09IG51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgYXdhaXQgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgc2t1TGlzdCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwYXJzZVNlYXJjaFBhdGhzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkb21TdGF0dXMgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICAvLyBjaGVjayBpZiBkb2N1bWVudCBhbmQgZG9tIGlzIGxvYWRlZCBhbmQgcmVhZHkgZm9yIHNjcmFwcGluZ1xuICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBpbml0aWFsaXplZCB3aXRoIGRvbSBzdGF0dXM6ICBcIiArIGRvbVN0YXR1cyk7XG5cbiAgY29uc3Qgd2ludG9wID0gd2luZG93LnRvcDtcbiAgY29uc3QgZGF0YUxheWVyID0gd2ludG9wLmRhdGFMYXllcjtcbiAgY29uc3Qgd2luZG9jID0gd2ludG9wLmRvY3VtZW50O1xuICBsZXQgc29yZ0FycmF5SW5uZXI7XG5cbiAgY29uc3QgZm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3QgcHJldkZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG5vdEZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG5cbiAgLy8gUGFnZVR5cGUgY2FuIGJlIGluZmVycmVkIGZyb20gVVJMLCBpZiBmb3VuZCB1c2UgaXQgZnJvbSB0aGVyZVxuICBsZXQgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuXG4gIGlmIChjdXJyZW50UGFnZVR5cGUpIHtcbiAgICBwcmV2Rm91bmROYW1lcy5hZGQoXCJQYWdlVHlwZVwiKTtcbiAgfVxuXG4gIC8vIExvb3AgdGhyb3VnaCBzZWFyY2ggbGlzdHMgYW5kIG1hcmsgZm91bmQgbmFtZXNcbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcHJldkZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoZm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSB8fCBwcmV2Rm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSkge1xuICAgICAgLy8gaGFkIGFscmVhZHkgZm91bmQgdGhpcyBlbGVtZW50IG9uIGFub3RoZXIgcGFyc2UgaXRlbVxuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kICE9PSBcIipcIikge1xuICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuICAgICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQuaW5kZXhPZihjdXJyZW50UGFnZVR5cGUpIDwgMCkge1xuICAgICAgICAvLyBza2lwIHNlYXJjaEVsZW1lbnQgYmVjYXVzZSBvZiBQYWdlVHlwZURlcGVuZFxuICAgICAgICBzZWFyY2hFbGVtZW50LmlzSWdub3JlID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIlNpbmdsZVdUXCIpIHsgLy8gU0NBTiBXaW5kb3cgZm9yIFNpbmdsZSBFbGVtZW50c1xuICAgICAgc2VhcmNoQW5kU2V0KHdpbnRvcCwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJHQURhdGFMYXllclwiKSB7IC8vIFNDQU4gR0EgREFUQSBMQVlFUlxuICAgICAgZm9yIChjb25zdCBkYXRhTGF5ZXJJdGVtIG9mIGRhdGFMYXllcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoZGF0YUxheWVySXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NTb3JnXCIpIHsgLy8gU0NBTiBTT1JHIEFSUkFZXG4gICAgICBpZiAoIXNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNvcmdBcnJheUlubmVyID0gZ2V0U09SR0FycmF5KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHNvcmdJdGVtIG9mIHNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChzb3JnSXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NRdWVyeVwiKSB7IC8vIFNDQU4gRE9DVU1FTlRcbiAgICAgIHNlYXJjaEFuZFNldCh3aW5kb2MsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gLy8gRE9DUVVFUlkgcGFyc2VcbiAgfVxuXG4gIGlmIChub3RGb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGZvdW5kIGFsbCBlbGVtZW50cyAtIHNldHRpbmcgcmV0cnkgdG8gbWF4XCIpO1xuICB9IGVsc2UgaWYgKGZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIC8vIHVwZGF0ZSByZXRyeSBjb3VudGVyIGFuZCBkZWxheSBvbmx5IGlmIGRvbSBpcyBhY3RpdmVcbiAgICBpZiAoZG9tU3RhdHVzID09PSBcImNvbXBsZXRlXCIgfHwgZG9tU3RhdHVzID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSAqPSAyO1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICs9IDE7XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkIGJ1dCBub3QgZm91bmQgYW55LCBzZXR0aW5nIGRlbGF5IGFuZCByZXRyeSB0byBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIiBhbmQgXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICsgXCIgZm9yIG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdXCIsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQ6IG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdIGFuZCBmb3VuZCBcIiArXG4gICAgICBmb3VuZE5hbWVzLnNpemUsXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoQW5kU2V0ID0gKG9iaiwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcykgPT4ge1xuICBpZiAoc2VhcmNoT2JqKG9iaiwgc2VhcmNoRWxlbWVudCkpIHtcbiAgICBmb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH1cbn07XG5cbi8vIHBhcnNlIHNvdXJjZVxuY29uc3QgcGFyc2VyQ2FsbGVyID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGF3YWl0IHBhcnNlU2VhcmNoUGF0aHMoKTtcbiAgaWYgKHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA8IFBBUlNFU0VBUkNITUFYUkVUUlkpIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogc2NoZWR1bGVkIHRvIGJlIHJlY2FsbGVkIGluIFwiICsgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCJtc1wiKTtcbiAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgcGFyc2VyQ2FsbGVyKCk7XG4gICAgfSwgcGFyc2VTZWFyY2hQYXRoc0RlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogcmVhY2hlZCBtYXggcmV0cnksIGNhbGxpbmcgcmVtYWluZGVyIGhpc3RvcmljYWwgZGF0YVwiKTtcbiAgICBhd2FpdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMoKTtcbiAgICBhd2FpdCBjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUpO1xuICB9XG59O1xuXG4vLyBFeHRyYWN0IHZhbHVlIGZyb20ganNvbiBvYmplY3QgdXNpbmcgZ2l2ZW4gcGF0aFxuLy8gSWYgYW4gZWxlbWVudCBpcyAqLCBjb25jYXRlbmF0ZSByZWN1cnNpdmVseSBhbGwgc3ViLXBhdGggdmFsdWVzIGFzIHN0cmluZ1xuY29uc3QganNvbkdldCA9IChvYmosIHBhdGgpID0+IHtcbiAgaWYgKCFvYmopIHJldHVybiBudWxsO1xuICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aEFycmF5ID0gcGF0aC5zcGxpdChcIi5cIik7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChwYXRoQXJyYXlbaV0gPT09IFwiKlwiKSB7XG4gICAgICAgIGNvbnN0IHN1YlBhdGggPSBwYXRoQXJyYXkuc2xpY2UoaSArIDEpLmpvaW4oXCIuXCIpO1xuICAgICAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBpbiBjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRbc3ViS2V5XSAhPT0gdW5kZWZpbmVkICYmIGN1cnJlbnRbc3ViS2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgc3ViVmFsdWUgPSBqc29uR2V0KGN1cnJlbnRbc3ViS2V5XSwgc3ViUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3ViVmFsdWUgIT09IG51bGwgJiYgc3ViVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBzdWJBcnJheS5wdXNoKHN1YlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YkFycmF5O1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnRbcGF0aEFycmF5W2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgcHJlcGFyZUNvcmVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB3aW5kb3dQdHIgPSB3aW5kb3cudG9wO1xuICBjb25zdCBuYXZQdHIgPSB3aW5kb3dQdHIubmF2aWdhdG9yO1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50RGF0YT8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudDtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZQbGF0Zm9ybVwiLCBwbGF0Zm9ybSk7XG5cbiAgLyogd2luZG93IHZpZXcgYXJlYSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dQUmF0aW9cIiwgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIGNvbnN0IGF2YWlsV2luZG93ID0gd2luZG93UHRyLnNjcmVlbj8uYXZhaWxXaWR0aCArIFwieFwiICsgd2luZG93UHRyLnNjcmVlbj8uYXZhaWxIZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0F2YWlsXCIsIGF2YWlsV2luZG93KTtcblxuICBjb25zdCB3aW5kb3dEZXB0aCA9IHdpbmRvd1B0ci5zY3JlZW4/LmNvbG9yRGVwdGggKyBcIi1cIiArIHdpbmRvd1B0ci5zY3JlZW4/LnBpeGVsRGVwdGg7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0RlcHRoXCIsIHdpbmRvd0RlcHRoKTtcblxuICBjb25zdCB2cG9ydFNoYXBlID0gd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py53aWR0aCArIFwieFwiICsgd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py5oZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1Zwb3J0XCIsIHZwb3J0U2hhcGUpO1xuXG4gIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICBsZXQgd2lkdGggPSBwYXJzZUludChzY3JlZW4ud2lkdGgpO1xuICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBwYXJzZUludChzY3JlZW4uaGVpZ2h0KSA6IDA7XG4gICAgaWYgKHdpZHRoICE9PSAwICYmIGhlaWdodCAhPT0gMCkge1xuICAgICAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QocGxhdGZvcm0pO1xuICAgICAgaWYgKGlPUyAmJiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbykge1xuICAgICAgICAvLyBpb3MgcHJvdmlkZXMgRFBJcywgbmVlZCB0byBtdWx0aXBseVxuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGggKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25BbmdsZSA9IHdpbmRvd1B0ci5zY3JlZW4/Lm9yaWVudGF0aW9uPy5hbmdsZTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSA5MCB8fCBNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gMjcwKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBsYW5kc2NhcGUgb3JpZW50YXRpb24gc3dpdGNoIHZhbHVlcyBmb3IgYWxsIGV4Y2VwdCBpb3NcbiAgICAgICAgICBjb25zdCB0ZW1wID0gd2lkdGg7XG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQ7XG4gICAgICAgICAgaGVpZ2h0ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93XCIsIHdpZHRoICsgXCJ4XCIgKyBoZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIG5hdmlnYXRvciAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIaXN0U2l6ZVwiLCB3aW5kb3dQdHIuaGlzdG9yeT8ubGVuZ3RoKTtcblxuICAvLyBjaGVjayBpZiB1c2VyQWdlbnREYXRhIGlzIHN1cHBvcnRlZCBhbmQgdXNlckFnZW50IGlzIG5vdCBhdmFpbGFibGUsIHVzZSBpdFxuICBpZiAoIW5hdlB0ci51c2VyQWdlbnQpIHtcbiAgICBpZiAobmF2UHRyLnVzZXJBZ2VudERhdGEpIHtcbiAgICAgIC8vIHR1cm4gYnJhbmRzIGFycmF5IGludG8gc3RyaW5nXG4gICAgICBsZXQgbmF2QWdlbnQgPSBuYXZQdHI/LnVzZXJBZ2VudERhdGE/LmJyYW5kcz8ubWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuYnJhbmQgKyBcIjpcIiArIGUudmVyc2lvbjtcbiAgICAgIH0pLmpvaW4oKTtcbiAgICAgIC8vIGFkZCBtb2JpbGUgaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gKG5hdlB0cj8udXNlckFnZW50RGF0YT8ubW9iaWxlID8gXCJtb2JpXCIgOiBcIiBcIik7XG4gICAgICAvLyBhZGQgcGxhdGZvcm0gaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gcGxhdGZvcm07XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZBZ2VudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdlB0ci51c2VyQWdlbnQpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SFdDb3Jlc1wiLCBuYXZQdHIuaGFyZHdhcmVDb25jdXJyZW5jeSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkxhbmd1YWdlXCIsIG5hdlB0ci5sYW5ndWFnZSB8fFxuICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIuc3lzdGVtTGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIudXNlckxhbmd1YWdlLFxuICApO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZUb3VjaFwiLCBuYXZQdHIubWF4VG91Y2hQb2ludHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZWZW5kb3JcIiwgbmF2UHRyLnZlbmRvcik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmludGVybmV0U3BlZWRcIiwgd2luZG93UHRyLm5hdmlnYXRvcj8uY29ubmVjdGlvbj8uZG93bmxpbmspO1xuXG4gIC8qIG1pc2NlbGxhbmVvdXMgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkb250dHJhY2tcIiwgbmF2UHRyLmRvTm90VHJhY2sgfHwgd2luZG93UHRyLmRvTm90VHJhY2sgfHwgbmF2UHRyLm1zRG9Ob3RUcmFjayk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIGNvbnN0IGZpcnN0U2Vzc2lvblJlZmVycmVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSKTtcbiAgaWYgKCFmaXJzdFNlc3Npb25SZWZlcnJlcikge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCBmaXJzdFNlc3Npb25SZWZlcnJlcik7XG4gIH1cbn07XG5cbmNvbnN0IGFkZE1ldHJpY3MgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgcGVyZk1ldHJpY3MgPSB7fTtcbiAgY29uc3QgcGVyZk5hdmlnYXRpb25NZXRyaWNzID0gd2luZG93UHRyLnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdO1xuICBpZiAod2luZG93UHRyLnBlcmZvcm1hbmNlICYmIHBlcmZOYXZpZ2F0aW9uTWV0cmljcykge1xuICAgIHBlcmZNZXRyaWNzLmNvbm5lY3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MucmVxdWVzdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlc3BvbnNlRW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlcXVlc3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZG9tID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tSW50ZXJhY3RpdmUgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tQ29tcGxldGUpO1xuICAgIHBlcmZNZXRyaWNzLmxvYWQgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZHVyYXRpb24pO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibWV0cmljc1wiLCBwZXJmTWV0cmljcyk7XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU1vbml0b3JcIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBtb25pdG9yXCIpO1xuXG4gICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gZmFsc2U7XG5cbiAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBBdHRlbXB0cyB0byBzZW5kIHRoZSBpbml0aWFsIGxvZyBib2R5IChiZWFnbGVJbmZvTGF5ZXIncyBpbml0aWFsIHBvcHVsYXRpb24pIGltbWVkaWF0ZWx5XG4gIGFzeW5jIHNlbmRMb2dzKGltbWVkaWF0ZSkge1xuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBpbW1lZGlhdGUgc2VuZGluZyBibG9ja1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIGF3YWl0aW5nIHNjcmFwaW5nXCIpO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBzZW5kaW5nIGxvZ3NcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIGluaXRpYWwgbG9nIGJvZHkgYW5kIGluY3JlbWVudGFsIHVwZGF0ZSBsb2dzIG9uIGNsb3NlXG4gIGFzeW5jIGhhbmRsZUNsb3NlRXZlbnQoKSB7XG4gICAgLy8gaWYgaW5pdGlhbCBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCBzZW5kIHVwZGF0ZXMgYW5kIGluZm9sYXllciBpbiBvbmUgYmF0Y2hcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICAvLyBpZiBtYWluIGxvZyBoYXMgYmVlbiBzZW50LCBzZW5kIGluY3JlbWVudGFsIHVwZGF0ZXMgb25seVxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZU1haW5Mb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZU1haW5Mb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgICBsb2dnZXIubG9nKFwiUmVxdWVzdCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpIHtcbiAgICBpZiAoIXRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNVcGRhdGVzU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCB0aGVyZSBpcyBubyBpbmNyZW1lbnRhbCB5ZXRcbiAgICAgIC8vIG9yIGlmIHRoZSB1cGRhdGVzIGhhdmUgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ2hhbmdlZCA9IGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2dzIGNoYW5nZSBzdGF0dXM6IFwiLCBoYXNDaGFuZ2VkKTtcbiAgICBpZiAoIWhhc0NoYW5nZWQpIHJldHVybjtcblxuICAgIGNvbnN0IGxvZ0RhdGEgPSBhd2FpdCB0aGlzLnBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKTtcbiAgICBpZiAobG9nRGF0YSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNlbmRpbmcgaW5jcmVtZW50YWwgbG9nc1wiLCBsb2dEYXRhKTtcbiAgICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MobG9nRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlQXJyaXZhbExvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc0Fycml2YWxMb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBvciBhcnJpdmFsIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja0ZvckxhdGVzdENoYW5nZXMoKSB7XG4gICAgY29uc3QgaHdtID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9faHdtXCIpO1xuICAgIGlmICh0aGlzLmhpZ2hXYXRlck1hcmsgIT09IGh3bSkge1xuICAgICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbdXJsLCBoYXNoLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAwLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIHU6IHVybCxcbiAgICAgIG9uSGFzaFBjdDogaGFzaCxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VNYWluTG9nRGF0YSgpIHtcbiAgICBjb25zdCBib2R5ID0ge307XG4gICAgaWYgKCF3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMod2luZG93LmJlYWdsZUluZm9MYXllcikpIHtcbiAgICAgIGlmICgha2V5LnN0YXJ0c1dpdGgoXCJfXCIpICYmIHZhbHVlICE9PSBudWxsKSBib2R5W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgYm9keS5sYyA9IDE7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFthLCBlLCBmLCBzLCBtLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZlwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm1cIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMixcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICBhLCBlLCBmLCBzLCBtLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxldCB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBleGl0IGV2ZW50IGxpc3RlbmVyXCIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBiZWZvcmV1bmxvYWQgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBwYWdlaGlkZSBldmVudFwiKTtcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgLy8gSWYgcGFnZSBpcyBub3QgdmlzaWJsZSBhbmQgZG9lc24ndCBiZWNvbWUgdmlzaWJsZSB3aXRoaW4gMzAgc2Vjb25kcywgc2VuZCBsb2dzXG4gICAgICAgIHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluIHRpbWVvdXRcIik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gQ2xlYXIgdGltZW91dCB3aGVuIHBhZ2UgaXMgdmlzaWJsZSB0byBtYWtlIHN1cmUgd2Ugc2VuZCB0aGUgbGF0ZXN0IGxvZ3MgcG9zc2libGVcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgfVxuXG4gIHF1ZXVlTG9ncyhsb2dEYXRhKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fCB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZmV0Y2goTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgY29uc3QgcXVldWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghcXVldWVkKSBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3MgcXVldWVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gICAgaWYgKHF1ZXVlZCkgcmV0dXJuO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uaXRvcjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7ZmV0Y2hUcmVhdG1lbnRzLCBmZXRjaFRyZWF0bWVudFdlaWdodHN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5XCIpO1xuXG5jbGFzcyBUcmVhdG1lbnRSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IGJvZHk7XG4gICAgdGhpcy50cmVhdG1lbnRzID0gdHJlYXRtZW50cztcbiAgICB0aGlzLnRyZWF0bWVudFdlaWdodHMgPSB0cmVhdG1lbnRXZWlnaHRzO1xuICAgIHRoaXMuY3VycmVudFBhZ2VUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRzKCkge1xuICAgIGxvZ2dlci5sb2coXCJMb2FkaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3Qge1RSRUFUTUVOVFN9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShUUkVBVE1FTlRTKSk7XG4gICAgbGV0IHRyZWF0bWVudHMgPSB0cmVhdG1lbnRzT2JqPy50cmVhdG1lbnRzO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyZWF0bWVudHNPYmo/LnRpbWVzdGFtcDtcbiAgICBpZiAoIXRyZWF0bWVudHMgfHwgIXRpbWVzdGFtcCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgIH07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgaWYgKGVsYXBzZWRIb3VycyA+IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIGFyZSBleHBpcmVkXCIpO1xuICAgICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJUcmVhdG1lbnRzIGFyZSBsb2FkZWQgZnJvbSBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudFdlaWdodHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWlnaHRzT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5XRUlHSFRTKTtcbiAgICAgIGlmICh3ZWlnaHRzT2JqKSB7XG4gICAgICAgIHdlaWdodHNPYmogPSBKU09OLnBhcnNlKHdlaWdodHNPYmopO1xuICAgICAgICBpZiAod2VpZ2h0c09iai50aW1lc3RhbXApIHtcbiAgICAgICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHdlaWdodHNPYmoudGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICAgICAgaWYgKGVsYXBzZWRIb3VycyA8IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSByZXR1cm4gd2VpZ2h0c09iai53ZWlnaHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzKCk7XG4gICAgICBpZiAoIXdlaWdodHNPYmopIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB3ZWlnaHRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHdlaWdodHNPYmogPSB7d2VpZ2h0czogd2VpZ2h0c09iaiwgdGltZXN0YW1wOiBEYXRlLm5vdygpfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUywgSlNPTi5zdHJpbmdpZnkod2VpZ2h0c09iaikpO1xuICAgICAgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSkge1xuICAgIGxldCBDUFQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19lUnVsZXMuUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgQ1BUID0gQ1BUPy5bMF0gfHwgbnVsbDtcbiAgICBpZiAoIUNQVCkgcmV0dXJuIFtdO1xuICAgIHRoaXMuY3VycmVudFBhZ2VUeXBlID0gQ1BUO1xuICAgIGxldCBtYXRjaGVkVHJlYXRtZW50cyA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IEpTT04ucGFyc2UobWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgICBtYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigobXQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja1BhZ2VUeXBlKG10LnBhZ2VUeXBlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2dnZXIubG9nKGAke21hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIHNlZ21lbnQgbWF0Y2hlZGApO1xuICAgICAgICByZXR1cm4gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgbWF0Y2hlZCByb2JvdHM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgICBtYXRjaGVkVHJlYXRtZW50cyA9IFtdO1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IHRoaXM7XG4gICAgY29uc3QgdXNlclNlZ21lbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKTtcbiAgICBpZiAoIXVzZXJTZWdtZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlclNlZ21lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0c1t1c2VyU2VnbWVudF07XG4gICAgICBpZiAoIXVzZXJTZWdtZW50V2VpZ2h0cykgcmV0dXJuIFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICBsZXQgc2VnbWVudGVkV2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LndlaWdodDtcbiAgICAgICAgaWYgKCFzZWdtZW50ZWRXZWlnaHQpIHtcbiAgICAgICAgICBpZiAodHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHtcbiAgICAgICAgICAgIHNlZ21lbnRlZFdlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuZGVwZW5kYW50X29uX3RyZWF0bWVudF0/LndlaWdodDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z01vZGUgPT09IDEpIHNlZ21lbnRlZFdlaWdodCA9IDEwMDtcbiAgICAgICAgICBpZiAoIXNlZ21lbnRlZFdlaWdodCkgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdHJlYXRtZW50LndlaWdodCA9IHNlZ21lbnRlZFdlaWdodDtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnQuYWN0aW9ucy5zb21lKChhKSA9PiBhLnZhcmlhbnRzKSkge1xuICAgICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLnB1c2godHJlYXRtZW50KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiB0cmVhdG1lbnQuYWN0aW9ucykge1xuICAgICAgICAgIGlmICghYWN0aW9uLnZhcmlhbnRzKSBjb250aW51ZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhbnRLZXkgb2YgT2JqZWN0LmtleXMoYWN0aW9uLnZhcmlhbnRzKSkge1xuICAgICAgICAgICAgaWYgKHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50cyAmJiB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdLnZhcmlhbnRzW3ZhcmlhbnRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXRjaGVkVHJlYXRtZW50cy5wdXNoKHRyZWF0bWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkobWF0Y2hlZFRyZWF0bWVudHMpKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpO1xuICB9XG5cbiAgY2hlY2tQYWdlVHlwZShwYWdlVHlwZXMpIHtcbiAgICBjb25zdCB7Y3VycmVudFBhZ2VUeXBlfSA9IHRoaXM7XG4gICAgaWYgKHBhZ2VUeXBlcyA9PT0gbnVsbCB8fCBwYWdlVHlwZXMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VUeXBlcykpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJQYWdlIFR5cGVzIHNob3VsZCBiZSBhbiBhcnJheVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHBhZ2VUeXBlc1swXS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgcGFnZVR5cGVzID0gcGFnZVR5cGVzLm1hcCgocHQpID0+IHB0LnN1YnN0cigxKSk7XG4gICAgICByZXR1cm4gIXBhZ2VUeXBlcy5pbmNsdWRlcyhjdXJyZW50UGFnZVR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZVR5cGVzLmluY2x1ZGVzKGN1cnJlbnRQYWdlVHlwZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJlYXRtZW50UmVwb3NpdG9yeTtcbiIsImltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiUmVwbGFjZVV0aWxzXCIpO1xuXG5jb25zdCByZXBsYWNlciA9IGFzeW5jICh2YWx1ZSwgcmVwbGFjZUZuKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgW2ksIHZhbF0gb2YgdmFsdWUuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjdXJyZW50UmVwbGFjZUZuID0gQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pID8gcmVwbGFjZUZuW2ldIDogcmVwbGFjZUZuIHx8IFwiXCI7XG4gICAgICBpZiAodHlwZW9mIGN1cnJlbnRSZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IoY3VycmVudFJlcGxhY2VGbik7XG4gICAgICAgIHZhbHVlW2ldID0gcmVwbGFjZUFsbCh2YWwsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWVbaV0gPSByZXBsYWNlRm5FeGVjdXRvcihjdXJyZW50UmVwbGFjZUZuLCB2YWwpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlcGxhY2VGbikpIHtcbiAgICBmb3IgKGNvbnN0IHJGbiBvZiByZXBsYWNlRm4pIHtcbiAgICAgIGlmICh0eXBlb2YgckZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJGbik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IockZuLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgcmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pO1xuICAgICAgdmFsdWUgPSByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUsIHNpbmdsZSA9IGZhbHNlKSB7XG4gIGlmIChyZXBsYWNlRm4gJiYgdmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSkge1xuICAgIGxvZ2dlci5sb2coXCJFeGVjdXRpbmcgcmVwbGFjZSBmdW5jdGlvbjogXCIsIHJlcGxhY2VGbik7XG4gICAgY29uc3QgcmVwbGFjZUZ1bmN0aW9uID0gRnVuY3Rpb24ocmVwbGFjZUZuKTtcbiAgICBpZiAoc2luZ2xlKSByZXR1cm4gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgICByZXR1cm4gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbikge1xuICBjb25zdCB7c3RvcmFnZSwga2V5LCBrZXlGYWxsYmFjaywgdHlwZX0gPSByZXBsYWNlRm47XG4gIHN3aXRjaCAoc3RvcmFnZSkge1xuICAgIGNhc2UgXCJzZXNzaW9uXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gbnVsbDtcbiAgICAgIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5RmFsbGJhY2spO1xuICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXBsYWNlVmFsID0gSlNPTi5wYXJzZShyZXBsYWNlVmFsKTtcbiAgICAgICAgICByZXBsYWNlVmFsID0gcmVwbGFjZVZhbFtyZXBsYWNlVmFsLmxlbmd0aCAtIDFdW3R5cGVdO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZCBub3QgcGFyc2UgJHtyZXBsYWNlVmFsfWApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gICAgY2FzZSBcImluZm8tbGF5ZXJcIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleUZhbGxiYWNrKTtcbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlcjtcbiIsImNvbnN0IGluc3RhbmNlT2ZBbnkgPSAob2JqZWN0LCBjb25zdHJ1Y3RvcnMpID0+IGNvbnN0cnVjdG9ycy5zb21lKChjKSA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xubGV0IGN1cnNvckFkdmFuY2VNZXRob2RzO1xuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcbiAgICByZXR1cm4gKGlkYlByb3h5YWJsZVR5cGVzIHx8XG4gICAgICAgIChpZGJQcm94eWFibGVUeXBlcyA9IFtcbiAgICAgICAgICAgIElEQkRhdGFiYXNlLFxuICAgICAgICAgICAgSURCT2JqZWN0U3RvcmUsXG4gICAgICAgICAgICBJREJJbmRleCxcbiAgICAgICAgICAgIElEQkN1cnNvcixcbiAgICAgICAgICAgIElEQlRyYW5zYWN0aW9uLFxuICAgICAgICBdKSk7XG59XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkge1xuICAgIHJldHVybiAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHxcbiAgICAgICAgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5hZHZhbmNlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxuICAgICAgICBdKSk7XG59XG5jb25zdCBjdXJzb3JSZXF1ZXN0TWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uRG9uZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh3cmFwKHJlcXVlc3QucmVzdWx0KSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH0pO1xuICAgIHByb21pc2VcbiAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgIC8vIFNpbmNlIGN1cnNvcmluZyByZXVzZXMgdGhlIElEQlJlcXVlc3QgKCpzaWdoKiksIHdlIGNhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWxcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJDdXJzb3IpIHtcbiAgICAgICAgICAgIGN1cnNvclJlcXVlc3RNYXAuc2V0KHZhbHVlLCByZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYXRjaGluZyB0byBhdm9pZCBcIlVuY2F1Z2h0IFByb21pc2UgZXhjZXB0aW9uc1wiXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgLy8gVGhpcyBtYXBwaW5nIGV4aXN0cyBpbiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYnV0IGRvZXNuJ3QgZG9lc24ndCBleGlzdCBpbiB0cmFuc2Zvcm1DYWNoZS4gVGhpc1xuICAgIC8vIGlzIGJlY2F1c2Ugd2UgY3JlYXRlIG1hbnkgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0LlxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcbiAgICAvLyBFYXJseSBiYWlsIGlmIHdlJ3ZlIGFscmVhZHkgY3JlYXRlZCBhIGRvbmUgcHJvbWlzZSBmb3IgdGhpcyB0cmFuc2FjdGlvbi5cbiAgICBpZiAodHJhbnNhY3Rpb25Eb25lTWFwLmhhcyh0eCkpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBkb25lID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvciB8fCBuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydEVycm9yJywgJ0Fib3J0RXJyb3InKSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIENhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgdHJhbnNhY3Rpb25Eb25lTWFwLnNldCh0eCwgZG9uZSk7XG59XG5sZXQgaWRiUHJveHlUcmFwcyA9IHtcbiAgICBnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyYW5zYWN0aW9uLmRvbmUuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RvbmUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBmb3Igb2JqZWN0U3RvcmVOYW1lcyBiZWNhdXNlIG9mIEVkZ2UuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ29iamVjdFN0b3JlTmFtZXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1ha2UgdHguc3RvcmUgcmV0dXJuIHRoZSBvbmx5IHN0b3JlIGluIHRoZSB0cmFuc2FjdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBtYW55LlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1sxXVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IHJlY2VpdmVyLm9iamVjdFN0b3JlKHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEVsc2UgdHJhbnNmb3JtIHdoYXRldmVyIHdlIGdldCBiYWNrLlxuICAgICAgICByZXR1cm4gd3JhcCh0YXJnZXRbcHJvcF0pO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldCwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24gJiZcbiAgICAgICAgICAgIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHJlcGxhY2VUcmFwcyhjYWxsYmFjaykge1xuICAgIGlkYlByb3h5VHJhcHMgPSBjYWxsYmFjayhpZGJQcm94eVRyYXBzKTtcbn1cbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbihmdW5jKSB7XG4gICAgLy8gRHVlIHRvIGV4cGVjdGVkIG9iamVjdCBlcXVhbGl0eSAod2hpY2ggaXMgZW5mb3JjZWQgYnkgdGhlIGNhY2hpbmcgaW4gYHdyYXBgKSwgd2VcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXG4gICAgLy8gRWRnZSBkb2Vzbid0IHN1cHBvcnQgb2JqZWN0U3RvcmVOYW1lcyAoYm9vbyksIHNvIHdlIHBvbHlmaWxsIGl0IGhlcmUuXG4gICAgaWYgKGZ1bmMgPT09IElEQkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiAmJlxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmVOYW1lcywgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgdHggPSBmdW5jLmNhbGwodW53cmFwKHRoaXMpLCBzdG9yZU5hbWVzLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHR4KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ3Vyc29yIG1ldGhvZHMgYXJlIHNwZWNpYWwsIGFzIHRoZSBiZWhhdmlvdXIgaXMgYSBsaXR0bGUgbW9yZSBkaWZmZXJlbnQgdG8gc3RhbmRhcmQgSURCLiBJblxuICAgIC8vIElEQiwgeW91IGFkdmFuY2UgdGhlIGN1cnNvciBhbmQgd2FpdCBmb3IgYSBuZXcgJ3N1Y2Nlc3MnIG9uIHRoZSBJREJSZXF1ZXN0IHRoYXQgZ2F2ZSB5b3UgdGhlXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcbiAgICAvLyB3aXRoIHJlYWwgcHJvbWlzZXMsIHNvIGVhY2ggYWR2YW5jZSBtZXRob2RzIHJldHVybnMgYSBuZXcgcHJvbWlzZSBmb3IgdGhlIGN1cnNvciBvYmplY3QsIG9yXG4gICAgLy8gdW5kZWZpbmVkIGlmIHRoZSBlbmQgb2YgdGhlIGN1cnNvciBoYXMgYmVlbiByZWFjaGVkLlxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKGN1cnNvclJlcXVlc3RNYXAuZ2V0KHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHdyYXAoZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIHJldHVybiB3cmFwRnVuY3Rpb24odmFsdWUpO1xuICAgIC8vIFRoaXMgZG9lc24ndCByZXR1cm4sIGl0IGp1c3QgY3JlYXRlcyBhICdkb25lJyBwcm9taXNlIGZvciB0aGUgdHJhbnNhY3Rpb24sXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbilcbiAgICAgICAgY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHZhbHVlKTtcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodmFsdWUsIGlkYlByb3h5VHJhcHMpO1xuICAgIC8vIFJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrIGlmIHdlJ3JlIG5vdCBnb2luZyB0byB0cmFuc2Zvcm0gaXQuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gd3JhcCh2YWx1ZSkge1xuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxuICAgIC8vIElEQiBpcyB3ZWlyZCBhbmQgYSBzaW5nbGUgSURCUmVxdWVzdCBjYW4geWllbGQgbWFueSByZXNwb25zZXMsIHNvIHRoZXNlIGNhbid0IGJlIGNhY2hlZC5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJSZXF1ZXN0KVxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSB0cmFuc2Zvcm1lZCB0aGlzIHZhbHVlIGJlZm9yZSwgcmV1c2UgdGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxuICAgIC8vIFRoaXMgaXMgZmFzdGVyLCBidXQgaXQgYWxzbyBwcm92aWRlcyBvYmplY3QgZXF1YWxpdHkuXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSk7XG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXG4gICAgLy8gVGhlc2UgbWF5IGJlIHByaW1pdGl2ZSB0eXBlcywgc28gdGhleSBjYW4ndCBiZSBXZWFrTWFwIGtleXMuXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChuZXdWYWx1ZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG59XG5jb25zdCB1bndyYXAgPSAodmFsdWUpID0+IHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuXG5leHBvcnQgeyByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYXMgYSwgaW5zdGFuY2VPZkFueSBhcyBpLCByZXBsYWNlVHJhcHMgYXMgciwgdW53cmFwIGFzIHUsIHdyYXAgYXMgdyB9O1xuIiwiaW1wb3J0IHsgdyBhcyB3cmFwLCByIGFzIHJlcGxhY2VUcmFwcyB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuZXhwb3J0IHsgdSBhcyB1bndyYXAsIHcgYXMgd3JhcCB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuXG4vKipcbiAqIE9wZW4gYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqIEBwYXJhbSB2ZXJzaW9uIFNjaGVtYSB2ZXJzaW9uLlxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cbiAqL1xuZnVuY3Rpb24gb3BlbkRCKG5hbWUsIHZlcnNpb24sIHsgYmxvY2tlZCwgdXBncmFkZSwgYmxvY2tpbmcsIHRlcm1pbmF0ZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5Qcm9taXNlID0gd3JhcChyZXF1ZXN0KTtcbiAgICBpZiAodXBncmFkZSkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHVwZ3JhZGUod3JhcChyZXF1ZXN0LnJlc3VsdCksIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIHdyYXAocmVxdWVzdC50cmFuc2FjdGlvbiksIGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsIChldmVudCkgPT4gYmxvY2tlZChcbiAgICAgICAgLy8gQ2FzdGluZyBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0LURPTS1saWItZ2VuZXJhdG9yL3B1bGwvMTQwNVxuICAgICAgICBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCBldmVudCkpO1xuICAgIH1cbiAgICBvcGVuUHJvbWlzZVxuICAgICAgICAudGhlbigoZGIpID0+IHtcbiAgICAgICAgaWYgKHRlcm1pbmF0ZWQpXG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHRlcm1pbmF0ZWQoKSk7XG4gICAgICAgIGlmIChibG9ja2luZykge1xuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcigndmVyc2lvbmNoYW5nZScsIChldmVudCkgPT4gYmxvY2tpbmcoZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgZXZlbnQpKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xuICAgIHJldHVybiBvcGVuUHJvbWlzZTtcbn1cbi8qKlxuICogRGVsZXRlIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZURCKG5hbWUsIHsgYmxvY2tlZCB9ID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xuICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsIChldmVudCkgPT4gYmxvY2tlZChcbiAgICAgICAgLy8gQ2FzdGluZyBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0LURPTS1saWItZ2VuZXJhdG9yL3B1bGwvMTQwNVxuICAgICAgICBldmVudC5vbGRWZXJzaW9uLCBldmVudCkpO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcChyZXF1ZXN0KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XG59XG5cbmNvbnN0IHJlYWRNZXRob2RzID0gWydnZXQnLCAnZ2V0S2V5JywgJ2dldEFsbCcsICdnZXRBbGxLZXlzJywgJ2NvdW50J107XG5jb25zdCB3cml0ZU1ldGhvZHMgPSBbJ3B1dCcsICdhZGQnLCAnZGVsZXRlJywgJ2NsZWFyJ107XG5jb25zdCBjYWNoZWRNZXRob2RzID0gbmV3IE1hcCgpO1xuZnVuY3Rpb24gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkge1xuICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIElEQkRhdGFiYXNlICYmXG4gICAgICAgICEocHJvcCBpbiB0YXJnZXQpICYmXG4gICAgICAgIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FjaGVkTWV0aG9kcy5nZXQocHJvcCkpXG4gICAgICAgIHJldHVybiBjYWNoZWRNZXRob2RzLmdldChwcm9wKTtcbiAgICBjb25zdCB0YXJnZXRGdW5jTmFtZSA9IHByb3AucmVwbGFjZSgvRnJvbUluZGV4JC8sICcnKTtcbiAgICBjb25zdCB1c2VJbmRleCA9IHByb3AgIT09IHRhcmdldEZ1bmNOYW1lO1xuICAgIGNvbnN0IGlzV3JpdGUgPSB3cml0ZU1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpO1xuICAgIGlmIChcbiAgICAvLyBCYWlsIGlmIHRoZSB0YXJnZXQgZG9lc24ndCBleGlzdCBvbiB0aGUgdGFyZ2V0LiBFZywgZ2V0QWxsIGlzbid0IGluIEVkZ2UuXG4gICAgISh0YXJnZXRGdW5jTmFtZSBpbiAodXNlSW5kZXggPyBJREJJbmRleCA6IElEQk9iamVjdFN0b3JlKS5wcm90b3R5cGUpIHx8XG4gICAgICAgICEoaXNXcml0ZSB8fCByZWFkTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kID0gYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xuICAgICAgICAvLyBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiB1bmRlZmluZWQgZ3ppcHBzIGJldHRlciwgYnV0IGZhaWxzIGluIEVkZ2UgOihcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5Jyk7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0eC5zdG9yZTtcbiAgICAgICAgaWYgKHVzZUluZGV4KVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmluZGV4KGFyZ3Muc2hpZnQoKSk7XG4gICAgICAgIC8vIE11c3QgcmVqZWN0IGlmIG9wIHJlamVjdHMuXG4gICAgICAgIC8vIElmIGl0J3MgYSB3cml0ZSBvcGVyYXRpb24sIG11c3QgcmVqZWN0IGlmIHR4LmRvbmUgcmVqZWN0cy5cbiAgICAgICAgLy8gTXVzdCByZWplY3Qgd2l0aCBvcCByZWplY3Rpb24gZmlyc3QuXG4gICAgICAgIC8vIE11c3QgcmVzb2x2ZSB3aXRoIG9wIHZhbHVlLlxuICAgICAgICAvLyBNdXN0IGhhbmRsZSBib3RoIHByb21pc2VzIChubyB1bmhhbmRsZWQgcmVqZWN0aW9ucylcbiAgICAgICAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0YXJnZXRbdGFyZ2V0RnVuY05hbWVdKC4uLmFyZ3MpLFxuICAgICAgICAgICAgaXNXcml0ZSAmJiB0eC5kb25lLFxuICAgICAgICBdKSlbMF07XG4gICAgfTtcbiAgICBjYWNoZWRNZXRob2RzLnNldChwcm9wLCBtZXRob2QpO1xuICAgIHJldHVybiBtZXRob2Q7XG59XG5yZXBsYWNlVHJhcHMoKG9sZFRyYXBzKSA9PiAoe1xuICAgIC4uLm9sZFRyYXBzLFxuICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcbiAgICBoYXM6ICh0YXJnZXQsIHByb3ApID0+ICEhZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuaGFzKHRhcmdldCwgcHJvcCksXG59KSk7XG5cbmV4cG9ydCB7IGRlbGV0ZURCLCBvcGVuREIgfTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZV9jYWNoZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBzdG9yZToge1xuICAgIG5hbWU6IFwiaW5mb0NhY2hlXCIsXG4gICAgaW5kZXhlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIml4X3NrdVwiLFxuICAgICAgICBmaWVsZHM6IFwic2t1XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgb3B0aW9uczoge2tleVBhdGg6IFwic2t1XCJ9LFxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsIlxuaW1wb3J0IHtvcGVuREJ9IGZyb20gXCJpZGJcIjtcbmltcG9ydCB7ZmV0Y2hQcm9kdWN0SW5mb30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5XCIpO1xuY2xhc3MgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kZXhlZERCID0gbnVsbDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGFzeW5jIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgY29uc3Qge2RiTmFtZSwgdmVyc2lvbn0gPSBjb25maWc7XG4gICAgY29uc3QgZGIgPSBhd2FpdCBvcGVuREIoZGJOYW1lLCB2ZXJzaW9uLCB7XG4gICAgICB1cGdyYWRlKGRiLCBvbGRWZXJzaW9uKSB7XG4gICAgICAgIHN3aXRjaCAob2xkVmVyc2lvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGRiLmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5pbmRleGVkREIgPSBkYjtcbiAgfVxuXG4gIGFzeW5jIGdldERCKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLmluZGV4ZWREQik7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlByb2R1Y3QgaW5mbyBkYiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgMzAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRTdG9yZShyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIHJldHVybiBkYi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSwgcmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikuc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKHBheWxvYWQpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuZ2V0U3RvcmUodHJ1ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIGNvbnN0IHNhdmVQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBsb2FkIG9mIHBheWxvYWQpIHtcbiAgICAgICAgbG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHNhdmVQcm9taXNlcy5wdXNoKHN0b3JlLnB1dChsb2FkKSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChzYXZlUHJvbWlzZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgIGF3YWl0IHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjbGVhcigpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuZ2V0U3RvcmUodHJ1ZSk7XG4gICAgYXdhaXQgc3RvcmUuY2xlYXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3luYyBnZXQoc2t1KSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGIuZ2V0KGNvbmZpZy5zdG9yZS5uYW1lLCBza3UpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBjb3VudCgpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb3VudChjb25maWcuc3RvcmUubmFtZSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIGdldEN1cnNvcigpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCBkYi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSkuc3RvcmUub3BlbkN1cnNvcigpO1xuICAgIHJldHVybiBjdXJzb3I7XG4gIH1cblxuICBhc3luYyBwZXJzaXN0UHJvZHVjdEluZm8oKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiY2hlY2stZXhpc3RpbmctcHJvZC1pbmZvXCIpO1xuICAgIGNvbnN0IGV4aXN0aW5nUHJvZEluZm8gPSBhd2FpdCB0aGlzLmNvdW50KCk7XG4gICAgaWYgKGV4aXN0aW5nUHJvZEluZm8pIHtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gZm91bmRcIik7XG4gICAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCB0aGlzLmdldEN1cnNvcigpO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gY3Vyc29yLnZhbHVlLnRpbWVzdGFtcDtcbiAgICAgIGNvbnN0IGVsYXBzZWRTZWNvbmRzID0gKERhdGUubm93KCkgLyAxMDAwKSAtIHRpbWVzdGFtcDtcbiAgICAgIC8vIFJlLWZldGNoIHByb2R1Y3QgaW5mbyBvbmNlIGEgZGF5XG4gICAgICBpZiAoZWxhcHNlZFNlY29uZHMgPCA4NjQwMCkgcmV0dXJuO1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBpcyBleHBpcmVkXCIpO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGluZy1wcm9kLWluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gZmV0Y2hQcm9kdWN0SW5mbygpO1xuICAgIGxldCBjbGVhclByb21pc2UgPSBudWxsO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSBjbGVhclByb21pc2UgPSB0aGlzLmNsZWFyKCk7XG4gICAgY29uc3QgW3Byb2R1Y3RJbmZvQXJyYXldID0gYXdhaXQgUHJvbWlzZS5hbGwoW3Byb2R1Y3RJbmZvUHJvbWlzZSwgY2xlYXJQcm9taXNlXSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mb0FycmF5IHx8ICFwcm9kdWN0SW5mb0FycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtcHJvZC1pbmZvXCIpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSh0aGlzLnByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicGVyc2lzdGVkLXByb2QtaW5mb1wiKTtcbiAgfVxuXG4gIHByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgY29uc3QgcGF5bG9hZHMgPSBbXTtcbiAgICBjb25zdCBmaWVsZE5hbWVzID0gcHJvZHVjdEluZm9BcnJheS5zaGlmdCgpO1xuICAgIGZpZWxkTmFtZXMuc2hpZnQoKTtcbiAgICBmb3IgKGNvbnN0IGluZm8gb2YgcHJvZHVjdEluZm9BcnJheSkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHtza3U6IGluZm8uc2hpZnQoKX07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF5bG9hZFtmaWVsZE5hbWVzW2ldXSA9IGluZm9baV0gfHwgbnVsbDtcbiAgICAgIH1cbiAgICAgIHBheWxvYWRzLnB1c2gocGF5bG9hZCk7XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5O1xuIiwiaW1wb3J0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkgZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7aWRiUmVhZHl9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBTdG9yZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnN0YW5jZTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgYXdhaXQgaWRiUmVhZHkoKTtcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSgpO1xuICAgICAgICAvLyBIaWRlIHRoZSBjb25zdHJ1Y3RvciBzbyB0aGUgcmV0dXJuZWQgb2JqZWN0IGNhbid0IGJlIG5ldydkLi4uXG4gICAgICAgIGluc3RhbmNlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuICB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlLCBjaGFpbn0gPSBjb25kaXRpb247XG4gIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbmRpdGlvbkVsZW1lbnRzKSB7XG4gICAgaWYgKGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pKSB7XG4gICAgICBlbGlnaWJsZUVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuY29uc3QgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciA9IGFzeW5jIChlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChlbGVtZW50U2t1KTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHByb2R1Y3RJbmZvPy5bb3BlcmF0b3JdO1xuICAgICAgLy8gcnVuVGltZVZhbHVlIG1heSBiZSAwXG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8IHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJQcm9kdWN0IGluZm8gaXMgZW1wdHlcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhc2UgXCJmdW5jdGlvblwiOiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmbiA9IEZ1bmN0aW9uKFwiZWxcIiwgb3BlcmF0b3IpO1xuICAgICAgICByZXR1cm4gZm4oZWxlbWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGV4ZWN1dGluZyBmdW5jdGlvbiBhY3Rpb24gY29uZGl0aW9uXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGNoYWluKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgY2hhaW4udHlwZSwgY2hhaW4ub3BlcmF0b3IsXG4gICAgICAgICAgICBjaGFpbi5hdHRyaWJ1dGUsIGNoYWluLmlubmVyX2NvbmRpdGlvbiwgY2hhaW4udmFsdWUsIGNoYWluLmNoYWluKTtcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGVja0FjdGlvbkNvbmRpdGlvbjtcbiIsImltcG9ydCB7c3R5bGVBcHBsaWNhdG9yLCBkZWxheSwgaWRsZVRpbWVyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7cmVwbGFjZUFsbCwgdHVya2lzaFRvTG93ZXJ9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUlksIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBJRExFX1RJTUVPVVR9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCByZXBsYWNlciBmcm9tIFwiLi9yZXBsYWNlLXV0aWxzXCI7XG5pbXBvcnQgY2hlY2tBY3Rpb25Db25kaXRpb24gZnJvbSBcIi4vYWN0aW9uLWNvbmRpdGlvbi11dGlsXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5QWN0aW9ucyhhY3Rpb25zKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVBcHBseUFjdGlvbnNcIik7XG4gIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBjb25zdCB7XG4gICAgICBvcGVyYXRvcixcbiAgICAgIHR5cGUsXG4gICAgICBhcHBseUV2ZW50LFxuICAgICAgY29udGVudFNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBzZWxlY3RvckZhbGxiYWNrLFxuICAgICAgbWRDb25kaXRpb24sXG4gICAgICBtb3ZlX3NlbGVjdG9yXzEsXG4gICAgICBtb3ZlX3NlbGVjdG9yXzIsXG4gICAgICByZXBsYWNlRm4sXG4gICAgICBwVHlwZSxcbiAgICAgIHByb2R1Y3RJbmZvU3RvcmFnZSxcbiAgICB9ID0gYWN0aW9uO1xuICAgIGlmIChvcGVyYXRvciA9PT0gXCJub29wXCIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJOb29wIE9wZXJhdG9yOiBObyBvcGVyYXRpb24gaXMgYXBwbGllZCBvbiB0YXJnZXQgXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCB7dmFsdWV9ID0gYWN0aW9uO1xuICAgIC8vIElmIGFuIGVsZW1lbnQgaXMgcGFzc2VkIHRvIHRyYW5zZm9ybWVyLCBzZWxlY3RvciBpcyByZWxhdGl2ZSB0byBwYXNzZWQgZWxlbWVudFxuICAgIGVsZW1lbnQgPSBlbGVtZW50ID8gZWxlbWVudC5maW5kKHNlbGVjdG9yKSA6ICQoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbWMgPSBtZENvbmRpdGlvbiA/IHdpbmRvdy5tYXRjaE1lZGlhKG1kQ29uZGl0aW9uKS5tYXRjaGVzIDogdHJ1ZTtcbiAgICBpZiAoIW1jKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTWVkaWEgY29uZGl0aW9uIG1pc21hdGNoOiBcIiwgbWRDb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAobW92ZV9zZWxlY3Rvcl8xICYmICFtb3ZlX3NlbGVjdG9yXzIpIHx8XG4gICAgICAobW92ZV9zZWxlY3Rvcl8yICYmICFtb3ZlX3NlbGVjdG9yXzEpXG4gICAgKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQm90aCBtb3ZlIHNlbGVjdG9ycyBhcmUgcmVxdWlyZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChtb3ZlX3NlbGVjdG9yXzEgJiYgbW92ZV9zZWxlY3Rvcl8yKSB7XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8xKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMSBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8yKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMiBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3Qgc3BlY2lmaWVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGlmICghJChzZWxlY3RvckZhbGxiYWNrKS5sZW5ndGggJiYgb3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IFwibm8tc2VsZWN0b3JcIikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQ6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyeWluZyBmYWxsYmFjayBzZWxlY3RvcjogXCIsIHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmIChzZWxlY3RvckZhbGxiYWNrKSBlbGVtZW50ID0gJChzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFsbGJhY2sgc2VsZWN0b3Igbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlRm4pIHtcbiAgICAgIHZhbHVlID0gYXdhaXQgcmVwbGFjZXIodmFsdWUsIHJlcGxhY2VGbik7XG4gICAgfVxuICAgIGlmIChvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlbW92aW5nOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluc2VydFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJlZm9yZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYmVmb3JlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFmdGVyXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBhZnRlcjogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFmdGVyKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBlbmRpbmcgdmFsdWU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW9kYWxcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50Lm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAoZWxtID09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNwbGF5TW9kYWwodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwb3B1cFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJQb3B1cCBhbHJlYWR5IGRpc3BsYXllZCBpbiBzZXNzaW9uXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBQb3B1cDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwVHlwZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBjb25zdCBtb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJleGl0SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgZXhpdCBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3IsIGRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInJcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIgJiYgIXIuaW5jbHVkZXMoZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZGxlVGltZXIoSURMRV9USU1FT1VULCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3B5SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgY29weSBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhcHBlbmQgcG9wdXAgdG8gYm9keSBhZnRlciB0aW1lb3V0IGV4cGlyZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVBvcHVwKCk7XG4gICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBUeXBlOiAke3R5cGV9IG5vdCBmb3VuZCBmb3Igb3BlcmF0b3I6ICR7b3BlcmF0b3J9YCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiZWRpdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyB0ZXh0OiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQudGV4dCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgaHRtbDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lmh0bWwodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVBcHBsaWNhdG9yXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVDaGFuZ2VzTWFwID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiU3R5bGUgQ2hhbmdlcyBNYXA6IFwiLCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgICAgc3R5bGVBcHBsaWNhdG9yKGVsZW1lbnQsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWRkQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBhZGRkaW5nIGNsYXNzIHRvICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlbW92ZUNsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgcmVtb3ZlIGNsYXNzIGZyb20gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG9jdW1lbnRUaXRsZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGNoYW5naW5nIGRvY3VtZW50IHRpdGxlIGZyb20gJHtlbGVtZW50fSB0byAke3ZhbHVlfWApO1xuICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09IFwidGFiQ2hhbmdlXCIpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiY2F0Y2hpbmcgZXZlbnQgdGFiY2hhbmdlLi5cIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZSwgdmFsdWUsIG9yaWdpbmFsVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgfSwgMTUwMDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5rbm93biBlZGl0IHR5cGU6IFwiLCB0eXBlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJyZXBsYWNlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmc6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LnJlcGxhY2VBbGwodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic3dhcFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU3dhcHBpbmc6IFwiLCBtb3ZlX3NlbGVjdG9yXzEsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBjb25zdCBuMSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgbjIgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIHN3YXBOb2RlcyhuMSwgbjIpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5qZWN0c2NyaXB0XCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbmplY3Rpbmcgc2NyaXB0OiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5hcHBlbmQoYDxzY3JpcHQ+JHt2YWx1ZX08L3NjcmlwdD5gKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcIm1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhgTW92aW5nICR7bW92ZV9zZWxlY3Rvcl8xfSB0byAke21vdmVfc2VsZWN0b3JfMn1gKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGRlc3RpbmF0aW9uLnByZXBlbmQoc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInByb2R1Y3RJbmZvTG9va3VwXCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgIGVsZW1lbnQuYmVmb3JlKHJlcyk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJ0ZXh0LXRyYW5zZm9ybVwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNhcGl0YWxpemVcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBBcnJheS5mcm9tKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoZS5pbm5lclRleHQ/LmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpLnNwbGl0KFwiXFxuXCIpLm1hcCgoc2VudGVuY2UpID0+XG4gICAgICAgICAgICAgICAgc2VudGVuY2Uuc3BsaXQoXCIgXCIpLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICApLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dClcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gdGV4dC10cmFuc2Zvcm0gdHlwZVwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJhaS1zdWdnZXN0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGl0bGUtY2hhbmdlXCI6IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0dGluZyB0aXRsZSBzdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCBmaW5hbFRpdGxlID0gYXdhaXQgcHJlcGFyZUZpbmFsVGl0bGUoKTtcbiAgICAgICAgICBpZiAoIWZpbmFsVGl0bGUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgdGl0bGUtY2hhbmdlIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmNvbnRlbnRzKCkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZVR5cGUgPT0gMztcbiAgICAgICAgICB9KVswXS5ub2RlVmFsdWUgPSBmaW5hbFRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGQtZGVzY3JpcHRpb25cIjoge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXR0aW5nIGRlc2NyaXB0aW9uIHN1Z2dlc3Rpb25zXCIpO1xuICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRWxtID0gYXdhaXQgcHJlcGFyZURlc2NFbG0odmFsdWUpO1xuICAgICAgICAgIGlmICghZGVzY3JpcHRpb25FbG0pIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgYWRkLWRlc2NyaXB0aW9uIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmJlZm9yZShkZXNjcmlwdGlvbkVsbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggb3BlcmF0b3IgZXhpc3RzIHlldFwiLCBvcGVyYXRvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHByZXBhcmVEZXNjRWxtID0gYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1KTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvLm1hcmtldGluZ0NvcHkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIGRlc2NyaXB0aW9uIGZvdW5kIGZvciBza3UgJHtza3V9YCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlZEh0bWxTdHJpbmcgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5tYXJrZXRpbmdDb3B5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHVwZGF0ZWRIdG1sU3RyaW5nO1xuICB9O1xuXG4gIGNvbnN0IHByZXBhcmVGaW5hbFRpdGxlID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCB7bmFtZSwgc2t1fSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHBcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1KTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvLnRpdGxlQXVnbWVudCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gdGl0bGUgc3VnZ2VzdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChuYW1lLmluY2x1ZGVzKFwiKFwiKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3BsaXQoXCIoXCIpWzBdO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBwcm9kdWN0SW5mby50aXRsZUF1Z21lbnQudG9Mb2NhbGVVcHBlckNhc2UoXCJ0ci1UUlwiKSArIGAgKCR7c2t1fSlgO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvZHVjdEluZm8gPSBhc3luYyAodHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSkgPT4ge1xuICAgIC8vIGdldCBrZXlzIG9mIHByb2R1Y3RJbmZvXG4gICAgY29uc3Qgc2t1TGlzdCA9IHByb2R1Y3RJbmZvU3RvcmFnZSA9PT0gXCJiYXNrZXRcIiA/XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCIsIHRydWUpIDpcbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGxldCByZXMgPSBudWxsO1xuICAgIGlmICghc2t1TGlzdCB8fCBza3VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHNrdSBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSA9IGFzeW5jIChldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkVGl0bGVzID0gIUFycmF5LmlzQXJyYXkodGl0bGVzKSA/IFt0aXRsZXNdIDogdGl0bGVzO1xuICAgIGZvciAoY29uc3QgcGFyc2VkVGl0bGUgb2YgcGFyc2VkVGl0bGVzKSB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IHBhcnNlZFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQb3B1cENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQ7XG4gICAgaWYgKGlkICYmIGlkID09PSBcIm5kLXBvcHVwX193cmFwcGVyXCIpIHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuY29udGFpbnMoXCJuZC1tb2RhbF9fd3JhcHBlclwiKSkge1xuICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBvcHVwID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpID4gMCkgcmV0dXJuO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAxKTtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmQtcG9wdXBfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcblxuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH0sIDE1MDAwKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5TW9kYWwgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvcikgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpKSBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQb3B1cCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCBpc01vZGFsPWZhbHNlKSA9PiB7XG4gICAgLy8gQ3JlYXRlIHBvcHVwIHdyYXBwZXJcbiAgICBjb25zdCBwb3B1cFdyYXBwZXIgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLXBvcHVwX193cmFwcGVyXCIpO1xuICAgIGlmIChpc01vZGFsKSBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLW1vZGFsX193cmFwcGVyXCIpO1xuICAgIGlmICghaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmlkID0gXCJuZC1wb3B1cF9fd3JhcHBlclwiO1xuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b24gPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvblN0eWxlID0gaXNNb2RhbCA/IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZV9fY29sb3JlZFwiIDogXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlXCI7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xvc2VCdXR0b25TdHlsZSk7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBpZiAoaXNNb2RhbCkge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnRTZWxlY3Rvcikge1xuICAgICAgY29uc3QgY29udGVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZW50U2VsZWN0b3IpKTtcbiAgICAgIHdoaWxlICh2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpICYmIGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgY29udGVudHMuc2hpZnQoKS5zcmMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBwb3B1cCBmcm9tIGFjdGlvbiBhbmQgYXBwZW5kIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHRlbXBsYXRlID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IHBvcHVwID0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwQ2xvc2VCdXR0b24pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChwb3B1cCk7XG5cbiAgICAvLyBSZW1vdmUgb2xkIHBvcHVwIGlmIGV4aXN0cyBiZWZvcmUgYXBwZW5kaW5nIG5ldyBvbmVcbiAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IHN3YXBOb2RlcyA9IGZ1bmN0aW9uIHN3YXBOb2RlcyhuMSwgbjIpIHtcbiAgICBjb25zdCBwMSA9IG4xLnBhcmVudE5vZGU7XG4gICAgY29uc3QgcDIgPSBuMi5wYXJlbnROb2RlO1xuICAgIGxldCBpMTtcbiAgICBsZXQgaTI7XG5cbiAgICBpZiAoIXAxIHx8ICFwMiB8fCBwMS5pc0VxdWFsTm9kZShuMikgfHwgcDIuaXNFcXVhbE5vZGUobjEpKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDEuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjEpKSB7XG4gICAgICAgIGkxID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAyLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4yKSkge1xuICAgICAgICBpMiA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHAxLmlzRXF1YWxOb2RlKHAyKSAmJiBpMSA8IGkyKSB7XG4gICAgICBpMisrO1xuICAgIH1cbiAgICBwMS5pbnNlcnRCZWZvcmUobjIsIHAxLmNoaWxkcmVuW2kxXSk7XG4gICAgcDIuaW5zZXJ0QmVmb3JlKG4xLCBwMi5jaGlsZHJlbltpMl0pO1xuICB9O1xuXG4gIGNvbnN0IHdhaXRGb3JKUXVlcnkgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImpRdWVyeSBub3QgZm91bmQsIHJldHJ5aW5nXCIpO1xuICAgICAgICBjb25zdCBqUXVlcnlJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0gZWxzZSByZXNvbHZlKHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFjdGlvbkFwcGxpY2F0b3IgPSBhc3luYyAoYWN0aW9ucykgPT4ge1xuICAgIGlmIChhd2FpdCB3YWl0Rm9ySlF1ZXJ5KCkpIHtcbiAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoYWN0aW9uLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IGF3YWl0IGNoZWNrQWN0aW9uQ29uZGl0aW9uKGFjdGlvbi5jb25kaXRpb24pO1xuICAgICAgICAgICAgaWYgKCFlbGlnaWJsZUVsZW1lbnRzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsaWdpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHJhbnNmb3JtZXIoYWN0aW9uLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHJhbnNmb3JtZXIoYWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkbid0IGFwcGx5IGFjdGlvbiAke0pTT04uc3RyaW5naWZ5KGFjdGlvbil9IHdpdGggZXJyb3IgJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvci1hcHBseWluZy1hY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImNvbnN0IEVfVElNRU9VVCA9IG5ldyBFcnJvcigndGltZW91dCB3aGlsZSB3YWl0aW5nIGZvciBtdXRleCB0byBiZWNvbWUgYXZhaWxhYmxlJyk7XG5jb25zdCBFX0FMUkVBRFlfTE9DS0VEID0gbmV3IEVycm9yKCdtdXRleCBhbHJlYWR5IGxvY2tlZCcpO1xuY29uc3QgRV9DQU5DRUxFRCA9IG5ldyBFcnJvcigncmVxdWVzdCBmb3IgbG9jayBjYW5jZWxlZCcpO1xuXG52YXIgX19hd2FpdGVyJDIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIFNlbWFwaG9yZSB7XG4gICAgY29uc3RydWN0b3IoX3ZhbHVlLCBfY2FuY2VsRXJyb3IgPSBFX0NBTkNFTEVEKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gX3ZhbHVlO1xuICAgICAgICB0aGlzLl9jYW5jZWxFcnJvciA9IF9jYW5jZWxFcnJvcjtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzID0gW107XG4gICAgfVxuICAgIGFjcXVpcmUod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0ucHVzaCh7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCA9IDEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgW3ZhbHVlLCByZWxlYXNlXSA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jayh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0ucHVzaChyZXNvbHZlKTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlIDw9IDA7XG4gICAgfVxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIHJlbGVhc2Uod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMuZm9yRWFjaCgocXVldWUpID0+IHF1ZXVlLmZvckVhY2goKGVudHJ5KSA9PiBlbnRyeS5yZWplY3QodGhpcy5fY2FuY2VsRXJyb3IpKSk7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgfVxuICAgIF9kaXNwYXRjaCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlRW50cnkgPSAoX2EgPSB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlRW50cnkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlIC09IHdlaWdodDtcbiAgICAgICAgICAgIHdlaWdodCA9IHRoaXMuX3ZhbHVlICsgMTtcbiAgICAgICAgICAgIHF1ZXVlRW50cnkucmVzb2x2ZShbcHJldmlvdXNWYWx1ZSwgdGhpcy5fbmV3UmVsZWFzZXIocHJldmlvdXNXZWlnaHQpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZHJhaW5VbmxvY2tXYWl0ZXJzKCk7XG4gICAgfVxuICAgIF9uZXdSZWxlYXNlcih3ZWlnaHQpIHtcbiAgICAgICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIF9kcmFpblVubG9ja1dhaXRlcnMoKSB7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0uZm9yRWFjaCgod2FpdGVyKSA9PiB3YWl0ZXIoKSk7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciQxID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBNdXRleCB7XG4gICAgY29uc3RydWN0b3IoY2FuY2VsRXJyb3IpIHtcbiAgICAgICAgdGhpcy5fc2VtYXBob3JlID0gbmV3IFNlbWFwaG9yZSgxLCBjYW5jZWxFcnJvcik7XG4gICAgfVxuICAgIGFjcXVpcmUoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMSh0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFssIHJlbGVhc2VyXSA9IHlpZWxkIHRoaXMuX3NlbWFwaG9yZS5hY3F1aXJlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVsZWFzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5ydW5FeGNsdXNpdmUoKCkgPT4gY2FsbGJhY2soKSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUud2FpdEZvclVubG9jaygpO1xuICAgIH1cbiAgICByZWxlYXNlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCkpXG4gICAgICAgICAgICB0aGlzLl9zZW1hcGhvcmUucmVsZWFzZSgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuY2FuY2VsKCk7XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiB3aXRoVGltZW91dChzeW5jLCB0aW1lb3V0LCB0aW1lb3V0RXJyb3IgPSBFX1RJTUVPVVQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3F1aXJlOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHN5bmMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxlYXNlID0gQXJyYXkuaXNBcnJheSh0aWNrZXQpID8gdGlja2V0WzFdIDogdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRpY2tldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVsZWFzZSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGlja2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh0aWNrZXRbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGVhc2Uod2VpZ2h0KSB7XG4gICAgICAgICAgICBzeW5jLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN5bmMuY2FuY2VsKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhaXRGb3JVbmxvY2s6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHN5bmMud2FpdEZvclVubG9jayh3ZWlnaHQpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWplY3QodGltZW91dEVycm9yKSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMb2NrZWQ6ICgpID0+IHN5bmMuaXNMb2NrZWQoKSxcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHN5bmMuZ2V0VmFsdWUoKSxcbiAgICAgICAgc2V0VmFsdWU6ICh2YWx1ZSkgPT4gc3luYy5zZXRWYWx1ZSh2YWx1ZSksXG4gICAgfTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saXNuZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB0cnlBY3F1aXJlKHN5bmMsIGFscmVhZHlBY3F1aXJlZEVycm9yID0gRV9BTFJFQURZX0xPQ0tFRCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcmV0dXJuIHdpdGhUaW1lb3V0KHN5bmMsIDAsIGFscmVhZHlBY3F1aXJlZEVycm9yKTtcbn1cblxuZXhwb3J0IHsgRV9BTFJFQURZX0xPQ0tFRCwgRV9DQU5DRUxFRCwgRV9USU1FT1VULCBNdXRleCwgU2VtYXBob3JlLCB0cnlBY3F1aXJlLCB3aXRoVGltZW91dCB9O1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgYXBwbHlBY3Rpb25zIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRyZWF0bWVudCxcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkRGF0YUxpc3RlbmVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBUUkVBVE1FTlRfUkFUSU8sXG4gIE1PQklMRV9NRURJQV9RVUVSWSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZGV0ZXJtaW5lUGN0LFxuICBwcmVwYXJlQWN0aW9ucyxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJvYm90RW5naW5lXCIpO1xuY29uc3QgT0JTRVJWRVJfQ09ORklHID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90RW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cywgZGVidWdNb2RlLCBtYXRjaGVkVHJlYXRtZW50cywgaWRlbnRpZmllciwgcGFnZVR5cGUsIGlzT259ID0gYm9keTtcbiAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcyA9IFtdO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBjb25zdCByb2JvdFByb21pc2VzID0gW107XG4gICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdGhpcy5tYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRyZWF0bWVudC5kZXBlbmRhbnRfb25fdHJlYXRtZW50KSBjb250aW51ZTtcbiAgICAgICAgcm9ib3RQcm9taXNlcy5wdXNoKHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocm9ib3RQcm9taXNlcyk7XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgICAgaGVscGVycyxcbiAgICB9ID0gdHJlYXRtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGRlYnVnTW9kZSxcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZW5nYWdlbWVudExvY2ssXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNNb2JpbGUsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIHByZXBhcmVBbmRBcHBseSxcbiAgICB9ID0gdGhpcztcblxuICAgIC8vIG9uZSBlbmdhZ2VtZW50IGF0IGEgdGltZVxuICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGVuZ2FnZW1lbnRMb2NrW2lkXSB8fCBuZXcgTXV0ZXgoKTtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgZW5nYWdlbWVudExvY2tbaWRdLmFjcXVpcmUoKTtcbiAgICB0cnkge1xuICAgICAgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyAmJiAhZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwibW9iaWxlXCIgJiYgIWlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdtb2JpbGUnIG1pc21hdGNoXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZGV2aWNlID09PSBcImRlc2t0b3BcIiAmJiBpc01vYmlsZSkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnZGVza3RvcCcgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIGJhc2UgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZVNldCB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT24pIHtcbiAgICAgICAgICBhZGRUcmVhdG1lbnQoaWQsIG51bGwsIG51bGwsIFwic2tpcHBlZFwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJlYXRtZW50U2tpcFJhdGlvID0gd2VpZ2h0ID09PSAxMDAgPyAwIDogKDEwMCAtIHdlaWdodCB8fCBUUkVBVE1FTlRfUkFUSU8pO1xuICAgICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IHNraXAgcmF0aW86IFwiICsgdHJlYXRtZW50U2tpcFJhdGlvKTtcbiAgICAgICAgLy8gRGV0ZXJtaW5pbmcgaWRlbnRpZmllciBmb3IgY2FsY3VsYXRpbmcgdHJlYXRtZW50IHBlcmNlbnRhZ2UgKHRyZWF0bWVudFBjdClcbiAgICAgICAgY29uc3QgZGV0ZXJtaW5pbmdJZGVudGlmaWVyID0gZGVwZW5kYW50X29uX3RyZWF0bWVudCB8fCBpZDtcblxuICAgICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgdGhlIHBlcmNlbnRhZ2UgdmFsdWUgZm9yIHRoZSB0cmVhdG1lbnQgdXNlZCB0byBkZXRlcm1pbmUgaWYgaXQgc2hvdWxkIGJlIHNraXBwZWQgb3Igbm90XG4gICAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyAxMDAgd2hlbiBkZWJ1ZyBtb2RlIGlzIDEsIGVuc3VyaW5nIG5vIHRyZWF0bWVudHMgYXJlIHNraXBwZWRcbiAgICAgICAgY29uc3QgdHJlYXRtZW50UGN0ID0gZGVidWdNb2RlID09PSAxID8gMTAwIDogYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyBkZXRlcm1pbmluZ0lkZW50aWZpZXIpO1xuICAgICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50UGN0OiBcIiArIHRyZWF0bWVudFBjdCArIGAgd2l0aCBkZWJ1ZyBtb2RlICR7ZGVidWdNb2RlID8gXCJvblwiIDogXCJvZmZcIn1gKTtcbiAgICAgICAgbGV0IGJ1c2luZXNzUnVsZUlkID0gbnVsbDtcbiAgICAgICAgaWYgKGJ1c2luZXNzUnVsZVNldCkge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBzdWIgdmFyaWFudCBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgICAgICBidXNpbmVzc1J1bGVJZCA9IGF3YWl0IHRoaXMuY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCk7XG4gICAgICAgICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYnVzaW5lc3MgcnVsZSB0cmFuc2Zvcm1hdGlvbiB3aXRoIGlkOiBcIiwgYnVzaW5lc3NSdWxlSWQpO1xuICAgICAgICAgIH0gZWxzZSBsb2dnZXIubG9nKFwiQXBwbHlpbmcgdHJlYXRtZW50IHdpdGggZGVmYXVsdCB2YWx1ZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyZWF0bWVudFBjdCA8IHRyZWF0bWVudFNraXBSYXRpbykge1xuICAgICAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBza2lwcGVkIGR1ZSB0byB0cmVhdG1lbnQgc3BsaXQgcmF0aW9gKTtcbiAgICAgICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCBudWxsLCBcInNraXBwZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSdWxlIGNoZWNrIGZhaWxlZCBmb3IgdHJlYXRtZW50OlwiLCBpZCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICAgIHRoaXMuYWRkUmVhcHBseUV2ZW50KHRyZWF0bWVudCk7XG4gICAgICB0aGlzLmFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGhlbHBlcnMpICYmIGhlbHBlcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBoZWxwZXJSb2JvdFByb21pc2VzID0gW107XG4gICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiBtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgICBpZiAoIWhlbHBlcnMuaW5jbHVkZXModHJlYXRtZW50LmlkKSkgY29udGludWU7XG4gICAgICAgIGhlbHBlclJvYm90UHJvbWlzZXMucHVzaCh0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCkpO1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaGVscGVyUm9ib3RQcm9taXNlcyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSB7XG4gICAgY29uc3QgW3ByZXBhcmVkLCB2YXJpYW50XSA9IGF3YWl0IHByZXBhcmVBY3Rpb25zKGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwcGx5QWN0aW9ucyhwcmVwYXJlZCk7XG4gICAgaWYgKHJlcyA9PT0gdHJ1ZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH0gZWxzZSBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgfVxuICB9XG5cbiAgYWRkUmVhcHBseUV2ZW50KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtwYWdlVHlwZSwgcmVBcHBseVRyZWF0bWVudHNNYXB9ID0gdGhpcztcbiAgICBjb25zdCB7aWQsIHJlYXBwbHlfZXZlbnQsIHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlfSA9IHRyZWF0bWVudDtcbiAgICBpZiAocmVhcHBseV9ldmVudCkge1xuICAgICAgaWYgKCFyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSB8fCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSA9PT0gcGFnZVR5cGUpIHtcbiAgICAgICAgbGV0IHJlYXBwbHlfZXZlbnRfYXJyYXkgPSByZWFwcGx5X2V2ZW50O1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVhcHBseV9ldmVudCkpIHJlYXBwbHlfZXZlbnRfYXJyYXkgPSBbcmVhcHBseV9ldmVudF07XG4gICAgICAgIGxvZ2dlci5sb2coYFJlYXBwbHkgZXZlbnQgJyR7cmVhcHBseV9ldmVudH0nIGZvdW5kIGZvciB0cmVhdG1lbnQ6ICR7aWR9YCk7XG4gICAgICAgIGZvciAoY29uc3QgcmVhcHBseUV2ZW50IG9mIHJlYXBwbHlfZXZlbnRfYXJyYXkpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA/XG4gICAgICAgICAgICByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdIDogW107XG4gICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IGFscmVhZHkgYWRkZWQgZm9yIHJlYXBwbHkgZXZlbnRcIik7XG4gICAgICAgICAgfSBlbHNlIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gPSBbLi4ucHJldmlvdXNWYWx1ZSwgaWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKSB7XG4gICAgY29uc3Qge3JlQXBwbHlUcmVhdG1lbnRzTWFwLCBtYXRjaGVkVHJlYXRtZW50c30gPSB0aGlzO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJlQXBwbHlUcmVhdG1lbnRzTWFwKSkge1xuICAgICAgY29uc3QgdHJlYXRtZW50SWRzID0gcmVBcHBseVRyZWF0bWVudHNNYXBba2V5XTtcbiAgICAgIGNvbnN0IHJlQXBwbHlUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHMuZmlsdGVyKCh0KSA9PiB0cmVhdG1lbnRJZHMuaW5jbHVkZXModC5pZCkpO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcImluZmluaXRlX3Njcm9sbFwiOiB7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGluZmluaXRlX3Njcm9sbGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRpbWVvdXRcIjoge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHRpbWVvdXRgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRfY2hhbmdlXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseVNlbGVjdG9yTGlzdCA9IEFycmF5LmlzQXJyYXkodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IpID9cbiAgICAgICAgICAgICAgICB0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciA6IFt0cmVhdG1lbnQucmVhcHBseV9zZWxlY3Rvcl07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHJlYXBwbHlTZWxlY3Rvckxpc3QpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gZWxlbWVudF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9uX3Njcm9sbFwiOiB7XG4gICAgICAgICAgLy8gYWRkIHdpbmRvdyBzY3JvbGwgbGlzdGVuZXIsIGNhbGwgZW5nYWdlUm9ib3Qgb24gc2Nyb2xsLCBkbyBub3QgdHJpZ2dlciBtb3JlIHRoYW4gb25jZSBwZXIgMjUwbXNcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUaW1lID0gMDtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IHN0ID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGlmIChub3cgLSBsYXN0U2Nyb2xsVGltZSA+IDI1MCAmJiBNYXRoLmFicyhsYXN0U2Nyb2xsVG9wIC0gc3QpID4gNSkge1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUaW1lID0gbm93O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBvbl9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInF1ZXJ5X3NlYXJjaF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGxldCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCAhPT0gcXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBxdWVyeV9zZWFyY2hfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW50ZXJ2YWxcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseUludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBhcHBsaWVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGlmIChhcHBsaWVkPy5bdHJlYXRtZW50LmlkXSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW50ZXJ2YWxgKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICB9LCAyNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbmZvX2xheWVyX2NoYW5nZVwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgICAgICAgICAgYWRkRGF0YUxpc3RlbmVyKHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSZWFwcGx5IGV2ZW50IG5vdCBmb3VuZDogXCIsIGtleSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZVNldCA9IFtdLCBidXNpbmVzc1J1bGVTZXQgPSBbXSwgaWR9ID0gdHJlYXRtZW50O1xuICAgIGlmICh0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLmluY2x1ZGVzKGlkKSkgcmV0dXJuO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhbLi4uZWxpZ2liaWxpdHlSdWxlU2V0LCAuLi5idXNpbmVzc1J1bGVTZXRdKTtcbiAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBhZGREYXRhTGlzdGVuZXIoYF9fZVJ1bGVzLiR7c2VsZWN0b3J9YCwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgIH1cbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLnB1c2goaWQpO1xuICB9XG5cbiAgZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlU2V0LCBwcmV2aW91c1NlbGVjdG9ycyA9IG51bGwpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBwcmV2aW91c1NlbGVjdG9ycyB8fCBbXTtcbiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAocnVsZS5zdGFydHNXaXRoKFwiIVwiKSkgcnVsZSA9IHJ1bGUuc2xpY2UoMSk7XG4gICAgICAgIHNlbGVjdG9ycy5wdXNoKHJ1bGUuc3BsaXQoXCIuXCIpWzBdKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZS5zZXQsIHNlbGVjdG9ycyk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uKG5ldyBTZXQoc2VsZWN0b3JzKSldO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpIHtcbiAgICBsb2dnZXIubG9nKGBDaGVja2luZyBlbGlnaWJpbGl0eSAke2VsaWdpYmlsaXR5UnVsZX1gKTtcbiAgICBsZXQgb3Bwb3NpdGVGbGFnID0gZmFsc2U7XG4gICAgbGV0IFtlbGlnaWJpbGl0eVNjb3BlLCBlbGlnaWJpbGl0eU5hbWVdID0gZWxpZ2liaWxpdHlSdWxlLnNwbGl0KFwiLlwiKTtcbiAgICBpZiAoZWxpZ2liaWxpdHlTY29wZS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgb3Bwb3NpdGVGbGFnID0gdHJ1ZTtcbiAgICAgIGVsaWdpYmlsaXR5U2NvcGUgPSBlbGlnaWJpbGl0eVNjb3BlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2VsaWdpYmlsaXR5U2NvcGV9YCk7XG4gICAgaWYgKCFyZXMgfHwgIUFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvcHBvc2l0ZUZsYWcgJiYgcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW9wcG9zaXRlRmxhZyAmJiAhcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBsb2dnZXIubG9nKGAke2VsaWdpYmlsaXR5UnVsZX0gaXMgZWxpZ2libGVgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCwgZWxpZ2liaWxpdHlTZXRUeXBlID0gbnVsbCwgcHJldmlvdXNJc0VsaWdpYmxlID0gbnVsbCkge1xuICAgIGxvZ2dlci5sb2coXCJDaGVja2luZyByb2JvdCBlbGlnaWJpbGl0eVwiKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRWxpZ2liaWxpdHkgUnVsZSBTZXQgJHtlbGlnaWJpbGl0eVJ1bGVTZXR9IGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNFbGlnaWJsZSA9IHByZXZpb3VzSXNFbGlnaWJsZTtcbiAgICBmb3IgKGNvbnN0IGVsaWdpYmlsaXR5UnVsZSBvZiBlbGlnaWJpbGl0eVJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgJiYgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVW5rbm93biBlbGlnaWJpbGl0eVNldFR5cGU6IFwiLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZS5zZXQsIGVsaWdpYmlsaXR5UnVsZS50eXBlLCBpc0VsaWdpYmxlKTtcbiAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGluZGV4IG9mIGJ1c2luZXNzUnVsZSwgdGhpcyBpcyB0aGUgYnVzaW5lc3NSdWxlSWRcbiAgYXN5bmMgY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBidXNpbmVzc1J1bGVdIG9mIGJ1c2luZXNzUnVsZVNldC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KFtidXNpbmVzc1J1bGVdKSkgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRGF0YUxheWVyUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgd2l0aCBvcGVyYXRvclwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBzZWxlY3RvclwiLCBydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGwpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIHNlbGVjdG9yLCBzZWxlY3RvckFsbCwgc2VsZWN0b3JGYWxsYmFjayA9IG51bGx9ID0gcnVsZTtcbiAgbGV0IG1haW5TZWxlY3RvciA9IHNlbGVjdG9yO1xuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIG1haW5TZWxlY3RvciA9IHNlbGVjdG9yRmFsbGJhY2sgPyBzZWxlY3RvckZhbGxiYWNrIDogbWFpblNlbGVjdG9yO1xuICB9XG5cbiAgaWYgKG9wZXJhdG9yID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvciksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoc2VsZWN0b3JBbGwgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChtYWluU2VsZWN0b3IpIGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKTtcbiAgZWxzZSBpZiAoc2VsZWN0b3JBbGwpIGVsZW1lbnQgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidGV4dC1udW1iZXJcIjoge1xuICAgICAgbGV0IHRlbXBWYWw7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgICB0ZW1wVmFsID0gZWxlbWVudC5yZWR1Y2UoKHJldHVyblZhbCwgZWxlbSkgPT4ge1xuICAgICAgICAgIHJldHVyblZhbCArPSBwYXJzZUludChlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVmFsID0gcGFyc2VJbnQod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikudGV4dENvbnRlbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgfVxuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcGFyc2VJbnQodGVtcFZhbCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiY2xhc3NMaXN0XCI6XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImNvdW50XCI6IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihlbGVtZW50Lmxlbmd0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigwLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSBcInN0eWxlXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgY29uc3Qgc3R5bGVLZXkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50U3R5bGVzW3N0eWxlS2V5XTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCBzdHlsZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJPcGVyYXRvciBub3QgZGVmaW5lZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVGdW5jdGlvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0Z1bmN0aW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIGZ1bmN0aW9uIHJ1bGVcIik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgZnVuY3Rpb24gbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHJ1bGVGdW5jdGlvbiA9IEZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gcnVsZUZ1bmN0aW9uKCk7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVNlc3Npb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tTZXNzaW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkdXJhdGlvblwiOlxuICAgICAgcmV0dXJuIGR1cmF0aW9uSGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiaGlzdG9yeVwiOlxuICAgICAgcmV0dXJuIGhpc3RvcnlIYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZ2V0U2Vzc2lvblRpbWVzdGFtcCA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IERhdGUocGFyc2VJbnQod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9USU1FU1RBTVApKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IHNlc3Npb24gdGltZXN0YW1wXCIsIGVycik7XG4gICAgcmV0dXJuIERhdGUubm93KCk7XG4gIH1cbn07XG5cbmNvbnN0IGR1cmF0aW9uSGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gKERhdGUubm93KCkgLSBnZXRTZXNzaW9uVGltZXN0YW1wKCkpIC8gMTAwMDtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZHVyYXRpb24sIGNvbmRpdGlvbiwgcGFyc2VJbnQodmFsdWUpKTtcbn07XG5cbmNvbnN0IGhpc3RvcnlIYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgY3VycmVudEhpc3RvcnkgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX0hJU1RPUlkpPy5zcGxpdChcIixcIik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGN1cnJlbnRIaXN0b3J5LCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXJsQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrVXJsUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInBhdGhcIjoge1xuICAgICAgY29uc3QgcmVxdWVzdFVSTD0gd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmO1xuICAgICAgY29uc3QgcGF0aCA9IG5ldyBVUkwocmVxdWVzdFVSTCkucGF0aG5hbWU7XG4gICAgICBsb2dnZXIubG9nKGBDaGVja2luZyBwYXRoICR7cGF0aH0gbWF0Y2hlcyBydWxlIHBhdGggJHt2YWx1ZX1gKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHBhdGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWX0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRW52Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRW52UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3I6IFwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICBpZiAoIXNrdUxpc3QgfHwgKHR5cGVvZiBza3VMaXN0ID09PSBcIm9iamVjdFwiICYmICFPYmplY3Qua2V5cyhza3VMaXN0KS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG4gIGxldCBydW50aW1lVmFsdWUgPSBudWxsO1xuICBjb25zdCBza3UgPSBza3VMaXN0W09iamVjdC5rZXlzKHNrdUxpc3QpWzBdXT8uaWQ7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBUcmFuc2FjdGlvbkNvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUcmFuc2FjdGlvbkNvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIEFkZFRvQ2FydENvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRBZGRUb0NhcnRDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFByZXZpZXdDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbkNvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRQcmV2aWV3Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEZyb21EQiA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgZGIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICByZXR1cm4gYXdhaXQgZGIuZ2V0KHNrdSk7XG59O1xuIiwiaW1wb3J0IHtjaGVja0RhdGFMYXllclJ1bGV9IGZyb20gXCIuL2RhdGFMYXllckNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbGVtZW50UnVsZX0gZnJvbSBcIi4vZWxlbWVudENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tGdW5jdGlvblJ1bGV9IGZyb20gXCIuL2Z1bmN0aW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Nlc3Npb25SdWxlfSBmcm9tIFwiLi9zZXNzaW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1VybFJ1bGV9IGZyb20gXCIuL3VybENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbnZSdWxlfSBmcm9tIFwiLi9lbnZDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrUHJvZHVjdEluZm9SdWxlfSBmcm9tIFwiLi9wcm9kdWN0SW5mb0NoZWNrZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHthZGREYXRhTGlzdGVuZXIsIGFkZFRvQmVhZ2xlSW5mb0xheWVyLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcbmltcG9ydCB7ZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTLCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLm11dGV4ID0gbmV3IE11dGV4KCk7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZCA/IHJ1bGUubmFtZSB8fCB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICAgIGNvbnN0IGtleVByb21pc2VzTWFwID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5lbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAga2V5UHJvbWlzZXNNYXBba2V5XSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGtleVByb21pc2VzTWFwW2tleV0ucHVzaCh0aGlzLmNoZWNrUnVsZShydWxlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZVByb21pc2VzXSBvZiBPYmplY3QuZW50cmllcyhrZXlQcm9taXNlc01hcCkpIHtcbiAgICAgIGNvbnN0IHNhdGlzZmllZFJ1bGVJZHMgPSBhd2FpdCBQcm9taXNlLmFsbChydWxlUHJvbWlzZXMpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIHNhdGlzZmllZFJ1bGVJZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGZhbHNlKSk7XG4gICAgICB0aGlzLnNldFVwTGlzdGVuZXJzKGtleSwgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpIHtcbiAgICBpZiAoIWtleSB8fCAhcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCB0aGlzLm11dGV4LmFjcXVpcmUoKTtcbiAgICBsb2dnZXIubG9nKGBMb2NrIGFjcXVpcmVkIGZvciBrZXkgJHtrZXl9YCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBjb25zdCBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gKSB8fCBbXTtcbiAgICAgICAgaWYgKGlzRWxpZ2libGUpIHtcbiAgICAgICAgICBpZiAoY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjdXJyZW50LnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgY3VycmVudCk7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZW1vdmUgZnJvbSBlbGlnaWJsZSBydWxlc1xuICAgICAgICAgIGlmICghY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGN1cnJlbnQuZmlsdGVyKChrKSA9PiBrICE9PSBydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgY29uc3Qge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9ID0gdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMpO1xuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSByZXR1cm47XG4gICAgICAgIGxldCBub2RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uUmVjb3JkIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgIG5vZGVzID0gWy4uLm5vZGVzLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLnJlbW92ZWROb2RlcyldO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV4Y2x1ZGUgbXV0YXRpb25zIHRoYXQgb25seSB1cGRhdGUgdGV4dFxuICAgICAgICBpZiAobm9kZXMuZXZlcnkoKG4pID0+IG4udGFnTmFtZSA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VsZWN0b3IgPT09IFwiYm9keVwiKSB7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5ib2R5LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikucGFyZW50Tm9kZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcywgZGF0YUxheWVyUnVsZXMgPSB7fSwgZWxlbWVudFJ1bGVzID0ge30pIHtcbiAgICBpZiAoIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgIGNvbnN0IHt0eXBlfSA9IHJ1bGU7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICAgIGlmICghZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0pIHtcbiAgICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocnVsZS5zZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSA9IGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdLCBydWxlXSA6IFtydWxlXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnNlbGVjdG9yQWxsKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSA9IGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdLCBydWxlXSA6IFtydWxlXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50UnVsZXNbXCJib2R5XCJdID0gZWxlbWVudFJ1bGVzW1wiYm9keVwiXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW1wiYm9keVwiXSwgcnVsZV0gOiBbcnVsZV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocnVsZS5jaGFpbikge1xuICAgICAgICB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhbcnVsZS5jaGFpbl0sIGRhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEVsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUyk7XG4gICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlc09iaikge1xuICAgICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gSlNPTi5wYXJzZShlbGlnaWJpbGl0eVJ1bGVzT2JqKTtcbiAgICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXNPYmoudGltZXN0YW1wKSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSBlbGlnaWJpbGl0eVJ1bGVzT2JqLnRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgICAgIGlmIChlbGFwc2VkSG91cnMgPCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXNPYmoucnVsZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSBhd2FpdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlc09iaikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSB7cnVsZXM6IGVsaWdpYmlsaXR5UnVsZXNPYmosIHRpbWVzdGFtcDogRGF0ZS5ub3coKX07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTLCBKU09OLnN0cmluZ2lmeShlbGlnaWJpbGl0eVJ1bGVzT2JqKSk7XG4gICAgICByZXR1cm4gZWxpZ2liaWxpdHlSdWxlc09iai5ydWxlcztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IGVsaWdpYmlsaXR5IHJ1bGVzOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU9uQ29tcG9uZW50XCIpO1xuXG5jb25zdCBiZWFnbGVPbiA9IGFzeW5jIChpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlLCB0cmVhdG1lbnRXZWlnaHRzLCBpc09uKSA9PiB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWluaXRcIik7XG5cbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UgPSBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgY29uc3QgdHJlYXRtZW50c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudHMoKTtcblxuICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWNvbmZpZy1mZXRjaFwiKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBsZXQgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBudWxsO1xuICBpZiAoZGVidWdNb2RlICYmIHNlYXJjaFBhcmFtcy5pbmNsdWRlcyhcImZpbHRlcj1cIikpIHtcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IHNlYXJjaFBhcmFtcy5zbGljZShcbiAgICAgICAgc2VhcmNoUGFyYW1zLmluZGV4T2YoXCJbXCIpICsgMSxcbiAgICAgICAgc2VhcmNoUGFyYW1zLmxhc3RJbmRleE9mKFwiXVwiKSxcbiAgICApLnNwbGl0KFwiLFwiKS5tYXAoKGl0ZW0pID0+IHBhcnNlSW50KGl0ZW0sIDEwKSk7XG4gIH1cblxuICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50c1Byb21pc2U7XG5cbiAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcm9ib3Qtd2VpZ2h0c1wiKTtcbiAgfVxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7XG4gICAgdHJlYXRtZW50cyxcbiAgICB0cmVhdG1lbnRXZWlnaHRzLFxuICB9KTtcblxuICBjb25zdCBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoZGVidWdNb2RlKTtcbiAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8tdXNlci1zZWdtZW50XCIpO1xuICB9XG4gIGlmICghbWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcm9ib3QtbWF0Y2hlZFwiKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmb3VuZC1tYXRjaGVkLXJvYm90c1wiKTtcblxuICB0cnkge1xuICAgIGF3YWl0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1ydWxlcy1hc3Nlc3NlZFwiKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJydWxlcy1hc3Nlc3NlZFwiKTtcblxuICBpZiAoaXNPbiB8fCBkZWJ1Z01vZGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvZHVjdEluZm9EQiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gICAgICBhd2FpdCBwcm9kdWN0SW5mb0RCLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZHVjdC1pbmZvLW5vLXBlcnNpc3RcIik7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW5nYWdpbmctcm9ib3RzXCIpO1xuICBjb25zdCByb2JvdEVuZ2luZSA9IG5ldyBSb2JvdEVuZ2luZSh7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgZGVidWdNb2RlLFxuICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgIGlkZW50aWZpZXIsXG4gICAgcGFnZVR5cGUsXG4gICAgaXNPbixcbiAgfSk7XG4gIGF3YWl0IHJvYm90RW5naW5lLmVuZ2FnZVJvYm90cygpO1xuICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicm9ib3RzLWVuZ2FnZWRcIik7XG4gIGxvZ2dlci5zdWNjZXNzKFwiQXBwbGllZCB0cmVhdG1lbnRzOiBcIiwgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIikpO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGluZy1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IFJ1bGVFbmdpbmUuZ2V0RWxpZ2liaWxpdHlSdWxlcygpO1xuICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHJldHVybjtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgY29uc3QgcnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtlbGlnaWJpbGl0eVJ1bGVzfSk7XG4gIGF3YWl0IHJ1bGVFbmdpbmUuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImFzc2Vzc2VkLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgYmVhZ2xlT247XG4iLCJpbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJTZWdtZW50YXRpb25Db21wdXRlclwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpIHtcbiAgbG9nZ2VyLmxvZyhcIkRldGVybWluaW5nIHVzZXIgc2VnbWVudFwiKTtcbiAgdHJ5IHtcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgT2JqZWN0LmtleXModHJlYXRtZW50V2VpZ2h0cykpIHtcbiAgICAgIGNvbnN0IHJ1bGVTZXQgPSB0cmVhdG1lbnRXZWlnaHRzW3NlZ21lbnRdPy5ydWxlU2V0O1xuICAgICAgaWYgKCFydWxlU2V0KSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHNlZ21lbnRSdWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2Jhc2VSdWxlU2V0OiBydWxlU2V0LCBidXNpbmVzc1J1bGVTZXQ6IFtdfSk7XG4gICAgICBpZiAoYXdhaXQgc2VnbWVudFJ1bGVFbmdpbmUuY2hlY2tSdWxlcygpKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYFVzZXIgc2VnbWVudCBtYXRjaGVkOiAke3NlZ21lbnR9YCk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic1wiLCBzZWdtZW50KTtcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5sb2coXCJVc2VyIHNlZ21lbnQgbm90IG1hdGNoZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY29tcHV0ZSB1c2VyIHNlZ21lbnRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IE1vbml0b3IgZnJvbSBcIi4uL0JlYWdsZU1vbml0b3IvaW5kZXhcIjtcbmltcG9ydCBiZWFnbGVPbiBmcm9tIFwiLi4vQmVhZ2xlT25cIjtcbmltcG9ydCB7XG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBTUExJVF9SQVRJTyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04sXG4gIFZFUlNJT04sXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIHNldFVSTERhdGEsXG4gIHNldEFnZW50RGV0YWlscyxcbiAgZ2V0SWRlbnRpZmllcixcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxuICBkZXRlcm1pbmVQY3QsXG4gIGdldERlYnVnTW9kZSxcbiAgc3dpdGNoVG9FYXNlT3V0LFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Y29tcHV0ZVNlZ21lbnR9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXIvc2VnbWVudC1jb21wdXRlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIjtcblxubGV0IFNIVVRET1dOID0gZmFsc2U7XG5cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgc3dpdGNoVG9FYXNlT3V0KCk7XG4gIGxldCBtb25pdG9yID0gbnVsbDtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBpbml0aWFsaXppbmdcIik7XG4gIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG4gIGxldCBlYXJseUxvZ1NlbnQgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBDUklUSUNBTCBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBzZXRVUkxEYXRhKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIsIERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidlwiLCBWRVJTSU9OKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNyXCIsIFNQTElUX1JBVElPKTtcblxuICAgIG1vbml0b3IgPSBuZXcgTW9uaXRvcigpO1xuICAgIC8vIGRhdGEtbGVzcyBsb2cgdG8gZGV0ZWN0IGJvdW5jZXNcbiAgICBhd2FpdCBtb25pdG9yLnBhY2tBbmRRdWV1ZUFycml2YWxMb2coKTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBU1lOQyBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyKCk7XG4gICAgY29uc3QgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudFdlaWdodHMoKTtcblxuICAgIC8vIFNMQTogMiBzZWNvbmRzIHRvIGZsaWNrZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIH0sIDIwMDApO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFRJTUUtT1VUIFNFU1NJT04gQlJFQUtFUiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICBsZXQgb29zQnJlYWsgPSBmYWxzZTtcbiAgICBjb25zdCBvb3NSZWFzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSk7XG4gICAgY29uc3QgaXNMYWJlbFNlbnQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQpO1xuICAgIGNvbnN0IHRpbWVvdXRDb3VudGVyID0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5UKSkgfHwgMDtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuXG4gICAgLy8gaWYgdGltZWQtb3V0IHRvbyBtYW55IHRpbWVzIGZvciB2ZXJ5IGZpcnN0IGludGVyYWN0c2lvbnMsIG1ha2Ugb3V0IG9mIHNjb3BlIGZvciB0aGUgc2Vzc2lvblxuICAgIGlmICghZGVidWdNb2RlICYmICFvb3NSZWFzb24gJiYgIWlzTGFiZWxTZW50ICYmIHRpbWVvdXRDb3VudGVyID4gTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04pIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm1heC10aW1lb3V0XCIpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWSBQUlVORSBPVVQtT0YtU0NPUEUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyB0ZXN0IGNvb2tpZSwgYmVhY29uLCBhbmQgc3RyaW5nIHV0aWxzIHN1cHBvcnRcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5tYXRjaCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJ1bnN1cHBvcnRlZFwiKVxuICAgICkge1xuICAgICAgb29zQnJlYWsgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHVzZXJBZ2VudCBjYW4gYmUgcHJvcGVybHkgcGFyc2VkXG4gICAgaWYgKCFvb3NCcmVhaykge1xuICAgICAgY29uc3Qgc3RhdHVzID0gc2V0QWdlbnREZXRhaWxzKCk7XG4gICAgICAvLyBpZiBhZ2VudCBjYW5ub3QgYmUgcGFyc2VkLCBkbyBlYXJseSBicmVha1xuICAgICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgb29zQnJlYWsgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF0dGVtcHQgdG8gY29tcHV0ZSB1c2VyIHNlZ21lbnRcbiAgICBsZXQgdXNlclNlZ21lbnQgPSBudWxsO1xuICAgIGxldCB0cmVhdG1lbnRXZWlnaHRzID0gbnVsbDtcbiAgICBpZiAoIW9vc0JyZWFrKSB7XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2U7XG4gICAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5ULCB0aW1lb3V0Q291bnRlciArIDEpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJvYm90LXdlaWdodHNcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb21wdXRlIHVzZXIgc2VnbWVudCBhbmQgYWRkIHRvIGJlYWdsZUluZm9MYXllclxuICAgICAgICB1c2VyU2VnbWVudCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVzZXJTZWdtZW50KSB7XG4gICAgICAgIG9vc0JyZWFrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBjYW5ub3QgZ2V0IGNyaXRpY2FsIGluZm8sIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCB1bnN1cHBvcnRlZFxuICAgIGlmIChvb3NCcmVhaykge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IGRldmljZVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkLWRldmljZVwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBRE1JTiBVU0VSIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cblxuICAgIC8vIGlmIGFkbWluIHVzZXIsIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCBtYXJrIGFzIGVtcGxveWVlXG4gICAgY29uc3QgcHJvY2Vzc0FkbWluVXNlciA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IGFkbWluXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWRtaW4tZW1wbG95ZWVcIik7XG4gICAgfTtcblxuICAgIGxldCBpc0FkbWluID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTik7XG4gICAgLy8gaWYgbm90IGZvdW5kIGluIGxvY2FsU3RvcmFnZSwgY2hlY2sgYmVhZ2xlSW5mb0xheWVyIHdpdGggYmxvY2tpbmcgbWRvZVxuICAgIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNBZG1pbiA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgICAgLy8gcGVybWFuZW50IGxhYmVsIGNhbiBiZSBmYWxzZSwgYnV0IGFkbWluIHVzZXIgY2FuIHN0aWxsIGxvZ2luIGFuZCB0dXJuIHRydWUsIGxhemlseSBmaXggdGhpc1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gXCJmYWxzZVwiIHx8IGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gICAgICAvLyBhc3luYyBjYWxsIHRvIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIHRoZW4gc2V0IGxvY2FsU3RvcmFnZVxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSkudGhlbigoaXNBZG1pbikgPT4ge1xuICAgICAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWFkbWluLXN0YXR1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1lYXNlXCIpKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnRpLWZsaWNrZXItdGltZW91dFwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IE9OL09GRiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gaXNPbiBjYW4gYmUgdHJ1ZSAoT04pLCBmYWxzZSAoT0ZGKVxuICAgIGxldCBpc09uID0gbnVsbDtcblxuICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcImVtcGxveWVlXCIpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbikge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB1bmtub3duXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBvdXQgb2Ygc2NvcGUgcmVhc29uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBncmVhdGVyIHRoYW4gU1BMSVRfUkFUSU8sIHRoZW4gaW4gT04gbW9kZVxuICAgICAgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTykge1xuICAgICAgICBpc09uID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidHJ1ZVwifSk7XG4gICAgICB9IGVsc2UgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTyAvIDIpIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTJcIn0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTFcIn0pO1xuICAgICAgfVxuXG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzT25cIiwgaXNPbik7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQsIHRydWUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGlzT24udG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEVBUkxZLVBST0NFU1MgQ09OVkVSU0lPTiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGF3YWl0IGNyaXRpY2FsIGluZm8gYmVmb3JlIHNlbmRpbmcgbG9ncyBmb3IgcHJvcGVyIGFuYWx5dGljcyBtZWFzdXJlbWVudHNcbiAgICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgICBpZiAocGFnZVR5cGUgPT09IFwicHVyY2hhc2VcIikge1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnJldmVudWVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIC8vIHNlbmQgbG9ncyBpbW1lZGlhdGVseSBvbiBwdXJjaGFzZSBwYWdlLCBhbmQgZm9yY2Ugd2FpdFxuICAgICAgYXdhaXQgbW9uaXRvci5zZW5kTG9ncyh0cnVlKTtcbiAgICAgIC8vIGlmIHB1cmNoYXNlIGlzIGNvbXBsZXRlLCBkbyBub3QgYXBwbHkgYW55IHRyZWF0bWVudHMgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICBTSFVURE9XTiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNlbmQgbG9ncyB3aGVuIHJlYWR5LCBzdGFydCBzY3JhcGluZyBhbmQgc2VuZGluZyBhc3luY2x5XG4gICAgICBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICB9XG4gICAgZWFybHlMb2dTZW50ID0gdHJ1ZTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBST0JPVCBQQVRIcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW50ZXJpbmctcm9ib3QtcGF0aFwiKTtcblxuICAgIGlmIChpc09uID09PSBudWxsIHx8IGlzT24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8taXNPblwiKTtcbiAgICB9IGVsc2UgaWYgKFNIVVRET1dOKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaHV0ZG93bi1wYXRoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlLCB0cmVhdG1lbnRXZWlnaHRzLCBpc09uKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiRW50cnlwb2ludCBjYXRjaDogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJWRVJTSU9OIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIlRSRUFUTUVOVF9SQVRJTyIsIkxPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTIiwiTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04iLCJMSVNUX01PREVfQkVBR0xFX0tFWVMiLCJJRExFX1RJTUVPVVQiLCJTRVNTSU9OX1NUT1JBR0VfS0VZUyIsIlNFU1NJT05fVElNRVNUQU1QIiwiU0VTU0lPTl9ISVNUT1JZIiwiUE9QVVBfRElTUExBWV9GTEFHIiwiU0tVX0lORk9fQkFTS0VUIiwiVElNRU9VVF9DT1VOVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJNQVRDSEVEX1RSRUFUTUVOVFMiLCJJU19MQUJFTF9TRU5UIiwiTE9DQUxfU1RPUkFHRV9LRVlTIiwiVFJFQVRNRU5UUyIsIldFSUdIVFMiLCJFTElHSUJJTElUWV9SVUxFUyIsIkRFQlVHX01PREUiLCJPVVRfT0ZfU0NPUEUiLCJVU0VSX0lEIiwiREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRSIsIklTX0FETUlOIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwidGVzdGluZyIsIkRFQlVHIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFyZ3MiLCJjb25zb2xlIiwiaW5mbyIsImxvZyIsIm1lc3NhZ2VDb25maWciLCJmb3JFYWNoIiwiYXJndW1lbnQiLCJ0eXBlIiwid2FybiIsImVycm9yIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJsb2dnZXIiLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJ0b3AiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInN3aXRjaFRvRWFzZU91dCIsImNvbnRhaW5zIiwiZWwiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJwcmVwZW5kIiwiYWRkIiwiZmV0Y2hUcmVhdG1lbnRzIiwiZmV0Y2hQbHVzIiwidHJlYXRtZW50cyIsIkVycm9yIiwianNvbiIsImpzb25UcmVhdG1lbnQiLCJmYWlsZWQiLCJtZXNzYWdlIiwiZmV0Y2hUcmVhdG1lbnRXZWlnaHRzIiwidHJlYXRtZW50V2VpZ2h0cyIsImpzb25UcmVhdG1lbnRXZWlnaHRzIiwiZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzIiwiZWxpZ2liaWxpdHlSdWxlcyIsImpzb25FbGlnaWJpbGl0eVJ1bGVzIiwiZmV0Y2hQcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm9Kc29uIiwidGltZW91dCIsInRpbWUiLCJjb250cm9sbGVyIiwiQWJvcnRDb250cm9sbGVyIiwidGltZW91dElEIiwic2V0VGltZW91dCIsImFib3J0IiwidXJsIiwib3B0aW9ucyIsInJldHJpZXMiLCJmZXRjaCIsInNpZ25hbCIsInRoZW4iLCJyZXMiLCJvayIsImNsZWFyVGltZW91dCIsInN0YXR1cyIsImNhdGNoIiwiZXh0cmFjdENvb2tpZUlkZW50aWZpZXIiLCJjb29raWVTdHJpbmciLCJjb29raWVOYW1lIiwicGFyc2VkIiwic3BsaXQiLCJtYXAiLCJ2IiwicmVkdWNlIiwiYWNjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidHJpbSIsImlkZW50aWZpZXIiLCJpZGVudGlmaWVySW5kZXgiLCJkZXRlcm1pbmVQY3QiLCJub3ciLCJtb250aCIsImdldE1vbnRoIiwiaGFzaCIsImdldFVuc2VjdXJlSGFzaCIsInRvU3RyaW5nIiwicGN0IiwiZXhpdFNjcm9sbExpc3RlbmVyIiwiY2FsbEJhY2siLCJsb29wIiwic2Nyb2xsVG9wIiwibGFzdFNjcm9sbFRvcCIsImNsZWFySW50ZXJ2YWwiLCJleGl0U2Nyb2xsSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInN0eWxlQXBwbGljYXRvciIsImVsZW1lbnRzIiwic3R5bGVDaGFuZ2VzTWFwIiwiaSIsImVsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsdWUiLCJzdHlsZSIsImluamVjdFN0eWxlU2hlZXQiLCJzdHlsZVNoZWV0IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYnVzaW5lc3NSdWxlSWQiLCJkZWJ1Z01vZGUiLCJhY3Rpb25zIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidmFyaWFudCIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsImlkIiwia2V5cyIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJNYXRoIiwiZmxvb3IiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uU3RvcmFnZSIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsInNldEl0ZW0iLCJwYXRobmFtZSIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJjdXJyZW50IiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsImFicyIsImdldFJhbmRvbUludCIsInJhbmRvbSIsImdldFVuaXhUaW1lIiwiZ2V0SWRlbnRpZmllciIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImUiLCJkZWxheSIsIm1zIiwiZm9ybWF0RGVsaXZlcnlEYXRlIiwiZGF0ZSIsInJlc3VsdCIsInN0YXJ0TW9udGhJbmRleCIsImVuZE1vbnRoSW5kZXgiLCJzdGFydERheSIsImVuZERheSIsIm1hdGNoIiwidG9kYXkiLCJzdGFydFllYXIiLCJnZXRGdWxsWWVhciIsImVuZFllYXIiLCJlc3RpbWF0ZWRTdGFydCIsImVzdGltYXRlZEVuZCIsInN0YXJ0RGlmZk92ZXJEYXlzIiwiY2VpbCIsImVuZERpZmZPdmVyRGF5cyIsInN0YXJ0RGlmZk92ZXJXZWVrcyIsImVuZERpZmZPdmVyV2Vla3MiLCJlcnIiLCJpZGxlVGltZXIiLCJ0aW1lT3V0IiwicmVzZXRUaW1lciIsImlkbGVUaW1lb3V0Iiwib250b3VjaHN0YXJ0IiwiaXNPd25NdXRhdGlvbiIsIm11dGF0aW9uTGlzdCIsIm5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsInNvbWUiLCJuIiwidGFnTmFtZSIsImMiLCJzZXRBZ2VudERldGFpbHMiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImJyIiwiYk5hbWUiLCJiVmVyc2lvbiIsIm9zIiwiV2luZG93cyIsIk1hYyIsIkxpbnV4IiwiQW5kcm9pZCIsImlPUyIsIm9zVmVyc2lvbiIsIm9zTmFtZSIsImlzTW9iaWxlIiwiaXNTdXBwb3J0ZWRCcm93c2VyIiwiaXNTdXBwb3J0ZWRPUyIsInNldFVSTERhdGEiLCJjdXJyZW50VVJMIiwiVVJMIiwiaG9zdG5hbWUiLCJwYWdlVHlwZSIsImlkYlJlYWR5IiwiaXNTYWZhcmkiLCJ1c2VyQWdlbnREYXRhIiwiaW5kZXhlZERCIiwiZGF0YWJhc2VzIiwiaW50ZXJ2YWxJZCIsInRyeUlkYiIsImZpbmFsbHkiLCJMU19QcmVmaXgiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJmZWF0dXJlS2V5Iiwib3BLZXkiLCJzdG9yYWdlIiwicGFyc2VGbG9hdCIsInZhbEhhc2giLCJvcEtleVZhbCIsIm9wS2V5VmFsTmFtZSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJxdWVyeU1ldGhvZCIsImxvY2FsS2V5cyIsImxvY2FsS2V5c0ZpbHRlcmVkIiwiZmlsdGVyIiwic3VtIiwibWF4Q291bnQiLCJtYXhWYWwiLCJ2YWwiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZiIsIl9faHdtIiwic2VhcmNoUGF0aHMiLCJQYWdlVHlwZURlcGVuZCIsIm1ldGhvZCIsInNlbGVjdG9yIiwibmFtZSIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsIm9iaiIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJwdXNoIiwibGlzdGVuZXJzIiwiaXNBcnJheSIsImdldEZyb21CZWFnbGVJbmZvTGF5ZXIiLCJibG9ja2luZyIsInBvbGxJbnRlcnZhbCIsIm9idGFpbkRhdGEiLCJqc29uR2V0Iiwic2VhcmNoRWxlbWVudCIsImlzRm91bmQiLCJpc0lnbm9yZSIsImludGVydmFsIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwicXVlcnlTZWxlY3RvciIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwidHJpZ2dlclJlc3RhcnQiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImlubmVyVGV4dCIsImF0dHJpYlZhbHVlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZWNoaWxkIiwiYXR0cmliVmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRWYWx1ZSIsInN1bVByaWNlIiwiY2hpbGRUZXh0IiwiYXJyYXlJbm5lclRleHQiLCJleGNsdXNpdmVFbGVtZW50IiwiY3VzdG9tRGF0YURlcml2YXRpb25zIiwiY3VycmVudFBhZ2VUeXBlIiwiYWxsIiwiaXNDYXJ0RW1wdHkiLCJ0b3RhbEJhc2VQcmljZSIsImNvdXBvbk5vdEFwcGxpY2FibGUiLCJwcmljZXMiLCJxdWFudGl0aWVzIiwidG90YWxQcmljZSIsImNvdXBvbkFwcGxpY2FibGVBbW91bnQiLCJza3UiLCJza3VMaXN0IiwicGFyc2VTZWFyY2hQYXRocyIsImRvbVN0YXR1cyIsInJlYWR5U3RhdGUiLCJ3aW50b3AiLCJkYXRhTGF5ZXIiLCJ3aW5kb2MiLCJmb3VuZE5hbWVzIiwiU2V0IiwicHJldkZvdW5kTmFtZXMiLCJub3RGb3VuZE5hbWVzIiwiaGFzIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJzaXplIiwiam9pbiIsInBhdGgiLCJwYXRoQXJyYXkiLCJzdWJQYXRoIiwic2xpY2UiLCJzdWJBcnJheSIsInN1YktleSIsInN1YlZhbHVlIiwid2luZG93UHRyIiwibmF2UHRyIiwicGxhdGZvcm0iLCJkZXZpY2VQaXhlbFJhdGlvIiwiYXZhaWxXaW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJ3aW5kb3dEZXB0aCIsImNvbG9yRGVwdGgiLCJwaXhlbERlcHRoIiwidnBvcnRTaGFwZSIsInZpc3VhbFZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJyb3VuZCIsIm9yaWVudGF0aW9uQW5nbGUiLCJvcmllbnRhdGlvbiIsImFuZ2xlIiwidGVtcCIsImhpc3RvcnkiLCJuYXZBZ2VudCIsImJyYW5kcyIsImJyYW5kIiwidmVyc2lvbiIsIm1vYmlsZSIsImhhcmR3YXJlQ29uY3VycmVuY3kiLCJsYW5ndWFnZSIsImJyb3dzZXJMYW5ndWFnZSIsInN5c3RlbUxhbmd1YWdlIiwidXNlckxhbmd1YWdlIiwibWF4VG91Y2hQb2ludHMiLCJ2ZW5kb3IiLCJjb25uZWN0aW9uIiwiZG93bmxpbmsiLCJkb05vdFRyYWNrIiwibXNEb05vdFRyYWNrIiwicmVmZXJyZXIiLCJmaXJzdFNlc3Npb25SZWZlcnJlciIsInBlcmZNZXRyaWNzIiwicGVyZk5hdmlnYXRpb25NZXRyaWNzIiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlUeXBlIiwiY29ubmVjdCIsImNvbm5lY3RFbmQiLCJjb25uZWN0U3RhcnQiLCJyZXF1ZXN0IiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJkb20iLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwibG9hZCIsImxvYWRFdmVudEVuZCIsImxvYWRFdmVudFN0YXJ0IiwiZHVyYXRpb24iLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwianNvbmNvbnRlbnQiLCJIRUFERVJTIiwiTW9uaXRvciIsImhhc0Fycml2YWxMb2dTZW50IiwiaGFzTWFpbkxvZ1NlbnQiLCJoYXNVcGRhdGVzU2VudCIsImhpZ2hXYXRlck1hcmsiLCJpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzIiwiaW1tZWRpYXRlIiwicGFja0FuZFF1ZXVlTWFpbkxvZyIsInBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nIiwicGFja2FnZU1haW5Mb2dEYXRhIiwicmVxdWVzdEJsb2IiLCJjaGVja0ZvckxhdGVzdENoYW5nZXMiLCJxdWV1ZUxvZ3MiLCJoYXNDaGFuZ2VkIiwicGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSIsImxvZ0RhdGEiLCJwYWNrYWdlQXJyaXZhbExvZ0RhdGEiLCJod20iLCJjb29raWVHYUlkIiwidmlld19lcG9jaCIsImJvZHkiLCJsYyIsInUiLCJvbkhhc2hQY3QiLCJCbG9iIiwic3RhcnRzV2l0aCIsInMiLCJtIiwidmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xvc2VFdmVudCIsImNhcHR1cmUiLCJ2aXNpYmlsaXR5U3RhdGUiLCJzZW5kQmVhY29uIiwicXVldWVkIiwicXVldWVJbnRlcnZhbCIsIlRyZWF0bWVudFJlcG9zaXRvcnkiLCJDUFQiLCJtYXRjaGVkVHJlYXRtZW50cyIsIm10IiwiY2hlY2tQYWdlVHlwZSIsInBhZ2VUeXBlcyIsInVzZXJTZWdtZW50IiwidXNlclNlZ21lbnRXZWlnaHRzIiwidHJlYXRtZW50Iiwic2VnbWVudGVkV2VpZ2h0IiwiZ2V0TWF0Y2hlZFRyZWF0bWVudHMiLCJwdCIsInN1YnN0ciIsInRyZWF0bWVudHNPYmoiLCJ0aW1lc3RhbXAiLCJ0cmVhdG1lbnRXaXRoVGltZXN0YW1wIiwiZWxhcHNlZEhvdXJzIiwid2VpZ2h0c09iaiIsIndlaWdodHMiLCJyZXBsYWNlciIsInJlcGxhY2VGbiIsImN1cnJlbnRSZXBsYWNlRm4iLCJyZXBsYWNlT2JqZWN0RXh0cmFjdG9yIiwicmVwbGFjZVZhbCIsInJlcGxhY2VGbkV4ZWN1dG9yIiwickZuIiwic2luZ2xlIiwicmVwbGFjZUZ1bmN0aW9uIiwiRnVuY3Rpb24iLCJrZXlGYWxsYmFjayIsImNvbmZpZyIsImRiTmFtZSIsInN0b3JlIiwiaW5kZXhlcyIsImZpZWxkcyIsImtleVBhdGgiLCJvcGVuREIiLCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IiwiaW5pdCIsInVwZ3JhZGUiLCJkYiIsIm9sZFZlcnNpb24iLCJkZWxldGVPYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiaWR4IiwiY3JlYXRlSW5kZXgiLCJyZWplY3QiLCJyZWFkd3JpdGUiLCJnZXREQiIsInRyYW5zYWN0aW9uIiwicGF5bG9hZCIsImdldFN0b3JlIiwic2F2ZVByb21pc2VzIiwicHV0IiwiY2xlYXIiLCJjb3VudCIsIm9wZW5DdXJzb3IiLCJjdXJzb3IiLCJleGlzdGluZ1Byb2RJbmZvIiwiZ2V0Q3Vyc29yIiwiZWxhcHNlZFNlY29uZHMiLCJwcm9kdWN0SW5mb1Byb21pc2UiLCJjbGVhclByb21pc2UiLCJwcm9kdWN0SW5mb0FycmF5Iiwic2F2ZSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImVsaWdpYmxlRWxlbWVudHMiLCJhdHRyaWJ1dGUiLCJpbm5lcl9jb25kaXRpb24iLCJvcGVyYXRvciIsImNoYWluIiwiY29uZGl0aW9uRWxlbWVudHMiLCJhY3Rpb25Db25kaXRpb25DaGVja2VyIiwiJCIsImVsZW1lbnRTa3UiLCJmbiIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwiYXBwbHlFdmVudCIsImNvbnRlbnRTZWxlY3RvciIsInNlbGVjdG9yRmFsbGJhY2siLCJtZENvbmRpdGlvbiIsIm1vdmVfc2VsZWN0b3JfMSIsIm1vdmVfc2VsZWN0b3JfMiIsInBUeXBlIiwicHJvZHVjdEluZm9TdG9yYWdlIiwibWMiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImJlZm9yZSIsImFmdGVyIiwiYXBwZW5kIiwib2ZmIiwiY3JlYXRlUG9wdXAiLCJlbG0iLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJkaXNwbGF5TW9kYWwiLCJnZXRQcm9kdWN0SW5mbyIsImV2ZW50IiwiZGlzcGxheVBvcHVwIiwiciIsImQiLCJwdXNoU3RhdGUiLCJzdGF0ZSIsIm9uY2UiLCJ0ZXh0IiwiaHRtbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlIiwibjEiLCJuMiIsInN3YXBOb2RlcyIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwic2VudGVuY2UiLCJ3b3JkIiwiY2hhckF0IiwidG9Mb2NhbGVVcHBlckNhc2UiLCJwcmVwYXJlRmluYWxUaXRsZSIsImZpbmFsVGl0bGUiLCJjb250ZW50cyIsIm5vZGVUeXBlIiwibm9kZVZhbHVlIiwicHJlcGFyZURlc2NFbG0iLCJkZXNjcmlwdGlvbkVsbSIsIm1hcmtldGluZ0NvcHkiLCJ1cGRhdGVkSHRtbFN0cmluZyIsInJlcGxhY2VXaXRoVmFsIiwidGl0bGVBdWdtZW50IiwiaHRtbFN0ciIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJoaWRlIiwicVBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJzcmMiLCJ0ZW1wbGF0ZSIsImlubmVySFRNTCIsInBvcHVwIiwiY29udGVudCIsImZpcnN0Q2hpbGQiLCJwMSIsInBhcmVudE5vZGUiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJNdXRleCIsIk9CU0VSVkVSX0NPTkZJRyIsImF0dHJpYnV0ZXMiLCJSb2JvdEVuZ2luZSIsImRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzIiwiaXNPbiIsImVuZ2FnZW1lbnRMb2NrIiwicmVBcHBseVRyZWF0bWVudHNNYXAiLCJhZGRlZERhdGFMaXN0ZW5lcklkcyIsInJvYm90UHJvbWlzZXMiLCJlbmdhZ2VSb2JvdCIsImluaXRpYXRlUmVhcHBseVJvYm90TWFwIiwiZWxpZ2liaWxpdHlSdWxlU2V0IiwiZGV2aWNlIiwiYnVzaW5lc3NSdWxlU2V0IiwiaGVscGVycyIsInByZXBhcmVBbmRBcHBseSIsImFjcXVpcmUiLCJyZWxlYXNlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJlbmdhZ2VIZWxwZXJzIiwiYWRkUmVhcHBseUV2ZW50IiwiYWRkUnVsZVNldERhdGFMaXN0ZW5lcnMiLCJoZWxwZXJSb2JvdFByb21pc2VzIiwicHJlcGFyZWQiLCJyZWFwcGx5X2V2ZW50IiwicmVhcHBseV9ldmVudF9wYWdlX3R5cGUiLCJyZWFwcGx5X2V2ZW50X2FycmF5IiwicmVhcHBseUV2ZW50IiwicHJldmlvdXNWYWx1ZSIsInRyZWF0bWVudElkcyIsInJlQXBwbHlUcmVhdG1lbnRzIiwidCIsIlJlc2l6ZU9ic2VydmVyIiwicmVhcHBseVNlbGVjdG9yTGlzdCIsInJlYXBwbHlfc2VsZWN0b3IiLCJsYXN0U2Nyb2xsVGltZSIsImdldFRpbWUiLCJzdCIsInBhZ2VZT2Zmc2V0IiwicmVhcHBseUludGVydmFsIiwiYXBwbGllZCIsImJvdW5kRW5nYWdlVHJlYXRtZW50IiwiYmluZCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJydWxlU2V0IiwicHJldmlvdXNTZWxlY3RvcnMiLCJydWxlIiwic2V0IiwiZWxpZ2liaWxpdHlSdWxlIiwib3Bwb3NpdGVGbGFnIiwiZWxpZ2liaWxpdHlTY29wZSIsImVsaWdpYmlsaXR5TmFtZSIsImVsaWdpYmlsaXR5U2V0VHlwZSIsInByZXZpb3VzSXNFbGlnaWJsZSIsImlzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiY2hlY2tEYXRhTGF5ZXJSdWxlIiwiZGF0YUxheWVyRmluZGVyIiwicnVudGltZVZhbHVlIiwiY2hlY2tFbGVtZW50UnVsZSIsInNlbGVjdG9yQWxsIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiY2hlY2tTZXNzaW9uUnVsZSIsImR1cmF0aW9uSGFuZGxlciIsImhpc3RvcnlIYW5kbGVyIiwiZ2V0U2Vzc2lvblRpbWVzdGFtcCIsImN1cnJlbnRIaXN0b3J5IiwiY2hlY2tVcmxSdWxlIiwicmVxdWVzdFVSTCIsImNoZWNrRW52UnVsZSIsImNoZWNrUHJvZHVjdEluZm9SdWxlIiwiZ2V0VHJhbnNhY3Rpb25Db3VudCIsImdldEFkZFRvQ2FydENvdW50IiwiZ2V0UHJldmlld0NvdW50IiwiZ2V0RnJvbURCIiwiUnVsZUVuZ2luZSIsImJhc2VSdWxlU2V0IiwiYWRkZWREYXRhTGlzdGVuZXJzIiwibXV0ZXgiLCJjaGVja1J1bGUiLCJydWxlU2F0aXNmaWVkIiwiY2hhaW5fY29uZGl0aW9uIiwia2V5UHJvbWlzZXNNYXAiLCJydWxlcyIsInJ1bGVQcm9taXNlcyIsInNhdGlzZmllZFJ1bGVJZHMiLCJzZXRVcExpc3RlbmVycyIsImZpbHRlcmVkIiwiayIsImV4dHJhY3RSdWxlQXR0cmlidXRlcyIsImRhdGFMYXllclJ1bGVzIiwiZWxlbWVudFJ1bGVzIiwiYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsImFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImVsaWdpYmlsaXR5UnVsZXNPYmoiLCJiZWFnbGVPbiIsImVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwic2VhcmNoUGFyYW1zIiwibGFzdEluZGV4T2YiLCJpdGVtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsInByb2R1Y3RJbmZvREIiLCJwZXJzaXN0UHJvZHVjdEluZm8iLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsImdldEVsaWdpYmlsaXR5UnVsZXMiLCJydWxlRW5naW5lIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJjaGVja1J1bGVzIiwiU0hVVERPV04iLCJtb25pdG9yIiwiZWFybHlMb2dTZW50IiwiY29va2llUGN0IiwicGFja0FuZFF1ZXVlQXJyaXZhbExvZyIsInRyZWF0bWVudFdlaWdodHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50V2VpZ2h0cyIsIm9vc0JyZWFrIiwiaXNMYWJlbFNlbnQiLCJ0aW1lb3V0Q291bnRlciIsIkdMT1ZfT04iLCJTdHJpbmciLCJwcm90b3R5cGUiLCJwYWRTdGFydCIsInByb2Nlc3NBZG1pblVzZXIiLCJpc0FkbWluIiwic2VuZExvZ3MiXSwic291cmNlUm9vdCI6IiJ9