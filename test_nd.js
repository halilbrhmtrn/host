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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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SUFBQTtFQUFBLENBQ3pDO0VBQUE7QUFBQTtBQUVELFNBQVNMLGtCQUFrQixHQUFHO0VBQzVCUCxjQUFjLEdBQUcsYUFBYTtFQUM5QixNQUFNLElBQUk5dEIsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0FBQ3ZDOztBQUVBO0FBQ0EsU0FBUzZ1QixnQkFBZ0IsR0FBRztFQUMxQmYsY0FBYyxHQUFHLFVBQVU7RUFDM0J6eUIsTUFBTSxDQUFDNEMsWUFBWSxDQUFDMkksT0FBTyxDQUFDekosMkJBQTJCLEVBQUUsSUFBSSxDQUFDO0VBQzlELE1BQU0sSUFBSTZDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUNuQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvc3RyaW5nVXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvY29sbGVjdG9yLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL2NvbmZpZ3MuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92QmVhY29uL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL3JlcGxhY2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvd3JhcC1pZGItdmFsdWUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2FzeW5jLW11dGV4L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZSb2JvdEVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZGF0YUxheWVyQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZWxlbWVudENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2Z1bmN0aW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvc2Vzc2lvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3VybENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VudkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Byb2R1Y3RJbmZvQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZG9jdW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZHYXRlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIFwidXNlIHN0cmljdFwiOyAvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovXG4gIG1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSA9IGZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIGV4cG9ydHMgPSB7fSxcbiAgICBPcCA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHksXG4gICAgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgICBvYmpba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgfSxcbiAgICAkU3ltYm9sID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgPyBTeW1ib2wgOiB7fSxcbiAgICBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCIsXG4gICAgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICAgIHdyaXRhYmxlOiAhMFxuICAgIH0pLCBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yLFxuICAgICAgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpLFxuICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KSwgZ2VuZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpICYmIChJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKFwidGhyb3dcIiAhPT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmcsXG4gICAgICAgICAgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiBcIm9iamVjdFwiID09IF90eXBlb2YodmFsdWUpICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikgPyBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkgOiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQsIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICB9XG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgaWYgKFwiZXhlY3V0aW5nXCIgPT09IHN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgIGlmIChcInRocm93XCIgPT09IG1ldGhvZCkgdGhyb3cgYXJnO1xuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZCwgY29udGV4dC5hcmcgPSBhcmc7Oykge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcIm5leHRcIiA9PT0gY29udGV4dC5tZXRob2QpIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztlbHNlIGlmIChcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB7XG4gICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBjb250ZXh0Lm1ldGhvZCAmJiBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBcImNvbXBsZXRlZFwiIDogXCJzdXNwZW5kZWRZaWVsZFwiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUgJiYgKHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZCxcbiAgICAgIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgIGlmICh1bmRlZmluZWQgPT09IG1ldGhvZCkgcmV0dXJuIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBcInRocm93XCIgPT09IG1ldGhvZE5hbWUgJiYgZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0gJiYgKGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQsIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpLCBcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB8fCBcInJldHVyblwiICE9PSBtZXRob2ROYW1lICYmIChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAnXCIgKyBtZXRob2ROYW1lICsgXCInIG1ldGhvZFwiKSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgcmV0dXJuIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcsIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICByZXR1cm4gaW5mbyA/IGluZm8uZG9uZSA/IChjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZSwgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYywgXCJyZXR1cm5cIiAhPT0gY29udGV4dC5tZXRob2QgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpIDogaW5mbyA6IChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIiksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG4gICAgMSBpbiBsb2NzICYmIChlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV0pLCAyIGluIGxvY3MgJiYgKGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdLCBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM10pLCB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIiwgZGVsZXRlIHJlY29yZC5hcmcsIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV0sIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKSwgdGhpcy5yZXNldCghMCk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGl0ZXJhYmxlLm5leHQpIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgZm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkgcmV0dXJuIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dC52YWx1ZSA9IHVuZGVmaW5lZCwgbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogITBcbiAgICB9O1xuICB9XG4gIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lUHJvcGVydHkoR3AsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSwgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBnZW5GdW4gJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiAhIWN0b3IgJiYgKGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA9PT0gKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSk7XG4gIH0sIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpIDogKGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIikpLCBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCksIGdlbkZ1bjtcbiAgfSwgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKSwgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIHZvaWQgMCA9PT0gUHJvbWlzZUltcGwgJiYgKFByb21pc2VJbXBsID0gUHJvbWlzZSk7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKSwgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIiksIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pLCBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpLFxuICAgICAga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cy5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsga2V5cy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkgcmV0dXJuIG5leHQudmFsdWUgPSBrZXksIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgIH07XG4gIH0sIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoc2tpcFRlbXBSZXNldCkge1xuICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQsIHRoaXMuZG9uZSA9ICExLCB0aGlzLmRlbGVnYXRlID0gbnVsbCwgdGhpcy5tZXRob2QgPSBcIm5leHRcIiwgdGhpcy5hcmcgPSB1bmRlZmluZWQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhc2tpcFRlbXBSZXNldCkgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgIFwidFwiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLmRvbmUgPSAhMDtcbiAgICAgIHZhciByb290UmVjb3JkID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByb290UmVjb3JkLnR5cGUpIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSBcInRocm93XCIsIHJlY29yZC5hcmcgPSBleGNlcHRpb24sIGNvbnRleHQubmV4dCA9IGxvYywgY2F1Z2h0ICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKFwicm9vdFwiID09PSBlbnRyeS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIiksXG4gICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNGaW5hbGx5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHRocm93IHJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSByZWNvcmQudHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHJlY29yZC50eXBlID8gdGhpcy5uZXh0ID0gcmVjb3JkLmFyZyA6IFwicmV0dXJuXCIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSBcInJldHVyblwiLCB0aGlzLm5leHQgPSBcImVuZFwiKSA6IFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIGZpbmlzaChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uIF9jYXRjaCh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gZGVsZWdhdGVZaWVsZChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9LCBcIm5leHRcIiA9PT0gdGhpcy5tZXRob2QgJiYgKHRoaXMuYXJnID0gdW5kZWZpbmVkKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH0sIGV4cG9ydHM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvYmopO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS5cblxudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi4vaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWVcIikoKTtcbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcblxuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9wYWNrYWdlcy9ydW50aW1lL3J1bnRpbWUuanMjTDczNj1cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCB0b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGNvbnN0IHJlcGxhY2VBbGwgPSAoc3RyLCBmaW5kLCByZXBsYWNlID0gXCJcIikgPT4ge1xuICBpZiAoIXN0cikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIHN0cjtcblxuICB3aGlsZSAoc3RyLmluZGV4T2YoZmluZCkgPj0gMCkge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gICAgc3RyID0gKGluZGV4ID4gMCA/IHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpIDogXCJcIikgKyByZXBsYWNlICsgc3RyLnN1YnN0cmluZyhpbmRleCArIGZpbmQubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5leHBvcnQgY29uc3QgdHVya2lzaFRvTG93ZXIgPSAoc3RyKSA9PiB7XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XG4gIGxldCBzdHJpbmcgPSBzdHI7XG4gIGNvbnN0IGxldHRlcnMgPSB7XCLEsFwiOiBcImlcIiwgXCJJXCI6IFwixLFcIiwgXCLFnlwiOiBcIsWfXCIsIFwixJ5cIjogXCLEn1wiLCBcIsOcXCI6IFwiw7xcIiwgXCLDllwiOiBcIsO2XCIsIFwiw4dcIjogXCLDp1wifTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygoW8SwScWexJ7DnMOHw5ZdKSkvZywgZnVuY3Rpb24obGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlcnNbbGV0dGVyXTtcbiAgfSk7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuL3N0cmluZ1V0aWxzXCI7XG5jb25zdCBpc1N0YWdpbmcgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJzdGFnaW5nLnZpdmVuc2VcIikgOiB0cnVlO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMC4wLjQyLjFcIjtcbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA9IFwiX2dhXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IFwiaHR0cHM6Ly9ob3N0LWI5Ni5wYWdlcy5kZXYvdHJlYXRtZW50cy5qc29uXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzdjIuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNUWUxFU0hFRVRfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzX3N0YWdpbmcuY3NzXCIgOiBgaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXMuY3NzP2lkPSR7cmVwbGFjZUFsbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEzKS5yZXBsYWNlKFwiVFwiLCBcIlwiKSwgXCItXCIsIFwiXCIpfWA7XG5leHBvcnQgY29uc3QgRV9SVUxFU19MT0NBVElPTiA9IFwiaHR0cHM6Ly9ob3N0LWI5Ni5wYWdlcy5kZXYvZWxpZ2liaWxpdHlfcnVsZXMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFBST0RVQ1RfSU5GT19MT0NBVElPTiA9IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9zb2NpYWwtcHJvb2YtdjIuanNvblwiO1xuZXhwb3J0IGNvbnN0IExPR19BUElfVVJMID0gXCJodHRwczovL2V1cm9wZS13ZXN0My1uZXh0ZGF5LTM0ZWIzLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvbG9nXCI7XG5leHBvcnQgY29uc3QgTE9PS1VQX0FQSV9VUkwgPSBcImh0dHBzOi8vY2F0YWxvZy1hcGkuYWRvcmFhaS5jb21cIjtcbmV4cG9ydCBjb25zdCBNT0JJTEVfTUVESUFfUVVFUlkgPSBcIihtYXgtd2lkdGg6IDQ0MHB4KVwiO1xuLy8gQ29udHJvbCBncm91cCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgU1BMSVRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBMQUJfUkFUSU8gPSAyMDtcbi8vIFNraXBwZWQgdHJlYXRtZW50IHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBDSEFNUF9TS0lQX1JBVElPID0gMjA7XG5leHBvcnQgY29uc3QgTEFCX1NLSVBfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUyA9IDI7XG5leHBvcnQgY29uc3QgTElTVF9NT0RFX0JFQUdMRV9LRVlTID0gW1wicGFnZXR5cGVcIiwgXCJjYXRlZ29yeVwiLCBcImFsbHRpbWVQTFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUExQQ2F0ZWdvcnlNb2RlXCIsXG4gIFwiYWxsdGltZVBEUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QRFBDYXRlZ29yeU1vZGVcIiwgXCJhbGx0aW1lQ2FydENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25DYXJ0Q2F0ZWdvcnlNb2RlXCJdO1xuZXhwb3J0IGNvbnN0IElETEVfVElNRU9VVCA9IDE1MDAwO1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTl9TVE9SQUdFX0tFWVMgPSB7XG4gIFNFU1NJT05fVElNRVNUQU1QOiBcIkJHX1Nlc3Npb25UaW1lc3RhbXBcIixcbiAgU0VTU0lPTl9ISVNUT1JZOiBcIkJHX1Nlc3Npb25IaXN0b3J5XCIsXG4gIFBPUFVQX0RJU1BMQVlfRkxBRzogXCJCR19Qb3B1cERpc3BsYXlGbGFnXCIsXG4gIFNLVV9JTkZPX0JBU0tFVDogXCJCR19Qcm9kdWN0SW5mb0Jhc2tldFwiLFxuICBTRVNTSU9OX1JFRkVSUkVSOiBcIkJHX1Nlc3Npb25SZWZlcnJlclwiLFxuICBNQVRDSEVEX1RSRUFUTUVOVFM6IFwiR0xWX01hdGNoZWRcIixcbn07XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlTID0ge1xuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgV0VJR0hUUzogXCJCR19XZWlnaHRzXCIsXG4gIEVMSUdJQklMSVRZX1JVTEVTOiBcIkJHX0VfUnVsZXNcIixcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBVU0VSX0lEOiBcIkJHX1VzZXJJZF8wMVwiLFxuICBEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFOiBcIkJHX0NvbGxlY3Rpb25EYXRhU2l6ZVwiLFxuICBJU19BRE1JTjogXCJHTFZfSXNBZG1pblwiLFxuICBJU19FTVBMT1lFRTogXCJHTFZfSXNFbXBsb3llZVwiLFxuICBWRVJTSU9OOiBcIkdMVl9WXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gbnVsbCA9PSBhcnIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IF9pKSB7XG4gICAgdmFyIF9zLFxuICAgICAgX2UsXG4gICAgICBfeCxcbiAgICAgIF9yLFxuICAgICAgX2FyciA9IFtdLFxuICAgICAgX24gPSAhMCxcbiAgICAgIF9kID0gITE7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfeCA9IChfaSA9IF9pLmNhbGwoYXJyKSkubmV4dCwgMCA9PT0gaSkge1xuICAgICAgICBpZiAoT2JqZWN0KF9pKSAhPT0gX2kpIHJldHVybjtcbiAgICAgICAgX24gPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShfbiA9IChfcyA9IF94LmNhbGwoX2kpKS5kb25lKSAmJiAoX2Fyci5wdXNoKF9zLnZhbHVlKSwgX2Fyci5sZW5ndGggIT09IGkpOyBfbiA9ICEwKSB7XG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gITAsIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIG51bGwgIT0gX2lbXCJyZXR1cm5cIl0gJiYgKF9yID0gX2lbXCJyZXR1cm5cIl0oKSwgT2JqZWN0KF9yKSAhPT0gX3IpKSByZXR1cm47XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2FycjtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAga2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgU1RZTEVTSEVFVF9MT0NBVElPTixcbiAgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04sXG4gIFRSRUFUTUVOVFNfTE9DQVRJT04sXG4gIEVfUlVMRVNfTE9DQVRJT04sXG4gIFBST0RVQ1RfSU5GT19MT0NBVElPTixcbiAgVkVSU0lPTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3Qgc3dpdGNoVG9FYXNlT3V0ID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtaGlkZVwiKSkgcmV0dXJuO1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZWwudGV4dENvbnRlbnQgPSBgLmdsb3YtZWFzZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtby1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tcy1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIGFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuMjU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDc1JSB7IG9wYWNpdHk6IDAuNTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDkwJSB7IG9wYWNpdHk6IDAuNzU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDEwMCUgeyBvcGFjaXR5OiAxOyBmaWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IC13ZWJraXQtZmlsdGVyOiBncmF5c2NhbGUoMCUpO31cbiAgfWA7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnByZXBlbmQoZWwpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ2xvdi1lYXNlXCIpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudCA9IGF3YWl0IHRyZWF0bWVudHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnQgd2VpZ2h0c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudCB3ZWlnaHRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoUGx1cyhFX1JVTEVTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25FbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZWxpZ2liaWxpdHlSdWxlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25FbGlnaWJpbGl0eVJ1bGVzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoUHJvZHVjdEluZm8gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHByb2R1Y3QgaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoUGx1cyhQUk9EVUNUX0lORk9fTE9DQVRJT04pO1xuICAgIGlmICghcHJvZHVjdEluZm8pIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvSnNvbiA9IGF3YWl0IHByb2R1Y3RJbmZvLmpzb24oKTtcbiAgICByZXR1cm4gcHJvZHVjdEluZm9Kc29uO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSk7XG4gIHJldHVybiB7Y29udHJvbGxlciwgdGltZW91dElEfTtcbn07XG5cbmNvbnN0IGZldGNoUGx1cyA9ICh1cmwsIG9wdGlvbnMgPSB7fSwgcmV0cmllcyA9IDUpID0+IHtcbiAgY29uc3Qge2NvbnRyb2xsZXIsIHRpbWVvdXRJRH0gPSB0aW1lb3V0KDUwMDApO1xuICByZXR1cm4gZmV0Y2godXJsLCB7Li4ub3B0aW9ucywgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIHRpbWVkIG91dCBSZXRyeWluZy4uLjogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIG9mIHllYXIgdG8gaGFzaCB0byByZXNldCBpdCBldmVyeSBtb250aFxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBub3cuZ2V0TW9udGgoKTtcbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIrbW9udGgudG9TdHJpbmcoKSk7XG5cbiAgICBpZiAoaGFzaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhcmlhbnRLZXldIG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiAhYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSBNYXRoLmZsb29yKDEwMCAvIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpICogKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0FjdGlvblNlbGVjdG9ycyA9IChhY3Rpb25zKSA9PiB7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7b3BlcmF0b3IsIHNlbGVjdG9yLCBzZWxlY3RvckZhbGxiYWNrLCBtb3ZlX3NlbGVjdG9yXzEsIG1vdmVfc2VsZWN0b3JfMn0gPSBhY3Rpb247XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIm5vb3BcIiB8fCBzZWxlY3RvciA9PT0gXCJuby1zZWxlY3RvclwiKSBjb250aW51ZTtcbiAgICBpZiAoXG4gICAgICAoc2VsZWN0b3IgfHwgc2VsZWN0b3JGYWxsYmFjaykgJiZcbiAgICAgICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpICYmXG4gICAgICAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yRmFsbGJhY2spXG4gICAgKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBTZWxlY3Rvci9TZWxlY3RvckZhbGxiYWNrICR7c2VsZWN0b3J8fHNlbGVjdG9yRmFsbGJhY2t9IG5vdCBmb3VuZGApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAobW92ZV9zZWxlY3Rvcl8xICYmICFtb3ZlX3NlbGVjdG9yXzIpIHx8XG4gICAgICAobW92ZV9zZWxlY3Rvcl8yICYmICFtb3ZlX3NlbGVjdG9yXzEpXG4gICAgKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQm90aCBtb3ZlIHNlbGVjdG9ycyBhcmUgcmVxdWlyZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChtb3ZlX3NlbGVjdG9yXzEgJiYgbW92ZV9zZWxlY3Rvcl8yKSB7XG4gICAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKSkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAyIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUcsIFNFU1NJT05fVElNRVNUQU1QLCBTRVNTSU9OX0hJU1RPUll9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgcG9wdXBEaXNwbGF5RmxhZyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKTtcbiAgY29uc3Qgc2Vzc2lvblRpbWVzdGFtcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVApO1xuICBjb25zdCBzZXNzaW9uSGlzdG9yeSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9ISVNUT1JZKTtcblxuICBpZiAocG9wdXBEaXNwbGF5RmxhZyA9PT0gbnVsbCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAwKTtcbiAgfVxuICBpZiAoIXNlc3Npb25UaW1lc3RhbXApIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QLCBEYXRlLm5vdygpKTtcbiAgfVxuICBpZiAoIXNlc3Npb25IaXN0b3J5KSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVdKTtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgc2Vzc2lvbkhpc3RvcnldKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmRpdGlvbkNoZWNrZXIgPSAocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGlmIChjb25kaXRpb24gPT09IFwibm90RXhpc3RcIikge1xuICAgIGlmICghcnVuVGltZVZhbHVlKSB7XG4gICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8XG4gICAgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICBjb25kaXRpb24gPT09IG51bGwgfHxcbiAgICBjb25kaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBydW5UaW1lVmFsdWUgb3IgY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKGNvbmRpdGlvbikge1xuICAgIGNhc2UgXCJleGlzdFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJpbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJjb250YWluc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90SW5jbHVkZXNcIjpcbiAgICBjYXNlIFwibm90Q29udGFpbnNcIjpcbiAgICAgIGlmICghcnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJlcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RFcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDw9IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJiZXR3ZWVuXCI6IHtcbiAgICAgIGxldCBbbWluLCBtYXhdID0gdmFsdWUuc3BsaXQoXCIsXCIpO1xuICAgICAgbWluID0gcGFyc2VJbnQobWluKTtcbiAgICAgIG1heCA9IHBhcnNlSW50KG1heCk7XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IG1pbiAmJiBydW5UaW1lVmFsdWUgPD0gbWF4KSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNhc2UgXCJyZWdleFwiOiB7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsdWUsIFwiaVwiKTtcbiAgICAgIHJldHVybiByZWdleC50ZXN0KHJ1blRpbWVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkIFwiLCBjb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGVidWdNb2RlID0gKCkgPT4ge1xuICBjb25zdCB7REVCVUdfTU9ERSwgSVNfRU1QTE9ZRUV9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICBjb25zdCB7TUFUQ0hFRF9UUkVBVE1FTlRTfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuICB0cnkge1xuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICBjb25zdCBjdXJyZW50ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKERFQlVHX01PREUpKTtcbiAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz1cIikpIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShJU19FTVBMT1lFRSwgdHJ1ZSk7XG4gICAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0xXCIpKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAxKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgIT09IDEpIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKE1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MlwiKSkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMik7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSAyKSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShNQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgICByZXR1cm4gMjtcbiAgICAgIH1cbiAgICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPS0xXCIpKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAtMSk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTBcIikpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKERFQlVHX01PREUpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICAgICAgaWYgKGN1cnJlbnQpIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKE1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoTnVtYmVyLmlzTmFOKGN1cnJlbnQpKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBkZWJ1ZyBtb2RlIHdpdGggZXJyb3I6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKERFQlVHX01PREUpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgIHJldHVybiAwO1xuICB9XG59O1xuXG4vLyBnZXQgR0EgY2xpZW50IGlkIHVzaW5nIGdhLmdldEFsbCgpXG5leHBvcnQgY29uc3QgZ2V0R2FDbGllbnRJZCA9ICgpID0+IHtcbiAgY29uc3QgZ2EgPSB3aW5kb3cuZ2E7XG4gIC8vIGlmIGdhIGFuZCBnYS5nZXRBbGwoKSBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIG51bGxcbiAgaWYgKGdhICYmIGdhLmdldEFsbCkge1xuICAgIGNvbnN0IHRyYWNrZXJzID0gZ2EuZ2V0QWxsKCk7XG4gICAgaWYgKHRyYWNrZXJzICYmIHRyYWNrZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRyYWNrZXJzWzBdLmdldChcImNsaWVudElkXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIGdldCBkZXRlcm1pbmlzdGljIG51bWVyaWMgaGFzaCBmcm9tIHN0cmluZyB0aGF0IGNvbnRhaW5zIG9ubHkgbnVtYmVyc1xuZXhwb3J0IGNvbnN0IGdldFVuc2VjdXJlSGFzaCA9IChzdHIpID0+IHtcbiAgLy8gc3RhcnQgd2l0aCBhIG1hZ2ljIG51bWJlciwgdXNlIHBpIGRpZ2l0c1xuICBsZXQgaGFzaCA9IDMxNDE1OTI2NTtcbiAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBtYWtlIGl0IHN0cmluZ1xuICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xuICB9XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gIH1cbiAgLy8gcmV0dXJuIGFic29sdXRlIHZhbHVlXG4gIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbn07XG5cbi8vIGdlbmVyYXRlIGEgMzItYml0IHJhbmRvbSBpbnRlZ2VyXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApO1xufTtcblxuLy8gZ2V0IGN1cnJlbnQgdW5peCBlcG9jaCB0aW1lIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBnZXRVbml4VGltZSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0SWRlbnRpZmllciA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBsb2NhbCBzdG9yYWdlXCIsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2EgaW4gZmlyc3QgYXR0ZW1wdFwiLCBpZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2FcIiwgaWQpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgcmVhZCBHQSBjbGllbnQgaWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGluIGdldElkZW50aWZpZXJcIiwgZSk7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGVsaXZlcnlEYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZGF0ZTtcblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgc3RhcnRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgZW5kTW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIHN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgZW5kRGF5OiB1bmRlZmluZWQsXG4gIH07XG5cbiAgbGV0IG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKyktKFtcXFxcZF0rKVxcXFxzPyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzNdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKS0oW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCAhPT0gNSkgcmV0dXJuIGRhdGU7XG5cbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFsyXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzRdLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5zdGFydE1vbnRoSW5kZXggfHwgIXJlc3VsdC5lbmRNb250aEluZGV4KSByZXR1cm4gZGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0WWVhciA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBjb25zdCBlbmRZZWFyID0gcmVzdWx0LmVuZE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcblxuICAgIGNvbnN0IGVzdGltYXRlZFN0YXJ0ID0gbmV3IERhdGUoc3RhcnRZZWFyLCByZXN1bHQuc3RhcnRNb250aEluZGV4LCByZXN1bHQuc3RhcnREYXkpO1xuICAgIGNvbnN0IGVzdGltYXRlZEVuZCA9IG5ldyBEYXRlKGVuZFllYXIsIHJlc3VsdC5lbmRNb250aEluZGV4LCByZXN1bHQuZW5kRGF5KTtcblxuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkU3RhcnQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRFbmQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlcldlZWtzID0gc3RhcnREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChzdGFydERpZmZPdmVyRGF5cyAvIDcpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyV2Vla3MgPSBlbmREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChlbmREaWZmT3ZlckRheXMgLyA3KTtcblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSAtICR7ZW5kRGlmZk92ZXJEYXlzfSBHw7xuYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPj0gMSkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSBHw7xuIC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gZW5kRGlmZk92ZXJXZWVrcykge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaWRsZVRpbWVyID0gYXN5bmMgKHRpbWVPdXQsIGNhbGxCYWNrKSA9PiB7XG4gIGxldCBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQub250b3VjaHN0YXJ0ID0gcmVzZXRUaW1lcjtcblxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xuICAgIGNsZWFyVGltZW91dChpZGxlVGltZW91dCk7XG4gICAgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlzT3duTXV0YXRpb24gPSAobXV0YXRpb25MaXN0KSA9PiB7XG4gIGNvbnN0IG5vZGVzID0gWy4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5yZW1vdmVkTm9kZXMpXTtcbiAgcmV0dXJuIG5vZGVzLnNvbWUoKG4pID0+IHtcbiAgICByZXR1cm4gbi50YWdOYW1lICYmIChuLmlkPy5pbmNsdWRlcyhcImJuLVwiKSB8fCBBcnJheS5mcm9tKG4uY2xhc3NMaXN0KS5zb21lKChjKSA9PiBjLmluY2x1ZGVzKFwiYm4tXCIpIHx8IGMuaW5jbHVkZXMoXCJuZC1cIikpKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QWdlbnREZXRhaWxzID0gKCkgPT4ge1xuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgLy8gZXh0cmFjdCBicm93c2VyIGFuZCB2ZXJzaW9uXG4gIGNvbnN0IGJyID0gdWEubWF0Y2goLyhvcGVyYXxvcHJ8ZWRnfHRyaWRlbnR8ZmlyZWZveHxtc2llKD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fFxuICAgIHVhLm1hdGNoKC8oc2FmYXJpfGNocm9tZSg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHxcbiAgICB1YS5tYXRjaCgvKHdlYmtpdCg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHwgW107XG5cbiAgaWYgKCFiciB8fCBici5sZW5ndGggPCAzKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgYk5hbWUgPSBiclsxXTtcbiAgY29uc3QgYlZlcnNpb24gPSBiclsyXTtcblxuICBjb25zdCBvcyA9IHtcbiAgICBXaW5kb3dzOiAvV2luL2kudGVzdCh1YSksXG4gICAgTWFjOiAvTWFjL2kudGVzdCh1YSksXG4gICAgTGludXg6IC9MaW51eC9pLnRlc3QodWEpLFxuICAgIEFuZHJvaWQ6IC9BbmRyb2lkL2kudGVzdCh1YSksXG4gICAgaU9TOiAvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QodWEpLFxuICB9O1xuXG4gIC8vIGV4dHJhY3QgT1MgYW5kIHZlcnNpb25cbiAgbGV0IG9zVmVyc2lvbiA9IFwiXCI7XG4gIGxldCBvc05hbWUgPSBcIlwiO1xuICBpZiAob3MuV2luZG93cykge1xuICAgIG9zTmFtZSA9IFwiV2luZG93c1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9XaW5kb3dzIE5UIChbMC05Ll0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwiMFwiO1xuICB9IGVsc2UgaWYgKG9zLmlPUykge1xuICAgIG9zTmFtZSA9IFwiaU9TXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL09TIChbMC05X10rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXS5yZXBsYWNlKC9fL2csIFwiLlwiKSA6IFwiMFwiO1xuICB9IGVsc2UgaWYgKG9zLk1hYykge1xuICAgIG9zTmFtZSA9IFwiTWFjXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL01hYyBPUyBYIChbMC05X10rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXS5yZXBsYWNlKC9fL2csIFwiLlwiKSA6IFwiMFwiO1xuICB9IGVsc2UgaWYgKG9zLkFuZHJvaWQpIHtcbiAgICBvc05hbWUgPSBcIkFuZHJvaWRcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvQW5kcm9pZCAoWzAtOS5dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcIjBcIjtcbiAgfSBlbHNlIGlmIChvcy5MaW51eCkge1xuICAgIG9zTmFtZSA9IFwiTGludXhcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvTGludXggKFtpXFxkXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCIwXCI7XG4gIH1cblxuICAvLyBleHRyYWN0IG1vYmlsZSBvciBkZXNrdG9wXG4gIGNvbnN0IGlzTW9iaWxlID0gL01vYmkvaS50ZXN0KHVhKTtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5icm93c2VyTmFtZVwiLCBiTmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmJyb3dzZXJWZXJzaW9uXCIsIGJWZXJzaW9uKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uub3NOYW1lXCIsIG9zTmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm9zVmVyc2lvblwiLCBvc1ZlcnNpb24pO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pc01vYmlsZVwiLCBpc01vYmlsZSk7XG5cbiAgLy8gc3BsaXQgT1MgdmVyc2lvbnMgYnkgLiwgdGFrZSBmaXJzdCBwYXJ0IGFzIGludGVnZXJcbiAgY29uc3Qgb3NWZXJzaW9uSW50ID0gcGFyc2VJbnQob3NWZXJzaW9uLnNwbGl0KFwiLlwiKVswXSk7XG5cbiAgY29uc3QgaXNTdXBwb3J0ZWRCcm93c2VyID0gYk5hbWUgPT09IFwiQ2hyb21lXCIgfHwgYk5hbWUgPT09IFwiU2FmYXJpXCI7XG4gIGNvbnN0IGlzU3VwcG9ydGVkT1MgPSAob3NOYW1lID09PSBcIkFuZHJvaWRcIiAmJiBvc1ZlcnNpb25JbnQgPj0gOSkgfHxcbiAgICAob3NOYW1lID09PSBcImlPU1wiICYmIG9zVmVyc2lvbkludCA+PSAxMykgfHxcbiAgICAob3NOYW1lID09PSBcIldpbmRvd3NcIiAmJiBvc1ZlcnNpb25JbnQgPj0gNikgfHxcbiAgICAob3NOYW1lID09PSBcIk1hY1wiICYmIG9zVmVyc2lvbkludCA+PSAxMCk7XG5cbiAgcmV0dXJuIGlzU3VwcG9ydGVkQnJvd3NlciAmJiBpc1N1cHBvcnRlZE9TO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJyb3dzZXJEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB3aW5kb3dQdHIgPSB3aW5kb3cudG9wO1xuICBjb25zdCBuYXZQdHIgPSB3aW5kb3dQdHIubmF2aWdhdG9yO1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50RGF0YT8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudDtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZQbGF0Zm9ybVwiLCBwbGF0Zm9ybSk7XG5cbiAgLyogd2luZG93IHZpZXcgYXJlYSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dQUmF0aW9cIiwgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIGNvbnN0IGF2YWlsV2luZG93ID0gd2luZG93UHRyLnNjcmVlbj8uYXZhaWxXaWR0aCArIFwieFwiICsgd2luZG93UHRyLnNjcmVlbj8uYXZhaWxIZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0F2YWlsXCIsIGF2YWlsV2luZG93KTtcblxuICBjb25zdCB3aW5kb3dEZXB0aCA9IHdpbmRvd1B0ci5zY3JlZW4/LmNvbG9yRGVwdGggKyBcIi1cIiArIHdpbmRvd1B0ci5zY3JlZW4/LnBpeGVsRGVwdGg7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0RlcHRoXCIsIHdpbmRvd0RlcHRoKTtcblxuICBjb25zdCB2cG9ydFNoYXBlID0gd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py53aWR0aCArIFwieFwiICsgd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py5oZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1Zwb3J0XCIsIHZwb3J0U2hhcGUpO1xuXG4gIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICBsZXQgd2lkdGggPSBwYXJzZUludChzY3JlZW4ud2lkdGgpO1xuICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBwYXJzZUludChzY3JlZW4uaGVpZ2h0KSA6IDA7XG4gICAgaWYgKHdpZHRoICE9PSAwICYmIGhlaWdodCAhPT0gMCkge1xuICAgICAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QocGxhdGZvcm0pO1xuICAgICAgaWYgKGlPUyAmJiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbykge1xuICAgICAgICAvLyBpb3MgcHJvdmlkZXMgRFBJcywgbmVlZCB0byBtdWx0aXBseVxuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGggKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25BbmdsZSA9IHdpbmRvd1B0ci5zY3JlZW4/Lm9yaWVudGF0aW9uPy5hbmdsZTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSA5MCB8fCBNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gMjcwKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBsYW5kc2NhcGUgb3JpZW50YXRpb24gc3dpdGNoIHZhbHVlcyBmb3IgYWxsIGV4Y2VwdCBpb3NcbiAgICAgICAgICBjb25zdCB0ZW1wID0gd2lkdGg7XG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQ7XG4gICAgICAgICAgaGVpZ2h0ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93XCIsIHdpZHRoICsgXCJ4XCIgKyBoZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIG5hdmlnYXRvciAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIaXN0U2l6ZVwiLCB3aW5kb3dQdHIuaGlzdG9yeT8ubGVuZ3RoKTtcblxuICAvLyBjaGVjayBpZiB1c2VyQWdlbnREYXRhIGlzIHN1cHBvcnRlZCBhbmQgdXNlckFnZW50IGlzIG5vdCBhdmFpbGFibGUsIHVzZSBpdFxuICBpZiAoIW5hdlB0ci51c2VyQWdlbnQpIHtcbiAgICBpZiAobmF2UHRyLnVzZXJBZ2VudERhdGEpIHtcbiAgICAgIC8vIHR1cm4gYnJhbmRzIGFycmF5IGludG8gc3RyaW5nXG4gICAgICBsZXQgbmF2QWdlbnQgPSBuYXZQdHI/LnVzZXJBZ2VudERhdGE/LmJyYW5kcz8ubWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuYnJhbmQgKyBcIjpcIiArIGUudmVyc2lvbjtcbiAgICAgIH0pLmpvaW4oKTtcbiAgICAgIC8vIGFkZCBtb2JpbGUgaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gKG5hdlB0cj8udXNlckFnZW50RGF0YT8ubW9iaWxlID8gXCJtb2JpXCIgOiBcIiBcIik7XG4gICAgICAvLyBhZGQgcGxhdGZvcm0gaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gcGxhdGZvcm07XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZBZ2VudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdlB0ci51c2VyQWdlbnQpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SFdDb3Jlc1wiLCBuYXZQdHIuaGFyZHdhcmVDb25jdXJyZW5jeSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkxhbmd1YWdlXCIsIG5hdlB0ci5sYW5ndWFnZSB8fFxuICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIuc3lzdGVtTGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIudXNlckxhbmd1YWdlLFxuICApO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZUb3VjaFwiLCBuYXZQdHIubWF4VG91Y2hQb2ludHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0VVJMRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVSTCA9IG5ldyBVUkwod2luZG93LnRvcC5sb2NhdGlvbi5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIsIGN1cnJlbnRVUkwuaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCBjdXJyZW50VVJMLmhvc3RuYW1lKTtcblxuICAvKiBWaXZlbnNlIHNwZWNpZmljICovXG4gIGxldCBwYWdlVHlwZTtcbiAgLy8gaWYgdXJsIGxpa2UgeCB0aGVuIHNldCBQYWdlVHlwZSA9IHlcbiAgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImZhdm9yaWxlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJGYXZvcml0ZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIkJhc2tldFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtb3pldGkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlB1cmNoYXNlXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwib2RlbWUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlBheW1lbnRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJBZGRyZXNzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJQYXN0T3JkZXJzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWtheWl0Lmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJSZWdpc3RlclwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1naXJpc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlNpZ24taW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJQcm9maWxlQ291cG9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInByb2ZpbC1ndW5jZWxsZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiUHJvZmlsZUluZm9cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJQcm9maWxlQWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcIlByb2ZpbGVOb3RpZmljYXRpb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiaW5kaXJpbWxpLW1vYmlseWEta2FtcGFueWFsYXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJTcGVjaWFsQ2FtcGFpZ25zXCI7XG4gIH1cblxuICBpZiAocGFnZVR5cGUpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHBhZ2VUeXBlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXb3JrIGFyb3VuZCBTYWZhcmkgMTQgSW5kZXhlZERCIG9wZW4gYnVnLlxuICpcbiAqIFNhZmFyaSBoYXMgYSBob3JyaWJsZSBidWcgd2hlcmUgSURCIHJlcXVlc3RzIGNhbiBoYW5nIHdoaWxlIHRoZSBicm93c2VyIGlzIHN0YXJ0aW5nIHVwLiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjI2NTQ3XG4gKiBUaGUgb25seSBzb2x1dGlvbiBpcyB0byBrZWVwIG51ZGdpbmcgaXQgdW50aWwgaXQncyBhd2FrZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGlkYlJlYWR5ID0gKCkgPT4ge1xuICBjb25zdCBpc1NhZmFyaSA9XG4gICAgIW5hdmlnYXRvci51c2VyQWdlbnREYXRhICYmXG4gICAgL1NhZmFyaVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJlxuICAgICEvQ2hyb20oZXxpdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIC8vIE5vIHBvaW50IHB1dHRpbmcgb3RoZXIgYnJvd3NlcnMgb3Igb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIHRocm91Z2ggdGhpcyBtZXNzLlxuICBpZiAoIWlzU2FmYXJpIHx8ICFpbmRleGVkREIuZGF0YWJhc2VzKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgbGV0IGludGVydmFsSWQ7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgdHJ5SWRiID0gKCkgPT4gaW5kZXhlZERCLmRhdGFiYXNlcygpLmZpbmFsbHkocmVzb2x2ZSgpKTtcbiAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodHJ5SWRiLCA1MCk7XG4gICAgdHJ5SWRiKCk7XG4gIH0pLmZpbmFsbHkoKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tWZXJzaW9uID0gKCkgPT4ge1xuICBjb25zdCBjdXJyZW50VmVyc2lvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVkVSU0lPTik7XG4gIGlmIChjdXJyZW50VmVyc2lvbiAhPT0gVkVSU0lPTikge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKExPQ0FMX1NUT1JBR0VfS0VZUykpIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShMT0NBTF9TVE9SQUdFX0tFWVNba2V5XSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoU0VTU0lPTl9TVE9SQUdFX0tFWVMpKSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZU1trZXldKTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlZFUlNJT04sIFZFUlNJT04pO1xuICB9XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldFVuc2VjdXJlSGFzaH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92SW5mb0xheWVyXCIpO1xuY29uc3QgTFNfUHJlZml4ID0gXCJHTERDX1wiO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwidXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpO1xuXG4gICAgLy8gcmVtb3ZlIGRvdHMgaW4gYmFzZUZlYXR1cmVOYW1lIGFuZCBhZGQgcHJlZml4XG4gICAgY29uc3QgZmVhdHVyZUtleSA9IExTX1ByZWZpeCArIGJhc2VGZWF0dXJlTmFtZS5yZXBsYWNlKC9cXC4vZywgXCJfXCIpO1xuICAgIGNvbnN0IG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX1wiICsgdXBkYXRlTWV0aG9kO1xuXG4gICAgc3dpdGNoICh1cGRhdGVNZXRob2QpIHtcbiAgICAgIGNhc2UgXCJtaW5cIjpcbiAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBtaW4gYW5kIG1heCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcblxuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBNYXRoW3VwZGF0ZU1ldGhvZF0odmFsdWUsIGJhc2VGZWF0dXJlVmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic3VtXCI6XG4gICAgICAgIC8vIGNvbXB1dGUgc3VtIGFuZCBjb3VudCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgcGFyc2VGbG9hdCh2YWx1ZSkgKyBwYXJzZUZsb2F0KGJhc2VGZWF0dXJlVmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJjbnRcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBjb3VudCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgcGFyc2VJbnQodmFsdWUpICsgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICAvLyBjb21wdXRlIGxhc3Qgb2J0YWluZWQgdmFsdWUgaW4gbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImNvdW50X3ZhbHVlc1wiIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlcywga2VlcCBhIGNvdW50ZXIgZm9yIGVhY2ggdmFsdWVcbiAgICAgIGNhc2UgXCJ2YWxjbnRzXCI6XG4gICAgICAgIHtcbiAgICAgICAgICAvLyBjb21wdXRlIGNvdW50IG9mIGVhY2ggdmFsdWUgZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgICAgLy8gY3JlYXRlIGEgOCBieXRlcyBoZXggaGFzaCBmb3IgYmFzZUZlYXR1cmVWYWx1ZSwgb25seSBwb3NpdGl2ZSBudW1iZXJzXG4gICAgICAgICAgY29uc3QgdmFsSGFzaCA9IGdldFVuc2VjdXJlSGFzaChiYXNlRmVhdHVyZVZhbHVlKTtcblxuICAgICAgICAgIGNvbnN0IG9wS2V5VmFsID0gb3BLZXkgKyBcIl9cIiArIHZhbEhhc2g7XG4gICAgICAgICAgY29uc3Qgb3BLZXlWYWxOYW1lID0gb3BLZXkgKyBcIl9cIiArIHZhbEhhc2ggKyBcIl9uYW1lXCI7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWxOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKTtcblxuICAgICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5VmFsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWwsIHBhcnNlSW50KHZhbHVlKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5VmFsLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIGluIHVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kLCBlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5SW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcInF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KTtcblxuICAgIGNvbnN0IGZlYXR1cmVLZXkgPSBMU19QcmVmaXggKyBiYXNlRmVhdHVyZU5hbWUucmVwbGFjZSgvXFwuL2csIFwiX1wiKTtcbiAgICBsZXQgb3BLZXk7XG5cbiAgICBsZXQgc3RvcmFnZSA9IG51bGw7XG4gICAgaWYgKHdpbmRvdyA9PT0gXCJhbGx0aW1lXCIpIHtcbiAgICAgIHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cgPT09IFwic2Vzc2lvblwiKSB7XG4gICAgICBzdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcIkludmFsaWQgd2luZG93IHR5cGVcIiwgd2luZG93KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN3aXRjaCAocXVlcnlNZXRob2QpIHtcbiAgICAgIC8vIGZvciBsYXN0LCBtaW4sIG1heCwgc3VtIGV0Yy4gYnJpbmcgdGhlIHZhbHVlIGZyb20gbG9jYWwvc2Vzc2lvbiBzdG9yYWdlIGdpdmVuIHRoZSB3aW5kb3cgaXMgc2Vzc2lvbiBvciBhbGx0aW1lXG4gICAgICBjYXNlIFwibWluXCI6XG4gICAgICBjYXNlIFwibWF4XCI6XG4gICAgICBjYXNlIFwic3VtXCI6XG4gICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl9cIiArIHF1ZXJ5TWV0aG9kO1xuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcblxuICAgICAgICAvLyBmb3IgY3YsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRzaWl0bmN0IHZhbHVlcywgb2J0YWluIGJ5IHNjYW5uaW5nIHRoZSBwcmVmaXggb2YgdGhlIGtleSBpbiB0aGUgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlXG4gICAgICAgIC8vIGZvciBtb2RlLCBzY2FuIHRoZSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2UgYW5kIHJldHVybiB0aGUgdmFsdWUgd2l0aCB0aGUgaGlnaGVzdCBjb3VudFxuICAgICAgY2FzZSBcImNudHZhbHNcIjpcbiAgICAgIGNhc2UgXCJzdW12YWxzXCI6XG4gICAgICBjYXNlIFwibW9kZVwiOlxuICAgICAge1xuICAgICAgICBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl92YWxjbnRzXCI7XG4gICAgICAgIGNvbnN0IGxvY2FsS2V5cyA9IE9iamVjdC5rZXlzKHN0b3JhZ2UpO1xuICAgICAgICBjb25zdCBsb2NhbEtleXNGaWx0ZXJlZCA9IGxvY2FsS2V5cy5maWx0ZXIoKGtleSkgPT4ga2V5LmluZGV4T2Yob3BLZXkpID09PSAwICYmIGtleS5pbmRleE9mKFwiX25hbWVcIikgPT09IC0xKTtcbiAgICAgICAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImNudHZhbHNcIikge1xuICAgICAgICAgIHJldHVybiBsb2NhbEtleXNGaWx0ZXJlZC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwic3VtdmFsc1wiKSB7XG4gICAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgICAgbG9jYWxLZXlzRmlsdGVyZWQuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBzdW0gKz0gcGFyc2VJbnQoc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzdW07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF4Q291bnQgPSBudWxsO1xuICAgICAgICBsZXQgbWF4VmFsID0gbnVsbDtcbiAgICAgICAgbG9jYWxLZXlzRmlsdGVyZWQuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsID0gcGFyc2VJbnQoc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgICAgICAgIGlmIChtYXhWYWwgPT09IG51bGwgfHwgbWF4Q291bnQgPT09IG51bGwgfHwgbWF4Q291bnQgPCB2YWwpIHtcbiAgICAgICAgICAgIG1heENvdW50ID0gdmFsO1xuICAgICAgICAgICAgLy8gbmFtZXMgYXJlIG9ubHkgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgbWF4VmFsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5ICsgXCJfbmFtZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWF4VmFsO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciBpbiBxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdywgZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vLyBUT0RPOiBjb252ZXJ0IHRvIG5hbWUgLS0+IGFycmF5IG9mIHNlbGVjdG9yc1xuZXhwb3J0IGNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBmb3JtYXR0ZXI6IFwicGFnZVR5cGVHQTJHbG92XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jbGFzc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmlzSW5TaG93cm9vbVwiLCBuYW1lOiBcInBkcC5pc0luU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY2F0ZWdvcnlfcHJvZHVjdF9jb3VudFwiLCBuYW1lOiBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUExQXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGxwLmNsYXNzXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLnByaWNlXCIsIG5hbWU6IFwicHVyY2hhc2UucHJpY2VzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLnF1YW50aXR5XCIsIG5hbWU6IFwicHVyY2hhc2UucXVhbnRpdGllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInB1cmNoYXNlLmNhdGVnb3JpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uub3JkZXJJZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQucmV2ZW51ZVwiLCBuYW1lOiBcInB1cmNoYXNlLnJldmVudWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLmRpbWVuc2lvbjE1XCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBEb2N1bWVudCBRdWVyaWVzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwYWdlX3ByZXZpZXdfd3JhcHBlcl9wcm9kdWN0aW9uXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJIb21lcGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhdGVnb3J5X3BhZ2Vfd3JhcHBlclxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUExQXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlBEUFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlBEUFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UERQfFBMUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQRFB8UExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQRFB8UExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJib2R5ID4gLmRlc2t0b3BfbGF5b3V0X3dyYXBwZXIgLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3B1b25Ob3RBcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQRFB8UExQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UERQfFBMUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZUZvcm1hdHRlZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJmb3JtYXREZWxpdmVyeURhdGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI3ZpdmVuc2Utc2hvd3Jvb20tdGFiIHA6bm90KC52aXZlbnNlLXNob3dyb29tcylcIiwgbmFtZTogXCJwZHAuaGFzTm9TaG93cm9vbXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcInBkcC5zaG93cm9vbWNvdW50XCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwic3Bhbi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI3NhbGVzLXByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJkaXYucHJvZHVjdC1wcmljZS1ib3hcIiwgbmFtZTogXCJfX3ByaWNlT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcInBkcC5wcmljZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNtb2JpbGUtcHJvZHVjdC1zdGlja3lcIiwgbmFtZTogXCJfX3ByaWNlT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcInBkcC5wcmljZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwic3ViY2F0ZWdvcmllcy10aXRsZVxcXCJdXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtY2FyZFtkYXRhLXByb2R1Y3Qtc2t1XVwiLCBuYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJvZHVjdC1za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuZW1wdHktY2FydC1jb250YWluZXIsIC5lbXB0eS1jYXJ0XCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuYnJhY2tldC10ZXh0LCAucHJvZHVjdC1jb3VudFwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydEl0ZW1RdWFudGl0eVwiLCBuYW1lOiBcImNhcnQucXVhbnRpdGllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJldmlvdXNcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjYmlsbF90b3RhbFwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyLWZpbmFsLW51bWJlclxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXJ0LXByaWNlXFxcIl0gLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3Vwb25BcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJCYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5jYXRlZ29yaWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1sYXN0LWJyZWFkY3J1bWJcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnByaWNlc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJpY2VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICAvLyBEZXNrdG9wIG9ic2VydmVyIGZvciB0aGUgcmlnaHQgcGFuZWwsIGFzIGl0IGlzIHRoZSBvbmUgY2hhbmdpbmdcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtcmlnaHQtY29udGFpbmVyXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiQmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnZ2bnMtb3JkZXItY29tcGxldGVkLXBhZ2VfX29yZGVyLXByaWNlLXRvdGFsXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fb3JkZXItaW5mb1wiLCBuYW1lOiBcInB1cmNoYXNlLnZ2c1R4bklkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnZ2bnMtb3JkZXItY29tcGxldGVkLXBhZ2VfX29yZGVyLXRpdGxlXCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnZ2bnMtb3JkZXItY29tcGxldGVkLXBhZ2VfX3BheW1lbnQtdGl0bGVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIudnZucy1vcmRlci1jb21wbGV0ZWQtcGFnZV9fb3JkZXItbGlzdC13cmFwcGVyXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU09SRyBFbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUERQXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcInNrdVwiLCBuYW1lOiBcInBkcC5za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQRFBcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibXBuXCIsIG5hbWU6IFwicGRwLm1wblwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJuYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJKU09ORmlsdGVyT3RoZXJcIiwgdmFsdWU6IFwiQHR5cGU9UHJvZHVjdFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJvZmZlcnMucHJpY2VWYWxpZFVudGlsXCIsIG5hbWU6IFwicGRwLnByaWNlVmFsaWRVbnRpbFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBEUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJpdGVtTGlzdEVsZW1lbnQuKi5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQTFBcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5udW1iZXJPZkl0ZW1zXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlBMUFwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJicmVhZGNydW1iLml0ZW1MaXN0RWxlbWVudC4qLml0ZW0ubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFdpbmRvdyBjdXN0b20gZWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImZhdm9yaXRlUHJvZHVjdHNcIiwgbmFtZTogXCJ2aWV3LmZhdm9yaXRlZE1QTnNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwidG9TdHJpbmdcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5dO1xuXG5leHBvcnQgY29uc3QgZmVhdHVyZUVuZ2luZWVyaW5nT3BzID0ge1xuICBcInZpZXdfZXBvY2hcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibWluXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtaW5cIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS52aWV3X2Vwb2NoX21pblwifSxcbiAgXSxcbiAgXCJQYWdlVHlwZVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJ2YWxjbnRzXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJzdW12YWxzXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwic3VtdmFsc1wiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3RcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcInZhbGNudHNcIn0sXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtb2RlXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X21vZGVfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9sYXN0X3Nlc3Npb25cIn0sXG4gIF0sXG4gIFwiY2FydC5za3VzXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3RcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIn0sXG4gICAge2Rlcml2ZU1ldGhvZDogXCJjYXJyeVNrdVRvRmVhdHVyZXNcIn0sXG4gIF0sXG4gIFwiY2FydC5pc2VtcHR5XCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIn0sXG4gIF0sXG4gIFwiY2FydC50b3RhbEJhc2VQcmljZVwiOiBbXG4gICAge2Rlcml2ZU1ldGhvZDogXCJjYWxjdWxhdGVDb3Vwb25BbGxvd2FuY2VzXCJ9LFxuICBdLFxuICBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiOiBbXG4gICAge2Rlcml2ZU1ldGhvZDogXCJjYWxjdWxhdGVDb3Vwb25BbGxvd2FuY2VzXCJ9LFxuICBdLFxuICBcImNhcnQucHJpY2VzXCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIn0sXG4gIF0sXG4gIFwiY2FydC5xdWFudGl0aWVzXCI6IFtcbiAgICB7ZGVyaXZlTWV0aG9kOiBcImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXNcIn0sXG4gIF0sXG4gIFwicGRwLnNrdVwiOiBbXG4gICAge2Rlcml2ZU1ldGhvZDogXCJjYXJyeVNrdVRvRmVhdHVyZXNcIn0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgY3VzdG9tRGVyaXZhdGlvblJlcG8gPSB7fTtcbi8vIGZ1bmN0aW9ucyBtdXN0IGhhdmUgMyBpbnB1dCBwYXJhbWV0ZXJzOiBiYXNlRmVhdHVyZU5hbWUsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgYW5kIGFkZFRvQmVhZ2xlSW5mb0xheWVyXG5cbi8vIHB1c2ggYSBuZXcgZnVuY3Rpb24gdG8gdGhlIHJlcG8gdG8gY3JlYXRlIGEgbmV3IGN1c3RvbSBkZXJpdmF0aW9uXG5jdXN0b21EZXJpdmF0aW9uUmVwby5jYWxjdWxhdGVDb3Vwb25BbGxvd2FuY2VzID0gYFxucmV0dXJuIGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIGFkZFRvQmVhZ2xlSW5mb0xheWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICAvLyBOT1RFOiBjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGUgaXMgYWxzbyBhIHRyaWdnZXIsIHRvIHByZXZlbnQgaW5maW5pdGUgbG9vcCwgb25seSBzZXQgaXQgaWYgaXQgaXMgbm90IGFscmVhZHkgc2V0IG9yIG5vdCB0aGUgdHJpZ2dlclxuICAgICAgaWYgKGJhc2VGZWF0dXJlTmFtZSAhPT0gXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiAmJiAoY291cG9uTm90QXBwbGljYWJsZSA9PT0gbnVsbCB8fCBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKSAhPT0gMCkpIHtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gIH1cbn07XG5gO1xuXG5jdXN0b21EZXJpdmF0aW9uUmVwby5jYXJyeVNrdVRvRmVhdHVyZXMgPSBgXG5yZXR1cm4gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgZ2V0RnJvbUJlYWdsZUluZm9MYXllciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIpID0+IHtcbiAgY29uc3QgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUsIDUwLCAxMDAwKTtcblxuICAvLyBQcm9kdWN0IHBhZ2UgLS0+IHRyYW5zZmVyIHNrdXMgdG8gc2luZ2xlIGxvY2F0aW9uXG4gIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiUHJvZHVjdHBhZ2VcIikge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIpO1xuICAgIGlmIChza3UgIT09IG51bGwgJiYgc2t1ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIFtza3VdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QgIT09IG51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgc2t1TGlzdCk7XG4gICAgfVxuICB9XG59O1xuYDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7Zm9ybWF0RGVsaXZlcnlEYXRlLCBpc093bk11dGF0aW9ufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7cXVlcnlJbkNvbGxlY3RvciwgdXBkYXRlSW5Db2xsZWN0b3J9IGZyb20gXCIuL2NvbGxlY3RvclwiO1xuaW1wb3J0IHtzZWFyY2hQYXRocywgZmVhdHVyZUVuZ2luZWVyaW5nT3BzLCBjdXN0b21EZXJpdmF0aW9uUmVwb30gZnJvbSBcIi4vY29uZmlnc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbndpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgPSB3aW5kb3cuYmVhZ2xlSW5mb0xheWVyIHx8IHtcbiAgYToge30sIGU6IHt9LCBmOiB7fSwgaToge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZJbmZvTGF5ZXJcIik7XG5cbmNvbnN0IGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNID0gKCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5mb0xheWVyLl9faHdtICs9IDE7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVG9CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIGlmIHZhbHVlIGlzIHN0cmluZywgYWRkIGFzIGEgY2xlYW4gc3RyaW5nLCBpZiBvYmplY3QgYWRkIHRoZSBzYW1lXG4gIGNvbnN0IHR5cGVkVmFsdWUgPSB0eXBlb2YgKHZhbHVlKSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpIDogdmFsdWU7XG4gIC8vIGlmIGtleSBjb250YWlucyAuIGNyZWF0ZSBuZXN0ZWQgb2JqZWN0XG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIG9ialtrZXldID0ge307XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBvYmpbbGFzdEtleV0gPSB0eXBlZFZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGluZm9MYXllcltrZXldID0gdHlwZWRWYWx1ZTtcbiAgfVxuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgaWYgKHR5cGVkVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlZFZhbHVlICE9PSBudWxsKSB7XG4gICAgdXBkYXRlRGVyaXZhdGlvbnMoa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwcmV2UGFzc2VkVmFsdWVzID0ge307XG5cbmNvbnN0IHBhc3NWYWx1ZVRvTGlzdGVuZXJzID0gKGtleSwgdmFsdWUpID0+IHtcbiAgaWYgKHByZXZQYXNzZWRWYWx1ZXNba2V5XSA9PT0gdmFsdWUpIHtcbiAgICBsb2dnZXIubG9nKGBwYXNzVmFsdWVUb0xpc3RlbmVycyAtLT4gc2tpcHBpbmcgZHVlIHRvIHJlLXBhc3Mgb2YgdGhlIHNhbWUgdmFsdWUgJHt2YWx1ZX0gb2Yga2V5ICR7a2V5fWApO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBsaXN0ZW5lcnMgPSBEQVRBX0xJU1RFTkVSU1trZXldO1xuICBpZiAobGlzdGVuZXJzICYmIEFycmF5LmlzQXJyYXkobGlzdGVuZXJzKSAmJiBsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsb2dnZXIubG9nKGBwYXNzVmFsdWVUb0xpc3RlbmVycyAtLT4gdmFsdWUgJHt2YWx1ZX0gdG8gbGlzdGVuZXIgJHtpfSBvZiBrZXkgJHtrZXl9YCk7XG4gICAgICAgIGxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgcHJldlBhc3NlZFZhbHVlc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RnJvbUJlYWdsZUluZm9MYXllciA9IChrZXksIGJsb2NraW5nID0gZmFsc2UsIHBvbGxJbnRlcnZhbCA9IDUwLCB0aW1lb3V0ID0gMTAwMDApID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHJldHVybiBudWxsIGlmIGtleSBpcyBtaXNzaW5nIG9yIG5vdCBhbiBhcnJheSBvciBoYXMgbm8gZWxlbWVudHNcbiAgaWYgKCFrZXkpIHJldHVybiBudWxsO1xuICBsZXQgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXlcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9idGFpbkRhdGEpO1xuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gICAgICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleSwgY2xlYXIgaW50ZXJ2YWwgYW5kIHJlc29sdmVcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAgICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHBvbGxJbnRlcnZhbCk7XG4gICAgICAvLyBhZGQgdGltZW91dFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfSwgdGltZW91dCk7IC8vIHdhaXQgYmxvY2tpbmcgZm9yIFwidGltZW91dFwiIG1zZWNzXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyByZW1vdmUga2V5IGZyb20gaW5mb0xheWVyXG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIHJldHVybjtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIGxvZ2dlci5sb2coXCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyXCIsIGBSZW1vdmluZyBrZXk6ICR7bGFzdEtleX1gKTtcbiAgICBkZWxldGUgb2JqW2xhc3RLZXldO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBpbmZvTGF5ZXJba2V5XTtcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgdXBkYXRlRGVyaXZhdGlvbnMoa2V5LCBudWxsKTtcbiAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCBudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUcmVhdG1lbnQgPSAoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBzdGF0dXMsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpID0+IHtcbiAgY29uc3QgdmFsdWUgPSB7fTtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGJ1c2luZXNzUnVsZUlkKSB2YWx1ZS5idXNpbmVzc1J1bGVJZCA9IGJ1c2luZXNzUnVsZUlkO1xuICBpZiAodmFyaWFudCkgdmFsdWUudmFyaWFudCA9IHZhcmlhbnQ7XG4gIGlmIChkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB2YWx1ZS5kZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gZGVwZW5kYW50X29uX3RyZWF0bWVudDtcblxuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJhcHBsaWVkXCI6XG4gICAgICBpbmZvTGF5ZXIuYVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJlbGlnaWJsZVwiOlxuICAgICAgaW5mb0xheWVyLmVbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICBpbmZvTGF5ZXIuZltpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJpZ25vcmVkXCI6XG4gICAgICBpbmZvTGF5ZXIuaVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGRuJ3QgYWRkIHJvYm90LCB1bmtub3duIHN0YXR1czogXCIsIHN0YXR1cyk7XG4gICAgICByZXR1cm47XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5jb25zdCBjdXN0b21EZXJpdmF0aW9uQ29tcGlsZWRSZXBvID0ge307XG5cbmNvbnN0IHVwZGF0ZURlcml2YXRpb25zID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSkgPT4ge1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgLy8gRG8gdXBkYXRlcyBmaXJzdFxuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgICAvLyBQcm9jZXNzIHF1ZXJpZXMgYWZ0ZXIgdGhlIHVwZGF0ZXNcbiAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICBpZiAoRkVPcC5xdWVyeU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnF1ZXJ5TWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihGRU9wLmZlYXR1cmVOYW1lLCBxdWVyeVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICAvLyBQcm9jZXNzIGRlcml2YXRpb25zIGFmdGVyIHRoZSB1cGRhdGVzXG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AuZGVyaXZlTWV0aG9kID09PSBudWxsIHx8IEZFT3AuZGVyaXZlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgZGVyaXZlRnVuY3RTdHJpbmcgPSBjdXN0b21EZXJpdmF0aW9uUmVwb1tGRU9wLmRlcml2ZU1ldGhvZF07XG4gICAgICBpZiAoZGVyaXZlRnVuY3RTdHJpbmcgPT09IG51bGwgfHwgZGVyaXZlRnVuY3RTdHJpbmcgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAvLyBjcmVhdGUgYSBmdW5jdGlvbiBmcm9tIHRoZSBzdHJpbmcgZnJvbSB0aGUgcmVwb1xuICAgICAgbGV0IGRlcml2ZUZ1bmN0ID0gY3VzdG9tRGVyaXZhdGlvbkNvbXBpbGVkUmVwb1tGRU9wLmRlcml2ZU1ldGhvZF07XG4gICAgICAvLyBjYWNoZSBjb21waWxlZCBmdW5jdGlvblxuICAgICAgaWYgKGRlcml2ZUZ1bmN0ID09PSBudWxsIHx8IGRlcml2ZUZ1bmN0ID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGRlcml2ZUZ1bmN0ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGFzeW5jIGZ1bmN0aW9uIHVzaW5nIHN0cmluZyBnZW5lcmF0b3JcbiAgICAgICAgZGVyaXZlRnVuY3QgPSBuZXcgRnVuY3Rpb24oZGVyaXZlRnVuY3RTdHJpbmcpKCk7XG4gICAgICAgIGN1c3RvbURlcml2YXRpb25Db21waWxlZFJlcG9bRkVPcC5kZXJpdmVNZXRob2RdID0gZGVyaXZlRnVuY3Q7XG4gICAgICB9XG4gICAgICBsb2dnZXIubG9nKFwidXBkYXRlRGVyaXZhdGlvbnM6XCIsIGJhc2VGZWF0dXJlTmFtZSwgRkVPcC5kZXJpdmVNZXRob2QpO1xuICAgICAgYXdhaXQgZGVyaXZlRnVuY3QoYmFzZUZlYXR1cmVOYW1lLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCBhZGRUb0JlYWdsZUluZm9MYXllcik7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgY2FzZSBcInBhZ2VUeXBlR0EyR2xvdlwiOlxuICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFwiUHJvZHVjdHBhZ2VcIjpcbiAgICAgICAgICByZXR1cm4gXCJQRFBcIjtcbiAgICAgICAgY2FzZSBcIkxpc3RpbmdwYWdlXCI6XG4gICAgICAgICAgcmV0dXJuIFwiUExQXCI7XG4gICAgICAgIGNhc2UgXCJiYXNrZXRcIjpcbiAgICAgICAgICByZXR1cm4gXCJCYXNrZXRcIjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgc3RhcnRJbmZvTGF5ZXJTY2FuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSArPSBwYXJzZUludChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3VtUHJpY2UgPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gc3VtUHJpY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBjb25zdCBhcnJheUlubmVyVGV4dCA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgYXJyYXlJbm5lclRleHQucHVzaChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJyYXlJbm5lclRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGFycmF5SW5uZXJUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfSAvLyBzd2l0Y2hcblxuICAgIGlmIChsYXllclZhbHVlICE9PSB1bmRlZmluZWQgJiYgbGF5ZXJWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKSB7XG4gICAgICAgIGxheWVyVmFsdWUgPSBwcm9jZXNzRm9ybWF0dGVyKGxheWVyVmFsdWUsIHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKTtcbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKHNlYXJjaEVsZW1lbnQubmFtZSwgbGF5ZXJWYWx1ZSk7XG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuXG4gICAgICAvLyBtYXJrIGV4Y2x1c2l2ZSBlbGVtZW50cyBhcyBmb3VuZFxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUpICYmIHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBleGNsdXNpdmVFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmluY2x1ZGVzKGV4Y2x1c2l2ZUVsZW1lbnQubmFtZSkpIHtcbiAgICAgICAgICAgIGV4Y2x1c2l2ZUVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcInNlYXJjaE9iaiBlcnJvcjogXCIgKyBlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBwYXJzZVNlYXJjaFBhdGhzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkb21TdGF0dXMgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICAvLyBjaGVjayBpZiBkb2N1bWVudCBhbmQgZG9tIGlzIGxvYWRlZCBhbmQgcmVhZHkgZm9yIHNjcmFwcGluZ1xuICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBpbml0aWFsaXplZCB3aXRoIGRvbSBzdGF0dXM6ICBcIiArIGRvbVN0YXR1cyk7XG5cbiAgY29uc3Qgd2ludG9wID0gd2luZG93LnRvcDtcbiAgY29uc3QgZGF0YUxheWVyID0gd2ludG9wLmRhdGFMYXllcjtcbiAgY29uc3Qgd2luZG9jID0gd2ludG9wLmRvY3VtZW50O1xuICBsZXQgc29yZ0FycmF5SW5uZXI7XG5cbiAgY29uc3QgZm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3QgcHJldkZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG5vdEZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG5cbiAgLy8gUGFnZVR5cGUgY2FuIGJlIGluZmVycmVkIGZyb20gVVJMLCBpZiBmb3VuZCB1c2UgaXQgZnJvbSB0aGVyZVxuICBsZXQgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuXG4gIGlmIChjdXJyZW50UGFnZVR5cGUpIHtcbiAgICBwcmV2Rm91bmROYW1lcy5hZGQoXCJQYWdlVHlwZVwiKTtcbiAgfVxuXG4gIC8vIExvb3AgdGhyb3VnaCBzZWFyY2ggbGlzdHMgYW5kIG1hcmsgZm91bmQgbmFtZXNcbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcHJldkZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoZm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSB8fCBwcmV2Rm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSkge1xuICAgICAgLy8gaGFkIGFscmVhZHkgZm91bmQgdGhpcyBlbGVtZW50IG9uIGFub3RoZXIgcGFyc2UgaXRlbVxuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kICE9PSBcIipcIikge1xuICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuICAgICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQuaW5kZXhPZihjdXJyZW50UGFnZVR5cGUpIDwgMCkge1xuICAgICAgICAvLyBza2lwIHNlYXJjaEVsZW1lbnQgYmVjYXVzZSBvZiBQYWdlVHlwZURlcGVuZFxuICAgICAgICBzZWFyY2hFbGVtZW50LmlzSWdub3JlID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIlNpbmdsZVdUXCIpIHsgLy8gU0NBTiBXaW5kb3cgZm9yIFNpbmdsZSBFbGVtZW50c1xuICAgICAgc2VhcmNoQW5kU2V0KHdpbnRvcCwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJHQURhdGFMYXllclwiKSB7IC8vIFNDQU4gR0EgREFUQSBMQVlFUlxuICAgICAgZm9yIChjb25zdCBkYXRhTGF5ZXJJdGVtIG9mIGRhdGFMYXllcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoZGF0YUxheWVySXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NTb3JnXCIpIHsgLy8gU0NBTiBTT1JHIEFSUkFZXG4gICAgICBpZiAoIXNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNvcmdBcnJheUlubmVyID0gZ2V0U09SR0FycmF5KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHNvcmdJdGVtIG9mIHNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChzb3JnSXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NRdWVyeVwiKSB7IC8vIFNDQU4gRE9DVU1FTlRcbiAgICAgIHNlYXJjaEFuZFNldCh3aW5kb2MsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gLy8gRE9DUVVFUlkgcGFyc2VcbiAgfVxuXG4gIGlmIChub3RGb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGZvdW5kIGFsbCBlbGVtZW50cyAtIHNldHRpbmcgcmV0cnkgdG8gbWF4XCIpO1xuICB9IGVsc2UgaWYgKGZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIC8vIHVwZGF0ZSByZXRyeSBjb3VudGVyIGFuZCBkZWxheSBvbmx5IGlmIGRvbSBpcyBhY3RpdmVcbiAgICBpZiAoZG9tU3RhdHVzID09PSBcImNvbXBsZXRlXCIgfHwgZG9tU3RhdHVzID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSAqPSAyO1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICs9IDE7XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkIGJ1dCBub3QgZm91bmQgYW55LCBzZXR0aW5nIGRlbGF5IGFuZCByZXRyeSB0byBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIiBhbmQgXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICsgXCIgZm9yIG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdXCIsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQ6IG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdIGFuZCBmb3VuZCBcIiArXG4gICAgICBmb3VuZE5hbWVzLnNpemUsXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoQW5kU2V0ID0gKG9iaiwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcykgPT4ge1xuICBpZiAoc2VhcmNoT2JqKG9iaiwgc2VhcmNoRWxlbWVudCkpIHtcbiAgICBmb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH1cbn07XG5cbi8vIHBhcnNlIHNvdXJjZVxuZXhwb3J0IGNvbnN0IHN0YXJ0SW5mb0xheWVyU2NhbiA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHN0YXJ0SW5mb0xheWVyU2NhbigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH1cbn07XG5cbi8vIEV4dHJhY3QgdmFsdWUgZnJvbSBqc29uIG9iamVjdCB1c2luZyBnaXZlbiBwYXRoXG4vLyBJZiBhbiBlbGVtZW50IGlzICosIGNvbmNhdGVuYXRlIHJlY3Vyc2l2ZWx5IGFsbCBzdWItcGF0aCB2YWx1ZXMgYXMgc3RyaW5nXG5jb25zdCBqc29uR2V0ID0gKG9iaiwgcGF0aCkgPT4ge1xuICBpZiAoIW9iaikgcmV0dXJuIG51bGw7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHBhdGhBcnJheVtpXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aCA9IHBhdGhBcnJheS5zbGljZShpICsgMSkuam9pbihcIi5cIik7XG4gICAgICAgIGNvbnN0IHN1YkFycmF5ID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFtzdWJLZXldICE9PSB1bmRlZmluZWQgJiYgY3VycmVudFtzdWJLZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWYWx1ZSA9IGpzb25HZXQoY3VycmVudFtzdWJLZXldLCBzdWJQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdWJWYWx1ZSAhPT0gbnVsbCAmJiBzdWJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN1YkFycmF5LnB1c2goc3ViVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViQXJyYXk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoQXJyYXlbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZCZWFjb25cIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBCZWFjb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGJlYWNvbiBzZW5kZXJcIik7XG5cbiAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IG51bGw7XG5cbiAgICB0aGlzLmluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIFNlbmQgaW5pdGlhbCBsb2cgYm9keSBhbmQgaW5jcmVtZW50YWwgdXBkYXRlIGxvZ3Mgb24gY2xvc2VcbiAgYXN5bmMgaGFuZGxlQ2xvc2VFdmVudCgpIHtcbiAgICAvLyBpZiBpbml0aWFsIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHNlbmQgdXBkYXRlcyBhbmQgaW5mb2xheWVyIGluIG9uZSBiYXRjaFxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIC8vIGlmIG1haW4gbG9nIGhhcyBiZWVuIHNlbnQsIHNlbmQgaW5jcmVtZW50YWwgdXBkYXRlcyBvbmx5XG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpO1xuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlTWFpbkxvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlTWFpbkxvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXF1ZXN0IGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCkge1xuICAgIGlmICghdGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc1VwZGF0ZXNTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHRoZXJlIGlzIG5vIGluY3JlbWVudGFsIHlldFxuICAgICAgLy8gb3IgaWYgdGhlIHVwZGF0ZXMgaGF2ZSBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNDaGFuZ2VkID0gYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZ3MgY2hhbmdlIHN0YXR1czogXCIsIGhhc0NoYW5nZWQpO1xuICAgIGlmICghaGFzQ2hhbmdlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nRGF0YSA9IGF3YWl0IHRoaXMucGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpO1xuICAgIGlmIChsb2dEYXRhKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2VuZGluZyBpbmNyZW1lbnRhbCBsb2dzXCIsIGxvZ0RhdGEpO1xuICAgICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhsb2dEYXRhKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVBcnJpdmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIG9yIGFycml2YWwgbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZUFycml2YWxMb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpIHtcbiAgICBjb25zdCBod20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19od21cIik7XG4gICAgaWYgKHRoaXMuaGlnaFdhdGVyTWFyayAhPT0gaHdtKSB7XG4gICAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod207XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUFycml2YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFt1cmwsIGhhc2gsIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDAsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgdTogdXJsLFxuICAgICAgb25IYXNoUGN0OiBoYXNoLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZU1haW5Mb2dEYXRhKCkge1xuICAgIGNvbnN0IGJvZHkgPSB7fTtcbiAgICBpZiAoIXdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSkge1xuICAgICAgaWYgKCFrZXkuc3RhcnRzV2l0aChcIl9cIikgJiYgdmFsdWUgIT09IG51bGwpIGJvZHlba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBib2R5LmxjID0gMTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW2EsIGUsIGYsIGksIHMsIG0sIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJmXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJtXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDIsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgYSwgZSwgZiwgaSwgcywgbSxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gcGFnZWhpZGUgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIC8vIElmIHBhZ2UgaXMgbm90IHZpc2libGUgYW5kIGRvZXNuJ3QgYmVjb21lIHZpc2libGUgd2l0aGluIDMwIHNlY29uZHMsIHNlbmQgbG9nc1xuICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbiB0aW1lb3V0XCIpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgICAgICB9LCAzMDAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIHRpbWVvdXQgd2hlbiBwYWdlIGlzIHZpc2libGUgdG8gbWFrZSBzdXJlIHdlIHNlbmQgdGhlIGxhdGVzdCBsb2dzIHBvc3NpYmxlXG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIGlmIChxdWV1ZWQpIHJldHVybjtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICBpZiAoIXF1ZXVlZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBub3QgcXVldWVkXCIpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJlYWNvbjtcbiIsImltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiUmVwbGFjZVV0aWxzXCIpO1xuXG5jb25zdCByZXBsYWNlciA9IGFzeW5jICh2YWx1ZSwgcmVwbGFjZUZuKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgW2ksIHZhbF0gb2YgdmFsdWUuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjdXJyZW50UmVwbGFjZUZuID0gQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pID8gcmVwbGFjZUZuW2ldIDogcmVwbGFjZUZuIHx8IFwiXCI7XG4gICAgICBpZiAodHlwZW9mIGN1cnJlbnRSZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IoY3VycmVudFJlcGxhY2VGbik7XG4gICAgICAgIHZhbHVlW2ldID0gcmVwbGFjZUFsbCh2YWwsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWVbaV0gPSByZXBsYWNlRm5FeGVjdXRvcihjdXJyZW50UmVwbGFjZUZuLCB2YWwpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlcGxhY2VGbikpIHtcbiAgICBmb3IgKGNvbnN0IHJGbiBvZiByZXBsYWNlRm4pIHtcbiAgICAgIGlmICh0eXBlb2YgckZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJGbik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IockZuLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgcmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pO1xuICAgICAgdmFsdWUgPSByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUsIHNpbmdsZSA9IGZhbHNlKSB7XG4gIGlmIChyZXBsYWNlRm4gJiYgdmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSkge1xuICAgIGxvZ2dlci5sb2coXCJFeGVjdXRpbmcgcmVwbGFjZSBmdW5jdGlvbjogXCIsIHJlcGxhY2VGbik7XG4gICAgY29uc3QgcmVwbGFjZUZ1bmN0aW9uID0gRnVuY3Rpb24ocmVwbGFjZUZuKTtcbiAgICBpZiAoc2luZ2xlKSByZXR1cm4gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgICByZXR1cm4gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbikge1xuICBjb25zdCB7c3RvcmFnZSwga2V5LCBrZXlGYWxsYmFjaywgdHlwZX0gPSByZXBsYWNlRm47XG4gIHN3aXRjaCAoc3RvcmFnZSkge1xuICAgIGNhc2UgXCJzZXNzaW9uXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gbnVsbDtcbiAgICAgIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5RmFsbGJhY2spO1xuICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXBsYWNlVmFsID0gSlNPTi5wYXJzZShyZXBsYWNlVmFsKTtcbiAgICAgICAgICByZXBsYWNlVmFsID0gcmVwbGFjZVZhbFtyZXBsYWNlVmFsLmxlbmd0aCAtIDFdW3R5cGVdO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZCBub3QgcGFyc2UgJHtyZXBsYWNlVmFsfWApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gICAgY2FzZSBcImluZm8tbGF5ZXJcIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleUZhbGxiYWNrKTtcbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlcjtcbiIsImNvbnN0IGluc3RhbmNlT2ZBbnkgPSAob2JqZWN0LCBjb25zdHJ1Y3RvcnMpID0+IGNvbnN0cnVjdG9ycy5zb21lKChjKSA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xubGV0IGN1cnNvckFkdmFuY2VNZXRob2RzO1xuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcbiAgICByZXR1cm4gKGlkYlByb3h5YWJsZVR5cGVzIHx8XG4gICAgICAgIChpZGJQcm94eWFibGVUeXBlcyA9IFtcbiAgICAgICAgICAgIElEQkRhdGFiYXNlLFxuICAgICAgICAgICAgSURCT2JqZWN0U3RvcmUsXG4gICAgICAgICAgICBJREJJbmRleCxcbiAgICAgICAgICAgIElEQkN1cnNvcixcbiAgICAgICAgICAgIElEQlRyYW5zYWN0aW9uLFxuICAgICAgICBdKSk7XG59XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkge1xuICAgIHJldHVybiAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHxcbiAgICAgICAgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5hZHZhbmNlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxuICAgICAgICBdKSk7XG59XG5jb25zdCBjdXJzb3JSZXF1ZXN0TWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uRG9uZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh3cmFwKHJlcXVlc3QucmVzdWx0KSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH0pO1xuICAgIHByb21pc2VcbiAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgIC8vIFNpbmNlIGN1cnNvcmluZyByZXVzZXMgdGhlIElEQlJlcXVlc3QgKCpzaWdoKiksIHdlIGNhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWxcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJDdXJzb3IpIHtcbiAgICAgICAgICAgIGN1cnNvclJlcXVlc3RNYXAuc2V0KHZhbHVlLCByZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYXRjaGluZyB0byBhdm9pZCBcIlVuY2F1Z2h0IFByb21pc2UgZXhjZXB0aW9uc1wiXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgLy8gVGhpcyBtYXBwaW5nIGV4aXN0cyBpbiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYnV0IGRvZXNuJ3QgZG9lc24ndCBleGlzdCBpbiB0cmFuc2Zvcm1DYWNoZS4gVGhpc1xuICAgIC8vIGlzIGJlY2F1c2Ugd2UgY3JlYXRlIG1hbnkgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0LlxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcbiAgICAvLyBFYXJseSBiYWlsIGlmIHdlJ3ZlIGFscmVhZHkgY3JlYXRlZCBhIGRvbmUgcHJvbWlzZSBmb3IgdGhpcyB0cmFuc2FjdGlvbi5cbiAgICBpZiAodHJhbnNhY3Rpb25Eb25lTWFwLmhhcyh0eCkpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBkb25lID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvciB8fCBuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydEVycm9yJywgJ0Fib3J0RXJyb3InKSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIENhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgdHJhbnNhY3Rpb25Eb25lTWFwLnNldCh0eCwgZG9uZSk7XG59XG5sZXQgaWRiUHJveHlUcmFwcyA9IHtcbiAgICBnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyYW5zYWN0aW9uLmRvbmUuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RvbmUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBmb3Igb2JqZWN0U3RvcmVOYW1lcyBiZWNhdXNlIG9mIEVkZ2UuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ29iamVjdFN0b3JlTmFtZXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1ha2UgdHguc3RvcmUgcmV0dXJuIHRoZSBvbmx5IHN0b3JlIGluIHRoZSB0cmFuc2FjdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBtYW55LlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1sxXVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IHJlY2VpdmVyLm9iamVjdFN0b3JlKHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEVsc2UgdHJhbnNmb3JtIHdoYXRldmVyIHdlIGdldCBiYWNrLlxuICAgICAgICByZXR1cm4gd3JhcCh0YXJnZXRbcHJvcF0pO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldCwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24gJiZcbiAgICAgICAgICAgIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHJlcGxhY2VUcmFwcyhjYWxsYmFjaykge1xuICAgIGlkYlByb3h5VHJhcHMgPSBjYWxsYmFjayhpZGJQcm94eVRyYXBzKTtcbn1cbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbihmdW5jKSB7XG4gICAgLy8gRHVlIHRvIGV4cGVjdGVkIG9iamVjdCBlcXVhbGl0eSAod2hpY2ggaXMgZW5mb3JjZWQgYnkgdGhlIGNhY2hpbmcgaW4gYHdyYXBgKSwgd2VcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXG4gICAgLy8gRWRnZSBkb2Vzbid0IHN1cHBvcnQgb2JqZWN0U3RvcmVOYW1lcyAoYm9vbyksIHNvIHdlIHBvbHlmaWxsIGl0IGhlcmUuXG4gICAgaWYgKGZ1bmMgPT09IElEQkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiAmJlxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmVOYW1lcywgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgdHggPSBmdW5jLmNhbGwodW53cmFwKHRoaXMpLCBzdG9yZU5hbWVzLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHR4KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ3Vyc29yIG1ldGhvZHMgYXJlIHNwZWNpYWwsIGFzIHRoZSBiZWhhdmlvdXIgaXMgYSBsaXR0bGUgbW9yZSBkaWZmZXJlbnQgdG8gc3RhbmRhcmQgSURCLiBJblxuICAgIC8vIElEQiwgeW91IGFkdmFuY2UgdGhlIGN1cnNvciBhbmQgd2FpdCBmb3IgYSBuZXcgJ3N1Y2Nlc3MnIG9uIHRoZSBJREJSZXF1ZXN0IHRoYXQgZ2F2ZSB5b3UgdGhlXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcbiAgICAvLyB3aXRoIHJlYWwgcHJvbWlzZXMsIHNvIGVhY2ggYWR2YW5jZSBtZXRob2RzIHJldHVybnMgYSBuZXcgcHJvbWlzZSBmb3IgdGhlIGN1cnNvciBvYmplY3QsIG9yXG4gICAgLy8gdW5kZWZpbmVkIGlmIHRoZSBlbmQgb2YgdGhlIGN1cnNvciBoYXMgYmVlbiByZWFjaGVkLlxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKGN1cnNvclJlcXVlc3RNYXAuZ2V0KHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHdyYXAoZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIHJldHVybiB3cmFwRnVuY3Rpb24odmFsdWUpO1xuICAgIC8vIFRoaXMgZG9lc24ndCByZXR1cm4sIGl0IGp1c3QgY3JlYXRlcyBhICdkb25lJyBwcm9taXNlIGZvciB0aGUgdHJhbnNhY3Rpb24sXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbilcbiAgICAgICAgY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHZhbHVlKTtcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodmFsdWUsIGlkYlByb3h5VHJhcHMpO1xuICAgIC8vIFJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrIGlmIHdlJ3JlIG5vdCBnb2luZyB0byB0cmFuc2Zvcm0gaXQuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gd3JhcCh2YWx1ZSkge1xuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxuICAgIC8vIElEQiBpcyB3ZWlyZCBhbmQgYSBzaW5nbGUgSURCUmVxdWVzdCBjYW4geWllbGQgbWFueSByZXNwb25zZXMsIHNvIHRoZXNlIGNhbid0IGJlIGNhY2hlZC5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJSZXF1ZXN0KVxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSB0cmFuc2Zvcm1lZCB0aGlzIHZhbHVlIGJlZm9yZSwgcmV1c2UgdGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxuICAgIC8vIFRoaXMgaXMgZmFzdGVyLCBidXQgaXQgYWxzbyBwcm92aWRlcyBvYmplY3QgZXF1YWxpdHkuXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSk7XG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXG4gICAgLy8gVGhlc2UgbWF5IGJlIHByaW1pdGl2ZSB0eXBlcywgc28gdGhleSBjYW4ndCBiZSBXZWFrTWFwIGtleXMuXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChuZXdWYWx1ZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG59XG5jb25zdCB1bndyYXAgPSAodmFsdWUpID0+IHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuXG5leHBvcnQgeyByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYXMgYSwgaW5zdGFuY2VPZkFueSBhcyBpLCByZXBsYWNlVHJhcHMgYXMgciwgdW53cmFwIGFzIHUsIHdyYXAgYXMgdyB9O1xuIiwiaW1wb3J0IHsgdyBhcyB3cmFwLCByIGFzIHJlcGxhY2VUcmFwcyB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuZXhwb3J0IHsgdSBhcyB1bndyYXAsIHcgYXMgd3JhcCB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuXG4vKipcbiAqIE9wZW4gYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqIEBwYXJhbSB2ZXJzaW9uIFNjaGVtYSB2ZXJzaW9uLlxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cbiAqL1xuZnVuY3Rpb24gb3BlbkRCKG5hbWUsIHZlcnNpb24sIHsgYmxvY2tlZCwgdXBncmFkZSwgYmxvY2tpbmcsIHRlcm1pbmF0ZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5Qcm9taXNlID0gd3JhcChyZXF1ZXN0KTtcbiAgICBpZiAodXBncmFkZSkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHVwZ3JhZGUod3JhcChyZXF1ZXN0LnJlc3VsdCksIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIHdyYXAocmVxdWVzdC50cmFuc2FjdGlvbiksIGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsIChldmVudCkgPT4gYmxvY2tlZChcbiAgICAgICAgLy8gQ2FzdGluZyBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0LURPTS1saWItZ2VuZXJhdG9yL3B1bGwvMTQwNVxuICAgICAgICBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCBldmVudCkpO1xuICAgIH1cbiAgICBvcGVuUHJvbWlzZVxuICAgICAgICAudGhlbigoZGIpID0+IHtcbiAgICAgICAgaWYgKHRlcm1pbmF0ZWQpXG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHRlcm1pbmF0ZWQoKSk7XG4gICAgICAgIGlmIChibG9ja2luZykge1xuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcigndmVyc2lvbmNoYW5nZScsIChldmVudCkgPT4gYmxvY2tpbmcoZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgZXZlbnQpKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xuICAgIHJldHVybiBvcGVuUHJvbWlzZTtcbn1cbi8qKlxuICogRGVsZXRlIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZURCKG5hbWUsIHsgYmxvY2tlZCB9ID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xuICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsIChldmVudCkgPT4gYmxvY2tlZChcbiAgICAgICAgLy8gQ2FzdGluZyBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0LURPTS1saWItZ2VuZXJhdG9yL3B1bGwvMTQwNVxuICAgICAgICBldmVudC5vbGRWZXJzaW9uLCBldmVudCkpO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcChyZXF1ZXN0KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XG59XG5cbmNvbnN0IHJlYWRNZXRob2RzID0gWydnZXQnLCAnZ2V0S2V5JywgJ2dldEFsbCcsICdnZXRBbGxLZXlzJywgJ2NvdW50J107XG5jb25zdCB3cml0ZU1ldGhvZHMgPSBbJ3B1dCcsICdhZGQnLCAnZGVsZXRlJywgJ2NsZWFyJ107XG5jb25zdCBjYWNoZWRNZXRob2RzID0gbmV3IE1hcCgpO1xuZnVuY3Rpb24gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkge1xuICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIElEQkRhdGFiYXNlICYmXG4gICAgICAgICEocHJvcCBpbiB0YXJnZXQpICYmXG4gICAgICAgIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FjaGVkTWV0aG9kcy5nZXQocHJvcCkpXG4gICAgICAgIHJldHVybiBjYWNoZWRNZXRob2RzLmdldChwcm9wKTtcbiAgICBjb25zdCB0YXJnZXRGdW5jTmFtZSA9IHByb3AucmVwbGFjZSgvRnJvbUluZGV4JC8sICcnKTtcbiAgICBjb25zdCB1c2VJbmRleCA9IHByb3AgIT09IHRhcmdldEZ1bmNOYW1lO1xuICAgIGNvbnN0IGlzV3JpdGUgPSB3cml0ZU1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpO1xuICAgIGlmIChcbiAgICAvLyBCYWlsIGlmIHRoZSB0YXJnZXQgZG9lc24ndCBleGlzdCBvbiB0aGUgdGFyZ2V0LiBFZywgZ2V0QWxsIGlzbid0IGluIEVkZ2UuXG4gICAgISh0YXJnZXRGdW5jTmFtZSBpbiAodXNlSW5kZXggPyBJREJJbmRleCA6IElEQk9iamVjdFN0b3JlKS5wcm90b3R5cGUpIHx8XG4gICAgICAgICEoaXNXcml0ZSB8fCByZWFkTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kID0gYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xuICAgICAgICAvLyBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiB1bmRlZmluZWQgZ3ppcHBzIGJldHRlciwgYnV0IGZhaWxzIGluIEVkZ2UgOihcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5Jyk7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0eC5zdG9yZTtcbiAgICAgICAgaWYgKHVzZUluZGV4KVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmluZGV4KGFyZ3Muc2hpZnQoKSk7XG4gICAgICAgIC8vIE11c3QgcmVqZWN0IGlmIG9wIHJlamVjdHMuXG4gICAgICAgIC8vIElmIGl0J3MgYSB3cml0ZSBvcGVyYXRpb24sIG11c3QgcmVqZWN0IGlmIHR4LmRvbmUgcmVqZWN0cy5cbiAgICAgICAgLy8gTXVzdCByZWplY3Qgd2l0aCBvcCByZWplY3Rpb24gZmlyc3QuXG4gICAgICAgIC8vIE11c3QgcmVzb2x2ZSB3aXRoIG9wIHZhbHVlLlxuICAgICAgICAvLyBNdXN0IGhhbmRsZSBib3RoIHByb21pc2VzIChubyB1bmhhbmRsZWQgcmVqZWN0aW9ucylcbiAgICAgICAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0YXJnZXRbdGFyZ2V0RnVuY05hbWVdKC4uLmFyZ3MpLFxuICAgICAgICAgICAgaXNXcml0ZSAmJiB0eC5kb25lLFxuICAgICAgICBdKSlbMF07XG4gICAgfTtcbiAgICBjYWNoZWRNZXRob2RzLnNldChwcm9wLCBtZXRob2QpO1xuICAgIHJldHVybiBtZXRob2Q7XG59XG5yZXBsYWNlVHJhcHMoKG9sZFRyYXBzKSA9PiAoe1xuICAgIC4uLm9sZFRyYXBzLFxuICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcbiAgICBoYXM6ICh0YXJnZXQsIHByb3ApID0+ICEhZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuaGFzKHRhcmdldCwgcHJvcCksXG59KSk7XG5cbmV4cG9ydCB7IGRlbGV0ZURCLCBvcGVuREIgfTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZV9jYWNoZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBzdG9yZToge1xuICAgIG5hbWU6IFwiaW5mb0NhY2hlXCIsXG4gICAgaW5kZXhlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIml4X3NrdVwiLFxuICAgICAgICBmaWVsZHM6IFwic2t1XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgb3B0aW9uczoge2tleVBhdGg6IFwic2t1XCJ9LFxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsIlxuaW1wb3J0IHtvcGVuREJ9IGZyb20gXCJpZGJcIjtcbmltcG9ydCB7ZmV0Y2hQcm9kdWN0SW5mb30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5XCIpO1xuY2xhc3MgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kZXhlZERCID0gbnVsbDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGFzeW5jIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgY29uc3Qge2RiTmFtZSwgdmVyc2lvbn0gPSBjb25maWc7XG4gICAgY29uc3QgZGIgPSBhd2FpdCBvcGVuREIoZGJOYW1lLCB2ZXJzaW9uLCB7XG4gICAgICB1cGdyYWRlKGRiLCBvbGRWZXJzaW9uKSB7XG4gICAgICAgIHN3aXRjaCAob2xkVmVyc2lvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGRiLmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5pbmRleGVkREIgPSBkYjtcbiAgfVxuXG4gIGFzeW5jIGdldERCKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLmluZGV4ZWREQik7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlByb2R1Y3QgaW5mbyBkYiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgMzAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRTdG9yZShyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIHJldHVybiBkYi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSwgcmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikuc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKHBheWxvYWQpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuZ2V0U3RvcmUodHJ1ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIGNvbnN0IHNhdmVQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBsb2FkIG9mIHBheWxvYWQpIHtcbiAgICAgICAgbG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHNhdmVQcm9taXNlcy5wdXNoKHN0b3JlLnB1dChsb2FkKSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChzYXZlUHJvbWlzZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgIGF3YWl0IHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjbGVhcigpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuZ2V0U3RvcmUodHJ1ZSk7XG4gICAgYXdhaXQgc3RvcmUuY2xlYXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3luYyBnZXQoc2t1KSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGIuZ2V0KGNvbmZpZy5zdG9yZS5uYW1lLCBza3UpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBjb3VudCgpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb3VudChjb25maWcuc3RvcmUubmFtZSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIGdldEN1cnNvcigpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCBkYi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSkuc3RvcmUub3BlbkN1cnNvcigpO1xuICAgIHJldHVybiBjdXJzb3I7XG4gIH1cblxuICBhc3luYyBwZXJzaXN0UHJvZHVjdEluZm8oKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicGluZm8tY2hlY2stZXhpc3RpbmdcIik7XG4gICAgbGV0IGNsZWFyUHJvbWlzZSA9IG51bGw7XG4gICAgY29uc3QgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IHRoaXMuZ2V0Q3Vyc29yKCk7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBjdXJzb3IudmFsdWUudGltZXN0YW1wO1xuICAgICAgY29uc3QgZWxhcHNlZFNlY29uZHMgPSAoRGF0ZS5ub3coKSAvIDEwMDApIC0gdGltZXN0YW1wO1xuICAgICAgLy8gUmUtZmV0Y2ggcHJvZHVjdCBpbmZvIG9uY2UgYSBkYXlcbiAgICAgIGlmIChlbGFwc2VkU2Vjb25kcyA8IDg2NDAwKSByZXR1cm47XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGlzIGV4cGlyZWRcIik7XG4gICAgICBjbGVhclByb21pc2UgPSB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBpbmZvLWZldGNoXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvUHJvbWlzZSA9IGZldGNoUHJvZHVjdEluZm8oKTtcbiAgICBjb25zdCBbcHJvZHVjdEluZm9BcnJheV0gPSBhd2FpdCBQcm9taXNlLmFsbChbcHJvZHVjdEluZm9Qcm9taXNlLCBjbGVhclByb21pc2VdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvQXJyYXkgfHwgIXByb2R1Y3RJbmZvQXJyYXkubGVuZ3RoKSByZXR1cm47XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicGluZm8tcHJlc2F2ZVwiKTtcbiAgICBhd2FpdCB0aGlzLnNhdmUodGhpcy5wcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBpbmZvLXNhdmVkXCIpO1xuICB9XG5cbiAgcHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICBjb25zdCBwYXlsb2FkcyA9IFtdO1xuICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBwcm9kdWN0SW5mb0FycmF5LnNoaWZ0KCk7XG4gICAgZmllbGROYW1lcy5zaGlmdCgpO1xuICAgIGZvciAoY29uc3QgaW5mbyBvZiBwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge3NrdTogaW5mby5zaGlmdCgpfTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXlsb2FkW2ZpZWxkTmFtZXNbaV1dID0gaW5mb1tpXSB8fCBudWxsO1xuICAgICAgfVxuICAgICAgcGF5bG9hZHMucHVzaChwYXlsb2FkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBheWxvYWRzO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tJbml0aWFsaXplZChjYWxsYmFjaykge1xuICAgIGxldCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGxldCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSkgfHxcbiAgICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbyAmJiBza3VMaXN0KSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJvZHVjdEluZm9UaW1lb3V0ID0gbnVsbDtcbiAgICBjb25zdCBwcm9kdWN0SW5mb0ludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICAgIHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKSB8fFxuICAgICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgICAgICBpZiAoc2t1TGlzdCkge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChwcm9kdWN0SW5mb0ludGVydmFsKTtcbiAgICAgICAgICBjbGVhclRpbWVvdXQocHJvZHVjdEluZm9UaW1lb3V0KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAyNSk7XG4gICAgcHJvZHVjdEluZm9UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKHByb2R1Y3RJbmZvSW50ZXJ2YWwpO1xuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnk7XG4iLCJpbXBvcnQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHtpZGJSZWFkeX0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IFN0b3JlID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgaW5zdGFuY2UgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGdldEluc3RhbmNlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICBhd2FpdCBpZGJSZWFkeSgpO1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5KCk7XG4gICAgICAgIC8vIEhpZGUgdGhlIGNvbnN0cnVjdG9yIHNvIHRoZSByZXR1cm5lZCBvYmplY3QgY2FuJ3QgYmUgbmV3J2QuLi5cbiAgICAgICAgaW5zdGFuY2UuY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG4gIH07XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQge3N0eWxlQXBwbGljYXRvciwgZGVsYXksIGlkbGVUaW1lciwgZ2V0VW5zZWN1cmVIYXNofSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7cmVwbGFjZUFsbCwgdHVya2lzaFRvTG93ZXJ9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUlksIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBJRExFX1RJTUVPVVR9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCByZXBsYWNlciBmcm9tIFwiLi9yZXBsYWNlLXV0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5QWN0aW9ucyhhY3Rpb25zKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVBcHBseUFjdGlvbnNcIik7XG4gIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBjb25zdCB7XG4gICAgICBvcGVyYXRvcixcbiAgICAgIHR5cGUsXG4gICAgICBhcHBseUV2ZW50LFxuICAgICAgY29udGVudFNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBzZWxlY3RvckZhbGxiYWNrLFxuICAgICAgbWRDb25kaXRpb24sXG4gICAgICBtb3ZlX3NlbGVjdG9yXzEsXG4gICAgICBtb3ZlX3NlbGVjdG9yXzIsXG4gICAgICByZXBsYWNlRm4sXG4gICAgICBwVHlwZSxcbiAgICAgIHByb2R1Y3RJbmZvU3RvcmFnZSxcbiAgICB9ID0gYWN0aW9uO1xuICAgIGlmIChvcGVyYXRvciA9PT0gXCJub29wXCIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJOb29wIE9wZXJhdG9yOiBObyBvcGVyYXRpb24gaXMgYXBwbGllZCBvbiB0YXJnZXQgXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCB7dmFsdWV9ID0gYWN0aW9uO1xuICAgIC8vIElmIGFuIGVsZW1lbnQgaXMgcGFzc2VkIHRvIHRyYW5zZm9ybWVyLCBzZWxlY3RvciBpcyByZWxhdGl2ZSB0byBwYXNzZWQgZWxlbWVudFxuICAgIGVsZW1lbnQgPSBlbGVtZW50ID8gZWxlbWVudC5maW5kKHNlbGVjdG9yKSA6ICQoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbWMgPSBtZENvbmRpdGlvbiA/IHdpbmRvdy5tYXRjaE1lZGlhKG1kQ29uZGl0aW9uKS5tYXRjaGVzIDogdHJ1ZTtcbiAgICBpZiAoIW1jKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTWVkaWEgY29uZGl0aW9uIG1pc21hdGNoOiBcIiwgbWRDb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAobW92ZV9zZWxlY3Rvcl8xICYmICFtb3ZlX3NlbGVjdG9yXzIpIHx8XG4gICAgICAobW92ZV9zZWxlY3Rvcl8yICYmICFtb3ZlX3NlbGVjdG9yXzEpXG4gICAgKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQm90aCBtb3ZlIHNlbGVjdG9ycyBhcmUgcmVxdWlyZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChtb3ZlX3NlbGVjdG9yXzEgJiYgbW92ZV9zZWxlY3Rvcl8yKSB7XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8xKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMSBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8yKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMiBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3Qgc3BlY2lmaWVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGlmICghJChzZWxlY3RvckZhbGxiYWNrKS5sZW5ndGggJiYgb3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IFwibm8tc2VsZWN0b3JcIikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQ6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyeWluZyBmYWxsYmFjayBzZWxlY3RvcjogXCIsIHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmIChzZWxlY3RvckZhbGxiYWNrKSBlbGVtZW50ID0gJChzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFsbGJhY2sgc2VsZWN0b3Igbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlRm4pIHtcbiAgICAgIHZhbHVlID0gYXdhaXQgcmVwbGFjZXIodmFsdWUsIHJlcGxhY2VGbik7XG4gICAgfVxuICAgIGlmIChvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlbW92aW5nOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluc2VydFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJlZm9yZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYmVmb3JlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFmdGVyXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBhZnRlcjogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFmdGVyKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBlbmRpbmcgdmFsdWU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW9kYWxcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50Lm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAoZWxtID09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNwbGF5TW9kYWwodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwb3B1cFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJQb3B1cCBhbHJlYWR5IGRpc3BsYXllZCBpbiBzZXNzaW9uXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBQb3B1cDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwVHlwZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBjb25zdCBtb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJleGl0SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgZXhpdCBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3IsIGRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInJcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIgJiYgIXIuaW5jbHVkZXMoZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZGxlVGltZXIoSURMRV9USU1FT1VULCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3B5SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgY29weSBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhcHBlbmQgcG9wdXAgdG8gYm9keSBhZnRlciB0aW1lb3V0IGV4cGlyZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVBvcHVwKCk7XG4gICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBUeXBlOiAke3R5cGV9IG5vdCBmb3VuZCBmb3Igb3BlcmF0b3I6ICR7b3BlcmF0b3J9YCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiZWRpdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyB0ZXh0OiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQudGV4dCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgaHRtbDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lmh0bWwodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVBcHBsaWNhdG9yXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVDaGFuZ2VzTWFwID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiU3R5bGUgQ2hhbmdlcyBNYXA6IFwiLCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgICAgc3R5bGVBcHBsaWNhdG9yKGVsZW1lbnQsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWRkQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBhZGRkaW5nIGNsYXNzIHRvICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlbW92ZUNsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgcmVtb3ZlIGNsYXNzIGZyb20gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG9jdW1lbnRUaXRsZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGNoYW5naW5nIGRvY3VtZW50IHRpdGxlIGZyb20gJHtlbGVtZW50fSB0byAke3ZhbHVlfWApO1xuICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09IFwidGFiQ2hhbmdlXCIpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiY2F0Y2hpbmcgZXZlbnQgdGFiY2hhbmdlLi5cIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShlLCB2YWx1ZSwgb3JpZ2luYWxUaXRsZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGNvbnN0IHNjcmlwdElEID0gZ2V0VW5zZWN1cmVIYXNoKHZhbHVlKTtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNjcmlwdElEKSkge1xuICAgICAgICBsb2dnZXIubG9nKFwiU2NyaXB0IGFscmVhZHkgaW4gcGFnZSFcIik7XG4gICAgICB9IGVsc2UgZWxlbWVudC5hcHBlbmQoYDxzY3JpcHQgaWQ9JHtzY3JpcHRJRH0+JHt2YWx1ZX08L3NjcmlwdD5gKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcIm1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhgTW92aW5nICR7bW92ZV9zZWxlY3Rvcl8xfSB0byAke21vdmVfc2VsZWN0b3JfMn1gKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGRlc3RpbmF0aW9uLnByZXBlbmQoc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInByb2R1Y3RJbmZvTG9va3VwXCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgIGVsZW1lbnQuYmVmb3JlKHJlcyk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJ0ZXh0LXRyYW5zZm9ybVwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNhcGl0YWxpemVcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBBcnJheS5mcm9tKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGFkZCB0cmFuc2xhdGUgbW9kdWxlXG4gICAgICAgICAgICBpZiAoZS5pbm5lclRleHQ/LmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpLnNwbGl0KFwiXFxuXCIpLm1hcCgoc2VudGVuY2UpID0+XG4gICAgICAgICAgICAgICAgc2VudGVuY2Uuc3BsaXQoXCIgXCIpLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICApLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dClcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIHRleHQtdHJhbnNmb3JtIHR5cGVcIik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiYWktc3VnZ2VzdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRpdGxlLWNoYW5nZVwiOiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcImdldHRpbmcgdGl0bGUgc3VnZ2VzdGlvbnNcIik7XG4gICAgICAgICAgY29uc3QgZmluYWxUaXRsZSA9IGF3YWl0IHByZXBhcmVGaW5hbFRpdGxlKCk7XG4gICAgICAgICAgaWYgKCFmaW5hbFRpdGxlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ2Fubm90IGFwcGx5IHRpdGxlLWNoYW5nZSB0aGVyZSBpcyBubyBzdWdnZXN0aW9uIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5jb250ZW50cygpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVUeXBlID09IDM7XG4gICAgICAgICAgfSlbMF0ubm9kZVZhbHVlID0gZmluYWxUaXRsZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkLWRlc2NyaXB0aW9uXCI6IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0dGluZyBkZXNjcmlwdGlvbiBzdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkVsbSA9IGF3YWl0IHByZXBhcmVEZXNjRWxtKHZhbHVlKTtcbiAgICAgICAgICBpZiAoIWRlc2NyaXB0aW9uRWxtKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ2Fubm90IGFwcGx5IGFkZC1kZXNjcmlwdGlvbiB0aGVyZSBpcyBubyBzdWdnZXN0aW9uIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUoZGVzY3JpcHRpb25FbG0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIG9wZXJhdG9yIGV4aXN0cyB5ZXRcIiwgb3BlcmF0b3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBwcmVwYXJlRGVzY0VsbSA9IGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KHNrdSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mbz8ubWFya2V0aW5nQ29weSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gZGVzY3JpcHRpb24gZm91bmQgZm9yIHNrdSAke3NrdX1gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB1cGRhdGVkSHRtbFN0cmluZyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLm1hcmtldGluZ0NvcHksIHZhbHVlKTtcbiAgICByZXR1cm4gdXBkYXRlZEh0bWxTdHJpbmc7XG4gIH07XG5cbiAgY29uc3QgcHJlcGFyZUZpbmFsVGl0bGUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1KTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvPy50aXRsZUF1Z21lbnQpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIHRpdGxlIHN1Z2dlc3Rpb24gZm91bmQgZm9yIHNrdSAke3NrdX1gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBwcm9kdWN0SW5mby50aXRsZUF1Z21lbnQgKyBgICgke3NrdX0pYDtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIGNvbnN0IHJlcGxhY2VXaXRoVmFsID0gKHZhbHVlLCBodG1sU3RyKSA9PiB7XG4gICAgaWYgKHZhbHVlICYmIGh0bWxTdHIuaW5jbHVkZXMoXCJ7e1JFUExBQ0VfUFJPRFVDVElORk99fVwiKSkge1xuICAgICAgaHRtbFN0ciA9IHJlcGxhY2VBbGwoaHRtbFN0ciwgXCJ7e1JFUExBQ0VfUFJPRFVDVElORk99fVwiLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBodG1sU3RyO1xuICB9O1xuXG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1TGlzdFswXSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSA9IGFzeW5jIChldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkVGl0bGVzID0gIUFycmF5LmlzQXJyYXkodGl0bGVzKSA/IFt0aXRsZXNdIDogdGl0bGVzO1xuICAgIGZvciAoY29uc3QgcGFyc2VkVGl0bGUgb2YgcGFyc2VkVGl0bGVzKSB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IHBhcnNlZFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQb3B1cENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQ7XG4gICAgaWYgKGlkICYmIGlkID09PSBcIm5kLXBvcHVwX193cmFwcGVyXCIpIHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuY29udGFpbnMoXCJuZC1tb2RhbF9fd3JhcHBlclwiKSkge1xuICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBvcHVwID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpID4gMCkgcmV0dXJuO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAxKTtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmQtcG9wdXBfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcblxuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH0sIDE1MDAwKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5TW9kYWwgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvcikgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpKSBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQb3B1cCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCBpc01vZGFsPWZhbHNlKSA9PiB7XG4gICAgLy8gQ3JlYXRlIHBvcHVwIHdyYXBwZXJcbiAgICBjb25zdCBwb3B1cFdyYXBwZXIgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLXBvcHVwX193cmFwcGVyXCIpO1xuICAgIGlmIChpc01vZGFsKSBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLW1vZGFsX193cmFwcGVyXCIpO1xuICAgIGlmICghaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmlkID0gXCJuZC1wb3B1cF9fd3JhcHBlclwiO1xuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b24gPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvblN0eWxlID0gaXNNb2RhbCA/IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZV9fY29sb3JlZFwiIDogXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlXCI7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xvc2VCdXR0b25TdHlsZSk7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBpZiAoaXNNb2RhbCkge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnRTZWxlY3Rvcikge1xuICAgICAgY29uc3QgY29udGVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZW50U2VsZWN0b3IpKTtcbiAgICAgIHdoaWxlICh2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpICYmIGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgY29udGVudHMuc2hpZnQoKS5zcmMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBwb3B1cCBmcm9tIGFjdGlvbiBhbmQgYXBwZW5kIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHRlbXBsYXRlID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IHBvcHVwID0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwQ2xvc2VCdXR0b24pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChwb3B1cCk7XG5cbiAgICAvLyBSZW1vdmUgb2xkIHBvcHVwIGlmIGV4aXN0cyBiZWZvcmUgYXBwZW5kaW5nIG5ldyBvbmVcbiAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IHN3YXBOb2RlcyA9IGZ1bmN0aW9uIHN3YXBOb2RlcyhuMSwgbjIpIHtcbiAgICBjb25zdCBwMSA9IG4xLnBhcmVudE5vZGU7XG4gICAgY29uc3QgcDIgPSBuMi5wYXJlbnROb2RlO1xuICAgIGxldCBpMTtcbiAgICBsZXQgaTI7XG5cbiAgICBpZiAoIXAxIHx8ICFwMiB8fCBwMS5pc0VxdWFsTm9kZShuMikgfHwgcDIuaXNFcXVhbE5vZGUobjEpKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDEuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjEpKSB7XG4gICAgICAgIGkxID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAyLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4yKSkge1xuICAgICAgICBpMiA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHAxLmlzRXF1YWxOb2RlKHAyKSAmJiBpMSA8IGkyKSB7XG4gICAgICBpMisrO1xuICAgIH1cbiAgICBwMS5pbnNlcnRCZWZvcmUobjIsIHAxLmNoaWxkcmVuW2kxXSk7XG4gICAgcDIuaW5zZXJ0QmVmb3JlKG4xLCBwMi5jaGlsZHJlbltpMl0pO1xuICB9O1xuXG4gIGNvbnN0IHdhaXRGb3JKUXVlcnkgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImpRdWVyeSBub3QgZm91bmQsIHJldHJ5aW5nXCIpO1xuICAgICAgICBjb25zdCBqUXVlcnlJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0gZWxzZSByZXNvbHZlKHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFjdGlvbkFwcGxpY2F0b3IgPSBhc3luYyAoYWN0aW9ucykgPT4ge1xuICAgIGlmIChhd2FpdCB3YWl0Rm9ySlF1ZXJ5KCkpIHtcbiAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoYWN0aW9uLmVsaWdpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBhY3Rpb24uZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGRuJ3QgYXBwbHkgYWN0aW9uICR7SlNPTi5zdHJpbmdpZnkoYWN0aW9uKX0gd2l0aCBlcnJvciAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVycm9yLWFwcGx5aW5nLWFjdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJKcXVlcnkgbm90IGZvdW5kIG9uIHdpbmRvd1wiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWpxdWVyeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQXBwbHkgYWN0aW9uc1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBhY3Rpb25BcHBsaWNhdG9yKGFjdGlvbnMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGRlZmF1bHQgYXBwbHlBY3Rpb25zO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlLCBjaGFpbn0gPSBjb25kaXRpb247XG4gIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbmRpdGlvbkVsZW1lbnRzKSB7XG4gICAgaWYgKGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pKSB7XG4gICAgICBlbGlnaWJsZUVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuY29uc3QgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciA9IGFzeW5jIChlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChlbGVtZW50U2t1KTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHByb2R1Y3RJbmZvPy5bb3BlcmF0b3JdO1xuICAgICAgLy8gcnVuVGltZVZhbHVlIG1heSBiZSAwXG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8IHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJQcm9kdWN0IGluZm8gaXMgZW1wdHlcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhc2UgXCJmdW5jdGlvblwiOiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmbiA9IEZ1bmN0aW9uKFwiZWxcIiwgb3BlcmF0b3IpO1xuICAgICAgICByZXR1cm4gZm4oZWxlbWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGV4ZWN1dGluZyBmdW5jdGlvbiBhY3Rpb24gY29uZGl0aW9uXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGNoYWluKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgY2hhaW4udHlwZSwgY2hhaW4ub3BlcmF0b3IsXG4gICAgICAgICAgICBjaGFpbi5hdHRyaWJ1dGUsIGNoYWluLmlubmVyX2NvbmRpdGlvbiwgY2hhaW4udmFsdWUsIGNoYWluLmNoYWluKTtcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGVja0FjdGlvbkNvbmRpdGlvbjtcbiIsImNvbnN0IEVfVElNRU9VVCA9IG5ldyBFcnJvcigndGltZW91dCB3aGlsZSB3YWl0aW5nIGZvciBtdXRleCB0byBiZWNvbWUgYXZhaWxhYmxlJyk7XG5jb25zdCBFX0FMUkVBRFlfTE9DS0VEID0gbmV3IEVycm9yKCdtdXRleCBhbHJlYWR5IGxvY2tlZCcpO1xuY29uc3QgRV9DQU5DRUxFRCA9IG5ldyBFcnJvcigncmVxdWVzdCBmb3IgbG9jayBjYW5jZWxlZCcpO1xuXG52YXIgX19hd2FpdGVyJDIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIFNlbWFwaG9yZSB7XG4gICAgY29uc3RydWN0b3IoX3ZhbHVlLCBfY2FuY2VsRXJyb3IgPSBFX0NBTkNFTEVEKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gX3ZhbHVlO1xuICAgICAgICB0aGlzLl9jYW5jZWxFcnJvciA9IF9jYW5jZWxFcnJvcjtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzID0gW107XG4gICAgfVxuICAgIGFjcXVpcmUod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0ucHVzaCh7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCA9IDEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgW3ZhbHVlLCByZWxlYXNlXSA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jayh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0ucHVzaChyZXNvbHZlKTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlIDw9IDA7XG4gICAgfVxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIHJlbGVhc2Uod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMuZm9yRWFjaCgocXVldWUpID0+IHF1ZXVlLmZvckVhY2goKGVudHJ5KSA9PiBlbnRyeS5yZWplY3QodGhpcy5fY2FuY2VsRXJyb3IpKSk7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgfVxuICAgIF9kaXNwYXRjaCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlRW50cnkgPSAoX2EgPSB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlRW50cnkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlIC09IHdlaWdodDtcbiAgICAgICAgICAgIHdlaWdodCA9IHRoaXMuX3ZhbHVlICsgMTtcbiAgICAgICAgICAgIHF1ZXVlRW50cnkucmVzb2x2ZShbcHJldmlvdXNWYWx1ZSwgdGhpcy5fbmV3UmVsZWFzZXIocHJldmlvdXNXZWlnaHQpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZHJhaW5VbmxvY2tXYWl0ZXJzKCk7XG4gICAgfVxuICAgIF9uZXdSZWxlYXNlcih3ZWlnaHQpIHtcbiAgICAgICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIF9kcmFpblVubG9ja1dhaXRlcnMoKSB7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0uZm9yRWFjaCgod2FpdGVyKSA9PiB3YWl0ZXIoKSk7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciQxID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBNdXRleCB7XG4gICAgY29uc3RydWN0b3IoY2FuY2VsRXJyb3IpIHtcbiAgICAgICAgdGhpcy5fc2VtYXBob3JlID0gbmV3IFNlbWFwaG9yZSgxLCBjYW5jZWxFcnJvcik7XG4gICAgfVxuICAgIGFjcXVpcmUoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMSh0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFssIHJlbGVhc2VyXSA9IHlpZWxkIHRoaXMuX3NlbWFwaG9yZS5hY3F1aXJlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVsZWFzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5ydW5FeGNsdXNpdmUoKCkgPT4gY2FsbGJhY2soKSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUud2FpdEZvclVubG9jaygpO1xuICAgIH1cbiAgICByZWxlYXNlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCkpXG4gICAgICAgICAgICB0aGlzLl9zZW1hcGhvcmUucmVsZWFzZSgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuY2FuY2VsKCk7XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiB3aXRoVGltZW91dChzeW5jLCB0aW1lb3V0LCB0aW1lb3V0RXJyb3IgPSBFX1RJTUVPVVQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3F1aXJlOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHN5bmMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxlYXNlID0gQXJyYXkuaXNBcnJheSh0aWNrZXQpID8gdGlja2V0WzFdIDogdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRpY2tldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVsZWFzZSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGlja2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh0aWNrZXRbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGVhc2Uod2VpZ2h0KSB7XG4gICAgICAgICAgICBzeW5jLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN5bmMuY2FuY2VsKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhaXRGb3JVbmxvY2s6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHN5bmMud2FpdEZvclVubG9jayh3ZWlnaHQpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWplY3QodGltZW91dEVycm9yKSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMb2NrZWQ6ICgpID0+IHN5bmMuaXNMb2NrZWQoKSxcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHN5bmMuZ2V0VmFsdWUoKSxcbiAgICAgICAgc2V0VmFsdWU6ICh2YWx1ZSkgPT4gc3luYy5zZXRWYWx1ZSh2YWx1ZSksXG4gICAgfTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saXNuZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB0cnlBY3F1aXJlKHN5bmMsIGFscmVhZHlBY3F1aXJlZEVycm9yID0gRV9BTFJFQURZX0xPQ0tFRCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcmV0dXJuIHdpdGhUaW1lb3V0KHN5bmMsIDAsIGFscmVhZHlBY3F1aXJlZEVycm9yKTtcbn1cblxuZXhwb3J0IHsgRV9BTFJFQURZX0xPQ0tFRCwgRV9DQU5DRUxFRCwgRV9USU1FT1VULCBNdXRleCwgU2VtYXBob3JlLCB0cnlBY3F1aXJlLCB3aXRoVGltZW91dCB9O1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgYXBwbHlBY3Rpb25zIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXhcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbFwiO1xuaW1wb3J0IHtcbiAgYWRkVHJlYXRtZW50LFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGREYXRhTGlzdGVuZXIsXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBDSEFNUF9TS0lQX1JBVElPLFxuICBMQUJfU0tJUF9SQVRJTyxcbiAgTU9CSUxFX01FRElBX1FVRVJZLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBwcmVwYXJlQWN0aW9ucyxcbiAgY2hlY2tBY3Rpb25TZWxlY3RvcnMsXG4gIGRldGVybWluZVBjdCxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJvYm90RW5naW5lXCIpO1xuY29uc3QgT0JTRVJWRVJfQ09ORklHID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90RW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cywgZGVidWdNb2RlLCBtYXRjaGVkVHJlYXRtZW50cywgaWRlbnRpZmllciwgcGFnZVR5cGUsIGlzT24sIGlzQ2hhbXB9ID0gYm9keTtcbiAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIHRoaXMuaXNDaGFtcCA9IGlzQ2hhbXA7XG4gICAgdGhpcy5lbmdhZ2VtZW50TG9jayA9IHt9O1xuICAgIHRoaXMucGFnZVR5cGUgPSBwYWdlVHlwZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZTtcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICAgIHRoaXMucmVBcHBseVRyZWF0bWVudHNNYXAgPSB7fTtcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzID0gW107XG4gICAgdGhpcy5tYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cztcbiAgICB0aGlzLmlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3RzKCkge1xuICAgIGNvbnN0IHJvYm90UHJvbWlzZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnQpIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHJlYXRtZW50LmRlbGF5KSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgfSwgdHJlYXRtZW50LmRlbGF5KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBlbmdhZ2luZyByb2JvdCAke3RyZWF0bWVudC5pZH06ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChyb2JvdFByb21pc2VzKTtcbiAgICB0aGlzLmluaXRpYXRlUmVhcHBseVJvYm90TWFwKCk7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGFjdGlvbnMsXG4gICAgICBlbGlnaWJpbGl0eVJ1bGVTZXQsXG4gICAgICBkZXZpY2UsXG4gICAgICBidXNpbmVzc1J1bGVTZXQsXG4gICAgICBoZWxwZXJzLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIG1vZGUsXG4gICAgfSA9IHRyZWF0bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBkZWJ1Z01vZGUsXG4gICAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICAgIGVuZ2FnZW1lbnRMb2NrLFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIGlzTW9iaWxlLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBhcHBseSxcbiAgICB9ID0gdGhpcztcblxuICAgIC8vIG9uZSBlbmdhZ2VtZW50IGF0IGEgdGltZVxuICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGVuZ2FnZW1lbnRMb2NrW2lkXSB8fCBuZXcgTXV0ZXgoKTtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgZW5nYWdlbWVudExvY2tbaWRdLmFjcXVpcmUoKTtcbiAgICB0cnkge1xuICAgICAgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyAmJiAhZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwibW9iaWxlXCIgJiYgIWlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdtb2JpbGUnIG1pc21hdGNoXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZGV2aWNlID09PSBcImRlc2t0b3BcIiAmJiBpc01vYmlsZSkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnZGVza3RvcCcgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIGJhc2UgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZVNldCB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgICAgbGV0IGJ1c2luZXNzUnVsZUlkID0gbnVsbDtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0UHJvbWlzZSA9IGRldGVybWluZVBjdChpZCArIGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbcHJlcGFyZWRBY3Rpb25zLCB2YXJpYW50XSA9IGF3YWl0IHByZXBhcmVBY3Rpb25zKGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuXG4gICAgICAgIGxldCBpc0VsaWdpYmxlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgcHJlcGFyZWRBY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24uY29uZGl0aW9uKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgaWYgKGVsaWdpYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24uZWxpZ2libGVFbGVtZW50cyA9IGVsaWdpYmxlRWxlbWVudHM7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJlbGlnaWJsZVwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgcmFuZG9tUGN0UHJvbWlzZTtcbiAgICAgICAgY29uc3Qgc2tpcFJhdGlvID0gbW9kZSA9PT0gXCJsYWJcIiA/IExBQl9TS0lQX1JBVElPIDogQ0hBTVBfU0tJUF9SQVRJTztcbiAgICAgICAgaWYgKCFkZWJ1Z01vZGUgPiAwICYmXG4gICAgICAgICAgKCF0aGlzLmlzT24gfHxcbiAgICAgICAgICAobW9kZSA9PT0gXCJsYWJcIiAmJiB0aGlzLmlzQ2hhbXApIHx8XG4gICAgICAgICAgKG1vZGUgPT09IFwiY2hhbXBpb25cIiAmJiAhdGhpcy5pc0NoYW1wKSB8fFxuICAgICAgICAgIChyYW5kb21QY3QgPCBza2lwUmF0aW8pKSkge1xuICAgICAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiaWdub3JlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYXBwbHkoaWQsIHByZXBhcmVkQWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6XCIsIGlkKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmVsZWFzZSgpO1xuICAgICAgdGhpcy5hZGRSZWFwcGx5RXZlbnQodHJlYXRtZW50KTtcbiAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBlbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGVscGVycykgJiYgaGVscGVycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhlbHBlclJvYm90UHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICAgIGlmICghaGVscGVycy5pbmNsdWRlcyh0cmVhdG1lbnQuaWQpKSBjb250aW51ZTtcbiAgICAgICAgaGVscGVyUm9ib3RQcm9taXNlcy5wdXNoKHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChoZWxwZXJSb2JvdFByb21pc2VzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhcHBseShpZCwgcHJlcGFyZWRBY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgZGVwZW5kYW50X29uX3RyZWF0bWVudCkge1xuICAgIGxvZ2dlci5sb2coYENoZWNraW5nIGFjdGlvbiBzZWxlY3RvcnMgZm9yIHJvYm90ICR7aWR9YCk7XG4gICAgY29uc3QgY2hlY2sgPSBjaGVja0FjdGlvblNlbGVjdG9ycyhwcmVwYXJlZEFjdGlvbnMpO1xuICAgIGlmICghY2hlY2spIHtcbiAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKTtcbiAgICAgIGlmIChhcHBsaWVkICYmIGFwcGxpZWRbaWRdKSByZXR1cm47XG4gICAgICBsb2dnZXIubG9nKGBBY3Rpb24gc2VsZWN0b3IgY2hlY2sgZmFpbGVkIGZvciByb2JvdCAke2lkfWApO1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwcGx5QWN0aW9ucyhwcmVwYXJlZEFjdGlvbnMpO1xuICAgIGlmIChyZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGZhaWxlZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJmXCIpO1xuICAgICAgaWYgKGZhaWxlZFtpZF0pIHtcbiAgICAgICAgZGVsZXRlIGZhaWxlZFtpZF07XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZlwiLCBmYWlsZWQpO1xuICAgICAgfVxuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgIH0gZWxzZSBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpO1xuICAgICAgaWYgKGFwcGxpZWRbaWRdKSByZXR1cm47XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICB9XG4gIH1cblxuICBhZGRSZWFwcGx5RXZlbnQodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge3BhZ2VUeXBlLCByZUFwcGx5VHJlYXRtZW50c01hcH0gPSB0aGlzO1xuICAgIGNvbnN0IHtpZCwgcmVhcHBseV9ldmVudCwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGV9ID0gdHJlYXRtZW50O1xuICAgIGlmIChyZWFwcGx5X2V2ZW50KSB7XG4gICAgICBpZiAoIXJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIHx8IHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlID09PSBwYWdlVHlwZSkge1xuICAgICAgICBsZXQgcmVhcHBseV9ldmVudF9hcnJheSA9IHJlYXBwbHlfZXZlbnQ7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWFwcGx5X2V2ZW50KSkgcmVhcHBseV9ldmVudF9hcnJheSA9IFtyZWFwcGx5X2V2ZW50XTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgUmVhcHBseSBldmVudCAnJHtyZWFwcGx5X2V2ZW50fScgZm91bmQgZm9yIHRyZWF0bWVudDogJHtpZH1gKTtcbiAgICAgICAgZm9yIChjb25zdCByZWFwcGx5RXZlbnQgb2YgcmVhcHBseV9ldmVudF9hcnJheSkge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID9cbiAgICAgICAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gOiBbXTtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgYWxyZWFkeSBhZGRlZCBmb3IgcmVhcHBseSBldmVudFwiKTtcbiAgICAgICAgICB9IGVsc2UgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA9IFsuLi5wcmV2aW91c1ZhbHVlLCBpZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpIHtcbiAgICBjb25zdCB7cmVBcHBseVRyZWF0bWVudHNNYXAsIG1hdGNoZWRUcmVhdG1lbnRzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVBcHBseVRyZWF0bWVudHNNYXApKSB7XG4gICAgICBjb25zdCB0cmVhdG1lbnRJZHMgPSByZUFwcGx5VHJlYXRtZW50c01hcFtrZXldO1xuICAgICAgY29uc3QgcmVBcHBseVRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKHQpID0+IHRyZWF0bWVudElkcy5pbmNsdWRlcyh0LmlkKSk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiaW5maW5pdGVfc2Nyb2xsXCI6IHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW5maW5pdGVfc2Nyb2xsYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGltZW91dFwiOiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGltZW91dGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5U2VsZWN0b3JMaXN0ID0gQXJyYXkuaXNBcnJheSh0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvcikgP1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yIDogW3RyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcmVhcHBseVNlbGVjdG9yTGlzdCkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBlbGVtZW50X2NoYW5nZWApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25fc2Nyb2xsXCI6IHtcbiAgICAgICAgICAvLyBhZGQgd2luZG93IHNjcm9sbCBsaXN0ZW5lciwgY2FsbCBlbmdhZ2VSb2JvdCBvbiBzY3JvbGwsIGRvIG5vdCB0cmlnZ2VyIG1vcmUgdGhhbiBvbmNlIHBlciAyNTBtc1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRpbWUgPSAwO1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RTY3JvbGxUaW1lID4gMjUwICYmIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBzdCkgPiA1KSB7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIG9uX3Njcm9sbGApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicXVlcnlfc2VhcmNoX2NoYW5nZVwiOiB7XG4gICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICE9PSBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHF1ZXJ5X3NlYXJjaF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlcnZhbFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgaWYgKGFwcGxpZWQ/Llt0cmVhdG1lbnQuaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbnRlcnZhbGApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9fbGF5ZXJfY2hhbmdlXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgICAgICAgICBhZGREYXRhTGlzdGVuZXIodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJlYXBwbHkgZXZlbnQgbm90IGZvdW5kOiBcIiwga2V5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlU2V0ID0gW10sIGJ1c2luZXNzUnVsZVNldCA9IFtdLCBpZH0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMuaW5jbHVkZXMoaWQpKSByZXR1cm47XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKFsuLi5lbGlnaWJpbGl0eVJ1bGVTZXQsIC4uLmJ1c2luZXNzUnVsZVNldF0pO1xuICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihgX19lUnVsZXMuJHtzZWxlY3Rvcn1gLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgfVxuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMucHVzaChpZCk7XG4gIH1cblxuICBleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGVTZXQsIHByZXZpb3VzU2VsZWN0b3JzID0gbnVsbCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHByZXZpb3VzU2VsZWN0b3JzIHx8IFtdO1xuICAgIGZvciAobGV0IHJ1bGUgb2YgcnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChydWxlLnN0YXJ0c1dpdGgoXCIhXCIpKSBydWxlID0gcnVsZS5zbGljZSgxKTtcbiAgICAgICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zcGxpdChcIi5cIilbMF0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlLnNldCwgc2VsZWN0b3JzKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi4obmV3IFNldChzZWxlY3RvcnMpKV07XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSkge1xuICAgIGxvZ2dlci5sb2coYENoZWNraW5nIGVsaWdpYmlsaXR5ICR7ZWxpZ2liaWxpdHlSdWxlfWApO1xuICAgIGxldCBvcHBvc2l0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgW2VsaWdpYmlsaXR5U2NvcGUsIGVsaWdpYmlsaXR5TmFtZV0gPSBlbGlnaWJpbGl0eVJ1bGUuc3BsaXQoXCIuXCIpO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBvcHBvc2l0ZUZsYWcgPSB0cnVlO1xuICAgICAgZWxpZ2liaWxpdHlTY29wZSA9IGVsaWdpYmlsaXR5U2NvcGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGxldCByZXM7XG4gICAgaWYgKGVsaWdpYmlsaXR5U2NvcGUgPT09IFwiUGFnZVR5cGVcIikge1xuICAgICAgcmVzID0gW2F3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKV07XG4gICAgfSBlbHNlIHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7ZWxpZ2liaWxpdHlTY29wZX1gKTtcblxuICAgIGlmICghcmVzIHx8ICFBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob3Bwb3NpdGVGbGFnICYmIHJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFvcHBvc2l0ZUZsYWcgJiYgIXJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgbG9nZ2VyLmxvZyhgJHtlbGlnaWJpbGl0eVJ1bGV9IGlzIGVsaWdpYmxlYCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQsIGVsaWdpYmlsaXR5U2V0VHlwZSA9IG51bGwsIHByZXZpb3VzSXNFbGlnaWJsZSA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcm9ib3QgZWxpZ2liaWxpdHlcIik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVsaWdpYmlsaXR5IFJ1bGUgU2V0ICR7ZWxpZ2liaWxpdHlSdWxlU2V0fSBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGlzRWxpZ2libGUgPSBwcmV2aW91c0lzRWxpZ2libGU7XG4gICAgZm9yIChjb25zdCBlbGlnaWJpbGl0eVJ1bGUgb2YgZWxpZ2liaWxpdHlSdWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlICYmIGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gZWxpZ2liaWxpdHlTZXRUeXBlOiBcIiwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGUuc2V0LCBlbGlnaWJpbGl0eVJ1bGUudHlwZSwgaXNFbGlnaWJsZSk7XG4gICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNFbGlnaWJsZTtcbiAgfVxuXG4gIC8vIFJldHVybiBpbmRleCBvZiBidXNpbmVzc1J1bGUsIHRoaXMgaXMgdGhlIGJ1c2luZXNzUnVsZUlkXG4gIGFzeW5jIGNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgYnVzaW5lc3NSdWxlXSBvZiBidXNpbmVzc1J1bGVTZXQuZW50cmllcygpKSB7XG4gICAgICBpZiAoYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChbYnVzaW5lc3NSdWxlXSkpIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllckNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0RhdGFMYXllclJ1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIHdpdGggb3BlcmF0b3JcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBhd2FpdCBkYXRhTGF5ZXJGaW5kZXIob3BlcmF0b3IpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRhdGFMYXllckZpbmRlciA9IGFzeW5jIChrZXkpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIlNlYXJjaGluZyBiZWFnbGVJbmZvTGF5ZXIgZm9yIGtleSBcIiwga2V5KTtcbiAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICBpZiAocmVzICE9PSBudWxsICYmIHJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoYEZvdW5kIGtleSAke2tleX0gd2l0aCB2YWx1ZSAke3Jlc31gKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGxvZ2dlci5mYWlsZWQoYEtleSAke2tleX0gbm90IGZvdW5kIGluIGJlYWdsZUluZm9MYXllcmApO1xuICByZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRWxlbWVudENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VsZW1lbnRSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igc2VsZWN0b3JcIiwgcnVsZS5zZWxlY3RvciB8fCBydWxlLnNlbGVjdG9yQWxsKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlLCBzZWxlY3Rvciwgc2VsZWN0b3JBbGwsIHNlbGVjdG9yRmFsbGJhY2sgPSBudWxsfSA9IHJ1bGU7XG4gIGxldCBtYWluU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBtYWluU2VsZWN0b3IgPSBzZWxlY3RvckZhbGxiYWNrID8gc2VsZWN0b3JGYWxsYmFjayA6IG1haW5TZWxlY3RvcjtcbiAgfVxuXG4gIGlmIChvcGVyYXRvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgfVxuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHNlbGVjdG9yQWxsICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCBlbGVtZW50O1xuICBpZiAobWFpblNlbGVjdG9yKSBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3Rvcik7XG4gIGVsc2UgaWYgKHNlbGVjdG9yQWxsKSBlbGVtZW50ID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRleHQtbnVtYmVyXCI6IHtcbiAgICAgIGxldCB0ZW1wVmFsO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgdGVtcFZhbCA9IGVsZW1lbnQucmVkdWNlKChyZXR1cm5WYWwsIGVsZW0pID0+IHtcbiAgICAgICAgICByZXR1cm5WYWwgKz0gcGFyc2VJbnQoZWxlbS50ZXh0Q29udGVudC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFZhbCA9IHBhcnNlSW50KHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLnRleHRDb250ZW50XG4gICAgICAgICAgICAucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHBhcnNlSW50KHRlbXBWYWwpO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcImNsYXNzTGlzdFwiOlxuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJjb3VudFwiOiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiBlbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudC5sZW5ndGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDEsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgXCJzdHlsZVwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN0eWxlS2V5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN0eWxlVmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudFN0eWxlc1tzdHlsZUtleV07XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgc3R5bGVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiT3BlcmF0b3Igbm90IGRlZmluZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRnVuY3Rpb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tGdW5jdGlvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBmdW5jdGlvbiBydWxlXCIpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgaWYgKCFvcGVyYXRvcikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJSdWxlIGZ1bmN0aW9uIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBydWxlRnVuY3Rpb24gPSBGdW5jdGlvbihvcGVyYXRvcik7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IHJ1bGVGdW5jdGlvbigpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVTZXNzaW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrU2Vzc2lvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBvcGVyYXRvclwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZHVyYXRpb25cIjpcbiAgICAgIHJldHVybiBkdXJhdGlvbkhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImhpc3RvcnlcIjpcbiAgICAgIHJldHVybiBoaXN0b3J5SGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlc3Npb25UaW1lc3RhbXAgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fVElNRVNUQU1QKSkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBzZXNzaW9uIHRpbWVzdGFtcFwiLCBlcnIpO1xuICAgIHJldHVybiBEYXRlLm5vdygpO1xuICB9XG59O1xuXG5jb25zdCBkdXJhdGlvbkhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBkdXJhdGlvbiA9IChEYXRlLm5vdygpIC0gZ2V0U2Vzc2lvblRpbWVzdGFtcCgpKSAvIDEwMDA7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGR1cmF0aW9uLCBjb25kaXRpb24sIHBhcnNlSW50KHZhbHVlKSk7XG59O1xuXG5jb25zdCBoaXN0b3J5SGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRIaXN0b3J5ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9ISVNUT1JZKT8uc3BsaXQoXCIsXCIpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihjdXJyZW50SGlzdG9yeSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVVybENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1VybFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBvcGVyYXRvclwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJwYXRoXCI6IHtcbiAgICAgIGNvbnN0IHJlcXVlc3RVUkw9IHdpbmRvdy50b3AubG9jYXRpb24uaHJlZjtcbiAgICAgIGNvbnN0IHBhdGggPSBuZXcgVVJMKHJlcXVlc3RVUkwpLnBhdGhuYW1lO1xuICAgICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgcGF0aCAke3BhdGh9IG1hdGNoZXMgcnVsZSBwYXRoICR7dmFsdWV9YCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihwYXRoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3I6IFwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkZXZpY2VfdHlwZVwiOiB7XG4gICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcyA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGlzTW9iaWxlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgbGV0IHNrdTtcbiAgaWYgKHBhZ2VUeXBlID09PSBcIlBEUFwiKSB7XG4gICAgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgaWYgKCFza3UpIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBpZiAoIXNrdUxpc3QgfHwgKHR5cGVvZiBza3VMaXN0ID09PSBcIm9iamVjdFwiICYmICFPYmplY3Qua2V5cyhza3VMaXN0KS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG4gICAgc2t1ID0gc2t1TGlzdFtPYmplY3Qua2V5cyhza3VMaXN0KVswXV07XG4gIH1cbiAgbGV0IHJ1bnRpbWVWYWx1ZSA9IG51bGw7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwic2FsZUNudFZpc2l0b3JzSW4xNVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBUcmFuc2FjdGlvbkNvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUcmFuc2FjdGlvbkNvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImNhcnRDbnRWaXNpdG9yc0luMTVcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgQWRkVG9DYXJ0Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldEFkZFRvQ2FydENvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInZpZXdDbnRWaXNpdG9yc0luMVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBwcm9kdWN0Vmlld0NvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRQcmV2aWV3Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiaGFzVGl0bGVcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgdGl0bGUgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFRpdGxlKHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImhhc0Rlc2NyaXB0aW9uXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIGRlc2NyaXB0aW9uIGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXREZXNjcmlwdGlvbihza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbkNvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRQcmV2aWV3Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEZyb21EQiA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgZGIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICByZXR1cm4gYXdhaXQgZGIuZ2V0KHNrdSk7XG59O1xuXG5jb25zdCBnZXRUaXRsZSA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby50aXRsZUF1Z21lbnQgfHwgXCJcIjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGdldERlc2NyaXB0aW9uID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLm1hcmtldGluZ0NvcHkgfHwgXCJcIjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRG9jdW1lbnRDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tEb2N1bWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBvcGVyYXRvcjogXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBpZiAob3BlcmF0b3IgPT09IFwidmlzaWJpbGl0eWNoYW5nZVwiKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LmRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NoZWNrRGF0YUxheWVyUnVsZX0gZnJvbSBcIi4vZGF0YUxheWVyQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VsZW1lbnRSdWxlfSBmcm9tIFwiLi9lbGVtZW50Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0Z1bmN0aW9uUnVsZX0gZnJvbSBcIi4vZnVuY3Rpb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrU2Vzc2lvblJ1bGV9IGZyb20gXCIuL3Nlc3Npb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrVXJsUnVsZX0gZnJvbSBcIi4vdXJsQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VudlJ1bGV9IGZyb20gXCIuL2VudkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tQcm9kdWN0SW5mb1J1bGV9IGZyb20gXCIuL3Byb2R1Y3RJbmZvQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0RvY3VtZW50UnVsZX0gZnJvbSBcIi4vZG9jdW1lbnRDaGVja2VyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7YWRkRGF0YUxpc3RlbmVyLCBhZGRUb0JlYWdsZUluZm9MYXllciwgZ2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtNdXRleH0gZnJvbSBcImFzeW5jLW11dGV4XCI7XG5pbXBvcnQge2ZldGNoRWxpZ2liaWxpdHlSdWxlc30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLm11dGV4ID0gbmV3IE11dGV4KCk7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY3VtZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja0RvY3VtZW50UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKGBObyBzdWNoIHJ1bGUgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY2hhaW4pIHtcbiAgICAgIHN3aXRjaCAoY2hhaW5fY29uZGl0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAmJiBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkIHx8IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICE9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBjaGFpbiBjb25kaXRpb25cIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydWxlU2F0aXNmaWVkID8gcnVsZS5uYW1lIHx8IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIGFzc2Vzc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKSB7XG4gICAgaWYgKCFrZXkgfHwgIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgdGhpcy5tdXRleC5hY3F1aXJlKCk7XG4gICAgbG9nZ2VyLmxvZyhgTG9jayBhY3F1aXJlZCBmb3Iga2V5ICR7a2V5fWApO1xuICAgIGxldCBlbGlnaWJsZVJ1bGVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCkgfHwgW107XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBjb25zdCBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICAgIGlmIChpc0VsaWdpYmxlKSB7XG4gICAgICAgICAgaWYgKGVsaWdpYmxlUnVsZXMuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgZWxpZ2libGVSdWxlcy5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFlbGlnaWJsZVJ1bGVzLmluY2x1ZGVzKHJ1bGUubmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGVsaWdpYmxlUnVsZXMgPSBlbGlnaWJsZVJ1bGVzLmZpbHRlcigocm4pID0+IHJuICE9PSBydWxlLm5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgZWxpZ2libGVSdWxlcyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBhc3Nlc3NpbmcgcnVsZXMgZm9yIGtleTogJHtrZXl9IC0gJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgbG9nZ2VyLmxvZyhgUmVsZWFzaW5nIGxvY2sgZm9yIGtleTogJHtrZXl9YCk7XG4gICAgICByZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW5pdGlhbGl6ZUxpc3RlbmVycygpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlc30gPSB0aGlzO1xuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGVsaWdpYmlsaXR5UnVsZXMpKSB7XG4gICAgICB0aGlzLnNldFVwTGlzdGVuZXJzKGtleSwgcnVsZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldFVwTGlzdGVuZXJzKGtleSwgcnVsZXMpIHtcbiAgICBjb25zdCB7ZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlcywgcHJvZHVjdEluZm9SdWxlc30gPSB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcyk7XG4gICAgZm9yIChjb25zdCBbb3BlcmF0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhkYXRhTGF5ZXJSdWxlcykpIHtcbiAgICAgIGNvbnN0IGJvdW5kQXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2suYmluZCh0aGlzLCBrZXksIHJ1bGVzKTtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihvcGVyYXRvciwgYm91bmRBc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2spO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGVsZW1lbnRSdWxlcykpIHtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uTGlzdCkgPT4ge1xuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvblJlY29yZCBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICBub2RlcyA9IFsuLi5ub2RlcywgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5yZW1vdmVkTm9kZXMpXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBleGNsdWRlIG11dGF0aW9ucyB0aGF0IG9ubHkgdXBkYXRlIHRleHRcbiAgICAgICAgaWYgKG5vZGVzLmV2ZXJ5KChuKSA9PiBuLnRhZ05hbWUgPT09IHVuZGVmaW5lZCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5hc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcyk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gXCJib2R5XCIpIHtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmJvZHksIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9O1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikucGFyZW50Tm9kZSwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBbLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMocHJvZHVjdEluZm9SdWxlcykpIHtcbiAgICAgIGNvbnN0IGJvdW5kQXNzZXNzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2suYmluZCh0aGlzLCBrZXksIHJ1bGVzKTtcbiAgICAgIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGRiLmNoZWNrSW5pdGlhbGl6ZWQoYm91bmRBc3Nlc3NFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2spO1xuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcywgZGF0YUxheWVyUnVsZXMgPSB7fSwgZWxlbWVudFJ1bGVzID0ge30sIHByb2R1Y3RJbmZvUnVsZXMgPSB7fSwgYmFzZVJ1bGUgPSBudWxsKSB7XG4gICAgaWYgKCFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICBjb25zdCB7dHlwZX0gPSBydWxlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgICBpZiAoIWRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdKSB7XG4gICAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXS5wdXNoKGJhc2VSdWxlIHx8IHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJ1bGUuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0gPSBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSwgYmFzZVJ1bGUgfHwgcnVsZV0gOiBbYmFzZVJ1bGUgfHwgcnVsZV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocnVsZS5zZWxlY3RvckFsbCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0gPSBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSwgYmFzZVJ1bGUgfHwgcnVsZV0gOiBbYmFzZVJ1bGUgfHwgcnVsZV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFJ1bGVzW1wiYm9keVwiXSA9IGVsZW1lbnRSdWxlc1tcImJvZHlcIl0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tcImJvZHlcIl0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgICBpZiAoIXByb2R1Y3RJbmZvUnVsZXMuYWxsKSB7XG4gICAgICAgICAgICBwcm9kdWN0SW5mb1J1bGVzLmFsbCA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9kdWN0SW5mb1J1bGVzLmFsbC5wdXNoKGJhc2VSdWxlIHx8IHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHJ1bGUuY2hhaW4pIHtcbiAgICAgICAgdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMoW3J1bGUuY2hhaW5dLCBkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzLCBwcm9kdWN0SW5mb1J1bGVzLCBiYXNlUnVsZSB8fCBydWxlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzLCBwcm9kdWN0SW5mb1J1bGVzfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZWxpZ2liaWxpdHlSdWxlc09iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMpO1xuICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXNPYmopIHtcbiAgICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IEpTT04ucGFyc2UoZWxpZ2liaWxpdHlSdWxlc09iaik7XG4gICAgICAgIGlmIChlbGlnaWJpbGl0eVJ1bGVzT2JqLnRpbWVzdGFtcCkge1xuICAgICAgICAgIGNvbnN0IGVsYXBzZWRIb3VycyA9IChEYXRlLm5vdygpIC0gZWxpZ2liaWxpdHlSdWxlc09iai50aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgICAgICBpZiAoZWxhcHNlZEhvdXJzIDwgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMpIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzT2JqLnJ1bGVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gYXdhaXQgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gICAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXNPYmopIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0ge3J1bGVzOiBlbGlnaWJpbGl0eVJ1bGVzT2JqLCB0aW1lc3RhbXA6IERhdGUubm93KCl9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUywgSlNPTi5zdHJpbmdpZnkoZWxpZ2liaWxpdHlSdWxlc09iaikpO1xuICAgICAgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXNPYmoucnVsZXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBlbGlnaWJpbGl0eSBydWxlczogXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiU2VnbWVudGF0aW9uQ29tcHV0ZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gIGxvZ2dlci5sb2coXCJEZXRlcm1pbmluZyB1c2VyIHNlZ21lbnRcIik7XG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgICBjb25zdCBydWxlU2V0ID0gdHJlYXRtZW50V2VpZ2h0c1tzZWdtZW50XT8ucnVsZVNldDtcbiAgICAgIGlmICghcnVsZVNldCkgY29udGludWU7XG4gICAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXX0pO1xuICAgICAgaWYgKGF3YWl0IHNlZ21lbnRSdWxlRW5naW5lLmNoZWNrUnVsZXMoKSkge1xuICAgICAgICBsb2dnZXIubG9nKGBVc2VyIHNlZ21lbnQgbWF0Y2hlZDogJHtzZWdtZW50fWApO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgc2VnbWVudCk7XG4gICAgICAgIHJldHVybiBzZWdtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIubG9nKFwiVXNlciBzZWdtZW50IG5vdCBtYXRjaGVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNvbXB1dGUgdXNlciBzZWdtZW50XCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2ZldGNoVHJlYXRtZW50cywgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiKTtcblxuY2xhc3MgVHJlYXRtZW50UmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0cywgdXNlclNlZ21lbnR9ID0gYm9keTtcbiAgICB0aGlzLnRyZWF0bWVudHMgPSB0cmVhdG1lbnRzO1xuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gICAgdGhpcy5jdXJyZW50UGFnZVR5cGUgPSBudWxsO1xuICAgIHRoaXMudXNlclNlZ21lbnQgPSB1c2VyU2VnbWVudDtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRzKCkge1xuICAgIGxvZ2dlci5sb2coXCJMb2FkaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3Qge1RSRUFUTUVOVFN9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShUUkVBVE1FTlRTKSk7XG4gICAgbGV0IHRyZWF0bWVudHMgPSB0cmVhdG1lbnRzT2JqPy50cmVhdG1lbnRzO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyZWF0bWVudHNPYmo/LnRpbWVzdGFtcDtcbiAgICBpZiAoIXRyZWF0bWVudHMgfHwgIXRpbWVzdGFtcCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgIH07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgaWYgKGVsYXBzZWRIb3VycyA+IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIGFyZSBleHBpcmVkXCIpO1xuICAgICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJUcmVhdG1lbnRzIGFyZSBsb2FkZWQgZnJvbSBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudFdlaWdodHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWlnaHRzT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5XRUlHSFRTKTtcbiAgICAgIGlmICh3ZWlnaHRzT2JqKSB7XG4gICAgICAgIHdlaWdodHNPYmogPSBKU09OLnBhcnNlKHdlaWdodHNPYmopO1xuICAgICAgICBpZiAod2VpZ2h0c09iai50aW1lc3RhbXApIHtcbiAgICAgICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHdlaWdodHNPYmoudGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICAgICAgaWYgKGVsYXBzZWRIb3VycyA8IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSByZXR1cm4gd2VpZ2h0c09iai53ZWlnaHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzKCk7XG4gICAgICBpZiAoIXdlaWdodHNPYmopIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB3ZWlnaHRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHdlaWdodHNPYmogPSB7d2VpZ2h0czogd2VpZ2h0c09iaiwgdGltZXN0YW1wOiBEYXRlLm5vdygpfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUywgSlNPTi5zdHJpbmdpZnkod2VpZ2h0c09iaikpO1xuICAgICAgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSkge1xuICAgIGNvbnN0IHtNQVRDSEVEX1RSRUFUTUVOVFN9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgY29uc3QgQ1BUID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgICAgaWYgKCFDUFQpIHJldHVybiBbXTtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2VUeXBlID0gQ1BUO1xuICAgIH1cbiAgICBsZXQgbWF0Y2hlZFRyZWF0bWVudHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShNQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgIGlmIChtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubWF0Y2hCeVBhZ2VUeXBlKG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICB9XG4gICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBbXTtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0cywgdXNlclNlZ21lbnR9ID0gdGhpcztcbiAgICBpZiAoIXVzZXJTZWdtZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlclNlZ21lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0c1t1c2VyU2VnbWVudF07XG4gICAgICBpZiAoIXVzZXJTZWdtZW50V2VpZ2h0cykgcmV0dXJuIFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICBjb25zdCB7aWQsIGFjdGlvbnMsIGhlbHBlcnN9ID0gdHJlYXRtZW50O1xuICAgICAgICBjb25zdCBtb2RlID0gdXNlclNlZ21lbnRXZWlnaHRzW2lkXT8ubW9kZTtcbiAgICAgICAgaWYgKCFtb2RlICYmIGRlYnVnTW9kZSAhPT0gMSkgY29udGludWU7XG4gICAgICAgIGlmIChoZWxwZXJzICYmIEFycmF5LmlzQXJyYXkoaGVscGVycykpIHtcbiAgICAgICAgICBoZWxwZXJzLmZvckVhY2goKGgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlbHBlciA9IHRyZWF0bWVudHMuZmluZCgodCkgPT4gdC5pZCA9PT0gaCk7XG4gICAgICAgICAgICBpZiAoaGVscGVyKSB7XG4gICAgICAgICAgICAgIGhlbHBlci5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaChoZWxwZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRXZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbaWRdPy52YXJpYW50cz8uW3ZhcmlhbnRLZXldO1xuICAgICAgICAgICAgaWYgKHZhcmlhbnRXZWlnaHQpIHtcbiAgICAgICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IHZhcmlhbnRXZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyZWF0bWVudC5tb2RlID0gbW9kZTtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaCh0cmVhdG1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBtYXRjaGVkVHJlYXRtZW50c1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShNQVRDSEVEX1RSRUFUTUVOVFMsIG1hdGNoZWRUcmVhdG1lbnRzU3RyaW5nKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tYXRjaEJ5UGFnZVR5cGUobWF0Y2hlZFRyZWF0bWVudHNTdHJpbmcpO1xuICB9XG5cbiAgYXN5bmMgbWF0Y2hCeVBhZ2VUeXBlKG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgSlNPTi5wYXJzZShtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigobXQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQYWdlVHlwZShtdC5wYWdlVHlwZXMpO1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIubG9nKGAke21hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIHNlZ21lbnQgbWF0Y2hlZGApO1xuICAgICAgcmV0dXJuIG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgbWF0Y2hlZCByb2JvdHM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBjaGVja1BhZ2VUeXBlKHBhZ2VUeXBlcykge1xuICAgIGNvbnN0IHtjdXJyZW50UGFnZVR5cGV9ID0gdGhpcztcbiAgICBpZiAocGFnZVR5cGVzID09PSBudWxsIHx8IHBhZ2VUeXBlcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFnZVR5cGVzKSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlBhZ2UgVHlwZXMgc2hvdWxkIGJlIGFuIGFycmF5XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAocGFnZVR5cGVzWzBdLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBwYWdlVHlwZXMgPSBwYWdlVHlwZXMubWFwKChwdCkgPT4gcHQuc3Vic3RyKDEpKTtcbiAgICAgIHJldHVybiAhcGFnZVR5cGVzLmluY2x1ZGVzKGN1cnJlbnRQYWdlVHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBwYWdlVHlwZXMuaW5jbHVkZXMoY3VycmVudFBhZ2VUeXBlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgQmVhY29uIGZyb20gXCIuLi9HbG92QmVhY29uXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4uL0dsb3ZSb2JvdEVuZ2luZVwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIHN0YXJ0SW5mb0xheWVyU2Nhbixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTEFCX1JBVElPLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBzZXRVUkxEYXRhLFxuICBzZXRCcm93c2VyRGF0YSxcbiAgc2V0QWdlbnREZXRhaWxzLFxuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxuICBzd2l0Y2hUb0Vhc2VPdXQsXG4gIGNoZWNrVmVyc2lvbixcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5sZXQgYW5hbHl0aWNzTGFiZWwgPSBudWxsO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIHN3aXRjaFRvRWFzZU91dCgpO1xuICBjaGVja1ZlcnNpb24oKTtcbiAgbGV0IGJlYWNvbiA9IG51bGw7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgaW5pdGlhbGl6aW5nXCIpO1xuICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbiAgbGV0IGlzT24gPSBudWxsO1xuICBsZXQgaXNDaGFtcCA9IG51bGw7XG5cbiAgdHJ5IHtcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQ1JJVElDQUwgSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24taW5pdFwiKTtcbiAgICBzZXRVUkxEYXRhKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIsIERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidlwiLCBWRVJTSU9OKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNyXCIsIFNQTElUX1JBVElPKTtcblxuICAgIGJlYWNvbiA9IG5ldyBCZWFjb24oKTtcbiAgICAvLyBkYXRhLWxlc3MgbG9nIHRvIGRldGVjdCBib3VuY2VzXG4gICAgYXdhaXQgYmVhY29uLnBhY2tBbmRRdWV1ZUFycml2YWxMb2coKTtcblxuICAgIC8vIFNMQTogMiBzZWNvbmRzIHRvIGZsaWNrZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIH0sIDIwMDApO1xuXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24tY3JpdGljYWwtZW50cnlcIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFkgUFJVTkUgT1VULU9GLVNDT1BFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gdGVzdCBjb29raWUsIGJlYWNvbiwgYW5kIHN0cmluZyB1dGlscyBzdXBwb3J0XG4gICAgLy8gVE9ETzogdXNlIHByb3BlciBmZWF0dXJlIGRldGVjdGlvbiBpbnN0ZWFkIG9mIGRlcGVuZGluZyBvbiBhZ2VudCBzdHJpbmdcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5tYXRjaCAhPT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICBwcm9jZXNzVW5zdXBwb3J0ZWQoKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiB1c2VyQWdlbnQgY2FuIGJlIHByb3Blcmx5IHBhcnNlZFxuICAgIGNvbnN0IHN0YXR1cyA9IHNldEFnZW50RGV0YWlscygpO1xuICAgIC8vIGlmIGFnZW50IGNhbm5vdCBiZSBwYXJzZWQsIGRvIGVhcmx5IGJyZWFrXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIHByb2Nlc3NVbnN1cHBvcnRlZCgpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBU1lOQyBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuICAgIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gcGVyc2lzdFByb2R1Y3RJbmZvKCk7XG5cbiAgICBzZXRCcm93c2VyRGF0YSgpO1xuICAgIGF3YWl0IHNldFVwRWxpZ2liaWxpdHlSdWxlTGlzdGVuZXJzKCk7XG4gICAgc3RhcnRJbmZvTGF5ZXJTY2FuKCk7XG5cbiAgICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gICAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMoKTtcblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWFzeW5jLWluaXRcIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gUE9TVCBPT1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHBlcm1hbmVudCB1bnNlZ21lbnRlZC1vb3MgYWZ0ZXIgT0ZGIGVsaWdpYmlsaXR5IGlzIGZpeGVkXG5cbiAgICAvLyBhdHRlbXB0IHRvIGNvbXB1dGUgdXNlciBzZWdtZW50XG4gICAgbGV0IHVzZXJTZWdtZW50ID0gbnVsbDtcbiAgICBsZXQgdHJlYXRtZW50V2VpZ2h0cyA9IG51bGw7XG5cbiAgICB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2U7XG4gICAgaWYgKCF0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb21wdXRlIHVzZXIgc2VnbWVudCBhbmQgYWRkIHRvIGJlYWdsZUluZm9MYXllclxuICAgICAgdXNlclNlZ21lbnQgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZXJTZWdtZW50KSB7XG4gICAgICBwcm9jZXNzVW5zdXBwb3J0ZWQoKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBRE1JTiBVU0VSIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cblxuICAgIGxldCBpc0FkbWluID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTik7XG4gICAgLy8gaWYgbm90IGZvdW5kIGluIGxvY2FsU3RvcmFnZSwgY2hlY2sgYmVhZ2xlSW5mb0xheWVyIHdpdGggYmxvY2tpbmcgbW9kZVxuICAgIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNBZG1pbiA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgICAgLy8gcGVybWFuZW50IGxhYmVsIGNhbiBiZSBmYWxzZSwgYnV0IGFkbWluIHVzZXIgY2FuIHN0aWxsIGxvZ2luIGFuZCB0dXJuIHRydWUsIGxhemlseSBmaXggdGhpc1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gXCJmYWxzZVwiIHx8IGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gICAgICAvLyBhc3luYyBjYWxsIHRvIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIHRoZW4gc2V0IGxvY2FsU3RvcmFnZVxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSkudGhlbigoaXNBZG1pbikgPT4ge1xuICAgICAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWFkbWluLXN0YXR1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1lYXNlXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnRpLWZsaWNrZXItdGltZW91dFwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IE9OL09GRiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gY2hhbXBpb24gaXMgYWJvdmUgU1BMSVRfUkFUSU8gcGx1cyBMQUJfUkFUSU9cbiAgICBpc0NoYW1wID0gY29va2llUGN0ID49IFNQTElUX1JBVElPICogKDEgKyBMQUJfUkFUSU8gLyAxMDApO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWcgbW9kZSBpcyBvbiwgYWxzbyBhZGRzIGRibSB0byBiZWFnbGVJbmZvTGF5ZXIgYW5kIHNldHMgb29zUmVhc29uXG4gICAgY29uc3QgZGVidWdNb2RlID0gZ2V0RGVidWdNb2RlKCk7XG4gICAgY29uc3QgaXNFbXBsb3llZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfRU1QTE9ZRUUpO1xuXG4gICAgaWYgKGRlYnVnTW9kZSA+IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgYW5hbHl0aWNzTGFiZWwgPSBcImVtcGxveWVlXCI7XG4gICAgfSBlbHNlIGlmIChkZWJ1Z01vZGUgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZWJ1Zy1za2lwLXJvYm90c1wiKTtcbiAgICB9IGVsc2UgaWYgKGlzRW1wbG95ZWUgPT09IFwidHJ1ZVwiIHx8IGlzRW1wbG95ZWUgPT09IHRydWUpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICBhbmFseXRpY3NMYWJlbCA9IFwiZW1wbG95ZWVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIFNQTElUX1JBVElPLCB0aGVuIGluIE9OIG1vZGVcbiAgICAgIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8pIHtcbiAgICAgICAgaXNPbiA9IHRydWU7XG4gICAgICAgIGFuYWx5dGljc0xhYmVsID0gXCJ0cnVlXCI7XG4gICAgICB9IGVsc2UgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTyAvIDIpIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICBhbmFseXRpY3NMYWJlbCA9IFwiZmFsc2UyXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIGFuYWx5dGljc0xhYmVsID0gXCJmYWxzZTFcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFktUFJPQ0VTUyBDT05WRVJTSU9OID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gYXdhaXQgY3JpdGljYWwgaW5mbyBiZWZvcmUgc2VuZGluZyBsb2dzIGZvciBwcm9wZXIgYW5hbHl0aWNzIG1lYXN1cmVtZW50c1xuICAgIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIGlmIChwYWdlVHlwZSA9PT0gXCJQdXJjaGFzZVwiKSB7XG4gICAgICAvLyB3YWl0IHVudGlsIGNyaXRpY2FsIGRhdGEgaXMgc2NyYXBwZWRcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwib2stc2tpcC1yb2JvdHNcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFJPQk9UIFBBVEhzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJlbnRlcmluZy1yb2JvdC1wYXRoXCIpO1xuXG4gICAgaWYgKGlzT24gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWlzT25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICBsZXQgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBudWxsO1xuICAgIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBzZWFyY2hQYXJhbXMuc2xpY2UoXG4gICAgICAgICAgc2VhcmNoUGFyYW1zLmluZGV4T2YoXCJbXCIpICsgMSxcbiAgICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICAgKS5zcGxpdChcIixcIikubWFwKChpdGVtKSA9PiBwYXJzZUludChpdGVtLCAxMCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRzUHJvbWlzZTtcblxuICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcm9ib3Qtd2VpZ2h0c1wiKTtcbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJGb3VuZCB0cmVhdG1lbnRzOiBcIiwgdHJlYXRtZW50cyk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gICAgY29uc3QgdHJlYXRtZW50UmVwb3NpdG9yeSA9IG5ldyBUcmVhdG1lbnRSZXBvc2l0b3J5KHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzLCB1c2VyU2VnbWVudH0pO1xuXG4gICAgY29uc3QgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRSZXBvc2l0b3J5LmdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSk7XG4gICAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1zZWdtZW50LWluLWNvbmZpZ1wiKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvZHVjdEluZm9Qcm9taXNlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZHVjdC1pbmZvLW5vLXBlcnNpc3RcIik7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBpbmZvLXBlcnNpc3RlZFwiKTtcblxuICAgIGlmICghbWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvay1uby1tYXRjaGluZy1yb2JvdHNcIik7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZvdW5kLW1hdGNoZWQtcm9ib3RzXCIpO1xuXG4gICAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBkZWJ1Z01vZGUsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBwYWdlVHlwZSxcbiAgICAgIGlzT24sXG4gICAgICBpc0NoYW1wLFxuICAgIH0pO1xuICAgIGF3YWl0IHJvYm90RW5naW5lLmVuZ2FnZVJvYm90cygpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9rLXJvYm90cy1lbmdhZ2VkXCIpO1xuICAgIGxvZ2dlci5zdWNjZXNzKFwiQXBwbGllZCB0cmVhdG1lbnRzOiBcIiwgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIikpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcIkVudHJ5cG9pbnQgY2F0Y2g6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIGVyci5tZXNzYWdlKTtcbiAgfSBmaW5hbGx5IHtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICBpZiAoaXNPbiAhPT0gbnVsbCkgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJpc09uXCIsIGlzT24pO1xuICAgIGlmIChpc09uICE9PSBudWxsICYmIGlzQ2hhbXAgIT09IG51bGwpIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNDaGFtcFwiLCAoaXNPbiAmJiBpc0NoYW1wKSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGFuYWx5dGljc0xhYmVsKTtcbiAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogYW5hbHl0aWNzTGFiZWx9KTtcbiAgICBhd2FpdCBiZWFjb24ucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICB9XG59KSgpO1xuXG5hc3luYyBmdW5jdGlvbiBzZXRVcEVsaWdpYmlsaXR5UnVsZUxpc3RlbmVycygpIHtcbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IFJ1bGVFbmdpbmUuZ2V0RWxpZ2liaWxpdHlSdWxlcygpO1xuICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHJldHVybjtcbiAgY29uc3QgcnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtlbGlnaWJpbGl0eVJ1bGVzfSk7XG4gIGF3YWl0IHJ1bGVFbmdpbmUuaW5pdGlhbGl6ZUxpc3RlbmVycygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwZXJzaXN0UHJvZHVjdEluZm8oKSB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvREIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICBhd2FpdCBwcm9kdWN0SW5mb0RCLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzVW5zdXBwb3J0ZWQoKSB7XG4gIGFuYWx5dGljc0xhYmVsID0gXCJ1bnN1cHBvcnRlZFwiO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZC1kZXZpY2VcIik7XG59XG5cbi8vIGlmIGFkbWluIHVzZXIsIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCBtYXJrIGFzIGVtcGxveWVlXG5mdW5jdGlvbiBwcm9jZXNzQWRtaW5Vc2VyKCkge1xuICBhbmFseXRpY3NMYWJlbCA9IFwiZW1wbG95ZWVcIjtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgdHJ1ZSk7XG4gIHRocm93IG5ldyBFcnJvcihcImFkbWluLWVtcGxveWVlXCIpO1xufVxuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJWRVJTSU9OIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIkxBQl9SQVRJTyIsIkNIQU1QX1NLSVBfUkFUSU8iLCJMQUJfU0tJUF9SQVRJTyIsIkxPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlBPUFVQX0RJU1BMQVlfRkxBRyIsIlNLVV9JTkZPX0JBU0tFVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJNQVRDSEVEX1RSRUFUTUVOVFMiLCJMT0NBTF9TVE9SQUdFX0tFWVMiLCJUUkVBVE1FTlRTIiwiV0VJR0hUUyIsIkVMSUdJQklMSVRZX1JVTEVTIiwiREVCVUdfTU9ERSIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiSVNfQURNSU4iLCJJU19FTVBMT1lFRSIsIkNVU1RPTV9TVE9SQUdFX1BSRUZJWCIsIkxvZ2dlciIsIm9yaWdpbiIsInRlc3RpbmciLCJERUJVRyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcmdzIiwiY29uc29sZSIsImluZm8iLCJsb2ciLCJtZXNzYWdlQ29uZmlnIiwiZm9yRWFjaCIsImFyZ3VtZW50IiwidHlwZSIsIndhcm4iLCJlcnJvciIsImFkZFRvQmVhZ2xlSW5mb0xheWVyIiwibG9nZ2VyIiwibW9udGhzIiwicmVtb3ZlRG9jdW1lbnRIaWRlIiwidG9wIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzd2l0Y2hUb0Vhc2VPdXQiLCJjb250YWlucyIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwicHJlcGVuZCIsImFkZCIsImZldGNoVHJlYXRtZW50cyIsImZldGNoUGx1cyIsInRyZWF0bWVudHMiLCJFcnJvciIsImpzb24iLCJqc29uVHJlYXRtZW50IiwiZmFpbGVkIiwibWVzc2FnZSIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsImZldGNoUHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvSnNvbiIsInRpbWVvdXQiLCJ0aW1lIiwiY29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsInRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJhYm9ydCIsInVybCIsIm9wdGlvbnMiLCJyZXRyaWVzIiwiZmV0Y2giLCJzaWduYWwiLCJ0aGVuIiwicmVzIiwib2siLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJjYXRjaCIsImV4dHJhY3RDb29raWVJZGVudGlmaWVyIiwiY29va2llU3RyaW5nIiwiY29va2llTmFtZSIsInBhcnNlZCIsInNwbGl0IiwibWFwIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsInRyaW0iLCJpZGVudGlmaWVyIiwiaWRlbnRpZmllckluZGV4IiwiZGV0ZXJtaW5lUGN0Iiwibm93IiwibW9udGgiLCJnZXRNb250aCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJ0b1N0cmluZyIsInBjdCIsImV4aXRTY3JvbGxMaXN0ZW5lciIsImNhbGxCYWNrIiwibG9vcCIsInNjcm9sbFRvcCIsImxhc3RTY3JvbGxUb3AiLCJjbGVhckludGVydmFsIiwiZXhpdFNjcm9sbEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJzdHlsZUFwcGxpY2F0b3IiLCJlbGVtZW50cyIsInN0eWxlQ2hhbmdlc01hcCIsImkiLCJlbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbHVlIiwic3R5bGUiLCJpbmplY3RTdHlsZVNoZWV0Iiwic3R5bGVTaGVldCIsInJlbCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInByZXBhcmVBY3Rpb25zIiwiYWN0aW9uc1RvUHJlcGFyZSIsImJ1c2luZXNzUnVsZUlkIiwiZGVidWdNb2RlIiwiYWN0aW9ucyIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInZhcmlhbnQiLCJhY3Rpb24iLCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMiLCJ2YXJpYW50cyIsImJ1c2luZXNzVHJhbnNmb3JtYXRpb24iLCJpZCIsImtleXMiLCJ2YXJpYW50S2V5IiwicmFuZG9tUGN0Iiwid2VpZ2h0IiwiTWF0aCIsImZsb29yIiwiY2hlY2tBY3Rpb25TZWxlY3RvcnMiLCJvcGVyYXRvciIsInNlbGVjdG9yIiwic2VsZWN0b3JGYWxsYmFjayIsIm1vdmVfc2VsZWN0b3JfMSIsIm1vdmVfc2VsZWN0b3JfMiIsInF1ZXJ5U2VsZWN0b3IiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uU3RvcmFnZSIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsInNldEl0ZW0iLCJwYXRobmFtZSIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsImN1cnJlbnQiLCJyZW1vdmVJdGVtIiwiTnVtYmVyIiwiaXNOYU4iLCJlcnIiLCJnZXRHYUNsaWVudElkIiwiZ2EiLCJnZXRBbGwiLCJ0cmFja2VycyIsImdldCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiYWJzIiwiZ2V0UmFuZG9tSW50IiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJleHRyYWN0SWRlbnRpZmllckludGVydmFsIiwiZSIsImRlbGF5IiwibXMiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJkYXRlIiwicmVzdWx0Iiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwibWF0Y2giLCJ0b2RheSIsInN0YXJ0WWVhciIsImdldEZ1bGxZZWFyIiwiZW5kWWVhciIsImVzdGltYXRlZFN0YXJ0IiwiZXN0aW1hdGVkRW5kIiwic3RhcnREaWZmT3ZlckRheXMiLCJjZWlsIiwiZW5kRGlmZk92ZXJEYXlzIiwic3RhcnREaWZmT3ZlcldlZWtzIiwiZW5kRGlmZk92ZXJXZWVrcyIsImlkbGVUaW1lciIsInRpbWVPdXQiLCJyZXNldFRpbWVyIiwiaWRsZVRpbWVvdXQiLCJvbnRvdWNoc3RhcnQiLCJpc093bk11dGF0aW9uIiwibXV0YXRpb25MaXN0Iiwibm9kZXMiLCJBcnJheSIsImZyb20iLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm4iLCJ0YWdOYW1lIiwiYyIsInNldEFnZW50RGV0YWlscyIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYnIiLCJiTmFtZSIsImJWZXJzaW9uIiwib3MiLCJXaW5kb3dzIiwiTWFjIiwiTGludXgiLCJBbmRyb2lkIiwiaU9TIiwib3NWZXJzaW9uIiwib3NOYW1lIiwiaXNNb2JpbGUiLCJvc1ZlcnNpb25JbnQiLCJpc1N1cHBvcnRlZEJyb3dzZXIiLCJpc1N1cHBvcnRlZE9TIiwic2V0QnJvd3NlckRhdGEiLCJ3aW5kb3dQdHIiLCJuYXZQdHIiLCJwbGF0Zm9ybSIsInVzZXJBZ2VudERhdGEiLCJkZXZpY2VQaXhlbFJhdGlvIiwiYXZhaWxXaW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJ3aW5kb3dEZXB0aCIsImNvbG9yRGVwdGgiLCJwaXhlbERlcHRoIiwidnBvcnRTaGFwZSIsInZpc3VhbFZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJyb3VuZCIsIm9yaWVudGF0aW9uQW5nbGUiLCJvcmllbnRhdGlvbiIsImFuZ2xlIiwidGVtcCIsImhpc3RvcnkiLCJuYXZBZ2VudCIsImJyYW5kcyIsImJyYW5kIiwidmVyc2lvbiIsImpvaW4iLCJtb2JpbGUiLCJoYXJkd2FyZUNvbmN1cnJlbmN5IiwibGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsInVzZXJMYW5ndWFnZSIsIm1heFRvdWNoUG9pbnRzIiwiY29ubmVjdGlvbiIsImRvd25saW5rIiwiZG9Ob3RUcmFjayIsIm1zRG9Ob3RUcmFjayIsInJlZmVycmVyIiwiZmlyc3RTZXNzaW9uUmVmZXJyZXIiLCJzZXRVUkxEYXRhIiwiY3VycmVudFVSTCIsIlVSTCIsImhvc3RuYW1lIiwicGFnZVR5cGUiLCJpZGJSZWFkeSIsImlzU2FmYXJpIiwiaW5kZXhlZERCIiwiZGF0YWJhc2VzIiwiaW50ZXJ2YWxJZCIsInRyeUlkYiIsImZpbmFsbHkiLCJjaGVja1ZlcnNpb24iLCJjdXJyZW50VmVyc2lvbiIsIkxTX1ByZWZpeCIsInVwZGF0ZUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lIiwiYmFzZUZlYXR1cmVWYWx1ZSIsInVwZGF0ZU1ldGhvZCIsImZlYXR1cmVLZXkiLCJvcEtleSIsInN0b3JhZ2UiLCJwYXJzZUZsb2F0IiwidmFsSGFzaCIsIm9wS2V5VmFsIiwib3BLZXlWYWxOYW1lIiwicXVlcnlJbkNvbGxlY3RvciIsInF1ZXJ5TWV0aG9kIiwibG9jYWxLZXlzIiwibG9jYWxLZXlzRmlsdGVyZWQiLCJmaWx0ZXIiLCJzdW0iLCJtYXhDb3VudCIsIm1heFZhbCIsInZhbCIsInNlYXJjaFBhdGhzIiwiUGFnZVR5cGVEZXBlbmQiLCJtZXRob2QiLCJuYW1lIiwiZm9ybWF0dGVyIiwiZXhjbHVzaXZlIiwib3BlcmFuZCIsImNoaWxkcmVuIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJkZXJpdmVNZXRob2QiLCJjdXN0b21EZXJpdmF0aW9uUmVwbyIsImNhbGN1bGF0ZUNvdXBvbkFsbG93YW5jZXMiLCJjYXJyeVNrdVRvRmVhdHVyZXMiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZiIsIl9faHdtIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsIm9iaiIsInVwZGF0ZURlcml2YXRpb25zIiwicGFzc1ZhbHVlVG9MaXN0ZW5lcnMiLCJEQVRBX0xJU1RFTkVSUyIsImFkZERhdGFMaXN0ZW5lciIsImxpc3RlbmVyIiwicHVzaCIsInByZXZQYXNzZWRWYWx1ZXMiLCJsaXN0ZW5lcnMiLCJpc0FycmF5IiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImJsb2NraW5nIiwicG9sbEludGVydmFsIiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJzZWFyY2hFbGVtZW50IiwiaXNGb3VuZCIsImlzSWdub3JlIiwiaW50ZXJ2YWwiLCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYWRkVHJlYXRtZW50IiwiZGVwZW5kYW50X29uX3RyZWF0bWVudCIsIlBBUlNFU0VBUkNITUFYUkVUUlkiLCJQQVJTRVNFQVJDSFNUQVJUREVMQVkiLCJwYXJzZVNlYXJjaFBhdGhzRGVsYXkiLCJwYXJzZVNlYXJjaFBhdGhzUmV0cnkiLCJjdXN0b21EZXJpdmF0aW9uQ29tcGlsZWRSZXBvIiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJkZXJpdmVGdW5jdFN0cmluZyIsImRlcml2ZUZ1bmN0IiwiRnVuY3Rpb24iLCJwcm9jZXNzRm9ybWF0dGVyIiwidG9VcHBlckNhc2UiLCJzZWFyY2hPYmoiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJ0b0JlVXBkYXRlZCIsImNoaWxkIiwiY2hpbGRFbGVtZW50cyIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsInRyaWdnZXJSZXN0YXJ0Iiwic3RhcnRJbmZvTGF5ZXJTY2FuIiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJpbm5lclRleHQiLCJhdHRyaWJWYWx1ZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwidmFsdWVjaGlsZCIsImF0dHJpYlZhbHVlIiwiZ2V0QXR0cmlidXRlIiwic2V0VmFsdWUiLCJzdW1QcmljZSIsImNoaWxkVGV4dCIsImFycmF5SW5uZXJUZXh0IiwiZXhjbHVzaXZlRWxlbWVudCIsInBhcnNlU2VhcmNoUGF0aHMiLCJkb21TdGF0dXMiLCJyZWFkeVN0YXRlIiwid2ludG9wIiwiZGF0YUxheWVyIiwid2luZG9jIiwiZm91bmROYW1lcyIsIlNldCIsInByZXZGb3VuZE5hbWVzIiwibm90Rm91bmROYW1lcyIsImN1cnJlbnRQYWdlVHlwZSIsImhhcyIsInNlYXJjaEFuZFNldCIsImRhdGFMYXllckl0ZW0iLCJzb3JnQXJyYXlJbm5lciIsImdldFNPUkdBcnJheSIsInNvcmdJdGVtIiwic2l6ZSIsInBhdGgiLCJwYXRoQXJyYXkiLCJzdWJQYXRoIiwic2xpY2UiLCJzdWJBcnJheSIsInN1YktleSIsInN1YlZhbHVlIiwic2NoZW1hT3JnRWx0cyIsInNvcmdBcnJheSIsInNUYWciLCJjbnRudCIsImpzb25jb250ZW50IiwiSEVBREVSUyIsIkJlYWNvbiIsImhhc0Fycml2YWxMb2dTZW50IiwiaGFzTWFpbkxvZ1NlbnQiLCJoYXNVcGRhdGVzU2VudCIsImhpZ2hXYXRlck1hcmsiLCJpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzIiwicGFja0FuZFF1ZXVlTWFpbkxvZyIsInBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nIiwicGFja2FnZU1haW5Mb2dEYXRhIiwicmVxdWVzdEJsb2IiLCJjaGVja0ZvckxhdGVzdENoYW5nZXMiLCJxdWV1ZUxvZ3MiLCJoYXNDaGFuZ2VkIiwicGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSIsImxvZ0RhdGEiLCJwYWNrYWdlQXJyaXZhbExvZ0RhdGEiLCJod20iLCJhbGwiLCJjb29raWVHYUlkIiwidmlld19lcG9jaCIsImJvZHkiLCJsYyIsInUiLCJvbkhhc2hQY3QiLCJCbG9iIiwic3RhcnRzV2l0aCIsInMiLCJtIiwidmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xvc2VFdmVudCIsImNhcHR1cmUiLCJ2aXNpYmlsaXR5U3RhdGUiLCJzZW5kQmVhY29uIiwicXVldWVkIiwicXVldWVJbnRlcnZhbCIsInJlcGxhY2VyIiwicmVwbGFjZUZuIiwiY3VycmVudFJlcGxhY2VGbiIsInJlcGxhY2VPYmplY3RFeHRyYWN0b3IiLCJyZXBsYWNlVmFsIiwicmVwbGFjZUZuRXhlY3V0b3IiLCJyRm4iLCJzaW5nbGUiLCJyZXBsYWNlRnVuY3Rpb24iLCJrZXlGYWxsYmFjayIsImNvbmZpZyIsImRiTmFtZSIsInN0b3JlIiwiaW5kZXhlcyIsImZpZWxkcyIsImtleVBhdGgiLCJvcGVuREIiLCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IiwiaW5pdCIsInVwZ3JhZGUiLCJkYiIsIm9sZFZlcnNpb24iLCJkZWxldGVPYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiaWR4IiwiY3JlYXRlSW5kZXgiLCJyZWplY3QiLCJyZWFkd3JpdGUiLCJnZXREQiIsInRyYW5zYWN0aW9uIiwicGF5bG9hZCIsImdldFN0b3JlIiwidGltZXN0YW1wIiwic2F2ZVByb21pc2VzIiwibG9hZCIsInB1dCIsImNsZWFyIiwic2t1IiwiY291bnQiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwiY2xlYXJQcm9taXNlIiwiZXhpc3RpbmdQcm9kSW5mbyIsImdldEN1cnNvciIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInNhdmUiLCJwcmVwYXJlUGF5bG9hZHMiLCJwYXlsb2FkcyIsImZpZWxkTmFtZXMiLCJzaGlmdCIsImNhbGxiYWNrIiwic2t1TGlzdCIsInByb2R1Y3RJbmZvVGltZW91dCIsInByb2R1Y3RJbmZvSW50ZXJ2YWwiLCJTdG9yZSIsImluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwiYXBwbHlFdmVudCIsImNvbnRlbnRTZWxlY3RvciIsIm1kQ29uZGl0aW9uIiwicFR5cGUiLCJwcm9kdWN0SW5mb1N0b3JhZ2UiLCIkIiwibWMiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImJlZm9yZSIsImFmdGVyIiwiYXBwZW5kIiwib2ZmIiwiY3JlYXRlUG9wdXAiLCJlbG0iLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJkaXNwbGF5TW9kYWwiLCJnZXRQcm9kdWN0SW5mbyIsImV2ZW50IiwiZGlzcGxheVBvcHVwIiwiciIsImQiLCJwdXNoU3RhdGUiLCJzdGF0ZSIsIm9uY2UiLCJ0ZXh0IiwiaHRtbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlIiwibjEiLCJuMiIsInN3YXBOb2RlcyIsInNjcmlwdElEIiwiZ2V0RWxlbWVudEJ5SWQiLCJzb3VyY2UiLCJkZXN0aW5hdGlvbiIsInNlbnRlbmNlIiwid29yZCIsImNoYXJBdCIsInRvTG9jYWxlVXBwZXJDYXNlIiwicHJlcGFyZUZpbmFsVGl0bGUiLCJmaW5hbFRpdGxlIiwiY29udGVudHMiLCJub2RlVHlwZSIsIm5vZGVWYWx1ZSIsInByZXBhcmVEZXNjRWxtIiwiZGVzY3JpcHRpb25FbG0iLCJtYXJrZXRpbmdDb3B5IiwidXBkYXRlZEh0bWxTdHJpbmciLCJyZXBsYWNlV2l0aFZhbCIsInRpdGxlQXVnbWVudCIsImh0bWxTdHIiLCJzYWxlQ250VmlzaXRvcnNJbjE1IiwiY2FydENudFZpc2l0b3JzSW4xNSIsInZpZXdDbnRWaXNpdG9yc0luMSIsInRpdGxlcyIsInBhcnNlZFRpdGxlcyIsInBhcnNlZFRpdGxlIiwiaGlkZGVuIiwiaGFuZGxlUG9wdXBDbGljayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb2RhbENsaWNrIiwiaGlkZSIsInFQb3B1cCIsImlzTW9kYWwiLCJwb3B1cFdyYXBwZXIiLCJwb3B1cENsb3NlQnV0dG9uIiwicG9wdXBDbG9zZUJ1dHRvblN0eWxlIiwib25jbGljayIsInNyYyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwicG9wdXAiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsInAxIiwicGFyZW50Tm9kZSIsInAyIiwiaTEiLCJpMiIsImlzRXF1YWxOb2RlIiwiaW5zZXJ0QmVmb3JlIiwid2FpdEZvckpRdWVyeSIsImpRdWVyeSIsImpRdWVyeUludGVydmFsIiwiYWN0aW9uQXBwbGljYXRvciIsImVsaWdpYmxlRWxlbWVudHMiLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImF0dHJpYnV0ZSIsImlubmVyX2NvbmRpdGlvbiIsImNoYWluIiwiY29uZGl0aW9uRWxlbWVudHMiLCJhY3Rpb25Db25kaXRpb25DaGVja2VyIiwiZWxlbWVudFNrdSIsImZuIiwiTXV0ZXgiLCJPQlNFUlZFUl9DT05GSUciLCJhdHRyaWJ1dGVzIiwiUm9ib3RFbmdpbmUiLCJkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyIsIm1hdGNoZWRUcmVhdG1lbnRzIiwiaXNPbiIsImlzQ2hhbXAiLCJlbmdhZ2VtZW50TG9jayIsInJlQXBwbHlUcmVhdG1lbnRzTWFwIiwiYWRkZWREYXRhTGlzdGVuZXJJZHMiLCJyb2JvdFByb21pc2VzIiwidHJlYXRtZW50IiwiZW5nYWdlUm9ib3QiLCJpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCIsImVsaWdpYmlsaXR5UnVsZVNldCIsImRldmljZSIsImJ1c2luZXNzUnVsZVNldCIsImhlbHBlcnMiLCJtb2RlIiwiYXBwbHkiLCJhY3F1aXJlIiwicmVsZWFzZSIsImNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0IiwicmFuZG9tUGN0UHJvbWlzZSIsImNoZWNrQnVzaW5lc3NSdWxlcyIsInByZXBhcmVkQWN0aW9ucyIsImlzRWxpZ2libGUiLCJza2lwUmF0aW8iLCJlbmdhZ2VIZWxwZXJzIiwiYWRkUmVhcHBseUV2ZW50IiwiYWRkUnVsZVNldERhdGFMaXN0ZW5lcnMiLCJoZWxwZXJSb2JvdFByb21pc2VzIiwiY2hlY2siLCJhcHBsaWVkIiwicmVhcHBseV9ldmVudCIsInJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIiwicmVhcHBseV9ldmVudF9hcnJheSIsInJlYXBwbHlFdmVudCIsInByZXZpb3VzVmFsdWUiLCJ0cmVhdG1lbnRJZHMiLCJyZUFwcGx5VHJlYXRtZW50cyIsInQiLCJSZXNpemVPYnNlcnZlciIsInJlYXBwbHlTZWxlY3Rvckxpc3QiLCJyZWFwcGx5X3NlbGVjdG9yIiwibGFzdFNjcm9sbFRpbWUiLCJnZXRUaW1lIiwic3QiLCJwYWdlWU9mZnNldCIsInJlYXBwbHlJbnRlcnZhbCIsImJvdW5kRW5nYWdlVHJlYXRtZW50IiwiYmluZCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJydWxlU2V0IiwicHJldmlvdXNTZWxlY3RvcnMiLCJydWxlIiwic2V0IiwiZWxpZ2liaWxpdHlSdWxlIiwib3Bwb3NpdGVGbGFnIiwiZWxpZ2liaWxpdHlTY29wZSIsImVsaWdpYmlsaXR5TmFtZSIsImVsaWdpYmlsaXR5U2V0VHlwZSIsInByZXZpb3VzSXNFbGlnaWJsZSIsImNoZWNrRWxpZ2liaWxpdHkiLCJidXNpbmVzc1J1bGUiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJtYWluU2VsZWN0b3IiLCJ0ZW1wVmFsIiwicmV0dXJuVmFsIiwiZWxlbSIsImVsZW1lbnRTdHlsZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwiY2hlY2tGdW5jdGlvblJ1bGUiLCJydWxlRnVuY3Rpb24iLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiZHVyYXRpb24iLCJjdXJyZW50SGlzdG9yeSIsImNoZWNrVXJsUnVsZSIsInJlcXVlc3RVUkwiLCJjaGVja0VudlJ1bGUiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsImdldFRpdGxlIiwiZ2V0RGVzY3JpcHRpb24iLCJnZXRGcm9tREIiLCJjaGVja0RvY3VtZW50UnVsZSIsIlJ1bGVFbmdpbmUiLCJiYXNlUnVsZVNldCIsImFkZGVkRGF0YUxpc3RlbmVycyIsIm11dGV4IiwiY2hlY2tSdWxlIiwicnVsZVNhdGlzZmllZCIsImNoYWluX2NvbmRpdGlvbiIsInJ1bGVzIiwiZWxpZ2libGVSdWxlcyIsInJuIiwic2V0VXBMaXN0ZW5lcnMiLCJleHRyYWN0UnVsZUF0dHJpYnV0ZXMiLCJkYXRhTGF5ZXJSdWxlcyIsImVsZW1lbnRSdWxlcyIsInByb2R1Y3RJbmZvUnVsZXMiLCJib3VuZEFzc2Vzc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsImFzc2Vzc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsIm11dGF0aW9uUmVjb3JkIiwiZXZlcnkiLCJjaGVja0luaXRpYWxpemVkIiwiYmFzZVJ1bGUiLCJlbGlnaWJpbGl0eVJ1bGVzT2JqIiwiZWxhcHNlZEhvdXJzIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJjaGVja1J1bGVzIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsInVzZXJTZWdtZW50IiwiQ1BUIiwibWF0Y2hCeVBhZ2VUeXBlIiwidXNlclNlZ21lbnRXZWlnaHRzIiwiaCIsImhlbHBlciIsInZhcmlhbnRXZWlnaHQiLCJtYXRjaGVkVHJlYXRtZW50c1N0cmluZyIsIm10IiwiY2hlY2tQYWdlVHlwZSIsInBhZ2VUeXBlcyIsInB0Iiwic3Vic3RyIiwidHJlYXRtZW50c09iaiIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJ3ZWlnaHRzT2JqIiwid2VpZ2h0cyIsImFuYWx5dGljc0xhYmVsIiwiYmVhY29uIiwiY29va2llUGN0IiwicGFja0FuZFF1ZXVlQXJyaXZhbExvZyIsIlN0cmluZyIsInByb3RvdHlwZSIsInBhZFN0YXJ0IiwicHJvY2Vzc1Vuc3VwcG9ydGVkIiwidHJlYXRtZW50V2VpZ2h0c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRXZWlnaHRzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwicGVyc2lzdFByb2R1Y3RJbmZvIiwic2V0VXBFbGlnaWJpbGl0eVJ1bGVMaXN0ZW5lcnMiLCJpc0FkbWluIiwicHJvY2Vzc0FkbWluVXNlciIsImlzRW1wbG95ZWUiLCJzZWFyY2hQYXJhbXMiLCJsYXN0SW5kZXhPZiIsIml0ZW0iLCJ0cmVhdG1lbnRSZXBvc2l0b3J5IiwiZ2V0TWF0Y2hlZFRyZWF0bWVudHMiLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsIkdMT1ZfT04iLCJnZXRFbGlnaWJpbGl0eVJ1bGVzIiwicnVsZUVuZ2luZSIsImluaXRpYWxpemVMaXN0ZW5lcnMiLCJwcm9kdWN0SW5mb0RCIl0sInNvdXJjZVJvb3QiOiIifQ==
