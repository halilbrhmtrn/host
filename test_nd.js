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
var VERSION = "0.0.41.3.8";
var COOKIE_NAME = "_ga";
var TREATMENTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
var TREATMENT_WEIGHTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weightsv2.json";
var STYLESHEET_LOCATION = isStaging ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
var E_RULES_LOCATION = isStaging ? "https://ndvivense.glov.ai/eligibility_rules_staging.json" : "https://ndvivense.glov.ai/eligibility_rules.json";
var PRODUCT_INFO_LOCATION = "https://ndvivense.glov.ai/social-proof-v2.json";
var LOG_API_URL = "https://europe-west3-nextday-34eb3.cloudfunctions.net/api/log";
var LOOKUP_API_URL = "https://catalog-api.adoraai.com";
var MOBILE_MEDIA_QUERY = "(max-width: 440px)";
// Control group percentage
var SPLIT_RATIO = 50;
var LAB_RATIO = 20;
// Skipped treatment percentage
var TREATMENT_RATIO = 50;
var LOCAL_STORAGE_TTL_HOURS = 2;
var LIST_MODE_BEAGLE_KEYS = (/* unused pure expression or super */ null && (["pagetype", "category", "alltimePLPCategoryMode", "sessionPLPCategoryMode", "alltimePDPCategoryMode", "sessionPDPCategoryMode", "alltimeCartCategoryMode", "sessionCartCategoryMode"]));
var IDLE_TIMEOUT = 15000;
var SESSION_STORAGE_KEYS = {
  SESSION_TIMESTAMP: "BG_SessionTimestamp",
  SESSION_HISTORY: "BG_SessionHistory",
  POPUP_DISPLAY_FLAG: "BG_PopupDisplayFlag",
  SKU_INFO_BASKET: "BG_ProductInfoBasket",
  SESSION_REFERRER: "BG_SessionReferrer",
  MATCHED_TREATMENTS: "GLV_Matched"
};
var LOCAL_STORAGE_KEYS = {
  TREATMENTS: "BG_Treatments",
  WEIGHTS: "BG_Weights",
  ELIGIBILITY_RULES: "BG_E_Rules",
  DEBUG_MODE: "BG_Debug",
  USER_ID: "BG_UserId_01",
  DATA_COLLECTION_DATA_SIZE: "BG_CollectionDataSize",
  IS_ADMIN: "GLV_IsAdmin",
  IS_EMPLOYEE: "GLV_IsEmployee",
  VERSION: "GLV_V"
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
var checkActionSelectors = function checkActionSelectors(actions) {
  var _iterator5 = _createForOfIteratorHelper(actions),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var action = _step5.value;
      var selector = action.selector,
        selectorFallback = action.selectorFallback,
        move_selector_1 = action.move_selector_1,
        move_selector_2 = action.move_selector_2;
      if ((selector || selectorFallback) && !window.top.document.querySelector(selector) && !window.top.document.querySelector(selectorFallback)) {
        logger.failed("Selector/SelectorFallback not found");
        return false;
      }
      if (move_selector_1 && !move_selector_2 || move_selector_2 && !move_selector_1) {
        logger.failed("Both move selectors are required");
        return false;
      }
      if (move_selector_1 && move_selector_2) {
        if (!window.top.document.querySelector(move_selector_1)) {
          logger.failed("Move selector 1 not found: ", move_selector_1);
          return false;
        }
        if (!window.top.document.querySelector(move_selector_2)) {
          logger.failed("Move selector 2 not found: ", move_selector_2);
          return false;
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return true;
};
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
var getDebugMode = function getDebugMode() {
  var DEBUG_MODE = LOCAL_STORAGE_KEYS.DEBUG_MODE,
    IS_EMPLOYEE = LOCAL_STORAGE_KEYS.IS_EMPLOYEE;
  var MATCHED_TREATMENTS = SESSION_STORAGE_KEYS.MATCHED_TREATMENTS;
  try {
    var queryString = window.location.search;
    var current = parseInt(window.localStorage.getItem(DEBUG_MODE));
    if (queryString.includes("nd_debug=")) {
      window.localStorage.setItem(IS_EMPLOYEE, true);
      if (queryString.includes("nd_debug=1")) {
        window.localStorage.setItem(DEBUG_MODE, 1);
        addToBeagleInfoLayer("dbm", "on");
        if (current !== 1) window.sessionStorage.removeItem(MATCHED_TREATMENTS);
        return 1;
      }
      if (queryString.includes("nd_debug=2")) {
        window.localStorage.setItem(DEBUG_MODE, 2);
        addToBeagleInfoLayer("dbm", "on");
        if (current !== 2) window.sessionStorage.removeItem(MATCHED_TREATMENTS);
        return 2;
      }
      if (queryString.includes("nd_debug=-1")) {
        window.localStorage.setItem(DEBUG_MODE, -1);
        addToBeagleInfoLayer("dbm", "on");
        return -1;
      }
      if (queryString.includes("nd_debug=0")) {
        window.localStorage.removeItem(DEBUG_MODE);
        addToBeagleInfoLayer("dbm", "off");
        if (current) window.sessionStorage.removeItem(MATCHED_TREATMENTS);
        return 0;
      }
    }
    if (Number.isNaN(current)) {
      addToBeagleInfoLayer("dbm", "off");
      return 0;
    }
    addToBeagleInfoLayer("dbm", "on");
    return current;
  } catch (err) {
    logger.failed("Could not get debug mode with error: ", err.message);
    window.localStorage.removeItem(DEBUG_MODE);
    addToBeagleInfoLayer("dbm", "off");
    return 0;
  }
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
  var br = ua.match(/(opera|opr|edg|trident|firefox|msie(?=\/))\/?\s*(\d+)/i) || ua.match(/(safari|chrome(?=\/))\/?\s*(\d+)/i) || ua.match(/(webkit(?=\/))\/?\s*(\d+)/i) || [];
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
    osVersion = osVersion ? osVersion[1] : "0";
  } else if (os.iOS) {
    osName = "iOS";
    osVersion = ua.match(/OS ([0-9_]+)/);
    osVersion = osVersion ? osVersion[1].replace(/_/g, ".") : "0";
  } else if (os.Mac) {
    osName = "Mac";
    osVersion = ua.match(/Mac OS X ([0-9_]+)/);
    osVersion = osVersion ? osVersion[1].replace(/_/g, ".") : "0";
  } else if (os.Android) {
    osName = "Android";
    osVersion = ua.match(/Android ([0-9.]+)/);
    osVersion = osVersion ? osVersion[1] : "0";
  } else if (os.Linux) {
    osName = "Linux";
    osVersion = ua.match(/Linux ([i\d]+)/);
    osVersion = osVersion ? osVersion[1] : "0";
  }

  // extract mobile or desktop
  var isMobile = /Mobi/i.test(ua);
  addToBeagleInfoLayer("device.browserName", bName);
  addToBeagleInfoLayer("device.browserVersion", bVersion);
  addToBeagleInfoLayer("device.osName", osName);
  addToBeagleInfoLayer("device.osVersion", osVersion);
  addToBeagleInfoLayer("device.isMobile", isMobile);

  // split OS versions by ., take first part as integer
  var osVersionInt = parseInt(osVersion.split(".")[0]);
  var isSupportedBrowser = bName === "Chrome" || bName === "Safari";
  var isSupportedOS = osName === "Android" && osVersionInt >= 9 || osName === "iOS" && osVersionInt >= 13 || osName === "Windows" && osVersionInt >= 6 || osName === "Mac" && osVersionInt >= 10;
  return isSupportedBrowser && isSupportedOS;
};
var setBrowserData = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10() {
    var _windowPtr$navigator, _windowPtr$navigator$, _windowPtr$navigator2, _windowPtr$navigator3, _windowPtr$screen, _windowPtr$screen2, _windowPtr$screen3, _windowPtr$screen4, _windowPtr$visualView, _windowPtr$visualView2, _windowPtr$history, _windowPtr$navigator4, _windowPtr$navigator5;
    var windowPtr, navPtr, platform, availWindow, windowDepth, vportShape, width, height, iOS, _windowPtr$screen5, _windowPtr$screen5$or, orientationAngle, temp, _navPtr$userAgentData, _navPtr$userAgentData2, _navPtr$userAgentData3, navAgent, firstSessionReferrer;
    return regenerator_default().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
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
          case 22:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function setBrowserData() {
    return _ref10.apply(this, arguments);
  };
}();
var setURLData = function setURLData() {
  var currentURL = new URL(window.top.location.href);
  addToBeagleInfoLayer("u", currentURL.href);
  addToBeagleInfoLayer("d", currentURL.hostname);

  /* Vivense specific */
  var pageType;
  // if url like x then set PageType = y
  if (currentURL.pathname.indexOf("favorilerim.html") > -1) {
    pageType = "Favorites";
  } else if (currentURL.pathname.indexOf("siparis-listesi.html") > -1) {
    pageType = "Basket";
  } else if (currentURL.pathname.indexOf("siparis-ozeti.html") > -1) {
    pageType = "Purchase";
  } else if (currentURL.pathname.indexOf("odeme.html") > -1) {
    pageType = "Payment";
  } else if (currentURL.pathname.indexOf("adres-listesi.html") > -1) {
    pageType = "Address";
  } else if (currentURL.pathname.indexOf("siparislerim.html") > -1) {
    pageType = "PastOrders";
  } else if (currentURL.pathname.indexOf("uye-kayit.html") > -1) {
    pageType = "Register";
  } else if (currentURL.pathname.indexOf("uye-girisi.html") > -1) {
    pageType = "Sign-in";
  } else if (currentURL.pathname.indexOf("kuponlarim.html") > -1) {
    pageType = "ProfileCoupons";
  } else if (currentURL.pathname.indexOf("profil-guncelle.html") > -1) {
    pageType = "ProfileInfo";
  } else if (currentURL.pathname.indexOf("adreslerim.html") > -1) {
    pageType = "ProfileAddresses";
  } else if (currentURL.pathname.indexOf("duyuru-tercihleri.html") > -1) {
    pageType = "ProfileNotifications";
  } else if (currentURL.pathname.indexOf("indirimli-mobilya-kampanyalari.html") > -1) {
    pageType = "SpecialCampaigns";
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
var checkVersion = function checkVersion() {
  var currentVersion = window.localStorage.getItem(LOCAL_STORAGE_KEYS.VERSION);
  if (currentVersion !== VERSION) {
    for (var _i3 = 0, _Object$keys2 = Object.keys(LOCAL_STORAGE_KEYS); _i3 < _Object$keys2.length; _i3++) {
      var key = _Object$keys2[_i3];
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
    }
    for (var _i4 = 0, _Object$keys3 = Object.keys(SESSION_STORAGE_KEYS); _i4 < _Object$keys3.length; _i4++) {
      var _key3 = _Object$keys3[_i4];
      window.sessionStorage.removeItem(SESSION_STORAGE_KEYS[_key3]);
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.VERSION, VERSION);
  }
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
;// CONCATENATED MODULE: ./src/BeagleInfoLayer/configs.js



/* eslint-disable max-len */


// TODO: convert to name --> array of selectors
var searchPaths = [
// ----------------------------------------------------------------------------------------------------------------------------------------------
// GA Data Layer Queries
{
  PageTypeDepend: "*",
  method: "GADataLayer",
  selector: "PageType",
  name: "PageType",
  formatter: "pageTypeGA2Glov"
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
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "content_name",
  name: "pdp.name"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "productgroup",
  name: "pdp.group"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "vivense_category",
  name: "pdp.class"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "content_ids",
  name: "pdp.sku",
  formatter: "upperCaseTR"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "ProductID",
  name: "pdp.sku"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "content_category",
  name: "pdp.category"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "ecommerce.detail.actionField.list",
  name: "pdp.listalias"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "vivenseProducts.*.sku",
  name: "pdp.sku",
  formatter: "dearray"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "vivenseProducts.*.category",
  name: "pdp.category",
  formatter: "dearray"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "vivenseProducts.*.discountRate",
  name: "pdp.discountRate",
  formatter: "dearray"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "vivenseProducts.*.fastDelivery",
  name: "pdp.fastDelivery",
  formatter: "dearray"
}, {
  PageTypeDepend: "PDP",
  method: "GADataLayer",
  selector: "vivenseProducts.*.isInShowroom",
  name: "pdp.isInShowroom",
  formatter: "dearray"
}, {
  PageTypeDepend: "PLP",
  method: "GADataLayer",
  selector: "search_success",
  name: "plp.searchSuccess",
  exclusive: ["plp.id", "plp.approximateCount", "plp.name", "plp.group", "plp.class"]
}, {
  PageTypeDepend: "PLP",
  method: "GADataLayer",
  selector: "content_ids",
  name: "plp.id",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "PLP",
  method: "GADataLayer",
  selector: "category_product_count",
  name: "plp.approximateCount",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "PLP",
  method: "GADataLayer",
  selector: "content_name",
  name: "plp.name",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "PLP",
  method: "GADataLayer",
  selector: "productgroup",
  name: "plp.group",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "PLP",
  method: "GADataLayer",
  selector: "vivense_category",
  name: "plp.class",
  exclusive: ["plp.searchSuccess"]
}, {
  PageTypeDepend: "Purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.id",
  name: "purchase.skus"
}, {
  PageTypeDepend: "Purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.price",
  name: "purchase.prices"
}, {
  PageTypeDepend: "Purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.quantity",
  name: "purchase.quantities"
}, {
  PageTypeDepend: "Purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.products.*.category",
  name: "purchase.categories"
}, {
  PageTypeDepend: "Purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.actionField.id",
  name: "purchase.orderId"
}, {
  PageTypeDepend: "Purchase",
  method: "GADataLayer",
  selector: "ecommerce.purchase.actionField.revenue",
  name: "purchase.revenue"
}, {
  PageTypeDepend: "Purchase",
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
  value: "PLP"
}, {
  PageTypeDepend: "*",
  method: "DocQuery",
  selector: "[class*=\"product-main-details\"]",
  name: "PageType",
  operand: "docQueryValueIfHasInnerText",
  value: "PDP"
}, {
  PageTypeDepend: "*",
  method: "DocQuery",
  selector: "[class*=\"product\"]",
  name: "PageType",
  operand: "docQueryValueIfHasInnerText",
  value: "PDP"
}, {
  PageTypeDepend: "Homepage|PDP|PLP",
  method: "DocQuery",
  selector: "[class*=\"welcome_username\"]",
  name: "view.isLoggedIn",
  operand: "docQueryHasInnerText"
}, {
  PageTypeDepend: "Homepage|PDP|PLP",
  method: "DocQuery",
  selector: "[class*=\"empty_basket_text\"]",
  name: "cart.isempty",
  operand: "docQueryHasInnerText",
  exclusive: ["cart.totalBasePrice", "cart.skucount", "cart.couponNotApplicable"]
}, {
  PageTypeDepend: "Homepage|PDP|PLP",
  method: "DocQuery",
  selector: "body > .desktop_layout_wrapper .not-allowed-coupon",
  name: "cart.couponNotApplicable",
  operand: "docQuerySumNumInnerText",
  exclusive: ["cart.isempty"]
},
// Note that sequential search will mark copuonNotApplicable as found
{
  PageTypeDepend: "Homepage|PDP|PLP",
  method: "DocQuery",
  selector: "[class*=\"basket_total_price\"]",
  name: "cart.totalBasePrice",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "Homepage|PDP|PLP",
  method: "DocQuery",
  selector: "[id*=\"cart_quantity\"], [class*=\"basket_length\"]",
  name: "cart.skucount",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"]
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "[class*=\"delivery-date\"]",
  name: "pdp.deliveryDate",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "[class*=\"delivery-date\"]",
  name: "pdp.deliveryDateFormatted",
  operand: "docQueryInnerText",
  formatter: "formatDeliveryDate"
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "[class*=\"product-title\"], [class*=\"header-bottom\"]",
  name: "pdp.name",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "[class*=\"vivense-showrooms\"] > *",
  name: "pdp.showroomcount",
  operand: "docQueryCountElts",
  exclusive: ["pdp.hasNoShowrooms"]
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "#vivense-showroom-tab p:not(.vivense-showrooms)",
  name: "pdp.hasNoShowrooms",
  operand: "docQueryHasInnerText",
  exclusive: ["pdp.showroomcount"]
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "span.price",
  name: "pdp.price",
  operand: "docQueryInnerText",
  formatter: "numericOnly"
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "#sales-price",
  name: "pdp.price",
  operand: "docQueryInnerText",
  formatter: "numericOnly"
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "div.product-price-box",
  name: "__priceObserver",
  children: ["pdp.price"],
  operand: "docQueryObserve"
}, {
  PageTypeDepend: "PDP",
  method: "DocQuery",
  selector: "#mobile-product-sticky",
  name: "__priceObserver",
  children: ["pdp.price"],
  operand: "docQueryObserve"
}, {
  PageTypeDepend: "PLP",
  method: "DocQuery",
  selector: "[class*=\"count-of-product\"]",
  name: "plp.itemCount",
  operand: "docQueryInnerText",
  formatter: "numericOnly"
}, {
  PageTypeDepend: "PLP",
  method: "DocQuery",
  selector: "[class*=\"subcategories-title\"]",
  name: "plp.name",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "PLP",
  method: "DocQuery",
  selector: ".product-card[data-product-sku]",
  name: "__features.SKUsonPage",
  operand: "docQueryAttribValueList",
  value: "data-product-sku"
}, {
  PageTypeDepend: "PLP",
  method: "DocQuery",
  selector: ".product-list",
  name: "__listingItemBlockObserver",
  children: ["__features.SKUsonPage"],
  operand: "docQueryObserve"
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: ".empty-cart-container, .empty-cart",
  name: "cart.isempty",
  operand: "docQueryHasInnerText",
  exclusive: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "__checkoutFormObserver"]
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: ".bracket-text, .product-count",
  name: "cart.skucount",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: ".cartItemQuantity",
  name: "cart.quantities",
  operand: "docQueryAttribValueList",
  value: "data-previous",
  exclusive: ["cart.isempty"]
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: "#bill_total",
  name: "cart.totalPrice",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: "[class*=\"order-final-number\"]",
  name: "cart.totalPriceFinal",
  operand: "docQueryInnerText",
  exclusive: ["cart.isempty"],
  formatter: "numericOnly"
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: "[class*=\"cart-price\"] .not-allowed-coupon",
  name: "cart.couponNotApplicable",
  operand: "docQuerySumNumInnerText",
  exclusive: ["cart.isempty"]
},
// Note that sequential search will mark couponApplicable as found
{
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: ".cart-inside",
  name: "cart.skus",
  operand: "docQueryAttribValueList",
  value: "data-sku",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"]
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: ".cart-inside",
  name: "cart.categories",
  operand: "docQueryAttribValueList",
  value: "data-last-breadcrumb",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"]
}, {
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: ".cart-inside",
  name: "cart.prices",
  operand: "docQueryAttribValueList",
  value: "data-price",
  exclusive: ["cart.isempty", "cart.couponNotApplicable"]
},
// Desktop observer for the right panel, as it is the one changing
{
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: ".cart-right-container",
  name: "__checkoutFormObserver",
  children: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "cart.isempty", "cart.couponApplicableAmount"],
  operand: "docQueryObserve"
},
// Mobile observer for the full form block as it is completely replaced
{
  PageTypeDepend: "Basket",
  method: "DocQuery",
  selector: "#checkoutForm",
  name: "__checkoutFormObserver",
  children: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "cart.isempty", "cart.couponApplicableAmount"],
  operand: "docQueryObserve"
}, {
  PageTypeDepend: "Purchase",
  method: "DocQuery",
  selector: ".vvns-order-completed-page__order-price-total",
  name: "purchase.revenue",
  operand: "docQueryInnerText",
  formatter: "numericOnly"
}, {
  PageTypeDepend: "Purchase",
  method: "DocQuery",
  selector: ".vvns-order-completed-page__order-info",
  name: "purchase.vvsTxnId",
  operand: "docQueryInnerText"
}, {
  PageTypeDepend: "Purchase",
  method: "DocQuery",
  selector: ".vvns-order-completed-page__order-title",
  name: "purchase.paymentType",
  operand: "docQueryInnerText",
  formatter: "lowerCaseTRFirstWord"
}, {
  PageTypeDepend: "Purchase",
  method: "DocQuery",
  selector: ".vvns-order-completed-page__payment-title",
  name: "purchase.paymentType",
  operand: "docQueryInnerText",
  formatter: "lowerCaseTRFirstWord"
}, {
  PageTypeDepend: "Purchase",
  method: "DocQuery",
  selector: ".vvns-order-completed-page__order-list-wrapper",
  name: "purchase.skus",
  operand: "docQueryAttribValueList",
  value: "data-sku"
},
// ----------------------------------------------------------------------------------------------------------------------------------------------
// SORG Elements
{
  PageTypeDepend: "PDP",
  method: "DocSorg",
  selector: "sku",
  name: "pdp.sku"
}, {
  PageTypeDepend: "PDP",
  method: "DocSorg",
  selector: "mpn",
  name: "pdp.mpn"
}, {
  PageTypeDepend: "PDP",
  method: "DocSorg",
  selector: "name",
  name: "pdp.name",
  operand: "JSONFilterOther",
  value: "@type=Product"
}, {
  PageTypeDepend: "PDP",
  method: "DocSorg",
  selector: "offers.priceValidUntil",
  name: "pdp.priceValidUntil"
}, {
  PageTypeDepend: "PDP",
  method: "DocSorg",
  selector: "itemListElement.*.name",
  name: "view.breadcrumb"
}, {
  PageTypeDepend: "PLP",
  method: "DocSorg",
  selector: "mainEntity.name",
  name: "plp.name"
}, {
  PageTypeDepend: "PLP",
  method: "DocSorg",
  selector: "mainEntity.numberOfItems",
  name: "plp.itemCount"
}, {
  PageTypeDepend: "PLP",
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
  }, {
    deriveMethod: "carrySkuToFeatures"
  }],
  "cart.isempty": [{
    deriveMethod: "calculateCouponAllowances"
  }],
  "cart.totalBasePrice": [{
    deriveMethod: "calculateCouponAllowances"
  }],
  "cart.couponNotApplicable": [{
    deriveMethod: "calculateCouponAllowances"
  }],
  "cart.prices": [{
    deriveMethod: "calculateCouponAllowances"
  }],
  "cart.quantities": [{
    deriveMethod: "calculateCouponAllowances"
  }],
  "pdp.sku": [{
    deriveMethod: "carrySkuToFeatures"
  }]
};
var configs_logger = new src_logger("GlovInfoLayerRepo");
var customDerivationRepo = {};
// functions must have 3 input parameters: baseFeatureName, getFromBeagleInfoLayer and addToBeagleInfoLayer

// push a new function to the repo to create a new custom derivation
customDerivationRepo.calculateCouponAllowances = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(baseFeatureName, getFromBeagleInfoLayer, addToBeagleInfoLayer) {
    var _yield$Promise$all, _yield$Promise$all2, isCartEmpty, totalBasePrice, couponNotApplicable, prices, quantities, totalPrice, i, couponApplicableAmount;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configs_logger.log("customDerivationRepo.calculateCouponAllowances", "Deriving from ".concat(baseFeatureName));
            _context.prev = 1;
            _context.next = 4;
            return Promise.all([getFromBeagleInfoLayer("cart.isempty"), getFromBeagleInfoLayer("cart.totalBasePrice"), getFromBeagleInfoLayer("cart.couponNotApplicable"), getFromBeagleInfoLayer("cart.prices"), getFromBeagleInfoLayer("cart.quantities")]);
          case 4:
            _yield$Promise$all = _context.sent;
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
              // NOTE: cart.couponNotApplicable is also a trigger, to prevent infinite loop, only set it if it is not already set or not the trigger
              if (baseFeatureName !== "cart.couponNotApplicable" && (couponNotApplicable === null || parseInt(couponNotApplicable) !== 0)) {
                addToBeagleInfoLayer("cart.couponNotApplicable", 0);
              }
            }
            _context.next = 22;
            break;
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);
            configs_logger.error("customDerivationRepo.calculateCouponAllowances: " + _context.t0);
          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 19]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
