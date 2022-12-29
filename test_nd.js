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

var isStaging = true;
var VERSION = "0.0.40.8";
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
                var sku, productInfo, res;
                return regenerator_default().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return getFromBeagleInfoLayer("pdp.sku", true);
                      case 2:
                        sku = _context3.sent;
                        _context3.next = 5;
                        return db.get(sku);
                      case 5:
                        productInfo = _context3.sent;
                        if (productInfo.titleAugment) {
                          _context3.next = 9;
                          break;
                        }
                        logger.failed("No title suggestion found for sku ".concat(sku));
                        return _context3.abrupt("return", null);
                      case 9:
                        res = productInfo.titleAugment + " (".concat(sku, ")");
                        return _context3.abrupt("return", res);
                      case 11:
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
            sku = skuList[Object.keys(skuList)[0]];
            _context.t0 = operator;
            _context.next = _context.t0 === "saleCntVisitorsIn15" ? 12 : _context.t0 === "cartCntVisitorsIn15" ? 17 : _context.t0 === "viewCntVisitorsIn1" ? 22 : _context.t0 === "hasTitle" ? 27 : _context.t0 === "hasDescription" ? 32 : 37;
            break;
          case 12:
            productInfoChecker_logger.log("Getting TransactionCount for sku ", sku);
            _context.next = 15;
            return getTransactionCount(sku);
          case 15:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 37);
          case 17:
            productInfoChecker_logger.log("Getting AddToCartCount for sku ", sku);
            _context.next = 20;
            return getAddToCartCount(sku);
          case 20:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 37);
          case 22:
            productInfoChecker_logger.log("Getting productViewCount for sku ", sku);
            _context.next = 25;
            return getPreviewCount(sku);
          case 25:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 37);
          case 27:
            productInfoChecker_logger.log("Getting title for sku ", sku);
            _context.next = 30;
            return getTitle(sku);
          case 30:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 37);
          case 32:
            productInfoChecker_logger.log("Getting description for sku ", sku);
            _context.next = 35;
            return getDescription(sku);
          case 35:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 37);
          case 37:
            return _context.abrupt("return", conditionChecker(runtimeValue, condition, value));
          case 38:
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
var getTitle = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(sku) {
    var productInfo;
    return regenerator_default().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getFromDB(sku);
          case 2:
            productInfo = _context6.sent;
            if (!(sku && productInfo)) {
              _context6.next = 5;
              break;
            }
            return _context6.abrupt("return", productInfo.titleAugment || "");
          case 5:
            return _context6.abrupt("return", -1);
          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function getTitle(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var getDescription = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7(sku) {
    var productInfo;
    return regenerator_default().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getFromDB(sku);
          case 2:
            productInfo = _context7.sent;
            if (!(sku && productInfo)) {
              _context7.next = 5;
              break;
            }
            return _context7.abrupt("return", productInfo.marketingCopy || "");
          case 5:
            return _context7.abrupt("return", -1);
          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function getDescription(_x7) {
    return _ref7.apply(this, arguments);
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
                    var config = {
                      subtree: true,
                      childList: true,
                      attributes: true
                    };
                    observer.observe(window.top.document.querySelector(selector).parentNode, config);
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
      var baseRule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
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
              dataLayerRules[rule.operator].push(baseRule || rule);
              break;
            case "element":
              if (document.querySelector(rule.selector)) {
                elementRules[rule.selector] = elementRules[rule.selector] ? [].concat(_toConsumableArray(elementRules[rule.selector]), [baseRule || rule]) : [baseRule || rule];
                break;
              }
              if (document.querySelectorAll(rule.selectorAll).length) {
                elementRules[rule.selectorAll] = elementRules[rule.selectorAll] ? [].concat(_toConsumableArray(elementRules[rule.selectorAll]), [baseRule || rule]) : [baseRule || rule];
                break;
              }
              elementRules["body"] = elementRules["body"] ? [].concat(_toConsumableArray(elementRules["body"]), [baseRule || rule]) : [baseRule || rule];
              break;
          }
          if (rule.chain) {
            this.extractRuleAttributes([rule.chain], dataLayerRules, elementRules, baseRule || rule);
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
            _context.prev = 34;
            _context.next = 37;
            return store.getInstance();
          case 37:
            productInfoDB = _context.sent;
            _context.next = 40;
            return productInfoDB.persistProductInfo();
          case 40:
            _context.next = 45;
            break;
          case 42:
            _context.prev = 42;
            _context.t1 = _context["catch"](34);
            throw new Error("product-info-no-persist");
          case 45:
            addToBeagleInfoLayer("m", "engaging-robots");
            robotEngine = new RobotEngine({
              debugFilteredTreatments: debugFilteredTreatments,
              debugMode: debugMode,
              matchedTreatments: matchedTreatments,
              identifier: identifier,
              pageType: pageType,
              isOn: isOn
            });
            _context.next = 49;
            return robotEngine.engageRobots();
          case 49:
            removeDocumentHide();
            addToBeagleInfoLayer("m", "robots-engaged");
            _context.t2 = BeagleOn_logger;
            _context.next = 54;
            return getFromBeagleInfoLayer("a");
          case 54:
            _context.t3 = _context.sent;
            _context.t2.success.call(_context.t2, "Applied treatments: ", _context.t3);
          case 56:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[25, 30], [34, 42]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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QUM7UUFBQTtVQUM1QjtVQUNBaEIsUUFBUSxHQUFHLElBQUk7VUFBQztVQUFBO1FBQUE7VUFFaEI7VUFDQUMsT0FBTyxDQUFDZSxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQUM7VUFFMUJkLFlBQVksR0FBRyxJQUFJOztVQUVuQjtVQUNBNXdCLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQztVQUFDLE1BRTdDd29CLElBQUksS0FBSyxJQUFJLElBQUlBLElBQUksS0FBS3hnQixTQUFTO1lBQUE7WUFBQTtVQUFBO1VBQUEsTUFDL0IsSUFBSTdHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFBQTtVQUFBLEtBQ2pCdXZCLFFBQVE7WUFBQTtZQUFBO1VBQUE7VUFBQSxNQUNYLElBQUl2dkIsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUFBO1VBQUE7VUFBQSxPQUUxQm91QixRQUFRLENBQUN6ckIsVUFBVSxFQUFFcUMsU0FBUyxFQUFFdUgsUUFBUSxFQUFFak0sZ0JBQWdCLEVBQUUrbUIsSUFBSSxDQUFDO1FBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtVQUFBO1VBR3pFdm9CLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFlBQUl5QixPQUFPLENBQUM7VUFDOUN2QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsWUFBSXVCLE9BQU8sQ0FBQztVQUN0QyxJQUFJLENBQUNxdkIsWUFBWSxJQUFJRCxPQUFPLEVBQUVBLE9BQU8sQ0FBQ2UsUUFBUSxDQUFDLEtBQUssQ0FBQztVQUNyRHZ4QixrQkFBa0IsRUFBRTtRQUFDO1FBQUE7VUFBQTtNQUFBO0lBQUE7RUFBQTtBQUFBLENBRXhCLElBQUcsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJvcGVydHlLZXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL3N0cmluZ1V0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvbG9nZ2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL3JlcGxhY2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvd3JhcC1pZGItdmFsdWUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2FzeW5jLW11dGV4L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9kYXRhTGF5ZXJDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbGVtZW50Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZnVuY3Rpb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9zZXNzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvdXJsQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZW52Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU9uL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi90eXBlb2YuanNcIilbXCJkZWZhdWx0XCJdO1xuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7IC8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzO1xuICB2YXIgZXhwb3J0cyA9IHt9LFxuICAgIE9wID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAob2JqLCBrZXksIGRlc2MpIHtcbiAgICAgIG9ialtrZXldID0gZGVzYy52YWx1ZTtcbiAgICB9LFxuICAgICRTeW1ib2wgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LFxuICAgIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIixcbiAgICBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCIsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgd3JpdGFibGU6ICEwXG4gICAgfSksIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3IsXG4gICAgICBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSksXG4gICAgICBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShnZW5lcmF0b3IsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KVxuICAgIH0pLCBnZW5lcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkgJiYgKEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUpO1xuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAoXCJ0aHJvd1wiICE9PSByZWNvcmQudHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZyxcbiAgICAgICAgICB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIFwib2JqZWN0XCIgPT0gX3R5cGVvZih2YWx1ZSkgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICBpZiAoXCJjb21wbGV0ZWRcIiA9PT0gc3RhdGUpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwibmV4dFwiID09PSBjb250ZXh0Lm1ldGhvZCkgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO2Vsc2UgaWYgKFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHtcbiAgICAgICAgICBpZiAoXCJzdXNwZW5kZWRTdGFydFwiID09PSBzdGF0ZSkgdGhyb3cgc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0LmFyZztcbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIFwicmV0dXJuXCIgPT09IGNvbnRleHQubWV0aG9kICYmIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgc3RhdGUgPSBcImV4ZWN1dGluZ1wiO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSAmJiAoc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kLFxuICAgICAgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKHVuZGVmaW5lZCA9PT0gbWV0aG9kKSByZXR1cm4gY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbWV0aG9kTmFtZSAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSAmJiAoY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCksIFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHx8IFwicmV0dXJuXCIgIT09IG1ldGhvZE5hbWUgJiYgKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICdcIiArIG1ldGhvZE5hbWUgKyBcIicgbWV0aG9kXCIpKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZywgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgIHJldHVybiBpbmZvID8gaW5mby5kb25lID8gKGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlLCBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jLCBcInJldHVyblwiICE9PSBjb250ZXh0Lm1ldGhvZCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpO1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcbiAgICAxIGluIGxvY3MgJiYgKGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXSksIDIgaW4gbG9jcyAmJiAoZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl0sIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiLCBkZWxldGUgcmVjb3JkLmFyZywgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaXRlcmFibGUubmV4dCkgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBmb3IgKDsgKytpIDwgaXRlcmFibGUubGVuZ3RoOykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzLnJldmVyc2UoKSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGZvciAoOyBrZXlzLmxlbmd0aDspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSByZXR1cm4gbmV4dC52YWx1ZSA9IGtleSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgfTtcbiAgfSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IFwidGhyb3dcIiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXSxcbiAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKSxcbiAgICAgICAgICAgIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbmFsbHlFbnRyeSAmJiAoXCJicmVha1wiID09PSB0eXBlIHx8IFwiY29udGludWVcIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTtcbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gdHlwZSwgcmVjb3JkLmFyZyA9IGFyZywgZmluYWxseUVudHJ5ID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIHJldHVybiBcImJyZWFrXCIgPT09IHJlY29yZC50eXBlIHx8IFwiY29udGludWVcIiA9PT0gcmVjb3JkLnR5cGUgPyB0aGlzLm5leHQgPSByZWNvcmQuYXJnIDogXCJyZXR1cm5cIiA9PT0gcmVjb3JkLnR5cGUgPyAodGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnLCB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCIsIHRoaXMubmV4dCA9IFwiZW5kXCIpIDogXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUgJiYgYWZ0ZXJMb2MgJiYgKHRoaXMubmV4dCA9IGFmdGVyTG9jKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykgcmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpLCByZXNldFRyeUVudHJ5KGVudHJ5KSwgQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbm1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG9iaik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvLyBUT0RPKEJhYmVsIDgpOiBSZW1vdmUgdGhpcyBmaWxlLlxuXG52YXIgcnVudGltZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZVwiKSgpO1xubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuXG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PVxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgY29uc3QgcmVwbGFjZUFsbCA9IChzdHIsIGZpbmQsIHJlcGxhY2UgPSBcIlwiKSA9PiB7XG4gIGlmICghc3RyKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICBpZiAoaW5kZXggPCAwKSByZXR1cm4gc3RyO1xuXG4gIHdoaWxlIChzdHIuaW5kZXhPZihmaW5kKSA+PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgICBzdHIgPSAoaW5kZXggPiAwID8gc3RyLnN1YnN0cmluZygwLCBpbmRleCkgOiBcIlwiKSArIHJlcGxhY2UgKyBzdHIuc3Vic3RyaW5nKGluZGV4ICsgZmluZC5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJraXNoVG9Mb3dlciA9IChzdHIpID0+IHtcbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcbiAgbGV0IHN0cmluZyA9IHN0cjtcbiAgY29uc3QgbGV0dGVycyA9IHtcIsSwXCI6IFwiaVwiLCBcIklcIjogXCLEsVwiLCBcIsWeXCI6IFwixZ9cIiwgXCLEnlwiOiBcIsSfXCIsIFwiw5xcIjogXCLDvFwiLCBcIsOWXCI6IFwiw7ZcIiwgXCLDh1wiOiBcIsOnXCJ9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKChbxLBJxZ7EnsOcw4fDll0pKS9nLCBmdW5jdGlvbihsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyc1tsZXR0ZXJdO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4vc3RyaW5nVXRpbHNcIjtcbmNvbnN0IGlzU3RhZ2luZyA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIwLjAuNDAuOFwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50cy5qc29uXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTVFlMRVNIRUVUX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlc19zdGFnaW5nLmNzc1wiIDogYGh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzLmNzcz9pZD0ke3JlcGxhY2VBbGwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMykucmVwbGFjZShcIlRcIiwgXCJcIiksIFwiLVwiLCBcIlwiKX1gO1xuZXhwb3J0IGNvbnN0IEVfUlVMRVNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFBST0RVQ1RfSU5GT19MT0NBVElPTiA9IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9zb2NpYWwtcHJvb2YtdjIuanNvblwiO1xuZXhwb3J0IGNvbnN0IExPR19BUElfVVJMID0gXCJodHRwczovL2V1cm9wZS13ZXN0My1uZXh0ZGF5LTM0ZWIzLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvbG9nXCI7XG5leHBvcnQgY29uc3QgTE9PS1VQX0FQSV9VUkwgPSBcImh0dHBzOi8vY2F0YWxvZy1hcGkuYWRvcmFhaS5jb21cIjtcbmV4cG9ydCBjb25zdCBNT0JJTEVfTUVESUFfUVVFUlkgPSBcIihtYXgtd2lkdGg6IDQ0MHB4KVwiO1xuLy8gQ29udHJvbCBncm91cCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgU1BMSVRfUkFUSU8gPSA1MDtcbi8vIFNraXBwZWQgdHJlYXRtZW50IHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUyA9IDI7XG5leHBvcnQgY29uc3QgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04gPSAxO1xuZXhwb3J0IGNvbnN0IExJU1RfTU9ERV9CRUFHTEVfS0VZUyA9IFtcInBhZ2V0eXBlXCIsIFwiY2F0ZWdvcnlcIiwgXCJhbGx0aW1lUExQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBMUENhdGVnb3J5TW9kZVwiLFxuICBcImFsbHRpbWVQRFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUERQQ2F0ZWdvcnlNb2RlXCIsIFwiYWxsdGltZUNhcnRDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uQ2FydENhdGVnb3J5TW9kZVwiXTtcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBQT1BVUF9ESVNQTEFZX0ZMQUc6IFwiQkdfUG9wdXBEaXNwbGF5RmxhZ1wiLFxuICBTS1VfSU5GT19CQVNLRVQ6IFwiQkdfUHJvZHVjdEluZm9CYXNrZXRcIixcbiAgVElNRU9VVF9DT1VOVDogXCJCR19UaW1lb3V0Q291bnRcIixcbiAgU0VTU0lPTl9SRUZFUlJFUjogXCJCR19TZXNzaW9uUmVmZXJyZXJcIixcbiAgTUFUQ0hFRF9UUkVBVE1FTlRTOiBcIkdMVl9NYXRjaGVkXCIsXG4gIElTX0xBQkVMX1NFTlQ6IFwiQkdfTGFiZWxTZW50XCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgVFJFQVRNRU5UUzogXCJCR19UcmVhdG1lbnRzXCIsXG4gIFdFSUdIVFM6IFwiQkdfV2VpZ2h0c1wiLFxuICBFTElHSUJJTElUWV9SVUxFUzogXCJCR19FX1J1bGVzXCIsXG4gIERFQlVHX01PREU6IFwiQkdfRGVidWdcIixcbiAgT1VUX09GX1NDT1BFOiBcIkdMVl9PdXRPZlNjb3BlXzAwXCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAxXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG4gIElTX0FETUlOOiBcIkdMVl9Jc0FkbWluXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gbnVsbCA9PSBhcnIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IF9pKSB7XG4gICAgdmFyIF9zLFxuICAgICAgX2UsXG4gICAgICBfeCxcbiAgICAgIF9yLFxuICAgICAgX2FyciA9IFtdLFxuICAgICAgX24gPSAhMCxcbiAgICAgIF9kID0gITE7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfeCA9IChfaSA9IF9pLmNhbGwoYXJyKSkubmV4dCwgMCA9PT0gaSkge1xuICAgICAgICBpZiAoT2JqZWN0KF9pKSAhPT0gX2kpIHJldHVybjtcbiAgICAgICAgX24gPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShfbiA9IChfcyA9IF94LmNhbGwoX2kpKS5kb25lKSAmJiAoX2Fyci5wdXNoKF9zLnZhbHVlKSwgX2Fyci5sZW5ndGggIT09IGkpOyBfbiA9ICEwKSB7XG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gITAsIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIG51bGwgIT0gX2lbXCJyZXR1cm5cIl0gJiYgKF9yID0gX2lbXCJyZXR1cm5cIl0oKSwgT2JqZWN0KF9yKSAhPT0gX3IpKSByZXR1cm47XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2FycjtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAga2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgU1RZTEVTSEVFVF9MT0NBVElPTixcbiAgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04sXG4gIFRSRUFUTUVOVFNfTE9DQVRJT04sXG4gIEVfUlVMRVNfTE9DQVRJT04sXG4gIFBST0RVQ1RfSU5GT19MT0NBVElPTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3Qgc3dpdGNoVG9FYXNlT3V0ID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtaGlkZVwiKSkgcmV0dXJuO1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZWwudGV4dENvbnRlbnQgPSBgLmdsb3YtZWFzZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtby1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tcy1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIGFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuMjU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDc1JSB7IG9wYWNpdHk6IDAuNTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDkwJSB7IG9wYWNpdHk6IDAuNzU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDEwMCUgeyBvcGFjaXR5OiAxOyBmaWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IC13ZWJraXQtZmlsdGVyOiBncmF5c2NhbGUoMCUpO31cbiAgfWA7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnByZXBlbmQoZWwpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ2xvdi1lYXNlXCIpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudCA9IGF3YWl0IHRyZWF0bWVudHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnQgd2VpZ2h0c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudCB3ZWlnaHRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoUGx1cyhFX1JVTEVTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25FbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZWxpZ2liaWxpdHlSdWxlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25FbGlnaWJpbGl0eVJ1bGVzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoUHJvZHVjdEluZm8gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHByb2R1Y3QgaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoUGx1cyhQUk9EVUNUX0lORk9fTE9DQVRJT04pO1xuICAgIGlmICghcHJvZHVjdEluZm8pIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvSnNvbiA9IGF3YWl0IHByb2R1Y3RJbmZvLmpzb24oKTtcbiAgICByZXR1cm4gcHJvZHVjdEluZm9Kc29uO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSk7XG4gIHJldHVybiB7Y29udHJvbGxlciwgdGltZW91dElEfTtcbn07XG5cbmNvbnN0IGZldGNoUGx1cyA9ICh1cmwsIG9wdGlvbnMgPSB7fSwgcmV0cmllcyA9IDUpID0+IHtcbiAgY29uc3Qge2NvbnRyb2xsZXIsIHRpbWVvdXRJRH0gPSB0aW1lb3V0KDUwMDApO1xuICByZXR1cm4gZmV0Y2godXJsLCB7Li4ub3B0aW9ucywgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIHRpbWVkIG91dCBSZXRyeWluZy4uLjogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIG9mIHllYXIgdG8gaGFzaCB0byByZXNldCBpdCBldmVyeSBtb250aFxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBub3cuZ2V0TW9udGgoKTtcbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIrbW9udGgudG9TdHJpbmcoKSk7XG5cbiAgICBpZiAoaGFzaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhcmlhbnRLZXldIG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiAhYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSBNYXRoLmZsb29yKDEwMCAvIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpICogKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyA9ICgpID0+IHtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBRywgU0VTU0lPTl9USU1FU1RBTVAsIFNFU1NJT05fSElTVE9SWX0gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCBwb3B1cERpc3BsYXlGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpO1xuICBjb25zdCBzZXNzaW9uVGltZXN0YW1wID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCk7XG4gIGNvbnN0IHNlc3Npb25IaXN0b3J5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX0hJU1RPUlkpO1xuXG4gIGlmIChwb3B1cERpc3BsYXlGbGFnID09PSBudWxsKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDApO1xuICB9XG4gIGlmICghc2Vzc2lvblRpbWVzdGFtcCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVAsIERhdGUubm93KCkpO1xuICB9XG4gIGlmICghc2Vzc2lvbkhpc3RvcnkpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZV0pO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBzZXNzaW9uSGlzdG9yeV0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29uZGl0aW9uQ2hlY2tlciA9IChydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJub3RFeGlzdFwiKSB7XG4gICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHxcbiAgICBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gbnVsbCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IHJ1blRpbWVWYWx1ZSBvciBjb25kaXRpb24gaXMgbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgY2FzZSBcImV4aXN0XCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImluY2x1ZGVzXCI6XG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RJbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJub3RDb250YWluc1wiOlxuICAgICAgaWYgKCFydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPD0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImJldHdlZW5cIjoge1xuICAgICAgbGV0IFttaW4sIG1heF0gPSB2YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gbWluICYmIHJ1blRpbWVWYWx1ZSA8PSBtYXgpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FzZSBcInJlZ2V4XCI6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgXCJpXCIpO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QocnVuVGltZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBjb25kaXRpb24gaXMgbm90IGRlZmluZWQgXCIsIGNvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREZWJ1Z01vZGUgPSAob29zUmVhc29uKSA9PiB7XG4gIGNvbnN0IHtERUJVR19NT0RFLCBPVVRfT0ZfU0NPUEV9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShPVVRfT0ZfU0NPUEUsIG9vc1JlYXNvbik7XG4gIH1cblxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0xXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDEpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MlwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAyO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTBcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgY3VycmVudCA9IHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShERUJVR19NT0RFKSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIChjdXJyZW50ID8gXCJvblwiIDogXCJvZmZcIikpO1xuICByZXR1cm4gKGN1cnJlbnQgfHwgMCk7XG59O1xuXG4vLyBnZXQgR0EgY2xpZW50IGlkIHVzaW5nIGdhLmdldEFsbCgpXG5leHBvcnQgY29uc3QgZ2V0R2FDbGllbnRJZCA9ICgpID0+IHtcbiAgY29uc3QgZ2EgPSB3aW5kb3cuZ2E7XG4gIC8vIGlmIGdhIGFuZCBnYS5nZXRBbGwoKSBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIG51bGxcbiAgaWYgKGdhICYmIGdhLmdldEFsbCkge1xuICAgIGNvbnN0IHRyYWNrZXJzID0gZ2EuZ2V0QWxsKCk7XG4gICAgaWYgKHRyYWNrZXJzICYmIHRyYWNrZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRyYWNrZXJzWzBdLmdldChcImNsaWVudElkXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIGdldCBkZXRlcm1pbmlzdGljIG51bWVyaWMgaGFzaCBmcm9tIHN0cmluZyB0aGF0IGNvbnRhaW5zIG9ubHkgbnVtYmVyc1xuZXhwb3J0IGNvbnN0IGdldFVuc2VjdXJlSGFzaCA9IChzdHIpID0+IHtcbiAgLy8gc3RhcnQgd2l0aCBhIG1hZ2ljIG51bWJlciwgdXNlIHBpIGRpZ2l0c1xuICBsZXQgaGFzaCA9IDMxNDE1OTI2NTtcbiAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBtYWtlIGl0IHN0cmluZ1xuICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xuICB9XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gIH1cbiAgLy8gcmV0dXJuIGFic29sdXRlIHZhbHVlXG4gIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbn07XG5cbi8vIGdlbmVyYXRlIGEgMzItYml0IHJhbmRvbSBpbnRlZ2VyXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApO1xufTtcblxuLy8gZ2V0IGN1cnJlbnQgdW5peCBlcG9jaCB0aW1lIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBnZXRVbml4VGltZSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0SWRlbnRpZmllciA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBsb2NhbCBzdG9yYWdlXCIsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2EgaW4gZmlyc3QgYXR0ZW1wdFwiLCBpZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2FcIiwgaWQpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgcmVhZCBHQSBjbGllbnQgaWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGluIGdldElkZW50aWZpZXJcIiwgZSk7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGVsaXZlcnlEYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZGF0ZTtcblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgc3RhcnRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgZW5kTW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIHN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgZW5kRGF5OiB1bmRlZmluZWQsXG4gIH07XG5cbiAgbGV0IG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKyktKFtcXFxcZF0rKVxcXFxzPyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzNdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKS0oW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCAhPT0gNSkgcmV0dXJuIGRhdGU7XG5cbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFsyXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzRdLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5zdGFydE1vbnRoSW5kZXggfHwgIXJlc3VsdC5lbmRNb250aEluZGV4KSByZXR1cm4gZGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0WWVhciA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBjb25zdCBlbmRZZWFyID0gcmVzdWx0LmVuZE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcblxuICAgIGNvbnN0IGVzdGltYXRlZFN0YXJ0ID0gbmV3IERhdGUoc3RhcnRZZWFyLCByZXN1bHQuc3RhcnRNb250aEluZGV4LCByZXN1bHQuc3RhcnREYXkpO1xuICAgIGNvbnN0IGVzdGltYXRlZEVuZCA9IG5ldyBEYXRlKGVuZFllYXIsIHJlc3VsdC5lbmRNb250aEluZGV4LCByZXN1bHQuZW5kRGF5KTtcblxuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkU3RhcnQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRFbmQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlcldlZWtzID0gc3RhcnREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChzdGFydERpZmZPdmVyRGF5cyAvIDcpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyV2Vla3MgPSBlbmREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChlbmREaWZmT3ZlckRheXMgLyA3KTtcblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSAtICR7ZW5kRGlmZk92ZXJEYXlzfSBHw7xuYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPj0gMSkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSBHw7xuIC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gZW5kRGlmZk92ZXJXZWVrcykge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaWRsZVRpbWVyID0gYXN5bmMgKHRpbWVPdXQsIGNhbGxCYWNrKSA9PiB7XG4gIGxldCBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQub250b3VjaHN0YXJ0ID0gcmVzZXRUaW1lcjtcblxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xuICAgIGNsZWFyVGltZW91dChpZGxlVGltZW91dCk7XG4gICAgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlzT3duTXV0YXRpb24gPSAobXV0YXRpb25MaXN0KSA9PiB7XG4gIGNvbnN0IG5vZGVzID0gWy4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5yZW1vdmVkTm9kZXMpXTtcbiAgcmV0dXJuIG5vZGVzLnNvbWUoKG4pID0+IHtcbiAgICByZXR1cm4gbi50YWdOYW1lICYmIChuLmlkPy5pbmNsdWRlcyhcImJuLVwiKSB8fCBBcnJheS5mcm9tKG4uY2xhc3NMaXN0KS5zb21lKChjKSA9PiBjLmluY2x1ZGVzKFwiYm4tXCIpIHx8IGMuaW5jbHVkZXMoXCJuZC1cIikpKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QWdlbnREZXRhaWxzID0gKCkgPT4ge1xuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgLy8gZXh0cmFjdCBicm93c2VyIGFuZCB2ZXJzaW9uXG4gIGNvbnN0IGJyID0gdWEubWF0Y2goLyhvcGVyYXxlZGd8dHJpZGVudHxmaXJlZm94fG1zaWUoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8XG4gICAgdWEubWF0Y2goLyhzYWZhcml8Y2hyb21lKD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fFxuICAgIHVhLm1hdGNoKC8od2Via2l0KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fCBbXTtcblxuICBpZiAoIWJyIHx8IGJyLmxlbmd0aCA8IDMpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBiTmFtZSA9IGJyWzFdO1xuICBjb25zdCBiVmVyc2lvbiA9IGJyWzJdO1xuXG4gIGNvbnN0IG9zID0ge1xuICAgIFdpbmRvd3M6IC9XaW4vaS50ZXN0KHVhKSxcbiAgICBNYWM6IC9NYWMvaS50ZXN0KHVhKSxcbiAgICBMaW51eDogL0xpbnV4L2kudGVzdCh1YSksXG4gICAgQW5kcm9pZDogL0FuZHJvaWQvaS50ZXN0KHVhKSxcbiAgICBpT1M6IC9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdCh1YSksXG4gIH07XG5cbiAgLy8gZXh0cmFjdCBPUyBhbmQgdmVyc2lvblxuICBsZXQgb3NWZXJzaW9uID0gXCJcIjtcbiAgbGV0IG9zTmFtZSA9IFwiXCI7XG4gIGlmIChvcy5XaW5kb3dzKSB7XG4gICAgb3NOYW1lID0gXCJXaW5kb3dzXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL1dpbmRvd3MgTlQgKFswLTkuXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuaU9TKSB7XG4gICAgb3NOYW1lID0gXCJpT1NcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvT1MgKFswLTlfXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdLnJlcGxhY2UoL18vZywgXCIuXCIpIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuTWFjKSB7XG4gICAgb3NOYW1lID0gXCJNYWNcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvTWFjIE9TIFggKFswLTlfXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdLnJlcGxhY2UoL18vZywgXCIuXCIpIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuQW5kcm9pZCkge1xuICAgIG9zTmFtZSA9IFwiQW5kcm9pZFwiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9BbmRyb2lkIChbMC05Ll0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwidW5rbm93blwiO1xuICB9IGVsc2UgaWYgKG9zLkxpbnV4KSB7XG4gICAgb3NOYW1lID0gXCJMaW51eFwiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9MaW51eCAoW2lcXGRdKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcInVua25vd25cIjtcbiAgfVxuXG4gIC8vIGV4dHJhY3QgbW9iaWxlIG9yIGRlc2t0b3BcbiAgY29uc3QgaXNNb2JpbGUgPSAvTW9iaS9pLnRlc3QodWEpO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmJyb3dzZXJOYW1lXCIsIGJOYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuYnJvd3NlclZlcnNpb25cIiwgYlZlcnNpb24pO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5vc05hbWVcIiwgb3NOYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uub3NWZXJzaW9uXCIsIG9zVmVyc2lvbik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmlzTW9iaWxlXCIsIGlzTW9iaWxlKTtcblxuICBjb25zdCBpc1N1cHBvcnRlZEJyb3dzZXIgPSBiTmFtZSA9PT0gXCJDaHJvbWVcIiB8fCBiTmFtZSA9PT0gXCJTYWZhcmlcIjtcbiAgY29uc3QgaXNTdXBwb3J0ZWRPUyA9IG9zTmFtZSA9PT0gXCJNYWNcIiB8fCBvc05hbWUgPT09IFwiV2luZG93c1wiIHx8IG9zTmFtZSA9PT0gXCJBbmRyb2lkXCIgfHwgb3NOYW1lID09PSBcImlPU1wiO1xuXG4gIHJldHVybiBpc1N1cHBvcnRlZEJyb3dzZXIgJiYgaXNTdXBwb3J0ZWRPUztcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRVUkxEYXRhID0gKCkgPT4ge1xuICBjb25zdCBjdXJyZW50VVJMID0gbmV3IFVSTCh3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInVcIiwgY3VycmVudFVSTC5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIGN1cnJlbnRVUkwuaG9zdG5hbWUpO1xuXG4gIC8qIFZpdmVuc2Ugc3BlY2lmaWMgKi9cbiAgbGV0IHBhZ2VUeXBlO1xuICAvLyBpZiB1cmwgbGlrZSB4IHRoZW4gc2V0IFBhZ2VUeXBlID0geVxuICBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZmF2b3JpbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImZhdm9yaXRlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYmFza2V0XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1vemV0aS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHVyY2hhc2VcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJvZGVtZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGF5bWVudFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImFkZHJlc3NcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBhc3RvcmRlcnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUta2F5aXQuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInJlZ2lzdGVyXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWdpcmlzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic2lnbmluXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwia3Vwb25sYXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9jb3Vwb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwicHJvZmlsLWd1bmNlbGxlLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2luZm9cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2FkZHJlc3Nlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImR1eXVydS10ZXJjaWhsZXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX25vdGlmaWNhdGlvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJpbmRpcmltbGktbW9iaWx5YS1rYW1wYW55YWxhcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNwZWNpYWxfY2FtcGFpZ25zXCI7XG4gIH1cblxuICBpZiAocGFnZVR5cGUpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHBhZ2VUeXBlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXb3JrIGFyb3VuZCBTYWZhcmkgMTQgSW5kZXhlZERCIG9wZW4gYnVnLlxuICpcbiAqIFNhZmFyaSBoYXMgYSBob3JyaWJsZSBidWcgd2hlcmUgSURCIHJlcXVlc3RzIGNhbiBoYW5nIHdoaWxlIHRoZSBicm93c2VyIGlzIHN0YXJ0aW5nIHVwLiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjI2NTQ3XG4gKiBUaGUgb25seSBzb2x1dGlvbiBpcyB0byBrZWVwIG51ZGdpbmcgaXQgdW50aWwgaXQncyBhd2FrZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGlkYlJlYWR5ID0gKCkgPT4ge1xuICBjb25zdCBpc1NhZmFyaSA9XG4gICAgIW5hdmlnYXRvci51c2VyQWdlbnREYXRhICYmXG4gICAgL1NhZmFyaVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJlxuICAgICEvQ2hyb20oZXxpdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIC8vIE5vIHBvaW50IHB1dHRpbmcgb3RoZXIgYnJvd3NlcnMgb3Igb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIHRocm91Z2ggdGhpcyBtZXNzLlxuICBpZiAoIWlzU2FmYXJpIHx8ICFpbmRleGVkREIuZGF0YWJhc2VzKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgbGV0IGludGVydmFsSWQ7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgdHJ5SWRiID0gKCkgPT4gaW5kZXhlZERCLmRhdGFiYXNlcygpLmZpbmFsbHkocmVzb2x2ZSgpKTtcbiAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodHJ5SWRiLCA1MCk7XG4gICAgdHJ5SWRiKCk7XG4gIH0pLmZpbmFsbHkoKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldFVuc2VjdXJlSGFzaH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92SW5mb0xheWVyXCIpO1xuY29uc3QgTFNfUHJlZml4ID0gXCJHTERDX1wiO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwidXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpO1xuXG4gICAgLy8gcmVtb3ZlIGRvdHMgaW4gYmFzZUZlYXR1cmVOYW1lIGFuZCBhZGQgcHJlZml4XG4gICAgY29uc3QgZmVhdHVyZUtleSA9IExTX1ByZWZpeCArIGJhc2VGZWF0dXJlTmFtZS5yZXBsYWNlKC9cXC4vZywgXCJfXCIpO1xuICAgIGNvbnN0IG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX1wiICsgdXBkYXRlTWV0aG9kO1xuXG4gICAgc3dpdGNoICh1cGRhdGVNZXRob2QpIHtcbiAgICAgIGNhc2UgXCJtaW5cIjpcbiAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBtaW4gYW5kIG1heCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcblxuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBNYXRoW3VwZGF0ZU1ldGhvZF0odmFsdWUsIGJhc2VGZWF0dXJlVmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic3VtXCI6XG4gICAgICAgIC8vIGNvbXB1dGUgc3VtIGFuZCBjb3VudCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgcGFyc2VGbG9hdCh2YWx1ZSkgKyBwYXJzZUZsb2F0KGJhc2VGZWF0dXJlVmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJjbnRcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBjb3VudCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgcGFyc2VJbnQodmFsdWUpICsgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICAvLyBjb21wdXRlIGxhc3Qgb2J0YWluZWQgdmFsdWUgaW4gbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImNvdW50X3ZhbHVlc1wiIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlcywga2VlcCBhIGNvdW50ZXIgZm9yIGVhY2ggdmFsdWVcbiAgICAgIGNhc2UgXCJ2YWxjbnRzXCI6XG4gICAgICAgIHtcbiAgICAgICAgICAvLyBjb21wdXRlIGNvdW50IG9mIGVhY2ggdmFsdWUgZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgICAgLy8gY3JlYXRlIGEgOCBieXRlcyBoZXggaGFzaCBmb3IgYmFzZUZlYXR1cmVWYWx1ZSwgb25seSBwb3NpdGl2ZSBudW1iZXJzXG4gICAgICAgICAgY29uc3QgdmFsSGFzaCA9IGdldFVuc2VjdXJlSGFzaChiYXNlRmVhdHVyZVZhbHVlKTtcblxuICAgICAgICAgIGNvbnN0IG9wS2V5VmFsID0gb3BLZXkgKyBcIl9cIiArIHZhbEhhc2g7XG4gICAgICAgICAgY29uc3Qgb3BLZXlWYWxOYW1lID0gb3BLZXkgKyBcIl9cIiArIHZhbEhhc2ggKyBcIl9uYW1lXCI7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWxOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKTtcblxuICAgICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5VmFsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWwsIHBhcnNlSW50KHZhbHVlKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5VmFsLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIGluIHVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kLCBlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5SW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcInF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KTtcblxuICAgIGNvbnN0IGZlYXR1cmVLZXkgPSBMU19QcmVmaXggKyBiYXNlRmVhdHVyZU5hbWUucmVwbGFjZSgvXFwuL2csIFwiX1wiKTtcbiAgICBsZXQgb3BLZXk7XG5cbiAgICBsZXQgc3RvcmFnZSA9IG51bGw7XG4gICAgaWYgKHdpbmRvdyA9PT0gXCJhbGx0aW1lXCIpIHtcbiAgICAgIHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cgPT09IFwic2Vzc2lvblwiKSB7XG4gICAgICBzdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcIkludmFsaWQgd2luZG93IHR5cGVcIiwgd2luZG93KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN3aXRjaCAocXVlcnlNZXRob2QpIHtcbiAgICAgIC8vIGZvciBsYXN0LCBtaW4sIG1heCwgc3VtIGV0Yy4gYnJpbmcgdGhlIHZhbHVlIGZyb20gbG9jYWwvc2Vzc2lvbiBzdG9yYWdlIGdpdmVuIHRoZSB3aW5kb3cgaXMgc2Vzc2lvbiBvciBhbGx0aW1lXG4gICAgICBjYXNlIFwibWluXCI6XG4gICAgICBjYXNlIFwibWF4XCI6XG4gICAgICBjYXNlIFwic3VtXCI6XG4gICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl9cIiArIHF1ZXJ5TWV0aG9kO1xuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcblxuICAgICAgICAvLyBmb3IgY3YsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRzaWl0bmN0IHZhbHVlcywgb2J0YWluIGJ5IHNjYW5uaW5nIHRoZSBwcmVmaXggb2YgdGhlIGtleSBpbiB0aGUgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlXG4gICAgICAgIC8vIGZvciBtb2RlLCBzY2FuIHRoZSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2UgYW5kIHJldHVybiB0aGUgdmFsdWUgd2l0aCB0aGUgaGlnaGVzdCBjb3VudFxuICAgICAgY2FzZSBcImNudHZhbHNcIjpcbiAgICAgIGNhc2UgXCJzdW12YWxzXCI6XG4gICAgICBjYXNlIFwibW9kZVwiOlxuICAgICAge1xuICAgICAgICBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl92YWxjbnRzXCI7XG4gICAgICAgIGNvbnN0IGxvY2FsS2V5cyA9IE9iamVjdC5rZXlzKHN0b3JhZ2UpO1xuICAgICAgICBjb25zdCBsb2NhbEtleXNGaWx0ZXJlZCA9IGxvY2FsS2V5cy5maWx0ZXIoKGtleSkgPT4ga2V5LmluZGV4T2Yob3BLZXkpID09PSAwICYmIGtleS5pbmRleE9mKFwiX25hbWVcIikgPT09IC0xKTtcbiAgICAgICAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImNudHZhbHNcIikge1xuICAgICAgICAgIHJldHVybiBsb2NhbEtleXNGaWx0ZXJlZC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwic3VtdmFsc1wiKSB7XG4gICAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgICAgbG9jYWxLZXlzRmlsdGVyZWQuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBzdW0gKz0gcGFyc2VJbnQoc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzdW07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF4Q291bnQgPSBudWxsO1xuICAgICAgICBsZXQgbWF4VmFsID0gbnVsbDtcbiAgICAgICAgbG9jYWxLZXlzRmlsdGVyZWQuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsID0gcGFyc2VJbnQoc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgICAgICAgIGlmIChtYXhWYWwgPT09IG51bGwgfHwgbWF4Q291bnQgPT09IG51bGwgfHwgbWF4Q291bnQgPCB2YWwpIHtcbiAgICAgICAgICAgIG1heENvdW50ID0gdmFsO1xuICAgICAgICAgICAgLy8gbmFtZXMgYXJlIG9ubHkgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgbWF4VmFsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5ICsgXCJfbmFtZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWF4VmFsO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciBpbiBxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdywgZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2Zvcm1hdERlbGl2ZXJ5RGF0ZSwgaXNPd25NdXRhdGlvbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge3F1ZXJ5SW5Db2xsZWN0b3IsIHVwZGF0ZUluQ29sbGVjdG9yfSBmcm9tIFwiLi9jb2xsZWN0b3JcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG53aW5kb3cuYmVhZ2xlSW5mb0xheWVyID0gd2luZG93LmJlYWdsZUluZm9MYXllciB8fCB7XG4gIGE6IHt9LCBlOiB7fSwgZjoge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZJbmZvTGF5ZXJcIik7XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5jb25zdCBzZWFyY2hQYXRocyA9IFtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHQSBEYXRhIExheWVyIFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlBhZ2VUeXBlXCIsIG5hbWU6IFwiUGFnZVR5cGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwidXBwZXJDYXNlVFJcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5kZXRhaWwuYWN0aW9uRmllbGQubGlzdFwiLCBuYW1lOiBcInBkcC5saXN0YWxpYXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5kaXNjb3VudFJhdGVcIiwgbmFtZTogXCJwZHAuZGlzY291bnRSYXRlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInNlYXJjaF9zdWNjZXNzXCIsIG5hbWU6IFwicGxwLnNlYXJjaFN1Y2Nlc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuaWRcIiwgXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBcInBscC5uYW1lXCIsIFwicGxwLmdyb3VwXCIsIFwicGxwLmNsYXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJMaXN0aW5ncGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtbWFpbi1kZXRhaWxzXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZW1wdHlfYmFza2V0X3RleHRcXFwiXVwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC50b3RhbEJhc2VQcmljZVwiLCBcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltpZCo9XFxcImNhcnRfcXVhbnRpdHlcXFwiXSwgW2NsYXNzKj1cXFwiYmFza2V0X2xlbmd0aFxcXCJdXCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LXRpdGxlXFxcIl0sIFtjbGFzcyo9XFxcImhlYWRlci1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcInNwYW4ucHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI3NhbGVzLXByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImRpdi5wcm9kdWN0LXByaWNlLWJveFwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjbW9iaWxlLXByb2R1Y3Qtc3RpY2t5XCIsIG5hbWU6IFwiX19wcmljZU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJwZHAucHJpY2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByb2R1Y3Qtc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuZW1wdHktY2FydC1jb250YWluZXIsIC5lbXB0eS1jYXJ0XCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuYnJhY2tldC10ZXh0LCAucHJvZHVjdC1jb3VudFwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydEl0ZW1RdWFudGl0eVwiLCBuYW1lOiBcImNhcnQucXVhbnRpdGllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJldmlvdXNcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjYmlsbF90b3RhbFwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyLWZpbmFsLW51bWJlclxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXJ0LXByaWNlXFxcIl0gLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3Vwb25BcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5jYXRlZ29yaWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1sYXN0LWJyZWFkY3J1bWJcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnByaWNlc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJpY2VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICAvLyBEZXNrdG9wIG9ic2VydmVyIGZvciB0aGUgcmlnaHQgcGFuZWwsIGFzIGl0IGlzIHRoZSBvbmUgY2hhbmdpbmdcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtcmlnaHQtY29udGFpbmVyXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3N1bW1hcnlfdG90YWxcXFwiXSwgW2NsYXNzKj1cXFwidG90YWxfcm93XFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyX2ZvbGxvd19udW1iXFxcIl0sIFtjbGFzcyo9XFxcImNhcnQtdGl0bGUtYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS52dnNUeG5JZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wYXltZW50X3R5cGVfdGl0bGUsIC5jYXJ0LXRpdGxlLWluZm9cIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0X3NrdV9jb2RlXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJza3VcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibXBuXCIsIG5hbWU6IFwicGRwLm1wblwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlVmFsaWRVbnRpbFwiLCBuYW1lOiBcInBkcC5wcmljZVZhbGlkVW50aWxcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJpdGVtTGlzdEVsZW1lbnQuKi5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubnVtYmVyT2ZJdGVtc1wiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJicmVhZGNydW1iLml0ZW1MaXN0RWxlbWVudC4qLml0ZW0ubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFdpbmRvdyBjdXN0b20gZWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImZhdm9yaXRlUHJvZHVjdHNcIiwgbmFtZTogXCJ2aWV3LmZhdm9yaXRlZE1QTnNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwidG9TdHJpbmdcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5dO1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcInZhbGNudHNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcInN1bXZhbHNcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJzdW12YWxzXCIsIHdpbmRvdzogXCJhbGx0aW1lXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfYWxsdGltZVwifSxcbiAgXSxcbiAgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLmxhc3RDYXJ0Q291cG9uQXBwbGljYWJsZVwifSxcbiAgXSxcbiAgXCJwZHAuY2F0ZWdvcnlcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwidmFsY250c1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgXSxcbn07XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIC8vIFRPRE86IGNoZWNrIGZlYXR1cmVFbmdpbmVlcmluZyBhbmQgc2VhcmNoIGxpc3QgaWYgYWxsIG1hcmtlZCBhcyBmb3VuZCBidXQgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nIGtleTogJHtsYXN0S2V5fWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgbnVsbCk7XG4gIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgbnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVHJlYXRtZW50ID0gKGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgc3RhdHVzLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gbnVsbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlSWQgIT09IHVuZGVmaW5lZCkgdmFsdWUuYnVzaW5lc3NSdWxlSWQgPSBidXNpbmVzc1J1bGVJZDtcbiAgaWYgKHZhcmlhbnQpIHZhbHVlLnZhcmlhbnQgPSB2YXJpYW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNraXBwZWRcIjpcbiAgICAgIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuICAgICAgaW5mb0xheWVyLmVbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICBpbmZvTGF5ZXIuZltpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG59O1xuXG5jb25zdCBQQVJTRVNFQVJDSE1BWFJFVFJZID0gMTA7XG5jb25zdCBQQVJTRVNFQVJDSFNUQVJUREVMQVkgPSAxMDtcbmxldCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgPSBhc3luYyAoKSA9PiB7XG4gIC8vIENvbGxlY3QgY29yZSBkYXRhXG4gIHByZXBhcmVDb3JlRGF0YSgpO1xuXG4gIC8vIFRyaWdnZXItc3RhcnQgdGhlIHBhcnNlciBsb29wXG4gIHBhcnNlckNhbGxlcigpO1xuXG4gIC8vIEFkZCBtZXRyaWNzXG4gIGFkZE1ldHJpY3MoKTtcbn07XG5cbmNvbnN0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJhc2VGZWF0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlRW5naW5lZXJpbmdPcHMpO1xuICBmb3IgKGNvbnN0IGJhc2VGZWF0dXJlTmFtZSBvZiBiYXNlRmVhdHVyZU5hbWVzKSB7XG4gICAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gICAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcHJvY2Vzc0Zvcm1hdHRlciA9ICh2YWx1ZSwgZm9ybWF0dGVyKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFmb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKGZvcm1hdHRlcikge1xuICAgIGNhc2UgXCJ1cHBlckNhc2VUUlwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoXCJ0ci1UUlwiKTtcbiAgICBjYXNlIFwiZm9ybWF0RGVsaXZlcnlEYXRlXCI6XG4gICAgICByZXR1cm4gZm9ybWF0RGVsaXZlcnlEYXRlKHZhbHVlKTtcbiAgICBjYXNlIFwibnVtZXJpY09ubHlcIjpcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgY2FzZSBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZShcInRyLVRSXCIpLnNwbGl0KFwiIFwiKVswXTtcbiAgICBjYXNlIFwiZGVhcnJheVwiOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJ0b1N0cmluZ1wiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaE9iaiA9IChvYmosIHNlYXJjaEVsZW1lbnQpID0+IHtcbiAgbGV0IHZhbHVlO1xuICBsZXQgbGF5ZXJWYWx1ZTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoc2VhcmNoRWxlbWVudC5vcGVyYW5kKSB7XG4gICAgICBjYXNlIFwiSlNPTkZpbHRlck90aGVyXCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJQYXJhbXMgPSBzZWFyY2hFbGVtZW50LnZhbHVlLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBpZiAoZmlsdGVyUGFyYW1zLmxlbmd0aCAhPT0gMikgYnJlYWs7XG4gICAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IGZpbHRlclBhcmFtc1swXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlclBhcmFtc1sxXTtcbiAgICAgICAgICBpZiAoIWZpbHRlck5hbWUgfHwgIWZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoID0ganNvbkdldChvYmosIGZpbHRlck5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXRjaCB8fCBmaWx0ZXJNYXRjaCAhPT0gZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgaWYgKHZhbHVlICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeU9ic2VydmVcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICBjb25zdCB0b0JlVXBkYXRlZCA9IFtdO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzZWFyY2hQYXRocy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgLy8gYWRkIGNoaWxkRWxlbWVudHMgaW50byB0b0JlVXBkYXRlZFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQucHVzaCguLi5jaGlsZEVsZW1lbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBydW4gb25seSBpZiB0aGUgZWxlbWVudCBoYXMgYWRkZWQgb3IgcmVtb3ZlZCBjaGlsZHJlblxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgZnVuY3Rpb24obXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgICAgaWYgKGlzT3duTXV0YXRpb24obXV0YXRpb25MaXN0KSkgcmV0dXJuO1xuICAgICAgICAgICAgdG9CZVVwZGF0ZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50LmlzRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllcihlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyUmVzdGFydCA9IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA+PSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyUmVzdGFydCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwic2VhcmNoT2JqOiB0cmlnZ2VyZWQgYSByZXN0YXJ0IG9mIHNlYXJjaHBhdGhzIGR1ZTogXCIsIHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIHBhcnNlckNhbGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodmFsdWUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUlubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgYXR0cmliVmFsdWVMaXN0ID0gW107XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSB2YWx1ZWNoaWxkLmdldEF0dHJpYnV0ZShzZWFyY2hFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZSkge1xuICAgICAgICAgICAgICBhdHRyaWJWYWx1ZUxpc3QucHVzaChhdHRyaWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYlZhbHVlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXR0cmliVmFsdWVMaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHNldFZhbHVlID0gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZXRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5Q291bnRFbHRzXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2VhcmNoRWxlbWVudC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGxldCBzdW1QcmljZSA9IDA7XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgc3VtUHJpY2UgKz0gcGFyc2VJbnQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1bVByaWNlID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHN1bVByaWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgY29uc3QgYXJyYXlJbm5lclRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGFycmF5SW5uZXJUZXh0LnB1c2goY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SW5uZXJUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhcnJheUlubmVyVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH0gLy8gc3dpdGNoXG5cbiAgICBpZiAobGF5ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGxheWVyVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmZvcm1hdHRlcikge1xuICAgICAgICBsYXllclZhbHVlID0gcHJvY2Vzc0Zvcm1hdHRlcihsYXllclZhbHVlLCBzZWFyY2hFbGVtZW50LmZvcm1hdHRlcik7XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihzZWFyY2hFbGVtZW50Lm5hbWUsIGxheWVyVmFsdWUpO1xuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcblxuICAgICAgLy8gbWFyayBleGNsdXNpdmUgZWxlbWVudHMgYXMgZm91bmRcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlKSAmJiBzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgZXhjbHVzaXZlRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5pbmNsdWRlcyhleGNsdXNpdmVFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAgICAgICBleGNsdXNpdmVFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJzZWFyY2hPYmogZXJyb3I6IFwiICsgZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgY3VzdG9tRGF0YURlcml2YXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCAwKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJjdXN0b21EYXRhRGVyaXZhdGlvbnMgY2Fubm90IGNvbXB1dGUgY291cG9uQXBwbGljYWJsZVByaWNlOiBcIiArIGUpO1xuICB9XG5cbiAgLy8gUHJvZHVjdCBwYWdlIC0tPiB0cmFuc2ZlciBza3VzIHRvIHNpbmdsZSBsb2NhdGlvblxuICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiKTtcbiAgICBpZiAoc2t1ICE9PSBudWxsICYmIHNrdSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBbc2t1XSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJiYXNrZXRcIikge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5za3VzXCIpO1xuICAgIGlmIChza3VMaXN0ICE9PSBudWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHNrdUxpc3QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHByZXBhcmVDb3JlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIuYnJvd3Nlckxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLnN5c3RlbUxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VmVuZG9yXCIsIG5hdlB0ci52ZW5kb3IpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG59O1xuXG5jb25zdCBhZGRNZXRyaWNzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IHBlcmZNZXRyaWNzID0ge307XG4gIGNvbnN0IHBlcmZOYXZpZ2F0aW9uTWV0cmljcyA9IHdpbmRvd1B0ci5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXTtcbiAgaWYgKHdpbmRvd1B0ci5wZXJmb3JtYW5jZSAmJiBwZXJmTmF2aWdhdGlvbk1ldHJpY3MpIHtcbiAgICBwZXJmTWV0cmljcy5jb25uZWN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLnJlcXVlc3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXNwb25zZUVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXF1ZXN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmRvbSA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUludGVyYWN0aXZlIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUNvbXBsZXRlKTtcbiAgICBwZXJmTWV0cmljcy5sb2FkID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmR1cmF0aW9uKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1ldHJpY3NcIiwgcGVyZk1ldHJpY3MpO1xufTtcblxuLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIFwiZWxlbWVudCBjb2xsZWN0b3JcIiBtb2R1bGUsIHRoZW4gZGF0YSBpcyBleHRyYWN0ZWQgZnJvbSBwcmUtY29sbGVjdGVkIGVsZW1lbnRzXG5jb25zdCBnZXRTT1JHQXJyYXkgPSAoKSA9PiB7XG4gIGNvbnN0IHNjaGVtYU9yZ0VsdHMgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT1cXFwiYXBwbGljYXRpb24vbGQranNvblxcXCJdXCIpO1xuICBjb25zdCBzb3JnQXJyYXkgPSBbXTtcblxuICBmb3IgKGNvbnN0IHNUYWcgb2Ygc2NoZW1hT3JnRWx0cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbnRudCA9IHNUYWcudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBqc29uY29udGVudCA9IEpTT04ucGFyc2UoY250bnQpO1xuICAgICAgc29yZ0FycmF5LnB1c2goanNvbmNvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gc29yZ0FycmF5O1xufTtcbiIsImltcG9ydCB7TE9HX0FQSV9VUkx9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVNb25pdG9yXCIpO1xuY29uc3QgSEVBREVSUyA9IHtcbiAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG59O1xuXG5leHBvcnQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgbW9uaXRvclwiKTtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBhd2FpdGluZyBzY3JhcGluZ1wiKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUsIDUwLCAxMDAwKTtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gc2VuZGluZyBsb2dzXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2VuZCBpbml0aWFsIGxvZyBib2R5IGFuZCBpbmNyZW1lbnRhbCB1cGRhdGUgbG9ncyBvbiBjbG9zZVxuICBhc3luYyBoYW5kbGVDbG9zZUV2ZW50KCkge1xuICAgIC8vIGlmIGluaXRpYWwgbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgc2VuZCB1cGRhdGVzIGFuZCBpbmZvbGF5ZXIgaW4gb25lIGJhdGNoXG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgLy8gaWYgbWFpbiBsb2cgaGFzIGJlZW4gc2VudCwgc2VuZCBpbmNyZW1lbnRhbCB1cGRhdGVzIG9ubHlcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCk7XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVNYWluTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VNYWluTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcXVlc3QgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKSB7XG4gICAgaWYgKCF0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzVXBkYXRlc1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgdGhlcmUgaXMgbm8gaW5jcmVtZW50YWwgeWV0XG4gICAgICAvLyBvciBpZiB0aGUgdXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPSBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9ncyBjaGFuZ2Ugc3RhdHVzOiBcIiwgaGFzQ2hhbmdlZCk7XG4gICAgaWYgKCFoYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICBjb25zdCBsb2dEYXRhID0gYXdhaXQgdGhpcy5wYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCk7XG4gICAgaWYgKGxvZ0RhdGEpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZW5kaW5nIGluY3JlbWVudGFsIGxvZ3NcIiwgbG9nRGF0YSk7XG4gICAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKGxvZ0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUFycml2YWxMb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgb3IgYXJyaXZhbCBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlQXJyaXZhbExvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh3bSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2h3bVwiKTtcbiAgICBpZiAodGhpcy5oaWdoV2F0ZXJNYXJrICE9PSBod20pIHtcbiAgICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgcywgbSwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJtXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDIsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgYSwgZSwgZiwgcywgbSxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gcGFnZWhpZGUgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIC8vIElmIHBhZ2UgaXMgbm90IHZpc2libGUgYW5kIGRvZXNuJ3QgYmVjb21lIHZpc2libGUgd2l0aGluIDMwIHNlY29uZHMsIHNlbmQgbG9nc1xuICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbiB0aW1lb3V0XCIpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgICAgICB9LCAzMDAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIHRpbWVvdXQgd2hlbiBwYWdlIGlzIHZpc2libGUgdG8gbWFrZSBzdXJlIHdlIHNlbmQgdGhlIGxhdGVzdCBsb2dzIHBvc3NpYmxlXG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIGlmIChxdWV1ZWQpIHJldHVybjtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICBpZiAoIXF1ZXVlZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBub3QgcXVldWVkXCIpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vbml0b3I7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2ZldGNoVHJlYXRtZW50cywgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiKTtcblxuY2xhc3MgVHJlYXRtZW50UmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSBib2R5O1xuICAgIHRoaXMudHJlYXRtZW50cyA9IHRyZWF0bWVudHM7XG4gICAgdGhpcy50cmVhdG1lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0cztcbiAgICB0aGlzLmN1cnJlbnRQYWdlVHlwZSA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgICBjb25zdCB0cmVhdG1lbnRzT2JqID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oVFJFQVRNRU5UUykpO1xuICAgIGxldCB0cmVhdG1lbnRzID0gdHJlYXRtZW50c09iaj8udHJlYXRtZW50cztcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0cmVhdG1lbnRzT2JqPy50aW1lc3RhbXA7XG4gICAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0aW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIG5vdCBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlXCIpO1xuICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHRyZWF0bWVudHMsXG4gICAgICB9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICB9XG4gICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB0aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgIGlmIChlbGFwc2VkSG91cnMgPiBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBhcmUgZXhwaXJlZFwiKTtcbiAgICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VpZ2h0c09iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUyk7XG4gICAgICBpZiAod2VpZ2h0c09iaikge1xuICAgICAgICB3ZWlnaHRzT2JqID0gSlNPTi5wYXJzZSh3ZWlnaHRzT2JqKTtcbiAgICAgICAgaWYgKHdlaWdodHNPYmoudGltZXN0YW1wKSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB3ZWlnaHRzT2JqLnRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgICAgIGlmIChlbGFwc2VkSG91cnMgPCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2VpZ2h0c09iaiA9IGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgICAgaWYgKCF3ZWlnaHRzT2JqKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggd2VpZ2h0c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0ge3dlaWdodHM6IHdlaWdodHNPYmosIHRpbWVzdGFtcDogRGF0ZS5ub3coKX07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLldFSUdIVFMsIEpTT04uc3RyaW5naWZ5KHdlaWdodHNPYmopKTtcbiAgICAgIHJldHVybiB3ZWlnaHRzT2JqLndlaWdodHM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpIHtcbiAgICBsZXQgQ1BUID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZVJ1bGVzLlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIENQVCA9IENQVD8uWzBdIHx8IG51bGw7XG4gICAgaWYgKCFDUFQpIHJldHVybiBbXTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlVHlwZSA9IENQVDtcbiAgICBsZXQgbWF0Y2hlZFRyZWF0bWVudHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgIGlmIChtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCBKU09OLnBhcnNlKG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKG10KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQYWdlVHlwZShtdC5wYWdlVHlwZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgJHttYXRjaGVkVHJlYXRtZW50cy5sZW5ndGh9IHRyZWF0bWVudHMgdXNlciBzZWdtZW50IG1hdGNoZWRgKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBnZXR0aW5nIG1hdGNoZWQgcm9ib3RzOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBbXTtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSB0aGlzO1xuICAgIGNvbnN0IHVzZXJTZWdtZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInNcIik7XG4gICAgaWYgKCF1c2VyU2VnbWVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgIGNvbnN0IHVzZXJTZWdtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHNbdXNlclNlZ21lbnRdO1xuICAgICAgaWYgKCF1c2VyU2VnbWVudFdlaWdodHMpIHJldHVybiBbXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRyZWF0bWVudHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnRlZFdlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy53ZWlnaHQ7XG4gICAgICAgIGlmICghc2VnbWVudGVkV2VpZ2h0KSB7XG4gICAgICAgICAgaWYgKHRyZWF0bWVudC5kZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICAgICAgICBzZWdtZW50ZWRXZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnRdPy53ZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChkZWJ1Z01vZGUgJiYgZGVidWdNb2RlID09PSAxKSBzZWdtZW50ZWRXZWlnaHQgPSAxMDA7XG4gICAgICAgICAgaWYgKCFzZWdtZW50ZWRXZWlnaHQpIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRyZWF0bWVudC53ZWlnaHQgPSBzZWdtZW50ZWRXZWlnaHQ7XG4gICAgICAgIGlmICghdHJlYXRtZW50LmFjdGlvbnMuc29tZSgoYSkgPT4gYS52YXJpYW50cykpIHtcbiAgICAgICAgICBtYXRjaGVkVHJlYXRtZW50cy5wdXNoKHRyZWF0bWVudCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlYXRtZW50LmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGlmICh1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHMgJiYgdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXS52YXJpYW50c1t2YXJpYW50S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaCh0cmVhdG1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KG1hdGNoZWRUcmVhdG1lbnRzKSk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoZGVidWdNb2RlKTtcbiAgfVxuXG4gIGNoZWNrUGFnZVR5cGUocGFnZVR5cGVzKSB7XG4gICAgY29uc3Qge2N1cnJlbnRQYWdlVHlwZX0gPSB0aGlzO1xuICAgIGlmIChwYWdlVHlwZXMgPT09IG51bGwgfHwgcGFnZVR5cGVzID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYWdlVHlwZXMpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiUGFnZSBUeXBlcyBzaG91bGQgYmUgYW4gYXJyYXlcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwYWdlVHlwZXNbMF0uc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIHBhZ2VUeXBlcyA9IHBhZ2VUeXBlcy5tYXAoKHB0KSA9PiBwdC5zdWJzdHIoMSkpO1xuICAgICAgcmV0dXJuICFwYWdlVHlwZXMuaW5jbHVkZXMoY3VycmVudFBhZ2VUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VUeXBlcy5pbmNsdWRlcyhjdXJyZW50UGFnZVR5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWF0bWVudFJlcG9zaXRvcnk7XG4iLCJpbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlJlcGxhY2VVdGlsc1wiKTtcblxuY29uc3QgcmVwbGFjZXIgPSBhc3luYyAodmFsdWUsIHJlcGxhY2VGbikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IFtpLCB2YWxdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY3VycmVudFJlcGxhY2VGbiA9IEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSA/IHJlcGxhY2VGbltpXSA6IHJlcGxhY2VGbiB8fCBcIlwiO1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKGN1cnJlbnRSZXBsYWNlRm4pO1xuICAgICAgICB2YWx1ZVtpXSA9IHJlcGxhY2VBbGwodmFsLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlW2ldID0gcmVwbGFjZUZuRXhlY3V0b3IoY3VycmVudFJlcGxhY2VGbiwgdmFsKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pKSB7XG4gICAgZm9yIChjb25zdCByRm4gb2YgcmVwbGFjZUZuKSB7XG4gICAgICBpZiAodHlwZW9mIHJGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyRm4pO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJGbiwgdmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKTtcbiAgICAgIHZhbHVlID0gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlLCBzaW5nbGUgPSBmYWxzZSkge1xuICBpZiAocmVwbGFjZUZuICYmIHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikpIHtcbiAgICBsb2dnZXIubG9nKFwiRXhlY3V0aW5nIHJlcGxhY2UgZnVuY3Rpb246IFwiLCByZXBsYWNlRm4pO1xuICAgIGNvbnN0IHJlcGxhY2VGdW5jdGlvbiA9IEZ1bmN0aW9uKHJlcGxhY2VGbik7XG4gICAgaWYgKHNpbmdsZSkgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gICAgcmV0dXJuIHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pIHtcbiAgY29uc3Qge3N0b3JhZ2UsIGtleSwga2V5RmFsbGJhY2ssIHR5cGV9ID0gcmVwbGFjZUZuO1xuICBzd2l0Y2ggKHN0b3JhZ2UpIHtcbiAgICBjYXNlIFwic2Vzc2lvblwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IG51bGw7XG4gICAgICByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleUZhbGxiYWNrKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IEpTT04ucGFyc2UocmVwbGFjZVZhbCk7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IHJlcGxhY2VWYWxbcmVwbGFjZVZhbC5sZW5ndGggLSAxXVt0eXBlXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGQgbm90IHBhcnNlICR7cmVwbGFjZVZhbH1gKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICAgIGNhc2UgXCJpbmZvLWxheWVyXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXlGYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZXI7XG4iLCJjb25zdCBpbnN0YW5jZU9mQW55ID0gKG9iamVjdCwgY29uc3RydWN0b3JzKSA9PiBjb25zdHJ1Y3RvcnMuc29tZSgoYykgPT4gb2JqZWN0IGluc3RhbmNlb2YgYyk7XG5cbmxldCBpZGJQcm94eWFibGVUeXBlcztcbmxldCBjdXJzb3JBZHZhbmNlTWV0aG9kcztcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxuZnVuY3Rpb24gZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSB7XG4gICAgcmV0dXJuIChpZGJQcm94eWFibGVUeXBlcyB8fFxuICAgICAgICAoaWRiUHJveHlhYmxlVHlwZXMgPSBbXG4gICAgICAgICAgICBJREJEYXRhYmFzZSxcbiAgICAgICAgICAgIElEQk9iamVjdFN0b3JlLFxuICAgICAgICAgICAgSURCSW5kZXgsXG4gICAgICAgICAgICBJREJDdXJzb3IsXG4gICAgICAgICAgICBJREJUcmFuc2FjdGlvbixcbiAgICAgICAgXSkpO1xufVxuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpIHtcbiAgICByZXR1cm4gKGN1cnNvckFkdmFuY2VNZXRob2RzIHx8XG4gICAgICAgIChjdXJzb3JBZHZhbmNlTWV0aG9kcyA9IFtcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuYWR2YW5jZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWUsXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlUHJpbWFyeUtleSxcbiAgICAgICAgXSkpO1xufVxuY29uc3QgY3Vyc29yUmVxdWVzdE1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvbkRvbmVNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5mdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUod3JhcChyZXF1ZXN0LnJlc3VsdCkpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICB9KTtcbiAgICBwcm9taXNlXG4gICAgICAgIC50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAvLyBTaW5jZSBjdXJzb3JpbmcgcmV1c2VzIHRoZSBJREJSZXF1ZXN0ICgqc2lnaCopLCB3ZSBjYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsXG4gICAgICAgIC8vIChzZWUgd3JhcEZ1bmN0aW9uKS5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCQ3Vyc29yKSB7XG4gICAgICAgICAgICBjdXJzb3JSZXF1ZXN0TWFwLnNldCh2YWx1ZSwgcmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2F0Y2hpbmcgdG8gYXZvaWQgXCJVbmNhdWdodCBQcm9taXNlIGV4Y2VwdGlvbnNcIlxuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xuICAgIC8vIFRoaXMgbWFwcGluZyBleGlzdHMgaW4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGJ1dCBkb2Vzbid0IGRvZXNuJ3QgZXhpc3QgaW4gdHJhbnNmb3JtQ2FjaGUuIFRoaXNcbiAgICAvLyBpcyBiZWNhdXNlIHdlIGNyZWF0ZSBtYW55IHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdC5cbiAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KHByb21pc2UsIHJlcXVlc3QpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHR4KSB7XG4gICAgLy8gRWFybHkgYmFpbCBpZiB3ZSd2ZSBhbHJlYWR5IGNyZWF0ZWQgYSBkb25lIHByb21pc2UgZm9yIHRoaXMgdHJhbnNhY3Rpb24uXG4gICAgaWYgKHRyYW5zYWN0aW9uRG9uZU1hcC5oYXModHgpKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgZG9uZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QodHguZXJyb3IgfHwgbmV3IERPTUV4Y2VwdGlvbignQWJvcnRFcnJvcicsICdBYm9ydEVycm9yJykpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICB9KTtcbiAgICAvLyBDYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgIHRyYW5zYWN0aW9uRG9uZU1hcC5zZXQodHgsIGRvbmUpO1xufVxubGV0IGlkYlByb3h5VHJhcHMgPSB7XG4gICAgZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBTcGVjaWFsIGhhbmRsaW5nIGZvciB0cmFuc2FjdGlvbi5kb25lLlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkb25lJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb25Eb25lTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgLy8gUG9seWZpbGwgZm9yIG9iamVjdFN0b3JlTmFtZXMgYmVjYXVzZSBvZiBFZGdlLlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdvYmplY3RTdG9yZU5hbWVzJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQub2JqZWN0U3RvcmVOYW1lcyB8fCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYWtlIHR4LnN0b3JlIHJldHVybiB0aGUgb25seSBzdG9yZSBpbiB0aGUgdHJhbnNhY3Rpb24sIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbWFueS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnc3RvcmUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgOiByZWNlaXZlci5vYmplY3RTdG9yZShyZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFbHNlIHRyYW5zZm9ybSB3aGF0ZXZlciB3ZSBnZXQgYmFjay5cbiAgICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0W3Byb3BdKTtcbiAgICB9LFxuICAgIHNldCh0YXJnZXQsIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uICYmXG4gICAgICAgICAgICAocHJvcCA9PT0gJ2RvbmUnIHx8IHByb3AgPT09ICdzdG9yZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQ7XG4gICAgfSxcbn07XG5mdW5jdGlvbiByZXBsYWNlVHJhcHMoY2FsbGJhY2spIHtcbiAgICBpZGJQcm94eVRyYXBzID0gY2FsbGJhY2soaWRiUHJveHlUcmFwcyk7XG59XG5mdW5jdGlvbiB3cmFwRnVuY3Rpb24oZnVuYykge1xuICAgIC8vIER1ZSB0byBleHBlY3RlZCBvYmplY3QgZXF1YWxpdHkgKHdoaWNoIGlzIGVuZm9yY2VkIGJ5IHRoZSBjYWNoaW5nIGluIGB3cmFwYCksIHdlXG4gICAgLy8gb25seSBjcmVhdGUgb25lIG5ldyBmdW5jIHBlciBmdW5jLlxuICAgIC8vIEVkZ2UgZG9lc24ndCBzdXBwb3J0IG9iamVjdFN0b3JlTmFtZXMgKGJvb28pLCBzbyB3ZSBwb2x5ZmlsbCBpdCBoZXJlLlxuICAgIGlmIChmdW5jID09PSBJREJEYXRhYmFzZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gJiZcbiAgICAgICAgISgnb2JqZWN0U3RvcmVOYW1lcycgaW4gSURCVHJhbnNhY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0b3JlTmFtZXMsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZnVuYy5jYWxsKHVud3JhcCh0aGlzKSwgc3RvcmVOYW1lcywgLi4uYXJncyk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuc2V0KHR4LCBzdG9yZU5hbWVzLnNvcnQgPyBzdG9yZU5hbWVzLnNvcnQoKSA6IFtzdG9yZU5hbWVzXSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh0eCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIEN1cnNvciBtZXRob2RzIGFyZSBzcGVjaWFsLCBhcyB0aGUgYmVoYXZpb3VyIGlzIGEgbGl0dGxlIG1vcmUgZGlmZmVyZW50IHRvIHN0YW5kYXJkIElEQi4gSW5cbiAgICAvLyBJREIsIHlvdSBhZHZhbmNlIHRoZSBjdXJzb3IgYW5kIHdhaXQgZm9yIGEgbmV3ICdzdWNjZXNzJyBvbiB0aGUgSURCUmVxdWVzdCB0aGF0IGdhdmUgeW91IHRoZVxuICAgIC8vIGN1cnNvci4gSXQncyBraW5kYSBsaWtlIGEgcHJvbWlzZSB0aGF0IGNhbiByZXNvbHZlIHdpdGggbWFueSB2YWx1ZXMuIFRoYXQgZG9lc24ndCBtYWtlIHNlbnNlXG4gICAgLy8gd2l0aCByZWFsIHByb21pc2VzLCBzbyBlYWNoIGFkdmFuY2UgbWV0aG9kcyByZXR1cm5zIGEgbmV3IHByb21pc2UgZm9yIHRoZSBjdXJzb3Igb2JqZWN0LCBvclxuICAgIC8vIHVuZGVmaW5lZCBpZiB0aGUgZW5kIG9mIHRoZSBjdXJzb3IgaGFzIGJlZW4gcmVhY2hlZC5cbiAgICBpZiAoZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKS5pbmNsdWRlcyhmdW5jKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICAgICAgICBmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChjdXJzb3JSZXF1ZXN0TWFwLmdldCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXG4gICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICAgIHJldHVybiB3cmFwKGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICByZXR1cm4gd3JhcEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAvLyBUaGlzIGRvZXNuJ3QgcmV0dXJuLCBpdCBqdXN0IGNyZWF0ZXMgYSAnZG9uZScgcHJvbWlzZSBmb3IgdGhlIHRyYW5zYWN0aW9uLFxuICAgIC8vIHdoaWNoIGlzIGxhdGVyIHJldHVybmVkIGZvciB0cmFuc2FjdGlvbi5kb25lIChzZWUgaWRiT2JqZWN0SGFuZGxlcikuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pXG4gICAgICAgIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih2YWx1ZSk7XG4gICAgaWYgKGluc3RhbmNlT2ZBbnkodmFsdWUsIGdldElkYlByb3h5YWJsZVR5cGVzKCkpKVxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHZhbHVlLCBpZGJQcm94eVRyYXBzKTtcbiAgICAvLyBSZXR1cm4gdGhlIHNhbWUgdmFsdWUgYmFjayBpZiB3ZSdyZSBub3QgZ29pbmcgdG8gdHJhbnNmb3JtIGl0LlxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHdyYXAodmFsdWUpIHtcbiAgICAvLyBXZSBzb21ldGltZXMgZ2VuZXJhdGUgbXVsdGlwbGUgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0IChlZyB3aGVuIGN1cnNvcmluZyksIGJlY2F1c2VcbiAgICAvLyBJREIgaXMgd2VpcmQgYW5kIGEgc2luZ2xlIElEQlJlcXVlc3QgY2FuIHlpZWxkIG1hbnkgcmVzcG9uc2VzLCBzbyB0aGVzZSBjYW4ndCBiZSBjYWNoZWQuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCUmVxdWVzdClcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QodmFsdWUpO1xuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgdHJhbnNmb3JtZWQgdGhpcyB2YWx1ZSBiZWZvcmUsIHJldXNlIHRoZSB0cmFuc2Zvcm1lZCB2YWx1ZS5cbiAgICAvLyBUaGlzIGlzIGZhc3RlciwgYnV0IGl0IGFsc28gcHJvdmlkZXMgb2JqZWN0IGVxdWFsaXR5LlxuICAgIGlmICh0cmFuc2Zvcm1DYWNoZS5oYXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpO1xuICAgIC8vIE5vdCBhbGwgdHlwZXMgYXJlIHRyYW5zZm9ybWVkLlxuICAgIC8vIFRoZXNlIG1heSBiZSBwcmltaXRpdmUgdHlwZXMsIHNvIHRoZXkgY2FuJ3QgYmUgV2Vha01hcCBrZXlzLlxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdHJhbnNmb3JtQ2FjaGUuc2V0KHZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQobmV3VmFsdWUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuY29uc3QgdW53cmFwID0gKHZhbHVlKSA9PiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcblxuZXhwb3J0IHsgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGFzIGEsIGluc3RhbmNlT2ZBbnkgYXMgaSwgcmVwbGFjZVRyYXBzIGFzIHIsIHVud3JhcCBhcyB1LCB3cmFwIGFzIHcgfTtcbiIsImltcG9ydCB7IHcgYXMgd3JhcCwgciBhcyByZXBsYWNlVHJhcHMgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcbmV4cG9ydCB7IHUgYXMgdW53cmFwLCB3IGFzIHdyYXAgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcblxuLyoqXG4gKiBPcGVuIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKiBAcGFyYW0gdmVyc2lvbiBTY2hlbWEgdmVyc2lvbi5cbiAqIEBwYXJhbSBjYWxsYmFja3MgQWRkaXRpb25hbCBjYWxsYmFja3MuXG4gKi9cbmZ1bmN0aW9uIG9wZW5EQihuYW1lLCB2ZXJzaW9uLCB7IGJsb2NrZWQsIHVwZ3JhZGUsIGJsb2NraW5nLCB0ZXJtaW5hdGVkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICBjb25zdCBvcGVuUHJvbWlzZSA9IHdyYXAocmVxdWVzdCk7XG4gICAgaWYgKHVwZ3JhZGUpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCd1cGdyYWRlbmVlZGVkJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB1cGdyYWRlKHdyYXAocmVxdWVzdC5yZXN1bHQpLCBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCB3cmFwKHJlcXVlc3QudHJhbnNhY3Rpb24pLCBldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoZXZlbnQpID0+IGJsb2NrZWQoXG4gICAgICAgIC8vIENhc3RpbmcgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC1ET00tbGliLWdlbmVyYXRvci9wdWxsLzE0MDVcbiAgICAgICAgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgZXZlbnQpKTtcbiAgICB9XG4gICAgb3BlblByb21pc2VcbiAgICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGlmICh0ZXJtaW5hdGVkKVxuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB0ZXJtaW5hdGVkKCkpO1xuICAgICAgICBpZiAoYmxvY2tpbmcpIHtcbiAgICAgICAgICAgIGRiLmFkZEV2ZW50TGlzdGVuZXIoJ3ZlcnNpb25jaGFuZ2UnLCAoZXZlbnQpID0+IGJsb2NraW5nKGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIGV2ZW50KSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICByZXR1cm4gb3BlblByb21pc2U7XG59XG4vKipcbiAqIERlbGV0ZSBhIGRhdGFiYXNlLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxuICovXG5mdW5jdGlvbiBkZWxldGVEQihuYW1lLCB7IGJsb2NrZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKTtcbiAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoZXZlbnQpID0+IGJsb2NrZWQoXG4gICAgICAgIC8vIENhc3RpbmcgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC1ET00tbGliLWdlbmVyYXRvci9wdWxsLzE0MDVcbiAgICAgICAgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xufVxuXG5jb25zdCByZWFkTWV0aG9kcyA9IFsnZ2V0JywgJ2dldEtleScsICdnZXRBbGwnLCAnZ2V0QWxsS2V5cycsICdjb3VudCddO1xuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHtcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxuICAgICAgICB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApKVxuICAgICAgICByZXR1cm4gY2FjaGVkTWV0aG9kcy5nZXQocHJvcCk7XG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XG4gICAgY29uc3QgdXNlSW5kZXggPSBwcm9wICE9PSB0YXJnZXRGdW5jTmFtZTtcbiAgICBjb25zdCBpc1dyaXRlID0gd3JpdGVNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKTtcbiAgICBpZiAoXG4gICAgLy8gQmFpbCBpZiB0aGUgdGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHRhcmdldC4gRWcsIGdldEFsbCBpc24ndCBpbiBFZGdlLlxuICAgICEodGFyZ2V0RnVuY05hbWUgaW4gKHVzZUluZGV4ID8gSURCSW5kZXggOiBJREJPYmplY3RTdG9yZSkucHJvdG90eXBlKSB8fFxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIChzdG9yZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogdW5kZWZpbmVkIGd6aXBwcyBiZXR0ZXIsIGJ1dCBmYWlscyBpbiBFZGdlIDooXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdHguc3RvcmU7XG4gICAgICAgIGlmICh1c2VJbmRleClcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xuICAgICAgICAvLyBNdXN0IHJlamVjdCBpZiBvcCByZWplY3RzLlxuICAgICAgICAvLyBJZiBpdCdzIGEgd3JpdGUgb3BlcmF0aW9uLCBtdXN0IHJlamVjdCBpZiB0eC5kb25lIHJlamVjdHMuXG4gICAgICAgIC8vIE11c3QgcmVqZWN0IHdpdGggb3AgcmVqZWN0aW9uIGZpcnN0LlxuICAgICAgICAvLyBNdXN0IHJlc29sdmUgd2l0aCBvcCB2YWx1ZS5cbiAgICAgICAgLy8gTXVzdCBoYW5kbGUgYm90aCBwcm9taXNlcyAobm8gdW5oYW5kbGVkIHJlamVjdGlvbnMpXG4gICAgICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGFyZ2V0W3RhcmdldEZ1bmNOYW1lXSguLi5hcmdzKSxcbiAgICAgICAgICAgIGlzV3JpdGUgJiYgdHguZG9uZSxcbiAgICAgICAgXSkpWzBdO1xuICAgIH07XG4gICAgY2FjaGVkTWV0aG9kcy5zZXQocHJvcCwgbWV0aG9kKTtcbiAgICByZXR1cm4gbWV0aG9kO1xufVxucmVwbGFjZVRyYXBzKChvbGRUcmFwcykgPT4gKHtcbiAgICAuLi5vbGRUcmFwcyxcbiAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXG4gICAgaGFzOiAodGFyZ2V0LCBwcm9wKSA9PiAhIWdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApLFxufSkpO1xuXG5leHBvcnQgeyBkZWxldGVEQiwgb3BlbkRCIH07XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVfY2FjaGVcIixcbiAgdmVyc2lvbjogMSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImluZm9DYWNoZVwiLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJpeF9za3VcIixcbiAgICAgICAgZmllbGRzOiBcInNrdVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcInNrdVwifSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJcbmltcG9ydCB7b3BlbkRCfSBmcm9tIFwiaWRiXCI7XG5pbXBvcnQge2ZldGNoUHJvZHVjdEluZm99IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeVwiKTtcbmNsYXNzIEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBhc3luYyBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IHtkYk5hbWUsIHZlcnNpb259ID0gY29uZmlnO1xuICAgIGNvbnN0IGRiID0gYXdhaXQgb3BlbkRCKGRiTmFtZSwgdmVyc2lvbiwge1xuICAgICAgdXBncmFkZShkYiwgb2xkVmVyc2lvbikge1xuICAgICAgICBzd2l0Y2ggKG9sZFZlcnNpb24pIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBkYi5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuaW5kZXhlZERCID0gZGI7XG4gIH1cblxuICBhc3luYyBnZXREQigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUodGhpcy5pbmRleGVkREIpO1xuICAgICAgICB9XG4gICAgICB9LCAyNSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQcm9kdWN0IGluZm8gZGIgbm90IGluaXRpYWxpemVkIHdpdGhpbiB0aGUgYWxsb3R0ZWQgdGltZVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDMwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0U3RvcmUocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICByZXR1cm4gZGIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIHJlYWR3cml0ZSA/IFwicmVhZHdyaXRlXCIgOiBcInJlYWRvbmx5XCIpLnN0b3JlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShwYXlsb2FkKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmdldFN0b3JlKHRydWUpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICBjb25zdCBzYXZlUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgbG9hZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgIGxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICBzYXZlUHJvbWlzZXMucHVzaChzdG9yZS5wdXQobG9hZCkpO1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoc2F2ZVByb21pc2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF5bG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICBhd2FpdCBzdG9yZS5wdXQocGF5bG9hZCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xlYXIoKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmdldFN0b3JlKHRydWUpO1xuICAgIGF3YWl0IHN0b3JlLmNsZWFyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHNrdSkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmdldChjb25maWcuc3RvcmUubmFtZSwgc2t1KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYXN5bmMgY291bnQoKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGIuY291bnQoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBnZXRDdXJzb3IoKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgY3Vyc29yID0gYXdhaXQgZGIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUpLnN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICByZXR1cm4gY3Vyc29yO1xuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImNoZWNrLWV4aXN0aW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5nZXRDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGN1cnNvci52YWx1ZS50aW1lc3RhbXA7XG4gICAgICBjb25zdCBlbGFwc2VkU2Vjb25kcyA9IChEYXRlLm5vdygpIC8gMTAwMCkgLSB0aW1lc3RhbXA7XG4gICAgICAvLyBSZS1mZXRjaCBwcm9kdWN0IGluZm8gb25jZSBhIGRheVxuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgODY0MDApIHJldHVybjtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gaXMgZXhwaXJlZFwiKTtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hpbmctcHJvZC1pbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvUHJvbWlzZSA9IGZldGNoUHJvZHVjdEluZm8oKTtcbiAgICBsZXQgY2xlYXJQcm9taXNlID0gbnVsbDtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykgY2xlYXJQcm9taXNlID0gdGhpcy5jbGVhcigpO1xuICAgIGNvbnN0IFtwcm9kdWN0SW5mb0FycmF5XSA9IGF3YWl0IFByb21pc2UuYWxsKFtwcm9kdWN0SW5mb1Byb21pc2UsIGNsZWFyUHJvbWlzZV0pO1xuICAgIGlmICghcHJvZHVjdEluZm9BcnJheSB8fCAhcHJvZHVjdEluZm9BcnJheS5sZW5ndGgpIHJldHVybjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXByb2QtaW5mb1wiKTtcbiAgICBhd2FpdCB0aGlzLnNhdmUodGhpcy5wcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBlcnNpc3RlZC1wcm9kLWluZm9cIik7XG4gIH1cblxuICBwcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkge1xuICAgIGNvbnN0IHBheWxvYWRzID0gW107XG4gICAgY29uc3QgZmllbGROYW1lcyA9IHByb2R1Y3RJbmZvQXJyYXkuc2hpZnQoKTtcbiAgICBmaWVsZE5hbWVzLnNoaWZ0KCk7XG4gICAgZm9yIChjb25zdCBpbmZvIG9mIHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7c2t1OiBpbmZvLnNoaWZ0KCl9O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBheWxvYWRbZmllbGROYW1lc1tpXV0gPSBpbmZvW2ldIHx8IG51bGw7XG4gICAgICB9XG4gICAgICBwYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeTtcbiIsImltcG9ydCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQge2lkYlJlYWR5fSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgU3RvcmUgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCBpbnN0YW5jZSA9IG51bGw7XG4gIHJldHVybiB7XG4gICAgZ2V0SW5zdGFuY2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGluc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgIGF3YWl0IGlkYlJlYWR5KCk7XG4gICAgICAgIGluc3RhbmNlID0gbmV3IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkoKTtcbiAgICAgICAgLy8gSGlkZSB0aGUgY29uc3RydWN0b3Igc28gdGhlIHJldHVybmVkIG9iamVjdCBjYW4ndCBiZSBuZXcnZC4uLlxuICAgICAgICBpbnN0YW5jZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfSxcbiAgfTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkFjdGlvbkNvbmRpdGlvblV0aWxzXCIpO1xuXG5jb25zdCBjaGVja0FjdGlvbkNvbmRpdGlvbiA9IGFzeW5jIChjb25kaXRpb24pID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkFjdGlvbiBjb25kaXRpb24gZm91bmQ6IFwiLCBjb25kaXRpb24pO1xuICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gW107XG4gIGNvbnN0IHthdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgb3BlcmF0b3IsIHNlbGVjdG9yLCB0eXBlLCB2YWx1ZSwgY2hhaW59ID0gY29uZGl0aW9uO1xuICBjb25zdCBjb25kaXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBjb25kaXRpb25FbGVtZW50cykge1xuICAgIGlmIChhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIHR5cGUsIG9wZXJhdG9yLCBhdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUsIGNoYWluKSkge1xuICAgICAgZWxpZ2libGVFbGVtZW50cy5wdXNoKCQoZWxlbWVudCkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWxpZ2libGVFbGVtZW50cztcbn07XG5cbmNvbnN0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIgPSBhc3luYyAoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTa3UgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgY29uc3QgZGIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICAgICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoZWxlbWVudFNrdSk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwcm9kdWN0SW5mbz8uW29wZXJhdG9yXTtcbiAgICAgIC8vIHJ1blRpbWVWYWx1ZSBtYXkgYmUgMFxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fCBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUHJvZHVjdCBpbmZvIGlzIGVtcHR5XCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGNoYWluKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgY2hhaW4udHlwZSwgY2hhaW4ub3BlcmF0b3IsXG4gICAgICAgICAgICBjaGFpbi5hdHRyaWJ1dGUsIGNoYWluLmlubmVyX2NvbmRpdGlvbiwgY2hhaW4udmFsdWUsIGNoYWluLmNoYWluKTtcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXNlIFwiZnVuY3Rpb25cIjoge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZm4gPSBGdW5jdGlvbihcImVsXCIsIG9wZXJhdG9yKTtcbiAgICAgICAgcmV0dXJuIGZuKGVsZW1lbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBleGVjdXRpbmcgZnVuY3Rpb24gYWN0aW9uIGNvbmRpdGlvblwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tBY3Rpb25Db25kaXRpb247XG4iLCJpbXBvcnQge3N0eWxlQXBwbGljYXRvciwgZGVsYXksIGlkbGVUaW1lcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge3JlcGxhY2VBbGwsIHR1cmtpc2hUb0xvd2VyfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgSURMRV9USU1FT1VUfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgcmVwbGFjZXIgZnJvbSBcIi4vcmVwbGFjZS11dGlsc1wiO1xuaW1wb3J0IGNoZWNrQWN0aW9uQ29uZGl0aW9uIGZyb20gXCIuL2FjdGlvbi1jb25kaXRpb24tdXRpbFwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5hc3luYyBmdW5jdGlvbiBhcHBseUFjdGlvbnMoYWN0aW9ucykge1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlQXBwbHlBY3Rpb25zXCIpO1xuICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUd9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZW1vdmluZzogXCIsIHNlbGVjdG9yKTtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmJlZm9yZSh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZnRlclwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYWZ0ZXI6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hZnRlcih2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhcHBlbmRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwZW5kaW5nIHZhbHVlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vZGFsXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudC5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGVsbSA9PSBlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzcGxheU1vZGFsKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicG9wdXBcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSAhPT0gMCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiUG9wdXAgYWxyZWFkeSBkaXNwbGF5ZWQgaW4gc2Vzc2lvblwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgUG9wdXA6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAocFR5cGUpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZXhpdEludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGV4aXQgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtyLCBkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImRcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBkID09PSBcInN0cmluZ1wiICYmICFyLmluY2x1ZGVzKGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWRsZVRpbWVyKElETEVfVElNRU9VVCwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiY29weUludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGNvcHkgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXBwZW5kIHBvcHVwIHRvIGJvZHkgYWZ0ZXIgdGltZW91dCBleHBpcmVzXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlQb3B1cCgpO1xuICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgVHlwZTogJHt0eXBlfSBub3QgZm91bmQgZm9yIG9wZXJhdG9yOiAke29wZXJhdG9yfWApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIHRleHQtdHJhbnNmb3JtIHR5cGVcIik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiYWktc3VnZ2VzdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRpdGxlLWNoYW5nZVwiOiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcImdldHRpbmcgdGl0bGUgc3VnZ2VzdGlvbnNcIik7XG4gICAgICAgICAgY29uc3QgZmluYWxUaXRsZSA9IGF3YWl0IHByZXBhcmVGaW5hbFRpdGxlKCk7XG4gICAgICAgICAgaWYgKCFmaW5hbFRpdGxlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ2Fubm90IGFwcGx5IHRpdGxlLWNoYW5nZSB0aGVyZSBpcyBubyBzdWdnZXN0aW9uIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5jb250ZW50cygpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVUeXBlID09IDM7XG4gICAgICAgICAgfSlbMF0ubm9kZVZhbHVlID0gZmluYWxUaXRsZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkLWRlc2NyaXB0aW9uXCI6IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0dGluZyBkZXNjcmlwdGlvbiBzdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkVsbSA9IGF3YWl0IHByZXBhcmVEZXNjRWxtKHZhbHVlKTtcbiAgICAgICAgICBpZiAoIWRlc2NyaXB0aW9uRWxtKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ2Fubm90IGFwcGx5IGFkZC1kZXNjcmlwdGlvbiB0aGVyZSBpcyBubyBzdWdnZXN0aW9uIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUoZGVzY3JpcHRpb25FbG0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIG9wZXJhdG9yIGV4aXN0cyB5ZXRcIiwgb3BlcmF0b3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBwcmVwYXJlRGVzY0VsbSA9IGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KHNrdSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mby5tYXJrZXRpbmdDb3B5KSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBObyBkZXNjcmlwdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWRIdG1sU3RyaW5nID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8ubWFya2V0aW5nQ29weSwgdmFsdWUpO1xuICAgIHJldHVybiB1cGRhdGVkSHRtbFN0cmluZztcbiAgfTtcblxuICBjb25zdCBwcmVwYXJlRmluYWxUaXRsZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3UpO1xuICAgIGlmICghcHJvZHVjdEluZm8udGl0bGVBdWdtZW50KSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBObyB0aXRsZSBzdWdnZXN0aW9uIGZvdW5kIGZvciBza3UgJHtza3V9YCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gcHJvZHVjdEluZm8udGl0bGVBdWdtZW50ICsgYCAoJHtza3V9KWA7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBjb25zdCByZXBsYWNlV2l0aFZhbCA9ICh2YWx1ZSwgaHRtbFN0cikgPT4ge1xuICAgIGlmICh2YWx1ZSAmJiBodG1sU3RyLmluY2x1ZGVzKFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIikpIHtcbiAgICAgIGh0bWxTdHIgPSByZXBsYWNlQWxsKGh0bWxTdHIsIFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIiwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbFN0cjtcbiAgfTtcblxuICBjb25zdCBnZXRQcm9kdWN0SW5mbyA9IGFzeW5jICh0eXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKSA9PiB7XG4gICAgLy8gZ2V0IGtleXMgb2YgcHJvZHVjdEluZm9cbiAgICBjb25zdCBza3VMaXN0ID0gcHJvZHVjdEluZm9TdG9yYWdlID09PSBcImJhc2tldFwiID9cbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIiwgdHJ1ZSkgOlxuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gICAgbGV0IHJlcyA9IG51bGw7XG4gICAgaWYgKCFza3VMaXN0IHx8IHNrdUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc2t1IGZvdW5kXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KHNrdUxpc3RbMF0pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyB0cmFuc2NhdGlvbkluMldlZWtzIFwiLCBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBBZGRUb0NhcnRDb3VudCBcIiwgcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcInByb2R1Y3RWaWV3Q291bnRcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yXCIsIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIm5vIHN1Y2ggdHlwZSBmb3VuZCBmb3IgcHJvZHVjdEluZm9Mb29rdXAgb3BlcmF0b3I6IFwiKyB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlID0gYXN5bmMgKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRUaXRsZXMgPSAhQXJyYXkuaXNBcnJheSh0aXRsZXMpID8gW3RpdGxlc10gOiB0aXRsZXM7XG4gICAgZm9yIChjb25zdCBwYXJzZWRUaXRsZSBvZiBwYXJzZWRUaXRsZXMpIHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gcGFyc2VkVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICBpZiAoaWQgJiYgaWQgPT09IFwibmQtcG9wdXBfX3dyYXBwZXJcIikge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5jb250YWlucyhcIm5kLW1vZGFsX193cmFwcGVyXCIpKSB7XG4gICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UG9wdXAgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgPiAwKSByZXR1cm47XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDEpO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuXG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfSwgMTUwMDApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNb2RhbCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikpIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBvcHVwID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIGlzTW9kYWw9ZmFsc2UpID0+IHtcbiAgICAvLyBDcmVhdGUgcG9wdXAgd3JhcHBlclxuICAgIGNvbnN0IHBvcHVwV3JhcHBlciA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtcG9wdXBfX3dyYXBwZXJcIik7XG4gICAgaWYgKGlzTW9kYWwpIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtbW9kYWxfX3dyYXBwZXJcIik7XG4gICAgaWYgKCFpc01vZGFsKSBwb3B1cFdyYXBwZXIuaWQgPSBcIm5kLXBvcHVwX193cmFwcGVyXCI7XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uU3R5bGUgPSBpc01vZGFsID8gXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlX19jb2xvcmVkXCIgOiBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VcIjtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQocG9wdXBDbG9zZUJ1dHRvblN0eWxlKTtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGlmIChpc01vZGFsKSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudFNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRlbnRTZWxlY3RvcikpO1xuICAgICAgd2hpbGUgKHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikgJiYgY29udGVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCBjb250ZW50cy5zaGlmdCgpLnNyYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGZyb20gYWN0aW9uIGFuZCBhcHBlbmQgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgdGVtcGxhdGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB2YWx1ZS50cmltKCk7XG4gICAgY29uc3QgcG9wdXAgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZUJ1dHRvbik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgIC8vIFJlbW92ZSBvbGQgcG9wdXAgaWYgZXhpc3RzIGJlZm9yZSBhcHBlbmRpbmcgbmV3IG9uZVxuICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dhcE5vZGVzID0gZnVuY3Rpb24gc3dhcE5vZGVzKG4xLCBuMikge1xuICAgIGNvbnN0IHAxID0gbjEucGFyZW50Tm9kZTtcbiAgICBjb25zdCBwMiA9IG4yLnBhcmVudE5vZGU7XG4gICAgbGV0IGkxO1xuICAgIGxldCBpMjtcblxuICAgIGlmICghcDEgfHwgIXAyIHx8IHAxLmlzRXF1YWxOb2RlKG4yKSB8fCBwMi5pc0VxdWFsTm9kZShuMSkpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMS5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMSkpIHtcbiAgICAgICAgaTEgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDIuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjIpKSB7XG4gICAgICAgIGkyID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcbiAgICAgIGkyKys7XG4gICAgfVxuICAgIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcbiAgICBwMi5pbnNlcnRCZWZvcmUobjEsIHAyLmNoaWxkcmVuW2kyXSk7XG4gIH07XG5cbiAgY29uc3Qgd2FpdEZvckpRdWVyeSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghd2luZG93LmpRdWVyeSkge1xuICAgICAgICBsb2dnZXIubG9nKFwialF1ZXJ5IG5vdCBmb3VuZCwgcmV0cnlpbmdcIik7XG4gICAgICAgIGNvbnN0IGpRdWVyeUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWN0aW9uQXBwbGljYXRvciA9IGFzeW5jIChhY3Rpb25zKSA9PiB7XG4gICAgaWYgKGF3YWl0IHdhaXRGb3JKUXVlcnkoKSkge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBpZiAoIWVsaWdpYmxlRWxlbWVudHMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGRuJ3QgYXBwbHkgYWN0aW9uICR7SlNPTi5zdHJpbmdpZnkoYWN0aW9uKX0gd2l0aCBlcnJvciAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVycm9yLWFwcGx5aW5nLWFjdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJKcXVlcnkgbm90IGZvdW5kIG9uIHdpbmRvd1wiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQXBwbHkgYWN0aW9uc1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBhY3Rpb25BcHBsaWNhdG9yKGFjdGlvbnMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGRlZmF1bHQgYXBwbHlBY3Rpb25zO1xuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXS5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0ID0gMSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHJlbGVhc2VdID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPD0gMDtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgcmVsZWFzZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcy5mb3JFYWNoKChxdWV1ZSkgPT4gcXVldWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LnJlamVjdCh0aGlzLl9jYW5jZWxFcnJvcikpKTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICB9XG4gICAgX2Rpc3BhdGNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWVFbnRyeSA9IChfYSA9IHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghcXVldWVFbnRyeSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgLT0gd2VpZ2h0O1xuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy5fdmFsdWUgKyAxO1xuICAgICAgICAgICAgcXVldWVFbnRyeS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihwcmV2aW91c1dlaWdodCldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5mb3JFYWNoKCh3YWl0ZXIpID0+IHdhaXRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIE11dGV4IHtcbiAgICBjb25zdHJ1Y3RvcihjYW5jZWxFcnJvcikge1xuICAgICAgICB0aGlzLl9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEsIGNhbmNlbEVycm9yKTtcbiAgICB9XG4gICAgYWNxdWlyZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQxKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgWywgcmVsZWFzZXJdID0geWllbGQgdGhpcy5fc2VtYXBob3JlLmFjcXVpcmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLnJ1bkV4Y2x1c2l2ZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKCk7XG4gICAgfVxuICAgIHJlbGVhc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKSlcbiAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5jYW5jZWwoKTtcbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHdpdGhUaW1lb3V0KHN5bmMsIHRpbWVvdXQsIHRpbWVvdXRFcnJvciA9IEVfVElNRU9VVCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjcXVpcmU6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgc3luYy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCByZWxlYXNlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHRpY2tldFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZSh3ZWlnaHQpIHtcbiAgICAgICAgICAgIHN5bmMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3luYy5jYW5jZWwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FpdEZvclVubG9jazogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3luYy53YWl0Rm9yVW5sb2NrKHdlaWdodCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCh0aW1lb3V0RXJyb3IpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogKCkgPT4gc3luYy5pc0xvY2tlZCgpLFxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4gc3luYy5nZXRWYWx1ZSgpLFxuICAgICAgICBzZXRWYWx1ZTogKHZhbHVlKSA9PiBzeW5jLnNldFZhbHVlKHZhbHVlKSxcbiAgICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpc25lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIHRyeUFjcXVpcmUoc3luYywgYWxyZWFkeUFjcXVpcmVkRXJyb3IgPSBFX0FMUkVBRFlfTE9DS0VEKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gd2l0aFRpbWVvdXQoc3luYywgMCwgYWxyZWFkeUFjcXVpcmVkRXJyb3IpO1xufVxuXG5leHBvcnQgeyBFX0FMUkVBRFlfTE9DS0VELCBFX0NBTkNFTEVELCBFX1RJTUVPVVQsIE11dGV4LCBTZW1hcGhvcmUsIHRyeUFjcXVpcmUsIHdpdGhUaW1lb3V0IH07XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBhcHBseUFjdGlvbnMgZnJvbSBcIi4uL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleFwiO1xuaW1wb3J0IHtcbiAgYWRkVHJlYXRtZW50LFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGREYXRhTGlzdGVuZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFRSRUFUTUVOVF9SQVRJTyxcbiAgTU9CSUxFX01FRElBX1FVRVJZLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBkZXRlcm1pbmVQY3QsXG4gIHByZXBhcmVBY3Rpb25zLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZSwgaXNPbn0gPSBib2R5O1xuICAgIHRoaXMuaXNPbiA9IGlzT247XG4gICAgdGhpcy5lbmdhZ2VtZW50TG9jayA9IHt9O1xuICAgIHRoaXMucGFnZVR5cGUgPSBwYWdlVHlwZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZTtcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICAgIHRoaXMucmVBcHBseVRyZWF0bWVudHNNYXAgPSB7fTtcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzID0gW107XG4gICAgdGhpcy5tYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cztcbiAgICB0aGlzLmlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3RzKCkge1xuICAgIGNvbnN0IHJvYm90UHJvbWlzZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnQpIGNvbnRpbnVlO1xuICAgICAgICByb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBlbmdhZ2luZyByb2JvdCAke3RyZWF0bWVudC5pZH06ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChyb2JvdFByb21pc2VzKTtcbiAgICB0aGlzLmluaXRpYXRlUmVhcHBseVJvYm90TWFwKCk7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGFjdGlvbnMsXG4gICAgICBlbGlnaWJpbGl0eVJ1bGVTZXQsXG4gICAgICBkZXZpY2UsXG4gICAgICBkZXBlbmRhbnRfb25fdHJlYXRtZW50LFxuICAgICAgYnVzaW5lc3NSdWxlU2V0LFxuICAgICAgd2VpZ2h0LFxuICAgICAgZGVsYXksXG4gICAgICBoZWxwZXJzLFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgICAgcHJlcGFyZUFuZEFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gZW5nYWdlbWVudExvY2tbaWRdIHx8IG5ldyBNdXRleCgpO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBlbmdhZ2VtZW50TG9ja1tpZF0uYWNxdWlyZSgpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNPbikge1xuICAgICAgICAgIGFkZFRyZWF0bWVudChpZCwgbnVsbCwgbnVsbCwgXCJza2lwcGVkXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRTa2lwUmF0aW8gPSB3ZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gd2VpZ2h0IHx8IFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgICAvLyBEZXRlcm1pbmluZyBpZGVudGlmaWVyIGZvciBjYWxjdWxhdGluZyB0cmVhdG1lbnQgcGVyY2VudGFnZSAodHJlYXRtZW50UGN0KVxuICAgICAgICBjb25zdCBkZXRlcm1pbmluZ0lkZW50aWZpZXIgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50IHx8IGlkO1xuXG4gICAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIDEwMCB3aGVuIGRlYnVnIG1vZGUgaXMgMSwgZW5zdXJpbmcgbm8gdHJlYXRtZW50cyBhcmUgc2tpcHBlZFxuICAgICAgICBjb25zdCB0cmVhdG1lbnRQY3QgPSBkZWJ1Z01vZGUgPT09IDEgPyAxMDAgOiBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIGRldGVybWluaW5nSWRlbnRpZmllcik7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJlYXRtZW50UGN0IDwgdHJlYXRtZW50U2tpcFJhdGlvKSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgVHJlYXRtZW50ICR7aWR9IHNraXBwZWQgZHVlIHRvIHRyZWF0bWVudCBzcGxpdCByYXRpb2ApO1xuICAgICAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIG51bGwsIFwic2tpcHBlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6XCIsIGlkKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmVsZWFzZSgpO1xuICAgICAgdGhpcy5hZGRSZWFwcGx5RXZlbnQodHJlYXRtZW50KTtcbiAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBlbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGVscGVycykgJiYgaGVscGVycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhlbHBlclJvYm90UHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICAgIGlmICghaGVscGVycy5pbmNsdWRlcyh0cmVhdG1lbnQuaWQpKSBjb250aW51ZTtcbiAgICAgICAgaGVscGVyUm9ib3RQcm9taXNlcy5wdXNoKHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChoZWxwZXJSb2JvdFByb21pc2VzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpIHtcbiAgICBjb25zdCBbcHJlcGFyZWQsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkKTtcbiAgICBpZiAocmVzID09PSB0cnVlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImFwcGxpZWRcIik7XG4gICAgfSBlbHNlIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRSZWFwcGx5RXZlbnQodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge3BhZ2VUeXBlLCByZUFwcGx5VHJlYXRtZW50c01hcH0gPSB0aGlzO1xuICAgIGNvbnN0IHtpZCwgcmVhcHBseV9ldmVudCwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGV9ID0gdHJlYXRtZW50O1xuICAgIGlmIChyZWFwcGx5X2V2ZW50KSB7XG4gICAgICBpZiAoIXJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIHx8IHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlID09PSBwYWdlVHlwZSkge1xuICAgICAgICBsZXQgcmVhcHBseV9ldmVudF9hcnJheSA9IHJlYXBwbHlfZXZlbnQ7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWFwcGx5X2V2ZW50KSkgcmVhcHBseV9ldmVudF9hcnJheSA9IFtyZWFwcGx5X2V2ZW50XTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgUmVhcHBseSBldmVudCAnJHtyZWFwcGx5X2V2ZW50fScgZm91bmQgZm9yIHRyZWF0bWVudDogJHtpZH1gKTtcbiAgICAgICAgZm9yIChjb25zdCByZWFwcGx5RXZlbnQgb2YgcmVhcHBseV9ldmVudF9hcnJheSkge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID9cbiAgICAgICAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gOiBbXTtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgYWxyZWFkeSBhZGRlZCBmb3IgcmVhcHBseSBldmVudFwiKTtcbiAgICAgICAgICB9IGVsc2UgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA9IFsuLi5wcmV2aW91c1ZhbHVlLCBpZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpIHtcbiAgICBjb25zdCB7cmVBcHBseVRyZWF0bWVudHNNYXAsIG1hdGNoZWRUcmVhdG1lbnRzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVBcHBseVRyZWF0bWVudHNNYXApKSB7XG4gICAgICBjb25zdCB0cmVhdG1lbnRJZHMgPSByZUFwcGx5VHJlYXRtZW50c01hcFtrZXldO1xuICAgICAgY29uc3QgcmVBcHBseVRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKHQpID0+IHRyZWF0bWVudElkcy5pbmNsdWRlcyh0LmlkKSk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiaW5maW5pdGVfc2Nyb2xsXCI6IHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW5maW5pdGVfc2Nyb2xsYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGltZW91dFwiOiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGltZW91dGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5U2VsZWN0b3JMaXN0ID0gQXJyYXkuaXNBcnJheSh0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvcikgP1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yIDogW3RyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcmVhcHBseVNlbGVjdG9yTGlzdCkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBlbGVtZW50X2NoYW5nZWApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25fc2Nyb2xsXCI6IHtcbiAgICAgICAgICAvLyBhZGQgd2luZG93IHNjcm9sbCBsaXN0ZW5lciwgY2FsbCBlbmdhZ2VSb2JvdCBvbiBzY3JvbGwsIGRvIG5vdCB0cmlnZ2VyIG1vcmUgdGhhbiBvbmNlIHBlciAyNTBtc1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRpbWUgPSAwO1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RTY3JvbGxUaW1lID4gMjUwICYmIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBzdCkgPiA1KSB7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIG9uX3Njcm9sbGApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicXVlcnlfc2VhcmNoX2NoYW5nZVwiOiB7XG4gICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICE9PSBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHF1ZXJ5X3NlYXJjaF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlcnZhbFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgaWYgKGFwcGxpZWQ/Llt0cmVhdG1lbnQuaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbnRlcnZhbGApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9fbGF5ZXJfY2hhbmdlXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgICAgICAgICBhZGREYXRhTGlzdGVuZXIodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJlYXBwbHkgZXZlbnQgbm90IGZvdW5kOiBcIiwga2V5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlU2V0ID0gW10sIGJ1c2luZXNzUnVsZVNldCA9IFtdLCBpZH0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMuaW5jbHVkZXMoaWQpKSByZXR1cm47XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKFsuLi5lbGlnaWJpbGl0eVJ1bGVTZXQsIC4uLmJ1c2luZXNzUnVsZVNldF0pO1xuICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihgX19lUnVsZXMuJHtzZWxlY3Rvcn1gLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgfVxuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMucHVzaChpZCk7XG4gIH1cblxuICBleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGVTZXQsIHByZXZpb3VzU2VsZWN0b3JzID0gbnVsbCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHByZXZpb3VzU2VsZWN0b3JzIHx8IFtdO1xuICAgIGZvciAobGV0IHJ1bGUgb2YgcnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChydWxlLnN0YXJ0c1dpdGgoXCIhXCIpKSBydWxlID0gcnVsZS5zbGljZSgxKTtcbiAgICAgICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zcGxpdChcIi5cIilbMF0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlLnNldCwgc2VsZWN0b3JzKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi4obmV3IFNldChzZWxlY3RvcnMpKV07XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSkge1xuICAgIGxvZ2dlci5sb2coYENoZWNraW5nIGVsaWdpYmlsaXR5ICR7ZWxpZ2liaWxpdHlSdWxlfWApO1xuICAgIGxldCBvcHBvc2l0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgW2VsaWdpYmlsaXR5U2NvcGUsIGVsaWdpYmlsaXR5TmFtZV0gPSBlbGlnaWJpbGl0eVJ1bGUuc3BsaXQoXCIuXCIpO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBvcHBvc2l0ZUZsYWcgPSB0cnVlO1xuICAgICAgZWxpZ2liaWxpdHlTY29wZSA9IGVsaWdpYmlsaXR5U2NvcGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7ZWxpZ2liaWxpdHlTY29wZX1gKTtcbiAgICBpZiAoIXJlcyB8fCAhQXJyYXkuaXNBcnJheShyZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9wcG9zaXRlRmxhZyAmJiByZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb3Bwb3NpdGVGbGFnICYmICFyZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGxvZ2dlci5sb2coYCR7ZWxpZ2liaWxpdHlSdWxlfSBpcyBlbGlnaWJsZWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0LCBlbGlnaWJpbGl0eVNldFR5cGUgPSBudWxsLCBwcmV2aW91c0lzRWxpZ2libGUgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJvYm90IGVsaWdpYmlsaXR5XCIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFbGlnaWJpbGl0eSBSdWxlIFNldCAke2VsaWdpYmlsaXR5UnVsZVNldH0gaXMgbm90IGFuIGFycmF5YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc0VsaWdpYmxlID0gcHJldmlvdXNJc0VsaWdpYmxlO1xuICAgIGZvciAoY29uc3QgZWxpZ2liaWxpdHlSdWxlIG9mIGVsaWdpYmlsaXR5UnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaWYgKGlzRWxpZ2libGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2ggKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSAmJiBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIGVsaWdpYmlsaXR5U2V0VHlwZTogXCIsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlLnNldCwgZWxpZ2liaWxpdHlSdWxlLnR5cGUsIGlzRWxpZ2libGUpO1xuICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRWxpZ2libGU7XG4gIH1cblxuICAvLyBSZXR1cm4gaW5kZXggb2YgYnVzaW5lc3NSdWxlLCB0aGlzIGlzIHRoZSBidXNpbmVzc1J1bGVJZFxuICBhc3luYyBjaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGJ1c2luZXNzUnVsZV0gb2YgYnVzaW5lc3NSdWxlU2V0LmVudHJpZXMoKSkge1xuICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoW2J1c2luZXNzUnVsZV0pKSByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tEYXRhTGF5ZXJSdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSB3aXRoIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gYXdhaXQgZGF0YUxheWVyRmluZGVyKG9wZXJhdG9yKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRhTGF5ZXJGaW5kZXIgPSBhc3luYyAoa2V5KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJTZWFyY2hpbmcgYmVhZ2xlSW5mb0xheWVyIGZvciBrZXkgXCIsIGtleSk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5zdWNjZXNzKGBGb3VuZCBrZXkgJHtrZXl9IHdpdGggdmFsdWUgJHtyZXN9YCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBsb2dnZXIuZmFpbGVkKGBLZXkgJHtrZXl9IG5vdCBmb3VuZCBpbiBiZWFnbGVJbmZvTGF5ZXJgKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVsZW1lbnRDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbGVtZW50UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIHNlbGVjdG9yXCIsIHJ1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbCk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZSwgc2VsZWN0b3IsIHNlbGVjdG9yQWxsLCBzZWxlY3RvckZhbGxiYWNrID0gbnVsbH0gPSBydWxlO1xuICBsZXQgbWFpblNlbGVjdG9yID0gc2VsZWN0b3I7XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbWFpblNlbGVjdG9yID0gc2VsZWN0b3JGYWxsYmFjayA/IHNlbGVjdG9yRmFsbGJhY2sgOiBtYWluU2VsZWN0b3I7XG4gIH1cblxuICBpZiAob3BlcmF0b3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcih3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gIH1cbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChzZWxlY3RvckFsbCAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgZWxlbWVudDtcbiAgaWYgKG1haW5TZWxlY3RvcikgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpO1xuICBlbHNlIGlmIChzZWxlY3RvckFsbCkgZWxlbWVudCA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSk7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJ0ZXh0LW51bWJlclwiOiB7XG4gICAgICBsZXQgdGVtcFZhbDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIHRlbXBWYWwgPSBlbGVtZW50LnJlZHVjZSgocmV0dXJuVmFsLCBlbGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuVmFsICs9IHBhcnNlSW50KGVsZW0udGV4dENvbnRlbnQucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBWYWwgPSBwYXJzZUludCh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgLnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwYXJzZUludCh0ZW1wVmFsKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJjbGFzc0xpc3RcIjpcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiY291bnRcIjoge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgJiYgZWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGVsZW1lbnQubGVuZ3RoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigxLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDAsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjYXNlIFwic3R5bGVcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdHlsZUtleSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICBjb25zdCBzdHlsZVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnRTdHlsZXNbc3R5bGVLZXldO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHN0eWxlVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcIk9wZXJhdG9yIG5vdCBkZWZpbmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUZ1bmN0aW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRnVuY3Rpb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgZnVuY3Rpb24gcnVsZVwiKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3JcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3JcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3I6IFwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkZXZpY2VfdHlwZVwiOiB7XG4gICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcyA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGlzTW9iaWxlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUHJvZHVjdEluZm9DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tQcm9kdWN0SW5mb1J1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBvcGVyYXRvcjogXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gIGlmICghc2t1TGlzdCB8fCAodHlwZW9mIHNrdUxpc3QgPT09IFwib2JqZWN0XCIgJiYgIU9iamVjdC5rZXlzKHNrdUxpc3QpLmxlbmd0aCkpIHJldHVybiBmYWxzZTtcbiAgbGV0IHJ1bnRpbWVWYWx1ZSA9IG51bGw7XG4gIGNvbnN0IHNrdSA9IHNrdUxpc3RbT2JqZWN0LmtleXMoc2t1TGlzdClbMF1dO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInNhbGVDbnRWaXNpdG9yc0luMTVcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJjYXJ0Q250VmlzaXRvcnNJbjE1XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIEFkZFRvQ2FydENvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRBZGRUb0NhcnRDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJ2aWV3Q250VmlzaXRvcnNJbjFcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0UHJldmlld0NvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImhhc1RpdGxlXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHRpdGxlIGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUaXRsZShza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJoYXNEZXNjcmlwdGlvblwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBkZXNjcmlwdGlvbiBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0RGVzY3JpcHRpb24oc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEFkZFRvQ2FydENvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0UHJldmlld0NvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRGcm9tREIgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgcmV0dXJuIGF3YWl0IGRiLmdldChza3UpO1xufTtcblxuY29uc3QgZ2V0VGl0bGUgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udGl0bGVBdWdtZW50IHx8IFwiXCI7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0RGVzY3JpcHRpb24gPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8ubWFya2V0aW5nQ29weSB8fCBcIlwiO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCJpbXBvcnQge2NoZWNrRGF0YUxheWVyUnVsZX0gZnJvbSBcIi4vZGF0YUxheWVyQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VsZW1lbnRSdWxlfSBmcm9tIFwiLi9lbGVtZW50Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0Z1bmN0aW9uUnVsZX0gZnJvbSBcIi4vZnVuY3Rpb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrU2Vzc2lvblJ1bGV9IGZyb20gXCIuL3Nlc3Npb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrVXJsUnVsZX0gZnJvbSBcIi4vdXJsQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VudlJ1bGV9IGZyb20gXCIuL2VudkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tQcm9kdWN0SW5mb1J1bGV9IGZyb20gXCIuL3Byb2R1Y3RJbmZvQ2hlY2tlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2FkZERhdGFMaXN0ZW5lciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuaW1wb3J0IHtmZXRjaEVsaWdpYmlsaXR5UnVsZXN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUnVsZUVuZ2luZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlcywgYmFzZVJ1bGVTZXR9ID0gYm9keTtcbiAgICB0aGlzLmJhc2VSdWxlU2V0ID0gYmFzZVJ1bGVTZXQ7XG4gICAgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzID0gZWxpZ2liaWxpdHlSdWxlcztcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMubXV0ZXggPSBuZXcgTXV0ZXgoKTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZXMoKSB7XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHRoaXMuYmFzZVJ1bGVTZXQpIHtcbiAgICAgIGNvbnN0IHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKTtcbiAgICAgIGlmICghcnVsZVNhdGlzZmllZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlKHJ1bGUpIHtcbiAgICBjb25zdCB7Y2hhaW4sIGNoYWluX2NvbmRpdGlvbiwgdHlwZX0gPSBydWxlO1xuICAgIGxldCBydWxlU2F0aXNmaWVkID0gbnVsbDtcbiAgICAvLyBjaGVjayBydWxlXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwic2Vzc2lvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tTZXNzaW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbGVtZW50UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja0RhdGFMYXllclJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInVybFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tVcmxSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tGdW5jdGlvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVudmlyb25tZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VudlJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja1Byb2R1Y3RJbmZvUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKGBObyBzdWNoIHJ1bGUgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY2hhaW4pIHtcbiAgICAgIHN3aXRjaCAoY2hhaW5fY29uZGl0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAmJiBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkIHx8IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICE9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBjaGFpbiBjb25kaXRpb25cIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydWxlU2F0aXNmaWVkID8gcnVsZS5uYW1lIHx8IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJhc3Nlc3NpbmctZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gICAgY29uc3Qga2V5UHJvbWlzZXNNYXAgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmVsaWdpYmlsaXR5UnVsZXMpKSB7XG4gICAgICBrZXlQcm9taXNlc01hcFtrZXldID0gW107XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAga2V5UHJvbWlzZXNNYXBba2V5XS5wdXNoKHRoaXMuY2hlY2tSdWxlKHJ1bGUpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlUHJvbWlzZXNdIG9mIE9iamVjdC5lbnRyaWVzKGtleVByb21pc2VzTWFwKSkge1xuICAgICAgY29uc3Qgc2F0aXNmaWVkUnVsZUlkcyA9IGF3YWl0IFByb21pc2UuYWxsKHJ1bGVQcm9taXNlcyk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgc2F0aXNmaWVkUnVsZUlkcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gZmFsc2UpKTtcbiAgICAgIHRoaXMuc2V0VXBMaXN0ZW5lcnMoa2V5LCB0aGlzLmVsaWdpYmlsaXR5UnVsZXNba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcykge1xuICAgIGlmICgha2V5IHx8ICFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcmVsZWFzZSA9IGF3YWl0IHRoaXMubXV0ZXguYWNxdWlyZSgpO1xuICAgIGxvZ2dlci5sb2coYExvY2sgYWNxdWlyZWQgZm9yIGtleSAke2tleX1gKTtcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGNvbnN0IGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWApIHx8IFtdO1xuICAgICAgICBpZiAoaXNFbGlnaWJsZSkge1xuICAgICAgICAgIGlmIChjdXJyZW50LmluY2x1ZGVzKHJ1bGUubmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGN1cnJlbnQucHVzaChydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBjdXJyZW50KTtcbiAgICAgICAgICBpZiAoa2V5ID09PSBcIlBhZ2VUeXBlXCIpIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIGVsaWdpYmxlIHJ1bGVzXG4gICAgICAgICAgaWYgKCFjdXJyZW50LmluY2x1ZGVzKHJ1bGUubmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gY3VycmVudC5maWx0ZXIoKGspID0+IGsgIT09IHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGZpbHRlcmVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgYXNzZXNzaW5nIHJ1bGVzIGZvciBrZXk6ICR7a2V5fSAtICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGxvZ2dlci5sb2coYFJlbGVhc2luZyBsb2NrIGZvciBrZXk6ICR7a2V5fWApO1xuICAgICAgcmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldFVwTGlzdGVuZXJzKGtleSwgcnVsZXMpIHtcbiAgICBjb25zdCB7ZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlc30gPSB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcyk7XG4gICAgZm9yIChjb25zdCBbb3BlcmF0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhkYXRhTGF5ZXJSdWxlcykpIHtcbiAgICAgIGNvbnN0IGJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2sgPSB0aGlzLmFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrLmJpbmQodGhpcywga2V5LCBydWxlcyk7XG4gICAgICBhZGREYXRhTGlzdGVuZXIob3BlcmF0b3IsIGJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2spO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGVsZW1lbnRSdWxlcykpIHtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uTGlzdCkgPT4ge1xuICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHJldHVybjtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb25SZWNvcmQgb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgbm9kZXMgPSBbLi4ubm9kZXMsIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQuYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQucmVtb3ZlZE5vZGVzKV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXhjbHVkZSBtdXRhdGlvbnMgdGhhdCBvbmx5IHVwZGF0ZSB0ZXh0XG4gICAgICAgIGlmIChub2Rlcy5ldmVyeSgobikgPT4gbi50YWdOYW1lID09PSB1bmRlZmluZWQpKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcyk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gXCJib2R5XCIpIHtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmJvZHksIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9O1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikucGFyZW50Tm9kZSwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMsIGRhdGFMYXllclJ1bGVzID0ge30sIGVsZW1lbnRSdWxlcyA9IHt9LCBiYXNlUnVsZSA9IG51bGwpIHtcbiAgICBpZiAoIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgIGNvbnN0IHt0eXBlfSA9IHJ1bGU7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICAgIGlmICghZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0pIHtcbiAgICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdLnB1c2goYmFzZVJ1bGUgfHwgcnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocnVsZS5zZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSA9IGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdLCBiYXNlUnVsZSB8fCBydWxlXSA6IFtiYXNlUnVsZSB8fCBydWxlXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnNlbGVjdG9yQWxsKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSA9IGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdLCBiYXNlUnVsZSB8fCBydWxlXSA6IFtiYXNlUnVsZSB8fCBydWxlXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50UnVsZXNbXCJib2R5XCJdID0gZWxlbWVudFJ1bGVzW1wiYm9keVwiXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW1wiYm9keVwiXSwgYmFzZVJ1bGUgfHwgcnVsZV0gOiBbYmFzZVJ1bGUgfHwgcnVsZV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocnVsZS5jaGFpbikge1xuICAgICAgICB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhbcnVsZS5jaGFpbl0sIGRhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXMsIGJhc2VSdWxlIHx8IHJ1bGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEVsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUyk7XG4gICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlc09iaikge1xuICAgICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gSlNPTi5wYXJzZShlbGlnaWJpbGl0eVJ1bGVzT2JqKTtcbiAgICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXNPYmoudGltZXN0YW1wKSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSBlbGlnaWJpbGl0eVJ1bGVzT2JqLnRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgICAgIGlmIChlbGFwc2VkSG91cnMgPCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXNPYmoucnVsZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSBhd2FpdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlc09iaikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSB7cnVsZXM6IGVsaWdpYmlsaXR5UnVsZXNPYmosIHRpbWVzdGFtcDogRGF0ZS5ub3coKX07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTLCBKU09OLnN0cmluZ2lmeShlbGlnaWJpbGl0eVJ1bGVzT2JqKSk7XG4gICAgICByZXR1cm4gZWxpZ2liaWxpdHlSdWxlc09iai5ydWxlcztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IGVsaWdpYmlsaXR5IHJ1bGVzOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU9uQ29tcG9uZW50XCIpO1xuXG5jb25zdCBiZWFnbGVPbiA9IGFzeW5jIChpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlLCB0cmVhdG1lbnRXZWlnaHRzLCBpc09uKSA9PiB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWluaXRcIik7XG5cbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UgPSBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgY29uc3QgdHJlYXRtZW50c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudHMoKTtcblxuICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWNvbmZpZy1mZXRjaFwiKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBsZXQgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBudWxsO1xuICBpZiAoZGVidWdNb2RlICYmIHNlYXJjaFBhcmFtcy5pbmNsdWRlcyhcImZpbHRlcj1cIikpIHtcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IHNlYXJjaFBhcmFtcy5zbGljZShcbiAgICAgICAgc2VhcmNoUGFyYW1zLmluZGV4T2YoXCJbXCIpICsgMSxcbiAgICAgICAgc2VhcmNoUGFyYW1zLmxhc3RJbmRleE9mKFwiXVwiKSxcbiAgICApLnNwbGl0KFwiLFwiKS5tYXAoKGl0ZW0pID0+IHBhcnNlSW50KGl0ZW0sIDEwKSk7XG4gIH1cblxuICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50c1Byb21pc2U7XG5cbiAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcm9ib3Qtd2VpZ2h0c1wiKTtcbiAgfVxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7XG4gICAgdHJlYXRtZW50cyxcbiAgICB0cmVhdG1lbnRXZWlnaHRzLFxuICB9KTtcblxuICBjb25zdCBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoZGVidWdNb2RlKTtcbiAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8tdXNlci1zZWdtZW50XCIpO1xuICB9XG4gIGlmICghbWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcm9ib3QtbWF0Y2hlZFwiKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmb3VuZC1tYXRjaGVkLXJvYm90c1wiKTtcblxuICB0cnkge1xuICAgIGF3YWl0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1ydWxlcy1hc3Nlc3NlZFwiKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJydWxlcy1hc3Nlc3NlZFwiKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvREIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICAgIGF3YWl0IHByb2R1Y3RJbmZvREIucGVyc2lzdFByb2R1Y3RJbmZvKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IG5ldyBFcnJvcihcInByb2R1Y3QtaW5mby1uby1wZXJzaXN0XCIpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW5nYWdpbmctcm9ib3RzXCIpO1xuICBjb25zdCByb2JvdEVuZ2luZSA9IG5ldyBSb2JvdEVuZ2luZSh7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgZGVidWdNb2RlLFxuICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgIGlkZW50aWZpZXIsXG4gICAgcGFnZVR5cGUsXG4gICAgaXNPbixcbiAgfSk7XG4gIGF3YWl0IHJvYm90RW5naW5lLmVuZ2FnZVJvYm90cygpO1xuICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicm9ib3RzLWVuZ2FnZWRcIik7XG4gIGxvZ2dlci5zdWNjZXNzKFwiQXBwbGllZCB0cmVhdG1lbnRzOiBcIiwgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIikpO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGluZy1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IFJ1bGVFbmdpbmUuZ2V0RWxpZ2liaWxpdHlSdWxlcygpO1xuICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHJldHVybjtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgY29uc3QgcnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtlbGlnaWJpbGl0eVJ1bGVzfSk7XG4gIGF3YWl0IHJ1bGVFbmdpbmUuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImFzc2Vzc2VkLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgYmVhZ2xlT247XG4iLCJpbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJTZWdtZW50YXRpb25Db21wdXRlclwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpIHtcbiAgbG9nZ2VyLmxvZyhcIkRldGVybWluaW5nIHVzZXIgc2VnbWVudFwiKTtcbiAgdHJ5IHtcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgT2JqZWN0LmtleXModHJlYXRtZW50V2VpZ2h0cykpIHtcbiAgICAgIGNvbnN0IHJ1bGVTZXQgPSB0cmVhdG1lbnRXZWlnaHRzW3NlZ21lbnRdPy5ydWxlU2V0O1xuICAgICAgaWYgKCFydWxlU2V0KSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHNlZ21lbnRSdWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2Jhc2VSdWxlU2V0OiBydWxlU2V0LCBidXNpbmVzc1J1bGVTZXQ6IFtdfSk7XG4gICAgICBpZiAoYXdhaXQgc2VnbWVudFJ1bGVFbmdpbmUuY2hlY2tSdWxlcygpKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYFVzZXIgc2VnbWVudCBtYXRjaGVkOiAke3NlZ21lbnR9YCk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic1wiLCBzZWdtZW50KTtcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5sb2coXCJVc2VyIHNlZ21lbnQgbm90IG1hdGNoZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY29tcHV0ZSB1c2VyIHNlZ21lbnRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IE1vbml0b3IgZnJvbSBcIi4uL0JlYWdsZU1vbml0b3IvaW5kZXhcIjtcbmltcG9ydCBiZWFnbGVPbiBmcm9tIFwiLi4vQmVhZ2xlT25cIjtcbmltcG9ydCB7XG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBTUExJVF9SQVRJTyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04sXG4gIFZFUlNJT04sXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIHNldFVSTERhdGEsXG4gIHNldEFnZW50RGV0YWlscyxcbiAgZ2V0SWRlbnRpZmllcixcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxuICBkZXRlcm1pbmVQY3QsXG4gIGdldERlYnVnTW9kZSxcbiAgc3dpdGNoVG9FYXNlT3V0LFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Y29tcHV0ZVNlZ21lbnR9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXIvc2VnbWVudC1jb21wdXRlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIjtcblxubGV0IFNIVVRET1dOID0gZmFsc2U7XG5cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgc3dpdGNoVG9FYXNlT3V0KCk7XG4gIGxldCBtb25pdG9yID0gbnVsbDtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBpbml0aWFsaXppbmdcIik7XG4gIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG4gIGxldCBlYXJseUxvZ1NlbnQgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBDUklUSUNBTCBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBzZXRVUkxEYXRhKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIsIERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidlwiLCBWRVJTSU9OKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNyXCIsIFNQTElUX1JBVElPKTtcblxuICAgIG1vbml0b3IgPSBuZXcgTW9uaXRvcigpO1xuICAgIC8vIGRhdGEtbGVzcyBsb2cgdG8gZGV0ZWN0IGJvdW5jZXNcbiAgICBhd2FpdCBtb25pdG9yLnBhY2tBbmRRdWV1ZUFycml2YWxMb2coKTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBU1lOQyBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyKCk7XG4gICAgY29uc3QgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudFdlaWdodHMoKTtcblxuICAgIC8vIFNMQTogMiBzZWNvbmRzIHRvIGZsaWNrZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIH0sIDIwMDApO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFRJTUUtT1VUIFNFU1NJT04gQlJFQUtFUiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICBsZXQgb29zQnJlYWsgPSBmYWxzZTtcbiAgICBjb25zdCBvb3NSZWFzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSk7XG4gICAgY29uc3QgaXNMYWJlbFNlbnQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQpO1xuICAgIGNvbnN0IHRpbWVvdXRDb3VudGVyID0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5UKSkgfHwgMDtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuXG4gICAgLy8gaWYgdGltZWQtb3V0IHRvbyBtYW55IHRpbWVzIGZvciB2ZXJ5IGZpcnN0IGludGVyYWN0c2lvbnMsIG1ha2Ugb3V0IG9mIHNjb3BlIGZvciB0aGUgc2Vzc2lvblxuICAgIGlmICghZGVidWdNb2RlICYmICFvb3NSZWFzb24gJiYgIWlzTGFiZWxTZW50ICYmIHRpbWVvdXRDb3VudGVyID4gTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04pIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm1heC10aW1lb3V0XCIpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWSBQUlVORSBPVVQtT0YtU0NPUEUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyB0ZXN0IGNvb2tpZSwgYmVhY29uLCBhbmQgc3RyaW5nIHV0aWxzIHN1cHBvcnRcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5tYXRjaCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJ1bnN1cHBvcnRlZFwiKVxuICAgICkge1xuICAgICAgb29zQnJlYWsgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHVzZXJBZ2VudCBjYW4gYmUgcHJvcGVybHkgcGFyc2VkXG4gICAgaWYgKCFvb3NCcmVhaykge1xuICAgICAgY29uc3Qgc3RhdHVzID0gc2V0QWdlbnREZXRhaWxzKCk7XG4gICAgICAvLyBpZiBhZ2VudCBjYW5ub3QgYmUgcGFyc2VkLCBkbyBlYXJseSBicmVha1xuICAgICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgb29zQnJlYWsgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF0dGVtcHQgdG8gY29tcHV0ZSB1c2VyIHNlZ21lbnRcbiAgICBsZXQgdXNlclNlZ21lbnQgPSBudWxsO1xuICAgIGxldCB0cmVhdG1lbnRXZWlnaHRzID0gbnVsbDtcbiAgICBpZiAoIW9vc0JyZWFrKSB7XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2U7XG4gICAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5ULCB0aW1lb3V0Q291bnRlciArIDEpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJvYm90LXdlaWdodHNcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb21wdXRlIHVzZXIgc2VnbWVudCBhbmQgYWRkIHRvIGJlYWdsZUluZm9MYXllclxuICAgICAgICB1c2VyU2VnbWVudCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVzZXJTZWdtZW50KSB7XG4gICAgICAgIG9vc0JyZWFrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBjYW5ub3QgZ2V0IGNyaXRpY2FsIGluZm8sIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCB1bnN1cHBvcnRlZFxuICAgIGlmIChvb3NCcmVhaykge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IGRldmljZVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkLWRldmljZVwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBRE1JTiBVU0VSIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cblxuICAgIC8vIGlmIGFkbWluIHVzZXIsIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCBtYXJrIGFzIGVtcGxveWVlXG4gICAgY29uc3QgcHJvY2Vzc0FkbWluVXNlciA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IGFkbWluXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWRtaW4tZW1wbG95ZWVcIik7XG4gICAgfTtcblxuICAgIGxldCBpc0FkbWluID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTik7XG4gICAgLy8gaWYgbm90IGZvdW5kIGluIGxvY2FsU3RvcmFnZSwgY2hlY2sgYmVhZ2xlSW5mb0xheWVyIHdpdGggYmxvY2tpbmcgbWRvZVxuICAgIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNBZG1pbiA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgICAgLy8gcGVybWFuZW50IGxhYmVsIGNhbiBiZSBmYWxzZSwgYnV0IGFkbWluIHVzZXIgY2FuIHN0aWxsIGxvZ2luIGFuZCB0dXJuIHRydWUsIGxhemlseSBmaXggdGhpc1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gXCJmYWxzZVwiIHx8IGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gICAgICAvLyBhc3luYyBjYWxsIHRvIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIHRoZW4gc2V0IGxvY2FsU3RvcmFnZVxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSkudGhlbigoaXNBZG1pbikgPT4ge1xuICAgICAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWFkbWluLXN0YXR1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1lYXNlXCIpKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnRpLWZsaWNrZXItdGltZW91dFwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IE9OL09GRiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gaXNPbiBjYW4gYmUgdHJ1ZSAoT04pLCBmYWxzZSAoT0ZGKVxuICAgIGxldCBpc09uID0gbnVsbDtcblxuICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcImVtcGxveWVlXCIpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbikge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB1bmtub3duXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBvdXQgb2Ygc2NvcGUgcmVhc29uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBncmVhdGVyIHRoYW4gU1BMSVRfUkFUSU8sIHRoZW4gaW4gT04gbW9kZVxuICAgICAgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTykge1xuICAgICAgICBpc09uID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidHJ1ZVwifSk7XG4gICAgICB9IGVsc2UgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTyAvIDIpIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTJcIn0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTFcIn0pO1xuICAgICAgfVxuXG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzT25cIiwgaXNPbik7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQsIHRydWUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGlzT24udG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEVBUkxZLVBST0NFU1MgQ09OVkVSU0lPTiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGF3YWl0IGNyaXRpY2FsIGluZm8gYmVmb3JlIHNlbmRpbmcgbG9ncyBmb3IgcHJvcGVyIGFuYWx5dGljcyBtZWFzdXJlbWVudHNcbiAgICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgICBpZiAocGFnZVR5cGUgPT09IFwicHVyY2hhc2VcIikge1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnJldmVudWVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIC8vIHNlbmQgbG9ncyBpbW1lZGlhdGVseSBvbiBwdXJjaGFzZSBwYWdlLCBhbmQgZm9yY2Ugd2FpdFxuICAgICAgYXdhaXQgbW9uaXRvci5zZW5kTG9ncyh0cnVlKTtcbiAgICAgIC8vIGlmIHB1cmNoYXNlIGlzIGNvbXBsZXRlLCBkbyBub3QgYXBwbHkgYW55IHRyZWF0bWVudHMgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICBTSFVURE9XTiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNlbmQgbG9ncyB3aGVuIHJlYWR5LCBzdGFydCBzY3JhcGluZyBhbmQgc2VuZGluZyBhc3luY2x5XG4gICAgICBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICB9XG4gICAgZWFybHlMb2dTZW50ID0gdHJ1ZTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBST0JPVCBQQVRIcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW50ZXJpbmctcm9ib3QtcGF0aFwiKTtcblxuICAgIGlmIChpc09uID09PSBudWxsIHx8IGlzT24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8taXNPblwiKTtcbiAgICB9IGVsc2UgaWYgKFNIVVRET1dOKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaHV0ZG93bi1wYXRoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlLCB0cmVhdG1lbnRXZWlnaHRzLCBpc09uKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiRW50cnlwb2ludCBjYXRjaDogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwiVkVSU0lPTiIsIkNPT0tJRV9OQU1FIiwiVFJFQVRNRU5UU19MT0NBVElPTiIsIlRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OIiwiU1RZTEVTSEVFVF9MT0NBVElPTiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIkVfUlVMRVNfTE9DQVRJT04iLCJQUk9EVUNUX0lORk9fTE9DQVRJT04iLCJMT0dfQVBJX1VSTCIsIkxPT0tVUF9BUElfVVJMIiwiTU9CSUxFX01FRElBX1FVRVJZIiwiU1BMSVRfUkFUSU8iLCJUUkVBVE1FTlRfUkFUSU8iLCJMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUyIsIk1BWF9USU1FT1VUX1BFUl9TRVNTSU9OIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlBPUFVQX0RJU1BMQVlfRkxBRyIsIlNLVV9JTkZPX0JBU0tFVCIsIlRJTUVPVVRfQ09VTlQiLCJTRVNTSU9OX1JFRkVSUkVSIiwiTUFUQ0hFRF9UUkVBVE1FTlRTIiwiSVNfTEFCRUxfU0VOVCIsIkxPQ0FMX1NUT1JBR0VfS0VZUyIsIlRSRUFUTUVOVFMiLCJXRUlHSFRTIiwiRUxJR0lCSUxJVFlfUlVMRVMiLCJERUJVR19NT0RFIiwiT1VUX09GX1NDT1BFIiwiVVNFUl9JRCIsIkRBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkUiLCJJU19BRE1JTiIsIkNVU1RPTV9TVE9SQUdFX1BSRUZJWCIsIkxvZ2dlciIsIm9yaWdpbiIsInRlc3RpbmciLCJERUJVRyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcmdzIiwiY29uc29sZSIsImluZm8iLCJsb2ciLCJtZXNzYWdlQ29uZmlnIiwiZm9yRWFjaCIsImFyZ3VtZW50IiwidHlwZSIsIndhcm4iLCJlcnJvciIsImFkZFRvQmVhZ2xlSW5mb0xheWVyIiwibG9nZ2VyIiwibW9udGhzIiwicmVtb3ZlRG9jdW1lbnRIaWRlIiwidG9wIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzd2l0Y2hUb0Vhc2VPdXQiLCJjb250YWlucyIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwicHJlcGVuZCIsImFkZCIsImZldGNoVHJlYXRtZW50cyIsImZldGNoUGx1cyIsInRyZWF0bWVudHMiLCJFcnJvciIsImpzb24iLCJqc29uVHJlYXRtZW50IiwiZmFpbGVkIiwibWVzc2FnZSIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsImZldGNoUHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvSnNvbiIsInRpbWVvdXQiLCJ0aW1lIiwiY29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsInRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJhYm9ydCIsInVybCIsIm9wdGlvbnMiLCJyZXRyaWVzIiwiZmV0Y2giLCJzaWduYWwiLCJ0aGVuIiwicmVzIiwib2siLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJjYXRjaCIsImV4dHJhY3RDb29raWVJZGVudGlmaWVyIiwiY29va2llU3RyaW5nIiwiY29va2llTmFtZSIsInBhcnNlZCIsInNwbGl0IiwibWFwIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsInRyaW0iLCJpZGVudGlmaWVyIiwiaWRlbnRpZmllckluZGV4IiwiZGV0ZXJtaW5lUGN0Iiwibm93IiwibW9udGgiLCJnZXRNb250aCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJ0b1N0cmluZyIsInBjdCIsImV4aXRTY3JvbGxMaXN0ZW5lciIsImNhbGxCYWNrIiwibG9vcCIsInNjcm9sbFRvcCIsImxhc3RTY3JvbGxUb3AiLCJjbGVhckludGVydmFsIiwiZXhpdFNjcm9sbEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJzdHlsZUFwcGxpY2F0b3IiLCJlbGVtZW50cyIsInN0eWxlQ2hhbmdlc01hcCIsImkiLCJlbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbHVlIiwic3R5bGUiLCJpbmplY3RTdHlsZVNoZWV0Iiwic3R5bGVTaGVldCIsInJlbCIsImhyZWYiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwcmVwYXJlQWN0aW9ucyIsImFjdGlvbnNUb1ByZXBhcmUiLCJidXNpbmVzc1J1bGVJZCIsImRlYnVnTW9kZSIsImFjdGlvbnMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ2YXJpYW50IiwiYWN0aW9uIiwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zIiwidmFyaWFudHMiLCJidXNpbmVzc1RyYW5zZm9ybWF0aW9uIiwiaWQiLCJrZXlzIiwidmFyaWFudEtleSIsInJhbmRvbVBjdCIsIndlaWdodCIsIk1hdGgiLCJmbG9vciIsImluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzIiwicG9wdXBEaXNwbGF5RmxhZyIsInNlc3Npb25TdG9yYWdlIiwic2Vzc2lvblRpbWVzdGFtcCIsInNlc3Npb25IaXN0b3J5Iiwic2V0SXRlbSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjb25kaXRpb25DaGVja2VyIiwicnVuVGltZVZhbHVlIiwiY29uZGl0aW9uIiwic3VjY2VzcyIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJjdXJyZW50IiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsImFicyIsImdldFJhbmRvbUludCIsInJhbmRvbSIsImdldFVuaXhUaW1lIiwiZ2V0SWRlbnRpZmllciIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImUiLCJkZWxheSIsIm1zIiwiZm9ybWF0RGVsaXZlcnlEYXRlIiwiZGF0ZSIsInJlc3VsdCIsInN0YXJ0TW9udGhJbmRleCIsImVuZE1vbnRoSW5kZXgiLCJzdGFydERheSIsImVuZERheSIsIm1hdGNoIiwidG9kYXkiLCJzdGFydFllYXIiLCJnZXRGdWxsWWVhciIsImVuZFllYXIiLCJlc3RpbWF0ZWRTdGFydCIsImVzdGltYXRlZEVuZCIsInN0YXJ0RGlmZk92ZXJEYXlzIiwiY2VpbCIsImVuZERpZmZPdmVyRGF5cyIsInN0YXJ0RGlmZk92ZXJXZWVrcyIsImVuZERpZmZPdmVyV2Vla3MiLCJlcnIiLCJpZGxlVGltZXIiLCJ0aW1lT3V0IiwicmVzZXRUaW1lciIsImlkbGVUaW1lb3V0Iiwib250b3VjaHN0YXJ0IiwiaXNPd25NdXRhdGlvbiIsIm11dGF0aW9uTGlzdCIsIm5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsInNvbWUiLCJuIiwidGFnTmFtZSIsImMiLCJzZXRBZ2VudERldGFpbHMiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImJyIiwiYk5hbWUiLCJiVmVyc2lvbiIsIm9zIiwiV2luZG93cyIsIk1hYyIsIkxpbnV4IiwiQW5kcm9pZCIsImlPUyIsIm9zVmVyc2lvbiIsIm9zTmFtZSIsImlzTW9iaWxlIiwiaXNTdXBwb3J0ZWRCcm93c2VyIiwiaXNTdXBwb3J0ZWRPUyIsInNldFVSTERhdGEiLCJjdXJyZW50VVJMIiwiVVJMIiwiaG9zdG5hbWUiLCJwYWdlVHlwZSIsImlkYlJlYWR5IiwiaXNTYWZhcmkiLCJ1c2VyQWdlbnREYXRhIiwiaW5kZXhlZERCIiwiZGF0YWJhc2VzIiwiaW50ZXJ2YWxJZCIsInRyeUlkYiIsImZpbmFsbHkiLCJMU19QcmVmaXgiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJmZWF0dXJlS2V5Iiwib3BLZXkiLCJzdG9yYWdlIiwicGFyc2VGbG9hdCIsInZhbEhhc2giLCJvcEtleVZhbCIsIm9wS2V5VmFsTmFtZSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJxdWVyeU1ldGhvZCIsImxvY2FsS2V5cyIsImxvY2FsS2V5c0ZpbHRlcmVkIiwiZmlsdGVyIiwic3VtIiwibWF4Q291bnQiLCJtYXhWYWwiLCJ2YWwiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZiIsIl9faHdtIiwic2VhcmNoUGF0aHMiLCJQYWdlVHlwZURlcGVuZCIsIm1ldGhvZCIsInNlbGVjdG9yIiwibmFtZSIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsIm9iaiIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJwdXNoIiwibGlzdGVuZXJzIiwiaXNBcnJheSIsImdldEZyb21CZWFnbGVJbmZvTGF5ZXIiLCJibG9ja2luZyIsInBvbGxJbnRlcnZhbCIsIm9idGFpbkRhdGEiLCJqc29uR2V0Iiwic2VhcmNoRWxlbWVudCIsImlzRm91bmQiLCJpc0lnbm9yZSIsImludGVydmFsIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwicXVlcnlTZWxlY3RvciIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwidHJpZ2dlclJlc3RhcnQiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImlubmVyVGV4dCIsImF0dHJpYlZhbHVlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZWNoaWxkIiwiYXR0cmliVmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRWYWx1ZSIsInN1bVByaWNlIiwiY2hpbGRUZXh0IiwiYXJyYXlJbm5lclRleHQiLCJleGNsdXNpdmVFbGVtZW50IiwiY3VzdG9tRGF0YURlcml2YXRpb25zIiwiY3VycmVudFBhZ2VUeXBlIiwiYWxsIiwiaXNDYXJ0RW1wdHkiLCJ0b3RhbEJhc2VQcmljZSIsImNvdXBvbk5vdEFwcGxpY2FibGUiLCJwcmljZXMiLCJxdWFudGl0aWVzIiwidG90YWxQcmljZSIsImNvdXBvbkFwcGxpY2FibGVBbW91bnQiLCJza3UiLCJza3VMaXN0IiwicGFyc2VTZWFyY2hQYXRocyIsImRvbVN0YXR1cyIsInJlYWR5U3RhdGUiLCJ3aW50b3AiLCJkYXRhTGF5ZXIiLCJ3aW5kb2MiLCJmb3VuZE5hbWVzIiwiU2V0IiwicHJldkZvdW5kTmFtZXMiLCJub3RGb3VuZE5hbWVzIiwiaGFzIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJzaXplIiwiam9pbiIsInBhdGgiLCJwYXRoQXJyYXkiLCJzdWJQYXRoIiwic2xpY2UiLCJzdWJBcnJheSIsInN1YktleSIsInN1YlZhbHVlIiwid2luZG93UHRyIiwibmF2UHRyIiwicGxhdGZvcm0iLCJkZXZpY2VQaXhlbFJhdGlvIiwiYXZhaWxXaW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJ3aW5kb3dEZXB0aCIsImNvbG9yRGVwdGgiLCJwaXhlbERlcHRoIiwidnBvcnRTaGFwZSIsInZpc3VhbFZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJyb3VuZCIsIm9yaWVudGF0aW9uQW5nbGUiLCJvcmllbnRhdGlvbiIsImFuZ2xlIiwidGVtcCIsImhpc3RvcnkiLCJuYXZBZ2VudCIsImJyYW5kcyIsImJyYW5kIiwidmVyc2lvbiIsIm1vYmlsZSIsImhhcmR3YXJlQ29uY3VycmVuY3kiLCJsYW5ndWFnZSIsImJyb3dzZXJMYW5ndWFnZSIsInN5c3RlbUxhbmd1YWdlIiwidXNlckxhbmd1YWdlIiwibWF4VG91Y2hQb2ludHMiLCJ2ZW5kb3IiLCJjb25uZWN0aW9uIiwiZG93bmxpbmsiLCJkb05vdFRyYWNrIiwibXNEb05vdFRyYWNrIiwicmVmZXJyZXIiLCJmaXJzdFNlc3Npb25SZWZlcnJlciIsInBlcmZNZXRyaWNzIiwicGVyZk5hdmlnYXRpb25NZXRyaWNzIiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlUeXBlIiwiY29ubmVjdCIsImNvbm5lY3RFbmQiLCJjb25uZWN0U3RhcnQiLCJyZXF1ZXN0IiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJkb20iLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwibG9hZCIsImxvYWRFdmVudEVuZCIsImxvYWRFdmVudFN0YXJ0IiwiZHVyYXRpb24iLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwianNvbmNvbnRlbnQiLCJIRUFERVJTIiwiTW9uaXRvciIsImhhc0Fycml2YWxMb2dTZW50IiwiaGFzTWFpbkxvZ1NlbnQiLCJoYXNVcGRhdGVzU2VudCIsImhpZ2hXYXRlck1hcmsiLCJpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzIiwiaW1tZWRpYXRlIiwicGFja0FuZFF1ZXVlTWFpbkxvZyIsInBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nIiwicGFja2FnZU1haW5Mb2dEYXRhIiwicmVxdWVzdEJsb2IiLCJjaGVja0ZvckxhdGVzdENoYW5nZXMiLCJxdWV1ZUxvZ3MiLCJoYXNDaGFuZ2VkIiwicGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSIsImxvZ0RhdGEiLCJwYWNrYWdlQXJyaXZhbExvZ0RhdGEiLCJod20iLCJjb29raWVHYUlkIiwidmlld19lcG9jaCIsImJvZHkiLCJsYyIsInUiLCJvbkhhc2hQY3QiLCJCbG9iIiwic3RhcnRzV2l0aCIsInMiLCJtIiwidmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xvc2VFdmVudCIsImNhcHR1cmUiLCJ2aXNpYmlsaXR5U3RhdGUiLCJzZW5kQmVhY29uIiwicXVldWVkIiwicXVldWVJbnRlcnZhbCIsIlRyZWF0bWVudFJlcG9zaXRvcnkiLCJDUFQiLCJtYXRjaGVkVHJlYXRtZW50cyIsIm10IiwiY2hlY2tQYWdlVHlwZSIsInBhZ2VUeXBlcyIsInVzZXJTZWdtZW50IiwidXNlclNlZ21lbnRXZWlnaHRzIiwidHJlYXRtZW50Iiwic2VnbWVudGVkV2VpZ2h0IiwiZ2V0TWF0Y2hlZFRyZWF0bWVudHMiLCJwdCIsInN1YnN0ciIsInRyZWF0bWVudHNPYmoiLCJ0aW1lc3RhbXAiLCJ0cmVhdG1lbnRXaXRoVGltZXN0YW1wIiwiZWxhcHNlZEhvdXJzIiwid2VpZ2h0c09iaiIsIndlaWdodHMiLCJyZXBsYWNlciIsInJlcGxhY2VGbiIsImN1cnJlbnRSZXBsYWNlRm4iLCJyZXBsYWNlT2JqZWN0RXh0cmFjdG9yIiwicmVwbGFjZVZhbCIsInJlcGxhY2VGbkV4ZWN1dG9yIiwickZuIiwic2luZ2xlIiwicmVwbGFjZUZ1bmN0aW9uIiwiRnVuY3Rpb24iLCJrZXlGYWxsYmFjayIsImNvbmZpZyIsImRiTmFtZSIsInN0b3JlIiwiaW5kZXhlcyIsImZpZWxkcyIsImtleVBhdGgiLCJvcGVuREIiLCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IiwiaW5pdCIsInVwZ3JhZGUiLCJkYiIsIm9sZFZlcnNpb24iLCJkZWxldGVPYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiaWR4IiwiY3JlYXRlSW5kZXgiLCJyZWplY3QiLCJyZWFkd3JpdGUiLCJnZXREQiIsInRyYW5zYWN0aW9uIiwicGF5bG9hZCIsImdldFN0b3JlIiwic2F2ZVByb21pc2VzIiwicHV0IiwiY2xlYXIiLCJjb3VudCIsIm9wZW5DdXJzb3IiLCJjdXJzb3IiLCJleGlzdGluZ1Byb2RJbmZvIiwiZ2V0Q3Vyc29yIiwiZWxhcHNlZFNlY29uZHMiLCJwcm9kdWN0SW5mb1Byb21pc2UiLCJjbGVhclByb21pc2UiLCJwcm9kdWN0SW5mb0FycmF5Iiwic2F2ZSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImVsaWdpYmxlRWxlbWVudHMiLCJhdHRyaWJ1dGUiLCJpbm5lcl9jb25kaXRpb24iLCJvcGVyYXRvciIsImNoYWluIiwiY29uZGl0aW9uRWxlbWVudHMiLCJhY3Rpb25Db25kaXRpb25DaGVja2VyIiwiJCIsImVsZW1lbnRTa3UiLCJmbiIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwiYXBwbHlFdmVudCIsImNvbnRlbnRTZWxlY3RvciIsInNlbGVjdG9yRmFsbGJhY2siLCJtZENvbmRpdGlvbiIsIm1vdmVfc2VsZWN0b3JfMSIsIm1vdmVfc2VsZWN0b3JfMiIsInBUeXBlIiwicHJvZHVjdEluZm9TdG9yYWdlIiwibWMiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImJlZm9yZSIsImFmdGVyIiwiYXBwZW5kIiwib2ZmIiwiY3JlYXRlUG9wdXAiLCJlbG0iLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJkaXNwbGF5TW9kYWwiLCJnZXRQcm9kdWN0SW5mbyIsImV2ZW50IiwiZGlzcGxheVBvcHVwIiwiciIsImQiLCJwdXNoU3RhdGUiLCJzdGF0ZSIsIm9uY2UiLCJ0ZXh0IiwiaHRtbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlIiwibjEiLCJuMiIsInN3YXBOb2RlcyIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwic2VudGVuY2UiLCJ3b3JkIiwiY2hhckF0IiwidG9Mb2NhbGVVcHBlckNhc2UiLCJwcmVwYXJlRmluYWxUaXRsZSIsImZpbmFsVGl0bGUiLCJjb250ZW50cyIsIm5vZGVUeXBlIiwibm9kZVZhbHVlIiwicHJlcGFyZURlc2NFbG0iLCJkZXNjcmlwdGlvbkVsbSIsIm1hcmtldGluZ0NvcHkiLCJ1cGRhdGVkSHRtbFN0cmluZyIsInJlcGxhY2VXaXRoVmFsIiwidGl0bGVBdWdtZW50IiwiaHRtbFN0ciIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJoaWRlIiwicVBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJzcmMiLCJ0ZW1wbGF0ZSIsImlubmVySFRNTCIsInBvcHVwIiwiY29udGVudCIsImZpcnN0Q2hpbGQiLCJwMSIsInBhcmVudE5vZGUiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJNdXRleCIsIk9CU0VSVkVSX0NPTkZJRyIsImF0dHJpYnV0ZXMiLCJSb2JvdEVuZ2luZSIsImRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzIiwiaXNPbiIsImVuZ2FnZW1lbnRMb2NrIiwicmVBcHBseVRyZWF0bWVudHNNYXAiLCJhZGRlZERhdGFMaXN0ZW5lcklkcyIsInJvYm90UHJvbWlzZXMiLCJlbmdhZ2VSb2JvdCIsImluaXRpYXRlUmVhcHBseVJvYm90TWFwIiwiZWxpZ2liaWxpdHlSdWxlU2V0IiwiZGV2aWNlIiwiYnVzaW5lc3NSdWxlU2V0IiwiaGVscGVycyIsInByZXBhcmVBbmRBcHBseSIsImFjcXVpcmUiLCJyZWxlYXNlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJlbmdhZ2VIZWxwZXJzIiwiYWRkUmVhcHBseUV2ZW50IiwiYWRkUnVsZVNldERhdGFMaXN0ZW5lcnMiLCJoZWxwZXJSb2JvdFByb21pc2VzIiwicHJlcGFyZWQiLCJyZWFwcGx5X2V2ZW50IiwicmVhcHBseV9ldmVudF9wYWdlX3R5cGUiLCJyZWFwcGx5X2V2ZW50X2FycmF5IiwicmVhcHBseUV2ZW50IiwicHJldmlvdXNWYWx1ZSIsInRyZWF0bWVudElkcyIsInJlQXBwbHlUcmVhdG1lbnRzIiwidCIsIlJlc2l6ZU9ic2VydmVyIiwicmVhcHBseVNlbGVjdG9yTGlzdCIsInJlYXBwbHlfc2VsZWN0b3IiLCJsYXN0U2Nyb2xsVGltZSIsImdldFRpbWUiLCJzdCIsInBhZ2VZT2Zmc2V0IiwicmVhcHBseUludGVydmFsIiwiYXBwbGllZCIsImJvdW5kRW5nYWdlVHJlYXRtZW50IiwiYmluZCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJydWxlU2V0IiwicHJldmlvdXNTZWxlY3RvcnMiLCJydWxlIiwic2V0IiwiZWxpZ2liaWxpdHlSdWxlIiwib3Bwb3NpdGVGbGFnIiwiZWxpZ2liaWxpdHlTY29wZSIsImVsaWdpYmlsaXR5TmFtZSIsImVsaWdpYmlsaXR5U2V0VHlwZSIsInByZXZpb3VzSXNFbGlnaWJsZSIsImlzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiY2hlY2tEYXRhTGF5ZXJSdWxlIiwiZGF0YUxheWVyRmluZGVyIiwicnVudGltZVZhbHVlIiwiY2hlY2tFbGVtZW50UnVsZSIsInNlbGVjdG9yQWxsIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiY2hlY2tTZXNzaW9uUnVsZSIsImR1cmF0aW9uSGFuZGxlciIsImhpc3RvcnlIYW5kbGVyIiwiZ2V0U2Vzc2lvblRpbWVzdGFtcCIsImN1cnJlbnRIaXN0b3J5IiwiY2hlY2tVcmxSdWxlIiwicmVxdWVzdFVSTCIsImNoZWNrRW52UnVsZSIsImNoZWNrUHJvZHVjdEluZm9SdWxlIiwiZ2V0VHJhbnNhY3Rpb25Db3VudCIsImdldEFkZFRvQ2FydENvdW50IiwiZ2V0UHJldmlld0NvdW50IiwiZ2V0VGl0bGUiLCJnZXREZXNjcmlwdGlvbiIsImdldEZyb21EQiIsIlJ1bGVFbmdpbmUiLCJiYXNlUnVsZVNldCIsImFkZGVkRGF0YUxpc3RlbmVycyIsIm11dGV4IiwiY2hlY2tSdWxlIiwicnVsZVNhdGlzZmllZCIsImNoYWluX2NvbmRpdGlvbiIsImtleVByb21pc2VzTWFwIiwicnVsZXMiLCJydWxlUHJvbWlzZXMiLCJzYXRpc2ZpZWRSdWxlSWRzIiwic2V0VXBMaXN0ZW5lcnMiLCJmaWx0ZXJlZCIsImsiLCJleHRyYWN0UnVsZUF0dHJpYnV0ZXMiLCJkYXRhTGF5ZXJSdWxlcyIsImVsZW1lbnRSdWxlcyIsImJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsIm11dGF0aW9uUmVjb3JkIiwiZXZlcnkiLCJiYXNlUnVsZSIsImVsaWdpYmlsaXR5UnVsZXNPYmoiLCJiZWFnbGVPbiIsImVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwic2VhcmNoUGFyYW1zIiwibGFzdEluZGV4T2YiLCJpdGVtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsInByb2R1Y3RJbmZvREIiLCJwZXJzaXN0UHJvZHVjdEluZm8iLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsImdldEVsaWdpYmlsaXR5UnVsZXMiLCJydWxlRW5naW5lIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJjaGVja1J1bGVzIiwiU0hVVERPV04iLCJtb25pdG9yIiwiZWFybHlMb2dTZW50IiwiY29va2llUGN0IiwicGFja0FuZFF1ZXVlQXJyaXZhbExvZyIsInRyZWF0bWVudFdlaWdodHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50V2VpZ2h0cyIsIm9vc0JyZWFrIiwiaXNMYWJlbFNlbnQiLCJ0aW1lb3V0Q291bnRlciIsIkdMT1ZfT04iLCJTdHJpbmciLCJwcm90b3R5cGUiLCJwYWRTdGFydCIsInByb2Nlc3NBZG1pblVzZXIiLCJpc0FkbWluIiwic2VuZExvZ3MiXSwic291cmNlUm9vdCI6IiJ9
