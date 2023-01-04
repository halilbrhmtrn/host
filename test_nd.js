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
      if (!document.querySelector(action.selector) && !document.querySelector(action.selectorFallback)) return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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QUM7UUFBQTtVQUFBO1VBQUEsT0FFMUJzdUIsUUFBUSxDQUFDM3JCLFVBQVUsRUFBRW9DLFNBQVMsRUFBRTRILFFBQVEsRUFBRXJNLGdCQUFnQixFQUFFaW5CLElBQUksQ0FBQztRQUFBO1VBQUE7VUFBQTtRQUFBO1VBQUE7VUFBQTtVQUd6RXpvQixNQUFNLENBQUNILElBQUksQ0FBQyxvQkFBb0IsRUFBRSxZQUFJeUIsT0FBTyxDQUFDO1VBQzlDdkIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLFlBQUl1QixPQUFPLENBQUM7VUFDdEMsSUFBSSxDQUFDdXZCLFlBQVksSUFBSUQsT0FBTyxFQUFFQSxPQUFPLENBQUNjLFFBQVEsQ0FBQyxLQUFLLENBQUM7VUFDckR4eEIsa0JBQWtCLEVBQUU7UUFBQztRQUFBO1VBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSxDQUV4QixJQUFHLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9jb2xsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVNb25pdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL3dyYXAtaWRiLXZhbHVlLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9hY3Rpb24tY29uZGl0aW9uLXV0aWwuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9hc3luYy1tdXRleC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVPbi9yb2JvdEVuZ2luZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZGF0YUxheWVyQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZWxlbWVudENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2Z1bmN0aW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvc2Vzc2lvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3VybENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VudkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Byb2R1Y3RJbmZvQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVPbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQ2xpZW50U0RLL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIFwidXNlIHN0cmljdFwiOyAvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovXG4gIG1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSA9IGZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIGV4cG9ydHMgPSB7fSxcbiAgICBPcCA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHksXG4gICAgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgICBvYmpba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgfSxcbiAgICAkU3ltYm9sID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgPyBTeW1ib2wgOiB7fSxcbiAgICBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCIsXG4gICAgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICAgIHdyaXRhYmxlOiAhMFxuICAgIH0pLCBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yLFxuICAgICAgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpLFxuICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KSwgZ2VuZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpICYmIChJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKFwidGhyb3dcIiAhPT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmcsXG4gICAgICAgICAgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiBcIm9iamVjdFwiID09IF90eXBlb2YodmFsdWUpICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikgPyBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkgOiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQsIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICB9XG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgaWYgKFwiZXhlY3V0aW5nXCIgPT09IHN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgIGlmIChcInRocm93XCIgPT09IG1ldGhvZCkgdGhyb3cgYXJnO1xuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZCwgY29udGV4dC5hcmcgPSBhcmc7Oykge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcIm5leHRcIiA9PT0gY29udGV4dC5tZXRob2QpIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztlbHNlIGlmIChcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB7XG4gICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBjb250ZXh0Lm1ldGhvZCAmJiBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBcImNvbXBsZXRlZFwiIDogXCJzdXNwZW5kZWRZaWVsZFwiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUgJiYgKHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZCxcbiAgICAgIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgIGlmICh1bmRlZmluZWQgPT09IG1ldGhvZCkgcmV0dXJuIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBcInRocm93XCIgPT09IG1ldGhvZE5hbWUgJiYgZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0gJiYgKGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQsIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpLCBcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB8fCBcInJldHVyblwiICE9PSBtZXRob2ROYW1lICYmIChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAnXCIgKyBtZXRob2ROYW1lICsgXCInIG1ldGhvZFwiKSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgcmV0dXJuIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcsIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICByZXR1cm4gaW5mbyA/IGluZm8uZG9uZSA/IChjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZSwgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYywgXCJyZXR1cm5cIiAhPT0gY29udGV4dC5tZXRob2QgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpIDogaW5mbyA6IChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIiksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG4gICAgMSBpbiBsb2NzICYmIChlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV0pLCAyIGluIGxvY3MgJiYgKGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdLCBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM10pLCB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIiwgZGVsZXRlIHJlY29yZC5hcmcsIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV0sIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKSwgdGhpcy5yZXNldCghMCk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGl0ZXJhYmxlLm5leHQpIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgZm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkgcmV0dXJuIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dC52YWx1ZSA9IHVuZGVmaW5lZCwgbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogITBcbiAgICB9O1xuICB9XG4gIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lUHJvcGVydHkoR3AsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSwgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBnZW5GdW4gJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiAhIWN0b3IgJiYgKGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA9PT0gKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSk7XG4gIH0sIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpIDogKGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIikpLCBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCksIGdlbkZ1bjtcbiAgfSwgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKSwgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIHZvaWQgMCA9PT0gUHJvbWlzZUltcGwgJiYgKFByb21pc2VJbXBsID0gUHJvbWlzZSk7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKSwgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIiksIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pLCBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpLFxuICAgICAga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cy5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsga2V5cy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkgcmV0dXJuIG5leHQudmFsdWUgPSBrZXksIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgIH07XG4gIH0sIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoc2tpcFRlbXBSZXNldCkge1xuICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQsIHRoaXMuZG9uZSA9ICExLCB0aGlzLmRlbGVnYXRlID0gbnVsbCwgdGhpcy5tZXRob2QgPSBcIm5leHRcIiwgdGhpcy5hcmcgPSB1bmRlZmluZWQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhc2tpcFRlbXBSZXNldCkgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgIFwidFwiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLmRvbmUgPSAhMDtcbiAgICAgIHZhciByb290UmVjb3JkID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByb290UmVjb3JkLnR5cGUpIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSBcInRocm93XCIsIHJlY29yZC5hcmcgPSBleGNlcHRpb24sIGNvbnRleHQubmV4dCA9IGxvYywgY2F1Z2h0ICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKFwicm9vdFwiID09PSBlbnRyeS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIiksXG4gICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNGaW5hbGx5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHRocm93IHJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSByZWNvcmQudHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHJlY29yZC50eXBlID8gdGhpcy5uZXh0ID0gcmVjb3JkLmFyZyA6IFwicmV0dXJuXCIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSBcInJldHVyblwiLCB0aGlzLm5leHQgPSBcImVuZFwiKSA6IFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIGZpbmlzaChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uIF9jYXRjaCh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gZGVsZWdhdGVZaWVsZChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9LCBcIm5leHRcIiA9PT0gdGhpcy5tZXRob2QgJiYgKHRoaXMuYXJnID0gdW5kZWZpbmVkKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH0sIGV4cG9ydHM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvYmopO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS5cblxudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi4vaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWVcIikoKTtcbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcblxuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9wYWNrYWdlcy9ydW50aW1lL3J1bnRpbWUuanMjTDczNj1cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCB0b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGNvbnN0IHJlcGxhY2VBbGwgPSAoc3RyLCBmaW5kLCByZXBsYWNlID0gXCJcIikgPT4ge1xuICBpZiAoIXN0cikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIHN0cjtcblxuICB3aGlsZSAoc3RyLmluZGV4T2YoZmluZCkgPj0gMCkge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gICAgc3RyID0gKGluZGV4ID4gMCA/IHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpIDogXCJcIikgKyByZXBsYWNlICsgc3RyLnN1YnN0cmluZyhpbmRleCArIGZpbmQubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5leHBvcnQgY29uc3QgdHVya2lzaFRvTG93ZXIgPSAoc3RyKSA9PiB7XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XG4gIGxldCBzdHJpbmcgPSBzdHI7XG4gIGNvbnN0IGxldHRlcnMgPSB7XCLEsFwiOiBcImlcIiwgXCJJXCI6IFwixLFcIiwgXCLFnlwiOiBcIsWfXCIsIFwixJ5cIjogXCLEn1wiLCBcIsOcXCI6IFwiw7xcIiwgXCLDllwiOiBcIsO2XCIsIFwiw4dcIjogXCLDp1wifTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygoW8SwScWexJ7DnMOHw5ZdKSkvZywgZnVuY3Rpb24obGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlcnNbbGV0dGVyXTtcbiAgfSk7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuL3N0cmluZ1V0aWxzXCI7XG5jb25zdCBpc1N0YWdpbmcgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJzdGFnaW5nLnZpdmVuc2VcIikgOiB0cnVlO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMC4wLjQwLjlcIjtcbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA9IFwiX2dhXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0cy5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0lORk9fTE9DQVRJT04gPSBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvc29jaWFsLXByb29mLXYyLmpzb25cIjtcbmV4cG9ydCBjb25zdCBMT0dfQVBJX1VSTCA9IFwiaHR0cHM6Ly9ldXJvcGUtd2VzdDMtbmV4dGRheS0zNGViMy5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2xvZ1wiO1xuZXhwb3J0IGNvbnN0IExPT0tVUF9BUElfVVJMID0gXCJodHRwczovL2NhdGFsb2ctYXBpLmFkb3JhYWkuY29tXCI7XG5leHBvcnQgY29uc3QgTU9CSUxFX01FRElBX1FVRVJZID0gXCIobWF4LXdpZHRoOiA0NDBweClcIjtcbi8vIENvbnRyb2wgZ3JvdXAgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFNQTElUX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgTEFCX1JBVElPID0gMjA7XG4vLyBTa2lwcGVkIHRyZWF0bWVudCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMgPSAyO1xuZXhwb3J0IGNvbnN0IExJU1RfTU9ERV9CRUFHTEVfS0VZUyA9IFtcInBhZ2V0eXBlXCIsIFwiY2F0ZWdvcnlcIiwgXCJhbGx0aW1lUExQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBMUENhdGVnb3J5TW9kZVwiLFxuICBcImFsbHRpbWVQRFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUERQQ2F0ZWdvcnlNb2RlXCIsIFwiYWxsdGltZUNhcnRDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uQ2FydENhdGVnb3J5TW9kZVwiXTtcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBQT1BVUF9ESVNQTEFZX0ZMQUc6IFwiQkdfUG9wdXBEaXNwbGF5RmxhZ1wiLFxuICBTS1VfSU5GT19CQVNLRVQ6IFwiQkdfUHJvZHVjdEluZm9CYXNrZXRcIixcbiAgU0VTU0lPTl9SRUZFUlJFUjogXCJCR19TZXNzaW9uUmVmZXJyZXJcIixcbiAgTUFUQ0hFRF9UUkVBVE1FTlRTOiBcIkdMVl9NYXRjaGVkXCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgVFJFQVRNRU5UUzogXCJCR19UcmVhdG1lbnRzXCIsXG4gIFdFSUdIVFM6IFwiQkdfV2VpZ2h0c1wiLFxuICBFTElHSUJJTElUWV9SVUxFUzogXCJCR19FX1J1bGVzXCIsXG4gIERFQlVHX01PREU6IFwiQkdfRGVidWdcIixcbiAgT1VUX09GX1NDT1BFOiBcIkdMVl9PdXRPZlNjb3BlXzAwXCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAxXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG4gIElTX0FETUlOOiBcIkdMVl9Jc0FkbWluXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gbnVsbCA9PSBhcnIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IF9pKSB7XG4gICAgdmFyIF9zLFxuICAgICAgX2UsXG4gICAgICBfeCxcbiAgICAgIF9yLFxuICAgICAgX2FyciA9IFtdLFxuICAgICAgX24gPSAhMCxcbiAgICAgIF9kID0gITE7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfeCA9IChfaSA9IF9pLmNhbGwoYXJyKSkubmV4dCwgMCA9PT0gaSkge1xuICAgICAgICBpZiAoT2JqZWN0KF9pKSAhPT0gX2kpIHJldHVybjtcbiAgICAgICAgX24gPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShfbiA9IChfcyA9IF94LmNhbGwoX2kpKS5kb25lKSAmJiAoX2Fyci5wdXNoKF9zLnZhbHVlKSwgX2Fyci5sZW5ndGggIT09IGkpOyBfbiA9ICEwKSB7XG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gITAsIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIG51bGwgIT0gX2lbXCJyZXR1cm5cIl0gJiYgKF9yID0gX2lbXCJyZXR1cm5cIl0oKSwgT2JqZWN0KF9yKSAhPT0gX3IpKSByZXR1cm47XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2FycjtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAga2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgU1RZTEVTSEVFVF9MT0NBVElPTixcbiAgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04sXG4gIFRSRUFUTUVOVFNfTE9DQVRJT04sXG4gIEVfUlVMRVNfTE9DQVRJT04sXG4gIFBST0RVQ1RfSU5GT19MT0NBVElPTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3Qgc3dpdGNoVG9FYXNlT3V0ID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtaGlkZVwiKSkgcmV0dXJuO1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZWwudGV4dENvbnRlbnQgPSBgLmdsb3YtZWFzZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtby1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tcy1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIGFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuMjU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDc1JSB7IG9wYWNpdHk6IDAuNTA7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDkwJSB7IG9wYWNpdHk6IDAuNzU7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpfVxuICAgIDEwMCUgeyBvcGFjaXR5OiAxOyBmaWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IC13ZWJraXQtZmlsdGVyOiBncmF5c2NhbGUoMCUpO31cbiAgfWA7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnByZXBlbmQoZWwpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ2xvdi1lYXNlXCIpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudCA9IGF3YWl0IHRyZWF0bWVudHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnQgd2VpZ2h0c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudCB3ZWlnaHRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoUGx1cyhFX1JVTEVTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25FbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZWxpZ2liaWxpdHlSdWxlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25FbGlnaWJpbGl0eVJ1bGVzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoUHJvZHVjdEluZm8gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHByb2R1Y3QgaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoUGx1cyhQUk9EVUNUX0lORk9fTE9DQVRJT04pO1xuICAgIGlmICghcHJvZHVjdEluZm8pIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvSnNvbiA9IGF3YWl0IHByb2R1Y3RJbmZvLmpzb24oKTtcbiAgICByZXR1cm4gcHJvZHVjdEluZm9Kc29uO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSk7XG4gIHJldHVybiB7Y29udHJvbGxlciwgdGltZW91dElEfTtcbn07XG5cbmNvbnN0IGZldGNoUGx1cyA9ICh1cmwsIG9wdGlvbnMgPSB7fSwgcmV0cmllcyA9IDUpID0+IHtcbiAgY29uc3Qge2NvbnRyb2xsZXIsIHRpbWVvdXRJRH0gPSB0aW1lb3V0KDUwMDApO1xuICByZXR1cm4gZmV0Y2godXJsLCB7Li4ub3B0aW9ucywgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIHRpbWVkIG91dCBSZXRyeWluZy4uLjogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIG9mIHllYXIgdG8gaGFzaCB0byByZXNldCBpdCBldmVyeSBtb250aFxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBub3cuZ2V0TW9udGgoKTtcbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIrbW9udGgudG9TdHJpbmcoKSk7XG5cbiAgICBpZiAoaGFzaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhcmlhbnRLZXldIG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiAhYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSBNYXRoLmZsb29yKDEwMCAvIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpICogKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0FjdGlvblNlbGVjdG9ycyA9IChwcmVwYXJlZEFjdGlvbnMpID0+IHtcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgcHJlcGFyZWRBY3Rpb25zKSB7XG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFjdGlvbi5zZWxlY3RvcikgJiYgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYWN0aW9uLnNlbGVjdG9yRmFsbGJhY2spKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUcsIFNFU1NJT05fVElNRVNUQU1QLCBTRVNTSU9OX0hJU1RPUll9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgcG9wdXBEaXNwbGF5RmxhZyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKTtcbiAgY29uc3Qgc2Vzc2lvblRpbWVzdGFtcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVApO1xuICBjb25zdCBzZXNzaW9uSGlzdG9yeSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9ISVNUT1JZKTtcblxuICBpZiAocG9wdXBEaXNwbGF5RmxhZyA9PT0gbnVsbCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAwKTtcbiAgfVxuICBpZiAoIXNlc3Npb25UaW1lc3RhbXApIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QLCBEYXRlLm5vdygpKTtcbiAgfVxuICBpZiAoIXNlc3Npb25IaXN0b3J5KSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVdKTtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgc2Vzc2lvbkhpc3RvcnldKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmRpdGlvbkNoZWNrZXIgPSAocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGlmIChjb25kaXRpb24gPT09IFwibm90RXhpc3RcIikge1xuICAgIGlmICghcnVuVGltZVZhbHVlKSB7XG4gICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8XG4gICAgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICBjb25kaXRpb24gPT09IG51bGwgfHxcbiAgICBjb25kaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBydW5UaW1lVmFsdWUgb3IgY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKGNvbmRpdGlvbikge1xuICAgIGNhc2UgXCJleGlzdFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJpbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJjb250YWluc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90SW5jbHVkZXNcIjpcbiAgICBjYXNlIFwibm90Q29udGFpbnNcIjpcbiAgICAgIGlmICghcnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJlcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RFcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDw9IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJiZXR3ZWVuXCI6IHtcbiAgICAgIGxldCBbbWluLCBtYXhdID0gdmFsdWUuc3BsaXQoXCIsXCIpO1xuICAgICAgbWluID0gcGFyc2VJbnQobWluKTtcbiAgICAgIG1heCA9IHBhcnNlSW50KG1heCk7XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IG1pbiAmJiBydW5UaW1lVmFsdWUgPD0gbWF4KSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNhc2UgXCJyZWdleFwiOiB7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsdWUsIFwiaVwiKTtcbiAgICAgIHJldHVybiByZWdleC50ZXN0KHJ1blRpbWVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkIFwiLCBjb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGVidWdNb2RlID0gKG9vc1JlYXNvbikgPT4ge1xuICBjb25zdCB7REVCVUdfTU9ERSwgT1VUX09GX1NDT1BFfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz1cIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oT1VUX09GX1NDT1BFLCBvb3NSZWFzb24pO1xuICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTFcIikpIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MlwiKSkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICAgIHJldHVybiAyO1xuICAgIH1cbiAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0tMVwiKSkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIC0xKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTBcIikpIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG4gIGNvbnN0IGN1cnJlbnQgPSBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oREVCVUdfTU9ERSkpO1xuICBpZiAoTnVtYmVyLmlzTmFOKGN1cnJlbnQpKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgcmV0dXJuIGN1cnJlbnQ7XG59O1xuXG4vLyBnZXQgR0EgY2xpZW50IGlkIHVzaW5nIGdhLmdldEFsbCgpXG5leHBvcnQgY29uc3QgZ2V0R2FDbGllbnRJZCA9ICgpID0+IHtcbiAgY29uc3QgZ2EgPSB3aW5kb3cuZ2E7XG4gIC8vIGlmIGdhIGFuZCBnYS5nZXRBbGwoKSBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIG51bGxcbiAgaWYgKGdhICYmIGdhLmdldEFsbCkge1xuICAgIGNvbnN0IHRyYWNrZXJzID0gZ2EuZ2V0QWxsKCk7XG4gICAgaWYgKHRyYWNrZXJzICYmIHRyYWNrZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRyYWNrZXJzWzBdLmdldChcImNsaWVudElkXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIGdldCBkZXRlcm1pbmlzdGljIG51bWVyaWMgaGFzaCBmcm9tIHN0cmluZyB0aGF0IGNvbnRhaW5zIG9ubHkgbnVtYmVyc1xuZXhwb3J0IGNvbnN0IGdldFVuc2VjdXJlSGFzaCA9IChzdHIpID0+IHtcbiAgLy8gc3RhcnQgd2l0aCBhIG1hZ2ljIG51bWJlciwgdXNlIHBpIGRpZ2l0c1xuICBsZXQgaGFzaCA9IDMxNDE1OTI2NTtcbiAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBtYWtlIGl0IHN0cmluZ1xuICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xuICB9XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gIH1cbiAgLy8gcmV0dXJuIGFic29sdXRlIHZhbHVlXG4gIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbn07XG5cbi8vIGdlbmVyYXRlIGEgMzItYml0IHJhbmRvbSBpbnRlZ2VyXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApO1xufTtcblxuLy8gZ2V0IGN1cnJlbnQgdW5peCBlcG9jaCB0aW1lIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBnZXRVbml4VGltZSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0SWRlbnRpZmllciA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBsb2NhbCBzdG9yYWdlXCIsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2EgaW4gZmlyc3QgYXR0ZW1wdFwiLCBpZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2FcIiwgaWQpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgcmVhZCBHQSBjbGllbnQgaWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGluIGdldElkZW50aWZpZXJcIiwgZSk7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGVsaXZlcnlEYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZGF0ZTtcblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgc3RhcnRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgZW5kTW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIHN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgZW5kRGF5OiB1bmRlZmluZWQsXG4gIH07XG5cbiAgbGV0IG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKyktKFtcXFxcZF0rKVxcXFxzPyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzNdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKS0oW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCAhPT0gNSkgcmV0dXJuIGRhdGU7XG5cbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFsyXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzRdLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5zdGFydE1vbnRoSW5kZXggfHwgIXJlc3VsdC5lbmRNb250aEluZGV4KSByZXR1cm4gZGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0WWVhciA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBjb25zdCBlbmRZZWFyID0gcmVzdWx0LmVuZE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcblxuICAgIGNvbnN0IGVzdGltYXRlZFN0YXJ0ID0gbmV3IERhdGUoc3RhcnRZZWFyLCByZXN1bHQuc3RhcnRNb250aEluZGV4LCByZXN1bHQuc3RhcnREYXkpO1xuICAgIGNvbnN0IGVzdGltYXRlZEVuZCA9IG5ldyBEYXRlKGVuZFllYXIsIHJlc3VsdC5lbmRNb250aEluZGV4LCByZXN1bHQuZW5kRGF5KTtcblxuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkU3RhcnQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRFbmQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlcldlZWtzID0gc3RhcnREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChzdGFydERpZmZPdmVyRGF5cyAvIDcpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyV2Vla3MgPSBlbmREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChlbmREaWZmT3ZlckRheXMgLyA3KTtcblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSAtICR7ZW5kRGlmZk92ZXJEYXlzfSBHw7xuYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPj0gMSkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSBHw7xuIC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gZW5kRGlmZk92ZXJXZWVrcykge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaWRsZVRpbWVyID0gYXN5bmMgKHRpbWVPdXQsIGNhbGxCYWNrKSA9PiB7XG4gIGxldCBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQub250b3VjaHN0YXJ0ID0gcmVzZXRUaW1lcjtcblxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xuICAgIGNsZWFyVGltZW91dChpZGxlVGltZW91dCk7XG4gICAgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlzT3duTXV0YXRpb24gPSAobXV0YXRpb25MaXN0KSA9PiB7XG4gIGNvbnN0IG5vZGVzID0gWy4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5yZW1vdmVkTm9kZXMpXTtcbiAgcmV0dXJuIG5vZGVzLnNvbWUoKG4pID0+IHtcbiAgICByZXR1cm4gbi50YWdOYW1lICYmIChuLmlkPy5pbmNsdWRlcyhcImJuLVwiKSB8fCBBcnJheS5mcm9tKG4uY2xhc3NMaXN0KS5zb21lKChjKSA9PiBjLmluY2x1ZGVzKFwiYm4tXCIpIHx8IGMuaW5jbHVkZXMoXCJuZC1cIikpKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QWdlbnREZXRhaWxzID0gKCkgPT4ge1xuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgLy8gZXh0cmFjdCBicm93c2VyIGFuZCB2ZXJzaW9uXG4gIGNvbnN0IGJyID0gdWEubWF0Y2goLyhvcGVyYXxlZGd8dHJpZGVudHxmaXJlZm94fG1zaWUoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8XG4gICAgdWEubWF0Y2goLyhzYWZhcml8Y2hyb21lKD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fFxuICAgIHVhLm1hdGNoKC8od2Via2l0KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fCBbXTtcblxuICBpZiAoIWJyIHx8IGJyLmxlbmd0aCA8IDMpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBiTmFtZSA9IGJyWzFdO1xuICBjb25zdCBiVmVyc2lvbiA9IGJyWzJdO1xuXG4gIGNvbnN0IG9zID0ge1xuICAgIFdpbmRvd3M6IC9XaW4vaS50ZXN0KHVhKSxcbiAgICBNYWM6IC9NYWMvaS50ZXN0KHVhKSxcbiAgICBMaW51eDogL0xpbnV4L2kudGVzdCh1YSksXG4gICAgQW5kcm9pZDogL0FuZHJvaWQvaS50ZXN0KHVhKSxcbiAgICBpT1M6IC9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdCh1YSksXG4gIH07XG5cbiAgLy8gZXh0cmFjdCBPUyBhbmQgdmVyc2lvblxuICBsZXQgb3NWZXJzaW9uID0gXCJcIjtcbiAgbGV0IG9zTmFtZSA9IFwiXCI7XG4gIGlmIChvcy5XaW5kb3dzKSB7XG4gICAgb3NOYW1lID0gXCJXaW5kb3dzXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL1dpbmRvd3MgTlQgKFswLTkuXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuaU9TKSB7XG4gICAgb3NOYW1lID0gXCJpT1NcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvT1MgKFswLTlfXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdLnJlcGxhY2UoL18vZywgXCIuXCIpIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuTWFjKSB7XG4gICAgb3NOYW1lID0gXCJNYWNcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvTWFjIE9TIFggKFswLTlfXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdLnJlcGxhY2UoL18vZywgXCIuXCIpIDogXCJ1bmtub3duXCI7XG4gIH0gZWxzZSBpZiAob3MuQW5kcm9pZCkge1xuICAgIG9zTmFtZSA9IFwiQW5kcm9pZFwiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9BbmRyb2lkIChbMC05Ll0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwidW5rbm93blwiO1xuICB9IGVsc2UgaWYgKG9zLkxpbnV4KSB7XG4gICAgb3NOYW1lID0gXCJMaW51eFwiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9MaW51eCAoW2lcXGRdKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcInVua25vd25cIjtcbiAgfVxuXG4gIC8vIGV4dHJhY3QgbW9iaWxlIG9yIGRlc2t0b3BcbiAgY29uc3QgaXNNb2JpbGUgPSAvTW9iaS9pLnRlc3QodWEpO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmJyb3dzZXJOYW1lXCIsIGJOYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuYnJvd3NlclZlcnNpb25cIiwgYlZlcnNpb24pO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5vc05hbWVcIiwgb3NOYW1lKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uub3NWZXJzaW9uXCIsIG9zVmVyc2lvbik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmlzTW9iaWxlXCIsIGlzTW9iaWxlKTtcblxuICBjb25zdCBpc1N1cHBvcnRlZEJyb3dzZXIgPSBiTmFtZSA9PT0gXCJDaHJvbWVcIiB8fCBiTmFtZSA9PT0gXCJTYWZhcmlcIjtcbiAgY29uc3QgaXNTdXBwb3J0ZWRPUyA9IG9zTmFtZSA9PT0gXCJNYWNcIiB8fCBvc05hbWUgPT09IFwiV2luZG93c1wiIHx8IG9zTmFtZSA9PT0gXCJBbmRyb2lkXCIgfHwgb3NOYW1lID09PSBcImlPU1wiO1xuXG4gIHJldHVybiBpc1N1cHBvcnRlZEJyb3dzZXIgJiYgaXNTdXBwb3J0ZWRPUztcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRVUkxEYXRhID0gKCkgPT4ge1xuICBjb25zdCBjdXJyZW50VVJMID0gbmV3IFVSTCh3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInVcIiwgY3VycmVudFVSTC5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIGN1cnJlbnRVUkwuaG9zdG5hbWUpO1xuXG4gIC8qIFZpdmVuc2Ugc3BlY2lmaWMgKi9cbiAgbGV0IHBhZ2VUeXBlO1xuICAvLyBpZiB1cmwgbGlrZSB4IHRoZW4gc2V0IFBhZ2VUeXBlID0geVxuICBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZmF2b3JpbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImZhdm9yaXRlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYmFza2V0XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1vemV0aS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHVyY2hhc2VcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJvZGVtZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGF5bWVudFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImFkZHJlc3NcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBhc3RvcmRlcnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUta2F5aXQuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInJlZ2lzdGVyXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWdpcmlzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic2lnbmluXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwia3Vwb25sYXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9jb3Vwb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwicHJvZmlsLWd1bmNlbGxlLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2luZm9cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2FkZHJlc3Nlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImR1eXVydS10ZXJjaWhsZXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX25vdGlmaWNhdGlvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJpbmRpcmltbGktbW9iaWx5YS1rYW1wYW55YWxhcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNwZWNpYWxfY2FtcGFpZ25zXCI7XG4gIH1cblxuICBpZiAocGFnZVR5cGUpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHBhZ2VUeXBlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXb3JrIGFyb3VuZCBTYWZhcmkgMTQgSW5kZXhlZERCIG9wZW4gYnVnLlxuICpcbiAqIFNhZmFyaSBoYXMgYSBob3JyaWJsZSBidWcgd2hlcmUgSURCIHJlcXVlc3RzIGNhbiBoYW5nIHdoaWxlIHRoZSBicm93c2VyIGlzIHN0YXJ0aW5nIHVwLiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjI2NTQ3XG4gKiBUaGUgb25seSBzb2x1dGlvbiBpcyB0byBrZWVwIG51ZGdpbmcgaXQgdW50aWwgaXQncyBhd2FrZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGlkYlJlYWR5ID0gKCkgPT4ge1xuICBjb25zdCBpc1NhZmFyaSA9XG4gICAgIW5hdmlnYXRvci51c2VyQWdlbnREYXRhICYmXG4gICAgL1NhZmFyaVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJlxuICAgICEvQ2hyb20oZXxpdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIC8vIE5vIHBvaW50IHB1dHRpbmcgb3RoZXIgYnJvd3NlcnMgb3Igb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIHRocm91Z2ggdGhpcyBtZXNzLlxuICBpZiAoIWlzU2FmYXJpIHx8ICFpbmRleGVkREIuZGF0YWJhc2VzKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgbGV0IGludGVydmFsSWQ7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgdHJ5SWRiID0gKCkgPT4gaW5kZXhlZERCLmRhdGFiYXNlcygpLmZpbmFsbHkocmVzb2x2ZSgpKTtcbiAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodHJ5SWRiLCA1MCk7XG4gICAgdHJ5SWRiKCk7XG4gIH0pLmZpbmFsbHkoKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldFVuc2VjdXJlSGFzaH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92SW5mb0xheWVyXCIpO1xuY29uc3QgTFNfUHJlZml4ID0gXCJHTERDX1wiO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwidXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpO1xuXG4gICAgLy8gcmVtb3ZlIGRvdHMgaW4gYmFzZUZlYXR1cmVOYW1lIGFuZCBhZGQgcHJlZml4XG4gICAgY29uc3QgZmVhdHVyZUtleSA9IExTX1ByZWZpeCArIGJhc2VGZWF0dXJlTmFtZS5yZXBsYWNlKC9cXC4vZywgXCJfXCIpO1xuICAgIGNvbnN0IG9wS2V5ID0gZmVhdHVyZUtleSArIFwiX1wiICsgdXBkYXRlTWV0aG9kO1xuXG4gICAgc3dpdGNoICh1cGRhdGVNZXRob2QpIHtcbiAgICAgIGNhc2UgXCJtaW5cIjpcbiAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBtaW4gYW5kIG1heCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcblxuICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0ob3BLZXkpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBNYXRoW3VwZGF0ZU1ldGhvZF0odmFsdWUsIGJhc2VGZWF0dXJlVmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic3VtXCI6XG4gICAgICAgIC8vIGNvbXB1dGUgc3VtIGFuZCBjb3VudCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgcGFyc2VGbG9hdCh2YWx1ZSkgKyBwYXJzZUZsb2F0KGJhc2VGZWF0dXJlVmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5LCBiYXNlRmVhdHVyZVZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJjbnRcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBjb3VudCBmb3IgbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgcGFyc2VJbnQodmFsdWUpICsgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICAvLyBjb21wdXRlIGxhc3Qgb2J0YWluZWQgdmFsdWUgaW4gbG9jYWwgYW5kIHNlc3Npb24gc3RvcmFnZXNcbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImNvdW50X3ZhbHVlc1wiIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlcywga2VlcCBhIGNvdW50ZXIgZm9yIGVhY2ggdmFsdWVcbiAgICAgIGNhc2UgXCJ2YWxjbnRzXCI6XG4gICAgICAgIHtcbiAgICAgICAgICAvLyBjb21wdXRlIGNvdW50IG9mIGVhY2ggdmFsdWUgZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgICAgLy8gY3JlYXRlIGEgOCBieXRlcyBoZXggaGFzaCBmb3IgYmFzZUZlYXR1cmVWYWx1ZSwgb25seSBwb3NpdGl2ZSBudW1iZXJzXG4gICAgICAgICAgY29uc3QgdmFsSGFzaCA9IGdldFVuc2VjdXJlSGFzaChiYXNlRmVhdHVyZVZhbHVlKTtcblxuICAgICAgICAgIGNvbnN0IG9wS2V5VmFsID0gb3BLZXkgKyBcIl9cIiArIHZhbEhhc2g7XG4gICAgICAgICAgY29uc3Qgb3BLZXlWYWxOYW1lID0gb3BLZXkgKyBcIl9cIiArIHZhbEhhc2ggKyBcIl9uYW1lXCI7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWxOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKTtcblxuICAgICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5VmFsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXlWYWwsIHBhcnNlSW50KHZhbHVlKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5VmFsLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIGluIHVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kLCBlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5SW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcInF1ZXJ5SW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KTtcblxuICAgIGNvbnN0IGZlYXR1cmVLZXkgPSBMU19QcmVmaXggKyBiYXNlRmVhdHVyZU5hbWUucmVwbGFjZSgvXFwuL2csIFwiX1wiKTtcbiAgICBsZXQgb3BLZXk7XG5cbiAgICBsZXQgc3RvcmFnZSA9IG51bGw7XG4gICAgaWYgKHdpbmRvdyA9PT0gXCJhbGx0aW1lXCIpIHtcbiAgICAgIHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cgPT09IFwic2Vzc2lvblwiKSB7XG4gICAgICBzdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcIkludmFsaWQgd2luZG93IHR5cGVcIiwgd2luZG93KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN3aXRjaCAocXVlcnlNZXRob2QpIHtcbiAgICAgIC8vIGZvciBsYXN0LCBtaW4sIG1heCwgc3VtIGV0Yy4gYnJpbmcgdGhlIHZhbHVlIGZyb20gbG9jYWwvc2Vzc2lvbiBzdG9yYWdlIGdpdmVuIHRoZSB3aW5kb3cgaXMgc2Vzc2lvbiBvciBhbGx0aW1lXG4gICAgICBjYXNlIFwibWluXCI6XG4gICAgICBjYXNlIFwibWF4XCI6XG4gICAgICBjYXNlIFwic3VtXCI6XG4gICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl9cIiArIHF1ZXJ5TWV0aG9kO1xuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcblxuICAgICAgICAvLyBmb3IgY3YsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRzaWl0bmN0IHZhbHVlcywgb2J0YWluIGJ5IHNjYW5uaW5nIHRoZSBwcmVmaXggb2YgdGhlIGtleSBpbiB0aGUgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlXG4gICAgICAgIC8vIGZvciBtb2RlLCBzY2FuIHRoZSBsb2NhbC9zZXNzaW9uIHN0b3JhZ2UgYW5kIHJldHVybiB0aGUgdmFsdWUgd2l0aCB0aGUgaGlnaGVzdCBjb3VudFxuICAgICAgY2FzZSBcImNudHZhbHNcIjpcbiAgICAgIGNhc2UgXCJzdW12YWxzXCI6XG4gICAgICBjYXNlIFwibW9kZVwiOlxuICAgICAge1xuICAgICAgICBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl92YWxjbnRzXCI7XG4gICAgICAgIGNvbnN0IGxvY2FsS2V5cyA9IE9iamVjdC5rZXlzKHN0b3JhZ2UpO1xuICAgICAgICBjb25zdCBsb2NhbEtleXNGaWx0ZXJlZCA9IGxvY2FsS2V5cy5maWx0ZXIoKGtleSkgPT4ga2V5LmluZGV4T2Yob3BLZXkpID09PSAwICYmIGtleS5pbmRleE9mKFwiX25hbWVcIikgPT09IC0xKTtcbiAgICAgICAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImNudHZhbHNcIikge1xuICAgICAgICAgIHJldHVybiBsb2NhbEtleXNGaWx0ZXJlZC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwic3VtdmFsc1wiKSB7XG4gICAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgICAgbG9jYWxLZXlzRmlsdGVyZWQuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBzdW0gKz0gcGFyc2VJbnQoc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzdW07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF4Q291bnQgPSBudWxsO1xuICAgICAgICBsZXQgbWF4VmFsID0gbnVsbDtcbiAgICAgICAgbG9jYWxLZXlzRmlsdGVyZWQuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsID0gcGFyc2VJbnQoc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgICAgICAgIGlmIChtYXhWYWwgPT09IG51bGwgfHwgbWF4Q291bnQgPT09IG51bGwgfHwgbWF4Q291bnQgPCB2YWwpIHtcbiAgICAgICAgICAgIG1heENvdW50ID0gdmFsO1xuICAgICAgICAgICAgLy8gbmFtZXMgYXJlIG9ubHkgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgbWF4VmFsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5ICsgXCJfbmFtZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWF4VmFsO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciBpbiBxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdywgZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2Zvcm1hdERlbGl2ZXJ5RGF0ZSwgaXNPd25NdXRhdGlvbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge3F1ZXJ5SW5Db2xsZWN0b3IsIHVwZGF0ZUluQ29sbGVjdG9yfSBmcm9tIFwiLi9jb2xsZWN0b3JcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG53aW5kb3cuYmVhZ2xlSW5mb0xheWVyID0gd2luZG93LmJlYWdsZUluZm9MYXllciB8fCB7XG4gIGE6IHt9LCBlOiB7fSwgZjoge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZJbmZvTGF5ZXJcIik7XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5jb25zdCBzZWFyY2hQYXRocyA9IFtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHQSBEYXRhIExheWVyIFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlBhZ2VUeXBlXCIsIG5hbWU6IFwiUGFnZVR5cGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwidXBwZXJDYXNlVFJcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5kZXRhaWwuYWN0aW9uRmllbGQubGlzdFwiLCBuYW1lOiBcInBkcC5saXN0YWxpYXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5kaXNjb3VudFJhdGVcIiwgbmFtZTogXCJwZHAuZGlzY291bnRSYXRlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInNlYXJjaF9zdWNjZXNzXCIsIG5hbWU6IFwicGxwLnNlYXJjaFN1Y2Nlc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuaWRcIiwgXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBcInBscC5uYW1lXCIsIFwicGxwLmdyb3VwXCIsIFwicGxwLmNsYXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJMaXN0aW5ncGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtbWFpbi1kZXRhaWxzXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZW1wdHlfYmFza2V0X3RleHRcXFwiXVwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC50b3RhbEJhc2VQcmljZVwiLCBcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltpZCo9XFxcImNhcnRfcXVhbnRpdHlcXFwiXSwgW2NsYXNzKj1cXFwiYmFza2V0X2xlbmd0aFxcXCJdXCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LXRpdGxlXFxcIl0sIFtjbGFzcyo9XFxcImhlYWRlci1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcInNwYW4ucHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI3NhbGVzLXByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImRpdi5wcm9kdWN0LXByaWNlLWJveFwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjbW9iaWxlLXByb2R1Y3Qtc3RpY2t5XCIsIG5hbWU6IFwiX19wcmljZU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJwZHAucHJpY2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByb2R1Y3Qtc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuZW1wdHktY2FydC1jb250YWluZXIsIC5lbXB0eS1jYXJ0XCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuYnJhY2tldC10ZXh0LCAucHJvZHVjdC1jb3VudFwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydEl0ZW1RdWFudGl0eVwiLCBuYW1lOiBcImNhcnQucXVhbnRpdGllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJldmlvdXNcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjYmlsbF90b3RhbFwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyLWZpbmFsLW51bWJlclxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXJ0LXByaWNlXFxcIl0gLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3Vwb25BcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5jYXRlZ29yaWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1sYXN0LWJyZWFkY3J1bWJcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnByaWNlc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJpY2VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICAvLyBEZXNrdG9wIG9ic2VydmVyIGZvciB0aGUgcmlnaHQgcGFuZWwsIGFzIGl0IGlzIHRoZSBvbmUgY2hhbmdpbmdcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtcmlnaHQtY29udGFpbmVyXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3N1bW1hcnlfdG90YWxcXFwiXSwgW2NsYXNzKj1cXFwidG90YWxfcm93XFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyX2ZvbGxvd19udW1iXFxcIl0sIFtjbGFzcyo9XFxcImNhcnQtdGl0bGUtYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS52dnNUeG5JZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wYXltZW50X3R5cGVfdGl0bGUsIC5jYXJ0LXRpdGxlLWluZm9cIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0X3NrdV9jb2RlXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJza3VcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibXBuXCIsIG5hbWU6IFwicGRwLm1wblwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlVmFsaWRVbnRpbFwiLCBuYW1lOiBcInBkcC5wcmljZVZhbGlkVW50aWxcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJpdGVtTGlzdEVsZW1lbnQuKi5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubnVtYmVyT2ZJdGVtc1wiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJicmVhZGNydW1iLml0ZW1MaXN0RWxlbWVudC4qLml0ZW0ubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFdpbmRvdyBjdXN0b20gZWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImZhdm9yaXRlUHJvZHVjdHNcIiwgbmFtZTogXCJ2aWV3LmZhdm9yaXRlZE1QTnNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwidG9TdHJpbmdcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5dO1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcInZhbGNudHNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcInN1bXZhbHNcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJzdW12YWxzXCIsIHdpbmRvdzogXCJhbGx0aW1lXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfYWxsdGltZVwifSxcbiAgXSxcbiAgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLmxhc3RDYXJ0Q291cG9uQXBwbGljYWJsZVwifSxcbiAgXSxcbiAgXCJwZHAuY2F0ZWdvcnlcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwidmFsY250c1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgXSxcbn07XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIC8vIFRPRE86IGNoZWNrIGZlYXR1cmVFbmdpbmVlcmluZyBhbmQgc2VhcmNoIGxpc3QgaWYgYWxsIG1hcmtlZCBhcyBmb3VuZCBidXQgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nIGtleTogJHtsYXN0S2V5fWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgbnVsbCk7XG4gIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgbnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVHJlYXRtZW50ID0gKGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgc3RhdHVzLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gbnVsbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlSWQgIT09IHVuZGVmaW5lZCkgdmFsdWUuYnVzaW5lc3NSdWxlSWQgPSBidXNpbmVzc1J1bGVJZDtcbiAgaWYgKHZhcmlhbnQpIHZhbHVlLnZhcmlhbnQgPSB2YXJpYW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNraXBwZWRcIjpcbiAgICAgIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuICAgICAgaW5mb0xheWVyLmVbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICBpbmZvTGF5ZXIuZltpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG59O1xuXG5jb25zdCBQQVJTRVNFQVJDSE1BWFJFVFJZID0gMTA7XG5jb25zdCBQQVJTRVNFQVJDSFNUQVJUREVMQVkgPSAxMDtcbmxldCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgPSBhc3luYyAoKSA9PiB7XG4gIC8vIENvbGxlY3QgY29yZSBkYXRhXG4gIHByZXBhcmVDb3JlRGF0YSgpO1xuXG4gIC8vIFRyaWdnZXItc3RhcnQgdGhlIHBhcnNlciBsb29wXG4gIHBhcnNlckNhbGxlcigpO1xuXG4gIC8vIEFkZCBtZXRyaWNzXG4gIGFkZE1ldHJpY3MoKTtcbn07XG5cbmNvbnN0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJhc2VGZWF0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlRW5naW5lZXJpbmdPcHMpO1xuICBmb3IgKGNvbnN0IGJhc2VGZWF0dXJlTmFtZSBvZiBiYXNlRmVhdHVyZU5hbWVzKSB7XG4gICAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gICAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcHJvY2Vzc0Zvcm1hdHRlciA9ICh2YWx1ZSwgZm9ybWF0dGVyKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFmb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKGZvcm1hdHRlcikge1xuICAgIGNhc2UgXCJ1cHBlckNhc2VUUlwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoXCJ0ci1UUlwiKTtcbiAgICBjYXNlIFwiZm9ybWF0RGVsaXZlcnlEYXRlXCI6XG4gICAgICByZXR1cm4gZm9ybWF0RGVsaXZlcnlEYXRlKHZhbHVlKTtcbiAgICBjYXNlIFwibnVtZXJpY09ubHlcIjpcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgY2FzZSBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZShcInRyLVRSXCIpLnNwbGl0KFwiIFwiKVswXTtcbiAgICBjYXNlIFwiZGVhcnJheVwiOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJ0b1N0cmluZ1wiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaE9iaiA9IChvYmosIHNlYXJjaEVsZW1lbnQpID0+IHtcbiAgbGV0IHZhbHVlO1xuICBsZXQgbGF5ZXJWYWx1ZTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoc2VhcmNoRWxlbWVudC5vcGVyYW5kKSB7XG4gICAgICBjYXNlIFwiSlNPTkZpbHRlck90aGVyXCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJQYXJhbXMgPSBzZWFyY2hFbGVtZW50LnZhbHVlLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBpZiAoZmlsdGVyUGFyYW1zLmxlbmd0aCAhPT0gMikgYnJlYWs7XG4gICAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IGZpbHRlclBhcmFtc1swXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlclBhcmFtc1sxXTtcbiAgICAgICAgICBpZiAoIWZpbHRlck5hbWUgfHwgIWZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoID0ganNvbkdldChvYmosIGZpbHRlck5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXRjaCB8fCBmaWx0ZXJNYXRjaCAhPT0gZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgaWYgKHZhbHVlICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeU9ic2VydmVcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICBjb25zdCB0b0JlVXBkYXRlZCA9IFtdO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzZWFyY2hQYXRocy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgLy8gYWRkIGNoaWxkRWxlbWVudHMgaW50byB0b0JlVXBkYXRlZFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQucHVzaCguLi5jaGlsZEVsZW1lbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBydW4gb25seSBpZiB0aGUgZWxlbWVudCBoYXMgYWRkZWQgb3IgcmVtb3ZlZCBjaGlsZHJlblxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgZnVuY3Rpb24obXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgICAgaWYgKGlzT3duTXV0YXRpb24obXV0YXRpb25MaXN0KSkgcmV0dXJuO1xuICAgICAgICAgICAgdG9CZVVwZGF0ZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50LmlzRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllcihlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyUmVzdGFydCA9IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA+PSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyUmVzdGFydCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwic2VhcmNoT2JqOiB0cmlnZ2VyZWQgYSByZXN0YXJ0IG9mIHNlYXJjaHBhdGhzIGR1ZTogXCIsIHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIHBhcnNlckNhbGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodmFsdWUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUlubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgYXR0cmliVmFsdWVMaXN0ID0gW107XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSB2YWx1ZWNoaWxkLmdldEF0dHJpYnV0ZShzZWFyY2hFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZSkge1xuICAgICAgICAgICAgICBhdHRyaWJWYWx1ZUxpc3QucHVzaChhdHRyaWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYlZhbHVlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXR0cmliVmFsdWVMaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHNldFZhbHVlID0gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZXRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5Q291bnRFbHRzXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2VhcmNoRWxlbWVudC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGxldCBzdW1QcmljZSA9IDA7XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgc3VtUHJpY2UgKz0gcGFyc2VJbnQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1bVByaWNlID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHN1bVByaWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgY29uc3QgYXJyYXlJbm5lclRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGFycmF5SW5uZXJUZXh0LnB1c2goY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SW5uZXJUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhcnJheUlubmVyVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH0gLy8gc3dpdGNoXG5cbiAgICBpZiAobGF5ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGxheWVyVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmZvcm1hdHRlcikge1xuICAgICAgICBsYXllclZhbHVlID0gcHJvY2Vzc0Zvcm1hdHRlcihsYXllclZhbHVlLCBzZWFyY2hFbGVtZW50LmZvcm1hdHRlcik7XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihzZWFyY2hFbGVtZW50Lm5hbWUsIGxheWVyVmFsdWUpO1xuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcblxuICAgICAgLy8gbWFyayBleGNsdXNpdmUgZWxlbWVudHMgYXMgZm91bmRcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlKSAmJiBzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgZXhjbHVzaXZlRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5pbmNsdWRlcyhleGNsdXNpdmVFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAgICAgICBleGNsdXNpdmVFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJzZWFyY2hPYmogZXJyb3I6IFwiICsgZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgY3VzdG9tRGF0YURlcml2YXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCAwKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJjdXN0b21EYXRhRGVyaXZhdGlvbnMgY2Fubm90IGNvbXB1dGUgY291cG9uQXBwbGljYWJsZVByaWNlOiBcIiArIGUpO1xuICB9XG5cbiAgLy8gUHJvZHVjdCBwYWdlIC0tPiB0cmFuc2ZlciBza3VzIHRvIHNpbmdsZSBsb2NhdGlvblxuICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiKTtcbiAgICBpZiAoc2t1ICE9PSBudWxsICYmIHNrdSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBbc2t1XSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJiYXNrZXRcIikge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5za3VzXCIpO1xuICAgIGlmIChza3VMaXN0ICE9PSBudWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHNrdUxpc3QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHByZXBhcmVDb3JlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICBuYXZQdHIuYnJvd3Nlckxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLnN5c3RlbUxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VmVuZG9yXCIsIG5hdlB0ci52ZW5kb3IpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG59O1xuXG5jb25zdCBhZGRNZXRyaWNzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IHBlcmZNZXRyaWNzID0ge307XG4gIGNvbnN0IHBlcmZOYXZpZ2F0aW9uTWV0cmljcyA9IHdpbmRvd1B0ci5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXTtcbiAgaWYgKHdpbmRvd1B0ci5wZXJmb3JtYW5jZSAmJiBwZXJmTmF2aWdhdGlvbk1ldHJpY3MpIHtcbiAgICBwZXJmTWV0cmljcy5jb25uZWN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLnJlcXVlc3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXNwb25zZUVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXF1ZXN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmRvbSA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUludGVyYWN0aXZlIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUNvbXBsZXRlKTtcbiAgICBwZXJmTWV0cmljcy5sb2FkID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmR1cmF0aW9uKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1ldHJpY3NcIiwgcGVyZk1ldHJpY3MpO1xufTtcblxuLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIFwiZWxlbWVudCBjb2xsZWN0b3JcIiBtb2R1bGUsIHRoZW4gZGF0YSBpcyBleHRyYWN0ZWQgZnJvbSBwcmUtY29sbGVjdGVkIGVsZW1lbnRzXG5jb25zdCBnZXRTT1JHQXJyYXkgPSAoKSA9PiB7XG4gIGNvbnN0IHNjaGVtYU9yZ0VsdHMgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT1cXFwiYXBwbGljYXRpb24vbGQranNvblxcXCJdXCIpO1xuICBjb25zdCBzb3JnQXJyYXkgPSBbXTtcblxuICBmb3IgKGNvbnN0IHNUYWcgb2Ygc2NoZW1hT3JnRWx0cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbnRudCA9IHNUYWcudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBqc29uY29udGVudCA9IEpTT04ucGFyc2UoY250bnQpO1xuICAgICAgc29yZ0FycmF5LnB1c2goanNvbmNvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gc29yZ0FycmF5O1xufTtcbiIsImltcG9ydCB7TE9HX0FQSV9VUkx9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVNb25pdG9yXCIpO1xuY29uc3QgSEVBREVSUyA9IHtcbiAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG59O1xuXG5leHBvcnQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgbW9uaXRvclwiKTtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBhd2FpdGluZyBzY3JhcGluZ1wiKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUsIDUwLCAxMDAwKTtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gc2VuZGluZyBsb2dzXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2VuZCBpbml0aWFsIGxvZyBib2R5IGFuZCBpbmNyZW1lbnRhbCB1cGRhdGUgbG9ncyBvbiBjbG9zZVxuICBhc3luYyBoYW5kbGVDbG9zZUV2ZW50KCkge1xuICAgIC8vIGlmIGluaXRpYWwgbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgc2VuZCB1cGRhdGVzIGFuZCBpbmZvbGF5ZXIgaW4gb25lIGJhdGNoXG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgLy8gaWYgbWFpbiBsb2cgaGFzIGJlZW4gc2VudCwgc2VuZCBpbmNyZW1lbnRhbCB1cGRhdGVzIG9ubHlcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCk7XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVNYWluTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VNYWluTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcXVlc3QgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKSB7XG4gICAgaWYgKCF0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzVXBkYXRlc1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgdGhlcmUgaXMgbm8gaW5jcmVtZW50YWwgeWV0XG4gICAgICAvLyBvciBpZiB0aGUgdXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPSBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9ncyBjaGFuZ2Ugc3RhdHVzOiBcIiwgaGFzQ2hhbmdlZCk7XG4gICAgaWYgKCFoYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICBjb25zdCBsb2dEYXRhID0gYXdhaXQgdGhpcy5wYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCk7XG4gICAgaWYgKGxvZ0RhdGEpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZW5kaW5nIGluY3JlbWVudGFsIGxvZ3NcIiwgbG9nRGF0YSk7XG4gICAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKGxvZ0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUFycml2YWxMb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgb3IgYXJyaXZhbCBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlQXJyaXZhbExvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh3bSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2h3bVwiKTtcbiAgICBpZiAodGhpcy5oaWdoV2F0ZXJNYXJrICE9PSBod20pIHtcbiAgICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgcywgbSwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJtXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDIsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgYSwgZSwgZiwgcywgbSxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gcGFnZWhpZGUgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIC8vIElmIHBhZ2UgaXMgbm90IHZpc2libGUgYW5kIGRvZXNuJ3QgYmVjb21lIHZpc2libGUgd2l0aGluIDMwIHNlY29uZHMsIHNlbmQgbG9nc1xuICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbiB0aW1lb3V0XCIpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgICAgICB9LCAzMDAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIHRpbWVvdXQgd2hlbiBwYWdlIGlzIHZpc2libGUgdG8gbWFrZSBzdXJlIHdlIHNlbmQgdGhlIGxhdGVzdCBsb2dzIHBvc3NpYmxlXG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIGlmIChxdWV1ZWQpIHJldHVybjtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICBpZiAoIXF1ZXVlZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBub3QgcXVldWVkXCIpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vbml0b3I7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2ZldGNoVHJlYXRtZW50cywgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiKTtcblxuY2xhc3MgVHJlYXRtZW50UmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSBib2R5O1xuICAgIHRoaXMudHJlYXRtZW50cyA9IHRyZWF0bWVudHM7XG4gICAgdGhpcy50cmVhdG1lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0cztcbiAgICB0aGlzLmN1cnJlbnRQYWdlVHlwZSA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgICBjb25zdCB0cmVhdG1lbnRzT2JqID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oVFJFQVRNRU5UUykpO1xuICAgIGxldCB0cmVhdG1lbnRzID0gdHJlYXRtZW50c09iaj8udHJlYXRtZW50cztcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0cmVhdG1lbnRzT2JqPy50aW1lc3RhbXA7XG4gICAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0aW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIG5vdCBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlXCIpO1xuICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHRyZWF0bWVudHMsXG4gICAgICB9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICB9XG4gICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB0aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgIGlmIChlbGFwc2VkSG91cnMgPiBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBhcmUgZXhwaXJlZFwiKTtcbiAgICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VpZ2h0c09iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUyk7XG4gICAgICBpZiAod2VpZ2h0c09iaikge1xuICAgICAgICB3ZWlnaHRzT2JqID0gSlNPTi5wYXJzZSh3ZWlnaHRzT2JqKTtcbiAgICAgICAgaWYgKHdlaWdodHNPYmoudGltZXN0YW1wKSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB3ZWlnaHRzT2JqLnRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgICAgIGlmIChlbGFwc2VkSG91cnMgPCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2VpZ2h0c09iaiA9IGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgICAgaWYgKCF3ZWlnaHRzT2JqKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggd2VpZ2h0c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0ge3dlaWdodHM6IHdlaWdodHNPYmosIHRpbWVzdGFtcDogRGF0ZS5ub3coKX07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLldFSUdIVFMsIEpTT04uc3RyaW5naWZ5KHdlaWdodHNPYmopKTtcbiAgICAgIHJldHVybiB3ZWlnaHRzT2JqLndlaWdodHM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpIHtcbiAgICBsZXQgQ1BUID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZVJ1bGVzLlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIENQVCA9IENQVD8uWzBdIHx8IG51bGw7XG4gICAgaWYgKCFDUFQpIHJldHVybiBbXTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlVHlwZSA9IENQVDtcbiAgICBsZXQgbWF0Y2hlZFRyZWF0bWVudHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgIGlmIChtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCBKU09OLnBhcnNlKG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKG10KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQYWdlVHlwZShtdC5wYWdlVHlwZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgJHttYXRjaGVkVHJlYXRtZW50cy5sZW5ndGh9IHRyZWF0bWVudHMgdXNlciBzZWdtZW50IG1hdGNoZWRgKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBnZXR0aW5nIG1hdGNoZWQgcm9ib3RzOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBbXTtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSB0aGlzO1xuICAgIGNvbnN0IHVzZXJTZWdtZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInNcIik7XG4gICAgaWYgKCF1c2VyU2VnbWVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgIGNvbnN0IHVzZXJTZWdtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHNbdXNlclNlZ21lbnRdO1xuICAgICAgaWYgKCF1c2VyU2VnbWVudFdlaWdodHMpIHJldHVybiBbXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRyZWF0bWVudHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnRlZFdlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy53ZWlnaHQ7XG4gICAgICAgIGlmICghc2VnbWVudGVkV2VpZ2h0KSB7XG4gICAgICAgICAgaWYgKHRyZWF0bWVudC5kZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICAgICAgICBzZWdtZW50ZWRXZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnRdPy53ZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChkZWJ1Z01vZGUgJiYgZGVidWdNb2RlID09PSAxKSBzZWdtZW50ZWRXZWlnaHQgPSAxMDA7XG4gICAgICAgICAgaWYgKCFzZWdtZW50ZWRXZWlnaHQpIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRyZWF0bWVudC53ZWlnaHQgPSBzZWdtZW50ZWRXZWlnaHQ7XG4gICAgICAgIGlmICghdHJlYXRtZW50LmFjdGlvbnMuc29tZSgoYSkgPT4gYS52YXJpYW50cykpIHtcbiAgICAgICAgICBtYXRjaGVkVHJlYXRtZW50cy5wdXNoKHRyZWF0bWVudCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlYXRtZW50LmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGlmICh1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHMgJiYgdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXS52YXJpYW50c1t2YXJpYW50S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaCh0cmVhdG1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KG1hdGNoZWRUcmVhdG1lbnRzKSk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoZGVidWdNb2RlKTtcbiAgfVxuXG4gIGNoZWNrUGFnZVR5cGUocGFnZVR5cGVzKSB7XG4gICAgY29uc3Qge2N1cnJlbnRQYWdlVHlwZX0gPSB0aGlzO1xuICAgIGlmIChwYWdlVHlwZXMgPT09IG51bGwgfHwgcGFnZVR5cGVzID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYWdlVHlwZXMpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiUGFnZSBUeXBlcyBzaG91bGQgYmUgYW4gYXJyYXlcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwYWdlVHlwZXNbMF0uc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIHBhZ2VUeXBlcyA9IHBhZ2VUeXBlcy5tYXAoKHB0KSA9PiBwdC5zdWJzdHIoMSkpO1xuICAgICAgcmV0dXJuICFwYWdlVHlwZXMuaW5jbHVkZXMoY3VycmVudFBhZ2VUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VUeXBlcy5pbmNsdWRlcyhjdXJyZW50UGFnZVR5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWF0bWVudFJlcG9zaXRvcnk7XG4iLCJpbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlJlcGxhY2VVdGlsc1wiKTtcblxuY29uc3QgcmVwbGFjZXIgPSBhc3luYyAodmFsdWUsIHJlcGxhY2VGbikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IFtpLCB2YWxdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY3VycmVudFJlcGxhY2VGbiA9IEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSA/IHJlcGxhY2VGbltpXSA6IHJlcGxhY2VGbiB8fCBcIlwiO1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKGN1cnJlbnRSZXBsYWNlRm4pO1xuICAgICAgICB2YWx1ZVtpXSA9IHJlcGxhY2VBbGwodmFsLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlW2ldID0gcmVwbGFjZUZuRXhlY3V0b3IoY3VycmVudFJlcGxhY2VGbiwgdmFsKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pKSB7XG4gICAgZm9yIChjb25zdCByRm4gb2YgcmVwbGFjZUZuKSB7XG4gICAgICBpZiAodHlwZW9mIHJGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyRm4pO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJGbiwgdmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKTtcbiAgICAgIHZhbHVlID0gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlLCBzaW5nbGUgPSBmYWxzZSkge1xuICBpZiAocmVwbGFjZUZuICYmIHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikpIHtcbiAgICBsb2dnZXIubG9nKFwiRXhlY3V0aW5nIHJlcGxhY2UgZnVuY3Rpb246IFwiLCByZXBsYWNlRm4pO1xuICAgIGNvbnN0IHJlcGxhY2VGdW5jdGlvbiA9IEZ1bmN0aW9uKHJlcGxhY2VGbik7XG4gICAgaWYgKHNpbmdsZSkgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gICAgcmV0dXJuIHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pIHtcbiAgY29uc3Qge3N0b3JhZ2UsIGtleSwga2V5RmFsbGJhY2ssIHR5cGV9ID0gcmVwbGFjZUZuO1xuICBzd2l0Y2ggKHN0b3JhZ2UpIHtcbiAgICBjYXNlIFwic2Vzc2lvblwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IG51bGw7XG4gICAgICByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleUZhbGxiYWNrKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IEpTT04ucGFyc2UocmVwbGFjZVZhbCk7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IHJlcGxhY2VWYWxbcmVwbGFjZVZhbC5sZW5ndGggLSAxXVt0eXBlXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGQgbm90IHBhcnNlICR7cmVwbGFjZVZhbH1gKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICAgIGNhc2UgXCJpbmZvLWxheWVyXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXlGYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZXI7XG4iLCJjb25zdCBpbnN0YW5jZU9mQW55ID0gKG9iamVjdCwgY29uc3RydWN0b3JzKSA9PiBjb25zdHJ1Y3RvcnMuc29tZSgoYykgPT4gb2JqZWN0IGluc3RhbmNlb2YgYyk7XG5cbmxldCBpZGJQcm94eWFibGVUeXBlcztcbmxldCBjdXJzb3JBZHZhbmNlTWV0aG9kcztcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxuZnVuY3Rpb24gZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSB7XG4gICAgcmV0dXJuIChpZGJQcm94eWFibGVUeXBlcyB8fFxuICAgICAgICAoaWRiUHJveHlhYmxlVHlwZXMgPSBbXG4gICAgICAgICAgICBJREJEYXRhYmFzZSxcbiAgICAgICAgICAgIElEQk9iamVjdFN0b3JlLFxuICAgICAgICAgICAgSURCSW5kZXgsXG4gICAgICAgICAgICBJREJDdXJzb3IsXG4gICAgICAgICAgICBJREJUcmFuc2FjdGlvbixcbiAgICAgICAgXSkpO1xufVxuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpIHtcbiAgICByZXR1cm4gKGN1cnNvckFkdmFuY2VNZXRob2RzIHx8XG4gICAgICAgIChjdXJzb3JBZHZhbmNlTWV0aG9kcyA9IFtcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuYWR2YW5jZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWUsXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlUHJpbWFyeUtleSxcbiAgICAgICAgXSkpO1xufVxuY29uc3QgY3Vyc29yUmVxdWVzdE1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvbkRvbmVNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5mdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUod3JhcChyZXF1ZXN0LnJlc3VsdCkpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICB9KTtcbiAgICBwcm9taXNlXG4gICAgICAgIC50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAvLyBTaW5jZSBjdXJzb3JpbmcgcmV1c2VzIHRoZSBJREJSZXF1ZXN0ICgqc2lnaCopLCB3ZSBjYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsXG4gICAgICAgIC8vIChzZWUgd3JhcEZ1bmN0aW9uKS5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCQ3Vyc29yKSB7XG4gICAgICAgICAgICBjdXJzb3JSZXF1ZXN0TWFwLnNldCh2YWx1ZSwgcmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2F0Y2hpbmcgdG8gYXZvaWQgXCJVbmNhdWdodCBQcm9taXNlIGV4Y2VwdGlvbnNcIlxuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xuICAgIC8vIFRoaXMgbWFwcGluZyBleGlzdHMgaW4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGJ1dCBkb2Vzbid0IGRvZXNuJ3QgZXhpc3QgaW4gdHJhbnNmb3JtQ2FjaGUuIFRoaXNcbiAgICAvLyBpcyBiZWNhdXNlIHdlIGNyZWF0ZSBtYW55IHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdC5cbiAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KHByb21pc2UsIHJlcXVlc3QpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHR4KSB7XG4gICAgLy8gRWFybHkgYmFpbCBpZiB3ZSd2ZSBhbHJlYWR5IGNyZWF0ZWQgYSBkb25lIHByb21pc2UgZm9yIHRoaXMgdHJhbnNhY3Rpb24uXG4gICAgaWYgKHRyYW5zYWN0aW9uRG9uZU1hcC5oYXModHgpKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgZG9uZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QodHguZXJyb3IgfHwgbmV3IERPTUV4Y2VwdGlvbignQWJvcnRFcnJvcicsICdBYm9ydEVycm9yJykpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICB9KTtcbiAgICAvLyBDYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgIHRyYW5zYWN0aW9uRG9uZU1hcC5zZXQodHgsIGRvbmUpO1xufVxubGV0IGlkYlByb3h5VHJhcHMgPSB7XG4gICAgZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBTcGVjaWFsIGhhbmRsaW5nIGZvciB0cmFuc2FjdGlvbi5kb25lLlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkb25lJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb25Eb25lTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgLy8gUG9seWZpbGwgZm9yIG9iamVjdFN0b3JlTmFtZXMgYmVjYXVzZSBvZiBFZGdlLlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdvYmplY3RTdG9yZU5hbWVzJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQub2JqZWN0U3RvcmVOYW1lcyB8fCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYWtlIHR4LnN0b3JlIHJldHVybiB0aGUgb25seSBzdG9yZSBpbiB0aGUgdHJhbnNhY3Rpb24sIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbWFueS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnc3RvcmUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgOiByZWNlaXZlci5vYmplY3RTdG9yZShyZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFbHNlIHRyYW5zZm9ybSB3aGF0ZXZlciB3ZSBnZXQgYmFjay5cbiAgICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0W3Byb3BdKTtcbiAgICB9LFxuICAgIHNldCh0YXJnZXQsIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGhhcyh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uICYmXG4gICAgICAgICAgICAocHJvcCA9PT0gJ2RvbmUnIHx8IHByb3AgPT09ICdzdG9yZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQ7XG4gICAgfSxcbn07XG5mdW5jdGlvbiByZXBsYWNlVHJhcHMoY2FsbGJhY2spIHtcbiAgICBpZGJQcm94eVRyYXBzID0gY2FsbGJhY2soaWRiUHJveHlUcmFwcyk7XG59XG5mdW5jdGlvbiB3cmFwRnVuY3Rpb24oZnVuYykge1xuICAgIC8vIER1ZSB0byBleHBlY3RlZCBvYmplY3QgZXF1YWxpdHkgKHdoaWNoIGlzIGVuZm9yY2VkIGJ5IHRoZSBjYWNoaW5nIGluIGB3cmFwYCksIHdlXG4gICAgLy8gb25seSBjcmVhdGUgb25lIG5ldyBmdW5jIHBlciBmdW5jLlxuICAgIC8vIEVkZ2UgZG9lc24ndCBzdXBwb3J0IG9iamVjdFN0b3JlTmFtZXMgKGJvb28pLCBzbyB3ZSBwb2x5ZmlsbCBpdCBoZXJlLlxuICAgIGlmIChmdW5jID09PSBJREJEYXRhYmFzZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gJiZcbiAgICAgICAgISgnb2JqZWN0U3RvcmVOYW1lcycgaW4gSURCVHJhbnNhY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0b3JlTmFtZXMsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZnVuYy5jYWxsKHVud3JhcCh0aGlzKSwgc3RvcmVOYW1lcywgLi4uYXJncyk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuc2V0KHR4LCBzdG9yZU5hbWVzLnNvcnQgPyBzdG9yZU5hbWVzLnNvcnQoKSA6IFtzdG9yZU5hbWVzXSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh0eCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIEN1cnNvciBtZXRob2RzIGFyZSBzcGVjaWFsLCBhcyB0aGUgYmVoYXZpb3VyIGlzIGEgbGl0dGxlIG1vcmUgZGlmZmVyZW50IHRvIHN0YW5kYXJkIElEQi4gSW5cbiAgICAvLyBJREIsIHlvdSBhZHZhbmNlIHRoZSBjdXJzb3IgYW5kIHdhaXQgZm9yIGEgbmV3ICdzdWNjZXNzJyBvbiB0aGUgSURCUmVxdWVzdCB0aGF0IGdhdmUgeW91IHRoZVxuICAgIC8vIGN1cnNvci4gSXQncyBraW5kYSBsaWtlIGEgcHJvbWlzZSB0aGF0IGNhbiByZXNvbHZlIHdpdGggbWFueSB2YWx1ZXMuIFRoYXQgZG9lc24ndCBtYWtlIHNlbnNlXG4gICAgLy8gd2l0aCByZWFsIHByb21pc2VzLCBzbyBlYWNoIGFkdmFuY2UgbWV0aG9kcyByZXR1cm5zIGEgbmV3IHByb21pc2UgZm9yIHRoZSBjdXJzb3Igb2JqZWN0LCBvclxuICAgIC8vIHVuZGVmaW5lZCBpZiB0aGUgZW5kIG9mIHRoZSBjdXJzb3IgaGFzIGJlZW4gcmVhY2hlZC5cbiAgICBpZiAoZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKS5pbmNsdWRlcyhmdW5jKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICAgICAgICBmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChjdXJzb3JSZXF1ZXN0TWFwLmdldCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXG4gICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICAgIHJldHVybiB3cmFwKGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICByZXR1cm4gd3JhcEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAvLyBUaGlzIGRvZXNuJ3QgcmV0dXJuLCBpdCBqdXN0IGNyZWF0ZXMgYSAnZG9uZScgcHJvbWlzZSBmb3IgdGhlIHRyYW5zYWN0aW9uLFxuICAgIC8vIHdoaWNoIGlzIGxhdGVyIHJldHVybmVkIGZvciB0cmFuc2FjdGlvbi5kb25lIChzZWUgaWRiT2JqZWN0SGFuZGxlcikuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pXG4gICAgICAgIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih2YWx1ZSk7XG4gICAgaWYgKGluc3RhbmNlT2ZBbnkodmFsdWUsIGdldElkYlByb3h5YWJsZVR5cGVzKCkpKVxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHZhbHVlLCBpZGJQcm94eVRyYXBzKTtcbiAgICAvLyBSZXR1cm4gdGhlIHNhbWUgdmFsdWUgYmFjayBpZiB3ZSdyZSBub3QgZ29pbmcgdG8gdHJhbnNmb3JtIGl0LlxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHdyYXAodmFsdWUpIHtcbiAgICAvLyBXZSBzb21ldGltZXMgZ2VuZXJhdGUgbXVsdGlwbGUgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0IChlZyB3aGVuIGN1cnNvcmluZyksIGJlY2F1c2VcbiAgICAvLyBJREIgaXMgd2VpcmQgYW5kIGEgc2luZ2xlIElEQlJlcXVlc3QgY2FuIHlpZWxkIG1hbnkgcmVzcG9uc2VzLCBzbyB0aGVzZSBjYW4ndCBiZSBjYWNoZWQuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCUmVxdWVzdClcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QodmFsdWUpO1xuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgdHJhbnNmb3JtZWQgdGhpcyB2YWx1ZSBiZWZvcmUsIHJldXNlIHRoZSB0cmFuc2Zvcm1lZCB2YWx1ZS5cbiAgICAvLyBUaGlzIGlzIGZhc3RlciwgYnV0IGl0IGFsc28gcHJvdmlkZXMgb2JqZWN0IGVxdWFsaXR5LlxuICAgIGlmICh0cmFuc2Zvcm1DYWNoZS5oYXModmFsdWUpKVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpO1xuICAgIC8vIE5vdCBhbGwgdHlwZXMgYXJlIHRyYW5zZm9ybWVkLlxuICAgIC8vIFRoZXNlIG1heSBiZSBwcmltaXRpdmUgdHlwZXMsIHNvIHRoZXkgY2FuJ3QgYmUgV2Vha01hcCBrZXlzLlxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdHJhbnNmb3JtQ2FjaGUuc2V0KHZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQobmV3VmFsdWUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuY29uc3QgdW53cmFwID0gKHZhbHVlKSA9PiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcblxuZXhwb3J0IHsgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGFzIGEsIGluc3RhbmNlT2ZBbnkgYXMgaSwgcmVwbGFjZVRyYXBzIGFzIHIsIHVud3JhcCBhcyB1LCB3cmFwIGFzIHcgfTtcbiIsImltcG9ydCB7IHcgYXMgd3JhcCwgciBhcyByZXBsYWNlVHJhcHMgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcbmV4cG9ydCB7IHUgYXMgdW53cmFwLCB3IGFzIHdyYXAgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcblxuLyoqXG4gKiBPcGVuIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKiBAcGFyYW0gdmVyc2lvbiBTY2hlbWEgdmVyc2lvbi5cbiAqIEBwYXJhbSBjYWxsYmFja3MgQWRkaXRpb25hbCBjYWxsYmFja3MuXG4gKi9cbmZ1bmN0aW9uIG9wZW5EQihuYW1lLCB2ZXJzaW9uLCB7IGJsb2NrZWQsIHVwZ3JhZGUsIGJsb2NraW5nLCB0ZXJtaW5hdGVkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICBjb25zdCBvcGVuUHJvbWlzZSA9IHdyYXAocmVxdWVzdCk7XG4gICAgaWYgKHVwZ3JhZGUpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCd1cGdyYWRlbmVlZGVkJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB1cGdyYWRlKHdyYXAocmVxdWVzdC5yZXN1bHQpLCBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCB3cmFwKHJlcXVlc3QudHJhbnNhY3Rpb24pLCBldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoZXZlbnQpID0+IGJsb2NrZWQoXG4gICAgICAgIC8vIENhc3RpbmcgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC1ET00tbGliLWdlbmVyYXRvci9wdWxsLzE0MDVcbiAgICAgICAgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgZXZlbnQpKTtcbiAgICB9XG4gICAgb3BlblByb21pc2VcbiAgICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGlmICh0ZXJtaW5hdGVkKVxuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB0ZXJtaW5hdGVkKCkpO1xuICAgICAgICBpZiAoYmxvY2tpbmcpIHtcbiAgICAgICAgICAgIGRiLmFkZEV2ZW50TGlzdGVuZXIoJ3ZlcnNpb25jaGFuZ2UnLCAoZXZlbnQpID0+IGJsb2NraW5nKGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIGV2ZW50KSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICByZXR1cm4gb3BlblByb21pc2U7XG59XG4vKipcbiAqIERlbGV0ZSBhIGRhdGFiYXNlLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxuICovXG5mdW5jdGlvbiBkZWxldGVEQihuYW1lLCB7IGJsb2NrZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKTtcbiAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoZXZlbnQpID0+IGJsb2NrZWQoXG4gICAgICAgIC8vIENhc3RpbmcgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC1ET00tbGliLWdlbmVyYXRvci9wdWxsLzE0MDVcbiAgICAgICAgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xufVxuXG5jb25zdCByZWFkTWV0aG9kcyA9IFsnZ2V0JywgJ2dldEtleScsICdnZXRBbGwnLCAnZ2V0QWxsS2V5cycsICdjb3VudCddO1xuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHtcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxuICAgICAgICB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApKVxuICAgICAgICByZXR1cm4gY2FjaGVkTWV0aG9kcy5nZXQocHJvcCk7XG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XG4gICAgY29uc3QgdXNlSW5kZXggPSBwcm9wICE9PSB0YXJnZXRGdW5jTmFtZTtcbiAgICBjb25zdCBpc1dyaXRlID0gd3JpdGVNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKTtcbiAgICBpZiAoXG4gICAgLy8gQmFpbCBpZiB0aGUgdGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHRhcmdldC4gRWcsIGdldEFsbCBpc24ndCBpbiBFZGdlLlxuICAgICEodGFyZ2V0RnVuY05hbWUgaW4gKHVzZUluZGV4ID8gSURCSW5kZXggOiBJREJPYmplY3RTdG9yZSkucHJvdG90eXBlKSB8fFxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIChzdG9yZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogdW5kZWZpbmVkIGd6aXBwcyBiZXR0ZXIsIGJ1dCBmYWlscyBpbiBFZGdlIDooXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdHguc3RvcmU7XG4gICAgICAgIGlmICh1c2VJbmRleClcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xuICAgICAgICAvLyBNdXN0IHJlamVjdCBpZiBvcCByZWplY3RzLlxuICAgICAgICAvLyBJZiBpdCdzIGEgd3JpdGUgb3BlcmF0aW9uLCBtdXN0IHJlamVjdCBpZiB0eC5kb25lIHJlamVjdHMuXG4gICAgICAgIC8vIE11c3QgcmVqZWN0IHdpdGggb3AgcmVqZWN0aW9uIGZpcnN0LlxuICAgICAgICAvLyBNdXN0IHJlc29sdmUgd2l0aCBvcCB2YWx1ZS5cbiAgICAgICAgLy8gTXVzdCBoYW5kbGUgYm90aCBwcm9taXNlcyAobm8gdW5oYW5kbGVkIHJlamVjdGlvbnMpXG4gICAgICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGFyZ2V0W3RhcmdldEZ1bmNOYW1lXSguLi5hcmdzKSxcbiAgICAgICAgICAgIGlzV3JpdGUgJiYgdHguZG9uZSxcbiAgICAgICAgXSkpWzBdO1xuICAgIH07XG4gICAgY2FjaGVkTWV0aG9kcy5zZXQocHJvcCwgbWV0aG9kKTtcbiAgICByZXR1cm4gbWV0aG9kO1xufVxucmVwbGFjZVRyYXBzKChvbGRUcmFwcykgPT4gKHtcbiAgICAuLi5vbGRUcmFwcyxcbiAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXG4gICAgaGFzOiAodGFyZ2V0LCBwcm9wKSA9PiAhIWdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApLFxufSkpO1xuXG5leHBvcnQgeyBkZWxldGVEQiwgb3BlbkRCIH07XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVfY2FjaGVcIixcbiAgdmVyc2lvbjogMSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImluZm9DYWNoZVwiLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJpeF9za3VcIixcbiAgICAgICAgZmllbGRzOiBcInNrdVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcInNrdVwifSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJcbmltcG9ydCB7b3BlbkRCfSBmcm9tIFwiaWRiXCI7XG5pbXBvcnQge2ZldGNoUHJvZHVjdEluZm99IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeVwiKTtcbmNsYXNzIEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBhc3luYyBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IHtkYk5hbWUsIHZlcnNpb259ID0gY29uZmlnO1xuICAgIGNvbnN0IGRiID0gYXdhaXQgb3BlbkRCKGRiTmFtZSwgdmVyc2lvbiwge1xuICAgICAgdXBncmFkZShkYiwgb2xkVmVyc2lvbikge1xuICAgICAgICBzd2l0Y2ggKG9sZFZlcnNpb24pIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBkYi5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuaW5kZXhlZERCID0gZGI7XG4gIH1cblxuICBhc3luYyBnZXREQigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUodGhpcy5pbmRleGVkREIpO1xuICAgICAgICB9XG4gICAgICB9LCAyNSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQcm9kdWN0IGluZm8gZGIgbm90IGluaXRpYWxpemVkIHdpdGhpbiB0aGUgYWxsb3R0ZWQgdGltZVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDMwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0U3RvcmUocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICByZXR1cm4gZGIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIHJlYWR3cml0ZSA/IFwicmVhZHdyaXRlXCIgOiBcInJlYWRvbmx5XCIpLnN0b3JlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShwYXlsb2FkKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmdldFN0b3JlKHRydWUpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICBjb25zdCBzYXZlUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgbG9hZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgIGxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICBzYXZlUHJvbWlzZXMucHVzaChzdG9yZS5wdXQobG9hZCkpO1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoc2F2ZVByb21pc2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF5bG9hZC50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICBhd2FpdCBzdG9yZS5wdXQocGF5bG9hZCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xlYXIoKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmdldFN0b3JlKHRydWUpO1xuICAgIGF3YWl0IHN0b3JlLmNsZWFyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHNrdSkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmdldChjb25maWcuc3RvcmUubmFtZSwgc2t1KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYXN5bmMgY291bnQoKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGIuY291bnQoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBnZXRDdXJzb3IoKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgY29uc3QgY3Vyc29yID0gYXdhaXQgZGIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUpLnN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICByZXR1cm4gY3Vyc29yO1xuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImNoZWNrLWV4aXN0aW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5nZXRDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGN1cnNvci52YWx1ZS50aW1lc3RhbXA7XG4gICAgICBjb25zdCBlbGFwc2VkU2Vjb25kcyA9IChEYXRlLm5vdygpIC8gMTAwMCkgLSB0aW1lc3RhbXA7XG4gICAgICAvLyBSZS1mZXRjaCBwcm9kdWN0IGluZm8gb25jZSBhIGRheVxuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgODY0MDApIHJldHVybjtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gaXMgZXhwaXJlZFwiKTtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hpbmctcHJvZC1pbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvUHJvbWlzZSA9IGZldGNoUHJvZHVjdEluZm8oKTtcbiAgICBsZXQgY2xlYXJQcm9taXNlID0gbnVsbDtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykgY2xlYXJQcm9taXNlID0gdGhpcy5jbGVhcigpO1xuICAgIGNvbnN0IFtwcm9kdWN0SW5mb0FycmF5XSA9IGF3YWl0IFByb21pc2UuYWxsKFtwcm9kdWN0SW5mb1Byb21pc2UsIGNsZWFyUHJvbWlzZV0pO1xuICAgIGlmICghcHJvZHVjdEluZm9BcnJheSB8fCAhcHJvZHVjdEluZm9BcnJheS5sZW5ndGgpIHJldHVybjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXByb2QtaW5mb1wiKTtcbiAgICBhd2FpdCB0aGlzLnNhdmUodGhpcy5wcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBlcnNpc3RlZC1wcm9kLWluZm9cIik7XG4gIH1cblxuICBwcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkge1xuICAgIGNvbnN0IHBheWxvYWRzID0gW107XG4gICAgY29uc3QgZmllbGROYW1lcyA9IHByb2R1Y3RJbmZvQXJyYXkuc2hpZnQoKTtcbiAgICBmaWVsZE5hbWVzLnNoaWZ0KCk7XG4gICAgZm9yIChjb25zdCBpbmZvIG9mIHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7c2t1OiBpbmZvLnNoaWZ0KCl9O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBheWxvYWRbZmllbGROYW1lc1tpXV0gPSBpbmZvW2ldIHx8IG51bGw7XG4gICAgICB9XG4gICAgICBwYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeTtcbiIsImltcG9ydCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQge2lkYlJlYWR5fSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuY29uc3QgU3RvcmUgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCBpbnN0YW5jZSA9IG51bGw7XG4gIHJldHVybiB7XG4gICAgZ2V0SW5zdGFuY2U6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGluc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgIGF3YWl0IGlkYlJlYWR5KCk7XG4gICAgICAgIGluc3RhbmNlID0gbmV3IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkoKTtcbiAgICAgICAgLy8gSGlkZSB0aGUgY29uc3RydWN0b3Igc28gdGhlIHJldHVybmVkIG9iamVjdCBjYW4ndCBiZSBuZXcnZC4uLlxuICAgICAgICBpbnN0YW5jZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfSxcbiAgfTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCB7c3R5bGVBcHBsaWNhdG9yLCBkZWxheSwgaWRsZVRpbWVyLCBnZXRVbnNlY3VyZUhhc2h9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMpIHtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUFwcGx5QWN0aW9uc1wiKTtcbiAgY29uc3QgZGIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHRyYW5zZm9ybWVyID0gYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtZXIoYWN0aW9uLCBlbGVtZW50ID0gbnVsbCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9wZXJhdG9yLFxuICAgICAgdHlwZSxcbiAgICAgIGFwcGx5RXZlbnQsXG4gICAgICBjb250ZW50U2VsZWN0b3IsXG4gICAgICBzZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yRmFsbGJhY2ssXG4gICAgICBtZENvbmRpdGlvbixcbiAgICAgIG1vdmVfc2VsZWN0b3JfMSxcbiAgICAgIG1vdmVfc2VsZWN0b3JfMixcbiAgICAgIHJlcGxhY2VGbixcbiAgICAgIHBUeXBlLFxuICAgICAgcHJvZHVjdEluZm9TdG9yYWdlLFxuICAgIH0gPSBhY3Rpb247XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIm5vb3BcIikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vb3AgT3BlcmF0b3I6IE5vIG9wZXJhdGlvbiBpcyBhcHBsaWVkIG9uIHRhcmdldCBcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHt2YWx1ZX0gPSBhY3Rpb247XG4gICAgLy8gSWYgYW4gZWxlbWVudCBpcyBwYXNzZWQgdG8gdHJhbnNmb3JtZXIsIHNlbGVjdG9yIGlzIHJlbGF0aXZlIHRvIHBhc3NlZCBlbGVtZW50XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmZpbmQoc2VsZWN0b3IpIDogJChzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBtYyA9IG1kQ29uZGl0aW9uID8gd2luZG93Lm1hdGNoTWVkaWEobWRDb25kaXRpb24pLm1hdGNoZXMgOiB0cnVlO1xuICAgIGlmICghbWMpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJNZWRpYSBjb25kaXRpb24gbWlzbWF0Y2g6IFwiLCBtZENvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzEgJiYgIW1vdmVfc2VsZWN0b3JfMikgfHxcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzIgJiYgIW1vdmVfc2VsZWN0b3JfMSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJCb3RoIG1vdmUgc2VsZWN0b3JzIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG1vdmVfc2VsZWN0b3JfMSAmJiBtb3ZlX3NlbGVjdG9yXzIpIHtcbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzEpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAxIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzIpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAyIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBzcGVjaWZpZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCEkKHNlbGVjdG9yRmFsbGJhY2spLmxlbmd0aCAmJiBvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gXCJuby1zZWxlY3RvclwiKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZDogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVHJ5aW5nIGZhbGxiYWNrIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yRmFsbGJhY2spIGVsZW1lbnQgPSAkKHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWxsYmFjayBzZWxlY3RvciBub3QgZm91bmRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VGbikge1xuICAgICAgdmFsdWUgPSBhd2FpdCByZXBsYWNlcih2YWx1ZSwgcmVwbGFjZUZuKTtcbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVtb3Zpbmc6IFwiLCBzZWxlY3Rvcik7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5zZXJ0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmVmb3JlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBiZWZvcmU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGFmdGVyOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGVuZGluZyB2YWx1ZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb2RhbFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIGlmIChlbG0gPT0gZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3BsYXlNb2RhbCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBvcHVwXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlBvcHVwIGFscmVhZHkgZGlzcGxheWVkIGluIHNlc3Npb25cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIFBvcHVwOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHBUeXBlKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJlZGl0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIHRleHQ6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC50ZXh0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyBodG1sOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuaHRtbCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHlsZUFwcGxpY2F0b3JcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZUNoYW5nZXNNYXAgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTdHlsZSBDaGFuZ2VzIE1hcDogXCIsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgICBzdHlsZUFwcGxpY2F0b3IoZWxlbWVudCwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZGRDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGFkZGRpbmcgY2xhc3MgdG8gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVtb3ZlQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGByZW1vdmUgY2xhc3MgZnJvbSAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb2N1bWVudFRpdGxlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgY2hhbmdpbmcgZG9jdW1lbnQgdGl0bGUgZnJvbSAke2VsZW1lbnR9IHRvICR7dmFsdWV9YCk7XG4gICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgPT0gXCJ0YWJDaGFuZ2VcIikge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJjYXRjaGluZyBldmVudCB0YWJjaGFuZ2UuLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gd2luZG93LnRvcC5kb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShlLCB2YWx1ZSwgb3JpZ2luYWxUaXRsZSk7XG4gICAgICAgICAgICAgICAgICB9LCAxNTAwMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmtub3duIGVkaXQgdHlwZTogXCIsIHR5cGUpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInJlcGxhY2VcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZzogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQucmVwbGFjZUFsbCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzd2FwXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTd2FwcGluZzogXCIsIG1vdmVfc2VsZWN0b3JfMSwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGNvbnN0IG4xID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBuMiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgc3dhcE5vZGVzKG4xLCBuMik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbmplY3RzY3JpcHRcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluamVjdGluZyBzY3JpcHQ6IFwiLCB2YWx1ZSk7XG4gICAgICBjb25zdCBzY3JpcHRJRCA9IGdldFVuc2VjdXJlSGFzaCh2YWx1ZSk7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChzY3JpcHRJRCkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlNjcmlwdCBhbHJlYWR5IGluIHBhZ2UhXCIpO1xuICAgICAgfSBlbHNlIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0IGlkPSR7c2NyaXB0SUR9PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIHRleHQtdHJhbnNmb3JtIHR5cGVcIik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiYWktc3VnZ2VzdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRpdGxlLWNoYW5nZVwiOiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcImdldHRpbmcgdGl0bGUgc3VnZ2VzdGlvbnNcIik7XG4gICAgICAgICAgY29uc3QgZmluYWxUaXRsZSA9IGF3YWl0IHByZXBhcmVGaW5hbFRpdGxlKCk7XG4gICAgICAgICAgaWYgKCFmaW5hbFRpdGxlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ2Fubm90IGFwcGx5IHRpdGxlLWNoYW5nZSB0aGVyZSBpcyBubyBzdWdnZXN0aW9uIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5jb250ZW50cygpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVUeXBlID09IDM7XG4gICAgICAgICAgfSlbMF0ubm9kZVZhbHVlID0gZmluYWxUaXRsZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkLWRlc2NyaXB0aW9uXCI6IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0dGluZyBkZXNjcmlwdGlvbiBzdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkVsbSA9IGF3YWl0IHByZXBhcmVEZXNjRWxtKHZhbHVlKTtcbiAgICAgICAgICBpZiAoIWRlc2NyaXB0aW9uRWxtKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ2Fubm90IGFwcGx5IGFkZC1kZXNjcmlwdGlvbiB0aGVyZSBpcyBubyBzdWdnZXN0aW9uIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUoZGVzY3JpcHRpb25FbG0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIG9wZXJhdG9yIGV4aXN0cyB5ZXRcIiwgb3BlcmF0b3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBwcmVwYXJlRGVzY0VsbSA9IGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KHNrdSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mbz8ubWFya2V0aW5nQ29weSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gZGVzY3JpcHRpb24gZm91bmQgZm9yIHNrdSAke3NrdX1gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB1cGRhdGVkSHRtbFN0cmluZyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLm1hcmtldGluZ0NvcHksIHZhbHVlKTtcbiAgICByZXR1cm4gdXBkYXRlZEh0bWxTdHJpbmc7XG4gIH07XG5cbiAgY29uc3QgcHJlcGFyZUZpbmFsVGl0bGUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1KTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvPy50aXRsZUF1Z21lbnQpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIHRpdGxlIHN1Z2dlc3Rpb24gZm91bmQgZm9yIHNrdSAke3NrdX1gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBwcm9kdWN0SW5mby50aXRsZUF1Z21lbnQgKyBgICgke3NrdX0pYDtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIGNvbnN0IHJlcGxhY2VXaXRoVmFsID0gKHZhbHVlLCBodG1sU3RyKSA9PiB7XG4gICAgaWYgKHZhbHVlICYmIGh0bWxTdHIuaW5jbHVkZXMoXCJ7e1JFUExBQ0VfUFJPRFVDVElORk99fVwiKSkge1xuICAgICAgaHRtbFN0ciA9IHJlcGxhY2VBbGwoaHRtbFN0ciwgXCJ7e1JFUExBQ0VfUFJPRFVDVElORk99fVwiLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBodG1sU3RyO1xuICB9O1xuXG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoc2t1TGlzdFswXSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSA9IGFzeW5jIChldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkVGl0bGVzID0gIUFycmF5LmlzQXJyYXkodGl0bGVzKSA/IFt0aXRsZXNdIDogdGl0bGVzO1xuICAgIGZvciAoY29uc3QgcGFyc2VkVGl0bGUgb2YgcGFyc2VkVGl0bGVzKSB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IHBhcnNlZFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQb3B1cENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQ7XG4gICAgaWYgKGlkICYmIGlkID09PSBcIm5kLXBvcHVwX193cmFwcGVyXCIpIHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuY29udGFpbnMoXCJuZC1tb2RhbF9fd3JhcHBlclwiKSkge1xuICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBvcHVwID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpID4gMCkgcmV0dXJuO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAxKTtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmQtcG9wdXBfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcblxuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH0sIDE1MDAwKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5TW9kYWwgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvcikgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpKSBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQb3B1cCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCBpc01vZGFsPWZhbHNlKSA9PiB7XG4gICAgLy8gQ3JlYXRlIHBvcHVwIHdyYXBwZXJcbiAgICBjb25zdCBwb3B1cFdyYXBwZXIgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLXBvcHVwX193cmFwcGVyXCIpO1xuICAgIGlmIChpc01vZGFsKSBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLW1vZGFsX193cmFwcGVyXCIpO1xuICAgIGlmICghaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmlkID0gXCJuZC1wb3B1cF9fd3JhcHBlclwiO1xuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b24gPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvblN0eWxlID0gaXNNb2RhbCA/IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZV9fY29sb3JlZFwiIDogXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlXCI7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xvc2VCdXR0b25TdHlsZSk7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBpZiAoaXNNb2RhbCkge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnRTZWxlY3Rvcikge1xuICAgICAgY29uc3QgY29udGVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZW50U2VsZWN0b3IpKTtcbiAgICAgIHdoaWxlICh2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpICYmIGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgY29udGVudHMuc2hpZnQoKS5zcmMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBwb3B1cCBmcm9tIGFjdGlvbiBhbmQgYXBwZW5kIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHRlbXBsYXRlID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IHBvcHVwID0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwQ2xvc2VCdXR0b24pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChwb3B1cCk7XG5cbiAgICAvLyBSZW1vdmUgb2xkIHBvcHVwIGlmIGV4aXN0cyBiZWZvcmUgYXBwZW5kaW5nIG5ldyBvbmVcbiAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IHN3YXBOb2RlcyA9IGZ1bmN0aW9uIHN3YXBOb2RlcyhuMSwgbjIpIHtcbiAgICBjb25zdCBwMSA9IG4xLnBhcmVudE5vZGU7XG4gICAgY29uc3QgcDIgPSBuMi5wYXJlbnROb2RlO1xuICAgIGxldCBpMTtcbiAgICBsZXQgaTI7XG5cbiAgICBpZiAoIXAxIHx8ICFwMiB8fCBwMS5pc0VxdWFsTm9kZShuMikgfHwgcDIuaXNFcXVhbE5vZGUobjEpKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDEuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjEpKSB7XG4gICAgICAgIGkxID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAyLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4yKSkge1xuICAgICAgICBpMiA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHAxLmlzRXF1YWxOb2RlKHAyKSAmJiBpMSA8IGkyKSB7XG4gICAgICBpMisrO1xuICAgIH1cbiAgICBwMS5pbnNlcnRCZWZvcmUobjIsIHAxLmNoaWxkcmVuW2kxXSk7XG4gICAgcDIuaW5zZXJ0QmVmb3JlKG4xLCBwMi5jaGlsZHJlbltpMl0pO1xuICB9O1xuXG4gIGNvbnN0IHdhaXRGb3JKUXVlcnkgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImpRdWVyeSBub3QgZm91bmQsIHJldHJ5aW5nXCIpO1xuICAgICAgICBjb25zdCBqUXVlcnlJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0gZWxzZSByZXNvbHZlKHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFjdGlvbkFwcGxpY2F0b3IgPSBhc3luYyAoYWN0aW9ucykgPT4ge1xuICAgIGlmIChhd2FpdCB3YWl0Rm9ySlF1ZXJ5KCkpIHtcbiAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoYWN0aW9uLmVsaWdpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBhY3Rpb24uZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGRuJ3QgYXBwbHkgYWN0aW9uICR7SlNPTi5zdHJpbmdpZnkoYWN0aW9uKX0gd2l0aCBlcnJvciAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVycm9yLWFwcGx5aW5nLWFjdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJKcXVlcnkgbm90IGZvdW5kIG9uIHdpbmRvd1wiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQXBwbHkgYWN0aW9uc1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBhY3Rpb25BcHBsaWNhdG9yKGFjdGlvbnMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGRlZmF1bHQgYXBwbHlBY3Rpb25zO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlLCBjaGFpbn0gPSBjb25kaXRpb247XG4gIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbmRpdGlvbkVsZW1lbnRzKSB7XG4gICAgaWYgKGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pKSB7XG4gICAgICBlbGlnaWJsZUVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuY29uc3QgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciA9IGFzeW5jIChlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChlbGVtZW50U2t1KTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHByb2R1Y3RJbmZvPy5bb3BlcmF0b3JdO1xuICAgICAgLy8gcnVuVGltZVZhbHVlIG1heSBiZSAwXG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8IHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJQcm9kdWN0IGluZm8gaXMgZW1wdHlcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhc2UgXCJmdW5jdGlvblwiOiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmbiA9IEZ1bmN0aW9uKFwiZWxcIiwgb3BlcmF0b3IpO1xuICAgICAgICByZXR1cm4gZm4oZWxlbWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGV4ZWN1dGluZyBmdW5jdGlvbiBhY3Rpb24gY29uZGl0aW9uXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGNoYWluKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgY2hhaW4udHlwZSwgY2hhaW4ub3BlcmF0b3IsXG4gICAgICAgICAgICBjaGFpbi5hdHRyaWJ1dGUsIGNoYWluLmlubmVyX2NvbmRpdGlvbiwgY2hhaW4udmFsdWUsIGNoYWluLmNoYWluKTtcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGVja0FjdGlvbkNvbmRpdGlvbjtcbiIsImNvbnN0IEVfVElNRU9VVCA9IG5ldyBFcnJvcigndGltZW91dCB3aGlsZSB3YWl0aW5nIGZvciBtdXRleCB0byBiZWNvbWUgYXZhaWxhYmxlJyk7XG5jb25zdCBFX0FMUkVBRFlfTE9DS0VEID0gbmV3IEVycm9yKCdtdXRleCBhbHJlYWR5IGxvY2tlZCcpO1xuY29uc3QgRV9DQU5DRUxFRCA9IG5ldyBFcnJvcigncmVxdWVzdCBmb3IgbG9jayBjYW5jZWxlZCcpO1xuXG52YXIgX19hd2FpdGVyJDIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIFNlbWFwaG9yZSB7XG4gICAgY29uc3RydWN0b3IoX3ZhbHVlLCBfY2FuY2VsRXJyb3IgPSBFX0NBTkNFTEVEKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gX3ZhbHVlO1xuICAgICAgICB0aGlzLl9jYW5jZWxFcnJvciA9IF9jYW5jZWxFcnJvcjtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzID0gW107XG4gICAgfVxuICAgIGFjcXVpcmUod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0ucHVzaCh7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCA9IDEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgW3ZhbHVlLCByZWxlYXNlXSA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jayh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0ucHVzaChyZXNvbHZlKTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlIDw9IDA7XG4gICAgfVxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIHJlbGVhc2Uod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMuZm9yRWFjaCgocXVldWUpID0+IHF1ZXVlLmZvckVhY2goKGVudHJ5KSA9PiBlbnRyeS5yZWplY3QodGhpcy5fY2FuY2VsRXJyb3IpKSk7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgfVxuICAgIF9kaXNwYXRjaCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlRW50cnkgPSAoX2EgPSB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlRW50cnkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlIC09IHdlaWdodDtcbiAgICAgICAgICAgIHdlaWdodCA9IHRoaXMuX3ZhbHVlICsgMTtcbiAgICAgICAgICAgIHF1ZXVlRW50cnkucmVzb2x2ZShbcHJldmlvdXNWYWx1ZSwgdGhpcy5fbmV3UmVsZWFzZXIocHJldmlvdXNXZWlnaHQpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZHJhaW5VbmxvY2tXYWl0ZXJzKCk7XG4gICAgfVxuICAgIF9uZXdSZWxlYXNlcih3ZWlnaHQpIHtcbiAgICAgICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIF9kcmFpblVubG9ja1dhaXRlcnMoKSB7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0uZm9yRWFjaCgod2FpdGVyKSA9PiB3YWl0ZXIoKSk7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciQxID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBNdXRleCB7XG4gICAgY29uc3RydWN0b3IoY2FuY2VsRXJyb3IpIHtcbiAgICAgICAgdGhpcy5fc2VtYXBob3JlID0gbmV3IFNlbWFwaG9yZSgxLCBjYW5jZWxFcnJvcik7XG4gICAgfVxuICAgIGFjcXVpcmUoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMSh0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFssIHJlbGVhc2VyXSA9IHlpZWxkIHRoaXMuX3NlbWFwaG9yZS5hY3F1aXJlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVsZWFzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5ydW5FeGNsdXNpdmUoKCkgPT4gY2FsbGJhY2soKSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUud2FpdEZvclVubG9jaygpO1xuICAgIH1cbiAgICByZWxlYXNlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCkpXG4gICAgICAgICAgICB0aGlzLl9zZW1hcGhvcmUucmVsZWFzZSgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuY2FuY2VsKCk7XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiB3aXRoVGltZW91dChzeW5jLCB0aW1lb3V0LCB0aW1lb3V0RXJyb3IgPSBFX1RJTUVPVVQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3F1aXJlOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHN5bmMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxlYXNlID0gQXJyYXkuaXNBcnJheSh0aWNrZXQpID8gdGlja2V0WzFdIDogdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRpY2tldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVsZWFzZSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGlja2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh0aWNrZXRbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGVhc2Uod2VpZ2h0KSB7XG4gICAgICAgICAgICBzeW5jLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN5bmMuY2FuY2VsKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhaXRGb3JVbmxvY2s6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHN5bmMud2FpdEZvclVubG9jayh3ZWlnaHQpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWplY3QodGltZW91dEVycm9yKSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMb2NrZWQ6ICgpID0+IHN5bmMuaXNMb2NrZWQoKSxcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHN5bmMuZ2V0VmFsdWUoKSxcbiAgICAgICAgc2V0VmFsdWU6ICh2YWx1ZSkgPT4gc3luYy5zZXRWYWx1ZSh2YWx1ZSksXG4gICAgfTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saXNuZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB0cnlBY3F1aXJlKHN5bmMsIGFscmVhZHlBY3F1aXJlZEVycm9yID0gRV9BTFJFQURZX0xPQ0tFRCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcmV0dXJuIHdpdGhUaW1lb3V0KHN5bmMsIDAsIGFscmVhZHlBY3F1aXJlZEVycm9yKTtcbn1cblxuZXhwb3J0IHsgRV9BTFJFQURZX0xPQ0tFRCwgRV9DQU5DRUxFRCwgRV9USU1FT1VULCBNdXRleCwgU2VtYXBob3JlLCB0cnlBY3F1aXJlLCB3aXRoVGltZW91dCB9O1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgYXBwbHlBY3Rpb25zIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXhcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbFwiO1xuaW1wb3J0IHtcbiAgYWRkVHJlYXRtZW50LFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGREYXRhTGlzdGVuZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFRSRUFUTUVOVF9SQVRJTyxcbiAgTU9CSUxFX01FRElBX1FVRVJZLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBkZXRlcm1pbmVQY3QsXG4gIHByZXBhcmVBY3Rpb25zLFxuICBjaGVja0FjdGlvblNlbGVjdG9ycyxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJvYm90RW5naW5lXCIpO1xuY29uc3QgT0JTRVJWRVJfQ09ORklHID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90RW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cywgZGVidWdNb2RlLCBtYXRjaGVkVHJlYXRtZW50cywgaWRlbnRpZmllciwgcGFnZVR5cGUsIGlzT259ID0gYm9keTtcbiAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcyA9IFtdO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBjb25zdCByb2JvdFByb21pc2VzID0gW107XG4gICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdGhpcy5tYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRyZWF0bWVudC5kZXBlbmRhbnRfb25fdHJlYXRtZW50KSBjb250aW51ZTtcbiAgICAgICAgcm9ib3RQcm9taXNlcy5wdXNoKHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocm9ib3RQcm9taXNlcyk7XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgICAgaGVscGVycyxcbiAgICB9ID0gdHJlYXRtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGRlYnVnTW9kZSxcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZW5nYWdlbWVudExvY2ssXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNNb2JpbGUsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIGFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gZW5nYWdlbWVudExvY2tbaWRdIHx8IG5ldyBNdXRleCgpO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBlbmdhZ2VtZW50TG9ja1tpZF0uYWNxdWlyZSgpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNPbikge1xuICAgICAgICAgIGFkZFRyZWF0bWVudChpZCwgbnVsbCwgbnVsbCwgXCJza2lwcGVkXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRTa2lwUmF0aW8gPSB3ZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gd2VpZ2h0IHx8IFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgICAvLyBEZXRlcm1pbmluZyBpZGVudGlmaWVyIGZvciBjYWxjdWxhdGluZyB0cmVhdG1lbnQgcGVyY2VudGFnZSAodHJlYXRtZW50UGN0KVxuICAgICAgICBjb25zdCBkZXRlcm1pbmluZ0lkZW50aWZpZXIgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50IHx8IGlkO1xuXG4gICAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIDEwMCB3aGVuIGRlYnVnIG1vZGUgaXMgMSwgZW5zdXJpbmcgbm8gdHJlYXRtZW50cyBhcmUgc2tpcHBlZFxuICAgICAgICBjb25zdCB0cmVhdG1lbnRQY3QgPSBkZWJ1Z01vZGUgPT09IDEgPyAxMDAgOiBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIGRldGVybWluaW5nSWRlbnRpZmllcik7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbcHJlcGFyZWRBY3Rpb25zLCB2YXJpYW50XSA9IGF3YWl0IHByZXBhcmVBY3Rpb25zKGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuXG4gICAgICAgIGxldCBpc0VsaWdpYmxlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgcHJlcGFyZWRBY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24uY29uZGl0aW9uKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgaWYgKGVsaWdpYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24uZWxpZ2libGVFbGVtZW50cyA9IGVsaWdpYmxlRWxlbWVudHM7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgaWYgKHRyZWF0bWVudFBjdCA8IHRyZWF0bWVudFNraXBSYXRpbykge1xuICAgICAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBza2lwcGVkIGR1ZSB0byB0cmVhdG1lbnQgc3BsaXQgcmF0aW9gKTtcbiAgICAgICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcInNraXBwZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICBhd2FpdCBhcHBseShpZCwgcHJlcGFyZWRBY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IGFwcGx5KGlkLCBwcmVwYXJlZEFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDpcIiwgaWQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICByZWxlYXNlKCk7XG4gICAgICB0aGlzLmFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpO1xuICAgICAgdGhpcy5hZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZWxwZXJzKSAmJiBoZWxwZXJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGVscGVyUm9ib3RQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgICAgaWYgKCFoZWxwZXJzLmluY2x1ZGVzKHRyZWF0bWVudC5pZCkpIGNvbnRpbnVlO1xuICAgICAgICBoZWxwZXJSb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGhlbHBlclJvYm90UHJvbWlzZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFwcGx5KGlkLCBwcmVwYXJlZEFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50KSB7XG4gICAgLy8gVE9ETyBjaGVjayBhbGwgYWN0aW9uIHNlbGVjdG9ycyBleGlzdCAtIGlmIG5vdCByb2JvdCBpcyBmYWlsZWRcbiAgICBjb25zdCBjaGVjayA9IGNoZWNrQWN0aW9uU2VsZWN0b3JzKHByZXBhcmVkQWN0aW9ucyk7XG4gICAgaWYgKCFjaGVjaykgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkQWN0aW9ucyk7XG4gICAgaWYgKHJlcyA9PT0gdHJ1ZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH0gZWxzZSBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgfVxuICB9XG5cbiAgYWRkUmVhcHBseUV2ZW50KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtwYWdlVHlwZSwgcmVBcHBseVRyZWF0bWVudHNNYXB9ID0gdGhpcztcbiAgICBjb25zdCB7aWQsIHJlYXBwbHlfZXZlbnQsIHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlfSA9IHRyZWF0bWVudDtcbiAgICBpZiAocmVhcHBseV9ldmVudCkge1xuICAgICAgaWYgKCFyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSB8fCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSA9PT0gcGFnZVR5cGUpIHtcbiAgICAgICAgbGV0IHJlYXBwbHlfZXZlbnRfYXJyYXkgPSByZWFwcGx5X2V2ZW50O1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVhcHBseV9ldmVudCkpIHJlYXBwbHlfZXZlbnRfYXJyYXkgPSBbcmVhcHBseV9ldmVudF07XG4gICAgICAgIGxvZ2dlci5sb2coYFJlYXBwbHkgZXZlbnQgJyR7cmVhcHBseV9ldmVudH0nIGZvdW5kIGZvciB0cmVhdG1lbnQ6ICR7aWR9YCk7XG4gICAgICAgIGZvciAoY29uc3QgcmVhcHBseUV2ZW50IG9mIHJlYXBwbHlfZXZlbnRfYXJyYXkpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA/XG4gICAgICAgICAgICByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdIDogW107XG4gICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IGFscmVhZHkgYWRkZWQgZm9yIHJlYXBwbHkgZXZlbnRcIik7XG4gICAgICAgICAgfSBlbHNlIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gPSBbLi4ucHJldmlvdXNWYWx1ZSwgaWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKSB7XG4gICAgY29uc3Qge3JlQXBwbHlUcmVhdG1lbnRzTWFwLCBtYXRjaGVkVHJlYXRtZW50c30gPSB0aGlzO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJlQXBwbHlUcmVhdG1lbnRzTWFwKSkge1xuICAgICAgY29uc3QgdHJlYXRtZW50SWRzID0gcmVBcHBseVRyZWF0bWVudHNNYXBba2V5XTtcbiAgICAgIGNvbnN0IHJlQXBwbHlUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHMuZmlsdGVyKCh0KSA9PiB0cmVhdG1lbnRJZHMuaW5jbHVkZXModC5pZCkpO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcImluZmluaXRlX3Njcm9sbFwiOiB7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGluZmluaXRlX3Njcm9sbGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRpbWVvdXRcIjoge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHRpbWVvdXRgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRfY2hhbmdlXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseVNlbGVjdG9yTGlzdCA9IEFycmF5LmlzQXJyYXkodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IpID9cbiAgICAgICAgICAgICAgICB0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciA6IFt0cmVhdG1lbnQucmVhcHBseV9zZWxlY3Rvcl07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHJlYXBwbHlTZWxlY3Rvckxpc3QpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gZWxlbWVudF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9uX3Njcm9sbFwiOiB7XG4gICAgICAgICAgLy8gYWRkIHdpbmRvdyBzY3JvbGwgbGlzdGVuZXIsIGNhbGwgZW5nYWdlUm9ib3Qgb24gc2Nyb2xsLCBkbyBub3QgdHJpZ2dlciBtb3JlIHRoYW4gb25jZSBwZXIgMjUwbXNcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUaW1lID0gMDtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IHN0ID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGlmIChub3cgLSBsYXN0U2Nyb2xsVGltZSA+IDI1MCAmJiBNYXRoLmFicyhsYXN0U2Nyb2xsVG9wIC0gc3QpID4gNSkge1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUaW1lID0gbm93O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBvbl9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInF1ZXJ5X3NlYXJjaF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGxldCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCAhPT0gcXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBxdWVyeV9zZWFyY2hfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW50ZXJ2YWxcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseUludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBhcHBsaWVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGlmIChhcHBsaWVkPy5bdHJlYXRtZW50LmlkXSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW50ZXJ2YWxgKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICB9LCAyNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbmZvX2xheWVyX2NoYW5nZVwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgICAgICAgICAgYWRkRGF0YUxpc3RlbmVyKHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSZWFwcGx5IGV2ZW50IG5vdCBmb3VuZDogXCIsIGtleSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZVNldCA9IFtdLCBidXNpbmVzc1J1bGVTZXQgPSBbXSwgaWR9ID0gdHJlYXRtZW50O1xuICAgIGlmICh0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLmluY2x1ZGVzKGlkKSkgcmV0dXJuO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhbLi4uZWxpZ2liaWxpdHlSdWxlU2V0LCAuLi5idXNpbmVzc1J1bGVTZXRdKTtcbiAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBhZGREYXRhTGlzdGVuZXIoYF9fZVJ1bGVzLiR7c2VsZWN0b3J9YCwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgIH1cbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLnB1c2goaWQpO1xuICB9XG5cbiAgZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlU2V0LCBwcmV2aW91c1NlbGVjdG9ycyA9IG51bGwpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBwcmV2aW91c1NlbGVjdG9ycyB8fCBbXTtcbiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAocnVsZS5zdGFydHNXaXRoKFwiIVwiKSkgcnVsZSA9IHJ1bGUuc2xpY2UoMSk7XG4gICAgICAgIHNlbGVjdG9ycy5wdXNoKHJ1bGUuc3BsaXQoXCIuXCIpWzBdKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZS5zZXQsIHNlbGVjdG9ycyk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uKG5ldyBTZXQoc2VsZWN0b3JzKSldO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpIHtcbiAgICBsb2dnZXIubG9nKGBDaGVja2luZyBlbGlnaWJpbGl0eSAke2VsaWdpYmlsaXR5UnVsZX1gKTtcbiAgICBsZXQgb3Bwb3NpdGVGbGFnID0gZmFsc2U7XG4gICAgbGV0IFtlbGlnaWJpbGl0eVNjb3BlLCBlbGlnaWJpbGl0eU5hbWVdID0gZWxpZ2liaWxpdHlSdWxlLnNwbGl0KFwiLlwiKTtcbiAgICBpZiAoZWxpZ2liaWxpdHlTY29wZS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgb3Bwb3NpdGVGbGFnID0gdHJ1ZTtcbiAgICAgIGVsaWdpYmlsaXR5U2NvcGUgPSBlbGlnaWJpbGl0eVNjb3BlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2VsaWdpYmlsaXR5U2NvcGV9YCk7XG4gICAgaWYgKCFyZXMgfHwgIUFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvcHBvc2l0ZUZsYWcgJiYgcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW9wcG9zaXRlRmxhZyAmJiAhcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBsb2dnZXIubG9nKGAke2VsaWdpYmlsaXR5UnVsZX0gaXMgZWxpZ2libGVgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCwgZWxpZ2liaWxpdHlTZXRUeXBlID0gbnVsbCwgcHJldmlvdXNJc0VsaWdpYmxlID0gbnVsbCkge1xuICAgIGxvZ2dlci5sb2coXCJDaGVja2luZyByb2JvdCBlbGlnaWJpbGl0eVwiKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRWxpZ2liaWxpdHkgUnVsZSBTZXQgJHtlbGlnaWJpbGl0eVJ1bGVTZXR9IGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNFbGlnaWJsZSA9IHByZXZpb3VzSXNFbGlnaWJsZTtcbiAgICBmb3IgKGNvbnN0IGVsaWdpYmlsaXR5UnVsZSBvZiBlbGlnaWJpbGl0eVJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgJiYgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVW5rbm93biBlbGlnaWJpbGl0eVNldFR5cGU6IFwiLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZS5zZXQsIGVsaWdpYmlsaXR5UnVsZS50eXBlLCBpc0VsaWdpYmxlKTtcbiAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGluZGV4IG9mIGJ1c2luZXNzUnVsZSwgdGhpcyBpcyB0aGUgYnVzaW5lc3NSdWxlSWRcbiAgYXN5bmMgY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBidXNpbmVzc1J1bGVdIG9mIGJ1c2luZXNzUnVsZVNldC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KFtidXNpbmVzc1J1bGVdKSkgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRGF0YUxheWVyUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgd2l0aCBvcGVyYXRvclwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBzZWxlY3RvclwiLCBydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGwpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIHNlbGVjdG9yLCBzZWxlY3RvckFsbCwgc2VsZWN0b3JGYWxsYmFjayA9IG51bGx9ID0gcnVsZTtcbiAgbGV0IG1haW5TZWxlY3RvciA9IHNlbGVjdG9yO1xuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIG1haW5TZWxlY3RvciA9IHNlbGVjdG9yRmFsbGJhY2sgPyBzZWxlY3RvckZhbGxiYWNrIDogbWFpblNlbGVjdG9yO1xuICB9XG5cbiAgaWYgKG9wZXJhdG9yID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvciksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoc2VsZWN0b3JBbGwgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChtYWluU2VsZWN0b3IpIGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKTtcbiAgZWxzZSBpZiAoc2VsZWN0b3JBbGwpIGVsZW1lbnQgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidGV4dC1udW1iZXJcIjoge1xuICAgICAgbGV0IHRlbXBWYWw7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgICB0ZW1wVmFsID0gZWxlbWVudC5yZWR1Y2UoKHJldHVyblZhbCwgZWxlbSkgPT4ge1xuICAgICAgICAgIHJldHVyblZhbCArPSBwYXJzZUludChlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVmFsID0gcGFyc2VJbnQod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikudGV4dENvbnRlbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgfVxuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcGFyc2VJbnQodGVtcFZhbCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiY2xhc3NMaXN0XCI6XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImNvdW50XCI6IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihlbGVtZW50Lmxlbmd0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigwLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSBcInN0eWxlXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgY29uc3Qgc3R5bGVLZXkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50U3R5bGVzW3N0eWxlS2V5XTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCBzdHlsZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJPcGVyYXRvciBub3QgZGVmaW5lZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVGdW5jdGlvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0Z1bmN0aW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIGZ1bmN0aW9uIHJ1bGVcIik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgZnVuY3Rpb24gbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHJ1bGVGdW5jdGlvbiA9IEZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gcnVsZUZ1bmN0aW9uKCk7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVNlc3Npb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tTZXNzaW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkdXJhdGlvblwiOlxuICAgICAgcmV0dXJuIGR1cmF0aW9uSGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiaGlzdG9yeVwiOlxuICAgICAgcmV0dXJuIGhpc3RvcnlIYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZ2V0U2Vzc2lvblRpbWVzdGFtcCA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IERhdGUocGFyc2VJbnQod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9USU1FU1RBTVApKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IHNlc3Npb24gdGltZXN0YW1wXCIsIGVycik7XG4gICAgcmV0dXJuIERhdGUubm93KCk7XG4gIH1cbn07XG5cbmNvbnN0IGR1cmF0aW9uSGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gKERhdGUubm93KCkgLSBnZXRTZXNzaW9uVGltZXN0YW1wKCkpIC8gMTAwMDtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZHVyYXRpb24sIGNvbmRpdGlvbiwgcGFyc2VJbnQodmFsdWUpKTtcbn07XG5cbmNvbnN0IGhpc3RvcnlIYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgY3VycmVudEhpc3RvcnkgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX0hJU1RPUlkpPy5zcGxpdChcIixcIik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGN1cnJlbnRIaXN0b3J5LCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXJsQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrVXJsUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInBhdGhcIjoge1xuICAgICAgY29uc3QgcmVxdWVzdFVSTD0gd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmO1xuICAgICAgY29uc3QgcGF0aCA9IG5ldyBVUkwocmVxdWVzdFVSTCkucGF0aG5hbWU7XG4gICAgICBsb2dnZXIubG9nKGBDaGVja2luZyBwYXRoICR7cGF0aH0gbWF0Y2hlcyBydWxlIHBhdGggJHt2YWx1ZX1gKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHBhdGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWX0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRW52Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRW52UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgbGV0IHNrdTtcbiAgaWYgKHBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKTtcbiAgICBpZiAoIXNrdSkgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGlmICghc2t1TGlzdCB8fCAodHlwZW9mIHNrdUxpc3QgPT09IFwib2JqZWN0XCIgJiYgIU9iamVjdC5rZXlzKHNrdUxpc3QpLmxlbmd0aCkpIHJldHVybiBmYWxzZTtcbiAgICBza3UgPSBza3VMaXN0W09iamVjdC5rZXlzKHNrdUxpc3QpWzBdXTtcbiAgfVxuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJzYWxlQ250VmlzaXRvcnNJbjE1XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIFRyYW5zYWN0aW9uQ291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFRyYW5zYWN0aW9uQ291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiY2FydENudFZpc2l0b3JzSW4xNVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0QWRkVG9DYXJ0Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwidmlld0NudFZpc2l0b3JzSW4xXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFByZXZpZXdDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJoYXNUaXRsZVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyB0aXRsZSBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VGl0bGUoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiaGFzRGVzY3JpcHRpb25cIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgZGVzY3JpcHRpb24gZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldERlc2NyaXB0aW9uKHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmNvbnN0IGdldFRyYW5zYWN0aW9uQ291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRBZGRUb0NhcnRDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0RnJvbURCID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gIHJldHVybiBhd2FpdCBkYi5nZXQoc2t1KTtcbn07XG5cbmNvbnN0IGdldFRpdGxlID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnRpdGxlQXVnbWVudCB8fCBcIlwiO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgZ2V0RGVzY3JpcHRpb24gPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8ubWFya2V0aW5nQ29weSB8fCBcIlwiO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y2hlY2tEYXRhTGF5ZXJSdWxlfSBmcm9tIFwiLi9kYXRhTGF5ZXJDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRWxlbWVudFJ1bGV9IGZyb20gXCIuL2VsZW1lbnRDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRnVuY3Rpb25SdWxlfSBmcm9tIFwiLi9mdW5jdGlvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tTZXNzaW9uUnVsZX0gZnJvbSBcIi4vc2Vzc2lvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tVcmxSdWxlfSBmcm9tIFwiLi91cmxDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRW52UnVsZX0gZnJvbSBcIi4vZW52Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Byb2R1Y3RJbmZvUnVsZX0gZnJvbSBcIi4vcHJvZHVjdEluZm9DaGVja2VyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7YWRkRGF0YUxpc3RlbmVyLCBhZGRUb0JlYWdsZUluZm9MYXllciwgZ2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtNdXRleH0gZnJvbSBcImFzeW5jLW11dGV4XCI7XG5pbXBvcnQge2ZldGNoRWxpZ2liaWxpdHlSdWxlc30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSdWxlRW5naW5lXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlRW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVzLCBiYXNlUnVsZVNldH0gPSBib2R5O1xuICAgIHRoaXMuYmFzZVJ1bGVTZXQgPSBiYXNlUnVsZVNldDtcbiAgICB0aGlzLmVsaWdpYmlsaXR5UnVsZXMgPSBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5tdXRleCA9IG5ldyBNdXRleCgpO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgdGhpcy5iYXNlUnVsZVNldCkge1xuICAgICAgY29uc3QgcnVsZVNhdGlzZmllZCA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgaWYgKCFydWxlU2F0aXNmaWVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGUocnVsZSkge1xuICAgIGNvbnN0IHtjaGFpbiwgY2hhaW5fY29uZGl0aW9uLCB0eXBlfSA9IHJ1bGU7XG4gICAgbGV0IHJ1bGVTYXRpc2ZpZWQgPSBudWxsO1xuICAgIC8vIGNoZWNrIHJ1bGVcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJzZXNzaW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1Nlc3Npb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VsZW1lbnRSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrRGF0YUxheWVyUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXJsXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1VybFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0Z1bmN0aW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZW52aXJvbm1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRW52UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrUHJvZHVjdEluZm9SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIHN1Y2ggcnVsZSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjaGFpbikge1xuICAgICAgc3dpdGNoIChjaGFpbl9jb25kaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICYmIGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgfHwgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgIT0gYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIGNoYWluIGNvbmRpdGlvblwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVTYXRpc2ZpZWQgPyBydWxlLm5hbWUgfHwgdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImFzc2Vzc2luZy1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgICBjb25zdCBrZXlQcm9taXNlc01hcCA9IHt9O1xuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZWxpZ2liaWxpdHlSdWxlcykpIHtcbiAgICAgIGtleVByb21pc2VzTWFwW2tleV0gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBrZXlQcm9taXNlc01hcFtrZXldLnB1c2godGhpcy5jaGVja1J1bGUocnVsZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVQcm9taXNlc10gb2YgT2JqZWN0LmVudHJpZXMoa2V5UHJvbWlzZXNNYXApKSB7XG4gICAgICBjb25zdCBzYXRpc2ZpZWRSdWxlSWRzID0gYXdhaXQgUHJvbWlzZS5hbGwocnVsZVByb21pc2VzKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBzYXRpc2ZpZWRSdWxlSWRzLmZpbHRlcigoaWQpID0+IGlkICE9PSBmYWxzZSkpO1xuICAgICAgdGhpcy5zZXRVcExpc3RlbmVycyhrZXksIHRoaXMuZWxpZ2liaWxpdHlSdWxlc1trZXldKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKSB7XG4gICAgaWYgKCFrZXkgfHwgIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgdGhpcy5tdXRleC5hY3F1aXJlKCk7XG4gICAgbG9nZ2VyLmxvZyhgTG9jayBhY3F1aXJlZCBmb3Iga2V5ICR7a2V5fWApO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgY29uc3QgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCkgfHwgW107XG4gICAgICAgIGlmIChpc0VsaWdpYmxlKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgY3VycmVudC5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGN1cnJlbnQpO1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZyb20gZWxpZ2libGUgcnVsZXNcbiAgICAgICAgICBpZiAoIWN1cnJlbnQuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBjdXJyZW50LmZpbHRlcigoaykgPT4gayAhPT0gcnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgZmlsdGVyZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBhc3Nlc3NpbmcgcnVsZXMgZm9yIGtleTogJHtrZXl9IC0gJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgbG9nZ2VyLmxvZyhgUmVsZWFzaW5nIGxvY2sgZm9yIGtleTogJHtrZXl9YCk7XG4gICAgICByZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0VXBMaXN0ZW5lcnMoa2V5LCBydWxlcykge1xuICAgIGNvbnN0IHtkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzfSA9IHRoaXMuZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKHJ1bGVzKTtcbiAgICBmb3IgKGNvbnN0IFtvcGVyYXRvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGFMYXllclJ1bGVzKSkge1xuICAgICAgY29uc3QgYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayA9IHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2suYmluZCh0aGlzLCBrZXksIHJ1bGVzKTtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihvcGVyYXRvciwgYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW3NlbGVjdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZWxlbWVudFJ1bGVzKSkge1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25MaXN0KSA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikgcmV0dXJuO1xuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvblJlY29yZCBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICBub2RlcyA9IFsuLi5ub2RlcywgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5yZW1vdmVkTm9kZXMpXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBleGNsdWRlIG11dGF0aW9ucyB0aGF0IG9ubHkgdXBkYXRlIHRleHRcbiAgICAgICAgaWYgKG5vZGVzLmV2ZXJ5KChuKSA9PiBuLnRhZ05hbWUgPT09IHVuZGVmaW5lZCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNlbGVjdG9yID09PSBcImJvZHlcIikge1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5wYXJlbnROb2RlLCBjb25maWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcywgZGF0YUxheWVyUnVsZXMgPSB7fSwgZWxlbWVudFJ1bGVzID0ge30sIGJhc2VSdWxlID0gbnVsbCkge1xuICAgIGlmICghcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgY29uc3Qge3R5cGV9ID0gcnVsZTtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgICAgaWYgKCFkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSkge1xuICAgICAgICAgICAgZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0ucHVzaChiYXNlUnVsZSB8fCBydWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihydWxlLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdID0gZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUuc2VsZWN0b3JBbGwpLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdID0gZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRSdWxlc1tcImJvZHlcIl0gPSBlbGVtZW50UnVsZXNbXCJib2R5XCJdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbXCJib2R5XCJdLCBiYXNlUnVsZSB8fCBydWxlXSA6IFtiYXNlUnVsZSB8fCBydWxlXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChydWxlLmNoYWluKSB7XG4gICAgICAgIHRoaXMuZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKFtydWxlLmNoYWluXSwgZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlcywgYmFzZVJ1bGUgfHwgcnVsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7ZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlc307XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0RWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGVsaWdpYmlsaXR5UnVsZXNPYmogPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTKTtcbiAgICAgIGlmIChlbGlnaWJpbGl0eVJ1bGVzT2JqKSB7XG4gICAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSBKU09OLnBhcnNlKGVsaWdpYmlsaXR5UnVsZXNPYmopO1xuICAgICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlc09iai50aW1lc3RhbXApIHtcbiAgICAgICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIGVsaWdpYmlsaXR5UnVsZXNPYmoudGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICAgICAgaWYgKGVsYXBzZWRIb3VycyA8IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSByZXR1cm4gZWxpZ2liaWxpdHlSdWxlc09iai5ydWxlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICAgICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzT2JqKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IHtydWxlczogZWxpZ2liaWxpdHlSdWxlc09iaiwgdGltZXN0YW1wOiBEYXRlLm5vdygpfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMsIEpTT04uc3RyaW5naWZ5KGVsaWdpYmlsaXR5UnVsZXNPYmopKTtcbiAgICAgIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzT2JqLnJ1bGVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZWxpZ2liaWxpdHkgcnVsZXM6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnkvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyxcbiAgaW5qZWN0U3R5bGVTaGVldCxcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBSb2JvdEVuZ2luZSBmcm9tIFwiLi9yb2JvdEVuZ2luZVwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlT25Db21wb25lbnRcIik7XG5cbmNvbnN0IGJlYWdsZU9uID0gYXN5bmMgKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUsIHRyZWF0bWVudFdlaWdodHMsIGlzT24pID0+IHtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24taW5pdFwiKTtcblxuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSA9IGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBjb25zdCB0cmVhdG1lbnRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50cygpO1xuXG4gIGluamVjdFN0eWxlU2hlZXQoKTtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24tY29uZmlnLWZldGNoXCIpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRzUHJvbWlzZTtcblxuICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICB9XG4gIGxvZ2dlci5zdWNjZXNzKFwiRm91bmQgdHJlYXRtZW50czogXCIsIHRyZWF0bWVudHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXRyZWF0bWVudHNcIik7XG5cbiAgY29uc3QgdHJlYXRtZW50UmVwb3NpdG9yeSA9IG5ldyBUcmVhdG1lbnRSZXBvc2l0b3J5KHtcbiAgICB0cmVhdG1lbnRzLFxuICAgIHRyZWF0bWVudFdlaWdodHMsXG4gIH0pO1xuXG4gIGNvbnN0IG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50UmVwb3NpdG9yeS5nZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpO1xuICBpZiAobWF0Y2hlZFRyZWF0bWVudHMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby11c2VyLXNlZ21lbnRcIik7XG4gIH1cbiAgaWYgKCFtYXRjaGVkVHJlYXRtZW50cy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC1tYXRjaGVkXCIpO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZvdW5kLW1hdGNoZWQtcm9ib3RzXCIpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2U7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJ1bGVzLWFzc2Vzc2VkXCIpO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInJ1bGVzLWFzc2Vzc2VkXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcHJvZHVjdEluZm9EQiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gICAgYXdhaXQgcHJvZHVjdEluZm9EQi5wZXJzaXN0UHJvZHVjdEluZm8oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZHVjdC1pbmZvLW5vLXBlcnNpc3RcIik7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJlbmdhZ2luZy1yb2JvdHNcIik7XG4gIGNvbnN0IHJvYm90RW5naW5lID0gbmV3IFJvYm90RW5naW5lKHtcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICBkZWJ1Z01vZGUsXG4gICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgaWRlbnRpZmllcixcbiAgICBwYWdlVHlwZSxcbiAgICBpc09uLFxuICB9KTtcbiAgYXdhaXQgcm9ib3RFbmdpbmUuZW5nYWdlUm9ib3RzKCk7XG4gIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJyb2JvdHMtZW5nYWdlZFwiKTtcbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJBcHBsaWVkIHRyZWF0bWVudHM6IFwiLCBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgUnVsZUVuZ2luZS5nZXRFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGlmICghZWxpZ2liaWxpdHlSdWxlcykgcmV0dXJuO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBydWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2VsaWdpYmlsaXR5UnVsZXN9KTtcbiAgYXdhaXQgcnVsZUVuZ2luZS5hc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzZWQtZWxpZ2liaWxpdHktcnVsZXNcIik7XG59XG5leHBvcnQgZGVmYXVsdCBiZWFnbGVPbjtcbiIsImltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlNlZ21lbnRhdGlvbkNvbXB1dGVyXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cykge1xuICBsb2dnZXIubG9nKFwiRGV0ZXJtaW5pbmcgdXNlciBzZWdtZW50XCIpO1xuICB0cnkge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgICBpZiAoIXJ1bGVTZXQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW119KTtcbiAgICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjb21wdXRlIHVzZXIgc2VnbWVudFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgTW9uaXRvciBmcm9tIFwiLi4vQmVhZ2xlTW9uaXRvci9pbmRleFwiO1xuaW1wb3J0IGJlYWdsZU9uIGZyb20gXCIuLi9CZWFnbGVPblwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFNQTElUX1JBVElPLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIExBQl9SQVRJTyxcbiAgVkVSU0lPTixcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgc2V0VVJMRGF0YSxcbiAgc2V0QWdlbnREZXRhaWxzLFxuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxuICBzd2l0Y2hUb0Vhc2VPdXQsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiO1xuXG5sZXQgU0hVVERPV04gPSBmYWxzZTtcblxuKGFzeW5jIGZ1bmN0aW9uKCkge1xuICBzd2l0Y2hUb0Vhc2VPdXQoKTtcbiAgbGV0IG1vbml0b3IgPSBudWxsO1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIGluaXRpYWxpemluZ1wiKTtcbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cbiAgbGV0IGVhcmx5TG9nU2VudCA9IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IENSSVRJQ0FMIElOSVQgVEFTS1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgaW5pdGlhbGl6aW5nXCIpO1xuICAgIHNldFVSTERhdGEoKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiwgRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBhd2FpdCBnZXRJZGVudGlmaWVyKCk7XG4gICAgbG9nZ2VyLmxvZyhcIkZvdW5kIGlkZW50aWZpZXI6IFwiLCBpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiwgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29va2llUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIsIGNvb2tpZVBjdCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2XCIsIFZFUlNJT04pO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gICAgbW9uaXRvciA9IG5ldyBNb25pdG9yKCk7XG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEFTWU5DIElOSVQgVEFTS1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIoKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuXG4gICAgLy8gU0xBOiAyIHNlY29uZHMgdG8gZmxpY2tlclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgfSwgMjAwMCk7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFkgUFJVTkUgT1VULU9GLVNDT1BFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIGxldCBvb3NCcmVhayA9IGZhbHNlO1xuICAgIGNvbnN0IG9vc1JlYXNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFKTtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuICAgIGlmIChkZWJ1Z01vZGUgPT09IC0xKSB7XG4gICAgICBTSFVURE9XTiA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gdGVzdCBjb29raWUsIGJlYWNvbiwgYW5kIHN0cmluZyB1dGlscyBzdXBwb3J0XG4gICAgaWYgKFxuICAgICAgY29va2llUGN0ID09PSBudWxsIHx8XG4gICAgICAhbmF2aWdhdG9yLnNlbmRCZWFjb24gfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICB0eXBlb2YgU3RyaW5nPy5wcm90b3R5cGU/LnBhZFN0YXJ0ICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ubWF0Y2ggIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwidW5zdXBwb3J0ZWRcIilcbiAgICApIHtcbiAgICAgIG9vc0JyZWFrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiB1c2VyQWdlbnQgY2FuIGJlIHByb3Blcmx5IHBhcnNlZFxuICAgIGlmICghb29zQnJlYWspIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IHNldEFnZW50RGV0YWlscygpO1xuICAgICAgLy8gaWYgYWdlbnQgY2Fubm90IGJlIHBhcnNlZCwgZG8gZWFybHkgYnJlYWtcbiAgICAgIGlmICghc3RhdHVzKSB7XG4gICAgICAgIG9vc0JyZWFrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgcGVybWFuZW50IHVuc2VnbWVudGVkLW9vcyBhZnRlciBPRkYgZWxpZ2liaWxpdHkgaXMgZml4ZWRcblxuICAgIC8vIGF0dGVtcHQgdG8gY29tcHV0ZSB1c2VyIHNlZ21lbnRcbiAgICBsZXQgdXNlclNlZ21lbnQgPSBudWxsO1xuICAgIGxldCB0cmVhdG1lbnRXZWlnaHRzID0gbnVsbDtcbiAgICBpZiAoIW9vc0JyZWFrKSB7XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2U7XG4gICAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY29tcHV0ZSB1c2VyIHNlZ21lbnQgYW5kIGFkZCB0byBiZWFnbGVJbmZvTGF5ZXJcbiAgICAgICAgdXNlclNlZ21lbnQgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF1c2VyU2VnbWVudCkge1xuICAgICAgICBvb3NCcmVhayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgY2Fubm90IGdldCBjcml0aWNhbCBpbmZvLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgdW5zdXBwb3J0ZWRcbiAgICBpZiAob29zQnJlYWspIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCBkZXZpY2VcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZC1kZXZpY2VcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQURNSU4gVVNFUiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIFRPRE86IHJlbmFtZSBzaG93cm9vbSBsb2dpYyB0byBhZG1pbiwgYW5kIG1hcCB2dnNJc1Nob3dyb29tIHRvIGEgY29uZmlndXJhYmxlIGFkbWluIHBhcmFtXG5cbiAgICAvLyBpZiBhZG1pbiB1c2VyLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgbWFyayBhcyBlbXBsb3llZVxuICAgIGNvbnN0IHByb2Nlc3NBZG1pblVzZXIgPSAoKSA9PiB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSwgXCJlbXBsb3llZVwiKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIHRydWUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCBhZG1pblwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFkbWluLWVtcGxveWVlXCIpO1xuICAgIH07XG5cbiAgICBsZXQgaXNBZG1pbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4pO1xuICAgIC8vIGlmIG5vdCBmb3VuZCBpbiBsb2NhbFN0b3JhZ2UsIGNoZWNrIGJlYWdsZUluZm9MYXllciB3aXRoIGJsb2NraW5nIG1vZGVcbiAgICBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlzQWRtaW4gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKTtcbiAgICAgIC8vIHBlcm1hbmVudCBsYWJlbCBjYW4gYmUgZmFsc2UsIGJ1dCBhZG1pbiB1c2VyIGNhbiBzdGlsbCBsb2dpbiBhbmQgdHVybiB0cnVlLCBsYXppbHkgZml4IHRoaXNcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IFwiZmFsc2VcIiB8fCBpc0FkbWluID09PSBmYWxzZSkge1xuICAgICAgLy8gYXN5bmMgY2FsbCB0byBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCB0aGVuIHNldCBsb2NhbFN0b3JhZ2VcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpLnRoZW4oKGlzQWRtaW4pID0+IHtcbiAgICAgICAgaWYgKGlzQWRtaW4gJiYgKGlzQWRtaW4gPT09IFwidHJ1ZVwiIHx8IGlzQWRtaW4gPT09IHRydWUpKSB7XG4gICAgICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByb2Nlc3NBZG1pblVzZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IG51bGwgfHwgaXNBZG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1hZG1pbi1zdGF0dXNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtZWFzZVwiKSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYW50aS1mbGlja2VyLXRpbWVvdXRcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBPTi9PRkYgQ0hFQ0sgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGNoYW1waW9uIGlzIGFib3ZlIFNQTElUX1JBVElPIHBsdXMgTEFCX1JBVElPXG4gICAgY29uc3QgaXNDaGFtcCA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTyAqICgxICsgTEFCX1JBVElPIC8gMTAwKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzQ2hhbXBcIiwgaXNDaGFtcCk7XG5cbiAgICAvLyBpc09uIGNhbiBiZSB0cnVlIChPTiksIGZhbHNlIChPRkYpXG4gICAgbGV0IGlzT24gPSBudWxsO1xuXG4gICAgaWYgKGRlYnVnTW9kZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkRlYnVnIG1vZGUgb246IGFsbCBhcHBsaWNhYmxlIHRyZWF0bWVudHMgd2lsbCBiZSBhcHBsaWVkXCIpO1xuICAgICAgaXNPbiA9IHRydWU7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwiZW1wbG95ZWVcIikge1xuICAgICAgbG9nZ2VyLndhcm4oXCJVc2VyIGlzIG91dCBvZiBzY29wZVwiKTtcbiAgICAgIC8vIHNldCBpc09uIHRvIHRydWUvZmFsc2Ugd2hlbiBub3QgZGVidWdNb2RlIGJ1dCBvdXQgb2Ygc2NvcGUgaS5lLiBuZF9kZWJ1Zz0wIGZvciB0ZXN0YWJpbGl0eVxuICAgICAgaXNPbiA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTztcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHVua25vd25cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG91dCBvZiBzY29wZSByZWFzb25cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGdyZWF0ZXIgdGhhbiBTUExJVF9SQVRJTywgdGhlbiBpbiBPTiBtb2RlXG4gICAgICBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPKSB7XG4gICAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ0cnVlXCJ9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPIC8gMikge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMlwifSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMVwifSk7XG4gICAgICB9XG5cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNPblwiLCBpc09uKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBpc09uLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWS1QUk9DRVNTIENPTlZFUlNJT04gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBhd2FpdCBjcml0aWNhbCBpbmZvIGJlZm9yZSBzZW5kaW5nIGxvZ3MgZm9yIHByb3BlciBhbmFseXRpY3MgbWVhc3VyZW1lbnRzXG4gICAgY29uc3QgcGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgaWYgKHBhZ2VUeXBlID09PSBcInB1cmNoYXNlXCIpIHtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBzZW5kIGxvZ3MgaW1tZWRpYXRlbHkgb24gcHVyY2hhc2UgcGFnZSwgYW5kIGZvcmNlIHdhaXRcbiAgICAgIGF3YWl0IG1vbml0b3Iuc2VuZExvZ3ModHJ1ZSk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgU0hVVERPV04gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZW5kIGxvZ3Mgd2hlbiByZWFkeSwgc3RhcnQgc2NyYXBpbmcgYW5kIHNlbmRpbmcgYXN5bmNseVxuICAgICAgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgfVxuICAgIGVhcmx5TG9nU2VudCA9IHRydWU7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gUk9CT1QgUEFUSHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImVudGVyaW5nLXJvYm90LXBhdGhcIik7XG5cbiAgICBpZiAoaXNPbiA9PT0gbnVsbCB8fCBpc09uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWlzT25cIik7XG4gICAgfSBlbHNlIGlmIChTSFVURE9XTikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2h1dGRvd24tcGF0aFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgYmVhZ2xlT24oaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSwgdHJlYXRtZW50V2VpZ2h0cywgaXNPbik7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcIkVudHJ5cG9pbnQgY2F0Y2g6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIGVyci5tZXNzYWdlKTtcbiAgICBpZiAoIWVhcmx5TG9nU2VudCAmJiBtb25pdG9yKSBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgfVxufSkoKTtcbiJdLCJuYW1lcyI6WyJyZXBsYWNlQWxsIiwic3RyIiwiZmluZCIsInJlcGxhY2UiLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJ0dXJraXNoVG9Mb3dlciIsInN0cmluZyIsImxldHRlcnMiLCJsZXR0ZXIiLCJ0b0xvd2VyQ2FzZSIsImlzU3RhZ2luZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluY2x1ZGVzIiwiVkVSU0lPTiIsIkNPT0tJRV9OQU1FIiwiVFJFQVRNRU5UU19MT0NBVElPTiIsIlRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OIiwiU1RZTEVTSEVFVF9MT0NBVElPTiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIkVfUlVMRVNfTE9DQVRJT04iLCJQUk9EVUNUX0lORk9fTE9DQVRJT04iLCJMT0dfQVBJX1VSTCIsIkxPT0tVUF9BUElfVVJMIiwiTU9CSUxFX01FRElBX1FVRVJZIiwiU1BMSVRfUkFUSU8iLCJMQUJfUkFUSU8iLCJUUkVBVE1FTlRfUkFUSU8iLCJMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUyIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJTRVNTSU9OX1JFRkVSUkVSIiwiTUFUQ0hFRF9UUkVBVE1FTlRTIiwiTE9DQUxfU1RPUkFHRV9LRVlTIiwiVFJFQVRNRU5UUyIsIldFSUdIVFMiLCJFTElHSUJJTElUWV9SVUxFUyIsIkRFQlVHX01PREUiLCJPVVRfT0ZfU0NPUEUiLCJVU0VSX0lEIiwiREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRSIsIklTX0FETUlOIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwidGVzdGluZyIsIkRFQlVHIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFyZ3MiLCJjb25zb2xlIiwiaW5mbyIsImxvZyIsIm1lc3NhZ2VDb25maWciLCJmb3JFYWNoIiwiYXJndW1lbnQiLCJ0eXBlIiwid2FybiIsImVycm9yIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJsb2dnZXIiLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJ0b3AiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInN3aXRjaFRvRWFzZU91dCIsImNvbnRhaW5zIiwiZWwiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJwcmVwZW5kIiwiYWRkIiwiZmV0Y2hUcmVhdG1lbnRzIiwiZmV0Y2hQbHVzIiwidHJlYXRtZW50cyIsIkVycm9yIiwianNvbiIsImpzb25UcmVhdG1lbnQiLCJmYWlsZWQiLCJtZXNzYWdlIiwiZmV0Y2hUcmVhdG1lbnRXZWlnaHRzIiwidHJlYXRtZW50V2VpZ2h0cyIsImpzb25UcmVhdG1lbnRXZWlnaHRzIiwiZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzIiwiZWxpZ2liaWxpdHlSdWxlcyIsImpzb25FbGlnaWJpbGl0eVJ1bGVzIiwiZmV0Y2hQcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm9Kc29uIiwidGltZW91dCIsInRpbWUiLCJjb250cm9sbGVyIiwiQWJvcnRDb250cm9sbGVyIiwidGltZW91dElEIiwic2V0VGltZW91dCIsImFib3J0IiwidXJsIiwib3B0aW9ucyIsInJldHJpZXMiLCJmZXRjaCIsInNpZ25hbCIsInRoZW4iLCJyZXMiLCJvayIsImNsZWFyVGltZW91dCIsInN0YXR1cyIsImNhdGNoIiwiZXh0cmFjdENvb2tpZUlkZW50aWZpZXIiLCJjb29raWVTdHJpbmciLCJjb29raWVOYW1lIiwicGFyc2VkIiwic3BsaXQiLCJtYXAiLCJ2IiwicmVkdWNlIiwiYWNjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidHJpbSIsImlkZW50aWZpZXIiLCJpZGVudGlmaWVySW5kZXgiLCJkZXRlcm1pbmVQY3QiLCJub3ciLCJtb250aCIsImdldE1vbnRoIiwiaGFzaCIsImdldFVuc2VjdXJlSGFzaCIsInRvU3RyaW5nIiwicGN0IiwiZXhpdFNjcm9sbExpc3RlbmVyIiwiY2FsbEJhY2siLCJsb29wIiwic2Nyb2xsVG9wIiwibGFzdFNjcm9sbFRvcCIsImNsZWFySW50ZXJ2YWwiLCJleGl0U2Nyb2xsSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInN0eWxlQXBwbGljYXRvciIsImVsZW1lbnRzIiwic3R5bGVDaGFuZ2VzTWFwIiwiaSIsImVsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsdWUiLCJzdHlsZSIsImluamVjdFN0eWxlU2hlZXQiLCJzdHlsZVNoZWV0IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYnVzaW5lc3NSdWxlSWQiLCJkZWJ1Z01vZGUiLCJhY3Rpb25zIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidmFyaWFudCIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsImlkIiwia2V5cyIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJNYXRoIiwiZmxvb3IiLCJjaGVja0FjdGlvblNlbGVjdG9ycyIsInByZXBhcmVkQWN0aW9ucyIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInNlbGVjdG9yRmFsbGJhY2siLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uU3RvcmFnZSIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsInNldEl0ZW0iLCJwYXRobmFtZSIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJjdXJyZW50IiwiTnVtYmVyIiwiaXNOYU4iLCJnZXRHYUNsaWVudElkIiwiZ2EiLCJnZXRBbGwiLCJ0cmFja2VycyIsImdldCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiYWJzIiwiZ2V0UmFuZG9tSW50IiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJleHRyYWN0SWRlbnRpZmllckludGVydmFsIiwiZSIsImRlbGF5IiwibXMiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJkYXRlIiwicmVzdWx0Iiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwibWF0Y2giLCJ0b2RheSIsInN0YXJ0WWVhciIsImdldEZ1bGxZZWFyIiwiZW5kWWVhciIsImVzdGltYXRlZFN0YXJ0IiwiZXN0aW1hdGVkRW5kIiwic3RhcnREaWZmT3ZlckRheXMiLCJjZWlsIiwiZW5kRGlmZk92ZXJEYXlzIiwic3RhcnREaWZmT3ZlcldlZWtzIiwiZW5kRGlmZk92ZXJXZWVrcyIsImVyciIsImlkbGVUaW1lciIsInRpbWVPdXQiLCJyZXNldFRpbWVyIiwiaWRsZVRpbWVvdXQiLCJvbnRvdWNoc3RhcnQiLCJpc093bk11dGF0aW9uIiwibXV0YXRpb25MaXN0Iiwibm9kZXMiLCJBcnJheSIsImZyb20iLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm4iLCJ0YWdOYW1lIiwiYyIsInNldEFnZW50RGV0YWlscyIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYnIiLCJiTmFtZSIsImJWZXJzaW9uIiwib3MiLCJXaW5kb3dzIiwiTWFjIiwiTGludXgiLCJBbmRyb2lkIiwiaU9TIiwib3NWZXJzaW9uIiwib3NOYW1lIiwiaXNNb2JpbGUiLCJpc1N1cHBvcnRlZEJyb3dzZXIiLCJpc1N1cHBvcnRlZE9TIiwic2V0VVJMRGF0YSIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsInBhZ2VUeXBlIiwiaWRiUmVhZHkiLCJpc1NhZmFyaSIsInVzZXJBZ2VudERhdGEiLCJpbmRleGVkREIiLCJkYXRhYmFzZXMiLCJpbnRlcnZhbElkIiwidHJ5SWRiIiwiZmluYWxseSIsIkxTX1ByZWZpeCIsInVwZGF0ZUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lIiwiYmFzZUZlYXR1cmVWYWx1ZSIsInVwZGF0ZU1ldGhvZCIsImZlYXR1cmVLZXkiLCJvcEtleSIsInN0b3JhZ2UiLCJwYXJzZUZsb2F0IiwidmFsSGFzaCIsIm9wS2V5VmFsIiwib3BLZXlWYWxOYW1lIiwicXVlcnlJbkNvbGxlY3RvciIsInF1ZXJ5TWV0aG9kIiwibG9jYWxLZXlzIiwibG9jYWxLZXlzRmlsdGVyZWQiLCJmaWx0ZXIiLCJzdW0iLCJtYXhDb3VudCIsIm1heFZhbCIsInZhbCIsImJlYWdsZUluZm9MYXllciIsImEiLCJmIiwiX19od20iLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwibmFtZSIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsIm9iaiIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJwdXNoIiwibGlzdGVuZXJzIiwiaXNBcnJheSIsImdldEZyb21CZWFnbGVJbmZvTGF5ZXIiLCJibG9ja2luZyIsInBvbGxJbnRlcnZhbCIsIm9idGFpbkRhdGEiLCJqc29uR2V0Iiwic2VhcmNoRWxlbWVudCIsImlzRm91bmQiLCJpc0lnbm9yZSIsImludGVydmFsIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwidG9CZVVwZGF0ZWQiLCJjaGlsZCIsImNoaWxkRWxlbWVudHMiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJ0cmlnZ2VyUmVzdGFydCIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaW5uZXJUZXh0IiwiYXR0cmliVmFsdWVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInZhbHVlY2hpbGQiLCJhdHRyaWJWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInNldFZhbHVlIiwic3VtUHJpY2UiLCJjaGlsZFRleHQiLCJhcnJheUlubmVyVGV4dCIsImV4Y2x1c2l2ZUVsZW1lbnQiLCJjdXN0b21EYXRhRGVyaXZhdGlvbnMiLCJjdXJyZW50UGFnZVR5cGUiLCJhbGwiLCJpc0NhcnRFbXB0eSIsInRvdGFsQmFzZVByaWNlIiwiY291cG9uTm90QXBwbGljYWJsZSIsInByaWNlcyIsInF1YW50aXRpZXMiLCJ0b3RhbFByaWNlIiwiY291cG9uQXBwbGljYWJsZUFtb3VudCIsInNrdSIsInNrdUxpc3QiLCJwYXJzZVNlYXJjaFBhdGhzIiwiZG9tU3RhdHVzIiwicmVhZHlTdGF0ZSIsIndpbnRvcCIsImRhdGFMYXllciIsIndpbmRvYyIsImZvdW5kTmFtZXMiLCJTZXQiLCJwcmV2Rm91bmROYW1lcyIsIm5vdEZvdW5kTmFtZXMiLCJoYXMiLCJzZWFyY2hBbmRTZXQiLCJkYXRhTGF5ZXJJdGVtIiwic29yZ0FycmF5SW5uZXIiLCJnZXRTT1JHQXJyYXkiLCJzb3JnSXRlbSIsInNpemUiLCJqb2luIiwicGF0aCIsInBhdGhBcnJheSIsInN1YlBhdGgiLCJzbGljZSIsInN1YkFycmF5Iiwic3ViS2V5Iiwic3ViVmFsdWUiLCJ3aW5kb3dQdHIiLCJuYXZQdHIiLCJwbGF0Zm9ybSIsImRldmljZVBpeGVsUmF0aW8iLCJhdmFpbFdpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIndpbmRvd0RlcHRoIiwiY29sb3JEZXB0aCIsInBpeGVsRGVwdGgiLCJ2cG9ydFNoYXBlIiwidmlzdWFsVmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsInJvdW5kIiwib3JpZW50YXRpb25BbmdsZSIsIm9yaWVudGF0aW9uIiwiYW5nbGUiLCJ0ZW1wIiwiaGlzdG9yeSIsIm5hdkFnZW50IiwiYnJhbmRzIiwiYnJhbmQiLCJ2ZXJzaW9uIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsInZlbmRvciIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwicGVyZk1ldHJpY3MiLCJwZXJmTmF2aWdhdGlvbk1ldHJpY3MiLCJwZXJmb3JtYW5jZSIsImdldEVudHJpZXNCeVR5cGUiLCJjb25uZWN0IiwiY29ubmVjdEVuZCIsImNvbm5lY3RTdGFydCIsInJlcXVlc3QiLCJyZXNwb25zZUVuZCIsInJlcXVlc3RTdGFydCIsImRvbSIsImRvbUludGVyYWN0aXZlIiwiZG9tQ29tcGxldGUiLCJsb2FkIiwibG9hZEV2ZW50RW5kIiwibG9hZEV2ZW50U3RhcnQiLCJkdXJhdGlvbiIsInNjaGVtYU9yZ0VsdHMiLCJzb3JnQXJyYXkiLCJzVGFnIiwiY250bnQiLCJqc29uY29udGVudCIsIkhFQURFUlMiLCJNb25pdG9yIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaGlnaFdhdGVyTWFyayIsImluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMiLCJpbW1lZGlhdGUiLCJwYWNrQW5kUXVldWVNYWluTG9nIiwicGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2ciLCJwYWNrYWdlTWFpbkxvZ0RhdGEiLCJyZXF1ZXN0QmxvYiIsImNoZWNrRm9yTGF0ZXN0Q2hhbmdlcyIsInF1ZXVlTG9ncyIsImhhc0NoYW5nZWQiLCJwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhIiwibG9nRGF0YSIsInBhY2thZ2VBcnJpdmFsTG9nRGF0YSIsImh3bSIsImNvb2tpZUdhSWQiLCJ2aWV3X2Vwb2NoIiwiYm9keSIsImxjIiwidSIsIm9uSGFzaFBjdCIsIkJsb2IiLCJzdGFydHNXaXRoIiwicyIsIm0iLCJ2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbG9zZUV2ZW50IiwiY2FwdHVyZSIsInZpc2liaWxpdHlTdGF0ZSIsInNlbmRCZWFjb24iLCJxdWV1ZWQiLCJxdWV1ZUludGVydmFsIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsIkNQVCIsIm1hdGNoZWRUcmVhdG1lbnRzIiwibXQiLCJjaGVja1BhZ2VUeXBlIiwicGFnZVR5cGVzIiwidXNlclNlZ21lbnQiLCJ1c2VyU2VnbWVudFdlaWdodHMiLCJ0cmVhdG1lbnQiLCJzZWdtZW50ZWRXZWlnaHQiLCJnZXRNYXRjaGVkVHJlYXRtZW50cyIsInB0Iiwic3Vic3RyIiwidHJlYXRtZW50c09iaiIsInRpbWVzdGFtcCIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkSG91cnMiLCJ3ZWlnaHRzT2JqIiwid2VpZ2h0cyIsInJlcGxhY2VyIiwicmVwbGFjZUZuIiwiY3VycmVudFJlcGxhY2VGbiIsInJlcGxhY2VPYmplY3RFeHRyYWN0b3IiLCJyZXBsYWNlVmFsIiwicmVwbGFjZUZuRXhlY3V0b3IiLCJyRm4iLCJzaW5nbGUiLCJyZXBsYWNlRnVuY3Rpb24iLCJGdW5jdGlvbiIsImtleUZhbGxiYWNrIiwiY29uZmlnIiwiZGJOYW1lIiwic3RvcmUiLCJpbmRleGVzIiwiZmllbGRzIiwia2V5UGF0aCIsIm9wZW5EQiIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJpbml0IiwidXBncmFkZSIsImRiIiwib2xkVmVyc2lvbiIsImRlbGV0ZU9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJpZHgiLCJjcmVhdGVJbmRleCIsInJlamVjdCIsInJlYWR3cml0ZSIsImdldERCIiwidHJhbnNhY3Rpb24iLCJwYXlsb2FkIiwiZ2V0U3RvcmUiLCJzYXZlUHJvbWlzZXMiLCJwdXQiLCJjbGVhciIsImNvdW50Iiwib3BlbkN1cnNvciIsImN1cnNvciIsImV4aXN0aW5nUHJvZEluZm8iLCJnZXRDdXJzb3IiLCJlbGFwc2VkU2Vjb25kcyIsInByb2R1Y3RJbmZvUHJvbWlzZSIsImNsZWFyUHJvbWlzZSIsInByb2R1Y3RJbmZvQXJyYXkiLCJzYXZlIiwicHJlcGFyZVBheWxvYWRzIiwicGF5bG9hZHMiLCJmaWVsZE5hbWVzIiwic2hpZnQiLCJTdG9yZSIsImluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwib3BlcmF0b3IiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwibWRDb25kaXRpb24iLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJwVHlwZSIsInByb2R1Y3RJbmZvU3RvcmFnZSIsIiQiLCJtYyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiYmVmb3JlIiwiYWZ0ZXIiLCJhcHBlbmQiLCJvZmYiLCJjcmVhdGVQb3B1cCIsImVsbSIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3BsYXlNb2RhbCIsImdldFByb2R1Y3RJbmZvIiwiZXZlbnQiLCJkaXNwbGF5UG9wdXAiLCJyIiwiZCIsInB1c2hTdGF0ZSIsInN0YXRlIiwib25jZSIsInRleHQiLCJodG1sIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm9yaWdpbmFsVGl0bGUiLCJ0aXRsZSIsImhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic2NyaXB0SUQiLCJnZXRFbGVtZW50QnlJZCIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwic2VudGVuY2UiLCJ3b3JkIiwiY2hhckF0IiwidG9Mb2NhbGVVcHBlckNhc2UiLCJwcmVwYXJlRmluYWxUaXRsZSIsImZpbmFsVGl0bGUiLCJjb250ZW50cyIsIm5vZGVUeXBlIiwibm9kZVZhbHVlIiwicHJlcGFyZURlc2NFbG0iLCJkZXNjcmlwdGlvbkVsbSIsIm1hcmtldGluZ0NvcHkiLCJ1cGRhdGVkSHRtbFN0cmluZyIsInJlcGxhY2VXaXRoVmFsIiwidGl0bGVBdWdtZW50IiwiaHRtbFN0ciIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJoaWRlIiwicVBvcHVwIiwiaXNNb2RhbCIsInBvcHVwV3JhcHBlciIsInBvcHVwQ2xvc2VCdXR0b24iLCJwb3B1cENsb3NlQnV0dG9uU3R5bGUiLCJvbmNsaWNrIiwic3JjIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJwb3B1cCIsImNvbnRlbnQiLCJmaXJzdENoaWxkIiwicDEiLCJwYXJlbnROb2RlIiwicDIiLCJpMSIsImkyIiwiaXNFcXVhbE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJ3YWl0Rm9ySlF1ZXJ5IiwialF1ZXJ5IiwialF1ZXJ5SW50ZXJ2YWwiLCJhY3Rpb25BcHBsaWNhdG9yIiwiZWxpZ2libGVFbGVtZW50cyIsImNoZWNrQWN0aW9uQ29uZGl0aW9uIiwiYXR0cmlidXRlIiwiaW5uZXJfY29uZGl0aW9uIiwiY2hhaW4iLCJjb25kaXRpb25FbGVtZW50cyIsImFjdGlvbkNvbmRpdGlvbkNoZWNrZXIiLCJlbGVtZW50U2t1IiwiZm4iLCJNdXRleCIsIk9CU0VSVkVSX0NPTkZJRyIsImF0dHJpYnV0ZXMiLCJSb2JvdEVuZ2luZSIsImRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzIiwiaXNPbiIsImVuZ2FnZW1lbnRMb2NrIiwicmVBcHBseVRyZWF0bWVudHNNYXAiLCJhZGRlZERhdGFMaXN0ZW5lcklkcyIsInJvYm90UHJvbWlzZXMiLCJlbmdhZ2VSb2JvdCIsImluaXRpYXRlUmVhcHBseVJvYm90TWFwIiwiZWxpZ2liaWxpdHlSdWxlU2V0IiwiZGV2aWNlIiwiYnVzaW5lc3NSdWxlU2V0IiwiaGVscGVycyIsImFwcGx5IiwiYWNxdWlyZSIsInJlbGVhc2UiLCJjaGVja0VsaWdpYmlsaXR5UnVsZVNldCIsInRyZWF0bWVudFNraXBSYXRpbyIsImRldGVybWluaW5nSWRlbnRpZmllciIsInRyZWF0bWVudFBjdCIsImNoZWNrQnVzaW5lc3NSdWxlcyIsImlzRWxpZ2libGUiLCJlbmdhZ2VIZWxwZXJzIiwiYWRkUmVhcHBseUV2ZW50IiwiYWRkUnVsZVNldERhdGFMaXN0ZW5lcnMiLCJoZWxwZXJSb2JvdFByb21pc2VzIiwiY2hlY2siLCJyZWFwcGx5X2V2ZW50IiwicmVhcHBseV9ldmVudF9wYWdlX3R5cGUiLCJyZWFwcGx5X2V2ZW50X2FycmF5IiwicmVhcHBseUV2ZW50IiwicHJldmlvdXNWYWx1ZSIsInRyZWF0bWVudElkcyIsInJlQXBwbHlUcmVhdG1lbnRzIiwidCIsIlJlc2l6ZU9ic2VydmVyIiwicmVhcHBseVNlbGVjdG9yTGlzdCIsInJlYXBwbHlfc2VsZWN0b3IiLCJsYXN0U2Nyb2xsVGltZSIsImdldFRpbWUiLCJzdCIsInBhZ2VZT2Zmc2V0IiwicmVhcHBseUludGVydmFsIiwiYXBwbGllZCIsImJvdW5kRW5nYWdlVHJlYXRtZW50IiwiYmluZCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJydWxlU2V0IiwicHJldmlvdXNTZWxlY3RvcnMiLCJydWxlIiwic2V0IiwiZWxpZ2liaWxpdHlSdWxlIiwib3Bwb3NpdGVGbGFnIiwiZWxpZ2liaWxpdHlTY29wZSIsImVsaWdpYmlsaXR5TmFtZSIsImVsaWdpYmlsaXR5U2V0VHlwZSIsInByZXZpb3VzSXNFbGlnaWJsZSIsImNoZWNrRWxpZ2liaWxpdHkiLCJidXNpbmVzc1J1bGUiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJtYWluU2VsZWN0b3IiLCJ0ZW1wVmFsIiwicmV0dXJuVmFsIiwiZWxlbSIsImVsZW1lbnRTdHlsZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwiY2hlY2tGdW5jdGlvblJ1bGUiLCJydWxlRnVuY3Rpb24iLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiY2hlY2tQcm9kdWN0SW5mb1J1bGUiLCJnZXRUcmFuc2FjdGlvbkNvdW50IiwiZ2V0QWRkVG9DYXJ0Q291bnQiLCJnZXRQcmV2aWV3Q291bnQiLCJnZXRUaXRsZSIsImdldERlc2NyaXB0aW9uIiwiZ2V0RnJvbURCIiwiUnVsZUVuZ2luZSIsImJhc2VSdWxlU2V0IiwiYWRkZWREYXRhTGlzdGVuZXJzIiwibXV0ZXgiLCJjaGVja1J1bGUiLCJydWxlU2F0aXNmaWVkIiwiY2hhaW5fY29uZGl0aW9uIiwia2V5UHJvbWlzZXNNYXAiLCJydWxlcyIsInJ1bGVQcm9taXNlcyIsInNhdGlzZmllZFJ1bGVJZHMiLCJzZXRVcExpc3RlbmVycyIsImZpbHRlcmVkIiwiayIsImV4dHJhY3RSdWxlQXR0cmlidXRlcyIsImRhdGFMYXllclJ1bGVzIiwiZWxlbWVudFJ1bGVzIiwiYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsImFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImJhc2VSdWxlIiwiZWxpZ2liaWxpdHlSdWxlc09iaiIsImJlYWdsZU9uIiwiZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UiLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXMiLCJ0cmVhdG1lbnRzUHJvbWlzZSIsImdldFRyZWF0bWVudHMiLCJzZWFyY2hQYXJhbXMiLCJsYXN0SW5kZXhPZiIsIml0ZW0iLCJ0cmVhdG1lbnRSZXBvc2l0b3J5IiwicHJvZHVjdEluZm9EQiIsInBlcnNpc3RQcm9kdWN0SW5mbyIsInJvYm90RW5naW5lIiwiZW5nYWdlUm9ib3RzIiwiZ2V0RWxpZ2liaWxpdHlSdWxlcyIsInJ1bGVFbmdpbmUiLCJjb21wdXRlU2VnbWVudCIsInNlZ21lbnQiLCJzZWdtZW50UnVsZUVuZ2luZSIsImNoZWNrUnVsZXMiLCJTSFVURE9XTiIsIm1vbml0b3IiLCJlYXJseUxvZ1NlbnQiLCJjb29raWVQY3QiLCJwYWNrQW5kUXVldWVBcnJpdmFsTG9nIiwidHJlYXRtZW50V2VpZ2h0c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRXZWlnaHRzIiwib29zQnJlYWsiLCJTdHJpbmciLCJwcm90b3R5cGUiLCJwYWRTdGFydCIsIkdMT1ZfT04iLCJwcm9jZXNzQWRtaW5Vc2VyIiwiaXNBZG1pbiIsImlzQ2hhbXAiLCJzZW5kTG9ncyJdLCJzb3VyY2VSb290IjoiIn0=
