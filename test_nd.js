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
        var res;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return BeagleApplyActions(preparedActions);
              case 2:
                res = _context5.sent;
                if (res === true) {
                  addTreatment(id, businessRuleId, variant, "applied");
                } else if (res === false) {
                  addTreatment(id, businessRuleId, variant, "failed");
                }
              case 4:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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QUE7VUFFaEI7VUFDQUMsT0FBTyxDQUFDYyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQUM7VUFFMUJiLFlBQVksR0FBRyxJQUFJOztVQUVuQjtVQUNBNXdCLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQztVQUFDLE1BRTdDd29CLElBQUksS0FBSyxJQUFJLElBQUlBLElBQUksS0FBSzFnQixTQUFTO1lBQUE7WUFBQTtVQUFBO1VBQUEsTUFDL0IsSUFBSTNHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFBQTtVQUFBLEtBQ2pCdXZCLFFBQVE7WUFBQTtZQUFBO1VBQUE7VUFBQSxNQUNYLElBQUl2dkIsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUFBO1VBQUE7VUFBQSxPQUUxQm91QixRQUFRLENBQUN6ckIsVUFBVSxFQUFFb0MsU0FBUyxFQUFFdUgsUUFBUSxFQUFFaE0sZ0JBQWdCLEVBQUUrbUIsSUFBSSxDQUFDO1FBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtVQUFBO1VBR3pFdm9CLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFlBQUl5QixPQUFPLENBQUM7VUFDOUN2QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsWUFBSXVCLE9BQU8sQ0FBQztVQUN0QyxJQUFJLENBQUNxdkIsWUFBWSxJQUFJRCxPQUFPLEVBQUVBLE9BQU8sQ0FBQ2MsUUFBUSxDQUFDLEtBQUssQ0FBQztVQUNyRHR4QixrQkFBa0IsRUFBRTtRQUFDO1FBQUE7VUFBQTtNQUFBO0lBQUE7RUFBQTtBQUFBLENBRXhCLElBQUcsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJvcGVydHlLZXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL3N0cmluZ1V0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvbG9nZ2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL2NvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL3JlcGxhY2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvd3JhcC1pZGItdmFsdWUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL2FzeW5jLW11dGV4L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9kYXRhTGF5ZXJDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbGVtZW50Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZnVuY3Rpb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9zZXNzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvdXJsQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZW52Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU9uL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi90eXBlb2YuanNcIilbXCJkZWZhdWx0XCJdO1xuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7IC8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzO1xuICB2YXIgZXhwb3J0cyA9IHt9LFxuICAgIE9wID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAob2JqLCBrZXksIGRlc2MpIHtcbiAgICAgIG9ialtrZXldID0gZGVzYy52YWx1ZTtcbiAgICB9LFxuICAgICRTeW1ib2wgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LFxuICAgIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIixcbiAgICBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCIsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgd3JpdGFibGU6ICEwXG4gICAgfSksIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3IsXG4gICAgICBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSksXG4gICAgICBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShnZW5lcmF0b3IsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KVxuICAgIH0pLCBnZW5lcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkgJiYgKEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUpO1xuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAoXCJ0aHJvd1wiICE9PSByZWNvcmQudHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZyxcbiAgICAgICAgICB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIFwib2JqZWN0XCIgPT0gX3R5cGVvZih2YWx1ZSkgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICBpZiAoXCJjb21wbGV0ZWRcIiA9PT0gc3RhdGUpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwibmV4dFwiID09PSBjb250ZXh0Lm1ldGhvZCkgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO2Vsc2UgaWYgKFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHtcbiAgICAgICAgICBpZiAoXCJzdXNwZW5kZWRTdGFydFwiID09PSBzdGF0ZSkgdGhyb3cgc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0LmFyZztcbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIFwicmV0dXJuXCIgPT09IGNvbnRleHQubWV0aG9kICYmIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgc3RhdGUgPSBcImV4ZWN1dGluZ1wiO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSAmJiAoc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kLFxuICAgICAgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKHVuZGVmaW5lZCA9PT0gbWV0aG9kKSByZXR1cm4gY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbWV0aG9kTmFtZSAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSAmJiAoY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCksIFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHx8IFwicmV0dXJuXCIgIT09IG1ldGhvZE5hbWUgJiYgKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICdcIiArIG1ldGhvZE5hbWUgKyBcIicgbWV0aG9kXCIpKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZywgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgIHJldHVybiBpbmZvID8gaW5mby5kb25lID8gKGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlLCBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jLCBcInJldHVyblwiICE9PSBjb250ZXh0Lm1ldGhvZCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpO1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcbiAgICAxIGluIGxvY3MgJiYgKGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXSksIDIgaW4gbG9jcyAmJiAoZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl0sIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiLCBkZWxldGUgcmVjb3JkLmFyZywgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaXRlcmFibGUubmV4dCkgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBmb3IgKDsgKytpIDwgaXRlcmFibGUubGVuZ3RoOykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzLnJldmVyc2UoKSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGZvciAoOyBrZXlzLmxlbmd0aDspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSByZXR1cm4gbmV4dC52YWx1ZSA9IGtleSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgfTtcbiAgfSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IFwidGhyb3dcIiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXSxcbiAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKSxcbiAgICAgICAgICAgIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbmFsbHlFbnRyeSAmJiAoXCJicmVha1wiID09PSB0eXBlIHx8IFwiY29udGludWVcIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTtcbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gdHlwZSwgcmVjb3JkLmFyZyA9IGFyZywgZmluYWxseUVudHJ5ID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIHJldHVybiBcImJyZWFrXCIgPT09IHJlY29yZC50eXBlIHx8IFwiY29udGludWVcIiA9PT0gcmVjb3JkLnR5cGUgPyB0aGlzLm5leHQgPSByZWNvcmQuYXJnIDogXCJyZXR1cm5cIiA9PT0gcmVjb3JkLnR5cGUgPyAodGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnLCB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCIsIHRoaXMubmV4dCA9IFwiZW5kXCIpIDogXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUgJiYgYWZ0ZXJMb2MgJiYgKHRoaXMubmV4dCA9IGFmdGVyTG9jKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykgcmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpLCByZXNldFRyeUVudHJ5KGVudHJ5KSwgQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbm1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG9iaik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvLyBUT0RPKEJhYmVsIDgpOiBSZW1vdmUgdGhpcyBmaWxlLlxuXG52YXIgcnVudGltZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZVwiKSgpO1xubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuXG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PVxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgY29uc3QgcmVwbGFjZUFsbCA9IChzdHIsIGZpbmQsIHJlcGxhY2UgPSBcIlwiKSA9PiB7XG4gIGlmICghc3RyKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICBpZiAoaW5kZXggPCAwKSByZXR1cm4gc3RyO1xuXG4gIHdoaWxlIChzdHIuaW5kZXhPZihmaW5kKSA+PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgICBzdHIgPSAoaW5kZXggPiAwID8gc3RyLnN1YnN0cmluZygwLCBpbmRleCkgOiBcIlwiKSArIHJlcGxhY2UgKyBzdHIuc3Vic3RyaW5nKGluZGV4ICsgZmluZC5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJraXNoVG9Mb3dlciA9IChzdHIpID0+IHtcbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcbiAgbGV0IHN0cmluZyA9IHN0cjtcbiAgY29uc3QgbGV0dGVycyA9IHtcIsSwXCI6IFwiaVwiLCBcIklcIjogXCLEsVwiLCBcIsWeXCI6IFwixZ9cIiwgXCLEnlwiOiBcIsSfXCIsIFwiw5xcIjogXCLDvFwiLCBcIsOWXCI6IFwiw7ZcIiwgXCLDh1wiOiBcIsOnXCJ9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKChbxLBJxZ7EnsOcw4fDll0pKS9nLCBmdW5jdGlvbihsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyc1tsZXR0ZXJdO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4vc3RyaW5nVXRpbHNcIjtcbmNvbnN0IGlzU3RhZ2luZyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcInN0YWdpbmcudml2ZW5zZVwiKSA6IHRydWU7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIwLjAuNDAuOVwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50cy5qc29uXCI7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTVFlMRVNIRUVUX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlc19zdGFnaW5nLmNzc1wiIDogYGh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzLmNzcz9pZD0ke3JlcGxhY2VBbGwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMykucmVwbGFjZShcIlRcIiwgXCJcIiksIFwiLVwiLCBcIlwiKX1gO1xuZXhwb3J0IGNvbnN0IEVfUlVMRVNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvZWxpZ2liaWxpdHlfcnVsZXMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFBST0RVQ1RfSU5GT19MT0NBVElPTiA9IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9zb2NpYWwtcHJvb2YtdjIuanNvblwiO1xuZXhwb3J0IGNvbnN0IExPR19BUElfVVJMID0gXCJodHRwczovL2V1cm9wZS13ZXN0My1uZXh0ZGF5LTM0ZWIzLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvbG9nXCI7XG5leHBvcnQgY29uc3QgTE9PS1VQX0FQSV9VUkwgPSBcImh0dHBzOi8vY2F0YWxvZy1hcGkuYWRvcmFhaS5jb21cIjtcbmV4cG9ydCBjb25zdCBNT0JJTEVfTUVESUFfUVVFUlkgPSBcIihtYXgtd2lkdGg6IDQ0MHB4KVwiO1xuLy8gQ29udHJvbCBncm91cCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgU1BMSVRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBMQUJfUkFUSU8gPSAyMDtcbi8vIFNraXBwZWQgdHJlYXRtZW50IHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUyA9IDI7XG5leHBvcnQgY29uc3QgTElTVF9NT0RFX0JFQUdMRV9LRVlTID0gW1wicGFnZXR5cGVcIiwgXCJjYXRlZ29yeVwiLCBcImFsbHRpbWVQTFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUExQQ2F0ZWdvcnlNb2RlXCIsXG4gIFwiYWxsdGltZVBEUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QRFBDYXRlZ29yeU1vZGVcIiwgXCJhbGx0aW1lQ2FydENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25DYXJ0Q2F0ZWdvcnlNb2RlXCJdO1xuZXhwb3J0IGNvbnN0IElETEVfVElNRU9VVCA9IDE1MDAwO1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTl9TVE9SQUdFX0tFWVMgPSB7XG4gIFNFU1NJT05fVElNRVNUQU1QOiBcIkJHX1Nlc3Npb25UaW1lc3RhbXBcIixcbiAgU0VTU0lPTl9ISVNUT1JZOiBcIkJHX1Nlc3Npb25IaXN0b3J5XCIsXG4gIFBPUFVQX0RJU1BMQVlfRkxBRzogXCJCR19Qb3B1cERpc3BsYXlGbGFnXCIsXG4gIFNLVV9JTkZPX0JBU0tFVDogXCJCR19Qcm9kdWN0SW5mb0Jhc2tldFwiLFxuICBTRVNTSU9OX1JFRkVSUkVSOiBcIkJHX1Nlc3Npb25SZWZlcnJlclwiLFxuICBNQVRDSEVEX1RSRUFUTUVOVFM6IFwiR0xWX01hdGNoZWRcIixcbn07XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlTID0ge1xuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgV0VJR0hUUzogXCJCR19XZWlnaHRzXCIsXG4gIEVMSUdJQklMSVRZX1JVTEVTOiBcIkJHX0VfUnVsZXNcIixcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBPVVRfT0ZfU0NPUEU6IFwiR0xWX091dE9mU2NvcGVfMDBcIixcbiAgVVNFUl9JRDogXCJCR19Vc2VySWRfMDFcIixcbiAgREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRTogXCJCR19Db2xsZWN0aW9uRGF0YVNpemVcIixcbiAgSVNfQURNSU46IFwiR0xWX0lzQWRtaW5cIixcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fU1RPUkFHRV9QUkVGSVggPSBcIkJHX1NlZ19cIjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpbiA9IFwiQmVhZ2xlIENsaWVudCBTREtcIiwgdGVzdGluZyA9IGZhbHNlKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgIHRoaXMuREVCVUcgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkRFQlVHID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5ERUJVR19NT0RFKTtcbiAgICB9XG4gIH1cblxuICBpbmZvKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5pbmZvKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmIChERUJVRykge1xuICAgICAgY29uc29sZS5sb2coYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgZmFpbGVkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogcmVkXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgc3VjY2VzcyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IGdyZWVuXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUud2FybihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5lcnJvcihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBudWxsID09IGFyciA/IG51bGwgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBTeW1ib2wgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKG51bGwgIT0gX2kpIHtcbiAgICB2YXIgX3MsXG4gICAgICBfZSxcbiAgICAgIF94LFxuICAgICAgX3IsXG4gICAgICBfYXJyID0gW10sXG4gICAgICBfbiA9ICEwLFxuICAgICAgX2QgPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKF94ID0gKF9pID0gX2kuY2FsbChhcnIpKS5uZXh0LCAwID09PSBpKSB7XG4gICAgICAgIGlmIChPYmplY3QoX2kpICE9PSBfaSkgcmV0dXJuO1xuICAgICAgICBfbiA9ICExO1xuICAgICAgfSBlbHNlIGZvciAoOyAhKF9uID0gKF9zID0gX3guY2FsbChfaSkpLmRvbmUpICYmIChfYXJyLnB1c2goX3MudmFsdWUpLCBfYXJyLmxlbmd0aCAhPT0gaSk7IF9uID0gITApIHtcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSAhMCwgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgbnVsbCAhPSBfaVtcInJldHVyblwiXSAmJiAoX3IgPSBfaVtcInJldHVyblwiXSgpLCBPYmplY3QoX3IpICE9PSBfcikpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYXJyO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVdGlsc1wiKTtcbmNvbnN0IG1vbnRocyA9IHtcbiAgXCJvY2FrXCI6IDAsXG4gIFwixZ91YmF0XCI6IDEsXG4gIFwibWFydFwiOiAyLFxuICBcIm5pc2FuXCI6IDMsXG4gIFwibWF5xLFzXCI6IDQsXG4gIFwiaGF6aXJhblwiOiA1LFxuICBcInRlbW11elwiOiA2LFxuICBcImHEn3VzdG9zXCI6IDcsXG4gIFwiZXlsw7xsXCI6IDgsXG4gIFwiZWtpbVwiOiA5LFxuICBcImthc8SxbVwiOiAxMCxcbiAgXCJhcmFsxLFrXCI6IDExLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50SGlkZSA9ICgpID0+IHtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtZWFzZVwiKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUb0Vhc2VPdXQgPSBhc3luYyAoKSA9PiB7XG4gIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1oaWRlXCIpKSByZXR1cm47XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBlbC50ZXh0Q29udGVudCA9IGAuZ2xvdi1lYXNlIHtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1vLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1zLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgfVxuICBcbiAgQGtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4xMDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNTAlIHsgb3BhY2l0eTogMC4yNTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgNzUlIHsgb3BhY2l0eTogMC41MDsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgOTAlIHsgb3BhY2l0eTogMC43NTsgZmlsdGVyOiBncmF5c2NhbGUoMTAwJSl9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IGZpbHRlcjogZ3JheXNjYWxlKDAlKTt9XG4gIH1cbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNtb290aCB7XG4gICAgMCUgeyBvcGFjaXR5OiAwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAyNSUgeyBvcGFjaXR5OiAwLjEwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA1MCUgeyBvcGFjaXR5OiAwLjI1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA3NSUgeyBvcGFjaXR5OiAwLjUwOyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICA5MCUgeyBvcGFjaXR5OiAwLjc1OyAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDEwMCUpO31cbiAgICAxMDAlIHsgb3BhY2l0eTogMTsgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgwJSk7fVxuICB9YDtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucHJlcGVuZChlbCk7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50IHdlaWdodHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hQbHVzKEVfUlVMRVNfTE9DQVRJT04pO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlcykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2hQbHVzKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Kc29uID0gYXdhaXQgcHJvZHVjdEluZm8uanNvbigpO1xuICAgIHJldHVybiBwcm9kdWN0SW5mb0pzb247XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggcHJvZHVjdCBpbmZvXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgdGltZW91dCA9ICh0aW1lKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lKTtcbiAgcmV0dXJuIHtjb250cm9sbGVyLCB0aW1lb3V0SUR9O1xufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT4ge1xuICBjb25zdCB7Y29udHJvbGxlciwgdGltZW91dElEfSA9IHRpbWVvdXQoNTAwMCk7XG4gIHJldHVybiBmZXRjaCh1cmwsIHsuLi5vcHRpb25zLCBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLnN0YXR1cyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAocmV0cmllcyA+IDApIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggdGltZWQgb3V0IFJldHJ5aW5nLi4uOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggZmFpbGVkOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDb29raWVJZGVudGlmaWVyID0gKGNvb2tpZVN0cmluZywgY29va2llTmFtZSkgPT4ge1xuICBpZiAoIWNvb2tpZVN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gY29va2llU3RyaW5nXG4gICAgICAuc3BsaXQoXCI7XCIpXG4gICAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiPVwiKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICBpZiAodlswXSAmJiB2WzFdKSB7XG4gICAgICAgICAgYWNjW2RlY29kZVVSSUNvbXBvbmVudCh2WzBdLnRyaW0oKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZbMV0udHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gIGxldCBpZGVudGlmaWVyID0gcGFyc2VkW2Nvb2tpZU5hbWVdO1xuICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29va2llTmFtZSA9PT0gXCJfZ2FcIikge1xuICAgIC8vIGV4dHJhY3QgdW5pcXVlIGlkZW50aWZpZXIgZnJvbSBHQSBjb29raWVcbiAgICBjb25zdCBpZGVudGlmaWVySW5kZXggPSAyO1xuICAgIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyLnNwbGl0KFwiLlwiKVtpZGVudGlmaWVySW5kZXhdO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZVBjdCA9IGFzeW5jIChpZGVudGlmaWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggb2YgeWVhciB0byBoYXNoIHRvIHJlc2V0IGl0IGV2ZXJ5IG1vbnRoXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG5vdy5nZXRNb250aCgpO1xuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcittb250aC50b1N0cmluZygpKTtcblxuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWN0aW9uc1RvUHJlcGFyZSkpO1xuICBsZXQgdmFyaWFudCA9IG51bGw7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7YnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zLCB2YXJpYW50c30gPSBhY3Rpb247XG4gICAgaWYgKCFidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMgJiYgIXZhcmlhbnRzKSBjb250aW51ZTtcbiAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhcmlhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpbmRleCwgdmFyaWFudEtleV0gb2YgT2JqZWN0LmtleXModmFyaWFudHMpLmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAoZGVidWdNb2RlICYmICFhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IE1hdGguZmxvb3IoMTAwIC8gT2JqZWN0LmtleXModmFyaWFudHMpLmxlbmd0aCkgKiAoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzID0gKCkgPT4ge1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHLCBTRVNTSU9OX1RJTUVTVEFNUCwgU0VTU0lPTl9ISVNUT1JZfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHBvcHVwRGlzcGxheUZsYWcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRyk7XG4gIGNvbnN0IHNlc3Npb25UaW1lc3RhbXAgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QKTtcbiAgY29uc3Qgc2Vzc2lvbkhpc3RvcnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fSElTVE9SWSk7XG5cbiAgaWYgKHBvcHVwRGlzcGxheUZsYWcgPT09IG51bGwpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMCk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uVGltZXN0YW1wKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCwgRGF0ZS5ub3coKSk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uSGlzdG9yeSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXSk7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHNlc3Npb25IaXN0b3J5XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb25kaXRpb25DaGVja2VyID0gKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSBcIm5vdEV4aXN0XCIpIHtcbiAgICBpZiAoIXJ1blRpbWVWYWx1ZSkge1xuICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fFxuICAgIHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZGl0aW9uID09PSBudWxsIHx8XG4gICAgY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogcnVuVGltZVZhbHVlIG9yIGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICBjYXNlIFwiZXhpc3RcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiaW5jbHVkZXNcIjpcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEluY2x1ZGVzXCI6XG4gICAgY2FzZSBcIm5vdENvbnRhaW5zXCI6XG4gICAgICBpZiAoIXJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90RXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlclRoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPiB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc1RoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlckVxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc0VxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiYmV0d2VlblwiOiB7XG4gICAgICBsZXQgW21pbiwgbWF4XSA9IHZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSBtaW4gJiYgcnVuVGltZVZhbHVlIDw9IG1heCkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYXNlIFwicmVnZXhcIjoge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIik7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChydW5UaW1lVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZCBcIiwgY29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERlYnVnTW9kZSA9IChvb3NSZWFzb24pID0+IHtcbiAgY29uc3Qge0RFQlVHX01PREUsIE9VVF9PRl9TQ09QRX0gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9XCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKE9VVF9PRl9TQ09QRSwgb29zUmVhc29uKTtcbiAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0xXCIpKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTJcIikpIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAyKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9LTFcIikpIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAtMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0wXCIpKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICBjb25zdCBjdXJyZW50ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKERFQlVHX01PREUpKTtcbiAgaWYgKE51bWJlci5pc05hTihjdXJyZW50KSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgIHJldHVybiAwO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gIHJldHVybiBjdXJyZW50O1xufTtcblxuLy8gZ2V0IEdBIGNsaWVudCBpZCB1c2luZyBnYS5nZXRBbGwoKVxuZXhwb3J0IGNvbnN0IGdldEdhQ2xpZW50SWQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhID0gd2luZG93LmdhO1xuICAvLyBpZiBnYSBhbmQgZ2EuZ2V0QWxsKCkgaXMgbm90IGRlZmluZWQsIHJldHVybiBudWxsXG4gIGlmIChnYSAmJiBnYS5nZXRBbGwpIHtcbiAgICBjb25zdCB0cmFja2VycyA9IGdhLmdldEFsbCgpO1xuICAgIGlmICh0cmFja2VycyAmJiB0cmFja2Vycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cmFja2Vyc1swXS5nZXQoXCJjbGllbnRJZFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBnZXQgZGV0ZXJtaW5pc3RpYyBudW1lcmljIGhhc2ggZnJvbSBzdHJpbmcgdGhhdCBjb250YWlucyBvbmx5IG51bWJlcnNcbmV4cG9ydCBjb25zdCBnZXRVbnNlY3VyZUhhc2ggPSAoc3RyKSA9PiB7XG4gIC8vIHN0YXJ0IHdpdGggYSBtYWdpYyBudW1iZXIsIHVzZSBwaSBkaWdpdHNcbiAgbGV0IGhhc2ggPSAzMTQxNTkyNjU7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gbWFrZSBpdCBzdHJpbmdcbiAgICBzdHIgPSBzdHIudG9TdHJpbmcoKTtcbiAgfVxuICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICB9XG4gIC8vIHJldHVybiBhYnNvbHV0ZSB2YWx1ZVxuICByZXR1cm4gTWF0aC5hYnMoaGFzaCk7XG59O1xuXG4vLyBnZW5lcmF0ZSBhIDMyLWJpdCByYW5kb20gaW50ZWdlclxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKTtcbn07XG5cbi8vIGdldCBjdXJyZW50IHVuaXggZXBvY2ggdGltZSBpbiBzZWNvbmRzXG5leHBvcnQgY29uc3QgZ2V0VW5peFRpbWUgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldElkZW50aWZpZXIgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gbG9jYWwgc3RvcmFnZVwiLCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhIGluIGZpcnN0IGF0dGVtcHRcIiwgaWQpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhXCIsIGlkKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTApO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IHJlYWQgR0EgY2xpZW50IGlkXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBpbiBnZXRJZGVudGlmaWVyXCIsIGUpO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzKSA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERlbGl2ZXJ5RGF0ZSA9IChkYXRlKSA9PiB7XG4gIGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGRhdGU7XG5cbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHN0YXJ0TW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIGVuZE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBzdGFydERheTogdW5kZWZpbmVkLFxuICAgIGVuZERheTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGxldCBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspLShbXFxcXGRdKylcXFxccz8oW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSA0KSB7XG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFszXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKyktKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5sZW5ndGggIT09IDUpIHJldHVybiBkYXRlO1xuXG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbMl0udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFs0XS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCFyZXN1bHQuc3RhcnRNb250aEluZGV4IHx8ICFyZXN1bHQuZW5kTW9udGhJbmRleCkgcmV0dXJuIGRhdGU7XG5cbiAgICBjb25zdCBzdGFydFllYXIgPSByZXN1bHQuc3RhcnRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG4gICAgY29uc3QgZW5kWWVhciA9IHJlc3VsdC5lbmRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG5cbiAgICBjb25zdCBlc3RpbWF0ZWRTdGFydCA9IG5ldyBEYXRlKHN0YXJ0WWVhciwgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCwgcmVzdWx0LnN0YXJ0RGF5KTtcbiAgICBjb25zdCBlc3RpbWF0ZWRFbmQgPSBuZXcgRGF0ZShlbmRZZWFyLCByZXN1bHQuZW5kTW9udGhJbmRleCwgcmVzdWx0LmVuZERheSk7XG5cblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZFN0YXJ0IC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICBjb25zdCBlbmREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkRW5kIC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJXZWVrcyA9IHN0YXJ0RGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoc3RhcnREaWZmT3ZlckRheXMgLyA3KTtcbiAgICBjb25zdCBlbmREaWZmT3ZlcldlZWtzID0gZW5kRGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoZW5kRGlmZk92ZXJEYXlzIC8gNyk7XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPT09IDApIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gLSAke2VuZERpZmZPdmVyRGF5c30gR8O8bmA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID49IDEpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gR8O8biAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IGVuZERpZmZPdmVyV2Vla3MpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlkbGVUaW1lciA9IGFzeW5jICh0aW1lT3V0LCBjYWxsQmFjaykgPT4ge1xuICBsZXQgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcblxuICB3aW5kb3cudG9wLmRvY3VtZW50Lm9udG91Y2hzdGFydCA9IHJlc2V0VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcbiAgICBjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXQpO1xuICAgIGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpc093bk11dGF0aW9uID0gKG11dGF0aW9uTGlzdCkgPT4ge1xuICBjb25zdCBub2RlcyA9IFsuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0ucmVtb3ZlZE5vZGVzKV07XG4gIHJldHVybiBub2Rlcy5zb21lKChuKSA9PiB7XG4gICAgcmV0dXJuIG4udGFnTmFtZSAmJiAobi5pZD8uaW5jbHVkZXMoXCJibi1cIikgfHwgQXJyYXkuZnJvbShuLmNsYXNzTGlzdCkuc29tZSgoYykgPT4gYy5pbmNsdWRlcyhcImJuLVwiKSB8fCBjLmluY2x1ZGVzKFwibmQtXCIpKSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFnZW50RGV0YWlscyA9ICgpID0+IHtcbiAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIC8vIGV4dHJhY3QgYnJvd3NlciBhbmQgdmVyc2lvblxuICBjb25zdCBiciA9IHVhLm1hdGNoKC8ob3BlcmF8ZWRnfHRyaWRlbnR8ZmlyZWZveHxtc2llKD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fFxuICAgIHVhLm1hdGNoKC8oc2FmYXJpfGNocm9tZSg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHxcbiAgICB1YS5tYXRjaCgvKHdlYmtpdCg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHwgW107XG5cbiAgaWYgKCFiciB8fCBici5sZW5ndGggPCAzKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgYk5hbWUgPSBiclsxXTtcbiAgY29uc3QgYlZlcnNpb24gPSBiclsyXTtcblxuICBjb25zdCBvcyA9IHtcbiAgICBXaW5kb3dzOiAvV2luL2kudGVzdCh1YSksXG4gICAgTWFjOiAvTWFjL2kudGVzdCh1YSksXG4gICAgTGludXg6IC9MaW51eC9pLnRlc3QodWEpLFxuICAgIEFuZHJvaWQ6IC9BbmRyb2lkL2kudGVzdCh1YSksXG4gICAgaU9TOiAvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QodWEpLFxuICB9O1xuXG4gIC8vIGV4dHJhY3QgT1MgYW5kIHZlcnNpb25cbiAgbGV0IG9zVmVyc2lvbiA9IFwiXCI7XG4gIGxldCBvc05hbWUgPSBcIlwiO1xuICBpZiAob3MuV2luZG93cykge1xuICAgIG9zTmFtZSA9IFwiV2luZG93c1wiO1xuICAgIG9zVmVyc2lvbiA9IHVhLm1hdGNoKC9XaW5kb3dzIE5UIChbMC05Ll0rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXSA6IFwidW5rbm93blwiO1xuICB9IGVsc2UgaWYgKG9zLmlPUykge1xuICAgIG9zTmFtZSA9IFwiaU9TXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL09TIChbMC05X10rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXS5yZXBsYWNlKC9fL2csIFwiLlwiKSA6IFwidW5rbm93blwiO1xuICB9IGVsc2UgaWYgKG9zLk1hYykge1xuICAgIG9zTmFtZSA9IFwiTWFjXCI7XG4gICAgb3NWZXJzaW9uID0gdWEubWF0Y2goL01hYyBPUyBYIChbMC05X10rKS8pO1xuICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvbiA/IG9zVmVyc2lvblsxXS5yZXBsYWNlKC9fL2csIFwiLlwiKSA6IFwidW5rbm93blwiO1xuICB9IGVsc2UgaWYgKG9zLkFuZHJvaWQpIHtcbiAgICBvc05hbWUgPSBcIkFuZHJvaWRcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvQW5kcm9pZCAoWzAtOS5dKykvKTtcbiAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24gPyBvc1ZlcnNpb25bMV0gOiBcInVua25vd25cIjtcbiAgfSBlbHNlIGlmIChvcy5MaW51eCkge1xuICAgIG9zTmFtZSA9IFwiTGludXhcIjtcbiAgICBvc1ZlcnNpb24gPSB1YS5tYXRjaCgvTGludXggKFtpXFxkXSspLyk7XG4gICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uID8gb3NWZXJzaW9uWzFdIDogXCJ1bmtub3duXCI7XG4gIH1cblxuICAvLyBleHRyYWN0IG1vYmlsZSBvciBkZXNrdG9wXG4gIGNvbnN0IGlzTW9iaWxlID0gL01vYmkvaS50ZXN0KHVhKTtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5icm93c2VyTmFtZVwiLCBiTmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLmJyb3dzZXJWZXJzaW9uXCIsIGJWZXJzaW9uKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uub3NOYW1lXCIsIG9zTmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm9zVmVyc2lvblwiLCBvc1ZlcnNpb24pO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pc01vYmlsZVwiLCBpc01vYmlsZSk7XG5cbiAgY29uc3QgaXNTdXBwb3J0ZWRCcm93c2VyID0gYk5hbWUgPT09IFwiQ2hyb21lXCIgfHwgYk5hbWUgPT09IFwiU2FmYXJpXCI7XG4gIGNvbnN0IGlzU3VwcG9ydGVkT1MgPSBvc05hbWUgPT09IFwiTWFjXCIgfHwgb3NOYW1lID09PSBcIldpbmRvd3NcIiB8fCBvc05hbWUgPT09IFwiQW5kcm9pZFwiIHx8IG9zTmFtZSA9PT0gXCJpT1NcIjtcblxuICByZXR1cm4gaXNTdXBwb3J0ZWRCcm93c2VyICYmIGlzU3VwcG9ydGVkT1M7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0VVJMRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVSTCA9IG5ldyBVUkwod2luZG93LnRvcC5sb2NhdGlvbi5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIsIGN1cnJlbnRVUkwuaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCBjdXJyZW50VVJMLmhvc3RuYW1lKTtcblxuICAvKiBWaXZlbnNlIHNwZWNpZmljICovXG4gIGxldCBwYWdlVHlwZTtcbiAgLy8gaWYgdXJsIGxpa2UgeCB0aGVuIHNldCBQYWdlVHlwZSA9IHlcbiAgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImZhdm9yaWxlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJmYXZvcml0ZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImJhc2tldFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtb3pldGkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInB1cmNoYXNlXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwib2RlbWUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBheW1lbnRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJhZGRyZXNzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXN0b3JkZXJzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWtheWl0Lmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJyZWdpc3RlclwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1naXJpc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNpZ25pblwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImt1cG9ubGFyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfY291cG9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInByb2ZpbC1ndW5jZWxsZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9pbmZvXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9hZGRyZXNzZXNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJkdXl1cnUtdGVyY2lobGVyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9ub3RpZmljYXRpb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiaW5kaXJpbWxpLW1vYmlseWEta2FtcGFueWFsYXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzcGVjaWFsX2NhbXBhaWduc1wiO1xuICB9XG5cbiAgaWYgKHBhZ2VUeXBlKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCBwYWdlVHlwZSk7XG4gIH1cbn07XG5cbi8qKlxuICogV29yayBhcm91bmQgU2FmYXJpIDE0IEluZGV4ZWREQiBvcGVuIGJ1Zy5cbiAqXG4gKiBTYWZhcmkgaGFzIGEgaG9ycmlibGUgYnVnIHdoZXJlIElEQiByZXF1ZXN0cyBjYW4gaGFuZyB3aGlsZSB0aGUgYnJvd3NlciBpcyBzdGFydGluZyB1cC4gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyNjU0N1xuICogVGhlIG9ubHkgc29sdXRpb24gaXMgdG8ga2VlcCBudWRnaW5nIGl0IHVudGlsIGl0J3MgYXdha2UuXG4gKi9cbmV4cG9ydCBjb25zdCBpZGJSZWFkeSA9ICgpID0+IHtcbiAgY29uc3QgaXNTYWZhcmkgPVxuICAgICFuYXZpZ2F0b3IudXNlckFnZW50RGF0YSAmJlxuICAgIC9TYWZhcmlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAhL0Nocm9tKGV8aXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAvLyBObyBwb2ludCBwdXR0aW5nIG90aGVyIGJyb3dzZXJzIG9yIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSB0aHJvdWdoIHRoaXMgbWVzcy5cbiAgaWYgKCFpc1NhZmFyaSB8fCAhaW5kZXhlZERCLmRhdGFiYXNlcykgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIGxldCBpbnRlcnZhbElkO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IHRyeUlkYiA9ICgpID0+IGluZGV4ZWREQi5kYXRhYmFzZXMoKS5maW5hbGx5KHJlc29sdmUoKSk7XG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRyeUlkYiwgNTApO1xuICAgIHRyeUlkYigpO1xuICB9KS5maW5hbGx5KCgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCkpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRVbnNlY3VyZUhhc2h9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdkluZm9MYXllclwiKTtcbmNvbnN0IExTX1ByZWZpeCA9IFwiR0xEQ19cIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcInVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKTtcblxuICAgIC8vIHJlbW92ZSBkb3RzIGluIGJhc2VGZWF0dXJlTmFtZSBhbmQgYWRkIHByZWZpeFxuICAgIGNvbnN0IGZlYXR1cmVLZXkgPSBMU19QcmVmaXggKyBiYXNlRmVhdHVyZU5hbWUucmVwbGFjZSgvXFwuL2csIFwiX1wiKTtcbiAgICBjb25zdCBvcEtleSA9IGZlYXR1cmVLZXkgKyBcIl9cIiArIHVwZGF0ZU1ldGhvZDtcblxuICAgIHN3aXRjaCAodXBkYXRlTWV0aG9kKSB7XG4gICAgICBjYXNlIFwibWluXCI6XG4gICAgICBjYXNlIFwibWF4XCI6XG4gICAgICAgIC8vIGNvbXB1dGUgbWluIGFuZCBtYXggZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG5cbiAgICAgICAgZm9yIChjb25zdCBzdG9yYWdlIG9mIFtsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKG9wS2V5KTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgTWF0aFt1cGRhdGVNZXRob2RdKHZhbHVlLCBiYXNlRmVhdHVyZVZhbHVlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInN1bVwiOlxuICAgICAgICAvLyBjb21wdXRlIHN1bSBhbmQgY291bnQgZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIHBhcnNlRmxvYXQodmFsdWUpICsgcGFyc2VGbG9hdChiYXNlRmVhdHVyZVZhbHVlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiY250XCI6XG4gICAgICAgIC8vIGNvbXB1dGUgY291bnQgZm9yIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIHBhcnNlSW50KHZhbHVlKSArIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgLy8gY29tcHV0ZSBsYXN0IG9idGFpbmVkIHZhbHVlIGluIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzXG4gICAgICAgIGZvciAoY29uc3Qgc3RvcmFnZSBvZiBbbG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZV0pIHtcbiAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0ob3BLZXksIGJhc2VGZWF0dXJlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJjb3VudF92YWx1ZXNcIiBmb3Igc3RyaW5nL2NhdGVnb3JpY2FsIGRhdGEgdHlwZXMsIGtlZXAgYSBjb3VudGVyIGZvciBlYWNoIHZhbHVlXG4gICAgICBjYXNlIFwidmFsY250c1wiOlxuICAgICAgICB7XG4gICAgICAgICAgLy8gY29tcHV0ZSBjb3VudCBvZiBlYWNoIHZhbHVlIGZvciBsb2NhbCBhbmQgc2Vzc2lvbiBzdG9yYWdlc1xuICAgICAgICAgIC8vIGNyZWF0ZSBhIDggYnl0ZXMgaGV4IGhhc2ggZm9yIGJhc2VGZWF0dXJlVmFsdWUsIG9ubHkgcG9zaXRpdmUgbnVtYmVyc1xuICAgICAgICAgIGNvbnN0IHZhbEhhc2ggPSBnZXRVbnNlY3VyZUhhc2goYmFzZUZlYXR1cmVWYWx1ZSk7XG5cbiAgICAgICAgICBjb25zdCBvcEtleVZhbCA9IG9wS2V5ICsgXCJfXCIgKyB2YWxIYXNoO1xuICAgICAgICAgIGNvbnN0IG9wS2V5VmFsTmFtZSA9IG9wS2V5ICsgXCJfXCIgKyB2YWxIYXNoICsgXCJfbmFtZVwiO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9wS2V5VmFsTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHN0b3JhZ2Ugb2YgW2xvY2FsU3RvcmFnZSwgc2Vzc2lvblN0b3JhZ2VdKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShvcEtleVZhbCk7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG9wS2V5VmFsLCBwYXJzZUludCh2YWx1ZSkgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShvcEtleVZhbCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciBpbiB1cGRhdGVJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCwgZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBxdWVyeUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdykgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdyk7XG5cbiAgICBjb25zdCBmZWF0dXJlS2V5ID0gTFNfUHJlZml4ICsgYmFzZUZlYXR1cmVOYW1lLnJlcGxhY2UoL1xcLi9nLCBcIl9cIik7XG4gICAgbGV0IG9wS2V5O1xuXG4gICAgbGV0IHN0b3JhZ2UgPSBudWxsO1xuICAgIGlmICh3aW5kb3cgPT09IFwiYWxsdGltZVwiKSB7XG4gICAgICBzdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xuICAgIH0gZWxzZSBpZiAod2luZG93ID09PSBcInNlc3Npb25cIikge1xuICAgICAgc3RvcmFnZSA9IHNlc3Npb25TdG9yYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXCJJbnZhbGlkIHdpbmRvdyB0eXBlXCIsIHdpbmRvdyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHF1ZXJ5TWV0aG9kKSB7XG4gICAgICAvLyBmb3IgbGFzdCwgbWluLCBtYXgsIHN1bSBldGMuIGJyaW5nIHRoZSB2YWx1ZSBmcm9tIGxvY2FsL3Nlc3Npb24gc3RvcmFnZSBnaXZlbiB0aGUgd2luZG93IGlzIHNlc3Npb24gb3IgYWxsdGltZVxuICAgICAgY2FzZSBcIm1pblwiOlxuICAgICAgY2FzZSBcIm1heFwiOlxuICAgICAgY2FzZSBcInN1bVwiOlxuICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgb3BLZXkgPSBmZWF0dXJlS2V5ICsgXCJfXCIgKyBxdWVyeU1ldGhvZDtcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0SXRlbShvcEtleSk7XG5cbiAgICAgICAgLy8gZm9yIGN2LCByZXR1cm4gdGhlIG51bWJlciBvZiBkc2lpdG5jdCB2YWx1ZXMsIG9idGFpbiBieSBzY2FubmluZyB0aGUgcHJlZml4IG9mIHRoZSBrZXkgaW4gdGhlIGxvY2FsL3Nlc3Npb24gc3RvcmFnZVxuICAgICAgICAvLyBmb3IgbW9kZSwgc2NhbiB0aGUgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlIGFuZCByZXR1cm4gdGhlIHZhbHVlIHdpdGggdGhlIGhpZ2hlc3QgY291bnRcbiAgICAgIGNhc2UgXCJjbnR2YWxzXCI6XG4gICAgICBjYXNlIFwic3VtdmFsc1wiOlxuICAgICAgY2FzZSBcIm1vZGVcIjpcbiAgICAgIHtcbiAgICAgICAgb3BLZXkgPSBmZWF0dXJlS2V5ICsgXCJfdmFsY250c1wiO1xuICAgICAgICBjb25zdCBsb2NhbEtleXMgPSBPYmplY3Qua2V5cyhzdG9yYWdlKTtcbiAgICAgICAgY29uc3QgbG9jYWxLZXlzRmlsdGVyZWQgPSBsb2NhbEtleXMuZmlsdGVyKChrZXkpID0+IGtleS5pbmRleE9mKG9wS2V5KSA9PT0gMCAmJiBrZXkuaW5kZXhPZihcIl9uYW1lXCIpID09PSAtMSk7XG4gICAgICAgIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjbnR2YWxzXCIpIHtcbiAgICAgICAgICByZXR1cm4gbG9jYWxLZXlzRmlsdGVyZWQubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcInN1bXZhbHNcIikge1xuICAgICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICAgIGxvY2FsS2V5c0ZpbHRlcmVkLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgc3VtICs9IHBhcnNlSW50KHN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc3VtO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1heENvdW50ID0gbnVsbDtcbiAgICAgICAgbGV0IG1heFZhbCA9IG51bGw7XG4gICAgICAgIGxvY2FsS2V5c0ZpbHRlcmVkLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IHBhcnNlSW50KHN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICAgICAgICBpZiAobWF4VmFsID09PSBudWxsIHx8IG1heENvdW50ID09PSBudWxsIHx8IG1heENvdW50IDwgdmFsKSB7XG4gICAgICAgICAgICBtYXhDb3VudCA9IHZhbDtcbiAgICAgICAgICAgIC8vIG5hbWVzIGFyZSBvbmx5IGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgIG1heFZhbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSArIFwiX25hbWVcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1heFZhbDtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiRXJyb3IgaW4gcXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3csIGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtmb3JtYXREZWxpdmVyeURhdGUsIGlzT3duTXV0YXRpb259IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4vY29sbGVjdG9yXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBfX2h3bTogMCxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJHbG92SW5mb0xheWVyXCIpO1xuXG4vLyBUT0RPOiBjb252ZXJ0IHRvIG5hbWUgLS0+IGFycmF5IG9mIHNlbGVjdG9yc1xuY29uc3Qgc2VhcmNoUGF0aHMgPSBbXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR0EgRGF0YSBMYXllciBRdWVyaWVzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQYWdlVHlwZVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwZHAuZ3JvdXBcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jbGFzc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBkcC5za3VcIiwgZm9ybWF0dGVyOiBcInVwcGVyQ2FzZVRSXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlByb2R1Y3RJRFwiLCBuYW1lOiBcInBkcC5za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UuZGV0YWlsLmFjdGlvbkZpZWxkLmxpc3RcIiwgbmFtZTogXCJwZHAubGlzdGFsaWFzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLnNrdVwiLCBuYW1lOiBcInBkcC5za3VcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZGlzY291bnRSYXRlXCIsIG5hbWU6IFwicGRwLmRpc2NvdW50UmF0ZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5mYXN0RGVsaXZlcnlcIiwgbmFtZTogXCJwZHAuZmFzdERlbGl2ZXJ5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmlzSW5TaG93cm9vbVwiLCBuYW1lOiBcInBkcC5pc0luU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJzZWFyY2hfc3VjY2Vzc1wiLCBuYW1lOiBcInBscC5zZWFyY2hTdWNjZXNzXCIsIGV4Y2x1c2l2ZTogW1wicGxwLmlkXCIsIFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgXCJwbHAubmFtZVwiLCBcInBscC5ncm91cFwiLCBcInBscC5jbGFzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwbHAuaWRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY2F0ZWdvcnlfcHJvZHVjdF9jb3VudFwiLCBuYW1lOiBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBscC5ncm91cFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGxwLmNsYXNzXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLnByaWNlXCIsIG5hbWU6IFwicHVyY2hhc2UucHJpY2VzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLnF1YW50aXR5XCIsIG5hbWU6IFwicHVyY2hhc2UucXVhbnRpdGllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInB1cmNoYXNlLmNhdGVnb3JpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uub3JkZXJJZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQucmV2ZW51ZVwiLCBuYW1lOiBcInB1cmNoYXNlLnJldmVudWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLmRpbWVuc2lvbjE1XCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBEb2N1bWVudCBRdWVyaWVzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwYWdlX3ByZXZpZXdfd3JhcHBlcl9wcm9kdWN0aW9uXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJIb21lcGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhdGVnb3J5X3BhZ2Vfd3JhcHBlclxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiTGlzdGluZ3BhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LW1haW4tZGV0YWlsc1xcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIndlbGNvbWVfdXNlcm5hbWVcXFwiXVwiLCBuYW1lOiBcInZpZXcuaXNMb2dnZWRJblwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImVtcHR5X2Jhc2tldF90ZXh0XFxcIl1cIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJib2R5ID4gLmRlc2t0b3BfbGF5b3V0X3dyYXBwZXIgLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3B1b25Ob3RBcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3RvdGFsX3ByaWNlXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbaWQqPVxcXCJjYXJ0X3F1YW50aXR5XFxcIl0sIFtjbGFzcyo9XFxcImJhc2tldF9sZW5ndGhcXFwiXVwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZUZvcm1hdHRlZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJmb3JtYXREZWxpdmVyeURhdGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC10aXRsZVxcXCJdLCBbY2xhc3MqPVxcXCJoZWFkZXItYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInZpdmVuc2Utc2hvd3Jvb21zXFxcIl0gPiAqXCIsIG5hbWU6IFwicGRwLnNob3dyb29tY291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUNvdW50RWx0c1wiLCBleGNsdXNpdmU6IFtcInBkcC5oYXNOb1Nob3dyb29tc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI3ZpdmVuc2Utc2hvd3Jvb20tdGFiIHA6bm90KC52aXZlbnNlLXNob3dyb29tcylcIiwgbmFtZTogXCJwZHAuaGFzTm9TaG93cm9vbXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcInBkcC5zaG93cm9vbWNvdW50XCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJzcGFuLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNzYWxlcy1wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJkaXYucHJvZHVjdC1wcmljZS1ib3hcIiwgbmFtZTogXCJfX3ByaWNlT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcInBkcC5wcmljZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI21vYmlsZS1wcm9kdWN0LXN0aWNreVwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNvdW50LW9mLXByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwic3ViY2F0ZWdvcmllcy10aXRsZVxcXCJdXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1jYXJkW2RhdGEtcHJvZHVjdC1za3VdXCIsIG5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcm9kdWN0LXNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucHJvZHVjdC1saXN0XCIsIG5hbWU6IFwiX19saXN0aW5nSXRlbUJsb2NrT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmVtcHR5LWNhcnQtY29udGFpbmVyLCAuZW1wdHktY2FydFwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmJyYWNrZXQtdGV4dCwgLnByb2R1Y3QtY291bnRcIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnRJdGVtUXVhbnRpdHlcIiwgbmFtZTogXCJjYXJ0LnF1YW50aXRpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByZXZpb3VzXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI2JpbGxfdG90YWxcIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlci1maW5hbC1udW1iZXJcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2FydC1wcmljZVxcXCJdIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY291cG9uQXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXNrdVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuY2F0ZWdvcmllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtbGFzdC1icmVhZGNydW1iXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5wcmljZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByaWNlXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAgLy8gRGVza3RvcCBvYnNlcnZlciBmb3IgdGhlIHJpZ2h0IHBhbmVsLCBhcyBpdCBpcyB0aGUgb25lIGNoYW5naW5nXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LXJpZ2h0LWNvbnRhaW5lclwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAgLy8gTW9iaWxlIG9ic2VydmVyIGZvciB0aGUgZnVsbCBmb3JtIGJsb2NrIGFzIGl0IGlzIGNvbXBsZXRlbHkgcmVwbGFjZWRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI2NoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF9zdW1tYXJ5X3RvdGFsXFxcIl0sIFtjbGFzcyo9XFxcInRvdGFsX3Jvd1xcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlcl9mb2xsb3dfbnVtYlxcXCJdLCBbY2xhc3MqPVxcXCJjYXJ0LXRpdGxlLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucGF5bWVudF90eXBlX3RpdGxlLCAuY2FydC10aXRsZS1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdF9za3VfY29kZVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU09SRyBFbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1wblwiLCBuYW1lOiBcInBkcC5tcG5cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJuYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJKU09ORmlsdGVyT3RoZXJcIiwgdmFsdWU6IFwiQHR5cGU9UHJvZHVjdFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiaXRlbUxpc3RFbGVtZW50LioubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiYnJlYWRjcnVtYi5pdGVtTGlzdEVsZW1lbnQuKi5pdGVtLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBXaW5kb3cgY3VzdG9tIGVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJmYXZvcml0ZVByb2R1Y3RzXCIsIG5hbWU6IFwidmlldy5mYXZvcml0ZWRNUE5zXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcInRvU3RyaW5nXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXTtcblxuY29uc3QgZmVhdHVyZUVuZ2luZWVyaW5nT3BzID0ge1xuICBcInZpZXdfZXBvY2hcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibWluXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtaW5cIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS52aWV3X2Vwb2NoX21pblwifSxcbiAgXSxcbiAgXCJQYWdlVHlwZVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJ2YWxjbnRzXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJzdW12YWxzXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwic3VtdmFsc1wiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3RcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcInZhbGNudHNcIn0sXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtb2RlXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X21vZGVfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdFwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9sYXN0X3Nlc3Npb25cIn0sXG4gIF0sXG4gIFwiY2FydC5za3VzXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3RcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIn0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00gPSAoKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmZvTGF5ZXIuX19od20gKz0gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUb0JlYWdsZUluZm9MYXllciA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gaWYgdmFsdWUgaXMgc3RyaW5nLCBhZGQgYXMgYSBjbGVhbiBzdHJpbmcsIGlmIG9iamVjdCBhZGQgdGhlIHNhbWVcbiAgY29uc3QgdHlwZWRWYWx1ZSA9IHR5cGVvZiAodmFsdWUpID09PSBcInN0cmluZ1wiID8gdmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiB2YWx1ZTtcbiAgLy8gaWYga2V5IGNvbnRhaW5zIC4gY3JlYXRlIG5lc3RlZCBvYmplY3RcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgb2JqW2tleV0gPSB7fTtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIG9ialtsYXN0S2V5XSA9IHR5cGVkVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaW5mb0xheWVyW2tleV0gPSB0eXBlZFZhbHVlO1xuICB9XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBpZiAodHlwZWRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVkVmFsdWUgIT09IG51bGwpIHtcbiAgICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgdHlwZWRWYWx1ZSk7XG4gICAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCB0eXBlZFZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgREFUQV9MSVNURU5FUlMgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGFkZERhdGFMaXN0ZW5lciA9IChrZXksIGxpc3RlbmVyKSA9PiB7XG4gIGlmICghREFUQV9MSVNURU5FUlNba2V5XSkge1xuICAgIERBVEFfTElTVEVORVJTW2tleV0gPSBbXTtcbiAgfVxuICBEQVRBX0xJU1RFTkVSU1trZXldLnB1c2gobGlzdGVuZXIpO1xufTtcblxuY29uc3QgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBEQVRBX0xJU1RFTkVSU1trZXldO1xuICBpZiAobGlzdGVuZXJzICYmIEFycmF5LmlzQXJyYXkobGlzdGVuZXJzKSAmJiBsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsb2dnZXIubG9nKGBwYXNzVmFsdWVUb0xpc3RlbmVycyAtLT4gdmFsdWUgJHt2YWx1ZX0gdG8gbGlzdGVuZXIgJHtpfSBvZiBrZXkgJHtrZXl9YCk7XG4gICAgICAgIGxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICAvLyBUT0RPOiBjaGVjayBmZWF0dXJlRW5naW5lZXJpbmcgYW5kIHNlYXJjaCBsaXN0IGlmIGFsbCBtYXJrZWQgYXMgZm91bmQgYnV0IHZhbHVlIGlzIG1pc3NpbmdcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHJldHVybiBudWxsIGlmIGtleSBpcyBtaXNzaW5nIG9yIG5vdCBhbiBhcnJheSBvciBoYXMgbm8gZWxlbWVudHNcbiAgaWYgKCFrZXkpIHJldHVybiBudWxsO1xuICBsZXQgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXlcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9idGFpbkRhdGEpO1xuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gICAgICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleSwgY2xlYXIgaW50ZXJ2YWwgYW5kIHJlc29sdmVcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAgICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHBvbGxJbnRlcnZhbCk7XG4gICAgICAvLyBhZGQgdGltZW91dFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfSwgdGltZW91dCk7IC8vIHdhaXQgYmxvY2tpbmcgZm9yIFwidGltZW91dFwiIG1zZWNzXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyByZW1vdmUga2V5IGZyb20gaW5mb0xheWVyXG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIHJldHVybjtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIGxvZ2dlci5sb2coXCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyXCIsIGBSZW1vdmluZyBrZXk6ICR7bGFzdEtleX1gKTtcbiAgICBkZWxldGUgb2JqW2xhc3RLZXldO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBpbmZvTGF5ZXJba2V5XTtcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvcihrZXksIG51bGwpO1xuICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRyZWF0bWVudCA9IChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIHN0YXR1cywgZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IG51bGwpID0+IHtcbiAgY29uc3QgdmFsdWUgPSB7fTtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZUlkICE9PSB1bmRlZmluZWQpIHZhbHVlLmJ1c2luZXNzUnVsZUlkID0gYnVzaW5lc3NSdWxlSWQ7XG4gIGlmICh2YXJpYW50KSB2YWx1ZS52YXJpYW50ID0gdmFyaWFudDtcblxuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJhcHBsaWVkXCI6XG4gICAgICBpbmZvTGF5ZXIuYVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJza2lwcGVkXCI6XG4gICAgICB2YWx1ZS5kZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gZGVwZW5kYW50X29uX3RyZWF0bWVudDtcbiAgICAgIGluZm9MYXllci5lW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImZhaWxlZFwiOlxuICAgICAgaW5mb0xheWVyLmZbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgfVxuICBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSgpO1xufTtcblxuY29uc3QgUEFSU0VTRUFSQ0hNQVhSRVRSWSA9IDEwO1xuY29uc3QgUEFSU0VTRUFSQ0hTVEFSVERFTEFZID0gMTA7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyID0gYXN5bmMgKCkgPT4ge1xuICAvLyBDb2xsZWN0IGNvcmUgZGF0YVxuICBwcmVwYXJlQ29yZURhdGEoKTtcblxuICAvLyBUcmlnZ2VyLXN0YXJ0IHRoZSBwYXJzZXIgbG9vcFxuICBwYXJzZXJDYWxsZXIoKTtcblxuICAvLyBBZGQgbWV0cmljc1xuICBhZGRNZXRyaWNzKCk7XG59O1xuXG5jb25zdCBjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBiYXNlRmVhdHVyZU5hbWVzID0gT2JqZWN0LmtleXMoZmVhdHVyZUVuZ2luZWVyaW5nT3BzKTtcbiAgZm9yIChjb25zdCBiYXNlRmVhdHVyZU5hbWUgb2YgYmFzZUZlYXR1cmVOYW1lcykge1xuICAgIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICAgIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICAgIGlmIChGRU9wLnF1ZXJ5TWV0aG9kID09PSBudWxsIHx8IEZFT3AucXVlcnlNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UmVzcG9uc2UgPSBhd2FpdCBxdWVyeUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgRkVPcC5xdWVyeU1ldGhvZCwgRkVPcC53aW5kb3cpO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihGRU9wLmZlYXR1cmVOYW1lLCBxdWVyeVJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKSA9PiB7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IEZFT3Agb2YgRkVEYXRhKSB7XG4gICAgICBpZiAoRkVPcC51cGRhdGVNZXRob2QgPT09IG51bGwgfHwgRkVPcC51cGRhdGVNZXRob2QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICBhd2FpdCB1cGRhdGVJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIEZFT3AudXBkYXRlTWV0aG9kKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHByb2Nlc3NGb3JtYXR0ZXIgPSAodmFsdWUsIGZvcm1hdHRlcikgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCAhZm9ybWF0dGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3dpdGNoIChmb3JtYXR0ZXIpIHtcbiAgICBjYXNlIFwidXBwZXJDYXNlVFJcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKFwidHItVFJcIik7XG4gICAgY2FzZSBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwiOlxuICAgICAgcmV0dXJuIGZvcm1hdERlbGl2ZXJ5RGF0ZSh2YWx1ZSk7XG4gICAgY2FzZSBcIm51bWVyaWNPbmx5XCI6XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgIGNhc2UgXCJsb3dlckNhc2VUUkZpcnN0V29yZFwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoXCJ0ci1UUlwiKS5zcGxpdChcIiBcIilbMF07XG4gICAgY2FzZSBcImRlYXJyYXlcIjpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBjYXNlIFwidG9TdHJpbmdcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hPYmogPSAob2JqLCBzZWFyY2hFbGVtZW50KSA9PiB7XG4gIGxldCB2YWx1ZTtcbiAgbGV0IGxheWVyVmFsdWU7XG5cbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHNlYXJjaEVsZW1lbnQub3BlcmFuZCkge1xuICAgICAgY2FzZSBcIkpTT05GaWx0ZXJPdGhlclwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlsdGVyUGFyYW1zID0gc2VhcmNoRWxlbWVudC52YWx1ZS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgaWYgKGZpbHRlclBhcmFtcy5sZW5ndGggIT09IDIpIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGZpbHRlck5hbWUgPSBmaWx0ZXJQYXJhbXNbMF07XG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBmaWx0ZXJQYXJhbXNbMV07XG4gICAgICAgICAgaWYgKCFmaWx0ZXJOYW1lIHx8ICFmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaCA9IGpzb25HZXQob2JqLCBmaWx0ZXJOYW1lKTtcblxuICAgICAgICAgIGlmICghZmlsdGVyTWF0Y2ggfHwgZmlsdGVyTWF0Y2ggIT09IGZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGlmICh2YWx1ZSAmJiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlPYnNlcnZlXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgY29uc3QgdG9CZVVwZGF0ZWQgPSBbXTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gc2VhcmNoUGF0aHMuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT09IGNoaWxkKTtcbiAgICAgICAgICAgIC8vIGFkZCBjaGlsZEVsZW1lbnRzIGludG8gdG9CZVVwZGF0ZWRcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLnB1c2goLi4uY2hpbGRFbGVtZW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gcnVuIG9ubHkgaWYgdGhlIGVsZW1lbnQgaGFzIGFkZGVkIG9yIHJlbW92ZWQgY2hpbGRyZW5cbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGFzeW5jIGZ1bmN0aW9uKG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICAgIGlmIChpc093bk11dGF0aW9uKG11dGF0aW9uTGlzdCkpIHJldHVybjtcbiAgICAgICAgICAgIHRvQmVVcGRhdGVkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgZWxlbWVudC5pc0ZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIoZWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdHJpZ2dlclJlc3RhcnQgPSBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPj0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbiAgICAgICAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IDA7XG4gICAgICAgICAgICBpZiAodHJpZ2dlclJlc3RhcnQpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcInNlYXJjaE9iajogdHJpZ2dlcmVkIGEgcmVzdGFydCBvZiBzZWFyY2hwYXRocyBkdWU6IFwiLCBzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgICBwYXJzZXJDYWxsZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHZhbHVlLCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIjpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlTGlzdCA9IFtdO1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlID0gdmFsdWVjaGlsZC5nZXRBdHRyaWJ1dGUoc2VhcmNoRWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoYXR0cmliVmFsdWUpIHtcbiAgICAgICAgICAgICAgYXR0cmliVmFsdWVMaXN0LnB1c2goYXR0cmliVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IGF0dHJpYlZhbHVlTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBzZXRWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMDtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2V0VmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUNvdW50RWx0c1wiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNlYXJjaEVsZW1lbnQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICBsZXQgc3VtUHJpY2UgPSAwO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGNoaWxkLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHN1bVByaWNlICs9IHBhcnNlSW50KGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdW1QcmljZSA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBzdW1QcmljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGFycmF5SW5uZXJUZXh0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhcnJheUlubmVyVGV4dC5wdXNoKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUlubmVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXJyYXlJbm5lclRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9IC8vIHN3aXRjaFxuXG4gICAgaWYgKGxheWVyVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBsYXllclZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpIHtcbiAgICAgICAgbGF5ZXJWYWx1ZSA9IHByb2Nlc3NGb3JtYXR0ZXIobGF5ZXJWYWx1ZSwgc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpO1xuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoc2VhcmNoRWxlbWVudC5uYW1lLCBsYXllclZhbHVlKTtcbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG5cbiAgICAgIC8vIG1hcmsgZXhjbHVzaXZlIGVsZW1lbnRzIGFzIGZvdW5kXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSkgJiYgc2VhcmNoRWxlbWVudC5leGNsdXNpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZUVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUuaW5jbHVkZXMoZXhjbHVzaXZlRWxlbWVudC5uYW1lKSkge1xuICAgICAgICAgICAgZXhjbHVzaXZlRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwic2VhcmNoT2JqIGVycm9yOiBcIiArIGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGN1c3RvbURhdGFEZXJpdmF0aW9ucyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUsIDUwLCAxMDAwKTtcblxuICB0cnkge1xuICAgIC8vIGNhcnQgdG90YWwgcHJvZHVjdCBwcmljZSBpcyBub3QgYXZhaWxhYmxlIGFueXdoZXJlLCBzcGVjaWFsIGRpc2NvdW50cyBldGMgYXJlIGhhcmQgdG8gc2NyYXBlLCBzbyByZWNhbGN1bGF0ZSBpdFxuICAgIGNvbnN0IFtpc0NhcnRFbXB0eSwgdG90YWxCYXNlUHJpY2UsIGNvdXBvbk5vdEFwcGxpY2FibGUsIHByaWNlcywgcXVhbnRpdGllc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5pc2VtcHR5XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxCYXNlUHJpY2VcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucHJpY2VzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucXVhbnRpdGllc1wiKSxcbiAgICBdKTtcblxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcblxuICAgIGlmICghdG90YWxCYXNlUHJpY2UgJiYgcHJpY2VzICYmIEFycmF5LmlzQXJyYXkocHJpY2VzKSAmJiBwcmljZXMubGVuZ3RoID4gMCAmJiBxdWFudGl0aWVzICYmIEFycmF5LmlzQXJyYXkocXVhbnRpdGllcykgJiYgcXVhbnRpdGllcy5sZW5ndGggPiAwICYmIHByaWNlcy5sZW5ndGggPT09IHF1YW50aXRpZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbFByaWNlICs9IHBhcnNlSW50KHByaWNlc1tpXSkgKiBwYXJzZUludChxdWFudGl0aWVzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxQcmljZSA9IHBhcnNlSW50KHRvdGFsQmFzZVByaWNlKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlICYmIGNvdXBvbk5vdEFwcGxpY2FibGUpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSB0b3RhbFByaWNlIC0gcGFyc2VJbnQoY291cG9uTm90QXBwbGljYWJsZSk7XG4gICAgfSBlbHNlIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHBhcnNlSW50KHRvdGFsUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIiwgY291cG9uQXBwbGljYWJsZUFtb3VudCk7XG5cbiAgICBpZiAoaXNDYXJ0RW1wdHkpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbFByaWNlXCIsIDApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiY3VzdG9tRGF0YURlcml2YXRpb25zIGNhbm5vdCBjb21wdXRlIGNvdXBvbkFwcGxpY2FibGVQcmljZTogXCIgKyBlKTtcbiAgfVxuXG4gIC8vIFByb2R1Y3QgcGFnZSAtLT4gdHJhbnNmZXIgc2t1cyB0byBzaW5nbGUgbG9jYXRpb25cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJQcm9kdWN0cGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIik7XG4gICAgaWYgKHNrdSAhPT0gbnVsbCAmJiBza3UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXdhaXQgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgW3NrdV0pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGFnZVR5cGUgPT09IFwiYmFza2V0XCIpIHtcbiAgICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQuc2t1c1wiKTtcbiAgICBpZiAoc2t1TGlzdCAhPT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KHNrdUxpc3QpICYmIHNrdUxpc3QubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBza3VMaXN0KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHBhcnNlU2VhcmNoUGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRvbVN0YXR1cyA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIC8vIGNoZWNrIGlmIGRvY3VtZW50IGFuZCBkb20gaXMgbG9hZGVkIGFuZCByZWFkeSBmb3Igc2NyYXBwaW5nXG4gIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGluaXRpYWxpemVkIHdpdGggZG9tIHN0YXR1czogIFwiICsgZG9tU3RhdHVzKTtcblxuICBjb25zdCB3aW50b3AgPSB3aW5kb3cudG9wO1xuICBjb25zdCBkYXRhTGF5ZXIgPSB3aW50b3AuZGF0YUxheWVyO1xuICBjb25zdCB3aW5kb2MgPSB3aW50b3AuZG9jdW1lbnQ7XG4gIGxldCBzb3JnQXJyYXlJbm5lcjtcblxuICBjb25zdCBmb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBwcmV2Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgbm90Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcblxuICAvLyBQYWdlVHlwZSBjYW4gYmUgaW5mZXJyZWQgZnJvbSBVUkwsIGlmIGZvdW5kIHVzZSBpdCBmcm9tIHRoZXJlXG4gIGxldCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG5cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSkge1xuICAgIHByZXZGb3VuZE5hbWVzLmFkZChcIlBhZ2VUeXBlXCIpO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHNlYXJjaCBsaXN0cyBhbmQgbWFyayBmb3VuZCBuYW1lc1xuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICBwcmV2Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChmb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpIHx8IHByZXZGb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAvLyBoYWQgYWxyZWFkeSBmb3VuZCB0aGlzIGVsZW1lbnQgb24gYW5vdGhlciBwYXJzZSBpdGVtXG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQgIT09IFwiKlwiKSB7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG4gICAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZC5pbmRleE9mKGN1cnJlbnRQYWdlVHlwZSkgPCAwKSB7XG4gICAgICAgIC8vIHNraXAgc2VhcmNoRWxlbWVudCBiZWNhdXNlIG9mIFBhZ2VUeXBlRGVwZW5kXG4gICAgICAgIHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiU2luZ2xlV1RcIikgeyAvLyBTQ0FOIFdpbmRvdyBmb3IgU2luZ2xlIEVsZW1lbnRzXG4gICAgICBzZWFyY2hBbmRTZXQod2ludG9wLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkdBRGF0YUxheWVyXCIpIHsgLy8gU0NBTiBHQSBEQVRBIExBWUVSXG4gICAgICBmb3IgKGNvbnN0IGRhdGFMYXllckl0ZW0gb2YgZGF0YUxheWVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChkYXRhTGF5ZXJJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1NvcmdcIikgeyAvLyBTQ0FOIFNPUkcgQVJSQVlcbiAgICAgIGlmICghc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc29yZ0FycmF5SW5uZXIgPSBnZXRTT1JHQXJyYXkoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgc29yZ0l0ZW0gb2Ygc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KHNvcmdJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1F1ZXJ5XCIpIHsgLy8gU0NBTiBET0NVTUVOVFxuICAgICAgc2VhcmNoQW5kU2V0KHdpbmRvYywgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSAvLyBET0NRVUVSWSBwYXJzZVxuICB9XG5cbiAgaWYgKG5vdEZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgZm91bmQgYWxsIGVsZW1lbnRzIC0gc2V0dGluZyByZXRyeSB0byBtYXhcIik7XG4gIH0gZWxzZSBpZiAoZm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgLy8gdXBkYXRlIHJldHJ5IGNvdW50ZXIgYW5kIGRlbGF5IG9ubHkgaWYgZG9tIGlzIGFjdGl2ZVxuICAgIGlmIChkb21TdGF0dXMgPT09IFwiY29tcGxldGVcIiB8fCBkb21TdGF0dXMgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICo9IDI7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKz0gMTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQgYnV0IG5vdCBmb3VuZCBhbnksIHNldHRpbmcgZGVsYXkgYW5kIHJldHJ5IHRvIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwiIGFuZCBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKyBcIiBmb3Igbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl1cIixcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZDogbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl0gYW5kIGZvdW5kIFwiICtcbiAgICAgIGZvdW5kTmFtZXMuc2l6ZSxcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hBbmRTZXQgPSAob2JqLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKSA9PiB7XG4gIGlmIChzZWFyY2hPYmoob2JqLCBzZWFyY2hFbGVtZW50KSkge1xuICAgIGZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfVxufTtcblxuLy8gcGFyc2Ugc291cmNlXG5jb25zdCBwYXJzZXJDYWxsZXIgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgYXdhaXQgcGFyc2VTZWFyY2hQYXRocygpO1xuICBpZiAocGFyc2VTZWFyY2hQYXRoc1JldHJ5IDwgUEFSU0VTRUFSQ0hNQVhSRVRSWSkge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiBzY2hlZHVsZWQgdG8gYmUgcmVjYWxsZWQgaW4gXCIgKyBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIm1zXCIpO1xuICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCBwYXJzZXJDYWxsZXIoKTtcbiAgICB9LCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkpO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiByZWFjaGVkIG1heCByZXRyeSwgY2FsbGluZyByZW1haW5kZXIgaGlzdG9yaWNhbCBkYXRhXCIpO1xuICAgIGF3YWl0IGN1c3RvbURhdGFEZXJpdmF0aW9ucygpO1xuICAgIGF3YWl0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IoKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSk7XG4gIH1cbn07XG5cbi8vIEV4dHJhY3QgdmFsdWUgZnJvbSBqc29uIG9iamVjdCB1c2luZyBnaXZlbiBwYXRoXG4vLyBJZiBhbiBlbGVtZW50IGlzICosIGNvbmNhdGVuYXRlIHJlY3Vyc2l2ZWx5IGFsbCBzdWItcGF0aCB2YWx1ZXMgYXMgc3RyaW5nXG5jb25zdCBqc29uR2V0ID0gKG9iaiwgcGF0aCkgPT4ge1xuICBpZiAoIW9iaikgcmV0dXJuIG51bGw7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHBhdGhBcnJheVtpXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aCA9IHBhdGhBcnJheS5zbGljZShpICsgMSkuam9pbihcIi5cIik7XG4gICAgICAgIGNvbnN0IHN1YkFycmF5ID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFtzdWJLZXldICE9PSB1bmRlZmluZWQgJiYgY3VycmVudFtzdWJLZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWYWx1ZSA9IGpzb25HZXQoY3VycmVudFtzdWJLZXldLCBzdWJQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdWJWYWx1ZSAhPT0gbnVsbCAmJiBzdWJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN1YkFycmF5LnB1c2goc3ViVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViQXJyYXk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoQXJyYXlbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBwcmVwYXJlQ29yZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IG5hdlB0ciA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I7XG5cbiAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnREYXRhPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50O1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlBsYXRmb3JtXCIsIHBsYXRmb3JtKTtcblxuICAvKiB3aW5kb3cgdmlldyBhcmVhICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1BSYXRpb1wiLCB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG5cbiAgY29uc3QgYXZhaWxXaW5kb3cgPSB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbFdpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbEhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93QXZhaWxcIiwgYXZhaWxXaW5kb3cpO1xuXG4gIGNvbnN0IHdpbmRvd0RlcHRoID0gd2luZG93UHRyLnNjcmVlbj8uY29sb3JEZXB0aCArIFwiLVwiICsgd2luZG93UHRyLnNjcmVlbj8ucGl4ZWxEZXB0aDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93RGVwdGhcIiwgd2luZG93RGVwdGgpO1xuXG4gIGNvbnN0IHZwb3J0U2hhcGUgPSB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LndpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LmhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93VnBvcnRcIiwgdnBvcnRTaGFwZSk7XG5cbiAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgIGxldCB3aWR0aCA9IHBhcnNlSW50KHNjcmVlbi53aWR0aCk7XG4gICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHBhcnNlSW50KHNjcmVlbi5oZWlnaHQpIDogMDtcbiAgICBpZiAod2lkdGggIT09IDAgJiYgaGVpZ2h0ICE9PSAwKSB7XG4gICAgICBjb25zdCBpT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChwbGF0Zm9ybSk7XG4gICAgICBpZiAoaU9TICYmIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgIC8vIGlvcyBwcm92aWRlcyBEUElzLCBuZWVkIHRvIG11bHRpcGx5XG4gICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQgKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvcmllbnRhdGlvbkFuZ2xlID0gd2luZG93UHRyLnNjcmVlbj8ub3JpZW50YXRpb24/LmFuZ2xlO1xuICAgICAgICBpZiAoTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDkwIHx8IE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSAyNzApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGxhbmRzY2FwZSBvcmllbnRhdGlvbiBzd2l0Y2ggdmFsdWVzIGZvciBhbGwgZXhjZXB0IGlvc1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSB3aWR0aDtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodDtcbiAgICAgICAgICBoZWlnaHQgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dcIiwgd2lkdGggKyBcInhcIiArIGhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyogbmF2aWdhdG9yICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhpc3RTaXplXCIsIHdpbmRvd1B0ci5oaXN0b3J5Py5sZW5ndGgpO1xuXG4gIC8vIGNoZWNrIGlmIHVzZXJBZ2VudERhdGEgaXMgc3VwcG9ydGVkIGFuZCB1c2VyQWdlbnQgaXMgbm90IGF2YWlsYWJsZSwgdXNlIGl0XG4gIGlmICghbmF2UHRyLnVzZXJBZ2VudCkge1xuICAgIGlmIChuYXZQdHIudXNlckFnZW50RGF0YSkge1xuICAgICAgLy8gdHVybiBicmFuZHMgYXJyYXkgaW50byBzdHJpbmdcbiAgICAgIGxldCBuYXZBZ2VudCA9IG5hdlB0cj8udXNlckFnZW50RGF0YT8uYnJhbmRzPy5tYXAoZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS5icmFuZCArIFwiOlwiICsgZS52ZXJzaW9uO1xuICAgICAgfSkuam9pbigpO1xuICAgICAgLy8gYWRkIG1vYmlsZSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSAobmF2UHRyPy51c2VyQWdlbnREYXRhPy5tb2JpbGUgPyBcIm1vYmlcIiA6IFwiIFwiKTtcbiAgICAgIC8vIGFkZCBwbGF0Zm9ybSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSBwbGF0Zm9ybTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdkFnZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2UHRyLnVzZXJBZ2VudCk7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIV0NvcmVzXCIsIG5hdlB0ci5oYXJkd2FyZUNvbmN1cnJlbmN5KTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2TGFuZ3VhZ2VcIiwgbmF2UHRyLmxhbmd1YWdlIHx8XG4gICAgbmF2UHRyLmJyb3dzZXJMYW5ndWFnZSB8fFxuICAgIG5hdlB0ci5zeXN0ZW1MYW5ndWFnZSB8fFxuICAgIG5hdlB0ci51c2VyTGFuZ3VhZ2UsXG4gICk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlRvdWNoXCIsIG5hdlB0ci5tYXhUb3VjaFBvaW50cyk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlZlbmRvclwiLCBuYXZQdHIudmVuZG9yKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaW50ZXJuZXRTcGVlZFwiLCB3aW5kb3dQdHIubmF2aWdhdG9yPy5jb25uZWN0aW9uPy5kb3dubGluayk7XG5cbiAgLyogbWlzY2VsbGFuZW91cyAqL1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRvbnR0cmFja1wiLCBuYXZQdHIuZG9Ob3RUcmFjayB8fCB3aW5kb3dQdHIuZG9Ob3RUcmFjayB8fCBuYXZQdHIubXNEb05vdFRyYWNrKTtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgY29uc3QgZmlyc3RTZXNzaW9uUmVmZXJyZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIpO1xuICBpZiAoIWZpcnN0U2Vzc2lvblJlZmVycmVyKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIGZpcnN0U2Vzc2lvblJlZmVycmVyKTtcbiAgfVxufTtcblxuY29uc3QgYWRkTWV0cmljcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB3aW5kb3dQdHIgPSB3aW5kb3cudG9wO1xuICBjb25zdCBwZXJmTWV0cmljcyA9IHt9O1xuICBjb25zdCBwZXJmTmF2aWdhdGlvbk1ldHJpY3MgPSB3aW5kb3dQdHIucGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIilbMF07XG4gIGlmICh3aW5kb3dQdHIucGVyZm9ybWFuY2UgJiYgcGVyZk5hdmlnYXRpb25NZXRyaWNzKSB7XG4gICAgcGVyZk1ldHJpY3MuY29ubmVjdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5yZXF1ZXN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MucmVzcG9uc2VFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MucmVxdWVzdFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kb20gPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kb21JbnRlcmFjdGl2ZSAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kb21Db21wbGV0ZSk7XG4gICAgcGVyZk1ldHJpY3MubG9hZCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZHVyYXRpb24gPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kdXJhdGlvbik7XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtZXRyaWNzXCIsIHBlcmZNZXRyaWNzKTtcbn07XG5cbi8vIFRPRE86IG1vdmUgdGhpcyB0byBhbiBcImVsZW1lbnQgY29sbGVjdG9yXCIgbW9kdWxlLCB0aGVuIGRhdGEgaXMgZXh0cmFjdGVkIGZyb20gcHJlLWNvbGxlY3RlZCBlbGVtZW50c1xuY29uc3QgZ2V0U09SR0FycmF5ID0gKCkgPT4ge1xuICBjb25zdCBzY2hlbWFPcmdFbHRzID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW3R5cGU9XFxcImFwcGxpY2F0aW9uL2xkK2pzb25cXFwiXVwiKTtcbiAgY29uc3Qgc29yZ0FycmF5ID0gW107XG5cbiAgZm9yIChjb25zdCBzVGFnIG9mIHNjaGVtYU9yZ0VsdHMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY250bnQgPSBzVGFnLnRleHRDb250ZW50O1xuICAgICAgY29uc3QganNvbmNvbnRlbnQgPSBKU09OLnBhcnNlKGNudG50KTtcbiAgICAgIHNvcmdBcnJheS5wdXNoKGpzb25jb250ZW50KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNvcmdBcnJheTtcbn07XG4iLCJpbXBvcnQge0xPR19BUElfVVJMfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlTW9uaXRvclwiKTtcbmNvbnN0IEhFQURFUlMgPSB7XG4gIHR5cGU6IFwidGV4dC9wbGFpblwiLFxufTtcblxuZXhwb3J0IGNsYXNzIE1vbml0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIG1vbml0b3JcIik7XG5cbiAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IG51bGw7XG5cbiAgICB0aGlzLmluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIEF0dGVtcHRzIHRvIHNlbmQgdGhlIGluaXRpYWwgbG9nIGJvZHkgKGJlYWdsZUluZm9MYXllcidzIGluaXRpYWwgcG9wdWxhdGlvbikgaW1tZWRpYXRlbHlcbiAgYXN5bmMgc2VuZExvZ3MoaW1tZWRpYXRlKSB7XG4gICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIGltbWVkaWF0ZSBzZW5kaW5nIGJsb2NrXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gYXdhaXRpbmcgc2NyYXBpbmdcIik7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlLCA1MCwgMTAwMCk7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIHNlbmRpbmcgbG9nc1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNlbmQgaW5pdGlhbCBsb2cgYm9keSBhbmQgaW5jcmVtZW50YWwgdXBkYXRlIGxvZ3Mgb24gY2xvc2VcbiAgYXN5bmMgaGFuZGxlQ2xvc2VFdmVudCgpIHtcbiAgICAvLyBpZiBpbml0aWFsIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHNlbmQgdXBkYXRlcyBhbmQgaW5mb2xheWVyIGluIG9uZSBiYXRjaFxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIC8vIGlmIG1haW4gbG9nIGhhcyBiZWVuIHNlbnQsIHNlbmQgaW5jcmVtZW50YWwgdXBkYXRlcyBvbmx5XG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpO1xuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlTWFpbkxvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlTWFpbkxvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXF1ZXN0IGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCkge1xuICAgIGlmICghdGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc1VwZGF0ZXNTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHRoZXJlIGlzIG5vIGluY3JlbWVudGFsIHlldFxuICAgICAgLy8gb3IgaWYgdGhlIHVwZGF0ZXMgaGF2ZSBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNDaGFuZ2VkID0gYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZ3MgY2hhbmdlIHN0YXR1czogXCIsIGhhc0NoYW5nZWQpO1xuICAgIGlmICghaGFzQ2hhbmdlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nRGF0YSA9IGF3YWl0IHRoaXMucGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpO1xuICAgIGlmIChsb2dEYXRhKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2VuZGluZyBpbmNyZW1lbnRhbCBsb2dzXCIsIGxvZ0RhdGEpO1xuICAgICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhsb2dEYXRhKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVBcnJpdmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIG9yIGFycml2YWwgbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZUFycml2YWxMb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpIHtcbiAgICBjb25zdCBod20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19od21cIik7XG4gICAgaWYgKHRoaXMuaGlnaFdhdGVyTWFyayAhPT0gaHdtKSB7XG4gICAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod207XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUFycml2YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFt1cmwsIGhhc2gsIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDAsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgdTogdXJsLFxuICAgICAgb25IYXNoUGN0OiBoYXNoLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZU1haW5Mb2dEYXRhKCkge1xuICAgIGNvbnN0IGJvZHkgPSB7fTtcbiAgICBpZiAoIXdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSkge1xuICAgICAgaWYgKCFrZXkuc3RhcnRzV2l0aChcIl9cIikgJiYgdmFsdWUgIT09IG51bGwpIGJvZHlba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBib2R5LmxjID0gMTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW2EsIGUsIGYsIHMsIG0sIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJmXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwibVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAyLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIGEsIGUsIGYsIHMsIG0sXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGV4aXQgZXZlbnQgbGlzdGVuZXJcIik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIGJlZm9yZXVubG9hZCBldmVudFwiKTtcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIHBhZ2VoaWRlIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICAvLyBJZiBwYWdlIGlzIG5vdCB2aXNpYmxlIGFuZCBkb2Vzbid0IGJlY29tZSB2aXNpYmxlIHdpdGhpbiAzMCBzZWNvbmRzLCBzZW5kIGxvZ3NcbiAgICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW4gdGltZW91dFwiKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICAgICAgfSwgMzAwMDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBDbGVhciB0aW1lb3V0IHdoZW4gcGFnZSBpcyB2aXNpYmxlIHRvIG1ha2Ugc3VyZSB3ZSBzZW5kIHRoZSBsYXRlc3QgbG9ncyBwb3NzaWJsZVxuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICB9XG5cbiAgcXVldWVMb2dzKGxvZ0RhdGEpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5zZW5kQmVhY29uIHx8IHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmZXRjaChMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICBjb25zdCBxdWV1ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCFxdWV1ZWQpIHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBxdWV1ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgICBpZiAocXVldWVkKSByZXR1cm47XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgaWYgKCFxdWV1ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3Mgbm90IHF1ZXVlZFwiKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb25pdG9yO1xuIiwiaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVMsIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtmZXRjaFRyZWF0bWVudHMsIGZldGNoVHJlYXRtZW50V2VpZ2h0c30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIik7XG5cbmNsYXNzIFRyZWF0bWVudFJlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gYm9keTtcbiAgICB0aGlzLnRyZWF0bWVudHMgPSB0cmVhdG1lbnRzO1xuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gICAgdGhpcy5jdXJyZW50UGFnZVR5cGUgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudHMoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkxvYWRpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB7VFJFQVRNRU5UU30gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gICAgY29uc3QgdHJlYXRtZW50c09iaiA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFRSRUFUTUVOVFMpKTtcbiAgICBsZXQgdHJlYXRtZW50cyA9IHRyZWF0bWVudHNPYmo/LnRyZWF0bWVudHM7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdHJlYXRtZW50c09iaj8udGltZXN0YW1wO1xuICAgIGlmICghdHJlYXRtZW50cyB8fCAhdGltZXN0YW1wKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBub3QgZm91bmQgaW4gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgfVxuICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IGVsYXBzZWRIb3VycyA9IChEYXRlLm5vdygpIC0gdGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICBpZiAoZWxhcHNlZEhvdXJzID4gTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgYXJlIGV4cGlyZWRcIik7XG4gICAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgIHRyZWF0bWVudHMsXG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIuc3VjY2VzcyhcIlRyZWF0bWVudHMgYXJlIGxvYWRlZCBmcm9tIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50V2VpZ2h0cygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHdlaWdodHNPYmogPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLldFSUdIVFMpO1xuICAgICAgaWYgKHdlaWdodHNPYmopIHtcbiAgICAgICAgd2VpZ2h0c09iaiA9IEpTT04ucGFyc2Uod2VpZ2h0c09iaik7XG4gICAgICAgIGlmICh3ZWlnaHRzT2JqLnRpbWVzdGFtcCkge1xuICAgICAgICAgIGNvbnN0IGVsYXBzZWRIb3VycyA9IChEYXRlLm5vdygpIC0gd2VpZ2h0c09iai50aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgICAgICBpZiAoZWxhcHNlZEhvdXJzIDwgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMpIHJldHVybiB3ZWlnaHRzT2JqLndlaWdodHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdlaWdodHNPYmogPSBhd2FpdCBmZXRjaFRyZWF0bWVudFdlaWdodHMoKTtcbiAgICAgIGlmICghd2VpZ2h0c09iaikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHdlaWdodHNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgd2VpZ2h0c09iaiA9IHt3ZWlnaHRzOiB3ZWlnaHRzT2JqLCB0aW1lc3RhbXA6IERhdGUubm93KCl9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5XRUlHSFRTLCBKU09OLnN0cmluZ2lmeSh3ZWlnaHRzT2JqKSk7XG4gICAgICByZXR1cm4gd2VpZ2h0c09iai53ZWlnaHRzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0TWF0Y2hlZFRyZWF0bWVudHMoZGVidWdNb2RlKSB7XG4gICAgbGV0IENQVCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2VSdWxlcy5QYWdlVHlwZVwiLCB0cnVlKTtcbiAgICBDUFQgPSBDUFQ/LlswXSB8fCBudWxsO1xuICAgIGlmICghQ1BUKSByZXR1cm4gW107XG4gICAgdGhpcy5jdXJyZW50UGFnZVR5cGUgPSBDUFQ7XG4gICAgbGV0IG1hdGNoZWRUcmVhdG1lbnRzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICBpZiAobWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgSlNPTi5wYXJzZShtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHMuZmlsdGVyKChtdCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrUGFnZVR5cGUobXQucGFnZVR5cGVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvZ2dlci5sb2coYCR7bWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RofSB0cmVhdG1lbnRzIHVzZXIgc2VnbWVudCBtYXRjaGVkYCk7XG4gICAgICAgIHJldHVybiBtYXRjaGVkVHJlYXRtZW50cztcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgZ2V0dGluZyBtYXRjaGVkIHJvYm90czpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICAgIG1hdGNoZWRUcmVhdG1lbnRzID0gW107XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gdGhpcztcbiAgICBjb25zdCB1c2VyU2VnbWVudCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJzXCIpO1xuICAgIGlmICghdXNlclNlZ21lbnQpIHJldHVybiBudWxsO1xuICAgIGlmICh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgICBjb25zdCB1c2VyU2VnbWVudFdlaWdodHMgPSB0cmVhdG1lbnRXZWlnaHRzW3VzZXJTZWdtZW50XTtcbiAgICAgIGlmICghdXNlclNlZ21lbnRXZWlnaHRzKSByZXR1cm4gW107XG4gICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0cmVhdG1lbnRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ZWRXZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8ud2VpZ2h0O1xuICAgICAgICBpZiAoIXNlZ21lbnRlZFdlaWdodCkge1xuICAgICAgICAgIGlmICh0cmVhdG1lbnQuZGVwZW5kYW50X29uX3RyZWF0bWVudCkge1xuICAgICAgICAgICAgc2VnbWVudGVkV2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5kZXBlbmRhbnRfb25fdHJlYXRtZW50XT8ud2VpZ2h0O1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGVidWdNb2RlICYmIGRlYnVnTW9kZSA9PT0gMSkgc2VnbWVudGVkV2VpZ2h0ID0gMTAwO1xuICAgICAgICAgIGlmICghc2VnbWVudGVkV2VpZ2h0KSBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0cmVhdG1lbnQud2VpZ2h0ID0gc2VnbWVudGVkV2VpZ2h0O1xuICAgICAgICBpZiAoIXRyZWF0bWVudC5hY3Rpb25zLnNvbWUoKGEpID0+IGEudmFyaWFudHMpKSB7XG4gICAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaCh0cmVhdG1lbnQpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIHRyZWF0bWVudC5hY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24udmFyaWFudHMpIGNvbnRpbnVlO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudEtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb24udmFyaWFudHMpKSB7XG4gICAgICAgICAgICBpZiAodXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzICYmIHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0udmFyaWFudHNbdmFyaWFudEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLnB1c2godHJlYXRtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeShtYXRjaGVkVHJlYXRtZW50cykpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSk7XG4gIH1cblxuICBjaGVja1BhZ2VUeXBlKHBhZ2VUeXBlcykge1xuICAgIGNvbnN0IHtjdXJyZW50UGFnZVR5cGV9ID0gdGhpcztcbiAgICBpZiAocGFnZVR5cGVzID09PSBudWxsIHx8IHBhZ2VUeXBlcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFnZVR5cGVzKSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlBhZ2UgVHlwZXMgc2hvdWxkIGJlIGFuIGFycmF5XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAocGFnZVR5cGVzWzBdLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBwYWdlVHlwZXMgPSBwYWdlVHlwZXMubWFwKChwdCkgPT4gcHQuc3Vic3RyKDEpKTtcbiAgICAgIHJldHVybiAhcGFnZVR5cGVzLmluY2x1ZGVzKGN1cnJlbnRQYWdlVHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBwYWdlVHlwZXMuaW5jbHVkZXMoY3VycmVudFBhZ2VUeXBlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJSZXBsYWNlVXRpbHNcIik7XG5cbmNvbnN0IHJlcGxhY2VyID0gYXN5bmMgKHZhbHVlLCByZXBsYWNlRm4pID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBbaSwgdmFsXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBsYWNlRm4gPSBBcnJheS5pc0FycmF5KHJlcGxhY2VGbikgPyByZXBsYWNlRm5baV0gOiByZXBsYWNlRm4gfHwgXCJcIjtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihjdXJyZW50UmVwbGFjZUZuKTtcbiAgICAgICAgdmFsdWVbaV0gPSByZXBsYWNlQWxsKHZhbCwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZVtpXSA9IHJlcGxhY2VGbkV4ZWN1dG9yKGN1cnJlbnRSZXBsYWNlRm4sIHZhbCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSkge1xuICAgIGZvciAoY29uc3QgckZuIG9mIHJlcGxhY2VGbikge1xuICAgICAgaWYgKHR5cGVvZiByRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IockZuKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyRm4sIHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbik7XG4gICAgICB2YWx1ZSA9IHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSwgc2luZ2xlID0gZmFsc2UpIHtcbiAgaWYgKHJlcGxhY2VGbiAmJiB2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkV4ZWN1dGluZyByZXBsYWNlIGZ1bmN0aW9uOiBcIiwgcmVwbGFjZUZuKTtcbiAgICBjb25zdCByZXBsYWNlRnVuY3Rpb24gPSBGdW5jdGlvbihyZXBsYWNlRm4pO1xuICAgIGlmIChzaW5nbGUpIHJldHVybiB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICAgIHJldHVybiByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKSB7XG4gIGNvbnN0IHtzdG9yYWdlLCBrZXksIGtleUZhbGxiYWNrLCB0eXBlfSA9IHJlcGxhY2VGbjtcbiAgc3dpdGNoIChzdG9yYWdlKSB7XG4gICAgY2FzZSBcInNlc3Npb25cIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBudWxsO1xuICAgICAgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlGYWxsYmFjayk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSBKU09OLnBhcnNlKHJlcGxhY2VWYWwpO1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSByZXBsYWNlVmFsW3JlcGxhY2VWYWwubGVuZ3RoIC0gMV1bdHlwZV07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkIG5vdCBwYXJzZSAke3JlcGxhY2VWYWx9YCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgICBjYXNlIFwiaW5mby1sYXllclwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5RmFsbGJhY2spO1xuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VyO1xuIiwiY29uc3QgaW5zdGFuY2VPZkFueSA9IChvYmplY3QsIGNvbnN0cnVjdG9ycykgPT4gY29uc3RydWN0b3JzLnNvbWUoKGMpID0+IG9iamVjdCBpbnN0YW5jZW9mIGMpO1xuXG5sZXQgaWRiUHJveHlhYmxlVHlwZXM7XG5sZXQgY3Vyc29yQWR2YW5jZU1ldGhvZHM7XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldElkYlByb3h5YWJsZVR5cGVzKCkge1xuICAgIHJldHVybiAoaWRiUHJveHlhYmxlVHlwZXMgfHxcbiAgICAgICAgKGlkYlByb3h5YWJsZVR5cGVzID0gW1xuICAgICAgICAgICAgSURCRGF0YWJhc2UsXG4gICAgICAgICAgICBJREJPYmplY3RTdG9yZSxcbiAgICAgICAgICAgIElEQkluZGV4LFxuICAgICAgICAgICAgSURCQ3Vyc29yLFxuICAgICAgICAgICAgSURCVHJhbnNhY3Rpb24sXG4gICAgICAgIF0pKTtcbn1cbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxuZnVuY3Rpb24gZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKSB7XG4gICAgcmV0dXJuIChjdXJzb3JBZHZhbmNlTWV0aG9kcyB8fFxuICAgICAgICAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgPSBbXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmFkdmFuY2UsXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZVByaW1hcnlLZXksXG4gICAgICAgIF0pKTtcbn1cbmNvbnN0IGN1cnNvclJlcXVlc3RNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNhY3Rpb25Eb25lTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHdyYXAocmVxdWVzdC5yZXN1bHQpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgfSk7XG4gICAgcHJvbWlzZVxuICAgICAgICAudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgLy8gU2luY2UgY3Vyc29yaW5nIHJldXNlcyB0aGUgSURCUmVxdWVzdCAoKnNpZ2gqKSwgd2UgY2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbFxuICAgICAgICAvLyAoc2VlIHdyYXBGdW5jdGlvbikuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQkN1cnNvcikge1xuICAgICAgICAgICAgY3Vyc29yUmVxdWVzdE1hcC5zZXQodmFsdWUsIHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhdGNoaW5nIHRvIGF2b2lkIFwiVW5jYXVnaHQgUHJvbWlzZSBleGNlcHRpb25zXCJcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICAvLyBUaGlzIG1hcHBpbmcgZXhpc3RzIGluIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBidXQgZG9lc24ndCBkb2Vzbid0IGV4aXN0IGluIHRyYW5zZm9ybUNhY2hlLiBUaGlzXG4gICAgLy8gaXMgYmVjYXVzZSB3ZSBjcmVhdGUgbWFueSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QuXG4gICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChwcm9taXNlLCByZXF1ZXN0KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih0eCkge1xuICAgIC8vIEVhcmx5IGJhaWwgaWYgd2UndmUgYWxyZWFkeSBjcmVhdGVkIGEgZG9uZSBwcm9taXNlIGZvciB0aGlzIHRyYW5zYWN0aW9uLlxuICAgIGlmICh0cmFuc2FjdGlvbkRvbmVNYXAuaGFzKHR4KSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHR4LmVycm9yIHx8IG5ldyBET01FeGNlcHRpb24oJ0Fib3J0RXJyb3InLCAnQWJvcnRFcnJvcicpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XG4gICAgfSk7XG4gICAgLy8gQ2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbC5cbiAgICB0cmFuc2FjdGlvbkRvbmVNYXAuc2V0KHR4LCBkb25lKTtcbn1cbmxldCBpZGJQcm94eVRyYXBzID0ge1xuICAgIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdHJhbnNhY3Rpb24uZG9uZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZG9uZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uRG9uZU1hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBvYmplY3RTdG9yZU5hbWVzIGJlY2F1c2Ugb2YgRWRnZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnb2JqZWN0U3RvcmVOYW1lcycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lm9iamVjdFN0b3JlTmFtZXMgfHwgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFrZSB0eC5zdG9yZSByZXR1cm4gdGhlIG9ubHkgc3RvcmUgaW4gdGhlIHRyYW5zYWN0aW9uLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG1hbnkuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzFdXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIDogcmVjZWl2ZXIub2JqZWN0U3RvcmUocmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRWxzZSB0cmFuc2Zvcm0gd2hhdGV2ZXIgd2UgZ2V0IGJhY2suXG4gICAgICAgIHJldHVybiB3cmFwKHRhcmdldFtwcm9wXSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbiAmJlxuICAgICAgICAgICAgKHByb3AgPT09ICdkb25lJyB8fCBwcm9wID09PSAnc3RvcmUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0O1xuICAgIH0sXG59O1xuZnVuY3Rpb24gcmVwbGFjZVRyYXBzKGNhbGxiYWNrKSB7XG4gICAgaWRiUHJveHlUcmFwcyA9IGNhbGxiYWNrKGlkYlByb3h5VHJhcHMpO1xufVxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAvLyBEdWUgdG8gZXhwZWN0ZWQgb2JqZWN0IGVxdWFsaXR5ICh3aGljaCBpcyBlbmZvcmNlZCBieSB0aGUgY2FjaGluZyBpbiBgd3JhcGApLCB3ZVxuICAgIC8vIG9ubHkgY3JlYXRlIG9uZSBuZXcgZnVuYyBwZXIgZnVuYy5cbiAgICAvLyBFZGdlIGRvZXNuJ3Qgc3VwcG9ydCBvYmplY3RTdG9yZU5hbWVzIChib29vKSwgc28gd2UgcG9seWZpbGwgaXQgaGVyZS5cbiAgICBpZiAoZnVuYyA9PT0gSURCRGF0YWJhc2UucHJvdG90eXBlLnRyYW5zYWN0aW9uICYmXG4gICAgICAgICEoJ29iamVjdFN0b3JlTmFtZXMnIGluIElEQlRyYW5zYWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IGZ1bmMuY2FsbCh1bndyYXAodGhpcyksIHN0b3JlTmFtZXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLnNldCh0eCwgc3RvcmVOYW1lcy5zb3J0ID8gc3RvcmVOYW1lcy5zb3J0KCkgOiBbc3RvcmVOYW1lc10pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAodHgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBDdXJzb3IgbWV0aG9kcyBhcmUgc3BlY2lhbCwgYXMgdGhlIGJlaGF2aW91ciBpcyBhIGxpdHRsZSBtb3JlIGRpZmZlcmVudCB0byBzdGFuZGFyZCBJREIuIEluXG4gICAgLy8gSURCLCB5b3UgYWR2YW5jZSB0aGUgY3Vyc29yIGFuZCB3YWl0IGZvciBhIG5ldyAnc3VjY2Vzcycgb24gdGhlIElEQlJlcXVlc3QgdGhhdCBnYXZlIHlvdSB0aGVcbiAgICAvLyBjdXJzb3IuIEl0J3Mga2luZGEgbGlrZSBhIHByb21pc2UgdGhhdCBjYW4gcmVzb2x2ZSB3aXRoIG1hbnkgdmFsdWVzLiBUaGF0IGRvZXNuJ3QgbWFrZSBzZW5zZVxuICAgIC8vIHdpdGggcmVhbCBwcm9taXNlcywgc28gZWFjaCBhZHZhbmNlIG1ldGhvZHMgcmV0dXJucyBhIG5ldyBwcm9taXNlIGZvciB0aGUgY3Vyc29yIG9iamVjdCwgb3JcbiAgICAvLyB1bmRlZmluZWQgaWYgdGhlIGVuZCBvZiB0aGUgY3Vyc29yIGhhcyBiZWVuIHJlYWNoZWQuXG4gICAgaWYgKGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkuaW5jbHVkZXMoZnVuYykpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICAgICAgZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoY3Vyc29yUmVxdWVzdE1hcC5nZXQodGhpcykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICByZXR1cm4gd3JhcChmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncykpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgcmV0dXJuIHdyYXBGdW5jdGlvbih2YWx1ZSk7XG4gICAgLy8gVGhpcyBkb2Vzbid0IHJldHVybiwgaXQganVzdCBjcmVhdGVzIGEgJ2RvbmUnIHByb21pc2UgZm9yIHRoZSB0cmFuc2FjdGlvbixcbiAgICAvLyB3aGljaCBpcyBsYXRlciByZXR1cm5lZCBmb3IgdHJhbnNhY3Rpb24uZG9uZSAoc2VlIGlkYk9iamVjdEhhbmRsZXIpLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKVxuICAgICAgICBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odmFsdWUpO1xuICAgIGlmIChpbnN0YW5jZU9mQW55KHZhbHVlLCBnZXRJZGJQcm94eWFibGVUeXBlcygpKSlcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgaWRiUHJveHlUcmFwcyk7XG4gICAgLy8gUmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2sgaWYgd2UncmUgbm90IGdvaW5nIHRvIHRyYW5zZm9ybSBpdC5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB3cmFwKHZhbHVlKSB7XG4gICAgLy8gV2Ugc29tZXRpbWVzIGdlbmVyYXRlIG11bHRpcGxlIHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdCAoZWcgd2hlbiBjdXJzb3JpbmcpLCBiZWNhdXNlXG4gICAgLy8gSURCIGlzIHdlaXJkIGFuZCBhIHNpbmdsZSBJREJSZXF1ZXN0IGNhbiB5aWVsZCBtYW55IHJlc3BvbnNlcywgc28gdGhlc2UgY2FuJ3QgYmUgY2FjaGVkLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlJlcXVlc3QpXG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHZhbHVlKTtcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IHRyYW5zZm9ybWVkIHRoaXMgdmFsdWUgYmVmb3JlLCByZXVzZSB0aGUgdHJhbnNmb3JtZWQgdmFsdWUuXG4gICAgLy8gVGhpcyBpcyBmYXN0ZXIsIGJ1dCBpdCBhbHNvIHByb3ZpZGVzIG9iamVjdCBlcXVhbGl0eS5cbiAgICBpZiAodHJhbnNmb3JtQ2FjaGUuaGFzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKTtcbiAgICAvLyBOb3QgYWxsIHR5cGVzIGFyZSB0cmFuc2Zvcm1lZC5cbiAgICAvLyBUaGVzZSBtYXkgYmUgcHJpbWl0aXZlIHR5cGVzLCBzbyB0aGV5IGNhbid0IGJlIFdlYWtNYXAga2V5cy5cbiAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIHRyYW5zZm9ybUNhY2hlLnNldCh2YWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KG5ld1ZhbHVlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbn1cbmNvbnN0IHVud3JhcCA9ICh2YWx1ZSkgPT4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG5cbmV4cG9ydCB7IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBhcyBhLCBpbnN0YW5jZU9mQW55IGFzIGksIHJlcGxhY2VUcmFwcyBhcyByLCB1bndyYXAgYXMgdSwgd3JhcCBhcyB3IH07XG4iLCJpbXBvcnQgeyB3IGFzIHdyYXAsIHIgYXMgcmVwbGFjZVRyYXBzIH0gZnJvbSAnLi93cmFwLWlkYi12YWx1ZS5qcyc7XG5leHBvcnQgeyB1IGFzIHVud3JhcCwgdyBhcyB3cmFwIH0gZnJvbSAnLi93cmFwLWlkYi12YWx1ZS5qcyc7XG5cbi8qKlxuICogT3BlbiBhIGRhdGFiYXNlLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxuICogQHBhcmFtIHZlcnNpb24gU2NoZW1hIHZlcnNpb24uXG4gKiBAcGFyYW0gY2FsbGJhY2tzIEFkZGl0aW9uYWwgY2FsbGJhY2tzLlxuICovXG5mdW5jdGlvbiBvcGVuREIobmFtZSwgdmVyc2lvbiwgeyBibG9ja2VkLCB1cGdyYWRlLCBibG9ja2luZywgdGVybWluYXRlZCB9ID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbik7XG4gICAgY29uc3Qgb3BlblByb21pc2UgPSB3cmFwKHJlcXVlc3QpO1xuICAgIGlmICh1cGdyYWRlKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigndXBncmFkZW5lZWRlZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdXBncmFkZSh3cmFwKHJlcXVlc3QucmVzdWx0KSwgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgd3JhcChyZXF1ZXN0LnRyYW5zYWN0aW9uKSwgZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJsb2NrZWQpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKGV2ZW50KSA9PiBibG9ja2VkKFxuICAgICAgICAvLyBDYXN0aW5nIGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQtRE9NLWxpYi1nZW5lcmF0b3IvcHVsbC8xNDA1XG4gICAgICAgIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIGV2ZW50KSk7XG4gICAgfVxuICAgIG9wZW5Qcm9taXNlXG4gICAgICAgIC50aGVuKChkYikgPT4ge1xuICAgICAgICBpZiAodGVybWluYXRlZClcbiAgICAgICAgICAgIGRiLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4gdGVybWluYXRlZCgpKTtcbiAgICAgICAgaWYgKGJsb2NraW5nKSB7XG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCd2ZXJzaW9uY2hhbmdlJywgKGV2ZW50KSA9PiBibG9ja2luZyhldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCBldmVudCkpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgcmV0dXJuIG9wZW5Qcm9taXNlO1xufVxuLyoqXG4gKiBEZWxldGUgYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqL1xuZnVuY3Rpb24gZGVsZXRlREIobmFtZSwgeyBibG9ja2VkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSk7XG4gICAgaWYgKGJsb2NrZWQpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKGV2ZW50KSA9PiBibG9ja2VkKFxuICAgICAgICAvLyBDYXN0aW5nIGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQtRE9NLWxpYi1nZW5lcmF0b3IvcHVsbC8xNDA1XG4gICAgICAgIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50KSk7XG4gICAgfVxuICAgIHJldHVybiB3cmFwKHJlcXVlc3QpLnRoZW4oKCkgPT4gdW5kZWZpbmVkKTtcbn1cblxuY29uc3QgcmVhZE1ldGhvZHMgPSBbJ2dldCcsICdnZXRLZXknLCAnZ2V0QWxsJywgJ2dldEFsbEtleXMnLCAnY291bnQnXTtcbmNvbnN0IHdyaXRlTWV0aG9kcyA9IFsncHV0JywgJ2FkZCcsICdkZWxldGUnLCAnY2xlYXInXTtcbmNvbnN0IGNhY2hlZE1ldGhvZHMgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB7XG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSURCRGF0YWJhc2UgJiZcbiAgICAgICAgIShwcm9wIGluIHRhcmdldCkgJiZcbiAgICAgICAgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYWNoZWRNZXRob2RzLmdldChwcm9wKSlcbiAgICAgICAgcmV0dXJuIGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApO1xuICAgIGNvbnN0IHRhcmdldEZ1bmNOYW1lID0gcHJvcC5yZXBsYWNlKC9Gcm9tSW5kZXgkLywgJycpO1xuICAgIGNvbnN0IHVzZUluZGV4ID0gcHJvcCAhPT0gdGFyZ2V0RnVuY05hbWU7XG4gICAgY29uc3QgaXNXcml0ZSA9IHdyaXRlTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSk7XG4gICAgaWYgKFxuICAgIC8vIEJhaWwgaWYgdGhlIHRhcmdldCBkb2Vzbid0IGV4aXN0IG9uIHRoZSB0YXJnZXQuIEVnLCBnZXRBbGwgaXNuJ3QgaW4gRWRnZS5cbiAgICAhKHRhcmdldEZ1bmNOYW1lIGluICh1c2VJbmRleCA/IElEQkluZGV4IDogSURCT2JqZWN0U3RvcmUpLnByb3RvdHlwZSkgfHxcbiAgICAgICAgIShpc1dyaXRlIHx8IHJlYWRNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtZXRob2QgPSBhc3luYyBmdW5jdGlvbiAoc3RvcmVOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6IHVuZGVmaW5lZCBnemlwcHMgYmV0dGVyLCBidXQgZmFpbHMgaW4gRWRnZSA6KFxuICAgICAgICBjb25zdCB0eCA9IHRoaXMudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknKTtcbiAgICAgICAgbGV0IHRhcmdldCA9IHR4LnN0b3JlO1xuICAgICAgICBpZiAodXNlSW5kZXgpXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQuaW5kZXgoYXJncy5zaGlmdCgpKTtcbiAgICAgICAgLy8gTXVzdCByZWplY3QgaWYgb3AgcmVqZWN0cy5cbiAgICAgICAgLy8gSWYgaXQncyBhIHdyaXRlIG9wZXJhdGlvbiwgbXVzdCByZWplY3QgaWYgdHguZG9uZSByZWplY3RzLlxuICAgICAgICAvLyBNdXN0IHJlamVjdCB3aXRoIG9wIHJlamVjdGlvbiBmaXJzdC5cbiAgICAgICAgLy8gTXVzdCByZXNvbHZlIHdpdGggb3AgdmFsdWUuXG4gICAgICAgIC8vIE11c3QgaGFuZGxlIGJvdGggcHJvbWlzZXMgKG5vIHVuaGFuZGxlZCByZWplY3Rpb25zKVxuICAgICAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRhcmdldFt0YXJnZXRGdW5jTmFtZV0oLi4uYXJncyksXG4gICAgICAgICAgICBpc1dyaXRlICYmIHR4LmRvbmUsXG4gICAgICAgIF0pKVswXTtcbiAgICB9O1xuICAgIGNhY2hlZE1ldGhvZHMuc2V0KHByb3AsIG1ldGhvZCk7XG4gICAgcmV0dXJuIG1ldGhvZDtcbn1cbnJlcGxhY2VUcmFwcygob2xkVHJhcHMpID0+ICh7XG4gICAgLi4ub2xkVHJhcHMsXG4gICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxuICAgIGhhczogKHRhcmdldCwgcHJvcCkgPT4gISFnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5oYXModGFyZ2V0LCBwcm9wKSxcbn0pKTtcblxuZXhwb3J0IHsgZGVsZXRlREIsIG9wZW5EQiB9O1xuIiwiY29uc3QgY29uZmlnID0ge1xuICBkYk5hbWU6IFwiYmVhZ2xlX2NhY2hlXCIsXG4gIHZlcnNpb246IDEsXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJpbmZvQ2FjaGVcIixcbiAgICBpbmRleGVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiaXhfc2t1XCIsXG4gICAgICAgIGZpZWxkczogXCJza3VcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJza3VcIn0sXG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiXG5pbXBvcnQge29wZW5EQn0gZnJvbSBcImlkYlwiO1xuaW1wb3J0IHtmZXRjaFByb2R1Y3RJbmZvfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnlcIik7XG5jbGFzcyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgYXN5bmMgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICBjb25zdCB7ZGJOYW1lLCB2ZXJzaW9ufSA9IGNvbmZpZztcbiAgICBjb25zdCBkYiA9IGF3YWl0IG9wZW5EQihkYk5hbWUsIHZlcnNpb24sIHtcbiAgICAgIHVwZ3JhZGUoZGIsIG9sZFZlcnNpb24pIHtcbiAgICAgICAgc3dpdGNoIChvbGRWZXJzaW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZGIuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLmluZGV4ZWREQiA9IGRiO1xuICB9XG5cbiAgYXN5bmMgZ2V0REIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuaW5kZXhlZERCKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUHJvZHVjdCBpbmZvIGRiIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCAzMDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldFN0b3JlKHJlYWR3cml0ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERCKCk7XG4gICAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCByZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKS5zdG9yZTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUocGF5bG9hZCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5nZXRTdG9yZSh0cnVlKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgY29uc3Qgc2F2ZVByb21pc2VzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGxvYWQgb2YgcGF5bG9hZCkge1xuICAgICAgICBsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgc2F2ZVByb21pc2VzLnB1c2goc3RvcmUucHV0KGxvYWQpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHNhdmVQcm9taXNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBheWxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgYXdhaXQgc3RvcmUucHV0KHBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5nZXRTdG9yZSh0cnVlKTtcbiAgICBhd2FpdCBzdG9yZS5jbGVhcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzeW5jIGdldChza3UpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0REIoKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBkYi5nZXQoY29uZmlnLnN0b3JlLm5hbWUsIHNrdSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIGNvdW50KCkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvdW50KGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q3Vyc29yKCkge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREQigpO1xuICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IGRiLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lKS5zdG9yZS5vcGVuQ3Vyc29yKCk7XG4gICAgcmV0dXJuIGN1cnNvcjtcbiAgfVxuXG4gIGFzeW5jIHBlcnNpc3RQcm9kdWN0SW5mbygpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJjaGVjay1leGlzdGluZy1wcm9kLWluZm9cIik7XG4gICAgY29uc3QgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IHRoaXMuZ2V0Q3Vyc29yKCk7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBjdXJzb3IudmFsdWUudGltZXN0YW1wO1xuICAgICAgY29uc3QgZWxhcHNlZFNlY29uZHMgPSAoRGF0ZS5ub3coKSAvIDEwMDApIC0gdGltZXN0YW1wO1xuICAgICAgLy8gUmUtZmV0Y2ggcHJvZHVjdCBpbmZvIG9uY2UgYSBkYXlcbiAgICAgIGlmIChlbGFwc2VkU2Vjb25kcyA8IDg2NDAwKSByZXR1cm47XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGlzIGV4cGlyZWRcIik7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoaW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb1Byb21pc2UgPSBmZXRjaFByb2R1Y3RJbmZvKCk7XG4gICAgbGV0IGNsZWFyUHJvbWlzZSA9IG51bGw7XG4gICAgaWYgKGV4aXN0aW5nUHJvZEluZm8pIGNsZWFyUHJvbWlzZSA9IHRoaXMuY2xlYXIoKTtcbiAgICBjb25zdCBbcHJvZHVjdEluZm9BcnJheV0gPSBhd2FpdCBQcm9taXNlLmFsbChbcHJvZHVjdEluZm9Qcm9taXNlLCBjbGVhclByb21pc2VdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvQXJyYXkgfHwgIXByb2R1Y3RJbmZvQXJyYXkubGVuZ3RoKSByZXR1cm47XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC1wcm9kLWluZm9cIik7XG4gICAgYXdhaXQgdGhpcy5zYXZlKHRoaXMucHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwZXJzaXN0ZWQtcHJvZC1pbmZvXCIpO1xuICB9XG5cbiAgcHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICBjb25zdCBwYXlsb2FkcyA9IFtdO1xuICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBwcm9kdWN0SW5mb0FycmF5LnNoaWZ0KCk7XG4gICAgZmllbGROYW1lcy5zaGlmdCgpO1xuICAgIGZvciAoY29uc3QgaW5mbyBvZiBwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge3NrdTogaW5mby5zaGlmdCgpfTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXlsb2FkW2ZpZWxkTmFtZXNbaV1dID0gaW5mb1tpXSB8fCBudWxsO1xuICAgICAgfVxuICAgICAgcGF5bG9hZHMucHVzaChwYXlsb2FkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBheWxvYWRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnk7XG4iLCJpbXBvcnQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHtpZGJSZWFkeX0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IFN0b3JlID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgaW5zdGFuY2UgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGdldEluc3RhbmNlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICBhd2FpdCBpZGJSZWFkeSgpO1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5KCk7XG4gICAgICAgIC8vIEhpZGUgdGhlIGNvbnN0cnVjdG9yIHNvIHRoZSByZXR1cm5lZCBvYmplY3QgY2FuJ3QgYmUgbmV3J2QuLi5cbiAgICAgICAgaW5zdGFuY2UuY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG4gIH07XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQge3N0eWxlQXBwbGljYXRvciwgZGVsYXksIGlkbGVUaW1lciwgZ2V0VW5zZWN1cmVIYXNofSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7cmVwbGFjZUFsbCwgdHVya2lzaFRvTG93ZXJ9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUlksIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBJRExFX1RJTUVPVVR9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCByZXBsYWNlciBmcm9tIFwiLi9yZXBsYWNlLXV0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5QWN0aW9ucyhhY3Rpb25zKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVBcHBseUFjdGlvbnNcIik7XG4gIGNvbnN0IGRiID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBjb25zdCB7XG4gICAgICBvcGVyYXRvcixcbiAgICAgIHR5cGUsXG4gICAgICBhcHBseUV2ZW50LFxuICAgICAgY29udGVudFNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBzZWxlY3RvckZhbGxiYWNrLFxuICAgICAgbWRDb25kaXRpb24sXG4gICAgICBtb3ZlX3NlbGVjdG9yXzEsXG4gICAgICBtb3ZlX3NlbGVjdG9yXzIsXG4gICAgICByZXBsYWNlRm4sXG4gICAgICBwVHlwZSxcbiAgICAgIHByb2R1Y3RJbmZvU3RvcmFnZSxcbiAgICB9ID0gYWN0aW9uO1xuICAgIGlmIChvcGVyYXRvciA9PT0gXCJub29wXCIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJOb29wIE9wZXJhdG9yOiBObyBvcGVyYXRpb24gaXMgYXBwbGllZCBvbiB0YXJnZXQgXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCB7dmFsdWV9ID0gYWN0aW9uO1xuICAgIC8vIElmIGFuIGVsZW1lbnQgaXMgcGFzc2VkIHRvIHRyYW5zZm9ybWVyLCBzZWxlY3RvciBpcyByZWxhdGl2ZSB0byBwYXNzZWQgZWxlbWVudFxuICAgIGVsZW1lbnQgPSBlbGVtZW50ID8gZWxlbWVudC5maW5kKHNlbGVjdG9yKSA6ICQoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbWMgPSBtZENvbmRpdGlvbiA/IHdpbmRvdy5tYXRjaE1lZGlhKG1kQ29uZGl0aW9uKS5tYXRjaGVzIDogdHJ1ZTtcbiAgICBpZiAoIW1jKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTWVkaWEgY29uZGl0aW9uIG1pc21hdGNoOiBcIiwgbWRDb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAobW92ZV9zZWxlY3Rvcl8xICYmICFtb3ZlX3NlbGVjdG9yXzIpIHx8XG4gICAgICAobW92ZV9zZWxlY3Rvcl8yICYmICFtb3ZlX3NlbGVjdG9yXzEpXG4gICAgKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQm90aCBtb3ZlIHNlbGVjdG9ycyBhcmUgcmVxdWlyZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChtb3ZlX3NlbGVjdG9yXzEgJiYgbW92ZV9zZWxlY3Rvcl8yKSB7XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8xKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMSBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8yKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMiBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3Qgc3BlY2lmaWVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGlmICghJChzZWxlY3RvckZhbGxiYWNrKS5sZW5ndGggJiYgb3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IFwibm8tc2VsZWN0b3JcIikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQ6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyeWluZyBmYWxsYmFjayBzZWxlY3RvcjogXCIsIHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmIChzZWxlY3RvckZhbGxiYWNrKSBlbGVtZW50ID0gJChzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFsbGJhY2sgc2VsZWN0b3Igbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlRm4pIHtcbiAgICAgIHZhbHVlID0gYXdhaXQgcmVwbGFjZXIodmFsdWUsIHJlcGxhY2VGbik7XG4gICAgfVxuICAgIGlmIChvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlbW92aW5nOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluc2VydFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJlZm9yZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYmVmb3JlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFmdGVyXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBhZnRlcjogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFmdGVyKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBlbmRpbmcgdmFsdWU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW9kYWxcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50Lm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAoZWxtID09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNwbGF5TW9kYWwodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwb3B1cFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJQb3B1cCBhbHJlYWR5IGRpc3BsYXllZCBpbiBzZXNzaW9uXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBQb3B1cDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwVHlwZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBjb25zdCBtb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJleGl0SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgZXhpdCBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3IsIGRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInJcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIgJiYgIXIuaW5jbHVkZXMoZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZGxlVGltZXIoSURMRV9USU1FT1VULCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3B5SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgY29weSBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhcHBlbmQgcG9wdXAgdG8gYm9keSBhZnRlciB0aW1lb3V0IGV4cGlyZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVBvcHVwKCk7XG4gICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBUeXBlOiAke3R5cGV9IG5vdCBmb3VuZCBmb3Igb3BlcmF0b3I6ICR7b3BlcmF0b3J9YCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiZWRpdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyB0ZXh0OiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQudGV4dCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgaHRtbDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lmh0bWwodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVBcHBsaWNhdG9yXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVDaGFuZ2VzTWFwID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiU3R5bGUgQ2hhbmdlcyBNYXA6IFwiLCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgICAgc3R5bGVBcHBsaWNhdG9yKGVsZW1lbnQsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWRkQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBhZGRkaW5nIGNsYXNzIHRvICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlbW92ZUNsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgcmVtb3ZlIGNsYXNzIGZyb20gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG9jdW1lbnRUaXRsZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGNoYW5naW5nIGRvY3VtZW50IHRpdGxlIGZyb20gJHtlbGVtZW50fSB0byAke3ZhbHVlfWApO1xuICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09IFwidGFiQ2hhbmdlXCIpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiY2F0Y2hpbmcgZXZlbnQgdGFiY2hhbmdlLi5cIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZSwgdmFsdWUsIG9yaWdpbmFsVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgfSwgMTUwMDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5rbm93biBlZGl0IHR5cGU6IFwiLCB0eXBlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJyZXBsYWNlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmc6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LnJlcGxhY2VBbGwodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic3dhcFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU3dhcHBpbmc6IFwiLCBtb3ZlX3NlbGVjdG9yXzEsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBjb25zdCBuMSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgbjIgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIHN3YXBOb2RlcyhuMSwgbjIpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5qZWN0c2NyaXB0XCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbmplY3Rpbmcgc2NyaXB0OiBcIiwgdmFsdWUpO1xuICAgICAgY29uc3Qgc2NyaXB0SUQgPSBnZXRVbnNlY3VyZUhhc2godmFsdWUpO1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2NyaXB0SUQpKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJTY3JpcHQgYWxyZWFkeSBpbiBwYWdlIVwiKTtcbiAgICAgIH0gZWxzZSBlbGVtZW50LmFwcGVuZChgPHNjcmlwdCBpZD0ke3NjcmlwdElEfT4ke3ZhbHVlfTwvc2NyaXB0PmApO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwibW92ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKGBNb3ZpbmcgJHttb3ZlX3NlbGVjdG9yXzF9IHRvICR7bW92ZV9zZWxlY3Rvcl8yfWApO1xuICAgICAgY29uc3Qgc291cmNlID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgZGVzdGluYXRpb24ucHJlcGVuZChzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicHJvZHVjdEluZm9Mb29rdXBcIikge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgZWxlbWVudC5iZWZvcmUocmVzKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInRleHQtdHJhbnNmb3JtXCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiY2FwaXRhbGl6ZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCBlIG9mIEFycmF5LmZyb20oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmIChlLmlubmVyVGV4dD8uaW5jbHVkZXMoXCJcXG5cIikpIHtcbiAgICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dCkuc3BsaXQoXCJcXG5cIikubWFwKChzZW50ZW5jZSkgPT5cbiAgICAgICAgICAgICAgICBzZW50ZW5jZS5zcGxpdChcIiBcIikubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSkuam9pbihcIiBcIiksXG4gICAgICAgICAgICAgICkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgICAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVW5rbm93biB0ZXh0LXRyYW5zZm9ybSB0eXBlXCIpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImFpLXN1Z2dlc3RcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0aXRsZS1jaGFuZ2VcIjoge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXR0aW5nIHRpdGxlIHN1Z2dlc3Rpb25zXCIpO1xuICAgICAgICAgIGNvbnN0IGZpbmFsVGl0bGUgPSBhd2FpdCBwcmVwYXJlRmluYWxUaXRsZSgpO1xuICAgICAgICAgIGlmICghZmluYWxUaXRsZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNhbm5vdCBhcHBseSB0aXRsZS1jaGFuZ2UgdGhlcmUgaXMgbm8gc3VnZ2VzdGlvbiFcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuY29udGVudHMoKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW52YWxpZC10aGlzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlVHlwZSA9PSAzO1xuICAgICAgICAgIH0pWzBdLm5vZGVWYWx1ZSA9IGZpbmFsVGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZC1kZXNjcmlwdGlvblwiOiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcImdldHRpbmcgZGVzY3JpcHRpb24gc3VnZ2VzdGlvbnNcIik7XG4gICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25FbG0gPSBhd2FpdCBwcmVwYXJlRGVzY0VsbSh2YWx1ZSk7XG4gICAgICAgICAgaWYgKCFkZXNjcmlwdGlvbkVsbSkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNhbm5vdCBhcHBseSBhZGQtZGVzY3JpcHRpb24gdGhlcmUgaXMgbm8gc3VnZ2VzdGlvbiFcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKGRlc2NyaXB0aW9uRWxtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcHJlcGFyZURlc2NFbG0gPSBhc3luYyAodmFsdWUpID0+IHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGRiLmdldChza3UpO1xuICAgIGlmICghcHJvZHVjdEluZm8/Lm1hcmtldGluZ0NvcHkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIGRlc2NyaXB0aW9uIGZvdW5kIGZvciBza3UgJHtza3V9YCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlZEh0bWxTdHJpbmcgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5tYXJrZXRpbmdDb3B5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHVwZGF0ZWRIdG1sU3RyaW5nO1xuICB9O1xuXG4gIGNvbnN0IHByZXBhcmVGaW5hbFRpdGxlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHNrdSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwZHAuc2t1XCIsIHRydWUpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KHNrdSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mbz8udGl0bGVBdWdtZW50KSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBObyB0aXRsZSBzdWdnZXN0aW9uIGZvdW5kIGZvciBza3UgJHtza3V9YCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gcHJvZHVjdEluZm8udGl0bGVBdWdtZW50ICsgYCAoJHtza3V9KWA7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBjb25zdCByZXBsYWNlV2l0aFZhbCA9ICh2YWx1ZSwgaHRtbFN0cikgPT4ge1xuICAgIGlmICh2YWx1ZSAmJiBodG1sU3RyLmluY2x1ZGVzKFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIikpIHtcbiAgICAgIGh0bWxTdHIgPSByZXBsYWNlQWxsKGh0bWxTdHIsIFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIiwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbFN0cjtcbiAgfTtcblxuICBjb25zdCBnZXRQcm9kdWN0SW5mbyA9IGFzeW5jICh0eXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKSA9PiB7XG4gICAgLy8gZ2V0IGtleXMgb2YgcHJvZHVjdEluZm9cbiAgICBjb25zdCBza3VMaXN0ID0gcHJvZHVjdEluZm9TdG9yYWdlID09PSBcImJhc2tldFwiID9cbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIiwgdHJ1ZSkgOlxuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgdHJ1ZSk7XG4gICAgbGV0IHJlcyA9IG51bGw7XG4gICAgaWYgKCFza3VMaXN0IHx8IHNrdUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc2t1IGZvdW5kXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZGIuZ2V0KHNrdUxpc3RbMF0pO1xuICAgIGlmICghcHJvZHVjdEluZm8pIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBwcm9kdWN0IGluZm8gZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTUudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHRyYW5zY2F0aW9uSW4yV2Vla3MgXCIsIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIEFkZFRvQ2FydENvdW50IFwiLCBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICAgIHJlcyA9IHJlcGxhY2VXaXRoVmFsKHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgcHJvZHVjdFZpZXdDb3VudCBmb3JcIiwgcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwibm8gc3VjaCB0eXBlIGZvdW5kIGZvciBwcm9kdWN0SW5mb0xvb2t1cCBvcGVyYXRvcjogXCIrIHR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGFjdGlvbi5lbGlnaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgYWN0aW9uLmVsaWdpYmxlRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHJhbnNmb3JtZXIoYWN0aW9uLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHJhbnNmb3JtZXIoYWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkbid0IGFwcGx5IGFjdGlvbiAke0pTT04uc3RyaW5naWZ5KGFjdGlvbil9IHdpdGggZXJyb3IgJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvci1hcHBseWluZy1hY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkFjdGlvbkNvbmRpdGlvblV0aWxzXCIpO1xuXG5jb25zdCBjaGVja0FjdGlvbkNvbmRpdGlvbiA9IGFzeW5jIChjb25kaXRpb24pID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkFjdGlvbiBjb25kaXRpb24gZm91bmQ6IFwiLCBjb25kaXRpb24pO1xuICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gW107XG4gIGNvbnN0IHthdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgb3BlcmF0b3IsIHNlbGVjdG9yLCB0eXBlLCB2YWx1ZSwgY2hhaW59ID0gY29uZGl0aW9uO1xuICBjb25zdCBjb25kaXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBjb25kaXRpb25FbGVtZW50cykge1xuICAgIGlmIChhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIHR5cGUsIG9wZXJhdG9yLCBhdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUsIGNoYWluKSkge1xuICAgICAgZWxpZ2libGVFbGVtZW50cy5wdXNoKCQoZWxlbWVudCkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWxpZ2libGVFbGVtZW50cztcbn07XG5cbmNvbnN0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIgPSBhc3luYyAoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTa3UgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgY29uc3QgZGIgPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpO1xuICAgICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBkYi5nZXQoZWxlbWVudFNrdSk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwcm9kdWN0SW5mbz8uW29wZXJhdG9yXTtcbiAgICAgIC8vIHJ1blRpbWVWYWx1ZSBtYXkgYmUgMFxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fCBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUHJvZHVjdCBpbmZvIGlzIGVtcHR5XCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGNoYWluKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgY2hhaW4udHlwZSwgY2hhaW4ub3BlcmF0b3IsXG4gICAgICAgICAgICBjaGFpbi5hdHRyaWJ1dGUsIGNoYWluLmlubmVyX2NvbmRpdGlvbiwgY2hhaW4udmFsdWUsIGNoYWluLmNoYWluKTtcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXNlIFwiZnVuY3Rpb25cIjoge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZm4gPSBGdW5jdGlvbihcImVsXCIsIG9wZXJhdG9yKTtcbiAgICAgICAgcmV0dXJuIGZuKGVsZW1lbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBleGVjdXRpbmcgZnVuY3Rpb24gYWN0aW9uIGNvbmRpdGlvblwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tBY3Rpb25Db25kaXRpb247XG4iLCJjb25zdCBFX1RJTUVPVVQgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgd2hpbGUgd2FpdGluZyBmb3IgbXV0ZXggdG8gYmVjb21lIGF2YWlsYWJsZScpO1xuY29uc3QgRV9BTFJFQURZX0xPQ0tFRCA9IG5ldyBFcnJvcignbXV0ZXggYWxyZWFkeSBsb2NrZWQnKTtcbmNvbnN0IEVfQ0FOQ0VMRUQgPSBuZXcgRXJyb3IoJ3JlcXVlc3QgZm9yIGxvY2sgY2FuY2VsZWQnKTtcblxudmFyIF9fYXdhaXRlciQyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBTZW1hcGhvcmUge1xuICAgIGNvbnN0cnVjdG9yKF92YWx1ZSwgX2NhbmNlbEVycm9yID0gRV9DQU5DRUxFRCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IF92YWx1ZTtcbiAgICAgICAgdGhpcy5fY2FuY2VsRXJyb3IgPSBfY2FuY2VsRXJyb3I7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVycyA9IFtdO1xuICAgIH1cbiAgICBhY3F1aXJlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdLnB1c2goeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQgPSAxKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgcmVsZWFzZV0gPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2sod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLnB1c2gocmVzb2x2ZSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSA8PSAwO1xuICAgIH1cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICByZWxlYXNlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gd2VpZ2h0O1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzLmZvckVhY2goKHF1ZXVlKSA9PiBxdWV1ZS5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkucmVqZWN0KHRoaXMuX2NhbmNlbEVycm9yKSkpO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgIH1cbiAgICBfZGlzcGF0Y2goKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBjb25zdCBxdWV1ZUVudHJ5ID0gKF9hID0gdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFxdWV1ZUVudHJ5KVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNXZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSAtPSB3ZWlnaHQ7XG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLl92YWx1ZSArIDE7XG4gICAgICAgICAgICBxdWV1ZUVudHJ5LnJlc29sdmUoW3ByZXZpb3VzVmFsdWUsIHRoaXMuX25ld1JlbGVhc2VyKHByZXZpb3VzV2VpZ2h0KV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RyYWluVW5sb2NrV2FpdGVycygpO1xuICAgIH1cbiAgICBfbmV3UmVsZWFzZXIod2VpZ2h0KSB7XG4gICAgICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBfZHJhaW5VbmxvY2tXYWl0ZXJzKCkge1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLmZvckVhY2goKHdhaXRlcikgPT4gd2FpdGVyKCkpO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIkMSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgTXV0ZXgge1xuICAgIGNvbnN0cnVjdG9yKGNhbmNlbEVycm9yKSB7XG4gICAgICAgIHRoaXMuX3NlbWFwaG9yZSA9IG5ldyBTZW1hcGhvcmUoMSwgY2FuY2VsRXJyb3IpO1xuICAgIH1cbiAgICBhY3F1aXJlKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDEodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbLCByZWxlYXNlcl0gPSB5aWVsZCB0aGlzLl9zZW1hcGhvcmUuYWNxdWlyZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlbGVhc2VyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUucnVuRXhjbHVzaXZlKCgpID0+IGNhbGxiYWNrKCkpO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLndhaXRGb3JVbmxvY2soKTtcbiAgICB9XG4gICAgcmVsZWFzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpKVxuICAgICAgICAgICAgdGhpcy5fc2VtYXBob3JlLnJlbGVhc2UoKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmNhbmNlbCgpO1xuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gd2l0aFRpbWVvdXQoc3luYywgdGltZW91dCwgdGltZW91dEVycm9yID0gRV9USU1FT1VUKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWNxdWlyZTogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodGltZW91dEVycm9yKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCBzeW5jLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsZWFzZSA9IEFycmF5LmlzQXJyYXkodGlja2V0KSA/IHRpY2tldFsxXSA6IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aWNrZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbGVhc2UgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRpY2tldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXRbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodGlja2V0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxlYXNlKHdlaWdodCkge1xuICAgICAgICAgICAgc3luYy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzeW5jLmNhbmNlbCgpO1xuICAgICAgICB9LFxuICAgICAgICB3YWl0Rm9yVW5sb2NrOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBzeW5jLndhaXRGb3JVbmxvY2sod2VpZ2h0KS50aGVuKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KHRpbWVvdXRFcnJvciksIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTG9ja2VkOiAoKSA9PiBzeW5jLmlzTG9ja2VkKCksXG4gICAgICAgIGdldFZhbHVlOiAoKSA9PiBzeW5jLmdldFZhbHVlKCksXG4gICAgICAgIHNldFZhbHVlOiAodmFsdWUpID0+IHN5bmMuc2V0VmFsdWUodmFsdWUpLFxuICAgIH07XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGlzbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gdHJ5QWNxdWlyZShzeW5jLCBhbHJlYWR5QWNxdWlyZWRFcnJvciA9IEVfQUxSRUFEWV9MT0NLRUQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHJldHVybiB3aXRoVGltZW91dChzeW5jLCAwLCBhbHJlYWR5QWNxdWlyZWRFcnJvcik7XG59XG5cbmV4cG9ydCB7IEVfQUxSRUFEWV9MT0NLRUQsIEVfQ0FOQ0VMRUQsIEVfVElNRU9VVCwgTXV0ZXgsIFNlbWFwaG9yZSwgdHJ5QWNxdWlyZSwgd2l0aFRpbWVvdXQgfTtcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQgY2hlY2tBY3Rpb25Db25kaXRpb24gZnJvbSBcIi4uL0JlYWdsZUFwcGx5QWN0aW9ucy9hY3Rpb24tY29uZGl0aW9uLXV0aWxcIjtcbmltcG9ydCB7XG4gIGFkZFRyZWF0bWVudCxcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkRGF0YUxpc3RlbmVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBUUkVBVE1FTlRfUkFUSU8sXG4gIE1PQklMRV9NRURJQV9RVUVSWSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZGV0ZXJtaW5lUGN0LFxuICBwcmVwYXJlQWN0aW9ucyxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJvYm90RW5naW5lXCIpO1xuY29uc3QgT0JTRVJWRVJfQ09ORklHID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90RW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cywgZGVidWdNb2RlLCBtYXRjaGVkVHJlYXRtZW50cywgaWRlbnRpZmllciwgcGFnZVR5cGUsIGlzT259ID0gYm9keTtcbiAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcyA9IFtdO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBjb25zdCByb2JvdFByb21pc2VzID0gW107XG4gICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdGhpcy5tYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRyZWF0bWVudC5kZXBlbmRhbnRfb25fdHJlYXRtZW50KSBjb250aW51ZTtcbiAgICAgICAgcm9ib3RQcm9taXNlcy5wdXNoKHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocm9ib3RQcm9taXNlcyk7XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgICAgaGVscGVycyxcbiAgICB9ID0gdHJlYXRtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGRlYnVnTW9kZSxcbiAgICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgICAgZW5nYWdlbWVudExvY2ssXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNNb2JpbGUsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIGFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gZW5nYWdlbWVudExvY2tbaWRdIHx8IG5ldyBNdXRleCgpO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBlbmdhZ2VtZW50TG9ja1tpZF0uYWNxdWlyZSgpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNPbikge1xuICAgICAgICAgIGFkZFRyZWF0bWVudChpZCwgbnVsbCwgbnVsbCwgXCJza2lwcGVkXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRTa2lwUmF0aW8gPSB3ZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gd2VpZ2h0IHx8IFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgICAvLyBEZXRlcm1pbmluZyBpZGVudGlmaWVyIGZvciBjYWxjdWxhdGluZyB0cmVhdG1lbnQgcGVyY2VudGFnZSAodHJlYXRtZW50UGN0KVxuICAgICAgICBjb25zdCBkZXRlcm1pbmluZ0lkZW50aWZpZXIgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50IHx8IGlkO1xuXG4gICAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIDEwMCB3aGVuIGRlYnVnIG1vZGUgaXMgMSwgZW5zdXJpbmcgbm8gdHJlYXRtZW50cyBhcmUgc2tpcHBlZFxuICAgICAgICBjb25zdCB0cmVhdG1lbnRQY3QgPSBkZWJ1Z01vZGUgPT09IDEgPyAxMDAgOiBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIGRldGVybWluaW5nSWRlbnRpZmllcik7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbcHJlcGFyZWRBY3Rpb25zLCB2YXJpYW50XSA9IGF3YWl0IHByZXBhcmVBY3Rpb25zKGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuXG4gICAgICAgIGxldCBpc0VsaWdpYmxlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgcHJlcGFyZWRBY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24uY29uZGl0aW9uKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgaWYgKGVsaWdpYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24uZWxpZ2libGVFbGVtZW50cyA9IGVsaWdpYmxlRWxlbWVudHM7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgaWYgKHRyZWF0bWVudFBjdCA8IHRyZWF0bWVudFNraXBSYXRpbykge1xuICAgICAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBza2lwcGVkIGR1ZSB0byB0cmVhdG1lbnQgc3BsaXQgcmF0aW9gKTtcbiAgICAgICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcInNraXBwZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICBhd2FpdCBhcHBseShpZCwgcHJlcGFyZWRBY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IGFwcGx5KGlkLCBwcmVwYXJlZEFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDpcIiwgaWQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICByZWxlYXNlKCk7XG4gICAgICB0aGlzLmFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpO1xuICAgICAgdGhpcy5hZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZWxwZXJzKSAmJiBoZWxwZXJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGVscGVyUm9ib3RQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgICAgaWYgKCFoZWxwZXJzLmluY2x1ZGVzKHRyZWF0bWVudC5pZCkpIGNvbnRpbnVlO1xuICAgICAgICBoZWxwZXJSb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGhlbHBlclJvYm90UHJvbWlzZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFwcGx5KGlkLCBwcmVwYXJlZEFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50KSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkQWN0aW9ucyk7XG4gICAgaWYgKHJlcyA9PT0gdHJ1ZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH0gZWxzZSBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgfVxuICB9XG5cbiAgYWRkUmVhcHBseUV2ZW50KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtwYWdlVHlwZSwgcmVBcHBseVRyZWF0bWVudHNNYXB9ID0gdGhpcztcbiAgICBjb25zdCB7aWQsIHJlYXBwbHlfZXZlbnQsIHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlfSA9IHRyZWF0bWVudDtcbiAgICBpZiAocmVhcHBseV9ldmVudCkge1xuICAgICAgaWYgKCFyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSB8fCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSA9PT0gcGFnZVR5cGUpIHtcbiAgICAgICAgbGV0IHJlYXBwbHlfZXZlbnRfYXJyYXkgPSByZWFwcGx5X2V2ZW50O1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVhcHBseV9ldmVudCkpIHJlYXBwbHlfZXZlbnRfYXJyYXkgPSBbcmVhcHBseV9ldmVudF07XG4gICAgICAgIGxvZ2dlci5sb2coYFJlYXBwbHkgZXZlbnQgJyR7cmVhcHBseV9ldmVudH0nIGZvdW5kIGZvciB0cmVhdG1lbnQ6ICR7aWR9YCk7XG4gICAgICAgIGZvciAoY29uc3QgcmVhcHBseUV2ZW50IG9mIHJlYXBwbHlfZXZlbnRfYXJyYXkpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA/XG4gICAgICAgICAgICByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdIDogW107XG4gICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IGFscmVhZHkgYWRkZWQgZm9yIHJlYXBwbHkgZXZlbnRcIik7XG4gICAgICAgICAgfSBlbHNlIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gPSBbLi4ucHJldmlvdXNWYWx1ZSwgaWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKSB7XG4gICAgY29uc3Qge3JlQXBwbHlUcmVhdG1lbnRzTWFwLCBtYXRjaGVkVHJlYXRtZW50c30gPSB0aGlzO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJlQXBwbHlUcmVhdG1lbnRzTWFwKSkge1xuICAgICAgY29uc3QgdHJlYXRtZW50SWRzID0gcmVBcHBseVRyZWF0bWVudHNNYXBba2V5XTtcbiAgICAgIGNvbnN0IHJlQXBwbHlUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHMuZmlsdGVyKCh0KSA9PiB0cmVhdG1lbnRJZHMuaW5jbHVkZXModC5pZCkpO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcImluZmluaXRlX3Njcm9sbFwiOiB7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGluZmluaXRlX3Njcm9sbGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRpbWVvdXRcIjoge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHRpbWVvdXRgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRfY2hhbmdlXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseVNlbGVjdG9yTGlzdCA9IEFycmF5LmlzQXJyYXkodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IpID9cbiAgICAgICAgICAgICAgICB0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciA6IFt0cmVhdG1lbnQucmVhcHBseV9zZWxlY3Rvcl07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHJlYXBwbHlTZWxlY3Rvckxpc3QpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gZWxlbWVudF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9uX3Njcm9sbFwiOiB7XG4gICAgICAgICAgLy8gYWRkIHdpbmRvdyBzY3JvbGwgbGlzdGVuZXIsIGNhbGwgZW5nYWdlUm9ib3Qgb24gc2Nyb2xsLCBkbyBub3QgdHJpZ2dlciBtb3JlIHRoYW4gb25jZSBwZXIgMjUwbXNcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUaW1lID0gMDtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IHN0ID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGlmIChub3cgLSBsYXN0U2Nyb2xsVGltZSA+IDI1MCAmJiBNYXRoLmFicyhsYXN0U2Nyb2xsVG9wIC0gc3QpID4gNSkge1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUaW1lID0gbm93O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBvbl9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInF1ZXJ5X3NlYXJjaF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGxldCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCAhPT0gcXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBxdWVyeV9zZWFyY2hfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW50ZXJ2YWxcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmVhcHBseUludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBhcHBsaWVkID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGlmIChhcHBsaWVkPy5bdHJlYXRtZW50LmlkXSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW50ZXJ2YWxgKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICB9LCAyNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbmZvX2xheWVyX2NoYW5nZVwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgICAgICAgICAgYWRkRGF0YUxpc3RlbmVyKHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJSZWFwcGx5IGV2ZW50IG5vdCBmb3VuZDogXCIsIGtleSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZVNldCA9IFtdLCBidXNpbmVzc1J1bGVTZXQgPSBbXSwgaWR9ID0gdHJlYXRtZW50O1xuICAgIGlmICh0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLmluY2x1ZGVzKGlkKSkgcmV0dXJuO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhbLi4uZWxpZ2liaWxpdHlSdWxlU2V0LCAuLi5idXNpbmVzc1J1bGVTZXRdKTtcbiAgICBjb25zdCBib3VuZEVuZ2FnZVRyZWF0bWVudCA9IHRoaXMuZW5nYWdlUm9ib3QuYmluZCh0aGlzLCB0cmVhdG1lbnQpO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBhZGREYXRhTGlzdGVuZXIoYF9fZVJ1bGVzLiR7c2VsZWN0b3J9YCwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgIH1cbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzLnB1c2goaWQpO1xuICB9XG5cbiAgZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlU2V0LCBwcmV2aW91c1NlbGVjdG9ycyA9IG51bGwpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBwcmV2aW91c1NlbGVjdG9ycyB8fCBbXTtcbiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAocnVsZS5zdGFydHNXaXRoKFwiIVwiKSkgcnVsZSA9IHJ1bGUuc2xpY2UoMSk7XG4gICAgICAgIHNlbGVjdG9ycy5wdXNoKHJ1bGUuc3BsaXQoXCIuXCIpWzBdKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZS5zZXQsIHNlbGVjdG9ycyk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uKG5ldyBTZXQoc2VsZWN0b3JzKSldO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpIHtcbiAgICBsb2dnZXIubG9nKGBDaGVja2luZyBlbGlnaWJpbGl0eSAke2VsaWdpYmlsaXR5UnVsZX1gKTtcbiAgICBsZXQgb3Bwb3NpdGVGbGFnID0gZmFsc2U7XG4gICAgbGV0IFtlbGlnaWJpbGl0eVNjb3BlLCBlbGlnaWJpbGl0eU5hbWVdID0gZWxpZ2liaWxpdHlSdWxlLnNwbGl0KFwiLlwiKTtcbiAgICBpZiAoZWxpZ2liaWxpdHlTY29wZS5zdGFydHNXaXRoKFwiIVwiKSkge1xuICAgICAgb3Bwb3NpdGVGbGFnID0gdHJ1ZTtcbiAgICAgIGVsaWdpYmlsaXR5U2NvcGUgPSBlbGlnaWJpbGl0eVNjb3BlLnNsaWNlKDEpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2VsaWdpYmlsaXR5U2NvcGV9YCk7XG4gICAgaWYgKCFyZXMgfHwgIUFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvcHBvc2l0ZUZsYWcgJiYgcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW9wcG9zaXRlRmxhZyAmJiAhcmVzLmluY2x1ZGVzKGVsaWdpYmlsaXR5TmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICBsb2dnZXIubG9nKGAke2VsaWdpYmlsaXR5UnVsZX0gaXMgZWxpZ2libGVgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZVNldCwgZWxpZ2liaWxpdHlTZXRUeXBlID0gbnVsbCwgcHJldmlvdXNJc0VsaWdpYmxlID0gbnVsbCkge1xuICAgIGxvZ2dlci5sb2coXCJDaGVja2luZyByb2JvdCBlbGlnaWJpbGl0eVwiKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRWxpZ2liaWxpdHkgUnVsZSBTZXQgJHtlbGlnaWJpbGl0eVJ1bGVTZXR9IGlzIG5vdCBhbiBhcnJheWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNFbGlnaWJsZSA9IHByZXZpb3VzSXNFbGlnaWJsZTtcbiAgICBmb3IgKGNvbnN0IGVsaWdpYmlsaXR5UnVsZSBvZiBlbGlnaWJpbGl0eVJ1bGVTZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmICghZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlmIChpc0VsaWdpYmxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSB8fCBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgJiYgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVW5rbm93biBlbGlnaWJpbGl0eVNldFR5cGU6IFwiLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZWxpZ2liaWxpdHlSdWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KGVsaWdpYmlsaXR5UnVsZS5zZXQsIGVsaWdpYmlsaXR5UnVsZS50eXBlLCBpc0VsaWdpYmxlKTtcbiAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VsaWdpYmxlO1xuICB9XG5cbiAgLy8gUmV0dXJuIGluZGV4IG9mIGJ1c2luZXNzUnVsZSwgdGhpcyBpcyB0aGUgYnVzaW5lc3NSdWxlSWRcbiAgYXN5bmMgY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBidXNpbmVzc1J1bGVdIG9mIGJ1c2luZXNzUnVsZVNldC5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0KFtidXNpbmVzc1J1bGVdKSkgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRGF0YUxheWVyUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgd2l0aCBvcGVyYXRvclwiLCBydWxlLm9wZXJhdG9yKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlIGZvciBzZWxlY3RvclwiLCBydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGwpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIHNlbGVjdG9yLCBzZWxlY3RvckFsbCwgc2VsZWN0b3JGYWxsYmFjayA9IG51bGx9ID0gcnVsZTtcbiAgbGV0IG1haW5TZWxlY3RvciA9IHNlbGVjdG9yO1xuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIG1haW5TZWxlY3RvciA9IHNlbGVjdG9yRmFsbGJhY2sgPyBzZWxlY3RvckZhbGxiYWNrIDogbWFpblNlbGVjdG9yO1xuICB9XG5cbiAgaWYgKG9wZXJhdG9yID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvciksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoc2VsZWN0b3JBbGwgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChtYWluU2VsZWN0b3IpIGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKTtcbiAgZWxzZSBpZiAoc2VsZWN0b3JBbGwpIGVsZW1lbnQgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidGV4dC1udW1iZXJcIjoge1xuICAgICAgbGV0IHRlbXBWYWw7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgICB0ZW1wVmFsID0gZWxlbWVudC5yZWR1Y2UoKHJldHVyblZhbCwgZWxlbSkgPT4ge1xuICAgICAgICAgIHJldHVyblZhbCArPSBwYXJzZUludChlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVmFsID0gcGFyc2VJbnQod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikudGV4dENvbnRlbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgfVxuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcGFyc2VJbnQodGVtcFZhbCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiY2xhc3NMaXN0XCI6XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImNvdW50XCI6IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihlbGVtZW50Lmxlbmd0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigwLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSBcInN0eWxlXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgY29uc3Qgc3R5bGVLZXkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50U3R5bGVzW3N0eWxlS2V5XTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCBzdHlsZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJPcGVyYXRvciBub3QgZGVmaW5lZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVGdW5jdGlvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0Z1bmN0aW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIGZ1bmN0aW9uIHJ1bGVcIik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgZnVuY3Rpb24gbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHJ1bGVGdW5jdGlvbiA9IEZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gcnVsZUZ1bmN0aW9uKCk7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVNlc3Npb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tTZXNzaW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkdXJhdGlvblwiOlxuICAgICAgcmV0dXJuIGR1cmF0aW9uSGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBjYXNlIFwiaGlzdG9yeVwiOlxuICAgICAgcmV0dXJuIGhpc3RvcnlIYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZ2V0U2Vzc2lvblRpbWVzdGFtcCA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IERhdGUocGFyc2VJbnQod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9USU1FU1RBTVApKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IHNlc3Npb24gdGltZXN0YW1wXCIsIGVycik7XG4gICAgcmV0dXJuIERhdGUubm93KCk7XG4gIH1cbn07XG5cbmNvbnN0IGR1cmF0aW9uSGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gKERhdGUubm93KCkgLSBnZXRTZXNzaW9uVGltZXN0YW1wKCkpIC8gMTAwMDtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZHVyYXRpb24sIGNvbmRpdGlvbiwgcGFyc2VJbnQodmFsdWUpKTtcbn07XG5cbmNvbnN0IGhpc3RvcnlIYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgY3VycmVudEhpc3RvcnkgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX0hJU1RPUlkpPy5zcGxpdChcIixcIik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGN1cnJlbnRIaXN0b3J5LCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXJsQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrVXJsUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yXCIsIHJ1bGUub3BlcmF0b3IpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInBhdGhcIjoge1xuICAgICAgY29uc3QgcmVxdWVzdFVSTD0gd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmO1xuICAgICAgY29uc3QgcGF0aCA9IG5ldyBVUkwocmVxdWVzdFVSTCkucGF0aG5hbWU7XG4gICAgICBsb2dnZXIubG9nKGBDaGVja2luZyBwYXRoICR7cGF0aH0gbWF0Y2hlcyBydWxlIHBhdGggJHt2YWx1ZX1gKTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHBhdGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWX0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRW52Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRW52UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGUgZm9yIG9wZXJhdG9yOiBcIiwgcnVsZS5vcGVyYXRvcik7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgbGV0IHNrdTtcbiAgaWYgKHBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiLCB0cnVlKTtcbiAgICBpZiAoIXNrdSkgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGlmICghc2t1TGlzdCB8fCAodHlwZW9mIHNrdUxpc3QgPT09IFwib2JqZWN0XCIgJiYgIU9iamVjdC5rZXlzKHNrdUxpc3QpLmxlbmd0aCkpIHJldHVybiBmYWxzZTtcbiAgICBza3UgPSBza3VMaXN0W09iamVjdC5rZXlzKHNrdUxpc3QpWzBdXTtcbiAgfVxuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJzYWxlQ250VmlzaXRvcnNJbjE1XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIFRyYW5zYWN0aW9uQ291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFRyYW5zYWN0aW9uQ291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiY2FydENudFZpc2l0b3JzSW4xNVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0QWRkVG9DYXJ0Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwidmlld0NudFZpc2l0b3JzSW4xXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFByZXZpZXdDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJoYXNUaXRsZVwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyB0aXRsZSBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VGl0bGUoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiaGFzRGVzY3JpcHRpb25cIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgZGVzY3JpcHRpb24gZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldERlc2NyaXB0aW9uKHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmNvbnN0IGdldFRyYW5zYWN0aW9uQ291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRBZGRUb0NhcnRDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBnZXRGcm9tREIoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0RnJvbURCID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBkYiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gIHJldHVybiBhd2FpdCBkYi5nZXQoc2t1KTtcbn07XG5cbmNvbnN0IGdldFRpdGxlID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGdldEZyb21EQihza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnRpdGxlQXVnbWVudCB8fCBcIlwiO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgZ2V0RGVzY3JpcHRpb24gPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZ2V0RnJvbURCKHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8ubWFya2V0aW5nQ29weSB8fCBcIlwiO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y2hlY2tEYXRhTGF5ZXJSdWxlfSBmcm9tIFwiLi9kYXRhTGF5ZXJDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRWxlbWVudFJ1bGV9IGZyb20gXCIuL2VsZW1lbnRDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRnVuY3Rpb25SdWxlfSBmcm9tIFwiLi9mdW5jdGlvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tTZXNzaW9uUnVsZX0gZnJvbSBcIi4vc2Vzc2lvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tVcmxSdWxlfSBmcm9tIFwiLi91cmxDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRW52UnVsZX0gZnJvbSBcIi4vZW52Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Byb2R1Y3RJbmZvUnVsZX0gZnJvbSBcIi4vcHJvZHVjdEluZm9DaGVja2VyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7YWRkRGF0YUxpc3RlbmVyLCBhZGRUb0JlYWdsZUluZm9MYXllciwgZ2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtNdXRleH0gZnJvbSBcImFzeW5jLW11dGV4XCI7XG5pbXBvcnQge2ZldGNoRWxpZ2liaWxpdHlSdWxlc30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSdWxlRW5naW5lXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlRW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVzLCBiYXNlUnVsZVNldH0gPSBib2R5O1xuICAgIHRoaXMuYmFzZVJ1bGVTZXQgPSBiYXNlUnVsZVNldDtcbiAgICB0aGlzLmVsaWdpYmlsaXR5UnVsZXMgPSBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5tdXRleCA9IG5ldyBNdXRleCgpO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlcygpIHtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgdGhpcy5iYXNlUnVsZVNldCkge1xuICAgICAgY29uc3QgcnVsZVNhdGlzZmllZCA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgaWYgKCFydWxlU2F0aXNmaWVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGUocnVsZSkge1xuICAgIGNvbnN0IHtjaGFpbiwgY2hhaW5fY29uZGl0aW9uLCB0eXBlfSA9IHJ1bGU7XG4gICAgbGV0IHJ1bGVTYXRpc2ZpZWQgPSBudWxsO1xuICAgIC8vIGNoZWNrIHJ1bGVcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJzZXNzaW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1Nlc3Npb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VsZW1lbnRSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrRGF0YUxheWVyUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXJsXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja1VybFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0Z1bmN0aW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZW52aXJvbm1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRW52UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGF3YWl0IGNoZWNrUHJvZHVjdEluZm9SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYE5vIHN1Y2ggcnVsZSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjaGFpbikge1xuICAgICAgc3dpdGNoIChjaGFpbl9jb25kaXRpb24pIHtcbiAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICYmIGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgfHwgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgIT0gYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIGNoYWluIGNvbmRpdGlvblwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVTYXRpc2ZpZWQgPyBydWxlLm5hbWUgfHwgdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImFzc2Vzc2luZy1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgICBjb25zdCBrZXlQcm9taXNlc01hcCA9IHt9O1xuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZWxpZ2liaWxpdHlSdWxlcykpIHtcbiAgICAgIGtleVByb21pc2VzTWFwW2tleV0gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBrZXlQcm9taXNlc01hcFtrZXldLnB1c2godGhpcy5jaGVja1J1bGUocnVsZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVQcm9taXNlc10gb2YgT2JqZWN0LmVudHJpZXMoa2V5UHJvbWlzZXNNYXApKSB7XG4gICAgICBjb25zdCBzYXRpc2ZpZWRSdWxlSWRzID0gYXdhaXQgUHJvbWlzZS5hbGwocnVsZVByb21pc2VzKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBzYXRpc2ZpZWRSdWxlSWRzLmZpbHRlcigoaWQpID0+IGlkICE9PSBmYWxzZSkpO1xuICAgICAgdGhpcy5zZXRVcExpc3RlbmVycyhrZXksIHRoaXMuZWxpZ2liaWxpdHlSdWxlc1trZXldKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKSB7XG4gICAgaWYgKCFrZXkgfHwgIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgdGhpcy5tdXRleC5hY3F1aXJlKCk7XG4gICAgbG9nZ2VyLmxvZyhgTG9jayBhY3F1aXJlZCBmb3Iga2V5ICR7a2V5fWApO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgY29uc3QgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCkgfHwgW107XG4gICAgICAgIGlmIChpc0VsaWdpYmxlKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgY3VycmVudC5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGN1cnJlbnQpO1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZyb20gZWxpZ2libGUgcnVsZXNcbiAgICAgICAgICBpZiAoIWN1cnJlbnQuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBjdXJyZW50LmZpbHRlcigoaykgPT4gayAhPT0gcnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgZmlsdGVyZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBhc3Nlc3NpbmcgcnVsZXMgZm9yIGtleTogJHtrZXl9IC0gJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgbG9nZ2VyLmxvZyhgUmVsZWFzaW5nIGxvY2sgZm9yIGtleTogJHtrZXl9YCk7XG4gICAgICByZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0VXBMaXN0ZW5lcnMoa2V5LCBydWxlcykge1xuICAgIGNvbnN0IHtkYXRhTGF5ZXJSdWxlcywgZWxlbWVudFJ1bGVzfSA9IHRoaXMuZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKHJ1bGVzKTtcbiAgICBmb3IgKGNvbnN0IFtvcGVyYXRvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGFMYXllclJ1bGVzKSkge1xuICAgICAgY29uc3QgYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayA9IHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2suYmluZCh0aGlzLCBrZXksIHJ1bGVzKTtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihvcGVyYXRvciwgYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW3NlbGVjdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZWxlbWVudFJ1bGVzKSkge1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25MaXN0KSA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikgcmV0dXJuO1xuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvblJlY29yZCBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICBub2RlcyA9IFsuLi5ub2RlcywgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5yZW1vdmVkTm9kZXMpXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBleGNsdWRlIG11dGF0aW9ucyB0aGF0IG9ubHkgdXBkYXRlIHRleHRcbiAgICAgICAgaWYgKG5vZGVzLmV2ZXJ5KChuKSA9PiBuLnRhZ05hbWUgPT09IHVuZGVmaW5lZCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNlbGVjdG9yID09PSBcImJvZHlcIikge1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5wYXJlbnROb2RlLCBjb25maWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcywgZGF0YUxheWVyUnVsZXMgPSB7fSwgZWxlbWVudFJ1bGVzID0ge30sIGJhc2VSdWxlID0gbnVsbCkge1xuICAgIGlmICghcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgY29uc3Qge3R5cGV9ID0gcnVsZTtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgICAgaWYgKCFkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSkge1xuICAgICAgICAgICAgZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0ucHVzaChiYXNlUnVsZSB8fCBydWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihydWxlLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdID0gZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbcnVsZS5zZWxlY3Rvcl0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUuc2VsZWN0b3JBbGwpLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdID0gZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvckFsbF0sIGJhc2VSdWxlIHx8IHJ1bGVdIDogW2Jhc2VSdWxlIHx8IHJ1bGVdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRSdWxlc1tcImJvZHlcIl0gPSBlbGVtZW50UnVsZXNbXCJib2R5XCJdID9cbiAgICAgICAgICAgIFsuLi5lbGVtZW50UnVsZXNbXCJib2R5XCJdLCBiYXNlUnVsZSB8fCBydWxlXSA6IFtiYXNlUnVsZSB8fCBydWxlXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChydWxlLmNoYWluKSB7XG4gICAgICAgIHRoaXMuZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKFtydWxlLmNoYWluXSwgZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlcywgYmFzZVJ1bGUgfHwgcnVsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7ZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlc307XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0RWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGVsaWdpYmlsaXR5UnVsZXNPYmogPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTKTtcbiAgICAgIGlmIChlbGlnaWJpbGl0eVJ1bGVzT2JqKSB7XG4gICAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSBKU09OLnBhcnNlKGVsaWdpYmlsaXR5UnVsZXNPYmopO1xuICAgICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlc09iai50aW1lc3RhbXApIHtcbiAgICAgICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAoRGF0ZS5ub3coKSAtIGVsaWdpYmlsaXR5UnVsZXNPYmoudGltZXN0YW1wKSAvICgxMDAwICogMzYwMCk7XG4gICAgICAgICAgaWYgKGVsYXBzZWRIb3VycyA8IExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTKSByZXR1cm4gZWxpZ2liaWxpdHlSdWxlc09iai5ydWxlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICAgICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzT2JqKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgZWxpZ2liaWxpdHlSdWxlc09iaiA9IHtydWxlczogZWxpZ2liaWxpdHlSdWxlc09iaiwgdGltZXN0YW1wOiBEYXRlLm5vdygpfTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMsIEpTT04uc3RyaW5naWZ5KGVsaWdpYmlsaXR5UnVsZXNPYmopKTtcbiAgICAgIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzT2JqLnJ1bGVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZWxpZ2liaWxpdHkgcnVsZXM6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnkvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyxcbiAgaW5qZWN0U3R5bGVTaGVldCxcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBSb2JvdEVuZ2luZSBmcm9tIFwiLi9yb2JvdEVuZ2luZVwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlT25Db21wb25lbnRcIik7XG5cbmNvbnN0IGJlYWdsZU9uID0gYXN5bmMgKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUsIHRyZWF0bWVudFdlaWdodHMsIGlzT24pID0+IHtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24taW5pdFwiKTtcblxuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSA9IGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBjb25zdCB0cmVhdG1lbnRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50cygpO1xuXG4gIGluamVjdFN0eWxlU2hlZXQoKTtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwib24tY29uZmlnLWZldGNoXCIpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRzUHJvbWlzZTtcblxuICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICB9XG4gIGxvZ2dlci5zdWNjZXNzKFwiRm91bmQgdHJlYXRtZW50czogXCIsIHRyZWF0bWVudHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXRyZWF0bWVudHNcIik7XG5cbiAgY29uc3QgdHJlYXRtZW50UmVwb3NpdG9yeSA9IG5ldyBUcmVhdG1lbnRSZXBvc2l0b3J5KHtcbiAgICB0cmVhdG1lbnRzLFxuICAgIHRyZWF0bWVudFdlaWdodHMsXG4gIH0pO1xuXG4gIGNvbnN0IG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50UmVwb3NpdG9yeS5nZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpO1xuICBpZiAobWF0Y2hlZFRyZWF0bWVudHMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby11c2VyLXNlZ21lbnRcIik7XG4gIH1cbiAgaWYgKCFtYXRjaGVkVHJlYXRtZW50cy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC1tYXRjaGVkXCIpO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZvdW5kLW1hdGNoZWQtcm9ib3RzXCIpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2U7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm5vLXJ1bGVzLWFzc2Vzc2VkXCIpO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInJ1bGVzLWFzc2Vzc2VkXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcHJvZHVjdEluZm9EQiA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCk7XG4gICAgYXdhaXQgcHJvZHVjdEluZm9EQi5wZXJzaXN0UHJvZHVjdEluZm8oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZHVjdC1pbmZvLW5vLXBlcnNpc3RcIik7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJlbmdhZ2luZy1yb2JvdHNcIik7XG4gIGNvbnN0IHJvYm90RW5naW5lID0gbmV3IFJvYm90RW5naW5lKHtcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICBkZWJ1Z01vZGUsXG4gICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgaWRlbnRpZmllcixcbiAgICBwYWdlVHlwZSxcbiAgICBpc09uLFxuICB9KTtcbiAgYXdhaXQgcm9ib3RFbmdpbmUuZW5nYWdlUm9ib3RzKCk7XG4gIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJyb2JvdHMtZW5nYWdlZFwiKTtcbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJBcHBsaWVkIHRyZWF0bWVudHM6IFwiLCBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgUnVsZUVuZ2luZS5nZXRFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGlmICghZWxpZ2liaWxpdHlSdWxlcykgcmV0dXJuO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBydWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2VsaWdpYmlsaXR5UnVsZXN9KTtcbiAgYXdhaXQgcnVsZUVuZ2luZS5hc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzZWQtZWxpZ2liaWxpdHktcnVsZXNcIik7XG59XG5leHBvcnQgZGVmYXVsdCBiZWFnbGVPbjtcbiIsImltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlNlZ21lbnRhdGlvbkNvbXB1dGVyXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cykge1xuICBsb2dnZXIubG9nKFwiRGV0ZXJtaW5pbmcgdXNlciBzZWdtZW50XCIpO1xuICB0cnkge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgICBpZiAoIXJ1bGVTZXQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW119KTtcbiAgICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjb21wdXRlIHVzZXIgc2VnbWVudFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgTW9uaXRvciBmcm9tIFwiLi4vQmVhZ2xlTW9uaXRvci9pbmRleFwiO1xuaW1wb3J0IGJlYWdsZU9uIGZyb20gXCIuLi9CZWFnbGVPblwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFNQTElUX1JBVElPLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIExBQl9SQVRJTyxcbiAgVkVSU0lPTixcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgc2V0VVJMRGF0YSxcbiAgc2V0QWdlbnREZXRhaWxzLFxuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxuICBzd2l0Y2hUb0Vhc2VPdXQsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiO1xuXG5sZXQgU0hVVERPV04gPSBmYWxzZTtcblxuKGFzeW5jIGZ1bmN0aW9uKCkge1xuICBzd2l0Y2hUb0Vhc2VPdXQoKTtcbiAgbGV0IG1vbml0b3IgPSBudWxsO1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIGluaXRpYWxpemluZ1wiKTtcbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cbiAgbGV0IGVhcmx5TG9nU2VudCA9IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IENSSVRJQ0FMIElOSVQgVEFTS1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgaW5pdGlhbGl6aW5nXCIpO1xuICAgIHNldFVSTERhdGEoKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiwgRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBhd2FpdCBnZXRJZGVudGlmaWVyKCk7XG4gICAgbG9nZ2VyLmxvZyhcIkZvdW5kIGlkZW50aWZpZXI6IFwiLCBpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiwgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29va2llUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIsIGNvb2tpZVBjdCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2XCIsIFZFUlNJT04pO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gICAgbW9uaXRvciA9IG5ldyBNb25pdG9yKCk7XG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEFTWU5DIElOSVQgVEFTS1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIoKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuXG4gICAgLy8gU0xBOiAyIHNlY29uZHMgdG8gZmxpY2tlclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgfSwgMjAwMCk7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFkgUFJVTkUgT1VULU9GLVNDT1BFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIGxldCBvb3NCcmVhayA9IGZhbHNlO1xuICAgIGNvbnN0IG9vc1JlYXNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFKTtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuICAgIGlmIChkZWJ1Z01vZGUgPT09IC0xKSB7XG4gICAgICBTSFVURE9XTiA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gdGVzdCBjb29raWUsIGJlYWNvbiwgYW5kIHN0cmluZyB1dGlscyBzdXBwb3J0XG4gICAgaWYgKFxuICAgICAgY29va2llUGN0ID09PSBudWxsIHx8XG4gICAgICAhbmF2aWdhdG9yLnNlbmRCZWFjb24gfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICB0eXBlb2YgU3RyaW5nPy5wcm90b3R5cGU/LnBhZFN0YXJ0ICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ubWF0Y2ggIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwidW5zdXBwb3J0ZWRcIilcbiAgICApIHtcbiAgICAgIG9vc0JyZWFrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiB1c2VyQWdlbnQgY2FuIGJlIHByb3Blcmx5IHBhcnNlZFxuICAgIGlmICghb29zQnJlYWspIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IHNldEFnZW50RGV0YWlscygpO1xuICAgICAgLy8gaWYgYWdlbnQgY2Fubm90IGJlIHBhcnNlZCwgZG8gZWFybHkgYnJlYWtcbiAgICAgIGlmICghc3RhdHVzKSB7XG4gICAgICAgIG9vc0JyZWFrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgcGVybWFuZW50IHVuc2VnbWVudGVkLW9vcyBhZnRlciBPRkYgZWxpZ2liaWxpdHkgaXMgZml4ZWRcblxuICAgIC8vIGF0dGVtcHQgdG8gY29tcHV0ZSB1c2VyIHNlZ21lbnRcbiAgICBsZXQgdXNlclNlZ21lbnQgPSBudWxsO1xuICAgIGxldCB0cmVhdG1lbnRXZWlnaHRzID0gbnVsbDtcbiAgICBpZiAoIW9vc0JyZWFrKSB7XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2U7XG4gICAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY29tcHV0ZSB1c2VyIHNlZ21lbnQgYW5kIGFkZCB0byBiZWFnbGVJbmZvTGF5ZXJcbiAgICAgICAgdXNlclNlZ21lbnQgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF1c2VyU2VnbWVudCkge1xuICAgICAgICBvb3NCcmVhayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgY2Fubm90IGdldCBjcml0aWNhbCBpbmZvLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgdW5zdXBwb3J0ZWRcbiAgICBpZiAob29zQnJlYWspIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCBkZXZpY2VcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZC1kZXZpY2VcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQURNSU4gVVNFUiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIFRPRE86IHJlbmFtZSBzaG93cm9vbSBsb2dpYyB0byBhZG1pbiwgYW5kIG1hcCB2dnNJc1Nob3dyb29tIHRvIGEgY29uZmlndXJhYmxlIGFkbWluIHBhcmFtXG5cbiAgICAvLyBpZiBhZG1pbiB1c2VyLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgbWFyayBhcyBlbXBsb3llZVxuICAgIGNvbnN0IHByb2Nlc3NBZG1pblVzZXIgPSAoKSA9PiB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSwgXCJlbXBsb3llZVwiKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIHRydWUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCBhZG1pblwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFkbWluLWVtcGxveWVlXCIpO1xuICAgIH07XG5cbiAgICBsZXQgaXNBZG1pbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4pO1xuICAgIC8vIGlmIG5vdCBmb3VuZCBpbiBsb2NhbFN0b3JhZ2UsIGNoZWNrIGJlYWdsZUluZm9MYXllciB3aXRoIGJsb2NraW5nIG1vZGVcbiAgICBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlzQWRtaW4gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKTtcbiAgICAgIC8vIHBlcm1hbmVudCBsYWJlbCBjYW4gYmUgZmFsc2UsIGJ1dCBhZG1pbiB1c2VyIGNhbiBzdGlsbCBsb2dpbiBhbmQgdHVybiB0cnVlLCBsYXppbHkgZml4IHRoaXNcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IFwiZmFsc2VcIiB8fCBpc0FkbWluID09PSBmYWxzZSkge1xuICAgICAgLy8gYXN5bmMgY2FsbCB0byBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCB0aGVuIHNldCBsb2NhbFN0b3JhZ2VcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpLnRoZW4oKGlzQWRtaW4pID0+IHtcbiAgICAgICAgaWYgKGlzQWRtaW4gJiYgKGlzQWRtaW4gPT09IFwidHJ1ZVwiIHx8IGlzQWRtaW4gPT09IHRydWUpKSB7XG4gICAgICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByb2Nlc3NBZG1pblVzZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IG51bGwgfHwgaXNBZG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1hZG1pbi1zdGF0dXNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtZWFzZVwiKSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYW50aS1mbGlja2VyLXRpbWVvdXRcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBPTi9PRkYgQ0hFQ0sgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGNoYW1waW9uIGlzIGFib3ZlIFNQTElUX1JBVElPIHBsdXMgTEFCX1JBVElPXG4gICAgY29uc3QgaXNDaGFtcCA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTyAqICgxICsgTEFCX1JBVElPIC8gMTAwKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzQ2hhbXBcIiwgaXNDaGFtcCk7XG5cbiAgICAvLyBpc09uIGNhbiBiZSB0cnVlIChPTiksIGZhbHNlIChPRkYpXG4gICAgbGV0IGlzT24gPSBudWxsO1xuXG4gICAgaWYgKGRlYnVnTW9kZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkRlYnVnIG1vZGUgb246IGFsbCBhcHBsaWNhYmxlIHRyZWF0bWVudHMgd2lsbCBiZSBhcHBsaWVkXCIpO1xuICAgICAgaXNPbiA9IHRydWU7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwiZW1wbG95ZWVcIikge1xuICAgICAgbG9nZ2VyLndhcm4oXCJVc2VyIGlzIG91dCBvZiBzY29wZVwiKTtcbiAgICAgIC8vIHNldCBpc09uIHRvIHRydWUvZmFsc2Ugd2hlbiBub3QgZGVidWdNb2RlIGJ1dCBvdXQgb2Ygc2NvcGUgaS5lLiBuZF9kZWJ1Zz0wIGZvciB0ZXN0YWJpbGl0eVxuICAgICAgaXNPbiA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTztcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHVua25vd25cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG91dCBvZiBzY29wZSByZWFzb25cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGdyZWF0ZXIgdGhhbiBTUExJVF9SQVRJTywgdGhlbiBpbiBPTiBtb2RlXG4gICAgICBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPKSB7XG4gICAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ0cnVlXCJ9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPIC8gMikge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMlwifSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMVwifSk7XG4gICAgICB9XG5cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNPblwiLCBpc09uKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBpc09uLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWS1QUk9DRVNTIENPTlZFUlNJT04gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBhd2FpdCBjcml0aWNhbCBpbmZvIGJlZm9yZSBzZW5kaW5nIGxvZ3MgZm9yIHByb3BlciBhbmFseXRpY3MgbWVhc3VyZW1lbnRzXG4gICAgY29uc3QgcGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgaWYgKHBhZ2VUeXBlID09PSBcInB1cmNoYXNlXCIpIHtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBzZW5kIGxvZ3MgaW1tZWRpYXRlbHkgb24gcHVyY2hhc2UgcGFnZSwgYW5kIGZvcmNlIHdhaXRcbiAgICAgIGF3YWl0IG1vbml0b3Iuc2VuZExvZ3ModHJ1ZSk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgU0hVVERPV04gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZW5kIGxvZ3Mgd2hlbiByZWFkeSwgc3RhcnQgc2NyYXBpbmcgYW5kIHNlbmRpbmcgYXN5bmNseVxuICAgICAgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgfVxuICAgIGVhcmx5TG9nU2VudCA9IHRydWU7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gUk9CT1QgUEFUSHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImVudGVyaW5nLXJvYm90LXBhdGhcIik7XG5cbiAgICBpZiAoaXNPbiA9PT0gbnVsbCB8fCBpc09uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWlzT25cIik7XG4gICAgfSBlbHNlIGlmIChTSFVURE9XTikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2h1dGRvd24tcGF0aFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgYmVhZ2xlT24oaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSwgdHJlYXRtZW50V2VpZ2h0cywgaXNPbik7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcIkVudHJ5cG9pbnQgY2F0Y2g6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIGVyci5tZXNzYWdlKTtcbiAgICBpZiAoIWVhcmx5TG9nU2VudCAmJiBtb25pdG9yKSBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgfVxufSkoKTtcbiJdLCJuYW1lcyI6WyJyZXBsYWNlQWxsIiwic3RyIiwiZmluZCIsInJlcGxhY2UiLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJ0dXJraXNoVG9Mb3dlciIsInN0cmluZyIsImxldHRlcnMiLCJsZXR0ZXIiLCJ0b0xvd2VyQ2FzZSIsImlzU3RhZ2luZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluY2x1ZGVzIiwiVkVSU0lPTiIsIkNPT0tJRV9OQU1FIiwiVFJFQVRNRU5UU19MT0NBVElPTiIsIlRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OIiwiU1RZTEVTSEVFVF9MT0NBVElPTiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIkVfUlVMRVNfTE9DQVRJT04iLCJQUk9EVUNUX0lORk9fTE9DQVRJT04iLCJMT0dfQVBJX1VSTCIsIkxPT0tVUF9BUElfVVJMIiwiTU9CSUxFX01FRElBX1FVRVJZIiwiU1BMSVRfUkFUSU8iLCJMQUJfUkFUSU8iLCJUUkVBVE1FTlRfUkFUSU8iLCJMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUyIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJTRVNTSU9OX1JFRkVSUkVSIiwiTUFUQ0hFRF9UUkVBVE1FTlRTIiwiTE9DQUxfU1RPUkFHRV9LRVlTIiwiVFJFQVRNRU5UUyIsIldFSUdIVFMiLCJFTElHSUJJTElUWV9SVUxFUyIsIkRFQlVHX01PREUiLCJPVVRfT0ZfU0NPUEUiLCJVU0VSX0lEIiwiREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRSIsIklTX0FETUlOIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwidGVzdGluZyIsIkRFQlVHIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFyZ3MiLCJjb25zb2xlIiwiaW5mbyIsImxvZyIsIm1lc3NhZ2VDb25maWciLCJmb3JFYWNoIiwiYXJndW1lbnQiLCJ0eXBlIiwid2FybiIsImVycm9yIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJsb2dnZXIiLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJ0b3AiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInN3aXRjaFRvRWFzZU91dCIsImNvbnRhaW5zIiwiZWwiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJwcmVwZW5kIiwiYWRkIiwiZmV0Y2hUcmVhdG1lbnRzIiwiZmV0Y2hQbHVzIiwidHJlYXRtZW50cyIsIkVycm9yIiwianNvbiIsImpzb25UcmVhdG1lbnQiLCJmYWlsZWQiLCJtZXNzYWdlIiwiZmV0Y2hUcmVhdG1lbnRXZWlnaHRzIiwidHJlYXRtZW50V2VpZ2h0cyIsImpzb25UcmVhdG1lbnRXZWlnaHRzIiwiZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzIiwiZWxpZ2liaWxpdHlSdWxlcyIsImpzb25FbGlnaWJpbGl0eVJ1bGVzIiwiZmV0Y2hQcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm9Kc29uIiwidGltZW91dCIsInRpbWUiLCJjb250cm9sbGVyIiwiQWJvcnRDb250cm9sbGVyIiwidGltZW91dElEIiwic2V0VGltZW91dCIsImFib3J0IiwidXJsIiwib3B0aW9ucyIsInJldHJpZXMiLCJmZXRjaCIsInNpZ25hbCIsInRoZW4iLCJyZXMiLCJvayIsImNsZWFyVGltZW91dCIsInN0YXR1cyIsImNhdGNoIiwiZXh0cmFjdENvb2tpZUlkZW50aWZpZXIiLCJjb29raWVTdHJpbmciLCJjb29raWVOYW1lIiwicGFyc2VkIiwic3BsaXQiLCJtYXAiLCJ2IiwicmVkdWNlIiwiYWNjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidHJpbSIsImlkZW50aWZpZXIiLCJpZGVudGlmaWVySW5kZXgiLCJkZXRlcm1pbmVQY3QiLCJub3ciLCJtb250aCIsImdldE1vbnRoIiwiaGFzaCIsImdldFVuc2VjdXJlSGFzaCIsInRvU3RyaW5nIiwicGN0IiwiZXhpdFNjcm9sbExpc3RlbmVyIiwiY2FsbEJhY2siLCJsb29wIiwic2Nyb2xsVG9wIiwibGFzdFNjcm9sbFRvcCIsImNsZWFySW50ZXJ2YWwiLCJleGl0U2Nyb2xsSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInN0eWxlQXBwbGljYXRvciIsImVsZW1lbnRzIiwic3R5bGVDaGFuZ2VzTWFwIiwiaSIsImVsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsdWUiLCJzdHlsZSIsImluamVjdFN0eWxlU2hlZXQiLCJzdHlsZVNoZWV0IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYnVzaW5lc3NSdWxlSWQiLCJkZWJ1Z01vZGUiLCJhY3Rpb25zIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidmFyaWFudCIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsImlkIiwia2V5cyIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJNYXRoIiwiZmxvb3IiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uU3RvcmFnZSIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsInNldEl0ZW0iLCJwYXRobmFtZSIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJjdXJyZW50IiwiTnVtYmVyIiwiaXNOYU4iLCJnZXRHYUNsaWVudElkIiwiZ2EiLCJnZXRBbGwiLCJ0cmFja2VycyIsImdldCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiYWJzIiwiZ2V0UmFuZG9tSW50IiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJleHRyYWN0SWRlbnRpZmllckludGVydmFsIiwiZSIsImRlbGF5IiwibXMiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJkYXRlIiwicmVzdWx0Iiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwibWF0Y2giLCJ0b2RheSIsInN0YXJ0WWVhciIsImdldEZ1bGxZZWFyIiwiZW5kWWVhciIsImVzdGltYXRlZFN0YXJ0IiwiZXN0aW1hdGVkRW5kIiwic3RhcnREaWZmT3ZlckRheXMiLCJjZWlsIiwiZW5kRGlmZk92ZXJEYXlzIiwic3RhcnREaWZmT3ZlcldlZWtzIiwiZW5kRGlmZk92ZXJXZWVrcyIsImVyciIsImlkbGVUaW1lciIsInRpbWVPdXQiLCJyZXNldFRpbWVyIiwiaWRsZVRpbWVvdXQiLCJvbnRvdWNoc3RhcnQiLCJpc093bk11dGF0aW9uIiwibXV0YXRpb25MaXN0Iiwibm9kZXMiLCJBcnJheSIsImZyb20iLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm4iLCJ0YWdOYW1lIiwiYyIsInNldEFnZW50RGV0YWlscyIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYnIiLCJiTmFtZSIsImJWZXJzaW9uIiwib3MiLCJXaW5kb3dzIiwiTWFjIiwiTGludXgiLCJBbmRyb2lkIiwiaU9TIiwib3NWZXJzaW9uIiwib3NOYW1lIiwiaXNNb2JpbGUiLCJpc1N1cHBvcnRlZEJyb3dzZXIiLCJpc1N1cHBvcnRlZE9TIiwic2V0VVJMRGF0YSIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsInBhZ2VUeXBlIiwiaWRiUmVhZHkiLCJpc1NhZmFyaSIsInVzZXJBZ2VudERhdGEiLCJpbmRleGVkREIiLCJkYXRhYmFzZXMiLCJpbnRlcnZhbElkIiwidHJ5SWRiIiwiZmluYWxseSIsIkxTX1ByZWZpeCIsInVwZGF0ZUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lIiwiYmFzZUZlYXR1cmVWYWx1ZSIsInVwZGF0ZU1ldGhvZCIsImZlYXR1cmVLZXkiLCJvcEtleSIsInN0b3JhZ2UiLCJwYXJzZUZsb2F0IiwidmFsSGFzaCIsIm9wS2V5VmFsIiwib3BLZXlWYWxOYW1lIiwicXVlcnlJbkNvbGxlY3RvciIsInF1ZXJ5TWV0aG9kIiwibG9jYWxLZXlzIiwibG9jYWxLZXlzRmlsdGVyZWQiLCJmaWx0ZXIiLCJzdW0iLCJtYXhDb3VudCIsIm1heFZhbCIsInZhbCIsImJlYWdsZUluZm9MYXllciIsImEiLCJmIiwiX19od20iLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwic2VsZWN0b3IiLCJuYW1lIiwiZm9ybWF0dGVyIiwiZXhjbHVzaXZlIiwib3BlcmFuZCIsImNoaWxkcmVuIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSIsImluZm9MYXllciIsInR5cGVkVmFsdWUiLCJsYXN0S2V5IiwicG9wIiwib2JqIiwidXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciIsInBhc3NWYWx1ZVRvTGlzdGVuZXJzIiwiREFUQV9MSVNURU5FUlMiLCJhZGREYXRhTGlzdGVuZXIiLCJsaXN0ZW5lciIsInB1c2giLCJsaXN0ZW5lcnMiLCJpc0FycmF5IiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImJsb2NraW5nIiwicG9sbEludGVydmFsIiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJzZWFyY2hFbGVtZW50IiwiaXNGb3VuZCIsImlzSWdub3JlIiwiaW50ZXJ2YWwiLCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYWRkVHJlYXRtZW50IiwiZGVwZW5kYW50X29uX3RyZWF0bWVudCIsIlBBUlNFU0VBUkNITUFYUkVUUlkiLCJQQVJTRVNFQVJDSFNUQVJUREVMQVkiLCJwYXJzZVNlYXJjaFBhdGhzRGVsYXkiLCJwYXJzZVNlYXJjaFBhdGhzUmV0cnkiLCJpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIiwicHJlcGFyZUNvcmVEYXRhIiwicGFyc2VyQ2FsbGVyIiwiYWRkTWV0cmljcyIsImNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWVzIiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJwcm9jZXNzRm9ybWF0dGVyIiwidG9VcHBlckNhc2UiLCJzZWFyY2hPYmoiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJxdWVyeVNlbGVjdG9yIiwidG9CZVVwZGF0ZWQiLCJjaGlsZCIsImNoaWxkRWxlbWVudHMiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJ0cmlnZ2VyUmVzdGFydCIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaW5uZXJUZXh0IiwiYXR0cmliVmFsdWVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInZhbHVlY2hpbGQiLCJhdHRyaWJWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInNldFZhbHVlIiwic3VtUHJpY2UiLCJjaGlsZFRleHQiLCJhcnJheUlubmVyVGV4dCIsImV4Y2x1c2l2ZUVsZW1lbnQiLCJjdXN0b21EYXRhRGVyaXZhdGlvbnMiLCJjdXJyZW50UGFnZVR5cGUiLCJhbGwiLCJpc0NhcnRFbXB0eSIsInRvdGFsQmFzZVByaWNlIiwiY291cG9uTm90QXBwbGljYWJsZSIsInByaWNlcyIsInF1YW50aXRpZXMiLCJ0b3RhbFByaWNlIiwiY291cG9uQXBwbGljYWJsZUFtb3VudCIsInNrdSIsInNrdUxpc3QiLCJwYXJzZVNlYXJjaFBhdGhzIiwiZG9tU3RhdHVzIiwicmVhZHlTdGF0ZSIsIndpbnRvcCIsImRhdGFMYXllciIsIndpbmRvYyIsImZvdW5kTmFtZXMiLCJTZXQiLCJwcmV2Rm91bmROYW1lcyIsIm5vdEZvdW5kTmFtZXMiLCJoYXMiLCJzZWFyY2hBbmRTZXQiLCJkYXRhTGF5ZXJJdGVtIiwic29yZ0FycmF5SW5uZXIiLCJnZXRTT1JHQXJyYXkiLCJzb3JnSXRlbSIsInNpemUiLCJqb2luIiwicGF0aCIsInBhdGhBcnJheSIsInN1YlBhdGgiLCJzbGljZSIsInN1YkFycmF5Iiwic3ViS2V5Iiwic3ViVmFsdWUiLCJ3aW5kb3dQdHIiLCJuYXZQdHIiLCJwbGF0Zm9ybSIsImRldmljZVBpeGVsUmF0aW8iLCJhdmFpbFdpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIndpbmRvd0RlcHRoIiwiY29sb3JEZXB0aCIsInBpeGVsRGVwdGgiLCJ2cG9ydFNoYXBlIiwidmlzdWFsVmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsInJvdW5kIiwib3JpZW50YXRpb25BbmdsZSIsIm9yaWVudGF0aW9uIiwiYW5nbGUiLCJ0ZW1wIiwiaGlzdG9yeSIsIm5hdkFnZW50IiwiYnJhbmRzIiwiYnJhbmQiLCJ2ZXJzaW9uIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsInZlbmRvciIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwicGVyZk1ldHJpY3MiLCJwZXJmTmF2aWdhdGlvbk1ldHJpY3MiLCJwZXJmb3JtYW5jZSIsImdldEVudHJpZXNCeVR5cGUiLCJjb25uZWN0IiwiY29ubmVjdEVuZCIsImNvbm5lY3RTdGFydCIsInJlcXVlc3QiLCJyZXNwb25zZUVuZCIsInJlcXVlc3RTdGFydCIsImRvbSIsImRvbUludGVyYWN0aXZlIiwiZG9tQ29tcGxldGUiLCJsb2FkIiwibG9hZEV2ZW50RW5kIiwibG9hZEV2ZW50U3RhcnQiLCJkdXJhdGlvbiIsInNjaGVtYU9yZ0VsdHMiLCJzb3JnQXJyYXkiLCJzVGFnIiwiY250bnQiLCJqc29uY29udGVudCIsIkhFQURFUlMiLCJNb25pdG9yIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaGlnaFdhdGVyTWFyayIsImluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMiLCJpbW1lZGlhdGUiLCJwYWNrQW5kUXVldWVNYWluTG9nIiwicGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2ciLCJwYWNrYWdlTWFpbkxvZ0RhdGEiLCJyZXF1ZXN0QmxvYiIsImNoZWNrRm9yTGF0ZXN0Q2hhbmdlcyIsInF1ZXVlTG9ncyIsImhhc0NoYW5nZWQiLCJwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhIiwibG9nRGF0YSIsInBhY2thZ2VBcnJpdmFsTG9nRGF0YSIsImh3bSIsImNvb2tpZUdhSWQiLCJ2aWV3X2Vwb2NoIiwiYm9keSIsImxjIiwidSIsIm9uSGFzaFBjdCIsIkJsb2IiLCJzdGFydHNXaXRoIiwicyIsIm0iLCJ2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbG9zZUV2ZW50IiwiY2FwdHVyZSIsInZpc2liaWxpdHlTdGF0ZSIsInNlbmRCZWFjb24iLCJxdWV1ZWQiLCJxdWV1ZUludGVydmFsIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsIkNQVCIsIm1hdGNoZWRUcmVhdG1lbnRzIiwibXQiLCJjaGVja1BhZ2VUeXBlIiwicGFnZVR5cGVzIiwidXNlclNlZ21lbnQiLCJ1c2VyU2VnbWVudFdlaWdodHMiLCJ0cmVhdG1lbnQiLCJzZWdtZW50ZWRXZWlnaHQiLCJnZXRNYXRjaGVkVHJlYXRtZW50cyIsInB0Iiwic3Vic3RyIiwidHJlYXRtZW50c09iaiIsInRpbWVzdGFtcCIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkSG91cnMiLCJ3ZWlnaHRzT2JqIiwid2VpZ2h0cyIsInJlcGxhY2VyIiwicmVwbGFjZUZuIiwiY3VycmVudFJlcGxhY2VGbiIsInJlcGxhY2VPYmplY3RFeHRyYWN0b3IiLCJyZXBsYWNlVmFsIiwicmVwbGFjZUZuRXhlY3V0b3IiLCJyRm4iLCJzaW5nbGUiLCJyZXBsYWNlRnVuY3Rpb24iLCJGdW5jdGlvbiIsImtleUZhbGxiYWNrIiwiY29uZmlnIiwiZGJOYW1lIiwic3RvcmUiLCJpbmRleGVzIiwiZmllbGRzIiwia2V5UGF0aCIsIm9wZW5EQiIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJpbml0IiwidXBncmFkZSIsImRiIiwib2xkVmVyc2lvbiIsImRlbGV0ZU9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJpZHgiLCJjcmVhdGVJbmRleCIsInJlamVjdCIsInJlYWR3cml0ZSIsImdldERCIiwidHJhbnNhY3Rpb24iLCJwYXlsb2FkIiwiZ2V0U3RvcmUiLCJzYXZlUHJvbWlzZXMiLCJwdXQiLCJjbGVhciIsImNvdW50Iiwib3BlbkN1cnNvciIsImN1cnNvciIsImV4aXN0aW5nUHJvZEluZm8iLCJnZXRDdXJzb3IiLCJlbGFwc2VkU2Vjb25kcyIsInByb2R1Y3RJbmZvUHJvbWlzZSIsImNsZWFyUHJvbWlzZSIsInByb2R1Y3RJbmZvQXJyYXkiLCJzYXZlIiwicHJlcGFyZVBheWxvYWRzIiwicGF5bG9hZHMiLCJmaWVsZE5hbWVzIiwic2hpZnQiLCJTdG9yZSIsImluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsImFwcGx5QWN0aW9ucyIsInRyYW5zZm9ybWVyIiwib3BlcmF0b3IiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwic2VsZWN0b3JGYWxsYmFjayIsIm1kQ29uZGl0aW9uIiwibW92ZV9zZWxlY3Rvcl8xIiwibW92ZV9zZWxlY3Rvcl8yIiwicFR5cGUiLCJwcm9kdWN0SW5mb1N0b3JhZ2UiLCIkIiwibWMiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImJlZm9yZSIsImFmdGVyIiwiYXBwZW5kIiwib2ZmIiwiY3JlYXRlUG9wdXAiLCJlbG0iLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJkaXNwbGF5TW9kYWwiLCJnZXRQcm9kdWN0SW5mbyIsImV2ZW50IiwiZGlzcGxheVBvcHVwIiwiciIsImQiLCJwdXNoU3RhdGUiLCJzdGF0ZSIsIm9uY2UiLCJ0ZXh0IiwiaHRtbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlIiwibjEiLCJuMiIsInN3YXBOb2RlcyIsInNjcmlwdElEIiwiZ2V0RWxlbWVudEJ5SWQiLCJzb3VyY2UiLCJkZXN0aW5hdGlvbiIsInNlbnRlbmNlIiwid29yZCIsImNoYXJBdCIsInRvTG9jYWxlVXBwZXJDYXNlIiwicHJlcGFyZUZpbmFsVGl0bGUiLCJmaW5hbFRpdGxlIiwiY29udGVudHMiLCJub2RlVHlwZSIsIm5vZGVWYWx1ZSIsInByZXBhcmVEZXNjRWxtIiwiZGVzY3JpcHRpb25FbG0iLCJtYXJrZXRpbmdDb3B5IiwidXBkYXRlZEh0bWxTdHJpbmciLCJyZXBsYWNlV2l0aFZhbCIsInRpdGxlQXVnbWVudCIsImh0bWxTdHIiLCJzYWxlQ250VmlzaXRvcnNJbjE1IiwiY2FydENudFZpc2l0b3JzSW4xNSIsInZpZXdDbnRWaXNpdG9yc0luMSIsInRpdGxlcyIsInBhcnNlZFRpdGxlcyIsInBhcnNlZFRpdGxlIiwiaGlkZGVuIiwiaGFuZGxlUG9wdXBDbGljayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb2RhbENsaWNrIiwiaGlkZSIsInFQb3B1cCIsImlzTW9kYWwiLCJwb3B1cFdyYXBwZXIiLCJwb3B1cENsb3NlQnV0dG9uIiwicG9wdXBDbG9zZUJ1dHRvblN0eWxlIiwib25jbGljayIsInNyYyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwicG9wdXAiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsInAxIiwicGFyZW50Tm9kZSIsInAyIiwiaTEiLCJpMiIsImlzRXF1YWxOb2RlIiwiaW5zZXJ0QmVmb3JlIiwid2FpdEZvckpRdWVyeSIsImpRdWVyeSIsImpRdWVyeUludGVydmFsIiwiYWN0aW9uQXBwbGljYXRvciIsImVsaWdpYmxlRWxlbWVudHMiLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImF0dHJpYnV0ZSIsImlubmVyX2NvbmRpdGlvbiIsImNoYWluIiwiY29uZGl0aW9uRWxlbWVudHMiLCJhY3Rpb25Db25kaXRpb25DaGVja2VyIiwiZWxlbWVudFNrdSIsImZuIiwiTXV0ZXgiLCJPQlNFUlZFUl9DT05GSUciLCJhdHRyaWJ1dGVzIiwiUm9ib3RFbmdpbmUiLCJkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyIsImlzT24iLCJlbmdhZ2VtZW50TG9jayIsInJlQXBwbHlUcmVhdG1lbnRzTWFwIiwiYWRkZWREYXRhTGlzdGVuZXJJZHMiLCJyb2JvdFByb21pc2VzIiwiZW5nYWdlUm9ib3QiLCJpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCIsImVsaWdpYmlsaXR5UnVsZVNldCIsImRldmljZSIsImJ1c2luZXNzUnVsZVNldCIsImhlbHBlcnMiLCJhcHBseSIsImFjcXVpcmUiLCJyZWxlYXNlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJwcmVwYXJlZEFjdGlvbnMiLCJpc0VsaWdpYmxlIiwiZW5nYWdlSGVscGVycyIsImFkZFJlYXBwbHlFdmVudCIsImFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzIiwiaGVscGVyUm9ib3RQcm9taXNlcyIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJ0IiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJhcHBsaWVkIiwiYm91bmRFbmdhZ2VUcmVhdG1lbnQiLCJiaW5kIiwic2VsZWN0b3JzIiwiZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyIsInJ1bGVTZXQiLCJwcmV2aW91c1NlbGVjdG9ycyIsInJ1bGUiLCJzZXQiLCJlbGlnaWJpbGl0eVJ1bGUiLCJvcHBvc2l0ZUZsYWciLCJlbGlnaWJpbGl0eVNjb3BlIiwiZWxpZ2liaWxpdHlOYW1lIiwiZWxpZ2liaWxpdHlTZXRUeXBlIiwicHJldmlvdXNJc0VsaWdpYmxlIiwiY2hlY2tFbGlnaWJpbGl0eSIsImJ1c2luZXNzUnVsZSIsImNoZWNrRGF0YUxheWVyUnVsZSIsImRhdGFMYXllckZpbmRlciIsInJ1bnRpbWVWYWx1ZSIsImNoZWNrRWxlbWVudFJ1bGUiLCJzZWxlY3RvckFsbCIsIm1haW5TZWxlY3RvciIsInRlbXBWYWwiLCJyZXR1cm5WYWwiLCJlbGVtIiwiZWxlbWVudFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJzdHlsZUtleSIsInN0eWxlVmFsdWUiLCJjaGVja0Z1bmN0aW9uUnVsZSIsInJ1bGVGdW5jdGlvbiIsImNoZWNrU2Vzc2lvblJ1bGUiLCJkdXJhdGlvbkhhbmRsZXIiLCJoaXN0b3J5SGFuZGxlciIsImdldFNlc3Npb25UaW1lc3RhbXAiLCJjdXJyZW50SGlzdG9yeSIsImNoZWNrVXJsUnVsZSIsInJlcXVlc3RVUkwiLCJjaGVja0VudlJ1bGUiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsImdldFRpdGxlIiwiZ2V0RGVzY3JpcHRpb24iLCJnZXRGcm9tREIiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbl9jb25kaXRpb24iLCJrZXlQcm9taXNlc01hcCIsInJ1bGVzIiwicnVsZVByb21pc2VzIiwic2F0aXNmaWVkUnVsZUlkcyIsInNldFVwTGlzdGVuZXJzIiwiZmlsdGVyZWQiLCJrIiwiZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzIiwiZGF0YUxheWVyUnVsZXMiLCJlbGVtZW50UnVsZXMiLCJib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJtdXRhdGlvblJlY29yZCIsImV2ZXJ5IiwiYmFzZVJ1bGUiLCJlbGlnaWJpbGl0eVJ1bGVzT2JqIiwiYmVhZ2xlT24iLCJlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSIsImFzc2VzRWxpZ2liaWxpdHlSdWxlcyIsInRyZWF0bWVudHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50cyIsInNlYXJjaFBhcmFtcyIsImxhc3RJbmRleE9mIiwiaXRlbSIsInRyZWF0bWVudFJlcG9zaXRvcnkiLCJwcm9kdWN0SW5mb0RCIiwicGVyc2lzdFByb2R1Y3RJbmZvIiwicm9ib3RFbmdpbmUiLCJlbmdhZ2VSb2JvdHMiLCJnZXRFbGlnaWJpbGl0eVJ1bGVzIiwicnVsZUVuZ2luZSIsImNvbXB1dGVTZWdtZW50Iiwic2VnbWVudCIsInNlZ21lbnRSdWxlRW5naW5lIiwiY2hlY2tSdWxlcyIsIlNIVVRET1dOIiwibW9uaXRvciIsImVhcmx5TG9nU2VudCIsImNvb2tpZVBjdCIsInBhY2tBbmRRdWV1ZUFycml2YWxMb2ciLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJvb3NCcmVhayIsIlN0cmluZyIsInByb3RvdHlwZSIsInBhZFN0YXJ0IiwiR0xPVl9PTiIsInByb2Nlc3NBZG1pblVzZXIiLCJpc0FkbWluIiwiaXNDaGFtcCIsInNlbmRMb2dzIl0sInNvdXJjZVJvb3QiOiIifQ==
