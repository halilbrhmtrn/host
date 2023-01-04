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
var VERSION = "0.0.40.9";
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
var checkActionSelectors = function checkActionSelectors(preparedActions) {
  var _iterator5 = _createForOfIteratorHelper(preparedActions),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var action = _step5.value;
      if ((action.selector || action.selectorFallback) && !document.querySelector(action.selector) && !document.querySelector(action.selectorFallback)) return false;
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
var getDebugMode = function getDebugMode(oosReason) {
  var DEBUG_MODE = LOCAL_STORAGE_KEYS.DEBUG_MODE,
    OUT_OF_SCOPE = LOCAL_STORAGE_KEYS.OUT_OF_SCOPE;
  var queryString = window.location.search;
  if (queryString.includes("nd_debug=")) {
    window.localStorage.setItem(OUT_OF_SCOPE, oosReason);
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
    if (queryString.includes("nd_debug=-1")) {
      window.localStorage.setItem(DEBUG_MODE, -1);
      addToBeagleInfoLayer("dbm", "on");
      return -1;
    }
    if (queryString.includes("nd_debug=0")) {
      window.localStorage.removeItem(DEBUG_MODE);
      addToBeagleInfoLayer("dbm", "off");
      return 0;
    }
  }
  var current = parseInt(window.localStorage.getItem(DEBUG_MODE));
  if (Number.isNaN(current)) {
    addToBeagleInfoLayer("dbm", "off");
    return 0;
  }
  addToBeagleInfoLayer("dbm", "on");
  return current;
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
                        return _context7.abrupt("return", false);
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
        var id, actions, eligibilityRuleSet, device, dependant_on_treatment, businessRuleSet, weight, delay, helpers, debugMode, debugFilteredTreatments, engagementLock, identifier, isMobile, matchedTreatments, apply, release, treatmentSkipRatio, determiningIdentifier, treatmentPct, businessRuleId, _yield$prepareActions, _yield$prepareActions2, preparedActions, variant, isEligible, _iterator2, _step2, action, eligibleElements;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = treatment.id, actions = treatment.actions, eligibilityRuleSet = treatment.eligibilityRuleSet, device = treatment.device, dependant_on_treatment = treatment.dependant_on_treatment, businessRuleSet = treatment.businessRuleSet, weight = treatment.weight, delay = treatment.delay, helpers = treatment.helpers;
                debugMode = this.debugMode, debugFilteredTreatments = this.debugFilteredTreatments, engagementLock = this.engagementLock, identifier = this.identifier, isMobile = this.isMobile, matchedTreatments = this.matchedTreatments, apply = this.apply; // one engagement at a time
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
                  _context3.next = 92;
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
                _context3.next = 46;
                return prepareActions(identifier, actions, businessRuleId, debugMode);
              case 46:
                _yield$prepareActions = _context3.sent;
                _yield$prepareActions2 = _slicedToArray(_yield$prepareActions, 2);
                preparedActions = _yield$prepareActions2[0];
                variant = _yield$prepareActions2[1];
                isEligible = null;
                _iterator2 = robotEngine_createForOfIteratorHelper(preparedActions);
                _context3.prev = 52;
                _iterator2.s();
              case 54:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 68;
                  break;
                }
                action = _step2.value;
                if (action.condition) {
                  _context3.next = 58;
                  break;
                }
                return _context3.abrupt("continue", 66);
              case 58:
                _context3.next = 60;
                return action_condition_util(action.condition);
              case 60:
                eligibleElements = _context3.sent;
                if (!eligibleElements.length) {
                  _context3.next = 65;
                  break;
                }
                action.eligibleElements = eligibleElements;
                isEligible = true;
                return _context3.abrupt("continue", 66);
              case 65:
                isEligible = isEligible || false;
              case 66:
                _context3.next = 54;
                break;
              case 68:
                _context3.next = 73;
                break;
              case 70:
                _context3.prev = 70;
                _context3.t2 = _context3["catch"](52);
                _iterator2.e(_context3.t2);
              case 73:
                _context3.prev = 73;
                _iterator2.f();
                return _context3.finish(73);
              case 76:
                if (!(isEligible === false)) {
                  _context3.next = 78;
                  break;
                }
                return _context3.abrupt("return");
              case 78:
                if (!(treatmentPct < treatmentSkipRatio)) {
                  _context3.next = 82;
                  break;
                }
                robotEngine_logger.log("Treatment ".concat(id, " skipped due to treatment split ratio"));
                addTreatment(id, businessRuleId, variant, "skipped", dependant_on_treatment);
                return _context3.abrupt("return");
              case 82:
                if (delay) {
                  _context3.next = 89;
                  break;
                }
                _context3.next = 85;
                return apply(id, preparedActions, businessRuleId, variant);
              case 85:
                _context3.next = 87;
                return this.engageHelpers(helpers, matchedTreatments);
              case 87:
                _context3.next = 90;
                break;
              case 89:
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                  return regenerator_default().wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return apply(id, preparedActions, businessRuleId, variant);
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
              case 90:
                _context3.next = 93;
                break;
              case 92:
                robotEngine_logger.failed("Rule check failed for treatment:", id);
              case 93:
                _context3.prev = 93;
                release();
                this.addReapplyEvent(treatment);
                this.addRuleSetDataListeners(treatment);
                return _context3.finish(93);
              case 98:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6,, 93, 98], [52, 70, 73, 76]]);
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
        var helperRobotPromises, _iterator3, _step3, treatment;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(Array.isArray(helpers) && helpers.length)) {
                  _context4.next = 22;
                  break;
                }
                helperRobotPromises = [];
                _iterator3 = robotEngine_createForOfIteratorHelper(matchedTreatments);
                _context4.prev = 3;
                _iterator3.s();
              case 5:
                if ((_step3 = _iterator3.n()).done) {
                  _context4.next = 12;
                  break;
                }
                treatment = _step3.value;
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
                _iterator3.e(_context4.t0);
              case 17:
                _context4.prev = 17;
                _iterator3.f();
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
    key: "apply",
    value: function () {
      var _apply = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5(id, preparedActions, businessRuleId, variant) {
        var check, res;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // TODO check all action selectors exist - if not robot is failed
                check = checkActionSelectors(preparedActions);
                if (!check) addTreatment(id, businessRuleId, variant, "failed");
                _context5.next = 4;
                return BeagleApplyActions(preparedActions);
              case 4:
                res = _context5.sent;
                if (res === true) {
                  addTreatment(id, businessRuleId, variant, "applied");
                } else if (res === false) {
                  addTreatment(id, businessRuleId, variant, "failed");
                }
              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      function apply(_x4, _x5, _x6, _x7) {
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
          robotEngine_logger.log("Reapply event '".concat(reapply_event, "' found for treatment: ").concat(id));
          var _iterator4 = robotEngine_createForOfIteratorHelper(reapply_event_array),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var reapplyEvent = _step4.value;
              var previousValue = reApplyTreatmentsMap[reapplyEvent] ? reApplyTreatmentsMap[reapplyEvent] : [];
              if (previousValue.includes(id)) {
                robotEngine_logger.log("Treatment already added for reapply event");
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
                var _iterator5 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step5;
                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var treatment = _step5.value;
                    robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from infinite_scroll"));
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
                var _iterator6 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step6;
                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    var treatment = _step6.value;
                    robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from timeout"));
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
              var _iterator7 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                _step7;
              try {
                var _loop2 = function _loop2() {
                  var treatment = _step7.value;
                  var reapplySelectorList = Array.isArray(treatment.reapply_selector) ? treatment.reapply_selector : [treatment.reapply_selector];
                  var _iterator8 = robotEngine_createForOfIteratorHelper(reapplySelectorList),
                    _step8;
                  try {
                    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                      var selector = _step8.value;
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
                    _iterator8.e(err);
                  } finally {
                    _iterator8.f();
                  }
                };
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  _loop2();
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
                  var _iterator9 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step9;
                  try {
                    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                      var treatment = _step9.value;
                      robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from on_scroll"));
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
                  var _iterator10 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step10;
                  try {
                    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                      var treatment = _step10.value;
                      robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from query_search_change"));
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
            var _iterator11 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
              _step11;
            try {
              var _loop3 = function _loop3() {
                var treatment = _step11.value;
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
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                _loop3();
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
            }
            break;
          case "info_layer_change":
            var _iterator12 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
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
        var _treatment$eligibilit, eligibilityRuleSet, _treatment$businessRu, businessRuleSet, id, selectors, boundEngageTreatment, _iterator13, _step13, selector;
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
                _iterator13 = robotEngine_createForOfIteratorHelper(selectors);
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
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function addRuleSetDataListeners(_x8) {
        return _addRuleSetDataListeners.apply(this, arguments);
      }
      return addRuleSetDataListeners;
    }()
  }, {
    key: "extractDataListenerSelectors",
    value: function extractDataListenerSelectors(ruleSet) {
      var previousSelectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var selectors = previousSelectors || [];
      var _iterator14 = robotEngine_createForOfIteratorHelper(ruleSet),
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
      function checkEligibility(_x9) {
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
          _iterator15,
          _step15,
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
                _iterator15 = robotEngine_createForOfIteratorHelper(eligibilityRuleSet);
                _context9.prev = 8;
                _iterator15.s();
              case 10:
                if ((_step15 = _iterator15.n()).done) {
                  _context9.next = 57;
                  break;
                }
                eligibilityRule = _step15.value;
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
                _iterator15.e(_context9.t3);
              case 62:
                _context9.prev = 62;
                _iterator15.f();
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
      function checkEligibilityRuleSet(_x10) {
        return _checkEligibilityRuleSet.apply(this, arguments);
      }
      return checkEligibilityRuleSet;
    }() // Return index of businessRule, this is the businessRuleId
  }, {
    key: "checkBusinessRules",
    value: function () {
      var _checkBusinessRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee10(businessRuleSet) {
        var _iterator16, _step16, _step16$value, index, businessRule;
        return regenerator_default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _iterator16 = robotEngine_createForOfIteratorHelper(businessRuleSet.entries());
                _context10.prev = 1;
                _iterator16.s();
              case 3:
                if ((_step16 = _iterator16.n()).done) {
                  _context10.next = 11;
                  break;
                }
                _step16$value = _slicedToArray(_step16.value, 2), index = _step16$value[0], businessRule = _step16$value[1];
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
                _iterator16.e(_context10.t0);
              case 16:
                _context10.prev = 16;
                _iterator16.f();
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
      function checkBusinessRules(_x11) {
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
            if (!(pageType === "Productpage")) {
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
  var monitor, logger, earlyLogSent, _String$prototype, _String$prototype2, identifier, cookiePct, treatmentWeightsPromise, oosBreak, oosReason, debugMode, status, userSegment, treatmentWeights, processAdminUser, isAdmin, isChamp, isOn, pageType;
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

          /* ================================= EARLY PRUNE OUT-OF-SCOPE ============================== */
          oosBreak = false;
          oosReason = window.localStorage.getItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE); // check if debug mode is on, also adds dbm to beagleInfoLayer and sets oosReason
          debugMode = getDebugMode("employee");
          if (debugMode === -1) {
            SHUTDOWN = true;
          }

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

          // TODO: remove permanent unsegmented-oos after OFF eligibility is fixed

          // attempt to compute user segment
          userSegment = null;
          treatmentWeights = null;
          if (oosBreak) {
            _context.next = 48;
            break;
          }
          _context.next = 38;
          return treatmentWeightsPromise;
        case 38:
          treatmentWeights = _context.sent;
          if (treatmentWeights) {
            _context.next = 44;
            break;
          }
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("no-robot-weights");
        case 44:
          _context.next = 46;
          return computeSegment(treatmentWeights);
        case 46:
          userSegment = _context.sent;
        case 47:
          if (!userSegment) {
            oosBreak = true;
          }
        case 48:
          if (!oosBreak) {
            _context.next = 53;
            break;
          }
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "unsupported");
          addToBeagleInfoLayer("GLOV_ON", "unsupported | device");
          throw new Error("unsupported-device");
        case 53:
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
          _context.next = 72;
          break;
        case 66:
          if (!(isAdmin === null || isAdmin === undefined)) {
            _context.next = 71;
            break;
          }
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("no-admin-status");
        case 71:
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, false);
        case 72:
          if (window.top.document.documentElement.classList.contains("glov-ease")) {
            _context.next = 75;
            break;
          }
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("anti-flicker-timeout");
        case 75:
          /* ===================================== ON/OFF CHECK ====================================== */
          // champion is above SPLIT_RATIO plus LAB_RATIO
          isChamp = cookiePct >= SPLIT_RATIO * (1 + LAB_RATIO / 100);
          addToBeagleInfoLayer("isChamp", isChamp);

          // isOn can be true (ON), false (OFF)
          isOn = null;
          if (!debugMode) {
            _context.next = 85;
            break;
          }
          logger.log("Debug mode on: all applicable treatments will be applied");
          isOn = true;
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          addToBeagleInfoLayer("GLOV_ON", "employee | tester");
          _context.next = 100;
          break;
        case 85:
          if (!(oosReason && oosReason === "employee")) {
            _context.next = 92;
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
          _context.next = 100;
          break;
        case 92:
          if (!oosReason) {
            _context.next = 97;
            break;
          }
          addToBeagleInfoLayer("GLOV_ON", "not-sent | unknown");
          throw new Error("Unknown out of scope reason");
        case 97:
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
          addToBeagleInfoLayer("GLOV_ON", isOn.toString());
        case 100:
          _context.next = 102;
          return getFromBeagleInfoLayer("PageType", true);
        case 102:
          pageType = _context.sent;
          if (!(pageType === "purchase")) {
            _context.next = 113;
            break;
          }
          _context.next = 106;
          return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);
        case 106:
          _context.next = 108;
          return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);
        case 108:
          _context.next = 110;
          return monitor.sendLogs(true);
        case 110:
          // if purchase is complete, do not apply any treatments on the confirmation page
          SHUTDOWN = true;
          _context.next = 114;
          break;
        case 113:
          // send logs when ready, start scraping and sending asyncly
          monitor.sendLogs(false);
        case 114:
          earlyLogSent = true;

          /* ======================================= ROBOT PATHs ===================================== */
          addToBeagleInfoLayer("m", "entering-robot-path");
          if (!(isOn === null || isOn === undefined)) {
            _context.next = 120;
            break;
          }
          throw new Error("no-isOn");
        case 120:
          if (!SHUTDOWN) {
            _context.next = 124;
            break;
          }
          throw new Error("shutdown-path");
        case 124:
          _context.next = 126;
          return BeagleOn(identifier, debugMode, pageType, treatmentWeights, isOn);
        case 126:
          _context.next = 134;
          break;
        case 128:
          _context.prev = 128;
          _context.t0 = _context["catch"](6);
          logger.warn("Entrypoint catch: ", _context.t0.message);
          addToBeagleInfoLayer("m", _context.t0.message);
          if (!earlyLogSent && monitor) monitor.sendLogs(false);
          removeDocumentHide();
        case 134:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[6, 128]]);
}))();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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QUFRO1lBQUE7WUFBQTtVQUFBO1VBQUEsTUFDWCxJQUFJenZCLEtBQUssQ0FBQyxlQUFlLENBQUM7UUFBQTtVQUFBO1VBQUEsT0FFMUJzdUIsUUFBUSxDQUFDM3JCLFVBQVUsRUFBRW9DLFNBQVMsRUFBRTRILFFBQVEsRUFBRXJNLGdCQUFnQixFQUFFaW5CLElBQUksQ0FBQztRQUFBO1VBQUE7VUFBQTtRQUFBO1VBQUE7VUFBQTtVQUd6RXpvQixNQUFNLENBQUNILElBQUksQ0FBQyxvQkFBb0IsRUFBRSxZQUFJeUIsT0FBTyxDQUFDO1VBQzlDdkIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLFlBQUl1QixPQUFPLENBQUM7VUFDdEMsSUFBSSxDQUFDdXZCLFlBQVksSUFBSUQsT0FBTyxFQUFFQSxPQUFPLENBQUNjLFFBQVEsQ0FBQyxLQUFLLENBQUM7VUFDckR4eEIsa0JBQWtCLEVBQUU7UUFBQztRQUFBO1VBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSxDQUV4QixJQUFHLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9jb2xsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVNb25pdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL3dyYXAtaWRiLXZhbHVlLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9hY3Rpb24tY29uZGl0aW9uLXV0aWwuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9hc3luYy1tdXRleC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVPbi9yb2JvdEVuZ2luZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZGF0YUxheWVyQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZWxlbWVudENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2Z1bmN0aW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvc2Vzc2lvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3VybENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VudkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Byb2R1Y3RJbmZvQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVPbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQ2xpZW50U0RLL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIFwidXNlIHN0cmljdFwiOyAvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovXG4gIG1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSA9IGZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIGV4cG9ydHMgPSB7fSxcbiAgICBPcCA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHksXG4gICAgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgICBvYmpba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgfSxcbiAgICAkU3ltYm9sID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgPyBTeW1ib2wgOiB7fSxcbiAgICBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCIsXG4gICAgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICAgIHdyaXRhYmxlOiAhMFxuICAgIH0pLCBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yLFxuICAgICAgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpLFxuICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KSwgZ2VuZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpICYmIChJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKFwidGhyb3dcIiAhPT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmcsXG4gICAgICAgICAgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiBcIm9iamVjdFwiID09IF90eXBlb2YodmFsdWUpICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikgPyBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkgOiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQsIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICB9XG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgaWYgKFwiZXhlY3V0aW5nXCIgPT09IHN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgIGlmIChcInRocm93XCIgPT09IG1ldGhvZCkgdGhyb3cgYXJnO1xuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZCwgY29udGV4dC5hcmcgPSBhcmc7Oykge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcIm5leHRcIiA9PT0gY29udGV4dC5tZXRob2QpIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztlbHNlIGlmIChcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB7XG4gICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBjb250ZXh0Lm1ldGhvZCAmJiBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBcImNvbXBsZXRlZFwiIDogXCJzdXNwZW5kZWRZaWVsZFwiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUgJiYgKHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZCxcbiAgICAgIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgIGlmICh1bmRlZmluZWQgPT09IG1ldGhvZCkgcmV0dXJuIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBcInRocm93XCIgPT09IG1ldGhvZE5hbWUgJiYgZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0gJiYgKGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQsIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpLCBcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB8fCBcInJldHVyblwiICE9PSBtZXRob2ROYW1lICYmIChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAnXCIgKyBtZXRob2ROYW1lICsgXCInIG1ldGhvZFwiKSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgcmV0dXJuIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcsIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICByZXR1cm4gaW5mbyA/IGluZm8uZG9uZSA/IChjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZSwgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYywgXCJyZXR1cm5cIiAhPT0gY29udGV4dC5tZXRob2QgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpIDogaW5mbyA6IChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIiksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG4gICAgMSBpbiBsb2NzICYmIChlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV0pLCAyIGluIGxvY3MgJiYgKGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdLCBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM10pLCB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIiwgZGVsZXRlIHJlY29yZC5hcmcsIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV0sIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKSwgdGhpcy5yZXNldCghMCk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGl0ZXJhYmxlLm5leHQpIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgZm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkgcmV0dXJuIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dC52YWx1ZSA9IHVuZGVmaW5lZCwgbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogITBcbiAgICB9O1xuICB9XG4gIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lUHJvcGVydHkoR3AsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSwgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBnZW5GdW4gJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiAhIWN0b3IgJiYgKGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA9PT0gKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSk7XG4gIH0sIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpIDogKGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIikpLCBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCksIGdlbkZ1bjtcbiAgfSwgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKSwgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIHZvaWQgMCA9PT0gUHJvbWlzZUltcGwgJiYgKFByb21pc2VJbXBsID0gUHJvbWlzZSk7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKSwgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIiksIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pLCBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpLFxuICAgICAga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cy5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsga2V5cy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkgcmV0dXJuIG5leHQudmFsdWUgPSBrZXksIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgIH07XG4gIH0sIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoc2tpcFRlbXBSZXNldCkge1xuICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQsIHRoaXMuZG9uZSA9ICExLCB0aGlzLmRlbGVnYXRlID0gbnVsbCwgdGhpcy5tZXRob2QgPSBcIm5leHRcIiwgdGhpcy5hcmcgPSB1bmRlZmluZWQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhc2tpcFRlbXBSZXNldCkgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgIFwidFwiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLmRvbmUgPSAhMDtcbiAgICAgIHZhciByb290UmVjb3JkID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByb290UmVjb3JkLnR5cGUpIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSBcInRocm93XCIsIHJlY29yZC5hcmcgPSBleGNlcHRpb24sIGNvbnRleHQubmV4dCA9IGxvYywgY2F1Z2h0ICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKFwicm9vdFwiID09PSBlbnRyeS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIiksXG4gICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNGaW5hbGx5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHRocm93IHJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSByZWNvcmQudHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHJlY29yZC50eXBlID8gdGhpcy5uZXh0ID0gcmVjb3JkLmFyZyA6IFwicmV0dXJuXCIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSBcInJldHVyblwiLCB0aGlzLm5leHQgPSBcImVuZFwiKSA6IFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIGZpbmlzaChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uIF9jYXRjaCh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gZGVsZWdhdGVZaWVsZChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9LCBcIm5leHRcIiA9PT0gdGhpcy5tZXRob2QgJiYgKHRoaXMuYXJnID0gdW5kZWZpbmVkKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH0sIGV4cG9ydHM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvYmopO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS5cblxudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi4vaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWVcIikoKTtcbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcblxuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9wYWNrYWdlcy9ydW50aW1lL3J1bnRpbWUuanMjTDczNj1cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCB0b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGNvbnN0IHJlcGxhY2VBbGwgPSAoc3RyLCBmaW5kLCByZXBsYWNlID0gXCJcIikgPT4ge1xuICBpZiAoIXN0cikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIHN0cjtcblxuICB3aGlsZSAoc3RyLmluZGV4T2YoZmluZCkgPj0gMCkge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gICAgc3RyID0gKGluZGV4ID4gMCA/IHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpIDogXCJcIikgKyByZXBsYWNlICsgc3RyLnN1YnN0cmluZyhpbmRleCArIGZpbmQubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5leHBvcnQgY29uc3QgdHVya2lzaFRvTG93ZXIgPSAoc3RyKSA9PiB7XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XG4gIGxldCBzdHJpbmcgPSBzdHI7XG4gIGNvbnN0IGxldHRlcnMgPSB7XCLEsFwiOiBcImlcIiwgXCJJXCI6IFwixLFcIiwgXCLFnlwiOiBcIsWfXCIsIFwixJ5cIjogXCLEn1wiLCBcIsOcXCI6IFwiw7xcIiwgXCLDllwiOiBcIsO2XCIsIFwiw4dcIjogXCLDp1wifTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygoW8SwScWexJ7DnMOHw5ZdKSkvZywgZnVuY3Rpb24obGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlcnNbbGV0dGVyXTtcbiAgfSk7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuL3N0cmluZ1V0aWxzXCI7XG5jb25zdCBpc1N0YWdpbmcgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJzdGFnaW5nLnZpdmVuc2VcIikgOiB0cnVlO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMC4wLjQwLjlcIjtcbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA9IFwiX2dhXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0cy5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0lORk9fTE9DQVRJT04gPSBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvc29jaWFsLXByb29mLXYyLmpzb25cIjtcbmV4cG9ydCBjb25zdCBMT0dfQVBJX1VSTCA9IFwiaHR0cHM6Ly9ldXJvcGUtd2VzdDMtbmV4dGRheS0zNGViMy5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2xvZ1wiO1xuZXhwb3J0IGNvbnN0IExPT0tVUF9BUElfVVJMID0gXCJodHRwczovL2NhdGFsb2ctYXBpLmFkb3JhYWkuY29tXCI7XG5leHBvcnQgY29uc3QgTU9CSUxFX01FRElBX1FVRVJZID0gXCIobWF4LXdpZHRoOiA0NDBweClcIjtcbi8vIENvbnRyb2wgZ3JvdXAgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFNQTElUX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgTEFCX1JBVElPID0gMjA7XG4vLyBTa2lwcGVkIHRyZWF0bWVudCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMgPSAyO1xuZXhwb3J0IGNvbnN0IExJU1RfTU9ERV9CRUFHTEVfS0VZUyA9IFtcInBhZ2V0eXBlXCIsIFwiY2F0ZWdvcnlcIiwgXCJhbGx0aW1lUExQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBMUENhdGVnb3J5TW9kZVwiLFxuICBcImFsbHRpbWVQRFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUERQQ2F0ZWdvcnlNb2RlXCIsIFwiYWxsdGltZUNhcnRDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uQ2FydENhdGVnb3J5TW9kZVwiXTtcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBQT1BVUF9ESVNQTEFZX0ZMQUc6IFwiQkdfUG9wdXBEaXNwbGF5RmxhZ1wiLFxuICBTS1VfSU5GT19CQVNLRVQ6IFwiQkdfUHJvZHVjdEluZm9CYXNrZXRcIixcbiAgU0VTU0lPTl9SRUZFUlJFUjogXCJCR19TZXNzaW9uUmVmZXJyZXJcIixcbiAgTUFUQ0hFRF9UUkVBVE1FTlRTOiBcIkdMVl9NYXRjaGVkXCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgVFJFQVRNRU5UUzogXCJCR19UcmVhdG1lbnRzXCIsXG4gIFdFSUdIVFM6IFwiQkdfV2VpZ2h0c1wiLFxuICBFTElHSUJJTElUWV9SVUxFUzogXCJCR19FX1J1bGVzXCIsXG4gIERFQlVHX01PREU6IFwiQkdfRGVidWdcIixcbiAgT1VUX09GX1NDT1BFOiBcIkdMVl9PdXRPZlNjb3BlXzAwXCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAxXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG4gIElTX0FETUlOOiBcIkdMVl9Jc0FkbWluXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gbnVsbCA9PSBhcnIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IF9pKSB7XG4gICAgdmFyIF9zLFxuICAgICAgX2UsXG4gICAgICBfeCxcbiAgICAgIF9yLFxuICAgICAgX2FyciA9IFtdLFxuICAgICAgX24gPSAhMCxcbiAgICAgIF9kID0gITE7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfeCA9IChfaSA9IF9pLmNhbGwoYXJyKSkubmV4dCwgMCA9PT0gaSkge1xuICAgICAgICBpZiAoT2JqZWN0KF9pKSAhPT0gX2kpIHJldHVybjtcbiAgICAgICAgX24gPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShfbiA9IChfcyA9IF94LmNhbGwoX2kpKS5kb25lKSAmJiAoX2Fyci5wdXNoKF9zLnZhbHVlKSwgX2Fyci5sZW5ndGggIT09IGkpOyBfbiA9ICEwKSB7XG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gITAsIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIG51bGwgIT0gX2lbXCJyZXR1cm5cIl0gJiYgKF9yID0gX2lbXCJyZXR1cm5cIl0oKSwgT2JqZWN0KF9yKSAhPT0gX3IpKSByZXR1cm47XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2FycjtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAga2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgU1RZTEVTSEVFVF9MT0NBVElPTixcbiAgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04sXG4gIFRSRUFUTUVOVFNfTE9DQVRJT04sXG4gIEVfUlVMRVNfTE9DQVRJT04sXG4gIFBST0RVQ1RfSU5GT19MT0NBVElPTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3Qgc3dpdGNoVG9FYXNlT3V0ID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtaGlkZVwiKSkgcmV0dXJuO1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZWwudGV4dENvbnRlbnQgPSBgLmdsb3YtZWFzZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtby1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tcy1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIGFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuMjU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDc1JSB7IG9wYWNpdHk6IDAuNTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDkwJSB7IG9wYWNpdHk6IDAuNzU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDEwMCUgeyBvcGFjaXR5OiAxOyBmaWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IC13ZWJraXQtZmlsdGVyOiBncmF5c2NhbGUoMCUpO31cbiAgfWA7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnByZXBlbmQoZWwpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ2xvdi1lYXNlXCIpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudCA9IGF3YWl0IHRyZWF0bWVudHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnQgd2VpZ2h0c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudCB3ZWlnaHRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoUGx1cyhFX1JVTEVTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25FbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZWxpZ2liaWxpdHlSdWxlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25FbGlnaWJpbGl0eVJ1bGVzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoUHJvZHVjdEluZm8gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHByb2R1Y3QgaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoUGx1cyhQUk9EVUNUX0lORk9fTE9DQVRJT04pO1xuICAgIGlmICghcHJvZHVjdEluZm8pIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvSnNvbiA9IGF3YWl0IHByb2R1Y3RJbmZvLmpzb24oKTtcbiAgICByZXR1cm4gcHJvZHVjdEluZm9Kc29uO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSk7XG4gIHJldHVybiB7Y29udHJvbGxlciwgdGltZW91dElEfTtcbn07XG5cbmNvbnN0IGZldGNoUGx1cyA9ICh1cmwsIG9wdGlvbnMgPSB7fSwgcmV0cmllcyA9IDUpID0+IHtcbiAgY29uc3Qge2NvbnRyb2xsZXIsIHRpbWVvdXRJRH0gPSB0aW1lb3V0KDUwMDApO1xuICByZXR1cm4gZmV0Y2godXJsLCB7Li4ub3B0aW9ucywgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIHRpbWVkIG91dCBSZXRyeWluZy4uLjogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIG9mIHllYXIgdG8gaGFzaCB0byByZXNldCBpdCBldmVyeSBtb250aFxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBub3cuZ2V0TW9udGgoKTtcbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIrbW9udGgudG9TdHJpbmcoKSk7XG5cbiAgICBpZiAoaGFzaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhcmlhbnRLZXldIG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiAhYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSBNYXRoLmZsb29yKDEwMCAvIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpICogKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0FjdGlvblNlbGVjdG9ycyA9IChwcmVwYXJlZEFjdGlvbnMpID0+IHtcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgcHJlcGFyZWRBY3Rpb25zKSB7XG4gICAgaWYgKFxuICAgICAgKGFjdGlvbi5zZWxlY3RvciB8fCBhY3Rpb24uc2VsZWN0b3JGYWxsYmFjaykgJiZcbiAgICAgICAgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYWN0aW9uLnNlbGVjdG9yKSAmJlxuICAgICAgICAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhY3Rpb24uc2VsZWN0b3JGYWxsYmFjaylcbiAgICApIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyA9ICgpID0+IHtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBRywgU0VTU0lPTl9USU1FU1RBTVAsIFNFU1NJT05fSElTVE9SWX0gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCBwb3B1cERpc3BsYXlGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpO1xuICBjb25zdCBzZXNzaW9uVGltZXN0YW1wID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCk7XG4gIGNvbnN0IHNlc3Npb25IaXN0b3J5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX0hJU1RPUlkpO1xuXG4gIGlmIChwb3B1cERpc3BsYXlGbGFnID09PSBudWxsKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDApO1xuICB9XG4gIGlmICghc2Vzc2lvblRpbWVzdGFtcCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVAsIERhdGUubm93KCkpO1xuICB9XG4gIGlmICghc2Vzc2lvbkhpc3RvcnkpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZV0pO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBzZXNzaW9uSGlzdG9yeV0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29uZGl0aW9uQ2hlY2tlciA9IChydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJub3RFeGlzdFwiKSB7XG4gICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHxcbiAgICBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gbnVsbCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IHJ1blRpbWVWYWx1ZSBvciBjb25kaXRpb24gaXMgbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgY2FzZSBcImV4aXN0XCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImluY2x1ZGVzXCI6XG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RJbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJub3RDb250YWluc1wiOlxuICAgICAgaWYgKCFydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPD0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImJldHdlZW5cIjoge1xuICAgICAgbGV0IFttaW4sIG1heF0gPSB2YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gbWluICYmIHJ1blRpbWVWYWx1ZSA8PSBtYXgpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FzZSBcInJlZ2V4XCI6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgXCJpXCIpO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QocnVuVGltZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBjb25kaXRpb24gaXMgbm90IGRlZmluZWQgXCIsIGNvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREZWJ1Z01vZGUgPSAob29zUmVhc29uKSA9PiB7XG4gIGNvbnN0IHtERUJVR19NT0RFLCBPVVRfT0ZfU0NPUEV9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShPVVRfT0ZfU0NPUEUsIG9vc1JlYXNvbik7XG4gICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MVwiKSkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDEpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0yXCIpKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPS0xXCIpKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgLTEpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MFwiKSkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKERFQlVHX01PREUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgY29uc3QgY3VycmVudCA9IHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShERUJVR19NT0RFKSk7XG4gIGlmIChOdW1iZXIuaXNOYU4oY3VycmVudCkpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICByZXR1cm4gY3VycmVudDtcbn07XG5cbi8vIGdldCBHQSBjbGllbnQgaWQgdXNpbmcgZ2EuZ2V0QWxsKClcbmV4cG9ydCBjb25zdCBnZXRHYUNsaWVudElkID0gKCkgPT4ge1xuICBjb25zdCBnYSA9IHdpbmRvdy5nYTtcbiAgLy8gaWYgZ2EgYW5kIGdhLmdldEFsbCgpIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gbnVsbFxuICBpZiAoZ2EgJiYgZ2EuZ2V0QWxsKSB7XG4gICAgY29uc3QgdHJhY2tlcnMgPSBnYS5nZXRBbGwoKTtcbiAgICBpZiAodHJhY2tlcnMgJiYgdHJhY2tlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJhY2tlcnNbMF0uZ2V0KFwiY2xpZW50SWRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gZ2V0IGRldGVybWluaXN0aWMgbnVtZXJpYyBoYXNoIGZyb20gc3RyaW5nIHRoYXQgY29udGFpbnMgb25seSBudW1iZXJzXG5leHBvcnQgY29uc3QgZ2V0VW5zZWN1cmVIYXNoID0gKHN0cikgPT4ge1xuICAvLyBzdGFydCB3aXRoIGEgbWFnaWMgbnVtYmVyLCB1c2UgcGkgZGlnaXRzXG4gIGxldCBoYXNoID0gMzE0MTU5MjY1O1xuICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikge1xuICAgIC8vIG1ha2UgaXQgc3RyaW5nXG4gICAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XG4gIH1cbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgfVxuICAvLyByZXR1cm4gYWJzb2x1dGUgdmFsdWVcbiAgcmV0dXJuIE1hdGguYWJzKGhhc2gpO1xufTtcblxuLy8gZ2VuZXJhdGUgYSAzMi1iaXQgcmFuZG9tIGludGVnZXJcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCk7XG59O1xuXG4vLyBnZXQgY3VycmVudCB1bml4IGVwb2NoIHRpbWUgaW4gc2Vjb25kc1xuZXhwb3J0IGNvbnN0IGdldFVuaXhUaW1lID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZXRJZGVudGlmaWVyID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGlkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lEKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGxvY2FsIHN0b3JhZ2VcIiwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYSBpbiBmaXJzdCBhdHRlbXB0XCIsIGlkKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHRyYWN0SWRlbnRpZmllckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYVwiLCBpZCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCByZWFkIEdBIGNsaWVudCBpZFwiKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgaW4gZ2V0SWRlbnRpZmllclwiLCBlKTtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxheSA9IChtcykgPT4gbmV3IFByb21pc2UoKHJlcykgPT4gc2V0VGltZW91dChyZXMsIG1zKSk7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREZWxpdmVyeURhdGUgPSAoZGF0ZSkgPT4ge1xuICBpZiAoIWRhdGUgfHwgdHlwZW9mIGRhdGUgIT09IFwic3RyaW5nXCIpIHJldHVybiBkYXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBzdGFydE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBlbmRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgc3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICBlbmREYXk6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBsZXQgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKS0oW1xcXFxkXSspXFxcXHM/KFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA9PT0gNCkge1xuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbM10udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSByZXN1bHQuc3RhcnRNb250aEluZGV4O1xuICB9IGVsc2Uge1xuICAgIG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspLShbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gubGVuZ3RoICE9PSA1KSByZXR1cm4gZGF0ZTtcblxuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzJdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbNF0udG9Mb3dlckNhc2UoKV07XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIGlmICghcmVzdWx0LnN0YXJ0TW9udGhJbmRleCB8fCAhcmVzdWx0LmVuZE1vbnRoSW5kZXgpIHJldHVybiBkYXRlO1xuXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuICAgIGNvbnN0IGVuZFllYXIgPSByZXN1bHQuZW5kTW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuXG4gICAgY29uc3QgZXN0aW1hdGVkU3RhcnQgPSBuZXcgRGF0ZShzdGFydFllYXIsIHJlc3VsdC5zdGFydE1vbnRoSW5kZXgsIHJlc3VsdC5zdGFydERheSk7XG4gICAgY29uc3QgZXN0aW1hdGVkRW5kID0gbmV3IERhdGUoZW5kWWVhciwgcmVzdWx0LmVuZE1vbnRoSW5kZXgsIHJlc3VsdC5lbmREYXkpO1xuXG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRTdGFydCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZEVuZCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyV2Vla3MgPSBzdGFydERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKHN0YXJ0RGlmZk92ZXJEYXlzIC8gNyk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJXZWVrcyA9IGVuZERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKGVuZERpZmZPdmVyRGF5cyAvIDcpO1xuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID09PSAwKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IC0gJHtlbmREaWZmT3ZlckRheXN9IEfDvG5gO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA+PSAxKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IEfDvG4gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSBlbmREaWZmT3ZlcldlZWtzKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpZGxlVGltZXIgPSBhc3luYyAodGltZU91dCwgY2FsbEJhY2spID0+IHtcbiAgbGV0IGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG5cbiAgd2luZG93LnRvcC5kb2N1bWVudC5vbnRvdWNoc3RhcnQgPSByZXNldFRpbWVyO1xuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0KTtcbiAgICBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaXNPd25NdXRhdGlvbiA9IChtdXRhdGlvbkxpc3QpID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBbLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0uYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLnJlbW92ZWROb2RlcyldO1xuICByZXR1cm4gbm9kZXMuc29tZSgobikgPT4ge1xuICAgIHJldHVybiBuLnRhZ05hbWUgJiYgKG4uaWQ/LmluY2x1ZGVzKFwiYm4tXCIpIHx8IEFycmF5LmZyb20obi5jbGFzc0xpc3QpLnNvbWUoKGMpID0+IGMuaW5jbHVkZXMoXCJibi1cIikgfHwgYy5pbmNsdWRlcyhcIm5kLVwiKSkpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRBZ2VudERldGFpbHMgPSAoKSA9PiB7XG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAvLyBleHRyYWN0IGJyb3dzZXIgYW5kIHZlcnNpb25cbiAgY29uc3QgYnIgPSB1YS5tYXRjaCgvKG9wZXJhfGVkZ3x0cmlkZW50fGZpcmVmb3h8bXNpZSg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHxcbiAgICB1YS5tYXRjaCgvKHNhZmFyaXxjaHJvbWUoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8XG4gICAgdWEubWF0Y2goLyh3ZWJraXQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8IFtdO1xuXG4gIGlmICghYnIgfHwgYnIubGVuZ3RoIDwgMykgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGJOYW1lID0gYnJbMV07XG4gIGNvbnN0IGJWZXJzaW9uID0gYnJbMl07XG5cbiAgY29uc3Qgb3MgPSB7XG4gICAgV2luZG93czogL1dpbi9pLnRlc3QodWEpLFxuICAgIE1hYzogL01hYy9pLnRlc3QodWEpLFxuICAgIExpbnV4OiAvTGludXgvaS50ZXN0KHVhKSxcbiAgICBBbmRyb2lkOiAvQW5kcm9pZC9pLnRlc3QodWEpLFxuICAgIGlPUzogL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KHVhKSxcbiAgfTtcblxuICAvLyBleHRyYWN0IE9TIGFuZCB2ZXJzaW9uXG4gIGxldCBvc1ZlcnNpb24gPSBcIlwiO1xuICBsZXQgb3NOYW1lID0gXCJcIjtcbiAgaWYgKG9zLldpbmRvd3MpIHtcbiAgICBvc05hbWUgPSBcIldpbmRvd3NcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvV2luZG93cyBOVCAoWzAtOS5dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcInVua25vd25cIjtcbiAgfSBlbHNlIGlmIChvcy5pT1MpIHtcbiAgICBvc05hbWUgPSBcImlPU1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9PUyAoWzAtOV9dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0ucmVwbGFjZSgvXy9nLCBcIi5cIikgOiBcInVua25vd25cIjtcbiAgfSBlbHNlIGlmIChvcy5NYWMpIHtcbiAgICBvc05hbWUgPSBcIk1hY1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9NYWMgT1MgWCAoWzAtOV9dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0ucmVwbGFjZSgvXy9nLCBcIi5cIikgOiBcInVua25vd25cIjtcbiAgfSBlbHNlIGlmIChvcy5BbmRyb2lkKSB7XG4gICAgb3NOYW1lID0gXCJBbmRyb2lkXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL0FuZHJvaWQgKFswLTkuXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuTGludXgpIHtcbiAgICBvc05hbWUgPSBcIkxpbnV4XCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL0xpbnV4IChbaVxcZF0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwidW5rbm93blwiO1xuICB9XG5cbiAgLy8gZXh0cmFjdCBtb2JpbGUgb3IgZGVza3RvcFxuICBjb25zdCBpc01vYmlsZSA9IC9Nb2JpL2kudGVzdCh1YSk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuYnJvd3Nlck5hbWVcIiwgYk5hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5icm93c2VyVmVyc2lvblwiLCBiVmVyc2lvbik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm9zTmFtZVwiLCBvc05hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5vc1ZlcnNpb25cIiwgb3NWZXJzaW9uKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaXNNb2JpbGVcIiwgaXNNb2JpbGUpO1xuXG4gIGNvbnN0IGlzU3VwcG9ydGVkQnJvd3NlciA9IGJOYW1lID09PSBcIkNocm9tZVwiIHx8IGJOYW1lID09PSBcIlNhZmFyaVwiO1xuICBjb25zdCBpc1N1cHBvcnRlZE9TID0gb3NOYW1lID09PSBcIk1hY1wiIHx8IG9zTmFtZSA9PT0gXCJXaW5kb3dzXCIgfHwgb3NOYW1lID09PSBcIkFuZHJvaWRcIiB8fCBvc05hbWUgPT09IFwiaU9TXCI7XG5cbiAgcmV0dXJuIGlzU3VwcG9ydGVkQnJvd3NlciAmJiBpc1N1cHBvcnRlZE9TO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFVSTERhdGEgPSAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiZmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJiYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGFzdG9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzaWduaW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2NvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfaW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfYWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfbm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic3BlY2lhbF9jYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG59O1xuXG4vKipcbiAqIFdvcmsgYXJvdW5kIFNhZmFyaSAxNCBJbmRleGVkREIgb3BlbiBidWcuXG4gKlxuICogU2FmYXJpIGhhcyBhIGhvcnJpYmxlIGJ1ZyB3aGVyZSBJREIgcmVxdWVzdHMgY2FuIGhhbmcgd2hpbGUgdGhlIGJyb3dzZXIgaXMgc3RhcnRpbmcgdXAuIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yMjY1NDdcbiAqIFRoZSBvbmx5IHNvbHV0aW9uIGlzIHRvIGtlZXAgbnVkZ2luZyBpdCB1bnRpbCBpdCdzIGF3YWtlLlxuICovXG5leHBvcnQgY29uc3QgaWRiUmVhZHkgPSAoKSA9PiB7XG4gIGNvbnN0IGlzU2FmYXJpID1cbiAgICAhbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEgJiZcbiAgICAvU2FmYXJpXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgIS9DaHJvbShlfGl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgLy8gTm8gcG9pbnQgcHV0dGluZyBvdGhlciBicm93c2VycyBvciBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgdGhyb3VnaCB0aGlzIG1lc3MuXG4gIGlmICghaXNTYWZhcmkgfHwgIWluZGV4ZWREQi5kYXRhYmFzZXMpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICBsZXQgaW50ZXJ2YWxJZDtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCB0cnlJZGIgPSAoKSA9PiBpbmRleGVkREIuZGF0YWJhc2VzKCkuZmluYWxseShyZXNvbHZlKCkpO1xuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0cnlJZGIsIDUwKTtcbiAgICB0cnlJZGIoKTtcbiAgfSkuZmluYWxseSgoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0VW5zZWN1cmVIYXNofSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZJbmZvTGF5ZXJcIik7XG5jb25zdCBMU19QcmVmaXggPSBcIkdMRENfXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJ1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCk7XG5cbiAgICAvLyByZW1vdmUgZG90cyBpbiBiYXNlRmVhdHVyZU5hbWUgYW5kIGFkZCBwcmVmaXhcbiAgICBjb25zdCBmZWF0dXJlS2V5ID0gTFNfUHJlZml4ICsgYmFzZUZlYXR1cmVOYW1lLnJlcGxhY2UoL1xcLi9nLCBcIl9cIik7XG4gICAgY29uc3Qgb3BLZXkgPSBmZWF0dXJlS2V5ICsgXCJfXCIgKyB1cGRhdGVNZXRob2Q7XG5cbiAgICBzd2l0Y2ggKHVwZGF0ZU1ldGhvZCkge1xuICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgY2FzZSBcIm1heFwiOlxuICAgICAgICAvLyBjb21wdXRlIG1pbiBhbmQgbWF4IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIE1hdGhbdXBkYXRlTWV0aG9kXSh2YWx1ZSwgYmFzZUZlYXR1cmVWYWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzdW1cIjpcbiAgICAgICAgLy8gY29tcHV0ZSBzdW0gYW5kIGNvdW50IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBwYXJzZUZsb2F0KHZhbHVlKSArIHBhcnNlRmxvYXQoYmFzZUZlYXR1cmVWYWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImNudFwiOlxuICAgICAgICAvLyBjb21wdXRlIGNvdW50IGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBwYXJzZUludCh2YWx1ZSkgKyAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgIC8vIGNvbXB1dGUgbGFzdCBvYnRhaW5lZCB2YWx1ZSBpbiBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwiY291bnRfdmFsdWVzXCIgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzLCBrZWVwIGEgY291bnRlciBmb3IgZWFjaCB2YWx1ZVxuICAgICAgY2FzZSBcInZhbGNudHNcIjpcbiAgICAgICAge1xuICAgICAgICAgIC8vIGNvbXB1dGUgY291bnQgb2YgZWFjaCB2YWx1ZSBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgICAvLyBjcmVhdGUgYSA4IGJ5dGVzIGhleCBoYXNoIGZvciBiYXNlRmVhdHVyZVZhbHVlLCBvbmx5IHBvc2l0aXZlIG51bWJlcnNcbiAgICAgICAgICBjb25zdCB2YWxIYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGJhc2VGZWF0dXJlVmFsdWUpO1xuXG4gICAgICAgICAgY29uc3Qgb3BLZXlWYWwgPSBvcEtleSArIFwiX1wiICsgdmFsSGFzaDtcbiAgICAgICAgICBjb25zdCBvcEtleVZhbE5hbWUgPSBvcEtleSArIFwiX1wiICsgdmFsSGFzaCArIFwiX25hbWVcIjtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbE5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXlWYWwpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbCwgcGFyc2VJbnQodmFsdWUpICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWwsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiRXJyb3IgaW4gdXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QsIGUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcXVlcnlJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwicXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpO1xuXG4gICAgY29uc3QgZmVhdHVyZUtleSA9IExTX1ByZWZpeCArIGJhc2VGZWF0dXJlTmFtZS5yZXBsYWNlKC9cXC4vZywgXCJfXCIpO1xuICAgIGxldCBvcEtleTtcblxuICAgIGxldCBzdG9yYWdlID0gbnVsbDtcbiAgICBpZiAod2luZG93ID09PSBcImFsbHRpbWVcIikge1xuICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdyA9PT0gXCJzZXNzaW9uXCIpIHtcbiAgICAgIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmVycm9yKFwiSW52YWxpZCB3aW5kb3cgdHlwZVwiLCB3aW5kb3cpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc3dpdGNoIChxdWVyeU1ldGhvZCkge1xuICAgICAgLy8gZm9yIGxhc3QsIG1pbiwgbWF4LCBzdW0gZXRjLiBicmluZyB0aGUgdmFsdWUgZnJvbSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2UgZ2l2ZW4gdGhlIHdpbmRvdyBpcyBzZXNzaW9uIG9yIGFsbHRpbWVcbiAgICAgIGNhc2UgXCJtaW5cIjpcbiAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgIGNhc2UgXCJzdW1cIjpcbiAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgIG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX1wiICsgcXVlcnlNZXRob2Q7XG4gICAgICAgIHJldHVybiBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuXG4gICAgICAgIC8vIGZvciBjdiwgcmV0dXJuIHRoZSBudW1iZXIgb2YgZHNpaXRuY3QgdmFsdWVzLCBvYnRhaW4gYnkgc2Nhbm5pbmcgdGhlIHByZWZpeCBvZiB0aGUga2V5IGluIHRoZSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2VcbiAgICAgICAgLy8gZm9yIG1vZGUsIHNjYW4gdGhlIGxvY2FsL3Nlc3Npb24gc3RvcmFnZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSB3aXRoIHRoZSBoaWdoZXN0IGNvdW50XG4gICAgICBjYXNlIFwiY250dmFsc1wiOlxuICAgICAgY2FzZSBcInN1bXZhbHNcIjpcbiAgICAgIGNhc2UgXCJtb2RlXCI6XG4gICAgICB7XG4gICAgICAgIG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX3ZhbGNudHNcIjtcbiAgICAgICAgY29uc3QgbG9jYWxLZXlzID0gT2JqZWN0LmtleXMoc3RvcmFnZSk7XG4gICAgICAgIGNvbnN0IGxvY2FsS2V5c0ZpbHRlcmVkID0gbG9jYWxLZXlzLmZpbHRlcigoa2V5KSA9PiBrZXkuaW5kZXhPZihvcEtleSkgPT09IDAgJiYga2V5LmluZGV4T2YoXCJfbmFtZVwiKSA9PT0gLTEpO1xuICAgICAgICBpZiAocXVlcnlNZXRob2QgPT09IFwiY250dmFsc1wiKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsS2V5c0ZpbHRlcmVkLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJzdW12YWxzXCIpIHtcbiAgICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgICBsb2NhbEtleXNGaWx0ZXJlZC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIHN1bSArPSBwYXJzZUludChzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXhDb3VudCA9IG51bGw7XG4gICAgICAgIGxldCBtYXhWYWwgPSBudWxsO1xuICAgICAgICBsb2NhbEtleXNGaWx0ZXJlZC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWwgPSBwYXJzZUludChzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgaWYgKG1heFZhbCA9PT0gbnVsbCB8fCBtYXhDb3VudCA9PT0gbnVsbCB8fCBtYXhDb3VudCA8IHZhbCkge1xuICAgICAgICAgICAgbWF4Q291bnQgPSB2YWw7XG4gICAgICAgICAgICAvLyBuYW1lcyBhcmUgb25seSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICBtYXhWYWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkgKyBcIl9uYW1lXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXhWYWw7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIGluIHF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93LCBlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7Zm9ybWF0RGVsaXZlcnlEYXRlLCBpc093bk11dGF0aW9ufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7cXVlcnlJbkNvbGxlY3RvciwgdXBkYXRlSW5Db2xsZWN0b3J9IGZyb20gXCIuL2NvbGxlY3RvclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbndpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgPSB3aW5kb3cuYmVhZ2xlSW5mb0xheWVyIHx8IHtcbiAgYToge30sIGU6IHt9LCBmOiB7fSwgX19od206IDAsXG59O1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdkluZm9MYXllclwiKTtcblxuLy8gVE9ETzogY29udmVydCB0byBuYW1lIC0tPiBhcnJheSBvZiBzZWxlY3RvcnNcbmNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2xhc3NcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5pc0luU2hvd3Jvb21cIiwgbmFtZTogXCJwZHAuaXNJblNob3dyb29tXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNhdGVnb3J5X3Byb2R1Y3RfY291bnRcIiwgbmFtZTogXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBscC5jbGFzc1wiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInB1cmNoYXNlLnByaWNlc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5xdWFudGl0eVwiLCBuYW1lOiBcInB1cmNoYXNlLnF1YW50aXRpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwdXJjaGFzZS5jYXRlZ29yaWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLm9yZGVySWRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLnJldmVudWVcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5kaW1lbnNpb24xNVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRG9jdW1lbnQgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicGFnZV9wcmV2aWV3X3dyYXBwZXJfcHJvZHVjdGlvblxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiSG9tZXBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXRlZ29yeV9wYWdlX3dyYXBwZXJcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkxpc3RpbmdwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiYm9keSA+IC5kZXNrdG9wX2xheW91dF93cmFwcGVyIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY29wdW9uTm90QXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVGb3JtYXR0ZWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwiZm9ybWF0RGVsaXZlcnlEYXRlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiN2aXZlbnNlLXNob3dyb29tLXRhYiBwOm5vdCgudml2ZW5zZS1zaG93cm9vbXMpXCIsIG5hbWU6IFwicGRwLmhhc05vU2hvd3Jvb21zXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJwZHAuc2hvd3Jvb21jb3VudFwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwic3Bhbi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjc2FsZXMtcHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiZGl2LnByb2R1Y3QtcHJpY2UtYm94XCIsIG5hbWU6IFwiX19wcmljZU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJwZHAucHJpY2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNtb2JpbGUtcHJvZHVjdC1zdGlja3lcIiwgbmFtZTogXCJfX3ByaWNlT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcInBkcC5wcmljZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInN1YmNhdGVnb3JpZXMtdGl0bGVcXFwiXVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtY2FyZFtkYXRhLXByb2R1Y3Qtc2t1XVwiLCBuYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJvZHVjdC1za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtbGlzdFwiLCBuYW1lOiBcIl9fbGlzdGluZ0l0ZW1CbG9ja09ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIC8vIE1vYmlsZSBvYnNlcnZlciBmb3IgdGhlIGZ1bGwgZm9ybSBibG9jayBhcyBpdCBpcyBjb21wbGV0ZWx5IHJlcGxhY2VkXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfc3VtbWFyeV90b3RhbFxcXCJdLCBbY2xhc3MqPVxcXCJ0b3RhbF9yb3dcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnJldmVudWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXJfZm9sbG93X251bWJcXFwiXSwgW2NsYXNzKj1cXFwiY2FydC10aXRsZS1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnZ2c1R4bklkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnBheW1lbnRfdHlwZV90aXRsZSwgLmNhcnQtdGl0bGUtaW5mb1wiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3Rfc2t1X2NvZGVcXFwiXVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXNrdVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFNPUkcgRWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcInNrdVwiLCBuYW1lOiBcInBkcC5za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtcG5cIiwgbmFtZTogXCJwZHAubXBuXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiSlNPTkZpbHRlck90aGVyXCIsIHZhbHVlOiBcIkB0eXBlPVByb2R1Y3RcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJvZmZlcnMucHJpY2VWYWxpZFVudGlsXCIsIG5hbWU6IFwicGRwLnByaWNlVmFsaWRVbnRpbFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIml0ZW1MaXN0RWxlbWVudC4qLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5udW1iZXJPZkl0ZW1zXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcImJyZWFkY3J1bWIuaXRlbUxpc3RFbGVtZW50LiouaXRlbS5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gV2luZG93IGN1c3RvbSBlbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiZmF2b3JpdGVQcm9kdWN0c1wiLCBuYW1lOiBcInZpZXcuZmF2b3JpdGVkTVBOc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCIsIGZvcm1hdHRlcjogXCJ0b1N0cmluZ1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcbl07XG5cbmNvbnN0IGZlYXR1cmVFbmdpbmVlcmluZ09wcyA9IHtcbiAgXCJ2aWV3X2Vwb2NoXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcIm1pblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibWluXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3Rvcnkudmlld19lcG9jaF9taW5cIn0sXG4gIF0sXG4gIFwiUGFnZVR5cGVcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwidmFsY250c1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwic3VtdmFsc1wiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X3Nlc3Npb25cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcInN1bXZhbHNcIiwgd2luZG93OiBcImFsbHRpbWVcIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9hbGx0aW1lXCJ9LFxuICBdLFxuICBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMubGFzdENhcnRDb3Vwb25BcHBsaWNhYmxlXCJ9LFxuICBdLFxuICBcInBkcC5jYXRlZ29yeVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJ2YWxjbnRzXCJ9LFxuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibW9kZVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9tb2RlX3Nlc3Npb25cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3RcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbGFzdF9zZXNzaW9uXCJ9LFxuICBdLFxuICBcImNhcnQuc2t1c1wiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCJ9LFxuICBdLFxufTtcblxuZXhwb3J0IGNvbnN0IGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNID0gKCkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5mb0xheWVyLl9faHdtICs9IDE7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVG9CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIGlmIHZhbHVlIGlzIHN0cmluZywgYWRkIGFzIGEgY2xlYW4gc3RyaW5nLCBpZiBvYmplY3QgYWRkIHRoZSBzYW1lXG4gIGNvbnN0IHR5cGVkVmFsdWUgPSB0eXBlb2YgKHZhbHVlKSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpIDogdmFsdWU7XG4gIC8vIGlmIGtleSBjb250YWlucyAuIGNyZWF0ZSBuZXN0ZWQgb2JqZWN0XG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIG9ialtrZXldID0ge307XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBvYmpbbGFzdEtleV0gPSB0eXBlZFZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGluZm9MYXllcltrZXldID0gdHlwZWRWYWx1ZTtcbiAgfVxuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgaWYgKHR5cGVkVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlZFZhbHVlICE9PSBudWxsKSB7XG4gICAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIHR5cGVkVmFsdWUpO1xuICAgIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgdHlwZWRWYWx1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IERBVEFfTElTVEVORVJTID0ge307XG5cbmV4cG9ydCBjb25zdCBhZGREYXRhTGlzdGVuZXIgPSAoa2V5LCBsaXN0ZW5lcikgPT4ge1xuICBpZiAoIURBVEFfTElTVEVORVJTW2tleV0pIHtcbiAgICBEQVRBX0xJU1RFTkVSU1trZXldID0gW107XG4gIH1cbiAgREFUQV9MSVNURU5FUlNba2V5XS5wdXNoKGxpc3RlbmVyKTtcbn07XG5cbmNvbnN0IHBhc3NWYWx1ZVRvTGlzdGVuZXJzID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgbGlzdGVuZXJzID0gREFUQV9MSVNURU5FUlNba2V5XTtcbiAgaWYgKGxpc3RlbmVycyAmJiBBcnJheS5pc0FycmF5KGxpc3RlbmVycykgJiYgbGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgLS0+IHZhbHVlICR7dmFsdWV9IHRvIGxpc3RlbmVyICR7aX0gb2Yga2V5ICR7a2V5fWApO1xuICAgICAgICBsaXN0ZW5lcih2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RnJvbUJlYWdsZUluZm9MYXllciA9IChrZXksIGJsb2NraW5nID0gZmFsc2UsIHBvbGxJbnRlcnZhbCA9IDUwLCB0aW1lb3V0ID0gMTAwMDApID0+IHtcbiAgLy8gVE9ETzogY2hlY2sgZmVhdHVyZUVuZ2luZWVyaW5nIGFuZCBzZWFyY2ggbGlzdCBpZiBhbGwgbWFya2VkIGFzIGZvdW5kIGJ1dCB2YWx1ZSBpcyBtaXNzaW5nXG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyByZXR1cm4gbnVsbCBpZiBrZXkgaXMgbWlzc2luZyBvciBub3QgYW4gYXJyYXkgb3IgaGFzIG5vIGVsZW1lbnRzXG4gIGlmICgha2V5KSByZXR1cm4gbnVsbDtcbiAgbGV0IG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGJsb2NraW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICAgICAgICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXksIGNsZWFyIGludGVydmFsIGFuZCByZXNvbHZlXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShvYnRhaW5EYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBwb2xsSW50ZXJ2YWwpO1xuICAgICAgLy8gYWRkIHRpbWVvdXRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0sIHRpbWVvdXQpOyAvLyB3YWl0IGJsb2NraW5nIGZvciBcInRpbWVvdXRcIiBtc2Vjc1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciA9IChrZXkpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gcmVtb3ZlIGtleSBmcm9tIGluZm9MYXllclxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSByZXR1cm47XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICBsb2dnZXIubG9nKFwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllclwiLCBgUmVtb3Zpbmcga2V5OiAke2xhc3RLZXl9YCk7XG4gICAgZGVsZXRlIG9ialtsYXN0S2V5XTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgaW5mb0xheWVyW2tleV07XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCBudWxsKTtcbiAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCBudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUcmVhdG1lbnQgPSAoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBzdGF0dXMsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0ge307XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVJZCAhPT0gdW5kZWZpbmVkKSB2YWx1ZS5idXNpbmVzc1J1bGVJZCA9IGJ1c2luZXNzUnVsZUlkO1xuICBpZiAodmFyaWFudCkgdmFsdWUudmFyaWFudCA9IHZhcmlhbnQ7XG5cbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiYXBwbGllZFwiOlxuICAgICAgaW5mb0xheWVyLmFbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2tpcHBlZFwiOlxuICAgICAgdmFsdWUuZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQ7XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciA9IGFzeW5jICgpID0+IHtcbiAgLy8gQ29sbGVjdCBjb3JlIGRhdGFcbiAgcHJlcGFyZUNvcmVEYXRhKCk7XG5cbiAgLy8gVHJpZ2dlci1zdGFydCB0aGUgcGFyc2VyIGxvb3BcbiAgcGFyc2VyQ2FsbGVyKCk7XG5cbiAgLy8gQWRkIG1ldHJpY3NcbiAgYWRkTWV0cmljcygpO1xufTtcblxuY29uc3QgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvciA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYmFzZUZlYXR1cmVOYW1lcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVFbmdpbmVlcmluZ09wcyk7XG4gIGZvciAoY29uc3QgYmFzZUZlYXR1cmVOYW1lIG9mIGJhc2VGZWF0dXJlTmFtZXMpIHtcbiAgICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgICBpZiAoRkVPcC5xdWVyeU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnF1ZXJ5TWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgcXVlcnlJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIEZFT3AucXVlcnlNZXRob2QsIEZFT3Aud2luZG93KTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoRkVPcC5mZWF0dXJlTmFtZSwgcXVlcnlSZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSkgPT4ge1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AudXBkYXRlTWV0aG9kID09PSBudWxsIHx8IEZFT3AudXBkYXRlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgYXdhaXQgdXBkYXRlSW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCBGRU9wLnVwZGF0ZU1ldGhvZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgcGFyc2VyQ2FsbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSArPSBwYXJzZUludChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3VtUHJpY2UgPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gc3VtUHJpY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBjb25zdCBhcnJheUlubmVyVGV4dCA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgYXJyYXlJbm5lclRleHQucHVzaChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJyYXlJbm5lclRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGFycmF5SW5uZXJUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfSAvLyBzd2l0Y2hcblxuICAgIGlmIChsYXllclZhbHVlICE9PSB1bmRlZmluZWQgJiYgbGF5ZXJWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKSB7XG4gICAgICAgIGxheWVyVmFsdWUgPSBwcm9jZXNzRm9ybWF0dGVyKGxheWVyVmFsdWUsIHNlYXJjaEVsZW1lbnQuZm9ybWF0dGVyKTtcbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKHNlYXJjaEVsZW1lbnQubmFtZSwgbGF5ZXJWYWx1ZSk7XG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuXG4gICAgICAvLyBtYXJrIGV4Y2x1c2l2ZSBlbGVtZW50cyBhcyBmb3VuZFxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUpICYmIHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBleGNsdXNpdmVFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlLmluY2x1ZGVzKGV4Y2x1c2l2ZUVsZW1lbnQubmFtZSkpIHtcbiAgICAgICAgICAgIGV4Y2x1c2l2ZUVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcInNlYXJjaE9iaiBlcnJvcjogXCIgKyBlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlLCA1MCwgMTAwMCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBjYXJ0IHRvdGFsIHByb2R1Y3QgcHJpY2UgaXMgbm90IGF2YWlsYWJsZSBhbnl3aGVyZSwgc3BlY2lhbCBkaXNjb3VudHMgZXRjIGFyZSBoYXJkIHRvIHNjcmFwZSwgc28gcmVjYWxjdWxhdGUgaXRcbiAgICBjb25zdCBbaXNDYXJ0RW1wdHksIHRvdGFsQmFzZVByaWNlLCBjb3Vwb25Ob3RBcHBsaWNhYmxlLCBwcmljZXMsIHF1YW50aXRpZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuaXNlbXB0eVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnByaWNlc1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnF1YW50aXRpZXNcIiksXG4gICAgXSk7XG5cbiAgICBsZXQgdG90YWxQcmljZSA9IDA7XG5cbiAgICBpZiAoIXRvdGFsQmFzZVByaWNlICYmIHByaWNlcyAmJiBBcnJheS5pc0FycmF5KHByaWNlcykgJiYgcHJpY2VzLmxlbmd0aCA+IDAgJiYgcXVhbnRpdGllcyAmJiBBcnJheS5pc0FycmF5KHF1YW50aXRpZXMpICYmIHF1YW50aXRpZXMubGVuZ3RoID4gMCAmJiBwcmljZXMubGVuZ3RoID09PSBxdWFudGl0aWVzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG90YWxQcmljZSArPSBwYXJzZUludChwcmljZXNbaV0pICogcGFyc2VJbnQocXVhbnRpdGllc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvdGFsUHJpY2UgPSBwYXJzZUludCh0b3RhbEJhc2VQcmljZSk7XG4gICAgfVxuXG4gICAgbGV0IGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSAmJiBjb3Vwb25Ob3RBcHBsaWNhYmxlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gdG90YWxQcmljZSAtIHBhcnNlSW50KGNvdXBvbk5vdEFwcGxpY2FibGUpO1xuICAgIH0gZWxzZSBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSBwYXJzZUludCh0b3RhbFByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCIsIGNvdXBvbkFwcGxpY2FibGVBbW91bnQpO1xuXG4gICAgaWYgKGlzQ2FydEVtcHR5KSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxQcmljZVwiLCAwKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIDApO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcImN1c3RvbURhdGFEZXJpdmF0aW9ucyBjYW5ub3QgY29tcHV0ZSBjb3Vwb25BcHBsaWNhYmxlUHJpY2U6IFwiICsgZSk7XG4gIH1cblxuICAvLyBQcm9kdWN0IHBhZ2UgLS0+IHRyYW5zZmVyIHNrdXMgdG8gc2luZ2xlIGxvY2F0aW9uXG4gIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiUHJvZHVjdHBhZ2VcIikge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIpO1xuICAgIGlmIChza3UgIT09IG51bGwgJiYgc2t1ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIFtza3VdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QgIT09IG51bGwgJiYgQXJyYXkuaXNBcnJheShza3VMaXN0KSAmJiBza3VMaXN0Lmxlbmd0aCkge1xuICAgICAgYXdhaXQgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgc2t1TGlzdCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwYXJzZVNlYXJjaFBhdGhzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkb21TdGF0dXMgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICAvLyBjaGVjayBpZiBkb2N1bWVudCBhbmQgZG9tIGlzIGxvYWRlZCBhbmQgcmVhZHkgZm9yIHNjcmFwcGluZ1xuICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBpbml0aWFsaXplZCB3aXRoIGRvbSBzdGF0dXM6ICBcIiArIGRvbVN0YXR1cyk7XG5cbiAgY29uc3Qgd2ludG9wID0gd2luZG93LnRvcDtcbiAgY29uc3QgZGF0YUxheWVyID0gd2ludG9wLmRhdGFMYXllcjtcbiAgY29uc3Qgd2luZG9jID0gd2ludG9wLmRvY3VtZW50O1xuICBsZXQgc29yZ0FycmF5SW5uZXI7XG5cbiAgY29uc3QgZm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3QgcHJldkZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG5vdEZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG5cbiAgLy8gUGFnZVR5cGUgY2FuIGJlIGluZmVycmVkIGZyb20gVVJMLCBpZiBmb3VuZCB1c2UgaXQgZnJvbSB0aGVyZVxuICBsZXQgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuXG4gIGlmIChjdXJyZW50UGFnZVR5cGUpIHtcbiAgICBwcmV2Rm91bmROYW1lcy5hZGQoXCJQYWdlVHlwZVwiKTtcbiAgfVxuXG4gIC8vIExvb3AgdGhyb3VnaCBzZWFyY2ggbGlzdHMgYW5kIG1hcmsgZm91bmQgbmFtZXNcbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcHJldkZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoZm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSB8fCBwcmV2Rm91bmROYW1lcy5oYXMoc2VhcmNoRWxlbWVudC5uYW1lKSkge1xuICAgICAgLy8gaGFkIGFscmVhZHkgZm91bmQgdGhpcyBlbGVtZW50IG9uIGFub3RoZXIgcGFyc2UgaXRlbVxuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kICE9PSBcIipcIikge1xuICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIpO1xuICAgICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQuaW5kZXhPZihjdXJyZW50UGFnZVR5cGUpIDwgMCkge1xuICAgICAgICAvLyBza2lwIHNlYXJjaEVsZW1lbnQgYmVjYXVzZSBvZiBQYWdlVHlwZURlcGVuZFxuICAgICAgICBzZWFyY2hFbGVtZW50LmlzSWdub3JlID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIlNpbmdsZVdUXCIpIHsgLy8gU0NBTiBXaW5kb3cgZm9yIFNpbmdsZSBFbGVtZW50c1xuICAgICAgc2VhcmNoQW5kU2V0KHdpbnRvcCwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJHQURhdGFMYXllclwiKSB7IC8vIFNDQU4gR0EgREFUQSBMQVlFUlxuICAgICAgZm9yIChjb25zdCBkYXRhTGF5ZXJJdGVtIG9mIGRhdGFMYXllcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoZGF0YUxheWVySXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NTb3JnXCIpIHsgLy8gU0NBTiBTT1JHIEFSUkFZXG4gICAgICBpZiAoIXNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNvcmdBcnJheUlubmVyID0gZ2V0U09SR0FycmF5KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHNvcmdJdGVtIG9mIHNvcmdBcnJheUlubmVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChzb3JnSXRlbSwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJEb2NRdWVyeVwiKSB7IC8vIFNDQU4gRE9DVU1FTlRcbiAgICAgIHNlYXJjaEFuZFNldCh3aW5kb2MsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gLy8gRE9DUVVFUlkgcGFyc2VcbiAgfVxuXG4gIGlmIChub3RGb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGZvdW5kIGFsbCBlbGVtZW50cyAtIHNldHRpbmcgcmV0cnkgdG8gbWF4XCIpO1xuICB9IGVsc2UgaWYgKGZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIC8vIHVwZGF0ZSByZXRyeSBjb3VudGVyIGFuZCBkZWxheSBvbmx5IGlmIGRvbSBpcyBhY3RpdmVcbiAgICBpZiAoZG9tU3RhdHVzID09PSBcImNvbXBsZXRlXCIgfHwgZG9tU3RhdHVzID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSAqPSAyO1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICs9IDE7XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkIGJ1dCBub3QgZm91bmQgYW55LCBzZXR0aW5nIGRlbGF5IGFuZCByZXRyeSB0byBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIiBhbmQgXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ICsgXCIgZm9yIG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdXCIsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQ6IG5vdGZvdW5kOiBbXCIgK1xuICAgICAgQXJyYXkuZnJvbShub3RGb3VuZE5hbWVzKS5qb2luKFwiIHwgXCIpICsgXCJdIGFuZCBmb3VuZCBcIiArXG4gICAgICBmb3VuZE5hbWVzLnNpemUsXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoQW5kU2V0ID0gKG9iaiwgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcykgPT4ge1xuICBpZiAoc2VhcmNoT2JqKG9iaiwgc2VhcmNoRWxlbWVudCkpIHtcbiAgICBmb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIG5vdEZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH1cbn07XG5cbi8vIHBhcnNlIHNvdXJjZVxuY29uc3QgcGFyc2VyQ2FsbGVyID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGF3YWl0IHBhcnNlU2VhcmNoUGF0aHMoKTtcbiAgaWYgKHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA8IFBBUlNFU0VBUkNITUFYUkVUUlkpIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogc2NoZWR1bGVkIHRvIGJlIHJlY2FsbGVkIGluIFwiICsgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCJtc1wiKTtcbiAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgcGFyc2VyQ2FsbGVyKCk7XG4gICAgfSwgcGFyc2VTZWFyY2hQYXRoc0RlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogcmVhY2hlZCBtYXggcmV0cnksIGNhbGxpbmcgcmVtYWluZGVyIGhpc3RvcmljYWwgZGF0YVwiKTtcbiAgICBhd2FpdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMoKTtcbiAgICBhd2FpdCBjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUpO1xuICB9XG59O1xuXG4vLyBFeHRyYWN0IHZhbHVlIGZyb20ganNvbiBvYmplY3QgdXNpbmcgZ2l2ZW4gcGF0aFxuLy8gSWYgYW4gZWxlbWVudCBpcyAqLCBjb25jYXRlbmF0ZSByZWN1cnNpdmVseSBhbGwgc3ViLXBhdGggdmFsdWVzIGFzIHN0cmluZ1xuY29uc3QganNvbkdldCA9IChvYmosIHBhdGgpID0+IHtcbiAgaWYgKCFvYmopIHJldHVybiBudWxsO1xuICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aEFycmF5ID0gcGF0aC5zcGxpdChcIi5cIik7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChwYXRoQXJyYXlbaV0gPT09IFwiKlwiKSB7XG4gICAgICAgIGNvbnN0IHN1YlBhdGggPSBwYXRoQXJyYXkuc2xpY2UoaSArIDEpLmpvaW4oXCIuXCIpO1xuICAgICAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBpbiBjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRbc3ViS2V5XSAhPT0gdW5kZWZpbmVkICYmIGN1cnJlbnRbc3ViS2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgc3ViVmFsdWUgPSBqc29uR2V0KGN1cnJlbnRbc3ViS2V5XSwgc3ViUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3ViVmFsdWUgIT09IG51bGwgJiYgc3ViVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBzdWJBcnJheS5wdXNoKHN1YlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YkFycmF5O1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnRbcGF0aEFycmF5W2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgcHJlcGFyZUNvcmVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB3aW5kb3dQdHIgPSB3aW5kb3cudG9wO1xuICBjb25zdCBuYXZQdHIgPSB3aW5kb3dQdHIubmF2aWdhdG9yO1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50RGF0YT8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudDtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZQbGF0Zm9ybVwiLCBwbGF0Zm9ybSk7XG5cbiAgLyogd2luZG93IHZpZXcgYXJlYSAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dQUmF0aW9cIiwgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIGNvbnN0IGF2YWlsV2luZG93ID0gd2luZG93UHRyLnNjcmVlbj8uYXZhaWxXaWR0aCArIFwieFwiICsgd2luZG93UHRyLnNjcmVlbj8uYXZhaWxIZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0F2YWlsXCIsIGF2YWlsV2luZG93KTtcblxuICBjb25zdCB3aW5kb3dEZXB0aCA9IHdpbmRvd1B0ci5zY3JlZW4/LmNvbG9yRGVwdGggKyBcIi1cIiArIHdpbmRvd1B0ci5zY3JlZW4/LnBpeGVsRGVwdGg7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd0RlcHRoXCIsIHdpbmRvd0RlcHRoKTtcblxuICBjb25zdCB2cG9ydFNoYXBlID0gd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py53aWR0aCArIFwieFwiICsgd2luZG93UHRyLnZpc3VhbFZpZXdwb3J0Py5oZWlnaHQ7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1Zwb3J0XCIsIHZwb3J0U2hhcGUpO1xuXG4gIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICBsZXQgd2lkdGggPSBwYXJzZUludChzY3JlZW4ud2lkdGgpO1xuICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBwYXJzZUludChzY3JlZW4uaGVpZ2h0KSA6IDA7XG4gICAgaWYgKHdpZHRoICE9PSAwICYmIGhlaWdodCAhPT0gMCkge1xuICAgICAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QocGxhdGZvcm0pO1xuICAgICAgaWYgKGlPUyAmJiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbykge1xuICAgICAgICAvLyBpb3MgcHJvdmlkZXMgRFBJcywgbmVlZCB0byBtdWx0aXBseVxuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGggKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25BbmdsZSA9IHdpbmRvd1B0ci5zY3JlZW4/Lm9yaWVudGF0aW9uPy5hbmdsZTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSA5MCB8fCBNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gMjcwKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBsYW5kc2NhcGUgb3JpZW50YXRpb24gc3dpdGNoIHZhbHVlcyBmb3IgYWxsIGV4Y2VwdCBpb3NcbiAgICAgICAgICBjb25zdCB0ZW1wID0gd2lkdGg7XG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQ7XG4gICAgICAgICAgaGVpZ2h0ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93XCIsIHdpZHRoICsgXCJ4XCIgKyBoZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIG5hdmlnYXRvciAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIaXN0U2l6ZVwiLCB3aW5kb3dQdHIuaGlzdG9yeT8ubGVuZ3RoKTtcblxuICAvLyBjaGVjayBpZiB1c2VyQWdlbnREYXRhIGlzIHN1cHBvcnRlZCBhbmQgdXNlckFnZW50IGlzIG5vdCBhdmFpbGFibGUsIHVzZSBpdFxuICBpZiAoIW5hdlB0ci51c2VyQWdlbnQpIHtcbiAgICBpZiAobmF2UHRyLnVzZXJBZ2VudERhdGEpIHtcbiAgICAgIC8vIHR1cm4gYnJhbmRzIGFycmF5IGludG8gc3RyaW5nXG4gICAgICBsZXQgbmF2QWdlbnQgPSBuYXZQdHI/LnVzZXJBZ2VudERhdGE/LmJyYW5kcz8ubWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuYnJhbmQgKyBcIjpcIiArIGUudmVyc2lvbjtcbiAgICAgIH0pLmpvaW4oKTtcbiAgICAgIC8vIGFkZCBtb2JpbGUgaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gKG5hdlB0cj8udXNlckFnZW50RGF0YT8ubW9iaWxlID8gXCJtb2JpXCIgOiBcIiBcIik7XG4gICAgICAvLyBhZGQgcGxhdGZvcm0gaW5mb1xuICAgICAgbmF2QWdlbnQgKz0gcGxhdGZvcm07XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZBZ2VudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdlB0ci51c2VyQWdlbnQpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SFdDb3Jlc1wiLCBuYXZQdHIuaGFyZHdhcmVDb25jdXJyZW5jeSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkxhbmd1YWdlXCIsIG5hdlB0ci5sYW5ndWFnZSB8fFxuICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIuc3lzdGVtTGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIudXNlckxhbmd1YWdlLFxuICApO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZUb3VjaFwiLCBuYXZQdHIubWF4VG91Y2hQb2ludHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZWZW5kb3JcIiwgbmF2UHRyLnZlbmRvcik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmludGVybmV0U3BlZWRcIiwgd2luZG93UHRyLm5hdmlnYXRvcj8uY29ubmVjdGlvbj8uZG93bmxpbmspO1xuXG4gIC8qIG1pc2NlbGxhbmVvdXMgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkb250dHJhY2tcIiwgbmF2UHRyLmRvTm90VHJhY2sgfHwgd2luZG93UHRyLmRvTm90VHJhY2sgfHwgbmF2UHRyLm1zRG9Ob3RUcmFjayk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIGNvbnN0IGZpcnN0U2Vzc2lvblJlZmVycmVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSKTtcbiAgaWYgKCFmaXJzdFNlc3Npb25SZWZlcnJlcikge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCBmaXJzdFNlc3Npb25SZWZlcnJlcik7XG4gIH1cbn07XG5cbmNvbnN0IGFkZE1ldHJpY3MgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgcGVyZk1ldHJpY3MgPSB7fTtcbiAgY29uc3QgcGVyZk5hdmlnYXRpb25NZXRyaWNzID0gd2luZG93UHRyLnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdO1xuICBpZiAod2luZG93UHRyLnBlcmZvcm1hbmNlICYmIHBlcmZOYXZpZ2F0aW9uTWV0cmljcykge1xuICAgIHBlcmZNZXRyaWNzLmNvbm5lY3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MucmVxdWVzdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlc3BvbnNlRW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlcXVlc3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZG9tID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tSW50ZXJhY3RpdmUgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tQ29tcGxldGUpO1xuICAgIHBlcmZNZXRyaWNzLmxvYWQgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZHVyYXRpb24pO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibWV0cmljc1wiLCBwZXJmTWV0cmljcyk7XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU1vbml0b3JcIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBtb25pdG9yXCIpO1xuXG4gICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gZmFsc2U7XG5cbiAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBBdHRlbXB0cyB0byBzZW5kIHRoZSBpbml0aWFsIGxvZyBib2R5IChiZWFnbGVJbmZvTGF5ZXIncyBpbml0aWFsIHBvcHVsYXRpb24pIGltbWVkaWF0ZWx5XG4gIGFzeW5jIHNlbmRMb2dzKGltbWVkaWF0ZSkge1xuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBpbW1lZGlhdGUgc2VuZGluZyBibG9ja1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIGF3YWl0aW5nIHNjcmFwaW5nXCIpO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBzZW5kaW5nIGxvZ3NcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIGluaXRpYWwgbG9nIGJvZHkgYW5kIGluY3JlbWVudGFsIHVwZGF0ZSBsb2dzIG9uIGNsb3NlXG4gIGFzeW5jIGhhbmRsZUNsb3NlRXZlbnQoKSB7XG4gICAgLy8gaWYgaW5pdGlhbCBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCBzZW5kIHVwZGF0ZXMgYW5kIGluZm9sYXllciBpbiBvbmUgYmF0Y2hcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICAvLyBpZiBtYWluIGxvZyBoYXMgYmVlbiBzZW50LCBzZW5kIGluY3JlbWVudGFsIHVwZGF0ZXMgb25seVxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZU1haW5Mb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZU1haW5Mb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgICBsb2dnZXIubG9nKFwiUmVxdWVzdCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpIHtcbiAgICBpZiAoIXRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNVcGRhdGVzU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCB0aGVyZSBpcyBubyBpbmNyZW1lbnRhbCB5ZXRcbiAgICAgIC8vIG9yIGlmIHRoZSB1cGRhdGVzIGhhdmUgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ2hhbmdlZCA9IGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2dzIGNoYW5nZSBzdGF0dXM6IFwiLCBoYXNDaGFuZ2VkKTtcbiAgICBpZiAoIWhhc0NoYW5nZWQpIHJldHVybjtcblxuICAgIGNvbnN0IGxvZ0RhdGEgPSBhd2FpdCB0aGlzLnBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKTtcbiAgICBpZiAobG9nRGF0YSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNlbmRpbmcgaW5jcmVtZW50YWwgbG9nc1wiLCBsb2dEYXRhKTtcbiAgICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MobG9nRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlQXJyaXZhbExvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc0Fycml2YWxMb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBvciBhcnJpdmFsIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja0ZvckxhdGVzdENoYW5nZXMoKSB7XG4gICAgY29uc3QgaHdtID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9faHdtXCIpO1xuICAgIGlmICh0aGlzLmhpZ2hXYXRlck1hcmsgIT09IGh3bSkge1xuICAgICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbdXJsLCBoYXNoLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAwLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIHU6IHVybCxcbiAgICAgIG9uSGFzaFBjdDogaGFzaCxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VNYWluTG9nRGF0YSgpIHtcbiAgICBjb25zdCBib2R5ID0ge307XG4gICAgaWYgKCF3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMod2luZG93LmJlYWdsZUluZm9MYXllcikpIHtcbiAgICAgIGlmICgha2V5LnN0YXJ0c1dpdGgoXCJfXCIpICYmIHZhbHVlICE9PSBudWxsKSBib2R5W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgYm9keS5sYyA9IDE7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFthLCBlLCBmLCBzLCBtLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZlwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm1cIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMixcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICBhLCBlLCBmLCBzLCBtLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxldCB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBleGl0IGV2ZW50IGxpc3RlbmVyXCIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBiZWZvcmV1bmxvYWQgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBwYWdlaGlkZSBldmVudFwiKTtcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgLy8gSWYgcGFnZSBpcyBub3QgdmlzaWJsZSBhbmQgZG9lc24ndCBiZWNvbWUgdmlzaWJsZSB3aXRoaW4gMzAgc2Vjb25kcywgc2VuZCBsb2dzXG4gICAgICAgIHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluIHRpbWVvdXRcIik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gQ2xlYXIgdGltZW91dCB3aGVuIHBhZ2UgaXMgdmlzaWJsZSB0byBtYWtlIHN1cmUgd2Ugc2VuZCB0aGUgbGF0ZXN0IGxvZ3MgcG9zc2libGVcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgfVxuXG4gIHF1ZXVlTG9ncyhsb2dEYXRhKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fCB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZmV0Y2goTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgY29uc3QgcXVldWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghcXVldWVkKSBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3MgcXVldWVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gICAgaWYgKHF1ZXVlZCkgcmV0dXJuO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uaXRvcjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7ZmV0Y2hUcmVhdG1lbnRzLCBmZXRjaFRyZWF0bWVudFdlaWdodHN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5XCIpO1xuXG5jbGFzcyBUcmVhdG1lbnRSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IGJvZHk7XG4gICAgdGhpcy50cmVhdG1lbnRzID0gdHJlYXRtZW50cztcbiAgICB0aGlzLnRyZWF0bWVudFdlaWdodHMgPSB0cmVhdG1lbnRXZWlnaHRzO1xuICAgIHRoaXMuY3VycmVudFBhZ2VUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRzKCkge1xuICAgIGxvZ2dlci5sb2coXCJMb2FkaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3Qge1RSRUFUTUVOVFN9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShUUkVBVE1FTlRTKSk7XG4gICAgbGV0IHRyZWF0bWVudHMgPSB0cmVhdG1lbnRzT2JqPy50cmVhdG1lbnRzO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyZWF0bWVudHNPYmo/LnRpbWVzdGFtcDtcbiAgICBpZiAoIXRyZWF0bWVudHMgfHwgIXRpbWVzdGFtcCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgIH07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgaWYgKGVsYXBzZWRIb3VycyA+IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIGFyZSBleHBpcmVkXCIpO1xuICAgICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJUcmVhdG1lbnRzIGFyZSBsb2FkZWQgZnJvbSBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudFdlaWdodHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWlnaHRzT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5XRUlHSFRTKTtcbiAgICAgIGlmICh3ZWlnaHRzT2JqKSB7XG4gICAgICAgIHdlaWdodHNPYmogPSBKU09OLnBhcnNlKHdlaWdodHNPYmopO1xuICAgICAgICBpZiAod2VpZ2h0c09iai50aW1lc3RhbXApIHtcbiAgICAgICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIHdlaWdodHNPYmoudGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICAgICAgaWYgKGVsYXBzZWRIb3VycyA8IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSByZXR1cm4gd2VpZ2h0c09iai53ZWlnaHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzKCk7XG4gICAgICBpZiAoIXdlaWdodHNPYmopIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB3ZWlnaHRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHdlaWdodHNPYmogPSB7d2VpZ2h0czogd2VpZ2h0c09iaiwgdGltZXN0YW1wOiBEYXRlLm5vdygpfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUywgSlNPTi5zdHJpbmdpZnkod2VpZ2h0c09iaikpO1xuICAgICAgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSkge1xuICAgIGxldCBDUFQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19lUnVsZXMuUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgQ1BUID0gQ1BUPy5bMF0gfHwgbnVsbDtcbiAgICBpZiAoIUNQVCkgcmV0dXJuIFtdO1xuICAgIHRoaXMuY3VycmVudFBhZ2VUeXBlID0gQ1BUO1xuICAgIGxldCBtYXRjaGVkVHJlYXRtZW50cyA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IEpTT04ucGFyc2UobWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgICBtYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigobXQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja1BhZ2VUeXBlKG10LnBhZ2VUeXBlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2dnZXIubG9nKGAke21hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIHNlZ21lbnQgbWF0Y2hlZGApO1xuICAgICAgICByZXR1cm4gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgbWF0Y2hlZCByb2JvdHM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgICBtYXRjaGVkVHJlYXRtZW50cyA9IFtdO1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IHRoaXM7XG4gICAgY29uc3QgdXNlclNlZ21lbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKTtcbiAgICBpZiAoIXVzZXJTZWdtZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlclNlZ21lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0c1t1c2VyU2VnbWVudF07XG4gICAgICBpZiAoIXVzZXJTZWdtZW50V2VpZ2h0cykgcmV0dXJuIFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICBsZXQgc2VnbWVudGVkV2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LndlaWdodDtcbiAgICAgICAgaWYgKCFzZWdtZW50ZWRXZWlnaHQpIHtcbiAgICAgICAgICBpZiAodHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHtcbiAgICAgICAgICAgIHNlZ21lbnRlZFdlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuZGVwZW5kYW50X29uX3RyZWF0bWVudF0/LndlaWdodDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z01vZGUgPT09IDEpIHNlZ21lbnRlZFdlaWdodCA9IDEwMDtcbiAgICAgICAgICBpZiAoIXNlZ21lbnRlZFdlaWdodCkgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdHJlYXRtZW50LndlaWdodCA9IHNlZ21lbnRlZFdlaWdodDtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnQuYWN0aW9ucy5zb21lKChhKSA9PiBhLnZhcmlhbnRzKSkge1xuICAgICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLnB1c2godHJlYXRtZW50KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiB0cmVhdG1lbnQuYWN0aW9ucykge1xuICAgICAgICAgIGlmICghYWN0aW9uLnZhcmlhbnRzKSBjb250aW51ZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhbnRLZXkgb2YgT2JqZWN0LmtleXMoYWN0aW9uLnZhcmlhbnRzKSkge1xuICAgICAgICAgICAgaWYgKHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50cyAmJiB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdLnZhcmlhbnRzW3ZhcmlhbnRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXRjaGVkVHJlYXRtZW50cy5wdXNoKHRyZWF0bWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkobWF0Y2hlZFRyZWF0bWVudHMpKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpO1xuICB9XG5cbiAgY2hlY2tQYWdlVHlwZShwYWdlVHlwZXMpIHtcbiAgICBjb25zdCB7Y3VycmVudFBhZ2VUeXBlfSA9IHRoaXM7XG4gICAgaWYgKHBhZ2VUeXBlcyA9PT0gbnVsbCB8fCBwYWdlVHlwZXMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VUeXBlcykpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJQYWdlIFR5cGVzIHNob3VsZCBiZSBhbiBhcnJheVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHBhZ2VUeXBlc1swXS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgcGFnZVR5cGVzID0gcGFnZVR5cGVzLm1hcCgocHQpID0+IHB0LnN1YnN0cigxKSk7XG4gICAgICByZXR1cm4gIXBhZ2VUeXBlcy5pbmNsdWRlcyhjdXJyZW50UGFnZVR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZVR5cGVzLmluY2x1ZGVzKGN1cnJlbnRQYWdlVHlwZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJlYXRtZW50UmVwb3NpdG9yeTtcbiIsImltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiUmVwbGFjZVV0aWxzXCIpO1xuXG5jb25zdCByZXBsYWNlciA9IGFzeW5jICh2YWx1ZSwgcmVwbGFjZUZuKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgW2ksIHZhbF0gb2YgdmFsdWUuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjdXJyZW50UmVwbGFjZUZuID0gQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pID8gcmVwbGFjZUZuW2ldIDogcmVwbGFjZUZuIHx8IFwiXCI7XG4gICAgICBpZiAodHlwZW9mIGN1cnJlbnRSZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IoY3VycmVudFJlcGxhY2VGbik7XG4gICAgICAgIHZhbHVlW2ldID0gcmVwbGFjZUFsbCh2YWwsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWVbaV0gPSByZXBsYWNlRm5FeGVjdXRvcihjdXJyZW50UmVwbGFjZUZuLCB2YWwpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlcGxhY2VGbikpIHtcbiAgICBmb3IgKGNvbnN0IHJGbiBvZiByZXBsYWNlRm4pIHtcbiAgICAgIGlmICh0eXBlb2YgckZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJGbik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IockZuLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgcmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pO1xuICAgICAgdmFsdWUgPSByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHJlcGxhY2VGbkV4ZWN1dG9yKHJlcGxhY2VGbiwgdmFsdWUsIHNpbmdsZSA9IGZhbHNlKSB7XG4gIGlmIChyZXBsYWNlRm4gJiYgdmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSkge1xuICAgIGxvZ2dlci5sb2coXCJFeGVjdXRpbmcgcmVwbGFjZSBmdW5jdGlvbjogXCIsIHJlcGxhY2VGbik7XG4gICAgY29uc3QgcmVwbGFjZUZ1bmN0aW9uID0gRnVuY3Rpb24ocmVwbGFjZUZuKTtcbiAgICBpZiAoc2luZ2xlKSByZXR1cm4gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgICByZXR1cm4gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbikge1xuICBjb25zdCB7c3RvcmFnZSwga2V5LCBrZXlGYWxsYmFjaywgdHlwZX0gPSByZXBsYWNlRm47XG4gIHN3aXRjaCAoc3RvcmFnZSkge1xuICAgIGNhc2UgXCJzZXNzaW9uXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gbnVsbDtcbiAgICAgIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5RmFsbGJhY2spO1xuICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXBsYWNlVmFsID0gSlNPTi5wYXJzZShyZXBsYWNlVmFsKTtcbiAgICAgICAgICByZXBsYWNlVmFsID0gcmVwbGFjZVZhbFtyZXBsYWNlVmFsLmxlbmd0aCAtIDFdW3R5cGVdO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZCBub3QgcGFyc2UgJHtyZXBsYWNlVmFsfWApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gICAgY2FzZSBcImluZm8tbGF5ZXJcIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleUZhbGxiYWNrKTtcbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlcjtcbiIsImNvbnN0IGluc3RhbmNlT2ZBbnkgPSAob2JqZWN0LCBjb25zdHJ1Y3RvcnMpID0+IGNvbnN0cnVjdG9ycy5zb21lKChjKSA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xubGV0IGN1cnNvckFkdmFuY2VNZXRob2RzO1xuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcbiAgICByZXR1cm4gKGlkYlByb3h5YWJsZVR5cGVzIHx8XG4gICAgICAgIChpZGJQcm94eWFibGVUeXBlcyA9IFtcbiAgICAgICAgICAgIElEQkRhdGFiYXNlLFxuICAgICAgICAgICAgSURCT2JqZWN0U3RvcmUsXG4gICAgICAgICAgICBJREJJbmRleCxcbiAgICAgICAgICAgIElEQkN1cnNvcixcbiAgICAgICAgICAgIElEQlRyYW5zYWN0aW9uLFxuICAgICAgICBdKSk7XG59XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkge1xuICAgIHJldHVybiAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHxcbiAgICAgICAgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5hZHZhbmNlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxuICAgICAgICBdKSk7XG59XG5jb25zdCBjdXJzb3JSZXF1ZXN0TWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uRG9uZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh3cmFwKHJlcXVlc3QucmVzdWx0KSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH0pO1xuICAgIHByb21pc2VcbiAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgIC8vIFNpbmNlIGN1cnNvcmluZyByZXVzZXMgdGhlIElEQlJlcXVlc3QgKCpzaWdoKiksIHdlIGNhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWxcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJDdXJzb3IpIHtcbiAgICAgICAgICAgIGN1cnNvclJlcXVlc3RNYXAuc2V0KHZhbHVlLCByZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYXRjaGluZyB0byBhdm9pZCBcIlVuY2F1Z2h0IFByb21pc2UgZXhjZXB0aW9uc1wiXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgLy8gVGhpcyBtYXBwaW5nIGV4aXN0cyBpbiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYnV0IGRvZXNuJ3QgZG9lc24ndCBleGlzdCBpbiB0cmFuc2Zvcm1DYWNoZS4gVGhpc1xuICAgIC8vIGlzIGJlY2F1c2Ugd2UgY3JlYXRlIG1hbnkgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0LlxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcbiAgICAvLyBFYXJseSBiYWlsIGlmIHdlJ3ZlIGFscmVhZHkgY3JlYXRlZCBhIGRvbmUgcHJvbWlzZSBmb3IgdGhpcyB0cmFuc2FjdGlvbi5cbiAgICBpZiAodHJhbnNhY3Rpb25Eb25lTWFwLmhhcyh0eCkpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBkb25lID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvciB8fCBuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydEVycm9yJywgJ0Fib3J0RXJyb3InKSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIENhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgdHJhbnNhY3Rpb25Eb25lTWFwLnNldCh0eCwgZG9uZSk7XG59XG5sZXQgaWRiUHJveHlUcmFwcyA9IHtcbiAgICBnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyYW5zYWN0aW9uLmRvbmUuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RvbmUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBmb3Igb2JqZWN0U3RvcmVOYW1lcyBiZWNhdXNlIG9mIEVkZ2UuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ29iamVjdFN0b3JlTmFtZXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1ha2UgdHguc3RvcmUgcmV0dXJuIHRoZSBvbmx5IHN0b3JlIGluIHRoZSB0cmFuc2FjdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBtYW55LlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1sxXVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IHJlY2VpdmVyLm9iamVjdFN0b3JlKHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEVsc2UgdHJhbnNmb3JtIHdoYXRldmVyIHdlIGdldCBiYWNrLlxuICAgICAgICByZXR1cm4gd3JhcCh0YXJnZXRbcHJvcF0pO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldCwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24gJiZcbiAgICAgICAgICAgIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHJlcGxhY2VUcmFwcyhjYWxsYmFjaykge1xuICAgIGlkYlByb3h5VHJhcHMgPSBjYWxsYmFjayhpZGJQcm94eVRyYXBzKTtcbn1cbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbihmdW5jKSB7XG4gICAgLy8gRHVlIHRvIGV4cGVjdGVkIG9iamVjdCBlcXVhbGl0eSAod2hpY2ggaXMgZW5mb3JjZWQgYnkgdGhlIGNhY2hpbmcgaW4gYHdyYXBgKSwgd2VcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXG4gICAgLy8gRWRnZSBkb2Vzbid0IHN1cHBvcnQgb2JqZWN0U3RvcmVOYW1lcyAoYm9vbyksIHNvIHdlIHBvbHlmaWxsIGl0IGhlcmUuXG4gICAgaWYgKGZ1bmMgPT09IElEQkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiAmJlxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmVOYW1lcywgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgdHggPSBmdW5jLmNhbGwodW53cmFwKHRoaXMpLCBzdG9yZU5hbWVzLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHR4KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ3Vyc29yIG1ldGhvZHMgYXJlIHNwZWNpYWwsIGFzIHRoZSBiZWhhdmlvdXIgaXMgYSBsaXR0bGUgbW9yZSBkaWZmZXJlbnQgdG8gc3RhbmRhcmQgSURCLiBJblxuICAgIC8vIElEQiwgeW91IGFkdmFuY2UgdGhlIGN1cnNvciBhbmQgd2FpdCBmb3IgYSBuZXcgJ3N1Y2Nlc3MnIG9uIHRoZSBJREJSZXF1ZXN0IHRoYXQgZ2F2ZSB5b3UgdGhlXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcbiAgICAvLyB3aXRoIHJlYWwgcHJvbWlzZXMsIHNvIGVhY2ggYWR2YW5jZSBtZXRob2RzIHJldHVybnMgYSBuZXcgcHJvbWlzZSBmb3IgdGhlIGN1cnNvciBvYmplY3QsIG9yXG4gICAgLy8gdW5kZWZpbmVkIGlmIHRoZSBlbmQgb2YgdGhlIGN1cnNvciBoYXMgYmVlbiByZWFjaGVkLlxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKGN1cnNvclJlcXVlc3RNYXAuZ2V0KHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHdyYXAoZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIHJldHVybiB3cmFwRnVuY3Rpb24odmFsdWUpO1xuICAgIC8vIFRoaXMgZG9lc24ndCByZXR1cm4sIGl0IGp1c3QgY3JlYXRlcyBhICdkb25lJyBwcm9taXNlIGZvciB0aGUgdHJhbnNhY3Rpb24sXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbilcbiAgICAgICAgY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHZhbHVlKTtcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodmFsdWUsIGlkYlByb3h5VHJhcHMpO1xuICAgIC8vIFJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrIGlmIHdlJ3JlIG5vdCBnb2luZyB0byB0cmFuc2Zvcm0gaXQuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gd3JhcCh2YWx1ZSkge1xuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxuICAgIC8vIElEQiBpcyB3ZWlyZCBhbmQgYSBzaW5nbGUgSURCUmVxdWVzdCBjYW4geWllbGQgbWFueSByZXNwb25zZXMsIHNvIHRoZXNlIGNhbid0IGJlIGNhY2hlZC5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJSZXF1ZXN0KVxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSB0cmFuc2Zvcm1lZCB0aGlzIHZhbHVlIGJlZm9yZSwgcmV1c2UgdGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxuICAgIC8vIFRoaXMgaXMgZmFzdGVyLCBidXQgaXQgYWxzbyBwcm92aWRlcyBvYmplY3QgZXF1YWxpdHkuXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSk7XG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXG4gICAgLy8gVGhlc2UgbWF5IGJlIHByaW1pdGl2ZSB0eXBlcywgc28gdGhleSBjYW4ndCBiZSBXZWFrTWFwIGtleXMuXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChuZXdWYWx1ZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG59XG5jb25zdCB1bndyYXAgPSAodmFsdWUpID0+IHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuXG5leHBvcnQgeyByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYXMgYSwgaW5zdGFuY2VPZkFueSBhcyBpLCByZXBsYWNlVHJhcHMgYXMgciwgdW53cmFwIGFzIHUsIHdyYXAgYXMgdyB9O1xuIiwiaW1wb3J0IHsgdyBhcyB3cmFwLCByIGFzIHJlcGxhY2VUcmFwcyB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuZXhwb3J0IHsgdSBhcyB1bndyYXAsIHcgYXMgd3JhcCB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuXG4vKipcbiAqIE9wZW4gYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqIEBwYXJhbSB2ZXJzaW9uIFNjaGVtYSB2ZXJzaW9uLlxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cbiAqL1xuZnVuY3Rpb24gb3BlbkRCKG5hbWUsIHZlcnNpb24sIHsgYmxvY2tlZCwgdXBncmFkZSwgYmxvY2tpbmcsIHRlcm1pbmF0ZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5Qcm9taXNlID0gd3JhcChyZXF1ZXN0KTtcbiAgICBpZiAodXBncmFkZSkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHVwZ3JhZGUod3JhcChyZXF1ZXN0LnJlc3VsdCksIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIHdyYXAocmVxdWVzdC50cmFuc2FjdGlvbiksIGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsIChldmVudCkgPT4gYmxvY2tlZChcbiAgICAgICAgLy8gQ2FzdGluZyBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0LURPTS1saWItZ2VuZXJhdG9yL3B1bGwvMTQwNVxuICAgICAgICBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCBldmVudCkpO1xuICAgIH1cbiAgICBvcGVuUHJvbWlzZVxuICAgICAgICAudGhlbigoZGIpID0+IHtcbiAgICAgICAgaWYgKHRlcm1pbmF0ZWQpXG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHRlcm1pbmF0ZWQoKSk7XG4gICAgICAgIGlmIChibG9ja2luZykge1xuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcigndmVyc2lvbmNoYW5nZScsIChldmVudCkgPT4gYmxvY2tpbmcoZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgZXZlbnQpKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xuICAgIHJldHVybiBvcGVuUHJvbWlzZTtcbn1cbi8qKlxuICogRGVsZXRlIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZURCKG5hbWUsIHsgYmxvY2tlZCB9ID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xuICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsIChldmVudCkgPT4gYmxvY2tlZChcbiAgICAgICAgLy8gQ2FzdGluZyBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0LURPTS1saWItZ2VuZXJhdG9yL3B1bGwvMTQwNVxuICAgICAgICBldmVudC5vbGRWZXJzaW9uLCBldmVudCkpO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcChyZXF1ZXN0KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XG59XG5cbmNvbnN0IHJlYWRNZXRob2RzID0gWydnZXQnLCAnZ2V0S2V5JywgJ2dldEFsbCcsICdnZXRBbGxLZXlzJywgJ2NvdW50J107XG5jb25zdCB3cml0ZU1ldGhvZHMgPSBbJ3B1dCcsICdhZGQnLCAnZGVsZXRlJywgJ2NsZWFyJ107XG5jb25zdCBjYWNoZWRNZXRob2RzID0gbmV3IE1hcCgpO1xuZnVuY3Rpb24gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkge1xuICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIElEQkRhdGFiYXNlICYmXG4gICAgICAgICEocHJvcCBpbiB0YXJnZXQpICYmXG4gICAgICAgIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FjaGVkTWV0aG9kcy5nZXQocHJvcCkpXG4gICAgICAgIHJldHVybiBjYWNoZWRNZXRob2RzLmdldChwcm9wKTtcbiAgICBjb25zdCB0YXJnZXRGdW5jTmFtZSA9IHByb3AucmVwbGFjZSgvRnJvbUluZGV4JC8sICcnKTtcbiAgICBjb25zdCB1c2VJbmRleCA9IHByb3AgIT09IHRhcmdldEZ1bmNOYW1lO1xuICAgIGNvbnN0IGlzV3JpdGUgPSB3cml0ZU1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpO1xuICAgIGlmIChcbiAgICAvLyBCYWlsIGlmIHRoZSB0YXJnZXQgZG9lc24ndCBleGlzdCBvbiB0aGUgdGFyZ2V0LiBFZywgZ2V0QWxsIGlzbid0IGluIEVkZ2UuXG4gICAgISh0YXJnZXRGdW5jTmFtZSBpbiAodXNlSW5kZXggPyBJREJJbmRleCA6IElEQk9iamVjdFN0b3JlKS5wcm90b3R5cGUpIHx8XG4gICAgICAgICEoaXNXcml0ZSB8fCByZWFkTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kID0gYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xuICAgICAgICAvLyBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiB1bmRlZmluZWQgZ3ppcHBzIGJldHRlciwgYnV0IGZhaWxzIGluIEVkZ2UgOihcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5Jyk7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0eC5zdG9yZTtcbiAgICAgICAgaWYgKHVzZUluZGV4KVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmluZGV4KGFyZ3Muc2hpZnQoKSk7XG4gICAgICAgIC8vIE11c3QgcmVqZWN0IGlmIG9wIHJlamVjdHMuXG4gICAgICAgIC8vIElmIGl0J3MgYSB3cml0ZSBvcGVyYXRpb24sIG11c3QgcmVqZWN0IGlmIHR4LmRvbmUgcmVqZWN0cy5cbiAgICAgICAgLy8gTXVzdCByZWplY3Qgd2l0aCBvcCByZWplY3Rpb24gZmlyc3QuXG4gICAgICAgIC8vIE11c3QgcmVzb2x2ZSB3aXRoIG9wIHZhbHVlLlxuICAgICAgICAvLyBNdXN0IGhhbmRsZSBib3RoIHByb21pc2VzIChubyB1bmhhbmRsZWQgcmVqZWN0aW9ucylcbiAgICAgICAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0YXJnZXRbdGFyZ2V0RnVuY05hbWVdKC4uLmFyZ3MpLFxuICAgICAgICAgICAgaXNXcml0ZSAmJiB0eC5kb25lLFxuICAgICAgICBdKSlbMF07XG4gICAgfTtcbiAgICBjYWNoZWRNZXRob2RzLnNldChwcm9wLCBtZXRob2QpO1xuICAgIHJldHVybiBtZXRob2Q7XG59XG5yZXBsYWNlVHJhcHMoKG9sZFRyYXBzKSA9PiAoe1xuICAgIC4uLm9sZFRyYXBzLFxuICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcbiAgICBoYXM6ICh0YXJnZXQsIHByb3ApID0+ICEhZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuaGFzKHRhcmdldCwgcHJvcCksXG59KSk7XG5cbmV4cG9ydCB7IGRlbGV0ZURCLCBvcGVuREIgfTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZV9jYWNoZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBzdG9yZToge1xuICAgIG5hbWU6IFwiaW5mb0NhY2hlXCIsXG4gICAgaW5kZXhlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIml4X3NrdVwiLFxuICAgICAgICBmaWVsZHM6IFwic2t1XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgb3B0aW9uczoge2tleVBhdGg6IFwic2t1XCJ9LFxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsIlxuaW1wb3J0IHtvcGVuREJ9IGZyb20gXCJpZGJcIjtcbmltcG9ydCB7ZmV0Y2hQcm9kdWN0SW5mb30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5XCIpO1xuY2xhc3MgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kZXhlZERCID0gbnVsbDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGFzeW5jIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgY29uc3Qge2RiTmFtZSwgdmVyc2lvbn0gPSBjb25maWc7XG4gICAgY29uc3QgZGIgPSBhd2FpdCBvcGVuREIoZGJOYW1lLCB2ZXJzaW9uLCB7XG4gICAgICB1cGdyYWRlKGRiLCBvbGRWZXJzaW9uKSB7XG4gICAgICAgIHN3aXRjaCAob2xkVmVyc2lvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGRiLmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5pbmRleGVkREIgPSBkYjtcbiAgfVxuXG4gIGFzeW5jIGdldERCKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLmluZGV4ZWREQik7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlByb2R1Y3QgaW5mbyBkYiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgMzAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRTdG9yZShyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIHJldHVybiBkYi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSwgcmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikuc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKHBheWxvYWQpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuZ2V0U3RvcmUodHJ1ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIGNvbnN0IHNhdmVQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBsb2FkIG9mIHBheWxvYWQpIHtcbiAgICAgICAgbG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHNhdmVQcm9taXNlcy5wdXNoKHN0b3JlLnB1dChsb2FkKSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChzYXZlUHJvbWlzZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgIGF3YWl0IHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjbGVhcigpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuZ2V0U3RvcmUodHJ1ZSk7XG4gICAgYXdhaXQgc3RvcmUuY2xlYXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3luYyBnZXQoc2t1KSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGIuZ2V0KGNvbmZpZy5zdG9yZS5uYW1lLCBza3UpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBjb3VudCgpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5jb3VudChjb25maWcuc3RvcmUubmFtZSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIGdldEN1cnNvcigpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCBkYi50cmFuc2FjdGlvbihjb25maWcuc3RvcmUubmFtZSkuc3RvcmUub3BlbkN1cnNvcigpO1xuICAgIHJldHVybiBjdXJzb3I7XG4gIH1cblxuICBhc3luYyBwZXJzaXN0UHJvZHVjdEluZm8oKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiY2hlY2stZXhpc3RpbmctcHJvZC1pbmZvXCIpO1xuICAgIGNvbnN0IGV4aXN0aW5nUHJvZEluZm8gPSBhd2FpdCB0aGlzLmNvdW50KCk7XG4gICAgaWYgKGV4aXN0aW5nUHJvZEluZm8pIHtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gZm91bmRcIik7XG4gICAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCB0aGlzLmdldEN1cnNvcigpO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gY3Vyc29yLnZhbHVlLnRpbWVzdGFtcDtcbiAgICAgIGNvbnN0IGVsYXBzZWRTZWNvbmRzID0gKERhdGUubm93KCkgLyAxMDAwKSAtIHRpbWVzdGFtcDtcbiAgICAgIC8vIFJlLWZldGNoIHByb2R1Y3QgaW5mbyBvbmNlIGEgZGF5XG4gICAgICBpZiAoZWxhcHNlZFNlY29uZHMgPCA4NjQwMCkgcmV0dXJuO1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBpcyBleHBpcmVkXCIpO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGluZy1wcm9kLWluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gZmV0Y2hQcm9kdWN0SW5mbygpO1xuICAgIGxldCBjbGVhclByb21pc2UgPSBudWxsO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSBjbGVhclByb21pc2UgPSB0aGlzLmNsZWFyKCk7XG4gICAgY29uc3QgW3Byb2R1Y3RJbmZvQXJyYXldID0gYXdhaXQgUHJvbWlzZS5hbGwoW3Byb2R1Y3RJbmZvUHJvbWlzZSwgY2xlYXJQcm9taXNlXSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mb0FycmF5IHx8ICFwcm9kdWN0SW5mb0FycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtcHJvZC1pbmZvXCIpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSh0aGlzLnByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicGVyc2lzdGVkLXByb2QtaW5mb1wiKTtcbiAgfVxuXG4gIHByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgY29uc3QgcGF5bG9hZHMgPSBbXTtcbiAgICBjb25zdCBmaWVsZE5hbWVzID0gcHJvZHVjdEluZm9BcnJheS5zaGlmdCgpO1xuICAgIGZpZWxkTmFtZXMuc2hpZnQoKTtcbiAgICBmb3IgKGNvbnN0IGluZm8gb2YgcHJvZHVjdEluZm9BcnJheSkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHtza3U6IGluZm8uc2hpZnQoKX07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF5bG9hZFtmaWVsZE5hbWVzW2ldXSA9IGluZm9baV0gfHwgbnVsbDtcbiAgICAgIH1cbiAgICAgIHBheWxvYWRzLnB1c2gocGF5bG9hZCk7XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5O1xuIiwiaW1wb3J0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkgZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7aWRiUmVhZHl9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBTdG9yZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnN0YW5jZTogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgYXdhaXQgaWRiUmVhZHkoKTtcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSgpO1xuICAgICAgICAvLyBIaWRlIHRoZSBjb25zdHJ1Y3RvciBzbyB0aGUgcmV0dXJuZWQgb2JqZWN0IGNhbid0IGJlIG5ldydkLi4uXG4gICAgICAgIGluc3RhbmNlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuICB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXIsIGdldFVuc2VjdXJlSGFzaH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge3JlcGxhY2VBbGwsIHR1cmtpc2hUb0xvd2VyfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgSURMRV9USU1FT1VUfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgcmVwbGFjZXIgZnJvbSBcIi4vcmVwbGFjZS11dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5hc3luYyBmdW5jdGlvbiBhcHBseUFjdGlvbnMoYWN0aW9ucykge1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlQXBwbHlBY3Rpb25zXCIpO1xuICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUd9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZW1vdmluZzogXCIsIHNlbGVjdG9yKTtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmJlZm9yZSh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZnRlclwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYWZ0ZXI6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hZnRlcih2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhcHBlbmRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwZW5kaW5nIHZhbHVlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vZGFsXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudC5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGVsbSA9PSBlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzcGxheU1vZGFsKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicG9wdXBcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSAhPT0gMCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiUG9wdXAgYWxyZWFkeSBkaXNwbGF5ZWQgaW4gc2Vzc2lvblwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgUG9wdXA6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAocFR5cGUpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZXhpdEludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGV4aXQgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtyLCBkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImRcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBkID09PSBcInN0cmluZ1wiICYmICFyLmluY2x1ZGVzKGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWRsZVRpbWVyKElETEVfVElNRU9VVCwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiY29weUludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGNvcHkgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXBwZW5kIHBvcHVwIHRvIGJvZHkgYWZ0ZXIgdGltZW91dCBleHBpcmVzXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlQb3B1cCgpO1xuICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgVHlwZTogJHt0eXBlfSBub3QgZm91bmQgZm9yIG9wZXJhdG9yOiAke29wZXJhdG9yfWApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGNvbnN0IHNjcmlwdElEID0gZ2V0VW5zZWN1cmVIYXNoKHZhbHVlKTtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNjcmlwdElEKSkge1xuICAgICAgICBsb2dnZXIubG9nKFwiU2NyaXB0IGFscmVhZHkgaW4gcGFnZSFcIik7XG4gICAgICB9IGVsc2UgZWxlbWVudC5hcHBlbmQoYDxzY3JpcHQgaWQ9JHtzY3JpcHRJRH0+JHt2YWx1ZX08L3NjcmlwdD5gKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcIm1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhgTW92aW5nICR7bW92ZV9zZWxlY3Rvcl8xfSB0byAke21vdmVfc2VsZWN0b3JfMn1gKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGRlc3RpbmF0aW9uLnByZXBlbmQoc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInByb2R1Y3RJbmZvTG9va3VwXCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgIGVsZW1lbnQuYmVmb3JlKHJlcyk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJ0ZXh0LXRyYW5zZm9ybVwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNhcGl0YWxpemVcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBBcnJheS5mcm9tKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoZS5pbm5lclRleHQ/LmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpLnNwbGl0KFwiXFxuXCIpLm1hcCgoc2VudGVuY2UpID0+XG4gICAgICAgICAgICAgICAgc2VudGVuY2Uuc3BsaXQoXCIgXCIpLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICApLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dClcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gdGV4dC10cmFuc2Zvcm0gdHlwZVwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJhaS1zdWdnZXN0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGl0bGUtY2hhbmdlXCI6IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0dGluZyB0aXRsZSBzdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCBmaW5hbFRpdGxlID0gYXdhaXQgcHJlcGFyZUZpbmFsVGl0bGUoKTtcbiAgICAgICAgICBpZiAoIWZpbmFsVGl0bGUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgdGl0bGUtY2hhbmdlIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmNvbnRlbnRzKCkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZVR5cGUgPT0gMztcbiAgICAgICAgICB9KVswXS5ub2RlVmFsdWUgPSBmaW5hbFRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGQtZGVzY3JpcHRpb25cIjoge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXR0aW5nIGRlc2NyaXB0aW9uIHN1Z2dlc3Rpb25zXCIpO1xuICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRWxtID0gYXdhaXQgcHJlcGFyZURlc2NFbG0odmFsdWUpO1xuICAgICAgICAgIGlmICghZGVzY3JpcHRpb25FbG0pIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDYW5ub3QgYXBwbHkgYWRkLWRlc2NyaXB0aW9uIHRoZXJlIGlzIG5vIHN1Z2dlc3Rpb24hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmJlZm9yZShkZXNjcmlwdGlvbkVsbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggb3BlcmF0b3IgZXhpc3RzIHlldFwiLCBvcGVyYXRvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHByZXBhcmVEZXNjRWxtID0gYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1KTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvPy5tYXJrZXRpbmdDb3B5KSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBObyBkZXNjcmlwdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWRIdG1sU3RyaW5nID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8ubWFya2V0aW5nQ29weSwgdmFsdWUpO1xuICAgIHJldHVybiB1cGRhdGVkSHRtbFN0cmluZztcbiAgfTtcblxuICBjb25zdCBwcmVwYXJlRmluYWxUaXRsZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3UpO1xuICAgIGlmICghcHJvZHVjdEluZm8/LnRpdGxlQXVnbWVudCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gdGl0bGUgc3VnZ2VzdGlvbiBmb3VuZCBmb3Igc2t1ICR7c2t1fWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IHByb2R1Y3RJbmZvLnRpdGxlQXVnbWVudCArIGAgKCR7c2t1fSlgO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvZHVjdEluZm8gPSBhc3luYyAodHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSkgPT4ge1xuICAgIC8vIGdldCBrZXlzIG9mIHByb2R1Y3RJbmZvXG4gICAgY29uc3Qgc2t1TGlzdCA9IHByb2R1Y3RJbmZvU3RvcmFnZSA9PT0gXCJiYXNrZXRcIiA/XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCIsIHRydWUpIDpcbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGxldCByZXMgPSBudWxsO1xuICAgIGlmICghc2t1TGlzdCB8fCBza3VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHNrdSBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3VMaXN0WzBdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyB0cmFuc2NhdGlvbkluMldlZWtzIFwiLCBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBBZGRUb0NhcnRDb3VudCBcIiwgcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcInByb2R1Y3RWaWV3Q291bnRcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yXCIsIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIm5vIHN1Y2ggdHlwZSBmb3VuZCBmb3IgcHJvZHVjdEluZm9Mb29rdXAgb3BlcmF0b3I6IFwiKyB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlID0gYXN5bmMgKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRUaXRsZXMgPSAhQXJyYXkuaXNBcnJheSh0aXRsZXMpID8gW3RpdGxlc10gOiB0aXRsZXM7XG4gICAgZm9yIChjb25zdCBwYXJzZWRUaXRsZSBvZiBwYXJzZWRUaXRsZXMpIHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gcGFyc2VkVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikge1xuICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICBpZiAoaWQgJiYgaWQgPT09IFwibmQtcG9wdXBfX3dyYXBwZXJcIikge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBpZiAoY2xhc3NMaXN0ICYmIGNsYXNzTGlzdC5jb250YWlucyhcIm5kLW1vZGFsX193cmFwcGVyXCIpKSB7XG4gICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UG9wdXAgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgPiAwKSByZXR1cm47XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDEpO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuXG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfSwgMTUwMDApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNb2RhbCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSByZXR1cm47XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikpIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5zdHlsZVtcImRpc3BsYXlcIl0gPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBvcHVwID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIGlzTW9kYWw9ZmFsc2UpID0+IHtcbiAgICAvLyBDcmVhdGUgcG9wdXAgd3JhcHBlclxuICAgIGNvbnN0IHBvcHVwV3JhcHBlciA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtcG9wdXBfX3dyYXBwZXJcIik7XG4gICAgaWYgKGlzTW9kYWwpIHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibmQtbW9kYWxfX3dyYXBwZXJcIik7XG4gICAgaWYgKCFpc01vZGFsKSBwb3B1cFdyYXBwZXIuaWQgPSBcIm5kLXBvcHVwX193cmFwcGVyXCI7XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uU3R5bGUgPSBpc01vZGFsID8gXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlX19jb2xvcmVkXCIgOiBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VcIjtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQocG9wdXBDbG9zZUJ1dHRvblN0eWxlKTtcbiAgICBwb3B1cENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGlmIChpc01vZGFsKSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudFNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRlbnRTZWxlY3RvcikpO1xuICAgICAgd2hpbGUgKHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikgJiYgY29udGVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCBjb250ZW50cy5zaGlmdCgpLnNyYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGZyb20gYWN0aW9uIGFuZCBhcHBlbmQgY2xvc2UgYnV0dG9uXG4gICAgY29uc3QgdGVtcGxhdGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB2YWx1ZS50cmltKCk7XG4gICAgY29uc3QgcG9wdXAgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZUJ1dHRvbik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgIC8vIFJlbW92ZSBvbGQgcG9wdXAgaWYgZXhpc3RzIGJlZm9yZSBhcHBlbmRpbmcgbmV3IG9uZVxuICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dhcE5vZGVzID0gZnVuY3Rpb24gc3dhcE5vZGVzKG4xLCBuMikge1xuICAgIGNvbnN0IHAxID0gbjEucGFyZW50Tm9kZTtcbiAgICBjb25zdCBwMiA9IG4yLnBhcmVudE5vZGU7XG4gICAgbGV0IGkxO1xuICAgIGxldCBpMjtcblxuICAgIGlmICghcDEgfHwgIXAyIHx8IHAxLmlzRXF1YWxOb2RlKG4yKSB8fCBwMi5pc0VxdWFsTm9kZShuMSkpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMS5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMSkpIHtcbiAgICAgICAgaTEgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDIuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjIpKSB7XG4gICAgICAgIGkyID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcbiAgICAgIGkyKys7XG4gICAgfVxuICAgIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcbiAgICBwMi5pbnNlcnRCZWZvcmUobjEsIHAyLmNoaWxkcmVuW2kyXSk7XG4gIH07XG5cbiAgY29uc3Qgd2FpdEZvckpRdWVyeSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghd2luZG93LmpRdWVyeSkge1xuICAgICAgICBsb2dnZXIubG9nKFwialF1ZXJ5IG5vdCBmb3VuZCwgcmV0cnlpbmdcIik7XG4gICAgICAgIGNvbnN0IGpRdWVyeUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWN0aW9uQXBwbGljYXRvciA9IGFzeW5jIChhY3Rpb25zKSA9PiB7XG4gICAgaWYgKGF3YWl0IHdhaXRGb3JKUXVlcnkoKSkge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChhY3Rpb24uZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGFjdGlvbi5lbGlnaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCk7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbik7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXJyb3ItYXBwbHlpbmctYWN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkpxdWVyeSBub3QgZm91bmQgb24gd2luZG93XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvLyBBcHBseSBhY3Rpb25zXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFjdGlvbkFwcGxpY2F0b3IoYWN0aW9ucyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZGVmYXVsdCBhcHBseUFjdGlvbnM7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJBY3Rpb25Db25kaXRpb25VdGlsc1wiKTtcblxuY29uc3QgY2hlY2tBY3Rpb25Db25kaXRpb24gPSBhc3luYyAoY29uZGl0aW9uKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBY3Rpb24gY29uZGl0aW9uIGZvdW5kOiBcIiwgY29uZGl0aW9uKTtcbiAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IFtdO1xuICBjb25zdCB7YXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIG9wZXJhdG9yLCBzZWxlY3RvciwgdHlwZSwgdmFsdWUsIGNoYWlufSA9IGNvbmRpdGlvbjtcbiAgY29uc3QgY29uZGl0aW9uRWxlbWVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29uZGl0aW9uRWxlbWVudHMpIHtcbiAgICBpZiAoYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikpIHtcbiAgICAgIGVsaWdpYmxlRWxlbWVudHMucHVzaCgkKGVsZW1lbnQpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsaWdpYmxlRWxlbWVudHM7XG59O1xuXG5jb25zdCBhY3Rpb25Db25kaXRpb25DaGVja2VyID0gYXN5bmMgKGVsZW1lbnQsIHR5cGUsIG9wZXJhdG9yLCBhdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUsIGNoYWluKSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U2t1ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KGVsZW1lbnRTa3UpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAvLyBydW5UaW1lVmFsdWUgbWF5IGJlIDBcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHwgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2FzZSBcImZ1bmN0aW9uXCI6IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZuID0gRnVuY3Rpb24oXCJlbFwiLCBvcGVyYXRvcik7XG4gICAgICAgIHJldHVybiBmbihlbGVtZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgZXhlY3V0aW5nIGZ1bmN0aW9uIGFjdGlvbiBjb25kaXRpb25cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXS5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0ID0gMSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHJlbGVhc2VdID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPD0gMDtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgcmVsZWFzZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcy5mb3JFYWNoKChxdWV1ZSkgPT4gcXVldWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LnJlamVjdCh0aGlzLl9jYW5jZWxFcnJvcikpKTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICB9XG4gICAgX2Rpc3BhdGNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWVFbnRyeSA9IChfYSA9IHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghcXVldWVFbnRyeSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgLT0gd2VpZ2h0O1xuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy5fdmFsdWUgKyAxO1xuICAgICAgICAgICAgcXVldWVFbnRyeS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihwcmV2aW91c1dlaWdodCldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5mb3JFYWNoKCh3YWl0ZXIpID0+IHdhaXRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIE11dGV4IHtcbiAgICBjb25zdHJ1Y3RvcihjYW5jZWxFcnJvcikge1xuICAgICAgICB0aGlzLl9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEsIGNhbmNlbEVycm9yKTtcbiAgICB9XG4gICAgYWNxdWlyZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQxKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgWywgcmVsZWFzZXJdID0geWllbGQgdGhpcy5fc2VtYXBob3JlLmFjcXVpcmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLnJ1bkV4Y2x1c2l2ZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKCk7XG4gICAgfVxuICAgIHJlbGVhc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKSlcbiAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5jYW5jZWwoKTtcbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHdpdGhUaW1lb3V0KHN5bmMsIHRpbWVvdXQsIHRpbWVvdXRFcnJvciA9IEVfVElNRU9VVCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjcXVpcmU6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgc3luYy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCByZWxlYXNlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHRpY2tldFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZSh3ZWlnaHQpIHtcbiAgICAgICAgICAgIHN5bmMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3luYy5jYW5jZWwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FpdEZvclVubG9jazogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3luYy53YWl0Rm9yVW5sb2NrKHdlaWdodCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCh0aW1lb3V0RXJyb3IpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogKCkgPT4gc3luYy5pc0xvY2tlZCgpLFxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4gc3luYy5nZXRWYWx1ZSgpLFxuICAgICAgICBzZXRWYWx1ZTogKHZhbHVlKSA9PiBzeW5jLnNldFZhbHVlKHZhbHVlKSxcbiAgICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpc25lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIHRyeUFjcXVpcmUoc3luYywgYWxyZWFkeUFjcXVpcmVkRXJyb3IgPSBFX0FMUkVBRFlfTE9DS0VEKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gd2l0aFRpbWVvdXQoc3luYywgMCwgYWxyZWFkeUFjcXVpcmVkRXJyb3IpO1xufVxuXG5leHBvcnQgeyBFX0FMUkVBRFlfTE9DS0VELCBFX0NBTkNFTEVELCBFX1RJTUVPVVQsIE11dGV4LCBTZW1hcGhvcmUsIHRyeUFjcXVpcmUsIHdpdGhUaW1lb3V0IH07XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBhcHBseUFjdGlvbnMgZnJvbSBcIi4uL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleFwiO1xuaW1wb3J0IGNoZWNrQWN0aW9uQ29uZGl0aW9uIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsXCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG4gIGNoZWNrQWN0aW9uU2VsZWN0b3JzLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZSwgaXNPbn0gPSBib2R5O1xuICAgIHRoaXMuaXNPbiA9IGlzT247XG4gICAgdGhpcy5lbmdhZ2VtZW50TG9jayA9IHt9O1xuICAgIHRoaXMucGFnZVR5cGUgPSBwYWdlVHlwZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZTtcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICAgIHRoaXMucmVBcHBseVRyZWF0bWVudHNNYXAgPSB7fTtcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzID0gW107XG4gICAgdGhpcy5tYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cztcbiAgICB0aGlzLmlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3RzKCkge1xuICAgIGNvbnN0IHJvYm90UHJvbWlzZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnQpIGNvbnRpbnVlO1xuICAgICAgICByb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBlbmdhZ2luZyByb2JvdCAke3RyZWF0bWVudC5pZH06ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChyb2JvdFByb21pc2VzKTtcbiAgICB0aGlzLmluaXRpYXRlUmVhcHBseVJvYm90TWFwKCk7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGFjdGlvbnMsXG4gICAgICBlbGlnaWJpbGl0eVJ1bGVTZXQsXG4gICAgICBkZXZpY2UsXG4gICAgICBkZXBlbmRhbnRfb25fdHJlYXRtZW50LFxuICAgICAgYnVzaW5lc3NSdWxlU2V0LFxuICAgICAgd2VpZ2h0LFxuICAgICAgZGVsYXksXG4gICAgICBoZWxwZXJzLFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgICAgYXBwbHksXG4gICAgfSA9IHRoaXM7XG5cbiAgICAvLyBvbmUgZW5nYWdlbWVudCBhdCBhIHRpbWVcbiAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBlbmdhZ2VtZW50TG9ja1tpZF0gfHwgbmV3IE11dGV4KCk7XG4gICAgY29uc3QgcmVsZWFzZSA9IGF3YWl0IGVuZ2FnZW1lbnRMb2NrW2lkXS5hY3F1aXJlKCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChkZWJ1Z01vZGUgJiYgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgJiYgIWRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZGV2aWNlID09PSBcIm1vYmlsZVwiICYmICFpc01vYmlsZSkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnbW9iaWxlJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJkZXNrdG9wXCIgJiYgaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ2Rlc2t0b3AnIG1pc21hdGNoXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBiYXNlIHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVTZXQgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICAgIGlmICghdGhpcy5pc09uKSB7XG4gICAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBudWxsLCBudWxsLCBcInNraXBwZWRcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFNraXBSYXRpbyA9IHdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSB3ZWlnaHQgfHwgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBza2lwIHJhdGlvOiBcIiArIHRyZWF0bWVudFNraXBSYXRpbyk7XG4gICAgICAgIC8vIERldGVybWluaW5nIGlkZW50aWZpZXIgZm9yIGNhbGN1bGF0aW5nIHRyZWF0bWVudCBwZXJjZW50YWdlICh0cmVhdG1lbnRQY3QpXG4gICAgICAgIGNvbnN0IGRldGVybWluaW5nSWRlbnRpZmllciA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQgfHwgaWQ7XG5cbiAgICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIHRoZSBwZXJjZW50YWdlIHZhbHVlIGZvciB0aGUgdHJlYXRtZW50IHVzZWQgdG8gZGV0ZXJtaW5lIGlmIGl0IHNob3VsZCBiZSBza2lwcGVkIG9yIG5vdFxuICAgICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgMTAwIHdoZW4gZGVidWcgbW9kZSBpcyAxLCBlbnN1cmluZyBubyB0cmVhdG1lbnRzIGFyZSBza2lwcGVkXG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFBjdCA9IGRlYnVnTW9kZSA9PT0gMSA/IDEwMCA6IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgZGV0ZXJtaW5pbmdJZGVudGlmaWVyKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudFBjdDogXCIgKyB0cmVhdG1lbnRQY3QgKyBgIHdpdGggZGVidWcgbW9kZSAke2RlYnVnTW9kZSA/IFwib25cIiA6IFwib2ZmXCJ9YCk7XG4gICAgICAgIGxldCBidXNpbmVzc1J1bGVJZCA9IG51bGw7XG4gICAgICAgIGlmIChidXNpbmVzc1J1bGVTZXQpIHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgc3ViIHZhcmlhbnQgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgICAgICAgYnVzaW5lc3NSdWxlSWQgPSBhd2FpdCB0aGlzLmNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpO1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGJ1c2luZXNzIHJ1bGUgdHJhbnNmb3JtYXRpb24gd2l0aCBpZDogXCIsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHRyZWF0bWVudCB3aXRoIGRlZmF1bHQgdmFsdWVzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtwcmVwYXJlZEFjdGlvbnMsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG5cbiAgICAgICAgbGV0IGlzRWxpZ2libGUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBwcmVwYXJlZEFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi5jb25kaXRpb24pIGNvbnRpbnVlO1xuICAgICAgICAgIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBhd2FpdCBjaGVja0FjdGlvbkNvbmRpdGlvbihhY3Rpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICBpZiAoZWxpZ2libGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFjdGlvbi5lbGlnaWJsZUVsZW1lbnRzID0gZWxpZ2libGVFbGVtZW50cztcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSB0cnVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBpZiAodHJlYXRtZW50UGN0IDwgdHJlYXRtZW50U2tpcFJhdGlvKSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgVHJlYXRtZW50ICR7aWR9IHNraXBwZWQgZHVlIHRvIHRyZWF0bWVudCBzcGxpdCByYXRpb2ApO1xuICAgICAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwic2tpcHBlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgIGF3YWl0IGFwcGx5KGlkLCBwcmVwYXJlZEFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50KTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgYXBwbHkoaWQsIHByZXBhcmVkQWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSdWxlIGNoZWNrIGZhaWxlZCBmb3IgdHJlYXRtZW50OlwiLCBpZCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICAgIHRoaXMuYWRkUmVhcHBseUV2ZW50KHRyZWF0bWVudCk7XG4gICAgICB0aGlzLmFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGhlbHBlcnMpICYmIGhlbHBlcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBoZWxwZXJSb2JvdFByb21pc2VzID0gW107XG4gICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiBtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgICBpZiAoIWhlbHBlcnMuaW5jbHVkZXModHJlYXRtZW50LmlkKSkgY29udGludWU7XG4gICAgICAgIGhlbHBlclJvYm90UHJvbWlzZXMucHVzaCh0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCkpO1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaGVscGVyUm9ib3RQcm9taXNlcyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYXBwbHkoaWQsIHByZXBhcmVkQWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQpIHtcbiAgICAvLyBUT0RPIGNoZWNrIGFsbCBhY3Rpb24gc2VsZWN0b3JzIGV4aXN0IC0gaWYgbm90IHJvYm90IGlzIGZhaWxlZFxuICAgIGNvbnN0IGNoZWNrID0gY2hlY2tBY3Rpb25TZWxlY3RvcnMocHJlcGFyZWRBY3Rpb25zKTtcbiAgICBpZiAoIWNoZWNrKSBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcHBseUFjdGlvbnMocHJlcGFyZWRBY3Rpb25zKTtcbiAgICBpZiAocmVzID09PSB0cnVlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImFwcGxpZWRcIik7XG4gICAgfSBlbHNlIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRSZWFwcGx5RXZlbnQodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge3BhZ2VUeXBlLCByZUFwcGx5VHJlYXRtZW50c01hcH0gPSB0aGlzO1xuICAgIGNvbnN0IHtpZCwgcmVhcHBseV9ldmVudCwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGV9ID0gdHJlYXRtZW50O1xuICAgIGlmIChyZWFwcGx5X2V2ZW50KSB7XG4gICAgICBpZiAoIXJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIHx8IHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlID09PSBwYWdlVHlwZSkge1xuICAgICAgICBsZXQgcmVhcHBseV9ldmVudF9hcnJheSA9IHJlYXBwbHlfZXZlbnQ7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWFwcGx5X2V2ZW50KSkgcmVhcHBseV9ldmVudF9hcnJheSA9IFtyZWFwcGx5X2V2ZW50XTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgUmVhcHBseSBldmVudCAnJHtyZWFwcGx5X2V2ZW50fScgZm91bmQgZm9yIHRyZWF0bWVudDogJHtpZH1gKTtcbiAgICAgICAgZm9yIChjb25zdCByZWFwcGx5RXZlbnQgb2YgcmVhcHBseV9ldmVudF9hcnJheSkge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID9cbiAgICAgICAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gOiBbXTtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgYWxyZWFkeSBhZGRlZCBmb3IgcmVhcHBseSBldmVudFwiKTtcbiAgICAgICAgICB9IGVsc2UgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA9IFsuLi5wcmV2aW91c1ZhbHVlLCBpZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpIHtcbiAgICBjb25zdCB7cmVBcHBseVRyZWF0bWVudHNNYXAsIG1hdGNoZWRUcmVhdG1lbnRzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVBcHBseVRyZWF0bWVudHNNYXApKSB7XG4gICAgICBjb25zdCB0cmVhdG1lbnRJZHMgPSByZUFwcGx5VHJlYXRtZW50c01hcFtrZXldO1xuICAgICAgY29uc3QgcmVBcHBseVRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKHQpID0+IHRyZWF0bWVudElkcy5pbmNsdWRlcyh0LmlkKSk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiaW5maW5pdGVfc2Nyb2xsXCI6IHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW5maW5pdGVfc2Nyb2xsYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGltZW91dFwiOiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGltZW91dGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5U2VsZWN0b3JMaXN0ID0gQXJyYXkuaXNBcnJheSh0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvcikgP1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yIDogW3RyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcmVhcHBseVNlbGVjdG9yTGlzdCkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBlbGVtZW50X2NoYW5nZWApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25fc2Nyb2xsXCI6IHtcbiAgICAgICAgICAvLyBhZGQgd2luZG93IHNjcm9sbCBsaXN0ZW5lciwgY2FsbCBlbmdhZ2VSb2JvdCBvbiBzY3JvbGwsIGRvIG5vdCB0cmlnZ2VyIG1vcmUgdGhhbiBvbmNlIHBlciAyNTBtc1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRpbWUgPSAwO1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RTY3JvbGxUaW1lID4gMjUwICYmIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBzdCkgPiA1KSB7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIG9uX3Njcm9sbGApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicXVlcnlfc2VhcmNoX2NoYW5nZVwiOiB7XG4gICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICE9PSBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHF1ZXJ5X3NlYXJjaF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlcnZhbFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgaWYgKGFwcGxpZWQ/Llt0cmVhdG1lbnQuaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbnRlcnZhbGApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9fbGF5ZXJfY2hhbmdlXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgICAgICAgICBhZGREYXRhTGlzdGVuZXIodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJlYXBwbHkgZXZlbnQgbm90IGZvdW5kOiBcIiwga2V5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlU2V0ID0gW10sIGJ1c2luZXNzUnVsZVNldCA9IFtdLCBpZH0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMuaW5jbHVkZXMoaWQpKSByZXR1cm47XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKFsuLi5lbGlnaWJpbGl0eVJ1bGVTZXQsIC4uLmJ1c2luZXNzUnVsZVNldF0pO1xuICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihgX19lUnVsZXMuJHtzZWxlY3Rvcn1gLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgfVxuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMucHVzaChpZCk7XG4gIH1cblxuICBleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGVTZXQsIHByZXZpb3VzU2VsZWN0b3JzID0gbnVsbCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHByZXZpb3VzU2VsZWN0b3JzIHx8IFtdO1xuICAgIGZvciAobGV0IHJ1bGUgb2YgcnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChydWxlLnN0YXJ0c1dpdGgoXCIhXCIpKSBydWxlID0gcnVsZS5zbGljZSgxKTtcbiAgICAgICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zcGxpdChcIi5cIilbMF0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlLnNldCwgc2VsZWN0b3JzKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi4obmV3IFNldChzZWxlY3RvcnMpKV07XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSkge1xuICAgIGxvZ2dlci5sb2coYENoZWNraW5nIGVsaWdpYmlsaXR5ICR7ZWxpZ2liaWxpdHlSdWxlfWApO1xuICAgIGxldCBvcHBvc2l0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgW2VsaWdpYmlsaXR5U2NvcGUsIGVsaWdpYmlsaXR5TmFtZV0gPSBlbGlnaWJpbGl0eVJ1bGUuc3BsaXQoXCIuXCIpO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBvcHBvc2l0ZUZsYWcgPSB0cnVlO1xuICAgICAgZWxpZ2liaWxpdHlTY29wZSA9IGVsaWdpYmlsaXR5U2NvcGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7ZWxpZ2liaWxpdHlTY29wZX1gKTtcbiAgICBpZiAoIXJlcyB8fCAhQXJyYXkuaXNBcnJheShyZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9wcG9zaXRlRmxhZyAmJiByZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb3Bwb3NpdGVGbGFnICYmICFyZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGxvZ2dlci5sb2coYCR7ZWxpZ2liaWxpdHlSdWxlfSBpcyBlbGlnaWJsZWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0LCBlbGlnaWJpbGl0eVNldFR5cGUgPSBudWxsLCBwcmV2aW91c0lzRWxpZ2libGUgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJvYm90IGVsaWdpYmlsaXR5XCIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFbGlnaWJpbGl0eSBSdWxlIFNldCAke2VsaWdpYmlsaXR5UnVsZVNldH0gaXMgbm90IGFuIGFycmF5YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc0VsaWdpYmxlID0gcHJldmlvdXNJc0VsaWdpYmxlO1xuICAgIGZvciAoY29uc3QgZWxpZ2liaWxpdHlSdWxlIG9mIGVsaWdpYmlsaXR5UnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaWYgKGlzRWxpZ2libGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2ggKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSAmJiBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIGVsaWdpYmlsaXR5U2V0VHlwZTogXCIsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlLnNldCwgZWxpZ2liaWxpdHlSdWxlLnR5cGUsIGlzRWxpZ2libGUpO1xuICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRWxpZ2libGU7XG4gIH1cblxuICAvLyBSZXR1cm4gaW5kZXggb2YgYnVzaW5lc3NSdWxlLCB0aGlzIGlzIHRoZSBidXNpbmVzc1J1bGVJZFxuICBhc3luYyBjaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGJ1c2luZXNzUnVsZV0gb2YgYnVzaW5lc3NSdWxlU2V0LmVudHJpZXMoKSkge1xuICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoW2J1c2luZXNzUnVsZV0pKSByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tEYXRhTGF5ZXJSdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSB3aXRoIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gYXdhaXQgZGF0YUxheWVyRmluZGVyKG9wZXJhdG9yKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRhTGF5ZXJGaW5kZXIgPSBhc3luYyAoa2V5KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJTZWFyY2hpbmcgYmVhZ2xlSW5mb0xheWVyIGZvciBrZXkgXCIsIGtleSk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5zdWNjZXNzKGBGb3VuZCBrZXkgJHtrZXl9IHdpdGggdmFsdWUgJHtyZXN9YCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBsb2dnZXIuZmFpbGVkKGBLZXkgJHtrZXl9IG5vdCBmb3VuZCBpbiBiZWFnbGVJbmZvTGF5ZXJgKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVsZW1lbnRDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbGVtZW50UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIHNlbGVjdG9yXCIsIHJ1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbCk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZSwgc2VsZWN0b3IsIHNlbGVjdG9yQWxsLCBzZWxlY3RvckZhbGxiYWNrID0gbnVsbH0gPSBydWxlO1xuICBsZXQgbWFpblNlbGVjdG9yID0gc2VsZWN0b3I7XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbWFpblNlbGVjdG9yID0gc2VsZWN0b3JGYWxsYmFjayA/IHNlbGVjdG9yRmFsbGJhY2sgOiBtYWluU2VsZWN0b3I7XG4gIH1cblxuICBpZiAob3BlcmF0b3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcih3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gIH1cbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChzZWxlY3RvckFsbCAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgZWxlbWVudDtcbiAgaWYgKG1haW5TZWxlY3RvcikgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpO1xuICBlbHNlIGlmIChzZWxlY3RvckFsbCkgZWxlbWVudCA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yQWxsKSk7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJ0ZXh0LW51bWJlclwiOiB7XG4gICAgICBsZXQgdGVtcFZhbDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIHRlbXBWYWwgPSBlbGVtZW50LnJlZHVjZSgocmV0dXJuVmFsLCBlbGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuVmFsICs9IHBhcnNlSW50KGVsZW0udGV4dENvbnRlbnQucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBWYWwgPSBwYXJzZUludCh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgLnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwYXJzZUludCh0ZW1wVmFsKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJjbGFzc0xpc3RcIjpcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiY291bnRcIjoge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkgJiYgZWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGVsZW1lbnQubGVuZ3RoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigxLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDAsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjYXNlIFwic3R5bGVcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdHlsZUtleSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICBjb25zdCBzdHlsZVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnRTdHlsZXNbc3R5bGVLZXldO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHN0eWxlVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcIk9wZXJhdG9yIG5vdCBkZWZpbmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUZ1bmN0aW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRnVuY3Rpb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgZnVuY3Rpb24gcnVsZVwiKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3JcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3JcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3I6IFwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkZXZpY2VfdHlwZVwiOiB7XG4gICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcyA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGlzTW9iaWxlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUHJvZHVjdEluZm9DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tQcm9kdWN0SW5mb1J1bGUgPSBhc3luYyAocnVsZSkgPT4ge1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZSBmb3Igb3BlcmF0b3I6IFwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICBsZXQgc2t1O1xuICBpZiAocGFnZVR5cGUgPT09IFwiUHJvZHVjdHBhZ2VcIikge1xuICAgIHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpO1xuICAgIGlmICghc2t1KSByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gICAgaWYgKCFza3VMaXN0IHx8ICh0eXBlb2Ygc2t1TGlzdCA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMoc2t1TGlzdCkubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICAgIHNrdSA9IHNrdUxpc3RbT2JqZWN0LmtleXMoc2t1TGlzdClbMF1dO1xuICB9XG4gIGxldCBydW50aW1lVmFsdWUgPSBudWxsO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInNhbGVDbnRWaXNpdG9yc0luMTVcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJjYXJ0Q250VmlzaXRvcnNJbjE1XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIEFkZFRvQ2FydENvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRBZGRUb0NhcnRDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJ2aWV3Q250VmlzaXRvcnNJbjFcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0UHJldmlld0NvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImhhc1RpdGxlXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHRpdGxlIGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUaXRsZShza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJoYXNEZXNjcmlwdGlvblwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBkZXNjcmlwdGlvbiBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0RGVzY3JpcHRpb24oc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldEFkZFRvQ2FydENvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0UHJldmlld0NvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRGcm9tREIgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgcmV0dXJuIGF3YWl0IGRiLmdldChza3UpO1xufTtcblxuY29uc3QgZ2V0VGl0bGUgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udGl0bGVBdWdtZW50IHx8IFwiXCI7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBnZXREZXNjcmlwdGlvbiA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5tYXJrZXRpbmdDb3B5IHx8IFwiXCI7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjaGVja0RhdGFMYXllclJ1bGV9IGZyb20gXCIuL2RhdGFMYXllckNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbGVtZW50UnVsZX0gZnJvbSBcIi4vZWxlbWVudENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tGdW5jdGlvblJ1bGV9IGZyb20gXCIuL2Z1bmN0aW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Nlc3Npb25SdWxlfSBmcm9tIFwiLi9zZXNzaW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1VybFJ1bGV9IGZyb20gXCIuL3VybENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbnZSdWxlfSBmcm9tIFwiLi9lbnZDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrUHJvZHVjdEluZm9SdWxlfSBmcm9tIFwiLi9wcm9kdWN0SW5mb0NoZWNrZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHthZGREYXRhTGlzdGVuZXIsIGFkZFRvQmVhZ2xlSW5mb0xheWVyLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcbmltcG9ydCB7ZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTLCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLm11dGV4ID0gbmV3IE11dGV4KCk7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZCA/IHJ1bGUubmFtZSB8fCB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICAgIGNvbnN0IGtleVByb21pc2VzTWFwID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5lbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAga2V5UHJvbWlzZXNNYXBba2V5XSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGtleVByb21pc2VzTWFwW2tleV0ucHVzaCh0aGlzLmNoZWNrUnVsZShydWxlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZVByb21pc2VzXSBvZiBPYmplY3QuZW50cmllcyhrZXlQcm9taXNlc01hcCkpIHtcbiAgICAgIGNvbnN0IHNhdGlzZmllZFJ1bGVJZHMgPSBhd2FpdCBQcm9taXNlLmFsbChydWxlUHJvbWlzZXMpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIHNhdGlzZmllZFJ1bGVJZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGZhbHNlKSk7XG4gICAgICB0aGlzLnNldFVwTGlzdGVuZXJzKGtleSwgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpIHtcbiAgICBpZiAoIWtleSB8fCAhcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCB0aGlzLm11dGV4LmFjcXVpcmUoKTtcbiAgICBsb2dnZXIubG9nKGBMb2NrIGFjcXVpcmVkIGZvciBrZXkgJHtrZXl9YCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBjb25zdCBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gKSB8fCBbXTtcbiAgICAgICAgaWYgKGlzRWxpZ2libGUpIHtcbiAgICAgICAgICBpZiAoY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjdXJyZW50LnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgY3VycmVudCk7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZW1vdmUgZnJvbSBlbGlnaWJsZSBydWxlc1xuICAgICAgICAgIGlmICghY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGN1cnJlbnQuZmlsdGVyKChrKSA9PiBrICE9PSBydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgY29uc3Qge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9ID0gdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMpO1xuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSByZXR1cm47XG4gICAgICAgIGxldCBub2RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uUmVjb3JkIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgIG5vZGVzID0gWy4uLm5vZGVzLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLnJlbW92ZWROb2RlcyldO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV4Y2x1ZGUgbXV0YXRpb25zIHRoYXQgb25seSB1cGRhdGUgdGV4dFxuICAgICAgICBpZiAobm9kZXMuZXZlcnkoKG4pID0+IG4udGFnTmFtZSA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VsZWN0b3IgPT09IFwiYm9keVwiKSB7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5ib2R5LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLnBhcmVudE5vZGUsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKHJ1bGVzLCBkYXRhTGF5ZXJSdWxlcyA9IHt9LCBlbGVtZW50UnVsZXMgPSB7fSwgYmFzZVJ1bGUgPSBudWxsKSB7XG4gICAgaWYgKCFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICBjb25zdCB7dHlwZX0gPSBydWxlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgICBpZiAoIWRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdKSB7XG4gICAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXS5wdXNoKGJhc2VSdWxlIHx8IHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJ1bGUuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0gPSBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSwgYmFzZVJ1bGUgfHwgcnVsZV0gOiBbYmFzZVJ1bGUgfHwgcnVsZV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocnVsZS5zZWxlY3RvckFsbCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0gPSBlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSwgYmFzZVJ1bGUgfHwgcnVsZV0gOiBbYmFzZVJ1bGUgfHwgcnVsZV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFJ1bGVzW1wiYm9keVwiXSA9IGVsZW1lbnRSdWxlc1tcImJvZHlcIl0gP1xuICAgICAgICAgICAgWy4uLmVsZW1lbnRSdWxlc1tcImJvZHlcIl0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHJ1bGUuY2hhaW4pIHtcbiAgICAgICAgdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMoW3J1bGUuY2hhaW5dLCBkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzLCBiYXNlUnVsZSB8fCBydWxlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZWxpZ2liaWxpdHlSdWxlc09iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMpO1xuICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXNPYmopIHtcbiAgICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IEpTT04ucGFyc2UoZWxpZ2liaWxpdHlSdWxlc09iaik7XG4gICAgICAgIGlmIChlbGlnaWJpbGl0eVJ1bGVzT2JqLnRpbWVzdGFtcCkge1xuICAgICAgICAgIGNvbnN0IGVsYXBzZWRIb3VycyA9IChEYXRlLm5vdygpIC0gZWxpZ2liaWxpdHlSdWxlc09iai50aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgICAgICBpZiAoZWxhcHNlZEhvdXJzIDwgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMpIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzT2JqLnJ1bGVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gYXdhaXQgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gICAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXNPYmopIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0ge3J1bGVzOiBlbGlnaWJpbGl0eVJ1bGVzT2JqLCB0aW1lc3RhbXA6IERhdGUubm93KCl9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUywgSlNPTi5zdHJpbmdpZnkoZWxpZ2liaWxpdHlSdWxlc09iaikpO1xuICAgICAgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXNPYmoucnVsZXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBlbGlnaWJpbGl0eSBydWxlczogXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleFwiO1xuaW1wb3J0IHtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzLFxuICBpbmplY3RTdHlsZVNoZWV0LFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFJvYm90RW5naW5lIGZyb20gXCIuL3JvYm90RW5naW5lXCI7XG5pbXBvcnQgUnVsZUVuZ2luZSBmcm9tIFwiLi4vQmVhZ2xlUnVsZUVuZ2luZVwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVPbkNvbXBvbmVudFwiKTtcblxuY29uc3QgYmVhZ2xlT24gPSBhc3luYyAoaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSwgdHJlYXRtZW50V2VpZ2h0cywgaXNPbikgPT4ge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvbi1pbml0XCIpO1xuXG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlID0gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG5cbiAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvbi1jb25maWctZmV0Y2hcIik7XG5cbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgbGV0IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gbnVsbDtcbiAgaWYgKGRlYnVnTW9kZSAmJiBzZWFyY2hQYXJhbXMuaW5jbHVkZXMoXCJmaWx0ZXI9XCIpKSB7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBzZWFyY2hQYXJhbXMuc2xpY2UoXG4gICAgICAgIHNlYXJjaFBhcmFtcy5pbmRleE9mKFwiW1wiKSArIDEsXG4gICAgICAgIHNlYXJjaFBhcmFtcy5sYXN0SW5kZXhPZihcIl1cIiksXG4gICAgKS5zcGxpdChcIixcIikubWFwKChpdGVtKSA9PiBwYXJzZUludChpdGVtLCAxMCkpO1xuICB9XG5cbiAgY29uc3QgdHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudHNQcm9taXNlO1xuXG4gIGlmICghdHJlYXRtZW50cykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJvYm90LXdlaWdodHNcIik7XG4gIH1cbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJGb3VuZCB0cmVhdG1lbnRzOiBcIiwgdHJlYXRtZW50cyk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtdHJlYXRtZW50c1wiKTtcblxuICBjb25zdCB0cmVhdG1lbnRSZXBvc2l0b3J5ID0gbmV3IFRyZWF0bWVudFJlcG9zaXRvcnkoe1xuICAgIHRyZWF0bWVudHMsXG4gICAgdHJlYXRtZW50V2VpZ2h0cyxcbiAgfSk7XG5cbiAgY29uc3QgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRSZXBvc2l0b3J5LmdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSk7XG4gIGlmIChtYXRjaGVkVHJlYXRtZW50cyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXVzZXItc2VnbWVudFwiKTtcbiAgfVxuICBpZiAoIW1hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJvYm90LW1hdGNoZWRcIik7XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZm91bmQtbWF0Y2hlZC1yb2JvdHNcIik7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8tcnVsZXMtYXNzZXNzZWRcIik7XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicnVsZXMtYXNzZXNzZWRcIik7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdWN0SW5mb0RCID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgICBhd2FpdCBwcm9kdWN0SW5mb0RCLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcm9kdWN0LWluZm8tbm8tcGVyc2lzdFwiKTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImVuZ2FnaW5nLXJvYm90c1wiKTtcbiAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgIGRlYnVnTW9kZSxcbiAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICBpZGVudGlmaWVyLFxuICAgIHBhZ2VUeXBlLFxuICAgIGlzT24sXG4gIH0pO1xuICBhd2FpdCByb2JvdEVuZ2luZS5lbmdhZ2VSb2JvdHMoKTtcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInJvYm90cy1lbmdhZ2VkXCIpO1xuICBsb2dnZXIuc3VjY2VzcyhcIkFwcGxpZWQgdHJlYXRtZW50czogXCIsIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpKTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hpbmctZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBSdWxlRW5naW5lLmdldEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm47XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gIGNvbnN0IHJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7ZWxpZ2liaWxpdHlSdWxlc30pO1xuICBhd2FpdCBydWxlRW5naW5lLmFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJhc3Nlc3NlZC1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGJlYWdsZU9uO1xuIiwiaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiU2VnbWVudGF0aW9uQ29tcHV0ZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gIGxvZ2dlci5sb2coXCJEZXRlcm1pbmluZyB1c2VyIHNlZ21lbnRcIik7XG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgICBjb25zdCBydWxlU2V0ID0gdHJlYXRtZW50V2VpZ2h0c1tzZWdtZW50XT8ucnVsZVNldDtcbiAgICAgIGlmICghcnVsZVNldCkgY29udGludWU7XG4gICAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXX0pO1xuICAgICAgaWYgKGF3YWl0IHNlZ21lbnRSdWxlRW5naW5lLmNoZWNrUnVsZXMoKSkge1xuICAgICAgICBsb2dnZXIubG9nKGBVc2VyIHNlZ21lbnQgbWF0Y2hlZDogJHtzZWdtZW50fWApO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgc2VnbWVudCk7XG4gICAgICAgIHJldHVybiBzZWdtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIubG9nKFwiVXNlciBzZWdtZW50IG5vdCBtYXRjaGVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNvbXB1dGUgdXNlciBzZWdtZW50XCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBNb25pdG9yIGZyb20gXCIuLi9CZWFnbGVNb25pdG9yL2luZGV4XCI7XG5pbXBvcnQgYmVhZ2xlT24gZnJvbSBcIi4uL0JlYWdsZU9uXCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTEFCX1JBVElPLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBzZXRVUkxEYXRhLFxuICBzZXRBZ2VudERldGFpbHMsXG4gIGdldElkZW50aWZpZXIsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbiAgZGV0ZXJtaW5lUGN0LFxuICBnZXREZWJ1Z01vZGUsXG4gIHN3aXRjaFRvRWFzZU91dCxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2NvbXB1dGVTZWdtZW50fSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5XCI7XG5cbmxldCBTSFVURE9XTiA9IGZhbHNlO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIHN3aXRjaFRvRWFzZU91dCgpO1xuICBsZXQgbW9uaXRvciA9IG51bGw7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgaW5pdGlhbGl6aW5nXCIpO1xuICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcblxuICBsZXQgZWFybHlMb2dTZW50ID0gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQ1JJVElDQUwgSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCBpbml0aWFsaXppbmdcIik7XG4gICAgc2V0VVJMRGF0YSgpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiLCBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IGF3YWl0IGdldElkZW50aWZpZXIoKTtcbiAgICBsb2dnZXIubG9nKFwiRm91bmQgaWRlbnRpZmllcjogXCIsIGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb29raWVQY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiwgY29va2llUGN0KTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZcIiwgVkVSU0lPTik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzclwiLCBTUExJVF9SQVRJTyk7XG5cbiAgICBtb25pdG9yID0gbmV3IE1vbml0b3IoKTtcbiAgICAvLyBkYXRhLWxlc3MgbG9nIHRvIGRldGVjdCBib3VuY2VzXG4gICAgYXdhaXQgbW9uaXRvci5wYWNrQW5kUXVldWVBcnJpdmFsTG9nKCk7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQVNZTkMgSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcigpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRXZWlnaHRzKCk7XG5cbiAgICAvLyBTTEE6IDIgc2Vjb25kcyB0byBmbGlja2VyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICB9LCAyMDAwKTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWSBQUlVORSBPVVQtT0YtU0NPUEUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4gICAgbGV0IG9vc0JyZWFrID0gZmFsc2U7XG4gICAgY29uc3Qgb29zUmVhc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUpO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWcgbW9kZSBpcyBvbiwgYWxzbyBhZGRzIGRibSB0byBiZWFnbGVJbmZvTGF5ZXIgYW5kIHNldHMgb29zUmVhc29uXG4gICAgY29uc3QgZGVidWdNb2RlID0gZ2V0RGVidWdNb2RlKFwiZW1wbG95ZWVcIik7XG4gICAgaWYgKGRlYnVnTW9kZSA9PT0gLTEpIHtcbiAgICAgIFNIVVRET1dOID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXN0IGNvb2tpZSwgYmVhY29uLCBhbmQgc3RyaW5nIHV0aWxzIHN1cHBvcnRcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5tYXRjaCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJ1bnN1cHBvcnRlZFwiKVxuICAgICkge1xuICAgICAgb29zQnJlYWsgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHVzZXJBZ2VudCBjYW4gYmUgcHJvcGVybHkgcGFyc2VkXG4gICAgaWYgKCFvb3NCcmVhaykge1xuICAgICAgY29uc3Qgc3RhdHVzID0gc2V0QWdlbnREZXRhaWxzKCk7XG4gICAgICAvLyBpZiBhZ2VudCBjYW5ub3QgYmUgcGFyc2VkLCBkbyBlYXJseSBicmVha1xuICAgICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgb29zQnJlYWsgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IHJlbW92ZSBwZXJtYW5lbnQgdW5zZWdtZW50ZWQtb29zIGFmdGVyIE9GRiBlbGlnaWJpbGl0eSBpcyBmaXhlZFxuXG4gICAgLy8gYXR0ZW1wdCB0byBjb21wdXRlIHVzZXIgc2VnbWVudFxuICAgIGxldCB1c2VyU2VnbWVudCA9IG51bGw7XG4gICAgbGV0IHRyZWF0bWVudFdlaWdodHMgPSBudWxsO1xuICAgIGlmICghb29zQnJlYWspIHtcbiAgICAgIHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZTtcbiAgICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJvYm90LXdlaWdodHNcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb21wdXRlIHVzZXIgc2VnbWVudCBhbmQgYWRkIHRvIGJlYWdsZUluZm9MYXllclxuICAgICAgICB1c2VyU2VnbWVudCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVzZXJTZWdtZW50KSB7XG4gICAgICAgIG9vc0JyZWFrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBjYW5ub3QgZ2V0IGNyaXRpY2FsIGluZm8sIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCB1bnN1cHBvcnRlZFxuICAgIGlmIChvb3NCcmVhaykge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IGRldmljZVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkLWRldmljZVwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBRE1JTiBVU0VSIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cblxuICAgIC8vIGlmIGFkbWluIHVzZXIsIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCBtYXJrIGFzIGVtcGxveWVlXG4gICAgY29uc3QgcHJvY2Vzc0FkbWluVXNlciA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IGFkbWluXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWRtaW4tZW1wbG95ZWVcIik7XG4gICAgfTtcblxuICAgIGxldCBpc0FkbWluID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTik7XG4gICAgLy8gaWYgbm90IGZvdW5kIGluIGxvY2FsU3RvcmFnZSwgY2hlY2sgYmVhZ2xlSW5mb0xheWVyIHdpdGggYmxvY2tpbmcgbW9kZVxuICAgIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNBZG1pbiA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgICAgLy8gcGVybWFuZW50IGxhYmVsIGNhbiBiZSBmYWxzZSwgYnV0IGFkbWluIHVzZXIgY2FuIHN0aWxsIGxvZ2luIGFuZCB0dXJuIHRydWUsIGxhemlseSBmaXggdGhpc1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gXCJmYWxzZVwiIHx8IGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gICAgICAvLyBhc3luYyBjYWxsIHRvIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIHRoZW4gc2V0IGxvY2FsU3RvcmFnZVxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSkudGhlbigoaXNBZG1pbikgPT4ge1xuICAgICAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWFkbWluLXN0YXR1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1lYXNlXCIpKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnRpLWZsaWNrZXItdGltZW91dFwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IE9OL09GRiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gY2hhbXBpb24gaXMgYWJvdmUgU1BMSVRfUkFUSU8gcGx1cyBMQUJfUkFUSU9cbiAgICBjb25zdCBpc0NoYW1wID0gY29va2llUGN0ID49IFNQTElUX1JBVElPICogKDEgKyBMQUJfUkFUSU8gLyAxMDApO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNDaGFtcFwiLCBpc0NoYW1wKTtcblxuICAgIC8vIGlzT24gY2FuIGJlIHRydWUgKE9OKSwgZmFsc2UgKE9GRilcbiAgICBsZXQgaXNPbiA9IG51bGw7XG5cbiAgICBpZiAoZGVidWdNb2RlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRGVidWcgbW9kZSBvbjogYWxsIGFwcGxpY2FibGUgdHJlYXRtZW50cyB3aWxsIGJlIGFwcGxpZWRcIik7XG4gICAgICBpc09uID0gdHJ1ZTtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJlbXBsb3llZVwiKSB7XG4gICAgICBsb2dnZXIud2FybihcIlVzZXIgaXMgb3V0IG9mIHNjb3BlXCIpO1xuICAgICAgLy8gc2V0IGlzT24gdG8gdHJ1ZS9mYWxzZSB3aGVuIG5vdCBkZWJ1Z01vZGUgYnV0IG91dCBvZiBzY29wZSBpLmUuIG5kX2RlYnVnPTAgZm9yIHRlc3RhYmlsaXR5XG4gICAgICBpc09uID0gY29va2llUGN0ID49IFNQTElUX1JBVElPO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24pIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdW5rbm93blwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3V0IG9mIHNjb3BlIHJlYXNvblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIFNQTElUX1JBVElPLCB0aGVuIGluIE9OIG1vZGVcbiAgICAgIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8pIHtcbiAgICAgICAgaXNPbiA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInRydWVcIn0pO1xuICAgICAgfSBlbHNlIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8gLyAyKSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UyXCJ9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UxXCJ9KTtcbiAgICAgIH1cblxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJpc09uXCIsIGlzT24pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGlzT24udG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEVBUkxZLVBST0NFU1MgQ09OVkVSU0lPTiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGF3YWl0IGNyaXRpY2FsIGluZm8gYmVmb3JlIHNlbmRpbmcgbG9ncyBmb3IgcHJvcGVyIGFuYWx5dGljcyBtZWFzdXJlbWVudHNcbiAgICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgICBpZiAocGFnZVR5cGUgPT09IFwicHVyY2hhc2VcIikge1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnJldmVudWVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIC8vIHNlbmQgbG9ncyBpbW1lZGlhdGVseSBvbiBwdXJjaGFzZSBwYWdlLCBhbmQgZm9yY2Ugd2FpdFxuICAgICAgYXdhaXQgbW9uaXRvci5zZW5kTG9ncyh0cnVlKTtcbiAgICAgIC8vIGlmIHB1cmNoYXNlIGlzIGNvbXBsZXRlLCBkbyBub3QgYXBwbHkgYW55IHRyZWF0bWVudHMgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICBTSFVURE9XTiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNlbmQgbG9ncyB3aGVuIHJlYWR5LCBzdGFydCBzY3JhcGluZyBhbmQgc2VuZGluZyBhc3luY2x5XG4gICAgICBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICB9XG4gICAgZWFybHlMb2dTZW50ID0gdHJ1ZTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBST0JPVCBQQVRIcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW50ZXJpbmctcm9ib3QtcGF0aFwiKTtcblxuICAgIGlmIChpc09uID09PSBudWxsIHx8IGlzT24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8taXNPblwiKTtcbiAgICB9IGVsc2UgaWYgKFNIVVRET1dOKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaHV0ZG93bi1wYXRoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlLCB0cmVhdG1lbnRXZWlnaHRzLCBpc09uKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiRW50cnlwb2ludCBjYXRjaDogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJWRVJTSU9OIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIkxBQl9SQVRJTyIsIlRSRUFUTUVOVF9SQVRJTyIsIkxPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlBPUFVQX0RJU1BMQVlfRkxBRyIsIlNLVV9JTkZPX0JBU0tFVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJNQVRDSEVEX1RSRUFUTUVOVFMiLCJMT0NBTF9TVE9SQUdFX0tFWVMiLCJUUkVBVE1FTlRTIiwiV0VJR0hUUyIsIkVMSUdJQklMSVRZX1JVTEVTIiwiREVCVUdfTU9ERSIsIk9VVF9PRl9TQ09QRSIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiSVNfQURNSU4iLCJDVVNUT01fU1RPUkFHRV9QUkVGSVgiLCJMb2dnZXIiLCJvcmlnaW4iLCJ0ZXN0aW5nIiwiREVCVUciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXJncyIsImNvbnNvbGUiLCJpbmZvIiwibG9nIiwibWVzc2FnZUNvbmZpZyIsImZvckVhY2giLCJhcmd1bWVudCIsInR5cGUiLCJ3YXJuIiwiZXJyb3IiLCJhZGRUb0JlYWdsZUluZm9MYXllciIsImxvZ2dlciIsIm1vbnRocyIsInJlbW92ZURvY3VtZW50SGlkZSIsInRvcCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwic3dpdGNoVG9FYXNlT3V0IiwiY29udGFpbnMiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInByZXBlbmQiLCJhZGQiLCJmZXRjaFRyZWF0bWVudHMiLCJmZXRjaFBsdXMiLCJ0cmVhdG1lbnRzIiwiRXJyb3IiLCJqc29uIiwianNvblRyZWF0bWVudCIsImZhaWxlZCIsIm1lc3NhZ2UiLCJmZXRjaFRyZWF0bWVudFdlaWdodHMiLCJ0cmVhdG1lbnRXZWlnaHRzIiwianNvblRyZWF0bWVudFdlaWdodHMiLCJmZXRjaEVsaWdpYmlsaXR5UnVsZXMiLCJlbGlnaWJpbGl0eVJ1bGVzIiwianNvbkVsaWdpYmlsaXR5UnVsZXMiLCJmZXRjaFByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mb0pzb24iLCJ0aW1lb3V0IiwidGltZSIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJ0aW1lb3V0SUQiLCJzZXRUaW1lb3V0IiwiYWJvcnQiLCJ1cmwiLCJvcHRpb25zIiwicmV0cmllcyIsImZldGNoIiwic2lnbmFsIiwidGhlbiIsInJlcyIsIm9rIiwiY2xlYXJUaW1lb3V0Iiwic3RhdHVzIiwiY2F0Y2giLCJleHRyYWN0Q29va2llSWRlbnRpZmllciIsImNvb2tpZVN0cmluZyIsImNvb2tpZU5hbWUiLCJwYXJzZWQiLCJzcGxpdCIsIm1hcCIsInYiLCJyZWR1Y2UiLCJhY2MiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0cmltIiwiaWRlbnRpZmllciIsImlkZW50aWZpZXJJbmRleCIsImRldGVybWluZVBjdCIsIm5vdyIsIm1vbnRoIiwiZ2V0TW9udGgiLCJoYXNoIiwiZ2V0VW5zZWN1cmVIYXNoIiwidG9TdHJpbmciLCJwY3QiLCJleGl0U2Nyb2xsTGlzdGVuZXIiLCJjYWxsQmFjayIsImxvb3AiLCJzY3JvbGxUb3AiLCJsYXN0U2Nyb2xsVG9wIiwiY2xlYXJJbnRlcnZhbCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInNldEludGVydmFsIiwic3R5bGVBcHBsaWNhdG9yIiwiZWxlbWVudHMiLCJzdHlsZUNoYW5nZXNNYXAiLCJpIiwiZWxlbWVudCIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJyZWwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwcmVwYXJlQWN0aW9ucyIsImFjdGlvbnNUb1ByZXBhcmUiLCJidXNpbmVzc1J1bGVJZCIsImRlYnVnTW9kZSIsImFjdGlvbnMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ2YXJpYW50IiwiYWN0aW9uIiwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zIiwidmFyaWFudHMiLCJidXNpbmVzc1RyYW5zZm9ybWF0aW9uIiwiaWQiLCJrZXlzIiwidmFyaWFudEtleSIsInJhbmRvbVBjdCIsIndlaWdodCIsIk1hdGgiLCJmbG9vciIsImNoZWNrQWN0aW9uU2VsZWN0b3JzIiwicHJlcGFyZWRBY3Rpb25zIiwic2VsZWN0b3IiLCJzZWxlY3RvckZhbGxiYWNrIiwicXVlcnlTZWxlY3RvciIsImluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzIiwicG9wdXBEaXNwbGF5RmxhZyIsInNlc3Npb25TdG9yYWdlIiwic2Vzc2lvblRpbWVzdGFtcCIsInNlc3Npb25IaXN0b3J5Iiwic2V0SXRlbSIsInBhdGhuYW1lIiwiY29uZGl0aW9uQ2hlY2tlciIsInJ1blRpbWVWYWx1ZSIsImNvbmRpdGlvbiIsInN1Y2Nlc3MiLCJ1bmRlZmluZWQiLCJtaW4iLCJtYXgiLCJwYXJzZUludCIsInJlZ2V4IiwiUmVnRXhwIiwidGVzdCIsImdldERlYnVnTW9kZSIsIm9vc1JlYXNvbiIsInF1ZXJ5U3RyaW5nIiwic2VhcmNoIiwicmVtb3ZlSXRlbSIsImN1cnJlbnQiLCJOdW1iZXIiLCJpc05hTiIsImdldEdhQ2xpZW50SWQiLCJnYSIsImdldEFsbCIsInRyYWNrZXJzIiwiZ2V0IiwiY2hhciIsImNoYXJDb2RlQXQiLCJhYnMiLCJnZXRSYW5kb21JbnQiLCJyYW5kb20iLCJnZXRVbml4VGltZSIsImdldElkZW50aWZpZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwiLCJlIiwiZGVsYXkiLCJtcyIsImZvcm1hdERlbGl2ZXJ5RGF0ZSIsImRhdGUiLCJyZXN1bHQiLCJzdGFydE1vbnRoSW5kZXgiLCJlbmRNb250aEluZGV4Iiwic3RhcnREYXkiLCJlbmREYXkiLCJtYXRjaCIsInRvZGF5Iiwic3RhcnRZZWFyIiwiZ2V0RnVsbFllYXIiLCJlbmRZZWFyIiwiZXN0aW1hdGVkU3RhcnQiLCJlc3RpbWF0ZWRFbmQiLCJzdGFydERpZmZPdmVyRGF5cyIsImNlaWwiLCJlbmREaWZmT3ZlckRheXMiLCJzdGFydERpZmZPdmVyV2Vla3MiLCJlbmREaWZmT3ZlcldlZWtzIiwiZXJyIiwiaWRsZVRpbWVyIiwidGltZU91dCIsInJlc2V0VGltZXIiLCJpZGxlVGltZW91dCIsIm9udG91Y2hzdGFydCIsImlzT3duTXV0YXRpb24iLCJtdXRhdGlvbkxpc3QiLCJub2RlcyIsIkFycmF5IiwiZnJvbSIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJzb21lIiwibiIsInRhZ05hbWUiLCJjIiwic2V0QWdlbnREZXRhaWxzIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJiciIsImJOYW1lIiwiYlZlcnNpb24iLCJvcyIsIldpbmRvd3MiLCJNYWMiLCJMaW51eCIsIkFuZHJvaWQiLCJpT1MiLCJvc1ZlcnNpb24iLCJvc05hbWUiLCJpc01vYmlsZSIsImlzU3VwcG9ydGVkQnJvd3NlciIsImlzU3VwcG9ydGVkT1MiLCJzZXRVUkxEYXRhIiwiY3VycmVudFVSTCIsIlVSTCIsImhvc3RuYW1lIiwicGFnZVR5cGUiLCJpZGJSZWFkeSIsImlzU2FmYXJpIiwidXNlckFnZW50RGF0YSIsImluZGV4ZWREQiIsImRhdGFiYXNlcyIsImludGVydmFsSWQiLCJ0cnlJZGIiLCJmaW5hbGx5IiwiTFNfUHJlZml4IiwidXBkYXRlSW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWUiLCJiYXNlRmVhdHVyZVZhbHVlIiwidXBkYXRlTWV0aG9kIiwiZmVhdHVyZUtleSIsIm9wS2V5Iiwic3RvcmFnZSIsInBhcnNlRmxvYXQiLCJ2YWxIYXNoIiwib3BLZXlWYWwiLCJvcEtleVZhbE5hbWUiLCJxdWVyeUluQ29sbGVjdG9yIiwicXVlcnlNZXRob2QiLCJsb2NhbEtleXMiLCJsb2NhbEtleXNGaWx0ZXJlZCIsImZpbHRlciIsInN1bSIsIm1heENvdW50IiwibWF4VmFsIiwidmFsIiwiYmVhZ2xlSW5mb0xheWVyIiwiYSIsImYiLCJfX2h3bSIsInNlYXJjaFBhdGhzIiwiUGFnZVR5cGVEZXBlbmQiLCJtZXRob2QiLCJuYW1lIiwiZm9ybWF0dGVyIiwiZXhjbHVzaXZlIiwib3BlcmFuZCIsImNoaWxkcmVuIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSIsImluZm9MYXllciIsInR5cGVkVmFsdWUiLCJsYXN0S2V5IiwicG9wIiwib2JqIiwidXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciIsInBhc3NWYWx1ZVRvTGlzdGVuZXJzIiwiREFUQV9MSVNURU5FUlMiLCJhZGREYXRhTGlzdGVuZXIiLCJsaXN0ZW5lciIsInB1c2giLCJsaXN0ZW5lcnMiLCJpc0FycmF5IiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImJsb2NraW5nIiwicG9sbEludGVydmFsIiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJzZWFyY2hFbGVtZW50IiwiaXNGb3VuZCIsImlzSWdub3JlIiwiaW50ZXJ2YWwiLCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYWRkVHJlYXRtZW50IiwiZGVwZW5kYW50X29uX3RyZWF0bWVudCIsIlBBUlNFU0VBUkNITUFYUkVUUlkiLCJQQVJTRVNFQVJDSFNUQVJUREVMQVkiLCJwYXJzZVNlYXJjaFBhdGhzRGVsYXkiLCJwYXJzZVNlYXJjaFBhdGhzUmV0cnkiLCJpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIiwicHJlcGFyZUNvcmVEYXRhIiwicGFyc2VyQ2FsbGVyIiwiYWRkTWV0cmljcyIsImNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWVzIiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJwcm9jZXNzRm9ybWF0dGVyIiwidG9VcHBlckNhc2UiLCJzZWFyY2hPYmoiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJ0b0JlVXBkYXRlZCIsImNoaWxkIiwiY2hpbGRFbGVtZW50cyIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsInRyaWdnZXJSZXN0YXJ0Iiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJpbm5lclRleHQiLCJhdHRyaWJWYWx1ZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwidmFsdWVjaGlsZCIsImF0dHJpYlZhbHVlIiwiZ2V0QXR0cmlidXRlIiwic2V0VmFsdWUiLCJzdW1QcmljZSIsImNoaWxkVGV4dCIsImFycmF5SW5uZXJUZXh0IiwiZXhjbHVzaXZlRWxlbWVudCIsImN1c3RvbURhdGFEZXJpdmF0aW9ucyIsImN1cnJlbnRQYWdlVHlwZSIsImFsbCIsImlzQ2FydEVtcHR5IiwidG90YWxCYXNlUHJpY2UiLCJjb3Vwb25Ob3RBcHBsaWNhYmxlIiwicHJpY2VzIiwicXVhbnRpdGllcyIsInRvdGFsUHJpY2UiLCJjb3Vwb25BcHBsaWNhYmxlQW1vdW50Iiwic2t1Iiwic2t1TGlzdCIsInBhcnNlU2VhcmNoUGF0aHMiLCJkb21TdGF0dXMiLCJyZWFkeVN0YXRlIiwid2ludG9wIiwiZGF0YUxheWVyIiwid2luZG9jIiwiZm91bmROYW1lcyIsIlNldCIsInByZXZGb3VuZE5hbWVzIiwibm90Rm91bmROYW1lcyIsImhhcyIsInNlYXJjaEFuZFNldCIsImRhdGFMYXllckl0ZW0iLCJzb3JnQXJyYXlJbm5lciIsImdldFNPUkdBcnJheSIsInNvcmdJdGVtIiwic2l6ZSIsImpvaW4iLCJwYXRoIiwicGF0aEFycmF5Iiwic3ViUGF0aCIsInNsaWNlIiwic3ViQXJyYXkiLCJzdWJLZXkiLCJzdWJWYWx1ZSIsIndpbmRvd1B0ciIsIm5hdlB0ciIsInBsYXRmb3JtIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImF2YWlsV2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwid2luZG93RGVwdGgiLCJjb2xvckRlcHRoIiwicGl4ZWxEZXB0aCIsInZwb3J0U2hhcGUiLCJ2aXN1YWxWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0Iiwicm91bmQiLCJvcmllbnRhdGlvbkFuZ2xlIiwib3JpZW50YXRpb24iLCJhbmdsZSIsInRlbXAiLCJoaXN0b3J5IiwibmF2QWdlbnQiLCJicmFuZHMiLCJicmFuZCIsInZlcnNpb24iLCJtb2JpbGUiLCJoYXJkd2FyZUNvbmN1cnJlbmN5IiwibGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsInVzZXJMYW5ndWFnZSIsIm1heFRvdWNoUG9pbnRzIiwidmVuZG9yIiwiY29ubmVjdGlvbiIsImRvd25saW5rIiwiZG9Ob3RUcmFjayIsIm1zRG9Ob3RUcmFjayIsInJlZmVycmVyIiwiZmlyc3RTZXNzaW9uUmVmZXJyZXIiLCJwZXJmTWV0cmljcyIsInBlcmZOYXZpZ2F0aW9uTWV0cmljcyIsInBlcmZvcm1hbmNlIiwiZ2V0RW50cmllc0J5VHlwZSIsImNvbm5lY3QiLCJjb25uZWN0RW5kIiwiY29ubmVjdFN0YXJ0IiwicmVxdWVzdCIsInJlc3BvbnNlRW5kIiwicmVxdWVzdFN0YXJ0IiwiZG9tIiwiZG9tSW50ZXJhY3RpdmUiLCJkb21Db21wbGV0ZSIsImxvYWQiLCJsb2FkRXZlbnRFbmQiLCJsb2FkRXZlbnRTdGFydCIsImR1cmF0aW9uIiwic2NoZW1hT3JnRWx0cyIsInNvcmdBcnJheSIsInNUYWciLCJjbnRudCIsImpzb25jb250ZW50IiwiSEVBREVSUyIsIk1vbml0b3IiLCJoYXNBcnJpdmFsTG9nU2VudCIsImhhc01haW5Mb2dTZW50IiwiaGFzVXBkYXRlc1NlbnQiLCJoaWdoV2F0ZXJNYXJrIiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsImltbWVkaWF0ZSIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwiaHdtIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJib2R5IiwibGMiLCJ1Iiwib25IYXNoUGN0IiwiQmxvYiIsInN0YXJ0c1dpdGgiLCJzIiwibSIsInZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwidmlzaWJpbGl0eVN0YXRlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJUcmVhdG1lbnRSZXBvc2l0b3J5IiwiQ1BUIiwibWF0Y2hlZFRyZWF0bWVudHMiLCJtdCIsImNoZWNrUGFnZVR5cGUiLCJwYWdlVHlwZXMiLCJ1c2VyU2VnbWVudCIsInVzZXJTZWdtZW50V2VpZ2h0cyIsInRyZWF0bWVudCIsInNlZ21lbnRlZFdlaWdodCIsImdldE1hdGNoZWRUcmVhdG1lbnRzIiwicHQiLCJzdWJzdHIiLCJ0cmVhdG1lbnRzT2JqIiwidGltZXN0YW1wIiwidHJlYXRtZW50V2l0aFRpbWVzdGFtcCIsImVsYXBzZWRIb3VycyIsIndlaWdodHNPYmoiLCJ3ZWlnaHRzIiwicmVwbGFjZXIiLCJyZXBsYWNlRm4iLCJjdXJyZW50UmVwbGFjZUZuIiwicmVwbGFjZU9iamVjdEV4dHJhY3RvciIsInJlcGxhY2VWYWwiLCJyZXBsYWNlRm5FeGVjdXRvciIsInJGbiIsInNpbmdsZSIsInJlcGxhY2VGdW5jdGlvbiIsIkZ1bmN0aW9uIiwia2V5RmFsbGJhY2siLCJjb25maWciLCJkYk5hbWUiLCJzdG9yZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJrZXlQYXRoIiwib3BlbkRCIiwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSIsImluaXQiLCJ1cGdyYWRlIiwiZGIiLCJvbGRWZXJzaW9uIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImlkeCIsImNyZWF0ZUluZGV4IiwicmVqZWN0IiwicmVhZHdyaXRlIiwiZ2V0REIiLCJ0cmFuc2FjdGlvbiIsInBheWxvYWQiLCJnZXRTdG9yZSIsInNhdmVQcm9taXNlcyIsInB1dCIsImNsZWFyIiwiY291bnQiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwiZXhpc3RpbmdQcm9kSW5mbyIsImdldEN1cnNvciIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwiY2xlYXJQcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInNhdmUiLCJwcmVwYXJlUGF5bG9hZHMiLCJwYXlsb2FkcyIsImZpZWxkTmFtZXMiLCJzaGlmdCIsIlN0b3JlIiwiaW5zdGFuY2UiLCJnZXRJbnN0YW5jZSIsImNvbnN0cnVjdG9yIiwiYXBwbHlBY3Rpb25zIiwidHJhbnNmb3JtZXIiLCJvcGVyYXRvciIsImFwcGx5RXZlbnQiLCJjb250ZW50U2VsZWN0b3IiLCJtZENvbmRpdGlvbiIsIm1vdmVfc2VsZWN0b3JfMSIsIm1vdmVfc2VsZWN0b3JfMiIsInBUeXBlIiwicHJvZHVjdEluZm9TdG9yYWdlIiwiJCIsIm1jIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJiZWZvcmUiLCJhZnRlciIsImFwcGVuZCIsIm9mZiIsImNyZWF0ZVBvcHVwIiwiZWxtIiwidGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGlzcGxheU1vZGFsIiwiZ2V0UHJvZHVjdEluZm8iLCJldmVudCIsImRpc3BsYXlQb3B1cCIsInIiLCJkIiwicHVzaFN0YXRlIiwic3RhdGUiLCJvbmNlIiwidGV4dCIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsIm4xIiwibjIiLCJzd2FwTm9kZXMiLCJzY3JpcHRJRCIsImdldEVsZW1lbnRCeUlkIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJzZW50ZW5jZSIsIndvcmQiLCJjaGFyQXQiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInByZXBhcmVGaW5hbFRpdGxlIiwiZmluYWxUaXRsZSIsImNvbnRlbnRzIiwibm9kZVR5cGUiLCJub2RlVmFsdWUiLCJwcmVwYXJlRGVzY0VsbSIsImRlc2NyaXB0aW9uRWxtIiwibWFya2V0aW5nQ29weSIsInVwZGF0ZWRIdG1sU3RyaW5nIiwicmVwbGFjZVdpdGhWYWwiLCJ0aXRsZUF1Z21lbnQiLCJodG1sU3RyIiwic2FsZUNudFZpc2l0b3JzSW4xNSIsImNhcnRDbnRWaXNpdG9yc0luMTUiLCJ2aWV3Q250VmlzaXRvcnNJbjEiLCJ0aXRsZXMiLCJwYXJzZWRUaXRsZXMiLCJwYXJzZWRUaXRsZSIsImhpZGRlbiIsImhhbmRsZVBvcHVwQ2xpY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlTW9kYWxDbGljayIsImhpZGUiLCJxUG9wdXAiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJzcmMiLCJ0ZW1wbGF0ZSIsImlubmVySFRNTCIsInBvcHVwIiwiY29udGVudCIsImZpcnN0Q2hpbGQiLCJwMSIsInBhcmVudE5vZGUiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJlbGlnaWJsZUVsZW1lbnRzIiwiY2hlY2tBY3Rpb25Db25kaXRpb24iLCJhdHRyaWJ1dGUiLCJpbm5lcl9jb25kaXRpb24iLCJjaGFpbiIsImNvbmRpdGlvbkVsZW1lbnRzIiwiYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciIsImVsZW1lbnRTa3UiLCJmbiIsIk11dGV4IiwiT0JTRVJWRVJfQ09ORklHIiwiYXR0cmlidXRlcyIsIlJvYm90RW5naW5lIiwiZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMiLCJpc09uIiwiZW5nYWdlbWVudExvY2siLCJyZUFwcGx5VHJlYXRtZW50c01hcCIsImFkZGVkRGF0YUxpc3RlbmVySWRzIiwicm9ib3RQcm9taXNlcyIsImVuZ2FnZVJvYm90IiwiaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAiLCJlbGlnaWJpbGl0eVJ1bGVTZXQiLCJkZXZpY2UiLCJidXNpbmVzc1J1bGVTZXQiLCJoZWxwZXJzIiwiYXBwbHkiLCJhY3F1aXJlIiwicmVsZWFzZSIsImNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0IiwidHJlYXRtZW50U2tpcFJhdGlvIiwiZGV0ZXJtaW5pbmdJZGVudGlmaWVyIiwidHJlYXRtZW50UGN0IiwiY2hlY2tCdXNpbmVzc1J1bGVzIiwiaXNFbGlnaWJsZSIsImVuZ2FnZUhlbHBlcnMiLCJhZGRSZWFwcGx5RXZlbnQiLCJhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyIsImhlbHBlclJvYm90UHJvbWlzZXMiLCJjaGVjayIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJ0IiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJhcHBsaWVkIiwiYm91bmRFbmdhZ2VUcmVhdG1lbnQiLCJiaW5kIiwic2VsZWN0b3JzIiwiZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyIsInJ1bGVTZXQiLCJwcmV2aW91c1NlbGVjdG9ycyIsInJ1bGUiLCJzZXQiLCJlbGlnaWJpbGl0eVJ1bGUiLCJvcHBvc2l0ZUZsYWciLCJlbGlnaWJpbGl0eVNjb3BlIiwiZWxpZ2liaWxpdHlOYW1lIiwiZWxpZ2liaWxpdHlTZXRUeXBlIiwicHJldmlvdXNJc0VsaWdpYmxlIiwiY2hlY2tFbGlnaWJpbGl0eSIsImJ1c2luZXNzUnVsZSIsImNoZWNrRGF0YUxheWVyUnVsZSIsImRhdGFMYXllckZpbmRlciIsInJ1bnRpbWVWYWx1ZSIsImNoZWNrRWxlbWVudFJ1bGUiLCJzZWxlY3RvckFsbCIsIm1haW5TZWxlY3RvciIsInRlbXBWYWwiLCJyZXR1cm5WYWwiLCJlbGVtIiwiZWxlbWVudFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJzdHlsZUtleSIsInN0eWxlVmFsdWUiLCJjaGVja0Z1bmN0aW9uUnVsZSIsInJ1bGVGdW5jdGlvbiIsImNoZWNrU2Vzc2lvblJ1bGUiLCJkdXJhdGlvbkhhbmRsZXIiLCJoaXN0b3J5SGFuZGxlciIsImdldFNlc3Npb25UaW1lc3RhbXAiLCJjdXJyZW50SGlzdG9yeSIsImNoZWNrVXJsUnVsZSIsInJlcXVlc3RVUkwiLCJjaGVja0VudlJ1bGUiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsImdldFRpdGxlIiwiZ2V0RGVzY3JpcHRpb24iLCJnZXRGcm9tREIiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbl9jb25kaXRpb24iLCJrZXlQcm9taXNlc01hcCIsInJ1bGVzIiwicnVsZVByb21pc2VzIiwic2F0aXNmaWVkUnVsZUlkcyIsInNldFVwTGlzdGVuZXJzIiwiZmlsdGVyZWQiLCJrIiwiZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzIiwiZGF0YUxheWVyUnVsZXMiLCJlbGVtZW50UnVsZXMiLCJib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJtdXRhdGlvblJlY29yZCIsImV2ZXJ5IiwiYmFzZVJ1bGUiLCJlbGlnaWJpbGl0eVJ1bGVzT2JqIiwiYmVhZ2xlT24iLCJlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSIsImFzc2VzRWxpZ2liaWxpdHlSdWxlcyIsInRyZWF0bWVudHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50cyIsInNlYXJjaFBhcmFtcyIsImxhc3RJbmRleE9mIiwiaXRlbSIsInRyZWF0bWVudFJlcG9zaXRvcnkiLCJwcm9kdWN0SW5mb0RCIiwicGVyc2lzdFByb2R1Y3RJbmZvIiwicm9ib3RFbmdpbmUiLCJlbmdhZ2VSb2JvdHMiLCJnZXRFbGlnaWJpbGl0eVJ1bGVzIiwicnVsZUVuZ2luZSIsImNvbXB1dGVTZWdtZW50Iiwic2VnbWVudCIsInNlZ21lbnRSdWxlRW5naW5lIiwiY2hlY2tSdWxlcyIsIlNIVVRET1dOIiwibW9uaXRvciIsImVhcmx5TG9nU2VudCIsImNvb2tpZVBjdCIsInBhY2tBbmRRdWV1ZUFycml2YWxMb2ciLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJvb3NCcmVhayIsIlN0cmluZyIsInByb3RvdHlwZSIsInBhZFN0YXJ0IiwiR0xPVl9PTiIsInByb2Nlc3NBZG1pblVzZXIiLCJpc0FkbWluIiwiaXNDaGFtcCIsInNlbmRMb2dzIl0sInNvdXJjZVJvb3QiOiIifQ==
