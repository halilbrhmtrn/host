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
var VERSION = "0.0.42.1";
var COOKIE_NAME = "_ga";
var TREATMENTS_LOCATION = "https://host-b96.pages.dev/treatments.json";
var TREATMENT_WEIGHTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weightsv2.json";
var STYLESHEET_LOCATION = isStaging ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
var E_RULES_LOCATION = "https://host-b96.pages.dev/eligibility_rules.json";
var PRODUCT_INFO_LOCATION = "https://ndvivense.glov.ai/social-proof-v2.json";
var LOG_API_URL = "https://europe-west3-nextday-34eb3.cloudfunctions.net/api/log";
var LOOKUP_API_URL = "https://catalog-api.adoraai.com";
var MOBILE_MEDIA_QUERY = "(max-width: 440px)";
// Control group percentage
var SPLIT_RATIO = 50;
var LAB_RATIO = 20;
// Skipped treatment percentage
var CHAMP_SKIP_RATIO = 20;
var LAB_SKIP_RATIO = 50;
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
      var operator = action.operator,
        selector = action.selector,
        selectorFallback = action.selectorFallback,
        move_selector_1 = action.move_selector_1,
        move_selector_2 = action.move_selector_2;
      if (operator === "noop" || selector === "no-selector") continue;
      if ((selector || selectorFallback) && !window.top.document.querySelector(selector) && !window.top.document.querySelector(selectorFallback)) {
        logger.failed("Selector/SelectorFallback ".concat(selector || selectorFallback, " not found"));
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
var customDerivationRepo = {};
// functions must have 3 input parameters: baseFeatureName, getFromBeagleInfoLayer and addToBeagleInfoLayer

// push a new function to the repo to create a new custom derivation
customDerivationRepo.calculateCouponAllowances = "\nreturn async (baseFeatureName, getFromBeagleInfoLayer, addToBeagleInfoLayer) => {\n  try {\n    // cart total product price is not available anywhere, special discounts etc are hard to scrape, so recalculate it\n    const [isCartEmpty, totalBasePrice, couponNotApplicable, prices, quantities] = await Promise.all([\n      getFromBeagleInfoLayer(\"cart.isempty\"),\n      getFromBeagleInfoLayer(\"cart.totalBasePrice\"),\n      getFromBeagleInfoLayer(\"cart.couponNotApplicable\"),\n      getFromBeagleInfoLayer(\"cart.prices\"),\n      getFromBeagleInfoLayer(\"cart.quantities\"),\n    ]);\n\n    let totalPrice = 0;\n\n    if (!totalBasePrice && prices && Array.isArray(prices) && prices.length > 0 && quantities && Array.isArray(quantities) && quantities.length > 0 && prices.length === quantities.length) {\n      for (let i = 0; i < prices.length; i++) {\n        totalPrice += parseInt(prices[i]) * parseInt(quantities[i]);\n      }\n    } else {\n      totalPrice = parseInt(totalBasePrice);\n    }\n\n    let couponApplicableAmount = 0;\n    if (!isCartEmpty && totalPrice && couponNotApplicable) {\n      couponApplicableAmount = totalPrice - parseInt(couponNotApplicable);\n    } else if (!isCartEmpty && totalPrice) {\n      couponApplicableAmount = parseInt(totalPrice);\n    } else {\n      couponApplicableAmount = 0;\n    }\n    addToBeagleInfoLayer(\"cart.couponApplicableAmount\", couponApplicableAmount);\n\n    if (isCartEmpty) {\n      addToBeagleInfoLayer(\"cart.totalPrice\", 0);\n      // NOTE: cart.couponNotApplicable is also a trigger, to prevent infinite loop, only set it if it is not already set or not the trigger\n      if (baseFeatureName !== \"cart.couponNotApplicable\" && (couponNotApplicable === null || parseInt(couponNotApplicable) !== 0)) {\n        addToBeagleInfoLayer(\"cart.couponNotApplicable\", 0);\n      }\n    }\n  } catch (e) {\n  }\n};\n";
customDerivationRepo.carrySkuToFeatures = "\nreturn async (baseFeatureName, getFromBeagleInfoLayer, addToBeagleInfoLayer) => {\n  const currentPageType = await getFromBeagleInfoLayer(\"PageType\", true, 50, 1000);\n\n  // Product page --> transfer skus to single location\n  if (currentPageType === \"Productpage\") {\n    const sku = await getFromBeagleInfoLayer(\"pdp.sku\");\n    if (sku !== null && sku !== undefined) {\n      addToBeagleInfoLayer(\"__features.SKUsonPage\", [sku]);\n    }\n  } else if (currentPageType === \"basket\") {\n    const skuList = await getFromBeagleInfoLayer(\"cart.skus\");\n    if (skuList !== null && Array.isArray(skuList) && skuList.length) {\n      addToBeagleInfoLayer(\"__features.SKUsonPage\", skuList);\n    }\n  }\n};\n";
;// CONCATENATED MODULE: ./src/BeagleInfoLayer/index.js



function BeagleInfoLayer_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleInfoLayer_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function BeagleInfoLayer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return BeagleInfoLayer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BeagleInfoLayer_arrayLikeToArray(o, minLen); }
function BeagleInfoLayer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/* eslint-disable max-len */




window.beagleInfoLayer = window.beagleInfoLayer || {
  a: {},
  e: {},
  f: {},
  i: {},
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
  if (prevPassedValues[key] === value) {
    BeagleInfoLayer_logger.log("passValueToListeners --> skipping due to re-pass of the same value ".concat(value, " of key ").concat(key));
    return;
  }
  var listeners = DATA_LISTENERS[key];
  if (listeners && Array.isArray(listeners) && listeners.length > 0) {
    for (var i = 0; i < listeners.length; i += 1) {
      var listener = listeners[i];
      if (typeof listener === "function") {
        BeagleInfoLayer_logger.log("passValueToListeners --> value ".concat(value, " to listener ").concat(i, " of key ").concat(key));
        listener(value);
        prevPassedValues[key] = value;
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
    case "ignored":
      infoLayer.i[id] = value;
      break;
    default:
      BeagleInfoLayer_logger.failed("Couldn't add robot, unknown status: ", status);
      return;
  }
  increaseBeagleInfoLayerHWM();
};
var PARSESEARCHMAXRETRY = 10;
var PARSESEARCHSTARTDELAY = 10;
var parseSearchPathsDelay = PARSESEARCHSTARTDELAY;
var parseSearchPathsRetry = 0;
var customDerivationCompiledRepo = {};
var updateDerivations = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(baseFeatureName, baseFeatureValue) {
    var FEData, _iterator3, _step3, FEOp, _iterator4, _step4, _FEOp, queryResponse, _iterator5, _step5, _FEOp2, deriveFunctString, deriveFunct;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // process dependent historical data for scan-found elements
            FEData = featureEngineeringOps[baseFeatureName];
            if (!(FEData && Array.isArray(FEData) && FEData.length > 0)) {
              _context.next = 67;
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
              _context.next = 59;
              break;
            }
            _FEOp2 = _step5.value;
            if (!(_FEOp2.deriveMethod === null || _FEOp2.deriveMethod === undefined)) {
              _context.next = 49;
              break;
            }
            return _context.abrupt("continue", 57);
          case 49:
            deriveFunctString = customDerivationRepo[_FEOp2.deriveMethod];
            if (!(deriveFunctString === null || deriveFunctString === undefined)) {
              _context.next = 52;
              break;
            }
            return _context.abrupt("continue", 57);
          case 52:
            // create a function from the string from the repo
            deriveFunct = customDerivationCompiledRepo[_FEOp2.deriveMethod]; // cache compiled function
            if (deriveFunct === null || deriveFunct === undefined || typeof deriveFunct !== "function") {
              // create an async function using string generator
              deriveFunct = new Function(deriveFunctString)();
              customDerivationCompiledRepo[_FEOp2.deriveMethod] = deriveFunct;
            }
            BeagleInfoLayer_logger.log("updateDerivations:", baseFeatureName, _FEOp2.deriveMethod);
            _context.next = 57;
            return deriveFunct(baseFeatureName, getFromBeagleInfoLayer, addToBeagleInfoLayer);
          case 57:
            _context.next = 45;
            break;
          case 59:
            _context.next = 64;
            break;
          case 61:
            _context.prev = 61;
            _context.t2 = _context["catch"](43);
            _iterator5.e(_context.t2);
          case 64:
            _context.prev = 64;
            _iterator5.f();
            return _context.finish(64);
          case 67:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 15, 18, 21], [22, 36, 39, 42], [43, 61, 64, 67]]);
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
        var _yield$Promise$all3, _yield$Promise$all4, a, e, f, i, s, m, cookieGaId, view_epoch, body;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Promise.all([getFromBeagleInfoLayer("a"), getFromBeagleInfoLayer("e"), getFromBeagleInfoLayer("f"), getFromBeagleInfoLayer("i"), getFromBeagleInfoLayer("s"), getFromBeagleInfoLayer("m"), getFromBeagleInfoLayer("cookieGaId"), getFromBeagleInfoLayer("view_epoch")]);
              case 2:
                _yield$Promise$all3 = _context8.sent;
                _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 8);
                a = _yield$Promise$all4[0];
                e = _yield$Promise$all4[1];
                f = _yield$Promise$all4[2];
                i = _yield$Promise$all4[3];
                s = _yield$Promise$all4[4];
                m = _yield$Promise$all4[5];
                cookieGaId = _yield$Promise$all4[6];
                view_epoch = _yield$Promise$all4[7];
                body = {
                  cookieGaId: cookieGaId,
                  lc: 2,
                  view_epoch: view_epoch,
                  a: a,
                  e: e,
                  f: f,
                  i: i,
                  s: s,
                  m: m
                };
                GlovBeacon_logger.log("Update log data: ", body);
                return _context8.abrupt("return", new Blob([JSON.stringify(body)], HEADERS));
              case 15:
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



function BeagleApplyActions_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = BeagleApplyActions_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (_e2) { function e(_x11) { return _e2.apply(this, arguments); } e.toString = function () { return _e2.toString(); }; return e; }(function (e) { throw e; }), f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function (_e3) { function e(_x12) { return _e3.apply(this, arguments); } e.toString = function () { return _e3.toString(); }; return e; }(function (e) { didErr = true; err = e; }), f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
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
                  originalTitle,
                  n1,
                  n2,
                  scriptID,
                  source,
                  destination,
                  res,
                  _i,
                  _Array$from,
                  _e$innerText,
                  _e,
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
                                logger.log("catching event tabchange..");
                                originalTitle = window.top.document.title;
                                handleDocumentTitleTabChange(e, value, originalTitle);
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
                          _context.next = 166;
                          break;
                        }
                        logger.log("Injecting script: ", value);
                        scriptID = getUnsecureHash(value);
                        if (window.top.document.getElementById(scriptID)) {
                          logger.log("Script already in page!");
                        } else element.append("<script id=".concat(scriptID, ">").concat(value, "</script>"));
                        _context.next = 225;
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
                        _context.next = 225;
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
                        _context.next = 225;
                        break;
                      case 180:
                        if (!(operator === "text-transform")) {
                          _context.next = 199;
                          break;
                        }
                        _context.t4 = type;
                        _context.next = _context.t4 === "capitalize" ? 184 : 195;
                        break;
                      case 184:
                        _i = 0, _Array$from = Array.from(element);
                      case 185:
                        if (!(_i < _Array$from.length)) {
                          _context.next = 194;
                          break;
                        }
                        _e = _Array$from[_i];
                        if (!((_e$innerText = _e.innerText) !== null && _e$innerText !== void 0 && _e$innerText.includes("\n"))) {
                          _context.next = 190;
                          break;
                        }
                        _e.innerText = turkishToLower(_e.innerText).split("\n").map(function (sentence) {
                          return sentence.split(" ").map(function (word) {
                            return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                          }).join(" ");
                        }).join("\n");
                        return _context.abrupt("continue", 191);
                      case 190:
                        _e.innerText = turkishToLower(_e.innerText).split(" ").map(function (word) {
                          return word.charAt(0).toLocaleUpperCase() + word.slice(1);
                        }).join(" ");
                      case 191:
                        _i++;
                        _context.next = 185;
                        break;
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
        var id, actions, eligibilityRuleSet, device, businessRuleSet, helpers, dependant_on_treatment, mode, debugMode, debugFilteredTreatments, engagementLock, identifier, isMobile, matchedTreatments, apply, release, businessRuleId, randomPctPromise, _yield$prepareActions, _yield$prepareActions2, preparedActions, variant, isEligible, _iterator2, _step2, action, eligibleElements, randomPct, skipRatio;
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
                  _context2.next = 78;
                  break;
                }
                businessRuleId = null;
                randomPctPromise = determinePct(id + identifier);
                if (!businessRuleSet) {
                  _context2.next = 30;
                  break;
                }
                GlovRobotEngine_logger.log("Starting sub variant rule set check for treatment: " + id);
                _context2.next = 28;
                return this.checkBusinessRules(businessRuleSet);
              case 28:
                businessRuleId = _context2.sent;
                if (businessRuleId !== null) {
                  GlovRobotEngine_logger.log("Applying business rule transformation with id: ", businessRuleId);
                } else GlovRobotEngine_logger.log("Applying treatment with default values");
              case 30:
                _context2.next = 32;
                return prepareActions(identifier, actions, businessRuleId, debugMode);
              case 32:
                _yield$prepareActions = _context2.sent;
                _yield$prepareActions2 = _slicedToArray(_yield$prepareActions, 2);
                preparedActions = _yield$prepareActions2[0];
                variant = _yield$prepareActions2[1];
                isEligible = null;
                _iterator2 = GlovRobotEngine_createForOfIteratorHelper(preparedActions);
                _context2.prev = 38;
                _iterator2.s();
              case 40:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 54;
                  break;
                }
                action = _step2.value;
                if (action.condition) {
                  _context2.next = 44;
                  break;
                }
                return _context2.abrupt("continue", 52);
              case 44:
                _context2.next = 46;
                return action_condition_util(action.condition);
              case 46:
                eligibleElements = _context2.sent;
                if (!eligibleElements.length) {
                  _context2.next = 51;
                  break;
                }
                action.eligibleElements = eligibleElements;
                isEligible = true;
                return _context2.abrupt("continue", 52);
              case 51:
                isEligible = isEligible || false;
              case 52:
                _context2.next = 40;
                break;
              case 54:
                _context2.next = 59;
                break;
              case 56:
                _context2.prev = 56;
                _context2.t1 = _context2["catch"](38);
                _iterator2.e(_context2.t1);
              case 59:
                _context2.prev = 59;
                _iterator2.f();
                return _context2.finish(59);
              case 62:
                if (!(isEligible === false)) {
                  _context2.next = 64;
                  break;
                }
                return _context2.abrupt("return");
              case 64:
                addTreatment(id, businessRuleId, variant, "eligible", dependant_on_treatment);
                _context2.next = 67;
                return randomPctPromise;
              case 67:
                randomPct = _context2.sent;
                skipRatio = mode === "lab" ? LAB_SKIP_RATIO : CHAMP_SKIP_RATIO;
                if (!(!debugMode > 0 && (!this.isOn || mode === "lab" && this.isChamp || mode === "champion" && !this.isChamp || randomPct < skipRatio))) {
                  _context2.next = 72;
                  break;
                }
                addTreatment(id, businessRuleId, variant, "ignored", dependant_on_treatment);
                return _context2.abrupt("return");
              case 72:
                _context2.next = 74;
                return apply(id, preparedActions, businessRuleId, variant, dependant_on_treatment);
              case 74:
                _context2.next = 76;
                return this.engageHelpers(helpers, matchedTreatments);
              case 76:
                _context2.next = 79;
                break;
              case 78:
                GlovRobotEngine_logger.failed("Rule check failed for treatment:", id);
              case 79:
                _context2.prev = 79;
                release();
                this.addReapplyEvent(treatment);
                this.addRuleSetDataListeners(treatment);
                return _context2.finish(79);
              case 84:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6,, 79, 84], [38, 56, 59, 62]]);
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
                  _context4.next = 11;
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
                return _context4.abrupt("return");
              case 11:
                _context4.next = 13;
                return BeagleApplyActions(preparedActions);
              case 13:
                res = _context4.sent;
                if (!(res === true)) {
                  _context4.next = 22;
                  break;
                }
                _context4.next = 17;
                return getFromBeagleInfoLayer("f");
              case 17:
                failed = _context4.sent;
                if (failed[id]) {
                  delete failed[id];
                  addToBeagleInfoLayer("f", failed);
                }
                addTreatment(id, businessRuleId, variant, "applied", dependant_on_treatment);
                _context4.next = 29;
                break;
              case 22:
                if (!(res === false)) {
                  _context4.next = 29;
                  break;
                }
                _context4.next = 25;
                return getFromBeagleInfoLayer("a");
              case 25:
                _applied = _context4.sent;
                if (!_applied[id]) {
                  _context4.next = 28;
                  break;
                }
                return _context4.abrupt("return");
              case 28:
                addTreatment(id, businessRuleId, variant, "failed", dependant_on_treatment);
              case 29:
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
          case "tabchange":
            {
              document.addEventListener("visibilitychange", function (event) {
                var _iterator13 = GlovRobotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step13;
                try {
                  for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                    var _treatment = _step13.value;
                    GlovRobotEngine_logger.log("Retrying treatment ".concat(_treatment.id, " from tabchange"));
                    _this2.engageRobot(_treatment);
                  }
                } catch (err) {
                  _iterator13.e(err);
                } finally {
                  _iterator13.f();
                }
              });
              break;
            }
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
        var _treatment$eligibilit, eligibilityRuleSet, _treatment$businessRu, businessRuleSet, id, selectors, boundEngageTreatment, _iterator14, _step14, selector;
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
                _iterator14 = GlovRobotEngine_createForOfIteratorHelper(selectors);
                try {
                  for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                    selector = _step14.value;
                    addDataListener("__eRules.".concat(selector), boundEngageTreatment);
                  }
                } catch (err) {
                  _iterator14.e(err);
                } finally {
                  _iterator14.f();
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
      var _iterator15 = GlovRobotEngine_createForOfIteratorHelper(ruleSet),
        _step15;
      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var rule = _step15.value;
          if (typeof rule === "string") {
            if (rule.startsWith("!")) rule = rule.slice(1);
            selectors.push(rule.split(".")[0]);
            continue;
          }
          this.extractDataListenerSelectors(rule.set, selectors);
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
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
          _iterator16,
          _step16,
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
                _iterator16 = GlovRobotEngine_createForOfIteratorHelper(eligibilityRuleSet);
                _context8.prev = 8;
                _iterator16.s();
              case 10:
                if ((_step16 = _iterator16.n()).done) {
                  _context8.next = 57;
                  break;
                }
                eligibilityRule = _step16.value;
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
                _iterator16.e(_context8.t3);
              case 62:
                _context8.prev = 62;
                _iterator16.f();
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
        var _iterator17, _step17, _step17$value, index, businessRule;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iterator17 = GlovRobotEngine_createForOfIteratorHelper(businessRuleSet.entries());
                _context9.prev = 1;
                _iterator17.s();
              case 3:
                if ((_step17 = _iterator17.n()).done) {
                  _context9.next = 11;
                  break;
                }
                _step17$value = _slicedToArray(_step17.value, 2), index = _step17$value[0], businessRule = _step17$value[1];
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
                _iterator17.e(_context9.t0);
              case 16:
                _context9.prev = 16;
                _iterator17.f();
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
;// CONCATENATED MODULE: ./src/BeagleRuleEngine/documentChecker.js


var documentChecker_logger = new src_logger("BeagleDocumentChecker");
var checkDocumentRule = function checkDocumentRule(rule) {
  documentChecker_logger.log("Checking rule for operator: ", rule.operator);
  var operator = rule.operator,
    condition = rule.condition,
    value = rule.value;
  if (operator === "visibilitychange") {
    return conditionChecker(window.document.visibilityState, condition, value);
  }
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
                _context2.next = _context2.t0 === "session" ? 5 : _context2.t0 === "element" ? 7 : _context2.t0 === "dataLayer" ? 9 : _context2.t0 === "url" ? 13 : _context2.t0 === "function" ? 15 : _context2.t0 === "environment" ? 17 : _context2.t0 === "productInfoLookup" ? 19 : _context2.t0 === "document" ? 23 : 27;
                break;
              case 5:
                ruleSatisfied = checkSessionRule(rule);
                return _context2.abrupt("break", 29);
              case 7:
                ruleSatisfied = checkElementRule(rule);
                return _context2.abrupt("break", 29);
              case 9:
                _context2.next = 11;
                return checkDataLayerRule(rule);
              case 11:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 29);
              case 13:
                ruleSatisfied = checkUrlRule(rule);
                return _context2.abrupt("break", 29);
              case 15:
                ruleSatisfied = checkFunctionRule(rule);
                return _context2.abrupt("break", 29);
              case 17:
                ruleSatisfied = checkEnvRule(rule);
                return _context2.abrupt("break", 29);
              case 19:
                _context2.next = 21;
                return checkProductInfoRule(rule);
              case 21:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 29);
              case 23:
                _context2.next = 25;
                return checkDocumentRule(rule);
              case 25:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 29);
              case 27:
                BeagleRuleEngine_logger.failed("No such rule type: ".concat(type));
                return _context2.abrupt("return", null);
              case 29:
                if (!chain) {
                  _context2.next = 55;
                  break;
                }
                _context2.t1 = chain_condition;
                _context2.next = _context2.t1 === "and" ? 33 : _context2.t1 === "or" ? 40 : _context2.t1 === "xor" ? 47 : 53;
                break;
              case 33:
                _context2.t2 = ruleSatisfied;
                if (!_context2.t2) {
                  _context2.next = 38;
                  break;
                }
                _context2.next = 37;
                return this.checkRule(chain);
              case 37:
                _context2.t2 = _context2.sent;
              case 38:
                ruleSatisfied = _context2.t2;
                return _context2.abrupt("break", 55);
              case 40:
                _context2.t3 = ruleSatisfied;
                if (_context2.t3) {
                  _context2.next = 45;
                  break;
                }
                _context2.next = 44;
                return this.checkRule(chain);
              case 44:
                _context2.t3 = _context2.sent;
              case 45:
                ruleSatisfied = _context2.t3;
                return _context2.abrupt("break", 55);
              case 47:
                _context2.t4 = ruleSatisfied;
                _context2.next = 50;
                return this.checkRule(chain);
              case 50:
                _context2.t5 = _context2.sent;
                ruleSatisfied = _context2.t4 != _context2.t5;
                return _context2.abrupt("break", 55);
              case 53:
                BeagleRuleEngine_logger.failed("No such chain condition");
                return _context2.abrupt("break", 55);
              case 55:
                return _context2.abrupt("return", ruleSatisfied ? rule.name || true : false);
              case 56:
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
          if (!(pageType === "Purchase")) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDLHlCQUF5QixTQUFTLHlCQUF5Qjs7Ozs7OztBQ3JUakc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRyxFQUFFLHlCQUF5QixTQUFTLHlCQUF5QjtBQUNoRTtBQUNBLDBCQUEwQix5QkFBeUIsU0FBUyx5QkFBeUI7Ozs7Ozs7QUNUckY7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLEVBQStCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7Ozs7Ozs7O0FDQTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7QUM3QmU7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIOztBQ1JlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FDSmtDO0FBQ25CO0FBQ2YsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsUUFBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FDVmtDO0FBQ1M7QUFDNUI7QUFDZixZQUFZLFlBQVc7QUFDdkIsU0FBUyxPQUFPO0FBQ2hCOztBQ0wrQztBQUMvQztBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsY0FBYTtBQUMvQztBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQ2pCTyxJQUFNQSxVQUFVLEdBQUcsU0FBYkEsVUFBVSxDQUFJQyxHQUFHLEVBQUVDLElBQUksRUFBbUI7RUFBQSxJQUFqQkMsT0FBTyx1RUFBRyxFQUFFO0VBQ2hELElBQUksQ0FBQ0YsR0FBRyxFQUFFLE9BQU8sRUFBRTtFQUVuQixJQUFNRyxLQUFLLEdBQUdILEdBQUcsQ0FBQ0ksT0FBTyxDQUFDSCxJQUFJLENBQUM7RUFDL0IsSUFBSUUsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPSCxHQUFHO0VBRXpCLE9BQU9BLEdBQUcsQ0FBQ0ksT0FBTyxDQUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDN0IsSUFBTUUsTUFBSyxHQUFHSCxHQUFHLENBQUNJLE9BQU8sQ0FBQ0gsSUFBSSxDQUFDO0lBQy9CRCxHQUFHLEdBQUcsQ0FBQ0csTUFBSyxHQUFHLENBQUMsR0FBR0gsR0FBRyxDQUFDSyxTQUFTLENBQUMsQ0FBQyxFQUFFRixNQUFLLENBQUMsR0FBRyxFQUFFLElBQUlELE9BQU8sR0FBR0YsR0FBRyxDQUFDSyxTQUFTLENBQUNGLE1BQUssR0FBR0YsSUFBSSxDQUFDSyxNQUFNLENBQUM7RUFDakc7RUFFQSxPQUFPTixHQUFHO0FBQ1osQ0FBQztBQUVNLElBQU1PLGNBQWMsR0FBRyxTQUFqQkEsY0FBYyxDQUFJUCxHQUFHLEVBQUs7RUFDckMsSUFBSSxDQUFDQSxHQUFHLElBQUksT0FBT0EsR0FBRyxLQUFLLFFBQVEsRUFBRSxPQUFPQSxHQUFHO0VBQy9DLElBQUlRLE1BQU0sR0FBR1IsR0FBRztFQUNoQixJQUFNUyxPQUFPLEdBQUc7SUFBQyxHQUFHLEVBQUUsR0FBRztJQUFFLEdBQUcsRUFBRSxHQUFHO0lBQUUsR0FBRyxFQUFFLEdBQUc7SUFBRSxHQUFHLEVBQUUsR0FBRztJQUFFLEdBQUcsRUFBRSxHQUFHO0lBQUUsR0FBRyxFQUFFLEdBQUc7SUFBRSxHQUFHLEVBQUU7RUFBRyxDQUFDO0VBQ3RGRCxNQUFNLEdBQUdBLE1BQU0sQ0FBQ04sT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVNRLE1BQU0sRUFBRTtJQUN6RCxPQUFPRCxPQUFPLENBQUNDLE1BQU0sQ0FBQztFQUN4QixDQUFDLENBQUM7RUFDRixPQUFPRixNQUFNLENBQUNHLFdBQVcsRUFBRTtBQUM3QixDQUFDOztBQ3RCRDtBQUN5QztBQUN6QyxJQUFNQyxTQUFTLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSTtBQUVsRyxJQUFNQyxPQUFPLEdBQUcsVUFBVTtBQUMxQixJQUFNQyxXQUFXLEdBQUcsS0FBSztBQUN6QixJQUFNQyxtQkFBbUIsR0FBRyw0Q0FBNEM7QUFDeEUsSUFBTUMsMEJBQTBCLEdBQUdSLFNBQVMsR0FBRyxnREFBZ0QsR0FBRywwQ0FBMEM7QUFDNUksSUFBTVMsbUJBQW1CLEdBQUdULFNBQVMsR0FBRyxpREFBaUQsd0RBQWlEYixVQUFVLENBQUMsSUFBSXVCLElBQUksRUFBRSxDQUFDQyxXQUFXLEVBQUUsQ0FBQ2xCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFFO0FBQzNOLElBQU1zQixnQkFBZ0IsR0FBRyxtREFBbUQ7QUFDNUUsSUFBTUMscUJBQXFCLEdBQUcsZ0RBQWdEO0FBQzlFLElBQU1DLFdBQVcsR0FBRywrREFBK0Q7QUFDbkYsSUFBTUMsY0FBYyxHQUFHLGlDQUFpQztBQUN4RCxJQUFNQyxrQkFBa0IsR0FBRyxvQkFBb0I7QUFDdEQ7QUFDTyxJQUFNQyxXQUFXLEdBQUcsRUFBRTtBQUN0QixJQUFNQyxTQUFTLEdBQUcsRUFBRTtBQUMzQjtBQUNPLElBQU1DLGdCQUFnQixHQUFHLEVBQUU7QUFDM0IsSUFBTUMsY0FBYyxHQUFHLEVBQUU7QUFDekIsSUFBTUMsdUJBQXVCLEdBQUcsQ0FBQztBQUNqQyxJQUFNQyxxQkFBcUIsR0FBRyxpREFBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLHdCQUF3QixFQUM5Ryx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztBQUNwRyxJQUFNQyxZQUFZLEdBQUcsS0FBSztBQUUxQixJQUFNQyxvQkFBb0IsR0FBRztFQUNsQ0MsaUJBQWlCLEVBQUUscUJBQXFCO0VBQ3hDQyxlQUFlLEVBQUUsbUJBQW1CO0VBQ3BDQyxrQkFBa0IsRUFBRSxxQkFBcUI7RUFDekNDLGVBQWUsRUFBRSxzQkFBc0I7RUFDdkNDLGdCQUFnQixFQUFFLG9CQUFvQjtFQUN0Q0Msa0JBQWtCLEVBQUU7QUFDdEIsQ0FBQztBQUNNLElBQU1DLGtCQUFrQixHQUFHO0VBQ2hDQyxVQUFVLEVBQUUsZUFBZTtFQUMzQkMsT0FBTyxFQUFFLFlBQVk7RUFDckJDLGlCQUFpQixFQUFFLFlBQVk7RUFDL0JDLFVBQVUsRUFBRSxVQUFVO0VBQ3RCQyxPQUFPLEVBQUUsY0FBYztFQUN2QkMseUJBQXlCLEVBQUUsdUJBQXVCO0VBQ2xEQyxRQUFRLEVBQUUsYUFBYTtFQUN2QkMsV0FBVyxFQUFFLGdCQUFnQjtFQUM3QmxDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFFTSxJQUFNbUMscUJBQXFCLEdBQUcsU0FBUzs7Ozs7QUM3Q0M7QUFBQSxJQUN6Q0MsTUFBTTtFQUNWLGtCQUEyRDtJQUFBLElBQS9DQyxNQUFNLHVFQUFHLG1CQUFtQjtJQUFBLElBQUVDLE9BQU8sdUVBQUcsS0FBSztJQUFBO0lBQ3ZELElBQUksQ0FBQ0QsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUlDLE9BQU8sRUFBRTtNQUNYLElBQUksQ0FBQ0MsS0FBSyxHQUFHLENBQUM7SUFDaEIsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDQSxLQUFLLEdBQUczQyxNQUFNLENBQUM0QyxZQUFZLENBQUNDLE9BQU8sQ0FBQ2YsNkJBQTZCLENBQUM7SUFDekU7RUFDRjtFQUFDO0lBQUE7SUFBQSxPQUVELGdCQUFjO01BQUE7TUFDWixJQUFPVyxNQUFNLEdBQUksSUFBSSxDQUFkQSxNQUFNO01BQVMsa0NBRGhCSyxJQUFJO1FBQUpBLElBQUk7TUFBQTtNQUVWLFlBQUFDLE9BQU8sRUFBQ0MsSUFBSSw2QkFBS1AsTUFBTSxlQUFRSyxJQUFJLEVBQUM7SUFDdEM7RUFBQztJQUFBO0lBQUEsT0FFRCxlQUFhO01BQ1gsSUFBT0gsS0FBSyxHQUFZLElBQUksQ0FBckJBLEtBQUs7UUFBRUYsTUFBTSxHQUFJLElBQUksQ0FBZEEsTUFBTTtNQUNwQixJQUFJRSxLQUFLLEVBQUU7UUFBQTtRQUFBLG1DQUZORyxJQUFJO1VBQUpBLElBQUk7UUFBQTtRQUdQLGFBQUFDLE9BQU8sRUFBQ0UsR0FBRyw4QkFBS1IsTUFBTSxlQUFRSyxJQUFJLEVBQUM7TUFDckM7SUFDRjtFQUFDO0lBQUE7SUFBQSxPQUVELGtCQUFnQjtNQUFBO01BQ2QsSUFBT0gsS0FBSyxHQUFZLElBQUksQ0FBckJBLEtBQUs7UUFBRUYsTUFBTSxHQUFJLElBQUksQ0FBZEEsTUFBTTtNQUNwQixJQUFJLENBQUNFLEtBQUssRUFBRTtNQUNaLElBQUlPLGFBQWEsR0FBRyxTQUFTO01BQUMsbUNBSHRCSixJQUFJO1FBQUpBLElBQUk7TUFBQTtNQUtaQSxJQUFJLENBQUNLLE9BQU8sQ0FBQyxVQUFDQyxRQUFRLEVBQUs7UUFDekIsSUFBTUMsSUFBSSxHQUFHLFFBQU9ELFFBQVE7UUFDNUIsUUFBUUMsSUFBSTtVQUNWLEtBQUssUUFBUTtVQUNiLEtBQUssUUFBUTtVQUNiLEtBQUssU0FBUztZQUNaSCxhQUFhLElBQUksT0FBTztZQUN4QjtVQUVGLEtBQUssUUFBUTtZQUNYQSxhQUFhLElBQUksT0FBTztZQUN4QjtVQUVGLEtBQUssUUFBUTtVQUNiLEtBQUssV0FBVztVQUNoQjtZQUNFQSxhQUFhLElBQUksT0FBTztRQUFDO01BRS9CLENBQUMsQ0FBQztNQUNGLGFBQUFILE9BQU8sRUFBQ0UsR0FBRyxtQkFBQ0MsYUFBYSxFQUFFLFlBQVksYUFBTVQsTUFBTSxlQUFRSyxJQUFJLEVBQUM7SUFDbEU7RUFBQztJQUFBO0lBQUEsT0FFRCxtQkFBaUI7TUFBQTtNQUNmLElBQU9ILEtBQUssR0FBWSxJQUFJLENBQXJCQSxLQUFLO1FBQUVGLE1BQU0sR0FBSSxJQUFJLENBQWRBLE1BQU07TUFDcEIsSUFBSSxDQUFDRSxLQUFLLEVBQUU7TUFDWixJQUFJTyxhQUFhLEdBQUcsU0FBUztNQUFDLG1DQUhyQkosSUFBSTtRQUFKQSxJQUFJO01BQUE7TUFLYkEsSUFBSSxDQUFDSyxPQUFPLENBQUMsVUFBQ0MsUUFBUSxFQUFLO1FBQ3pCLElBQU1DLElBQUksR0FBRyxRQUFPRCxRQUFRO1FBQzVCLFFBQVFDLElBQUk7VUFDVixLQUFLLFFBQVE7VUFDYixLQUFLLFFBQVE7VUFDYixLQUFLLFNBQVM7WUFDWkgsYUFBYSxJQUFJLE9BQU87WUFDeEI7VUFFRixLQUFLLFFBQVE7WUFDWEEsYUFBYSxJQUFJLE9BQU87WUFDeEI7VUFFRixLQUFLLFFBQVE7VUFDYixLQUFLLFdBQVc7VUFDaEI7WUFDRUEsYUFBYSxJQUFJLE9BQU87UUFBQztNQUUvQixDQUFDLENBQUM7TUFDRixhQUFBSCxPQUFPLEVBQUNFLEdBQUcsbUJBQUNDLGFBQWEsRUFBRSxjQUFjLGFBQU1ULE1BQU0sZUFBUUssSUFBSSxFQUFDO0lBQ3BFO0VBQUM7SUFBQTtJQUFBLE9BRUQsZ0JBQWM7TUFBQTtNQUNaLElBQU9MLE1BQU0sR0FBSSxJQUFJLENBQWRBLE1BQU07TUFBUyxtQ0FEaEJLLElBQUk7UUFBSkEsSUFBSTtNQUFBO01BRVYsYUFBQUMsT0FBTyxFQUFDTyxJQUFJLDhCQUFLYixNQUFNLGVBQVFLLElBQUksRUFBQztJQUN0QztFQUFDO0lBQUE7SUFBQSxPQUVELGlCQUFlO01BQUE7TUFDYixJQUFPTCxNQUFNLEdBQUksSUFBSSxDQUFkQSxNQUFNO01BQVMsbUNBRGZLLElBQUk7UUFBSkEsSUFBSTtNQUFBO01BRVgsYUFBQUMsT0FBTyxFQUFDUSxLQUFLLDhCQUFLZCxNQUFNLGVBQVFLLElBQUksRUFBQztJQUN2QztFQUFDO0VBQUE7QUFBQTtBQUdILCtDQUFlTixNQUFNOztBQ3hGTjtBQUNmO0FBQ0E7O0FDRmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsWUFBWSw2RUFBNkU7QUFDakc7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QmU7QUFDZjtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQ05xRDtBQUN0QztBQUNmO0FBQ0Esb0NBQW9DLGlCQUFnQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxzRkFBc0YsaUJBQWdCO0FBQ3RHOztBQ1JlO0FBQ2Y7QUFDQTs7QUNGaUQ7QUFDWTtBQUNZO0FBQ3RCO0FBQ3BDO0FBQ2YsU0FBUyxlQUFjLFNBQVMscUJBQW9CLFlBQVksMkJBQTBCLFlBQVksZ0JBQWU7QUFDckg7O0FDTnFEO0FBQ3RDO0FBQ2YsaUNBQWlDLGlCQUFnQjtBQUNqRDs7QUNIZTtBQUNmO0FBQ0E7O0FDRmU7QUFDZjtBQUNBOztBQ0Z1RDtBQUNKO0FBQ3NCO0FBQ2xCO0FBQ3hDO0FBQ2YsU0FBUyxrQkFBaUIsU0FBUyxnQkFBZSxTQUFTLDJCQUEwQixTQUFTLGtCQUFpQjtBQUMvRzs7QUNOK0M7QUFDaEM7QUFDZixRQUFRLGNBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZEE7QUFDdUQ7QUFVbEM7QUFDUztBQUU5QixJQUFNaUIsTUFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsYUFBYSxDQUFDO0FBQ3hDLElBQU1rQixNQUFNLEdBQUc7RUFDYixNQUFNLEVBQUUsQ0FBQztFQUNULE9BQU8sRUFBRSxDQUFDO0VBQ1YsTUFBTSxFQUFFLENBQUM7RUFDVCxPQUFPLEVBQUUsQ0FBQztFQUNWLE9BQU8sRUFBRSxDQUFDO0VBQ1YsU0FBUyxFQUFFLENBQUM7RUFDWixRQUFRLEVBQUUsQ0FBQztFQUNYLFNBQVMsRUFBRSxDQUFDO0VBQ1osT0FBTyxFQUFFLENBQUM7RUFDVixNQUFNLEVBQUUsQ0FBQztFQUNULE9BQU8sRUFBRSxFQUFFO0VBQ1gsUUFBUSxFQUFFO0FBQ1osQ0FBQztBQUVNLElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0IsR0FBUztFQUN0QzNELE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQztFQUNqRWhFLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUNuRSxDQUFDO0FBRU0sSUFBTUMsZUFBZTtFQUFBLHNFQUFHO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBLElBQ3hCakUsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDRyxRQUFRLENBQUMsV0FBVyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUNsRUMsRUFBRSxHQUFHTixRQUFRLENBQUNPLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDMUNELEVBQUUsQ0FBQ0UsV0FBVyx3NkJBdUJaO1lBQ0ZyRSxNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDUSxPQUFPLENBQUNILEVBQUUsQ0FBQztZQUMvQ25FLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ1EsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUM5RHZFLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQztVQUFDO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ25FO0VBQUEsZ0JBOUJZQyxlQUFlO0lBQUE7RUFBQTtBQUFBLEdBOEIzQjtBQUVNLElBQU1PLGVBQWU7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUUzQmYsTUFBTSxDQUFDUixHQUFHLENBQUMscUJBQXFCLENBQUM7WUFBQztZQUFBLE9BQ1R3QixTQUFTLENBQUNuRSxtQkFBbUIsQ0FBQztVQUFBO1lBQWpEb0UsVUFBVTtZQUFBLElBQ1hBLFVBQVU7Y0FBQTtjQUFBO1lBQUE7WUFBQSxNQUFRLElBQUlDLEtBQUssRUFBRTtVQUFBO1lBQUE7WUFBQSxPQUNORCxVQUFVLENBQUNFLElBQUksRUFBRTtVQUFBO1lBQXZDQyxhQUFhO1lBQUEsa0NBQ1pBLGFBQWE7VUFBQTtZQUFBO1lBQUE7WUFFcEJwQixNQUFNLENBQUNxQixNQUFNLENBQUMsNEJBQTRCLEVBQUUsYUFBSUMsT0FBTyxDQUFDO1lBQUMsa0NBQ2xELElBQUk7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUVkO0VBQUEsZ0JBWFlQLGVBQWU7SUFBQTtFQUFBO0FBQUEsR0FXM0I7QUFFTSxJQUFNUSxxQkFBcUI7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUVqQ3ZCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixDQUFDO1lBQUM7WUFBQSxPQUNWd0IsU0FBUyxDQUFDbEUsMEJBQTBCLENBQUM7VUFBQTtZQUE5RDBFLGdCQUFnQjtZQUFBLElBQ2pCQSxnQkFBZ0I7Y0FBQTtjQUFBO1lBQUE7WUFBQSxNQUFRLElBQUlOLEtBQUssRUFBRTtVQUFBO1lBQUE7WUFBQSxPQUNMTSxnQkFBZ0IsQ0FBQ0wsSUFBSSxFQUFFO1VBQUE7WUFBcERNLG9CQUFvQjtZQUFBLGtDQUNuQkEsb0JBQW9CO1VBQUE7WUFBQTtZQUFBO1lBRTNCekIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLG1DQUFtQyxFQUFFLGFBQUlDLE9BQU8sQ0FBQztZQUFDLGtDQUN6RCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQVhZQyxxQkFBcUI7SUFBQTtFQUFBO0FBQUEsR0FXakM7QUFFTSxJQUFNRyxxQkFBcUI7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUVqQzFCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixDQUFDO1lBQUM7WUFBQSxPQUNWd0IsU0FBUyxDQUFDOUQsZ0JBQWdCLENBQUM7VUFBQTtZQUFwRHlFLGdCQUFnQjtZQUFBLElBQ2pCQSxnQkFBZ0I7Y0FBQTtjQUFBO1lBQUE7WUFBQSxNQUFRLElBQUlULEtBQUssRUFBRTtVQUFBO1lBQUE7WUFBQSxPQUNMUyxnQkFBZ0IsQ0FBQ1IsSUFBSSxFQUFFO1VBQUE7WUFBcERTLG9CQUFvQjtZQUFBLGtDQUNuQkEsb0JBQW9CO1VBQUE7WUFBQTtZQUFBO1lBRTNCNUIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLG1DQUFtQyxFQUFFLGFBQUlDLE9BQU8sQ0FBQztZQUFDLGtDQUN6RCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQVhZSSxxQkFBcUI7SUFBQTtFQUFBO0FBQUEsR0FXakM7QUFFTSxJQUFNRyxnQkFBZ0I7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUU1QjdCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLHVCQUF1QixDQUFDO1lBQUM7WUFBQSxPQUNWd0IsU0FBUyxDQUFDN0QscUJBQXFCLENBQUM7VUFBQTtZQUFwRDJFLFdBQVc7WUFBQSxJQUNaQSxXQUFXO2NBQUE7Y0FBQTtZQUFBO1lBQUEsTUFBUSxJQUFJWixLQUFLLEVBQUU7VUFBQTtZQUFBO1lBQUEsT0FDTFksV0FBVyxDQUFDWCxJQUFJLEVBQUU7VUFBQTtZQUExQ1ksZUFBZTtZQUFBLGtDQUNkQSxlQUFlO1VBQUE7WUFBQTtZQUFBO1lBRXRCL0IsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDhCQUE4QixFQUFFLGFBQUlDLE9BQU8sQ0FBQztZQUFDLGtDQUNwRCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQVhZTyxnQkFBZ0I7SUFBQTtFQUFBO0FBQUEsR0FXNUI7QUFFRCxJQUFNRyxhQUFPLEdBQUcsU0FBVkEsT0FBTyxDQUFJQyxJQUFJLEVBQUs7RUFDeEIsSUFBTUMsVUFBVSxHQUFHLElBQUlDLGVBQWUsRUFBRTtFQUN4QyxJQUFNQyxTQUFTLEdBQUdDLFVBQVUsQ0FBQztJQUFBLE9BQU1ILFVBQVUsQ0FBQ0ksS0FBSyxFQUFFO0VBQUEsR0FBRUwsSUFBSSxDQUFDO0VBQzVELE9BQU87SUFBQ0MsVUFBVSxFQUFWQSxVQUFVO0lBQUVFLFNBQVMsRUFBVEE7RUFBUyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxJQUFNcEIsU0FBUyxHQUFHLFNBQVpBLFNBQVMsQ0FBSXVCLEdBQUcsRUFBZ0M7RUFBQSxJQUE5QkMsT0FBTyx1RUFBRyxDQUFDLENBQUM7RUFBQSxJQUFFQyxPQUFPLHVFQUFHLENBQUM7RUFDL0MsZUFBZ0NULGFBQU8sQ0FBQyxJQUFJLENBQUM7SUFBdENFLFVBQVUsWUFBVkEsVUFBVTtJQUFFRSxTQUFTLFlBQVRBLFNBQVM7RUFDNUIsT0FBT00sS0FBSyxDQUFDSCxHQUFHLGtDQUFNQyxPQUFPO0lBQUVHLE1BQU0sRUFBRVQsVUFBVSxDQUFDUztFQUFNLEdBQUUsQ0FDckRDLElBQUksQ0FBQyxVQUFDQyxHQUFHLEVBQUs7SUFDYixJQUFJQSxHQUFHLENBQUNDLEVBQUUsRUFBRTtNQUNWQyxZQUFZLENBQUNYLFNBQVMsQ0FBQztNQUN2QixPQUFPUyxHQUFHO0lBQ1o7SUFDQSxJQUFJSixPQUFPLEdBQUcsQ0FBQyxFQUFFO01BQ2ZNLFlBQVksQ0FBQ1gsU0FBUyxDQUFDO01BQ3ZCLE9BQU9wQixTQUFTLENBQUN1QixHQUFHLEVBQUVDLE9BQU8sRUFBRUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM3QztJQUNBLE1BQU0sSUFBSXZCLEtBQUssQ0FBQzJCLEdBQUcsQ0FBQ0csTUFBTSxDQUFDO0VBQzdCLENBQUMsQ0FBQyxDQUNEQyxLQUFLLENBQUMsVUFBQ25ELEtBQUssRUFBSztJQUNoQixJQUFJMkMsT0FBTyxHQUFHLENBQUMsRUFBRTtNQUNmekMsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLCtCQUErQixFQUFFdkIsS0FBSyxDQUFDd0IsT0FBTyxDQUFDO01BQzdEeUIsWUFBWSxDQUFDWCxTQUFTLENBQUM7TUFDdkIsT0FBT3BCLFNBQVMsQ0FBQ3VCLEdBQUcsRUFBRUMsT0FBTyxFQUFFQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzdDO0lBQ0F6QyxNQUFNLENBQUNxQixNQUFNLENBQUMsZ0JBQWdCLEVBQUV2QixLQUFLLENBQUN3QixPQUFPLENBQUM7SUFDOUN5QixZQUFZLENBQUNYLFNBQVMsQ0FBQztJQUN2QixPQUFPLElBQUk7RUFDYixDQUFDLENBQUM7QUFDUixDQUFDO0FBRU0sSUFBTWMsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUF1QixDQUFJQyxZQUFZLEVBQUVDLFVBQVUsRUFBSztFQUNuRSxJQUFJLENBQUNELFlBQVksRUFBRTtJQUNqQixPQUFPLElBQUk7RUFDYjtFQUVBLElBQU1FLE1BQU0sR0FBR0YsWUFBWSxDQUN0QkcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNWQyxHQUFHLENBQUMsVUFBQ0MsQ0FBQztJQUFBLE9BQUtBLENBQUMsQ0FBQ0YsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUFBLEVBQUMsQ0FDeEJHLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUVGLENBQUMsRUFBSztJQUNsQixJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtNQUNoQkUsR0FBRyxDQUFDQyxrQkFBa0IsQ0FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUdELGtCQUFrQixDQUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLElBQUksRUFBRSxDQUFDO0lBQ3hFO0lBQ0EsT0FBT0YsR0FBRztFQUNaLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUVWLElBQUlHLFVBQVUsR0FBR1IsTUFBTSxDQUFDRCxVQUFVLENBQUM7RUFDbkMsSUFBSSxDQUFDUyxVQUFVLEVBQUU7SUFDZixPQUFPLElBQUk7RUFDYjtFQUNBLElBQUlULFVBQVUsS0FBSyxLQUFLLEVBQUU7SUFDeEI7SUFDQSxJQUFNVSxlQUFlLEdBQUcsQ0FBQztJQUN6QkQsVUFBVSxHQUFHQSxVQUFVLENBQUNQLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ1EsZUFBZSxDQUFDO0VBQ3JEO0VBQ0EsT0FBT0QsVUFBVTtBQUNuQixDQUFDO0FBRU0sSUFBTUUsWUFBWTtFQUFBLHVFQUFHLGtCQUFPRixVQUFVO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBO1lBQUEsSUFFcENBLFVBQVU7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FDTixJQUFJO1VBQUE7WUFHYjtZQUNNRyxHQUFHLEdBQUcsSUFBSWhILElBQUksRUFBRTtZQUNoQmlILEtBQUssR0FBR0QsR0FBRyxDQUFDRSxRQUFRLEVBQUU7WUFDdEJDLElBQUksR0FBR0MsZUFBZSxDQUFDUCxVQUFVLEdBQUNJLEtBQUssQ0FBQ0ksUUFBUSxFQUFFLENBQUM7WUFBQSxNQUVyREYsSUFBSSxLQUFLLElBQUk7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FDUixJQUFJO1VBQUE7WUFHUEcsR0FBRyxHQUFHSCxJQUFJLEdBQUcsR0FBRztZQUFBLE1BQ2xCRyxHQUFHLElBQUksQ0FBQyxJQUFJQSxHQUFHLEdBQUcsR0FBRztjQUFBO2NBQUE7WUFBQTtZQUFBLGtDQUNoQkEsR0FBRztVQUFBO1lBQUEsa0NBRUwsSUFBSTtVQUFBO1lBQUE7WUFBQTtZQUVYdEUsTUFBTSxDQUFDRixLQUFLLGNBQUc7WUFBQyxrQ0FDVCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQXhCWWlFLFlBQVk7SUFBQTtFQUFBO0FBQUEsR0F3QnhCO0FBRU0sSUFBTVEsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFrQixDQUFJQyxRQUFRLEVBQUs7RUFDOUMsSUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQUksR0FBUztJQUNqQixJQUFNQyxTQUFTLEdBQUduSSxNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDcUUsU0FBUztJQUMvRCxJQUFJQyxhQUFhLEdBQUcsR0FBRyxHQUFHRCxTQUFTLEVBQUU7TUFDbkNFLGFBQWEsQ0FBQ0Msa0JBQWtCLENBQUM7TUFDakNMLFFBQVEsRUFBRTtJQUNaLENBQUMsTUFBTTtNQUNMRyxhQUFhLEdBQUdELFNBQVM7SUFDM0I7RUFDRixDQUFDO0VBRUQsSUFBSUMsYUFBYSxHQUFHcEksTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQ3FFLFNBQVM7RUFDakUsSUFBTUcsa0JBQWtCLEdBQUdDLFdBQVcsQ0FBQ0wsSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUNuRCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLElBQU1NLGVBQWUsR0FBRyxTQUFsQkEsZUFBZSxDQUFJQyxRQUFRLEVBQUVDLGVBQWUsRUFBSztFQUM1RGpGLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLHdCQUF3QixFQUFFeUYsZUFBZSxFQUFFLGFBQWEsRUFBRUQsUUFBUSxDQUFDO0VBQzlFLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixRQUFRLENBQUNoSixNQUFNLEVBQUVrSixDQUFDLEVBQUUsRUFBRTtJQUN4QyxJQUFNQyxPQUFPLEdBQUdILFFBQVEsQ0FBQ0UsQ0FBQyxDQUFDO0lBQzNCLG1DQUEyQkUsTUFBTSxDQUFDQyxPQUFPLENBQUNKLGVBQWUsQ0FBQyxxQ0FBRTtNQUF2RDtRQUFPSyxHQUFHO1FBQUVDLEtBQUs7TUFDcEJKLE9BQU8sQ0FBQ0ssS0FBSyxDQUFDRixHQUFHLENBQUMsR0FBR0MsS0FBSztJQUM1QjtFQUNGO0FBQ0YsQ0FBQztBQUVNLElBQU1FLGdCQUFnQjtFQUFBLHVFQUFHO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUN4QkMsVUFBVSxHQUFHbkosTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNPLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDNUQrRSxVQUFVLENBQUNDLEdBQUcsR0FBRyxZQUFZO1lBQzdCRCxVQUFVLENBQUM5RixJQUFJLEdBQUcsVUFBVTtZQUM1QjhGLFVBQVUsQ0FBQ2pKLElBQUksR0FBR00sbUJBQW1CO1lBQ3JDUixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ3dGLElBQUksQ0FBQ0MsV0FBVyxDQUFDSCxVQUFVLENBQUM7VUFBQztVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNsRDtFQUFBLGdCQU5ZRCxnQkFBZ0I7SUFBQTtFQUFBO0FBQUEsR0FNNUI7QUFFTSxJQUFNSyxjQUFjO0VBQUEsdUVBQUcsa0JBQU9qQyxVQUFVLEVBQUVrQyxnQkFBZ0IsRUFBRUMsY0FBYyxFQUFFQyxTQUFTO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUNwRkMsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxTQUFTLENBQUNOLGdCQUFnQixDQUFDLENBQUM7WUFDeERPLE9BQU8sR0FBRyxJQUFJO1lBQUEsdUNBQ0dKLE9BQU87WUFBQTtZQUFBO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFqQkssTUFBTTtZQUNSQywyQkFBMkIsR0FBY0QsTUFBTSxDQUEvQ0MsMkJBQTJCLEVBQUVDLFFBQVEsR0FBSUYsTUFBTSxDQUFsQkUsUUFBUTtZQUFBLE1BQ3hDLENBQUNELDJCQUEyQixJQUFJLENBQUNDLFFBQVE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBO1lBQzdDLElBQUlULGNBQWMsS0FBSyxJQUFJLElBQUlRLDJCQUEyQixFQUFFO2NBQUEsd0NBQ3JCQSwyQkFBMkI7Y0FBQTtnQkFBaEUsdURBQWtFO2tCQUF2REUsc0JBQXNCO2tCQUMvQixJQUFJQSxzQkFBc0IsQ0FBQ0MsRUFBRSxLQUFLWCxjQUFjLEVBQUU7b0JBQ2hELEtBQVdWLEdBQUcsSUFBSW9CLHNCQUFzQixFQUFFO3NCQUN4QyxJQUFJcEIsR0FBRyxLQUFLLElBQUksRUFBRTt3QkFDaEJpQixNQUFNLENBQUNqQixHQUFHLENBQUMsR0FBR29CLHNCQUFzQixDQUFDcEIsR0FBRyxDQUFDO3NCQUMzQztvQkFDRjtrQkFDRjtnQkFDRjtjQUFDO2dCQUFBO2NBQUE7Z0JBQUE7Y0FBQTtZQUNIO1lBQUMsS0FDR21CLFFBQVE7Y0FBQTtjQUFBO1lBQUE7WUFBQSx3Q0FDd0JyQixNQUFNLENBQUN3QixJQUFJLENBQUNILFFBQVEsQ0FBQyxDQUFDcEIsT0FBTyxFQUFFO1lBQUE7WUFBQTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQSxnREFBckR4SixLQUFLLG9CQUFFZ0wsVUFBVTtZQUFBO1lBQUEsT0FDSDlDLFlBQVksQ0FBQ0YsVUFBVSxHQUFHZ0QsVUFBVSxDQUFDO1VBQUE7WUFBdkRDLFNBQVM7WUFDZixJQUFJYixTQUFTLElBQUksQ0FBQ00sTUFBTSxDQUFDRSxRQUFRLENBQUNJLFVBQVUsQ0FBQyxDQUFDRSxNQUFNLEVBQUU7Y0FDcERSLE1BQU0sQ0FBQ0UsUUFBUSxDQUFDSSxVQUFVLENBQUMsQ0FBQ0UsTUFBTSxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQyxHQUFHLEdBQUc3QixNQUFNLENBQUN3QixJQUFJLENBQUNILFFBQVEsQ0FBQyxDQUFDekssTUFBTSxDQUFDLElBQUlILEtBQUssR0FBRyxDQUFDLENBQUM7WUFDbkc7WUFBQyxNQUNHaUwsU0FBUyxHQUFHUCxNQUFNLENBQUNFLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLENBQUNFLE1BQU07Y0FBQTtjQUFBO1lBQUE7WUFDaERULE9BQU8sR0FBR08sVUFBVTtZQUFDLE1BQ2pCYixjQUFjLEtBQUssSUFBSSxJQUFJUyxRQUFRLENBQUNJLFVBQVUsQ0FBQyxDQUFDTCwyQkFBMkI7Y0FBQTtjQUFBO1lBQUE7WUFBQSx3Q0FDeENDLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLENBQUNMLDJCQUEyQjtZQUFBO1lBQUE7VUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQTFFRSx1QkFBc0I7WUFBQSxNQUMzQkEsdUJBQXNCLENBQUNDLEVBQUUsSUFBSVgsY0FBYztjQUFBO2NBQUE7WUFBQTtZQUFBLHdCQUMzQlosTUFBTSxDQUFDd0IsSUFBSSxDQUFDRix1QkFBc0IsQ0FBQztVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBMUNwQixJQUFHO1lBQUEsTUFDUkEsSUFBRyxLQUFLLElBQUk7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBO1lBQ2hCaUIsTUFBTSxDQUFDakIsSUFBRyxDQUFDLEdBQUdvQix1QkFBc0IsQ0FBQ3BCLElBQUcsQ0FBQztVQUFDO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtVQUFBO1lBS2hELEtBQVdBLEtBQUcsSUFBSW1CLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLEVBQUU7Y0FDdEMsSUFBSXZCLEtBQUcsS0FBSyxRQUFRLElBQUlBLEtBQUcsS0FBSyw2QkFBNkIsRUFBRTtnQkFDN0RpQixNQUFNLENBQUNqQixLQUFHLENBQUMsR0FBR21CLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLENBQUN2QixLQUFHLENBQUM7Y0FDekM7WUFDRjtVQUFDO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUEsa0NBT0osQ0FBQ1ksT0FBTyxFQUFFSSxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUMxQjtFQUFBLGdCQS9DWVIsY0FBYztJQUFBO0VBQUE7QUFBQSxHQStDMUI7QUFFTSxJQUFNb0Isb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUFvQixDQUFJaEIsT0FBTyxFQUFLO0VBQUEsNENBQzFCQSxPQUFPO0lBQUE7RUFBQTtJQUE1Qix1REFBOEI7TUFBQSxJQUFuQkssTUFBTTtNQUNmLElBQU9ZLFFBQVEsR0FBa0VaLE1BQU0sQ0FBaEZZLFFBQVE7UUFBRUMsUUFBUSxHQUF3RGIsTUFBTSxDQUF0RWEsUUFBUTtRQUFFQyxnQkFBZ0IsR0FBc0NkLE1BQU0sQ0FBNURjLGdCQUFnQjtRQUFFQyxlQUFlLEdBQXFCZixNQUFNLENBQTFDZSxlQUFlO1FBQUVDLGVBQWUsR0FBSWhCLE1BQU0sQ0FBekJnQixlQUFlO01BQzdFLElBQUlKLFFBQVEsS0FBSyxNQUFNLElBQUlDLFFBQVEsS0FBSyxhQUFhLEVBQUU7TUFDdkQsSUFDRSxDQUFDQSxRQUFRLElBQUlDLGdCQUFnQixLQUM3QixDQUFDOUssTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNvSCxhQUFhLENBQUNKLFFBQVEsQ0FBQyxJQUM1QyxDQUFDN0ssTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNvSCxhQUFhLENBQUNILGdCQUFnQixDQUFDLEVBQ3BEO1FBQ0FySCxNQUFNLENBQUNxQixNQUFNLHFDQUE4QitGLFFBQVEsSUFBRUMsZ0JBQWdCLGdCQUFhO1FBQ2xGLE9BQU8sS0FBSztNQUNkO01BQ0EsSUFDR0MsZUFBZSxJQUFJLENBQUNDLGVBQWUsSUFDbkNBLGVBQWUsSUFBSSxDQUFDRCxlQUFnQixFQUNyQztRQUNBdEgsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLGtDQUFrQyxDQUFDO1FBQ2pELE9BQU8sS0FBSztNQUNkO01BQ0EsSUFBSWlHLGVBQWUsSUFBSUMsZUFBZSxFQUFFO1FBQ3RDLElBQUksQ0FBQ2hMLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDRixlQUFlLENBQUMsRUFBRTtVQUN2RHRILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRWlHLGVBQWUsQ0FBQztVQUM3RCxPQUFPLEtBQUs7UUFDZDtRQUNBLElBQUksQ0FBQy9LLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDRCxlQUFlLENBQUMsRUFBRTtVQUN2RHZILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRWtHLGVBQWUsQ0FBQztVQUM3RCxPQUFPLEtBQUs7UUFDZDtNQUNGO0lBQ0Y7RUFBQztJQUFBO0VBQUE7SUFBQTtFQUFBO0VBQ0QsT0FBTyxJQUFJO0FBQ2IsQ0FBQztBQUVNLElBQU1FLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBdUIsR0FBUztFQUMzQyxJQUFPeEosa0JBQWtCLEdBQXdDSCx1Q0FBeEM7SUFBRUMsaUJBQWlCLEdBQXFCRCxzQ0FBckI7SUFBRUUsZUFBZSxHQUFJRixvQ0FBSjtFQUU3RCxJQUFNNEosZ0JBQWdCLEdBQUdDLGNBQWMsQ0FBQ3ZJLE9BQU8sQ0FBQ25CLGtCQUFrQixDQUFDO0VBQ25FLElBQU0ySixnQkFBZ0IsR0FBR0QsY0FBYyxDQUFDdkksT0FBTyxDQUFDckIsaUJBQWlCLENBQUM7RUFDbEUsSUFBTThKLGNBQWMsR0FBR0YsY0FBYyxDQUFDdkksT0FBTyxDQUFDcEIsZUFBZSxDQUFDO0VBRTlELElBQUkwSixnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7SUFDN0JDLGNBQWMsQ0FBQ0csT0FBTyxDQUFDN0osa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0VBQy9DO0VBQ0EsSUFBSSxDQUFDMkosZ0JBQWdCLEVBQUU7SUFDckJELGNBQWMsQ0FBQ0csT0FBTyxDQUFDL0osaUJBQWlCLEVBQUVmLElBQUksQ0FBQ2dILEdBQUcsRUFBRSxDQUFDO0VBQ3ZEO0VBQ0EsSUFBSSxDQUFDNkQsY0FBYyxFQUFFO0lBQ25CRixjQUFjLENBQUNHLE9BQU8sQ0FBQzlKLGVBQWUsRUFBRSxDQUFDekIsTUFBTSxDQUFDQyxRQUFRLENBQUN1TCxRQUFRLENBQUMsQ0FBQztFQUNyRSxDQUFDLE1BQU07SUFDTEosY0FBYyxDQUFDRyxPQUFPLENBQUM5SixlQUFlLEVBQUUsQ0FBQ3pCLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDdUwsUUFBUSxFQUFFRixjQUFjLENBQUMsQ0FBQztFQUNyRjtBQUNGLENBQUM7QUFFTSxJQUFNRyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUlDLFlBQVksRUFBRUMsU0FBUyxFQUFFM0MsS0FBSyxFQUFLO0VBQ2xFLElBQUkyQyxTQUFTLEtBQUssVUFBVSxFQUFFO0lBQzVCLElBQUksQ0FBQ0QsWUFBWSxFQUFFO01BQ2pCakksTUFBTSxDQUFDbUksT0FBTyxDQUFDLHFEQUFxRCxDQUFDO01BQ3JFLE9BQU8sSUFBSTtJQUNiO0lBQ0FuSSxNQUFNLENBQUNxQixNQUFNLENBQUMscURBQXFELENBQUM7SUFDcEUsT0FBTyxLQUFLO0VBQ2Q7RUFDQSxJQUFJNEcsWUFBWSxLQUFLLElBQUksSUFDdkJBLFlBQVksS0FBS0csU0FBUyxJQUMxQkYsU0FBUyxLQUFLLElBQUksSUFDbEJBLFNBQVMsS0FBS0UsU0FBUyxFQUFFO0lBQ3pCcEksTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDREQUE0RCxDQUFDO0lBQzNFLE9BQU8sS0FBSztFQUNkO0VBQ0EsUUFBUTZHLFNBQVM7SUFDZixLQUFLLE9BQU87TUFDVixJQUFJRCxZQUFZLEVBQUU7UUFDaEJqSSxNQUFNLENBQUNtSSxPQUFPLENBQUMsaURBQWlELENBQUM7UUFDakUsT0FBTyxJQUFJO01BQ2I7TUFDQW5JLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx5REFBeUQsQ0FBQztNQUN4RSxPQUFPLEtBQUs7SUFDZCxLQUFLLFVBQVU7SUFDZixLQUFLLFVBQVU7TUFDYixJQUFJNEcsWUFBWSxDQUFDdkwsUUFBUSxDQUFDNkksS0FBSyxDQUFDLEVBQUU7UUFDaEN2RixNQUFNLENBQUNtSSxPQUFPLENBQUMscURBQXFELENBQUM7UUFDckUsT0FBTyxJQUFJO01BQ2I7TUFDQW5JLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxpRUFBaUUsQ0FBQztNQUNoRixPQUFPLEtBQUs7SUFDZCxLQUFLLGFBQWE7SUFDbEIsS0FBSyxhQUFhO01BQ2hCLElBQUksQ0FBQzRHLFlBQVksQ0FBQ3ZMLFFBQVEsQ0FBQzZJLEtBQUssQ0FBQyxFQUFFO1FBQ2pDdkYsTUFBTSxDQUFDbUksT0FBTyxDQUFDLDZEQUE2RCxDQUFDO1FBQzdFLE9BQU8sSUFBSTtNQUNiO01BQ0FuSSxNQUFNLENBQUNxQixNQUFNLENBQUMseURBQXlELENBQUM7TUFDeEUsT0FBTyxLQUFLO0lBQ2QsS0FBSyxPQUFPO01BQ1YsSUFBSTRHLFlBQVksS0FBSzFDLEtBQUssRUFBRTtRQUMxQnZGLE1BQU0sQ0FBQ21JLE9BQU8sQ0FBQyxtREFBbUQsQ0FBQztRQUNuRSxPQUFPLElBQUk7TUFDYjtNQUNBbkksTUFBTSxDQUFDcUIsTUFBTSxDQUFDLCtEQUErRCxDQUFDO01BQzlFLE9BQU8sS0FBSztJQUNkLEtBQUssVUFBVTtNQUNiLElBQUk0RyxZQUFZLEtBQUsxQyxLQUFLLEVBQUU7UUFDMUJ2RixNQUFNLENBQUNtSSxPQUFPLENBQUMsMkRBQTJELENBQUM7UUFDM0UsT0FBTyxJQUFJO01BQ2I7TUFDQW5JLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx1REFBdUQsQ0FBQztNQUN0RSxPQUFPLEtBQUs7SUFDZCxLQUFLLGFBQWE7TUFDaEIsSUFBSTRHLFlBQVksR0FBRzFDLEtBQUssRUFBRTtRQUN4QnZGLE1BQU0sQ0FBQ21JLE9BQU8sQ0FBQyw0REFBNEQsQ0FBQztRQUM1RSxPQUFPLElBQUk7TUFDYjtNQUNBbkksTUFBTSxDQUFDcUIsTUFBTSxDQUFDLG9FQUFvRSxDQUFDO01BQ25GLE9BQU8sS0FBSztJQUNkLEtBQUssVUFBVTtNQUNiLElBQUk0RyxZQUFZLEdBQUcxQyxLQUFLLEVBQUU7UUFDeEJ2RixNQUFNLENBQUNtSSxPQUFPLENBQUMseURBQXlELENBQUM7UUFDekUsT0FBTyxJQUFJO01BQ2I7TUFDQW5JLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxpRUFBaUUsQ0FBQztNQUNoRixPQUFPLEtBQUs7SUFDZCxLQUFLLGVBQWU7TUFDbEIsSUFBSTRHLFlBQVksSUFBSTFDLEtBQUssRUFBRTtRQUN6QnZGLE1BQU0sQ0FBQ21JLE9BQU8sQ0FBQyxxRUFBcUUsQ0FBQztRQUNyRixPQUFPLElBQUk7TUFDYjtNQUNBbkksTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDZFQUE2RSxDQUFDO01BQzVGLE9BQU8sS0FBSztJQUNkLEtBQUssWUFBWTtNQUNmLElBQUk0RyxZQUFZLElBQUkxQyxLQUFLLEVBQUU7UUFDekJ2RixNQUFNLENBQUNtSSxPQUFPLENBQUMsa0VBQWtFLENBQUM7UUFDbEYsT0FBTyxJQUFJO01BQ2I7TUFDQW5JLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQywwRUFBMEUsQ0FBQztNQUN6RixPQUFPLEtBQUs7SUFDZCxLQUFLLFNBQVM7TUFBRTtRQUNkLG1CQUFpQmtFLEtBQUssQ0FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUM7VUFBQTtVQUE1QitFLEdBQUc7VUFBRUMsR0FBRztRQUNiRCxHQUFHLEdBQUdFLFFBQVEsQ0FBQ0YsR0FBRyxDQUFDO1FBQ25CQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0QsR0FBRyxDQUFDO1FBQ25CLElBQUlMLFlBQVksSUFBSUksR0FBRyxJQUFJSixZQUFZLElBQUlLLEdBQUcsRUFBRTtVQUM5Q3RJLE1BQU0sQ0FBQ21JLE9BQU8sQ0FBQyw2REFBNkQsQ0FBQztVQUM3RSxPQUFPLElBQUk7UUFDYjtRQUNBbkksTUFBTSxDQUFDcUIsTUFBTSxDQUFDLHFFQUFxRSxDQUFDO1FBQ3BGLE9BQU8sS0FBSztNQUNkO0lBQ0EsS0FBSyxPQUFPO01BQUU7UUFDWixJQUFNbUgsS0FBSyxHQUFHLElBQUlDLE1BQU0sQ0FBQ2xELEtBQUssRUFBRSxHQUFHLENBQUM7UUFDcEMsT0FBT2lELEtBQUssQ0FBQ0UsSUFBSSxDQUFDVCxZQUFZLENBQUM7TUFDakM7SUFDQTtNQUNFakksTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDZDQUE2QyxFQUFFNkcsU0FBUyxDQUFDO01BQ3ZFLE9BQU8sS0FBSztFQUFDO0FBRW5CLENBQUM7QUFFTSxJQUFNUyxZQUFZLEdBQUcsU0FBZkEsWUFBWSxHQUFTO0VBQ2hDLElBQU9sSyxVQUFVLEdBQWlCSiw2QkFBakI7SUFBRVEsV0FBVyxHQUFJUiw4QkFBSjtFQUM5QixJQUFPRCxrQkFBa0IsR0FBSU4sdUNBQUo7RUFDekIsSUFBSTtJQUNGLElBQU04SyxXQUFXLEdBQUdyTSxNQUFNLENBQUNDLFFBQVEsQ0FBQ3FNLE1BQU07SUFDMUMsSUFBTUMsT0FBTyxHQUFHUCxRQUFRLENBQUNoTSxNQUFNLENBQUM0QyxZQUFZLENBQUNDLE9BQU8sQ0FBQ1gsVUFBVSxDQUFDLENBQUM7SUFDakUsSUFBSW1LLFdBQVcsQ0FBQ2xNLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUNyQ0gsTUFBTSxDQUFDNEMsWUFBWSxDQUFDMkksT0FBTyxDQUFDakosV0FBVyxFQUFFLElBQUksQ0FBQztNQUM5QyxJQUFJK0osV0FBVyxDQUFDbE0sUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3RDSCxNQUFNLENBQUM0QyxZQUFZLENBQUMySSxPQUFPLENBQUNySixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzFDc0Isb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUNqQyxJQUFJK0ksT0FBTyxLQUFLLENBQUMsRUFBRXZNLE1BQU0sQ0FBQ29MLGNBQWMsQ0FBQ29CLFVBQVUsQ0FBQzNLLGtCQUFrQixDQUFDO1FBQ3ZFLE9BQU8sQ0FBQztNQUNWO01BQ0EsSUFBSXdLLFdBQVcsQ0FBQ2xNLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN0Q0gsTUFBTSxDQUFDNEMsWUFBWSxDQUFDMkksT0FBTyxDQUFDckosVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMxQ3NCLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7UUFDakMsSUFBSStJLE9BQU8sS0FBSyxDQUFDLEVBQUV2TSxNQUFNLENBQUNvTCxjQUFjLENBQUNvQixVQUFVLENBQUMzSyxrQkFBa0IsQ0FBQztRQUN2RSxPQUFPLENBQUM7TUFDVjtNQUNBLElBQUl3SyxXQUFXLENBQUNsTSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDdkNILE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzJJLE9BQU8sQ0FBQ3JKLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQ3NCLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7UUFDakMsT0FBTyxDQUFDLENBQUM7TUFDWDtNQUNBLElBQUk2SSxXQUFXLENBQUNsTSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDdENILE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzRKLFVBQVUsQ0FBQ3RLLFVBQVUsQ0FBQztRQUMxQ3NCLG9CQUFvQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDbEMsSUFBSStJLE9BQU8sRUFBRXZNLE1BQU0sQ0FBQ29MLGNBQWMsQ0FBQ29CLFVBQVUsQ0FBQzNLLGtCQUFrQixDQUFDO1FBQ2pFLE9BQU8sQ0FBQztNQUNWO0lBQ0Y7SUFDQSxJQUFJNEssTUFBTSxDQUFDQyxLQUFLLENBQUNILE9BQU8sQ0FBQyxFQUFFO01BQ3pCL0ksb0JBQW9CLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztNQUNsQyxPQUFPLENBQUM7SUFDVjtJQUNBQSxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQ2pDLE9BQU8rSSxPQUFPO0VBQ2hCLENBQUMsQ0FBQyxPQUFPSSxHQUFHLEVBQUU7SUFDWmxKLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx1Q0FBdUMsRUFBRTZILEdBQUcsQ0FBQzVILE9BQU8sQ0FBQztJQUNuRS9FLE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzRKLFVBQVUsQ0FBQ3RLLFVBQVUsQ0FBQztJQUMxQ3NCLG9CQUFvQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDbEMsT0FBTyxDQUFDO0VBQ1Y7QUFDRixDQUFDOztBQUVEO0FBQ08sSUFBTW9KLGFBQWEsR0FBRyxTQUFoQkEsYUFBYSxHQUFTO0VBQ2pDLElBQU1DLEVBQUUsR0FBRzdNLE1BQU0sQ0FBQzZNLEVBQUU7RUFDcEI7RUFDQSxJQUFJQSxFQUFFLElBQUlBLEVBQUUsQ0FBQ0MsTUFBTSxFQUFFO0lBQ25CLElBQU1DLFFBQVEsR0FBR0YsRUFBRSxDQUFDQyxNQUFNLEVBQUU7SUFDNUIsSUFBSUMsUUFBUSxJQUFJQSxRQUFRLENBQUN0TixNQUFNLEVBQUU7TUFDL0IsT0FBT3NOLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNwQztFQUNGO0VBQ0EsT0FBTyxJQUFJO0FBQ2IsQ0FBQzs7QUFFRDtBQUNPLElBQU1uRixlQUFlLEdBQUcsU0FBbEJBLGVBQWUsQ0FBSTFJLEdBQUcsRUFBSztFQUN0QztFQUNBLElBQUl5SSxJQUFJLEdBQUcsU0FBUztFQUNwQixJQUFJLE9BQU96SSxHQUFHLEtBQUssUUFBUSxFQUFFO0lBQzNCO0lBQ0FBLEdBQUcsR0FBR0EsR0FBRyxDQUFDMkksUUFBUSxFQUFFO0VBQ3RCO0VBQ0EsSUFBSTNJLEdBQUcsQ0FBQ00sTUFBTSxLQUFLLENBQUMsRUFBRTtJQUNwQixPQUFPLElBQUk7RUFDYjtFQUNBLEtBQUssSUFBSWtKLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3hKLEdBQUcsQ0FBQ00sTUFBTSxFQUFFa0osQ0FBQyxFQUFFLEVBQUU7SUFDbkMsSUFBTXNFLElBQUksR0FBRzlOLEdBQUcsQ0FBQytOLFVBQVUsQ0FBQ3ZFLENBQUMsQ0FBQztJQUM5QmYsSUFBSSxHQUFJLENBQUNBLElBQUksSUFBSSxDQUFDLElBQUlBLElBQUksR0FBSXFGLElBQUk7SUFDbENyRixJQUFJLEdBQUdBLElBQUksR0FBR0EsSUFBSTtFQUNwQjtFQUNBO0VBQ0EsT0FBTzZDLElBQUksQ0FBQzBDLEdBQUcsQ0FBQ3ZGLElBQUksQ0FBQztBQUN2QixDQUFDOztBQUVEO0FBQ08sSUFBTXdGLFlBQVksR0FBRyxTQUFmQSxZQUFZLEdBQVM7RUFDaEMsT0FBTzNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUM0QyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUM7QUFDaEQsQ0FBQzs7QUFFRDtBQUNPLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFXLEdBQVM7RUFDL0IsT0FBTzdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDakssSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ3RDLENBQUM7QUFHTSxJQUFNOEYsYUFBYSxHQUFHLFNBQWhCQSxhQUFhLEdBQVM7RUFDakMsT0FBTyxJQUFJQyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO0lBQzlCLElBQUk7TUFDRixJQUFJckQsRUFBRSxHQUFHcEssTUFBTSxDQUFDNEMsWUFBWSxDQUFDQyxPQUFPLENBQUNmLDBCQUEwQixDQUFDO01BQ2hFLElBQUlzSSxFQUFFLEtBQUssSUFBSSxJQUFJQSxFQUFFLEtBQUt5QixTQUFTLEVBQUU7UUFDbkNwSSxNQUFNLENBQUNSLEdBQUcsQ0FBQyxrREFBa0QsRUFBRW1ILEVBQUUsQ0FBQztRQUNsRXFELE9BQU8sQ0FBQ3JELEVBQUUsQ0FBQztRQUNYO01BQ0Y7TUFDQUEsRUFBRSxHQUFHd0MsYUFBYSxFQUFFO01BQ3BCLElBQUl4QyxFQUFFLEtBQUssSUFBSSxJQUFJQSxFQUFFLEtBQUt5QixTQUFTLEVBQUU7UUFDbkNwSSxNQUFNLENBQUNSLEdBQUcsQ0FBQyx3REFBd0QsRUFBRW1ILEVBQUUsQ0FBQztRQUN4RXBLLE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzJJLE9BQU8sQ0FBQ3pKLDBCQUEwQixFQUFFc0ksRUFBRSxDQUFDO1FBQzNEcUQsT0FBTyxDQUFDckQsRUFBRSxDQUFDO1FBQ1g7TUFDRixDQUFDLE1BQU07UUFDTCxJQUFNc0QseUJBQXlCLEdBQUduRixXQUFXLENBQUMsWUFBTTtVQUNsRDZCLEVBQUUsR0FBR3dDLGFBQWEsRUFBRTtVQUNwQixJQUFJeEMsRUFBRSxLQUFLLElBQUksSUFBSUEsRUFBRSxLQUFLeUIsU0FBUyxFQUFFO1lBQ25DcEksTUFBTSxDQUFDUixHQUFHLENBQUMsdUNBQXVDLEVBQUVtSCxFQUFFLENBQUM7WUFDdkQvQixhQUFhLENBQUNxRix5QkFBeUIsQ0FBQztZQUN4QzFOLE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzJJLE9BQU8sQ0FBQ3pKLDBCQUEwQixFQUFFc0ksRUFBRSxDQUFDO1lBQzNEcUQsT0FBTyxDQUFDckQsRUFBRSxDQUFDO1VBQ2I7UUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ050RSxVQUFVLENBQUMsWUFBTTtVQUNmdUMsYUFBYSxDQUFDcUYseUJBQXlCLENBQUM7VUFDeEMsSUFBSXRELEVBQUUsS0FBSyxJQUFJLElBQUlBLEVBQUUsS0FBS3lCLFNBQVMsRUFBRTtZQUNuQ3BJLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQztZQUM1QzJJLE9BQU8sQ0FBQyxJQUFJLENBQUM7VUFDZjtRQUNGLENBQUMsRUFBRSxJQUFJLENBQUM7TUFDVjtJQUNGLENBQUMsQ0FBQyxPQUFPRSxDQUFDLEVBQUU7TUFDVmxLLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRTZJLENBQUMsQ0FBQztNQUMxQ0YsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNmO0VBQ0YsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVNLElBQU1HLEtBQUssR0FBRyxTQUFSQSxLQUFLLENBQUlDLEVBQUU7RUFBQSxPQUFLLElBQUlMLE9BQU8sQ0FBQyxVQUFDbEgsR0FBRztJQUFBLE9BQUtSLFVBQVUsQ0FBQ1EsR0FBRyxFQUFFdUgsRUFBRSxDQUFDO0VBQUEsRUFBQztBQUFBO0FBRS9ELElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0IsQ0FBSUMsSUFBSSxFQUFLO0VBQzFDLElBQUksQ0FBQ0EsSUFBSSxJQUFJLE9BQU9BLElBQUksS0FBSyxRQUFRLEVBQUUsT0FBT0EsSUFBSTtFQUVsRCxJQUFNQyxNQUFNLEdBQUc7SUFDYkMsZUFBZSxFQUFFcEMsU0FBUztJQUMxQnFDLGFBQWEsRUFBRXJDLFNBQVM7SUFDeEJzQyxRQUFRLEVBQUV0QyxTQUFTO0lBQ25CdUMsTUFBTSxFQUFFdkM7RUFDVixDQUFDO0VBRUQsSUFBSXdDLEtBQUssR0FBR04sSUFBSSxDQUFDTSxLQUFLLENBQUMsMkNBQTJDLENBQUM7RUFDbkUsSUFBSUEsS0FBSyxJQUFJQSxLQUFLLENBQUM1TyxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQy9CdU8sTUFBTSxDQUFDRyxRQUFRLEdBQUduQyxRQUFRLENBQUNxQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcENMLE1BQU0sQ0FBQ0ksTUFBTSxHQUFHcEMsUUFBUSxDQUFDcUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDTCxNQUFNLENBQUNDLGVBQWUsR0FBR3ZLLE1BQU0sQ0FBQzJLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ3ZPLFdBQVcsRUFBRSxDQUFDO0lBQ3ZEa08sTUFBTSxDQUFDRSxhQUFhLEdBQUdGLE1BQU0sQ0FBQ0MsZUFBZTtFQUMvQyxDQUFDLE1BQU07SUFDTEksS0FBSyxHQUFHTixJQUFJLENBQUNNLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQztJQUN2RixJQUFJLENBQUNBLEtBQUssSUFBSUEsS0FBSyxDQUFDNU8sTUFBTSxLQUFLLENBQUMsRUFBRSxPQUFPc08sSUFBSTtJQUU3Q0MsTUFBTSxDQUFDRyxRQUFRLEdBQUduQyxRQUFRLENBQUNxQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcENMLE1BQU0sQ0FBQ0MsZUFBZSxHQUFHdkssTUFBTSxDQUFDMkssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDdk8sV0FBVyxFQUFFLENBQUM7SUFDdkRrTyxNQUFNLENBQUNJLE1BQU0sR0FBR3BDLFFBQVEsQ0FBQ3FDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQ0wsTUFBTSxDQUFDRSxhQUFhLEdBQUd4SyxNQUFNLENBQUMySyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUN2TyxXQUFXLEVBQUUsQ0FBQztFQUN2RDtFQUVBLElBQUk7SUFDRixJQUFNd08sS0FBSyxHQUFHLElBQUk3TixJQUFJLEVBQUU7SUFFeEIsSUFBSSxDQUFDdU4sTUFBTSxDQUFDQyxlQUFlLElBQUksQ0FBQ0QsTUFBTSxDQUFDRSxhQUFhLEVBQUUsT0FBT0gsSUFBSTtJQUVqRSxJQUFNUSxTQUFTLEdBQUdQLE1BQU0sQ0FBQ0MsZUFBZSxJQUFJSyxLQUFLLENBQUMzRyxRQUFRLEVBQUUsR0FBRzJHLEtBQUssQ0FBQ0UsV0FBVyxFQUFFLEdBQUdGLEtBQUssQ0FBQ0UsV0FBVyxFQUFFLEdBQUcsQ0FBQztJQUM1RyxJQUFNQyxPQUFPLEdBQUdULE1BQU0sQ0FBQ0UsYUFBYSxJQUFJSSxLQUFLLENBQUMzRyxRQUFRLEVBQUUsR0FBRzJHLEtBQUssQ0FBQ0UsV0FBVyxFQUFFLEdBQUdGLEtBQUssQ0FBQ0UsV0FBVyxFQUFFLEdBQUcsQ0FBQztJQUV4RyxJQUFNRSxjQUFjLEdBQUcsSUFBSWpPLElBQUksQ0FBQzhOLFNBQVMsRUFBRVAsTUFBTSxDQUFDQyxlQUFlLEVBQUVELE1BQU0sQ0FBQ0csUUFBUSxDQUFDO0lBQ25GLElBQU1RLFlBQVksR0FBRyxJQUFJbE8sSUFBSSxDQUFDZ08sT0FBTyxFQUFFVCxNQUFNLENBQUNFLGFBQWEsRUFBRUYsTUFBTSxDQUFDSSxNQUFNLENBQUM7SUFHM0UsSUFBTVEsaUJBQWlCLEdBQUduRSxJQUFJLENBQUNvRSxJQUFJLENBQUNwRSxJQUFJLENBQUMwQyxHQUFHLENBQUN1QixjQUFjLEdBQUdKLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdGLElBQU1RLGVBQWUsR0FBR3JFLElBQUksQ0FBQ29FLElBQUksQ0FBQ3BFLElBQUksQ0FBQzBDLEdBQUcsQ0FBQ3dCLFlBQVksR0FBR0wsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFekYsSUFBTVMsa0JBQWtCLEdBQUdILGlCQUFpQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUduRSxJQUFJLENBQUNvRSxJQUFJLENBQUNELGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUN2RixJQUFNSSxnQkFBZ0IsR0FBR0YsZUFBZSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUdyRSxJQUFJLENBQUNvRSxJQUFJLENBQUNDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFFakYsSUFBSUMsa0JBQWtCLEtBQUssQ0FBQyxJQUFJQyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7TUFDdEQsaUJBQVVKLGlCQUFpQixnQkFBTUUsZUFBZTtJQUNsRDtJQUVBLElBQUlDLGtCQUFrQixLQUFLLENBQUMsSUFBSUMsZ0JBQWdCLElBQUksQ0FBQyxFQUFFO01BQ3JELGlCQUFVSixpQkFBaUIsdUJBQVVJLGdCQUFnQjtJQUN2RDtJQUVBLElBQUlELGtCQUFrQixLQUFLQyxnQkFBZ0IsRUFBRTtNQUMzQyxpQkFBVUQsa0JBQWtCO0lBQzlCO0lBRUEsaUJBQVVBLGtCQUFrQixnQkFBTUMsZ0JBQWdCO0VBQ3BELENBQUMsQ0FBQyxPQUFPckMsR0FBRyxFQUFFO0lBQ1osT0FBT29CLElBQUk7RUFDYjtBQUNGLENBQUM7QUFFTSxJQUFNa0IsU0FBUztFQUFBLHVFQUFHLGtCQUFPQyxPQUFPLEVBQUVqSCxRQUFRO0lBQUEsaUJBS3RDa0gsVUFBVTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQVZBLFVBQVUsMEJBQUc7Y0FDcEIzSSxZQUFZLENBQUM0SSxXQUFXLENBQUM7Y0FDekJBLFdBQVcsR0FBR3RKLFVBQVUsQ0FBQ21DLFFBQVEsRUFBRWlILE9BQU8sQ0FBQztZQUM3QyxDQUFDO1lBUEdFLFdBQVcsR0FBR3RKLFVBQVUsQ0FBQ21DLFFBQVEsRUFBRWlILE9BQU8sQ0FBQztZQUUvQ2xQLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDd0wsWUFBWSxHQUFHRixVQUFVO1VBQUM7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FNL0M7RUFBQSxnQkFUWUYsU0FBUztJQUFBO0VBQUE7QUFBQSxHQVNyQjtBQUVNLElBQU1LLGFBQWEsR0FBRyxTQUFoQkEsYUFBYSxDQUFJQyxZQUFZLEVBQUs7RUFDN0MsSUFBTUMsS0FBSyxnQ0FBT0MsS0FBSyxDQUFDQyxJQUFJLENBQUNILFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksVUFBVSxDQUFDLHNCQUFLRixLQUFLLENBQUNDLElBQUksQ0FBQ0gsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDSyxZQUFZLENBQUMsRUFBQztFQUN0RyxPQUFPSixLQUFLLENBQUNLLElBQUksQ0FBQyxVQUFDQyxDQUFDLEVBQUs7SUFBQTtJQUN2QixPQUFPQSxDQUFDLENBQUNDLE9BQU8sS0FBSyxVQUFBRCxDQUFDLENBQUMxRixFQUFFLDBDQUFKLE1BQU1qSyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUlzUCxLQUFLLENBQUNDLElBQUksQ0FBQ0ksQ0FBQyxDQUFDL0wsU0FBUyxDQUFDLENBQUM4TCxJQUFJLENBQUMsVUFBQ0csQ0FBQztNQUFBLE9BQUtBLENBQUMsQ0FBQzdQLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSTZQLENBQUMsQ0FBQzdQLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFBQSxFQUFDLENBQUM7RUFDNUgsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVNLElBQU04UCxlQUFlLEdBQUcsU0FBbEJBLGVBQWUsR0FBUztFQUNuQyxJQUFNQyxFQUFFLEdBQUdDLFNBQVMsQ0FBQ0MsU0FBUzs7RUFFOUI7RUFDQSxJQUFNQyxFQUFFLEdBQUdILEVBQUUsQ0FBQzdCLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxJQUMzRTZCLEVBQUUsQ0FBQzdCLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxJQUM3QzZCLEVBQUUsQ0FBQzdCLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUU7RUFFOUMsSUFBSSxDQUFDZ0MsRUFBRSxJQUFJQSxFQUFFLENBQUM1USxNQUFNLEdBQUcsQ0FBQyxFQUFFLE9BQU8sS0FBSztFQUV0QyxJQUFNNlEsS0FBSyxHQUFHRCxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ25CLElBQU1FLFFBQVEsR0FBR0YsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUV0QixJQUFNRyxFQUFFLEdBQUc7SUFDVEMsT0FBTyxFQUFFLE1BQU0sQ0FBQ3RFLElBQUksQ0FBQytELEVBQUUsQ0FBQztJQUN4QlEsR0FBRyxFQUFFLE1BQU0sQ0FBQ3ZFLElBQUksQ0FBQytELEVBQUUsQ0FBQztJQUNwQlMsS0FBSyxFQUFFLFFBQVEsQ0FBQ3hFLElBQUksQ0FBQytELEVBQUUsQ0FBQztJQUN4QlUsT0FBTyxFQUFFLFVBQVUsQ0FBQ3pFLElBQUksQ0FBQytELEVBQUUsQ0FBQztJQUM1QlcsR0FBRyxFQUFFLG1CQUFtQixDQUFDMUUsSUFBSSxDQUFDK0QsRUFBRTtFQUNsQyxDQUFDOztFQUVEO0VBQ0EsSUFBSVksU0FBUyxHQUFHLEVBQUU7RUFDbEIsSUFBSUMsTUFBTSxHQUFHLEVBQUU7RUFDZixJQUFJUCxFQUFFLENBQUNDLE9BQU8sRUFBRTtJQUNkTSxNQUFNLEdBQUcsU0FBUztJQUNsQkQsU0FBUyxHQUFHWixFQUFFLENBQUM3QixLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDNUN5QyxTQUFTLEdBQUdBLFNBQVMsR0FBR0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7RUFDNUMsQ0FBQyxNQUFNLElBQUlOLEVBQUUsQ0FBQ0ssR0FBRyxFQUFFO0lBQ2pCRSxNQUFNLEdBQUcsS0FBSztJQUNkRCxTQUFTLEdBQUdaLEVBQUUsQ0FBQzdCLEtBQUssQ0FBQyxjQUFjLENBQUM7SUFDcEN5QyxTQUFTLEdBQUdBLFNBQVMsR0FBR0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDelIsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHO0VBQy9ELENBQUMsTUFBTSxJQUFJbVIsRUFBRSxDQUFDRSxHQUFHLEVBQUU7SUFDakJLLE1BQU0sR0FBRyxLQUFLO0lBQ2RELFNBQVMsR0FBR1osRUFBRSxDQUFDN0IsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0lBQzFDeUMsU0FBUyxHQUFHQSxTQUFTLEdBQUdBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ3pSLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRztFQUMvRCxDQUFDLE1BQU0sSUFBSW1SLEVBQUUsQ0FBQ0ksT0FBTyxFQUFFO0lBQ3JCRyxNQUFNLEdBQUcsU0FBUztJQUNsQkQsU0FBUyxHQUFHWixFQUFFLENBQUM3QixLQUFLLENBQUMsbUJBQW1CLENBQUM7SUFDekN5QyxTQUFTLEdBQUdBLFNBQVMsR0FBR0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7RUFDNUMsQ0FBQyxNQUFNLElBQUlOLEVBQUUsQ0FBQ0csS0FBSyxFQUFFO0lBQ25CSSxNQUFNLEdBQUcsT0FBTztJQUNoQkQsU0FBUyxHQUFHWixFQUFFLENBQUM3QixLQUFLLENBQUMsZ0JBQWdCLENBQUM7SUFDdEN5QyxTQUFTLEdBQUdBLFNBQVMsR0FBR0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7RUFDNUM7O0VBRUE7RUFDQSxJQUFNRSxRQUFRLEdBQUcsT0FBTyxDQUFDN0UsSUFBSSxDQUFDK0QsRUFBRSxDQUFDO0VBRWpDMU0sb0JBQW9CLENBQUMsb0JBQW9CLEVBQUU4TSxLQUFLLENBQUM7RUFDakQ5TSxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRStNLFFBQVEsQ0FBQztFQUN2RC9NLG9CQUFvQixDQUFDLGVBQWUsRUFBRXVOLE1BQU0sQ0FBQztFQUM3Q3ZOLG9CQUFvQixDQUFDLGtCQUFrQixFQUFFc04sU0FBUyxDQUFDO0VBQ25EdE4sb0JBQW9CLENBQUMsaUJBQWlCLEVBQUV3TixRQUFRLENBQUM7O0VBRWpEO0VBQ0EsSUFBTUMsWUFBWSxHQUFHakYsUUFBUSxDQUFDOEUsU0FBUyxDQUFDL0osS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBRXRELElBQU1tSyxrQkFBa0IsR0FBR1osS0FBSyxLQUFLLFFBQVEsSUFBSUEsS0FBSyxLQUFLLFFBQVE7RUFDbkUsSUFBTWEsYUFBYSxHQUFJSixNQUFNLEtBQUssU0FBUyxJQUFJRSxZQUFZLElBQUksQ0FBQyxJQUM3REYsTUFBTSxLQUFLLEtBQUssSUFBSUUsWUFBWSxJQUFJLEVBQUcsSUFDdkNGLE1BQU0sS0FBSyxTQUFTLElBQUlFLFlBQVksSUFBSSxDQUFFLElBQzFDRixNQUFNLEtBQUssS0FBSyxJQUFJRSxZQUFZLElBQUksRUFBRztFQUUxQyxPQUFPQyxrQkFBa0IsSUFBSUMsYUFBYTtBQUM1QyxDQUFDO0FBRU0sSUFBTUMsY0FBYztFQUFBLHdFQUFHO0lBQUE7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ3RCQyxTQUFTLEdBQUdyUixNQUFNLENBQUM0RCxHQUFHO1lBQ3RCME4sTUFBTSxHQUFHRCxTQUFTLENBQUNsQixTQUFTO1lBRTVCb0IsUUFBUSxHQUFHLHlCQUFBRixTQUFTLENBQUNsQixTQUFTLGtGQUFuQixxQkFBcUJxQixhQUFhLDBEQUFsQyxzQkFBb0NELFFBQVEsK0JBQzNERixTQUFTLENBQUNsQixTQUFTLDBEQUFuQixzQkFBcUJvQixRQUFRLCtCQUM3QkYsU0FBUyxDQUFDbEIsU0FBUywwREFBbkIsc0JBQXFCQyxTQUFTO1lBRWhDNU0sb0JBQW9CLENBQUMsb0JBQW9CLEVBQUUrTixRQUFRLENBQUM7O1lBRXBEO1lBQ0EvTixvQkFBb0IsQ0FBQyxxQkFBcUIsRUFBRTZOLFNBQVMsQ0FBQ0ksZ0JBQWdCLENBQUM7WUFFakVDLFdBQVcsR0FBRyxzQkFBQUwsU0FBUyxDQUFDTSxNQUFNLHNEQUFoQixrQkFBa0JDLFVBQVUsSUFBRyxHQUFHLDBCQUFHUCxTQUFTLENBQUNNLE1BQU0sdURBQWhCLG1CQUFrQkUsV0FBVztZQUN0RnJPLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFa08sV0FBVyxDQUFDO1lBRWpESSxXQUFXLEdBQUcsdUJBQUFULFNBQVMsQ0FBQ00sTUFBTSx1REFBaEIsbUJBQWtCSSxVQUFVLElBQUcsR0FBRywwQkFBR1YsU0FBUyxDQUFDTSxNQUFNLHVEQUFoQixtQkFBa0JLLFVBQVU7WUFDckZ4TyxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRXNPLFdBQVcsQ0FBQztZQUVqREcsVUFBVSxHQUFHLDBCQUFBWixTQUFTLENBQUNhLGNBQWMsMERBQXhCLHNCQUEwQkMsS0FBSyxJQUFHLEdBQUcsOEJBQUdkLFNBQVMsQ0FBQ2EsY0FBYywyREFBeEIsdUJBQTBCRSxNQUFNO1lBQzNGNU8sb0JBQW9CLENBQUMsb0JBQW9CLEVBQUV5TyxVQUFVLENBQUM7WUFFdEQsSUFBSU4sTUFBTSxDQUFDUSxLQUFLLEVBQUU7Y0FDWkEsS0FBSyxHQUFHbkcsUUFBUSxDQUFDMkYsTUFBTSxDQUFDUSxLQUFLLENBQUM7Y0FDOUJDLE1BQU0sR0FBSVQsTUFBTSxDQUFDUyxNQUFNLEdBQUlwRyxRQUFRLENBQUMyRixNQUFNLENBQUNTLE1BQU0sQ0FBQyxHQUFHLENBQUM7Y0FDMUQsSUFBSUQsS0FBSyxLQUFLLENBQUMsSUFBSUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDekJ2QixHQUFHLEdBQUcsa0JBQWtCLENBQUMxRSxJQUFJLENBQUNvRixRQUFRLENBQUM7Z0JBQzdDLElBQUlWLEdBQUcsSUFBSVEsU0FBUyxDQUFDSSxnQkFBZ0IsRUFBRTtrQkFDckM7a0JBQ0FVLEtBQUssR0FBRzFILElBQUksQ0FBQzRILEtBQUssQ0FBQ0YsS0FBSyxHQUFHZCxTQUFTLENBQUNJLGdCQUFnQixDQUFDO2tCQUN0RFcsTUFBTSxHQUFHM0gsSUFBSSxDQUFDNEgsS0FBSyxDQUFDRCxNQUFNLEdBQUdmLFNBQVMsQ0FBQ0ksZ0JBQWdCLENBQUM7Z0JBQzFELENBQUMsTUFBTTtrQkFDQ2EsZ0JBQWdCLHlCQUFHakIsU0FBUyxDQUFDTSxNQUFNLGdGQUFoQixtQkFBa0JZLFdBQVcsMERBQTdCLHNCQUErQkMsS0FBSztrQkFDN0QsSUFBSS9ILElBQUksQ0FBQzBDLEdBQUcsQ0FBQ21GLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJN0gsSUFBSSxDQUFDMEMsR0FBRyxDQUFDbUYsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQzNFO29CQUNNRyxJQUFJLEdBQUdOLEtBQUs7b0JBQ2xCQSxLQUFLLEdBQUdDLE1BQU07b0JBQ2RBLE1BQU0sR0FBR0ssSUFBSTtrQkFDZjtnQkFDRjtnQkFDQWpQLG9CQUFvQixDQUFDLGVBQWUsRUFBRTJPLEtBQUssR0FBRyxHQUFHLEdBQUdDLE1BQU0sQ0FBQztjQUM3RDtZQUNGOztZQUVBO1lBQ0E1TyxvQkFBb0IsQ0FBQyxvQkFBb0Isd0JBQUU2TixTQUFTLENBQUNxQixPQUFPLHVEQUFqQixtQkFBbUJqVCxNQUFNLENBQUM7O1lBRXJFO1lBQ0EsSUFBSSxDQUFDNlIsTUFBTSxDQUFDbEIsU0FBUyxFQUFFO2NBQ3JCLElBQUlrQixNQUFNLENBQUNFLGFBQWEsRUFBRTtnQkFDeEI7Z0JBQ0ltQixRQUFRLEdBQUdyQixNQUFNLGFBQU5BLE1BQU0sZ0RBQU5BLE1BQU0sQ0FBRUUsYUFBYSxvRkFBckIsc0JBQXVCb0IsTUFBTSwyREFBN0IsdUJBQStCNUwsR0FBRyxDQUFDLFVBQVMyRyxDQUFDLEVBQUU7a0JBQzVELE9BQU9BLENBQUMsQ0FBQ2tGLEtBQUssR0FBRyxHQUFHLEdBQUdsRixDQUFDLENBQUNtRixPQUFPO2dCQUNsQyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxFQUFFLEVBQ1Q7Z0JBQ0FKLFFBQVEsSUFBS3JCLE1BQU0sYUFBTkEsTUFBTSx5Q0FBTkEsTUFBTSxDQUFFRSxhQUFhLG1EQUFyQix1QkFBdUJ3QixNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUk7Z0JBQzFEO2dCQUNBTCxRQUFRLElBQUlwQixRQUFRO2dCQUNwQi9OLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFbVAsUUFBUSxDQUFDO2NBQ25EO1lBQ0YsQ0FBQyxNQUFNO2NBQ0xuUCxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRThOLE1BQU0sQ0FBQ2xCLFNBQVMsQ0FBQztZQUMzRDtZQUVBNU0sb0JBQW9CLENBQUMsbUJBQW1CLEVBQUU4TixNQUFNLENBQUMyQixtQkFBbUIsQ0FBQztZQUNyRXpQLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFOE4sTUFBTSxDQUFDNEIsUUFBUSxJQUN4RDVCLE1BQU0sQ0FBQzZCLGVBQWUsSUFDdEI3QixNQUFNLENBQUM4QixjQUFjLElBQ3JCOUIsTUFBTSxDQUFDK0IsWUFBWSxDQUNwQjtZQUNEN1Asb0JBQW9CLENBQUMsaUJBQWlCLEVBQUU4TixNQUFNLENBQUNnQyxjQUFjLENBQUM7WUFDOUQ5UCxvQkFBb0IsQ0FBQyxzQkFBc0IsMkJBQUU2TixTQUFTLENBQUNsQixTQUFTLG1GQUFuQixzQkFBcUJvRCxVQUFVLDBEQUEvQixzQkFBaUNDLFFBQVEsQ0FBQzs7WUFFdkY7WUFDQWhRLG9CQUFvQixDQUFDLFdBQVcsRUFBRThOLE1BQU0sQ0FBQ21DLFVBQVUsSUFBSXBDLFNBQVMsQ0FBQ29DLFVBQVUsSUFBSW5DLE1BQU0sQ0FBQ29DLFlBQVksQ0FBQztZQUVuR2xRLG9CQUFvQixDQUFDLEdBQUcsRUFBRTZOLFNBQVMsQ0FBQ3hOLFFBQVEsQ0FBQzhQLFFBQVEsQ0FBQztZQUNoREMsb0JBQW9CLEdBQUd4SSxjQUFjLENBQUN2SSxPQUFPLENBQUN0QixxQ0FBcUMsQ0FBQztZQUMxRixJQUFJLENBQUNxUyxvQkFBb0IsRUFBRTtjQUN6QnhJLGNBQWMsQ0FBQ0csT0FBTyxDQUFDaEsscUNBQXFDLEVBQUU4UCxTQUFTLENBQUN4TixRQUFRLENBQUM4UCxRQUFRLENBQUM7Y0FDMUZuUSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUU2TixTQUFTLENBQUN4TixRQUFRLENBQUM4UCxRQUFRLENBQUM7WUFDekQsQ0FBQyxNQUFNO2NBQ0xuUSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUVvUSxvQkFBb0IsQ0FBQztZQUNsRDtVQUFDO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ0Y7RUFBQSxnQkFwRll4QyxjQUFjO0lBQUE7RUFBQTtBQUFBLEdBb0YxQjtBQUVNLElBQU15QyxVQUFVLEdBQUcsU0FBYkEsVUFBVSxHQUFTO0VBQzlCLElBQU1DLFVBQVUsR0FBRyxJQUFJQyxHQUFHLENBQUMvVCxNQUFNLENBQUM0RCxHQUFHLENBQUMzRCxRQUFRLENBQUNDLElBQUksQ0FBQztFQUNwRHNELG9CQUFvQixDQUFDLEdBQUcsRUFBRXNRLFVBQVUsQ0FBQzVULElBQUksQ0FBQztFQUMxQ3NELG9CQUFvQixDQUFDLEdBQUcsRUFBRXNRLFVBQVUsQ0FBQ0UsUUFBUSxDQUFDOztFQUU5QztFQUNBLElBQUlDLFFBQVE7RUFDWjtFQUNBLElBQUlILFVBQVUsQ0FBQ3RJLFFBQVEsQ0FBQ2pNLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ3hEMFUsUUFBUSxHQUFHLFdBQVc7RUFDeEIsQ0FBQyxNQUFNLElBQUlILFVBQVUsQ0FBQ3RJLFFBQVEsQ0FBQ2pNLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ25FMFUsUUFBUSxHQUFHLFFBQVE7RUFDckIsQ0FBQyxNQUFNLElBQUlILFVBQVUsQ0FBQ3RJLFFBQVEsQ0FBQ2pNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ2pFMFUsUUFBUSxHQUFHLFVBQVU7RUFDdkIsQ0FBQyxNQUFNLElBQUlILFVBQVUsQ0FBQ3RJLFFBQVEsQ0FBQ2pNLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUN6RDBVLFFBQVEsR0FBRyxTQUFTO0VBQ3RCLENBQUMsTUFBTSxJQUFJSCxVQUFVLENBQUN0SSxRQUFRLENBQUNqTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNqRTBVLFFBQVEsR0FBRyxTQUFTO0VBQ3RCLENBQUMsTUFBTSxJQUFJSCxVQUFVLENBQUN0SSxRQUFRLENBQUNqTSxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNoRTBVLFFBQVEsR0FBRyxZQUFZO0VBQ3pCLENBQUMsTUFBTSxJQUFJSCxVQUFVLENBQUN0SSxRQUFRLENBQUNqTSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUM3RDBVLFFBQVEsR0FBRyxVQUFVO0VBQ3ZCLENBQUMsTUFBTSxJQUFJSCxVQUFVLENBQUN0SSxRQUFRLENBQUNqTSxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUM5RDBVLFFBQVEsR0FBRyxTQUFTO0VBQ3RCLENBQUMsTUFBTSxJQUFJSCxVQUFVLENBQUN0SSxRQUFRLENBQUNqTSxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUM5RDBVLFFBQVEsR0FBRyxnQkFBZ0I7RUFDN0IsQ0FBQyxNQUFNLElBQUlILFVBQVUsQ0FBQ3RJLFFBQVEsQ0FBQ2pNLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ25FMFUsUUFBUSxHQUFHLGFBQWE7RUFDMUIsQ0FBQyxNQUFNLElBQUlILFVBQVUsQ0FBQ3RJLFFBQVEsQ0FBQ2pNLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQzlEMFUsUUFBUSxHQUFHLGtCQUFrQjtFQUMvQixDQUFDLE1BQU0sSUFBSUgsVUFBVSxDQUFDdEksUUFBUSxDQUFDak0sT0FBTyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDckUwVSxRQUFRLEdBQUcsc0JBQXNCO0VBQ25DLENBQUMsTUFBTSxJQUFJSCxVQUFVLENBQUN0SSxRQUFRLENBQUNqTSxPQUFPLENBQUMscUNBQXFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNsRjBVLFFBQVEsR0FBRyxrQkFBa0I7RUFDL0I7RUFFQSxJQUFJQSxRQUFRLEVBQUU7SUFDWnpRLG9CQUFvQixDQUFDLFVBQVUsRUFBRXlRLFFBQVEsQ0FBQztFQUM1QztBQUNGLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVEsR0FBUztFQUM1QixJQUFNQyxRQUFRLEdBQ1osQ0FBQ2hFLFNBQVMsQ0FBQ3FCLGFBQWEsSUFDeEIsVUFBVSxDQUFDckYsSUFBSSxDQUFDZ0UsU0FBUyxDQUFDQyxTQUFTLENBQUMsSUFDcEMsQ0FBQyxnQkFBZ0IsQ0FBQ2pFLElBQUksQ0FBQ2dFLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDOztFQUU3QztFQUNBLElBQUksQ0FBQytELFFBQVEsSUFBSSxDQUFDQyxTQUFTLENBQUNDLFNBQVMsRUFBRSxPQUFPN0csT0FBTyxDQUFDQyxPQUFPLEVBQUU7RUFFL0QsSUFBSTZHLFVBQVU7RUFFZCxPQUFPLElBQUk5RyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO0lBQzlCLElBQU04RyxNQUFNLEdBQUcsU0FBVEEsTUFBTTtNQUFBLE9BQVNILFNBQVMsQ0FBQ0MsU0FBUyxFQUFFLENBQUNHLE9BQU8sQ0FBQy9HLE9BQU8sRUFBRSxDQUFDO0lBQUE7SUFDN0Q2RyxVQUFVLEdBQUcvTCxXQUFXLENBQUNnTSxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ3BDQSxNQUFNLEVBQUU7RUFDVixDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDO0lBQUEsT0FBTW5NLGFBQWEsQ0FBQ2lNLFVBQVUsQ0FBQztFQUFBLEVBQUM7QUFDN0MsQ0FBQztBQUVNLElBQU1HLFlBQVksR0FBRyxTQUFmQSxZQUFZLEdBQVM7RUFDaEMsSUFBTUMsY0FBYyxHQUFHMVUsTUFBTSxDQUFDNEMsWUFBWSxDQUFDQyxPQUFPLENBQUNmLDBCQUEwQixDQUFDO0VBQzlFLElBQUk0UyxjQUFjLEtBQUt0VSxPQUFPLEVBQUU7SUFDOUIsa0NBQWtCeUksTUFBTSxDQUFDd0IsSUFBSSxDQUFDdkksa0JBQWtCLENBQUM7TUFBNUMsSUFBTWlILEdBQUc7TUFBcUMvSSxNQUFNLENBQUM0QyxZQUFZLENBQUM0SixVQUFVLENBQUMxSyxrQkFBa0IsQ0FBQ2lILEdBQUcsQ0FBQyxDQUFDO0lBQUM7SUFDM0csa0NBQWtCRixNQUFNLENBQUN3QixJQUFJLENBQUM5SSxvQkFBb0IsQ0FBQztNQUE5QyxJQUFNd0gsS0FBRztNQUF1Qy9JLE1BQU0sQ0FBQ29MLGNBQWMsQ0FBQ29CLFVBQVUsQ0FBQ2pMLG9CQUFvQixDQUFDd0gsS0FBRyxDQUFDLENBQUM7SUFBQztJQUNqSC9JLE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzJJLE9BQU8sQ0FBQ3pKLDBCQUEwQixFQUFFMUIsT0FBTyxDQUFDO0VBQ2xFO0FBQ0YsQ0FBQzs7OztBQ3YzQkQ7QUFDK0I7QUFDVTtBQUV6QyxJQUFNcUQsZ0JBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLGVBQWUsQ0FBQztBQUMxQyxJQUFNbVMsU0FBUyxHQUFHLE9BQU87QUFFbEIsSUFBTUMsaUJBQWlCO0VBQUEsc0VBQUcsaUJBQU9DLGVBQWUsRUFBRUMsZ0JBQWdCLEVBQUVDLFlBQVk7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQUE7WUFFbkZ0UixnQkFBTSxDQUFDUixHQUFHLENBQUMsbUJBQW1CLEVBQUU0UixlQUFlLEVBQUVDLGdCQUFnQixFQUFFQyxZQUFZLENBQUM7O1lBRWhGO1lBQ01DLFVBQVUsR0FBR0wsU0FBUyxHQUFHRSxlQUFlLENBQUN4VixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUM1RDRWLEtBQUssR0FBR0QsVUFBVSxHQUFHLEdBQUcsR0FBR0QsWUFBWTtZQUFBLGNBRXJDQSxZQUFZO1lBQUEsZ0NBQ2IsS0FBSyx1QkFDTCxLQUFLLHVCQVlMLEtBQUssdUJBWUwsS0FBSyx3QkFZTCxNQUFNLHdCQVFOLFNBQVM7WUFBQTtVQUFBO1lBM0NaOztZQUVBLG9CQUFzQixDQUFDblMsWUFBWSxFQUFFd0ksY0FBYyxDQUFDLDBCQUFFO2NBQTNDOEosT0FBTztjQUNWbE0sS0FBSyxHQUFHa00sT0FBTyxDQUFDclMsT0FBTyxDQUFDb1MsS0FBSyxDQUFDO2NBQ3BDLElBQUlqTSxLQUFLLEVBQUU7Z0JBQ1RrTSxPQUFPLENBQUMzSixPQUFPLENBQUMwSixLQUFLLEVBQUV4SyxJQUFJLENBQUNzSyxZQUFZLENBQUMsQ0FBQy9MLEtBQUssRUFBRThMLGdCQUFnQixDQUFDLENBQUM7Y0FDckUsQ0FBQyxNQUFNO2dCQUNMSSxPQUFPLENBQUMzSixPQUFPLENBQUMwSixLQUFLLEVBQUVILGdCQUFnQixDQUFDO2NBQzFDO1lBQ0Y7WUFBQztVQUFBO1lBR0Q7WUFDQSxzQkFBc0IsQ0FBQ2xTLFlBQVksRUFBRXdJLGNBQWMsQ0FBQyw2QkFBRTtjQUEzQzhKLFFBQU87Y0FDVmxNLE1BQUssR0FBR2tNLFFBQU8sQ0FBQ3JTLE9BQU8sQ0FBQ29TLEtBQUssQ0FBQztjQUNwQyxJQUFJak0sTUFBSyxFQUFFO2dCQUNUa00sUUFBTyxDQUFDM0osT0FBTyxDQUFDMEosS0FBSyxFQUFFRSxVQUFVLENBQUNuTSxNQUFLLENBQUMsR0FBR21NLFVBQVUsQ0FBQ0wsZ0JBQWdCLENBQUMsQ0FBQztjQUMxRSxDQUFDLE1BQU07Z0JBQ0xJLFFBQU8sQ0FBQzNKLE9BQU8sQ0FBQzBKLEtBQUssRUFBRUgsZ0JBQWdCLENBQUM7Y0FDMUM7WUFDRjtZQUFDO1VBQUE7WUFJRDtZQUNBLHNCQUFzQixDQUFDbFMsWUFBWSxFQUFFd0ksY0FBYyxDQUFDLDZCQUFFO2NBQTNDOEosU0FBTztjQUNWbE0sT0FBSyxHQUFHa00sU0FBTyxDQUFDclMsT0FBTyxDQUFDb1MsS0FBSyxDQUFDO2NBQ3BDLElBQUlqTSxPQUFLLEVBQUU7Z0JBQ1RrTSxTQUFPLENBQUMzSixPQUFPLENBQUMwSixLQUFLLEVBQUVqSixRQUFRLENBQUNoRCxPQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Y0FDN0MsQ0FBQyxNQUFNO2dCQUNMa00sU0FBTyxDQUFDM0osT0FBTyxDQUFDMEosS0FBSyxFQUFFLENBQUMsQ0FBQztjQUMzQjtZQUNGO1lBQUM7VUFBQTtZQUlEO1lBQ0Esc0JBQXNCLENBQUNyUyxZQUFZLEVBQUV3SSxjQUFjLENBQUMsNkJBQUU7Y0FBM0M4SixTQUFPO2NBQ2hCQSxTQUFPLENBQUMzSixPQUFPLENBQUMwSixLQUFLLEVBQUVILGdCQUFnQixDQUFDO1lBQzFDO1lBQUM7VUFBQTtZQU1DO1lBQ0E7WUFDTU0sT0FBTyxHQUFHdk4sZUFBZSxDQUFDaU4sZ0JBQWdCLENBQUM7WUFFM0NPLFFBQVEsR0FBR0osS0FBSyxHQUFHLEdBQUcsR0FBR0csT0FBTztZQUNoQ0UsWUFBWSxHQUFHTCxLQUFLLEdBQUcsR0FBRyxHQUFHRyxPQUFPLEdBQUcsT0FBTztZQUNwRHhTLFlBQVksQ0FBQzJJLE9BQU8sQ0FBQytKLFlBQVksRUFBRVIsZ0JBQWdCLENBQUM7WUFFcEQsc0JBQXNCLENBQUNsUyxZQUFZLEVBQUV3SSxjQUFjLENBQUMsNkJBQUU7Y0FBM0M4SixTQUFPO2NBQ1ZsTSxPQUFLLEdBQUdrTSxTQUFPLENBQUNyUyxPQUFPLENBQUN3UyxRQUFRLENBQUM7Y0FDdkMsSUFBSXJNLE9BQUssRUFBRTtnQkFDVGtNLFNBQU8sQ0FBQzNKLE9BQU8sQ0FBQzhKLFFBQVEsRUFBRXJKLFFBQVEsQ0FBQ2hELE9BQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztjQUNoRCxDQUFDLE1BQU07Z0JBQ0xrTSxTQUFPLENBQUMzSixPQUFPLENBQUM4SixRQUFRLEVBQUUsQ0FBQyxDQUFDO2NBQzlCO1lBQ0Y7WUFBQztVQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFRUDVSLGdCQUFNLENBQUNGLEtBQUssQ0FBQyw0QkFBNEIsRUFBRXNSLGVBQWUsRUFBRUMsZ0JBQWdCLEVBQUVDLFlBQVksY0FBSTtVQUFDO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBRWxHO0VBQUEsZ0JBakZZSCxpQkFBaUI7SUFBQTtFQUFBO0FBQUEsR0FpRjdCO0FBRU0sSUFBTVcsZ0JBQWdCO0VBQUEsdUVBQUcsa0JBQU9WLGVBQWUsRUFBRVcsV0FBVyxFQUFFeFYsTUFBTTtJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUV2RXlELGdCQUFNLENBQUNSLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTRSLGVBQWUsRUFBRVcsV0FBVyxFQUFFeFYsTUFBTSxDQUFDO1lBRTlEZ1YsVUFBVSxHQUFHTCxTQUFTLEdBQUdFLGVBQWUsQ0FBQ3hWLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBRzlENlYsT0FBTyxHQUFHLElBQUk7WUFBQSxNQUNkbFYsTUFBTSxLQUFLLFNBQVM7Y0FBQTtjQUFBO1lBQUE7WUFDdEJrVixPQUFPLEdBQUd0UyxZQUFZO1lBQUM7WUFBQTtVQUFBO1lBQUEsTUFDZDVDLE1BQU0sS0FBSyxTQUFTO2NBQUE7Y0FBQTtZQUFBO1lBQzdCa1YsT0FBTyxHQUFHOUosY0FBYztZQUFDO1lBQUE7VUFBQTtZQUV6QjNILGdCQUFNLENBQUNGLEtBQUssQ0FBQyxxQkFBcUIsRUFBRXZELE1BQU0sQ0FBQztZQUFDLGtDQUNyQyxJQUFJO1VBQUE7WUFBQSxlQUdMd1YsV0FBVztZQUFBLGtDQUVaLEtBQUsseUJBQ0wsS0FBSyx5QkFDTCxLQUFLLHlCQUNMLE1BQU0seUJBTU4sU0FBUyx5QkFDVCxTQUFTLHlCQUNULE1BQU07WUFBQTtVQUFBO1lBUFRQLEtBQUssR0FBR0QsVUFBVSxHQUFHLEdBQUcsR0FBR1EsV0FBVztZQUFDLGtDQUNoQ04sT0FBTyxDQUFDclMsT0FBTyxDQUFDb1MsS0FBSyxDQUFDO1VBQUE7WUFRN0JBLEtBQUssR0FBR0QsVUFBVSxHQUFHLFVBQVU7WUFDekJTLFNBQVMsR0FBRzVNLE1BQU0sQ0FBQ3dCLElBQUksQ0FBQzZLLE9BQU8sQ0FBQztZQUNoQ1EsaUJBQWlCLEdBQUdELFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFVBQUM1TSxHQUFHO2NBQUEsT0FBS0EsR0FBRyxDQUFDeEosT0FBTyxDQUFDMFYsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJbE0sR0FBRyxDQUFDeEosT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFBLEVBQUM7WUFBQSxNQUN4R2lXLFdBQVcsS0FBSyxTQUFTO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQ3BCRSxpQkFBaUIsQ0FBQ2pXLE1BQU07VUFBQTtZQUFBLE1BQ3RCK1YsV0FBVyxLQUFLLFNBQVM7Y0FBQTtjQUFBO1lBQUE7WUFDOUJJLEdBQUcsR0FBRyxDQUFDO1lBQ1hGLGlCQUFpQixDQUFDdlMsT0FBTyxDQUFDLFVBQUM0RixHQUFHLEVBQUs7Y0FDakM2TSxHQUFHLElBQUk1SixRQUFRLENBQUNrSixPQUFPLENBQUNyUyxPQUFPLENBQUNrRyxHQUFHLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUM7WUFBQyxrQ0FDSTZNLEdBQUc7VUFBQTtZQUdSQyxRQUFRLEdBQUcsSUFBSTtZQUNmQyxNQUFNLEdBQUcsSUFBSTtZQUNqQkosaUJBQWlCLENBQUN2UyxPQUFPLENBQUMsVUFBQzRGLEdBQUcsRUFBSztjQUNqQyxJQUFNZ04sR0FBRyxHQUFHL0osUUFBUSxDQUFDa0osT0FBTyxDQUFDclMsT0FBTyxDQUFDa0csR0FBRyxDQUFDLENBQUM7Y0FDMUMsSUFBSStNLE1BQU0sS0FBSyxJQUFJLElBQUlELFFBQVEsS0FBSyxJQUFJLElBQUlBLFFBQVEsR0FBR0UsR0FBRyxFQUFFO2dCQUMxREYsUUFBUSxHQUFHRSxHQUFHO2dCQUNkO2dCQUNBRCxNQUFNLEdBQUdsVCxZQUFZLENBQUNDLE9BQU8sQ0FBQ2tHLEdBQUcsR0FBRyxPQUFPLENBQUM7Y0FDOUM7WUFDRixDQUFDLENBQUM7WUFBQyxrQ0FDSStNLE1BQU07VUFBQTtZQUFBLGtDQUlOLElBQUk7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFHZnJTLGdCQUFNLENBQUNGLEtBQUssQ0FBQywyQkFBMkIsRUFBRXNSLGVBQWUsRUFBRVcsV0FBVyxFQUFFeFYsTUFBTSxlQUFJO1lBQUMsa0NBQzVFLElBQUk7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUVkO0VBQUEsZ0JBakVZdVYsZ0JBQWdCO0lBQUE7RUFBQTtBQUFBLEdBaUU1Qjs7QUMzSkQ7QUFDQTtBQUNPLElBQU1TLFdBQVcsR0FBRztBQUN6QjtBQUNBO0FBQ0E7RUFBQ0MsY0FBYyxFQUFFLEdBQUc7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSxVQUFVO0VBQUVzTCxJQUFJLEVBQUUsVUFBVTtFQUFFQyxTQUFTLEVBQUU7QUFBaUIsQ0FBQyxFQUNsSDtFQUFDSCxjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLFNBQVM7RUFBRXNMLElBQUksRUFBRTtBQUFlLENBQUMsRUFDeEY7RUFBQ0YsY0FBYyxFQUFFLEdBQUc7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSxRQUFRO0VBQUVzTCxJQUFJLEVBQUU7QUFBVyxDQUFDLEVBRW5GO0VBQUNGLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVyTCxRQUFRLEVBQUUsY0FBYztFQUFFc0wsSUFBSSxFQUFFO0FBQVUsQ0FBQyxFQUMxRjtFQUFDRixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLGNBQWM7RUFBRXNMLElBQUksRUFBRTtBQUFXLENBQUMsRUFDM0Y7RUFBQ0YsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSxrQkFBa0I7RUFBRXNMLElBQUksRUFBRTtBQUFXLENBQUMsRUFDL0Y7RUFBQ0YsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSxhQUFhO0VBQUVzTCxJQUFJLEVBQUUsU0FBUztFQUFFQyxTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQ2xIO0VBQUNILGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVyTCxRQUFRLEVBQUUsV0FBVztFQUFFc0wsSUFBSSxFQUFFO0FBQVMsQ0FBQyxFQUN0RjtFQUFDRixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLGtCQUFrQjtFQUFFc0wsSUFBSSxFQUFFO0FBQWMsQ0FBQyxFQUNsRztFQUFDRixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLG1DQUFtQztFQUFFc0wsSUFBSSxFQUFFO0FBQWUsQ0FBQyxFQUNwSDtFQUFDRixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLHVCQUF1QjtFQUFFc0wsSUFBSSxFQUFFLFNBQVM7RUFBRUMsU0FBUyxFQUFFO0FBQVMsQ0FBQyxFQUN4SDtFQUFDSCxjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLDRCQUE0QjtFQUFFc0wsSUFBSSxFQUFFLGNBQWM7RUFBRUMsU0FBUyxFQUFFO0FBQVMsQ0FBQyxFQUNsSTtFQUFDSCxjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLGdDQUFnQztFQUFFc0wsSUFBSSxFQUFFLGtCQUFrQjtFQUFFQyxTQUFTLEVBQUU7QUFBUyxDQUFDLEVBQzFJO0VBQUNILGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVyTCxRQUFRLEVBQUUsZ0NBQWdDO0VBQUVzTCxJQUFJLEVBQUUsa0JBQWtCO0VBQUVDLFNBQVMsRUFBRTtBQUFTLENBQUMsRUFDMUk7RUFBQ0gsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSxnQ0FBZ0M7RUFBRXNMLElBQUksRUFBRSxrQkFBa0I7RUFBRUMsU0FBUyxFQUFFO0FBQVMsQ0FBQyxFQUUxSTtFQUFDSCxjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLGdCQUFnQjtFQUFFc0wsSUFBSSxFQUFFLG1CQUFtQjtFQUFFRSxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXO0FBQUMsQ0FBQyxFQUMxTDtFQUFDSixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLGFBQWE7RUFBRXNMLElBQUksRUFBRSxRQUFRO0VBQUVFLFNBQVMsRUFBRSxDQUFDLG1CQUFtQjtBQUFDLENBQUMsRUFDekg7RUFBQ0osY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSx3QkFBd0I7RUFBRXNMLElBQUksRUFBRSxzQkFBc0I7RUFBRUUsU0FBUyxFQUFFLENBQUMsbUJBQW1CO0FBQUMsQ0FBQyxFQUNsSjtFQUFDSixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLGNBQWM7RUFBRXNMLElBQUksRUFBRSxVQUFVO0VBQUVFLFNBQVMsRUFBRSxDQUFDLG1CQUFtQjtBQUFDLENBQUMsRUFDNUg7RUFBQ0osY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSxjQUFjO0VBQUVzTCxJQUFJLEVBQUUsV0FBVztFQUFFRSxTQUFTLEVBQUUsQ0FBQyxtQkFBbUI7QUFBQyxDQUFDLEVBQzdIO0VBQUNKLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVyTCxRQUFRLEVBQUUsa0JBQWtCO0VBQUVzTCxJQUFJLEVBQUUsV0FBVztFQUFFRSxTQUFTLEVBQUUsQ0FBQyxtQkFBbUI7QUFBQyxDQUFDLEVBRWpJO0VBQUNKLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVyTCxRQUFRLEVBQUUsa0NBQWtDO0VBQUVzTCxJQUFJLEVBQUU7QUFBZSxDQUFDLEVBQ3hIO0VBQUNGLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVyTCxRQUFRLEVBQUUscUNBQXFDO0VBQUVzTCxJQUFJLEVBQUU7QUFBaUIsQ0FBQyxFQUM3SDtFQUFDRixjQUFjLEVBQUUsVUFBVTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLHdDQUF3QztFQUFFc0wsSUFBSSxFQUFFO0FBQXFCLENBQUMsRUFDcEk7RUFBQ0YsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSx3Q0FBd0M7RUFBRXNMLElBQUksRUFBRTtBQUFxQixDQUFDLEVBQ3BJO0VBQUNGLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVyTCxRQUFRLEVBQUUsbUNBQW1DO0VBQUVzTCxJQUFJLEVBQUU7QUFBa0IsQ0FBQyxFQUM1SDtFQUFDRixjQUFjLEVBQUUsVUFBVTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFckwsUUFBUSxFQUFFLHdDQUF3QztFQUFFc0wsSUFBSSxFQUFFO0FBQWtCLENBQUMsRUFDakk7RUFBQ0YsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRXJMLFFBQVEsRUFBRSw0Q0FBNEM7RUFBRXNMLElBQUksRUFBRTtBQUFzQixDQUFDO0FBRXpJO0FBQ0E7QUFDQTtFQUFDRixjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLDhDQUE4QztFQUFFc0wsSUFBSSxFQUFFLFVBQVU7RUFBRUcsT0FBTyxFQUFFLDZCQUE2QjtFQUFFdE4sS0FBSyxFQUFFO0FBQVUsQ0FBQyxFQUNoTDtFQUFDaU4sY0FBYyxFQUFFLEdBQUc7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxvQ0FBb0M7RUFBRXNMLElBQUksRUFBRSxVQUFVO0VBQUVHLE9BQU8sRUFBRSw2QkFBNkI7RUFBRXROLEtBQUssRUFBRTtBQUFLLENBQUMsRUFDaks7RUFBQ2lOLGNBQWMsRUFBRSxHQUFHO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsbUNBQW1DO0VBQUVzTCxJQUFJLEVBQUUsVUFBVTtFQUFFRyxPQUFPLEVBQUUsNkJBQTZCO0VBQUV0TixLQUFLLEVBQUU7QUFBSyxDQUFDLEVBQ2hLO0VBQUNpTixjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLHNCQUFzQjtFQUFFc0wsSUFBSSxFQUFFLFVBQVU7RUFBRUcsT0FBTyxFQUFFLDZCQUE2QjtFQUFFdE4sS0FBSyxFQUFFO0FBQUssQ0FBQyxFQUVuSjtFQUFDaU4sY0FBYyxFQUFFLGtCQUFrQjtFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLCtCQUErQjtFQUFFc0wsSUFBSSxFQUFFLGlCQUFpQjtFQUFFRyxPQUFPLEVBQUU7QUFBc0IsQ0FBQyxFQUM3SjtFQUFDTCxjQUFjLEVBQUUsa0JBQWtCO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsZ0NBQWdDO0VBQUVzTCxJQUFJLEVBQUUsY0FBYztFQUFFRyxPQUFPLEVBQUUsc0JBQXNCO0VBQUVELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLGVBQWUsRUFBRSwwQkFBMEI7QUFBQyxDQUFDLEVBQzVPO0VBQUNKLGNBQWMsRUFBRSxrQkFBa0I7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxvREFBb0Q7RUFBRXNMLElBQUksRUFBRSwwQkFBMEI7RUFBRUcsT0FBTyxFQUFFLHlCQUF5QjtFQUFFRCxTQUFTLEVBQUUsQ0FBQyxjQUFjO0FBQUMsQ0FBQztBQUMzTjtBQUNBO0VBQUNKLGNBQWMsRUFBRSxrQkFBa0I7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxpQ0FBaUM7RUFBRXNMLElBQUksRUFBRSxxQkFBcUI7RUFBRUcsT0FBTyxFQUFFLG1CQUFtQjtFQUFFRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUM7RUFBRUQsU0FBUyxFQUFFO0FBQWEsQ0FBQyxFQUNuUDtFQUFDSCxjQUFjLEVBQUUsa0JBQWtCO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUscURBQXFEO0VBQUVzTCxJQUFJLEVBQUUsZUFBZTtFQUFFRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVELFNBQVMsRUFBRSxDQUFDLGNBQWM7QUFBQyxDQUFDLEVBRTNNO0VBQUNKLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsNEJBQTRCO0VBQUVzTCxJQUFJLEVBQUUsa0JBQWtCO0VBQUVHLE9BQU8sRUFBRTtBQUFtQixDQUFDLEVBQzNJO0VBQUNMLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsNEJBQTRCO0VBQUVzTCxJQUFJLEVBQUUsMkJBQTJCO0VBQUVHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUYsU0FBUyxFQUFFO0FBQW9CLENBQUMsRUFDckw7RUFBQ0gsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSx3REFBd0Q7RUFBRXNMLElBQUksRUFBRSxVQUFVO0VBQUVHLE9BQU8sRUFBRTtBQUFtQixDQUFDLEVBQy9KO0VBQUNMLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsb0NBQW9DO0VBQUVzTCxJQUFJLEVBQUUsbUJBQW1CO0VBQUVHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUQsU0FBUyxFQUFFLENBQUMsb0JBQW9CO0FBQUMsQ0FBQyxFQUN2TDtFQUFDSixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLGlEQUFpRDtFQUFFc0wsSUFBSSxFQUFFLG9CQUFvQjtFQUFFRyxPQUFPLEVBQUUsc0JBQXNCO0VBQUVELFNBQVMsRUFBRSxDQUFDLG1CQUFtQjtBQUFDLENBQUMsRUFDdk07RUFBQ0osY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxZQUFZO0VBQUVzTCxJQUFJLEVBQUUsV0FBVztFQUFFRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVGLFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDOUk7RUFBQ0gsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxjQUFjO0VBQUVzTCxJQUFJLEVBQUUsV0FBVztFQUFFRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVGLFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDaEo7RUFBQ0gsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSx1QkFBdUI7RUFBRXNMLElBQUksRUFBRSxpQkFBaUI7RUFBRUksUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO0VBQUVELE9BQU8sRUFBRTtBQUFpQixDQUFDLEVBQzVKO0VBQUNMLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsd0JBQXdCO0VBQUVzTCxJQUFJLEVBQUUsaUJBQWlCO0VBQUVJLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztFQUFFRCxPQUFPLEVBQUU7QUFBaUIsQ0FBQyxFQUU3SjtFQUFDTCxjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLCtCQUErQjtFQUFFc0wsSUFBSSxFQUFFLGVBQWU7RUFBRUcsT0FBTyxFQUFFLG1CQUFtQjtFQUFFRixTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQ3JLO0VBQUNILGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsa0NBQWtDO0VBQUVzTCxJQUFJLEVBQUUsVUFBVTtFQUFFRyxPQUFPLEVBQUU7QUFBbUIsQ0FBQyxFQUN6STtFQUFDTCxjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLGlDQUFpQztFQUFFc0wsSUFBSSxFQUFFLHVCQUF1QjtFQUFFRyxPQUFPLEVBQUUseUJBQXlCO0VBQUV0TixLQUFLLEVBQUU7QUFBa0IsQ0FBQyxFQUN0TDtFQUFDaU4sY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxlQUFlO0VBQUVzTCxJQUFJLEVBQUUsNEJBQTRCO0VBQUVJLFFBQVEsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0VBQUVELE9BQU8sRUFBRTtBQUFpQixDQUFDLEVBRTNLO0VBQUNMLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsb0NBQW9DO0VBQUVzTCxJQUFJLEVBQUUsY0FBYztFQUFFRyxPQUFPLEVBQUUsc0JBQXNCO0VBQUVELFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLHdCQUF3QjtBQUFDLENBQUMsRUFDdFY7RUFBQ0osY0FBYyxFQUFFLFFBQVE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSwrQkFBK0I7RUFBRXNMLElBQUksRUFBRSxlQUFlO0VBQUVHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUQsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO0VBQUVELFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDck07RUFBQ0gsY0FBYyxFQUFFLFFBQVE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxtQkFBbUI7RUFBRXNMLElBQUksRUFBRSxpQkFBaUI7RUFBRUcsT0FBTyxFQUFFLHlCQUF5QjtFQUFFdE4sS0FBSyxFQUFFLGVBQWU7RUFBRXFOLFNBQVMsRUFBRSxDQUFDLGNBQWM7QUFBQyxDQUFDLEVBQy9MO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsYUFBYTtFQUFFc0wsSUFBSSxFQUFFLGlCQUFpQjtFQUFFRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVELFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztFQUFFRCxTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQ3JMO0VBQUNILGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsaUNBQWlDO0VBQUVzTCxJQUFJLEVBQUUsc0JBQXNCO0VBQUVHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUQsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO0VBQUVELFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDOU07RUFBQ0gsY0FBYyxFQUFFLFFBQVE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSw2Q0FBNkM7RUFBRXNMLElBQUksRUFBRSwwQkFBMEI7RUFBRUcsT0FBTyxFQUFFLHlCQUF5QjtFQUFFRCxTQUFTLEVBQUUsQ0FBQyxjQUFjO0FBQUMsQ0FBQztBQUMxTTtBQUNBO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsY0FBYztFQUFFc0wsSUFBSSxFQUFFLFdBQVc7RUFBRUcsT0FBTyxFQUFFLHlCQUF5QjtFQUFFdE4sS0FBSyxFQUFFLFVBQVU7RUFBRXFOLFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSwwQkFBMEI7QUFBQyxDQUFDLEVBQzNNO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsY0FBYztFQUFFc0wsSUFBSSxFQUFFLGlCQUFpQjtFQUFFRyxPQUFPLEVBQUUseUJBQXlCO0VBQUV0TixLQUFLLEVBQUUsc0JBQXNCO0VBQUVxTixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCO0FBQUMsQ0FBQyxFQUM3TjtFQUFDSixjQUFjLEVBQUUsUUFBUTtFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLGNBQWM7RUFBRXNMLElBQUksRUFBRSxhQUFhO0VBQUVHLE9BQU8sRUFBRSx5QkFBeUI7RUFBRXROLEtBQUssRUFBRSxZQUFZO0VBQUVxTixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCO0FBQUMsQ0FBQztBQUMvTTtBQUNBO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsdUJBQXVCO0VBQUVzTCxJQUFJLEVBQUUsd0JBQXdCO0VBQUVJLFFBQVEsRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSw2QkFBNkIsQ0FBQztFQUFFRCxPQUFPLEVBQUU7QUFBaUIsQ0FBQztBQUNsVztBQUNBO0VBQUNMLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsZUFBZTtFQUFFc0wsSUFBSSxFQUFFLHdCQUF3QjtFQUFFSSxRQUFRLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsNkJBQTZCLENBQUM7RUFBRUQsT0FBTyxFQUFFO0FBQWlCLENBQUMsRUFFMVY7RUFBQ0wsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSwrQ0FBK0M7RUFBRXNMLElBQUksRUFBRSxrQkFBa0I7RUFBRUcsT0FBTyxFQUFFLG1CQUFtQjtFQUFFRixTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQzdMO0VBQUNILGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsd0NBQXdDO0VBQUVzTCxJQUFJLEVBQUUsbUJBQW1CO0VBQUVHLE9BQU8sRUFBRTtBQUFtQixDQUFDLEVBQzdKO0VBQUNMLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUseUNBQXlDO0VBQUVzTCxJQUFJLEVBQUUsc0JBQXNCO0VBQUVHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUYsU0FBUyxFQUFFO0FBQXNCLENBQUMsRUFDcE07RUFBQ0gsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSwyQ0FBMkM7RUFBRXNMLElBQUksRUFBRSxzQkFBc0I7RUFBRUcsT0FBTyxFQUFFLG1CQUFtQjtFQUFFRixTQUFTLEVBQUU7QUFBc0IsQ0FBQyxFQUN0TTtFQUFDSCxjQUFjLEVBQUUsVUFBVTtFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLGdEQUFnRDtFQUFFc0wsSUFBSSxFQUFFLGVBQWU7RUFBRUcsT0FBTyxFQUFFLHlCQUF5QjtFQUFFdE4sS0FBSyxFQUFFO0FBQVUsQ0FBQztBQUUxTDtBQUNBO0FBQ0E7RUFBQ2lOLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVyTCxRQUFRLEVBQUUsS0FBSztFQUFFc0wsSUFBSSxFQUFFO0FBQVMsQ0FBQyxFQUM1RTtFQUFDRixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsU0FBUztFQUFFckwsUUFBUSxFQUFFLEtBQUs7RUFBRXNMLElBQUksRUFBRTtBQUFTLENBQUMsRUFDNUU7RUFBQ0YsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLFNBQVM7RUFBRXJMLFFBQVEsRUFBRSxNQUFNO0VBQUVzTCxJQUFJLEVBQUUsVUFBVTtFQUFFRyxPQUFPLEVBQUUsaUJBQWlCO0VBQUV0TixLQUFLLEVBQUU7QUFBZSxDQUFDLEVBQ2xJO0VBQUNpTixjQUFjLEVBQUUsS0FBSztFQUFFQyxNQUFNLEVBQUUsU0FBUztFQUFFckwsUUFBUSxFQUFFLHdCQUF3QjtFQUFFc0wsSUFBSSxFQUFFO0FBQXFCLENBQUMsRUFDM0c7RUFBQ0YsY0FBYyxFQUFFLEtBQUs7RUFBRUMsTUFBTSxFQUFFLFNBQVM7RUFBRXJMLFFBQVEsRUFBRSx3QkFBd0I7RUFBRXNMLElBQUksRUFBRTtBQUFpQixDQUFDLEVBRXZHO0VBQUNGLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVyTCxRQUFRLEVBQUUsaUJBQWlCO0VBQUVzTCxJQUFJLEVBQUU7QUFBVSxDQUFDLEVBQ3pGO0VBQUNGLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVyTCxRQUFRLEVBQUUsMEJBQTBCO0VBQUVzTCxJQUFJLEVBQUU7QUFBZSxDQUFDLEVBQ3ZHO0VBQUNGLGNBQWMsRUFBRSxLQUFLO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVyTCxRQUFRLEVBQUUsd0NBQXdDO0VBQUVzTCxJQUFJLEVBQUU7QUFBaUIsQ0FBQztBQUV2SDtBQUNBO0FBQ0E7RUFBQ0YsY0FBYyxFQUFFLEdBQUc7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRXJMLFFBQVEsRUFBRSxrQkFBa0I7RUFBRXNMLElBQUksRUFBRTtBQUFvQixDQUFDLEVBQ25HO0VBQUNGLGNBQWMsRUFBRSxHQUFHO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVyTCxRQUFRLEVBQUUsU0FBUztFQUFFc0wsSUFBSSxFQUFFLGVBQWU7RUFBRUMsU0FBUyxFQUFFO0FBQVUsQ0FBQyxFQUM1RztFQUFDSCxjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFckwsUUFBUSxFQUFFLFFBQVE7RUFBRXNMLElBQUksRUFBRTtBQUFXLENBQUMsQ0FDakY7QUFFTSxJQUFNSyxxQkFBcUIsR0FBRztFQUNuQyxZQUFZLEVBQUUsQ0FDWjtJQUFDekIsWUFBWSxFQUFFO0VBQUssQ0FBQyxFQUNyQjtJQUFDUyxXQUFXLEVBQUUsS0FBSztJQUFFeFYsTUFBTSxFQUFFLFNBQVM7SUFBRXlXLFdBQVcsRUFBRTtFQUF3QixDQUFDLENBQy9FO0VBQ0QsVUFBVSxFQUFFLENBQ1Y7SUFBQzFCLFlBQVksRUFBRTtFQUFTLENBQUMsRUFDekI7SUFBQ1MsV0FBVyxFQUFFLFNBQVM7SUFBRXhWLE1BQU0sRUFBRSxTQUFTO0lBQUV5VyxXQUFXLEVBQUU7RUFBZ0MsQ0FBQyxFQUMxRjtJQUFDakIsV0FBVyxFQUFFLFNBQVM7SUFBRXhWLE1BQU0sRUFBRSxTQUFTO0lBQUV5VyxXQUFXLEVBQUU7RUFBZ0MsQ0FBQyxDQUMzRjtFQUNELDZCQUE2QixFQUFFLENBQzdCO0lBQUMxQixZQUFZLEVBQUU7RUFBTSxDQUFDLEVBQ3RCO0lBQUNTLFdBQVcsRUFBRSxNQUFNO0lBQUV4VixNQUFNLEVBQUUsU0FBUztJQUFFeVcsV0FBVyxFQUFFO0VBQXFDLENBQUMsQ0FDN0Y7RUFDRCxjQUFjLEVBQUUsQ0FDZDtJQUFDMUIsWUFBWSxFQUFFO0VBQVMsQ0FBQyxFQUN6QjtJQUFDQSxZQUFZLEVBQUU7RUFBTSxDQUFDLEVBQ3RCO0lBQUNTLFdBQVcsRUFBRSxNQUFNO0lBQUV4VixNQUFNLEVBQUUsU0FBUztJQUFFeVcsV0FBVyxFQUFFO0VBQW1DLENBQUMsRUFDMUY7SUFBQ2pCLFdBQVcsRUFBRSxNQUFNO0lBQUV4VixNQUFNLEVBQUUsU0FBUztJQUFFeVcsV0FBVyxFQUFFO0VBQW1DLENBQUMsQ0FDM0Y7RUFDRCxXQUFXLEVBQUUsQ0FDWDtJQUFDMUIsWUFBWSxFQUFFO0VBQU0sQ0FBQyxFQUN0QjtJQUFDUyxXQUFXLEVBQUUsTUFBTTtJQUFFeFYsTUFBTSxFQUFFLFNBQVM7SUFBRXlXLFdBQVcsRUFBRTtFQUErQixDQUFDLEVBQ3RGO0lBQUNDLFlBQVksRUFBRTtFQUFvQixDQUFDLENBQ3JDO0VBQ0QsY0FBYyxFQUFFLENBQ2Q7SUFBQ0EsWUFBWSxFQUFFO0VBQTJCLENBQUMsQ0FDNUM7RUFDRCxxQkFBcUIsRUFBRSxDQUNyQjtJQUFDQSxZQUFZLEVBQUU7RUFBMkIsQ0FBQyxDQUM1QztFQUNELDBCQUEwQixFQUFFLENBQzFCO0lBQUNBLFlBQVksRUFBRTtFQUEyQixDQUFDLENBQzVDO0VBQ0QsYUFBYSxFQUFFLENBQ2I7SUFBQ0EsWUFBWSxFQUFFO0VBQTJCLENBQUMsQ0FDNUM7RUFDRCxpQkFBaUIsRUFBRSxDQUNqQjtJQUFDQSxZQUFZLEVBQUU7RUFBMkIsQ0FBQyxDQUM1QztFQUNELFNBQVMsRUFBRSxDQUNUO0lBQUNBLFlBQVksRUFBRTtFQUFvQixDQUFDO0FBRXhDLENBQUM7QUFFTSxJQUFNQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7QUFDdEM7O0FBRUE7QUFDQUEsb0JBQW9CLENBQUNDLHlCQUF5QixxMkRBMEM3QztBQUVERCxvQkFBb0IsQ0FBQ0Usa0JBQWtCLHF0QkFpQnRDOzs7Ozs7OztBQ3hORDtBQUMyRDtBQUNLO0FBQ21CO0FBQ3BEO0FBRS9CN1csTUFBTSxDQUFDOFcsZUFBZSxHQUFHOVcsTUFBTSxDQUFDOFcsZUFBZSxJQUFJO0VBQ2pEQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQUVwSixDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQUVxSixDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQUVyTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQUVzTyxLQUFLLEVBQUU7QUFDckMsQ0FBQztBQUVELElBQU14VCxzQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsZUFBZSxDQUFDO0FBRTFDLElBQU0wVSwwQkFBMEIsR0FBRyxTQUE3QkEsMEJBQTBCLEdBQVM7RUFDdkMsSUFBTUMsU0FBUyxHQUFHblgsTUFBTSxDQUFDNEQsR0FBRyxDQUFDa1QsZUFBZTtFQUM1QztFQUNBSyxTQUFTLENBQUNGLEtBQUssSUFBSSxDQUFDO0FBQ3RCLENBQUM7QUFFTSxJQUFNelQsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUFvQixDQUFJdUYsR0FBRyxFQUFFQyxLQUFLLEVBQUs7RUFDbEQsSUFBTW1PLFNBQVMsR0FBR25YLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ2tULGVBQWU7RUFFNUMsSUFBSS9OLEdBQUcsS0FBSyxJQUFJLElBQUlBLEdBQUcsS0FBSzhDLFNBQVMsRUFBRTtFQUN2QztFQUNBLElBQU11TCxVQUFVLEdBQUcsT0FBUXBPLEtBQU0sS0FBSyxRQUFRLEdBQUdBLEtBQUssQ0FBQ2xCLFFBQVEsRUFBRSxDQUFDVCxJQUFJLEVBQUUsR0FBRzJCLEtBQUs7RUFDaEY7RUFDQSxJQUFJRCxHQUFHLENBQUN4SixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDekIsSUFBTThLLElBQUksR0FBR3RCLEdBQUcsQ0FBQ2hDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDM0IsSUFBTXNRLE9BQU8sR0FBR2hOLElBQUksQ0FBQ2lOLEdBQUcsRUFBRTtJQUMxQixJQUFJQyxHQUFHLEdBQUdKLFNBQVM7SUFDbkI5TSxJQUFJLENBQUNsSCxPQUFPLENBQUMsVUFBQzRGLEdBQUcsRUFBSztNQUNwQixJQUFJLENBQUN3TyxHQUFHLENBQUN4TyxHQUFHLENBQUMsRUFBRXdPLEdBQUcsQ0FBQ3hPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUM1QndPLEdBQUcsR0FBR0EsR0FBRyxDQUFDeE8sR0FBRyxDQUFDO0lBQ2hCLENBQUMsQ0FBQztJQUNGd08sR0FBRyxDQUFDRixPQUFPLENBQUMsR0FBR0QsVUFBVTtFQUMzQixDQUFDLE1BQU07SUFDTEQsU0FBUyxDQUFDcE8sR0FBRyxDQUFDLEdBQUdxTyxVQUFVO0VBQzdCO0VBQ0E7RUFDQUYsMEJBQTBCLEVBQUU7RUFDNUI7RUFDQSxJQUFJRSxVQUFVLEtBQUt2TCxTQUFTLElBQUl1TCxVQUFVLEtBQUssSUFBSSxFQUFFO0lBQ25ESSxpQkFBaUIsQ0FBQ3pPLEdBQUcsRUFBRXFPLFVBQVUsQ0FBQztJQUNsQ0ssb0JBQW9CLENBQUMxTyxHQUFHLEVBQUVxTyxVQUFVLENBQUM7RUFDdkM7QUFDRixDQUFDO0FBRUQsSUFBTU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQUVsQixJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWUsQ0FBSTVPLEdBQUcsRUFBRTZPLFFBQVEsRUFBSztFQUNoRCxJQUFJLENBQUNGLGNBQWMsQ0FBQzNPLEdBQUcsQ0FBQyxFQUFFO0lBQ3hCMk8sY0FBYyxDQUFDM08sR0FBRyxDQUFDLEdBQUcsRUFBRTtFQUMxQjtFQUNBMk8sY0FBYyxDQUFDM08sR0FBRyxDQUFDLENBQUM4TyxJQUFJLENBQUNELFFBQVEsQ0FBQztBQUNwQyxDQUFDO0FBRUQsSUFBTUUsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRTNCLElBQU1MLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBb0IsQ0FBSTFPLEdBQUcsRUFBRUMsS0FBSyxFQUFLO0VBQzNDLElBQUk4TyxnQkFBZ0IsQ0FBQy9PLEdBQUcsQ0FBQyxLQUFLQyxLQUFLLEVBQUU7SUFDbkN2RixzQkFBTSxDQUFDUixHQUFHLDhFQUF1RStGLEtBQUsscUJBQVdELEdBQUcsRUFBRztJQUN2RztFQUNGO0VBQ0EsSUFBTWdQLFNBQVMsR0FBR0wsY0FBYyxDQUFDM08sR0FBRyxDQUFDO0VBQ3JDLElBQUlnUCxTQUFTLElBQUl0SSxLQUFLLENBQUN1SSxPQUFPLENBQUNELFNBQVMsQ0FBQyxJQUFJQSxTQUFTLENBQUN0WSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ2pFLEtBQUssSUFBSWtKLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR29QLFNBQVMsQ0FBQ3RZLE1BQU0sRUFBRWtKLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDNUMsSUFBTWlQLFFBQVEsR0FBR0csU0FBUyxDQUFDcFAsQ0FBQyxDQUFDO01BQzdCLElBQUksT0FBT2lQLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDbENuVSxzQkFBTSxDQUFDUixHQUFHLDBDQUFtQytGLEtBQUssMEJBQWdCTCxDQUFDLHFCQUFXSSxHQUFHLEVBQUc7UUFDcEY2TyxRQUFRLENBQUM1TyxLQUFLLENBQUM7UUFDZjhPLGdCQUFnQixDQUFDL08sR0FBRyxDQUFDLEdBQUdDLEtBQUs7TUFDL0I7SUFDRjtFQUNGO0FBQ0YsQ0FBQztBQUVNLElBQU1pUCxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCLENBQUlsUCxHQUFHLEVBQTJEO0VBQUEsSUFBekRtUCxRQUFRLHVFQUFHLEtBQUs7RUFBQSxJQUFFQyxZQUFZLHVFQUFHLEVBQUU7RUFBQSxJQUFFMVMsT0FBTyx1RUFBRyxLQUFLO0VBQzlGLElBQU0wUixTQUFTLEdBQUduWCxNQUFNLENBQUM0RCxHQUFHLENBQUNrVCxlQUFlO0VBQzVDO0VBQ0EsSUFBSSxDQUFDL04sR0FBRyxFQUFFLE9BQU8sSUFBSTtFQUNyQixJQUFJcVAsVUFBVSxHQUFHQyxPQUFPLENBQUNsQixTQUFTLEVBQUVwTyxHQUFHLENBQUM7RUFDeEMsSUFBSXFQLFVBQVUsS0FBSyxJQUFJLElBQUlBLFVBQVUsS0FBS3ZNLFNBQVMsRUFBRTtJQUNuRDtJQUNBLE9BQU8yQixPQUFPLENBQUNDLE9BQU8sQ0FBQzJLLFVBQVUsQ0FBQztFQUNwQztFQUFDLDBEQUUyQnBDLFdBQVc7SUFBQTtFQUFBO0lBQXZDLG9EQUF5QztNQUFBLElBQTlCc0MsYUFBYTtNQUN0QixJQUFJdlAsR0FBRyxLQUFLdVAsYUFBYSxDQUFDbkMsSUFBSSxLQUFLbUMsYUFBYSxDQUFDQyxPQUFPLElBQUlELGFBQWEsQ0FBQ0UsUUFBUSxDQUFDLEVBQUU7UUFDbkY7UUFDQSxPQUFPaEwsT0FBTyxDQUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDO01BQzlCO0lBQ0Y7RUFBQztJQUFBO0VBQUE7SUFBQTtFQUFBO0VBRUQsSUFBSXlLLFFBQVEsRUFBRTtJQUNaLE9BQU8sSUFBSTFLLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7TUFDOUIsSUFBTWdMLFFBQVEsR0FBR2xRLFdBQVcsQ0FBQyxZQUFNO1FBQ2pDNlAsVUFBVSxHQUFHQyxPQUFPLENBQUNsQixTQUFTLEVBQUVwTyxHQUFHLENBQUM7UUFDcEMsSUFBSXFQLFVBQVUsS0FBSyxJQUFJLElBQUlBLFVBQVUsS0FBS3ZNLFNBQVMsRUFBRTtVQUNuRDtVQUNBeEQsYUFBYSxDQUFDb1EsUUFBUSxDQUFDO1VBQ3ZCaEwsT0FBTyxDQUFDMkssVUFBVSxDQUFDO1FBQ3JCO1FBQUMsMkRBQzJCcEMsV0FBVztVQUFBO1FBQUE7VUFBdkMsdURBQXlDO1lBQUEsSUFBOUJzQyxhQUFhO1lBQ3RCLElBQUl2UCxHQUFHLEtBQUt1UCxhQUFhLENBQUNuQyxJQUFJLEtBQUttQyxhQUFhLENBQUNDLE9BQU8sSUFBSUQsYUFBYSxDQUFDRSxRQUFRLENBQUMsRUFBRTtjQUNuRjtjQUNBblEsYUFBYSxDQUFDb1EsUUFBUSxDQUFDO2NBQ3ZCaEwsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNmO1VBQ0Y7UUFBQztVQUFBO1FBQUE7VUFBQTtRQUFBO01BQ0gsQ0FBQyxFQUFFMEssWUFBWSxDQUFDO01BQ2hCO01BQ0FyUyxVQUFVLENBQUMsWUFBTTtRQUNmdUMsYUFBYSxDQUFDb1EsUUFBUSxDQUFDO1FBQ3ZCaEwsT0FBTyxDQUFDLElBQUksQ0FBQztNQUNmLENBQUMsRUFBRWhJLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDZixDQUFDLENBQUM7RUFDSjs7RUFDQSxPQUFPK0gsT0FBTyxDQUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzlCLENBQUM7QUFFTSxJQUFNaUwseUJBQXlCLEdBQUcsU0FBNUJBLHlCQUF5QixDQUFJM1AsR0FBRyxFQUFLO0VBQ2hELElBQU1vTyxTQUFTLEdBQUduWCxNQUFNLENBQUM0RCxHQUFHLENBQUNrVCxlQUFlO0VBQzVDLElBQUkvTixHQUFHLEtBQUssSUFBSSxJQUFJQSxHQUFHLEtBQUs4QyxTQUFTLEVBQUU7RUFDdkM7RUFDQSxJQUFJOUMsR0FBRyxDQUFDeEosT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ3pCLElBQU04SyxJQUFJLEdBQUd0QixHQUFHLENBQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzNCLElBQU1zUSxPQUFPLEdBQUdoTixJQUFJLENBQUNpTixHQUFHLEVBQUU7SUFDMUIsSUFBSUMsR0FBRyxHQUFHSixTQUFTO0lBQ25COU0sSUFBSSxDQUFDbEgsT0FBTyxDQUFDLFVBQUM0RixHQUFHLEVBQUs7TUFDcEIsSUFBSSxDQUFDd08sR0FBRyxDQUFDeE8sR0FBRyxDQUFDLEVBQUU7TUFDZndPLEdBQUcsR0FBR0EsR0FBRyxDQUFDeE8sR0FBRyxDQUFDO0lBQ2hCLENBQUMsQ0FBQztJQUNGdEYsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDJCQUEyQiwwQkFBbUJvVSxPQUFPLEVBQUc7SUFDbkUsT0FBT0UsR0FBRyxDQUFDRixPQUFPLENBQUM7RUFDckIsQ0FBQyxNQUFNO0lBQ0wsT0FBT0YsU0FBUyxDQUFDcE8sR0FBRyxDQUFDO0VBQ3ZCO0VBQ0FtTywwQkFBMEIsRUFBRTtFQUM1QjtFQUNBTSxpQkFBaUIsQ0FBQ3pPLEdBQUcsRUFBRSxJQUFJLENBQUM7RUFDNUIwTyxvQkFBb0IsQ0FBQzFPLEdBQUcsRUFBRSxJQUFJLENBQUM7QUFDakMsQ0FBQztBQUVNLElBQU00UCxZQUFZLEdBQUcsU0FBZkEsWUFBWSxDQUFJdk8sRUFBRSxFQUFFWCxjQUFjLEVBQUVNLE9BQU8sRUFBRXRELE1BQU0sRUFBRW1TLHNCQUFzQixFQUFLO0VBQzNGLElBQU01UCxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQ2hCLElBQU1tTyxTQUFTLEdBQUduWCxNQUFNLENBQUM0RCxHQUFHLENBQUNrVCxlQUFlO0VBRTVDLElBQUlyTixjQUFjLEVBQUVULEtBQUssQ0FBQ1MsY0FBYyxHQUFHQSxjQUFjO0VBQ3pELElBQUlNLE9BQU8sRUFBRWYsS0FBSyxDQUFDZSxPQUFPLEdBQUdBLE9BQU87RUFDcEMsSUFBSTZPLHNCQUFzQixFQUFFNVAsS0FBSyxDQUFDNFAsc0JBQXNCLEdBQUdBLHNCQUFzQjtFQUVqRixRQUFRblMsTUFBTTtJQUNaLEtBQUssU0FBUztNQUNaMFEsU0FBUyxDQUFDSixDQUFDLENBQUMzTSxFQUFFLENBQUMsR0FBR3BCLEtBQUs7TUFDdkI7SUFDRixLQUFLLFVBQVU7TUFDYm1PLFNBQVMsQ0FBQ3hKLENBQUMsQ0FBQ3ZELEVBQUUsQ0FBQyxHQUFHcEIsS0FBSztNQUN2QjtJQUNGLEtBQUssUUFBUTtNQUNYbU8sU0FBUyxDQUFDSCxDQUFDLENBQUM1TSxFQUFFLENBQUMsR0FBR3BCLEtBQUs7TUFDdkI7SUFDRixLQUFLLFNBQVM7TUFDWm1PLFNBQVMsQ0FBQ3hPLENBQUMsQ0FBQ3lCLEVBQUUsQ0FBQyxHQUFHcEIsS0FBSztNQUN2QjtJQUNGO01BQ0V2RixzQkFBTSxDQUFDcUIsTUFBTSxDQUFDLHNDQUFzQyxFQUFFMkIsTUFBTSxDQUFDO01BQzdEO0VBQU87RUFFWHlRLDBCQUEwQixFQUFFO0FBQzlCLENBQUM7QUFFRCxJQUFNMkIsbUJBQW1CLEdBQUcsRUFBRTtBQUM5QixJQUFNQyxxQkFBcUIsR0FBRyxFQUFFO0FBQ2hDLElBQUlDLHFCQUFxQixHQUFHRCxxQkFBcUI7QUFDakQsSUFBSUUscUJBQXFCLEdBQUcsQ0FBQztBQUU3QixJQUFNQyw0QkFBNEIsR0FBRyxDQUFDLENBQUM7QUFFdkMsSUFBTXpCLGlCQUFpQjtFQUFBLHNFQUFHLGlCQUFPM0MsZUFBZSxFQUFFQyxnQkFBZ0I7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ2hFO1lBQ01vRSxNQUFNLEdBQUcxQyxxQkFBcUIsQ0FBQzNCLGVBQWUsQ0FBQztZQUFBLE1BQ2pEcUUsTUFBTSxJQUFJekosS0FBSyxDQUFDdUksT0FBTyxDQUFDa0IsTUFBTSxDQUFDLElBQUlBLE1BQU0sQ0FBQ3paLE1BQU0sR0FBRyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQ3REO1lBQUEsdURBQ21CeVosTUFBTTtZQUFBO1lBQUE7VUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQWRDLElBQUk7WUFBQSxNQUNUQSxJQUFJLENBQUNwRSxZQUFZLEtBQUssSUFBSSxJQUFJb0UsSUFBSSxDQUFDcEUsWUFBWSxLQUFLbEosU0FBUztjQUFBO2NBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBLE9BQzNEK0ksaUJBQWlCLENBQUNDLGVBQWUsRUFBRUMsZ0JBQWdCLEVBQUVxRSxJQUFJLENBQUNwRSxZQUFZLENBQUM7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFFL0U7WUFBQSx1REFDbUJtRSxNQUFNO1lBQUE7WUFBQTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBZEMsS0FBSTtZQUFBLE1BQ1RBLEtBQUksQ0FBQzNELFdBQVcsS0FBSyxJQUFJLElBQUkyRCxLQUFJLENBQUMzRCxXQUFXLEtBQUszSixTQUFTO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUEsT0FDbkMwSixnQkFBZ0IsQ0FBQ1YsZUFBZSxFQUFFc0UsS0FBSSxDQUFDM0QsV0FBVyxFQUFFMkQsS0FBSSxDQUFDblosTUFBTSxDQUFDO1VBQUE7WUFBdEZvWixhQUFhO1lBQ25CNVYsb0JBQW9CLENBQUMyVixLQUFJLENBQUMxQyxXQUFXLEVBQUUyQyxhQUFhLENBQUM7VUFBQztZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFHeEQ7WUFBQSx1REFDbUJGLE1BQU07WUFBQTtZQUFBO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFkQyxNQUFJO1lBQUEsTUFDVEEsTUFBSSxDQUFDekMsWUFBWSxLQUFLLElBQUksSUFBSXlDLE1BQUksQ0FBQ3pDLFlBQVksS0FBSzdLLFNBQVM7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBO1lBQzNEd04saUJBQWlCLEdBQUcxQyxvQkFBb0IsQ0FBQ3dDLE1BQUksQ0FBQ3pDLFlBQVksQ0FBQztZQUFBLE1BQzdEMkMsaUJBQWlCLEtBQUssSUFBSSxJQUFJQSxpQkFBaUIsS0FBS3hOLFNBQVM7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBO1lBQ2pFO1lBQ0l5TixXQUFXLEdBQUdMLDRCQUE0QixDQUFDRSxNQUFJLENBQUN6QyxZQUFZLENBQUMsRUFDakU7WUFDQSxJQUFJNEMsV0FBVyxLQUFLLElBQUksSUFBSUEsV0FBVyxLQUFLek4sU0FBUyxJQUFJLE9BQU95TixXQUFXLEtBQUssVUFBVSxFQUFFO2NBQzFGO2NBQ0FBLFdBQVcsR0FBRyxJQUFJQyxRQUFRLENBQUNGLGlCQUFpQixDQUFDLEVBQUU7Y0FDL0NKLDRCQUE0QixDQUFDRSxNQUFJLENBQUN6QyxZQUFZLENBQUMsR0FBRzRDLFdBQVc7WUFDL0Q7WUFDQTdWLHNCQUFNLENBQUNSLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTRSLGVBQWUsRUFBRXNFLE1BQUksQ0FBQ3pDLFlBQVksQ0FBQztZQUFDO1lBQUEsT0FDL0Q0QyxXQUFXLENBQUN6RSxlQUFlLEVBQUVvRCxzQkFBc0IsRUFBRXpVLG9CQUFvQixDQUFDO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBR3JGO0VBQUEsZ0JBakNLZ1UsaUJBQWlCO0lBQUE7RUFBQTtBQUFBLEdBaUN0QjtBQUVELElBQU1nQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUl4USxLQUFLLEVBQUVvTixTQUFTLEVBQUs7RUFDN0MsSUFBSXBOLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBSzZDLFNBQVMsSUFBSSxDQUFDdUssU0FBUyxFQUFFO0lBQ3ZELE9BQU8sSUFBSTtFQUNiO0VBQ0EsUUFBUUEsU0FBUztJQUNmLEtBQUssYUFBYTtNQUNoQixPQUFPcE4sS0FBSyxDQUFDbEIsUUFBUSxFQUFFLENBQUMyUixXQUFXLENBQUMsT0FBTyxDQUFDO0lBQzlDLEtBQUssb0JBQW9CO01BQ3ZCLE9BQU8zTCxrQkFBa0IsQ0FBQzlFLEtBQUssQ0FBQztJQUNsQyxLQUFLLGFBQWE7TUFDaEIsT0FBT0EsS0FBSyxDQUFDM0osT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7SUFDakMsS0FBSyxzQkFBc0I7TUFDekIsT0FBTzJKLEtBQUssQ0FBQ2xCLFFBQVEsRUFBRSxDQUFDaEksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDaUgsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxLQUFLLFNBQVM7TUFDWixJQUFJMEksS0FBSyxDQUFDdUksT0FBTyxDQUFDaFAsS0FBSyxDQUFDLElBQUlBLEtBQUssQ0FBQ3ZKLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDNUMsT0FBT3VKLEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDakI7TUFDQSxPQUFPQSxLQUFLO0lBQ2QsS0FBSyxVQUFVO01BQ2IsT0FBT0EsS0FBSyxDQUFDbEIsUUFBUSxFQUFFLENBQUNULElBQUksRUFBRTtJQUNoQyxLQUFLLGlCQUFpQjtNQUNwQixRQUFRMkIsS0FBSztRQUNYLEtBQUssYUFBYTtVQUNoQixPQUFPLEtBQUs7UUFDZCxLQUFLLGFBQWE7VUFDaEIsT0FBTyxLQUFLO1FBQ2QsS0FBSyxRQUFRO1VBQ1gsT0FBTyxRQUFRO1FBQ2pCO1VBQ0UsT0FBT0EsS0FBSztNQUFDO0lBRW5CO01BQ0UsT0FBT0EsS0FBSztFQUFDO0FBRW5CLENBQUM7QUFFRCxJQUFNMFEsU0FBUyxHQUFHLFNBQVpBLFNBQVMsQ0FBSW5DLEdBQUcsRUFBRWUsYUFBYSxFQUFLO0VBQ3hDLElBQUl0UCxLQUFLO0VBQ1QsSUFBSTJRLFVBQVU7RUFFZCxJQUFJO0lBQ0YsUUFBUXJCLGFBQWEsQ0FBQ2hDLE9BQU87TUFDM0IsS0FBSyxpQkFBaUI7UUFDcEI7VUFDRXROLEtBQUssR0FBR3FQLE9BQU8sQ0FBQ2QsR0FBRyxFQUFFZSxhQUFhLENBQUN6TixRQUFRLENBQUM7VUFFNUMsSUFBSTdCLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBSzZDLFNBQVMsRUFBRTtZQUN6QztVQUNGO1VBRUEsSUFBTStOLFlBQVksR0FBR3RCLGFBQWEsQ0FBQ3RQLEtBQUssQ0FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUM7VUFDbkQsSUFBSTZTLFlBQVksQ0FBQ25hLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFDL0IsSUFBTW9hLFVBQVUsR0FBR0QsWUFBWSxDQUFDLENBQUMsQ0FBQztVQUNsQyxJQUFNRSxXQUFXLEdBQUdGLFlBQVksQ0FBQyxDQUFDLENBQUM7VUFDbkMsSUFBSSxDQUFDQyxVQUFVLElBQUksQ0FBQ0MsV0FBVyxFQUFFO1VBRWpDLElBQU1DLFdBQVcsR0FBRzFCLE9BQU8sQ0FBQ2QsR0FBRyxFQUFFc0MsVUFBVSxDQUFDO1VBRTVDLElBQUksQ0FBQ0UsV0FBVyxJQUFJQSxXQUFXLEtBQUtELFdBQVcsRUFBRTtVQUVqRCxJQUFJOVEsS0FBSyxLQUFLeUcsS0FBSyxDQUFDdUksT0FBTyxDQUFDaFAsS0FBSyxDQUFDLEdBQUdBLEtBQUssQ0FBQ3ZKLE1BQU0sR0FBRyxDQUFDLEdBQUd1SixLQUFLLENBQUNsQixRQUFRLEVBQUUsQ0FBQ1QsSUFBSSxFQUFFLENBQUM1SCxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDM0ZrYSxVQUFVLEdBQUczUSxLQUFLO1VBQ3BCO1FBQ0Y7UUFDQTtNQUNGLEtBQUssaUJBQWlCO1FBQ3BCQSxLQUFLLEdBQUd1TyxHQUFHLENBQUN0TSxhQUFhLENBQUNxTixhQUFhLENBQUN6TixRQUFRLENBQUM7UUFFakQsSUFBSTdCLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBSzZDLFNBQVMsRUFBRTtVQUN6Q3lNLGFBQWEsQ0FBQ0MsT0FBTyxHQUFHLElBQUk7VUFDNUI7VUFDQSxJQUFNeUIsV0FBVyxHQUFHLEVBQUU7VUFDdEIxQixhQUFhLENBQUMvQixRQUFRLENBQUNwVCxPQUFPLENBQUMsVUFBQzhXLEtBQUssRUFBSztZQUN4QyxJQUFNQyxhQUFhLEdBQUdsRSxrQkFBa0IsQ0FBQyxVQUFDcE4sT0FBTztjQUFBLE9BQUtBLE9BQU8sQ0FBQ3VOLElBQUksS0FBSzhELEtBQUs7WUFBQSxFQUFDO1lBQzdFO1lBQ0FELFdBQVcsQ0FBQ25DLElBQUksT0FBaEJtQyxXQUFXLHFCQUFTRSxhQUFhLEVBQUM7VUFDcEMsQ0FBQyxDQUFDO1VBQ0Y7VUFDQSxJQUFNQyxRQUFRLEdBQUcsSUFBSUMsZ0JBQWdCO1lBQUEsdUVBQUMsa0JBQWU3SyxZQUFZO2NBQUE7Y0FBQTtnQkFBQTtrQkFBQTtvQkFBQTtzQkFBQSxLQUUzREQsYUFBYSxDQUFDQyxZQUFZLENBQUM7d0JBQUE7d0JBQUE7c0JBQUE7c0JBQUE7b0JBQUE7c0JBQy9CeUssV0FBVyxDQUFDN1csT0FBTyxDQUFDLFVBQUN5RixPQUFPLEVBQUs7d0JBQy9CQSxPQUFPLENBQUMyUCxPQUFPLEdBQUcsS0FBSzt3QkFDdkJHLHlCQUF5QixDQUFDOVAsT0FBTyxDQUFDdU4sSUFBSSxDQUFDO3NCQUN6QyxDQUFDLENBQUM7c0JBQ0lrRSxjQUFjLEdBQUdyQixxQkFBcUIsSUFBSUgsbUJBQW1CO3NCQUNuRUUscUJBQXFCLEdBQUdELHFCQUFxQjtzQkFDN0NFLHFCQUFxQixHQUFHLENBQUM7c0JBQ3pCLElBQUlxQixjQUFjLEVBQUU7d0JBQ2xCNVcsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLHFEQUFxRCxFQUFFcVYsYUFBYSxDQUFDbkMsSUFBSSxDQUFDO3dCQUNyRm1FLGtCQUFrQixFQUFFO3NCQUN0QjtvQkFBQztvQkFBQTtzQkFBQTtrQkFBQTtnQkFBQTtjQUFBO1lBQUEsQ0FDRjtZQUFBO2NBQUE7WUFBQTtVQUFBLElBQUM7VUFDRkgsUUFBUSxDQUFDSSxPQUFPLENBQUN2UixLQUFLLEVBQUU7WUFBQ3dSLE9BQU8sRUFBRSxJQUFJO1lBQUVDLFNBQVMsRUFBRTtVQUFJLENBQUMsQ0FBQztRQUMzRDtRQUNBO01BQ0YsS0FBSyxtQkFBbUI7UUFDdEJ6UixLQUFLLEdBQUd1TyxHQUFHLENBQUN0TSxhQUFhLENBQUNxTixhQUFhLENBQUN6TixRQUFRLENBQUM7UUFDakQsSUFBSTdCLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBSzZDLFNBQVMsSUFBSTdDLEtBQUssQ0FBQzBSLFNBQVMsSUFBSTFSLEtBQUssQ0FBQzBSLFNBQVMsQ0FBQ3JULElBQUksRUFBRSxDQUFDNUgsTUFBTSxHQUFHLENBQUMsRUFBRTtVQUNqR2thLFVBQVUsR0FBRzNRLEtBQUssQ0FBQzBSLFNBQVM7UUFDOUI7UUFDQTtNQUNGLEtBQUsseUJBQXlCO1FBQzVCO1VBQ0UsSUFBTUMsZUFBZSxHQUFHLEVBQUU7VUFDMUIzUixLQUFLLEdBQUd1TyxHQUFHLENBQUNxRCxnQkFBZ0IsQ0FBQ3RDLGFBQWEsQ0FBQ3pOLFFBQVEsQ0FBQztVQUNwRCxJQUFJN0IsS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLNkMsU0FBUyxJQUFJN0MsS0FBSyxDQUFDdkosTUFBTSxLQUFLLENBQUMsRUFBRTtVQUFNLDJEQUM5Q3VKLEtBQUs7WUFBQTtVQUFBO1lBQTlCLHVEQUFnQztjQUFBLElBQXJCNlIsVUFBVTtjQUNuQixJQUFNQyxXQUFXLEdBQUdELFVBQVUsQ0FBQ0UsWUFBWSxDQUFDekMsYUFBYSxDQUFDdFAsS0FBSyxDQUFDO2NBQ2hFLElBQUk4UixXQUFXLEVBQUU7Z0JBQ2ZILGVBQWUsQ0FBQzlDLElBQUksQ0FBQ2lELFdBQVcsQ0FBQztjQUNuQztZQUNGO1VBQUM7WUFBQTtVQUFBO1lBQUE7VUFBQTtVQUVELElBQUlILGVBQWUsQ0FBQ2xiLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUJrYSxVQUFVLEdBQUdnQixlQUFlO1VBQzlCO1FBQ0Y7UUFDQTtNQUNGLEtBQUssc0JBQXNCO1FBQ3pCM1IsS0FBSyxHQUFHdU8sR0FBRyxDQUFDdE0sYUFBYSxDQUFDcU4sYUFBYSxDQUFDek4sUUFBUSxDQUFDO1FBQ2pELElBQUk3QixLQUFLLEtBQUssSUFBSSxJQUFJQSxLQUFLLEtBQUs2QyxTQUFTLEVBQUU7VUFDekMsSUFBTW1QLFFBQVEsR0FBR2hTLEtBQUssQ0FBQzBSLFNBQVMsQ0FBQ3JULElBQUksRUFBRSxDQUFDNUgsTUFBTSxHQUFHLENBQUM7VUFDbERrYSxVQUFVLEdBQUdxQixRQUFRLENBQUNsVCxRQUFRLEVBQUU7UUFDbEM7UUFDQTtNQUNGLEtBQUssbUJBQW1CO1FBQ3RCa0IsS0FBSyxHQUFHdU8sR0FBRyxDQUFDcUQsZ0JBQWdCLENBQUN0QyxhQUFhLENBQUN6TixRQUFRLENBQUM7UUFDcEQsSUFBSTdCLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBSzZDLFNBQVMsRUFBRTtVQUN6QzhOLFVBQVUsR0FBRzNRLEtBQUssQ0FBQ3ZKLE1BQU07UUFDM0I7UUFDQTtNQUNGLEtBQUssNkJBQTZCO1FBQ2hDdUosS0FBSyxHQUFHdU8sR0FBRyxDQUFDdE0sYUFBYSxDQUFDcU4sYUFBYSxDQUFDek4sUUFBUSxDQUFDO1FBQ2pELElBQUk3QixLQUFLLElBQUlBLEtBQUssQ0FBQzBSLFNBQVMsSUFBSTFSLEtBQUssQ0FBQzBSLFNBQVMsQ0FBQ3JULElBQUksRUFBRSxDQUFDNUgsTUFBTSxHQUFHLENBQUMsRUFBRTtVQUNqRWthLFVBQVUsR0FBR3JCLGFBQWEsQ0FBQ3RQLEtBQUs7UUFDbEM7UUFDQTtNQUNGLEtBQUsseUJBQXlCO1FBQzVCO1VBQ0VBLEtBQUssR0FBR3VPLEdBQUcsQ0FBQ3FELGdCQUFnQixDQUFDdEMsYUFBYSxDQUFDek4sUUFBUSxDQUFDO1VBQ3BELElBQUk3QixLQUFLLEtBQUssSUFBSSxJQUFJQSxLQUFLLEtBQUs2QyxTQUFTLElBQUk3QyxLQUFLLENBQUN2SixNQUFNLEtBQUssQ0FBQyxFQUFFO1VBQ2pFLElBQUl3YixRQUFRLEdBQUcsQ0FBQztVQUFDLDJEQUNHalMsS0FBSztZQUFBO1VBQUE7WUFBekIsdURBQTJCO2NBQUEsSUFBaEJpUixLQUFLO2NBQ2QsSUFBTWlCLFNBQVMsR0FBR2pCLEtBQUssQ0FBQ1MsU0FBUyxDQUFDclQsSUFBSSxFQUFFLENBQUNoSSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztjQUMzRCxJQUFJNmIsU0FBUyxDQUFDemIsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEJ3YixRQUFRLElBQUlqUCxRQUFRLENBQUNrUCxTQUFTLENBQUM7Y0FDakM7WUFDRjtVQUFDO1lBQUE7VUFBQTtZQUFBO1VBQUE7VUFDRCxJQUFJRCxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCdEIsVUFBVSxHQUFHc0IsUUFBUTtVQUN2QjtRQUNGO1FBQ0E7TUFDRixLQUFLLHdCQUF3QjtRQUMzQjtVQUNFalMsS0FBSyxHQUFHdU8sR0FBRyxDQUFDcUQsZ0JBQWdCLENBQUN0QyxhQUFhLENBQUN6TixRQUFRLENBQUM7VUFDcEQsSUFBSTdCLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBSzZDLFNBQVMsSUFBSTdDLEtBQUssQ0FBQ3ZKLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFDakUsSUFBTTBiLGNBQWMsR0FBRyxFQUFFO1VBQUMsMkRBQ05uUyxLQUFLO1lBQUE7VUFBQTtZQUF6Qix1REFBMkI7Y0FBQSxJQUFoQmlSLE1BQUs7Y0FDZCxJQUFNaUIsVUFBUyxHQUFHakIsTUFBSyxDQUFDUyxTQUFTLENBQUNyVCxJQUFJLEVBQUU7Y0FDeEMsSUFBSTZULFVBQVMsQ0FBQ3piLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCMGIsY0FBYyxDQUFDdEQsSUFBSSxDQUFDcUQsVUFBUyxDQUFDO2NBQ2hDO1lBQ0Y7VUFBQztZQUFBO1VBQUE7WUFBQTtVQUFBO1VBQ0QsSUFBSUMsY0FBYyxDQUFDMWIsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QmthLFVBQVUsR0FBR3dCLGNBQWM7VUFDN0I7UUFDRjtRQUNBO01BQ0Y7UUFDRW5TLEtBQUssR0FBR3FQLE9BQU8sQ0FBQ2QsR0FBRyxFQUFFZSxhQUFhLENBQUN6TixRQUFRLENBQUM7UUFDNUMsSUFBSTdCLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBSzZDLFNBQVMsS0FBSzRELEtBQUssQ0FBQ3VJLE9BQU8sQ0FBQ2hQLEtBQUssQ0FBQyxHQUFHQSxLQUFLLENBQUN2SixNQUFNLEdBQUcsQ0FBQyxHQUFHdUosS0FBSyxDQUFDbEIsUUFBUSxFQUFFLENBQUNULElBQUksRUFBRSxDQUFDNUgsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO1VBQzNIa2EsVUFBVSxHQUFHM1EsS0FBSztRQUNwQjtRQUNBO0lBQU0sQ0FDVCxDQUFDOztJQUVGLElBQUkyUSxVQUFVLEtBQUs5TixTQUFTLElBQUk4TixVQUFVLEtBQUssSUFBSSxFQUFFO01BQ25ELElBQUlyQixhQUFhLENBQUNsQyxTQUFTLEVBQUU7UUFDM0J1RCxVQUFVLEdBQUdILGdCQUFnQixDQUFDRyxVQUFVLEVBQUVyQixhQUFhLENBQUNsQyxTQUFTLENBQUM7TUFDcEU7TUFDQTVTLG9CQUFvQixDQUFDOFUsYUFBYSxDQUFDbkMsSUFBSSxFQUFFd0QsVUFBVSxDQUFDO01BQ3BEckIsYUFBYSxDQUFDQyxPQUFPLEdBQUcsSUFBSTs7TUFFNUI7TUFDQSxJQUFJRCxhQUFhLENBQUNqQyxTQUFTLElBQUk1RyxLQUFLLENBQUN1SSxPQUFPLENBQUNNLGFBQWEsQ0FBQ2pDLFNBQVMsQ0FBQyxJQUFJaUMsYUFBYSxDQUFDakMsU0FBUyxDQUFDNVcsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUFBLDJEQUM1RXVXLFdBQVc7VUFBQTtRQUFBO1VBQTFDLHVEQUE0QztZQUFBLElBQWpDb0YsZ0JBQWdCO1lBQ3pCLElBQUk5QyxhQUFhLENBQUNqQyxTQUFTLENBQUNsVyxRQUFRLENBQUNpYixnQkFBZ0IsQ0FBQ2pGLElBQUksQ0FBQyxFQUFFO2NBQzNEaUYsZ0JBQWdCLENBQUM3QyxPQUFPLEdBQUcsSUFBSTtZQUNqQztVQUNGO1FBQUM7VUFBQTtRQUFBO1VBQUE7UUFBQTtNQUNIO0lBQ0Y7SUFDQSxJQUFJRCxhQUFhLENBQUNDLE9BQU8sRUFBRTtNQUN6QixPQUFPLElBQUk7SUFDYjtFQUNGLENBQUMsQ0FBQyxPQUFPNUssQ0FBQyxFQUFFO0lBQ1ZsSyxzQkFBTSxDQUFDRixLQUFLLENBQUMsbUJBQW1CLEdBQUdvSyxDQUFDLENBQUM7RUFDdkM7RUFDQSxPQUFPLEtBQUs7QUFDZCxDQUFDO0FBRUQsSUFBTTBOLGdCQUFnQjtFQUFBLHVFQUFHO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUNqQkMsU0FBUyxHQUFHelgsUUFBUSxDQUFDMFgsVUFBVSxFQUNyQztZQUNBOVgsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLGlEQUFpRCxHQUFHcVksU0FBUyxDQUFDO1lBRW5FRSxNQUFNLEdBQUd4YixNQUFNLENBQUM0RCxHQUFHO1lBQ25CNlgsU0FBUyxHQUFHRCxNQUFNLENBQUNDLFNBQVM7WUFDNUJDLE1BQU0sR0FBR0YsTUFBTSxDQUFDM1gsUUFBUTtZQUd4QjhYLFVBQVUsR0FBRyxJQUFJQyxHQUFHLEVBQUU7WUFDdEJDLGNBQWMsR0FBRyxJQUFJRCxHQUFHLEVBQUU7WUFDMUJFLGFBQWEsR0FBRyxJQUFJRixHQUFHLEVBQUUsRUFFL0I7WUFBQTtZQUFBLE9BQzRCM0Qsc0JBQXNCLENBQUMsVUFBVSxDQUFDO1VBQUE7WUFBMUQ4RCxlQUFlO1lBRW5CLElBQUlBLGVBQWUsRUFBRTtjQUNuQkYsY0FBYyxDQUFDdFgsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNoQzs7WUFFQTtZQUFBLHdEQUM0QnlSLFdBQVc7WUFBQTtjQUF2QywwREFBeUM7Z0JBQTlCc0MsYUFBYTtnQkFDdEIsSUFBSUEsYUFBYSxDQUFDQyxPQUFPLEVBQUU7a0JBQ3pCc0QsY0FBYyxDQUFDdFgsR0FBRyxDQUFDK1QsYUFBYSxDQUFDbkMsSUFBSSxDQUFDO2dCQUN4QztjQUNGO1lBQUM7Y0FBQTtZQUFBO2NBQUE7WUFBQTtZQUFBLHdEQUUyQkgsV0FBVztZQUFBO1lBQUE7VUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQTVCc0MsY0FBYTtZQUFBLE1BQ2xCQSxjQUFhLENBQUNDLE9BQU8sSUFBSUQsY0FBYSxDQUFDRSxRQUFRO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUFBLE1BSS9DbUQsVUFBVSxDQUFDSyxHQUFHLENBQUMxRCxjQUFhLENBQUNuQyxJQUFJLENBQUMsSUFBSTBGLGNBQWMsQ0FBQ0csR0FBRyxDQUFDMUQsY0FBYSxDQUFDbkMsSUFBSSxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQzlFO1lBQ0FtQyxjQUFhLENBQUNDLE9BQU8sR0FBRyxJQUFJO1lBQUM7VUFBQTtZQUFBLE1BSTNCRCxjQUFhLENBQUNyQyxjQUFjLEtBQUssR0FBRztjQUFBO2NBQUE7WUFBQTtZQUFBLElBQ2pDOEYsZUFBZTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDTTlELHNCQUFzQixDQUFDLFVBQVUsQ0FBQztVQUFBO1lBQTFEOEQsZUFBZTtZQUFBLElBQ1ZBLGVBQWU7Y0FBQTtjQUFBO1lBQUE7WUFDbEJELGFBQWEsQ0FBQ3ZYLEdBQUcsQ0FBQytULGNBQWEsQ0FBQ25DLElBQUksQ0FBQztZQUFDO1VBQUE7WUFBQSxNQUt0Q21DLGNBQWEsQ0FBQ3JDLGNBQWMsQ0FBQzFXLE9BQU8sQ0FBQ3djLGVBQWUsQ0FBQyxHQUFHLENBQUM7Y0FBQTtjQUFBO1lBQUE7WUFDM0Q7WUFDQXpELGNBQWEsQ0FBQ0UsUUFBUSxHQUFHLElBQUk7WUFBQztVQUFBO1lBS2xDLElBQUlGLGNBQWEsQ0FBQ3BDLE1BQU0sS0FBSyxVQUFVLEVBQUU7Y0FBRTtjQUN6QytGLFlBQVksQ0FBQ1QsTUFBTSxFQUFFbEQsY0FBYSxFQUFFcUQsVUFBVSxFQUFFRyxhQUFhLENBQUM7WUFDaEUsQ0FBQyxNQUFNLElBQUl4RCxjQUFhLENBQUNwQyxNQUFNLEtBQUssYUFBYSxFQUFFO2NBQUU7Y0FBQSx3REFDdkJ1RixTQUFTO2NBQUE7Z0JBQXJDLDBEQUF1QztrQkFBNUJTLGFBQWE7a0JBQ3RCRCxZQUFZLENBQUNDLGFBQWEsRUFBRTVELGNBQWEsRUFBRXFELFVBQVUsRUFBRUcsYUFBYSxDQUFDO2dCQUN2RTtjQUFDO2dCQUFBO2NBQUE7Z0JBQUE7Y0FBQTtZQUNILENBQUMsTUFBTSxJQUFJeEQsY0FBYSxDQUFDcEMsTUFBTSxLQUFLLFNBQVMsRUFBRTtjQUFFO2NBQy9DLElBQUksQ0FBQ2lHLGNBQWMsRUFBRTtnQkFDbkJBLGNBQWMsR0FBR0MsWUFBWSxFQUFFO2NBQ2pDO2NBQUMsd0RBQ3NCRCxjQUFjO2NBQUE7Z0JBQXJDLDBEQUF1QztrQkFBNUJFLFFBQVE7a0JBQ2pCSixZQUFZLENBQUNJLFFBQVEsRUFBRS9ELGNBQWEsRUFBRXFELFVBQVUsRUFBRUcsYUFBYSxDQUFDO2dCQUNsRTtjQUFDO2dCQUFBO2NBQUE7Z0JBQUE7Y0FBQTtZQUNILENBQUMsTUFBTSxJQUFJeEQsY0FBYSxDQUFDcEMsTUFBTSxLQUFLLFVBQVUsRUFBRTtjQUFFO2NBQ2hEK0YsWUFBWSxDQUFDUCxNQUFNLEVBQUVwRCxjQUFhLEVBQUVxRCxVQUFVLEVBQUVHLGFBQWEsQ0FBQztZQUNoRSxDQUFDLENBQUM7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFHSixJQUFJQSxhQUFhLENBQUNRLElBQUksS0FBSyxDQUFDLEVBQUU7Y0FDNUJ0RCxxQkFBcUIsR0FBR0gsbUJBQW1CO2NBQzNDcFYsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDREQUE0RCxDQUFDO1lBQzFFLENBQUMsTUFBTSxJQUFJMFksVUFBVSxDQUFDVyxJQUFJLEtBQUssQ0FBQyxFQUFFO2NBQ2hDO2NBQ0EsSUFBSWhCLFNBQVMsS0FBSyxVQUFVLElBQUlBLFNBQVMsS0FBSyxhQUFhLEVBQUU7Z0JBQzNEdkMscUJBQXFCLElBQUksQ0FBQztnQkFDMUJDLHFCQUFxQixJQUFJLENBQUM7Y0FDNUI7Y0FFQXZWLHNCQUFNLENBQUNSLEdBQUcsQ0FBQywyRUFBMkUsR0FDcEY4VixxQkFBcUIsR0FBRyxPQUFPLEdBQy9CQyxxQkFBcUIsR0FBRyxrQkFBa0IsR0FDMUN2SixLQUFLLENBQUNDLElBQUksQ0FBQ29NLGFBQWEsQ0FBQyxDQUFDL0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FDNUM7WUFDSCxDQUFDLE1BQU07Y0FDTHRQLHNCQUFNLENBQUNSLEdBQUcsQ0FBQyx5Q0FBeUMsR0FDbER3TSxLQUFLLENBQUNDLElBQUksQ0FBQ29NLGFBQWEsQ0FBQyxDQUFDL0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLGNBQWMsR0FDdEQ0SSxVQUFVLENBQUNXLElBQUksQ0FDaEI7WUFDSDtVQUFDO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ0Y7RUFBQSxnQkE5RktqQixnQkFBZ0I7SUFBQTtFQUFBO0FBQUEsR0E4RnJCO0FBRUQsSUFBTVksWUFBWSxHQUFHLFNBQWZBLFlBQVksQ0FBSTFFLEdBQUcsRUFBRWUsYUFBYSxFQUFFcUQsVUFBVSxFQUFFRyxhQUFhLEVBQUs7RUFDdEUsSUFBSXBDLFNBQVMsQ0FBQ25DLEdBQUcsRUFBRWUsYUFBYSxDQUFDLEVBQUU7SUFDakNxRCxVQUFVLENBQUNwWCxHQUFHLENBQUMrVCxhQUFhLENBQUNuQyxJQUFJLENBQUM7RUFDcEMsQ0FBQyxNQUFNO0lBQ0wyRixhQUFhLENBQUN2WCxHQUFHLENBQUMrVCxhQUFhLENBQUNuQyxJQUFJLENBQUM7RUFDdkM7QUFDRixDQUFDOztBQUVEO0FBQ08sSUFBTW1FLGtCQUFrQjtFQUFBLHVFQUFHO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQzFCZSxnQkFBZ0IsRUFBRTtVQUFBO1lBQ3hCLElBQUlyQyxxQkFBcUIsR0FBR0gsbUJBQW1CLEVBQUU7Y0FDL0NwVixzQkFBTSxDQUFDUixHQUFHLENBQUMsZ0RBQWdELEdBQUc4VixxQkFBcUIsR0FBRyxJQUFJLENBQUM7Y0FDM0ZqVCxVQUFVLDBFQUFDO2dCQUFBO2tCQUFBO29CQUFBO3NCQUFBO3dCQUFBO3dCQUFBLE9BQ0h3VSxrQkFBa0IsRUFBRTtzQkFBQTtzQkFBQTt3QkFBQTtvQkFBQTtrQkFBQTtnQkFBQTtjQUFBLENBQzNCLElBQUV2QixxQkFBcUIsQ0FBQztZQUMzQjtVQUFDO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ0Y7RUFBQSxnQkFSWXVCLGtCQUFrQjtJQUFBO0VBQUE7QUFBQSxHQVE5Qjs7QUFFRDtBQUNBO0FBQ0EsSUFBTWpDLE9BQU8sR0FBRyxTQUFWQSxPQUFPLENBQUlkLEdBQUcsRUFBRWdGLElBQUksRUFBSztFQUM3QixJQUFJLENBQUNoRixHQUFHLEVBQUUsT0FBTyxJQUFJO0VBQ3JCLElBQUksQ0FBQ2dGLElBQUksRUFBRSxPQUFPLElBQUk7RUFFdEIsSUFBSTtJQUNGLElBQU1DLFNBQVMsR0FBR0QsSUFBSSxDQUFDeFYsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNqQyxJQUFJd0YsT0FBTyxHQUFHZ0wsR0FBRztJQUNqQixLQUFLLElBQUk1TyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc2VCxTQUFTLENBQUMvYyxNQUFNLEVBQUVrSixDQUFDLEVBQUUsRUFBRTtNQUN6QyxJQUFJNEQsT0FBTyxLQUFLLElBQUksRUFBRSxPQUFPLElBQUk7TUFDakMsSUFBSWlRLFNBQVMsQ0FBQzdULENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUN4QixJQUFNOFQsT0FBTyxHQUFHRCxTQUFTLENBQUNFLEtBQUssQ0FBQy9ULENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQ29LLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDaEQsSUFBTTRKLFFBQVEsR0FBRyxFQUFFO1FBQ25CLEtBQUssSUFBTUMsTUFBTSxJQUFJclEsT0FBTyxFQUFFO1VBQzVCLElBQUlBLE9BQU8sQ0FBQ3FRLE1BQU0sQ0FBQyxLQUFLL1EsU0FBUyxJQUFJVSxPQUFPLENBQUNxUSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDN0QsSUFBTUMsUUFBUSxHQUFHeEUsT0FBTyxDQUFDOUwsT0FBTyxDQUFDcVEsTUFBTSxDQUFDLEVBQUVILE9BQU8sQ0FBQztZQUNsRCxJQUFJSSxRQUFRLEtBQUssSUFBSSxJQUFJQSxRQUFRLEtBQUtoUixTQUFTLEVBQUU7Y0FDL0M4USxRQUFRLENBQUM5RSxJQUFJLENBQUNnRixRQUFRLENBQUM7WUFDekI7VUFDRjtRQUNGO1FBQ0EsT0FBT0YsUUFBUTtNQUNqQjtNQUNBcFEsT0FBTyxHQUFHQSxPQUFPLENBQUNpUSxTQUFTLENBQUM3VCxDQUFDLENBQUMsQ0FBQztJQUNqQztJQUNBLE9BQU80RCxPQUFPO0VBQ2hCLENBQUMsQ0FBQyxPQUFPb0IsQ0FBQyxFQUFFO0lBQ1YsT0FBTyxJQUFJO0VBQ2I7QUFDRixDQUFDOztBQUVEO0FBQ0EsSUFBTXlPLFlBQVksR0FBRyxTQUFmQSxZQUFZLEdBQVM7RUFDekIsSUFBTVUsYUFBYSxHQUFHOWMsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUMrVyxnQkFBZ0IsQ0FBQyxnQ0FBZ0MsQ0FBQztFQUM1RixJQUFNbUMsU0FBUyxHQUFHLEVBQUU7RUFBQyw0REFFRkQsYUFBYTtJQUFBO0VBQUE7SUFBaEMsMERBQWtDO01BQUEsSUFBdkJFLElBQUk7TUFDYixJQUFJO1FBQ0YsSUFBTUMsS0FBSyxHQUFHRCxJQUFJLENBQUMzWSxXQUFXO1FBQzlCLElBQU02WSxXQUFXLEdBQUd0VCxJQUFJLENBQUNDLEtBQUssQ0FBQ29ULEtBQUssQ0FBQztRQUNyQ0YsU0FBUyxDQUFDbEYsSUFBSSxDQUFDcUYsV0FBVyxDQUFDO01BQzdCLENBQUMsQ0FBQyxPQUFPdlEsR0FBRyxFQUFFO1FBQ1o7TUFBQTtJQUVKO0VBQUM7SUFBQTtFQUFBO0lBQUE7RUFBQTtFQUNELE9BQU9vUSxTQUFTO0FBQ2xCLENBQUM7Ozs7Ozs7QUNqa0J3QztBQUNWO0FBQzJCO0FBRTFELElBQU10WixpQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsWUFBWSxDQUFDO0FBQ3ZDLElBQU0yYSxPQUFPLEdBQUc7RUFDZDlaLElBQUksRUFBRTtBQUNSLENBQUM7QUFFTSxJQUFNK1osTUFBTTtFQUNqQixrQkFBYztJQUFBO0lBQ1ozWixpQkFBTSxDQUFDUixHQUFHLENBQUMsNEJBQTRCLENBQUM7SUFFeEMsSUFBSSxDQUFDb2EsaUJBQWlCLEdBQUcsS0FBSztJQUM5QixJQUFJLENBQUNDLGNBQWMsR0FBRyxLQUFLO0lBQzNCLElBQUksQ0FBQ0MsY0FBYyxHQUFHLEtBQUs7SUFFM0IsSUFBSSxDQUFDQyxhQUFhLEdBQUcsSUFBSTtJQUV6QixJQUFJLENBQUNDLDRCQUE0QixFQUFFO0VBQ3JDOztFQUVBO0VBQUE7SUFBQTtJQUFBO01BQUEsbUZBQ0E7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUVRLElBQUksQ0FBQ0MsbUJBQW1CLEVBQUU7Y0FBQTtnQkFBQTtnQkFBQSxPQUUxQixJQUFJLENBQUNDLDBCQUEwQixFQUFFO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ3hDO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHNGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQSxLQUNNLElBQUksQ0FBQ0wsY0FBYztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BTUcsSUFBSSxDQUFDTSxrQkFBa0IsRUFBRTtjQUFBO2dCQUE3Q0MsV0FBVztnQkFBQSxLQUViQSxXQUFXO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BRVAsSUFBSSxDQUFDQyxxQkFBcUIsRUFBRTtjQUFBO2dCQUNsQ3JhLGlCQUFNLENBQUNSLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRTRhLFdBQVcsQ0FBQztnQkFDakQsSUFBSSxDQUFDUCxjQUFjLEdBQUcsSUFBSTtnQkFDMUIsSUFBSSxDQUFDUyxTQUFTLENBQUNGLFdBQVcsQ0FBQztjQUFDO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUUvQjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSw2RkFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsTUFDTSxDQUFDLElBQUksQ0FBQ1AsY0FBYyxJQUFJLElBQUksQ0FBQ0MsY0FBYztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BTXRCLElBQUksQ0FBQ08scUJBQXFCLEVBQUU7Y0FBQTtnQkFBL0NFLFVBQVU7Z0JBQ2hCdmEsaUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLDZCQUE2QixFQUFFK2EsVUFBVSxDQUFDO2dCQUFDLElBQ2pEQSxVQUFVO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FFTyxJQUFJLENBQUNDLHlCQUF5QixFQUFFO2NBQUE7Z0JBQWhEQyxPQUFPO2dCQUNiLElBQUlBLE9BQU8sRUFBRTtrQkFDWHphLGlCQUFNLENBQUNSLEdBQUcsQ0FBQywwQkFBMEIsRUFBRWliLE9BQU8sQ0FBQztrQkFDL0MsSUFBSSxDQUFDWCxjQUFjLEdBQUcsSUFBSTtrQkFDMUIsSUFBSSxDQUFDUSxTQUFTLENBQUNHLE9BQU8sQ0FBQztnQkFDekI7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDRjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSx5RkFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsTUFDTSxJQUFJLENBQUNaLGNBQWMsSUFBSSxJQUFJLENBQUNELGlCQUFpQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BTXZCLElBQUksQ0FBQ2MscUJBQXFCLEVBQUU7Y0FBQTtnQkFBaEROLFdBQVc7Z0JBRWpCLElBQUlBLFdBQVcsRUFBRTtrQkFDZjtrQkFDQXBhLGlCQUFNLENBQUNSLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRTRhLFdBQVcsQ0FBQztrQkFDakQsSUFBSSxDQUFDUixpQkFBaUIsR0FBRyxJQUFJO2tCQUM3QixJQUFJLENBQUNVLFNBQVMsQ0FBQ0YsV0FBVyxDQUFDO2dCQUM3QjtjQUFDO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNGO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHdGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNvQjVGLHNCQUFzQixDQUFDLE9BQU8sQ0FBQztjQUFBO2dCQUEzQ21HLEdBQUc7Z0JBQUEsTUFDTCxJQUFJLENBQUNaLGFBQWEsS0FBS1ksR0FBRztrQkFBQTtrQkFBQTtnQkFBQTtnQkFDNUIsSUFBSSxDQUFDWixhQUFhLEdBQUdZLEdBQUc7Z0JBQUMsa0NBQ2xCLElBQUk7Y0FBQTtnQkFBQSxrQ0FFTixLQUFLO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2I7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsd0ZBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BQ29ENVEsT0FBTyxDQUFDNlEsR0FBRyxDQUFDLENBQzVEcEcsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQzNCQSxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsRUFDbkNBLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxFQUNwQ0Esc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUM7Y0FBQTtnQkFBQTtnQkFBQTtnQkFMS2pTLEdBQUc7Z0JBQUU0QixJQUFJO2dCQUFFMFcsVUFBVTtnQkFBRUMsVUFBVTtnQkFPbENDLElBQUksR0FBRztrQkFDWEYsVUFBVSxFQUFFQSxVQUFVO2tCQUN0QkcsRUFBRSxFQUFFLENBQUM7a0JBQ0xGLFVBQVUsRUFBRUEsVUFBVTtrQkFDdEJHLENBQUMsRUFBRTFZLEdBQUc7a0JBQ04yWSxTQUFTLEVBQUUvVztnQkFDYixDQUFDO2dCQUVEbkUsaUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLG9CQUFvQixFQUFFdWIsSUFBSSxDQUFDO2dCQUFDLGtDQUVoQyxJQUFJSSxJQUFJLENBQUMsQ0FBQ2hWLElBQUksQ0FBQ0UsU0FBUyxDQUFDMFUsSUFBSSxDQUFDLENBQUMsRUFBRXJCLE9BQU8sQ0FBQztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNqRDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxxRkFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQ1FxQixJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUFBLElBQ1Z4ZSxNQUFNLENBQUM4VyxlQUFlO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGtDQUNsQixJQUFJO2NBQUE7Z0JBRWIsK0JBQTJCak8sTUFBTSxDQUFDQyxPQUFPLENBQUM5SSxNQUFNLENBQUM4VyxlQUFlLENBQUMscUNBQUU7a0JBQUEsNkRBQXZEL04sR0FBRywwQkFBRUMsS0FBSztrQkFDcEIsSUFBSSxDQUFDRCxHQUFHLENBQUM4VixVQUFVLENBQUMsR0FBRyxDQUFDLElBQUk3VixLQUFLLEtBQUssSUFBSSxFQUFFd1YsSUFBSSxDQUFDelYsR0FBRyxDQUFDLEdBQUdDLEtBQUs7Z0JBQy9EO2dCQUNBd1YsSUFBSSxDQUFDQyxFQUFFLEdBQUcsQ0FBQztnQkFBQyxrQ0FFTCxJQUFJRyxJQUFJLENBQUMsQ0FBQ2hWLElBQUksQ0FBQ0UsU0FBUyxDQUFDMFUsSUFBSSxDQUFDLENBQUMsRUFBRXJCLE9BQU8sQ0FBQztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNqRDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSw0RkFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDMkQzUCxPQUFPLENBQUM2USxHQUFHLENBQUMsQ0FDbkVwRyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFDM0JBLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUMzQkEsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQzNCQSxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFDM0JBLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUMzQkEsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQzNCQSxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsRUFDcENBLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUNyQyxDQUFDO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBVEtsQixDQUFDO2dCQUFFcEosQ0FBQztnQkFBRXFKLENBQUM7Z0JBQUVyTyxDQUFDO2dCQUFFbVcsQ0FBQztnQkFBRUMsQ0FBQztnQkFBRVQsVUFBVTtnQkFBRUMsVUFBVTtnQkFXekNDLElBQUksR0FBRztrQkFDWEYsVUFBVSxFQUFFQSxVQUFVO2tCQUN0QkcsRUFBRSxFQUFFLENBQUM7a0JBQ0xGLFVBQVUsRUFBRUEsVUFBVTtrQkFDdEJ4SCxDQUFDLEVBQURBLENBQUM7a0JBQUVwSixDQUFDLEVBQURBLENBQUM7a0JBQUVxSixDQUFDLEVBQURBLENBQUM7a0JBQUVyTyxDQUFDLEVBQURBLENBQUM7a0JBQUVtVyxDQUFDLEVBQURBLENBQUM7a0JBQUVDLENBQUMsRUFBREE7Z0JBQ2pCLENBQUM7Z0JBRUR0YixpQkFBTSxDQUFDUixHQUFHLENBQUMsbUJBQW1CLEVBQUV1YixJQUFJLENBQUM7Z0JBQUMsa0NBRS9CLElBQUlJLElBQUksQ0FBQyxDQUFDaFYsSUFBSSxDQUFDRSxTQUFTLENBQUMwVSxJQUFJLENBQUMsQ0FBQyxFQUFFckIsT0FBTyxDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2pEO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQSxPQUVELHdDQUErQjtNQUFBO01BQzdCLElBQUk2Qix1QkFBdUIsR0FBRyxJQUFJO01BQ2xDdmIsaUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLGtDQUFrQyxDQUFDO01BQzlDakQsTUFBTSxDQUFDaWYsZ0JBQWdCLENBQUMsY0FBYywwRUFBRTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUN0Q3hiLGlCQUFNLENBQUNSLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDbkN1RCxZQUFZLENBQUN3WSx1QkFBdUIsQ0FBQztnQkFBQztnQkFBQSxPQUNoQyxLQUFJLENBQUNFLGdCQUFnQixFQUFFO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQzlCLElBQUU7UUFBQ0MsT0FBTyxFQUFFO01BQUksQ0FBQyxDQUFDO01BQ25CbmYsTUFBTSxDQUFDaWYsZ0JBQWdCLENBQUMsVUFBVSwwRUFBRTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNsQ3hiLGlCQUFNLENBQUNSLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDL0J1RCxZQUFZLENBQUN3WSx1QkFBdUIsQ0FBQztnQkFBQztnQkFBQSxPQUNoQyxLQUFJLENBQUNFLGdCQUFnQixFQUFFO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQzlCLElBQUU7UUFBQ0MsT0FBTyxFQUFFO01BQUksQ0FBQyxDQUFDO01BQ25CbmYsTUFBTSxDQUFDaWYsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtRQUNoRCxJQUFJamYsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUN1YixlQUFlLEtBQUssUUFBUSxFQUFFO1VBQ3BEO1VBQ0FKLHVCQUF1QixHQUFHbFosVUFBVSwwRUFBQztZQUFBO2NBQUE7Z0JBQUE7a0JBQUE7b0JBQ25DckMsaUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLFlBQVksQ0FBQztvQkFBQztvQkFBQSxPQUNuQixLQUFJLENBQUNpYyxnQkFBZ0IsRUFBRTtrQkFBQTtrQkFBQTtvQkFBQTtnQkFBQTtjQUFBO1lBQUE7VUFBQSxDQUM5QixJQUFFLEtBQUssQ0FBQztVQUNUO1FBQ0Y7UUFDQTtRQUNBMVksWUFBWSxDQUFDd1ksdUJBQXVCLENBQUM7UUFDckNBLHVCQUF1QixHQUFHLElBQUk7TUFDaEMsQ0FBQyxFQUFFO1FBQUNHLE9BQU8sRUFBRTtNQUFJLENBQUMsQ0FBQztJQUNyQjtFQUFDO0lBQUE7SUFBQSxPQUVELG1CQUFVakIsT0FBTyxFQUFFO01BQ2pCLElBQUksQ0FBQy9OLFNBQVMsQ0FBQ2tQLFVBQVUsSUFBSSxPQUFPbFAsU0FBUyxDQUFDa1AsVUFBVSxLQUFLLFVBQVUsRUFBRTtRQUN2RWxaLEtBQUssQ0FBQ3RGLFdBQVcsRUFBRXFkLE9BQU8sQ0FBQztRQUMzQjtNQUNGO01BRUEsSUFBSW9CLE1BQU0sR0FBR25QLFNBQVMsQ0FBQ2tQLFVBQVUsQ0FBQ3hlLFdBQVcsRUFBRXFkLE9BQU8sQ0FBQztNQUN2RCxJQUFNcUIsYUFBYSxHQUFHaFgsV0FBVyxDQUFDLFlBQU07UUFDdEMsSUFBSSxDQUFDK1csTUFBTSxFQUFFQSxNQUFNLEdBQUduUCxTQUFTLENBQUNrUCxVQUFVLENBQUN4ZSxXQUFXLEVBQUVxZCxPQUFPLENBQUMsQ0FBQyxLQUM1RDtVQUNIN1YsYUFBYSxDQUFDa1gsYUFBYSxDQUFDO1VBQzVCOWIsaUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLDBCQUEwQixDQUFDO1FBQ3hDO01BQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUNOLElBQUlxYyxNQUFNLEVBQUU7TUFDWnhaLFVBQVUsQ0FBQyxZQUFNO1FBQ2Z1QyxhQUFhLENBQUNrWCxhQUFhLENBQUM7UUFDNUIsSUFBSSxDQUFDRCxNQUFNLEVBQUU7VUFDWDdiLGlCQUFNLENBQUNSLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztRQUMvQjtNQUNGLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDVjtFQUFDO0VBQUE7QUFBQTtBQUdILCtDQUFlbWEsTUFBTTs7Ozs7Ozs7O0FDM01xQjtBQUNYO0FBQzJCO0FBRTFELElBQU0zWixvQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsY0FBYyxDQUFDO0FBRXpDLElBQU1nZCxRQUFRO0VBQUEsc0VBQUcsaUJBQU94VyxLQUFLLEVBQUV5VyxTQUFTO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBLEtBQ2xDaFEsS0FBSyxDQUFDdUksT0FBTyxDQUFDaFAsS0FBSyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQUEsb0RBQ0NBLEtBQUssQ0FBQ0YsT0FBTyxFQUFFO1lBQUE7WUFBQTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQSw4Q0FBMUJILENBQUMsbUJBQUVvTixHQUFHO1lBQ1YySixnQkFBZ0IsR0FBR2pRLEtBQUssQ0FBQ3VJLE9BQU8sQ0FBQ3lILFNBQVMsQ0FBQyxHQUFHQSxTQUFTLENBQUM5VyxDQUFDLENBQUMsR0FBRzhXLFNBQVMsSUFBSSxFQUFFO1lBQUEsTUFDOUUsUUFBT0MsZ0JBQWdCLE1BQUssUUFBUTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDYkMsc0JBQXNCLENBQUNELGdCQUFnQixDQUFDO1VBQUE7WUFBM0RFLFVBQVU7WUFDaEI1VyxLQUFLLENBQUNMLENBQUMsQ0FBQyxHQUFHekosVUFBVSxDQUFDNlcsR0FBRyxFQUFFLGFBQWEsRUFBRTZKLFVBQVUsQ0FBQztZQUFDO1lBQUE7VUFBQTtZQUNqRDVXLEtBQUssQ0FBQ0wsQ0FBQyxDQUFDLEdBQUdrWCxpQkFBaUIsQ0FBQ0gsZ0JBQWdCLEVBQUUzSixHQUFHLENBQUM7VUFBQztZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQSxLQUVwRHRHLEtBQUssQ0FBQ3VJLE9BQU8sQ0FBQ3lILFNBQVMsQ0FBQztjQUFBO2NBQUE7WUFBQTtZQUFBLHFEQUNmQSxTQUFTO1lBQUE7WUFBQTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBaEJLLEdBQUc7WUFBQSxNQUNSLFFBQU9BLEdBQUcsTUFBSyxRQUFRO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUNBSCxzQkFBc0IsQ0FBQ0csR0FBRyxDQUFDO1VBQUE7WUFBOUNGLFdBQVU7WUFDaEI1VyxLQUFLLEdBQUdBLEtBQUssQ0FBQzNKLE9BQU8sQ0FBQyxhQUFhLEVBQUV1Z0IsV0FBVSxDQUFDO1lBQUM7WUFBQTtVQUFBO1lBQzVDNVcsS0FBSyxHQUFHNlcsaUJBQWlCLENBQUNDLEdBQUcsRUFBRTlXLEtBQUssRUFBRSxJQUFJLENBQUM7VUFBQztZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQSxNQUdqRCxRQUFPeVcsU0FBUyxNQUFLLFFBQVE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUFBLE9BQ05FLHNCQUFzQixDQUFDRixTQUFTLENBQUM7VUFBQTtZQUFwREcsWUFBVTtZQUNoQjVXLEtBQUssR0FBRzlKLFVBQVUsQ0FBQzhKLEtBQUssRUFBRSxhQUFhLEVBQUU0VyxZQUFVLENBQUM7WUFBQztZQUFBO1VBQUE7WUFDaEQ1VyxLQUFLLEdBQUc2VyxpQkFBaUIsQ0FBQ0osU0FBUyxFQUFFelcsS0FBSyxDQUFDO1VBQUM7WUFBQSxpQ0FFOUNBLEtBQUs7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNiO0VBQUEsZ0JBdkJLd1csUUFBUTtJQUFBO0VBQUE7QUFBQSxHQXVCYjtBQUVELFNBQVNLLGlCQUFpQixDQUFDSixTQUFTLEVBQUV6VyxLQUFLLEVBQWtCO0VBQUEsSUFBaEIrVyxNQUFNLHVFQUFHLEtBQUs7RUFDekQsSUFBSU4sU0FBUyxJQUFJelcsS0FBSyxDQUFDN0ksUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO0lBQzlDc0Qsb0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDhCQUE4QixFQUFFd2MsU0FBUyxDQUFDO0lBQ3JELElBQU1PLGVBQWUsR0FBR3pHLFFBQVEsQ0FBQ2tHLFNBQVMsQ0FBQztJQUMzQyxJQUFJTSxNQUFNLEVBQUUsT0FBTy9XLEtBQUssQ0FBQzNKLE9BQU8sQ0FBQyxhQUFhLEVBQUUyZ0IsZUFBZSxFQUFFLENBQUM7SUFDbEUsT0FBTzlnQixVQUFVLENBQUM4SixLQUFLLEVBQUUsYUFBYSxFQUFFZ1gsZUFBZSxFQUFFLENBQUM7RUFDNUQ7RUFDQSxPQUFPaFgsS0FBSztBQUNkO0FBQUMsU0FFYzJXLHNCQUFzQjtFQUFBO0FBQUE7QUFBQTtFQUFBLHFGQUFyQyxrQkFBc0NGLFNBQVM7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ3RDdkssT0FBTyxHQUE0QnVLLFNBQVMsQ0FBNUN2SyxPQUFPLEVBQUVuTSxHQUFHLEdBQXVCMFcsU0FBUyxDQUFuQzFXLEdBQUcsRUFBRWtYLFdBQVcsR0FBVVIsU0FBUyxDQUE5QlEsV0FBVyxFQUFFNWMsSUFBSSxHQUFJb2MsU0FBUyxDQUFqQnBjLElBQUk7WUFBQSxlQUM5QjZSLE9BQU87WUFBQSxrQ0FDUixTQUFTLHdCQWVULFlBQVk7WUFBQTtVQUFBO1lBZFgwSyxVQUFVLEdBQUcsSUFBSTtZQUNyQkEsVUFBVSxHQUFHNWYsTUFBTSxDQUFDb0wsY0FBYyxDQUFDdkksT0FBTyxDQUFDa0csR0FBRyxDQUFDO1lBQy9DLElBQUksQ0FBQzZXLFVBQVUsRUFBRUEsVUFBVSxHQUFHNWYsTUFBTSxDQUFDb0wsY0FBYyxDQUFDdkksT0FBTyxDQUFDb2QsV0FBVyxDQUFDO1lBQUMsS0FDckU1YyxJQUFJO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFFSnVjLFVBQVUsR0FBR2hXLElBQUksQ0FBQ0MsS0FBSyxDQUFDK1YsVUFBVSxDQUFDO1lBQ25DQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDbmdCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzRELElBQUksQ0FBQztZQUFDO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFFckRJLG9CQUFNLENBQUNxQixNQUFNLDJCQUFvQjhhLFVBQVUsRUFBRztZQUFDLGtDQUN4QyxJQUFJO1VBQUE7WUFBQSxrQ0FHUkEsVUFBVTtVQUFBO1lBQUE7WUFBQSxPQUdNM0gsc0JBQXNCLENBQUNsUCxHQUFHLENBQUM7VUFBQTtZQUE5QzZXLFlBQVU7WUFBQSxJQUNUQSxZQUFVO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUFxQjNILHNCQUFzQixDQUFDZ0ksV0FBVyxDQUFDO1VBQUE7WUFBdERMLFlBQVU7VUFBQTtZQUFBLGtDQUNwQkEsWUFBVTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBR3RCO0VBQUE7QUFBQTtBQUVELGtEQUFlSixRQUFROztBQ25FdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQUk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQUk7QUFDbkIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFJO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG1CQUFJO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVxRzs7O0FDeExsQztBQUNOOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyx5Q0FBeUMsSUFBSTtBQUM5RTtBQUNBLHdCQUF3QixtQkFBSTtBQUM1QjtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFJLHNEQUFzRCxtQkFBSTtBQUNsRixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVUsSUFBSTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUUyQjs7O0FDOUY1QixJQUFNVSxNQUFNLEdBQUc7RUFDYkMsTUFBTSxFQUFFLGNBQWM7RUFDdEJyTixPQUFPLEVBQUUsQ0FBQztFQUNWc04sS0FBSyxFQUFFO0lBQ0xqSyxJQUFJLEVBQUUsV0FBVztJQUNqQmtLLE9BQU8sRUFBRSxDQUNQO01BQ0VsSyxJQUFJLEVBQUUsUUFBUTtNQUNkbUssTUFBTSxFQUFFO0lBQ1YsQ0FBQyxDQUNGO0lBQ0RyYSxPQUFPLEVBQUU7TUFBQ3NhLE9BQU8sRUFBRTtJQUFLO0VBQzFCO0FBQ0YsQ0FBQztBQUNELGlEQUFlTCxNQUFNOzs7Ozs7Ozs7O0FDYk07QUFDZTtBQUNYO0FBQ0s7QUFDNEM7QUFFaEYsSUFBTXpjLGdDQUFNLEdBQUcsSUFBSWpCLFVBQU0sQ0FBQywyQkFBMkIsQ0FBQztBQUFDLElBQ2pEaWUseUJBQXlCO0VBQzdCLHFDQUFjO0lBQUE7SUFDWixJQUFJLENBQUNyTSxTQUFTLEdBQUcsSUFBSTtJQUNyQixJQUFJLENBQUNzTSxJQUFJLEVBQUU7RUFDYjtFQUFDO0lBQUE7SUFBQTtNQUFBLHVFQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFDRWpkLGdDQUFNLENBQUNSLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDN0JrZCxNQUFNLEdBQWFELG1CQUFiLEVBQUVwTixPQUFPLEdBQUlvTixvQkFBSjtnQkFBQTtnQkFBQSxPQUNMTSxNQUFNLENBQUNMLE1BQU0sRUFBRXJOLE9BQU8sRUFBRTtrQkFDdkM2TixPQUFPLG1CQUFDQyxFQUFFLEVBQUVDLFVBQVUsRUFBRTtvQkFDdEIsUUFBUUEsVUFBVTtzQkFDaEIsS0FBSyxDQUFDO3dCQUNKO3NCQUNGO3dCQUNFO3dCQUNBLElBQUk7MEJBQ0ZELEVBQUUsQ0FBQ0UsaUJBQWlCLENBQUNaLHVCQUFpQixDQUFDO3dCQUN6QyxDQUFDLENBQUMsT0FBT3ZULEdBQUcsRUFBRTswQkFDWmxKLGdDQUFNLENBQUNxQixNQUFNLENBQUMsb0NBQW9DLEVBQUU2SCxHQUFHLENBQUM1SCxPQUFPLENBQUM7d0JBQ2xFO3dCQUNBO29CQUFNO29CQUVWLElBQUk7c0JBQUE7c0JBQ0YsSUFBTXFiLEtBQUssR0FBR1EsRUFBRSxDQUFDRyxpQkFBaUIsQ0FBQ2IsdUJBQWlCLEVBQUVBLDBCQUFvQixDQUFDO3NCQUMzRSxJQUFJLDBCQUFBQSwwQkFBb0IsMERBQXBCLHNCQUFzQnpnQixNQUFNLElBQUcsQ0FBQyxFQUFFO3dCQUFBLG9FQUNsQnlnQiwwQkFBb0I7MEJBQUE7d0JBQUE7MEJBQXRDLG9EQUF3Qzs0QkFBQSxJQUE3QmMsR0FBRzs0QkFDWlosS0FBSyxDQUFDYSxXQUFXLENBQUNELEdBQUcsQ0FBQzdLLElBQUksRUFBRTZLLEdBQUcsQ0FBQ1YsTUFBTSxDQUFDOzBCQUN6Qzt3QkFBQzswQkFBQTt3QkFBQTswQkFBQTt3QkFBQTtzQkFDSDtvQkFDRixDQUFDLENBQUMsT0FBTzNULEdBQUcsRUFBRTtzQkFDWmxKLGdDQUFNLENBQUNxQixNQUFNLENBQUMsMkNBQTJDLEVBQUU2SCxHQUFHLENBQUM1SCxPQUFPLENBQUM7b0JBQ3pFO2tCQUNGO2dCQUNGLENBQUMsQ0FBQztjQUFBO2dCQXpCSTZiLEVBQUU7Z0JBMEJSLElBQUksQ0FBQ3hNLFNBQVMsR0FBR3dNLEVBQUU7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDckI7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsd0VBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLGtDQUNTLElBQUlwVCxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFFeVQsTUFBTSxFQUFLO2tCQUN0QyxJQUFNekksUUFBUSxHQUFHbFEsV0FBVyxDQUFDLFlBQU07b0JBQ2pDLElBQUksS0FBSSxDQUFDNkwsU0FBUyxFQUFFO3NCQUNsQi9MLGFBQWEsQ0FBQ29RLFFBQVEsQ0FBQztzQkFDdkJoTCxPQUFPLENBQUMsS0FBSSxDQUFDMkcsU0FBUyxDQUFDO29CQUN6QjtrQkFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO2tCQUNOdE8sVUFBVSxDQUFDLFlBQU07b0JBQ2YsSUFBSSxDQUFDLEtBQUksQ0FBQ3NPLFNBQVMsRUFBRTtzQkFDbkIvTCxhQUFhLENBQUNvUSxRQUFRLENBQUM7c0JBQ3ZCeUksTUFBTSxDQUFDLElBQUl2YyxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztvQkFDL0U7a0JBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQztnQkFDVixDQUFDLENBQUM7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDSDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSwyRUFFRDtRQUFBO1VBQUE7VUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFld2MsU0FBUyw4REFBRyxLQUFLO2dCQUFBO2dCQUFBLE9BQ2IsSUFBSSxDQUFDQyxLQUFLLEVBQUU7Y0FBQTtnQkFBdkJSLEVBQUU7Z0JBQUEsa0NBQ0RBLEVBQUUsQ0FBQ1MsV0FBVyxDQUFDbkIsdUJBQWlCLEVBQUVpQixTQUFTLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDZixLQUFLO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ3JGO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHVFQUVELGtCQUFXa0IsT0FBTztRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDSSxJQUFJLENBQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Y0FBQTtnQkFBakNuQixLQUFLO2dCQUNMb0IsU0FBUyxHQUFHL1csSUFBSSxDQUFDNEgsS0FBSyxDQUFDNVIsSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUFBLEtBQzNDZ0ksS0FBSyxDQUFDdUksT0FBTyxDQUFDc0osT0FBTyxDQUFDO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNsQkcsWUFBWSxHQUFHLEVBQUU7Z0JBQUEsaUVBQ0pILE9BQU87Z0JBQUE7a0JBQTFCLHVEQUE0QjtvQkFBakJJLElBQUk7b0JBQ2JBLElBQUksQ0FBQ0YsU0FBUyxHQUFHQSxTQUFTO29CQUMxQkMsWUFBWSxDQUFDNUosSUFBSSxDQUFDdUksS0FBSyxDQUFDdUIsR0FBRyxDQUFDRCxJQUFJLENBQUMsQ0FBQztrQkFDcEM7Z0JBQUM7a0JBQUE7Z0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FDS2xVLE9BQU8sQ0FBQzZRLEdBQUcsQ0FBQ29ELFlBQVksQ0FBQztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBRS9CSCxPQUFPLENBQUNFLFNBQVMsR0FBR0EsU0FBUztnQkFBQztnQkFBQSxPQUN4QnBCLEtBQUssQ0FBQ3VCLEdBQUcsQ0FBQ0wsT0FBTyxDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRTNCO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHdFQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNzQixJQUFJLENBQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Y0FBQTtnQkFBakNuQixLQUFLO2dCQUFBO2dCQUFBLE9BQ0xBLEtBQUssQ0FBQ3dCLEtBQUssRUFBRTtjQUFBO2dCQUFBO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRXBCO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHNFQUVELGtCQUFVQyxHQUFHO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNNLElBQUksQ0FBQ1QsS0FBSyxFQUFFO2NBQUE7Z0JBQXZCUixFQUFFO2dCQUFBO2dCQUFBLE9BQ1VBLEVBQUUsQ0FBQzVULEdBQUcsQ0FBQ2tULHVCQUFpQixFQUFFMkIsR0FBRyxDQUFDO2NBQUE7Z0JBQTFDdmIsR0FBRztnQkFBQSxrQ0FDRkEsR0FBRztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNYO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHdFQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNtQixJQUFJLENBQUM4YSxLQUFLLEVBQUU7Y0FBQTtnQkFBdkJSLEVBQUU7Z0JBQUE7Z0JBQUEsT0FDVUEsRUFBRSxDQUFDa0IsS0FBSyxDQUFDNUIsdUJBQWlCLENBQUM7Y0FBQTtnQkFBdkM1WixHQUFHO2dCQUFBLGtDQUNGQSxHQUFHO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ1g7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsNEVBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BQ21CLElBQUksQ0FBQzhhLEtBQUssRUFBRTtjQUFBO2dCQUF2QlIsRUFBRTtnQkFBQTtnQkFBQSxPQUNhQSxFQUFFLENBQUNTLFdBQVcsQ0FBQ25CLHVCQUFpQixDQUFDLENBQUNFLEtBQUssQ0FBQzJCLFVBQVUsRUFBRTtjQUFBO2dCQUFuRUMsTUFBTTtnQkFBQSxrQ0FDTEEsTUFBTTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNkO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHFGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFDRXhlLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQztnQkFDN0N5ZSxZQUFZLEdBQUcsSUFBSTtnQkFBQTtnQkFBQSxPQUNRLElBQUksQ0FBQ0gsS0FBSyxFQUFFO2NBQUE7Z0JBQXJDSSxnQkFBZ0I7Z0JBQUEsS0FDbEJBLGdCQUFnQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDbEJ6ZSxnQ0FBTSxDQUFDUixHQUFHLENBQUMsNkJBQTZCLENBQUM7Z0JBQUM7Z0JBQUEsT0FDckIsSUFBSSxDQUFDa2YsU0FBUyxFQUFFO2NBQUE7Z0JBQS9CSCxNQUFNO2dCQUNOUixTQUFTLEdBQUdRLE1BQU0sQ0FBQ2haLEtBQUssQ0FBQ3dZLFNBQVM7Z0JBQ2xDWSxjQUFjLEdBQUkzaEIsSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFJK1osU0FBUyxFQUN0RDtnQkFBQSxNQUNJWSxjQUFjLEdBQUcsS0FBSztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUMxQjNlLGdDQUFNLENBQUNSLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQztnQkFDOUNnZixZQUFZLEdBQUcsSUFBSSxDQUFDTCxLQUFLLEVBQUU7Y0FBQztnQkFFOUJwZSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDO2dCQUNsQzZlLGtCQUFrQixHQUFHL2MsZ0JBQWdCLEVBQUU7Z0JBQUE7Z0JBQUEsT0FDWmtJLE9BQU8sQ0FBQzZRLEdBQUcsQ0FBQyxDQUFDZ0Usa0JBQWtCLEVBQUVKLFlBQVksQ0FBQyxDQUFDO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQXpFSyxnQkFBZ0I7Z0JBQUEsTUFDbkIsQ0FBQ0EsZ0JBQWdCLElBQUksQ0FBQ0EsZ0JBQWdCLENBQUM3aUIsTUFBTTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUNqRCtELG9CQUFvQixDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUM7Z0JBQUM7Z0JBQUEsT0FDckMsSUFBSSxDQUFDK2UsSUFBSSxDQUFDLElBQUksQ0FBQ0MsZUFBZSxDQUFDRixnQkFBZ0IsQ0FBQyxDQUFDO2NBQUE7Z0JBQ3ZEOWUsb0JBQW9CLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztjQUFDO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUMxQztNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUEsT0FFRCx5QkFBZ0I4ZSxnQkFBZ0IsRUFBRTtNQUNoQyxJQUFNRyxRQUFRLEdBQUcsRUFBRTtNQUNuQixJQUFNQyxVQUFVLEdBQUdKLGdCQUFnQixDQUFDSyxLQUFLLEVBQUU7TUFDM0NELFVBQVUsQ0FBQ0MsS0FBSyxFQUFFO01BQUMscUVBQ0FMLGdCQUFnQjtRQUFBO01BQUE7UUFBbkMsdURBQXFDO1VBQUEsSUFBMUJ0ZixJQUFJO1VBQ2IsSUFBTXNlLE9BQU8sR0FBRztZQUFDTyxHQUFHLEVBQUU3ZSxJQUFJLENBQUMyZixLQUFLO1VBQUUsQ0FBQztVQUNuQyxLQUFLLElBQUloYSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcrWixVQUFVLENBQUNqakIsTUFBTSxFQUFFa0osQ0FBQyxFQUFFLEVBQUU7WUFDMUMyWSxPQUFPLENBQUNvQixVQUFVLENBQUMvWixDQUFDLENBQUMsQ0FBQyxHQUFHM0YsSUFBSSxDQUFDMkYsQ0FBQyxDQUFDLElBQUksSUFBSTtVQUMxQztVQUNBOFosUUFBUSxDQUFDNUssSUFBSSxDQUFDeUosT0FBTyxDQUFDO1FBQ3hCO01BQUM7UUFBQTtNQUFBO1FBQUE7TUFBQTtNQUNELE9BQU9tQixRQUFRO0lBQ2pCO0VBQUM7SUFBQTtJQUFBO01BQUEsbUZBRUQsbUJBQXVCRyxRQUFRO1FBQUE7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BQ0EsSUFBSSxDQUFDZCxLQUFLLEVBQUU7Y0FBQTtnQkFBckNJLGdCQUFnQjtnQkFBQTtnQkFBQSxPQUNBakssc0JBQXNCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztjQUFBO2dCQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQ2pEQSxzQkFBc0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUM7Y0FBQTtnQkFBQTtjQUFBO2dCQUQzRDRLLE9BQU87Z0JBQUEsTUFFUFgsZ0JBQWdCLElBQUlXLE9BQU87a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQzdCRCxRQUFRLEVBQUU7Z0JBQUM7Y0FBQTtnQkFHVEUsa0JBQWtCLEdBQUcsSUFBSTtnQkFDdkJDLG1CQUFtQixHQUFHeGEsV0FBVywwRUFBQztrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTswQkFBQTswQkFBQSxPQUNiLE1BQUksQ0FBQ3VaLEtBQUssRUFBRTt3QkFBQTswQkFBckNJLGdCQUFnQjswQkFBQSxLQUNaQSxnQkFBZ0I7NEJBQUE7NEJBQUE7MEJBQUE7MEJBQUE7MEJBQUEsT0FDRmpLLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7d0JBQUE7MEJBQUE7MEJBQUE7NEJBQUE7NEJBQUE7MEJBQUE7MEJBQUE7MEJBQUEsT0FDakRBLHNCQUFzQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQzt3QkFBQTswQkFBQTt3QkFBQTswQkFEM0Q0SyxPQUFPOzBCQUFBLEtBRUhBLE9BQU87NEJBQUE7NEJBQUE7MEJBQUE7MEJBQ1RELFFBQVEsRUFBRTswQkFDVnZhLGFBQWEsQ0FBQzBhLG1CQUFtQixDQUFDOzBCQUNsQ3ZjLFlBQVksQ0FBQ3NjLGtCQUFrQixDQUFDOzBCQUFDO3dCQUFBO3dCQUFBOzBCQUFBO3NCQUFBO29CQUFBO2tCQUFBO2dCQUFBLENBSXRDLElBQUUsRUFBRSxDQUFDO2dCQUNOQSxrQkFBa0IsR0FBR2hkLFVBQVUsQ0FBQyxZQUFNO2tCQUNwQ3VDLGFBQWEsQ0FBQzBhLG1CQUFtQixDQUFDO2dCQUNwQyxDQUFDLEVBQUUsSUFBSSxDQUFDO2NBQUM7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ1Y7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7RUFBQTtBQUFBO0FBR0gsa0VBQWV0Qyx5QkFBeUI7Ozs7QUM3S1E7QUFDZDtBQUVsQyxJQUFNdUMsS0FBSyxHQUFJLFlBQVc7RUFDeEIsSUFBSUMsUUFBUSxHQUFHLElBQUk7RUFDbkIsT0FBTztJQUNMQyxXQUFXO01BQUEsOEVBQUU7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQSxNQUNQRCxRQUFRLEtBQUssSUFBSTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUNiL08sUUFBUSxFQUFFO2NBQUE7Z0JBQ2hCK08sUUFBUSxHQUFHLElBQUl4Qyw2QkFBeUIsRUFBRTtnQkFDMUM7Z0JBQ0F3QyxRQUFRLENBQUNFLFdBQVcsR0FBRyxJQUFJO2NBQUM7Z0JBQUEsaUNBRXZCRixRQUFRO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2hCO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUNILENBQUM7QUFDSCxDQUFDLEVBQUc7QUFDSiwwQ0FBZUQsS0FBSzs7Ozs7Ozs7QUNqQndEO0FBQ2xCO0FBQzBCO0FBQzdDO0FBQ1I7QUFDMkI7QUFDSDtBQUFBLFNBRXhDSSxZQUFZO0VBQUE7QUFBQTtBQUFBO0VBQUEsMkVBQTNCLGtCQUE0QnpaLE9BQU87SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQzNCbEcsTUFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsb0JBQW9CLENBQUM7WUFBQTtZQUFBLE9BQzlCd2dCLGlCQUFpQixFQUFFO1VBQUE7WUFBOUJwQyxFQUFFO1lBQ0RsZixrQkFBa0IsR0FBSUgsdUNBQUo7WUFFbkI4aEIsV0FBVztjQUFBLDhFQUFHLGlCQUEyQnJaLE1BQU07Z0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7a0JBQUE7b0JBQUE7c0JBQUE7d0JBQUVwQixPQUFPLDJEQUFHLElBQUk7d0JBRWpFZ0MsUUFBUSxHQVlOWixNQUFNLENBWlJZLFFBQVEsRUFDUnZILElBQUksR0FXRjJHLE1BQU0sQ0FYUjNHLElBQUksRUFDSmlnQixVQUFVLEdBVVJ0WixNQUFNLENBVlJzWixVQUFVLEVBQ1ZDLGVBQWUsR0FTYnZaLE1BQU0sQ0FUUnVaLGVBQWUsRUFDZjFZLFFBQVEsR0FRTmIsTUFBTSxDQVJSYSxRQUFRLEVBQ1JDLGdCQUFnQixHQU9kZCxNQUFNLENBUFJjLGdCQUFnQixFQUNoQjBZLFdBQVcsR0FNVHhaLE1BQU0sQ0FOUndaLFdBQVcsRUFDWHpZLGVBQWUsR0FLYmYsTUFBTSxDQUxSZSxlQUFlLEVBQ2ZDLGVBQWUsR0FJYmhCLE1BQU0sQ0FKUmdCLGVBQWUsRUFDZnlVLFNBQVMsR0FHUHpWLE1BQU0sQ0FIUnlWLFNBQVMsRUFDVGdFLEtBQUssR0FFSHpaLE1BQU0sQ0FGUnlaLEtBQUssRUFDTEMsa0JBQWtCLEdBQ2hCMVosTUFBTSxDQURSMFosa0JBQWtCO3dCQUFBLE1BRWhCOVksUUFBUSxLQUFLLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ3JCbkgsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLG1EQUFtRCxDQUFDO3dCQUFDLGlDQUM1RCxJQUFJO3NCQUFBO3dCQUVSa0UsS0FBSyxHQUFJZ0IsTUFBTSxDQUFmaEIsS0FBSyxFQUNWO3dCQUNBSixPQUFPLEdBQUdBLE9BQU8sR0FBR0EsT0FBTyxDQUFDeEosSUFBSSxDQUFDeUwsUUFBUSxDQUFDLEdBQUc4WSxDQUFDLENBQUM5WSxRQUFRLENBQUM7d0JBRWxEK1ksRUFBRSxHQUFHSixXQUFXLEdBQUd4akIsTUFBTSxDQUFDNmpCLFVBQVUsQ0FBQ0wsV0FBVyxDQUFDLENBQUNNLE9BQU8sR0FBRyxJQUFJO3dCQUFBLElBQ2pFRixFQUFFOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUNMbmdCLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRTBlLFdBQVcsQ0FBQzt3QkFBQyxpQ0FDbEQsS0FBSztzQkFBQTt3QkFBQSxNQUdYelksZUFBZSxJQUFJLENBQUNDLGVBQWUsSUFDbkNBLGVBQWUsSUFBSSxDQUFDRCxlQUFnQjswQkFBQTswQkFBQTt3QkFBQTt3QkFFckN0SCxNQUFNLENBQUNxQixNQUFNLENBQUMsa0NBQWtDLENBQUM7d0JBQUMsaUNBQzNDLEtBQUs7c0JBQUE7d0JBQUEsTUFFVmlHLGVBQWUsSUFBSUMsZUFBZTswQkFBQTswQkFBQTt3QkFBQTt3QkFBQSxJQUMvQjJZLENBQUMsQ0FBQzVZLGVBQWUsQ0FBQyxDQUFDdEwsTUFBTTswQkFBQTswQkFBQTt3QkFBQTt3QkFDNUJnRSxNQUFNLENBQUNxQixNQUFNLENBQUMsNkJBQTZCLEVBQUVpRyxlQUFlLENBQUM7d0JBQUMsaUNBQ3ZELEtBQUs7c0JBQUE7d0JBQUEsSUFFVDRZLENBQUMsQ0FBQzNZLGVBQWUsQ0FBQyxDQUFDdkwsTUFBTTswQkFBQTswQkFBQTt3QkFBQTt3QkFDNUJnRSxNQUFNLENBQUNxQixNQUFNLENBQUMsNkJBQTZCLEVBQUVrRyxlQUFlLENBQUM7d0JBQUMsaUNBQ3ZELEtBQUs7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUEsSUFFSkgsUUFBUTswQkFBQTswQkFBQTt3QkFBQTt3QkFDbEJwSCxNQUFNLENBQUNxQixNQUFNLENBQUMsd0JBQXdCLENBQUM7d0JBQUMsaUNBQ2pDLEtBQUs7c0JBQUE7d0JBQUEsSUFFUDhELE9BQU8sQ0FBQ25KLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQUEsTUFDYixDQUFDa2tCLENBQUMsQ0FBQzdZLGdCQUFnQixDQUFDLENBQUNyTCxNQUFNLElBQUltTCxRQUFRLEtBQUssUUFBUTswQkFBQTswQkFBQTt3QkFBQTt3QkFBQSxpQ0FBUyxJQUFJO3NCQUFBO3dCQUFBLE1BQ2pFQyxRQUFRLEtBQUssYUFBYTswQkFBQTswQkFBQTt3QkFBQTt3QkFDNUJwSCxNQUFNLENBQUNxQixNQUFNLENBQUMsc0JBQXNCLEVBQUUrRixRQUFRLENBQUM7d0JBQy9DcEgsTUFBTSxDQUFDUixHQUFHLENBQUMsNEJBQTRCLEVBQUU2SCxnQkFBZ0IsQ0FBQzt3QkFDMUQsSUFBSUEsZ0JBQWdCLEVBQUVsQyxPQUFPLEdBQUcrYSxDQUFDLENBQUM3WSxnQkFBZ0IsQ0FBQzt3QkFBQyxJQUMvQ2xDLE9BQU8sQ0FBQ25KLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ2pCZ0UsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDZCQUE2QixDQUFDO3dCQUFDLGlDQUN0QyxLQUFLO3NCQUFBO3dCQUFBLEtBTWhCMmEsU0FBUzswQkFBQTswQkFBQTt3QkFBQTt3QkFBQTt3QkFBQSxPQUNHRCxhQUFRLENBQUN4VyxLQUFLLEVBQUV5VyxTQUFTLENBQUM7c0JBQUE7d0JBQXhDelcsS0FBSztzQkFBQTt3QkFBQSxNQUVINEIsUUFBUSxLQUFLLFFBQVE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ3ZCbkgsTUFBTSxDQUFDUixHQUFHLENBQUMsWUFBWSxFQUFFNEgsUUFBUSxDQUFDO3dCQUNsQ2pDLE9BQU8sQ0FBQzVFLE1BQU0sRUFBRTt3QkFBQzt3QkFBQTtzQkFBQTt3QkFBQSxNQUNSNEcsUUFBUSxLQUFLLFFBQVE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQUEsY0FDdEJ2SCxJQUFJO3dCQUFBLGdDQUNMLFFBQVEsd0JBSVIsT0FBTyx3QkFJUCxRQUFRLHdCQUlSLE9BQU8sd0JBYVAsT0FBTzt3QkFBQTtzQkFBQTt3QkF4QlZJLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLG9CQUFvQixFQUFFK0YsS0FBSyxDQUFDO3dCQUN2Q0osT0FBTyxDQUFDbWIsTUFBTSxDQUFDL2EsS0FBSyxDQUFDO3dCQUFDO3NCQUFBO3dCQUd0QnZGLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLG1CQUFtQixFQUFFK0YsS0FBSyxDQUFDO3dCQUN0Q0osT0FBTyxDQUFDb2IsS0FBSyxDQUFDaGIsS0FBSyxDQUFDO3dCQUFDO3NCQUFBO3dCQUdyQnZGLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLG1CQUFtQixFQUFFK0YsS0FBSyxDQUFDO3dCQUN0Q0osT0FBTyxDQUFDcWIsTUFBTSxDQUFDamIsS0FBSyxDQUFDO3dCQUFDO3NCQUFBO3dCQUlwQkosT0FBTyxDQUFDc2IsR0FBRyxDQUFDLE9BQU8sQ0FBQzt3QkFDcEJDLFdBQVcsQ0FBQ25iLEtBQUssRUFBRXVhLGVBQWUsRUFBRSxJQUFJLENBQUM7d0JBQ25DYSxHQUFHLEdBQUd2Z0IsUUFBUSxDQUFDb0gsYUFBYSxDQUFDSixRQUFRLENBQUM7d0JBQzVDdVosR0FBRyxDQUFDbkYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVN0UixDQUFDLEVBQUU7MEJBQ3hDLElBQUl5VyxHQUFHLElBQUl6VyxDQUFDLENBQUMwVyxNQUFNLEVBQUU7NEJBQ25CMVcsQ0FBQyxDQUFDMlcsZUFBZSxFQUFFOzBCQUNyQjswQkFDQUMsWUFBWSxDQUFDdmIsS0FBSyxFQUFFdWEsZUFBZSxDQUFDO3dCQUN0QyxDQUFDLEVBQUUsSUFBSSxDQUFDO3dCQUFDO3NCQUFBO3dCQUFBLE1BS0x2WCxRQUFRLENBQUNaLGNBQWMsQ0FBQ3ZJLE9BQU8sQ0FBQ25CLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUM1RCtCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLG9DQUFvQyxDQUFDO3dCQUFDO3NCQUFBO3dCQUduRFEsTUFBTSxDQUFDUixHQUFHLENBQUMsa0JBQWtCLEVBQUUrRixLQUFLLENBQUM7d0JBQUMsS0FDbEN5YSxLQUFLOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBO3dCQUFBLE9BQ09lLGNBQWMsQ0FBQ2YsS0FBSyxFQUFFemEsS0FBSyxFQUFFMGEsa0JBQWtCLENBQUM7c0JBQUE7d0JBQTlEMWEsS0FBSztzQkFBQTt3QkFFUG1iLFdBQVcsQ0FBQ25iLEtBQUssRUFBRXVhLGVBQWUsQ0FBQzt3QkFBQyxLQUVoQ0QsVUFBVTswQkFBQTswQkFBQTt3QkFBQTt3QkFDTnRRLE1BQU0sR0FBR2hULE1BQU0sQ0FBQzZqQixVQUFVLENBQUM5aUIsa0JBQWtCLENBQUMsQ0FBQytpQixPQUFPO3dCQUFBLHlEQUN4Q1IsVUFBVTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTswQkFBQTswQkFBQTt3QkFBQTt3QkFBbkJtQixLQUFLO3dCQUFBLGNBQ05BLEtBQUs7d0JBQUEsZ0NBQ04sWUFBWSx3QkEwQlosWUFBWTt3QkFBQTtzQkFBQTt3QkF6QmZoaEIsTUFBTSxDQUFDUixHQUFHLENBQUMsNkJBQTZCLENBQUM7d0JBQUMsS0FDdEMrUCxNQUFNOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUNSaFQsTUFBTSxDQUFDNEQsR0FBRyxDQUFDcWIsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUV5RixZQUFZLENBQUM7d0JBQUM7d0JBQUEsT0FDekNsWCxPQUFPLENBQUM2USxHQUFHLENBQUMsQ0FDL0JwRyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQ2pDQSxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQ2xDLENBQUM7c0JBQUE7d0JBQUE7d0JBQUE7d0JBSEswTSxDQUFDO3dCQUFFQyxDQUFDO3dCQUlYLElBQUksT0FBT0QsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPQyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUNELENBQUMsQ0FBQ3hrQixRQUFRLENBQUN5a0IsQ0FBQyxDQUFDLEVBQUU7MEJBQ3BFLElBQUk1a0IsTUFBTSxDQUFDMFMsT0FBTyxJQUFJLE9BQU8xUyxNQUFNLENBQUMwUyxPQUFPLENBQUNtUyxTQUFTLEtBQUssVUFBVSxFQUFFOzRCQUNwRSxJQUFJN2tCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDMFgsVUFBVSxLQUFLLFVBQVUsRUFBRTs4QkFDakR2YixNQUFNLENBQUM0RCxHQUFHLENBQUNxYixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsWUFBTTtnQ0FDeEMsSUFBSWpmLE1BQU0sQ0FBQzBTLE9BQU8sQ0FBQ29TLEtBQUssS0FBSyxVQUFVLEVBQUU5a0IsTUFBTSxDQUFDMFMsT0FBTyxDQUFDbVMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7Z0NBQ2pGN2tCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ3FiLGdCQUFnQixDQUFDLFVBQVUsRUFBRXlGLFlBQVksRUFBRTtrQ0FBQ0ssSUFBSSxFQUFFO2dDQUFJLENBQUMsQ0FBQzs4QkFDckUsQ0FBQyxDQUFDOzRCQUNKLENBQUMsTUFBTTs4QkFDTCxJQUFJL2tCLE1BQU0sQ0FBQzBTLE9BQU8sQ0FBQ29TLEtBQUssS0FBSyxVQUFVLEVBQUU5a0IsTUFBTSxDQUFDMFMsT0FBTyxDQUFDbVMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7OEJBQ2pGN2tCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ3FiLGdCQUFnQixDQUFDLFVBQVUsRUFBRXlGLFlBQVksRUFBRTtnQ0FBQ0ssSUFBSSxFQUFFOzhCQUFJLENBQUMsQ0FBQzs0QkFDckU7MEJBQ0Y7d0JBQ0Y7d0JBQ0E5VixTQUFTLENBQUMzTixZQUFZLEVBQUVvakIsWUFBWSxDQUFDO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUV0QzFrQixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDbWIsZ0JBQWdCLENBQUMsWUFBWSxFQUFFeUYsWUFBWSxFQUFFOzBCQUFDSyxJQUFJLEVBQUU7d0JBQUksQ0FBQyxDQUFDO3NCQUFDO3dCQUFBO3NCQUFBO3dCQUlqR3RoQixNQUFNLENBQUNSLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQzt3QkFDekNqRCxNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDbWIsZ0JBQWdCLENBQUMsTUFBTSxFQUFFeUYsWUFBWSxFQUFFOzBCQUFDSyxJQUFJLEVBQUU7d0JBQUksQ0FBQyxDQUFDO3dCQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUsvRjt3QkFDQWpmLFVBQVUsQ0FBQyxZQUFNOzBCQUNmNGUsWUFBWSxFQUFFO3dCQUNoQixDQUFDLEVBQUVqZixPQUFPLENBQUM7c0JBQUM7d0JBQUE7c0JBQUE7d0JBS2hCaEMsTUFBTSxDQUFDcUIsTUFBTSxpQkFBVXpCLElBQUksc0NBQTRCdUgsUUFBUSxFQUFHO3dCQUFDLGlDQUM1RCxLQUFLO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBLE1BRVBBLFFBQVEsS0FBSyxNQUFNOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGNBQ3BCdkgsSUFBSTt3QkFBQSxnQ0FDTCxNQUFNLHlCQUlOLE1BQU0seUJBSU4saUJBQWlCLHlCQVFqQixVQUFVLHlCQUlWLGFBQWEseUJBSWIsZUFBZTt3QkFBQTtzQkFBQTt3QkF2QmxCSSxNQUFNLENBQUNSLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRStGLEtBQUssQ0FBQzt3QkFDbkNKLE9BQU8sQ0FBQ29jLElBQUksQ0FBQ2hjLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFHcEJ2RixNQUFNLENBQUNSLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRStGLEtBQUssQ0FBQzt3QkFDbkNKLE9BQU8sQ0FBQ3FjLElBQUksQ0FBQ2pjLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFJbEJ2RixNQUFNLENBQUNSLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRStGLEtBQUssQ0FBQzt3QkFDL0JOLGVBQWUsR0FBR2tCLElBQUksQ0FBQ0MsS0FBSyxDQUFDYixLQUFLLENBQUM7d0JBQ3pDdkYsTUFBTSxDQUFDUixHQUFHLENBQUMscUJBQXFCLEVBQUV5RixlQUFlLENBQUM7d0JBQ2xERixlQUFlLENBQUNJLE9BQU8sRUFBRUYsZUFBZSxDQUFDO3dCQUFDO3NCQUFBO3dCQUk1Q2pGLE1BQU0sQ0FBQ1IsR0FBRyw0QkFBcUIyRixPQUFPLG9CQUFVSSxLQUFLLEVBQUc7d0JBQ3hESixPQUFPLENBQUNzYyxRQUFRLENBQUNsYyxLQUFLLENBQUM7d0JBQUM7c0JBQUE7d0JBR3hCdkYsTUFBTSxDQUFDUixHQUFHLDZCQUFzQjJGLE9BQU8sb0JBQVVJLEtBQUssRUFBRzt3QkFDekRKLE9BQU8sQ0FBQ3VjLFdBQVcsQ0FBQ25jLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFHM0J2RixNQUFNLENBQUNSLEdBQUcsd0NBQWlDMkYsT0FBTyxpQkFBT0ksS0FBSyxFQUFHO3dCQUNqRSxJQUFJc2EsVUFBVSxFQUFFOzBCQUFBLDBEQUNNQSxVQUFVOzBCQUFBOzRCQUE5Qix1REFBZ0M7OEJBQXJCbUIsTUFBSzs4QkFDZCxJQUFJQSxNQUFLLElBQUksV0FBVyxFQUFFO2dDQUN4QmhoQixNQUFNLENBQUNSLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztnQ0FDbENtaUIsYUFBYSxHQUFHcGxCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDd2hCLEtBQUs7Z0NBQy9DQyw0QkFBNEIsQ0FBQzNYLENBQUMsRUFBRTNFLEtBQUssRUFBRW9jLGFBQWEsQ0FBQzs4QkFDdkQ7NEJBQ0Y7MEJBQUM7NEJBQUE7MEJBQUE7NEJBQUE7MEJBQUE7d0JBQ0g7d0JBQUM7c0JBQUE7d0JBR0QzaEIsTUFBTSxDQUFDUixHQUFHLENBQUMscUJBQXFCLEVBQUVJLElBQUksQ0FBQzt3QkFBQyxpQ0FDakMsS0FBSztzQkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQSxNQUVQdUgsUUFBUSxLQUFLLFNBQVM7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQy9CbkgsTUFBTSxDQUFDUixHQUFHLENBQUMsYUFBYSxFQUFFK0YsS0FBSyxDQUFDO3dCQUNoQ0osT0FBTyxDQUFDMUosVUFBVSxDQUFDOEosS0FBSyxDQUFDO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUFBLE1BQ2pCNEIsUUFBUSxLQUFLLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQzVCbkgsTUFBTSxDQUFDUixHQUFHLENBQUMsWUFBWSxFQUFFOEgsZUFBZSxFQUFFQyxlQUFlLENBQUM7d0JBQ3BEdWEsRUFBRSxHQUFHdmxCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDRixlQUFlLENBQUM7d0JBQ3ZEeWEsRUFBRSxHQUFHeGxCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDRCxlQUFlLENBQUM7d0JBQzdEeWEsU0FBUyxDQUFDRixFQUFFLEVBQUVDLEVBQUUsQ0FBQzt3QkFBQzt3QkFBQTtzQkFBQTt3QkFBQSxNQUNUNWEsUUFBUSxLQUFLLGNBQWM7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ3BDbkgsTUFBTSxDQUFDUixHQUFHLENBQUMsb0JBQW9CLEVBQUUrRixLQUFLLENBQUM7d0JBQ2pDMGMsUUFBUSxHQUFHN2QsZUFBZSxDQUFDbUIsS0FBSyxDQUFDO3dCQUN2QyxJQUFJaEosTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUM4aEIsY0FBYyxDQUFDRCxRQUFRLENBQUMsRUFBRTswQkFDaERqaUIsTUFBTSxDQUFDUixHQUFHLENBQUMseUJBQXlCLENBQUM7d0JBQ3ZDLENBQUMsTUFBTTJGLE9BQU8sQ0FBQ3FiLE1BQU0sc0JBQWV5QixRQUFRLGNBQUkxYyxLQUFLLGVBQVk7d0JBQUM7d0JBQUE7c0JBQUE7d0JBQUEsTUFDekQ0QixRQUFRLEtBQUssTUFBTTswQkFBQTswQkFBQTt3QkFBQTt3QkFDNUJuSCxNQUFNLENBQUNSLEdBQUcsa0JBQVc4SCxlQUFlLGlCQUFPQyxlQUFlLEVBQUc7d0JBQ3ZENGEsTUFBTSxHQUFHNWxCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDRixlQUFlLENBQUM7d0JBQzNEOGEsV0FBVyxHQUFHN2xCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDRCxlQUFlLENBQUM7d0JBQ3RFNmEsV0FBVyxDQUFDdmhCLE9BQU8sQ0FBQ3NoQixNQUFNLENBQUM7d0JBQUM7d0JBQUE7c0JBQUE7d0JBQUEsTUFDbkJoYixRQUFRLEtBQUssbUJBQW1COzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBO3dCQUFBLE9BQ3ZCNFosY0FBYyxDQUFDZixLQUFLLEVBQUV6YSxLQUFLLEVBQUUwYSxrQkFBa0IsQ0FBQztzQkFBQTt3QkFBNURwZCxHQUFHO3dCQUNUc0MsT0FBTyxDQUFDbWIsTUFBTSxDQUFDemQsR0FBRyxDQUFDO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUFBLE1BQ1hzRSxRQUFRLEtBQUssZ0JBQWdCOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGNBQzlCdkgsSUFBSTt3QkFBQSxnQ0FDTCxZQUFZO3dCQUFBO3NCQUFBO3dCQUFBLHNCQUNDb00sS0FBSyxDQUFDQyxJQUFJLENBQUM5RyxPQUFPLENBQUM7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQXhCK0UsRUFBQzt3QkFBQSxzQkFFTkEsRUFBQyxDQUFDK00sU0FBUyx5Q0FBWCxhQUFhdmEsUUFBUSxDQUFDLElBQUksQ0FBQzswQkFBQTswQkFBQTt3QkFBQTt3QkFDN0J3TixFQUFDLENBQUMrTSxTQUFTLEdBQUdoYixjQUFjLENBQUNpTyxFQUFDLENBQUMrTSxTQUFTLENBQUMsQ0FBQzNULEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLFVBQUM4ZSxRQUFROzBCQUFBLE9BQ2pFQSxRQUFRLENBQUMvZSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxVQUFDK2UsSUFBSTs0QkFBQSxPQUFLQSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsaUJBQWlCLEVBQUUsR0FBR0YsSUFBSSxDQUFDckosS0FBSyxDQUFDLENBQUMsQ0FBQzswQkFBQSxFQUFDLENBQUMzSixJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUFBLEVBQ2hHLENBQUNBLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQUM7c0JBQUE7d0JBR2ZwRixFQUFDLENBQUMrTSxTQUFTLEdBQUdoYixjQUFjLENBQUNpTyxFQUFDLENBQUMrTSxTQUFTLENBQUMsQ0FDcEMzVCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ1ZDLEdBQUcsQ0FBQyxVQUFDK2UsSUFBSTswQkFBQSxPQUFLQSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsaUJBQWlCLEVBQUUsR0FBR0YsSUFBSSxDQUFDckosS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFBQSxFQUFDLENBQ2pFM0osSUFBSSxDQUFDLEdBQUcsQ0FBQztzQkFBQzt3QkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTtzQkFBQTt3QkFLakJ0UCxNQUFNLENBQUNxQixNQUFNLENBQUMsNkJBQTZCLENBQUM7d0JBQUMsaUNBQ3RDLEtBQUs7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUEsTUFFUDhGLFFBQVEsS0FBSyxZQUFZOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGNBQzFCdkgsSUFBSTt3QkFBQSxnQ0FDTCxjQUFjLHlCQWFkLGlCQUFpQjt3QkFBQTtzQkFBQTt3QkFacEJJLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDJCQUEyQixDQUFDO3dCQUFDO3dCQUFBLE9BQ2ZpakIsaUJBQWlCLEVBQUU7c0JBQUE7d0JBQXRDQyxVQUFVO3dCQUFBLElBQ1hBLFVBQVU7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ2IxaUIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLG1EQUFtRCxDQUFDO3dCQUFDLGlDQUM1RCxLQUFLO3NCQUFBO3dCQUVkOEQsT0FBTyxDQUFDd2QsUUFBUSxFQUFFLENBQUN6USxNQUFNLENBQUMsWUFBVzswQkFDbkM7MEJBQ0EsT0FBTyxJQUFJLENBQUMwUSxRQUFRLElBQUksQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLFNBQVMsR0FBR0gsVUFBVTt3QkFBQztzQkFBQTt3QkFJN0IxaUIsTUFBTSxDQUFDUixHQUFHLENBQUMsaUNBQWlDLENBQUM7d0JBQUM7d0JBQUEsT0FDakJzakIsY0FBYyxDQUFDdmQsS0FBSyxDQUFDO3NCQUFBO3dCQUE1Q3dkLGNBQWM7d0JBQUEsSUFDZkEsY0FBYzswQkFBQTswQkFBQTt3QkFBQTt3QkFDakIvaUIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLHNEQUFzRCxDQUFDO3dCQUFDLGlDQUMvRCxLQUFLO3NCQUFBO3dCQUVkOEQsT0FBTyxDQUFDbWIsTUFBTSxDQUFDeUMsY0FBYyxDQUFDO3dCQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUtuQy9pQixNQUFNLENBQUNxQixNQUFNLENBQUMsNkJBQTZCLEVBQUU4RixRQUFRLENBQUM7d0JBQUMsaUNBQ2hELEtBQUs7c0JBQUE7d0JBQUEsaUNBRVAsSUFBSTtzQkFBQTtzQkFBQTt3QkFBQTtvQkFBQTtrQkFBQTtnQkFBQTtjQUFBLENBQ1o7Y0FBQSxTQWhSa0N5WSxXQUFXO2dCQUFBO2NBQUE7Y0FBQSxPQUFYQSxXQUFXO1lBQUE7WUFrUnhDa0QsY0FBYztjQUFBLHNFQUFHLGtCQUFPdmQsS0FBSztnQkFBQTtnQkFBQTtrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTt3QkFBQSxPQUNmaVAsc0JBQXNCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztzQkFBQTt3QkFBbkQ0SixHQUFHO3dCQUFBO3dCQUFBLE9BQ2lCakIsRUFBRSxDQUFDNVQsR0FBRyxDQUFDNlUsR0FBRyxDQUFDO3NCQUFBO3dCQUEvQnRjLFdBQVc7d0JBQUEsSUFDWkEsV0FBVyxhQUFYQSxXQUFXLGVBQVhBLFdBQVcsQ0FBRWtoQixhQUFhOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUM3QmhqQixNQUFNLENBQUNxQixNQUFNLHdDQUFpQytjLEdBQUcsRUFBRzt3QkFBQyxrQ0FDOUMsSUFBSTtzQkFBQTt3QkFFUDZFLGlCQUFpQixHQUFHQyxjQUFjLENBQUNwaEIsV0FBVyxDQUFDa2hCLGFBQWEsRUFBRXpkLEtBQUssQ0FBQzt3QkFBQSxrQ0FDbkUwZCxpQkFBaUI7c0JBQUE7c0JBQUE7d0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Y0FBQSxDQUN6QjtjQUFBLGdCQVRLSCxjQUFjO2dCQUFBO2NBQUE7WUFBQTtZQVdkTCxpQkFBaUI7Y0FBQSx1RUFBRztnQkFBQTtnQkFBQTtrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTt3QkFBQSxPQUNOak8sc0JBQXNCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztzQkFBQTt3QkFBbkQ0SixHQUFHO3dCQUFBO3dCQUFBLE9BQ2lCakIsRUFBRSxDQUFDNVQsR0FBRyxDQUFDNlUsR0FBRyxDQUFDO3NCQUFBO3dCQUEvQnRjLFdBQVc7d0JBQUEsSUFDWkEsV0FBVyxhQUFYQSxXQUFXLGVBQVhBLFdBQVcsQ0FBRXFoQixZQUFZOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUM1Qm5qQixNQUFNLENBQUNxQixNQUFNLDZDQUFzQytjLEdBQUcsRUFBRzt3QkFBQyxrQ0FDbkQsSUFBSTtzQkFBQTt3QkFFUHZiLEdBQUcsR0FBR2YsV0FBVyxDQUFDcWhCLFlBQVksZUFBUS9FLEdBQUcsTUFBRzt3QkFBQSxrQ0FDM0N2YixHQUFHO3NCQUFBO3NCQUFBO3dCQUFBO29CQUFBO2tCQUFBO2dCQUFBO2NBQUEsQ0FDWDtjQUFBLGdCQVRLNGYsaUJBQWlCO2dCQUFBO2NBQUE7WUFBQTtZQVdqQlMsY0FBYyxHQUFHLFNBQWpCQSxjQUFjLENBQUkzZCxLQUFLLEVBQUU2ZCxPQUFPLEVBQUs7Y0FDekMsSUFBSTdkLEtBQUssSUFBSTZkLE9BQU8sQ0FBQzFtQixRQUFRLENBQUMseUJBQXlCLENBQUMsRUFBRTtnQkFDeEQwbUIsT0FBTyxHQUFHM25CLFVBQVUsQ0FBQzJuQixPQUFPLEVBQUUseUJBQXlCLEVBQUU3ZCxLQUFLLENBQUM7Y0FDakU7Y0FDQSxPQUFPNmQsT0FBTztZQUNoQixDQUFDO1lBRUtyQyxjQUFjO2NBQUEsdUVBQUcsa0JBQU9uaEIsSUFBSSxFQUFFMkYsS0FBSyxFQUFFMGEsa0JBQWtCO2dCQUFBO2dCQUFBO2tCQUFBO29CQUFBO3NCQUFBO3dCQUFBLE1BRTNDQSxrQkFBa0IsS0FBSyxRQUFROzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBO3dCQUFBLE9BQ3pDekwsc0JBQXNCLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBLE9BQzdEQSxzQkFBc0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUM7c0JBQUE7d0JBQUE7c0JBQUE7d0JBRnJENEssT0FBTzt3QkFHVHZjLEdBQUcsR0FBRyxJQUFJO3dCQUFBLE1BQ1YsQ0FBQ3VjLE9BQU8sSUFBSUEsT0FBTyxDQUFDcGpCLE1BQU0sS0FBSyxDQUFDOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUNsQ2dFLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxjQUFjLENBQUM7d0JBQUMsa0NBQ3ZCLElBQUk7c0JBQUE7d0JBQUE7d0JBQUEsT0FFYThiLEVBQUUsQ0FBQzVULEdBQUcsQ0FBQzZWLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztzQkFBQTt3QkFBdEN0ZCxXQUFXO3dCQUFBLElBQ1pBLFdBQVc7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ2Q5QixNQUFNLENBQUNxQixNQUFNLENBQUMsdUJBQXVCLENBQUM7d0JBQUMsa0NBQ2hDLElBQUk7c0JBQUE7d0JBQUEsZUFFTHpCLElBQUk7d0JBQUEsa0NBQ0wscUJBQXFCLHlCQU1yQixtQkFBbUIseUJBTW5CLGtCQUFrQjt3QkFBQTtzQkFBQTt3QkFYckJpRCxHQUFHLEdBQUdxZ0IsY0FBYyxDQUFDcGhCLFdBQVcsQ0FBQ3VoQixtQkFBbUIsQ0FBQ2hmLFFBQVEsRUFBRSxDQUMxRHpJLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsRUFBRTJKLEtBQUssQ0FBQzt3QkFDbER2RixNQUFNLENBQUNSLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRXNDLFdBQVcsQ0FBQ3VoQixtQkFBbUIsQ0FBQzt3QkFBQztzQkFBQTt3QkFJOUV4Z0IsR0FBRyxHQUFHcWdCLGNBQWMsQ0FBQ3BoQixXQUFXLENBQUN3aEIsbUJBQW1CLENBQUNqZixRQUFRLEVBQUUsQ0FDMUR6SSxPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLEVBQUUySixLQUFLLENBQUM7d0JBQ2xEdkYsTUFBTSxDQUFDUixHQUFHLENBQUMsMkJBQTJCLEVBQUVzQyxXQUFXLENBQUN3aEIsbUJBQW1CLENBQUM7d0JBQUM7c0JBQUE7d0JBSXpFemdCLEdBQUcsR0FBR3FnQixjQUFjLENBQUNwaEIsV0FBVyxDQUFDeWhCLGtCQUFrQixDQUFDbGYsUUFBUSxFQUFFLENBQ3pEekksT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxFQUFFMkosS0FBSyxDQUFDO3dCQUNsRHZGLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLGdDQUFnQyxFQUFFc0MsV0FBVyxDQUFDeWhCLGtCQUFrQixDQUFDO3dCQUFDO3NCQUFBO3dCQUk3RXZqQixNQUFNLENBQUNxQixNQUFNLENBQUMscURBQXFELEdBQUV6QixJQUFJLENBQUM7c0JBQUM7d0JBQUEsa0NBRXhFaUQsR0FBRztzQkFBQTtzQkFBQTt3QkFBQTtvQkFBQTtrQkFBQTtnQkFBQTtjQUFBLENBQ1g7Y0FBQSxnQkF0Q0trZSxjQUFjO2dCQUFBO2NBQUE7WUFBQTtZQXdDZGMsNEJBQTRCO2NBQUEsdUVBQUcsa0JBQU9iLEtBQUssRUFBRXdDLE1BQU0sRUFBRTdCLGFBQWE7Z0JBQUE7Z0JBQUE7a0JBQUE7b0JBQUE7c0JBQUE7d0JBQ2hFOEIsWUFBWSxHQUFHLENBQUN6WCxLQUFLLENBQUN1SSxPQUFPLENBQUNpUCxNQUFNLENBQUMsR0FBRyxDQUFDQSxNQUFNLENBQUMsR0FBR0EsTUFBTTt3QkFBQSwwREFDckNDLFlBQVk7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQTNCQyxXQUFXO3dCQUFBLEtBQ2hCbm5CLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDdWpCLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQzVCcG5CLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDd2hCLEtBQUssR0FBRzhCLFdBQVc7d0JBQUM7d0JBQUEsT0FDbEN2WixLQUFLLENBQUMsSUFBSSxDQUFDO3NCQUFBO3dCQUNqQjVOLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDd2hCLEtBQUssR0FBR0QsYUFBYTt3QkFBQzt3QkFBQSxPQUNwQ3hYLEtBQUssQ0FBQyxJQUFJLENBQUM7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBRWpCNU4sTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUN3aEIsS0FBSyxHQUFHRCxhQUFhO3NCQUFDO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUc5QyxJQUFJLENBQUNwbEIsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUN1akIsTUFBTSxFQUFFOzBCQUMvQnBuQixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ3doQixLQUFLLEdBQUdELGFBQWE7d0JBQzNDLENBQUMsTUFBTTswQkFDTEUsNEJBQTRCLENBQUNiLEtBQUssRUFBRXdDLE1BQU0sRUFBRTdCLGFBQWEsQ0FBQzt3QkFDNUQ7c0JBQUM7c0JBQUE7d0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Y0FBQSxDQUNGO2NBQUEsZ0JBakJLRSw0QkFBNEI7Z0JBQUE7Y0FBQTtZQUFBO1lBbUI1QitCLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0IsQ0FBSTVDLEtBQUssRUFBSztjQUNsQyxJQUFNcmEsRUFBRSxHQUFHcWEsS0FBSyxDQUFDSixNQUFNLENBQUNqYSxFQUFFO2NBQzFCLElBQUlBLEVBQUUsSUFBSUEsRUFBRSxLQUFLLG1CQUFtQixFQUFFO2dCQUNwQ3VaLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDM2YsTUFBTSxFQUFFO2dCQUNoQ2hFLE1BQU0sQ0FBQ3NuQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUVELGdCQUFnQixFQUFFLElBQUksQ0FBQztnQkFDM0RybkIsTUFBTSxDQUFDc25CLG1CQUFtQixDQUFDLFVBQVUsRUFBRUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2NBQ2hFO1lBQ0YsQ0FBQztZQUVLRSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUk5QyxLQUFLLEVBQUs7Y0FDbEMsSUFBTTFnQixTQUFTLEdBQUcwZ0IsS0FBSyxDQUFDSixNQUFNLENBQUN0Z0IsU0FBUztjQUN4QyxJQUFJQSxTQUFTLElBQUlBLFNBQVMsQ0FBQ0csUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Z0JBQ3hEeWYsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM2RCxJQUFJLEVBQUU7Z0JBQzlCeG5CLE1BQU0sQ0FBQ3NuQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUVDLGdCQUFnQixFQUFFLElBQUksQ0FBQztnQkFDM0R2bkIsTUFBTSxDQUFDc25CLG1CQUFtQixDQUFDLFVBQVUsRUFBRUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2NBQ2hFO1lBQ0YsQ0FBQztZQUVLN0MsWUFBWSxHQUFHLFNBQWZBLFlBQVksR0FBUztjQUN6QixJQUFJMWtCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDdWpCLE1BQU0sRUFBRTtjQUNoQyxJQUFJcGIsUUFBUSxDQUFDWixjQUFjLENBQUN2SSxPQUFPLENBQUNuQixrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2NBQzlEMEosY0FBYyxDQUFDRyxPQUFPLENBQUM3SixrQkFBa0IsRUFBRSxDQUFDLENBQUM7Y0FDN0MsSUFBTStsQixNQUFNLEdBQUd6bkIsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNvSCxhQUFhLENBQUMsa0JBQWtCLENBQUM7Y0FDcEUsSUFBSXdjLE1BQU0sRUFBRUEsTUFBTSxDQUFDeGUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU07Y0FDNUNqSixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQzhoQixjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQzFjLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPO2NBQ2xGakosTUFBTSxDQUFDaWYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFb0ksZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2NBQ3hEcm5CLE1BQU0sQ0FBQ2lmLGdCQUFnQixDQUFDLFVBQVUsRUFBRW9JLGdCQUFnQixFQUFFLElBQUksQ0FBQztjQUUzRHJuQixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDd2pCLG1CQUFtQixDQUFDLFlBQVksRUFBRTVDLFlBQVksRUFBRTtnQkFDbEZLLElBQUksRUFBRTtjQUNSLENBQUMsQ0FBQztjQUNGL2tCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUN3akIsbUJBQW1CLENBQUMsTUFBTSxFQUFFNUMsWUFBWSxFQUFFO2dCQUM1RUssSUFBSSxFQUFFO2NBQ1IsQ0FBQyxDQUFDO2NBQ0Yva0IsTUFBTSxDQUFDNEQsR0FBRyxDQUFDMGpCLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFNUMsWUFBWSxDQUFDO2NBQ2hFMWtCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQzBqQixtQkFBbUIsQ0FBQyxVQUFVLEVBQUU1QyxZQUFZLEVBQUU7Z0JBQ3ZESyxJQUFJLEVBQUU7Y0FDUixDQUFDLENBQUM7Y0FFRmpmLFVBQVUsQ0FBQyxZQUFNO2dCQUNmNmQsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMzZixNQUFNLEVBQUU7Z0JBQ2hDaEUsTUFBTSxDQUFDc25CLG1CQUFtQixDQUFDLE9BQU8sRUFBRUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2dCQUMzRHJuQixNQUFNLENBQUNzbkIsbUJBQW1CLENBQUMsVUFBVSxFQUFFRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7Y0FDaEUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUNYLENBQUM7WUFFSzlDLFlBQVksR0FBRyxTQUFmQSxZQUFZLENBQUl2YixLQUFLLEVBQUV1YSxlQUFlLEVBQUs7Y0FDL0MsSUFBSXZqQixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ3VqQixNQUFNLEVBQUU7Y0FDaEMsSUFBTUssTUFBTSxHQUFHem5CLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDLGtCQUFrQixDQUFDO2NBQ3BFLElBQUl3YyxNQUFNLEVBQUVBLE1BQU0sQ0FBQ3hlLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNO2NBQzVDLElBQUksQ0FBQ2pKLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUVrWixXQUFXLENBQUNuYixLQUFLLEVBQUV1YSxlQUFlLEVBQUUsSUFBSSxDQUFDO2NBQ3ZHdmpCLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTztjQUVsRmpKLE1BQU0sQ0FBQ2lmLGdCQUFnQixDQUFDLE9BQU8sRUFBRXNJLGdCQUFnQixFQUFFLElBQUksQ0FBQztZQUMxRCxDQUFDO1lBRUtwRCxXQUFXLEdBQUcsU0FBZEEsV0FBVyxDQUFJbmIsS0FBSyxFQUFFdWEsZUFBZSxFQUFvQjtjQUFBLElBQWxCbUUsT0FBTyx1RUFBQyxLQUFLO2NBQ3hEO2NBQ0EsSUFBTUMsWUFBWSxHQUFHM25CLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDTyxhQUFhLENBQUMsS0FBSyxDQUFDO2NBQzdEO2NBQ0F1akIsWUFBWSxDQUFDNWpCLFNBQVMsQ0FBQ1EsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2NBQy9DLElBQUltakIsT0FBTyxFQUFFQyxZQUFZLENBQUM1akIsU0FBUyxDQUFDUSxHQUFHLENBQUMsbUJBQW1CLENBQUM7Y0FDNUQsSUFBSSxDQUFDbWpCLE9BQU8sRUFBRUMsWUFBWSxDQUFDdmQsRUFBRSxHQUFHLG1CQUFtQjs7Y0FFbkQ7Y0FDQSxJQUFNd2QsZ0JBQWdCLEdBQUc1bkIsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNPLGFBQWEsQ0FBQyxRQUFRLENBQUM7Y0FDcEUsSUFBTXlqQixxQkFBcUIsR0FBR0gsT0FBTyxHQUFHLGlDQUFpQyxHQUFHLHdCQUF3QjtjQUNwR0UsZ0JBQWdCLENBQUM3akIsU0FBUyxDQUFDUSxHQUFHLENBQUNzakIscUJBQXFCLENBQUM7Y0FDckRELGdCQUFnQixDQUFDbE4sU0FBUyxHQUFHLEdBQUc7Y0FDaEMsSUFBSWdOLE9BQU8sRUFBRTtnQkFDWEUsZ0JBQWdCLENBQUNFLE9BQU8sR0FBRyxZQUFNO2tCQUMvQm5FLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDNkQsSUFBSSxFQUFFO2tCQUM5QnhuQixNQUFNLENBQUNzbkIsbUJBQW1CLENBQUMsT0FBTyxFQUFFQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7Z0JBQzdELENBQUM7Y0FDSCxDQUFDLE1BQU07Z0JBQ0xLLGdCQUFnQixDQUFDRSxPQUFPLEdBQUcsWUFBTTtrQkFDL0JuRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQzNmLE1BQU0sRUFBRTtrQkFDaENoRSxNQUFNLENBQUNzbkIsbUJBQW1CLENBQUMsT0FBTyxFQUFFRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7Z0JBQzdELENBQUM7Y0FDSDtjQUVBLElBQUk5RCxlQUFlLEVBQUU7Z0JBQ25CLElBQU02QyxRQUFRLEdBQUczVyxLQUFLLENBQUNDLElBQUksQ0FBQzFQLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDK1csZ0JBQWdCLENBQUMySSxlQUFlLENBQUMsQ0FBQztnQkFDbEYsT0FBT3ZhLEtBQUssQ0FBQzdJLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSWltQixRQUFRLENBQUMzbUIsTUFBTSxHQUFHLENBQUMsRUFBRTtrQkFDM0R1SixLQUFLLEdBQUdBLEtBQUssQ0FBQzNKLE9BQU8sQ0FBQyxhQUFhLEVBQUUrbUIsUUFBUSxDQUFDekQsS0FBSyxFQUFFLENBQUNvRixHQUFHLENBQUM7Z0JBQzVEO2NBQ0Y7O2NBRUE7Y0FDQSxJQUFNQyxRQUFRLEdBQUdob0IsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNPLGFBQWEsQ0FBQyxVQUFVLENBQUM7Y0FDOUQ0akIsUUFBUSxDQUFDQyxTQUFTLEdBQUdqZixLQUFLLENBQUMzQixJQUFJLEVBQUU7Y0FDakMsSUFBTTZnQixLQUFLLEdBQUdGLFFBQVEsQ0FBQ0csT0FBTyxDQUFDQyxVQUFVO2NBQ3pDRixLQUFLLENBQUM1ZSxXQUFXLENBQUNzZSxnQkFBZ0IsQ0FBQztjQUNuQ0QsWUFBWSxDQUFDcmUsV0FBVyxDQUFDNGUsS0FBSyxDQUFDOztjQUUvQjtjQUNBdkUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMzZixNQUFNLEVBQUU7Y0FDaENoRSxNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQzJhLElBQUksQ0FBQ2xWLFdBQVcsQ0FBQ3FlLFlBQVksQ0FBQztZQUNwRCxDQUFDO1lBRUtsQyxTQUFTLEdBQUcsU0FBU0EsU0FBUyxDQUFDRixFQUFFLEVBQUVDLEVBQUUsRUFBRTtjQUMzQyxJQUFNNkMsRUFBRSxHQUFHOUMsRUFBRSxDQUFDK0MsVUFBVTtjQUN4QixJQUFNQyxFQUFFLEdBQUcvQyxFQUFFLENBQUM4QyxVQUFVO2NBQ3hCLElBQUlFLEVBQUU7Y0FDTixJQUFJQyxFQUFFO2NBRU4sSUFBSSxDQUFDSixFQUFFLElBQUksQ0FBQ0UsRUFBRSxJQUFJRixFQUFFLENBQUNLLFdBQVcsQ0FBQ2xELEVBQUUsQ0FBQyxJQUFJK0MsRUFBRSxDQUFDRyxXQUFXLENBQUNuRCxFQUFFLENBQUMsRUFBRTtjQUU1RCxLQUFLLElBQUk1YyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcwZixFQUFFLENBQUM5UixRQUFRLENBQUM5VyxNQUFNLEVBQUVrSixDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSTBmLEVBQUUsQ0FBQzlSLFFBQVEsQ0FBQzVOLENBQUMsQ0FBQyxDQUFDK2YsV0FBVyxDQUFDbkQsRUFBRSxDQUFDLEVBQUU7a0JBQ2xDaUQsRUFBRSxHQUFHN2YsQ0FBQztnQkFDUjtjQUNGO2NBQ0EsS0FBSyxJQUFJQSxHQUFDLEdBQUcsQ0FBQyxFQUFFQSxHQUFDLEdBQUc0ZixFQUFFLENBQUNoUyxRQUFRLENBQUM5VyxNQUFNLEVBQUVrSixHQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSTRmLEVBQUUsQ0FBQ2hTLFFBQVEsQ0FBQzVOLEdBQUMsQ0FBQyxDQUFDK2YsV0FBVyxDQUFDbEQsRUFBRSxDQUFDLEVBQUU7a0JBQ2xDaUQsRUFBRSxHQUFHOWYsR0FBQztnQkFDUjtjQUNGO2NBRUEsSUFBSTBmLEVBQUUsQ0FBQ0ssV0FBVyxDQUFDSCxFQUFFLENBQUMsSUFBSUMsRUFBRSxHQUFHQyxFQUFFLEVBQUU7Z0JBQ2pDQSxFQUFFLEVBQUU7Y0FDTjtjQUNBSixFQUFFLENBQUNNLFlBQVksQ0FBQ25ELEVBQUUsRUFBRTZDLEVBQUUsQ0FBQzlSLFFBQVEsQ0FBQ2lTLEVBQUUsQ0FBQyxDQUFDO2NBQ3BDRCxFQUFFLENBQUNJLFlBQVksQ0FBQ3BELEVBQUUsRUFBRWdELEVBQUUsQ0FBQ2hTLFFBQVEsQ0FBQ2tTLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFFS0csYUFBYSxHQUFHLFNBQWhCQSxhQUFhLEdBQVM7Y0FDMUIsT0FBTyxJQUFJcGIsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztnQkFDOUIsSUFBSSxDQUFDek4sTUFBTSxDQUFDNm9CLE1BQU0sRUFBRTtrQkFDbEJwbEIsTUFBTSxDQUFDUixHQUFHLENBQUMsNEJBQTRCLENBQUM7a0JBQ3hDLElBQU02bEIsY0FBYyxHQUFHdmdCLFdBQVcsQ0FBQyxZQUFNO29CQUN2QyxJQUFJdkksTUFBTSxDQUFDNm9CLE1BQU0sRUFBRTtzQkFDakJ4Z0IsYUFBYSxDQUFDeWdCLGNBQWMsQ0FBQztzQkFDN0JyYixPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNmO2tCQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7a0JBQ04zSCxVQUFVLDBFQUFDO29CQUFBO3NCQUFBO3dCQUFBOzBCQUFBOzRCQUNUdUMsYUFBYSxDQUFDeWdCLGNBQWMsQ0FBQzs0QkFDN0JyYixPQUFPLENBQUMsS0FBSyxDQUFDOzBCQUFDOzBCQUFBOzRCQUFBO3dCQUFBO3NCQUFBO29CQUFBO2tCQUFBLENBQ2hCLElBQUUsSUFBSSxDQUFDO2dCQUNWLENBQUMsTUFBTUEsT0FBTyxDQUFDLElBQUksQ0FBQztjQUN0QixDQUFDLENBQUM7WUFDSixDQUFDO1lBRUtzYixnQkFBZ0I7Y0FBQSx1RUFBRyxrQkFBT3BmLE9BQU87Z0JBQUE7Z0JBQUE7a0JBQUE7b0JBQUE7c0JBQUE7d0JBQUE7d0JBQUEsT0FDM0JpZixhQUFhLEVBQUU7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQUEsMERBQ0ZqZixPQUFPO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFqQkssTUFBTTt3QkFBQTt3QkFBQSxLQUVUQSxNQUFNLENBQUNnZixnQkFBZ0I7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQUEsMERBQ0hoZixNQUFNLENBQUNnZixnQkFBZ0I7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQWxDcGdCLE9BQU87d0JBQUE7d0JBQUEsT0FDS3lhLFdBQVcsQ0FBQ3JaLE1BQU0sRUFBRXBCLE9BQU8sQ0FBQztzQkFBQTt3QkFBM0NvRixPQUFNO3dCQUFBLE1BQ1JBLE9BQU0sS0FBSyxLQUFLOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGtDQUNYLEtBQUs7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUEsT0FJS3FWLFdBQVcsQ0FBQ3JaLE1BQU0sQ0FBQztzQkFBQTt3QkFBbENnRSxRQUFNO3dCQUFBLE1BQ1JBLFFBQU0sS0FBSyxLQUFLOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGtDQUNYLEtBQUs7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7d0JBSWhCdkssTUFBTSxDQUFDcUIsTUFBTSxpQ0FBMEI4RSxJQUFJLENBQUNFLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLHlCQUFlLGFBQUlqRixPQUFPLEVBQUc7d0JBQUMsTUFDckYsSUFBSUosS0FBSyxDQUFDLHVCQUF1QixDQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBLGtDQUdyQyxJQUFJO3NCQUFBO3dCQUVYbEIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDRCQUE0QixDQUFDO3dCQUFDLE1BQ3RDLElBQUlILEtBQUssQ0FBQyxXQUFXLENBQUM7c0JBQUE7c0JBQUE7d0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Y0FBQSxDQUUvQjtjQUFBLGdCQTNCS29rQixnQkFBZ0I7Z0JBQUE7Y0FBQTtZQUFBLEtBNkJ0QjtZQUFBO1lBQUEsT0FDcUJBLGdCQUFnQixDQUFDcGYsT0FBTyxDQUFDO1VBQUE7WUFBeENxRSxNQUFNO1lBQUEsa0NBQ0xBLE1BQU07VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNkO0VBQUE7QUFBQTtBQUNELHVEQUFlb1YsWUFBWTs7OztBQ3hpQmU7QUFDYTtBQUN4QjtBQUMvQixJQUFNM2YsNEJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHNCQUFzQixDQUFDO0FBRWpELElBQU15bUIsb0JBQW9CO0VBQUEsc0VBQUcsaUJBQU90ZCxTQUFTO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUMzQ2xJLDRCQUFNLENBQUNSLEdBQUcsQ0FBQywwQkFBMEIsRUFBRTBJLFNBQVMsQ0FBQztZQUMzQ3FkLGdCQUFnQixHQUFHLEVBQUU7WUFDcEJFLFNBQVMsR0FBNkR2ZCxTQUFTLENBQS9FdWQsU0FBUyxFQUFFQyxlQUFlLEdBQTRDeGQsU0FBUyxDQUFwRXdkLGVBQWUsRUFBRXZlLFFBQVEsR0FBa0NlLFNBQVMsQ0FBbkRmLFFBQVEsRUFBRUMsUUFBUSxHQUF3QmMsU0FBUyxDQUF6Q2QsUUFBUSxFQUFFeEgsSUFBSSxHQUFrQnNJLFNBQVMsQ0FBL0J0SSxJQUFJLEVBQUUyRixLQUFLLEdBQVcyQyxTQUFTLENBQXpCM0MsS0FBSyxFQUFFb2dCLEtBQUssR0FBSXpkLFNBQVMsQ0FBbEJ5ZCxLQUFLO1lBQ25FQyxpQkFBaUIsR0FBRzVaLEtBQUssQ0FBQ0MsSUFBSSxDQUFDMVAsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUMrVyxnQkFBZ0IsQ0FBQy9QLFFBQVEsQ0FBQyxDQUFDO1lBQUEsNkJBQzlEd2UsaUJBQWlCO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUE1QnpnQixPQUFPO1lBQUE7WUFBQSxPQUNOMGdCLHNCQUFzQixDQUFDMWdCLE9BQU8sRUFBRXZGLElBQUksRUFBRXVILFFBQVEsRUFBRXNlLFNBQVMsRUFBRUMsZUFBZSxFQUFFbmdCLEtBQUssRUFBRW9nQixLQUFLLENBQUM7VUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQ2pHSixnQkFBZ0IsQ0FBQ25SLElBQUksQ0FBQzhMLENBQUMsQ0FBQy9hLE9BQU8sQ0FBQyxDQUFDO1VBQUM7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBLGlDQUcvQm9nQixnQkFBZ0I7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUN4QjtFQUFBLGdCQVhLQyxvQkFBb0I7SUFBQTtFQUFBO0FBQUEsR0FXekI7QUFFRCxJQUFNSyxzQkFBc0I7RUFBQSx1RUFBRyxrQkFBTzFnQixPQUFPLEVBQUV2RixJQUFJLEVBQUV1SCxRQUFRLEVBQUVzZSxTQUFTLEVBQUVDLGVBQWUsRUFBRW5nQixLQUFLLEVBQUVvZ0IsS0FBSztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQSxlQUM3Ri9sQixJQUFJO1lBQUEsa0NBQ0wsbUJBQW1CLHdCQWtCbkIsVUFBVTtZQUFBO1VBQUE7WUFqQlBrbUIsVUFBVSxHQUFHM2dCLE9BQU8sQ0FBQ21TLFlBQVksQ0FBQ21PLFNBQVMsQ0FBQztZQUFBO1lBQUEsT0FDakNsRyxpQkFBaUIsRUFBRTtVQUFBO1lBQTlCcEMsRUFBRTtZQUFBO1lBQUEsT0FDa0JBLEVBQUUsQ0FBQzVULEdBQUcsQ0FBQ3VjLFVBQVUsQ0FBQztVQUFBO1lBQXRDaGtCLFdBQVc7WUFDWG1HLFlBQVksR0FBR25HLFdBQVcsYUFBWEEsV0FBVyx1QkFBWEEsV0FBVyxDQUFHcUYsUUFBUSxDQUFDLEVBQzVDO1lBQUEsTUFDSWMsWUFBWSxLQUFLLElBQUksSUFBSUEsWUFBWSxLQUFLRyxTQUFTO2NBQUE7Y0FBQTtZQUFBO1lBQ3JEcEksNEJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztZQUFDLGtDQUNoQyxLQUFLO1VBQUE7WUFBQSxJQUVUMkcsZ0JBQWdCLENBQUNDLFlBQVksRUFBRXlkLGVBQWUsRUFBRW5nQixLQUFLLENBQUM7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FBUyxLQUFLO1VBQUE7WUFBQSxLQUNyRW9nQixLQUFLO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUNXRSxzQkFBc0IsQ0FBQzFnQixPQUFPLEVBQUV3Z0IsS0FBSyxDQUFDL2xCLElBQUksRUFBRStsQixLQUFLLENBQUN4ZSxRQUFRLEVBQ3hFd2UsS0FBSyxDQUFDRixTQUFTLEVBQUVFLEtBQUssQ0FBQ0QsZUFBZSxFQUFFQyxLQUFLLENBQUNwZ0IsS0FBSyxFQUFFb2dCLEtBQUssQ0FBQ0EsS0FBSyxDQUFDO1VBQUE7WUFEL0Q5aUIsR0FBRztZQUFBLElBRUpBLEdBQUc7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FBUyxLQUFLO1VBQUE7WUFBQSxrQ0FFakIsSUFBSTtVQUFBO1lBQUE7WUFJSGtqQixFQUFFLEdBQUdqUSxRQUFRLENBQUMsSUFBSSxFQUFFM08sUUFBUSxDQUFDO1lBQUEsa0NBQzVCNGUsRUFBRSxDQUFDNWdCLE9BQU8sQ0FBQztVQUFBO1lBQUE7WUFBQTtZQUVsQm5GLDRCQUFNLENBQUNxQixNQUFNLENBQUMsMkNBQTJDLENBQUM7WUFBQyxrQ0FDcEQsS0FBSztVQUFBO1lBSVI0RyxhQUFZLEdBQUc5QyxPQUFPLENBQUNtUyxZQUFZLENBQUNtTyxTQUFTLENBQUM7WUFBQSxJQUMvQ3pkLGdCQUFnQixDQUFDQyxhQUFZLEVBQUV5ZCxlQUFlLEVBQUVuZ0IsS0FBSyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQVMsS0FBSztVQUFBO1lBQUEsS0FDckVvZ0IsS0FBSztjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDV0Usc0JBQXNCLENBQUMxZ0IsT0FBTyxFQUFFd2dCLEtBQUssQ0FBQy9sQixJQUFJLEVBQUUrbEIsS0FBSyxDQUFDeGUsUUFBUSxFQUN4RXdlLEtBQUssQ0FBQ0YsU0FBUyxFQUFFRSxLQUFLLENBQUNELGVBQWUsRUFBRUMsS0FBSyxDQUFDcGdCLEtBQUssRUFBRW9nQixLQUFLLENBQUNBLEtBQUssQ0FBQztVQUFBO1lBRC9EOWlCLElBQUc7WUFBQSxJQUVKQSxJQUFHO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQVMsS0FBSztVQUFBO1lBQUEsa0NBSXJCLElBQUk7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNaO0VBQUEsZ0JBeENLZ2pCLHNCQUFzQjtJQUFBO0VBQUE7QUFBQSxHQXdDM0I7QUFFRCwwREFBZUwsb0JBQW9COztBQzVEbkM7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixNQUFnQztBQUNuRCw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxpQkFBaUI7QUFDckU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE9BQU87QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixNQUFnQztBQUNuRCw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixNQUFnQztBQUNqRCw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELE9BQU87QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0RBQWtELE9BQU87QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFOEY7Ozs7Ozs7Ozs7Ozs7QUNuTy9EO0FBQ3dCO0FBQ3dCO0FBTW5EO0FBS047QUFLSjtBQUNnQjtBQUVsQyxJQUFNeGxCLHNCQUFNLEdBQUcsSUFBSWpCLFVBQU0sQ0FBQyxtQkFBbUIsQ0FBQztBQUM5QyxJQUFNa25CLGVBQWUsR0FBRztFQUFDbFAsT0FBTyxFQUFFLElBQUk7RUFBRUMsU0FBUyxFQUFFLElBQUk7RUFBRWtQLFVBQVUsRUFBRTtBQUFJLENBQUM7QUFBQyxJQUV0REMsV0FBVztFQUM5QixxQkFBWXBMLElBQUksRUFBRTtJQUFBO0lBQ2hCLElBQU9xTCx1QkFBdUIsR0FBdUVyTCxJQUFJLENBQWxHcUwsdUJBQXVCO01BQUVuZ0IsU0FBUyxHQUE0RDhVLElBQUksQ0FBekU5VSxTQUFTO01BQUVvZ0IsaUJBQWlCLEdBQXlDdEwsSUFBSSxDQUE5RHNMLGlCQUFpQjtNQUFFeGlCLFVBQVUsR0FBNkJrWCxJQUFJLENBQTNDbFgsVUFBVTtNQUFFMk0sUUFBUSxHQUFtQnVLLElBQUksQ0FBL0J2SyxRQUFRO01BQUU4VixJQUFJLEdBQWF2TCxJQUFJLENBQXJCdUwsSUFBSTtNQUFFQyxPQUFPLEdBQUl4TCxJQUFJLENBQWZ3TCxPQUFPO0lBQ2pHLElBQUksQ0FBQ0QsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCLElBQUksQ0FBQ0MsT0FBTyxHQUFHQSxPQUFPO0lBQ3RCLElBQUksQ0FBQ0MsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUN4QixJQUFJLENBQUNoVyxRQUFRLEdBQUdBLFFBQVE7SUFDeEIsSUFBSSxDQUFDdkssU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ3BDLFVBQVUsR0FBR0EsVUFBVTtJQUM1QixJQUFJLENBQUM0aUIsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQ0Msb0JBQW9CLEdBQUcsRUFBRTtJQUM5QixJQUFJLENBQUNMLGlCQUFpQixHQUFHQSxpQkFBaUI7SUFDMUMsSUFBSSxDQUFDRCx1QkFBdUIsR0FBR0EsdUJBQXVCO0lBQ3RELElBQUksQ0FBQzdZLFFBQVEsR0FBR2hSLE1BQU0sQ0FBQzZqQixVQUFVLENBQUM5aUIsa0JBQWtCLENBQUMsQ0FBQytpQixPQUFPO0VBQy9EO0VBQUM7SUFBQTtJQUFBO01BQUEsK0VBRUQ7UUFBQTtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQ1FzRyxhQUFhLEdBQUcsRUFBRTtnQkFBQSxzREFDQSxJQUFJLENBQUNOLGlCQUFpQjtnQkFBQTtnQkFBQTtrQkFBQSxJQUFuQ08sU0FBUztrQkFDbEIsSUFBSTtvQkFDRixJQUFJQSxTQUFTLENBQUN6UixzQkFBc0IsRUFBRTtvQkFDdEMsSUFBSXlSLFNBQVMsQ0FBQ3pjLEtBQUssRUFBRTtzQkFDbkI5SCxVQUFVLENBQUMsWUFBTTt3QkFDZixLQUFJLENBQUN3a0IsV0FBVyxDQUFDRCxTQUFTLENBQUM7c0JBQzdCLENBQUMsRUFBRUEsU0FBUyxDQUFDemMsS0FBSyxDQUFDO3NCQUNuQjtvQkFDRjtvQkFDQXdjLGFBQWEsQ0FBQ3ZTLElBQUksQ0FBQyxLQUFJLENBQUN5UyxXQUFXLENBQUNELFNBQVMsQ0FBQyxDQUFDO2tCQUNqRCxDQUFDLENBQUMsT0FBTzFkLEdBQUcsRUFBRTtvQkFDWmxKLHNCQUFNLENBQUNxQixNQUFNLGdDQUF5QnVsQixTQUFTLENBQUNqZ0IsRUFBRSxlQUFLdUMsR0FBRyxDQUFDNUgsT0FBTyxJQUFJNEgsR0FBRyxFQUFHO2tCQUM5RTtnQkFBQztnQkFBQTtjQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUVHYSxPQUFPLENBQUM2USxHQUFHLENBQUMrTCxhQUFhLENBQUM7Y0FBQTtnQkFDaEMsSUFBSSxDQUFDRyx1QkFBdUIsRUFBRTtjQUFDO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNoQztNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSw4RUFFRCxrQkFBa0JGLFNBQVM7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUV2QmpnQixFQUFFLEdBUUFpZ0IsU0FBUyxDQVJYamdCLEVBQUUsRUFDRlQsT0FBTyxHQU9MMGdCLFNBQVMsQ0FQWDFnQixPQUFPLEVBQ1A2Z0Isa0JBQWtCLEdBTWhCSCxTQUFTLENBTlhHLGtCQUFrQixFQUNsQkMsTUFBTSxHQUtKSixTQUFTLENBTFhJLE1BQU0sRUFDTkMsZUFBZSxHQUliTCxTQUFTLENBSlhLLGVBQWUsRUFDZkMsT0FBTyxHQUdMTixTQUFTLENBSFhNLE9BQU8sRUFDUC9SLHNCQUFzQixHQUVwQnlSLFNBQVMsQ0FGWHpSLHNCQUFzQixFQUN0QmdTLElBQUksR0FDRlAsU0FBUyxDQURYTyxJQUFJO2dCQUdKbGhCLFNBQVMsR0FPUCxJQUFJLENBUE5BLFNBQVMsRUFDVG1nQix1QkFBdUIsR0FNckIsSUFBSSxDQU5OQSx1QkFBdUIsRUFDdkJJLGNBQWMsR0FLWixJQUFJLENBTE5BLGNBQWMsRUFDZDNpQixVQUFVLEdBSVIsSUFBSSxDQUpOQSxVQUFVLEVBQ1YwSixRQUFRLEdBR04sSUFBSSxDQUhOQSxRQUFRLEVBQ1I4WSxpQkFBaUIsR0FFZixJQUFJLENBRk5BLGlCQUFpQixFQUNqQmUsS0FBSyxHQUNILElBQUksQ0FETkEsS0FBSyxFQUdQO2dCQUNBWixjQUFjLENBQUM3ZixFQUFFLENBQUMsR0FBRzZmLGNBQWMsQ0FBQzdmLEVBQUUsQ0FBQyxJQUFJLElBQUlxZixLQUFLLEVBQUU7Z0JBQUM7Z0JBQUEsT0FDakNRLGNBQWMsQ0FBQzdmLEVBQUUsQ0FBQyxDQUFDMGdCLE9BQU8sRUFBRTtjQUFBO2dCQUE1Q0MsT0FBTztnQkFBQTtnQkFBQSxNQUVQcmhCLFNBQVMsSUFBSW1nQix1QkFBdUIsSUFBSSxDQUFDQSx1QkFBdUIsQ0FBQzFwQixRQUFRLENBQUNpSyxFQUFFLENBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQSxNQUc3RXFnQixNQUFNLEtBQUssUUFBUSxJQUFJLENBQUN6WixRQUFRO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNsQ3ZOLHNCQUFNLENBQUNxQixNQUFNLENBQUMsb0NBQW9DLENBQUM7Z0JBQUM7Y0FBQTtnQkFBQSxNQUdsRDJsQixNQUFNLEtBQUssU0FBUyxJQUFJelosUUFBUTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDbEN2TixzQkFBTSxDQUFDcUIsTUFBTSxDQUFDLHFDQUFxQyxDQUFDO2dCQUFDO2NBQUE7Z0JBSXZEckIsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDhDQUE4QyxHQUFHbUgsRUFBRSxDQUFDO2dCQUFDLGVBQzVELENBQUNvZ0Isa0JBQWtCO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQVUsSUFBSSxDQUFDUSx1QkFBdUIsQ0FBQ1Isa0JBQWtCLENBQUM7Y0FBQTtnQkFBQTtjQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUMzRS9nQixjQUFjLEdBQUcsSUFBSTtnQkFDbkJ3aEIsZ0JBQWdCLEdBQUd6akIsWUFBWSxDQUFDNEMsRUFBRSxHQUFHOUMsVUFBVSxDQUFDO2dCQUFBLEtBQ2xEb2pCLGVBQWU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ2pCam5CLHNCQUFNLENBQUNSLEdBQUcsQ0FBQyxxREFBcUQsR0FBR21ILEVBQUUsQ0FBQztnQkFBQztnQkFBQSxPQUNoRCxJQUFJLENBQUM4Z0Isa0JBQWtCLENBQUNSLGVBQWUsQ0FBQztjQUFBO2dCQUEvRGpoQixjQUFjO2dCQUNkLElBQUlBLGNBQWMsS0FBSyxJQUFJLEVBQUU7a0JBQzNCaEcsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLGlEQUFpRCxFQUFFd0csY0FBYyxDQUFDO2dCQUMvRSxDQUFDLE1BQU1oRyxzQkFBTSxDQUFDUixHQUFHLENBQUMsd0NBQXdDLENBQUM7Y0FBQztnQkFBQTtnQkFBQSxPQUVyQnNHLGNBQWMsQ0FBQ2pDLFVBQVUsRUFBRXFDLE9BQU8sRUFBRUYsY0FBYyxFQUFFQyxTQUFTLENBQUM7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBaEd5aEIsZUFBZTtnQkFBRXBoQixPQUFPO2dCQUUzQnFoQixVQUFVLEdBQUcsSUFBSTtnQkFBQSx1REFDQUQsZUFBZTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUF6Qm5oQixNQUFNO2dCQUFBLElBQ1ZBLE1BQU0sQ0FBQzJCLFNBQVM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNVc2QscUJBQW9CLENBQUNqZixNQUFNLENBQUMyQixTQUFTLENBQUM7Y0FBQTtnQkFBL0RxZCxnQkFBZ0I7Z0JBQUEsS0FDbEJBLGdCQUFnQixDQUFDdnBCLE1BQU07a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ3pCdUssTUFBTSxDQUFDZ2YsZ0JBQWdCLEdBQUdBLGdCQUFnQjtnQkFDMUNvQyxVQUFVLEdBQUcsSUFBSTtnQkFBQztjQUFBO2dCQUdwQkEsVUFBVSxHQUFHQSxVQUFVLElBQUksS0FBSztjQUFDO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUEsTUFFL0JBLFVBQVUsS0FBSyxLQUFLO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQ3hCelMsWUFBWSxDQUFDdk8sRUFBRSxFQUFFWCxjQUFjLEVBQUVNLE9BQU8sRUFBRSxVQUFVLEVBQUU2TyxzQkFBc0IsQ0FBQztnQkFBQztnQkFBQSxPQUN0RHFTLGdCQUFnQjtjQUFBO2dCQUFsQzFnQixTQUFTO2dCQUNUOGdCLFNBQVMsR0FBR1QsSUFBSSxLQUFLLEtBQUssR0FBR3pwQixjQUFjLEdBQUdELGdCQUFnQjtnQkFBQSxNQUNoRSxDQUFDd0ksU0FBUyxHQUFHLENBQUMsS0FDZixDQUFDLElBQUksQ0FBQ3FnQixJQUFJLElBQ1ZhLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDWixPQUFRLElBQy9CWSxJQUFJLEtBQUssVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDWixPQUFRLElBQ3JDemYsU0FBUyxHQUFHOGdCLFNBQVUsQ0FBQztrQkFBQTtrQkFBQTtnQkFBQTtnQkFDeEIxUyxZQUFZLENBQUN2TyxFQUFFLEVBQUVYLGNBQWMsRUFBRU0sT0FBTyxFQUFFLFNBQVMsRUFBRTZPLHNCQUFzQixDQUFDO2dCQUFDO2NBQUE7Z0JBQUE7Z0JBQUEsT0FHekVpUyxLQUFLLENBQUN6Z0IsRUFBRSxFQUFFK2dCLGVBQWUsRUFBRTFoQixjQUFjLEVBQUVNLE9BQU8sRUFBRTZPLHNCQUFzQixDQUFDO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDM0UsSUFBSSxDQUFDMFMsYUFBYSxDQUFDWCxPQUFPLEVBQUViLGlCQUFpQixDQUFDO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFFcERybUIsc0JBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRXNGLEVBQUUsQ0FBQztjQUFDO2dCQUFBO2dCQUd4RDJnQixPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDUSxlQUFlLENBQUNsQixTQUFTLENBQUM7Z0JBQy9CLElBQUksQ0FBQ21CLHVCQUF1QixDQUFDbkIsU0FBUyxDQUFDO2dCQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRTNDO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLGdGQUVELGtCQUFvQk0sT0FBTyxFQUFFYixpQkFBaUI7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLE1BQ3hDcmEsS0FBSyxDQUFDdUksT0FBTyxDQUFDMlMsT0FBTyxDQUFDLElBQUlBLE9BQU8sQ0FBQ2xyQixNQUFNO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNwQ2dzQixtQkFBbUIsR0FBRyxFQUFFO2dCQUFBLHVEQUNOM0IsaUJBQWlCO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQTlCTyxTQUFTO2dCQUFBLElBQ2JNLE9BQU8sQ0FBQ3hxQixRQUFRLENBQUNrcUIsU0FBUyxDQUFDamdCLEVBQUUsQ0FBQztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUNuQ3FoQixtQkFBbUIsQ0FBQzVULElBQUksQ0FBQyxJQUFJLENBQUN5UyxXQUFXLENBQUNELFNBQVMsQ0FBQyxDQUFDO2NBQUM7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUVsRDdjLE9BQU8sQ0FBQzZRLEdBQUcsQ0FBQ29OLG1CQUFtQixDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRXpDO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHdFQUVELGtCQUFZcmhCLEVBQUUsRUFBRStnQixlQUFlLEVBQUUxaEIsY0FBYyxFQUFFTSxPQUFPLEVBQUU2TyxzQkFBc0I7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUM5RW5WLHNCQUFNLENBQUNSLEdBQUcsK0NBQXdDbUgsRUFBRSxFQUFHO2dCQUNqRHNoQixLQUFLLEdBQUcvZ0Isb0JBQW9CLENBQUN3Z0IsZUFBZSxDQUFDO2dCQUFBLElBQzlDTyxLQUFLO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQ2N6VCxzQkFBc0IsQ0FBQyxHQUFHLENBQUM7Y0FBQTtnQkFBM0MwVCxPQUFPO2dCQUFBLE1BQ1RBLE9BQU8sSUFBSUEsT0FBTyxDQUFDdmhCLEVBQUUsQ0FBQztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUMxQjNHLHNCQUFNLENBQUNSLEdBQUcsa0RBQTJDbUgsRUFBRSxFQUFHO2dCQUMxRHVPLFlBQVksQ0FBQ3ZPLEVBQUUsRUFBRVgsY0FBYyxFQUFFTSxPQUFPLEVBQUUsUUFBUSxFQUFFNk8sc0JBQXNCLENBQUM7Z0JBQUM7Y0FBQTtnQkFBQTtnQkFBQSxPQUc1RHdLLGtCQUFZLENBQUMrSCxlQUFlLENBQUM7Y0FBQTtnQkFBekM3a0IsR0FBRztnQkFBQSxNQUNMQSxHQUFHLEtBQUssSUFBSTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUNPMlIsc0JBQXNCLENBQUMsR0FBRyxDQUFDO2NBQUE7Z0JBQTFDblQsTUFBTTtnQkFDWixJQUFJQSxNQUFNLENBQUNzRixFQUFFLENBQUMsRUFBRTtrQkFDZCxPQUFPdEYsTUFBTSxDQUFDc0YsRUFBRSxDQUFDO2tCQUNqQjVHLG9CQUFvQixDQUFDLEdBQUcsRUFBRXNCLE1BQU0sQ0FBQztnQkFDbkM7Z0JBQ0E2VCxZQUFZLENBQUN2TyxFQUFFLEVBQUVYLGNBQWMsRUFBRU0sT0FBTyxFQUFFLFNBQVMsRUFBRTZPLHNCQUFzQixDQUFDO2dCQUFDO2dCQUFBO2NBQUE7Z0JBQUEsTUFDcEV0UyxHQUFHLEtBQUssS0FBSztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUNBMlIsc0JBQXNCLENBQUMsR0FBRyxDQUFDO2NBQUE7Z0JBQTNDMFQsUUFBTztnQkFBQSxLQUNUQSxRQUFPLENBQUN2aEIsRUFBRSxDQUFDO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQ2Z1TyxZQUFZLENBQUN2TyxFQUFFLEVBQUVYLGNBQWMsRUFBRU0sT0FBTyxFQUFFLFFBQVEsRUFBRTZPLHNCQUFzQixDQUFDO2NBQUM7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRS9FO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQSxPQUVELHlCQUFnQnlSLFNBQVMsRUFBRTtNQUN6QixJQUFPcFcsUUFBUSxHQUEwQixJQUFJLENBQXRDQSxRQUFRO1FBQUVpVyxvQkFBb0IsR0FBSSxJQUFJLENBQTVCQSxvQkFBb0I7TUFDckMsSUFBTzlmLEVBQUUsR0FBNENpZ0IsU0FBUyxDQUF2RGpnQixFQUFFO1FBQUV3aEIsYUFBYSxHQUE2QnZCLFNBQVMsQ0FBbkR1QixhQUFhO1FBQUVDLHVCQUF1QixHQUFJeEIsU0FBUyxDQUFwQ3dCLHVCQUF1QjtNQUNqRCxJQUFJRCxhQUFhLEVBQUU7UUFDakIsSUFBSSxDQUFDQyx1QkFBdUIsSUFBSUEsdUJBQXVCLEtBQUs1WCxRQUFRLEVBQUU7VUFDcEUsSUFBSTZYLG1CQUFtQixHQUFHRixhQUFhO1VBQ3ZDLElBQUksQ0FBQ25jLEtBQUssQ0FBQ3VJLE9BQU8sQ0FBQzRULGFBQWEsQ0FBQyxFQUFFRSxtQkFBbUIsR0FBRyxDQUFDRixhQUFhLENBQUM7VUFDeEVub0Isc0JBQU0sQ0FBQ1IsR0FBRywwQkFBbUIyb0IsYUFBYSxvQ0FBMEJ4aEIsRUFBRSxFQUFHO1VBQUMsMkRBQy9DMGhCLG1CQUFtQjtZQUFBO1VBQUE7WUFBOUMsdURBQWdEO2NBQUEsSUFBckNDLFlBQVk7Y0FDckIsSUFBTUMsYUFBYSxHQUFHOUIsb0JBQW9CLENBQUM2QixZQUFZLENBQUMsR0FDdEQ3QixvQkFBb0IsQ0FBQzZCLFlBQVksQ0FBQyxHQUFHLEVBQUU7Y0FDekMsSUFBSUMsYUFBYSxDQUFDN3JCLFFBQVEsQ0FBQ2lLLEVBQUUsQ0FBQyxFQUFFO2dCQUM5QjNHLHNCQUFNLENBQUNSLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQztjQUN6RCxDQUFDLE1BQU1pbkIsb0JBQW9CLENBQUM2QixZQUFZLENBQUMsZ0NBQU9DLGFBQWEsSUFBRTVoQixFQUFFLEVBQUM7WUFDcEU7VUFBQztZQUFBO1VBQUE7WUFBQTtVQUFBO1FBQ0g7TUFDRjtJQUNGO0VBQUM7SUFBQTtJQUFBLE9BRUQsbUNBQTBCO01BQUE7TUFDeEIsSUFBTzhmLG9CQUFvQixHQUF1QixJQUFJLENBQS9DQSxvQkFBb0I7UUFBRUosaUJBQWlCLEdBQUksSUFBSSxDQUF6QkEsaUJBQWlCO01BQVM7UUFDbEQsSUFBTS9nQixHQUFHO1FBQ1osSUFBTWtqQixZQUFZLEdBQUcvQixvQkFBb0IsQ0FBQ25oQixHQUFHLENBQUM7UUFDOUMsSUFBTW1qQixpQkFBaUIsR0FBR3BDLGlCQUFpQixDQUFDblUsTUFBTSxDQUFDLFVBQUN3VyxDQUFDO1VBQUEsT0FBS0YsWUFBWSxDQUFDOXJCLFFBQVEsQ0FBQ2dzQixDQUFDLENBQUMvaEIsRUFBRSxDQUFDO1FBQUEsRUFBQztRQUN0RixRQUFRckIsR0FBRztVQUNULEtBQUssaUJBQWlCO1lBQUU7Y0FDdEIsSUFBTW9SLFFBQVEsR0FBRyxJQUFJaVMsY0FBYyxDQUFDLFlBQU07Z0JBQUEsMkRBQ2hCRixpQkFBaUI7a0JBQUE7Z0JBQUE7a0JBQXpDLHVEQUEyQztvQkFBQSxJQUFoQzdCLFNBQVM7b0JBQ2xCNW1CLHNCQUFNLENBQUNSLEdBQUcsOEJBQXVCb25CLFNBQVMsQ0FBQ2pnQixFQUFFLDJCQUF3QjtvQkFDckUsTUFBSSxDQUFDa2dCLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDO2tCQUM3QjtnQkFBQztrQkFBQTtnQkFBQTtrQkFBQTtnQkFBQTtjQUNILENBQUMsQ0FBQztjQUNGbFEsUUFBUSxDQUFDSSxPQUFPLENBQUN2YSxNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDO1lBQ3ZEO1lBQ0U7VUFDRixLQUFLLFNBQVM7WUFBRTtjQUNkZ0MsVUFBVSxDQUFDLFlBQU07Z0JBQUEsMkRBQ1NvbUIsaUJBQWlCO2tCQUFBO2dCQUFBO2tCQUF6Qyx1REFBMkM7b0JBQUEsSUFBaEM3QixTQUFTO29CQUNsQjVtQixzQkFBTSxDQUFDUixHQUFHLDhCQUF1Qm9uQixTQUFTLENBQUNqZ0IsRUFBRSxtQkFBZ0I7b0JBQzdELE1BQUksQ0FBQ2tnQixXQUFXLENBQUNELFNBQVMsQ0FBQztrQkFDN0I7Z0JBQUM7a0JBQUE7Z0JBQUE7a0JBQUE7Z0JBQUE7Y0FDSCxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ1Q7WUFDRTtVQUNGLEtBQUssZ0JBQWdCO1lBQUU7Y0FBQSwyREFDRzZCLGlCQUFpQjtnQkFBQTtjQUFBO2dCQUFBO2tCQUFBLElBQTlCN0IsU0FBUztrQkFDbEIsSUFBTWdDLG1CQUFtQixHQUFHNWMsS0FBSyxDQUFDdUksT0FBTyxDQUFDcVMsU0FBUyxDQUFDaUMsZ0JBQWdCLENBQUMsR0FDakVqQyxTQUFTLENBQUNpQyxnQkFBZ0IsR0FBRyxDQUFDakMsU0FBUyxDQUFDaUMsZ0JBQWdCLENBQUM7a0JBQUMsMkRBQ3ZDRCxtQkFBbUI7b0JBQUE7a0JBQUE7b0JBQTFDLHVEQUE0QztzQkFBQSxJQUFqQ3hoQixRQUFRO3NCQUNqQixJQUFNakMsT0FBTyxHQUFHNUksTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNvSCxhQUFhLENBQUNKLFFBQVEsQ0FBQztzQkFDM0QsSUFBSWpDLE9BQU8sRUFBRTt3QkFDWCxJQUFNdVIsU0FBUSxHQUFHLElBQUlDLGdCQUFnQixDQUFDLFlBQU07MEJBQzFDM1csc0JBQU0sQ0FBQ1IsR0FBRyw4QkFBdUJvbkIsU0FBUyxDQUFDamdCLEVBQUUsMEJBQXVCOzBCQUNwRSxNQUFJLENBQUNrZ0IsV0FBVyxDQUFDRCxTQUFTLENBQUM7d0JBQzdCLENBQUMsQ0FBQzt3QkFDRmxRLFNBQVEsQ0FBQ0ksT0FBTyxDQUFDM1IsT0FBTyxFQUFFOGdCLGVBQWUsQ0FBQztzQkFDNUM7b0JBQ0Y7a0JBQUM7b0JBQUE7a0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Z0JBWkgsdURBQTJDO2tCQUFBO2dCQWEzQztjQUFDO2dCQUFBO2NBQUE7Z0JBQUE7Y0FBQTtZQUNIO1lBQ0U7VUFDRixLQUFLLFdBQVc7WUFBRTtjQUNoQjtjQUNBLElBQUl0aEIsYUFBYSxHQUFHLENBQUM7Y0FDckIsSUFBSW1rQixjQUFjLEdBQUcsQ0FBQztjQUN0QnZzQixNQUFNLENBQUNpZixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBTTtnQkFDdEMsSUFBTXhYLEdBQUcsR0FBRyxJQUFJaEgsSUFBSSxFQUFFLENBQUMrckIsT0FBTyxFQUFFO2dCQUNoQyxJQUFNQyxFQUFFLEdBQUd6c0IsTUFBTSxDQUFDMHNCLFdBQVcsSUFBSTFzQixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDcUUsU0FBUztnQkFDOUUsSUFBSVYsR0FBRyxHQUFHOGtCLGNBQWMsR0FBRyxHQUFHLElBQUk5aEIsSUFBSSxDQUFDMEMsR0FBRyxDQUFDL0UsYUFBYSxHQUFHcWtCLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtrQkFDbEVya0IsYUFBYSxHQUFHcWtCLEVBQUU7a0JBQ2xCRixjQUFjLEdBQUc5a0IsR0FBRztrQkFBQywyREFDR3lrQixpQkFBaUI7b0JBQUE7a0JBQUE7b0JBQXpDLHVEQUEyQztzQkFBQSxJQUFoQzdCLFNBQVM7c0JBQ2xCNW1CLHNCQUFNLENBQUNSLEdBQUcsOEJBQXVCb25CLFNBQVMsQ0FBQ2pnQixFQUFFLHFCQUFrQjtzQkFDL0QsTUFBSSxDQUFDa2dCLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDO29CQUM3QjtrQkFBQztvQkFBQTtrQkFBQTtvQkFBQTtrQkFBQTtnQkFDSDtjQUNGLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDWDtZQUNFO1VBQ0YsS0FBSyxxQkFBcUI7WUFBRTtjQUMxQixJQUFJaGUsV0FBVyxHQUFHck0sTUFBTSxDQUFDQyxRQUFRLENBQUNxTSxNQUFNO2NBQ3hDLElBQU02TixVQUFRLEdBQUcsSUFBSUMsZ0JBQWdCLENBQUMsWUFBTTtnQkFDMUMsSUFBSXBhLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDcU0sTUFBTSxLQUFLRCxXQUFXLEVBQUU7a0JBQzFDQSxXQUFXLEdBQUdyTSxNQUFNLENBQUNDLFFBQVEsQ0FBQ3FNLE1BQU07a0JBQUMsNERBQ2I0ZixpQkFBaUI7b0JBQUE7a0JBQUE7b0JBQXpDLDBEQUEyQztzQkFBQSxJQUFoQzdCLFNBQVM7c0JBQ2xCNW1CLHNCQUFNLENBQUNSLEdBQUcsOEJBQXVCb25CLFNBQVMsQ0FBQ2pnQixFQUFFLCtCQUE0QjtzQkFDekUsTUFBSSxDQUFDa2dCLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDO29CQUM3QjtrQkFBQztvQkFBQTtrQkFBQTtvQkFBQTtrQkFBQTtnQkFDSDtjQUNGLENBQUMsQ0FBQztjQUNGbFEsVUFBUSxDQUFDSSxPQUFPLENBQUMxVyxRQUFRLEVBQUU2bEIsZUFBZSxDQUFDO1lBQzdDO1lBQ0U7VUFDRixLQUFLLFVBQVU7WUFBQSw0REFDV3dDLGlCQUFpQjtjQUFBO1lBQUE7Y0FBQTtnQkFBQSxJQUE5QjdCLFNBQVM7Z0JBQ2xCLElBQU1zQyxlQUFlLEdBQUdwa0IsV0FBVywwRUFBQztrQkFBQTtrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTswQkFBQTswQkFBQSxPQUNaMFAsc0JBQXNCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzt3QkFBQTswQkFBakQwVCxPQUFPOzBCQUFBLE1BQ1RBLE9BQU8sYUFBUEEsT0FBTyxlQUFQQSxPQUFPLENBQUd0QixTQUFTLENBQUNqZ0IsRUFBRSxDQUFDOzRCQUFBOzRCQUFBOzBCQUFBOzBCQUN6Qi9CLGFBQWEsQ0FBQ3NrQixlQUFlLENBQUM7MEJBQUM7MEJBQUE7d0JBQUE7MEJBRS9CbHBCLHNCQUFNLENBQUNSLEdBQUcsOEJBQXVCb25CLFNBQVMsQ0FBQ2pnQixFQUFFLG9CQUFpQjswQkFBQzswQkFBQSxPQUN6RCxNQUFJLENBQUNrZ0IsV0FBVyxDQUFDRCxTQUFTLENBQUM7d0JBQUE7d0JBQUE7MEJBQUE7c0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUEsQ0FFcEMsSUFBRSxFQUFFLENBQUM7Z0JBQ052a0IsVUFBVSxDQUFDLFlBQU07a0JBQ2Z1QyxhQUFhLENBQUNza0IsZUFBZSxDQUFDO2dCQUNoQyxDQUFDLEVBQUUsSUFBSSxDQUFDO2NBQUM7Y0FaWCwwREFBMkM7Z0JBQUE7Y0FhM0M7WUFBQztjQUFBO1lBQUE7Y0FBQTtZQUFBO1lBQ0Q7VUFDRixLQUFLLG1CQUFtQjtZQUFBLDREQUNFVCxpQkFBaUI7Y0FBQTtZQUFBO2NBQXpDLDBEQUEyQztnQkFBQSxJQUFoQzdCLFNBQVM7Z0JBQ2xCLElBQU11QyxvQkFBb0IsR0FBRyxNQUFJLENBQUN0QyxXQUFXLENBQUN1QyxJQUFJLENBQUMsTUFBSSxFQUFFeEMsU0FBUyxDQUFDO2dCQUNuRTFTLGVBQWUsQ0FBQzBTLFNBQVMsQ0FBQ2lDLGdCQUFnQixFQUFFTSxvQkFBb0IsQ0FBQztjQUNuRTtZQUFDO2NBQUE7WUFBQTtjQUFBO1lBQUE7WUFDRDtVQUNGLEtBQUssV0FBVztZQUFFO2NBQ2hCL29CLFFBQVEsQ0FBQ29iLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFVBQUN3RixLQUFLLEVBQUs7Z0JBQUEsNERBQy9CeUgsaUJBQWlCO2tCQUFBO2dCQUFBO2tCQUF6QywwREFBMkM7b0JBQUEsSUFBaEM3QixVQUFTO29CQUNsQjVtQixzQkFBTSxDQUFDUixHQUFHLDhCQUF1Qm9uQixVQUFTLENBQUNqZ0IsRUFBRSxxQkFBa0I7b0JBQy9ELE1BQUksQ0FBQ2tnQixXQUFXLENBQUNELFVBQVMsQ0FBQztrQkFDN0I7Z0JBQUM7a0JBQUE7Z0JBQUE7a0JBQUE7Z0JBQUE7Y0FDSCxDQUFDLENBQUM7Y0FDRjtZQUNGO1VBQ0E7WUFDRTVtQixzQkFBTSxDQUFDcUIsTUFBTSxDQUFDLDJCQUEyQixFQUFFaUUsR0FBRyxDQUFDO1lBQy9DO1FBQU07TUFDVDtNQTFHSCxnQ0FBa0JGLE1BQU0sQ0FBQ3dCLElBQUksQ0FBQzZmLG9CQUFvQixDQUFDLGtDQUFFO1FBQUE7TUEyR3JEO0lBQ0Y7RUFBQztJQUFBO0lBQUE7TUFBQSwwRkFFRCxrQkFBOEJHLFNBQVM7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLHdCQUN1QkEsU0FBUyxDQUE5REcsa0JBQWtCLEVBQWxCQSxrQkFBa0Isc0NBQUcsRUFBRSxrREFBOEJILFNBQVMsQ0FBckNLLGVBQWUsRUFBZkEsZUFBZSxzQ0FBRyxFQUFFLDBCQUFFdGdCLEVBQUUsR0FBSWlnQixTQUFTLENBQWZqZ0IsRUFBRTtnQkFBQSxLQUNwRCxJQUFJLENBQUMrZixvQkFBb0IsQ0FBQ2hxQixRQUFRLENBQUNpSyxFQUFFLENBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFDcEMwaUIsU0FBUyxHQUFHLElBQUksQ0FBQ0MsNEJBQTRCLDhCQUFLdkMsa0JBQWtCLHNCQUFLRSxlQUFlLEdBQUU7Z0JBQzFGa0Msb0JBQW9CLEdBQUcsSUFBSSxDQUFDdEMsV0FBVyxDQUFDdUMsSUFBSSxDQUFDLElBQUksRUFBRXhDLFNBQVMsQ0FBQztnQkFBQSx3REFDNUN5QyxTQUFTO2dCQUFBO2tCQUFoQywwREFBa0M7b0JBQXZCamlCLFFBQVE7b0JBQ2pCOE0sZUFBZSxvQkFBYTlNLFFBQVEsR0FBSStoQixvQkFBb0IsQ0FBQztrQkFDL0Q7Z0JBQUM7a0JBQUE7Z0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ0QsSUFBSSxDQUFDekMsb0JBQW9CLENBQUN0UyxJQUFJLENBQUN6TixFQUFFLENBQUM7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDcEM7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBLE9BRUQsc0NBQTZCNGlCLE9BQU8sRUFBNEI7TUFBQSxJQUExQkMsaUJBQWlCLHVFQUFHLElBQUk7TUFDNUQsSUFBTUgsU0FBUyxHQUFHRyxpQkFBaUIsSUFBSSxFQUFFO01BQUMsNERBQ3pCRCxPQUFPO1FBQUE7TUFBQTtRQUF4QiwwREFBMEI7VUFBQSxJQUFqQkUsSUFBSTtVQUNYLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJQSxJQUFJLENBQUNyTyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUVxTyxJQUFJLEdBQUdBLElBQUksQ0FBQ3hRLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUNvUSxTQUFTLENBQUNqVixJQUFJLENBQUNxVixJQUFJLENBQUNubUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDO1VBQ0Y7VUFDQSxJQUFJLENBQUNnbUIsNEJBQTRCLENBQUNHLElBQUksQ0FBQ0MsR0FBRyxFQUFFTCxTQUFTLENBQUM7UUFDeEQ7TUFBQztRQUFBO01BQUE7UUFBQTtNQUFBO01BQ0QsT0FBTyxtQkFBSyxJQUFJbFIsR0FBRyxDQUFDa1IsU0FBUyxDQUFDO0lBQ2hDO0VBQUM7SUFBQTtJQUFBO01BQUEsbUZBRUQsa0JBQXVCTSxlQUFlO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFDcEMzcEIsc0JBQU0sQ0FBQ1IsR0FBRyxnQ0FBeUJtcUIsZUFBZSxFQUFHO2dCQUNqREMsWUFBWSxHQUFHLEtBQUs7Z0JBQUEsd0JBQ2tCRCxlQUFlLENBQUNybUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxxRUFBL0R1bUIsZ0JBQWdCLDhCQUFFQyxlQUFlO2dCQUN0QyxJQUFJRCxnQkFBZ0IsQ0FBQ3pPLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtrQkFDcEN3TyxZQUFZLEdBQUcsSUFBSTtrQkFDbkJDLGdCQUFnQixHQUFHQSxnQkFBZ0IsQ0FBQzVRLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlDO2dCQUFDLE1BRUc0USxnQkFBZ0IsS0FBSyxVQUFVO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQ3BCclYsc0JBQXNCLENBQUMsVUFBVSxDQUFDO2NBQUE7Z0JBQUE7Z0JBQS9DM1IsR0FBRztnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BQ2MyUixzQkFBc0Isb0JBQWFxVixnQkFBZ0IsRUFBRztjQUFBO2dCQUFsRWhuQixHQUFHO2NBQUE7Z0JBQUEsTUFFTixDQUFDQSxHQUFHLElBQUksQ0FBQ21KLEtBQUssQ0FBQ3VJLE9BQU8sQ0FBQzFSLEdBQUcsQ0FBQztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxrQ0FBUyxLQUFLO2NBQUE7Z0JBQUEsTUFDekMrbUIsWUFBWSxJQUFJL21CLEdBQUcsQ0FBQ25HLFFBQVEsQ0FBQ290QixlQUFlLENBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVMsS0FBSztjQUFBO2dCQUFBLE1BQzNELENBQUNGLFlBQVksSUFBSSxDQUFDL21CLEdBQUcsQ0FBQ25HLFFBQVEsQ0FBQ290QixlQUFlLENBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVMsS0FBSztjQUFBO2dCQUNqRTlwQixzQkFBTSxDQUFDUixHQUFHLFdBQUltcUIsZUFBZSxrQkFBZTtnQkFBQyxrQ0FDdEMsSUFBSTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNaO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLDBGQUVELGtCQUE4QjVDLGtCQUFrQjtRQUFBO1VBQUE7VUFBQTtVQUFBO1VBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUVnRCxrQkFBa0IsOERBQUcsSUFBSTtnQkFBRUMsa0JBQWtCLDhEQUFHLElBQUk7Z0JBQ3BHaHFCLHNCQUFNLENBQUNSLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztnQkFBQyxJQUNwQ3dNLEtBQUssQ0FBQ3VJLE9BQU8sQ0FBQ3dTLGtCQUFrQixDQUFDO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNwQy9tQixzQkFBTSxDQUFDcUIsTUFBTSxnQ0FBeUIwbEIsa0JBQWtCLHNCQUFtQjtnQkFBQyxrQ0FDckUsS0FBSztjQUFBO2dCQUVWWSxVQUFVLEdBQUdxQyxrQkFBa0I7Z0JBQUEsd0RBQ0xqRCxrQkFBa0I7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBckM0QyxlQUFlO2dCQUFBLE1BQ3BCLE9BQU9BLGVBQWUsS0FBSyxRQUFRO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLElBQ2hDSSxrQkFBa0I7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FDRixJQUFJLENBQUNFLGdCQUFnQixDQUFDTixlQUFlLENBQUM7Y0FBQTtnQkFBekRoQyxVQUFVO2dCQUFBLElBQ0xBLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVMsS0FBSztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUEsS0FDcEJvQyxrQkFBa0I7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsTUFDdkJwQyxVQUFVLEtBQUssSUFBSTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUNGLElBQUksQ0FBQ3NDLGdCQUFnQixDQUFDTixlQUFlLENBQUM7Y0FBQTtnQkFBekRoQyxVQUFVO2dCQUFBO2NBQUE7Z0JBQUEsZUFHSm9DLGtCQUFrQjtnQkFBQSxrQ0FDbkIsSUFBSSx5QkFHSixLQUFLO2dCQUFBO2NBQUE7Z0JBQUEsZUFGS3BDLFVBQVU7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FBVSxJQUFJLENBQUNzQyxnQkFBZ0IsQ0FBQ04sZUFBZSxFQUFFSSxrQkFBa0IsQ0FBQztjQUFBO2dCQUFBO2NBQUE7Z0JBQTNGcEMsVUFBVTtnQkFBQTtjQUFBO2dCQUFBLGVBR0dBLFVBQVU7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FBVSxJQUFJLENBQUNzQyxnQkFBZ0IsQ0FBQ04sZUFBZSxFQUFFSSxrQkFBa0IsQ0FBQztjQUFBO2dCQUFBO2NBQUE7Z0JBQTNGcEMsVUFBVTtnQkFBQTtjQUFBO2dCQUdWM25CLHNCQUFNLENBQUNxQixNQUFNLENBQUMsOEJBQThCLEVBQUUwb0Isa0JBQWtCLENBQUM7Z0JBQ2pFcEMsVUFBVSxHQUFHLEtBQUs7Z0JBQUM7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBLE1BSWhCLFFBQU9nQyxlQUFlLE1BQUssUUFBUTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUN6QixJQUFJLENBQUNwQyx1QkFBdUIsQ0FBQ29DLGVBQWUsQ0FBQ0QsR0FBRyxFQUFFQyxlQUFlLENBQUMvcEIsSUFBSSxFQUFFK25CLFVBQVUsQ0FBQztjQUFBO2dCQUF0R0EsVUFBVTtnQkFBQSxJQUNMQSxVQUFVO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGtDQUFTLEtBQUs7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBLGtDQUcxQkEsVUFBVTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNsQjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUEsSUFFRDtFQUFBO0lBQUE7SUFBQTtNQUFBLHFGQUNBLGtCQUF5QlYsZUFBZTtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsd0RBQ0ZBLGVBQWUsQ0FBQzVoQixPQUFPLEVBQUU7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxrREFBakR4SixLQUFLLHFCQUFFcXVCLFlBQVk7Z0JBQUE7Z0JBQUEsT0FDbkIsSUFBSSxDQUFDM0MsdUJBQXVCLENBQUMsQ0FBQzJDLFlBQVksQ0FBQyxDQUFDO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVNydUIsS0FBSztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUEsa0NBRS9ELElBQUk7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDWjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtFQUFBO0FBQUE7Ozs7O0FDaFp1QztBQUNnQjtBQUMzQjtBQUMvQixJQUFNbUUsdUJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHdCQUF3QixDQUFDO0FBRTVDLElBQU1vckIsa0JBQWtCO0VBQUEsc0VBQUcsaUJBQU9WLElBQUk7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQzNDenBCLHVCQUFNLENBQUNSLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRWlxQixJQUFJLENBQUN0aUIsUUFBUSxDQUFDO1lBQ2pEQSxRQUFRLEdBQXNCc2lCLElBQUksQ0FBbEN0aUIsUUFBUSxFQUFFZSxTQUFTLEdBQVd1aEIsSUFBSSxDQUF4QnZoQixTQUFTLEVBQUUzQyxLQUFLLEdBQUlra0IsSUFBSSxDQUFibGtCLEtBQUs7WUFBQTtZQUFBLE9BQ042a0IsZUFBZSxDQUFDampCLFFBQVEsQ0FBQztVQUFBO1lBQTlDa2pCLFlBQVk7WUFBQSxpQ0FDWHJpQixnQkFBZ0IsQ0FBQ3FpQixZQUFZLEVBQUVuaUIsU0FBUyxFQUFFM0MsS0FBSyxDQUFDO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDeEQ7RUFBQSxnQkFMWTRrQixrQkFBa0I7SUFBQTtFQUFBO0FBQUEsR0FLOUI7QUFFTSxJQUFNQyxlQUFlO0VBQUEsdUVBQUcsa0JBQU85a0IsR0FBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDdkN0Rix1QkFBTSxDQUFDUixHQUFHLENBQUMsb0NBQW9DLEVBQUU4RixHQUFHLENBQUM7WUFBQztZQUFBLE9BQ3BDa1Asc0JBQXNCLENBQUNsUCxHQUFHLENBQUM7VUFBQTtZQUF2Q3pDLEdBQUc7WUFBQSxNQUNMQSxHQUFHLEtBQUssSUFBSSxJQUFJQSxHQUFHLEtBQUt1RixTQUFTO2NBQUE7Y0FBQTtZQUFBO1lBQ25DcEksdUJBQU0sQ0FBQ21JLE9BQU8scUJBQWM3QyxHQUFHLHlCQUFlekMsR0FBRyxFQUFHO1lBQUMsa0NBQzlDQSxHQUFHO1VBQUE7WUFFWjdDLHVCQUFNLENBQUNxQixNQUFNLGVBQVFpRSxHQUFHLG1DQUFnQztZQUFDLGtDQUNsRCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDWjtFQUFBLGdCQVRZOGtCLGVBQWU7SUFBQTtFQUFBO0FBQUEsR0FTM0I7O0FDckJ5QztBQUNYO0FBQy9CLElBQU1wcUIscUJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHNCQUFzQixDQUFDO0FBRTFDLElBQU11ckIsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQixDQUFJYixJQUFJLEVBQUk7RUFDdkN6cEIscUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixFQUFFaXFCLElBQUksQ0FBQ3JpQixRQUFRLElBQUlxaUIsSUFBSSxDQUFDYyxXQUFXLENBQUM7RUFDM0UsSUFBT3BqQixRQUFRLEdBQXNFc2lCLElBQUksQ0FBbEZ0aUIsUUFBUTtJQUFFZSxTQUFTLEdBQTJEdWhCLElBQUksQ0FBeEV2aEIsU0FBUztJQUFFM0MsS0FBSyxHQUFvRGtrQixJQUFJLENBQTdEbGtCLEtBQUs7SUFBRTZCLFFBQVEsR0FBMENxaUIsSUFBSSxDQUF0RHJpQixRQUFRO0lBQUVtakIsV0FBVyxHQUE2QmQsSUFBSSxDQUE1Q2MsV0FBVztJQUFBLHdCQUE2QmQsSUFBSSxDQUEvQnBpQixnQkFBZ0I7SUFBaEJBLGdCQUFnQixzQ0FBRyxJQUFJO0VBQ2pGLElBQUltakIsWUFBWSxHQUFHcGpCLFFBQVE7RUFDM0IsSUFBSW9qQixZQUFZLElBQUksQ0FBQ2p1QixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ29ILGFBQWEsQ0FBQ2dqQixZQUFZLENBQUMsRUFBRTtJQUNwRUEsWUFBWSxHQUFHbmpCLGdCQUFnQixHQUFHQSxnQkFBZ0IsR0FBR21qQixZQUFZO0VBQ25FO0VBRUEsSUFBSXJqQixRQUFRLEtBQUssSUFBSSxFQUFFO0lBQ3JCLE9BQU9hLGdCQUFnQixDQUFDekwsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNvSCxhQUFhLENBQUNnakIsWUFBWSxDQUFDLEVBQUV0aUIsU0FBUyxFQUFFM0MsS0FBSyxDQUFDO0VBQzVGO0VBQ0EsSUFBSWlsQixZQUFZLElBQUksQ0FBQ2p1QixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ29ILGFBQWEsQ0FBQ2dqQixZQUFZLENBQUMsRUFBRTtJQUNwRXhxQixxQkFBTSxDQUFDcUIsTUFBTSxDQUFDLDRCQUE0QixDQUFDO0lBQzNDLE9BQU8sS0FBSztFQUNkO0VBQ0EsSUFBSWtwQixXQUFXLElBQUksQ0FBQ2h1QixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQytXLGdCQUFnQixDQUFDb1QsV0FBVyxDQUFDLEVBQUU7SUFDckV2cUIscUJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQztJQUMzQyxPQUFPLEtBQUs7RUFDZDtFQUVBLElBQUk4RCxPQUFPO0VBQ1gsSUFBSXFsQixZQUFZLEVBQUVybEIsT0FBTyxHQUFHNUksTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNvSCxhQUFhLENBQUNnakIsWUFBWSxDQUFDLENBQUMsS0FDdkUsSUFBSUQsV0FBVyxFQUFFcGxCLE9BQU8sR0FBRzZHLEtBQUssQ0FBQ0MsSUFBSSxDQUFDMVAsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUMrVyxnQkFBZ0IsQ0FBQ29ULFdBQVcsQ0FBQyxDQUFDO0VBRTdGLFFBQVFwakIsUUFBUTtJQUNkLEtBQUssYUFBYTtNQUFFO1FBQ2xCLElBQUlzakIsT0FBTztRQUNYLElBQUl6ZSxLQUFLLENBQUN1SSxPQUFPLENBQUNwUCxPQUFPLENBQUMsRUFBRTtVQUMxQnNsQixPQUFPLEdBQUd0bEIsT0FBTyxDQUFDMUIsTUFBTSxDQUFDLFVBQUNpbkIsU0FBUyxFQUFFQyxJQUFJLEVBQUs7WUFDNUNELFNBQVMsSUFBSW5pQixRQUFRLENBQUNvaUIsSUFBSSxDQUFDL3BCLFdBQVcsQ0FBQ2hGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUNBLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUUsT0FBTzh1QixTQUFTO1VBQ2xCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDUCxDQUFDLE1BQU07VUFDTEQsT0FBTyxHQUFHbGlCLFFBQVEsQ0FBQ2hNLE1BQU0sQ0FBQzRELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDb0gsYUFBYSxDQUFDZ2pCLFlBQVksQ0FBQyxDQUFDNXBCLFdBQVcsQ0FDekVoRixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDQSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDO1FBQ0EsSUFBTXFNLFlBQVksR0FBR00sUUFBUSxDQUFDa2lCLE9BQU8sQ0FBQztRQUN0QyxPQUFPemlCLGdCQUFnQixDQUFDQyxZQUFZLEVBQUVDLFNBQVMsRUFBRTNDLEtBQUssQ0FBQztNQUN6RDtJQUNBLEtBQUssV0FBVztNQUNkLE9BQU95QyxnQkFBZ0IsQ0FBQ2dFLEtBQUssQ0FBQ0MsSUFBSSxDQUFDOUcsT0FBTyxDQUFDN0UsU0FBUyxDQUFDLEVBQUU0SCxTQUFTLEVBQUUzQyxLQUFLLENBQUM7SUFDMUUsS0FBSyxPQUFPO01BQUU7UUFDWixJQUFJeUcsS0FBSyxDQUFDdUksT0FBTyxDQUFDcFAsT0FBTyxDQUFDLElBQUlBLE9BQU8sQ0FBQ25KLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDaEQsT0FBT2dNLGdCQUFnQixDQUFDN0MsT0FBTyxDQUFDbkosTUFBTSxFQUFFa00sU0FBUyxFQUFFM0MsS0FBSyxDQUFDO1FBQzNELENBQUMsTUFBTSxJQUFJSixPQUFPLEVBQUU7VUFDbEIsT0FBTzZDLGdCQUFnQixDQUFDLENBQUMsRUFBRUUsU0FBUyxFQUFFM0MsS0FBSyxDQUFDO1FBQzlDLENBQUMsTUFBTTtVQUNMLE9BQU95QyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUVFLFNBQVMsRUFBRTNDLEtBQUssQ0FBQztRQUM5QztNQUNGO0lBQ0EsS0FBSyxPQUFPO01BQUU7UUFDWixJQUFNcWxCLGFBQWEsR0FBR0MsZ0JBQWdCLENBQUMxbEIsT0FBTyxDQUFDO1FBQy9DLElBQU0ybEIsUUFBUSxHQUFHdmxCLEtBQUssQ0FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ00sSUFBSSxFQUFFO1FBQzNDLElBQU1tbkIsVUFBVSxHQUFHeGxCLEtBQUssQ0FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ00sSUFBSSxFQUFFO1FBQzdDLElBQU1xRSxhQUFZLEdBQUcyaUIsYUFBYSxDQUFDRSxRQUFRLENBQUM7UUFDNUMsT0FBTzlpQixnQkFBZ0IsQ0FBQ0MsYUFBWSxFQUFFQyxTQUFTLEVBQUU2aUIsVUFBVSxDQUFDO01BQzlEO0lBQ0E7TUFDRS9xQixxQkFBTSxDQUFDcUIsTUFBTSxDQUFDLHNCQUFzQixDQUFDO01BQ3JDLE9BQU8sS0FBSztFQUFDO0FBRW5CLENBQUM7O0FDakV5QztBQUNYO0FBQy9CLElBQU1yQixzQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsdUJBQXVCLENBQUM7QUFFM0MsSUFBTWlzQixpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQWlCLENBQUl2QixJQUFJLEVBQUk7RUFDeEN6cEIsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLHdCQUF3QixDQUFDO0VBQ3BDLElBQU8ySCxRQUFRLEdBQXNCc2lCLElBQUksQ0FBbEN0aUIsUUFBUTtJQUFFZSxTQUFTLEdBQVd1aEIsSUFBSSxDQUF4QnZoQixTQUFTO0lBQUUzQyxLQUFLLEdBQUlra0IsSUFBSSxDQUFibGtCLEtBQUs7RUFDakMsSUFBSSxDQUFDNEIsUUFBUSxFQUFFO0lBQ2JuSCxzQkFBTSxDQUFDcUIsTUFBTSxDQUFDLDJCQUEyQixDQUFDO0lBQzFDLE9BQU8sS0FBSztFQUNkO0VBQ0EsSUFBTTRwQixZQUFZLEdBQUduVixRQUFRLENBQUMzTyxRQUFRLENBQUM7RUFDdkMsSUFBTWtqQixZQUFZLEdBQUdZLFlBQVksRUFBRTtFQUNuQyxPQUFPampCLGdCQUFnQixDQUFDcWlCLFlBQVksRUFBRW5pQixTQUFTLEVBQUUzQyxLQUFLLENBQUM7QUFDekQsQ0FBQzs7QUNkaUQ7QUFDUjtBQUNYO0FBQy9CLElBQU12RixxQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsc0JBQXNCLENBQUM7QUFFMUMsSUFBTW1zQixnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUl6QixJQUFJLEVBQUk7RUFDdkN6cEIscUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixFQUFFaXFCLElBQUksQ0FBQ3RpQixRQUFRLENBQUM7RUFDdkQsSUFBT0EsUUFBUSxHQUFzQnNpQixJQUFJLENBQWxDdGlCLFFBQVE7SUFBRWUsU0FBUyxHQUFXdWhCLElBQUksQ0FBeEJ2aEIsU0FBUztJQUFFM0MsS0FBSyxHQUFJa2tCLElBQUksQ0FBYmxrQixLQUFLO0VBQ2pDLFFBQVE0QixRQUFRO0lBQ2QsS0FBSyxVQUFVO01BQ2IsT0FBT2drQixlQUFlLENBQUNqakIsU0FBUyxFQUFFM0MsS0FBSyxDQUFDO0lBQzFDLEtBQUssU0FBUztNQUNaLE9BQU82bEIsY0FBYyxDQUFDbGpCLFNBQVMsRUFBRTNDLEtBQUssQ0FBQztJQUN6QztNQUNFLE9BQU8sSUFBSTtFQUFDO0FBRWxCLENBQUM7QUFFRCxJQUFNOGxCLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUIsR0FBUztFQUNoQyxJQUFJO0lBQ0YsT0FBTyxJQUFJcnVCLElBQUksQ0FBQ3VMLFFBQVEsQ0FBQ2hNLE1BQU0sQ0FBQ29MLGNBQWMsQ0FBQ3ZJLE9BQU8sQ0FBQ3RCLHNDQUFzQyxDQUFDLENBQUMsQ0FBQztFQUNsRyxDQUFDLENBQUMsT0FBT29MLEdBQUcsRUFBRTtJQUNabEoscUJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxpQ0FBaUMsRUFBRTZILEdBQUcsQ0FBQztJQUNyRCxPQUFPbE0sSUFBSSxDQUFDZ0gsR0FBRyxFQUFFO0VBQ25CO0FBQ0YsQ0FBQztBQUVELElBQU1tbkIsZUFBZSxHQUFHLFNBQWxCQSxlQUFlLENBQUlqakIsU0FBUyxFQUFFM0MsS0FBSyxFQUFLO0VBQzVDLElBQU0rbEIsUUFBUSxHQUFHLENBQUN0dUIsSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUdxbkIsbUJBQW1CLEVBQUUsSUFBSSxJQUFJO0VBQzVELE9BQU9yakIsZ0JBQWdCLENBQUNzakIsUUFBUSxFQUFFcGpCLFNBQVMsRUFBRUssUUFBUSxDQUFDaEQsS0FBSyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELElBQU02bEIsY0FBYyxHQUFHLFNBQWpCQSxjQUFjLENBQUlsakIsU0FBUyxFQUFFM0MsS0FBSyxFQUFLO0VBQUE7RUFDM0MsSUFBTWdtQixjQUFjLDRCQUFHaHZCLE1BQU0sQ0FBQ29MLGNBQWMsQ0FBQ3ZJLE9BQU8sQ0FBQ3RCLG9DQUFvQyxDQUFDLDBEQUFuRSxzQkFBcUV3RixLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ3RHLE9BQU8wRSxnQkFBZ0IsQ0FBQ3VqQixjQUFjLEVBQUVyakIsU0FBUyxFQUFFM0MsS0FBSyxDQUFDO0FBQzNELENBQUM7O0FDbkN5QztBQUNYO0FBQy9CLElBQU12RixpQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsa0JBQWtCLENBQUM7QUFFdEMsSUFBTXlzQixZQUFZLEdBQUcsU0FBZkEsWUFBWSxDQUFJL0IsSUFBSSxFQUFJO0VBQ25DenBCLGlCQUFNLENBQUNSLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRWlxQixJQUFJLENBQUN0aUIsUUFBUSxDQUFDO0VBQ3ZELElBQU9BLFFBQVEsR0FBc0JzaUIsSUFBSSxDQUFsQ3RpQixRQUFRO0lBQUVlLFNBQVMsR0FBV3VoQixJQUFJLENBQXhCdmhCLFNBQVM7SUFBRTNDLEtBQUssR0FBSWtrQixJQUFJLENBQWJsa0IsS0FBSztFQUVqQyxRQUFRNEIsUUFBUTtJQUNkLEtBQUssTUFBTTtNQUFFO1FBQ1gsSUFBTXNrQixVQUFVLEdBQUVsdkIsTUFBTSxDQUFDNEQsR0FBRyxDQUFDM0QsUUFBUSxDQUFDQyxJQUFJO1FBQzFDLElBQU1xYyxJQUFJLEdBQUcsSUFBSXhJLEdBQUcsQ0FBQ21iLFVBQVUsQ0FBQyxDQUFDMWpCLFFBQVE7UUFDekMvSCxpQkFBTSxDQUFDUixHQUFHLHlCQUFrQnNaLElBQUksZ0NBQXNCdlQsS0FBSyxFQUFHO1FBQzlELE9BQU95QyxnQkFBZ0IsQ0FBQzhRLElBQUksRUFBRTVRLFNBQVMsRUFBRTNDLEtBQUssQ0FBQztNQUNqRDtJQUNBO01BQ0UsT0FBTyxJQUFJO0VBQUM7QUFFbEIsQ0FBQzs7QUNsQnlDO0FBQ007QUFDakI7QUFDL0IsSUFBTXZGLGlCQUFNLEdBQUcsSUFBSWpCLFVBQU0sQ0FBQyxrQkFBa0IsQ0FBQztBQUV0QyxJQUFNMnNCLFlBQVksR0FBRyxTQUFmQSxZQUFZLENBQUlqQyxJQUFJLEVBQUk7RUFDbkN6cEIsaUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLDhCQUE4QixFQUFFaXFCLElBQUksQ0FBQ3RpQixRQUFRLENBQUM7RUFDekQsSUFBT0EsUUFBUSxHQUFzQnNpQixJQUFJLENBQWxDdGlCLFFBQVE7SUFBRWUsU0FBUyxHQUFXdWhCLElBQUksQ0FBeEJ2aEIsU0FBUztJQUFFM0MsS0FBSyxHQUFJa2tCLElBQUksQ0FBYmxrQixLQUFLO0VBRWpDLFFBQVE0QixRQUFRO0lBQ2QsS0FBSyxhQUFhO01BQUU7UUFDbEIsSUFBTW9HLFFBQVEsR0FBR2hSLE1BQU0sQ0FBQzZqQixVQUFVLENBQUM5aUIsa0JBQWtCLENBQUMsQ0FBQytpQixPQUFPLEdBQUcsUUFBUSxHQUFHLFNBQVM7UUFDckYsT0FBT3JZLGdCQUFnQixDQUFDdUYsUUFBUSxFQUFFckYsU0FBUyxFQUFFM0MsS0FBSyxDQUFDO01BQ3JEO0lBQ0E7TUFDRSxPQUFPLElBQUk7RUFBQztBQUVsQixDQUFDOzs7OztBQ2pCeUM7QUFDWDtBQUMyQjtBQUNIO0FBRXZELElBQU12Rix5QkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsMEJBQTBCLENBQUM7QUFFOUMsSUFBTTRzQixvQkFBb0I7RUFBQSxzRUFBRyxpQkFBT2xDLElBQUk7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQzdDenBCLHlCQUFNLENBQUNSLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRWlxQixJQUFJLENBQUN0aUIsUUFBUSxDQUFDO1lBQ2xEQSxRQUFRLEdBQXNCc2lCLElBQUksQ0FBbEN0aUIsUUFBUSxFQUFFZSxTQUFTLEdBQVd1aEIsSUFBSSxDQUF4QnZoQixTQUFTLEVBQUUzQyxLQUFLLEdBQUlra0IsSUFBSSxDQUFibGtCLEtBQUs7WUFBQTtZQUFBLE9BQ1ZpUCxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO1VBQUE7WUFBekRoRSxRQUFRO1lBQUEsTUFFVkEsUUFBUSxLQUFLLEtBQUs7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUFBLE9BQ1JnRSxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1VBQUE7WUFBbkQ0SixHQUFHO1lBQUEsSUFDRUEsR0FBRztjQUFBO2NBQUE7WUFBQTtZQUFBLGlDQUFTLEtBQUs7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUEsT0FFQTVKLHNCQUFzQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQztVQUFBO1lBQXJFNEssT0FBTztZQUFBLE1BQ1QsQ0FBQ0EsT0FBTyxJQUFLLFFBQU9BLE9BQU8sTUFBSyxRQUFRLElBQUksQ0FBQ2hhLE1BQU0sQ0FBQ3dCLElBQUksQ0FBQ3dZLE9BQU8sQ0FBQyxDQUFDcGpCLE1BQU87Y0FBQTtjQUFBO1lBQUE7WUFBQSxpQ0FBUyxLQUFLO1VBQUE7WUFDM0ZvaUIsR0FBRyxHQUFHZ0IsT0FBTyxDQUFDaGEsTUFBTSxDQUFDd0IsSUFBSSxDQUFDd1ksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQztZQUVyQ2lMLFlBQVksR0FBRyxJQUFJO1lBQUEsY0FDZmxqQixRQUFRO1lBQUEsZ0NBQ1QscUJBQXFCLHdCQUtyQixxQkFBcUIsd0JBS3JCLG9CQUFvQix3QkFLcEIsVUFBVSx3QkFLVixnQkFBZ0I7WUFBQTtVQUFBO1lBbkJuQm5ILHlCQUFNLENBQUNSLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRTRlLEdBQUcsQ0FBQztZQUFDO1lBQUEsT0FDaEN3TixtQkFBbUIsQ0FBQ3hOLEdBQUcsQ0FBQztVQUFBO1lBQTdDaU0sWUFBWTtZQUFBO1VBQUE7WUFJWnJxQix5QkFBTSxDQUFDUixHQUFHLENBQUMsaUNBQWlDLEVBQUU0ZSxHQUFHLENBQUM7WUFBQztZQUFBLE9BQzlCeU4saUJBQWlCLENBQUN6TixHQUFHLENBQUM7VUFBQTtZQUEzQ2lNLFlBQVk7WUFBQTtVQUFBO1lBSVpycUIseUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLG1DQUFtQyxFQUFFNGUsR0FBRyxDQUFDO1lBQUM7WUFBQSxPQUNoQzBOLGVBQWUsQ0FBQzFOLEdBQUcsQ0FBQztVQUFBO1lBQXpDaU0sWUFBWTtZQUFBO1VBQUE7WUFJWnJxQix5QkFBTSxDQUFDUixHQUFHLENBQUMsd0JBQXdCLEVBQUU0ZSxHQUFHLENBQUM7WUFBQztZQUFBLE9BQ3JCMk4sUUFBUSxDQUFDM04sR0FBRyxDQUFDO1VBQUE7WUFBbENpTSxZQUFZO1lBQUE7VUFBQTtZQUlacnFCLHlCQUFNLENBQUNSLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRTRlLEdBQUcsQ0FBQztZQUFDO1lBQUEsT0FDM0I0TixjQUFjLENBQUM1TixHQUFHLENBQUM7VUFBQTtZQUF4Q2lNLFlBQVk7WUFBQTtVQUFBO1lBQUEsaUNBSVRyaUIsZ0JBQWdCLENBQUNxaUIsWUFBWSxFQUFFbmlCLFNBQVMsRUFBRTNDLEtBQUssQ0FBQztVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ3hEO0VBQUEsZ0JBMUNZb21CLG9CQUFvQjtJQUFBO0VBQUE7QUFBQSxHQTBDaEM7QUFFRCxJQUFNQyxtQkFBbUI7RUFBQSx1RUFBRyxrQkFBT3hOLEdBQUc7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQUE7WUFBQSxPQUNWNk4sU0FBUyxDQUFDN04sR0FBRyxDQUFDO1VBQUE7WUFBbEN0YyxXQUFXO1lBQUEsTUFDYnNjLEdBQUcsSUFBSXRjLFdBQVc7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FDYkEsV0FBVyxDQUFDdWhCLG1CQUFtQjtVQUFBO1lBQUEsa0NBRWpDLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ1Y7RUFBQSxnQkFOS3VJLG1CQUFtQjtJQUFBO0VBQUE7QUFBQSxHQU14QjtBQUVELElBQU1DLGlCQUFpQjtFQUFBLHVFQUFHLGtCQUFPek4sR0FBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQ1I2TixTQUFTLENBQUM3TixHQUFHLENBQUM7VUFBQTtZQUFsQ3RjLFdBQVc7WUFBQSxNQUNic2MsR0FBRyxJQUFJdGMsV0FBVztjQUFBO2NBQUE7WUFBQTtZQUFBLGtDQUNiQSxXQUFXLENBQUN3aEIsbUJBQW1CO1VBQUE7WUFBQSxrQ0FFakMsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDVjtFQUFBLGdCQU5LdUksaUJBQWlCO0lBQUE7RUFBQTtBQUFBLEdBTXRCO0FBRUQsSUFBTUMsZUFBZTtFQUFBLHVFQUFHLGtCQUFPMU4sR0FBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQ042TixTQUFTLENBQUM3TixHQUFHLENBQUM7VUFBQTtZQUFsQ3RjLFdBQVc7WUFBQSxNQUNic2MsR0FBRyxJQUFJdGMsV0FBVztjQUFBO2NBQUE7WUFBQTtZQUFBLGtDQUNiQSxXQUFXLENBQUN5aEIsa0JBQWtCO1VBQUE7WUFBQSxrQ0FFaEMsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDVjtFQUFBLGdCQU5LdUksZUFBZTtJQUFBO0VBQUE7QUFBQSxHQU1wQjtBQUVELElBQU1HLFNBQVM7RUFBQSx1RUFBRyxrQkFBTzdOLEdBQUc7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQUE7WUFBQSxPQUNUbUIsaUJBQWlCLEVBQUU7VUFBQTtZQUE5QnBDLEVBQUU7WUFBQTtZQUFBLE9BQ0tBLEVBQUUsQ0FBQzVULEdBQUcsQ0FBQzZVLEdBQUcsQ0FBQztVQUFBO1lBQUE7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUN6QjtFQUFBLGdCQUhLNk4sU0FBUztJQUFBO0VBQUE7QUFBQSxHQUdkO0FBRUQsSUFBTUYsUUFBUTtFQUFBLHVFQUFHLGtCQUFPM04sR0FBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQ0M2TixTQUFTLENBQUM3TixHQUFHLENBQUM7VUFBQTtZQUFsQ3RjLFdBQVc7WUFBQSxNQUNic2MsR0FBRyxJQUFJdGMsV0FBVztjQUFBO2NBQUE7WUFBQTtZQUFBLGtDQUNiQSxXQUFXLENBQUNxaEIsWUFBWSxJQUFJLEVBQUU7VUFBQTtZQUFBLGtDQUVoQyxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDWjtFQUFBLGdCQU5LNEksUUFBUTtJQUFBO0VBQUE7QUFBQSxHQU1iO0FBRUQsSUFBTUMsY0FBYztFQUFBLHVFQUFHLGtCQUFPNU4sR0FBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQ0w2TixTQUFTLENBQUM3TixHQUFHLENBQUM7VUFBQTtZQUFsQ3RjLFdBQVc7WUFBQSxNQUNic2MsR0FBRyxJQUFJdGMsV0FBVztjQUFBO2NBQUE7WUFBQTtZQUFBLGtDQUNiQSxXQUFXLENBQUNraEIsYUFBYSxJQUFJLEVBQUU7VUFBQTtZQUFBLGtDQUVqQyxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDWjtFQUFBLGdCQU5LZ0osY0FBYztJQUFBO0VBQUE7QUFBQSxHQU1uQjs7QUM5RnlDO0FBQ1g7QUFDL0IsSUFBTWhzQixzQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsdUJBQXVCLENBQUM7QUFFM0MsSUFBTW10QixpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQWlCLENBQUl6QyxJQUFJLEVBQUk7RUFDeEN6cEIsc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDhCQUE4QixFQUFFaXFCLElBQUksQ0FBQ3RpQixRQUFRLENBQUM7RUFDekQsSUFBT0EsUUFBUSxHQUFzQnNpQixJQUFJLENBQWxDdGlCLFFBQVE7SUFBRWUsU0FBUyxHQUFXdWhCLElBQUksQ0FBeEJ2aEIsU0FBUztJQUFFM0MsS0FBSyxHQUFJa2tCLElBQUksQ0FBYmxrQixLQUFLO0VBRWpDLElBQUk0QixRQUFRLEtBQUssa0JBQWtCLEVBQUU7SUFDbkMsT0FBT2EsZ0JBQWdCLENBQUN6TCxNQUFNLENBQUM2RCxRQUFRLENBQUN1YixlQUFlLEVBQUV6VCxTQUFTLEVBQUUzQyxLQUFLLENBQUM7RUFDNUU7QUFDRixDQUFDOzs7Ozs7Ozs7OztBQ1hxRDtBQUNKO0FBQ0U7QUFDRjtBQUNSO0FBQ0E7QUFDZ0I7QUFDTjtBQUNyQjtBQUNrRTtBQUMvRDtBQUNhO0FBQzBCO0FBQ2xCO0FBQ3ZELElBQU12Rix1QkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsa0JBQWtCLENBQUM7QUFBQyxJQUV6Qm90QixVQUFVO0VBQzdCLG9CQUFZcFIsSUFBSSxFQUFFO0lBQUE7SUFDaEIsSUFBT3BaLGdCQUFnQixHQUFpQm9aLElBQUksQ0FBckNwWixnQkFBZ0I7TUFBRXlxQixXQUFXLEdBQUlyUixJQUFJLENBQW5CcVIsV0FBVztJQUNwQyxJQUFJLENBQUNBLFdBQVcsR0FBR0EsV0FBVztJQUM5QixJQUFJLENBQUN6cUIsZ0JBQWdCLEdBQUdBLGdCQUFnQjtJQUN4QyxJQUFJLENBQUMwcUIsa0JBQWtCLEdBQUcsRUFBRTtJQUM1QixJQUFJLENBQUNDLEtBQUssR0FBRyxJQUFJdEcsS0FBSyxFQUFFO0VBQzFCO0VBQUM7SUFBQTtJQUFBO01BQUEsNkVBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLHVEQUNxQixJQUFJLENBQUNvRyxXQUFXO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQXhCM0MsSUFBSTtnQkFBQTtnQkFBQSxPQUNlLElBQUksQ0FBQzhDLFNBQVMsQ0FBQzlDLElBQUksQ0FBQztjQUFBO2dCQUExQytDLGFBQWE7Z0JBQUEsSUFDZEEsYUFBYTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxpQ0FDVCxLQUFLO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQSxpQ0FHVCxJQUFJO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ1o7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsNEVBRUQsa0JBQWdCL0MsSUFBSTtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQ1g5RCxLQUFLLEdBQTJCOEQsSUFBSSxDQUFwQzlELEtBQUssRUFBRThHLGVBQWUsR0FBVWhELElBQUksQ0FBN0JnRCxlQUFlLEVBQUU3c0IsSUFBSSxHQUFJNnBCLElBQUksQ0FBWjdwQixJQUFJO2dCQUMvQjRzQixhQUFhLEdBQUcsSUFBSSxFQUN4QjtnQkFBQSxlQUNRNXNCLElBQUk7Z0JBQUEsa0NBQ0wsU0FBUyx3QkFHVCxTQUFTLHdCQUdULFdBQVcsd0JBR1gsS0FBSyx5QkFHTCxVQUFVLHlCQUdWLGFBQWEseUJBR2IsbUJBQW1CLHlCQUduQixVQUFVO2dCQUFBO2NBQUE7Z0JBcEJiNHNCLGFBQWEsR0FBR3RCLGdCQUFnQixDQUFDekIsSUFBSSxDQUFDO2dCQUFDO2NBQUE7Z0JBR3ZDK0MsYUFBYSxHQUFHbEMsZ0JBQWdCLENBQUNiLElBQUksQ0FBQztnQkFBQztjQUFBO2dCQUFBO2dCQUFBLE9BR2pCVSxrQkFBa0IsQ0FBQ1YsSUFBSSxDQUFDO2NBQUE7Z0JBQTlDK0MsYUFBYTtnQkFBQTtjQUFBO2dCQUdiQSxhQUFhLEdBQUdoQixZQUFZLENBQUMvQixJQUFJLENBQUM7Z0JBQUM7Y0FBQTtnQkFHbkMrQyxhQUFhLEdBQUd4QixpQkFBaUIsQ0FBQ3ZCLElBQUksQ0FBQztnQkFBQztjQUFBO2dCQUd4QytDLGFBQWEsR0FBR2QsWUFBWSxDQUFDakMsSUFBSSxDQUFDO2dCQUFDO2NBQUE7Z0JBQUE7Z0JBQUEsT0FHYmtDLG9CQUFvQixDQUFDbEMsSUFBSSxDQUFDO2NBQUE7Z0JBQWhEK0MsYUFBYTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BR1NOLGlCQUFpQixDQUFDekMsSUFBSSxDQUFDO2NBQUE7Z0JBQTdDK0MsYUFBYTtnQkFBQTtjQUFBO2dCQUdieHNCLHVCQUFNLENBQUNxQixNQUFNLDhCQUF1QnpCLElBQUksRUFBRztnQkFBQyxrQ0FDckMsSUFBSTtjQUFBO2dCQUFBLEtBR1grbEIsS0FBSztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxlQUNDOEcsZUFBZTtnQkFBQSxrQ0FDaEIsS0FBSyx5QkFHTCxJQUFJLHlCQUdKLEtBQUs7Z0JBQUE7Y0FBQTtnQkFBQSxlQUxRRCxhQUFhO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQVUsSUFBSSxDQUFDRCxTQUFTLENBQUM1RyxLQUFLLENBQUM7Y0FBQTtnQkFBQTtjQUFBO2dCQUE1RDZHLGFBQWE7Z0JBQUE7Y0FBQTtnQkFBQSxlQUdHQSxhQUFhO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQVUsSUFBSSxDQUFDRCxTQUFTLENBQUM1RyxLQUFLLENBQUM7Y0FBQTtnQkFBQTtjQUFBO2dCQUE1RDZHLGFBQWE7Z0JBQUE7Y0FBQTtnQkFBQSxlQUdHQSxhQUFhO2dCQUFBO2dCQUFBLE9BQVUsSUFBSSxDQUFDRCxTQUFTLENBQUM1RyxLQUFLLENBQUM7Y0FBQTtnQkFBQTtnQkFBNUQ2RyxhQUFhO2dCQUFBO2NBQUE7Z0JBR2J4c0IsdUJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQztnQkFBQztjQUFBO2dCQUFBLGtDQUl4Q21yQixhQUFhLEdBQUcvQyxJQUFJLENBQUMvVyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUs7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDakQ7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsaUdBRUQsa0JBQXFDcE4sR0FBRyxFQUFFb25CLEtBQUs7UUFBQTtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsTUFDekMsQ0FBQ3BuQixHQUFHLElBQUksQ0FBQ29uQixLQUFLLElBQUksQ0FBQ0EsS0FBSyxDQUFDMXdCLE1BQU07a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNiLElBQUksQ0FBQ3N3QixLQUFLLENBQUNqRixPQUFPLEVBQUU7Y0FBQTtnQkFBcENDLE9BQU87Z0JBQ2J0bkIsdUJBQU0sQ0FBQ1IsR0FBRyxpQ0FBMEI4RixHQUFHLEVBQUc7Z0JBQUM7Z0JBQUEsT0FDakJrUCxzQkFBc0Isb0JBQWFsUCxHQUFHLEVBQUc7Y0FBQTtnQkFBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxlQUFJLEVBQUU7Y0FBQTtnQkFBckVxbkIsYUFBYTtnQkFBQTtnQkFBQSx3REFFSUQsS0FBSztnQkFBQTtnQkFBQTtrQkFBQTtrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTswQkFBYmpELElBQUk7MEJBQUE7MEJBQUEsT0FDWSxLQUFJLENBQUM4QyxTQUFTLENBQUM5QyxJQUFJLENBQUM7d0JBQUE7MEJBQXZDOUIsVUFBVTswQkFBQSxLQUNaQSxVQUFVOzRCQUFBOzRCQUFBOzBCQUFBOzBCQUFBLEtBQ1JnRixhQUFhLENBQUNqd0IsUUFBUSxDQUFDK3NCLElBQUksQ0FBQy9XLElBQUksQ0FBQzs0QkFBQTs0QkFBQTswQkFBQTswQkFBQTt3QkFBQTswQkFDckNpYSxhQUFhLENBQUN2WSxJQUFJLENBQUNxVixJQUFJLENBQUMvVyxJQUFJLENBQUM7MEJBQUM7MEJBQUE7d0JBQUE7MEJBQUEsSUFFekJpYSxhQUFhLENBQUNqd0IsUUFBUSxDQUFDK3NCLElBQUksQ0FBQy9XLElBQUksQ0FBQzs0QkFBQTs0QkFBQTswQkFBQTswQkFBQTt3QkFBQTswQkFDdENpYSxhQUFhLEdBQUdBLGFBQWEsQ0FBQ3phLE1BQU0sQ0FBQyxVQUFDMGEsRUFBRTs0QkFBQSxPQUFLQSxFQUFFLEtBQUtuRCxJQUFJLENBQUMvVyxJQUFJOzBCQUFBLEVBQUM7d0JBQUM7d0JBQUE7MEJBQUE7c0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFHbkUzUyxvQkFBb0Isb0JBQWF1RixHQUFHLEdBQUlxbkIsYUFBYSxDQUFDO2dCQUFDO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBRXZEM3NCLHVCQUFNLENBQUNxQixNQUFNLDBDQUFtQ2lFLEdBQUcsZ0JBQU0sYUFBSWhFLE9BQU8sRUFBRztjQUFDO2dCQUFBO2dCQUV4RXRCLHVCQUFNLENBQUNSLEdBQUcsbUNBQTRCOEYsR0FBRyxFQUFHO2dCQUM1Q2dpQixPQUFPLEVBQUU7Z0JBQUM7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FFYjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxzRkFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQ1MzbEIsZ0JBQWdCLEdBQUksSUFBSSxDQUF4QkEsZ0JBQWdCO2dCQUN2QiwrQkFBMkJ5RCxNQUFNLENBQUNDLE9BQU8sQ0FBQzFELGdCQUFnQixDQUFDLHFDQUFFO2tCQUFBLDZEQUFqRDJELEdBQUcsMEJBQUVvbkIsS0FBSztrQkFDcEIsSUFBSSxDQUFDRyxjQUFjLENBQUN2bkIsR0FBRyxFQUFFb25CLEtBQUssQ0FBQztnQkFDakM7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDRjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxpRkFFRCxrQkFBcUJwbkIsR0FBRyxFQUFFb25CLEtBQUs7UUFBQTtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsd0JBQzRCLElBQUksQ0FBQ0kscUJBQXFCLENBQUNKLEtBQUssQ0FBQyxFQUFuRkssY0FBYyx5QkFBZEEsY0FBYyxFQUFFQyxZQUFZLHlCQUFaQSxZQUFZLEVBQUVDLGdCQUFnQix5QkFBaEJBLGdCQUFnQjtnQkFDckQsaUNBQWdDN25CLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDMG5CLGNBQWMsQ0FBQyx3Q0FBRTtrQkFBQSxnRUFBcEQ1bEIsUUFBUSwyQkFBRXVsQixNQUFLO2tCQUNuQlEsbUNBQW1DLEdBQUcsSUFBSSxDQUFDQyw4QkFBOEIsQ0FBQy9ELElBQUksQ0FBQyxJQUFJLEVBQUU5akIsR0FBRyxFQUFFb25CLE1BQUssQ0FBQztrQkFDdEd4WSxlQUFlLENBQUMvTSxRQUFRLEVBQUUrbEIsbUNBQW1DLENBQUM7Z0JBQ2hFO2dCQUFDO2tCQUNJO29CQUFPOWxCLFFBQVE7b0JBQUVzbEIsS0FBSztrQkFDekIsSUFBTWhXLFFBQVEsR0FBRyxJQUFJQyxnQkFBZ0IsQ0FBQyxVQUFDN0ssWUFBWSxFQUFLO29CQUN0RCxJQUFJQyxLQUFLLEdBQUcsRUFBRTtvQkFBQyw0REFDY0QsWUFBWTtzQkFBQTtvQkFBQTtzQkFBekMsdURBQTJDO3dCQUFBLElBQWhDc2hCLGNBQWM7d0JBQ3ZCcmhCLEtBQUssZ0NBQU9BLEtBQUssc0JBQUtDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDbWhCLGNBQWMsQ0FBQ2xoQixVQUFVLENBQUMsc0JBQUtGLEtBQUssQ0FBQ0MsSUFBSSxDQUFDbWhCLGNBQWMsQ0FBQ2poQixZQUFZLENBQUMsRUFBQztzQkFDMUc7c0JBQ0E7b0JBQUE7c0JBQUE7b0JBQUE7c0JBQUE7b0JBQUE7b0JBQ0EsSUFBSUosS0FBSyxDQUFDc2hCLEtBQUssQ0FBQyxVQUFDaGhCLENBQUM7c0JBQUEsT0FBS0EsQ0FBQyxDQUFDQyxPQUFPLEtBQUtsRSxTQUFTO29CQUFBLEVBQUMsRUFBRTtvQkFDakQsTUFBSSxDQUFDK2tCLDhCQUE4QixDQUFDN25CLEdBQUcsRUFBRW9uQixLQUFLLENBQUM7a0JBQ2pELENBQUMsQ0FBQztrQkFDRixJQUFJdGxCLFFBQVEsS0FBSyxNQUFNLEVBQUU7b0JBQ3ZCc1AsUUFBUSxDQUFDSSxPQUFPLENBQUN2YSxNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQzJhLElBQUksRUFBRTtzQkFBQ2hFLE9BQU8sRUFBRSxJQUFJO3NCQUFFQyxTQUFTLEVBQUU7b0JBQUksQ0FBQyxDQUFDO2tCQUM5RSxDQUFDLE1BQU07b0JBQ0wsSUFBTXlGLE1BQU0sR0FBRztzQkFBQzFGLE9BQU8sRUFBRSxJQUFJO3NCQUFFQyxTQUFTLEVBQUUsSUFBSTtzQkFBRWtQLFVBQVUsRUFBRTtvQkFBSSxDQUFDO29CQUNqRXhQLFFBQVEsQ0FBQ0ksT0FBTyxDQUFDdmEsTUFBTSxDQUFDNEQsR0FBRyxDQUFDQyxRQUFRLENBQUNvSCxhQUFhLENBQUNKLFFBQVEsQ0FBQyxDQUFDeWQsVUFBVSxFQUFFcEksTUFBTSxDQUFDO2tCQUNsRjtnQkFBQztnQkFmSCxpQ0FBZ0NyWCxNQUFNLENBQUNDLE9BQU8sQ0FBQzJuQixZQUFZLENBQUMsd0NBQUU7a0JBQUE7Z0JBZ0I5RDtnQkFBQyw0QkFDdUI1bkIsTUFBTSxDQUFDQyxPQUFPLENBQUM0bkIsZ0JBQWdCLENBQUM7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxnRUFBMUNQLE9BQUs7Z0JBQ1hRLG9DQUFtQyxHQUFHLElBQUksQ0FBQ0MsOEJBQThCLENBQUMvRCxJQUFJLENBQUMsSUFBSSxFQUFFOWpCLEdBQUcsRUFBRW9uQixPQUFLLENBQUM7Z0JBQUE7Z0JBQUEsT0FDckZuTixpQkFBaUIsRUFBRTtjQUFBO2dCQUE5QnBDLEVBQUU7Z0JBQ1JBLEVBQUUsQ0FBQ21RLGdCQUFnQixDQUFDSixvQ0FBbUMsQ0FBQztjQUFDO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRTVEO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQSxPQUVELCtCQUFzQlIsS0FBSyxFQUFrRjtNQUFBLElBQWhGSyxjQUFjLHVFQUFHLENBQUMsQ0FBQztNQUFBLElBQUVDLFlBQVksdUVBQUcsQ0FBQyxDQUFDO01BQUEsSUFBRUMsZ0JBQWdCLHVFQUFHLENBQUMsQ0FBQztNQUFBLElBQUVNLFFBQVEsdUVBQUcsSUFBSTtNQUN6RyxJQUFJLENBQUNiLEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUMxd0IsTUFBTSxFQUFFO01BQU8sNERBQ2pCMHdCLEtBQUs7UUFBQTtNQUFBO1FBQXhCLHVEQUEwQjtVQUFBLElBQWZqRCxJQUFJO1VBQ2IsSUFBTzdwQixJQUFJLEdBQUk2cEIsSUFBSSxDQUFaN3BCLElBQUk7VUFDWCxRQUFRQSxJQUFJO1lBQ1YsS0FBSyxXQUFXO2NBQ2QsSUFBSSxDQUFDbXRCLGNBQWMsQ0FBQ3RELElBQUksQ0FBQ3RpQixRQUFRLENBQUMsRUFBRTtnQkFDbEM0bEIsY0FBYyxDQUFDdEQsSUFBSSxDQUFDdGlCLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Y0FDcEM7Y0FDQTRsQixjQUFjLENBQUN0RCxJQUFJLENBQUN0aUIsUUFBUSxDQUFDLENBQUNpTixJQUFJLENBQUNtWixRQUFRLElBQUk5RCxJQUFJLENBQUM7Y0FDcEQ7WUFDRixLQUFLLFNBQVM7Y0FDWixJQUFJcnBCLFFBQVEsQ0FBQ29ILGFBQWEsQ0FBQ2lpQixJQUFJLENBQUNyaUIsUUFBUSxDQUFDLEVBQUU7Z0JBQ3pDNGxCLFlBQVksQ0FBQ3ZELElBQUksQ0FBQ3JpQixRQUFRLENBQUMsR0FBRzRsQixZQUFZLENBQUN2RCxJQUFJLENBQUNyaUIsUUFBUSxDQUFDLGdDQUNyRDRsQixZQUFZLENBQUN2RCxJQUFJLENBQUNyaUIsUUFBUSxDQUFDLElBQUVtbUIsUUFBUSxJQUFJOUQsSUFBSSxLQUFJLENBQUM4RCxRQUFRLElBQUk5RCxJQUFJLENBQUM7Z0JBQ3ZFO2NBQ0Y7Y0FDQSxJQUFJcnBCLFFBQVEsQ0FBQytXLGdCQUFnQixDQUFDc1MsSUFBSSxDQUFDYyxXQUFXLENBQUMsQ0FBQ3Z1QixNQUFNLEVBQUU7Z0JBQ3REZ3hCLFlBQVksQ0FBQ3ZELElBQUksQ0FBQ2MsV0FBVyxDQUFDLEdBQUd5QyxZQUFZLENBQUN2RCxJQUFJLENBQUNjLFdBQVcsQ0FBQyxnQ0FDM0R5QyxZQUFZLENBQUN2RCxJQUFJLENBQUNjLFdBQVcsQ0FBQyxJQUFFZ0QsUUFBUSxJQUFJOUQsSUFBSSxLQUFJLENBQUM4RCxRQUFRLElBQUk5RCxJQUFJLENBQUM7Z0JBQzFFO2NBQ0Y7Y0FDQXVELFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBR0EsWUFBWSxDQUFDLE1BQU0sQ0FBQyxnQ0FDckNBLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBRU8sUUFBUSxJQUFJOUQsSUFBSSxLQUFJLENBQUM4RCxRQUFRLElBQUk5RCxJQUFJLENBQUM7Y0FDbEU7WUFDRixLQUFLLG1CQUFtQjtjQUN0QixJQUFJLENBQUN3RCxnQkFBZ0IsQ0FBQ3JTLEdBQUcsRUFBRTtnQkFDekJxUyxnQkFBZ0IsQ0FBQ3JTLEdBQUcsR0FBRyxFQUFFO2NBQzNCO2NBQ0FxUyxnQkFBZ0IsQ0FBQ3JTLEdBQUcsQ0FBQ3hHLElBQUksQ0FBQ21aLFFBQVEsSUFBSTlELElBQUksQ0FBQztjQUMzQztVQUFNO1VBRVYsSUFBSUEsSUFBSSxDQUFDOUQsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDbUgscUJBQXFCLENBQUMsQ0FBQ3JELElBQUksQ0FBQzlELEtBQUssQ0FBQyxFQUFFb0gsY0FBYyxFQUFFQyxZQUFZLEVBQUVDLGdCQUFnQixFQUFFTSxRQUFRLElBQUk5RCxJQUFJLENBQUM7VUFDNUc7UUFDRjtNQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7TUFDRCxPQUFPO1FBQUNzRCxjQUFjLEVBQWRBLGNBQWM7UUFBRUMsWUFBWSxFQUFaQSxZQUFZO1FBQUVDLGdCQUFnQixFQUFoQkE7TUFBZ0IsQ0FBQztJQUN6RDtFQUFDO0lBQUE7SUFBQTtNQUFBLHNGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFFUU8sbUJBQW1CLEdBQUdqeEIsTUFBTSxDQUFDNEMsWUFBWSxDQUFDQyxPQUFPLENBQUNmLG9DQUFvQyxDQUFDO2dCQUFBLEtBQ3ZGbXZCLG1CQUFtQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDckJBLG1CQUFtQixHQUFHcm5CLElBQUksQ0FBQ0MsS0FBSyxDQUFDb25CLG1CQUFtQixDQUFDO2dCQUFDLEtBQ2xEQSxtQkFBbUIsQ0FBQ3pQLFNBQVM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ3pCMFAsWUFBWSxHQUFHLENBQUN6d0IsSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUd3cEIsbUJBQW1CLENBQUN6UCxTQUFTLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQztnQkFBQSxNQUM3RTBQLFlBQVksR0FBRzl2Qix1QkFBdUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVM2dkIsbUJBQW1CLENBQUNkLEtBQUs7Y0FBQTtnQkFBQTtnQkFBQSxPQUdwRGhyQixxQkFBcUIsRUFBRTtjQUFBO2dCQUFuRDhyQixtQkFBbUI7Z0JBQUEsSUFDZEEsbUJBQW1CO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUN0Qnh0Qix1QkFBTSxDQUFDcUIsTUFBTSxDQUFDLG1DQUFtQyxDQUFDO2dCQUFDLGtDQUM1QyxJQUFJO2NBQUE7Z0JBRWJtc0IsbUJBQW1CLEdBQUc7a0JBQUNkLEtBQUssRUFBRWMsbUJBQW1CO2tCQUFFelAsU0FBUyxFQUFFL2dCLElBQUksQ0FBQ2dILEdBQUc7Z0JBQUUsQ0FBQztnQkFDekV6SCxNQUFNLENBQUM0QyxZQUFZLENBQUMySSxPQUFPLENBQUN6SixvQ0FBb0MsRUFBRThILElBQUksQ0FBQ0UsU0FBUyxDQUFDbW5CLG1CQUFtQixDQUFDLENBQUM7Z0JBQUMsa0NBQ2hHQSxtQkFBbUIsQ0FBQ2QsS0FBSztjQUFBO2dCQUFBO2dCQUFBO2dCQUVoQzFzQix1QkFBTSxDQUFDcUIsTUFBTSxDQUFDLG1DQUFtQyxFQUFFLGFBQUlDLE9BQU8sQ0FBQztnQkFBQyxrQ0FDekQsSUFBSTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUVkO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0VBQUE7QUFBQTs7Ozs7QUNuTnFEO0FBQ1g7QUFDZDtBQUUvQixJQUFNdEIsdUJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHNCQUFzQixDQUFDO0FBRTFDLFNBQWUydUIsY0FBYztFQUFBO0FBQUE7QUFtQm5DO0VBQUEsNkVBbkJNLGlCQUE4QmxzQixnQkFBZ0I7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ25EeEIsdUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLDBCQUEwQixDQUFDO1lBQUM7WUFBQSx1QkFFZjRGLE1BQU0sQ0FBQ3dCLElBQUksQ0FBQ3BGLGdCQUFnQixDQUFDO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUF4Q21zQixPQUFPO1lBQ1ZwRSxPQUFPLDRCQUFHL25CLGdCQUFnQixDQUFDbXNCLE9BQU8sQ0FBQywwREFBekIsc0JBQTJCcEUsT0FBTztZQUFBLElBQzdDQSxPQUFPO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUNOcUUsaUJBQWlCLEdBQUcsSUFBSXpCLFVBQVUsQ0FBQztjQUFDQyxXQUFXLEVBQUU3QyxPQUFPO2NBQUV0QyxlQUFlLEVBQUU7WUFBRSxDQUFDLENBQUM7WUFBQTtZQUFBLE9BQzNFMkcsaUJBQWlCLENBQUNDLFVBQVUsRUFBRTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFDdEM3dEIsdUJBQU0sQ0FBQ1IsR0FBRyxpQ0FBMEJtdUIsT0FBTyxFQUFHO1lBQzlDNXRCLG9CQUFvQixDQUFDLEdBQUcsRUFBRTR0QixPQUFPLENBQUM7WUFBQyxpQ0FDNUJBLE9BQU87VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBR2xCM3RCLHVCQUFNLENBQUNSLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztZQUFDLGlDQUNoQyxJQUFJO1VBQUE7WUFBQTtZQUFBO1lBRVhRLHVCQUFNLENBQUNxQixNQUFNLENBQUMsZ0NBQWdDLENBQUM7WUFBQyxpQ0FDekMsSUFBSTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBRWQ7RUFBQTtBQUFBOzs7Ozs7Ozs7QUN6QjhGO0FBQy9CO0FBQ2pDO0FBQzJCO0FBQzFELElBQU1yQixnQ0FBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsMkJBQTJCLENBQUM7QUFBQyxJQUVqRCt1QixtQkFBbUI7RUFDdkIsNkJBQVkvUyxJQUFJLEVBQUU7SUFBQTtJQUNoQixJQUFPOVosVUFBVSxHQUFtQzhaLElBQUksQ0FBakQ5WixVQUFVO01BQUVPLGdCQUFnQixHQUFpQnVaLElBQUksQ0FBckN2WixnQkFBZ0I7TUFBRXVzQixXQUFXLEdBQUloVCxJQUFJLENBQW5CZ1QsV0FBVztJQUNoRCxJQUFJLENBQUM5c0IsVUFBVSxHQUFHQSxVQUFVO0lBQzVCLElBQUksQ0FBQ08sZ0JBQWdCLEdBQUdBLGdCQUFnQjtJQUN4QyxJQUFJLENBQUM4VyxlQUFlLEdBQUcsSUFBSTtJQUMzQixJQUFJLENBQUN5VixXQUFXLEdBQUdBLFdBQVc7RUFDaEM7RUFBQztJQUFBO0lBQUE7TUFBQSx1RkFxRUQsaUJBQTJCOW5CLFNBQVM7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUMzQjdILGtCQUFrQixHQUFJTix1Q0FBSjtnQkFBQSxJQUNwQixJQUFJLENBQUN3YSxlQUFlO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQ0w5RCxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO2NBQUE7Z0JBQXBEd1osR0FBRztnQkFBQSxJQUNKQSxHQUFHO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGlDQUFTLEVBQUU7Y0FBQTtnQkFDbkIsSUFBSSxDQUFDMVYsZUFBZSxHQUFHMFYsR0FBRztjQUFDO2dCQUV6QjNILGlCQUFpQixHQUFHOXBCLE1BQU0sQ0FBQ29MLGNBQWMsQ0FBQ3ZJLE9BQU8sQ0FBQ2hCLGtCQUFrQixDQUFDO2dCQUFBLEtBQ3JFaW9CLGlCQUFpQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUNOLElBQUksQ0FBQzRILGVBQWUsQ0FBQzVILGlCQUFpQixDQUFDO2NBQUE7Z0JBQUE7Y0FBQTtnQkFFdERBLGlCQUFpQixHQUFHLEVBQUU7Z0JBQ2ZwbEIsVUFBVSxHQUFtQyxJQUFJLENBQWpEQSxVQUFVLEVBQUVPLGdCQUFnQixHQUFpQixJQUFJLENBQXJDQSxnQkFBZ0IsRUFBRXVzQixXQUFXLEdBQUksSUFBSSxDQUFuQkEsV0FBVztnQkFBQSxJQUMzQ0EsV0FBVztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxpQ0FBUyxJQUFJO2NBQUE7Z0JBQUEsS0FDekJ2c0IsZ0JBQWdCO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNaMHNCLGtCQUFrQixHQUFHMXNCLGdCQUFnQixDQUFDdXNCLFdBQVcsQ0FBQztnQkFBQSxJQUNuREcsa0JBQWtCO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGlDQUFTLEVBQUU7Y0FBQTtnQkFBQSxnRUFDVmp0QixVQUFVO2dCQUFBO2dCQUFBO2tCQUFBO2tCQUFBLElBQXZCMmxCLFNBQVM7a0JBQ2xCLElBQU9qZ0IsRUFBRSxHQUFzQmlnQixTQUFTLENBQWpDamdCLEVBQUU7b0JBQUVULE9BQU8sR0FBYTBnQixTQUFTLENBQTdCMWdCLE9BQU87b0JBQUVnaEIsT0FBTyxHQUFJTixTQUFTLENBQXBCTSxPQUFPO2tCQUMzQixJQUFNQyxJQUFJLDRCQUFHK0csa0JBQWtCLENBQUN2bkIsRUFBRSxDQUFDLDBEQUF0QixzQkFBd0J3Z0IsSUFBSTtrQkFDekMsSUFBSSxDQUFDQSxJQUFJLElBQUlsaEIsU0FBUyxLQUFLLENBQUMsRUFBRTtrQkFDOUIsSUFBSWloQixPQUFPLElBQUlsYixLQUFLLENBQUN1SSxPQUFPLENBQUMyUyxPQUFPLENBQUMsRUFBRTtvQkFDckNBLE9BQU8sQ0FBQ3huQixPQUFPLENBQUMsVUFBQ3l1QixDQUFDLEVBQUs7c0JBQ3JCLElBQU1DLE1BQU0sR0FBR250QixVQUFVLENBQUN0RixJQUFJLENBQUMsVUFBQytzQixDQUFDO3dCQUFBLE9BQUtBLENBQUMsQ0FBQy9oQixFQUFFLEtBQUt3bkIsQ0FBQztzQkFBQSxFQUFDO3NCQUNqRCxJQUFJQyxNQUFNLEVBQUU7d0JBQ1ZBLE1BQU0sQ0FBQ2pILElBQUksR0FBR0EsSUFBSTt3QkFDbEJkLGlCQUFpQixDQUFDalMsSUFBSSxDQUFDZ2EsTUFBTSxDQUFDO3NCQUNoQztvQkFDRixDQUFDLENBQUM7a0JBQ0o7a0JBQUMscUVBQ29CbG9CLE9BQU87b0JBQUE7a0JBQUE7b0JBQTVCLHVEQUE4QjtzQkFBQSxJQUFuQkssTUFBTTtzQkFDZixJQUFJLENBQUNBLE1BQU0sQ0FBQ0UsUUFBUSxFQUFFO3NCQUN0QixnQ0FBeUJyQixNQUFNLENBQUN3QixJQUFJLENBQUNMLE1BQU0sQ0FBQ0UsUUFBUSxDQUFDLGtDQUFFO3dCQUFBO3dCQUFsRCxJQUFNSSxVQUFVO3dCQUNuQixJQUFNd25CLGFBQWEsNkJBQUdILGtCQUFrQixDQUFDdm5CLEVBQUUsQ0FBQyxxRkFBdEIsdUJBQXdCRixRQUFRLDJEQUFoQyx1QkFBbUNJLFVBQVUsQ0FBQzt3QkFDcEUsSUFBSXduQixhQUFhLEVBQUU7MEJBQ2pCOW5CLE1BQU0sQ0FBQ0UsUUFBUSxDQUFDSSxVQUFVLENBQUMsQ0FBQ0UsTUFBTSxHQUFHc25CLGFBQWE7d0JBQ3BEO3NCQUNGO29CQUNGO2tCQUFDO29CQUFBO2tCQUFBO29CQUFBO2tCQUFBO2tCQUNEekgsU0FBUyxDQUFDTyxJQUFJLEdBQUdBLElBQUk7a0JBQ3JCZCxpQkFBaUIsQ0FBQ2pTLElBQUksQ0FBQ3dTLFNBQVMsQ0FBQztnQkFBQztnQkFBQTtjQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFHaEMwSCx1QkFBdUIsR0FBR25vQixJQUFJLENBQUNFLFNBQVMsQ0FBQ2dnQixpQkFBaUIsQ0FBQztnQkFDakU5cEIsTUFBTSxDQUFDb0wsY0FBYyxDQUFDRyxPQUFPLENBQUMxSixrQkFBa0IsRUFBRWt3Qix1QkFBdUIsQ0FBQztnQkFBQztnQkFBQSxPQUM5RCxJQUFJLENBQUNMLGVBQWUsQ0FBQ0ssdUJBQXVCLENBQUM7Y0FBQTtnQkFBQTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUMzRDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxrRkFFRCxrQkFBc0JqSSxpQkFBaUI7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BRVRsZ0IsSUFBSSxDQUFDQyxLQUFLLENBQUNpZ0IsaUJBQWlCLENBQUM7Y0FBQTtnQkFBdkRBLGlCQUFpQjtnQkFDakJBLGlCQUFpQixHQUFHQSxpQkFBaUIsQ0FBQ25VLE1BQU0sQ0FBQyxVQUFDcWMsRUFBRSxFQUFLO2tCQUNuRCxPQUFPLEtBQUksQ0FBQ0MsYUFBYSxDQUFDRCxFQUFFLENBQUNFLFNBQVMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDO2dCQUNGenVCLGdDQUFNLENBQUNSLEdBQUcsV0FBSTZtQixpQkFBaUIsQ0FBQ3JxQixNQUFNLHNDQUFtQztnQkFBQyxrQ0FDbkVxcUIsaUJBQWlCO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBRXhCcm1CLGdDQUFNLENBQUNxQixNQUFNLENBQUMsK0JBQStCLEVBQUUsYUFBSUMsT0FBTyxDQUFDO2dCQUFDLGtDQUNyRCxFQUFFO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRVo7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBLE9BRUQsdUJBQWNtdEIsU0FBUyxFQUFFO01BQ3ZCLElBQU9uVyxlQUFlLEdBQUksSUFBSSxDQUF2QkEsZUFBZTtNQUN0QixJQUFJbVcsU0FBUyxLQUFLLElBQUksSUFBSUEsU0FBUyxLQUFLcm1CLFNBQVMsRUFBRSxPQUFPLElBQUk7TUFDOUQsSUFBSSxDQUFDNEQsS0FBSyxDQUFDdUksT0FBTyxDQUFDa2EsU0FBUyxDQUFDLEVBQUU7UUFDN0J6dUIsZ0NBQU0sQ0FBQ3FCLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQztRQUM5QyxPQUFPLEtBQUs7TUFDZDtNQUNBLElBQUlvdEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDclQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2hDcVQsU0FBUyxHQUFHQSxTQUFTLENBQUNsckIsR0FBRyxDQUFDLFVBQUNtckIsRUFBRTtVQUFBLE9BQUtBLEVBQUUsQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUFBLEVBQUM7UUFDL0MsT0FBTyxDQUFDRixTQUFTLENBQUMveEIsUUFBUSxDQUFDNGIsZUFBZSxDQUFDO01BQzdDO01BQ0EsT0FBT21XLFNBQVMsQ0FBQy94QixRQUFRLENBQUM0YixlQUFlLENBQUM7SUFDNUM7RUFBQztJQUFBO0lBQUE7TUFBQSxnRkE3SUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNFdFksZ0NBQU0sQ0FBQ1IsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2dCQUN6QmxCLFVBQVUsR0FBSUQsNkJBQUo7Z0JBQ1h1d0IsYUFBYSxHQUFHem9CLElBQUksQ0FBQ0MsS0FBSyxDQUFDN0osTUFBTSxDQUFDNEMsWUFBWSxDQUFDQyxPQUFPLENBQUNkLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRTJDLFVBQVUsR0FBRzJ0QixhQUFhLGFBQWJBLGFBQWEsdUJBQWJBLGFBQWEsQ0FBRTN0QixVQUFVO2dCQUNwQzhjLFNBQVMsR0FBRzZRLGFBQWEsYUFBYkEsYUFBYSx1QkFBYkEsYUFBYSxDQUFFN1EsU0FBUztnQkFBQSxNQUN0QyxDQUFDOWMsVUFBVSxJQUFJLENBQUM4YyxTQUFTO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUMzQi9kLGdDQUFNLENBQUNxQixNQUFNLENBQUMsdUNBQXVDLENBQUM7Z0JBQUM7Z0JBQUEsT0FDcENOLGVBQWUsRUFBRTtjQUFBO2dCQUFwQ0UsVUFBVTtnQkFBQSxJQUNMQSxVQUFVO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNiakIsZ0NBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQztnQkFBQyxrQ0FDckMsSUFBSTtjQUFBO2dCQUVQd3RCLHNCQUFzQixHQUFHO2tCQUM3QjlRLFNBQVMsRUFBRS9nQixJQUFJLENBQUNnSCxHQUFHLEVBQUU7a0JBQ3JCL0MsVUFBVSxFQUFWQTtnQkFDRixDQUFDO2dCQUNEMUUsTUFBTSxDQUFDNEMsWUFBWSxDQUFDMkksT0FBTyxDQUFDeEosVUFBVSxFQUFFNkgsSUFBSSxDQUFDRSxTQUFTLENBQUN3b0Isc0JBQXNCLENBQUMsQ0FBQztnQkFDL0V0eUIsTUFBTSxDQUFDb0wsY0FBYyxDQUFDb0IsVUFBVSxDQUFDakwsdUNBQXVDLENBQUM7Z0JBQUMsa0NBQ25FbUQsVUFBVTtjQUFBO2dCQUFBLEtBRWY4YyxTQUFTO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNMMFAsWUFBWSxHQUFHLENBQUN6d0IsSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUcrWixTQUFTLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQztnQkFBQSxNQUN6RDBQLFlBQVksR0FBRzl2Qix1QkFBdUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ3hDcUMsZ0NBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztnQkFBQztnQkFBQSxPQUNyQk4sZUFBZSxFQUFFO2NBQUE7Z0JBQXBDRSxVQUFVO2dCQUFBLElBQ0xBLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ2JqQixnQ0FBTSxDQUFDcUIsTUFBTSxDQUFDLDRCQUE0QixDQUFDO2dCQUFDLGtDQUNyQyxJQUFJO2NBQUE7Z0JBRVB3dEIsdUJBQXNCLEdBQUc7a0JBQzdCOVEsU0FBUyxFQUFFL2dCLElBQUksQ0FBQ2dILEdBQUcsRUFBRTtrQkFDckIvQyxVQUFVLEVBQVZBO2dCQUNGLENBQUM7Z0JBQ0QxRSxNQUFNLENBQUM0QyxZQUFZLENBQUMySSxPQUFPLENBQUN4SixVQUFVLEVBQUU2SCxJQUFJLENBQUNFLFNBQVMsQ0FBQ3dvQix1QkFBc0IsQ0FBQyxDQUFDO2dCQUMvRXR5QixNQUFNLENBQUNvTCxjQUFjLENBQUNvQixVQUFVLENBQUNqTCx1Q0FBdUMsQ0FBQztnQkFBQyxrQ0FDbkVtRCxVQUFVO2NBQUE7Z0JBR3JCakIsZ0NBQU0sQ0FBQ21JLE9BQU8sQ0FBQywwQ0FBMEMsQ0FBQztnQkFBQyxrQ0FDcERsSCxVQUFVO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2xCO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHNGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFFUTZ0QixVQUFVLEdBQUd2eUIsTUFBTSxDQUFDNEMsWUFBWSxDQUFDQyxPQUFPLENBQUNmLDBCQUEwQixDQUFDO2dCQUFBLEtBQ3BFeXdCLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ1pBLFVBQVUsR0FBRzNvQixJQUFJLENBQUNDLEtBQUssQ0FBQzBvQixVQUFVLENBQUM7Z0JBQUMsS0FDaENBLFVBQVUsQ0FBQy9RLFNBQVM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ2hCMFAsWUFBWSxHQUFHLENBQUN6d0IsSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUc4cUIsVUFBVSxDQUFDL1EsU0FBUyxLQUFLLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQUEsTUFDcEUwUCxZQUFZLEdBQUc5dkIsdUJBQXVCO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGtDQUFTbXhCLFVBQVUsQ0FBQ0MsT0FBTztjQUFBO2dCQUFBO2dCQUFBLE9BR3REeHRCLHFCQUFxQixFQUFFO2NBQUE7Z0JBQTFDdXRCLFVBQVU7Z0JBQUEsSUFDTEEsVUFBVTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDYjl1QixnQ0FBTSxDQUFDcUIsTUFBTSxDQUFDLHlCQUF5QixDQUFDO2dCQUFDLGtDQUNsQyxJQUFJO2NBQUE7Z0JBRWJ5dEIsVUFBVSxHQUFHO2tCQUFDQyxPQUFPLEVBQUVELFVBQVU7a0JBQUUvUSxTQUFTLEVBQUUvZ0IsSUFBSSxDQUFDZ0gsR0FBRztnQkFBRSxDQUFDO2dCQUN6RHpILE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzJJLE9BQU8sQ0FBQ3pKLDBCQUEwQixFQUFFOEgsSUFBSSxDQUFDRSxTQUFTLENBQUN5b0IsVUFBVSxDQUFDLENBQUM7Z0JBQUMsa0NBQzdFQSxVQUFVLENBQUNDLE9BQU87Y0FBQTtnQkFBQTtnQkFBQTtnQkFFekIvdUIsZ0NBQU0sQ0FBQ0gsSUFBSSxDQUFDLGFBQUl5QixPQUFPLENBQUM7Z0JBQUMsa0NBQ2xCLElBQUk7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FFZDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtFQUFBO0FBQUE7QUErRUgsOERBQWV3c0IsbUJBQW1COzs7O0FDL0pIO0FBQ0k7QUFDVTtBQUNBO0FBQ1U7QUFDWTtBQUNKO0FBS25DO0FBTU47QUFhSjtBQUVsQixJQUFJa0IsY0FBYyxHQUFHLElBQUk7QUFFekIsMkRBQUM7RUFBQTtFQUFBO0lBQUE7TUFBQTtRQUFBO1VBQ0N4dUIsZUFBZSxFQUFFO1VBQ2pCd1EsWUFBWSxFQUFFO1VBQ1ZpZSxNQUFNLEdBQUcsSUFBSTtVQUNYanZCLE1BQU0sR0FBRyxJQUFJakIsVUFBTSxFQUFFO1VBQzNCaUIsTUFBTSxDQUFDVCxJQUFJLENBQUMscUJBQXFCLENBQUM7VUFDbENoRCxNQUFNLENBQUN5YixTQUFTLEdBQUd6YixNQUFNLENBQUN5YixTQUFTLElBQUksRUFBRTtVQUNyQ3NPLElBQUksR0FBRyxJQUFJO1VBQ1hDLE9BQU8sR0FBRyxJQUFJO1VBQUE7VUFHaEI7O1VBRUF4bUIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQztVQUNwQ3FRLFVBQVUsRUFBRTtVQUNaclEsb0JBQW9CLENBQUMsWUFBWSxFQUFFL0MsSUFBSSxDQUFDZ0gsR0FBRyxFQUFFLEdBQUdnRCxJQUFJLENBQUM0QyxNQUFNLEVBQUUsQ0FBQztVQUFDO1VBQUEsT0FDdENFLGFBQWEsRUFBRTtRQUFBO1VBQWxDakcsVUFBVTtVQUNoQjdELE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLG9CQUFvQixFQUFFcUUsVUFBVSxDQUFDO1VBQzVDOUQsb0JBQW9CLENBQUMsWUFBWSxFQUFFOEQsVUFBVSxDQUFDO1VBQUM7VUFBQSxPQUN2QkUsWUFBWSxDQUFDRixVQUFVLENBQUM7UUFBQTtVQUExQ3FyQixTQUFTO1VBQ2ZudkIsb0JBQW9CLENBQUMsV0FBVyxFQUFFbXZCLFNBQVMsQ0FBQztVQUM1Q252QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUVwRCxPQUFPLENBQUM7VUFDbENvRCxvQkFBb0IsQ0FBQyxJQUFJLEVBQUV4QyxXQUFXLENBQUM7VUFFdkMweEIsTUFBTSxHQUFHLElBQUl0VixVQUFNLEVBQUU7VUFDckI7VUFBQTtVQUFBLE9BQ01zVixNQUFNLENBQUNFLHNCQUFzQixFQUFFO1FBQUE7VUFFckM7VUFDQTlzQixVQUFVLENBQUMsWUFBTTtZQUNmbkMsa0JBQWtCLEVBQUU7VUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQztVQUVSSCxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUM7O1VBRTlDOztVQUVBO1VBQ0E7VUFDQSxJQUNFbXZCLFNBQVMsS0FBSyxJQUFJLElBQ2xCLENBQUN4aUIsU0FBUyxDQUFDa1AsVUFBVSxJQUNyQixPQUFPbFAsU0FBUyxDQUFDa1AsVUFBVSxLQUFLLFVBQVUsSUFDMUMsUUFBT3dULE1BQU0sYUFBTkEsTUFBTSw0Q0FBTkEsTUFBTSxDQUFFQyxTQUFTLHNEQUFqQixrQkFBbUJDLFFBQVEsTUFBSyxVQUFVLElBQ2pELFFBQU9GLE1BQU0sYUFBTkEsTUFBTSw2Q0FBTkEsTUFBTSxDQUFFQyxTQUFTLHVEQUFqQixtQkFBbUJ6a0IsS0FBSyxNQUFLLFVBQVUsRUFDOUM7WUFDQTJrQixrQkFBa0IsRUFBRTtVQUN0Qjs7VUFFQTtVQUNNdnNCLE1BQU0sR0FBR3dKLGVBQWUsRUFBRSxFQUNoQztVQUNBLElBQUksQ0FBQ3hKLE1BQU0sRUFBRTtZQUNYdXNCLGtCQUFrQixFQUFFO1VBQ3RCOztVQUVBO1VBRU1DLHVCQUF1QixHQUFHMUIsNkNBQXVDLEVBQUU7VUFDbkU0QixpQkFBaUIsR0FBRzVCLHVDQUFpQyxFQUFFO1VBQ3ZEbFAsa0JBQWtCLEdBQUdnUixrQkFBa0IsRUFBRTtVQUUvQ2ppQixjQUFjLEVBQUU7VUFBQztVQUFBLE9BQ1hraUIsNkJBQTZCLEVBQUU7UUFBQTtVQUNyQ2haLGtCQUFrQixFQUFFO1VBRXBCcFIsZ0JBQWdCLEVBQUU7VUFDbEJnQyx1QkFBdUIsRUFBRTtVQUV6QjFILG9CQUFvQixDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUM7O1VBRTFDOztVQUVBOztVQUVBO1VBQ0lndUIsV0FBVyxHQUFHLElBQUk7VUFDbEJ2c0IsZ0JBQWdCLEdBQUcsSUFBSTtVQUFBO1VBQUEsT0FFRmd1Qix1QkFBdUI7UUFBQTtVQUFoRGh1QixnQkFBZ0I7VUFBQSxJQUNYQSxnQkFBZ0I7WUFBQTtZQUFBO1VBQUE7VUFBQSxNQUNiLElBQUlOLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztRQUFBO1VBQUE7VUFBQSxPQUdmd3NCLGNBQWMsQ0FBQ2xzQixnQkFBZ0IsQ0FBQztRQUFBO1VBQXBEdXNCLFdBQVc7UUFBQTtVQUdiLElBQUksQ0FBQ0EsV0FBVyxFQUFFO1lBQ2hCd0Isa0JBQWtCLEVBQUU7VUFDdEI7O1VBRUE7O1VBRUE7VUFFSU8sT0FBTyxHQUFHdnpCLE1BQU0sQ0FBQzRDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDZiwyQkFBMkIsQ0FBQyxFQUN0RTtVQUFBLE1BQ0l5eEIsT0FBTyxLQUFLLElBQUksSUFBSUEsT0FBTyxLQUFLMW5CLFNBQVM7WUFBQTtZQUFBO1VBQUE7VUFBQTtVQUFBLE9BQzNCb00sc0JBQXNCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztRQUFBO1VBQTdEc2IsT0FBTztVQUFBO1VBQUE7UUFBQTtVQUVGLElBQUlBLE9BQU8sS0FBSyxPQUFPLElBQUlBLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDbkQ7WUFDQXRiLHNCQUFzQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQzVSLElBQUksQ0FBQyxVQUFDa3RCLE9BQU8sRUFBSztjQUM5RCxJQUFJQSxPQUFPLEtBQUtBLE9BQU8sS0FBSyxNQUFNLElBQUlBLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDdkRDLGdCQUFnQixFQUFFO2NBQ3BCO1lBQ0YsQ0FBQyxDQUFDO1VBQ0o7UUFBQztVQUFBLE1BRUdELE9BQU8sS0FBS0EsT0FBTyxLQUFLLE1BQU0sSUFBSUEsT0FBTyxLQUFLLElBQUksQ0FBQztZQUFBO1lBQUE7VUFBQTtVQUNyREMsZ0JBQWdCLEVBQUU7VUFBQztVQUFBO1FBQUE7VUFBQSxNQUNWRCxPQUFPLEtBQUssSUFBSSxJQUFJQSxPQUFPLEtBQUsxbkIsU0FBUztZQUFBO1lBQUE7VUFBQTtVQUFBLE1BQzVDLElBQUlsSCxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFBQTtVQUVsQzNFLE1BQU0sQ0FBQzRDLFlBQVksQ0FBQzJJLE9BQU8sQ0FBQ3pKLDJCQUEyQixFQUFFLEtBQUssQ0FBQztRQUFDO1VBQUEsSUFHN0Q5QixNQUFNLENBQUM0RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDQyxTQUFTLENBQUNHLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFBQTtZQUFBO1VBQUE7VUFBQSxNQUNoRSxJQUFJUyxLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFBQTtVQUd6Qzs7VUFFQTtVQUNBcWxCLE9BQU8sR0FBRzJJLFNBQVMsSUFBSTN4QixXQUFXLElBQUksQ0FBQyxHQUFHQyxTQUFTLEdBQUcsR0FBRyxDQUFDOztVQUUxRDtVQUNNeUksU0FBUyxHQUFHMEMsWUFBWSxFQUFFO1VBQzFCcW5CLFVBQVUsR0FBR3p6QixNQUFNLENBQUM0QyxZQUFZLENBQUNDLE9BQU8sQ0FBQ2YsOEJBQThCLENBQUM7VUFBQSxNQUUxRTRILFNBQVMsR0FBRyxDQUFDO1lBQUE7WUFBQTtVQUFBO1VBQ2ZqRyxNQUFNLENBQUNSLEdBQUcsQ0FBQywwREFBMEQsQ0FBQztVQUN0RThtQixJQUFJLEdBQUcsSUFBSTtVQUNYMEksY0FBYyxHQUFHLFVBQVU7VUFBQztVQUFBO1FBQUE7VUFBQSxNQUNuQi9vQixTQUFTLEtBQUssQ0FBQyxDQUFDO1lBQUE7WUFBQTtVQUFBO1VBQUEsTUFDbkIsSUFBSS9FLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUFBO1VBQy9CLElBQUk4dUIsVUFBVSxLQUFLLE1BQU0sSUFBSUEsVUFBVSxLQUFLLElBQUksRUFBRTtZQUN2RGh3QixNQUFNLENBQUNILElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQztZQUNBeW1CLElBQUksR0FBRzRJLFNBQVMsSUFBSTN4QixXQUFXO1lBQy9CeXhCLGNBQWMsR0FBRyxVQUFVO1VBQzdCLENBQUMsTUFBTTtZQUNMO1lBQ0EsSUFBSUUsU0FBUyxJQUFJM3hCLFdBQVcsRUFBRTtjQUM1QitvQixJQUFJLEdBQUcsSUFBSTtjQUNYMEksY0FBYyxHQUFHLE1BQU07WUFDekIsQ0FBQyxNQUFNLElBQUlFLFNBQVMsSUFBSTN4QixXQUFXLEdBQUcsQ0FBQyxFQUFFO2NBQ3ZDK29CLElBQUksR0FBRyxLQUFLO2NBQ1owSSxjQUFjLEdBQUcsUUFBUTtZQUMzQixDQUFDLE1BQU07Y0FDTDFJLElBQUksR0FBRyxLQUFLO2NBQ1owSSxjQUFjLEdBQUcsUUFBUTtZQUMzQjtVQUNGO1FBQUM7VUFBQTtVQUFBLE9BS3NCeGEsc0JBQXNCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztRQUFBO1VBQXpEaEUsUUFBUTtVQUFBLE1BQ1ZBLFFBQVEsS0FBSyxVQUFVO1lBQUE7WUFBQTtVQUFBO1VBQUE7VUFBQSxPQUVuQmdFLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDO1FBQUE7VUFBQTtVQUFBLE9BQzFEQSxzQkFBc0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztRQUFBO1VBQUEsTUFFOUQsSUFBSXRULEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUFBO1VBR25DO1VBQ0FuQixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7VUFBQyxNQUU3Q3VtQixJQUFJLEtBQUssSUFBSTtZQUFBO1lBQUE7VUFBQTtVQUFBLE1BQ1QsSUFBSXBsQixLQUFLLENBQUMsU0FBUyxDQUFDO1FBQUE7VUFHdEIrdUIsWUFBWSxHQUFHMXpCLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDcU0sTUFBTTtVQUN2Q3VkLHVCQUF1QixHQUFHLElBQUk7VUFDbEMsSUFBSW5nQixTQUFTLElBQUlncUIsWUFBWSxDQUFDdnpCLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqRDBwQix1QkFBdUIsR0FBRzZKLFlBQVksQ0FBQ2hYLEtBQUssQ0FDeENnWCxZQUFZLENBQUNuMEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDN0JtMEIsWUFBWSxDQUFDQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQ2hDLENBQUM1c0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsVUFBQzRzQixJQUFJO2NBQUEsT0FBSzVuQixRQUFRLENBQUM0bkIsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUFBLEVBQUM7VUFDaEQ7VUFBQztVQUFBLE9BRXdCVCxpQkFBaUI7UUFBQTtVQUFwQ3p1QixVQUFVO1VBQUEsSUFFWEEsVUFBVTtZQUFBO1lBQUE7VUFBQTtVQUFBLE1BQ1AsSUFBSUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1FBQUE7VUFFckNsQixNQUFNLENBQUNtSSxPQUFPLENBQUMsb0JBQW9CLEVBQUVsSCxVQUFVLENBQUM7VUFDaERsQixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUM7VUFFekNxd0IsbUJBQW1CLEdBQUcsSUFBSXRDLHlCQUFtQixDQUFDO1lBQUM3c0IsVUFBVSxFQUFWQSxVQUFVO1lBQUVPLGdCQUFnQixFQUFoQkEsZ0JBQWdCO1lBQUV1c0IsV0FBVyxFQUFYQTtVQUFXLENBQUMsQ0FBQztVQUFBO1VBQUEsT0FFaEVxQyxtQkFBbUIsQ0FBQ0Msb0JBQW9CLENBQUNwcUIsU0FBUyxDQUFDO1FBQUE7VUFBN0VvZ0IsaUJBQWlCO1VBQUEsTUFDbkJBLGlCQUFpQixLQUFLLElBQUk7WUFBQTtZQUFBO1VBQUE7VUFBQSxNQUN0QixJQUFJbmxCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztRQUFBO1VBQUE7VUFBQTtVQUFBLE9BSWpDMGQsa0JBQWtCO1FBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtVQUFBO1VBQUEsTUFFbEIsSUFBSTFkLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQztRQUFBO1VBRTVDbkIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1VBQUMsSUFFeENzbUIsaUJBQWlCLENBQUNycUIsTUFBTTtZQUFBO1lBQUE7VUFBQTtVQUFBLE1BQ3JCLElBQUlrRixLQUFLLENBQUMsdUJBQXVCLENBQUM7UUFBQTtVQUUxQ25CLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQztVQUUzQ3V3QixXQUFXLEdBQUcsSUFBSW5LLFdBQVcsQ0FBQztZQUNsQ0MsdUJBQXVCLEVBQXZCQSx1QkFBdUI7WUFDdkJuZ0IsU0FBUyxFQUFUQSxTQUFTO1lBQ1RvZ0IsaUJBQWlCLEVBQWpCQSxpQkFBaUI7WUFDakJ4aUIsVUFBVSxFQUFWQSxVQUFVO1lBQ1YyTSxRQUFRLEVBQVJBLFFBQVE7WUFDUjhWLElBQUksRUFBSkEsSUFBSTtZQUNKQyxPQUFPLEVBQVBBO1VBQ0YsQ0FBQyxDQUFDO1VBQUE7VUFBQSxPQUNJK0osV0FBVyxDQUFDQyxZQUFZLEVBQUU7UUFBQTtVQUNoQ3h3QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUM7VUFBQyxjQUMvQ0MsTUFBTTtVQUFBO1VBQUEsT0FBdUN3VSxzQkFBc0IsQ0FBQyxHQUFHLENBQUM7UUFBQTtVQUFBO1VBQUEsWUFBakVyTSxPQUFPLG1CQUFDLHNCQUFzQjtVQUFBO1VBQUE7UUFBQTtVQUFBO1VBQUE7VUFFckNuSSxNQUFNLENBQUNILElBQUksQ0FBQyxvQkFBb0IsRUFBRSxZQUFJeUIsT0FBTyxDQUFDO1VBQzlDdkIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLFlBQUl1QixPQUFPLENBQUM7UUFBQztVQUFBO1VBRXZDcEIsa0JBQWtCLEVBQUU7VUFDcEIsSUFBSW9tQixJQUFJLEtBQUssSUFBSSxFQUFFdm1CLG9CQUFvQixDQUFDLE1BQU0sRUFBRXVtQixJQUFJLENBQUM7VUFDckQsSUFBSUEsSUFBSSxLQUFLLElBQUksSUFBSUMsT0FBTyxLQUFLLElBQUksRUFBRXhtQixvQkFBb0IsQ0FBQyxTQUFTLEVBQUd1bUIsSUFBSSxJQUFJQyxPQUFPLENBQUU7VUFDekZ4bUIsb0JBQW9CLENBQUMsU0FBUyxFQUFFaXZCLGNBQWMsQ0FBQztVQUMvQ3p5QixNQUFNLENBQUN5YixTQUFTLENBQUM1RCxJQUFJLENBQUM7WUFBQzRNLEtBQUssRUFBRSxNQUFNO1lBQUV3UCxPQUFPLEVBQUV4QjtVQUFjLENBQUMsQ0FBQztVQUFDO1VBQUEsT0FDMURDLE1BQU0sQ0FBQ2hWLG1CQUFtQixFQUFFO1FBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtNQUFBO0lBQUE7RUFBQTtBQUFBLENBRXJDLElBQUc7QUFBQyxTQUVVNFYsNkJBQTZCO0VBQUE7QUFBQTtBQUFBO0VBQUEsNEZBQTVDO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBO1lBQUEsT0FDaUMxRCw4QkFBOEIsRUFBRTtVQUFBO1lBQXpEeHFCLGdCQUFnQjtZQUFBLElBQ2pCQSxnQkFBZ0I7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBO1lBQ2YrdUIsVUFBVSxHQUFHLElBQUl2RSxVQUFVLENBQUM7Y0FBQ3hxQixnQkFBZ0IsRUFBaEJBO1lBQWdCLENBQUMsQ0FBQztZQUFBO1lBQUEsT0FDL0MrdUIsVUFBVSxDQUFDQyxtQkFBbUIsRUFBRTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ3ZDO0VBQUE7QUFBQTtBQUFBLFNBRWNmLGtCQUFrQjtFQUFBO0FBQUE7QUFBQTtFQUFBLGlGQUFqQztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQzhCclEsaUJBQWlCLEVBQUU7VUFBQTtZQUF6Q3FSLGFBQWE7WUFBQTtZQUFBLE9BQ2JBLGFBQWEsQ0FBQ2hCLGtCQUFrQixFQUFFO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDekM7RUFBQTtBQUFBO0FBRUQsU0FBU0wsa0JBQWtCLEdBQUc7RUFDNUJQLGNBQWMsR0FBRyxhQUFhO0VBQzlCLE1BQU0sSUFBSTl0QixLQUFLLENBQUMsb0JBQW9CLENBQUM7QUFDdkM7O0FBRUE7QUFDQSxTQUFTNnVCLGdCQUFnQixHQUFHO0VBQzFCZixjQUFjLEdBQUcsVUFBVTtFQUMzQnp5QixNQUFNLENBQUM0QyxZQUFZLENBQUMySSxPQUFPLENBQUN6SiwyQkFBMkIsRUFBRSxJQUFJLENBQUM7RUFDOUQsTUFBTSxJQUFJNkMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0FBQ25DLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9jb2xsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvY29uZmlncy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZCZWFjb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvcmVwbGFjZS11dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC93cmFwLWlkYi12YWx1ZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuY29uZmlnLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlJvYm90RW5naW5lL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9kYXRhTGF5ZXJDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbGVtZW50Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZnVuY3Rpb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9zZXNzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvdXJsQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZW52Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9kb2N1bWVudENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdkdhdGUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi90eXBlb2YuanNcIilbXCJkZWZhdWx0XCJdO1xuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7IC8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzO1xuICB2YXIgZXhwb3J0cyA9IHt9LFxuICAgIE9wID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAob2JqLCBrZXksIGRlc2MpIHtcbiAgICAgIG9ialtrZXldID0gZGVzYy52YWx1ZTtcbiAgICB9LFxuICAgICRTeW1ib2wgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LFxuICAgIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIixcbiAgICBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCIsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgd3JpdGFibGU6ICEwXG4gICAgfSksIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3IsXG4gICAgICBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSksXG4gICAgICBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShnZW5lcmF0b3IsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KVxuICAgIH0pLCBnZW5lcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkgJiYgKEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUpO1xuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAoXCJ0aHJvd1wiICE9PSByZWNvcmQudHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZyxcbiAgICAgICAgICB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIFwib2JqZWN0XCIgPT0gX3R5cGVvZih2YWx1ZSkgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICBpZiAoXCJjb21wbGV0ZWRcIiA9PT0gc3RhdGUpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwibmV4dFwiID09PSBjb250ZXh0Lm1ldGhvZCkgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO2Vsc2UgaWYgKFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHtcbiAgICAgICAgICBpZiAoXCJzdXNwZW5kZWRTdGFydFwiID09PSBzdGF0ZSkgdGhyb3cgc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0LmFyZztcbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIFwicmV0dXJuXCIgPT09IGNvbnRleHQubWV0aG9kICYmIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgc3RhdGUgPSBcImV4ZWN1dGluZ1wiO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSAmJiAoc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kLFxuICAgICAgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKHVuZGVmaW5lZCA9PT0gbWV0aG9kKSByZXR1cm4gY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbWV0aG9kTmFtZSAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSAmJiAoY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCksIFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHx8IFwicmV0dXJuXCIgIT09IG1ldGhvZE5hbWUgJiYgKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICdcIiArIG1ldGhvZE5hbWUgKyBcIicgbWV0aG9kXCIpKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZywgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgIHJldHVybiBpbmZvID8gaW5mby5kb25lID8gKGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlLCBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jLCBcInJldHVyblwiICE9PSBjb250ZXh0Lm1ldGhvZCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpO1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcbiAgICAxIGluIGxvY3MgJiYgKGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXSksIDIgaW4gbG9jcyAmJiAoZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl0sIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiLCBkZWxldGUgcmVjb3JkLmFyZywgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaXRlcmFibGUubmV4dCkgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBmb3IgKDsgKytpIDwgaXRlcmFibGUubGVuZ3RoOykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzLnJldmVyc2UoKSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGZvciAoOyBrZXlzLmxlbmd0aDspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSByZXR1cm4gbmV4dC52YWx1ZSA9IGtleSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgfTtcbiAgfSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IFwidGhyb3dcIiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXSxcbiAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKSxcbiAgICAgICAgICAgIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbmFsbHlFbnRyeSAmJiAoXCJicmVha1wiID09PSB0eXBlIHx8IFwiY29udGludWVcIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTtcbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gdHlwZSwgcmVjb3JkLmFyZyA9IGFyZywgZmluYWxseUVudHJ5ID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIHJldHVybiBcImJyZWFrXCIgPT09IHJlY29yZC50eXBlIHx8IFwiY29udGludWVcIiA9PT0gcmVjb3JkLnR5cGUgPyB0aGlzLm5leHQgPSByZWNvcmQuYXJnIDogXCJyZXR1cm5cIiA9PT0gcmVjb3JkLnR5cGUgPyAodGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnLCB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCIsIHRoaXMubmV4dCA9IFwiZW5kXCIpIDogXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUgJiYgYWZ0ZXJMb2MgJiYgKHRoaXMubmV4dCA9IGFmdGVyTG9jKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykgcmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpLCByZXNldFRyeUVudHJ5KGVudHJ5KSwgQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbm1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG9iaik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvLyBUT0RPKEJhYmVsIDgpOiBSZW1vdmUgdGhpcyBmaWxlLlxuXG52YXIgcnVudGltZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZVwiKSgpO1xubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuXG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PVxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgY29uc3QgcmVwbGFjZUFsbCA9IChzdHIsIGZpbmQsIHJlcGxhY2UgPSBcIlwiKSA9PiB7XG4gIGlmICghc3RyKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICBpZiAoaW5kZXggPCAwKSByZXR1cm4gc3RyO1xuXG4gIHdoaWxlIChzdHIuaW5kZXhPZihmaW5kKSA+PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgICBzdHIgPSAoaW5kZXggPiAwID8gc3RyLnN1YnN0cmluZygwLCBpbmRleCkgOiBcIlwiKSArIHJlcGxhY2UgKyBzdHIuc3Vic3RyaW5nKGluZGV4ICsgZmluZC5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJraXNoVG9Mb3dlciA9IChzdHIpID0+IHtcbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcbiAgbGV0IHN0cmluZyA9IHN0cjtcbiAgY29uc3QgbGV0dGVycyA9IHtcIsSwXCI6IFwiaVwiLCBcIklcIjogXCLEsVwiLCBcIsWeXCI6IFwixZ9cIiwgXCLEnlwiOiBcIsSfXCIsIFwiw5xcIjogXCLDvFwiLCBcIsOWXCI6IFwiw7ZcIiwgXCLDh1wiOiBcIsOnXCJ9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKChbxLBJxZ7EnsOcw4fDll0pKS9nLCBmdW5jdGlvbihsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyc1tsZXR0ZXJdO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4vc3RyaW5nVXRpbHNcIjtcbmNvbnN0IGlzU3RhZ2luZyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcInN0YWdpbmcudml2ZW5zZVwiKSA6IHRydWU7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIwLjAuNDIuMVwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0xPQ0FUSU9OID0gXCJodHRwczovL2hvc3QtYjk2LnBhZ2VzLmRldi90cmVhdG1lbnRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHN2Mi5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gXCJodHRwczovL2hvc3QtYjk2LnBhZ2VzLmRldi9lbGlnaWJpbGl0eV9ydWxlcy5qc29uXCI7XG5leHBvcnQgY29uc3QgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OID0gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3NvY2lhbC1wcm9vZi12Mi5qc29uXCI7XG5leHBvcnQgY29uc3QgTE9HX0FQSV9VUkwgPSBcImh0dHBzOi8vZXVyb3BlLXdlc3QzLW5leHRkYXktMzRlYjMuY2xvdWRmdW5jdGlvbnMubmV0L2FwaS9sb2dcIjtcbmV4cG9ydCBjb25zdCBMT09LVVBfQVBJX1VSTCA9IFwiaHR0cHM6Ly9jYXRhbG9nLWFwaS5hZG9yYWFpLmNvbVwiO1xuZXhwb3J0IGNvbnN0IE1PQklMRV9NRURJQV9RVUVSWSA9IFwiKG1heC13aWR0aDogNDQwcHgpXCI7XG4vLyBDb250cm9sIGdyb3VwIHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBTUExJVF9SQVRJTyA9IDUwO1xuZXhwb3J0IGNvbnN0IExBQl9SQVRJTyA9IDIwO1xuLy8gU2tpcHBlZCB0cmVhdG1lbnQgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IENIQU1QX1NLSVBfUkFUSU8gPSAyMDtcbmV4cG9ydCBjb25zdCBMQUJfU0tJUF9SQVRJTyA9IDUwO1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTID0gMjtcbmV4cG9ydCBjb25zdCBMSVNUX01PREVfQkVBR0xFX0tFWVMgPSBbXCJwYWdldHlwZVwiLCBcImNhdGVnb3J5XCIsIFwiYWxsdGltZVBMUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QTFBDYXRlZ29yeU1vZGVcIixcbiAgXCJhbGx0aW1lUERQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBEUENhdGVnb3J5TW9kZVwiLCBcImFsbHRpbWVDYXJ0Q2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvbkNhcnRDYXRlZ29yeU1vZGVcIl07XG5leHBvcnQgY29uc3QgSURMRV9USU1FT1VUID0gMTUwMDA7XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OX1NUT1JBR0VfS0VZUyA9IHtcbiAgU0VTU0lPTl9USU1FU1RBTVA6IFwiQkdfU2Vzc2lvblRpbWVzdGFtcFwiLFxuICBTRVNTSU9OX0hJU1RPUlk6IFwiQkdfU2Vzc2lvbkhpc3RvcnlcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG4gIE1BVENIRURfVFJFQVRNRU5UUzogXCJHTFZfTWF0Y2hlZFwiLFxufTtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0tFWVMgPSB7XG4gIFRSRUFUTUVOVFM6IFwiQkdfVHJlYXRtZW50c1wiLFxuICBXRUlHSFRTOiBcIkJHX1dlaWdodHNcIixcbiAgRUxJR0lCSUxJVFlfUlVMRVM6IFwiQkdfRV9SdWxlc1wiLFxuICBERUJVR19NT0RFOiBcIkJHX0RlYnVnXCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAxXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG4gIElTX0FETUlOOiBcIkdMVl9Jc0FkbWluXCIsXG4gIElTX0VNUExPWUVFOiBcIkdMVl9Jc0VtcGxveWVlXCIsXG4gIFZFUlNJT046IFwiR0xWX1ZcIixcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fU1RPUkFHRV9QUkVGSVggPSBcIkJHX1NlZ19cIjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpbiA9IFwiQmVhZ2xlIENsaWVudCBTREtcIiwgdGVzdGluZyA9IGZhbHNlKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgIHRoaXMuREVCVUcgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkRFQlVHID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5ERUJVR19NT0RFKTtcbiAgICB9XG4gIH1cblxuICBpbmZvKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5pbmZvKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmIChERUJVRykge1xuICAgICAgY29uc29sZS5sb2coYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgZmFpbGVkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogcmVkXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgc3VjY2VzcyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IGdyZWVuXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUud2FybihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5lcnJvcihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBudWxsID09IGFyciA/IG51bGwgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBTeW1ib2wgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKG51bGwgIT0gX2kpIHtcbiAgICB2YXIgX3MsXG4gICAgICBfZSxcbiAgICAgIF94LFxuICAgICAgX3IsXG4gICAgICBfYXJyID0gW10sXG4gICAgICBfbiA9ICEwLFxuICAgICAgX2QgPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKF94ID0gKF9pID0gX2kuY2FsbChhcnIpKS5uZXh0LCAwID09PSBpKSB7XG4gICAgICAgIGlmIChPYmplY3QoX2kpICE9PSBfaSkgcmV0dXJuO1xuICAgICAgICBfbiA9ICExO1xuICAgICAgfSBlbHNlIGZvciAoOyAhKF9uID0gKF9zID0gX3guY2FsbChfaSkpLmRvbmUpICYmIChfYXJyLnB1c2goX3MudmFsdWUpLCBfYXJyLmxlbmd0aCAhPT0gaSk7IF9uID0gITApIHtcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSAhMCwgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgbnVsbCAhPSBfaVtcInJldHVyblwiXSAmJiAoX3IgPSBfaVtcInJldHVyblwiXSgpLCBPYmplY3QoX3IpICE9PSBfcikpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYXJyO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVdGlsc1wiKTtcbmNvbnN0IG1vbnRocyA9IHtcbiAgXCJvY2FrXCI6IDAsXG4gIFwixZ91YmF0XCI6IDEsXG4gIFwibWFydFwiOiAyLFxuICBcIm5pc2FuXCI6IDMsXG4gIFwibWF5xLFzXCI6IDQsXG4gIFwiaGF6aXJhblwiOiA1LFxuICBcInRlbW11elwiOiA2LFxuICBcImHEn3VzdG9zXCI6IDcsXG4gIFwiZXlsw7xsXCI6IDgsXG4gIFwiZWtpbVwiOiA5LFxuICBcImthc8SxbVwiOiAxMCxcbiAgXCJhcmFsxLFrXCI6IDExLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50SGlkZSA9ICgpID0+IHtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtZWFzZVwiKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUb0Vhc2VPdXQgPSBhc3luYyAoKSA9PiB7XG4gIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1oaWRlXCIpKSByZXR1cm47XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBlbC50ZXh0Q29udGVudCA9IGAuZ2xvdi1lYXNlIHtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1vLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1zLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgfVxuICBcbiAgQGtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IGZpbHRlcjogZ3JheXNjYWxlKDAlKTt9XG4gIH1cbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNtb290aCB7XG4gICAgMCUgeyBvcGFjaXR5OiAwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAyNSUgeyBvcGFjaXR5OiAwLjEwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA1MCUgeyBvcGFjaXR5OiAwLjI1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA3NSUgeyBvcGFjaXR5OiAwLjUwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA5MCUgeyBvcGFjaXR5OiAwLjc1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAxMDAlIHsgb3BhY2l0eTogMTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9YDtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucHJlcGVuZChlbCk7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50IHdlaWdodHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hQbHVzKEVfUlVMRVNfTE9DQVRJT04pO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlcykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2hQbHVzKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Kc29uID0gYXdhaXQgcHJvZHVjdEluZm8uanNvbigpO1xuICAgIHJldHVybiBwcm9kdWN0SW5mb0pzb247XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggcHJvZHVjdCBpbmZvXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgdGltZW91dCA9ICh0aW1lKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lKTtcbiAgcmV0dXJuIHtjb250cm9sbGVyLCB0aW1lb3V0SUR9O1xufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT4ge1xuICBjb25zdCB7Y29udHJvbGxlciwgdGltZW91dElEfSA9IHRpbWVvdXQoNTAwMCk7XG4gIHJldHVybiBmZXRjaCh1cmwsIHsuLi5vcHRpb25zLCBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLnN0YXR1cyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAocmV0cmllcyA+IDApIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggdGltZWQgb3V0IFJldHJ5aW5nLi4uOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggZmFpbGVkOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDb29raWVJZGVudGlmaWVyID0gKGNvb2tpZVN0cmluZywgY29va2llTmFtZSkgPT4ge1xuICBpZiAoIWNvb2tpZVN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gY29va2llU3RyaW5nXG4gICAgICAuc3BsaXQoXCI7XCIpXG4gICAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiPVwiKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICBpZiAodlswXSAmJiB2WzFdKSB7XG4gICAgICAgICAgYWNjW2RlY29kZVVSSUNvbXBvbmVudCh2WzBdLnRyaW0oKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZbMV0udHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gIGxldCBpZGVudGlmaWVyID0gcGFyc2VkW2Nvb2tpZU5hbWVdO1xuICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29va2llTmFtZSA9PT0gXCJfZ2FcIikge1xuICAgIC8vIGV4dHJhY3QgdW5pcXVlIGlkZW50aWZpZXIgZnJvbSBHQSBjb29raWVcbiAgICBjb25zdCBpZGVudGlmaWVySW5kZXggPSAyO1xuICAgIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyLnNwbGl0KFwiLlwiKVtpZGVudGlmaWVySW5kZXhdO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZVBjdCA9IGFzeW5jIChpZGVudGlmaWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggb2YgeWVhciB0byBoYXNoIHRvIHJlc2V0IGl0IGV2ZXJ5IG1vbnRoXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG5vdy5nZXRNb250aCgpO1xuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcittb250aC50b1N0cmluZygpKTtcblxuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWN0aW9uc1RvUHJlcGFyZSkpO1xuICBsZXQgdmFyaWFudCA9IG51bGw7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7YnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zLCB2YXJpYW50c30gPSBhY3Rpb247XG4gICAgaWYgKCFidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMgJiYgIXZhcmlhbnRzKSBjb250aW51ZTtcbiAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhcmlhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpbmRleCwgdmFyaWFudEtleV0gb2YgT2JqZWN0LmtleXModmFyaWFudHMpLmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAoZGVidWdNb2RlICYmICFhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IE1hdGguZmxvb3IoMTAwIC8gT2JqZWN0LmtleXModmFyaWFudHMpLmxlbmd0aCkgKiAoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrQWN0aW9uU2VsZWN0b3JzID0gKGFjdGlvbnMpID0+IHtcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgIGNvbnN0IHtvcGVyYXRvciwgc2VsZWN0b3IsIHNlbGVjdG9yRmFsbGJhY2ssIG1vdmVfc2VsZWN0b3JfMSwgbW92ZV9zZWxlY3Rvcl8yfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiIHx8IHNlbGVjdG9yID09PSBcIm5vLXNlbGVjdG9yXCIpIGNvbnRpbnVlO1xuICAgIGlmIChcbiAgICAgIChzZWxlY3RvciB8fCBzZWxlY3RvckZhbGxiYWNrKSAmJlxuICAgICAgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgJiZcbiAgICAgICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JGYWxsYmFjaylcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYFNlbGVjdG9yL1NlbGVjdG9yRmFsbGJhY2sgJHtzZWxlY3Rvcnx8c2VsZWN0b3JGYWxsYmFja30gbm90IGZvdW5kYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzEgJiYgIW1vdmVfc2VsZWN0b3JfMikgfHxcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzIgJiYgIW1vdmVfc2VsZWN0b3JfMSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJCb3RoIG1vdmUgc2VsZWN0b3JzIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG1vdmVfc2VsZWN0b3JfMSAmJiBtb3ZlX3NlbGVjdG9yXzIpIHtcbiAgICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSkpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMSBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyA9ICgpID0+IHtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBRywgU0VTU0lPTl9USU1FU1RBTVAsIFNFU1NJT05fSElTVE9SWX0gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCBwb3B1cERpc3BsYXlGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpO1xuICBjb25zdCBzZXNzaW9uVGltZXN0YW1wID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCk7XG4gIGNvbnN0IHNlc3Npb25IaXN0b3J5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX0hJU1RPUlkpO1xuXG4gIGlmIChwb3B1cERpc3BsYXlGbGFnID09PSBudWxsKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDApO1xuICB9XG4gIGlmICghc2Vzc2lvblRpbWVzdGFtcCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVAsIERhdGUubm93KCkpO1xuICB9XG4gIGlmICghc2Vzc2lvbkhpc3RvcnkpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZV0pO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBzZXNzaW9uSGlzdG9yeV0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29uZGl0aW9uQ2hlY2tlciA9IChydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJub3RFeGlzdFwiKSB7XG4gICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHxcbiAgICBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gbnVsbCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IHJ1blRpbWVWYWx1ZSBvciBjb25kaXRpb24gaXMgbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgY2FzZSBcImV4aXN0XCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImluY2x1ZGVzXCI6XG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RJbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJub3RDb250YWluc1wiOlxuICAgICAgaWYgKCFydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPD0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImJldHdlZW5cIjoge1xuICAgICAgbGV0IFttaW4sIG1heF0gPSB2YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gbWluICYmIHJ1blRpbWVWYWx1ZSA8PSBtYXgpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FzZSBcInJlZ2V4XCI6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgXCJpXCIpO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QocnVuVGltZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBjb25kaXRpb24gaXMgbm90IGRlZmluZWQgXCIsIGNvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREZWJ1Z01vZGUgPSAoKSA9PiB7XG4gIGNvbnN0IHtERUJVR19NT0RFLCBJU19FTVBMT1lFRX0gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHtNQVRDSEVEX1RSRUFUTUVOVFN9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG4gIHRyeSB7XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oREVCVUdfTU9ERSkpO1xuICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPVwiKSkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKElTX0VNUExPWUVFLCB0cnVlKTtcbiAgICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTFcIikpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDEpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgICAgICBpZiAoY3VycmVudCAhPT0gMSkgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0yXCIpKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAyKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgIT09IDIpIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKE1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICAgIHJldHVybiAyO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9LTFcIikpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIC0xKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MFwiKSkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgICAgICBpZiAoY3VycmVudCkgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNOYU4oY3VycmVudCkpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IGRlYnVnIG1vZGUgd2l0aCBlcnJvcjogXCIsIGVyci5tZXNzYWdlKTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn07XG5cbi8vIGdldCBHQSBjbGllbnQgaWQgdXNpbmcgZ2EuZ2V0QWxsKClcbmV4cG9ydCBjb25zdCBnZXRHYUNsaWVudElkID0gKCkgPT4ge1xuICBjb25zdCBnYSA9IHdpbmRvdy5nYTtcbiAgLy8gaWYgZ2EgYW5kIGdhLmdldEFsbCgpIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gbnVsbFxuICBpZiAoZ2EgJiYgZ2EuZ2V0QWxsKSB7XG4gICAgY29uc3QgdHJhY2tlcnMgPSBnYS5nZXRBbGwoKTtcbiAgICBpZiAodHJhY2tlcnMgJiYgdHJhY2tlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJhY2tlcnNbMF0uZ2V0KFwiY2xpZW50SWRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gZ2V0IGRldGVybWluaXN0aWMgbnVtZXJpYyBoYXNoIGZyb20gc3RyaW5nIHRoYXQgY29udGFpbnMgb25seSBudW1iZXJzXG5leHBvcnQgY29uc3QgZ2V0VW5zZWN1cmVIYXNoID0gKHN0cikgPT4ge1xuICAvLyBzdGFydCB3aXRoIGEgbWFnaWMgbnVtYmVyLCB1c2UgcGkgZGlnaXRzXG4gIGxldCBoYXNoID0gMzE0MTU5MjY1O1xuICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikge1xuICAgIC8vIG1ha2UgaXQgc3RyaW5nXG4gICAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XG4gIH1cbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgfVxuICAvLyByZXR1cm4gYWJzb2x1dGUgdmFsdWVcbiAgcmV0dXJuIE1hdGguYWJzKGhhc2gpO1xufTtcblxuLy8gZ2VuZXJhdGUgYSAzMi1iaXQgcmFuZG9tIGludGVnZXJcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCk7XG59O1xuXG4vLyBnZXQgY3VycmVudCB1bml4IGVwb2NoIHRpbWUgaW4gc2Vjb25kc1xuZXhwb3J0IGNvbnN0IGdldFVuaXhUaW1lID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZXRJZGVudGlmaWVyID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGlkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lEKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGxvY2FsIHN0b3JhZ2VcIiwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYSBpbiBmaXJzdCBhdHRlbXB0XCIsIGlkKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHRyYWN0SWRlbnRpZmllckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYVwiLCBpZCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCByZWFkIEdBIGNsaWVudCBpZFwiKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgaW4gZ2V0SWRlbnRpZmllclwiLCBlKTtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxheSA9IChtcykgPT4gbmV3IFByb21pc2UoKHJlcykgPT4gc2V0VGltZW91dChyZXMsIG1zKSk7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREZWxpdmVyeURhdGUgPSAoZGF0ZSkgPT4ge1xuICBpZiAoIWRhdGUgfHwgdHlwZW9mIGRhdGUgIT09IFwic3RyaW5nXCIpIHJldHVybiBkYXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBzdGFydE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBlbmRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgc3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICBlbmREYXk6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBsZXQgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKS0oW1xcXFxkXSspXFxcXHM/KFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA9PT0gNCkge1xuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbM10udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSByZXN1bHQuc3RhcnRNb250aEluZGV4O1xuICB9IGVsc2Uge1xuICAgIG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspLShbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gubGVuZ3RoICE9PSA1KSByZXR1cm4gZGF0ZTtcblxuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzJdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbNF0udG9Mb3dlckNhc2UoKV07XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIGlmICghcmVzdWx0LnN0YXJ0TW9udGhJbmRleCB8fCAhcmVzdWx0LmVuZE1vbnRoSW5kZXgpIHJldHVybiBkYXRlO1xuXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuICAgIGNvbnN0IGVuZFllYXIgPSByZXN1bHQuZW5kTW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuXG4gICAgY29uc3QgZXN0aW1hdGVkU3RhcnQgPSBuZXcgRGF0ZShzdGFydFllYXIsIHJlc3VsdC5zdGFydE1vbnRoSW5kZXgsIHJlc3VsdC5zdGFydERheSk7XG4gICAgY29uc3QgZXN0aW1hdGVkRW5kID0gbmV3IERhdGUoZW5kWWVhciwgcmVzdWx0LmVuZE1vbnRoSW5kZXgsIHJlc3VsdC5lbmREYXkpO1xuXG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRTdGFydCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZEVuZCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyV2Vla3MgPSBzdGFydERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKHN0YXJ0RGlmZk92ZXJEYXlzIC8gNyk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJXZWVrcyA9IGVuZERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKGVuZERpZmZPdmVyRGF5cyAvIDcpO1xuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID09PSAwKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IC0gJHtlbmREaWZmT3ZlckRheXN9IEfDvG5gO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA+PSAxKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IEfDvG4gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSBlbmREaWZmT3ZlcldlZWtzKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpZGxlVGltZXIgPSBhc3luYyAodGltZU91dCwgY2FsbEJhY2spID0+IHtcbiAgbGV0IGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG5cbiAgd2luZG93LnRvcC5kb2N1bWVudC5vbnRvdWNoc3RhcnQgPSByZXNldFRpbWVyO1xuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0KTtcbiAgICBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaXNPd25NdXRhdGlvbiA9IChtdXRhdGlvbkxpc3QpID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBbLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0uYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLnJlbW92ZWROb2RlcyldO1xuICByZXR1cm4gbm9kZXMuc29tZSgobikgPT4ge1xuICAgIHJldHVybiBuLnRhZ05hbWUgJiYgKG4uaWQ/LmluY2x1ZGVzKFwiYm4tXCIpIHx8IEFycmF5LmZyb20obi5jbGFzc0xpc3QpLnNvbWUoKGMpID0+IGMuaW5jbHVkZXMoXCJibi1cIikgfHwgYy5pbmNsdWRlcyhcIm5kLVwiKSkpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRBZ2VudERldGFpbHMgPSAoKSA9PiB7XG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAvLyBleHRyYWN0IGJyb3dzZXIgYW5kIHZlcnNpb25cbiAgY29uc3QgYnIgPSB1YS5tYXRjaCgvKG9wZXJhfG9wcnxlZGd8dHJpZGVudHxmaXJlZm94fG1zaWUoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8XG4gICAgdWEubWF0Y2goLyhzYWZhcml8Y2hyb21lKD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fFxuICAgIHVhLm1hdGNoKC8od2Via2l0KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fCBbXTtcblxuICBpZiAoIWJyIHx8IGJyLmxlbmd0aCA8IDMpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBiTmFtZSA9IGJyWzFdO1xuICBjb25zdCBiVmVyc2lvbiA9IGJyWzJdO1xuXG4gIGNvbnN0IG9zID0ge1xuICAgIFdpbmRvd3M6IC9XaW4vaS50ZXN0KHVhKSxcbiAgICBNYWM6IC9NYWMvaS50ZXN0KHVhKSxcbiAgICBMaW51eDogL0xpbnV4L2kudGVzdCh1YSksXG4gICAgQW5kcm9pZDogL0FuZHJvaWQvaS50ZXN0KHVhKSxcbiAgICBpT1M6IC9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdCh1YSksXG4gIH07XG5cbiAgLy8gZXh0cmFjdCBPUyBhbmQgdmVyc2lvblxuICBsZXQgb3NWZXJzaW9uID0gXCJcIjtcbiAgbGV0IG9zTmFtZSA9IFwiXCI7XG4gIGlmIChvcy5XaW5kb3dzKSB7XG4gICAgb3NOYW1lID0gXCJXaW5kb3dzXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL1dpbmRvd3MgTlQgKFswLTkuXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCIwXCI7XG4gIH0gZWxzZSBpZiAob3MuaU9TKSB7XG4gICAgb3NOYW1lID0gXCJpT1NcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvT1MgKFswLTlfXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdLnJlcGxhY2UoL18vZywgXCIuXCIpIDogXCIwXCI7XG4gIH0gZWxzZSBpZiAob3MuTWFjKSB7XG4gICAgb3NOYW1lID0gXCJNYWNcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvTWFjIE9TIFggKFswLTlfXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdLnJlcGxhY2UoL18vZywgXCIuXCIpIDogXCIwXCI7XG4gIH0gZWxzZSBpZiAob3MuQW5kcm9pZCkge1xuICAgIG9zTmFtZSA9IFwiQW5kcm9pZFwiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9BbmRyb2lkIChbMC05Ll0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwiMFwiO1xuICB9IGVsc2UgaWYgKG9zLkxpbnV4KSB7XG4gICAgb3NOYW1lID0gXCJMaW51eFwiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9MaW51eCAoW2lcXGRdKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcIjBcIjtcbiAgfVxuXG4gIC8vIGV4dHJhY3QgbW9iaWxlIG9yIGRlc2t0b3BcbiAgY29uc3QgaXNNb2JpbGUgPSAvTW9iaS9pLnRlc3QodWEpO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmJyb3dzZXJOYW1lXCIsIGJOYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuYnJvd3NlclZlcnNpb25cIiwgYlZlcnNpb24pO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5vc05hbWVcIiwgb3NOYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uub3NWZXJzaW9uXCIsIG9zVmVyc2lvbik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmlzTW9iaWxlXCIsIGlzTW9iaWxlKTtcblxuICAvLyBzcGxpdCBPUyB2ZXJzaW9ucyBieSAuLCB0YWtlIGZpcnN0IHBhcnQgYXMgaW50ZWdlclxuICBjb25zdCBvc1ZlcnNpb25JbnQgPSBwYXJzZUludChvc1ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdKTtcblxuICBjb25zdCBpc1N1cHBvcnRlZEJyb3dzZXIgPSBiTmFtZSA9PT0gXCJDaHJvbWVcIiB8fCBiTmFtZSA9PT0gXCJTYWZhcmlcIjtcbiAgY29uc3QgaXNTdXBwb3J0ZWRPUyA9IChvc05hbWUgPT09IFwiQW5kcm9pZFwiICYmIG9zVmVyc2lvbkludCA+PSA5KSB8fFxuICAgIChvc05hbWUgPT09IFwiaU9TXCIgJiYgb3NWZXJzaW9uSW50ID49IDEzKSB8fFxuICAgIChvc05hbWUgPT09IFwiV2luZG93c1wiICYmIG9zVmVyc2lvbkludCA+PSA2KSB8fFxuICAgIChvc05hbWUgPT09IFwiTWFjXCIgJiYgb3NWZXJzaW9uSW50ID49IDEwKTtcblxuICByZXR1cm4gaXNTdXBwb3J0ZWRCcm93c2VyICYmIGlzU3VwcG9ydGVkT1M7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QnJvd3NlckRhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IG5hdlB0ciA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I7XG5cbiAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnREYXRhPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50O1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlBsYXRmb3JtXCIsIHBsYXRmb3JtKTtcblxuICAvKiB3aW5kb3cgdmlldyBhcmVhICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1BSYXRpb1wiLCB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG5cbiAgY29uc3QgYXZhaWxXaW5kb3cgPSB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbFdpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbEhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93QXZhaWxcIiwgYXZhaWxXaW5kb3cpO1xuXG4gIGNvbnN0IHdpbmRvd0RlcHRoID0gd2luZG93UHRyLnNjcmVlbj8uY29sb3JEZXB0aCArIFwiLVwiICsgd2luZG93UHRyLnNjcmVlbj8ucGl4ZWxEZXB0aDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93RGVwdGhcIiwgd2luZG93RGVwdGgpO1xuXG4gIGNvbnN0IHZwb3J0U2hhcGUgPSB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LndpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LmhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93VnBvcnRcIiwgdnBvcnRTaGFwZSk7XG5cbiAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgIGxldCB3aWR0aCA9IHBhcnNlSW50KHNjcmVlbi53aWR0aCk7XG4gICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHBhcnNlSW50KHNjcmVlbi5oZWlnaHQpIDogMDtcbiAgICBpZiAod2lkdGggIT09IDAgJiYgaGVpZ2h0ICE9PSAwKSB7XG4gICAgICBjb25zdCBpT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChwbGF0Zm9ybSk7XG4gICAgICBpZiAoaU9TICYmIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgIC8vIGlvcyBwcm92aWRlcyBEUElzLCBuZWVkIHRvIG11bHRpcGx5XG4gICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQgKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvcmllbnRhdGlvbkFuZ2xlID0gd2luZG93UHRyLnNjcmVlbj8ub3JpZW50YXRpb24/LmFuZ2xlO1xuICAgICAgICBpZiAoTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDkwIHx8IE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSAyNzApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGxhbmRzY2FwZSBvcmllbnRhdGlvbiBzd2l0Y2ggdmFsdWVzIGZvciBhbGwgZXhjZXB0IGlvc1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSB3aWR0aDtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodDtcbiAgICAgICAgICBoZWlnaHQgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dcIiwgd2lkdGggKyBcInhcIiArIGhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyogbmF2aWdhdG9yICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhpc3RTaXplXCIsIHdpbmRvd1B0ci5oaXN0b3J5Py5sZW5ndGgpO1xuXG4gIC8vIGNoZWNrIGlmIHVzZXJBZ2VudERhdGEgaXMgc3VwcG9ydGVkIGFuZCB1c2VyQWdlbnQgaXMgbm90IGF2YWlsYWJsZSwgdXNlIGl0XG4gIGlmICghbmF2UHRyLnVzZXJBZ2VudCkge1xuICAgIGlmIChuYXZQdHIudXNlckFnZW50RGF0YSkge1xuICAgICAgLy8gdHVybiBicmFuZHMgYXJyYXkgaW50byBzdHJpbmdcbiAgICAgIGxldCBuYXZBZ2VudCA9IG5hdlB0cj8udXNlckFnZW50RGF0YT8uYnJhbmRzPy5tYXAoZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS5icmFuZCArIFwiOlwiICsgZS52ZXJzaW9uO1xuICAgICAgfSkuam9pbigpO1xuICAgICAgLy8gYWRkIG1vYmlsZSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSAobmF2UHRyPy51c2VyQWdlbnREYXRhPy5tb2JpbGUgPyBcIm1vYmlcIiA6IFwiIFwiKTtcbiAgICAgIC8vIGFkZCBwbGF0Zm9ybSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSBwbGF0Zm9ybTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdkFnZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2UHRyLnVzZXJBZ2VudCk7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIV0NvcmVzXCIsIG5hdlB0ci5oYXJkd2FyZUNvbmN1cnJlbmN5KTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2TGFuZ3VhZ2VcIiwgbmF2UHRyLmxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLmJyb3dzZXJMYW5ndWFnZSB8fFxuICAgIG5hdlB0ci5zeXN0ZW1MYW5ndWFnZSB8fFxuICAgIG5hdlB0ci51c2VyTGFuZ3VhZ2UsXG4gICk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlRvdWNoXCIsIG5hdlB0ci5tYXhUb3VjaFBvaW50cyk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmludGVybmV0U3BlZWRcIiwgd2luZG93UHRyLm5hdmlnYXRvcj8uY29ubmVjdGlvbj8uZG93bmxpbmspO1xuXG4gIC8qIG1pc2NlbGxhbmVvdXMgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkb250dHJhY2tcIiwgbmF2UHRyLmRvTm90VHJhY2sgfHwgd2luZG93UHRyLmRvTm90VHJhY2sgfHwgbmF2UHRyLm1zRG9Ob3RUcmFjayk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIGNvbnN0IGZpcnN0U2Vzc2lvblJlZmVycmVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSKTtcbiAgaWYgKCFmaXJzdFNlc3Npb25SZWZlcnJlcikge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCBmaXJzdFNlc3Npb25SZWZlcnJlcik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRVUkxEYXRhID0gKCkgPT4ge1xuICBjb25zdCBjdXJyZW50VVJMID0gbmV3IFVSTCh3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInVcIiwgY3VycmVudFVSTC5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIGN1cnJlbnRVUkwuaG9zdG5hbWUpO1xuXG4gIC8qIFZpdmVuc2Ugc3BlY2lmaWMgKi9cbiAgbGV0IHBhZ2VUeXBlO1xuICAvLyBpZiB1cmwgbGlrZSB4IHRoZW4gc2V0IFBhZ2VUeXBlID0geVxuICBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZmF2b3JpbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIkZhdm9yaXRlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiQmFza2V0XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1vemV0aS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUHVyY2hhc2VcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJvZGVtZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUGF5bWVudFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIkFkZHJlc3NcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlBhc3RPcmRlcnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUta2F5aXQuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlJlZ2lzdGVyXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWdpcmlzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiU2lnbi1pblwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImt1cG9ubGFyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlByb2ZpbGVDb3Vwb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwicHJvZmlsLWd1bmNlbGxlLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJQcm9maWxlSW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlByb2ZpbGVBZGRyZXNzZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJkdXl1cnUtdGVyY2lobGVyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUHJvZmlsZU5vdGlmaWNhdGlvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJpbmRpcmltbGktbW9iaWx5YS1rYW1wYW55YWxhcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlNwZWNpYWxDYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG59O1xuXG4vKipcbiAqIFdvcmsgYXJvdW5kIFNhZmFyaSAxNCBJbmRleGVkREIgb3BlbiBidWcuXG4gKlxuICogU2FmYXJpIGhhcyBhIGhvcnJpYmxlIGJ1ZyB3aGVyZSBJREIgcmVxdWVzdHMgY2FuIGhhbmcgd2hpbGUgdGhlIGJyb3dzZXIgaXMgc3RhcnRpbmcgdXAuIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yMjY1NDdcbiAqIFRoZSBvbmx5IHNvbHV0aW9uIGlzIHRvIGtlZXAgbnVkZ2luZyBpdCB1bnRpbCBpdCdzIGF3YWtlLlxuICovXG5leHBvcnQgY29uc3QgaWRiUmVhZHkgPSAoKSA9PiB7XG4gIGNvbnN0IGlzU2FmYXJpID1cbiAgICAhbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEgJiZcbiAgICAvU2FmYXJpXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgIS9DaHJvbShlfGl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgLy8gTm8gcG9pbnQgcHV0dGluZyBvdGhlciBicm93c2VycyBvciBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgdGhyb3VnaCB0aGlzIG1lc3MuXG4gIGlmICghaXNTYWZhcmkgfHwgIWluZGV4ZWREQi5kYXRhYmFzZXMpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICBsZXQgaW50ZXJ2YWxJZDtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCB0cnlJZGIgPSAoKSA9PiBpbmRleGVkREIuZGF0YWJhc2VzKCkuZmluYWxseShyZXNvbHZlKCkpO1xuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0cnlJZGIsIDUwKTtcbiAgICB0cnlJZGIoKTtcbiAgfSkuZmluYWxseSgoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja1ZlcnNpb24gPSAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRWZXJzaW9uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5WRVJTSU9OKTtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uICE9PSBWRVJTSU9OKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoTE9DQUxfU1RPUkFHRV9LRVlTKSkgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKExPQ0FMX1NUT1JBR0VfS0VZU1trZXldKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhTRVNTSU9OX1NUT1JBR0VfS0VZUykpIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTW2tleV0pO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVkVSU0lPTiwgVkVSU0lPTik7XG4gIH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0VW5zZWN1cmVIYXNofSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZJbmZvTGF5ZXJcIik7XG5jb25zdCBMU19QcmVmaXggPSBcIkdMRENfXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJ1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCk7XG5cbiAgICAvLyByZW1vdmUgZG90cyBpbiBiYXNlRmVhdHVyZU5hbWUgYW5kIGFkZCBwcmVmaXhcbiAgICBjb25zdCBmZWF0dXJlS2V5ID0gTFNfUHJlZml4ICsgYmFzZUZlYXR1cmVOYW1lLnJlcGxhY2UoL1xcLi9nLCBcIl9cIik7XG4gICAgY29uc3Qgb3BLZXkgPSBmZWF0dXJlS2V5ICsgXCJfXCIgKyB1cGRhdGVNZXRob2Q7XG5cbiAgICBzd2l0Y2ggKHVwZGF0ZU1ldGhvZCkge1xuICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgY2FzZSBcIm1heFwiOlxuICAgICAgICAvLyBjb21wdXRlIG1pbiBhbmQgbWF4IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIE1hdGhbdXBkYXRlTWV0aG9kXSh2YWx1ZSwgYmFzZUZlYXR1cmVWYWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzdW1cIjpcbiAgICAgICAgLy8gY29tcHV0ZSBzdW0gYW5kIGNvdW50IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBwYXJzZUZsb2F0KHZhbHVlKSArIHBhcnNlRmxvYXQoYmFzZUZlYXR1cmVWYWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImNudFwiOlxuICAgICAgICAvLyBjb21wdXRlIGNvdW50IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBwYXJzZUludCh2YWx1ZSkgKyAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgIC8vIGNvbXB1dGUgbGFzdCBvYnRhaW5lZCB2YWx1ZSBpbiBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwiY291bnRfdmFsdWVzXCIgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzLCBrZWVwIGEgY291bnRlciBmb3IgZWFjaCB2YWx1ZVxuICAgICAgY2FzZSBcInZhbGNudHNcIjpcbiAgICAgICAge1xuICAgICAgICAgIC8vIGNvbXB1dGUgY291bnQgb2YgZWFjaCB2YWx1ZSBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgICAvLyBjcmVhdGUgYSA4IGJ5dGVzIGhleCBoYXNoIGZvciBiYXNlRmVhdHVyZVZhbHVlLCBvbmx5IHBvc2l0aXZlIG51bWJlcnNcbiAgICAgICAgICBjb25zdCB2YWxIYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGJhc2VGZWF0dXJlVmFsdWUpO1xuXG4gICAgICAgICAgY29uc3Qgb3BLZXlWYWwgPSBvcEtleSArIFwiX1wiICsgdmFsSGFzaDtcbiAgICAgICAgICBjb25zdCBvcEtleVZhbE5hbWUgPSBvcEtleSArIFwiX1wiICsgdmFsSGFzaCArIFwiX25hbWVcIjtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbE5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXlWYWwpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbCwgcGFyc2VJbnQodmFsdWUpICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWwsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiRXJyb3IgaW4gdXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QsIGUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcXVlcnlJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwicXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpO1xuXG4gICAgY29uc3QgZmVhdHVyZUtleSA9IExTX1ByZWZpeCArIGJhc2VGZWF0dXJlTmFtZS5yZXBsYWNlKC9cXC4vZywgXCJfXCIpO1xuICAgIGxldCBvcEtleTtcblxuICAgIGxldCBzdG9yYWdlID0gbnVsbDtcbiAgICBpZiAod2luZG93ID09PSBcImFsbHRpbWVcIikge1xuICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdyA9PT0gXCJzZXNzaW9uXCIpIHtcbiAgICAgIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmVycm9yKFwiSW52YWxpZCB3aW5kb3cgdHlwZVwiLCB3aW5kb3cpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc3dpdGNoIChxdWVyeU1ldGhvZCkge1xuICAgICAgLy8gZm9yIGxhc3QsIG1pbiwgbWF4LCBzdW0gZXRjLiBicmluZyB0aGUgdmFsdWUgZnJvbSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2UgZ2l2ZW4gdGhlIHdpbmRvdyBpcyBzZXNzaW9uIG9yIGFsbHRpbWVcbiAgICAgIGNhc2UgXCJtaW5cIjpcbiAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgIGNhc2UgXCJzdW1cIjpcbiAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgIG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX1wiICsgcXVlcnlNZXRob2Q7XG4gICAgICAgIHJldHVybiBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuXG4gICAgICAgIC8vIGZvciBjdiwgcmV0dXJuIHRoZSBudW1iZXIgb2YgZHNpaXRuY3QgdmFsdWVzLCBvYnRhaW4gYnkgc2Nhbm5pbmcgdGhlIHByZWZpeCBvZiB0aGUga2V5IGluIHRoZSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2VcbiAgICAgICAgLy8gZm9yIG1vZGUsIHNjYW4gdGhlIGxvY2FsL3Nlc3Npb24gc3RvcmFnZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSB3aXRoIHRoZSBoaWdoZXN0IGNvdW50XG4gICAgICBjYXNlIFwiY250dmFsc1wiOlxuICAgICAgY2FzZSBcInN1bXZhbHNcIjpcbiAgICAgIGNhc2UgXCJtb2RlXCI6XG4gICAgICB7XG4gICAgICAgIG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX3ZhbGNudHNcIjtcbiAgICAgICAgY29uc3QgbG9jYWxLZXlzID0gT2JqZWN0LmtleXMoc3RvcmFnZSk7XG4gICAgICAgIGNvbnN0IGxvY2FsS2V5c0ZpbHRlcmVkID0gbG9jYWxLZXlzLmZpbHRlcigoa2V5KSA9PiBrZXkuaW5kZXhPZihvcEtleSkgPT09IDAgJiYga2V5LmluZGV4T2YoXCJfbmFtZVwiKSA9PT0gLTEpO1xuICAgICAgICBpZiAocXVlcnlNZXRob2QgPT09IFwiY250dmFsc1wiKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsS2V5c0ZpbHRlcmVkLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJzdW12YWxzXCIpIHtcbiAgICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgICBsb2NhbEtleXNGaWx0ZXJlZC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIHN1bSArPSBwYXJzZUludChzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXhDb3VudCA9IG51bGw7XG4gICAgICAgIGxldCBtYXhWYWwgPSBudWxsO1xuICAgICAgICBsb2NhbEtleXNGaWx0ZXJlZC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWwgPSBwYXJzZUludChzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgaWYgKG1heFZhbCA9PT0gbnVsbCB8fCBtYXhDb3VudCA9PT0gbnVsbCB8fCBtYXhDb3VudCA8IHZhbCkge1xuICAgICAgICAgICAgbWF4Q291bnQgPSB2YWw7XG4gICAgICAgICAgICAvLyBuYW1lcyBhcmUgb25seSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICBtYXhWYWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkgKyBcIl9uYW1lXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXhWYWw7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIGluIHF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93LCBlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5leHBvcnQgY29uc3Qgc2VhcmNoUGF0aHMgPSBbXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR0EgRGF0YSBMYXllciBRdWVyaWVzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQYWdlVHlwZVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIGZvcm1hdHRlcjogXCJwYWdlVHlwZUdBMkdsb3ZcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBkcC5za3VcIiwgZm9ybWF0dGVyOiBcInVwcGVyQ2FzZVRSXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UuZGV0YWlsLmFjdGlvbkZpZWxkLmxpc3RcIiwgbmFtZTogXCJwZHAubGlzdGFsaWFzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZGlzY291bnRSYXRlXCIsIG5hbWU6IFwicGRwLmRpc2NvdW50UmF0ZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJzZWFyY2hfc3VjY2Vzc1wiLCBuYW1lOiBcInBscC5zZWFyY2hTdWNjZXNzXCIsIGV4Y2x1c2l2ZTogW1wicGxwLmlkXCIsIFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgXCJwbHAubmFtZVwiLCBcInBscC5ncm91cFwiLCBcInBscC5jbGFzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQTFBcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LW1haW4tZGV0YWlsc1xcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUERQXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUERQXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQRFB8UExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFBEUHxQTFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImVtcHR5X2Jhc2tldF90ZXh0XFxcIl1cIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFBEUHxQTFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFBEUHxQTFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQRFB8UExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbaWQqPVxcXCJjYXJ0X3F1YW50aXR5XFxcIl0sIFtjbGFzcyo9XFxcImJhc2tldF9sZW5ndGhcXFwiXVwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC10aXRsZVxcXCJdLCBbY2xhc3MqPVxcXCJoZWFkZXItYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJzcGFuLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjc2FsZXMtcHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImRpdi5wcm9kdWN0LXByaWNlLWJveFwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI21vYmlsZS1wcm9kdWN0LXN0aWNreVwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1jYXJkW2RhdGEtcHJvZHVjdC1za3VdXCIsIG5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcm9kdWN0LXNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtbGlzdFwiLCBuYW1lOiBcIl9fbGlzdGluZ0l0ZW1CbG9ja09ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIC8vIE1vYmlsZSBvYnNlcnZlciBmb3IgdGhlIGZ1bGwgZm9ybSBibG9jayBhcyBpdCBpcyBjb21wbGV0ZWx5IHJlcGxhY2VkXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fb3JkZXItcHJpY2UtdG90YWxcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi52dm5zLW9yZGVyLWNvbXBsZXRlZC1wYWdlX19vcmRlci1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fb3JkZXItdGl0bGVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fcGF5bWVudC10aXRsZVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi52dm5zLW9yZGVyLWNvbXBsZXRlZC1wYWdlX19vcmRlci1saXN0LXdyYXBwZXJcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtcG5cIiwgbmFtZTogXCJwZHAubXBuXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIml0ZW1MaXN0RWxlbWVudC4qLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcImJyZWFkY3J1bWIuaXRlbUxpc3RFbGVtZW50LiouaXRlbS5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gV2luZG93IGN1c3RvbSBlbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiZmF2b3JpdGVQcm9kdWN0c1wiLCBuYW1lOiBcInZpZXcuZmF2b3JpdGVkTVBOc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCIsIGZvcm1hdHRlcjogXCJ0b1N0cmluZ1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcbl07XG5cbmV4cG9ydCBjb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcInZhbGNudHNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcInN1bXZhbHNcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJzdW12YWxzXCIsIHdpbmRvdzogXCJhbGx0aW1lXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfYWxsdGltZVwifSxcbiAgXSxcbiAgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLmxhc3RDYXJ0Q291cG9uQXBwbGljYWJsZVwifSxcbiAgXSxcbiAgXCJwZHAuY2F0ZWdvcnlcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwidmFsY250c1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhcnJ5U2t1VG9GZWF0dXJlc1wifSxcbiAgXSxcbiAgXCJjYXJ0LmlzZW1wdHlcIjogW1xuICAgIHtkZXJpdmVNZXRob2Q6IFwiY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlc1wifSxcbiAgXSxcbiAgXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIn0sXG4gIF0sXG4gIFwiY2FydC5wcmljZXNcIjogW1xuICAgIHtkZXJpdmVNZXRob2Q6IFwiY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlc1wifSxcbiAgXSxcbiAgXCJjYXJ0LnF1YW50aXRpZXNcIjogW1xuICAgIHtkZXJpdmVNZXRob2Q6IFwiY2FsY3VsYXRlQ291cG9uQWxsb3dhbmNlc1wifSxcbiAgXSxcbiAgXCJwZHAuc2t1XCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhcnJ5U2t1VG9GZWF0dXJlc1wifSxcbiAgXSxcbn07XG5cbmV4cG9ydCBjb25zdCBjdXN0b21EZXJpdmF0aW9uUmVwbyA9IHt9O1xuLy8gZnVuY3Rpb25zIG11c3QgaGF2ZSAzIGlucHV0IHBhcmFtZXRlcnM6IGJhc2VGZWF0dXJlTmFtZSwgZ2V0RnJvbUJlYWdsZUluZm9MYXllciBhbmQgYWRkVG9CZWFnbGVJbmZvTGF5ZXJcblxuLy8gcHVzaCBhIG5ldyBmdW5jdGlvbiB0byB0aGUgcmVwbyB0byBjcmVhdGUgYSBuZXcgY3VzdG9tIGRlcml2YXRpb25cbmN1c3RvbURlcml2YXRpb25SZXBvLmNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXMgPSBgXG5yZXR1cm4gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgZ2V0RnJvbUJlYWdsZUluZm9MYXllciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIpID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBjYXJ0IHRvdGFsIHByb2R1Y3QgcHJpY2UgaXMgbm90IGF2YWlsYWJsZSBhbnl3aGVyZSwgc3BlY2lhbCBkaXNjb3VudHMgZXRjIGFyZSBoYXJkIHRvIHNjcmFwZSwgc28gcmVjYWxjdWxhdGUgaXRcbiAgICBjb25zdCBbaXNDYXJ0RW1wdHksIHRvdGFsQmFzZVByaWNlLCBjb3Vwb25Ob3RBcHBsaWNhYmxlLCBwcmljZXMsIHF1YW50aXRpZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuaXNlbXB0eVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnByaWNlc1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnF1YW50aXRpZXNcIiksXG4gICAgXSk7XG5cbiAgICBsZXQgdG90YWxQcmljZSA9IDA7XG5cbiAgICBpZiAoIXRvdGFsQmFzZVByaWNlICYmIHByaWNlcyAmJiBBcnJheS5pc0FycmF5KHByaWNlcykgJiYgcHJpY2VzLmxlbmd0aCA+IDAgJiYgcXVhbnRpdGllcyAmJiBBcnJheS5pc0FycmF5KHF1YW50aXRpZXMpICYmIHF1YW50aXRpZXMubGVuZ3RoID4gMCAmJiBwcmljZXMubGVuZ3RoID09PSBxdWFudGl0aWVzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG90YWxQcmljZSArPSBwYXJzZUludChwcmljZXNbaV0pICogcGFyc2VJbnQocXVhbnRpdGllc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvdGFsUHJpY2UgPSBwYXJzZUludCh0b3RhbEJhc2VQcmljZSk7XG4gICAgfVxuXG4gICAgbGV0IGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSAmJiBjb3Vwb25Ob3RBcHBsaWNhYmxlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gdG90YWxQcmljZSAtIHBhcnNlSW50KGNvdXBvbk5vdEFwcGxpY2FibGUpO1xuICAgIH0gZWxzZSBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSBwYXJzZUludCh0b3RhbFByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCIsIGNvdXBvbkFwcGxpY2FibGVBbW91bnQpO1xuXG4gICAgaWYgKGlzQ2FydEVtcHR5KSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxQcmljZVwiLCAwKTtcbiAgICAgIC8vIE5PVEU6IGNhcnQuY291cG9uTm90QXBwbGljYWJsZSBpcyBhbHNvIGEgdHJpZ2dlciwgdG8gcHJldmVudCBpbmZpbml0ZSBsb29wLCBvbmx5IHNldCBpdCBpZiBpdCBpcyBub3QgYWxyZWFkeSBzZXQgb3Igbm90IHRoZSB0cmlnZ2VyXG4gICAgICBpZiAoYmFzZUZlYXR1cmVOYW1lICE9PSBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiICYmIChjb3Vwb25Ob3RBcHBsaWNhYmxlID09PSBudWxsIHx8IHBhcnNlSW50KGNvdXBvbk5vdEFwcGxpY2FibGUpICE9PSAwKSkge1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxufTtcbmA7XG5cbmN1c3RvbURlcml2YXRpb25SZXBvLmNhcnJ5U2t1VG9GZWF0dXJlcyA9IGBcbnJldHVybiBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCBhZGRUb0JlYWdsZUluZm9MYXllcikgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIC8vIFByb2R1Y3QgcGFnZSAtLT4gdHJhbnNmZXIgc2t1cyB0byBzaW5nbGUgbG9jYXRpb25cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJQcm9kdWN0cGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIik7XG4gICAgaWYgKHNrdSAhPT0gbnVsbCAmJiBza3UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgW3NrdV0pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiYmFza2V0XCIpIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuc2t1c1wiKTtcbiAgICBpZiAoc2t1TGlzdCAhPT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KHNrdUxpc3QpICYmIHNrdUxpc3QubGVuZ3RoKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBza3VMaXN0KTtcbiAgICB9XG4gIH1cbn07XG5gO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtmb3JtYXREZWxpdmVyeURhdGUsIGlzT3duTXV0YXRpb259IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4vY29sbGVjdG9yXCI7XG5pbXBvcnQge3NlYXJjaFBhdGhzLCBmZWF0dXJlRW5naW5lZXJpbmdPcHMsIGN1c3RvbURlcml2YXRpb25SZXBvfSBmcm9tIFwiLi9jb25maWdzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBpOiB7fSwgX19od206IDAsXG59O1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdkluZm9MYXllclwiKTtcblxuY29uc3QgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00gPSAoKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmZvTGF5ZXIuX19od20gKz0gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUb0JlYWdsZUluZm9MYXllciA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gaWYgdmFsdWUgaXMgc3RyaW5nLCBhZGQgYXMgYSBjbGVhbiBzdHJpbmcsIGlmIG9iamVjdCBhZGQgdGhlIHNhbWVcbiAgY29uc3QgdHlwZWRWYWx1ZSA9IHR5cGVvZiAodmFsdWUpID09PSBcInN0cmluZ1wiID8gdmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiB2YWx1ZTtcbiAgLy8gaWYga2V5IGNvbnRhaW5zIC4gY3JlYXRlIG5lc3RlZCBvYmplY3RcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgb2JqW2tleV0gPSB7fTtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIG9ialtsYXN0S2V5XSA9IHR5cGVkVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaW5mb0xheWVyW2tleV0gPSB0eXBlZFZhbHVlO1xuICB9XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBpZiAodHlwZWRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVkVmFsdWUgIT09IG51bGwpIHtcbiAgICB1cGRhdGVEZXJpdmF0aW9ucyhrZXksIHR5cGVkVmFsdWUpO1xuICAgIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgdHlwZWRWYWx1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IERBVEFfTElTVEVORVJTID0ge307XG5cbmV4cG9ydCBjb25zdCBhZGREYXRhTGlzdGVuZXIgPSAoa2V5LCBsaXN0ZW5lcikgPT4ge1xuICBpZiAoIURBVEFfTElTVEVORVJTW2tleV0pIHtcbiAgICBEQVRBX0xJU1RFTkVSU1trZXldID0gW107XG4gIH1cbiAgREFUQV9MSVNURU5FUlNba2V5XS5wdXNoKGxpc3RlbmVyKTtcbn07XG5cbmNvbnN0IHByZXZQYXNzZWRWYWx1ZXMgPSB7fTtcblxuY29uc3QgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBpZiAocHJldlBhc3NlZFZhbHVlc1trZXldID09PSB2YWx1ZSkge1xuICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiBza2lwcGluZyBkdWUgdG8gcmUtcGFzcyBvZiB0aGUgc2FtZSB2YWx1ZSAke3ZhbHVlfSBvZiBrZXkgJHtrZXl9YCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgICBwcmV2UGFzc2VkVmFsdWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nIGtleTogJHtsYXN0S2V5fWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9ucyhrZXksIG51bGwpO1xuICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRyZWF0bWVudCA9IChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIHN0YXR1cywgZGVwZW5kYW50X29uX3RyZWF0bWVudCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQpIHZhbHVlLmJ1c2luZXNzUnVsZUlkID0gYnVzaW5lc3NSdWxlSWQ7XG4gIGlmICh2YXJpYW50KSB2YWx1ZS52YXJpYW50ID0gdmFyaWFudDtcbiAgaWYgKGRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImVsaWdpYmxlXCI6XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImlnbm9yZWRcIjpcbiAgICAgIGluZm9MYXllci5pW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZG4ndCBhZGQgcm9ib3QsIHVua25vd24gc3RhdHVzOiBcIiwgc3RhdHVzKTtcbiAgICAgIHJldHVybjtcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xufTtcblxuY29uc3QgUEFSU0VTRUFSQ0hNQVhSRVRSWSA9IDEwO1xuY29uc3QgUEFSU0VTRUFSQ0hTVEFSVERFTEFZID0gMTA7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG5cbmNvbnN0IGN1c3RvbURlcml2YXRpb25Db21waWxlZFJlcG8gPSB7fTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnMgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKSA9PiB7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAvLyBEbyB1cGRhdGVzIGZpcnN0XG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AudXBkYXRlTWV0aG9kID09PSBudWxsIHx8IEZFT3AudXBkYXRlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgYXdhaXQgdXBkYXRlSW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCBGRU9wLnVwZGF0ZU1ldGhvZCk7XG4gICAgfVxuICAgIC8vIFByb2Nlc3MgcXVlcmllcyBhZnRlciB0aGUgdXBkYXRlc1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnF1ZXJ5TWV0aG9kID09PSBudWxsIHx8IEZFT3AucXVlcnlNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgcXVlcnlJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIEZFT3AucXVlcnlNZXRob2QsIEZFT3Aud2luZG93KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgIH1cblxuICAgIC8vIFByb2Nlc3MgZGVyaXZhdGlvbnMgYWZ0ZXIgdGhlIHVwZGF0ZXNcbiAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICBpZiAoRkVPcC5kZXJpdmVNZXRob2QgPT09IG51bGwgfHwgRkVPcC5kZXJpdmVNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICBjb25zdCBkZXJpdmVGdW5jdFN0cmluZyA9IGN1c3RvbURlcml2YXRpb25SZXBvW0ZFT3AuZGVyaXZlTWV0aG9kXTtcbiAgICAgIGlmIChkZXJpdmVGdW5jdFN0cmluZyA9PT0gbnVsbCB8fCBkZXJpdmVGdW5jdFN0cmluZyA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIGZyb20gdGhlIHN0cmluZyBmcm9tIHRoZSByZXBvXG4gICAgICBsZXQgZGVyaXZlRnVuY3QgPSBjdXN0b21EZXJpdmF0aW9uQ29tcGlsZWRSZXBvW0ZFT3AuZGVyaXZlTWV0aG9kXTtcbiAgICAgIC8vIGNhY2hlIGNvbXBpbGVkIGZ1bmN0aW9uXG4gICAgICBpZiAoZGVyaXZlRnVuY3QgPT09IG51bGwgfHwgZGVyaXZlRnVuY3QgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZGVyaXZlRnVuY3QgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBjcmVhdGUgYW4gYXN5bmMgZnVuY3Rpb24gdXNpbmcgc3RyaW5nIGdlbmVyYXRvclxuICAgICAgICBkZXJpdmVGdW5jdCA9IG5ldyBGdW5jdGlvbihkZXJpdmVGdW5jdFN0cmluZykoKTtcbiAgICAgICAgY3VzdG9tRGVyaXZhdGlvbkNvbXBpbGVkUmVwb1tGRU9wLmRlcml2ZU1ldGhvZF0gPSBkZXJpdmVGdW5jdDtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5sb2coXCJ1cGRhdGVEZXJpdmF0aW9uczpcIiwgYmFzZUZlYXR1cmVOYW1lLCBGRU9wLmRlcml2ZU1ldGhvZCk7XG4gICAgICBhd2FpdCBkZXJpdmVGdW5jdChiYXNlRmVhdHVyZU5hbWUsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIGFkZFRvQmVhZ2xlSW5mb0xheWVyKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHByb2Nlc3NGb3JtYXR0ZXIgPSAodmFsdWUsIGZvcm1hdHRlcikgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCAhZm9ybWF0dGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3dpdGNoIChmb3JtYXR0ZXIpIHtcbiAgICBjYXNlIFwidXBwZXJDYXNlVFJcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKFwidHItVFJcIik7XG4gICAgY2FzZSBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwiOlxuICAgICAgcmV0dXJuIGZvcm1hdERlbGl2ZXJ5RGF0ZSh2YWx1ZSk7XG4gICAgY2FzZSBcIm51bWVyaWNPbmx5XCI6XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgIGNhc2UgXCJsb3dlckNhc2VUUkZpcnN0V29yZFwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoXCJ0ci1UUlwiKS5zcGxpdChcIiBcIilbMF07XG4gICAgY2FzZSBcImRlYXJyYXlcIjpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBjYXNlIFwidG9TdHJpbmdcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKTtcbiAgICBjYXNlIFwicGFnZVR5cGVHQTJHbG92XCI6XG4gICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgXCJQcm9kdWN0cGFnZVwiOlxuICAgICAgICAgIHJldHVybiBcIlBEUFwiO1xuICAgICAgICBjYXNlIFwiTGlzdGluZ3BhZ2VcIjpcbiAgICAgICAgICByZXR1cm4gXCJQTFBcIjtcbiAgICAgICAgY2FzZSBcImJhc2tldFwiOlxuICAgICAgICAgIHJldHVybiBcIkJhc2tldFwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hPYmogPSAob2JqLCBzZWFyY2hFbGVtZW50KSA9PiB7XG4gIGxldCB2YWx1ZTtcbiAgbGV0IGxheWVyVmFsdWU7XG5cbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHNlYXJjaEVsZW1lbnQub3BlcmFuZCkge1xuICAgICAgY2FzZSBcIkpTT05GaWx0ZXJPdGhlclwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlsdGVyUGFyYW1zID0gc2VhcmNoRWxlbWVudC52YWx1ZS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgaWYgKGZpbHRlclBhcmFtcy5sZW5ndGggIT09IDIpIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGZpbHRlck5hbWUgPSBmaWx0ZXJQYXJhbXNbMF07XG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBmaWx0ZXJQYXJhbXNbMV07XG4gICAgICAgICAgaWYgKCFmaWx0ZXJOYW1lIHx8ICFmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaCA9IGpzb25HZXQob2JqLCBmaWx0ZXJOYW1lKTtcblxuICAgICAgICAgIGlmICghZmlsdGVyTWF0Y2ggfHwgZmlsdGVyTWF0Y2ggIT09IGZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGlmICh2YWx1ZSAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlPYnNlcnZlXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgY29uc3QgdG9CZVVwZGF0ZWQgPSBbXTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gc2VhcmNoUGF0aHMuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT09IGNoaWxkKTtcbiAgICAgICAgICAgIC8vIGFkZCBjaGlsZEVsZW1lbnRzIGludG8gdG9CZVVwZGF0ZWRcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLnB1c2goLi4uY2hpbGRFbGVtZW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gcnVuIG9ubHkgaWYgdGhlIGVsZW1lbnQgaGFzIGFkZGVkIG9yIHJlbW92ZWQgY2hpbGRyZW5cbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGFzeW5jIGZ1bmN0aW9uKG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICAgIGlmIChpc093bk11dGF0aW9uKG11dGF0aW9uTGlzdCkpIHJldHVybjtcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgZWxlbWVudC5pc0ZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIoZWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdHJpZ2dlclJlc3RhcnQgPSBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPj0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG4gICAgICAgICAgICBpZiAodHJpZ2dlclJlc3RhcnQpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcInNlYXJjaE9iajogdHJpZ2dlcmVkIGEgcmVzdGFydCBvZiBzZWFyY2hwYXRocyBkdWU6IFwiLCBzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgICBzdGFydEluZm9MYXllclNjYW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHZhbHVlLCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIjpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlTGlzdCA9IFtdO1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlID0gdmFsdWVjaGlsZC5nZXRBdHRyaWJ1dGUoc2VhcmNoRWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoYXR0cmliVmFsdWUpIHtcbiAgICAgICAgICAgICAgYXR0cmliVmFsdWVMaXN0LnB1c2goYXR0cmliVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGF0dHJpYlZhbHVlTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBzZXRWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMDtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2V0VmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUNvdW50RWx0c1wiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNlYXJjaEVsZW1lbnQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBsZXQgc3VtUHJpY2UgPSAwO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHN1bVByaWNlICs9IHBhcnNlSW50KGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdW1QcmljZSA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBzdW1QcmljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGFycmF5SW5uZXJUZXh0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhcnJheUlubmVyVGV4dC5wdXNoKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUlubmVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXJyYXlJbm5lclRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9IC8vIHN3aXRjaFxuXG4gICAgaWYgKGxheWVyVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBsYXllclZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpIHtcbiAgICAgICAgbGF5ZXJWYWx1ZSA9IHByb2Nlc3NGb3JtYXR0ZXIobGF5ZXJWYWx1ZSwgc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpO1xuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoc2VhcmNoRWxlbWVudC5uYW1lLCBsYXllclZhbHVlKTtcbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG5cbiAgICAgIC8vIG1hcmsgZXhjbHVzaXZlIGVsZW1lbnRzIGFzIGZvdW5kXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSkgJiYgc2VhcmNoRWxlbWVudC5leGNsdXNpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZUVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUuaW5jbHVkZXMoZXhjbHVzaXZlRWxlbWVudC5uYW1lKSkge1xuICAgICAgICAgICAgZXhjbHVzaXZlRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwic2VhcmNoT2JqIGVycm9yOiBcIiArIGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IHBhcnNlU2VhcmNoUGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRvbVN0YXR1cyA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIC8vIGNoZWNrIGlmIGRvY3VtZW50IGFuZCBkb20gaXMgbG9hZGVkIGFuZCByZWFkeSBmb3Igc2NyYXBwaW5nXG4gIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGluaXRpYWxpemVkIHdpdGggZG9tIHN0YXR1czogIFwiICsgZG9tU3RhdHVzKTtcblxuICBjb25zdCB3aW50b3AgPSB3aW5kb3cudG9wO1xuICBjb25zdCBkYXRhTGF5ZXIgPSB3aW50b3AuZGF0YUxheWVyO1xuICBjb25zdCB3aW5kb2MgPSB3aW50b3AuZG9jdW1lbnQ7XG4gIGxldCBzb3JnQXJyYXlJbm5lcjtcblxuICBjb25zdCBmb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBwcmV2Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgbm90Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcblxuICAvLyBQYWdlVHlwZSBjYW4gYmUgaW5mZXJyZWQgZnJvbSBVUkwsIGlmIGZvdW5kIHVzZSBpdCBmcm9tIHRoZXJlXG4gIGxldCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG5cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSkge1xuICAgIHByZXZGb3VuZE5hbWVzLmFkZChcIlBhZ2VUeXBlXCIpO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHNlYXJjaCBsaXN0cyBhbmQgbWFyayBmb3VuZCBuYW1lc1xuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICBwcmV2Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChmb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpIHx8IHByZXZGb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAvLyBoYWQgYWxyZWFkeSBmb3VuZCB0aGlzIGVsZW1lbnQgb24gYW5vdGhlciBwYXJzZSBpdGVtXG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQgIT09IFwiKlwiKSB7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG4gICAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZC5pbmRleE9mKGN1cnJlbnRQYWdlVHlwZSkgPCAwKSB7XG4gICAgICAgIC8vIHNraXAgc2VhcmNoRWxlbWVudCBiZWNhdXNlIG9mIFBhZ2VUeXBlRGVwZW5kXG4gICAgICAgIHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiU2luZ2xlV1RcIikgeyAvLyBTQ0FOIFdpbmRvdyBmb3IgU2luZ2xlIEVsZW1lbnRzXG4gICAgICBzZWFyY2hBbmRTZXQod2ludG9wLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkdBRGF0YUxheWVyXCIpIHsgLy8gU0NBTiBHQSBEQVRBIExBWUVSXG4gICAgICBmb3IgKGNvbnN0IGRhdGFMYXllckl0ZW0gb2YgZGF0YUxheWVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChkYXRhTGF5ZXJJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1NvcmdcIikgeyAvLyBTQ0FOIFNPUkcgQVJSQVlcbiAgICAgIGlmICghc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc29yZ0FycmF5SW5uZXIgPSBnZXRTT1JHQXJyYXkoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgc29yZ0l0ZW0gb2Ygc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KHNvcmdJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1F1ZXJ5XCIpIHsgLy8gU0NBTiBET0NVTUVOVFxuICAgICAgc2VhcmNoQW5kU2V0KHdpbmRvYywgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSAvLyBET0NRVUVSWSBwYXJzZVxuICB9XG5cbiAgaWYgKG5vdEZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgZm91bmQgYWxsIGVsZW1lbnRzIC0gc2V0dGluZyByZXRyeSB0byBtYXhcIik7XG4gIH0gZWxzZSBpZiAoZm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgLy8gdXBkYXRlIHJldHJ5IGNvdW50ZXIgYW5kIGRlbGF5IG9ubHkgaWYgZG9tIGlzIGFjdGl2ZVxuICAgIGlmIChkb21TdGF0dXMgPT09IFwiY29tcGxldGVcIiB8fCBkb21TdGF0dXMgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICo9IDI7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKz0gMTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQgYnV0IG5vdCBmb3VuZCBhbnksIHNldHRpbmcgZGVsYXkgYW5kIHJldHJ5IHRvIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwiIGFuZCBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKyBcIiBmb3Igbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl1cIixcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZDogbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl0gYW5kIGZvdW5kIFwiICtcbiAgICAgIGZvdW5kTmFtZXMuc2l6ZSxcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hBbmRTZXQgPSAob2JqLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKSA9PiB7XG4gIGlmIChzZWFyY2hPYmoob2JqLCBzZWFyY2hFbGVtZW50KSkge1xuICAgIGZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfVxufTtcblxuLy8gcGFyc2Ugc291cmNlXG5leHBvcnQgY29uc3Qgc3RhcnRJbmZvTGF5ZXJTY2FuID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGF3YWl0IHBhcnNlU2VhcmNoUGF0aHMoKTtcbiAgaWYgKHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA8IFBBUlNFU0VBUkNITUFYUkVUUlkpIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogc2NoZWR1bGVkIHRvIGJlIHJlY2FsbGVkIGluIFwiICsgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCJtc1wiKTtcbiAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgc3RhcnRJbmZvTGF5ZXJTY2FuKCk7XG4gICAgfSwgcGFyc2VTZWFyY2hQYXRoc0RlbGF5KTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbi8vIFRPRE86IG1vdmUgdGhpcyB0byBhbiBcImVsZW1lbnQgY29sbGVjdG9yXCIgbW9kdWxlLCB0aGVuIGRhdGEgaXMgZXh0cmFjdGVkIGZyb20gcHJlLWNvbGxlY3RlZCBlbGVtZW50c1xuY29uc3QgZ2V0U09SR0FycmF5ID0gKCkgPT4ge1xuICBjb25zdCBzY2hlbWFPcmdFbHRzID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW3R5cGU9XFxcImFwcGxpY2F0aW9uL2xkK2pzb25cXFwiXVwiKTtcbiAgY29uc3Qgc29yZ0FycmF5ID0gW107XG5cbiAgZm9yIChjb25zdCBzVGFnIG9mIHNjaGVtYU9yZ0VsdHMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY250bnQgPSBzVGFnLnRleHRDb250ZW50O1xuICAgICAgY29uc3QganNvbmNvbnRlbnQgPSBKU09OLnBhcnNlKGNudG50KTtcbiAgICAgIHNvcmdBcnJheS5wdXNoKGpzb25jb250ZW50KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNvcmdBcnJheTtcbn07XG4iLCJpbXBvcnQge0xPR19BUElfVVJMfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdkJlYWNvblwiKTtcbmNvbnN0IEhFQURFUlMgPSB7XG4gIHR5cGU6IFwidGV4dC9wbGFpblwiLFxufTtcblxuZXhwb3J0IGNsYXNzIEJlYWNvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgYmVhY29uIHNlbmRlclwiKTtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gU2VuZCBpbml0aWFsIGxvZyBib2R5IGFuZCBpbmNyZW1lbnRhbCB1cGRhdGUgbG9ncyBvbiBjbG9zZVxuICBhc3luYyBoYW5kbGVDbG9zZUV2ZW50KCkge1xuICAgIC8vIGlmIGluaXRpYWwgbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgc2VuZCB1cGRhdGVzIGFuZCBpbmZvbGF5ZXIgaW4gb25lIGJhdGNoXG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgLy8gaWYgbWFpbiBsb2cgaGFzIGJlZW4gc2VudCwgc2VuZCBpbmNyZW1lbnRhbCB1cGRhdGVzIG9ubHlcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCk7XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVNYWluTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VNYWluTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcXVlc3QgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKSB7XG4gICAgaWYgKCF0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzVXBkYXRlc1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgdGhlcmUgaXMgbm8gaW5jcmVtZW50YWwgeWV0XG4gICAgICAvLyBvciBpZiB0aGUgdXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPSBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9ncyBjaGFuZ2Ugc3RhdHVzOiBcIiwgaGFzQ2hhbmdlZCk7XG4gICAgaWYgKCFoYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICBjb25zdCBsb2dEYXRhID0gYXdhaXQgdGhpcy5wYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCk7XG4gICAgaWYgKGxvZ0RhdGEpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZW5kaW5nIGluY3JlbWVudGFsIGxvZ3NcIiwgbG9nRGF0YSk7XG4gICAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKGxvZ0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUFycml2YWxMb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgb3IgYXJyaXZhbCBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlQXJyaXZhbExvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh3bSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2h3bVwiKTtcbiAgICBpZiAodGhpcy5oaWdoV2F0ZXJNYXJrICE9PSBod20pIHtcbiAgICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgaSwgcywgbSwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiaVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm1cIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMixcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICBhLCBlLCBmLCBpLCBzLCBtLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxldCB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBleGl0IGV2ZW50IGxpc3RlbmVyXCIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBiZWZvcmV1bmxvYWQgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBwYWdlaGlkZSBldmVudFwiKTtcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgLy8gSWYgcGFnZSBpcyBub3QgdmlzaWJsZSBhbmQgZG9lc24ndCBiZWNvbWUgdmlzaWJsZSB3aXRoaW4gMzAgc2Vjb25kcywgc2VuZCBsb2dzXG4gICAgICAgIHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluIHRpbWVvdXRcIik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gQ2xlYXIgdGltZW91dCB3aGVuIHBhZ2UgaXMgdmlzaWJsZSB0byBtYWtlIHN1cmUgd2Ugc2VuZCB0aGUgbGF0ZXN0IGxvZ3MgcG9zc2libGVcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgfVxuXG4gIHF1ZXVlTG9ncyhsb2dEYXRhKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fCB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZmV0Y2goTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgY29uc3QgcXVldWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghcXVldWVkKSBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3MgcXVldWVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gICAgaWYgKHF1ZXVlZCkgcmV0dXJuO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmVhY29uO1xuIiwiaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJSZXBsYWNlVXRpbHNcIik7XG5cbmNvbnN0IHJlcGxhY2VyID0gYXN5bmMgKHZhbHVlLCByZXBsYWNlRm4pID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBbaSwgdmFsXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBsYWNlRm4gPSBBcnJheS5pc0FycmF5KHJlcGxhY2VGbikgPyByZXBsYWNlRm5baV0gOiByZXBsYWNlRm4gfHwgXCJcIjtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihjdXJyZW50UmVwbGFjZUZuKTtcbiAgICAgICAgdmFsdWVbaV0gPSByZXBsYWNlQWxsKHZhbCwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZVtpXSA9IHJlcGxhY2VGbkV4ZWN1dG9yKGN1cnJlbnRSZXBsYWNlRm4sIHZhbCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSkge1xuICAgIGZvciAoY29uc3QgckZuIG9mIHJlcGxhY2VGbikge1xuICAgICAgaWYgKHR5cGVvZiByRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IockZuKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyRm4sIHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbik7XG4gICAgICB2YWx1ZSA9IHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSwgc2luZ2xlID0gZmFsc2UpIHtcbiAgaWYgKHJlcGxhY2VGbiAmJiB2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkV4ZWN1dGluZyByZXBsYWNlIGZ1bmN0aW9uOiBcIiwgcmVwbGFjZUZuKTtcbiAgICBjb25zdCByZXBsYWNlRnVuY3Rpb24gPSBGdW5jdGlvbihyZXBsYWNlRm4pO1xuICAgIGlmIChzaW5nbGUpIHJldHVybiB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICAgIHJldHVybiByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKSB7XG4gIGNvbnN0IHtzdG9yYWdlLCBrZXksIGtleUZhbGxiYWNrLCB0eXBlfSA9IHJlcGxhY2VGbjtcbiAgc3dpdGNoIChzdG9yYWdlKSB7XG4gICAgY2FzZSBcInNlc3Npb25cIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBudWxsO1xuICAgICAgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlGYWxsYmFjayk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSBKU09OLnBhcnNlKHJlcGxhY2VWYWwpO1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSByZXBsYWNlVmFsW3JlcGxhY2VWYWwubGVuZ3RoIC0gMV1bdHlwZV07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkIG5vdCBwYXJzZSAke3JlcGxhY2VWYWx9YCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgICBjYXNlIFwiaW5mby1sYXllclwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5RmFsbGJhY2spO1xuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VyO1xuIiwiY29uc3QgaW5zdGFuY2VPZkFueSA9IChvYmplY3QsIGNvbnN0cnVjdG9ycykgPT4gY29uc3RydWN0b3JzLnNvbWUoKGMpID0+IG9iamVjdCBpbnN0YW5jZW9mIGMpO1xuXG5sZXQgaWRiUHJveHlhYmxlVHlwZXM7XG5sZXQgY3Vyc29yQWR2YW5jZU1ldGhvZHM7XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldElkYlByb3h5YWJsZVR5cGVzKCkge1xuICAgIHJldHVybiAoaWRiUHJveHlhYmxlVHlwZXMgfHxcbiAgICAgICAgKGlkYlByb3h5YWJsZVR5cGVzID0gW1xuICAgICAgICAgICAgSURCRGF0YWJhc2UsXG4gICAgICAgICAgICBJREJPYmplY3RTdG9yZSxcbiAgICAgICAgICAgIElEQkluZGV4LFxuICAgICAgICAgICAgSURCQ3Vyc29yLFxuICAgICAgICAgICAgSURCVHJhbnNhY3Rpb24sXG4gICAgICAgIF0pKTtcbn1cbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxuZnVuY3Rpb24gZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKSB7XG4gICAgcmV0dXJuIChjdXJzb3JBZHZhbmNlTWV0aG9kcyB8fFxuICAgICAgICAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgPSBbXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmFkdmFuY2UsXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZVByaW1hcnlLZXksXG4gICAgICAgIF0pKTtcbn1cbmNvbnN0IGN1cnNvclJlcXVlc3RNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNhY3Rpb25Eb25lTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHdyYXAocmVxdWVzdC5yZXN1bHQpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgfSk7XG4gICAgcHJvbWlzZVxuICAgICAgICAudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgLy8gU2luY2UgY3Vyc29yaW5nIHJldXNlcyB0aGUgSURCUmVxdWVzdCAoKnNpZ2gqKSwgd2UgY2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbFxuICAgICAgICAvLyAoc2VlIHdyYXBGdW5jdGlvbikuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQkN1cnNvcikge1xuICAgICAgICAgICAgY3Vyc29yUmVxdWVzdE1hcC5zZXQodmFsdWUsIHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhdGNoaW5nIHRvIGF2b2lkIFwiVW5jYXVnaHQgUHJvbWlzZSBleGNlcHRpb25zXCJcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICAvLyBUaGlzIG1hcHBpbmcgZXhpc3RzIGluIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBidXQgZG9lc24ndCBkb2Vzbid0IGV4aXN0IGluIHRyYW5zZm9ybUNhY2hlLiBUaGlzXG4gICAgLy8gaXMgYmVjYXVzZSB3ZSBjcmVhdGUgbWFueSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QuXG4gICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChwcm9taXNlLCByZXF1ZXN0KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih0eCkge1xuICAgIC8vIEVhcmx5IGJhaWwgaWYgd2UndmUgYWxyZWFkeSBjcmVhdGVkIGEgZG9uZSBwcm9taXNlIGZvciB0aGlzIHRyYW5zYWN0aW9uLlxuICAgIGlmICh0cmFuc2FjdGlvbkRvbmVNYXAuaGFzKHR4KSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHR4LmVycm9yIHx8IG5ldyBET01FeGNlcHRpb24oJ0Fib3J0RXJyb3InLCAnQWJvcnRFcnJvcicpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XG4gICAgfSk7XG4gICAgLy8gQ2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbC5cbiAgICB0cmFuc2FjdGlvbkRvbmVNYXAuc2V0KHR4LCBkb25lKTtcbn1cbmxldCBpZGJQcm94eVRyYXBzID0ge1xuICAgIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdHJhbnNhY3Rpb24uZG9uZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZG9uZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uRG9uZU1hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBvYmplY3RTdG9yZU5hbWVzIGJlY2F1c2Ugb2YgRWRnZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnb2JqZWN0U3RvcmVOYW1lcycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lm9iamVjdFN0b3JlTmFtZXMgfHwgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFrZSB0eC5zdG9yZSByZXR1cm4gdGhlIG9ubHkgc3RvcmUgaW4gdGhlIHRyYW5zYWN0aW9uLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG1hbnkuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzFdXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIDogcmVjZWl2ZXIub2JqZWN0U3RvcmUocmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRWxzZSB0cmFuc2Zvcm0gd2hhdGV2ZXIgd2UgZ2V0IGJhY2suXG4gICAgICAgIHJldHVybiB3cmFwKHRhcmdldFtwcm9wXSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbiAmJlxuICAgICAgICAgICAgKHByb3AgPT09ICdkb25lJyB8fCBwcm9wID09PSAnc3RvcmUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0O1xuICAgIH0sXG59O1xuZnVuY3Rpb24gcmVwbGFjZVRyYXBzKGNhbGxiYWNrKSB7XG4gICAgaWRiUHJveHlUcmFwcyA9IGNhbGxiYWNrKGlkYlByb3h5VHJhcHMpO1xufVxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAvLyBEdWUgdG8gZXhwZWN0ZWQgb2JqZWN0IGVxdWFsaXR5ICh3aGljaCBpcyBlbmZvcmNlZCBieSB0aGUgY2FjaGluZyBpbiBgd3JhcGApLCB3ZVxuICAgIC8vIG9ubHkgY3JlYXRlIG9uZSBuZXcgZnVuYyBwZXIgZnVuYy5cbiAgICAvLyBFZGdlIGRvZXNuJ3Qgc3VwcG9ydCBvYmplY3RTdG9yZU5hbWVzIChib29vKSwgc28gd2UgcG9seWZpbGwgaXQgaGVyZS5cbiAgICBpZiAoZnVuYyA9PT0gSURCRGF0YWJhc2UucHJvdG90eXBlLnRyYW5zYWN0aW9uICYmXG4gICAgICAgICEoJ29iamVjdFN0b3JlTmFtZXMnIGluIElEQlRyYW5zYWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IGZ1bmMuY2FsbCh1bndyYXAodGhpcyksIHN0b3JlTmFtZXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLnNldCh0eCwgc3RvcmVOYW1lcy5zb3J0ID8gc3RvcmVOYW1lcy5zb3J0KCkgOiBbc3RvcmVOYW1lc10pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAodHgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBDdXJzb3IgbWV0aG9kcyBhcmUgc3BlY2lhbCwgYXMgdGhlIGJlaGF2aW91ciBpcyBhIGxpdHRsZSBtb3JlIGRpZmZlcmVudCB0byBzdGFuZGFyZCBJREIuIEluXG4gICAgLy8gSURCLCB5b3UgYWR2YW5jZSB0aGUgY3Vyc29yIGFuZCB3YWl0IGZvciBhIG5ldyAnc3VjY2Vzcycgb24gdGhlIElEQlJlcXVlc3QgdGhhdCBnYXZlIHlvdSB0aGVcbiAgICAvLyBjdXJzb3IuIEl0J3Mga2luZGEgbGlrZSBhIHByb21pc2UgdGhhdCBjYW4gcmVzb2x2ZSB3aXRoIG1hbnkgdmFsdWVzLiBUaGF0IGRvZXNuJ3QgbWFrZSBzZW5zZVxuICAgIC8vIHdpdGggcmVhbCBwcm9taXNlcywgc28gZWFjaCBhZHZhbmNlIG1ldGhvZHMgcmV0dXJucyBhIG5ldyBwcm9taXNlIGZvciB0aGUgY3Vyc29yIG9iamVjdCwgb3JcbiAgICAvLyB1bmRlZmluZWQgaWYgdGhlIGVuZCBvZiB0aGUgY3Vyc29yIGhhcyBiZWVuIHJlYWNoZWQuXG4gICAgaWYgKGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkuaW5jbHVkZXMoZnVuYykpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICAgICAgZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoY3Vyc29yUmVxdWVzdE1hcC5nZXQodGhpcykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICByZXR1cm4gd3JhcChmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncykpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgcmV0dXJuIHdyYXBGdW5jdGlvbih2YWx1ZSk7XG4gICAgLy8gVGhpcyBkb2Vzbid0IHJldHVybiwgaXQganVzdCBjcmVhdGVzIGEgJ2RvbmUnIHByb21pc2UgZm9yIHRoZSB0cmFuc2FjdGlvbixcbiAgICAvLyB3aGljaCBpcyBsYXRlciByZXR1cm5lZCBmb3IgdHJhbnNhY3Rpb24uZG9uZSAoc2VlIGlkYk9iamVjdEhhbmRsZXIpLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKVxuICAgICAgICBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odmFsdWUpO1xuICAgIGlmIChpbnN0YW5jZU9mQW55KHZhbHVlLCBnZXRJZGJQcm94eWFibGVUeXBlcygpKSlcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgaWRiUHJveHlUcmFwcyk7XG4gICAgLy8gUmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2sgaWYgd2UncmUgbm90IGdvaW5nIHRvIHRyYW5zZm9ybSBpdC5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB3cmFwKHZhbHVlKSB7XG4gICAgLy8gV2Ugc29tZXRpbWVzIGdlbmVyYXRlIG11bHRpcGxlIHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdCAoZWcgd2hlbiBjdXJzb3JpbmcpLCBiZWNhdXNlXG4gICAgLy8gSURCIGlzIHdlaXJkIGFuZCBhIHNpbmdsZSBJREJSZXF1ZXN0IGNhbiB5aWVsZCBtYW55IHJlc3BvbnNlcywgc28gdGhlc2UgY2FuJ3QgYmUgY2FjaGVkLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlJlcXVlc3QpXG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHZhbHVlKTtcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IHRyYW5zZm9ybWVkIHRoaXMgdmFsdWUgYmVmb3JlLCByZXVzZSB0aGUgdHJhbnNmb3JtZWQgdmFsdWUuXG4gICAgLy8gVGhpcyBpcyBmYXN0ZXIsIGJ1dCBpdCBhbHNvIHByb3ZpZGVzIG9iamVjdCBlcXVhbGl0eS5cbiAgICBpZiAodHJhbnNmb3JtQ2FjaGUuaGFzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKTtcbiAgICAvLyBOb3QgYWxsIHR5cGVzIGFyZSB0cmFuc2Zvcm1lZC5cbiAgICAvLyBUaGVzZSBtYXkgYmUgcHJpbWl0aXZlIHR5cGVzLCBzbyB0aGV5IGNhbid0IGJlIFdlYWtNYXAga2V5cy5cbiAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIHRyYW5zZm9ybUNhY2hlLnNldCh2YWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KG5ld1ZhbHVlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbn1cbmNvbnN0IHVud3JhcCA9ICh2YWx1ZSkgPT4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG5cbmV4cG9ydCB7IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBhcyBhLCBpbnN0YW5jZU9mQW55IGFzIGksIHJlcGxhY2VUcmFwcyBhcyByLCB1bndyYXAgYXMgdSwgd3JhcCBhcyB3IH07XG4iLCJpbXBvcnQgeyB3IGFzIHdyYXAsIHIgYXMgcmVwbGFjZVRyYXBzIH0gZnJvbSAnLi93cmFwLWlkYi12YWx1ZS5qcyc7XG5leHBvcnQgeyB1IGFzIHVud3JhcCwgdyBhcyB3cmFwIH0gZnJvbSAnLi93cmFwLWlkYi12YWx1ZS5qcyc7XG5cbi8qKlxuICogT3BlbiBhIGRhdGFiYXNlLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxuICogQHBhcmFtIHZlcnNpb24gU2NoZW1hIHZlcnNpb24uXG4gKiBAcGFyYW0gY2FsbGJhY2tzIEFkZGl0aW9uYWwgY2FsbGJhY2tzLlxuICovXG5mdW5jdGlvbiBvcGVuREIobmFtZSwgdmVyc2lvbiwgeyBibG9ja2VkLCB1cGdyYWRlLCBibG9ja2luZywgdGVybWluYXRlZCB9ID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbik7XG4gICAgY29uc3Qgb3BlblByb21pc2UgPSB3cmFwKHJlcXVlc3QpO1xuICAgIGlmICh1cGdyYWRlKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigndXBncmFkZW5lZWRlZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdXBncmFkZSh3cmFwKHJlcXVlc3QucmVzdWx0KSwgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgd3JhcChyZXF1ZXN0LnRyYW5zYWN0aW9uKSwgZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJsb2NrZWQpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKGV2ZW50KSA9PiBibG9ja2VkKFxuICAgICAgICAvLyBDYXN0aW5nIGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQtRE9NLWxpYi1nZW5lcmF0b3IvcHVsbC8xNDA1XG4gICAgICAgIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIGV2ZW50KSk7XG4gICAgfVxuICAgIG9wZW5Qcm9taXNlXG4gICAgICAgIC50aGVuKChkYikgPT4ge1xuICAgICAgICBpZiAodGVybWluYXRlZClcbiAgICAgICAgICAgIGRiLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4gdGVybWluYXRlZCgpKTtcbiAgICAgICAgaWYgKGJsb2NraW5nKSB7XG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCd2ZXJzaW9uY2hhbmdlJywgKGV2ZW50KSA9PiBibG9ja2luZyhldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCBldmVudCkpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgcmV0dXJuIG9wZW5Qcm9taXNlO1xufVxuLyoqXG4gKiBEZWxldGUgYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqL1xuZnVuY3Rpb24gZGVsZXRlREIobmFtZSwgeyBibG9ja2VkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSk7XG4gICAgaWYgKGJsb2NrZWQpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKGV2ZW50KSA9PiBibG9ja2VkKFxuICAgICAgICAvLyBDYXN0aW5nIGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQtRE9NLWxpYi1nZW5lcmF0b3IvcHVsbC8xNDA1XG4gICAgICAgIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50KSk7XG4gICAgfVxuICAgIHJldHVybiB3cmFwKHJlcXVlc3QpLnRoZW4oKCkgPT4gdW5kZWZpbmVkKTtcbn1cblxuY29uc3QgcmVhZE1ldGhvZHMgPSBbJ2dldCcsICdnZXRLZXknLCAnZ2V0QWxsJywgJ2dldEFsbEtleXMnLCAnY291bnQnXTtcbmNvbnN0IHdyaXRlTWV0aG9kcyA9IFsncHV0JywgJ2FkZCcsICdkZWxldGUnLCAnY2xlYXInXTtcbmNvbnN0IGNhY2hlZE1ldGhvZHMgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB7XG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSURCRGF0YWJhc2UgJiZcbiAgICAgICAgIShwcm9wIGluIHRhcmdldCkgJiZcbiAgICAgICAgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYWNoZWRNZXRob2RzLmdldChwcm9wKSlcbiAgICAgICAgcmV0dXJuIGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApO1xuICAgIGNvbnN0IHRhcmdldEZ1bmNOYW1lID0gcHJvcC5yZXBsYWNlKC9Gcm9tSW5kZXgkLywgJycpO1xuICAgIGNvbnN0IHVzZUluZGV4ID0gcHJvcCAhPT0gdGFyZ2V0RnVuY05hbWU7XG4gICAgY29uc3QgaXNXcml0ZSA9IHdyaXRlTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSk7XG4gICAgaWYgKFxuICAgIC8vIEJhaWwgaWYgdGhlIHRhcmdldCBkb2Vzbid0IGV4aXN0IG9uIHRoZSB0YXJnZXQuIEVnLCBnZXRBbGwgaXNuJ3QgaW4gRWRnZS5cbiAgICAhKHRhcmdldEZ1bmNOYW1lIGluICh1c2VJbmRleCA/IElEQkluZGV4IDogSURCT2JqZWN0U3RvcmUpLnByb3RvdHlwZSkgfHxcbiAgICAgICAgIShpc1dyaXRlIHx8IHJlYWRNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtZXRob2QgPSBhc3luYyBmdW5jdGlvbiAoc3RvcmVOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6IHVuZGVmaW5lZCBnemlwcHMgYmV0dGVyLCBidXQgZmFpbHMgaW4gRWRnZSA6KFxuICAgICAgICBjb25zdCB0eCA9IHRoaXMudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknKTtcbiAgICAgICAgbGV0IHRhcmdldCA9IHR4LnN0b3JlO1xuICAgICAgICBpZiAodXNlSW5kZXgpXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQuaW5kZXgoYXJncy5zaGlmdCgpKTtcbiAgICAgICAgLy8gTXVzdCByZWplY3QgaWYgb3AgcmVqZWN0cy5cbiAgICAgICAgLy8gSWYgaXQncyBhIHdyaXRlIG9wZXJhdGlvbiwgbXVzdCByZWplY3QgaWYgdHguZG9uZSByZWplY3RzLlxuICAgICAgICAvLyBNdXN0IHJlamVjdCB3aXRoIG9wIHJlamVjdGlvbiBmaXJzdC5cbiAgICAgICAgLy8gTXVzdCByZXNvbHZlIHdpdGggb3AgdmFsdWUuXG4gICAgICAgIC8vIE11c3QgaGFuZGxlIGJvdGggcHJvbWlzZXMgKG5vIHVuaGFuZGxlZCByZWplY3Rpb25zKVxuICAgICAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRhcmdldFt0YXJnZXRGdW5jTmFtZV0oLi4uYXJncyksXG4gICAgICAgICAgICBpc1dyaXRlICYmIHR4LmRvbmUsXG4gICAgICAgIF0pKVswXTtcbiAgICB9O1xuICAgIGNhY2hlZE1ldGhvZHMuc2V0KHByb3AsIG1ldGhvZCk7XG4gICAgcmV0dXJuIG1ldGhvZDtcbn1cbnJlcGxhY2VUcmFwcygob2xkVHJhcHMpID0+ICh7XG4gICAgLi4ub2xkVHJhcHMsXG4gICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxuICAgIGhhczogKHRhcmdldCwgcHJvcCkgPT4gISFnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5oYXModGFyZ2V0LCBwcm9wKSxcbn0pKTtcblxuZXhwb3J0IHsgZGVsZXRlREIsIG9wZW5EQiB9O1xuIiwiY29uc3QgY29uZmlnID0ge1xuICBkYk5hbWU6IFwiYmVhZ2xlX2NhY2hlXCIsXG4gIHZlcnNpb246IDEsXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJpbmZvQ2FjaGVcIixcbiAgICBpbmRleGVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiaXhfc2t1XCIsXG4gICAgICAgIGZpZWxkczogXCJza3VcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJza3VcIn0sXG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiXG5pbXBvcnQge29wZW5EQn0gZnJvbSBcImlkYlwiO1xuaW1wb3J0IHtmZXRjaFByb2R1Y3RJbmZvfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXIsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnlcIik7XG5jbGFzcyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgYXN5bmMgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICBjb25zdCB7ZGJOYW1lLCB2ZXJzaW9ufSA9IGNvbmZpZztcbiAgICBjb25zdCBkYiA9IGF3YWl0IG9wZW5EQihkYk5hbWUsIHZlcnNpb24sIHtcbiAgICAgIHVwZ3JhZGUoZGIsIG9sZFZlcnNpb24pIHtcbiAgICAgICAgc3dpdGNoIChvbGRWZXJzaW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZGIuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLmluZGV4ZWREQiA9IGRiO1xuICB9XG5cbiAgYXN5bmMgZ2V0REIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuaW5kZXhlZERCKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUHJvZHVjdCBpbmZvIGRiIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCAzMDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldFN0b3JlKHJlYWR3cml0ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCByZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKS5zdG9yZTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUocGF5bG9hZCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5nZXRTdG9yZSh0cnVlKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgY29uc3Qgc2F2ZVByb21pc2VzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGxvYWQgb2YgcGF5bG9hZCkge1xuICAgICAgICBsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgc2F2ZVByb21pc2VzLnB1c2goc3RvcmUucHV0KGxvYWQpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHNhdmVQcm9taXNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBheWxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgYXdhaXQgc3RvcmUucHV0KHBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5nZXRTdG9yZSh0cnVlKTtcbiAgICBhd2FpdCBzdG9yZS5jbGVhcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzeW5jIGdldChza3UpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5nZXQoY29uZmlnLnN0b3JlLm5hbWUsIHNrdSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIGNvdW50KCkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvdW50KGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q3Vyc29yKCkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IGRiLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lKS5zdG9yZS5vcGVuQ3Vyc29yKCk7XG4gICAgcmV0dXJuIGN1cnNvcjtcbiAgfVxuXG4gIGFzeW5jIHBlcnNpc3RQcm9kdWN0SW5mbygpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwaW5mby1jaGVjay1leGlzdGluZ1wiKTtcbiAgICBsZXQgY2xlYXJQcm9taXNlID0gbnVsbDtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5nZXRDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGN1cnNvci52YWx1ZS50aW1lc3RhbXA7XG4gICAgICBjb25zdCBlbGFwc2VkU2Vjb25kcyA9IChEYXRlLm5vdygpIC8gMTAwMCkgLSB0aW1lc3RhbXA7XG4gICAgICAvLyBSZS1mZXRjaCBwcm9kdWN0IGluZm8gb25jZSBhIGRheVxuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgODY0MDApIHJldHVybjtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gaXMgZXhwaXJlZFwiKTtcbiAgICAgIGNsZWFyUHJvbWlzZSA9IHRoaXMuY2xlYXIoKTtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicGluZm8tZmV0Y2hcIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gZmV0Y2hQcm9kdWN0SW5mbygpO1xuICAgIGNvbnN0IFtwcm9kdWN0SW5mb0FycmF5XSA9IGF3YWl0IFByb21pc2UuYWxsKFtwcm9kdWN0SW5mb1Byb21pc2UsIGNsZWFyUHJvbWlzZV0pO1xuICAgIGlmICghcHJvZHVjdEluZm9BcnJheSB8fCAhcHJvZHVjdEluZm9BcnJheS5sZW5ndGgpIHJldHVybjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwaW5mby1wcmVzYXZlXCIpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSh0aGlzLnByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicGluZm8tc2F2ZWRcIik7XG4gIH1cblxuICBwcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkge1xuICAgIGNvbnN0IHBheWxvYWRzID0gW107XG4gICAgY29uc3QgZmllbGROYW1lcyA9IHByb2R1Y3RJbmZvQXJyYXkuc2hpZnQoKTtcbiAgICBmaWVsZE5hbWVzLnNoaWZ0KCk7XG4gICAgZm9yIChjb25zdCBpbmZvIG9mIHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7c2t1OiBpbmZvLnNoaWZ0KCl9O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBheWxvYWRbZmllbGROYW1lc1tpXV0gPSBpbmZvW2ldIHx8IG51bGw7XG4gICAgICB9XG4gICAgICBwYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZHM7XG4gIH1cblxuICBhc3luYyBjaGVja0luaXRpYWxpemVkKGNhbGxiYWNrKSB7XG4gICAgbGV0IGV4aXN0aW5nUHJvZEluZm8gPSBhd2FpdCB0aGlzLmNvdW50KCk7XG4gICAgbGV0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKSB8fFxuICAgICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvICYmIHNrdUxpc3QpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwcm9kdWN0SW5mb1RpbWVvdXQgPSBudWxsO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgICAgaWYgKGV4aXN0aW5nUHJvZEluZm8pIHtcbiAgICAgICAgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpIHx8XG4gICAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gICAgICAgIGlmIChza3VMaXN0KSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICBjbGVhckludGVydmFsKHByb2R1Y3RJbmZvSW50ZXJ2YWwpO1xuICAgICAgICAgIGNsZWFyVGltZW91dChwcm9kdWN0SW5mb1RpbWVvdXQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDI1KTtcbiAgICBwcm9kdWN0SW5mb1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocHJvZHVjdEluZm9JbnRlcnZhbCk7XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeTtcbiIsImltcG9ydCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQge2lkYlJlYWR5fSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgU3RvcmUgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCBpbnN0YW5jZSA9IG51bGw7XG4gIHJldHVybiB7XG4gICAgZ2V0SW5zdGFuY2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGluc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgIGF3YWl0IGlkYlJlYWR5KCk7XG4gICAgICAgIGluc3RhbmNlID0gbmV3IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkoKTtcbiAgICAgICAgLy8gSGlkZSB0aGUgY29uc3RydWN0b3Igc28gdGhlIHJldHVybmVkIG9iamVjdCBjYW4ndCBiZSBuZXcnZC4uLlxuICAgICAgICBpbnN0YW5jZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfSxcbiAgfTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCB7c3R5bGVBcHBsaWNhdG9yLCBkZWxheSwgaWRsZVRpbWVyLCBnZXRVbnNlY3VyZUhhc2h9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMpIHtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUFwcGx5QWN0aW9uc1wiKTtcbiAgY29uc3QgZGIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHRyYW5zZm9ybWVyID0gYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtZXIoYWN0aW9uLCBlbGVtZW50ID0gbnVsbCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9wZXJhdG9yLFxuICAgICAgdHlwZSxcbiAgICAgIGFwcGx5RXZlbnQsXG4gICAgICBjb250ZW50U2VsZWN0b3IsXG4gICAgICBzZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yRmFsbGJhY2ssXG4gICAgICBtZENvbmRpdGlvbixcbiAgICAgIG1vdmVfc2VsZWN0b3JfMSxcbiAgICAgIG1vdmVfc2VsZWN0b3JfMixcbiAgICAgIHJlcGxhY2VGbixcbiAgICAgIHBUeXBlLFxuICAgICAgcHJvZHVjdEluZm9TdG9yYWdlLFxuICAgIH0gPSBhY3Rpb247XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIm5vb3BcIikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vb3AgT3BlcmF0b3I6IE5vIG9wZXJhdGlvbiBpcyBhcHBsaWVkIG9uIHRhcmdldCBcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHt2YWx1ZX0gPSBhY3Rpb247XG4gICAgLy8gSWYgYW4gZWxlbWVudCBpcyBwYXNzZWQgdG8gdHJhbnNmb3JtZXIsIHNlbGVjdG9yIGlzIHJlbGF0aXZlIHRvIHBhc3NlZCBlbGVtZW50XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmZpbmQoc2VsZWN0b3IpIDogJChzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBtYyA9IG1kQ29uZGl0aW9uID8gd2luZG93Lm1hdGNoTWVkaWEobWRDb25kaXRpb24pLm1hdGNoZXMgOiB0cnVlO1xuICAgIGlmICghbWMpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJNZWRpYSBjb25kaXRpb24gbWlzbWF0Y2g6IFwiLCBtZENvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzEgJiYgIW1vdmVfc2VsZWN0b3JfMikgfHxcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzIgJiYgIW1vdmVfc2VsZWN0b3JfMSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJCb3RoIG1vdmUgc2VsZWN0b3JzIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG1vdmVfc2VsZWN0b3JfMSAmJiBtb3ZlX3NlbGVjdG9yXzIpIHtcbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzEpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAxIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzIpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAyIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBzcGVjaWZpZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCEkKHNlbGVjdG9yRmFsbGJhY2spLmxlbmd0aCAmJiBvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gXCJuby1zZWxlY3RvclwiKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZDogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVHJ5aW5nIGZhbGxiYWNrIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yRmFsbGJhY2spIGVsZW1lbnQgPSAkKHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWxsYmFjayBzZWxlY3RvciBub3QgZm91bmRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VGbikge1xuICAgICAgdmFsdWUgPSBhd2FpdCByZXBsYWNlcih2YWx1ZSwgcmVwbGFjZUZuKTtcbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVtb3Zpbmc6IFwiLCBzZWxlY3Rvcik7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5zZXJ0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmVmb3JlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBiZWZvcmU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGFmdGVyOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGVuZGluZyB2YWx1ZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb2RhbFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIGlmIChlbG0gPT0gZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3BsYXlNb2RhbCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBvcHVwXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlBvcHVwIGFscmVhZHkgZGlzcGxheWVkIGluIHNlc3Npb25cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIFBvcHVwOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHBUeXBlKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJlZGl0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIHRleHQ6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC50ZXh0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyBodG1sOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuaHRtbCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHlsZUFwcGxpY2F0b3JcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZUNoYW5nZXNNYXAgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTdHlsZSBDaGFuZ2VzIE1hcDogXCIsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgICBzdHlsZUFwcGxpY2F0b3IoZWxlbWVudCwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZGRDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGFkZGRpbmcgY2xhc3MgdG8gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVtb3ZlQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGByZW1vdmUgY2xhc3MgZnJvbSAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb2N1bWVudFRpdGxlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgY2hhbmdpbmcgZG9jdW1lbnQgdGl0bGUgZnJvbSAke2VsZW1lbnR9IHRvICR7dmFsdWV9YCk7XG4gICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgPT0gXCJ0YWJDaGFuZ2VcIikge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJjYXRjaGluZyBldmVudCB0YWJjaGFuZ2UuLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gd2luZG93LnRvcC5kb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5rbm93biBlZGl0IHR5cGU6IFwiLCB0eXBlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJyZXBsYWNlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmc6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LnJlcGxhY2VBbGwodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic3dhcFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU3dhcHBpbmc6IFwiLCBtb3ZlX3NlbGVjdG9yXzEsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBjb25zdCBuMSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgbjIgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIHN3YXBOb2RlcyhuMSwgbjIpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5qZWN0c2NyaXB0XCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbmplY3Rpbmcgc2NyaXB0OiBcIiwgdmFsdWUpO1xuICAgICAgY29uc3Qgc2NyaXB0SUQgPSBnZXRVbnNlY3VyZUhhc2godmFsdWUpO1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2NyaXB0SUQpKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJTY3JpcHQgYWxyZWFkeSBpbiBwYWdlIVwiKTtcbiAgICAgIH0gZWxzZSBlbGVtZW50LmFwcGVuZChgPHNjcmlwdCBpZD0ke3NjcmlwdElEfT4ke3ZhbHVlfTwvc2NyaXB0PmApO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwibW92ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKGBNb3ZpbmcgJHttb3ZlX3NlbGVjdG9yXzF9IHRvICR7bW92ZV9zZWxlY3Rvcl8yfWApO1xuICAgICAgY29uc3Qgc291cmNlID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgZGVzdGluYXRpb24ucHJlcGVuZChzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicHJvZHVjdEluZm9Mb29rdXBcIikge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgZWxlbWVudC5iZWZvcmUocmVzKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInRleHQtdHJhbnNmb3JtXCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiY2FwaXRhbGl6ZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCBlIG9mIEFycmF5LmZyb20oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYWRkIHRyYW5zbGF0ZSBtb2R1bGVcbiAgICAgICAgICAgIGlmIChlLmlubmVyVGV4dD8uaW5jbHVkZXMoXCJcXG5cIikpIHtcbiAgICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dCkuc3BsaXQoXCJcXG5cIikubWFwKChzZW50ZW5jZSkgPT5cbiAgICAgICAgICAgICAgICBzZW50ZW5jZS5zcGxpdChcIiBcIikubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSkuam9pbihcIiBcIiksXG4gICAgICAgICAgICAgICkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgICAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gdGV4dC10cmFuc2Zvcm0gdHlwZVwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJhaS1zdWdnZXN0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGl0bGUtY2hhbmdlXCI6IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0dGluZyB0aXRsZSBzdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCBmaW5hbFRpdGxlID0gYXdhaXQgcHJlcGFyZUZpbmFsVGl0bGUoKTtcbiAgICAgICAgICBpZiAoIWZpbmFsVGl0bGUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgdGl0bGUtY2hhbmdlIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmNvbnRlbnRzKCkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZVR5cGUgPT0gMztcbiAgICAgICAgICB9KVswXS5ub2RlVmFsdWUgPSBmaW5hbFRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGQtZGVzY3JpcHRpb25cIjoge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXR0aW5nIGRlc2NyaXB0aW9uIHN1Z2dlc3Rpb25zXCIpO1xuICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRWxtID0gYXdhaXQgcHJlcGFyZURlc2NFbG0odmFsdWUpO1xuICAgICAgICAgIGlmICghZGVzY3JpcHRpb25FbG0pIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgYWRkLWRlc2NyaXB0aW9uIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmJlZm9yZShkZXNjcmlwdGlvbkVsbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggb3BlcmF0b3IgZXhpc3RzIHlldFwiLCBvcGVyYXRvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHByZXBhcmVEZXNjRWxtID0gYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1KTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvPy5tYXJrZXRpbmdDb3B5KSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBObyBkZXNjcmlwdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWRIdG1sU3RyaW5nID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8ubWFya2V0aW5nQ29weSwgdmFsdWUpO1xuICAgIHJldHVybiB1cGRhdGVkSHRtbFN0cmluZztcbiAgfTtcblxuICBjb25zdCBwcmVwYXJlRmluYWxUaXRsZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3UpO1xuICAgIGlmICghcHJvZHVjdEluZm8/LnRpdGxlQXVnbWVudCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gdGl0bGUgc3VnZ2VzdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IHByb2R1Y3RJbmZvLnRpdGxlQXVnbWVudCArIGAgKCR7c2t1fSlgO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvZHVjdEluZm8gPSBhc3luYyAodHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSkgPT4ge1xuICAgIC8vIGdldCBrZXlzIG9mIHByb2R1Y3RJbmZvXG4gICAgY29uc3Qgc2t1TGlzdCA9IHByb2R1Y3RJbmZvU3RvcmFnZSA9PT0gXCJiYXNrZXRcIiA/XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCIsIHRydWUpIDpcbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGxldCByZXMgPSBudWxsO1xuICAgIGlmICghc2t1TGlzdCB8fCBza3VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHNrdSBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3VMaXN0WzBdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyB0cmFuc2NhdGlvbkluMldlZWtzIFwiLCBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBBZGRUb0NhcnRDb3VudCBcIiwgcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcInByb2R1Y3RWaWV3Q291bnRcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yXCIsIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIm5vIHN1Y2ggdHlwZSBmb3VuZCBmb3IgcHJvZHVjdEluZm9Mb29rdXAgb3BlcmF0b3I6IFwiKyB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlID0gYXN5bmMgKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRUaXRsZXMgPSAhQXJyYXkuaXNBcnJheSh0aXRsZXMpID8gW3RpdGxlc10gOiB0aXRsZXM7XG4gICAgZm9yIChjb25zdCBwYXJzZWRUaXRsZSBvZiBwYXJzZWRUaXRsZXMpIHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gcGFyc2VkVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICBpZiAoaWQgJiYgaWQgPT09IFwibmQtcG9wdXBfX3dyYXBwZXJcIikge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5jb250YWlucyhcIm5kLW1vZGFsX193cmFwcGVyXCIpKSB7XG4gICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UG9wdXAgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgPiAwKSByZXR1cm47XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDEpO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuXG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfSwgMTUwMDApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNb2RhbCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikpIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBvcHVwID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIGlzTW9kYWw9ZmFsc2UpID0+IHtcbiAgICAvLyBDcmVhdGUgcG9wdXAgd3JhcHBlclxuICAgIGNvbnN0IHBvcHVwV3JhcHBlciA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtcG9wdXBfX3dyYXBwZXJcIik7XG4gICAgaWYgKGlzTW9kYWwpIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtbW9kYWxfX3dyYXBwZXJcIik7XG4gICAgaWYgKCFpc01vZGFsKSBwb3B1cFdyYXBwZXIuaWQgPSBcIm5kLXBvcHVwX193cmFwcGVyXCI7XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uU3R5bGUgPSBpc01vZGFsID8gXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlX19jb2xvcmVkXCIgOiBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VcIjtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQocG9wdXBDbG9zZUJ1dHRvblN0eWxlKTtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGlmIChpc01vZGFsKSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudFNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRlbnRTZWxlY3RvcikpO1xuICAgICAgd2hpbGUgKHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikgJiYgY29udGVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCBjb250ZW50cy5zaGlmdCgpLnNyYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGZyb20gYWN0aW9uIGFuZCBhcHBlbmQgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgdGVtcGxhdGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB2YWx1ZS50cmltKCk7XG4gICAgY29uc3QgcG9wdXAgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZUJ1dHRvbik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgIC8vIFJlbW92ZSBvbGQgcG9wdXAgaWYgZXhpc3RzIGJlZm9yZSBhcHBlbmRpbmcgbmV3IG9uZVxuICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dhcE5vZGVzID0gZnVuY3Rpb24gc3dhcE5vZGVzKG4xLCBuMikge1xuICAgIGNvbnN0IHAxID0gbjEucGFyZW50Tm9kZTtcbiAgICBjb25zdCBwMiA9IG4yLnBhcmVudE5vZGU7XG4gICAgbGV0IGkxO1xuICAgIGxldCBpMjtcblxuICAgIGlmICghcDEgfHwgIXAyIHx8IHAxLmlzRXF1YWxOb2RlKG4yKSB8fCBwMi5pc0VxdWFsTm9kZShuMSkpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMS5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMSkpIHtcbiAgICAgICAgaTEgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDIuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjIpKSB7XG4gICAgICAgIGkyID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcbiAgICAgIGkyKys7XG4gICAgfVxuICAgIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcbiAgICBwMi5pbnNlcnRCZWZvcmUobjEsIHAyLmNoaWxkcmVuW2kyXSk7XG4gIH07XG5cbiAgY29uc3Qgd2FpdEZvckpRdWVyeSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghd2luZG93LmpRdWVyeSkge1xuICAgICAgICBsb2dnZXIubG9nKFwialF1ZXJ5IG5vdCBmb3VuZCwgcmV0cnlpbmdcIik7XG4gICAgICAgIGNvbnN0IGpRdWVyeUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWN0aW9uQXBwbGljYXRvciA9IGFzeW5jIChhY3Rpb25zKSA9PiB7XG4gICAgaWYgKGF3YWl0IHdhaXRGb3JKUXVlcnkoKSkge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChhY3Rpb24uZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGFjdGlvbi5lbGlnaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCk7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbik7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXJyb3ItYXBwbHlpbmctYWN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkpxdWVyeSBub3QgZm91bmQgb24gd2luZG93XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8tanF1ZXJ5XCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBBcHBseSBhY3Rpb25zXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFjdGlvbkFwcGxpY2F0b3IoYWN0aW9ucyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZGVmYXVsdCBhcHBseUFjdGlvbnM7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJBY3Rpb25Db25kaXRpb25VdGlsc1wiKTtcblxuY29uc3QgY2hlY2tBY3Rpb25Db25kaXRpb24gPSBhc3luYyAoY29uZGl0aW9uKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBY3Rpb24gY29uZGl0aW9uIGZvdW5kOiBcIiwgY29uZGl0aW9uKTtcbiAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IFtdO1xuICBjb25zdCB7YXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIG9wZXJhdG9yLCBzZWxlY3RvciwgdHlwZSwgdmFsdWUsIGNoYWlufSA9IGNvbmRpdGlvbjtcbiAgY29uc3QgY29uZGl0aW9uRWxlbWVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29uZGl0aW9uRWxlbWVudHMpIHtcbiAgICBpZiAoYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikpIHtcbiAgICAgIGVsaWdpYmxlRWxlbWVudHMucHVzaCgkKGVsZW1lbnQpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsaWdpYmxlRWxlbWVudHM7XG59O1xuXG5jb25zdCBhY3Rpb25Db25kaXRpb25DaGVja2VyID0gYXN5bmMgKGVsZW1lbnQsIHR5cGUsIG9wZXJhdG9yLCBhdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUsIGNoYWluKSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U2t1ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KGVsZW1lbnRTa3UpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAvLyBydW5UaW1lVmFsdWUgbWF5IGJlIDBcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHwgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2FzZSBcImZ1bmN0aW9uXCI6IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZuID0gRnVuY3Rpb24oXCJlbFwiLCBvcGVyYXRvcik7XG4gICAgICAgIHJldHVybiBmbihlbGVtZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgZXhlY3V0aW5nIGZ1bmN0aW9uIGFjdGlvbiBjb25kaXRpb25cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXS5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0ID0gMSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHJlbGVhc2VdID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPD0gMDtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgcmVsZWFzZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcy5mb3JFYWNoKChxdWV1ZSkgPT4gcXVldWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LnJlamVjdCh0aGlzLl9jYW5jZWxFcnJvcikpKTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICB9XG4gICAgX2Rpc3BhdGNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWVFbnRyeSA9IChfYSA9IHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghcXVldWVFbnRyeSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgLT0gd2VpZ2h0O1xuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy5fdmFsdWUgKyAxO1xuICAgICAgICAgICAgcXVldWVFbnRyeS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihwcmV2aW91c1dlaWdodCldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5mb3JFYWNoKCh3YWl0ZXIpID0+IHdhaXRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIE11dGV4IHtcbiAgICBjb25zdHJ1Y3RvcihjYW5jZWxFcnJvcikge1xuICAgICAgICB0aGlzLl9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEsIGNhbmNlbEVycm9yKTtcbiAgICB9XG4gICAgYWNxdWlyZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQxKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgWywgcmVsZWFzZXJdID0geWllbGQgdGhpcy5fc2VtYXBob3JlLmFjcXVpcmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLnJ1bkV4Y2x1c2l2ZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKCk7XG4gICAgfVxuICAgIHJlbGVhc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKSlcbiAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5jYW5jZWwoKTtcbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHdpdGhUaW1lb3V0KHN5bmMsIHRpbWVvdXQsIHRpbWVvdXRFcnJvciA9IEVfVElNRU9VVCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjcXVpcmU6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgc3luYy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCByZWxlYXNlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHRpY2tldFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZSh3ZWlnaHQpIHtcbiAgICAgICAgICAgIHN5bmMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3luYy5jYW5jZWwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FpdEZvclVubG9jazogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3luYy53YWl0Rm9yVW5sb2NrKHdlaWdodCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCh0aW1lb3V0RXJyb3IpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogKCkgPT4gc3luYy5pc0xvY2tlZCgpLFxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4gc3luYy5nZXRWYWx1ZSgpLFxuICAgICAgICBzZXRWYWx1ZTogKHZhbHVlKSA9PiBzeW5jLnNldFZhbHVlKHZhbHVlKSxcbiAgICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpc25lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIHRyeUFjcXVpcmUoc3luYywgYWxyZWFkeUFjcXVpcmVkRXJyb3IgPSBFX0FMUkVBRFlfTE9DS0VEKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gd2l0aFRpbWVvdXQoc3luYywgMCwgYWxyZWFkeUFjcXVpcmVkRXJyb3IpO1xufVxuXG5leHBvcnQgeyBFX0FMUkVBRFlfTE9DS0VELCBFX0NBTkNFTEVELCBFX1RJTUVPVVQsIE11dGV4LCBTZW1hcGhvcmUsIHRyeUFjcXVpcmUsIHdpdGhUaW1lb3V0IH07XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBhcHBseUFjdGlvbnMgZnJvbSBcIi4uL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleFwiO1xuaW1wb3J0IGNoZWNrQWN0aW9uQ29uZGl0aW9uIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsXCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIENIQU1QX1NLSVBfUkFUSU8sXG4gIExBQl9TS0lQX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIHByZXBhcmVBY3Rpb25zLFxuICBjaGVja0FjdGlvblNlbGVjdG9ycyxcbiAgZGV0ZXJtaW5lUGN0LFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZSwgaXNPbiwgaXNDaGFtcH0gPSBib2R5O1xuICAgIHRoaXMuaXNPbiA9IGlzT247XG4gICAgdGhpcy5pc0NoYW1wID0gaXNDaGFtcDtcbiAgICB0aGlzLmVuZ2FnZW1lbnRMb2NrID0ge307XG4gICAgdGhpcy5wYWdlVHlwZSA9IHBhZ2VUeXBlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gZGVidWdNb2RlO1xuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgdGhpcy5yZUFwcGx5VHJlYXRtZW50c01hcCA9IHt9O1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMgPSBbXTtcbiAgICB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5kZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdHMoKSB7XG4gICAgY29uc3Qgcm9ib3RQcm9taXNlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0cmVhdG1lbnQuZGVwZW5kYW50X29uX3RyZWF0bWVudCkgY29udGludWU7XG4gICAgICAgIGlmICh0cmVhdG1lbnQuZGVsYXkpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICB9LCB0cmVhdG1lbnQuZGVsYXkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJvYm90UHJvbWlzZXMucHVzaCh0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGVuZ2FnaW5nIHJvYm90ICR7dHJlYXRtZW50LmlkfTogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHJvYm90UHJvbWlzZXMpO1xuICAgIHRoaXMuaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKTtcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgYWN0aW9ucyxcbiAgICAgIGVsaWdpYmlsaXR5UnVsZVNldCxcbiAgICAgIGRldmljZSxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIGhlbHBlcnMsXG4gICAgICBkZXBlbmRhbnRfb25fdHJlYXRtZW50LFxuICAgICAgbW9kZSxcbiAgICB9ID0gdHJlYXRtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGRlYnVnTW9kZSxcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZW5nYWdlbWVudExvY2ssXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNNb2JpbGUsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIGFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gZW5nYWdlbWVudExvY2tbaWRdIHx8IG5ldyBNdXRleCgpO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBlbmdhZ2VtZW50TG9ja1tpZF0uYWNxdWlyZSgpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgICBjb25zdCByYW5kb21QY3RQcm9taXNlID0gZGV0ZXJtaW5lUGN0KGlkICsgaWRlbnRpZmllcik7XG4gICAgICAgIGlmIChidXNpbmVzc1J1bGVTZXQpIHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgc3ViIHZhcmlhbnQgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgICAgICAgYnVzaW5lc3NSdWxlSWQgPSBhd2FpdCB0aGlzLmNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpO1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGJ1c2luZXNzIHJ1bGUgdHJhbnNmb3JtYXRpb24gd2l0aCBpZDogXCIsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHRyZWF0bWVudCB3aXRoIGRlZmF1bHQgdmFsdWVzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtwcmVwYXJlZEFjdGlvbnMsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG5cbiAgICAgICAgbGV0IGlzRWxpZ2libGUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBwcmVwYXJlZEFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi5jb25kaXRpb24pIGNvbnRpbnVlO1xuICAgICAgICAgIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBhd2FpdCBjaGVja0FjdGlvbkNvbmRpdGlvbihhY3Rpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICBpZiAoZWxpZ2libGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFjdGlvbi5lbGlnaWJsZUVsZW1lbnRzID0gZWxpZ2libGVFbGVtZW50cztcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSB0cnVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImVsaWdpYmxlXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCByYW5kb21QY3RQcm9taXNlO1xuICAgICAgICBjb25zdCBza2lwUmF0aW8gPSBtb2RlID09PSBcImxhYlwiID8gTEFCX1NLSVBfUkFUSU8gOiBDSEFNUF9TS0lQX1JBVElPO1xuICAgICAgICBpZiAoIWRlYnVnTW9kZSA+IDAgJiZcbiAgICAgICAgICAoIXRoaXMuaXNPbiB8fFxuICAgICAgICAgIChtb2RlID09PSBcImxhYlwiICYmIHRoaXMuaXNDaGFtcCkgfHxcbiAgICAgICAgICAobW9kZSA9PT0gXCJjaGFtcGlvblwiICYmICF0aGlzLmlzQ2hhbXApIHx8XG4gICAgICAgICAgKHJhbmRvbVBjdCA8IHNraXBSYXRpbykpKSB7XG4gICAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJpZ25vcmVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBhcHBseShpZCwgcHJlcGFyZWRBY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDpcIiwgaWQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICByZWxlYXNlKCk7XG4gICAgICB0aGlzLmFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpO1xuICAgICAgdGhpcy5hZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZWxwZXJzKSAmJiBoZWxwZXJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGVscGVyUm9ib3RQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgICAgaWYgKCFoZWxwZXJzLmluY2x1ZGVzKHRyZWF0bWVudC5pZCkpIGNvbnRpbnVlO1xuICAgICAgICBoZWxwZXJSb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGhlbHBlclJvYm90UHJvbWlzZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFwcGx5KGlkLCBwcmVwYXJlZEFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgYWN0aW9uIHNlbGVjdG9ycyBmb3Igcm9ib3QgJHtpZH1gKTtcbiAgICBjb25zdCBjaGVjayA9IGNoZWNrQWN0aW9uU2VsZWN0b3JzKHByZXBhcmVkQWN0aW9ucyk7XG4gICAgaWYgKCFjaGVjaykge1xuICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpO1xuICAgICAgaWYgKGFwcGxpZWQgJiYgYXBwbGllZFtpZF0pIHJldHVybjtcbiAgICAgIGxvZ2dlci5sb2coYEFjdGlvbiBzZWxlY3RvciBjaGVjayBmYWlsZWQgZm9yIHJvYm90ICR7aWR9YCk7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkQWN0aW9ucyk7XG4gICAgaWYgKHJlcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZmFpbGVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIik7XG4gICAgICBpZiAoZmFpbGVkW2lkXSkge1xuICAgICAgICBkZWxldGUgZmFpbGVkW2lkXTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmXCIsIGZhaWxlZCk7XG4gICAgICB9XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImFwcGxpZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgfSBlbHNlIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBjb25zdCBhcHBsaWVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIik7XG4gICAgICBpZiAoYXBwbGllZFtpZF0pIHJldHVybjtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiZmFpbGVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7cGFnZVR5cGUsIHJlQXBwbHlUcmVhdG1lbnRzTWFwfSA9IHRoaXM7XG4gICAgY29uc3Qge2lkLCByZWFwcGx5X2V2ZW50LCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZX0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYXRlUmVhcHBseVJvYm90TWFwKCkge1xuICAgIGNvbnN0IHtyZUFwcGx5VHJlYXRtZW50c01hcCwgbWF0Y2hlZFRyZWF0bWVudHN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZUFwcGx5VHJlYXRtZW50c01hcCkpIHtcbiAgICAgIGNvbnN0IHRyZWF0bWVudElkcyA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW2tleV07XG4gICAgICBjb25zdCByZUFwcGx5VHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigodCkgPT4gdHJlYXRtZW50SWRzLmluY2x1ZGVzKHQuaWQpKTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJpbmZpbml0ZV9zY3JvbGxcIjoge1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbmZpbml0ZV9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0aW1lb3V0XCI6IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSB0aW1lb3V0YCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50X2NoYW5nZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlTZWxlY3Rvckxpc3QgPSBBcnJheS5pc0FycmF5KHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yKSA/XG4gICAgICAgICAgICAgICAgdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IgOiBbdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3JdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiByZWFwcGx5U2VsZWN0b3JMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGVsZW1lbnRfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbl9zY3JvbGxcIjoge1xuICAgICAgICAgIC8vIGFkZCB3aW5kb3cgc2Nyb2xsIGxpc3RlbmVyLCBjYWxsIGVuZ2FnZVJvYm90IG9uIHNjcm9sbCwgZG8gbm90IHRyaWdnZXIgbW9yZSB0aGFuIG9uY2UgcGVyIDI1MG1zXG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IDA7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAobm93IC0gbGFzdFNjcm9sbFRpbWUgPiAyNTAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA+IDUpIHtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gb25fc2Nyb2xsYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJxdWVyeV9zZWFyY2hfY2hhbmdlXCI6IHtcbiAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggIT09IHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gcXVlcnlfc2VhcmNoX2NoYW5nZWApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVydmFsXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoYXBwbGllZD8uW3RyZWF0bWVudC5pZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGludGVydmFsYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb19sYXllcl9jaGFuZ2VcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICAgICAgICAgIGFkZERhdGFMaXN0ZW5lcih0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRhYmNoYW5nZVwiOiB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGFiY2hhbmdlYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSZWFwcGx5IGV2ZW50IG5vdCBmb3VuZDogXCIsIGtleSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZVNldCA9IFtdLCBidXNpbmVzc1J1bGVTZXQgPSBbXSwgaWR9ID0gdHJlYXRtZW50O1xuICAgIGlmICh0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLmluY2x1ZGVzKGlkKSkgcmV0dXJuO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhbLi4uZWxpZ2liaWxpdHlSdWxlU2V0LCAuLi5idXNpbmVzc1J1bGVTZXRdKTtcbiAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBhZGREYXRhTGlzdGVuZXIoYF9fZVJ1bGVzLiR7c2VsZWN0b3J9YCwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgIH1cbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLnB1c2goaWQpO1xuICB9XG5cbiAgZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlU2V0LCBwcmV2aW91c1NlbGVjdG9ycyA9IG51bGwpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBwcmV2aW91c1NlbGVjdG9ycyB8fCBbXTtcbiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAocnVsZS5zdGFydHNXaXRoKFwiIVwiKSkgcnVsZSA9IHJ1bGUuc2xpY2UoMSk7XG4gICAgICAgIHNlbGVjdG9ycy5wdXNoKHJ1bGUuc3BsaXQoXCIuXCIpWzBdKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZS5zZXQsIHNlbGVjdG9ycyk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uKG5ldyBTZXQoc2VsZWN0b3JzKSldO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpIHtcbiAgICBsb2dnZXIubG9nKGBDaGVja2luZyBlbGlnaWJpbGl0eSAke2VsaWdpYmlsaXR5UnVsZX1gKTtcbiAgICBsZXQgb3Bwb3NpdGVGbGFnID0gZmFsc2U7XG4gICAgbGV0IFtlbGlnaWJpbGl0eVNjb3BlLCBlbGlnaWJpbGl0eU5hbWVdID0gZWxpZ2liaWxpdHlSdWxlLnNwbGl0KFwiLlwiKTtcbiAgICBpZiAoZWxpZ2liaWxpdHlTY29wZS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgb3Bwb3NpdGVGbGFnID0gdHJ1ZTtcbiAgICAgIGVsaWdpYmlsaXR5U2NvcGUgPSBlbGlnaWJpbGl0eVNjb3BlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBsZXQgcmVzO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlID09PSBcIlBhZ2VUeXBlXCIpIHtcbiAgICAgIHJlcyA9IFthd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIildO1xuICAgIH0gZWxzZSByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2VsaWdpYmlsaXR5U2NvcGV9YCk7XG5cbiAgICBpZiAoIXJlcyB8fCAhQXJyYXkuaXNBcnJheShyZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9wcG9zaXRlRmxhZyAmJiByZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb3Bwb3NpdGVGbGFnICYmICFyZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGxvZ2dlci5sb2coYCR7ZWxpZ2liaWxpdHlSdWxlfSBpcyBlbGlnaWJsZWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0LCBlbGlnaWJpbGl0eVNldFR5cGUgPSBudWxsLCBwcmV2aW91c0lzRWxpZ2libGUgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJvYm90IGVsaWdpYmlsaXR5XCIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFbGlnaWJpbGl0eSBSdWxlIFNldCAke2VsaWdpYmlsaXR5UnVsZVNldH0gaXMgbm90IGFuIGFycmF5YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc0VsaWdpYmxlID0gcHJldmlvdXNJc0VsaWdpYmxlO1xuICAgIGZvciAoY29uc3QgZWxpZ2liaWxpdHlSdWxlIG9mIGVsaWdpYmlsaXR5UnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaWYgKGlzRWxpZ2libGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2ggKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSAmJiBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIGVsaWdpYmlsaXR5U2V0VHlwZTogXCIsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlLnNldCwgZWxpZ2liaWxpdHlSdWxlLnR5cGUsIGlzRWxpZ2libGUpO1xuICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRWxpZ2libGU7XG4gIH1cblxuICAvLyBSZXR1cm4gaW5kZXggb2YgYnVzaW5lc3NSdWxlLCB0aGlzIGlzIHRoZSBidXNpbmVzc1J1bGVJZFxuICBhc3luYyBjaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGJ1c2luZXNzUnVsZV0gb2YgYnVzaW5lc3NSdWxlU2V0LmVudHJpZXMoKSkge1xuICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoW2J1c2luZXNzUnVsZV0pKSByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tEYXRhTGF5ZXJSdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSB3aXRoIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gYXdhaXQgZGF0YUxheWVyRmluZGVyKG9wZXJhdG9yKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRhTGF5ZXJGaW5kZXIgPSBhc3luYyAoa2V5KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJTZWFyY2hpbmcgYmVhZ2xlSW5mb0xheWVyIGZvciBrZXkgXCIsIGtleSk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5zdWNjZXNzKGBGb3VuZCBrZXkgJHtrZXl9IHdpdGggdmFsdWUgJHtyZXN9YCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBsb2dnZXIuZmFpbGVkKGBLZXkgJHtrZXl9IG5vdCBmb3VuZCBpbiBiZWFnbGVJbmZvTGF5ZXJgKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVsZW1lbnRDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbGVtZW50UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIHNlbGVjdG9yXCIsIHJ1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbCk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZSwgc2VsZWN0b3IsIHNlbGVjdG9yQWxsLCBzZWxlY3RvckZhbGxiYWNrID0gbnVsbH0gPSBydWxlO1xuICBsZXQgbWFpblNlbGVjdG9yID0gc2VsZWN0b3I7XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbWFpblNlbGVjdG9yID0gc2VsZWN0b3JGYWxsYmFjayA/IHNlbGVjdG9yRmFsbGJhY2sgOiBtYWluU2VsZWN0b3I7XG4gIH1cblxuICBpZiAob3BlcmF0b3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcih3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gIH1cbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChzZWxlY3RvckFsbCAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgZWxlbWVudDtcbiAgaWYgKG1haW5TZWxlY3RvcikgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpO1xuICBlbHNlIGlmIChzZWxlY3RvckFsbCkgZWxlbWVudCA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSk7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJ0ZXh0LW51bWJlclwiOiB7XG4gICAgICBsZXQgdGVtcFZhbDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIHRlbXBWYWwgPSBlbGVtZW50LnJlZHVjZSgocmV0dXJuVmFsLCBlbGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuVmFsICs9IHBhcnNlSW50KGVsZW0udGV4dENvbnRlbnQucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBWYWwgPSBwYXJzZUludCh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgLnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwYXJzZUludCh0ZW1wVmFsKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJjbGFzc0xpc3RcIjpcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiY291bnRcIjoge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgJiYgZWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGVsZW1lbnQubGVuZ3RoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigxLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDAsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjYXNlIFwic3R5bGVcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdHlsZUtleSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICBjb25zdCBzdHlsZVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnRTdHlsZXNbc3R5bGVLZXldO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHN0eWxlVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcIk9wZXJhdG9yIG5vdCBkZWZpbmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUZ1bmN0aW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRnVuY3Rpb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgZnVuY3Rpb24gcnVsZVwiKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3JcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3JcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWX0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRW52Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRW52UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVQcm9kdWN0SW5mb0NoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Byb2R1Y3RJbmZvUnVsZSA9IGFzeW5jIChydWxlKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBvcGVyYXRvcjogXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3QgcGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gIGxldCBza3U7XG4gIGlmIChwYWdlVHlwZSA9PT0gXCJQRFBcIikge1xuICAgIHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpO1xuICAgIGlmICghc2t1KSByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gICAgaWYgKCFza3VMaXN0IHx8ICh0eXBlb2Ygc2t1TGlzdCA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMoc2t1TGlzdCkubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICAgIHNrdSA9IHNrdUxpc3RbT2JqZWN0LmtleXMoc2t1TGlzdClbMF1dO1xuICB9XG4gIGxldCBydW50aW1lVmFsdWUgPSBudWxsO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInNhbGVDbnRWaXNpdG9yc0luMTVcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJjYXJ0Q250VmlzaXRvcnNJbjE1XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIEFkZFRvQ2FydENvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRBZGRUb0NhcnRDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJ2aWV3Q250VmlzaXRvcnNJbjFcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0UHJldmlld0NvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImhhc1RpdGxlXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHRpdGxlIGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUaXRsZShza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJoYXNEZXNjcmlwdGlvblwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBkZXNjcmlwdGlvbiBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0RGVzY3JpcHRpb24oc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEFkZFRvQ2FydENvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0UHJldmlld0NvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRGcm9tREIgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgcmV0dXJuIGF3YWl0IGRiLmdldChza3UpO1xufTtcblxuY29uc3QgZ2V0VGl0bGUgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udGl0bGVBdWdtZW50IHx8IFwiXCI7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBnZXREZXNjcmlwdGlvbiA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5tYXJrZXRpbmdDb3B5IHx8IFwiXCI7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZURvY3VtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRG9jdW1lbnRSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3I6IFwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgaWYgKG9wZXJhdG9yID09PSBcInZpc2liaWxpdHljaGFuZ2VcIikge1xuICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHdpbmRvdy5kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjaGVja0RhdGFMYXllclJ1bGV9IGZyb20gXCIuL2RhdGFMYXllckNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbGVtZW50UnVsZX0gZnJvbSBcIi4vZWxlbWVudENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tGdW5jdGlvblJ1bGV9IGZyb20gXCIuL2Z1bmN0aW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Nlc3Npb25SdWxlfSBmcm9tIFwiLi9zZXNzaW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1VybFJ1bGV9IGZyb20gXCIuL3VybENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbnZSdWxlfSBmcm9tIFwiLi9lbnZDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrUHJvZHVjdEluZm9SdWxlfSBmcm9tIFwiLi9wcm9kdWN0SW5mb0NoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tEb2N1bWVudFJ1bGV9IGZyb20gXCIuL2RvY3VtZW50Q2hlY2tlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2FkZERhdGFMaXN0ZW5lciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuaW1wb3J0IHtmZXRjaEVsaWdpYmlsaXR5UnVsZXN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSdWxlRW5naW5lXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlRW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVzLCBiYXNlUnVsZVNldH0gPSBib2R5O1xuICAgIHRoaXMuYmFzZVJ1bGVTZXQgPSBiYXNlUnVsZVNldDtcbiAgICB0aGlzLmVsaWdpYmlsaXR5UnVsZXMgPSBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5tdXRleCA9IG5ldyBNdXRleCgpO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgdGhpcy5iYXNlUnVsZVNldCkge1xuICAgICAgY29uc3QgcnVsZVNhdGlzZmllZCA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgaWYgKCFydWxlU2F0aXNmaWVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGUocnVsZSkge1xuICAgIGNvbnN0IHtjaGFpbiwgY2hhaW5fY29uZGl0aW9uLCB0eXBlfSA9IHJ1bGU7XG4gICAgbGV0IHJ1bGVTYXRpc2ZpZWQgPSBudWxsO1xuICAgIC8vIGNoZWNrIHJ1bGVcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJzZXNzaW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1Nlc3Npb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VsZW1lbnRSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrRGF0YUxheWVyUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXJsXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1VybFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0Z1bmN0aW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZW52aXJvbm1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRW52UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrUHJvZHVjdEluZm9SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2N1bWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEb2N1bWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZCA/IHJ1bGUubmFtZSB8fCB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBhc3luYyBhc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcykge1xuICAgIGlmICgha2V5IHx8ICFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcmVsZWFzZSA9IGF3YWl0IHRoaXMubXV0ZXguYWNxdWlyZSgpO1xuICAgIGxvZ2dlci5sb2coYExvY2sgYWNxdWlyZWQgZm9yIGtleSAke2tleX1gKTtcbiAgICBsZXQgZWxpZ2libGVSdWxlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWApIHx8IFtdO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgY29uc3QgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgICBpZiAoaXNFbGlnaWJsZSkge1xuICAgICAgICAgIGlmIChlbGlnaWJsZVJ1bGVzLmluY2x1ZGVzKHJ1bGUubmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGVsaWdpYmxlUnVsZXMucHVzaChydWxlLm5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghZWxpZ2libGVSdWxlcy5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBlbGlnaWJsZVJ1bGVzID0gZWxpZ2libGVSdWxlcy5maWx0ZXIoKHJuKSA9PiBybiAhPT0gcnVsZS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGVsaWdpYmxlUnVsZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgYXNzZXNzaW5nIHJ1bGVzIGZvciBrZXk6ICR7a2V5fSAtICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGxvZ2dlci5sb2coYFJlbGVhc2luZyBsb2NrIGZvciBrZXk6ICR7a2V5fWApO1xuICAgICAgcmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGluaXRpYWxpemVMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAgdGhpcy5zZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgY29uc3Qge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXMsIHByb2R1Y3RJbmZvUnVsZXN9ID0gdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMpO1xuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2Vzc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayA9IHRoaXMuYXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrLmJpbmQodGhpcywga2V5LCBydWxlcyk7XG4gICAgICBhZGREYXRhTGlzdGVuZXIob3BlcmF0b3IsIGJvdW5kQXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb25SZWNvcmQgb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgbm9kZXMgPSBbLi4ubm9kZXMsIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQuYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQucmVtb3ZlZE5vZGVzKV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXhjbHVkZSBtdXRhdGlvbnMgdGhhdCBvbmx5IHVwZGF0ZSB0ZXh0XG4gICAgICAgIGlmIChub2Rlcy5ldmVyeSgobikgPT4gbi50YWdOYW1lID09PSB1bmRlZmluZWQpKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VsZWN0b3IgPT09IFwiYm9keVwiKSB7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5ib2R5LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLnBhcmVudE5vZGUsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgWywgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKHByb2R1Y3RJbmZvUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2Vzc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayA9IHRoaXMuYXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrLmJpbmQodGhpcywga2V5LCBydWxlcyk7XG4gICAgICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gICAgICBkYi5jaGVja0luaXRpYWxpemVkKGJvdW5kQXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gIH1cblxuICBleHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMsIGRhdGFMYXllclJ1bGVzID0ge30sIGVsZW1lbnRSdWxlcyA9IHt9LCBwcm9kdWN0SW5mb1J1bGVzID0ge30sIGJhc2VSdWxlID0gbnVsbCkge1xuICAgIGlmICghcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgY29uc3Qge3R5cGV9ID0gcnVsZTtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgICAgaWYgKCFkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSkge1xuICAgICAgICAgICAgZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0ucHVzaChiYXNlUnVsZSB8fCBydWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihydWxlLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdID0gZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUuc2VsZWN0b3JBbGwpLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdID0gZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRSdWxlc1tcImJvZHlcIl0gPSBlbGVtZW50UnVsZXNbXCJib2R5XCJdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbXCJib2R5XCJdLCBiYXNlUnVsZSB8fCBydWxlXSA6IFtiYXNlUnVsZSB8fCBydWxlXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6XG4gICAgICAgICAgaWYgKCFwcm9kdWN0SW5mb1J1bGVzLmFsbCkge1xuICAgICAgICAgICAgcHJvZHVjdEluZm9SdWxlcy5hbGwgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJvZHVjdEluZm9SdWxlcy5hbGwucHVzaChiYXNlUnVsZSB8fCBydWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChydWxlLmNoYWluKSB7XG4gICAgICAgIHRoaXMuZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKFtydWxlLmNoYWluXSwgZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlcywgcHJvZHVjdEluZm9SdWxlcywgYmFzZVJ1bGUgfHwgcnVsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7ZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlcywgcHJvZHVjdEluZm9SdWxlc307XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0RWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGVsaWdpYmlsaXR5UnVsZXNPYmogPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTKTtcbiAgICAgIGlmIChlbGlnaWJpbGl0eVJ1bGVzT2JqKSB7XG4gICAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSBKU09OLnBhcnNlKGVsaWdpYmlsaXR5UnVsZXNPYmopO1xuICAgICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlc09iai50aW1lc3RhbXApIHtcbiAgICAgICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIGVsaWdpYmlsaXR5UnVsZXNPYmoudGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICAgICAgaWYgKGVsYXBzZWRIb3VycyA8IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSByZXR1cm4gZWxpZ2liaWxpdHlSdWxlc09iai5ydWxlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICAgICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzT2JqKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IHtydWxlczogZWxpZ2liaWxpdHlSdWxlc09iaiwgdGltZXN0YW1wOiBEYXRlLm5vdygpfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMsIEpTT04uc3RyaW5naWZ5KGVsaWdpYmlsaXR5UnVsZXNPYmopKTtcbiAgICAgIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzT2JqLnJ1bGVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZWxpZ2liaWxpdHkgcnVsZXM6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlNlZ21lbnRhdGlvbkNvbXB1dGVyXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cykge1xuICBsb2dnZXIubG9nKFwiRGV0ZXJtaW5pbmcgdXNlciBzZWdtZW50XCIpO1xuICB0cnkge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgICBpZiAoIXJ1bGVTZXQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW119KTtcbiAgICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjb21wdXRlIHVzZXIgc2VnbWVudFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVMsIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtmZXRjaFRyZWF0bWVudHMsIGZldGNoVHJlYXRtZW50V2VpZ2h0c30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIik7XG5cbmNsYXNzIFRyZWF0bWVudFJlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHMsIHVzZXJTZWdtZW50fSA9IGJvZHk7XG4gICAgdGhpcy50cmVhdG1lbnRzID0gdHJlYXRtZW50cztcbiAgICB0aGlzLnRyZWF0bWVudFdlaWdodHMgPSB0cmVhdG1lbnRXZWlnaHRzO1xuICAgIHRoaXMuY3VycmVudFBhZ2VUeXBlID0gbnVsbDtcbiAgICB0aGlzLnVzZXJTZWdtZW50ID0gdXNlclNlZ21lbnQ7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgICBjb25zdCB0cmVhdG1lbnRzT2JqID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oVFJFQVRNRU5UUykpO1xuICAgIGxldCB0cmVhdG1lbnRzID0gdHJlYXRtZW50c09iaj8udHJlYXRtZW50cztcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0cmVhdG1lbnRzT2JqPy50aW1lc3RhbXA7XG4gICAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0aW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIG5vdCBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlXCIpO1xuICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHRyZWF0bWVudHMsXG4gICAgICB9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICB9XG4gICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB0aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgIGlmIChlbGFwc2VkSG91cnMgPiBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBhcmUgZXhwaXJlZFwiKTtcbiAgICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VpZ2h0c09iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUyk7XG4gICAgICBpZiAod2VpZ2h0c09iaikge1xuICAgICAgICB3ZWlnaHRzT2JqID0gSlNPTi5wYXJzZSh3ZWlnaHRzT2JqKTtcbiAgICAgICAgaWYgKHdlaWdodHNPYmoudGltZXN0YW1wKSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB3ZWlnaHRzT2JqLnRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgICAgIGlmIChlbGFwc2VkSG91cnMgPCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2VpZ2h0c09iaiA9IGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgICAgaWYgKCF3ZWlnaHRzT2JqKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggd2VpZ2h0c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0ge3dlaWdodHM6IHdlaWdodHNPYmosIHRpbWVzdGFtcDogRGF0ZS5ub3coKX07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLldFSUdIVFMsIEpTT04uc3RyaW5naWZ5KHdlaWdodHNPYmopKTtcbiAgICAgIHJldHVybiB3ZWlnaHRzT2JqLndlaWdodHM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpIHtcbiAgICBjb25zdCB7TUFUQ0hFRF9UUkVBVE1FTlRTfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuICAgIGlmICghdGhpcy5jdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgIGNvbnN0IENQVCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgICAgIGlmICghQ1BUKSByZXR1cm4gW107XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlVHlwZSA9IENQVDtcbiAgICB9XG4gICAgbGV0IG1hdGNoZWRUcmVhdG1lbnRzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICBpZiAobWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLm1hdGNoQnlQYWdlVHlwZShtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgfVxuICAgIG1hdGNoZWRUcmVhdG1lbnRzID0gW107XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHMsIHVzZXJTZWdtZW50fSA9IHRoaXM7XG4gICAgaWYgKCF1c2VyU2VnbWVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgIGNvbnN0IHVzZXJTZWdtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHNbdXNlclNlZ21lbnRdO1xuICAgICAgaWYgKCF1c2VyU2VnbWVudFdlaWdodHMpIHJldHVybiBbXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRyZWF0bWVudHMpIHtcbiAgICAgICAgY29uc3Qge2lkLCBhY3Rpb25zLCBoZWxwZXJzfSA9IHRyZWF0bWVudDtcbiAgICAgICAgY29uc3QgbW9kZSA9IHVzZXJTZWdtZW50V2VpZ2h0c1tpZF0/Lm1vZGU7XG4gICAgICAgIGlmICghbW9kZSAmJiBkZWJ1Z01vZGUgIT09IDEpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoaGVscGVycyAmJiBBcnJheS5pc0FycmF5KGhlbHBlcnMpKSB7XG4gICAgICAgICAgaGVscGVycy5mb3JFYWNoKChoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWxwZXIgPSB0cmVhdG1lbnRzLmZpbmQoKHQpID0+IHQuaWQgPT09IGgpO1xuICAgICAgICAgICAgaWYgKGhlbHBlcikge1xuICAgICAgICAgICAgICBoZWxwZXIubW9kZSA9IG1vZGU7XG4gICAgICAgICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLnB1c2goaGVscGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24udmFyaWFudHMpIGNvbnRpbnVlO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudEtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb24udmFyaWFudHMpKSB7XG4gICAgICAgICAgICBjb25zdCB2YXJpYW50V2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW2lkXT8udmFyaWFudHM/Llt2YXJpYW50S2V5XTtcbiAgICAgICAgICAgIGlmICh2YXJpYW50V2VpZ2h0KSB7XG4gICAgICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSB2YXJpYW50V2VpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmVhdG1lbnQubW9kZSA9IG1vZGU7XG4gICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLnB1c2godHJlYXRtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlZFRyZWF0bWVudHNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oTUFUQ0hFRF9UUkVBVE1FTlRTLCBtYXRjaGVkVHJlYXRtZW50c1N0cmluZyk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubWF0Y2hCeVBhZ2VUeXBlKG1hdGNoZWRUcmVhdG1lbnRzU3RyaW5nKTtcbiAgfVxuXG4gIGFzeW5jIG1hdGNoQnlQYWdlVHlwZShtYXRjaGVkVHJlYXRtZW50cykge1xuICAgIHRyeSB7XG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IEpTT04ucGFyc2UobWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKG10KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrUGFnZVR5cGUobXQucGFnZVR5cGVzKTtcbiAgICAgIH0pO1xuICAgICAgbG9nZ2VyLmxvZyhgJHttYXRjaGVkVHJlYXRtZW50cy5sZW5ndGh9IHRyZWF0bWVudHMgdXNlciBzZWdtZW50IG1hdGNoZWRgKTtcbiAgICAgIHJldHVybiBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBnZXR0aW5nIG1hdGNoZWQgcm9ib3RzOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgY2hlY2tQYWdlVHlwZShwYWdlVHlwZXMpIHtcbiAgICBjb25zdCB7Y3VycmVudFBhZ2VUeXBlfSA9IHRoaXM7XG4gICAgaWYgKHBhZ2VUeXBlcyA9PT0gbnVsbCB8fCBwYWdlVHlwZXMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VUeXBlcykpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJQYWdlIFR5cGVzIHNob3VsZCBiZSBhbiBhcnJheVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHBhZ2VUeXBlc1swXS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgcGFnZVR5cGVzID0gcGFnZVR5cGVzLm1hcCgocHQpID0+IHB0LnN1YnN0cigxKSk7XG4gICAgICByZXR1cm4gIXBhZ2VUeXBlcy5pbmNsdWRlcyhjdXJyZW50UGFnZVR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZVR5cGVzLmluY2x1ZGVzKGN1cnJlbnRQYWdlVHlwZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJlYXRtZW50UmVwb3NpdG9yeTtcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IEJlYWNvbiBmcm9tIFwiLi4vR2xvdkJlYWNvblwiO1xuaW1wb3J0IFJvYm90RW5naW5lIGZyb20gXCIuLi9HbG92Um9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcbmltcG9ydCB7Y29tcHV0ZVNlZ21lbnR9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXIvc2VnbWVudC1jb21wdXRlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIjtcbmltcG9ydCB7XG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBzdGFydEluZm9MYXllclNjYW4sXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFNQTElUX1JBVElPLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIExBQl9SQVRJTyxcbiAgVkVSU0lPTixcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgc2V0VVJMRGF0YSxcbiAgc2V0QnJvd3NlckRhdGEsXG4gIHNldEFnZW50RGV0YWlscyxcbiAgZ2V0SWRlbnRpZmllcixcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxuICBkZXRlcm1pbmVQY3QsXG4gIGdldERlYnVnTW9kZSxcbiAgc3dpdGNoVG9FYXNlT3V0LFxuICBjaGVja1ZlcnNpb24sXG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzLFxuICBpbmplY3RTdHlsZVNoZWV0LFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcblxubGV0IGFuYWx5dGljc0xhYmVsID0gbnVsbDtcblxuKGFzeW5jIGZ1bmN0aW9uKCkge1xuICBzd2l0Y2hUb0Vhc2VPdXQoKTtcbiAgY2hlY2tWZXJzaW9uKCk7XG4gIGxldCBiZWFjb24gPSBudWxsO1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIGluaXRpYWxpemluZ1wiKTtcbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gIGxldCBpc09uID0gbnVsbDtcbiAgbGV0IGlzQ2hhbXAgPSBudWxsO1xuXG4gIHRyeSB7XG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IENSSVRJQ0FMIElOSVQgVEFTS1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWluaXRcIik7XG4gICAgc2V0VVJMRGF0YSgpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiLCBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IGF3YWl0IGdldElkZW50aWZpZXIoKTtcbiAgICBsb2dnZXIubG9nKFwiRm91bmQgaWRlbnRpZmllcjogXCIsIGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb29raWVQY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiwgY29va2llUGN0KTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZcIiwgVkVSU0lPTik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzclwiLCBTUExJVF9SQVRJTyk7XG5cbiAgICBiZWFjb24gPSBuZXcgQmVhY29uKCk7XG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IGJlYWNvbi5wYWNrQW5kUXVldWVBcnJpdmFsTG9nKCk7XG5cbiAgICAvLyBTTEE6IDIgc2Vjb25kcyB0byBmbGlja2VyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICB9LCAyMDAwKTtcblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWNyaXRpY2FsLWVudHJ5XCIpO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEVBUkxZIFBSVU5FIE9VVC1PRi1TQ09QRSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIHRlc3QgY29va2llLCBiZWFjb24sIGFuZCBzdHJpbmcgdXRpbHMgc3VwcG9ydFxuICAgIC8vIFRPRE86IHVzZSBwcm9wZXIgZmVhdHVyZSBkZXRlY3Rpb24gaW5zdGVhZCBvZiBkZXBlbmRpbmcgb24gYWdlbnQgc3RyaW5nXG4gICAgaWYgKFxuICAgICAgY29va2llUGN0ID09PSBudWxsIHx8XG4gICAgICAhbmF2aWdhdG9yLnNlbmRCZWFjb24gfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICB0eXBlb2YgU3RyaW5nPy5wcm90b3R5cGU/LnBhZFN0YXJ0ICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ubWF0Y2ggIT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgcHJvY2Vzc1Vuc3VwcG9ydGVkKCk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgdXNlckFnZW50IGNhbiBiZSBwcm9wZXJseSBwYXJzZWRcbiAgICBjb25zdCBzdGF0dXMgPSBzZXRBZ2VudERldGFpbHMoKTtcbiAgICAvLyBpZiBhZ2VudCBjYW5ub3QgYmUgcGFyc2VkLCBkbyBlYXJseSBicmVha1xuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBwcm9jZXNzVW5zdXBwb3J0ZWQoKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQVNZTkMgSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgY29uc3QgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudFdlaWdodHMoKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50cygpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvUHJvbWlzZSA9IHBlcnNpc3RQcm9kdWN0SW5mbygpO1xuXG4gICAgc2V0QnJvd3NlckRhdGEoKTtcbiAgICBhd2FpdCBzZXRVcEVsaWdpYmlsaXR5UnVsZUxpc3RlbmVycygpO1xuICAgIHN0YXJ0SW5mb0xheWVyU2NhbigpO1xuXG4gICAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICAgIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzKCk7XG5cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvbi1hc3luYy1pbml0XCIpO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFBPU1QgT09TID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIFRPRE86IHJlbW92ZSBwZXJtYW5lbnQgdW5zZWdtZW50ZWQtb29zIGFmdGVyIE9GRiBlbGlnaWJpbGl0eSBpcyBmaXhlZFxuXG4gICAgLy8gYXR0ZW1wdCB0byBjb21wdXRlIHVzZXIgc2VnbWVudFxuICAgIGxldCB1c2VyU2VnbWVudCA9IG51bGw7XG4gICAgbGV0IHRyZWF0bWVudFdlaWdodHMgPSBudWxsO1xuXG4gICAgdHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IHRyZWF0bWVudFdlaWdodHNQcm9taXNlO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcm9ib3Qtd2VpZ2h0c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29tcHV0ZSB1c2VyIHNlZ21lbnQgYW5kIGFkZCB0byBiZWFnbGVJbmZvTGF5ZXJcbiAgICAgIHVzZXJTZWdtZW50ID0gYXdhaXQgY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cyk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VyU2VnbWVudCkge1xuICAgICAgcHJvY2Vzc1Vuc3VwcG9ydGVkKCk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQURNSU4gVVNFUiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIFRPRE86IHJlbmFtZSBzaG93cm9vbSBsb2dpYyB0byBhZG1pbiwgYW5kIG1hcCB2dnNJc1Nob3dyb29tIHRvIGEgY29uZmlndXJhYmxlIGFkbWluIHBhcmFtXG5cbiAgICBsZXQgaXNBZG1pbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4pO1xuICAgIC8vIGlmIG5vdCBmb3VuZCBpbiBsb2NhbFN0b3JhZ2UsIGNoZWNrIGJlYWdsZUluZm9MYXllciB3aXRoIGJsb2NraW5nIG1vZGVcbiAgICBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlzQWRtaW4gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKTtcbiAgICAgIC8vIHBlcm1hbmVudCBsYWJlbCBjYW4gYmUgZmFsc2UsIGJ1dCBhZG1pbiB1c2VyIGNhbiBzdGlsbCBsb2dpbiBhbmQgdHVybiB0cnVlLCBsYXppbHkgZml4IHRoaXNcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IFwiZmFsc2VcIiB8fCBpc0FkbWluID09PSBmYWxzZSkge1xuICAgICAgLy8gYXN5bmMgY2FsbCB0byBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCB0aGVuIHNldCBsb2NhbFN0b3JhZ2VcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpLnRoZW4oKGlzQWRtaW4pID0+IHtcbiAgICAgICAgaWYgKGlzQWRtaW4gJiYgKGlzQWRtaW4gPT09IFwidHJ1ZVwiIHx8IGlzQWRtaW4gPT09IHRydWUpKSB7XG4gICAgICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByb2Nlc3NBZG1pblVzZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IG51bGwgfHwgaXNBZG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1hZG1pbi1zdGF0dXNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtZWFzZVwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYW50aS1mbGlja2VyLXRpbWVvdXRcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBPTi9PRkYgQ0hFQ0sgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGNoYW1waW9uIGlzIGFib3ZlIFNQTElUX1JBVElPIHBsdXMgTEFCX1JBVElPXG4gICAgaXNDaGFtcCA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTyAqICgxICsgTEFCX1JBVElPIC8gMTAwKTtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZSgpO1xuICAgIGNvbnN0IGlzRW1wbG95ZWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0VNUExPWUVFKTtcblxuICAgIGlmIChkZWJ1Z01vZGUgPiAwKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRGVidWcgbW9kZSBvbjogYWxsIGFwcGxpY2FibGUgdHJlYXRtZW50cyB3aWxsIGJlIGFwcGxpZWRcIik7XG4gICAgICBpc09uID0gdHJ1ZTtcbiAgICAgIGFuYWx5dGljc0xhYmVsID0gXCJlbXBsb3llZVwiO1xuICAgIH0gZWxzZSBpZiAoZGVidWdNb2RlID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGVidWctc2tpcC1yb2JvdHNcIik7XG4gICAgfSBlbHNlIGlmIChpc0VtcGxveWVlID09PSBcInRydWVcIiB8fCBpc0VtcGxveWVlID09PSB0cnVlKSB7XG4gICAgICBsb2dnZXIud2FybihcIlVzZXIgaXMgb3V0IG9mIHNjb3BlXCIpO1xuICAgICAgLy8gc2V0IGlzT24gdG8gdHJ1ZS9mYWxzZSB3aGVuIG5vdCBkZWJ1Z01vZGUgYnV0IG91dCBvZiBzY29wZSBpLmUuIG5kX2RlYnVnPTAgZm9yIHRlc3RhYmlsaXR5XG4gICAgICBpc09uID0gY29va2llUGN0ID49IFNQTElUX1JBVElPO1xuICAgICAgYW5hbHl0aWNzTGFiZWwgPSBcImVtcGxveWVlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGdyZWF0ZXIgdGhhbiBTUExJVF9SQVRJTywgdGhlbiBpbiBPTiBtb2RlXG4gICAgICBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPKSB7XG4gICAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgICBhbmFseXRpY3NMYWJlbCA9IFwidHJ1ZVwiO1xuICAgICAgfSBlbHNlIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8gLyAyKSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgYW5hbHl0aWNzTGFiZWwgPSBcImZhbHNlMlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICBhbmFseXRpY3NMYWJlbCA9IFwiZmFsc2UxXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEVBUkxZLVBST0NFU1MgQ09OVkVSU0lPTiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGF3YWl0IGNyaXRpY2FsIGluZm8gYmVmb3JlIHNlbmRpbmcgbG9ncyBmb3IgcHJvcGVyIGFuYWx5dGljcyBtZWFzdXJlbWVudHNcbiAgICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgICBpZiAocGFnZVR5cGUgPT09IFwiUHVyY2hhc2VcIikge1xuICAgICAgLy8gd2FpdCB1bnRpbCBjcml0aWNhbCBkYXRhIGlzIHNjcmFwcGVkXG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucmV2ZW51ZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgLy8gaWYgcHVyY2hhc2UgaXMgY29tcGxldGUsIGRvIG5vdCBhcHBseSBhbnkgdHJlYXRtZW50cyBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm9rLXNraXAtcm9ib3RzXCIpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBST0JPVCBQQVRIcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW50ZXJpbmctcm9ib3QtcGF0aFwiKTtcblxuICAgIGlmIChpc09uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1pc09uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgbGV0IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gbnVsbDtcbiAgICBpZiAoZGVidWdNb2RlICYmIHNlYXJjaFBhcmFtcy5pbmNsdWRlcyhcImZpbHRlcj1cIikpIHtcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICAgIHNlYXJjaFBhcmFtcy5pbmRleE9mKFwiW1wiKSArIDEsXG4gICAgICAgICAgc2VhcmNoUGFyYW1zLmxhc3RJbmRleE9mKFwiXVwiKSxcbiAgICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50c1Byb21pc2U7XG5cbiAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJvYm90LXdlaWdodHNcIik7XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiRm91bmQgdHJlYXRtZW50czogXCIsIHRyZWF0bWVudHMpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtdHJlYXRtZW50c1wiKTtcblxuICAgIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0cywgdXNlclNlZ21lbnR9KTtcblxuICAgIGNvbnN0IG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50UmVwb3NpdG9yeS5nZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpO1xuICAgIGlmIChtYXRjaGVkVHJlYXRtZW50cyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8tc2VnbWVudC1pbi1jb25maWdcIik7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHByb2R1Y3RJbmZvUHJvbWlzZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInByb2R1Y3QtaW5mby1uby1wZXJzaXN0XCIpO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwaW5mby1wZXJzaXN0ZWRcIik7XG5cbiAgICBpZiAoIW1hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwib2stbm8tbWF0Y2hpbmctcm9ib3RzXCIpO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmb3VuZC1tYXRjaGVkLXJvYm90c1wiKTtcblxuICAgIGNvbnN0IHJvYm90RW5naW5lID0gbmV3IFJvYm90RW5naW5lKHtcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZGVidWdNb2RlLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgcGFnZVR5cGUsXG4gICAgICBpc09uLFxuICAgICAgaXNDaGFtcCxcbiAgICB9KTtcbiAgICBhd2FpdCByb2JvdEVuZ2luZS5lbmdhZ2VSb2JvdHMoKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvay1yb2JvdHMtZW5nYWdlZFwiKTtcbiAgICBsb2dnZXIuc3VjY2VzcyhcIkFwcGxpZWQgdHJlYXRtZW50czogXCIsIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLndhcm4oXCJFbnRyeXBvaW50IGNhdGNoOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBlcnIubWVzc2FnZSk7XG4gIH0gZmluYWxseSB7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgaWYgKGlzT24gIT09IG51bGwpIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNPblwiLCBpc09uKTtcbiAgICBpZiAoaXNPbiAhPT0gbnVsbCAmJiBpc0NoYW1wICE9PSBudWxsKSBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzQ2hhbXBcIiwgKGlzT24gJiYgaXNDaGFtcCkpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBhbmFseXRpY3NMYWJlbCk7XG4gICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IGFuYWx5dGljc0xhYmVsfSk7XG4gICAgYXdhaXQgYmVhY29uLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgfVxufSkoKTtcblxuYXN5bmMgZnVuY3Rpb24gc2V0VXBFbGlnaWJpbGl0eVJ1bGVMaXN0ZW5lcnMoKSB7XG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBSdWxlRW5naW5lLmdldEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm47XG4gIGNvbnN0IHJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7ZWxpZ2liaWxpdHlSdWxlc30pO1xuICBhd2FpdCBydWxlRW5naW5lLmluaXRpYWxpemVMaXN0ZW5lcnMoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICBjb25zdCBwcm9kdWN0SW5mb0RCID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgYXdhaXQgcHJvZHVjdEluZm9EQi5wZXJzaXN0UHJvZHVjdEluZm8oKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1Vuc3VwcG9ydGVkKCkge1xuICBhbmFseXRpY3NMYWJlbCA9IFwidW5zdXBwb3J0ZWRcIjtcbiAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWQtZGV2aWNlXCIpO1xufVxuXG4vLyBpZiBhZG1pbiB1c2VyLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgbWFyayBhcyBlbXBsb3llZVxuZnVuY3Rpb24gcHJvY2Vzc0FkbWluVXNlcigpIHtcbiAgYW5hbHl0aWNzTGFiZWwgPSBcImVtcGxveWVlXCI7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIHRydWUpO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJhZG1pbi1lbXBsb3llZVwiKTtcbn1cbiJdLCJuYW1lcyI6WyJyZXBsYWNlQWxsIiwic3RyIiwiZmluZCIsInJlcGxhY2UiLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJ0dXJraXNoVG9Mb3dlciIsInN0cmluZyIsImxldHRlcnMiLCJsZXR0ZXIiLCJ0b0xvd2VyQ2FzZSIsImlzU3RhZ2luZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluY2x1ZGVzIiwiVkVSU0lPTiIsIkNPT0tJRV9OQU1FIiwiVFJFQVRNRU5UU19MT0NBVElPTiIsIlRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OIiwiU1RZTEVTSEVFVF9MT0NBVElPTiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIkVfUlVMRVNfTE9DQVRJT04iLCJQUk9EVUNUX0lORk9fTE9DQVRJT04iLCJMT0dfQVBJX1VSTCIsIkxPT0tVUF9BUElfVVJMIiwiTU9CSUxFX01FRElBX1FVRVJZIiwiU1BMSVRfUkFUSU8iLCJMQUJfUkFUSU8iLCJDSEFNUF9TS0lQX1JBVElPIiwiTEFCX1NLSVBfUkFUSU8iLCJMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUyIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJTRVNTSU9OX1JFRkVSUkVSIiwiTUFUQ0hFRF9UUkVBVE1FTlRTIiwiTE9DQUxfU1RPUkFHRV9LRVlTIiwiVFJFQVRNRU5UUyIsIldFSUdIVFMiLCJFTElHSUJJTElUWV9SVUxFUyIsIkRFQlVHX01PREUiLCJVU0VSX0lEIiwiREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRSIsIklTX0FETUlOIiwiSVNfRU1QTE9ZRUUiLCJDVVNUT01fU1RPUkFHRV9QUkVGSVgiLCJMb2dnZXIiLCJvcmlnaW4iLCJ0ZXN0aW5nIiwiREVCVUciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXJncyIsImNvbnNvbGUiLCJpbmZvIiwibG9nIiwibWVzc2FnZUNvbmZpZyIsImZvckVhY2giLCJhcmd1bWVudCIsInR5cGUiLCJ3YXJuIiwiZXJyb3IiLCJhZGRUb0JlYWdsZUluZm9MYXllciIsImxvZ2dlciIsIm1vbnRocyIsInJlbW92ZURvY3VtZW50SGlkZSIsInRvcCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwic3dpdGNoVG9FYXNlT3V0IiwiY29udGFpbnMiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInByZXBlbmQiLCJhZGQiLCJmZXRjaFRyZWF0bWVudHMiLCJmZXRjaFBsdXMiLCJ0cmVhdG1lbnRzIiwiRXJyb3IiLCJqc29uIiwianNvblRyZWF0bWVudCIsImZhaWxlZCIsIm1lc3NhZ2UiLCJmZXRjaFRyZWF0bWVudFdlaWdodHMiLCJ0cmVhdG1lbnRXZWlnaHRzIiwianNvblRyZWF0bWVudFdlaWdodHMiLCJmZXRjaEVsaWdpYmlsaXR5UnVsZXMiLCJlbGlnaWJpbGl0eVJ1bGVzIiwianNvbkVsaWdpYmlsaXR5UnVsZXMiLCJmZXRjaFByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mb0pzb24iLCJ0aW1lb3V0IiwidGltZSIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJ0aW1lb3V0SUQiLCJzZXRUaW1lb3V0IiwiYWJvcnQiLCJ1cmwiLCJvcHRpb25zIiwicmV0cmllcyIsImZldGNoIiwic2lnbmFsIiwidGhlbiIsInJlcyIsIm9rIiwiY2xlYXJUaW1lb3V0Iiwic3RhdHVzIiwiY2F0Y2giLCJleHRyYWN0Q29va2llSWRlbnRpZmllciIsImNvb2tpZVN0cmluZyIsImNvb2tpZU5hbWUiLCJwYXJzZWQiLCJzcGxpdCIsIm1hcCIsInYiLCJyZWR1Y2UiLCJhY2MiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0cmltIiwiaWRlbnRpZmllciIsImlkZW50aWZpZXJJbmRleCIsImRldGVybWluZVBjdCIsIm5vdyIsIm1vbnRoIiwiZ2V0TW9udGgiLCJoYXNoIiwiZ2V0VW5zZWN1cmVIYXNoIiwidG9TdHJpbmciLCJwY3QiLCJleGl0U2Nyb2xsTGlzdGVuZXIiLCJjYWxsQmFjayIsImxvb3AiLCJzY3JvbGxUb3AiLCJsYXN0U2Nyb2xsVG9wIiwiY2xlYXJJbnRlcnZhbCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInNldEludGVydmFsIiwic3R5bGVBcHBsaWNhdG9yIiwiZWxlbWVudHMiLCJzdHlsZUNoYW5nZXNNYXAiLCJpIiwiZWxlbWVudCIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJyZWwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwcmVwYXJlQWN0aW9ucyIsImFjdGlvbnNUb1ByZXBhcmUiLCJidXNpbmVzc1J1bGVJZCIsImRlYnVnTW9kZSIsImFjdGlvbnMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ2YXJpYW50IiwiYWN0aW9uIiwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zIiwidmFyaWFudHMiLCJidXNpbmVzc1RyYW5zZm9ybWF0aW9uIiwiaWQiLCJrZXlzIiwidmFyaWFudEtleSIsInJhbmRvbVBjdCIsIndlaWdodCIsIk1hdGgiLCJmbG9vciIsImNoZWNrQWN0aW9uU2VsZWN0b3JzIiwib3BlcmF0b3IiLCJzZWxlY3RvciIsInNlbGVjdG9yRmFsbGJhY2siLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMiLCJwb3B1cERpc3BsYXlGbGFnIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXNzaW9uVGltZXN0YW1wIiwic2Vzc2lvbkhpc3RvcnkiLCJzZXRJdGVtIiwicGF0aG5hbWUiLCJjb25kaXRpb25DaGVja2VyIiwicnVuVGltZVZhbHVlIiwiY29uZGl0aW9uIiwic3VjY2VzcyIsInVuZGVmaW5lZCIsIm1pbiIsIm1heCIsInBhcnNlSW50IiwicmVnZXgiLCJSZWdFeHAiLCJ0ZXN0IiwiZ2V0RGVidWdNb2RlIiwicXVlcnlTdHJpbmciLCJzZWFyY2giLCJjdXJyZW50IiwicmVtb3ZlSXRlbSIsIk51bWJlciIsImlzTmFOIiwiZXJyIiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsImFicyIsImdldFJhbmRvbUludCIsInJhbmRvbSIsImdldFVuaXhUaW1lIiwiZ2V0SWRlbnRpZmllciIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImUiLCJkZWxheSIsIm1zIiwiZm9ybWF0RGVsaXZlcnlEYXRlIiwiZGF0ZSIsInJlc3VsdCIsInN0YXJ0TW9udGhJbmRleCIsImVuZE1vbnRoSW5kZXgiLCJzdGFydERheSIsImVuZERheSIsIm1hdGNoIiwidG9kYXkiLCJzdGFydFllYXIiLCJnZXRGdWxsWWVhciIsImVuZFllYXIiLCJlc3RpbWF0ZWRTdGFydCIsImVzdGltYXRlZEVuZCIsInN0YXJ0RGlmZk92ZXJEYXlzIiwiY2VpbCIsImVuZERpZmZPdmVyRGF5cyIsInN0YXJ0RGlmZk92ZXJXZWVrcyIsImVuZERpZmZPdmVyV2Vla3MiLCJpZGxlVGltZXIiLCJ0aW1lT3V0IiwicmVzZXRUaW1lciIsImlkbGVUaW1lb3V0Iiwib250b3VjaHN0YXJ0IiwiaXNPd25NdXRhdGlvbiIsIm11dGF0aW9uTGlzdCIsIm5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsInNvbWUiLCJuIiwidGFnTmFtZSIsImMiLCJzZXRBZ2VudERldGFpbHMiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImJyIiwiYk5hbWUiLCJiVmVyc2lvbiIsIm9zIiwiV2luZG93cyIsIk1hYyIsIkxpbnV4IiwiQW5kcm9pZCIsImlPUyIsIm9zVmVyc2lvbiIsIm9zTmFtZSIsImlzTW9iaWxlIiwib3NWZXJzaW9uSW50IiwiaXNTdXBwb3J0ZWRCcm93c2VyIiwiaXNTdXBwb3J0ZWRPUyIsInNldEJyb3dzZXJEYXRhIiwid2luZG93UHRyIiwibmF2UHRyIiwicGxhdGZvcm0iLCJ1c2VyQWdlbnREYXRhIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImF2YWlsV2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwid2luZG93RGVwdGgiLCJjb2xvckRlcHRoIiwicGl4ZWxEZXB0aCIsInZwb3J0U2hhcGUiLCJ2aXN1YWxWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0Iiwicm91bmQiLCJvcmllbnRhdGlvbkFuZ2xlIiwib3JpZW50YXRpb24iLCJhbmdsZSIsInRlbXAiLCJoaXN0b3J5IiwibmF2QWdlbnQiLCJicmFuZHMiLCJicmFuZCIsInZlcnNpb24iLCJqb2luIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwic2V0VVJMRGF0YSIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsInBhZ2VUeXBlIiwiaWRiUmVhZHkiLCJpc1NhZmFyaSIsImluZGV4ZWREQiIsImRhdGFiYXNlcyIsImludGVydmFsSWQiLCJ0cnlJZGIiLCJmaW5hbGx5IiwiY2hlY2tWZXJzaW9uIiwiY3VycmVudFZlcnNpb24iLCJMU19QcmVmaXgiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJmZWF0dXJlS2V5Iiwib3BLZXkiLCJzdG9yYWdlIiwicGFyc2VGbG9hdCIsInZhbEhhc2giLCJvcEtleVZhbCIsIm9wS2V5VmFsTmFtZSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJxdWVyeU1ldGhvZCIsImxvY2FsS2V5cyIsImxvY2FsS2V5c0ZpbHRlcmVkIiwiZmlsdGVyIiwic3VtIiwibWF4Q291bnQiLCJtYXhWYWwiLCJ2YWwiLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwibmFtZSIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiZGVyaXZlTWV0aG9kIiwiY3VzdG9tRGVyaXZhdGlvblJlcG8iLCJjYWxjdWxhdGVDb3Vwb25BbGxvd2FuY2VzIiwiY2FycnlTa3VUb0ZlYXR1cmVzIiwiYmVhZ2xlSW5mb0xheWVyIiwiYSIsImYiLCJfX2h3bSIsImluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNIiwiaW5mb0xheWVyIiwidHlwZWRWYWx1ZSIsImxhc3RLZXkiLCJwb3AiLCJvYmoiLCJ1cGRhdGVEZXJpdmF0aW9ucyIsInBhc3NWYWx1ZVRvTGlzdGVuZXJzIiwiREFUQV9MSVNURU5FUlMiLCJhZGREYXRhTGlzdGVuZXIiLCJsaXN0ZW5lciIsInB1c2giLCJwcmV2UGFzc2VkVmFsdWVzIiwibGlzdGVuZXJzIiwiaXNBcnJheSIsImdldEZyb21CZWFnbGVJbmZvTGF5ZXIiLCJibG9ja2luZyIsInBvbGxJbnRlcnZhbCIsIm9idGFpbkRhdGEiLCJqc29uR2V0Iiwic2VhcmNoRWxlbWVudCIsImlzRm91bmQiLCJpc0lnbm9yZSIsImludGVydmFsIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiY3VzdG9tRGVyaXZhdGlvbkNvbXBpbGVkUmVwbyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwiZGVyaXZlRnVuY3RTdHJpbmciLCJkZXJpdmVGdW5jdCIsIkZ1bmN0aW9uIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwidG9CZVVwZGF0ZWQiLCJjaGlsZCIsImNoaWxkRWxlbWVudHMiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJ0cmlnZ2VyUmVzdGFydCIsInN0YXJ0SW5mb0xheWVyU2NhbiIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaW5uZXJUZXh0IiwiYXR0cmliVmFsdWVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInZhbHVlY2hpbGQiLCJhdHRyaWJWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInNldFZhbHVlIiwic3VtUHJpY2UiLCJjaGlsZFRleHQiLCJhcnJheUlubmVyVGV4dCIsImV4Y2x1c2l2ZUVsZW1lbnQiLCJwYXJzZVNlYXJjaFBhdGhzIiwiZG9tU3RhdHVzIiwicmVhZHlTdGF0ZSIsIndpbnRvcCIsImRhdGFMYXllciIsIndpbmRvYyIsImZvdW5kTmFtZXMiLCJTZXQiLCJwcmV2Rm91bmROYW1lcyIsIm5vdEZvdW5kTmFtZXMiLCJjdXJyZW50UGFnZVR5cGUiLCJoYXMiLCJzZWFyY2hBbmRTZXQiLCJkYXRhTGF5ZXJJdGVtIiwic29yZ0FycmF5SW5uZXIiLCJnZXRTT1JHQXJyYXkiLCJzb3JnSXRlbSIsInNpemUiLCJwYXRoIiwicGF0aEFycmF5Iiwic3ViUGF0aCIsInNsaWNlIiwic3ViQXJyYXkiLCJzdWJLZXkiLCJzdWJWYWx1ZSIsInNjaGVtYU9yZ0VsdHMiLCJzb3JnQXJyYXkiLCJzVGFnIiwiY250bnQiLCJqc29uY29udGVudCIsIkhFQURFUlMiLCJCZWFjb24iLCJoYXNBcnJpdmFsTG9nU2VudCIsImhhc01haW5Mb2dTZW50IiwiaGFzVXBkYXRlc1NlbnQiLCJoaWdoV2F0ZXJNYXJrIiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwiaHdtIiwiYWxsIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJib2R5IiwibGMiLCJ1Iiwib25IYXNoUGN0IiwiQmxvYiIsInN0YXJ0c1dpdGgiLCJzIiwibSIsInZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwidmlzaWJpbGl0eVN0YXRlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJyZXBsYWNlciIsInJlcGxhY2VGbiIsImN1cnJlbnRSZXBsYWNlRm4iLCJyZXBsYWNlT2JqZWN0RXh0cmFjdG9yIiwicmVwbGFjZVZhbCIsInJlcGxhY2VGbkV4ZWN1dG9yIiwickZuIiwic2luZ2xlIiwicmVwbGFjZUZ1bmN0aW9uIiwia2V5RmFsbGJhY2siLCJjb25maWciLCJkYk5hbWUiLCJzdG9yZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJrZXlQYXRoIiwib3BlbkRCIiwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSIsImluaXQiLCJ1cGdyYWRlIiwiZGIiLCJvbGRWZXJzaW9uIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImlkeCIsImNyZWF0ZUluZGV4IiwicmVqZWN0IiwicmVhZHdyaXRlIiwiZ2V0REIiLCJ0cmFuc2FjdGlvbiIsInBheWxvYWQiLCJnZXRTdG9yZSIsInRpbWVzdGFtcCIsInNhdmVQcm9taXNlcyIsImxvYWQiLCJwdXQiLCJjbGVhciIsInNrdSIsImNvdW50Iiwib3BlbkN1cnNvciIsImN1cnNvciIsImNsZWFyUHJvbWlzZSIsImV4aXN0aW5nUHJvZEluZm8iLCJnZXRDdXJzb3IiLCJlbGFwc2VkU2Vjb25kcyIsInByb2R1Y3RJbmZvUHJvbWlzZSIsInByb2R1Y3RJbmZvQXJyYXkiLCJzYXZlIiwicHJlcGFyZVBheWxvYWRzIiwicGF5bG9hZHMiLCJmaWVsZE5hbWVzIiwic2hpZnQiLCJjYWxsYmFjayIsInNrdUxpc3QiLCJwcm9kdWN0SW5mb1RpbWVvdXQiLCJwcm9kdWN0SW5mb0ludGVydmFsIiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJhcHBseUFjdGlvbnMiLCJ0cmFuc2Zvcm1lciIsImFwcGx5RXZlbnQiLCJjb250ZW50U2VsZWN0b3IiLCJtZENvbmRpdGlvbiIsInBUeXBlIiwicHJvZHVjdEluZm9TdG9yYWdlIiwiJCIsIm1jIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJiZWZvcmUiLCJhZnRlciIsImFwcGVuZCIsIm9mZiIsImNyZWF0ZVBvcHVwIiwiZWxtIiwidGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGlzcGxheU1vZGFsIiwiZ2V0UHJvZHVjdEluZm8iLCJldmVudCIsImRpc3BsYXlQb3B1cCIsInIiLCJkIiwicHVzaFN0YXRlIiwic3RhdGUiLCJvbmNlIiwidGV4dCIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsIm4xIiwibjIiLCJzd2FwTm9kZXMiLCJzY3JpcHRJRCIsImdldEVsZW1lbnRCeUlkIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJzZW50ZW5jZSIsIndvcmQiLCJjaGFyQXQiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInByZXBhcmVGaW5hbFRpdGxlIiwiZmluYWxUaXRsZSIsImNvbnRlbnRzIiwibm9kZVR5cGUiLCJub2RlVmFsdWUiLCJwcmVwYXJlRGVzY0VsbSIsImRlc2NyaXB0aW9uRWxtIiwibWFya2V0aW5nQ29weSIsInVwZGF0ZWRIdG1sU3RyaW5nIiwicmVwbGFjZVdpdGhWYWwiLCJ0aXRsZUF1Z21lbnQiLCJodG1sU3RyIiwic2FsZUNudFZpc2l0b3JzSW4xNSIsImNhcnRDbnRWaXNpdG9yc0luMTUiLCJ2aWV3Q250VmlzaXRvcnNJbjEiLCJ0aXRsZXMiLCJwYXJzZWRUaXRsZXMiLCJwYXJzZWRUaXRsZSIsImhpZGRlbiIsImhhbmRsZVBvcHVwQ2xpY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlTW9kYWxDbGljayIsImhpZGUiLCJxUG9wdXAiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJzcmMiLCJ0ZW1wbGF0ZSIsImlubmVySFRNTCIsInBvcHVwIiwiY29udGVudCIsImZpcnN0Q2hpbGQiLCJwMSIsInBhcmVudE5vZGUiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJlbGlnaWJsZUVsZW1lbnRzIiwiY2hlY2tBY3Rpb25Db25kaXRpb24iLCJhdHRyaWJ1dGUiLCJpbm5lcl9jb25kaXRpb24iLCJjaGFpbiIsImNvbmRpdGlvbkVsZW1lbnRzIiwiYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciIsImVsZW1lbnRTa3UiLCJmbiIsIk11dGV4IiwiT0JTRVJWRVJfQ09ORklHIiwiYXR0cmlidXRlcyIsIlJvYm90RW5naW5lIiwiZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMiLCJtYXRjaGVkVHJlYXRtZW50cyIsImlzT24iLCJpc0NoYW1wIiwiZW5nYWdlbWVudExvY2siLCJyZUFwcGx5VHJlYXRtZW50c01hcCIsImFkZGVkRGF0YUxpc3RlbmVySWRzIiwicm9ib3RQcm9taXNlcyIsInRyZWF0bWVudCIsImVuZ2FnZVJvYm90IiwiaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAiLCJlbGlnaWJpbGl0eVJ1bGVTZXQiLCJkZXZpY2UiLCJidXNpbmVzc1J1bGVTZXQiLCJoZWxwZXJzIiwibW9kZSIsImFwcGx5IiwiYWNxdWlyZSIsInJlbGVhc2UiLCJjaGVja0VsaWdpYmlsaXR5UnVsZVNldCIsInJhbmRvbVBjdFByb21pc2UiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJwcmVwYXJlZEFjdGlvbnMiLCJpc0VsaWdpYmxlIiwic2tpcFJhdGlvIiwiZW5nYWdlSGVscGVycyIsImFkZFJlYXBwbHlFdmVudCIsImFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzIiwiaGVscGVyUm9ib3RQcm9taXNlcyIsImNoZWNrIiwiYXBwbGllZCIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJ0IiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJib3VuZEVuZ2FnZVRyZWF0bWVudCIsImJpbmQiLCJzZWxlY3RvcnMiLCJleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzIiwicnVsZVNldCIsInByZXZpb3VzU2VsZWN0b3JzIiwicnVsZSIsInNldCIsImVsaWdpYmlsaXR5UnVsZSIsIm9wcG9zaXRlRmxhZyIsImVsaWdpYmlsaXR5U2NvcGUiLCJlbGlnaWJpbGl0eU5hbWUiLCJlbGlnaWJpbGl0eVNldFR5cGUiLCJwcmV2aW91c0lzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiY2hlY2tEYXRhTGF5ZXJSdWxlIiwiZGF0YUxheWVyRmluZGVyIiwicnVudGltZVZhbHVlIiwiY2hlY2tFbGVtZW50UnVsZSIsInNlbGVjdG9yQWxsIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiY2hlY2tTZXNzaW9uUnVsZSIsImR1cmF0aW9uSGFuZGxlciIsImhpc3RvcnlIYW5kbGVyIiwiZ2V0U2Vzc2lvblRpbWVzdGFtcCIsImR1cmF0aW9uIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiY2hlY2tQcm9kdWN0SW5mb1J1bGUiLCJnZXRUcmFuc2FjdGlvbkNvdW50IiwiZ2V0QWRkVG9DYXJ0Q291bnQiLCJnZXRQcmV2aWV3Q291bnQiLCJnZXRUaXRsZSIsImdldERlc2NyaXB0aW9uIiwiZ2V0RnJvbURCIiwiY2hlY2tEb2N1bWVudFJ1bGUiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbl9jb25kaXRpb24iLCJydWxlcyIsImVsaWdpYmxlUnVsZXMiLCJybiIsInNldFVwTGlzdGVuZXJzIiwiZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzIiwiZGF0YUxheWVyUnVsZXMiLCJlbGVtZW50UnVsZXMiLCJwcm9kdWN0SW5mb1J1bGVzIiwiYm91bmRBc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJhc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJtdXRhdGlvblJlY29yZCIsImV2ZXJ5IiwiY2hlY2tJbml0aWFsaXplZCIsImJhc2VSdWxlIiwiZWxpZ2liaWxpdHlSdWxlc09iaiIsImVsYXBzZWRIb3VycyIsImNvbXB1dGVTZWdtZW50Iiwic2VnbWVudCIsInNlZ21lbnRSdWxlRW5naW5lIiwiY2hlY2tSdWxlcyIsIlRyZWF0bWVudFJlcG9zaXRvcnkiLCJ1c2VyU2VnbWVudCIsIkNQVCIsIm1hdGNoQnlQYWdlVHlwZSIsInVzZXJTZWdtZW50V2VpZ2h0cyIsImgiLCJoZWxwZXIiLCJ2YXJpYW50V2VpZ2h0IiwibWF0Y2hlZFRyZWF0bWVudHNTdHJpbmciLCJtdCIsImNoZWNrUGFnZVR5cGUiLCJwYWdlVHlwZXMiLCJwdCIsInN1YnN0ciIsInRyZWF0bWVudHNPYmoiLCJ0cmVhdG1lbnRXaXRoVGltZXN0YW1wIiwid2VpZ2h0c09iaiIsIndlaWdodHMiLCJhbmFseXRpY3NMYWJlbCIsImJlYWNvbiIsImNvb2tpZVBjdCIsInBhY2tBbmRRdWV1ZUFycml2YWxMb2ciLCJTdHJpbmciLCJwcm90b3R5cGUiLCJwYWRTdGFydCIsInByb2Nlc3NVbnN1cHBvcnRlZCIsInRyZWF0bWVudFdlaWdodHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50cyIsInBlcnNpc3RQcm9kdWN0SW5mbyIsInNldFVwRWxpZ2liaWxpdHlSdWxlTGlzdGVuZXJzIiwiaXNBZG1pbiIsInByb2Nlc3NBZG1pblVzZXIiLCJpc0VtcGxveWVlIiwic2VhcmNoUGFyYW1zIiwibGFzdEluZGV4T2YiLCJpdGVtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsImdldE1hdGNoZWRUcmVhdG1lbnRzIiwicm9ib3RFbmdpbmUiLCJlbmdhZ2VSb2JvdHMiLCJHTE9WX09OIiwiZ2V0RWxpZ2liaWxpdHlSdWxlcyIsInJ1bGVFbmdpbmUiLCJpbml0aWFsaXplTGlzdGVuZXJzIiwicHJvZHVjdEluZm9EQiJdLCJzb3VyY2VSb290IjoiIn0=