customDerivationRepo.carrySkuToFeatures = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(baseFeatureName, getFromBeagleInfoLayer, addToBeagleInfoLayer) {
    var currentPageType, sku, skuList;
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            configs_logger.log("customDerivationRepo.carrySkuToFeatures", "Deriving from ".concat(baseFeatureName));
            _context2.next = 3;
            return getFromBeagleInfoLayer("PageType", true, 50, 1000);
          case 3:
            currentPageType = _context2.sent;
            if (!(currentPageType === "Productpage")) {
              _context2.next = 13;
              break;
            }
            _context2.next = 7;
            return getFromBeagleInfoLayer("pdp.sku");
          case 7:
            sku = _context2.sent;
            if (!(sku !== null && sku !== undefined)) {
              _context2.next = 11;
              break;
            }
            _context2.next = 11;
            return addToBeagleInfoLayer("__features.SKUsonPage", [sku]);
          case 11:
            _context2.next = 20;
            break;
          case 13:
            if (!(currentPageType === "basket")) {
              _context2.next = 20;
              break;
            }
            _context2.next = 16;
            return getFromBeagleInfoLayer("cart.skus");
          case 16:
            skuList = _context2.sent;
            if (!(skuList !== null && Array.isArray(skuList) && skuList.length)) {
              _context2.next = 20;
              break;
            }
            _context2.next = 20;
            return addToBeagleInfoLayer("__features.SKUsonPage", skuList);
          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
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
    updateDerivations(key, typedValue);
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
var prevPassedValues = {};
var passValueToListeners = function passValueToListeners(key, value) {
  /* if (prevPassedValues[key] === value) {
    logger.log(`passValueToListeners --> skipping due to re-pass of the same value ${value} of key ${key}`);
    return;
  }*/
  var listeners = DATA_LISTENERS[key];
  if (listeners && Array.isArray(listeners) && listeners.length > 0) {
    for (var i = 0; i < listeners.length; i += 1) {
      var listener = listeners[i];
      if (typeof listener === "function") {
        BeagleInfoLayer_logger.log("passValueToListeners --> value ".concat(value, " to listener ").concat(i, " of key ").concat(key));
        listener(value);
        // prevPassedValues[key] = value;
      }
    }
  }
};

var getFromBeagleInfoLayer = function getFromBeagleInfoLayer(key) {
  var blocking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var pollInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
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
  updateDerivations(key, null);
  passValueToListeners(key, null);
};
var addTreatment = function addTreatment(id, businessRuleId, variant, status, dependant_on_treatment) {
  var value = {};
  var infoLayer = window.top.beagleInfoLayer;
  if (businessRuleId) value.businessRuleId = businessRuleId;
  if (variant) value.variant = variant;
  if (dependant_on_treatment) value.dependant_on_treatment = dependant_on_treatment;
  switch (status) {
    case "applied":
      infoLayer.a[id] = value;
      break;
    case "eligible":
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
var updateDerivations = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(baseFeatureName, baseFeatureValue) {
    var FEData, _iterator3, _step3, FEOp, _iterator4, _step4, _FEOp, queryResponse, _iterator5, _step5, _FEOp2, deriveFunct;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // process dependent historical data for scan-found elements
            FEData = featureEngineeringOps[baseFeatureName];
            if (!(FEData && Array.isArray(FEData) && FEData.length > 0)) {
              _context.next = 63;
              break;
            }
            // Do updates first
            _iterator3 = BeagleInfoLayer_createForOfIteratorHelper(FEData);
            _context.prev = 3;
            _iterator3.s();
          case 5:
            if ((_step3 = _iterator3.n()).done) {
              _context.next = 13;
              break;
            }
            FEOp = _step3.value;
            if (!(FEOp.updateMethod === null || FEOp.updateMethod === undefined)) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("continue", 11);
          case 9:
            _context.next = 11;
            return updateInCollector(baseFeatureName, baseFeatureValue, FEOp.updateMethod);
          case 11:
            _context.next = 5;
            break;
          case 13:
            _context.next = 18;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](3);
            _iterator3.e(_context.t0);
          case 18:
            _context.prev = 18;
            _iterator3.f();
            return _context.finish(18);
          case 21:
            // Process queries after the updates
            _iterator4 = BeagleInfoLayer_createForOfIteratorHelper(FEData);
            _context.prev = 22;
            _iterator4.s();
          case 24:
            if ((_step4 = _iterator4.n()).done) {
              _context.next = 34;
              break;
            }
            _FEOp = _step4.value;
            if (!(_FEOp.queryMethod === null || _FEOp.queryMethod === undefined)) {
              _context.next = 28;
              break;
            }
            return _context.abrupt("continue", 32);
          case 28:
            _context.next = 30;
            return queryInCollector(baseFeatureName, _FEOp.queryMethod, _FEOp.window);
          case 30:
            queryResponse = _context.sent;
            addToBeagleInfoLayer(_FEOp.featureName, queryResponse);
          case 32:
            _context.next = 24;
            break;
          case 34:
            _context.next = 39;
            break;
          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](22);
            _iterator4.e(_context.t1);
          case 39:
            _context.prev = 39;
            _iterator4.f();
            return _context.finish(39);
          case 42:
            // Process derivations after the updates
            _iterator5 = BeagleInfoLayer_createForOfIteratorHelper(FEData);
            _context.prev = 43;
            _iterator5.s();
          case 45:
            if ((_step5 = _iterator5.n()).done) {
              _context.next = 55;
              break;
            }
            _FEOp2 = _step5.value;
            if (!(_FEOp2.deriveMethod === null || _FEOp2.deriveMethod === undefined)) {
              _context.next = 49;
              break;
            }
            return _context.abrupt("continue", 53);
          case 49:
            deriveFunct = customDerivationRepo[_FEOp2.deriveMethod];
            if (!(deriveFunct === null || deriveFunct === undefined || typeof deriveFunct !== "function")) {
              _context.next = 52;
              break;
            }
            return _context.abrupt("continue", 53);
          case 52:
            deriveFunct(baseFeatureName, getFromBeagleInfoLayer, addToBeagleInfoLayer);
          case 53:
            _context.next = 45;
            break;
          case 55:
            _context.next = 60;
            break;
          case 57:
            _context.prev = 57;
            _context.t2 = _context["catch"](43);
            _iterator5.e(_context.t2);
          case 60:
            _context.prev = 60;
            _iterator5.f();
            return _context.finish(60);
          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 15, 18, 21], [22, 36, 39, 42], [43, 57, 60, 63]]);
  }));
  return function updateDerivations(_x, _x2) {
    return _ref.apply(this, arguments);
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
    case "pageTypeGA2Glov":
      switch (value) {
        case "Productpage":
          return "PDP";
        case "Listingpage":
          return "PLP";
        case "basket":
          return "Basket";
        default:
          return value;
      }
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(mutationList) {
              var triggerRestart;
              return regenerator_default().wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!isOwnMutation(mutationList)) {
                        _context2.next = 2;
                        break;
                      }
                      return _context2.abrupt("return");
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
                        startInfoLayerScan();
                      }
                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
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
          var _iterator6 = BeagleInfoLayer_createForOfIteratorHelper(value),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var valuechild = _step6.value;
              var attribValue = valuechild.getAttribute(searchElement.value);
              if (attribValue) {
                attribValueList.push(attribValue);
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
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
          var _iterator7 = BeagleInfoLayer_createForOfIteratorHelper(value),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var child = _step7.value;
              var childText = child.innerText.trim().replace(/\D/g, "");
              if (childText.length > 0) {
                sumPrice += parseInt(childText);
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
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
          var _iterator8 = BeagleInfoLayer_createForOfIteratorHelper(value),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _child = _step8.value;
              var _childText = _child.innerText.trim();
              if (_childText.length > 0) {
                arrayInnerText.push(_childText);
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
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
        var _iterator9 = BeagleInfoLayer_createForOfIteratorHelper(searchPaths),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var exclusiveElement = _step9.value;
            if (searchElement.exclusive.includes(exclusiveElement.name)) {
              exclusiveElement.isFound = true;
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
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
var parseSearchPaths = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
    var domStatus, wintop, dataLayer, windoc, sorgArrayInner, foundNames, prevFoundNames, notFoundNames, currentPageType, _iterator10, _step10, searchElement, _iterator11, _step11, _searchElement, _iterator12, _step12, dataLayerItem, _iterator13, _step13, sorgItem;
    return regenerator_default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            domStatus = document.readyState; // check if document and dom is loaded and ready for scrapping
            BeagleInfoLayer_logger.log("parseSearchPaths initialized with dom status:  " + domStatus);
            wintop = window.top;
            dataLayer = wintop.dataLayer;
            windoc = wintop.document;
            foundNames = new Set();
            prevFoundNames = new Set();
            notFoundNames = new Set(); // PageType can be inferred from URL, if found use it from there
            _context3.next = 10;
            return getFromBeagleInfoLayer("PageType");
          case 10:
            currentPageType = _context3.sent;
            if (currentPageType) {
              prevFoundNames.add("PageType");
            }

            // Loop through search lists and mark found names
            _iterator10 = BeagleInfoLayer_createForOfIteratorHelper(searchPaths);
            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                searchElement = _step10.value;
                if (searchElement.isFound) {
                  prevFoundNames.add(searchElement.name);
                }
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }
            _iterator11 = BeagleInfoLayer_createForOfIteratorHelper(searchPaths);
            _context3.prev = 15;
            _iterator11.s();
          case 17:
            if ((_step11 = _iterator11.n()).done) {
              _context3.next = 38;
              break;
            }
            _searchElement = _step11.value;
            if (!(_searchElement.isFound || _searchElement.isIgnore)) {
              _context3.next = 21;
              break;
            }
            return _context3.abrupt("continue", 36);
          case 21:
            if (!(foundNames.has(_searchElement.name) || prevFoundNames.has(_searchElement.name))) {
              _context3.next = 24;
              break;
            }
            // had already found this element on another parse item
            _searchElement.isFound = true;
            return _context3.abrupt("continue", 36);
          case 24:
            if (!(_searchElement.PageTypeDepend !== "*")) {
              _context3.next = 35;
              break;
            }
            if (currentPageType) {
              _context3.next = 32;
              break;
            }
            _context3.next = 28;
            return getFromBeagleInfoLayer("PageType");
          case 28:
            currentPageType = _context3.sent;
            if (currentPageType) {
              _context3.next = 32;
              break;
            }
            notFoundNames.add(_searchElement.name);
            return _context3.abrupt("continue", 36);
          case 32:
            if (!(_searchElement.PageTypeDepend.indexOf(currentPageType) < 0)) {
              _context3.next = 35;
              break;
            }
            // skip searchElement because of PageTypeDepend
            _searchElement.isIgnore = true;
            return _context3.abrupt("continue", 36);
          case 35:
            if (_searchElement.method === "SingleWT") {
              // SCAN Window for Single Elements
              searchAndSet(wintop, _searchElement, foundNames, notFoundNames);
            } else if (_searchElement.method === "GADataLayer") {
              // SCAN GA DATA LAYER
              _iterator12 = BeagleInfoLayer_createForOfIteratorHelper(dataLayer);
              try {
                for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                  dataLayerItem = _step12.value;
                  searchAndSet(dataLayerItem, _searchElement, foundNames, notFoundNames);
                }
              } catch (err) {
                _iterator12.e(err);
              } finally {
                _iterator12.f();
              }
            } else if (_searchElement.method === "DocSorg") {
              // SCAN SORG ARRAY
              if (!sorgArrayInner) {
                sorgArrayInner = getSORGArray();
              }
              _iterator13 = BeagleInfoLayer_createForOfIteratorHelper(sorgArrayInner);
              try {
                for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                  sorgItem = _step13.value;
                  searchAndSet(sorgItem, _searchElement, foundNames, notFoundNames);
                }
              } catch (err) {
                _iterator13.e(err);
              } finally {
                _iterator13.f();
              }
            } else if (_searchElement.method === "DocQuery") {
              // SCAN DOCUMENT
              searchAndSet(windoc, _searchElement, foundNames, notFoundNames);
            } // DOCQUERY parse
          case 36:
            _context3.next = 17;
            break;
          case 38:
            _context3.next = 43;
            break;
          case 40:
            _context3.prev = 40;
            _context3.t0 = _context3["catch"](15);
            _iterator11.e(_context3.t0);
          case 43:
            _context3.prev = 43;
            _iterator11.f();
            return _context3.finish(43);
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
            return _context3.stop();
        }
      }
    }, _callee3, null, [[15, 40, 43, 46]]);
  }));
  return function parseSearchPaths() {
    return _ref3.apply(this, arguments);
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
var startInfoLayerScan = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
    return regenerator_default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return parseSearchPaths();
          case 2:
            if (parseSearchPathsRetry < PARSESEARCHMAXRETRY) {
              BeagleInfoLayer_logger.log("parseSearchPaths: scheduled to be recalled in " + parseSearchPathsDelay + "ms");
              setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
                return regenerator_default().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return startInfoLayerScan();
                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              })), parseSearchPathsDelay);
            }
          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function startInfoLayerScan() {
    return _ref4.apply(this, arguments);
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

// TODO: move this to an "element collector" module, then data is extracted from pre-collected elements
var getSORGArray = function getSORGArray() {
  var schemaOrgElts = window.top.document.querySelectorAll("[type=\"application/ld+json\"]");
  var sorgArray = [];
  var _iterator14 = BeagleInfoLayer_createForOfIteratorHelper(schemaOrgElts),
    _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var sTag = _step14.value;
      try {
        var cntnt = sTag.textContent;
        var jsoncontent = JSON.parse(cntnt);
        sorgArray.push(jsoncontent);
      } catch (err) {
        // do nothing
      }
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
  return sorgArray;
};
;// CONCATENATED MODULE: ./src/GlovBeacon/index.js








var GlovBeacon_logger = new src_logger("GlovBeacon");
var HEADERS = {
  type: "text/plain"
};
var Beacon = /*#__PURE__*/function () {
  function Beacon() {
    _classCallCheck(this, Beacon);
    GlovBeacon_logger.log("Initializing beacon sender");
    this.hasArrivalLogSent = false;
    this.hasMainLogSent = false;
    this.hasUpdatesSent = false;
    this.highWaterMark = null;
    this.initializeExitEventListeners();
  }

  // Send initial log body and incremental update logs on close
  _createClass(Beacon, [{
    key: "handleCloseEvent",
    value: function () {
      var _handleCloseEvent = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.packAndQueueMainLog();
              case 2:
                _context.next = 4;
                return this.packAndQueueIncrementalLog();
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function handleCloseEvent() {
        return _handleCloseEvent.apply(this, arguments);
      }
      return handleCloseEvent;
    }()
  }, {
    key: "packAndQueueMainLog",
    value: function () {
      var _packAndQueueMainLog = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var requestBlob;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.hasMainLogSent) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _context2.next = 4;
                return this.packageMainLogData();
              case 4:
                requestBlob = _context2.sent;
                if (!requestBlob) {
                  _context2.next = 11;
                  break;
                }
                _context2.next = 8;
                return this.checkForLatestChanges();
              case 8:
                GlovBeacon_logger.log("Request blob to send: ", requestBlob);
                this.hasMainLogSent = true;
                this.queueLogs(requestBlob);
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function packAndQueueMainLog() {
        return _packAndQueueMainLog.apply(this, arguments);
      }
      return packAndQueueMainLog;
    }()
  }, {
    key: "packAndQueueIncrementalLog",
    value: function () {
      var _packAndQueueIncrementalLog = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var hasChanged, logData;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.hasMainLogSent || this.hasUpdatesSent)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.next = 4;
                return this.checkForLatestChanges();
              case 4:
                hasChanged = _context3.sent;
                GlovBeacon_logger.log("Update logs change status: ", hasChanged);
                if (hasChanged) {
                  _context3.next = 8;
                  break;
                }
                return _context3.abrupt("return");
              case 8:
                _context3.next = 10;
                return this.packageIncrementalLogData();
              case 10:
                logData = _context3.sent;
                if (logData) {
                  GlovBeacon_logger.log("Sending incremental logs", logData);
                  this.hasUpdatesSent = true;
                  this.queueLogs(logData);
                }
              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function packAndQueueIncrementalLog() {
        return _packAndQueueIncrementalLog.apply(this, arguments);
      }
      return packAndQueueIncrementalLog;
    }()
  }, {
    key: "packAndQueueArrivalLog",
    value: function () {
      var _packAndQueueArrivalLog = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var requestBlob;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.hasMainLogSent || this.hasArrivalLogSent)) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                _context4.next = 4;
                return this.packageArrivalLogData();
              case 4:
                requestBlob = _context4.sent;
                if (requestBlob) {
                  // prepare change detection hashes at the time of main log preparation
                  GlovBeacon_logger.log("Arrival blob to send: ", requestBlob);
                  this.hasArrivalLogSent = true;
                  this.queueLogs(requestBlob);
                }
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function packAndQueueArrivalLog() {
        return _packAndQueueArrivalLog.apply(this, arguments);
      }
      return packAndQueueArrivalLog;
    }()
  }, {
    key: "checkForLatestChanges",
    value: function () {
      var _checkForLatestChanges = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var hwm;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return getFromBeagleInfoLayer("__hwm");
              case 2:
                hwm = _context5.sent;
                if (!(this.highWaterMark !== hwm)) {
                  _context5.next = 6;
                  break;
                }
                this.highWaterMark = hwm;
                return _context5.abrupt("return", true);
              case 6:
                return _context5.abrupt("return", false);
              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function checkForLatestChanges() {
        return _checkForLatestChanges.apply(this, arguments);
      }
      return checkForLatestChanges;
    }()
  }, {
    key: "packageArrivalLogData",
    value: function () {
      var _packageArrivalLogData = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        var _yield$Promise$all, _yield$Promise$all2, url, hash, cookieGaId, view_epoch, body;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Promise.all([getFromBeagleInfoLayer("u"), getFromBeagleInfoLayer("onHashPct"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);
              case 2:
                _yield$Promise$all = _context6.sent;
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
                GlovBeacon_logger.log("Arrival log data: ", body);
                return _context6.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));
              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      function packageArrivalLogData() {
        return _packageArrivalLogData.apply(this, arguments);
      }
      return packageArrivalLogData;
    }()
  }, {
    key: "packageMainLogData",
    value: function () {
      var _packageMainLogData = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7() {
        var body, _i, _Object$entries, _Object$entries$_i, key, value;
        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                body = {};
                if (window.beagleInfoLayer) {
                  _context7.next = 3;
                  break;
                }
                return _context7.abrupt("return", null);
              case 3:
                for (_i = 0, _Object$entries = Object.entries(window.beagleInfoLayer); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                  if (!key.startsWith("_") && value !== null) body[key] = value;
                }
                body.lc = 1;
                return _context7.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));
              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      function packageMainLogData() {
        return _packageMainLogData.apply(this, arguments);
      }
      return packageMainLogData;
    }()
  }, {
    key: "packageIncrementalLogData",
    value: function () {
      var _packageIncrementalLogData = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee8() {
        var _yield$Promise$all3, _yield$Promise$all4, a, e, f, s, m, cookieGaId, view_epoch, body;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Promise.all([getFromBeagleInfoLayer("a"), getFromBeagleInfoLayer("e"), getFromBeagleInfoLayer("f"), getFromBeagleInfoLayer("s"), getFromBeagleInfoLayer("m"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);
              case 2:
                _yield$Promise$all3 = _context8.sent;
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
                GlovBeacon_logger.log("Update log data: ", body);
                return _context8.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));
              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
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
      GlovBeacon_logger.log("Initializing exit event listener");
      window.addEventListener("beforeunload", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9() {
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                GlovBeacon_logger.log("In beforeunload event");
                clearTimeout(visibilityChangeTimeout);
                _context9.next = 4;
                return _this.handleCloseEvent();
              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      })), {
        capture: true
      });
      window.addEventListener("pagehide", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10() {
        return regenerator_default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                GlovBeacon_logger.log("In pagehide event");
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
      window.addEventListener("visibilitychange", function () {
        if (window.top.document.visibilityState === "hidden") {
          // If page is not visible and doesn't become visible within 30 seconds, send logs
          visibilityChangeTimeout = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee11() {
            return regenerator_default().wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    GlovBeacon_logger.log("In timeout");
                    _context11.next = 3;
                    return _this.handleCloseEvent();
                  case 3:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11);
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
          GlovBeacon_logger.log("Logs queued successfully");
        }
      }, 10);
      if (queued) return;
      setTimeout(function () {
        clearInterval(queueInterval);
        if (!queued) {
          GlovBeacon_logger.log("Logs not queued");
        }
      }, 1000);
    }
  }]);
  return Beacon;
}();
/* harmony default export */ var GlovBeacon = (Beacon);
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
        var clearPromise, existingProdInfo, cursor, timestamp, elapsedSeconds, productInfoPromise, _yield$Promise$all, _yield$Promise$all2, productInfoArray;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                addToBeagleInfoLayer("m", "pinfo-check-existing");
                clearPromise = null;
                _context9.next = 4;
                return this.count();
              case 4:
                existingProdInfo = _context9.sent;
                if (!existingProdInfo) {
                  _context9.next = 16;
                  break;
                }
                GlovProductInfoRepository_logger.log("Existing product info found");
                _context9.next = 9;
                return this.getCursor();
              case 9:
                cursor = _context9.sent;
                timestamp = cursor.value.timestamp;
                elapsedSeconds = Date.now() / 1000 - timestamp; // Re-fetch product info once a day
                if (!(elapsedSeconds < 86400)) {
                  _context9.next = 14;
                  break;
                }
                return _context9.abrupt("return");
              case 14:
                GlovProductInfoRepository_logger.log("Existing product info is expired");
                clearPromise = this.clear();
              case 16:
                addToBeagleInfoLayer("m", "pinfo-fetch");
                productInfoPromise = fetchProductInfo();
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
                addToBeagleInfoLayer("m", "pinfo-presave");
                _context9.next = 28;
                return this.save(this.preparePayloads(productInfoArray));
              case 28:
                addToBeagleInfoLayer("m", "pinfo-saved");
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
  }, {
    key: "checkInitialized",
    value: function () {
      var _checkInitialized = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee11(callback) {
        var _this2 = this;
        var existingProdInfo, skuList, productInfoTimeout, productInfoInterval;
        return regenerator_default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.count();
              case 2:
                existingProdInfo = _context11.sent;
                _context11.next = 5;
                return getFromBeagleInfoLayer("pdp.sku", true);
              case 5:
                _context11.t0 = _context11.sent;
                if (_context11.t0) {
                  _context11.next = 10;
                  break;
                }
                _context11.next = 9;
                return getFromBeagleInfoLayer("__features.SKUsonPage", true);
              case 9:
                _context11.t0 = _context11.sent;
              case 10:
                skuList = _context11.t0;
                if (!(existingProdInfo && skuList)) {
                  _context11.next = 14;
                  break;
                }
                callback();
                return _context11.abrupt("return");
              case 14:
                productInfoTimeout = null;
                productInfoInterval = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10() {
                  return regenerator_default().wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return _this2.count();
                        case 2:
                          existingProdInfo = _context10.sent;
                          if (!existingProdInfo) {
                            _context10.next = 17;
                            break;
                          }
                          _context10.next = 6;
                          return getFromBeagleInfoLayer("pdp.sku", true);
                        case 6:
                          _context10.t0 = _context10.sent;
                          if (_context10.t0) {
                            _context10.next = 11;
                            break;
                          }
                          _context10.next = 10;
                          return getFromBeagleInfoLayer("__features.SKUsonPage", true);
                        case 10:
                          _context10.t0 = _context10.sent;
                        case 11:
                          skuList = _context10.t0;
                          if (!skuList) {
                            _context10.next = 17;
                            break;
                          }
                          callback();
                          clearInterval(productInfoInterval);
                          clearTimeout(productInfoTimeout);
                          return _context10.abrupt("return");
                        case 17:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                })), 25);
                productInfoTimeout = setTimeout(function () {
                  clearInterval(productInfoInterval);
                }, 1000);
              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function checkInitialized(_x3) {
        return _checkInitialized.apply(this, arguments);
      }
      return checkInitialized;
    }()
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
                  scriptID,
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
                        _context.next = 226;
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
                        _context.next = 226;
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
                        _context.next = 226;
                        break;
                      case 148:
                        if (!(operator === "replace")) {
                          _context.next = 153;
                          break;
                        }
                        logger.log("Replacing: ", value);
                        element.replaceAll(value);
                        _context.next = 226;
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
                        _context.next = 226;
                        break;
                      case 160:
                        if (!(operator === "injectscript")) {
                          _context.next = 166;
                          break;
                        }
                        logger.log("Injecting script: ", value);
                        scriptID = getUnsecureHash(value);
                        if (window.top.document.getElementById(scriptID)) {
                          logger.log("Script already in page!");
                        } else element.append("<script id=".concat(scriptID, ">").concat(value, "</script>"));
                        _context.next = 226;
                        break;
                      case 166:
                        if (!(operator === "move")) {
                          _context.next = 173;
                          break;
                        }
                        logger.log("Moving ".concat(move_selector_1, " to ").concat(move_selector_2));
                        source = window.top.document.querySelector(move_selector_1);
                        destination = window.top.document.querySelector(move_selector_2);
                        destination.prepend(source);
                        _context.next = 226;
                        break;
                      case 173:
                        if (!(operator === "productInfoLookup")) {
                          _context.next = 180;
                          break;
                        }
                        _context.next = 176;
                        return getProductInfo(pType, value, productInfoStorage);
                      case 176:
                        res = _context.sent;
                        element.before(res);
                        _context.next = 226;
                        break;
                      case 180:
                        if (!(operator === "text-transform")) {
                          _context.next = 200;
                          break;
                        }
                        _context.t4 = type;
                        _context.next = _context.t4 === "capitalize" ? 184 : _context.t4 === "PLACEHOLDER" ? 195 : 196;
                        break;
                      case 184:
                        _i = 0, _Array$from = Array.from(element);
                      case 185:
                        if (!(_i < _Array$from.length)) {
                          _context.next = 194;
                          break;
                        }
                        e = _Array$from[_i];
                        if (!((_e$innerText = e.innerText) !== null && _e$innerText !== void 0 && _e$innerText.includes("\n"))) {
                          _context.next = 190;
                          break;
                        }
                        e.innerText = turkishToLower(e.innerText).split("\n").map(function (sentence) {
                          return sentence.split(" ").map(function (word) {
                            return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                          }).join(" ");
                        }).join("\n");
                        return _context.abrupt("continue", 191);
                      case 190:
                        e.innerText = turkishToLower(e.innerText).split(" ").map(function (word) {
                          return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                        }).join(" ");
                      case 191:
                        _i++;
                        _context.next = 185;
                        break;
                      case 194:
                        return _context.abrupt("break", 198);
                      case 195:
                        return _context.abrupt("break", 198);
                      case 196:
                        logger.failed("Unknown text-transform type");
                        return _context.abrupt("return", false);
                      case 198:
                        _context.next = 226;
                        break;
                      case 200:
                        if (!(operator === "ai-suggest")) {
                          _context.next = 224;
                          break;
                        }
                        _context.t5 = type;
                        _context.next = _context.t5 === "title-change" ? 204 : _context.t5 === "add-description" ? 213 : 222;
                        break;
                      case 204:
                        logger.log("getting title suggestions");
                        _context.next = 207;
                        return prepareFinalTitle();
                      case 207:
                        finalTitle = _context.sent;
                        if (finalTitle) {
                          _context.next = 211;
                          break;
                        }
                        logger.failed("Cannot apply title-change there is no suggestion!");
                        return _context.abrupt("return", false);
                      case 211:
                        element.contents().filter(function () {
                          // eslint-disable-next-line no-invalid-this
                          return this.nodeType == 3;
                        })[0].nodeValue = finalTitle;
                        return _context.abrupt("break", 222);
                      case 213:
                        logger.log("getting description suggestions");
                        _context.next = 216;
                        return prepareDescElm(value);
                      case 216:
                        descriptionElm = _context.sent;
                        if (descriptionElm) {
                          _context.next = 220;
                          break;
                        }
                        logger.failed("Cannot apply add-description there is no suggestion!");
                        return _context.abrupt("return", false);
                      case 220:
                        element.before(descriptionElm);
                        return _context.abrupt("break", 222);
                      case 222:
                        _context.next = 226;
                        break;
                      case 224:
                        logger.failed("No such operator exists yet", operator);
                        return _context.abrupt("return", false);
                      case 226:
                        return _context.abrupt("return", true);
                      case 227:
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
                        if (productInfo !== null && productInfo !== void 0 && productInfo.marketingCopy) {
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
                        if (productInfo !== null && productInfo !== void 0 && productInfo.titleAugment) {
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
                        if (productInfo) {
                          _context4.next = 20;
                          break;
                        }
                        logger.failed("No product info found");
                        return _context4.abrupt("return", null);
                      case 20:
                        _context4.t1 = type;
                        _context4.next = _context4.t1 === "transactionIn2Weeks" ? 23 : _context4.t1 === "addToCartIn2Weeks" ? 26 : _context4.t1 === "productViewCount" ? 29 : 32;
                        break;
                      case 23:
                        res = replaceWithVal(productInfo.saleCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing transcationIn2Weeks ", productInfo.saleCntVisitorsIn15);
                        return _context4.abrupt("break", 33);
                      case 26:
                        res = replaceWithVal(productInfo.cartCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing AddToCartCount ", productInfo.cartCntVisitorsIn15);
                        return _context4.abrupt("break", 33);
                      case 29:
                        res = replaceWithVal(productInfo.viewCntVisitorsIn1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing productViewCount for", productInfo.viewCntVisitorsIn1);
                        return _context4.abrupt("break", 33);
                      case 32:
                        logger.failed("no such type found for productInfoLookup operator: " + type);
                      case 33:
                        return _context4.abrupt("return", res);
                      case 34:
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
                var _iterator4, _step4, action, _iterator5, _step5, element, _result, _result2;
                return regenerator_default().wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return waitForJQuery();
                      case 2:
                        if (!_context7.sent) {
                          _context7.next = 56;
                          break;
                        }
                        _iterator4 = BeagleApplyActions_createForOfIteratorHelper(actions);
                        _context7.prev = 4;
                        _iterator4.s();
                      case 6:
                        if ((_step4 = _iterator4.n()).done) {
                          _context7.next = 45;
                          break;
                        }
                        action = _step4.value;
                        _context7.prev = 8;
                        if (!action.eligibleElements) {
                          _context7.next = 32;
                          break;
                        }
                        _iterator5 = BeagleApplyActions_createForOfIteratorHelper(action.eligibleElements);
                        _context7.prev = 11;
                        _iterator5.s();
                      case 13:
                        if ((_step5 = _iterator5.n()).done) {
                          _context7.next = 22;
                          break;
                        }
                        element = _step5.value;
                        _context7.next = 17;
                        return transformer(action, element);
                      case 17:
                        _result = _context7.sent;
                        if (!(_result === false)) {
                          _context7.next = 20;
                          break;
                        }
                        return _context7.abrupt("return", false);
                      case 20:
                        _context7.next = 13;
                        break;
                      case 22:
                        _context7.next = 27;
                        break;
                      case 24:
                        _context7.prev = 24;
                        _context7.t0 = _context7["catch"](11);
                        _iterator5.e(_context7.t0);
                      case 27:
                        _context7.prev = 27;
                        _iterator5.f();
                        return _context7.finish(27);
                      case 30:
                        _context7.next = 37;
                        break;
                      case 32:
                        _context7.next = 34;
                        return transformer(action);
                      case 34:
                        _result2 = _context7.sent;
                        if (!(_result2 === false)) {
                          _context7.next = 37;
                          break;
                        }
                        return _context7.abrupt("return", false);
                      case 37:
                        _context7.next = 43;
                        break;
                      case 39:
                        _context7.prev = 39;
                        _context7.t1 = _context7["catch"](8);
                        logger.failed("Couldn't apply action ".concat(JSON.stringify(action), " with error ").concat(_context7.t1.message));
                        throw new Error("error-applying-action");
                      case 43:
                        _context7.next = 6;
                        break;
                      case 45:
                        _context7.next = 50;
                        break;
                      case 47:
                        _context7.prev = 47;
                        _context7.t2 = _context7["catch"](4);
                        _iterator4.e(_context7.t2);
                      case 50:
                        _context7.prev = 50;
                        _iterator4.f();
                        return _context7.finish(50);
                      case 53:
                        return _context7.abrupt("return", true);
                      case 56:
                        logger.failed("Jquery not found on window");
                        throw new Error("no-jquery");
                      case 58:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, null, [[4, 47, 50, 53], [8, 39], [11, 24, 27, 30]]);
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



;// CONCATENATED MODULE: ./src/GlovRobotEngine/index.js







function GlovRobotEngine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = GlovRobotEngine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function GlovRobotEngine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return GlovRobotEngine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GlovRobotEngine_arrayLikeToArray(o, minLen); }
function GlovRobotEngine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var GlovRobotEngine_logger = new src_logger("BeagleRobotEngine");
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
      isOn = body.isOn,
      isChamp = body.isChamp;
    this.isOn = isOn;
    this.isChamp = isChamp;
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
        var _this = this;
        var robotPromises, _iterator, _step, _loop, _ret;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                robotPromises = [];
                _iterator = GlovRobotEngine_createForOfIteratorHelper(this.matchedTreatments);
                _context.prev = 2;
                _loop = function _loop() {
                  var treatment = _step.value;
                  try {
                    if (treatment.dependant_on_treatment) return "continue";
                    if (treatment.delay) {
                      setTimeout(function () {
                        _this.engageRobot(treatment);
                      }, treatment.delay);
                      return "continue";
                    }
                    robotPromises.push(_this.engageRobot(treatment));
                  } catch (err) {
                    GlovRobotEngine_logger.failed("Error engaging robot ".concat(treatment.id, ": ").concat(err.message || err));
                  }
                };
                _iterator.s();
              case 5:
                if ((_step = _iterator.n()).done) {
                  _context.next = 11;
                  break;
                }
                _ret = _loop();
                if (!(_ret === "continue")) {
                  _context.next = 9;
                  break;
                }
                return _context.abrupt("continue", 9);
              case 9:
                _context.next = 5;
                break;
              case 11:
                _context.next = 16;
                break;
              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);
                _iterator.e(_context.t0);
              case 16:
                _context.prev = 16;
                _iterator.f();
                return _context.finish(16);
              case 19:
                _context.next = 21;
                return Promise.all(robotPromises);
              case 21:
                this.initiateReapplyRobotMap();
              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 13, 16, 19]]);
      }));
      function engageRobots() {
        return _engageRobots.apply(this, arguments);
      }
      return engageRobots;
    }()
  }, {
    key: "engageRobot",
    value: function () {
      var _engageRobot = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(treatment) {
        var id, actions, eligibilityRuleSet, device, businessRuleSet, helpers, dependant_on_treatment, mode, debugMode, debugFilteredTreatments, engagementLock, identifier, isMobile, matchedTreatments, apply, release, businessRuleId, _yield$prepareActions, _yield$prepareActions2, preparedActions, variant, isEligible, _iterator2, _step2, action, eligibleElements;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = treatment.id, actions = treatment.actions, eligibilityRuleSet = treatment.eligibilityRuleSet, device = treatment.device, businessRuleSet = treatment.businessRuleSet, helpers = treatment.helpers, dependant_on_treatment = treatment.dependant_on_treatment, mode = treatment.mode;
                debugMode = this.debugMode, debugFilteredTreatments = this.debugFilteredTreatments, engagementLock = this.engagementLock, identifier = this.identifier, isMobile = this.isMobile, matchedTreatments = this.matchedTreatments, apply = this.apply; // one engagement at a time
                engagementLock[id] = engagementLock[id] || new Mutex();
                _context2.next = 5;
                return engagementLock[id].acquire();
              case 5:
                release = _context2.sent;
                _context2.prev = 6;
                if (!(debugMode && debugFilteredTreatments && !debugFilteredTreatments.includes(id))) {
                  _context2.next = 9;
                  break;
                }
                return _context2.abrupt("return");
              case 9:
                if (!(device === "mobile" && !isMobile)) {
                  _context2.next = 12;
                  break;
                }
                GlovRobotEngine_logger.failed("Treatment device 'mobile' mismatch");
                return _context2.abrupt("return");
              case 12:
                if (!(device === "desktop" && isMobile)) {
                  _context2.next = 15;
                  break;
                }
                GlovRobotEngine_logger.failed("Treatment device 'desktop' mismatch");
                return _context2.abrupt("return");
              case 15:
                GlovRobotEngine_logger.log("Starting base rule set check for treatment: " + id);
                _context2.t0 = !eligibilityRuleSet;
                if (_context2.t0) {
                  _context2.next = 21;
                  break;
                }
                _context2.next = 20;
                return this.checkEligibilityRuleSet(eligibilityRuleSet);
              case 20:
                _context2.t0 = _context2.sent;
              case 21:
                if (!_context2.t0) {
                  _context2.next = 72;
                  break;
                }
                businessRuleId = null;
                if (!businessRuleSet) {
                  _context2.next = 29;
                  break;
                }
                GlovRobotEngine_logger.log("Starting sub variant rule set check for treatment: " + id);
                _context2.next = 27;
                return this.checkBusinessRules(businessRuleSet);
              case 27:
                businessRuleId = _context2.sent;
                if (businessRuleId !== null) {
                  GlovRobotEngine_logger.log("Applying business rule transformation with id: ", businessRuleId);
                } else GlovRobotEngine_logger.log("Applying treatment with default values");
              case 29:
                _context2.next = 31;
                return prepareActions(identifier, actions, businessRuleId, debugMode);
              case 31:
                _yield$prepareActions = _context2.sent;
                _yield$prepareActions2 = _slicedToArray(_yield$prepareActions, 2);
                preparedActions = _yield$prepareActions2[0];
                variant = _yield$prepareActions2[1];
                isEligible = null;
                _iterator2 = GlovRobotEngine_createForOfIteratorHelper(preparedActions);
                _context2.prev = 37;
                _iterator2.s();
              case 39:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 53;
                  break;
                }
                action = _step2.value;
                if (action.condition) {
                  _context2.next = 43;
                  break;
                }
                return _context2.abrupt("continue", 51);
              case 43:
                _context2.next = 45;
                return action_condition_util(action.condition);
              case 45:
                eligibleElements = _context2.sent;
                if (!eligibleElements.length) {
                  _context2.next = 50;
                  break;
                }
                action.eligibleElements = eligibleElements;
                isEligible = true;
                return _context2.abrupt("continue", 51);
              case 50:
                isEligible = isEligible || false;
              case 51:
                _context2.next = 39;
                break;
              case 53:
                _context2.next = 58;
                break;
              case 55:
                _context2.prev = 55;
                _context2.t1 = _context2["catch"](37);
                _iterator2.e(_context2.t1);
              case 58:
                _context2.prev = 58;
                _iterator2.f();
                return _context2.finish(58);
              case 61:
                if (!(isEligible === false)) {
                  _context2.next = 63;
                  break;
                }
                return _context2.abrupt("return");
              case 63:
                addTreatment(id, businessRuleId, variant, "eligible", dependant_on_treatment);
                if (!(!debugMode > 0 && (!this.isOn || mode === "lab" && this.isChamp || mode === "champion" && !this.isChamp))) {
                  _context2.next = 66;
                  break;
                }
                return _context2.abrupt("return");
              case 66:
                _context2.next = 68;
                return apply(id, preparedActions, businessRuleId, variant, dependant_on_treatment);
              case 68:
                _context2.next = 70;
                return this.engageHelpers(helpers, matchedTreatments);
              case 70:
                _context2.next = 73;
                break;
              case 72:
                GlovRobotEngine_logger.failed("Rule check failed for treatment:", id);
              case 73:
                _context2.prev = 73;
                release();
                this.addReapplyEvent(treatment);
                this.addRuleSetDataListeners(treatment);
                return _context2.finish(73);
              case 78:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6,, 73, 78], [37, 55, 58, 61]]);
      }));
      function engageRobot(_x) {
        return _engageRobot.apply(this, arguments);
      }
      return engageRobot;
    }()
  }, {
    key: "engageHelpers",
    value: function () {
      var _engageHelpers = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(helpers, matchedTreatments) {
        var helperRobotPromises, _iterator3, _step3, treatment;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(Array.isArray(helpers) && helpers.length)) {
                  _context3.next = 22;
                  break;
                }
                helperRobotPromises = [];
                _iterator3 = GlovRobotEngine_createForOfIteratorHelper(matchedTreatments);
                _context3.prev = 3;
                _iterator3.s();
              case 5:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.next = 12;
                  break;
                }
                treatment = _step3.value;
                if (helpers.includes(treatment.id)) {
                  _context3.next = 9;
                  break;
                }
                return _context3.abrupt("continue", 10);
              case 9:
                helperRobotPromises.push(this.engageRobot(treatment));
              case 10:
                _context3.next = 5;
                break;
              case 12:
                _context3.next = 17;
                break;
              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](3);
                _iterator3.e(_context3.t0);
              case 17:
                _context3.prev = 17;
                _iterator3.f();
                return _context3.finish(17);
              case 20:
                _context3.next = 22;
                return Promise.all(helperRobotPromises);
              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 14, 17, 20]]);
      }));
      function engageHelpers(_x2, _x3) {
        return _engageHelpers.apply(this, arguments);
      }
      return engageHelpers;
    }()
  }, {
    key: "apply",
    value: function () {
      var _apply = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(id, preparedActions, businessRuleId, variant, dependant_on_treatment) {
        var check, applied, res, failed, _applied;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                GlovRobotEngine_logger.log("Checking action selectors for robot ".concat(id));
                check = checkActionSelectors(preparedActions);
                if (check) {
                  _context4.next = 10;
                  break;
                }
                _context4.next = 5;
                return getFromBeagleInfoLayer("a");
              case 5:
                applied = _context4.sent;
                if (!(applied && applied[id])) {
                  _context4.next = 8;
                  break;
                }
                return _context4.abrupt("return");
              case 8:
                GlovRobotEngine_logger.log("Action selector check failed for robot ".concat(id));
                addTreatment(id, businessRuleId, variant, "failed", dependant_on_treatment);
              case 10:
                _context4.next = 12;
                return BeagleApplyActions(preparedActions);
              case 12:
                res = _context4.sent;
                if (!(res === true)) {
                  _context4.next = 21;
                  break;
                }
                _context4.next = 16;
                return getFromBeagleInfoLayer("f");
              case 16:
                failed = _context4.sent;
                if (failed[id]) {
                  delete failed[id];
                  addToBeagleInfoLayer("f", failed);
                }
                addTreatment(id, businessRuleId, variant, "applied", dependant_on_treatment);
                _context4.next = 28;
                break;
              case 21:
                if (!(res === false)) {
                  _context4.next = 28;
                  break;
                }
                _context4.next = 24;
                return getFromBeagleInfoLayer("a");
              case 24:
                _applied = _context4.sent;
                if (!_applied[id]) {
                  _context4.next = 27;
                  break;
                }
                return _context4.abrupt("return");
              case 27:
                addTreatment(id, businessRuleId, variant, "failed", dependant_on_treatment);
              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function apply(_x4, _x5, _x6, _x7, _x8) {
        return _apply.apply(this, arguments);
      }
      return apply;
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
          GlovRobotEngine_logger.log("Reapply event '".concat(reapply_event, "' found for treatment: ").concat(id));
          var _iterator4 = GlovRobotEngine_createForOfIteratorHelper(reapply_event_array),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var reapplyEvent = _step4.value;
              var previousValue = reApplyTreatmentsMap[reapplyEvent] ? reApplyTreatmentsMap[reapplyEvent] : [];
              if (previousValue.includes(id)) {
                GlovRobotEngine_logger.log("Treatment already added for reapply event");
              } else reApplyTreatmentsMap[reapplyEvent] = [].concat(_toConsumableArray(previousValue), [id]);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
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
      var _loop2 = function _loop2() {
        var key = _Object$keys[_i];
        var treatmentIds = reApplyTreatmentsMap[key];
        var reApplyTreatments = matchedTreatments.filter(function (t) {
          return treatmentIds.includes(t.id);
        });
        switch (key) {
          case "infinite_scroll":
            {
              var observer = new ResizeObserver(function () {
                var _iterator5 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step5;
                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var treatment = _step5.value;
                    GlovRobotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from infinite_scroll"));
                    _this2.engageRobot(treatment);
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }
              });
              observer.observe(window.top.document.documentElement);
            }
            break;
          case "timeout":
            {
              setTimeout(function () {
                var _iterator6 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step6;
                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    var treatment = _step6.value;
                    GlovRobotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from timeout"));
                    _this2.engageRobot(treatment);
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }
              }, 500);
            }
            break;
          case "element_change":
            {
              var _iterator7 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
                _step7;
              try {
                var _loop3 = function _loop3() {
                  var treatment = _step7.value;
                  var reapplySelectorList = Array.isArray(treatment.reapply_selector) ? treatment.reapply_selector : [treatment.reapply_selector];
                  var _iterator8 = GlovRobotEngine_createForOfIteratorHelper(reapplySelectorList),
                    _step8;
                  try {
                    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                      var selector = _step8.value;
                      var element = window.top.document.querySelector(selector);
                      if (element) {
                        var _observer = new MutationObserver(function () {
                          GlovRobotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from element_change"));
                          _this2.engageRobot(treatment);
                        });
                        _observer.observe(element, OBSERVER_CONFIG);
                      }
                    }
                  } catch (err) {
                    _iterator8.e(err);
                  } finally {
                    _iterator8.f();
                  }
                };
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  _loop3();
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
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
                  var _iterator9 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step9;
                  try {
                    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                      var treatment = _step9.value;
                      GlovRobotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from on_scroll"));
                      _this2.engageRobot(treatment);
                    }
                  } catch (err) {
                    _iterator9.e(err);
                  } finally {
                    _iterator9.f();
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
                  var _iterator10 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step10;
                  try {
                    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                      var treatment = _step10.value;
                      GlovRobotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from query_search_change"));
                      _this2.engageRobot(treatment);
                    }
                  } catch (err) {
                    _iterator10.e(err);
                  } finally {
                    _iterator10.f();
                  }
                }
              });
              _observer2.observe(document, OBSERVER_CONFIG);
            }
            break;
          case "interval":
            var _iterator11 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
              _step11;
            try {
              var _loop4 = function _loop4() {
                var treatment = _step11.value;
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
                          GlovRobotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from interval"));
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
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                _loop4();
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
            }
            break;
          case "info_layer_change":
            var _iterator12 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
              _step12;
            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var treatment = _step12.value;
                var boundEngageTreatment = _this2.engageRobot.bind(_this2, treatment);
                addDataListener(treatment.reapply_selector, boundEngageTreatment);
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }
            break;
          default:
            GlovRobotEngine_logger.failed("Reapply event not found: ", key);
            break;
        }
      };
      for (var _i = 0, _Object$keys = Object.keys(reApplyTreatmentsMap); _i < _Object$keys.length; _i++) {
        _loop2();
      }
    }
  }, {
    key: "addRuleSetDataListeners",
    value: function () {
      var _addRuleSetDataListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(treatment) {
        var _treatment$eligibilit, eligibilityRuleSet, _treatment$businessRu, businessRuleSet, id, selectors, boundEngageTreatment, _iterator13, _step13, selector;
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
                _iterator13 = GlovRobotEngine_createForOfIteratorHelper(selectors);
                try {
                  for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                    selector = _step13.value;
                    addDataListener("__eRules.".concat(selector), boundEngageTreatment);
                  }
                } catch (err) {
                  _iterator13.e(err);
                } finally {
                  _iterator13.f();
                }
                this.addedDataListenerIds.push(id);
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      var _iterator14 = GlovRobotEngine_createForOfIteratorHelper(ruleSet),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var rule = _step14.value;
          if (typeof rule === "string") {
            if (rule.startsWith("!")) rule = rule.slice(1);
            selectors.push(rule.split(".")[0]);
            continue;
          }
          this.extractDataListenerSelectors(rule.set, selectors);
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
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
                GlovRobotEngine_logger.log("Checking eligibility ".concat(eligibilityRule));
                oppositeFlag = false;
                _eligibilityRule$spli = eligibilityRule.split("."), _eligibilityRule$spli2 = _slicedToArray(_eligibilityRule$spli, 2), eligibilityScope = _eligibilityRule$spli2[0], eligibilityName = _eligibilityRule$spli2[1];
                if (eligibilityScope.startsWith("!")) {
                  oppositeFlag = true;
                  eligibilityScope = eligibilityScope.slice(1);
                }
                if (!(eligibilityScope === "PageType")) {
                  _context7.next = 11;
                  break;
                }
                _context7.next = 7;
                return getFromBeagleInfoLayer("PageType");
              case 7:
                _context7.t0 = _context7.sent;
                res = [_context7.t0];
                _context7.next = 14;
                break;
              case 11:
                _context7.next = 13;
                return getFromBeagleInfoLayer("__eRules.".concat(eligibilityScope));
              case 13:
                res = _context7.sent;
              case 14:
                if (!(!res || !Array.isArray(res))) {
                  _context7.next = 16;
                  break;
                }
                return _context7.abrupt("return", false);
              case 16:
                if (!(oppositeFlag && res.includes(eligibilityName))) {
                  _context7.next = 18;
                  break;
                }
                return _context7.abrupt("return", false);
              case 18:
                if (!(!oppositeFlag && !res.includes(eligibilityName))) {
                  _context7.next = 20;
                  break;
                }
                return _context7.abrupt("return", false);
              case 20:
                GlovRobotEngine_logger.log("".concat(eligibilityRule, " is eligible"));
                return _context7.abrupt("return", true);
              case 22:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      function checkEligibility(_x10) {
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
          _iterator15,
          _step15,
          eligibilityRule,
          _args8 = arguments;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                eligibilitySetType = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : null;
                previousIsEligible = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : null;
                GlovRobotEngine_logger.log("Checking robot eligibility");
                if (Array.isArray(eligibilityRuleSet)) {
                  _context8.next = 6;
                  break;
                }
                GlovRobotEngine_logger.failed("Eligibility Rule Set ".concat(eligibilityRuleSet, " is not an array"));
                return _context8.abrupt("return", false);
              case 6:
                isEligible = previousIsEligible;
                _iterator15 = GlovRobotEngine_createForOfIteratorHelper(eligibilityRuleSet);
                _context8.prev = 8;
                _iterator15.s();
              case 10:
                if ((_step15 = _iterator15.n()).done) {
                  _context8.next = 57;
                  break;
                }
                eligibilityRule = _step15.value;
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
                GlovRobotEngine_logger.failed("Unknown eligibilitySetType: ", eligibilitySetType);
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
                _iterator15.e(_context8.t3);
              case 62:
                _context8.prev = 62;
                _iterator15.f();
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
      function checkEligibilityRuleSet(_x11) {
        return _checkEligibilityRuleSet.apply(this, arguments);
      }
      return checkEligibilityRuleSet;
    }() // Return index of businessRule, this is the businessRuleId
  }, {
    key: "checkBusinessRules",
    value: function () {
      var _checkBusinessRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9(businessRuleSet) {
        var _iterator16, _step16, _step16$value, index, businessRule;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iterator16 = GlovRobotEngine_createForOfIteratorHelper(businessRuleSet.entries());
                _context9.prev = 1;
                _iterator16.s();
              case 3:
                if ((_step16 = _iterator16.n()).done) {
                  _context9.next = 11;
                  break;
                }
                _step16$value = _slicedToArray(_step16.value, 2), index = _step16$value[0], businessRule = _step16$value[1];
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
                _iterator16.e(_context9.t0);
              case 16:
                _context9.prev = 16;
                _iterator16.f();
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
    var operator, condition, value, pageType, sku, skuList, runtimeValue;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            productInfoChecker_logger.log("Checking rule for operator: ", rule.operator);
            operator = rule.operator, condition = rule.condition, value = rule.value;
            _context.next = 4;
            return getFromBeagleInfoLayer("PageType", true);
          case 4:
            pageType = _context.sent;
            if (!(pageType === "PDP")) {
              _context.next = 13;
              break;
            }
            _context.next = 8;
            return getFromBeagleInfoLayer("pdp.sku", true);
          case 8:
            sku = _context.sent;
            if (sku) {
              _context.next = 11;
              break;
            }
            return _context.abrupt("return", false);
          case 11:
            _context.next = 19;
            break;
          case 13:
            _context.next = 15;
            return getFromBeagleInfoLayer("__features.SKUsonPage", true);
          case 15:
            skuList = _context.sent;
            if (!(!skuList || _typeof(skuList) === "object" && !Object.keys(skuList).length)) {
              _context.next = 18;
              break;
            }
            return _context.abrupt("return", false);
          case 18:
            sku = skuList[Object.keys(skuList)[0]];
          case 19:
            runtimeValue = null;
            _context.t0 = operator;
            _context.next = _context.t0 === "saleCntVisitorsIn15" ? 23 : _context.t0 === "cartCntVisitorsIn15" ? 28 : _context.t0 === "viewCntVisitorsIn1" ? 33 : _context.t0 === "hasTitle" ? 38 : _context.t0 === "hasDescription" ? 43 : 48;
            break;
          case 23:
            productInfoChecker_logger.log("Getting TransactionCount for sku ", sku);
            _context.next = 26;
            return getTransactionCount(sku);
          case 26:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 48);
          case 28:
            productInfoChecker_logger.log("Getting AddToCartCount for sku ", sku);
            _context.next = 31;
            return getAddToCartCount(sku);
          case 31:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 48);
          case 33:
            productInfoChecker_logger.log("Getting productViewCount for sku ", sku);
            _context.next = 36;
            return getPreviewCount(sku);
          case 36:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 48);
          case 38:
            productInfoChecker_logger.log("Getting title for sku ", sku);
            _context.next = 41;
            return getTitle(sku);
          case 41:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 48);
          case 43:
            productInfoChecker_logger.log("Getting description for sku ", sku);
            _context.next = 46;
            return getDescription(sku);
          case 46:
            runtimeValue = _context.sent;
            return _context.abrupt("break", 48);
          case 48:
            return _context.abrupt("return", conditionChecker(runtimeValue, condition, value));
          case 49:
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
            return _context6.abrupt("return", null);
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
            return _context7.abrupt("return", null);
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
    key: "assessEligibilityRulesCallBack",
    value: function () {
      var _assessEligibilityRulesCallBack = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(key, rules) {
        var _this = this;
        var release, eligibleRules, _iterator2, _step2, _loop, _ret;
        return regenerator_default().wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!key || !rules || !rules.length)) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                _context4.next = 4;
                return this.mutex.acquire();
              case 4:
                release = _context4.sent;
                BeagleRuleEngine_logger.log("Lock acquired for key ".concat(key));
                _context4.next = 8;
                return getFromBeagleInfoLayer("__eRules.".concat(key));
              case 8:
                _context4.t0 = _context4.sent;
                if (_context4.t0) {
                  _context4.next = 11;
                  break;
                }
                _context4.t0 = [];
              case 11:
                eligibleRules = _context4.t0;
                _context4.prev = 12;
                _iterator2 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                _context4.prev = 14;
                _loop = /*#__PURE__*/regenerator_default().mark(function _loop() {
                  var rule, isEligible;
                  return regenerator_default().wrap(function _loop$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          rule = _step2.value;
                          _context3.next = 3;
                          return _this.checkRule(rule);
                        case 3:
                          isEligible = _context3.sent;
                          if (!isEligible) {
                            _context3.next = 10;
                            break;
                          }
                          if (!eligibleRules.includes(rule.name)) {
                            _context3.next = 7;
                            break;
                          }
                          return _context3.abrupt("return", "continue");
                        case 7:
                          eligibleRules.push(rule.name);
                          _context3.next = 13;
                          break;
                        case 10:
                          if (eligibleRules.includes(rule.name)) {
                            _context3.next = 12;
                            break;
                          }
                          return _context3.abrupt("return", "continue");
                        case 12:
                          eligibleRules = eligibleRules.filter(function (rn) {
                            return rn !== rule.name;
                          });
                        case 13:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _loop);
                });
                _iterator2.s();
              case 17:
                if ((_step2 = _iterator2.n()).done) {
                  _context4.next = 24;
                  break;
                }
                return _context4.delegateYield(_loop(), "t1", 19);
              case 19:
                _ret = _context4.t1;
                if (!(_ret === "continue")) {
                  _context4.next = 22;
                  break;
                }
                return _context4.abrupt("continue", 22);
              case 22:
                _context4.next = 17;
                break;
              case 24:
                _context4.next = 29;
                break;
              case 26:
                _context4.prev = 26;
                _context4.t2 = _context4["catch"](14);
                _iterator2.e(_context4.t2);
              case 29:
                _context4.prev = 29;
                _iterator2.f();
                return _context4.finish(29);
              case 32:
                addToBeagleInfoLayer("__eRules.".concat(key), eligibleRules);
                _context4.next = 38;
                break;
              case 35:
                _context4.prev = 35;
                _context4.t3 = _context4["catch"](12);
                BeagleRuleEngine_logger.failed("Error assessing rules for key: ".concat(key, " - ").concat(_context4.t3.message));
              case 38:
                _context4.prev = 38;
                BeagleRuleEngine_logger.log("Releasing lock for key: ".concat(key));
                release();
                return _context4.finish(38);
              case 42:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this, [[12, 35, 38, 42], [14, 26, 29, 32]]);
      }));
      function assessEligibilityRulesCallBack(_x2, _x3) {
        return _assessEligibilityRulesCallBack.apply(this, arguments);
      }
      return assessEligibilityRulesCallBack;
    }()
  }, {
    key: "initializeListeners",
    value: function () {
      var _initializeListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var eligibilityRules, _i, _Object$entries, _Object$entries$_i, key, rules;
        return regenerator_default().wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                eligibilityRules = this.eligibilityRules;
                for (_i = 0, _Object$entries = Object.entries(eligibilityRules); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], rules = _Object$entries$_i[1];
                  this.setUpListeners(key, rules);
                }
              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));
      function initializeListeners() {
        return _initializeListeners.apply(this, arguments);
      }
      return initializeListeners;
    }()
  }, {
    key: "setUpListeners",
    value: function () {
      var _setUpListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(key, rules) {
        var _this2 = this;
        var _this$extractRuleAttr, dataLayerRules, elementRules, productInfoRules, _i2, _Object$entries2, _Object$entries2$_i, operator, _rules, boundAssessEligibilityRulesCallBack, _loop2, _i3, _Object$entries3, _i4, _Object$entries4, _Object$entries4$_i, _rules2, _boundAssessEligibilityRulesCallBack, db;
        return regenerator_default().wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$extractRuleAttr = this.extractRuleAttributes(rules), dataLayerRules = _this$extractRuleAttr.dataLayerRules, elementRules = _this$extractRuleAttr.elementRules, productInfoRules = _this$extractRuleAttr.productInfoRules;
                for (_i2 = 0, _Object$entries2 = Object.entries(dataLayerRules); _i2 < _Object$entries2.length; _i2++) {
                  _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), operator = _Object$entries2$_i[0], _rules = _Object$entries2$_i[1];
                  boundAssessEligibilityRulesCallBack = this.assessEligibilityRulesCallBack.bind(this, key, _rules);
                  addDataListener(operator, boundAssessEligibilityRulesCallBack);
                }
                _loop2 = function _loop2() {
                  var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                    selector = _Object$entries3$_i[0],
                    rules = _Object$entries3$_i[1];
                  var observer = new MutationObserver(function (mutationList) {
                    if (window.top.document.readyState !== "complete") return;
                    var nodes = [];
                    var _iterator3 = BeagleRuleEngine_createForOfIteratorHelper(mutationList),
                      _step3;
                    try {
                      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                        var mutationRecord = _step3.value;
                        nodes = [].concat(_toConsumableArray(nodes), _toConsumableArray(Array.from(mutationRecord.addedNodes)), _toConsumableArray(Array.from(mutationRecord.removedNodes)));
                      }
                      // exclude mutations that only update text
                    } catch (err) {
                      _iterator3.e(err);
                    } finally {
                      _iterator3.f();
                    }
                    if (nodes.every(function (n) {
                      return n.tagName === undefined;
                    })) return;
                    _this2.assessEligibilityRulesCallBack(key, rules);
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
                for (_i3 = 0, _Object$entries3 = Object.entries(elementRules); _i3 < _Object$entries3.length; _i3++) {
                  _loop2();
                }
                _i4 = 0, _Object$entries4 = Object.entries(productInfoRules);
              case 5:
                if (!(_i4 < _Object$entries4.length)) {
                  _context6.next = 15;
                  break;
                }
                _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2), _rules2 = _Object$entries4$_i[1];
                _boundAssessEligibilityRulesCallBack = this.assessEligibilityRulesCallBack.bind(this, key, _rules2);
                _context6.next = 10;
                return store.getInstance();
              case 10:
                db = _context6.sent;
                db.checkInitialized(_boundAssessEligibilityRulesCallBack);
              case 12:
                _i4++;
                _context6.next = 5;
                break;
              case 15:
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
      var productInfoRules = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var baseRule = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      if (!rules || !rules.length) return;
      var _iterator4 = BeagleRuleEngine_createForOfIteratorHelper(rules),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var rule = _step4.value;
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
            case "productInfoLookup":
              if (!productInfoRules.all) {
                productInfoRules.all = [];
              }
              productInfoRules.all.push(baseRule || rule);
              break;
          }
          if (rule.chain) {
            this.extractRuleAttributes([rule.chain], dataLayerRules, elementRules, productInfoRules, baseRule || rule);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return {
        dataLayerRules: dataLayerRules,
        elementRules: elementRules,
        productInfoRules: productInfoRules
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
;// CONCATENATED MODULE: ./src/BeagleTreatmentRepository/index.js




function BeagleTreatmentRepository_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleTreatmentRepository_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function BeagleTreatmentRepository_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleTreatmentRepository_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleTreatmentRepository_arrayLikeToArray(o, minLen); }
function BeagleTreatmentRepository_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var BeagleTreatmentRepository_logger = new src_logger("BeagleTreatmentRepository");
var TreatmentRepository = /*#__PURE__*/function () {
  function TreatmentRepository(body) {
    _classCallCheck(this, TreatmentRepository);
    var treatments = body.treatments,
      treatmentWeights = body.treatmentWeights,
      userSegment = body.userSegment;
    this.treatments = treatments;
    this.treatmentWeights = treatmentWeights;
    this.currentPageType = null;
    this.userSegment = userSegment;
  }
  _createClass(TreatmentRepository, [{
    key: "getMatchedTreatments",
    value: function () {
      var _getMatchedTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(debugMode) {
        var MATCHED_TREATMENTS, CPT, matchedTreatments, treatments, treatmentWeights, userSegment, userSegmentWeights, _iterator, _step, _loop, _ret, matchedTreatmentsString;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                MATCHED_TREATMENTS = SESSION_STORAGE_KEYS.MATCHED_TREATMENTS;
                if (this.currentPageType) {
                  _context.next = 8;
                  break;
                }
                _context.next = 4;
                return getFromBeagleInfoLayer("PageType", true);
              case 4:
                CPT = _context.sent;
                if (CPT) {
                  _context.next = 7;
                  break;
                }
                return _context.abrupt("return", []);
              case 7:
                this.currentPageType = CPT;
              case 8:
                matchedTreatments = window.sessionStorage.getItem(MATCHED_TREATMENTS);
                if (!matchedTreatments) {
                  _context.next = 13;
                  break;
                }
                _context.next = 12;
                return this.matchByPageType(matchedTreatments);
              case 12:
                return _context.abrupt("return", _context.sent);
              case 13:
                matchedTreatments = [];
                treatments = this.treatments, treatmentWeights = this.treatmentWeights, userSegment = this.userSegment;
                if (userSegment) {
                  _context.next = 17;
                  break;
                }
                return _context.abrupt("return", null);
              case 17:
                if (!treatmentWeights) {
                  _context.next = 39;
                  break;
                }
                userSegmentWeights = treatmentWeights[userSegment];
                if (userSegmentWeights) {
                  _context.next = 21;
                  break;
                }
                return _context.abrupt("return", []);
              case 21:
                _iterator = BeagleTreatmentRepository_createForOfIteratorHelper(treatments);
                _context.prev = 22;
                _loop = function _loop() {
                  var _userSegmentWeights$i;
                  var treatment = _step.value;
                  var id = treatment.id,
                    actions = treatment.actions,
                    helpers = treatment.helpers;
                  var mode = (_userSegmentWeights$i = userSegmentWeights[id]) === null || _userSegmentWeights$i === void 0 ? void 0 : _userSegmentWeights$i.mode;
                  if (!mode && debugMode !== 1) return "continue";
                  if (helpers && Array.isArray(helpers)) {
                    helpers.forEach(function (h) {
                      var helper = treatments.find(function (t) {
                        return t.id === h;
                      });
                      if (helper) {
                        helper.mode = mode;
                        matchedTreatments.push(helper);
                      }
                    });
                  }
                  var _iterator2 = BeagleTreatmentRepository_createForOfIteratorHelper(actions),
                    _step2;
                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var action = _step2.value;
                      if (!action.variants) continue;
                      for (var _i = 0, _Object$keys = Object.keys(action.variants); _i < _Object$keys.length; _i++) {
                        var _userSegmentWeights$i2, _userSegmentWeights$i3;
                        var variantKey = _Object$keys[_i];
                        var variantWeight = (_userSegmentWeights$i2 = userSegmentWeights[id]) === null || _userSegmentWeights$i2 === void 0 ? void 0 : (_userSegmentWeights$i3 = _userSegmentWeights$i2.variants) === null || _userSegmentWeights$i3 === void 0 ? void 0 : _userSegmentWeights$i3[variantKey];
                        if (variantWeight) {
                          action.variants[variantKey].weight = variantWeight;
                        }
                      }
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                  treatment.mode = mode;
                  matchedTreatments.push(treatment);
                };
                _iterator.s();
              case 25:
                if ((_step = _iterator.n()).done) {
                  _context.next = 31;
                  break;
                }
                _ret = _loop();
                if (!(_ret === "continue")) {
                  _context.next = 29;
                  break;
                }
                return _context.abrupt("continue", 29);
              case 29:
                _context.next = 25;
                break;
              case 31:
                _context.next = 36;
                break;
              case 33:
                _context.prev = 33;
                _context.t0 = _context["catch"](22);
                _iterator.e(_context.t0);
              case 36:
                _context.prev = 36;
                _iterator.f();
                return _context.finish(36);
              case 39:
                matchedTreatmentsString = JSON.stringify(matchedTreatments);
                window.sessionStorage.setItem(MATCHED_TREATMENTS, matchedTreatmentsString);
                _context.next = 43;
                return this.matchByPageType(matchedTreatmentsString);
              case 43:
                return _context.abrupt("return", _context.sent);
              case 44:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[22, 33, 36, 39]]);
      }));
      function getMatchedTreatments(_x) {
        return _getMatchedTreatments.apply(this, arguments);
      }
      return getMatchedTreatments;
    }()
  }, {
    key: "matchByPageType",
    value: function () {
      var _matchByPageType = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(matchedTreatments) {
        var _this = this;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return JSON.parse(matchedTreatments);
              case 3:
                matchedTreatments = _context2.sent;
                matchedTreatments = matchedTreatments.filter(function (mt) {
                  return _this.checkPageType(mt.pageTypes);
                });
                BeagleTreatmentRepository_logger.log("".concat(matchedTreatments.length, " treatments user segment matched"));
                return _context2.abrupt("return", matchedTreatments);
              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                BeagleTreatmentRepository_logger.failed("Error getting matched robots:", _context2.t0.message);
                return _context2.abrupt("return", []);
              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));
      function matchByPageType(_x2) {
        return _matchByPageType.apply(this, arguments);
      }
      return matchByPageType;
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
      var _getTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var TREATMENTS, treatmentsObj, treatments, timestamp, treatmentWithTimestamp, elapsedHours, _treatmentWithTimestamp;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                BeagleTreatmentRepository_logger.log("Loading treatments");
                TREATMENTS = LOCAL_STORAGE_KEYS.TREATMENTS;
                treatmentsObj = JSON.parse(window.localStorage.getItem(TREATMENTS));
                treatments = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.treatments;
                timestamp = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.timestamp;
                if (!(!treatments || !timestamp)) {
                  _context3.next = 17;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Treatments not found in local storage");
                _context3.next = 9;
                return fetchTreatments();
              case 9:
                treatments = _context3.sent;
                if (treatments) {
                  _context3.next = 13;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch treatments");
                return _context3.abrupt("return", null);
              case 13:
                treatmentWithTimestamp = {
                  timestamp: Date.now(),
                  treatments: treatments
                };
                window.localStorage.setItem(TREATMENTS, JSON.stringify(treatmentWithTimestamp));
                window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS);
                return _context3.abrupt("return", treatments);
              case 17:
                if (!timestamp) {
                  _context3.next = 31;
                  break;
                }
                elapsedHours = (Date.now() - timestamp) / (1000 * 3600);
                if (!(elapsedHours > LOCAL_STORAGE_TTL_HOURS)) {
                  _context3.next = 31;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Treatments are expired");
                _context3.next = 23;
                return fetchTreatments();
              case 23:
                treatments = _context3.sent;
                if (treatments) {
                  _context3.next = 27;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch treatments");
                return _context3.abrupt("return", null);
              case 27:
                _treatmentWithTimestamp = {
                  timestamp: Date.now(),
                  treatments: treatments
                };
                window.localStorage.setItem(TREATMENTS, JSON.stringify(_treatmentWithTimestamp));
                window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS);
                return _context3.abrupt("return", treatments);
              case 31:
                BeagleTreatmentRepository_logger.success("Treatments are loaded from local storage");
                return _context3.abrupt("return", treatments);
              case 33:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function getTreatments() {
        return _getTreatments.apply(this, arguments);
      }
      return getTreatments;
    }()
  }, {
    key: "getTreatmentWeights",
    value: function () {
      var _getTreatmentWeights = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var weightsObj, elapsedHours;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                weightsObj = window.localStorage.getItem(LOCAL_STORAGE_KEYS.WEIGHTS);
                if (!weightsObj) {
                  _context4.next = 8;
                  break;
                }
                weightsObj = JSON.parse(weightsObj);
                if (!weightsObj.timestamp) {
                  _context4.next = 8;
                  break;
                }
                elapsedHours = (Date.now() - weightsObj.timestamp) / (1000 * 3600);
                if (!(elapsedHours < LOCAL_STORAGE_TTL_HOURS)) {
                  _context4.next = 8;
                  break;
                }
                return _context4.abrupt("return", weightsObj.weights);
              case 8:
                _context4.next = 10;
                return fetchTreatmentWeights();
              case 10:
                weightsObj = _context4.sent;
                if (weightsObj) {
                  _context4.next = 14;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch weights");
                return _context4.abrupt("return", null);
              case 14:
                weightsObj = {
                  weights: weightsObj,
                  timestamp: Date.now()
                };
                window.localStorage.setItem(LOCAL_STORAGE_KEYS.WEIGHTS, JSON.stringify(weightsObj));
                return _context4.abrupt("return", weightsObj.weights);
              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](0);
                BeagleTreatmentRepository_logger.warn(_context4.t0.message);
                return _context4.abrupt("return", null);
              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 19]]);
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
;// CONCATENATED MODULE: ./src/GlovGate/index.js












var analyticsLabel = null;
_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
  var beacon, logger, isOn, isChamp, _String$prototype, _String$prototype2, identifier, cookiePct, status, treatmentWeightsPromise, treatmentsPromise, productInfoPromise, userSegment, treatmentWeights, isAdmin, debugMode, isEmployee, pageType, searchParams, debugFilteredTreatments, treatments, treatmentRepository, matchedTreatments, robotEngine;
  return regenerator_default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          switchToEaseOut();
          checkVersion();
          beacon = null;
          logger = new src_logger();
          logger.info("Beagle initializing");
          window.dataLayer = window.dataLayer || [];
          isOn = null;
          isChamp = null;
          _context.prev = 8;
          /* ==================================== CRITICAL INIT TASKS ================================ */

          addToBeagleInfoLayer("m", "on-init");
          setURLData();
          addToBeagleInfoLayer("view_epoch", Date.now() + Math.random());
          _context.next = 14;
          return getIdentifier();
        case 14:
          identifier = _context.sent;
          logger.log("Found identifier: ", identifier);
          addToBeagleInfoLayer("cookieGaId", identifier);
          _context.next = 19;
          return determinePct(identifier);
        case 19:
          cookiePct = _context.sent;
          addToBeagleInfoLayer("onHashPct", cookiePct);
          addToBeagleInfoLayer("v", VERSION);
          addToBeagleInfoLayer("sr", SPLIT_RATIO);
          beacon = new GlovBeacon();
          // data-less log to detect bounces
          _context.next = 26;
          return beacon.packAndQueueArrivalLog();
        case 26:
          // SLA: 2 seconds to flicker
          setTimeout(function () {
            removeDocumentHide();
          }, 2000);
          addToBeagleInfoLayer("m", "on-critical-entry");

          /* ================================= EARLY PRUNE OUT-OF-SCOPE ============================== */

          // test cookie, beacon, and string utils support
          // TODO: use proper feature detection instead of depending on agent string
          if (cookiePct === null || !navigator.sendBeacon || typeof navigator.sendBeacon !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype = String.prototype) === null || _String$prototype === void 0 ? void 0 : _String$prototype.padStart) !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype2 = String.prototype) === null || _String$prototype2 === void 0 ? void 0 : _String$prototype2.match) !== "function") {
            processUnsupported();
          }

          // check if userAgent can be properly parsed
          status = setAgentDetails(); // if agent cannot be parsed, do early break
          if (!status) {
            processUnsupported();
          }

          /* ==================================== ASYNC INIT TASKS =================================== */
          treatmentWeightsPromise = BeagleTreatmentRepository.getTreatmentWeights();
          treatmentsPromise = BeagleTreatmentRepository.getTreatments();
          productInfoPromise = persistProductInfo();
          setBrowserData();
          _context.next = 37;
          return setUpEligibilityRuleListeners();
        case 37:
          startInfoLayerScan();
          injectStyleSheet();
          initiateSessionStorages();
          addToBeagleInfoLayer("m", "on-async-init");

          /* ======================================= POST OOS ======================================== */

          // TODO: remove permanent unsegmented-oos after OFF eligibility is fixed

          // attempt to compute user segment
          userSegment = null;
          treatmentWeights = null;
          _context.next = 45;
          return treatmentWeightsPromise;
        case 45:
          treatmentWeights = _context.sent;
          if (treatmentWeights) {
            _context.next = 50;
            break;
          }
          throw new Error("no-robot-weights");
        case 50:
          _context.next = 52;
          return computeSegment(treatmentWeights);
        case 52:
          userSegment = _context.sent;
        case 53:
          if (!userSegment) {
            processUnsupported();
          }

          /* =================================== ADMIN USER CHECK ==================================== */

          // TODO: rename showroom logic to admin, and map vvsIsShowroom to a configurable admin param
          isAdmin = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_ADMIN); // if not found in localStorage, check beagleInfoLayer with blocking mode
          if (!(isAdmin === null || isAdmin === undefined)) {
            _context.next = 61;
            break;
          }
          _context.next = 58;
          return getFromBeagleInfoLayer("vvsIsShowroom", true);
        case 58:
          isAdmin = _context.sent;
          _context.next = 62;
          break;
        case 61:
          if (isAdmin === "false" || isAdmin === false) {
            // async call to getFromBeagleInfoLayer, then set localStorage
            getFromBeagleInfoLayer("vvsIsShowroom", true).then(function (isAdmin) {
              if (isAdmin && (isAdmin === "true" || isAdmin === true)) {
                processAdminUser();
              }
            });
          }
        case 62:
          if (!(isAdmin && (isAdmin === "true" || isAdmin === true))) {
            _context.next = 66;
            break;
          }
          processAdminUser();
          _context.next = 71;
          break;
        case 66:
          if (!(isAdmin === null || isAdmin === undefined)) {
            _context.next = 70;
            break;
          }
          throw new Error("no-admin-status");
        case 70:
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, false);
        case 71:
          if (window.top.document.documentElement.classList.contains("glov-ease")) {
            _context.next = 73;
            break;
          }
          throw new Error("anti-flicker-timeout");
        case 73:
          /* ===================================== ON/OFF CHECK ====================================== */

          // champion is above SPLIT_RATIO plus LAB_RATIO
          isChamp = cookiePct >= SPLIT_RATIO * (1 + LAB_RATIO / 100);

          // check if debug mode is on, also adds dbm to beagleInfoLayer and sets oosReason
          debugMode = getDebugMode();
          isEmployee = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_EMPLOYEE);
          if (!(debugMode > 0)) {
            _context.next = 82;
            break;
          }
          logger.log("Debug mode on: all applicable treatments will be applied");
          isOn = true;
          analyticsLabel = "employee";
          _context.next = 87;
          break;
        case 82:
          if (!(debugMode === -1)) {
            _context.next = 86;
            break;
          }
          throw new Error("debug-skip-robots");
        case 86:
          if (isEmployee === "true" || isEmployee === true) {
            logger.warn("User is out of scope");
            // set isOn to true/false when not debugMode but out of scope i.e. nd_debug=0 for testability
            isOn = cookiePct >= SPLIT_RATIO;
            analyticsLabel = "employee";
          } else {
            // if greater than SPLIT_RATIO, then in ON mode
            if (cookiePct >= SPLIT_RATIO) {
              isOn = true;
              analyticsLabel = "true";
            } else if (cookiePct >= SPLIT_RATIO / 2) {
              isOn = false;
              analyticsLabel = "false2";
            } else {
              isOn = false;
              analyticsLabel = "false1";
            }
          }
        case 87:
          _context.next = 89;
          return getFromBeagleInfoLayer("PageType", true);
        case 89:
          pageType = _context.sent;
          if (!(pageType === "purchase")) {
            _context.next = 96;
            break;
          }
          _context.next = 93;
          return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);
        case 93:
          _context.next = 95;
          return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);
        case 95:
          throw new Error("ok-skip-robots");
        case 96:
          /* ======================================= ROBOT PATHs ===================================== */
          addToBeagleInfoLayer("m", "entering-robot-path");
          if (!(isOn === null)) {
            _context.next = 99;
            break;
          }
          throw new Error("no-isOn");
        case 99:
          searchParams = window.location.search;
          debugFilteredTreatments = null;
          if (debugMode && searchParams.includes("filter=")) {
            debugFilteredTreatments = searchParams.slice(searchParams.indexOf("[") + 1, searchParams.lastIndexOf("]")).split(",").map(function (item) {
              return parseInt(item, 10);
            });
          }
          _context.next = 104;
          return treatmentsPromise;
        case 104:
          treatments = _context.sent;
          if (treatments) {
            _context.next = 107;
            break;
          }
          throw new Error("no-robot-weights");
        case 107:
          logger.success("Found treatments: ", treatments);
          addToBeagleInfoLayer("m", "fetched-treatments");
          treatmentRepository = new BeagleTreatmentRepository({
            treatments: treatments,
            treatmentWeights: treatmentWeights,
            userSegment: userSegment
          });
          _context.next = 112;
          return treatmentRepository.getMatchedTreatments(debugMode);
        case 112:
          matchedTreatments = _context.sent;
          if (!(matchedTreatments === null)) {
            _context.next = 115;
            break;
          }
          throw new Error("no-segment-in-config");
        case 115:
          _context.prev = 115;
          _context.next = 118;
          return productInfoPromise;
        case 118:
          _context.next = 123;
          break;
        case 120:
          _context.prev = 120;
          _context.t0 = _context["catch"](115);
          throw new Error("product-info-no-persist");
        case 123:
          addToBeagleInfoLayer("m", "pinfo-persisted");
          if (matchedTreatments.length) {
            _context.next = 126;
            break;
          }
          throw new Error("ok-no-matching-robots");
        case 126:
          addToBeagleInfoLayer("m", "found-matched-robots");
          robotEngine = new RobotEngine({
            debugFilteredTreatments: debugFilteredTreatments,
            debugMode: debugMode,
            matchedTreatments: matchedTreatments,
            identifier: identifier,
            pageType: pageType,
            isOn: isOn,
            isChamp: isChamp
          });
          _context.next = 130;
          return robotEngine.engageRobots();
        case 130:
          addToBeagleInfoLayer("m", "ok-robots-engaged");
          _context.t1 = logger;
          _context.next = 134;
          return getFromBeagleInfoLayer("a");
        case 134:
          _context.t2 = _context.sent;
          _context.t1.success.call(_context.t1, "Applied treatments: ", _context.t2);
          _context.next = 142;
          break;
        case 138:
          _context.prev = 138;
          _context.t3 = _context["catch"](8);
          logger.warn("Entrypoint catch: ", _context.t3.message);
          addToBeagleInfoLayer("m", _context.t3.message);
        case 142:
          _context.prev = 142;
          removeDocumentHide();
          if (isOn !== null) addToBeagleInfoLayer("isOn", isOn);
          if (isOn !== null && isChamp !== null) addToBeagleInfoLayer("isChamp", isOn && isChamp);
          addToBeagleInfoLayer("GLOV_ON", analyticsLabel);
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: analyticsLabel
          });
          _context.next = 150;
          return beacon.packAndQueueMainLog();
        case 150:
          return _context.finish(142);
        case 151:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[8, 138, 142, 151], [115, 120]]);
}))();
function setUpEligibilityRuleListeners() {
  return _setUpEligibilityRuleListeners.apply(this, arguments);
}
function _setUpEligibilityRuleListeners() {
  _setUpEligibilityRuleListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
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
            return ruleEngine.initializeListeners();
          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _setUpEligibilityRuleListeners.apply(this, arguments);
}
function persistProductInfo() {
  return _persistProductInfo.apply(this, arguments);
}
function _persistProductInfo() {
  _persistProductInfo = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3() {
    var productInfoDB;
    return regenerator_default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return store.getInstance();
          case 2:
            productInfoDB = _context3.sent;
            _context3.next = 5;
            return productInfoDB.persistProductInfo();
          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _persistProductInfo.apply(this, arguments);
}
function processUnsupported() {
  analyticsLabel = "unsupported";
  throw new Error("unsupported-device");
}

// if admin user, make out of scope and mark as employee
function processAdminUser() {
  analyticsLabel = "employee";
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, true);
  throw new Error("admin-employee");
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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RTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ3ZDO0VBQUE7QUFBQTtBQUFBLFNBRWNmLGtCQUFrQjtFQUFBO0FBQUE7QUFBQTtFQUFBLGlGQUFqQztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQzhCblEsaUJBQWlCLEVBQUU7VUFBQTtZQUF6Q21SLGFBQWE7WUFBQTtZQUFBLE9BQ2JBLGFBQWEsQ0FBQ2hCLGtCQUFrQixFQUFFO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDekM7RUFBQTtBQUFBO0FBRUQsU0FBU0wsa0JBQWtCLEdBQUc7RUFDNUJQLGNBQWMsR0FBRyxhQUFhO0VBQzlCLE1BQU0sSUFBSWh1QixLQUFLLENBQUMsb0JBQW9CLENBQUM7QUFDdkM7O0FBRUE7QUFDQSxTQUFTK3VCLGdCQUFnQixHQUFHO0VBQzFCZixjQUFjLEdBQUcsVUFBVTtFQUMzQjF5QixNQUFNLENBQUMyQyxZQUFZLENBQUMwSSxPQUFPLENBQUN4SiwyQkFBMkIsRUFBRSxJQUFJLENBQUM7RUFDOUQsTUFBTSxJQUFJNkMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQ25DLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9jb2xsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvY29uZmlncy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZCZWFjb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvcmVwbGFjZS11dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC93cmFwLWlkYi12YWx1ZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuY29uZmlnLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlJvYm90RW5naW5lL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9kYXRhTGF5ZXJDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbGVtZW50Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZnVuY3Rpb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9zZXNzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvdXJsQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZW52Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZHYXRlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIFwidXNlIHN0cmljdFwiOyAvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovXG4gIG1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSA9IGZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIGV4cG9ydHMgPSB7fSxcbiAgICBPcCA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHksXG4gICAgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgICBvYmpba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgfSxcbiAgICAkU3ltYm9sID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgPyBTeW1ib2wgOiB7fSxcbiAgICBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCIsXG4gICAgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICAgIHdyaXRhYmxlOiAhMFxuICAgIH0pLCBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yLFxuICAgICAgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpLFxuICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KSwgZ2VuZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpICYmIChJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKFwidGhyb3dcIiAhPT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmcsXG4gICAgICAgICAgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiBcIm9iamVjdFwiID09IF90eXBlb2YodmFsdWUpICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikgPyBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkgOiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQsIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICB9XG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgaWYgKFwiZXhlY3V0aW5nXCIgPT09IHN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgIGlmIChcInRocm93XCIgPT09IG1ldGhvZCkgdGhyb3cgYXJnO1xuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZCwgY29udGV4dC5hcmcgPSBhcmc7Oykge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcIm5leHRcIiA9PT0gY29udGV4dC5tZXRob2QpIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztlbHNlIGlmIChcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB7XG4gICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBjb250ZXh0Lm1ldGhvZCAmJiBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBcImNvbXBsZXRlZFwiIDogXCJzdXNwZW5kZWRZaWVsZFwiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUgJiYgKHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZCxcbiAgICAgIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgIGlmICh1bmRlZmluZWQgPT09IG1ldGhvZCkgcmV0dXJuIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBcInRocm93XCIgPT09IG1ldGhvZE5hbWUgJiYgZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0gJiYgKGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQsIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpLCBcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB8fCBcInJldHVyblwiICE9PSBtZXRob2ROYW1lICYmIChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAnXCIgKyBtZXRob2ROYW1lICsgXCInIG1ldGhvZFwiKSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgcmV0dXJuIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcsIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICByZXR1cm4gaW5mbyA/IGluZm8uZG9uZSA/IChjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZSwgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYywgXCJyZXR1cm5cIiAhPT0gY29udGV4dC5tZXRob2QgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpIDogaW5mbyA6IChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIiksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG4gICAgMSBpbiBsb2NzICYmIChlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV0pLCAyIGluIGxvY3MgJiYgKGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdLCBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM10pLCB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIiwgZGVsZXRlIHJlY29yZC5hcmcsIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV0sIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKSwgdGhpcy5yZXNldCghMCk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGl0ZXJhYmxlLm5leHQpIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgZm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkgcmV0dXJuIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dC52YWx1ZSA9IHVuZGVmaW5lZCwgbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogITBcbiAgICB9O1xuICB9XG4gIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lUHJvcGVydHkoR3AsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSwgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBnZW5GdW4gJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiAhIWN0b3IgJiYgKGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA9PT0gKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSk7XG4gIH0sIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpIDogKGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIikpLCBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCksIGdlbkZ1bjtcbiAgfSwgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKSwgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIHZvaWQgMCA9PT0gUHJvbWlzZUltcGwgJiYgKFByb21pc2VJbXBsID0gUHJvbWlzZSk7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKSwgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIiksIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pLCBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpLFxuICAgICAga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cy5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsga2V5cy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkgcmV0dXJuIG5leHQudmFsdWUgPSBrZXksIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgIH07XG4gIH0sIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoc2tpcFRlbXBSZXNldCkge1xuICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQsIHRoaXMuZG9uZSA9ICExLCB0aGlzLmRlbGVnYXRlID0gbnVsbCwgdGhpcy5tZXRob2QgPSBcIm5leHRcIiwgdGhpcy5hcmcgPSB1bmRlZmluZWQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhc2tpcFRlbXBSZXNldCkgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgIFwidFwiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLmRvbmUgPSAhMDtcbiAgICAgIHZhciByb290UmVjb3JkID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByb290UmVjb3JkLnR5cGUpIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSBcInRocm93XCIsIHJlY29yZC5hcmcgPSBleGNlcHRpb24sIGNvbnRleHQubmV4dCA9IGxvYywgY2F1Z2h0ICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKFwicm9vdFwiID09PSBlbnRyeS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIiksXG4gICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNGaW5hbGx5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHRocm93IHJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSByZWNvcmQudHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHJlY29yZC50eXBlID8gdGhpcy5uZXh0ID0gcmVjb3JkLmFyZyA6IFwicmV0dXJuXCIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSBcInJldHVyblwiLCB0aGlzLm5leHQgPSBcImVuZFwiKSA6IFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIGZpbmlzaChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uIF9jYXRjaCh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gZGVsZWdhdGVZaWVsZChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9LCBcIm5leHRcIiA9PT0gdGhpcy5tZXRob2QgJiYgKHRoaXMuYXJnID0gdW5kZWZpbmVkKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH0sIGV4cG9ydHM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvYmopO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS5cblxudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi4vaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWVcIikoKTtcbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcblxuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9wYWNrYWdlcy9ydW50aW1lL3J1bnRpbWUuanMjTDczNj1cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCB0b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGNvbnN0IHJlcGxhY2VBbGwgPSAoc3RyLCBmaW5kLCByZXBsYWNlID0gXCJcIikgPT4ge1xuICBpZiAoIXN0cikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIHN0cjtcblxuICB3aGlsZSAoc3RyLmluZGV4T2YoZmluZCkgPj0gMCkge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gICAgc3RyID0gKGluZGV4ID4gMCA/IHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpIDogXCJcIikgKyByZXBsYWNlICsgc3RyLnN1YnN0cmluZyhpbmRleCArIGZpbmQubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5leHBvcnQgY29uc3QgdHVya2lzaFRvTG93ZXIgPSAoc3RyKSA9PiB7XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XG4gIGxldCBzdHJpbmcgPSBzdHI7XG4gIGNvbnN0IGxldHRlcnMgPSB7XCLEsFwiOiBcImlcIiwgXCJJXCI6IFwixLFcIiwgXCLFnlwiOiBcIsWfXCIsIFwixJ5cIjogXCLEn1wiLCBcIsOcXCI6IFwiw7xcIiwgXCLDllwiOiBcIsO2XCIsIFwiw4dcIjogXCLDp1wifTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygoW8SwScWexJ7DnMOHw5ZdKSkvZywgZnVuY3Rpb24obGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlcnNbbGV0dGVyXTtcbiAgfSk7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuL3N0cmluZ1V0aWxzXCI7XG5jb25zdCBpc1N0YWdpbmcgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJzdGFnaW5nLnZpdmVuc2VcIikgOiB0cnVlO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMC4wLjQxLjMuOFwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50cy5qc29uXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzdjIuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNUWUxFU0hFRVRfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzX3N0YWdpbmcuY3NzXCIgOiBgaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXMuY3NzP2lkPSR7cmVwbGFjZUFsbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEzKS5yZXBsYWNlKFwiVFwiLCBcIlwiKSwgXCItXCIsIFwiXCIpfWA7XG5leHBvcnQgY29uc3QgRV9SVUxFU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlc19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlcy5qc29uXCI7XG5leHBvcnQgY29uc3QgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OID0gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3NvY2lhbC1wcm9vZi12Mi5qc29uXCI7XG5leHBvcnQgY29uc3QgTE9HX0FQSV9VUkwgPSBcImh0dHBzOi8vZXVyb3BlLXdlc3QzLW5leHRkYXktMzRlYjMuY2xvdWRmdW5jdGlvbnMubmV0L2FwaS9sb2dcIjtcbmV4cG9ydCBjb25zdCBMT09LVVBfQVBJX1VSTCA9IFwiaHR0cHM6Ly9jYXRhbG9nLWFwaS5hZG9yYWFpLmNvbVwiO1xuZXhwb3J0IGNvbnN0IE1PQklMRV9NRURJQV9RVUVSWSA9IFwiKG1heC13aWR0aDogNDQwcHgpXCI7XG4vLyBDb250cm9sIGdyb3VwIHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBTUExJVF9SQVRJTyA9IDUwO1xuZXhwb3J0IGNvbnN0IExBQl9SQVRJTyA9IDIwO1xuLy8gU2tpcHBlZCB0cmVhdG1lbnQgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9SQVRJTyA9IDUwO1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTID0gMjtcbmV4cG9ydCBjb25zdCBMSVNUX01PREVfQkVBR0xFX0tFWVMgPSBbXCJwYWdldHlwZVwiLCBcImNhdGVnb3J5XCIsIFwiYWxsdGltZVBMUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QTFBDYXRlZ29yeU1vZGVcIixcbiAgXCJhbGx0aW1lUERQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBEUENhdGVnb3J5TW9kZVwiLCBcImFsbHRpbWVDYXJ0Q2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvbkNhcnRDYXRlZ29yeU1vZGVcIl07XG5leHBvcnQgY29uc3QgSURMRV9USU1FT1VUID0gMTUwMDA7XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OX1NUT1JBR0VfS0VZUyA9IHtcbiAgU0VTU0lPTl9USU1FU1RBTVA6IFwiQkdfU2Vzc2lvblRpbWVzdGFtcFwiLFxuICBTRVNTSU9OX0hJU1RPUlk6IFwiQkdfU2Vzc2lvbkhpc3RvcnlcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG4gIE1BVENIRURfVFJFQVRNRU5UUzogXCJHTFZfTWF0Y2hlZFwiLFxufTtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0tFWVMgPSB7XG4gIFRSRUFUTUVOVFM6IFwiQkdfVHJlYXRtZW50c1wiLFxuICBXRUlHSFRTOiBcIkJHX1dlaWdodHNcIixcbiAgRUxJR0lCSUxJVFlfUlVMRVM6IFwiQkdfRV9SdWxlc1wiLFxuICBERUJVR19NT0RFOiBcIkJHX0RlYnVnXCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAxXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG4gIElTX0FETUlOOiBcIkdMVl9Jc0FkbWluXCIsXG4gIElTX0VNUExPWUVFOiBcIkdMVl9Jc0VtcGxveWVlXCIsXG4gIFZFUlNJT046IFwiR0xWX1ZcIixcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fU1RPUkFHRV9QUkVGSVggPSBcIkJHX1NlZ19cIjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpbiA9IFwiQmVhZ2xlIENsaWVudCBTREtcIiwgdGVzdGluZyA9IGZhbHNlKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgIHRoaXMuREVCVUcgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkRFQlVHID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5ERUJVR19NT0RFKTtcbiAgICB9XG4gIH1cblxuICBpbmZvKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5pbmZvKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmIChERUJVRykge1xuICAgICAgY29uc29sZS5sb2coYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgZmFpbGVkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogcmVkXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgc3VjY2VzcyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IGdyZWVuXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUud2FybihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5lcnJvcihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBudWxsID09IGFyciA/IG51bGwgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBTeW1ib2wgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKG51bGwgIT0gX2kpIHtcbiAgICB2YXIgX3MsXG4gICAgICBfZSxcbiAgICAgIF94LFxuICAgICAgX3IsXG4gICAgICBfYXJyID0gW10sXG4gICAgICBfbiA9ICEwLFxuICAgICAgX2QgPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKF94ID0gKF9pID0gX2kuY2FsbChhcnIpKS5uZXh0LCAwID09PSBpKSB7XG4gICAgICAgIGlmIChPYmplY3QoX2kpICE9PSBfaSkgcmV0dXJuO1xuICAgICAgICBfbiA9ICExO1xuICAgICAgfSBlbHNlIGZvciAoOyAhKF9uID0gKF9zID0gX3guY2FsbChfaSkpLmRvbmUpICYmIChfYXJyLnB1c2goX3MudmFsdWUpLCBfYXJyLmxlbmd0aCAhPT0gaSk7IF9uID0gITApIHtcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSAhMCwgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgbnVsbCAhPSBfaVtcInJldHVyblwiXSAmJiAoX3IgPSBfaVtcInJldHVyblwiXSgpLCBPYmplY3QoX3IpICE9PSBfcikpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYXJyO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVdGlsc1wiKTtcbmNvbnN0IG1vbnRocyA9IHtcbiAgXCJvY2FrXCI6IDAsXG4gIFwixZ91YmF0XCI6IDEsXG4gIFwibWFydFwiOiAyLFxuICBcIm5pc2FuXCI6IDMsXG4gIFwibWF5xLFzXCI6IDQsXG4gIFwiaGF6aXJhblwiOiA1LFxuICBcInRlbW11elwiOiA2LFxuICBcImHEn3VzdG9zXCI6IDcsXG4gIFwiZXlsw7xsXCI6IDgsXG4gIFwiZWtpbVwiOiA5LFxuICBcImthc8SxbVwiOiAxMCxcbiAgXCJhcmFsxLFrXCI6IDExLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50SGlkZSA9ICgpID0+IHtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtZWFzZVwiKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUb0Vhc2VPdXQgPSBhc3luYyAoKSA9PiB7XG4gIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1oaWRlXCIpKSByZXR1cm47XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBlbC50ZXh0Q29udGVudCA9IGAuZ2xvdi1lYXNlIHtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1vLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1zLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgfVxuICBcbiAgQGtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IGZpbHRlcjogZ3JheXNjYWxlKDAlKTt9XG4gIH1cbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNtb290aCB7XG4gICAgMCUgeyBvcGFjaXR5OiAwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAyNSUgeyBvcGFjaXR5OiAwLjEwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA1MCUgeyBvcGFjaXR5OiAwLjI1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA3NSUgeyBvcGFjaXR5OiAwLjUwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA5MCUgeyBvcGFjaXR5OiAwLjc1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAxMDAlIHsgb3BhY2l0eTogMTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9YDtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucHJlcGVuZChlbCk7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50IHdlaWdodHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hQbHVzKEVfUlVMRVNfTE9DQVRJT04pO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlcykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2hQbHVzKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Kc29uID0gYXdhaXQgcHJvZHVjdEluZm8uanNvbigpO1xuICAgIHJldHVybiBwcm9kdWN0SW5mb0pzb247XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggcHJvZHVjdCBpbmZvXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgdGltZW91dCA9ICh0aW1lKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lKTtcbiAgcmV0dXJuIHtjb250cm9sbGVyLCB0aW1lb3V0SUR9O1xufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT4ge1xuICBjb25zdCB7Y29udHJvbGxlciwgdGltZW91dElEfSA9IHRpbWVvdXQoNTAwMCk7XG4gIHJldHVybiBmZXRjaCh1cmwsIHsuLi5vcHRpb25zLCBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLnN0YXR1cyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAocmV0cmllcyA+IDApIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggdGltZWQgb3V0IFJldHJ5aW5nLi4uOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggZmFpbGVkOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDb29raWVJZGVudGlmaWVyID0gKGNvb2tpZVN0cmluZywgY29va2llTmFtZSkgPT4ge1xuICBpZiAoIWNvb2tpZVN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gY29va2llU3RyaW5nXG4gICAgICAuc3BsaXQoXCI7XCIpXG4gICAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiPVwiKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICBpZiAodlswXSAmJiB2WzFdKSB7XG4gICAgICAgICAgYWNjW2RlY29kZVVSSUNvbXBvbmVudCh2WzBdLnRyaW0oKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZbMV0udHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gIGxldCBpZGVudGlmaWVyID0gcGFyc2VkW2Nvb2tpZU5hbWVdO1xuICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29va2llTmFtZSA9PT0gXCJfZ2FcIikge1xuICAgIC8vIGV4dHJhY3QgdW5pcXVlIGlkZW50aWZpZXIgZnJvbSBHQSBjb29raWVcbiAgICBjb25zdCBpZGVudGlmaWVySW5kZXggPSAyO1xuICAgIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyLnNwbGl0KFwiLlwiKVtpZGVudGlmaWVySW5kZXhdO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZVBjdCA9IGFzeW5jIChpZGVudGlmaWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggb2YgeWVhciB0byBoYXNoIHRvIHJlc2V0IGl0IGV2ZXJ5IG1vbnRoXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG5vdy5nZXRNb250aCgpO1xuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcittb250aC50b1N0cmluZygpKTtcblxuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWN0aW9uc1RvUHJlcGFyZSkpO1xuICBsZXQgdmFyaWFudCA9IG51bGw7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7YnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zLCB2YXJpYW50c30gPSBhY3Rpb247XG4gICAgaWYgKCFidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMgJiYgIXZhcmlhbnRzKSBjb250aW51ZTtcbiAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhcmlhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpbmRleCwgdmFyaWFudEtleV0gb2YgT2JqZWN0LmtleXModmFyaWFudHMpLmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAoZGVidWdNb2RlICYmICFhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IE1hdGguZmxvb3IoMTAwIC8gT2JqZWN0LmtleXModmFyaWFudHMpLmxlbmd0aCkgKiAoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrQWN0aW9uU2VsZWN0b3JzID0gKGFjdGlvbnMpID0+IHtcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgIGNvbnN0IHtzZWxlY3Rvciwgc2VsZWN0b3JGYWxsYmFjaywgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzJ9ID0gYWN0aW9uO1xuICAgIGlmIChcbiAgICAgIChzZWxlY3RvciB8fCBzZWxlY3RvckZhbGxiYWNrKSAmJlxuICAgICAgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgJiZcbiAgICAgICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JGYWxsYmFjaylcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3Rvci9TZWxlY3RvckZhbGxiYWNrIG5vdCBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKSkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAxIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMikpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMiBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzID0gKCkgPT4ge1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHLCBTRVNTSU9OX1RJTUVTVEFNUCwgU0VTU0lPTl9ISVNUT1JZfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHBvcHVwRGlzcGxheUZsYWcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRyk7XG4gIGNvbnN0IHNlc3Npb25UaW1lc3RhbXAgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QKTtcbiAgY29uc3Qgc2Vzc2lvbkhpc3RvcnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fSElTVE9SWSk7XG5cbiAgaWYgKHBvcHVwRGlzcGxheUZsYWcgPT09IG51bGwpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMCk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uVGltZXN0YW1wKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCwgRGF0ZS5ub3coKSk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uSGlzdG9yeSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXSk7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHNlc3Npb25IaXN0b3J5XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb25kaXRpb25DaGVja2VyID0gKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSBcIm5vdEV4aXN0XCIpIHtcbiAgICBpZiAoIXJ1blRpbWVWYWx1ZSkge1xuICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fFxuICAgIHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZGl0aW9uID09PSBudWxsIHx8XG4gICAgY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogcnVuVGltZVZhbHVlIG9yIGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICBjYXNlIFwiZXhpc3RcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiaW5jbHVkZXNcIjpcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEluY2x1ZGVzXCI6XG4gICAgY2FzZSBcIm5vdENvbnRhaW5zXCI6XG4gICAgICBpZiAoIXJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90RXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlclRoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPiB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc1RoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlckVxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc0VxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiYmV0d2VlblwiOiB7XG4gICAgICBsZXQgW21pbiwgbWF4XSA9IHZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSBtaW4gJiYgcnVuVGltZVZhbHVlIDw9IG1heCkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYXNlIFwicmVnZXhcIjoge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIik7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChydW5UaW1lVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZCBcIiwgY29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERlYnVnTW9kZSA9ICgpID0+IHtcbiAgY29uc3Qge0RFQlVHX01PREUsIElTX0VNUExPWUVFfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgY29uc3Qge01BVENIRURfVFJFQVRNRU5UU30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcbiAgdHJ5IHtcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgY29uc3QgY3VycmVudCA9IHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShERUJVR19NT0RFKSk7XG4gICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9XCIpKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oSVNfRU1QTE9ZRUUsIHRydWUpO1xuICAgICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MVwiKSkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMSk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSAxKSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShNQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTJcIikpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDIpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgICAgICBpZiAoY3VycmVudCAhPT0gMikgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9XG4gICAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0tMVwiKSkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgLTEpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0wXCIpKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgICAgIGlmIChjdXJyZW50KSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShNQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKE51bWJlci5pc05hTihjdXJyZW50KSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZGVidWcgbW9kZSB3aXRoIGVycm9yOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxufTtcblxuLy8gZ2V0IEdBIGNsaWVudCBpZCB1c2luZyBnYS5nZXRBbGwoKVxuZXhwb3J0IGNvbnN0IGdldEdhQ2xpZW50SWQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhID0gd2luZG93LmdhO1xuICAvLyBpZiBnYSBhbmQgZ2EuZ2V0QWxsKCkgaXMgbm90IGRlZmluZWQsIHJldHVybiBudWxsXG4gIGlmIChnYSAmJiBnYS5nZXRBbGwpIHtcbiAgICBjb25zdCB0cmFja2VycyA9IGdhLmdldEFsbCgpO1xuICAgIGlmICh0cmFja2VycyAmJiB0cmFja2Vycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cmFja2Vyc1swXS5nZXQoXCJjbGllbnRJZFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBnZXQgZGV0ZXJtaW5pc3RpYyBudW1lcmljIGhhc2ggZnJvbSBzdHJpbmcgdGhhdCBjb250YWlucyBvbmx5IG51bWJlcnNcbmV4cG9ydCBjb25zdCBnZXRVbnNlY3VyZUhhc2ggPSAoc3RyKSA9PiB7XG4gIC8vIHN0YXJ0IHdpdGggYSBtYWdpYyBudW1iZXIsIHVzZSBwaSBkaWdpdHNcbiAgbGV0IGhhc2ggPSAzMTQxNTkyNjU7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gbWFrZSBpdCBzdHJpbmdcbiAgICBzdHIgPSBzdHIudG9TdHJpbmcoKTtcbiAgfVxuICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICB9XG4gIC8vIHJldHVybiBhYnNvbHV0ZSB2YWx1ZVxuICByZXR1cm4gTWF0aC5hYnMoaGFzaCk7XG59O1xuXG4vLyBnZW5lcmF0ZSBhIDMyLWJpdCByYW5kb20gaW50ZWdlclxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKTtcbn07XG5cbi8vIGdldCBjdXJyZW50IHVuaXggZXBvY2ggdGltZSBpbiBzZWNvbmRzXG5leHBvcnQgY29uc3QgZ2V0VW5peFRpbWUgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldElkZW50aWZpZXIgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gbG9jYWwgc3RvcmFnZVwiLCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhIGluIGZpcnN0IGF0dGVtcHRcIiwgaWQpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhXCIsIGlkKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTApO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IHJlYWQgR0EgY2xpZW50IGlkXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBpbiBnZXRJZGVudGlmaWVyXCIsIGUpO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzKSA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERlbGl2ZXJ5RGF0ZSA9IChkYXRlKSA9PiB7XG4gIGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGRhdGU7XG5cbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHN0YXJ0TW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIGVuZE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBzdGFydERheTogdW5kZWZpbmVkLFxuICAgIGVuZERheTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGxldCBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspLShbXFxcXGRdKylcXFxccz8oW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSA0KSB7XG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFszXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKyktKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5sZW5ndGggIT09IDUpIHJldHVybiBkYXRlO1xuXG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbMl0udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFs0XS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCFyZXN1bHQuc3RhcnRNb250aEluZGV4IHx8ICFyZXN1bHQuZW5kTW9udGhJbmRleCkgcmV0dXJuIGRhdGU7XG5cbiAgICBjb25zdCBzdGFydFllYXIgPSByZXN1bHQuc3RhcnRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG4gICAgY29uc3QgZW5kWWVhciA9IHJlc3VsdC5lbmRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG5cbiAgICBjb25zdCBlc3RpbWF0ZWRTdGFydCA9IG5ldyBEYXRlKHN0YXJ0WWVhciwgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCwgcmVzdWx0LnN0YXJ0RGF5KTtcbiAgICBjb25zdCBlc3RpbWF0ZWRFbmQgPSBuZXcgRGF0ZShlbmRZZWFyLCByZXN1bHQuZW5kTW9udGhJbmRleCwgcmVzdWx0LmVuZERheSk7XG5cblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZFN0YXJ0IC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICBjb25zdCBlbmREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkRW5kIC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJXZWVrcyA9IHN0YXJ0RGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoc3RhcnREaWZmT3ZlckRheXMgLyA3KTtcbiAgICBjb25zdCBlbmREaWZmT3ZlcldlZWtzID0gZW5kRGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoZW5kRGlmZk92ZXJEYXlzIC8gNyk7XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPT09IDApIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gLSAke2VuZERpZmZPdmVyRGF5c30gR8O8bmA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID49IDEpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gR8O8biAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IGVuZERpZmZPdmVyV2Vla3MpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlkbGVUaW1lciA9IGFzeW5jICh0aW1lT3V0LCBjYWxsQmFjaykgPT4ge1xuICBsZXQgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcblxuICB3aW5kb3cudG9wLmRvY3VtZW50Lm9udG91Y2hzdGFydCA9IHJlc2V0VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcbiAgICBjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXQpO1xuICAgIGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpc093bk11dGF0aW9uID0gKG11dGF0aW9uTGlzdCkgPT4ge1xuICBjb25zdCBub2RlcyA9IFsuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0ucmVtb3ZlZE5vZGVzKV07XG4gIHJldHVybiBub2Rlcy5zb21lKChuKSA9PiB7XG4gICAgcmV0dXJuIG4udGFnTmFtZSAmJiAobi5pZD8uaW5jbHVkZXMoXCJibi1cIikgfHwgQXJyYXkuZnJvbShuLmNsYXNzTGlzdCkuc29tZSgoYykgPT4gYy5pbmNsdWRlcyhcImJuLVwiKSB8fCBjLmluY2x1ZGVzKFwibmQtXCIpKSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFnZW50RGV0YWlscyA9ICgpID0+IHtcbiAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIC8vIGV4dHJhY3QgYnJvd3NlciBhbmQgdmVyc2lvblxuICBjb25zdCBiciA9IHVhLm1hdGNoKC8ob3BlcmF8b3ByfGVkZ3x0cmlkZW50fGZpcmVmb3h8bXNpZSg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHxcbiAgICB1YS5tYXRjaCgvKHNhZmFyaXxjaHJvbWUoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8XG4gICAgdWEubWF0Y2goLyh3ZWJraXQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8IFtdO1xuXG4gIGlmICghYnIgfHwgYnIubGVuZ3RoIDwgMykgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGJOYW1lID0gYnJbMV07XG4gIGNvbnN0IGJWZXJzaW9uID0gYnJbMl07XG5cbiAgY29uc3Qgb3MgPSB7XG4gICAgV2luZG93czogL1dpbi9pLnRlc3QodWEpLFxuICAgIE1hYzogL01hYy9pLnRlc3QodWEpLFxuICAgIExpbnV4OiAvTGludXgvaS50ZXN0KHVhKSxcbiAgICBBbmRyb2lkOiAvQW5kcm9pZC9pLnRlc3QodWEpLFxuICAgIGlPUzogL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KHVhKSxcbiAgfTtcblxuICAvLyBleHRyYWN0IE9TIGFuZCB2ZXJzaW9uXG4gIGxldCBvc1ZlcnNpb24gPSBcIlwiO1xuICBsZXQgb3NOYW1lID0gXCJcIjtcbiAgaWYgKG9zLldpbmRvd3MpIHtcbiAgICBvc05hbWUgPSBcIldpbmRvd3NcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvV2luZG93cyBOVCAoWzAtOS5dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcIjBcIjtcbiAgfSBlbHNlIGlmIChvcy5pT1MpIHtcbiAgICBvc05hbWUgPSBcImlPU1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9PUyAoWzAtOV9dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0ucmVwbGFjZSgvXy9nLCBcIi5cIikgOiBcIjBcIjtcbiAgfSBlbHNlIGlmIChvcy5NYWMpIHtcbiAgICBvc05hbWUgPSBcIk1hY1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9NYWMgT1MgWCAoWzAtOV9dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0ucmVwbGFjZSgvXy9nLCBcIi5cIikgOiBcIjBcIjtcbiAgfSBlbHNlIGlmIChvcy5BbmRyb2lkKSB7XG4gICAgb3NOYW1lID0gXCJBbmRyb2lkXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL0FuZHJvaWQgKFswLTkuXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCIwXCI7XG4gIH0gZWxzZSBpZiAob3MuTGludXgpIHtcbiAgICBvc05hbWUgPSBcIkxpbnV4XCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL0xpbnV4IChbaVxcZF0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwiMFwiO1xuICB9XG5cbiAgLy8gZXh0cmFjdCBtb2JpbGUgb3IgZGVza3RvcFxuICBjb25zdCBpc01vYmlsZSA9IC9Nb2JpL2kudGVzdCh1YSk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuYnJvd3Nlck5hbWVcIiwgYk5hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5icm93c2VyVmVyc2lvblwiLCBiVmVyc2lvbik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm9zTmFtZVwiLCBvc05hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5vc1ZlcnNpb25cIiwgb3NWZXJzaW9uKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaXNNb2JpbGVcIiwgaXNNb2JpbGUpO1xuXG4gIC8vIHNwbGl0IE9TIHZlcnNpb25zIGJ5IC4sIHRha2UgZmlyc3QgcGFydCBhcyBpbnRlZ2VyXG4gIGNvbnN0IG9zVmVyc2lvbkludCA9IHBhcnNlSW50KG9zVmVyc2lvbi5zcGxpdChcIi5cIilbMF0pO1xuXG4gIGNvbnN0IGlzU3VwcG9ydGVkQnJvd3NlciA9IGJOYW1lID09PSBcIkNocm9tZVwiIHx8IGJOYW1lID09PSBcIlNhZmFyaVwiO1xuICBjb25zdCBpc1N1cHBvcnRlZE9TID0gKG9zTmFtZSA9PT0gXCJBbmRyb2lkXCIgJiYgb3NWZXJzaW9uSW50ID49IDkpIHx8XG4gICAgKG9zTmFtZSA9PT0gXCJpT1NcIiAmJiBvc1ZlcnNpb25JbnQgPj0gMTMpIHx8XG4gICAgKG9zTmFtZSA9PT0gXCJXaW5kb3dzXCIgJiYgb3NWZXJzaW9uSW50ID49IDYpIHx8XG4gICAgKG9zTmFtZSA9PT0gXCJNYWNcIiAmJiBvc1ZlcnNpb25JbnQgPj0gMTApO1xuXG4gIHJldHVybiBpc1N1cHBvcnRlZEJyb3dzZXIgJiYgaXNTdXBwb3J0ZWRPUztcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRCcm93c2VyRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIuYnJvd3Nlckxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLnN5c3RlbUxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaW50ZXJuZXRTcGVlZFwiLCB3aW5kb3dQdHIubmF2aWdhdG9yPy5jb25uZWN0aW9uPy5kb3dubGluayk7XG5cbiAgLyogbWlzY2VsbGFuZW91cyAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRvbnR0cmFja1wiLCBuYXZQdHIuZG9Ob3RUcmFjayB8fCB3aW5kb3dQdHIuZG9Ob3RUcmFjayB8fCBuYXZQdHIubXNEb05vdFRyYWNrKTtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgY29uc3QgZmlyc3RTZXNzaW9uUmVmZXJyZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIpO1xuICBpZiAoIWZpcnN0U2Vzc2lvblJlZmVycmVyKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIGZpcnN0U2Vzc2lvblJlZmVycmVyKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldFVSTERhdGEgPSAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiRmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJCYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJQdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJQYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiQWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUGFzdE9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJTaWduLWluXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwia3Vwb25sYXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUHJvZmlsZUNvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlByb2ZpbGVJbmZvXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUHJvZmlsZUFkZHJlc3Nlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImR1eXVydS10ZXJjaWhsZXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJQcm9maWxlTm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiU3BlY2lhbENhbXBhaWduc1wiO1xuICB9XG5cbiAgaWYgKHBhZ2VUeXBlKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCBwYWdlVHlwZSk7XG4gIH1cbn07XG5cbi8qKlxuICogV29yayBhcm91bmQgU2FmYXJpIDE0IEluZGV4ZWREQiBvcGVuIGJ1Zy5cbiAqXG4gKiBTYWZhcmkgaGFzIGEgaG9ycmlibGUgYnVnIHdoZXJlIElEQiByZXF1ZXN0cyBjYW4gaGFuZyB3aGlsZSB0aGUgYnJvd3NlciBpcyBzdGFydGluZyB1cC4gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyNjU0N1xuICogVGhlIG9ubHkgc29sdXRpb24gaXMgdG8ga2VlcCBudWRnaW5nIGl0IHVudGlsIGl0J3MgYXdha2UuXG4gKi9cbmV4cG9ydCBjb25zdCBpZGJSZWFkeSA9ICgpID0+IHtcbiAgY29uc3QgaXNTYWZhcmkgPVxuICAgICFuYXZpZ2F0b3IudXNlckFnZW50RGF0YSAmJlxuICAgIC9TYWZhcmlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAhL0Nocm9tKGV8aXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAvLyBObyBwb2ludCBwdXR0aW5nIG90aGVyIGJyb3dzZXJzIG9yIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSB0aHJvdWdoIHRoaXMgbWVzcy5cbiAgaWYgKCFpc1NhZmFyaSB8fCAhaW5kZXhlZERCLmRhdGFiYXNlcykgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIGxldCBpbnRlcnZhbElkO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IHRyeUlkYiA9ICgpID0+IGluZGV4ZWREQi5kYXRhYmFzZXMoKS5maW5hbGx5KHJlc29sdmUoKSk7XG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRyeUlkYiwgNTApO1xuICAgIHRyeUlkYigpO1xuICB9KS5maW5hbGx5KCgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrVmVyc2lvbiA9ICgpID0+IHtcbiAgY29uc3QgY3VycmVudFZlcnNpb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlZFUlNJT04pO1xuICBpZiAoY3VycmVudFZlcnNpb24gIT09IFZFUlNJT04pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhMT0NBTF9TVE9SQUdFX0tFWVMpKSB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTW2tleV0pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKFNFU1NJT05fU1RPUkFHRV9LRVlTKSkgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVNba2V5XSk7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5WRVJTSU9OLCBWRVJTSU9OKTtcbiAgfVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRVbnNlY3VyZUhhc2h9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdkluZm9MYXllclwiKTtcbmNvbnN0IExTX1ByZWZpeCA9IFwiR0xEQ19cIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcInVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKTtcblxuICAgIC8vIHJlbW92ZSBkb3RzIGluIGJhc2VGZWF0dXJlTmFtZSBhbmQgYWRkIHByZWZpeFxuICAgIGNvbnN0IGZlYXR1cmVLZXkgPSBMU19QcmVmaXggKyBiYXNlRmVhdHVyZU5hbWUucmVwbGFjZSgvXFwuL2csIFwiX1wiKTtcbiAgICBjb25zdCBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl9cIiArIHVwZGF0ZU1ldGhvZDtcblxuICAgIHN3aXRjaCAodXBkYXRlTWV0aG9kKSB7XG4gICAgICBjYXNlIFwibWluXCI6XG4gICAgICBjYXNlIFwibWF4XCI6XG4gICAgICAgIC8vIGNvbXB1dGUgbWluIGFuZCBtYXggZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG5cbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgTWF0aFt1cGRhdGVNZXRob2RdKHZhbHVlLCBiYXNlRmVhdHVyZVZhbHVlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInN1bVwiOlxuICAgICAgICAvLyBjb21wdXRlIHN1bSBhbmQgY291bnQgZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIHBhcnNlRmxvYXQodmFsdWUpICsgcGFyc2VGbG9hdChiYXNlRmVhdHVyZVZhbHVlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiY250XCI6XG4gICAgICAgIC8vIGNvbXB1dGUgY291bnQgZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIHBhcnNlSW50KHZhbHVlKSArIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBsYXN0IG9idGFpbmVkIHZhbHVlIGluIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJjb3VudF92YWx1ZXNcIiBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXMsIGtlZXAgYSBjb3VudGVyIGZvciBlYWNoIHZhbHVlXG4gICAgICBjYXNlIFwidmFsY250c1wiOlxuICAgICAgICB7XG4gICAgICAgICAgLy8gY29tcHV0ZSBjb3VudCBvZiBlYWNoIHZhbHVlIGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICAgIC8vIGNyZWF0ZSBhIDggYnl0ZXMgaGV4IGhhc2ggZm9yIGJhc2VGZWF0dXJlVmFsdWUsIG9ubHkgcG9zaXRpdmUgbnVtYmVyc1xuICAgICAgICAgIGNvbnN0IHZhbEhhc2ggPSBnZXRVbnNlY3VyZUhhc2goYmFzZUZlYXR1cmVWYWx1ZSk7XG5cbiAgICAgICAgICBjb25zdCBvcEtleVZhbCA9IG9wS2V5ICsgXCJfXCIgKyB2YWxIYXNoO1xuICAgICAgICAgIGNvbnN0IG9wS2V5VmFsTmFtZSA9IG9wS2V5ICsgXCJfXCIgKyB2YWxIYXNoICsgXCJfbmFtZVwiO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9wS2V5VmFsTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleVZhbCk7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5VmFsLCBwYXJzZUludCh2YWx1ZSkgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciBpbiB1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCwgZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBxdWVyeUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdykgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdyk7XG5cbiAgICBjb25zdCBmZWF0dXJlS2V5ID0gTFNfUHJlZml4ICsgYmFzZUZlYXR1cmVOYW1lLnJlcGxhY2UoL1xcLi9nLCBcIl9cIik7XG4gICAgbGV0IG9wS2V5O1xuXG4gICAgbGV0IHN0b3JhZ2UgPSBudWxsO1xuICAgIGlmICh3aW5kb3cgPT09IFwiYWxsdGltZVwiKSB7XG4gICAgICBzdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xuICAgIH0gZWxzZSBpZiAod2luZG93ID09PSBcInNlc3Npb25cIikge1xuICAgICAgc3RvcmFnZSA9IHNlc3Npb25TdG9yYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXCJJbnZhbGlkIHdpbmRvdyB0eXBlXCIsIHdpbmRvdyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHF1ZXJ5TWV0aG9kKSB7XG4gICAgICAvLyBmb3IgbGFzdCwgbWluLCBtYXgsIHN1bSBldGMuIGJyaW5nIHRoZSB2YWx1ZSBmcm9tIGxvY2FsL3Nlc3Npb24gc3RvcmFnZSBnaXZlbiB0aGUgd2luZG93IGlzIHNlc3Npb24gb3IgYWxsdGltZVxuICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgY2FzZSBcIm1heFwiOlxuICAgICAgY2FzZSBcInN1bVwiOlxuICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgb3BLZXkgPSBmZWF0dXJlS2V5ICsgXCJfXCIgKyBxdWVyeU1ldGhvZDtcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG5cbiAgICAgICAgLy8gZm9yIGN2LCByZXR1cm4gdGhlIG51bWJlciBvZiBkc2lpdG5jdCB2YWx1ZXMsIG9idGFpbiBieSBzY2FubmluZyB0aGUgcHJlZml4IG9mIHRoZSBrZXkgaW4gdGhlIGxvY2FsL3Nlc3Npb24gc3RvcmFnZVxuICAgICAgICAvLyBmb3IgbW9kZSwgc2NhbiB0aGUgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlIGFuZCByZXR1cm4gdGhlIHZhbHVlIHdpdGggdGhlIGhpZ2hlc3QgY291bnRcbiAgICAgIGNhc2UgXCJjbnR2YWxzXCI6XG4gICAgICBjYXNlIFwic3VtdmFsc1wiOlxuICAgICAgY2FzZSBcIm1vZGVcIjpcbiAgICAgIHtcbiAgICAgICAgb3BLZXkgPSBmZWF0dXJlS2V5ICsgXCJfdmFsY250c1wiO1xuICAgICAgICBjb25zdCBsb2NhbEtleXMgPSBPYmplY3Qua2V5cyhzdG9yYWdlKTtcbiAgICAgICAgY29uc3QgbG9jYWxLZXlzRmlsdGVyZWQgPSBsb2NhbEtleXMuZmlsdGVyKChrZXkpID0+IGtleS5pbmRleE9mKG9wS2V5KSA9PT0gMCAmJiBrZXkuaW5kZXhPZihcIl9uYW1lXCIpID09PSAtMSk7XG4gICAgICAgIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjbnR2YWxzXCIpIHtcbiAgICAgICAgICByZXR1cm4gbG9jYWxLZXlzRmlsdGVyZWQubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcInN1bXZhbHNcIikge1xuICAgICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICAgIGxvY2FsS2V5c0ZpbHRlcmVkLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgc3VtICs9IHBhcnNlSW50KHN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc3VtO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1heENvdW50ID0gbnVsbDtcbiAgICAgICAgbGV0IG1heFZhbCA9IG51bGw7XG4gICAgICAgIGxvY2FsS2V5c0ZpbHRlcmVkLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IHBhcnNlSW50KHN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICAgICAgICBpZiAobWF4VmFsID09PSBudWxsIHx8IG1heENvdW50ID09PSBudWxsIHx8IG1heENvdW50IDwgdmFsKSB7XG4gICAgICAgICAgICBtYXhDb3VudCA9IHZhbDtcbiAgICAgICAgICAgIC8vIG5hbWVzIGFyZSBvbmx5IGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgIG1heFZhbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSArIFwiX25hbWVcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1heFZhbDtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiRXJyb3IgaW4gcXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3csIGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5leHBvcnQgY29uc3Qgc2VhcmNoUGF0aHMgPSBbXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR0EgRGF0YSBMYXllciBRdWVyaWVzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQYWdlVHlwZVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIGZvcm1hdHRlcjogXCJwYWdlVHlwZUdBMkdsb3ZcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBkcC5za3VcIiwgZm9ybWF0dGVyOiBcInVwcGVyQ2FzZVRSXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UuZGV0YWlsLmFjdGlvbkZpZWxkLmxpc3RcIiwgbmFtZTogXCJwZHAubGlzdGFsaWFzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZGlzY291bnRSYXRlXCIsIG5hbWU6IFwicGRwLmRpc2NvdW50UmF0ZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJzZWFyY2hfc3VjY2Vzc1wiLCBuYW1lOiBcInBscC5zZWFyY2hTdWNjZXNzXCIsIGV4Y2x1c2l2ZTogW1wicGxwLmlkXCIsIFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgXCJwbHAubmFtZVwiLCBcInBscC5ncm91cFwiLCBcInBscC5jbGFzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQTFBcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LW1haW4tZGV0YWlsc1xcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUERQXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUERQXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQRFB8UExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFBEUHxQTFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImVtcHR5X2Jhc2tldF90ZXh0XFxcIl1cIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFBEUHxQTFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFBEUHxQTFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQRFB8UExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbaWQqPVxcXCJjYXJ0X3F1YW50aXR5XFxcIl0sIFtjbGFzcyo9XFxcImJhc2tldF9sZW5ndGhcXFwiXVwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC10aXRsZVxcXCJdLCBbY2xhc3MqPVxcXCJoZWFkZXItYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJzcGFuLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjc2FsZXMtcHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImRpdi5wcm9kdWN0LXByaWNlLWJveFwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI21vYmlsZS1wcm9kdWN0LXN0aWNreVwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1jYXJkW2RhdGEtcHJvZHVjdC1za3VdXCIsIG5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcm9kdWN0LXNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtbGlzdFwiLCBuYW1lOiBcIl9fbGlzdGluZ0l0ZW1CbG9ja09ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIC8vIE1vYmlsZSBvYnNlcnZlciBmb3IgdGhlIGZ1bGwgZm9ybSBibG9jayBhcyBpdCBpcyBjb21wbGV0ZWx5IHJlcGxhY2VkXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fb3JkZXItcHJpY2UtdG90YWxcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi52dm5zLW9yZGVyLWNvbXBsZXRlZC1wYWdlX19vcmRlci1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fb3JkZXItdGl0bGVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fcGF5bWVudC10aXRsZVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi52dm5zLW9yZGVyLWNvbXBsZXRlZC1wYWdlX19vcmRlci1saXN0LXdyYXBwZXJcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtcG5cIiwgbmFtZTogXCJwZHAubXBuXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIml0ZW1MaXN0RWxlbWVudC4qLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcImJyZWFkY3J1bWIuaXRlbUxpc3RFbGVtZW50LiouaXRlbS5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gV2luZG93IGN1c3RvbSBlbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiZmF2b3JpdGVQcm9kdWN0c1wiLCBuYW1lOiBcInZpZXcuZmF2b3JpdGVkTVBOc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCIsIGZvcm1hdHRlcjogXCJ0b1N0cmluZ1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcbl07XG5cbmV4cG9ydCBjb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcInZhbGNudHNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcInN1bXZhbHNcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJzdW12YWxzXCIsIHdpbmRvdzogXCJhbGx0aW1lXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfYWxsdGltZVwifSxcbiAgXSxcbiAgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLmxhc3RDYXJ0Q291cG9uQXBwbGljYWJsZVwifSxcbiAgXSxcbiAgXCJwZHAuY2F0ZWdvcnlcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwidmFsY250c1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhcnJ5U2t1VG9GZWF0dXJlc1wifSxcbiAgXSxcbiAgXCJjYXJ0LmlzZW1wdHlcIjogW1xuICAgIHtkZXJpdmVNZXRob2Q6IFwiY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlc1wifSxcbiAgXSxcbiAgXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIn0sXG4gIF0sXG4gIFwiY2FydC5wcmljZXNcIjogW1xuICAgIHtkZXJpdmVNZXRob2Q6IFwiY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlc1wifSxcbiAgXSxcbiAgXCJjYXJ0LnF1YW50aXRpZXNcIjogW1xuICAgIHtkZXJpdmVNZXRob2Q6IFwiY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlc1wifSxcbiAgXSxcbiAgXCJwZHAuc2t1XCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhcnJ5U2t1VG9GZWF0dXJlc1wifSxcbiAgXSxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92SW5mb0xheWVyUmVwb1wiKTtcblxuZXhwb3J0IGNvbnN0IGN1c3RvbURlcml2YXRpb25SZXBvID0ge307XG4vLyBmdW5jdGlvbnMgbXVzdCBoYXZlIDMgaW5wdXQgcGFyYW1ldGVyczogYmFzZUZlYXR1cmVOYW1lLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyIGFuZCBhZGRUb0JlYWdsZUluZm9MYXllclxuXG4vLyBwdXNoIGEgbmV3IGZ1bmN0aW9uIHRvIHRoZSByZXBvIHRvIGNyZWF0ZSBhIG5ldyBjdXN0b20gZGVyaXZhdGlvblxuY3VzdG9tRGVyaXZhdGlvblJlcG8uY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlcyA9IGFzeW5jIGZ1bmN0aW9uKGJhc2VGZWF0dXJlTmFtZSwgZ2V0RnJvbUJlYWdsZUluZm9MYXllciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIpIHtcbiAgbG9nZ2VyLmxvZyhcImN1c3RvbURlcml2YXRpb25SZXBvLmNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIiwgYERlcml2aW5nIGZyb20gJHtiYXNlRmVhdHVyZU5hbWV9YCk7XG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICAvLyBOT1RFOiBjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGUgaXMgYWxzbyBhIHRyaWdnZXIsIHRvIHByZXZlbnQgaW5maW5pdGUgbG9vcCwgb25seSBzZXQgaXQgaWYgaXQgaXMgbm90IGFscmVhZHkgc2V0IG9yIG5vdCB0aGUgdHJpZ2dlclxuICAgICAgaWYgKGJhc2VGZWF0dXJlTmFtZSAhPT0gXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiAmJiAoY291cG9uTm90QXBwbGljYWJsZSA9PT0gbnVsbCB8fCBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKSAhPT0gMCkpIHtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiY3VzdG9tRGVyaXZhdGlvblJlcG8uY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlczogXCIgKyBlKTtcbiAgfVxufTtcblxuY3VzdG9tRGVyaXZhdGlvblJlcG8uY2FycnlTa3VUb0ZlYXR1cmVzID0gYXN5bmMgZnVuY3Rpb24oYmFzZUZlYXR1cmVOYW1lLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCBhZGRUb0JlYWdsZUluZm9MYXllcikge1xuICBsb2dnZXIubG9nKFwiY3VzdG9tRGVyaXZhdGlvblJlcG8uY2FycnlTa3VUb0ZlYXR1cmVzXCIsIGBEZXJpdmluZyBmcm9tICR7YmFzZUZlYXR1cmVOYW1lfWApO1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIC8vIFByb2R1Y3QgcGFnZSAtLT4gdHJhbnNmZXIgc2t1cyB0byBzaW5nbGUgbG9jYXRpb25cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJQcm9kdWN0cGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIik7XG4gICAgaWYgKHNrdSAhPT0gbnVsbCAmJiBza3UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXdhaXQgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgW3NrdV0pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiYmFza2V0XCIpIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuc2t1c1wiKTtcbiAgICBpZiAoc2t1TGlzdCAhPT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KHNrdUxpc3QpICYmIHNrdUxpc3QubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBza3VMaXN0KTtcbiAgICB9XG4gIH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2Zvcm1hdERlbGl2ZXJ5RGF0ZSwgaXNPd25NdXRhdGlvbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge3F1ZXJ5SW5Db2xsZWN0b3IsIHVwZGF0ZUluQ29sbGVjdG9yfSBmcm9tIFwiLi9jb2xsZWN0b3JcIjtcbmltcG9ydCB7c2VhcmNoUGF0aHMsIGZlYXR1cmVFbmdpbmVlcmluZ09wcywgY3VzdG9tRGVyaXZhdGlvblJlcG99IGZyb20gXCIuL2NvbmZpZ3NcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG53aW5kb3cuYmVhZ2xlSW5mb0xheWVyID0gd2luZG93LmJlYWdsZUluZm9MYXllciB8fCB7XG4gIGE6IHt9LCBlOiB7fSwgZjoge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZJbmZvTGF5ZXJcIik7XG5cbmNvbnN0IGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNID0gKCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5mb0xheWVyLl9faHdtICs9IDE7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVG9CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIGlmIHZhbHVlIGlzIHN0cmluZywgYWRkIGFzIGEgY2xlYW4gc3RyaW5nLCBpZiBvYmplY3QgYWRkIHRoZSBzYW1lXG4gIGNvbnN0IHR5cGVkVmFsdWUgPSB0eXBlb2YgKHZhbHVlKSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpIDogdmFsdWU7XG4gIC8vIGlmIGtleSBjb250YWlucyAuIGNyZWF0ZSBuZXN0ZWQgb2JqZWN0XG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIG9ialtrZXldID0ge307XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBvYmpbbGFzdEtleV0gPSB0eXBlZFZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGluZm9MYXllcltrZXldID0gdHlwZWRWYWx1ZTtcbiAgfVxuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgaWYgKHR5cGVkVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlZFZhbHVlICE9PSBudWxsKSB7XG4gICAgdXBkYXRlRGVyaXZhdGlvbnMoa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwcmV2UGFzc2VkVmFsdWVzID0ge307XG5cbmNvbnN0IHBhc3NWYWx1ZVRvTGlzdGVuZXJzID0gKGtleSwgdmFsdWUpID0+IHtcbiAgLyogaWYgKHByZXZQYXNzZWRWYWx1ZXNba2V5XSA9PT0gdmFsdWUpIHtcbiAgICBsb2dnZXIubG9nKGBwYXNzVmFsdWVUb0xpc3RlbmVycyAtLT4gc2tpcHBpbmcgZHVlIHRvIHJlLXBhc3Mgb2YgdGhlIHNhbWUgdmFsdWUgJHt2YWx1ZX0gb2Yga2V5ICR7a2V5fWApO1xuICAgIHJldHVybjtcbiAgfSovXG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgICAvLyBwcmV2UGFzc2VkVmFsdWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nIGtleTogJHtsYXN0S2V5fWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9ucyhrZXksIG51bGwpO1xuICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRyZWF0bWVudCA9IChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIHN0YXR1cywgZGVwZW5kYW50X29uX3RyZWF0bWVudCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQpIHZhbHVlLmJ1c2luZXNzUnVsZUlkID0gYnVzaW5lc3NSdWxlSWQ7XG4gIGlmICh2YXJpYW50KSB2YWx1ZS52YXJpYW50ID0gdmFyaWFudDtcbiAgaWYgKGRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImVsaWdpYmxlXCI6XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5jb25zdCB1cGRhdGVEZXJpdmF0aW9ucyA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIC8vIERvIHVwZGF0ZXMgZmlyc3RcbiAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICBpZiAoRkVPcC51cGRhdGVNZXRob2QgPT09IG51bGwgfHwgRkVPcC51cGRhdGVNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICBhd2FpdCB1cGRhdGVJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIEZFT3AudXBkYXRlTWV0aG9kKTtcbiAgICB9XG4gICAgLy8gUHJvY2VzcyBxdWVyaWVzIGFmdGVyIHRoZSB1cGRhdGVzXG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHF1ZXJ5UmVzcG9uc2UgPSBhd2FpdCBxdWVyeUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgRkVPcC5xdWVyeU1ldGhvZCwgRkVPcC53aW5kb3cpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoRkVPcC5mZWF0dXJlTmFtZSwgcXVlcnlSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgLy8gUHJvY2VzcyBkZXJpdmF0aW9ucyBhZnRlciB0aGUgdXBkYXRlc1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLmRlcml2ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLmRlcml2ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IGRlcml2ZUZ1bmN0ID0gY3VzdG9tRGVyaXZhdGlvblJlcG9bRkVPcC5kZXJpdmVNZXRob2RdO1xuICAgICAgaWYgKGRlcml2ZUZ1bmN0ID09PSBudWxsIHx8IGRlcml2ZUZ1bmN0ID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGRlcml2ZUZ1bmN0ICE9PSBcImZ1bmN0aW9uXCIpIGNvbnRpbnVlO1xuICAgICAgZGVyaXZlRnVuY3QoYmFzZUZlYXR1cmVOYW1lLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCBhZGRUb0JlYWdsZUluZm9MYXllcik7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgY2FzZSBcInBhZ2VUeXBlR0EyR2xvdlwiOlxuICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFwiUHJvZHVjdHBhZ2VcIjpcbiAgICAgICAgICByZXR1cm4gXCJQRFBcIjtcbiAgICAgICAgY2FzZSBcIkxpc3RpbmdwYWdlXCI6XG4gICAgICAgICAgcmV0dXJuIFwiUExQXCI7XG4gICAgICAgIGNhc2UgXCJiYXNrZXRcIjpcbiAgICAgICAgICByZXR1cm4gXCJCYXNrZXRcIjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgc3RhcnRJbmZvTGF5ZXJTY2FuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSArPSBwYXJzZUludChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3VtUHJpY2UgPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gc3VtUHJpY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBjb25zdCBhcnJheUlubmVyVGV4dCA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgYXJyYXlJbm5lclRleHQucHVzaChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJyYXlJbm5lclRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGFycmF5SW5uZXJUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfSAvLyBzd2l0Y2hcblxuICAgIGlmIChsYXllclZhbHVlICE9PSB1bmRlZmluZWQgJiYgbGF5ZXJWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKSB7XG4gICAgICAgIGxheWVyVmFsdWUgPSBwcm9jZXNzRm9ybWF0dGVyKGxheWVyVmFsdWUsIHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKTtcbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKHNlYXJjaEVsZW1lbnQubmFtZSwgbGF5ZXJWYWx1ZSk7XG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuXG4gICAgICAvLyBtYXJrIGV4Y2x1c2l2ZSBlbGVtZW50cyBhcyBmb3VuZFxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUpICYmIHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBleGNsdXNpdmVFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmluY2x1ZGVzKGV4Y2x1c2l2ZUVsZW1lbnQubmFtZSkpIHtcbiAgICAgICAgICAgIGV4Y2x1c2l2ZUVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcInNlYXJjaE9iaiBlcnJvcjogXCIgKyBlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBwYXJzZVNlYXJjaFBhdGhzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkb21TdGF0dXMgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICAvLyBjaGVjayBpZiBkb2N1bWVudCBhbmQgZG9tIGlzIGxvYWRlZCBhbmQgcmVhZHkgZm9yIHNjcmFwcGluZ1xuICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBpbml0aWFsaXplZCB3aXRoIGRvbSBzdGF0dXM6ICBcIiArIGRvbVN0YXR1cyk7XG5cbiAgY29uc3Qgd2ludG9wID0gd2luZG93LnRvcDtcbiAgY29uc3QgZGF0YUxheWVyID0gd2ludG9wLmRhdGFMYXllcjtcbiAgY29uc3Qgd2luZG9jID0gd2ludG9wLmRvY3VtZW50O1xuICBsZXQgc29yZ0FycmF5SW5uZXI7XG5cbiAgY29uc3QgZm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3QgcHJldkZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG5vdEZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG5cbiAgLy8gUGFnZVR5cGUgY2FuIGJlIGluZmVycmVkIGZyb20gVVJMLCBpZiBmb3VuZCB1c2UgaXQgZnJvbSB0aGVyZVxuICBsZXQgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuXG4gIGlmIChjdXJyZW50UGFnZVR5cGUpIHtcbiAgICBwcmV2Rm91bmROYW1lcy5hZGQoXCJQYWdlVHlwZVwiKTtcbiAgfVxuXG4gIC8vIExvb3AgdGhyb3VnaCBzZWFyY2ggbGlzdHMgYW5kIG1hcmsgZm91bmQgbmFtZXNcbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcHJldkZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoZm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSB8fCBwcmV2Rm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSkge1xuICAgICAgLy8gaGFkIGFscmVhZHkgZm91bmQgdGhpcyBlbGVtZW50IG9uIGFub3RoZXIgcGFyc2UgaXRlbVxuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kICE9PSBcIipcIikge1xuICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuICAgICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQuaW5kZXhPZihjdXJyZW50UGFnZVR5cGUpIDwgMCkge1xuICAgICAgICAvLyBza2lwIHNlYXJjaEVsZW1lbnQgYmVjYXVzZSBvZiBQYWdlVHlwZURlcGVuZFxuICAgICAgICBzZWFyY2hFbGVtZW50LmlzSWdub3JlID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIlNpbmdsZVdUXCIpIHsgLy8gU0NBTiBXaW5kb3cgZm9yIFNpbmdsZSBFbGVtZW50c1xuICAgICAgc2VhcmNoQW5kU2V0KHdpbnRvcCwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJHQURhdGFMYXllclwiKSB7IC8vIFNDQU4gR0EgREFUQSBMQVlFUlxuICAgICAgZm9yIChjb25zdCBkYXRhTGF5ZXJJdGVtIG9mIGRhdGFMYXllcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoZGF0YUxheWVySXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NTb3JnXCIpIHsgLy8gU0NBTiBTT1JHIEFSUkFZXG4gICAgICBpZiAoIXNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNvcmdBcnJheUlubmVyID0gZ2V0U09SR0FycmF5KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHNvcmdJdGVtIG9mIHNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChzb3JnSXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NRdWVyeVwiKSB7IC8vIFNDQU4gRE9DVU1FTlRcbiAgICAgIHNlYXJjaEFuZFNldCh3aW5kb2MsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gLy8gRE9DUVVFUlkgcGFyc2VcbiAgfVxuXG4gIGlmIChub3RGb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGZvdW5kIGFsbCBlbGVtZW50cyAtIHNldHRpbmcgcmV0cnkgdG8gbWF4XCIpO1xuICB9IGVsc2UgaWYgKGZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIC8vIHVwZGF0ZSByZXRyeSBjb3VudGVyIGFuZCBkZWxheSBvbmx5IGlmIGRvbSBpcyBhY3RpdmVcbiAgICBpZiAoZG9tU3RhdHVzID09PSBcImNvbXBsZXRlXCIgfHwgZG9tU3RhdHVzID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSAqPSAyO1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICs9IDE7XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkIGJ1dCBub3QgZm91bmQgYW55LCBzZXR0aW5nIGRlbGF5IGFuZCByZXRyeSB0byBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIiBhbmQgXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICsgXCIgZm9yIG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdXCIsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQ6IG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdIGFuZCBmb3VuZCBcIiArXG4gICAgICBmb3VuZE5hbWVzLnNpemUsXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoQW5kU2V0ID0gKG9iaiwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcykgPT4ge1xuICBpZiAoc2VhcmNoT2JqKG9iaiwgc2VhcmNoRWxlbWVudCkpIHtcbiAgICBmb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH1cbn07XG5cbi8vIHBhcnNlIHNvdXJjZVxuZXhwb3J0IGNvbnN0IHN0YXJ0SW5mb0xheWVyU2NhbiA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHN0YXJ0SW5mb0xheWVyU2NhbigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH1cbn07XG5cbi8vIEV4dHJhY3QgdmFsdWUgZnJvbSBqc29uIG9iamVjdCB1c2luZyBnaXZlbiBwYXRoXG4vLyBJZiBhbiBlbGVtZW50IGlzICosIGNvbmNhdGVuYXRlIHJlY3Vyc2l2ZWx5IGFsbCBzdWItcGF0aCB2YWx1ZXMgYXMgc3RyaW5nXG5jb25zdCBqc29uR2V0ID0gKG9iaiwgcGF0aCkgPT4ge1xuICBpZiAoIW9iaikgcmV0dXJuIG51bGw7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHBhdGhBcnJheVtpXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aCA9IHBhdGhBcnJheS5zbGljZShpICsgMSkuam9pbihcIi5cIik7XG4gICAgICAgIGNvbnN0IHN1YkFycmF5ID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFtzdWJLZXldICE9PSB1bmRlZmluZWQgJiYgY3VycmVudFtzdWJLZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWYWx1ZSA9IGpzb25HZXQoY3VycmVudFtzdWJLZXldLCBzdWJQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdWJWYWx1ZSAhPT0gbnVsbCAmJiBzdWJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN1YkFycmF5LnB1c2goc3ViVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViQXJyYXk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoQXJyYXlbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZCZWFjb25cIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBCZWFjb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGJlYWNvbiBzZW5kZXJcIik7XG5cbiAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IG51bGw7XG5cbiAgICB0aGlzLmluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIFNlbmQgaW5pdGlhbCBsb2cgYm9keSBhbmQgaW5jcmVtZW50YWwgdXBkYXRlIGxvZ3Mgb24gY2xvc2VcbiAgYXN5bmMgaGFuZGxlQ2xvc2VFdmVudCgpIHtcbiAgICAvLyBpZiBpbml0aWFsIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHNlbmQgdXBkYXRlcyBhbmQgaW5mb2xheWVyIGluIG9uZSBiYXRjaFxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIC8vIGlmIG1haW4gbG9nIGhhcyBiZWVuIHNlbnQsIHNlbmQgaW5jcmVtZW50YWwgdXBkYXRlcyBvbmx5XG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpO1xuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlTWFpbkxvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlTWFpbkxvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXF1ZXN0IGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCkge1xuICAgIGlmICghdGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc1VwZGF0ZXNTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHRoZXJlIGlzIG5vIGluY3JlbWVudGFsIHlldFxuICAgICAgLy8gb3IgaWYgdGhlIHVwZGF0ZXMgaGF2ZSBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNDaGFuZ2VkID0gYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZ3MgY2hhbmdlIHN0YXR1czogXCIsIGhhc0NoYW5nZWQpO1xuICAgIGlmICghaGFzQ2hhbmdlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nRGF0YSA9IGF3YWl0IHRoaXMucGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpO1xuICAgIGlmIChsb2dEYXRhKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2VuZGluZyBpbmNyZW1lbnRhbCBsb2dzXCIsIGxvZ0RhdGEpO1xuICAgICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhsb2dEYXRhKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVBcnJpdmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIG9yIGFycml2YWwgbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZUFycml2YWxMb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpIHtcbiAgICBjb25zdCBod20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19od21cIik7XG4gICAgaWYgKHRoaXMuaGlnaFdhdGVyTWFyayAhPT0gaHdtKSB7XG4gICAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod207XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUFycml2YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFt1cmwsIGhhc2gsIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDAsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgdTogdXJsLFxuICAgICAgb25IYXNoUGN0OiBoYXNoLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZU1haW5Mb2dEYXRhKCkge1xuICAgIGNvbnN0IGJvZHkgPSB7fTtcbiAgICBpZiAoIXdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSkge1xuICAgICAgaWYgKCFrZXkuc3RhcnRzV2l0aChcIl9cIikgJiYgdmFsdWUgIT09IG51bGwpIGJvZHlba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBib2R5LmxjID0gMTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW2EsIGUsIGYsIHMsIG0sIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJmXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwibVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAyLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIGEsIGUsIGYsIHMsIG0sXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGV4aXQgZXZlbnQgbGlzdGVuZXJcIik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIGJlZm9yZXVubG9hZCBldmVudFwiKTtcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIHBhZ2VoaWRlIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICAvLyBJZiBwYWdlIGlzIG5vdCB2aXNpYmxlIGFuZCBkb2Vzbid0IGJlY29tZSB2aXNpYmxlIHdpdGhpbiAzMCBzZWNvbmRzLCBzZW5kIGxvZ3NcbiAgICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW4gdGltZW91dFwiKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICAgICAgfSwgMzAwMDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBDbGVhciB0aW1lb3V0IHdoZW4gcGFnZSBpcyB2aXNpYmxlIHRvIG1ha2Ugc3VyZSB3ZSBzZW5kIHRoZSBsYXRlc3QgbG9ncyBwb3NzaWJsZVxuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICB9XG5cbiAgcXVldWVMb2dzKGxvZ0RhdGEpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5zZW5kQmVhY29uIHx8IHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmZXRjaChMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICBjb25zdCBxdWV1ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCFxdWV1ZWQpIHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBxdWV1ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgICBpZiAocXVldWVkKSByZXR1cm47XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgaWYgKCFxdWV1ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3Mgbm90IHF1ZXVlZFwiKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCZWFjb247XG4iLCJpbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlJlcGxhY2VVdGlsc1wiKTtcblxuY29uc3QgcmVwbGFjZXIgPSBhc3luYyAodmFsdWUsIHJlcGxhY2VGbikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IFtpLCB2YWxdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY3VycmVudFJlcGxhY2VGbiA9IEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSA/IHJlcGxhY2VGbltpXSA6IHJlcGxhY2VGbiB8fCBcIlwiO1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKGN1cnJlbnRSZXBsYWNlRm4pO1xuICAgICAgICB2YWx1ZVtpXSA9IHJlcGxhY2VBbGwodmFsLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlW2ldID0gcmVwbGFjZUZuRXhlY3V0b3IoY3VycmVudFJlcGxhY2VGbiwgdmFsKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pKSB7XG4gICAgZm9yIChjb25zdCByRm4gb2YgcmVwbGFjZUZuKSB7XG4gICAgICBpZiAodHlwZW9mIHJGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyRm4pO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJGbiwgdmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKTtcbiAgICAgIHZhbHVlID0gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlLCBzaW5nbGUgPSBmYWxzZSkge1xuICBpZiAocmVwbGFjZUZuICYmIHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikpIHtcbiAgICBsb2dnZXIubG9nKFwiRXhlY3V0aW5nIHJlcGxhY2UgZnVuY3Rpb246IFwiLCByZXBsYWNlRm4pO1xuICAgIGNvbnN0IHJlcGxhY2VGdW5jdGlvbiA9IEZ1bmN0aW9uKHJlcGxhY2VGbik7XG4gICAgaWYgKHNpbmdsZSkgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gICAgcmV0dXJuIHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pIHtcbiAgY29uc3Qge3N0b3JhZ2UsIGtleSwga2V5RmFsbGJhY2ssIHR5cGV9ID0gcmVwbGFjZUZuO1xuICBzd2l0Y2ggKHN0b3JhZ2UpIHtcbiAgICBjYXNlIFwic2Vzc2lvblwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IG51bGw7XG4gICAgICByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleUZhbGxiYWNrKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IEpTT04ucGFyc2UocmVwbGFjZVZhbCk7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IHJlcGxhY2VWYWxbcmVwbGFjZVZhbC5sZW5ndGggLSAxXVt0eXBlXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGQgbm90IHBhcnNlICR7cmVwbGFjZVZhbH1gKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICAgIGNhc2UgXCJpbmZvLWxheWVyXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXlGYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZXI7XG4iLCJjb25zdCBpbnN0YW5jZU9mQW55ID0gKG9iamVjdCwgY29uc3RydWN0b3JzKSA9PiBjb25zdHJ1Y3RvcnMuc29tZSgoYykgPT4gb2JqZWN0IGluc3RhbmNlb2YgYyk7XG5cbmxldCBpZGJQcm94eWFibGVUeXBlcztcbmxldCBjdXJzb3JBZHZhbmNlTWV0aG9kcztcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxuZnVuY3Rpb24gZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSB7XG4gICAgcmV0dXJuIChpZGJQcm94eWFibGVUeXBlcyB8fFxuICAgICAgICAoaWRiUHJveHlhYmxlVHlwZXMgPSBbXG4gICAgICAgICAgICBJREJEYXRhYmFzZSxcbiAgICAgICAgICAgIElEQk9iamVjdFN0b3JlLFxuICAgICAgICAgICAgSURCSW5kZXgsXG4gICAgICAgICAgICBJREJDdXJzb3IsXG4gICAgICAgICAgICBJREJUcmFuc2FjdGlvbixcbiAgICAgICAgXSkpO1xufVxuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpIHtcbiAgICByZXR1cm4gKGN1cnNvckFkdmFuY2VNZXRob2RzIHx8XG4gICAgICAgIChjdXJzb3JBZHZhbmNlTWV0aG9kcyA9IFtcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuYWR2YW5jZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWUsXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlUHJpbWFyeUtleSxcbiAgICAgICAgXSkpO1xufVxuY29uc3QgY3Vyc29yUmVxdWVzdE1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvbkRvbmVNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5mdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUod3JhcChyZXF1ZXN0LnJlc3VsdCkpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICB9KTtcbiAgICBwcm9taXNlXG4gICAgICAgIC50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAvLyBTaW5jZSBjdXJzb3JpbmcgcmV1c2VzIHRoZSBJREJSZXF1ZXN0ICgqc2lnaCopLCB3ZSBjYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsXG4gICAgICAgIC8vIChzZWUgd3JhcEZ1bmN0aW9uKS5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCQ3Vyc29yKSB7XG4gICAgICAgICAgICBjdXJzb3JSZXF1ZXN0TWFwLnNldCh2YWx1ZSwgcmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2F0Y2hpbmcgdG8gYXZvaWQgXCJVbmNhdWdodCBQcm9taXNlIGV4Y2VwdGlvbnNcIlxuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xuICAgIC8vIFRoaXMgbWFwcGluZyBleGlzdHMgaW4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGJ1dCBkb2Vzbid0IGRvZXNuJ3QgZXhpc3QgaW4gdHJhbnNmb3JtQ2FjaGUuIFRoaXNcbiAgICAvLyBpcyBiZWNhdXNlIHdlIGNyZWF0ZSBtYW55IHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdC5cbiAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KHByb21pc2UsIHJlcXVlc3QpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHR4KSB7XG4gICAgLy8gRWFybHkgYmFpbCBpZiB3ZSd2ZSBhbHJlYWR5IGNyZWF0ZWQgYSBkb25lIHByb21pc2UgZm9yIHRoaXMgdHJhbnNhY3Rpb24uXG4gICAgaWYgKHRyYW5zYWN0aW9uRG9uZU1hcC5oYXModHgpKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgZG9uZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QodHguZXJyb3IgfHwgbmV3IERPTUV4Y2VwdGlvbignQWJvcnRFcnJvcicsICdBYm9ydEVycm9yJykpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICB9KTtcbiAgICAvLyBDYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgIHRyYW5zYWN0aW9uRG9uZU1hcC5zZXQodHgsIGRvbmUpO1xufVxubGV0IGlkYlByb3h5VHJhcHMgPSB7XG4gICAgZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBTcGVjaWFsIGhhbmRsaW5nIGZvciB0cmFuc2FjdGlvbi5kb25lLlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkb25lJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb25Eb25lTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgLy8gUG9seWZpbGwgZm9yIG9iamVjdFN0b3JlTmFtZXMgYmVjYXVzZSBvZiBFZGdlLlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdvYmplY3RTdG9yZU5hbWVzJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQub2JqZWN0U3RvcmVOYW1lcyB8fCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYWtlIHR4LnN0b3JlIHJldHVybiB0aGUgb25seSBzdG9yZSBpbiB0aGUgdHJhbnNhY3Rpb24sIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbWFueS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnc3RvcmUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgOiByZWNlaXZlci5vYmplY3RTdG9yZShyZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFbHNlIHRyYW5zZm9ybSB3aGF0ZXZlciB3ZSBnZXQgYmFjay5cbiAgICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0W3Byb3BdKTtcbiAgICB9LFxuICAgIHNldCh0YXJnZXQsIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uICYmXG4gICAgICAgICAgICAocHJvcCA9PT0gJ2RvbmUnIHx8IHByb3AgPT09ICdzdG9yZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQ7XG4gICAgfSxcbn07XG5mdW5jdGlvbiByZXBsYWNlVHJhcHMoY2FsbGJhY2spIHtcbiAgICBpZGJQcm94eVRyYXBzID0gY2FsbGJhY2soaWRiUHJveHlUcmFwcyk7XG59XG5mdW5jdGlvbiB3cmFwRnVuY3Rpb24oZnVuYykge1xuICAgIC8vIER1ZSB0byBleHBlY3RlZCBvYmplY3QgZXF1YWxpdHkgKHdoaWNoIGlzIGVuZm9yY2VkIGJ5IHRoZSBjYWNoaW5nIGluIGB3cmFwYCksIHdlXG4gICAgLy8gb25seSBjcmVhdGUgb25lIG5ldyBmdW5jIHBlciBmdW5jLlxuICAgIC8vIEVkZ2UgZG9lc24ndCBzdXBwb3J0IG9iamVjdFN0b3JlTmFtZXMgKGJvb28pLCBzbyB3ZSBwb2x5ZmlsbCBpdCBoZXJlLlxuICAgIGlmIChmdW5jID09PSBJREJEYXRhYmFzZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gJiZcbiAgICAgICAgISgnb2JqZWN0U3RvcmVOYW1lcycgaW4gSURCVHJhbnNhY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0b3JlTmFtZXMsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZnVuYy5jYWxsKHVud3JhcCh0aGlzKSwgc3RvcmVOYW1lcywgLi4uYXJncyk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuc2V0KHR4LCBzdG9yZU5hbWVzLnNvcnQgPyBzdG9yZU5hbWVzLnNvcnQoKSA6IFtzdG9yZU5hbWVzXSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh0eCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIEN1cnNvciBtZXRob2RzIGFyZSBzcGVjaWFsLCBhcyB0aGUgYmVoYXZpb3VyIGlzIGEgbGl0dGxlIG1vcmUgZGlmZmVyZW50IHRvIHN0YW5kYXJkIElEQi4gSW5cbiAgICAvLyBJREIsIHlvdSBhZHZhbmNlIHRoZSBjdXJzb3IgYW5kIHdhaXQgZm9yIGEgbmV3ICdzdWNjZXNzJyBvbiB0aGUgSURCUmVxdWVzdCB0aGF0IGdhdmUgeW91IHRoZVxuICAgIC8vIGN1cnNvci4gSXQncyBraW5kYSBsaWtlIGEgcHJvbWlzZSB0aGF0IGNhbiByZXNvbHZlIHdpdGggbWFueSB2YWx1ZXMuIFRoYXQgZG9lc24ndCBtYWtlIHNlbnNlXG4gICAgLy8gd2l0aCByZWFsIHByb21pc2VzLCBzbyBlYWNoIGFkdmFuY2UgbWV0aG9kcyByZXR1cm5zIGEgbmV3IHByb21pc2UgZm9yIHRoZSBjdXJzb3Igb2JqZWN0LCBvclxuICAgIC8vIHVuZGVmaW5lZCBpZiB0aGUgZW5kIG9mIHRoZSBjdXJzb3IgaGFzIGJlZW4gcmVhY2hlZC5cbiAgICBpZiAoZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKS5pbmNsdWRlcyhmdW5jKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICAgICAgICBmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChjdXJzb3JSZXF1ZXN0TWFwLmdldCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXG4gICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICAgIHJldHVybiB3cmFwKGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICByZXR1cm4gd3JhcEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAvLyBUaGlzIGRvZXNuJ3QgcmV0dXJuLCBpdCBqdXN0IGNyZWF0ZXMgYSAnZG9uZScgcHJvbWlzZSBmb3IgdGhlIHRyYW5zYWN0aW9uLFxuICAgIC8vIHdoaWNoIGlzIGxhdGVyIHJldHVybmVkIGZvciB0cmFuc2FjdGlvbi5kb25lIChzZWUgaWRiT2JqZWN0SGFuZGxlcikuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pXG4gICAgICAgIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih2YWx1ZSk7XG4gICAgaWYgKGluc3RhbmNlT2ZBbnkodmFsdWUsIGdldElkYlByb3h5YWJsZVR5cGVzKCkpKVxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHZhbHVlLCBpZGJQcm94eVRyYXBzKTtcbiAgICAvLyBSZXR1cm4gdGhlIHNhbWUgdmFsdWUgYmFjayBpZiB3ZSdyZSBub3QgZ29pbmcgdG8gdHJhbnNmb3JtIGl0LlxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHdyYXAodmFsdWUpIHtcbiAgICAvLyBXZSBzb21ldGltZXMgZ2VuZXJhdGUgbXVsdGlwbGUgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0IChlZyB3aGVuIGN1cnNvcmluZyksIGJlY2F1c2VcbiAgICAvLyBJREIgaXMgd2VpcmQgYW5kIGEgc2luZ2xlIElEQlJlcXVlc3QgY2FuIHlpZWxkIG1hbnkgcmVzcG9uc2VzLCBzbyB0aGVzZSBjYW4ndCBiZSBjYWNoZWQuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCUmVxdWVzdClcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QodmFsdWUpO1xuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgdHJhbnNmb3JtZWQgdGhpcyB2YWx1ZSBiZWZvcmUsIHJldXNlIHRoZSB0cmFuc2Zvcm1lZCB2YWx1ZS5cbiAgICAvLyBUaGlzIGlzIGZhc3RlciwgYnV0IGl0IGFsc28gcHJvdmlkZXMgb2JqZWN0IGVxdWFsaXR5LlxuICAgIGlmICh0cmFuc2Zvcm1DYWNoZS5oYXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpO1xuICAgIC8vIE5vdCBhbGwgdHlwZXMgYXJlIHRyYW5zZm9ybWVkLlxuICAgIC8vIFRoZXNlIG1heSBiZSBwcmltaXRpdmUgdHlwZXMsIHNvIHRoZXkgY2FuJ3QgYmUgV2Vha01hcCBrZXlzLlxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdHJhbnNmb3JtQ2FjaGUuc2V0KHZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQobmV3VmFsdWUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuY29uc3QgdW53cmFwID0gKHZhbHVlKSA9PiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcblxuZXhwb3J0IHsgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGFzIGEsIGluc3RhbmNlT2ZBbnkgYXMgaSwgcmVwbGFjZVRyYXBzIGFzIHIsIHVud3JhcCBhcyB1LCB3cmFwIGFzIHcgfTtcbiIsImltcG9ydCB7IHcgYXMgd3JhcCwgciBhcyByZXBsYWNlVHJhcHMgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcbmV4cG9ydCB7IHUgYXMgdW53cmFwLCB3IGFzIHdyYXAgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcblxuLyoqXG4gKiBPcGVuIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKiBAcGFyYW0gdmVyc2lvbiBTY2hlbWEgdmVyc2lvbi5cbiAqIEBwYXJhbSBjYWxsYmFja3MgQWRkaXRpb25hbCBjYWxsYmFja3MuXG4gKi9cbmZ1bmN0aW9uIG9wZW5EQihuYW1lLCB2ZXJzaW9uLCB7IGJsb2NrZWQsIHVwZ3JhZGUsIGJsb2NraW5nLCB0ZXJtaW5hdGVkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICBjb25zdCBvcGVuUHJvbWlzZSA9IHdyYXAocmVxdWVzdCk7XG4gICAgaWYgKHVwZ3JhZGUpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCd1cGdyYWRlbmVlZGVkJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB1cGdyYWRlKHdyYXAocmVxdWVzdC5yZXN1bHQpLCBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCB3cmFwKHJlcXVlc3QudHJhbnNhY3Rpb24pLCBldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoZXZlbnQpID0+IGJsb2NrZWQoXG4gICAgICAgIC8vIENhc3RpbmcgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC1ET00tbGliLWdlbmVyYXRvci9wdWxsLzE0MDVcbiAgICAgICAgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgZXZlbnQpKTtcbiAgICB9XG4gICAgb3BlblByb21pc2VcbiAgICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGlmICh0ZXJtaW5hdGVkKVxuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB0ZXJtaW5hdGVkKCkpO1xuICAgICAgICBpZiAoYmxvY2tpbmcpIHtcbiAgICAgICAgICAgIGRiLmFkZEV2ZW50TGlzdGVuZXIoJ3ZlcnNpb25jaGFuZ2UnLCAoZXZlbnQpID0+IGJsb2NraW5nKGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIGV2ZW50KSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICByZXR1cm4gb3BlblByb21pc2U7XG59XG4vKipcbiAqIERlbGV0ZSBhIGRhdGFiYXNlLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxuICovXG5mdW5jdGlvbiBkZWxldGVEQihuYW1lLCB7IGJsb2NrZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKTtcbiAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoZXZlbnQpID0+IGJsb2NrZWQoXG4gICAgICAgIC8vIENhc3RpbmcgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC1ET00tbGliLWdlbmVyYXRvci9wdWxsLzE0MDVcbiAgICAgICAgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xufVxuXG5jb25zdCByZWFkTWV0aG9kcyA9IFsnZ2V0JywgJ2dldEtleScsICdnZXRBbGwnLCAnZ2V0QWxsS2V5cycsICdjb3VudCddO1xuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHtcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxuICAgICAgICB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApKVxuICAgICAgICByZXR1cm4gY2FjaGVkTWV0aG9kcy5nZXQocHJvcCk7XG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XG4gICAgY29uc3QgdXNlSW5kZXggPSBwcm9wICE9PSB0YXJnZXRGdW5jTmFtZTtcbiAgICBjb25zdCBpc1dyaXRlID0gd3JpdGVNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKTtcbiAgICBpZiAoXG4gICAgLy8gQmFpbCBpZiB0aGUgdGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHRhcmdldC4gRWcsIGdldEFsbCBpc24ndCBpbiBFZGdlLlxuICAgICEodGFyZ2V0RnVuY05hbWUgaW4gKHVzZUluZGV4ID8gSURCSW5kZXggOiBJREJPYmplY3RTdG9yZSkucHJvdG90eXBlKSB8fFxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIChzdG9yZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogdW5kZWZpbmVkIGd6aXBwcyBiZXR0ZXIsIGJ1dCBmYWlscyBpbiBFZGdlIDooXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdHguc3RvcmU7XG4gICAgICAgIGlmICh1c2VJbmRleClcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xuICAgICAgICAvLyBNdXN0IHJlamVjdCBpZiBvcCByZWplY3RzLlxuICAgICAgICAvLyBJZiBpdCdzIGEgd3JpdGUgb3BlcmF0aW9uLCBtdXN0IHJlamVjdCBpZiB0eC5kb25lIHJlamVjdHMuXG4gICAgICAgIC8vIE11c3QgcmVqZWN0IHdpdGggb3AgcmVqZWN0aW9uIGZpcnN0LlxuICAgICAgICAvLyBNdXN0IHJlc29sdmUgd2l0aCBvcCB2YWx1ZS5cbiAgICAgICAgLy8gTXVzdCBoYW5kbGUgYm90aCBwcm9taXNlcyAobm8gdW5oYW5kbGVkIHJlamVjdGlvbnMpXG4gICAgICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGFyZ2V0W3RhcmdldEZ1bmNOYW1lXSguLi5hcmdzKSxcbiAgICAgICAgICAgIGlzV3JpdGUgJiYgdHguZG9uZSxcbiAgICAgICAgXSkpWzBdO1xuICAgIH07XG4gICAgY2FjaGVkTWV0aG9kcy5zZXQocHJvcCwgbWV0aG9kKTtcbiAgICByZXR1cm4gbWV0aG9kO1xufVxucmVwbGFjZVRyYXBzKChvbGRUcmFwcykgPT4gKHtcbiAgICAuLi5vbGRUcmFwcyxcbiAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXG4gICAgaGFzOiAodGFyZ2V0LCBwcm9wKSA9PiAhIWdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApLFxufSkpO1xuXG5leHBvcnQgeyBkZWxldGVEQiwgb3BlbkRCIH07XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVfY2FjaGVcIixcbiAgdmVyc2lvbjogMSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImluZm9DYWNoZVwiLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJpeF9za3VcIixcbiAgICAgICAgZmllbGRzOiBcInNrdVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcInNrdVwifSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJcbmltcG9ydCB7b3BlbkRCfSBmcm9tIFwiaWRiXCI7XG5pbXBvcnQge2ZldGNoUHJvZHVjdEluZm99IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllciwgZ2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeVwiKTtcbmNsYXNzIEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBhc3luYyBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IHtkYk5hbWUsIHZlcnNpb259ID0gY29uZmlnO1xuICAgIGNvbnN0IGRiID0gYXdhaXQgb3BlbkRCKGRiTmFtZSwgdmVyc2lvbiwge1xuICAgICAgdXBncmFkZShkYiwgb2xkVmVyc2lvbikge1xuICAgICAgICBzd2l0Y2ggKG9sZFZlcnNpb24pIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBkYi5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuaW5kZXhlZERCID0gZGI7XG4gIH1cblxuICBhc3luYyBnZXREQigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUodGhpcy5pbmRleGVkREIpO1xuICAgICAgICB9XG4gICAgICB9LCAyNSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQcm9kdWN0IGluZm8gZGIgbm90IGluaXRpYWxpemVkIHdpdGhpbiB0aGUgYWxsb3R0ZWQgdGltZVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDMwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0U3RvcmUocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICByZXR1cm4gZGIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIHJlYWR3cml0ZSA/IFwicmVhZHdyaXRlXCIgOiBcInJlYWRvbmx5XCIpLnN0b3JlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShwYXlsb2FkKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmdldFN0b3JlKHRydWUpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICBjb25zdCBzYXZlUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgbG9hZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgIGxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICBzYXZlUHJvbWlzZXMucHVzaChzdG9yZS5wdXQobG9hZCkpO1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoc2F2ZVByb21pc2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF5bG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICBhd2FpdCBzdG9yZS5wdXQocGF5bG9hZCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xlYXIoKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmdldFN0b3JlKHRydWUpO1xuICAgIGF3YWl0IHN0b3JlLmNsZWFyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHNrdSkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmdldChjb25maWcuc3RvcmUubmFtZSwgc2t1KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYXN5bmMgY291bnQoKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGIuY291bnQoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBnZXRDdXJzb3IoKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgY3Vyc29yID0gYXdhaXQgZGIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUpLnN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICByZXR1cm4gY3Vyc29yO1xuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBpbmZvLWNoZWNrLWV4aXN0aW5nXCIpO1xuICAgIGxldCBjbGVhclByb21pc2UgPSBudWxsO1xuICAgIGNvbnN0IGV4aXN0aW5nUHJvZEluZm8gPSBhd2FpdCB0aGlzLmNvdW50KCk7XG4gICAgaWYgKGV4aXN0aW5nUHJvZEluZm8pIHtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gZm91bmRcIik7XG4gICAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCB0aGlzLmdldEN1cnNvcigpO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gY3Vyc29yLnZhbHVlLnRpbWVzdGFtcDtcbiAgICAgIGNvbnN0IGVsYXBzZWRTZWNvbmRzID0gKERhdGUubm93KCkgLyAxMDAwKSAtIHRpbWVzdGFtcDtcbiAgICAgIC8vIFJlLWZldGNoIHByb2R1Y3QgaW5mbyBvbmNlIGEgZGF5XG4gICAgICBpZiAoZWxhcHNlZFNlY29uZHMgPCA4NjQwMCkgcmV0dXJuO1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBpcyBleHBpcmVkXCIpO1xuICAgICAgY2xlYXJQcm9taXNlID0gdGhpcy5jbGVhcigpO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwaW5mby1mZXRjaFwiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb1Byb21pc2UgPSBmZXRjaFByb2R1Y3RJbmZvKCk7XG4gICAgY29uc3QgW3Byb2R1Y3RJbmZvQXJyYXldID0gYXdhaXQgUHJvbWlzZS5hbGwoW3Byb2R1Y3RJbmZvUHJvbWlzZSwgY2xlYXJQcm9taXNlXSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mb0FycmF5IHx8ICFwcm9kdWN0SW5mb0FycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBpbmZvLXByZXNhdmVcIik7XG4gICAgYXdhaXQgdGhpcy5zYXZlKHRoaXMucHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwaW5mby1zYXZlZFwiKTtcbiAgfVxuXG4gIHByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgY29uc3QgcGF5bG9hZHMgPSBbXTtcbiAgICBjb25zdCBmaWVsZE5hbWVzID0gcHJvZHVjdEluZm9BcnJheS5zaGlmdCgpO1xuICAgIGZpZWxkTmFtZXMuc2hpZnQoKTtcbiAgICBmb3IgKGNvbnN0IGluZm8gb2YgcHJvZHVjdEluZm9BcnJheSkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHtza3U6IGluZm8uc2hpZnQoKX07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF5bG9hZFtmaWVsZE5hbWVzW2ldXSA9IGluZm9baV0gfHwgbnVsbDtcbiAgICAgIH1cbiAgICAgIHBheWxvYWRzLnB1c2gocGF5bG9hZCk7XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkcztcbiAgfVxuXG4gIGFzeW5jIGNoZWNrSW5pdGlhbGl6ZWQoY2FsbGJhY2spIHtcbiAgICBsZXQgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICBsZXQgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpIHx8XG4gICAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gICAgaWYgKGV4aXN0aW5nUHJvZEluZm8gJiYgc2t1TGlzdCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByb2R1Y3RJbmZvVGltZW91dCA9IG51bGw7XG4gICAgY29uc3QgcHJvZHVjdEluZm9JbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIGV4aXN0aW5nUHJvZEluZm8gPSBhd2FpdCB0aGlzLmNvdW50KCk7XG4gICAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgICBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSkgfHxcbiAgICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICAgICAgaWYgKHNrdUxpc3QpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwocHJvZHVjdEluZm9JbnRlcnZhbCk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHByb2R1Y3RJbmZvVGltZW91dCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMjUpO1xuICAgIHByb2R1Y3RJbmZvVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChwcm9kdWN0SW5mb0ludGVydmFsKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5O1xuIiwiaW1wb3J0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkgZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7aWRiUmVhZHl9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBTdG9yZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnN0YW5jZTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgYXdhaXQgaWRiUmVhZHkoKTtcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSgpO1xuICAgICAgICAvLyBIaWRlIHRoZSBjb25zdHJ1Y3RvciBzbyB0aGUgcmV0dXJuZWQgb2JqZWN0IGNhbid0IGJlIG5ldydkLi4uXG4gICAgICAgIGluc3RhbmNlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuICB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXIsIGdldFVuc2VjdXJlSGFzaH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge3JlcGxhY2VBbGwsIHR1cmtpc2hUb0xvd2VyfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgSURMRV9USU1FT1VUfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgcmVwbGFjZXIgZnJvbSBcIi4vcmVwbGFjZS11dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5hc3luYyBmdW5jdGlvbiBhcHBseUFjdGlvbnMoYWN0aW9ucykge1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlQXBwbHlBY3Rpb25zXCIpO1xuICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUd9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZW1vdmluZzogXCIsIHNlbGVjdG9yKTtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmJlZm9yZSh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZnRlclwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYWZ0ZXI6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hZnRlcih2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhcHBlbmRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwZW5kaW5nIHZhbHVlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vZGFsXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudC5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGVsbSA9PSBlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzcGxheU1vZGFsKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicG9wdXBcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSAhPT0gMCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiUG9wdXAgYWxyZWFkeSBkaXNwbGF5ZWQgaW4gc2Vzc2lvblwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgUG9wdXA6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAocFR5cGUpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZXhpdEludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGV4aXQgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtyLCBkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImRcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBkID09PSBcInN0cmluZ1wiICYmICFyLmluY2x1ZGVzKGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWRsZVRpbWVyKElETEVfVElNRU9VVCwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiY29weUludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGNvcHkgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXBwZW5kIHBvcHVwIHRvIGJvZHkgYWZ0ZXIgdGltZW91dCBleHBpcmVzXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlQb3B1cCgpO1xuICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgVHlwZTogJHt0eXBlfSBub3QgZm91bmQgZm9yIG9wZXJhdG9yOiAke29wZXJhdG9yfWApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGNvbnN0IHNjcmlwdElEID0gZ2V0VW5zZWN1cmVIYXNoKHZhbHVlKTtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNjcmlwdElEKSkge1xuICAgICAgICBsb2dnZXIubG9nKFwiU2NyaXB0IGFscmVhZHkgaW4gcGFnZSFcIik7XG4gICAgICB9IGVsc2UgZWxlbWVudC5hcHBlbmQoYDxzY3JpcHQgaWQ9JHtzY3JpcHRJRH0+JHt2YWx1ZX08L3NjcmlwdD5gKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcIm1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhgTW92aW5nICR7bW92ZV9zZWxlY3Rvcl8xfSB0byAke21vdmVfc2VsZWN0b3JfMn1gKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGRlc3RpbmF0aW9uLnByZXBlbmQoc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInByb2R1Y3RJbmZvTG9va3VwXCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgIGVsZW1lbnQuYmVmb3JlKHJlcyk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJ0ZXh0LXRyYW5zZm9ybVwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNhcGl0YWxpemVcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBBcnJheS5mcm9tKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoZS5pbm5lclRleHQ/LmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpLnNwbGl0KFwiXFxuXCIpLm1hcCgoc2VudGVuY2UpID0+XG4gICAgICAgICAgICAgICAgc2VudGVuY2Uuc3BsaXQoXCIgXCIpLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICApLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dClcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gdGV4dC10cmFuc2Zvcm0gdHlwZVwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJhaS1zdWdnZXN0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGl0bGUtY2hhbmdlXCI6IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0dGluZyB0aXRsZSBzdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCBmaW5hbFRpdGxlID0gYXdhaXQgcHJlcGFyZUZpbmFsVGl0bGUoKTtcbiAgICAgICAgICBpZiAoIWZpbmFsVGl0bGUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgdGl0bGUtY2hhbmdlIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmNvbnRlbnRzKCkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZVR5cGUgPT0gMztcbiAgICAgICAgICB9KVswXS5ub2RlVmFsdWUgPSBmaW5hbFRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGQtZGVzY3JpcHRpb25cIjoge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXR0aW5nIGRlc2NyaXB0aW9uIHN1Z2dlc3Rpb25zXCIpO1xuICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRWxtID0gYXdhaXQgcHJlcGFyZURlc2NFbG0odmFsdWUpO1xuICAgICAgICAgIGlmICghZGVzY3JpcHRpb25FbG0pIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgYWRkLWRlc2NyaXB0aW9uIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmJlZm9yZShkZXNjcmlwdGlvbkVsbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggb3BlcmF0b3IgZXhpc3RzIHlldFwiLCBvcGVyYXRvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHByZXBhcmVEZXNjRWxtID0gYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1KTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvPy5tYXJrZXRpbmdDb3B5KSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBObyBkZXNjcmlwdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWRIdG1sU3RyaW5nID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8ubWFya2V0aW5nQ29weSwgdmFsdWUpO1xuICAgIHJldHVybiB1cGRhdGVkSHRtbFN0cmluZztcbiAgfTtcblxuICBjb25zdCBwcmVwYXJlRmluYWxUaXRsZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3UpO1xuICAgIGlmICghcHJvZHVjdEluZm8/LnRpdGxlQXVnbWVudCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gdGl0bGUgc3VnZ2VzdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IHByb2R1Y3RJbmZvLnRpdGxlQXVnbWVudCArIGAgKCR7c2t1fSlgO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvZHVjdEluZm8gPSBhc3luYyAodHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSkgPT4ge1xuICAgIC8vIGdldCBrZXlzIG9mIHByb2R1Y3RJbmZvXG4gICAgY29uc3Qgc2t1TGlzdCA9IHByb2R1Y3RJbmZvU3RvcmFnZSA9PT0gXCJiYXNrZXRcIiA/XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCIsIHRydWUpIDpcbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGxldCByZXMgPSBudWxsO1xuICAgIGlmICghc2t1TGlzdCB8fCBza3VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHNrdSBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3VMaXN0WzBdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyB0cmFuc2NhdGlvbkluMldlZWtzIFwiLCBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBBZGRUb0NhcnRDb3VudCBcIiwgcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcInByb2R1Y3RWaWV3Q291bnRcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yXCIsIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIm5vIHN1Y2ggdHlwZSBmb3VuZCBmb3IgcHJvZHVjdEluZm9Mb29rdXAgb3BlcmF0b3I6IFwiKyB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlID0gYXN5bmMgKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRUaXRsZXMgPSAhQXJyYXkuaXNBcnJheSh0aXRsZXMpID8gW3RpdGxlc10gOiB0aXRsZXM7XG4gICAgZm9yIChjb25zdCBwYXJzZWRUaXRsZSBvZiBwYXJzZWRUaXRsZXMpIHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gcGFyc2VkVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICBpZiAoaWQgJiYgaWQgPT09IFwibmQtcG9wdXBfX3dyYXBwZXJcIikge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5jb250YWlucyhcIm5kLW1vZGFsX193cmFwcGVyXCIpKSB7XG4gICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UG9wdXAgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgPiAwKSByZXR1cm47XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDEpO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuXG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfSwgMTUwMDApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNb2RhbCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikpIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBvcHVwID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIGlzTW9kYWw9ZmFsc2UpID0+IHtcbiAgICAvLyBDcmVhdGUgcG9wdXAgd3JhcHBlclxuICAgIGNvbnN0IHBvcHVwV3JhcHBlciA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtcG9wdXBfX3dyYXBwZXJcIik7XG4gICAgaWYgKGlzTW9kYWwpIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtbW9kYWxfX3dyYXBwZXJcIik7XG4gICAgaWYgKCFpc01vZGFsKSBwb3B1cFdyYXBwZXIuaWQgPSBcIm5kLXBvcHVwX193cmFwcGVyXCI7XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uU3R5bGUgPSBpc01vZGFsID8gXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlX19jb2xvcmVkXCIgOiBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VcIjtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQocG9wdXBDbG9zZUJ1dHRvblN0eWxlKTtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGlmIChpc01vZGFsKSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudFNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRlbnRTZWxlY3RvcikpO1xuICAgICAgd2hpbGUgKHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikgJiYgY29udGVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCBjb250ZW50cy5zaGlmdCgpLnNyYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGZyb20gYWN0aW9uIGFuZCBhcHBlbmQgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgdGVtcGxhdGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB2YWx1ZS50cmltKCk7XG4gICAgY29uc3QgcG9wdXAgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZUJ1dHRvbik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgIC8vIFJlbW92ZSBvbGQgcG9wdXAgaWYgZXhpc3RzIGJlZm9yZSBhcHBlbmRpbmcgbmV3IG9uZVxuICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dhcE5vZGVzID0gZnVuY3Rpb24gc3dhcE5vZGVzKG4xLCBuMikge1xuICAgIGNvbnN0IHAxID0gbjEucGFyZW50Tm9kZTtcbiAgICBjb25zdCBwMiA9IG4yLnBhcmVudE5vZGU7XG4gICAgbGV0IGkxO1xuICAgIGxldCBpMjtcblxuICAgIGlmICghcDEgfHwgIXAyIHx8IHAxLmlzRXF1YWxOb2RlKG4yKSB8fCBwMi5pc0VxdWFsTm9kZShuMSkpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMS5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMSkpIHtcbiAgICAgICAgaTEgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDIuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjIpKSB7XG4gICAgICAgIGkyID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcbiAgICAgIGkyKys7XG4gICAgfVxuICAgIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcbiAgICBwMi5pbnNlcnRCZWZvcmUobjEsIHAyLmNoaWxkcmVuW2kyXSk7XG4gIH07XG5cbiAgY29uc3Qgd2FpdEZvckpRdWVyeSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghd2luZG93LmpRdWVyeSkge1xuICAgICAgICBsb2dnZXIubG9nKFwialF1ZXJ5IG5vdCBmb3VuZCwgcmV0cnlpbmdcIik7XG4gICAgICAgIGNvbnN0IGpRdWVyeUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWN0aW9uQXBwbGljYXRvciA9IGFzeW5jIChhY3Rpb25zKSA9PiB7XG4gICAgaWYgKGF3YWl0IHdhaXRGb3JKUXVlcnkoKSkge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChhY3Rpb24uZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGFjdGlvbi5lbGlnaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCk7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbik7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXJyb3ItYXBwbHlpbmctYWN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkpxdWVyeSBub3QgZm91bmQgb24gd2luZG93XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8tanF1ZXJ5XCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBBcHBseSBhY3Rpb25zXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFjdGlvbkFwcGxpY2F0b3IoYWN0aW9ucyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZGVmYXVsdCBhcHBseUFjdGlvbnM7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJBY3Rpb25Db25kaXRpb25VdGlsc1wiKTtcblxuY29uc3QgY2hlY2tBY3Rpb25Db25kaXRpb24gPSBhc3luYyAoY29uZGl0aW9uKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBY3Rpb24gY29uZGl0aW9uIGZvdW5kOiBcIiwgY29uZGl0aW9uKTtcbiAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IFtdO1xuICBjb25zdCB7YXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIG9wZXJhdG9yLCBzZWxlY3RvciwgdHlwZSwgdmFsdWUsIGNoYWlufSA9IGNvbmRpdGlvbjtcbiAgY29uc3QgY29uZGl0aW9uRWxlbWVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29uZGl0aW9uRWxlbWVudHMpIHtcbiAgICBpZiAoYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikpIHtcbiAgICAgIGVsaWdpYmxlRWxlbWVudHMucHVzaCgkKGVsZW1lbnQpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsaWdpYmxlRWxlbWVudHM7XG59O1xuXG5jb25zdCBhY3Rpb25Db25kaXRpb25DaGVja2VyID0gYXN5bmMgKGVsZW1lbnQsIHR5cGUsIG9wZXJhdG9yLCBhdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUsIGNoYWluKSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U2t1ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KGVsZW1lbnRTa3UpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAvLyBydW5UaW1lVmFsdWUgbWF5IGJlIDBcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHwgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2FzZSBcImZ1bmN0aW9uXCI6IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZuID0gRnVuY3Rpb24oXCJlbFwiLCBvcGVyYXRvcik7XG4gICAgICAgIHJldHVybiBmbihlbGVtZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgZXhlY3V0aW5nIGZ1bmN0aW9uIGFjdGlvbiBjb25kaXRpb25cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXS5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0ID0gMSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHJlbGVhc2VdID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPD0gMDtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgcmVsZWFzZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcy5mb3JFYWNoKChxdWV1ZSkgPT4gcXVldWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LnJlamVjdCh0aGlzLl9jYW5jZWxFcnJvcikpKTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICB9XG4gICAgX2Rpc3BhdGNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWVFbnRyeSA9IChfYSA9IHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghcXVldWVFbnRyeSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgLT0gd2VpZ2h0O1xuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy5fdmFsdWUgKyAxO1xuICAgICAgICAgICAgcXVldWVFbnRyeS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihwcmV2aW91c1dlaWdodCldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5mb3JFYWNoKCh3YWl0ZXIpID0+IHdhaXRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIE11dGV4IHtcbiAgICBjb25zdHJ1Y3RvcihjYW5jZWxFcnJvcikge1xuICAgICAgICB0aGlzLl9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEsIGNhbmNlbEVycm9yKTtcbiAgICB9XG4gICAgYWNxdWlyZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQxKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgWywgcmVsZWFzZXJdID0geWllbGQgdGhpcy5fc2VtYXBob3JlLmFjcXVpcmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLnJ1bkV4Y2x1c2l2ZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKCk7XG4gICAgfVxuICAgIHJlbGVhc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKSlcbiAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5jYW5jZWwoKTtcbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHdpdGhUaW1lb3V0KHN5bmMsIHRpbWVvdXQsIHRpbWVvdXRFcnJvciA9IEVfVElNRU9VVCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjcXVpcmU6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgc3luYy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCByZWxlYXNlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHRpY2tldFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZSh3ZWlnaHQpIHtcbiAgICAgICAgICAgIHN5bmMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3luYy5jYW5jZWwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FpdEZvclVubG9jazogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3luYy53YWl0Rm9yVW5sb2NrKHdlaWdodCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCh0aW1lb3V0RXJyb3IpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogKCkgPT4gc3luYy5pc0xvY2tlZCgpLFxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4gc3luYy5nZXRWYWx1ZSgpLFxuICAgICAgICBzZXRWYWx1ZTogKHZhbHVlKSA9PiBzeW5jLnNldFZhbHVlKHZhbHVlKSxcbiAgICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpc25lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIHRyeUFjcXVpcmUoc3luYywgYWxyZWFkeUFjcXVpcmVkRXJyb3IgPSBFX0FMUkVBRFlfTE9DS0VEKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gd2l0aFRpbWVvdXQoc3luYywgMCwgYWxyZWFkeUFjcXVpcmVkRXJyb3IpO1xufVxuXG5leHBvcnQgeyBFX0FMUkVBRFlfTE9DS0VELCBFX0NBTkNFTEVELCBFX1RJTUVPVVQsIE11dGV4LCBTZW1hcGhvcmUsIHRyeUFjcXVpcmUsIHdpdGhUaW1lb3V0IH07XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBhcHBseUFjdGlvbnMgZnJvbSBcIi4uL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleFwiO1xuaW1wb3J0IGNoZWNrQWN0aW9uQ29uZGl0aW9uIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsXCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIE1PQklMRV9NRURJQV9RVUVSWSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgcHJlcGFyZUFjdGlvbnMsXG4gIGNoZWNrQWN0aW9uU2VsZWN0b3JzLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZSwgaXNPbiwgaXNDaGFtcH0gPSBib2R5O1xuICAgIHRoaXMuaXNPbiA9IGlzT247XG4gICAgdGhpcy5pc0NoYW1wID0gaXNDaGFtcDtcbiAgICB0aGlzLmVuZ2FnZW1lbnRMb2NrID0ge307XG4gICAgdGhpcy5wYWdlVHlwZSA9IHBhZ2VUeXBlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gZGVidWdNb2RlO1xuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgdGhpcy5yZUFwcGx5VHJlYXRtZW50c01hcCA9IHt9O1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMgPSBbXTtcbiAgICB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5kZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdHMoKSB7XG4gICAgY29uc3Qgcm9ib3RQcm9taXNlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0cmVhdG1lbnQuZGVwZW5kYW50X29uX3RyZWF0bWVudCkgY29udGludWU7XG4gICAgICAgIGlmICh0cmVhdG1lbnQuZGVsYXkpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICB9LCB0cmVhdG1lbnQuZGVsYXkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJvYm90UHJvbWlzZXMucHVzaCh0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGVuZ2FnaW5nIHJvYm90ICR7dHJlYXRtZW50LmlkfTogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHJvYm90UHJvbWlzZXMpO1xuICAgIHRoaXMuaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKTtcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgYWN0aW9ucyxcbiAgICAgIGVsaWdpYmlsaXR5UnVsZVNldCxcbiAgICAgIGRldmljZSxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIGhlbHBlcnMsXG4gICAgICBkZXBlbmRhbnRfb25fdHJlYXRtZW50LFxuICAgICAgbW9kZSxcbiAgICB9ID0gdHJlYXRtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGRlYnVnTW9kZSxcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZW5nYWdlbWVudExvY2ssXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNNb2JpbGUsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIGFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gZW5nYWdlbWVudExvY2tbaWRdIHx8IG5ldyBNdXRleCgpO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBlbmdhZ2VtZW50TG9ja1tpZF0uYWNxdWlyZSgpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbcHJlcGFyZWRBY3Rpb25zLCB2YXJpYW50XSA9IGF3YWl0IHByZXBhcmVBY3Rpb25zKGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuXG4gICAgICAgIGxldCBpc0VsaWdpYmxlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgcHJlcGFyZWRBY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24uY29uZGl0aW9uKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgaWYgKGVsaWdpYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24uZWxpZ2libGVFbGVtZW50cyA9IGVsaWdpYmxlRWxlbWVudHM7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJlbGlnaWJsZVwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgaWYgKCFkZWJ1Z01vZGUgPiAwICYmXG4gICAgICAgICAgKCF0aGlzLmlzT24gfHwgKG1vZGUgPT09IFwibGFiXCIgJiYgdGhpcy5pc0NoYW1wKSB8fCAobW9kZSA9PT0gXCJjaGFtcGlvblwiICYmICF0aGlzLmlzQ2hhbXApKSkgcmV0dXJuO1xuICAgICAgICBhd2FpdCBhcHBseShpZCwgcHJlcGFyZWRBY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDpcIiwgaWQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICByZWxlYXNlKCk7XG4gICAgICB0aGlzLmFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpO1xuICAgICAgdGhpcy5hZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZWxwZXJzKSAmJiBoZWxwZXJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGVscGVyUm9ib3RQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgICAgaWYgKCFoZWxwZXJzLmluY2x1ZGVzKHRyZWF0bWVudC5pZCkpIGNvbnRpbnVlO1xuICAgICAgICBoZWxwZXJSb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGhlbHBlclJvYm90UHJvbWlzZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFwcGx5KGlkLCBwcmVwYXJlZEFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgYWN0aW9uIHNlbGVjdG9ycyBmb3Igcm9ib3QgJHtpZH1gKTtcbiAgICBjb25zdCBjaGVjayA9IGNoZWNrQWN0aW9uU2VsZWN0b3JzKHByZXBhcmVkQWN0aW9ucyk7XG4gICAgaWYgKCFjaGVjaykge1xuICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpO1xuICAgICAgaWYgKGFwcGxpZWQgJiYgYXBwbGllZFtpZF0pIHJldHVybjtcbiAgICAgIGxvZ2dlci5sb2coYEFjdGlvbiBzZWxlY3RvciBjaGVjayBmYWlsZWQgZm9yIHJvYm90ICR7aWR9YCk7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkQWN0aW9ucyk7XG4gICAgaWYgKHJlcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZmFpbGVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIik7XG4gICAgICBpZiAoZmFpbGVkW2lkXSkge1xuICAgICAgICBkZWxldGUgZmFpbGVkW2lkXTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmXCIsIGZhaWxlZCk7XG4gICAgICB9XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImFwcGxpZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgfSBlbHNlIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBjb25zdCBhcHBsaWVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIik7XG4gICAgICBpZiAoYXBwbGllZFtpZF0pIHJldHVybjtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiZmFpbGVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7cGFnZVR5cGUsIHJlQXBwbHlUcmVhdG1lbnRzTWFwfSA9IHRoaXM7XG4gICAgY29uc3Qge2lkLCByZWFwcGx5X2V2ZW50LCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZX0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYXRlUmVhcHBseVJvYm90TWFwKCkge1xuICAgIGNvbnN0IHtyZUFwcGx5VHJlYXRtZW50c01hcCwgbWF0Y2hlZFRyZWF0bWVudHN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZUFwcGx5VHJlYXRtZW50c01hcCkpIHtcbiAgICAgIGNvbnN0IHRyZWF0bWVudElkcyA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW2tleV07XG4gICAgICBjb25zdCByZUFwcGx5VHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigodCkgPT4gdHJlYXRtZW50SWRzLmluY2x1ZGVzKHQuaWQpKTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJpbmZpbml0ZV9zY3JvbGxcIjoge1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbmZpbml0ZV9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0aW1lb3V0XCI6IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSB0aW1lb3V0YCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50X2NoYW5nZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlTZWxlY3Rvckxpc3QgPSBBcnJheS5pc0FycmF5KHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yKSA/XG4gICAgICAgICAgICAgICAgdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IgOiBbdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3JdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiByZWFwcGx5U2VsZWN0b3JMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGVsZW1lbnRfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbl9zY3JvbGxcIjoge1xuICAgICAgICAgIC8vIGFkZCB3aW5kb3cgc2Nyb2xsIGxpc3RlbmVyLCBjYWxsIGVuZ2FnZVJvYm90IG9uIHNjcm9sbCwgZG8gbm90IHRyaWdnZXIgbW9yZSB0aGFuIG9uY2UgcGVyIDI1MG1zXG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IDA7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAobm93IC0gbGFzdFNjcm9sbFRpbWUgPiAyNTAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA+IDUpIHtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gb25fc2Nyb2xsYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJxdWVyeV9zZWFyY2hfY2hhbmdlXCI6IHtcbiAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggIT09IHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gcXVlcnlfc2VhcmNoX2NoYW5nZWApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVydmFsXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoYXBwbGllZD8uW3RyZWF0bWVudC5pZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGludGVydmFsYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb19sYXllcl9jaGFuZ2VcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICAgICAgICAgIGFkZERhdGFMaXN0ZW5lcih0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUmVhcHBseSBldmVudCBub3QgZm91bmQ6IFwiLCBrZXkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVTZXQgPSBbXSwgYnVzaW5lc3NSdWxlU2V0ID0gW10sIGlkfSA9IHRyZWF0bWVudDtcbiAgICBpZiAodGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5pbmNsdWRlcyhpZCkpIHJldHVybjtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMoWy4uLmVsaWdpYmlsaXR5UnVsZVNldCwgLi4uYnVzaW5lc3NSdWxlU2V0XSk7XG4gICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKGBfX2VSdWxlcy4ke3NlbGVjdG9yfWAsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICB9XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5wdXNoKGlkKTtcbiAgfVxuXG4gIGV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZVNldCwgcHJldmlvdXNTZWxlY3RvcnMgPSBudWxsKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gcHJldmlvdXNTZWxlY3RvcnMgfHwgW107XG4gICAgZm9yIChsZXQgcnVsZSBvZiBydWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKHJ1bGUuc3RhcnRzV2l0aChcIiFcIikpIHJ1bGUgPSBydWxlLnNsaWNlKDEpO1xuICAgICAgICBzZWxlY3RvcnMucHVzaChydWxlLnNwbGl0KFwiLlwiKVswXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGUuc2V0LCBzZWxlY3RvcnMpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLihuZXcgU2V0KHNlbGVjdG9ycykpXTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKSB7XG4gICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgZWxpZ2liaWxpdHkgJHtlbGlnaWJpbGl0eVJ1bGV9YCk7XG4gICAgbGV0IG9wcG9zaXRlRmxhZyA9IGZhbHNlO1xuICAgIGxldCBbZWxpZ2liaWxpdHlTY29wZSwgZWxpZ2liaWxpdHlOYW1lXSA9IGVsaWdpYmlsaXR5UnVsZS5zcGxpdChcIi5cIik7XG4gICAgaWYgKGVsaWdpYmlsaXR5U2NvcGUuc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIG9wcG9zaXRlRmxhZyA9IHRydWU7XG4gICAgICBlbGlnaWJpbGl0eVNjb3BlID0gZWxpZ2liaWxpdHlTY29wZS5zbGljZSgxKTtcbiAgICB9XG4gICAgbGV0IHJlcztcbiAgICBpZiAoZWxpZ2liaWxpdHlTY29wZSA9PT0gXCJQYWdlVHlwZVwiKSB7XG4gICAgICByZXMgPSBbYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpXTtcbiAgICB9IGVsc2UgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtlbGlnaWJpbGl0eVNjb3BlfWApO1xuXG4gICAgaWYgKCFyZXMgfHwgIUFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvcHBvc2l0ZUZsYWcgJiYgcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW9wcG9zaXRlRmxhZyAmJiAhcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBsb2dnZXIubG9nKGAke2VsaWdpYmlsaXR5UnVsZX0gaXMgZWxpZ2libGVgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCwgZWxpZ2liaWxpdHlTZXRUeXBlID0gbnVsbCwgcHJldmlvdXNJc0VsaWdpYmxlID0gbnVsbCkge1xuICAgIGxvZ2dlci5sb2coXCJDaGVja2luZyByb2JvdCBlbGlnaWJpbGl0eVwiKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRWxpZ2liaWxpdHkgUnVsZSBTZXQgJHtlbGlnaWJpbGl0eVJ1bGVTZXR9IGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNFbGlnaWJsZSA9IHByZXZpb3VzSXNFbGlnaWJsZTtcbiAgICBmb3IgKGNvbnN0IGVsaWdpYmlsaXR5UnVsZSBvZiBlbGlnaWJpbGl0eVJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgJiYgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVW5rbm93biBlbGlnaWJpbGl0eVNldFR5cGU6IFwiLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZS5zZXQsIGVsaWdpYmlsaXR5UnVsZS50eXBlLCBpc0VsaWdpYmxlKTtcbiAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGluZGV4IG9mIGJ1c2luZXNzUnVsZSwgdGhpcyBpcyB0aGUgYnVzaW5lc3NSdWxlSWRcbiAgYXN5bmMgY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBidXNpbmVzc1J1bGVdIG9mIGJ1c2luZXNzUnVsZVNldC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KFtidXNpbmVzc1J1bGVdKSkgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRGF0YUxheWVyUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgd2l0aCBvcGVyYXRvclwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBzZWxlY3RvclwiLCBydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGwpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIHNlbGVjdG9yLCBzZWxlY3RvckFsbCwgc2VsZWN0b3JGYWxsYmFjayA9IG51bGx9ID0gcnVsZTtcbiAgbGV0IG1haW5TZWxlY3RvciA9IHNlbGVjdG9yO1xuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIG1haW5TZWxlY3RvciA9IHNlbGVjdG9yRmFsbGJhY2sgPyBzZWxlY3RvckZhbGxiYWNrIDogbWFpblNlbGVjdG9yO1xuICB9XG5cbiAgaWYgKG9wZXJhdG9yID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvciksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoc2VsZWN0b3JBbGwgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChtYWluU2VsZWN0b3IpIGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKTtcbiAgZWxzZSBpZiAoc2VsZWN0b3JBbGwpIGVsZW1lbnQgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidGV4dC1udW1iZXJcIjoge1xuICAgICAgbGV0IHRlbXBWYWw7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgICB0ZW1wVmFsID0gZWxlbWVudC5yZWR1Y2UoKHJldHVyblZhbCwgZWxlbSkgPT4ge1xuICAgICAgICAgIHJldHVyblZhbCArPSBwYXJzZUludChlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVmFsID0gcGFyc2VJbnQod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikudGV4dENvbnRlbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgfVxuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcGFyc2VJbnQodGVtcFZhbCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiY2xhc3NMaXN0XCI6XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImNvdW50XCI6IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihlbGVtZW50Lmxlbmd0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigwLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSBcInN0eWxlXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgY29uc3Qgc3R5bGVLZXkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50U3R5bGVzW3N0eWxlS2V5XTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCBzdHlsZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJPcGVyYXRvciBub3QgZGVmaW5lZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVGdW5jdGlvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0Z1bmN0aW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIGZ1bmN0aW9uIHJ1bGVcIik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgZnVuY3Rpb24gbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHJ1bGVGdW5jdGlvbiA9IEZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gcnVsZUZ1bmN0aW9uKCk7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVNlc3Npb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tTZXNzaW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkdXJhdGlvblwiOlxuICAgICAgcmV0dXJuIGR1cmF0aW9uSGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiaGlzdG9yeVwiOlxuICAgICAgcmV0dXJuIGhpc3RvcnlIYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZ2V0U2Vzc2lvblRpbWVzdGFtcCA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IERhdGUocGFyc2VJbnQod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9USU1FU1RBTVApKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IHNlc3Npb24gdGltZXN0YW1wXCIsIGVycik7XG4gICAgcmV0dXJuIERhdGUubm93KCk7XG4gIH1cbn07XG5cbmNvbnN0IGR1cmF0aW9uSGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gKERhdGUubm93KCkgLSBnZXRTZXNzaW9uVGltZXN0YW1wKCkpIC8gMTAwMDtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZHVyYXRpb24sIGNvbmRpdGlvbiwgcGFyc2VJbnQodmFsdWUpKTtcbn07XG5cbmNvbnN0IGhpc3RvcnlIYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgY3VycmVudEhpc3RvcnkgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX0hJU1RPUlkpPy5zcGxpdChcIixcIik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGN1cnJlbnRIaXN0b3J5LCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXJsQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrVXJsUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInBhdGhcIjoge1xuICAgICAgY29uc3QgcmVxdWVzdFVSTD0gd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmO1xuICAgICAgY29uc3QgcGF0aCA9IG5ldyBVUkwocmVxdWVzdFVSTCkucGF0aG5hbWU7XG4gICAgICBsb2dnZXIubG9nKGBDaGVja2luZyBwYXRoICR7cGF0aH0gbWF0Y2hlcyBydWxlIHBhdGggJHt2YWx1ZX1gKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHBhdGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWX0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRW52Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRW52UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgbGV0IHNrdTtcbiAgaWYgKHBhZ2VUeXBlID09PSBcIlBEUFwiKSB7XG4gICAgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgaWYgKCFza3UpIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBpZiAoIXNrdUxpc3QgfHwgKHR5cGVvZiBza3VMaXN0ID09PSBcIm9iamVjdFwiICYmICFPYmplY3Qua2V5cyhza3VMaXN0KS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG4gICAgc2t1ID0gc2t1TGlzdFtPYmplY3Qua2V5cyhza3VMaXN0KVswXV07XG4gIH1cbiAgbGV0IHJ1bnRpbWVWYWx1ZSA9IG51bGw7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwic2FsZUNudFZpc2l0b3JzSW4xNVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBUcmFuc2FjdGlvbkNvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUcmFuc2FjdGlvbkNvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImNhcnRDbnRWaXNpdG9yc0luMTVcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgQWRkVG9DYXJ0Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldEFkZFRvQ2FydENvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInZpZXdDbnRWaXNpdG9yc0luMVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBwcm9kdWN0Vmlld0NvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRQcmV2aWV3Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiaGFzVGl0bGVcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgdGl0bGUgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFRpdGxlKHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImhhc0Rlc2NyaXB0aW9uXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIGRlc2NyaXB0aW9uIGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXREZXNjcmlwdGlvbihza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbkNvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRQcmV2aWV3Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEZyb21EQiA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgZGIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICByZXR1cm4gYXdhaXQgZGIuZ2V0KHNrdSk7XG59O1xuXG5jb25zdCBnZXRUaXRsZSA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby50aXRsZUF1Z21lbnQgfHwgXCJcIjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGdldERlc2NyaXB0aW9uID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLm1hcmtldGluZ0NvcHkgfHwgXCJcIjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQge2NoZWNrRGF0YUxheWVyUnVsZX0gZnJvbSBcIi4vZGF0YUxheWVyQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VsZW1lbnRSdWxlfSBmcm9tIFwiLi9lbGVtZW50Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0Z1bmN0aW9uUnVsZX0gZnJvbSBcIi4vZnVuY3Rpb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrU2Vzc2lvblJ1bGV9IGZyb20gXCIuL3Nlc3Npb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrVXJsUnVsZX0gZnJvbSBcIi4vdXJsQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VudlJ1bGV9IGZyb20gXCIuL2VudkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tQcm9kdWN0SW5mb1J1bGV9IGZyb20gXCIuL3Byb2R1Y3RJbmZvQ2hlY2tlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2FkZERhdGFMaXN0ZW5lciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuaW1wb3J0IHtmZXRjaEVsaWdpYmlsaXR5UnVsZXN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSdWxlRW5naW5lXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlRW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVzLCBiYXNlUnVsZVNldH0gPSBib2R5O1xuICAgIHRoaXMuYmFzZVJ1bGVTZXQgPSBiYXNlUnVsZVNldDtcbiAgICB0aGlzLmVsaWdpYmlsaXR5UnVsZXMgPSBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5tdXRleCA9IG5ldyBNdXRleCgpO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgdGhpcy5iYXNlUnVsZVNldCkge1xuICAgICAgY29uc3QgcnVsZVNhdGlzZmllZCA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgaWYgKCFydWxlU2F0aXNmaWVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGUocnVsZSkge1xuICAgIGNvbnN0IHtjaGFpbiwgY2hhaW5fY29uZGl0aW9uLCB0eXBlfSA9IHJ1bGU7XG4gICAgbGV0IHJ1bGVTYXRpc2ZpZWQgPSBudWxsO1xuICAgIC8vIGNoZWNrIHJ1bGVcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJzZXNzaW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1Nlc3Npb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VsZW1lbnRSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrRGF0YUxheWVyUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXJsXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1VybFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0Z1bmN0aW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZW52aXJvbm1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRW52UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrUHJvZHVjdEluZm9SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIHN1Y2ggcnVsZSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjaGFpbikge1xuICAgICAgc3dpdGNoIChjaGFpbl9jb25kaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICYmIGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgfHwgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgIT0gYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIGNoYWluIGNvbmRpdGlvblwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVTYXRpc2ZpZWQgPyBydWxlLm5hbWUgfHwgdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgYXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpIHtcbiAgICBpZiAoIWtleSB8fCAhcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCB0aGlzLm11dGV4LmFjcXVpcmUoKTtcbiAgICBsb2dnZXIubG9nKGBMb2NrIGFjcXVpcmVkIGZvciBrZXkgJHtrZXl9YCk7XG4gICAgbGV0IGVsaWdpYmxlUnVsZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gKSB8fCBbXTtcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGNvbnN0IGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKTtcbiAgICAgICAgaWYgKGlzRWxpZ2libGUpIHtcbiAgICAgICAgICBpZiAoZWxpZ2libGVSdWxlcy5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBlbGlnaWJsZVJ1bGVzLnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWVsaWdpYmxlUnVsZXMuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgZWxpZ2libGVSdWxlcyA9IGVsaWdpYmxlUnVsZXMuZmlsdGVyKChybikgPT4gcm4gIT09IHJ1bGUubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBlbGlnaWJsZVJ1bGVzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbml0aWFsaXplTGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZWxpZ2liaWxpdHlSdWxlcykpIHtcbiAgICAgIHRoaXMuc2V0VXBMaXN0ZW5lcnMoa2V5LCBydWxlcyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0VXBMaXN0ZW5lcnMoa2V5LCBydWxlcykge1xuICAgIGNvbnN0IHtkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzLCBwcm9kdWN0SW5mb1J1bGVzfSA9IHRoaXMuZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKHJ1bGVzKTtcbiAgICBmb3IgKGNvbnN0IFtvcGVyYXRvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGFMYXllclJ1bGVzKSkge1xuICAgICAgY29uc3QgYm91bmRBc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2sgPSB0aGlzLmFzc2Vzc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2Vzc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW3NlbGVjdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZWxlbWVudFJ1bGVzKSkge1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25MaXN0KSA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikgcmV0dXJuO1xuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvblJlY29yZCBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICBub2RlcyA9IFsuLi5ub2RlcywgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5yZW1vdmVkTm9kZXMpXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBleGNsdWRlIG11dGF0aW9ucyB0aGF0IG9ubHkgdXBkYXRlIHRleHRcbiAgICAgICAgaWYgKG5vZGVzLmV2ZXJ5KChuKSA9PiBuLnRhZ05hbWUgPT09IHVuZGVmaW5lZCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5hc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcyk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gXCJib2R5XCIpIHtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmJvZHksIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9O1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikucGFyZW50Tm9kZSwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBbLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMocHJvZHVjdEluZm9SdWxlcykpIHtcbiAgICAgIGNvbnN0IGJvdW5kQXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2suYmluZCh0aGlzLCBrZXksIHJ1bGVzKTtcbiAgICAgIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGRiLmNoZWNrSW5pdGlhbGl6ZWQoYm91bmRBc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2spO1xuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcywgZGF0YUxheWVyUnVsZXMgPSB7fSwgZWxlbWVudFJ1bGVzID0ge30sIHByb2R1Y3RJbmZvUnVsZXMgPSB7fSwgYmFzZVJ1bGUgPSBudWxsKSB7XG4gICAgaWYgKCFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICBjb25zdCB7dHlwZX0gPSBydWxlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgICBpZiAoIWRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdKSB7XG4gICAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXS5wdXNoKGJhc2VSdWxlIHx8IHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJ1bGUuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0gPSBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSwgYmFzZVJ1bGUgfHwgcnVsZV0gOiBbYmFzZVJ1bGUgfHwgcnVsZV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocnVsZS5zZWxlY3RvckFsbCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0gPSBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSwgYmFzZVJ1bGUgfHwgcnVsZV0gOiBbYmFzZVJ1bGUgfHwgcnVsZV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFJ1bGVzW1wiYm9keVwiXSA9IGVsZW1lbnRSdWxlc1tcImJvZHlcIl0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tcImJvZHlcIl0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgICBpZiAoIXByb2R1Y3RJbmZvUnVsZXMuYWxsKSB7XG4gICAgICAgICAgICBwcm9kdWN0SW5mb1J1bGVzLmFsbCA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9kdWN0SW5mb1J1bGVzLmFsbC5wdXNoKGJhc2VSdWxlIHx8IHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHJ1bGUuY2hhaW4pIHtcbiAgICAgICAgdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMoW3J1bGUuY2hhaW5dLCBkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzLCBwcm9kdWN0SW5mb1J1bGVzLCBiYXNlUnVsZSB8fCBydWxlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzLCBwcm9kdWN0SW5mb1J1bGVzfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZWxpZ2liaWxpdHlSdWxlc09iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMpO1xuICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXNPYmopIHtcbiAgICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IEpTT04ucGFyc2UoZWxpZ2liaWxpdHlSdWxlc09iaik7XG4gICAgICAgIGlmIChlbGlnaWJpbGl0eVJ1bGVzT2JqLnRpbWVzdGFtcCkge1xuICAgICAgICAgIGNvbnN0IGVsYXBzZWRIb3VycyA9IChEYXRlLm5vdygpIC0gZWxpZ2liaWxpdHlSdWxlc09iai50aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgICAgICBpZiAoZWxhcHNlZEhvdXJzIDwgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMpIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzT2JqLnJ1bGVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gYXdhaXQgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gICAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXNPYmopIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0ge3J1bGVzOiBlbGlnaWJpbGl0eVJ1bGVzT2JqLCB0aW1lc3RhbXA6IERhdGUubm93KCl9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUywgSlNPTi5zdHJpbmdpZnkoZWxpZ2liaWxpdHlSdWxlc09iaikpO1xuICAgICAgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXNPYmoucnVsZXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBlbGlnaWJpbGl0eSBydWxlczogXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiU2VnbWVudGF0aW9uQ29tcHV0ZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gIGxvZ2dlci5sb2coXCJEZXRlcm1pbmluZyB1c2VyIHNlZ21lbnRcIik7XG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgICBjb25zdCBydWxlU2V0ID0gdHJlYXRtZW50V2VpZ2h0c1tzZWdtZW50XT8ucnVsZVNldDtcbiAgICAgIGlmICghcnVsZVNldCkgY29udGludWU7XG4gICAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXX0pO1xuICAgICAgaWYgKGF3YWl0IHNlZ21lbnRSdWxlRW5naW5lLmNoZWNrUnVsZXMoKSkge1xuICAgICAgICBsb2dnZXIubG9nKGBVc2VyIHNlZ21lbnQgbWF0Y2hlZDogJHtzZWdtZW50fWApO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgc2VnbWVudCk7XG4gICAgICAgIHJldHVybiBzZWdtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIubG9nKFwiVXNlciBzZWdtZW50IG5vdCBtYXRjaGVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNvbXB1dGUgdXNlciBzZWdtZW50XCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2ZldGNoVHJlYXRtZW50cywgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiKTtcblxuY2xhc3MgVHJlYXRtZW50UmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0cywgdXNlclNlZ21lbnR9ID0gYm9keTtcbiAgICB0aGlzLnRyZWF0bWVudHMgPSB0cmVhdG1lbnRzO1xuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gICAgdGhpcy5jdXJyZW50UGFnZVR5cGUgPSBudWxsO1xuICAgIHRoaXMudXNlclNlZ21lbnQgPSB1c2VyU2VnbWVudDtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRzKCkge1xuICAgIGxvZ2dlci5sb2coXCJMb2FkaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3Qge1RSRUFUTUVOVFN9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShUUkVBVE1FTlRTKSk7XG4gICAgbGV0IHRyZWF0bWVudHMgPSB0cmVhdG1lbnRzT2JqPy50cmVhdG1lbnRzO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyZWF0bWVudHNPYmo/LnRpbWVzdGFtcDtcbiAgICBpZiAoIXRyZWF0bWVudHMgfHwgIXRpbWVzdGFtcCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgIH07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgaWYgKGVsYXBzZWRIb3VycyA+IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIGFyZSBleHBpcmVkXCIpO1xuICAgICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJUcmVhdG1lbnRzIGFyZSBsb2FkZWQgZnJvbSBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudFdlaWdodHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWlnaHRzT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5XRUlHSFRTKTtcbiAgICAgIGlmICh3ZWlnaHRzT2JqKSB7XG4gICAgICAgIHdlaWdodHNPYmogPSBKU09OLnBhcnNlKHdlaWdodHNPYmopO1xuICAgICAgICBpZiAod2VpZ2h0c09iai50aW1lc3RhbXApIHtcbiAgICAgICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHdlaWdodHNPYmoudGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICAgICAgaWYgKGVsYXBzZWRIb3VycyA8IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSByZXR1cm4gd2VpZ2h0c09iai53ZWlnaHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzKCk7XG4gICAgICBpZiAoIXdlaWdodHNPYmopIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB3ZWlnaHRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHdlaWdodHNPYmogPSB7d2VpZ2h0czogd2VpZ2h0c09iaiwgdGltZXN0YW1wOiBEYXRlLm5vdygpfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUywgSlNPTi5zdHJpbmdpZnkod2VpZ2h0c09iaikpO1xuICAgICAgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSkge1xuICAgIGNvbnN0IHtNQVRDSEVEX1RSRUFUTUVOVFN9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgY29uc3QgQ1BUID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgICAgaWYgKCFDUFQpIHJldHVybiBbXTtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2VUeXBlID0gQ1BUO1xuICAgIH1cbiAgICBsZXQgbWF0Y2hlZFRyZWF0bWVudHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShNQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgIGlmIChtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubWF0Y2hCeVBhZ2VUeXBlKG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICB9XG4gICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBbXTtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0cywgdXNlclNlZ21lbnR9ID0gdGhpcztcbiAgICBpZiAoIXVzZXJTZWdtZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlclNlZ21lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0c1t1c2VyU2VnbWVudF07XG4gICAgICBpZiAoIXVzZXJTZWdtZW50V2VpZ2h0cykgcmV0dXJuIFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICBjb25zdCB7aWQsIGFjdGlvbnMsIGhlbHBlcnN9ID0gdHJlYXRtZW50O1xuICAgICAgICBjb25zdCBtb2RlID0gdXNlclNlZ21lbnRXZWlnaHRzW2lkXT8ubW9kZTtcbiAgICAgICAgaWYgKCFtb2RlICYmIGRlYnVnTW9kZSAhPT0gMSkgY29udGludWU7XG4gICAgICAgIGlmIChoZWxwZXJzICYmIEFycmF5LmlzQXJyYXkoaGVscGVycykpIHtcbiAgICAgICAgICBoZWxwZXJzLmZvckVhY2goKGgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlbHBlciA9IHRyZWF0bWVudHMuZmluZCgodCkgPT4gdC5pZCA9PT0gaCk7XG4gICAgICAgICAgICBpZiAoaGVscGVyKSB7XG4gICAgICAgICAgICAgIGhlbHBlci5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaChoZWxwZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRXZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbaWRdPy52YXJpYW50cz8uW3ZhcmlhbnRLZXldO1xuICAgICAgICAgICAgaWYgKHZhcmlhbnRXZWlnaHQpIHtcbiAgICAgICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IHZhcmlhbnRXZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyZWF0bWVudC5tb2RlID0gbW9kZTtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaCh0cmVhdG1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBtYXRjaGVkVHJlYXRtZW50c1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShNQVRDSEVEX1RSRUFUTUVOVFMsIG1hdGNoZWRUcmVhdG1lbnRzU3RyaW5nKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tYXRjaEJ5UGFnZVR5cGUobWF0Y2hlZFRyZWF0bWVudHNTdHJpbmcpO1xuICB9XG5cbiAgYXN5bmMgbWF0Y2hCeVBhZ2VUeXBlKG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgSlNPTi5wYXJzZShtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigobXQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQYWdlVHlwZShtdC5wYWdlVHlwZXMpO1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIubG9nKGAke21hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIHNlZ21lbnQgbWF0Y2hlZGApO1xuICAgICAgcmV0dXJuIG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgbWF0Y2hlZCByb2JvdHM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBjaGVja1BhZ2VUeXBlKHBhZ2VUeXBlcykge1xuICAgIGNvbnN0IHtjdXJyZW50UGFnZVR5cGV9ID0gdGhpcztcbiAgICBpZiAocGFnZVR5cGVzID09PSBudWxsIHx8IHBhZ2VUeXBlcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFnZVR5cGVzKSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlBhZ2UgVHlwZXMgc2hvdWxkIGJlIGFuIGFycmF5XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAocGFnZVR5cGVzWzBdLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBwYWdlVHlwZXMgPSBwYWdlVHlwZXMubWFwKChwdCkgPT4gcHQuc3Vic3RyKDEpKTtcbiAgICAgIHJldHVybiAhcGFnZVR5cGVzLmluY2x1ZGVzKGN1cnJlbnRQYWdlVHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBwYWdlVHlwZXMuaW5jbHVkZXMoY3VycmVudFBhZ2VUeXBlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgQmVhY29uIGZyb20gXCIuLi9HbG92QmVhY29uXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4uL0dsb3ZSb2JvdEVuZ2luZVwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIHN0YXJ0SW5mb0xheWVyU2Nhbixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTEFCX1JBVElPLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBzZXRVUkxEYXRhLFxuICBzZXRCcm93c2VyRGF0YSxcbiAgc2V0QWdlbnREZXRhaWxzLFxuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxuICBzd2l0Y2hUb0Vhc2VPdXQsXG4gIGNoZWNrVmVyc2lvbixcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5sZXQgYW5hbHl0aWNzTGFiZWwgPSBudWxsO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIHN3aXRjaFRvRWFzZU91dCgpO1xuICBjaGVja1ZlcnNpb24oKTtcbiAgbGV0IGJlYWNvbiA9IG51bGw7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgaW5pdGlhbGl6aW5nXCIpO1xuICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbiAgbGV0IGlzT24gPSBudWxsO1xuICBsZXQgaXNDaGFtcCA9IG51bGw7XG5cbiAgdHJ5IHtcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQ1JJVElDQUwgSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24taW5pdFwiKTtcbiAgICBzZXRVUkxEYXRhKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIsIERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidlwiLCBWRVJTSU9OKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNyXCIsIFNQTElUX1JBVElPKTtcblxuICAgIGJlYWNvbiA9IG5ldyBCZWFjb24oKTtcbiAgICAvLyBkYXRhLWxlc3MgbG9nIHRvIGRldGVjdCBib3VuY2VzXG4gICAgYXdhaXQgYmVhY29uLnBhY2tBbmRRdWV1ZUFycml2YWxMb2coKTtcblxuICAgIC8vIFNMQTogMiBzZWNvbmRzIHRvIGZsaWNrZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIH0sIDIwMDApO1xuXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24tY3JpdGljYWwtZW50cnlcIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFkgUFJVTkUgT1VULU9GLVNDT1BFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gdGVzdCBjb29raWUsIGJlYWNvbiwgYW5kIHN0cmluZyB1dGlscyBzdXBwb3J0XG4gICAgLy8gVE9ETzogdXNlIHByb3BlciBmZWF0dXJlIGRldGVjdGlvbiBpbnN0ZWFkIG9mIGRlcGVuZGluZyBvbiBhZ2VudCBzdHJpbmdcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5tYXRjaCAhPT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICBwcm9jZXNzVW5zdXBwb3J0ZWQoKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiB1c2VyQWdlbnQgY2FuIGJlIHByb3Blcmx5IHBhcnNlZFxuICAgIGNvbnN0IHN0YXR1cyA9IHNldEFnZW50RGV0YWlscygpO1xuICAgIC8vIGlmIGFnZW50IGNhbm5vdCBiZSBwYXJzZWQsIGRvIGVhcmx5IGJyZWFrXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIHByb2Nlc3NVbnN1cHBvcnRlZCgpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBU1lOQyBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuICAgIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gcGVyc2lzdFByb2R1Y3RJbmZvKCk7XG5cbiAgICBzZXRCcm93c2VyRGF0YSgpO1xuICAgIGF3YWl0IHNldFVwRWxpZ2liaWxpdHlSdWxlTGlzdGVuZXJzKCk7XG4gICAgc3RhcnRJbmZvTGF5ZXJTY2FuKCk7XG5cbiAgICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gICAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMoKTtcblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWFzeW5jLWluaXRcIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gUE9TVCBPT1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHBlcm1hbmVudCB1bnNlZ21lbnRlZC1vb3MgYWZ0ZXIgT0ZGIGVsaWdpYmlsaXR5IGlzIGZpeGVkXG5cbiAgICAvLyBhdHRlbXB0IHRvIGNvbXB1dGUgdXNlciBzZWdtZW50XG4gICAgbGV0IHVzZXJTZWdtZW50ID0gbnVsbDtcbiAgICBsZXQgdHJlYXRtZW50V2VpZ2h0cyA9IG51bGw7XG5cbiAgICB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2U7XG4gICAgaWYgKCF0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb21wdXRlIHVzZXIgc2VnbWVudCBhbmQgYWRkIHRvIGJlYWdsZUluZm9MYXllclxuICAgICAgdXNlclNlZ21lbnQgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZXJTZWdtZW50KSB7XG4gICAgICBwcm9jZXNzVW5zdXBwb3J0ZWQoKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBRE1JTiBVU0VSIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cblxuICAgIGxldCBpc0FkbWluID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTik7XG4gICAgLy8gaWYgbm90IGZvdW5kIGluIGxvY2FsU3RvcmFnZSwgY2hlY2sgYmVhZ2xlSW5mb0xheWVyIHdpdGggYmxvY2tpbmcgbW9kZVxuICAgIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNBZG1pbiA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgICAgLy8gcGVybWFuZW50IGxhYmVsIGNhbiBiZSBmYWxzZSwgYnV0IGFkbWluIHVzZXIgY2FuIHN0aWxsIGxvZ2luIGFuZCB0dXJuIHRydWUsIGxhemlseSBmaXggdGhpc1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gXCJmYWxzZVwiIHx8IGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gICAgICAvLyBhc3luYyBjYWxsIHRvIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIHRoZW4gc2V0IGxvY2FsU3RvcmFnZVxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSkudGhlbigoaXNBZG1pbikgPT4ge1xuICAgICAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWFkbWluLXN0YXR1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1lYXNlXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnRpLWZsaWNrZXItdGltZW91dFwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IE9OL09GRiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gY2hhbXBpb24gaXMgYWJvdmUgU1BMSVRfUkFUSU8gcGx1cyBMQUJfUkFUSU9cbiAgICBpc0NoYW1wID0gY29va2llUGN0ID49IFNQTElUX1JBVElPICogKDEgKyBMQUJfUkFUSU8gLyAxMDApO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWcgbW9kZSBpcyBvbiwgYWxzbyBhZGRzIGRibSB0byBiZWFnbGVJbmZvTGF5ZXIgYW5kIHNldHMgb29zUmVhc29uXG4gICAgY29uc3QgZGVidWdNb2RlID0gZ2V0RGVidWdNb2RlKCk7XG4gICAgY29uc3QgaXNFbXBsb3llZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfRU1QTE9ZRUUpO1xuXG4gICAgaWYgKGRlYnVnTW9kZSA+IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgYW5hbHl0aWNzTGFiZWwgPSBcImVtcGxveWVlXCI7XG4gICAgfSBlbHNlIGlmIChkZWJ1Z01vZGUgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZWJ1Zy1za2lwLXJvYm90c1wiKTtcbiAgICB9IGVsc2UgaWYgKGlzRW1wbG95ZWUgPT09IFwidHJ1ZVwiIHx8IGlzRW1wbG95ZWUgPT09IHRydWUpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICBhbmFseXRpY3NMYWJlbCA9IFwiZW1wbG95ZWVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIFNQTElUX1JBVElPLCB0aGVuIGluIE9OIG1vZGVcbiAgICAgIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8pIHtcbiAgICAgICAgaXNPbiA9IHRydWU7XG4gICAgICAgIGFuYWx5dGljc0xhYmVsID0gXCJ0cnVlXCI7XG4gICAgICB9IGVsc2UgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTyAvIDIpIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICBhbmFseXRpY3NMYWJlbCA9IFwiZmFsc2UyXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIGFuYWx5dGljc0xhYmVsID0gXCJmYWxzZTFcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFktUFJPQ0VTUyBDT05WRVJTSU9OID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gYXdhaXQgY3JpdGljYWwgaW5mbyBiZWZvcmUgc2VuZGluZyBsb2dzIGZvciBwcm9wZXIgYW5hbHl0aWNzIG1lYXN1cmVtZW50c1xuICAgIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIGlmIChwYWdlVHlwZSA9PT0gXCJwdXJjaGFzZVwiKSB7XG4gICAgICAvLyB3YWl0IHVudGlsIGNyaXRpY2FsIGRhdGEgaXMgc2NyYXBwZWRcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwib2stc2tpcC1yb2JvdHNcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFJPQk9UIFBBVEhzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJlbnRlcmluZy1yb2JvdC1wYXRoXCIpO1xuXG4gICAgaWYgKGlzT24gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWlzT25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICBsZXQgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBudWxsO1xuICAgIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBzZWFyY2hQYXJhbXMuc2xpY2UoXG4gICAgICAgICAgc2VhcmNoUGFyYW1zLmluZGV4T2YoXCJbXCIpICsgMSxcbiAgICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICAgKS5zcGxpdChcIixcIikubWFwKChpdGVtKSA9PiBwYXJzZUludChpdGVtLCAxMCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRzUHJvbWlzZTtcblxuICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcm9ib3Qtd2VpZ2h0c1wiKTtcbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJGb3VuZCB0cmVhdG1lbnRzOiBcIiwgdHJlYXRtZW50cyk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gICAgY29uc3QgdHJlYXRtZW50UmVwb3NpdG9yeSA9IG5ldyBUcmVhdG1lbnRSZXBvc2l0b3J5KHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzLCB1c2VyU2VnbWVudH0pO1xuXG4gICAgY29uc3QgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRSZXBvc2l0b3J5LmdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSk7XG4gICAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1zZWdtZW50LWluLWNvbmZpZ1wiKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvZHVjdEluZm9Qcm9taXNlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZHVjdC1pbmZvLW5vLXBlcnNpc3RcIik7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBpbmZvLXBlcnNpc3RlZFwiKTtcblxuICAgIGlmICghbWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvay1uby1tYXRjaGluZy1yb2JvdHNcIik7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZvdW5kLW1hdGNoZWQtcm9ib3RzXCIpO1xuXG4gICAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBkZWJ1Z01vZGUsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBwYWdlVHlwZSxcbiAgICAgIGlzT24sXG4gICAgICBpc0NoYW1wLFxuICAgIH0pO1xuICAgIGF3YWl0IHJvYm90RW5naW5lLmVuZ2FnZVJvYm90cygpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9rLXJvYm90cy1lbmdhZ2VkXCIpO1xuICAgIGxvZ2dlci5zdWNjZXNzKFwiQXBwbGllZCB0cmVhdG1lbnRzOiBcIiwgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIikpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcIkVudHJ5cG9pbnQgY2F0Y2g6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIGVyci5tZXNzYWdlKTtcbiAgfSBmaW5hbGx5IHtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICBpZiAoaXNPbiAhPT0gbnVsbCkgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJpc09uXCIsIGlzT24pO1xuICAgIGlmIChpc09uICE9PSBudWxsICYmIGlzQ2hhbXAgIT09IG51bGwpIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNDaGFtcFwiLCAoaXNPbiAmJiBpc0NoYW1wKSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGFuYWx5dGljc0xhYmVsKTtcbiAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogYW5hbHl0aWNzTGFiZWx9KTtcbiAgICBhd2FpdCBiZWFjb24ucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICB9XG59KSgpO1xuXG5hc3luYyBmdW5jdGlvbiBzZXRVcEVsaWdpYmlsaXR5UnVsZUxpc3RlbmVycygpIHtcbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IFJ1bGVFbmdpbmUuZ2V0RWxpZ2liaWxpdHlSdWxlcygpO1xuICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHJldHVybjtcbiAgY29uc3QgcnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtlbGlnaWJpbGl0eVJ1bGVzfSk7XG4gIGF3YWl0IHJ1bGVFbmdpbmUuaW5pdGlhbGl6ZUxpc3RlbmVycygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwZXJzaXN0UHJvZHVjdEluZm8oKSB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvREIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICBhd2FpdCBwcm9kdWN0SW5mb0RCLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzVW5zdXBwb3J0ZWQoKSB7XG4gIGFuYWx5dGljc0xhYmVsID0gXCJ1bnN1cHBvcnRlZFwiO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZC1kZXZpY2VcIik7XG59XG5cbi8vIGlmIGFkbWluIHVzZXIsIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCBtYXJrIGFzIGVtcGxveWVlXG5mdW5jdGlvbiBwcm9jZXNzQWRtaW5Vc2VyKCkge1xuICBhbmFseXRpY3NMYWJlbCA9IFwiZW1wbG95ZWVcIjtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgdHJ1ZSk7XG4gIHRocm93IG5ldyBFcnJvcihcImFkbWluLWVtcGxveWVlXCIpO1xufVxuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJWRVJTSU9OIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIkxBQl9SQVRJTyIsIlRSRUFUTUVOVF9SQVRJTyIsIkxPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlBPUFVQX0RJU1BMQVlfRkxBRyIsIlNLVV9JTkZPX0JBU0tFVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJNQVRDSEVEX1RSRUFUTUVOVFMiLCJMT0NBTF9TVE9SQUdFX0tFWVMiLCJUUkVBVE1FTlRTIiwiV0VJR0hUUyIsIkVMSUdJQklMSVRZX1JVTEVTIiwiREVCVUdfTU9ERSIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiSVNfQURNSU4iLCJJU19FTVBMT1lFRSIsIkNVU1RPTV9TVE9SQUdFX1BSRUZJWCIsIkxvZ2dlciIsIm9yaWdpbiIsInRlc3RpbmciLCJERUJVRyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcmdzIiwiY29uc29sZSIsImluZm8iLCJsb2ciLCJtZXNzYWdlQ29uZmlnIiwiZm9yRWFjaCIsImFyZ3VtZW50IiwidHlwZSIsIndhcm4iLCJlcnJvciIsImFkZFRvQmVhZ2xlSW5mb0xheWVyIiwibG9nZ2VyIiwibW9udGhzIiwicmVtb3ZlRG9jdW1lbnRIaWRlIiwidG9wIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzd2l0Y2hUb0Vhc2VPdXQiLCJjb250YWlucyIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwicHJlcGVuZCIsImFkZCIsImZldGNoVHJlYXRtZW50cyIsImZldGNoUGx1cyIsInRyZWF0bWVudHMiLCJFcnJvciIsImpzb24iLCJqc29uVHJlYXRtZW50IiwiZmFpbGVkIiwibWVzc2FnZSIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsImZldGNoUHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvSnNvbiIsInRpbWVvdXQiLCJ0aW1lIiwiY29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsInRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJhYm9ydCIsInVybCIsIm9wdGlvbnMiLCJyZXRyaWVzIiwiZmV0Y2giLCJzaWduYWwiLCJ0aGVuIiwicmVzIiwib2siLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJjYXRjaCIsImV4dHJhY3RDb29raWVJZGVudGlmaWVyIiwiY29va2llU3RyaW5nIiwiY29va2llTmFtZSIsInBhcnNlZCIsInNwbGl0IiwibWFwIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsInRyaW0iLCJpZGVudGlmaWVyIiwiaWRlbnRpZmllckluZGV4IiwiZGV0ZXJtaW5lUGN0Iiwibm93IiwibW9udGgiLCJnZXRNb250aCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJ0b1N0cmluZyIsInBjdCIsImV4aXRTY3JvbGxMaXN0ZW5lciIsImNhbGxCYWNrIiwibG9vcCIsInNjcm9sbFRvcCIsImxhc3RTY3JvbGxUb3AiLCJjbGVhckludGVydmFsIiwiZXhpdFNjcm9sbEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJzdHlsZUFwcGxpY2F0b3IiLCJlbGVtZW50cyIsInN0eWxlQ2hhbmdlc01hcCIsImkiLCJlbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbHVlIiwic3R5bGUiLCJpbmplY3RTdHlsZVNoZWV0Iiwic3R5bGVTaGVldCIsInJlbCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInByZXBhcmVBY3Rpb25zIiwiYWN0aW9uc1RvUHJlcGFyZSIsImJ1c2luZXNzUnVsZUlkIiwiZGVidWdNb2RlIiwiYWN0aW9ucyIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInZhcmlhbnQiLCJhY3Rpb24iLCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMiLCJ2YXJpYW50cyIsImJ1c2luZXNzVHJhbnNmb3JtYXRpb24iLCJpZCIsImtleXMiLCJ2YXJpYW50S2V5IiwicmFuZG9tUGN0Iiwid2VpZ2h0IiwiTWF0aCIsImZsb29yIiwiY2hlY2tBY3Rpb25TZWxlY3RvcnMiLCJzZWxlY3RvciIsInNlbGVjdG9yRmFsbGJhY2siLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMiLCJwb3B1cERpc3BsYXlGbGFnIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXNzaW9uVGltZXN0YW1wIiwic2Vzc2lvbkhpc3RvcnkiLCJzZXRJdGVtIiwicGF0aG5hbWUiLCJjb25kaXRpb25DaGVja2VyIiwicnVuVGltZVZhbHVlIiwiY29uZGl0aW9uIiwic3VjY2VzcyIsInVuZGVmaW5lZCIsIm1pbiIsIm1heCIsInBhcnNlSW50IiwicmVnZXgiLCJSZWdFeHAiLCJ0ZXN0IiwiZ2V0RGVidWdNb2RlIiwicXVlcnlTdHJpbmciLCJzZWFyY2giLCJjdXJyZW50IiwicmVtb3ZlSXRlbSIsIk51bWJlciIsImlzTmFOIiwiZXJyIiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsImFicyIsImdldFJhbmRvbUludCIsInJhbmRvbSIsImdldFVuaXhUaW1lIiwiZ2V0SWRlbnRpZmllciIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImUiLCJkZWxheSIsIm1zIiwiZm9ybWF0RGVsaXZlcnlEYXRlIiwiZGF0ZSIsInJlc3VsdCIsInN0YXJ0TW9udGhJbmRleCIsImVuZE1vbnRoSW5kZXgiLCJzdGFydERheSIsImVuZERheSIsIm1hdGNoIiwidG9kYXkiLCJzdGFydFllYXIiLCJnZXRGdWxsWWVhciIsImVuZFllYXIiLCJlc3RpbWF0ZWRTdGFydCIsImVzdGltYXRlZEVuZCIsInN0YXJ0RGlmZk92ZXJEYXlzIiwiY2VpbCIsImVuZERpZmZPdmVyRGF5cyIsInN0YXJ0RGlmZk92ZXJXZWVrcyIsImVuZERpZmZPdmVyV2Vla3MiLCJpZGxlVGltZXIiLCJ0aW1lT3V0IiwicmVzZXRUaW1lciIsImlkbGVUaW1lb3V0Iiwib250b3VjaHN0YXJ0IiwiaXNPd25NdXRhdGlvbiIsIm11dGF0aW9uTGlzdCIsIm5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsInNvbWUiLCJuIiwidGFnTmFtZSIsImMiLCJzZXRBZ2VudERldGFpbHMiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImJyIiwiYk5hbWUiLCJiVmVyc2lvbiIsIm9zIiwiV2luZG93cyIsIk1hYyIsIkxpbnV4IiwiQW5kcm9pZCIsImlPUyIsIm9zVmVyc2lvbiIsIm9zTmFtZSIsImlzTW9iaWxlIiwib3NWZXJzaW9uSW50IiwiaXNTdXBwb3J0ZWRCcm93c2VyIiwiaXNTdXBwb3J0ZWRPUyIsInNldEJyb3dzZXJEYXRhIiwid2luZG93UHRyIiwibmF2UHRyIiwicGxhdGZvcm0iLCJ1c2VyQWdlbnREYXRhIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImF2YWlsV2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwid2luZG93RGVwdGgiLCJjb2xvckRlcHRoIiwicGl4ZWxEZXB0aCIsInZwb3J0U2hhcGUiLCJ2aXN1YWxWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0Iiwicm91bmQiLCJvcmllbnRhdGlvbkFuZ2xlIiwib3JpZW50YXRpb24iLCJhbmdsZSIsInRlbXAiLCJoaXN0b3J5IiwibmF2QWdlbnQiLCJicmFuZHMiLCJicmFuZCIsInZlcnNpb24iLCJqb2luIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwic2V0VVJMRGF0YSIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsInBhZ2VUeXBlIiwiaWRiUmVhZHkiLCJpc1NhZmFyaSIsImluZGV4ZWREQiIsImRhdGFiYXNlcyIsImludGVydmFsSWQiLCJ0cnlJZGIiLCJmaW5hbGx5IiwiY2hlY2tWZXJzaW9uIiwiY3VycmVudFZlcnNpb24iLCJMU19QcmVmaXgiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJmZWF0dXJlS2V5Iiwib3BLZXkiLCJzdG9yYWdlIiwicGFyc2VGbG9hdCIsInZhbEhhc2giLCJvcEtleVZhbCIsIm9wS2V5VmFsTmFtZSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJxdWVyeU1ldGhvZCIsImxvY2FsS2V5cyIsImxvY2FsS2V5c0ZpbHRlcmVkIiwiZmlsdGVyIiwic3VtIiwibWF4Q291bnQiLCJtYXhWYWwiLCJ2YWwiLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwibmFtZSIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiZGVyaXZlTWV0aG9kIiwiY3VzdG9tRGVyaXZhdGlvblJlcG8iLCJjYWxjdWxhdGVDb3Vwb25BbGxvd2FuY2VzIiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImFsbCIsImlzQ2FydEVtcHR5IiwidG90YWxCYXNlUHJpY2UiLCJjb3Vwb25Ob3RBcHBsaWNhYmxlIiwicHJpY2VzIiwicXVhbnRpdGllcyIsInRvdGFsUHJpY2UiLCJpc0FycmF5IiwiY291cG9uQXBwbGljYWJsZUFtb3VudCIsImNhcnJ5U2t1VG9GZWF0dXJlcyIsImN1cnJlbnRQYWdlVHlwZSIsInNrdSIsInNrdUxpc3QiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZiIsIl9faHdtIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsIm9iaiIsInVwZGF0ZURlcml2YXRpb25zIiwicGFzc1ZhbHVlVG9MaXN0ZW5lcnMiLCJEQVRBX0xJU1RFTkVSUyIsImFkZERhdGFMaXN0ZW5lciIsImxpc3RlbmVyIiwicHVzaCIsInByZXZQYXNzZWRWYWx1ZXMiLCJsaXN0ZW5lcnMiLCJibG9ja2luZyIsInBvbGxJbnRlcnZhbCIsIm9idGFpbkRhdGEiLCJqc29uR2V0Iiwic2VhcmNoRWxlbWVudCIsImlzRm91bmQiLCJpc0lnbm9yZSIsImludGVydmFsIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJkZXJpdmVGdW5jdCIsInByb2Nlc3NGb3JtYXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsInNlYXJjaE9iaiIsImxheWVyVmFsdWUiLCJmaWx0ZXJQYXJhbXMiLCJmaWx0ZXJOYW1lIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJNYXRjaCIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwidHJpZ2dlclJlc3RhcnQiLCJzdGFydEluZm9MYXllclNjYW4iLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImlubmVyVGV4dCIsImF0dHJpYlZhbHVlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZWNoaWxkIiwiYXR0cmliVmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRWYWx1ZSIsInN1bVByaWNlIiwiY2hpbGRUZXh0IiwiYXJyYXlJbm5lclRleHQiLCJleGNsdXNpdmVFbGVtZW50IiwicGFyc2VTZWFyY2hQYXRocyIsImRvbVN0YXR1cyIsInJlYWR5U3RhdGUiLCJ3aW50b3AiLCJkYXRhTGF5ZXIiLCJ3aW5kb2MiLCJmb3VuZE5hbWVzIiwiU2V0IiwicHJldkZvdW5kTmFtZXMiLCJub3RGb3VuZE5hbWVzIiwiaGFzIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJzaXplIiwicGF0aCIsInBhdGhBcnJheSIsInN1YlBhdGgiLCJzbGljZSIsInN1YkFycmF5Iiwic3ViS2V5Iiwic3ViVmFsdWUiLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwianNvbmNvbnRlbnQiLCJIRUFERVJTIiwiQmVhY29uIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaGlnaFdhdGVyTWFyayIsImluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMiLCJwYWNrQW5kUXVldWVNYWluTG9nIiwicGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2ciLCJwYWNrYWdlTWFpbkxvZ0RhdGEiLCJyZXF1ZXN0QmxvYiIsImNoZWNrRm9yTGF0ZXN0Q2hhbmdlcyIsInF1ZXVlTG9ncyIsImhhc0NoYW5nZWQiLCJwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhIiwibG9nRGF0YSIsInBhY2thZ2VBcnJpdmFsTG9nRGF0YSIsImh3bSIsImNvb2tpZUdhSWQiLCJ2aWV3X2Vwb2NoIiwiYm9keSIsImxjIiwidSIsIm9uSGFzaFBjdCIsIkJsb2IiLCJzdGFydHNXaXRoIiwicyIsIm0iLCJ2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbG9zZUV2ZW50IiwiY2FwdHVyZSIsInZpc2liaWxpdHlTdGF0ZSIsInNlbmRCZWFjb24iLCJxdWV1ZWQiLCJxdWV1ZUludGVydmFsIiwicmVwbGFjZXIiLCJyZXBsYWNlRm4iLCJjdXJyZW50UmVwbGFjZUZuIiwicmVwbGFjZU9iamVjdEV4dHJhY3RvciIsInJlcGxhY2VWYWwiLCJyZXBsYWNlRm5FeGVjdXRvciIsInJGbiIsInNpbmdsZSIsInJlcGxhY2VGdW5jdGlvbiIsIkZ1bmN0aW9uIiwia2V5RmFsbGJhY2siLCJjb25maWciLCJkYk5hbWUiLCJzdG9yZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJrZXlQYXRoIiwib3BlbkRCIiwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSIsImluaXQiLCJ1cGdyYWRlIiwiZGIiLCJvbGRWZXJzaW9uIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImlkeCIsImNyZWF0ZUluZGV4IiwicmVqZWN0IiwicmVhZHdyaXRlIiwiZ2V0REIiLCJ0cmFuc2FjdGlvbiIsInBheWxvYWQiLCJnZXRTdG9yZSIsInRpbWVzdGFtcCIsInNhdmVQcm9taXNlcyIsImxvYWQiLCJwdXQiLCJjbGVhciIsImNvdW50Iiwib3BlbkN1cnNvciIsImN1cnNvciIsImNsZWFyUHJvbWlzZSIsImV4aXN0aW5nUHJvZEluZm8iLCJnZXRDdXJzb3IiLCJlbGFwc2VkU2Vjb25kcyIsInByb2R1Y3RJbmZvUHJvbWlzZSIsInByb2R1Y3RJbmZvQXJyYXkiLCJzYXZlIiwicHJlcGFyZVBheWxvYWRzIiwicGF5bG9hZHMiLCJmaWVsZE5hbWVzIiwic2hpZnQiLCJjYWxsYmFjayIsInByb2R1Y3RJbmZvVGltZW91dCIsInByb2R1Y3RJbmZvSW50ZXJ2YWwiLCJTdG9yZSIsImluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwib3BlcmF0b3IiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwibWRDb25kaXRpb24iLCJwVHlwZSIsInByb2R1Y3RJbmZvU3RvcmFnZSIsIiQiLCJtYyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiYmVmb3JlIiwiYWZ0ZXIiLCJhcHBlbmQiLCJvZmYiLCJjcmVhdGVQb3B1cCIsImVsbSIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3BsYXlNb2RhbCIsImdldFByb2R1Y3RJbmZvIiwiZXZlbnQiLCJkaXNwbGF5UG9wdXAiLCJyIiwiZCIsInB1c2hTdGF0ZSIsInN0YXRlIiwib25jZSIsInRleHQiLCJodG1sIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm9yaWdpbmFsVGl0bGUiLCJ0aXRsZSIsImhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic2NyaXB0SUQiLCJnZXRFbGVtZW50QnlJZCIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwic2VudGVuY2UiLCJ3b3JkIiwiY2hhckF0IiwidG9Mb2NhbGVVcHBlckNhc2UiLCJwcmVwYXJlRmluYWxUaXRsZSIsImZpbmFsVGl0bGUiLCJjb250ZW50cyIsIm5vZGVUeXBlIiwibm9kZVZhbHVlIiwicHJlcGFyZURlc2NFbG0iLCJkZXNjcmlwdGlvbkVsbSIsIm1hcmtldGluZ0NvcHkiLCJ1cGRhdGVkSHRtbFN0cmluZyIsInJlcGxhY2VXaXRoVmFsIiwidGl0bGVBdWdtZW50IiwiaHRtbFN0ciIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJoaWRlIiwicVBvcHVwIiwiaXNNb2RhbCIsInBvcHVwV3JhcHBlciIsInBvcHVwQ2xvc2VCdXR0b24iLCJwb3B1cENsb3NlQnV0dG9uU3R5bGUiLCJvbmNsaWNrIiwic3JjIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJwb3B1cCIsImNvbnRlbnQiLCJmaXJzdENoaWxkIiwicDEiLCJwYXJlbnROb2RlIiwicDIiLCJpMSIsImkyIiwiaXNFcXVhbE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJ3YWl0Rm9ySlF1ZXJ5IiwialF1ZXJ5IiwialF1ZXJ5SW50ZXJ2YWwiLCJhY3Rpb25BcHBsaWNhdG9yIiwiZWxpZ2libGVFbGVtZW50cyIsImNoZWNrQWN0aW9uQ29uZGl0aW9uIiwiYXR0cmlidXRlIiwiaW5uZXJfY29uZGl0aW9uIiwiY2hhaW4iLCJjb25kaXRpb25FbGVtZW50cyIsImFjdGlvbkNvbmRpdGlvbkNoZWNrZXIiLCJlbGVtZW50U2t1IiwiZm4iLCJNdXRleCIsIk9CU0VSVkVSX0NPTkZJRyIsImF0dHJpYnV0ZXMiLCJSb2JvdEVuZ2luZSIsImRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzIiwibWF0Y2hlZFRyZWF0bWVudHMiLCJpc09uIiwiaXNDaGFtcCIsImVuZ2FnZW1lbnRMb2NrIiwicmVBcHBseVRyZWF0bWVudHNNYXAiLCJhZGRlZERhdGFMaXN0ZW5lcklkcyIsInJvYm90UHJvbWlzZXMiLCJ0cmVhdG1lbnQiLCJlbmdhZ2VSb2JvdCIsImluaXRpYXRlUmVhcHBseVJvYm90TWFwIiwiZWxpZ2liaWxpdHlSdWxlU2V0IiwiZGV2aWNlIiwiYnVzaW5lc3NSdWxlU2V0IiwiaGVscGVycyIsIm1vZGUiLCJhcHBseSIsImFjcXVpcmUiLCJyZWxlYXNlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJwcmVwYXJlZEFjdGlvbnMiLCJpc0VsaWdpYmxlIiwiZW5nYWdlSGVscGVycyIsImFkZFJlYXBwbHlFdmVudCIsImFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzIiwiaGVscGVyUm9ib3RQcm9taXNlcyIsImNoZWNrIiwiYXBwbGllZCIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJ0IiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJib3VuZEVuZ2FnZVRyZWF0bWVudCIsImJpbmQiLCJzZWxlY3RvcnMiLCJleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzIiwicnVsZVNldCIsInByZXZpb3VzU2VsZWN0b3JzIiwicnVsZSIsInNldCIsImVsaWdpYmlsaXR5UnVsZSIsIm9wcG9zaXRlRmxhZyIsImVsaWdpYmlsaXR5U2NvcGUiLCJlbGlnaWJpbGl0eU5hbWUiLCJlbGlnaWJpbGl0eVNldFR5cGUiLCJwcmV2aW91c0lzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiY2hlY2tEYXRhTGF5ZXJSdWxlIiwiZGF0YUxheWVyRmluZGVyIiwicnVudGltZVZhbHVlIiwiY2hlY2tFbGVtZW50UnVsZSIsInNlbGVjdG9yQWxsIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiY2hlY2tTZXNzaW9uUnVsZSIsImR1cmF0aW9uSGFuZGxlciIsImhpc3RvcnlIYW5kbGVyIiwiZ2V0U2Vzc2lvblRpbWVzdGFtcCIsImR1cmF0aW9uIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiY2hlY2tQcm9kdWN0SW5mb1J1bGUiLCJnZXRUcmFuc2FjdGlvbkNvdW50IiwiZ2V0QWRkVG9DYXJ0Q291bnQiLCJnZXRQcmV2aWV3Q291bnQiLCJnZXRUaXRsZSIsImdldERlc2NyaXB0aW9uIiwiZ2V0RnJvbURCIiwiUnVsZUVuZ2luZSIsImJhc2VSdWxlU2V0IiwiYWRkZWREYXRhTGlzdGVuZXJzIiwibXV0ZXgiLCJjaGVja1J1bGUiLCJydWxlU2F0aXNmaWVkIiwiY2hhaW5fY29uZGl0aW9uIiwicnVsZXMiLCJlbGlnaWJsZVJ1bGVzIiwicm4iLCJzZXRVcExpc3RlbmVycyIsImV4dHJhY3RSdWxlQXR0cmlidXRlcyIsImRhdGFMYXllclJ1bGVzIiwiZWxlbWVudFJ1bGVzIiwicHJvZHVjdEluZm9SdWxlcyIsImJvdW5kQXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwiYXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImNoZWNrSW5pdGlhbGl6ZWQiLCJiYXNlUnVsZSIsImVsaWdpYmlsaXR5UnVsZXNPYmoiLCJlbGFwc2VkSG91cnMiLCJjb21wdXRlU2VnbWVudCIsInNlZ21lbnQiLCJzZWdtZW50UnVsZUVuZ2luZSIsImNoZWNrUnVsZXMiLCJUcmVhdG1lbnRSZXBvc2l0b3J5IiwidXNlclNlZ21lbnQiLCJDUFQiLCJtYXRjaEJ5UGFnZVR5cGUiLCJ1c2VyU2VnbWVudFdlaWdodHMiLCJoIiwiaGVscGVyIiwidmFyaWFudFdlaWdodCIsIm1hdGNoZWRUcmVhdG1lbnRzU3RyaW5nIiwibXQiLCJjaGVja1BhZ2VUeXBlIiwicGFnZVR5cGVzIiwicHQiLCJzdWJzdHIiLCJ0cmVhdG1lbnRzT2JqIiwidHJlYXRtZW50V2l0aFRpbWVzdGFtcCIsIndlaWdodHNPYmoiLCJ3ZWlnaHRzIiwiYW5hbHl0aWNzTGFiZWwiLCJiZWFjb24iLCJjb29raWVQY3QiLCJwYWNrQW5kUXVldWVBcnJpdmFsTG9nIiwiU3RyaW5nIiwicHJvdG90eXBlIiwicGFkU3RhcnQiLCJwcm9jZXNzVW5zdXBwb3J0ZWQiLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJ0cmVhdG1lbnRzUHJvbWlzZSIsImdldFRyZWF0bWVudHMiLCJwZXJzaXN0UHJvZHVjdEluZm8iLCJzZXRVcEVsaWdpYmlsaXR5UnVsZUxpc3RlbmVycyIsImlzQWRtaW4iLCJwcm9jZXNzQWRtaW5Vc2VyIiwiaXNFbXBsb3llZSIsInNlYXJjaFBhcmFtcyIsImxhc3RJbmRleE9mIiwiaXRlbSIsInRyZWF0bWVudFJlcG9zaXRvcnkiLCJnZXRNYXRjaGVkVHJlYXRtZW50cyIsInJvYm90RW5naW5lIiwiZW5nYWdlUm9ib3RzIiwiR0xPVl9PTiIsImdldEVsaWdpYmlsaXR5UnVsZXMiLCJydWxlRW5naW5lIiwiaW5pdGlhbGl6ZUxpc3RlbmVycyIsInByb2R1Y3RJbmZvREIiXSwic291cmNlUm9vdCI6IiJ9
