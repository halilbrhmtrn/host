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
var VERSION = "0.0.39.5";
var COOKIE_NAME = "_ga";
// TODO revert the following staging env check after moving to new branch structure
var TREATMENTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
var TREATMENT_WEIGHTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
var STYLESHEET_LOCATION = isStaging ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
var E_RULES_LOCATION = isStaging ? "https://ndvivense.glov.ai/eligibility_rules_staging.json" : "https://ndvivense.glov.ai/eligibility_rules.json";
var PRODUCT_INFO_LOCATION = "https://ndvivense.glov.ai/social-proof-v2-staging.json";
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
  MATCHED_TREATMENTS: "GLV_Matched"
};
var LOCAL_STORAGE_KEYS = {
  TREATMENTS: "BG_Treatments",
  WEIGHTS: "BG_Weights",
  ELIGIBILITY_RULES: "BG_E_Rules",
  DEBUG_MODE: "BG_Debug",
  OUT_OF_SCOPE: "BG_OutOfScope",
  IS_LABEL_SENT: "BG_LabelSent",
  USER_ID: "BG_UserId_00",
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
            el.textContent = ".glov-ease {\n    -webkit-animation: smooth 2s ease-in;\n    -moz-animation: smooth 2s ease-in;\n    -o-animation: smooth 2s ease-in;\n    -ms-animation: smooth 2s ease-in;\n    animation: smooth 2s ease-in;\n  }\n  \n  @keyframes smooth {\n    0% { opacity: 0;}\n    25% { opacity: 0.25;}\n    50% { opacity: 0.5;}\n    75% { opacity: 0.75;}\n    100% { opacity: 1;}\n  }\n  @-webkit-keyframes smooth {\n    0% { opacity: 0;}\n    25% { opacity: 0.25;}\n    50% { opacity: 0.5;}\n    75% { opacity: 0.75;}\n    100% { opacity: 1;}\n  }";
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
  setTimeout(function () {
    return controller.abort();
  }, time);
  return controller;
};
var fetchPlus = function fetchPlus(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var retries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
    signal: utils_timeout(5000).signal
  })).then(function (res) {
    if (res.ok) {
      return res;
    }
    if (retries > 0) {
      return fetchPlus(url, options, retries - 1);
    }
    throw new Error(res.status);
  }).catch(function (error) {
    if (retries > 0) {
      logger.failed("Fetch timed out Retrying...: ", error.message);
      return fetchPlus(url, options, retries - 1);
    }
    logger.failed("Fetch failed: ", error.message);
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
    var hash, pct;
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
            hash = getUnsecureHash(identifier);
            if (!(hash === null)) {
              _context6.next = 6;
              break;
            }
            return _context6.abrupt("return", null);
          case 6:
            pct = hash % 100;
            if (!(pct >= 0 && pct < 100)) {
              _context6.next = 9;
              break;
            }
            return _context6.abrupt("return", pct);
          case 9:
            return _context6.abrupt("return", null);
          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            logger.error(_context6.t0);
            return _context6.abrupt("return", null);
          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 12]]);
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

// get deterministic numeric hash from string that conatins only numbers
var getUnsecureHash = function getUnsecureHash(str) {
  var hash = 0;
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
    var _n$id;
    return n.tagName && (((_n$id = n.id) === null || _n$id === void 0 ? void 0 : _n$id.includes("bn-")) || Array.from(n.classList).some(function (c) {
      return c.includes("bn-") || c.includes("nd-");
    }));
  });
};
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
      api_logger.log("Initializing indexedDB");
      // TODO, uncomment next line once existing stale dbs are purged
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
        throw new Error("Error initializing beagle indexed DB", openRequest.error);
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
        }, 1000);
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
var collectorApi = new BeagleDataCollectionWrapper();

// keep a table in indexdb the format [session_id, data_name, data_value, stored_value]

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
var BeagleInfoLayer_logger = new src_logger("BeagleInfoLayer");

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
    BeagleInfoLayer_logger.log("removeFromBeagleInfoLayer", "Removing ".concat(lastKey, " from ").concat(JSON.stringify(obj)));
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
    var windowPtr, navPtr, platform, availWindow, windowDepth, vportShape, width, height, iOS, _windowPtr$screen5, _windowPtr$screen5$or, orientationAngle, temp, _navPtr$userAgentData, _navPtr$userAgentData2, _navPtr$userAgentData3, navAgent, currentURL, firstSessionReferrer, pageType;
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
          case 28:
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
        throw new Error("Error initializing beagle_cache indexed DB", openRequest.error);
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
        }, 1000);
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
                addToBeagleInfoLayer("m", "check-existing-prod-info");
                _context7.next = 3;
                return this.count();
              case 3:
                existingProdInfo = _context7.sent;
                if (!existingProdInfo) {
                  _context7.next = 14;
                  break;
                }
                GlovProductInfoRepository_logger.log("Existing product info found");
                _context7.next = 8;
                return this.getCursor();
              case 8:
                cursor = _context7.sent;
                timestamp = cursor.value.timestamp;
                elapsedSeconds = Date.now() / 1000 - timestamp; // Re-fetch product info once a day
                if (!(elapsedSeconds < 86400)) {
                  _context7.next = 13;
                  break;
                }
                return _context7.abrupt("return");
              case 13:
                GlovProductInfoRepository_logger.log("Existing product info is expired");
              case 14:
                addToBeagleInfoLayer("m", "fetching-prod-info");
                productInfoPromise = fetchProductInfo();
                clearPromise = this.clear();
                _context7.next = 19;
                return Promise.all([productInfoPromise, clearPromise]);
              case 19:
                _yield$Promise$all = _context7.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 1);
                productInfoArray = _yield$Promise$all2[0];
                if (!(!productInfoArray || !productInfoArray.length)) {
                  _context7.next = 24;
                  break;
                }
                return _context7.abrupt("return");
              case 24:
                addToBeagleInfoLayer("m", "fetched-prod-info");
                _context7.next = 27;
                return this.save(this.preparePayloads(productInfoArray));
              case 27:
                addToBeagleInfoLayer("m", "persisted-prod-info");
              case 28:
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
        instance = new src_GlovProductInfoRepository();
        // Hide the constructor so the returned object can't be new'd...
        instance.constructor = null;
      }
      return instance;
    }
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
    var elementSku, productInfo, runTimeValue, res, _runTimeValue, _res;
    return regenerator_default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = type;
            _context2.next = _context2.t0 === "productInfoLookup" ? 3 : 20;
            break;
          case 3:
            elementSku = element.getAttribute(attribute);
            _context2.next = 6;
            return store.getInstance().get(elementSku);
          case 6:
            productInfo = _context2.sent;
            runTimeValue = productInfo === null || productInfo === void 0 ? void 0 : productInfo[operator]; // runTimeValue may be 0
            if (!(runTimeValue === null || runTimeValue === undefined)) {
              _context2.next = 11;
              break;
            }
            action_condition_util_logger.failed("Product info is empty");
            return _context2.abrupt("return", false);
          case 11:
            if (conditionChecker(runTimeValue, inner_condition, value)) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", false);
          case 13:
            if (!chain) {
              _context2.next = 19;
              break;
            }
            _context2.next = 16;
            return actionConditionChecker(element, chain.type, chain.operator, chain.attribute, chain.inner_condition, chain.value, chain.chain);
          case 16:
            res = _context2.sent;
            if (res) {
              _context2.next = 19;
              break;
            }
            return _context2.abrupt("return", false);
          case 19:
            return _context2.abrupt("break", 29);
          case 20:
            _runTimeValue = element.getAttribute(attribute);
            if (conditionChecker(_runTimeValue, inner_condition, value)) {
              _context2.next = 23;
              break;
            }
            return _context2.abrupt("return", false);
          case 23:
            if (!chain) {
              _context2.next = 29;
              break;
            }
            _context2.next = 26;
            return actionConditionChecker(element, chain.type, chain.operator, chain.attribute, chain.inner_condition, chain.value, chain.chain);
          case 26:
            _res = _context2.sent;
            if (_res) {
              _context2.next = 29;
              break;
            }
            return _context2.abrupt("return", false);
          case 29:
            return _context2.abrupt("return", true);
          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
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
  _applyActions = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee7(actions) {
    var logger, POPUP_DISPLAY_FLAG, transformer, prepareFinalTitle, replaceWithVal, getProductInfo, handleDocumentTitleTabChange, handlePopupClick, handleModalClick, displayPopup, displayModal, createPopup, swapNodes, waitForJQuery, actionApplicator, result;
    return regenerator_default().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
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
                  finalTitle,
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
                        _context.next = 225;
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
                        _context.next = 225;
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
                        _context.next = 225;
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
                        _context.next = 225;
                        break;
                      case 166:
                        if (!(operator === "replace")) {
                          _context.next = 171;
                          break;
                        }
                        logger.log("Replacing: ", value);
                        element.replaceAll(value);
                        _context.next = 225;
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
                        _context.next = 225;
                        break;
                      case 178:
                        if (!(operator === "injectscript")) {
                          _context.next = 183;
                          break;
                        }
                        logger.log("Injecting script: ", value);
                        element.append("<script>".concat(value, "</script>"));
                        _context.next = 225;
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
                        _context.next = 225;
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
                        _context.next = 225;
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
                        _context.next = 225;
                        break;
                      case 217:
                        if (!(operator === "title-change")) {
                          _context.next = 224;
                          break;
                        }
                        _context.next = 220;
                        return prepareFinalTitle();
                      case 220:
                        finalTitle = _context.sent;
                        element.text(finalTitle);
                        _context.next = 225;
                        break;
                      case 224:
                        logger.failed("No such operator exists yet", operator);
                      case 225:
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
            prepareFinalTitle = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                var _yield$getFromBeagleI, _yield$getFromBeagleI2, name, sku, productInfo, res;
                return regenerator_default().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return getFromBeagleInfoLayer("pdp", true);
                      case 2:
                        _yield$getFromBeagleI = _context2.sent;
                        _yield$getFromBeagleI2 = _slicedToArray(_yield$getFromBeagleI, 2);
                        name = _yield$getFromBeagleI2[0];
                        sku = _yield$getFromBeagleI2[1];
                        _context2.next = 8;
                        return store.getInstance().get(sku);
                      case 8:
                        productInfo = _context2.sent;
                        res = name + productInfo.titleAugment + "(" + sku + ")";
                        return _context2.abrupt("return", res);
                      case 11:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return function prepareFinalTitle() {
                return _ref.apply(this, arguments);
              };
            }();
            replaceWithVal = function replaceWithVal(value, htmlStr) {
              if (value && htmlStr.includes("{{REPLACE_PRODUCTINFO}}")) {
                htmlStr = replaceAll(htmlStr, "{{REPLACE_PRODUCTINFO}}", value);
              }
              return htmlStr;
            };
            getProductInfo = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(type, value, productInfoStorage) {
                var skuList, res, productInfo;
                return regenerator_default().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(productInfoStorage === "basket")) {
                          _context3.next = 6;
                          break;
                        }
                        _context3.next = 3;
                        return getFromBeagleInfoLayer("__features.SKUsonLastCartView", true);
                      case 3:
                        _context3.t0 = _context3.sent;
                        _context3.next = 9;
                        break;
                      case 6:
                        _context3.next = 8;
                        return getFromBeagleInfoLayer("__features.SKUsonPage", true);
                      case 8:
                        _context3.t0 = _context3.sent;
                      case 9:
                        skuList = _context3.t0;
                        res = null;
                        if (!(!skuList || skuList.length === 0)) {
                          _context3.next = 14;
                          break;
                        }
                        logger.log("No sku found");
                        return _context3.abrupt("return", null);
                      case 14:
                        _context3.next = 16;
                        return store.getInstance().get(skuList[0]);
                      case 16:
                        productInfo = _context3.sent;
                        _context3.t1 = type;
                        _context3.next = _context3.t1 === "transactionIn2Weeks" ? 20 : _context3.t1 === "addToCartIn2Weeks" ? 23 : _context3.t1 === "productViewCount" ? 26 : 29;
                        break;
                      case 20:
                        res = replaceWithVal(productInfo.saleCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing transcationIn2Weeks ", productInfo.saleCntVisitorsIn15);
                        return _context3.abrupt("break", 30);
                      case 23:
                        res = replaceWithVal(productInfo.cartCntVisitorsIn15.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing AddToCartCount ", productInfo.cartCntVisitorsIn15);
                        return _context3.abrupt("break", 30);
                      case 26:
                        res = replaceWithVal(productInfo.viewCntVisitorsIn1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), value);
                        logger.log("Replacing productViewCount for", productInfo.viewCntVisitorsIn1);
                        return _context3.abrupt("break", 30);
                      case 29:
                        logger.failed("no such type found for productInfoLookup operator: " + type);
                      case 30:
                        return _context3.abrupt("return", res);
                      case 31:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return function getProductInfo(_x3, _x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }();
            handleDocumentTitleTabChange = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(event, titles, originalTitle) {
                var parsedTitles, _iterator3, _step3, parsedTitle;
                return regenerator_default().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        parsedTitles = !Array.isArray(titles) ? [titles] : titles;
                        _iterator3 = BeagleApplyActions_createForOfIteratorHelper(parsedTitles);
                        _context4.prev = 2;
                        _iterator3.s();
                      case 4:
                        if ((_step3 = _iterator3.n()).done) {
                          _context4.next = 18;
                          break;
                        }
                        parsedTitle = _step3.value;
                        if (!window.top.document.hidden) {
                          _context4.next = 15;
                          break;
                        }
                        window.top.document.title = parsedTitle;
                        _context4.next = 10;
                        return delay(2000);
                      case 10:
                        window.top.document.title = originalTitle;
                        _context4.next = 13;
                        return delay(2000);
                      case 13:
                        _context4.next = 16;
                        break;
                      case 15:
                        window.top.document.title = originalTitle;
                      case 16:
                        _context4.next = 4;
                        break;
                      case 18:
                        _context4.next = 23;
                        break;
                      case 20:
                        _context4.prev = 20;
                        _context4.t0 = _context4["catch"](2);
                        _iterator3.e(_context4.t0);
                      case 23:
                        _context4.prev = 23;
                        _iterator3.f();
                        return _context4.finish(23);
                      case 26:
                        if (!window.top.document.hidden) {
                          window.top.document.title = originalTitle;
                        } else {
                          handleDocumentTitleTabChange(event, titles, originalTitle);
                        }
                      case 27:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, null, [[2, 20, 23, 26]]);
              }));
              return function handleDocumentTitleTabChange(_x6, _x7, _x8) {
                return _ref3.apply(this, arguments);
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
                  setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
                    return regenerator_default().wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            clearInterval(jQueryInterval);
                            resolve(false);
                          case 2:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  })), 2000);
                } else resolve(true);
              });
            };
            actionApplicator = /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(actions) {
                var _iterator4, _step4, action, _result, eligibleElements, _iterator5, _step5, element;
                return regenerator_default().wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return waitForJQuery();
                      case 2:
                        if (!_context6.sent) {
                          _context6.next = 59;
                          break;
                        }
                        _iterator4 = BeagleApplyActions_createForOfIteratorHelper(actions);
                        _context6.prev = 4;
                        _iterator4.s();
                      case 6:
                        if ((_step4 = _iterator4.n()).done) {
                          _context6.next = 49;
                          break;
                        }
                        action = _step4.value;
                        _context6.prev = 8;
                        _result = false;
                        if (!action.condition) {
                          _context6.next = 36;
                          break;
                        }
                        _context6.next = 13;
                        return action_condition_util(action.condition);
                      case 13:
                        eligibleElements = _context6.sent;
                        _iterator5 = BeagleApplyActions_createForOfIteratorHelper(eligibleElements);
                        _context6.prev = 15;
                        _iterator5.s();
                      case 17:
                        if ((_step5 = _iterator5.n()).done) {
                          _context6.next = 26;
                          break;
                        }
                        element = _step5.value;
                        _context6.next = 21;
                        return transformer(action, element);
                      case 21:
                        _result = _context6.sent;
                        if (!(_result === false)) {
                          _context6.next = 24;
                          break;
                        }
                        return _context6.abrupt("return", false);
                      case 24:
                        _context6.next = 17;
                        break;
                      case 26:
                        _context6.next = 31;
                        break;
                      case 28:
                        _context6.prev = 28;
                        _context6.t0 = _context6["catch"](15);
                        _iterator5.e(_context6.t0);
                      case 31:
                        _context6.prev = 31;
                        _iterator5.f();
                        return _context6.finish(31);
                      case 34:
                        _context6.next = 39;
                        break;
                      case 36:
                        _context6.next = 38;
                        return transformer(action);
                      case 38:
                        _result = _context6.sent;
                      case 39:
                        if (!(_result === false)) {
                          _context6.next = 41;
                          break;
                        }
                        return _context6.abrupt("return", false);
                      case 41:
                        _context6.next = 47;
                        break;
                      case 43:
                        _context6.prev = 43;
                        _context6.t1 = _context6["catch"](8);
                        logger.failed("Couldn't apply action ".concat(JSON.stringify(action), " with error ").concat(_context6.t1.message));
                        return _context6.abrupt("return", _context6.t1);
                      case 47:
                        _context6.next = 6;
                        break;
                      case 49:
                        _context6.next = 54;
                        break;
                      case 51:
                        _context6.prev = 51;
                        _context6.t2 = _context6["catch"](4);
                        _iterator4.e(_context6.t2);
                      case 54:
                        _context6.prev = 54;
                        _iterator4.f();
                        return _context6.finish(54);
                      case 57:
                        _context6.next = 61;
                        break;
                      case 59:
                        logger.failed("Jquery not found on window");
                        return _context6.abrupt("return", false);
                      case 61:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, null, [[4, 51, 54, 57], [8, 43], [15, 28, 31, 34]]);
              }));
              return function actionApplicator(_x9) {
                return _ref5.apply(this, arguments);
              };
            }(); // Apply actions
            _context7.next = 17;
            return actionApplicator(actions);
          case 17:
            result = _context7.sent;
            return _context7.abrupt("return", result);
          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
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
                  _context3.next = 55;
                  break;
                }
                treatmentSkipRatio = weight === 100 ? 0 : 100 - weight || TREATMENT_RATIO;
                robotEngine_logger.log("Treatment skip ratio: " + treatmentSkipRatio);
                // Determining identifier for calculating treatment percentage (treatmentPct)
                determiningIdentifier = dependant_on_treatment || id; // treatmentPct is the percentage value for the treatment used to determine if it should be skipped or not
                // treatmentPct is 100 when debug mode is 1, ensuring no treatments are skipped
                if (!(debugMode === 1)) {
                  _context3.next = 29;
                  break;
                }
                _context3.t1 = 100;
                _context3.next = 32;
                break;
              case 29:
                _context3.next = 31;
                return determinePct(identifier + determiningIdentifier);
              case 31:
                _context3.t1 = _context3.sent;
              case 32:
                treatmentPct = _context3.t1;
                robotEngine_logger.log("TreatmentPct: " + treatmentPct + " with debug mode ".concat(debugMode ? "on" : "off"));
                businessRuleId = null;
                if (!businessRuleSet) {
                  _context3.next = 41;
                  break;
                }
                robotEngine_logger.log("Starting sub variant rule set check for treatment: " + id);
                _context3.next = 39;
                return this.checkBusinessRules(businessRuleSet);
              case 39:
                businessRuleId = _context3.sent;
                if (businessRuleId !== null) {
                  robotEngine_logger.log("Applying business rule transformation with id: ", businessRuleId);
                } else robotEngine_logger.log("Applying treatment with default values");
              case 41:
                if (!(treatmentPct < treatmentSkipRatio)) {
                  _context3.next = 45;
                  break;
                }
                robotEngine_logger.log("Treatment ".concat(id, " skipped due to treatment split ratio"));
                addTreatment(id, businessRuleId, null, "skipped", dependant_on_treatment);
                return _context3.abrupt("return");
              case 45:
                if (delay) {
                  _context3.next = 52;
                  break;
                }
                _context3.next = 48;
                return prepareAndApply(id, identifier, actions, businessRuleId, debugMode);
              case 48:
                _context3.next = 50;
                return this.engageHelpers(helpers, matchedTreatments);
              case 50:
                _context3.next = 53;
                break;
              case 52:
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
              case 53:
                _context3.next = 56;
                break;
              case 55:
                robotEngine_logger.failed("Rule check failed for treatment:", id);
              case 56:
                _context3.prev = 56;
                release();
                this.addReapplyEvent(treatment);
                this.addRuleSetDataListeners(treatment);
                return _context3.finish(56);
              case 61:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6,, 56, 61]]);
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
                if (res === false) {
                  addTreatment(id, businessRuleId, variant, "failed");
                } else {
                  addTreatment(id, businessRuleId, variant, "applied");
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
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(identifier, debugMode, pageType, treatmentWeights) {
    var persistProductInfoPromise, eligibilityRulesAssessPromise, treatmentsPromise, searchParams, debugFilteredTreatments, treatments, treatmentRepository, matchedTreatments, robotEngine;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            persistProductInfoPromise = store.getInstance().persistProductInfo();
            eligibilityRulesAssessPromise = assesEligibilityRules();
            treatmentsPromise = BeagleTreatmentRepository.getTreatments();
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
            _context.next = 11;
            return treatmentsPromise;
          case 11:
            treatments = _context.sent;
            if (treatments) {
              _context.next = 15;
              break;
            }
            addToBeagleInfoLayer("m", "no-robot-weights");
            throw new Error("Failed to fetch treatments/weights");
          case 15:
            BeagleOn_logger.success("Found treatments: ", treatments);
            addToBeagleInfoLayer("m", "fetched-treatments");
            treatmentRepository = new BeagleTreatmentRepository({
              treatments: treatments,
              treatmentWeights: treatmentWeights
            });
            _context.next = 20;
            return treatmentRepository.getMatchedTreatments(debugMode);
          case 20:
            matchedTreatments = _context.sent;
            if (!(matchedTreatments === null)) {
              _context.next = 25;
              break;
            }
            addToBeagleInfoLayer("m", "no-user-segment");
            removeDocumentHide();
            return _context.abrupt("return");
          case 25:
            if (matchedTreatments.length) {
              _context.next = 30;
              break;
            }
            BeagleOn_logger.log("No treatments matched, returning without further action");
            addToBeagleInfoLayer("m", "no-robot-matched");
            removeDocumentHide();
            return _context.abrupt("return");
          case 30:
            addToBeagleInfoLayer("m", "found-matched-robots");
            _context.prev = 31;
            _context.next = 34;
            return eligibilityRulesAssessPromise;
          case 34:
            _context.next = 40;
            break;
          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](31);
            addToBeagleInfoLayer("m", "no-rules-assessed");
            throw new Error("Could not asses eligibility rules");
          case 40:
            addToBeagleInfoLayer("m", "rules-assessed");
            _context.prev = 41;
            _context.next = 44;
            return persistProductInfoPromise;
          case 44:
            _context.next = 50;
            break;
          case 46:
            _context.prev = 46;
            _context.t1 = _context["catch"](41);
            addToBeagleInfoLayer("m", "product-into-no-persist");
            throw new Error("Could not persist product info");
          case 50:
            addToBeagleInfoLayer("m", "engaging-robots");
            robotEngine = new RobotEngine({
              debugFilteredTreatments: debugFilteredTreatments,
              debugMode: debugMode,
              matchedTreatments: matchedTreatments,
              identifier: identifier,
              pageType: pageType
            });
            _context.next = 54;
            return robotEngine.engageRobots();
          case 54:
            removeDocumentHide();
            addToBeagleInfoLayer("m", "robots-engaged");
            _context.t2 = BeagleOn_logger;
            _context.next = 59;
            return getFromBeagleInfoLayer("a");
          case 59:
            _context.t3 = _context.sent;
            _context.t2.success.call(_context.t2, "Applied treatments: ", _context.t3);
          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[31, 36], [41, 46]]);
  }));
  return function beagleOn(_x, _x2, _x3, _x4) {
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
  var monitor, logger, earlyLogSent, hideRemoved, _String$prototype, treatmentWeightsPromise, identifier, cookiePct, userSegment, treatmentWeights, oosReason, isLabelSent, timeoutCounter, debugMode, processAdminUser, isAdmin, isOn, pageType;
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
          hideRemoved = false;
          _context.prev = 7;
          /* ======================================== INIT TASKS ===================================== */

          addToBeagleInfoLayer("GLOV_ON", "not-sent | initializing");
          treatmentWeightsPromise = BeagleTreatmentRepository.getTreatmentWeights();
          monitor = new BeagleMonitor();
          initializeBeagleInfoLayer();
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
          addToBeagleInfoLayer("view_epoch", Date.now() + Math.random());
          addToBeagleInfoLayer("v", VERSION);
          addToBeagleInfoLayer("sr", SPLIT_RATIO);

          // data-less log to detect bounces
          _context.next = 26;
          return monitor.packAndQueueArrivalLog();
        case 26:
          setTimeout(function () {
            removeDocumentHide();
          }, 2000);

          /* ================================= EARLY PRUNE OUT-OF-SCOPE ============================== */
          userSegment = null;
          treatmentWeights = null;
          oosReason = window.localStorage.getItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE);
          if (!(oosReason !== "unsupported")) {
            _context.next = 40;
            break;
          }
          _context.next = 33;
          return treatmentWeightsPromise;
        case 33:
          treatmentWeights = _context.sent;
          if (treatmentWeights) {
            _context.next = 37;
            break;
          }
          addToBeagleInfoLayer("m", "no-robot-weights");
          throw new Error("Unable to fetch weights");
        case 37:
          _context.next = 39;
          return computeSegment(treatmentWeights);
        case 39:
          userSegment = _context.sent;
        case 40:
          if (!(cookiePct === null || !navigator.sendBeacon || typeof navigator.sendBeacon !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype = String.prototype) === null || _String$prototype === void 0 ? void 0 : _String$prototype.padStart) !== "function" || oosReason && oosReason === "unsupported" || !userSegment)) {
            _context.next = 45;
            break;
          }
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "unsupported");
          addToBeagleInfoLayer("GLOV_ON", "unsupported | device");
          throw new Error("unsupported-device");
        case 45:
          isLabelSent = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT);
          timeoutCounter = parseInt(sessionStorage.getItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT)) || 0; // check if debug mode is on, also adds dbm to beagleInfoLayer and sets oosReason
          debugMode = getDebugMode("employee"); // if timed-out too many times for very first interactsions, make out of scope for the session
          if (!(!debugMode && !oosReason && !isLabelSent && timeoutCounter > MAX_TIMEOUT_PER_SESSION)) {
            _context.next = 52;
            break;
          }
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          addToBeagleInfoLayer("GLOV_ON", "unsupported | timeout");
          throw new Error("max-timeout");
        case 52:
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
            _context.next = 60;
            break;
          }
          _context.next = 57;
          return getFromBeagleInfoLayer("vvsIsShowroom", true);
        case 57:
          isAdmin = _context.sent;
          _context.next = 61;
          break;
        case 60:
          if (isAdmin === "false" || isAdmin === false) {
            // async call to getFromBeagleInfoLayer, then set localStorage
            getFromBeagleInfoLayer("vvsIsShowroom", true).then(function (isAdmin) {
              if (isAdmin && (isAdmin === "true" || isAdmin === true)) {
                processAdminUser();
              }
            });
          }
        case 61:
          if (!(isAdmin && (isAdmin === "true" || isAdmin === true))) {
            _context.next = 65;
            break;
          }
          processAdminUser();
          _context.next = 72;
          break;
        case 65:
          if (!(isAdmin === null || isAdmin === undefined)) {
            _context.next = 71;
            break;
          }
          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("no-admin-status");
        case 71:
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, false);
        case 72:
          if (window.top.document.documentElement.classList.contains("glov-ease")) {
            _context.next = 76;
            break;
          }
          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("anti-flicker-timeout");
        case 76:
          /* ===================================== ON/OFF CHECK ====================================== */
          // isOn can be true (ON), false (OFF)
          isOn = null;
          if (!debugMode) {
            _context.next = 84;
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
        case 84:
          if (!(oosReason && oosReason === "employee")) {
            _context.next = 91;
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
        case 91:
          if (!oosReason) {
            _context.next = 96;
            break;
          }
          addToBeagleInfoLayer("GLOV_ON", "not-sent | unknown");
          throw new Error("Unknown out of scope reason");
        case 96:
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
          if (!(isOn === true)) {
            _context.next = 119;
            break;
          }
          if (!SHUTDOWN) {
            logger.log("Beagle ON Group Path");
            BeagleOn(identifier, debugMode, pageType, treatmentWeights);
          } else {
            logger.info("Beagle ON Group SHUTDOWN Path");
            removeDocumentHide();
            hideRemoved = true;
          }
          _context.next = 126;
          break;
        case 119:
          if (!(isOn === false)) {
            _context.next = 125;
            break;
          }
          logger.info("Beagle OFF Group Path");
          removeDocumentHide();
          hideRemoved = true;
          _context.next = 126;
          break;
        case 125:
          throw new Error("isOn is undefined or null");
        case 126:
          _context.next = 134;
          break;
        case 128:
          _context.prev = 128;
          _context.t0 = _context["catch"](7);
          logger.warn("Beagle Early Scope-out or ERROR: ", _context.t0.message);
          addToBeagleInfoLayer("m", _context.t0.message);
          if (!earlyLogSent && monitor) monitor.sendLogs(false);
          if (!hideRemoved) removeDocumentHide();
        case 134:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[7, 128]]);
}))();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDLHlCQUF5QixTQUFTLHlCQUF5Qjs7Ozs7OztBQ3JUakc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRyxFQUFFLHlCQUF5QixTQUFTLHlCQUF5QjtBQUNoRTtBQUNBLDBCQUEwQix5QkFBeUIsU0FBUyx5QkFBeUI7Ozs7Ozs7QUNUckY7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLEVBQStCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7Ozs7Ozs7O0FDQTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7QUM3QmU7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIOztBQ1JlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FDSmtDO0FBQ25CO0FBQ2YsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsUUFBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FDVmtDO0FBQ1M7QUFDNUI7QUFDZixZQUFZLFlBQVc7QUFDdkIsU0FBUyxPQUFPO0FBQ2hCOztBQ0wrQztBQUMvQztBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsY0FBYTtBQUMvQztBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQ2pCTyxJQUFNQSxVQUFVLEdBQUcsU0FBYkEsVUFBVSxDQUFJQyxHQUFHLEVBQUVDLElBQUksRUFBbUI7RUFBQSxJQUFqQkMsT0FBTyx1RUFBRyxFQUFFO0VBQ2hELElBQUksQ0FBQ0YsR0FBRyxFQUFFLE9BQU8sRUFBRTtFQUVuQixJQUFNRyxLQUFLLEdBQUdILEdBQUcsQ0FBQ0ksT0FBTyxDQUFDSCxJQUFJLENBQUM7RUFDL0IsSUFBSUUsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPSCxHQUFHO0VBRXpCLE9BQU9BLEdBQUcsQ0FBQ0ksT0FBTyxDQUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDN0IsSUFBTUUsTUFBSyxHQUFHSCxHQUFHLENBQUNJLE9BQU8sQ0FBQ0gsSUFBSSxDQUFDO0lBQy9CRCxHQUFHLEdBQUcsQ0FBQ0csTUFBSyxHQUFHLENBQUMsR0FBR0gsR0FBRyxDQUFDSyxTQUFTLENBQUMsQ0FBQyxFQUFFRixNQUFLLENBQUMsR0FBRyxFQUFFLElBQUlELE9BQU8sR0FBR0YsR0FBRyxDQUFDSyxTQUFTLENBQUNGLE1BQUssR0FBR0YsSUFBSSxDQUFDSyxNQUFNLENBQUM7RUFDakc7RUFFQSxPQUFPTixHQUFHO0FBQ1osQ0FBQztBQUVNLElBQU1PLGNBQWMsR0FBRyxTQUFqQkEsY0FBYyxDQUFJUCxHQUFHLEVBQUs7RUFDckMsSUFBSSxDQUFDQSxHQUFHLElBQUksT0FBT0EsR0FBRyxLQUFLLFFBQVEsRUFBRSxPQUFPQSxHQUFHO0VBQy9DLElBQUlRLE1BQU0sR0FBR1IsR0FBRztFQUNoQixJQUFNUyxPQUFPLEdBQUc7SUFBQyxHQUFHLEVBQUUsR0FBRztJQUFFLEdBQUcsRUFBRSxHQUFHO0lBQUUsR0FBRyxFQUFFLEdBQUc7SUFBRSxHQUFHLEVBQUUsR0FBRztJQUFFLEdBQUcsRUFBRSxHQUFHO0lBQUUsR0FBRyxFQUFFLEdBQUc7SUFBRSxHQUFHLEVBQUU7RUFBRyxDQUFDO0VBQ3RGRCxNQUFNLEdBQUdBLE1BQU0sQ0FBQ04sT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVNRLE1BQU0sRUFBRTtJQUN6RCxPQUFPRCxPQUFPLENBQUNDLE1BQU0sQ0FBQztFQUN4QixDQUFDLENBQUM7RUFDRixPQUFPRixNQUFNLENBQUNHLFdBQVcsRUFBRTtBQUM3QixDQUFDOztBQ3RCRDtBQUN5QztBQUN6QyxJQUFNQyxTQUFTLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSTtBQUVsRyxJQUFNQyxPQUFPLEdBQUcsVUFBVTtBQUMxQixJQUFNQyxXQUFXLEdBQUcsS0FBSztBQUNoQztBQUNPLElBQU1DLG1CQUFtQixHQUFHUCxTQUFTLEdBQUcsbURBQW1ELEdBQUcsMkNBQTJDO0FBQ3pJLElBQU1RLDBCQUEwQixHQUFHUixTQUFTLEdBQUcsZ0RBQWdELEdBQUcsd0NBQXdDO0FBQzFJLElBQU1TLG1CQUFtQixHQUFHVCxTQUFTLEdBQUcsaURBQWlELHdEQUFpRGIsVUFBVSxDQUFDLElBQUl1QixJQUFJLEVBQUUsQ0FBQ0MsV0FBVyxFQUFFLENBQUNsQixTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDSCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBRTtBQUMzTixJQUFNc0IsZ0JBQWdCLEdBQUdaLFNBQVMsR0FBRywwREFBMEQsR0FBRyxrREFBa0Q7QUFDcEosSUFBTWEscUJBQXFCLEdBQUcsd0RBQXdEO0FBQ3RGLElBQU1DLFdBQVcsR0FBRywrREFBK0Q7QUFDbkYsSUFBTUMsY0FBYyxHQUFHLGlDQUFpQztBQUN4RCxJQUFNQyxrQkFBa0IsR0FBRyxvQkFBb0I7QUFDdEQ7QUFDTyxJQUFNQyxXQUFXLEdBQUcsRUFBRTtBQUM3QjtBQUNPLElBQU1DLGVBQWUsR0FBRyxFQUFFO0FBQzFCLElBQU1DLHVCQUF1QixHQUFHLENBQUM7QUFDakMsSUFBTUMsdUJBQXVCLEdBQUcsQ0FBQztBQUNqQyxJQUFNQyxxQkFBcUIsR0FBRyxpREFBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLHdCQUF3QixFQUM5Ryx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztBQUNwRyxJQUFNQyxZQUFZLEdBQUcsS0FBSztBQUUxQixJQUFNQyxvQkFBb0IsR0FBRztFQUNsQ0MsaUJBQWlCLEVBQUUscUJBQXFCO0VBQ3hDQyxlQUFlLEVBQUUsbUJBQW1CO0VBQ3BDQyxrQkFBa0IsRUFBRSxxQkFBcUI7RUFDekNDLGVBQWUsRUFBRSxzQkFBc0I7RUFDdkNDLGFBQWEsRUFBRSxpQkFBaUI7RUFDaENDLGdCQUFnQixFQUFFLG9CQUFvQjtFQUN0Q0Msa0JBQWtCLEVBQUU7QUFDdEIsQ0FBQztBQUNNLElBQU1DLGtCQUFrQixHQUFHO0VBQ2hDQyxVQUFVLEVBQUUsZUFBZTtFQUMzQkMsT0FBTyxFQUFFLFlBQVk7RUFDckJDLGlCQUFpQixFQUFFLFlBQVk7RUFDL0JDLFVBQVUsRUFBRSxVQUFVO0VBQ3RCQyxZQUFZLEVBQUUsZUFBZTtFQUM3QkMsYUFBYSxFQUFFLGNBQWM7RUFDN0JDLE9BQU8sRUFBRSxjQUFjO0VBQ3ZCQyx5QkFBeUIsRUFBRSx1QkFBdUI7RUFDbERDLFFBQVEsRUFBRTtBQUNaLENBQUM7QUFFTSxJQUFNQyxxQkFBcUIsR0FBRyxTQUFTOzs7OztBQzlDQztBQUFBLElBQ3pDQyxNQUFNO0VBQ1Ysa0JBQTJEO0lBQUEsSUFBL0NDLE1BQU0sdUVBQUcsbUJBQW1CO0lBQUEsSUFBRUMsT0FBTyx1RUFBRyxLQUFLO0lBQUE7SUFDdkQsSUFBSSxDQUFDRCxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSUMsT0FBTyxFQUFFO01BQ1gsSUFBSSxDQUFDQyxLQUFLLEdBQUcsQ0FBQztJQUNoQixDQUFDLE1BQU07TUFDTCxJQUFJLENBQUNBLEtBQUssR0FBRzVDLE1BQU0sQ0FBQzZDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDaEIsNkJBQTZCLENBQUM7SUFDekU7RUFDRjtFQUFDO0lBQUE7SUFBQSxPQUVELGdCQUFjO01BQUE7TUFDWixJQUFPWSxNQUFNLEdBQUksSUFBSSxDQUFkQSxNQUFNO01BQVMsa0NBRGhCSyxJQUFJO1FBQUpBLElBQUk7TUFBQTtNQUVWLFlBQUFDLE9BQU8sRUFBQ0MsSUFBSSw2QkFBS1AsTUFBTSxlQUFRSyxJQUFJLEVBQUM7SUFDdEM7RUFBQztJQUFBO0lBQUEsT0FFRCxlQUFhO01BQ1gsSUFBT0gsS0FBSyxHQUFZLElBQUksQ0FBckJBLEtBQUs7UUFBRUYsTUFBTSxHQUFJLElBQUksQ0FBZEEsTUFBTTtNQUNwQixJQUFJRSxLQUFLLEVBQUU7UUFBQTtRQUFBLG1DQUZORyxJQUFJO1VBQUpBLElBQUk7UUFBQTtRQUdQLGFBQUFDLE9BQU8sRUFBQ0UsR0FBRyw4QkFBS1IsTUFBTSxlQUFRSyxJQUFJLEVBQUM7TUFDckM7SUFDRjtFQUFDO0lBQUE7SUFBQSxPQUVELGtCQUFnQjtNQUFBO01BQ2QsSUFBT0gsS0FBSyxHQUFZLElBQUksQ0FBckJBLEtBQUs7UUFBRUYsTUFBTSxHQUFJLElBQUksQ0FBZEEsTUFBTTtNQUNwQixJQUFJLENBQUNFLEtBQUssRUFBRTtNQUNaLElBQUlPLGFBQWEsR0FBRyxTQUFTO01BQUMsbUNBSHRCSixJQUFJO1FBQUpBLElBQUk7TUFBQTtNQUtaQSxJQUFJLENBQUNLLE9BQU8sQ0FBQyxVQUFDQyxRQUFRLEVBQUs7UUFDekIsSUFBTUMsSUFBSSxHQUFHLFFBQU9ELFFBQVE7UUFDNUIsUUFBUUMsSUFBSTtVQUNWLEtBQUssUUFBUTtVQUNiLEtBQUssUUFBUTtVQUNiLEtBQUssU0FBUztZQUNaSCxhQUFhLElBQUksT0FBTztZQUN4QjtVQUVGLEtBQUssUUFBUTtZQUNYQSxhQUFhLElBQUksT0FBTztZQUN4QjtVQUVGLEtBQUssUUFBUTtVQUNiLEtBQUssV0FBVztVQUNoQjtZQUNFQSxhQUFhLElBQUksT0FBTztRQUFDO01BRS9CLENBQUMsQ0FBQztNQUNGLGFBQUFILE9BQU8sRUFBQ0UsR0FBRyxtQkFBQ0MsYUFBYSxFQUFFLFlBQVksYUFBTVQsTUFBTSxlQUFRSyxJQUFJLEVBQUM7SUFDbEU7RUFBQztJQUFBO0lBQUEsT0FFRCxtQkFBaUI7TUFBQTtNQUNmLElBQU9ILEtBQUssR0FBWSxJQUFJLENBQXJCQSxLQUFLO1FBQUVGLE1BQU0sR0FBSSxJQUFJLENBQWRBLE1BQU07TUFDcEIsSUFBSSxDQUFDRSxLQUFLLEVBQUU7TUFDWixJQUFJTyxhQUFhLEdBQUcsU0FBUztNQUFDLG1DQUhyQkosSUFBSTtRQUFKQSxJQUFJO01BQUE7TUFLYkEsSUFBSSxDQUFDSyxPQUFPLENBQUMsVUFBQ0MsUUFBUSxFQUFLO1FBQ3pCLElBQU1DLElBQUksR0FBRyxRQUFPRCxRQUFRO1FBQzVCLFFBQVFDLElBQUk7VUFDVixLQUFLLFFBQVE7VUFDYixLQUFLLFFBQVE7VUFDYixLQUFLLFNBQVM7WUFDWkgsYUFBYSxJQUFJLE9BQU87WUFDeEI7VUFFRixLQUFLLFFBQVE7WUFDWEEsYUFBYSxJQUFJLE9BQU87WUFDeEI7VUFFRixLQUFLLFFBQVE7VUFDYixLQUFLLFdBQVc7VUFDaEI7WUFDRUEsYUFBYSxJQUFJLE9BQU87UUFBQztNQUUvQixDQUFDLENBQUM7TUFDRixhQUFBSCxPQUFPLEVBQUNFLEdBQUcsbUJBQUNDLGFBQWEsRUFBRSxjQUFjLGFBQU1ULE1BQU0sZUFBUUssSUFBSSxFQUFDO0lBQ3BFO0VBQUM7SUFBQTtJQUFBLE9BRUQsZ0JBQWM7TUFBQTtNQUNaLElBQU9MLE1BQU0sR0FBSSxJQUFJLENBQWRBLE1BQU07TUFBUyxtQ0FEaEJLLElBQUk7UUFBSkEsSUFBSTtNQUFBO01BRVYsYUFBQUMsT0FBTyxFQUFDTyxJQUFJLDhCQUFLYixNQUFNLGVBQVFLLElBQUksRUFBQztJQUN0QztFQUFDO0lBQUE7SUFBQSxPQUVELGlCQUFlO01BQUE7TUFDYixJQUFPTCxNQUFNLEdBQUksSUFBSSxDQUFkQSxNQUFNO01BQVMsbUNBRGZLLElBQUk7UUFBSkEsSUFBSTtNQUFBO01BRVgsYUFBQUMsT0FBTyxFQUFDUSxLQUFLLDhCQUFLZCxNQUFNLGVBQVFLLElBQUksRUFBQztJQUN2QztFQUFDO0VBQUE7QUFBQTtBQUdILCtDQUFlTixNQUFNOztBQ3hGTjtBQUNmO0FBQ0E7O0FDRmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsWUFBWSw2RUFBNkU7QUFDakc7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QmU7QUFDZjtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQ05xRDtBQUN0QztBQUNmO0FBQ0Esb0NBQW9DLGlCQUFnQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxzRkFBc0YsaUJBQWdCO0FBQ3RHOztBQ1JlO0FBQ2Y7QUFDQTs7QUNGaUQ7QUFDWTtBQUNZO0FBQ3RCO0FBQ3BDO0FBQ2YsU0FBUyxlQUFjLFNBQVMscUJBQW9CLFlBQVksMkJBQTBCLFlBQVksZ0JBQWU7QUFDckg7O0FDTnFEO0FBQ3RDO0FBQ2YsaUNBQWlDLGlCQUFnQjtBQUNqRDs7QUNIZTtBQUNmO0FBQ0E7O0FDRmU7QUFDZjtBQUNBOztBQ0Z1RDtBQUNKO0FBQ3NCO0FBQ2xCO0FBQ3hDO0FBQ2YsU0FBUyxrQkFBaUIsU0FBUyxnQkFBZSxTQUFTLDJCQUEwQixTQUFTLGtCQUFpQjtBQUMvRzs7QUNOK0M7QUFDaEM7QUFDZixRQUFRLGNBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZEE7QUFDdUQ7QUFTbEM7QUFDUztBQUU5QixJQUFNaUIsTUFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsYUFBYSxDQUFDO0FBQ3hDLElBQU1rQixNQUFNLEdBQUc7RUFDYixNQUFNLEVBQUUsQ0FBQztFQUNULE9BQU8sRUFBRSxDQUFDO0VBQ1YsTUFBTSxFQUFFLENBQUM7RUFDVCxPQUFPLEVBQUUsQ0FBQztFQUNWLE9BQU8sRUFBRSxDQUFDO0VBQ1YsU0FBUyxFQUFFLENBQUM7RUFDWixRQUFRLEVBQUUsQ0FBQztFQUNYLFNBQVMsRUFBRSxDQUFDO0VBQ1osT0FBTyxFQUFFLENBQUM7RUFDVixNQUFNLEVBQUUsQ0FBQztFQUNULE9BQU8sRUFBRSxFQUFFO0VBQ1gsUUFBUSxFQUFFO0FBQ1osQ0FBQztBQUVNLElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0IsR0FBUztFQUN0QzVELE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQztFQUNqRWpFLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUNuRSxDQUFDO0FBRU0sSUFBTUMsZUFBZTtFQUFBLHNFQUFHO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBLElBQ3hCbEUsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDRyxRQUFRLENBQUMsV0FBVyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUNsRUMsRUFBRSxHQUFHTixRQUFRLENBQUNPLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDMUNELEVBQUUsQ0FBQ0UsV0FBVyw2aEJBcUJaO1lBQ0Z0RSxNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDUSxPQUFPLENBQUNILEVBQUUsQ0FBQztZQUMvQ3BFLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ1EsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUM5RHhFLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQztVQUFDO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ25FO0VBQUEsZ0JBNUJZQyxlQUFlO0lBQUE7RUFBQTtBQUFBLEdBNEIzQjtBQUVNLElBQU1PLGVBQWU7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUUzQmYsTUFBTSxDQUFDUixHQUFHLENBQUMscUJBQXFCLENBQUM7WUFBQztZQUFBLE9BQ1R3QixTQUFTLENBQUNwRSxtQkFBbUIsQ0FBQztVQUFBO1lBQWpEcUUsVUFBVTtZQUFBLElBQ1hBLFVBQVU7Y0FBQTtjQUFBO1lBQUE7WUFBQSxNQUFRLElBQUlDLEtBQUssRUFBRTtVQUFBO1lBQUE7WUFBQSxPQUNORCxVQUFVLENBQUNFLElBQUksRUFBRTtVQUFBO1lBQXZDQyxhQUFhO1lBQUEsa0NBQ1pBLGFBQWE7VUFBQTtZQUFBO1lBQUE7WUFFcEJwQixNQUFNLENBQUNxQixNQUFNLENBQUMsNEJBQTRCLEVBQUUsYUFBSUMsT0FBTyxDQUFDO1lBQUMsa0NBQ2xELElBQUk7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUVkO0VBQUEsZ0JBWFlQLGVBQWU7SUFBQTtFQUFBO0FBQUEsR0FXM0I7QUFFTSxJQUFNUSxxQkFBcUI7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUVqQ3ZCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixDQUFDO1lBQUM7WUFBQSxPQUNWd0IsU0FBUyxDQUFDbkUsMEJBQTBCLENBQUM7VUFBQTtZQUE5RDJFLGdCQUFnQjtZQUFBLElBQ2pCQSxnQkFBZ0I7Y0FBQTtjQUFBO1lBQUE7WUFBQSxNQUFRLElBQUlOLEtBQUssRUFBRTtVQUFBO1lBQUE7WUFBQSxPQUNMTSxnQkFBZ0IsQ0FBQ0wsSUFBSSxFQUFFO1VBQUE7WUFBcERNLG9CQUFvQjtZQUFBLGtDQUNuQkEsb0JBQW9CO1VBQUE7WUFBQTtZQUFBO1lBRTNCekIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLG1DQUFtQyxFQUFFLGFBQUlDLE9BQU8sQ0FBQztZQUFDLGtDQUN6RCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQVhZQyxxQkFBcUI7SUFBQTtFQUFBO0FBQUEsR0FXakM7QUFFTSxJQUFNRyxxQkFBcUI7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUVqQzFCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixDQUFDO1lBQUM7WUFBQSxPQUNWd0IsU0FBUyxDQUFDL0QsZ0JBQWdCLENBQUM7VUFBQTtZQUFwRDBFLGdCQUFnQjtZQUFBLElBQ2pCQSxnQkFBZ0I7Y0FBQTtjQUFBO1lBQUE7WUFBQSxNQUFRLElBQUlULEtBQUssRUFBRTtVQUFBO1lBQUE7WUFBQSxPQUNMUyxnQkFBZ0IsQ0FBQ1IsSUFBSSxFQUFFO1VBQUE7WUFBcERTLG9CQUFvQjtZQUFBLGtDQUNuQkEsb0JBQW9CO1VBQUE7WUFBQTtZQUFBO1lBRTNCNUIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLG1DQUFtQyxFQUFFLGFBQUlDLE9BQU8sQ0FBQztZQUFDLGtDQUN6RCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQVhZSSxxQkFBcUI7SUFBQTtFQUFBO0FBQUEsR0FXakM7QUFFTSxJQUFNRyxnQkFBZ0I7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUU1QjdCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLHVCQUF1QixDQUFDO1lBQUM7WUFBQSxPQUNWd0IsU0FBUyxDQUFDOUQscUJBQXFCLENBQUM7VUFBQTtZQUFwRDRFLFdBQVc7WUFBQSxJQUNaQSxXQUFXO2NBQUE7Y0FBQTtZQUFBO1lBQUEsTUFBUSxJQUFJWixLQUFLLEVBQUU7VUFBQTtZQUFBO1lBQUEsT0FDTFksV0FBVyxDQUFDWCxJQUFJLEVBQUU7VUFBQTtZQUExQ1ksZUFBZTtZQUFBLGtDQUNkQSxlQUFlO1VBQUE7WUFBQTtZQUFBO1lBRXRCL0IsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDhCQUE4QixFQUFFLGFBQUlDLE9BQU8sQ0FBQztZQUFDLGtDQUNwRCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQVhZTyxnQkFBZ0I7SUFBQTtFQUFBO0FBQUEsR0FXNUI7QUFFRCxJQUFNRyxhQUFPLEdBQUcsU0FBVkEsT0FBTyxDQUFJQyxJQUFJLEVBQUs7RUFDeEIsSUFBTUMsVUFBVSxHQUFHLElBQUlDLGVBQWUsRUFBRTtFQUN4Q0MsVUFBVSxDQUFDO0lBQUEsT0FBTUYsVUFBVSxDQUFDRyxLQUFLLEVBQUU7RUFBQSxHQUFFSixJQUFJLENBQUM7RUFDMUMsT0FBT0MsVUFBVTtBQUNuQixDQUFDO0FBRUQsSUFBTWxCLFNBQVMsR0FBRyxTQUFaQSxTQUFTLENBQUlzQixHQUFHO0VBQUEsSUFBRUMsT0FBTyx1RUFBRyxDQUFDLENBQUM7RUFBQSxJQUFFQyxPQUFPLHVFQUFHLENBQUM7RUFBQSxPQUMvQ0MsS0FBSyxDQUFDSCxHQUFHLGtDQUFNQyxPQUFPO0lBQUVHLE1BQU0sRUFBRVYsYUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDVTtFQUFNLEdBQUUsQ0FDakRDLElBQUksQ0FBQyxVQUFDQyxHQUFHLEVBQUs7SUFDYixJQUFJQSxHQUFHLENBQUNDLEVBQUUsRUFBRTtNQUNWLE9BQU9ELEdBQUc7SUFDWjtJQUNBLElBQUlKLE9BQU8sR0FBRyxDQUFDLEVBQUU7TUFDZixPQUFPeEIsU0FBUyxDQUFDc0IsR0FBRyxFQUFFQyxPQUFPLEVBQUVDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDN0M7SUFDQSxNQUFNLElBQUl0QixLQUFLLENBQUMwQixHQUFHLENBQUNFLE1BQU0sQ0FBQztFQUM3QixDQUFDLENBQUMsQ0FDREMsS0FBSyxDQUFDLFVBQUNqRCxLQUFLLEVBQUs7SUFDaEIsSUFBSTBDLE9BQU8sR0FBRyxDQUFDLEVBQUU7TUFDZnhDLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQywrQkFBK0IsRUFBRXZCLEtBQUssQ0FBQ3dCLE9BQU8sQ0FBQztNQUM3RCxPQUFPTixTQUFTLENBQUNzQixHQUFHLEVBQUVDLE9BQU8sRUFBRUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM3QztJQUNBeEMsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLGdCQUFnQixFQUFFdkIsS0FBSyxDQUFDd0IsT0FBTyxDQUFDO0lBQzlDLE9BQU8sSUFBSTtFQUNiLENBQUMsQ0FBQztBQUFBO0FBRUQsSUFBTTBCLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBdUIsQ0FBSUMsWUFBWSxFQUFFQyxVQUFVLEVBQUs7RUFDbkUsSUFBSSxDQUFDRCxZQUFZLEVBQUU7SUFDakIsT0FBTyxJQUFJO0VBQ2I7RUFFQSxJQUFNRSxNQUFNLEdBQUdGLFlBQVksQ0FDdEJHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDVkMsR0FBRyxDQUFDLFVBQUNDLENBQUM7SUFBQSxPQUFLQSxDQUFDLENBQUNGLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFBQSxFQUFDLENBQ3hCRyxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFFRixDQUFDLEVBQUs7SUFDbEIsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDaEJFLEdBQUcsQ0FBQ0Msa0JBQWtCLENBQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHRCxrQkFBa0IsQ0FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxJQUFJLEVBQUUsQ0FBQztJQUN4RTtJQUNBLE9BQU9GLEdBQUc7RUFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFFVixJQUFJRyxVQUFVLEdBQUdSLE1BQU0sQ0FBQ0QsVUFBVSxDQUFDO0VBQ25DLElBQUksQ0FBQ1MsVUFBVSxFQUFFO0lBQ2YsT0FBTyxJQUFJO0VBQ2I7RUFDQSxJQUFJVCxVQUFVLEtBQUssS0FBSyxFQUFFO0lBQ3hCO0lBQ0EsSUFBTVUsZUFBZSxHQUFHLENBQUM7SUFDekJELFVBQVUsR0FBR0EsVUFBVSxDQUFDUCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNRLGVBQWUsQ0FBQztFQUNyRDtFQUNBLE9BQU9ELFVBQVU7QUFDbkIsQ0FBQztBQUVNLElBQU1FLFlBQVk7RUFBQSx1RUFBRyxrQkFBT0YsVUFBVTtJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLElBRXBDQSxVQUFVO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQ04sSUFBSTtVQUFBO1lBRVBHLElBQUksR0FBR0MsZUFBZSxDQUFDSixVQUFVLENBQUM7WUFBQSxNQUNwQ0csSUFBSSxLQUFLLElBQUk7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FDUixJQUFJO1VBQUE7WUFFUEUsR0FBRyxHQUFHRixJQUFJLEdBQUcsR0FBRztZQUFBLE1BQ2xCRSxHQUFHLElBQUksQ0FBQyxJQUFJQSxHQUFHLEdBQUcsR0FBRztjQUFBO2NBQUE7WUFBQTtZQUFBLGtDQUNoQkEsR0FBRztVQUFBO1lBQUEsa0NBRUwsSUFBSTtVQUFBO1lBQUE7WUFBQTtZQUVYaEUsTUFBTSxDQUFDRixLQUFLLGNBQUc7WUFBQyxrQ0FDVCxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FFZDtFQUFBLGdCQWxCWStELFlBQVk7SUFBQTtFQUFBO0FBQUEsR0FrQnhCO0FBRU0sSUFBTUksa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFrQixDQUFJQyxRQUFRLEVBQUs7RUFDOUMsSUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQUksR0FBUztJQUNqQixJQUFNQyxTQUFTLEdBQUc5SCxNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDK0QsU0FBUztJQUMvRCxJQUFJQyxhQUFhLEdBQUcsR0FBRyxHQUFHRCxTQUFTLEVBQUU7TUFDbkNFLGFBQWEsQ0FBQ0Msa0JBQWtCLENBQUM7TUFDakNMLFFBQVEsRUFBRTtJQUNaLENBQUMsTUFBTTtNQUNMRyxhQUFhLEdBQUdELFNBQVM7SUFDM0I7RUFDRixDQUFDO0VBRUQsSUFBSUMsYUFBYSxHQUFHL0gsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQytELFNBQVM7RUFDakUsSUFBTUcsa0JBQWtCLEdBQUdDLFdBQVcsQ0FBQ0wsSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUNuRCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLElBQU1NLGVBQWUsR0FBRyxTQUFsQkEsZUFBZSxDQUFJQyxRQUFRLEVBQUVDLGVBQWUsRUFBSztFQUM1RDNFLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLHdCQUF3QixFQUFFbUYsZUFBZSxFQUFFLGFBQWEsRUFBRUQsUUFBUSxDQUFDO0VBQzlFLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixRQUFRLENBQUMzSSxNQUFNLEVBQUU2SSxDQUFDLEVBQUUsRUFBRTtJQUN4QyxJQUFNQyxPQUFPLEdBQUdILFFBQVEsQ0FBQ0UsQ0FBQyxDQUFDO0lBQzNCLG1DQUEyQkUsTUFBTSxDQUFDQyxPQUFPLENBQUNKLGVBQWUsQ0FBQyxxQ0FBRTtNQUF2RDtRQUFPSyxHQUFHO1FBQUVDLEtBQUs7TUFDcEJKLE9BQU8sQ0FBQ0ssS0FBSyxDQUFDRixHQUFHLENBQUMsR0FBR0MsS0FBSztJQUM1QjtFQUNGO0FBQ0YsQ0FBQztBQUVNLElBQU1FLGdCQUFnQjtFQUFBLHVFQUFHO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUN4QkMsVUFBVSxHQUFHOUksTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNPLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDNUR5RSxVQUFVLENBQUNDLEdBQUcsR0FBRyxZQUFZO1lBQzdCRCxVQUFVLENBQUN4RixJQUFJLEdBQUcsVUFBVTtZQUM1QndGLFVBQVUsQ0FBQzVJLElBQUksR0FBR00sbUJBQW1CO1lBQ3JDUixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2tGLElBQUksQ0FBQ0MsV0FBVyxDQUFDSCxVQUFVLENBQUM7VUFBQztVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNsRDtFQUFBLGdCQU5ZRCxnQkFBZ0I7SUFBQTtFQUFBO0FBQUEsR0FNNUI7QUFFTSxJQUFNSyxjQUFjO0VBQUEsdUVBQUcsa0JBQU83QixVQUFVLEVBQUU4QixnQkFBZ0IsRUFBRUMsY0FBYyxFQUFFQyxTQUFTO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUNwRkMsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxTQUFTLENBQUNOLGdCQUFnQixDQUFDLENBQUM7WUFDeERPLE9BQU8sR0FBRyxJQUFJO1lBQUEsdUNBQ0dKLE9BQU87WUFBQTtZQUFBO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFqQkssTUFBTTtZQUNSQywyQkFBMkIsR0FBY0QsTUFBTSxDQUEvQ0MsMkJBQTJCLEVBQUVDLFFBQVEsR0FBSUYsTUFBTSxDQUFsQkUsUUFBUTtZQUFBLE1BQ3hDLENBQUNELDJCQUEyQixJQUFJLENBQUNDLFFBQVE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBO1lBQzdDLElBQUlULGNBQWMsS0FBSyxJQUFJLElBQUlRLDJCQUEyQixFQUFFO2NBQUEsd0NBQ3JCQSwyQkFBMkI7Y0FBQTtnQkFBaEUsdURBQWtFO2tCQUF2REUsc0JBQXNCO2tCQUMvQixJQUFJQSxzQkFBc0IsQ0FBQ0MsRUFBRSxLQUFLWCxjQUFjLEVBQUU7b0JBQ2hELEtBQVdWLEdBQUcsSUFBSW9CLHNCQUFzQixFQUFFO3NCQUN4QyxJQUFJcEIsR0FBRyxLQUFLLElBQUksRUFBRTt3QkFDaEJpQixNQUFNLENBQUNqQixHQUFHLENBQUMsR0FBR29CLHNCQUFzQixDQUFDcEIsR0FBRyxDQUFDO3NCQUMzQztvQkFDRjtrQkFDRjtnQkFDRjtjQUFDO2dCQUFBO2NBQUE7Z0JBQUE7Y0FBQTtZQUNIO1lBQUMsS0FDR21CLFFBQVE7Y0FBQTtjQUFBO1lBQUE7WUFBQSx3Q0FDd0JyQixNQUFNLENBQUN3QixJQUFJLENBQUNILFFBQVEsQ0FBQyxDQUFDcEIsT0FBTyxFQUFFO1lBQUE7WUFBQTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQSxnREFBckRuSixLQUFLLG9CQUFFMkssVUFBVTtZQUFBO1lBQUEsT0FDSDFDLFlBQVksQ0FBQ0YsVUFBVSxHQUFHNEMsVUFBVSxDQUFDO1VBQUE7WUFBdkRDLFNBQVM7WUFDZixJQUFJYixTQUFTLElBQUksQ0FBQ00sTUFBTSxDQUFDRSxRQUFRLENBQUNJLFVBQVUsQ0FBQyxDQUFDRSxNQUFNLEVBQUU7Y0FDcERSLE1BQU0sQ0FBQ0UsUUFBUSxDQUFDSSxVQUFVLENBQUMsQ0FBQ0UsTUFBTSxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQyxHQUFHLEdBQUc3QixNQUFNLENBQUN3QixJQUFJLENBQUNILFFBQVEsQ0FBQyxDQUFDcEssTUFBTSxDQUFDLElBQUlILEtBQUssR0FBRyxDQUFDLENBQUM7WUFDbkc7WUFBQyxNQUNHNEssU0FBUyxHQUFHUCxNQUFNLENBQUNFLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLENBQUNFLE1BQU07Y0FBQTtjQUFBO1lBQUE7WUFDaERULE9BQU8sR0FBR08sVUFBVTtZQUFDLE1BQ2pCYixjQUFjLEtBQUssSUFBSSxJQUFJUyxRQUFRLENBQUNJLFVBQVUsQ0FBQyxDQUFDTCwyQkFBMkI7Y0FBQTtjQUFBO1lBQUE7WUFBQSx3Q0FDeENDLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLENBQUNMLDJCQUEyQjtZQUFBO1lBQUE7VUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQTFFRSx1QkFBc0I7WUFBQSxNQUMzQkEsdUJBQXNCLENBQUNDLEVBQUUsSUFBSVgsY0FBYztjQUFBO2NBQUE7WUFBQTtZQUFBLHdCQUMzQlosTUFBTSxDQUFDd0IsSUFBSSxDQUFDRix1QkFBc0IsQ0FBQztVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBMUNwQixJQUFHO1lBQUEsTUFDUkEsSUFBRyxLQUFLLElBQUk7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBO1lBQ2hCaUIsTUFBTSxDQUFDakIsSUFBRyxDQUFDLEdBQUdvQix1QkFBc0IsQ0FBQ3BCLElBQUcsQ0FBQztVQUFDO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtVQUFBO1lBS2hELEtBQVdBLEtBQUcsSUFBSW1CLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLEVBQUU7Y0FDdEMsSUFBSXZCLEtBQUcsS0FBSyxRQUFRLElBQUlBLEtBQUcsS0FBSyw2QkFBNkIsRUFBRTtnQkFDN0RpQixNQUFNLENBQUNqQixLQUFHLENBQUMsR0FBR21CLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLENBQUN2QixLQUFHLENBQUM7Y0FDekM7WUFDRjtVQUFDO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUEsa0NBT0osQ0FBQ1ksT0FBTyxFQUFFSSxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUMxQjtFQUFBLGdCQS9DWVIsY0FBYztJQUFBO0VBQUE7QUFBQSxHQStDMUI7QUFFTSxJQUFNb0IsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUF1QixHQUFTO0VBQzNDLElBQU83SSxrQkFBa0IsR0FBd0NILHVDQUF4QztJQUFFQyxpQkFBaUIsR0FBcUJELHNDQUFyQjtJQUFFRSxlQUFlLEdBQUlGLG9DQUFKO0VBRTdELElBQU1pSixnQkFBZ0IsR0FBR0MsY0FBYyxDQUFDMUgsT0FBTyxDQUFDckIsa0JBQWtCLENBQUM7RUFDbkUsSUFBTWdKLGdCQUFnQixHQUFHRCxjQUFjLENBQUMxSCxPQUFPLENBQUN2QixpQkFBaUIsQ0FBQztFQUNsRSxJQUFNbUosY0FBYyxHQUFHRixjQUFjLENBQUMxSCxPQUFPLENBQUN0QixlQUFlLENBQUM7RUFFOUQsSUFBSStJLGdCQUFnQixLQUFLLElBQUksRUFBRTtJQUM3QkMsY0FBYyxDQUFDRyxPQUFPLENBQUNsSixrQkFBa0IsRUFBRSxDQUFDLENBQUM7RUFDL0M7RUFDQSxJQUFJLENBQUNnSixnQkFBZ0IsRUFBRTtJQUNyQkQsY0FBYyxDQUFDRyxPQUFPLENBQUNwSixpQkFBaUIsRUFBRWQsSUFBSSxDQUFDbUssR0FBRyxFQUFFLENBQUM7RUFDdkQ7RUFDQSxJQUFJLENBQUNGLGNBQWMsRUFBRTtJQUNuQkYsY0FBYyxDQUFDRyxPQUFPLENBQUNuSixlQUFlLEVBQUUsQ0FBQ3hCLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDNEssUUFBUSxDQUFDLENBQUM7RUFDckUsQ0FBQyxNQUFNO0lBQ0xMLGNBQWMsQ0FBQ0csT0FBTyxDQUFDbkosZUFBZSxFQUFFLENBQUN4QixNQUFNLENBQUNDLFFBQVEsQ0FBQzRLLFFBQVEsRUFBRUgsY0FBYyxDQUFDLENBQUM7RUFDckY7QUFDRixDQUFDO0FBRU0sSUFBTUksZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQixDQUFJQyxZQUFZLEVBQUVDLFNBQVMsRUFBRXJDLEtBQUssRUFBSztFQUNsRSxJQUFJcUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtJQUM1QixJQUFJLENBQUNELFlBQVksRUFBRTtNQUNqQnJILE1BQU0sQ0FBQ3VILE9BQU8sQ0FBQyxxREFBcUQsQ0FBQztNQUNyRSxPQUFPLElBQUk7SUFDYjtJQUNBdkgsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLHFEQUFxRCxDQUFDO0lBQ3BFLE9BQU8sS0FBSztFQUNkO0VBQ0EsSUFBSWdHLFlBQVksS0FBSyxJQUFJLElBQ3ZCQSxZQUFZLEtBQUtHLFNBQVMsSUFDMUJGLFNBQVMsS0FBSyxJQUFJLElBQ2xCQSxTQUFTLEtBQUtFLFNBQVMsRUFBRTtJQUN6QnhILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw0REFBNEQsQ0FBQztJQUMzRSxPQUFPLEtBQUs7RUFDZDtFQUNBLFFBQVFpRyxTQUFTO0lBQ2YsS0FBSyxPQUFPO01BQ1YsSUFBSUQsWUFBWSxFQUFFO1FBQ2hCckgsTUFBTSxDQUFDdUgsT0FBTyxDQUFDLGlEQUFpRCxDQUFDO1FBQ2pFLE9BQU8sSUFBSTtNQUNiO01BQ0F2SCxNQUFNLENBQUNxQixNQUFNLENBQUMseURBQXlELENBQUM7TUFDeEUsT0FBTyxLQUFLO0lBQ2QsS0FBSyxVQUFVO0lBQ2YsS0FBSyxVQUFVO01BQ2IsSUFBSWdHLFlBQVksQ0FBQzVLLFFBQVEsQ0FBQ3dJLEtBQUssQ0FBQyxFQUFFO1FBQ2hDakYsTUFBTSxDQUFDdUgsT0FBTyxDQUFDLHFEQUFxRCxDQUFDO1FBQ3JFLE9BQU8sSUFBSTtNQUNiO01BQ0F2SCxNQUFNLENBQUNxQixNQUFNLENBQUMsaUVBQWlFLENBQUM7TUFDaEYsT0FBTyxLQUFLO0lBQ2QsS0FBSyxhQUFhO0lBQ2xCLEtBQUssYUFBYTtNQUNoQixJQUFJLENBQUNnRyxZQUFZLENBQUM1SyxRQUFRLENBQUN3SSxLQUFLLENBQUMsRUFBRTtRQUNqQ2pGLE1BQU0sQ0FBQ3VILE9BQU8sQ0FBQyw2REFBNkQsQ0FBQztRQUM3RSxPQUFPLElBQUk7TUFDYjtNQUNBdkgsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLHlEQUF5RCxDQUFDO01BQ3hFLE9BQU8sS0FBSztJQUNkLEtBQUssT0FBTztNQUNWLElBQUlnRyxZQUFZLEtBQUtwQyxLQUFLLEVBQUU7UUFDMUJqRixNQUFNLENBQUN1SCxPQUFPLENBQUMsbURBQW1ELENBQUM7UUFDbkUsT0FBTyxJQUFJO01BQ2I7TUFDQXZILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQywrREFBK0QsQ0FBQztNQUM5RSxPQUFPLEtBQUs7SUFDZCxLQUFLLFVBQVU7TUFDYixJQUFJZ0csWUFBWSxLQUFLcEMsS0FBSyxFQUFFO1FBQzFCakYsTUFBTSxDQUFDdUgsT0FBTyxDQUFDLDJEQUEyRCxDQUFDO1FBQzNFLE9BQU8sSUFBSTtNQUNiO01BQ0F2SCxNQUFNLENBQUNxQixNQUFNLENBQUMsdURBQXVELENBQUM7TUFDdEUsT0FBTyxLQUFLO0lBQ2QsS0FBSyxhQUFhO01BQ2hCLElBQUlnRyxZQUFZLEdBQUdwQyxLQUFLLEVBQUU7UUFDeEJqRixNQUFNLENBQUN1SCxPQUFPLENBQUMsNERBQTRELENBQUM7UUFDNUUsT0FBTyxJQUFJO01BQ2I7TUFDQXZILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxvRUFBb0UsQ0FBQztNQUNuRixPQUFPLEtBQUs7SUFDZCxLQUFLLFVBQVU7TUFDYixJQUFJZ0csWUFBWSxHQUFHcEMsS0FBSyxFQUFFO1FBQ3hCakYsTUFBTSxDQUFDdUgsT0FBTyxDQUFDLHlEQUF5RCxDQUFDO1FBQ3pFLE9BQU8sSUFBSTtNQUNiO01BQ0F2SCxNQUFNLENBQUNxQixNQUFNLENBQUMsaUVBQWlFLENBQUM7TUFDaEYsT0FBTyxLQUFLO0lBQ2QsS0FBSyxlQUFlO01BQ2xCLElBQUlnRyxZQUFZLElBQUlwQyxLQUFLLEVBQUU7UUFDekJqRixNQUFNLENBQUN1SCxPQUFPLENBQUMscUVBQXFFLENBQUM7UUFDckYsT0FBTyxJQUFJO01BQ2I7TUFDQXZILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw2RUFBNkUsQ0FBQztNQUM1RixPQUFPLEtBQUs7SUFDZCxLQUFLLFlBQVk7TUFDZixJQUFJZ0csWUFBWSxJQUFJcEMsS0FBSyxFQUFFO1FBQ3pCakYsTUFBTSxDQUFDdUgsT0FBTyxDQUFDLGtFQUFrRSxDQUFDO1FBQ2xGLE9BQU8sSUFBSTtNQUNiO01BQ0F2SCxNQUFNLENBQUNxQixNQUFNLENBQUMsMEVBQTBFLENBQUM7TUFDekYsT0FBTyxLQUFLO0lBQ2QsS0FBSyxTQUFTO01BQUU7UUFDZCxtQkFBaUI0RCxLQUFLLENBQUM3QixLQUFLLENBQUMsR0FBRyxDQUFDO1VBQUE7VUFBNUJxRSxHQUFHO1VBQUVDLEdBQUc7UUFDYkQsR0FBRyxHQUFHRSxRQUFRLENBQUNGLEdBQUcsQ0FBQztRQUNuQkMsR0FBRyxHQUFHQyxRQUFRLENBQUNELEdBQUcsQ0FBQztRQUNuQixJQUFJTCxZQUFZLElBQUlJLEdBQUcsSUFBSUosWUFBWSxJQUFJSyxHQUFHLEVBQUU7VUFDOUMxSCxNQUFNLENBQUN1SCxPQUFPLENBQUMsNkRBQTZELENBQUM7VUFDN0UsT0FBTyxJQUFJO1FBQ2I7UUFDQXZILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxxRUFBcUUsQ0FBQztRQUNwRixPQUFPLEtBQUs7TUFDZDtJQUNBLEtBQUssT0FBTztNQUFFO1FBQ1osSUFBTXVHLEtBQUssR0FBRyxJQUFJQyxNQUFNLENBQUM1QyxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQ3BDLE9BQU8yQyxLQUFLLENBQUNFLElBQUksQ0FBQ1QsWUFBWSxDQUFDO01BQ2pDO0lBQ0E7TUFDRXJILE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw2Q0FBNkMsRUFBRWlHLFNBQVMsQ0FBQztNQUN2RSxPQUFPLEtBQUs7RUFBQztBQUVuQixDQUFDO0FBRU0sSUFBTVMsWUFBWSxHQUFHLFNBQWZBLFlBQVksQ0FBSUMsU0FBUyxFQUFLO0VBQ3pDLElBQU94SixVQUFVLEdBQWtCSiw2QkFBbEI7SUFBRUssWUFBWSxHQUFJTCwrQkFBSjtFQUMvQixJQUFNNkosV0FBVyxHQUFHM0wsTUFBTSxDQUFDQyxRQUFRLENBQUMyTCxNQUFNO0VBQzFDLElBQUlELFdBQVcsQ0FBQ3hMLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUNyQ0gsTUFBTSxDQUFDNkMsWUFBWSxDQUFDOEgsT0FBTyxDQUFDeEksWUFBWSxFQUFFdUosU0FBUyxDQUFDO0VBQ3REO0VBRUEsSUFBSUMsV0FBVyxDQUFDeEwsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO0lBQ3RDSCxNQUFNLENBQUM2QyxZQUFZLENBQUM4SCxPQUFPLENBQUN6SSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzFDdUIsb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztJQUNqQyxPQUFPLENBQUM7RUFDVjtFQUNBLElBQUlrSSxXQUFXLENBQUN4TCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7SUFDdENILE1BQU0sQ0FBQzZDLFlBQVksQ0FBQzhILE9BQU8sQ0FBQ3pJLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDMUN1QixvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQ2pDLE9BQU8sQ0FBQztFQUNWO0VBQ0EsSUFBSWtJLFdBQVcsQ0FBQ3hMLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtJQUN0Q0gsTUFBTSxDQUFDNkMsWUFBWSxDQUFDZ0osVUFBVSxDQUFDM0osVUFBVSxDQUFDO0lBQzFDdUIsb0JBQW9CLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUNsQyxPQUFPLENBQUM7RUFDVjtFQUNBLElBQU1xSSxPQUFPLEdBQUdULFFBQVEsQ0FBQ3JMLE1BQU0sQ0FBQzZDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDWixVQUFVLENBQUMsQ0FBQztFQUNqRXVCLG9CQUFvQixDQUFDLEtBQUssRUFBR3FJLE9BQU8sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFFO0VBQ3JELE9BQVFBLE9BQU8sSUFBSSxDQUFDO0FBQ3RCLENBQUM7O0FBRUQ7QUFDTyxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWEsR0FBUztFQUNqQyxJQUFNQyxFQUFFLEdBQUdoTSxNQUFNLENBQUNnTSxFQUFFO0VBQ3BCO0VBQ0EsSUFBSUEsRUFBRSxJQUFJQSxFQUFFLENBQUNDLE1BQU0sRUFBRTtJQUNuQixJQUFNQyxRQUFRLEdBQUdGLEVBQUUsQ0FBQ0MsTUFBTSxFQUFFO0lBQzVCLElBQUlDLFFBQVEsSUFBSUEsUUFBUSxDQUFDek0sTUFBTSxFQUFFO01BQy9CLE9BQU95TSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDcEM7RUFDRjtFQUNBLE9BQU8sSUFBSTtBQUNiLENBQUM7O0FBRUQ7QUFDTyxJQUFNMUUsZUFBZSxHQUFHLFNBQWxCQSxlQUFlLENBQUl0SSxHQUFHLEVBQUs7RUFDdEMsSUFBSXFJLElBQUksR0FBRyxDQUFDO0VBQ1osSUFBSXJJLEdBQUcsQ0FBQ00sTUFBTSxLQUFLLENBQUMsRUFBRTtJQUNwQixPQUFPLElBQUk7RUFDYjtFQUNBLEtBQUssSUFBSTZJLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR25KLEdBQUcsQ0FBQ00sTUFBTSxFQUFFNkksQ0FBQyxFQUFFLEVBQUU7SUFDbkMsSUFBTThELElBQUksR0FBR2pOLEdBQUcsQ0FBQ2tOLFVBQVUsQ0FBQy9ELENBQUMsQ0FBQztJQUM5QmQsSUFBSSxHQUFJLENBQUNBLElBQUksSUFBSSxDQUFDLElBQUlBLElBQUksR0FBSTRFLElBQUk7SUFDbEM1RSxJQUFJLEdBQUdBLElBQUksR0FBR0EsSUFBSTtFQUNwQjtFQUNBO0VBQ0EsT0FBTzRDLElBQUksQ0FBQ2tDLEdBQUcsQ0FBQzlFLElBQUksQ0FBQztBQUN2QixDQUFDOztBQUVEO0FBQ08sSUFBTStFLFlBQVksR0FBRyxTQUFmQSxZQUFZLEdBQVM7RUFDaEMsT0FBT25DLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNvQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUM7QUFDaEQsQ0FBQzs7QUFFRDtBQUNPLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFXLEdBQVM7RUFDL0IsT0FBT3JDLElBQUksQ0FBQ0MsS0FBSyxDQUFDNUosSUFBSSxDQUFDbUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ3RDLENBQUM7QUFHTSxJQUFNOEIsYUFBYSxHQUFHLFNBQWhCQSxhQUFhLEdBQVM7RUFDakMsT0FBTyxJQUFJQyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO0lBQzlCLElBQUk7TUFDRixJQUFJN0MsRUFBRSxHQUFHL0osTUFBTSxDQUFDNkMsWUFBWSxDQUFDQyxPQUFPLENBQUNoQiwwQkFBMEIsQ0FBQztNQUNoRSxJQUFJaUksRUFBRSxLQUFLLElBQUksSUFBSUEsRUFBRSxLQUFLbUIsU0FBUyxFQUFFO1FBQ25DeEgsTUFBTSxDQUFDUixHQUFHLENBQUMsa0RBQWtELEVBQUU2RyxFQUFFLENBQUM7UUFDbEU2QyxPQUFPLENBQUM3QyxFQUFFLENBQUM7UUFDWDtNQUNGO01BQ0FBLEVBQUUsR0FBR2dDLGFBQWEsRUFBRTtNQUNwQixJQUFJaEMsRUFBRSxLQUFLLElBQUksSUFBSUEsRUFBRSxLQUFLbUIsU0FBUyxFQUFFO1FBQ25DeEgsTUFBTSxDQUFDUixHQUFHLENBQUMsd0RBQXdELEVBQUU2RyxFQUFFLENBQUM7UUFDeEUvSixNQUFNLENBQUM2QyxZQUFZLENBQUM4SCxPQUFPLENBQUM3SSwwQkFBMEIsRUFBRWlJLEVBQUUsQ0FBQztRQUMzRDZDLE9BQU8sQ0FBQzdDLEVBQUUsQ0FBQztRQUNYO01BQ0YsQ0FBQyxNQUFNO1FBQ0wsSUFBTThDLHlCQUF5QixHQUFHM0UsV0FBVyxDQUFDLFlBQU07VUFDbEQ2QixFQUFFLEdBQUdnQyxhQUFhLEVBQUU7VUFDcEIsSUFBSWhDLEVBQUUsS0FBSyxJQUFJLElBQUlBLEVBQUUsS0FBS21CLFNBQVMsRUFBRTtZQUNuQ3hILE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLHVDQUF1QyxFQUFFNkcsRUFBRSxDQUFDO1lBQ3ZEL0IsYUFBYSxDQUFDNkUseUJBQXlCLENBQUM7WUFDeEM3TSxNQUFNLENBQUM2QyxZQUFZLENBQUM4SCxPQUFPLENBQUM3SSwwQkFBMEIsRUFBRWlJLEVBQUUsQ0FBQztZQUMzRDZDLE9BQU8sQ0FBQzdDLEVBQUUsQ0FBQztVQUNiO1FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNOakUsVUFBVSxDQUFDLFlBQU07VUFDZmtDLGFBQWEsQ0FBQzZFLHlCQUF5QixDQUFDO1VBQ3hDLElBQUk5QyxFQUFFLEtBQUssSUFBSSxJQUFJQSxFQUFFLEtBQUttQixTQUFTLEVBQUU7WUFDbkN4SCxNQUFNLENBQUNxQixNQUFNLENBQUMsNkJBQTZCLENBQUM7WUFDNUM2SCxPQUFPLENBQUMsSUFBSSxDQUFDO1VBQ2Y7UUFDRixDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ1Y7SUFDRixDQUFDLENBQUMsT0FBT0UsQ0FBQyxFQUFFO01BQ1ZwSixNQUFNLENBQUNxQixNQUFNLENBQUMsd0JBQXdCLEVBQUUrSCxDQUFDLENBQUM7TUFDMUNGLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDZjtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFTSxJQUFNRyxLQUFLLEdBQUcsU0FBUkEsS0FBSyxDQUFJQyxFQUFFO0VBQUEsT0FBSyxJQUFJTCxPQUFPLENBQUMsVUFBQ3JHLEdBQUc7SUFBQSxPQUFLUixVQUFVLENBQUNRLEdBQUcsRUFBRTBHLEVBQUUsQ0FBQztFQUFBLEVBQUM7QUFBQTtBQUUvRCxJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQWtCLENBQUlDLElBQUksRUFBSztFQUMxQyxJQUFJLENBQUNBLElBQUksSUFBSSxPQUFPQSxJQUFJLEtBQUssUUFBUSxFQUFFLE9BQU9BLElBQUk7RUFFbEQsSUFBTUMsTUFBTSxHQUFHO0lBQ2JDLGVBQWUsRUFBRWxDLFNBQVM7SUFDMUJtQyxhQUFhLEVBQUVuQyxTQUFTO0lBQ3hCb0MsUUFBUSxFQUFFcEMsU0FBUztJQUNuQnFDLE1BQU0sRUFBRXJDO0VBQ1YsQ0FBQztFQUVELElBQUlzQyxLQUFLLEdBQUdOLElBQUksQ0FBQ00sS0FBSyxDQUFDLDJDQUEyQyxDQUFDO0VBQ25FLElBQUlBLEtBQUssSUFBSUEsS0FBSyxDQUFDL04sTUFBTSxLQUFLLENBQUMsRUFBRTtJQUMvQjBOLE1BQU0sQ0FBQ0csUUFBUSxHQUFHakMsUUFBUSxDQUFDbUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDTCxNQUFNLENBQUNJLE1BQU0sR0FBR2xDLFFBQVEsQ0FBQ21DLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQ0wsTUFBTSxDQUFDQyxlQUFlLEdBQUd6SixNQUFNLENBQUM2SixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMxTixXQUFXLEVBQUUsQ0FBQztJQUN2RHFOLE1BQU0sQ0FBQ0UsYUFBYSxHQUFHRixNQUFNLENBQUNDLGVBQWU7RUFDL0MsQ0FBQyxNQUFNO0lBQ0xJLEtBQUssR0FBR04sSUFBSSxDQUFDTSxLQUFLLENBQUMsbUVBQW1FLENBQUM7SUFDdkYsSUFBSSxDQUFDQSxLQUFLLElBQUlBLEtBQUssQ0FBQy9OLE1BQU0sS0FBSyxDQUFDLEVBQUUsT0FBT3lOLElBQUk7SUFFN0NDLE1BQU0sQ0FBQ0csUUFBUSxHQUFHakMsUUFBUSxDQUFDbUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDTCxNQUFNLENBQUNDLGVBQWUsR0FBR3pKLE1BQU0sQ0FBQzZKLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzFOLFdBQVcsRUFBRSxDQUFDO0lBQ3ZEcU4sTUFBTSxDQUFDSSxNQUFNLEdBQUdsQyxRQUFRLENBQUNtQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbENMLE1BQU0sQ0FBQ0UsYUFBYSxHQUFHMUosTUFBTSxDQUFDNkosS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDMU4sV0FBVyxFQUFFLENBQUM7RUFDdkQ7RUFFQSxJQUFJO0lBQ0YsSUFBTTJOLEtBQUssR0FBRyxJQUFJaE4sSUFBSSxFQUFFO0lBRXhCLElBQUksQ0FBQzBNLE1BQU0sQ0FBQ0MsZUFBZSxJQUFJLENBQUNELE1BQU0sQ0FBQ0UsYUFBYSxFQUFFLE9BQU9ILElBQUk7SUFFakUsSUFBTVEsU0FBUyxHQUFHUCxNQUFNLENBQUNDLGVBQWUsSUFBSUssS0FBSyxDQUFDRSxRQUFRLEVBQUUsR0FBR0YsS0FBSyxDQUFDRyxXQUFXLEVBQUUsR0FBR0gsS0FBSyxDQUFDRyxXQUFXLEVBQUUsR0FBRyxDQUFDO0lBQzVHLElBQU1DLE9BQU8sR0FBR1YsTUFBTSxDQUFDRSxhQUFhLElBQUlJLEtBQUssQ0FBQ0UsUUFBUSxFQUFFLEdBQUdGLEtBQUssQ0FBQ0csV0FBVyxFQUFFLEdBQUdILEtBQUssQ0FBQ0csV0FBVyxFQUFFLEdBQUcsQ0FBQztJQUV4RyxJQUFNRSxjQUFjLEdBQUcsSUFBSXJOLElBQUksQ0FBQ2lOLFNBQVMsRUFBRVAsTUFBTSxDQUFDQyxlQUFlLEVBQUVELE1BQU0sQ0FBQ0csUUFBUSxDQUFDO0lBQ25GLElBQU1TLFlBQVksR0FBRyxJQUFJdE4sSUFBSSxDQUFDb04sT0FBTyxFQUFFVixNQUFNLENBQUNFLGFBQWEsRUFBRUYsTUFBTSxDQUFDSSxNQUFNLENBQUM7SUFHM0UsSUFBTVMsaUJBQWlCLEdBQUc1RCxJQUFJLENBQUM2RCxJQUFJLENBQUM3RCxJQUFJLENBQUNrQyxHQUFHLENBQUN3QixjQUFjLEdBQUdMLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdGLElBQU1TLGVBQWUsR0FBRzlELElBQUksQ0FBQzZELElBQUksQ0FBQzdELElBQUksQ0FBQ2tDLEdBQUcsQ0FBQ3lCLFlBQVksR0FBR04sS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFekYsSUFBTVUsa0JBQWtCLEdBQUdILGlCQUFpQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc1RCxJQUFJLENBQUM2RCxJQUFJLENBQUNELGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUN2RixJQUFNSSxnQkFBZ0IsR0FBR0YsZUFBZSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc5RCxJQUFJLENBQUM2RCxJQUFJLENBQUNDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFFakYsSUFBSUMsa0JBQWtCLEtBQUssQ0FBQyxJQUFJQyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7TUFDdEQsaUJBQVVKLGlCQUFpQixnQkFBTUUsZUFBZTtJQUNsRDtJQUVBLElBQUlDLGtCQUFrQixLQUFLLENBQUMsSUFBSUMsZ0JBQWdCLElBQUksQ0FBQyxFQUFFO01BQ3JELGlCQUFVSixpQkFBaUIsdUJBQVVJLGdCQUFnQjtJQUN2RDtJQUVBLElBQUlELGtCQUFrQixLQUFLQyxnQkFBZ0IsRUFBRTtNQUMzQyxpQkFBVUQsa0JBQWtCO0lBQzlCO0lBRUEsaUJBQVVBLGtCQUFrQixnQkFBTUMsZ0JBQWdCO0VBQ3BELENBQUMsQ0FBQyxPQUFPQyxHQUFHLEVBQUU7SUFDWixPQUFPbkIsSUFBSTtFQUNiO0FBQ0YsQ0FBQztBQUVNLElBQU1vQixTQUFTO0VBQUEsdUVBQUcsa0JBQU9DLE9BQU8sRUFBRTNHLFFBQVE7SUFBQSxpQkFLdEM0RyxVQUFVO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBVkEsVUFBVSwwQkFBRztjQUNwQkMsWUFBWSxDQUFDQyxXQUFXLENBQUM7Y0FDekJBLFdBQVcsR0FBRzVJLFVBQVUsQ0FBQzhCLFFBQVEsRUFBRTJHLE9BQU8sQ0FBQztZQUM3QyxDQUFDO1lBUEdHLFdBQVcsR0FBRzVJLFVBQVUsQ0FBQzhCLFFBQVEsRUFBRTJHLE9BQU8sQ0FBQztZQUUvQ3ZPLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDNkssWUFBWSxHQUFHSCxVQUFVO1VBQUM7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FNL0M7RUFBQSxnQkFUWUYsU0FBUztJQUFBO0VBQUE7QUFBQSxHQVNyQjtBQUVNLElBQU1NLGNBQWMsR0FBRyxTQUFqQkEsY0FBYyxHQUFTO0VBQ2xDLElBQU1DLFNBQVMsR0FBR0MsU0FBUyxDQUFDRCxTQUFTO0VBRXJDLElBQUlBLFNBQVMsQ0FBQ3JCLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO0lBQzdDLE9BQU8sUUFBUTtFQUNqQjtFQUVBLElBQUlxQixTQUFTLENBQUNyQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtJQUNyQyxPQUFPLFNBQVM7RUFDbEI7RUFFQSxJQUFJcUIsU0FBUyxDQUFDckIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0lBQzlCLE9BQU8sUUFBUTtFQUNqQjtFQUVBLElBQUlxQixTQUFTLENBQUNyQixLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDN0IsT0FBTyxPQUFPO0VBQ2hCO0VBRUEsSUFBSXFCLFNBQVMsQ0FBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUMzQixPQUFPLE1BQU07RUFDZjtFQUVBLE9BQU8sSUFBSTtBQUNiLENBQUM7QUFFTSxJQUFNdUIsYUFBYSxHQUFHLFNBQWhCQSxhQUFhLENBQUlDLFlBQVksRUFBSztFQUM3QyxJQUFNQyxLQUFLLGdDQUFPQyxLQUFLLENBQUNDLElBQUksQ0FBQ0gsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDSSxVQUFVLENBQUMsc0JBQUtGLEtBQUssQ0FBQ0MsSUFBSSxDQUFDSCxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUNLLFlBQVksQ0FBQyxFQUFDO0VBQ3RHLE9BQU9KLEtBQUssQ0FBQ0ssSUFBSSxDQUFDLFVBQUNDLENBQUMsRUFBSztJQUFBO0lBQ3ZCLE9BQU9BLENBQUMsQ0FBQ0MsT0FBTyxLQUFLLFVBQUFELENBQUMsQ0FBQ3hGLEVBQUUsMENBQUosTUFBTTVKLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSStPLEtBQUssQ0FBQ0MsSUFBSSxDQUFDSSxDQUFDLENBQUN2TCxTQUFTLENBQUMsQ0FBQ3NMLElBQUksQ0FBQyxVQUFDRyxDQUFDO01BQUEsT0FBS0EsQ0FBQyxDQUFDdFAsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJc1AsQ0FBQyxDQUFDdFAsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUFBLEVBQUMsQ0FBQztFQUM1SCxDQUFDLENBQUM7QUFDSixDQUFDOztBQ3RtQkQsSUFBTXVQLE1BQU0sR0FBRztFQUNiQyxNQUFNLEVBQUUsUUFBUTtFQUNoQkMsT0FBTyxFQUFFLENBQUM7RUFDVkMseUJBQXlCLEVBQUUsSUFBSTtFQUFFO0VBQ2pDQyxLQUFLLEVBQUU7SUFDTEMsSUFBSSxFQUFFLE1BQU07SUFDWkMsT0FBTyxFQUFFLENBQUM7TUFDUkQsSUFBSSxFQUFFLGFBQWE7TUFDbkJFLE1BQU0sRUFBRSxDQUFDLFdBQVc7SUFDdEIsQ0FBQyxFQUFFO01BQ0RGLElBQUksRUFBRSxxQkFBcUI7TUFDM0JFLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZO0lBQ3BDLENBQUMsRUFBRTtNQUNERixJQUFJLEVBQUUsdUJBQXVCO01BQzdCRSxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWTtJQUNwQyxDQUFDLEVBQUU7TUFDREYsSUFBSSxFQUFFLCtCQUErQjtNQUNyQ0UsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZO0lBQ2xELENBQUMsQ0FBQztJQUNGaEssT0FBTyxFQUFFO01BQUNpSyxPQUFPLEVBQUUsSUFBSTtNQUFFQyxhQUFhLEVBQUU7SUFBSTtFQUM5QztBQUNGLENBQUM7QUFFRCxpREFBZVQsTUFBTTs7Ozs7Ozs7OztBQ3ZCZTtBQUNJO0FBQ1Q7QUFFL0IsSUFBTWhNLFVBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLDZCQUE2QixDQUFDO0FBQ3hELElBQU0yTixPQUFPLEdBQUc7RUFDZEMsT0FBTyxFQUFFLFNBQVM7RUFBRUMsT0FBTyxFQUFFO0FBQy9CLENBQUM7QUFBQyxJQUVtQkMsMkJBQTJCO0VBQzlDLHVDQUFjO0lBQUE7SUFDWixJQUFJLENBQUNDLFNBQVMsR0FBRyxJQUFJO0lBQ3JCLElBQUk7TUFDRixJQUFJLENBQUNDLElBQUksRUFBRTtJQUNiLENBQUMsQ0FBQyxPQUFPcEMsR0FBRyxFQUFFO01BQ1ozSyxVQUFNLENBQUNxQixNQUFNLENBQUMsaUNBQWlDLEVBQUVzSixHQUFHLENBQUNySixPQUFPLENBQUM7SUFDL0Q7RUFDRjtFQUFDO0lBQUE7SUFBQSxPQUVELGdCQUFPO01BQUE7UUFBQTtNQUNMdEIsVUFBTSxDQUFDUixHQUFHLENBQUMsd0JBQXdCLENBQUM7TUFDcEM7TUFDQTtNQUNBLElBQU13TixXQUFXLDRCQUFHMVEsTUFBTSxDQUFDNkQsR0FBRyxDQUFDMk0sU0FBUywwREFBcEIsc0JBQXNCRyxJQUFJLENBQUNqQixtQkFBYSxDQUFDO01BQzdELElBQUksQ0FBQ2dCLFdBQVcsRUFBRTtRQUNoQixNQUFNLElBQUk5TCxLQUFLLENBQUMsNEJBQTRCLENBQUM7TUFDL0M7TUFFQThMLFdBQVcsQ0FBQ0UsZUFBZSxHQUFHLFVBQUNDLEtBQUssRUFBSztRQUN2QyxRQUFRQSxLQUFLLENBQUNDLFVBQVU7VUFDdEIsS0FBSyxDQUFDO1lBQ0o7VUFDRjtZQUNFO1lBQ0EsSUFBSTtjQUNGSixXQUFXLENBQUN2RCxNQUFNLENBQUM0RCxpQkFBaUIsQ0FBQ3JCLHVCQUFpQixDQUFDO1lBQ3pELENBQUMsQ0FBQyxPQUFPckIsR0FBRyxFQUFFO2NBQ1ozSyxVQUFNLENBQUNxQixNQUFNLENBQUMsb0NBQW9DLEVBQUVzSixHQUFHLENBQUNySixPQUFPLENBQUM7WUFDbEU7WUFDQTtRQUFNO1FBRVYsSUFBSTtVQUFBO1VBQ0YsSUFBTThLLEtBQUssR0FBR1ksV0FBVyxDQUFDdkQsTUFBTSxDQUFDNkQsaUJBQWlCLENBQUN0Qix1QkFBaUIsRUFBRUEsMEJBQW9CLENBQUM7VUFDM0YsSUFBSSwwQkFBQUEsMEJBQW9CLDBEQUFwQixzQkFBc0JqUSxNQUFNLElBQUcsQ0FBQyxFQUFFO1lBQUEsOENBQ2xCaVEsMEJBQW9CO2NBQUE7WUFBQTtjQUF0QyxvREFBd0M7Z0JBQUEsSUFBN0J1QixHQUFHO2dCQUNabkIsS0FBSyxDQUFDb0IsV0FBVyxDQUFDRCxHQUFHLENBQUNsQixJQUFJLEVBQUVrQixHQUFHLENBQUNoQixNQUFNLENBQUM7Y0FDekM7WUFBQztjQUFBO1lBQUE7Y0FBQTtZQUFBO1VBQ0g7UUFDRixDQUFDLENBQUMsT0FBTzVCLEdBQUcsRUFBRTtVQUNaM0ssVUFBTSxDQUFDcUIsTUFBTSxDQUFDLDJDQUEyQyxFQUFFc0osR0FBRyxDQUFDckosT0FBTyxDQUFDO1FBQ3pFO01BQ0YsQ0FBQztNQUVEMEwsV0FBVyxDQUFDUyxPQUFPLEdBQUcsWUFBTTtRQUMxQixNQUFNLElBQUl2TSxLQUFLLENBQUMsc0NBQXNDLEVBQUU4TCxXQUFXLENBQUNsTixLQUFLLENBQUM7TUFDNUUsQ0FBQztNQUVEa04sV0FBVyxDQUFDVSxTQUFTLEdBQUcsWUFBTTtRQUM1QixJQUFNQyxFQUFFLEdBQUdYLFdBQVcsQ0FBQ3ZELE1BQU07UUFDN0IsSUFBSWtFLEVBQUUsQ0FBQ3pCLE9BQU8sS0FBSyxDQUFDLEVBQUU7VUFDcEI7VUFDQSxJQUFNMEIsYUFBYSxHQUFHdFIsTUFBTSxDQUFDd1EsU0FBUyxDQUFDZSxjQUFjLENBQUM3QixtQkFBYSxDQUFDO1VBQ3BFNEIsYUFBYSxDQUFDRixTQUFTLEdBQUcsWUFBTTtZQUM5QixLQUFJLENBQUNYLElBQUksRUFBRTtVQUNiLENBQUM7UUFDSCxDQUFDLE1BQU0sS0FBSSxDQUFDRCxTQUFTLEdBQUdhLEVBQUU7TUFDNUIsQ0FBQztJQUNIO0VBQUM7SUFBQTtJQUFBLE9BRUQseUJBQWdCO01BQUE7TUFDZCxPQUFPLElBQUkxRSxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFFNEUsTUFBTSxFQUFLO1FBQ3RDLElBQU1DLFFBQVEsR0FBR3ZKLFdBQVcsQ0FBQyxZQUFNO1VBQ2pDLElBQUksTUFBSSxDQUFDc0ksU0FBUyxFQUFFO1lBQ2xCeEksYUFBYSxDQUFDeUosUUFBUSxDQUFDO1lBQ3ZCN0UsT0FBTyxFQUFFO1VBQ1g7UUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ045RyxVQUFVLENBQUMsWUFBTTtVQUNmLElBQUksQ0FBQyxNQUFJLENBQUMwSyxTQUFTLEVBQUU7WUFDbkJ4SSxhQUFhLENBQUN5SixRQUFRLENBQUM7WUFDdkJELE1BQU0sQ0FBQyxJQUFJNU0sS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7VUFDekU7UUFDRixDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ1YsQ0FBQyxDQUFDO0lBQ0o7RUFBQztJQUFBO0lBQUE7TUFBQSxrRkFFRDtRQUFBO1VBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQXNCOE0sU0FBUywyREFBRyxLQUFLO2dCQUFBO2dCQUFBLE9BQy9CLElBQUksQ0FBQ0MsYUFBYSxFQUFFO2NBQUE7Z0JBQ3BCQyxFQUFFLEdBQUcsSUFBSSxDQUFDcEIsU0FBUyxDQUFDcUIsV0FBVyxDQUFDbkMsdUJBQWlCLEVBQUdnQyxTQUFTLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBRTtnQkFDMUY1QixLQUFLLEdBQUc4QixFQUFFLENBQUNFLFdBQVcsQ0FBQ3BDLHVCQUFpQixDQUFDO2dCQUFBLGlDQUV4Q0ksS0FBSztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNiO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHVFQUVELGtCQUFXaUMsUUFBUSxFQUFFQyxTQUFTO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNSLElBQUksQ0FBQ0MsZUFBZSxDQUFDLElBQUksQ0FBQztjQUFBO2dCQUF4Q25DLEtBQUs7Z0JBQ0xvQyxTQUFTLEdBQUcsSUFBSSxDQUFDQyxtQkFBbUIsRUFBRSxFQUFFO2dCQUN4Q3hNLElBQUksR0FBR3lFLElBQUksQ0FBQ2dJLEtBQUssQ0FBQzNSLElBQUksQ0FBQ21LLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFFcEN5SCxPQUFPLEdBQUc7a0JBQUMsV0FBVyxFQUFFTixRQUFRO2tCQUFFLFlBQVksRUFBRUMsU0FBUztrQkFBRSxZQUFZLEVBQUVFLFNBQVM7a0JBQUV2TSxJQUFJLEVBQUpBO2dCQUFJLENBQUM7Z0JBQy9GbUssS0FBSyxDQUFDd0MsR0FBRyxDQUFDRCxPQUFPLENBQUM7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDcEI7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBLE9BRUQsZ0JBQU9OLFFBQVEsRUFBRVEsRUFBRSxFQUE0QjtNQUFBO01BQUEsSUFBMUJ2UyxNQUFNLHVFQUFHb1EsT0FBTyxDQUFDQyxPQUFPO01BQzNDLE9BQU8sSUFBSTFELE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7UUFDOUIsTUFBSSxDQUFDcUYsZUFBZSxFQUFFLENBQUM1TCxJQUFJLENBQUMsVUFBQ3lKLEtBQUssRUFBSztVQUNyQyxJQUFJMEMsTUFBTSxHQUFHdEgsU0FBUztVQUN0QixNQUFJLENBQUN1SCxTQUFTLENBQUMzQyxLQUFLLEVBQUVpQyxRQUFRLEVBQUUvUixNQUFNLENBQUMsQ0FBQ29SLFNBQVMsR0FBRyxVQUFTUCxLQUFLLEVBQUU7WUFDbEUsSUFBTTZCLE1BQU0sR0FBRzdCLEtBQUssQ0FBQzhCLE1BQU0sQ0FBQ3hGLE1BQU07WUFDbEMsSUFBSXVGLE1BQU0sRUFBRTtjQUNWLElBQU0vSixLQUFLLEdBQUcrSixNQUFNLENBQUMvSixLQUFLO2NBQzFCLElBQUksWUFBWSxJQUFJQSxLQUFLLEVBQUU7Z0JBQ3pCLElBQ0U2SixNQUFNLEtBQUt0SCxTQUFTLElBQ25CcUgsRUFBRSxLQUFLLEtBQUssSUFBSTVKLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRzZKLE1BQU8sSUFDN0NELEVBQUUsS0FBSyxLQUFLLElBQUk1SixLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUc2SixNQUFPLEVBQzlDO2tCQUNBQSxNQUFNLEdBQUc3SixLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUM5QjtjQUNGLENBQUMsTUFBTTtnQkFDTDNGLE9BQU8sQ0FBQ08sSUFBSSxDQUFDLGlDQUFpQyxHQUFHd08sUUFBUSxDQUFDO2NBQzVEO2NBRUFXLE1BQU0sQ0FBQ0UsUUFBUSxFQUFFO1lBQ25CLENBQUMsTUFBTTtjQUNMaEcsT0FBTyxDQUFDNEYsTUFBTSxDQUFDO1lBQ2pCO1VBQ0YsQ0FBQztRQUNILENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztJQUNKO0VBQUM7SUFBQTtJQUFBLE9BRUQsYUFBSVQsUUFBUSxFQUE0QjtNQUFBLElBQTFCL1IsTUFBTSx1RUFBR29RLE9BQU8sQ0FBQ0MsT0FBTztNQUNwQyxPQUFPLElBQUksQ0FBQ3dDLE1BQU0sQ0FBQ2QsUUFBUSxFQUFFLEtBQUssRUFBRS9SLE1BQU0sQ0FBQztJQUM3QztFQUFDO0lBQUE7SUFBQSxPQUVELGFBQUkrUixRQUFRLEVBQTRCO01BQUEsSUFBMUIvUixNQUFNLHVFQUFHb1EsT0FBTyxDQUFDQyxPQUFPO01BQ3BDLE9BQU8sSUFBSSxDQUFDd0MsTUFBTSxDQUFDZCxRQUFRLEVBQUUsS0FBSyxFQUFFL1IsTUFBTSxDQUFDO0lBQzdDO0VBQUM7SUFBQTtJQUFBLE9BRUQsaUJBQVErUixRQUFRLEVBQTRCO01BQUE7TUFBQSxJQUExQi9SLE1BQU0sdUVBQUdvUSxPQUFPLENBQUNDLE9BQU87TUFDeEMsT0FBTyxJQUFJMUQsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztRQUM5QixNQUFJLENBQUNxRixlQUFlLEVBQUUsQ0FBQzVMLElBQUksQ0FBQyxVQUFDeUosS0FBSyxFQUFLO1VBQ3JDLElBQU0vSSxHQUFHLEdBQUcsSUFBSStMLEdBQUcsRUFBRTtVQUNyQixNQUFJLENBQUNMLFNBQVMsQ0FBQzNDLEtBQUssRUFBRWlDLFFBQVEsRUFBRS9SLE1BQU0sQ0FBQyxDQUFDb1IsU0FBUyxHQUFHLFVBQVNQLEtBQUssRUFBRTtZQUNsRSxJQUFNNkIsTUFBTSxHQUFHN0IsS0FBSyxDQUFDOEIsTUFBTSxDQUFDeEYsTUFBTTtZQUNsQyxJQUFJdUYsTUFBTSxFQUFFO2NBQ1YsSUFBTS9KLEtBQUssR0FBRytKLE1BQU0sQ0FBQy9KLEtBQUs7Y0FDMUIsSUFBSSxZQUFZLElBQUlBLEtBQUssRUFBRTtnQkFDekIsSUFBSSxDQUFDNUIsR0FBRyxDQUFDZ00sR0FBRyxDQUFDcEssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUU1QixHQUFHLENBQUNpTSxHQUFHLENBQUNySyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRTVCLEdBQUcsQ0FBQ2lNLEdBQUcsQ0FBQ3JLLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTVCLEdBQUcsQ0FBQ29GLEdBQUcsQ0FBQ3hELEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztjQUNoRSxDQUFDLE1BQU07Z0JBQ0wzRixPQUFPLENBQUNPLElBQUksQ0FBQyxpQ0FBaUMsR0FBR3dPLFFBQVEsQ0FBQztjQUM1RDtjQUVBVyxNQUFNLENBQUNFLFFBQVEsRUFBRTtZQUNuQixDQUFDLE1BQU07Y0FDTGhHLE9BQU8sQ0FBQzdGLEdBQUcsQ0FBQztZQUNkO1VBQ0YsQ0FBQztRQUNILENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztJQUNKO0VBQUM7SUFBQTtJQUFBO01BQUEsdUVBRUQsa0JBQVdnTCxRQUFRO1FBQUE7VUFBQTtVQUFBO1VBQUE7VUFBQTtVQUFBO1VBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUUvUixNQUFNLDhEQUFHb1EsT0FBTyxDQUFDQyxPQUFPO2dCQUFBO2dCQUFBLE9BQ3hCLElBQUksQ0FBQzRDLE9BQU8sQ0FBQ2xCLFFBQVEsRUFBRS9SLE1BQU0sQ0FBQztjQUFBO2dCQUEzQ2tULElBQUk7Z0JBQUEsTUFDTkEsSUFBSSxDQUFDbEosSUFBSSxFQUFFLENBQUN2SyxNQUFNLEtBQUssQ0FBQztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxrQ0FBUyxJQUFJO2NBQUE7Z0JBRW5DMkwsR0FBRyxHQUFHO2tCQUFDMkUsSUFBSSxFQUFFN0UsU0FBUztrQkFBRXZDLEtBQUssRUFBRSxDQUFDO2dCQUFDLENBQUM7Z0JBQUEsMkNBRWJ1SyxJQUFJO2dCQUFBO2tCQUEvQix1REFBaUM7b0JBQUEsZ0RBQXJCeEssR0FBRyxvQkFBRUMsS0FBSztvQkFDcEIsSUFBSXlDLEdBQUcsQ0FBQ3pDLEtBQUssR0FBR0EsS0FBSyxFQUFFO3NCQUNyQnlDLEdBQUcsQ0FBQzJFLElBQUksR0FBR3JILEdBQUc7c0JBQ2QwQyxHQUFHLENBQUN6QyxLQUFLLEdBQUdBLEtBQUs7b0JBQ25CO2tCQUNGO2dCQUFDO2tCQUFBO2dCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGtDQUVNeUMsR0FBRztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNYO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQSxPQUVELGVBQU0yRyxRQUFRLEVBQTRCO01BQUE7TUFBQSxJQUExQi9SLE1BQU0sdUVBQUdvUSxPQUFPLENBQUNDLE9BQU87TUFDdEMsT0FBTyxJQUFJMUQsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztRQUM5QixNQUFJLENBQUNxRixlQUFlLEVBQUUsQ0FBQzVMLElBQUksQ0FBQyxVQUFDeUosS0FBSyxFQUFLO1VBQ3JDLElBQUlxRCxLQUFLLEdBQUcsQ0FBQztVQUNiLE1BQUksQ0FBQ1YsU0FBUyxDQUFDM0MsS0FBSyxFQUFFaUMsUUFBUSxFQUFFL1IsTUFBTSxDQUFDLENBQUNvUixTQUFTLEdBQUcsVUFBU1AsS0FBSyxFQUFFO1lBQ2xFLElBQU02QixNQUFNLEdBQUc3QixLQUFLLENBQUM4QixNQUFNLENBQUN4RixNQUFNO1lBQ2xDLElBQUl1RixNQUFNLEVBQUU7Y0FDVlMsS0FBSyxFQUFFO2NBQ1BULE1BQU0sQ0FBQ0UsUUFBUSxFQUFFO1lBQ25CLENBQUMsTUFBTTtjQUNMaEcsT0FBTyxDQUFDdUcsS0FBSyxDQUFDO1lBQ2hCO1VBQ0YsQ0FBQztRQUNILENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztJQUNKO0VBQUM7SUFBQTtJQUFBLE9BRUQsYUFBSXBCLFFBQVEsRUFBc0I7TUFBQTtNQUFBLElBQXBCL1IsTUFBTSx1RUFBRyxTQUFTO01BQzlCLE9BQU8sSUFBSTJNLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7UUFDOUIsTUFBSSxDQUFDcUYsZUFBZSxFQUFFLENBQUM1TCxJQUFJLENBQUMsVUFBQ3lKLEtBQUssRUFBSztVQUNyQyxJQUFJc0QsS0FBSyxHQUFHLElBQUk7VUFDaEIsTUFBSSxDQUFDWCxTQUFTLENBQUMzQyxLQUFLLEVBQUVpQyxRQUFRLEVBQUUvUixNQUFNLENBQUMsQ0FBQ29SLFNBQVMsR0FBRyxVQUFTUCxLQUFLLEVBQUU7WUFDbEUsSUFBTTZCLE1BQU0sR0FBRzdCLEtBQUssQ0FBQzhCLE1BQU0sQ0FBQ3hGLE1BQU07WUFDbEMsSUFBSXVGLE1BQU0sRUFBRTtjQUNWLElBQU0vSixLQUFLLEdBQUcrSixNQUFNLENBQUMvSixLQUFLO2NBQzFCLElBQUksWUFBWSxJQUFJQSxLQUFLLEVBQUU7Z0JBQ3pCeUssS0FBSyxJQUFJQyxVQUFVLENBQUMxSyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Y0FDMUMsQ0FBQyxNQUFNO2dCQUNMM0YsT0FBTyxDQUFDTyxJQUFJLENBQUMsaUNBQWlDLEdBQUd3TyxRQUFRLENBQUM7Y0FDNUQ7Y0FFQVcsTUFBTSxDQUFDRSxRQUFRLEVBQUU7WUFDbkIsQ0FBQyxNQUFNO2NBQ0xoRyxPQUFPLENBQUN3RyxLQUFLLENBQUNFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQjtVQUNGLENBQUM7UUFDSCxDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7SUFDSjtFQUFDO0lBQUE7SUFBQSxPQUVELG1CQUFVeEQsS0FBSyxFQUFFaUMsUUFBUSxFQUFtRDtNQUFBLElBQWpEL1IsTUFBTSx1RUFBR29RLE9BQU8sQ0FBQ0MsT0FBTztNQUFBLElBQUUyQixTQUFTLHVFQUFHOUcsU0FBUztNQUN4RSxJQUFJOEcsU0FBUyxFQUFFO1FBQ2IsSUFBSWhTLE1BQU0sS0FBS29RLE9BQU8sQ0FBQ0UsT0FBTyxFQUFFO1VBQzlCLE9BQU9SLEtBQUssQ0FBQ3hRLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUM5Q2lVLFVBQVUsQ0FBQ0MsV0FBVyxDQUFDQyxJQUFJLENBQUMsQ0FBQzFCLFFBQVEsRUFBRUMsU0FBUyxFQUFFLElBQUksQ0FBQ0csbUJBQW1CLEVBQUUsQ0FBQ3VCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRztRQUVBLE9BQU81RCxLQUFLLENBQUN4USxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FDdENpVSxVQUFVLENBQUNDLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLENBQUMxQixRQUFRLEVBQUVDLFNBQVMsQ0FBQyxDQUFDLENBQUM7TUFDMUQ7TUFFQSxJQUFJaFMsTUFBTSxLQUFLb1EsT0FBTyxDQUFDRSxPQUFPLEVBQUU7UUFDOUIsT0FBT1IsS0FBSyxDQUFDeFEsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQ3BDaVUsVUFBVSxDQUFDQyxXQUFXLENBQUNDLElBQUksQ0FBQyxDQUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQ0ksbUJBQW1CLEVBQUUsQ0FBQ3VCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztNQUN0RjtNQUVBLElBQU1DLFVBQVUsR0FBRy9FLGNBQWMsRUFBRSxLQUFLLFFBQVEsR0FBR21ELFFBQVEsR0FBRyxDQUFDQSxRQUFRLENBQUM7TUFFeEUsT0FBT2pDLEtBQUssQ0FBQ3hRLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FDNUJpVSxVQUFVLENBQUNDLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDRSxVQUFVLENBQUMsQ0FBQztJQUMvQztFQUFDO0lBQUE7SUFBQTtNQUFBLHNFQUVELGtCQUFVNUIsUUFBUTtRQUFBO1VBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUUvUixNQUFNLDhEQUFHb1EsT0FBTyxDQUFDQyxPQUFPO2dCQUFBO2dCQUFBLE9BQ3RCLElBQUksQ0FBQ3VELEdBQUcsQ0FBQzdCLFFBQVEsRUFBRS9SLE1BQU0sQ0FBQztjQUFBO2dCQUF4Q29ULEtBQUs7Z0JBQUE7Z0JBQUEsT0FDUyxJQUFJLENBQUNELEtBQUssQ0FBQ3BCLFFBQVEsRUFBRS9SLE1BQU0sQ0FBQztjQUFBO2dCQUExQ21ULEtBQUs7Z0JBQUEsTUFFUCxDQUFDQyxLQUFLLElBQUksQ0FBQ0QsS0FBSztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxrQ0FBUyxDQUFDO2NBQUE7Z0JBQUEsa0NBRXZCLENBQUNDLEtBQUssR0FBR0QsS0FBSyxFQUFFRyxPQUFPLENBQUMsQ0FBQyxDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2xDO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHVFQUVELGtCQUFXdkIsUUFBUTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUU4QixJQUFJLDhEQUFHLENBQUM7Z0JBQUU3VCxNQUFNLDhEQUFHb1EsT0FBTyxDQUFDQyxPQUFPO2dCQUFBLGtDQUM5QyxJQUFJMUQsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztrQkFDOUIsTUFBSSxDQUFDcUYsZUFBZSxFQUFFLENBQUM1TCxJQUFJLENBQUMsVUFBQ3lKLEtBQUssRUFBSztvQkFDckMsSUFBSTRDLE1BQU0sR0FBRzVDLEtBQUssQ0FBQ3hRLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQ2lVLFVBQVUsQ0FBQyxDQUFDeEIsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDO29CQUN0RSxJQUFJL1IsTUFBTSxLQUFLb1EsT0FBTyxDQUFDRSxPQUFPLEVBQUU7c0JBQzlCb0MsTUFBTSxHQUFHNUMsS0FBSyxDQUFDeFEsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQ3RDaVUsVUFBVSxDQUFDLENBQUN4QixRQUFRLEVBQUUsTUFBSSxDQUFDSSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO29CQUNqRTtvQkFFQSxJQUFJN1MsS0FBSyxHQUFHLENBQUM7b0JBQ2IsSUFBTXdVLE1BQU0sR0FBRyxFQUFFO29CQUNqQnBCLE1BQU0sQ0FBQ3RCLFNBQVMsR0FBRyxVQUFTUCxLQUFLLEVBQUU7c0JBQ2pDLElBQU0xRCxNQUFNLEdBQUcwRCxLQUFLLENBQUM4QixNQUFNLENBQUN4RixNQUFNO3NCQUNsQyxJQUFJQSxNQUFNLElBQUk3TixLQUFLLEdBQUd1VSxJQUFJLEVBQUU7d0JBQzFCdlUsS0FBSyxFQUFFO3dCQUNQd1UsTUFBTSxDQUFDQyxJQUFJLENBQUM1RyxNQUFNLENBQUN4RSxLQUFLLENBQUM7d0JBQ3pCd0UsTUFBTSxDQUFDeUYsUUFBUSxFQUFFO3NCQUNuQixDQUFDLE1BQU07d0JBQ0xoRyxPQUFPLENBQUNrSCxNQUFNLENBQUM7c0JBQ2pCO29CQUNGLENBQUM7a0JBQ0gsQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNIO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQSxPQUVELCtCQUFzQjtNQUNwQixJQUFNRSxDQUFDLEdBQUcsSUFBSXZULElBQUksRUFBRTtNQUNwQnVULENBQUMsQ0FBQ0MsUUFBUSxDQUFDRCxDQUFDLENBQUNFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztNQUU1QixPQUFPRixDQUFDLENBQUNwRyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQzFCLENBQUNvRyxDQUFDLENBQUNyRyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUrRixRQUFRLEVBQUUsQ0FBQ1MsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQ3BESCxDQUFDLENBQUNJLE9BQU8sRUFBRSxDQUFDVixRQUFRLEVBQUUsQ0FBQ1MsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDM0M7RUFBQztFQUFBO0FBQUE7Ozs7Ozs7OztBQzNSSDtBQUN1RDtBQUN4QjtBQUUvQixJQUFNelEsMkJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHNCQUFzQixDQUFDO0FBQ2pELElBQU02UixZQUFZLEdBQUcsSUFBSUQsMkJBQVksRUFBRTs7QUFFdkM7O0FBRU8sSUFBTUUsZ0JBQWdCO0VBQUEsc0VBQUcsaUJBQU9DLGVBQWUsRUFBRUMsV0FBVyxFQUFFelUsTUFBTTtJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDekUwRCwyQkFBTSxDQUFDUixHQUFHLENBQUMsa0JBQWtCLEVBQUVzUixlQUFlLEVBQUVDLFdBQVcsRUFBRXpVLE1BQU0sQ0FBQztZQUFDLElBQ2hFc1UsWUFBWTtjQUFBO2NBQUE7WUFBQTtZQUNmNVEsMkJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQztZQUFDLGlDQUM3QyxJQUFJO1VBQUE7WUFBQSxNQUtUMFAsV0FBVyxLQUFLLEtBQUs7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUFBLE9BQ0lILFlBQVksQ0FBQ25KLEdBQUcsQ0FBQ3FKLGVBQWUsRUFBRXhVLE1BQU0sQ0FBQztVQUFBO1lBQTlEMFUsWUFBWTtZQUFBLGlDQUNYQSxZQUFZO1VBQUE7WUFBQSxNQUNWRCxXQUFXLEtBQUssS0FBSztjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDSEgsWUFBWSxDQUFDbEosR0FBRyxDQUFDb0osZUFBZSxFQUFFeFUsTUFBTSxDQUFDO1VBQUE7WUFBOUQwVSxhQUFZO1lBQUEsaUNBQ1hBLGFBQVk7VUFBQTtZQUFBLE1BQ1ZELFdBQVcsS0FBSyxLQUFLO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUNISCxZQUFZLENBQUNLLEdBQUcsQ0FBQ0gsZUFBZSxFQUFFeFUsTUFBTSxDQUFDO1VBQUE7WUFBOUQwVSxjQUFZO1lBQUEsaUNBQ1hBLGNBQVk7VUFBQTtZQUFBLE1BQ1ZELFdBQVcsS0FBSyxJQUFJO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUNmSCxZQUFZLENBQUNyQixPQUFPLENBQUN1QixlQUFlLEVBQUV4VSxNQUFNLENBQUM7VUFBQTtZQUFBLCtDQUFFNlQsSUFBSTtVQUFBO1lBQUEsTUFDeERZLFdBQVcsS0FBSyxJQUFJO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUNWSCxZQUFZLENBQUNyQixPQUFPLENBQUN1QixlQUFlLEVBQUV4VSxNQUFNLENBQUM7VUFBQTtZQUExRGtULElBQUk7WUFFTkMsS0FBSyxHQUFHLENBQUM7WUFBQSwyREFDV0QsSUFBSTtZQUFBO2NBQTVCLG9EQUE4QjtnQkFBQSw4Q0FBaEJ2SyxLQUFLO2dCQUNqQndLLEtBQUssSUFBSXhLLEtBQUs7Y0FDaEI7WUFBQztjQUFBO1lBQUE7Y0FBQTtZQUFBO1lBQUEsaUNBQ013SyxLQUFLO1VBQUE7WUFBQSxNQUdWc0IsV0FBVyxLQUFLLE1BQU07Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUFBLE9BQ0xILFlBQVksQ0FBQ00sSUFBSSxDQUFDSixlQUFlLEVBQUV4VSxNQUFNLENBQUM7VUFBQTtZQUF2RGtULEtBQUk7WUFBQSxJQUNMQSxLQUFJO2NBQUE7Y0FBQTtZQUFBO1lBQUEsaUNBQVMsSUFBSTtVQUFBO1lBQUEsaUNBQ2ZBLEtBQUksQ0FBQ25ELElBQUk7VUFBQTtZQUFBLE1BR2QwRSxXQUFXLENBQUNsVixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztjQUFBO2NBQUE7WUFBQTtZQUM1QmlPLEtBQUssR0FBR2lILFdBQVcsQ0FBQ2pILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztZQUFBLE1BQ2pELENBQUNBLEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUMvTixNQUFNLEtBQUssQ0FBQyxJQUFJNEwsUUFBUSxDQUFDbUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztjQUFBO2NBQUE7WUFBQTtZQUFBLGlDQUFVLElBQUk7VUFBQTtZQUFBO1lBQUEsT0FDOUM4RyxZQUFZLENBQUNPLElBQUksQ0FBQ0wsZUFBZSxFQUFFaEgsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFeE4sTUFBTSxDQUFDO1VBQUE7WUFBekUwVSxjQUFZO1lBQ1pJLFVBQVUsR0FBR0osY0FBWSxDQUFDM04sR0FBRyxDQUFDLFVBQUNnTyxHQUFHO2NBQUEsT0FBS0EsR0FBRyxDQUFDQyxVQUFVO1lBQUEsRUFBQztZQUFBLGlDQUNyREYsVUFBVTtVQUFBO1lBR25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7WUFFRTs7WUFFQTtZQUNBO1lBQ0FwUiwyQkFBTSxDQUFDcUIsTUFBTSwrQkFBd0IwUCxXQUFXLDhCQUEyQjtZQUFDLGlDQUNyRSxJQUFJO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDWjtFQUFBLGdCQTVEWUYsZ0JBQWdCO0lBQUE7RUFBQTtBQUFBLEdBNEQ1QjtBQUVNLElBQU1VLGlCQUFpQjtFQUFBLHVFQUFHLGtCQUFPVCxlQUFlLEVBQUVVLGdCQUFnQixFQUFFQyxZQUFZO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDckZ6UiwyQkFBTSxDQUFDUixHQUFHLENBQUMsbUJBQW1CLEVBQUVzUixlQUFlLEVBQUVVLGdCQUFnQixFQUFFQyxZQUFZLENBQUM7WUFBQyxJQUM1RWIsWUFBWTtjQUFBO2NBQUE7WUFBQTtZQUNmNVEsMkJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQztZQUFDLGtDQUM3QyxJQUFJO1VBQUE7WUFBQTtZQUFBLE9BR1B1UCxZQUFZLENBQUNjLElBQUksQ0FBQ1osZUFBZSxFQUFFVSxnQkFBZ0IsQ0FBQztVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBZ0IzRDtFQUFBLGdCQXZCWUQsaUJBQWlCO0lBQUE7RUFBQTtBQUFBLEdBdUI3Qjs7Ozs7Ozs7O0FDOUZEO0FBQzJEO0FBQ1Q7QUFDMEI7QUFDN0M7QUFFL0JqVixNQUFNLENBQUNxVixlQUFlLEdBQUdyVixNQUFNLENBQUNxVixlQUFlLElBQUk7RUFDakRDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFBRXhJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFBRXlJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFBRUMsS0FBSyxFQUFFO0FBQzlCLENBQUM7QUFFRCxJQUFNOVIsc0JBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLGlCQUFpQixDQUFDOztBQUU1QztBQUNBLElBQU1nVCxXQUFXLEdBQUc7QUFDbEI7QUFDQTtBQUNBO0VBQUNDLGNBQWMsRUFBRSxHQUFHO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxVQUFVO0VBQUU3RixJQUFJLEVBQUU7QUFBVSxDQUFDLEVBQ3BGO0VBQUMyRixjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsU0FBUztFQUFFN0YsSUFBSSxFQUFFO0FBQWUsQ0FBQyxFQUN4RjtFQUFDMkYsY0FBYyxFQUFFLEdBQUc7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLFFBQVE7RUFBRTdGLElBQUksRUFBRTtBQUFXLENBQUMsRUFFbkY7RUFBQzJGLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxjQUFjO0VBQUU3RixJQUFJLEVBQUU7QUFBVSxDQUFDLEVBQ2xHO0VBQUMyRixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsY0FBYztFQUFFN0YsSUFBSSxFQUFFO0FBQVcsQ0FBQyxFQUNuRztFQUFDMkYsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLGtCQUFrQjtFQUFFN0YsSUFBSSxFQUFFO0FBQVcsQ0FBQyxFQUN2RztFQUFDMkYsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLGFBQWE7RUFBRTdGLElBQUksRUFBRSxTQUFTO0VBQUU4RixTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQzFIO0VBQUNILGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxXQUFXO0VBQUU3RixJQUFJLEVBQUU7QUFBUyxDQUFDLEVBQzlGO0VBQUMyRixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsa0JBQWtCO0VBQUU3RixJQUFJLEVBQUU7QUFBYyxDQUFDLEVBQzFHO0VBQUMyRixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsbUNBQW1DO0VBQUU3RixJQUFJLEVBQUU7QUFBZSxDQUFDLEVBQzVIO0VBQUMyRixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsdUJBQXVCO0VBQUU3RixJQUFJLEVBQUUsU0FBUztFQUFFOEYsU0FBUyxFQUFFO0FBQVMsQ0FBQyxFQUNoSTtFQUFDSCxjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsNEJBQTRCO0VBQUU3RixJQUFJLEVBQUUsY0FBYztFQUFFOEYsU0FBUyxFQUFFO0FBQVMsQ0FBQyxFQUMxSTtFQUFDSCxjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsZ0NBQWdDO0VBQUU3RixJQUFJLEVBQUUsa0JBQWtCO0VBQUU4RixTQUFTLEVBQUU7QUFBUyxDQUFDLEVBQ2xKO0VBQUNILGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxnQ0FBZ0M7RUFBRTdGLElBQUksRUFBRSxrQkFBa0I7RUFBRThGLFNBQVMsRUFBRTtBQUFTLENBQUMsRUFDbEo7RUFBQ0gsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLGdDQUFnQztFQUFFN0YsSUFBSSxFQUFFLGtCQUFrQjtFQUFFOEYsU0FBUyxFQUFFO0FBQVMsQ0FBQyxFQUVsSjtFQUFDSCxjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsZ0JBQWdCO0VBQUU3RixJQUFJLEVBQUUsbUJBQW1CO0VBQUUrRixTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXO0FBQUMsQ0FBQyxFQUNsTTtFQUFDSixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsYUFBYTtFQUFFN0YsSUFBSSxFQUFFLFFBQVE7RUFBRStGLFNBQVMsRUFBRSxDQUFDLG1CQUFtQjtBQUFDLENBQUMsRUFDakk7RUFBQ0osY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLHdCQUF3QjtFQUFFN0YsSUFBSSxFQUFFLHNCQUFzQjtFQUFFK0YsU0FBUyxFQUFFLENBQUMsbUJBQW1CO0FBQUMsQ0FBQyxFQUMxSjtFQUFDSixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsY0FBYztFQUFFN0YsSUFBSSxFQUFFLFVBQVU7RUFBRStGLFNBQVMsRUFBRSxDQUFDLG1CQUFtQjtBQUFDLENBQUMsRUFDcEk7RUFBQ0osY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLGNBQWM7RUFBRTdGLElBQUksRUFBRSxXQUFXO0VBQUUrRixTQUFTLEVBQUUsQ0FBQyxtQkFBbUI7QUFBQyxDQUFDLEVBQ3JJO0VBQUNKLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxrQkFBa0I7RUFBRTdGLElBQUksRUFBRSxXQUFXO0VBQUUrRixTQUFTLEVBQUUsQ0FBQyxtQkFBbUI7QUFBQyxDQUFDLEVBRXpJO0VBQUNKLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxrQ0FBa0M7RUFBRTdGLElBQUksRUFBRTtBQUFlLENBQUMsRUFDeEg7RUFBQzJGLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxxQ0FBcUM7RUFBRTdGLElBQUksRUFBRTtBQUFpQixDQUFDLEVBQzdIO0VBQUMyRixjQUFjLEVBQUUsVUFBVTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsd0NBQXdDO0VBQUU3RixJQUFJLEVBQUU7QUFBcUIsQ0FBQyxFQUNwSTtFQUFDMkYsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLHdDQUF3QztFQUFFN0YsSUFBSSxFQUFFO0FBQXFCLENBQUMsRUFDcEk7RUFBQzJGLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxhQUFhO0VBQUVDLFFBQVEsRUFBRSxtQ0FBbUM7RUFBRTdGLElBQUksRUFBRTtBQUFrQixDQUFDLEVBQzVIO0VBQUMyRixjQUFjLEVBQUUsVUFBVTtFQUFFQyxNQUFNLEVBQUUsYUFBYTtFQUFFQyxRQUFRLEVBQUUsd0NBQXdDO0VBQUU3RixJQUFJLEVBQUU7QUFBa0IsQ0FBQyxFQUNqSTtFQUFDMkYsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLGFBQWE7RUFBRUMsUUFBUSxFQUFFLDRDQUE0QztFQUFFN0YsSUFBSSxFQUFFO0FBQXNCLENBQUM7QUFFekk7QUFDQTtBQUNBO0VBQUMyRixjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsOENBQThDO0VBQUU3RixJQUFJLEVBQUUsVUFBVTtFQUFFZ0csT0FBTyxFQUFFLDZCQUE2QjtFQUFFcE4sS0FBSyxFQUFFO0FBQVUsQ0FBQyxFQUNoTDtFQUFDK00sY0FBYyxFQUFFLEdBQUc7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLG9DQUFvQztFQUFFN0YsSUFBSSxFQUFFLFVBQVU7RUFBRWdHLE9BQU8sRUFBRSw2QkFBNkI7RUFBRXBOLEtBQUssRUFBRTtBQUFhLENBQUMsRUFDeks7RUFBQytNLGNBQWMsRUFBRSxHQUFHO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxtQ0FBbUM7RUFBRTdGLElBQUksRUFBRSxVQUFVO0VBQUVnRyxPQUFPLEVBQUUsNkJBQTZCO0VBQUVwTixLQUFLLEVBQUU7QUFBYSxDQUFDLEVBQ3hLO0VBQUMrTSxjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsc0JBQXNCO0VBQUU3RixJQUFJLEVBQUUsVUFBVTtFQUFFZ0csT0FBTyxFQUFFLDZCQUE2QjtFQUFFcE4sS0FBSyxFQUFFO0FBQWEsQ0FBQyxFQUUzSjtFQUFDK00sY0FBYyxFQUFFLGtDQUFrQztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsK0JBQStCO0VBQUU3RixJQUFJLEVBQUUsaUJBQWlCO0VBQUVnRyxPQUFPLEVBQUU7QUFBc0IsQ0FBQyxFQUM3SztFQUFDTCxjQUFjLEVBQUUsa0NBQWtDO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxnQ0FBZ0M7RUFBRTdGLElBQUksRUFBRSxjQUFjO0VBQUVnRyxPQUFPLEVBQUUsc0JBQXNCO0VBQUVELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLGVBQWUsRUFBRSwwQkFBMEI7QUFBQyxDQUFDLEVBQzVQO0VBQUNKLGNBQWMsRUFBRSxrQ0FBa0M7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLG9EQUFvRDtFQUFFN0YsSUFBSSxFQUFFLDBCQUEwQjtFQUFFZ0csT0FBTyxFQUFFLHlCQUF5QjtFQUFFRCxTQUFTLEVBQUUsQ0FBQyxjQUFjO0FBQUMsQ0FBQztBQUMzTztBQUNBO0VBQUNKLGNBQWMsRUFBRSxrQ0FBa0M7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLGlDQUFpQztFQUFFN0YsSUFBSSxFQUFFLHFCQUFxQjtFQUFFZ0csT0FBTyxFQUFFLG1CQUFtQjtFQUFFRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUM7RUFBRUQsU0FBUyxFQUFFO0FBQWEsQ0FBQyxFQUNuUTtFQUFDSCxjQUFjLEVBQUUsa0NBQWtDO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxxREFBcUQ7RUFBRTdGLElBQUksRUFBRSxlQUFlO0VBQUVnRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVELFNBQVMsRUFBRSxDQUFDLGNBQWM7QUFBQyxDQUFDLEVBRTNOO0VBQUNKLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSw0QkFBNEI7RUFBRTdGLElBQUksRUFBRSxrQkFBa0I7RUFBRWdHLE9BQU8sRUFBRTtBQUFtQixDQUFDLEVBQ25KO0VBQUNMLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSw0QkFBNEI7RUFBRTdGLElBQUksRUFBRSwyQkFBMkI7RUFBRWdHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUYsU0FBUyxFQUFFO0FBQW9CLENBQUMsRUFDN0w7RUFBQ0gsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLHdEQUF3RDtFQUFFN0YsSUFBSSxFQUFFLFVBQVU7RUFBRWdHLE9BQU8sRUFBRTtBQUFtQixDQUFDLEVBQ3ZLO0VBQUNMLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxvQ0FBb0M7RUFBRTdGLElBQUksRUFBRSxtQkFBbUI7RUFBRWdHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUQsU0FBUyxFQUFFLENBQUMsb0JBQW9CO0FBQUMsQ0FBQyxFQUMvTDtFQUFDSixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsaURBQWlEO0VBQUU3RixJQUFJLEVBQUUsb0JBQW9CO0VBQUVnRyxPQUFPLEVBQUUsc0JBQXNCO0VBQUVELFNBQVMsRUFBRSxDQUFDLG1CQUFtQjtBQUFDLENBQUMsRUFDL007RUFBQ0osY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLFlBQVk7RUFBRTdGLElBQUksRUFBRSxXQUFXO0VBQUVnRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVGLFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDdEo7RUFBQ0gsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLGNBQWM7RUFBRTdGLElBQUksRUFBRSxXQUFXO0VBQUVnRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVGLFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDeEo7RUFBQ0gsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLHVCQUF1QjtFQUFFN0YsSUFBSSxFQUFFLGlCQUFpQjtFQUFFaUcsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO0VBQUVELE9BQU8sRUFBRTtBQUFpQixDQUFDLEVBQ3BLO0VBQUNMLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSx3QkFBd0I7RUFBRTdGLElBQUksRUFBRSxpQkFBaUI7RUFBRWlHLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztFQUFFRCxPQUFPLEVBQUU7QUFBaUIsQ0FBQyxFQUVySztFQUFDTCxjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsK0JBQStCO0VBQUU3RixJQUFJLEVBQUUsZUFBZTtFQUFFZ0csT0FBTyxFQUFFLG1CQUFtQjtFQUFFRixTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQzdLO0VBQUNILGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxrQ0FBa0M7RUFBRTdGLElBQUksRUFBRSxVQUFVO0VBQUVnRyxPQUFPLEVBQUU7QUFBbUIsQ0FBQyxFQUNqSjtFQUFDTCxjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsaUNBQWlDO0VBQUU3RixJQUFJLEVBQUUsdUJBQXVCO0VBQUVnRyxPQUFPLEVBQUUseUJBQXlCO0VBQUVwTixLQUFLLEVBQUU7QUFBa0IsQ0FBQyxFQUM5TDtFQUFDK00sY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLGVBQWU7RUFBRTdGLElBQUksRUFBRSw0QkFBNEI7RUFBRWlHLFFBQVEsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0VBQUVELE9BQU8sRUFBRTtBQUFpQixDQUFDLEVBRW5MO0VBQUNMLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxvQ0FBb0M7RUFBRTdGLElBQUksRUFBRSxjQUFjO0VBQUVnRyxPQUFPLEVBQUUsc0JBQXNCO0VBQUVELFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLHdCQUF3QjtBQUFDLENBQUMsRUFDdFY7RUFBQ0osY0FBYyxFQUFFLFFBQVE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLCtCQUErQjtFQUFFN0YsSUFBSSxFQUFFLGVBQWU7RUFBRWdHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUQsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO0VBQUVELFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDck07RUFBQ0gsY0FBYyxFQUFFLFFBQVE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLG1CQUFtQjtFQUFFN0YsSUFBSSxFQUFFLGlCQUFpQjtFQUFFZ0csT0FBTyxFQUFFLHlCQUF5QjtFQUFFcE4sS0FBSyxFQUFFLGVBQWU7RUFBRW1OLFNBQVMsRUFBRSxDQUFDLGNBQWM7QUFBQyxDQUFDLEVBQy9MO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxhQUFhO0VBQUU3RixJQUFJLEVBQUUsaUJBQWlCO0VBQUVnRyxPQUFPLEVBQUUsbUJBQW1CO0VBQUVELFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztFQUFFRCxTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQ3JMO0VBQUNILGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxpQ0FBaUM7RUFBRTdGLElBQUksRUFBRSxzQkFBc0I7RUFBRWdHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUQsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO0VBQUVELFNBQVMsRUFBRTtBQUFhLENBQUMsRUFDOU07RUFBQ0gsY0FBYyxFQUFFLFFBQVE7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLDZDQUE2QztFQUFFN0YsSUFBSSxFQUFFLDBCQUEwQjtFQUFFZ0csT0FBTyxFQUFFLHlCQUF5QjtFQUFFRCxTQUFTLEVBQUUsQ0FBQyxjQUFjO0FBQUMsQ0FBQztBQUMxTTtBQUNBO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxjQUFjO0VBQUU3RixJQUFJLEVBQUUsV0FBVztFQUFFZ0csT0FBTyxFQUFFLHlCQUF5QjtFQUFFcE4sS0FBSyxFQUFFLFVBQVU7RUFBRW1OLFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSwwQkFBMEI7QUFBQyxDQUFDLEVBQzNNO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxjQUFjO0VBQUU3RixJQUFJLEVBQUUsaUJBQWlCO0VBQUVnRyxPQUFPLEVBQUUseUJBQXlCO0VBQUVwTixLQUFLLEVBQUUsc0JBQXNCO0VBQUVtTixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCO0FBQUMsQ0FBQyxFQUM3TjtFQUFDSixjQUFjLEVBQUUsUUFBUTtFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsY0FBYztFQUFFN0YsSUFBSSxFQUFFLGFBQWE7RUFBRWdHLE9BQU8sRUFBRSx5QkFBeUI7RUFBRXBOLEtBQUssRUFBRSxZQUFZO0VBQUVtTixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCO0FBQUMsQ0FBQztBQUMvTTtBQUNBO0VBQUNKLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSx1QkFBdUI7RUFBRTdGLElBQUksRUFBRSx3QkFBd0I7RUFBRWlHLFFBQVEsRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSw2QkFBNkIsQ0FBQztFQUFFRCxPQUFPLEVBQUU7QUFBaUIsQ0FBQztBQUNsVztBQUNBO0VBQUNMLGNBQWMsRUFBRSxRQUFRO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxlQUFlO0VBQUU3RixJQUFJLEVBQUUsd0JBQXdCO0VBQUVpRyxRQUFRLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsNkJBQTZCLENBQUM7RUFBRUQsT0FBTyxFQUFFO0FBQWlCLENBQUMsRUFFMVY7RUFBQ0wsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLDJEQUEyRDtFQUFFN0YsSUFBSSxFQUFFLGtCQUFrQjtFQUFFZ0csT0FBTyxFQUFFLG1CQUFtQjtFQUFFRixTQUFTLEVBQUU7QUFBYSxDQUFDLEVBQ3pNO0VBQUNILGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxnRUFBZ0U7RUFBRTdGLElBQUksRUFBRSxtQkFBbUI7RUFBRWdHLE9BQU8sRUFBRTtBQUFtQixDQUFDLEVBQ3JMO0VBQUNMLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSx1Q0FBdUM7RUFBRTdGLElBQUksRUFBRSxzQkFBc0I7RUFBRWdHLE9BQU8sRUFBRSxtQkFBbUI7RUFBRUYsU0FBUyxFQUFFO0FBQXNCLENBQUMsRUFDbE07RUFBQ0gsY0FBYyxFQUFFLFVBQVU7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLCtCQUErQjtFQUFFN0YsSUFBSSxFQUFFLGVBQWU7RUFBRWdHLE9BQU8sRUFBRTtBQUF3QixDQUFDLEVBQ3JKO0VBQUNMLGNBQWMsRUFBRSxVQUFVO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxjQUFjO0VBQUU3RixJQUFJLEVBQUUsZUFBZTtFQUFFZ0csT0FBTyxFQUFFLHlCQUF5QjtFQUFFcE4sS0FBSyxFQUFFO0FBQVUsQ0FBQztBQUV4SjtBQUNBO0FBQ0E7RUFBQytNLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVDLFFBQVEsRUFBRSxLQUFLO0VBQUU3RixJQUFJLEVBQUU7QUFBUyxDQUFDLEVBQ3BGO0VBQUMyRixjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsU0FBUztFQUFFQyxRQUFRLEVBQUUsS0FBSztFQUFFN0YsSUFBSSxFQUFFO0FBQVMsQ0FBQyxFQUNwRjtFQUFDMkYsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLFNBQVM7RUFBRUMsUUFBUSxFQUFFLE1BQU07RUFBRTdGLElBQUksRUFBRSxVQUFVO0VBQUVnRyxPQUFPLEVBQUUsaUJBQWlCO0VBQUVwTixLQUFLLEVBQUU7QUFBZSxDQUFDLEVBQzFJO0VBQUMrTSxjQUFjLEVBQUUsYUFBYTtFQUFFQyxNQUFNLEVBQUUsU0FBUztFQUFFQyxRQUFRLEVBQUUsd0JBQXdCO0VBQUU3RixJQUFJLEVBQUU7QUFBcUIsQ0FBQyxFQUNuSDtFQUFDMkYsY0FBYyxFQUFFLGFBQWE7RUFBRUMsTUFBTSxFQUFFLFNBQVM7RUFBRUMsUUFBUSxFQUFFLHdCQUF3QjtFQUFFN0YsSUFBSSxFQUFFO0FBQWlCLENBQUMsRUFFL0c7RUFBQzJGLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVDLFFBQVEsRUFBRSxpQkFBaUI7RUFBRTdGLElBQUksRUFBRTtBQUFVLENBQUMsRUFDakc7RUFBQzJGLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVDLFFBQVEsRUFBRSwwQkFBMEI7RUFBRTdGLElBQUksRUFBRTtBQUFlLENBQUMsRUFDL0c7RUFBQzJGLGNBQWMsRUFBRSxhQUFhO0VBQUVDLE1BQU0sRUFBRSxTQUFTO0VBQUVDLFFBQVEsRUFBRSx3Q0FBd0M7RUFBRTdGLElBQUksRUFBRTtBQUFpQixDQUFDO0FBRS9IO0FBQ0E7QUFDQTtFQUFDMkYsY0FBYyxFQUFFLEdBQUc7RUFBRUMsTUFBTSxFQUFFLFVBQVU7RUFBRUMsUUFBUSxFQUFFLGtCQUFrQjtFQUFFN0YsSUFBSSxFQUFFO0FBQW9CLENBQUMsRUFDbkc7RUFBQzJGLGNBQWMsRUFBRSxHQUFHO0VBQUVDLE1BQU0sRUFBRSxVQUFVO0VBQUVDLFFBQVEsRUFBRSxTQUFTO0VBQUU3RixJQUFJLEVBQUUsZUFBZTtFQUFFOEYsU0FBUyxFQUFFO0FBQVUsQ0FBQyxFQUM1RztFQUFDSCxjQUFjLEVBQUUsR0FBRztFQUFFQyxNQUFNLEVBQUUsVUFBVTtFQUFFQyxRQUFRLEVBQUUsUUFBUTtFQUFFN0YsSUFBSSxFQUFFO0FBQVcsQ0FBQyxDQUNqRjtBQUVELElBQU1rRyxxQkFBcUIsR0FBRztFQUM1QixZQUFZLEVBQUUsQ0FDWjtJQUFDZCxZQUFZLEVBQUU7RUFBSyxDQUFDLEVBQ3JCO0lBQUNWLFdBQVcsRUFBRSxLQUFLO0lBQUV6VSxNQUFNLEVBQUUsU0FBUztJQUFFa1csV0FBVyxFQUFFO0VBQXdCLENBQUMsQ0FDL0U7RUFDRCxVQUFVLEVBQUUsQ0FDVjtJQUFDZixZQUFZLEVBQUU7RUFBYyxDQUFDLEVBQzlCO0lBQUNWLFdBQVcsRUFBRSxJQUFJO0lBQUV6VSxNQUFNLEVBQUUsU0FBUztJQUFFa1csV0FBVyxFQUFFO0VBQWdDLENBQUMsRUFDckY7SUFBQ3pCLFdBQVcsRUFBRSxJQUFJO0lBQUV6VSxNQUFNLEVBQUUsU0FBUztJQUFFa1csV0FBVyxFQUFFO0VBQWdDLENBQUMsQ0FDdEY7RUFDRCw2QkFBNkIsRUFBRSxDQUM3QjtJQUFDZixZQUFZLEVBQUU7RUFBTSxDQUFDLEVBQ3RCO0lBQUNWLFdBQVcsRUFBRSxTQUFTO0lBQUV6VSxNQUFNLEVBQUUsU0FBUztJQUFFa1csV0FBVyxFQUFFO0VBQXFDLENBQUMsQ0FDaEc7RUFDRCxjQUFjLEVBQUUsQ0FDZDtJQUFDZixZQUFZLEVBQUU7RUFBYyxDQUFDLEVBQzlCO0lBQUNBLFlBQVksRUFBRTtFQUFNLENBQUMsRUFDdEI7SUFBQ1YsV0FBVyxFQUFFLE1BQU07SUFBRXpVLE1BQU0sRUFBRSxTQUFTO0lBQUVrVyxXQUFXLEVBQUU7RUFBbUMsQ0FBQyxFQUMxRjtJQUFDekIsV0FBVyxFQUFFLFNBQVM7SUFBRXpVLE1BQU0sRUFBRSxTQUFTO0lBQUVrVyxXQUFXLEVBQUU7RUFBbUMsQ0FBQyxDQUM5RjtFQUNELFdBQVcsRUFBRSxDQUNYO0lBQUNmLFlBQVksRUFBRTtFQUFNLENBQUMsRUFDdEI7SUFBQ1YsV0FBVyxFQUFFLFNBQVM7SUFBRXpVLE1BQU0sRUFBRSxTQUFTO0lBQUVrVyxXQUFXLEVBQUU7RUFBK0IsQ0FBQztBQUU3RixDQUFDO0FBRU0sSUFBTUMsMEJBQTBCLEdBQUcsU0FBN0JBLDBCQUEwQixHQUFTO0VBQzlDLElBQU1DLFNBQVMsR0FBR3BXLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ3dSLGVBQWU7RUFDNUM7RUFDQWUsU0FBUyxDQUFDWixLQUFLLElBQUksQ0FBQztBQUN0QixDQUFDO0FBRU0sSUFBTS9SLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBb0IsQ0FBSWlGLEdBQUcsRUFBRUMsS0FBSyxFQUFLO0VBQ2xELElBQU15TixTQUFTLEdBQUdwVyxNQUFNLENBQUM2RCxHQUFHLENBQUN3UixlQUFlO0VBRTVDLElBQUkzTSxHQUFHLEtBQUssSUFBSSxJQUFJQSxHQUFHLEtBQUt3QyxTQUFTLEVBQUU7RUFDdkM7RUFDQSxJQUFNbUwsVUFBVSxHQUFHLE9BQVExTixLQUFNLEtBQUssUUFBUSxHQUFHQSxLQUFLLENBQUMrSyxRQUFRLEVBQUUsQ0FBQ3RNLElBQUksRUFBRSxHQUFHdUIsS0FBSztFQUNoRjtFQUNBLElBQUlELEdBQUcsQ0FBQ25KLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUN6QixJQUFNeUssSUFBSSxHQUFHdEIsR0FBRyxDQUFDNUIsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMzQixJQUFNd1AsT0FBTyxHQUFHdE0sSUFBSSxDQUFDdU0sR0FBRyxFQUFFO0lBQzFCLElBQUl4QixHQUFHLEdBQUdxQixTQUFTO0lBQ25CcE0sSUFBSSxDQUFDNUcsT0FBTyxDQUFDLFVBQUNzRixHQUFHLEVBQUs7TUFDcEIsSUFBSSxDQUFDcU0sR0FBRyxDQUFDck0sR0FBRyxDQUFDLEVBQUVxTSxHQUFHLENBQUNyTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDNUJxTSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ3JNLEdBQUcsQ0FBQztJQUNoQixDQUFDLENBQUM7SUFDRnFNLEdBQUcsQ0FBQ3VCLE9BQU8sQ0FBQyxHQUFHRCxVQUFVO0VBQzNCLENBQUMsTUFBTTtJQUNMRCxTQUFTLENBQUMxTixHQUFHLENBQUMsR0FBRzJOLFVBQVU7RUFDN0I7RUFDQTtFQUNBRiwwQkFBMEIsRUFBRTtFQUM1QjtFQUNBLElBQUlFLFVBQVUsS0FBS25MLFNBQVMsSUFBSW1MLFVBQVUsS0FBSyxJQUFJLEVBQUU7SUFDbkRHLDRCQUE0QixDQUFDOU4sR0FBRyxFQUFFMk4sVUFBVSxDQUFDO0lBQzdDSSxvQkFBb0IsQ0FBQy9OLEdBQUcsRUFBRTJOLFVBQVUsQ0FBQztFQUN2QztBQUNGLENBQUM7QUFFRCxJQUFNSyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRWxCLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBZSxDQUFJak8sR0FBRyxFQUFFa08sUUFBUSxFQUFLO0VBQ2hELElBQUksQ0FBQ0YsY0FBYyxDQUFDaE8sR0FBRyxDQUFDLEVBQUU7SUFDeEJnTyxjQUFjLENBQUNoTyxHQUFHLENBQUMsR0FBRyxFQUFFO0VBQzFCO0VBQ0FnTyxjQUFjLENBQUNoTyxHQUFHLENBQUMsQ0FBQ3FMLElBQUksQ0FBQzZDLFFBQVEsQ0FBQztBQUNwQyxDQUFDO0FBRUQsSUFBTUgsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUFvQixDQUFJL04sR0FBRyxFQUFFQyxLQUFLLEVBQUs7RUFDM0MsSUFBTWtPLFNBQVMsR0FBR0gsY0FBYyxDQUFDaE8sR0FBRyxDQUFDO0VBQ3JDLElBQUltTyxTQUFTLElBQUkzSCxLQUFLLENBQUM0SCxPQUFPLENBQUNELFNBQVMsQ0FBQyxJQUFJQSxTQUFTLENBQUNwWCxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ2pFLEtBQUssSUFBSTZJLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3VPLFNBQVMsQ0FBQ3BYLE1BQU0sRUFBRTZJLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDNUMsSUFBTXNPLFFBQVEsR0FBR0MsU0FBUyxDQUFDdk8sQ0FBQyxDQUFDO01BQzdCLElBQUksT0FBT3NPLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDbENsVCxzQkFBTSxDQUFDUixHQUFHLDBDQUFtQ3lGLEtBQUssMEJBQWdCTCxDQUFDLHFCQUFXSSxHQUFHLEVBQUc7UUFDcEZrTyxRQUFRLENBQUNqTyxLQUFLLENBQUM7TUFDakI7SUFDRjtFQUNGO0FBQ0YsQ0FBQztBQUVNLElBQU1vTyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCLENBQUlyTyxHQUFHLEVBQTJEO0VBQUEsSUFBekRzTyxRQUFRLHVFQUFHLEtBQUs7RUFBQSxJQUFFQyxZQUFZLHVFQUFHLEVBQUU7RUFBQSxJQUFFdlIsT0FBTyx1RUFBRyxLQUFLO0VBQzlGO0VBQ0EsSUFBTTBRLFNBQVMsR0FBR3BXLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ3dSLGVBQWU7RUFDNUM7RUFDQSxJQUFJLENBQUMzTSxHQUFHLEVBQUUsT0FBTyxJQUFJO0VBQ3JCLElBQUl3TyxVQUFVLEdBQUdDLE9BQU8sQ0FBQ2YsU0FBUyxFQUFFMU4sR0FBRyxDQUFDO0VBQ3hDLElBQUl3TyxVQUFVLEtBQUssSUFBSSxJQUFJQSxVQUFVLEtBQUtoTSxTQUFTLEVBQUU7SUFDbkQ7SUFDQSxPQUFPeUIsT0FBTyxDQUFDQyxPQUFPLENBQUNzSyxVQUFVLENBQUM7RUFDcEM7RUFBQywwREFFMkJ6QixXQUFXO0lBQUE7RUFBQTtJQUF2QyxvREFBeUM7TUFBQSxJQUE5QjJCLGFBQWE7TUFDdEIsSUFBSTFPLEdBQUcsS0FBSzBPLGFBQWEsQ0FBQ3JILElBQUksS0FBS3FILGFBQWEsQ0FBQ0MsT0FBTyxJQUFJRCxhQUFhLENBQUNFLFFBQVEsQ0FBQyxFQUFFO1FBQ25GO1FBQ0EsT0FBTzNLLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQztNQUM5QjtJQUNGO0VBQUM7SUFBQTtFQUFBO0lBQUE7RUFBQTtFQUVELElBQUlvSyxRQUFRLEVBQUU7SUFDWixPQUFPLElBQUlySyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO01BQzlCLElBQU02RSxRQUFRLEdBQUd2SixXQUFXLENBQUMsWUFBTTtRQUNqQ2dQLFVBQVUsR0FBR0MsT0FBTyxDQUFDZixTQUFTLEVBQUUxTixHQUFHLENBQUM7UUFDcEMsSUFBSXdPLFVBQVUsS0FBSyxJQUFJLElBQUlBLFVBQVUsS0FBS2hNLFNBQVMsRUFBRTtVQUNuRDtVQUNBbEQsYUFBYSxDQUFDeUosUUFBUSxDQUFDO1VBQ3ZCN0UsT0FBTyxDQUFDc0ssVUFBVSxDQUFDO1FBQ3JCO1FBQUMsMkRBQzJCekIsV0FBVztVQUFBO1FBQUE7VUFBdkMsdURBQXlDO1lBQUEsSUFBOUIyQixhQUFhO1lBQ3RCLElBQUkxTyxHQUFHLEtBQUswTyxhQUFhLENBQUNySCxJQUFJLEtBQUtxSCxhQUFhLENBQUNDLE9BQU8sSUFBSUQsYUFBYSxDQUFDRSxRQUFRLENBQUMsRUFBRTtjQUNuRjtjQUNBdFAsYUFBYSxDQUFDeUosUUFBUSxDQUFDO2NBQ3ZCN0UsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNmO1VBQ0Y7UUFBQztVQUFBO1FBQUE7VUFBQTtRQUFBO01BQ0gsQ0FBQyxFQUFFcUssWUFBWSxDQUFDO01BQ2hCO01BQ0FuUixVQUFVLENBQUMsWUFBTTtRQUNma0MsYUFBYSxDQUFDeUosUUFBUSxDQUFDO1FBQ3ZCN0UsT0FBTyxDQUFDLElBQUksQ0FBQztNQUNmLENBQUMsRUFBRWxILE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDZixDQUFDLENBQUM7RUFDSjs7RUFDQSxPQUFPaUgsT0FBTyxDQUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzlCLENBQUM7QUFFTSxJQUFNMksseUJBQXlCLEdBQUcsU0FBNUJBLHlCQUF5QixDQUFJN08sR0FBRyxFQUFLO0VBQ2hELElBQU0wTixTQUFTLEdBQUdwVyxNQUFNLENBQUM2RCxHQUFHLENBQUN3UixlQUFlO0VBQzVDLElBQUkzTSxHQUFHLEtBQUssSUFBSSxJQUFJQSxHQUFHLEtBQUt3QyxTQUFTLEVBQUU7RUFDdkM7RUFDQSxJQUFJeEMsR0FBRyxDQUFDbkosT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ3pCLElBQU15SyxJQUFJLEdBQUd0QixHQUFHLENBQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzNCLElBQU13UCxPQUFPLEdBQUd0TSxJQUFJLENBQUN1TSxHQUFHLEVBQUU7SUFDMUIsSUFBSXhCLEdBQUcsR0FBR3FCLFNBQVM7SUFDbkJwTSxJQUFJLENBQUM1RyxPQUFPLENBQUMsVUFBQ3NGLEdBQUcsRUFBSztNQUNwQixJQUFJLENBQUNxTSxHQUFHLENBQUNyTSxHQUFHLENBQUMsRUFBRTtNQUNmcU0sR0FBRyxHQUFHQSxHQUFHLENBQUNyTSxHQUFHLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBQ0ZoRixzQkFBTSxDQUFDUixHQUFHLENBQUMsMkJBQTJCLHFCQUFjb1QsT0FBTyxtQkFBUy9NLElBQUksQ0FBQ0UsU0FBUyxDQUFDc0wsR0FBRyxDQUFDLEVBQUc7SUFDMUYsT0FBT0EsR0FBRyxDQUFDdUIsT0FBTyxDQUFDO0VBQ3JCLENBQUMsTUFBTTtJQUNMLE9BQU9GLFNBQVMsQ0FBQzFOLEdBQUcsQ0FBQztFQUN2QjtFQUNBeU4sMEJBQTBCLEVBQUU7RUFDNUI7RUFDQUssNEJBQTRCLENBQUM5TixHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQ3ZDK04sb0JBQW9CLENBQUMvTixHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQ2pDLENBQUM7QUFFTSxJQUFNOE8sWUFBWSxHQUFHLFNBQWZBLFlBQVksQ0FBSXpOLEVBQUUsRUFBRVgsY0FBYyxFQUFFTSxPQUFPLEVBQUVsRCxNQUFNLEVBQW9DO0VBQUEsSUFBbENpUixzQkFBc0IsdUVBQUcsSUFBSTtFQUM3RixJQUFNOU8sS0FBSyxHQUFHLENBQUMsQ0FBQztFQUNoQixJQUFNeU4sU0FBUyxHQUFHcFcsTUFBTSxDQUFDNkQsR0FBRyxDQUFDd1IsZUFBZTtFQUU1QyxJQUFJak0sY0FBYyxLQUFLLElBQUksSUFBSUEsY0FBYyxLQUFLOEIsU0FBUyxFQUFFdkMsS0FBSyxDQUFDUyxjQUFjLEdBQUdBLGNBQWM7RUFDbEcsSUFBSU0sT0FBTyxFQUFFZixLQUFLLENBQUNlLE9BQU8sR0FBR0EsT0FBTztFQUVwQyxRQUFRbEQsTUFBTTtJQUNaLEtBQUssU0FBUztNQUNaNFAsU0FBUyxDQUFDZCxDQUFDLENBQUN2TCxFQUFFLENBQUMsR0FBR3BCLEtBQUs7TUFDdkI7SUFDRixLQUFLLFNBQVM7TUFDWkEsS0FBSyxDQUFDOE8sc0JBQXNCLEdBQUdBLHNCQUFzQjtNQUNyRHJCLFNBQVMsQ0FBQ3RKLENBQUMsQ0FBQy9DLEVBQUUsQ0FBQyxHQUFHcEIsS0FBSztNQUN2QjtJQUNGLEtBQUssUUFBUTtNQUNYeU4sU0FBUyxDQUFDYixDQUFDLENBQUN4TCxFQUFFLENBQUMsR0FBR3BCLEtBQUs7TUFDdkI7RUFBTTtFQUVWd04sMEJBQTBCLEVBQUU7QUFDOUIsQ0FBQztBQUVELElBQU11QixtQkFBbUIsR0FBRyxFQUFFO0FBQzlCLElBQU1DLHFCQUFxQixHQUFHLEVBQUU7QUFDaEMsSUFBSUMscUJBQXFCLEdBQUdELHFCQUFxQjtBQUNqRCxJQUFJRSxxQkFBcUIsR0FBRyxDQUFDO0FBRXRCLElBQU1DLHlCQUF5QjtFQUFBLHNFQUFHO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDdkM7WUFDQUMsZUFBZSxFQUFFOztZQUVqQjtZQUNBQyxZQUFZLEVBQUU7O1lBRWQ7WUFDQUMsVUFBVSxFQUFFO1VBQUM7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDZDtFQUFBLGdCQVRZSCx5QkFBeUI7SUFBQTtFQUFBO0FBQUEsR0FTckM7QUFFRCxJQUFNSSwrQkFBK0I7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDaENDLGdCQUFnQixHQUFHM1AsTUFBTSxDQUFDd0IsSUFBSSxDQUFDaU0scUJBQXFCLENBQUM7WUFBQSw0QkFDN0JrQyxnQkFBZ0I7VUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQW5DM0QsZUFBZTtZQUNsQjRELE1BQU0sR0FBR25DLHFCQUFxQixDQUFDekIsZUFBZSxDQUFDO1lBQUEsTUFDakQ0RCxNQUFNLElBQUlsSixLQUFLLENBQUM0SCxPQUFPLENBQUNzQixNQUFNLENBQUMsSUFBSUEsTUFBTSxDQUFDM1ksTUFBTSxHQUFHLENBQUM7Y0FBQTtjQUFBO1lBQUE7WUFBQSx1REFDbkMyWSxNQUFNO1lBQUE7WUFBQTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBZEMsSUFBSTtZQUFBLE1BQ1RBLElBQUksQ0FBQzVELFdBQVcsS0FBSyxJQUFJLElBQUk0RCxJQUFJLENBQUM1RCxXQUFXLEtBQUt2SixTQUFTO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUEsT0FDbkNxSixnQkFBZ0IsQ0FBQ0MsZUFBZSxFQUFFNkQsSUFBSSxDQUFDNUQsV0FBVyxFQUFFNEQsSUFBSSxDQUFDclksTUFBTSxDQUFDO1VBQUE7WUFBdEZzWSxhQUFhO1lBQ25CN1Usb0JBQW9CLENBQUM0VSxJQUFJLENBQUNuQyxXQUFXLEVBQUVvQyxhQUFhLENBQUM7VUFBQztZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUk3RDtFQUFBLGdCQVpLSiwrQkFBK0I7SUFBQTtFQUFBO0FBQUEsR0FZcEM7QUFFRCxJQUFNMUIsNEJBQTRCO0VBQUEsdUVBQUcsa0JBQU9oQyxlQUFlLEVBQUVVLGdCQUFnQjtJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDM0U7WUFDTWtELE1BQU0sR0FBR25DLHFCQUFxQixDQUFDekIsZUFBZSxDQUFDO1lBQUEsTUFDakQ0RCxNQUFNLElBQUlsSixLQUFLLENBQUM0SCxPQUFPLENBQUNzQixNQUFNLENBQUMsSUFBSUEsTUFBTSxDQUFDM1ksTUFBTSxHQUFHLENBQUM7Y0FBQTtjQUFBO1lBQUE7WUFBQSx1REFDbkMyWSxNQUFNO1lBQUE7WUFBQTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBZEMsSUFBSTtZQUFBLE1BQ1RBLElBQUksQ0FBQ2xELFlBQVksS0FBSyxJQUFJLElBQUlrRCxJQUFJLENBQUNsRCxZQUFZLEtBQUtqSyxTQUFTO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUEsT0FDM0QrSixpQkFBaUIsQ0FBQ1QsZUFBZSxFQUFFVSxnQkFBZ0IsRUFBRW1ELElBQUksQ0FBQ2xELFlBQVksQ0FBQztVQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUdsRjtFQUFBLGdCQVRLcUIsNEJBQTRCO0lBQUE7RUFBQTtBQUFBLEdBU2pDO0FBRUQsSUFBTStCLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0IsQ0FBSTVQLEtBQUssRUFBRWtOLFNBQVMsRUFBSztFQUM3QyxJQUFJbE4sS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLdUMsU0FBUyxJQUFJLENBQUMySyxTQUFTLEVBQUU7SUFDdkQsT0FBTyxJQUFJO0VBQ2I7RUFDQSxRQUFRQSxTQUFTO0lBQ2YsS0FBSyxhQUFhO01BQ2hCLE9BQU9sTixLQUFLLENBQUMrSyxRQUFRLEVBQUUsQ0FBQzhFLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDOUMsS0FBSyxvQkFBb0I7TUFDdkIsT0FBT3ZMLGtCQUFrQixDQUFDdEUsS0FBSyxDQUFDO0lBQ2xDLEtBQUssYUFBYTtNQUNoQixPQUFPQSxLQUFLLENBQUN0SixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztJQUNqQyxLQUFLLHNCQUFzQjtNQUN6QixPQUFPc0osS0FBSyxDQUFDK0ssUUFBUSxFQUFFLENBQUM1VCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUNnSCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELEtBQUssU0FBUztNQUNaLElBQUlvSSxLQUFLLENBQUM0SCxPQUFPLENBQUNuTyxLQUFLLENBQUMsSUFBSUEsS0FBSyxDQUFDbEosTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM1QyxPQUFPa0osS0FBSyxDQUFDLENBQUMsQ0FBQztNQUNqQjtNQUNBLE9BQU9BLEtBQUs7SUFDZCxLQUFLLFVBQVU7TUFDYixPQUFPQSxLQUFLLENBQUMrSyxRQUFRLEVBQUUsQ0FBQ3RNLElBQUksRUFBRTtJQUNoQztNQUNFLE9BQU91QixLQUFLO0VBQUM7QUFFbkIsQ0FBQztBQUVELElBQU04UCxTQUFTLEdBQUcsU0FBWkEsU0FBUyxDQUFJMUQsR0FBRyxFQUFFcUMsYUFBYSxFQUFLO0VBQ3hDLElBQUl6TyxLQUFLO0VBQ1QsSUFBSStQLFVBQVU7RUFFZCxJQUFJO0lBQ0YsUUFBUXRCLGFBQWEsQ0FBQ3JCLE9BQU87TUFDM0IsS0FBSyxpQkFBaUI7UUFDcEI7VUFDRXBOLEtBQUssR0FBR3dPLE9BQU8sQ0FBQ3BDLEdBQUcsRUFBRXFDLGFBQWEsQ0FBQ3hCLFFBQVEsQ0FBQztVQUU1QyxJQUFJak4sS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLdUMsU0FBUyxFQUFFO1lBQ3pDO1VBQ0Y7VUFFQSxJQUFNeU4sWUFBWSxHQUFHdkIsYUFBYSxDQUFDek8sS0FBSyxDQUFDN0IsS0FBSyxDQUFDLEdBQUcsQ0FBQztVQUNuRCxJQUFJNlIsWUFBWSxDQUFDbFosTUFBTSxLQUFLLENBQUMsRUFBRTtVQUMvQixJQUFNbVosVUFBVSxHQUFHRCxZQUFZLENBQUMsQ0FBQyxDQUFDO1VBQ2xDLElBQU1FLFdBQVcsR0FBR0YsWUFBWSxDQUFDLENBQUMsQ0FBQztVQUNuQyxJQUFJLENBQUNDLFVBQVUsSUFBSSxDQUFDQyxXQUFXLEVBQUU7VUFFakMsSUFBTUMsV0FBVyxHQUFHM0IsT0FBTyxDQUFDcEMsR0FBRyxFQUFFNkQsVUFBVSxDQUFDO1VBRTVDLElBQUksQ0FBQ0UsV0FBVyxJQUFJQSxXQUFXLEtBQUtELFdBQVcsRUFBRTtVQUVqRCxJQUFJbFEsS0FBSyxLQUFLdUcsS0FBSyxDQUFDNEgsT0FBTyxDQUFDbk8sS0FBSyxDQUFDLEdBQUdBLEtBQUssQ0FBQ2xKLE1BQU0sR0FBRyxDQUFDLEdBQUdrSixLQUFLLENBQUMrSyxRQUFRLEVBQUUsQ0FBQ3RNLElBQUksRUFBRSxDQUFDM0gsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzNGaVosVUFBVSxHQUFHL1AsS0FBSztVQUNwQjtRQUNGO1FBQ0E7TUFDRixLQUFLLGlCQUFpQjtRQUNwQkEsS0FBSyxHQUFHb00sR0FBRyxDQUFDZ0UsYUFBYSxDQUFDM0IsYUFBYSxDQUFDeEIsUUFBUSxDQUFDO1FBRWpELElBQUlqTixLQUFLLEtBQUssSUFBSSxJQUFJQSxLQUFLLEtBQUt1QyxTQUFTLEVBQUU7VUFDekNrTSxhQUFhLENBQUNDLE9BQU8sR0FBRyxJQUFJO1VBQzVCO1VBQ0EsSUFBTTJCLFdBQVcsR0FBRyxFQUFFO1VBQ3RCNUIsYUFBYSxDQUFDcEIsUUFBUSxDQUFDNVMsT0FBTyxDQUFDLFVBQUM2VixLQUFLLEVBQUs7WUFDeEMsSUFBTUMsYUFBYSxHQUFHekQsV0FBVyxDQUFDMEQsTUFBTSxDQUFDLFVBQUM1USxPQUFPO2NBQUEsT0FBS0EsT0FBTyxDQUFDd0gsSUFBSSxLQUFLa0osS0FBSztZQUFBLEVBQUM7WUFDN0U7WUFDQUQsV0FBVyxDQUFDakYsSUFBSSxPQUFoQmlGLFdBQVcscUJBQVNFLGFBQWEsRUFBQztVQUNwQyxDQUFDLENBQUM7VUFDRjtVQUNBLElBQU1FLFFBQVEsR0FBRyxJQUFJQyxnQkFBZ0I7WUFBQSx1RUFBQyxrQkFBZXJLLFlBQVk7Y0FBQTtjQUFBO2dCQUFBO2tCQUFBO29CQUFBO3NCQUFBLEtBRTNERCxhQUFhLENBQUNDLFlBQVksQ0FBQzt3QkFBQTt3QkFBQTtzQkFBQTtzQkFBQTtvQkFBQTtzQkFDL0JnSyxXQUFXLENBQUM1VixPQUFPLENBQUMsVUFBQ21GLE9BQU8sRUFBSzt3QkFDL0JBLE9BQU8sQ0FBQzhPLE9BQU8sR0FBRyxLQUFLO3dCQUN2QkUseUJBQXlCLENBQUNoUCxPQUFPLENBQUN3SCxJQUFJLENBQUM7c0JBQ3pDLENBQUMsQ0FBQztzQkFDSXVKLGNBQWMsR0FBR3pCLHFCQUFxQixJQUFJSCxtQkFBbUI7c0JBQ25FRSxxQkFBcUIsR0FBR0QscUJBQXFCO3NCQUM3Q0UscUJBQXFCLEdBQUcsQ0FBQztzQkFDekIsSUFBSXlCLGNBQWMsRUFBRTt3QkFDbEI1VixzQkFBTSxDQUFDUixHQUFHLENBQUMscURBQXFELEVBQUVrVSxhQUFhLENBQUNySCxJQUFJLENBQUM7d0JBQ3JGaUksWUFBWSxFQUFFO3NCQUNoQjtvQkFBQztvQkFBQTtzQkFBQTtrQkFBQTtnQkFBQTtjQUFBO1lBQUEsQ0FDRjtZQUFBO2NBQUE7WUFBQTtVQUFBLElBQUM7VUFDRm9CLFFBQVEsQ0FBQ0csT0FBTyxDQUFDNVEsS0FBSyxFQUFFO1lBQUM2USxPQUFPLEVBQUUsSUFBSTtZQUFFQyxTQUFTLEVBQUU7VUFBSSxDQUFDLENBQUM7UUFDM0Q7UUFDQTtNQUNGLEtBQUssbUJBQW1CO1FBQ3RCOVEsS0FBSyxHQUFHb00sR0FBRyxDQUFDZ0UsYUFBYSxDQUFDM0IsYUFBYSxDQUFDeEIsUUFBUSxDQUFDO1FBQ2pELElBQUlqTixLQUFLLEtBQUssSUFBSSxJQUFJQSxLQUFLLEtBQUt1QyxTQUFTLElBQUl2QyxLQUFLLENBQUMrUSxTQUFTLElBQUkvUSxLQUFLLENBQUMrUSxTQUFTLENBQUN0UyxJQUFJLEVBQUUsQ0FBQzNILE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDakdpWixVQUFVLEdBQUcvUCxLQUFLLENBQUMrUSxTQUFTO1FBQzlCO1FBQ0E7TUFDRixLQUFLLHlCQUF5QjtRQUM1QjtVQUNFLElBQU1DLGVBQWUsR0FBRyxFQUFFO1VBQzFCaFIsS0FBSyxHQUFHb00sR0FBRyxDQUFDNkUsZ0JBQWdCLENBQUN4QyxhQUFhLENBQUN4QixRQUFRLENBQUM7VUFDcEQsSUFBSWpOLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBS3VDLFNBQVMsSUFBSXZDLEtBQUssQ0FBQ2xKLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFBTSwyREFDOUNrSixLQUFLO1lBQUE7VUFBQTtZQUE5Qix1REFBZ0M7Y0FBQSxJQUFyQmtSLFVBQVU7Y0FDbkIsSUFBTUMsV0FBVyxHQUFHRCxVQUFVLENBQUNFLFlBQVksQ0FBQzNDLGFBQWEsQ0FBQ3pPLEtBQUssQ0FBQztjQUNoRSxJQUFJbVIsV0FBVyxFQUFFO2dCQUNmSCxlQUFlLENBQUM1RixJQUFJLENBQUMrRixXQUFXLENBQUM7Y0FDbkM7WUFDRjtVQUFDO1lBQUE7VUFBQTtZQUFBO1VBQUE7VUFFRCxJQUFJSCxlQUFlLENBQUNsYSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlCaVosVUFBVSxHQUFHaUIsZUFBZTtVQUM5QjtRQUNGO1FBQ0E7TUFDRixLQUFLLHNCQUFzQjtRQUN6QmhSLEtBQUssR0FBR29NLEdBQUcsQ0FBQ2dFLGFBQWEsQ0FBQzNCLGFBQWEsQ0FBQ3hCLFFBQVEsQ0FBQztRQUNqRCxJQUFJak4sS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLdUMsU0FBUyxFQUFFO1VBQ3pDLElBQU04TyxRQUFRLEdBQUdyUixLQUFLLENBQUMrUSxTQUFTLENBQUN0UyxJQUFJLEVBQUUsQ0FBQzNILE1BQU0sR0FBRyxDQUFDO1VBQ2xEaVosVUFBVSxHQUFHc0IsUUFBUSxDQUFDdEcsUUFBUSxFQUFFO1FBQ2xDO1FBQ0E7TUFDRixLQUFLLG1CQUFtQjtRQUN0Qi9LLEtBQUssR0FBR29NLEdBQUcsQ0FBQzZFLGdCQUFnQixDQUFDeEMsYUFBYSxDQUFDeEIsUUFBUSxDQUFDO1FBQ3BELElBQUlqTixLQUFLLEtBQUssSUFBSSxJQUFJQSxLQUFLLEtBQUt1QyxTQUFTLEVBQUU7VUFDekN3TixVQUFVLEdBQUcvUCxLQUFLLENBQUNsSixNQUFNO1FBQzNCO1FBQ0E7TUFDRixLQUFLLDZCQUE2QjtRQUNoQ2tKLEtBQUssR0FBR29NLEdBQUcsQ0FBQ2dFLGFBQWEsQ0FBQzNCLGFBQWEsQ0FBQ3hCLFFBQVEsQ0FBQztRQUNqRCxJQUFJak4sS0FBSyxJQUFJQSxLQUFLLENBQUMrUSxTQUFTLElBQUkvUSxLQUFLLENBQUMrUSxTQUFTLENBQUN0UyxJQUFJLEVBQUUsQ0FBQzNILE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDakVpWixVQUFVLEdBQUd0QixhQUFhLENBQUN6TyxLQUFLO1FBQ2xDO1FBQ0E7TUFDRixLQUFLLHlCQUF5QjtRQUM1QjtVQUNFQSxLQUFLLEdBQUdvTSxHQUFHLENBQUM2RSxnQkFBZ0IsQ0FBQ3hDLGFBQWEsQ0FBQ3hCLFFBQVEsQ0FBQztVQUNwRCxJQUFJak4sS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLdUMsU0FBUyxJQUFJdkMsS0FBSyxDQUFDbEosTUFBTSxLQUFLLENBQUMsRUFBRTtVQUNqRSxJQUFJd2EsUUFBUSxHQUFHLENBQUM7VUFBQywyREFDR3RSLEtBQUs7WUFBQTtVQUFBO1lBQXpCLHVEQUEyQjtjQUFBLElBQWhCc1EsS0FBSztjQUNkLElBQU1pQixTQUFTLEdBQUdqQixLQUFLLENBQUNTLFNBQVMsQ0FBQ3RTLElBQUksRUFBRSxDQUFDL0gsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Y0FDM0QsSUFBSTZhLFNBQVMsQ0FBQ3phLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCd2EsUUFBUSxJQUFFNU8sUUFBUSxDQUFDNk8sU0FBUyxDQUFDO2NBQy9CO1lBQ0Y7VUFBQztZQUFBO1VBQUE7WUFBQTtVQUFBO1VBQ0QsSUFBSUQsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNoQnZCLFVBQVUsR0FBR3VCLFFBQVE7VUFDdkI7UUFDRjtRQUNBO01BQ0YsS0FBSyx3QkFBd0I7UUFDM0I7VUFDRXRSLEtBQUssR0FBR29NLEdBQUcsQ0FBQzZFLGdCQUFnQixDQUFDeEMsYUFBYSxDQUFDeEIsUUFBUSxDQUFDO1VBQ3BELElBQUlqTixLQUFLLEtBQUssSUFBSSxJQUFJQSxLQUFLLEtBQUt1QyxTQUFTLElBQUl2QyxLQUFLLENBQUNsSixNQUFNLEtBQUssQ0FBQyxFQUFFO1VBQ2pFLElBQU0wYSxjQUFjLEdBQUcsRUFBRTtVQUFDLDJEQUNOeFIsS0FBSztZQUFBO1VBQUE7WUFBekIsdURBQTJCO2NBQUEsSUFBaEJzUSxNQUFLO2NBQ2QsSUFBTWlCLFVBQVMsR0FBR2pCLE1BQUssQ0FBQ1MsU0FBUyxDQUFDdFMsSUFBSSxFQUFFO2NBQ3hDLElBQUk4UyxVQUFTLENBQUN6YSxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QjBhLGNBQWMsQ0FBQ3BHLElBQUksQ0FBQ21HLFVBQVMsQ0FBQztjQUNoQztZQUNGO1VBQUM7WUFBQTtVQUFBO1lBQUE7VUFBQTtVQUNELElBQUlDLGNBQWMsQ0FBQzFhLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0JpWixVQUFVLEdBQUd5QixjQUFjO1VBQzdCO1FBQ0Y7UUFDQTtNQUNGO1FBQ0V4UixLQUFLLEdBQUd3TyxPQUFPLENBQUNwQyxHQUFHLEVBQUVxQyxhQUFhLENBQUN4QixRQUFRLENBQUM7UUFDNUMsSUFBSWpOLEtBQUssS0FBSyxJQUFJLElBQUlBLEtBQUssS0FBS3VDLFNBQVMsS0FBS2dFLEtBQUssQ0FBQzRILE9BQU8sQ0FBQ25PLEtBQUssQ0FBQyxHQUFHQSxLQUFLLENBQUNsSixNQUFNLEdBQUcsQ0FBQyxHQUFHa0osS0FBSyxDQUFDK0ssUUFBUSxFQUFFLENBQUN0TSxJQUFJLEVBQUUsQ0FBQzNILE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtVQUMzSGlaLFVBQVUsR0FBRy9QLEtBQUs7UUFDcEI7UUFDQTtJQUFNLENBQ1QsQ0FBQzs7SUFFRixJQUFJK1AsVUFBVSxLQUFLeE4sU0FBUyxJQUFJd04sVUFBVSxLQUFLLElBQUksRUFBRTtNQUNuRCxJQUFJdEIsYUFBYSxDQUFDdkIsU0FBUyxFQUFFO1FBQzNCNkMsVUFBVSxHQUFHSCxnQkFBZ0IsQ0FBQ0csVUFBVSxFQUFFdEIsYUFBYSxDQUFDdkIsU0FBUyxDQUFDO01BQ3BFO01BQ0FwUyxvQkFBb0IsQ0FBQzJULGFBQWEsQ0FBQ3JILElBQUksRUFBRTJJLFVBQVUsQ0FBQztNQUNwRHRCLGFBQWEsQ0FBQ0MsT0FBTyxHQUFHLElBQUk7O01BRTVCO01BQ0EsSUFBSUQsYUFBYSxDQUFDdEIsU0FBUyxJQUFJNUcsS0FBSyxDQUFDNEgsT0FBTyxDQUFDTSxhQUFhLENBQUN0QixTQUFTLENBQUMsSUFBSXNCLGFBQWEsQ0FBQ3RCLFNBQVMsQ0FBQ3JXLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFBQSwyREFDNUVnVyxXQUFXO1VBQUE7UUFBQTtVQUExQyx1REFBNEM7WUFBQSxJQUFqQzJFLGdCQUFnQjtZQUN6QixJQUFJaEQsYUFBYSxDQUFDdEIsU0FBUyxDQUFDM1YsUUFBUSxDQUFDaWEsZ0JBQWdCLENBQUNySyxJQUFJLENBQUMsRUFBRTtjQUMzRHFLLGdCQUFnQixDQUFDL0MsT0FBTyxHQUFHLElBQUk7WUFDakM7VUFDRjtRQUFDO1VBQUE7UUFBQTtVQUFBO1FBQUE7TUFDSDtJQUNGO0lBQ0EsSUFBSUQsYUFBYSxDQUFDQyxPQUFPLEVBQUU7TUFDekIsT0FBTyxJQUFJO0lBQ2I7RUFDRixDQUFDLENBQUMsT0FBT3ZLLENBQUMsRUFBRTtJQUNWcEosc0JBQU0sQ0FBQ0YsS0FBSyxDQUFDLG1CQUFtQixHQUFHc0osQ0FBQyxDQUFDO0VBQ3ZDO0VBQ0EsT0FBTyxLQUFLO0FBQ2QsQ0FBQztBQUVELElBQU11TixxQkFBcUI7RUFBQSx1RUFBRztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUFBLE9BQ0V0RCxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7VUFBQTtZQUExRXVELGVBQWU7WUFBQTtZQUFBO1lBQUEsT0FJa0UzTixPQUFPLENBQUM0TixHQUFHLENBQUMsQ0FDL0Z4RCxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsRUFDdENBLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLEVBQzdDQSxzQkFBc0IsQ0FBQywwQkFBMEIsQ0FBQyxFQUNsREEsc0JBQXNCLENBQUMsYUFBYSxDQUFDLEVBQ3JDQSxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUMxQyxDQUFDO1VBQUE7WUFBQTtZQUFBO1lBTkt5RCxXQUFXO1lBQUVDLGNBQWM7WUFBRUMsbUJBQW1CO1lBQUVDLE1BQU07WUFBRUMsVUFBVTtZQVF2RUMsVUFBVSxHQUFHLENBQUM7WUFFbEIsSUFBSSxDQUFDSixjQUFjLElBQUlFLE1BQU0sSUFBSXpMLEtBQUssQ0FBQzRILE9BQU8sQ0FBQzZELE1BQU0sQ0FBQyxJQUFJQSxNQUFNLENBQUNsYixNQUFNLEdBQUcsQ0FBQyxJQUFJbWIsVUFBVSxJQUFJMUwsS0FBSyxDQUFDNEgsT0FBTyxDQUFDOEQsVUFBVSxDQUFDLElBQUlBLFVBQVUsQ0FBQ25iLE1BQU0sR0FBRyxDQUFDLElBQUlrYixNQUFNLENBQUNsYixNQUFNLEtBQUttYixVQUFVLENBQUNuYixNQUFNLEVBQUU7Y0FDdEwsS0FBUzZJLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3FTLE1BQU0sQ0FBQ2xiLE1BQU0sRUFBRTZJLENBQUMsRUFBRSxFQUFFO2dCQUN0Q3VTLFVBQVUsSUFBSXhQLFFBQVEsQ0FBQ3NQLE1BQU0sQ0FBQ3JTLENBQUMsQ0FBQyxDQUFDLEdBQUcrQyxRQUFRLENBQUN1UCxVQUFVLENBQUN0UyxDQUFDLENBQUMsQ0FBQztjQUM3RDtZQUNGLENBQUMsTUFBTTtjQUNMdVMsVUFBVSxHQUFHeFAsUUFBUSxDQUFDb1AsY0FBYyxDQUFDO1lBQ3ZDO1lBRUlLLHNCQUFzQixHQUFHLENBQUM7WUFDOUIsSUFBSSxDQUFDTixXQUFXLElBQUlLLFVBQVUsSUFBSUgsbUJBQW1CLEVBQUU7Y0FDckRJLHNCQUFzQixHQUFHRCxVQUFVLEdBQUd4UCxRQUFRLENBQUNxUCxtQkFBbUIsQ0FBQztZQUNyRSxDQUFDLE1BQU0sSUFBSSxDQUFDRixXQUFXLElBQUlLLFVBQVUsRUFBRTtjQUNyQ0Msc0JBQXNCLEdBQUd6UCxRQUFRLENBQUN3UCxVQUFVLENBQUM7WUFDL0MsQ0FBQyxNQUFNO2NBQ0xDLHNCQUFzQixHQUFHLENBQUM7WUFDNUI7WUFDQXJYLG9CQUFvQixDQUFDLDZCQUE2QixFQUFFcVgsc0JBQXNCLENBQUM7WUFFM0UsSUFBSU4sV0FBVyxFQUFFO2NBQ2YvVyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7Y0FDMUNBLG9CQUFvQixDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztZQUNyRDtZQUFDO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFFREMsc0JBQU0sQ0FBQ0YsS0FBSyxDQUFDLDhEQUE4RCxlQUFJLENBQUM7VUFBQztZQUFBLE1BSS9FOFcsZUFBZSxLQUFLLGFBQWE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUFBLE9BQ2pCdkQsc0JBQXNCLENBQUMsU0FBUyxDQUFDO1VBQUE7WUFBN0NnRSxHQUFHO1lBQUEsTUFDTEEsR0FBRyxLQUFHLElBQUksSUFBSUEsR0FBRyxLQUFHN1AsU0FBUztjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDekJ6SCxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDc1gsR0FBRyxDQUFDLENBQUM7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBLE1BRW5EVCxlQUFlLEtBQUssUUFBUTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDZnZELHNCQUFzQixDQUFDLFdBQVcsQ0FBQztVQUFBO1lBQW5EaUUsT0FBTztZQUFBLE1BQ1RBLE9BQU8sS0FBRyxJQUFJLElBQUk5TCxLQUFLLENBQUM0SCxPQUFPLENBQUNrRSxPQUFPLENBQUMsSUFBSUEsT0FBTyxDQUFDdmIsTUFBTTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDdERnRSxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRXVYLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBR2pFO0VBQUEsZ0JBckRLWCxxQkFBcUI7SUFBQTtFQUFBO0FBQUEsR0FxRDFCO0FBRUQsSUFBTVksZ0JBQWdCO0VBQUEsdUVBQUc7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ2pCQyxTQUFTLEdBQUdwWCxRQUFRLENBQUNxWCxVQUFVLEVBQ3JDO1lBQ0F6WCxzQkFBTSxDQUFDUixHQUFHLENBQUMsaURBQWlELEdBQUdnWSxTQUFTLENBQUM7WUFFbkVFLE1BQU0sR0FBR3BiLE1BQU0sQ0FBQzZELEdBQUc7WUFDbkJ3WCxTQUFTLEdBQUdELE1BQU0sQ0FBQ0MsU0FBUztZQUM1QkMsTUFBTSxHQUFHRixNQUFNLENBQUN0WCxRQUFRO1lBR3hCeVgsVUFBVSxHQUFHLElBQUlDLEdBQUcsRUFBRTtZQUN0QkMsY0FBYyxHQUFHLElBQUlELEdBQUcsRUFBRTtZQUMxQkUsYUFBYSxHQUFHLElBQUlGLEdBQUcsRUFBRSxFQUUvQjtZQUFBO1lBQUEsT0FDNEJ6RSxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7VUFBQTtZQUExRHVELGVBQWU7WUFFbkIsSUFBSUEsZUFBZSxFQUFFO2NBQ25CbUIsY0FBYyxDQUFDalgsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNoQzs7WUFFQTtZQUFBLHVEQUM0QmlSLFdBQVc7WUFBQTtjQUF2Qyx1REFBeUM7Z0JBQTlCMkIsYUFBYTtnQkFDdEIsSUFBSUEsYUFBYSxDQUFDQyxPQUFPLEVBQUU7a0JBQ3pCb0UsY0FBYyxDQUFDalgsR0FBRyxDQUFDNFMsYUFBYSxDQUFDckgsSUFBSSxDQUFDO2dCQUN4QztjQUNGO1lBQUM7Y0FBQTtZQUFBO2NBQUE7WUFBQTtZQUFBLHdEQUUyQjBGLFdBQVc7WUFBQTtZQUFBO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUE1QjJCLGNBQWE7WUFBQSxNQUNsQkEsY0FBYSxDQUFDQyxPQUFPLElBQUlELGNBQWEsQ0FBQ0UsUUFBUTtjQUFBO2NBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQSxNQUkvQ2lFLFVBQVUsQ0FBQ3hJLEdBQUcsQ0FBQ3FFLGNBQWEsQ0FBQ3JILElBQUksQ0FBQyxJQUFJMEwsY0FBYyxDQUFDMUksR0FBRyxDQUFDcUUsY0FBYSxDQUFDckgsSUFBSSxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQzlFO1lBQ0FxSCxjQUFhLENBQUNDLE9BQU8sR0FBRyxJQUFJO1lBQUM7VUFBQTtZQUFBLE1BSTNCRCxjQUFhLENBQUMxQixjQUFjLEtBQUssR0FBRztjQUFBO2NBQUE7WUFBQTtZQUFBLElBQ2pDNEUsZUFBZTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDTXZELHNCQUFzQixDQUFDLFVBQVUsQ0FBQztVQUFBO1lBQTFEdUQsZUFBZTtZQUFBLElBQ1ZBLGVBQWU7Y0FBQTtjQUFBO1lBQUE7WUFDbEJvQixhQUFhLENBQUNsWCxHQUFHLENBQUM0UyxjQUFhLENBQUNySCxJQUFJLENBQUM7WUFBQztVQUFBO1lBQUEsTUFLdENxSCxjQUFhLENBQUMxQixjQUFjLENBQUNuVyxPQUFPLENBQUMrYSxlQUFlLENBQUMsR0FBRyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQzNEO1lBQ0FsRCxjQUFhLENBQUNFLFFBQVEsR0FBRyxJQUFJO1lBQUM7VUFBQTtZQUtsQyxJQUFJRixjQUFhLENBQUN6QixNQUFNLEtBQUssVUFBVSxFQUFFO2NBQUU7Y0FDekNnRyxZQUFZLENBQUNQLE1BQU0sRUFBRWhFLGNBQWEsRUFBRW1FLFVBQVUsRUFBRUcsYUFBYSxDQUFDO1lBQ2hFLENBQUMsTUFBTSxJQUFJdEUsY0FBYSxDQUFDekIsTUFBTSxLQUFLLGFBQWEsRUFBRTtjQUFFO2NBQUEsd0RBQ3ZCMEYsU0FBUztjQUFBO2dCQUFyQywwREFBdUM7a0JBQTVCTyxhQUFhO2tCQUN0QkQsWUFBWSxDQUFDQyxhQUFhLEVBQUV4RSxjQUFhLEVBQUVtRSxVQUFVLEVBQUVHLGFBQWEsQ0FBQztnQkFDdkU7Y0FBQztnQkFBQTtjQUFBO2dCQUFBO2NBQUE7WUFDSCxDQUFDLE1BQU0sSUFBSXRFLGNBQWEsQ0FBQ3pCLE1BQU0sS0FBSyxTQUFTLEVBQUU7Y0FBRTtjQUMvQyxJQUFJLENBQUNrRyxjQUFjLEVBQUU7Z0JBQ25CQSxjQUFjLEdBQUdDLFlBQVksRUFBRTtjQUNqQztjQUFDLHdEQUNzQkQsY0FBYztjQUFBO2dCQUFyQywwREFBdUM7a0JBQTVCRSxRQUFRO2tCQUNqQkosWUFBWSxDQUFDSSxRQUFRLEVBQUUzRSxjQUFhLEVBQUVtRSxVQUFVLEVBQUVHLGFBQWEsQ0FBQztnQkFDbEU7Y0FBQztnQkFBQTtjQUFBO2dCQUFBO2NBQUE7WUFDSCxDQUFDLE1BQU0sSUFBSXRFLGNBQWEsQ0FBQ3pCLE1BQU0sS0FBSyxVQUFVLEVBQUU7Y0FBRTtjQUNoRGdHLFlBQVksQ0FBQ0wsTUFBTSxFQUFFbEUsY0FBYSxFQUFFbUUsVUFBVSxFQUFFRyxhQUFhLENBQUM7WUFDaEUsQ0FBQyxDQUFDO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBR0osSUFBSUEsYUFBYSxDQUFDN0gsSUFBSSxLQUFLLENBQUMsRUFBRTtjQUM1QmdFLHFCQUFxQixHQUFHSCxtQkFBbUI7Y0FDM0NoVSxzQkFBTSxDQUFDUixHQUFHLENBQUMsNERBQTRELENBQUM7WUFDMUUsQ0FBQyxNQUFNLElBQUlxWSxVQUFVLENBQUMxSCxJQUFJLEtBQUssQ0FBQyxFQUFFO2NBQ2hDO2NBQ0EsSUFBSXFILFNBQVMsS0FBSyxVQUFVLElBQUlBLFNBQVMsS0FBSyxhQUFhLEVBQUU7Z0JBQzNEdEQscUJBQXFCLElBQUksQ0FBQztnQkFDMUJDLHFCQUFxQixJQUFJLENBQUM7Y0FDNUI7Y0FFQW5VLHNCQUFNLENBQUNSLEdBQUcsQ0FBQywyRUFBMkUsR0FDcEYwVSxxQkFBcUIsR0FBRyxPQUFPLEdBQy9CQyxxQkFBcUIsR0FBRyxrQkFBa0IsR0FDMUMzSSxLQUFLLENBQUNDLElBQUksQ0FBQ3VNLGFBQWEsQ0FBQyxDQUFDTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUM1QztZQUNILENBQUMsTUFBTTtjQUNMdFksc0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLHlDQUF5QyxHQUNsRGdNLEtBQUssQ0FBQ0MsSUFBSSxDQUFDdU0sYUFBYSxDQUFDLENBQUNNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxjQUFjLEdBQ3REVCxVQUFVLENBQUMxSCxJQUFJLENBQ2hCO1lBQ0g7VUFBQztVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNGO0VBQUEsZ0JBOUZLb0gsZ0JBQWdCO0lBQUE7RUFBQTtBQUFBLEdBOEZyQjtBQUVELElBQU1VLFlBQVksR0FBRyxTQUFmQSxZQUFZLENBQUk1RyxHQUFHLEVBQUVxQyxhQUFhLEVBQUVtRSxVQUFVLEVBQUVHLGFBQWEsRUFBSztFQUN0RSxJQUFJakQsU0FBUyxDQUFDMUQsR0FBRyxFQUFFcUMsYUFBYSxDQUFDLEVBQUU7SUFDakNtRSxVQUFVLENBQUMvVyxHQUFHLENBQUM0UyxhQUFhLENBQUNySCxJQUFJLENBQUM7RUFDcEMsQ0FBQyxNQUFNO0lBQ0wyTCxhQUFhLENBQUNsWCxHQUFHLENBQUM0UyxhQUFhLENBQUNySCxJQUFJLENBQUM7RUFDdkM7QUFDRixDQUFDOztBQUVEO0FBQ0EsSUFBTWlJLFlBQVk7RUFBQSx1RUFBRztJQUFBO01BQUE7UUFBQTtVQUFBO1lBQUE7WUFBQSxPQUNiaUQsZ0JBQWdCLEVBQUU7VUFBQTtZQUFBLE1BQ3BCcEQscUJBQXFCLEdBQUdILG1CQUFtQjtjQUFBO2NBQUE7WUFBQTtZQUM3Q2hVLHNCQUFNLENBQUNSLEdBQUcsQ0FBQyxnREFBZ0QsR0FBRzBVLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUMzRjlSLFVBQVUsMEVBQUM7Y0FBQTtnQkFBQTtrQkFBQTtvQkFBQTtzQkFBQTtzQkFBQSxPQUNIa1MsWUFBWSxFQUFFO29CQUFBO29CQUFBO3NCQUFBO2tCQUFBO2dCQUFBO2NBQUE7WUFBQSxDQUNyQixJQUFFSixxQkFBcUIsQ0FBQztZQUFDO1lBQUE7VUFBQTtZQUUxQmxVLHNCQUFNLENBQUNSLEdBQUcsQ0FBQyx3RUFBd0UsQ0FBQztZQUFDO1lBQUEsT0FDL0VtWCxxQkFBcUIsRUFBRTtVQUFBO1lBQUE7WUFBQSxPQUN2Qm5DLCtCQUErQixFQUFFO1VBQUE7WUFDdkN6VSxvQkFBb0IsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUM7VUFBQztVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUVyRDtFQUFBLGdCQWJLdVUsWUFBWTtJQUFBO0VBQUE7QUFBQSxHQWFqQjs7QUFFRDtBQUNBO0FBQ0EsSUFBTWIsT0FBTyxHQUFHLFNBQVZBLE9BQU8sQ0FBSXBDLEdBQUcsRUFBRWtILElBQUksRUFBSztFQUM3QixJQUFJLENBQUNsSCxHQUFHLEVBQUUsT0FBTyxJQUFJO0VBQ3JCLElBQUksQ0FBQ2tILElBQUksRUFBRSxPQUFPLElBQUk7RUFFdEIsSUFBSTtJQUNGLElBQU1DLFNBQVMsR0FBR0QsSUFBSSxDQUFDblYsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNqQyxJQUFJZ0YsT0FBTyxHQUFHaUosR0FBRztJQUNqQixLQUFLLElBQUl6TSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc0VCxTQUFTLENBQUN6YyxNQUFNLEVBQUU2SSxDQUFDLEVBQUUsRUFBRTtNQUN6QyxJQUFJd0QsT0FBTyxLQUFLLElBQUksRUFBRSxPQUFPLElBQUk7TUFDakMsSUFBSW9RLFNBQVMsQ0FBQzVULENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUN4QixJQUFNNlQsT0FBTyxHQUFHRCxTQUFTLENBQUNFLEtBQUssQ0FBQzlULENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzBULElBQUksQ0FBQyxHQUFHLENBQUM7UUFDaEQsSUFBTUssUUFBUSxHQUFHLEVBQUU7UUFDbkIsS0FBSyxJQUFNQyxNQUFNLElBQUl4USxPQUFPLEVBQUU7VUFDNUIsSUFBSUEsT0FBTyxDQUFDd1EsTUFBTSxDQUFDLEtBQUtwUixTQUFTLElBQUlZLE9BQU8sQ0FBQ3dRLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM3RCxJQUFNQyxRQUFRLEdBQUdwRixPQUFPLENBQUNyTCxPQUFPLENBQUN3USxNQUFNLENBQUMsRUFBRUgsT0FBTyxDQUFDO1lBQ2xELElBQUlJLFFBQVEsS0FBSyxJQUFJLElBQUlBLFFBQVEsS0FBS3JSLFNBQVMsRUFBRTtjQUMvQ21SLFFBQVEsQ0FBQ3RJLElBQUksQ0FBQ3dJLFFBQVEsQ0FBQztZQUN6QjtVQUNGO1FBQ0Y7UUFDQSxPQUFPRixRQUFRO01BQ2pCO01BQ0F2USxPQUFPLEdBQUdBLE9BQU8sQ0FBQ29RLFNBQVMsQ0FBQzVULENBQUMsQ0FBQyxDQUFDO0lBQ2pDO0lBQ0EsT0FBT3dELE9BQU87RUFDaEIsQ0FBQyxDQUFDLE9BQU9nQixDQUFDLEVBQUU7SUFDVixPQUFPLElBQUk7RUFDYjtBQUNGLENBQUM7QUFFRCxJQUFNaUwsZUFBZTtFQUFBLHVFQUFHO0lBQUE7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ2hCeUUsU0FBUyxHQUFHeGMsTUFBTSxDQUFDNkQsR0FBRztZQUN0QjRZLE1BQU0sR0FBR0QsU0FBUyxDQUFDMU4sU0FBUztZQUU1QjROLFFBQVEsR0FBRyx5QkFBQUYsU0FBUyxDQUFDMU4sU0FBUyxrRkFBbkIscUJBQXFCNk4sYUFBYSwwREFBbEMsc0JBQW9DRCxRQUFRLCtCQUMzREYsU0FBUyxDQUFDMU4sU0FBUywwREFBbkIsc0JBQXFCNE4sUUFBUSwrQkFDN0JGLFNBQVMsQ0FBQzFOLFNBQVMsMERBQW5CLHNCQUFxQkQsU0FBUztZQUVoQ3BMLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFaVosUUFBUSxDQUFDOztZQUVwRDtZQUNBalosb0JBQW9CLENBQUMscUJBQXFCLEVBQUUrWSxTQUFTLENBQUNJLGdCQUFnQixDQUFDO1lBRWpFQyxXQUFXLEdBQUcsc0JBQUFMLFNBQVMsQ0FBQ00sTUFBTSxzREFBaEIsa0JBQWtCQyxVQUFVLElBQUcsR0FBRywwQkFBR1AsU0FBUyxDQUFDTSxNQUFNLHVEQUFoQixtQkFBa0JFLFdBQVc7WUFDdEZ2WixvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRW9aLFdBQVcsQ0FBQztZQUVqREksV0FBVyxHQUFHLHVCQUFBVCxTQUFTLENBQUNNLE1BQU0sdURBQWhCLG1CQUFrQkksVUFBVSxJQUFHLEdBQUcsMEJBQUdWLFNBQVMsQ0FBQ00sTUFBTSx1REFBaEIsbUJBQWtCSyxVQUFVO1lBQ3JGMVosb0JBQW9CLENBQUMsb0JBQW9CLEVBQUV3WixXQUFXLENBQUM7WUFFakRHLFVBQVUsR0FBRywwQkFBQVosU0FBUyxDQUFDYSxjQUFjLDBEQUF4QixzQkFBMEJDLEtBQUssSUFBRyxHQUFHLDhCQUFHZCxTQUFTLENBQUNhLGNBQWMsMkRBQXhCLHVCQUEwQkUsTUFBTTtZQUMzRjlaLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFMlosVUFBVSxDQUFDO1lBRXRELElBQUlOLE1BQU0sQ0FBQ1EsS0FBSyxFQUFFO2NBQ1pBLEtBQUssR0FBR2pTLFFBQVEsQ0FBQ3lSLE1BQU0sQ0FBQ1EsS0FBSyxDQUFDO2NBQzlCQyxNQUFNLEdBQUlULE1BQU0sQ0FBQ1MsTUFBTSxHQUFJbFMsUUFBUSxDQUFDeVIsTUFBTSxDQUFDUyxNQUFNLENBQUMsR0FBRyxDQUFDO2NBQzFELElBQUlELEtBQUssS0FBSyxDQUFDLElBQUlDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCQyxHQUFHLEdBQUcsa0JBQWtCLENBQUNoUyxJQUFJLENBQUNrUixRQUFRLENBQUM7Z0JBQzdDLElBQUljLEdBQUcsSUFBSWhCLFNBQVMsQ0FBQ0ksZ0JBQWdCLEVBQUU7a0JBQ3JDO2tCQUNBVSxLQUFLLEdBQUdsVCxJQUFJLENBQUNnSSxLQUFLLENBQUNrTCxLQUFLLEdBQUdkLFNBQVMsQ0FBQ0ksZ0JBQWdCLENBQUM7a0JBQ3REVyxNQUFNLEdBQUduVCxJQUFJLENBQUNnSSxLQUFLLENBQUNtTCxNQUFNLEdBQUdmLFNBQVMsQ0FBQ0ksZ0JBQWdCLENBQUM7Z0JBQzFELENBQUMsTUFBTTtrQkFDQ2EsZ0JBQWdCLHlCQUFHakIsU0FBUyxDQUFDTSxNQUFNLGdGQUFoQixtQkFBa0JZLFdBQVcsMERBQTdCLHNCQUErQkMsS0FBSztrQkFDN0QsSUFBSXZULElBQUksQ0FBQ2tDLEdBQUcsQ0FBQ21SLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJclQsSUFBSSxDQUFDa0MsR0FBRyxDQUFDbVIsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQzNFO29CQUNNRyxJQUFJLEdBQUdOLEtBQUs7b0JBQ2xCQSxLQUFLLEdBQUdDLE1BQU07b0JBQ2RBLE1BQU0sR0FBR0ssSUFBSTtrQkFDZjtnQkFDRjtnQkFDQW5hLG9CQUFvQixDQUFDLGVBQWUsRUFBRTZaLEtBQUssR0FBRyxHQUFHLEdBQUdDLE1BQU0sQ0FBQztjQUM3RDtZQUNGOztZQUVBO1lBQ0E5WixvQkFBb0IsQ0FBQyxvQkFBb0Isd0JBQUUrWSxTQUFTLENBQUNxQixPQUFPLHVEQUFqQixtQkFBbUJwZSxNQUFNLENBQUM7O1lBRXJFO1lBQ0EsSUFBSSxDQUFDZ2QsTUFBTSxDQUFDNU4sU0FBUyxFQUFFO2NBQ3JCLElBQUk0TixNQUFNLENBQUNFLGFBQWEsRUFBRTtnQkFDeEI7Z0JBQ0ltQixRQUFRLEdBQUdyQixNQUFNLGFBQU5BLE1BQU0sZ0RBQU5BLE1BQU0sQ0FBRUUsYUFBYSxvRkFBckIsc0JBQXVCb0IsTUFBTSwyREFBN0IsdUJBQStCaFgsR0FBRyxDQUFDLFVBQVMrRixDQUFDLEVBQUU7a0JBQzVELE9BQU9BLENBQUMsQ0FBQ2tSLEtBQUssR0FBRyxHQUFHLEdBQUdsUixDQUFDLENBQUM4QyxPQUFPO2dCQUNsQyxDQUFDLENBQUMsQ0FBQ29NLElBQUksRUFBRSxFQUNUO2dCQUNBOEIsUUFBUSxJQUFLckIsTUFBTSxhQUFOQSxNQUFNLHlDQUFOQSxNQUFNLENBQUVFLGFBQWEsbURBQXJCLHVCQUF1QnNCLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBSTtnQkFDMUQ7Z0JBQ0FILFFBQVEsSUFBSXBCLFFBQVE7Z0JBQ3BCalosb0JBQW9CLENBQUMsaUJBQWlCLEVBQUVxYSxRQUFRLENBQUM7Y0FDbkQ7WUFDRixDQUFDLE1BQU07Y0FDTHJhLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFZ1osTUFBTSxDQUFDNU4sU0FBUyxDQUFDO1lBQzNEO1lBRUFwTCxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRWdaLE1BQU0sQ0FBQ3lCLG1CQUFtQixDQUFDO1lBQ3JFemEsb0JBQW9CLENBQUMsb0JBQW9CLEVBQUVnWixNQUFNLENBQUMwQixRQUFRLElBQ3REMUIsTUFBTSxDQUFDMkIsZUFBZSxJQUN0QjNCLE1BQU0sQ0FBQzRCLGNBQWMsSUFDckI1QixNQUFNLENBQUM2QixZQUFZLENBQ3RCO1lBQ0Q3YSxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRWdaLE1BQU0sQ0FBQzhCLGNBQWMsQ0FBQztZQUM5RDlhLG9CQUFvQixDQUFDLGtCQUFrQixFQUFFZ1osTUFBTSxDQUFDK0IsTUFBTSxDQUFDO1lBQ3ZEL2Esb0JBQW9CLENBQUMsc0JBQXNCLDJCQUFFK1ksU0FBUyxDQUFDMU4sU0FBUyxtRkFBbkIsc0JBQXFCMlAsVUFBVSwwREFBL0Isc0JBQWlDQyxRQUFRLENBQUM7O1lBRXZGO1lBQ01DLFVBQVUsR0FBRyxJQUFJQyxHQUFHLENBQUM1ZSxNQUFNLENBQUM2RCxHQUFHLENBQUM1RCxRQUFRLENBQUNDLElBQUksQ0FBQztZQUNwRHVELG9CQUFvQixDQUFDLEdBQUcsRUFBRWtiLFVBQVUsQ0FBQ3plLElBQUksQ0FBQztZQUMxQ3VELG9CQUFvQixDQUFDLEdBQUcsRUFBRWtiLFVBQVUsQ0FBQ0UsUUFBUSxDQUFDO1lBQzlDcGIsb0JBQW9CLENBQUMsV0FBVyxFQUFFZ1osTUFBTSxDQUFDcUMsVUFBVSxJQUFJdEMsU0FBUyxDQUFDc0MsVUFBVSxJQUFJckMsTUFBTSxDQUFDc0MsWUFBWSxDQUFDO1lBRW5HdGIsb0JBQW9CLENBQUMsR0FBRyxFQUFFK1ksU0FBUyxDQUFDMVksUUFBUSxDQUFDa2IsUUFBUSxDQUFDO1lBQ2hEQyxvQkFBb0IsR0FBR3pVLGNBQWMsQ0FBQzFILE9BQU8sQ0FBQ3hCLHFDQUFxQyxDQUFDO1lBQzFGLElBQUksQ0FBQzJkLG9CQUFvQixFQUFFO2NBQ3pCelUsY0FBYyxDQUFDRyxPQUFPLENBQUNySixxQ0FBcUMsRUFBRWtiLFNBQVMsQ0FBQzFZLFFBQVEsQ0FBQ2tiLFFBQVEsQ0FBQztjQUMxRnZiLG9CQUFvQixDQUFDLElBQUksRUFBRStZLFNBQVMsQ0FBQzFZLFFBQVEsQ0FBQ2tiLFFBQVEsQ0FBQztZQUN6RCxDQUFDLE1BQU07Y0FDTHZiLG9CQUFvQixDQUFDLElBQUksRUFBRXdiLG9CQUFvQixDQUFDO1lBQ2xEOztZQUVBOztZQUVBO1lBQ0EsSUFBSU4sVUFBVSxDQUFDOVQsUUFBUSxDQUFDdEwsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Y0FDeEQyZixRQUFRLEdBQUcsV0FBVztZQUN4QixDQUFDLE1BQU0sSUFBSVAsVUFBVSxDQUFDOVQsUUFBUSxDQUFDdEwsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Y0FDbkUyZixRQUFRLEdBQUcsUUFBUTtZQUNyQixDQUFDLE1BQU0sSUFBSVAsVUFBVSxDQUFDOVQsUUFBUSxDQUFDdEwsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Y0FDakUyZixRQUFRLEdBQUcsVUFBVTtZQUN2QixDQUFDLE1BQU0sSUFBSVAsVUFBVSxDQUFDOVQsUUFBUSxDQUFDdEwsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2NBQ3pEMmYsUUFBUSxHQUFHLFNBQVM7WUFDdEIsQ0FBQyxNQUFNLElBQUlQLFVBQVUsQ0FBQzlULFFBQVEsQ0FBQ3RMLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2NBQ2pFMmYsUUFBUSxHQUFHLFNBQVM7WUFDdEIsQ0FBQyxNQUFNLElBQUlQLFVBQVUsQ0FBQzlULFFBQVEsQ0FBQ3RMLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2NBQ2hFMmYsUUFBUSxHQUFHLFlBQVk7WUFDekIsQ0FBQyxNQUFNLElBQUlQLFVBQVUsQ0FBQzlULFFBQVEsQ0FBQ3RMLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2NBQzdEMmYsUUFBUSxHQUFHLFVBQVU7WUFDdkIsQ0FBQyxNQUFNLElBQUlQLFVBQVUsQ0FBQzlULFFBQVEsQ0FBQ3RMLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2NBQzlEMmYsUUFBUSxHQUFHLFFBQVE7WUFDckIsQ0FBQyxNQUFNLElBQUlQLFVBQVUsQ0FBQzlULFFBQVEsQ0FBQ3RMLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2NBQzlEMmYsUUFBUSxHQUFHLGlCQUFpQjtZQUM5QixDQUFDLE1BQU0sSUFBSVAsVUFBVSxDQUFDOVQsUUFBUSxDQUFDdEwsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Y0FDbkUyZixRQUFRLEdBQUcsY0FBYztZQUMzQixDQUFDLE1BQU0sSUFBSVAsVUFBVSxDQUFDOVQsUUFBUSxDQUFDdEwsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Y0FDOUQyZixRQUFRLEdBQUcsbUJBQW1CO1lBQ2hDLENBQUMsTUFBTSxJQUFJUCxVQUFVLENBQUM5VCxRQUFRLENBQUN0TCxPQUFPLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtjQUNyRTJmLFFBQVEsR0FBRyx1QkFBdUI7WUFDcEMsQ0FBQyxNQUFNLElBQUlQLFVBQVUsQ0FBQzlULFFBQVEsQ0FBQ3RMLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2NBQ2xGMmYsUUFBUSxHQUFHLG1CQUFtQjtZQUNoQztZQUVBLElBQUlBLFFBQVEsRUFBRTtjQUNaemIsb0JBQW9CLENBQUMsVUFBVSxFQUFFeWIsUUFBUSxDQUFDO1lBQzVDO1VBQUM7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDRjtFQUFBLGdCQTNIS25ILGVBQWU7SUFBQTtFQUFBO0FBQUEsR0EySHBCO0FBRUQsSUFBTUUsVUFBVSxHQUFHLFNBQWJBLFVBQVUsR0FBYztFQUM1QixJQUFNdUUsU0FBUyxHQUFHeGMsTUFBTSxDQUFDNkQsR0FBRztFQUM1QixJQUFNc2IsV0FBVyxHQUFHLENBQUMsQ0FBQztFQUN0QixJQUFNQyxxQkFBcUIsR0FBRzVDLFNBQVMsQ0FBQzZDLFdBQVcsQ0FBQ0MsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JGLElBQUk5QyxTQUFTLENBQUM2QyxXQUFXLElBQUlELHFCQUFxQixFQUFFO0lBQ2xERCxXQUFXLENBQUNJLE9BQU8sR0FBR25WLElBQUksQ0FBQ2dJLEtBQUssQ0FBQ2dOLHFCQUFxQixDQUFDSSxVQUFVLEdBQUdKLHFCQUFxQixDQUFDSyxZQUFZLENBQUM7SUFDdkdOLFdBQVcsQ0FBQ08sT0FBTyxHQUFHdFYsSUFBSSxDQUFDZ0ksS0FBSyxDQUFDZ04scUJBQXFCLENBQUNPLFdBQVcsR0FBR1AscUJBQXFCLENBQUNRLFlBQVksQ0FBQztJQUN4R1QsV0FBVyxDQUFDVSxHQUFHLEdBQUd6VixJQUFJLENBQUNnSSxLQUFLLENBQUNnTixxQkFBcUIsQ0FBQ1UsY0FBYyxHQUFHVixxQkFBcUIsQ0FBQ1csV0FBVyxDQUFDO0lBQ3RHWixXQUFXLENBQUNhLElBQUksR0FBRzVWLElBQUksQ0FBQ2dJLEtBQUssQ0FBQ2dOLHFCQUFxQixDQUFDYSxZQUFZLEdBQUdiLHFCQUFxQixDQUFDYyxjQUFjLENBQUM7SUFDeEdmLFdBQVcsQ0FBQ2dCLFFBQVEsR0FBRy9WLElBQUksQ0FBQ2dJLEtBQUssQ0FBQ2dOLHFCQUFxQixDQUFDZSxRQUFRLENBQUM7RUFDbkU7RUFDQTFjLG9CQUFvQixDQUFDLFNBQVMsRUFBRTBiLFdBQVcsQ0FBQztBQUM5QyxDQUFDOztBQUVEO0FBQ0EsSUFBTXJELFlBQVksR0FBRyxTQUFmQSxZQUFZLEdBQVM7RUFDekIsSUFBTXNFLGFBQWEsR0FBR3BnQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQzhWLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFDO0VBQzVGLElBQU15RyxTQUFTLEdBQUcsRUFBRTtFQUFDLDREQUVGRCxhQUFhO0lBQUE7RUFBQTtJQUFoQywwREFBa0M7TUFBQSxJQUF2QkUsSUFBSTtNQUNiLElBQUk7UUFDRixJQUFNQyxLQUFLLEdBQUdELElBQUksQ0FBQ2hjLFdBQVc7UUFDOUIsSUFBTWtjLFdBQVcsR0FBR2pYLElBQUksQ0FBQ0MsS0FBSyxDQUFDK1csS0FBSyxDQUFDO1FBQ3JDRixTQUFTLENBQUN0TSxJQUFJLENBQUN5TSxXQUFXLENBQUM7TUFDN0IsQ0FBQyxDQUFDLE9BQU9uUyxHQUFHLEVBQUU7UUFDWjtNQUFBO0lBRUo7RUFBQztJQUFBO0VBQUE7SUFBQTtFQUFBO0VBQ0QsT0FBT2dTLFNBQVM7QUFDbEIsQ0FBQzs7Ozs7OztBQ24zQndDO0FBQ1Y7QUFDMkI7QUFFMUQsSUFBTTNjLG9CQUFNLEdBQUcsSUFBSWpCLFVBQU0sQ0FBQyxlQUFlLENBQUM7QUFDMUMsSUFBTWdlLE9BQU8sR0FBRztFQUNkbmQsSUFBSSxFQUFFO0FBQ1IsQ0FBQztBQUVNLElBQU1vZCxPQUFPO0VBQ2xCLG1CQUFjO0lBQUE7SUFDWmhkLG9CQUFNLENBQUNSLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztJQUVsQyxJQUFJLENBQUN5ZCxpQkFBaUIsR0FBRyxLQUFLO0lBQzlCLElBQUksQ0FBQ0MsY0FBYyxHQUFHLEtBQUs7SUFDM0IsSUFBSSxDQUFDQyxjQUFjLEdBQUcsS0FBSztJQUUzQixJQUFJLENBQUNDLGFBQWEsR0FBRyxJQUFJO0lBRXpCLElBQUksQ0FBQ0MsNEJBQTRCLEVBQUU7RUFDckM7O0VBRUE7RUFBQTtJQUFBO0lBQUE7TUFBQSwyRUFDQSxpQkFBZUMsU0FBUztRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLEtBQ2xCQSxTQUFTO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNYdGQsb0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2dCQUFDO2dCQUFBLE9BQ25DLElBQUksQ0FBQytkLG1CQUFtQixFQUFFO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFFaEN2ZCxvQkFBTSxDQUFDUixHQUFHLENBQUMsK0NBQStDLENBQUM7Z0JBQUM7Z0JBQUEsT0FDdEQ2VCxzQkFBc0IsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztjQUFBO2dCQUNuRXJULG9CQUFNLENBQUNSLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQztnQkFBQztnQkFBQSxPQUNqRCxJQUFJLENBQUMrZCxtQkFBbUIsRUFBRTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUVuQztNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUEsSUFFRDtFQUFBO0lBQUE7SUFBQTtNQUFBLG1GQUNBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FFUSxJQUFJLENBQUNBLG1CQUFtQixFQUFFO2NBQUE7Z0JBQUE7Z0JBQUEsT0FFMUIsSUFBSSxDQUFDQywwQkFBMEIsRUFBRTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUN4QztNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxzRkFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsS0FDTSxJQUFJLENBQUNOLGNBQWM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQU1HLElBQUksQ0FBQ08sa0JBQWtCLEVBQUU7Y0FBQTtnQkFBN0NDLFdBQVc7Z0JBQUEsS0FFYkEsV0FBVztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUVQLElBQUksQ0FBQ0MscUJBQXFCLEVBQUU7Y0FBQTtnQkFDbEMzZCxvQkFBTSxDQUFDUixHQUFHLENBQUMsd0JBQXdCLEVBQUVrZSxXQUFXLENBQUM7Z0JBQ2pELElBQUksQ0FBQ1IsY0FBYyxHQUFHLElBQUk7Z0JBQzFCLElBQUksQ0FBQ1UsU0FBUyxDQUFDRixXQUFXLENBQUM7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FFL0I7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsNkZBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLE1BQ00sQ0FBQyxJQUFJLENBQUNSLGNBQWMsSUFBSSxJQUFJLENBQUNDLGNBQWM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQU10QixJQUFJLENBQUNRLHFCQUFxQixFQUFFO2NBQUE7Z0JBQS9DRSxVQUFVO2dCQUNoQjdkLG9CQUFNLENBQUNSLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRXFlLFVBQVUsQ0FBQztnQkFBQyxJQUNqREEsVUFBVTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BRU8sSUFBSSxDQUFDQyx5QkFBeUIsRUFBRTtjQUFBO2dCQUFoREMsT0FBTztnQkFDYixJQUFJQSxPQUFPLEVBQUU7a0JBQ1gvZCxvQkFBTSxDQUFDUixHQUFHLENBQUMsMEJBQTBCLEVBQUV1ZSxPQUFPLENBQUM7a0JBQy9DLElBQUksQ0FBQ1osY0FBYyxHQUFHLElBQUk7a0JBQzFCLElBQUksQ0FBQ1MsU0FBUyxDQUFDRyxPQUFPLENBQUM7Z0JBQ3pCO2NBQUM7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ0Y7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEseUZBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLE1BQ00sSUFBSSxDQUFDYixjQUFjLElBQUksSUFBSSxDQUFDRCxpQkFBaUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQU12QixJQUFJLENBQUNlLHFCQUFxQixFQUFFO2NBQUE7Z0JBQWhETixXQUFXO2dCQUVqQixJQUFJQSxXQUFXLEVBQUU7a0JBQ2Y7a0JBQ0ExZCxvQkFBTSxDQUFDUixHQUFHLENBQUMsd0JBQXdCLEVBQUVrZSxXQUFXLENBQUM7a0JBQ2pELElBQUksQ0FBQ1QsaUJBQWlCLEdBQUcsSUFBSTtrQkFDN0IsSUFBSSxDQUFDVyxTQUFTLENBQUNGLFdBQVcsQ0FBQztnQkFDN0I7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDRjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSx3RkFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDb0JySyxzQkFBc0IsQ0FBQyxPQUFPLENBQUM7Y0FBQTtnQkFBM0M0SyxHQUFHO2dCQUFBLE1BQ0wsSUFBSSxDQUFDYixhQUFhLEtBQUthLEdBQUc7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQzVCLElBQUksQ0FBQ2IsYUFBYSxHQUFHYSxHQUFHO2dCQUFDLGtDQUNsQixJQUFJO2NBQUE7Z0JBQUEsa0NBRU4sS0FBSztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNiO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHdGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNvRGhWLE9BQU8sQ0FBQzROLEdBQUcsQ0FBQyxDQUM1RHhELHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUMzQkEsc0JBQXNCLENBQUMsV0FBVyxDQUFDLEVBQ25DQSxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsRUFDcENBLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUNyQyxDQUFDO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBTEsvUSxHQUFHO2dCQUFFd0IsSUFBSTtnQkFBRW9hLFVBQVU7Z0JBQUVDLFVBQVU7Z0JBT2xDQyxJQUFJLEdBQUc7a0JBQ1hGLFVBQVUsRUFBRUEsVUFBVTtrQkFDdEJHLEVBQUUsRUFBRSxDQUFDO2tCQUNMRixVQUFVLEVBQUVBLFVBQVU7a0JBQ3RCRyxDQUFDLEVBQUVoYyxHQUFHO2tCQUNOaWMsU0FBUyxFQUFFemE7Z0JBQ2IsQ0FBQztnQkFFRDlELG9CQUFNLENBQUNSLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTRlLElBQUksQ0FBQztnQkFBQyxrQ0FFaEMsSUFBSUksSUFBSSxDQUFDLENBQUMzWSxJQUFJLENBQUNFLFNBQVMsQ0FBQ3FZLElBQUksQ0FBQyxDQUFDLEVBQUVyQixPQUFPLENBQUM7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDakQ7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEscUZBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNRcUIsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFBQSxJQUNWOWhCLE1BQU0sQ0FBQ3FWLGVBQWU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQ2xCLElBQUk7Y0FBQTtnQkFFYiwrQkFBMkI3TSxNQUFNLENBQUNDLE9BQU8sQ0FBQ3pJLE1BQU0sQ0FBQ3FWLGVBQWUsQ0FBQyxxQ0FBRTtrQkFBQSw2REFBdkQzTSxHQUFHLDBCQUFFQyxLQUFLO2tCQUNwQixJQUFJLENBQUNELEdBQUcsQ0FBQ3laLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSXhaLEtBQUssS0FBSyxJQUFJLEVBQUVtWixJQUFJLENBQUNwWixHQUFHLENBQUMsR0FBR0MsS0FBSztnQkFDL0Q7Z0JBQ0FtWixJQUFJLENBQUNDLEVBQUUsR0FBRyxDQUFDO2dCQUFDLGtDQUVMLElBQUlHLElBQUksQ0FBQyxDQUFDM1ksSUFBSSxDQUFDRSxTQUFTLENBQUNxWSxJQUFJLENBQUMsQ0FBQyxFQUFFckIsT0FBTyxDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2pEO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLDRGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUN3RDlULE9BQU8sQ0FBQzROLEdBQUcsQ0FBQyxDQUNoRXhELHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUMzQkEsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQzNCQSxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFDM0JBLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUMzQkEsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQzNCQSxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsRUFDcENBLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUNyQyxDQUFDO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBUkt6QixDQUFDO2dCQUFFeEksQ0FBQztnQkFBRXlJLENBQUM7Z0JBQUU2TSxDQUFDO2dCQUFFQyxDQUFDO2dCQUFFVCxVQUFVO2dCQUFFQyxVQUFVO2dCQVV0Q0MsSUFBSSxHQUFHO2tCQUNYRixVQUFVLEVBQUVBLFVBQVU7a0JBQ3RCRyxFQUFFLEVBQUUsQ0FBQztrQkFDTEYsVUFBVSxFQUFFQSxVQUFVO2tCQUN0QnZNLENBQUMsRUFBREEsQ0FBQztrQkFBRXhJLENBQUMsRUFBREEsQ0FBQztrQkFBRXlJLENBQUMsRUFBREEsQ0FBQztrQkFBRTZNLENBQUMsRUFBREEsQ0FBQztrQkFBRUMsQ0FBQyxFQUFEQTtnQkFDZCxDQUFDO2dCQUVEM2Usb0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLG1CQUFtQixFQUFFNGUsSUFBSSxDQUFDO2dCQUFDLGtDQUUvQixJQUFJSSxJQUFJLENBQUMsQ0FBQzNZLElBQUksQ0FBQ0UsU0FBUyxDQUFDcVksSUFBSSxDQUFDLENBQUMsRUFBRXJCLE9BQU8sQ0FBQztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNqRDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUEsT0FFRCx3Q0FBK0I7TUFBQTtNQUM3QixJQUFJNkIsdUJBQXVCLEdBQUcsSUFBSTtNQUNsQzVlLG9CQUFNLENBQUNSLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQztNQUM5Q2xELE1BQU0sQ0FBQ3VpQixnQkFBZ0IsQ0FBQyxjQUFjLDBFQUFFO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQ3RDN2Usb0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2dCQUNuQ3VMLFlBQVksQ0FBQzZULHVCQUF1QixDQUFDO2dCQUFDO2dCQUFBLE9BQ2hDLEtBQUksQ0FBQ0UsZ0JBQWdCLEVBQUU7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDOUIsSUFBRTtRQUFDQyxPQUFPLEVBQUU7TUFBSSxDQUFDLENBQUM7TUFDbkJ6aUIsTUFBTSxDQUFDdWlCLGdCQUFnQixDQUFDLFVBQVUsMEVBQUU7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFDbEM3ZSxvQkFBTSxDQUFDUixHQUFHLENBQUMsbUJBQW1CLENBQUM7Z0JBQy9CdUwsWUFBWSxDQUFDNlQsdUJBQXVCLENBQUM7Z0JBQUM7Z0JBQUEsT0FDaEMsS0FBSSxDQUFDRSxnQkFBZ0IsRUFBRTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUM5QixJQUFFO1FBQUNDLE9BQU8sRUFBRTtNQUFJLENBQUMsQ0FBQztNQUNuQnppQixNQUFNLENBQUN1aUIsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtRQUNoRCxJQUFJdmlCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDNGUsZUFBZSxLQUFLLFFBQVEsRUFBRTtVQUNwRDtVQUNBSix1QkFBdUIsR0FBR3hjLFVBQVUsMEVBQUM7WUFBQTtjQUFBO2dCQUFBO2tCQUFBO29CQUNuQ3BDLG9CQUFNLENBQUNSLEdBQUcsQ0FBQyxZQUFZLENBQUM7b0JBQUM7b0JBQUEsT0FDbkIsS0FBSSxDQUFDc2YsZ0JBQWdCLEVBQUU7a0JBQUE7a0JBQUE7b0JBQUE7Z0JBQUE7Y0FBQTtZQUFBO1VBQUEsQ0FDOUIsSUFBRSxLQUFLLENBQUM7VUFDVDtRQUNGO1FBQ0E7UUFDQS9ULFlBQVksQ0FBQzZULHVCQUF1QixDQUFDO1FBQ3JDQSx1QkFBdUIsR0FBRyxJQUFJO01BQ2hDLENBQUMsRUFBRTtRQUFDRyxPQUFPLEVBQUU7TUFBSSxDQUFDLENBQUM7SUFDckI7RUFBQztJQUFBO0lBQUEsT0FFRCxtQkFBVWhCLE9BQU8sRUFBRTtNQUNqQixJQUFJLENBQUMzUyxTQUFTLENBQUM2VCxVQUFVLElBQUksT0FBTzdULFNBQVMsQ0FBQzZULFVBQVUsS0FBSyxVQUFVLEVBQUU7UUFDdkV4YyxLQUFLLENBQUN0RixXQUFXLEVBQUU0Z0IsT0FBTyxDQUFDO1FBQzNCO01BQ0Y7TUFFQSxJQUFJbUIsTUFBTSxHQUFHOVQsU0FBUyxDQUFDNlQsVUFBVSxDQUFDOWhCLFdBQVcsRUFBRTRnQixPQUFPLENBQUM7TUFDdkQsSUFBTW9CLGFBQWEsR0FBRzNhLFdBQVcsQ0FBQyxZQUFNO1FBQ3RDLElBQUksQ0FBQzBhLE1BQU0sRUFBRUEsTUFBTSxHQUFHOVQsU0FBUyxDQUFDNlQsVUFBVSxDQUFDOWhCLFdBQVcsRUFBRTRnQixPQUFPLENBQUMsQ0FBQyxLQUM1RDtVQUNIelosYUFBYSxDQUFDNmEsYUFBYSxDQUFDO1VBQzVCbmYsb0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDBCQUEwQixDQUFDO1FBQ3hDO01BQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUNOLElBQUkwZixNQUFNLEVBQUU7TUFDWjljLFVBQVUsQ0FBQyxZQUFNO1FBQ2ZrQyxhQUFhLENBQUM2YSxhQUFhLENBQUM7UUFDNUIsSUFBSSxDQUFDRCxNQUFNLEVBQUU7VUFDWGxmLG9CQUFNLENBQUNSLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztRQUMvQjtNQUNGLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDVjtFQUFDO0VBQUE7QUFBQTtBQUdILGtEQUFld2QsT0FBTzs7Ozs7Ozs7O0FDdk55RTtBQUMvQjtBQUNqQztBQUMyQjtBQUMxRCxJQUFNaGQsZ0NBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLDJCQUEyQixDQUFDO0FBQUMsSUFFakRxZ0IsbUJBQW1CO0VBQ3ZCLDZCQUFZaEIsSUFBSSxFQUFFO0lBQUE7SUFDaEIsSUFBT25kLFVBQVUsR0FBc0JtZCxJQUFJLENBQXBDbmQsVUFBVTtNQUFFTyxnQkFBZ0IsR0FBSTRjLElBQUksQ0FBeEI1YyxnQkFBZ0I7SUFDbkMsSUFBSSxDQUFDUCxVQUFVLEdBQUdBLFVBQVU7SUFDNUIsSUFBSSxDQUFDTyxnQkFBZ0IsR0FBR0EsZ0JBQWdCO0lBQ3hDLElBQUksQ0FBQ29WLGVBQWUsR0FBRyxJQUFJO0VBQzdCO0VBQUM7SUFBQTtJQUFBO01BQUEsdUZBcUVELGlCQUEyQmpSLFNBQVM7UUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUNsQjBOLHNCQUFzQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQztjQUFBO2dCQUE3RGdNLEdBQUc7Z0JBQ1BBLEdBQUcsR0FBRyxTQUFBQSxHQUFHLHlDQUFILEtBQU0sQ0FBQyxDQUFDLEtBQUksSUFBSTtnQkFBQyxJQUNsQkEsR0FBRztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxpQ0FBUyxFQUFFO2NBQUE7Z0JBQ25CLElBQUksQ0FBQ3pJLGVBQWUsR0FBR3lJLEdBQUc7Z0JBQ3RCQyxpQkFBaUIsR0FBR2hqQixNQUFNLENBQUN3SyxjQUFjLENBQUMxSCxPQUFPLENBQUN4Qix1Q0FBdUMsQ0FBQztnQkFBQSxLQUMxRjBoQixpQkFBaUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FFU3paLElBQUksQ0FBQ0MsS0FBSyxDQUFDd1osaUJBQWlCLENBQUM7Y0FBQTtnQkFBdkRBLGlCQUFpQjtnQkFDakJBLGlCQUFpQixHQUFHQSxpQkFBaUIsQ0FBQzdKLE1BQU0sQ0FBQyxVQUFDOEosRUFBRSxFQUFLO2tCQUNuRCxPQUFPLEtBQUksQ0FBQ0MsYUFBYSxDQUFDRCxFQUFFLENBQUNFLFNBQVMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDO2dCQUNGemYsZ0NBQU0sQ0FBQ1IsR0FBRyxXQUFJOGYsaUJBQWlCLENBQUN2akIsTUFBTSxzQ0FBbUM7Z0JBQUMsaUNBQ25FdWpCLGlCQUFpQjtjQUFBO2dCQUFBO2dCQUFBO2dCQUV4QnRmLGdDQUFNLENBQUNxQixNQUFNLENBQUMsK0JBQStCLEVBQUUsWUFBSUMsT0FBTyxDQUFDO2dCQUFDLGlDQUNyRCxFQUFFO2NBQUE7Z0JBR2JnZSxpQkFBaUIsR0FBRyxFQUFFO2dCQUNmcmUsVUFBVSxHQUFzQixJQUFJLENBQXBDQSxVQUFVLEVBQUVPLGdCQUFnQixHQUFJLElBQUksQ0FBeEJBLGdCQUFnQjtnQkFBQTtnQkFBQSxPQUNUNlIsc0JBQXNCLENBQUMsR0FBRyxDQUFDO2NBQUE7Z0JBQS9DcU0sV0FBVztnQkFBQSxJQUNaQSxXQUFXO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGlDQUFTLElBQUk7Y0FBQTtnQkFBQSxLQUN6QmxlLGdCQUFnQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDWm1lLGtCQUFrQixHQUFHbmUsZ0JBQWdCLENBQUNrZSxXQUFXLENBQUM7Z0JBQUEsSUFDbkRDLGtCQUFrQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxpQ0FBUyxFQUFFO2NBQUE7Z0JBQUEsZ0VBQ1YxZSxVQUFVO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQXZCMmUsU0FBUztnQkFDZEMsZUFBZSw0QkFBR0Ysa0JBQWtCLENBQUNDLFNBQVMsQ0FBQ3ZaLEVBQUUsQ0FBQywwREFBaEMsc0JBQWtDSSxNQUFNO2dCQUFBLElBQ3pEb1osZUFBZTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDbEIsSUFBSUQsU0FBUyxDQUFDN0wsc0JBQXNCLEVBQUU7a0JBQ3BDOEwsZUFBZSw2QkFBR0Ysa0JBQWtCLENBQUNDLFNBQVMsQ0FBQzdMLHNCQUFzQixDQUFDLDJEQUFwRCx1QkFBc0R0TixNQUFNO2dCQUNoRixDQUFDLE1BQU0sSUFBSWQsU0FBUyxJQUFJQSxTQUFTLEtBQUssQ0FBQyxFQUFFa2EsZUFBZSxHQUFHLEdBQUc7Z0JBQUMsSUFDMURBLGVBQWU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFFdEJELFNBQVMsQ0FBQ25aLE1BQU0sR0FBR29aLGVBQWU7Z0JBQUMsSUFDOUJELFNBQVMsQ0FBQ2hhLE9BQU8sQ0FBQ2dHLElBQUksQ0FBQyxVQUFDZ0csQ0FBQztrQkFBQSxPQUFLQSxDQUFDLENBQUN6TCxRQUFRO2dCQUFBLEVBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQzVDbVosaUJBQWlCLENBQUNqUCxJQUFJLENBQUN1UCxTQUFTLENBQUM7Z0JBQUM7Y0FBQTtnQkFBQSxpRUFHZkEsU0FBUyxDQUFDaGEsT0FBTztnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUEzQkssTUFBTTtnQkFBQSxJQUNWQSxNQUFNLENBQUNFLFFBQVE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFDcEIsNEJBQXlCckIsTUFBTSxDQUFDd0IsSUFBSSxDQUFDTCxNQUFNLENBQUNFLFFBQVEsQ0FBQyxrQ0FBRTtrQkFBNUNJLFVBQVU7a0JBQ25CLElBQUksMEJBQUFvWixrQkFBa0IsQ0FBQ0MsU0FBUyxDQUFDdlosRUFBRSxDQUFDLG1EQUFoQyx1QkFBa0NGLFFBQVEsOEJBQUl3WixrQkFBa0IsQ0FBQ0MsU0FBUyxDQUFDdlosRUFBRSxDQUFDLG1EQUFoQyx1QkFBa0NGLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLEVBQUU7b0JBQ3hHTixNQUFNLENBQUNFLFFBQVEsQ0FBQ0ksVUFBVSxDQUFDLENBQUNFLE1BQU0sR0FBR2taLGtCQUFrQixDQUFDQyxTQUFTLENBQUN2WixFQUFFLENBQUMsQ0FBQ0YsUUFBUSxDQUFDSSxVQUFVLENBQUM7a0JBQzVGO2dCQUNGO2NBQUM7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFFSCtZLGlCQUFpQixDQUFDalAsSUFBSSxDQUFDdVAsU0FBUyxDQUFDO2NBQUM7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFHdEN0akIsTUFBTSxDQUFDd0ssY0FBYyxDQUFDRyxPQUFPLENBQUNySix1Q0FBdUMsRUFBRWlJLElBQUksQ0FBQ0UsU0FBUyxDQUFDdVosaUJBQWlCLENBQUMsQ0FBQztnQkFBQztnQkFBQSxPQUM3RixJQUFJLENBQUNRLG9CQUFvQixDQUFDbmEsU0FBUyxDQUFDO2NBQUE7Z0JBQUE7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDbEQ7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBLE9BRUQsdUJBQWM4WixTQUFTLEVBQUU7TUFDdkIsSUFBTzdJLGVBQWUsR0FBSSxJQUFJLENBQXZCQSxlQUFlO01BQ3RCLElBQUk2SSxTQUFTLEtBQUssSUFBSSxJQUFJQSxTQUFTLEtBQUtqWSxTQUFTLEVBQUUsT0FBTyxJQUFJO01BQzlELElBQUksQ0FBQ2dFLEtBQUssQ0FBQzRILE9BQU8sQ0FBQ3FNLFNBQVMsQ0FBQyxFQUFFO1FBQzdCemYsZ0NBQU0sQ0FBQ3FCLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQztRQUM5QyxPQUFPLEtBQUs7TUFDZDtNQUNBLElBQUlvZSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNoQixVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDaENnQixTQUFTLEdBQUdBLFNBQVMsQ0FBQ3BjLEdBQUcsQ0FBQyxVQUFDMGMsRUFBRTtVQUFBLE9BQUtBLEVBQUUsQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUFBLEVBQUM7UUFDL0MsT0FBTyxDQUFDUCxTQUFTLENBQUNoakIsUUFBUSxDQUFDbWEsZUFBZSxDQUFDO01BQzdDO01BQ0EsT0FBTzZJLFNBQVMsQ0FBQ2hqQixRQUFRLENBQUNtYSxlQUFlLENBQUM7SUFDNUM7RUFBQztJQUFBO0lBQUE7TUFBQSxnRkFySUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNFNVcsZ0NBQU0sQ0FBQ1IsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2dCQUN6Qm5CLFVBQVUsR0FBSUQsNkJBQUo7Z0JBQ1g2aEIsYUFBYSxHQUFHcGEsSUFBSSxDQUFDQyxLQUFLLENBQUN4SixNQUFNLENBQUM2QyxZQUFZLENBQUNDLE9BQU8sQ0FBQ2YsVUFBVSxDQUFDLENBQUM7Z0JBQ3JFNEMsVUFBVSxHQUFHZ2YsYUFBYSxhQUFiQSxhQUFhLHVCQUFiQSxhQUFhLENBQUVoZixVQUFVO2dCQUNwQ2lmLFNBQVMsR0FBR0QsYUFBYSxhQUFiQSxhQUFhLHVCQUFiQSxhQUFhLENBQUVDLFNBQVM7Z0JBQUEsTUFDdEMsQ0FBQ2pmLFVBQVUsSUFBSSxDQUFDaWYsU0FBUztrQkFBQTtrQkFBQTtnQkFBQTtnQkFDM0JsZ0IsZ0NBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQztnQkFBQztnQkFBQSxPQUNwQ04sZUFBZSxFQUFFO2NBQUE7Z0JBQXBDRSxVQUFVO2dCQUFBLElBQ0xBLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ2JqQixnQ0FBTSxDQUFDcUIsTUFBTSxDQUFDLDRCQUE0QixDQUFDO2dCQUFDLGtDQUNyQyxJQUFJO2NBQUE7Z0JBRVA4ZSxzQkFBc0IsR0FBRztrQkFDN0JELFNBQVMsRUFBRW5qQixJQUFJLENBQUNtSyxHQUFHLEVBQUU7a0JBQ3JCakcsVUFBVSxFQUFWQTtnQkFDRixDQUFDO2dCQUNEM0UsTUFBTSxDQUFDNkMsWUFBWSxDQUFDOEgsT0FBTyxDQUFDNUksVUFBVSxFQUFFd0gsSUFBSSxDQUFDRSxTQUFTLENBQUNvYSxzQkFBc0IsQ0FBQyxDQUFDO2dCQUMvRTdqQixNQUFNLENBQUN3SyxjQUFjLENBQUNxQixVQUFVLENBQUN2Syx1Q0FBdUMsQ0FBQztnQkFBQyxrQ0FDbkVxRCxVQUFVO2NBQUE7Z0JBQUEsS0FFZmlmLFNBQVM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ0xFLFlBQVksR0FBRyxDQUFDcmpCLElBQUksQ0FBQ21LLEdBQUcsRUFBRSxHQUFHZ1osU0FBUyxLQUFLLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQUEsTUFDekRFLFlBQVksR0FBRzVpQix1QkFBdUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ3hDd0MsZ0NBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztnQkFBQztnQkFBQSxPQUNyQk4sZUFBZSxFQUFFO2NBQUE7Z0JBQXBDRSxVQUFVO2dCQUFBLElBQ0xBLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ2JqQixnQ0FBTSxDQUFDcUIsTUFBTSxDQUFDLDRCQUE0QixDQUFDO2dCQUFDLGtDQUNyQyxJQUFJO2NBQUE7Z0JBRVA4ZSx1QkFBc0IsR0FBRztrQkFDN0JELFNBQVMsRUFBRW5qQixJQUFJLENBQUNtSyxHQUFHLEVBQUU7a0JBQ3JCakcsVUFBVSxFQUFWQTtnQkFDRixDQUFDO2dCQUNEM0UsTUFBTSxDQUFDNkMsWUFBWSxDQUFDOEgsT0FBTyxDQUFDNUksVUFBVSxFQUFFd0gsSUFBSSxDQUFDRSxTQUFTLENBQUNvYSx1QkFBc0IsQ0FBQyxDQUFDO2dCQUMvRTdqQixNQUFNLENBQUN3SyxjQUFjLENBQUNxQixVQUFVLENBQUN2Syx1Q0FBdUMsQ0FBQztnQkFBQyxrQ0FDbkVxRCxVQUFVO2NBQUE7Z0JBR3JCakIsZ0NBQU0sQ0FBQ3VILE9BQU8sQ0FBQywwQ0FBMEMsQ0FBQztnQkFBQyxrQ0FDcER0RyxVQUFVO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2xCO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHNGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFFUW9mLFVBQVUsR0FBRy9qQixNQUFNLENBQUM2QyxZQUFZLENBQUNDLE9BQU8sQ0FBQ2hCLDBCQUEwQixDQUFDO2dCQUFBLEtBQ3BFaWlCLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ1pBLFVBQVUsR0FBR3hhLElBQUksQ0FBQ0MsS0FBSyxDQUFDdWEsVUFBVSxDQUFDO2dCQUFDLEtBQ2hDQSxVQUFVLENBQUNILFNBQVM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ2hCRSxZQUFZLEdBQUcsQ0FBQ3JqQixJQUFJLENBQUNtSyxHQUFHLEVBQUUsR0FBR21aLFVBQVUsQ0FBQ0gsU0FBUyxLQUFLLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQUEsTUFDcEVFLFlBQVksR0FBRzVpQix1QkFBdUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVM2aUIsVUFBVSxDQUFDQyxPQUFPO2NBQUE7Z0JBQUE7Z0JBQUEsT0FHdEQvZSxxQkFBcUIsRUFBRTtjQUFBO2dCQUExQzhlLFVBQVU7Z0JBQUEsSUFDTEEsVUFBVTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDYnJnQixnQ0FBTSxDQUFDcUIsTUFBTSxDQUFDLHlCQUF5QixDQUFDO2dCQUFDLGtDQUNsQyxJQUFJO2NBQUE7Z0JBRWJnZixVQUFVLEdBQUc7a0JBQUNDLE9BQU8sRUFBRUQsVUFBVTtrQkFBRUgsU0FBUyxFQUFFbmpCLElBQUksQ0FBQ21LLEdBQUc7Z0JBQUUsQ0FBQztnQkFDekQ1SyxNQUFNLENBQUM2QyxZQUFZLENBQUM4SCxPQUFPLENBQUM3SSwwQkFBMEIsRUFBRXlILElBQUksQ0FBQ0UsU0FBUyxDQUFDc2EsVUFBVSxDQUFDLENBQUM7Z0JBQUMsa0NBQzdFQSxVQUFVLENBQUNDLE9BQU87Y0FBQTtnQkFBQTtnQkFBQTtnQkFFekJ0Z0IsZ0NBQU0sQ0FBQ0gsSUFBSSxDQUFDLGFBQUl5QixPQUFPLENBQUM7Z0JBQUMsa0NBQ2xCLElBQUk7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FFZDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtFQUFBO0FBQUE7QUF1RUgsOERBQWU4ZCxtQkFBbUI7Ozs7Ozs7OztBQ3RKUTtBQUNYO0FBQzJCO0FBRTFELElBQU1wZixvQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsY0FBYyxDQUFDO0FBRXpDLElBQU13aEIsUUFBUTtFQUFBLHNFQUFHLGlCQUFPdGIsS0FBSyxFQUFFdWIsU0FBUztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQSxLQUNsQ2hWLEtBQUssQ0FBQzRILE9BQU8sQ0FBQ25PLEtBQUssQ0FBQztjQUFBO2NBQUE7WUFBQTtZQUFBLG9EQUNDQSxLQUFLLENBQUNGLE9BQU8sRUFBRTtZQUFBO1lBQUE7VUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUEsOENBQTFCSCxDQUFDLG1CQUFFNmIsR0FBRztZQUNWQyxnQkFBZ0IsR0FBR2xWLEtBQUssQ0FBQzRILE9BQU8sQ0FBQ29OLFNBQVMsQ0FBQyxHQUFHQSxTQUFTLENBQUM1YixDQUFDLENBQUMsR0FBRzRiLFNBQVMsSUFBSSxFQUFFO1lBQUEsTUFDOUUsUUFBT0UsZ0JBQWdCLE1BQUssUUFBUTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDYkMsc0JBQXNCLENBQUNELGdCQUFnQixDQUFDO1VBQUE7WUFBM0RFLFVBQVU7WUFDaEIzYixLQUFLLENBQUNMLENBQUMsQ0FBQyxHQUFHcEosVUFBVSxDQUFDaWxCLEdBQUcsRUFBRSxhQUFhLEVBQUVHLFVBQVUsQ0FBQztZQUFDO1lBQUE7VUFBQTtZQUNqRDNiLEtBQUssQ0FBQ0wsQ0FBQyxDQUFDLEdBQUdpYyxpQkFBaUIsQ0FBQ0gsZ0JBQWdCLEVBQUVELEdBQUcsQ0FBQztVQUFDO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBLEtBRXBEalYsS0FBSyxDQUFDNEgsT0FBTyxDQUFDb04sU0FBUyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQUEscURBQ2ZBLFNBQVM7WUFBQTtZQUFBO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFoQk0sR0FBRztZQUFBLE1BQ1IsUUFBT0EsR0FBRyxNQUFLLFFBQVE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUFBLE9BQ0FILHNCQUFzQixDQUFDRyxHQUFHLENBQUM7VUFBQTtZQUE5Q0YsV0FBVTtZQUNoQjNiLEtBQUssR0FBR0EsS0FBSyxDQUFDdEosT0FBTyxDQUFDLGFBQWEsRUFBRWlsQixXQUFVLENBQUM7WUFBQztZQUFBO1VBQUE7WUFDNUMzYixLQUFLLEdBQUc0YixpQkFBaUIsQ0FBQ0MsR0FBRyxFQUFFN2IsS0FBSyxFQUFFLElBQUksQ0FBQztVQUFDO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBLE1BR2pELFFBQU91YixTQUFTLE1BQUssUUFBUTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUEsT0FDTkcsc0JBQXNCLENBQUNILFNBQVMsQ0FBQztVQUFBO1lBQXBESSxZQUFVO1lBQ2hCM2IsS0FBSyxHQUFHekosVUFBVSxDQUFDeUosS0FBSyxFQUFFLGFBQWEsRUFBRTJiLFlBQVUsQ0FBQztZQUFDO1lBQUE7VUFBQTtZQUNoRDNiLEtBQUssR0FBRzRiLGlCQUFpQixDQUFDTCxTQUFTLEVBQUV2YixLQUFLLENBQUM7VUFBQztZQUFBLGlDQUU5Q0EsS0FBSztVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ2I7RUFBQSxnQkF2QktzYixRQUFRO0lBQUE7RUFBQTtBQUFBLEdBdUJiO0FBRUQsU0FBU00saUJBQWlCLENBQUNMLFNBQVMsRUFBRXZiLEtBQUssRUFBa0I7RUFBQSxJQUFoQjhiLE1BQU0sdUVBQUcsS0FBSztFQUN6RCxJQUFJUCxTQUFTLElBQUl2YixLQUFLLENBQUN4SSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7SUFDOUN1RCxvQkFBTSxDQUFDUixHQUFHLENBQUMsOEJBQThCLEVBQUVnaEIsU0FBUyxDQUFDO0lBQ3JELElBQU1RLGVBQWUsR0FBR0MsUUFBUSxDQUFDVCxTQUFTLENBQUM7SUFDM0MsSUFBSU8sTUFBTSxFQUFFLE9BQU85YixLQUFLLENBQUN0SixPQUFPLENBQUMsYUFBYSxFQUFFcWxCLGVBQWUsRUFBRSxDQUFDO0lBQ2xFLE9BQU94bEIsVUFBVSxDQUFDeUosS0FBSyxFQUFFLGFBQWEsRUFBRStiLGVBQWUsRUFBRSxDQUFDO0VBQzVEO0VBQ0EsT0FBTy9iLEtBQUs7QUFDZDtBQUFDLFNBRWMwYixzQkFBc0I7RUFBQTtBQUFBO0FBQUE7RUFBQSxxRkFBckMsa0JBQXNDSCxTQUFTO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUN0Q1UsT0FBTyxHQUE0QlYsU0FBUyxDQUE1Q1UsT0FBTyxFQUFFbGMsR0FBRyxHQUF1QndiLFNBQVMsQ0FBbkN4YixHQUFHLEVBQUVtYyxXQUFXLEdBQVVYLFNBQVMsQ0FBOUJXLFdBQVcsRUFBRXZoQixJQUFJLEdBQUk0Z0IsU0FBUyxDQUFqQjVnQixJQUFJO1lBQUEsZUFDOUJzaEIsT0FBTztZQUFBLGtDQUNSLFNBQVMsd0JBZVQsWUFBWTtZQUFBO1VBQUE7WUFkWE4sVUFBVSxHQUFHLElBQUk7WUFDckJBLFVBQVUsR0FBR3RrQixNQUFNLENBQUN3SyxjQUFjLENBQUMxSCxPQUFPLENBQUM0RixHQUFHLENBQUM7WUFDL0MsSUFBSSxDQUFDNGIsVUFBVSxFQUFFQSxVQUFVLEdBQUd0a0IsTUFBTSxDQUFDd0ssY0FBYyxDQUFDMUgsT0FBTyxDQUFDK2hCLFdBQVcsQ0FBQztZQUFDLEtBQ3JFdmhCLElBQUk7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUVKZ2hCLFVBQVUsR0FBRy9hLElBQUksQ0FBQ0MsS0FBSyxDQUFDOGEsVUFBVSxDQUFDO1lBQ25DQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDN2tCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzZELElBQUksQ0FBQztZQUFDO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFFckRJLG9CQUFNLENBQUNxQixNQUFNLDJCQUFvQnVmLFVBQVUsRUFBRztZQUFDLGtDQUN4QyxJQUFJO1VBQUE7WUFBQSxrQ0FHUkEsVUFBVTtVQUFBO1lBQUE7WUFBQSxPQUdNdk4sc0JBQXNCLENBQUNyTyxHQUFHLENBQUM7VUFBQTtZQUE5QzRiLFlBQVU7WUFBQSxJQUNUQSxZQUFVO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUFxQnZOLHNCQUFzQixDQUFDOE4sV0FBVyxDQUFDO1VBQUE7WUFBdERQLFlBQVU7VUFBQTtZQUFBLGtDQUNwQkEsWUFBVTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBR3RCO0VBQUE7QUFBQTtBQUVELGtEQUFlTCxRQUFROztBQ25FdkIsSUFBTXZVLG1CQUFNLEdBQUc7RUFDYkMsTUFBTSxFQUFFLGNBQWM7RUFDdEJDLE9BQU8sRUFBRSxDQUFDO0VBQ1ZFLEtBQUssRUFBRTtJQUNMQyxJQUFJLEVBQUUsV0FBVztJQUNqQkMsT0FBTyxFQUFFLENBQ1A7TUFDRUQsSUFBSSxFQUFFLFFBQVE7TUFDZEUsTUFBTSxFQUFFO0lBQ1YsQ0FBQyxDQUNGO0lBQ0RoSyxPQUFPLEVBQUU7TUFBQ2lLLE9BQU8sRUFBRTtJQUFLO0VBQzFCO0FBQ0YsQ0FBQztBQUNELDJFQUFlUixtQkFBTTs7Ozs7Ozs7OztBQ2RxQjtBQUNYO0FBQ0s7QUFDb0I7QUFFeEQsSUFBTWhNLGdDQUFNLEdBQUcsSUFBSWpCLFVBQU0sQ0FBQywyQkFBMkIsQ0FBQztBQUFDLElBQ2pEcWlCLHlCQUF5QjtFQUM3QixxQ0FBYztJQUFBO0lBQ1osSUFBSSxDQUFDdFUsU0FBUyxHQUFHLElBQUk7SUFDckIsSUFBSSxDQUFDQyxJQUFJLEVBQUU7RUFDYjtFQUFDO0lBQUE7SUFBQSxPQUVELGdCQUFPO01BQUE7UUFBQTtNQUNML00sZ0NBQU0sQ0FBQ1IsR0FBRyxDQUFDLHdCQUF3QixDQUFDO01BQ3BDLElBQU13TixXQUFXLDRCQUFHMVEsTUFBTSxDQUFDNkQsR0FBRyxDQUFDMk0sU0FBUywwREFBcEIsc0JBQXNCRyxJQUFJLENBQUNqQiw2Q0FBYSxFQUFFQSw4Q0FBYyxDQUFDO01BQzdFLElBQUksQ0FBQ2dCLFdBQVcsRUFBRTtRQUNoQixNQUFNLElBQUk5TCxLQUFLLENBQUMsNEJBQTRCLENBQUM7TUFDL0M7TUFFQThMLFdBQVcsQ0FBQ0UsZUFBZSxHQUFHLFVBQUNDLEtBQUssRUFBSztRQUN2QyxRQUFRQSxLQUFLLENBQUNDLFVBQVU7VUFDdEIsS0FBSyxDQUFDO1lBQ0o7VUFDRjtZQUNFO1lBQ0EsSUFBSTtjQUNGSixXQUFXLENBQUN2RCxNQUFNLENBQUM0RCxpQkFBaUIsQ0FBQ3JCLGlEQUFpQixDQUFDO1lBQ3pELENBQUMsQ0FBQyxPQUFPckIsR0FBRyxFQUFFO2NBQ1ozSyxnQ0FBTSxDQUFDcUIsTUFBTSxDQUFDLG9DQUFvQyxFQUFFc0osR0FBRyxDQUFDckosT0FBTyxDQUFDO1lBQ2xFO1lBQ0E7UUFBTTtRQUVWLElBQUk7VUFBQTtVQUNGLElBQU04SyxLQUFLLEdBQUdZLFdBQVcsQ0FBQ3ZELE1BQU0sQ0FBQzZELGlCQUFpQixDQUFDdEIsaURBQWlCLEVBQUVBLG9EQUFvQixDQUFDO1VBQzNGLElBQUksMEJBQUFBLG9EQUFvQiwwREFBcEIsc0JBQXNCalEsTUFBTSxJQUFHLENBQUMsRUFBRTtZQUFBLG9FQUNsQmlRLG9EQUFvQjtjQUFBO1lBQUE7Y0FBdEMsb0RBQXdDO2dCQUFBLElBQTdCdUIsR0FBRztnQkFDWm5CLEtBQUssQ0FBQ29CLFdBQVcsQ0FBQ0QsR0FBRyxDQUFDbEIsSUFBSSxFQUFFa0IsR0FBRyxDQUFDaEIsTUFBTSxDQUFDO2NBQ3pDO1lBQUM7Y0FBQTtZQUFBO2NBQUE7WUFBQTtVQUNIO1FBQ0YsQ0FBQyxDQUFDLE9BQU81QixHQUFHLEVBQUU7VUFDWjNLLGdDQUFNLENBQUNxQixNQUFNLENBQUMsMkNBQTJDLEVBQUVzSixHQUFHLENBQUNySixPQUFPLENBQUM7UUFDekU7TUFDRixDQUFDO01BRUQwTCxXQUFXLENBQUNTLE9BQU8sR0FBRyxZQUFNO1FBQzFCLE1BQU0sSUFBSXZNLEtBQUssQ0FBQyw0Q0FBNEMsRUFBRThMLFdBQVcsQ0FBQ2xOLEtBQUssQ0FBQztNQUNsRixDQUFDO01BRURrTixXQUFXLENBQUNVLFNBQVMsR0FBRyxZQUFNO1FBQzVCLEtBQUksQ0FBQ1osU0FBUyxHQUFHRSxXQUFXLENBQUN2RCxNQUFNO01BQ3JDLENBQUM7SUFDSDtFQUFDO0lBQUE7SUFBQSxPQUVELHlCQUFnQjtNQUFBO01BQ2QsT0FBTyxJQUFJUixPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFFNEUsTUFBTSxFQUFLO1FBQ3RDLElBQU1DLFFBQVEsR0FBR3ZKLFdBQVcsQ0FBQyxZQUFNO1VBQ2pDLElBQUksTUFBSSxDQUFDc0ksU0FBUyxFQUFFO1lBQ2xCeEksYUFBYSxDQUFDeUosUUFBUSxDQUFDO1lBQ3ZCN0UsT0FBTyxFQUFFO1VBQ1g7UUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ045RyxVQUFVLENBQUMsWUFBTTtVQUNmLElBQUksQ0FBQyxNQUFJLENBQUMwSyxTQUFTLEVBQUU7WUFDbkJ4SSxhQUFhLENBQUN5SixRQUFRLENBQUM7WUFDdkJELE1BQU0sQ0FBQyxJQUFJNU0sS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7VUFDekU7UUFDRixDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ1YsQ0FBQyxDQUFDO0lBQ0o7RUFBQztJQUFBO0lBQUE7TUFBQSxrRkFFRDtRQUFBO1VBQUE7VUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFzQjhNLFNBQVMsMkRBQUcsS0FBSztnQkFBQTtnQkFBQSxPQUMvQixJQUFJLENBQUNDLGFBQWEsRUFBRTtjQUFBO2dCQUNwQkMsRUFBRSxHQUFHLElBQUksQ0FBQ3BCLFNBQVMsQ0FBQ3FCLFdBQVcsQ0FBQ25DLGlEQUFpQixFQUFHZ0MsU0FBUyxHQUFHLFdBQVcsR0FBRyxVQUFVLENBQUU7Z0JBQUEsaUNBQ3pGRSxFQUFFLENBQUNFLFdBQVcsQ0FBQ3BDLGlEQUFpQixDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ3pDO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHVFQUVELGtCQUFXMkMsT0FBTztRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDSSxJQUFJLENBQUNKLGVBQWUsQ0FBQyxJQUFJLENBQUM7Y0FBQTtnQkFBeENuQyxLQUFLO2dCQUNMOFQsU0FBUyxHQUFHeFosSUFBSSxDQUFDZ0ksS0FBSyxDQUFDM1IsSUFBSSxDQUFDbUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUMvQyxJQUFJc0UsS0FBSyxDQUFDNEgsT0FBTyxDQUFDekUsT0FBTyxDQUFDLEVBQUU7a0JBQUEsaUVBQ1BBLE9BQU87a0JBQUE7b0JBQTFCLHVEQUE0QjtzQkFBakIyTixJQUFJO3NCQUNiQSxJQUFJLENBQUM0RCxTQUFTLEdBQUdBLFNBQVM7c0JBQzFCOVQsS0FBSyxDQUFDd0MsR0FBRyxDQUFDME4sSUFBSSxDQUFDO29CQUNqQjtrQkFBQztvQkFBQTtrQkFBQTtvQkFBQTtrQkFBQTtnQkFDSCxDQUFDLE1BQU07a0JBQ0wzTixPQUFPLENBQUN1UixTQUFTLEdBQUdBLFNBQVM7a0JBQzdCOVQsS0FBSyxDQUFDd0MsR0FBRyxDQUFDRCxPQUFPLENBQUM7Z0JBQ3BCO2NBQUM7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ0Y7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsd0VBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLGtDQUNTLElBQUkxRixPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO2tCQUM5QixNQUFJLENBQUNxRixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM1TCxJQUFJLENBQUMsVUFBQ3lKLEtBQUssRUFBSztvQkFDekMsSUFBTWlWLFlBQVksR0FBR2pWLEtBQUssQ0FBQ2tWLEtBQUssRUFBRTtvQkFDbENELFlBQVksQ0FBQzNULFNBQVMsR0FBRyxZQUFNO3NCQUM3QnhFLE9BQU8sRUFBRTtvQkFDWCxDQUFDO29CQUNEbVksWUFBWSxDQUFDNVQsT0FBTyxHQUFHLFlBQU07c0JBQzNCek4sZ0NBQU0sQ0FBQ3FCLE1BQU0saUNBQTBCK0ssS0FBSyxDQUFDQyxJQUFJLEVBQUc7c0JBQ3BEbkQsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDZixDQUFDO2tCQUNILENBQUMsQ0FBQztnQkFDSixDQUFDLENBQUM7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDSDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxzRUFFRCxrQkFBVW1PLEdBQUc7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLGtDQUNKLElBQUlwTyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO2tCQUM5QixNQUFJLENBQUNxRixlQUFlLEVBQUUsQ0FBQzVMLElBQUksQ0FBQyxVQUFDeUosS0FBSyxFQUFLO29CQUNyQyxJQUFNbVYsVUFBVSxHQUFHblYsS0FBSyxDQUFDM0QsR0FBRyxDQUFDNE8sR0FBRyxDQUFDO29CQUNqQ2tLLFVBQVUsQ0FBQzdULFNBQVMsR0FBRyxZQUFNO3NCQUMzQixJQUFNakUsTUFBTSxHQUFHOFgsVUFBVSxDQUFDOVgsTUFBTTtzQkFDaEN6SixnQ0FBTSxDQUFDUixHQUFHLHVCQUFnQmlLLE1BQU0sc0JBQVk0TixHQUFHLEVBQUc7c0JBQ2xEbk8sT0FBTyxDQUFDTyxNQUFNLENBQUM7b0JBQ2pCLENBQUM7b0JBQ0Q4WCxVQUFVLENBQUM5VCxPQUFPLEdBQUcsWUFBTTtzQkFDekJ6TixnQ0FBTSxDQUFDcUIsTUFBTSx3Q0FBaUNnVyxHQUFHLEdBQUlrSyxVQUFVLENBQUM5VCxPQUFPLENBQUM7c0JBQ3hFdkUsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDZixDQUFDO2tCQUNILENBQUMsQ0FBQztnQkFDSixDQUFDLENBQUM7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDSDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSx3RUFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsa0NBQ1MsSUFBSUQsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztrQkFDOUIsTUFBSSxDQUFDcUYsZUFBZSxFQUFFLENBQUM1TCxJQUFJLENBQUMsVUFBQ3lKLEtBQUssRUFBSztvQkFDckMsSUFBTW9WLFlBQVksR0FBR3BWLEtBQUssQ0FBQ3FELEtBQUssRUFBRTtvQkFDbEMrUixZQUFZLENBQUM5VCxTQUFTLEdBQUcsWUFBTTtzQkFDN0IsSUFBTWpFLE1BQU0sR0FBRytYLFlBQVksQ0FBQy9YLE1BQU07c0JBQ2xDekosZ0NBQU0sQ0FBQ1IsR0FBRyxtQkFBWWlLLE1BQU0sY0FBVztzQkFDdkNQLE9BQU8sQ0FBQ08sTUFBTSxDQUFDO29CQUNqQixDQUFDO29CQUNEK1gsWUFBWSxDQUFDL1QsT0FBTyxHQUFHLFlBQU07c0JBQzNCek4sZ0NBQU0sQ0FBQ3FCLE1BQU0sQ0FBQywwQkFBMEIsRUFBRW1nQixZQUFZLENBQUMvVCxPQUFPLENBQUM7c0JBQy9EdkUsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDZixDQUFDO2tCQUNILENBQUMsQ0FBQztnQkFDSixDQUFDLENBQUM7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDSDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSw0RUFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsa0NBQ1MsSUFBSUQsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztrQkFDOUIsTUFBSSxDQUFDcUYsZUFBZSxFQUFFLENBQUM1TCxJQUFJLENBQUMsVUFBQ3lKLEtBQUssRUFBSztvQkFDckMsSUFBTXFWLGFBQWEsR0FBR3JWLEtBQUssQ0FBQ3lELFVBQVUsRUFBRTtvQkFDeEM0UixhQUFhLENBQUMvVCxTQUFTLEdBQUcsVUFBQ1AsS0FBSyxFQUFLO3NCQUNuQ2pFLE9BQU8sQ0FBQ2lFLEtBQUssQ0FBQzhCLE1BQU0sQ0FBQ3hGLE1BQU0sQ0FBQztvQkFDOUIsQ0FBQztvQkFDRGdZLGFBQWEsQ0FBQ2hVLE9BQU8sR0FBRyxZQUFNO3NCQUM1QnpOLGdDQUFNLENBQUNxQixNQUFNLENBQUMsc0JBQXNCLEVBQUVvZ0IsYUFBYSxDQUFDaFUsT0FBTyxDQUFDO3NCQUM1RHZFLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ2YsQ0FBQztrQkFDSCxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ0g7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEscUZBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNFbkosb0JBQW9CLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDO2dCQUFDO2dCQUFBLE9BQ3ZCLElBQUksQ0FBQzBQLEtBQUssRUFBRTtjQUFBO2dCQUFyQ2lTLGdCQUFnQjtnQkFBQSxLQUNsQkEsZ0JBQWdCO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNsQjFoQixnQ0FBTSxDQUFDUixHQUFHLENBQUMsNkJBQTZCLENBQUM7Z0JBQUM7Z0JBQUEsT0FDckIsSUFBSSxDQUFDdVAsU0FBUyxFQUFFO2NBQUE7Z0JBQS9CQyxNQUFNO2dCQUNOa1IsU0FBUyxHQUFHbFIsTUFBTSxDQUFDL0osS0FBSyxDQUFDaWIsU0FBUztnQkFDbEN5QixjQUFjLEdBQUk1a0IsSUFBSSxDQUFDbUssR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFJZ1osU0FBUyxFQUN0RDtnQkFBQSxNQUNJeUIsY0FBYyxHQUFHLEtBQUs7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFDMUIzaEIsZ0NBQU0sQ0FBQ1IsR0FBRyxDQUFDLGtDQUFrQyxDQUFDO2NBQUM7Z0JBRWpETyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUM7Z0JBQ3pDNmhCLGtCQUFrQixHQUFHL2YsZ0JBQWdCLEVBQUU7Z0JBQ3ZDZ2dCLFlBQVksR0FBRyxJQUFJLENBQUNQLEtBQUssRUFBRTtnQkFBQTtnQkFBQSxPQUNBclksT0FBTyxDQUFDNE4sR0FBRyxDQUFDLENBQUMrSyxrQkFBa0IsRUFBRUMsWUFBWSxDQUFDLENBQUM7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBekVDLGdCQUFnQjtnQkFBQSxNQUNuQixDQUFDQSxnQkFBZ0IsSUFBSSxDQUFDQSxnQkFBZ0IsQ0FBQy9sQixNQUFNO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQ2pEZ0Usb0JBQW9CLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDO2dCQUFDO2dCQUFBLE9BQ3pDLElBQUksQ0FBQzJSLElBQUksQ0FBQyxJQUFJLENBQUNxUSxlQUFlLENBQUNELGdCQUFnQixDQUFDLENBQUM7Y0FBQTtnQkFDdkQvaEIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDO2NBQUM7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2xEO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQSxPQUVELHlCQUFnQitoQixnQkFBZ0IsRUFBRTtNQUNoQyxJQUFNRSxRQUFRLEdBQUcsRUFBRTtNQUNuQixJQUFNQyxVQUFVLEdBQUdILGdCQUFnQixDQUFDSSxLQUFLLEVBQUU7TUFDM0NELFVBQVUsQ0FBQ0MsS0FBSyxFQUFFO01BQUMscUVBQ0FKLGdCQUFnQjtRQUFBO01BQUE7UUFBbkMsdURBQXFDO1VBQUEsSUFBMUJ2aUIsSUFBSTtVQUNiLElBQU1vUCxPQUFPLEdBQUc7WUFBQzBJLEdBQUcsRUFBRTlYLElBQUksQ0FBQzJpQixLQUFLO1VBQUUsQ0FBQztVQUNuQyxLQUFLLElBQUl0ZCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdxZCxVQUFVLENBQUNsbUIsTUFBTSxFQUFFNkksQ0FBQyxFQUFFLEVBQUU7WUFDMUMrSixPQUFPLENBQUNzVCxVQUFVLENBQUNyZCxDQUFDLENBQUMsQ0FBQyxHQUFHckYsSUFBSSxDQUFDcUYsQ0FBQyxDQUFDLElBQUksQ0FBQztVQUN2QztVQUNBb2QsUUFBUSxDQUFDM1IsSUFBSSxDQUFDMUIsT0FBTyxDQUFDO1FBQ3hCO01BQUM7UUFBQTtNQUFBO1FBQUE7TUFBQTtNQUNELE9BQU9xVCxRQUFRO0lBQ2pCO0VBQUM7RUFBQTtBQUFBO0FBR0gsa0VBQWVaLHlCQUF5Qjs7QUMvTFE7QUFFaEQsSUFBTWUsS0FBSyxHQUFJLFlBQVc7RUFDeEIsSUFBSUMsUUFBUSxHQUFHLElBQUk7RUFDbkIsT0FBTztJQUNMQyxXQUFXLEVBQUUsdUJBQVc7TUFDdEIsSUFBSUQsUUFBUSxLQUFLLElBQUksRUFBRTtRQUNyQkEsUUFBUSxHQUFHLElBQUloQiw2QkFBeUIsRUFBRTtRQUMxQztRQUNBZ0IsUUFBUSxDQUFDRSxXQUFXLEdBQUcsSUFBSTtNQUM3QjtNQUNBLE9BQU9GLFFBQVE7SUFDakI7RUFDRixDQUFDO0FBQ0gsQ0FBQyxFQUFHO0FBQ0osMENBQWVELEtBQUs7Ozs7QUNmc0I7QUFDYTtBQUN4QjtBQUMvQixJQUFNbmlCLDRCQUFNLEdBQUcsSUFBSWpCLFVBQU0sQ0FBQyxzQkFBc0IsQ0FBQztBQUVqRCxJQUFNd2pCLG9CQUFvQjtFQUFBLHNFQUFHLGlCQUFPamIsU0FBUztJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDM0N0SCw0QkFBTSxDQUFDUixHQUFHLENBQUMsMEJBQTBCLEVBQUU4SCxTQUFTLENBQUM7WUFDM0NrYixnQkFBZ0IsR0FBRyxFQUFFO1lBQ3BCQyxTQUFTLEdBQTZEbmIsU0FBUyxDQUEvRW1iLFNBQVMsRUFBRUMsZUFBZSxHQUE0Q3BiLFNBQVMsQ0FBcEVvYixlQUFlLEVBQUVDLFFBQVEsR0FBa0NyYixTQUFTLENBQW5EcWIsUUFBUSxFQUFFelEsUUFBUSxHQUF3QjVLLFNBQVMsQ0FBekM0SyxRQUFRLEVBQUV0UyxJQUFJLEdBQWtCMEgsU0FBUyxDQUEvQjFILElBQUksRUFBRXFGLEtBQUssR0FBV3FDLFNBQVMsQ0FBekJyQyxLQUFLLEVBQUUyZCxLQUFLLEdBQUl0YixTQUFTLENBQWxCc2IsS0FBSztZQUNuRUMsaUJBQWlCLEdBQUdyWCxLQUFLLENBQUNDLElBQUksQ0FBQ25QLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDOFYsZ0JBQWdCLENBQUNoRSxRQUFRLENBQUMsQ0FBQztZQUFBLDZCQUM5RDJRLGlCQUFpQjtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBNUJoZSxPQUFPO1lBQUE7WUFBQSxPQUNOaWUsc0JBQXNCLENBQUNqZSxPQUFPLEVBQUVqRixJQUFJLEVBQUUraUIsUUFBUSxFQUFFRixTQUFTLEVBQUVDLGVBQWUsRUFBRXpkLEtBQUssRUFBRTJkLEtBQUssQ0FBQztVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFDakdKLGdCQUFnQixDQUFDblMsSUFBSSxDQUFDMFMsQ0FBQyxDQUFDbGUsT0FBTyxDQUFDLENBQUM7VUFBQztZQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUEsaUNBRy9CMmQsZ0JBQWdCO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDeEI7RUFBQSxnQkFYS0Qsb0JBQW9CO0lBQUE7RUFBQTtBQUFBLEdBV3pCO0FBRUQsSUFBTU8sc0JBQXNCO0VBQUEsdUVBQUcsa0JBQU9qZSxPQUFPLEVBQUVqRixJQUFJLEVBQUUraUIsUUFBUSxFQUFFRixTQUFTLEVBQUVDLGVBQWUsRUFBRXpkLEtBQUssRUFBRTJkLEtBQUs7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQUEsZUFDN0ZoakIsSUFBSTtZQUFBLGtDQUNMLG1CQUFtQjtZQUFBO1VBQUE7WUFDaEJvakIsVUFBVSxHQUFHbmUsT0FBTyxDQUFDd1IsWUFBWSxDQUFDb00sU0FBUyxDQUFDO1lBQUE7WUFBQSxPQUN4Qk4saUJBQWlCLEVBQUUsQ0FBQzFaLEdBQUcsQ0FBQ3VhLFVBQVUsQ0FBQztVQUFBO1lBQXZEbGhCLFdBQVc7WUFDWHVGLFlBQVksR0FBR3ZGLFdBQVcsYUFBWEEsV0FBVyx1QkFBWEEsV0FBVyxDQUFHNmdCLFFBQVEsQ0FBQyxFQUM1QztZQUFBLE1BQ0l0YixZQUFZLEtBQUssSUFBSSxJQUFJQSxZQUFZLEtBQUtHLFNBQVM7Y0FBQTtjQUFBO1lBQUE7WUFDckR4SCw0QkFBTSxDQUFDcUIsTUFBTSxDQUFDLHVCQUF1QixDQUFDO1lBQUMsa0NBQ2hDLEtBQUs7VUFBQTtZQUFBLElBRVQrRixnQkFBZ0IsQ0FBQ0MsWUFBWSxFQUFFcWIsZUFBZSxFQUFFemQsS0FBSyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQVMsS0FBSztVQUFBO1lBQUEsS0FDckUyZCxLQUFLO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUNXRSxzQkFBc0IsQ0FBQ2plLE9BQU8sRUFBRStkLEtBQUssQ0FBQ2hqQixJQUFJLEVBQUVnakIsS0FBSyxDQUFDRCxRQUFRLEVBQ3hFQyxLQUFLLENBQUNILFNBQVMsRUFBRUcsS0FBSyxDQUFDRixlQUFlLEVBQUVFLEtBQUssQ0FBQzNkLEtBQUssRUFBRTJkLEtBQUssQ0FBQ0EsS0FBSyxDQUFDO1VBQUE7WUFEL0RoZ0IsR0FBRztZQUFBLElBRUpBLEdBQUc7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FBUyxLQUFLO1VBQUE7WUFBQTtVQUFBO1lBS2xCeUUsYUFBWSxHQUFHeEMsT0FBTyxDQUFDd1IsWUFBWSxDQUFDb00sU0FBUyxDQUFDO1lBQUEsSUFDL0NyYixnQkFBZ0IsQ0FBQ0MsYUFBWSxFQUFFcWIsZUFBZSxFQUFFemQsS0FBSyxDQUFDO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQVMsS0FBSztVQUFBO1lBQUEsS0FDckUyZCxLQUFLO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQSxPQUNXRSxzQkFBc0IsQ0FBQ2plLE9BQU8sRUFBRStkLEtBQUssQ0FBQ2hqQixJQUFJLEVBQUVnakIsS0FBSyxDQUFDRCxRQUFRLEVBQ3hFQyxLQUFLLENBQUNILFNBQVMsRUFBRUcsS0FBSyxDQUFDRixlQUFlLEVBQUVFLEtBQUssQ0FBQzNkLEtBQUssRUFBRTJkLEtBQUssQ0FBQ0EsS0FBSyxDQUFDO1VBQUE7WUFEL0RoZ0IsSUFBRztZQUFBLElBRUpBLElBQUc7Y0FBQTtjQUFBO1lBQUE7WUFBQSxrQ0FBUyxLQUFLO1VBQUE7WUFBQSxrQ0FJckIsSUFBSTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ1o7RUFBQSxnQkE5QktrZ0Isc0JBQXNCO0lBQUE7RUFBQTtBQUFBLEdBOEIzQjtBQUVELDBEQUFlUCxvQkFBb0I7Ozs7Ozs7O0FDbER3QjtBQUNEO0FBQzBCO0FBQzdDO0FBQ29CO0FBQzVCO0FBQzJCO0FBQ0g7QUFBQSxTQUV4Q1UsWUFBWTtFQUFBO0FBQUE7QUFBQTtFQUFBLDJFQUEzQixrQkFBNEJyZCxPQUFPO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUMzQjVGLE1BQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLG9CQUFvQixDQUFDO1lBQ3hDaEIsa0JBQWtCLEdBQUlILHVDQUFKO1lBRW5Cc2xCLFdBQVc7Y0FBQSw4RUFBRyxpQkFBMkJqZCxNQUFNO2dCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2tCQUFBO29CQUFBO3NCQUFBO3dCQUFFcEIsT0FBTywyREFBRyxJQUFJO3dCQUNuRTdFLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLG1CQUFtQixFQUFFcUcsSUFBSSxDQUFDRSxTQUFTLENBQUNFLE1BQU0sQ0FBQyxDQUFDO3dCQUVyRDBjLFFBQVEsR0FhTjFjLE1BQU0sQ0FiUjBjLFFBQVEsRUFDUi9pQixJQUFJLEdBWUZxRyxNQUFNLENBWlJyRyxJQUFJLEVBQ0p1akIsVUFBVSxHQVdSbGQsTUFBTSxDQVhSa2QsVUFBVSxFQUNWQyxlQUFlLEdBVWJuZCxNQUFNLENBVlJtZCxlQUFlLEVBQ2ZsUixRQUFRLEdBU05qTSxNQUFNLENBVFJpTSxRQUFRLEVBQ1JtUixnQkFBZ0IsR0FRZHBkLE1BQU0sQ0FSUm9kLGdCQUFnQixFQUNoQkMsV0FBVyxHQU9UcmQsTUFBTSxDQVBScWQsV0FBVyxFQUNYQyxlQUFlLEdBTWJ0ZCxNQUFNLENBTlJzZCxlQUFlLEVBQ2ZDLGVBQWUsR0FLYnZkLE1BQU0sQ0FMUnVkLGVBQWUsRUFDZmhELFNBQVMsR0FJUHZhLE1BQU0sQ0FKUnVhLFNBQVMsRUFDVGlELEtBQUssR0FHSHhkLE1BQU0sQ0FIUndkLEtBQUssRUFDTGhCLFNBQVMsR0FFUHhjLE1BQU0sQ0FGUndjLFNBQVMsRUFDVGlCLGtCQUFrQixHQUNoQnpkLE1BQU0sQ0FEUnlkLGtCQUFrQjt3QkFBQSxNQUVoQmYsUUFBUSxLQUFLLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ3JCM2lCLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxtREFBbUQsQ0FBQzt3QkFBQyxpQ0FDNUQsSUFBSTtzQkFBQTt3QkFFUjRELEtBQUssR0FBSWdCLE1BQU0sQ0FBZmhCLEtBQUssRUFDVjt3QkFDQUosT0FBTyxHQUFHQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQ25KLElBQUksQ0FBQ3dXLFFBQVEsQ0FBQyxHQUFHNlEsQ0FBQyxDQUFDN1EsUUFBUSxDQUFDO3dCQUVsRHlSLEVBQUUsR0FBR0wsV0FBVyxHQUFHaG5CLE1BQU0sQ0FBQ3NuQixVQUFVLENBQUNOLFdBQVcsQ0FBQyxDQUFDTyxPQUFPLEdBQUcsSUFBSTt3QkFBQSxJQUNqRUYsRUFBRTswQkFBQTswQkFBQTt3QkFBQTt3QkFDTDNqQixNQUFNLENBQUNxQixNQUFNLENBQUMsNEJBQTRCLEVBQUVpaUIsV0FBVyxDQUFDO3dCQUFDLGlDQUNsRCxLQUFLO3NCQUFBO3dCQUFBLE1BR1hDLGVBQWUsSUFBSSxDQUFDQyxlQUFlLElBQ25DQSxlQUFlLElBQUksQ0FBQ0QsZUFBZ0I7MEJBQUE7MEJBQUE7d0JBQUE7d0JBRXJDdmpCLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQzt3QkFBQyxpQ0FDM0MsS0FBSztzQkFBQTt3QkFBQSxNQUVWa2lCLGVBQWUsSUFBSUMsZUFBZTswQkFBQTswQkFBQTt3QkFBQTt3QkFBQSxJQUMvQlQsQ0FBQyxDQUFDUSxlQUFlLENBQUMsQ0FBQ3huQixNQUFNOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUM1QmlFLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRWtpQixlQUFlLENBQUM7d0JBQUMsaUNBQ3ZELEtBQUs7c0JBQUE7d0JBQUEsSUFFVFIsQ0FBQyxDQUFDUyxlQUFlLENBQUMsQ0FBQ3puQixNQUFNOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUM1QmlFLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRW1pQixlQUFlLENBQUM7d0JBQUMsaUNBQ3ZELEtBQUs7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUEsSUFFSnRSLFFBQVE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ2xCbFMsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLHdCQUF3QixDQUFDO3dCQUFDLGlDQUNqQyxLQUFLO3NCQUFBO3dCQUFBLElBRVB3RCxPQUFPLENBQUM5SSxNQUFNOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLE1BQ2IsQ0FBQ2duQixDQUFDLENBQUNNLGdCQUFnQixDQUFDLENBQUN0bkIsTUFBTSxJQUFJNG1CLFFBQVEsS0FBSyxRQUFROzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGlDQUFTLElBQUk7c0JBQUE7d0JBQUEsTUFDakV6USxRQUFRLEtBQUssYUFBYTswQkFBQTswQkFBQTt3QkFBQTt3QkFDNUJsUyxNQUFNLENBQUNxQixNQUFNLENBQUMsc0JBQXNCLEVBQUU2USxRQUFRLENBQUM7d0JBQy9DbFMsTUFBTSxDQUFDUixHQUFHLENBQUMsNEJBQTRCLEVBQUU2akIsZ0JBQWdCLENBQUM7d0JBQzFELElBQUlBLGdCQUFnQixFQUFFeGUsT0FBTyxHQUFHa2UsQ0FBQyxDQUFDTSxnQkFBZ0IsQ0FBQzt3QkFBQyxJQUMvQ3hlLE9BQU8sQ0FBQzlJLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ2pCaUUsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLDZCQUE2QixDQUFDO3dCQUFDLGlDQUN0QyxLQUFLO3NCQUFBO3dCQUFBLEtBTWhCbWYsU0FBUzswQkFBQTswQkFBQTt3QkFBQTt3QkFBQTt3QkFBQSxPQUNHRCxhQUFRLENBQUN0YixLQUFLLEVBQUV1YixTQUFTLENBQUM7c0JBQUE7d0JBQXhDdmIsS0FBSztzQkFBQTt3QkFBQSxNQUVIMGQsUUFBUSxLQUFLLFFBQVE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ3ZCLElBQUk5ZCxPQUFPLENBQUM5SSxNQUFNLEVBQUU7MEJBQ2xCaUUsTUFBTSxDQUFDUixHQUFHLENBQUMsWUFBWSxFQUFFMFMsUUFBUSxDQUFDOzBCQUNsQ3JOLE9BQU8sQ0FBQ3RFLE1BQU0sRUFBRTt3QkFDbEIsQ0FBQyxNQUFNUCxNQUFNLENBQUNSLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRTBTLFFBQVEsQ0FBQzt3QkFBQzt3QkFBQTtzQkFBQTt3QkFBQSxNQUMzRHlRLFFBQVEsS0FBSyxRQUFROzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGNBQ3RCL2lCLElBQUk7d0JBQUEsZ0NBQ0wsUUFBUSx3QkFPUixPQUFPLHdCQUlQLFFBQVEsd0JBSVIsT0FBTyx3QkFhUCxPQUFPO3dCQUFBO3NCQUFBO3dCQTNCVkksTUFBTSxDQUFDUixHQUFHLENBQUMsb0JBQW9CLEVBQUV5RixLQUFLLENBQUM7d0JBQ3ZDLElBQUk2ZSxNQUFNLENBQUM3ZSxLQUFLLENBQUMsQ0FBQ3hJLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTswQkFDM0NzbUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUN4aUIsTUFBTSxFQUFFO3dCQUM5Qjt3QkFDQXNFLE9BQU8sQ0FBQ2tmLE1BQU0sQ0FBQzllLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFHdEJqRixNQUFNLENBQUNSLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRXlGLEtBQUssQ0FBQzt3QkFDdENKLE9BQU8sQ0FBQ21mLEtBQUssQ0FBQy9lLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFHckJqRixNQUFNLENBQUNSLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRXlGLEtBQUssQ0FBQzt3QkFDdENKLE9BQU8sQ0FBQ29mLE1BQU0sQ0FBQ2hmLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFJcEJKLE9BQU8sQ0FBQ3FmLEdBQUcsQ0FBQyxPQUFPLENBQUM7d0JBQ3BCQyxXQUFXLENBQUNsZixLQUFLLEVBQUVtZSxlQUFlLEVBQUUsSUFBSSxDQUFDO3dCQUNuQ2dCLEdBQUcsR0FBR2hrQixRQUFRLENBQUNpVixhQUFhLENBQUNuRCxRQUFRLENBQUM7d0JBQzVDa1MsR0FBRyxDQUFDdkYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVN6VixDQUFDLEVBQUU7MEJBQ3hDLElBQUlnYixHQUFHLElBQUloYixDQUFDLENBQUM2RixNQUFNLEVBQUU7NEJBQ25CN0YsQ0FBQyxDQUFDaWIsZUFBZSxFQUFFOzBCQUNyQjswQkFDQUMsWUFBWSxDQUFDcmYsS0FBSyxFQUFFbWUsZUFBZSxDQUFDO3dCQUN0QyxDQUFDLEVBQUUsSUFBSSxDQUFDO3dCQUFDO3NCQUFBO3dCQUFBLE1BS0x6YixRQUFRLENBQUNiLGNBQWMsQ0FBQzFILE9BQU8sQ0FBQ3JCLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUM1RGlDLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLG9DQUFvQyxDQUFDO3dCQUFDO3NCQUFBO3dCQUduRFEsTUFBTSxDQUFDUixHQUFHLENBQUMsa0JBQWtCLEVBQUV5RixLQUFLLENBQUM7d0JBQUMsS0FDbEN3ZSxLQUFLOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBO3dCQUFBLE9BQ09jLGNBQWMsQ0FBQ2QsS0FBSyxFQUFFeGUsS0FBSyxFQUFFeWUsa0JBQWtCLENBQUM7c0JBQUE7d0JBQTlEemUsS0FBSztzQkFBQTt3QkFFUGtmLFdBQVcsQ0FBQ2xmLEtBQUssRUFBRW1lLGVBQWUsQ0FBQzt3QkFBQyxLQUVoQ0QsVUFBVTswQkFBQTswQkFBQTt3QkFBQTt3QkFDTjVJLE1BQU0sR0FBR2plLE1BQU0sQ0FBQ3NuQixVQUFVLENBQUN2bUIsa0JBQWtCLENBQUMsQ0FBQ3dtQixPQUFPO3dCQUFBLHlEQUN4Q1YsVUFBVTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTswQkFBQTswQkFBQTt3QkFBQTt3QkFBbkJoVyxLQUFLO3dCQUFBLGNBQ05BLEtBQUs7d0JBQUEsZ0NBQ04sWUFBWSx3QkEwQlosWUFBWTt3QkFBQTtzQkFBQTt3QkF6QmZuTixNQUFNLENBQUNSLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQzt3QkFBQyxLQUN0QythLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ1JqZSxNQUFNLENBQUM2RCxHQUFHLENBQUMwZSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTJGLFlBQVksQ0FBQzt3QkFBQzt3QkFBQSxPQUN6Q3ZiLE9BQU8sQ0FBQzROLEdBQUcsQ0FBQyxDQUMvQnhELHNCQUFzQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFDakNBLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FDbEMsQ0FBQztzQkFBQTt3QkFBQTt3QkFBQTt3QkFIS29SLENBQUM7d0JBQUVuVSxDQUFDO3dCQUlYLElBQUksT0FBT21VLENBQUMsS0FBSyxRQUFRLElBQUksT0FBT25VLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQ21VLENBQUMsQ0FBQ2hvQixRQUFRLENBQUM2VCxDQUFDLENBQUMsRUFBRTswQkFDcEUsSUFBSWhVLE1BQU0sQ0FBQzZkLE9BQU8sSUFBSSxPQUFPN2QsTUFBTSxDQUFDNmQsT0FBTyxDQUFDdUssU0FBUyxLQUFLLFVBQVUsRUFBRTs0QkFDcEUsSUFBSXBvQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ3FYLFVBQVUsS0FBSyxVQUFVLEVBQUU7OEJBQ2pEbmIsTUFBTSxDQUFDNkQsR0FBRyxDQUFDMGUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQU07Z0NBQ3hDLElBQUl2aUIsTUFBTSxDQUFDNmQsT0FBTyxDQUFDd0ssS0FBSyxLQUFLLFVBQVUsRUFBRXJvQixNQUFNLENBQUM2ZCxPQUFPLENBQUN1SyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztnQ0FDakZwb0IsTUFBTSxDQUFDNkQsR0FBRyxDQUFDMGUsZ0JBQWdCLENBQUMsVUFBVSxFQUFFMkYsWUFBWSxFQUFFO2tDQUFDSSxJQUFJLEVBQUU7Z0NBQUksQ0FBQyxDQUFDOzhCQUNyRSxDQUFDLENBQUM7NEJBQ0osQ0FBQyxNQUFNOzhCQUNMLElBQUl0b0IsTUFBTSxDQUFDNmQsT0FBTyxDQUFDd0ssS0FBSyxLQUFLLFVBQVUsRUFBRXJvQixNQUFNLENBQUM2ZCxPQUFPLENBQUN1SyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQzs4QkFDakZwb0IsTUFBTSxDQUFDNkQsR0FBRyxDQUFDMGUsZ0JBQWdCLENBQUMsVUFBVSxFQUFFMkYsWUFBWSxFQUFFO2dDQUFDSSxJQUFJLEVBQUU7OEJBQUksQ0FBQyxDQUFDOzRCQUNyRTswQkFDRjt3QkFDRjt3QkFDQWhhLFNBQVMsQ0FBQ2pOLFlBQVksRUFBRTZtQixZQUFZLENBQUM7d0JBQUM7d0JBQUE7c0JBQUE7d0JBRXRDbG9CLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUN3ZSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUyRixZQUFZLEVBQUU7MEJBQUNJLElBQUksRUFBRTt3QkFBSSxDQUFDLENBQUM7c0JBQUM7d0JBQUE7c0JBQUE7d0JBSWpHNWtCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDZCQUE2QixDQUFDO3dCQUN6Q2xELE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUN3ZSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUyRixZQUFZLEVBQUU7MEJBQUNJLElBQUksRUFBRTt3QkFBSSxDQUFDLENBQUM7d0JBQUM7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBSy9GO3dCQUNBeGlCLFVBQVUsQ0FBQyxZQUFNOzBCQUNmb2lCLFlBQVksRUFBRTt3QkFDaEIsQ0FBQyxFQUFFeGlCLE9BQU8sQ0FBQztzQkFBQzt3QkFBQTtzQkFBQTt3QkFLaEJoQyxNQUFNLENBQUNxQixNQUFNLGlCQUFVekIsSUFBSSxzQ0FBNEIraUIsUUFBUSxFQUFHO3dCQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBLE1BRzlEQSxRQUFRLEtBQUssTUFBTTswQkFBQTswQkFBQTt3QkFBQTt3QkFBQSxjQUNwQi9pQixJQUFJO3dCQUFBLGdDQUNMLE1BQU0seUJBSU4sTUFBTSx5QkFJTixpQkFBaUIseUJBUWpCLFVBQVUseUJBSVYsYUFBYSx5QkFJYixlQUFlO3dCQUFBO3NCQUFBO3dCQXZCbEJJLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLGdCQUFnQixFQUFFeUYsS0FBSyxDQUFDO3dCQUNuQ0osT0FBTyxDQUFDZ2dCLElBQUksQ0FBQzVmLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFHcEJqRixNQUFNLENBQUNSLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRXlGLEtBQUssQ0FBQzt3QkFDbkNKLE9BQU8sQ0FBQ2lnQixJQUFJLENBQUM3ZixLQUFLLENBQUM7d0JBQUM7c0JBQUE7d0JBSWxCakYsTUFBTSxDQUFDUixHQUFHLENBQUMsa0JBQWtCLEVBQUV5RixLQUFLLENBQUM7d0JBQy9CTixlQUFlLEdBQUdrQixJQUFJLENBQUNDLEtBQUssQ0FBQ2IsS0FBSyxDQUFDO3dCQUN6Q2pGLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLHFCQUFxQixFQUFFbUYsZUFBZSxDQUFDO3dCQUNsREYsZUFBZSxDQUFDSSxPQUFPLEVBQUVGLGVBQWUsQ0FBQzt3QkFBQztzQkFBQTt3QkFJNUMzRSxNQUFNLENBQUNSLEdBQUcsNEJBQXFCcUYsT0FBTyxvQkFBVUksS0FBSyxFQUFHO3dCQUN4REosT0FBTyxDQUFDa2dCLFFBQVEsQ0FBQzlmLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFHeEJqRixNQUFNLENBQUNSLEdBQUcsNkJBQXNCcUYsT0FBTyxvQkFBVUksS0FBSyxFQUFHO3dCQUN6REosT0FBTyxDQUFDbWdCLFdBQVcsQ0FBQy9mLEtBQUssQ0FBQzt3QkFBQztzQkFBQTt3QkFHM0JqRixNQUFNLENBQUNSLEdBQUcsd0NBQWlDcUYsT0FBTyxpQkFBT0ksS0FBSyxFQUFHO3dCQUNqRSxJQUFJa2UsVUFBVSxFQUFFOzBCQUFBLDBEQUNNQSxVQUFVOzBCQUFBOzRCQUE5Qix1REFBZ0M7OEJBQXJCaFcsTUFBSzs4QkFDZCxJQUFJQSxNQUFLLElBQUksV0FBVyxFQUFFO2dDQUFBO2tDQUN4Qm5OLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2tDQUN4QyxJQUFNeWxCLGFBQWEsR0FBRzNvQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQzhrQixLQUFLO2tDQUMvQzVvQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ3llLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFVBQUN6VixDQUFDLEVBQUs7b0NBQzlEaEgsVUFBVSxDQUFDLFlBQU07c0NBQ2YraUIsNEJBQTRCLENBQUMvYixDQUFDLEVBQUVuRSxLQUFLLEVBQUVnZ0IsYUFBYSxDQUFDO29DQUN2RCxDQUFDLEVBQUUsS0FBSyxDQUFDO2tDQUNYLENBQUMsQ0FDQTtnQ0FBQzs4QkFDSjs0QkFDRjswQkFBQzs0QkFBQTswQkFBQTs0QkFBQTswQkFBQTt3QkFDSDt3QkFBQztzQkFBQTt3QkFHRGpsQixNQUFNLENBQUNSLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRUksSUFBSSxDQUFDO3dCQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBLE1BR25DK2lCLFFBQVEsS0FBSyxjQUFjOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUNwQzNpQixNQUFNLENBQUNSLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRWlqQixTQUFTLEVBQUV4ZCxLQUFLLENBQUM7d0JBQUMsY0FDNUN3ZCxTQUFTO3dCQUFBLGdDQUNWLEtBQUsseUJBR0wsT0FBTzt3QkFBQTtzQkFBQTt3QkFGVjVkLE9BQU8sQ0FBQ3VnQixHQUFHLENBQUMsU0FBUyxnQkFBU25nQixLQUFLLENBQUN2QixJQUFJLEVBQUUsT0FBSTt3QkFBQztzQkFBQTt3QkFHL0M7d0JBQ00yaEIsUUFBUSxHQUFHcGdCLEtBQUssQ0FBQzdCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ00sSUFBSSxFQUFFLEVBQzNDO3dCQUNNNGhCLGFBQWEsR0FBR3JnQixLQUFLLENBQUM3QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLElBQUksRUFBRTt3QkFFaERtQixPQUFPLENBQUN1Z0IsR0FBRyxDQUFDQyxRQUFRLEVBQUVDLGFBQWEsRUFBRSxZQUFZLENBQUM7d0JBQUM7c0JBQUE7d0JBR25ELElBQUlyZ0IsS0FBSyxDQUFDeEksUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzBCQUM5QndJLEtBQUssR0FBR2djLFFBQVEsQ0FBQ2hjLEtBQUssQ0FBQzt3QkFDekI7d0JBQ0FKLE9BQU8sQ0FBQzBnQixJQUFJLENBQUM5QyxTQUFTLEVBQUV4ZCxLQUFLLENBQUM7d0JBQzlCakYsTUFBTSxDQUFDUixHQUFHLENBQUMsMENBQTBDLEVBQUVpakIsU0FBUyxFQUFFeGQsS0FBSyxDQUFDO3dCQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBLE1BR3BFMGQsUUFBUSxLQUFLLFNBQVM7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQy9CM2lCLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLGFBQWEsRUFBRXlGLEtBQUssQ0FBQzt3QkFDaENKLE9BQU8sQ0FBQ3JKLFVBQVUsQ0FBQ3lKLEtBQUssQ0FBQzt3QkFBQzt3QkFBQTtzQkFBQTt3QkFBQSxNQUNqQjBkLFFBQVEsS0FBSyxNQUFNOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUM1QjNpQixNQUFNLENBQUNSLEdBQUcsQ0FBQyxZQUFZLEVBQUUrakIsZUFBZSxFQUFFQyxlQUFlLENBQUM7d0JBQ3BEZ0MsRUFBRSxHQUFHbHBCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDaVYsYUFBYSxDQUFDa08sZUFBZSxDQUFDO3dCQUN2RGtDLEVBQUUsR0FBR25wQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQ21PLGVBQWUsQ0FBQzt3QkFDN0RrQyxTQUFTLENBQUNGLEVBQUUsRUFBRUMsRUFBRSxDQUFDO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUFBLE1BQ1Q5QyxRQUFRLEtBQUssY0FBYzswQkFBQTswQkFBQTt3QkFBQTt3QkFDcEMzaUIsTUFBTSxDQUFDUixHQUFHLENBQUMsb0JBQW9CLEVBQUV5RixLQUFLLENBQUM7d0JBQ3ZDSixPQUFPLENBQUNvZixNQUFNLG1CQUFZaGYsS0FBSyxlQUFZO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUFBLE1BQ25DMGQsUUFBUSxLQUFLLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQzVCM2lCLE1BQU0sQ0FBQ1IsR0FBRyxrQkFBVytqQixlQUFlLGlCQUFPQyxlQUFlLEVBQUc7d0JBQ3ZEbUMsTUFBTSxHQUFHcnBCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDaVYsYUFBYSxDQUFDa08sZUFBZSxDQUFDO3dCQUMzRHFDLFdBQVcsR0FBR3RwQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQ21PLGVBQWUsQ0FBQzt3QkFDdEVtQyxNQUFNLENBQUNwbEIsTUFBTSxFQUFFO3dCQUNmcWxCLFdBQVcsQ0FBQy9rQixPQUFPLENBQUM4a0IsTUFBTSxDQUFDO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUFBLE1BQ25CaEQsUUFBUSxLQUFLLG1CQUFtQjswQkFBQTswQkFBQTt3QkFBQTt3QkFBQTt3QkFBQSxPQUN2QjRCLGNBQWMsQ0FBQ2QsS0FBSyxFQUFFeGUsS0FBSyxFQUFFeWUsa0JBQWtCLENBQUM7c0JBQUE7d0JBQTVEOWdCLEdBQUc7d0JBQ1RpQyxPQUFPLENBQUNrZixNQUFNLENBQUNuaEIsR0FBRyxDQUFDO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUFBLE1BQ1grZixRQUFRLEtBQUssZ0JBQWdCOzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBLGNBQzlCL2lCLElBQUk7d0JBQUEsZ0NBQ0wsWUFBWSx5QkFlWixhQUFhO3dCQUFBO3NCQUFBO3dCQUFBLHNCQWRBNEwsS0FBSyxDQUFDQyxJQUFJLENBQUM1RyxPQUFPLENBQUM7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQXhCdUUsQ0FBQzt3QkFBQSxzQkFDTkEsQ0FBQyxDQUFDNE0sU0FBUyx5Q0FBWCxhQUFhdlosUUFBUSxDQUFDLElBQUksQ0FBQzswQkFBQTswQkFBQTt3QkFBQTt3QkFDN0IyTSxDQUFDLENBQUM0TSxTQUFTLEdBQUdoYSxjQUFjLENBQUNvTixDQUFDLENBQUM0TSxTQUFTLENBQUMsQ0FBQzVTLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLFVBQUN3aUIsUUFBUTswQkFBQSxPQUNqRUEsUUFBUSxDQUFDemlCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLFVBQUN5aUIsSUFBSTs0QkFBQSxPQUFLQSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsaUJBQWlCLEVBQUUsR0FBR0YsSUFBSSxDQUFDcE4sS0FBSyxDQUFDLENBQUMsQ0FBQzswQkFBQSxFQUFDLENBQUNKLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQUEsRUFDaEcsQ0FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFBQztzQkFBQTt3QkFHZmxQLENBQUMsQ0FBQzRNLFNBQVMsR0FBR2hhLGNBQWMsQ0FBQ29OLENBQUMsQ0FBQzRNLFNBQVMsQ0FBQyxDQUNwQzVTLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDVkMsR0FBRyxDQUFDLFVBQUN5aUIsSUFBSTswQkFBQSxPQUFLQSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsaUJBQWlCLEVBQUUsR0FBR0YsSUFBSSxDQUFDcE4sS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFBQSxFQUFDLENBQ2pFSixJQUFJLENBQUMsR0FBRyxDQUFDO3NCQUFDO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBLE1BVVpxSyxRQUFRLEtBQUssY0FBYzswQkFBQTswQkFBQTt3QkFBQTt3QkFBQTt3QkFBQSxPQUNYc0QsaUJBQWlCLEVBQUU7c0JBQUE7d0JBQXRDQyxVQUFVO3dCQUNoQnJoQixPQUFPLENBQUNnZ0IsSUFBSSxDQUFDcUIsVUFBVSxDQUFDO3dCQUFDO3dCQUFBO3NCQUFBO3dCQUV6QmxtQixNQUFNLENBQUNxQixNQUFNLENBQUMsNkJBQTZCLEVBQUVzaEIsUUFBUSxDQUFDO3NCQUFDO3NCQUFBO3dCQUFBO29CQUFBO2tCQUFBO2dCQUFBO2NBQUEsQ0FFMUQ7Y0FBQSxTQXhSa0NPLFdBQVc7Z0JBQUE7Y0FBQTtjQUFBLE9BQVhBLFdBQVc7WUFBQTtZQTBSeEMrQyxpQkFBaUI7Y0FBQSxzRUFBRztnQkFBQTtnQkFBQTtrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTt3QkFBQSxPQUNFNVMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztzQkFBQTt3QkFBQTt3QkFBQTt3QkFBdERoSCxJQUFJO3dCQUFFZ0wsR0FBRzt3QkFBQTt3QkFBQSxPQUNVOEssaUJBQWlCLEVBQUUsQ0FBQzFaLEdBQUcsQ0FBQzRPLEdBQUcsQ0FBQztzQkFBQTt3QkFBaER2VixXQUFXO3dCQUNYYyxHQUFHLEdBQUd5SixJQUFJLEdBQUd2SyxXQUFXLENBQUNxa0IsWUFBWSxHQUFHLEdBQUcsR0FBRzlPLEdBQUcsR0FBRyxHQUFHO3dCQUFBLGtDQUN0RHpVLEdBQUc7c0JBQUE7c0JBQUE7d0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Y0FBQSxDQUNYO2NBQUEsZ0JBTEtxakIsaUJBQWlCO2dCQUFBO2NBQUE7WUFBQTtZQU1qQkcsY0FBYyxHQUFHLFNBQWpCQSxjQUFjLENBQUluaEIsS0FBSyxFQUFFb2hCLE9BQU8sRUFBSztjQUN6QyxJQUFJcGhCLEtBQUssSUFBSW9oQixPQUFPLENBQUM1cEIsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7Z0JBQ3hENHBCLE9BQU8sR0FBRzdxQixVQUFVLENBQUM2cUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFcGhCLEtBQUssQ0FBQztjQUNqRTtjQUNBLE9BQU9vaEIsT0FBTztZQUNoQixDQUFDO1lBQ0s5QixjQUFjO2NBQUEsdUVBQUcsa0JBQU8za0IsSUFBSSxFQUFFcUYsS0FBSyxFQUFFeWUsa0JBQWtCO2dCQUFBO2dCQUFBO2tCQUFBO29CQUFBO3NCQUFBO3dCQUFBLE1BRTNDQSxrQkFBa0IsS0FBSyxRQUFROzBCQUFBOzBCQUFBO3dCQUFBO3dCQUFBO3dCQUFBLE9BQ3pDclEsc0JBQXNCLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBLE9BQzdEQSxzQkFBc0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUM7c0JBQUE7d0JBQUE7c0JBQUE7d0JBRnJEaUUsT0FBTzt3QkFHVDFVLEdBQUcsR0FBRyxJQUFJO3dCQUFBLE1BQ1YsQ0FBQzBVLE9BQU8sSUFBSUEsT0FBTyxDQUFDdmIsTUFBTSxLQUFLLENBQUM7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQ2xDaUUsTUFBTSxDQUFDUixHQUFHLENBQUMsY0FBYyxDQUFDO3dCQUFDLGtDQUNwQixJQUFJO3NCQUFBO3dCQUFBO3dCQUFBLE9BRWEyaUIsaUJBQWlCLEVBQUUsQ0FBQzFaLEdBQUcsQ0FBQzZPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztzQkFBQTt3QkFBdkR4VixXQUFXO3dCQUFBLGVBQ1RsQyxJQUFJO3dCQUFBLGtDQUNMLHFCQUFxQix5QkFNckIsbUJBQW1CLHlCQU1uQixrQkFBa0I7d0JBQUE7c0JBQUE7d0JBWHJCZ0QsR0FBRyxHQUFHd2pCLGNBQWMsQ0FBQ3RrQixXQUFXLENBQUN3a0IsbUJBQW1CLENBQUN0VyxRQUFRLEVBQUUsQ0FDMURyVSxPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLEVBQUVzSixLQUFLLENBQUM7d0JBQ2xEakYsTUFBTSxDQUFDUixHQUFHLENBQUMsZ0NBQWdDLEVBQUVzQyxXQUFXLENBQUN3a0IsbUJBQW1CLENBQUM7d0JBQUM7c0JBQUE7d0JBSTlFMWpCLEdBQUcsR0FBR3dqQixjQUFjLENBQUN0a0IsV0FBVyxDQUFDeWtCLG1CQUFtQixDQUFDdlcsUUFBUSxFQUFFLENBQzFEclUsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxFQUFFc0osS0FBSyxDQUFDO3dCQUNsRGpGLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDJCQUEyQixFQUFFc0MsV0FBVyxDQUFDeWtCLG1CQUFtQixDQUFDO3dCQUFDO3NCQUFBO3dCQUl6RTNqQixHQUFHLEdBQUd3akIsY0FBYyxDQUFDdGtCLFdBQVcsQ0FBQzBrQixrQkFBa0IsQ0FBQ3hXLFFBQVEsRUFBRSxDQUN6RHJVLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsRUFBRXNKLEtBQUssQ0FBQzt3QkFDbERqRixNQUFNLENBQUNSLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRXNDLFdBQVcsQ0FBQzBrQixrQkFBa0IsQ0FBQzt3QkFBQztzQkFBQTt3QkFJN0V4bUIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDLHFEQUFxRCxHQUFFekIsSUFBSSxDQUFDO3NCQUFDO3dCQUFBLGtDQUV4RWdELEdBQUc7c0JBQUE7c0JBQUE7d0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Y0FBQSxDQUNYO2NBQUEsZ0JBbENLMmhCLGNBQWM7Z0JBQUE7Y0FBQTtZQUFBO1lBbUNkWSw0QkFBNEI7Y0FBQSx1RUFBRyxrQkFBT2hZLEtBQUssRUFBRXNaLE1BQU0sRUFBRXhCLGFBQWE7Z0JBQUE7Z0JBQUE7a0JBQUE7b0JBQUE7c0JBQUE7d0JBQ2hFeUIsWUFBWSxHQUFHLENBQUNsYixLQUFLLENBQUM0SCxPQUFPLENBQUNxVCxNQUFNLENBQUMsR0FBRyxDQUFDQSxNQUFNLENBQUMsR0FBR0EsTUFBTTt3QkFBQSwwREFDckNDLFlBQVk7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQTNCQyxXQUFXO3dCQUFBLEtBQ2hCcnFCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDd21CLE1BQU07MEJBQUE7MEJBQUE7d0JBQUE7d0JBQzVCdHFCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDOGtCLEtBQUssR0FBR3lCLFdBQVc7d0JBQUM7d0JBQUEsT0FDbEN0ZCxLQUFLLENBQUMsSUFBSSxDQUFDO3NCQUFBO3dCQUNqQi9NLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDOGtCLEtBQUssR0FBR0QsYUFBYTt3QkFBQzt3QkFBQSxPQUNwQzViLEtBQUssQ0FBQyxJQUFJLENBQUM7c0JBQUE7d0JBQUE7d0JBQUE7c0JBQUE7d0JBRWpCL00sTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUM4a0IsS0FBSyxHQUFHRCxhQUFhO3NCQUFDO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUc5QyxJQUFJLENBQUMzb0IsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUN3bUIsTUFBTSxFQUFFOzBCQUMvQnRxQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQzhrQixLQUFLLEdBQUdELGFBQWE7d0JBQzNDLENBQUMsTUFBTTswQkFDTEUsNEJBQTRCLENBQUNoWSxLQUFLLEVBQUVzWixNQUFNLEVBQUV4QixhQUFhLENBQUM7d0JBQzVEO3NCQUFDO3NCQUFBO3dCQUFBO29CQUFBO2tCQUFBO2dCQUFBO2NBQUEsQ0FDRjtjQUFBLGdCQWpCS0UsNEJBQTRCO2dCQUFBO2NBQUE7WUFBQTtZQW1CNUIwQixnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUkxWixLQUFLLEVBQUs7Y0FDbEMsSUFBTTlHLEVBQUUsR0FBRzhHLEtBQUssQ0FBQzhCLE1BQU0sQ0FBQzVJLEVBQUU7Y0FDMUIsSUFBSUEsRUFBRSxJQUFJQSxFQUFFLEtBQUssbUJBQW1CLEVBQUU7Z0JBQ3BDMGMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUN4aUIsTUFBTSxFQUFFO2dCQUNoQ2pFLE1BQU0sQ0FBQ3dxQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUVELGdCQUFnQixFQUFFLElBQUksQ0FBQztnQkFDM0R2cUIsTUFBTSxDQUFDd3FCLG1CQUFtQixDQUFDLFVBQVUsRUFBRUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2NBQ2hFO1lBQ0YsQ0FBQztZQUVLRSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUk1WixLQUFLLEVBQUs7Y0FDbEMsSUFBTTdNLFNBQVMsR0FBRzZNLEtBQUssQ0FBQzhCLE1BQU0sQ0FBQzNPLFNBQVM7Y0FDeEMsSUFBSUEsU0FBUyxJQUFJQSxTQUFTLENBQUNHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUN4RHNpQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQ2lFLElBQUksRUFBRTtnQkFDOUIxcUIsTUFBTSxDQUFDd3FCLG1CQUFtQixDQUFDLE9BQU8sRUFBRUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2dCQUMzRHpxQixNQUFNLENBQUN3cUIsbUJBQW1CLENBQUMsVUFBVSxFQUFFQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7Y0FDaEU7WUFDRixDQUFDO1lBRUt2QyxZQUFZLEdBQUcsU0FBZkEsWUFBWSxHQUFTO2NBQ3pCLElBQUlsb0IsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUN3bUIsTUFBTSxFQUFFO2NBQ2hDLElBQUlqZixRQUFRLENBQUNiLGNBQWMsQ0FBQzFILE9BQU8sQ0FBQ3JCLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Y0FDOUQrSSxjQUFjLENBQUNHLE9BQU8sQ0FBQ2xKLGtCQUFrQixFQUFFLENBQUMsQ0FBQztjQUM3QyxJQUFNa3BCLE1BQU0sR0FBRzNxQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztjQUNwRSxJQUFJNFIsTUFBTSxFQUFFQSxNQUFNLENBQUMvaEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU07Y0FDNUM1SSxNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQzhtQixjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQ2hpQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTztjQUNsRjVJLE1BQU0sQ0FBQ3VpQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVnSSxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7Y0FDeER2cUIsTUFBTSxDQUFDdWlCLGdCQUFnQixDQUFDLFVBQVUsRUFBRWdJLGdCQUFnQixFQUFFLElBQUksQ0FBQztjQUUzRHZxQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDeW1CLG1CQUFtQixDQUFDLFlBQVksRUFBRXRDLFlBQVksRUFBRTtnQkFDbEZJLElBQUksRUFBRTtjQUNSLENBQUMsQ0FBQztjQUNGdG9CLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDQyxlQUFlLENBQUN5bUIsbUJBQW1CLENBQUMsTUFBTSxFQUFFdEMsWUFBWSxFQUFFO2dCQUM1RUksSUFBSSxFQUFFO2NBQ1IsQ0FBQyxDQUFDO2NBQ0Z0b0IsTUFBTSxDQUFDNkQsR0FBRyxDQUFDMm1CLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFdEMsWUFBWSxDQUFDO2NBQ2hFbG9CLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQzJtQixtQkFBbUIsQ0FBQyxVQUFVLEVBQUV0QyxZQUFZLEVBQUU7Z0JBQ3ZESSxJQUFJLEVBQUU7Y0FDUixDQUFDLENBQUM7Y0FFRnhpQixVQUFVLENBQUMsWUFBTTtnQkFDZjJnQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQ3hpQixNQUFNLEVBQUU7Z0JBQ2hDakUsTUFBTSxDQUFDd3FCLG1CQUFtQixDQUFDLE9BQU8sRUFBRUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2dCQUMzRHZxQixNQUFNLENBQUN3cUIsbUJBQW1CLENBQUMsVUFBVSxFQUFFRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7Y0FDaEUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUNYLENBQUM7WUFFS3ZDLFlBQVksR0FBRyxTQUFmQSxZQUFZLENBQUlyZixLQUFLLEVBQUVtZSxlQUFlLEVBQUs7Y0FDL0MsSUFBSTltQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ3dtQixNQUFNLEVBQUU7Y0FDaEMsSUFBTUssTUFBTSxHQUFHM3FCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDaVYsYUFBYSxDQUFDLGtCQUFrQixDQUFDO2NBQ3BFLElBQUk0UixNQUFNLEVBQUVBLE1BQU0sQ0FBQy9oQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTTtjQUM1QyxJQUFJLENBQUM1SSxNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFOE8sV0FBVyxDQUFDbGYsS0FBSyxFQUFFbWUsZUFBZSxFQUFFLElBQUksQ0FBQztjQUN2RzltQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDblEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU87Y0FFbEY1SSxNQUFNLENBQUN1aUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFa0ksZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO1lBQzFELENBQUM7WUFFSzVDLFdBQVcsR0FBRyxTQUFkQSxXQUFXLENBQUlsZixLQUFLLEVBQUVtZSxlQUFlLEVBQW9CO2NBQUEsSUFBbEIrRCxPQUFPLHVFQUFDLEtBQUs7Y0FDeEQ7Y0FDQSxJQUFNQyxZQUFZLEdBQUc5cUIsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNPLGFBQWEsQ0FBQyxLQUFLLENBQUM7Y0FDN0Q7Y0FDQXltQixZQUFZLENBQUM5bUIsU0FBUyxDQUFDUSxHQUFHLENBQUMsbUJBQW1CLENBQUM7Y0FDL0MsSUFBSXFtQixPQUFPLEVBQUVDLFlBQVksQ0FBQzltQixTQUFTLENBQUNRLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztjQUM1RCxJQUFJLENBQUNxbUIsT0FBTyxFQUFFQyxZQUFZLENBQUMvZ0IsRUFBRSxHQUFHLG1CQUFtQjs7Y0FFbkQ7Y0FDQSxJQUFNZ2hCLGdCQUFnQixHQUFHL3FCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDTyxhQUFhLENBQUMsUUFBUSxDQUFDO2NBQ3BFLElBQU0ybUIscUJBQXFCLEdBQUdILE9BQU8sR0FBRyxpQ0FBaUMsR0FBRyx3QkFBd0I7Y0FDcEdFLGdCQUFnQixDQUFDL21CLFNBQVMsQ0FBQ1EsR0FBRyxDQUFDd21CLHFCQUFxQixDQUFDO2NBQ3JERCxnQkFBZ0IsQ0FBQ3JSLFNBQVMsR0FBRyxHQUFHO2NBQ2hDLElBQUltUixPQUFPLEVBQUU7Z0JBQ1hFLGdCQUFnQixDQUFDRSxPQUFPLEdBQUcsWUFBTTtrQkFDL0J4RSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQ2lFLElBQUksRUFBRTtrQkFDOUIxcUIsTUFBTSxDQUFDd3FCLG1CQUFtQixDQUFDLE9BQU8sRUFBRUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO2dCQUM3RCxDQUFDO2NBQ0gsQ0FBQyxNQUFNO2dCQUNMTSxnQkFBZ0IsQ0FBQ0UsT0FBTyxHQUFHLFlBQU07a0JBQy9CeEUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUN4aUIsTUFBTSxFQUFFO2tCQUNoQ2pFLE1BQU0sQ0FBQ3dxQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUVELGdCQUFnQixFQUFFLElBQUksQ0FBQztnQkFDN0QsQ0FBQztjQUNIO2NBRUEsSUFBSXpELGVBQWUsRUFBRTtnQkFDbkIsSUFBTW9FLFFBQVEsR0FBR2hjLEtBQUssQ0FBQ0MsSUFBSSxDQUFDblAsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUM4VixnQkFBZ0IsQ0FBQ2tOLGVBQWUsQ0FBQyxDQUFDO2dCQUNsRixPQUFPbmUsS0FBSyxDQUFDeEksUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJK3FCLFFBQVEsQ0FBQ3pyQixNQUFNLEdBQUcsQ0FBQyxFQUFFO2tCQUMzRGtKLEtBQUssR0FBR0EsS0FBSyxDQUFDdEosT0FBTyxDQUFDLGFBQWEsRUFBRTZyQixRQUFRLENBQUN0RixLQUFLLEVBQUUsQ0FBQ3VGLEdBQUcsQ0FBQztnQkFDNUQ7Y0FDRjs7Y0FFQTtjQUNBLElBQU1DLFFBQVEsR0FBR3ByQixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLFVBQVUsQ0FBQztjQUM5RCttQixRQUFRLENBQUNDLFNBQVMsR0FBRzFpQixLQUFLLENBQUN2QixJQUFJLEVBQUU7Y0FDakMsSUFBTWtrQixLQUFLLEdBQUdGLFFBQVEsQ0FBQ0csT0FBTyxDQUFDQyxVQUFVO2NBQ3pDRixLQUFLLENBQUNyaUIsV0FBVyxDQUFDOGhCLGdCQUFnQixDQUFDO2NBQ25DRCxZQUFZLENBQUM3aEIsV0FBVyxDQUFDcWlCLEtBQUssQ0FBQzs7Y0FFL0I7Y0FDQTdFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDeGlCLE1BQU0sRUFBRTtjQUNoQ2pFLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDZ2UsSUFBSSxDQUFDN1ksV0FBVyxDQUFDNmhCLFlBQVksQ0FBQztZQUNwRCxDQUFDO1lBRUsxQixTQUFTLEdBQUcsU0FBU0EsU0FBUyxDQUFDRixFQUFFLEVBQUVDLEVBQUUsRUFBRTtjQUMzQyxJQUFNc0MsRUFBRSxHQUFHdkMsRUFBRSxDQUFDd0MsVUFBVTtjQUN4QixJQUFNQyxFQUFFLEdBQUd4QyxFQUFFLENBQUN1QyxVQUFVO2NBQ3hCLElBQUlFLEVBQUU7Y0FDTixJQUFJQyxFQUFFO2NBRU4sSUFBSSxDQUFDSixFQUFFLElBQUksQ0FBQ0UsRUFBRSxJQUFJRixFQUFFLENBQUNLLFdBQVcsQ0FBQzNDLEVBQUUsQ0FBQyxJQUFJd0MsRUFBRSxDQUFDRyxXQUFXLENBQUM1QyxFQUFFLENBQUMsRUFBRTtjQUU1RCxLQUFLLElBQUk1Z0IsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHbWpCLEVBQUUsQ0FBQ3pWLFFBQVEsQ0FBQ3ZXLE1BQU0sRUFBRTZJLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxJQUFJbWpCLEVBQUUsQ0FBQ3pWLFFBQVEsQ0FBQzFOLENBQUMsQ0FBQyxDQUFDd2pCLFdBQVcsQ0FBQzVDLEVBQUUsQ0FBQyxFQUFFO2tCQUNsQzBDLEVBQUUsR0FBR3RqQixDQUFDO2dCQUNSO2NBQ0Y7Y0FDQSxLQUFLLElBQUlBLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBR3FqQixFQUFFLENBQUMzVixRQUFRLENBQUN2VyxNQUFNLEVBQUU2SSxHQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSXFqQixFQUFFLENBQUMzVixRQUFRLENBQUMxTixHQUFDLENBQUMsQ0FBQ3dqQixXQUFXLENBQUMzQyxFQUFFLENBQUMsRUFBRTtrQkFDbEMwQyxFQUFFLEdBQUd2akIsR0FBQztnQkFDUjtjQUNGO2NBRUEsSUFBSW1qQixFQUFFLENBQUNLLFdBQVcsQ0FBQ0gsRUFBRSxDQUFDLElBQUlDLEVBQUUsR0FBR0MsRUFBRSxFQUFFO2dCQUNqQ0EsRUFBRSxFQUFFO2NBQ047Y0FDQUosRUFBRSxDQUFDTSxZQUFZLENBQUM1QyxFQUFFLEVBQUVzQyxFQUFFLENBQUN6VixRQUFRLENBQUM0VixFQUFFLENBQUMsQ0FBQztjQUNwQ0QsRUFBRSxDQUFDSSxZQUFZLENBQUM3QyxFQUFFLEVBQUV5QyxFQUFFLENBQUMzVixRQUFRLENBQUM2VixFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBRUtHLGFBQWEsR0FBRyxTQUFoQkEsYUFBYSxHQUFTO2NBQzFCLE9BQU8sSUFBSXJmLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Z0JBQzlCLElBQUksQ0FBQzVNLE1BQU0sQ0FBQ2lzQixNQUFNLEVBQUU7a0JBQ2xCdm9CLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2tCQUN4QyxJQUFNZ3BCLGNBQWMsR0FBR2hrQixXQUFXLENBQUMsWUFBTTtvQkFDdkMsSUFBSWxJLE1BQU0sQ0FBQ2lzQixNQUFNLEVBQUU7c0JBQ2pCamtCLGFBQWEsQ0FBQ2trQixjQUFjLENBQUM7c0JBQzdCdGYsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDZjtrQkFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO2tCQUNOOUcsVUFBVSwwRUFBQztvQkFBQTtzQkFBQTt3QkFBQTswQkFBQTs0QkFDVGtDLGFBQWEsQ0FBQ2trQixjQUFjLENBQUM7NEJBQzdCdGYsT0FBTyxDQUFDLEtBQUssQ0FBQzswQkFBQzswQkFBQTs0QkFBQTt3QkFBQTtzQkFBQTtvQkFBQTtrQkFBQSxDQUNoQixJQUFFLElBQUksQ0FBQztnQkFDVixDQUFDLE1BQU1BLE9BQU8sQ0FBQyxJQUFJLENBQUM7Y0FDdEIsQ0FBQyxDQUFDO1lBQ0osQ0FBQztZQUVLdWYsZ0JBQWdCO2NBQUEsdUVBQUcsa0JBQU83aUIsT0FBTztnQkFBQTtnQkFBQTtrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTt3QkFBQSxPQUMzQjBpQixhQUFhLEVBQUU7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQUEsMERBQ0YxaUIsT0FBTzt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTswQkFBQTswQkFBQTt3QkFBQTt3QkFBakJLLE1BQU07d0JBQUE7d0JBRVR3RCxPQUFNLEdBQUcsS0FBSzt3QkFBQSxLQUNkeEQsTUFBTSxDQUFDcUIsU0FBUzswQkFBQTswQkFBQTt3QkFBQTt3QkFBQTt3QkFBQSxPQUNhaWIscUJBQW9CLENBQUN0YyxNQUFNLENBQUNxQixTQUFTLENBQUM7c0JBQUE7d0JBQS9Ea2IsZ0JBQWdCO3dCQUFBLDBEQUNBQSxnQkFBZ0I7d0JBQUE7d0JBQUE7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQTNCM2QsT0FBTzt3QkFBQTt3QkFBQSxPQUNEcWUsV0FBVyxDQUFDamQsTUFBTSxFQUFFcEIsT0FBTyxDQUFDO3NCQUFBO3dCQUEzQzRFLE9BQU07d0JBQUEsTUFDRkEsT0FBTSxLQUFLLEtBQUs7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQUEsa0NBQ1gsS0FBSztzQkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTt3QkFBQSxPQUdJeVosV0FBVyxDQUFDamQsTUFBTSxDQUFDO3NCQUFBO3dCQUFsQ3dELE9BQU07c0JBQUE7d0JBQUEsTUFDVEEsT0FBTSxLQUFLLEtBQUs7MEJBQUE7MEJBQUE7d0JBQUE7d0JBQUEsa0NBQ1gsS0FBSztzQkFBQTt3QkFBQTt3QkFBQTtzQkFBQTt3QkFBQTt3QkFBQTt3QkFHZHpKLE1BQU0sQ0FBQ3FCLE1BQU0saUNBQTBCd0UsSUFBSSxDQUFDRSxTQUFTLENBQUNFLE1BQU0sQ0FBQyx5QkFBZSxhQUFJM0UsT0FBTyxFQUFHO3dCQUFDO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUFBO3dCQUFBO3NCQUFBO3dCQUsvRnRCLE1BQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQzt3QkFBQyxrQ0FDckMsS0FBSztzQkFBQTtzQkFBQTt3QkFBQTtvQkFBQTtrQkFBQTtnQkFBQTtjQUFBLENBRWY7Y0FBQSxnQkExQktvbkIsZ0JBQWdCO2dCQUFBO2NBQUE7WUFBQSxLQTRCdEI7WUFBQTtZQUFBLE9BQ3FCQSxnQkFBZ0IsQ0FBQzdpQixPQUFPLENBQUM7VUFBQTtZQUF4QzZELE1BQU07WUFBQSxrQ0FDTEEsTUFBTTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ2Q7RUFBQTtBQUFBO0FBQ0QsdURBQWV3WixZQUFZOztBQ3poQjNCO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsTUFBZ0M7QUFDbkQsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsaUJBQWlCO0FBQ3JFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsWUFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsWUFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsTUFBZ0M7QUFDbkQsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsTUFBZ0M7QUFDakQsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRThGOzs7Ozs7Ozs7Ozs7O0FDbk8vRDtBQUN3QjtBQUszQjtBQUlOO0FBSUo7QUFDZ0I7QUFFbEMsSUFBTWpqQixrQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsbUJBQW1CLENBQUM7QUFDOUMsSUFBTTRwQixlQUFlLEdBQUc7RUFBQzdTLE9BQU8sRUFBRSxJQUFJO0VBQUVDLFNBQVMsRUFBRSxJQUFJO0VBQUU2UyxVQUFVLEVBQUU7QUFBSSxDQUFDO0FBQUMsSUFFdERDLFdBQVc7RUFDOUIscUJBQVl6SyxJQUFJLEVBQUU7SUFBQTtJQUNoQixJQUFPMEssdUJBQXVCLEdBQXdEMUssSUFBSSxDQUFuRjBLLHVCQUF1QjtNQUFFbmpCLFNBQVMsR0FBNkN5WSxJQUFJLENBQTFEelksU0FBUztNQUFFMlosaUJBQWlCLEdBQTBCbEIsSUFBSSxDQUEvQ2tCLGlCQUFpQjtNQUFFM2IsVUFBVSxHQUFjeWEsSUFBSSxDQUE1QnphLFVBQVU7TUFBRTZYLFFBQVEsR0FBSTRDLElBQUksQ0FBaEI1QyxRQUFRO0lBQ2xGLElBQUksQ0FBQ3VOLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDeEIsSUFBSSxDQUFDdk4sUUFBUSxHQUFHQSxRQUFRO0lBQ3hCLElBQUksQ0FBQzdWLFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUNoQyxVQUFVLEdBQUdBLFVBQVU7SUFDNUIsSUFBSSxDQUFDcWxCLG9CQUFvQixHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUNDLG9CQUFvQixHQUFHLEVBQUU7SUFDOUIsSUFBSSxDQUFDM0osaUJBQWlCLEdBQUdBLGlCQUFpQjtJQUMxQyxJQUFJLENBQUN3Six1QkFBdUIsR0FBR0EsdUJBQXVCO0lBQ3RELElBQUksQ0FBQ0ksUUFBUSxHQUFHNXNCLE1BQU0sQ0FBQ3NuQixVQUFVLENBQUN2bUIsa0JBQWtCLENBQUMsQ0FBQ3dtQixPQUFPO0VBQy9EO0VBQUM7SUFBQTtJQUFBO01BQUEsK0VBRUQ7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNRc0YsYUFBYSxHQUFHLEVBQUU7Z0JBQUEsa0RBQ0EsSUFBSSxDQUFDN0osaUJBQWlCO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQW5DTSxTQUFTO2dCQUFBO2dCQUFBLEtBRVpBLFNBQVMsQ0FBQzdMLHNCQUFzQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUNwQ29WLGFBQWEsQ0FBQzlZLElBQUksQ0FBQyxJQUFJLENBQUMrWSxXQUFXLENBQUN4SixTQUFTLENBQUMsQ0FBQztnQkFBQztnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUVoRDVmLGtCQUFNLENBQUNxQixNQUFNLGdDQUF5QnVlLFNBQVMsQ0FBQ3ZaLEVBQUUsZUFBSyxZQUFJL0UsT0FBTyxlQUFPLEVBQUc7Y0FBQztnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBLE9BRzNFMkgsT0FBTyxDQUFDNE4sR0FBRyxDQUFDc1MsYUFBYSxDQUFDO2NBQUE7Z0JBQ2hDLElBQUksQ0FBQ0UsdUJBQXVCLEVBQUU7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDaEM7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBO01BQUEsOEVBRUQsa0JBQWtCekosU0FBUztRQUFBO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFFdkJ2WixFQUFFLEdBU0F1WixTQUFTLENBVFh2WixFQUFFLEVBQ0ZULE9BQU8sR0FRTGdhLFNBQVMsQ0FSWGhhLE9BQU8sRUFDUDBqQixrQkFBa0IsR0FPaEIxSixTQUFTLENBUFgwSixrQkFBa0IsRUFDbEJDLE1BQU0sR0FNSjNKLFNBQVMsQ0FOWDJKLE1BQU0sRUFDTnhWLHNCQUFzQixHQUtwQjZMLFNBQVMsQ0FMWDdMLHNCQUFzQixFQUN0QnlWLGVBQWUsR0FJYjVKLFNBQVMsQ0FKWDRKLGVBQWUsRUFDZi9pQixNQUFNLEdBR0ptWixTQUFTLENBSFhuWixNQUFNLEVBQ040QyxLQUFLLEdBRUh1VyxTQUFTLENBRlh2VyxLQUFLLEVBQ0xvZ0IsT0FBTyxHQUNMN0osU0FBUyxDQURYNkosT0FBTztnQkFHUDlqQixTQUFTLEdBT1AsSUFBSSxDQVBOQSxTQUFTLEVBQ1RtakIsdUJBQXVCLEdBTXJCLElBQUksQ0FOTkEsdUJBQXVCLEVBQ3ZCQyxjQUFjLEdBS1osSUFBSSxDQUxOQSxjQUFjLEVBQ2RwbEIsVUFBVSxHQUlSLElBQUksQ0FKTkEsVUFBVSxFQUNWdWxCLFFBQVEsR0FHTixJQUFJLENBSE5BLFFBQVEsRUFDUjVKLGlCQUFpQixHQUVmLElBQUksQ0FGTkEsaUJBQWlCLEVBQ2pCb0ssZUFBZSxHQUNiLElBQUksQ0FETkEsZUFBZSxFQUdqQjtnQkFDQVgsY0FBYyxDQUFDMWlCLEVBQUUsQ0FBQyxHQUFHMGlCLGNBQWMsQ0FBQzFpQixFQUFFLENBQUMsSUFBSSxJQUFJcWlCLEtBQUssRUFBRTtnQkFBQztnQkFBQSxPQUNqQ0ssY0FBYyxDQUFDMWlCLEVBQUUsQ0FBQyxDQUFDc2pCLE9BQU8sRUFBRTtjQUFBO2dCQUE1Q0MsT0FBTztnQkFBQTtnQkFBQSxNQUVQamtCLFNBQVMsSUFBSW1qQix1QkFBdUIsSUFBSSxDQUFDQSx1QkFBdUIsQ0FBQ3JzQixRQUFRLENBQUM0SixFQUFFLENBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQSxNQUc3RWtqQixNQUFNLEtBQUssUUFBUSxJQUFJLENBQUNMLFFBQVE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ2xDbHBCLGtCQUFNLENBQUNxQixNQUFNLENBQUMsb0NBQW9DLENBQUM7Z0JBQUM7Y0FBQTtnQkFBQSxNQUdsRGtvQixNQUFNLEtBQUssU0FBUyxJQUFJTCxRQUFRO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNsQ2xwQixrQkFBTSxDQUFDcUIsTUFBTSxDQUFDLHFDQUFxQyxDQUFDO2dCQUFDO2NBQUE7Z0JBSXZEckIsa0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLDhDQUE4QyxHQUFHNkcsRUFBRSxDQUFDO2dCQUFDLGVBQzVELENBQUNpakIsa0JBQWtCO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQVUsSUFBSSxDQUFDTyx1QkFBdUIsQ0FBQ1Asa0JBQWtCLENBQUM7Y0FBQTtnQkFBQTtjQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUN6RVEsa0JBQWtCLEdBQUdyakIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUksR0FBRyxHQUFHQSxNQUFNLElBQUlsSixlQUFnQjtnQkFDakZ5QyxrQkFBTSxDQUFDUixHQUFHLENBQUMsd0JBQXdCLEdBQUdzcUIsa0JBQWtCLENBQUM7Z0JBQ3pEO2dCQUNNQyxxQkFBcUIsR0FBR2hXLHNCQUFzQixJQUFJMU4sRUFBRSxFQUUxRDtnQkFDQTtnQkFBQSxNQUNxQlYsU0FBUyxLQUFLLENBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsZUFBRyxHQUFHO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FBUzlCLFlBQVksQ0FBQ0YsVUFBVSxHQUFHb21CLHFCQUFxQixDQUFDO2NBQUE7Z0JBQUE7Y0FBQTtnQkFBN0ZDLFlBQVk7Z0JBQ2xCaHFCLGtCQUFNLENBQUNSLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBR3dxQixZQUFZLDhCQUF1QnJrQixTQUFTLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBRSxDQUFDO2dCQUN4RkQsY0FBYyxHQUFHLElBQUk7Z0JBQUEsS0FDckI4akIsZUFBZTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFDakJ4cEIsa0JBQU0sQ0FBQ1IsR0FBRyxDQUFDLHFEQUFxRCxHQUFHNkcsRUFBRSxDQUFDO2dCQUFDO2dCQUFBLE9BQ2hELElBQUksQ0FBQzRqQixrQkFBa0IsQ0FBQ1QsZUFBZSxDQUFDO2NBQUE7Z0JBQS9EOWpCLGNBQWM7Z0JBQ2QsSUFBSUEsY0FBYyxLQUFLLElBQUksRUFBRTtrQkFDM0IxRixrQkFBTSxDQUFDUixHQUFHLENBQUMsaURBQWlELEVBQUVrRyxjQUFjLENBQUM7Z0JBQy9FLENBQUMsTUFBTTFGLGtCQUFNLENBQUNSLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQztjQUFDO2dCQUFBLE1BRTFEd3FCLFlBQVksR0FBR0Ysa0JBQWtCO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUNuQzlwQixrQkFBTSxDQUFDUixHQUFHLHFCQUFjNkcsRUFBRSwyQ0FBd0M7Z0JBQ2xFeU4sWUFBWSxDQUFDek4sRUFBRSxFQUFFWCxjQUFjLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRXFPLHNCQUFzQixDQUFDO2dCQUFDO2NBQUE7Z0JBQUEsSUFHdkUxSyxLQUFLO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQ0ZxZ0IsZUFBZSxDQUFDcmpCLEVBQUUsRUFBRTFDLFVBQVUsRUFBRWlDLE9BQU8sRUFBRUYsY0FBYyxFQUFFQyxTQUFTLENBQUM7Y0FBQTtnQkFBQTtnQkFBQSxPQUNuRSxJQUFJLENBQUN1a0IsYUFBYSxDQUFDVCxPQUFPLEVBQUVuSyxpQkFBaUIsQ0FBQztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBRXBEbGQsVUFBVSwwRUFBQztrQkFBQTtvQkFBQTtzQkFBQTt3QkFBQTswQkFBQTswQkFBQSxPQUNIc25CLGVBQWUsQ0FBQ3JqQixFQUFFLEVBQUUxQyxVQUFVLEVBQUVpQyxPQUFPLEVBQUVGLGNBQWMsRUFBRUMsU0FBUyxDQUFDO3dCQUFBOzBCQUFBOzBCQUFBLE9BQ25FLEtBQUksQ0FBQ3VrQixhQUFhLENBQUNULE9BQU8sRUFBRW5LLGlCQUFpQixDQUFDO3dCQUFBO3dCQUFBOzBCQUFBO3NCQUFBO29CQUFBO2tCQUFBO2dCQUFBLENBQ3JELElBQUVqVyxLQUFLLENBQUM7Y0FBQztnQkFBQTtnQkFBQTtjQUFBO2dCQUdackosa0JBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRWdGLEVBQUUsQ0FBQztjQUFDO2dCQUFBO2dCQUd4RHVqQixPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDTyxlQUFlLENBQUN2SyxTQUFTLENBQUM7Z0JBQy9CLElBQUksQ0FBQ3dLLHVCQUF1QixDQUFDeEssU0FBUyxDQUFDO2dCQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRTNDO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLGdGQUVELGtCQUFvQjZKLE9BQU8sRUFBRW5LLGlCQUFpQjtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsTUFDeEM5VCxLQUFLLENBQUM0SCxPQUFPLENBQUNxVyxPQUFPLENBQUMsSUFBSUEsT0FBTyxDQUFDMXRCLE1BQU07a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ3BDc3VCLG1CQUFtQixHQUFHLEVBQUU7Z0JBQUEsbURBQ04vSyxpQkFBaUI7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBOUJNLFNBQVM7Z0JBQUEsSUFDYjZKLE9BQU8sQ0FBQ2h0QixRQUFRLENBQUNtakIsU0FBUyxDQUFDdlosRUFBRSxDQUFDO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQ25DZ2tCLG1CQUFtQixDQUFDaGEsSUFBSSxDQUFDLElBQUksQ0FBQytZLFdBQVcsQ0FBQ3hKLFNBQVMsQ0FBQyxDQUFDO2NBQUM7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQSxPQUVsRDNXLE9BQU8sQ0FBQzROLEdBQUcsQ0FBQ3dULG1CQUFtQixDQUFDO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRXpDO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLGtGQUVELGtCQUFzQmhrQixFQUFFLEVBQUUxQyxVQUFVLEVBQUVpQyxPQUFPLEVBQUVGLGNBQWMsRUFBRUMsU0FBUztRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDcENILGNBQWMsQ0FBQzdCLFVBQVUsRUFBRWlDLE9BQU8sRUFBRUYsY0FBYyxFQUFFQyxTQUFTLENBQUM7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBekYya0IsUUFBUTtnQkFBRXRrQixPQUFPO2dCQUFBO2dCQUFBLE9BQ05pZCxrQkFBWSxDQUFDcUgsUUFBUSxDQUFDO2NBQUE7Z0JBQWxDMW5CLEdBQUc7Z0JBQ1QsSUFBSUEsR0FBRyxLQUFLLEtBQUssRUFBRTtrQkFDakJrUixZQUFZLENBQUN6TixFQUFFLEVBQUVYLGNBQWMsRUFBRU0sT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDckQsQ0FBQyxNQUFNO2tCQUNMOE4sWUFBWSxDQUFDek4sRUFBRSxFQUFFWCxjQUFjLEVBQUVNLE9BQU8sRUFBRSxTQUFTLENBQUM7Z0JBQ3REO2NBQUM7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ0Y7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBLE9BRUQseUJBQWdCNFosU0FBUyxFQUFFO01BQ3pCLElBQU9wRSxRQUFRLEdBQTBCLElBQUksQ0FBdENBLFFBQVE7UUFBRXdOLG9CQUFvQixHQUFJLElBQUksQ0FBNUJBLG9CQUFvQjtNQUNyQyxJQUFPM2lCLEVBQUUsR0FBNEN1WixTQUFTLENBQXZEdlosRUFBRTtRQUFFa2tCLGFBQWEsR0FBNkIzSyxTQUFTLENBQW5EMkssYUFBYTtRQUFFQyx1QkFBdUIsR0FBSTVLLFNBQVMsQ0FBcEM0Syx1QkFBdUI7TUFDakQsSUFBSUQsYUFBYSxFQUFFO1FBQ2pCLElBQUksQ0FBQ0MsdUJBQXVCLElBQUlBLHVCQUF1QixLQUFLaFAsUUFBUSxFQUFFO1VBQ3BFLElBQUlpUCxtQkFBbUIsR0FBR0YsYUFBYTtVQUN2QyxJQUFJLENBQUMvZSxLQUFLLENBQUM0SCxPQUFPLENBQUNtWCxhQUFhLENBQUMsRUFBRUUsbUJBQW1CLEdBQUcsQ0FBQ0YsYUFBYSxDQUFDO1VBQ3hFdnFCLGtCQUFNLENBQUNSLEdBQUcsMEJBQW1CK3FCLGFBQWEsb0NBQTBCbGtCLEVBQUUsRUFBRztVQUFDLHVEQUMvQ29rQixtQkFBbUI7WUFBQTtVQUFBO1lBQTlDLHVEQUFnRDtjQUFBLElBQXJDQyxZQUFZO2NBQ3JCLElBQU1DLGFBQWEsR0FBRzNCLG9CQUFvQixDQUFDMEIsWUFBWSxDQUFDLEdBQ3REMUIsb0JBQW9CLENBQUMwQixZQUFZLENBQUMsR0FBRyxFQUFFO2NBQ3pDLElBQUlDLGFBQWEsQ0FBQ2x1QixRQUFRLENBQUM0SixFQUFFLENBQUMsRUFBRTtnQkFDOUJyRyxrQkFBTSxDQUFDUixHQUFHLENBQUMsMkNBQTJDLENBQUM7Y0FDekQsQ0FBQyxNQUFNd3BCLG9CQUFvQixDQUFDMEIsWUFBWSxDQUFDLGdDQUFPQyxhQUFhLElBQUV0a0IsRUFBRSxFQUFDO1lBQ3BFO1VBQUM7WUFBQTtVQUFBO1lBQUE7VUFBQTtRQUNIO01BQ0Y7SUFDRjtFQUFDO0lBQUE7SUFBQSxPQUVELG1DQUEwQjtNQUFBO01BQ3hCLElBQU8yaUIsb0JBQW9CLEdBQXVCLElBQUksQ0FBL0NBLG9CQUFvQjtRQUFFMUosaUJBQWlCLEdBQUksSUFBSSxDQUF6QkEsaUJBQWlCO01BQVM7UUFDbEQsSUFBTXRhLEdBQUc7UUFDWixJQUFNNGxCLFlBQVksR0FBRzVCLG9CQUFvQixDQUFDaGtCLEdBQUcsQ0FBQztRQUM5QyxJQUFNNmxCLGlCQUFpQixHQUFHdkwsaUJBQWlCLENBQUM3SixNQUFNLENBQUMsVUFBQ3FWLENBQUM7VUFBQSxPQUFLRixZQUFZLENBQUNudUIsUUFBUSxDQUFDcXVCLENBQUMsQ0FBQ3prQixFQUFFLENBQUM7UUFBQSxFQUFDO1FBQ3RGLFFBQVFyQixHQUFHO1VBQ1QsS0FBSyxpQkFBaUI7WUFBRTtjQUN0QixJQUFNMFEsUUFBUSxHQUFHLElBQUlxVixjQUFjLENBQUMsWUFBTTtnQkFBQSx1REFDaEJGLGlCQUFpQjtrQkFBQTtnQkFBQTtrQkFBekMsdURBQTJDO29CQUFBLElBQWhDakwsU0FBUztvQkFDbEI1ZixrQkFBTSxDQUFDUixHQUFHLDhCQUF1Qm9nQixTQUFTLENBQUN2WixFQUFFLDJCQUF3QjtvQkFDckUsTUFBSSxDQUFDK2lCLFdBQVcsQ0FBQ3hKLFNBQVMsQ0FBQztrQkFDN0I7Z0JBQUM7a0JBQUE7Z0JBQUE7a0JBQUE7Z0JBQUE7Y0FDSCxDQUFDLENBQUM7Y0FDRmxLLFFBQVEsQ0FBQ0csT0FBTyxDQUFDdlosTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQztZQUN2RDtZQUNFO1VBQ0YsS0FBSyxTQUFTO1lBQUU7Y0FDZCtCLFVBQVUsQ0FBQyxZQUFNO2dCQUFBLHVEQUNTeW9CLGlCQUFpQjtrQkFBQTtnQkFBQTtrQkFBekMsdURBQTJDO29CQUFBLElBQWhDakwsU0FBUztvQkFDbEI1ZixrQkFBTSxDQUFDUixHQUFHLDhCQUF1Qm9nQixTQUFTLENBQUN2WixFQUFFLG1CQUFnQjtvQkFDN0QsTUFBSSxDQUFDK2lCLFdBQVcsQ0FBQ3hKLFNBQVMsQ0FBQztrQkFDN0I7Z0JBQUM7a0JBQUE7Z0JBQUE7a0JBQUE7Z0JBQUE7Y0FDSCxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ1Q7WUFDRTtVQUNGLEtBQUssZ0JBQWdCO1lBQUU7Y0FBQSx1REFDR2lMLGlCQUFpQjtnQkFBQTtjQUFBO2dCQUFBO2tCQUFBLElBQTlCakwsU0FBUztrQkFDbEIsSUFBTW9MLG1CQUFtQixHQUFHeGYsS0FBSyxDQUFDNEgsT0FBTyxDQUFDd00sU0FBUyxDQUFDcUwsZ0JBQWdCLENBQUMsR0FDakVyTCxTQUFTLENBQUNxTCxnQkFBZ0IsR0FBRyxDQUFDckwsU0FBUyxDQUFDcUwsZ0JBQWdCLENBQUM7a0JBQUMsdURBQ3ZDRCxtQkFBbUI7b0JBQUE7a0JBQUE7b0JBQTFDLHVEQUE0QztzQkFBQSxJQUFqQzlZLFFBQVE7c0JBQ2pCLElBQU1yTixPQUFPLEdBQUd2SSxNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQ25ELFFBQVEsQ0FBQztzQkFDM0QsSUFBSXJOLE9BQU8sRUFBRTt3QkFDWCxJQUFNNlEsU0FBUSxHQUFHLElBQUlDLGdCQUFnQixDQUFDLFlBQU07MEJBQzFDM1Ysa0JBQU0sQ0FBQ1IsR0FBRyw4QkFBdUJvZ0IsU0FBUyxDQUFDdlosRUFBRSwwQkFBdUI7MEJBQ3BFLE1BQUksQ0FBQytpQixXQUFXLENBQUN4SixTQUFTLENBQUM7d0JBQzdCLENBQUMsQ0FBQzt3QkFDRmxLLFNBQVEsQ0FBQ0csT0FBTyxDQUFDaFIsT0FBTyxFQUFFOGpCLGVBQWUsQ0FBQztzQkFDNUM7b0JBQ0Y7a0JBQUM7b0JBQUE7a0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Z0JBWkgsdURBQTJDO2tCQUFBO2dCQWEzQztjQUFDO2dCQUFBO2NBQUE7Z0JBQUE7Y0FBQTtZQUNIO1lBQ0U7VUFDRixLQUFLLFdBQVc7WUFBRTtjQUNoQjtjQUNBLElBQUl0a0IsYUFBYSxHQUFHLENBQUM7Y0FDckIsSUFBSTZtQixjQUFjLEdBQUcsQ0FBQztjQUN0QjV1QixNQUFNLENBQUN1aUIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQU07Z0JBQ3RDLElBQU0zWCxHQUFHLEdBQUcsSUFBSW5LLElBQUksRUFBRSxDQUFDb3VCLE9BQU8sRUFBRTtnQkFDaEMsSUFBTUMsRUFBRSxHQUFHOXVCLE1BQU0sQ0FBQyt1QixXQUFXLElBQUkvdUIsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQytELFNBQVM7Z0JBQzlFLElBQUk4QyxHQUFHLEdBQUdna0IsY0FBYyxHQUFHLEdBQUcsSUFBSXhrQixJQUFJLENBQUNrQyxHQUFHLENBQUN2RSxhQUFhLEdBQUcrbUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2tCQUNsRS9tQixhQUFhLEdBQUcrbUIsRUFBRTtrQkFDbEJGLGNBQWMsR0FBR2hrQixHQUFHO2tCQUFDLHVEQUNHMmpCLGlCQUFpQjtvQkFBQTtrQkFBQTtvQkFBekMsdURBQTJDO3NCQUFBLElBQWhDakwsU0FBUztzQkFDbEI1ZixrQkFBTSxDQUFDUixHQUFHLDhCQUF1Qm9nQixTQUFTLENBQUN2WixFQUFFLHFCQUFrQjtzQkFDL0QsTUFBSSxDQUFDK2lCLFdBQVcsQ0FBQ3hKLFNBQVMsQ0FBQztvQkFDN0I7a0JBQUM7b0JBQUE7a0JBQUE7b0JBQUE7a0JBQUE7Z0JBQ0g7Y0FDRixDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQ1g7WUFDRTtVQUNGLEtBQUsscUJBQXFCO1lBQUU7Y0FDMUIsSUFBSTNYLFdBQVcsR0FBRzNMLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDMkwsTUFBTTtjQUN4QyxJQUFNd04sVUFBUSxHQUFHLElBQUlDLGdCQUFnQixDQUFDLFlBQU07Z0JBQzFDLElBQUlyWixNQUFNLENBQUNDLFFBQVEsQ0FBQzJMLE1BQU0sS0FBS0QsV0FBVyxFQUFFO2tCQUMxQ0EsV0FBVyxHQUFHM0wsTUFBTSxDQUFDQyxRQUFRLENBQUMyTCxNQUFNO2tCQUFDLHVEQUNiMmlCLGlCQUFpQjtvQkFBQTtrQkFBQTtvQkFBekMsdURBQTJDO3NCQUFBLElBQWhDakwsU0FBUztzQkFDbEI1ZixrQkFBTSxDQUFDUixHQUFHLDhCQUF1Qm9nQixTQUFTLENBQUN2WixFQUFFLCtCQUE0QjtzQkFDekUsTUFBSSxDQUFDK2lCLFdBQVcsQ0FBQ3hKLFNBQVMsQ0FBQztvQkFDN0I7a0JBQUM7b0JBQUE7a0JBQUE7b0JBQUE7a0JBQUE7Z0JBQ0g7Y0FDRixDQUFDLENBQUM7Y0FDRmxLLFVBQVEsQ0FBQ0csT0FBTyxDQUFDelYsUUFBUSxFQUFFdW9CLGVBQWUsQ0FBQztZQUM3QztZQUNFO1VBQ0YsS0FBSyxVQUFVO1lBQUEsd0RBQ1drQyxpQkFBaUI7Y0FBQTtZQUFBO2NBQUE7Z0JBQUEsSUFBOUJqTCxTQUFTO2dCQUNsQixJQUFNMEwsZUFBZSxHQUFHOW1CLFdBQVcsMEVBQUM7a0JBQUE7a0JBQUE7b0JBQUE7c0JBQUE7d0JBQUE7MEJBQUE7MEJBQUEsT0FDWjZPLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7d0JBQUE7MEJBQWpEa1ksT0FBTzswQkFBQSxNQUNUQSxPQUFPLGFBQVBBLE9BQU8sZUFBUEEsT0FBTyxDQUFHM0wsU0FBUyxDQUFDdlosRUFBRSxDQUFDOzRCQUFBOzRCQUFBOzBCQUFBOzBCQUN6Qi9CLGFBQWEsQ0FBQ2duQixlQUFlLENBQUM7MEJBQUM7MEJBQUE7d0JBQUE7MEJBRS9CdHJCLGtCQUFNLENBQUNSLEdBQUcsOEJBQXVCb2dCLFNBQVMsQ0FBQ3ZaLEVBQUUsb0JBQWlCOzBCQUFDOzBCQUFBLE9BQ3pELE1BQUksQ0FBQytpQixXQUFXLENBQUN4SixTQUFTLENBQUM7d0JBQUE7d0JBQUE7MEJBQUE7c0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUEsQ0FFcEMsSUFBRSxFQUFFLENBQUM7Z0JBQ054ZCxVQUFVLENBQUMsWUFBTTtrQkFDZmtDLGFBQWEsQ0FBQ2duQixlQUFlLENBQUM7Z0JBQ2hDLENBQUMsRUFBRSxJQUFJLENBQUM7Y0FBQztjQVpYLDBEQUEyQztnQkFBQTtjQWEzQztZQUFDO2NBQUE7WUFBQTtjQUFBO1lBQUE7WUFDRDtVQUNGLEtBQUssbUJBQW1CO1lBQUEsd0RBQ0VULGlCQUFpQjtjQUFBO1lBQUE7Y0FBekMsMERBQTJDO2dCQUFBLElBQWhDakwsU0FBUztnQkFDbEIsSUFBTTRMLG9CQUFvQixHQUFHLE1BQUksQ0FBQ3BDLFdBQVcsQ0FBQ3FDLElBQUksQ0FBQyxNQUFJLEVBQUU3TCxTQUFTLENBQUM7Z0JBQ25FM00sZUFBZSxDQUFDMk0sU0FBUyxDQUFDcUwsZ0JBQWdCLEVBQUVPLG9CQUFvQixDQUFDO2NBQ25FO1lBQUM7Y0FBQTtZQUFBO2NBQUE7WUFBQTtZQUNEO1VBQ0Y7WUFDRXhyQixrQkFBTSxDQUFDcUIsTUFBTSxDQUFDLDJCQUEyQixFQUFFMkQsR0FBRyxDQUFDO1lBQy9DO1FBQU07TUFDVDtNQWpHSCxnQ0FBa0JGLE1BQU0sQ0FBQ3dCLElBQUksQ0FBQzBpQixvQkFBb0IsQ0FBQyxrQ0FBRTtRQUFBO01Ba0dyRDtJQUNGO0VBQUM7SUFBQTtJQUFBO01BQUEsMEZBRUQsa0JBQThCcEosU0FBUztRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsd0JBQ3VCQSxTQUFTLENBQTlEMEosa0JBQWtCLEVBQWxCQSxrQkFBa0Isc0NBQUcsRUFBRSxrREFBOEIxSixTQUFTLENBQXJDNEosZUFBZSxFQUFmQSxlQUFlLHNDQUFHLEVBQUUsMEJBQUVuakIsRUFBRSxHQUFJdVosU0FBUyxDQUFmdlosRUFBRTtnQkFBQSxLQUNwRCxJQUFJLENBQUM0aUIsb0JBQW9CLENBQUN4c0IsUUFBUSxDQUFDNEosRUFBRSxDQUFDO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQ3BDcWxCLFNBQVMsR0FBRyxJQUFJLENBQUNDLDRCQUE0Qiw4QkFBS3JDLGtCQUFrQixzQkFBS0UsZUFBZSxHQUFFO2dCQUMxRmdDLG9CQUFvQixHQUFHLElBQUksQ0FBQ3BDLFdBQVcsQ0FBQ3FDLElBQUksQ0FBQyxJQUFJLEVBQUU3TCxTQUFTLENBQUM7Z0JBQUEsb0RBQzVDOEwsU0FBUztnQkFBQTtrQkFBaEMsMERBQWtDO29CQUF2QnhaLFFBQVE7b0JBQ2pCZSxlQUFlLG9CQUFhZixRQUFRLEdBQUlzWixvQkFBb0IsQ0FBQztrQkFDL0Q7Z0JBQUM7a0JBQUE7Z0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ0QsSUFBSSxDQUFDdkMsb0JBQW9CLENBQUM1WSxJQUFJLENBQUNoSyxFQUFFLENBQUM7Y0FBQztjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDcEM7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBLE9BRUQsc0NBQTZCdWxCLE9BQU8sRUFBNEI7TUFBQSxJQUExQkMsaUJBQWlCLHVFQUFHLElBQUk7TUFDNUQsSUFBTUgsU0FBUyxHQUFHRyxpQkFBaUIsSUFBSSxFQUFFO01BQUMsd0RBQ3pCRCxPQUFPO1FBQUE7TUFBQTtRQUF4QiwwREFBMEI7VUFBQSxJQUFqQkUsSUFBSTtVQUNYLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJQSxJQUFJLENBQUNyTixVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUVxTixJQUFJLEdBQUdBLElBQUksQ0FBQ3BULEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUNnVCxTQUFTLENBQUNyYixJQUFJLENBQUN5YixJQUFJLENBQUMxb0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDO1VBQ0Y7VUFDQSxJQUFJLENBQUN1b0IsNEJBQTRCLENBQUNHLElBQUksQ0FBQ3hjLEdBQUcsRUFBRW9jLFNBQVMsQ0FBQztRQUN4RDtNQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7TUFDRCxPQUFPLG1CQUFLLElBQUk1VCxHQUFHLENBQUM0VCxTQUFTLENBQUM7SUFDaEM7RUFBQztJQUFBO0lBQUE7TUFBQSxtRkFFRCxrQkFBdUJLLGVBQWU7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNwQy9yQixrQkFBTSxDQUFDUixHQUFHLGdDQUF5QnVzQixlQUFlLEVBQUc7Z0JBQ2pEQyxZQUFZLEdBQUcsS0FBSztnQkFBQSx3QkFDa0JELGVBQWUsQ0FBQzNvQixLQUFLLENBQUMsR0FBRyxDQUFDLHFFQUEvRDZvQixnQkFBZ0IsOEJBQUVDLGVBQWU7Z0JBQ3RDLElBQUlELGdCQUFnQixDQUFDeE4sVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2tCQUNwQ3VOLFlBQVksR0FBRyxJQUFJO2tCQUNuQkMsZ0JBQWdCLEdBQUdBLGdCQUFnQixDQUFDdlQsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUM7Z0JBQUM7Z0JBQUEsT0FDaUJyRixzQkFBc0Isb0JBQWE0WSxnQkFBZ0IsRUFBRztjQUFBO2dCQUFsRXJwQixHQUFHO2dCQUFBLE1BQ0wsQ0FBQ0EsR0FBRyxJQUFJLENBQUM0SSxLQUFLLENBQUM0SCxPQUFPLENBQUN4USxHQUFHLENBQUM7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVMsS0FBSztjQUFBO2dCQUFBLE1BQ3pDb3BCLFlBQVksSUFBSXBwQixHQUFHLENBQUNuRyxRQUFRLENBQUN5dkIsZUFBZSxDQUFDO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGtDQUFTLEtBQUs7Y0FBQTtnQkFBQSxNQUMzRCxDQUFDRixZQUFZLElBQUksQ0FBQ3BwQixHQUFHLENBQUNuRyxRQUFRLENBQUN5dkIsZUFBZSxDQUFDO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBLGtDQUFTLEtBQUs7Y0FBQTtnQkFDakVsc0Isa0JBQU0sQ0FBQ1IsR0FBRyxXQUFJdXNCLGVBQWUsa0JBQWU7Z0JBQUMsa0NBQ3RDLElBQUk7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDWjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSwwRkFFRCxrQkFBOEJ6QyxrQkFBa0I7UUFBQTtVQUFBO1VBQUE7VUFBQTtVQUFBO1VBQUE7VUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFFNkMsa0JBQWtCLDhEQUFHLElBQUk7Z0JBQUVDLGtCQUFrQiw4REFBRyxJQUFJO2dCQUNwR3BzQixrQkFBTSxDQUFDUixHQUFHLENBQUMsNEJBQTRCLENBQUM7Z0JBQUMsSUFDcENnTSxLQUFLLENBQUM0SCxPQUFPLENBQUNrVyxrQkFBa0IsQ0FBQztrQkFBQTtrQkFBQTtnQkFBQTtnQkFDcEN0cEIsa0JBQU0sQ0FBQ3FCLE1BQU0sZ0NBQXlCaW9CLGtCQUFrQixzQkFBbUI7Z0JBQUMsa0NBQ3JFLEtBQUs7Y0FBQTtnQkFFVitDLFVBQVUsR0FBR0Qsa0JBQWtCO2dCQUFBLG9EQUNMOUMsa0JBQWtCO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQXJDeUMsZUFBZTtnQkFBQSxNQUNwQixPQUFPQSxlQUFlLEtBQUssUUFBUTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxJQUNoQ0ksa0JBQWtCO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQ0YsSUFBSSxDQUFDRyxnQkFBZ0IsQ0FBQ1AsZUFBZSxDQUFDO2NBQUE7Z0JBQXpETSxVQUFVO2dCQUFBLElBQ0xBLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVMsS0FBSztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUEsS0FDcEJGLGtCQUFrQjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxNQUN2QkUsVUFBVSxLQUFLLElBQUk7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FDRixJQUFJLENBQUNDLGdCQUFnQixDQUFDUCxlQUFlLENBQUM7Y0FBQTtnQkFBekRNLFVBQVU7Z0JBQUE7Y0FBQTtnQkFBQSxlQUdKRixrQkFBa0I7Z0JBQUEsa0NBQ25CLElBQUkseUJBR0osS0FBSztnQkFBQTtjQUFBO2dCQUFBLGVBRktFLFVBQVU7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FBVSxJQUFJLENBQUNDLGdCQUFnQixDQUFDUCxlQUFlLEVBQUVJLGtCQUFrQixDQUFDO2NBQUE7Z0JBQUE7Y0FBQTtnQkFBM0ZFLFVBQVU7Z0JBQUE7Y0FBQTtnQkFBQSxlQUdHQSxVQUFVO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BQVUsSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBQ1AsZUFBZSxFQUFFSSxrQkFBa0IsQ0FBQztjQUFBO2dCQUFBO2NBQUE7Z0JBQTNGRSxVQUFVO2dCQUFBO2NBQUE7Z0JBR1Zyc0Isa0JBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRThxQixrQkFBa0IsQ0FBQztnQkFDakVFLFVBQVUsR0FBRyxLQUFLO2dCQUFDO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQSxNQUloQixRQUFPTixlQUFlLE1BQUssUUFBUTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUN6QixJQUFJLENBQUNsQyx1QkFBdUIsQ0FBQ2tDLGVBQWUsQ0FBQ3pjLEdBQUcsRUFBRXljLGVBQWUsQ0FBQ25zQixJQUFJLEVBQUV5c0IsVUFBVSxDQUFDO2NBQUE7Z0JBQXRHQSxVQUFVO2dCQUFBLElBQ0xBLFVBQVU7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsa0NBQVMsS0FBSztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUEsa0NBRzFCQSxVQUFVO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2xCO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQSxJQUVEO0VBQUE7SUFBQTtJQUFBO01BQUEscUZBQ0EsbUJBQXlCN0MsZUFBZTtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsb0RBQ0ZBLGVBQWUsQ0FBQ3prQixPQUFPLEVBQUU7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxrREFBakRuSixLQUFLLHFCQUFFMndCLFlBQVk7Z0JBQUE7Z0JBQUEsT0FDbkIsSUFBSSxDQUFDMUMsdUJBQXVCLENBQUMsQ0FBQzBDLFlBQVksQ0FBQyxDQUFDO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsbUNBQVMzd0IsS0FBSztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUEsbUNBRS9ELElBQUk7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FDWjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtFQUFBO0FBQUE7Ozs7O0FDcFd1QztBQUNnQjtBQUMzQjtBQUMvQixJQUFNb0UsdUJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHdCQUF3QixDQUFDO0FBRTVDLElBQU15dEIsa0JBQWtCO0VBQUEsc0VBQUcsaUJBQU9WLElBQUk7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQzNDOXJCLHVCQUFNLENBQUNSLEdBQUcsQ0FBQyxlQUFlLEVBQUVxRyxJQUFJLENBQUNFLFNBQVMsQ0FBQytsQixJQUFJLENBQUMsQ0FBQztZQUMxQ25KLFFBQVEsR0FBc0JtSixJQUFJLENBQWxDbkosUUFBUSxFQUFFcmIsU0FBUyxHQUFXd2tCLElBQUksQ0FBeEJ4a0IsU0FBUyxFQUFFckMsS0FBSyxHQUFJNm1CLElBQUksQ0FBYjdtQixLQUFLO1lBQUE7WUFBQSxPQUNOd25CLGVBQWUsQ0FBQzlKLFFBQVEsQ0FBQztVQUFBO1lBQTlDK0osWUFBWTtZQUFBLGlDQUNYdGxCLGdCQUFnQixDQUFDc2xCLFlBQVksRUFBRXBsQixTQUFTLEVBQUVyQyxLQUFLLENBQUM7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUN4RDtFQUFBLGdCQUxZdW5CLGtCQUFrQjtJQUFBO0VBQUE7QUFBQSxHQUs5QjtBQUVNLElBQU1DLGVBQWU7RUFBQSx1RUFBRyxrQkFBT3puQixHQUFHO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUN2Q2hGLHVCQUFNLENBQUNSLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRXdGLEdBQUcsQ0FBQztZQUFDO1lBQUEsT0FDcENxTyxzQkFBc0IsQ0FBQ3JPLEdBQUcsQ0FBQztVQUFBO1lBQXZDcEMsR0FBRztZQUFBLE1BQ0xBLEdBQUcsS0FBSyxJQUFJLElBQUlBLEdBQUcsS0FBSzRFLFNBQVM7Y0FBQTtjQUFBO1lBQUE7WUFDbkN4SCx1QkFBTSxDQUFDdUgsT0FBTyxxQkFBY3ZDLEdBQUcseUJBQWVwQyxHQUFHLEVBQUc7WUFBQyxrQ0FDOUNBLEdBQUc7VUFBQTtZQUVaNUMsdUJBQU0sQ0FBQ3FCLE1BQU0sZUFBUTJELEdBQUcsbUNBQWdDO1lBQUMsa0NBQ2xELElBQUk7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNaO0VBQUEsZ0JBVFl5bkIsZUFBZTtJQUFBO0VBQUE7QUFBQSxHQVMzQjs7QUNyQnlDO0FBQ1g7QUFDL0IsSUFBTXpzQixxQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsc0JBQXNCLENBQUM7QUFFMUMsSUFBTTR0QixnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUliLElBQUksRUFBSTtFQUN2QzlyQixxQkFBTSxDQUFDUixHQUFHLENBQUMsZUFBZSxFQUFFcUcsSUFBSSxDQUFDRSxTQUFTLENBQUMrbEIsSUFBSSxDQUFDLENBQUM7RUFDakQsSUFBT25KLFFBQVEsR0FBc0VtSixJQUFJLENBQWxGbkosUUFBUTtJQUFFcmIsU0FBUyxHQUEyRHdrQixJQUFJLENBQXhFeGtCLFNBQVM7SUFBRXJDLEtBQUssR0FBb0Q2bUIsSUFBSSxDQUE3RDdtQixLQUFLO0lBQUVpTixRQUFRLEdBQTBDNFosSUFBSSxDQUF0RDVaLFFBQVE7SUFBRTBhLFdBQVcsR0FBNkJkLElBQUksQ0FBNUNjLFdBQVc7SUFBQSx3QkFBNkJkLElBQUksQ0FBL0J6SSxnQkFBZ0I7SUFBaEJBLGdCQUFnQixzQ0FBRyxJQUFJO0VBQ2pGLElBQUl3SixZQUFZLEdBQUczYSxRQUFRO0VBQzNCLElBQUkyYSxZQUFZLElBQUksQ0FBQ3Z3QixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQ3dYLFlBQVksQ0FBQyxFQUFFO0lBQ3BFQSxZQUFZLEdBQUd4SixnQkFBZ0IsR0FBR0EsZ0JBQWdCLEdBQUd3SixZQUFZO0VBQ25FO0VBRUEsSUFBSWxLLFFBQVEsS0FBSyxJQUFJLEVBQUU7SUFDckIsT0FBT3ZiLGdCQUFnQixDQUFDOUssTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNpVixhQUFhLENBQUN3WCxZQUFZLENBQUMsRUFBRXZsQixTQUFTLEVBQUVyQyxLQUFLLENBQUM7RUFDNUY7RUFDQSxJQUFJNG5CLFlBQVksSUFBSSxDQUFDdndCLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDaVYsYUFBYSxDQUFDd1gsWUFBWSxDQUFDLEVBQUU7SUFDcEU3c0IscUJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQztJQUMzQyxPQUFPLEtBQUs7RUFDZDtFQUNBLElBQUl1ckIsV0FBVyxJQUFJLENBQUN0d0IsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUM4VixnQkFBZ0IsQ0FBQzBXLFdBQVcsQ0FBQyxFQUFFO0lBQ3JFNXNCLHFCQUFNLENBQUNxQixNQUFNLENBQUMsNEJBQTRCLENBQUM7SUFDM0MsT0FBTyxLQUFLO0VBQ2Q7RUFFQSxJQUFJd0QsT0FBTztFQUNYLElBQUlnb0IsWUFBWSxFQUFFaG9CLE9BQU8sR0FBR3ZJLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDaVYsYUFBYSxDQUFDd1gsWUFBWSxDQUFDLENBQUMsS0FDdkUsSUFBSUQsV0FBVyxFQUFFL25CLE9BQU8sR0FBRzJHLEtBQUssQ0FBQ0MsSUFBSSxDQUFDblAsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUM4VixnQkFBZ0IsQ0FBQzBXLFdBQVcsQ0FBQyxDQUFDO0VBRTdGLFFBQVFqSyxRQUFRO0lBQ2QsS0FBSyxhQUFhO01BQUU7UUFDbEIsSUFBSW1LLE9BQU87UUFDWCxJQUFJdGhCLEtBQUssQ0FBQzRILE9BQU8sQ0FBQ3ZPLE9BQU8sQ0FBQyxFQUFFO1VBQzFCaW9CLE9BQU8sR0FBR2pvQixPQUFPLENBQUN0QixNQUFNLENBQUMsVUFBQ3dwQixTQUFTLEVBQUVDLElBQUksRUFBSztZQUM1Q0QsU0FBUyxJQUFJcGxCLFFBQVEsQ0FBQ3FsQixJQUFJLENBQUNwc0IsV0FBVyxDQUFDakYsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQ0EsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxRSxPQUFPb3hCLFNBQVM7VUFDbEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNQLENBQUMsTUFBTTtVQUNMRCxPQUFPLEdBQUdubEIsUUFBUSxDQUFDckwsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNpVixhQUFhLENBQUN3WCxZQUFZLENBQUMsQ0FBQ2pzQixXQUFXLENBQ3pFakYsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQ0EsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQztRQUNBLElBQU0wTCxZQUFZLEdBQUdNLFFBQVEsQ0FBQ21sQixPQUFPLENBQUM7UUFDdEMsT0FBTzFsQixnQkFBZ0IsQ0FBQ0MsWUFBWSxFQUFFQyxTQUFTLEVBQUVyQyxLQUFLLENBQUM7TUFDekQ7SUFDQSxLQUFLLFdBQVc7TUFDZCxPQUFPbUMsZ0JBQWdCLENBQUNvRSxLQUFLLENBQUNDLElBQUksQ0FBQzVHLE9BQU8sQ0FBQ3ZFLFNBQVMsQ0FBQyxFQUFFZ0gsU0FBUyxFQUFFckMsS0FBSyxDQUFDO0lBQzFFLEtBQUssT0FBTztNQUFFO1FBQ1osSUFBSXVHLEtBQUssQ0FBQzRILE9BQU8sQ0FBQ3ZPLE9BQU8sQ0FBQyxJQUFJQSxPQUFPLENBQUM5SSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1VBQ2hELE9BQU9xTCxnQkFBZ0IsQ0FBQ3ZDLE9BQU8sQ0FBQzlJLE1BQU0sRUFBRXVMLFNBQVMsRUFBRXJDLEtBQUssQ0FBQztRQUMzRCxDQUFDLE1BQU0sSUFBSUosT0FBTyxFQUFFO1VBQ2xCLE9BQU91QyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUVFLFNBQVMsRUFBRXJDLEtBQUssQ0FBQztRQUM5QyxDQUFDLE1BQU07VUFDTCxPQUFPbUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFRSxTQUFTLEVBQUVyQyxLQUFLLENBQUM7UUFDOUM7TUFDRjtJQUNBLEtBQUssT0FBTztNQUFFO1FBQ1osSUFBTWdvQixhQUFhLEdBQUdDLGdCQUFnQixDQUFDcm9CLE9BQU8sQ0FBQztRQUMvQyxJQUFNc29CLFFBQVEsR0FBR2xvQixLQUFLLENBQUM3QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLElBQUksRUFBRTtRQUMzQyxJQUFNMHBCLFVBQVUsR0FBR25vQixLQUFLLENBQUM3QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLElBQUksRUFBRTtRQUM3QyxJQUFNMkQsYUFBWSxHQUFHNGxCLGFBQWEsQ0FBQ0UsUUFBUSxDQUFDO1FBQzVDLE9BQU8vbEIsZ0JBQWdCLENBQUNDLGFBQVksRUFBRUMsU0FBUyxFQUFFOGxCLFVBQVUsQ0FBQztNQUM5RDtJQUNBO01BQ0VwdEIscUJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztNQUNyQyxPQUFPLEtBQUs7RUFBQztBQUVuQixDQUFDOztBQ2pFeUM7QUFDWDtBQUMvQixJQUFNckIsc0JBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHVCQUF1QixDQUFDO0FBRTNDLElBQU1zdUIsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFpQixDQUFJdkIsSUFBSSxFQUFJO0VBQ3hDOXJCLHNCQUFNLENBQUNSLEdBQUcsQ0FBQyxlQUFlLEVBQUVxRyxJQUFJLENBQUNFLFNBQVMsQ0FBQytsQixJQUFJLENBQUMsQ0FBQztFQUNqRCxJQUFPbkosUUFBUSxHQUFzQm1KLElBQUksQ0FBbENuSixRQUFRO0lBQUVyYixTQUFTLEdBQVd3a0IsSUFBSSxDQUF4QnhrQixTQUFTO0lBQUVyQyxLQUFLLEdBQUk2bUIsSUFBSSxDQUFiN21CLEtBQUs7RUFDakMsSUFBSSxDQUFDMGQsUUFBUSxFQUFFO0lBQ2IzaUIsc0JBQU0sQ0FBQ3FCLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztJQUMxQyxPQUFPLEtBQUs7RUFDZDtFQUNBLElBQU1pc0IsWUFBWSxHQUFHck0sUUFBUSxDQUFDMEIsUUFBUSxDQUFDO0VBQ3ZDLElBQU0rSixZQUFZLEdBQUdZLFlBQVksRUFBRTtFQUNuQyxPQUFPbG1CLGdCQUFnQixDQUFDc2xCLFlBQVksRUFBRXBsQixTQUFTLEVBQUVyQyxLQUFLLENBQUM7QUFDekQsQ0FBQzs7QUNkaUQ7QUFDUjtBQUNYO0FBQy9CLElBQU1qRixxQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsc0JBQXNCLENBQUM7QUFFMUMsSUFBTXd1QixnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUl6QixJQUFJLEVBQUk7RUFDdkM5ckIscUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLGVBQWUsRUFBRXFHLElBQUksQ0FBQ0UsU0FBUyxDQUFDK2xCLElBQUksQ0FBQyxDQUFDO0VBQ2pELElBQU9uSixRQUFRLEdBQXNCbUosSUFBSSxDQUFsQ25KLFFBQVE7SUFBRXJiLFNBQVMsR0FBV3drQixJQUFJLENBQXhCeGtCLFNBQVM7SUFBRXJDLEtBQUssR0FBSTZtQixJQUFJLENBQWI3bUIsS0FBSztFQUNqQyxRQUFRMGQsUUFBUTtJQUNkLEtBQUssVUFBVTtNQUNiLE9BQU82SyxlQUFlLENBQUNsbUIsU0FBUyxFQUFFckMsS0FBSyxDQUFDO0lBQzFDLEtBQUssU0FBUztNQUNaLE9BQU93b0IsY0FBYyxDQUFDbm1CLFNBQVMsRUFBRXJDLEtBQUssQ0FBQztJQUN6QztNQUNFLE9BQU8sSUFBSTtFQUFDO0FBRWxCLENBQUM7QUFFRCxJQUFNeW9CLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUIsR0FBUztFQUNoQyxJQUFJO0lBQ0YsT0FBTyxJQUFJM3dCLElBQUksQ0FBQzRLLFFBQVEsQ0FBQ3JMLE1BQU0sQ0FBQ3dLLGNBQWMsQ0FBQzFILE9BQU8sQ0FBQ3hCLHNDQUFzQyxDQUFDLENBQUMsQ0FBQztFQUNsRyxDQUFDLENBQUMsT0FBTytNLEdBQUcsRUFBRTtJQUNaM0sscUJBQU0sQ0FBQ3FCLE1BQU0sQ0FBQyxpQ0FBaUMsRUFBRXNKLEdBQUcsQ0FBQztJQUNyRCxPQUFPNU4sSUFBSSxDQUFDbUssR0FBRyxFQUFFO0VBQ25CO0FBQ0YsQ0FBQztBQUVELElBQU1zbUIsZUFBZSxHQUFHLFNBQWxCQSxlQUFlLENBQUlsbUIsU0FBUyxFQUFFckMsS0FBSyxFQUFLO0VBQzVDLElBQU13WCxRQUFRLEdBQUcsQ0FBQzFmLElBQUksQ0FBQ21LLEdBQUcsRUFBRSxHQUFHd21CLG1CQUFtQixFQUFFLElBQUksSUFBSTtFQUM1RCxPQUFPdG1CLGdCQUFnQixDQUFDcVYsUUFBUSxFQUFFblYsU0FBUyxFQUFFSyxRQUFRLENBQUMxQyxLQUFLLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQsSUFBTXdvQixjQUFjLEdBQUcsU0FBakJBLGNBQWMsQ0FBSW5tQixTQUFTLEVBQUVyQyxLQUFLLEVBQUs7RUFBQTtFQUMzQyxJQUFNMG9CLGNBQWMsNEJBQUdyeEIsTUFBTSxDQUFDd0ssY0FBYyxDQUFDMUgsT0FBTyxDQUFDeEIsb0NBQW9DLENBQUMsMERBQW5FLHNCQUFxRXdGLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDdEcsT0FBT2dFLGdCQUFnQixDQUFDdW1CLGNBQWMsRUFBRXJtQixTQUFTLEVBQUVyQyxLQUFLLENBQUM7QUFDM0QsQ0FBQzs7QUNuQ3lDO0FBQ1g7QUFDL0IsSUFBTWpGLGlCQUFNLEdBQUcsSUFBSWpCLFVBQU0sQ0FBQyxrQkFBa0IsQ0FBQztBQUV0QyxJQUFNNnVCLFlBQVksR0FBRyxTQUFmQSxZQUFZLENBQUk5QixJQUFJLEVBQUk7RUFDbkM5ckIsaUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLGVBQWUsRUFBRXFHLElBQUksQ0FBQ0UsU0FBUyxDQUFDK2xCLElBQUksQ0FBQyxDQUFDO0VBQ2pELElBQU9uSixRQUFRLEdBQXNCbUosSUFBSSxDQUFsQ25KLFFBQVE7SUFBRXJiLFNBQVMsR0FBV3drQixJQUFJLENBQXhCeGtCLFNBQVM7SUFBRXJDLEtBQUssR0FBSTZtQixJQUFJLENBQWI3bUIsS0FBSztFQUVqQyxRQUFRMGQsUUFBUTtJQUNkLEtBQUssTUFBTTtNQUFFO1FBQ1gsSUFBTWtMLFVBQVUsR0FBRXZ4QixNQUFNLENBQUM2RCxHQUFHLENBQUM1RCxRQUFRLENBQUNDLElBQUk7UUFDMUMsSUFBTStiLElBQUksR0FBRyxJQUFJMkMsR0FBRyxDQUFDMlMsVUFBVSxDQUFDLENBQUMxbUIsUUFBUTtRQUN6Q25ILGlCQUFNLENBQUNSLEdBQUcseUJBQWtCK1ksSUFBSSxnQ0FBc0J0VCxLQUFLLEVBQUc7UUFDOUQsT0FBT21DLGdCQUFnQixDQUFDbVIsSUFBSSxFQUFFalIsU0FBUyxFQUFFckMsS0FBSyxDQUFDO01BQ2pEO0lBQ0EsS0FBSyxhQUFhO01BQUU7UUFDbEIsT0FBTyxJQUFJO01BQ2I7SUFDQTtNQUNFLE9BQU8sSUFBSTtFQUFDO0FBRWxCLENBQUM7O0FDckJ5QztBQUNNO0FBQ2pCO0FBQy9CLElBQU1qRixpQkFBTSxHQUFHLElBQUlqQixVQUFNLENBQUMsa0JBQWtCLENBQUM7QUFFdEMsSUFBTSt1QixZQUFZLEdBQUcsU0FBZkEsWUFBWSxDQUFJaEMsSUFBSSxFQUFJO0VBQ25DOXJCLGlCQUFNLENBQUNSLEdBQUcsQ0FBQyxlQUFlLEVBQUVxRyxJQUFJLENBQUNFLFNBQVMsQ0FBQytsQixJQUFJLENBQUMsQ0FBQztFQUNqRCxJQUFPbkosUUFBUSxHQUFzQm1KLElBQUksQ0FBbENuSixRQUFRO0lBQUVyYixTQUFTLEdBQVd3a0IsSUFBSSxDQUF4QnhrQixTQUFTO0lBQUVyQyxLQUFLLEdBQUk2bUIsSUFBSSxDQUFiN21CLEtBQUs7RUFFakMsUUFBUTBkLFFBQVE7SUFDZCxLQUFLLGFBQWE7TUFBRTtRQUNsQixJQUFNdUcsUUFBUSxHQUFHNXNCLE1BQU0sQ0FBQ3NuQixVQUFVLENBQUN2bUIsa0JBQWtCLENBQUMsQ0FBQ3dtQixPQUFPLEdBQUcsUUFBUSxHQUFHLFNBQVM7UUFDckYsT0FBT3pjLGdCQUFnQixDQUFDOGhCLFFBQVEsRUFBRTVoQixTQUFTLEVBQUVyQyxLQUFLLENBQUM7TUFDckQ7SUFDQSxLQUFLLGFBQWE7TUFBRTtRQUNsQixPQUFPLElBQUk7TUFDYjtJQUNBO01BQ0UsT0FBTyxJQUFJO0VBQUM7QUFFbEIsQ0FBQzs7Ozs7QUNwQnlDO0FBQ1g7QUFDMkI7QUFDSDtBQUV2RCxJQUFNakYseUJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLDBCQUEwQixDQUFDO0FBRTlDLElBQU1ndkIsb0JBQW9CO0VBQUEsc0VBQUcsaUJBQU9qQyxJQUFJO0lBQUE7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQzdDOXJCLHlCQUFNLENBQUNSLEdBQUcsQ0FBQyxlQUFlLEVBQUVxRyxJQUFJLENBQUNFLFNBQVMsQ0FBQytsQixJQUFJLENBQUMsQ0FBQztZQUMxQ25KLFFBQVEsR0FBc0JtSixJQUFJLENBQWxDbkosUUFBUSxFQUFFcmIsU0FBUyxHQUFXd2tCLElBQUksQ0FBeEJ4a0IsU0FBUyxFQUFFckMsS0FBSyxHQUFJNm1CLElBQUksQ0FBYjdtQixLQUFLO1lBQUE7WUFBQSxPQUNYb08sc0JBQXNCLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDO1VBQUE7WUFBckVpRSxPQUFPO1lBQUEsTUFDVCxDQUFDQSxPQUFPLElBQUssUUFBT0EsT0FBTyxNQUFLLFFBQVEsSUFBSSxDQUFDeFMsTUFBTSxDQUFDd0IsSUFBSSxDQUFDZ1IsT0FBTyxDQUFDLENBQUN2YixNQUFPO2NBQUE7Y0FBQTtZQUFBO1lBQUEsaUNBQVMsS0FBSztVQUFBO1lBQ3ZGMndCLFlBQVksR0FBRyxJQUFJO1lBQ2pCclYsR0FBRyw0QkFBR0MsT0FBTyxDQUFDeFMsTUFBTSxDQUFDd0IsSUFBSSxDQUFDZ1IsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsMERBQWhDLHNCQUFrQ2pSLEVBQUU7WUFBQSxjQUN4Q3NjLFFBQVE7WUFBQSxnQ0FDVCxxQkFBcUIsd0JBS3JCLG1CQUFtQix3QkFLbkIsa0JBQWtCO1lBQUE7VUFBQTtZQVRyQjNpQix5QkFBTSxDQUFDUixHQUFHLENBQUMsbUNBQW1DLEVBQUU2WCxHQUFHLENBQUM7WUFBQztZQUFBLE9BQ2hDMlcsbUJBQW1CLENBQUMzVyxHQUFHLENBQUM7VUFBQTtZQUE3Q3FWLFlBQVk7WUFBQTtVQUFBO1lBSVoxc0IseUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLGlDQUFpQyxFQUFFNlgsR0FBRyxDQUFDO1lBQUM7WUFBQSxPQUM5QjRXLGlCQUFpQixDQUFDNVcsR0FBRyxDQUFDO1VBQUE7WUFBM0NxVixZQUFZO1lBQUE7VUFBQTtZQUlaMXNCLHlCQUFNLENBQUNSLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRTZYLEdBQUcsQ0FBQztZQUFDO1lBQUEsT0FDaEM2VyxlQUFlLENBQUM3VyxHQUFHLENBQUM7VUFBQTtZQUF6Q3FWLFlBQVk7WUFBQTtVQUFBO1lBQUEsaUNBSVR0bEIsZ0JBQWdCLENBQUNzbEIsWUFBWSxFQUFFcGxCLFNBQVMsRUFBRXJDLEtBQUssQ0FBQztVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBQ3hEO0VBQUEsZ0JBekJZOG9CLG9CQUFvQjtJQUFBO0VBQUE7QUFBQSxHQXlCaEM7QUFFRCxJQUFNQyxtQkFBbUI7RUFBQSx1RUFBRyxrQkFBTzNXLEdBQUc7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQUE7WUFBQSxPQUNWOEssaUJBQWlCLEVBQUUsQ0FBQzFaLEdBQUcsQ0FBQzRPLEdBQUcsQ0FBQztVQUFBO1lBQWhEdlYsV0FBVztZQUFBLE1BQ2J1VixHQUFHLElBQUl2VixXQUFXO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQ2JBLFdBQVcsQ0FBQ3drQixtQkFBbUI7VUFBQTtZQUFBLGtDQUVqQyxDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNWO0VBQUEsZ0JBTkswSCxtQkFBbUI7SUFBQTtFQUFBO0FBQUEsR0FNeEI7QUFFRCxJQUFNQyxpQkFBaUI7RUFBQSx1RUFBRyxrQkFBTzVXLEdBQUc7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQUE7WUFBQSxPQUNSOEssaUJBQWlCLEVBQUUsQ0FBQzFaLEdBQUcsQ0FBQzRPLEdBQUcsQ0FBQztVQUFBO1lBQWhEdlYsV0FBVztZQUFBLE1BQ2J1VixHQUFHLElBQUl2VixXQUFXO2NBQUE7Y0FBQTtZQUFBO1lBQUEsa0NBQ2JBLFdBQVcsQ0FBQ3lrQixtQkFBbUI7VUFBQTtZQUFBLGtDQUVqQyxDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUNWO0VBQUEsZ0JBTkswSCxpQkFBaUI7SUFBQTtFQUFBO0FBQUEsR0FNdEI7QUFFRCxJQUFNQyxlQUFlO0VBQUEsdUVBQUcsa0JBQU83VyxHQUFHO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBO1lBQUEsT0FDTjhLLGlCQUFpQixFQUFFLENBQUMxWixHQUFHLENBQUM0TyxHQUFHLENBQUM7VUFBQTtZQUFoRHZWLFdBQVc7WUFBQSxNQUNidVYsR0FBRyxJQUFJdlYsV0FBVztjQUFBO2NBQUE7WUFBQTtZQUFBLGtDQUNiQSxXQUFXLENBQUMwa0Isa0JBQWtCO1VBQUE7WUFBQSxrQ0FFaEMsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDVjtFQUFBLGdCQU5LMEgsZUFBZTtJQUFBO0VBQUE7QUFBQSxHQU1wQjs7Ozs7Ozs7Ozs7QUN4RHFEO0FBQ0o7QUFDRTtBQUNGO0FBQ1I7QUFDQTtBQUNnQjtBQUMzQjtBQUNrRTtBQUMvRDtBQUNhO0FBQzBCO0FBQ3pFLElBQU1sdUIsdUJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQUMsSUFFekJvdkIsVUFBVTtFQUM3QixvQkFBWS9QLElBQUksRUFBRTtJQUFBO0lBQ2hCLElBQU96YyxnQkFBZ0IsR0FBaUJ5YyxJQUFJLENBQXJDemMsZ0JBQWdCO01BQUV5c0IsV0FBVyxHQUFJaFEsSUFBSSxDQUFuQmdRLFdBQVc7SUFDcEMsSUFBSSxDQUFDQSxXQUFXLEdBQUdBLFdBQVc7SUFDOUIsSUFBSSxDQUFDenNCLGdCQUFnQixHQUFHQSxnQkFBZ0I7SUFDeEMsSUFBSSxDQUFDMHNCLGtCQUFrQixHQUFHLEVBQUU7SUFDNUIsSUFBSSxDQUFDQyxLQUFLLEdBQUcsSUFBSTVGLEtBQUssRUFBRTtFQUMxQjtFQUFDO0lBQUE7SUFBQTtNQUFBLDZFQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQSx1REFDcUIsSUFBSSxDQUFDMEYsV0FBVztnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUF4QnRDLElBQUk7Z0JBQUE7Z0JBQUEsT0FDZSxJQUFJLENBQUN5QyxTQUFTLENBQUN6QyxJQUFJLENBQUM7Y0FBQTtnQkFBMUMwQyxhQUFhO2dCQUFBLElBQ2RBLGFBQWE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsaUNBQ1QsS0FBSztjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUEsaUNBR1QsSUFBSTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUNaO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLDRFQUVELGtCQUFnQjFDLElBQUk7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUNYbEosS0FBSyxHQUEyQmtKLElBQUksQ0FBcENsSixLQUFLLEVBQUU2TCxlQUFlLEdBQVUzQyxJQUFJLENBQTdCMkMsZUFBZSxFQUFFN3VCLElBQUksR0FBSWtzQixJQUFJLENBQVpsc0IsSUFBSTtnQkFDL0I0dUIsYUFBYSxHQUFHLElBQUksRUFDeEI7Z0JBQUEsZUFDUTV1QixJQUFJO2dCQUFBLGtDQUNMLFNBQVMsd0JBR1QsU0FBUyx3QkFHVCxXQUFXLHdCQUdYLEtBQUsseUJBR0wsVUFBVSx5QkFHVixhQUFhLHlCQUdiLG1CQUFtQjtnQkFBQTtjQUFBO2dCQWpCdEI0dUIsYUFBYSxHQUFHakIsZ0JBQWdCLENBQUN6QixJQUFJLENBQUM7Z0JBQUM7Y0FBQTtnQkFHdkMwQyxhQUFhLEdBQUc3QixnQkFBZ0IsQ0FBQ2IsSUFBSSxDQUFDO2dCQUFDO2NBQUE7Z0JBQUE7Z0JBQUEsT0FHakJVLGtCQUFrQixDQUFDVixJQUFJLENBQUM7Y0FBQTtnQkFBOUMwQyxhQUFhO2dCQUFBO2NBQUE7Z0JBR2JBLGFBQWEsR0FBR1osWUFBWSxDQUFDOUIsSUFBSSxDQUFDO2dCQUFDO2NBQUE7Z0JBR25DMEMsYUFBYSxHQUFHbkIsaUJBQWlCLENBQUN2QixJQUFJLENBQUM7Z0JBQUM7Y0FBQTtnQkFHeEMwQyxhQUFhLEdBQUdWLFlBQVksQ0FBQ2hDLElBQUksQ0FBQztnQkFBQztjQUFBO2dCQUFBO2dCQUFBLE9BR2JpQyxvQkFBb0IsQ0FBQ2pDLElBQUksQ0FBQztjQUFBO2dCQUFoRDBDLGFBQWE7Z0JBQUE7Y0FBQTtnQkFHYnh1Qix1QkFBTSxDQUFDcUIsTUFBTSw4QkFBdUJ6QixJQUFJLEVBQUc7Z0JBQUMsa0NBQ3JDLElBQUk7Y0FBQTtnQkFBQSxLQUdYZ2pCLEtBQUs7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUEsZUFDQzZMLGVBQWU7Z0JBQUEsa0NBQ2hCLEtBQUsseUJBR0wsSUFBSSx5QkFHSixLQUFLO2dCQUFBO2NBQUE7Z0JBQUEsZUFMUUQsYUFBYTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUFVLElBQUksQ0FBQ0QsU0FBUyxDQUFDM0wsS0FBSyxDQUFDO2NBQUE7Z0JBQUE7Y0FBQTtnQkFBNUQ0TCxhQUFhO2dCQUFBO2NBQUE7Z0JBQUEsZUFHR0EsYUFBYTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtnQkFBQSxPQUFVLElBQUksQ0FBQ0QsU0FBUyxDQUFDM0wsS0FBSyxDQUFDO2NBQUE7Z0JBQUE7Y0FBQTtnQkFBNUQ0TCxhQUFhO2dCQUFBO2NBQUE7Z0JBQUEsZUFHR0EsYUFBYTtnQkFBQTtnQkFBQSxPQUFVLElBQUksQ0FBQ0QsU0FBUyxDQUFDM0wsS0FBSyxDQUFDO2NBQUE7Z0JBQUE7Z0JBQTVENEwsYUFBYTtnQkFBQTtjQUFBO2dCQUdieHVCLHVCQUFNLENBQUNxQixNQUFNLENBQUMseUJBQXlCLENBQUM7Z0JBQUM7Y0FBQTtnQkFBQSxrQ0FJeENtdEIsYUFBYSxHQUFHMUMsSUFBSSxDQUFDemYsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ2pEO01BQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBLHdGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFDRXRNLG9CQUFvQixDQUFDLEdBQUcsRUFBRSw2QkFBNkIsQ0FBQztnQkFDbEQydUIsY0FBYyxHQUFHLENBQUMsQ0FBQztnQkFDekIsK0JBQTJCNXBCLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQ3BELGdCQUFnQixDQUFDLHFDQUFFO2tCQUFBLDZEQUF0RHFELEdBQUcsMEJBQUUycEIsS0FBSztrQkFDcEJELGNBQWMsQ0FBQzFwQixHQUFHLENBQUMsR0FBRyxFQUFFO2tCQUFDLHdEQUNOMnBCLEtBQUs7a0JBQUE7b0JBQXhCLHVEQUEwQjtzQkFBZjdDLElBQUk7c0JBQ2I0QyxjQUFjLENBQUMxcEIsR0FBRyxDQUFDLENBQUNxTCxJQUFJLENBQUMsSUFBSSxDQUFDa2UsU0FBUyxDQUFDekMsSUFBSSxDQUFDLENBQUM7b0JBQ2hEO2tCQUFDO29CQUFBO2tCQUFBO29CQUFBO2tCQUFBO2dCQUNIO2dCQUFDLDRCQUNpQ2huQixNQUFNLENBQUNDLE9BQU8sQ0FBQzJwQixjQUFjLENBQUM7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxnRUFBcEQxcEIsSUFBRywyQkFBRTRwQixZQUFZO2dCQUFBO2dCQUFBLE9BQ0kzbEIsT0FBTyxDQUFDNE4sR0FBRyxDQUFDK1gsWUFBWSxDQUFDO2NBQUE7Z0JBQWxEQyxnQkFBZ0I7Z0JBQ3RCOXVCLG9CQUFvQixvQkFBYWlGLElBQUcsR0FBSTZwQixnQkFBZ0IsQ0FBQ3BaLE1BQU0sQ0FBQyxVQUFDcFAsRUFBRTtrQkFBQSxPQUFLQSxFQUFFLEtBQUssS0FBSztnQkFBQSxFQUFDLENBQUM7Z0JBQ3RGLElBQUksQ0FBQ3lvQixjQUFjLENBQUM5cEIsSUFBRyxFQUFFLElBQUksQ0FBQ3JELGdCQUFnQixDQUFDcUQsSUFBRyxDQUFDLENBQUM7Y0FBQztnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDQUV4RDtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxnR0FFRCxrQkFBb0NBLEdBQUcsRUFBRTJwQixLQUFLO1FBQUE7UUFBQTtRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLE1BQ3hDLENBQUMzcEIsR0FBRyxJQUFJLENBQUMycEIsS0FBSyxJQUFJLENBQUNBLEtBQUssQ0FBQzV5QixNQUFNO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDYixJQUFJLENBQUN1eUIsS0FBSyxDQUFDM0UsT0FBTyxFQUFFO2NBQUE7Z0JBQXBDQyxPQUFPO2dCQUNiNXBCLHVCQUFNLENBQUNSLEdBQUcsaUNBQTBCd0YsR0FBRyxFQUFHO2dCQUFDO2dCQUFBLHdEQUV0QjJwQixLQUFLO2dCQUFBO2dCQUFBO2tCQUFBO2tCQUFBO29CQUFBO3NCQUFBO3dCQUFBOzBCQUFiN0MsSUFBSTswQkFBQTswQkFBQSxPQUNZLEtBQUksQ0FBQ3lDLFNBQVMsQ0FBQ3pDLElBQUksQ0FBQzt3QkFBQTswQkFBdkNPLFVBQVU7MEJBQUE7MEJBQUEsT0FDTWhaLHNCQUFzQixvQkFBYXJPLEdBQUcsRUFBRzt3QkFBQTswQkFBQTswQkFBQTs0QkFBQTs0QkFBQTswQkFBQTswQkFBQSxlQUFJLEVBQUU7d0JBQUE7MEJBQS9Eb0QsT0FBTzswQkFBQSxLQUNUaWtCLFVBQVU7NEJBQUE7NEJBQUE7MEJBQUE7MEJBQUEsS0FDUmprQixPQUFPLENBQUMzTCxRQUFRLENBQUNxdkIsSUFBSSxDQUFDemYsSUFBSSxDQUFDOzRCQUFBOzRCQUFBOzBCQUFBOzBCQUFBO3dCQUFBOzBCQUMvQmpFLE9BQU8sQ0FBQ2lJLElBQUksQ0FBQ3liLElBQUksQ0FBQ3pmLElBQUksQ0FBQzswQkFDdkJ0TSxvQkFBb0Isb0JBQWFpRixHQUFHLEdBQUlvRCxPQUFPLENBQUM7MEJBQUMsTUFDN0NwRCxHQUFHLEtBQUssVUFBVTs0QkFBQTs0QkFBQTswQkFBQTswQkFBQTt3QkFBQTswQkFBQTswQkFBQTt3QkFBQTswQkFBQSxJQUdqQm9ELE9BQU8sQ0FBQzNMLFFBQVEsQ0FBQ3F2QixJQUFJLENBQUN6ZixJQUFJLENBQUM7NEJBQUE7NEJBQUE7MEJBQUE7MEJBQUE7d0JBQUE7MEJBQzFCMGlCLFFBQVEsR0FBRzNtQixPQUFPLENBQUNxTixNQUFNLENBQUMsVUFBQ3VaLENBQUM7NEJBQUEsT0FBS0EsQ0FBQyxLQUFLbEQsSUFBSSxDQUFDemYsSUFBSTswQkFBQSxFQUFDOzBCQUN2RHRNLG9CQUFvQixvQkFBYWlGLEdBQUcsR0FBSStwQixRQUFRLENBQUM7d0JBQUM7d0JBQUE7MEJBQUE7c0JBQUE7b0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQTtjQUFBO2dCQUFBO2dCQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBSXREL3VCLHVCQUFNLENBQUNxQixNQUFNLDBDQUFtQzJELEdBQUcsZ0JBQU0sYUFBSTFELE9BQU8sRUFBRztjQUFDO2dCQUFBO2dCQUV4RXRCLHVCQUFNLENBQUNSLEdBQUcsbUNBQTRCd0YsR0FBRyxFQUFHO2dCQUM1QzRrQixPQUFPLEVBQUU7Z0JBQUM7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQ0FFYjtNQUFBO1FBQUE7TUFBQTtNQUFBO0lBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQSxpRkFFRCxrQkFBcUI1a0IsR0FBRyxFQUFFMnBCLEtBQUs7UUFBQTtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsd0JBQ1UsSUFBSSxDQUFDTSxxQkFBcUIsQ0FBQ04sS0FBSyxDQUFDLEVBQWpFTyxjQUFjLHlCQUFkQSxjQUFjLEVBQUVDLFlBQVkseUJBQVpBLFlBQVk7Z0JBQ25DLGlDQUFnQ3JxQixNQUFNLENBQUNDLE9BQU8sQ0FBQ21xQixjQUFjLENBQUMsd0NBQUU7a0JBQUEsZ0VBQXBEdk0sUUFBUSwyQkFBRWdNLE1BQUs7a0JBQ25CUyxrQ0FBa0MsR0FBRyxJQUFJLENBQUNDLDZCQUE2QixDQUFDNUQsSUFBSSxDQUFDLElBQUksRUFBRXptQixHQUFHLEVBQUUycEIsTUFBSyxDQUFDO2tCQUNwRzFiLGVBQWUsQ0FBQzBQLFFBQVEsRUFBRXlNLGtDQUFrQyxDQUFDO2dCQUMvRDtnQkFBQztrQkFDSTtvQkFBT2xkLFFBQVE7b0JBQUV5YyxLQUFLO2tCQUN6QixJQUFNalosUUFBUSxHQUFHLElBQUlDLGdCQUFnQixDQUFDLFVBQUNySyxZQUFZLEVBQUs7b0JBQ3RELElBQUloUCxNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ3FYLFVBQVUsS0FBSyxVQUFVLEVBQUU7b0JBQ25ELElBQUlsTSxLQUFLLEdBQUcsRUFBRTtvQkFBQyw0REFDY0QsWUFBWTtzQkFBQTtvQkFBQTtzQkFBekMsdURBQTJDO3dCQUFBLElBQWhDZ2tCLGNBQWM7d0JBQ3ZCL2pCLEtBQUssZ0NBQU9BLEtBQUssc0JBQUtDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDNmpCLGNBQWMsQ0FBQzVqQixVQUFVLENBQUMsc0JBQUtGLEtBQUssQ0FBQ0MsSUFBSSxDQUFDNmpCLGNBQWMsQ0FBQzNqQixZQUFZLENBQUMsRUFBQztzQkFDMUc7c0JBQ0E7b0JBQUE7c0JBQUE7b0JBQUE7c0JBQUE7b0JBQUE7b0JBQ0EsSUFBSUosS0FBSyxDQUFDZ2tCLEtBQUssQ0FBQyxVQUFDMWpCLENBQUM7c0JBQUEsT0FBS0EsQ0FBQyxDQUFDQyxPQUFPLEtBQUt0RSxTQUFTO29CQUFBLEVBQUMsRUFBRTtvQkFDakQsTUFBSSxDQUFDNm5CLDZCQUE2QixDQUFDcnFCLEdBQUcsRUFBRTJwQixLQUFLLENBQUM7a0JBQ2hELENBQUMsQ0FBQztrQkFDRixJQUFJemMsUUFBUSxLQUFLLE1BQU0sRUFBRTtvQkFDdkJ3RCxRQUFRLENBQUNHLE9BQU8sQ0FBQ3ZaLE1BQU0sQ0FBQzZELEdBQUcsQ0FBQ0MsUUFBUSxDQUFDZ2UsSUFBSSxFQUFFO3NCQUFDdEksT0FBTyxFQUFFLElBQUk7c0JBQUVDLFNBQVMsRUFBRTtvQkFBSSxDQUFDLENBQUM7a0JBQzlFLENBQUMsTUFBTTtvQkFDTEwsUUFBUSxDQUFDRyxPQUFPLENBQUN2WixNQUFNLENBQUM2RCxHQUFHLENBQUNDLFFBQVEsQ0FBQ2lWLGFBQWEsQ0FBQ25ELFFBQVEsQ0FBQyxDQUFDOFYsVUFBVSxFQUFFO3NCQUFDbFMsT0FBTyxFQUFFLElBQUk7c0JBQUVDLFNBQVMsRUFBRTtvQkFBSSxDQUFDLENBQUM7a0JBQzVHO2dCQUFDO2dCQWZILGlDQUFnQ2pSLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDb3FCLFlBQVksQ0FBQyx3Q0FBRTtrQkFBQTtnQkFnQjlEO2NBQUM7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQ0Y7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7SUFBQTtJQUFBLE9BRUQsK0JBQXNCUixLQUFLLEVBQTBDO01BQUEsSUFBeENPLGNBQWMsdUVBQUcsQ0FBQyxDQUFDO01BQUEsSUFBRUMsWUFBWSx1RUFBRyxDQUFDLENBQUM7TUFDakUsSUFBSSxDQUFDUixLQUFLLElBQUksQ0FBQ0EsS0FBSyxDQUFDNXlCLE1BQU0sRUFBRTtNQUFPLDREQUNqQjR5QixLQUFLO1FBQUE7TUFBQTtRQUF4Qix1REFBMEI7VUFBQSxJQUFmN0MsSUFBSTtVQUNiLElBQU9sc0IsSUFBSSxHQUFJa3NCLElBQUksQ0FBWmxzQixJQUFJO1VBQ1gsUUFBUUEsSUFBSTtZQUNWLEtBQUssV0FBVztjQUNkLElBQUksQ0FBQ3N2QixjQUFjLENBQUNwRCxJQUFJLENBQUNuSixRQUFRLENBQUMsRUFBRTtnQkFDbEN1TSxjQUFjLENBQUNwRCxJQUFJLENBQUNuSixRQUFRLENBQUMsR0FBRyxFQUFFO2NBQ3BDO2NBQ0F1TSxjQUFjLENBQUNwRCxJQUFJLENBQUNuSixRQUFRLENBQUMsQ0FBQ3RTLElBQUksQ0FBQ3liLElBQUksQ0FBQztjQUN4QztZQUNGLEtBQUssU0FBUztjQUNaLElBQUkxckIsUUFBUSxDQUFDaVYsYUFBYSxDQUFDeVcsSUFBSSxDQUFDNVosUUFBUSxDQUFDLEVBQUU7Z0JBQ3pDaWQsWUFBWSxDQUFDckQsSUFBSSxDQUFDNVosUUFBUSxDQUFDLEdBQUdpZCxZQUFZLENBQUNyRCxJQUFJLENBQUM1WixRQUFRLENBQUMsZ0NBQ3JEaWQsWUFBWSxDQUFDckQsSUFBSSxDQUFDNVosUUFBUSxDQUFDLElBQUU0WixJQUFJLEtBQUksQ0FBQ0EsSUFBSSxDQUFDO2dCQUMvQztjQUNGO2NBQ0EsSUFBSTFyQixRQUFRLENBQUM4VixnQkFBZ0IsQ0FBQzRWLElBQUksQ0FBQ2MsV0FBVyxDQUFDLENBQUM3d0IsTUFBTSxFQUFFO2dCQUN0RG96QixZQUFZLENBQUNyRCxJQUFJLENBQUNjLFdBQVcsQ0FBQyxHQUFHdUMsWUFBWSxDQUFDckQsSUFBSSxDQUFDYyxXQUFXLENBQUMsZ0NBQzNEdUMsWUFBWSxDQUFDckQsSUFBSSxDQUFDYyxXQUFXLENBQUMsSUFBRWQsSUFBSSxLQUFJLENBQUNBLElBQUksQ0FBQztnQkFDbEQ7Y0FDRjtjQUNBcUQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHQSxZQUFZLENBQUMsTUFBTSxDQUFDLGdDQUNyQ0EsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFFckQsSUFBSSxLQUFJLENBQUNBLElBQUksQ0FBQztjQUMxQztVQUFNO1VBRVYsSUFBSUEsSUFBSSxDQUFDbEosS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDcU0scUJBQXFCLENBQUMsQ0FBQ25ELElBQUksQ0FBQ2xKLEtBQUssQ0FBQyxFQUFFc00sY0FBYyxFQUFFQyxZQUFZLENBQUM7VUFDeEU7UUFDRjtNQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7TUFDRCxPQUFPO1FBQUNELGNBQWMsRUFBZEEsY0FBYztRQUFFQyxZQUFZLEVBQVpBO01BQVksQ0FBQztJQUN2QztFQUFDO0lBQUE7SUFBQTtNQUFBLHNGQUVEO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtnQkFFUUssbUJBQW1CLEdBQUdsekIsTUFBTSxDQUFDNkMsWUFBWSxDQUFDQyxPQUFPLENBQUNoQixvQ0FBb0MsQ0FBQztnQkFBQSxLQUN2Rm94QixtQkFBbUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ3JCQSxtQkFBbUIsR0FBRzNwQixJQUFJLENBQUNDLEtBQUssQ0FBQzBwQixtQkFBbUIsQ0FBQztnQkFBQyxLQUNsREEsbUJBQW1CLENBQUN0UCxTQUFTO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUN6QkUsWUFBWSxHQUFHLENBQUNyakIsSUFBSSxDQUFDbUssR0FBRyxFQUFFLEdBQUdzb0IsbUJBQW1CLENBQUN0UCxTQUFTLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQztnQkFBQSxNQUM3RUUsWUFBWSxHQUFHNWlCLHVCQUF1QjtrQkFBQTtrQkFBQTtnQkFBQTtnQkFBQSxrQ0FBU2d5QixtQkFBbUIsQ0FBQ2IsS0FBSztjQUFBO2dCQUFBO2dCQUFBLE9BR3BEanRCLHFCQUFxQixFQUFFO2NBQUE7Z0JBQW5EOHRCLG1CQUFtQjtnQkFBQSxJQUNkQSxtQkFBbUI7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQ3RCeHZCLHVCQUFNLENBQUNxQixNQUFNLENBQUMsbUNBQW1DLENBQUM7Z0JBQUMsa0NBQzVDLElBQUk7Y0FBQTtnQkFFYm11QixtQkFBbUIsR0FBRztrQkFBQ2IsS0FBSyxFQUFFYSxtQkFBbUI7a0JBQUV0UCxTQUFTLEVBQUVuakIsSUFBSSxDQUFDbUssR0FBRztnQkFBRSxDQUFDO2dCQUN6RTVLLE1BQU0sQ0FBQzZDLFlBQVksQ0FBQzhILE9BQU8sQ0FBQzdJLG9DQUFvQyxFQUFFeUgsSUFBSSxDQUFDRSxTQUFTLENBQUN5cEIsbUJBQW1CLENBQUMsQ0FBQztnQkFBQyxrQ0FDaEdBLG1CQUFtQixDQUFDYixLQUFLO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBRWhDM3VCLHVCQUFNLENBQUNxQixNQUFNLENBQUMsbUNBQW1DLEVBQUUsYUFBSUMsT0FBTyxDQUFDO2dCQUFDLGtDQUN6RCxJQUFJO2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBRWQ7TUFBQTtRQUFBO01BQUE7TUFBQTtJQUFBO0VBQUE7RUFBQTtBQUFBOzs7OztBQy9NNEI7QUFDc0M7QUFJekM7QUFLVjtBQUNzQjtBQUNLO0FBQ1U7QUFFdkQsSUFBTXRCLGVBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLG1CQUFtQixDQUFDO0FBRTlDLElBQU0wd0IsUUFBUTtFQUFBLHNFQUFHLGlCQUFPOXJCLFVBQVUsRUFBRWdDLFNBQVMsRUFBRTZWLFFBQVEsRUFBRWhhLGdCQUFnQjtJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFDakVrdUIseUJBQXlCLEdBQUd2TixpQkFBaUIsRUFBRSxDQUFDd04sa0JBQWtCLEVBQUU7WUFFcEVDLDZCQUE2QixHQUFHQyxxQkFBcUIsRUFBRTtZQUN2REMsaUJBQWlCLEdBQUcxUSx1Q0FBaUMsRUFBRTtZQUU3RGphLGdCQUFnQixFQUFFO1lBQ2xCeUIsdUJBQXVCLEVBQUU7WUFDekI3RyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO1lBRTlCaXdCLFlBQVksR0FBRzF6QixNQUFNLENBQUNDLFFBQVEsQ0FBQzJMLE1BQU07WUFDdkM0Z0IsdUJBQXVCLEdBQUcsSUFBSTtZQUNsQyxJQUFJbmpCLFNBQVMsSUFBSXFxQixZQUFZLENBQUN2ekIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2NBQ2pEcXNCLHVCQUF1QixHQUFHa0gsWUFBWSxDQUFDdFgsS0FBSyxDQUN4Q3NYLFlBQVksQ0FBQ24wQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUM3Qm0wQixZQUFZLENBQUNDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FDaEMsQ0FBQzdzQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxVQUFDNnNCLElBQUk7Z0JBQUEsT0FBS3ZvQixRQUFRLENBQUN1b0IsSUFBSSxFQUFFLEVBQUUsQ0FBQztjQUFBLEVBQUM7WUFDaEQ7WUFBQztZQUFBLE9BRXdCSixpQkFBaUI7VUFBQTtZQUFwQzd1QixVQUFVO1lBQUEsSUFFWEEsVUFBVTtjQUFBO2NBQUE7WUFBQTtZQUNibEIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDO1lBQUMsTUFDeEMsSUFBSW1CLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQztVQUFBO1lBRXZEbEIsZUFBTSxDQUFDdUgsT0FBTyxDQUFDLG9CQUFvQixFQUFFdEcsVUFBVSxDQUFDO1lBQ2hEbEIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDO1lBRXpDb3dCLG1CQUFtQixHQUFHLElBQUkvUSx5QkFBbUIsQ0FBQztjQUNsRG5lLFVBQVUsRUFBVkEsVUFBVTtjQUNWTyxnQkFBZ0IsRUFBaEJBO1lBQ0YsQ0FBQyxDQUFDO1lBQUE7WUFBQSxPQUU4QjJ1QixtQkFBbUIsQ0FBQ3JRLG9CQUFvQixDQUFDbmEsU0FBUyxDQUFDO1VBQUE7WUFBN0UyWixpQkFBaUI7WUFBQSxNQUNuQkEsaUJBQWlCLEtBQUssSUFBSTtjQUFBO2NBQUE7WUFBQTtZQUM1QnZmLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztZQUM1Q0csa0JBQWtCLEVBQUU7WUFBQztVQUFBO1lBQUEsSUFHbEJvZixpQkFBaUIsQ0FBQ3ZqQixNQUFNO2NBQUE7Y0FBQTtZQUFBO1lBQzNCaUUsZUFBTSxDQUFDUixHQUFHLENBQUMseURBQXlELENBQUM7WUFDckVPLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQztZQUM3Q0csa0JBQWtCLEVBQUU7WUFBQztVQUFBO1lBR3ZCSCxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUM7WUFBQztZQUFBO1lBQUEsT0FHMUM2dkIsNkJBQTZCO1VBQUE7WUFBQTtZQUFBO1VBQUE7WUFBQTtZQUFBO1lBRW5DN3ZCLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQztZQUFDLE1BQ3pDLElBQUltQixLQUFLLENBQUMsbUNBQW1DLENBQUM7VUFBQTtZQUV0RG5CLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQztZQUFDO1lBQUE7WUFBQSxPQUVwQzJ2Qix5QkFBeUI7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7WUFFL0IzdkIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLHlCQUF5QixDQUFDO1lBQUMsTUFDL0MsSUFBSW1CLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQztVQUFBO1lBR25EbkIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1lBQ3RDcXdCLFdBQVcsR0FBRyxJQUFJdkgsV0FBVyxDQUFDO2NBQ2xDQyx1QkFBdUIsRUFBdkJBLHVCQUF1QjtjQUN2Qm5qQixTQUFTLEVBQVRBLFNBQVM7Y0FDVDJaLGlCQUFpQixFQUFqQkEsaUJBQWlCO2NBQ2pCM2IsVUFBVSxFQUFWQSxVQUFVO2NBQ1Y2WCxRQUFRLEVBQVJBO1lBQ0YsQ0FBQyxDQUFDO1lBQUE7WUFBQSxPQUNJNFUsV0FBVyxDQUFDQyxZQUFZLEVBQUU7VUFBQTtZQUNoQ253QixrQkFBa0IsRUFBRTtZQUNwQkgsb0JBQW9CLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDO1lBQUMsY0FDNUNDLGVBQU07WUFBQTtZQUFBLE9BQXVDcVQsc0JBQXNCLENBQUMsR0FBRyxDQUFDO1VBQUE7WUFBQTtZQUFBLFlBQWpFOUwsT0FBTyxtQkFBQyxzQkFBc0I7VUFBQTtVQUFBO1lBQUE7UUFBQTtNQUFBO0lBQUE7RUFBQSxDQUN0QztFQUFBLGdCQXpFS2tvQixRQUFRO0lBQUE7RUFBQTtBQUFBLEdBeUViO0FBQUMsU0FFYUkscUJBQXFCO0VBQUE7QUFBQTtBQUFBO0VBQUEsb0ZBQXBDO0lBQUE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUNFOXZCLG9CQUFvQixDQUFDLEdBQUcsRUFBRSw0QkFBNEIsQ0FBQztZQUFDO1lBQUEsT0FDekJvdUIsOEJBQThCLEVBQUU7VUFBQTtZQUF6RHhzQixnQkFBZ0I7WUFBQSxJQUNqQkEsZ0JBQWdCO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUNyQjVCLG9CQUFvQixDQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQztZQUNoRHd3QixVQUFVLEdBQUcsSUFBSXBDLFVBQVUsQ0FBQztjQUFDeHNCLGdCQUFnQixFQUFoQkE7WUFBZ0IsQ0FBQyxDQUFDO1lBQUE7WUFBQSxPQUMvQzR1QixVQUFVLENBQUNWLHFCQUFxQixFQUFFO1VBQUE7WUFDeEM5dkIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDO1VBQUM7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBO0VBQUEsQ0FDekQ7RUFBQTtBQUFBO0FBQ0QsNkNBQWUwdkIsUUFBUTs7OztBQ3JHaUM7QUFDWDtBQUNkO0FBRS9CLElBQU16dkIsdUJBQU0sR0FBRyxJQUFJakIsVUFBTSxDQUFDLHNCQUFzQixDQUFDO0FBRTFDLFNBQWV5eEIsY0FBYztFQUFBO0FBQUE7QUFtQm5DO0VBQUEsNkVBbkJNLGlCQUE4Qmh2QixnQkFBZ0I7SUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ25EeEIsdUJBQU0sQ0FBQ1IsR0FBRyxDQUFDLDBCQUEwQixDQUFDO1lBQUM7WUFBQSx1QkFFZnNGLE1BQU0sQ0FBQ3dCLElBQUksQ0FBQzlFLGdCQUFnQixDQUFDO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUF4Q2l2QixPQUFPO1lBQ1Y3RSxPQUFPLDRCQUFHcHFCLGdCQUFnQixDQUFDaXZCLE9BQU8sQ0FBQywwREFBekIsc0JBQTJCN0UsT0FBTztZQUFBLElBQzdDQSxPQUFPO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQTtZQUNOOEUsaUJBQWlCLEdBQUcsSUFBSXZDLFVBQVUsQ0FBQztjQUFDQyxXQUFXLEVBQUV4QyxPQUFPO2NBQUVwQyxlQUFlLEVBQUU7WUFBRSxDQUFDLENBQUM7WUFBQTtZQUFBLE9BQzNFa0gsaUJBQWlCLENBQUNDLFVBQVUsRUFBRTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFDdEMzd0IsdUJBQU0sQ0FBQ1IsR0FBRyxpQ0FBMEJpeEIsT0FBTyxFQUFHO1lBQzlDMXdCLG9CQUFvQixDQUFDLEdBQUcsRUFBRTB3QixPQUFPLENBQUM7WUFBQyxpQ0FDNUJBLE9BQU87VUFBQTtZQUFBO1lBQUE7WUFBQTtVQUFBO1lBR2xCendCLHVCQUFNLENBQUNSLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztZQUFDLGlDQUNoQyxJQUFJO1VBQUE7WUFBQTtZQUFBO1lBRVhRLHVCQUFNLENBQUNxQixNQUFNLENBQUMsZ0NBQWdDLENBQUM7WUFBQyxpQ0FDekMsSUFBSTtVQUFBO1VBQUE7WUFBQTtRQUFBO01BQUE7SUFBQTtFQUFBLENBRWQ7RUFBQTtBQUFBOzs7O0FDekI4QjtBQUNjO0FBQ1Y7QUFLUDtBQU9OO0FBT0o7QUFDaUQ7QUFDSjtBQUUvRCxJQUFJdXZCLFFBQVEsR0FBRyxLQUFLO0FBRXBCLDJEQUFDO0VBQUE7RUFBQTtJQUFBO01BQUE7UUFBQTtVQUNDcHdCLGVBQWUsRUFBRTtVQUNicXdCLE9BQU8sR0FBRyxJQUFJO1VBQ1o3d0IsTUFBTSxHQUFHLElBQUlqQixVQUFNLEVBQUU7VUFDM0JpQixNQUFNLENBQUNULElBQUksQ0FBQyxxQkFBcUIsQ0FBQztVQUNsQ2pELE1BQU0sQ0FBQ3FiLFNBQVMsR0FBR3JiLE1BQU0sQ0FBQ3FiLFNBQVMsSUFBSSxFQUFFO1VBRXJDbVosWUFBWSxHQUFHLEtBQUs7VUFDcEJDLFdBQVcsR0FBRyxLQUFLO1VBQUE7VUFHckI7O1VBRUFoeEIsb0JBQW9CLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDO1VBQ3BEaXhCLHVCQUF1QixHQUFHNVIsNkNBQXVDLEVBQUU7VUFDekV5UixPQUFPLEdBQUcsSUFBSTdULGFBQU8sRUFBRTtVQUN2QjVJLHlCQUF5QixFQUFFO1VBQUM7VUFBQSxPQUNIcEwsYUFBYSxFQUFFO1FBQUE7VUFBbENyRixVQUFVO1VBQ2hCM0QsTUFBTSxDQUFDUixHQUFHLENBQUMsb0JBQW9CLEVBQUVtRSxVQUFVLENBQUM7VUFDNUM1RCxvQkFBb0IsQ0FBQyxZQUFZLEVBQUU0RCxVQUFVLENBQUM7VUFBQztVQUFBLE9BQ3ZCRSxZQUFZLENBQUNGLFVBQVUsQ0FBQztRQUFBO1VBQTFDdXRCLFNBQVM7VUFDZm54QixvQkFBb0IsQ0FBQyxXQUFXLEVBQUVteEIsU0FBUyxDQUFDO1VBQzVDbnhCLG9CQUFvQixDQUFDLFlBQVksRUFBRWhELElBQUksQ0FBQ21LLEdBQUcsRUFBRSxHQUFHUixJQUFJLENBQUNvQyxNQUFNLEVBQUUsQ0FBQztVQUM5RC9JLG9CQUFvQixDQUFDLEdBQUcsRUFBRXJELE9BQU8sQ0FBQztVQUNsQ3FELG9CQUFvQixDQUFDLElBQUksRUFBRXpDLFdBQVcsQ0FBQzs7VUFFdkM7VUFBQTtVQUFBLE9BQ011ekIsT0FBTyxDQUFDTSxzQkFBc0IsRUFBRTtRQUFBO1VBQ3RDL3VCLFVBQVUsQ0FBQyxZQUFNO1lBQ2ZsQyxrQkFBa0IsRUFBRTtVQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDOztVQUVSO1VBQ0l3ZixXQUFXLEdBQUcsSUFBSTtVQUNsQmxlLGdCQUFnQixHQUFHLElBQUk7VUFDckJ3RyxTQUFTLEdBQUcxTCxNQUFNLENBQUM2QyxZQUFZLENBQUNDLE9BQU8sQ0FBQ2hCLCtCQUErQixDQUFDO1VBQUEsTUFDMUU0SixTQUFTLEtBQUssYUFBYTtZQUFBO1lBQUE7VUFBQTtVQUFBO1VBQUEsT0FDSmdwQix1QkFBdUI7UUFBQTtVQUFoRHh2QixnQkFBZ0I7VUFBQSxJQUNYQSxnQkFBZ0I7WUFBQTtZQUFBO1VBQUE7VUFDbkJ6QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUM7VUFBQyxNQUN4QyxJQUFJbUIsS0FBSyxDQUFDLHlCQUF5QixDQUFDO1FBQUE7VUFBQTtVQUFBLE9BR3hCc3ZCLGNBQWMsQ0FBQ2h2QixnQkFBZ0IsQ0FBQztRQUFBO1VBQXBEa2UsV0FBVztRQUFBO1VBQUEsTUFLWHdSLFNBQVMsS0FBSyxJQUFJLElBQ2xCLENBQUM5bEIsU0FBUyxDQUFDNlQsVUFBVSxJQUNyQixPQUFPN1QsU0FBUyxDQUFDNlQsVUFBVSxLQUFLLFVBQVUsSUFDMUMsUUFBTzZFLE1BQU0sYUFBTkEsTUFBTSw0Q0FBTkEsTUFBTSxDQUFFc04sU0FBUyxzREFBakIsa0JBQW1CM2dCLFFBQVEsTUFBSyxVQUFVLElBQ2hEekksU0FBUyxJQUFJQSxTQUFTLEtBQUssYUFBYyxJQUN6QyxDQUFDMFgsV0FBWTtZQUFBO1lBQUE7VUFBQTtVQUVkcGpCLE1BQU0sQ0FBQ3FiLFNBQVMsQ0FBQ3RILElBQUksQ0FBQztZQUFDbEQsS0FBSyxFQUFFLE1BQU07WUFBRWtrQixPQUFPLEVBQUU7VUFBYSxDQUFDLENBQUM7VUFDOUQvMEIsTUFBTSxDQUFDNkMsWUFBWSxDQUFDOEgsT0FBTyxDQUFDN0ksK0JBQStCLEVBQUUsYUFBYSxDQUFDO1VBQzNFMkIsb0JBQW9CLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDO1VBQUMsTUFDbEQsSUFBSW1CLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztRQUFBO1VBR2pDb3dCLFdBQVcsR0FBR2gxQixNQUFNLENBQUM2QyxZQUFZLENBQUNDLE9BQU8sQ0FBQ2hCLGdDQUFnQyxDQUFDO1VBQzNFbXpCLGNBQWMsR0FBRzVwQixRQUFRLENBQUNiLGNBQWMsQ0FBQzFILE9BQU8sQ0FBQ3hCLGtDQUFrQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBRWhHO1VBQ00rSCxTQUFTLEdBQUdvQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBRTFDO1VBQUEsTUFDSSxDQUFDcEMsU0FBUyxJQUFJLENBQUNxQyxTQUFTLElBQUksQ0FBQ3NwQixXQUFXLElBQUlDLGNBQWMsR0FBRzl6Qix1QkFBdUI7WUFBQTtZQUFBO1VBQUE7VUFFdEZuQixNQUFNLENBQUNxYixTQUFTLENBQUN0SCxJQUFJLENBQUM7WUFBQ2xELEtBQUssRUFBRSxNQUFNO1lBQUVra0IsT0FBTyxFQUFFO1VBQWEsQ0FBQyxDQUFDO1VBQzlEdHhCLG9CQUFvQixDQUFDLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQztVQUFDLE1BQ25ELElBQUltQixLQUFLLENBQUMsYUFBYSxDQUFDO1FBQUE7VUFHaEM7VUFFQTtVQUVBO1VBQ01zd0IsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQixHQUFTO1lBQzdCbDFCLE1BQU0sQ0FBQ3FiLFNBQVMsQ0FBQ3RILElBQUksQ0FBQztjQUFDbEQsS0FBSyxFQUFFLE1BQU07Y0FBRWtrQixPQUFPLEVBQUU7WUFBVSxDQUFDLENBQUM7WUFDM0QvMEIsTUFBTSxDQUFDNkMsWUFBWSxDQUFDOEgsT0FBTyxDQUFDN0ksK0JBQStCLEVBQUUsVUFBVSxDQUFDO1lBQ3hFOUIsTUFBTSxDQUFDNkMsWUFBWSxDQUFDOEgsT0FBTyxDQUFDN0ksMkJBQTJCLEVBQUUsSUFBSSxDQUFDO1lBQzlEMkIsb0JBQW9CLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDO1lBQ25ELE1BQU0sSUFBSW1CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztVQUNuQyxDQUFDO1VBRUd1d0IsT0FBTyxHQUFHbjFCLE1BQU0sQ0FBQzZDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDaEIsMkJBQTJCLENBQUMsRUFDdEU7VUFBQSxNQUNJcXpCLE9BQU8sS0FBSyxJQUFJLElBQUlBLE9BQU8sS0FBS2pxQixTQUFTO1lBQUE7WUFBQTtVQUFBO1VBQUE7VUFBQSxPQUMzQjZMLHNCQUFzQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUM7UUFBQTtVQUE3RG9lLE9BQU87VUFBQTtVQUFBO1FBQUE7VUFFRixJQUFJQSxPQUFPLEtBQUssT0FBTyxJQUFJQSxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQ25EO1lBQ0FwZSxzQkFBc0IsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMxUSxJQUFJLENBQUMsVUFBQzh1QixPQUFPLEVBQUs7Y0FDOUQsSUFBSUEsT0FBTyxLQUFLQSxPQUFPLEtBQUssTUFBTSxJQUFJQSxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZERCxnQkFBZ0IsRUFBRTtjQUNwQjtZQUNGLENBQUMsQ0FBQztVQUNKO1FBQUM7VUFBQSxNQUVHQyxPQUFPLEtBQUtBLE9BQU8sS0FBSyxNQUFNLElBQUlBLE9BQU8sS0FBSyxJQUFJLENBQUM7WUFBQTtZQUFBO1VBQUE7VUFDckRELGdCQUFnQixFQUFFO1VBQUM7VUFBQTtRQUFBO1VBQUEsTUFDVkMsT0FBTyxLQUFLLElBQUksSUFBSUEsT0FBTyxLQUFLanFCLFNBQVM7WUFBQTtZQUFBO1VBQUE7VUFDbERWLGNBQWMsQ0FBQ0csT0FBTyxDQUFDckosa0NBQWtDLEVBQUUyekIsY0FBYyxHQUFHLENBQUMsQ0FBQztVQUM5RXh4QixvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUM7VUFBQyxNQUNoRCxJQUFJbUIsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1FBQUE7VUFFbEM1RSxNQUFNLENBQUM2QyxZQUFZLENBQUM4SCxPQUFPLENBQUM3SSwyQkFBMkIsRUFBRSxLQUFLLENBQUM7UUFBQztVQUFBLElBRzdEOUIsTUFBTSxDQUFDNkQsR0FBRyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDRyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQUE7WUFBQTtVQUFBO1VBQ3RFcUcsY0FBYyxDQUFDRyxPQUFPLENBQUNySixrQ0FBa0MsRUFBRTJ6QixjQUFjLEdBQUcsQ0FBQyxDQUFDO1VBQzlFeHhCLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQztVQUFDLE1BQ2hELElBQUltQixLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFBQTtVQUd6QztVQUVBO1VBQ0l3d0IsSUFBSSxHQUFHLElBQUk7VUFBQSxLQUVYL3JCLFNBQVM7WUFBQTtZQUFBO1VBQUE7VUFDWDNGLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLDBEQUEwRCxDQUFDO1VBQ3RFa3lCLElBQUksR0FBRyxJQUFJO1VBQ1hwMUIsTUFBTSxDQUFDcWIsU0FBUyxDQUFDdEgsSUFBSSxDQUFDO1lBQUNsRCxLQUFLLEVBQUUsTUFBTTtZQUFFa2tCLE9BQU8sRUFBRTtVQUFVLENBQUMsQ0FBQztVQUMzRHR4QixvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUM7VUFBQztVQUFBO1FBQUE7VUFBQSxNQUM1Q2lJLFNBQVMsSUFBSUEsU0FBUyxLQUFLLFVBQVU7WUFBQTtZQUFBO1VBQUE7VUFDOUNoSSxNQUFNLENBQUNILElBQUksQ0FBQyxzQkFBc0IsQ0FBQztVQUNuQztVQUNBNnhCLElBQUksR0FBR1IsU0FBUyxJQUFJNXpCLFdBQVc7VUFDL0JoQixNQUFNLENBQUNxYixTQUFTLENBQUN0SCxJQUFJLENBQUM7WUFBQ2xELEtBQUssRUFBRSxNQUFNO1lBQUVra0IsT0FBTyxFQUFFO1VBQVUsQ0FBQyxDQUFDO1VBQzNEdHhCLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQztVQUFDO1VBQUE7UUFBQTtVQUFBLEtBQzVDaUksU0FBUztZQUFBO1lBQUE7VUFBQTtVQUNsQmpJLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQztVQUFDLE1BQ2hELElBQUltQixLQUFLLENBQUMsNkJBQTZCLENBQUM7UUFBQTtVQUU5QztVQUNBLElBQUlnd0IsU0FBUyxJQUFJNXpCLFdBQVcsRUFBRTtZQUM1Qm8wQixJQUFJLEdBQUcsSUFBSTtZQUNYcDFCLE1BQU0sQ0FBQ3FiLFNBQVMsQ0FBQ3RILElBQUksQ0FBQztjQUFDbEQsS0FBSyxFQUFFLE1BQU07Y0FBRWtrQixPQUFPLEVBQUU7WUFBTSxDQUFDLENBQUM7VUFDekQsQ0FBQyxNQUFNLElBQUlILFNBQVMsSUFBSTV6QixXQUFXLEdBQUMsQ0FBQyxFQUFFO1lBQ3JDbzBCLElBQUksR0FBRyxLQUFLO1lBQ1pwMUIsTUFBTSxDQUFDcWIsU0FBUyxDQUFDdEgsSUFBSSxDQUFDO2NBQUNsRCxLQUFLLEVBQUUsTUFBTTtjQUFFa2tCLE9BQU8sRUFBRTtZQUFRLENBQUMsQ0FBQztVQUMzRCxDQUFDLE1BQU07WUFDTEssSUFBSSxHQUFHLEtBQUs7WUFDWnAxQixNQUFNLENBQUNxYixTQUFTLENBQUN0SCxJQUFJLENBQUM7Y0FBQ2xELEtBQUssRUFBRSxNQUFNO2NBQUVra0IsT0FBTyxFQUFFO1lBQVEsQ0FBQyxDQUFDO1VBQzNEO1VBRUF0eEIsb0JBQW9CLENBQUMsTUFBTSxFQUFFMnhCLElBQUksQ0FBQztVQUNsQ3AxQixNQUFNLENBQUM2QyxZQUFZLENBQUM4SCxPQUFPLENBQUM3SSxnQ0FBZ0MsRUFBRSxJQUFJLENBQUM7VUFDbkUyQixvQkFBb0IsQ0FBQyxTQUFTLEVBQUUyeEIsSUFBSSxDQUFDMWhCLFFBQVEsRUFBRSxDQUFDO1FBQUM7VUFBQTtVQUFBLE9BTTVCcUQsc0JBQXNCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztRQUFBO1VBQXpEbUksUUFBUTtVQUFBLE1BQ1ZBLFFBQVEsS0FBSyxVQUFVO1lBQUE7WUFBQTtVQUFBO1VBQUE7VUFBQSxPQUNuQm5JLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDO1FBQUE7VUFBQTtVQUFBLE9BQzFEQSxzQkFBc0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztRQUFBO1VBQUE7VUFBQSxPQUU5RHdkLE9BQU8sQ0FBQ2MsUUFBUSxDQUFDLElBQUksQ0FBQztRQUFBO1VBQzVCO1VBQ0FmLFFBQVEsR0FBRyxJQUFJO1VBQUM7VUFBQTtRQUFBO1VBRWhCO1VBQ0FDLE9BQU8sQ0FBQ2MsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUFDO1VBRTFCYixZQUFZLEdBQUcsSUFBSTs7VUFFbkI7VUFBQSxNQUVJWSxJQUFJLEtBQUssSUFBSTtZQUFBO1lBQUE7VUFBQTtVQUNmLElBQUksQ0FBQ2QsUUFBUSxFQUFFO1lBQ2I1d0IsTUFBTSxDQUFDUixHQUFHLENBQUMsc0JBQXNCLENBQUM7WUFDbENpd0IsUUFBUSxDQUFDOXJCLFVBQVUsRUFBRWdDLFNBQVMsRUFBRTZWLFFBQVEsRUFBRWhhLGdCQUFnQixDQUFDO1VBQzdELENBQUMsTUFBTTtZQUNMeEIsTUFBTSxDQUFDVCxJQUFJLENBQUMsK0JBQStCLENBQUM7WUFDNUNXLGtCQUFrQixFQUFFO1lBQ3BCNndCLFdBQVcsR0FBRyxJQUFJO1VBQ3BCO1VBQUM7VUFBQTtRQUFBO1VBQUEsTUFDUVcsSUFBSSxLQUFLLEtBQUs7WUFBQTtZQUFBO1VBQUE7VUFDdkIxeEIsTUFBTSxDQUFDVCxJQUFJLENBQUMsdUJBQXVCLENBQUM7VUFDcENXLGtCQUFrQixFQUFFO1VBQ3BCNndCLFdBQVcsR0FBRyxJQUFJO1VBQUM7VUFBQTtRQUFBO1VBQUEsTUFFYixJQUFJN3ZCLEtBQUssQ0FBQywyQkFBMkIsQ0FBQztRQUFBO1VBQUE7VUFBQTtRQUFBO1VBQUE7VUFBQTtVQUc5Q2xCLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLFlBQUl5QixPQUFPLENBQUM7VUFDN0R2QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsWUFBSXVCLE9BQU8sQ0FBQztVQUN0QyxJQUFJLENBQUN3dkIsWUFBWSxJQUFJRCxPQUFPLEVBQUVBLE9BQU8sQ0FBQ2MsUUFBUSxDQUFDLEtBQUssQ0FBQztVQUNyRCxJQUFJLENBQUNaLFdBQVcsRUFBRTd3QixrQkFBa0IsRUFBRTtRQUFDO1FBQUE7VUFBQTtNQUFBO0lBQUE7RUFBQTtBQUFBLENBRTFDLElBQUcsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJvcGVydHlLZXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL3N0cmluZ1V0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvbG9nZ2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlRGF0YUNvbGxlY3Rpb24vc3RvcmUuY29uZmlnLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlRGF0YUNvbGxlY3Rpb24vYXBpLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlRGF0YUNvbGxlY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVJbmZvTGF5ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVNb25pdG9yL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9hY3Rpb24tY29uZGl0aW9uLXV0aWwuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9hc3luYy1tdXRleC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVPbi9yb2JvdEVuZ2luZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZGF0YUxheWVyQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZWxlbWVudENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2Z1bmN0aW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvc2Vzc2lvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3VybENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VudkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Byb2R1Y3RJbmZvQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVPbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQ2xpZW50U0RLL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIFwidXNlIHN0cmljdFwiOyAvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovXG4gIG1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSA9IGZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIGV4cG9ydHMgPSB7fSxcbiAgICBPcCA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHksXG4gICAgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgICBvYmpba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgfSxcbiAgICAkU3ltYm9sID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgPyBTeW1ib2wgOiB7fSxcbiAgICBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCIsXG4gICAgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICAgIHdyaXRhYmxlOiAhMFxuICAgIH0pLCBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yLFxuICAgICAgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpLFxuICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KSwgZ2VuZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpICYmIChJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKFwidGhyb3dcIiAhPT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmcsXG4gICAgICAgICAgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiBcIm9iamVjdFwiID09IF90eXBlb2YodmFsdWUpICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikgPyBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkgOiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQsIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICB9XG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgaWYgKFwiZXhlY3V0aW5nXCIgPT09IHN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgIGlmIChcInRocm93XCIgPT09IG1ldGhvZCkgdGhyb3cgYXJnO1xuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZCwgY29udGV4dC5hcmcgPSBhcmc7Oykge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcIm5leHRcIiA9PT0gY29udGV4dC5tZXRob2QpIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztlbHNlIGlmIChcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB7XG4gICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBjb250ZXh0Lm1ldGhvZCAmJiBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBcImNvbXBsZXRlZFwiIDogXCJzdXNwZW5kZWRZaWVsZFwiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUgJiYgKHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZCxcbiAgICAgIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgIGlmICh1bmRlZmluZWQgPT09IG1ldGhvZCkgcmV0dXJuIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBcInRocm93XCIgPT09IG1ldGhvZE5hbWUgJiYgZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0gJiYgKGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQsIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpLCBcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB8fCBcInJldHVyblwiICE9PSBtZXRob2ROYW1lICYmIChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAnXCIgKyBtZXRob2ROYW1lICsgXCInIG1ldGhvZFwiKSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgcmV0dXJuIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcsIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICByZXR1cm4gaW5mbyA/IGluZm8uZG9uZSA/IChjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZSwgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYywgXCJyZXR1cm5cIiAhPT0gY29udGV4dC5tZXRob2QgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpIDogaW5mbyA6IChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIiksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG4gICAgMSBpbiBsb2NzICYmIChlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV0pLCAyIGluIGxvY3MgJiYgKGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdLCBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM10pLCB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIiwgZGVsZXRlIHJlY29yZC5hcmcsIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV0sIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKSwgdGhpcy5yZXNldCghMCk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGl0ZXJhYmxlLm5leHQpIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgZm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkgcmV0dXJuIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dC52YWx1ZSA9IHVuZGVmaW5lZCwgbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogITBcbiAgICB9O1xuICB9XG4gIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lUHJvcGVydHkoR3AsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSwgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBnZW5GdW4gJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiAhIWN0b3IgJiYgKGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA9PT0gKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSk7XG4gIH0sIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpIDogKGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIikpLCBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCksIGdlbkZ1bjtcbiAgfSwgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKSwgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIHZvaWQgMCA9PT0gUHJvbWlzZUltcGwgJiYgKFByb21pc2VJbXBsID0gUHJvbWlzZSk7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKSwgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIiksIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pLCBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpLFxuICAgICAga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cy5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsga2V5cy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkgcmV0dXJuIG5leHQudmFsdWUgPSBrZXksIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgIH07XG4gIH0sIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoc2tpcFRlbXBSZXNldCkge1xuICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQsIHRoaXMuZG9uZSA9ICExLCB0aGlzLmRlbGVnYXRlID0gbnVsbCwgdGhpcy5tZXRob2QgPSBcIm5leHRcIiwgdGhpcy5hcmcgPSB1bmRlZmluZWQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhc2tpcFRlbXBSZXNldCkgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgIFwidFwiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLmRvbmUgPSAhMDtcbiAgICAgIHZhciByb290UmVjb3JkID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByb290UmVjb3JkLnR5cGUpIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSBcInRocm93XCIsIHJlY29yZC5hcmcgPSBleGNlcHRpb24sIGNvbnRleHQubmV4dCA9IGxvYywgY2F1Z2h0ICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKFwicm9vdFwiID09PSBlbnRyeS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIiksXG4gICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNGaW5hbGx5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHRocm93IHJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSByZWNvcmQudHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHJlY29yZC50eXBlID8gdGhpcy5uZXh0ID0gcmVjb3JkLmFyZyA6IFwicmV0dXJuXCIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSBcInJldHVyblwiLCB0aGlzLm5leHQgPSBcImVuZFwiKSA6IFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIGZpbmlzaChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uIF9jYXRjaCh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gZGVsZWdhdGVZaWVsZChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9LCBcIm5leHRcIiA9PT0gdGhpcy5tZXRob2QgJiYgKHRoaXMuYXJnID0gdW5kZWZpbmVkKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH0sIGV4cG9ydHM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvYmopO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS5cblxudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi4vaGVscGVycy9yZWdlbmVyYXRvclJ1bnRpbWVcIikoKTtcbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcblxuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9wYWNrYWdlcy9ydW50aW1lL3J1bnRpbWUuanMjTDczNj1cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCB0b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGNvbnN0IHJlcGxhY2VBbGwgPSAoc3RyLCBmaW5kLCByZXBsYWNlID0gXCJcIikgPT4ge1xuICBpZiAoIXN0cikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgaWYgKGluZGV4IDwgMCkgcmV0dXJuIHN0cjtcblxuICB3aGlsZSAoc3RyLmluZGV4T2YoZmluZCkgPj0gMCkge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gICAgc3RyID0gKGluZGV4ID4gMCA/IHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpIDogXCJcIikgKyByZXBsYWNlICsgc3RyLnN1YnN0cmluZyhpbmRleCArIGZpbmQubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5leHBvcnQgY29uc3QgdHVya2lzaFRvTG93ZXIgPSAoc3RyKSA9PiB7XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XG4gIGxldCBzdHJpbmcgPSBzdHI7XG4gIGNvbnN0IGxldHRlcnMgPSB7XCLEsFwiOiBcImlcIiwgXCJJXCI6IFwixLFcIiwgXCLFnlwiOiBcIsWfXCIsIFwixJ5cIjogXCLEn1wiLCBcIsOcXCI6IFwiw7xcIiwgXCLDllwiOiBcIsO2XCIsIFwiw4dcIjogXCLDp1wifTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygoW8SwScWexJ7DnMOHw5ZdKSkvZywgZnVuY3Rpb24obGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlcnNbbGV0dGVyXTtcbiAgfSk7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuL3N0cmluZ1V0aWxzXCI7XG5jb25zdCBpc1N0YWdpbmcgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJzdGFnaW5nLnZpdmVuc2VcIikgOiB0cnVlO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMC4wLjM5LjVcIjtcbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA9IFwiX2dhXCI7XG4vLyBUT0RPIHJldmVydCB0aGUgZm9sbG93aW5nIHN0YWdpbmcgZW52IGNoZWNrIGFmdGVyIG1vdmluZyB0byBuZXcgYnJhbmNoIHN0cnVjdHVyZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNUWUxFU0hFRVRfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzX3N0YWdpbmcuY3NzXCIgOiBgaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXMuY3NzP2lkPSR7cmVwbGFjZUFsbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEzKS5yZXBsYWNlKFwiVFwiLCBcIlwiKSwgXCItXCIsIFwiXCIpfWA7XG5leHBvcnQgY29uc3QgRV9SVUxFU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlc19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlcy5qc29uXCI7XG5leHBvcnQgY29uc3QgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OID0gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3NvY2lhbC1wcm9vZi12Mi1zdGFnaW5nLmpzb25cIjtcbmV4cG9ydCBjb25zdCBMT0dfQVBJX1VSTCA9IFwiaHR0cHM6Ly9ldXJvcGUtd2VzdDMtbmV4dGRheS0zNGViMy5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2xvZ1wiO1xuZXhwb3J0IGNvbnN0IExPT0tVUF9BUElfVVJMID0gXCJodHRwczovL2NhdGFsb2ctYXBpLmFkb3JhYWkuY29tXCI7XG5leHBvcnQgY29uc3QgTU9CSUxFX01FRElBX1FVRVJZID0gXCIobWF4LXdpZHRoOiA0NDBweClcIjtcbi8vIENvbnRyb2wgZ3JvdXAgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFNQTElUX1JBVElPID0gNTA7XG4vLyBTa2lwcGVkIHRyZWF0bWVudCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMgPSAyO1xuZXhwb3J0IGNvbnN0IE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OID0gMTtcbmV4cG9ydCBjb25zdCBMSVNUX01PREVfQkVBR0xFX0tFWVMgPSBbXCJwYWdldHlwZVwiLCBcImNhdGVnb3J5XCIsIFwiYWxsdGltZVBMUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QTFBDYXRlZ29yeU1vZGVcIixcbiAgXCJhbGx0aW1lUERQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBEUENhdGVnb3J5TW9kZVwiLCBcImFsbHRpbWVDYXJ0Q2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvbkNhcnRDYXRlZ29yeU1vZGVcIl07XG5leHBvcnQgY29uc3QgSURMRV9USU1FT1VUID0gMTUwMDA7XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OX1NUT1JBR0VfS0VZUyA9IHtcbiAgU0VTU0lPTl9USU1FU1RBTVA6IFwiQkdfU2Vzc2lvblRpbWVzdGFtcFwiLFxuICBTRVNTSU9OX0hJU1RPUlk6IFwiQkdfU2Vzc2lvbkhpc3RvcnlcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFRJTUVPVVRfQ09VTlQ6IFwiQkdfVGltZW91dENvdW50XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG4gIE1BVENIRURfVFJFQVRNRU5UUzogXCJHTFZfTWF0Y2hlZFwiLFxufTtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0tFWVMgPSB7XG4gIFRSRUFUTUVOVFM6IFwiQkdfVHJlYXRtZW50c1wiLFxuICBXRUlHSFRTOiBcIkJHX1dlaWdodHNcIixcbiAgRUxJR0lCSUxJVFlfUlVMRVM6IFwiQkdfRV9SdWxlc1wiLFxuICBERUJVR19NT0RFOiBcIkJHX0RlYnVnXCIsXG4gIE9VVF9PRl9TQ09QRTogXCJCR19PdXRPZlNjb3BlXCIsXG4gIElTX0xBQkVMX1NFTlQ6IFwiQkdfTGFiZWxTZW50XCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAwXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG4gIElTX0FETUlOOiBcIkdMVl9Jc0FkbWluXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gbnVsbCA9PSBhcnIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IF9pKSB7XG4gICAgdmFyIF9zLFxuICAgICAgX2UsXG4gICAgICBfeCxcbiAgICAgIF9yLFxuICAgICAgX2FyciA9IFtdLFxuICAgICAgX24gPSAhMCxcbiAgICAgIF9kID0gITE7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfeCA9IChfaSA9IF9pLmNhbGwoYXJyKSkubmV4dCwgMCA9PT0gaSkge1xuICAgICAgICBpZiAoT2JqZWN0KF9pKSAhPT0gX2kpIHJldHVybjtcbiAgICAgICAgX24gPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShfbiA9IChfcyA9IF94LmNhbGwoX2kpKS5kb25lKSAmJiAoX2Fyci5wdXNoKF9zLnZhbHVlKSwgX2Fyci5sZW5ndGggIT09IGkpOyBfbiA9ICEwKSB7XG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gITAsIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIG51bGwgIT0gX2lbXCJyZXR1cm5cIl0gJiYgKF9yID0gX2lbXCJyZXR1cm5cIl0oKSwgT2JqZWN0KF9yKSAhPT0gX3IpKSByZXR1cm47XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2FycjtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAga2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgU1RZTEVTSEVFVF9MT0NBVElPTixcbiAgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04sXG4gIFRSRUFUTUVOVFNfTE9DQVRJT04sXG4gIEVfUlVMRVNfTE9DQVRJT04sXG4gIFBST0RVQ1RfSU5GT19MT0NBVElPTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3Qgc3dpdGNoVG9FYXNlT3V0ID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtaGlkZVwiKSkgcmV0dXJuO1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZWwudGV4dENvbnRlbnQgPSBgLmdsb3YtZWFzZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtby1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tcy1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIGFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7fVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMjU7fVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuNTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC43NTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7fVxuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDt9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4yNTt9XG4gICAgNTAlIHsgb3BhY2l0eTogMC41O31cbiAgICA3NSUgeyBvcGFjaXR5OiAwLjc1O31cbiAgICAxMDAlIHsgb3BhY2l0eTogMTt9XG4gIH1gO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5wcmVwZW5kKGVsKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdsb3YtZWFzZVwiKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3QgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoUGx1cyhUUkVBVE1FTlRTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXRyZWF0bWVudHMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnQgPSBhd2FpdCB0cmVhdG1lbnRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCB0cmVhdG1lbnRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50V2VpZ2h0cyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50IHdlaWdodHNcIik7XG4gICAgY29uc3QgdHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IGZldGNoUGx1cyhUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRXZWlnaHRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IHRyZWF0bWVudFdlaWdodHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50V2VpZ2h0cztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCB0cmVhdG1lbnQgd2VpZ2h0c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIGVsaWdpYmlsaXR5IHJ1bGVzXCIpO1xuICAgIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBmZXRjaFBsdXMoRV9SVUxFU19MT0NBVElPTik7XG4gICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uRWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGVsaWdpYmlsaXR5UnVsZXMuanNvbigpO1xuICAgIHJldHVybiBqc29uRWxpZ2liaWxpdHlSdWxlcztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCBlbGlnaWJpbGl0eSBydWxlc1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFByb2R1Y3RJbmZvID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBwcm9kdWN0IGluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBmZXRjaFBsdXMoUFJPRFVDVF9JTkZPX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb0pzb24gPSBhd2FpdCBwcm9kdWN0SW5mby5qc29uKCk7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvSnNvbjtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCBwcm9kdWN0IGluZm9cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCB0aW1lb3V0ID0gKHRpbWUpID0+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIHRpbWUpO1xuICByZXR1cm4gY29udHJvbGxlcjtcbn07XG5cbmNvbnN0IGZldGNoUGx1cyA9ICh1cmwsIG9wdGlvbnMgPSB7fSwgcmV0cmllcyA9IDUpID0+XG4gIGZldGNoKHVybCwgey4uLm9wdGlvbnMsIHNpZ25hbDogdGltZW91dCg1MDAwKS5zaWduYWx9KVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0cmllcyA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZmV0Y2hQbHVzKHVybCwgb3B0aW9ucywgcmV0cmllcyAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXMuc3RhdHVzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGZXRjaCB0aW1lZCBvdXQgUmV0cnlpbmcuLi46IFwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICByZXR1cm4gZmV0Y2hQbHVzKHVybCwgb3B0aW9ucywgcmV0cmllcyAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGZXRjaCBmYWlsZWQ6IFwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDb29raWVJZGVudGlmaWVyID0gKGNvb2tpZVN0cmluZywgY29va2llTmFtZSkgPT4ge1xuICBpZiAoIWNvb2tpZVN0cmluZykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gY29va2llU3RyaW5nXG4gICAgICAuc3BsaXQoXCI7XCIpXG4gICAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiPVwiKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICBpZiAodlswXSAmJiB2WzFdKSB7XG4gICAgICAgICAgYWNjW2RlY29kZVVSSUNvbXBvbmVudCh2WzBdLnRyaW0oKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZbMV0udHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gIGxldCBpZGVudGlmaWVyID0gcGFyc2VkW2Nvb2tpZU5hbWVdO1xuICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29va2llTmFtZSA9PT0gXCJfZ2FcIikge1xuICAgIC8vIGV4dHJhY3QgdW5pcXVlIGlkZW50aWZpZXIgZnJvbSBHQSBjb29raWVcbiAgICBjb25zdCBpZGVudGlmaWVySW5kZXggPSAyO1xuICAgIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyLnNwbGl0KFwiLlwiKVtpZGVudGlmaWVySW5kZXhdO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldGVybWluZVBjdCA9IGFzeW5jIChpZGVudGlmaWVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgaGFzaCA9IGdldFVuc2VjdXJlSGFzaChpZGVudGlmaWVyKTtcbiAgICBpZiAoaGFzaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHBjdCA9IGhhc2ggJSAxMDA7XG4gICAgaWYgKHBjdCA+PSAwICYmIHBjdCA8IDEwMCkge1xuICAgICAgcmV0dXJuIHBjdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleGl0U2Nyb2xsTGlzdGVuZXIgPSAoY2FsbEJhY2spID0+IHtcbiAgY29uc3QgbG9vcCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKGxhc3RTY3JvbGxUb3AgLSA0MDAgPiBzY3JvbGxUb3ApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZXhpdFNjcm9sbEludGVydmFsKTtcbiAgICAgIGNhbGxCYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgfVxuICB9O1xuXG4gIGxldCBsYXN0U2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICBjb25zdCBleGl0U2Nyb2xsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChsb29wLCA1MDApO1xufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGFwcGx5IHRyZWF0bWVudHMgdG8gdGhlIHBhZ2Ugb24gc3BlY2lmaWMgbWVkaWEgdHlwZS5cbiAqIEBwYXJhbSB7TWVkaWFRdWVyeUxpc3R9IG1lZGlhUXVlcnlDb25kaXRpb24gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1MDBweClcIilcbiAqIEBwYXJhbSB7RE9NTm9kZUxpc3QgfSBlbGVtZW50cyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2LnByb2R1Y3RfaW5mb1wiKVxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlQ2hhbmdlc01hcCB7IFwibWFyZ2luLXRvcFwiIDogXCIxMHJlbVwifVxuICogQHJldHVybnNcbiAqL1xuXG5leHBvcnQgY29uc3Qgc3R5bGVBcHBsaWNhdG9yID0gKGVsZW1lbnRzLCBzdHlsZUNoYW5nZXNNYXApID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlIGNoYW5nZXNcIiwgc3R5bGVDaGFuZ2VzTWFwLCBcInRvIGVsZW1lbnRzXCIsIGVsZW1lbnRzKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzdHlsZUNoYW5nZXNNYXApKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbmplY3RTdHlsZVNoZWV0ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdHlsZVNoZWV0ID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgc3R5bGVTaGVldC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgc3R5bGVTaGVldC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICBzdHlsZVNoZWV0LmhyZWYgPSBTVFlMRVNIRUVUX0xPQ0FUSU9OO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUFjdGlvbnMgPSBhc3luYyAoaWRlbnRpZmllciwgYWN0aW9uc1RvUHJlcGFyZSwgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSkgPT4ge1xuICBjb25zdCBhY3Rpb25zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhY3Rpb25zVG9QcmVwYXJlKSk7XG4gIGxldCB2YXJpYW50ID0gbnVsbDtcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgIGNvbnN0IHtidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMsIHZhcmlhbnRzfSA9IGFjdGlvbjtcbiAgICBpZiAoIWJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyAmJiAhdmFyaWFudHMpIGNvbnRpbnVlO1xuICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiBidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJpZFwiKSB7XG4gICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFyaWFudHMpIHtcbiAgICAgIGZvciAoY29uc3QgW2luZGV4LCB2YXJpYW50S2V5XSBvZiBPYmplY3Qua2V5cyh2YXJpYW50cykuZW50cmllcygpKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgdmFyaWFudEtleSk7XG4gICAgICAgIGlmIChkZWJ1Z01vZGUgJiYgIWFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0ID0gTWF0aC5mbG9vcigxMDAgLyBPYmplY3Qua2V5cyh2YXJpYW50cykubGVuZ3RoKSAqIChpbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5kb21QY3QgPCBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgdmFyaWFudCA9IHZhcmlhbnRLZXk7XG4gICAgICAgICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIHZhcmlhbnRzW3ZhcmlhbnRLZXldLmJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIHZhcmlhbnRzW3ZhcmlhbnRLZXldLmJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcImlkXCIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgIT09IFwid2VpZ2h0XCIgJiYga2V5ICE9PSBcImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9uc1wiKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSB2YXJpYW50c1t2YXJpYW50S2V5XVtrZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbYWN0aW9ucywgdmFyaWFudF07XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUcsIFNFU1NJT05fVElNRVNUQU1QLCBTRVNTSU9OX0hJU1RPUll9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgcG9wdXBEaXNwbGF5RmxhZyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKTtcbiAgY29uc3Qgc2Vzc2lvblRpbWVzdGFtcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVApO1xuICBjb25zdCBzZXNzaW9uSGlzdG9yeSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9ISVNUT1JZKTtcblxuICBpZiAocG9wdXBEaXNwbGF5RmxhZyA9PT0gbnVsbCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAwKTtcbiAgfVxuICBpZiAoIXNlc3Npb25UaW1lc3RhbXApIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QLCBEYXRlLm5vdygpKTtcbiAgfVxuICBpZiAoIXNlc3Npb25IaXN0b3J5KSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVdKTtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgc2Vzc2lvbkhpc3RvcnldKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmRpdGlvbkNoZWNrZXIgPSAocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGlmIChjb25kaXRpb24gPT09IFwibm90RXhpc3RcIikge1xuICAgIGlmICghcnVuVGltZVZhbHVlKSB7XG4gICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8XG4gICAgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICBjb25kaXRpb24gPT09IG51bGwgfHxcbiAgICBjb25kaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBydW5UaW1lVmFsdWUgb3IgY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKGNvbmRpdGlvbikge1xuICAgIGNhc2UgXCJleGlzdFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIGV4aXN0XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJpbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJjb250YWluc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90SW5jbHVkZXNcIjpcbiAgICBjYXNlIFwibm90Q29udGFpbnNcIjpcbiAgICAgIGlmICghcnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJlcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RFcXVhbFwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZXF1YWxzIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzVGhhblwiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJncmVhdGVyRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJsZXNzRXF1YWxzXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDw9IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJiZXR3ZWVuXCI6IHtcbiAgICAgIGxldCBbbWluLCBtYXhdID0gdmFsdWUuc3BsaXQoXCIsXCIpO1xuICAgICAgbWluID0gcGFyc2VJbnQobWluKTtcbiAgICAgIG1heCA9IHBhcnNlSW50KG1heCk7XG4gICAgICBpZiAocnVuVGltZVZhbHVlID49IG1pbiAmJiBydW5UaW1lVmFsdWUgPD0gbWF4KSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGlzIGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGJldHdlZW4gbWluIGFuZCBtYXhcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNhc2UgXCJyZWdleFwiOiB7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsdWUsIFwiaVwiKTtcbiAgICAgIHJldHVybiByZWdleC50ZXN0KHJ1blRpbWVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogY29uZGl0aW9uIGlzIG5vdCBkZWZpbmVkIFwiLCBjb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGVidWdNb2RlID0gKG9vc1JlYXNvbikgPT4ge1xuICBjb25zdCB7REVCVUdfTU9ERSwgT1VUX09GX1NDT1BFfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz1cIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oT1VUX09GX1NDT1BFLCBvb3NSZWFzb24pO1xuICB9XG5cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAxKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAxO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTJcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMjtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0wXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKERFQlVHX01PREUpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib2ZmXCIpO1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IGN1cnJlbnQgPSBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oREVCVUdfTU9ERSkpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCAoY3VycmVudCA/IFwib25cIiA6IFwib2ZmXCIpKTtcbiAgcmV0dXJuIChjdXJyZW50IHx8IDApO1xufTtcblxuLy8gZ2V0IEdBIGNsaWVudCBpZCB1c2luZyBnYS5nZXRBbGwoKVxuZXhwb3J0IGNvbnN0IGdldEdhQ2xpZW50SWQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhID0gd2luZG93LmdhO1xuICAvLyBpZiBnYSBhbmQgZ2EuZ2V0QWxsKCkgaXMgbm90IGRlZmluZWQsIHJldHVybiBudWxsXG4gIGlmIChnYSAmJiBnYS5nZXRBbGwpIHtcbiAgICBjb25zdCB0cmFja2VycyA9IGdhLmdldEFsbCgpO1xuICAgIGlmICh0cmFja2VycyAmJiB0cmFja2Vycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cmFja2Vyc1swXS5nZXQoXCJjbGllbnRJZFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBnZXQgZGV0ZXJtaW5pc3RpYyBudW1lcmljIGhhc2ggZnJvbSBzdHJpbmcgdGhhdCBjb25hdGlucyBvbmx5IG51bWJlcnNcbmV4cG9ydCBjb25zdCBnZXRVbnNlY3VyZUhhc2ggPSAoc3RyKSA9PiB7XG4gIGxldCBoYXNoID0gMDtcbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgfVxuICAvLyByZXR1cm4gYWJzb2x1dGUgdmFsdWVcbiAgcmV0dXJuIE1hdGguYWJzKGhhc2gpO1xufTtcblxuLy8gZ2VuZXJhdGUgYSAzMi1iaXQgcmFuZG9tIGludGVnZXJcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCk7XG59O1xuXG4vLyBnZXQgY3VycmVudCB1bml4IGVwb2NoIHRpbWUgaW4gc2Vjb25kc1xuZXhwb3J0IGNvbnN0IGdldFVuaXhUaW1lID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZXRJZGVudGlmaWVyID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGlkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lEKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGxvY2FsIHN0b3JhZ2VcIiwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYSBpbiBmaXJzdCBhdHRlbXB0XCIsIGlkKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHRyYWN0SWRlbnRpZmllckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBnYVwiLCBpZCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5VU0VSX0lELCBpZCk7XG4gICAgICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCByZWFkIEdBIGNsaWVudCBpZFwiKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgaW4gZ2V0SWRlbnRpZmllclwiLCBlKTtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxheSA9IChtcykgPT4gbmV3IFByb21pc2UoKHJlcykgPT4gc2V0VGltZW91dChyZXMsIG1zKSk7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREZWxpdmVyeURhdGUgPSAoZGF0ZSkgPT4ge1xuICBpZiAoIWRhdGUgfHwgdHlwZW9mIGRhdGUgIT09IFwic3RyaW5nXCIpIHJldHVybiBkYXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBzdGFydE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBlbmRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgc3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICBlbmREYXk6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBsZXQgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKS0oW1xcXFxkXSspXFxcXHM/KFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA9PT0gNCkge1xuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbM10udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSByZXN1bHQuc3RhcnRNb250aEluZGV4O1xuICB9IGVsc2Uge1xuICAgIG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspLShbXFxcXGRdKylcXFxccysoW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gubGVuZ3RoICE9PSA1KSByZXR1cm4gZGF0ZTtcblxuICAgIHJlc3VsdC5zdGFydERheSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzJdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgcmVzdWx0LmVuZE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbNF0udG9Mb3dlckNhc2UoKV07XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIGlmICghcmVzdWx0LnN0YXJ0TW9udGhJbmRleCB8fCAhcmVzdWx0LmVuZE1vbnRoSW5kZXgpIHJldHVybiBkYXRlO1xuXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuICAgIGNvbnN0IGVuZFllYXIgPSByZXN1bHQuZW5kTW9udGhJbmRleCA+PSB0b2RheS5nZXRNb250aCgpID8gdG9kYXkuZ2V0RnVsbFllYXIoKSA6IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAxO1xuXG4gICAgY29uc3QgZXN0aW1hdGVkU3RhcnQgPSBuZXcgRGF0ZShzdGFydFllYXIsIHJlc3VsdC5zdGFydE1vbnRoSW5kZXgsIHJlc3VsdC5zdGFydERheSk7XG4gICAgY29uc3QgZXN0aW1hdGVkRW5kID0gbmV3IERhdGUoZW5kWWVhciwgcmVzdWx0LmVuZE1vbnRoSW5kZXgsIHJlc3VsdC5lbmREYXkpO1xuXG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRTdGFydCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZEVuZCAtIHRvZGF5KSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG5cbiAgICBjb25zdCBzdGFydERpZmZPdmVyV2Vla3MgPSBzdGFydERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKHN0YXJ0RGlmZk92ZXJEYXlzIC8gNyk7XG4gICAgY29uc3QgZW5kRGlmZk92ZXJXZWVrcyA9IGVuZERpZmZPdmVyRGF5cyA8IDcgPyAwIDogTWF0aC5jZWlsKGVuZERpZmZPdmVyRGF5cyAvIDcpO1xuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID09PSAwKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IC0gJHtlbmREaWZmT3ZlckRheXN9IEfDvG5gO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA+PSAxKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlckRheXN9IEfDvG4gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSBlbmREaWZmT3ZlcldlZWtzKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gLSAke2VuZERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpZGxlVGltZXIgPSBhc3luYyAodGltZU91dCwgY2FsbEJhY2spID0+IHtcbiAgbGV0IGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG5cbiAgd2luZG93LnRvcC5kb2N1bWVudC5vbnRvdWNoc3RhcnQgPSByZXNldFRpbWVyO1xuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0KTtcbiAgICBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlclR5cGUgPSAoKSA9PiB7XG4gIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvY2hyb21lfGNocm9taXVtfGNyaW9zL2kpKSB7XG4gICAgcmV0dXJuIFwiY2hyb21lXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9maXJlZm94fGZ4aW9zL2kpKSB7XG4gICAgcmV0dXJuIFwiZmlyZWZveFwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvc2FmYXJpL2kpKSB7XG4gICAgcmV0dXJuIFwic2FmYXJpXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9vcHJcXC8vaSkpIHtcbiAgICByZXR1cm4gXCJvcGVyYVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvZWRnL2kpKSB7XG4gICAgcmV0dXJuIFwiZWRnZVwiO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgaXNPd25NdXRhdGlvbiA9IChtdXRhdGlvbkxpc3QpID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBbLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0uYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLnJlbW92ZWROb2RlcyldO1xuICByZXR1cm4gbm9kZXMuc29tZSgobikgPT4ge1xuICAgIHJldHVybiBuLnRhZ05hbWUgJiYgKG4uaWQ/LmluY2x1ZGVzKFwiYm4tXCIpIHx8IEFycmF5LmZyb20obi5jbGFzc0xpc3QpLnNvbWUoKGMpID0+IGMuaW5jbHVkZXMoXCJibi1cIikgfHwgYy5pbmNsdWRlcyhcIm5kLVwiKSkpO1xuICB9KTtcbn07XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVcIixcbiAgdmVyc2lvbjogMSxcbiAgbWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudDogMTAwMCwgLy8gYWZmZWN0cyB2ZXJzaW9uXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJkYXRhXCIsXG4gICAgaW5kZXhlczogW3tcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJkYXRhX3ZhbHVlXCIsIFwic2Vzc2lvbl9pZFwiXSxcbiAgICB9XSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJpZFwiLCBhdXRvSW5jcmVtZW50OiB0cnVlfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5pbXBvcnQge2dldEJyb3dzZXJUeXBlfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyXCIpO1xuY29uc3QgX3dpbmRvdyA9IHtcbiAgYWxsdGltZTogXCJhbGx0aW1lXCIsIHNlc3Npb246IFwic2Vzc2lvblwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gaW5pdGlhbGl6ZWQgZGIgd2l0aDogXCIsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIC8vIFRPRE8sIHVuY29tbWVudCBuZXh0IGxpbmUgb25jZSBleGlzdGluZyBzdGFsZSBkYnMgYXJlIHB1cmdlZFxuICAgIC8vIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSk7XG4gICAgaWYgKCFvcGVuUmVxdWVzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW5kZXhlZGRiIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgb3BlblJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcGVuUmVxdWVzdC5yZXN1bHQuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gb3BlblJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBiZWFnbGUgaW5kZXhlZCBEQlwiLCBvcGVuUmVxdWVzdC5lcnJvcik7XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRiID0gb3BlblJlcXVlc3QucmVzdWx0O1xuICAgICAgaWYgKGRiLnZlcnNpb24gIT09IDEpIHtcbiAgICAgICAgLy8gVE9ETywgcmVtb3ZlIGRlbGV0ZSByZXF1ZXN0IG9uY2UgZXhpc3Rpbmcgc3RhbGUgZGJzIGFyZSBwdXJnZWRcbiAgICAgICAgY29uc3QgZGVsZXRlUmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoY29uZmlnLmRiTmFtZSk7XG4gICAgICAgIGRlbGV0ZVJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHRoaXMuaW5kZXhlZERCID0gZGI7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShkYXRhTmFtZSwgZGF0YVZhbHVlKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmluaXRUcmFuc2FjdGlvbih0cnVlKTtcbiAgICBjb25zdCBzZXNzaW9uSWQgPSB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKTsgLy8gZGF0ZSBjdXJyZW50IC0yIHNhYXQgIHlpbC1heS1ndW5cbiAgICBjb25zdCB0aW1lID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG5cbiAgICBjb25zdCBwYXlsb2FkID0ge1wiZGF0YV9uYW1lXCI6IGRhdGFOYW1lLCBcImRhdGFfdmFsdWVcIjogZGF0YVZhbHVlLCBcInNlc3Npb25faWRcIjogc2Vzc2lvbklkLCB0aW1lfTtcbiAgICBzdG9yZS5wdXQocGF5bG9hZCk7XG4gIH1cblxuICBtaW5tYXgoZGF0YU5hbWUsIG9wLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHN0b3JlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RvcmVkID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAob3AgPT09IFwibWluXCIgJiYgdmFsdWVbXCJkYXRhX3ZhbHVlXCJdIDwgc3RvcmVkKSB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtYXhcIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPiBzdG9yZWQpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0b3JlZCA9IHZhbHVlW1wiZGF0YV92YWx1ZVwiXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShzdG9yZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbWluKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy5taW5tYXgoZGF0YU5hbWUsIFwibWluXCIsIHdpbmRvdyk7XG4gIH1cblxuICBtYXgoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtYXhcIiwgd2luZG93KTtcbiAgfVxuXG4gIGdyb3VwQnkoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKCFtYXAuaGFzKHZhbHVlW1wiZGF0YV92YWx1ZVwiXSkpIG1hcC5zZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdLCAwKTtcbiAgICAgICAgICAgICAgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIG1hcC5nZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShtYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbW9kZShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBpZiAoZGF0YS5rZXlzKCkubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IG1heCA9IHtuYW1lOiB1bmRlZmluZWQsIHZhbHVlOiAtMX07XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBpZiAobWF4LnZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbWF4Lm5hbWUgPSBrZXk7XG4gICAgICAgIG1heC52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXg7XG4gIH1cblxuICBjb3VudChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1bShkYXRhTmFtZSwgd2luZG93ID0gXCJhbGx0aW1lXCIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHRvdGFsID0gMC4wMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICB0b3RhbCArPSBwYXJzZUZsb2F0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHRvdGFsLnRvRml4ZWQoMikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lLCBkYXRhVmFsdWUgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZGF0YVZhbHVlKSB7XG4gICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlX3Nlc3Npb25cIilcbiAgICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZVwiKVxuICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWVdKSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXhWYWx1ZSA9IGdldEJyb3dzZXJUeXBlKCkgPT09IFwic2FmYXJpXCIgPyBkYXRhTmFtZSA6IFtkYXRhTmFtZV07XG5cbiAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZVwiKVxuICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KGluZGV4VmFsdWUpKTtcbiAgfVxuXG4gIGFzeW5jIGF2ZyhkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgdG90YWwgPSBhd2FpdCB0aGlzLnN1bShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMuY291bnQoZGF0YU5hbWUsIHdpbmRvdyk7XG5cbiAgICBpZiAoIXRvdGFsIHx8ICFjb3VudCkgcmV0dXJuIDA7XG5cbiAgICByZXR1cm4gKHRvdGFsIC8gY291bnQpLnRvRml4ZWQoMik7XG4gIH1cblxuICBhc3luYyBsYXN0KGRhdGFOYW1lLCBzaXplID0gMSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpLm9wZW5DdXJzb3IoW2RhdGFOYW1lXSwgXCJwcmV2XCIpO1xuICAgICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgICBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAgICAgLm9wZW5DdXJzb3IoW2RhdGFOYW1lLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKV0sIFwicHJldlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBjdXJzb3Iub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChyZXN1bHQgJiYgaW5kZXggPCBzaXplKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50U2Vzc2lvbklkKCkge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0SG91cnMoZC5nZXRIb3VycygpIC0gMik7XG5cbiAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpICsgXCItXCIgK1xuICAgICAgKGQuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCItXCIgK1xuICAgICAgZC5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBDb2xsZWN0b3JBcGkgZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uL2FwaVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvblwiKTtcbmNvbnN0IGNvbGxlY3RvckFwaSA9IG5ldyBDb2xsZWN0b3JBcGkoKTtcblxuLy8ga2VlcCBhIHRhYmxlIGluIGluZGV4ZGIgdGhlIGZvcm1hdCBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCBzdG9yZWRfdmFsdWVdXG5cbmV4cG9ydCBjb25zdCBxdWVyeUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdykgPT4ge1xuICBsb2dnZXIubG9nKFwicXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gd2luZG93IGNhbiBiZSBlaXRoZXIgc2FtZWRheSBvciBhbGx0aW1lXG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1pblwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1pbihiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtYXhcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5tYXgoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiYXZnXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkuYXZnKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImNkXCIpIHtcbiAgICByZXR1cm4gKGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KSkuc2l6ZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjdlwiKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcblxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBbLCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgY291bnQgKz0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtb2RlXCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLm1vZGUoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGRhdGEubmFtZTtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZC5pbmRleE9mKFwibGFzdFwiKSA+PSAwKSB7XG4gICAgY29uc3QgbWF0Y2ggPSBxdWVyeU1ldGhvZC5tYXRjaChcImxhc3RcXFxcKChbXFxcXGRdKylcXFxcKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaC5sZW5ndGggPT09IDIgfHwgcGFyc2VJbnQobWF0Y2hbMV0pIDwgMSApIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5sYXN0KGJhc2VGZWF0dXJlTmFtZSwgbWF0Y2hbMV0sIHdpbmRvdyk7XG4gICAgY29uc3QgZGF0YVZhbHVlcyA9IHF1ZXJ5UHJvbWlzZS5tYXAoKG9iaikgPT4gb2JqLmRhdGFfdmFsdWUpO1xuICAgIHJldHVybiBkYXRhVmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAge1wiTGlzdGluZ3BhZ2VcIiA9PiAyMX1cbiAgICB7XCJIb21lcGFnZVwiID0+IDEyfVxuICAgIC0tIGV4YW1wbGUgd2lsbCBoYXZlOlxuICAgIG1vZGU6IExpc3RpbmdwYWdlXG4gICAgY2Q6IDJcbiAgICBjdjogMjErMTJcbiAgICBsYXN0KDMpIChuLCBuLTEsIG4tMilcbiAgKi9cblxuICAvLyAxMDAwbGlrIHRlbWl6bGVuZWNlayAobWFpbnRPcENvdW50IC0+IHZlcnNpb24pXG5cbiAgLy8gcXVlcnlNZXRob2QgY2FuIGJlIFwibW9kZVwiLCBcImNkXCIgKGNvdW50IGRpc3RpbnQpIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlc1xuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJjdlwiIChzdW0gb2YgY291bnQgdmFsdWVzKSwgXCJjdXJyZW50XCIsIG9yIFwicHJldlwiIGZvciBhbnkgZGF0YSB0eXBlIChzdG9yZWQgdmlhIGxhc3QpXG4gIGxvZ2dlci5mYWlsZWQoYHVua25vd24gcXVlcnlNZXRob2Q9JHtxdWVyeU1ldGhvZH0gaW4gQmVhZ2xlRGF0YUNvbGxlY3Rpb25gKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpID0+IHtcbiAgbG9nZ2VyLmxvZyhcInVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKTtcbiAgaWYgKCFjb2xsZWN0b3JBcGkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiSW5kZXhlZERCIG5vIHN1cHBvcnRlZC9Jbml0aWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGF3YWl0IGNvbGxlY3RvckFwaS5zYXZlKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG5cblxuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwibWluXCIsIFwibWF4XCIsIFwiY250XCIsIFwic3VtXCIgZm9yIG51bWVyaWMgZGF0YSB0eXBlcywgbWluLW1heCBjb21wYXJlcyB3aXRoIG9ubHkgZXhpc3RpbmcsIGF2ZyB1cGRhdGVzIGNudCBhbmQgc3VtXG4gIC8vIC0tPiBtaW46IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwibWluXCIsIChsZWFzdCBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IG1heDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtYXhcIiwgKGdyZWF0ZXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gc3VtOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInN1bVwiLCAoc3VtIG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gY250OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImNudFwiLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImNvdW50X3ZhbHVlc1wiIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlcywga2VlcCBhIGNvdW50ZXIgZm9yIGVhY2ggdmFsdWVcbiAgLy8gLS0+IGNvdW50X3ZhbHVlczogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgZGF0YV92YWx1ZSwgKGV4aXN0aW5nICsgMSldXG4gIC8vXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJsYXN0XCIgZm9yIGFueSBkYXRhIHR5cGUgLS0+IGtlZXBzIDIgdmFsdWVzIGZvciBjdXJyZW50IGFuZCB0aGUgcHJldmlvdXNcbiAgLy8gZGVsZXRlOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gbW92ZTogZXhpc3RpbmcgW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjdXJyZW50XCIsIChleGlzdGluZyB2YWx1ZSldIC0tPiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gcHV0OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGluY29taW5nIHN0b3JlZF92YWx1ZSldXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtmb3JtYXREZWxpdmVyeURhdGUsIGlzT3duTXV0YXRpb259IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBfX2h3bTogMCxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJcIik7XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5jb25zdCBzZWFyY2hQYXRocyA9IFtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHQSBEYXRhIExheWVyIFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlBhZ2VUeXBlXCIsIG5hbWU6IFwiUGFnZVR5cGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwidXBwZXJDYXNlVFJcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5kZXRhaWwuYWN0aW9uRmllbGQubGlzdFwiLCBuYW1lOiBcInBkcC5saXN0YWxpYXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5kaXNjb3VudFJhdGVcIiwgbmFtZTogXCJwZHAuZGlzY291bnRSYXRlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInNlYXJjaF9zdWNjZXNzXCIsIG5hbWU6IFwicGxwLnNlYXJjaFN1Y2Nlc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuaWRcIiwgXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBcInBscC5uYW1lXCIsIFwicGxwLmdyb3VwXCIsIFwicGxwLmNsYXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJMaXN0aW5ncGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtbWFpbi1kZXRhaWxzXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZW1wdHlfYmFza2V0X3RleHRcXFwiXVwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC50b3RhbEJhc2VQcmljZVwiLCBcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltpZCo9XFxcImNhcnRfcXVhbnRpdHlcXFwiXSwgW2NsYXNzKj1cXFwiYmFza2V0X2xlbmd0aFxcXCJdXCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LXRpdGxlXFxcIl0sIFtjbGFzcyo9XFxcImhlYWRlci1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcInNwYW4ucHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI3NhbGVzLXByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImRpdi5wcm9kdWN0LXByaWNlLWJveFwiLCBuYW1lOiBcIl9fcHJpY2VPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wicGRwLnByaWNlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjbW9iaWxlLXByb2R1Y3Qtc3RpY2t5XCIsIG5hbWU6IFwiX19wcmljZU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJwZHAucHJpY2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByb2R1Y3Qtc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuZW1wdHktY2FydC1jb250YWluZXIsIC5lbXB0eS1jYXJ0XCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuYnJhY2tldC10ZXh0LCAucHJvZHVjdC1jb3VudFwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydEl0ZW1RdWFudGl0eVwiLCBuYW1lOiBcImNhcnQucXVhbnRpdGllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJldmlvdXNcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjYmlsbF90b3RhbFwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyLWZpbmFsLW51bWJlclxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXJ0LXByaWNlXFxcIl0gLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3Vwb25BcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5jYXRlZ29yaWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1sYXN0LWJyZWFkY3J1bWJcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnByaWNlc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJpY2VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICAvLyBEZXNrdG9wIG9ic2VydmVyIGZvciB0aGUgcmlnaHQgcGFuZWwsIGFzIGl0IGlzIHRoZSBvbmUgY2hhbmdpbmdcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtcmlnaHQtY29udGFpbmVyXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3N1bW1hcnlfdG90YWxcXFwiXSwgW2NsYXNzKj1cXFwidG90YWxfcm93XFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyX2ZvbGxvd19udW1iXFxcIl0sIFtjbGFzcyo9XFxcImNhcnQtdGl0bGUtYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS52dnNUeG5JZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wYXltZW50X3R5cGVfdGl0bGUsIC5jYXJ0LXRpdGxlLWluZm9cIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0X3NrdV9jb2RlXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJza3VcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibXBuXCIsIG5hbWU6IFwicGRwLm1wblwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlVmFsaWRVbnRpbFwiLCBuYW1lOiBcInBkcC5wcmljZVZhbGlkVW50aWxcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJpdGVtTGlzdEVsZW1lbnQuKi5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubnVtYmVyT2ZJdGVtc1wiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJicmVhZGNydW1iLml0ZW1MaXN0RWxlbWVudC4qLml0ZW0ubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFdpbmRvdyBjdXN0b20gZWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImZhdm9yaXRlUHJvZHVjdHNcIiwgbmFtZTogXCJ2aWV3LmZhdm9yaXRlZE1QTnNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwidG9TdHJpbmdcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5dO1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJjdlwiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgXSxcbn07XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIC8vIFRPRE86IGNoZWNrIGZlYXR1cmVFbmdpbmVlcmluZyBhbmQgc2VhcmNoIGxpc3QgaWYgYWxsIG1hcmtlZCBhcyBmb3VuZCBidXQgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nICR7bGFzdEtleX0gZnJvbSAke0pTT04uc3RyaW5naWZ5KG9iail9YCk7XG4gICAgZGVsZXRlIG9ialtsYXN0S2V5XTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgaW5mb0xheWVyW2tleV07XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCBudWxsKTtcbiAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCBudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUcmVhdG1lbnQgPSAoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBzdGF0dXMsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0ge307XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVJZCAhPT0gdW5kZWZpbmVkKSB2YWx1ZS5idXNpbmVzc1J1bGVJZCA9IGJ1c2luZXNzUnVsZUlkO1xuICBpZiAodmFyaWFudCkgdmFsdWUudmFyaWFudCA9IHZhcmlhbnQ7XG5cbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiYXBwbGllZFwiOlxuICAgICAgaW5mb0xheWVyLmFbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2tpcHBlZFwiOlxuICAgICAgdmFsdWUuZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQ7XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciA9IGFzeW5jICgpID0+IHtcbiAgLy8gQ29sbGVjdCBjb3JlIGRhdGFcbiAgcHJlcGFyZUNvcmVEYXRhKCk7XG5cbiAgLy8gVHJpZ2dlci1zdGFydCB0aGUgcGFyc2VyIGxvb3BcbiAgcGFyc2VyQ2FsbGVyKCk7XG5cbiAgLy8gQWRkIG1ldHJpY3NcbiAgYWRkTWV0cmljcygpO1xufTtcblxuY29uc3QgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvciA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYmFzZUZlYXR1cmVOYW1lcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVFbmdpbmVlcmluZ09wcyk7XG4gIGZvciAoY29uc3QgYmFzZUZlYXR1cmVOYW1lIG9mIGJhc2VGZWF0dXJlTmFtZXMpIHtcbiAgICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgICBpZiAoRkVPcC5xdWVyeU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnF1ZXJ5TWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgcXVlcnlJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIEZFT3AucXVlcnlNZXRob2QsIEZFT3Aud2luZG93KTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoRkVPcC5mZWF0dXJlTmFtZSwgcXVlcnlSZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSkgPT4ge1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AudXBkYXRlTWV0aG9kID09PSBudWxsIHx8IEZFT3AudXBkYXRlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgYXdhaXQgdXBkYXRlSW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCBGRU9wLnVwZGF0ZU1ldGhvZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgcGFyc2VyQ2FsbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSs9cGFyc2VJbnQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1bVByaWNlID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHN1bVByaWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgY29uc3QgYXJyYXlJbm5lclRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGFycmF5SW5uZXJUZXh0LnB1c2goY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SW5uZXJUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhcnJheUlubmVyVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH0gLy8gc3dpdGNoXG5cbiAgICBpZiAobGF5ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGxheWVyVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmZvcm1hdHRlcikge1xuICAgICAgICBsYXllclZhbHVlID0gcHJvY2Vzc0Zvcm1hdHRlcihsYXllclZhbHVlLCBzZWFyY2hFbGVtZW50LmZvcm1hdHRlcik7XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihzZWFyY2hFbGVtZW50Lm5hbWUsIGxheWVyVmFsdWUpO1xuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcblxuICAgICAgLy8gbWFyayBleGNsdXNpdmUgZWxlbWVudHMgYXMgZm91bmRcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlKSAmJiBzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgZXhjbHVzaXZlRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5pbmNsdWRlcyhleGNsdXNpdmVFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAgICAgICBleGNsdXNpdmVFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJzZWFyY2hPYmogZXJyb3I6IFwiICsgZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgY3VzdG9tRGF0YURlcml2YXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCAwKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJjdXN0b21EYXRhRGVyaXZhdGlvbnMgY2Fubm90IGNvbXB1dGUgY291cG9uQXBwbGljYWJsZVByaWNlOiBcIiArIGUpO1xuICB9XG5cbiAgLy8gUHJvZHVjdCBwYWdlIC0tPiB0cmFuc2ZlciBza3VzIHRvIHNpbmdsZSBsb2NhdGlvblxuICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiKTtcbiAgICBpZiAoc2t1IT09bnVsbCAmJiBza3UhPT11bmRlZmluZWQpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIFtza3VdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QhPT1udWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHNrdUxpc3QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHByZXBhcmVDb3JlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5zeXN0ZW1MYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VmVuZG9yXCIsIG5hdlB0ci52ZW5kb3IpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiZmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJiYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGFzdG9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzaWduaW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2NvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfaW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfYWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfbm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic3BlY2lhbF9jYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG59O1xuXG5jb25zdCBhZGRNZXRyaWNzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IHBlcmZNZXRyaWNzID0ge307XG4gIGNvbnN0IHBlcmZOYXZpZ2F0aW9uTWV0cmljcyA9IHdpbmRvd1B0ci5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXTtcbiAgaWYgKHdpbmRvd1B0ci5wZXJmb3JtYW5jZSAmJiBwZXJmTmF2aWdhdGlvbk1ldHJpY3MpIHtcbiAgICBwZXJmTWV0cmljcy5jb25uZWN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLnJlcXVlc3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXNwb25zZUVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXF1ZXN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmRvbSA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUludGVyYWN0aXZlIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUNvbXBsZXRlKTtcbiAgICBwZXJmTWV0cmljcy5sb2FkID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmR1cmF0aW9uKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1ldHJpY3NcIiwgcGVyZk1ldHJpY3MpO1xufTtcblxuLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIFwiZWxlbWVudCBjb2xsZWN0b3JcIiBtb2R1bGUsIHRoZW4gZGF0YSBpcyBleHRyYWN0ZWQgZnJvbSBwcmUtY29sbGVjdGVkIGVsZW1lbnRzXG5jb25zdCBnZXRTT1JHQXJyYXkgPSAoKSA9PiB7XG4gIGNvbnN0IHNjaGVtYU9yZ0VsdHMgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT1cXFwiYXBwbGljYXRpb24vbGQranNvblxcXCJdXCIpO1xuICBjb25zdCBzb3JnQXJyYXkgPSBbXTtcblxuICBmb3IgKGNvbnN0IHNUYWcgb2Ygc2NoZW1hT3JnRWx0cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbnRudCA9IHNUYWcudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBqc29uY29udGVudCA9IEpTT04ucGFyc2UoY250bnQpO1xuICAgICAgc29yZ0FycmF5LnB1c2goanNvbmNvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gc29yZ0FycmF5O1xufTtcbiIsImltcG9ydCB7TE9HX0FQSV9VUkx9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVNb25pdG9yXCIpO1xuY29uc3QgSEVBREVSUyA9IHtcbiAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG59O1xuXG5leHBvcnQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgbW9uaXRvclwiKTtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBhd2FpdGluZyBzY3JhcGluZ1wiKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUsIDUwLCAxMDAwKTtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gc2VuZGluZyBsb2dzXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2VuZCBpbml0aWFsIGxvZyBib2R5IGFuZCBpbmNyZW1lbnRhbCB1cGRhdGUgbG9ncyBvbiBjbG9zZVxuICBhc3luYyBoYW5kbGVDbG9zZUV2ZW50KCkge1xuICAgIC8vIGlmIGluaXRpYWwgbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgc2VuZCB1cGRhdGVzIGFuZCBpbmZvbGF5ZXIgaW4gb25lIGJhdGNoXG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgLy8gaWYgbWFpbiBsb2cgaGFzIGJlZW4gc2VudCwgc2VuZCBpbmNyZW1lbnRhbCB1cGRhdGVzIG9ubHlcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCk7XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVNYWluTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VNYWluTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcXVlc3QgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKSB7XG4gICAgaWYgKCF0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzVXBkYXRlc1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgdGhlcmUgaXMgbm8gaW5jcmVtZW50YWwgeWV0XG4gICAgICAvLyBvciBpZiB0aGUgdXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPSBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9ncyBjaGFuZ2Ugc3RhdHVzOiBcIiwgaGFzQ2hhbmdlZCk7XG4gICAgaWYgKCFoYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICBjb25zdCBsb2dEYXRhID0gYXdhaXQgdGhpcy5wYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCk7XG4gICAgaWYgKGxvZ0RhdGEpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZW5kaW5nIGluY3JlbWVudGFsIGxvZ3NcIiwgbG9nRGF0YSk7XG4gICAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKGxvZ0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUFycml2YWxMb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgb3IgYXJyaXZhbCBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlQXJyaXZhbExvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh3bSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2h3bVwiKTtcbiAgICBpZiAodGhpcy5oaWdoV2F0ZXJNYXJrICE9PSBod20pIHtcbiAgICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgcywgbSwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJtXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDIsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgYSwgZSwgZiwgcywgbSxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gcGFnZWhpZGUgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIC8vIElmIHBhZ2UgaXMgbm90IHZpc2libGUgYW5kIGRvZXNuJ3QgYmVjb21lIHZpc2libGUgd2l0aGluIDMwIHNlY29uZHMsIHNlbmQgbG9nc1xuICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbiB0aW1lb3V0XCIpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgICAgICB9LCAzMDAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIHRpbWVvdXQgd2hlbiBwYWdlIGlzIHZpc2libGUgdG8gbWFrZSBzdXJlIHdlIHNlbmQgdGhlIGxhdGVzdCBsb2dzIHBvc3NpYmxlXG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIGlmIChxdWV1ZWQpIHJldHVybjtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICBpZiAoIXF1ZXVlZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBub3QgcXVldWVkXCIpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vbml0b3I7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZUywgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIExPQ0FMX1NUT1JBR0VfVFRMX0hPVVJTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2ZldGNoVHJlYXRtZW50cywgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiKTtcblxuY2xhc3MgVHJlYXRtZW50UmVwb3NpdG9yeSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSBib2R5O1xuICAgIHRoaXMudHJlYXRtZW50cyA9IHRyZWF0bWVudHM7XG4gICAgdGhpcy50cmVhdG1lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0cztcbiAgICB0aGlzLmN1cnJlbnRQYWdlVHlwZSA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IExPQ0FMX1NUT1JBR0VfS0VZUztcbiAgICBjb25zdCB0cmVhdG1lbnRzT2JqID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oVFJFQVRNRU5UUykpO1xuICAgIGxldCB0cmVhdG1lbnRzID0gdHJlYXRtZW50c09iaj8udHJlYXRtZW50cztcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0cmVhdG1lbnRzT2JqPy50aW1lc3RhbXA7XG4gICAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0aW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIG5vdCBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlXCIpO1xuICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHRyZWF0bWVudHMsXG4gICAgICB9O1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUyk7XG4gICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICB9XG4gICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB0aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwKTtcbiAgICAgIGlmIChlbGFwc2VkSG91cnMgPiBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBhcmUgZXhwaXJlZFwiKTtcbiAgICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuTUFUQ0hFRF9UUkVBVE1FTlRTKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VpZ2h0c09iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuV0VJR0hUUyk7XG4gICAgICBpZiAod2VpZ2h0c09iaikge1xuICAgICAgICB3ZWlnaHRzT2JqID0gSlNPTi5wYXJzZSh3ZWlnaHRzT2JqKTtcbiAgICAgICAgaWYgKHdlaWdodHNPYmoudGltZXN0YW1wKSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSB3ZWlnaHRzT2JqLnRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgICAgIGlmIChlbGFwc2VkSG91cnMgPCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykgcmV0dXJuIHdlaWdodHNPYmoud2VpZ2h0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2VpZ2h0c09iaiA9IGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgICAgaWYgKCF3ZWlnaHRzT2JqKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggd2VpZ2h0c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB3ZWlnaHRzT2JqID0ge3dlaWdodHM6IHdlaWdodHNPYmosIHRpbWVzdGFtcDogRGF0ZS5ub3coKX07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLldFSUdIVFMsIEpTT04uc3RyaW5naWZ5KHdlaWdodHNPYmopKTtcbiAgICAgIHJldHVybiB3ZWlnaHRzT2JqLndlaWdodHM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpIHtcbiAgICBsZXQgQ1BUID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZVJ1bGVzLlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIENQVCA9IENQVD8uWzBdIHx8IG51bGw7XG4gICAgaWYgKCFDUFQpIHJldHVybiBbXTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlVHlwZSA9IENQVDtcbiAgICBsZXQgbWF0Y2hlZFRyZWF0bWVudHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgIGlmIChtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCBKU09OLnBhcnNlKG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKG10KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQYWdlVHlwZShtdC5wYWdlVHlwZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgJHttYXRjaGVkVHJlYXRtZW50cy5sZW5ndGh9IHRyZWF0bWVudHMgdXNlciBzZWdtZW50IG1hdGNoZWRgKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBnZXR0aW5nIG1hdGNoZWQgcm9ib3RzOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBbXTtcbiAgICBjb25zdCB7dHJlYXRtZW50cywgdHJlYXRtZW50V2VpZ2h0c30gPSB0aGlzO1xuICAgIGNvbnN0IHVzZXJTZWdtZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInNcIik7XG4gICAgaWYgKCF1c2VyU2VnbWVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRyZWF0bWVudFdlaWdodHMpIHtcbiAgICAgIGNvbnN0IHVzZXJTZWdtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHNbdXNlclNlZ21lbnRdO1xuICAgICAgaWYgKCF1c2VyU2VnbWVudFdlaWdodHMpIHJldHVybiBbXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRyZWF0bWVudHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnRlZFdlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy53ZWlnaHQ7XG4gICAgICAgIGlmICghc2VnbWVudGVkV2VpZ2h0KSB7XG4gICAgICAgICAgaWYgKHRyZWF0bWVudC5kZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICAgICAgICBzZWdtZW50ZWRXZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnRdPy53ZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChkZWJ1Z01vZGUgJiYgZGVidWdNb2RlID09PSAxKSBzZWdtZW50ZWRXZWlnaHQgPSAxMDA7XG4gICAgICAgICAgaWYgKCFzZWdtZW50ZWRXZWlnaHQpIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRyZWF0bWVudC53ZWlnaHQgPSBzZWdtZW50ZWRXZWlnaHQ7XG4gICAgICAgIGlmICghdHJlYXRtZW50LmFjdGlvbnMuc29tZSgoYSkgPT4gYS52YXJpYW50cykpIHtcbiAgICAgICAgICBtYXRjaGVkVHJlYXRtZW50cy5wdXNoKHRyZWF0bWVudCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlYXRtZW50LmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGlmICh1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHMgJiYgdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXS52YXJpYW50c1t2YXJpYW50S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMucHVzaCh0cmVhdG1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KG1hdGNoZWRUcmVhdG1lbnRzKSk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoZGVidWdNb2RlKTtcbiAgfVxuXG4gIGNoZWNrUGFnZVR5cGUocGFnZVR5cGVzKSB7XG4gICAgY29uc3Qge2N1cnJlbnRQYWdlVHlwZX0gPSB0aGlzO1xuICAgIGlmIChwYWdlVHlwZXMgPT09IG51bGwgfHwgcGFnZVR5cGVzID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYWdlVHlwZXMpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiUGFnZSBUeXBlcyBzaG91bGQgYmUgYW4gYXJyYXlcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwYWdlVHlwZXNbMF0uc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIHBhZ2VUeXBlcyA9IHBhZ2VUeXBlcy5tYXAoKHB0KSA9PiBwdC5zdWJzdHIoMSkpO1xuICAgICAgcmV0dXJuICFwYWdlVHlwZXMuaW5jbHVkZXMoY3VycmVudFBhZ2VUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VUeXBlcy5pbmNsdWRlcyhjdXJyZW50UGFnZVR5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWF0bWVudFJlcG9zaXRvcnk7XG4iLCJpbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlJlcGxhY2VVdGlsc1wiKTtcblxuY29uc3QgcmVwbGFjZXIgPSBhc3luYyAodmFsdWUsIHJlcGxhY2VGbikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IFtpLCB2YWxdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY3VycmVudFJlcGxhY2VGbiA9IEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSA/IHJlcGxhY2VGbltpXSA6IHJlcGxhY2VGbiB8fCBcIlwiO1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKGN1cnJlbnRSZXBsYWNlRm4pO1xuICAgICAgICB2YWx1ZVtpXSA9IHJlcGxhY2VBbGwodmFsLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlW2ldID0gcmVwbGFjZUZuRXhlY3V0b3IoY3VycmVudFJlcGxhY2VGbiwgdmFsKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pKSB7XG4gICAgZm9yIChjb25zdCByRm4gb2YgcmVwbGFjZUZuKSB7XG4gICAgICBpZiAodHlwZW9mIHJGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyRm4pO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJGbiwgdmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKTtcbiAgICAgIHZhbHVlID0gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlLCBzaW5nbGUgPSBmYWxzZSkge1xuICBpZiAocmVwbGFjZUZuICYmIHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikpIHtcbiAgICBsb2dnZXIubG9nKFwiRXhlY3V0aW5nIHJlcGxhY2UgZnVuY3Rpb246IFwiLCByZXBsYWNlRm4pO1xuICAgIGNvbnN0IHJlcGxhY2VGdW5jdGlvbiA9IEZ1bmN0aW9uKHJlcGxhY2VGbik7XG4gICAgaWYgKHNpbmdsZSkgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gICAgcmV0dXJuIHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pIHtcbiAgY29uc3Qge3N0b3JhZ2UsIGtleSwga2V5RmFsbGJhY2ssIHR5cGV9ID0gcmVwbGFjZUZuO1xuICBzd2l0Y2ggKHN0b3JhZ2UpIHtcbiAgICBjYXNlIFwic2Vzc2lvblwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IG51bGw7XG4gICAgICByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleUZhbGxiYWNrKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IEpTT04ucGFyc2UocmVwbGFjZVZhbCk7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IHJlcGxhY2VWYWxbcmVwbGFjZVZhbC5sZW5ndGggLSAxXVt0eXBlXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGQgbm90IHBhcnNlICR7cmVwbGFjZVZhbH1gKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICAgIGNhc2UgXCJpbmZvLWxheWVyXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXlGYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZXI7XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVfY2FjaGVcIixcbiAgdmVyc2lvbjogMSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImluZm9DYWNoZVwiLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJpeF9za3VcIixcbiAgICAgICAgZmllbGRzOiBcInNrdVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcInNrdVwifSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQge2ZldGNoUHJvZHVjdEluZm99IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeVwiKTtcbmNsYXNzIEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGlmICghb3BlblJlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImluZGV4ZWRkYiBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3BlblJlcXVlc3QucmVzdWx0LmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdG9yZSA9IG9wZW5SZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgYmVhZ2xlX2NhY2hlIGluZGV4ZWQgREJcIiwgb3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4ZWREQiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgcmV0dXJuIHR4Lm9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUocGF5bG9hZCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIGZvciAoY29uc3QgbG9hZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgIGxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICBzdG9yZS5wdXQobG9hZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBheWxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgc3RvcmUucHV0KHBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY2xlYXJSZXF1ZXN0ID0gc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgY2xlYXJSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGNsZWFyaW5nIHN0b3JlOiAke3N0b3JlLm5hbWV9YCk7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHNrdSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBnZXRSZXF1ZXN0ID0gc3RvcmUuZ2V0KHNrdSk7XG4gICAgICAgIGdldFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdldFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYEZvdW5kIHZhbHVlICR7cmVzdWx0fSBmb3Iga2V5ICR7c2t1fWApO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGdldHRpbmcgdmFsdWUgZm9yIGtleTogJHtza3V9YCwgZ2V0UmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjb3VudCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY291bnRSZXF1ZXN0ID0gc3RvcmUuY291bnQoKTtcbiAgICAgICAgY291bnRSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYENvdW50ZWQgJHtyZXN1bHR9IGVudHJpZXNgKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvdW50UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBjb3VudGluZyBlbnRyaWVzOiBcIiwgY291bnRSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldEN1cnNvcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY3Vyc29yUmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgICAgY3Vyc29yUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBjdXJzb3JSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgY3Vyc29yXCIsIGN1cnNvclJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImNoZWNrLWV4aXN0aW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5nZXRDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGN1cnNvci52YWx1ZS50aW1lc3RhbXA7XG4gICAgICBjb25zdCBlbGFwc2VkU2Vjb25kcyA9IChEYXRlLm5vdygpIC8gMTAwMCkgLSB0aW1lc3RhbXA7XG4gICAgICAvLyBSZS1mZXRjaCBwcm9kdWN0IGluZm8gb25jZSBhIGRheVxuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgODY0MDApIHJldHVybjtcbiAgICAgIGxvZ2dlci5sb2coXCJFeGlzdGluZyBwcm9kdWN0IGluZm8gaXMgZXhwaXJlZFwiKTtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hpbmctcHJvZC1pbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvUHJvbWlzZSA9IGZldGNoUHJvZHVjdEluZm8oKTtcbiAgICBjb25zdCBjbGVhclByb21pc2UgPSB0aGlzLmNsZWFyKCk7XG4gICAgY29uc3QgW3Byb2R1Y3RJbmZvQXJyYXldID0gYXdhaXQgUHJvbWlzZS5hbGwoW3Byb2R1Y3RJbmZvUHJvbWlzZSwgY2xlYXJQcm9taXNlXSk7XG4gICAgaWYgKCFwcm9kdWN0SW5mb0FycmF5IHx8ICFwcm9kdWN0SW5mb0FycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtcHJvZC1pbmZvXCIpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSh0aGlzLnByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicGVyc2lzdGVkLXByb2QtaW5mb1wiKTtcbiAgfVxuXG4gIHByZXBhcmVQYXlsb2Fkcyhwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgY29uc3QgcGF5bG9hZHMgPSBbXTtcbiAgICBjb25zdCBmaWVsZE5hbWVzID0gcHJvZHVjdEluZm9BcnJheS5zaGlmdCgpO1xuICAgIGZpZWxkTmFtZXMuc2hpZnQoKTtcbiAgICBmb3IgKGNvbnN0IGluZm8gb2YgcHJvZHVjdEluZm9BcnJheSkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHtza3U6IGluZm8uc2hpZnQoKX07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGF5bG9hZFtmaWVsZE5hbWVzW2ldXSA9IGluZm9baV0gfHwgMDtcbiAgICAgIH1cbiAgICAgIHBheWxvYWRzLnB1c2gocGF5bG9hZCk7XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5O1xuIiwiaW1wb3J0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkgZnJvbSBcIi4vaW5kZXhcIjtcblxuY29uc3QgU3RvcmUgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCBpbnN0YW5jZSA9IG51bGw7XG4gIHJldHVybiB7XG4gICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGluc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgIGluc3RhbmNlID0gbmV3IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkoKTtcbiAgICAgICAgLy8gSGlkZSB0aGUgY29uc3RydWN0b3Igc28gdGhlIHJldHVybmVkIG9iamVjdCBjYW4ndCBiZSBuZXcnZC4uLlxuICAgICAgICBpbnN0YW5jZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfSxcbiAgfTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkFjdGlvbkNvbmRpdGlvblV0aWxzXCIpO1xuXG5jb25zdCBjaGVja0FjdGlvbkNvbmRpdGlvbiA9IGFzeW5jIChjb25kaXRpb24pID0+IHtcbiAgbG9nZ2VyLmxvZyhcIkFjdGlvbiBjb25kaXRpb24gZm91bmQ6IFwiLCBjb25kaXRpb24pO1xuICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gW107XG4gIGNvbnN0IHthdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgb3BlcmF0b3IsIHNlbGVjdG9yLCB0eXBlLCB2YWx1ZSwgY2hhaW59ID0gY29uZGl0aW9uO1xuICBjb25zdCBjb25kaXRpb25FbGVtZW50cyA9IEFycmF5LmZyb20od2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBjb25kaXRpb25FbGVtZW50cykge1xuICAgIGlmIChhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIHR5cGUsIG9wZXJhdG9yLCBhdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUsIGNoYWluKSkge1xuICAgICAgZWxpZ2libGVFbGVtZW50cy5wdXNoKCQoZWxlbWVudCkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWxpZ2libGVFbGVtZW50cztcbn07XG5cbmNvbnN0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIgPSBhc3luYyAoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTa3UgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChlbGVtZW50U2t1KTtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHByb2R1Y3RJbmZvPy5bb3BlcmF0b3JdO1xuICAgICAgLy8gcnVuVGltZVZhbHVlIG1heSBiZSAwXG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSBudWxsIHx8IHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJQcm9kdWN0IGluZm8gaXMgZW1wdHlcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGNoYWluKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgY2hhaW4udHlwZSwgY2hhaW4ub3BlcmF0b3IsXG4gICAgICAgICAgICBjaGFpbi5hdHRyaWJ1dGUsIGNoYWluLmlubmVyX2NvbmRpdGlvbiwgY2hhaW4udmFsdWUsIGNoYWluLmNoYWluKTtcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGVja0FjdGlvbkNvbmRpdGlvbjtcbiIsImltcG9ydCB7c3R5bGVBcHBsaWNhdG9yLCBkZWxheSwgaWRsZVRpbWVyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7cmVwbGFjZUFsbCwgdHVya2lzaFRvTG93ZXJ9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUlksIFNFU1NJT05fU1RPUkFHRV9LRVlTLCBJRExFX1RJTUVPVVR9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCByZXBsYWNlciBmcm9tIFwiLi9yZXBsYWNlLXV0aWxzXCI7XG5pbXBvcnQgY2hlY2tBY3Rpb25Db25kaXRpb24gZnJvbSBcIi4vYWN0aW9uLWNvbmRpdGlvbi11dGlsXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5QWN0aW9ucyhhY3Rpb25zKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVBcHBseUFjdGlvbnNcIik7XG4gIGNvbnN0IHtQT1BVUF9ESVNQTEFZX0ZMQUd9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG5cbiAgY29uc3QgdHJhbnNmb3JtZXIgPSBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGFjdGlvbjogXCIsIEpTT04uc3RyaW5naWZ5KGFjdGlvbikpO1xuICAgIGNvbnN0IHtcbiAgICAgIG9wZXJhdG9yLFxuICAgICAgdHlwZSxcbiAgICAgIGFwcGx5RXZlbnQsXG4gICAgICBjb250ZW50U2VsZWN0b3IsXG4gICAgICBzZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yRmFsbGJhY2ssXG4gICAgICBtZENvbmRpdGlvbixcbiAgICAgIG1vdmVfc2VsZWN0b3JfMSxcbiAgICAgIG1vdmVfc2VsZWN0b3JfMixcbiAgICAgIHJlcGxhY2VGbixcbiAgICAgIHBUeXBlLFxuICAgICAgYXR0cmlidXRlLFxuICAgICAgcHJvZHVjdEluZm9TdG9yYWdlLFxuICAgIH0gPSBhY3Rpb247XG4gICAgaWYgKG9wZXJhdG9yID09PSBcIm5vb3BcIikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vb3AgT3BlcmF0b3I6IE5vIG9wZXJhdGlvbiBpcyBhcHBsaWVkIG9uIHRhcmdldCBcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHt2YWx1ZX0gPSBhY3Rpb247XG4gICAgLy8gSWYgYW4gZWxlbWVudCBpcyBwYXNzZWQgdG8gdHJhbnNmb3JtZXIsIHNlbGVjdG9yIGlzIHJlbGF0aXZlIHRvIHBhc3NlZCBlbGVtZW50XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmZpbmQoc2VsZWN0b3IpIDogJChzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBtYyA9IG1kQ29uZGl0aW9uID8gd2luZG93Lm1hdGNoTWVkaWEobWRDb25kaXRpb24pLm1hdGNoZXMgOiB0cnVlO1xuICAgIGlmICghbWMpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJNZWRpYSBjb25kaXRpb24gbWlzbWF0Y2g6IFwiLCBtZENvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzEgJiYgIW1vdmVfc2VsZWN0b3JfMikgfHxcbiAgICAgIChtb3ZlX3NlbGVjdG9yXzIgJiYgIW1vdmVfc2VsZWN0b3JfMSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJCb3RoIG1vdmUgc2VsZWN0b3JzIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG1vdmVfc2VsZWN0b3JfMSAmJiBtb3ZlX3NlbGVjdG9yXzIpIHtcbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzEpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAxIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghJChtb3ZlX3NlbGVjdG9yXzIpLmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTW92ZSBzZWxlY3RvciAyIG5vdCBmb3VuZDogXCIsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBzcGVjaWZpZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCEkKHNlbGVjdG9yRmFsbGJhY2spLmxlbmd0aCAmJiBvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gXCJuby1zZWxlY3RvclwiKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZDogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVHJ5aW5nIGZhbGxiYWNrIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yRmFsbGJhY2spIGVsZW1lbnQgPSAkKHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmICghZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWxsYmFjayBzZWxlY3RvciBub3QgZm91bmRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VGbikge1xuICAgICAgdmFsdWUgPSBhd2FpdCByZXBsYWNlcih2YWx1ZSwgcmVwbGFjZUZuKTtcbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlbW92aW5nOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJDYW5ub3QgZm91bmQgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiBcIiwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5zZXJ0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmVmb3JlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBiZWZvcmU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgaWYgKFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoXCJuZC1hZGQtdG8td2luXCIpKSB7XG4gICAgICAgICAgICAkKFwiLm5kLWFkZC10by13aW5cIikucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFmdGVyXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluc2VydGluZyBhZnRlcjogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFmdGVyKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFwcGVuZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBlbmRpbmcgdmFsdWU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW9kYWxcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50Lm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZiAoZWxtID09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNwbGF5TW9kYWwodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwb3B1cFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJQb3B1cCBhbHJlYWR5IGRpc3BsYXllZCBpbiBzZXNzaW9uXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBQb3B1cDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChwVHlwZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBjb25zdCBtb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJleGl0SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgZXhpdCBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3IsIGRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInJcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZFwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIgJiYgIXIuaW5jbHVkZXMoZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZGxlVGltZXIoSURMRV9USU1FT1VULCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3B5SW50ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBZGRpbmcgY29weSBpbnRlbnQgbGlzdGVuZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhcHBlbmQgcG9wdXAgdG8gYm9keSBhZnRlciB0aW1lb3V0IGV4cGlyZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVBvcHVwKCk7XG4gICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBUeXBlOiAke3R5cGV9IG5vdCBmb3VuZCBmb3Igb3BlcmF0b3I6ICR7b3BlcmF0b3J9YCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJlZGl0XCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIHRleHQ6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC50ZXh0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyBodG1sOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuaHRtbCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHlsZUFwcGxpY2F0b3JcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGU6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZUNoYW5nZXNNYXAgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTdHlsZSBDaGFuZ2VzIE1hcDogXCIsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgICBzdHlsZUFwcGxpY2F0b3IoZWxlbWVudCwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZGRDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGFkZGRpbmcgY2xhc3MgdG8gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVtb3ZlQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGByZW1vdmUgY2xhc3MgZnJvbSAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb2N1bWVudFRpdGxlXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgY2hhbmdpbmcgZG9jdW1lbnQgdGl0bGUgZnJvbSAke2VsZW1lbnR9IHRvICR7dmFsdWV9YCk7XG4gICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgPT0gXCJ0YWJDaGFuZ2VcIikge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJjYXRjaGluZyBldmVudCB0YWJjaGFuZ2UuLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRpdGxlID0gd2luZG93LnRvcC5kb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShlLCB2YWx1ZSwgb3JpZ2luYWxUaXRsZSk7XG4gICAgICAgICAgICAgICAgICB9LCAxNTAwMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmtub3duIGVkaXQgdHlwZTogXCIsIHR5cGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic2V0YXR0cmlidXRlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgc3dpdGNoIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgY2FzZSBcInNyY1wiOlxuICAgICAgICAgIGVsZW1lbnQuY3NzKFwiY29udGVudFwiLCBgdXJsKCR7dmFsdWUudHJpbSgpfSlgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jYXNlLWRlY2xhcmF0aW9uc1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5VmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuXG4gICAgICAgICAgZWxlbWVudC5jc3MocHJvcGVydHksIHByb3BlcnR5VmFsdWUsIFwiIWltcG9ydGFudFwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoXCJmdW5jdGlvblwiKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBGdW5jdGlvbih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5oYW5kbGVkIGF0dHJpYnV0ZTogU2V0dGluZyBhdHRyaWJ1dGU6IFwiLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInJlcGxhY2VcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZzogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQucmVwbGFjZUFsbCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzd2FwXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTd2FwcGluZzogXCIsIG1vdmVfc2VsZWN0b3JfMSwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIGNvbnN0IG4xID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBuMiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgc3dhcE5vZGVzKG4xLCBuMik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbmplY3RzY3JpcHRcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluamVjdGluZyBzY3JpcHQ6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LmFwcGVuZChgPHNjcmlwdD4ke3ZhbHVlfTwvc2NyaXB0PmApO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwibW92ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKGBNb3ZpbmcgJHttb3ZlX3NlbGVjdG9yXzF9IHRvICR7bW92ZV9zZWxlY3Rvcl8yfWApO1xuICAgICAgY29uc3Qgc291cmNlID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMSk7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgc291cmNlLnJlbW92ZSgpO1xuICAgICAgZGVzdGluYXRpb24ucHJlcGVuZChzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicHJvZHVjdEluZm9Mb29rdXBcIikge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgZWxlbWVudC5iZWZvcmUocmVzKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInRleHQtdHJhbnNmb3JtXCIpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiY2FwaXRhbGl6ZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCBlIG9mIEFycmF5LmZyb20oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmIChlLmlubmVyVGV4dD8uaW5jbHVkZXMoXCJcXG5cIikpIHtcbiAgICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dCkuc3BsaXQoXCJcXG5cIikubWFwKChzZW50ZW5jZSkgPT5cbiAgICAgICAgICAgICAgICBzZW50ZW5jZS5zcGxpdChcIiBcIikubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSkuam9pbihcIiBcIiksXG4gICAgICAgICAgICAgICkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgICAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInRpdGxlLWNoYW5nZVwiKSB7XG4gICAgICBjb25zdCBmaW5hbFRpdGxlID0gYXdhaXQgcHJlcGFyZUZpbmFsVGl0bGUoKTtcbiAgICAgIGVsZW1lbnQudGV4dChmaW5hbFRpdGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggb3BlcmF0b3IgZXhpc3RzIHlldFwiLCBvcGVyYXRvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHByZXBhcmVGaW5hbFRpdGxlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IFtuYW1lLCBza3VdID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcFwiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gICAgY29uc3QgcmVzID0gbmFtZSArIHByb2R1Y3RJbmZvLnRpdGxlQXVnbWVudCArIFwiKFwiICsgc2t1ICsgXCIpXCI7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImNvbnN0IEVfVElNRU9VVCA9IG5ldyBFcnJvcigndGltZW91dCB3aGlsZSB3YWl0aW5nIGZvciBtdXRleCB0byBiZWNvbWUgYXZhaWxhYmxlJyk7XG5jb25zdCBFX0FMUkVBRFlfTE9DS0VEID0gbmV3IEVycm9yKCdtdXRleCBhbHJlYWR5IGxvY2tlZCcpO1xuY29uc3QgRV9DQU5DRUxFRCA9IG5ldyBFcnJvcigncmVxdWVzdCBmb3IgbG9jayBjYW5jZWxlZCcpO1xuXG52YXIgX19hd2FpdGVyJDIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIFNlbWFwaG9yZSB7XG4gICAgY29uc3RydWN0b3IoX3ZhbHVlLCBfY2FuY2VsRXJyb3IgPSBFX0NBTkNFTEVEKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gX3ZhbHVlO1xuICAgICAgICB0aGlzLl9jYW5jZWxFcnJvciA9IF9jYW5jZWxFcnJvcjtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzID0gW107XG4gICAgfVxuICAgIGFjcXVpcmUod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0ucHVzaCh7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCA9IDEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgW3ZhbHVlLCByZWxlYXNlXSA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jayh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0ucHVzaChyZXNvbHZlKTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlIDw9IDA7XG4gICAgfVxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIHJlbGVhc2Uod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMuZm9yRWFjaCgocXVldWUpID0+IHF1ZXVlLmZvckVhY2goKGVudHJ5KSA9PiBlbnRyeS5yZWplY3QodGhpcy5fY2FuY2VsRXJyb3IpKSk7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgfVxuICAgIF9kaXNwYXRjaCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlRW50cnkgPSAoX2EgPSB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlRW50cnkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlIC09IHdlaWdodDtcbiAgICAgICAgICAgIHdlaWdodCA9IHRoaXMuX3ZhbHVlICsgMTtcbiAgICAgICAgICAgIHF1ZXVlRW50cnkucmVzb2x2ZShbcHJldmlvdXNWYWx1ZSwgdGhpcy5fbmV3UmVsZWFzZXIocHJldmlvdXNXZWlnaHQpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZHJhaW5VbmxvY2tXYWl0ZXJzKCk7XG4gICAgfVxuICAgIF9uZXdSZWxlYXNlcih3ZWlnaHQpIHtcbiAgICAgICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIF9kcmFpblVubG9ja1dhaXRlcnMoKSB7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0uZm9yRWFjaCgod2FpdGVyKSA9PiB3YWl0ZXIoKSk7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciQxID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBNdXRleCB7XG4gICAgY29uc3RydWN0b3IoY2FuY2VsRXJyb3IpIHtcbiAgICAgICAgdGhpcy5fc2VtYXBob3JlID0gbmV3IFNlbWFwaG9yZSgxLCBjYW5jZWxFcnJvcik7XG4gICAgfVxuICAgIGFjcXVpcmUoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMSh0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFssIHJlbGVhc2VyXSA9IHlpZWxkIHRoaXMuX3NlbWFwaG9yZS5hY3F1aXJlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVsZWFzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5ydW5FeGNsdXNpdmUoKCkgPT4gY2FsbGJhY2soKSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUud2FpdEZvclVubG9jaygpO1xuICAgIH1cbiAgICByZWxlYXNlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VtYXBob3JlLmlzTG9ja2VkKCkpXG4gICAgICAgICAgICB0aGlzLl9zZW1hcGhvcmUucmVsZWFzZSgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuY2FuY2VsKCk7XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiB3aXRoVGltZW91dChzeW5jLCB0aW1lb3V0LCB0aW1lb3V0RXJyb3IgPSBFX1RJTUVPVVQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3F1aXJlOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHN5bmMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxlYXNlID0gQXJyYXkuaXNBcnJheSh0aWNrZXQpID8gdGlja2V0WzFdIDogdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRpY2tldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBydW5FeGNsdXNpdmUoY2FsbGJhY2ssIHdlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVsZWFzZSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGlja2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh0aWNrZXRbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSA9IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGVhc2Uod2VpZ2h0KSB7XG4gICAgICAgICAgICBzeW5jLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN5bmMuY2FuY2VsKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhaXRGb3JVbmxvY2s6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHN5bmMud2FpdEZvclVubG9jayh3ZWlnaHQpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWplY3QodGltZW91dEVycm9yKSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMb2NrZWQ6ICgpID0+IHN5bmMuaXNMb2NrZWQoKSxcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHN5bmMuZ2V0VmFsdWUoKSxcbiAgICAgICAgc2V0VmFsdWU6ICh2YWx1ZSkgPT4gc3luYy5zZXRWYWx1ZSh2YWx1ZSksXG4gICAgfTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saXNuZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB0cnlBY3F1aXJlKHN5bmMsIGFscmVhZHlBY3F1aXJlZEVycm9yID0gRV9BTFJFQURZX0xPQ0tFRCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcmV0dXJuIHdpdGhUaW1lb3V0KHN5bmMsIDAsIGFscmVhZHlBY3F1aXJlZEVycm9yKTtcbn1cblxuZXhwb3J0IHsgRV9BTFJFQURZX0xPQ0tFRCwgRV9DQU5DRUxFRCwgRV9USU1FT1VULCBNdXRleCwgU2VtYXBob3JlLCB0cnlBY3F1aXJlLCB3aXRoVGltZW91dCB9O1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgYXBwbHlBY3Rpb25zIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRyZWF0bWVudCxcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkRGF0YUxpc3RlbmVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBUUkVBVE1FTlRfUkFUSU8sXG4gIE1PQklMRV9NRURJQV9RVUVSWSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZGV0ZXJtaW5lUGN0LFxuICBwcmVwYXJlQWN0aW9ucyxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJvYm90RW5naW5lXCIpO1xuY29uc3QgT0JTRVJWRVJfQ09ORklHID0ge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90RW5naW5lIHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHtkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cywgZGVidWdNb2RlLCBtYXRjaGVkVHJlYXRtZW50cywgaWRlbnRpZmllciwgcGFnZVR5cGV9ID0gYm9keTtcbiAgICB0aGlzLmVuZ2FnZW1lbnRMb2NrID0ge307XG4gICAgdGhpcy5wYWdlVHlwZSA9IHBhZ2VUeXBlO1xuICAgIHRoaXMuZGVidWdNb2RlID0gZGVidWdNb2RlO1xuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgdGhpcy5yZUFwcGx5VHJlYXRtZW50c01hcCA9IHt9O1xuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMgPSBbXTtcbiAgICB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzID0gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5kZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdHMoKSB7XG4gICAgY29uc3Qgcm9ib3RQcm9taXNlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0cmVhdG1lbnQuZGVwZW5kYW50X29uX3RyZWF0bWVudCkgY29udGludWU7XG4gICAgICAgIHJvYm90UHJvbWlzZXMucHVzaCh0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGVuZ2FnaW5nIHJvYm90ICR7dHJlYXRtZW50LmlkfTogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHJvYm90UHJvbWlzZXMpO1xuICAgIHRoaXMuaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAoKTtcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90KHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgYWN0aW9ucyxcbiAgICAgIGVsaWdpYmlsaXR5UnVsZVNldCxcbiAgICAgIGRldmljZSxcbiAgICAgIGRlcGVuZGFudF9vbl90cmVhdG1lbnQsXG4gICAgICBidXNpbmVzc1J1bGVTZXQsXG4gICAgICB3ZWlnaHQsXG4gICAgICBkZWxheSxcbiAgICAgIGhlbHBlcnMsXG4gICAgfSA9IHRyZWF0bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBkZWJ1Z01vZGUsXG4gICAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICAgIGVuZ2FnZW1lbnRMb2NrLFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIGlzTW9iaWxlLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBwcmVwYXJlQW5kQXBwbHksXG4gICAgfSA9IHRoaXM7XG5cbiAgICAvLyBvbmUgZW5nYWdlbWVudCBhdCBhIHRpbWVcbiAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBlbmdhZ2VtZW50TG9ja1tpZF0gfHwgbmV3IE11dGV4KCk7XG4gICAgY29uc3QgcmVsZWFzZSA9IGF3YWl0IGVuZ2FnZW1lbnRMb2NrW2lkXS5hY3F1aXJlKCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChkZWJ1Z01vZGUgJiYgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgJiYgIWRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZGV2aWNlID09PSBcIm1vYmlsZVwiICYmICFpc01vYmlsZSkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnbW9iaWxlJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJkZXNrdG9wXCIgJiYgaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ2Rlc2t0b3AnIG1pc21hdGNoXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBiYXNlIHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVTZXQgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFNraXBSYXRpbyA9IHdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSB3ZWlnaHQgfHwgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBza2lwIHJhdGlvOiBcIiArIHRyZWF0bWVudFNraXBSYXRpbyk7XG4gICAgICAgIC8vIERldGVybWluaW5nIGlkZW50aWZpZXIgZm9yIGNhbGN1bGF0aW5nIHRyZWF0bWVudCBwZXJjZW50YWdlICh0cmVhdG1lbnRQY3QpXG4gICAgICAgIGNvbnN0IGRldGVybWluaW5nSWRlbnRpZmllciA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQgfHwgaWQ7XG5cbiAgICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIHRoZSBwZXJjZW50YWdlIHZhbHVlIGZvciB0aGUgdHJlYXRtZW50IHVzZWQgdG8gZGV0ZXJtaW5lIGlmIGl0IHNob3VsZCBiZSBza2lwcGVkIG9yIG5vdFxuICAgICAgICAvLyB0cmVhdG1lbnRQY3QgaXMgMTAwIHdoZW4gZGVidWcgbW9kZSBpcyAxLCBlbnN1cmluZyBubyB0cmVhdG1lbnRzIGFyZSBza2lwcGVkXG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFBjdCA9IGRlYnVnTW9kZSA9PT0gMSA/IDEwMCA6IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgZGV0ZXJtaW5pbmdJZGVudGlmaWVyKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudFBjdDogXCIgKyB0cmVhdG1lbnRQY3QgKyBgIHdpdGggZGVidWcgbW9kZSAke2RlYnVnTW9kZSA/IFwib25cIiA6IFwib2ZmXCJ9YCk7XG4gICAgICAgIGxldCBidXNpbmVzc1J1bGVJZCA9IG51bGw7XG4gICAgICAgIGlmIChidXNpbmVzc1J1bGVTZXQpIHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgc3ViIHZhcmlhbnQgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgICAgICAgYnVzaW5lc3NSdWxlSWQgPSBhd2FpdCB0aGlzLmNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpO1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGJ1c2luZXNzIHJ1bGUgdHJhbnNmb3JtYXRpb24gd2l0aCBpZDogXCIsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHRyZWF0bWVudCB3aXRoIGRlZmF1bHQgdmFsdWVzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmVhdG1lbnRQY3QgPCB0cmVhdG1lbnRTa2lwUmF0aW8pIHtcbiAgICAgICAgICBsb2dnZXIubG9nKGBUcmVhdG1lbnQgJHtpZH0gc2tpcHBlZCBkdWUgdG8gdHJlYXRtZW50IHNwbGl0IHJhdGlvYCk7XG4gICAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgbnVsbCwgXCJza2lwcGVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlSGVscGVycyhoZWxwZXJzLCBtYXRjaGVkVHJlYXRtZW50cyk7XG4gICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDpcIiwgaWQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICByZWxlYXNlKCk7XG4gICAgICB0aGlzLmFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpO1xuICAgICAgdGhpcy5hZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZWxwZXJzKSAmJiBoZWxwZXJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGVscGVyUm9ib3RQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgbWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgICAgaWYgKCFoZWxwZXJzLmluY2x1ZGVzKHRyZWF0bWVudC5pZCkpIGNvbnRpbnVlO1xuICAgICAgICBoZWxwZXJSb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGhlbHBlclJvYm90UHJvbWlzZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSkge1xuICAgIGNvbnN0IFtwcmVwYXJlZCwgdmFyaWFudF0gPSBhd2FpdCBwcmVwYXJlQWN0aW9ucyhpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcHBseUFjdGlvbnMocHJlcGFyZWQpO1xuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFJlYXBwbHlFdmVudCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7cGFnZVR5cGUsIHJlQXBwbHlUcmVhdG1lbnRzTWFwfSA9IHRoaXM7XG4gICAgY29uc3Qge2lkLCByZWFwcGx5X2V2ZW50LCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZX0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYXRlUmVhcHBseVJvYm90TWFwKCkge1xuICAgIGNvbnN0IHtyZUFwcGx5VHJlYXRtZW50c01hcCwgbWF0Y2hlZFRyZWF0bWVudHN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZUFwcGx5VHJlYXRtZW50c01hcCkpIHtcbiAgICAgIGNvbnN0IHRyZWF0bWVudElkcyA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW2tleV07XG4gICAgICBjb25zdCByZUFwcGx5VHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigodCkgPT4gdHJlYXRtZW50SWRzLmluY2x1ZGVzKHQuaWQpKTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJpbmZpbml0ZV9zY3JvbGxcIjoge1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbmZpbml0ZV9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0aW1lb3V0XCI6IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSB0aW1lb3V0YCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50X2NoYW5nZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlTZWxlY3Rvckxpc3QgPSBBcnJheS5pc0FycmF5KHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yKSA/XG4gICAgICAgICAgICAgICAgdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IgOiBbdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3JdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiByZWFwcGx5U2VsZWN0b3JMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGVsZW1lbnRfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbl9zY3JvbGxcIjoge1xuICAgICAgICAgIC8vIGFkZCB3aW5kb3cgc2Nyb2xsIGxpc3RlbmVyLCBjYWxsIGVuZ2FnZVJvYm90IG9uIHNjcm9sbCwgZG8gbm90IHRyaWdnZXIgbW9yZSB0aGFuIG9uY2UgcGVyIDI1MG1zXG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IDA7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAobm93IC0gbGFzdFNjcm9sbFRpbWUgPiAyNTAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA+IDUpIHtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gb25fc2Nyb2xsYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJxdWVyeV9zZWFyY2hfY2hhbmdlXCI6IHtcbiAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggIT09IHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gcXVlcnlfc2VhcmNoX2NoYW5nZWApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVydmFsXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoYXBwbGllZD8uW3RyZWF0bWVudC5pZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGludGVydmFsYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb19sYXllcl9jaGFuZ2VcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICAgICAgICAgIGFkZERhdGFMaXN0ZW5lcih0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUmVhcHBseSBldmVudCBub3QgZm91bmQ6IFwiLCBrZXkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVTZXQgPSBbXSwgYnVzaW5lc3NSdWxlU2V0ID0gW10sIGlkfSA9IHRyZWF0bWVudDtcbiAgICBpZiAodGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5pbmNsdWRlcyhpZCkpIHJldHVybjtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMoWy4uLmVsaWdpYmlsaXR5UnVsZVNldCwgLi4uYnVzaW5lc3NSdWxlU2V0XSk7XG4gICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKGBfX2VSdWxlcy4ke3NlbGVjdG9yfWAsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICB9XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5wdXNoKGlkKTtcbiAgfVxuXG4gIGV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZVNldCwgcHJldmlvdXNTZWxlY3RvcnMgPSBudWxsKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gcHJldmlvdXNTZWxlY3RvcnMgfHwgW107XG4gICAgZm9yIChsZXQgcnVsZSBvZiBydWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKHJ1bGUuc3RhcnRzV2l0aChcIiFcIikpIHJ1bGUgPSBydWxlLnNsaWNlKDEpO1xuICAgICAgICBzZWxlY3RvcnMucHVzaChydWxlLnNwbGl0KFwiLlwiKVswXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGUuc2V0LCBzZWxlY3RvcnMpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLihuZXcgU2V0KHNlbGVjdG9ycykpXTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKSB7XG4gICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgZWxpZ2liaWxpdHkgJHtlbGlnaWJpbGl0eVJ1bGV9YCk7XG4gICAgbGV0IG9wcG9zaXRlRmxhZyA9IGZhbHNlO1xuICAgIGxldCBbZWxpZ2liaWxpdHlTY29wZSwgZWxpZ2liaWxpdHlOYW1lXSA9IGVsaWdpYmlsaXR5UnVsZS5zcGxpdChcIi5cIik7XG4gICAgaWYgKGVsaWdpYmlsaXR5U2NvcGUuc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIG9wcG9zaXRlRmxhZyA9IHRydWU7XG4gICAgICBlbGlnaWJpbGl0eVNjb3BlID0gZWxpZ2liaWxpdHlTY29wZS5zbGljZSgxKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtlbGlnaWJpbGl0eVNjb3BlfWApO1xuICAgIGlmICghcmVzIHx8ICFBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob3Bwb3NpdGVGbGFnICYmIHJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFvcHBvc2l0ZUZsYWcgJiYgIXJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgbG9nZ2VyLmxvZyhgJHtlbGlnaWJpbGl0eVJ1bGV9IGlzIGVsaWdpYmxlYCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQsIGVsaWdpYmlsaXR5U2V0VHlwZSA9IG51bGwsIHByZXZpb3VzSXNFbGlnaWJsZSA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcm9ib3QgZWxpZ2liaWxpdHlcIik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVsaWdpYmlsaXR5IFJ1bGUgU2V0ICR7ZWxpZ2liaWxpdHlSdWxlU2V0fSBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGlzRWxpZ2libGUgPSBwcmV2aW91c0lzRWxpZ2libGU7XG4gICAgZm9yIChjb25zdCBlbGlnaWJpbGl0eVJ1bGUgb2YgZWxpZ2liaWxpdHlSdWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlICYmIGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gZWxpZ2liaWxpdHlTZXRUeXBlOiBcIiwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGUuc2V0LCBlbGlnaWJpbGl0eVJ1bGUudHlwZSwgaXNFbGlnaWJsZSk7XG4gICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNFbGlnaWJsZTtcbiAgfVxuXG4gIC8vIFJldHVybiBpbmRleCBvZiBidXNpbmVzc1J1bGUsIHRoaXMgaXMgdGhlIGJ1c2luZXNzUnVsZUlkXG4gIGFzeW5jIGNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgYnVzaW5lc3NSdWxlXSBvZiBidXNpbmVzc1J1bGVTZXQuZW50cmllcygpKSB7XG4gICAgICBpZiAoYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChbYnVzaW5lc3NSdWxlXSkpIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllckNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0RhdGFMYXllclJ1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlLCBzZWxlY3Rvciwgc2VsZWN0b3JBbGwsIHNlbGVjdG9yRmFsbGJhY2sgPSBudWxsfSA9IHJ1bGU7XG4gIGxldCBtYWluU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBtYWluU2VsZWN0b3IgPSBzZWxlY3RvckZhbGxiYWNrID8gc2VsZWN0b3JGYWxsYmFjayA6IG1haW5TZWxlY3RvcjtcbiAgfVxuXG4gIGlmIChvcGVyYXRvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgfVxuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHNlbGVjdG9yQWxsICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCBlbGVtZW50O1xuICBpZiAobWFpblNlbGVjdG9yKSBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3Rvcik7XG4gIGVsc2UgaWYgKHNlbGVjdG9yQWxsKSBlbGVtZW50ID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRleHQtbnVtYmVyXCI6IHtcbiAgICAgIGxldCB0ZW1wVmFsO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgdGVtcFZhbCA9IGVsZW1lbnQucmVkdWNlKChyZXR1cm5WYWwsIGVsZW0pID0+IHtcbiAgICAgICAgICByZXR1cm5WYWwgKz0gcGFyc2VJbnQoZWxlbS50ZXh0Q29udGVudC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFZhbCA9IHBhcnNlSW50KHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLnRleHRDb250ZW50XG4gICAgICAgICAgICAucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHBhcnNlSW50KHRlbXBWYWwpO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcImNsYXNzTGlzdFwiOlxuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJjb3VudFwiOiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiBlbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudC5sZW5ndGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDEsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgXCJzdHlsZVwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN0eWxlS2V5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN0eWxlVmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudFN0eWxlc1tzdHlsZUtleV07XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgc3R5bGVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiT3BlcmF0b3Igbm90IGRlZmluZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRnVuY3Rpb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tGdW5jdGlvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgaWYgKCFza3VMaXN0IHx8ICh0eXBlb2Ygc2t1TGlzdCA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMoc2t1TGlzdCkubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgY29uc3Qgc2t1ID0gc2t1TGlzdFtPYmplY3Qua2V5cyhza3VMaXN0KVswXV0/LmlkO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0QWRkVG9DYXJ0Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBwcm9kdWN0Vmlld0NvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRQcmV2aWV3Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiaW1wb3J0IHtjaGVja0RhdGFMYXllclJ1bGV9IGZyb20gXCIuL2RhdGFMYXllckNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbGVtZW50UnVsZX0gZnJvbSBcIi4vZWxlbWVudENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tGdW5jdGlvblJ1bGV9IGZyb20gXCIuL2Z1bmN0aW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Nlc3Npb25SdWxlfSBmcm9tIFwiLi9zZXNzaW9uQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1VybFJ1bGV9IGZyb20gXCIuL3VybENoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tFbnZSdWxlfSBmcm9tIFwiLi9lbnZDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrUHJvZHVjdEluZm9SdWxlfSBmcm9tIFwiLi9wcm9kdWN0SW5mb0NoZWNrZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHthZGREYXRhTGlzdGVuZXIsIGFkZFRvQmVhZ2xlSW5mb0xheWVyLCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge011dGV4fSBmcm9tIFwiYXN5bmMtbXV0ZXhcIjtcbmltcG9ydCB7ZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTLCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLm11dGV4ID0gbmV3IE11dGV4KCk7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZCA/IHJ1bGUubmFtZSB8fCB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICAgIGNvbnN0IGtleVByb21pc2VzTWFwID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5lbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAga2V5UHJvbWlzZXNNYXBba2V5XSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGtleVByb21pc2VzTWFwW2tleV0ucHVzaCh0aGlzLmNoZWNrUnVsZShydWxlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZVByb21pc2VzXSBvZiBPYmplY3QuZW50cmllcyhrZXlQcm9taXNlc01hcCkpIHtcbiAgICAgIGNvbnN0IHNhdGlzZmllZFJ1bGVJZHMgPSBhd2FpdCBQcm9taXNlLmFsbChydWxlUHJvbWlzZXMpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIHNhdGlzZmllZFJ1bGVJZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGZhbHNlKSk7XG4gICAgICB0aGlzLnNldFVwTGlzdGVuZXJzKGtleSwgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpIHtcbiAgICBpZiAoIWtleSB8fCAhcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCB0aGlzLm11dGV4LmFjcXVpcmUoKTtcbiAgICBsb2dnZXIubG9nKGBMb2NrIGFjcXVpcmVkIGZvciBrZXkgJHtrZXl9YCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBjb25zdCBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gKSB8fCBbXTtcbiAgICAgICAgaWYgKGlzRWxpZ2libGUpIHtcbiAgICAgICAgICBpZiAoY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjdXJyZW50LnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgY3VycmVudCk7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZW1vdmUgZnJvbSBlbGlnaWJsZSBydWxlc1xuICAgICAgICAgIGlmICghY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGN1cnJlbnQuZmlsdGVyKChrKSA9PiBrICE9PSBydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgY29uc3Qge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9ID0gdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMpO1xuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJjb21wbGV0ZVwiKSByZXR1cm47XG4gICAgICAgIGxldCBub2RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uUmVjb3JkIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgIG5vZGVzID0gWy4uLm5vZGVzLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uUmVjb3JkLnJlbW92ZWROb2RlcyldO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV4Y2x1ZGUgbXV0YXRpb25zIHRoYXQgb25seSB1cGRhdGUgdGV4dFxuICAgICAgICBpZiAobm9kZXMuZXZlcnkoKG4pID0+IG4udGFnTmFtZSA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VsZWN0b3IgPT09IFwiYm9keVwiKSB7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5ib2R5LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikucGFyZW50Tm9kZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcywgZGF0YUxheWVyUnVsZXMgPSB7fSwgZWxlbWVudFJ1bGVzID0ge30pIHtcbiAgICBpZiAoIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgIGNvbnN0IHt0eXBlfSA9IHJ1bGU7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICAgIGlmICghZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0pIHtcbiAgICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocnVsZS5zZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSA9IGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JdLCBydWxlXSA6IFtydWxlXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnNlbGVjdG9yQWxsKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSA9IGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yQWxsXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3JBbGxdLCBydWxlXSA6IFtydWxlXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50UnVsZXNbXCJib2R5XCJdID0gZWxlbWVudFJ1bGVzW1wiYm9keVwiXSA/XG4gICAgICAgICAgICBbLi4uZWxlbWVudFJ1bGVzW1wiYm9keVwiXSwgcnVsZV0gOiBbcnVsZV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocnVsZS5jaGFpbikge1xuICAgICAgICB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhbcnVsZS5jaGFpbl0sIGRhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEVsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUyk7XG4gICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlc09iaikge1xuICAgICAgICBlbGlnaWJpbGl0eVJ1bGVzT2JqID0gSlNPTi5wYXJzZShlbGlnaWJpbGl0eVJ1bGVzT2JqKTtcbiAgICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXNPYmoudGltZXN0YW1wKSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZEhvdXJzID0gKERhdGUubm93KCkgLSBlbGlnaWJpbGl0eVJ1bGVzT2JqLnRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDApO1xuICAgICAgICAgIGlmIChlbGFwc2VkSG91cnMgPCBMT0NBTF9TVE9SQUdFX1RUTF9IT1VSUykgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXNPYmoucnVsZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSBhd2FpdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlc09iaikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGVsaWdpYmlsaXR5UnVsZXNPYmogPSB7cnVsZXM6IGVsaWdpYmlsaXR5UnVsZXNPYmosIHRpbWVzdGFtcDogRGF0ZS5ub3coKX07XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkVMSUdJQklMSVRZX1JVTEVTLCBKU09OLnN0cmluZ2lmeShlbGlnaWJpbGl0eVJ1bGVzT2JqKSk7XG4gICAgICByZXR1cm4gZWxpZ2liaWxpdHlSdWxlc09iai5ydWxlcztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZ2V0IGVsaWdpYmlsaXR5IHJ1bGVzOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU9uQ29tcG9uZW50XCIpO1xuXG5jb25zdCBiZWFnbGVPbiA9IGFzeW5jIChpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlLCB0cmVhdG1lbnRXZWlnaHRzKSA9PiB7XG4gIGNvbnN0IHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UgPSBTdG9yZS5nZXRJbnN0YW5jZSgpLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xuXG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlID0gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG5cbiAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvbi1pbml0XCIpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRzUHJvbWlzZTtcblxuICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzL3dlaWdodHNcIik7XG4gIH1cbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJGb3VuZCB0cmVhdG1lbnRzOiBcIiwgdHJlYXRtZW50cyk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtdHJlYXRtZW50c1wiKTtcblxuICBjb25zdCB0cmVhdG1lbnRSZXBvc2l0b3J5ID0gbmV3IFRyZWF0bWVudFJlcG9zaXRvcnkoe1xuICAgIHRyZWF0bWVudHMsXG4gICAgdHJlYXRtZW50V2VpZ2h0cyxcbiAgfSk7XG5cbiAgY29uc3QgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCB0cmVhdG1lbnRSZXBvc2l0b3J5LmdldE1hdGNoZWRUcmVhdG1lbnRzKGRlYnVnTW9kZSk7XG4gIGlmIChtYXRjaGVkVHJlYXRtZW50cyA9PT0gbnVsbCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXVzZXItc2VnbWVudFwiKTtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFtYXRjaGVkVHJlYXRtZW50cy5sZW5ndGgpIHtcbiAgICBsb2dnZXIubG9nKFwiTm8gdHJlYXRtZW50cyBtYXRjaGVkLCByZXR1cm5pbmcgd2l0aG91dCBmdXJ0aGVyIGFjdGlvblwiKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJuby1yb2JvdC1tYXRjaGVkXCIpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmb3VuZC1tYXRjaGVkLXJvYm90c1wiKTtcblxuICB0cnkge1xuICAgIGF3YWl0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJuby1ydWxlcy1hc3Nlc3NlZFwiKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgYXNzZXMgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicnVsZXMtYXNzZXNzZWRcIik7XG4gIHRyeSB7XG4gICAgYXdhaXQgcGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicHJvZHVjdC1pbnRvLW5vLXBlcnNpc3RcIik7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBlcnNpc3QgcHJvZHVjdCBpbmZvXCIpO1xuICB9XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW5nYWdpbmctcm9ib3RzXCIpO1xuICBjb25zdCByb2JvdEVuZ2luZSA9IG5ldyBSb2JvdEVuZ2luZSh7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgZGVidWdNb2RlLFxuICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgIGlkZW50aWZpZXIsXG4gICAgcGFnZVR5cGUsXG4gIH0pO1xuICBhd2FpdCByb2JvdEVuZ2luZS5lbmdhZ2VSb2JvdHMoKTtcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInJvYm90cy1lbmdhZ2VkXCIpO1xuICBsb2dnZXIuc3VjY2VzcyhcIkFwcGxpZWQgdHJlYXRtZW50czogXCIsIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpKTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hpbmctZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBSdWxlRW5naW5lLmdldEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm47XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gIGNvbnN0IHJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7ZWxpZ2liaWxpdHlSdWxlc30pO1xuICBhd2FpdCBydWxlRW5naW5lLmFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJhc3Nlc3NlZC1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGJlYWdsZU9uO1xuIiwiaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiU2VnbWVudGF0aW9uQ29tcHV0ZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gIGxvZ2dlci5sb2coXCJEZXRlcm1pbmluZyB1c2VyIHNlZ21lbnRcIik7XG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgICBjb25zdCBydWxlU2V0ID0gdHJlYXRtZW50V2VpZ2h0c1tzZWdtZW50XT8ucnVsZVNldDtcbiAgICAgIGlmICghcnVsZVNldCkgY29udGludWU7XG4gICAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXX0pO1xuICAgICAgaWYgKGF3YWl0IHNlZ21lbnRSdWxlRW5naW5lLmNoZWNrUnVsZXMoKSkge1xuICAgICAgICBsb2dnZXIubG9nKGBVc2VyIHNlZ21lbnQgbWF0Y2hlZDogJHtzZWdtZW50fWApO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgc2VnbWVudCk7XG4gICAgICAgIHJldHVybiBzZWdtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIubG9nKFwiVXNlciBzZWdtZW50IG5vdCBtYXRjaGVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNvbXB1dGUgdXNlciBzZWdtZW50XCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBNb25pdG9yIGZyb20gXCIuLi9CZWFnbGVNb25pdG9yL2luZGV4XCI7XG5pbXBvcnQgYmVhZ2xlT24gZnJvbSBcIi4uL0JlYWdsZU9uXCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxuICBzd2l0Y2hUb0Vhc2VPdXQsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgVHJlYXRtZW50UmVwb3NpdG9yeSBmcm9tIFwiLi4vQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeVwiO1xuXG5sZXQgU0hVVERPV04gPSBmYWxzZTtcblxuKGFzeW5jIGZ1bmN0aW9uKCkge1xuICBzd2l0Y2hUb0Vhc2VPdXQoKTtcbiAgbGV0IG1vbml0b3IgPSBudWxsO1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIGluaXRpYWxpemluZ1wiKTtcbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cbiAgbGV0IGVhcmx5TG9nU2VudCA9IGZhbHNlO1xuICBsZXQgaGlkZVJlbW92ZWQgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSA9IFRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0VHJlYXRtZW50V2VpZ2h0cygpO1xuICAgIG1vbml0b3IgPSBuZXcgTW9uaXRvcigpO1xuICAgIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIoKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiLCBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2XCIsIFZFUlNJT04pO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgfSwgMjAwMCk7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFkgUFJVTkUgT1VULU9GLVNDT1BFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIGxldCB1c2VyU2VnbWVudCA9IG51bGw7XG4gICAgbGV0IHRyZWF0bWVudFdlaWdodHMgPSBudWxsO1xuICAgIGNvbnN0IG9vc1JlYXNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFKTtcbiAgICBpZiAob29zUmVhc29uICE9PSBcInVuc3VwcG9ydGVkXCIpIHtcbiAgICAgIHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZTtcbiAgICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJuby1yb2JvdC13ZWlnaHRzXCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmV0Y2ggd2VpZ2h0c1wiKTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbXB1dGUgdXNlciBzZWdtZW50IGFuZCBhZGQgdG8gYmVhZ2xlSW5mb0xheWVyXG4gICAgICB1c2VyU2VnbWVudCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgIH1cblxuICAgIC8vIGlmIGNhbm5vdCBnZXQgY3JpdGljYWwgaW5mbywgbWFrZSBvdXQgb2Ygc2NvcGUgYW5kIHVuc3VwcG9ydGVkXG4gICAgaWYgKFxuICAgICAgY29va2llUGN0ID09PSBudWxsIHx8XG4gICAgICAhbmF2aWdhdG9yLnNlbmRCZWFjb24gfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICB0eXBlb2YgU3RyaW5nPy5wcm90b3R5cGU/LnBhZFN0YXJ0ICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcInVuc3VwcG9ydGVkXCIpIHx8XG4gICAgICAoIXVzZXJTZWdtZW50KVxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IGRldmljZVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkLWRldmljZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0xhYmVsU2VudCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCk7XG4gICAgY29uc3QgdGltZW91dENvdW50ZXIgPSBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQpKSB8fCAwO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWcgbW9kZSBpcyBvbiwgYWxzbyBhZGRzIGRibSB0byBiZWFnbGVJbmZvTGF5ZXIgYW5kIHNldHMgb29zUmVhc29uXG4gICAgY29uc3QgZGVidWdNb2RlID0gZ2V0RGVidWdNb2RlKFwiZW1wbG95ZWVcIik7XG5cbiAgICAvLyBpZiB0aW1lZC1vdXQgdG9vIG1hbnkgdGltZXMgZm9yIHZlcnkgZmlyc3QgaW50ZXJhY3RzaW9ucywgbWFrZSBvdXQgb2Ygc2NvcGUgZm9yIHRoZSBzZXNzaW9uXG4gICAgaWYgKCFkZWJ1Z01vZGUgJiYgIW9vc1JlYXNvbiAmJiAhaXNMYWJlbFNlbnQgJiYgdGltZW91dENvdW50ZXIgPiBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTlxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibWF4LXRpbWVvdXRcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQURNSU4gVVNFUiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIFRPRE86IHJlbmFtZSBzaG93cm9vbSBsb2dpYyB0byBhZG1pbiwgYW5kIG1hcCB2dnNJc1Nob3dyb29tIHRvIGEgY29uZmlndXJhYmxlIGFkbWluIHBhcmFtXG5cbiAgICAvLyBpZiBhZG1pbiB1c2VyLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgbWFyayBhcyBlbXBsb3llZVxuICAgIGNvbnN0IHByb2Nlc3NBZG1pblVzZXIgPSAoKSA9PiB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSwgXCJlbXBsb3llZVwiKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIHRydWUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCBhZG1pblwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFkbWluLWVtcGxveWVlXCIpO1xuICAgIH07XG5cbiAgICBsZXQgaXNBZG1pbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4pO1xuICAgIC8vIGlmIG5vdCBmb3VuZCBpbiBsb2NhbFN0b3JhZ2UsIGNoZWNrIGJlYWdsZUluZm9MYXllciB3aXRoIGJsb2NraW5nIG1kb2VcbiAgICBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlzQWRtaW4gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKTtcbiAgICAvLyBwZXJtYW5lbnQgbGFiZWwgY2FuIGJlIGZhbHNlLCBidXQgYWRtaW4gdXNlciBjYW4gc3RpbGwgbG9naW4gYW5kIHR1cm4gdHJ1ZSwgbGF6aWx5IGZpeCB0aGlzXG4gICAgfSBlbHNlIGlmIChpc0FkbWluID09PSBcImZhbHNlXCIgfHwgaXNBZG1pbiA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGFzeW5jIGNhbGwgdG8gZ2V0RnJvbUJlYWdsZUluZm9MYXllciwgdGhlbiBzZXQgbG9jYWxTdG9yYWdlXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidnZzSXNTaG93cm9vbVwiLCB0cnVlKS50aGVuKChpc0FkbWluKSA9PiB7XG4gICAgICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgICAgIHByb2Nlc3NBZG1pblVzZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGlzQWRtaW4gJiYgKGlzQWRtaW4gPT09IFwidHJ1ZVwiIHx8IGlzQWRtaW4gPT09IHRydWUpKSB7XG4gICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgfSBlbHNlIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5ULCB0aW1lb3V0Q291bnRlciArIDEpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8tYWRtaW4tc3RhdHVzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0FETUlOLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJnbG92LWVhc2VcIikpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFudGktZmxpY2tlci10aW1lb3V0XCIpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gT04vT0ZGIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBpc09uIGNhbiBiZSB0cnVlIChPTiksIGZhbHNlIChPRkYpXG4gICAgbGV0IGlzT24gPSBudWxsO1xuXG4gICAgaWYgKGRlYnVnTW9kZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkRlYnVnIG1vZGUgb246IGFsbCBhcHBsaWNhYmxlIHRyZWF0bWVudHMgd2lsbCBiZSBhcHBsaWVkXCIpO1xuICAgICAgaXNPbiA9IHRydWU7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwiZW1wbG95ZWVcIikge1xuICAgICAgbG9nZ2VyLndhcm4oXCJVc2VyIGlzIG91dCBvZiBzY29wZVwiKTtcbiAgICAgIC8vIHNldCBpc09uIHRvIHRydWUvZmFsc2Ugd2hlbiBub3QgZGVidWdNb2RlIGJ1dCBvdXQgb2Ygc2NvcGUgaS5lLiBuZF9kZWJ1Zz0wIGZvciB0ZXN0YWJpbGl0eVxuICAgICAgaXNPbiA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTztcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHVua25vd25cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG91dCBvZiBzY29wZSByZWFzb25cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGdyZWF0ZXIgdGhhbiBTUExJVF9SQVRJTywgdGhlbiBpbiBPTiBtb2RlXG4gICAgICBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPKSB7XG4gICAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ0cnVlXCJ9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPLzIpIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTJcIn0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTFcIn0pO1xuICAgICAgfVxuXG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzT25cIiwgaXNPbik7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQsIHRydWUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGlzT24udG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEVBUkxZLVBST0NFU1MgQ09OVkVSU0lPTiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGF3YWl0IGNyaXRpY2FsIGluZm8gYmVmb3JlIHNlbmRpbmcgbG9ncyBmb3IgcHJvcGVyIGFuYWx5dGljcyBtZWFzdXJlbWVudHNcbiAgICBjb25zdCBwYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiLCB0cnVlKTtcbiAgICBpZiAocGFnZVR5cGUgPT09IFwicHVyY2hhc2VcIikge1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnJldmVudWVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInB1cmNoYXNlLnBheW1lbnRUeXBlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIC8vIHNlbmQgbG9ncyBpbW1lZGlhdGVseSBvbiBwdXJjaGFzZSBwYWdlLCBhbmQgZm9yY2Ugd2FpdFxuICAgICAgYXdhaXQgbW9uaXRvci5zZW5kTG9ncyh0cnVlKTtcbiAgICAgIC8vIGlmIHB1cmNoYXNlIGlzIGNvbXBsZXRlLCBkbyBub3QgYXBwbHkgYW55IHRyZWF0bWVudHMgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICBTSFVURE9XTiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNlbmQgbG9ncyB3aGVuIHJlYWR5LCBzdGFydCBzY3JhcGluZyBhbmQgc2VuZGluZyBhc3luY2x5XG4gICAgICBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICB9XG4gICAgZWFybHlMb2dTZW50ID0gdHJ1ZTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBST0JPVCBQQVRIcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBpZiAoaXNPbiA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKCFTSFVURE9XTikge1xuICAgICAgICBsb2dnZXIubG9nKFwiQmVhZ2xlIE9OIEdyb3VwIFBhdGhcIik7XG4gICAgICAgIGJlYWdsZU9uKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUsIHRyZWF0bWVudFdlaWdodHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT04gR3JvdXAgU0hVVERPV04gUGF0aFwiKTtcbiAgICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzT24gPT09IGZhbHNlKSB7XG4gICAgICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBPRkYgR3JvdXAgUGF0aFwiKTtcbiAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgaGlkZVJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpc09uIGlzIHVuZGVmaW5lZCBvciBudWxsXCIpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLndhcm4oXCJCZWFnbGUgRWFybHkgU2NvcGUtb3V0IG9yIEVSUk9SOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBlcnIubWVzc2FnZSk7XG4gICAgaWYgKCFlYXJseUxvZ1NlbnQgJiYgbW9uaXRvcikgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgaWYgKCFoaWRlUmVtb3ZlZCkgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIH1cbn0pKCk7XG4iXSwibmFtZXMiOlsicmVwbGFjZUFsbCIsInN0ciIsImZpbmQiLCJyZXBsYWNlIiwiaW5kZXgiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwidHVya2lzaFRvTG93ZXIiLCJzdHJpbmciLCJsZXR0ZXJzIiwibGV0dGVyIiwidG9Mb3dlckNhc2UiLCJpc1N0YWdpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpbmNsdWRlcyIsIlZFUlNJT04iLCJDT09LSUVfTkFNRSIsIlRSRUFUTUVOVFNfTE9DQVRJT04iLCJUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiIsIlNUWUxFU0hFRVRfTE9DQVRJT04iLCJEYXRlIiwidG9JU09TdHJpbmciLCJFX1JVTEVTX0xPQ0FUSU9OIiwiUFJPRFVDVF9JTkZPX0xPQ0FUSU9OIiwiTE9HX0FQSV9VUkwiLCJMT09LVVBfQVBJX1VSTCIsIk1PQklMRV9NRURJQV9RVUVSWSIsIlNQTElUX1JBVElPIiwiVFJFQVRNRU5UX1JBVElPIiwiTE9DQUxfU1RPUkFHRV9UVExfSE9VUlMiLCJNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJUSU1FT1VUX0NPVU5UIiwiU0VTU0lPTl9SRUZFUlJFUiIsIk1BVENIRURfVFJFQVRNRU5UUyIsIkxPQ0FMX1NUT1JBR0VfS0VZUyIsIlRSRUFUTUVOVFMiLCJXRUlHSFRTIiwiRUxJR0lCSUxJVFlfUlVMRVMiLCJERUJVR19NT0RFIiwiT1VUX09GX1NDT1BFIiwiSVNfTEFCRUxfU0VOVCIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiSVNfQURNSU4iLCJDVVNUT01fU1RPUkFHRV9QUkVGSVgiLCJMb2dnZXIiLCJvcmlnaW4iLCJ0ZXN0aW5nIiwiREVCVUciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXJncyIsImNvbnNvbGUiLCJpbmZvIiwibG9nIiwibWVzc2FnZUNvbmZpZyIsImZvckVhY2giLCJhcmd1bWVudCIsInR5cGUiLCJ3YXJuIiwiZXJyb3IiLCJhZGRUb0JlYWdsZUluZm9MYXllciIsImxvZ2dlciIsIm1vbnRocyIsInJlbW92ZURvY3VtZW50SGlkZSIsInRvcCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwic3dpdGNoVG9FYXNlT3V0IiwiY29udGFpbnMiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInByZXBlbmQiLCJhZGQiLCJmZXRjaFRyZWF0bWVudHMiLCJmZXRjaFBsdXMiLCJ0cmVhdG1lbnRzIiwiRXJyb3IiLCJqc29uIiwianNvblRyZWF0bWVudCIsImZhaWxlZCIsIm1lc3NhZ2UiLCJmZXRjaFRyZWF0bWVudFdlaWdodHMiLCJ0cmVhdG1lbnRXZWlnaHRzIiwianNvblRyZWF0bWVudFdlaWdodHMiLCJmZXRjaEVsaWdpYmlsaXR5UnVsZXMiLCJlbGlnaWJpbGl0eVJ1bGVzIiwianNvbkVsaWdpYmlsaXR5UnVsZXMiLCJmZXRjaFByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mb0pzb24iLCJ0aW1lb3V0IiwidGltZSIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJzZXRUaW1lb3V0IiwiYWJvcnQiLCJ1cmwiLCJvcHRpb25zIiwicmV0cmllcyIsImZldGNoIiwic2lnbmFsIiwidGhlbiIsInJlcyIsIm9rIiwic3RhdHVzIiwiY2F0Y2giLCJleHRyYWN0Q29va2llSWRlbnRpZmllciIsImNvb2tpZVN0cmluZyIsImNvb2tpZU5hbWUiLCJwYXJzZWQiLCJzcGxpdCIsIm1hcCIsInYiLCJyZWR1Y2UiLCJhY2MiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0cmltIiwiaWRlbnRpZmllciIsImlkZW50aWZpZXJJbmRleCIsImRldGVybWluZVBjdCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJwY3QiLCJleGl0U2Nyb2xsTGlzdGVuZXIiLCJjYWxsQmFjayIsImxvb3AiLCJzY3JvbGxUb3AiLCJsYXN0U2Nyb2xsVG9wIiwiY2xlYXJJbnRlcnZhbCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInNldEludGVydmFsIiwic3R5bGVBcHBsaWNhdG9yIiwiZWxlbWVudHMiLCJzdHlsZUNoYW5nZXNNYXAiLCJpIiwiZWxlbWVudCIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJyZWwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwcmVwYXJlQWN0aW9ucyIsImFjdGlvbnNUb1ByZXBhcmUiLCJidXNpbmVzc1J1bGVJZCIsImRlYnVnTW9kZSIsImFjdGlvbnMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ2YXJpYW50IiwiYWN0aW9uIiwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zIiwidmFyaWFudHMiLCJidXNpbmVzc1RyYW5zZm9ybWF0aW9uIiwiaWQiLCJrZXlzIiwidmFyaWFudEtleSIsInJhbmRvbVBjdCIsIndlaWdodCIsIk1hdGgiLCJmbG9vciIsImluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzIiwicG9wdXBEaXNwbGF5RmxhZyIsInNlc3Npb25TdG9yYWdlIiwic2Vzc2lvblRpbWVzdGFtcCIsInNlc3Npb25IaXN0b3J5Iiwic2V0SXRlbSIsIm5vdyIsInBhdGhuYW1lIiwiY29uZGl0aW9uQ2hlY2tlciIsInJ1blRpbWVWYWx1ZSIsImNvbmRpdGlvbiIsInN1Y2Nlc3MiLCJ1bmRlZmluZWQiLCJtaW4iLCJtYXgiLCJwYXJzZUludCIsInJlZ2V4IiwiUmVnRXhwIiwidGVzdCIsImdldERlYnVnTW9kZSIsIm9vc1JlYXNvbiIsInF1ZXJ5U3RyaW5nIiwic2VhcmNoIiwicmVtb3ZlSXRlbSIsImN1cnJlbnQiLCJnZXRHYUNsaWVudElkIiwiZ2EiLCJnZXRBbGwiLCJ0cmFja2VycyIsImdldCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiYWJzIiwiZ2V0UmFuZG9tSW50IiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJleHRyYWN0SWRlbnRpZmllckludGVydmFsIiwiZSIsImRlbGF5IiwibXMiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJkYXRlIiwicmVzdWx0Iiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwibWF0Y2giLCJ0b2RheSIsInN0YXJ0WWVhciIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJlbmRZZWFyIiwiZXN0aW1hdGVkU3RhcnQiLCJlc3RpbWF0ZWRFbmQiLCJzdGFydERpZmZPdmVyRGF5cyIsImNlaWwiLCJlbmREaWZmT3ZlckRheXMiLCJzdGFydERpZmZPdmVyV2Vla3MiLCJlbmREaWZmT3ZlcldlZWtzIiwiZXJyIiwiaWRsZVRpbWVyIiwidGltZU91dCIsInJlc2V0VGltZXIiLCJjbGVhclRpbWVvdXQiLCJpZGxlVGltZW91dCIsIm9udG91Y2hzdGFydCIsImdldEJyb3dzZXJUeXBlIiwidXNlckFnZW50IiwibmF2aWdhdG9yIiwiaXNPd25NdXRhdGlvbiIsIm11dGF0aW9uTGlzdCIsIm5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsInNvbWUiLCJuIiwidGFnTmFtZSIsImMiLCJjb25maWciLCJkYk5hbWUiLCJ2ZXJzaW9uIiwibWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudCIsInN0b3JlIiwibmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIl93aW5kb3ciLCJhbGx0aW1lIiwic2Vzc2lvbiIsIkJlYWdsZURhdGFDb2xsZWN0aW9uV3JhcHBlciIsImluZGV4ZWREQiIsImluaXQiLCJvcGVuUmVxdWVzdCIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9sZFZlcnNpb24iLCJkZWxldGVPYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiaWR4IiwiY3JlYXRlSW5kZXgiLCJvbmVycm9yIiwib25zdWNjZXNzIiwiZGIiLCJkZWxldGVSZXF1ZXN0IiwiZGVsZXRlRGF0YWJhc2UiLCJyZWplY3QiLCJpbnRlcnZhbCIsInJlYWR3cml0ZSIsImdldENvbm5lY3Rpb24iLCJ0eCIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJkYXRhTmFtZSIsImRhdGFWYWx1ZSIsImluaXRUcmFuc2FjdGlvbiIsInNlc3Npb25JZCIsImdldEN1cnJlbnRTZXNzaW9uSWQiLCJyb3VuZCIsInBheWxvYWQiLCJwdXQiLCJvcCIsInN0b3JlZCIsImdldEN1cnNvciIsImN1cnNvciIsInRhcmdldCIsImNvbnRpbnVlIiwibWlubWF4IiwiTWFwIiwiaGFzIiwic2V0IiwiZ3JvdXBCeSIsImRhdGEiLCJjb3VudCIsInRvdGFsIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJvcGVuQ3Vyc29yIiwiSURCS2V5UmFuZ2UiLCJvbmx5IiwidG9TdHJpbmciLCJpbmRleFZhbHVlIiwic3VtIiwic2l6ZSIsInZhbHVlcyIsInB1c2giLCJkIiwic2V0SG91cnMiLCJnZXRIb3VycyIsInBhZFN0YXJ0IiwiZ2V0RGF0ZSIsIkNvbGxlY3RvckFwaSIsImNvbGxlY3RvckFwaSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWUiLCJxdWVyeU1ldGhvZCIsInF1ZXJ5UHJvbWlzZSIsImF2ZyIsIm1vZGUiLCJsYXN0IiwiZGF0YVZhbHVlcyIsIm9iaiIsImRhdGFfdmFsdWUiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJzYXZlIiwiYmVhZ2xlSW5mb0xheWVyIiwiYSIsImYiLCJfX2h3bSIsInNlYXJjaFBhdGhzIiwiUGFnZVR5cGVEZXBlbmQiLCJtZXRob2QiLCJzZWxlY3RvciIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJpc0FycmF5IiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImJsb2NraW5nIiwicG9sbEludGVydmFsIiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJzZWFyY2hFbGVtZW50IiwiaXNGb3VuZCIsImlzSWdub3JlIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwicXVlcnlTZWxlY3RvciIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwiZmlsdGVyIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwidHJpZ2dlclJlc3RhcnQiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImlubmVyVGV4dCIsImF0dHJpYlZhbHVlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZWNoaWxkIiwiYXR0cmliVmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRWYWx1ZSIsInN1bVByaWNlIiwiY2hpbGRUZXh0IiwiYXJyYXlJbm5lclRleHQiLCJleGNsdXNpdmVFbGVtZW50IiwiY3VzdG9tRGF0YURlcml2YXRpb25zIiwiY3VycmVudFBhZ2VUeXBlIiwiYWxsIiwiaXNDYXJ0RW1wdHkiLCJ0b3RhbEJhc2VQcmljZSIsImNvdXBvbk5vdEFwcGxpY2FibGUiLCJwcmljZXMiLCJxdWFudGl0aWVzIiwidG90YWxQcmljZSIsImNvdXBvbkFwcGxpY2FibGVBbW91bnQiLCJza3UiLCJza3VMaXN0IiwicGFyc2VTZWFyY2hQYXRocyIsImRvbVN0YXR1cyIsInJlYWR5U3RhdGUiLCJ3aW50b3AiLCJkYXRhTGF5ZXIiLCJ3aW5kb2MiLCJmb3VuZE5hbWVzIiwiU2V0IiwicHJldkZvdW5kTmFtZXMiLCJub3RGb3VuZE5hbWVzIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJqb2luIiwicGF0aCIsInBhdGhBcnJheSIsInN1YlBhdGgiLCJzbGljZSIsInN1YkFycmF5Iiwic3ViS2V5Iiwic3ViVmFsdWUiLCJ3aW5kb3dQdHIiLCJuYXZQdHIiLCJwbGF0Zm9ybSIsInVzZXJBZ2VudERhdGEiLCJkZXZpY2VQaXhlbFJhdGlvIiwiYXZhaWxXaW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJ3aW5kb3dEZXB0aCIsImNvbG9yRGVwdGgiLCJwaXhlbERlcHRoIiwidnBvcnRTaGFwZSIsInZpc3VhbFZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJpT1MiLCJvcmllbnRhdGlvbkFuZ2xlIiwib3JpZW50YXRpb24iLCJhbmdsZSIsInRlbXAiLCJoaXN0b3J5IiwibmF2QWdlbnQiLCJicmFuZHMiLCJicmFuZCIsIm1vYmlsZSIsImhhcmR3YXJlQ29uY3VycmVuY3kiLCJsYW5ndWFnZSIsImJyb3dzZXJMYW5ndWFnZSIsInN5c3RlbUxhbmd1YWdlIiwidXNlckxhbmd1YWdlIiwibWF4VG91Y2hQb2ludHMiLCJ2ZW5kb3IiLCJjb25uZWN0aW9uIiwiZG93bmxpbmsiLCJjdXJyZW50VVJMIiwiVVJMIiwiaG9zdG5hbWUiLCJkb05vdFRyYWNrIiwibXNEb05vdFRyYWNrIiwicmVmZXJyZXIiLCJmaXJzdFNlc3Npb25SZWZlcnJlciIsInBhZ2VUeXBlIiwicGVyZk1ldHJpY3MiLCJwZXJmTmF2aWdhdGlvbk1ldHJpY3MiLCJwZXJmb3JtYW5jZSIsImdldEVudHJpZXNCeVR5cGUiLCJjb25uZWN0IiwiY29ubmVjdEVuZCIsImNvbm5lY3RTdGFydCIsInJlcXVlc3QiLCJyZXNwb25zZUVuZCIsInJlcXVlc3RTdGFydCIsImRvbSIsImRvbUludGVyYWN0aXZlIiwiZG9tQ29tcGxldGUiLCJsb2FkIiwibG9hZEV2ZW50RW5kIiwibG9hZEV2ZW50U3RhcnQiLCJkdXJhdGlvbiIsInNjaGVtYU9yZ0VsdHMiLCJzb3JnQXJyYXkiLCJzVGFnIiwiY250bnQiLCJqc29uY29udGVudCIsIkhFQURFUlMiLCJNb25pdG9yIiwiaGFzQXJyaXZhbExvZ1NlbnQiLCJoYXNNYWluTG9nU2VudCIsImhhc1VwZGF0ZXNTZW50IiwiaGlnaFdhdGVyTWFyayIsImluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMiLCJpbW1lZGlhdGUiLCJwYWNrQW5kUXVldWVNYWluTG9nIiwicGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2ciLCJwYWNrYWdlTWFpbkxvZ0RhdGEiLCJyZXF1ZXN0QmxvYiIsImNoZWNrRm9yTGF0ZXN0Q2hhbmdlcyIsInF1ZXVlTG9ncyIsImhhc0NoYW5nZWQiLCJwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhIiwibG9nRGF0YSIsInBhY2thZ2VBcnJpdmFsTG9nRGF0YSIsImh3bSIsImNvb2tpZUdhSWQiLCJ2aWV3X2Vwb2NoIiwiYm9keSIsImxjIiwidSIsIm9uSGFzaFBjdCIsIkJsb2IiLCJzdGFydHNXaXRoIiwicyIsIm0iLCJ2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbG9zZUV2ZW50IiwiY2FwdHVyZSIsInZpc2liaWxpdHlTdGF0ZSIsInNlbmRCZWFjb24iLCJxdWV1ZWQiLCJxdWV1ZUludGVydmFsIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsIkNQVCIsIm1hdGNoZWRUcmVhdG1lbnRzIiwibXQiLCJjaGVja1BhZ2VUeXBlIiwicGFnZVR5cGVzIiwidXNlclNlZ21lbnQiLCJ1c2VyU2VnbWVudFdlaWdodHMiLCJ0cmVhdG1lbnQiLCJzZWdtZW50ZWRXZWlnaHQiLCJnZXRNYXRjaGVkVHJlYXRtZW50cyIsInB0Iiwic3Vic3RyIiwidHJlYXRtZW50c09iaiIsInRpbWVzdGFtcCIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkSG91cnMiLCJ3ZWlnaHRzT2JqIiwid2VpZ2h0cyIsInJlcGxhY2VyIiwicmVwbGFjZUZuIiwidmFsIiwiY3VycmVudFJlcGxhY2VGbiIsInJlcGxhY2VPYmplY3RFeHRyYWN0b3IiLCJyZXBsYWNlVmFsIiwicmVwbGFjZUZuRXhlY3V0b3IiLCJyRm4iLCJzaW5nbGUiLCJyZXBsYWNlRnVuY3Rpb24iLCJGdW5jdGlvbiIsInN0b3JhZ2UiLCJrZXlGYWxsYmFjayIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJjbGVhclJlcXVlc3QiLCJjbGVhciIsImdldFJlcXVlc3QiLCJjb3VudFJlcXVlc3QiLCJjdXJzb3JSZXF1ZXN0IiwiZXhpc3RpbmdQcm9kSW5mbyIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwiY2xlYXJQcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja0FjdGlvbkNvbmRpdGlvbiIsImVsaWdpYmxlRWxlbWVudHMiLCJhdHRyaWJ1dGUiLCJpbm5lcl9jb25kaXRpb24iLCJvcGVyYXRvciIsImNoYWluIiwiY29uZGl0aW9uRWxlbWVudHMiLCJhY3Rpb25Db25kaXRpb25DaGVja2VyIiwiJCIsImVsZW1lbnRTa3UiLCJhcHBseUFjdGlvbnMiLCJ0cmFuc2Zvcm1lciIsImFwcGx5RXZlbnQiLCJjb250ZW50U2VsZWN0b3IiLCJzZWxlY3RvckZhbGxiYWNrIiwibWRDb25kaXRpb24iLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJwVHlwZSIsInByb2R1Y3RJbmZvU3RvcmFnZSIsIm1jIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJTdHJpbmciLCJiZWZvcmUiLCJhZnRlciIsImFwcGVuZCIsIm9mZiIsImNyZWF0ZVBvcHVwIiwiZWxtIiwic3RvcFByb3BhZ2F0aW9uIiwiZGlzcGxheU1vZGFsIiwiZ2V0UHJvZHVjdEluZm8iLCJkaXNwbGF5UG9wdXAiLCJyIiwicHVzaFN0YXRlIiwic3RhdGUiLCJvbmNlIiwidGV4dCIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsImNzcyIsInByb3BlcnR5IiwicHJvcGVydHlWYWx1ZSIsImF0dHIiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJzZW50ZW5jZSIsIndvcmQiLCJjaGFyQXQiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInByZXBhcmVGaW5hbFRpdGxlIiwiZmluYWxUaXRsZSIsInRpdGxlQXVnbWVudCIsInJlcGxhY2VXaXRoVmFsIiwiaHRtbFN0ciIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJoaWRlIiwicVBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJjb250ZW50cyIsInNyYyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwicG9wdXAiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsInAxIiwicGFyZW50Tm9kZSIsInAyIiwiaTEiLCJpMiIsImlzRXF1YWxOb2RlIiwiaW5zZXJ0QmVmb3JlIiwid2FpdEZvckpRdWVyeSIsImpRdWVyeSIsImpRdWVyeUludGVydmFsIiwiYWN0aW9uQXBwbGljYXRvciIsIk11dGV4IiwiT0JTRVJWRVJfQ09ORklHIiwiYXR0cmlidXRlcyIsIlJvYm90RW5naW5lIiwiZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMiLCJlbmdhZ2VtZW50TG9jayIsInJlQXBwbHlUcmVhdG1lbnRzTWFwIiwiYWRkZWREYXRhTGlzdGVuZXJJZHMiLCJpc01vYmlsZSIsInJvYm90UHJvbWlzZXMiLCJlbmdhZ2VSb2JvdCIsImluaXRpYXRlUmVhcHBseVJvYm90TWFwIiwiZWxpZ2liaWxpdHlSdWxlU2V0IiwiZGV2aWNlIiwiYnVzaW5lc3NSdWxlU2V0IiwiaGVscGVycyIsInByZXBhcmVBbmRBcHBseSIsImFjcXVpcmUiLCJyZWxlYXNlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJlbmdhZ2VIZWxwZXJzIiwiYWRkUmVhcHBseUV2ZW50IiwiYWRkUnVsZVNldERhdGFMaXN0ZW5lcnMiLCJoZWxwZXJSb2JvdFByb21pc2VzIiwicHJlcGFyZWQiLCJyZWFwcGx5X2V2ZW50IiwicmVhcHBseV9ldmVudF9wYWdlX3R5cGUiLCJyZWFwcGx5X2V2ZW50X2FycmF5IiwicmVhcHBseUV2ZW50IiwicHJldmlvdXNWYWx1ZSIsInRyZWF0bWVudElkcyIsInJlQXBwbHlUcmVhdG1lbnRzIiwidCIsIlJlc2l6ZU9ic2VydmVyIiwicmVhcHBseVNlbGVjdG9yTGlzdCIsInJlYXBwbHlfc2VsZWN0b3IiLCJsYXN0U2Nyb2xsVGltZSIsImdldFRpbWUiLCJzdCIsInBhZ2VZT2Zmc2V0IiwicmVhcHBseUludGVydmFsIiwiYXBwbGllZCIsImJvdW5kRW5nYWdlVHJlYXRtZW50IiwiYmluZCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJydWxlU2V0IiwicHJldmlvdXNTZWxlY3RvcnMiLCJydWxlIiwiZWxpZ2liaWxpdHlSdWxlIiwib3Bwb3NpdGVGbGFnIiwiZWxpZ2liaWxpdHlTY29wZSIsImVsaWdpYmlsaXR5TmFtZSIsImVsaWdpYmlsaXR5U2V0VHlwZSIsInByZXZpb3VzSXNFbGlnaWJsZSIsImlzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiY2hlY2tEYXRhTGF5ZXJSdWxlIiwiZGF0YUxheWVyRmluZGVyIiwicnVudGltZVZhbHVlIiwiY2hlY2tFbGVtZW50UnVsZSIsInNlbGVjdG9yQWxsIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiY2hlY2tTZXNzaW9uUnVsZSIsImR1cmF0aW9uSGFuZGxlciIsImhpc3RvcnlIYW5kbGVyIiwiZ2V0U2Vzc2lvblRpbWVzdGFtcCIsImN1cnJlbnRIaXN0b3J5IiwiY2hlY2tVcmxSdWxlIiwicmVxdWVzdFVSTCIsImNoZWNrRW52UnVsZSIsImNoZWNrUHJvZHVjdEluZm9SdWxlIiwiZ2V0VHJhbnNhY3Rpb25Db3VudCIsImdldEFkZFRvQ2FydENvdW50IiwiZ2V0UHJldmlld0NvdW50IiwiUnVsZUVuZ2luZSIsImJhc2VSdWxlU2V0IiwiYWRkZWREYXRhTGlzdGVuZXJzIiwibXV0ZXgiLCJjaGVja1J1bGUiLCJydWxlU2F0aXNmaWVkIiwiY2hhaW5fY29uZGl0aW9uIiwia2V5UHJvbWlzZXNNYXAiLCJydWxlcyIsInJ1bGVQcm9taXNlcyIsInNhdGlzZmllZFJ1bGVJZHMiLCJzZXRVcExpc3RlbmVycyIsImZpbHRlcmVkIiwiayIsImV4dHJhY3RSdWxlQXR0cmlidXRlcyIsImRhdGFMYXllclJ1bGVzIiwiZWxlbWVudFJ1bGVzIiwiYm91bmRBc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsImFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImVsaWdpYmlsaXR5UnVsZXNPYmoiLCJiZWFnbGVPbiIsInBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UiLCJwZXJzaXN0UHJvZHVjdEluZm8iLCJlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSIsImFzc2VzRWxpZ2liaWxpdHlSdWxlcyIsInRyZWF0bWVudHNQcm9taXNlIiwiZ2V0VHJlYXRtZW50cyIsInNlYXJjaFBhcmFtcyIsImxhc3RJbmRleE9mIiwiaXRlbSIsInRyZWF0bWVudFJlcG9zaXRvcnkiLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsImdldEVsaWdpYmlsaXR5UnVsZXMiLCJydWxlRW5naW5lIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJjaGVja1J1bGVzIiwiU0hVVERPV04iLCJtb25pdG9yIiwiZWFybHlMb2dTZW50IiwiaGlkZVJlbW92ZWQiLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJjb29raWVQY3QiLCJwYWNrQW5kUXVldWVBcnJpdmFsTG9nIiwicHJvdG90eXBlIiwiR0xPVl9PTiIsImlzTGFiZWxTZW50IiwidGltZW91dENvdW50ZXIiLCJwcm9jZXNzQWRtaW5Vc2VyIiwiaXNBZG1pbiIsImlzT24iLCJzZW5kTG9ncyJdLCJzb3VyY2VSb290IjoiIn0=
